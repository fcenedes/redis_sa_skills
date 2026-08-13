# Adversarial Reviewer Prompt

Use this template when spawning a fresh-context reviewer in the DOUBT step.
Never modify the core prompt to soften the adversarial posture.

## Core Reviewer Prompt Template

```
You are an adversarial code reviewer. Assume the author is overconfident and
that the artifact contains at least one defect, unstated assumption, or
unhandled edge case.

Your inputs:
- ARTIFACT: the code, diff, config, or proposal under review.
- CONTRACT: the expected behavior, constraints, and acceptance criteria.

Your mandate:
1. Read the CONTRACT first. Understand what the artifact MUST do.
2. Read the ARTIFACT. Do not assume correctness.
3. For every claim the artifact makes (explicitly or implicitly), ask:
   - What evidence supports this?
   - Under what conditions does this break?
   - What is the author NOT testing?
4. Report findings as a numbered list. For each finding state:
   - WHAT: the specific defect, risk, or unstated assumption.
   - WHERE: file, line, block, or section.
   - WHY: why this matters (not why the author is wrong).
   - SEVERITY: critical / major / minor / observation.
5. Do not suggest fixes. Your job is to find problems, not solve them.
6. Do not praise the code. Silence on a topic means you found no issue there.
7. If you find nothing wrong, say: "No findings. Confidence: <low|medium|high>."

You have NOT seen the author's reasoning, rationale, or session context.
Form your own interpretation from the ARTIFACT and CONTRACT alone.
```

## Spawning Instructions

### Claude Code Subagent

```
Agent({
  description: "DDD adversarial review",
  prompt: `<paste core prompt above>

ARTIFACT:
<paste extracted artifact here>

CONTRACT:
<paste contract/acceptance criteria here>`,
  run_in_background: false
})
```

Do not include any text from the CLAIM step in the prompt. Do not add
"the author believes..." or "the intent was..." framing. The reviewer must
work from ARTIFACT + CONTRACT alone.

## Cross-Model Escalation

After single-model review, offer one of these options in interactive sessions.

### Codex CLI

```bash
# Write artifact and contract to temp files, then invoke Codex
cat <<'ARTIFACT_EOF' > "$TMPDIR/ddd-artifact.md"
<artifact content>
ARTIFACT_EOF

cat <<'CONTRACT_EOF' > "$TMPDIR/ddd-contract.md"
<contract content>
CONTRACT_EOF

codex -q "$(cat <<'PROMPT'
You are an adversarial reviewer. Assume the author is overconfident.
Read CONTRACT, then ARTIFACT. Report defects as numbered findings with
WHAT, WHERE, WHY, SEVERITY. Do not suggest fixes. Do not praise.

CONTRACT:
$(cat $TMPDIR/ddd-contract.md)

ARTIFACT:
$(cat $TMPDIR/ddd-artifact.md)
PROMPT
)"
```

### Gemini CLI

```bash
cat "$TMPDIR/ddd-contract.md" "$TMPDIR/ddd-artifact.md" | \
  gemini -p "You are an adversarial reviewer. Assume the author is
overconfident. The first section is the CONTRACT, the second is the
ARTIFACT. Report defects as numbered findings: WHAT, WHERE, WHY,
SEVERITY. Do not suggest fixes."
```

### Manual (Separate Session)

1. Open a new chat session (any provider).
2. Paste the core reviewer prompt template.
3. Paste the ARTIFACT and CONTRACT below it.
4. Copy findings back into the orchestrator session for RECONCILE.

### Skip

If the user declines cross-model review, log it:
```
[DDD] Cross-model escalation skipped by user at <timestamp>.
```
In non-interactive sessions, log automatically:
```
[DDD] Cross-model escalation skipped (non-interactive session).
```

## Four-Tier Finding Classification Reference

Use this table during the RECONCILE step to classify every finding from the
reviewer. Each finding must land in exactly one tier.

| Tier | Definition | Criteria | Action |
|---|---|---|---|
| **Contract misread** | The reviewer misunderstood the CONTRACT or applied requirements that do not exist. | Finding references a constraint not in CONTRACT, contradicts an explicit acceptance criterion, or misreads the artifact's scope. | Discard the finding. If the CONTRACT wording was ambiguous enough to cause the misread, tighten the CONTRACT for future reviews. |
| **Valid + actionable** | A real defect, unhandled edge case, or violated constraint that falls within the current scope. | Finding points to specific code/config that fails under a concrete scenario, violates a stated constraint, or introduces undefined behavior. | Fix before the decision stands. Re-run DOUBT if the fix is non-trivial. |
| **Valid tradeoff** | A real concern that is accepted by design -- the cost of addressing it exceeds the risk. | Finding is accurate but addresses a scenario explicitly out of scope, accepted in a design doc, or bounded by a known operational constraint. | Document the tradeoff in code comments, decision log, or spec. Do not silently ignore. |
| **Noise** | Stylistic preference, speculative concern without a concrete failure scenario, or out-of-scope observation. | Finding lacks a concrete "this breaks when..." scenario, applies to code outside the artifact, or is purely aesthetic. | Discard. No documentation needed. |

### Classification Rules

- When a finding spans two tiers, choose the higher-severity tier.
- "Valid + actionable" always wins over "valid tradeoff" when the fix cost is low.
- If you cannot decide between tiers, treat it as valid+actionable -- false
  positives are cheaper than false negatives.
- Never leave a finding unclassified. Unclassified findings are waste.

### Reconciliation Log Format

```markdown
## DDD Reconciliation - <decision name>

| # | Finding summary | Tier | Action taken |
|---|---|---|---|
| 1 | Missing null check on `user.email` | Valid + actionable | Added guard clause at auth.ts:42 |
| 2 | Race condition under concurrent writes | Valid tradeoff | Documented; single-writer guaranteed by queue |
| 3 | Reviewer assumed REST; contract specifies gRPC | Contract misread | Discarded; contract is clear |
| 4 | Variable naming preference | Noise | Discarded |

Cycle: 1 of 3 | Cross-model: offered, user skipped | Decision: proceed
```

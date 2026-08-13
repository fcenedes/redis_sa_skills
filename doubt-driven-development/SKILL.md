---
name: doubt-driven-development
description: Subject every non-trivial decision to a fresh-context adversarial review before it stands. Use when correctness matters more than speed, when working in unfamiliar code, when stakes are high (production, security, irreversible), or when a confident output would be cheaper to verify now than to debug later.
license: MIT
metadata:
  author: redis
  version: "1.0.0"
---

# Doubt-Driven Development

Confident does not mean correct. Long sessions accumulate assumptions that silently
harden into "facts." This skill materializes a reviewer whose job is to disprove
the decision under review. Every non-trivial decision passes through a structured
adversarial cycle before it stands.

Load [adversarial-prompt](references/adversarial-prompt.md) before spawning a
reviewer agent.

## When to Use

A decision is non-trivial when it: introduces branching logic, crosses a module
boundary, asserts a property that cannot be verified by a single test, or has a
blast radius that is irreversible (production deploy, security policy, data
migration, public API shape).

Skip this skill for: mechanical operations with clear instructions, one-line
changes, formatting, dependency bumps with no behavioral delta, and tasks where
the user explicitly said "ship it."

## Loading Constraints

Load in the main-session orchestrator only. Never add to persona definitions or
subagent skill lists. A persona spawning its own reviewer is an orchestration
anti-pattern -- the orchestrator must own the doubt cycle.

## The Process: CLAIM - EXTRACT - DOUBT - RECONCILE - STOP

### 1. CLAIM

State the decision in 2-3 lines. Name the artifact it affects and why the
decision matters. This stays with the orchestrator; it is never forwarded.

### 2. EXTRACT

Isolate the smallest reviewable unit: a diff, a function, a config block, or a
proposal. Strip your reasoning, justifications, and context narrative. The
reviewer receives the ARTIFACT and the CONTRACT (expected behavior, constraints,
acceptance criteria) -- nothing else.

### 3. DOUBT

Spawn a fresh-context reviewer agent. Pass ARTIFACT + CONTRACT only. Never pass
the CLAIM -- forwarding your rationale creates confirmation bias. Use the
adversarial prompt from [references/adversarial-prompt.md](references/adversarial-prompt.md).

The reviewer's mandate: "Find what is wrong. Assume the author is overconfident."

### 4. RECONCILE

Classify every finding into exactly one tier:

| Tier | Meaning | Action |
|---|---|---|
| Contract misread | Reviewer misunderstood the contract | Discard; tighten contract wording if ambiguous |
| Valid + actionable | Real defect or risk within current scope | Fix before proceeding |
| Valid tradeoff | Real concern, accepted by design | Document the tradeoff explicitly |
| Noise | Stylistic, speculative, or out of scope | Discard |

### 5. STOP

Bound the cycle: maximum 3 DOUBT rounds on the same decision before escalating
to the user. The user can also terminate early with "ship it."

## Cross-Model Escalation

After single-model review, offer the user a cross-model second opinion:

- **Codex CLI**: `codex -q "Review this diff for defects. Assume the author is overconfident." < diff.patch`
- **Gemini CLI**: `gemini -p "adversarial-review" < artifact.md`
- **Manual**: paste artifact into a separate session
- **Skip**: user declines; announce the skip in the session log

This offer is mandatory in interactive sessions. In non-interactive (CI, batch,
headless), skip automatically and log that cross-model review was not performed.

## Common Rationalizations

| Rationalization | Why it is dangerous |
|---|---|
| "I already thought about this" | Thinking is not the same as an independent review |
| "It is obvious" | Obvious to a warm context; not to a cold reader |
| "The tests will catch it" | Tests verify what you thought to test, not what you missed |
| "It is just a small change" | Small changes in critical paths cause large outages |
| "We can fix it later" | Later has a cost; verify now while context is fresh |
| "The reviewer will not have enough context" | That is the point -- fresh eyes find assumption leaks |
| "This would slow us down" | Debugging a wrong decision is slower than one review cycle |

## Red Flags

- **Doubt theater**: findings are surfaced but zero are classified as
  valid+actionable across multiple reviews. Question whether the reviewer prompt
  is strong enough or the artifact is too small to be meaningful.
- **Doubting after committing**: the review must happen before the decision is
  finalized. Post-commit doubt is a code review, not DDD.
- **Passing the CLAIM to the reviewer**: leaks the author's framing and defeats
  the purpose. The reviewer must form its own interpretation from ARTIFACT +
  CONTRACT alone.

## DO NOT

- Do not load this skill into persona or subagent definitions.
- Do not forward your CLAIM, reasoning, or session context to the reviewer.
- Do not skip the RECONCILE step -- unclassified findings are waste.
- Do not run more than 3 doubt cycles without user escalation.
- Do not use DDD as a substitute for tests; it complements, not replaces.
- Do not doubt mechanical, trivial, or user-directed-ship-it decisions.

## Verification

Each item must be proved by session evidence, not by memory.

- [ ] Decision was stated as a CLAIM before extraction.
- [ ] Reviewer received ARTIFACT + CONTRACT only; no CLAIM or reasoning leaked.
- [ ] Reviewer prompt used the adversarial template from references/.
- [ ] Every finding was classified into exactly one of the four tiers.
- [ ] Valid+actionable findings were resolved before proceeding.
- [ ] Valid-tradeoff findings were documented explicitly.
- [ ] Cross-model escalation was offered (interactive) or skip was logged (non-interactive).
- [ ] Cycle count did not exceed 3 without user escalation.

## Interaction with Other Skills

- **verification-before-completion**: DDD is in-flight doubt before a decision
  stands; verification-before-completion is post-hoc proof that the result is
  correct. Use both.
- **source-driven-development**: orthogonal. SDD governs where truth lives; DDD
  governs whether the decision referencing that truth is sound.
- **TDD**: the RED step in TDD is doubt made concrete -- a test that fails until
  the implementation is correct. DDD extends this adversarial posture beyond
  test-expressible properties.
- **agent-spec-writing**: specs define the CONTRACT that DDD reviewers receive.
  Good specs make better doubt cycles.

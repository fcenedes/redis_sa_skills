# Codex Coordinator Prompt: redis-sa-slides

You are the coordinator for the `redis-sa-slides` skill implementation. Dispatch subagents across 4 epics in 3 dependency waves. Track progress in the tracker file and ensure all gates pass before declaring completion.

## Context

- **Repo**: `redis_sa_skills`
- **Branch**: `feat/redis-sa-slides` (create from main)
- **Source of truth**: `docs/superpowers/specs/2026-09-02-redis-sa-slides-design.md`
- **Plan directory**: `docs/agent-plans/2026-09-02-redis-sa-slides/`
- **Tracker**: `docs/agent-plans/2026-09-02-redis-sa-slides/tracker.md`
- **Commit policy**: allowed on working branch only
- **Autonomy**: autonomous — proceed without asking for reversible actions; stop only for true decision-blockers

## Model Budget

| Role | Model | Reasoning | When |
|------|-------|-----------|------|
| Coordinator (you) | `gpt-5.5` | high | Planning, dispatch, integration |
| Implementor (default) | `gpt-5.5` | medium | Most tasks |
| Implementor (low-effort docs) | `gpt-5.5` | low | E2.T1, E2.T2, E2.T3, E3.T1, E3.T3 |
| Implementor (medium-effort content) | `gpt-5.5` | medium | E3.T2, E3.T4, E4.T1, E4.T3 |
| Auditor | `gpt-5.6-sol` | high | E4.AUDIT only — independent verification |

**Cost rule**: `gpt-5.5` is the ceiling for all implementation. Escalate to `gpt-5.6-sol` only for the final audit task (E4.AUDIT) where independent high-stakes verification justifies the cost. Do not use `gpt-5.6-terra` or `gpt-5.6-luna` — `gpt-5.5` medium is sufficient for every implementation task in this plan.

## Subagent Prompt Template

Every subagent dispatch must include:

```
You are an Implementor for the redis-sa-slides skill.

## Owned files
<list of files this task may create or edit>

## Forbidden files
All files outside redis-sa-slides/ directory. All other skill directories.
Do not modify: README.md (unless this is task E4.T3), CONTRIBUTING.md, AGENTS.md, or any existing skill.

## Source of truth
Read: docs/superpowers/specs/2026-09-02-redis-sa-slides-design.md

## Task
<paste the task steps from the epic file>

## Verification
<paste the verification commands from the epic file>
Run all verification commands. Report: files changed, line counts, verification output.

## Constraints
- Do not commit. The coordinator commits after verification.
- Do not create files outside your owned file list.
- If blocked, report the blocker and stop.
```

## Execution Order

### Wave 1: E1 — Skill Scaffold

1. Create branch `feat/redis-sa-slides` from main
2. Read `docs/agent-plans/2026-09-02-redis-sa-slides/epic-e1-skill-scaffold.md`
3. Dispatch subagent — `gpt-5.5` medium:
   - Task: Create `redis-sa-slides/SKILL.md`
   - Owned files: `redis-sa-slides/SKILL.md`
   - Inputs: design spec, `CONTRIBUTING.md`, `AGENTS.md`, `redis-excalidraw-diagrams/SKILL.md` (pattern)
   - Gate: SKILL.md exists, ≤150 lines, valid frontmatter, 5 required sections
4. Verify gate yourself: `wc -l redis-sa-slides/SKILL.md`, grep for sections
5. Update tracker: E1.T1 → done
6. Commit: `feat(redis-sa-slides): add SKILL.md scaffold`

### Wave 2: E2 + E3 — Drive Assets + Reference Files (parallel)

Dispatch up to 4 subagents in parallel (disjoint file ownership).

**Batch A — E2 tasks** (read `epic-e2-drive-assets.md`):

Subagent 1 — `gpt-5.5` low:
- E2.T1: Write `redis-sa-slides/references/drive-assets.md`
- E2.T2: Write `redis-sa-slides/references/logo-lookup.md` + `redis-sa-slides/references/diagram-decision-tree.md`
- E2.T3: Write `redis-sa-slides/templates/deck-outline-tdd.md`
- (Combined into one subagent — small disjoint files, all low-effort)

**Batch B — E3 tasks** (read `epic-e3-reference-files.md`):

Subagent 2 — `gpt-5.5` low:
- E3.T1: Write `redis-sa-slides/references/brand-rules.md`
- E3.T3: Write `redis-sa-slides/references/deck-archetypes.md`
- (Low-effort transcription tasks)

Subagent 3 — `gpt-5.5` medium:
- E3.T2: Write `redis-sa-slides/references/sa-slide-catalog.md`
- (Medium: 20 categories with tag examples, needs judgment on naming)

Subagent 4 — `gpt-5.5` medium:
- E3.T4: Write `redis-sa-slides/references/tdd-quality-rubric.md`
- (Medium: most valuable reference file, careful structuring needed)

After all 4 subagents complete:
- Run all verification commands from epic files
- Update tracker: E2.T1-T3, E3.T1-T4 → done
- Commit: `feat(redis-sa-slides): add references, templates, and drive asset config`

### Wave 3: E4 — Validation and Integration

Read `docs/agent-plans/2026-09-02-redis-sa-slides/epic-e4-validation.md`

Subagent 5 — `gpt-5.5` medium:
- E4.T1: Write `redis-sa-slides/scripts/validate-deck.py`
- E4.T2: Write `redis-sa-slides/evals/output_rubric.md` + `redis-sa-slides/evals/trigger_queries.json`
- (Combined: both produce new files in empty directories)

After subagent 5 completes, verify, then:

Subagent 6 — `gpt-5.5` medium:
- E4.T3: Update `README.md` (4 sections: Available Skills, Installation, Usage Examples, Versioning)
- Run `bash scripts/validate-skills.sh`
- **Escalation**: if validate-skills.sh fails for reasons unrelated to redis-sa-slides, stop and report

Update tracker: E4.T1-T3 → done
Commit: `feat(redis-sa-slides): add validation script, evals, README integration`

### Audit: E4.AUDIT

Subagent 7 — `gpt-5.6-sol` high:

```
You are an independent Auditor. You have NO context from prior tasks.

## Your job
Verify the complete redis-sa-slides skill against its design spec.

## Source of truth
Read: docs/superpowers/specs/2026-09-02-redis-sa-slides-design.md

## Files to audit
The entire redis-sa-slides/ directory and redis-sa-slides entries in README.md.

## Gates (pass/fail each one)
1. Spec compliance: AC-1 through AC-10 from design spec
2. Repo compliance: CONTRIBUTING.md requirements (frontmatter, SKILL.md ≤150 lines, references for detail, DO NOT guardrails, final checklist)
3. Validation: run `bash scripts/validate-skills.sh` — must exit 0
4. No secrets: `grep -rE '(token|key|secret|password)=' redis-sa-slides/ --include='*.md' | grep -v 'TODO\|example\|placeholder'` returns nothing
5. No generated artifacts: `find redis-sa-slides/ -name '*.png' -o -name '*.jpg' -o -name '*.svg' | wc -l` returns 0
6. Cross-references: every file in references/ is linked from SKILL.md Reference Index
7. Brand accuracy: palette hex codes match redis-slides source exactly (#FF4438, #091A23, #163341, #B9C2C6, #FFFFFF, #80DBFF, #DCFF1E, #C795E3)

## Output format
Verdict: APPROVED | NOT APPROVED | BLOCKED
For each gate: PASS or FAIL with evidence
If NOT APPROVED: list each finding as file, line, gate, issue, required fix
Residual risks: list or "none"
```

If NOT APPROVED: fix findings with a `gpt-5.5` medium subagent, re-run audit.
Update tracker: E4.AUDIT → audited

Final commit: `feat(redis-sa-slides): audit-verified delivery`

## Tracker Update Protocol

After each task verification:
1. Edit `docs/agent-plans/2026-09-02-redis-sa-slides/tracker.md`
2. Set status column: `done` (with verification evidence) or `audited` (audit verdict)
3. Status values: planning → running → done → audited (or blocked/failed)

## Completion Criteria

All must be true before reporting done:
- [ ] All 12 tracker rows are `done` or `audited`
- [ ] `bash scripts/validate-skills.sh` exits 0
- [ ] `wc -l redis-sa-slides/SKILL.md` ≤ 150
- [ ] `grep -c 'redis-sa-slides' README.md` ≥ 4
- [ ] E4.AUDIT verdict: APPROVED
- [ ] All changes committed to `feat/redis-sa-slides`

## Final Report

```
## redis-sa-slides Delivery Report

- Branch: feat/redis-sa-slides
- Commits: [list sha + message]
- Files created: [count]
- Subagents dispatched: [count]
- Model budget: gpt-5.5 (implementation) + gpt-5.6-sol (audit)
- SKILL.md line count: [n]
- validate-skills.sh: PASS
- Audit verdict: APPROVED
- Residual risks: [list or "none"]
```

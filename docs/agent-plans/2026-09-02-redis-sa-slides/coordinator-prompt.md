# Coordinator Prompt: redis-sa-slides

You are the coordinator for the `redis-sa-slides` skill implementation plan. Your job is to dispatch workers across 4 epics in 3 dependency waves, track progress, and ensure all gates pass before declaring completion.

## Context

- **Repo**: `redis_sa_skills` (local)
- **Branch**: `feat/redis-sa-slides`
- **Source of truth**: `docs/superpowers/specs/2026-09-02-redis-sa-slides-design.md`
- **Plan directory**: `docs/agent-plans/2026-09-02-redis-sa-slides/`
- **Tracker**: `docs/agent-plans/2026-09-02-redis-sa-slides/tracker.md`
- **Commit policy**: allowed on working branch only
- **Autonomy**: autonomous — proceed without asking for reversible actions; stop only for true decision-blockers, unavailable environment, scope changes, or destructive actions

## Required Skills

Load before starting: `writing-skills`, `caveman` (lite for updates, full for worker reports), `rtk-cli` (for noisy output). Use `agent-delegation-routing` if available to confirm worker model/reasoning.

## Execution Order

### Wave 1: E1 — Skill Scaffold

1. Create branch `feat/redis-sa-slides` from main
2. Dispatch E1.T1: Write `redis-sa-slides/SKILL.md`
   - Read epic file: `docs/agent-plans/2026-09-02-redis-sa-slides/epic-e1-skill-scaffold.md`
   - Worker: Sonnet-class, medium reasoning
   - Inputs: design spec, `CONTRIBUTING.md`, `AGENTS.md`, `redis-excalidraw-diagrams/SKILL.md` (pattern reference)
   - Gate: SKILL.md exists, ≤150 lines, frontmatter valid, 5 required sections present
3. Update tracker: E1.T1 → done with evidence
4. Commit: `feat(redis-sa-slides): add SKILL.md scaffold`

### Wave 2: E2 + E3 — Drive Assets + Reference Files (parallel)

Dispatch E2 and E3 tasks in parallel (disjoint file sets).

**E2 tasks** (read `epic-e2-drive-assets.md`):
- E2.T1: Write `references/drive-assets.md` — Sonnet-class, low
- E2.T2: Write `references/logo-lookup.md` + `references/diagram-decision-tree.md` — Sonnet-class, low
- E2.T3: Write `templates/deck-outline-tdd.md` — Sonnet-class, low

**E3 tasks** (read `epic-e3-reference-files.md`):
- E3.T1: Write `references/brand-rules.md` — Sonnet-class, low (read redis-slides references first)
- E3.T2: Write `references/sa-slide-catalog.md` — Sonnet-class, medium
- E3.T3: Write `references/deck-archetypes.md` — Sonnet-class, low
- E3.T4: Write `references/tdd-quality-rubric.md` — Sonnet-class, medium (most valuable reference file)

Gates per task: run the verification commands in the epic file. Update tracker after each.

Commit after E2 complete: `feat(redis-sa-slides): add drive assets, logo lookup, diagram tree, TDD template`
Commit after E3 complete: `feat(redis-sa-slides): add brand rules, slide catalog, deck archetypes, TDD rubric`

### Wave 3: E4 — Validation and Integration

Dispatch sequentially (E4.T3 depends on E4.T1+T2 for complete skill).

Read `epic-e4-validation.md` for all task details.

- E4.T1: Write `scripts/validate-deck.py` — Sonnet-class, medium
- E4.T2: Write `evals/output_rubric.md` + `evals/trigger_queries.json` — Sonnet-class, low
- E4.T3: Update `README.md` (4 sections) + run `bash scripts/validate-skills.sh` — Sonnet-class, medium
  - **Escalation trigger**: if validate-skills.sh fails for reasons beyond redis-sa-slides, stop and report

Commit: `feat(redis-sa-slides): add validation script, evals, README integration`

### Audit: E4.AUDIT

Dispatch a **fresh-context** Opus-class agent for independent verification.

- Inputs: design spec, complete `redis-sa-slides/` directory, README.md changes
- 7 gates defined in `epic-e4-validation.md`
- Verdict: APPROVED / NOT APPROVED / BLOCKED
- If NOT APPROVED: fix findings, re-verify, re-audit
- Update tracker: E4.AUDIT → audited with verdict

Final commit (if audit passes): `feat(redis-sa-slides): audit-verified delivery`

## Tracker Updates

After each task completes verification:
1. Update `tracker.md`: set status to `done`, add evidence column
2. After audit: set E4.AUDIT to `audited`

## Completion Criteria

All of these must be true:
- [ ] All 12 tracker rows are `done` or `audited`
- [ ] `bash scripts/validate-skills.sh` passes (exit 0)
- [ ] `wc -l redis-sa-slides/SKILL.md` ≤ 150
- [ ] `grep -c 'redis-sa-slides' README.md` ≥ 4
- [ ] E4.AUDIT verdict is APPROVED
- [ ] All changes committed to `feat/redis-sa-slides`

## Final Report

When complete, output:
```
## redis-sa-slides Delivery Report

- Branch: feat/redis-sa-slides
- Commits: [list]
- Files created: [count]
- SKILL.md line count: [n]
- validate-skills.sh: PASS
- Audit verdict: APPROVED
- Residual risks: [list or "none"]
```

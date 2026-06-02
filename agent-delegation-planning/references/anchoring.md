# Delegation Anchoring Reference

Use this reference for delegated, multi-agent, follow-up, readiness, or long-running work where goal drift, context compaction, or ambiguous project terminology could cause wrong execution.

## Required Anchor Files

Create these files in the plan directory unless the plan is a small task-only request where the coordinator explicitly records `Anchoring files: not needed because <reason>`.

- `charter.md`: one-screen north star for goal, non-goals, source of truth, success criteria, and active residual.
- `00-index.md`: status board for tasks, packets, owners, blockers, evidence, and next action.
- `components.md`: local component and terminology map.
- `decisions.md`: append-only decision log explaining why choices were made.

The coordinator prompt and every worker prompt must point to `charter.md` and `00-index.md`. Workers touching local terminology, component boundaries, or capability rows must also read `components.md`. Workers making or validating architectural/product tradeoffs must read `decisions.md`.

## Resume Ritual

On session resume, context compaction, a new coordinator turn, before dispatch, after audit findings, before changing scope, and before final/advisory answers:

1. Re-read `charter.md`.
2. Re-read `00-index.md` or the active tracker.
3. Re-read relevant capability ledger rows.
4. Re-read latest audit verdict or verifier report.
5. Re-read the newest user request.
6. State the active residual in one sentence before acting.

Do not continue from memory, chat, or previous model context alone.

## `charter.md` Template

```markdown
# Charter: <plan title>

Plan ID:
Date:
Coordinator:
Repo:
Branch:

## Goal

## Non-Goals

## Source Of Truth

| Source | Why It Is Authoritative |
|---|---|

## Success Criteria

## Active Residual

## Must Not Drift

## Resume Ritual

- Re-read this charter.
- Re-read `00-index.md` or active tracker.
- Re-read relevant capability ledger rows.
- Re-read latest audit/verifier verdict.
- Re-read newest user request.
- Restate active residual before acting.
```

## `00-index.md` Template

```markdown
# Status Board: <plan title>

Plan ID:
Charter:
Tracker:
Capability ledger:
Latest audit:

| Work Item | Status | Owner | Allowed Files | Blocker / Disposition | Evidence | Next Action |
|---|---|---|---|---|---|---|

Status values: `planning`, `running`, `blocked`, `failed`, `done`, and `audited`.
Blocker dispositions: `fixed directly`, `repair delegated`, `blocked for decision`, `blocked for environment`.
```

## `components.md` Template

```markdown
# Components And Terminology

| Term | Local Definition | Source | Owns / Does | Does Not Mean | Notes |
|---|---|---|---|---|---|

## Rules

- Use local definitions from this file and cited source docs.
- Do not infer local meanings from generic software usage.
- If a term is missing, create a discovery task or ask an exact user question.
```

## `decisions.md` Template

```markdown
# Decision Log

| Date | Decision | Why | Source / Evidence | Supersedes | Revisit Trigger |
|---|---|---|---|---|---|

## Rules

- Append decisions; do not rewrite history to hide changes.
- Link decisions to source docs, audit findings, user instructions, or verification evidence.
- Use decisions to avoid re-litigating closed scope.
```

## Rigid Worker Report

Every worker, verifier, auditor, and coordinator handoff returns this block:

```text
STATUS: DONE | DONE_WITH_CONCERNS | NEEDS_CONTEXT | BLOCKED
ROLE:
REQUESTED_MODEL:
REQUESTED_REASONING:
ACTUAL_MODEL: <name or unknown>
ACTUAL_REASONING: <effort or unknown>
INHERITED_FROM_COORDINATOR: yes | no | unknown
ANCHORS_READ:
- charter:
- status board:
- components:
- decisions:
ACTIVE_RESIDUAL:
FILES_CHANGED:
VERIFICATION_RUN:
VERIFICATION_RESULT:
BLOCKERS:
BLOCKER_DISPOSITION: fixed directly | repair delegated | blocked for decision | blocked for environment | none
ASSUMPTIONS:
NEXT_ACTION:
```

## Drift Check

Before accepting worker output, the coordinator checks:

- output addresses the active residual in `charter.md`;
- changed files match ownership or packet allowlist;
- local terms match `components.md`;
- decisions do not contradict `decisions.md`;
- blocker disposition keeps bounded fixes in the current delivery;
- verification evidence matches `00-index.md` and tracker status.

## DO NOT

- Do not dispatch from a plan directory that lacks `charter.md` for multi-agent or long-running work.
- Do not continue after resume or compaction without the resume ritual.
- Do not make workers read broad context when anchor files and assigned task/packet are enough.
- Do not let `decisions.md` become a status tracker; status belongs in `00-index.md` or tracker.
- Do not let `components.md` replace source docs; it is a map with citations.

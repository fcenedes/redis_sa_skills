---
name: agent-capability-ledger
description: Use when tracking what has been delivered, proven, skipped, superseded, or still missing across multi-plan, multi-agent, multi-repo, readiness, audit, or follow-up work before writing new delegated plans.
license: Apache-2.0
metadata:
  author: fcenedes
  version: 1.0.0
---

# Agent Capability Ledger

Maintain a repo-local capability ledger so agents do not re-plan delivered work,
forget residual gaps, or treat memory/chat summaries as proof.

Use this skill before follow-up plans, readiness claims, cross-tranche work,
multi-repo coordination, audits, "what remains?" questions, or "did we already
do this?" checks. Use `agent-delegation-planning` after the ledger identifies
delta work. Use `agent-memory-coordination` to mirror ledger status into shared
memory when available.

Load references only when needed:

- Need row templates: read [ledger-template](references/ledger-template.md).
- Need proof levels: read [proof-taxonomy](references/proof-taxonomy.md).
- Need memory packets: read [memory-sync](references/memory-sync.md).
- Need Redis Array acceleration: read [redis-array-mirror](references/redis-array-mirror.md).

## Source Hierarchy

Use this order for repo-backed work:

1. Versioned repo docs, trackers, tests, commits, and capability ledgers.
2. `agent_memory` summaries and task status records.
3. Chat history and unstaged local notes.

If memory conflicts with the ledger, follow the ledger and update memory when
writes are available. If the ledger conflicts with current repo evidence,
correct the ledger before planning new work.
When anchored plan files exist, treat the plan anchors as the local context for
the ledger: `charter.md` states the goal, non-goals, source of truth, and
success criteria; `00-index.md` is the status board; `components.md` maps local
terms back to source docs; and `decisions.md` explains why choices were made
and what supersedes earlier scope.

## Ledger-First Rule

Before writing a follow-up, readiness, cross-tranche, cross-repo, or "what
remains" plan:

1. Find the existing ledger. Prefer `docs/capability-ledger.md` or
   `docs/capability-ledgers/<domain>.md`. If none exists, create a baseline
   ledger before planning.
2. If anchored plan files exist, read `charter.md`, `00-index.md`, relevant
   `components.md` entries, and `decisions.md` before creating delta work.
3. Read source docs, trackers, tests, commits, and relevant memory records.
4. Classify each capability as `done`, `partial`, `missing`, `blocked`, or
   `superseded`.
5. Record proof class, evidence path, verification command, last validated date,
   supersession, residual gap, and next delta task.
6. Generate delegated tasks only from `missing`, `partial`, `blocked`,
   stale-proof, or newly requested rows.

## Status Rules

- `done`: implementation exists and verification evidence is recorded.
- `partial`: useful work exists, but acceptance criteria or proof is incomplete.
- `missing`: no delivered implementation or proof exists for the capability.
- `blocked`: work cannot proceed without named input, access, or environment.
- `superseded`: another row, plan, commit, or design replaced this row.

Do not mark `done` from a claim alone. It needs a path and verification command.
Do not mark skipped live, browser, or integration proof as passed.

## Capability Rows

Every row must answer:

- What capability or requirement is being tracked?
- Which local source defines the terms used in the capability name?
- What is the current status?
- What proof class supports the status?
- Where is the evidence?
- Which command verifies it?
- What supersedes or invalidates older plans?
- What residual gap remains?
- What exact delta task should be planned next?

Use stable IDs such as `AUTH.JWT.001`, `UI.FILTERS.002`, or
`PLAN.COMPILER.V0`. Keep one capability per row. Split rows that mix unrelated
ownership, runtime paths, proof types, or acceptance criteria.
If a capability name uses project-specific architecture or product terms, cite
the repo source that defines those terms before generating delta tasks.

## Planning From The Ledger

After classification, write a delta plan:

- `done` rows become context, not tasks.
- `superseded` rows become archive notes, not tasks.
- `partial` rows become completion tasks with explicit missing proof.
- `missing` rows become implementation tasks.
- `blocked` rows become unblock tasks or user questions.
- stale proof rows become verification tasks before implementation tasks.
When anchored plan files exist, use the charter, status board, component map,
and decision log to confirm that the delta plan still matches active scope
before you generate tasks from ledger rows.

For large work, group delta rows into epics by ownership and proof path. Do not
group by old batch names if they hide actual capability boundaries.

## Repair Packets

When a ledger row is `partial`, `blocked`, or fails audit because of a narrow
gap, the next delta task may be a repair packet. Repair packets are smaller than
the original task: they name the failed evidence, exact residual gap,
`allowed_files`, `forbidden_files`, re-check command, and closure condition.
When `agent-delegation-planning` is installed, use its packet-mode reference for
the full packet shape.

Do not mark the capability `done` when a repair packet is opened. Keep the row
`partial` or `blocked` until the repair packet is verified and audited, then
record the packet path and evidence as the ledger proof.

## Memory Sync

Search memory before updating a ledger, but do not let memory replace evidence.
When writes are available, store compact records with namespace, user ID,
capability ID, status, evidence path, last validation date, and next delta task.
If memory is missing or write access is unavailable, continue with repo files
and report the degraded mode.

## Redis Array Mirror

Redis Array can mirror the ledger for live orchestration, status dashboards, and
search. Treat it as an optional acceleration layer:

- one ledger file maps to one array key;
- one capability row maps to one array element;
- repo Markdown remains the source of truth;
- Redis data must include source file, row ID, status, evidence, and timestamp.

## DO NOT

- Do not write a broad new plan before reconciling the ledger.
- Do not create a baseline ledger by guessing from chat alone; use repo evidence or mark rows `missing`/`blocked`.
- Do not treat memory, chat, or previous assistant claims as proof.
- Do not generate delta tasks from ledger rows without checking the charter, status board, and decisions when anchored plan files are present.
- Do not classify or plan local capabilities from generic terminology when repo definitions exist.
- Do not mark capabilities done without evidence path and verification command.
- Do not mark docs-only proof as runtime readiness when the capability requires live, browser, integration, or full-runtime proof.
- Do not generate tasks for rows already `done` unless new scope changed them.
- Do not treat a repair packet as proof until its re-check and audit evidence exist.
- Do not overwrite or delete older ledger rows to hide history; mark them `superseded` and point to the replacement.
- Do not let skipped live or browser proof count as passed proof.
- Do not bundle unrelated capabilities into one row.
- Do not use a ledger to reopen closed scope without a decision record in `decisions.md` when anchored plan files are present.
- Do not store secrets, credentials, raw logs, tokens, or private dumps in memory.
- Do not make Redis Array mandatory for ledger use.
- Do not include project-specific seed packets in this generic skill.

## Checklist

- [ ] Existing ledger found, or baseline ledger created.
- [ ] If anchored plan files exist, `charter.md`, `00-index.md`, relevant `components.md` entries, and `decisions.md` were checked before delta tasks were generated.
- [ ] Repo docs, trackers, tests, commits, and memory were checked.
- [ ] Every capability has status, proof class, evidence path, command, date, residual gap, and next delta task.
- [ ] Project-specific capability terms cite local source definitions.
- [ ] Done and superseded rows are not turned into implementation tasks.
- [ ] Delta tasks come only from missing, partial, blocked, stale-proof, or newly requested rows.
- [ ] Narrow residual gaps are represented as repair packets when packet mode is useful.
- [ ] Memory was updated when available, or degraded mode was reported.
- [ ] Optional Redis Array mirror is clearly marked as mirror/cache, not source of truth.

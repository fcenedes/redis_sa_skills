---
name: agent-capability-ledger
description: Use when tracking what has been delivered, proven, skipped, superseded, or still missing across multi-plan, multi-agent, multi-repo, readiness, audit, or follow-up work before writing new delegated plans.
license: Apache-2.0
compatibility: Requires the agent_memory MCP for ledger↔memory sync (optional; falls back to repo-file-only ledger if unavailable).
metadata:
  author: fcenedes
  version: 1.0.1
---

# Agent Capability Ledger

Maintain a repo-local capability ledger so agents do not re-plan delivered work,
forget residual gaps, or treat memory/chat summaries as proof.

Use this skill before follow-up plans, readiness claims, cross-tranche work,
multi-repo coordination, audits, "what remains?" questions, or "did we already
do this?" checks. Use `agent-delegation-planning` after the ledger identifies
delta work. Use `agent-plan-lifecycle` when audited plan work must be promoted,
closed, or archived. Use `agent-memory-coordination` to mirror ledger status
into shared memory when available.

Load references only when needed:

- Need row templates: read [ledger-template](references/ledger-template.md).
- Need process details: read [ledger-process](references/ledger-process.md).
- Need proof levels: read [proof-taxonomy](references/proof-taxonomy.md).
- Need memory packets: read [memory-sync](references/memory-sync.md).
- Need Redis Array acceleration: read [redis-array-mirror](references/redis-array-mirror.md).

## Authority

- Authorized: create/update ledger rows from repo evidence.
- Requires explicit request: delete delivered rows, change proof class without new evidence, override repo evidence with memory claims.
- Assessment-only default: when the user asks what is done or missing, report findings and stop unless a change was requested.

## Source Hierarchy

Use this order for repo-backed work: versioned repo evidence first,
`agent_memory` second, chat and unstaged notes last. If memory conflicts with
the ledger, follow the ledger and update memory when writes are available. If
the ledger conflicts with current repo evidence, correct the ledger before
planning new work.

For anchored plan files, use `charter.md`, `00-index.md`, `components.md`, and
`decisions.md` as local context. Detailed hierarchy rules:
[ledger-process](references/ledger-process.md).

## Ledger-First Rule

Before writing a follow-up, readiness, cross-tranche, cross-repo, or "what
remains" plan: find or create the ledger; read repo evidence, anchored plan
files, and relevant memory; classify rows; record proof; and generate delegated
tasks only from `missing`, `partial`, `blocked`, stale-proof, or newly requested
rows. Full workflow: [ledger-process](references/ledger-process.md).

## Status Rules

- `done`: implementation exists and verification evidence is recorded.
- `partial`: useful work exists, but acceptance criteria or proof is incomplete.
- `missing`: no delivered implementation or proof exists for the capability.
- `blocked`: work cannot proceed without named input, access, or environment.
- `superseded`: another row, plan, commit, or design replaced this row.

Do not mark `done` from a claim alone. It needs a path and verification command.
Do not mark skipped live, browser, or integration proof as passed.

## Capability Rows

Every row must name one capability, local source definition, status, proof
class, evidence path, verification command, supersession, residual gap, and next
delta task. Use stable IDs in a `<DOMAIN>.<AREA>.<NUM>` shape. Split rows that
mix unrelated ownership, runtime paths, proof types, or acceptance criteria.
Detailed row shape: [ledger-template](references/ledger-template.md).

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

Group large work by ownership and proof path, not by old batch names.

## Repair Packets

Use repair packets for narrow `partial`, `blocked`, or failed-audit gaps. Keep
the row `partial` or `blocked` until the repair packet is verified and audited.
Full packet rules: [ledger-process](references/ledger-process.md).

## Memory Sync

Search memory before updating a ledger, but do not let memory replace evidence.
If memory is unavailable, continue with repo files and report degraded mode.
Capability-row packet shapes: [memory-sync](references/memory-sync.md).

## Redis Array Mirror

Optional acceleration layer for live orchestration and dashboards; repo
Markdown remains the source of truth and is never required. Full mapping and
sync rules: [redis-array-mirror](references/redis-array-mirror.md).

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
- Do not use this skill to store or manage worker-dispatch prompts, ownership maps, or gate results in memory; that is `agent-memory-coordination`'s scope.

## Checklist

- [ ] Existing ledger found, or baseline ledger created.
- [ ] If anchored plan files exist, `charter.md`, `00-index.md`, relevant `components.md` entries, and `decisions.md` were checked before delta tasks were generated.
- [ ] Repo docs, trackers, tests, commits, and memory were checked.
- [ ] Every capability has status, proof class, evidence path, command, date, residual gap, and next delta task.
- [ ] Project-specific capability terms cite local source definitions.
- [ ] Done and superseded rows are not turned into implementation tasks.
- [ ] Delta tasks come only from missing, partial, blocked, stale-proof, or newly requested rows.
- [ ] Memory was updated when available, or degraded mode was reported.
- [ ] Optional Redis Array mirror is clearly marked as mirror/cache, not source of truth.

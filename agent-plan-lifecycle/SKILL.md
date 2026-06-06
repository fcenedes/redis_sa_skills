---
name: agent-plan-lifecycle
description: Use when checking status, resuming, advancing, promoting, closing, or archiving delegated agent plans, especially anchored plans with charter.md, 00-index.md, tracker.md, decisions.md, or capability ledger updates.
license: Apache-2.0
metadata:
  author: fcenedes
  version: 1.0.0
---

# Agent Plan Lifecycle

Track delegated plans from execution to closure. A lifecycle record answers where
the plan stands, what evidence exists, what remains, and whether audited work
has been promoted into durable source-of-truth.

Use this skill after `agent-delegation-planning` creates anchored plan files, on
resume/status requests, before final reports, and when closing or archiving a
completed plan. Use `agent-capability-ledger` during promotion.

Load [lifecycle-templates](references/lifecycle-templates.md) when creating or
repairing `00-index.md`, `promotion.md`, or `archive.md`.

## Plan States

Primary states: `planned`, `running`, `verified`, `audited`, `promoted`, and
`archived`.

Side states: `blocked`, `failed`, and `superseded`.

Task states remain separate: `planning`, `running`, `blocked`, `failed`, `done`,
and `audited`.

## Advancement Gates

- `planned`: plan files exist, source of truth is named, and task ownership is
  declared.
- `running`: at least one task or packet has started.
- `verified`: required verification commands ran and evidence is recorded.
- `audited`: auditor verdict exists, with residual risk if any.
- `promoted`: durable truth was updated: capability ledger, spec/docs, memory
  pointers, and commit SHAs when applicable.
- `archived`: final archive record exists and stale plan noise is marked
  superseded or obsolete.

Never advance a state from a claim alone; record path, command, verdict, or
decision evidence.

## Workflow

1. Re-read `charter.md`, `00-index.md` or tracker, relevant ledger rows, latest
   verifier/auditor result, and the newest user request.
2. State the active residual before acting.
3. Update `00-index.md` with plan state, work-item statuses, evidence, blockers,
   next action, and promotion/archive status.
4. If work is audited, promote durable truth before archiving.
5. During promotion, update capability ledger rows and memory pointers when
   available. If an OpenSpec change is present, validate it when the CLI exists;
   do not apply/archive it unless explicitly assigned.
6. Archive by writing `archive.md` or marking the plan `archived`; do not delete
   history needed for future audits.

## DO NOT

- Do not use chat history or memory as proof when repo evidence is missing.
- Do not mark a plan `promoted` before ledger/spec/docs updates are recorded.
- Do not mark a plan `archived` to hide failed, blocked, or unaudited work.
- Do not move or delete plan directories unless the user or repo policy says so.
- Do not overwrite older decisions; append supersession records.
- Do not count skipped live/browser/integration proof as passed.

## Checklist

- [ ] Anchor files and newest user request were re-read.
- [ ] Active residual was stated.
- [ ] Plan state and task states are separate and current.
- [ ] Evidence paths, commands, and audit verdicts are recorded.
- [ ] Promotion updated ledger/spec/docs/memory as applicable.
- [ ] Archive record preserves residual risks and superseded items.

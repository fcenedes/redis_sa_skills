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

## Authority

- Authorized: advance plan state from repo evidence and update lifecycle records.
- Not authorized: mark work promoted or archived without auditor approval and durable evidence.
- Assessment-only default: for status requests, report the active residual before changing state.

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
   available. Use `agent-capability-ledger` for row format, status values, and
   proof-class rules; see the before/after promotion example in
   [lifecycle-templates](references/lifecycle-templates.md#capability-ledger-row-promotion-example).
   If an OpenSpec change is present, validate it when the CLI exists;
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
- Do not use this skill to build or maintain the capability ledger itself; that ownership belongs to `agent-capability-ledger` (lifecycle only reads and updates ledger rows during promotion).
- Do not suggest ending the session to save context. Continue lifecycle operations until the plan reaches a terminal state or you are genuinely blocked.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "The auditor approved it verbally so we can mark it promoted" | Promotion requires recorded durable evidence: ledger updates, spec/docs changes, commit SHAs. |
| "Archiving cleans up the mess from a failed plan" | Archive preserves history; do not use it to hide failed, blocked, or unaudited work. |
| "The plan is done because all tasks show done" | Tasks at `done` still need auditor verdict before the plan reaches `audited`, and promotion before `promoted`. |
| "We can skip promotion for small plans" | Even small plans need their durable truth updated (ledger, specs, docs) before archiving. |
| "Chat history proves the work was completed" | Chat is not evidence; re-read anchor files and verification output from the current session. |
| "Ending the session saves context for later" | Continue lifecycle operations until the plan reaches a terminal state or you are genuinely blocked. |

## Interaction with Other Skills

- **agent-delegation-planning** (upstream): creates the anchored plan files this skill tracks through lifecycle states.
- **agent-capability-ledger** (complementary): during promotion, update ledger rows with delivery evidence.
- **agent-memory-coordination** (complementary): lifecycle state changes should update memory pointers when available.
- **agent-spec-writing** (complementary): promoted specs may feed back into the spec system as durable truth.

## Verification

- [ ] `tracker.md` task statuses match actual file state (e.g., tasks marked `done` have corresponding evidence files or commit SHAs)
- [ ] Plan `00-index.md` contains a `state:` field set to a valid lifecycle state (`planned`, `running`, `verified`, `audited`, `promoted`, or `archived`)
- [ ] Every task marked `done` or `audited` has at least one evidence link (file path, command output, or commit SHA) recorded in the tracker or index
- [ ] Archived plans reside in the correct archive directory and `archive.md` exists with residual risks listed

## Checklist

Each item must be proved by a command output or file read from this session, not by memory or prior conversation.

- [ ] Anchor files and newest user request were re-read.
- [ ] Active residual was stated.
- [ ] Plan state and task states are separate and current.
- [ ] Evidence paths, commands, and audit verdicts are recorded.
- [ ] Promotion updated ledger/spec/docs/memory as applicable, or recorded an explicit "not applicable" reason.
- [ ] Archive record preserves residual risks and superseded items (yes/no verifiable: archive.md exists and lists them).

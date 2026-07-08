# Ledger Process Details

Use this reference when the concise `SKILL.md` contract is not enough to decide
source order, row classification, delta planning, or repair packet shape.

## Source Hierarchy

Use this order for repo-backed work:

1. Versioned repo docs, trackers, tests, commits, and capability ledgers.
2. `agent_memory` summaries and task status records.
3. Chat history and unstaged local notes.

When anchored plan files exist, treat them as local context for the ledger:
`charter.md` states the goal, non-goals, source of truth, and success criteria;
`00-index.md` is the status board; `components.md` maps local terms back to
source docs; and `decisions.md` explains why choices were made and what
supersedes earlier scope.

## Ledger-First Workflow

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

If a capability name uses project-specific architecture or product terms, cite
the repo source that defines those terms before generating delta tasks.

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

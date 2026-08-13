---
name: agent-spec-writing
description: Use when writing, updating, or reviewing source-of-truth specs, requirements, change proposals, acceptance scenarios, spec-compliance against a diff, or ADDED/MODIFIED/REMOVED deltas before implementation. Not for archiving, promoting, or lifecycle state changes.
license: Apache-2.0
metadata:
  author: fcenedes
  version: 1.2.0
---

# Agent Spec Writing

Write durable requirements artifacts that agents can execute without relying on
chat memory. A spec is the source of truth for what should be true; it is not an
execution plan or worker routing contract.

Use this skill before `agent-delegation-planning` when the request is to define,
propose, clarify, or change behavior. Use `agent-plan-lifecycle` after delivery
when an audited change must be promoted into durable truth or archived.

Load [change-delta-template](references/change-delta-template.md) when producing
a proposal, source-of-truth update, or handoff-ready delta.

## Authority

- Authorized: write spec, requirement, proposal, and delta files from repo evidence.
- Not authorized: apply specs as implementation, archive OpenSpec changes, or dispatch workers.
- Assessment-only default: for ambiguous requirements, produce the spec assessment or delta and stop.

## Workflow

1. Identify the authoritative source: existing specs, repo docs, issues, PRs,
   tests, active plan charter, capability ledger, or OpenSpec files.
2. Detect the repo's existing spec system before writing. Follow its directory
   layout, naming, metadata, status, README indexes, and validation commands; do
   not introduce a parallel spec format.
3. Choose the document family first: requirement delta, architecture or workflow
   doc, contract, data model, implementation-facing spec, OpenSpec change, or
   README/index update. Update all affected families when behavior crosses
   boundaries.
4. If `openspec/` exists, read `openspec/specs/` as current truth and
   `openspec/changes/<id>/` as change context when a change ID is provided. Do
   not run `openspec apply` or `openspec archive` unless explicitly assigned.
   Concrete lookup: check repo-local `openspec/specs/` or `specs/`; if absent,
   treat this as a standard markdown spec and follow the nearest existing spec
   directory's layout instead.
5. Classify the requested change as `ADDED`, `MODIFIED`, `REMOVED`,
   `SUPERSEDED`, or `DEFERRED`.
6. Write requirements with acceptance scenarios, constraints, non-goals, and
   impacted files or components when knowable.
7. State assumptions and unresolved decisions separately from implementation
   tasks.
8. Hand off executable implementation work to `agent-delegation-planning`; do not
   dispatch workers from the spec.

## Spec Quality Rules

- Use local terminology from repo source-of-truth docs, not generic model
  knowledge.
- Match neighboring documents before normalizing style. Preserve local heading
  shape, status values, metadata style, filename conventions, and link patterns.
- Keep one requirement per entry; split unrelated behavior.
- Make acceptance scenarios observable: command, UI state, API response, file
  output, or audit evidence.
- Capture compatibility, migration, rollback, and dependency impact when current
  users, stored data, public APIs, or agent contracts may be affected.
- Update README indexes or other discovery surfaces when adding, moving,
  renaming, or materially changing discoverable specs.
- Preserve history by marking requirements `SUPERSEDED` instead of deleting old
  intent.
- Record repo-native validation commands when a CLI, Makefile target, schema
  checker, or documentation checker exists.
- Prefer compact deltas over narrative summaries.
- For reviews, group findings as `Errors`, `Warnings`, and `Info`.

## DO NOT

- Do not use this skill for a one-file fix, a trivial edit, or any task with no durable requirement/behavior change and no multi-agent handoff; just make the change directly.
- Do not create implementation tasks before the requirement delta is clear.
- Do not propose a new spec for small bug fixes or narrow refactors with no
  durable design, contract, or behavior impact.
- Do not treat chat, memory, or previous assistant claims as source-of-truth.
- Do not archive, apply, or overwrite OpenSpec changes unless explicitly
  assigned.
- Do not add YAML frontmatter, central indexes, decision logs, or lifecycle
  systems unless the target spec family already uses them or the user requests
  them.
- Do not use a spec as a task tracker; status belongs in plan lifecycle files.
- Do not dispatch workers, choose models, or grant commit/push permissions.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "This bug fix is small enough to skip a spec" | If there is a durable behavior change, multi-agent handoff, or contract impact, write the delta first. |
| "The requirements are obvious from the code" | Implicit requirements drift; write acceptance scenarios so agents can verify without reading your mind. |
| "A narrative description is clearer than a delta" | Compact deltas are actionable by agents; narrative summaries are ambiguous and hard to verify. |
| "We can write the spec after implementation" | Post-hoc specs describe what was built, not what should be true; write before implementation. |
| "Chat context is enough for the implementor" | Chat is ephemeral; specs must be file-backed so agents across sessions can execute without chat memory. |
| "Adding YAML frontmatter will help organize specs" | Do not add frontmatter, indexes, or lifecycle systems unless the repo already uses them. |

## Interaction with Other Skills

- **agent-delegation-planning** (downstream): hand off executable implementation work after the spec delta is clear.
- **agent-plan-lifecycle** (downstream): use after delivery to promote audited changes into durable truth or archive.
- **agent-capability-ledger** (complementary): specs define capabilities that the ledger tracks for delivery proof.

## Verification

- [ ] Change delta file exists at the path declared in the spec or handoff document (`ls <declared-path>` succeeds)
- [ ] Every REQ entry in the delta has at least one acceptance scenario with an observable check (command, API response, UI state, or file output)
- [ ] All DEFERRED items include a revisit trigger or condition that specifies when to re-evaluate
- [ ] Validation report section is present in the spec and reports 0 errors (`grep -c 'Errors: 0'` or equivalent structural check)
- [ ] No orphan requirements exist: every REQ ID referenced in acceptance scenarios maps back to a defined requirement entry

## Checklist

Each item must be proved by a command output or file read from this session, not by memory or prior conversation.

- [ ] Confirmed the task is not a one-file/trivial/no-handoff change that should be executed directly instead.
- [ ] Source-of-truth files were checked and cited.
- [ ] Existing spec layout, naming, metadata, status, and indexes were preserved.
- [ ] Local terms use repo definitions.
- [ ] Change entries are classified as ADDED/MODIFIED/REMOVED/SUPERSEDED/DEFERRED.
- [ ] Acceptance scenarios are observable and verifiable.
- [ ] Compatibility impact, assumptions, non-goals, and unresolved decisions are explicit.
- [ ] Repo-native validation commands or structural checks are recorded.
- [ ] Implementation handoff points to `agent-delegation-planning` when needed.

---
name: agent-spec-writing
description: Use when writing, updating, or reviewing source-of-truth specs, requirements, change proposals, acceptance scenarios, spec-compliance against a diff, or ADDED/MODIFIED/REMOVED deltas before implementation. Not for archiving, promoting, or lifecycle state changes.
license: Apache-2.0
metadata:
  author: fcenedes
  version: 1.3.0
---

# Agent Spec Writing

Write durable requirements artifacts that agents can execute without relying on
chat memory. A spec is the source of truth for what should be true; it is not an
execution plan or worker routing contract.

Use this skill before `agent-delegation-planning` when the request is to define,
propose, clarify, or change behavior. Use `agent-plan-lifecycle` after delivery
when an audited change must be promoted into durable truth or archived.

Load [change-delta-template](references/change-delta-template.md) when producing
a proposal, source-of-truth update, or handoff-ready delta. Run
[spec-quality-gate](references/spec-quality-gate.md) in full on every change
delta this skill drafts or edits, its family-applicable subset on other
document families, and as the rubric for review-only work.

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
4. If `openspec/` exists, read `openspec/specs/` as current truth and, when a
   change ID is provided, `openspec/changes/<id>/` as change context. Do not run `openspec apply` or
   `openspec archive` unless explicitly assigned. If neither `openspec/specs/`
   nor `specs/` exists, follow the nearest existing spec directory's layout.
5. For any spec touching Redis, load the official skills from
   https://github.com/redis/agent-skills (`redis-development` bundle plus the
   domain skill per primitive; map and install commands are in the gate).
   Cite only a rule file that contains the claim; otherwise a redis.io URL.
   If the skills are not installed, ask the user to install them; do not install.
6. Classify the requested change as `ADDED`, `MODIFIED`, `REMOVED`,
   `SUPERSEDED`, or `DEFERRED`.
7. Fill every template slot per REQ; the only empty values are `n/a: <reason>`
   and `none` in `Depends on:`.
8. Disposition assumptions as Verified, Verification step, or Decision with a
   pointer. Decide every question answerable from repo evidence, official docs,
   or the request; give the rest an owner and due date.
9. Run the gate; record every applicable result. No check stays open at return:
   an open check is an Error.
10. Hand off executable implementation work to `agent-delegation-planning`; do
    not dispatch workers from the spec.

## Precision Rules

Template slot rules define the REQ shape; the gate enforces them. Judgment rules beyond slots:

- Every number is derived with inline arithmetic, cited, or `(measure)`.
- Any REQ adding queries, round trips, timers, or subscriptions states the
  count per cycle, derived.
- Any threshold on a similarity, distance, or score names the metric and range.
- Platform primitive behavior is verified and cited; platform-native product
  preferred over custom construct.
- The target is specified once: no "retarget after REQ-X lands" clauses.

## Spec Quality Rules

- Use local terminology from repo source-of-truth docs, not generic model knowledge.
- Match neighboring documents: preserve local heading shape, status values, metadata, filenames, and link patterns.
- Keep one requirement per entry; prefer compact deltas over narrative; group review findings as `Errors`, `Warnings`, `Info`.
- Capture compatibility, migration, rollback, and dependency impact when users,
  stored data, public APIs, or agent contracts are affected.
- Update README indexes or discovery surfaces when adding, moving, renaming, or materially changing specs.
- Preserve history by marking requirements `SUPERSEDED` instead of deleting old
  intent. If SUPERSEDED has rows, MODIFIED or REMOVED cannot be "none".
- Record repo-native validation commands when a CLI, Makefile target, schema
  checker, or documentation checker exists.

## DO NOT

- Do not use this skill for a one-file fix, trivial edit, or task with no durable behavior change and no handoff; make the change directly.
- Do not create implementation tasks before the requirement delta is clear;
  `Handoff task` is a title only, with no owner, model, or steps.
- Do not treat chat, memory, or previous assistant claims as source-of-truth.
- Do not archive, apply, or overwrite OpenSpec changes unless explicitly assigned.
- Do not add YAML frontmatter, indexes, decision logs, or lifecycle systems unless the spec family already uses them or the user asks.
- Do not use a spec as a task tracker; status belongs in plan lifecycle files.
- Do not dispatch workers, choose models, assign capability IDs, or grant commit/push permissions.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "This bug fix is small enough to skip a spec" | If there is a durable behavior change, multi-agent handoff, or contract impact, write the delta first. |
| "The requirements are obvious from the code" | Implicit requirements drift; write acceptance scenarios so agents can verify without reading your mind. |
| "We can write the spec after implementation" | Post-hoc specs describe what was built, not what should be true; write before implementation. |
| "Chat context is enough for the implementor" | Chat is ephemeral; specs must be file-backed so agents across sessions can execute without chat memory. |
| "It's a demo, approximate numbers are fine" | An unsupported constant becomes an acceptance criterion nobody can pass or fail. Derive, cite, or `(measure)`. |
| "The implementer can pick the wire format" | Two implementers pick two formats. Fill `Contract shape:` or it is not a spec. |
| "We'll retarget this after REQ-X lands" | That is one REQ specified twice. Reorder so the final target is written once. |
| "That decision is architectural, defer it" | If repo evidence, official docs, or the request answer it, decide now and cite. Otherwise name owner and due date. |
| "I know how MULTI / TTL / the index behaves" | A first draft shipped a non-atomic replay guard. Verify primitives against a rule file or docs that contain the claim, and cite. |

## Interaction with Other Skills

- **agent-delegation-planning** (downstream): takes the Dependency DAG, Test Strategy, and Baseline as inputs; it owns batches, ownership, and task contracts.
- **agent-plan-lifecycle** (downstream): use after delivery to promote audited changes into durable truth or archive.
- **agent-capability-ledger** (complementary): assigns `<DOMAIN>.<AREA>.<NUM>` IDs to the capability names the spec lists.
- **redis/agent-skills** (upstream, mandatory for Redis specs): `redis-development` bundle plus the eight domain skills; local `redis-query-engine` and `redis-vector-search` are older aliases of `redis-search`.
- **performance-optimization**, **shipping-and-launch** (complementary): Baseline (REQ-00) and Consumer Rollback feed their measure-first and rollback-before-deploy gates.

## Verification

Set `SPEC` to the draft path as in the gate, then:

- [ ] Change delta file exists at the declared path (`ls "$SPEC"` succeeds)
- [ ] Every REQ has a `Then:` in one of the gate's six observable forms and an `Impacted files/components:` value
- [ ] Every REQ that adds or changes an interface has a non-`n/a` `Contract shape:`
- [ ] Gate 10 placeholder and duplicate greps print nothing; `grep -c '^- Depends on:' "$SPEC"` equals `grep -c '^### REQ-' "$SPEC"`; every `REQ-` token resolves; DAG acyclic
- [ ] Weasel lint from the gate returns 0 unquoted lowercase hits inside REQ bodies (record the count)
- [ ] Every Assumptions row has a Class and a disposition pointer
- [ ] Validation Report lists all 13 gate labels with no open result, and `grep -cE '^- Errors: 0$' "$SPEC"` returns 1
- [ ] All DEFERRED items include an owner and a revisit trigger

## Checklist

Each item must be proved by a command output or file read from this session, not by memory or prior conversation.

- [ ] Confirmed the task is not a one-file/trivial/no-handoff change that should be executed directly instead.
- [ ] Source-of-truth files were checked and cited with `file:line`.
- [ ] Redis specs: `redis-development` and the relevant redis/agent-skills domain skills were loaded; every primitive claim cites a rule file containing it or a doc URL.
- [ ] Existing spec layout, naming, metadata, status, and indexes were preserved.
- [ ] Local terms use repo definitions.
- [ ] Change entries are classified as ADDED/MODIFIED/REMOVED/SUPERSEDED/DEFERRED and the consistency triad holds.
- [ ] Every number is derived, cited, or `(measure)` with a Baseline row.
- [ ] Every REQ has `Depends on:`; runtime REQs have failure mode and observability; state writers also have rollback.
- [ ] Assumptions dispositioned; decidable questions decided; remaining decisions have owner and due date.
- [ ] Repo-native validation commands or structural checks are recorded.
- [ ] Quality gate run and all 13 results recorded in the Validation Report; Revision History row added.
- [ ] Implementation handoff points to `agent-delegation-planning` when needed.

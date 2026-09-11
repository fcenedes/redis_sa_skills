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

Load [change-delta-template](templates/change-delta-template.md) when producing
a proposal, source-of-truth update, or handoff-ready delta. Run
[spec-quality-gate](references/spec-quality-gate.md): all thirteen checks on
change deltas (mechanical ones via `scripts/validate-change-delta.py`), the
family subset on other documents, and as the rubric for review-only work.

## Authority

- Authorized: write spec, requirement, proposal, and delta files from repo evidence.
- Not authorized: apply specs as implementation, archive OpenSpec changes, dispatch workers, or install skills or packages.
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
   change ID is provided, `openspec/changes/<id>/` as change context. Do not run
   `openspec apply` or `openspec archive` unless explicitly assigned. If neither
   `openspec/specs/` nor `specs/` exists, follow the nearest existing spec
   directory's layout; with no spec directory at all, write a standard Markdown
   spec using the template.
5. For any spec touching Redis, load the official skills from
   https://github.com/redis/agent-skills (`redis-development` bundle plus the
   domain skill per primitive; map in the gate). Cite only a rule file that
   contains the claim; otherwise a redis.io URL. If the skills are absent, ask
   the user to install them and use official docs meanwhile.
6. Classify the requested change as `ADDED`, `MODIFIED`, `REMOVED`,
   `SUPERSEDED`, or `DEFERRED`.
7. Fill every template slot per REQ using the template's sentinel policy
   (`n/a: <reason>` for scalars, `none` for lists, one `none` row for tables).
8. Disposition assumptions as Verified, Verification step, or Decision with a
   pointer. Decide every question answerable from repo evidence, official docs,
   or the request; give the rest a `D-<n>` row with owner and due date.
9. Run the validator, then the attestations; record every applicable result.
   No check stays open at return: an open check is an Error.
10. Hand off executable implementation work to `agent-delegation-planning`; do
    not dispatch workers from the spec.

## Precision Rules

Judgment rules the validator cannot check: every number derived, cited, or
`(measure)`; one unit per quantity; count per cycle derived for any REQ adding
queries, round trips, timers, or subscriptions; metric and range named for any
threshold; primitive behavior verified and cited, platform-native product
preferred; the final target specified once, never "retarget after REQ-X lands".

## Spec Quality Rules

- Use local terminology from repo source-of-truth docs, not generic model knowledge.
- Match neighboring documents: preserve local heading shape, status values, metadata, filenames, and link patterns.
- Keep one requirement per entry; prefer compact deltas over narrative; group review findings as `Errors`, `Warnings`, `Info`.
- Capture compatibility, migration, rollback, and dependency impact when users,
  stored data, public APIs, or agent contracts are affected.
- Update README indexes or discovery surfaces when adding, moving, renaming, or materially changing specs.
- Preserve history by marking requirements `SUPERSEDED` instead of deleting old
  intent. If SUPERSEDED has rows, MODIFIED or REMOVED cannot be `none`.
- Record repo-native validation commands when a CLI, Makefile target, schema
  checker, or documentation checker exists.

## DO NOT

- Do not use this skill for a change with no durable behavior, design, or contract
  impact and no multi-agent handoff, however many files it touches; make the change directly.
- Do not create implementation tasks before the requirement delta is clear;
  `Handoff task, if any:` is a title only, with no owner, model, or steps.
- Do not treat chat, memory, or previous assistant claims as source-of-truth.
- Do not archive, apply, or overwrite OpenSpec changes unless explicitly assigned.
- Do not add YAML frontmatter, indexes, decision logs, or lifecycle systems unless the spec family already uses them or the user asks.
- Do not use a spec as a task tracker; status belongs in plan lifecycle files.
- Do not dispatch workers, choose models, assign capability IDs, or grant commit/push permissions.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "This fix is small enough to skip a spec" | Size is not the test. Durable behavior, design, or contract impact, or a multi-agent handoff, means write the delta first. |
| "The requirements are obvious from the code" | Implicit requirements drift; write acceptance scenarios so agents can verify without reading your mind. |
| "A narrative description is clearer than a delta" | Compact deltas are actionable by agents; narrative summaries are ambiguous and hard to verify. |
| "We can write the spec after implementation" | Post-hoc specs describe what was built, not what should be true; write before implementation. |
| "Adding YAML frontmatter will help organize specs" | Do not add frontmatter, indexes, or lifecycle systems unless the repo already uses them. |
| "It's a demo, approximate numbers are fine" | An unsupported constant becomes an acceptance criterion nobody can pass or fail. Derive, cite, or `(measure)`. |
| "The implementer can pick the wire format" | Two implementers pick two formats. Fill `Contract shape:` or it is not a spec. |
| "We'll retarget this after REQ-X lands" | That is one REQ specified twice. Specify the final target once. |
| "That decision is architectural, defer it" | If repo evidence, official docs, or the request answer it, decide now and cite. Otherwise a `D-<n>` row with owner and due date. |
| "I know how MULTI / TTL / the index behaves" | A first draft shipped a non-atomic replay guard. Verify primitives against a rule file or docs that contain the claim, and cite. |

## Interaction with Other Skills

- **agent-delegation-planning** (downstream): reads the Derived order, Test Strategy, Open Decisions, and Baseline as inputs; it alone decides batches, waves, ownership, and task contracts.
- **agent-plan-lifecycle** (downstream): use after delivery to promote audited changes into durable truth or archive.
- **agent-capability-ledger** (complementary): assigns `<DOMAIN>.<AREA>.<NUM>` IDs to the capability names the spec lists.
- **redis/agent-skills** (upstream, mandatory for Redis specs): `redis-development` bundle plus the eight domain skills; local `redis-query-engine` and `redis-vector-search` are older aliases of `redis-search`.
- **performance-optimization**, **shipping-and-launch** (complementary): Baseline (REQ-00) and Consumer Rollback feed their measure-first and rollback-before-deploy gates.

## Verification

Change deltas (set `SPEC` to the draft path):

- [ ] `python3 scripts/validate-change-delta.py "$SPEC"` exits 0 (paste the summary counts)
- [ ] Every REVIEW numeric token classified; every attestation label has `pass (detail)`
- [ ] `grep -cE '^- Errors: 0$' "$SPEC"` returns 1 and no gate result is open
- [ ] Revision History has a row for this edit; DEFERRED rows have owner and revisit trigger

Other document families and review-only work:

- [ ] Applicable checks (1, 2, 3, 4, 6, 7, 9) attested in the reply with evidence; the reviewed document is not edited for review-only work

## Checklist

Each item must be proved by a command output or file read from this session, not by memory or prior conversation.

- [ ] Confirmed the task has durable behavior, design, or contract impact, or a handoff; otherwise changed directly.
- [ ] Source-of-truth files were checked and cited with `file:line`.
- [ ] Redis specs: `redis-development` and the relevant redis/agent-skills domain skills were loaded; every primitive claim cites a rule file containing it or a doc URL.
- [ ] Existing spec layout, naming, metadata, status, and indexes were preserved; local terms use repo definitions.
- [ ] Change entries are classified as ADDED/MODIFIED/REMOVED/SUPERSEDED/DEFERRED and the consistency triad holds.
- [ ] Validator exit 0; attestations recorded; repo-native validation commands recorded when they exist.
- [ ] Implementation handoff points to `agent-delegation-planning` when needed.

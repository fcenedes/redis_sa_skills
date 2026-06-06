---
name: agent-spec-writing
description: Use when writing or updating source-of-truth specs, requirements, change proposals, acceptance scenarios, or ADDED/MODIFIED/REMOVED deltas before implementation or delegated execution.
license: Apache-2.0
metadata:
  author: fcenedes
  version: 1.0.0
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

## Workflow

1. Identify the authoritative source: existing specs, repo docs, issues, PRs,
   tests, active plan charter, capability ledger, or OpenSpec files.
2. If `openspec/` exists, read `openspec/specs/` as current truth and
   `openspec/changes/<id>/` as change context when a change ID is provided. Do
   not run `openspec apply` or `openspec archive` unless explicitly assigned.
3. Classify the requested change as `ADDED`, `MODIFIED`, `REMOVED`,
   `SUPERSEDED`, or `DEFERRED`.
4. Write requirements with acceptance scenarios, constraints, non-goals, and
   impacted files or components when knowable.
5. State unresolved decisions separately from implementation tasks.
6. Hand off executable implementation work to `agent-delegation-planning`; do not
   dispatch workers from the spec.

## Spec Quality Rules

- Use local terminology from repo source-of-truth docs, not generic model
  knowledge.
- Keep one requirement per entry; split unrelated behavior.
- Make acceptance scenarios observable: command, UI state, API response, file
  output, or audit evidence.
- Preserve history by marking requirements `SUPERSEDED` instead of deleting old
  intent.
- Record validation commands when a CLI or schema checker exists, such as
  `openspec validate`.
- Prefer compact deltas over narrative summaries.

## DO NOT

- Do not create implementation tasks before the requirement delta is clear.
- Do not treat chat, memory, or previous assistant claims as source-of-truth.
- Do not archive, apply, or overwrite OpenSpec changes unless explicitly
  assigned.
- Do not use a spec as a task tracker; status belongs in plan lifecycle files.
- Do not dispatch workers, choose models, or grant commit/push permissions.

## Checklist

- [ ] Source-of-truth files were checked and cited.
- [ ] Local terms use repo definitions.
- [ ] Change entries are classified as ADDED/MODIFIED/REMOVED/SUPERSEDED/DEFERRED.
- [ ] Acceptance scenarios are observable and verifiable.
- [ ] Non-goals and unresolved decisions are explicit.
- [ ] Implementation handoff points to `agent-delegation-planning` when needed.

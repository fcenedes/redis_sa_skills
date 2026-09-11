# Change Delta Template

Use this file when a requirement change needs to become durable source-of-truth
or an execution handoff. Fill every slot. The only empty values are
`n/a: <reason>` and, in `Depends on:` alone, `none`; a blank slot or a
surviving `<placeholder>` is a gate failure.

Slot rules (checked by [spec-quality-gate](spec-quality-gate.md) and the SKILL.md Verification list):

- `Then:` uses one of the gate's six observable forms (command output, API
  response, metric, file plus reader command, UI state plus check, audit
  evidence plus locator).
- Every number is derived (arithmetic inline), cited (`file:line`, doc URL, or
  a standard in `Standards cited:`), or written `(measure)`.
- `Depends on:` lists REQ ids or `none`. The Dependency DAG section is built
  from these fields only.
- `Failure mode` and `Observability` are filled for every runtime REQ;
  REQs that write durable state also state the crash-mid-write outcome and
  fill `Rollback`.
- `Contract shape` is filled for any REQ that adds or changes an interface
  (endpoint, message, key layout, CLI flag, file format).
- `Handoff task` is a title only: no owner, model, steps, or estimate.
- Assumptions are dispositioned, not listed: every row keeps its text, a
  Class, and a pointer to where it was resolved.
- DEFERRED = out of scope this revision (trigger-gated). Open Decisions =
  in scope, unanswered (date-gated). A row appears in exactly one.

````markdown
# Change Delta: <title>

Source of truth: <files, commit>
Existing spec/docs checked:
OpenSpec detected: yes/no
OpenSpec change path, if any:
Document family:
Discovery/index updates needed:
Units used in this document: <quantity → unit, one unit per quantity>
Standards cited: <e.g. RFC 9110 for HTTP status codes; or none>
Author:
Date:
Revision: <n; one for a new document, otherwise the existing revision plus one>

## Summary

<REQ count, grouping, one line on how order is derived (see Dependency DAG)>

## Baseline (REQ-00)

Include when any REQ claims a performance, size, latency, cost, or volume
change; otherwise write `n/a: no performance claims`. Every `Current` cell is
`(measure)` until captured.

| Metric | Current | Target | Capture procedure (exact command or DevTools steps) | Used by |
|---|---|---|---|---|
| <metric> | (measure) | <derived or (measure)> | `<command>` | REQ-<id> |

## ADDED

### REQ-<id>: <requirement>

- Source:
- Depends on: <REQ ids or none>
- Baseline row: <metric name from REQ-00, or n/a: not a performance change>
- Rationale:
- Evidence checked: <file:line, doc URL, rule file>
- Impacted files/components: <paths or component names, or n/a: additive only>
- Contract shape: <fields with types and units, or n/a: no new interface>
- Acceptance scenarios:
  - Given:
    When: <command or request>
    Then: <one of the gate's six observable forms; numbers derived or (measure)>
- Constraints:
- Failure mode: <caller- or operator-visible behavior on failure; for state writers also the crash-mid-write outcome; or n/a: static content>
- Rollback: <steps, or n/a: writes no durable state>
- Observability: <one INFO / FT.INFO / log line / metric proving it works in production, or n/a: static content>
- Compatibility impact:
- Verification: <command whose output proves the scenario>
- Handoff task, if any: <title only>

## MODIFIED

### REQ-<id>: <requirement>

- Source:
- Previous behavior: <file:line>
- New behavior:
- Why:
- Depends on: <REQ ids or none>
- Baseline row: <metric name, or n/a: not a performance change>
- Evidence checked: <file:line, doc URL, rule file>
- Impacted files/components: <paths or component names>
- Contract shape: <fields with types and units, or n/a: interface unchanged>
- Acceptance scenarios:
  - Given:
    When:
    Then: <one of the gate's six observable forms>
- Constraints:
- Failure mode: <caller- or operator-visible behavior on failure; for state writers also the crash-mid-write outcome; or n/a: static content>
- Rollback: <steps, or n/a: writes no durable state>
- Observability: <or n/a: static content>
- Compatibility impact:
- Migration:
- Verification:
- Supersedes:
- Handoff task, if any: <title only>

## REMOVED

### REQ-<id>: <requirement>

- Source:
- Removed behavior: <file:line>
- Why:
- Depends on: <REQ ids or none>
- Baseline row: <or n/a>
- Evidence checked: <file:line>
- Impacted files/components: <paths or component names>
- Contract shape: <what consumers stop receiving, or n/a: no interface change>
- Acceptance scenarios:
  - Given:
    When:
    Then: <one of the gate's six observable forms, proving the behavior is gone>
- Constraints:
- Failure mode: <what a caller of the removed path observes; partial-removal outcome; or n/a: static content>
- Rollback: <steps to restore, or n/a: nothing to restore>
- Observability: <how absence is confirmed in production>
- Compatibility impact:
- Verification:
- Handoff task, if any: <title only>

## SUPERSEDED

| Old item | Superseded by | Why | Evidence |
|---|---|---|---|

If this table has rows, MODIFIED or REMOVED cannot be "none".

## DEFERRED

| Item | Reason deferred | Blocked scope | Owner | Revisit trigger |
|---|---|---|---|---|

## Dependency DAG

Edges only from the per-REQ dependency fields. Migration order is the
topological sort of this list. Document order is free; the Summary states the
grouping used when it differs from the derived order.

```
REQ-<a> -> REQ-<b>
```

Derived order: <REQ ids in execution order>

## Cross-REQ Interactions

One line per pair of REQs that touch the same key prefix, table, endpoint, timer,
TTL, or returned object. State `none` or the conflict and its resolution.

| REQ pair | Shared resource | Interaction | Resolution |
|---|---|---|---|

## Non-Goals

<Each non-goal must not be exercised by any acceptance scenario above.>

## Assumptions

Disposition every assumption; keep the row as the audit trail. Class is
`Verified` (pointer: REQ whose `Evidence checked:` holds the citation),
`Verification step` (pointer: Test Strategy or Baseline row holding the
command), or `Decision` (pointer: Open Decisions id; do not repeat the text).

| Assumption | Class | Disposition (REQ-<id> evidence / Test Strategy row / D-<n>) |
|---|---|---|

## Open Decisions

| Decision | Options | Recommendation | Owner | Due | Blocks |
|---|---|---|---|---|---|

## Test Strategy

One row per non-deferred REQ.

| REQ | Harness (unit / integration / container) | Fixture | Command |
|---|---|---|---|

## Security

<One line per REQ that adds an endpoint (auth model), a privileged operation
such as CONFIG SET or a schema change (authorized runners), or a secret (where
it lives). Or n/a: <reason>.>

## Consumer Rollback

<One line per REQ with a non-n/a Contract shape: how the client, consumer, or
downstream agent reverts without a server change. Or n/a: <reason>.>

## Validation Report

- Errors: <count of open gate checks plus other errors; 0 only when none is open>
- Warnings:
- Info:
- Quality gate: <thirteen labelled results, see gate Recording section>

## Execution Handoff

- Planning skill:
- Suggested plan directory:
- Dependency waves (from Derived order):
- Capability names for the ledger (IDs assigned by agent-capability-ledger):
- Validation commands: see Test Strategy

## Revision History

| Revision | Date | Author | Changes |
|---|---|---|---|
````

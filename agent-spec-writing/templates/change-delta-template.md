# Change Delta Template

Copy the block below when a requirement change needs to become durable
source-of-truth or an execution handoff. Fill every slot.

Sentinel policy (one rule per field kind):

- Scalar slot (`- Label: value`): `n/a: <reason>` when it does not apply.
- List field (`Depends on:`, `Standards cited:`, `Warnings:`, `Info:`): `none`.
- Table or free-text section: one row or line reading `none` or `n/a: <reason>`.
- A surviving `<placeholder>` outside backticks is a validator error.

Slot rules (mechanical ones are checked by `scripts/validate-change-delta.py`,
semantic ones by the attestations in `references/spec-quality-gate.md`):

- `Then:` uses one of the gate's six observable forms.
- Every number is derived (arithmetic inline), cited (`file:line`, doc URL,
  rule file, or a standard in `Standards cited:`), or `(measure)`.
- `Depends on:` appears exactly once per REQ: `none` or REQ ids. The
  Dependency DAG lists exactly those edges.
- `Failure mode:` and `Observability:` are filled for every runtime REQ;
  state writers also state the crash-mid-write outcome and fill `Rollback:`.
- `Contract shape:` is filled for any REQ that adds or changes an interface.
- `Handoff task, if any:` is a title only.
- Assumptions are dispositioned, never deleted; Decision rows point to a
  `D-<n>` id in Open Decisions.
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
Standards cited: <RFC 9110 for HTTP status codes, RFC 2119 for MUST/SHOULD/MAY, ... or none>
Author:
Date:
Revision: <repo-native revision if the spec family has one; else 1 for a new document, previous + 1 for an edit>

## Summary

<REQ count, grouping used, and the derived order (see Dependency DAG)>

## Baseline (REQ-00)

Include when any REQ claims a performance, size, latency, cost, or volume
change; otherwise one line `n/a: no performance claims`. Every `Current` cell
is `(measure)` until captured.

| Metric | Current | Target | Capture procedure (exact command or DevTools steps) | Used by |
|---|---|---|---|---|
| <metric> | (measure) | <derived or (measure)> | `<command>` | REQ-<id> |

## ADDED

### REQ-<id>: <requirement>

- Source:
- Depends on: <none, or REQ ids>
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
- Handoff task, if any: <title only, or n/a: no implementation work>

## MODIFIED

### REQ-<id>: <requirement>

- Source:
- Previous behavior: <file:line>
- New behavior:
- Why:
- Depends on: <none, or REQ ids>
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
- Handoff task, if any: <title only, or n/a: no implementation work>

## REMOVED

### REQ-<id>: <requirement>

- Source:
- Removed behavior: <file:line>
- Why:
- Depends on: <none, or REQ ids>
- Baseline row: <metric name, or n/a: not a performance change>
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
- Handoff task, if any: <title only, or n/a: no implementation work>

## SUPERSEDED

| Old item | Superseded by | Why | Evidence |
|---|---|---|---|

If this table has rows, MODIFIED or REMOVED cannot be `none`.

## DEFERRED

| Item | Reason deferred | Blocked scope | Owner | Revisit trigger |
|---|---|---|---|---|

## Dependency DAG

Edges only from the per-REQ `Depends on:` fields, one per line as
`REQ-<a> -> REQ-<b>` meaning a must land before b. Document order is free.

```
REQ-<a> -> REQ-<b>
```

Derived order: <every REQ id once, in a valid topological order>

## Cross-REQ Interactions

One row per shared resource (key prefix, table, endpoint, timer, TTL, returned
object) touched by two or more REQs; or one row `none`.

| Shared resource | REQs | Interaction | Resolution |
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

| ID | Decision | Options | Recommendation | Owner | Due | Blocks |
|---|---|---|---|---|---|---|

## Test Strategy

One row per non-deferred REQ.

| REQ | Harness (unit / integration / container) | Fixture | Command |
|---|---|---|---|

## Security

<One line per REQ that adds an endpoint (auth model), a privileged operation
such as CONFIG SET or a schema change (authorized runners), or a secret (where
it lives). Or n/a: <reason>.>

## Consumer Rollback

<One line per REQ whose Contract shape changes what an existing consumer
receives: how that consumer reverts without a server change. Or n/a: <reason>.>

## Validation Report

- Errors: <integer; 0 only when no gate check is open>
- Warnings: <list, or none>
- Info: <list, or none>
- Quality gate: <thirteen labelled results, grammar in the gate's Recording section>

## Execution Handoff

- Planning skill:
- Suggested plan directory:
- Capability names for the ledger (IDs assigned by agent-capability-ledger):
- Validation commands: see Test Strategy

## Revision History

| Revision | Date | Author | Changes |
|---|---|---|---|
````

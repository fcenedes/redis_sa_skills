# Change Delta Template

Use this file when a requirement change needs to become durable source-of-truth
or an execution handoff.

```markdown
# Change Delta: <title>

Source of truth:
Existing spec/docs checked:
OpenSpec detected: yes/no
OpenSpec change path, if any:
Author:
Date:

## Summary

## ADDED

### REQ-<id>: <requirement>

- Source:
- Rationale:
- Acceptance scenarios:
  - Given:
    When:
    Then:
- Constraints:
- Verification:
- Handoff task, if any:

## MODIFIED

### REQ-<id>: <requirement>

- Previous behavior:
- New behavior:
- Why:
- Acceptance scenarios:
- Verification:
- Supersedes:
- Handoff task, if any:

## REMOVED

### REQ-<id>: <requirement>

- Removed behavior:
- Why:
- Compatibility impact:
- Verification:

## SUPERSEDED

| Old item | Superseded by | Why | Evidence |
|---|---|---|---|

## DEFERRED

| Item | Reason deferred | Decision needed | Revisit trigger |
|---|---|---|---|

## Non-Goals

## Open Decisions

## Execution Handoff

- Planning skill:
- Suggested plan directory:
- Capability ledger rows:
- Validation commands:
```

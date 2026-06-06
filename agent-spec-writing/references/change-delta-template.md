# Change Delta Template

Use this file when a requirement change needs to become durable source-of-truth
or an execution handoff.

```markdown
# Change Delta: <title>

Source of truth:
Existing spec/docs checked:
OpenSpec detected: yes/no
OpenSpec change path, if any:
Document family:
Discovery/index updates needed:
Author:
Date:

## Summary

## ADDED

### REQ-<id>: <requirement>

- Source:
- Rationale:
- Evidence checked:
- Acceptance scenarios:
  - Given:
    When:
    Then:
- Constraints:
- Assumptions:
- Compatibility impact:
- Verification:
- Handoff task, if any:

## MODIFIED

### REQ-<id>: <requirement>

- Previous behavior:
- New behavior:
- Why:
- Evidence checked:
- Acceptance scenarios:
- Compatibility impact:
- Migration/rollback:
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

## Assumptions

## Open Decisions

## Validation Report

- Errors:
- Warnings:
- Info:

## Execution Handoff

- Planning skill:
- Suggested plan directory:
- Capability ledger rows:
- Validation commands:
```

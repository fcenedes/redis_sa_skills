# Change Delta: Minimal valid fixture for validate-change-delta.py

Source of truth: evals/fixtures/minimal-valid-delta.md (self-contained fixture)
Existing spec/docs checked: none
OpenSpec detected: no
OpenSpec change path, if any: none
Document family: implementation-facing spec
Discovery/index updates needed: none
Units used in this document: duration in ms
Standards cited: none
Author: fixture
Date: 2026-09-11
Revision: 1

## Summary

One REQ, no dependencies. Derived order is REQ-01. Exists so the validator has a known-good input.

## Baseline (REQ-00)

n/a: no performance claims

## ADDED

### REQ-01: Health endpoint returns a static body

- Source: fixture request
- Depends on: none
- Baseline row: n/a: not a performance change
- Rationale: monitoring needs a liveness probe.
- Evidence checked: src/server.js:1-12
- Impacted files/components: src/server.js
- Contract shape: `GET /health` returns HTTP 200 with body `{"ok":true}` (object, one boolean field)
- Acceptance scenarios:
  - Given: server listening on port 3000
    When: `curl -s -o /dev/null -w '%{http_code}' localhost:3000/health`
    Then: prints `200`; `curl -s localhost:3000/health` prints `{"ok":true}`
- Constraints: no Redis call on this path.
- Failure mode: request handler throws → Fastify default 500 with empty body; operator sees the error line in stdout.
- Rollback: n/a: writes no durable state
- Observability: Fastify request log line for `/health` with status code.
- Compatibility impact: additive route.
- Verification: `curl -s localhost:3000/health`
- Handoff task, if any: add /health route

## MODIFIED

none

## REMOVED

none

## SUPERSEDED

none

## DEFERRED

none

## Dependency DAG

```
```

Derived order: REQ-01

## Cross-REQ Interactions

none

## Non-Goals

- Authentication on `/health`.

## Assumptions

none

## Open Decisions

none

## Test Strategy

| REQ | Harness (unit / integration / container) | Fixture | Command |
|---|---|---|---|
| REQ-01 | integration | server started with `node src/server.js` | `curl -s localhost:3000/health` |

## Security

n/a: no new authenticated endpoint, privileged operation, or secret

## Consumer Rollback

n/a: no existing consumer receives a changed shape

## Validation Report

- Errors: 0
- Warnings: none
- Info: none
- Quality gate:
  - 1 numbers: pass (3 tokens: port 3000 cited src/server.js:12, status 200 cited Contract shape, ms unit declared)
  - 2 weasel: pass (0 unquoted hits; read)
  - 3 units: pass (duration in ms only)
  - 4 primitives: pass (no platform primitive claimed)
  - 5 interactions: pass (single REQ, none)
  - 6 consistency: pass (SUPERSEDED none, MODIFIED none, REMOVED none)
  - 7 decisions: pass (no open decision)
  - 8 later-clauses: pass (0 reviewed)
  - 9 interoperability: pass (REQ-01 small-model-ready)
  - 10 dag: pass (validator)
  - 11 slots: pass (REQ-01 runtime filled)
  - 12 assumptions: pass (validator)
  - 13 sections: pass (Baseline n/a, Security n/a, Consumer Rollback n/a)

## Execution Handoff

- Planning skill: agent-delegation-planning
- Suggested plan directory: docs/agent-plans/
- Capability names for the ledger (IDs assigned by agent-capability-ledger): health-endpoint
- Validation commands: see Test Strategy

## Revision History

| Revision | Date | Author | Changes |
|---|---|---|---|
| 1 | 2026-09-11 | fixture | initial |

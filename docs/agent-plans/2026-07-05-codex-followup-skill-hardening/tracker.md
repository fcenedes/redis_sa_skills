# Tracker: Codex follow-up on skill-hardening residual risks

Plan: [plan.md](plan.md) · Source: [docs/skill-evaluation-report.md](../../skill-evaluation-report.md) §10/§11
Execution: plan-only · Autonomy (once started): autonomous · Commit policy: not allowed
**Status: SUPERSEDED** by [../2026-07-05-fable5-skill-hardening/plan.md](../2026-07-05-fable5-skill-hardening/plan.md) — all T1-T6 tasks subsumed into the Fable 5 plan.

| Task | Owned files | Status | Evidence | Next action |
|---|---|---|---|---|
| T1 | agent-delegation-planning/, agent-delegation-routing/ | planning | — | Trim both SKILL.md ≤150L, no description change |
| T2 | agent-capability-ledger/ | planning | — | Trim ≤150L + add top-level compatibility |
| T3 | docs/skill-evaluation-report.md §8, benchmark-results/ | planning | — | run_loop.py measurement-only on all 17 skills, per-skill blocked-for-environment allowed |
| T4 | redis-lucidchart-diagrams/SKILL.md, agent-memory-coordination/SKILL.md | planning | — | Add top-level compatibility field, 1 each |
| T5 | agent-memory-docker/scripts/__pycache__/, .gitignore | planning | — | Delete artifact, add gitignore rule |
| T6 | (read-only audit) | planning | — | Verify T1-T5 evidence, serial after all 5 |

Status values: `planning` → `running` → `done` → `audited` (or `blocked` with reason recorded here).

## Memory persistence

Search `agent_memory` for prior records of this plan before starting. If `agent_memory` write tools are unavailable after checking (not before), record `Memory persistence: unavailable` here and rely on this tracker as the sole record.

## Blocked log

(Codex: append here if any task hits `blocked for environment` or `blocked for decision`, with exact command/error and disposition.)

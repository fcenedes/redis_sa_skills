# Tracker: Fable 5 Skill Hardening

Plan: [plan.md](plan.md) · Spec: [spec.md](spec.md)
Supersedes: [codex-followup-skill-hardening](../2026-07-05-codex-followup-skill-hardening/plan.md) (status: `superseded`)
Execution: plan-only · Autonomy (once started): autonomous · Commit policy: not allowed

| Task | Owned files | Status | Evidence | Next action |
|---|---|---|---|---|
| T1 | agent-delegation-planning/*, agent-delegation-routing/* | audited | T8 re-ran line counts `106`/`139`; all description diff counts `0`; routing-table Fable 5 count `5`; validator `0` errors, `1` existing eval warning. | Complete |
| T2 | agent-capability-ledger/* | audited | T8 re-ran SKILL line count `140`; top-level compatibility count `1`; `tool-result` count `1`; validator `0` errors, `1` existing eval warning. | Complete |
| T3 | docs/skill-evaluation-report.md §8, benchmark-results/ | blocked | Environment gate passed, but all 17 benchmark runs failed with `KeyError: 'query'`; `results.json` count `0`; `BLOCKED.txt` count `17`; §8 retained LLM-judged rows with block note. | Audit blocked record in T8 |
| T4 | redis-lucidchart-diagrams/SKILL.md, agent-memory-coordination/* | audited | T8 confirmed top-level compatibility count `1` in each file; agent-memory-coordination authority count `3`; validator `0` errors, `1` existing eval warning. | Complete |
| T5 | agent-memory-docker/scripts/__pycache__/, .gitignore | audited | T8 confirmed `__pycache__` removed and `.gitignore` `__pycache__` count `1`. | Complete |
| T6 | AGENTS.md | audited | T8 confirmed `Fable 5` count `4`, `authority boundary` count `1`, `tool-result` count `1`, and Fable 5 Control Model subsections present. | Complete |
| T7 | 12 remaining skills' SKILL.md + references/ | audited | T8 confirmed authority grep ≥1 for all 12 and all 17 SKILL.md description diff counts `0`; validator `0` errors, `1` existing eval warning. | Complete |
| T8 | (read-only audit) | audited | Audit independence: self-evidence only. T8 re-ran all required checks; no bounded fixes remaining. | Complete |

Status values: `planning` → `running` → `done` → `audited` (or `blocked` with reason).

## Memory persistence

Search `agent_memory` for prior records before starting. If unavailable after checking, record `Memory persistence: unavailable` here.

Memory persistence: available via `mcp__agent_memory` on 2026-07-05.

## Blocked log

(Append here if any task hits `blocked for environment` or `blocked for decision`.)

- T3 blocked for benchmark runner/schema: on 2026-07-05, environment gate passed (`claude --version` 2.1.139), but every `run_loop.py` invocation failed with `KeyError: 'query'` before writing `results.json`.

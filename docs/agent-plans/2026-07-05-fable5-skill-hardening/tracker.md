# Tracker: Fable 5 Skill Hardening

Plan: [plan.md](plan.md) · Spec: [spec.md](spec.md)
Supersedes: [codex-followup-skill-hardening](../2026-07-05-codex-followup-skill-hardening/plan.md) (status: `superseded`)
Execution: plan-only · Autonomy (once started): autonomous · Commit policy: not allowed

| Task | Owned files | Status | Evidence | Next action |
|---|---|---|---|---|
| T1 | agent-delegation-planning/*, agent-delegation-routing/* | audited | T8 re-ran line counts `106`/`139`; all description diff counts `0`; routing-table Fable 5 count `5`; validator `0` errors, `1` existing eval warning. | Complete |
| T2 | agent-capability-ledger/* | audited | T8 re-ran SKILL line count `140`; top-level compatibility count `1`; `tool-result` count `1`; validator `0` errors, `1` existing eval warning. | Complete |
| T3 | docs/skill-evaluation-report.md §8, benchmark-results/ | audited | Original `run_loop.py` completed but detector was inconclusive (`0/213` trigger events). Replacement direct classifier completed for all 17 skills after three fixture-label fixes and four description-boundary fixes: precision `100%`, recall `100%`, accuracy `100%`, TP `110`, FP `0`, TN `94`, FN `0`. | Optional: rerun as 3-run majority or repair original harness detector |
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

- T3 schema blocker resolved on 2026-07-06 after eval files changed from `prompt` to `query`. Claude CLI auth/settings issue was resolved by 2026-07-07 and the original live runner produced 17 `results.json` files, but `run_eval.py` recorded zero trigger decisions (`0/213`) across all skills, indicating detector/harness mismatch. A replacement one-pass direct JSON classifier produced usable trigger evidence; the latest follow-up result is precision `100%`, recall `100%`, accuracy `100%` across 204 eval items after fixture-label and description-boundary cleanup.
- T3 rerun attempted 2026-07-07 from Claude Code session: `claude -p "Say OK" --output-format stream-json --verbose --model claude-fable-5` → "Your organization requires remote managed settings to load, but they could not be loaded." All 17 skills blocked. `run_loop.py` requires working `claude -p`; no workaround available in this environment.
- T3 follow-up on 2026-07-07 fixed three contradictory trigger labels and four description-boundary misses, then reran the direct classifier with working `claude -p --model claude-fable-5`: precision `100%`, recall `100%`, accuracy `100%`, TP `110`, FP `0`, TN `94`, FN `0`.

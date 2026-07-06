```text
Repo: redis_sa_skills, current checkout, current branch. Do not switch branches, do not create a new branch.

Read the full plan before doing anything: docs/agent-plans/2026-07-05-codex-followup-skill-hardening/plan.md
and its tracker: docs/agent-plans/2026-07-05-codex-followup-skill-hardening/tracker.md
Use $agent-delegation-routing if available in this repo to confirm role, model/reasoning, ownership, and command shape before starting each task.

Execute these 5 tasks. Dispatch T1-T5 concurrently (they own disjoint files, verified in plan.md); run T6 only after all 5 finish. Autonomy: autonomous — do not stop between tasks or ask permission to continue; only stop for a true decision-blocker (none expected; see plan.md "Coordinator blocker handling"). Commit policy: NOT ALLOWED. Do not git commit or git push anything. No new skills. No files outside each task's "Owned files" list in plan.md.

T1 — Trim agent-delegation-planning/SKILL.md (345L) and agent-delegation-routing/SKILL.md (235L) toward <=150 lines by moving body prose to references/*.md, leaving a one-line pointer. Do NOT touch either file's frontmatter `description:` field — byte-identical before/after, verify with git diff. Do not delete any DO NOT/checklist/required-field content, only relocate explanatory prose. If <=150 is not achievable without deleting guardrails, stop and report the closest count with a reason instead.
Verify: wc -l agent-delegation-planning/SKILL.md agent-delegation-routing/SKILL.md ; git diff --stat -- agent-delegation-planning agent-delegation-routing ; bash scripts/validate-skills.sh

T2 — Trim agent-capability-ledger/SKILL.md (~177L) toward <=150 lines the same way (extract to references/, no deletion of guardrails). Also add ONE top-level `compatibility:` frontmatter field (sibling to `license:`, NOT nested under `metadata:`) describing its real optional dependency on the agent_memory MCP — check references/redis-array-mirror.md and references/memory-sync.md first for accurate wording, do not invent a dependency.
Verify: wc -l agent-capability-ledger/SKILL.md ; awk '/^---$/{c++} c==1' agent-capability-ledger/SKILL.md | grep -c '^compatibility:' (must print 1, top-level) ; bash scripts/validate-skills.sh

T3 — Live benchmark via skill-creator's run_loop.py, replacing the manual LLM-judged numbers in docs/skill-evaluation-report.md section 8 for ALL 17 SKILLS (scope widened from an earlier 4-skill draft at explicit user request — do all 17): caveman, rtk-cli, redis-brand-ui, redis-product-ui, redis-presentation-decks, redis-excalidraw-diagrams, redis-lucidchart-diagrams, redis-insight-plugin, playwright-test, playwright-cli-agent, agent-delegation-routing, agent-delegation-planning, agent-spec-writing, agent-plan-lifecycle, agent-capability-ledger, agent-memory-docker, agent-memory-coordination.
First check this exact path exists: /Users/pierre/.claude/plugins/cache/claude-plugins-official/skill-creator/unknown/skills/skill-creator/scripts/run_loop.py
If it does not exist in this environment, or `claude --version` fails, STOP this task only: record "T3 blocked for environment: <exact error>" in tracker.md, leave section 8 unchanged, continue with T1/T2/T4/T5/T6.
If it exists: cd into .../skill-creator (parent of scripts/, needed for its relative import), then for EACH of the 17 skills above run (absolute paths, repo root = current checkout root):
  python3 -m scripts.run_loop --eval-set <repo>/<skill>/evals/trigger_queries.json --skill-path <repo>/<skill> --model claude-fable-5 --max-iterations 1 --runs-per-query 3 --report none --results-dir <repo>/docs/agent-plans/2026-07-05-codex-followup-skill-hardening/benchmark-results/<skill> --verbose
--max-iterations 1 and --report none are mandatory (measurement-only, no browser popup). Do NOT apply any description run_loop.py proposes to any SKILL.md — read-only against all 17 skill directories. This is ~500-650 total claude -p invocations (17 skills x 3 runs/query x ~10-14 queries) — expect a long-running task; run sequentially or in small batches if rate-limited, that is normal, not a failure. If ONE skill's run fails/times out, record "T3 blocked for environment: <skill>: <exact error>" for that skill only, keep its existing LLM-judged row in section 8 unchanged with a one-line note "(live benchmark blocked, LLM-judged number retained)", and continue with the remaining 16 skills — one skill failing does not void the task. Extract precision/recall/FP/FN from each completed results.json and rewrite ONLY section 8 of docs/skill-evaluation-report.md with the new numbers for every skill that completed + one sentence noting the methodology change; do not touch any other section.
Verify: ls docs/agent-plans/2026-07-05-codex-followup-skill-hardening/benchmark-results/*/results.json | wc -l (expect up to 17, fewer only with recorded per-skill blocked reasons) ; git diff --stat -- docs/skill-evaluation-report.md (hunks confined to section 8 only)

T4 — Add ONE top-level `compatibility:` field each (same convention as T2, NOT nested under metadata) to redis-lucidchart-diagrams/SKILL.md (Python dependency for scripts/package_lucid_import.py) and agent-memory-coordination/SKILL.md (optional agent_memory MCP dependency, falls back to repo tracker files).
Verify: awk '/^---$/{c++} c==1' redis-lucidchart-diagrams/SKILL.md agent-memory-coordination/SKILL.md | grep -c '^compatibility:' (must total 2) ; bash scripts/validate-skills.sh

T5 — Delete the untracked agent-memory-docker/scripts/__pycache__/ directory. Add to root .gitignore (new section, matching existing style):
  # Python
  __pycache__/
  *.pyc
Verify: test -d agent-memory-docker/scripts/__pycache__ && echo STILL_PRESENT || echo REMOVED ; grep -c "__pycache__" .gitignore

T6 — Auditor, serial after T1-T5. Re-run every verify command above yourself (do not trust task self-reports). Also run: git diff -- agent-delegation-planning/SKILL.md agent-delegation-routing/SKILL.md (must show no hunk touching description:) ; git status --porcelain (confirm nothing outside the 5 tasks' owned files changed, nothing staged/committed). Mark each task audited only if its evidence actually holds; if not, fix directly (bounded, e.g. re-extract to hit the line budget) or apply a narrow repair, then re-verify. Record "Audit independence: self-evidence only" (no separate auditor agent available in this environment) unless a real cross-agent bridge exists.

Track T1-T6 status (planning/running/done/blocked/audited) in tracker.md and in agent_memory if a connected agent_memory tool is available in this environment (check before concluding it's unavailable). Use caveman-lite voice for status updates; do not paste raw logs, full diffs, or full SKILL.md contents anywhere in reports — cite paths and line counts.

Final report to the user must cover: per-task status; line counts before->after for the 3 trimmed files; the 3 compatibility fields added/fixed with exact placement confirmed; T3's outcome (new benchmark table with results.json paths, or the blocked-for-environment record); pycache removal + gitignore confirmation; T6's full verdict including audit-independence disposition; confirmation of 0 commits with git status --porcelain output; any unfixed residual risk (should be none — the bounded-blocker rule means almost everything gets fixed in-flight).
```

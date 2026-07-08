```text
Repo: redis_sa_skills, current checkout, current branch. Do not switch branches, do not create a new branch.

Read these files before doing anything:
  docs/agent-plans/2026-07-05-fable5-skill-hardening/plan.md
  docs/agent-plans/2026-07-05-fable5-skill-hardening/spec.md
  docs/agent-plans/2026-07-05-fable5-skill-hardening/tracker.md
Use $agent-delegation-routing if available to confirm role, model/reasoning, ownership, and command shape before each task.

This plan supersedes docs/agent-plans/2026-07-05-codex-followup-skill-hardening/. Execute 8 tasks. Dispatch T1-T7 concurrently (disjoint files, verified in plan.md); run T8 only after all 7 finish. Autonomy: autonomous — do not stop between tasks; only stop for a true decision-blocker (none expected). Commit policy: NOT ALLOWED. No new skills. No files outside each task's Owned files list.

spec.md defines 6 patterns: P1 (contract over recipe), P2 (authority boundary), P3 (sub-agent dispatch threshold), P4 (tool-result anchoring), P5 (effort calibration), P6 (anti-pitfalls). Each task below references which patterns to apply. Read spec.md for the exact meaning and per-skill map.

CRITICAL CONSTRAINT: Do NOT touch ANY skill's `description:` frontmatter field. These are benchmarked. Verify with `git diff -- <skill>/SKILL.md | grep -c "^[+-].*description:"` (must be 0) for every modified skill.

T1 — Trim + Fable-harden agent-delegation-planning + agent-delegation-routing (reasoning: high)
Owned: agent-delegation-planning/*, agent-delegation-routing/*
(a) Trim both SKILL.md toward ≤150 lines by extracting body prose to references/*.md. Leave one-line pointers. Do not delete DO NOT/checklist/description content.
(b) Apply spec.md patterns to agent-delegation-planning:
  - P1: Convert "Required Shape" 28-item checklist into a contract declaration + pointer to plan-template.md. Keep field names, remove field-by-field prose.
  - P1: Thin Execution/Autonomy prose to 3-sentence core + reference for examples.
  - P2: Add Authority section: "Authorized: write plan files, post to agent_memory, dispatch when start-now. Requires user request: start when plan-only, commit/push, expand scope."
  - P3: In Audit section add: "Prefer fresh-context verification agents over self-review."
  - P4: In Audit section add: "Claims without tool-result evidence from this session are not accepted."
  - P6: In Autonomy section add: "When autonomous: proceed without asking for reversible actions. Stop only for destructive actions or genuine scope changes."
(c) Apply spec.md patterns to agent-delegation-routing:
  - P1: Routing Matrix stays as brief decision table. Add: "Defaults calibrated per model generation. See routing-table.md for model-specific effort."
  - P2: Authority: "Authorized: recommend worker/model/reasoning for existing plan tasks. Not authorized: create the plan, dispatch without a plan, commit/push."
  - P3: Add dispatch threshold: "Dispatch sub-agents only for genuinely parallel, file-disjoint work. Sequential single-file tasks: execute directly."
(d) Update agent-delegation-routing/references/routing-table.md for Fable 5:
  - Change "2026-05 guidance" to "2026-07 guidance" in opening paragraph. Add mention of Fable 5 Mythos-class.
  - Add new section "## Fable 5 (Claude Code)" after "## Claude" with: effort table (low/medium/high/xhigh mapped to Fable tasks), "effort is the primary lever not rule density", "before adding rules lower effort first", fresh-context verifiers, anti-pitfalls (no "explain reasoning" prompts, anti-blocking for autonomous, no session-ending suggestions).
  - Add Fable 5 row to the Claude model table.
  - Update Default Team Setup to include Fable 5.
Verify: wc -l agent-delegation-planning/SKILL.md agent-delegation-routing/SKILL.md ; git diff --stat -- agent-delegation-planning agent-delegation-routing ; git diff -- agent-delegation-planning/SKILL.md | grep -c "^[+-].*description:" ; git diff -- agent-delegation-routing/SKILL.md | grep -c "^[+-].*description:" ; grep -c "Fable 5" agent-delegation-routing/references/routing-table.md ; bash scripts/validate-skills.sh

T2 — Trim + Fable-harden agent-capability-ledger + add compatibility (reasoning: medium)
Owned: agent-capability-ledger/*
(a) Trim SKILL.md toward ≤150L by extracting to references/.
(b) Add top-level `compatibility:` (sibling to `license:`, NOT under `metadata:`): "Requires the agent_memory MCP for ledger↔memory sync (optional; falls back to repo-file-only ledger if unavailable)." Adjust wording from references/redis-array-mirror.md and references/memory-sync.md.
(c) P2: Add Authority: "Authorized: create/update ledger rows from repo evidence. Requires explicit request: delete delivered rows, change proof class without new evidence."
(d) P4: In references/proof-taxonomy.md add `tool-result` proof class: "Proof anchored to a specific tool output from the current session. Stronger than self-report. Required for done/audited status."
Verify: wc -l agent-capability-ledger/SKILL.md ; awk '/^---$/{c++} c==1' agent-capability-ledger/SKILL.md | grep -c '^compatibility:' ; grep -c "tool-result" agent-capability-ledger/references/proof-taxonomy.md ; bash scripts/validate-skills.sh

T3 — Live benchmark all 17 skills (reasoning: medium)
Owned: docs/skill-evaluation-report.md §8 only, docs/agent-plans/2026-07-05-fable5-skill-hardening/benchmark-results/
First check: test -f /Users/pierre/.claude/plugins/cache/claude-plugins-official/skill-creator/unknown/skills/skill-creator/scripts/run_loop.py && which claude && claude --version
If any check fails: STOP T3 only, record "T3 blocked for environment: <exact error>" in tracker.md, leave §8 unchanged. Continue T1-T7.
If checks pass: cd into .../skill-creator, then for EACH of 17 skills (caveman, rtk-cli, redis-brand-ui, redis-product-ui, redis-presentation-decks, redis-excalidraw-diagrams, redis-lucidchart-diagrams, redis-insight-plugin, playwright-test, playwright-cli-agent, agent-delegation-routing, agent-delegation-planning, agent-spec-writing, agent-plan-lifecycle, agent-capability-ledger, agent-memory-docker, agent-memory-coordination) run:
  python3 -m scripts.run_loop --eval-set <repo>/<skill>/evals/trigger_queries.json --skill-path <repo>/<skill> --model claude-fable-5 --max-iterations 1 --runs-per-query 3 --report none --results-dir <repo>/docs/agent-plans/2026-07-05-fable5-skill-hardening/benchmark-results/<skill> --verbose
Where <repo> = /Users/pierre/Documents/Work/redis_sa_skills/.claude/worktrees/pensive-kirch-12fedb
--max-iterations 1 and --report none mandatory. Do NOT apply any description changes. Read-only on all skills. If ONE skill fails, record blocked for that skill only, keep its LLM-judged §8 row, continue remaining. Rewrite §8 only with new numbers + methodology note. Do not touch §1-§7, §9-§11.
Verify: ls docs/agent-plans/2026-07-05-fable5-skill-hardening/benchmark-results/*/results.json | wc -l ; git diff --stat -- docs/skill-evaluation-report.md

T4 — Add compatibility + Fable-harden redis-lucidchart-diagrams + agent-memory-coordination (reasoning: medium)
Owned: redis-lucidchart-diagrams/SKILL.md, agent-memory-coordination/SKILL.md, agent-memory-coordination/references/*
(a) Add top-level `compatibility:` (sibling to `license:`, NOT under `metadata:`) to both:
  - redis-lucidchart-diagrams: "Requires Python for scripts/package_lucid_import.py."
  - agent-memory-coordination: "Requires the agent_memory MCP for shared worker-prompt/gate-result memory (optional; falls back to repo tracker files)."
(b) P2 redis-lucidchart-diagrams: Add to DO NOT or Authority: "Authorized: generate Lucid Standard Import packages for Redis diagrams. Not authorized: execute arbitrary Python, modify files outside diagram output."
(c) P2 agent-memory-coordination: Add Authority: "Authorized: read/write agent_memory, dispatch workers with scoped prompts. Not authorized: commit/push, access secrets, dispatch without ownership plan."
(d) P3 agent-memory-coordination: Add async pattern guidance: "Prefer async dispatch: send all independent workers, then collect results. Do not block on each return. For verification: spawn fresh-context verifiers over self-review."
Verify: awk '/^---$/{c++} c==1' redis-lucidchart-diagrams/SKILL.md agent-memory-coordination/SKILL.md | grep -c '^compatibility:' ; grep -ci "authority\|authorized" agent-memory-coordination/SKILL.md ; bash scripts/validate-skills.sh

T5 — Pycache cleanup (reasoning: low)
Owned: agent-memory-docker/scripts/__pycache__/, .gitignore
rm -rf agent-memory-docker/scripts/__pycache__
Append to .gitignore (new section, match existing style):
  # Python
  __pycache__/
  *.pyc
Verify: test -d agent-memory-docker/scripts/__pycache__ && echo STILL_PRESENT || echo REMOVED ; grep -c "__pycache__" .gitignore

T6 — AGENTS.md: Fable 5 conventions (reasoning: medium)
Owned: AGENTS.md only
(a) Add new section "## Fable 5 Control Model" after "Model and Cost Optimization" with subsections:
  - Authority Boundary Convention: every skill declares scope of initiative + assessment-only default.
  - Tool-Result Anchoring: progress claims must cite tool results, auditors re-run independently.
  - Effort as Primary Lever: lower effort before adding rules, Fable low ≥ previous-gen xhigh.
  - Anti-Pitfalls: no "explain reasoning" prompts, anti-blocking for autonomous, no session-ending suggestions.
(b) In "Skill Requirements" add after final checklist bullet: "- Explicit authority boundary (what the skill may do autonomously vs. what requires user request)."
(c) In "Model and Cost Optimization" mention Fable 5 as Claude Code default with effort as primary lever, point to routing-table.md.
Verify: grep -c "Fable 5" AGENTS.md ; grep -c "authority boundary" AGENTS.md ; grep -c "tool-result\|Tool-Result" AGENTS.md ; bash scripts/validate-skills.sh

T7 — Fable 5 hardening: 12 remaining skills (reasoning: medium)
Owned: caveman/SKILL.md, rtk-cli/SKILL.md, redis-brand-ui/SKILL.md, redis-product-ui/SKILL.md, redis-presentation-decks/SKILL.md, redis-excalidraw-diagrams/SKILL.md, redis-insight-plugin/SKILL.md, playwright-test/SKILL.md, playwright-cli-agent/SKILL.md, agent-spec-writing/SKILL.md, agent-plan-lifecycle/SKILL.md, agent-memory-docker/SKILL.md — plus their references/*.md
Do NOT touch: agent-delegation-planning/*, agent-delegation-routing/*, agent-capability-ledger/*, redis-lucidchart-diagrams/SKILL.md, agent-memory-coordination/*, AGENTS.md, .gitignore
Per skill, apply these patterns from spec.md:
(a) P2 — Authority boundary (ALL 12): Add 2-4 line ## Authority section or integrate into DO NOT. Use spec.md examples. Key ones:
  - caveman: Authorized to compress prose. Not authorized to compress code/tool output or change mode without trigger.
  - rtk-cli: Authorized to wrap shell output. Not authorized to filter errors or suppress exit codes.
  - redis-insight-plugin: Authorized to scaffold/build/validate. Not authorized to deploy to prod without confirmation or run destructive Redis commands.
  - playwright-cli-agent: Authorized to drive dev/staging browsers. NEVER production without explicit confirmation.
  - agent-spec-writing: Authorized to write spec files. Not authorized to apply as implementation or archive without evidence.
  - agent-plan-lifecycle: Authorized to advance plan state on evidence. Not authorized to promote/archive without auditor approval.
  - agent-memory-docker: Authorized to generate configs/templates. Not authorized to start/stop containers or modify host network.
  - Other 5 (redis-brand-ui, redis-product-ui, redis-presentation-decks, redis-excalidraw-diagrams, playwright-test): Authorized to create/modify their artifact type. Not authorized to publish/deploy without confirmation.
(b) P1 — Contract gates (redis-insight-plugin only): Reframe 3-phase workflow as mandatory verification gates: "These phases are mandatory verification gates. Each proves a specific contract. Skipping a phase means skipping its proof."
(c) P4 — Tool-result anchoring (all 12 with checklists): Add to checklist preamble: "Each item must be proved by a command output or file read from this session, not by memory or prior conversation."
(d) P6 — Session continuity (agent-plan-lifecycle only): Add: "Do not suggest ending the session to save context. Continue until the plan reaches a terminal state."
(e) Do NOT touch description: fields.
(f) Line budget: redis-insight-plugin is at 213L — extract body prose to references/ to make room before adding Fable 5 content. playwright-cli-agent is at 150L — keep additions minimal (≤5 lines) or extract to compensate. All others are under budget.
Verify:
  wc -l caveman/SKILL.md rtk-cli/SKILL.md redis-brand-ui/SKILL.md redis-product-ui/SKILL.md redis-presentation-decks/SKILL.md redis-excalidraw-diagrams/SKILL.md redis-insight-plugin/SKILL.md playwright-test/SKILL.md playwright-cli-agent/SKILL.md agent-spec-writing/SKILL.md agent-plan-lifecycle/SKILL.md agent-memory-docker/SKILL.md
  for s in caveman rtk-cli redis-brand-ui redis-product-ui redis-presentation-decks redis-excalidraw-diagrams redis-insight-plugin playwright-test playwright-cli-agent agent-spec-writing agent-plan-lifecycle agent-memory-docker; do echo -n "$s: "; grep -ci "authority\|authorized" "$s/SKILL.md"; done
  for s in caveman rtk-cli redis-brand-ui redis-product-ui redis-presentation-decks redis-excalidraw-diagrams redis-insight-plugin playwright-test playwright-cli-agent agent-spec-writing agent-plan-lifecycle agent-memory-docker; do echo -n "$s: "; git diff -- "$s/SKILL.md" | grep -c "^[+-].*description:"; done
  bash scripts/validate-skills.sh

T8 — Auditor (reasoning: high, serial after T1-T7)
Re-run ALL verify commands from T1-T7 yourself. Do not trust self-reports. Also run:
  git diff -- agent-delegation-planning/SKILL.md agent-delegation-routing/SKILL.md (no hunk touches description:)
  git status --porcelain (nothing staged/committed, only expected files)
  for s in */SKILL.md; do git diff -- "$s" | grep -c "^[+-].*description:"; done (ALL must be 0)
  grep -ci "authority\|authorized" */SKILL.md (ALL 17 must return ≥1)
  grep -c "Fable 5" agent-delegation-routing/references/routing-table.md AGENTS.md (both ≥1)
Fix directly if any check fails (bounded). Record "Audit independence: self-evidence only" unless a cross-agent bridge exists.

Track T1-T8 status in tracker.md and agent_memory if available. Use caveman-lite for updates. No raw logs or full file pastes.

Final report: per-task status; line counts before→after for 3 trimmed skills; 3 compatibility fields with placement; Fable 5 routing table confirmed; AGENTS.md conventions confirmed; authority boundary across all 17 confirmed; tool-result proof class confirmed; T3 benchmark or blocked record; pycache+gitignore; T8 verdict with audit-independence; 0 commits with git status; residual risk.
```

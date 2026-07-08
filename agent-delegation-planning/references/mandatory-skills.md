# Mandatory Skill Stack And Token Economy

## Mandatory Skill Stack

Always identify skills needed before execution:

- `rtk-cli`: noisy command output, git status, diffs, tests, logs, builds.
- `caveman`: default compressed prose for plans, prompts, reports, audits, handoffs, and summaries.
- `agent-capability-ledger`: required before follow-up, readiness, cross-tranche, cross-repo, "what remains", or "did we already do this?" planning.
- `agent-spec-writing`: required when requirements, acceptance scenarios, source-of-truth behavior, OpenSpec changes, or ADDED/MODIFIED/REMOVED deltas must be authored before execution.
- `agent-plan-lifecycle`: required for anchored plan status, resume, promotion, closure, or archive work.
- `agent-delegation-routing`: worker role, model/reasoning, command shape, patch handoff.
- `agent-memory-coordination`: parallel workers, reusable prompts, ownership maps, durable outcomes.
- `playwright-cli-agent` or `playwright-test`: mandatory for UI, frontend, dashboard, demo, browser, responsive, or visual validation tasks.
- Repo-specific skills: UI, Redis, testing, browser, docs, diagrams, or product skills required by the task.

For each task, and for each epic when epics exist, list `Required skills: <skill>: <why>`. If a skill is unavailable, record the fallback.

## Token Economy

Design every plan to minimize token use without losing evidence:

- Use `rtk-cli` for noisy shell output whenever available; record raw-command fallback only when RTK is unavailable or unsuitable.
- Load references on demand, not wholesale. Put links/paths in the plan instead of copying long docs.
- Keep worker prompts self-contained but short: ownership, task, constraints, gates, output contract.
- Use `caveman lite` by default for plans/audits, `full` for worker reports, and `ultra` only for status lines. Do not compress code, command flags, identifiers, or safety-critical explanations.
- Reuse prompts through `agent-memory-coordination` instead of pasting long prompts repeatedly.
- Ask workers for concise reports: files changed, commands run, test summary, blockers, evidence paths.
- Keep audits compressed but complete: verdict, gate, file/line evidence, required fix, and residual risk.
- Do not paste raw logs, full diffs, generated files, or large docs into plans; cite paths and summarize only relevant lines.
- Pick the smallest sufficient model and reasoning effort; token economy includes avoiding unnecessary high/xhigh.
- Archive stale planning docs and trackers after delivery so future agents read less irrelevant context.

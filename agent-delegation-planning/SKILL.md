---
name: agent-delegation-planning
description: Use when writing an execution plan that will be delegated to coding agents, subagents, Codex CLI, Claude-side coordinators, Qwen/Ollama, or parallel workers.
license: Apache-2.0
metadata:
  author: fcenedes
  version: "1.0.0"
---
# Agent Delegation Planning

Write plans that are directly executable by delegated agents. A good plan is not a narrative checklist; it is an ownership, routing, skill, and verification contract.

Use `agent-delegation-routing` after the plan exists. Use `agent-memory-coordination` when prompts, ownership, or durable outcomes must be shared across workers.

Load [plan-template](references/plan-template.md) for full plans, multi-task work, or when exact fields matter.
When model choice is unclear, consult `agent-delegation-routing/references/routing-table.md` instead of inventing routing policy.

## Required Shape

Every plan must contain:

- **Source of truth:** repo docs, issue, PR, user request, or tracker that wins over memory/chat.
- **Plan persistence:** write the plan to files and post it to `agent_memory`; do not only answer in chat.
- **Skill stack:** required skills for the whole plan and for each task. Use epic-level skills when epics exist.
- **Plan granularity:** small requests may be task-only; multi-area or multi-goal work uses epics containing tasks.
- **Tasks:** each task has owned files, forbidden files, worker role, model, reasoning effort, verification, audit, and done evidence.
- **Parallelization:** actively seek parallel batches; use serial only for real dependencies, shared files, or runtime limits.
- **Integration:** shared files, integrator owner, conflict risks, and final gates.
- **Audit:** every delivery has an Auditor task before completion.
- **Tracking:** every task has status tracked in `agent_memory` and, when needed, a repo tracker file.
- **Token economy:** minimize context, logs, repeated prompts, and model overuse at every stage.
- **Documentation cleanup:** after delivery, keep docs aligned with what shipped and archive obsolete planning noise.
- **Memory:** what to search, write, or avoid writing in `agent_memory`.

## Mandatory Skill Stack

Always identify skills needed before execution:

- `rtk-cli`: noisy command output, git status, diffs, tests, logs, builds.
- `caveman`: default compressed prose for plans, prompts, reports, audits, handoffs, and summaries.
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

## Plan Files

Write every delegated plan to repo-local files and `agent_memory` unless the user explicitly asks for chat-only output. Default path: `docs/agent-plans/<YYYY-MM-DD>-<slug>/`. Small plans use `plan.md`, `tracker.md`, and `coordinator-prompt.md`; large plans use `00-overview.md`, one `epic-<id>.md` per epic, `tracker.md`, and `coordinator-prompt.md`.

Post compact memory records for overview, epics, task ownership/status, and coordinator prompt. If `agent_memory` is unavailable, say so, recommend installing/configuring shared memory, and continue with files/tracker as degraded fallback. If memory or file persistence fails, record `Memory persistence: unavailable` or `File persistence: unavailable` in the other medium and final response.

## Task Status Tracking

Use `agent_memory` to track each task with task ID, epic or task-only, owner, status, evidence, next action, and update time. Status values are `planning`, `running`, `blocked`, `failed`, `done`, and `audited`. Write `planning` before dispatch, `running` when work starts, `done` only after verification, and `audited` only after audit.

Also maintain a tracker file when `agent_memory` is unavailable, agents may not share the same backend, or a problem must be preserved in repo-local context. Prefer an existing tracker; otherwise propose `docs/agent-tracking/<plan-id>.md` and confirm whether to commit it.

Set `done` only after task verification evidence exists. Set `audited` only after Auditor approval or recorded residual risk. For `blocked` or `failed`, write reason and next action to memory and tracker file when possible.

## Model Discipline

Pick the smallest sufficient model and reasoning effort for each task:

- `low`: grep, summaries, tiny docs, simple local edits.
- `medium`: normal bounded coding, tests, docs, straightforward fixes.
- `high`: multi-file implementation, UI, integration, nontrivial debugging.
- `xhigh`: architecture ambiguity, subtle regression, security logic, final high-risk verification.

Default lower when bounded and easy to verify. Escalate only for ambiguity, risk, cross-cutting behavior, or hard debugging. Record the reason for every high/xhigh task.

## Granularity

Use task-only plans for one small request, one ownership area, or a few tightly related tasks. Do not invent epics. Use epic plans for multiple goals, ownership areas, workers, phases, or delivery surfaces. Task-only plans still need skills, model/reasoning, ownership, parallelization, verification, tracking, and audit.

## Parallelization

Always look for parallelism before writing serial steps. Batch tasks with disjoint writes, read-only analysis, independent tests, UI validation, audits, or doc cleanup when no ordering dependency exists. Record `max_parallel`, `parallel batch`, `serial because <reason>`, `not parallelizable because <reason>`, or `parallelizable but serialized because <runtime limit>`.

## Delivery Audit

Every delivery must include a separate Auditor task with owner, model/reasoning, inputs, gates, verdict, and evidence. Prefer cross-agent audit when available: Codex delivery uses human-routed Claude-side Auditor; Claude or local/Qwen delivery uses Codex Auditor. Codex must not spawn Claude directly; if cross-agent audit is unavailable, use independent Codex high/xhigh Auditor and record the fallback.

## UI Verification

For UI, frontend, dashboard, demo, browser, responsive, or visual work, Playwright is mandatory. The plan must include URL/server, browser, default viewports `1440x900` and `390x844` unless the app requires others, screenshot or trace paths, console/network error check, and light/dark checks when applicable. If Playwright cannot run, mark the UI task `blocked` or record an explicit environment limitation; do not call UI verification passed.

## Documentation Cleanup

End every non-trivial delivery with a cleanup task. Keep documentation that describes the delivered behavior, operational facts, decisions, and verification evidence. Move superseded plans, stale drafts, failed alternatives, temporary trackers, or noisy intermediate docs into `docs/archive/<YYYY-MM-DD>-<plan-id>/` or the repo's archive path when still useful. Commit trackers/archives only when they are durable project evidence or repo policy requires it. Do not archive the tracker before all tasks are `audited`. Do not delete repo docs unless explicitly allowed.

## Epic Contract

Each epic must include: ID, objective, source of truth, non-goals, required skills, owned/forbidden areas, dependencies, parallelizable-with, acceptance criteria, tasks, and verification gate.

## Task Contract

Each task must include: ID, epic or `none`, objective, required skills, worker role, preferred worker, requested/actual model, requested/actual reasoning, inheritance status, why sufficient, escalation trigger, owned files, forbidden files, inputs, steps, verify with, audit, tracking, done evidence, and `Commit allowed: no`.

The task contract must be convertible into a worker prompt without adding hidden context.

## DO NOT

- Do not write generic plans that omit ownership, skills, model, reasoning, or verification.
- Do not leave delegated plans only in chat; write plan files, post memory records, and create a coordinator prompt.
- Do not invent epics for a small task-only request.
- Do not skip the search for parallelizable tasks.
- Do not paste large logs, diffs, generated files, or long docs into plans or worker prompts.
- Do not default to the coordinator's model or reasoning for worker tasks.
- Do not use high/xhigh without a concrete risk or ambiguity reason.
- Do not finish a delivery without an Auditor task and audit evidence.
- Do not make Codex directly delegate to Claude for audit; route through the user or use a Codex fallback.
- Do not lose task status: if memory is unavailable or questionable, write a tracker file.
- Do not mark `done` or `audited` without evidence.
- Do not mark UI work verified without Playwright evidence or an explicit blocked/skip reason.
- Do not leave stale planning docs mixed with delivered documentation; archive them or mark them obsolete.
- Do not create epics that mix unrelated ownership boundaries.
- Do not assign two workers the same file unless an integrator owns the merge.
- Do not treat missing skills, skipped tests, or unavailable live systems as passing.
- Do not put secrets, tokens, raw private logs, or credentials into task prompts.

## Checklist

- [ ] Source of truth and non-goals are explicit.
- [ ] Plan is written to files and posted to `agent_memory`; large plans are split per epic and include `coordinator-prompt.md`.
- [ ] Plan granularity is justified: task-only for small work, epics for multi-area work.
- [ ] Whole-plan and task skill stacks are listed; epic skill stacks are listed when epics exist.
- [ ] Token economy choices are explicit: RTK/fallback, caveman mode, reference loading, concise evidence, prompt reuse.
- [ ] Every epic, when used, contains executable tasks.
- [ ] Every task has owner, forbidden files, worker role, model, reasoning, and why sufficient.
- [ ] High/xhigh tasks have an escalation/risk reason.
- [ ] Parallelization was actively considered; independent tasks are batched or serialization is justified.
- [ ] Every delivery has an Auditor task; cross-agent audit preference or fallback is recorded.
- [ ] UI/frontend/demo tasks include mandatory Playwright verification or a blocked/skip reason.
- [ ] Task statuses are tracked in `agent_memory`; tracker-file fallback/problem log is defined.
- [ ] Documentation cleanup keeps delivered docs current and archives stale planning noise.
- [ ] Verification gates and done evidence are concrete.
- [ ] Memory search/write/avoid rules are explicit.

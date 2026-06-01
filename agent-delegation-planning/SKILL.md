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

Use `agent-capability-ledger` before follow-up, readiness, cross-tranche, cross-repo, or "what remains" plans. Use `agent-delegation-routing` after the plan exists. Use `agent-memory-coordination` when prompts, ownership, or durable outcomes must be shared across workers.

Load [plan-template](references/plan-template.md) for full plans, multi-task work, or when exact fields matter.
Load [packet-mode](references/packet-mode.md) when highly parallel work needs file-owned packet contracts, dependency waves, or repair packets.
When model choice is unclear, consult `agent-delegation-routing/references/routing-table.md` instead of inventing routing policy.

## Required Shape

Every plan must contain:

- **Source of truth:** repo docs, issue, PR, user request, or tracker that wins over memory/chat.
- **Capability reconciliation:** for follow-up/readiness/multi-tranche work, classify existing capabilities before creating delta tasks.
- **Plan persistence:** write the plan to files and post it to `agent_memory`; do not only answer in chat.
- **Skill stack:** required skills for the whole plan and for each task. Use epic-level skills when epics exist.
- **Plan granularity:** small requests may be task-only; multi-area or multi-goal work uses epics containing tasks.
- **Tasks:** each task has routing reason, repo/branch, owned files, forbidden files, worker role, model, reasoning effort, verification, audit, output format, and done evidence.
- **Parallelization:** actively seek parallel batches; use serial only for real dependencies, shared files, or runtime limits.
- **Packet mode when useful:** highly parallel work may use file-owned packets with an index, `allowed_files`, `forbidden_files`, dependency waves, and repair packets.
- **Integration:** shared files, integrator owner, conflict risks, and final gates.
- **Audit:** every delivery has an Auditor task before completion.
- **Tracking:** every task has status tracked in `agent_memory` and, when needed, a repo tracker file.
- **Execution record:** plan files, tracker, and final report say what actually ran, what was parallelized, what was serialized, and why.
- **Token economy:** minimize context, logs, repeated prompts, and model overuse at every stage.
- **Documentation cleanup:** after delivery, keep docs aligned with what shipped and archive obsolete planning noise.
- **Memory:** what to search, write, or avoid writing in `agent_memory`.

## Mandatory Skill Stack

Always identify skills needed before execution:

- `rtk-cli`: noisy command output, git status, diffs, tests, logs, builds.
- `caveman`: default compressed prose for plans, prompts, reports, audits, handoffs, and summaries.
- `agent-capability-ledger`: required before follow-up, readiness, cross-tranche, cross-repo, "what remains", or "did we already do this?" planning.
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

If the request has 2+ batches, 2+ workers, 2+ ownership areas, multiple phases, or multiple delivery surfaces, it must use epic files. Convert user-provided batches or phases into epics and tasks. Batch files may exist only as routing summaries; `epic-<id>.md` files are the authoritative task contracts.

Post compact memory records for overview, epics, task ownership/status, and coordinator prompt. Before recording `Memory persistence: unavailable`, use `agent-memory-coordination` to discover lazy-loaded memory write tools for create/add/write/save/upsert/edit/update/set operations. If `agent_memory` is unavailable after discovery, say so, recommend installing/configuring shared memory, and continue with files/tracker as degraded fallback. If memory or file persistence fails, record `Memory persistence: unavailable` or `File persistence: unavailable` in the other medium and final response. The final response must paste a fenced `Coordinator prompt` block copied from `coordinator-prompt.md` when it is 120 lines or fewer; if omitted, state `Coordinator prompt not pasted because: <reason>. Path: <path>`.

For large plans, create explicit integrator and auditor task contracts. Use `epic-integration.md` and `epic-audit.md`, or first-class `*.INTEGRATE` and `*.AUDIT` task sections, when integration/audit own shared files, final gates, or nontrivial review.

## Packet Mode

Use packet mode only as an optional execution shape for highly parallel,
file-owned work. Packets are dispatch contracts inside or alongside epics; they
do not replace source-of-truth docs, capability ledgers, task contracts, memory
status, model/reasoning fields, verification, or audit.

Packet plans must include a packet index, dependency waves, one packet file or
section per worker, `allowed_files`, `forbidden_files`, owner/status, exact
verification, and an output contract. Workers get the packet index and assigned
packet by default; add more context only when the packet requires it. Review
boundary compliance before behavior: changed files must be a subset of
`allowed_files`, forbidden files must be untouched, and dependencies must be
complete before later waves start. Use narrow `R#` repair packets for failed
audit findings instead of reopening broad tasks.

## Capability Ledger Gate

Before writing a follow-up, readiness, cross-tranche, cross-repo, or "what remains" plan, use `agent-capability-ledger` to find or create a repo-local ledger. Classify capabilities as `done`, `partial`, `missing`, `blocked`, or `superseded`, with proof class, evidence path, verification command, residual gap, and next delta task. Generate new tasks only from `partial`, `missing`, `blocked`, stale-proof, or newly requested rows. Treat `done` rows as context and `superseded` rows as archive notes.

If no ledger exists, create a baseline ledger from repo docs, trackers, tests, commits, and relevant memory before planning. If memory disagrees with the ledger, repo evidence wins. If both ledger and evidence are missing, ask the user or create an explicit discovery task instead of inventing completed scope.

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

For Codex, Claude Code, Qwen/Ollama, LM Studio, or any other worker, record requested model/reasoning before dispatch and actual model/reasoning after completion when knowable. If the worker path cannot control model/reasoning and the task is low/medium-risk, use direct execution, explicit CLI/local worker, or record `No lower-cost worker available`; do not spawn an inherited senior worker.

Documentation execution defaults to low/medium. If docs touch public command wording, route inventories, release posture, live-proof semantics, security claims, or architecture boundaries, keep the docs edit low/medium and add a separate high Spec Writer/Auditor task for the risky claim. Do not use inherited senior-model/high-reasoning subagents for docs-only editing.

Separate routing fields:

- **Preferred worker/provider:** agent or tool family only, such as Codex CLI, Claude Code, local Qwen/Ollama, LM Studio, human-routed Claude-side Auditor, or no preference.
- **Fallback worker/provider:** viable alternative or `none available`.
- **Requested model/model class:** provider-specific model or model class, separate from worker/provider.
- **Requested reasoning effort:** low, medium, high, or xhigh, separate from worker/provider.

Do not write values like `Codex high` in `Preferred worker/provider`; that mixes provider and reasoning. Do not make Codex the only route unless repo tooling, user instruction, or environment constraints require it. For each role, record at least one non-Codex option or explain why no alternative is viable.

## Granularity

Use task-only plans for one small request, one ownership area, or a few tightly related tasks. Do not invent epics. Use epic plans for multiple goals, ownership areas, workers, phases, batches, crates/packages, CI/live-system tracks, or delivery surfaces. Task-only plans still need skills, model/reasoning, ownership, parallelization, verification, tracking, and audit.

## Parallelization

Always look for parallelism before writing serial steps. Batch tasks with disjoint writes, read-only analysis, independent tests, UI validation, audits, or doc cleanup when no ordering dependency exists. Record `max_parallel`, `parallel batch`, `serial because <reason>`, `not parallelizable because <reason>`, or `parallelizable but serialized because <runtime limit>`.

If execution starts from the plan, the coordinator must either dispatch independent tasks concurrently or record `parallelizable but serialized` with the concrete tool/runtime limitation. Do not call work parallel merely because it was grouped into a batch; parallel means separate workers or execution streams were actually used.

## Delivery Audit

Every delivery must include a separate Auditor task with owner, model/reasoning, inputs, gates, verdict, and evidence. Prefer cross-agent audit when available: Codex delivery uses human-routed Claude-side Auditor; Claude or local/Qwen delivery uses Codex Auditor. Codex must not spawn Claude directly; if cross-agent audit is unavailable, use an independent Auditor on an available provider with sufficient reasoning and record the fallback.

## UI Verification

For UI, frontend, dashboard, demo, browser, responsive, or visual work, Playwright is mandatory. The plan must include URL/server, browser, default viewports `1440x900` and `390x844` unless the app requires others, screenshot or trace paths, console/network error check, and light/dark checks when applicable. If Playwright cannot run, mark the UI task `blocked` or record an explicit environment limitation; do not call UI verification passed.

## Documentation Cleanup

End every non-trivial delivery with a cleanup task. Keep documentation that describes the delivered behavior, operational facts, decisions, and verification evidence. Move superseded plans, stale drafts, failed alternatives, temporary trackers, or noisy intermediate docs into `docs/archive/<YYYY-MM-DD>-<plan-id>/` or the repo's archive path when still useful. Commit trackers/archives only when they are durable project evidence or repo policy requires it. Do not archive the tracker before all tasks are `audited`. Do not delete repo docs unless explicitly allowed.

## Epic Contract

Each epic must include: ID, objective, source of truth, non-goals, required skills, owned/forbidden areas, dependencies, parallelizable-with, acceptance criteria, tasks, exact verification gate commands, and enough detail to dispatch without reading the original chat.

## Task Contract

Each task must include: ID, epic or `none`, objective, required skills, routing reason, repo, branch, worker role, preferred worker/provider, fallback worker/provider, requested/actual model, requested/actual reasoning, inheritance status, why sufficient, escalation trigger, owned files, forbidden files, other agents active, inputs, exact steps, exact verify commands, output format, audit, tracking, done evidence, and `Commit allowed: no`.

Implementation tasks that create or change public APIs, schemas, data contracts, validators, compiler mappings, tests, CLI/user behavior, or integration boundaries must include a minimal `Target API / snippet`, `Compatibility constraints`, and `Example test shape`. Snippets are directional contracts, not full implementations, unless the user provided exact code.

The task contract must be convertible into a worker prompt without adding hidden context. References to `plan.md` may supplement context, but they must not replace exact steps, verification commands, ownership, snippets, or output contract in the task file.

Every coordinator, worker, auditor, integrator, and handoff prompt must include this instruction: `Use $agent-delegation-routing if available to confirm role, model/reasoning, ownership, command shape, and fallback before starting.`

## DO NOT

- Do not write generic plans that omit ownership, skills, model, reasoning, or verification.
- Do not write follow-up/readiness plans before reconciling a capability ledger when the work has prior deliveries.
- Do not execute from chat, memory, or a generic checklist when a file-backed plan is required.
- Do not leave delegated plans only in chat; write plan files, post memory records, and create a coordinator prompt.
- Do not record `Memory persistence: unavailable` before lazy-loaded memory write tool discovery has been attempted.
- Do not leave execution evidence only in chat; update memory when available and the tracker/final report always.
- Do not list `coordinator-prompt.md` without pasting it when it is within the 120-line final-response limit.
- Do not generate a delegation prompt that omits the `$agent-delegation-routing` recommendation when that skill may be available.
- Do not replace required `epic-<id>.md` task contracts with batch files, phase files, or routing summaries.
- Do not call a conceptual batch a packet unless it has file ownership, `allowed_files`, `forbidden_files`, dependencies, verification, and status.
- Do not start a packet before its dependencies are done or explicitly unblocked by the coordinator.
- Do not give packet workers broad context by default; use the packet index and assigned packet unless extra files are necessary.
- Do not repair packet failures by widening scope; create a narrow `R#` repair packet with exact files and re-checks.
- Do not assign implementation work with only prose when an API, schema, mapping, validator, test, or command contract needs a minimal snippet.
- Do not write `Preferred worker/provider: Codex high`; provider, model, and reasoning effort are separate fields.
- Do not make all roles Codex-only unless the user explicitly asks or no other provider is viable; record alternatives or the reason they are unavailable.
- Do not put only `commands in plan.md` or `steps in plan.md` in an epic/task file when that file is meant to dispatch a worker.
- Do not invent epics for a small task-only request.
- Do not skip the search for parallelizable tasks.
- Do not claim parallel execution when independent tasks were merely listed together but run serially by the same coordinator.
- Do not paste large logs, diffs, generated files, or long docs into plans or worker prompts.
- Do not default to the coordinator's model or reasoning for worker tasks.
- Do not spawn inherited-model Codex/Claude subagents for low/medium work when explicit CLI/local/direct execution is available.
- Do not route docs-only workers to inherited senior/high execution; use low/medium or split high-risk review into a separate auditor/spec task.
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
- [ ] Capability ledger was reconciled for follow-up/readiness/multi-tranche work, or not applicable is justified.
- [ ] Plan is written to files and posted to `agent_memory`; large plans are split per epic and include `coordinator-prompt.md`.
- [ ] Memory write capability was discovered before any degraded memory status was recorded.
- [ ] Final response includes the coordinator prompt text or an explicit not-pasted reason and path.
- [ ] Plan granularity is justified: task-only for small work, epics for multi-area work.
- [ ] Any batches/phases are mapped to epics/tasks; batch summaries do not replace `epic-<id>.md` files.
- [ ] Packet mode is used only when it improves parallel file-owned execution; packet index, `allowed_files`, `forbidden_files`, dependency waves, and repair policy are present.
- [ ] Whole-plan and task skill stacks are listed; epic skill stacks are listed when epics exist.
- [ ] Token economy choices are explicit: RTK/fallback, caveman mode, reference loading, concise evidence, prompt reuse.
- [ ] Execution record fields are present: actual dispatch mode, actual/unknown model, actual/unknown reasoning, and serialized/parallelized reason.
- [ ] Every epic, when used, contains executable tasks.
- [ ] Every task has routing reason, repo/branch, owner, forbidden files, worker role, model, reasoning, output format, and why sufficient.
- [ ] Worker/provider, requested model, and requested reasoning are separate; every role has a fallback or a stated reason none exists.
- [ ] Documentation workers are low/medium by default; any high reasoning is a separate reviewer/spec task with a named risk.
- [ ] Epic/task files include exact steps and verification commands, not only pointers to another file.
- [ ] Implementation tasks include target snippets, compatibility constraints, and example test shape when the contract would otherwise be ambiguous.
- [ ] Every generated prompt recommends `$agent-delegation-routing` when available.
- [ ] High/xhigh tasks have an escalation/risk reason.
- [ ] Parallelization was actively considered; independent tasks are batched or serialization is justified.
- [ ] Claimed parallel work used separate workers/execution streams, or the plan says `parallelizable but serialized`.
- [ ] Every delivery has an Auditor task; cross-agent audit preference or fallback is recorded.
- [ ] UI/frontend/demo tasks include mandatory Playwright verification or a blocked/skip reason.
- [ ] Task statuses are tracked in `agent_memory`; tracker-file fallback/problem log is defined.
- [ ] Documentation cleanup keeps delivered docs current and archives stale planning noise.
- [ ] Verification gates and done evidence are concrete.
- [ ] Memory search/write/avoid rules are explicit.

---
name: agent-delegation-planning
description: Use when writing an execution plan that will be delegated to coding agents, subagents, Codex CLI, Claude-side coordinators, Qwen/Ollama, or parallel workers.
license: Apache-2.0
metadata:
  author: fcenedes
  version: "1.1.2"
---
# Agent Delegation Planning

Write file-backed plans that are directly executable by delegated agents. A plan is a binding ownership, routing, skill, and verification contract, not a narrative checklist.

Use `agent-spec-writing` before planning when requirements or source-of-truth behavior are still being authored. Use `agent-capability-ledger` before follow-up, readiness, cross-tranche, cross-repo, or "what remains" plans. Use `agent-delegation-routing` after the plan exists, `agent-memory-coordination` when prompts/status/ownership must be shared, and `agent-plan-lifecycle` after plan creation for status, resume, promotion, closure, or archive.

Load references only when needed:

- [plan-template](references/plan-template.md): full field definitions, task-only and epic skeletons, coordinator prompt, audit handoffs, and anti-overkill examples.
- [packet-mode](references/packet-mode.md): file-owned packet contracts, dependency waves, and repair packets.
- [anchoring](references/anchoring.md): `charter.md`, `00-index.md`, `components.md`, `decisions.md`, resume ritual, and rigid worker reports.
- [mandatory-skills](references/mandatory-skills.md): mandatory skill stack and token-economy rules.
- [planning-guardrails](references/planning-guardrails.md): detailed DO NOT guardrails and final checklist extracted from this root skill.
- `agent-delegation-routing/references/routing-table.md`: model and reasoning policy.

## Required Shape

Every plan is a binding ownership, routing, skill, and verification contract. It must declare these fields:

| Contract area | Required fields |
|---|---|
| Source | source of truth, spec/change source, local terminology sources, non-goals |
| Persistence | plan files, memory backend/namespace/user, tracker fallback, anchor files |
| Control | execution mode, autonomy mode, commit policy, lifecycle state |
| Work shape | task-only or epics, packet mode if used, parallelization, integration owner |
| Tasks | role, provider, model, reasoning, ownership, forbidden files, exact steps, gates |
| Evidence | verification, audit, tracking, done evidence, final report contract |
| Economy | required skills, reference loading, output limits, model sufficiency, cleanup |

Detailed field definitions and templates live in [plan-template](references/plan-template.md).

## Authority

- Authorized: write plan files, post compact records to `agent_memory`, create tracker fallbacks, and dispatch workers when `Execution: start-now`.
- Requires explicit user request: start execution when `Execution: plan-only`, commit, push, change the default branch, or expand scope beyond the declared plan.
- Assessment-only default: when the user describes a planning problem without requesting a change, assess and report findings instead of changing files.

## Execution Start And Autonomy

Execution start and autonomy are separate controls: `Execution: start-now` means write plan files then begin dispatching in the same turn, while `Execution: plan-only` means write the files and coordinator prompt then stop. `Autonomy: autonomous` controls continuation after execution starts: dispatch every wave, verify, audit inline, and keep going until all tasks reach `audited` or a true decision-blocker is hit. Commit policy is a separate explicit gate; autonomy never grants commit or push permission.

When autonomous, proceed without asking for reversible actions that follow from the request. Stop only for destructive actions, genuine scope changes, unavailable environment/secret/live system, unverifiable work, or decisions the user must make: architecture, strategy, product, security, public contract, ownership, scope, or access.

For `checkpoint` or `manual`, honor the requested boundary. Execution/autonomy examples and edge cases are in [planning-guardrails](references/planning-guardrails.md).

## Mandatory Skill Stack And Token Economy

Every plan names required skills and token-economy choices: RTK for noisy output, lazy references, concise worker reports, smallest sufficient model/reasoning, and cleanup of stale planning noise. Use [mandatory-skills](references/mandatory-skills.md) for the full stack.

## Planning Gates

- Persist plans under `docs/agent-plans/<YYYY-MM-DD>-<slug>/` by default and post compact records to `agent_memory` when available. Discover memory write tools before declaring degraded mode.
- Use task-only plans for one small ownership area. Use epics for multiple goals, ownership areas, workers, phases, delivery surfaces, crates/packages, or CI/live-system tracks.
- Use packet mode only for highly parallel, file-owned work; packets supplement epics/tasks and require `allowed_files`, `forbidden_files`, dependencies, verification, and repair policy.
- Interpret local terms from repo source-of-truth docs. If ambiguous, record checked sources, a working interpretation, risk, and a discovery task unless it blocks a true decision.
- Pick the smallest sufficient provider/model/reasoning and keep provider, requested model, and reasoning as separate fields. Docs execution is low/medium unless a separate high-risk reviewer/spec task is justified.
- Track task status in `agent_memory` and tracker fallback with `planning`, `running`, `blocked`, `failed`, `done`, and `audited`; mark `done` only with verification evidence and `audited` only with an Auditor verdict.
- Include Playwright gates for UI/browser work and documentation cleanup for non-trivial deliveries.

## Delivery Audit

Every delivery must include a separate Auditor task with owner, model/reasoning, inputs, gates, verdict, and evidence. Prefer spawning a fresh verification agent with no prior context over self-reviewing; fresh-context verifiers catch claim-vs-evidence mismatches that self-review misses. Before reporting completion, the Auditor must re-run verification commands independently, because claims without tool-result evidence from this session are not accepted.

Use cross-agent audit only through an explicit scoped bridge/tool/CLI. If no safe bridge exists, use an independent available Auditor or user-routed handoff for high-risk claims. Record failed independence as `Audit independence: self-evidence only`.

## Task Contract

Each task must include ID, objective, skills, routing reason, repo/branch, role, provider, requested/actual model and reasoning, inheritance status, sufficiency reason, escalation trigger, owned and forbidden files, inputs, exact steps, exact verification, output format, audit, tracking, done evidence, and `Commit allowed`. API/schema/contract tasks also need target snippet, compatibility constraints, and example test shape. Every generated prompt includes: `Use $agent-delegation-routing if available to confirm role, model/reasoning, ownership, command shape, and fallback before starting.`

## DO NOT

- Do not use this skill for one-file, trivial, or no-handoff work; execute directly.
- Do not write generic plans that omit ownership, skills, model, reasoning, exact verification, audit, or tracking.
- Do not interpret local terms from generic knowledge when repo definitions exist.
- Do not stop an autonomous plan except for a true decision-blocker, unavailable required environment/access, scope change, destructive action, or unverifiable work.
- Do not confuse `Autonomy` with `Execution`, or treat autonomy as commit/push permission.
- Do not leave delegated plans only in chat; write files, memory records when available, and a coordinator prompt.
- Do not skip anchoring for multi-agent, long-running, follow-up, readiness, or resumable plans.
- Do not dispatch from broad chat, generic checklists, batch summaries, or incomplete packets.
- Do not mix provider, model, and reasoning fields, or let workers silently inherit a senior/high coordinator model for low/medium work.
- Do not claim parallelism, completion, UI verification, `done`, or `audited` without current-session evidence.
- Do not defer bounded repair work that the coordinator can fix or delegate immediately.
- Do not pass secrets, private logs, generated artifacts, large diffs, or unrelated context into plans/prompts.
- Run the full detailed guardrails in [planning-guardrails](references/planning-guardrails.md) when producing or auditing a delegated plan.

## Checklist

- [ ] Each item is proved by a command output or file read from this session, not by memory or prior conversation.
- [ ] Request shape justifies planning instead of direct execution.
- [ ] Source of truth, non-goals, local terminology, and capability ledger disposition are explicit.
- [ ] Plan files, memory records or degraded fallback, tracker, and anchoring artifacts are present or omissions justified.
- [ ] Execution mode, autonomy mode, commit policy, granularity, packet decision, and parallelization decision are declared.
- [ ] Every task has ownership, routing, provider/model/reasoning, exact steps, exact verification, output contract, tracking, and done evidence.
- [ ] Provider, requested model, and requested reasoning are separate; docs-only/high-risk split is respected.
- [ ] Generated prompts include `$agent-delegation-routing` and required anchoring/worker report instructions.
- [ ] Bounded blocker policy, Auditor task, independent verification path, and audit evidence are included.
- [ ] UI/browser gates, documentation cleanup, token economy, and final report contract are included when applicable.
- [ ] Detailed checklist in [planning-guardrails](references/planning-guardrails.md) passes before declaring the plan complete.

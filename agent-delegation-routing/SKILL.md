---
name: agent-delegation-routing
description: Use when a coordinator agent needs to route coding work to Codex CLI, Claude-side coordinators, local Qwen/Ollama, LM Studio, or other command-line workers.
license: Apache-2.0
metadata:
  author: fcenedes
  version: 1.1.1
---

# Agent Delegation Routing

Route work to the right worker with explicit scope, command shape, verification, and diff review. After a file-backed plan exists, use this skill to execute or dispatch that plan. Use `agent-capability-ledger` before routing follow-up/readiness work that may duplicate delivered scope, `agent-delegation-planning` before routing multi-task work, and `agent-memory-coordination` for shared prompts, ownership, or outcomes.

Short version: use Claude-side routing for judgment, Codex for repo execution, and Qwen for bounded local work. Codex may request Claude-side audit only through an explicit bridge, tool, or CLI with a scoped no-secrets/no-push prompt; otherwise Claude entries are external choices for Claude-side coordinators or humans.

Load references only when needed:

- Need model choice: read [routing-table](references/routing-table.md).
- Need role contracts: read [specialist-roles](references/specialist-roles.md).
- Need anchored or resumed plan dispatch, `charter.md`, `00-index.md`, `components.md`, `decisions.md`, resume ritual, or rigid worker reports: read [anchoring](../agent-delegation-planning/references/anchoring.md).
- Need commands or workflows: read [command-patterns](references/command-patterns.md) or [delegation-playbooks](references/delegation-playbooks.md).
- Need an executable epic/task plan: use `agent-delegation-planning` first.
- Need delivered/missing/superseded scope: use `agent-capability-ledger` first.
- Need file-owned packet dispatch or the Worker Prompt Contract template: read [worker-contract](references/worker-contract.md); if `agent-delegation-planning` is also installed, optionally load its `references/packet-mode.md`.
- Need the full extracted DO NOT/checklist: read [routing-guardrails](references/routing-guardrails.md).

## Authority

- Authorized: recommend worker, model, reasoning, command shape, verification, and fallback for tasks in an existing plan.
- Not authorized: create the plan itself, dispatch without a file-backed plan, commit, push, or expand task ownership.
- Assessment-only default: when the user asks for routing advice without requesting dispatch, return the routing assessment and stop.

## Routing Matrix

| Need | Default route |
|---|---|
| Judgment | Codex high/xhigh, or Claude Opus through explicit bridge/tool or human/Claude-side routing |
| Repo execution | Codex CLI medium/high/xhigh, based on risk |
| Normal implementation | Codex medium, or Claude Sonnet through explicit bridge/tool or human/Claude-side routing |
| Cheap bounded work | local Qwen/Ollama, LM Studio, Claude Haiku through explicit bridge/tool or human/Claude-side routing, or fast models |
| Documentation execution | low/medium by default; high only for separate public-contract, release, security, or architecture audit/spec role |
| Final high-risk review | Claude Opus through explicit bridge/tool or human/Claude-side routing plus Codex high/xhigh verification |

These defaults are calibrated per model generation. See [routing-table](references/routing-table.md) for model-specific effort guidance.

## Role Selection

Pick the smallest role that preserves quality:

- Coordinator: split work, assign owners, integrate evidence.
- Spec Writer: turn ambiguous work into acceptance criteria and gates.
- Implementor: execute one bounded code task.
- Verifier: approve or reject with evidence.
- Auditor: inspect architecture, runtime seams, delivery claims, and gates.
- PR Reviewer: leave high-confidence review findings only.
- PR Shepherd: move an existing PR toward merge readiness without merging.
- UI Designer: deliver product UI with visual, accessibility, and responsive evidence.
- Capability Ledger Maintainer: update ledger rows from repo evidence, usually low/medium.
- Capability Auditor: verify ledger claims against evidence, medium/high only when cross-repo or high-risk.
- Packet Worker: execute one packet with strict `allowed_files` and `forbidden_files`.
- Packet Reviewer: check dependency order, file boundaries, verification, and repair-packet need.
- Qwen Worker: perform narrow local patch or analysis tasks.
For role contracts, read [specialist-roles](references/specialist-roles.md).
Do not create a specialist role when a simple worker prompt is enough.

Dispatch check: ambiguous work starts with Coordinator or Spec Writer; repo
edits go to Implementor; final approval goes to Verifier or Auditor; cheap
bounded patches may go to Qwen Worker; ledger updates go to Capability Ledger
Maintainer; security, architecture, and high-risk readiness claims do not.

Dispatch sub-agents only when work is genuinely parallel, file-disjoint, or needs fresh-context verification. For sequential single-file tasks, execute directly. Over-delegation wastes tokens and obscures accountability.

## Before Delegating

- Require an executable plan for multiple epics, tasks, files, or workers. Require capability-ledger reconciliation before follow-up/readiness routing that may duplicate delivered scope.
- Re-read anchoring files before anchored or resumed dispatch: `charter.md`, `00-index.md`, `components.md`, and `decisions.md` as applicable.
- Ground local terms in repo source-of-truth docs; create a discovery task for ambiguity unless it blocks a true decision.
- Respect plan controls: `Execution: start-now` may begin dispatch, `Execution: plan-only` waits, `Autonomy: autonomous` runs waves to `audited`, and `Commit policy` alone controls commits.
- Check git status, protect unrelated local changes, and choose direct edit, patch handoff, or isolated worktree.
- Record parallelization decisions. Dispatch disjoint tracks concurrently when runtime supports it; otherwise record `parallelizable but serialized` and why.
- Fix bounded coordinator/integrator blockers directly or dispatch immediate repair tasks/packets; escalate only true decisions, environment/access limits, ownership conflicts, scope expansion, or unverifiable work.

## Worker Prompt Contract And Packet Dispatch

Assumes a file-backed plan from `agent-delegation-planning` already exists;
this skill owns the prompt/dispatch contract, not the plan-file contract.
Every delegated task must be self-contained, and packet-mode dispatch must
confirm dependencies, allowlist/denylist, and verification before starting.
For the full Worker Prompt Contract template and Packet Dispatch review order,
read [worker-contract](references/worker-contract.md).

## Execution From A Plan

Use plan files as the execution contract. Before starting, map every task to `dispatch now`, `run directly`, `parallelizable but serialized`, `blocked`, or `not applicable`; update memory/tracker status before dispatch and after completion. If a runtime cannot dispatch parallel workers, say so explicitly and do not describe the run as parallel.

Do not treat `Autonomy: autonomous` as permission to start execution or commit. Start execution only when `Execution: start-now` or a user/coordinator starts the plan. Commit only when the plan declares `Commit policy: allowed`; workers default to `Commit allowed: no`.

Before final or advisory answers, re-read the active objective, tracker status, capability ledger rows, latest audit verdict, and newest user request. Answer the active residual only.

## Command Shapes

For RTK-aware commands and patch handoff checks, read [command-patterns](references/command-patterns.md). Prefer RTK for non-interactive noisy output, but fall back to raw commands when RTK is unavailable or changes behavior.

## Integration

After each worker returns, inspect `rtk git diff --stat` and targeted file diffs. If RTK is unavailable, use `git diff --stat`. Run focused verification first, then the repo quality gate. Use an integrator for shared files, adjacent tracks, failing combined tests, or behavior that crosses worker boundaries. The integrator/coordinator may make bounded integration fixes when they preserve the active plan and do not change architecture, public contracts, or ownership.

## DO NOT

- Do not use this skill for a one-file fix, a trivial edit, or any task with no durable plan and no multi-agent handoff; just make the change directly.
- Do not make Codex use an uncontrolled Claude handoff; require an explicit bridge/tool/CLI with scoped prompt, or route through the user or a Claude-side coordinator.
- Do not delegate ambiguous product, architecture, or security decisions to a bounded worker.
- Do not interpret local terms from generic model knowledge when repo source-of-truth definitions exist.
- Do not dispatch from a chat-only summary, generic checklist, incomplete packet, or unanchored resume.
- Do not omit requested/actual model, requested/actual reasoning, inheritance status, routing reason, ownership, verification, or fallback.
- Do not silently let workers inherit the coordinator model or reasoning level.
- Do not use inherited senior-model/high-reasoning workers for docs-only or low/medium work.
- Do not serialize independent worker tracks or claim parallel execution without recording actual execution streams.
- Do not defer bounded coordinator-solvable blockers to a future delegation.
- Do not let workers commit, push, touch secrets, overwrite unrelated local changes, or edit outside owned files.
- Do not apply local-model patches without `git apply --check` and diff review.
- Do not wrap interactive agent sessions with RTK.
- Do not treat skipped tests or missing live systems as passing verification.
- Run the full detailed guardrails in [routing-guardrails](references/routing-guardrails.md) when dispatching or auditing routed work.

## Checklist

- [ ] Confirmed the task is not one-file/trivial/no-handoff work.
- [ ] Worker type, provider/model/reasoning, command shape, fallback, and routing reason match task risk.
- [ ] Existing plan, source of truth, ownership, forbidden files, and verification gates are explicit.
- [ ] Capability ledger, anchoring, local terminology, packet contract, and shared-memory needs were checked when applicable.
- [ ] Each task is mapped to dispatch/direct/serialized/blocked/not-applicable before execution.
- [ ] Dispatch path can set model/reasoning, or inherited execution is explicitly rejected.
- [ ] Docs-only workers stay low/medium unless a separate high-risk reviewer/spec task is justified.
- [ ] Git status was checked and unrelated changes are protected.
- [ ] Parallelization decision and actual execution mode are recorded.
- [ ] Worker output was reviewed for ownership, rigid report fields, blocker disposition, and verification evidence.
- [ ] Focused tests and final quality gate completed or skip reasons are recorded.
- [ ] Detailed checklist in [routing-guardrails](references/routing-guardrails.md) passes before declaring routed work complete.

---
name: agent-delegation-routing
description: Use when a coordinator agent needs to route coding work to Codex CLI, Claude-side coordinators, local Qwen/Ollama, LM Studio, or other command-line workers.
license: Apache-2.0
metadata:
  author: fcenedes
  version: "1.3.0"
---

# Agent Delegation Routing

Route work to the right worker with explicit scope, command shape, verification, and diff review. After a file-backed plan exists, use this skill to execute or dispatch that plan. Use `agent-capability-ledger` before routing follow-up/readiness work that may duplicate delivered scope, `agent-delegation-planning` before routing multi-task work, and `agent-memory-coordination` for shared prompts, ownership, or outcomes.

Support Codex and Claude Code coordinators equally: use native workers with explicit model controls, and an explicit scoped bridge/tool/CLI for cross-provider work. Choose by task fit and total cost; use local Qwen when verified hardware and quality make it worthwhile.

Load references only when needed:

- Need model choice: read [routing-table](references/routing-table.md); for prices, cache/tier effects, and cost per accepted task, read [model-pricing](references/model-pricing.md).
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

| Need | Codex route | Claude route |
|---|---|---|
| Cheap bounded work, and any REQ from a change delta that passed the `agent-spec-writing` gate | Direct/local or Luna low/medium | Direct/local or Haiku 4.5; effort unsupported on Haiku |
| Normal implementation/review | Terra medium | Sonnet 5; medium after quality validation, otherwise high |
| Complex coding/integration | Sol medium/high | Opus 4.6 high for demanding work |
| Demanding judgment/high-risk audit | Sol high; Astra for justified escalation | Opus 4.6 high; newer Opus/Fable only for proven benefit |
| Documentation execution | Low/medium; separate high-risk contract review | Haiku or Sonnet at supported cost-conscious settings; separate high-risk review |

Choose the cheapest sufficient **available** model/effort pair using current
billing rates and task evidence. Older does not mean cheaper: do not default to
GPT-5.4/5.5 ahead of Luna/Terra/Sol. Honor explicit pins. Treat API prices,
subscription usage, and local hardware cost separately; record unknown costs.
Prefer explicit `claude-opus-4-6` for Opus work; account for newer Claude
tokenizers producing roughly 30% more tokens for the same text before upgrading.
Record retries, cache/context transfer, verification, latency, and the reason
for escalation. A final review does not automatically need a premium model or
two providers. Model IDs, effort support, and dated prices live in the linked
references; re-check them on the destination runtime.

## Role Selection

Pick the smallest role that preserves quality. Use [specialist-roles](references/specialist-roles.md) for Coordinator, Spec Writer, Implementor, Verifier, Auditor, PR/UI, ledger, packet, and local-worker contracts. Do not create a specialist role when a simple worker prompt is enough.

Dispatch check: ambiguous work → Coordinator or Spec Writer; repo edits → Implementor; final approval → Verifier or Auditor; cheap bounded patches → Qwen Worker; ledger updates → Capability Ledger Maintainer, never security, architecture, or high-risk readiness claims.

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
- Do not dispatch a prompt without the Mission Block (mission, not the mission, spec gap policy) from [specialist-roles](references/specialist-roles.md); do not accept `DONE` without a REQ traceability table; do not let a worker's or coordinator's design replace the spec's.
- Do not interpret local terms from generic knowledge when repo definitions exist; do not dispatch from a chat-only summary, generic checklist, incomplete packet, or unanchored resume.
- Do not omit requested/actual model, requested/actual reasoning, inheritance status, routing reason, ownership, verification, or fallback.
- Do not silently let workers inherit the coordinator model or reasoning level.
- Do not rank cost by generation, assume local inference is free, select premium models or high effort without a task-specific reason, or let docs-only and low/medium work inherit senior-model/high-reasoning workers.
- Do not serialize independent worker tracks or claim parallel execution without recording actual streams; do not defer bounded coordinator-solvable blockers to a future delegation.
- Do not let workers commit, push, touch secrets, overwrite unrelated changes, or edit outside owned files; apply local-model patches only after `git apply --check` and diff review.
- Do not wrap interactive agent sessions with RTK; do not treat skipped tests or missing live systems as passing verification.
- Run the full detailed guardrails in [routing-guardrails](references/routing-guardrails.md) when dispatching or auditing routed work.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "The spec is over-specified; I'll simplify" | Simplifying is redesign. Implement as written; file the concern as DONE_WITH_CONCERNS with the REQ id. |
| "I know a better approach" | Not the mission. A better approach goes back to the spec author as a NEEDS_CONTEXT question, not into the diff. |
| "The spec didn't cover X, so I designed it" | A gap is a stop condition, not a licence. Return NEEDS_CONTEXT naming the REQ and the question. |
| "I implemented the spirit of the spec" | The spirit is unverifiable; the Then scenarios are the contract. Traceability table or it is not done. |
| "The audit checks that it works" | Working is necessary, not sufficient. Spec fidelity is the first gate: every REQ met with evidence, every change mapped to a REQ. |

## Interaction with Other Skills

- **agent-delegation-planning** (upstream): requires a file-backed plan before routing work to workers.
- **agent-capability-ledger** (upstream): reconcile before routing follow-up work that may duplicate delivered scope.
- **agent-memory-coordination** (complementary): use for shared prompts, ownership maps, and outcome tracking.
- **agent-spec-writing** (indirect upstream): a REQ from a gate-passing change delta routes to the cheap tier by default; escalate one tier only when its Test Strategy command fails or the gate recorded the REQ as not small-model-ready.

## Verification

- [ ] The plan file referenced by the routing dispatch exists on disk (`ls` on the plan path confirms).
- [ ] Every worker prompt includes explicit `allowed_files` and `forbidden_files` fields (`grep -c 'allowed_files\|forbidden_files'` returns at least one match per worker prompt).
- [ ] Each task has an explicit model and supported reasoning setting (or `not supported`); inspect both fields and the destination schema.
- [ ] Every task specifies at least one verification command that can be run independently (`grep -i 'verification'` per task returns a concrete command, not a placeholder).
- [ ] No worker prompt contains secrets, tokens, or credentials (`grep -riE 'api_key|token|secret|password'` on prompts returns empty).

## Checklist

- [ ] Confirmed the task is not one-file/trivial/no-handoff work.
- [ ] Worker type, provider/model/reasoning, command shape, fallback, and routing reason match task risk.
- [ ] Existing plan, source of truth, ownership, forbidden files, and verification gates are explicit.
- [ ] Capability ledger, anchoring, local terminology, packet contract, and shared-memory needs were checked when applicable.
- [ ] Each task is mapped to dispatch/direct/serialized/blocked/not-applicable before execution.
- [ ] Dispatch path can set model/supported effort; availability, billing surface, tier, price source/date or unknown, and fallback are recorded.
- [ ] Docs workers use low/medium where supported (Haiku: not supported); high-risk review is separately justified.
- [ ] Git status was checked and unrelated changes are protected.
- [ ] Parallelization decision and actual execution mode are recorded.
- [ ] Worker output was reviewed for ownership, rigid report fields, blocker disposition, verification evidence, and a REQ traceability table with no unrequested changes.
- [ ] Focused tests and final quality gate completed or skip reasons are recorded.
- [ ] Detailed checklist in [routing-guardrails](references/routing-guardrails.md) passes before declaring routed work complete.

# Agent Delegation Routing Guardrails

This reference preserves the detailed DO NOT and checklist content extracted from
`agent-delegation-routing/SKILL.md`. Treat it as normative when dispatching,
reviewing, or auditing routed work.

## Detailed DO NOT

- Do not use routing for a one-file fix, trivial edit, or task with no durable plan and no multi-agent handoff.
- Do not make Codex use an uncontrolled Claude handoff; require an explicit bridge/tool/CLI with scoped prompt, or route through the user or a Claude-side coordinator.
- Do not delegate ambiguous product, architecture, or security decisions to a bounded worker.
- Do not interpret local terms from generic model knowledge when repo source-of-truth definitions exist.
- Do not dispatch ambiguous local terminology without a discovery task or exact user question.
- Do not dispatch anchored or resumed work without reloading the anchor files first.
- Do not accept prose-only worker reports when a rigid report is required.
- Do not change approach or reopen closed scope without checking `decisions.md`.
- Do not give final or advisory answers without re-reading the active objective, tracker, ledger, audit verdict, and newest user request.
- Do not route follow-up/readiness work before checking whether a capability ledger is required.
- Do not dispatch from a chat-only summary when an executable file-backed plan exists.
- Do not route a packet worker without `allowed_files`, `forbidden_files`, dependencies, and exact verification.
- Do not let packet workers edit outside their packet or touch packet docs unless those docs are in `allowed_files`.
- Do not mark a packet done when boundary violations, missing dependencies, or skipped verification are unresolved.
- Do not omit requested model, requested reasoning effort, or routing reason.
- Do not omit actual model, actual reasoning, or inheritance status from worker reports; write `unknown` if not knowable.
- Do not silently let workers inherit the coordinator model or reasoning level.
- Do not call Codex or Claude Code subagents that can only inherit the coordinator model for low/medium-risk work.
- Do not use inherited senior-model/high-reasoning workers for docs-only execution; split high-risk review from low/medium docs editing.
- Do not serialize independent worker tracks without recording why.
- Do not claim a batch was parallel unless separate workers or execution streams actually ran.
- Do not defer bounded coordinator-solvable blockers to a future delegation.
- Do not ask for architecture or strategic decisions for mechanical/local blockers that can be verified inside the active plan.
- Do not accept auditor findings that lack required fix, closure criteria, and suggested disposition.
- Do not give two workers the same owned file unless an integrator owns the merge.
- Do not let workers commit or push unless explicitly assigned.
- Do not commit because autonomy is enabled; require explicit `Commit policy: allowed`.
- Do not pass secrets, tokens, private logs, or credentials in worker prompts.
- Do not apply local-model patches without `git apply --check` and diff review.
- Do not wrap interactive agent sessions with RTK; use RTK for non-interactive commands and verification output.
- Do not treat skipped tests or missing live systems as passing verification.
- Do not let a worker overwrite unrelated local changes.

## Detailed Checklist

- Confirmed the task is not a one-file/trivial/no-handoff change that should be executed directly instead.
- Worker type selected for task risk and ambiguity.
- Capability ledger checked before follow-up/readiness work, or not applicable recorded.
- Anchoring files were re-read before dispatch when anchoring or resume ritual applies.
- Local terminology was grounded in repo source-of-truth docs, or ambiguity was blocked/discovered.
- Multi-task work has an executable epic/task plan from `agent-delegation-planning`.
- Packet-mode work has a packet index; every packet has dependency, allowlist, denylist, verification, and output contract.
- Each plan task is mapped to dispatch/direct/serialized/blocked/not-applicable before execution.
- Requested/actual model, reasoning, inheritance status, and routing reason recorded.
- Worker dispatch path can set model/reasoning, or inherited execution is explicitly rejected.
- Docs-only workers use low/medium reasoning, or a named high-risk contract/release/security reason is recorded for a separate reviewer.
- Git status checked; unrelated changes protected.
- Parallelization decision recorded; independent tracks batched or serialization justified.
- Parallel claims match actual execution streams, not just planned batches.
- Rigid worker report fields were captured when required, including status, files changed, verification, blockers, disposition, assumptions, and next action.
- Reported blockers classified as direct fix, repair task/packet, decision needed, or environment blocked.
- Final/advisory answer is anchored to the active residual, not broadened scope.
- Ownership, source of truth, constraints, and verification are explicit.
- RTK used when available; raw fallback reported when used.
- Long-lived or parallel prompts saved with `agent-memory-coordination` when needed.
- Worker output reviewed against ownership before applying or keeping changes.
- Packet output, when used, passed boundary-first review before behavior review.
- Focused tests and final quality gate completed or skip reasons recorded.

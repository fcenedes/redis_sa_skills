# Agent Delegation Planning Guardrails

This reference preserves the detailed DO NOT and checklist content extracted from
`agent-delegation-planning/SKILL.md`. Treat it as normative when writing,
executing, or auditing a delegated plan.

## Execution And Autonomy Detail

- `Execution: start-now` writes plan files and immediately dispatches in the same turn.
- `Execution: plan-only` writes plan files and coordinator prompt, then stops with a handoff.
- `Autonomy: autonomous` means every wave runs to verification and audit before returning.
- `Autonomy: checkpoint` returns once per wave boundary.
- `Autonomy: manual` returns after each task.
- A true stop is only architecture, strategy, product, security, public-contract,
  ownership, scope, access, unavailable environment/secret/live system, or
  unverifiable work.
- Bounded blockers are fixed directly or by immediate repair task/packet.
- Ambiguous local terminology becomes a discovery task with a recorded working
  interpretation unless the ambiguity blocks a true decision.

## Detailed DO NOT

- Do not use planning for one-file, trivial, or no-handoff work.
- Do not write generic plans that omit ownership, skills, model, reasoning, or verification.
- Do not interpret local architecture or product terms from generic knowledge when repo definitions exist.
- Do not proceed on ambiguous local terminology without checked sources, working interpretation, risk, and disposition.
- Do not stop an `autonomous` plan between waves, after each task, or to ask permission to continue.
- Do not use `Autonomy` as the execution-start control; use `Execution: start-now` or `Execution: plan-only`.
- Do not route validation or audit back to the user by default; run an auditor inline, use scoped bridges when available, and reserve user-routed handoff for unavailable bridges or high-risk claims.
- Do not answer final, advisory, or audit questions without re-anchoring on the active objective, tracker, ledger, latest audit verdict, and newest user request.
- Do not write follow-up or readiness plans before reconciling a capability ledger when prior deliveries exist.
- Do not execute from chat, memory, or a generic checklist when a file-backed plan is required.
- Do not leave delegated plans only in chat; write plan files, post memory records when available, and create a coordinator prompt.
- Do not create a multi-agent, long-running, follow-up, readiness, or resumable plan without `charter.md` and `00-index.md`.
- Do not continue after resume, compaction, audit findings, or scope change without the resume ritual.
- Do not accept worker reports that omit the rigid status block from `references/anchoring.md` when anchoring is required.
- Do not record `Memory persistence: unavailable` before lazy-loaded memory write tool discovery has been attempted.
- Do not leave execution evidence only in chat; update memory when available and the tracker/final report always.
- Do not hand the user a coordinator prompt to fire when `Execution: start-now`; execute it yourself and report results.
- Do not commit because `Execution: start-now` or `Autonomy: autonomous` is set; commit only when the plan declares `Commit policy: allowed`.
- Do not generate a delegation prompt that omits the `$agent-delegation-routing` recommendation when that skill may be available.
- Do not replace required `epic-<id>.md` task contracts with batch files, phase files, or routing summaries.
- Do not call a conceptual batch a packet unless it has file ownership, `allowed_files`, `forbidden_files`, dependencies, verification, and status.
- Do not start a packet before dependencies are done or explicitly unblocked.
- Do not give packet workers broad context by default; use the packet index and assigned packet unless extra files are necessary.
- Do not repair packet failures by widening scope; create a narrow `R#` repair packet with exact files and re-checks.
- Do not assign implementation work with only prose when an API, schema, mapping, validator, test, or command contract needs a minimal snippet.
- Do not write `Preferred worker/provider: Codex high`; provider, model, and reasoning effort are separate fields.
- Do not make all roles Codex-only unless the user explicitly asks or no other provider is viable.
- Do not put only `commands in plan.md` or `steps in plan.md` in an epic/task file meant to dispatch a worker.
- Do not invent epics for a small task-only request.
- Do not skip the search for parallelizable tasks.
- Do not claim parallel execution when independent tasks were listed together but run serially by the same coordinator.
- Do not defer bounded, verifiable blockers to future delegation when they can be fixed directly or by immediate repair task.
- Do not escalate mechanical, local, or integration-scope unblockers as architecture or strategic decisions.
- Do not let auditor findings remain generic; every finding needs required fix, closure criteria, and suggested disposition.
- Do not paste large logs, diffs, generated files, or long docs into plans or worker prompts.
- Do not default to the coordinator's model or reasoning for worker tasks.
- Do not spawn inherited-model Codex/Claude subagents for low/medium work when explicit CLI/local/direct execution is available.
- Do not route docs-only workers to inherited senior/high execution; split high-risk review into a separate auditor/spec task.
- Do not use high/xhigh without a concrete risk or ambiguity reason.
- Do not finish a delivery without an Auditor task and audit evidence.
- Do not make Codex use an uncontrolled Claude handoff for audit; require an explicit bridge/tool/CLI, independent available auditor, or user-routed fallback.
- Do not lose task status: if memory is unavailable or questionable, write a tracker file.
- Do not mark `done` or `audited` without evidence.
- Do not mark UI work verified without Playwright evidence or an explicit blocked/skip reason.
- Do not leave stale planning docs mixed with delivered documentation; archive them or mark them obsolete.
- Do not create epics that mix unrelated ownership boundaries.
- Do not assign two workers the same file unless an integrator owns the merge.
- Do not treat missing skills, skipped tests, or unavailable live systems as passing.
- Do not put secrets, tokens, raw private logs, or credentials into task prompts.

## Detailed Checklist

Each item must be proved by command output, file content, tracker state, memory
record, or explicit not-applicable reasoning from the current session.

- Confirmed the request is not a one-file/trivial/no-handoff task.
- Source of truth and non-goals are explicit.
- Local terminology sources are listed; ambiguous terms have checked sources, interpretation, risk, and disposition.
- Capability ledger was reconciled for follow-up/readiness/multi-tranche work, or not applicable is justified.
- Plan is written to files and posted to `agent_memory` when available; degraded tracker/file fallback is recorded otherwise.
- Large plans are split per epic and include `coordinator-prompt.md`.
- Required anchor files exist: `charter.md`, `00-index.md`, `components.md`, `decisions.md`, or omissions are justified.
- Resume ritual is included in coordinator and worker prompts for resumable work.
- Worker output contract uses the rigid report block when anchoring is required.
- Memory write capability was discovered before any degraded memory status was recorded.
- Execution mode, autonomy mode, and commit policy are declared.
- Final response includes the coordinator prompt text only for `Execution: plan-only` or explicit plan-only requests.
- Plan granularity is justified: task-only for small work, epics for multi-area work.
- Batches/phases are mapped to epics/tasks; batch summaries do not replace `epic-<id>.md` files.
- Packet mode is used only when it improves parallel file-owned execution and includes index, allowlist, denylist, dependencies, and repair policy.
- Whole-plan, epic, and task skill stacks are listed where applicable.
- Token economy choices are explicit: RTK/fallback, caveman mode, reference loading, concise evidence, prompt reuse.
- Execution record fields are present: actual dispatch mode, actual/unknown model, actual/unknown reasoning, and serialized/parallelized reason.
- Goal-retention rule is present for final/advisory/audit answers.
- Every epic contains executable tasks.
- Every task has routing reason, repo/branch, owner, forbidden files, worker role, model, reasoning, output format, and why sufficient.
- Worker/provider, requested model, and requested reasoning are separate; every role has a fallback or reason none exists.
- Documentation workers are low/medium by default, with any high reasoning isolated to a named reviewer/spec task.
- Epic/task files include exact steps and verification commands, not only pointers to another file.
- Implementation tasks include target snippets, compatibility constraints, and example test shape when the contract would otherwise be ambiguous.
- Every generated prompt recommends `$agent-delegation-routing` when available.
- High/xhigh tasks have an escalation/risk reason.
- Parallelization was actively considered, and independent work is batched or serialization is justified.
- Claimed parallel work used separate workers/execution streams, or the plan says `parallelizable but serialized`.
- Coordinator blocker policy is explicit: bounded blockers are fixed directly or repaired immediately; true decisions are escalated.
- Every delivery has an Auditor task; cross-agent audit preference or fallback is recorded.
- Failed or unavailable independent audit paths are recorded as `Audit independence: self-evidence only`.
- UI/frontend/demo tasks include mandatory Playwright verification or a blocked/skip reason.
- Task statuses are tracked in `agent_memory`; tracker-file fallback/problem log is defined.
- Documentation cleanup keeps delivered docs current and archives stale planning noise.
- Verification gates and done evidence are concrete.
- Memory search/write/avoid rules are explicit.

---
name: agent-delegation-routing
description: Use when a coordinator agent needs to route coding work to Codex CLI, Claude-side coordinators, local Qwen/Ollama, LM Studio, or other command-line workers.
license: Apache-2.0
metadata:
  author: fcenedes
  version: 1.0.0
---

# Agent Delegation Routing

Route work to the right worker with explicit scope, command shape, verification, and diff review. After a file-backed plan exists, use this skill to execute or dispatch that plan. Use `agent-capability-ledger` before routing follow-up/readiness work that may duplicate delivered scope. Use `agent-delegation-planning` before routing multi-task work. Use `agent-memory-coordination` for shared prompts, ownership, or outcomes.

Short version: use Claude-side routing for judgment, Codex for repo execution, and Qwen for bounded local work. Codex must not delegate directly to Claude; Claude entries are external choices for Claude-side coordinators or humans.

Load references only when needed:

- Need model choice: read [routing-table](references/routing-table.md).
- Need role contracts: read [specialist-roles](references/specialist-roles.md).
- Need anchored or resumed plan dispatch, `charter.md`, `00-index.md`, `components.md`, `decisions.md`, resume ritual, or rigid worker reports: read [anchoring](../agent-delegation-planning/references/anchoring.md).
- Need commands or workflows: read [command-patterns](references/command-patterns.md) or [delegation-playbooks](references/delegation-playbooks.md).
- Need an executable epic/task plan: use `agent-delegation-planning` first.
- Need delivered/missing/superseded scope: use `agent-capability-ledger` first.
- Need file-owned packet dispatch: use Packet Dispatch below; if `agent-delegation-planning` is also installed, optionally load its `references/packet-mode.md`.

## Routing Matrix

- Judgment: Codex high/xhigh, or Claude Opus only by human/Claude-side routing.
- Repo execution: Codex CLI medium/high/xhigh, based on risk.
- Normal implementation: Codex medium, or Claude Sonnet only by human/Claude-side routing.
- Cheap bounded work: local Qwen/Ollama, LM Studio, Claude Haiku by human/Claude-side routing, or fast models.
- Documentation execution: low/medium only by default; high is for named public-contract, release-claim, security, or architecture ambiguity and is usually an audit/spec role, not a docs worker.
- Final high-risk review: Claude Opus by human/Claude-side routing plus Codex high/xhigh verification.

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

## Before Delegating

If the request spans multiple epics, tasks, files, or workers, require an executable plan first. If the request follows prior deliveries, readiness work, or asks what remains, require a capability ledger reconciliation before the plan. Do not dispatch from a generic checklist. The plan must name source of truth, epics, tasks, required skills, ownership, model/reasoning, parallelization, integration, and verification gates.

When anchoring is present, read `charter.md` and `00-index.md` before every coordinator turn and before every dispatch; read `components.md` before interpreting local terms; read `decisions.md` before reopening closed scope or changing approach.

Before interpreting project-specific architecture, product, runtime, provider,
workflow, registry, worker, audit, replay, orchestration, component, or
authority terms, use the local repo definitions from source-of-truth docs. Do
not route work from memory, prior chat, or generic model knowledge when local
definitions exist. If a term is ambiguous, pause dispatch for a discovery task
or exact user question.

Use `rtk git status` when RTK is installed; otherwise use `git status --short`
and report the fallback. Identify unrelated local changes and choose one
coordination mode:

- Direct edit: the worker may edit only its owned files in the current worktree.
- Patch handoff: the worker returns a unified diff; the coordinator applies it.
- Isolated worktree: risky or parallel work happens outside the main worktree.

Parallelization decision is mandatory. If two or more tracks have disjoint files and no ordering dependency, create a parallel batch with owner, worker type, files, and verification per worker.
Dispatch concurrently when the runtime supports it; otherwise record `parallelizable but serialized` and why. Reserve shared files for an integrator.
If shared memory is available, record ownership and prompts with `agent-memory-coordination`.

Coordinator blocker rule: when execution reveals a bounded blocker that can be
solved within the active plan without architecture, strategy, product, security,
public-contract, ownership, access, or scope decisions, resolve it now. Fix it
directly if it is coordinator/integrator scope, or dispatch an immediate repair
task or `R#` repair packet. Escalate only true decisions, unavailable
environment/access, ownership conflicts, scope expansion, or unverifiable work.

## Packet Dispatch

When a plan uses packet mode, dispatch from the packet index and assigned packet
file. Confirm the packet has `depends_on`, `allowed_files`, `forbidden_files`,
exact verification, requested model/reasoning, and output contract before
starting. Do not start a packet whose dependencies are incomplete unless the
coordinator explicitly unblocks it.

Packet workers receive the packet index and assigned packet by default, then
edit only `allowed_files`. If the task needs another file, the worker stops with
`NEEDS_CONTEXT`; it must not expand scope silently. Packet review order is:
dependency status, changed files subset of `allowed_files`, forbidden files
untouched, acceptance criteria, verification evidence, then integration impact.
For failures, prefer a narrow `R#` repair packet with exact files and re-checks.

## Worker Prompt Contract

Every delegated task must be self-contained:

```text
Role:
Requested model:
Requested reasoning effort:
Actual model: unknown until completion
Actual reasoning effort: unknown until completion
Inherited from coordinator: unknown until completion
Routing reason:
Repo:
Branch:
Source of truth:
You own:
Do not touch:
Other agents active: yes/no
When anchoring applies:
Anchor files read:
Active residual:
Task:
Constraints:
Quality gates:
Verify with:
Output format:
STATUS: DONE | DONE_WITH_CONCERNS | NEEDS_CONTEXT | BLOCKED
FILES_CHANGED:
VERIFICATION_RUN:
VERIFICATION_RESULT:
BLOCKERS:
BLOCKER_DISPOSITION:
ASSUMPTIONS:
NEXT_ACTION:
Commit allowed: no
```

Tell workers to report changed files, commands run, test output summary,
blockers, and assumptions. Tell workers not to revert, reformat, or commit
outside the assigned scope.

Do not use inherited-model subagents for bounded work in Codex or Claude Code. If model control is unavailable, use CLI/local workers with explicit model settings, do the work directly, or report no lower-cost worker is available.

Documentation tasks have a stricter cost rule: do not spawn inherited senior-model/high-reasoning subagents for docs-only execution. Use low/medium reasoning, a local/Qwen worker, a lower-cost CLI worker, or do the docs edit directly. Escalate only a separate Spec Writer/Auditor when the docs decide or certify a public contract, release posture, security claim, or architecture boundary.

Ledger maintenance is usually low/medium: grep evidence, update rows, and record
commands. Use high only for Capability Auditor work involving cross-repo
evidence, conflicting sources of truth, high-risk readiness, security, or
architecture claims.

## Execution From A Plan

When a coordinator prompt points to `agent-delegation-planning` files, use those
files as the execution contract. Before starting, map every task to one of:
`dispatch now`, `run directly`, `parallelizable but serialized`, `blocked`, or
`not applicable`. Update memory/tracker status before dispatch and after worker
completion. If a runtime cannot dispatch parallel workers, say so explicitly and
do not describe the run as parallel.

For anchored or resumed plans, re-read `charter.md` and `00-index.md` before every coordinator turn and dispatch, `components.md` before interpreting local terms, and `decisions.md` before reopening closed scope or changing approach.

If an Auditor, Verifier, or worker reports a gap, classify it as `bounded fix`,
`repair task`, `repair packet`, `decision needed`, or `environment blocked`.
Bounded fixes and repair tasks stay in the current delivery; do not postpone
them to a later delegation merely because they were found during audit.

Before final or advisory answers, re-read the active objective, tracker status,
capability ledger rows, latest audit verdict, and newest user request. Answer
the active residual only; do not broaden the goal or reopen closed scope.

## Command Shapes

For exact RTK-aware commands, read
[command-patterns](references/command-patterns.md). Prefer RTK for token
efficiency, but never require it: if `rtk` is unavailable or changes behavior,
use the raw command and report the fallback.

## Patch Handoff

Use patch handoff for local models that may hallucinate file state or modify too
broadly. Require unified diff only, then check before applying:

```bash
rtk proxy git apply --check worker.patch
rtk proxy git apply worker.patch
```

If RTK is unavailable, use `git apply --check worker.patch` and
`git apply worker.patch`, then report the fallback.

Reject patches that touch files outside ownership, include generated artifacts,
reformat unrelated code, or skip verification without saying why.

## Integration

After each worker returns, inspect `rtk git diff --stat` and targeted file diffs.
If RTK is unavailable, use `git diff --stat`. Run focused verification first,
then the repo quality gate. Use an integrator for shared files, adjacent tracks,
failing combined tests, or behavior that crosses worker boundaries.
The integrator/coordinator may make bounded integration fixes when they preserve
the active plan and do not change architecture, public contracts, or ownership.

## DO NOT

- Do not make Codex spawn or delegate directly to Claude; route through the user or a Claude-side coordinator.
- Do not delegate ambiguous product, architecture, or security decisions to a bounded worker.
- Do not interpret local terms from generic model knowledge when repo source-of-truth definitions exist.
- Do not dispatch ambiguous local terminology without a discovery task or exact user question.
- Do not dispatch anchored or resumed work without reloading the anchor files first.
- Do not accept prose-only worker reports when a rigid report is required.
- Do not change approach or reopen closed scope without checking `decisions.md`.
- Do not give final/advisory answers without re-reading the active objective, tracker, ledger, audit verdict, and newest user request.
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
- Do not pass secrets, tokens, private logs, or credentials in worker prompts.
- Do not apply local-model patches without `git apply --check` and diff review.
- Do not wrap interactive agent sessions with RTK; use RTK for non-interactive commands and verification output.
- Do not treat skipped tests or missing live systems as passing verification.
- Do not let a worker overwrite unrelated local changes.

## Checklist

- [ ] Worker type selected for task risk and ambiguity.
- [ ] Capability ledger checked before follow-up/readiness work, or not applicable recorded.
- [ ] Anchoring files were re-read before dispatch when anchoring or resume ritual applies.
- [ ] Local terminology was grounded in repo source-of-truth docs, or ambiguity was blocked/discovered.
- [ ] Multi-task work has an executable epic/task plan from `agent-delegation-planning`.
- [ ] Packet-mode work has a packet index; every packet has dependency, allowlist, denylist, verification, and output contract.
- [ ] Each plan task is mapped to dispatch/direct/serialized/blocked/not-applicable before execution.
- [ ] Requested/actual model, reasoning, inheritance status, and routing reason recorded.
- [ ] Worker dispatch path can set model/reasoning, or inherited execution is explicitly rejected.
- [ ] Docs-only workers use low/medium reasoning, or a named high-risk contract/release/security reason is recorded for a separate reviewer.
- [ ] Git status checked; unrelated changes protected.
- [ ] Parallelization decision recorded; independent tracks batched or serialization justified.
- [ ] Parallel claims match actual execution streams, not just planned batches.
- [ ] Rigid worker report fields were captured when required, including status, files changed, verification, blockers, disposition, assumptions, and next action.
- [ ] Reported blockers classified as direct fix, repair task/packet, decision needed, or environment blocked.
- [ ] Final/advisory answer is anchored to the active residual, not broadened scope.
- [ ] Ownership, source of truth, constraints, and verification are explicit.
- [ ] RTK used when available; raw fallback reported when used.
- [ ] Long-lived or parallel prompts saved with `agent-memory-coordination` when needed.
- [ ] Worker output reviewed against ownership before applying or keeping changes.
- [ ] Packet output, when used, passed boundary-first review before behavior review.
- [ ] Focused tests and final quality gate completed or skip reasons recorded.

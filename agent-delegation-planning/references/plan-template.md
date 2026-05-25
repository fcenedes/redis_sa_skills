# Agent Delegation Plan Template

Use this template for delegated coding plans. Keep every field concrete enough that a worker can act without reading the original chat.

```markdown
# Plan: <title>

## Control

- Repo:
- Branch:
- Plan directory:
- Plan files:
  - overview:
  - epic files:
  - tracker:
  - coordinator prompt:
- Memory persistence:
  - backend:
  - namespace:
  - user_id:
  - records:
  - status:
- Source of truth:
- Known local changes:
- Goal:
- Non-goals:
- Assumptions:
- Open questions:

## Persistence Rule

- Default directory: `docs/agent-plans/<YYYY-MM-DD>-<slug>/`
- Small plan: write `plan.md`, `tracker.md`, and `coordinator-prompt.md`.
- Large plan: write `00-overview.md`, one `epic-<id>.md` per epic, explicit integrator/auditor task contracts when nontrivial, `tracker.md`, and `coordinator-prompt.md`.
- Epic trigger: 2+ batches, 2+ workers, 2+ ownership areas, multiple phases, multiple delivery surfaces, multiple crates/packages, or CI/live-system tracks require epic files. Convert user-provided batches/phases into epics and tasks. Batch files may exist only as routing summaries; `epic-<id>.md` files are authoritative.
- Memory records:
  - plan overview
  - epic summaries when epics exist
  - task ownership/status records
  - coordinator prompt
- If memory write fails: record `Memory persistence: unavailable` in plan/tracker/final response.
- If `agent_memory` is unavailable: state the degradation, recommend installing/configuring shared memory, and continue with file/tracker fallback.
- If file write fails: record `File persistence: unavailable` in memory/final response.
- Chat response: summarize file paths and memory namespace/backend, then paste a fenced `Coordinator prompt` block copied from `coordinator-prompt.md` when it is 120 lines or fewer. If omitted, write `Coordinator prompt not pasted because: <reason>. Path: <path>`.

## Required Skill Stack

- Whole plan:
  - `rtk-cli`: inspect git, diffs, tests, logs, and build output.
  - `caveman`: default compressed prose for prompts, reports, audits, handoffs, and summaries without changing technical identifiers.
  - `agent-delegation-routing`: route tasks to workers with explicit model/reasoning.
  - `agent-memory-coordination`: track task status, prompts, ownership, and durable outcomes when shared memory is available.
- Repo/task-specific:
  - `<skill>`: `<why needed>`
  - `playwright-cli-agent` or `playwright-test`: required for UI/frontend/demo/browser validation
- Prompt requirement: every coordinator, worker, auditor, integrator, and handoff prompt includes `Use $agent-delegation-routing if available to confirm role, model/reasoning, ownership, command shape, and fallback before starting.`

## Routing And Model Budget Rule

- Preferred worker/provider is the agent or tool family only: Codex CLI, Claude Code, local Qwen/Ollama, LM Studio, human-routed Claude-side Auditor, or no preference.
- Fallback worker/provider is a viable alternative or `none available`.
- Requested model/model class is separate from worker/provider.
- Requested reasoning effort is separate from worker/provider.
- Never write `Preferred worker/provider: Codex high`; use `Preferred worker/provider: Codex CLI` plus `Requested reasoning effort: high`.
- Do not make all roles Codex-only unless the user explicitly asks or no other provider is viable.
- Default bounded implementation: Codex CLI medium, Claude Code Sonnet-class medium, or equivalent.
- Cheap mechanical tasks: local/Qwen/Ollama, Claude Haiku-class, Codex low, or equivalent when available and verifiable.
- High effort only for multi-file, UI, integration, or nontrivial debugging.
- Xhigh only for architecture ambiguity, subtle regressions, security logic, or final high-risk verification.
- If unsure, consult `agent-delegation-routing/references/routing-table.md`.
- Every task below records why its model and reasoning are sufficient.

## Token Economy Plan

- RTK usage:
- Caveman usage:
  - default mode: lite
  - worker report mode: full
  - status/tracker mode: ultra
  - must not compress: code, command flags, identifiers, file paths, error text, safety-critical explanations
- Raw fallback if RTK unavailable:
- References to load lazily:
- Context not to paste:
- Prompt reuse through memory:
- Worker output limit:
- Evidence format:
- Cleanup to reduce future context:

## Granularity Decision

- Shape: task-only / epics
- Reason:
- Epic triggers checked:
  - batches:
  - workers:
  - ownership areas:
  - phases:
  - delivery surfaces:
  - crates/packages:
  - CI/live-system tracks:
- If batches/phases exist, mapping to epics/tasks:
- If task-only, why epics would be overkill:

## Task Tracking

- Memory backend:
- Namespace:
- User ID:
- Tracker file:
- Tracker policy:
  - update memory on every status transition
  - update tracker file when memory is unavailable, backend mismatch is suspected, or a task is blocked/failed
- Status values: planning / running / blocked / failed / done / audited
- Lifecycle:
  - `planning`: write before dispatch
  - `running`: write when worker starts
  - `blocked`: write when context/tool/env/ownership missing
  - `failed`: write when implementation or verification fails
  - `done`: write after task verification evidence exists
  - `audited`: write after Auditor verdict exists

### Task Status Record

```text
Task ID:
Epic or task-only:
Owner:
Status: planning / running / blocked / failed / done / audited
Requested model/model class:
Requested reasoning:
Actual model:
Actual reasoning:
Inherited from coordinator: yes/no/unknown
Evidence:
Next action:
Memory backend:
Tracker path:
Updated at:
```

## Tasks Only

Use this section for a small request where epics would add noise.

### Task T1: <name>

- Objective:
- Required skills:
  - `rtk-cli`: `<command-output reason>`
  - `caveman`: `<prose compression reason>`
  - `agent-delegation-routing`: `<routing reason>`
  - `<repo skill>`: `<domain reason>`
- Token economy:
  - caveman mode:
  - context allowed:
  - context forbidden:
  - expected concise output:
- Prompt instruction: `Use $agent-delegation-routing if available to confirm role, model/reasoning, ownership, command shape, and fallback before starting.`
- Worker role:
- Preferred worker/provider:
- Fallback worker/provider:
- Routing reason:
- Repo:
- Branch:
- Requested model/model class:
- Requested reasoning effort:
- Actual model: unknown until execution
- Actual reasoning effort: unknown until execution
- Inherited from coordinator: unknown until execution
- Why this is sufficient:
- Escalation trigger:
- Owned files:
- Forbidden files:
- Other agents active:
- Inputs:
- Target API / snippet:
- Compatibility constraints:
- Example test shape:
- Steps: exact steps here; references to another file may supplement, not replace them
- Verify with: exact commands here; references to another file may supplement, not replace them
- Output format:
- Playwright evidence if UI/browser work:
  - Skill:
  - URL/dev server:
  - Browser:
  - Command or browser flow:
  - Viewports: `1440x900`, `390x844`, plus repo-specific sizes
  - Light/dark checks:
  - Console/network errors:
  - Screenshot/trace/output: `artifacts/playwright/<task-id>-<viewport>-<theme>.png` or trace path
- Audit:
  - Auditor:
  - Auditor task ID:
  - Preferred audit path:
  - Cross-agent preference/fallback:
  - Inputs:
  - Gates:
  - Verdict:
  - Audit evidence:
- Tracking:
  - Memory record:
  - Tracker row:
  - Initial status: planning
- Done evidence:
- Commit allowed: no

## Epics

Use this section for multi-goal, multi-area, multi-worker, or phased work.

### Epic E1: <name>

- Objective:
- Source of truth:
- Non-goals:
- Required skills:
  - `<skill>`: `<why>`
- Owned areas:
- Forbidden areas:
- Dependencies:
- Parallelizable with:
- Acceptance criteria:
- Verification gate:

#### Task E1.T1: <name>

- Objective:
- Required skills:
  - `rtk-cli`: `<command-output reason>`
  - `caveman`: `<prose compression reason>`
  - `agent-delegation-routing`: `<routing reason>`
  - `<repo skill>`: `<domain reason>`
- Token economy:
  - caveman mode:
  - context allowed:
  - context forbidden:
  - expected concise output:
- Prompt instruction: `Use $agent-delegation-routing if available to confirm role, model/reasoning, ownership, command shape, and fallback before starting.`
- Worker role:
- Preferred worker/provider:
- Fallback worker/provider:
- Routing reason:
- Repo:
- Branch:
- Requested model/model class:
- Requested reasoning effort:
- Actual model: unknown until execution
- Actual reasoning effort: unknown until execution
- Inherited from coordinator: unknown until execution
- Why this is sufficient:
- Escalation trigger:
- Owned files:
- Forbidden files:
- Other agents active:
- Inputs:
- Target API / snippet:
- Compatibility constraints:
- Example test shape:
- Steps: exact steps here; references to another file may supplement, not replace them
- Verify with: exact commands here; references to another file may supplement, not replace them
- Output format:
- Playwright evidence if UI/browser work:
  - Skill:
  - URL/dev server:
  - Browser:
  - Command or browser flow:
  - Viewports: `1440x900`, `390x844`, plus repo-specific sizes
  - Light/dark checks:
  - Console/network errors:
  - Screenshot/trace/output: `artifacts/playwright/<task-id>-<viewport>-<theme>.png` or trace path
- Audit:
  - Auditor:
  - Auditor task ID:
  - Preferred audit path:
  - Cross-agent preference/fallback:
  - Inputs:
  - Gates:
  - Verdict:
  - Audit evidence:
- Tracking:
  - Memory record:
  - Tracker row:
  - Initial status: planning
- Done evidence:
- Commit allowed: no

#### Task E1.T2: <name>

<same fields>

#### Task E1.AUDIT: Audit epic delivery

- Objective: independently audit E1 delivery before completion
- Required skills:
  - `rtk-cli`: inspect diffs and verification output
  - `caveman`: concise findings without dropping evidence
  - `agent-delegation-routing`: pick Auditor model/reasoning
- Worker role: Auditor
- Preferred worker/provider: cross-agent auditor when available
- Fallback worker/provider: independent Auditor in available coding agent
- Prompt instruction: `Use $agent-delegation-routing if available to confirm role, model/reasoning, ownership, command shape, and fallback before starting.`
- Routing reason:
- Repo:
- Branch:
- Requested model/model class:
- Requested reasoning effort:
- Actual model: unknown until execution
- Actual reasoning effort: unknown until execution
- Inherited from coordinator: unknown until execution
- Why this is sufficient:
- Other agents active:
- Inputs:
  - source of truth:
  - changed files:
  - verification evidence:
  - known risks:
- Gates:
  - spec compliance
  - code quality
  - verification completeness
  - runtime/security risk where applicable
- Verdict: APPROVED / NOT APPROVED / BLOCKED
- Findings format: file/line, gate, issue, required fix, residual risk
- Output format:
  - verdict:
  - findings:
  - verification evidence:
  - residual risk:
- Tracking:
  - Memory record:
  - Tracker row:
  - Initial status: planning
- Done evidence:
  - audit verdict:
  - findings or explicit no-findings statement:
  - residual risks:
  - required fixes:
  - evidence paths:
  - status transition to audited:
  - Commit allowed: no

### Epic E2: <name>

<same epic and task fields>

## Parallelization

- Max parallel:
- Decision: parallel batch / serial because <reason> / not parallelizable because <reason>
- Batch files: none / routing summaries only. They must reference task IDs from `epic-<id>.md` and must not replace task contracts.
- Batch note for coordinator: batches are scheduling only; `epic-<id>.md` files are authoritative task contracts.
- Parallel batch 1:
  - `<task id>`: owner, worker, files, verification
  - `<task id>`: owner, worker, files, verification
- Serial steps:
- Why any independent-looking work is serialized:
- Runtime limitation if parallelizable but serialized:
- Parallel candidates checked:
  - read-only analysis:
  - independent tests:
  - UI validation:
  - audits:
  - doc cleanup:

## Integration

- Integrator task contract: `epic-integration.md` / `<epic>.INTEGRATE` / not needed because `<reason>`
- Integrator role:
- Preferred worker/provider:
- Fallback worker/provider:
- Requested model/model class:
- Requested reasoning effort:
- Shared files:
- Conflict risks:
- Merge order:
- Focused verification commands:
- Final quality gate:

## Documentation Cleanup

- Cleanup owner:
- Keep as delivered documentation:
- Update to match shipped behavior:
- Archive stale/noisy docs to: `docs/archive/<YYYY-MM-DD>-<plan-id>/` or repo archive path
- Delete only if explicitly allowed:
- Tracker disposition: keep until all tasks are `audited`; then archive or keep as release evidence
- Commit policy: commit tracker/archive only when durable project evidence or repo policy requires it
- Cleanup verification:

## Memory And Handoff

- Search memory namespace/user:
- Save to memory:
  - plan overview
  - epic summaries
  - task status transitions
  - ownership map
  - coordinator prompt
  - prompts when reused
  - durable outcomes
- Tracker file fallback:
- Tracker file problem log:
- Do not save:
- Token-saving memory use:
  - reusable prompts:
  - compact status summaries:
  - evidence paths instead of pasted logs:
- Worker prompt storage:
- Durable outcomes to record:

## Final Review

- Auditor task:
  - Task ID:
  - Owner:
  - Preferred worker/provider:
  - Fallback worker/provider:
  - Requested model/model class:
  - Requested reasoning:
  - Inputs:
  - Gates:
  - Verdict:
  - Evidence:
- Spec compliance reviewer:
- Code quality reviewer:
- Security/runtime reviewer if needed:
- Cross-agent audit preference:
- Cross-agent audit fallback:
- Required evidence before completion:
```

## Coordinator Prompt

Write this into `coordinator-prompt.md`. Paste the same text in the final response unless it is over 120 lines or the user explicitly asked not to include it:

```text
Role: Coordinator
Plan directory:
Source of truth:
Read first:
- <overview or plan file>
- <tracker file>
- <epic file(s)>
Use if available:
- $agent-delegation-routing before dispatching, to confirm role, model/reasoning, ownership, command shape, and fallback.
Required skills:
- agent-delegation-planning
- agent-delegation-routing
- agent-memory-coordination
- rtk-cli
- caveman
Task:
Execute the plan by dispatching tasks with explicit ownership, model/reasoning, tracking, verification, audit, and documentation cleanup.
Rules:
- Update task status in agent_memory and tracker on every transition.
- Prefer parallel batches where ownership and dependencies allow.
- Treat batches as scheduling only; epic/task files are authoritative contracts.
- Use the smallest sufficient model/reasoning for each task.
- Do not let workers inherit the coordinator model/reasoning by default.
- Keep worker/provider, requested model, and reasoning effort as separate fields.
- Require Playwright evidence for UI/browser work.
- Do not mark done without verification evidence.
- Do not mark audited without Auditor verdict.
- Do not commit unless the user explicitly asks.
Output:
- current status by task
- blockers
- verification evidence
- audit verdicts
- files changed
```

## Final Response Contract

Use this shape after writing plan files:

````text
Plan written and ready to execute.
Files:
- <plan files>
Memory:
- backend: <backend or unavailable>
- namespace: <namespace>
- user: <user_id>
- write: <available/unavailable/degraded>

Coordinator prompt:
```text
<exact coordinator-prompt.md content>
```
````

If the prompt is omitted, replace the `Coordinator prompt` block with:

```text
Coordinator prompt not pasted because: <reason>. Path: <path>
```

## Cross-Agent Audit Handoff

Use the matching handoff. Codex must not spawn Claude directly; route Claude-side audits through the user or a Claude-side coordinator.

### Codex Delivery To Claude-Side Auditor

```text
Please route this audit to Claude-side Auditor.
Use $agent-delegation-routing if available to confirm role, model/reasoning, ownership, command shape, and fallback before starting.
Delivery:
Source of truth:
Changed files:
Owned scope:
Verification already run:
Known risks:
Audit requested:
- spec compliance
- code quality
- missed runtime/security risks
- verification gaps
Return:
- verdict: APPROVED / NOT APPROVED / BLOCKED
- findings with file/line evidence
- required fixes
- residual risks
Do not implement. Do not commit.
```

### Claude Delivery To Codex Auditor

```text
Run Codex Auditor for this Claude-side delivery.
Use $agent-delegation-routing if available to confirm role, model/reasoning, ownership, command shape, and fallback before starting.
Delivery:
Source of truth:
Changed files:
Owned scope:
Verification already run:
Known risks:
Audit requested:
- spec compliance
- code quality
- missed runtime/security risks
- verification gaps
Return:
- verdict: APPROVED / NOT APPROVED / BLOCKED
- findings with file/line evidence
- required fixes
- residual risks
Do not implement. Do not commit.
```

### Local/Qwen Delivery To Codex Auditor

```text
Run Codex Auditor for this local/Qwen patch.
Use $agent-delegation-routing if available to confirm role, model/reasoning, ownership, command shape, and fallback before starting.
Patch or changed files:
Owned scope:
Forbidden scope:
Verification already run:
Audit requested:
- ownership compliance
- obvious correctness issues
- generated artifact leakage
- verification gaps
Return:
- verdict: APPROVED / NOT APPROVED / BLOCKED
- findings with file/line evidence
- required fixes
- residual risks
Do not implement. Do not commit.
```

If cross-agent audit is unavailable, record the fallback and run an independent Codex Auditor.

## Anti-Overkill Examples

Use lower effort when verification is cheap:

| Task | Sufficient routing |
|---|---|
| Rename one symbol in two files | Qwen/local, Claude Haiku-class, or Codex low/medium; grep + tests |
| Add docs table from known facts | Qwen/local, Claude Haiku-class, or Codex low; markdown lint if available |
| Add focused unit tests | Qwen/local, Codex medium, or Claude Sonnet-class medium; run target test |
| Implement one bounded feature | Codex medium or Claude Sonnet-class medium; run focused + repo gate |
| Multi-file UI with screenshots | Codex high or Claude Sonnet/Opus-class with Playwright/browser evidence |
| Security-sensitive auth change | Senior-model high/xhigh plus independent cross-agent review |
| Final architecture challenge | Senior-model xhigh or human-routed senior reviewer |
```

## Audit Examples

| Delivery | Preferred audit |
|---|---|
| Mostly Codex implementation | Human-routed Claude-side Auditor if available; otherwise independent available high/xhigh Auditor |
| Mostly Claude implementation | Codex Auditor when available; otherwise independent non-author Auditor |
| Mostly Qwen/local patch | Codex or Claude Auditor |
| Docs-only low-risk task | Low/medium Auditor on any available provider or human review |

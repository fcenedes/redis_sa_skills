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
- Large plan: write `00-overview.md`, one `epic-<id>.md` per epic, `tracker.md`, and `coordinator-prompt.md`.
- Memory records:
  - plan overview
  - epic summaries when epics exist
  - task ownership/status records
  - coordinator prompt
- If memory write fails: record `Memory persistence: unavailable` in plan/tracker/final response.
- If `agent_memory` is unavailable: state the degradation, recommend installing/configuring shared memory, and continue with file/tracker fallback.
- If file write fails: record `File persistence: unavailable` in memory/final response.
- Chat response: summarize file paths and memory namespace/backend; include `coordinator-prompt.md` text when reasonably sized; do not paste full large plan.

## Required Skill Stack

- Whole plan:
  - `rtk-cli`: inspect git, diffs, tests, logs, and build output.
  - `caveman`: default compressed prose for prompts, reports, audits, handoffs, and summaries without changing technical identifiers.
  - `agent-delegation-routing`: route tasks to workers with explicit model/reasoning.
  - `agent-memory-coordination`: track task status, prompts, ownership, and durable outcomes when shared memory is available.
- Repo/task-specific:
  - `<skill>`: `<why needed>`
  - `playwright-cli-agent` or `playwright-test`: required for UI/frontend/demo/browser validation

## Model Budget Rule

- Default bounded implementation: Codex medium or equivalent.
- Cheap mechanical tasks: local/Qwen/Codex low when available and verifiable.
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
Requested model:
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
- Worker role:
- Preferred worker:
- Requested model:
- Requested reasoning effort:
- Actual model: unknown until execution
- Actual reasoning effort: unknown until execution
- Inherited from coordinator: unknown until execution
- Why this is sufficient:
- Escalation trigger:
- Owned files:
- Forbidden files:
- Inputs:
- Steps:
- Verify with:
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
- Worker role:
- Preferred worker:
- Requested model:
- Requested reasoning effort:
- Actual model: unknown until execution
- Actual reasoning effort: unknown until execution
- Inherited from coordinator: unknown until execution
- Why this is sufficient:
- Escalation trigger:
- Owned files:
- Forbidden files:
- Inputs:
- Steps:
- Verify with:
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
- Preferred worker: cross-agent when available; otherwise independent Codex Auditor
- Requested model:
- Requested reasoning effort:
- Actual model: unknown until execution
- Actual reasoning effort: unknown until execution
- Inherited from coordinator: unknown until execution
- Why this is sufficient:
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

- Integrator role:
- Shared files:
- Conflict risks:
- Merge order:
- Focused verification:
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
  - Requested model:
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

Write this into `coordinator-prompt.md` and provide it in the final response when useful:

```text
Role: Coordinator
Plan directory:
Source of truth:
Read first:
- <overview or plan file>
- <tracker file>
- <epic file(s)>
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
- Use the smallest sufficient model/reasoning for each task.
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

## Cross-Agent Audit Handoff

Use the matching handoff. Codex must not spawn Claude directly; route Claude-side audits through the user or a Claude-side coordinator.

### Codex Delivery To Claude-Side Auditor

```text
Please route this audit to Claude-side Auditor.
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
| Rename one symbol in two files | Codex low/medium or Qwen local; grep + tests |
| Add docs table from known facts | Codex low or local worker; markdown lint if available |
| Add focused unit tests | Codex medium or Qwen local; run target test |
| Implement one bounded feature | Codex medium; run focused + repo gate |
| Multi-file UI with screenshots | Codex high; browser/playwright evidence |
| Security-sensitive auth change | Codex high/xhigh plus independent review |
| Final architecture challenge | Codex xhigh or human-routed senior reviewer |
```

## Audit Examples

| Delivery | Preferred audit |
|---|---|
| Mostly Codex implementation | Human-routed Claude-side Auditor if available; otherwise independent Codex high/xhigh Auditor |
| Mostly Claude implementation | Codex Auditor |
| Mostly Qwen/local patch | Codex Auditor |
| Docs-only low-risk task | Codex low/medium Auditor or human review when available |

# Specialist Role Presets

Use these role presets when a generic worker prompt is not enough. Keep roles
generic: do not include vendor-specific agent APIs, project-specific mission
locks, or repo-specific state.

## Selection Rule

Use the smallest role that can safely complete the task:

| Role | Use When | Good First Model | Must Return |
|------|----------|------------------|-------------|
| Coordinator | Work needs decomposition, ownership, integration, or multiple workers. | Claude Opus or Codex xhigh | Plan, ownership map, gates, integration status. |
| Spec Writer | Requirements are ambiguous or acceptance criteria are missing. | Claude Opus/Sonnet | Goal, non-goals, source of truth, acceptance criteria, verification plan. |
| Implementor | One bounded code task is ready to execute. | Codex medium/high or Claude Sonnet | Files changed, summary, commands run, blockers. |
| Verifier | Work needs evidence-based approval or rejection. | Codex high or Claude Sonnet | Verdict, confidence, evidence, failed gates, next fix. |
| Auditor | Claims about architecture, runtime seams, security, or release readiness need scrutiny. | Claude Opus or Codex xhigh | Findings with evidence, impact, required fix, closure criteria. |
| PR Reviewer | A PR/diff needs high-confidence actionable feedback. | Claude Opus, Codex review, or Codex high | Findings ordered by severity and release-gate notes. |
| PR Shepherd | An existing PR needs coordinated fixes, CI, comments, and readiness tracking. | Codex medium/high | PR status, blockers, delegated fixes, verification state. |
| UI Designer | Product UI needs design-system, a11y, responsive, and visual evidence. | Codex high | UI changes, tokens/components used, screenshots/a11y/responsive checks. |
| Qwen Worker | A narrow local worker task can be verified cheaply. | Qwen local/Ollama | Unified diff or concise report, verification result, blockers. |

The coordinator may override any default when scope, risk, cost, or tool
availability justifies it. Record the reason when overriding a safer default
with a cheaper or less capable worker.

## Model Alternatives

Use the configured current stable model for each family unless the repo or user
pins an exact version. Do not hard-code dated model versions in worker prompts
unless availability was just verified.

| Role | Default | Claude Alternative | Codex Alternative | Local Alternative | Recommended Think |
|------|---------|--------------------|-------------------|-------------------|-------------------|
| Coordinator | Claude Opus | Claude Sonnet for small scope | Codex xhigh | none | high/xhigh |
| Spec Writer | Claude Opus/Sonnet | Claude Opus for ambiguous specs | Codex high/xhigh | none | high |
| Implementor | Codex medium | Claude Sonnet | Codex high for multi-file work | Qwen for narrow patches | medium/high |
| Verifier | Codex high | Claude Sonnet or Opus | Codex xhigh for risky gates | Qwen only for obvious checks | high |
| Auditor | Claude Opus | none for high-risk judgment | Codex xhigh for repo evidence | none | xhigh |
| PR Reviewer | Codex review | Claude Opus for strategic risk | Codex high/xhigh | Qwen only for obvious diff scan | high |
| PR Shepherd | Codex medium/high | Claude Sonnet for comment drafting | Codex high for CI/fix loops | none | medium/high |
| UI Designer | Codex high | Claude Sonnet for design critique | Codex high/xhigh | none | high |
| Qwen Worker | Qwen local/Ollama | Claude Haiku | Codex low/medium | Qwen Coder | low/medium |

Default version policy:

- Claude: use the configured current stable Opus, Sonnet, or Haiku variant.
- Codex: use the configured current Codex coding model with the listed reasoning effort.
- Qwen/local: use the strongest locally installed Qwen Coder model that fits latency and memory.
- If exact model identity matters, the coordinator records the model name and why.

## Routing Evidence

Every delegated task and worker report must record:

```text
Requested model:
Requested reasoning effort:
Actual model:
Actual reasoning effort:
Inherited from coordinator: yes/no/unknown
Routing reason:
```

Use `Routing reason: default for role` when the role table default is used. For
overrides, record the concrete reason: cost, latency, local availability,
repo-tool need, high-risk review, security sensitivity, or bounded low-risk
scope. If the actual model or reasoning level is unknown, write `unknown`
instead of guessing.

Never let a delegated worker inherit the coordinator model or reasoning level by
omission. If the delegation tool cannot force model or reasoning, record
`Actual model: unknown`, `Actual reasoning effort: unknown`, and
`Inherited from coordinator: unknown`, then explain why the risk is acceptable.

## Worker Status

Workers must report exactly one status:

- `DONE`: task complete; proceed to verification.
- `DONE_WITH_CONCERNS`: task complete but concerns need coordinator review.
- `NEEDS_CONTEXT`: missing context; coordinator provides it before retry.
- `BLOCKED`: cannot complete; coordinator changes context, model, scope, or escalates.

Do not force the same worker to retry a `BLOCKED` task without changing
something material: context, ownership, model capability, or task size.

## Shared Quality Gates

Apply the gates that fit the repo and task. When the repo has explicit gates,
repo gates win. When no repo rule exists, default release-critical production
coverage target is greater than 85%.

- Acceptance criteria are necessary but not sufficient.
- Source-of-truth boundaries must stay explicit.
- Production logic must not be copied across modules.
- Public contracts must be preserved, versioned, or migrated.
- Hot paths need performance, timeout, retry, and backpressure expectations.
- Failure, retry, cancellation, and idempotency behavior must be tested or documented.
- Skipped tests, missing live systems, or missing env vars are skips, not passes.

## Coordinator Contract

Use for planning and integration. Do not edit code directly unless the user
explicitly asks the coordinator to act as a solo developer.

```text
Role: Coordinator
Requested model:
Requested reasoning effort:
Routing reason:
Goal:
Source of truth:
Workers available:
Constraints:
Required gates:
Output:
- decomposition
- ownership map
- verification plan
- integration risks
```

## Spec Writer Contract

Use when the task is not implementation-ready.

```text
Role: Spec Writer
Requested model:
Requested reasoning effort:
Routing reason:
Goal:
Existing docs/specs:
Non-goals:
Architecture boundaries:
Output:
- goal
- scope
- non-goals
- source of truth
- acceptance criteria
- quality gates
- verification plan
- rollback or migration notes
Do not implement.
```

## Implementor Contract

Use for bounded code changes.

```text
Role: Implementor
Requested model:
Requested reasoning effort:
Routing reason:
Repo:
Branch:
You own:
Do not touch:
Task:
Acceptance criteria:
Constraints:
Verify with:
Commit allowed: no
Output:
- requested model
- requested reasoning effort
- actual model
- actual reasoning effort
- inherited from coordinator: yes/no/unknown
- routing reason
- files changed
- summary
- commands run
- test result
- blockers
```

## Verifier Contract

Use after implementation or before claiming completion.

```text
Role: Verifier
Requested model:
Requested reasoning effort:
Routing reason:
Repo:
Branch:
Source of truth:
Changed files or diff:
Acceptance criteria:
Quality gates:
Commands to run:
Output:
- verdict: APPROVED / NOT APPROVED / BLOCKED
- confidence: High / Medium / Low
- requested model
- requested reasoning effort
- actual model
- actual reasoning effort
- inherited from coordinator: yes/no/unknown
- routing reason
- evidence
- failed gates
- smallest next fix if not approved
Do not implement fixes.
```

## Auditor Contract

Use for architecture, runtime seam, security, or release-gate claims.

```text
Role: Auditor
Requested model:
Requested reasoning effort:
Routing reason:
Scope:
Claims to verify:
Source of truth:
Evidence to inspect:
Audit mode: architecture_gate / quality_gate / regression_gate / release_gate / deep_audit
Output:
- executive verdict
- requested model
- requested reasoning effort
- actual model
- actual reasoning effort
- inherited from coordinator: yes/no/unknown
- routing reason
- checks run
- closed claims
- open claims
- findings with evidence, impact, required fix, closure criteria
- recommended order
Do not implement fixes.
```

## PR Reviewer Contract

Use for objective PR review.

```text
Role: PR Reviewer
Requested model:
Requested reasoning effort:
Routing reason:
PR or diff:
Review focus:
Release gates:
Output:
- verdict: Approved / Needs Changes / Request Changes
- high-confidence findings only
- file/line when available
- release-gate notes
Avoid subjective nits and broad rewrites.
```

## PR Shepherd Contract

Use when a PR exists and needs loop management.

```text
Role: PR Shepherd
Requested model:
Requested reasoning effort:
Routing reason:
PR:
Source of truth:
Merge-ready definition:
Available workers:
Commit allowed: no
Push allowed: no
Output:
- CI status
- mergeability
- unresolved comments
- delegated fixes
- verification status
- remaining human actions
Do not merge unless explicitly instructed.
```

## UI Designer Contract

Use for UI implementation or UI review.

```text
Role: UI Designer
Requested model:
Requested reasoning effort:
Routing reason:
Repo:
Design system:
Screens/components:
Task:
Accessibility target:
Responsive targets:
Verify with:
Commit allowed: no
Output:
- screens/components changed
- tokens/components reused
- keyboard/focus/contrast evidence
- responsive evidence
- browser or screenshot evidence
- risks
```

## Qwen Worker Contract

Use for cheap local bounded tasks. Prefer patch handoff.

```text
Role: Qwen Worker
Requested model:
Requested reasoning effort:
Routing reason:
Repo:
You own only:
Do not edit anything else.
Task:
Constraints:
Return a unified diff only unless asked for analysis.
Do not commit.
Run or state this verification:
Report blockers.
```

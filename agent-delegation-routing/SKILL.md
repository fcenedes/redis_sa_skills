---
name: agent-delegation-routing
description: Use when a coordinator agent needs to delegate coding work to external worker agents such as Codex CLI, Claude Code, local Qwen/Ollama, LM Studio, or other command-line models.
license: Apache-2.0
metadata:
  author: fcenedes
  version: 1.0.0
---

# Agent Delegation Routing

Route work from a coordinator agent to the right worker agent with explicit
scope, command shape, verification, and diff review. Use
`agent-memory-coordination` as well when prompts, ownership, or outcomes must be
shared across parallel agents or future sessions.

Short version: use Claude for judgment, Codex for execution inside a repo, and
Qwen for bounded local worker tasks.

Load references only when needed:

- Need model choice: read [routing-table](references/routing-table.md).
- Need role contracts: read [specialist-roles](references/specialist-roles.md).
- Need exact commands or workflow shape: read [command-patterns](references/command-patterns.md) or [delegation-playbooks](references/delegation-playbooks.md).

## Routing Matrix

- Judgment: Claude Opus, Codex high/xhigh, or equivalent senior model.
- Repo execution: Codex CLI medium/high/xhigh, based on risk.
- Normal implementation: Codex medium or Claude Sonnet from a clear plan.
- Cheap bounded work: local Qwen/Ollama, LM Studio, Claude Haiku, or fast models.
- Final high-risk review: Claude Opus plus Codex high/xhigh verification.

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
- Qwen Worker: perform narrow local patch or analysis tasks.
For role contracts, read [specialist-roles](references/specialist-roles.md).
Do not create a specialist role when a simple worker prompt is enough.

Dispatch check: ambiguous work starts with Coordinator or Spec Writer; repo
edits go to Implementor; final approval goes to Verifier or Auditor; cheap
bounded patches may go to Qwen Worker; security and architecture do not.

## Before Delegating

Use `rtk git status` when RTK is installed; otherwise use `git status --short`
and report the fallback. Identify unrelated local changes and choose one
coordination mode:

- Direct edit: the worker may edit only its owned files in the current worktree.
- Patch handoff: the worker returns a unified diff; the coordinator applies it.
- Isolated worktree: risky or parallel work happens outside the main worktree.

For parallel work, assign disjoint file ownership and reserve shared files for
an integrator. If shared memory is available, record the ownership map and
worker prompts with `agent-memory-coordination`.

## Worker Prompt Contract

Every delegated task must be self-contained:

```text
Role:
Requested model:
Requested reasoning effort:
Routing reason:
Repo:
Branch:
Source of truth:
You own:
Do not touch:
Other agents active: yes/no
Task:
Constraints:
Quality gates:
Verify with:
Output format:
Commit allowed: no
```

Tell workers to report changed files, commands run, test output summary,
blockers, and assumptions. Tell workers not to revert, reformat, or commit
outside the assigned scope.

Do not let workers inherit the coordinator model by omission; if model control
is unavailable, report `unknown` actual model and why that is acceptable.

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

## DO NOT

- Do not delegate ambiguous product, architecture, or security decisions to a bounded worker.
- Do not omit requested model, requested reasoning effort, or routing reason.
- Do not silently let workers inherit the coordinator model or reasoning level.
- Do not give two workers the same owned file unless an integrator owns the merge.
- Do not let workers commit or push unless explicitly assigned.
- Do not pass secrets, tokens, private logs, or credentials in worker prompts.
- Do not apply local-model patches without `git apply --check` and diff review.
- Do not wrap interactive agent sessions with RTK; use RTK for non-interactive commands and verification output.
- Do not treat skipped tests or missing live systems as passing verification.
- Do not let a worker overwrite unrelated local changes.

## Checklist

- [ ] Worker type selected for task risk and ambiguity.
- [ ] Requested/actual model, reasoning, inheritance status, and routing reason recorded.
- [ ] Git status checked; unrelated changes protected.
- [ ] Ownership, source of truth, constraints, and verification are explicit.
- [ ] RTK used when available; raw fallback reported when used.
- [ ] Long-lived or parallel prompts saved with `agent-memory-coordination` when needed.
- [ ] Worker output reviewed against ownership before applying or keeping changes.
- [ ] Focused tests and final quality gate completed or skip reasons recorded.

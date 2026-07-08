# Worker Prompt Contract And Packet Dispatch

This skill owns the prompt/dispatch contract only. It assumes a file-backed plan
from `agent-delegation-planning` already exists; it does not define the plan
file contract (epics, tasks, tracker) — that lives in `agent-delegation-planning`.

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

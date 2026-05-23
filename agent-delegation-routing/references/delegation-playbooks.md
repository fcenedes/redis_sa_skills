# Delegation Playbooks

Use the smallest playbook that fits the task. Escalate only when risk,
ambiguity, or repeated failure justifies more coordination.

## Solo Implementor

Use when one agent can safely own the full change.

1. Coordinator writes a compact task contract.
2. Implementor edits only owned files.
3. Implementor runs focused verification.
4. Coordinator reviews diff and runs the final gate.

Best worker: Codex medium/high or Claude Sonnet.

## Two-Model Security Or High-Risk Review

Use when one pass is not enough.

1. Claude Opus or equivalent reviews architecture and threat assumptions.
2. Codex high/xhigh inspects repo evidence and runs verification.
3. Coordinator compares findings and resolves contradictions with code evidence.
4. No approval unless both reasoning and repo evidence support it.

## Fresh-Worker Loop

Use when a bounded task keeps failing or stale context is hurting progress.

1. Coordinator records current plan, failures, and smallest next focus.
2. Fresh implementor receives only the current task, constraints, and prior verifier feedback.
3. Fresh verifier receives changed files, acceptance criteria, and quality gates.
4. Coordinator repeats with the smallest next fix.
5. Stop after 3 failures on the same issue or 10 total iterations.

State must live in repo docs, shared memory, or a ledger, not child-agent chat
history.

## PR Shepherding

Use when a PR exists.

1. Check CI, mergeability, review comments, requested changes, and release gates.
2. Group related fixes.
3. Delegate code changes to implementors.
4. Delegate final verification to verifier.
5. Request re-review or rerun CI only when justified.
6. Do not merge unless explicitly instructed.

## UI Delivery

Use when UI changes are part of the task.

1. Identify design tokens, component primitives, styling approach, and similar screens.
2. Implement with the existing design system.
3. Verify keyboard navigation, focus states, contrast, responsive viewports, and loading/error/empty states.
4. Provide browser or screenshot evidence when feasible.

Best worker: Codex high for implementation and browser verification.

## Audit Gate

Use before closing architecture, runtime seam, release, or security claims.

1. Extract explicit claims.
2. Inspect runtime paths, contracts, tests, observability, and docs.
3. Compare source-of-truth boundaries.
4. Produce findings with evidence, impact, required fix, and closure criteria.
5. Do not implement fixes in the audit pass.

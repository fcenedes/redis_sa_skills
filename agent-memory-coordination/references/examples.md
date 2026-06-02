# Agent Memory Coordination Examples

Use these examples as copy-ready shapes for shared `agent_memory` coordination.

## Semantic Worker Prompt

```text
namespace: repo-example-service
user_id: <user_id>
memory_type: semantic
topics: worker-prompt, track-auth
entities: example service, auth worker

You are the auth-hardening worker.
Repo: /path/to/example-service
You own: src/auth/**, tests/auth/**, config/auth.yaml
Do not edit: files outside your ownership.
Other workers are active; do not revert or reformat files you do not own.
Invariants: every endpoint requires a valid JWT; no raw SQL.
Verify: pytest tests/auth -q
Do not commit. Report files changed, test output, and blockers.
```

## Episodic Gate Result

```text
namespace: repo-example-service
user_id: <user_id>
memory_type: episodic
topics: gate-result, 2026-05-21
entities: example service, integration gate

2026-05-21: Integration gate passed for auth and retrieval tracks.
Live service proof skipped because EXAMPLE_SERVICE_URL was unset; this is not a passed proof.
Unit and integration tests passed with pytest -q.
```

## Coordination Packet

```text
namespace:
user_id:
worker:
owns:
must_not_touch:
constraints:
verify:
report:
may_commit:
```

## Cross-Agent Bootstrap When Memory Is Empty

Use this block for Claude Code, Codex, or other agents when a repo has versioned
coordination docs but shared memory has no matching entries:

```text
If `agent_memory` returns no relevant memories but the repo contains coordination docs, do not stop.

1. Confirm branch and commit.
2. Read the repo coordination docs.
3. Treat versioned repo docs as source of truth.
4. Create a local memory in the available backend with the coordination summary.
5. Continue the review or implementation.

Required report:

Memory backend: <name or unknown>
Namespace searched: <namespace>
User id searched: <user_id>
Relevant memories found: yes/no
Fallback used: repo docs / none
Memory seeded: yes/no
```

Search multiple forms before declaring memory empty:

```text
namespace: repo-<repository-name>
queries:
- <repository-name> <plan-or-track-name>
- <repository-name> ownership boundaries
- <main feature or proof name>
- <important subsystem or invariant>
- agent coordination <repository-name>
```

## Standard Repo-Backed Memory Seed Template

When project memories are missing but repo coordination docs exist, save a
project-specific memory from the repo docs if the backend supports writes. Do
not hard-code customer, project, or proof details in this generic skill; fill
this template from the target repository's versioned docs.

```markdown
Namespace: `repo-<repository-name>`
User id: `<user_id>`
Memory type: `semantic`
Topics: `<repository-name>`, `<plan-or-track-name>`, `agent coordination`

Text:
For `<repository-name>` work, agents must treat `<tracker-or-plan-path>` as the
execution source of truth. Before touching tasks, read `<management-rules-path>`,
`<spec-coverage-path>`, and any linked epic or tracker docs. Current scope:
`<short scope summary from repo docs>`. Out of scope: `<explicit exclusions from
repo docs>`. Use repo docs over memory when they conflict, and update this memory
after the repo docs change.
```

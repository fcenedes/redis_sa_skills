# Agent Memory Coordination Examples

Use these examples as copy-ready shapes for shared `agent_memory` coordination.

## Semantic Worker Prompt

```text
namespace: redis-protected-retrieval
user_id: pierre
memory_type: semantic
topics: worker-prompt, track-auth
entities: redis-protected-retrieval, auth worker

You are the auth-hardening worker.
Repo: /Users/pierre/Documents/Work/redis-protected-retrieval
You own: src/auth/**, tests/auth/**, config/auth.yaml
Do not edit: files outside your ownership.
Other workers are active; do not revert or reformat files you do not own.
Invariants: every endpoint requires a valid JWT; no raw SQL.
Verify: pytest tests/auth -q
Do not commit. Report files changed, test output, and blockers.
```

## Episodic Gate Result

```text
namespace: redis-protected-retrieval
user_id: pierre
memory_type: episodic
topics: gate-result, 2026-05-21
entities: redis-protected-retrieval, integration gate

2026-05-21: Integration gate passed for auth and retrieval tracks.
Live Redis proof skipped because PILOT_REDIS_URL was unset; this is not a passed proof.
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

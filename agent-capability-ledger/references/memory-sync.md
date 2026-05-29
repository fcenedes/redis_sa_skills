# Memory Sync

Use `agent_memory` as a coordination cache for capability ledgers. Repo files
remain the source of truth.

## Search Before Updating

Search with the narrowest useful namespace and user ID:

```text
namespace: repo-<name>
user_id: pierre
queries:
- <repo> capability ledger
- <domain> readiness status
- <capability id>
- <plan id> residual gaps
```

Report:

```text
Memory backend: <name or unknown>
Namespace searched: <namespace>
User id searched: <user_id>
Relevant memories found: yes/no
Fallback used: repo ledger / repo docs / none
Memory write available: yes/no
Memory updated: yes/no
```

## Semantic Memory Packet

Use semantic memory for stable ledger location and source hierarchy:

```markdown
Namespace: repo-<name>
User id: pierre
Memory type: semantic
Topics: capability-ledger, source-of-truth, coordination

For <repo/domain>, the capability ledger source of truth is
`docs/capability-ledger.md` or `<path>`. Agents must reconcile this ledger before
writing follow-up plans. `agent_memory` is a cache/index only.
```

## Episodic Status Packet

Use episodic memory for dated status changes:

```markdown
Namespace: repo-<name>
User id: pierre
Memory type: episodic
Topics: capability-ledger, <capability-id>, status

2026-05-29: <capability-id> moved to <status>. Evidence: `<path>`.
Verification: `<command or skip reason>`. Next delta: `<task id or none>`.
```

## Conflict Handling

- If memory says `done` but the ledger says `partial`, follow the ledger.
- If memory has a newer dated proof, verify it against repo evidence before
  updating the ledger.
- If both memory and ledger are missing, create a baseline ledger from repo docs
  before planning.
- If memory write is unavailable, continue with repo files and report degraded
  mode.

## Do Not Store

- secrets, credentials, tokens, private raw logs;
- raw generated outputs;
- guesses or contradicted facts;
- broad memories that omit repo/domain scope;
- chat-only claims without evidence paths.

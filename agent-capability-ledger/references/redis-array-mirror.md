# Optional Redis Array Mirror

Redis Array can make a capability ledger live-queryable for orchestration,
dashboards, and agent coordination. Use it as a mirror only. Markdown in the
repo remains the source of truth.

## Mapping

- One ledger file maps to one array key.
- One capability row maps to one array element.
- Each element stores row ID, status, proof class, evidence, verification
  command, last validated date, supersession, residual gap, and next delta task.

Example key shape:

```text
ledger:<repo>:<domain>
```

Example element shape:

```json
{
  "id": "CAP.001",
  "capability": "Context compiler selection profile bridge",
  "status": "partial",
  "proof_class": "integration",
  "evidence_path": "crates/compiler/tests/profile_bridge.rs",
  "verify": "cargo test -p compiler profile_bridge",
  "last_validated": "2026-05-29",
  "superseded_by": null,
  "residual_gap": "No live runtime proof",
  "next_delta_task": "E2.T4"
}
```

## Query Uses

- Find all `missing` or `partial` rows before planning.
- Find stale proof rows older than a validation date.
- Show live task state for a coordinator.
- Compare memory task status with repo ledger status.
- Produce a readiness dashboard without parsing Markdown repeatedly.

## Sync Rules

- Write the repo file first, then mirror into Redis.
- Include source file and row ID in each element.
- Include an update timestamp and agent name when available.
- If Redis is unavailable, continue with Markdown.
- If Redis conflicts with Markdown, Markdown wins.

## Not Required

Do not require Redis Array for normal skill use. It is useful when a project
already has Redis 8.8, live coordination, or dashboard needs.

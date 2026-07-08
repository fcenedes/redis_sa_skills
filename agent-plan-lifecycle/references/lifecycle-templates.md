# Lifecycle Templates

Use these templates to keep plan status, promotion, and archive records compact
and auditable.

## `00-index.md`

```markdown
# Status Board: <plan title>

Plan ID:
Plan state: planned | running | verified | audited | promoted | archived | blocked | failed | superseded
Charter:
Tracker:
Capability ledger:
Change delta:
Latest verification:
Latest audit:
Promotion record:
Archive record:
Last updated:
Active residual:
Next coordinator action:

| Work Item | Task State | Owner | Allowed Files | Blocker / Disposition | Evidence | Next Action |
|---|---|---|---|---|---|---|

Task states: `planning`, `running`, `blocked`, `failed`, `done`, `audited`.
Blocker dispositions: `fixed directly`, `repair delegated`, `blocked for decision`, `blocked for environment`, `none`.
```

## `promotion.md`

```markdown
# Promotion: <plan title>

Plan ID:
Date:
Promoted by:
Plan state before promotion:

## Verification

- Commands:
- Result:
- Evidence:

## Audit

- Auditor:
- Verdict:
- Residual risk:

## Durable Truth Updated

| Surface | Path / Record | Change | Evidence |
|---|---|---|---|
| Capability ledger |  |  |  |
| Spec/docs |  |  |  |
| Memory |  |  |  |
| Commit |  |  |  |

## Remaining Gaps

## Promotion Decision

Plan state after promotion: promoted | blocked | failed
```

## Capability Ledger Row Promotion Example

Use this shape when promotion updates a capability ledger row. See
`agent-capability-ledger` for the full row schema and status rules.

Before promotion (row in `docs/capability-ledger.md`):

```markdown
| ID | Capability | Status | Proof class | Evidence | Verify | Residual gap | Next delta |
|---|---|---|---|---|---|---|---|
| CAP.014 | Stream consumer retry backoff | partial | unit | `src/stream/retry.rs` tests | `cargo test retry_backoff` | no live-Redis proof | run local-live proof, then promote |
```

After promotion (same row, updated in place; old state referenced from `promotion.md`):

```markdown
| ID | Capability | Status | Proof class | Evidence | Verify | Residual gap | Next delta |
|---|---|---|---|---|---|---|---|
| CAP.014 | Stream consumer retry backoff | done | local-live | `src/stream/retry.rs` tests + `logs/retry-backoff-live-2026-05-29.txt` | `REDIS_URL=redis://localhost:6380 cargo test retry_backoff_live` | none | none |
```

`promotion.md` for this change records:

```markdown
| Surface | Path / Record | Change | Evidence |
|---|---|---|---|
| Capability ledger | `docs/capability-ledger.md#CAP.014` | partial -> done | `logs/retry-backoff-live-2026-05-29.txt` |
```

## `archive.md`

```markdown
# Archive: <plan title>

Plan ID:
Date:
Archived by:
Final plan state:

## Final Result

STATUS: DONE | DONE_WITH_CONCERNS | BLOCKED

## Files Changed

## Verification Run

## Verification Result

## Audit Result

## Promotion Record

## Superseded Items

| Item | Superseded by | Why | Evidence |
|---|---|---|---|

## Residual Risks

## Reopen Trigger
```

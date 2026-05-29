# Capability Ledger Template

Use a capability ledger to turn history into a truth table. Keep the file close
to the repo evidence, usually `docs/capability-ledger.md` or
`docs/capability-ledgers/<domain>.md`.

## Minimal Ledger

```markdown
# Capability Ledger: <domain>

Source of truth: <repo docs, issue, PR, spec, tracker>
Last reconciled: <YYYY-MM-DD>
Memory namespace: <namespace or none>

| ID | Capability | Status | Proof class | Evidence | Verify | Residual gap | Next delta |
|---|---|---|---|---|---|---|---|
| CAP.001 | <capability> | partial | integration | `path/to/test.rs` | `cargo test ...` | <missing proof> | <task id or action> |
```

## Full Ledger

```markdown
| ID | Capability | Source requirement | Status | Proof class | Evidence path | Verification command | Owning repo/file | Last validated | Supersedes | Superseded by | Residual gap | Next delta task | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| CAP.001 | <capability> | <spec section> | done | live | `tests/live.rs` | `REDIS_URL=... cargo test live_case` | `repo/path` | 2026-05-29 | old-plan:E1 | none | none | none | <short note> |
```

## Status Values

- `done`: delivered and verified with recorded evidence.
- `partial`: delivered or designed in part, but not fully accepted or proven.
- `missing`: no matching delivered implementation or proof.
- `blocked`: waiting on access, input, environment, decision, or upstream fix.
- `superseded`: replaced by a later row, design, commit, or plan.

## Required Row Fields

- ID: stable and unique.
- Capability: one behavior or requirement.
- Status: one of the approved status values.
- Proof class: use the proof taxonomy.
- Evidence path: file, test, doc, PR, commit, or tracker path.
- Verification command: command or explicit `not applicable` reason.
- Last validated: absolute date.
- Supersession: what wins over old work.
- Residual gap: what is still not true.
- Next delta task: exact next work item or `none`.

## Dedupe Pass

Before planning, add this short section:

```markdown
## Reconciliation Notes

- Already satisfied: <IDs>
- Partial: <IDs>
- Missing: <IDs>
- Blocked: <IDs>
- Superseded: <IDs and replacement rows>
- New scope since last plan: <IDs or none>
```

Only `partial`, `missing`, `blocked`, stale-proof, or new-scope rows become new
tasks. `done` rows are context. `superseded` rows are archive notes.

## Delta Task Mapping

```markdown
| Delta task | Ledger row(s) | Why needed | Owner | Verify | Audit |
|---|---|---|---|---|---|
| E1.T1 | CAP.001, CAP.002 | missing proof | `src/**` | `cargo test ...` | E1.AUDIT |
```

Keep each delta task small enough to dispatch with clear ownership. If one row
requires multiple owners, split it or create an integrator task.

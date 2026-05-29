# Proof Taxonomy

Use proof classes to prevent vague readiness claims. Record the highest proof
actually achieved and the missing proof needed for the next claim.

| Proof class | Meaning | Enough for |
|---|---|---|
| `claim` | Written statement with no direct repo evidence. | Never enough for `done`. |
| `docs` | Versioned documentation exists. | Documentation readiness only. |
| `contract` | API/schema/CLI/behavior contract is specified. | Planning and compatibility review. |
| `unit` | Focused unit test proves local behavior. | Local implementation claims. |
| `integration` | Multiple modules or services tested together. | Cross-module behavior. |
| `tck` | Contract or compatibility suite verifies behavior. | Provider/client compatibility. |
| `local-live` | Live dependency run on local environment. | Environment-specific proof. |
| `browser` | Playwright or browser proof for UI. | UI/demo/browser claims. |
| `full-runtime` | End-to-end runtime path with real orchestration. | Readiness claims for shipped flow. |
| `production` | Observed or validated in production/customer environment. | Production readiness only when allowed. |

## Rules

- `done` needs evidence path and verification command.
- `claim` cannot support `done`.
- A skipped live proof is `partial` or `blocked`, not `done`.
- A docs-only proof cannot satisfy runtime readiness.
- Browser/UI work needs Playwright or an explicit blocked reason.
- If proof is stale because code changed after validation, create a verification
  delta task before implementation work.

## Proof Gap Examples

```markdown
Status: partial
Proof class: unit
Residual gap: no live Redis proof for stream recovery
Next delta task: add local-live proof or record blocked environment
```

```markdown
Status: done
Proof class: browser
Evidence path: `test-results/dashboard-filter.png`
Verification command: `npx playwright test dashboard-filter.spec.ts`
Last validated: 2026-05-29
```

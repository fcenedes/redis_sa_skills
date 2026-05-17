# Redis Brand UI Style Profiles

Use this file to choose which Redis Brand UI treatment an agent should apply.

## Stable Profile IDs

| Profile ID | Mode | Status | Use when |
| --- | --- | --- | --- |
| `redis-brand-current-light` | Light | Current | The user wants the existing Redis Brand UI treatment, continuity with previous demos, or screenshot parity. |
| `redis-brand-current-dark` | Dark | Current | The user wants the existing dark treatment, continuity with previous demos, or screenshot parity. |
| `redis-brand-future-light` | Light | Future A+++ | The user wants the hardened profile with provenance labels, contrast registry checks, 44px controls, and stronger delivery guardrails. |
| `redis-brand-future-dark` | Dark | Future A+++ | The user wants the hardened dark profile with product-extension labels, contrast registry checks, 44px controls, and parity checks. |

## Rules

- Keep all four profile IDs stable.
- Do not replace `redis-brand-current-light` or `redis-brand-current-dark` when adding future guidance.
- Treat `redis-brand-future-light` and `redis-brand-future-dark` as opt-in hardened profiles until approved as default.
- When the user asks for current Redis Brand UI, apply a current profile.
- When the user asks for A+++, hardened, accessible, production-ready, or future Redis Brand UI, apply a future profile.
- When the user does not specify a profile, ask only if the choice materially changes the deliverable; otherwise use `redis-brand-current-light` for light UI and `redis-brand-current-dark` for dark UI.

# Redis UI Quality Checklist

Run this checklist before calling a Redis-branded UI complete.

## Required Checks

- **Style profile:** One stable profile ID is named and applied: `redis-brand-current-light`, `redis-brand-current-dark`, `redis-brand-future-light`, or `redis-brand-future-dark`.
- **Source provenance:** Official brand colors, type roles, and logo assets come from the Redis brand portal or approved Redis bundles; product extensions are labeled as extensions.
- **Contrast:** `node redis-brand-ui/scripts/check-contrast.js` passes, and every new text/background pairing is checked.
- **Red restraint:** Hyper is used for one primary action, active/hover state, selected Redis path, or brand moment, not every state.
- **Status meaning:** Operational data shows source, freshness, and state labels such as `Live`, `Sampled`, `Modeled`, `Derived`, `Stale`, or `Failed`.
- **Typography:** Space Grotesk is default UI text; Space Mono is limited to commands, keys, IDs, timestamps, code, and technical labels.
- **Touch targets:** Buttons and inputs have at least `44px` target height.
- **Logo assets:** Redis logos and marks use official `Redis_Logo_*_RGB.svg` or `Redis_Mark_*_RGB.svg` files; no recreated logo primitives.
- **Light/dark parity:** Light and dark modes keep the same hierarchy and pass contrast checks for visible text.
- **Layout polish:** No nested cards for dashboard sections; dense tools use recipes from `delivery-recipes.md`.
- **Repository validation:** `bash scripts/validate-skills.sh` passes with 0 errors and 0 warnings.

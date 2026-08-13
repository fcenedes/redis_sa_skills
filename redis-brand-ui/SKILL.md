---
name: redis-brand-ui
description: Use when applying official Redis brand identity to marketing pages, sponsor slides, one-pagers, logo or wordmark placements, booth collateral, or UI surfaces that explicitly need Redis brand guidelines. Covers colors, typography, logo usage, and visual identity; not RedisInsight/product app layout patterns.
compatibility: Requires Node.js to run scripts/check-contrast.js for WCAG contrast validation.
license: MIT
metadata:
  author: redis
  version: "1.1.0"
---
# Redis Brand UI Guidelines

Actionable rules for implementing the Redis visual identity in frontend applications. Core brand colors, typography roles, and logo guidance derive from the official Redis brand portal ([https://brand.redis.io](https://brand.redis.io)); delivery recipes, status labels, app dark-mode tokens, and component treatments are implementation guidance and must be treated as product extensions unless official brand guidance says otherwise.

## When to Apply

Use these guidelines when:

- Building marketing pages, landing pages, or documentation sites that carry the Redis brand
- Implementing logo usage, brand colors, or brand typography in any web framework
- Configuring Tailwind CSS, CSS variables, or lightweight component-library themes for brand surfaces

Do not use for the primary UI of dashboards, admin panels, or developer tools — those are
`redis-product-ui`. If a request mixes a branded marketing shell with an embedded product UI,
apply `redis-brand-ui` to the shell/marketing chrome and `redis-product-ui` to the embedded
product surface; see `redis-product-ui`'s [source-of-truth.md](../redis-product-ui/references/source-of-truth.md)
for the documented boundary.

## Style Profiles

Choose one stable profile before styling:

- `redis-brand-current-light` for the current light treatment.
- `redis-brand-current-dark` for the current dark treatment.
- `redis-brand-future-light` for the optional A+++ light treatment.
- `redis-brand-future-dark` for the optional A+++ dark treatment.

Do not remove or overwrite current profiles when adding future guidance. See [style profiles](references/style-profiles.md).

## Core Rules

### Colors

- Use `#FF4438` (Hyper / Redis Red) as the signature brand accent for prominent moments, active states, and CTAs. Use Dusk tones for default links; reserve Hyper for hover, active, or prominent link treatments.
- Use `#091A23` for primary text and `#163341` for secondary text. Never use pure black (`#000`).
- Use `#FFFFFF` for page backgrounds. Use `#B9C2C6` sparingly for tertiary backgrounds.
- Check text/background contrast before shipping. Redis Red is the brand accent, but white normal-size text on `#FF4438` and `#EB352A` does not meet WCAG AA.
- See [colors reference](references/colors.md) for the core palette, CSS variables, and Tailwind config.

### Typography

- Use **Space Grotesk** (weights 300-700) for body text, headings, forms, tables, buttons, and UI labels.
- Use **Space Mono** for code, Redis commands, keys, IDs, timestamps, and technical labels.
- Use TT Trailers only for approved display/marketing compositions. Use Geist only for Redis documentation surfaces aligned with the brand portal.
- See [typography reference](references/typography.md) for font imports, sizes, and Tailwind config.

### Components

- Primary buttons: use visible Redis palette colors only. `Hyper` (`#FF4438`) and `Deep Hyper` (`#EB352A`) are brand reds, but white normal-size text on either is below WCAG AA. Use them for prominent brand moments, large labels, icon accents, or reviewed component-specific treatments.
- Secondary buttons: transparent background, `#163341` border, dark text.
- All interactive elements: transition only color, background, border, shadow, and transform properties.
- Buttons and inputs must use at least a `44px` target height for touch-friendly UI.
- Use `8px` as the base grid unit for all spacing.
- For demos and applications, start from [delivery recipes](references/delivery-recipes.md) before inventing a new layout.
- See [components reference](references/components.md) for button, card, form, React, and lightweight theme examples.

### Dark Mode

- Maintain Redis Red (`#FF4438`) as the primary accent in dark mode.
- Invert background/text relationships — dark backgrounds with light text.
- Use the official color/type legibility matrix for dark pairings; treat app dark-mode tokens as product extensions unless verified.
- See [dark mode reference](references/dark-mode.md) for dark-mode colors and CSS setup.

### Logos

- Download official logos from [brand.redis.io/document/18](https://brand.redis.io/document/18).
- Use official `Redis_Mark_*_RGB.svg` assets for favicons and compact contexts.
- Use official `Redis_Logo_*_RGB.svg` assets for headers and marketing pages.
- Follow the brand portal or `redis_logo_overview.pdf` for clear-space and minimum-size rules.
- NEVER recreate the logo in CSS/HTML — always use the official SVG asset.
- See [logos reference](references/logos.md) for all variants, sizing rules, and usage examples.

## Anti-Pattern Guardrails

**DO NOT:**

- Authority: authorized to create or modify Redis brand UI artifacts; requires explicit request before publishing, deploying, or changing product UI scope.
- Use arbitrary red values (`#FF0000`, `#E53E3E`, `red-500`). Always use `#FF4438`.
- Claim white normal-size text on `#FF4438` or `#EB352A` meets WCAG AA.
- Use pure black (`#000000`) for text or backgrounds. Use `#091A23` instead.
- Mix Space Mono into body copy or long-form text — it is for code and technical labels only.
- Use Space Grotesk for code blocks — always use Space Mono.
- Use border-radius values other than `5px` for standard components.
- Use spacing values that aren't multiples of `8px`.
- Omit hover/focus states on interactive elements.
- Use Tailwind's default color palette names (`red-500`, `gray-900`) — use the custom Redis token names.
- Build the primary UI of a dashboard, admin panel, or developer tool with this skill alone — use `redis-product-ui` for that surface.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "Tailwind's red-500 is close enough to Redis Red" | Always use exactly `#FF4438`; no other red hex or Tailwind default is acceptable. |
| "White text on Redis Red passes WCAG" | White normal-size text on `#FF4438` and `#EB352A` does not meet WCAG AA. |
| "Pure black looks fine for dark text" | Never use `#000000`; primary text is `#091A23`, secondary is `#163341`. |
| "Space Mono works for body text in a technical doc" | Space Mono is for code and technical labels only; body text uses Space Grotesk. |
| "This is a product dashboard so brand UI applies" | Dashboards, admin panels, and developer tools use `redis-product-ui`, not this skill. |
| "We can skip the contrast check for an internal demo" | Run `node scripts/check-contrast.js` for every delivery; internal demos are still Redis-branded. |

## Interaction with Other Skills

- **redis-product-ui** (complementary): use for dashboards, admin panels, and developer tools; this skill covers marketing, brand chrome, and logo usage.

## Verification

- [ ] Every color value in the output matches the Redis brand palette (`#FF4438`, `#EB352A`, `#091A23`, `#163341`, `#FFFFFF`, `#B9C2C6`) — confirm with `grep -rn '#' <output-dir> | grep -iE '[0-9a-f]{6}'` and verify no off-brand hex codes appear.
- [ ] Typography uses the approved font stack only — `grep -rn 'font-family' <output-dir>` returns only Space Grotesk, Space Mono, TT Trailers (display only), or Geist (docs only).
- [ ] `node scripts/check-contrast.js` exits `0` — all foreground/background pairs in `references/contrast-pairs.json` pass their expected WCAG contrast ratios.
- [ ] No hardcoded color values exist outside CSS custom properties — `grep -rn 'color:\s*#' <output-dir>` returns only references within `:root` or `[data-theme]` variable declarations.

## Reference Index

| File | Load When |
| --- | --- |
| [colors.md](references/colors.md) | Need the core palette, CSS custom properties, Tailwind extend config, or accessibility notes. |
| [typography.md](references/typography.md) | Need Google Fonts imports, heading/body styles, or font family config. |
| [components.md](references/components.md) | Need button, card, form, React, or lightweight theme examples. |
| [dark-mode.md](references/dark-mode.md) | Need the dark palette, `prefers-color-scheme` setup, or Tailwind dark variants. |
| [style-profiles.md](references/style-profiles.md) | Choosing one of the four stable style IDs for current/future light/dark UI. |
| [source-of-truth.md](references/source-of-truth.md) | Deciding whether guidance is official brand vs. product-extension guidance. |
| [delivery-recipes.md](references/delivery-recipes.md) | Starting a demo/app layout for dashboards, developer tools, docs, traces, or audit views. |
| [status-language.md](references/status-language.md) | Labeling live, sampled, modeled, derived, stale, pending, approved, evidence, or failed states. |
| [ui-quality-checklist.md](references/ui-quality-checklist.md) | Running final A+++ checks before calling a Redis UI complete. |
| [logos.md](references/logos.md) | Need logo variants, clear space, sizing, or favicon setup. |
| [contrast-pairs.json](references/contrast-pairs.json) | Adding or auditing a foreground/background pair checked by `check-contrast.js`. |

## Quick Start Checklist

1. Add Google Fonts imports for Space Grotesk and Space Mono
2. Configure CSS custom properties from [colors](references/colors.md)
3. Pick a demo/app recipe from [delivery recipes](references/delivery-recipes.md)
4. Apply component patterns from [components](references/components.md)
5. Add source, freshness, and state labels from [status language](references/status-language.md)
6. Implement dark mode using [dark-mode](references/dark-mode.md) mappings
7. Run the contrast checker from the skill directory:

   ```bash
   node scripts/check-contrast.js
   ```

   It reads every pair in [contrast-pairs.json](references/contrast-pairs.json), prints one
   `PASS`/`FAIL` line per pair, and exits non-zero if any pair fails its expected contrast ratio.
8. Run the [UI quality checklist](references/ui-quality-checklist.md) and `bash scripts/validate-skills.sh`

## Final Checklist (must be literally verifiable)

Each item must be proved by a command output or file read from this session, not by memory or prior conversation.

- [ ] Every red used is exactly `#FF4438` or `#EB352A` — no other red hex/Tailwind red value appears.
- [ ] No text or background uses pure black (`#000000`); primary text is `#091A23`.
- [ ] Body/UI text uses Space Grotesk; code/commands/IDs/timestamps use Space Mono (no mixing).
- [ ] `node scripts/check-contrast.js` exits `0` (all registered pairs report `PASS`).
- [ ] Every interactive element has visible hover and focus states.
- [ ] All spacing values are multiples of `8px`; standard components use `5px` border-radius.
- [ ] The logo is an official SVG asset from `references/logos.md` — not CSS/HTML-recreated.
- [ ] `bash scripts/validate-skills.sh` passes.
- [ ] If the surface is a dashboard/admin/developer-tool UI rather than marketing/brand chrome, confirm `redis-product-ui` was used for that surface instead of (or alongside) this skill.

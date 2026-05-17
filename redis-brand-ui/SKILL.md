---
name: redis-brand-ui
description: Apply Redis official brand guidelines to frontend UI implementations. Use this skill when building Redis-branded web interfaces, creating marketing pages, styling dashboards, or implementing any UI that must follow the Redis visual identity. Covers colors, typography, components, and dark mode.
license: MIT
metadata:
  author: redis
  version: "1.0.0"
---
# Redis Brand UI Guidelines

Actionable rules for implementing the Redis visual identity in frontend applications. Core brand colors, typography roles, and logo guidance derive from the official Redis brand portal ([https://brand.redis.io](https://brand.redis.io)); delivery recipes, status labels, app dark-mode tokens, and component treatments are implementation guidance and must be treated as product extensions unless official brand guidance says otherwise.

## When to Apply

Use these guidelines when:

- Building any UI that carries the Redis brand
- Creating marketing pages, landing pages, or documentation sites
- Styling dashboards, admin panels, or developer tools for Redis products
- Implementing components in React, Next.js, or any web framework
- Configuring Tailwind CSS, CSS variables, or lightweight component-library themes for Redis projects

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
- Use `8px` as the base grid unit for all spacing.
- For demos and applications, start from [delivery recipes](references/delivery-recipes.md) before inventing a new layout.
- See [components reference](references/components.md) for button, card, form, React, and lightweight theme examples.

### Dark Mode

- Maintain Redis Red (`#FF4438`) as the primary accent in dark mode.
- Invert background/text relationships — dark backgrounds with light text.
- Use the official color/type legibility matrix for dark pairings; treat app dark-mode tokens as product extensions unless verified.
- See [dark mode reference](references/dark-mode.md) for the full dark palette and CSS setup.

### Logos

- Download official logos from [brand.redis.io/document/18](https://brand.redis.io/document/18).
- Use official `Redis_Mark_*_RGB.svg` assets for favicons and compact contexts.
- Use official `Redis_Logo_*_RGB.svg` assets for headers and marketing pages.
- Follow the brand portal or `redis_logo_overview.pdf` for clear-space and minimum-size rules.
- NEVER recreate the logo in CSS/HTML — always use the official SVG asset.
- See [logos reference](references/logos.md) for all variants, sizing rules, and usage examples.

## Anti-Pattern Guardrails

**DO NOT:**

- Use arbitrary red values (`#FF0000`, `#E53E3E`, `red-500`). Always use `#FF4438`.
- Claim white normal-size text on `#FF4438` or `#EB352A` meets WCAG AA.
- Use pure black (`#000000`) for text or backgrounds. Use `#091A23` instead.
- Mix Space Mono into body copy or long-form text — it is for code and technical labels only.
- Use Space Grotesk for code blocks — always use Space Mono.
- Use border-radius values other than `5px` for standard components.
- Use spacing values that aren't multiples of `8px`.
- Omit hover/focus states on interactive elements.
- Use Tailwind's default color palette names (`red-500`, `gray-900`) — use the custom Redis token names.

## Reference Files

| File | Contents |
| --- | --- |
| colors | Core palette, CSS custom properties, Tailwind extend config, accessibility notes |
| typography | Google Fonts imports, heading/body styles, font family config |
| components | Buttons, cards, forms, React examples, lightweight theme object |
| dark-mode | Dark palette, prefers-color-scheme setup, Tailwind dark variants |
| [Style profiles](references/style-profiles.md) | Four stable applyable style IDs for current and future light/dark UI |
| [Source of truth](references/source-of-truth.md) | Official brand sources vs product extension guidance |
| [Delivery recipes](references/delivery-recipes.md) | Fast Redis demo/app recipes for dashboards, developer tools, docs, traces, and audit views |
| [Status language](references/status-language.md) | Lightweight labels for live, sampled, modeled, derived, stale, pending, approved, evidence, and failed states |
| [Logos](references/logos.md) | Logo variants, clear space, sizing, favicon setup |

## Quick Start Checklist

1. Add Google Fonts imports for Space Grotesk and Space Mono
2. Configure CSS custom properties from [colors](references/colors.md)
3. Pick a demo/app recipe from [delivery recipes](references/delivery-recipes.md)
4. Apply component patterns from [components](references/components.md)
5. Add source, freshness, and state labels from [status language](references/status-language.md)
6. Implement dark mode using [dark-mode](references/dark-mode.md) mappings
7. Run `node redis-brand-ui/scripts/check-contrast.js` and `bash scripts/validate-skills.sh`

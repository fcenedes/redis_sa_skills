---
name: redis-product-ui
description: Use when building Redis product, dashboard, admin, RedisInsight-like, developer-tool, prototype, or demo UIs that need Redis UI application patterns, dense layouts, light/dark modes, component states, tables, filters, sidebars, drawers, modals, toasts, or product semantic colors.
license: MIT
metadata:
  author: redis
  version: "1.0.0"
---
# Redis Product UI

Build Redis product surfaces from the public Redis UI Storybook patterns. Use this for application UIs; pair with `redis-brand-ui` when official Redis brand identity, logo, marketing typography, or brand color rules matter.

## Source Boundary

- Treat [Redis UI Storybook](https://redislabsdev.github.io/redis-ui/) as the product UI reference.
- Treat [brand.redis.io](https://brand.redis.io/) and `redis-brand-ui` as the official brand reference.
- Storybook-derived tokens are product implementation guidance, not official brand-palette claims.
- Read [source of truth](references/source-of-truth.md) before reconciling brand and product conflicts.

## Workflow

1. Identify the surface: product shell, dashboard, table, inspector, form, wizard, plugin, or demo.
2. Pick product tokens from [tokens](references/tokens.md), including light and dark mode.
3. Use component guidance from [components](references/components.md).
4. Choose a layout pattern from [layout patterns](references/layout-patterns.md).
5. Verify the result with [quality checklist](references/quality-checklist.md).

## Core Rules

- Use Redis UI semantic families: `primary`, `secondary`, `neutral`, `informative`, `success`, `notice`, `attention`, `danger`, and `discovery`.
- Use `Nunito Sans` for product UI text and `Source Code Pro` for code, commands, keys, IDs, and technical values.
- Build compact, operator-friendly product screens: sidebars, tables, filters, drawers, modals, banners, toasts, tabs, and forms.
- Represent every meaningful state: default, hover, active, selected, disabled, loading, empty, valid, invalid, warning, danger, and success.
- Keep Redis Red from `redis-brand-ui` for brand moments; do not use it as the universal product semantic color.
- Prefer tables and inspection panels over decorative card grids for operational views.

## DO NOT

- Do not replace `redis-brand-ui`; this skill complements it.
- Do not claim Storybook-derived colors are official brand colors unless confirmed by the brand portal.
- Do not use pure brand red for every CTA, error, warning, and status.
- Do not build marketing landing pages when the request is for a product/admin/developer tool.
- Do not omit dark mode when the user asks for Redis UI product fidelity.
- Do not invent arbitrary spacing, control heights, or layout dimensions when the product token scale applies.
- Do not vendor Storybook bundles, generated screenshots, or copied external source.

## Checklist

1. Surface type and density are appropriate for product use.
2. Light and dark tokens come from `references/tokens.md`.
3. Typography uses product UI fonts unless brand/marketing guidance overrides it.
4. Component states are complete and distinguish status from brand accent.
5. Tables, filters, navigation, drawers, modals, and feedback patterns follow the references.
6. Accessibility, contrast, focus, and keyboard behavior are checked.
7. Brand conflicts are resolved with `redis-brand-ui` and documented.

---
name: redis-product-ui
description: Use when building explicit Redis product, dashboard, admin, RedisInsight, Workbench plugin iframe, developer-tool, prototype, or demo UIs that need app patterns, dense layouts, light/dark modes, tables, filters, drawers, modals, toasts, or product semantic colors. Not for vague generic internal tools.
license: MIT
metadata:
  author: redis
  version: "1.2.0"
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
2. Pick the correct theme family from [tokens](references/tokens.md): `light`/`dark` for RedisInsight components, `light2`/`dark2` for other Redis products.
3. Use component guidance from [components](references/components.md) and [component inventory](references/component-inventory.md).
4. For data grids, use [table patterns](references/table-patterns.md); for metrics, use [chart patterns](references/chart-patterns.md).
5. For React/package or standalone demo work, use [implementation patterns](references/implementation-patterns.md).
6. Choose a layout pattern from [layout patterns](references/layout-patterns.md).
7. Verify the result with [quality checklist](references/quality-checklist.md).

## Core Rules

- Use Redis UI semantic families: `primary`, `secondary`, `neutral`, `informative`, `success`, `notice`, `attention`, `danger`, and `discovery`.
- Use `light`/`dark` only for RedisInsight component fidelity; use `light2`/`dark2` for Redis Cloud, product dashboards, admin tools, and new product demos.
- Use `Geist` for current product UI text and `Source Code Pro` for code, commands, keys, IDs, and technical values. Use `Nunito Sans` only for legacy Redis UI surfaces or Storybook chrome.
- Build compact, operator-friendly product screens: sidebars, tables, filters, drawers, modals, banners, toasts, tabs, and forms.
- Represent every meaningful state: default, hover, active, selected, disabled, loading, empty, valid, invalid, warning, danger, and success.
- Keep Redis Red from `redis-brand-ui` for brand moments; do not use it as the universal product semantic color.
- Prefer tables and inspection panels over decorative card grids for operational views.
- Use Redis UI package/components when they are already available in the target repo; otherwise emulate the public Storybook behavior with local CSS and no private source dependency.
- Use ellipsis, wrapping rules, and tooltip/overflow behavior for long Redis keys, IDs, labels, and chip lists.

## Authority

- Authorized: create or modify Redis product UI artifacts, states, and implementation guidance.
- Requires explicit request: publish/deploy the UI or change marketing/brand scope owned by `redis-brand-ui`.
- Assessment-only default: for UI critique requests, report findings and stop unless implementation is requested.

## DO NOT

- Do not replace `redis-brand-ui`; this skill complements it.
- Do not claim Storybook-derived colors are official brand colors unless confirmed by the brand portal.
- Do not use pure brand red for every CTA, error, warning, and status.
- Do not build marketing landing pages when the request is for a product/admin/developer tool.
- Do not omit dark mode when the user asks for Redis UI product fidelity.
- Do not invent arbitrary spacing, control heights, or layout dimensions when the product token scale applies.
- Do not vendor Storybook bundles, generated screenshots, or copied external source.
- Do not reference private source repositories in generated skill docs or demo guidance.
- Do not use pagination and virtualization together; for very large tables prefer virtualization and avoid custom expanded panels that break row measurement.
- Do not use this skill as the primary guidance for a marketing page, landing page, or docs site — use `redis-brand-ui`.

## Reference Index

| File | Load When |
| --- | --- |
| [source-of-truth.md](references/source-of-truth.md) | Reconciling a brand-vs-product conflict or deciding which skill owns a surface. |
| [tokens.md](references/tokens.md) | Picking theme family (`light`/`dark` vs `light2`/`dark2`), typography, spacing, or focus tokens. |
| [components.md](references/components.md) | Need concrete component markup/CSS patterns. |
| [component-inventory.md](references/component-inventory.md) | Need the full list of available Redis UI components and their purpose (glossary, not a decision guide). |
| [table-patterns.md](references/table-patterns.md) | Building a data grid: sorting, filtering, pagination vs. virtualization. |
| [chart-patterns.md](references/chart-patterns.md) | Building metrics/telemetry charts with labeled axes and theme-safe colors. |
| [implementation-patterns.md](references/implementation-patterns.md) | Wiring React/package or standalone demo implementation. |
| [layout-patterns.md](references/layout-patterns.md) | Choosing a page/shell layout (product shell, dashboard, inspector, wizard). |
| [quality-checklist.md](references/quality-checklist.md) | Final verification pass before calling the UI complete. |

## Choosing a Component (when component-inventory.md is not enough)

`component-inventory.md` lists what exists, not which one to pick. Use these rules first:

- Prefer `Table` over `Card` grids for any list of more than ~8 similar operational items (keys,
  connections, logs, audit events). Cards are for a handful of distinct, non-tabular entities.
- Prefer `Drawer` over `Modal` when the user needs to keep table/list context visible while
  inspecting or editing one row. Use `Modal` only for blocking confirmations or short forms.
- Prefer inline `Banner` over `Toast` for persistent state (e.g. "connection lost"); use `Toast`
  only for transient, dismissible feedback about an action just taken.
- Prefer `Filters`/`SearchBar` over ad hoc dropdowns for anything the user will query repeatedly.
- Use `Tabs` for peer views of the same entity; use `Stepper` only for linear multi-step setup.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "Brand red works as the primary CTA color everywhere" | Redis Red is for brand moments; use semantic families (`primary`, `danger`, `success`) for product UI states. |
| "Storybook tokens are official brand colors" | Storybook-derived tokens are product implementation guidance, not official brand-palette claims. |
| "Cards look better than tables for this data" | Prefer tables over card grids for any list of more than ~8 similar operational items. |
| "Dark mode can wait until v2" | Do not omit dark mode when the user asks for Redis UI product fidelity. |
| "Pagination and virtualization together handle any table size" | Never use both; for very large tables prefer virtualization alone. |
| "This marketing landing page is a product UI" | Marketing pages, landing pages, and docs sites use `redis-brand-ui`, not this skill. |

## Interaction with Other Skills

- **redis-brand-ui** (complementary): use for marketing, brand chrome, and logo rules; this skill covers product app surfaces.
- **redis-insight-plugin** (downstream): plugins use this skill's `light`/`dark` themes for visual work inside plugin iframes.

## Verification

- [ ] Components render in the target framework — open the built output in a browser or run the dev server and confirm no console errors with `grep -i 'error' <browser-console-output>` or equivalent check.
- [ ] Responsive breakpoints tested — verify layout at mobile (375px), tablet (768px), and desktop (1280px) widths using browser dev tools or Playwright viewport resizing; no horizontal overflow or broken layouts at any breakpoint.
- [ ] Accessibility audit passes — run `npx axe-core-cli <url>` or equivalent (axe browser extension, Lighthouse accessibility score >= 90) with zero critical or serious violations reported.
- [ ] Dark mode variants exist if required — `grep -rn 'data-theme.*dark\|prefers-color-scheme.*dark\|\.dark\s' <output-dir>` returns matches confirming dark mode token declarations or theme class usage.
- [ ] No brand-red misuse in product semantic states — `grep -rn '#FF4438\|#EB352A' <output-dir>` returns matches only in brand-moment contexts (hero, logo accent), not in success/warning/danger/status indicators.

## Checklist (must be literally verifiable)

Each item must be proved by a command output or file read from this session, not by memory or prior conversation.

- [ ] Surface identified as one of: product shell, dashboard, table, inspector, form, wizard, plugin, demo.
- [ ] Theme family matches surface: RedisInsight-fidelity surfaces use `light`/`dark`; all other Redis product surfaces use `light2`/`dark2`.
- [ ] Body/UI text uses `Geist`; code/commands/IDs/keys use `Source Code Pro` (no `Nunito Sans` outside legacy Storybook chrome).
- [ ] Every interactive component has default, hover, active, disabled, loading, and empty states styled (not just default).
- [ ] No color from the `primary`/brand-red family is used as a generic status color for success/warning/danger.
- [ ] Large tables use virtualization OR pagination, never both.
- [ ] No Storybook bundle, screenshot, or private-repo source is vendored/copied into the output.
- [ ] Charts (if present) have labeled axes, tooltips, and empty/loading/error states.
- [ ] If any marketing/landing-page content is part of the same request, confirm `redis-brand-ui` was applied to that portion.

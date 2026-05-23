# Components

Redis product UI is compact, stateful, and built for repeated use.

## Buttons

Use product button variants for product actions:

| Intent | Treatment |
| --- | --- |
| primary action | primary family background, strong border, readable text |
| destructive | danger family background/border, never Redis Red by default |
| secondary | neutral or secondary fill/outline |
| text action | no heavy container; preserve hover/focus/disabled states |
| icon action | icon-only button with accessible name |

Observed product sizes include small, medium, and large with compact heights around `2.4rem`, `3rem`, and `3.6rem`. Use larger touch targets when the target app requires touch ergonomics.

## Inputs And Forms

Cover `default`, `hover`, `focus`, `disabled`, `readOnly`, `valid`, `error`, `loading`, and `reset` states. Use `SearchInput` behavior for filter bars and table search. Keep labels close to fields and reserve helper/error text for actionable guidance.

## Navigation

Use sidebars, app bars, mid bars, breadcrumbs, tabs, and selection menus for product navigation. Keep navigation persistent and compact for operator workflows.

## Tables

Prefer tables for Redis keys, commands, traces, streams, metrics, audit records, and plugin outputs. Include search, filters, sorting, pagination or virtualization, column visibility when relevant, clickable rows, expandable rows, and row selection only when the task needs it.

## Feedback

Use banners for page-level state and toasts for transient feedback. Semantic variants should map to `informative`, `success`, `notice`, `attention`, and `danger`.

## Overlays

Use modals for blocking decisions. Use drawers for inspection, details, and edit flows that should preserve table context. Use popovers/tooltips for short contextual help only.

## State Language

Do not let color carry meaning alone. Pair state color with labels, icons, or concise text: `Healthy`, `Warning`, `Failed`, `Loading`, `Empty`, `Selected`, `Read-only`, `Pending`, `Applied`.

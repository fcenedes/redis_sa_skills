# Components

Redis product UI is compact, stateful, and built for repeated use.

For a fuller component map, use [component inventory](component-inventory.md).

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

Use `ButtonGroup` for single or multi-selection controls. Use `ToggleButton` for pressed/unpressed filter states with optional counters. Use `CopyToClipboardButton` for keys, IDs, endpoints, and commands that users copy repeatedly.

## Inputs And Forms

Cover `default`, `hover`, `focus`, `disabled`, `readOnly`, `valid`, `error`, `loading`, and `reset` states. Use `SearchInput` behavior for filter bars and table search. Keep labels close to fields and reserve helper/error text for actionable guidance.

Use `Select`, `MultiSelect`, and `AutoCompleteSelect` for bounded option sets. Use virtualized option lists or async option loading for large datasets. Use `QuantityCounter`, `NumericInput`, and `Slider` only when numeric constraints are visible and validated.

## Navigation

Use sidebars, app bars, mid bars, breadcrumbs, tabs, and selection menus for product navigation. Keep navigation persistent and compact for operator workflows.

Use `AppBar` for top-level product shell, `SideBar` for primary navigation, `MidBar` for secondary context, and `AppSelectionMenu` when switching applications, environments, or workspaces.

## Tables

Prefer tables for Redis keys, commands, traces, streams, metrics, audit records, and plugin outputs. Include search, filters, sorting, pagination or virtualization, column visibility when relevant, clickable rows, expandable rows, and row selection only when the task needs it.

Use [table patterns](table-patterns.md) before building a dense data surface.

## Feedback

Use banners for page-level state and toasts for transient feedback. Semantic variants should map to `informative`, `success`, `notice`, `attention`, and `danger`.

Use `ProgressBar` for bounded progress and `Loader` for indeterminate loading. Use `Badge`, `Chip`, and `ChipList` for compact status, selected filters, tags, and query facets. Use `ScreenReaderAnnounce` or an aria-live equivalent for async success/error updates.

## Overlays

Use modals for blocking decisions. Use drawers for inspection, details, and edit flows that should preserve table context. Use popovers/tooltips for short contextual help only.

Use `Menu` for action lists, `Popover` for short interactive surfaces, and `Tooltip` for nonessential clarifications. Tooltips must not contain critical-only information.

## State Language

Do not let color carry meaning alone. Pair state color with labels, icons, or concise text: `Healthy`, `Warning`, `Failed`, `Loading`, `Empty`, `Selected`, `Read-only`, `Pending`, `Applied`.

## Overflow

Long Redis keys, stream IDs, group names, tenant names, and region labels must not resize controls. Use fixed table columns, ellipsis, wrapping only where intended, and tooltip/detail disclosure for full values. Chip lists should collapse to an overflow count when space runs out.

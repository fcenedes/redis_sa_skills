# Table Patterns

Redis product UIs use tables as primary work surfaces. Build tables for repeated scanning, filtering, selection, inspection, and action.

## Default Table Contract

Every product table should define:

- Purpose: keys, commands, streams, traces, metrics, jobs, audit events, plugins, or configuration.
- Stable row identity: Redis key, stream ID, shard, node, user, job ID, or generated stable ID.
- Search and filters: global search for broad discovery; column filters for structured fields.
- Sorting: default sort and user-controlled sort when ordering matters.
- Empty state: what is missing, why it may be missing, and the next useful action.
- Loading state: reserved layout height to prevent jump.
- Error state: failed source, retry action, stale-data warning if applicable.
- Inspect action: clickable row, drawer, or expandable row for details.

## Feature Choices

Use only features that support the workflow:

- Sorting: client-side for local data; manual/server-side when the backend owns ordering.
- Filtering: combine global search with column filters for operational tables.
- Pagination: use for bounded pages and server APIs.
- Virtualization: use for large local row sets; do not combine with pagination.
- Row selection: use only for batch actions; expose selected count and clear action.
- Clickable row: use when row inspection is the primary workflow.
- Row navigation: add keyboard navigation when users move through many rows.
- Expandable row: use for short inline details or tree data.
- Column visibility: use when users compare different fields by task.
- Column resizing: use when values vary in length or the table is an analyst surface.

## Virtualization Rule

Virtualization owns row windowing. Do not combine virtualization with pagination. Avoid custom expanded panels inside virtualized rows because dynamic sibling rows can break measurement; use tree rows or a drawer instead.

## Cell And Column Rules

- Redis keys, IDs, hashes, commands, and timestamps use code typography.
- Long values use fixed or bounded columns with ellipsis and tooltip/detail access.
- Numeric metrics align consistently and include units.
- Status cells include label plus color/icon, never color alone.
- Action columns stay narrow and stable; actions should appear on active row only when discoverability is preserved.
- Use column visibility for advanced fields instead of cramming every detail into the default view.

## Table Plus Inspector

Prefer a table-plus-drawer pattern for Redis object inspection:

1. Search/filter/select the row in the table.
2. Open a drawer or side panel for full value, TTL, metadata, source, dependencies, and actions.
3. Preserve table scroll, filters, sort, and selected row while the inspector is open.
4. Show freshness: live, sampled, cached, derived, stale, or failed.

## Verification

Check keyboard focus, row activation, sorting announcements, empty/loading/error states, column overflow, responsive width, and light/dark contrast. For UI validation, use Playwright screenshots at desktop and mobile widths.

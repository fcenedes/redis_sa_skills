# Redis Demo and App Delivery Recipes

Use these recipes when an agent needs to ship a Redis-branded demo or application quickly. Start from the closest recipe, then adapt data and components. Keep the core Redis brand primitives from `SKILL.md`.

## Shared Style Defaults

- Use Space Grotesk for UI text and Space Mono only for commands, keys, IDs, timestamps, ports, hashes, and CLI output.
- Use Redis Red / `Hyper` for brand accents, selected Redis entities, active navigation, and one primary action.
- Use Midnight and Dusk tones for structure, labels, borders, and hierarchy.
- Use 5px radius and 8px spacing units.
- Prefer compact, scannable layouts over decorative hero sections for tools and dashboards.
- In dark mode, verify contrast against the Redis color/type legibility matrix.

## Finesse Rules

- Create hierarchy with type weight, spacing, and Dusk tones before adding more color.
- Keep red accents intentional: one primary action, one selected path, or one brand moment per view.
- Keep surfaces flat and purposeful; use cards for repeated items, modals, or framed tools.
- Align controls, metric labels, and timestamps to make dense data easy to scan.
- Use official illustrations for empty, setup, and success states, not as decorative filler.
- Make light and dark mode feel like the same product: same layout, same hierarchy, adjusted contrast.

## Recipe: Demo Landing + Live Panel

- Top area: Redis logo, concise demo title, one-sentence purpose, primary action.
- Main area: live status strip, key metric, recent command/result, and next action.
- Supporting area: architecture summary, dataset/source, setup state, and reset/replay control.
- Use an official Redis illustration only when it explains the demo or empty/setup state.
- Avoid oversized marketing copy once the user is inside the working demo.

## Recipe: Operational Dashboard

- Put the highest-risk state, primary metric, and next action in the first viewport.
- Use a status strip, compact metric row, event table, and inspection panel before adding charts.
- Put source and freshness near operational metrics.
- Use borders, icons, and labels for state; do not flood panels with state color.
- Keep Redis Red for active selection or the primary Redis path.

## Recipe: Developer Tool

- First viewport: connection/database selector, command or query input, result preview, and execution state.
- Use Space Mono for commands, keys, IDs, and output snippets.
- Keep destructive actions visually separate from Redis Red primary actions.
- Show copy, retry, export, and reset affordances near the result they affect.

## Recipe: Evidence or Audit View

- Use a table or vertical timeline with timestamp, actor, source, command, and result.
- Keep evidence rows neutral; use Redis Red only for selection, Redis-owned source, or primary emphasis.
- Make freshness, sampling, and derivation visible in row labels.
- Prefer row expansion over nested cards.

## Recipe: Trace or Dependency View

- Use a left rail, compact event rows, and clear time ordering.
- Distinguish source-of-truth nodes from derived nodes with labels and line style, not color alone.
- Use Redis Red for Redis systems or selected paths, not every edge.
- Do not imply causality unless the UI has evidence for it.

## Recipe: Documentation or Developer Education Surface

- Use Geist only for documentation surfaces aligned with the Redis brand portal.
- Keep examples executable and short.
- Put command, explanation, and expected result close together.
- Use official icons or illustrations sparingly to orient the reader, not to decorate dense technical content.

## Empty, Loading, Error, Warning, and Degraded States

- Empty: say what data is missing and the next action.
- Loading: show the operation or source being loaded.
- Error: state what failed, the source, and the retry or recovery action.
- Warning: explain degraded capability and whether data is still safe to use.
- Degraded: mark what is live, stale, sampled, or unavailable.

## DO NOT

- Do not use a marketing hero as the first screen of a tool unless the requested deliverable is a landing page.
- Do not make every active, warning, error, and selected state Redis Red.
- Do not hide source, freshness, or confidence for operational data.
- Do not use cards inside cards for dashboard sections.
- Do not introduce a separate design system before applying these recipes.

# Layout Patterns

## Product Shell

Use app bar + sidebar + content region for Redis product tools. Keep navigation width stable. Use a mid bar for secondary context such as environment, database, cluster, namespace, or selected entity.

## Dashboard

Start with dense summary metrics, then operational tables or charts. Avoid marketing hero layouts. Status widgets need labels, timestamps, and source/freshness indicators.

## Table And Inspector

Use a searchable/filterable table as the main surface. Open row details in a drawer or side panel. Preserve table scroll, filters, and selection when the detail panel opens.

## Forms And Wizards

Use steppers for multi-stage setup. Keep validation inline. Use review screens for destructive or irreversible operations.

## Empty, Loading, Error

Empty states say what is missing and offer the next useful action. Loading states reserve layout space. Error states say what failed, whether retry is possible, and whether data may be stale.

## Demo Delivery

For demos, prioritize believable product surfaces over decorative compositions: navigation, filters, table data, detail views, and realistic state transitions make a Redis demo feel faster and more credible.

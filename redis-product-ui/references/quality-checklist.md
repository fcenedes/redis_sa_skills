# Quality Checklist

Before calling a Redis product UI complete:

- Light and dark modes are both implemented or the limitation is explicit.
- Text/background contrast is checked for body text, controls, table cells, badges, and semantic states.
- Keyboard focus is visible and logical across navigation, forms, menus, drawers, modals, tabs, and tables.
- Tables support the expected operator workflow: search, filter, sort, scan, inspect, act.
- Large tables choose pagination or virtualization, not both.
- Table cells for keys, IDs, commands, and timestamps use code typography and do not resize controls.
- Empty, loading, warning, error, disabled, selected, and success states are visible.
- Semantic colors distinguish status from brand accent.
- Redis Red is used for brand emphasis, not as the only action/status color.
- UI density fits product/admin work; no marketing hero unless the user requested a landing page.
- Long text, chips, labels, and values use ellipsis, wrapping, overflow counts, or detail disclosure intentionally.
- Drawers, modals, menus, popovers, tabs, and row navigation have keyboard behavior and focus states.
- Async feedback that affects task outcome has visible text and screen-reader announcement or aria-live equivalent.
- Charts include title, units, source/freshness, tooltip, and empty/loading/error handling.
- Copy distinguishes live, sampled, derived, pending, approved, failed, and stale states when those meanings exist.
- The result does not claim Storybook-derived product tokens are official brand colors.
- For skill validation, compare against `redis-product-ui/validation/redis-product-ui-demo.html` and confirm `light2`/`dark2` behavior for non-RedisInsight product UI.

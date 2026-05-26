# RedisInsight Product UI For Plugins

Use `redis-product-ui` for visual decisions. This file only adapts that skill to RedisInsight Workbench plugin iframes.

## Theme

- RedisInsight plugins use `light` / `dark`, never `light2` / `dark2`.
- Standalone external plugins cannot import RedisInsight internals, so define local CSS variables that emulate RedisInsight product tokens.
- Read the iframe body class:
  - `theme_LIGHT` => light theme
  - `theme_DARK` => dark theme
- If using `redisinsight-plugin-sdk`, prefer its theme helper when available, then mirror the same mode into local classes only when needed.

## Baseline Files

For external Parcel plugins:

- Copy `templates/external-styles.scss` to `src/styles/styles.scss`.
- Keep `package.json` `"styles": "./dist/styles.css"`.
- Keep the stylesheet bundled into `dist/styles.css`; RedisInsight injects it into the plugin iframe.

## UI Rules

- Build compact Workbench-like surfaces: toolbar, table, inspector, code/value panel, empty/error/loading states.
- Prefer table-plus-detail layouts for Redis command responses.
- Use `Source Code Pro` or monospace stacks for Redis keys, stream IDs, commands, raw values, and timestamps.
- Use status badges with text and color; never rely on color alone.
- Use product semantic colors for success, warning, danger, selected, and neutral states.
- Keep controls stable: long keys and JSON must scroll, wrap intentionally, or ellipsize with a title/tooltip.

## Standalone Constraints

- Do not import `uiSrc/`, `@redis-ui/*`, RedisInsight monorepo packages, or private source.
- Do not use global CSS resets that can fight the iframe host.
- Scope styles under plugin classes such as `.ri-plugin-shell`.
- Do not use Redis brand red as the universal accent, heading, CTA, error, or status color.

## Verification

Check both themes:

```bash
curl -s http://localhost:5540/api/plugins
```

Then run a matching Redis command in Workbench and verify:

- `theme_LIGHT` and `theme_DARK` render correctly.
- Empty, loading, error, and success states are styled.
- Tables and `pre` blocks do not overflow the iframe incoherently.
- Browser console has no style/runtime errors.

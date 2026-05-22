# Plugin Manifest (`package.json`)

The plugin manifest is `package.json` at the plugin root.

## Single Visualization

```json
{
  "name": "ri-plugin-xrange-table",
  "version": "0.0.1",
  "description": "Render XRANGE results as a sortable table.",
  "main": "./dist/index.js",
  "styles": "./dist/styles.css",
  "visualizations": [
    {
      "id": "xrange-table",
      "name": "Stream Entries",
      "activationMethod": "renderXRangeTable",
      "matchCommands": ["XRANGE", "XREVRANGE"],
      "description": "Tabular view of stream entries.",
      "default": false
    }
  ]
}
```

## Multiple Visualizations

```json
{
  "name": "ri-plugin-geodata",
  "version": "0.0.1",
  "description": "Map and heatmap visualizations for Redis geo commands.",
  "main": "./dist/index.js",
  "styles": "./dist/styles.css",
  "visualizations": [
    {
      "id": "geo-markers",
      "name": "Map (Markers)",
      "activationMethod": "renderMarkersView",
      "matchCommands": ["GEOSEARCH", "GEORADIUS", "GEORADIUSBYMEMBER"],
      "description": "Plot geo results as map markers.",
      "default": false
    },
    {
      "id": "geo-heatmap",
      "name": "Map (Heatmap)",
      "activationMethod": "renderHeatmapView",
      "matchCommands": ["GEOSEARCH", "GEORADIUS"],
      "description": "Density heatmap of geo results.",
      "default": false
    }
  ]
}
```

The plugin's main bundle exports both functions:

```ts
export default {
  renderMarkersView,
  renderHeatmapView,
};
```

## Matching and Defaults

When several visualizations share commands, make their defaults mutually exclusive by command shape, not just by command name. For example, a geodata map can be the default for coordinate-producing `GEOSEARCH` / `GEORADIUS` rows, while an inspector can be available for the same commands but default only for non-coordinate, scalar, or store-style results.

Rules for matcher definitions:

- Match whole command tokens. Do not let `GEOSEARCH` match `GEOSEARCHSTORE`.
- Keep `matchCommands` broad only when `matchQuery` narrows the result shape safely.
- Use `noneRegex` for exclusion only after checking how the platform normalizes command text.
- Keep regexes bounded and linear. Avoid broad repeated token alternatives plus a trailing `[\s\S]{0,N}` window.
- Test overlapping visualizations so only one `default: true` candidate remains for each command shape.

## Icons

Optional but supported:

```json
{
  "iconDark": "./dist/icon-dark.svg",
  "iconLight": "./dist/icon-light.svg"
}
```

Place icons under `dist/` (or another path your manifest points at) and copy them as part of deployment.

## Stripping Dev-Only Fields

The deployed manifest must **not** include:

- `scripts`
- `devDependencies`
- `targets` (Parcel-only build hints)
- `husky`, `lint-staged`, `eslintConfig`, `prettier`, etc.

Either keep a separate `package.deploy.json` or strip with `jq`:

```bash
jq 'del(.scripts, .devDependencies, .targets, .husky, .["lint-staged"])' \
  package.json > /tmp/package.deploy.json
```

`templates/deploy-external.sh` does this automatically.

## Required Fields Recap

- `name` — globally unique within `~/.redis-insight/plugins/`.
- `version` — semver.
- `description` — one sentence shown in Insight.
- `main` — built JS bundle path.
- `styles` — built CSS path (omit only if no styles).
- `visualizations[]` — at least one, each with `id`, `name`, `activationMethod`, `matchCommands`, `description`, `default`.

If any required field is missing, Insight silently drops the plugin. Always run `curl /api/plugins` after deploying.

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

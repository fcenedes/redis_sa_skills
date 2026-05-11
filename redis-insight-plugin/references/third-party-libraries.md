# Third-Party Libraries

Notes on integrating common libraries inside a Redis Insight plugin iframe.

## Leaflet

`leaflet` is the default for map plugins.

### Default Icon Fix

Leaflet's default marker icons use bundler-relative paths that break inside an Insight bundle. Apply the standard fix once, before creating any markers:

```ts
import L from 'leaflet';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// @ts-expect-error — Leaflet's internal API
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({ iconUrl, iconRetinaUrl, shadowUrl });
```

### `circleMarker` vs `marker`

For dense geo results, prefer `L.circleMarker`:

- Cheap to render — no image asset.
- Smaller bundle (no icon images).
- Easier to color-code by metric (e.g., distance bucket).

Use full markers only when you need iconography or popups with rich content.

### `markercluster`

For more than ~500 points, use `leaflet.markercluster`:

```ts
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

const cluster = L.markerClusterGroup();
points.forEach(p => cluster.addLayer(L.marker([p.lat, p.lon])));
map.addLayer(cluster);
```

### Heatmap

`leaflet.heat` is small and well-known:

```ts
import 'leaflet.heat';

L.heatLayer(points.map(p => [p.lat, p.lon, p.weight ?? 1]), { radius: 25 }).addTo(map);
```

Provide a `radius` and consider `maxZoom` to avoid blurry overlays at high zoom.

## Custom `.d.ts` Examples

Some Leaflet plugins lack types. Add a local declaration:

```ts
// src/types/leaflet.heat.d.ts
declare module 'leaflet.heat' {
  import * as L from 'leaflet';
  export type HeatLatLng = [number, number, number?];
  interface HeatLayerOptions {
    minOpacity?: number; maxZoom?: number; radius?: number; blur?: number;
  }
  function heatLayer(latlngs: HeatLatLng[], options?: HeatLayerOptions): L.Layer;
  export = heatLayer;
}
```

Same approach works for `leaflet.markercluster` if you skip its `@types` package.

## Chart.js

- Bundle Chart.js fully — do not externalize.
- Set `maintainAspectRatio: false` and put the canvas in a sized flex/grid container so the chart resizes inside the iframe.
- Destroy the chart on re-render to avoid memory leaks:

```ts
chartRef.current?.destroy();
chartRef.current = new Chart(canvas, config);
```

## AG Grid / Tables

- Use the community build (`ag-grid-community`) to avoid licensing in customer plugins.
- Bundle CSS themes; do not rely on global `@import`.
- Cap row counts (paginate or virtualize) for large XRANGE results.

## Bundle Size Guidance

- Aim for `dist/index.js` under ~1.5 MB minified for snappy first render.
- Use Parcel's bundle analyzer or `terser`'s reports to find heavy deps.
- Avoid `moment`; use `date-fns` or native `Intl.DateTimeFormat`.
- Avoid `lodash`; use targeted imports (`lodash/get`) or stdlib.
- Tree-shaking only helps if your imports are scoped (`import { sum } from 'lodash-es'`).

## Forbidden Imports

- No `uiSrc/`, `@redis-ui/*`, or any RedisInsight monorepo internal in standalone plugins.
- No Node-only modules (`fs`, `path`, `child_process`).
- No CommonJS-only deps that fail in Parcel's `module` target without shims.

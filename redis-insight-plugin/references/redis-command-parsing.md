# Redis Command Parsing

Plugins must defensively parse raw Redis responses. Different commands return very different shapes, and even the same command with different flags returns different shapes.

## GEOSEARCH

`GEOSEARCH key FROMLONLAT lon lat BYRADIUS r unit ASC`

Returns a flat array of member names:

```json
["member1", "member2", "member3"]
```

`GEOSEARCH key FROMLONLAT lon lat BYRADIUS r unit ASC WITHCOORD WITHDIST WITHHASH`

Returns nested arrays per member:

```json
[
  ["member1", "12.34", ["13.388860", "52.517037"]],
  ["member2", "56.78", ["8.682497", "50.110645"]]
]
```

Parser sketch:

```ts
type GeoPoint = { name: string; lon: number; lat: number; dist?: number };

export function parseGeoSearch(data: any[]): GeoPoint[] {
  if (!Array.isArray(data)) return [];
  return data.flatMap(entry => {
    if (typeof entry === 'string') {
      // Plain GEOSEARCH without WITH* flags: no coords available.
      return [];
    }
    if (Array.isArray(entry)) {
      const [name, ...rest] = entry;
      const distRaw = rest.find(v => typeof v === 'string' && /^[\d.\-]+$/.test(v));
      const coords = rest.find(v => Array.isArray(v));
      if (!Array.isArray(coords)) return [];
      const [lonStr, latStr] = coords as [string, string];
      const lon = Number(lonStr);
      const lat = Number(latStr);
      if (!Number.isFinite(lon) || !Number.isFinite(lat)) return [];
      return [{ name: String(name), lon, lat, dist: distRaw ? Number(distRaw) : undefined }];
    }
    return [];
  });
}
```

## GEORADIUS / GEORADIUSBYMEMBER

Same parser shape as `GEOSEARCH`. The flat-vs-nested split is identical (driven by `WITHCOORD`, `WITHDIST`, `WITHHASH`).

`GEORADIUS` is deprecated in favor of `GEOSEARCH`, but customers still use it. Parse both. Match command name from the activation props to choose the right header label.

## XRANGE / XREVRANGE

```
XRANGE stream - +
```

Returns an array of `[id, [field, value, field, value, ...]]`:

```json
[
  ["1700000000000-0", ["temp", "22", "humidity", "55"]],
  ["1700000001000-0", ["temp", "23"]]
]
```

Parser sketch:

```ts
export function parseXRange(data: any[]): { id: string; fields: Record<string, string> }[] {
  if (!Array.isArray(data)) return [];
  return data.flatMap(entry => {
    if (!Array.isArray(entry) || entry.length < 2) return [];
    const [id, kv] = entry;
    if (typeof id !== 'string' || !Array.isArray(kv)) return [];
    const fields: Record<string, string> = {};
    for (let i = 0; i + 1 < kv.length; i += 2) {
      const k = kv[i];
      const v = kv[i + 1];
      if (typeof k === 'string') fields[k] = String(v);
    }
    return [{ id, fields }];
  });
}
```

## Unit Conversion

`GEOSEARCH BYRADIUS r unit` accepts `m | km | mi | ft`. If your visualization assumes meters but the user's command was in miles, your distance labels will be wrong. Read the unit from the command string and convert:

```ts
const UNIT_TO_METERS = { m: 1, km: 1000, mi: 1609.344, ft: 0.3048 };
```

Also handle `GEOSEARCH BYBOX width height unit`. Redis returns `WITHDIST` values in the original command unit, so the parser must preserve the raw unit before any internal normalization to kilometers or meters.

For BYBOX drawing, remember that longitude degrees are latitude-dependent:

```ts
const latRadians = centerLat * Math.PI / 180;
const lonScale = Math.max(Math.cos(latRadians), 1e-6);
const lonDelta = widthKm / (111.32 * lonScale);
```

## Defensive Parsing Rules

- Always start with `if (!Array.isArray(data)) return [];`.
- Never assume nested array length — destructure with `const [a, b, ...rest] = ...`.
- Preserve argument positions when tokenizing commands. Empty quoted strings (`""`, `''`) should become empty-string tokens, not disappear.
- Treat numeric fields as strings; convert with `Number(...)` and validate with `Number.isFinite(...)`.
- Reject blank numeric strings before conversion; `Number('')` is `0`.
- Drop malformed entries silently; surface the count (`"3 of 25 entries skipped"`) in the UI rather than crashing.
- Never throw inside a parser — return an empty array and let the activation function render an empty/error state.
- Avoid `Math.max(...largeArray)` or other spreading of full result sets. Use `reduce` or loops for large responses.
- When parsing `FT.*` or hybrid command strings, tokenize first and honor command grammar. Do not strip `PARAMS`, `SEARCH`, or `FILTER` just because those words appear inside a key, member, index name, or quoted query.

## Response Shape Caveats

- **Cluster mode** can return wrapped responses depending on Insight's transport.
- **`WITH...` flags** change the response shape mid-flight — never key off command name alone.
- **Empty results** are `[]`, but on some commands a missing key returns `null`. Treat both as empty.
- **Customer modules** (RedisJSON, RedisTimeSeries, RedisSearch) return their own shapes — only support what your `matchCommands` declares.
- **Redis 8 / module responses** can be array-like, aggregate-like, or object/map-style. Handle array-specific branches before generic object branches because arrays are objects in JavaScript.

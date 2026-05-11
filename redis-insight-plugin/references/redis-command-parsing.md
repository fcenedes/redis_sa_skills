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

## Defensive Parsing Rules

- Always start with `if (!Array.isArray(data)) return [];`.
- Never assume nested array length — destructure with `const [a, b, ...rest] = ...`.
- Treat numeric fields as strings; convert with `Number(...)` and validate with `Number.isFinite(...)`.
- Drop malformed entries silently; surface the count (`"3 of 25 entries skipped"`) in the UI rather than crashing.
- Never throw inside a parser — return an empty array and let the activation function render an empty/error state.

## Response Shape Caveats

- **Cluster mode** can return wrapped responses depending on Insight's transport.
- **`WITH...` flags** change the response shape mid-flight — never key off command name alone.
- **Empty results** are `[]`, but on some commands a missing key returns `null`. Treat both as empty.
- **Customer modules** (RedisJSON, RedisTimeSeries, RedisSearch) return their own shapes — only support what your `matchCommands` declares.

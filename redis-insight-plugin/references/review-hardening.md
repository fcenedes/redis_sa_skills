# Review Hardening

Use this before opening or updating a Redis Insight plugin PR. It captures review issues that are easy for coding agents to miss because the happy path works.

## Start From Review Discipline

- Treat every bot or human comment as a hypothesis. Confirm it against code, tests, and Redis/Insight behavior before changing code.
- Reproduce the failing shape with a focused test first. If the issue is valid, keep the regression test.
- Prefer the narrowest verification scope that proves the change: package tests, parser tests, manifest matcher tests, and typecheck. Do not run a full RedisInsight build for every comment unless the changed surface requires it.
- When replying to PR comments, state the behavior fixed, the test added, and the commit that contains it.

## Manifest and Matcher Checklist

- Match whole Redis command tokens, not prefixes. `GEOSEARCH` must not match `GEOSEARCHSTORE`; `FT.SEARCH` must not match an imaginary longer command.
- Keep multi-visualization defaults mutually exclusive for overlapping commands. If a map is the default for coordinate rows, an inspector can be available but must not also be the blanket default for the same command shape.
- If `matchQuery.anyRegex` / `noneRegex` is used, keep regexes bounded and linear. Avoid repeated broad alternatives followed by trailing `[\s\S]{0,N}`.
- Make token alternatives disjoint: quoted strings, double-quoted strings, and unquoted tokens should not overlap in a way that creates backtracking spikes.
- Test native command names, module command names, and store/scalar variants separately. Query/result rows and scalar/store commands often need different visualization defaults.

## Parser Checklist

- Tokenize the Redis command before inspecting options. Raw `indexOf("PARAMS")`, `indexOf("SEARCH")`, or `indexOf("FILTER")` will misread keys, members, index names, and quoted query text.
- Preserve empty quoted tokens in the tokenizer. `""` and `''` should still occupy an argument position, even if the downstream parser later rejects that command shape.
- Keyword positions matter. For `FT.HYBRID`, skip the command and index tokens when detecting `SEARCH` / `FILTER`, and skip `PARAMS` key/value ranges when parsing predicates.
- Strip or ignore large vector payloads only when the token is the actual `PARAMS` option for the command grammar. Do not strip a native GEO member/key named `PARAMS`, an index named `PARAMS`, or query text containing `PARAMS`.
- Preserve the raw distance unit used by Redis for returned `WITHDIST` values. For `GEOSEARCH BYBOX`, the unit is the token after `BYBOX width height`.
- Validate blank numeric parts before calling `Number(...)`; JavaScript treats `Number("")` as `0`.
- Differentiate empty result sets from malformed/missing-coordinate rows so the UI can show the right guidance.
- Handle search-like arrays, aggregate-like arrays, and Redis 8 map-style objects before generic object fallback. Arrays are objects in JavaScript, so order matters.
- Avoid `Math.max(...largeArray)` or similar spread over result sets. Reduce or loop to avoid call stack and argument limits.

## Geo and Leaflet Checklist

- Redis coordinates are `[lon, lat]`; Leaflet APIs expect `[lat, lon]`.
- BYBOX longitude width in degrees scales by `cos(latitude)`. Apply latitude-aware scaling and cap near the poles.
- Validate Leaflet bounds with `bounds.isValid()` before `fitBounds`.
- Do not let Leaflet markercluster callbacks capture stale React state. Keep threshold/color settings in refs or recreate the cluster layer when the callback dependencies change.
- Build popup DOM with `textContent` or escaped React output, not interpolated HTML from Redis data.
- For large point sets, use loops/reductions and avoid per-render expensive parsing unless the input changed.
- Use mode-aware empty/error titles. Heatmap, map, shape, and inspector failures should not all say `Cannot render map`.

## Code Hygiene Checklist

- Remove dead plugin config files and unused exports instead of leaving them for reviewers to rediscover.
- Enforce declared limits or delete them. A `maxMapPoints` constant that nobody reads is a bug magnet.
- Centralize shared unit conversion constants/helpers so parsers and visualizations cannot drift.
- Keep component-local types and large constants in sibling `.types.ts` and `.constants.ts` files when the component is already large.
- Keep return types honest and simple. Do not use a tuple type when the function returns arbitrary-length arrays.
- After discriminated-union narrowing, remove unreachable null/error branches. A defensive check that cannot run makes the real state model harder to review.
- Memoize parsed command/results when parsing is nontrivial or feeds map/heatmap rendering.

## Test Matrix

Add focused tests for any surface you touch:

- Manifest matcher: exact command boundaries, default exclusivity, store/scalar vs coordinate-result commands.
- Command parser: keyword-like key/member/index names, empty quoted tokens, `PARAMS` in native commands, `PARAMS` in query text, large vector payloads, empty rows, malformed rows, Redis 8 object responses.
- GEO unit math: `BYRADIUS` and `BYBOX` with `m`, `km`, `mi`, and `ft`; longitude degree scaling by latitude.
- Visualization state: threshold slider updates while clustered, bounds with zero/invalid points, heatmap vs map vs inspector error titles.
- Performance guardrails: large result counts, large vectors, and no spread into `Math.max`.

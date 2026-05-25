# Chart Patterns

Use charts when trends, rates, capacity, latency, throughput, memory, hit rate, or error ratios are easier to compare visually than in a table.

## Product Chart Defaults

- Use compact charts inside dashboards, inspectors, and detail panels.
- Pair every chart with a clear title, unit, time range, source/freshness, and empty/loading/error state.
- Use responsive containers so charts resize without clipping labels or legends.
- Keep axes readable; hide only when values are directly labeled and still understandable.
- Use tooltips for exact values, timestamps, and series labels.
- Use grid lines sparingly for scanability, not decoration.

## Color

- Use semantic product colors for status series: success, attention, danger, informative, notice.
- Use primary/secondary families for neutral or categorical series.
- Do not use Redis Red as the default line color for every metric.
- Verify line, point, grid, tooltip, and legend contrast in light and dark modes.

## Common Redis Dashboard Charts

- Latency over time: line chart with p50/p95/p99 series.
- Throughput: ops/sec, commands/sec, requests/sec.
- Memory: used memory, fragmentation, eviction, capacity.
- Cache: hit rate, miss rate, stale ratio.
- Streams/queues: lag, pending entries, consumer throughput.
- Search/vector: query latency, recall proxy, index size, ingestion rate.

## Layout

- Put critical numbers in summary metrics first, then charts, then drill-down table.
- Keep chart cards compact; do not let charts replace the primary table when users need row-level action.
- Use synchronized time windows across related charts.
- Provide a table or inspector path for exact records when decisions require evidence.

## Verification

Check empty data, sparse data, many data points, long series labels, mobile width, dark mode, tooltip placement, and values with units.

# Redis Reveal.js Chart Reference

Read this before adding Chart.js visuals to Redis decks.

The scaffold includes Chart.js and the Reveal.js chart plugin. Charts must be bounded by flex or grid containers and use `maintainAspectRatio: false` to avoid slide overflow.

## Redis Chart Palette

| Purpose | Color |
| --- | --- |
| Redis primary | `#FF4438` |
| Redis dark red | `#8A221C` |
| Text / axes | `#091A23` |
| Secondary line | `#163341` |
| Query / vector | `#0B6B45` |
| Streams / events | `#B7791F` |
| Cluster / replication | `#3446A3` |
| Cloud / network | `#6E49CB` |
| Observability | `#0E7490` |
| Success / output | `#087A46` |
| Muted grid | `#B9C2C6` |

## Required Layout Pattern

```html
<section style="display: flex; flex-direction: column; height: 100%;">
  <h2>Cache hit ratio trend</h2>
  <div class="content" style="min-height: 0;">
    <div style="flex: 1; position: relative; min-height: 0; min-width: 0;">
      <canvas data-chart="line">
      <!--
      {
        "data": {
          "labels": ["Week 1", "Week 2", "Week 3", "Week 4"],
          "datasets": [{
            "label": "Hit ratio",
            "data": [72, 81, 88, 93],
            "borderColor": "#FF4438",
            "backgroundColor": "rgba(255, 68, 56, 0.12)",
            "fill": true,
            "tension": 0.35
          }]
        },
        "options": {
          "maintainAspectRatio": false,
          "scales": {
            "y": {
              "title": { "display": true, "text": "Hit ratio %" },
              "grid": { "color": "#B9C2C6" }
            },
            "x": { "grid": { "display": false } }
          }
        }
      }
      -->
      </canvas>
    </div>
  </div>
</section>
```

## Common Redis Chart Types

- **Line:** latency trend, cache hit ratio, stream lag, memory growth, request throughput.
- **Bar:** before/after latency, cost comparison, workload distribution, command mix.
- **Stacked bar:** storage split, request categories, cluster shard ownership, incident drivers.
- **Doughnut:** command family mix, memory by data type, traffic split by region.
- **Scatter:** latency versus payload size, recall versus query latency, throughput versus cost.

## Full Slide Chart

Use for one dominant metric or comparison.

```html
<section style="display: flex; flex-direction: column; height: 100%;">
  <h2>p95 latency before and after Redis cache-aside</h2>
  <div class="content" style="min-height: 0;">
    <div style="flex: 1; position: relative; min-height: 0; min-width: 0;">
      <canvas data-chart="bar">
      <!--
      {
        "data": {
          "labels": ["Baseline API", "Redis cache-aside"],
          "datasets": [{
            "label": "p95 latency ms",
            "data": [480, 72],
            "backgroundColor": ["#163341", "#FF4438"]
          }]
        },
        "options": {
          "maintainAspectRatio": false,
          "plugins": {
            "legend": { "display": false }
          },
          "scales": {
            "y": { "beginAtZero": true, "grid": { "color": "#B9C2C6" } },
            "x": { "grid": { "display": false } }
          }
        }
      }
      -->
      </canvas>
    </div>
  </div>
  <p class="footnote">Replace example data with measured workload data and source notes.</p>
</section>
```

## Split Insight Plus Chart

Use when the chart needs interpretation.

```html
<section style="display: flex; flex-direction: column; height: 100%;">
  <h2>Vector search tuning trade-off</h2>
  <div class="content" style="display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 28px; min-height: 0;">
    <div class="callout query">
      <p><strong>Message:</strong> Tune index settings around the recall and latency target, not only maximum QPS.</p>
      <p class="text-muted">Add the dataset, embedding model, vector dimension, and filter shape in the footnote.</p>
    </div>
    <div style="position: relative; min-height: 0; min-width: 0;">
      <canvas data-chart="scatter">
      <!--
      {
        "data": {
          "datasets": [{
            "label": "Candidate settings",
            "data": [{ "x": 42, "y": 88 }, { "x": 58, "y": 93 }, { "x": 76, "y": 96 }],
            "backgroundColor": "#0B6B45"
          }]
        },
        "options": {
          "maintainAspectRatio": false,
          "scales": {
            "x": { "title": { "display": true, "text": "p95 latency ms" } },
            "y": { "title": { "display": true, "text": "Recall %" } }
          }
        }
      }
      -->
      </canvas>
    </div>
  </div>
</section>
```

## Validation

Run this after editing any chart:

```bash
node <skill-dir>/scripts/check-charts.js presentation.html
```

Fix every error. Treat warnings as action items unless you intentionally documented the exception in speaker notes or a footnote.

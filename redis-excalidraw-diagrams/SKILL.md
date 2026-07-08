---
name: redis-excalidraw-diagrams
description: Create Redis-focused Excalidraw architecture diagrams for caching, vector search, Redis Search, Streams, replication, clustering, observability, and Redis Cloud systems. Use when a user asks for a Redis technical diagram, architecture visual, workflow sketch, or .excalidraw file that must be accurate, branded, and visually validated.
compatibility: Requires Python (uv) and Playwright/Chromium for scripts/render_excalidraw.py to render and visually validate diagrams.
license: MIT
metadata:
  author: redis
  version: "1.0.0"
  source: "Adapted from https://github.com/coleam00/excalidraw-diagram-skill"
---
# Redis Excalidraw Diagram Skill

Create `.excalidraw` JSON diagrams that explain Redis systems through structure, flow, and concrete evidence. Do not produce generic boxes-and-arrows diagrams.

## Authority

- Authorized: create or modify Redis Excalidraw diagram files and local render outputs for validation.
- Requires explicit request: publish/deploy diagrams or replace Lucidchart handoff scope.
- Assessment-only default: for diagram review requests, report findings and stop unless edits are requested.

## DO NOT

- Do not invent colors outside the palette in [color-palette.md](references/color-palette.md); every fill, stroke, and text color must trace back to it.
- Do not use generic unlabeled boxes as components; every shape must carry a real Redis role, command, or evidence artifact.
- Do not skip the render-inspect PNG cycle; JSON that "looks right" is not validated until it has been rendered and visually checked.
- Do not omit real Redis commands, schemas, or config fragments as evidence on technical diagrams; decorative boxes without concrete artifacts are not acceptable.

## Required Workflow

1. **Classify depth first.**
   - Simple/conceptual: mental models, high-level cache patterns, trade-off explanations.
   - Comprehensive/technical: real Redis architectures, commands, protocols, schemas, production topologies, or customer-facing technical diagrams.
2. **Research before technical diagrams.** For comprehensive diagrams, verify Redis-specific facts in current Redis docs or the user's source material before drawing. Use exact command names, index syntax, topology terms, metrics, and product names.
3. **Load the Redis palette.** Read [color palette](references/color-palette.md) before choosing any fill, stroke, text, or evidence-artifact color. It is the single source of truth for diagram colors.
4. **Choose visual patterns by behavior.** Use fan-out for pub/sub or read replicas, convergence for aggregation, timelines for Streams and lifecycle flows, trees for cluster slots and hierarchy, cycles for cache-aside refresh loops, and swimlanes for application/database/observability boundaries.
5. **Generate Excalidraw JSON.** Use [element templates](references/element-templates.md) and [JSON schema](references/json-schema.md). For large diagrams, build one section per edit with readable IDs and section-specific seed ranges.
6. **Render, inspect, and fix.** Run the renderer, view the PNG, then revise until there is no clipping, overlap, ambiguous arrow routing, or unreadable evidence.

## Redis Diagram Requirements

For technical diagrams, include concrete evidence artifacts when relevant:

- Redis commands such as `GET`, `SET`, `XADD`, `XREADGROUP`, `FT.CREATE`, `FT.SEARCH`, `HSET`, `JSON.SET`, `CLUSTER SLOTS`, or `INFO`.
- Real schema or query fragments for Redis Search and vector search, including index type, field aliases, `DIM`, `DISTANCE_METRIC`, and KNN or range syntax.
- Stream entry IDs, consumer groups, pending entries, acknowledgements, trimming, or idempotent message-processing details when diagramming Streams.
- Replication details such as primary/replica roles, replication offset, partial resynchronization, asynchronous acknowledgements, or Sentinel/Cluster failover boundaries.
- Cluster details such as 16,384 hash slots, shard ownership, replicas, client redirection, resharding, and consistency caveats.
- Observability details such as shard/database/node metrics, alerts, Prometheus/Grafana paths, slowlog, latency, memory, eviction, and commandstats.
- Redis Cloud architecture details such as subscriptions, databases, regions, private endpoints, Active-Active copies, CRDT conflict resolution, and TLS synchronization.

Use [Redis architecture patterns](references/redis-architecture-patterns.md) for source links, pattern suggestions, and evidence examples.

## Design Rules

- Make the shape carry meaning. If the labels were removed, the layout should still communicate the architecture.
- Prefer free-floating text for labels, annotations, and section titles. Add containers only for actual components, evidence artifacts, or group boundaries.
- Use arrows for relationships and direction; use plain lines for structure such as slot maps, timelines, trees, and swimlane dividers.
- Keep Redis Red for primary Redis-owned components and critical emphasis, not as decoration everywhere.
- Use dark evidence blocks for command snippets, JSON payloads, metrics examples, and config fragments.
- Use `fontFamily: 3`, `roughness: 0`, `opacity: 100`, and readable text sizes for professional technical diagrams.
- Break long labels into short lines before rendering; do not rely on Excalidraw text width to keep text inside boxes.
- Route arrows around elements. Do not let arrows cross through labels, code blocks, or component shapes.

## Render And Validate

From this skill directory, install renderer dependencies once:

```bash
cd redis-excalidraw-diagrams/references
uv sync
uv run playwright install chromium
```

Render a diagram:

```bash
cd redis-excalidraw-diagrams/references
uv run python render_excalidraw.py /path/to/diagram.excalidraw --output /path/to/diagram.png
```

After rendering, open or read the PNG and check:

- Text fits inside containers and remains legible at export size.
- Evidence artifacts are readable and use real Redis examples.
- Arrows connect to intended elements and avoid visual collisions.
- Similar elements have consistent spacing and hierarchy.
- The canvas has no excessive empty voids or crowded sections.

Repeat render-view-fix until the PNG is ready to share. Do not deliver technical diagrams based on JSON inspection alone.

## Quality Checklist

Each item must be proved by a command output or file read from this session, not by memory or prior conversation.

- Redis facts were researched against current docs or user-provided source material.
- Diagram depth matches the user's need.
- The Redis palette was used for every color choice.
- The diagram includes concrete Redis evidence for technical architectures.
- Major concepts use distinct visual patterns instead of uniform cards.
- Excalidraw JSON validates and renders to PNG.
- Rendered PNG was visually inspected and fixed.

## Reference Index

| File | Load When |
|------|-----------|
| [color-palette.md](references/color-palette.md) | Always, before choosing any fill, stroke, or text color. |
| [element-templates.md](references/element-templates.md) | Building Excalidraw JSON elements (shapes, arrows, text, containers). |
| [json-schema.md](references/json-schema.md) | Validating `.excalidraw` file structure and required fields. |
| [redis-architecture-patterns.md](references/redis-architecture-patterns.md) | Choosing patterns and evidence examples for a specific Redis system (caching, Streams, cluster, vector search, Cloud). |
| [render_excalidraw.py](references/render_excalidraw.py) | Rendering a `.excalidraw` file to PNG for visual inspection. |

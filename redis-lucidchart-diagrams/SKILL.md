---
name: redis-lucidchart-diagrams
description: Use when creating Redis-focused Lucidchart architecture diagrams, Lucid Standard Import sources, customer workshop visuals, SA diagrams, editable architecture flows, or Lucid-ready diagram handoff files.
license: MIT
metadata:
  author: redis
  version: "1.0.0"
---
# Redis Lucidchart Diagrams

Create Redis technical diagrams that can be maintained in Lucidchart or Lucidspark. Treat Lucidchart and Excalidraw as peer choices: choose the format the SA, customer, or repo workflow prefers.

## Required Workflow

1. **Choose the deliverable.**
   - Use `.lucid` Standard Import source when the diagram should be imported as editable Lucid shapes.
   - Use Mermaid or CSV only when the user explicitly asks for that Lucid workflow.
   - Use screenshots or exported images only as secondary review artifacts.
2. **Research technical facts.** For customer-facing Redis diagrams, verify product names, command names, topology terms, and limits from Redis docs or user-provided source material.
3. **Load references only as needed.**
   - Read [Lucid Standard Import](references/lucid-standard-import.md) before producing `.lucid` sources.
   - Read [Redis Lucid Patterns](references/redis-lucid-patterns.md) before choosing layout, palette, evidence blocks, or swimlanes.
4. **Design from behavior.** Use swimlanes for ownership, queues for work scheduling, timelines for Streams/events, hubs for shared context, and branches for model/agent routing.
5. **Generate source, not only a picture.** Keep `document.json` and any `/data` CSV files versionable. Package `.lucid` zip files only when needed for handoff.
6. **Validate before delivery.** Run the packaging script in dry-run or build mode, inspect the JSON, and, when Lucid access exists, import it and check the rendered document.

## Redis Diagram Requirements

For technical diagrams, include concrete evidence artifacts when relevant:

- Redis commands: `HSET`, `JSON.SET`, `XADD`, `XREADGROUP`, `FT.CREATE`, `FT.SEARCH`, `GET`, `SET`, `INFO`, `CLUSTER SLOTS`.
- Data structures: Hash, JSON, Stream, List, Set, Sorted Set, Search index, vector field.
- Runtime semantics: owner, state, TTL, consumer group, pending entry, idempotency key, score, rank, freshness, source of truth.
- Operational paths: observability, retries, degraded mode, audit trail, evidence, handoff, recovery.

## Design Rules

- Make Lucid files editable first: use native shapes and lines, not flattened images.
- Use short multiline labels. Do not rely on Lucid auto-scaling to rescue long text inside boxes.
- Put commands, keys, and payload examples in dark evidence blocks with monospace-like text.
- Use Redis Red sparingly for Redis-owned or critical components; use neutral fills for applications and agent roles.
- Separate static context, durable memory, live state, and audit evidence visually.
- Prefer shape IDs and custom data that name the domain object (`redis_context`, `task_queue`, `worker_codex`) instead of generic IDs.
- Route arrows around text and evidence. Use elbow lines for workflow diagrams unless a curved relationship is clearer.

## Packaging

Validate and optionally package a Standard Import source:

```bash
python redis-lucidchart-diagrams/scripts/package_lucid_import.py path/to/lucid-source
python redis-lucidchart-diagrams/scripts/package_lucid_import.py path/to/lucid-source --output /tmp/diagram.lucid
```

The source directory must contain `document.json`. Optional `data/` and `images/` folders are included in the `.lucid` zip.

## DO NOT

- Do not position Lucidchart as better or more editable than Excalidraw; both are valid SA diagram formats.
- Do not commit generated `.lucid` zip files unless the user explicitly asks for binary handoff files.
- Do not flatten a Lucid deliverable into PNG/SVG when editable shapes are required.
- Do not use outdated Redis Query Engine or RQE naming; use Redis Search.
- Do not invent Redis product capabilities, command syntax, or Lucid import fields.

## Quality Checklist

- Deliverable format matches the SA/customer preference.
- Redis facts and command examples are current and concrete.
- `document.json` parses as JSON and has unique page, shape, and line IDs.
- Text labels are short enough to fit their boxes after import.
- Redis context, live orchestration state, audit evidence, and worker paths are visually distinct.
- Generated `.lucid` package was validated or built with the packaging script.

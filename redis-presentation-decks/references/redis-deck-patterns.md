# Redis Deck Patterns

Use this reference when planning Redis solution architecture, sales engineering, workshop, or technical storytelling decks.

## Narrative Shapes

| Deck Type | Structure | Redis Proof Points |
| --- | --- | --- |
| Executive architecture brief | Business pressure, target outcome, Redis role, migration path, risk controls, decision ask | Latency objective, availability model, cost guardrails, deployment choice, implementation timeline |
| Practitioner deep dive | Current flow, bottleneck, Redis data model, command path, scaling/failure behavior, runbook | Commands, schemas, key patterns, shard/replica layout, metrics, slowlog or latency examples |
| Workshop or enablement | Mental model, live build, exercises, solution variants, operational checklist | `redis-cli` snippets, Query Engine syntax, Streams consumer group flow, observability commands |
| QBR or value review | Goals, baseline, delivered changes, measured outcomes, next opportunities | p50/p95 latency, cache hit ratio, throughput, memory efficiency, incident reduction, roadmap |
| Competitive or modernization story | Old architecture pain, Redis capabilities, differentiated architecture, migration stages | Multi-model data, vector search, Active-Active, Redis Cloud private connectivity, operations evidence |

## Slide Archetypes

- **Redis role in one sentence:** State the exact job Redis performs, such as session store, semantic cache, stream backbone, vector index, feature store, or real-time aggregation layer.
- **Before/after path:** Show the current request path on the left and the Redis-enabled target path on the right. Mark the hot path in Redis Red.
- **Evidence block:** Put commands, schema, metrics, configs, or query fragments in dark Space Mono blocks.
- **Decision slide:** Compare deployment or design options with crisp criteria: latency, data locality, failover, ownership, cost, compliance, and operational complexity.
- **Failure-mode slide:** Show what happens during node loss, region loss, failover, resharding, stale reads, retry storms, or backpressure.
- **Operational readiness slide:** Include monitoring signals, alert thresholds, runbook actions, backup/restore, access controls, and ownership.

## Redis Technical Evidence

Use concrete artifacts when they support the claim:

- Caching: `GET`, `SET`, `SETEX`, `MGET`, cache-aside flow, TTL strategy, hot key mitigation, cache hit ratio.
- JSON and hashes: `JSON.SET`, `JSON.GET`, `HSET`, key naming, field-level update pattern, document shape.
- Redis Query Engine and vector search: `FT.CREATE`, `FT.SEARCH`, `VECTOR`, `HNSW`, `DIM`, `DISTANCE_METRIC`, KNN syntax, filter syntax.
- Streams: `XADD`, `XREADGROUP`, `XACK`, `XPENDING`, consumer groups, pending entries, idempotent processing, trimming.
- Cluster and replication: 16,384 hash slots, primary/replica roles, client redirection, shard ownership, partial resync, replica lag, failover boundaries.
- Redis Cloud and enterprise deployments: subscription, database, region, VPC/VNet peering, private endpoint, Active-Active, CRDT conflict handling, TLS.
- Observability: `INFO`, `SLOWLOG`, latency monitor, commandstats, memory fragmentation, eviction, keyspace hits/misses, Prometheus/Grafana metrics.

## Speaker Notes Prompts

Add notes for:

- The customer or stakeholder pain this slide addresses.
- Discovery questions to ask before showing the next slide.
- Objections to expect and the answer to give.
- Demo timing, terminal commands, dashboard URLs, or handoff cues.
- Assumptions behind metrics, benchmark conditions, or architecture choices.
- The transition sentence to the next slide.

## Visual Patterns

- Use timelines for migration phases, Streams processing, and incident response.
- Use swimlanes for application, Redis, database, and observability boundaries.
- Use fan-out for pub/sub, replicas, regional reads, or notification delivery.
- Use convergence for aggregation, semantic retrieval, and multi-source enrichment.
- Use grids for option comparisons only when each row drives a decision.
- Use section dividers sparingly to reset the audience around a new question.

## Redis Deck Anti-Patterns

DO NOT:

- Explain Redis as only "an in-memory database" when the requested deck is about a specific workload.
- Use generic icons or boxes without command, data, topology, or operational evidence.
- Hide caveats about eventual consistency, failover windows, memory sizing, replication lag, or hot keys.
- Claim performance improvements without baseline, measurement conditions, or source.
- Make every Redis-owned element bright red. Reserve red for the primary path and important emphasis.
- Put implementation details on executive slides. Move them to notes, appendix, or practitioner sections.

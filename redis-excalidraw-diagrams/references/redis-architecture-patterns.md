# Redis Architecture Diagram Patterns

Use this reference when designing Redis technical diagrams. Verify details against current Redis docs or the user's source material before drawing.

## Current Redis Sources To Check

| Topic | Source |
| --- | --- |
| Redis data types and Streams | `https://redis.io/docs/latest/develop/data-types/streams/` |
| Redis Search and vector search concepts | `https://redis.io/docs/latest/develop/ai/search-and-query/vectors/` |
| Vector search queries | `https://redis.io/docs/latest/develop/ai/search-and-query/query/vector-search/` |
| Redis replication | `https://redis.io/docs/latest/operate/oss_and_stack/management/replication/` |
| Redis Cluster scaling | `https://redis.io/docs/latest/operate/oss_and_stack/management/scaling/` |
| Redis Cluster specification | `https://redis.io/docs/latest/operate/oss_and_stack/reference/cluster-spec/` |
| Redis Software monitoring | `https://redis.io/docs/latest/operate/rs/monitoring/observability/` |
| Redis Enterprise metrics and alerts | `https://redis.io/docs/latest/operate/rs/7.4/clusters/monitoring/` |
| Redis Cloud Active-Active | `https://redis.io/docs/latest/operate/rc/databases/active-active/` |

## Pattern Mapping

| Redis Concept | Recommended Visual Pattern | Evidence To Include |
| --- | --- | --- |
| Cache-aside | Decision diamond plus cycle | `GET`, cache miss, source-of-record fetch, `SET` with TTL |
| Write-through/write-behind | Assembly line | app write, queue/buffer, Redis update, backing store update |
| Vector search/RAG | Query pipeline plus evidence blocks | `FT.CREATE`, vector field config, KNN query, top-k results |
| Redis Search | Filter funnel plus index block | schema fields, `FT.SEARCH`, tags/numeric/text filters |
| Streams | Timeline with consumer swimlanes | `XADD`, entry IDs, `XREADGROUP`, `XACK`, pending entries |
| Pub/Sub | Fan-out | channel, publisher, subscribers, delivery caveat if relevant |
| Replication | Primary-to-replica fan-out | replication offset, partial resync, asynchronous acknowledgement |
| Redis Cluster | Slot map/tree | 16,384 hash slots, masters, replicas, slot ownership, redirection |
| Sentinel failover | State transition timeline | leader election, promotion, client reconnect behavior |
| Active-Active | Multi-region mesh | regional database copies, CRDT conflict resolution, TLS sync |
| Observability | Sidecar/export pipeline | metrics source, Prometheus/Grafana, alerts, commandstats, latency |

## Evidence Examples

### Cache-Aside

```text
GET product:42
MISS -> SELECT ... FROM catalog
SET product:42 <json> EX 300
```

### Vector Search

```text
FT.CREATE idx:docs ON HASH PREFIX 1 docs:
  SCHEMA embedding VECTOR HNSW 10
    TYPE FLOAT32 DIM 1536 DISTANCE_METRIC COSINE
```

```text
FT.SEARCH idx:docs "(*)=>[KNN 5 @embedding $BLOB AS score]"
  PARAMS 2 BLOB <vector_bytes>
  SORTBY score DIALECT 2
```

### Streams

```text
XADD orders * customer_id 42 total 199.95
XREADGROUP GROUP payments worker-1 STREAMS orders >
XACK orders payments 1714400000000-0
```

### Cluster

```text
CLUSTER SLOTS
0..5460      shard-a primary + replica
5461..10922  shard-b primary + replica
10923..16383 shard-c primary + replica
```

## Review Checklist

- Is every Redis command, metric, or product term accurate for the target Redis version or deployment model?
- Does the diagram distinguish Redis Open Source, Redis Software, Redis Cloud, and Redis Enterprise for Kubernetes when relevant?
- Are topology boundaries explicit: application, network, Redis database, shard, node, cluster, region, and observability stack?
- Are consistency and failure-mode caveats visible where they matter?
- Are hot paths, slow paths, and background synchronization visually distinct?

# Signal Selection Reference

Decision tables, structured logging examples, Redis metric catalog, and alerting
rule templates for the observability-and-instrumentation skill.

## Signal Type Selection

Use this table to pick the right telemetry signal for each on-call question.

| Question shape | Primary signal | Secondary signal | Example |
|---|---|---|---|
| "Is it broken?" | Metric (error rate) | Log (error detail) | 5xx rate > 1% triggers page |
| "How fast is it?" | Metric (latency percentile) | Trace (span breakdown) | p99 > 500ms triggers ticket |
| "Where is the bottleneck?" | Trace (span waterfall) | Metric (per-service latency) | Database span dominates trace |
| "Why did it fail?" | Log (structured error event) | Trace (error span) | JSON log with stack, request context |
| "Is capacity sufficient?" | Metric (USE: utilization) | Log (saturation events) | Connection pool at 90% capacity |
| "Are consumers keeping up?" | Metric (queue depth, lag) | Trace (consumer span) | Consumer lag growing over time |
| "Did the deploy break anything?" | Metric (before/after comparison) | Log (new error patterns) | Error rate delta after deploy |

**Rule of thumb**: start with metrics for detection, traces for localization, logs
for root-cause detail. Never rely on a single signal type alone.

## Log Level Reference

| Level | When to use | Production default | Example |
|---|---|---|---|
| ERROR | Operation failed, requires attention | Always on | Database connection refused, payment failed |
| WARN | Degradation or unusual condition, not yet a failure | Always on | Retry succeeded after timeout, cache miss rate high |
| INFO | State change or significant business event | Always on | Service started, request completed, config reloaded |
| DEBUG | Diagnostic detail for troubleshooting | Off by default | SQL query text, parsed request body, cache key computed |
| TRACE | Extremely verbose, framework internals | Off by default | Middleware chain entry/exit, byte-level protocol decode |

**Rules**:
- Enable DEBUG per-service at runtime without restart (feature flag or config reload).
- Never log at ERROR for expected conditions (404 for missing resources is not an error).
- Never log at INFO on every request in a high-throughput path -- sample or use metrics.

## Structured Logging Examples

### Python (structlog)

```python
import structlog

log = structlog.get_logger()

# Request lifecycle
log.info("request.completed",
    method="POST",
    path="/api/orders",
    status=201,
    duration_ms=42,
    trace_id=request.trace_id,
    user_id=request.user_id)

# Error with context
log.error("payment.failed",
    order_id=order.id,
    provider="stripe",
    error_code="card_declined",
    trace_id=request.trace_id,
    duration_ms=320)
```

### Node.js (pino)

```javascript
const pino = require('pino');
const log = pino({ level: 'info' });

// Request lifecycle
log.info({
  event: 'request.completed',
  method: 'POST',
  path: '/api/orders',
  status: 201,
  duration_ms: 42,
  trace_id: req.traceId,
  user_id: req.userId
});

// Error with context
log.error({
  event: 'payment.failed',
  order_id: order.id,
  provider: 'stripe',
  error_code: 'card_declined',
  trace_id: req.traceId,
  duration_ms: 320
});
```

### Go (slog)

```go
import "log/slog"

// Request lifecycle
slog.Info("request.completed",
    "method", "POST",
    "path", "/api/orders",
    "status", 201,
    "duration_ms", 42,
    "trace_id", traceID,
    "user_id", userID)

// Error with context
slog.Error("payment.failed",
    "order_id", order.ID,
    "provider", "stripe",
    "error_code", "card_declined",
    "trace_id", traceID,
    "duration_ms", 320)
```

### Java (SLF4J + Logback with structured arguments)

```java
import static net.logstash.logback.argument.StructuredArguments.kv;

// Request lifecycle
logger.info("request.completed",
    kv("method", "POST"),
    kv("path", "/api/orders"),
    kv("status", 201),
    kv("duration_ms", 42),
    kv("trace_id", traceId),
    kv("user_id", userId));

// Error with context
logger.error("payment.failed",
    kv("order_id", orderId),
    kv("provider", "stripe"),
    kv("error_code", "card_declined"),
    kv("trace_id", traceId),
    kv("duration_ms", 320));
```

## Redis-Specific Metric Catalog

### Connection Metrics

| Metric | Source | Type | Alert threshold |
|---|---|---|---|
| `redis_connected_clients` | `INFO clients` | Gauge | > 80% of `maxclients` |
| `redis_rejected_connections_total` | `INFO stats` | Counter | Any increase |
| `redis_blocked_clients` | `INFO clients` | Gauge | Sustained > 0 outside expected BRPOP usage |

### Memory Metrics

| Metric | Source | Type | Alert threshold |
|---|---|---|---|
| `redis_memory_used_bytes` | `INFO memory` | Gauge | > 80% of `maxmemory` |
| `redis_memory_used_rss_bytes` | `INFO memory` | Gauge | RSS > 1.5x used_memory (fragmentation) |
| `redis_mem_fragmentation_ratio` | `INFO memory` | Gauge | > 1.5 or < 1.0 |
| `redis_evicted_keys_total` | `INFO stats` | Counter | Any increase when unexpected |

### Performance Metrics

| Metric | Source | Type | Alert threshold |
|---|---|---|---|
| `redis_commands_processed_total` | `INFO stats` | Counter | Rate drop > 50% from baseline |
| `redis_instantaneous_ops_per_sec` | `INFO stats` | Gauge | Drop > 50% from baseline |
| `redis_slowlog_length` | `SLOWLOG LEN` | Gauge | Increasing trend |
| `redis_latest_slowlog_duration_us` | `SLOWLOG GET` | Gauge | > 10000 (10ms) |
| `redis_keyspace_hits_total` | `INFO stats` | Counter | -- |
| `redis_keyspace_misses_total` | `INFO stats` | Counter | -- |
| `redis_hit_ratio` | Computed | Gauge | < 0.90 for cache workloads |

### Replication Metrics

| Metric | Source | Type | Alert threshold |
|---|---|---|---|
| `redis_connected_slaves` | `INFO replication` | Gauge | < expected count |
| `redis_replication_offset_diff` | `INFO replication` | Gauge | Growing lag between master and replica |
| `redis_master_link_status` | `INFO replication` | Gauge | Value != "up" |

### Persistence Metrics

| Metric | Source | Type | Alert threshold |
|---|---|---|---|
| `redis_rdb_last_bgsave_status` | `INFO persistence` | Gauge | Value != "ok" |
| `redis_rdb_last_bgsave_duration_sec` | `INFO persistence` | Gauge | Increasing trend |
| `redis_aof_last_rewrite_status` | `INFO persistence` | Gauge | Value != "ok" |
| `redis_aof_last_write_status` | `INFO persistence` | Gauge | Value != "ok" |

## Alerting Rule Templates

### Prometheus/Alertmanager: Error Rate (Page)

```yaml
groups:
  - name: service-symptoms
    rules:
      - alert: HighErrorRate
        expr: |
          sum(rate(http_requests_total{status=~"5.."}[5m]))
          / sum(rate(http_requests_total[5m])) > 0.01
        for: 5m
        labels:
          severity: page
        annotations:
          summary: "Error rate above 1% for 5 minutes"
          runbook: "https://runbooks.internal/high-error-rate"
          dashboard: "https://grafana.internal/d/service-overview"
```

### Prometheus/Alertmanager: Latency (Ticket)

```yaml
      - alert: HighP99Latency
        expr: |
          histogram_quantile(0.99, sum(rate(http_request_duration_seconds_bucket[5m]))
          by (le, service)) > 0.5
        for: 15m
        labels:
          severity: ticket
        annotations:
          summary: "P99 latency above 500ms for 15 minutes"
          runbook: "https://runbooks.internal/high-latency"
          dashboard: "https://grafana.internal/d/service-latency"
```

### Prometheus/Alertmanager: Redis Memory (Page)

```yaml
      - alert: RedisMemoryHigh
        expr: |
          redis_memory_used_bytes / redis_memory_max_bytes > 0.85
        for: 10m
        labels:
          severity: page
        annotations:
          summary: "Redis memory usage above 85% of maxmemory"
          runbook: "https://runbooks.internal/redis-memory-pressure"
          dashboard: "https://grafana.internal/d/redis-overview"
```

### Prometheus/Alertmanager: Redis Rejected Connections (Page)

```yaml
      - alert: RedisRejectedConnections
        expr: |
          increase(redis_rejected_connections_total[5m]) > 0
        for: 1m
        labels:
          severity: page
        annotations:
          summary: "Redis rejecting connections -- maxclients likely reached"
          runbook: "https://runbooks.internal/redis-connection-limit"
          dashboard: "https://grafana.internal/d/redis-connections"
```

### Prometheus/Alertmanager: Redis Cache Hit Ratio (Ticket)

```yaml
      - alert: RedisCacheHitRatioLow
        expr: |
          redis_keyspace_hits_total
          / (redis_keyspace_hits_total + redis_keyspace_misses_total) < 0.90
        for: 30m
        labels:
          severity: ticket
        annotations:
          summary: "Redis cache hit ratio below 90% for 30 minutes"
          runbook: "https://runbooks.internal/redis-cache-miss"
          dashboard: "https://grafana.internal/d/redis-cache"
```

### Prometheus/Alertmanager: Redis Replication Lag (Page)

```yaml
      - alert: RedisReplicationLag
        expr: |
          redis_replication_offset_diff > 10000
        for: 5m
        labels:
          severity: page
        annotations:
          summary: "Redis replica lagging behind master"
          runbook: "https://runbooks.internal/redis-replication-lag"
          dashboard: "https://grafana.internal/d/redis-replication"
```

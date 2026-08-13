# Observability Checklist

Structured logging, metrics, alerting, and on-call readiness for production services.

## On-Call Questions (answer before shipping)

- [ ] How do I know this service is healthy right now?
- [ ] What does the happy-path request flow look like in traces?
- [ ] What are the top 3 failure modes and how do I detect each?
- [ ] Where do I look first when paged at 3 AM?
- [ ] How do I safely roll back this change?
- [ ] What is the blast radius if this component fails completely?

## Structured Logging

- [ ] Logs are structured (JSON or key=value), not free-form text
- [ ] Every log line includes: timestamp, level, service name, trace ID, message
- [ ] Request logs include: method, path, status code, duration, user/tenant ID
- [ ] Log levels are used consistently: ERROR for failures, WARN for degradation, INFO for state changes, DEBUG for diagnostics
- [ ] DEBUG logs are off by default in production and can be enabled per-service without restart
- [ ] No sensitive data in logs (passwords, tokens, PII) -- see security checklist
- [ ] Log volume is estimated and budgeted; high-frequency paths use sampling
- [ ] Correlation IDs propagate across service boundaries

## RED Metrics (Request-oriented)

For every service endpoint:

- [ ] **Rate** -- requests per second, broken down by endpoint and status class
- [ ] **Errors** -- error count and error rate (5xx, timeouts, circuit-breaker trips)
- [ ] **Duration** -- latency histograms at p50, p95, p99 (not just averages)

## USE Metrics (Resource-oriented)

For every critical resource (CPU, memory, disk, network, connection pools):

- [ ] **Utilization** -- percentage of capacity in use
- [ ] **Saturation** -- queue depth, backpressure indicators, pending work
- [ ] **Errors** -- hardware/resource errors, OOM kills, disk failures

## Distributed Tracing

- [ ] All inter-service calls propagate trace context (W3C Trace Context or B3)
- [ ] Traces include service name, operation name, status, and duration
- [ ] Database and cache calls are instrumented as child spans
- [ ] Sampling rate is documented and adjustable without deploy
- [ ] Error spans include enough context to reproduce the issue

## Alerting

- [ ] Alerts fire on symptoms (user impact), not causes (CPU spikes)
- [ ] Every alert has a runbook link in the annotation
- [ ] Alerts use multi-window, multi-burn-rate SLO-based rules where possible
- [ ] Warning alerts notify a channel; critical alerts page on-call
- [ ] Flapping alerts are fixed or suppressed -- no alert fatigue
- [ ] Each alert has been tested: simulate the failure, confirm the alert fires

### Alert Hygiene

- [ ] Alerts are reviewed quarterly; unused alerts are deleted
- [ ] On-call handoff includes recent alert trends and known noisy alerts
- [ ] Mean time to acknowledge (MTTA) and resolve (MTTR) are tracked

## Dashboards

- [ ] A service overview dashboard exists with RED metrics and error budget
- [ ] Dashboards load in under 5 seconds (no unbounded queries)
- [ ] Dashboard time range defaults to last 1 hour with drill-down available
- [ ] Key business metrics are visible alongside technical metrics

## Redis-Specific Observability

### Prometheus Metrics via redis_exporter

- [ ] `redis_exporter` is deployed alongside every Redis instance
- [ ] Key metrics are collected: `redis_connected_clients`, `redis_used_memory_bytes`, `redis_commands_processed_total`, `redis_keyspace_hits_total`, `redis_keyspace_misses_total`
- [ ] Hit rate is tracked: `hits / (hits + misses)` with alert on sustained drop
- [ ] Memory fragmentation ratio is monitored (`redis_mem_fragmentation_ratio`)
- [ ] Eviction count is alerted on (`redis_evicted_keys_total > 0` when unexpected)
- [ ] Replication lag is monitored for replica instances

### SLOWLOG Monitoring

- [ ] `SLOWLOG` threshold is configured (e.g., `slowlog-log-slower-than 10000` for 10ms)
- [ ] `SLOWLOG GET` is polled periodically and ingested into the logging pipeline
- [ ] Alerts fire when slow command rate exceeds baseline by 2x
- [ ] Top slow commands are reviewed weekly and optimized

### INFO Stats

- [ ] `INFO ALL` is collected at regular intervals (30s-60s) for trend analysis
- [ ] `connected_clients` is tracked against `maxclients` with alert at 80%
- [ ] `used_memory` is tracked against `maxmemory` with alert at 85%
- [ ] `instantaneous_ops_per_sec` is baselined and anomaly-detected
- [ ] `rejected_connections` triggers an immediate alert
- [ ] `rdb_last_bgsave_status` and `aof_last_bgrewrite_status` are monitored

### Keyspace and Notifications

- [ ] Key count per database is tracked for unexpected growth
- [ ] Large key detection runs periodically (`redis-cli --bigkeys` or `MEMORY USAGE` sampling)
- [ ] Keyspace notifications are enabled only for required events (not `KEA` blanket)
- [ ] Notification consumers have their own monitoring (lag, error rate)

### Production MONITOR Alternatives

- [ ] `MONITOR` is never left running in production (100% throughput overhead)
- [ ] For command auditing, use `SLOWLOG` + `redis_exporter` command stats
- [ ] For debugging, use `MONITOR` only in staging or for time-limited sampling (< 60s)
- [ ] `redis_commands_total` by command type replaces continuous `MONITOR` for traffic analysis
- [ ] ACL LOG is reviewed for unauthorized command attempts

### Connection Pool Health

- [ ] Pool size, active connections, and wait time are instrumented as application metrics
- [ ] Connection churn (create/destroy rate) is monitored
- [ ] Idle connection timeout matches Redis server `timeout` configuration
- [ ] Pool exhaustion triggers an alert before requests start failing

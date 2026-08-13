---
name: observability-and-instrumentation
description: Instrument code so production behavior is visible and diagnosable. Use when adding logging, metrics, tracing, or alerting. Use when shipping any feature that runs in production and you need evidence it works. Enforces "define working before instrumenting" and symptom-based alerting.
license: MIT
metadata:
  author: redis
  version: "1.0.0"
---

# Observability and Instrumentation

Telemetry without a question is noise. Define what "working" means before adding
any instrumentation. Every metric, log line, and span must answer an on-call
question or it does not ship.

## When to Use

- Adding logging, metrics, tracing, or alerting to new or existing code.
- Shipping any feature that runs in production and you need evidence it works.
- Investigating production issues where current telemetry is insufficient.

## The Process

### 1. Define "working"

Write 2-4 on-call questions this feature must answer. Examples: "Is this
endpoint returning errors?" "Are queue consumers keeping up?" "Which downstream
dependency is slow?" These questions drive every instrumentation decision.

### 2. Pick signal type

Load [signal-selection](references/signal-selection.md) for the decision table.
- **Metrics** tell you *that* something is wrong (rates, counts, gauges).
- **Traces** tell you *where* it is wrong (request path, latency breakdown).
- **Logs** tell you *why* it is wrong (context, payloads, error details).

### 3. Structured logging

Emit JSON events, not prose. Every log line includes: timestamp, level, service,
trace_id, message. Add request context: method, path, status, duration.
Propagate correlation IDs across service boundaries. Never log secrets, tokens,
PII, or full request bodies. Budget log volume; sample high-frequency paths.

### 4. Metrics

Use **RED** for request-driven services: Rate, Errors, Duration. Use **USE** for
resources: Utilization, Saturation, Errors. Report percentiles (p50, p95, p99)
always; averages never -- they hide tail latency. Derive cardinality from small
fixed sets only (status codes, endpoint names). Never use unbounded user IDs or
request IDs as label values.

### 5. Distributed tracing

Use OpenTelemetry. Auto-instrument frameworks and HTTP clients first. Add manual
spans only for meaningful internal work (database queries, cache lookups,
business-logic stages). Propagate trace context across all service boundaries.
Set span attributes that answer your on-call questions from step 1.

### 6. Alerting

Alert on symptoms (error rate, latency percentile), not causes (CPU%, disk%).
Two severities only:
- **Page**: act now, customer-facing impact, auto-resolves when fixed.
- **Ticket**: act this week, degradation trend, no wake-up.

Every alert links to a runbook. Every runbook starts with "verify the alert is
real" and ends with "escalation path." Delete alerts nobody investigates.

### 7. Verify telemetry

Induce failures in staging: kill a dependency, inject latency, return errors.
Locate the failure using telemetry alone -- no code reading, no SSH. If you
cannot find it, the instrumentation is insufficient. Fix and repeat.

## Redis-Specific Instrumentation

- Use `redis_exporter` for Prometheus metrics from Redis instances.
- Monitor `SLOWLOG` for commands exceeding latency thresholds.
- Track `INFO` stats: `connected_clients`, `used_memory`, `used_memory_rss`,
  `keyspace_hits`, `keyspace_misses`, `rejected_connections`, `evicted_keys`.
- Compute hit ratio: `keyspace_hits / (keyspace_hits + keyspace_misses)`.
- Observe keyspace notifications for expiry and eviction events.
- Never run `MONITOR` in production -- it doubles server load and logs every
  command including arguments. Use it only in dev/staging for short debugging.

## Common Rationalizations

| You hear | The problem |
|---|---|
| "We can add observability later" | You ship blind and debug blind |
| "Logs are enough" | Logs alone cannot answer rate or latency questions |
| "We alert on everything" | Alert fatigue means you ignore real pages |
| "Averages look fine" | P99 is 10x worse than p50 and you cannot see it |
| "We will just SSH in" | You cannot SSH into a container at 3 AM under load |
| "Cardinality does not matter" | Unbounded labels crash your metrics backend |
| "We do not need tracing" | You cannot diagnose cross-service latency without it |

## Red Flags

- No structured logging -- free-form text that cannot be queried.
- Metrics with unbounded label cardinality (user IDs, UUIDs).
- Alerts on causes (CPU > 80%) instead of symptoms (error rate > 1%).
- Alert without a runbook link.
- No correlation ID propagation across service boundaries.
- `MONITOR` running in a production Redis instance.
- Logging secrets, tokens, or PII.

## Verification

- [ ] 2-4 on-call questions defined and each answered by at least one signal.
- [ ] Structured logs emit JSON with trace_id, level, service, timestamp.
- [ ] Metrics use RED or USE; percentiles reported, no averages as thresholds.
- [ ] Metric labels are bounded (no user IDs, UUIDs, or dynamic paths).
- [ ] Traces propagate context across all service boundaries.
- [ ] Alerts are symptom-based with two severities and runbook links.
- [ ] Induced failure in staging located via telemetry alone.
- [ ] Cross-check against shared [observability-checklist](../../references/observability-checklist.md).

## DO NOT

- Do not add telemetry without an on-call question it answers.
- Do not use averages as alerting thresholds -- use percentiles.
- Do not create more than two alert severities.
- Do not alert on causes when a symptom-based alert is possible.
- Do not log secrets, tokens, PII, or full request/response bodies.
- Do not use `MONITOR` in production Redis instances.
- Do not use unbounded values as metric labels.

## Interaction

This skill complements `performance-optimization` -- instrument first to measure,
then optimize what the data shows is slow. Cross-check every instrumented feature
against the shared [observability-checklist](../../references/observability-checklist.md).

---
name: performance-optimization
description: Measure-first performance optimization. Use when performance requirements exist, you suspect regressions, or optimizing latency-sensitive Redis operations. Enforces baseline measurement, bottleneck identification, targeted fix, and re-measurement with "neutral is a revert" policy.
license: MIT
metadata:
  author: redis
  version: "1.0.0"
---

# Performance Optimization

Optimization without measurement is guessing. Measure first, change one thing,
re-measure, keep or revert. Every optimization attempt is logged in the
Performance Attempt Ledger so failed ideas are never re-tried.

Load [perf-patterns](references/perf-patterns.md) for the diagnostic decision
tree, ledger template, Redis measurement commands, and anti-pattern catalog.

## When to Use

- Performance requirements or SLOs exist for the target code path.
- A regression is suspected or reported.
- Optimizing latency-sensitive Redis operations (queries, pipelines, cluster hops).
- Profiling data shows a hot path worth investigating.

## When NOT to Use

- Code has not been profiled yet — profile first, then invoke this skill.
- Premature optimization of cold paths with no measured problem.
- Cosmetic refactors disguised as performance work.

## The Optimization Cycle

### 1. MEASURE — Establish Baseline

Record numbers before touching anything. Use real-world data where possible;
fall back to synthetic benchmarks when RUM is unavailable. Document:
environment, dataset size, p50/p95/p99, throughput, and tool used.

### 2. IDENTIFY — Find the Actual Bottleneck

Walk the diagnostic decision tree in [perf-patterns](references/perf-patterns.md).
Instrument, do not guess. Common categories: CPU-bound, I/O-bound, memory
pressure, network round-trips, lock contention. Pin the single largest
contributor before writing any fix.

### 3. FIX — Address One Bottleneck

Change exactly one thing. Keep the diff minimal and reviewable. If the fix
requires multiple coordinated changes, stage them as one atomic commit so the
verify step measures them together.

### 4. VERIFY — Re-measure and Decide

Re-measure using the identical method, dataset, and environment as step 1.
Apply the keep-or-revert decision table:

| Result vs Baseline       | Tests | Verdict    |
|--------------------------|-------|------------|
| Past improvement threshold | Green | **Keep**   |
| Within noise floor       | Green | **REVERT** |
| Worse                    | Green | **REVERT** |
| Improved                 | Red   | **REVERT** |

### 5. GUARD — Prevent Regression

Add a benchmark test, performance budget, or monitoring alert that fires if
the metric regresses past the improvement threshold.

## "Neutral Is a Revert"

If a change does not measurably improve the target metric, revert it regardless
of effort invested. This is an explicit sunk-cost defense. Code that adds
complexity without measurable gain makes the system harder to maintain for zero
benefit. Log the attempt in the ledger and move on.

## Performance Attempt Ledger

Log every attempt — including reverted ones — to prevent re-trying failed ideas.

| Idea | Baseline → Result | Verdict | Why |
|------|-------------------|---------|-----|
| _example: batch MGET_ | _p95 12ms → 8ms_ | _Keep_ | _33% improvement_ |

## Redis-Specific Measurement

- `redis-benchmark -t get,set -n 100000 -q` — synthetic throughput baseline.
- `SLOWLOG GET 10` — identify commands exceeding the slowlog threshold.
- `LATENCY HISTORY <event>` — track latency spikes over time.
- `INFO commandstats` — per-command call count and cumulative microseconds.
- Pipeline vs single-command: measure round-trip savings with `MULTI`/pipeline.
- Connection pooling: compare pool-hit latency vs new-connection latency.
- Cluster vs standalone: measure cross-slot redirect overhead with `CLUSTER INFO`.

## Common Rationalizations (Reject All)

1. "We already wrote it, may as well keep it" → Sunk cost. Revert.
2. "It's only a little slower" → Slower with no upside is still worse. Revert.
3. "It'll help eventually" → Speculative benefit is not measured benefit. Revert.
4. "The benchmark is too noisy to tell" → Fix the benchmark, do not ship uncertainty.
5. "It's more elegant" → Elegance is not a performance metric. Revert.
6. "Nobody will notice" → If nobody notices, the change has no value. Revert.
7. "It optimizes a different metric" → Optimize the metric you set out to improve.
8. "We can tune it later" → Ship measured wins now, not future promises.

## Red Flags

- Optimizing without a baseline measurement.
- Multiple changes measured as a single batch (cannot attribute improvement).
- Keeping a change that is within the noise floor.
- No regression guard added after a verified improvement.
- Re-trying an idea already logged as failed in the ledger.

## Verification Checklist

- [ ] Baseline recorded before any code change.
- [ ] Single bottleneck identified with instrumentation, not intuition.
- [ ] Exactly one change per measurement cycle.
- [ ] Re-measurement uses identical method, data, and environment.
- [ ] Decision table applied honestly (neutral = revert).
- [ ] Attempt logged in Performance Attempt Ledger.
- [ ] Regression guard added for kept improvements.

## DO NOT

- Optimize without measuring first.
- Keep changes that show no measurable improvement.
- Batch multiple fixes into one measurement cycle.
- Skip the ledger entry for reverted attempts.
- Use microbenchmarks to justify macro-level architecture changes.

## Interaction with Other Skills

- `code-review` — reviewer checks that perf claims cite ledger entries.
- `verification-before-completion` — perf verification is part of done criteria.
- `redis-observability` — use its dashboards for production measurement.
- `systematic-debugging` — when a perf regression is also a functional bug.

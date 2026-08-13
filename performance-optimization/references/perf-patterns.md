# Performance Patterns Reference

## Performance Attempt Ledger Template

Copy this table into the project or PR description. Log every attempt, including
reverted ones. The ledger prevents re-trying ideas that already failed.

```markdown
## Performance Attempt Ledger

| # | Idea | Metric | Baseline | Result | Delta | Verdict | Why |
|---|------|--------|----------|--------|-------|---------|-----|
| 1 | _describe change_ | _p95 latency_ | _12ms_ | _8ms_ | _-33%_ | _Keep_ | _past threshold_ |
| 2 | _describe change_ | _p95 latency_ | _12ms_ | _11.8ms_ | _-1.7%_ | _Revert_ | _within noise_ |
```

### Ledger Rules

- Assign a sequential number to every attempt.
- Record the exact metric name and measurement tool.
- Record baseline and result using the same method and environment.
- "Within noise" means the delta is smaller than the benchmark's coefficient of
  variation (typically 2-5% for microbenchmarks, 5-15% for integration tests).
- Never delete a reverted entry. Future contributors must see what was tried.

## Diagnostic Decision Tree

Start here when something is slow. Follow the branch that matches.

```
What is slow?
├── First load / cold start
│   ├── Large bundle? → Measure bundle size, split, lazy-load
│   ├── Slow DNS / TLS? → Measure with curl timing breakdown
│   └── Cold cache? → Pre-warm, measure cache-hit vs cache-miss
│
├── User interaction / UI response
│   ├── Main thread blocked? → Profile with DevTools / py-spy / perf
│   ├── Layout thrashing? → Batch DOM reads/writes
│   └── Expensive re-render? → Profile component render time
│
├── API / backend response
│   ├── Slow query? → Check EXPLAIN plan, add index, measure
│   ├── N+1 pattern? → Batch into single query, measure round-trips
│   ├── Serialization cost? → Profile ser/de, try binary format
│   └── Network hops? → Trace request path, measure each hop
│
└── Redis query
    ├── Large key scan? → Check OBJECT ENCODING, key size, use SCAN
    ├── Missing index (Search)? → FT.PROFILE, check query plan
    ├── Cross-slot in cluster? → Check CLUSTER KEYSLOT, use hash tags
    ├── Too many round-trips? → Pipeline or MULTI/EXEC
    ├── Lua script overhead? → Profile with EVALSHA, compare to pipeline
    └── Connection churn? → Measure pool vs new-connection latency
```

## Redis-Specific Measurement Commands

### Throughput Baseline

```bash
# Synthetic throughput for GET and SET
redis-benchmark -t get,set -n 100000 -q

# Pipeline throughput (16 commands per pipeline)
redis-benchmark -t get -n 100000 -P 16 -q

# Cluster mode with hash tag
redis-benchmark -t get,set -n 100000 -q --cluster
```

### Slow Command Detection

```bash
# Show 10 slowest commands (threshold set by slowlog-log-slower-than)
redis-cli SLOWLOG GET 10

# Reset slowlog after baseline capture
redis-cli SLOWLOG RESET

# Show current threshold (microseconds)
redis-cli CONFIG GET slowlog-log-slower-than
```

### Latency Diagnostics

```bash
# Continuous latency sampling (Ctrl+C to stop)
redis-cli --latency

# Latency history for a specific event type
redis-cli LATENCY HISTORY command

# Full latency report
redis-cli LATENCY LATEST

# Intrinsic latency test (measures system, not Redis)
redis-cli --intrinsic-latency 10
```

### Per-Command Statistics

```bash
# Show call count and cumulative microseconds per command
redis-cli INFO commandstats

# Example output:
# cmdstat_get:calls=1000,usec=2500,usec_per_call=2.50
# cmdstat_set:calls=500,usec=1800,usec_per_call=3.60
```

### Memory and Key Analysis

```bash
# Memory usage of a specific key (bytes)
redis-cli MEMORY USAGE mykey

# Key encoding and size
redis-cli OBJECT ENCODING mykey
redis-cli OBJECT FREQ mykey

# Overall memory stats
redis-cli INFO memory
```

### Search / Query Engine Profiling

```bash
# Profile a RediSearch query (shows parsing, execution, scoring times)
redis-cli FT.PROFILE myindex SEARCH QUERY "@field:{value}"

# Explain query plan without executing
redis-cli FT.EXPLAINCLI myindex "@field:{value}"
```

### Connection and Pool Measurement

```bash
# Current connection count and stats
redis-cli INFO clients

# Connected clients detail
redis-cli CLIENT LIST

# Monitor connection events (use briefly, high overhead)
redis-cli MONITOR
# Ctrl+C after a few seconds — never leave MONITOR running in production
```

## Anti-Pattern Catalog

### 1. Optimize-then-Measure

**Pattern**: Write optimized code first, then benchmark to prove it helped.
**Problem**: Confirmation bias. You will find a benchmark that shows improvement.
**Fix**: Always measure the unmodified code first. Record the baseline in the ledger.

### 2. Benchmarking in a Different Environment

**Pattern**: Benchmark on a developer laptop, deploy to a 4-core container.
**Problem**: CPU count, memory, network, and disk characteristics differ.
**Fix**: Run benchmarks in the same environment (or as close as possible) to production.

### 3. Averaging Away Outliers

**Pattern**: Report mean latency, ignore p99.
**Problem**: The mean hides tail latency that real users experience.
**Fix**: Always report p50, p95, and p99. Optimize the percentile that matters for your SLO.

### 4. The Mega-Optimization PR

**Pattern**: Bundle 5 optimizations into one PR and measure the aggregate.
**Problem**: Cannot attribute improvement to any single change. Cannot revert one bad change.
**Fix**: One optimization per measurement cycle. One commit. One ledger entry.

### 5. KEYS in Production

**Pattern**: Use `KEYS *` or `KEYS pattern*` to find keys.
**Problem**: O(N) scan blocks the Redis server for the entire keyspace.
**Fix**: Use `SCAN` with a cursor and COUNT hint. Never use `KEYS` outside development.

### 6. Unbounded LRANGE / SMEMBERS

**Pattern**: Fetch an entire list or set without knowing its size.
**Problem**: A collection that grew to millions of elements returns megabytes of data.
**Fix**: Check `LLEN` / `SCARD` first. Paginate with `LRANGE start stop` or `SSCAN`.

### 7. Missing Pipeline

**Pattern**: Send 100 sequential commands, each waiting for a response.
**Problem**: 100 network round-trips instead of 1.
**Fix**: Batch into a pipeline. Measure the round-trip savings.

### 8. MONITOR in Production

**Pattern**: Leave `MONITOR` running to debug a production issue.
**Problem**: MONITOR duplicates every command to the monitoring client, halving throughput.
**Fix**: Use MONITOR for at most a few seconds. Prefer SLOWLOG and commandstats for ongoing analysis.

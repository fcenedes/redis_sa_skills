# Definition of Done

Standing quality bar every change must clear before it ships.

## Correctness

- [ ] Code compiles/parses without errors in all target languages
- [ ] All existing tests pass (no regressions)
- [ ] New behavior has corresponding tests at the appropriate pyramid level
- [ ] Edge cases are handled: empty inputs, nulls, boundary values, timeouts
- [ ] Error paths return meaningful messages, not raw stack traces
- [ ] Concurrent/async behavior is safe: no races, no unguarded shared state
- [ ] Backwards compatibility is preserved, or breaking changes are documented

### Redis-Specific Correctness

- [ ] Redis connections are properly closed/returned to pool on all code paths (including errors)
- [ ] Key naming conventions follow the agreed `{prefix}:{entity}:{id}` pattern
- [ ] TTL is set on every key that is not permanent by design
- [ ] Eviction policy implications are documented for new key families
- [ ] Pipeline/multi-exec transactions are used where atomicity is required
- [ ] SCAN is used instead of KEYS for any iteration over keyspaces
- [ ] Lua scripts are idempotent when retried after NOSCRIPT errors

## Quality

- [ ] No new linter warnings or static-analysis findings
- [ ] No TODO/FIXME/HACK left without a linked issue or expiration date
- [ ] Functions/methods are under 40 lines; files are under 400 lines
- [ ] Public APIs have clear type signatures (or equivalent: docstrings, schemas)
- [ ] Magic numbers and strings are named constants
- [ ] Duplication is extracted only when three or more instances exist (Rule of Three)
- [ ] Naming is intention-revealing: verbs for functions, nouns for variables, predicates for booleans

## Integration

- [ ] CI pipeline passes: lint, test, build, security scan
- [ ] Feature flags or environment gates are in place for incomplete features
- [ ] Database/schema migrations are reversible or have a documented rollback plan
- [ ] API contracts (OpenAPI, protobuf, GraphQL) are updated if endpoints changed
- [ ] Dependent services are notified of contract changes before merge

### Redis-Specific Integration

- [ ] Redis version compatibility is documented (minimum required version)
- [ ] Module dependencies (RediSearch, RedisJSON, RedisTimeSeries) are declared
- [ ] Cluster-mode compatibility is verified (no cross-slot operations without hash tags)
- [ ] Sentinel/failover behavior is tested or documented
- [ ] Connection string configuration supports both standalone and cluster topologies

## Documentation

- [ ] Public functions/classes have docstrings or equivalent
- [ ] README or relevant docs are updated for user-facing changes
- [ ] Architecture decisions are captured in ADRs when trade-offs exist
- [ ] Runbook is updated if operational behavior changed
- [ ] CHANGELOG entry is added for user-visible changes

### Redis-Specific Documentation

- [ ] Key schema is documented: name pattern, data type, TTL, size estimate
- [ ] Memory impact estimate is included for new key families at expected scale
- [ ] Pub/Sub channel or Stream consumer group naming is documented

## Ship-Readiness

- [ ] Code is reviewed and approved by at least one peer
- [ ] No secrets, credentials, or PII in the diff
- [ ] Monitoring and alerting cover the new code path
- [ ] Rollback plan exists and is documented
- [ ] Performance impact is measured or estimated for hot paths
- [ ] Feature is demo-able to a stakeholder in its current state
- [ ] The change is the smallest shippable unit -- no unrelated changes bundled

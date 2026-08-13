# Migration Patterns Reference

## Expand/Contract Worked Example: Column Rename

Rename column `user_name` to `display_name` in a production database without
downtime.

### Step 1: Expand — Add New Column

```sql
ALTER TABLE users ADD COLUMN display_name VARCHAR(255);
```

Deploy. Verify the column exists. No application changes yet.

### Step 2: Dual-Write

Update application code to write to both columns on every insert and update:

```python
user.user_name = value
user.display_name = value  # dual-write
```

Deploy. Verify both columns receive identical data on new writes.

### Step 3: Backfill

Copy existing data from old column to new column:

```sql
UPDATE users SET display_name = user_name WHERE display_name IS NULL;
```

Run in batches to avoid long locks. Verify row counts match:

```sql
SELECT COUNT(*) FROM users WHERE display_name IS NULL AND user_name IS NOT NULL;
-- Must return 0
```

### Step 4: Cut Over Reads

Switch all read queries to use `display_name`. Keep dual-write active.

Deploy. Monitor for errors. Verify no query references `user_name` in
application logs.

### Step 5: Contract — Drop Old Column

```sql
ALTER TABLE users DROP COLUMN user_name;
```

Remove dual-write code. Deploy. This step happens in a **separate deploy** from
Step 1. Never combine expand and contract.

**Timeline**: Each step is a separate deploy with at least one successful
validation cycle between them. Minimum 5 deploys for a column rename.

---

## Strangler Pattern Sequence

Replace a legacy service with a new implementation incrementally.

### Phase 1: Intercept

Place a router/proxy in front of the legacy service. All traffic flows through
the proxy to the legacy service unchanged.

```
Client → Proxy → Legacy Service
```

### Phase 2: Parallel Implementation

Build the new service behind the proxy. Route a small percentage of traffic
(start with 1-5%) to the new service. Shadow-test by sending traffic to both
and comparing responses.

```
Client → Proxy → Legacy Service (95%)
               → New Service (5%, shadow)
```

### Phase 3: Incremental Shift

Increase traffic to the new service as confidence grows. Monitor error rates,
latency, and correctness at each step.

```
Milestones: 5% → 10% → 25% → 50% → 75% → 100%
```

Roll back to the previous percentage if any metric degrades.

### Phase 4: Decommission

When 100% of traffic flows through the new service and the legacy service has
been idle for at least one full business cycle (typically 30 days), decommission
the legacy service.

Remove the proxy routing logic. The proxy becomes a standard load balancer or
is removed entirely.

---

## Redis Version Migration Checklist (6 → 7 → 8)

### Pre-Migration

- [ ] Read the release notes for every minor version between current and target.
- [ ] Run `redis-cli INFO` and save output as baseline.
- [ ] Inventory all modules in use (`MODULE LIST`). Verify compatibility with target version.
- [ ] Inventory all ACL rules (`ACL LIST`). Check for deprecated command categories.
- [ ] Audit `redis.conf` for deprecated directives. Compare with target version's default config.
- [ ] Test the migration on a staging replica first. Never migrate production first.

### 6 → 7 Breaking Changes

- [ ] ACL command categories renamed. Update ACL rules referencing old category names.
- [ ] `CLUSTER SLOTS` deprecated in favor of `CLUSTER SHARDS`. Update client libraries.
- [ ] Functions API introduced. If using `EVAL` with Lua, test compatibility.
- [ ] `redis-cli --bigkeys` output format changed. Update any parsing scripts.
- [ ] Verify Sentinel configuration compatibility if using Sentinel.

### 7 → 8 Breaking Changes

- [ ] Hash field expiration introduced. Verify client library support.
- [ ] New vector search capabilities require RediSearch module alignment.
- [ ] Check for removed deprecated commands in your application code.
- [ ] Verify replication protocol compatibility between mixed-version nodes.
- [ ] Test cluster rebalancing behavior with new shard migration protocol.

### Post-Migration

- [ ] Run `redis-cli INFO` and compare with baseline. Check `redis_version`, `used_memory`, `connected_clients`.
- [ ] Run application integration tests against the upgraded instance.
- [ ] Verify replication is healthy (`INFO replication`, check `master_link_status`).
- [ ] Monitor `slowlog` for 48 hours for unexpected regressions.
- [ ] Verify backup/snapshot process works with the new version.

---

## Zombie Code Diagnosis Template

Use this template to assess whether code qualifies as zombie code.

```markdown
## Zombie Code Assessment: [Component Name]

**Last meaningful commit**: [date]
**Days since last commit**: [N]
**Active consumers**: [list or count]
**Assigned maintainer**: [name or "none"]
**Test status**: [passing / failing / no tests]
**Documentation status**: [current / stale / none]

### Criteria Met (3+ = zombie)

- [ ] No meaningful commits in 6+ months
- [ ] Active consumers still depend on it
- [ ] No assigned maintainer
- [ ] Failing tests nobody fixes
- [ ] No documentation or stale documentation

### Criteria count: [N]/5

### Decision

- [ ] **Assign owner** — Name: ___, Deadline: ___
- [ ] **Begin compulsory deprecation** — Removal date: ___
- [ ] **Not zombie** — Document reasoning: ___
```

---

## Deprecation Announcement Template

```markdown
## Deprecation Notice: [Component/API/Feature Name]

**Type**: [Compulsory / Advisory]
**Announced**: [date]
**Removal date**: [date or "TBD — advisory only"]
**Replacement**: [name + link to docs]

### What is changing

[1-3 sentences describing what is being deprecated and why.]

### Who is affected

[List affected consumers, teams, or integration points.]

### Migration path

[Step-by-step instructions or link to migration guide.]

### Migration tooling

[Link to codemod, script, adapter, or "N/A — manual migration required".]

### Timeline

| Milestone | Date | Description |
|---|---|---|
| Announcement | [date] | This notice |
| Migration tooling available | [date] | Tools ready for consumer use |
| Advisory period ends | [date] | Compulsory migration begins |
| Removal | [date] | Component deleted from production |

### Support

[Contact channel for migration questions — Slack channel, email, office hours.]

### FAQ

**Q: Can I get an extension?**
A: [Policy on extensions.]

**Q: What if my use case is not covered by the replacement?**
A: [Escalation path.]
```

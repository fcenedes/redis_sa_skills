# Rollout Playbook

Detailed procedures for shipping to production. Reference this playbook from the
main skill for expanded guidance on each phase.

---

## Rollout Sequence

### Phase 0: Pre-Deploy (T-1h)

1. Merge the release branch. Confirm CI is green on the merge commit.
2. Fill in the rollback plan template (see below). Get a second engineer to review it.
3. Verify feature flags default to OFF in the target environment.
4. Open the monitoring dashboard. Capture baseline screenshots or note baseline values for error rate, P95 latency, and key business metrics.
5. Notify the on-call channel: what is deploying, who is driving, and the expected timeline.
6. Confirm database migrations are backward-compatible by running them against a staging snapshot with production-like data.

### Phase 1: Deploy (T+0)

1. Deploy to the first availability zone or canary pool.
2. Wait for health checks to pass on all new instances.
3. Run automated smoke tests against the canary pool.
4. Monitor for 10 minutes. Check error rate, latency, and resource utilization.
5. If thresholds hold, proceed to the next zone. Repeat until fully deployed.

### Phase 2: Feature Flag Rollout (T+15m)

1. Enable the flag for the internal team. Verify end-to-end behavior manually.
2. Advance to 5% of external traffic. Monitor for 30 minutes minimum.
3. Advance to 25%. Monitor for 15 minutes.
4. Advance to 50%. Monitor for 15 minutes.
5. Advance to 100%. Monitor for 24 hours (one full business cycle).
6. At each step, compare metrics against the Rollout Decision Thresholds in SKILL.md. Advance only when all signals read "Advance."

### Phase 3: Stabilization (T+24h)

1. Confirm 24-hour metrics are within thresholds.
2. Review error logs for new exception types, even if rates are acceptable.
3. Check resource utilization trends (CPU, memory, connections) for slow leaks.
4. If stable, declare the rollout complete.

### Phase 4: Cleanup (T+1w)

1. Create a follow-up PR to remove the feature flag and the old code path.
2. Remove the flag from the flag management system.
3. Update the runbook if the new behavior changes operational procedures.
4. Close the rollout tracking ticket.

---

## Monitoring Checklist Per Phase

Use this checklist at each rollout phase transition.

| Check | Tool / Command | Pass Criteria |
|-------|---------------|---------------|
| Error rate | APM dashboard, `ERROR` log count | Within 10% of baseline |
| P95 latency | APM dashboard, percentile chart | Within 20% of baseline |
| CPU utilization | Infrastructure dashboard | No sustained increase >15% |
| Memory utilization | Infrastructure dashboard | No upward trend over 30 minutes |
| Open connections | `INFO clients` (Redis), connection pool metrics | Within expected pool size |
| Redis health | `PING` → `PONG`, `INFO server` version correct | Pass |
| Redis cluster state | `CLUSTER INFO` → `cluster_state:ok` | Pass |
| Consumer group lag | `XINFO GROUPS <stream>` → `lag` field | No growing backlog |
| Business metrics | Analytics dashboard | Neutral or positive |
| Alert status | Alerting system (PagerDuty, Opsgenie, etc.) | No new firing alerts |

---

## Rollback Plan Template

Copy this template and fill in every field before deploying.

```
# Rollback Plan: [Feature / Release Name]
Date: YYYY-MM-DD
Author: [Name]
Reviewer: [Name]

## Trigger Conditions
- Error rate exceeds [X]% above baseline for [Y] minutes.
- P95 latency exceeds [X]ms (baseline: [Y]ms) for [Z] minutes.
- Business metric [name] declines by more than [X]%.
- Any P0/P1 incident attributed to this release.

## Rollback Steps
1. [If feature-flagged]: Disable the flag in [flag system]. Expected time: <1 min.
2. [If redeployment needed]: Run `[deploy command] --version [previous version]`. Expected time: <5 min.
3. [If database rollback needed]: Execute reverse migration `[migration name]`. Expected time: <15 min. Verify data integrity with `[verification query]`.
4. Notify [on-call channel] that rollback is in progress.
5. Run smoke tests against production after rollback completes.
6. Confirm metrics return to baseline within [X] minutes.

## Database Considerations
- Migration reversible: [Yes/No]
- Data backfill required on rollback: [Yes/No, details]
- Estimated rollback data impact: [description]

## Communication Plan
- Notify: [on-call channel, stakeholders]
- Status page update: [Yes/No, draft message]
- Post-rollback review: Scheduled within [X] hours.

## Rollback Owner
- Primary: [Name, contact]
- Secondary: [Name, contact]
```

---

## Post-Launch First-Hour Checklist

Run through this checklist during the first 60 minutes after reaching 100% rollout.

### Minutes 0-15
- [ ] All health checks passing across every instance.
- [ ] Error rate stable and within threshold.
- [ ] No new alert firings.
- [ ] Spot-check 3-5 user-facing flows manually.

### Minutes 15-30
- [ ] P95 latency trend is flat or declining.
- [ ] Memory utilization is not climbing.
- [ ] Redis `SLOWLOG GET 10` shows no new slow commands.
- [ ] Database query performance is nominal (check slow query log).

### Minutes 30-45
- [ ] Review application logs for unexpected warnings or errors.
- [ ] Verify async jobs (queues, workers, cron) are processing normally.
- [ ] Check Redis Streams: `XINFO GROUPS` shows consumers are caught up.

### Minutes 45-60
- [ ] Capture post-deploy metric snapshots for the retrospective.
- [ ] Confirm rollback plan is still actionable (deploy artifacts exist, credentials valid).
- [ ] Notify the on-call channel: first hour passed, metrics nominal.
- [ ] If any anomalies were noted, create tracking tickets.

---

## Redis Deploy Considerations

### Connection Management
- Verify the connection pool size is appropriate for the new deployment topology.
- If adding instances, confirm the pool does not exceed `maxclients` on the Redis server.
- After deploy, check `INFO clients` for `connected_clients` and `blocked_clients`.

### Cluster Deployments
- Run `CLUSTER INFO` before deploy. Do not proceed if `cluster_state` is not `ok`.
- Check `CLUSTER NODES` for nodes in `fail` or `pfail` state.
- After deploy, re-run `CLUSTER INFO` and `CLUSTER NODES` to confirm stability.
- If the deploy involves slot migrations, complete them before rolling out application changes.

### Cache Warming
- Identify hot keys using `OBJECT FREQ` (if LFU policy) or application analytics.
- Plan warming using `SCAN`-based preloading with rate limiting (e.g., 100 keys per batch, 50ms delay).
- Avoid warming all keys simultaneously — this creates a thundering herd.
- For large datasets, use gradual traffic shifting (10% → 25% → 50% → 100%) so caches fill organically.
- Monitor `INFO stats` → `keyspace_hits` and `keyspace_misses` to confirm the cache hit ratio recovers.

### Streams and Consumer Groups
- Before deploy: record output of `XINFO GROUPS <stream>` for each critical stream.
- Note `last-delivered-id` and `lag` for every consumer group.
- After deploy: compare values. A growing `lag` indicates consumers are not keeping up.
- If consumers were restarted, verify they resumed from the correct ID (not `0` or `$`).
- For new consumer groups, decide between `0` (replay all) and `$` (new messages only) based on business requirements.

### Sentinel and Failover
- Do not deploy during an active Sentinel failover.
- Check `SENTINEL master <name>` for `flags:master` and `num-slaves`.
- After deploy, confirm the application re-resolved the master address if a failover occurred during the window.

### Persistence and Backup
- If the deploy changes data schemas, trigger an `RDB` snapshot (`BGSAVE`) before deploying.
- Verify `INFO persistence` shows `rdb_last_bgsave_status:ok` after the snapshot completes.
- For AOF-enabled instances, confirm `aof_rewrite_in_progress` is `0` before deploying to avoid resource contention.

---
name: shipping-and-launch
description: Ship to production with confidence. Use when preparing to deploy, setting up feature flags, planning staged rollouts, or establishing rollback procedures. Enforces pre-launch checklists, quantitative rollout thresholds, and rollback-plan-before-deploy gates.
license: MIT
metadata:
  author: redis
  version: "1.0.0"
---

# Shipping and Launch

Faster is safer. Frequent small deploys beat infrequent large ones. Every deploy
carries risk; small deploys carry less. But every deploy — no matter how small —
needs a rollback plan documented before deployment begins.

## When to Use

- Preparing a production deployment.
- Setting up or managing feature flags for a gradual rollout.
- Establishing rollback procedures for a release.
- Planning a staged rollout with quantitative go/no-go criteria.

## Pre-Launch Checklist

Complete every section before deploying. See [references/rollout-playbook.md](references/rollout-playbook.md) for expanded details.

### Code Quality
- [ ] All tests pass (unit, integration, E2E).
- [ ] Code review approved, no open threads.
- [ ] No TODO/FIXME/HACK markers in the diff.

### Security
- [ ] No secrets in code or config (scan with `git secrets --scan`).
- [ ] Dependency audit clean (`npm audit`, `pip-audit`, etc.).
- [ ] Auth and input-validation paths covered by tests.

### Performance
- [ ] Load-tested under expected peak traffic.
- [ ] No N+1 queries or unbounded loops introduced.
- [ ] Memory and CPU profiles compared to baseline.

### Infrastructure
- [ ] Rollback plan documented (see Rollback Strategy below).
- [ ] Feature flags configured and defaulting to OFF.
- [ ] Health checks and readiness probes updated.
- [ ] Database migrations are backward-compatible and reversible.

### Documentation
- [ ] Runbook updated with new operational procedures.
- [ ] Changelog entry added.
- [ ] On-call team briefed on the change.

## Feature Flag Lifecycle

Follow this sequence exactly. Never skip the cleanup step.

1. **Deploy OFF** — Code ships with the flag disabled in production.
2. **Enable for team** — Internal dogfooding; verify end-to-end in production.
3. **Canary 5%** — Small audience, monitor for 30 minutes minimum.
4. **Gradual 25% → 50% → 100%** — Advance only when thresholds pass.
5. **Monitor** — Hold at 100% for one full business cycle (24h minimum).
6. **Clean up flag** — Remove the flag, the old code path, and any toggle config. Flag cleanup is mandatory, not optional. Stale flags are tech debt that compounds.

## Rollout Decision Thresholds

| Signal | Advance | Hold & Investigate | Rollback Immediately |
|--------|---------|-------------------|---------------------|
| Error rate | Within 10% of baseline | 10–100% above baseline | >2x baseline |
| P95 latency | Within 20% of baseline | 20–50% above baseline | >50% above baseline |
| Business metrics | Neutral or positive | Decline <5% | Decline >5% |

## Rollback Strategy

Document before deploy. No exceptions.

**Template** — fill in every field before the deploy begins:

- **Trigger conditions**: Exact thresholds that initiate rollback (reference table above).
- **Steps**: Ordered list — who does what, in what system, in what order.
- **Database considerations**: Can the migration be reversed? Is there data backfill?
- **Communication**: Who gets notified, through which channel, at what point.

**Time-to-rollback estimates:**

| Method | Target | When to use |
|--------|--------|-------------|
| Feature flag toggle | <1 min | Default; preferred for all changes behind flags |
| Redeploy previous version | <5 min | Changes not behind a flag |
| Database rollback | <15 min | Schema or data migrations; test reversal in staging first |

## Redis-Specific Considerations

- **Health checks**: Verify `PING` returns `PONG` and `INFO server` shows expected version after deploy.
- **Cluster failover**: Never deploy during a failover. Confirm `CLUSTER INFO` shows `cluster_state:ok`.
- **Streams consumer groups**: Record consumer group positions (`XINFO GROUPS`) before deploy. Verify no message loss after deploy by comparing `lag` and `last-delivered-id`.
- **Cache warming**: Plan a warming strategy for cold caches after deploy. Use `SCAN`-based preloading or gradual traffic shifting rather than a thundering herd.

## Common Rationalizations

| You tell yourself | The reality |
|-------------------|-------------|
| "It works in staging" | Production has different data volume, traffic patterns, and edge cases. |
| "It's a small change" | Small changes cause outages too. The rollback plan takes 2 minutes to write. |
| "We can fix-forward" | Fix-forward assumes the fix is obvious and fast. It usually is not. |
| "Nobody uses that code path" | You have not instrumented it, so you do not actually know. |
| "We'll clean up the flag later" | Later never comes. Schedule the cleanup PR before you merge the feature. |
| "Monitoring will catch it" | Monitoring catches it after users are affected. Prevention beats detection. |

## Red Flags

Stop the deploy if any of these are true:

- Rollback plan is missing or says "redeploy" without specifying which version.
- Deploy depends on multiple services releasing simultaneously.
- The person deploying cannot explain what changed and why.
- Database migration is irreversible and not tested in staging.
- No monitoring dashboard is open during the rollout.

## Verification

### Pre-Deploy
- [ ] Rollback plan reviewed by a second engineer.
- [ ] Feature flag confirmed OFF in production.
- [ ] Monitoring dashboard open with baseline metrics visible.
- [ ] On-call engineer aware and available.

### Post-Deploy
- [ ] Health checks passing on all instances.
- [ ] Error rate, latency, and business metrics within thresholds.
- [ ] Redis connectivity verified (`PING`, `INFO server`).
- [ ] Smoke tests passing against production.
- [ ] Rollback plan still actionable (artifacts exist, credentials valid).

## DO NOT

- Deploy without a documented rollback plan.
- Skip canary and go straight to 100%.
- Leave feature flags in code after the rollout completes.
- Deploy on Friday afternoon, before holidays, or before an on-call handoff.
- Combine unrelated changes in a single deploy.
- Rely on "we'll watch it" as a substitute for automated alerting.
- Roll back and redeploy the same artifact without understanding the failure.

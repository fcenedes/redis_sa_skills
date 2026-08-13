---
name: ci-cd-and-automation
description: Automate CI/CD pipeline setup with quality gates. Use when setting up or modifying build and deployment pipelines, configuring test runners in CI, establishing deployment strategies, or feeding CI failures back to agents.
license: MIT
metadata:
  author: redis
  version: "1.0.0"
---

# CI/CD and Automation

Shift left — catch errors as early as possible. Faster is safer — frequent
small deploys beat infrequent large ones. Every merged PR should be deployable;
every pipeline failure should produce an actionable signal, not noise.

Load [pipeline-examples](references/pipeline-examples.md) for GitHub Actions
templates, Redis CI snippets, and optimization patterns.

## When to Use

- Setting up CI for a new project or repository.
- Adding or modifying quality gates in an existing pipeline.
- Configuring test runners, linters, or type-checkers in CI.
- Establishing deployment strategies (preview, staged, blue-green).
- Feeding CI failures back to coding agents for automated diagnosis.

## When NOT to Use

- Writing the tests themselves — use `test-driven-development` for that.
- Debugging a production incident — use `systematic-debugging`.
- Performance tuning CI-detected regressions — use `performance-optimization`.

## Quality Gate Pipeline

Each gate blocks the next. A failure at any stage stops the pipeline.

```
lint ──▶ type-check ──▶ unit tests ──▶ integration tests ──▶ build ──▶ deploy
 │          │              │                │                  │         │
 ▼          ▼              ▼                ▼                  ▼         ▼
fast      fast         medium           slow+services      artifact   staged
(<30s)   (<30s)        (<2min)          (<10min)           (<5min)   (rollout)
```

Run lint and type-check in parallel when they have no shared state. Run unit
tests before integration tests — fast feedback first. Build the artifact only
after all tests pass. Deploy only after the artifact is verified.

## Agent CI Feedback Loop

When CI fails, do not dump the entire log into the agent context. Extract the
specific failure and feed it back for targeted diagnosis.

1. **CI fails** — pipeline reports a failing step and exit code.
2. **Extract** — pull the relevant error lines, not the full log.
3. **Diagnose** — agent receives the extracted error and identifies root cause.
4. **Fix** — agent applies the minimal fix and pushes.
5. **Re-run** — CI re-triggers on the new commit.

Pattern for agent integration:

```
ci_error=$(grep -A5 "FAILED\|Error\|error:" ci.log | head -20)
# Feed $ci_error to the agent, not the entire ci.log
```

## Deployment Strategies

- **Preview deployments** — deploy every PR to an ephemeral environment. Review
  the actual running app, not just the diff.
- **Feature flags** — ship incomplete features behind flags. Toggle in
  production without redeploying. See `shipping-and-launch` for flag hygiene.
- **Staged rollouts** — deploy to canary (1%), then 10%, then 100%. Monitor
  error rates at each stage. See `shipping-and-launch` for rollout checklists.

## CI Optimization

- **Cache dependencies** — cache `node_modules`, pip wheels, Go modules, and
  Cargo registry between runs. Invalidate on lockfile change.
- **Cache build artifacts** — persist compiled outputs across jobs in the same
  workflow run.
- **Parallelize tests** — shard test suites across multiple runners. Split by
  file count or execution time.
- **Path filters** — skip CI steps that do not apply. Docs-only changes should
  not run the full test suite.
- **Fail fast** — cancel remaining matrix jobs when one fails.

## Redis-Specific CI

- **Health check** — wait for Redis readiness before running tests:
  `redis-cli -h localhost -p 6379 PING` must return `PONG`.
- **Version check** — verify the expected Redis version:
  `redis-cli INFO server | grep redis_version`.
- **Testcontainers** — use Redis testcontainers for integration tests. Start a
  disposable Redis instance per test suite. Clean state every run.
- **Performance gate** — run `redis-benchmark -t get,set -n 10000 -q` in CI
  and assert throughput stays above a baseline.
- **Cluster CI** — spin up a minimum 3-node Redis cluster for cluster-aware
  integration tests. Verify with `redis-cli --cluster check`.

## Common Rationalizations (Reject All)

1. "CI is overhead" → CI catches what you will not. Every minute spent on CI
   saves hours of production debugging.
2. "We will add CI later" → Later never comes. Set up CI on the first commit.
3. "It works on my machine" → That is exactly why CI exists — to verify it
   works everywhere.
4. "The test is flaky, just re-run" → Fix the flake. Re-running trains the
   team to ignore failures.
5. "CI is too slow" → Optimize it (caching, sharding, path filters). Do not
   skip it.
6. "We only changed a comment" → Let the path filter decide, not a human.
7. "Deploying manually is faster" → Once. Automated deploys are faster forever.

## Red Flags

- No CI on the default branch.
- CI passes but tests are actually skipped or empty.
- Entire CI log pasted into an agent prompt instead of extracted error.
- Manual deployment steps that are not scripted.
- Secrets hardcoded in pipeline files instead of using CI secrets.
- No caching configured — every run re-downloads the world.
- Integration tests run without service health checks.

## Verification Checklist

- [ ] Every gate in the pipeline blocks the next stage on failure.
- [ ] CI runs on every push and every PR to the default branch.
- [ ] Redis services include health checks before tests execute.
- [ ] Dependency and build caches are configured and invalidated correctly.
- [ ] Secrets are stored in CI secrets, never in pipeline files.
- [ ] Agent CI feedback uses extracted errors, not raw logs.
- [ ] Deployment is automated — no manual steps after merge.

## DO NOT

- Skip CI for "small" changes — small changes cause big outages.
- Paste entire CI logs into agent context — extract the relevant failure.
- Hardcode secrets in pipeline YAML.
- Let flaky tests persist — fix or quarantine them immediately.
- Deploy without a rollback plan.

## Interaction with Other Skills

- `shipping-and-launch` — feature flags, staged rollouts, launch checklists.
- `performance-optimization` — CI performance gates and benchmarking.
- `observability-and-instrumentation` — monitor deployments post-release.
- `test-driven-development` — write the tests that CI runs.
- `code-review` — reviewer checks that CI is green before approving.

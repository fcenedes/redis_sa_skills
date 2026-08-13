# Pipeline Examples

GitHub Actions templates for CI/CD with quality gates and Redis integration.

## Basic CI Pipeline

Lint, type-check, test, and build in sequence with quality gates.

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lint-and-typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck

  unit-tests:
    needs: lint-and-typecheck
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm test -- --coverage
      - uses: actions/upload-artifact@v4
        with:
          name: coverage
          path: coverage/

  build:
    needs: unit-tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/
```

## Integration Tests with Redis

Use a Redis service container with a health check to guarantee readiness.

```yaml
  integration-tests:
    needs: unit-tests
    runs-on: ubuntu-latest
    services:
      redis:
        image: redis:7
        ports:
          - 6379:6379
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - name: Verify Redis is ready
        run: |
          redis-cli -h localhost -p 6379 PING
          redis-cli -h localhost -p 6379 INFO server | grep redis_version
      - name: Run integration tests
        run: npm run test:integration
        env:
          REDIS_URL: redis://localhost:6379
```

## Redis Stack Integration Tests

Use Redis Stack when tests require Search, JSON, TimeSeries, or Bloom modules.

```yaml
    services:
      redis-stack:
        image: redis/redis-stack-server:latest
        ports:
          - 6379:6379
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    steps:
      - name: Verify modules loaded
        run: |
          redis-cli MODULE LIST | grep -E "search|ReJSON|timeseries|bf"
```

## Redis Cluster CI Setup

Spin up a 3-node cluster for cluster-aware integration tests.

```yaml
    services:
      redis-node-1:
        image: redis:7
        ports: ["7000:6379"]
        options: --health-cmd "redis-cli ping" --health-interval 5s --health-retries 5
      redis-node-2:
        image: redis:7
        ports: ["7001:6379"]
        options: --health-cmd "redis-cli ping" --health-interval 5s --health-retries 5
      redis-node-3:
        image: redis:7
        ports: ["7002:6379"]
        options: --health-cmd "redis-cli ping" --health-interval 5s --health-retries 5
    steps:
      - name: Create cluster
        run: |
          redis-cli --cluster create \
            localhost:7000 localhost:7001 localhost:7002 \
            --cluster-replicas 0 --cluster-yes
      - name: Verify cluster
        run: redis-cli -p 7000 --cluster check localhost:7000
```

## E2E Tests with Playwright

Run end-to-end tests after the build succeeds, with the app and Redis running.

```yaml
  e2e-tests:
    needs: build
    runs-on: ubuntu-latest
    services:
      redis:
        image: redis:7
        ports:
          - 6379:6379
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npx playwright install --with-deps
      - uses: actions/download-artifact@v4
        with:
          name: dist
          path: dist/
      - name: Start app and run E2E
        run: |
          npm run start &
          npx wait-on http://localhost:3000
          npx playwright test
        env:
          REDIS_URL: redis://localhost:6379
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```

## CI Optimization Patterns

### Dependency Caching

Cache package manager stores to avoid re-downloading on every run.

```yaml
      # Node (built into setup-node with cache: npm)
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      # Python
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
          cache: pip

      # Go
      - uses: actions/setup-go@v5
        with:
          go-version: "1.22"
          cache: true

      # Rust
      - uses: actions/cache@v4
        with:
          path: |
            ~/.cargo/registry
            ~/.cargo/git
            target/
          key: ${{ runner.os }}-cargo-${{ hashFiles('**/Cargo.lock') }}
```

### Test Sharding

Split tests across parallel runners to reduce wall-clock time.

```yaml
  test:
    runs-on: ubuntu-latest
    strategy:
      fail-fast: true
      matrix:
        shard: [1, 2, 3, 4]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm test -- --shard=${{ matrix.shard }}/${{ strategy.job-total }}
```

### Path Filters

Skip expensive steps when only documentation or config files changed.

```yaml
on:
  push:
    branches: [main]
    paths-ignore:
      - "docs/**"
      - "*.md"
      - ".github/ISSUE_TEMPLATE/**"
  pull_request:
    branches: [main]
    paths-ignore:
      - "docs/**"
      - "*.md"
```

### Conditional Job Execution

Run specific jobs only when relevant files change.

```yaml
  changes:
    runs-on: ubuntu-latest
    outputs:
      backend: ${{ steps.filter.outputs.backend }}
      frontend: ${{ steps.filter.outputs.frontend }}
    steps:
      - uses: actions/checkout@v4
      - uses: dorny/paths-filter@v3
        id: filter
        with:
          filters: |
            backend:
              - "src/api/**"
              - "src/models/**"
            frontend:
              - "src/ui/**"
              - "src/components/**"

  backend-tests:
    needs: changes
    if: ${{ needs.changes.outputs.backend == 'true' }}
    runs-on: ubuntu-latest
    steps:
      - run: npm run test:backend
```

## Redis CI Health Check Snippets

Reusable steps for verifying Redis readiness in any pipeline.

```yaml
      # Basic health check
      - name: Wait for Redis
        run: |
          for i in $(seq 1 30); do
            redis-cli -h localhost -p 6379 PING && break
            echo "Waiting for Redis... ($i/30)"
            sleep 1
          done

      # Version assertion
      - name: Check Redis version
        run: |
          VERSION=$(redis-cli INFO server | grep redis_version | cut -d: -f2 | tr -d '\r')
          echo "Redis version: $VERSION"
          if [[ ! "$VERSION" =~ ^7\. ]]; then
            echo "ERROR: Expected Redis 7.x, got $VERSION"
            exit 1
          fi

      # Module check (Redis Stack)
      - name: Verify Redis modules
        run: |
          MODULES=$(redis-cli MODULE LIST)
          for mod in search ReJSON timeseries bf; do
            echo "$MODULES" | grep -q "$mod" || {
              echo "ERROR: Module $mod not loaded"; exit 1;
            }
          done

      # Performance baseline
      - name: Redis performance gate
        run: |
          RESULT=$(redis-benchmark -t get,set -n 10000 -q)
          echo "$RESULT"
          GET_RPS=$(echo "$RESULT" | grep GET | awk '{print $2}')
          if (( $(echo "$GET_RPS < 50000" | bc -l) )); then
            echo "WARN: GET throughput ($GET_RPS rps) below 50k baseline"
          fi
```

## Agent CI Feedback Pattern

Extract actionable errors from CI logs for agent consumption.

```bash
# Extract test failures (Jest/Vitest)
grep -A 10 "FAIL " ci.log | head -40

# Extract TypeScript errors
grep -E "error TS[0-9]+" ci.log | sort -u

# Extract lint errors
grep -E "error\s+" ci.log | grep -v "node_modules" | head -20

# Extract build errors
grep -B 2 -A 5 "Build failed\|ERROR\|FATAL" ci.log | head -30

# Feed to agent (pseudocode)
CI_ERROR=$(extract_error ci.log)
agent_prompt="CI failed with: ${CI_ERROR}. Diagnose and fix."
```

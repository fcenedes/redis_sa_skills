# Testing Patterns

Polyglot test structure, naming conventions, and anti-patterns for reliable, maintainable tests.

## Test Structure: Arrange-Act-Assert

Every test follows three phases, separated by blank lines for readability:

```
# Arrange -- set up preconditions and inputs
# Act     -- execute the behavior under test
# Assert  -- verify the expected outcome
```

- [ ] Each test has exactly one Act step
- [ ] Arrange does not assert; Assert does not act
- [ ] Test names describe the scenario, not the method: `rejects_expired_token` not `test_validate`

## Naming Convention

Use the pattern: `{unit}__{scenario}__{expected_result}`

Examples (adapt separator to language idiom):
- Python: `def test_cart_total__with_discount_code__applies_percentage()`
- Go: `func TestCartTotal_WithDiscountCode_AppliesPercentage(t *testing.T)`
- Java: `void cartTotal_withDiscountCode_appliesPercentage()`
- Rust: `fn cart_total_with_discount_code_applies_percentage()`

## Test Pyramid: 80/15/5

| Layer         | Share | Speed    | Scope                        |
|---------------|-------|----------|------------------------------|
| Unit          | 80%   | < 10 ms  | Single function or class     |
| Integration   | 15%   | < 5 sec  | Two or more real components  |
| End-to-end    | 5%    | < 30 sec | Full stack, user perspective |

- [ ] New features add unit tests first, integration tests second
- [ ] E2E tests cover critical user journeys, not edge cases
- [ ] Flaky tests are quarantined and fixed within one sprint

## DAMP Over DRY

Tests should be **Descriptive And Meaningful Phrases**, not aggressively de-duplicated.

- [ ] Prefer inline literals over shared constants in assertions
- [ ] Duplicate small setup blocks rather than creating deep helper hierarchies
- [ ] Extract helpers only when the same 5+ line block appears in 3+ tests
- [ ] Helpers should be named for the scenario, not the implementation

## The Beyonce Rule

> "If you liked it, then you shoulda put a test on it."

- [ ] No behavior ships without a test that would break if the behavior broke
- [ ] Bug fixes include a regression test that fails without the fix
- [ ] Config changes have tests verifying the new value is applied

## Mock at Boundaries Only

- [ ] Mock external I/O: HTTP clients, databases, file systems, clocks
- [ ] Do not mock internal classes or private methods
- [ ] Prefer fakes (in-memory implementations) over mock frameworks when possible
- [ ] Assert on behavior (what was called, with what), not on mock internals
- [ ] Keep mock setups under 10 lines; if longer, the design needs refactoring

## Anti-Patterns to Avoid

- [ ] **No sleep-based waits** -- use polling, callbacks, or test clocks
- [ ] **No test interdependence** -- each test runs in isolation, any order
- [ ] **No conditional logic in tests** -- no `if`/`else`; use parameterized tests instead
- [ ] **No catching exceptions to assert** -- use the language's `assertRaises`/`expect().toThrow()`
- [ ] **No testing private internals** -- test through public API only
- [ ] **No gigantic fixtures** -- build only what the test needs, inline

## Redis-Specific Testing

### Test Infrastructure

- [ ] Use `testcontainers` (Java/Python/Go/Node) or `redis-mock` for unit tests
- [ ] Integration tests connect to a real Redis instance (Docker or CI service)
- [ ] Each test file/class uses a unique key prefix to avoid collisions
- [ ] `FLUSHDB` runs in `setUp`/`beforeEach`, not in teardown (fail-safe ordering)
- [ ] Tests use a dedicated Redis database number (e.g., `SELECT 15`) when not using containers

### Pub/Sub and Streams

- [ ] Pub/Sub tests use a unique channel name per test to avoid cross-talk
- [ ] Stream consumer tests verify both new-message and pending-message paths
- [ ] Consumer group tests clean up with `XGROUP DESTROY` after completion
- [ ] Timeout-based assertions have generous margins (2x expected) for CI variability

### Data Type Coverage

- [ ] Tests verify correct Redis data type usage (String vs Hash vs Sorted Set)
- [ ] TTL assertions check that expiry is set, not the exact remaining seconds
- [ ] Large-value tests verify chunking/compression if applicable
- [ ] Cluster-mode tests use hash tags `{tag}` for multi-key operations

### Performance Baselines

- [ ] Critical-path operations have benchmark tests with documented thresholds
- [ ] Pipeline vs single-command tradeoffs have comparative tests
- [ ] Memory usage tests exist for key families expected to grow beyond 1 GB

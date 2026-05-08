---
name: playwright-test
description: Use when creating, fixing, reviewing, or debugging Playwright Test E2E/UI tests, playwright.config files, fixtures, auth state, selectors, traces, CI failures, flaky UI tests, browser tests, or test runner workflows.
license: MIT
metadata:
  author: redis
  version: "1.0.0"
---
# Playwright Test

Author and maintain reliable E2E and UI tests with `@playwright/test`. This skill is for the Playwright **test runner** — config, specs, fixtures, traces, CI. For live browser exploration via the Playwright CLI, use `playwright-cli-agent` instead.

## When to Use

Trigger this skill for:

- New or modified `*.spec.ts`, `*.e2e.ts`, or `tests/**` files using `@playwright/test`.
- Editing `playwright.config.ts` / `playwright.config.js`.
- Fixtures, auth state, page-objects, custom matchers, or test helpers.
- Debugging flaky UI tests, CI failures, or selector breakage.
- Reviewing Playwright traces, reports, or screenshots/videos.
- Adding browser/E2E coverage to a Redis dashboard, Insight plugin, or web app.

## Inspect Before Editing

Before writing or changing tests, inspect project conventions:

- Package manager: `package.json`, lockfile (`package-lock.json` / `pnpm-lock.yaml` / `yarn.lock`).
- `playwright.config.*` for `testDir`, projects, base URL, retries, traces, web server, reporters.
- Existing `*.spec.ts` / `*.e2e.ts` to match style, naming, and fixture patterns.
- `tests/fixtures/`, `tests/helpers/`, or `playwright/fixtures/` for shared fixtures.
- `tests/auth.setup.ts` or `storageState` files for authenticated flows.

Match existing conventions; do not invent a parallel pattern.

## Core Patterns

Always import from `@playwright/test`:

```ts
import { test, expect } from '@playwright/test';
```

Prefer **resilient, user-facing locators** in this order:

1. `page.getByRole('button', { name: 'Sign in' })`
2. `page.getByLabel('Email')`
3. `page.getByPlaceholder('you@example.com')`
4. `page.getByText('Welcome back')`
5. `page.getByTestId('submit')`

Avoid brittle selectors:

- Long CSS chains (`.card > div:nth-child(2) span`).
- `nth-child` / positional selectors.
- XPath expressions.
- Selectors that depend on layout, ordering, or visual position.

Use **web-first assertions** (auto-retry, no manual waits):

```ts
await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
await expect(page).toHaveURL(/\/dashboard$/);
await expect(page.getByTestId('user-name')).toHaveText('Pierre');
```

Do not use `page.waitForTimeout(...)` except as a last resort, and only with a comment explaining why no condition-based wait works.

See [references/selectors-and-locators.md](references/selectors-and-locators.md) for the locator priority order and examples.

## Workflow

1. Read the existing config and one or two existing specs to match style.
2. Plan the test: state preconditions, action, expected outcome.
3. Write the smallest test that proves the behavior. Compose with fixtures, not copy-paste.
4. Run the narrowest useful command first, then broaden:

   ```bash
   rtk npx playwright test path/to/file.spec.ts
   rtk npx playwright test -g "logs in successfully"
   rtk npx playwright test
   ```

5. On failure, open the report or trace:

   ```bash
   npx playwright show-report
   npx playwright show-trace path/to/trace.zip
   ```

6. For interactive debugging, use UI mode or codegen — do not wrap these with RTK:

   ```bash
   npx playwright test --ui
   npx playwright codegen http://localhost:3000
   ```

See [references/playwright-test-patterns.md](references/playwright-test-patterns.md) for fixtures, auth state, page objects, and CI configuration. See [references/debugging-and-traces.md](references/debugging-and-traces.md) for trace and flake handling.

## DO NOT

- DO NOT use `waitForTimeout` for synchronization. Use web-first assertions or `waitFor` with a condition.
- DO NOT couple tests to brittle selectors (CSS chains, `nth-child`, XPath, layout-dependent text).
- DO NOT depend on test ordering. Each `test(...)` must be independent.
- DO NOT share mutable state between tests via module-level variables. Use fixtures.
- DO NOT log in through the UI in every test. Use `storageState` and an auth setup project.
- DO NOT call real third-party APIs. Use `page.route` to mock external dependencies.
- DO NOT wrap `--ui`, `codegen`, `show-report`, or `show-trace` with RTK.
- DO NOT add `data-testid` for elements already reachable by role/label/text. Add it only when no semantic locator works.
- DO NOT commit screenshots, videos, traces, or `test-results/` artifacts unless the project asks for them.

## Final Checklist

- Tests use `@playwright/test` and resilient locators.
- All waits are condition-based; no `waitForTimeout` without justification.
- Each test is independent and parallel-safe.
- Auth flows use `storageState`, not UI login per test.
- Third-party calls are mocked via `page.route`.
- Trace is configured (`on-first-retry` in CI, `retain-on-failure` locally).
- Tests pass locally and in CI on the narrowest scope before broadening.

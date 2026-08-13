---
name: playwright-test
description: Use when creating, fixing, reviewing, or debugging Playwright Test E2E/UI tests, playwright.config files, fixtures, auth state, selectors, traces, CI failures, flaky UI tests, browser tests, or test runner workflows.
compatibility: Requires Node.js project with @playwright/test or ability to install Playwright browsers.
license: MIT
metadata:
  author: redis
  version: "1.0.0"
---
# Playwright Test

Author and maintain reliable E2E and UI tests with `@playwright/test`. This skill is for the Playwright **test runner** — config, specs, fixtures, traces, CI. It does not drive a live browser session; for live browser exploration, manual bug reproduction, or screenshots via the Playwright CLI, use `playwright-cli-agent` instead.

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

If the project has **no existing `playwright.config.*`**, start from [templates/playwright.config.example.ts](templates/playwright.config.example.ts) and adjust `testDir`, `baseURL`, and projects to the app. If the project has **no shared fixture file**, start from [templates/fixture-template.ts](templates/fixture-template.ts) rather than inlining auth/setup logic per spec. Do not copy either template when an equivalent already exists — extend the existing one instead.

## Authority

- Authorized: create or modify Playwright Test specs, fixtures, config, and test helpers.
- Requires explicit request: publish/deploy artifacts or run tests against production systems.
- Assessment-only default: for test review or CI triage, report findings and stop unless edits are requested.

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
- DO NOT use this skill to manually drive a browser for exploration, bug repro, or screenshots — use `playwright-cli-agent` for that, then bring back semantic locators.
- DO NOT paste Playwright CLI element refs (e.g. `#a4b2c`) into a spec. They are session-scoped and expire on navigation/close; translate to `getByRole/Label/Text` instead.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "Manual testing is faster for this one check" | Manual testing does not persist and cannot run in CI; write a spec. |
| "A CSS selector chain is fine for now" | Long CSS chains, `nth-child`, XPath, and layout-dependent selectors are brittle; use semantic locators. |
| "waitForTimeout is just a quick fix" | `waitForTimeout` is a flake source; use web-first assertions or condition-based waits. |
| "Logging in through the UI in each test is more realistic" | Use `storageState` and an auth setup project; UI login per test is slow and flaky. |
| "The test order doesn't matter because they all pass" | Each `test(...)` must be independent; deleting or reordering any other test must not change its outcome. |
| "We can mock external APIs later" | Unmocked third-party calls make tests flaky and slow; use `page.route` from the start. |

## Interaction with Other Skills

- **playwright-cli-agent** (upstream): use for live exploration and selector discovery before writing specs.
- **rtk-cli** (complementary): use RTK for test runner output but not for `--ui`, `codegen`, `show-report`, or `show-trace`.

## Verification

- [ ] Test files follow the project naming convention (`find . -name '*.spec.ts' -o -name '*.test.ts' | head` lists discovered test files)
- [ ] `npx playwright test --list` exits 0 and shows discovered tests matching the expected count
- [ ] Playwright config exists at the project root (`ls playwright.config.ts` or `ls playwright.config.js` succeeds)
- [ ] CI pipeline includes a Playwright step (`grep -r 'playwright' .github/workflows/ || grep -r 'playwright' .gitlab-ci.yml` finds at least one match)

## Final Checklist

Each item must be literally verifiable (yes/no) before calling the task done:
Each item must be proved by a command output or file read from this session, not by memory or prior conversation.

- [ ] Every new/changed test imports `test`/`expect` from `@playwright/test` (or the project's fixture wrapper of it).
- [ ] `rtk npx playwright test path/to/file.spec.ts` (or the project's equivalent) exits 0 for the narrowest scope touched.
- [ ] Zero occurrences of `waitForTimeout` were added without an inline comment justifying it.
- [ ] Each `test(...)` runs in isolation — deleting or reordering any other test in the file does not change its outcome.
- [ ] Authenticated tests reference a `storageState` file or auth fixture, not a UI login inside the test body.
- [ ] No test calls a real third-party API — `page.route` mocks are in place for external hosts.
- [ ] `trace` is set in `playwright.config.ts` (`on-first-retry` in CI, `retain-on-failure` locally).
- [ ] No CLI element ref (`playwright-cli` output) appears anywhere in the diff.

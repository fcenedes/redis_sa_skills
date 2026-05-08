# Playwright Test Patterns

Reference patterns for `@playwright/test` projects.

## Fixtures

Prefer fixtures over `beforeEach` blocks for anything reusable. Fixtures are typed, composable, and lazy.

```ts
// tests/fixtures.ts
import { test as base, expect } from '@playwright/test';

type Fixtures = {
  authedPage: import('@playwright/test').Page;
};

export const test = base.extend<Fixtures>({
  authedPage: async ({ page }, use) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill(process.env.TEST_EMAIL!);
    await page.getByLabel('Password').fill(process.env.TEST_PASSWORD!);
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    await use(page);
  },
});

export { expect };
```

In specs:

```ts
import { test, expect } from './fixtures';

test('shows the dashboard', async ({ authedPage }) => {
  await expect(authedPage.getByTestId('user-name')).toBeVisible();
});
```

## Auth State (storageState)

For multi-test suites, log in once in a setup project and reuse the storage state.

```ts
// playwright.config.ts
projects: [
  { name: 'setup', testMatch: /auth\.setup\.ts/ },
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'], storageState: 'playwright/.auth/user.json' },
    dependencies: ['setup'],
  },
],
```

```ts
// tests/auth.setup.ts
import { test as setup, expect } from '@playwright/test';

setup('authenticate', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill(process.env.TEST_EMAIL!);
  await page.getByLabel('Password').fill(process.env.TEST_PASSWORD!);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page).toHaveURL(/\/dashboard/);
  await page.context().storageState({ path: 'playwright/.auth/user.json' });
});
```

Add `playwright/.auth/` to `.gitignore`.

## Page Objects

Use page objects only when a flow is reused in 3+ tests. For one-off flows, prefer inline locators with descriptive names.

```ts
export class DashboardPage {
  constructor(private readonly page: import('@playwright/test').Page) {}
  readonly userName = () => this.page.getByTestId('user-name');
  readonly signOut = () => this.page.getByRole('button', { name: 'Sign out' });
}
```

Keep page objects free of assertions — assertions belong in tests.

## Test Data

- Generate unique test data per run (`crypto.randomUUID()`, timestamps).
- Never share mutable test data between tests.
- Clean up server-side state in fixtures using API calls, not UI flows.
- For Redis-backed apps, prefer flushing a dedicated test database via API/admin endpoint, not via the UI.

## Mocking Third-Party APIs

Use `page.route` to intercept network requests. Never hit real third-party APIs in tests.

```ts
test('renders billing data', async ({ page }) => {
  await page.route('**/api.stripe.com/**', (route) =>
    route.fulfill({ status: 200, json: { invoices: [] } })
  );
  await page.goto('/billing');
  await expect(page.getByText('No invoices')).toBeVisible();
});
```

Mock at the highest stable boundary (your own API) when possible. Fall back to third-party mocks when the app calls them directly from the browser.

## CI Recommendations

- `retries: 2` in CI, `0` locally.
- `workers: process.env.CI ? 2 : undefined` to balance speed vs. flake.
- `forbidOnly: !!process.env.CI` to fail builds with stray `test.only`.
- `reporter: [['html'], ['github']]` for inline annotations on PRs.
- Upload `playwright-report/` and `test-results/` as CI artifacts on failure.
- Pin Playwright version. Update browsers via `npx playwright install --with-deps` in CI.

## Trace Configuration

```ts
use: {
  trace: process.env.CI ? 'on-first-retry' : 'retain-on-failure',
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
},
```

- `on-first-retry`: keeps CI cost low while still capturing flake evidence.
- `retain-on-failure`: gives local debugging without ballooning disk usage.
- Avoid `trace: 'on'` in CI — produces large artifacts on every run.

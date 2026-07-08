import { test as base, expect, type Page } from '@playwright/test';

// Copy-ready starter for a shared fixtures file. Add one property per
// reusable piece of setup (authed page, seeded data, API client, etc.).
// Only use this when the project has no existing fixtures file to extend.
type Fixtures = {
  authedPage: Page;
};

export const test = base.extend<Fixtures>({
  authedPage: async ({ page }, use) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill(process.env.TEST_EMAIL!);
    await page.getByLabel('Password').fill(process.env.TEST_PASSWORD!);
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    // `use` hands the ready-to-go page to the test; code after this line
    // runs as teardown once the test finishes.
    await use(page);
  },
});

export { expect };

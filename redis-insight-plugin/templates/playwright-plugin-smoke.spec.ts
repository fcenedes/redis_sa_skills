// Playwright smoke test for a deployed Redis Insight plugin.
//
// Selectors are intentionally generic — they MUST be adjusted to the Redis
// Insight version under test. Treat this file as a starting point, not a
// drop-in.
//
// Preconditions:
//   - Redis Insight is reachable at http://localhost:5540.
//   - At least one database is configured (or pre-seed one before this test).
//   - The plugin is already deployed (see templates/deploy-external.sh or
//     templates/deploy-internal-docker.sh).

import { test, expect } from '@playwright/test';

const INSIGHT_URL = process.env.INSIGHT_URL ?? 'http://localhost:5540';
const PLUGIN_VIS_NAME = process.env.PLUGIN_VIS_NAME ?? 'Example View';
const PLUGIN_COMMAND = process.env.PLUGIN_COMMAND ?? 'XRANGE my-stream - +';

test.describe('Redis Insight plugin smoke', () => {
  test('renders the plugin visualization for its matched command', async ({ page }) => {
    // 1. Verify the plugin is registered with Insight.
    const resp = await page.request.get(`${INSIGHT_URL}/api/plugins`);
    expect(resp.ok()).toBeTruthy();
    const body = await resp.text();
    expect(body).toContain(PLUGIN_VIS_NAME);

    // 2. Open Insight and navigate to Workbench.
    await page.goto(INSIGHT_URL);

    // Adjust this selector to your Insight version (button, link, or sidebar item).
    await page.getByRole('link', { name: /workbench/i }).click();

    // 3. Type and run the matching command.
    const editor = page.locator('.monaco-editor').first();
    await editor.click();
    await page.keyboard.type(PLUGIN_COMMAND, { delay: 5 });

    // Adjust to the actual run button name in your Insight build.
    await page.getByRole('button', { name: /run/i }).click();

    // 4. Switch to the plugin visualization tab.
    await page.getByRole('tab', { name: PLUGIN_VIS_NAME }).click();

    // 5. The plugin renders inside an iframe. Find it and assert content.
    const frame = page.frameLocator('iframe').first();
    await expect(frame.locator('#app')).toBeVisible();

    // Replace with an assertion specific to your plugin's rendered output.
    await expect(frame.locator('#app')).not.toHaveText('');
  });
});

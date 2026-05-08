# Debugging and Traces

Tools and techniques for debugging Playwright tests and taming flake.

## Trace Viewer

Configure once in `playwright.config.ts`:

```ts
use: { trace: process.env.CI ? 'on-first-retry' : 'retain-on-failure' }
```

Open after a failure:

```bash
npx playwright show-trace test-results/path/to/trace.zip
npx playwright show-report                   # last report
npx playwright show-report path/to/report    # specific report
```

The trace viewer shows actions, network, console, snapshots, and the DOM at every step. Always read the trace before guessing at a fix.

## Useful Run Modes

```bash
# Run a single file
npx playwright test tests/login.spec.ts

# Filter by title
npx playwright test -g "logs in successfully"

# Headed (see the browser)
npx playwright test --headed

# Step debug with the inspector
PWDEBUG=1 npx playwright test path/to/file.spec.ts

# Pause inside a test
await page.pause();

# UI mode (interactive runner)
npx playwright test --ui
```

Don't wrap interactive modes (`--ui`, `--debug`, `codegen`, `show-report`, `show-trace`) with RTK — they need a TTY and full output.

For non-interactive runs, prefer:

```bash
rtk npx playwright test
rtk npx playwright test path/to/file.spec.ts
rtk npx playwright test -g "logs in successfully"
```

## Narrowing Failures

1. Reproduce on the **smallest** scope: one project, one file, one title (`-g`).
2. Run with `--headed` once to see what actually happens.
3. If timing-related, increase `expect.timeout` locally to confirm it's a wait problem, then fix the wait properly (web-first assertion or `waitFor` with a condition) — do not ship the bumped timeout.
4. If selector-related, open `page.pause()` and use the trace viewer's locator picker.

## Flake Handling

A test is flaky if it fails non-deterministically on the same code. Common causes and fixes:

- **Unhandled wait** — switch to `await expect(locator).toBeVisible()` instead of `waitForTimeout`.
- **Race with network** — use `page.waitForResponse('**/api/things')` or mock with `page.route`.
- **Animation timing** — disable CSS animations in tests, or assert on the post-animation state.
- **Shared state** — use a fresh fixture or unique IDs per test.
- **Auth drift** — regenerate `storageState` in the auth setup project; do not log in via UI per test.
- **Test pollution** — each test must clean up (or use API setup/teardown via fixtures).
- **CI-only flake** — usually slower CI runners. Add `retries: 2` and inspect the on-first-retry trace.

Quarantine, don't normalize: never disable assertions to "fix" flake. If a test is unfixable in the moment, mark it `test.fixme(...)` with a tracking issue link and move on.

## Useful Snippets

```ts
// Wait for a specific network response
const resp = await page.waitForResponse((r) => r.url().includes('/api/orders') && r.ok());

// Wait for a specific URL
await page.waitForURL(/\/dashboard/);

// Slow motion locally
use: { launchOptions: { slowMo: 250 } }

// Block third-party scripts to stabilize tests
await page.route('**/*.{png,jpg,gif}', (r) => r.abort());
```

## Report Artifacts

- `playwright-report/` — HTML report.
- `test-results/` — per-test attachments (trace, video, screenshots).

Both belong in `.gitignore`. Upload as CI artifacts on failure for offline analysis.

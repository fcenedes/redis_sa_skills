# Screenshots and Selector Discovery

How to use Playwright CLI screenshots well, and how to translate live exploration into stable test selectors.

## When to Screenshot

Screenshot when state is **meaningful** and **visual**:

- Confirming that a flow reached the expected screen.
- Documenting a bug — show the failing screen, not just code.
- Comparing before/after for a UI change.
- Checking layout at multiple viewport widths.
- Capturing an error banner, modal, toast, or empty state.

Don't screenshot every step — capture transitions and outcomes.

## Screenshot Hygiene

For each screenshot, record alongside it:

- **URL** at capture time.
- **Action that produced this state** (one sentence).
- **Console errors** (paste the relevant lines).
- **Network calls** that mattered (URL, status, response shape if relevant).

Bug reports without these context fields force the next person to redo the work.

## From Live Refs to Test Locators

CLI snapshot refs are session-scoped — they change between runs. To turn an exploration into a Playwright test, translate each interaction into a **semantic locator**.

| Element type | Prefer | Example |
|--------------|--------|---------|
| Button / link | `getByRole` | `page.getByRole('button', { name: 'Sign in' })` |
| Form field with `<label>` | `getByLabel` | `page.getByLabel('Email')` |
| Input with placeholder only | `getByPlaceholder` | `page.getByPlaceholder('you@example.com')` |
| Static visible text | `getByText` | `page.getByText('Welcome back')` |
| Icon-only button | `getByRole` + `name` (aria-label) | `page.getByRole('button', { name: 'Settings' })` |
| Image | `getByAltText` | `page.getByAltText('Redis logo')` |
| Last resort | `getByTestId` | `page.getByTestId('submit')` |

If no semantic locator works, that is a hint to add `data-testid` to the app — or, often, to fix an a11y gap (missing label, missing role).

## Anti-Patterns

- Pasting CLI refs (`f4a2`, `e1`) into a test file as the "selector".
- Using long CSS chains (`.card div:nth-child(2) span`) lifted from devtools.
- Using XPath (`//div[@class="card"]//span[2]`).
- Selecting by class name when classes are generated (Tailwind hashes, CSS modules, Emotion).
- Selecting by ordering (`nth=0`) when the order can change.
- Screenshotting with the devtools or recording overlay still open.

## Bug Report Checklist

When using this skill to file a UI bug, include:

- **Steps to reproduce** (CLI commands, in order).
- **Expected behavior** (one sentence).
- **Actual behavior** (one sentence).
- **Screenshots** at the failing step (and ideally one for the prior step).
- **URL** and any query params that matter.
- **Browser/device/viewport** if relevant.
- **Console errors** (verbatim).
- **Network calls** that returned non-2xx for the failing step.
- **Build/commit** identifying the version under test.

A bug report with all of the above can be acted on without re-reproducing.

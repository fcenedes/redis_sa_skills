---
name: playwright-cli-agent
description: Use when an agent needs to inspect, explore, operate, debug, or screenshot a web application through Playwright CLI. Use for live browser automation, UI exploration, reproducing bugs, validating flows, creating screenshots, or discovering stable selectors.
license: MIT
metadata:
  author: redis
  version: "1.0.0"
---
# Playwright CLI for Agents

Drive a real browser from the CLI to inspect, explore, and reproduce UI behavior. This skill is **not** the same as `playwright-test`. Use it when the goal is to *operate* a web app live — not to write a `*.spec.ts` test.

## When to Use

Trigger this skill for:

- Live UI exploration of a running web app.
- Reproducing a UI bug end-to-end before writing a fix or a test.
- Capturing screenshots for bug reports, before/after comparisons, or responsive checks.
- Validating a flow manually (login, checkout, a multi-step form).
- Discovering stable selectors before authoring a Playwright test.
- Inspecting visual state, layout regressions, or Redis Insight plugin iframes.

If the goal is to author or fix `*.spec.ts` files, switch to the `playwright-test` skill.

## Installation Check

Confirm Playwright CLI is available:

```bash
playwright-cli --help
npx playwright-cli --help
```

If neither resolves, install:

```bash
npm install -g @playwright/cli@latest
```

Some environments expose the CLI as `npx playwright` subcommands (`npx playwright open`, `npx playwright codegen`). Either form is fine — match what the project uses.

## Common Commands

```bash
# Open a URL in a real browser
playwright-cli open http://localhost:3000 --headed

# Navigate inside an open session
playwright-cli goto http://localhost:3000/login

# Interact via element refs from snapshots
playwright-cli click <ref>
playwright-cli fill <ref> "hello@example.com"
playwright-cli type "hello@example.com"
playwright-cli press Enter
playwright-cli check <ref>
playwright-cli uncheck <ref>
playwright-cli select <ref> <value>
playwright-cli hover <ref>

# Capture a screenshot of the current viewport
playwright-cli screenshot
```

Element refs returned by CLI snapshots are **for live interaction only**. They are not stable test selectors — do not paste them into a Playwright test.

## Core Workflow

1. Confirm the target app is running (`http://localhost:3000`, `http://localhost:5540`, etc.).
2. Open the app headed so a human (or you) can see what changes.
3. Navigate, interact, and capture state at each meaningful step.
4. On failure or unexpected state, screenshot **first**, then read code.
5. When converting an exploration into a test, translate refs to semantic locators:
   - `getByRole(...)`
   - `getByLabel(...)`
   - `getByPlaceholder(...)`
   - `getByText(...)`
   - `getByTestId(...)` (only when no semantic option works)

See [references/live-browser-workflow.md](references/live-browser-workflow.md) for step-by-step flows and [references/screenshot-and-selector-discovery.md](references/screenshot-and-selector-discovery.md) for screenshot and selector translation guidance.

## When to Screenshot

Capture screenshots when:

- Validating visual state ("does the dashboard render with data?").
- Documenting a bug for an issue or PR description.
- Comparing before/after for a UI change.
- Checking responsive layout at specific viewports.
- Confirming a multi-step flow reached the expected screen.

Always include the URL and any relevant console/network signals alongside the screenshot.

## RTK Usage

Use RTK for surrounding shell work — git, file search, build output, test output:

```bash
rtk git diff
rtk grep "useDashboard" src/
rtk read src/components/Dashboard.tsx
rtk npm run build
```

Do **not** wrap interactive Playwright CLI commands with RTK — they expect a TTY and benefit from raw output for visibility.

## DO NOT

- DO NOT confuse this skill with `playwright-test`. This is for live operation; that is for the test runner.
- DO NOT paste CLI snapshot refs into a Playwright test as the long-term selector.
- DO NOT rely on coordinate-based clicks; use refs or semantic locators.
- DO NOT screenshot blindly — capture state at meaningful checkpoints with a label.
- DO NOT operate against production environments without explicit user authorization.
- DO NOT run destructive flows (delete, purge, drop) without a screenshot of the prompt and explicit user confirmation.
- DO NOT wrap interactive browser CLI commands with RTK.

## Final Checklist

- The right skill is in use (live operation, not test authoring).
- Each interaction step has a clear purpose and is logged.
- Screenshots cover the meaningful before/during/after states.
- Recorded URLs, console errors, and network calls accompany the visual evidence.
- Discovered selectors are translated into resilient `getByRole/Label/Text` locators before being committed to any test.

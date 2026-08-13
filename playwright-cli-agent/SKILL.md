---
name: playwright-cli-agent
description: Use when an agent needs to inspect, explore, operate, debug, or screenshot a web application through Playwright CLI. Use for live browser automation, UI exploration, reproducing bugs, validating flows, creating screenshots, or discovering stable selectors.
compatibility: Requires Node.js project with Playwright CLI (or @playwright/cli) installed, and a running local/staging web app to target. Never point at production.
license: MIT
metadata:
  author: redis
  version: "1.1.0"
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

## Authority

- Authorized: drive browsers for exploration, screenshots, and validation against local/dev/staging.
- Never interact with production without explicit confirmation; stop if the URL is ambiguous.

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

Use the project-supported Playwright CLI form to open/goto, interact with
snapshot refs, and capture screenshots. See
[references/live-browser-workflow.md](references/live-browser-workflow.md) for
command examples and session handling.

### What a Snapshot Looks Like

A snapshot lists the accessibility tree with a `ref` attached to each interactive node, e.g.:

```
- button "Sign in" [ref=#a4b2c]
- textbox "Email" [ref=#e19f0]
- textbox "Password" [ref=#b7d31]
```

Use the ref directly in the next command: `playwright-cli click #a4b2c`.

Refs are **session-scoped and ephemeral** — they are assigned per snapshot and expire (or get reassigned) on navigation, reload, or when the browser session closes. That is exactly why they must never be pasted into a `*.spec.ts` file: the ref that worked in this session will not exist, or will point to a different element, the next time the test runs. Element refs returned by CLI snapshots are **for live interaction only**. When an exploration needs to become a durable test, translate the ref's element into a semantic locator (`getByRole('button', { name: 'Sign in' })`) before it leaves this skill.

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

- DO NOT confuse this skill with `playwright-test`. This is for live operation; use `playwright-test` to author or fix `*.spec.ts` files.
- DO NOT paste CLI snapshot refs into a Playwright test as the long-term selector — refs are session-scoped and expire on navigation/close.
- DO NOT rely on coordinate-based clicks; use refs or semantic locators.
- DO NOT screenshot blindly — capture state at meaningful checkpoints with a label.
- DO NOT operate against production environments, period — target only local/dev/staging URLs. If a URL is ambiguous, ask before navigating.
- DO NOT run destructive flows (delete, purge, drop) without a screenshot of the prompt and explicit user confirmation.
- DO NOT wrap interactive browser CLI commands with RTK.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "I can paste the CLI ref directly into the spec file" | CLI snapshot refs are session-scoped and ephemeral; translate to `getByRole/Label/Text` before leaving this skill. |
| "This production URL is probably fine for a quick check" | Never interact with production; target only local/dev/staging. If the URL is ambiguous, ask first. |
| "A coordinate-based click is faster than finding the ref" | Coordinate clicks are brittle; use refs from snapshots or semantic locators. |
| "I already know what the page looks like from the JSON" | Always screenshot at meaningful checkpoints; JSON inspection is not visual validation. |
| "Writing the spec directly is faster than exploring first" | Use this skill to discover stable selectors and reproduce behavior before authoring `playwright-test` specs. |
| "Wrapping the browser CLI with RTK will save tokens" | Do not wrap interactive Playwright CLI commands with RTK; they expect a TTY. |

## Interaction with Other Skills

- **playwright-test** (downstream): after discovering stable selectors and reproducing behavior, hand off to `playwright-test` for spec authoring.
- **rtk-cli** (complementary): use RTK for surrounding shell work (git, file search, builds) but not for interactive browser CLI commands.

## Verification

- [ ] Playwright CLI is installed and reachable (`npx playwright --version` exits 0 and prints a version string)
- [ ] Browser binaries are present (`npx playwright install --dry-run` reports no missing browsers, or `ls $(npx playwright install --dry-run 2>&1 | grep -oE '/.*chromium')` confirms the path)
- [ ] Test target URL is accessible (`curl -s -o /dev/null -w '%{http_code}' http://localhost:<port>` returns 200 or expected status)
- [ ] Screenshot and trace output directory exists and is writable (`ls -d <output-dir>` succeeds)

## Final Checklist

Each item must be literally verifiable (yes/no) before calling the task done:
Each item must be proved by a command output or file read from this session, not by memory or prior conversation.

- [ ] The target URL was confirmed local/dev/staging, never production.
- [ ] This skill (not `playwright-test`) was used because the task was live exploration, repro, or screenshots — not spec authoring.
- [ ] Every interaction step (open/goto/click/fill) has a one-line purpose recorded alongside it.
- [ ] Screenshots exist for each meaningful before/during/after state, each labeled with its URL.
- [ ] Console errors and relevant network responses are recorded next to the screenshots that need them.
- [ ] Zero raw CLI element refs (e.g. `#a4b2c`) appear in any file under a test directory or `*.spec.ts`.
- [ ] Any selector handed off to `playwright-test` is written as `getByRole/Label/Placeholder/Text/TestId`, not a ref.

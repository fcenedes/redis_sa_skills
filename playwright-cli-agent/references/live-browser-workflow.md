# Live Browser Workflow

Step-by-step workflows for operating a web app via Playwright CLI.

## 1. Open the App

```bash
playwright-cli open http://localhost:3000 --headed
```

Headed mode lets a human or the agent observe what the browser does. Headless is fine for screenshot-only runs in CI but worse for debugging.

## 2. Navigate to the Target Screen

```bash
playwright-cli goto http://localhost:3000/login
```

If the app requires auth, log in first. Reuse a stored session when possible to keep the loop tight.

## 3. Reproduce the Issue

- Take a snapshot to get refs for the elements on screen.
- Drive the flow step by step: `click <ref>`, `fill <ref> "..."`, `press Enter`.
- Observe DOM, console, and network state at each meaningful checkpoint.

## 4. Capture Evidence

Whenever the screen changes meaningfully:

```bash
playwright-cli screenshot
```

Record alongside each screenshot:

- The URL (`document.location.href` or the URL after the navigation).
- The visible state in plain words ("after submit, sees `Invalid credentials`").
- Console errors and notable network responses.
- The relevant element refs (so a follow-up step can interact with them).

## 5. Inspect Code Only After Reproducing

Resist the urge to read source first. Reproducing the bug live tells you which component, route, or API actually drives the failure. Once reproduced:

1. Note the failing endpoint or rendered component.
2. Search the codebase for the relevant identifier.
3. Read just enough code to diagnose.

## Common Flows

### Login Flow Reproduction

1. `playwright-cli open http://localhost:3000 --headed`
2. `playwright-cli goto http://localhost:3000/login`
3. Snapshot → refs for email, password, submit.
4. `playwright-cli fill <email-ref> "user@example.com"`
5. `playwright-cli fill <password-ref> "wrong-password"`
6. `playwright-cli click <submit-ref>`
7. `playwright-cli screenshot` → confirm the error banner.
8. Record: URL, error text, console, network response.

### Redis Insight Plugin Iframe

1. Open Redis Insight: `playwright-cli open http://localhost:5540 --headed`.
2. Navigate to Workbench.
3. Run a Redis command that matches your plugin's `matchCommands`.
4. Switch to the plugin visualization tab.
5. Snapshot the **iframe** — refs are scoped to it.
6. Screenshot to verify rendering.
7. Capture any `[PLUGIN_NAME]` console logs.

### Responsive Layout Check

1. Open with a viewport flag (or resize via tooling).
2. Screenshot at each breakpoint (e.g. 1440, 1024, 768, 375).
3. Note clipping, overlap, or hidden elements at each width.
4. Save screenshots with width-suffixed names if uploading to an issue.

### Visual Regression Spot Check

1. Capture "before" screenshot from the deployed/old build.
2. Reproduce the same flow on the new build.
3. Capture "after" screenshot.
4. Diff manually or attach both to the PR description.

## Handoff to playwright-test

When live exploration is done, hand the findings to `playwright-test`:

- Stable URL(s) for navigation.
- Semantic locators for each interaction (translate refs to `getByRole/Label/Text`).
- Known network calls to mock with `page.route`.
- Expected web-first assertions (`toBeVisible`, `toHaveURL`, `toHaveText`).
- Edge cases to cover (error states, slow network, permissions).

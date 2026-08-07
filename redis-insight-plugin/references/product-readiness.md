# Internal Plugin Product Readiness

Apply this audit after loading the checked-out RedisInsight skills. It captures
cross-cutting failure classes from productizing Workbench plugins without
freezing RedisInsight's current file layout or commands here.

## 1. Host Conventions

- Inspect a current sibling plugin before creating structure or imports.
- Follow the checked-out `frontend`, `code-quality`, and Redis UI component
  skills for component folders, exports, styling, layout primitives, and theme
  tokens.
- Route UI imports through the wrappers required by the checkout. Do not import
  raw `@redis-ui/*` packages when `uiSrc` wrappers are the repository contract.
- Remove dead configuration, unused exports, obsolete styles, and unenforced
  limits before review.

## 2. Parser and Response Matrix

Derive tests from command grammar and response modes, not one sample command.
Cover every applicable dimension:

| Dimension | Required cases |
|---|---|
| Modifiers | Each modifier, legal combinations, order, duplicates, missing values |
| Response metadata | Inserted scores, payloads, sort keys, hashes, distances, coordinates |
| Content | Normal, empty, no-content, malformed, missing fields |
| Tokens | Quoted/empty tokens and names equal to option keywords |
| Precedence | Valid fallback when one optional syntax form is malformed |
| Scale | Large result sets and payloads without argument spreading |

Preserve raw values and units until the visualization deliberately converts
them. Make empty results distinct from malformed results. Use
[redis-command-parsing.md](redis-command-parsing.md) for detailed patterns.

## 3. Visualization Runtime

- Use the checkout's Redis UI primitives and semantic theme tokens.
- Deduplicate React and ReactDOM in the internal development/Vite runtime.
- Exercise the plugin in both light and dark themes.
- Validate third-party library inputs and bounds before invoking the library.
- Dispose listeners, layers, observers, and library instances on updates and
  unmounts; prevent callbacks from capturing stale state.
- Render mode-specific empty and error messages.

## 4. E2E Execution

- Read the current Playwright configuration and prove the spec is under an
  active project's `testDir`.
- Use the repository command's list/collection mode to show the test is
  discovered before accepting a green run as evidence.
- Follow the checked-out `e2e-testing` skill for page objects, fixtures,
  navigation, selectors, and waits.
- Give the test a unique database name and keys. Avoid `FLUSHDB`, shared global
  cleanup, and state that prevents parallel execution.
- Assert actual rendered semantics. When design-system components change DOM
  roles, update the page object to match the real accessible/visible output.

## 5. Typecheck and Baselines

- Run the package-scoped typecheck and focused unit/component specs first.
- Follow the checked-out `type-check-baselines` skill for any recorded baseline.
- Treat a changed baseline as a reviewed artifact with an explained cause.
- Do not refresh a baseline solely to make CI green.

## 6. Packaging Parity

When plugin packaging or dependencies change:

1. Find every script that installs, builds, or copies static plugins.
2. Verify equivalent inclusion on every supported platform path, including
   Unix shell and Windows command scripts when both exist.
3. Inspect the built package/manifest in the produced static-plugin location.
4. Smoke test the packaged application, not only the development server.

## Evidence Gate

Do not declare the internal plugin ready until the current session proves:

- Checked-out upstream skill set and sibling package inspected.
- Parser/response matrix tests pass.
- Playwright test is collected, isolated, and passes.
- Both themes render and the runtime uses one React/ReactDOM instance.
- Package typecheck and applicable baseline checks pass.
- Every supported packaging path contains the plugin and its runtime assets.

---
name: redis-insight-plugin
description: Use when creating, modifying, debugging, deploying, or testing Redis Insight Workbench visualization plugins, plugin manifests, package.json visualizations, activationMethod functions, redisinsight-plugin-sdk usage, Parcel/Vite plugin builds, iframe rendering, Redis command parsing, Docker RedisInsight deployment, /api/plugins verification, or Playwright plugin validation.
compatibility: Requires Node.js, Parcel or Vite, and Docker for RedisInsight deployment validation.
license: MIT
metadata:
  author: redis
  version: "1.0.0"
---
# Redis Insight Workbench Plugin

Build, deploy, and validate Redis Insight Workbench visualization plugins. Plugins render inside an iframe in Workbench and visualize the result of a Redis command. Trigger this skill for plugin manifests, `package.json` `visualizations`, `activationMethod` functions, `redisinsight-plugin-sdk` usage, Parcel/Vite plugin builds, iframe rendering, Redis command parsing, Docker RedisInsight deployment, `/api/plugins` verification, and Playwright plugin tests.

Use `redis-product-ui` for every visual plugin UI. RedisInsight plugins use the RedisInsight product theme pair: `light` / `dark`, not `light2` / `dark2`.

Official source-of-truth references:

- https://github.com/redis/RedisInsight/tree/main/docs/plugins
- https://github.com/redis/RedisInsight/blob/main/docs/plugins/development.md
- https://github.com/redis/RedisInsight/blob/main/docs/plugins/installation.md

See [references/official-docs-summary.md](references/official-docs-summary.md) for a condensed summary.

## Authority

- Authorized: scaffold, build, and validate Redis Insight Workbench plugins.
- Not authorized: deploy to production without confirmation or run destructive Redis commands.
- Assessment-only default: for plugin review or debugging requests, report findings unless implementation is requested.

## First Decision: Plugin Type

Decide before scaffolding anything else: **external standalone** (Parcel, installed into `~/.redis-insight/plugins/<name>/`, default for almost every customer or demo plugin) or **internal monorepo** (Vite, lives inside `RedisInsight/redisinsight/ui/src/packages/<plugin-name>/`, only when the work is in the RedisInsight repo itself). Getting this wrong produces the wrong folder layout and build tool for the rest of the workflow.

See [references/external-parcel-plugin.md](references/external-parcel-plugin.md) for the external folder layout, Parcel config, and bundling rules, or [references/internal-vite-plugin.md](references/internal-vite-plugin.md) for the internal path and Vite config.

## Required Manifest

`package.json` must declare the plugin entrypoints and non-empty `visualizations`
array. Every visualization needs `id`, `name`, `activationMethod`,
`matchCommands`, `description`, and `default`; `activationMethod` must exactly
match an exported function name in the bundle. See
[references/plugin-manifest.md](references/plugin-manifest.md) for examples,
multi-visualization exports, and deployed-manifest stripping.

## Activation Function Contract

Every activation function must find the host element, validate props, wrap render
logic in `try/catch`, render empty/error states, and log with a plugin-specific
prefix. See [references/error-handling.md](references/error-handling.md).

## RedisInsight Product UI Contract

Every plugin UI must follow RedisInsight product styling:

- Load `redis-product-ui` when creating or changing plugin UI.
- Use RedisInsight `light` / `dark` product themes from `redis-product-ui`.
- For standalone external plugins, emulate the RedisInsight product tokens with local CSS variables; do not import RedisInsight monorepo internals or `@redis-ui/*`.
- Detect iframe theme through `theme_LIGHT` / `theme_DARK` body classes or SDK theme helpers.
- Use compact product components: table, toolbar, segmented states, empty/error/loading panels, badges, and inspector-style details.
- Keep Redis brand red for brand moments only; do not use it as the default plugin CTA, heading, error, or status color.

See [references/redisinsight-product-ui.md](references/redisinsight-product-ui.md) and use [templates/external-styles.scss](templates/external-styles.scss) as the baseline `src/styles/styles.scss`.

## Mandatory Phased Workflow

These three phases are mandatory verification gates, not a tutorial. Each phase
proves a specific contract: iframe wiring, React mounting, then visualization
library integration. Skipping a phase means skipping its proof; the next phase
will fail in ways that are harder to diagnose.

See [references/iterative-development.md](references/iterative-development.md) and the templates in `templates/`.

## Review Hardening Loop

Before asking for review, run a small adversarial pass against the exact surfaces the plugin touches:

- Manifest matching/defaults: exact command boundaries, no default visualization conflicts, no regex backtracking traps.
- Redis command parsing: token-aware option handling, raw-unit preservation, malformed rows, empty rows, keyword-like key/member names.
- Visualization state: stale closures, safe Leaflet bounds, large result sets, mode-specific empty/error copy.
- Tests: red regression first, then the smallest package/component/parser test set that proves the fix.

See [references/review-hardening.md](references/review-hardening.md).

## Build and Verify

Run the project build, verify declared bundle files exist, confirm
`process.env` is absent from Parcel output, and grep the bundle for every
`activationMethod`. Use the exact commands in
[references/testing-and-deployment.md](references/testing-and-deployment.md).

## Deploy

External plugins deploy to `~/.redis-insight/plugins/<plugin-name>/` with
`package.json` and `dist/`. Restart Redis Insight and verify `/api/plugins`
contains the plugin `name` and visualizations. See
[references/testing-and-deployment.md](references/testing-and-deployment.md).

## Security Rules

- Plugins execute code in the Insight UI process. Only ship code you control or trust.
- Never embed secrets, tokens, or credentials in the bundle.
- No hidden network calls. Document any outbound HTTP and prefer none.
- Default to read-only Redis commands (`XRANGE`, `GEOSEARCH`, `INFO`, `FT.SEARCH`). Never run destructive commands (`FLUSHDB`, `DEL`, `UNLINK`, `XTRIM`, `CLUSTER RESET`, `CONFIG SET`) without explicit user request and confirmation.

## DO NOT

- DO NOT skip Phase 1 or Phase 2; each catches a different class of failure.
- DO NOT deploy `index.js` / `styles.css` at the plugin root. They live in `dist/` and the manifest points at `./dist/...`.
- DO NOT set `default: true` on a visualization unless the user asked for it.
- DO NOT include `scripts` or `devDependencies` in the deployed manifest. Strip them before copying.
- DO NOT use Vite for standalone external plugins. Use Parcel.
- DO NOT import from `uiSrc/`, `@redis-ui/*`, or any RedisInsight monorepo internal in a standalone plugin.
- DO NOT externalize React in a standalone plugin bundle. Bundle React and ReactDOM.
- DO NOT style plugin UI with ad hoc inline brand colors. Use RedisInsight product UI variables/classes.
- DO NOT use `light2` / `dark2` for RedisInsight plugins; those are for other Redis product UIs.
- DO NOT skip `/api/plugins` verification after deploying.
- DO NOT ship `process.env.*` references in the bundle. Replace at build time.
- DO NOT assume one Redis response shape — `XRANGE`, `GEOSEARCH WITH...`, and `GEORADIUS` return very different structures. See [references/redis-command-parsing.md](references/redis-command-parsing.md).

## Final Checklist

Each item must be answerable yes/no by inspection or command output, not by impression:
Each item must be proved by a command output or file read from this session, not by memory or prior conversation.

- [ ] Build tool matches plugin type: `yarn build` used Parcel for external, or the monorepo's Vite config for internal — confirm by reading the `scripts.build` entry actually invoked.
- [ ] `cat package.json` shows `main`, `styles`, and a non-empty `visualizations` array with `id`, `name`, `activationMethod`, `matchCommands`, `description`, `default` on every entry.
- [ ] For every `activationMethod` value, `grep -o "<name>" dist/index.js` returns at least one match.
- [ ] Phase 1 render, Phase 2 render, and Phase 3 render were each observed working (screenshot, console log, or manual check) before starting the next phase.
- [ ] Plugin UI uses `redis-product-ui` `light`/`dark` tokens (not `light2`/`dark2`) — confirm by grepping the CSS/SCSS for theme class names.
- [ ] Review hardening pass ran against manifest matching, command parsing, and visualization state, with at least one new/updated test.
- [ ] `test -f dist/index.js && test -f dist/styles.css` both succeed, and `grep -c "process.env" dist/index.js` prints `0`.
- [ ] Plugin files exist under `~/.redis-insight/plugins/<name>/` (or the Docker-mounted equivalent) — confirm with `ls`.
- [ ] `curl -s http://localhost:5540/api/plugins` output contains the plugin's `name` and its `visualizations` list.
- [ ] Workbench was run against a matching Redis command and the visualization rendered (not the default table view).
- [ ] Empty-data and error-thrown cases were triggered manually and rendered the defensive empty/error state, not a blank iframe.
- [ ] Playwright smoke test run, if present, with the actual pass/fail output checked (not assumed).

## Reference Index

| File | Load When |
|------|-----------|
| [official-docs-summary.md](references/official-docs-summary.md) | Need the canonical contract from Redis Insight docs. |
| [redis-insight-plugin-guidelines.md](references/redis-insight-plugin-guidelines.md) | Need the long-form operational reference. |
| [external-parcel-plugin.md](references/external-parcel-plugin.md) | Building a standalone plugin with Parcel. |
| [internal-vite-plugin.md](references/internal-vite-plugin.md) | Building inside the RedisInsight monorepo with Vite. |
| [plugin-manifest.md](references/plugin-manifest.md) | Writing or stripping `package.json` manifests. |
| [iterative-development.md](references/iterative-development.md) | Phase 1/2/3 templates and pipeline. |
| [redisinsight-product-ui.md](references/redisinsight-product-ui.md) | Applying RedisInsight product UI inside plugin iframes. |
| [review-hardening.md](references/review-hardening.md) | Pre-review checklist for matcher, parser, Leaflet state, and scoped regression tests. |
| [testing-and-deployment.md](references/testing-and-deployment.md) | Deploy paths, Docker workaround, `/api/plugins`, Playwright. |
| [redis-command-parsing.md](references/redis-command-parsing.md) | Parsing `GEOSEARCH` / `GEORADIUS` / `XRANGE` responses. |
| [third-party-libraries.md](references/third-party-libraries.md) | Leaflet, markercluster, heatmap, custom `.d.ts`. |
| [error-handling.md](references/error-handling.md) | Defensive render, ErrorBoundary, log prefixes. |

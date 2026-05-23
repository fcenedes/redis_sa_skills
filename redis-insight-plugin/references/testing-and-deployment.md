# Testing and Deployment

How to deploy and verify a Redis Insight plugin, and how to smoke test it with Playwright.

## Correct External Deployment Structure

```
~/.redis-insight/plugins/<plugin-name>/
  package.json               # deployed manifest (no scripts, no devDependencies)
  dist/
    index.js
    styles.css
```

That's it. Nothing else is required at deploy time.

## Wrong Structures (Common Mistakes)

```
# WRONG — bundle at plugin root
~/.redis-insight/plugins/<plugin-name>/
  package.json
  index.js                   # should be in dist/
  styles.css                 # should be in dist/
```

```
# WRONG — nested package folder
~/.redis-insight/plugins/<plugin-name>/
  <plugin-name>/             # extra directory
    package.json
    dist/
```

```
# WRONG — manifest still has dev/scripts
{
  "main": "./dist/index.js",
  "scripts": { "build": "..." },        # remove
  "devDependencies": { "parcel": "..." } # remove
}
```

## Deploy Commands

External (host install):

```bash
yarn build
bash templates/verify-plugin.sh
bash templates/deploy-external.sh
```

Inside Docker RedisInsight:

```bash
yarn build
bash templates/verify-plugin.sh
bash templates/deploy-internal-docker.sh
```

## Docker RedisInsight: Static Plugin Path

External plugin deployment to `~/.redis-insight/plugins/<name>/` works for the host install — that is the canonical path and the one to default to.

For Docker, the host plugins folder is not visible inside the container. To install a plugin into a running `redis/redisinsight` container, copy it into the container's static plugins folder:

```
/usr/src/app/redisinsight/api/dist/static/plugins/<plugin-name>/
```

Workflow:

```bash
docker cp dist redisinsight-test:/usr/src/app/redisinsight/api/dist/static/plugins/<plugin-name>/dist
docker cp package.json redisinsight-test:/usr/src/app/redisinsight/api/dist/static/plugins/<plugin-name>/package.json
docker restart redisinsight-test
```

Then verify via `/api/plugins`. The deploy script in `templates/deploy-internal-docker.sh` automates this.

## /api/plugins Verification

After every deploy:

```bash
curl -s http://localhost:5540/api/plugins | jq '.[] | {name, visualizations}'
```

The plugin must appear by `name`, with each declared `visualizations[*].id`. If absent:

- The plugin folder is wrong, or
- The manifest is invalid (missing required field), or
- Insight wasn't restarted (Docker case).

## Browser Console Verification

Open the Workbench iframe in browser devtools:

- Filter logs by your `[<PLUGIN_PREFIX>]` prefix.
- Confirm `activated` log fires when running a matching command.
- Confirm no `process.env` errors, no `require is not defined`, no React mismatch.
- Inspect network calls — there should be none unless your plugin explicitly makes them.

## Playwright Smoke Test Strategy

Use [templates/playwright-plugin-smoke.spec.ts](../templates/playwright-plugin-smoke.spec.ts) as a starting point. The test:

1. Opens Redis Insight.
2. Connects to a configured database (or uses a pre-seeded session).
3. Navigates to Workbench.
4. Runs a command that matches the plugin's `matchCommands`.
5. Selects the plugin's visualization tab.
6. Asserts the iframe is present and renders expected content.

Selectors will drift between Insight versions. Treat the template as a starting point and adjust for the version under test.

## Internal PR Verification Scope

For RedisInsight monorepo plugin changes, keep verification proportional to the changed surface:

- Parser or command-shape fix: run the parser spec or package test file first, then the plugin package test command.
- Manifest or matcher fix: run the matcher/plugin utility spec that exercises `matchCommands`, `matchQuery`, `anyRegex`, `noneRegex`, and `default` selection.
- React/Leaflet fix: run the component spec for that visualization plus the package typecheck.
- Code hygiene fix: run the closest affected spec plus typecheck, especially when moving types/constants or centralizing helpers.
- Shared utility change under `ui/src/`: add the focused utility spec and a changed-file lint/typecheck check.
- Before final commit on a PR batch, run the package tests, package typecheck, and `git diff --check`. Run a full RedisInsight build only when build configuration, package exports, bundling, or shared application wiring changed.

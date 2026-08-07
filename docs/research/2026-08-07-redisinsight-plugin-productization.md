# RedisInsight plugin productization: lessons from PRs #5922, #5970, and #5995

Date: 2026-08-07

## Decision

Keep `redis_sa_skills/redis-insight-plugin` as a **thin SA-facing router and external-plugin adapter**, not as a copy of RedisInsight's internal development rules.

- When work happens **inside the RedisInsight repository**, the local skill should direct the agent to the checked-out RedisInsight [`.ai/skills/redis-insight-plugin`](https://github.com/redis/RedisInsight/tree/0b53c6c2fac260ab2d1b439ee23ea6554d9ce8f4/.ai/skills/redis-insight-plugin) and its sibling skills. RedisInsight explicitly calls `.ai/skills/` its single source of truth for AI development rules ([`.ai/README.md`](https://github.com/redis/RedisInsight/blob/0b53c6c2fac260ab2d1b439ee23ea6554d9ce8f4/.ai/README.md)).
- Keep only durable Redis SA concerns locally: choosing internal versus standalone delivery, external Parcel packaging/deployment, safety guardrails, and a short product-readiness gate distilled below.
- Do **not** replace the skill with only a bare URL. A small router is still useful when an SA is working outside the RedisInsight checkout, especially for standalone customer/demo plugins. Do not vendor the upstream skill tree or duplicate its internal conventions.

The current local skill is [`redis-insight-plugin/SKILL.md`](../../redis-insight-plugin/SKILL.md). The upstream skill was added after the geodata work in [PR #6010](https://github.com/redis/RedisInsight/pull/6010) and has since evolved with the repository (for example, the package-manager migration in [commit `0e2bdba`](https://github.com/redis/RedisInsight/commit/0e2bdba06c3cc033167edbc67f1a389ab7f3bd31)). That evolution is exactly why internal rules should remain upstream-owned.

## What the three PRs show

### PR #5922: working feature plus substantial first-pass hardening

[PR #5922](https://github.com/redis/RedisInsight/pull/5922) introduced the geodata Workbench plugin on a feature branch: native GEO map/heatmap/inspector views, opt-in Redis Query Engine GEO/GEOSHAPE views, Leaflet/OpenStreetMap integration, query-aware visualization matching, API schema changes, Vite/static packaging, unit tests, and a Playwright path. The PR reported 52 changed files and documented package, API, UI, typecheck, build-static, and Chromium E2E checks.

This was not a toy prototype. Its review sequence already exposed reusable failure classes: visualization matcher boundaries and default conflicts, malformed/empty coordinates, keyword-like tokens, Redis 8 hybrid rows, command option parsing, unit preservation, empty results, stale/memoized rendering, and user-facing error copy. The final PR-head commit list records those fixes directly ([PR #5922 commits](https://github.com/redis/RedisInsight/pull/5922/commits)); the resulting manifest and parser tests are visible at [`geodata/package.json`](https://github.com/redis/RedisInsight/blob/4c631f524623d41c5b8121a737cc59faf5fe1aa6/redisinsight/ui/src/packages/geodata/package.json), [`geoParser.spec.ts`](https://github.com/redis/RedisInsight/blob/4c631f524623d41c5b8121a737cc59faf5fe1aa6/redisinsight/ui/src/packages/geodata/src/utils/geoParser.spec.ts), and [`rqeGeoParser.spec.ts`](https://github.com/redis/RedisInsight/blob/4c631f524623d41c5b8121a737cc59faf5fe1aa6/redisinsight/ui/src/packages/geodata/src/utils/rqeGeoParser.spec.ts).

Reusable lesson: the skill's existing adversarial matcher/parser/state loop is justified. Product readiness requires a command/response **matrix**, not one happy-path sample.

### PR #5970: conform to the host repository before polishing behavior

[PR #5970](https://github.com/redis/RedisInsight/pull/5970) was deliberately described as a behavior-preserving refactor. It reorganized the plugin to RedisInsight's component-per-folder convention, split monolithic types and constants by concern, moved `GeodataMode` into plugin-shell types, resolved spec TypeScript errors, reformatted the result, and refreshed the API typecheck baseline. The PR states that all 99 unit tests and a package-scoped `tsc --noEmit` passed after each commit.

Reusable lesson: an internal plugin is normal RedisInsight product code. Before feature polish, align folder structure, types, exports, styling, tests, and typecheck-baseline handling with the host repository. This should be a named gate, not review cleanup.

### PR #5995: product integration, test discoverability, edge semantics, and release parity

[PR #5995](https://github.com/redis/RedisInsight/pull/5995) rolled the stacked feature branch into `main`. The important additions after #5970 were:

- Replace hand-built UI with Redis UI primitives and themed styled-components for banners, headings/layout, tables, cards, buttons, and sliders; remove the CSS made obsolete by the migration ([Redis UI migration commits in PR #5995](https://github.com/redis/RedisInsight/pull/5995/commits)).
- Route Redis UI imports through RedisInsight's `uiSrc` wrappers rather than importing `@redis-ui/*` directly ([commit `5ed1159`](https://github.com/redis/RedisInsight/commit/5ed1159b06d59218be75edab79dfb16b3f80cdef)).
- Make the development playground use one React/ReactDOM instance and support light/dark theme selection ([commit `b200c2e`](https://github.com/redis/RedisInsight/commit/b200c2e839c16a32234e9f059f20a898ed7a89f9)).
- Preserve `WITHDIST`/`WITHHASH` results without `WITHCOORD`, parse `FT.SEARCH` metadata flags, handle `NOCONTENT`, and prefer a valid in-query GEO predicate when a `GEOFILTER` is malformed ([commit `eb6fa23`](https://github.com/redis/RedisInsight/commit/eb6fa236f930e1af3f690b03f2864a07a659f7c2), [commit `27710f3`](https://github.com/redis/RedisInsight/commit/27710f35c4cfa404cc3cbba80ba3670953143154)).
- Move the E2E spec into an active Playwright project directory after a rebase; otherwise it would silently never run. The test was safe for parallel execution because it used its own database/key and no global cleanup ([commit `ce7aae4`](https://github.com/redis/RedisInsight/commit/ce7aae48e958bdf9068772bda21a84e883ac3603)).
- Replace brittle heading-role assumptions with a dedicated iframe/page-object component that models the actual rendered UI ([commit `89226cf`](https://github.com/redis/RedisInsight/commit/89226cfa7e615145862ef9ed161f3e13e238b5c1)).
- Mirror static-plugin install/copy steps in the Windows build script so the plugin ships on every supported build path ([commit `1570b18`](https://github.com/redis/RedisInsight/commit/1570b185593f51881ad5287f27896642667ee07d)).

Reusable lesson: “tests exist” is insufficient. Product readiness also proves that tests are discovered, isolated, and based on actual UI semantics; that parsers cover modifier-dependent response shapes; and that every platform's packaging path ships the plugin.

## What to add or clarify in the local skill

The local skill already has strong external-plugin guidance, phased iframe/React/library validation, matcher/parser hardening, defensive states, bundle checks, deployment checks, and security guardrails. Add only the gaps below, preferably as a compact upstream-routing section plus one reference page:

1. **Upstream authority gate.** Inside RedisInsight, load the repository's plugin skill first and let it override generic/local internal guidance.
2. **Mandatory sibling-skill gate for internal work.** Load upstream [`frontend`](https://github.com/redis/RedisInsight/blob/0b53c6c2fac260ab2d1b439ee23ea6554d9ce8f4/.ai/skills/frontend/SKILL.md), [`code-quality`](https://github.com/redis/RedisInsight/blob/0b53c6c2fac260ab2d1b439ee23ea6554d9ce8f4/.ai/skills/code-quality/SKILL.md), [`testing`](https://github.com/redis/RedisInsight/blob/0b53c6c2fac260ab2d1b439ee23ea6554d9ce8f4/.ai/skills/testing/SKILL.md), and [`e2e-testing`](https://github.com/redis/RedisInsight/blob/0b53c6c2fac260ab2d1b439ee23ea6554d9ce8f4/.ai/skills/e2e-testing/SKILL.md), plus the Redis UI component skill exposed by the checkout. Do not restate those documents locally.
3. **Host-convention gate.** For internal packages: component-per-folder; separate `.styles.ts`, `.types.ts`, and `.spec.tsx`; named exports/barrels; design-system layout primitives; semantic theme tokens; and `uiSrc` wrappers rather than raw `@redis-ui/*` imports. The current upstream plugin skill makes these rules explicit ([upstream `SKILL.md`](https://github.com/redis/RedisInsight/blob/0b53c6c2fac260ab2d1b439ee23ea6554d9ce8f4/.ai/skills/redis-insight-plugin/SKILL.md)).
4. **Parser matrix gate.** Derive cases from every command modifier and response mode, including modifier combinations, inserted metadata, no-content/empty/malformed forms, fallback precedence, and preservation of raw values/units.
5. **E2E execution gate.** Verify the file belongs to an active Playwright `testDir`; use the upstream page-object/fixture pattern; make data unique; avoid `FLUSHDB`/global cleanup; and prove the test is actually collected before treating a green run as evidence.
6. **Development runtime gate.** Internal Vite configuration must deduplicate React/ReactDOM; exercise the playground in light and dark themes.
7. **Release parity gate.** When static packaging changes, inspect every supported packaging script (at least Unix and Windows in RedisInsight) and verify the built package/manifest is copied in each path.
8. **Typecheck-baseline gate.** Run the package-scoped typecheck and follow upstream [`type-check-baselines`](https://github.com/redis/RedisInsight/blob/0b53c6c2fac260ab2d1b439ee23ea6554d9ce8f4/.ai/skills/type-check-baselines/SKILL.md); do not refresh baselines casually.

## Suggested streamlined shape

The local `SKILL.md` can remain short:

1. Decide **internal RedisInsight contribution** versus **external standalone SA plugin**.
2. Internal: delegate to the checked-out upstream plugin skill and named sibling skills; retain only the eight product-readiness gates above as an audit checklist.
3. External: keep the local Parcel, bundle, manifest, deployment, `/api/plugins`, safety, and phased-render workflow.
4. Put long operational details in references/templates, but remove duplicated internal RedisInsight conventions and geodata-specific examples that upstream has already generalized.

This preserves the local skill's field-engineering value while preventing two copies of RedisInsight's fast-changing internal architecture, package-manager commands, UI system, and Playwright layout from drifting apart.

## Implementation validation

On 2026-08-07, five fresh-context control agents handled the same internal
plugin product-readiness scenario without loading this skill. All five produced
reasonable generic implementation checklists, but none routed first to the
checked-out RedisInsight skill suite. Across the controls, the omitted gates
included explicit Playwright collection, isolated E2E data, React deduplication,
typecheck-baseline discipline, and Unix/Windows packaging parity.

Five separate fresh-context agents then handled the scenario with the updated
`redis-insight-plugin` skill. All five selected the internal route, required the
checked-out upstream plugin and sibling skills, loaded the local readiness
audit, and included parser matrices, collected/isolated E2E, theme/runtime,
typecheck-baseline, and packaging-parity evidence. A separate external-plugin
scenario retained the Parcel, bundled-runtime, phased-render, deployment, and
`/api/plugins` workflow.

Static verification also passed with `quick_validate.py`,
`bash scripts/validate-skills.sh` (17 skills, 0 errors, 0 warnings), and
`git diff --check`.

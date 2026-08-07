# Internal RedisInsight Plugin

Use this route only inside a RedisInsight checkout for a plugin that ships with
the product under `redisinsight/ui/src/packages/`.

## Source of Authority

Read the checkout's `.ai/skills/redis-insight-plugin/SKILL.md` before changing
files. Load the sibling skills it names, including the current `frontend`,
`code-quality`, `testing`, `e2e-testing`, `type-check-baselines`, and Redis UI
component guidance. Those files override this fallback when they conflict.

Do not copy their current commands or folder rules into this repository. They
change with RedisInsight and must remain upstream-owned.

If the checkout does not contain the skills:

1. Report that repository-convention guidance is degraded.
2. Inspect the closest current internal plugin package and shared Vite config.
3. Use Vite through the repository's existing package/build entry points.
4. Apply [product-readiness.md](product-readiness.md).
5. Do not claim full convention compliance until the upstream rules are
   available or a RedisInsight maintainer confirms the fallback.

## Stable Invariants

- Keep the package inside `redisinsight/ui/src/packages/<plugin-name>/`.
- Reuse the repository's shared build, UI wrappers, themes, tests, and aliases.
- Copy a current sibling package structure instead of inventing one.
- Include the plugin in every product packaging path that ships static plugins.
- Keep customer/demo plugins external and follow
  [external-parcel-plugin.md](external-parcel-plugin.md).

## DO NOT

- DO NOT treat this fallback as newer than the checked-out `.ai/skills`.
- DO NOT add a standalone Parcel build inside RedisInsight.
- DO NOT import raw `@redis-ui/*` packages when the checkout requires `uiSrc`
  wrappers.
- DO NOT assume a green test ran unless the test file was collected.
- DO NOT update a typecheck baseline merely to silence a failure.

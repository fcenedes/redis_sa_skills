---
name: redis-insight-plugin
description: Use when creating, modifying, debugging, deploying, or testing Redis Insight Workbench visualization plugins, plugin manifests, package.json visualizations, activationMethod functions, redisinsight-plugin-sdk usage, Parcel/Vite plugin builds, iframe rendering, Redis command parsing, Docker RedisInsight deployment, /api/plugins verification, or Playwright plugin validation.
license: MIT
metadata:
  author: redis
  version: "1.1.0"
---
# Redis Insight Workbench Plugin

Build, deploy, and validate Workbench visualization plugins. Choose the source
of authority first: RedisInsight owns internal product code; this skill owns standalone field and customer plugins.

## Authority

- Authorized: scaffold, build, and validate Workbench plugins.
- Not authorized: deploy to production without confirmation or run destructive
  Redis commands.
- Assessment-only default: report findings for review/debug requests unless the
  user requests implementation.

## First Decision: Delivery Target

### Internal RedisInsight contribution

Use this route only when the plugin lives under
`redisinsight/ui/src/packages/` in a RedisInsight checkout.

1. Read the checked-out `.ai/skills/redis-insight-plugin/SKILL.md` first; see
   the [upstream skill suite](https://github.com/redis/RedisInsight/tree/main/.ai/skills).
2. Load its required sibling skills. At minimum, check `frontend`,
   `code-quality`, `testing`, `e2e-testing`, `type-check-baselines`, and the
   Redis UI component skill exposed by that checkout.
3. Treat those checked-out skills as authoritative for layout, imports,
   package-manager commands, test structure, and build integration.
4. Apply [product-readiness.md](references/product-readiness.md) as an
   additional audit distilled from shipped plugin work.

If the checked-out skills are unavailable, report degraded guidance, use
[internal-vite-plugin.md](references/internal-vite-plugin.md) plus the readiness
audit, and do not claim full repository-convention compliance.

### External standalone plugin

Use this route for customer, demo, and field plugins installed under
`~/.redis-insight/plugins/<name>/`.

- Build with Parcel and bundle React, ReactDOM, and every runtime dependency.
- Do not import `uiSrc/`, `@redis-ui/*`, or other RedisInsight internals.
- Start with [external-parcel-plugin.md](references/external-parcel-plugin.md)
  and the templates in `templates/`.

## External Plugin Contracts

Require `package.json` fields `name`, `version`, `description`, `main`,
`styles`, and a non-empty `visualizations` array. Require `id`, `name`,
`activationMethod`, `matchCommands`, `description`, and `default` on every
visualization. Set `default: false` unless explicitly requested. Make every
`activationMethod` exactly match a function in the bundle's default export.
See [plugin-manifest.md](references/plugin-manifest.md).

Make every activation function find `#app`, validate props, catch render
errors, render empty/error states, and log with a plugin-specific prefix. See
[error-handling.md](references/error-handling.md).

For visual work, use `redis-product-ui` with RedisInsight `light` / `dark`
themes. Emulate product tokens locally; never import monorepo UI packages.
Start from [external-styles.scss](templates/external-styles.scss).

## Mandatory External Build Phases

1. Vanilla DOM: prove activation, props, and iframe wiring.
2. React: prove typed mounting and raw-result rendering.
3. Visualization: add the real library, parser, and UX.

Observe each phase working before starting the next. Use
[iterative-development.md](references/iterative-development.md).

## Hardening and Verification

Before review, test exact command boundaries, mutually exclusive defaults,
token-aware parsing, modifier-dependent response shapes, malformed/empty data,
large results, stale visualization state, and mode-specific errors. Use
[review-hardening.md](references/review-hardening.md) and
[redis-command-parsing.md](references/redis-command-parsing.md).

For internal work, also prove host conventions, active and isolated E2E
collection, React/theme integrity, typecheck-baseline discipline, and packaging
parity with [product-readiness.md](references/product-readiness.md).

For external work, run the project build, then verify bundle files,
`activationMethod` names, and zero `process.env` references with
`templates/verify-plugin.sh`. Deploy with the matching template, restart Redis
Insight, and confirm `/api/plugins` lists the plugin and its visualizations. See
[testing-and-deployment.md](references/testing-and-deployment.md).

## Security

- Ship only trusted code; never embed credentials or secrets.
- Make no hidden network calls. Document every outbound HTTP dependency.
- Default to read-only Redis commands.
- Require explicit user request and confirmation before destructive commands
  such as `FLUSHDB`, `DEL`, `UNLINK`, `XTRIM`, `CLUSTER RESET`, or `CONFIG SET`.

## DO NOT

- DO NOT apply local internal conventions when checked-out upstream skills are
  available; upstream wins on conflicts.
- DO NOT claim internal readiness without proving E2E collection and every
  supported packaging path affected by the change.
- DO NOT use Vite for an external plugin or Parcel for an internal package.
- DO NOT import RedisInsight internals or externalize React in a standalone
  bundle.
- DO NOT skip external Phase 1 or Phase 2.
- DO NOT set overlapping visualizations as defaults.
- DO NOT parse command options with raw substring searches.
- DO NOT deploy dev scripts or `devDependencies` in an external manifest.
- DO NOT ship `process.env.*` references or skip `/api/plugins` verification.
- DO NOT use `light2` / `dark2`; RedisInsight uses `light` / `dark`.

## Final Checklist

Prove each applicable item with command output or a file read from this session:

- [ ] Delivery target selected before scaffolding.
- [ ] Internal: checked-out plugin and sibling skills loaded, or degraded mode
      reported explicitly.
- [ ] Internal: readiness audit passes for host conventions, parser matrix,
      collected/isolated E2E, runtime themes, typecheck, and packaging parity.
- [ ] External: Parcel build, manifest, exports, three phases, product theme,
      bundle checks, deployment path, and `/api/plugins` verified.
- [ ] Matching Workbench command renders the intended visualization.
- [ ] Empty, malformed, and thrown-error states render defensively.
- [ ] Focused tests and the repository quality gate pass.

## References

| File | Load when |
|---|---|
| [product-readiness.md](references/product-readiness.md) | Auditing internal product readiness. |
| [internal-vite-plugin.md](references/internal-vite-plugin.md) | Upstream skills are missing or choosing internal delivery. |
| [external-parcel-plugin.md](references/external-parcel-plugin.md) | Building a standalone plugin. |
| [redis-insight-plugin-guidelines.md](references/redis-insight-plugin-guidelines.md) | Troubleshooting the long-form external workflow. |
| [redisinsight-product-ui.md](references/redisinsight-product-ui.md) | Adapting product UI inside an external iframe. |
| [plugin-manifest.md](references/plugin-manifest.md) | Writing or stripping manifests. |
| [iterative-development.md](references/iterative-development.md) | Running the external three-phase workflow. |
| [review-hardening.md](references/review-hardening.md) | Testing matcher, parser, and visualization failure classes. |
| [testing-and-deployment.md](references/testing-and-deployment.md) | Deploying and verifying runtime loading. |
| [third-party-libraries.md](references/third-party-libraries.md) | Integrating visualization libraries. |
| [official-docs-summary.md](references/official-docs-summary.md) | Checking the stable plugin contract. |

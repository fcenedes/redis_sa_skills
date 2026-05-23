# Source Of Truth

Use three levels of authority:

| Level | Source | Use For |
| --- | --- | --- |
| Official brand | `https://brand.redis.io/`, `redis-brand-ui` | Logo, official Redis colors, marketing typography, brand tone, brand accessibility rules |
| Product UI reference | `https://redislabsdev.github.io/redis-ui/` | Application components, product layout, product semantic tokens, light/dark product UI behavior |
| Inferred implementation | Published Storybook bundles and rendered stories | Token names, component prop names, state patterns, spacing scale when visible in the public build |

## Rules

- Say "Storybook-derived" for values extracted from the public Redis UI build.
- Say "official Redis brand" only when `brand.redis.io` confirms it.
- When brand and product guidance differ, choose by surface:
  - marketing/docs hero: `redis-brand-ui`
  - product shell/dashboard/plugin/admin UI: `redis-product-ui`
  - mixed branded product demo: use `redis-product-ui` layout with `redis-brand-ui` brand moments
- Do not copy minified bundle source into generated apps or skills.

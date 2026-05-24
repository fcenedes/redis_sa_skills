# Tokens

Product UI tokens are derived from the public Redis UI Storybook build.

## Theme Selection

Redis UI Storybook exposes two theme pairs with different product intent:

- Use `light` and `dark` for RedisInsight components and RedisInsight-like surfaces.
- Use `light2` and `dark2` for other Redis products, Redis Cloud-style dashboards, admin tools, and new product demos.
- Do not mix `light` with `dark2`, or `light2` with `dark`, in the same UI.
- If the product surface is ambiguous, default to `light2`/`dark2` unless the request explicitly targets RedisInsight.

## Typography

```css
@import url("https://fonts.googleapis.com/css2?family=Geist:wght@300..700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;600&display=swap");

:root {
  font-size: 62.5%;
  --redis-ui-font-body: "Geist", "Geist Sans", sans-serif;
  --redis-ui-font-legacy-body: "Nunito Sans", sans-serif;
  --redis-ui-font-code: "Source Code Pro", monospace;
}
```

Use `Geist` for current Redis UI product components. Use `Source Code Pro` for Redis commands, keys, IDs, timestamps, code, and compact technical values. `Nunito Sans` appears in the public Storybook chrome and legacy Redis UI theme values; use it only when matching an older product surface.

## Spacing

Use the product spacing scale: `0`, `0.1rem`, `0.2rem`, `0.4rem`, `0.8rem`, `1.2rem`, `1.6rem`, `2rem`, `2.4rem`, `3.2rem`, `4rem`, `4.4rem`, `4.8rem`, `6.4rem`.

## Redis Product Light2/Dark2 Palette

Use `light2` and `dark2` for non-RedisInsight Redis product surfaces. The raw
families are:

| Family | Scale |
| --- | --- |
| neutral | `#ffffff`, `#fafaf9`, `#f8f8f8`, `#e6e6e6`, `#d1d3d4`, `#bcbec0`, `#a7a9ac`, `#939598`, `#6d6e71`, `#58595b`, `#414042`, `#282828` |
| primary | `#eaf6ff`, `#afd7ff`, `#8cc4fc`, `#52a9ff`, `#0091ff`, `#0070f3`, `#0060d1`, `#064ea2`, `#0a4481`, `#0d3868`, `#0f3058`, `#10243e` |
| secondary | `#ffffff`, `#fcfcfc`, `#f3f3f3`, `#e9e9e9`, `#d9d9d9`, `#b9c2c6`, `#8a99a0`, `#5c707a`, `#2d4754`, `#163341`, `#0d212c`, `#091a23`, `#07151c` |
| success | `#f0fdf4`, `#dcfce7`, `#bbf7d0`, `#86efac`, `#4ade80`, `#22c55e`, `#16a34a`, `#15803d`, `#166534`, `#14532d`, `#052e16` |
| notice | `#f5f3ff`, `#ede9fe`, `#ddd6fe`, `#c4b5fd`, `#a78bfa`, `#8b5cf6`, `#7c3aed`, `#6d28d9`, `#5b21b6`, `#4c1d95`, `#2e1065` |
| informative | `#f0f9ff`, `#e0f2fe`, `#bae6fd`, `#7dd3fc`, `#38bdf8`, `#0ea5e9`, `#0284C7`, `#0369a1`, `#075985`, `#0c4a6e`, `#082f49` |
| attention | `#fff8e1`, `#fef3c7`, `#fde68a`, `#facc15`, `#f59e0b`, `#d97706`, `#b45309`, `#92400e`, `#78350f`, `#65280c`, `#4a0d03` |
| danger | `#fff1f1`, `#fee2e2`, `#fecaca`, `#fca5a5`, `#f87171`, `#ef4444`, `#dc2626`, `#b91c1c`, `#991b1b`, `#7f1d1d`, `#450a0a` |
| discovery | `#FEE1F1`, `#FCCAE4`, `#FA94CA`, `#F75FAF`, `#F42995`, `#D90B78`, `#AF0961`, `#830748`, `#570430`, `#2C0218`, `#13010B` |

In `dark2`, the raw families are the same, but semantic mappings use dark backgrounds such as `secondary990` (`#07151c`) and light text such as `secondary50` (`#fcfcfc`).

## RedisInsight Light Palette

Use this palette with the Storybook `light` theme when targeting RedisInsight
components or RedisInsight-like surfaces.

| Family | Scale |
| --- | --- |
| neutral | `#ffffff`, `#fafbfb`, `#f4f6f7`, `#eaedf2`, `#c1cbd9`, `#8094b1`, `#4d6992`, `#01112a`, `#121212`, `#0a0a0a` |
| primary | `#f5f8ff`, `#e8ebec`, `#d0f1ff`, `#40a5cd`, `#006e9b`, `#163341`, `#091a23`, `#061457` |
| secondary | `#f9fafa`, `#f4f5f6`, `#e8ebec`, `#b9c2c6`, `#8a99a0`, `#5c707a`, `#2d4754`, `#163341`, `#091a23` |
| success | `#eff9f5`, `#bde8d7`, `#8cd7b9`, `#5bc69b`, `#3a8365`, `#244f3e`, `#12281f` |
| notice | `#f1edfc`, `#c8b5f2`, `#9e7ee8`, `#7547de`, `#52329b`, `#2f1c59`, `#170e2c` |
| informative | `#f5f8ff`, `#e8ebec`, `#f2fbff`, `#40a5cd`, `#006e9b`, `#163341`, `#091a23`, `#061457` |
| attention | `#fff7ea`, `#ffdfaa`, `#ffc76b`, `#ffaf2b`, `#a06c18`, `#664611`, `#332309` |
| danger | `#fcebec`, `#f5c3c5`, `#ea878a`, `#dc373c`, `#b02c30`, `#6e1c1e`, `#2c0b0c` |
| discovery | `#FEE1F1`, `#FCCAE4`, `#FA94CA`, `#F75FAF`, `#F42995`, `#D90B78`, `#AF0961`, `#830748`, `#570430`, `#2C0218`, `#13010B` |

## RedisInsight Dark Palette

Use this palette with the Storybook `dark` theme when targeting RedisInsight
components or RedisInsight-like surfaces.

| Family | Scale |
| --- | --- |
| neutral | `#121212`, `#1a1a1a`, `#000000`, `#3a3a3a`, `#4a4a4a`, `#5a5a5a`, `#cacaca`, `#dbdbdb`, `#f6f6f6`, `#ffffff` |
| primary | `#2e2e2e`, `#404040`, `#002f47`, `#00587d`, `#80dbff`, `#40a5cd`, `#f6f6f6`, `#f7f7f7` |
| secondary | `#f9fafa`, `#f4f5f6`, `#e8ebec`, `#b9c2c6`, `#8a99a0`, `#5c707a`, `#2d4754`, `#163341`, `#091a23` |
| success | `#12281f`, `#244f3e`, `#3a8365`, `#5bc69b`, `#8cd7b9`, `#bde8d7`, `#eff9f5` |
| notice | `#170e2c`, `#2f1c59`, `#52329b`, `#7547de`, `#9e7ee8`, `#c8b5f2`, `#f1edfc` |
| informative | `#2e2e2e`, `#404040`, `#002f47`, `#00587d`, `#80dbff`, `#40a5cd`, `#f6f6f6`, `#f7f7f7` |
| attention | `#3c2a14`, `#5a3e1f`, `#7a5d29`, `#a47e3a`, `#c79a4b`, `#e7c05a`, `#f3d77f` |
| danger | `#4a2a2a`, `#6a3a3a`, `#8a4a4a`, `#b96b6b`, `#d17b7b`, `#e68a8a`, `#f29a9a` |
| discovery | same as light |

Use `transparent` for extracted `#00000000` entries; do not list them as visible colors.

## Focus

Use a visible 2px focus outline. In Redis UI tokens, focus resolves through the active theme primary color; verify contrast in both modes.

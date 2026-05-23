# Tokens

Product UI tokens are derived from the public Redis UI Storybook build.

## Typography

```css
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;600&display=swap");

:root {
  font-size: 62.5%;
  --redis-ui-font-body: "Nunito Sans", sans-serif;
  --redis-ui-font-code: "Source Code Pro", monospace;
}
```

Use `Nunito Sans` for headings, body, labels, controls, and table UI. Use `Source Code Pro` for Redis commands, keys, IDs, timestamps, code, and compact technical values.

## Spacing

Use the product spacing scale: `0`, `0.1rem`, `0.2rem`, `0.4rem`, `0.8rem`, `1.2rem`, `1.6rem`, `2rem`, `2.4rem`, `3.2rem`, `4rem`, `4.4rem`, `4.8rem`, `6.4rem`.

## Light Palette

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

## Dark Palette

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

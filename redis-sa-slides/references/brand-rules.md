# Brand rules

Inherited from /redis-slides. Update this file when redis-slides brand rules change.

Use these rules for every Redis SA deck, including TDD, POC, architecture review, QBR, and ROI/TCO decks.

## Brand palette

| Name | Hex | Use |
|------|-----|-----|
| Hyper (Redis red) | `#FF4438` | Primary brand accent, key highlights, decisive calls to action |
| Midnight | `#091A23` | Dark backgrounds, body text on light slides, high-contrast technical content |
| Dusk | `#163341` | Secondary dark backgrounds, section dividers, supporting UI blocks |
| Dusk 30% | `#B9C2C6` | Muted text, divider lines, inactive table or chart elements |
| White | `#FFFFFF` | Light backgrounds, text on dark slides, whitespace |
| Sky Blue | `#80DBFF` | Chart accent, diagram highlight, neutral comparison signal |
| Yellow | `#DCFF1E` | Chart accent, value highlight, positive metric callout |
| Purple | `#C795E3` | Chart accent, secondary diagram path, comparative series |

## Typography

- Use Space Grotesk for headlines, subheads, body text, tables, and labels.
- Use Space Grotesk Regular for body text.
- Use Space Grotesk Medium or Semi-bold for headings, table headers, and callouts.
- Use Space Mono for code snippets, Redis commands, keys, field names, metrics labels, and technical tags.
- Do not use other fonts in generated decks unless the source template already contains a locked brand asset.

## Voice rules

- Sentence case for titles. Capitalize only the first word and proper nouns.
- No em dashes. Use commas, colons, or parentheses.
- No exclamation points. Replace them with periods.
- Use "fast". Do not substitute quick, rapid, real-time, or agile.
- Use concise field language: apps, devs, and docs.
- Use first person "we" when referring to Redis in customer-facing copy.
- Do not use puns or wordplay on the Redis name.
- Use "Redis Community Edition", not "open source".
- Use the tagline "See how fast feels" only on title or closing slides.
- Do not use the retired cube graphic. Use the Redis "R" mark or proprietary icons.

## Customer color handling

- Customer colors may override secondary accent colors in charts, diagrams, highlights, and customer-specific callouts.
- Customer colors must not override Hyper, Midnight, or White.
- Keep Redis red visible as the primary Redis signal even when the customer has a strong brand color.
- Use customer colors sparingly in mixed Redis/customer architecture diagrams so ownership and responsibility remain clear.
- Confirm customer colors from user input, customer brand material, or a current public source before applying them.
- If a customer color reduces contrast, use it only as a thin accent and keep text on Redis palette colors.
- Do not infer a customer color from an unconfirmed logo candidate.

## Pre-ship checklist

- [ ] Palette uses only Redis brand colors plus confirmed customer accent colors.
- [ ] Hyper `#FF4438`, Midnight `#091A23`, and White `#FFFFFF` remain fixed brand colors.
- [ ] Titles use sentence case.
- [ ] No em dashes or exclamation points remain.
- [ ] Copy uses "fast" instead of quick, rapid, real-time, or agile.
- [ ] Redis Community Edition is named correctly.
- [ ] Tagline appears only on title or closing slides.
- [ ] No retired cube graphic appears.
- [ ] Space Grotesk is used for prose and Space Mono is used for code or technical labels.
- [ ] Customer colors are confirmed and limited to accents, charts, diagrams, or highlights.

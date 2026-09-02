# Drive assets

Use these Google Drive assets when building Redis SA Slides decks. Treat every asset as a source asset: copy or read it, but do not edit it directly during customer deck creation.

| Asset | Drive ID | Purpose |
|-------|----------|---------|
| SA Template Deck | `1hdBvaelnijuz-9mPnVIZ72f6sD_HO5WGzyFCTXh7f0g` | Master Redis-branded Google Slides deck. Copy this to start every new customer deck. |
| SA Slide Bank | `1fPJUJYfHhz7CwKAJbYT5Tb89zRvhUNMMe7w3DgcXohE` | Reusable SA slide bank. Copy slides by speaker-notes tag, for example `[SA-BANK:tdd-scorecard]`. |
| Technical Diagram Toolkit | `1p7Z3-VCsRZqEZVx1P8P2trmM8bzN6AT3_XOn7wOU72Y` | Google Slides-native icons, node blocks, connectors, and diagram shapes. |

## Pre-use gates

All three Drive assets are provisioned. The SA Template Deck and SA Slide Bank were created 2026-09-02 by copying the Redis Rebrand 2025 Google Slides Template (`1ONed_6eENDZeQ05WMEuJEhfv1TmSIN15x_DoS4wjwvg`).

**If asset IDs change:**

1. Replace the Drive ID in the table above.
2. Verify the new deck is accessible and contains the expected slides.
3. For the SA Slide Bank, confirm all `[SA-BANK:*]` tags in speaker notes match `sa-slide-catalog.md`.

**At runtime:** if any Drive ID in the table above cannot be read, the skill must stop and report the inaccessible asset instead of attempting to build a deck.

## Maintenance

### SA Template Deck

Update the template deck when global deck structure changes, including title, agenda, divider, closing, master layouts, typography, fixed Redis colors, or required placeholder fields. Existing customer decks do not need a catalog update when only the template changes.

Catalog update required: no.

### SA Slide Bank

Update the slide bank when adding, replacing, retiring, or reordering reusable customer-facing slides. Every bank slide must keep its first speaker-notes line as a stable `[SA-BANK:{category}-{variant}]` tag.

Catalog update required: yes, whenever a slide tag, category, description, slide index, or availability changes.

### Technical Diagram Toolkit

Update the toolkit when adding or improving reusable Google Slides-native icons, node blocks, arrow styles, deployment shapes, or light/dark diagram components. Prefer additive updates so existing diagram instructions remain valid.

Catalog update required: only when redis-sa-slides references a specific toolkit shape, diagram pattern, or slide index by name.

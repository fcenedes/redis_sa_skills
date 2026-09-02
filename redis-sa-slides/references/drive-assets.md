# Drive assets

Use these Google Drive assets when building Redis SA Slides decks. Treat every asset as a source asset: copy or read it, but do not edit it directly during customer deck creation.

| Asset | Drive ID | Purpose |
|-------|----------|---------|
| SA Template Deck | `USER_PROVIDED_REQUIRED` | Master Redis-branded Google Slides deck. Copy this to start every new customer deck. |
| SA Slide Bank | `USER_PROVIDED_REQUIRED` | Reusable SA slide bank. Copy slides by speaker-notes tag, for example `[SA-BANK:tdd-scorecard]`. |
| Technical Diagram Toolkit | `1p7Z3-VCsRZqEZVx1P8P2trmM8bzN6AT3_XOn7wOU72Y` | Google Slides-native icons, node blocks, connectors, and diagram shapes. |

## Pre-use gates

The SA Template Deck and SA Slide Bank must be created manually on Google Drive before this skill can build decks. These are intentional post-skill-build prerequisites, not bugs.

**Before first use:**

1. Upload `template.pptx` to Google Drive as a Google Slides deck. Copy the Drive file ID and replace the `USER_PROVIDED_REQUIRED` value in the SA Template Deck row above.
2. Create a new Google Slides deck for the SA Slide Bank. Populate it with reusable slides tagged per `sa-slide-catalog.md`. Copy the Drive file ID and replace the `USER_PROVIDED_REQUIRED` value in the SA Slide Bank row above.
3. Verify the Technical Diagram Toolkit ID is still accessible.

**At runtime:** if either `USER_PROVIDED_REQUIRED` placeholder remains, the skill must stop and report the missing asset instead of attempting to build a deck.

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

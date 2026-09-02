---
name: redis-sa-slides
description: Build customer-facing SA decks (TDD, POC plans, architecture reviews, QBRs, ROI/TCO) in Google Slides from a curated slide bank on Google Drive. Use when an SA needs a Redis-branded presentation with customer logo, architecture diagrams, value scorecards, or phased implementation slides.
license: MIT
metadata:
  author: redis
  version: "1.0.0"
---
# Redis SA Slides

Build customer-facing Redis SA decks in Google Slides from the SA Template Deck, SA Slide Bank, and Technical Diagram Toolkit. Use Google Slides API operations directly; do not create a PPTX intermediate.

## Authority

- Authorized: assess deck needs, propose outlines, copy the SA Template Deck into a new working deck, copy tagged bank slides, replace text, insert confirmed logos, create simple GSlides-native diagrams, add speaker notes, and run QA on the new deck.
- Requires explicit user request: create or share a Google Slides deck, use customer-provided confidential data, fetch logos from the web, delegate complex diagrams, or change Drive sharing permissions.
- Assessment-only default: when the user asks for review, planning, or advice, report findings and stop unless deck edits or deck creation are explicitly requested.
- Read-only assets: treat the SA Template Deck, SA Slide Bank, and Technical Diagram Toolkit as source assets. Copy or read them only.

## Required Workflow

1. Parse intent: classify the deck as TDD, POC plan, POC results, architecture review, QBR, ROI/TCO, or custom.
2. Confirm customer setup: capture customer name, domain, logo preference, customer accent color, audience, meeting date, and confidentiality constraints.
3. Load Drive asset IDs from [drive-assets.md](references/drive-assets.md) and verify the template, bank, and toolkit are readable.
4. Plan the deck: produce a slide-by-slide outline that names template slides, `[SA-BANK:*]` tags, custom slides, diagrams, expected data, and gaps.
5. Confirm the plan with the user before building or changing Drive content.
6. Build the deck: copy the SA Template Deck, copy selected bank slides by catalog tag, replace placeholders, insert confirmed logo assets, and create custom slides only where the bank has no suitable slide.
7. Run the diagram pass: use GSlides toolkit shapes for simple diagrams; delegate complex diagrams according to the decision tree.
8. Add speaker notes in `SOURCE:`, `INTENT:`, `LOGIC:` format for every content slide. Skip title, divider, anthem, and closing slides.
9. Run the slide-count and QA pass: cut filler, merge repetitive slides, check placeholders, brand voice, logo placement, diagrams, speaker notes, and TDD rubric needs.
10. Deliver the Google Slides link, QA findings, remaining `[TODO: ...]` gaps, and the evidence used for completion claims.

## Customer Logo Flow

1. Ask for or infer the customer domain; do not guess when multiple companies could match.
2. Try `https://img.logo.dev/{domain}?token=...&format=png` when a logo.dev token is available.
3. Show the candidate logo to the user and wait for confirmation before embedding it.
4. If logo.dev fails, ask before using web search for a transparent SVG or PNG candidate.
5. If no confirmed logo is available, leave `[TODO: customer logo]` on the title slide and report the gap. Do not embed generic, stale, or lookalike logos.

## Diagram Decision Tree

- Use GSlides-native shapes from the Technical Diagram Toolkit when the diagram has 8 or fewer shapes and simple connections.
- Use `redis-lucidchart-diagrams` when the customer or SA needs an editable Lucid handoff.
- Use `redis-excalidraw-diagrams` by default for complex topology, dense technical evidence, or standalone architecture visuals; embed the rendered PNG in Slides.
- Read [diagram-decision-tree.md](references/diagram-decision-tree.md) before building or delegating diagrams with complex topology, editable handoff, or multi-slide architecture flow.

## Brand Rules

- Use Redis brand assets, palette, typography, and voice from [brand-rules.md](references/brand-rules.md).
- Use sentence case for titles; use Space Grotesk for prose and Space Mono for code or technical labels.
- Use Hyper red, Midnight, and White as fixed brand colors. Customer colors may accent diagrams, charts, or highlights only.
- Use `fast`; avoid quick, rapid, real-time, and agile as substitutes.
- Use the tagline `See how fast feels` only on title or closing slides.
- Mark missing numbers, claims, or customer details as `[TODO: ...]`; do not invent them.

## DO NOT

- Do not edit the SA Template Deck, SA Slide Bank, or Technical Diagram Toolkit directly.
- Do not create PPTX, Reveal.js, HTML, or Apps Script outputs for this workflow.
- Do not build from scratch when the Drive template or slide bank is unavailable; report the missing asset and stop.
- Do not embed a logo, customer color, quote, metric, or confidential detail without user confirmation or source material.
- Do not use fonts outside Space Grotesk and Space Mono.
- Do not use colors outside the Redis palette plus confirmed customer accent colors.
- Do not use the retired cube graphic, puns, em dashes, exclamation points, or generic unsupported claims.
- Do not leave placeholder remnants such as `Lorem ipsum`, `XX%`, `$XXM`, `Firstname Lastname`, `Presenter name`, or template instruction badges in final decks.
- Do not store API tokens, credentials, customer data, downloaded logos, screenshots, generated decks, or binary artifacts in the skill repository.

## Verification

Before declaring a deck complete, prove each applicable item with current tool output, extracted slide text, visual inspection, or user confirmation:

- [ ] New deck was created from a copy of the SA Template Deck; no PPTX intermediate exists.
- [ ] Every bank slide came from a cataloged `[SA-BANK:*]` tag and preserved the tag in speaker notes.
- [ ] Customer logo was shown to the user and confirmed before embedding, or `[TODO: customer logo]` remains with the gap reported.
- [ ] Brand voice passes: sentence case titles, zero em dashes, zero exclamation points, `fast` preferred, approved fonts and colors only.
- [ ] Content slides contain `SOURCE:`, `INTENT:`, and `LOGIC:` notes.
- [ ] TDD, POC, and ROI claims use quantified inputs or visible `[TODO: need metric]` markers.
- [ ] Diagrams use the correct tool path and have been visually checked for layout, labels, and broken assets.
- [ ] Final text extraction has no unresolved placeholders except explicitly reported user-content gaps.
- [ ] Customer accent colors do not override Hyper red, Midnight, or White.
- [ ] The delivered Drive link and QA summary identify open gaps, assumptions, and source evidence.

## Reference Index

| File | Load When |
|------|-----------|
| [drive-assets.md](references/drive-assets.md) | Always before accessing the template, slide bank, or Technical Diagram Toolkit. |
| [sa-slide-catalog.md](references/sa-slide-catalog.md) | Planning or copying bank slides by `[SA-BANK:*]` tag. |
| [brand-rules.md](references/brand-rules.md) | Always before writing, styling, or QA-checking slide content. |
| [diagram-decision-tree.md](references/diagram-decision-tree.md) | Choosing between GSlides-native, Excalidraw, and Lucidchart diagrams. |
| [deck-archetypes.md](references/deck-archetypes.md) | Building TDD, POC, architecture review, QBR, ROI/TCO, or custom outlines. |
| [tdd-quality-rubric.md](references/tdd-quality-rubric.md) | Building or reviewing TDD, POC results, and ROI/TCO decks. |
| [logo-lookup.md](references/logo-lookup.md) | Fetching, confirming, and embedding customer logos. |

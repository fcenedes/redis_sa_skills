# Diagram decision tree

Use this routing before creating Redis SA Slides architecture diagrams.

## Decision

```text
Diagram has 8 or fewer shapes and simple connections?
  Yes -> Build directly in Google Slides with Technical Diagram Toolkit shapes.
  No  -> Does the customer or SA need editable Lucid handoff?
           Yes -> Use /redis-lucidchart-diagrams.
           No  -> Use /redis-excalidraw-diagrams by default, render PNG, embed in Slides.
```

## Google Slides-native diagrams

Use Google Slides-native diagrams for compact diagrams with 8 or fewer shapes, simple labels, and simple line or arrow connections.

Build steps:

1. Open the Technical Diagram Toolkit asset from `drive-assets.md`.
2. Copy the required icons, node blocks, Redis components, deployment shapes, and connector styles from the toolkit.
3. Paste them into the target slide.
4. Position shapes on a clean grid with enough whitespace for labels.
5. Connect shapes with toolkit lines or arrows.
6. Match light or dark toolkit variants to the slide theme.
7. Visually inspect the slide for alignment, readable labels, broken assets, and connector clarity.

## Excalidraw default

Use `/redis-excalidraw-diagrams` for diagrams with more than 8 shapes when no editable Lucid handoff is required. This is the default for complex topology, multi-system flows, dense technical evidence, or standalone architecture visuals.

Embed the rendered PNG in Google Slides and keep the diagram source or handoff link in speaker notes when available.

## Lucidchart handoff

Use `/redis-lucidchart-diagrams` when the customer, SA, or delivery team needs an editable Lucidchart artifact after the deck is delivered.

Embed an image export in Google Slides and include the Lucidchart link in speaker notes or delivery notes when sharing is approved.

## Guardrails

- Do not hand-draw complex diagrams in Slides when a delegated diagram skill is the clearer path.
- Do not delegate simple 8-shape diagrams that can be assembled cleanly from the Technical Diagram Toolkit.
- Do not embed generated diagram images without a visual check.
- Do not change source toolkit slides while building a customer deck.

# Epic E2: Drive assets and templates

## Objective

Create reference files for Google Drive integration: asset IDs, logo lookup workflow, diagram decision tree, and copy-ready deck outline template.

## Dependencies

- E1 complete (SKILL.md exists for cross-references)

## Task E2.T1: Write drive-assets.md

- Objective: document the 3 Google Drive assets with IDs and maintenance instructions
- Worker role: Implementor
- Preferred worker/provider: Claude Code
- Requested model/model class: Sonnet-class
- Requested reasoning effort: low
- Why this is sufficient: structured data transcription from spec, no judgment needed
- Owned files: `redis-sa-slides/references/drive-assets.md`
- Forbidden files: all other skill directories
- Inputs: design spec Drive Assets section
- Steps:
  1. Create `redis-sa-slides/references/` directory
  2. Write `drive-assets.md` with 3-row table: SA Template Deck (`[TODO: upload template.pptx to Drive and paste ID here]`), SA Slide Bank (`[TODO: create bank deck and paste ID here]`), Technical Diagram Toolkit (`1p7Z3-VCsRZqEZVx1P8P2trmM8bzN6AT3_XOn7wOU72Y`)
  3. Add maintenance instructions: how to update each asset, what requires catalog update
- Verify with:
  ```bash
  ls redis-sa-slides/references/drive-assets.md
  grep -c 'TODO' redis-sa-slides/references/drive-assets.md  # should be 2 (template + bank)
  grep -c '1p7Z3' redis-sa-slides/references/drive-assets.md  # should be 1 (toolkit ID)
  ```
- Done evidence: file exists, 2 TODO placeholders, 1 real Drive ID

## Task E2.T2: Write logo-lookup.md and diagram-decision-tree.md

- Objective: document logo API + fallback flow and diagram complexity decision tree
- Worker role: Implementor
- Preferred worker/provider: Claude Code
- Requested model/model class: Sonnet-class
- Requested reasoning effort: low
- Why this is sufficient: transcription from spec decision trees
- Owned files: `redis-sa-slides/references/logo-lookup.md`, `redis-sa-slides/references/diagram-decision-tree.md`
- Forbidden files: all other skill directories
- Inputs: design spec Logo Flow and Diagram Decision Tree sections
- Steps:
  1. Write `logo-lookup.md`: logo.dev API endpoint, token placeholder, response handling, web search fallback, user confirmation gate
  2. Write `diagram-decision-tree.md`: ≤8 shapes → GSlides, >8 shapes → Excalidraw (default) or Lucid (if editable handoff). Reference both `/redis-excalidraw-diagrams` and `/redis-lucidchart-diagrams` by name. Include GSlides diagram building instructions (copy from Toolkit, position, connect)
- Verify with:
  ```bash
  ls redis-sa-slides/references/logo-lookup.md
  ls redis-sa-slides/references/diagram-decision-tree.md
  grep -c 'logo.dev' redis-sa-slides/references/logo-lookup.md
  grep -c 'excalidraw' redis-sa-slides/references/diagram-decision-tree.md
  grep -c 'lucidchart' redis-sa-slides/references/diagram-decision-tree.md
  ```
- Done evidence: both files exist, reference correct tools

## Task E2.T3: Write deck-outline-tdd.md template

- Objective: create a copy-ready TDD deck outline in templates/
- Worker role: Implementor
- Preferred worker/provider: Claude Code
- Requested model/model class: Sonnet-class
- Requested reasoning effort: low
- Why this is sufficient: structured template from spec archetype
- Owned files: `redis-sa-slides/templates/deck-outline-tdd.md`
- Forbidden files: all other skill directories
- Inputs: design spec TDD Deck archetype
- Steps:
  1. Create `redis-sa-slides/templates/` directory
  2. Write `deck-outline-tdd.md` with: slide number, purpose, bank tag reference, placeholder fields for customer name/date/presenter, notes on which slides are optional
- Verify with:
  ```bash
  ls redis-sa-slides/templates/deck-outline-tdd.md
  grep -c 'SA-BANK' redis-sa-slides/templates/deck-outline-tdd.md  # should reference bank tags
  ```
- Done evidence: file exists, references bank tags

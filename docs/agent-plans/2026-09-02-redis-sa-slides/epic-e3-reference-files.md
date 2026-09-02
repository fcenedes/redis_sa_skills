# Epic E3: Reference content files

## Objective

Create the 4 content-heavy reference files: brand rules, slide catalog, deck archetypes, and TDD quality rubric.

## Dependencies

- E1 complete (SKILL.md exists for cross-references)

## Parallelizable with

- E2 (disjoint file sets)

## Task E3.T1: Write brand-rules.md

- Objective: document Redis brand palette, voice rules, typography — inherited from /redis-slides
- Worker role: Implementor
- Preferred worker/provider: Claude Code
- Requested model/model class: Sonnet-class
- Requested reasoning effort: low
- Why this is sufficient: transcription from redis-slides reference material, no judgment
- Owned files: `redis-sa-slides/references/brand-rules.md`
- Forbidden files: all other skill directories, redis-slides skill files (read-only reference)
- Inputs:
  - redis-slides `references/brand-voice.md` (95 lines)
  - redis-slides SKILL.md Brand Palette and Typography sections
  - Design spec Brand Rules section
- Steps:
  1. Write `brand-rules.md` combining:
     - Brand palette table (8 colors with hex, usage)
     - Voice rules (10 hard rules from brand-voice.md)
     - Typography (Space Grotesk, Space Mono)
     - Customer color handling rules
     - Pre-ship checklist
  2. Attribute source: "Inherited from /redis-slides. Update this file when redis-slides brand rules change."
- Verify with:
  ```bash
  ls redis-sa-slides/references/brand-rules.md
  grep -c '#FF4438' redis-sa-slides/references/brand-rules.md  # Hyper red present
  grep -c 'Space Grotesk' redis-sa-slides/references/brand-rules.md
  grep -c 'Sentence case' redis-sa-slides/references/brand-rules.md
  ```
- Done evidence: file exists, contains palette, voice, typography

## Task E3.T2: Write sa-slide-catalog.md

- Objective: document all 20 bank categories with tags, slide types, descriptions
- Worker role: Implementor
- Preferred worker/provider: Claude Code
- Requested model/model class: Sonnet-class
- Requested reasoning effort: medium
- Why this is sufficient: structured catalog from spec, but needs judgment on tag naming and descriptions
- Owned files: `redis-sa-slides/references/sa-slide-catalog.md`
- Forbidden files: all other skill directories
- Inputs: design spec SA Slide Bank Categories table + reference deck analysis
- Steps:
  1. Write `sa-slide-catalog.md` with:
     - Tag format documentation: `[SA-BANK:{category}-{variant}]` in speaker notes first line
     - Full table: category #, name, tag examples, slide types, description, source deck(s)
     - Example tags for each category (e.g., `[SA-BANK:title-customer]`, `[SA-BANK:tdd-scorecard-workstream]`, `[SA-BANK:roi-tco-side-by-side]`)
  2. Include maintenance instructions: how to add a new slide to the bank
- Verify with:
  ```bash
  ls redis-sa-slides/references/sa-slide-catalog.md
  grep -c 'SA-BANK' redis-sa-slides/references/sa-slide-catalog.md  # many tag examples
  grep -c '|' redis-sa-slides/references/sa-slide-catalog.md  # table rows present
  ```
- Done evidence: file exists, 20 categories documented, tag examples for each

## Task E3.T3: Write deck-archetypes.md

- Objective: document 5 pre-built deck archetypes with slide-by-slide outlines
- Worker role: Implementor
- Preferred worker/provider: Claude Code
- Requested model/model class: Sonnet-class
- Requested reasoning effort: low
- Why this is sufficient: direct transcription from spec archetypes
- Owned files: `redis-sa-slides/references/deck-archetypes.md`
- Forbidden files: all other skill directories
- Inputs: design spec Deck Archetypes section (5 archetypes)
- Steps:
  1. Write `deck-archetypes.md` with 5 archetypes:
     - TDD Deck (~20-25 slides)
     - POC Results / Restitution (~15-20 slides)
     - Architecture Review (~10-15 slides)
     - QBR (~10-12 slides)
     - Business Case / ROI (~12-15 slides)
  2. Each archetype: slide list with bank tag references, which slides are optional, audience guidance
- Verify with:
  ```bash
  ls redis-sa-slides/references/deck-archetypes.md
  grep -c '## TDD' redis-sa-slides/references/deck-archetypes.md
  grep -c '## POC' redis-sa-slides/references/deck-archetypes.md
  grep -c '## Architecture' redis-sa-slides/references/deck-archetypes.md
  grep -c '## QBR' redis-sa-slides/references/deck-archetypes.md
  grep -c '## Business' redis-sa-slides/references/deck-archetypes.md  # 5 archetypes
  ```
- Done evidence: file exists, 5 archetype sections

## Task E3.T4: Write tdd-quality-rubric.md

- Objective: full TDD quality rubric with Before/After Architecture, Pain Validation, POC Plan Review
- Worker role: Implementor
- Preferred worker/provider: Claude Code
- Requested model/model class: Sonnet-class
- Requested reasoning effort: medium
- Why this is sufficient: substantial content but fully defined in brainstorming input; needs careful structuring
- Owned files: `redis-sa-slides/references/tdd-quality-rubric.md`
- Forbidden files: all other skill directories
- Inputs:
  - Design spec TDD Quality Rubric section
  - Full TDD rubric from brainstorming (user-provided "Technical Deep Dive" document)
- Steps:
  1. Write `tdd-quality-rubric.md` with full 4-section rubric:
     - Section 1: Before Architecture (current state) — stack, scale, pain with metrics, negative consequences with formulas
     - Section 2: After Architecture (proposed state) — Redis architecture, integration, migration, positive outcomes with metrics
     - Section 3: Technical Pain Validation — stakeholder confirmation, concrete requirements, proof points
     - Section 4: POC Plan Review — 8-point checklist with ANSWERED/PARTIAL/NOT ANSWERED scoring
  2. Include "How the skill uses the rubric" section explaining deck-building, POC results, and ROI/TCO applications
  3. Preserve the full detail from the user-provided rubric — this is the most valuable reference file
- Verify with:
  ```bash
  ls redis-sa-slides/references/tdd-quality-rubric.md
  grep -c '## 1\.' redis-sa-slides/references/tdd-quality-rubric.md  # Before Architecture
  grep -c '## 2\.' redis-sa-slides/references/tdd-quality-rubric.md  # After Architecture
  grep -c '## 3\.' redis-sa-slides/references/tdd-quality-rubric.md  # Pain Validation
  grep -c '## 4\.' redis-sa-slides/references/tdd-quality-rubric.md  # POC Plan Review
  grep -c 'ANSWERED' redis-sa-slides/references/tdd-quality-rubric.md  # scoring present
  ```
- Done evidence: file exists, all 4 sections present, POC checklist has 8 items with scoring

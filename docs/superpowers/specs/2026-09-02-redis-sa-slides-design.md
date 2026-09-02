# redis-sa-slides — Design Spec

**Date:** 2026-09-02
**Author:** Pierre Lambert
**Status:** Draft

## Purpose

A skill that lets Redis SAs build customer-facing Google Slides decks (TDD, POC plans, architecture reviews, QBRs, ROI/TCO business cases) from a curated slide bank on Google Drive, with automatic customer logo lookup and architecture diagram support.

## Approach

**Google Slides API-first.** No PPTX intermediate step. The Redis brand template lives on Google Drive as a Google Slides deck. The skill copies it, pulls slides from the SA Slide Bank, swaps content, embeds logos and diagrams, and delivers a shareable Google Slides link.

## Relationship to Existing Skills

| Skill | Relationship |
|-------|-------------|
| `/redis-slides` | Inherits brand palette, voice rules, typography, content rules. Does NOT inherit the PPTX workflow. |
| `/redis-excalidraw-diagrams` | Delegates complex standalone diagrams. Result embedded as PNG in slide. |
| `/redis-lucidchart-diagrams` | Delegates when customer/SA needs editable Lucid handoff. Result embedded as image or linked. |
| Google Drive Technical Diagram Toolkit | Source of GSlides-native shapes, icons, and node blocks for in-slide architecture diagrams. |

## Google Drive Assets

Three assets the skill references by Drive ID (stored in `references/drive-assets.md`):

| Asset | Type | Purpose |
|-------|------|---------|
| SA Template Deck | Google Slides | Master brand template (converted from `template.pptx`). Title, dividers, content layouts, closing. Copied to start every new deck. |
| SA Slide Bank | Google Slides | ~50-60 reusable SA slides organized by category dividers. Individual slides copied into working deck by tag. |
| Technical Diagram Toolkit | Google Slides | Existing deck (`1p7Z3-VCsRZqEZVx1P8P2trmM8bzN6AT3_XOn7wOU72Y`). Icons, shapes, node blocks for in-slide diagrams. |

SAs can update the bank without touching the skill — add slides to the bank deck, update the catalog reference.

## SA Slide Bank Categories

Each slide in the bank carries a tag in its speaker notes (first line, e.g., `[SA-BANK:tdd-scorecard]`) for programmatic reference. The skill reads speaker notes to match slides by tag. Tags use kebab-case within the category namespace: `[SA-BANK:{category}-{variant}]`.

| # | Category | Slide types |
|---|----------|------------|
| 1 | Title & Agenda | Customer-branded title, numbered agenda |
| 2 | Current State & Pains | Current architecture diagram, pain points list, stakeholder mapping |
| 3 | 3 Whys | Why anything / Why Redis / Why now — rich and condensed variants |
| 4 | Discovery | Discovery questions checklist, meeting notes capture |
| 5 | Value Proposition | Redis platform overview, capability grid, customer value matrix |
| 6 | Technical Scope | Master scope table (topic/success/metric), per-workstream breakdowns |
| 7 | Architecture Diagrams | GSlides-native: cluster, proxy, multi-tenant, AI pipeline, cache-aside, RDI, deployment options ring |
| 8 | Competitor Comparison | Head-to-head matrices (vs Hazelcast, Coherence, Elastic, Mongo, ElastiCache) with icon scoring |
| 9 | TDD / Value Scorecards | Key Metrics + Validated Scenarios paired tables, per workstream. Exit-criteria card template. |
| 10 | POC Plan | POC prerequisites, sizing, scenario chapters, timeline, owner assignment |
| 11 | POC Results / Restitution | KPI synthesis, performance charts, head-to-head operator comparison, verdict |
| 12 | Phased Implementation | Jumpstart → Adopt → Scale timeline, quarterly milestones, migration % targets |
| 13 | Future State / What Good Looks Like | Target architecture, deployment options, "what good looks like" |
| 14 | Mutual Action Plan | Action/Owner/Timeline table |
| 15 | Case Study / Reference | Challenge/Solution/Results template with metrics, quote, QR code. Customer-facing + presenter-notes pair. |
| 16 | Sizing & Pricing | Shard-based pricing table, sizing methodology, capacity planning, PS credits packages |
| 17 | Support & Governance | Support tier matrix, P1-P4 definitions, governance cadence, CSM role |
| 18 | Business Outcomes | ROI summary, projected benefits, cost reduction metrics |
| 19 | ROI / TCO Calculator | TCO side-by-side (current vs Redis), cost waterfall, ROI timeline, cost-per-operation, business case summary, downtime-cost formula |
| 20 | Closing & Next Steps | Thank you, next steps, contact info |

Source material for populating the bank: 6 reference decks (Slides Lab, Iris TDD Playbook, Nexi Riskshield TDD, Intesa TDD, Unicaja TDD, CNAF POC Restitution) plus the existing Technical Diagram Toolkit and Solutions Library.

## Skill Workflow

```
1. Parse intent       → Deck type: TDD, POC plan, architecture review, QBR, ROI, custom
2. Customer setup     → Fetch logo, customer color code (if provided)
3. Plan the deck      → Slide-by-slide outline: bank slides + template slides + custom content
4. Confirm plan       → User approves before building
5. Build deck         → Copy Template → copy bank slides → swap text → insert logo → build diagrams
6. Diagram pass       → Simple: GSlides shapes. Complex: delegate to Excalidraw/Lucid, embed PNG
7. Speaker notes      → SOURCE/INTENT/LOGIC format (from redis-slides)
8. Slide-count pass   → Cut filler, merge where possible
9. QA                 → Placeholders, brand voice, visual inspect
10. Deliver           → Share Drive link
```

## Customer Logo Flow

```
1. Try logo.dev API: https://img.logo.dev/{domain}?token=...&format=png
2. If found → show user for confirmation → embed in title slide and relevant slides
3. If not found → web search "{company} logo transparent svg/png"
4. Download candidate → show user → confirm before embedding
```

## Diagram Complexity Decision Tree

```
Diagram ≤ 8 shapes with simple connections?
  YES → Build with GSlides shapes from Technical Diagram Toolkit
  NO  → Customer needs editable Lucid handoff?
    YES → Delegate to /redis-lucidchart-diagrams, embed result
    NO  → Delegate to /redis-excalidraw-diagrams, render PNG, embed
```

For GSlides-native diagrams, the skill copies icon/block shapes from the Technical Diagram Toolkit deck, positions them in the target slide, and connects with lines/arrows. Uses the Toolkit's light/dark mode blocks as appropriate for the slide theme.

## Deck Archetypes

Pre-built outlines for common SA deck types. User says "build a TDD deck for {customer}" → skill loads archetype, customizes.

### TDD Deck (~20-25 slides)

```
1.  Title (customer branded)
2.  Agenda
3.  Current State + Pains (2-3 slides)
4.  3 Whys (Why anything / Why Redis / Why now)
5.  Value Proposition
6.  Technical Scope table
7.  Architecture: Current → Future State (2-3 slides)
8.  TDD Scorecards per workstream (2-4 slides)
9.  POC Plan + Timeline
10. Phased Implementation
11. Mutual Action Plan
12. Case Study / Reference (1-2 slides)
13. Pricing / Sizing
14. ROI / TCO Business Case (2-3 slides)
15. Next Steps
16. Closing
```

### POC Results / Restitution Deck (~15-20 slides)

```
1.  Title
2.  Agenda
3.  POC Objectives recap
4.  Methodology
5.  KPI Synthesis
6.  Results per workstream (3-5 slides with charts)
7.  Head-to-head comparison (if competitor displacement)
8.  Conclusions / Verdict
9.  Phased Implementation / Next Steps
10. Pricing
11. Support & Governance
12. Closing
```

### Architecture Review (~10-15 slides)

```
1.  Title
2.  Current Architecture (diagram)
3.  Pain Points
4.  Proposed Architecture (diagram)
5.  Component Deep-dive (2-3 slides)
6.  What Good Looks Like
7.  Migration Path
8.  Next Steps
```

### QBR (~10-12 slides)

```
1.  Title
2.  Relationship Summary
3.  Usage Metrics / Health
4.  Achievements This Quarter
5.  Roadmap / Upcoming
6.  Action Items
7.  Closing
```

### Business Case / ROI Deck (~12-15 slides)

```
1.  Title
2.  Executive Summary (1-slide verdict)
3.  Current State Costs (detailed breakdown)
4.  Redis Proposed Architecture (brief)
5.  Redis Cost Model (shard sizing → pricing)
6.  TCO Side-by-Side Comparison
7.  Cost Waterfall (where savings come from)
8.  ROI Timeline (payback period chart)
9.  Risk Mitigation / Assumptions
10. Case Study with ROI proof points
11. Recommendation
12. Next Steps
```

## Brand Rules (inherited from redis-slides)

- Sentence case for titles. Only first word and proper nouns capitalized.
- No em dashes. Use commas, colons, parentheses.
- No exclamation points. Replace with periods.
- Use "fast". Not quick, rapid, real-time, agile.
- Abbreviate: apps, devs, docs.
- First person "we", not "Redis".
- No puns. No wordplay on Redis name.
- "Redis Community Edition", not "open source".
- Tagline "See how fast feels" — title/closing only.
- Do not use retired cube graphic. Use Redis "R" mark or proprietary icons.

### Brand Palette

| Name | Hex | Use |
|------|-----|-----|
| Hyper (Redis red) | `#FF4438` | Primary brand accent, CTAs, key highlights |
| Midnight | `#091A23` | Dark backgrounds, body text on light |
| Dusk | `#163341` | Secondary dark |
| Dusk 30% | `#B9C2C6` | Muted text, dividers |
| White | `#FFFFFF` | Light backgrounds, text on dark |
| Sky Blue | `#80DBFF` | Accent / charts |
| Yellow | `#DCFF1E` | Accent / charts |
| Purple | `#C795E3` | Accent / charts |

Customer colors override accent colors when provided — never override Hyper, Midnight, or White.

### Typography

- Space Grotesk (Regular, Medium, Semi-bold): headlines, subheads, body.
- Space Mono: code snippets, technical labels.

## Skill File Structure

```
redis-sa-slides/
├── SKILL.md                          # Core instructions (~120 lines)
├── references/
│   ├── drive-assets.md               # Google Drive IDs: template, bank, toolkit
│   ├── sa-slide-catalog.md           # Bank catalog: tag, category, description, slide index
│   ├── brand-rules.md                # Palette, voice, typography (from redis-slides)
│   ├── diagram-decision-tree.md      # When GSlides vs Excalidraw vs Lucid
│   ├── deck-archetypes.md            # Pre-built outlines: TDD, POC, architecture, QBR, ROI
│   ├── tdd-quality-rubric.md         # TDD quality bar: Before/After architecture, pain validation, POC review
│   └── logo-lookup.md                # Logo API + fallback workflow
├── scripts/
│   └── validate-deck.py              # Check placeholders, brand violations, missing logos
├── evals/
│   ├── output_rubric.md              # Grading criteria
│   └── trigger_queries.json          # Should/shouldn't trigger test cases
└── templates/
    └── deck-outline-tdd.md           # Example TDD deck outline (copy-ready)
```

## Speaker Notes

Every content slide gets notes in SOURCE/INTENT/LOGIC format:

```
SOURCE: [where content/data came from]
INTENT: [why this slide exists, audience takeaway]
LOGIC: [filters, calculations, assumptions — blank if N/A]
```

Skip notes for: title, dividers, anthem, closing slides.

## TDD Quality Rubric

The skill ships with a **TDD Quality Rubric** (`references/tdd-quality-rubric.md`) that defines what a strong Technical Deep Dive deck looks like. The skill uses this rubric both to:

1. **Guide deck construction** — when building a TDD deck, prompt the SA for the right level of detail
2. **Validate content** — flag slides that contain vague claims instead of concrete metrics

### Rubric structure (4 sections)

**1. Before Architecture (current state)**
- Current stack: databases/caches/queues in place, where Redis fills the gap
- Scale: data volume, read/write QPS, peak vs average, growth trajectory
- Known technical pain: specific measured symptoms (latency numbers, timeout/error rates, failover incidents, cost per unit of scale) — not "it's slow"
- Constraints: language/framework, cloud, deployment model, existing contracts
- **Negative consequences with metrics** — every pain must state what it costs:
  - Performance waste: quantify stranded capacity (e.g., "10-15% CPU utilization on 720 vCPU — >90% stranded")
  - Availability risk: translate SLA gap into exposure (e.g., "EUR X per second of outage")
  - Operational fragility: name what breaks (e.g., "not tolerant against single AZ failure — lose 1/3 of data")
  - Cost of inaction: formula with real numbers (e.g., "EUR 112.50/sec fraud loss × 31,536 sec/year SLA gap = EUR 3.19M/year")

**2. After Architecture (proposed state)**
- What Redis-based architecture looks like, what it replaces/augments
- Integration points: application layer, data pipelines, ops tooling changes
- Migration path: cutover plan (parallel run, phased, big-bang), risk discussed with engineers
- **Positive outcomes with metrics:**
  - Performance improvement: "70-80% CPU utilization — all cores contribute"
  - Availability improvement: "99.99% availability = 28K fewer seconds of downtime/year"
  - Infrastructure savings: "$156K/year, 76% reduction", node consolidation numbers
  - Scaling headroom: "linear scaling to 2x volume without node doubling"

**3. Technical Pain Validation**
- Technical stakeholder (not just business champion) confirmed pain and severity
- Concrete technical requirements captured (latency SLA, consistency model, availability target, data size limits)
- Technical proof point planned or completed (POC, benchmark, architecture review sign-off)

**4. POC Plan Review** (8-point checklist, only if POC exists)
Each item individually scored ANSWERED / PARTIAL / NOT ANSWERED:

1. Criteria map back to Why Redis capabilities? Flag both directions (untested capabilities, unjustified criteria)
2. Criteria testable? Third party could determine pass/fail from stated text alone
3. Latency targets: numerical, measurement point specified (app vs Redis), statistical target (p95/p99/mean)
4. Qualitative criteria flagged: "fast", "easy", "seamless" are not pass/fail conditions
5. Vector/Search: accuracy targets (recall@k, precision) not just latency
6. Each criterion has an owner assigned?
7. Sufficient datasets, clarity, relates to future state architecture?
8. Data source identified? Production/synthetic/masked, security/compliance cleared?

### How the skill uses the rubric

When building a **TDD deck**, the skill:
- Checks that Before Architecture slides contain measured symptoms, not vague pain
- Checks that negative-consequence slides include formulas or concrete figures
- Checks that After Architecture slides include specific metrics per improvement area
- Checks that POC Plan slides have testable, numerical, owned criteria
- Flags any slide that says "fast", "easy", "seamless", "scalable" without a number
- Marks `[TODO: need metric]` on any claim missing quantification

When building a **POC Results deck**, the skill cross-references the POC criteria from the rubric against actual results.

When building a **ROI/TCO deck**, the skill pulls the negative-consequence formulas from Before Architecture and the positive-outcome metrics from After Architecture to construct the business case.

## Acceptance Criteria

Each criterion is observable by an agent or reviewer with access to the produced deck and this repo.

### AC-1: Deck produced from Google Slides template copy

- Given: user requests any deck archetype with a customer name
- When: skill completes the build
- Then: the output is a Google Slides deck whose revision history starts with a copy of the SA Template Deck (Drive ID in `references/drive-assets.md`); no `.pptx` intermediate was created

### AC-2: Bank slides copied by tag

- Given: user requests a TDD deck
- When: skill copies slides from the SA Slide Bank
- Then: every copied slide's speaker-notes first line contains a `[SA-BANK:*]` tag matching an entry in `references/sa-slide-catalog.md`; the tag is preserved in the output deck's notes

### AC-3: Customer logo embedded after confirmation

- Given: user provides a customer name or domain
- When: skill fetches a logo
- Then: the logo was sourced from logo.dev API or web search; the user was shown the logo and confirmed before it was embedded; the logo appears on at least the title slide

### AC-4: Brand voice compliance

- Given: a completed deck
- When: text content is extracted
- Then: all titles use sentence case; zero em dashes; zero exclamation points in content slides; "fast" used instead of synonyms; no retired cube graphic; fonts are Space Grotesk or Space Mono only

### AC-5: Speaker notes on content slides

- Given: a completed deck
- When: speaker notes are extracted
- Then: every slide except title, dividers, anthem, and closing has a SOURCE/INTENT/LOGIC note block

### AC-6: TDD rubric enforcement

- Given: a TDD deck is built
- When: QA pass runs
- Then: Before Architecture slides contain at least one quantified negative consequence per pain; After Architecture slides contain at least one quantified positive outcome per improvement; any unquantified claim is marked `[TODO: need metric]`

### AC-7: Diagram delegation correctness

- Given: user requests a slide with an architecture diagram
- When: diagram has ≤ 8 shapes with simple connections
- Then: diagram is built with GSlides shapes from the Technical Diagram Toolkit
- When: diagram has > 8 shapes or complex topology
- Then: skill delegates to `/redis-excalidraw-diagrams` (default) or `/redis-lucidchart-diagrams` (if editable Lucid handoff requested); the result is embedded as an image

### AC-8: No placeholder remnants

- Given: a completed deck
- When: full text extraction runs
- Then: zero matches for: `[TODO:` without user-provided content gap, `Lorem ipsum`, `XX%`, `$XXM`, `Firstname Lastname`, `Presenter name`, `Title text here`, `Section tag example`, template instruction badges

### AC-9: Customer color isolation

- Given: user provides a customer color hex code
- When: deck is built
- Then: customer color appears only on accent elements (diagram components, chart series, highlight boxes); Hyper red, Midnight, and White are never overridden

### AC-10: Slide bank read-only

- Given: any deck build operation
- When: the skill accesses the SA Template Deck or SA Slide Bank
- Then: those files are only read/copied, never modified; the output is always a new deck file

## Non-Goals

- Replacing `/redis-slides` for non-SA use cases (marketing, product, engineering decks).
- Producing PPTX output or supporting the unpack/edit/pack workflow.
- Modifying the SA Slide Bank or SA Template Deck as part of a build operation.
- Building Google Slides Add-ons or Apps Script automation.
- Producing Reveal.js or HTML slide output (use `/redis-presentation-decks` for that).
- Generating customer data, stats, or quotes — only real data from user input or `[TODO: ...]` markers.
- Replacing Excalidraw or Lucidchart for standalone diagram deliverables.
- Hosting or serving decks beyond Google Drive sharing.
- Multi-language slide generation (bilingual slides are manual SA work post-build).

## Assumptions

1. **Google Drive MCP tools available.** The skill assumes `copy_file`, `read_file_content`, `search_files`, and `create_file` MCP tools are available in the agent's environment. If unavailable, the skill must report the limitation and stop.
2. **Google Slides API access.** The skill assumes `presentations.batchUpdate` and `presentations.pages.get` are accessible through the Google Drive/Slides MCP tools or a direct API wrapper. The exact mechanism depends on available MCP tools at runtime.
3. **SA Template Deck exists on Drive.** The template must be uploaded and converted to Google Slides before first use. The Drive ID is stored in `references/drive-assets.md`.
4. **SA Slide Bank is pre-populated.** The bank must be manually created from reference deck source material before the skill is usable. This is an implementation prerequisite, not a skill responsibility.
5. **logo.dev API requires a token.** The token is expected in the agent's environment or configured in `references/logo-lookup.md`. The skill does not store API tokens in committed files.
6. **Technical Diagram Toolkit is the canonical source** for GSlides-native shapes/icons (`1p7Z3-VCsRZqEZVx1P8P2trmM8bzN6AT3_XOn7wOU72Y`). If this deck is updated by the design team, the skill picks up changes automatically.

## Failure and Drift Handling

- **Drive asset unavailable.** If the SA Template Deck, SA Slide Bank, or Technical Diagram Toolkit cannot be read (deleted, permissions changed, Drive outage), the skill must report which asset is missing and stop. It must not fall back to building slides from scratch.
- **Logo API failure.** If logo.dev returns no result and web search also fails, the skill leaves a `[TODO: customer logo]` placeholder on the title slide and notifies the user. It does not embed a generic or wrong logo.
- **Bank slide tag mismatch.** If a requested `[SA-BANK:*]` tag does not match any slide in the bank, the skill reports the missing tag and either skips that slide (if optional) or asks the user for content (if required by the archetype).
- **Brand drift.** If `/redis-slides` updates its palette, voice rules, or typography, `references/brand-rules.md` in this skill must be updated to match. The skill does not auto-sync from redis-slides at runtime.
- **Toolkit icon changes.** If the Technical Diagram Toolkit adds/removes/renames icons, GSlides-native diagram builds may reference stale shapes. The skill should attempt to locate shapes by name/label in the Toolkit deck rather than by fixed slide/shape index.
- **Stale catalog.** If new slides are added to the bank deck but `references/sa-slide-catalog.md` is not updated, the skill cannot discover them by tag. The catalog is the source of truth, not the bank deck itself.

## Constraints

- Do not edit the SA Template Deck or SA Slide Bank directly — always copy.
- Do not use colors outside the brand palette (plus customer accent if provided).
- Do not use fonts other than Space Grotesk and Space Mono.
- Do not invent stats, customer names, or quotes. Mark unknowns as `[TODO: ...]`.
- Do not use the retired cube graphic.
- Do not position one diagram tool over another (GSlides, Excalidraw, Lucid are peer choices).
- Do not include customer-confidential data from other accounts in reference slides.
- Do not store API tokens, customer data, or credentials in committed skill files.

## Implementation Notes

### Google Slides API Operations

The skill uses Google Drive MCP tools for:
- `copy_file`: duplicate template deck to create working copy
- Google Slides API `presentations.batchUpdate` for: `replaceAllText` (swap placeholders), `duplicateObject` (copy slides from bank), `createImage` (embed logos/diagram PNGs), `createShape`/`updateShapeProperties` (build simple diagrams), `insertText`, `updateTextStyle`
- Google Slides API `presentations.pages.get` to read slide content for QA checks

### Slide Bank Maintenance

The bank is a living document. To add a new template slide:
1. Add the slide to the SA Slide Bank deck on Google Drive.
2. Add `[SA-BANK:{category}-{variant}]` as the first line of the slide's speaker notes.
3. Add a section-divider tag comment if it's a new category.
4. Update `references/sa-slide-catalog.md` with the new slide's tag, index, and description.

### Customer Color Handling

When user provides a customer color code (e.g., `#003366` for a bank):
- Apply as accent fill on diagram components, chart series, and highlight boxes.
- Never replace Hyper red, Midnight, or White.
- Use alongside brand palette, not instead of it.

## Verification Strategy

### RED: baseline scenarios

Before implementing the skill, run fresh-agent scenarios that demonstrate current gaps:

1. Ask an agent to "build a TDD deck for Unicaja" with no skill loaded. Observe: no bank access, no brand enforcement, no logo flow, no rubric validation.
2. Ask an agent to "build an architecture diagram in Google Slides". Observe: no access to Technical Diagram Toolkit shapes/icons.
3. Ask an agent to "review this TDD deck for quality". Observe: no rubric to validate against.

### GREEN: skill produces correct output

After implementation, re-run each scenario with the skill loaded:

1. TDD deck request produces a Google Slides deck with bank slides, customer logo, brand-compliant text, and `[TODO: need metric]` markers where data is missing.
2. Architecture diagram request uses Toolkit shapes for simple diagrams, delegates for complex ones.
3. TDD review request applies the 4-section rubric and flags unquantified claims.

### REFACTOR and repository validation

- Keep `SKILL.md` near the repo's preferred 150-line target by moving detail into references.
- Verify frontmatter, imperative instructions, explicit `DO NOT` guardrails, reference links, and final checklist.
- Run `bash scripts/validate-skills.sh` and inspect actual output.
- Ensure no generated artifacts (screenshots, deck copies, logo images) are committed.

## QA Checklist

Before delivering any deck:

1. No placeholder text remaining (`[TODO:...]` without user-provided content gap, `Lorem ipsum`, `XX%`, `$XXM`, template instructions).
2. Brand voice passes: sentence case, zero em dashes, zero exclamation points, "fast" used.
3. Customer logo present on title slide and confirmed by user.
4. All diagrams render correctly (no broken shapes, no orphaned arrows).
5. Speaker notes present on all content slides.
6. Slide count justified — no filler slides.
7. Customer color (if provided) applied consistently to accent elements only.

## Validation Commands

```bash
# Repo structure validation
bash scripts/validate-skills.sh

# Skill frontmatter check
grep -c '^name:' redis-sa-slides/SKILL.md       # must return 1
grep -c '^description:' redis-sa-slides/SKILL.md # must return 1

# No generated artifacts committed
find redis-sa-slides/ -name '*.png' -o -name '*.jpg' -o -name '*.svg' | wc -l  # must return 0

# No secrets in committed files
grep -rE '(token|key|secret|password)=' redis-sa-slides/ --include='*.md' | grep -v 'TODO\|example\|placeholder'  # must return nothing

# References exist
ls redis-sa-slides/references/drive-assets.md
ls redis-sa-slides/references/sa-slide-catalog.md
ls redis-sa-slides/references/brand-rules.md
ls redis-sa-slides/references/tdd-quality-rubric.md
ls redis-sa-slides/references/deck-archetypes.md
ls redis-sa-slides/references/diagram-decision-tree.md
ls redis-sa-slides/references/logo-lookup.md
```

## Compatibility Impact

- **No breaking change to existing skills.** This is a new skill (`ADDED`). `/redis-slides`, `/redis-excalidraw-diagrams`, and `/redis-lucidchart-diagrams` are unchanged.
- **README update required.** `README.md` must add `redis-sa-slides` to the Available Skills table, Installation command, Usage Examples, and Versioning table per `CONTRIBUTING.md` requirements.
- **No migration needed.** SAs currently building decks manually in Google Slides can adopt this skill incrementally. Existing decks are unaffected.

## DEFERRED

| Item | Reason deferred | Revisit trigger |
|---|---|---|
| Multi-language slide generation | Bilingual decks (EN/FR/IT) are currently manual SA work; automating requires locale-aware text replacement and duplicate slide management | User requests automated bilingual deck support |
| Google Sheets chart integration | Native Sheets-linked charts require a separate Sheets API workflow | User requests live-updating charts in Google Slides |
| Slide bank versioning | No mechanism to track bank slide versions or deprecate stale slides | Bank grows beyond ~80 slides or stale slides cause confusion |
| Automated brand-drift sync | `references/brand-rules.md` must be manually updated when `/redis-slides` changes | Redis brand refresh or `/redis-slides` major version bump |

## Execution Handoff

- Planning skill: `agent-delegation-planning`
- Suggested plan directory: `docs/agent-plans/2026-09-02-redis-sa-slides/`
- Validation commands: see Validation Commands section above

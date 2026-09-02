# SA slide catalog

This file is the source of truth for reusable slides in the SA Slide Bank.
The skill selects bank slides by matching tags in Google Slides speaker notes.

## Tag format

Every reusable bank slide must put its slide tag on the first line of speaker
notes:

```text
[SA-BANK:{category}-{variant}]
```

Use kebab-case for both `category` and `variant`. The category prefix must match
one of the catalog categories below. The variant should describe the slide's
specific job, audience, layout, customer segment, or source pattern.

Examples:

- `[SA-BANK:title-customer]`
- `[SA-BANK:tdd-scorecard-workstream]`
- `[SA-BANK:roi-tco-side-by-side]`

The tag must be the first line so automation can read speaker notes without
parsing presenter guidance. Put normal `SOURCE:`, `INTENT:`, and `LOGIC:` notes
after the tag when the slide is copied into an output deck.

## Catalog

| # | Category | Tag examples | Slide types | Description | Source deck(s) |
|---|----------|--------------|-------------|-------------|----------------|
| 1 | Title & Agenda | `[SA-BANK:title-customer]`, `[SA-BANK:title-tdd]`, `[SA-BANK:agenda-numbered]` | Customer-branded title, numbered agenda | Opens the deck with customer context, Redis branding, meeting purpose, presenter details, and a compact agenda. | SA Template Deck, Slides Lab, Iris TDD Playbook |
| 2 | Current State & Pains | `[SA-BANK:current-state-architecture]`, `[SA-BANK:current-state-pain-points]`, `[SA-BANK:current-state-stakeholder-map]` | Current architecture diagram, pain points list, stakeholder mapping | Captures the customer's starting point, measurable technical pain, constraints, affected teams, and consequences to validate the need for change. | Iris TDD Playbook, Nexi Riskshield TDD, Intesa TDD, Unicaja TDD |
| 3 | 3 Whys | `[SA-BANK:three-whys-rich]`, `[SA-BANK:three-whys-condensed]`, `[SA-BANK:three-whys-why-now]` | Why anything, Why Redis, Why now, rich and condensed variants | Frames the business and technical reason to act, why Redis fits the problem, and why timing matters for the customer. | Slides Lab, Iris TDD Playbook, Solutions Library |
| 4 | Discovery | `[SA-BANK:discovery-questions-checklist]`, `[SA-BANK:discovery-meeting-notes]`, `[SA-BANK:discovery-decision-drivers]` | Discovery questions checklist, meeting notes capture | Provides structured prompts and capture space for requirements, blockers, success criteria, existing architecture, data profile, and stakeholder decisions. | Iris TDD Playbook, Slides Lab |
| 5 | Value Proposition | `[SA-BANK:value-platform-overview]`, `[SA-BANK:value-capability-grid]`, `[SA-BANK:value-customer-matrix]` | Redis platform overview, capability grid, customer value matrix | Maps Redis platform capabilities to customer outcomes, technical differentiators, and use-case-level value. | Slides Lab, Solutions Library, Iris TDD Playbook |
| 6 | Technical Scope | `[SA-BANK:scope-master-table]`, `[SA-BANK:scope-workstream-breakdown]`, `[SA-BANK:scope-success-metrics]` | Master scope table, per-workstream breakdowns | Defines topics, success criteria, metrics, workstreams, dependencies, assumptions, and out-of-scope items for a TDD or POC. | Iris TDD Playbook, Nexi Riskshield TDD, Intesa TDD, Unicaja TDD |
| 7 | Architecture Diagrams | `[SA-BANK:architecture-cluster]`, `[SA-BANK:architecture-ai-pipeline]`, `[SA-BANK:architecture-cache-aside]`, `[SA-BANK:architecture-rdi]`, `[SA-BANK:architecture-deployment-options-ring]` | GSlides-native cluster, proxy, multi-tenant, AI pipeline, cache-aside, RDI, deployment options ring | Supplies reusable diagram layouts and toolkit-backed blocks for current state, future state, migration paths, and Redis deployment choices. | Technical Diagram Toolkit, Solutions Library, Iris TDD Playbook |
| 8 | Competitor Comparison | `[SA-BANK:comparison-hazelcast]`, `[SA-BANK:comparison-elastic]`, `[SA-BANK:comparison-elasticache]`, `[SA-BANK:comparison-icon-score]` | Head-to-head matrices with icon scoring | Compares Redis against common alternatives on capability, operations, scaling, availability, cost, and implementation fit. | Slides Lab, Solutions Library, Nexi Riskshield TDD |
| 9 | TDD / Value Scorecards | `[SA-BANK:tdd-scorecard-workstream]`, `[SA-BANK:tdd-key-metrics-validated-scenarios]`, `[SA-BANK:tdd-exit-criteria-card]` | Key Metrics plus Validated Scenarios paired tables, per-workstream scorecards, exit-criteria cards | Converts discovery and TDD findings into measurable scorecards that connect customer pain, Redis capabilities, validation scenarios, and pass/fail criteria. | Iris TDD Playbook, Nexi Riskshield TDD, Intesa TDD, Unicaja TDD |
| 10 | POC Plan | `[SA-BANK:poc-prerequisites]`, `[SA-BANK:poc-scenario-chapters]`, `[SA-BANK:poc-timeline]`, `[SA-BANK:poc-owner-assignment]` | POC prerequisites, sizing, scenario chapters, timeline, owner assignment | Defines how the POC will run, who owns each workstream, what data and environments are needed, and how success will be measured. | Iris TDD Playbook, Nexi Riskshield TDD, Intesa TDD, Unicaja TDD |
| 11 | POC Results / Restitution | `[SA-BANK:poc-results-kpi-synthesis]`, `[SA-BANK:poc-results-performance-chart]`, `[SA-BANK:poc-results-operator-comparison]`, `[SA-BANK:poc-results-verdict]` | KPI synthesis, performance charts, head-to-head operator comparison, verdict | Summarizes POC evidence, measured outcomes, scenario results, issues found, and the final technical recommendation. | CNAF POC Restitution, Nexi Riskshield TDD, Intesa TDD, Unicaja TDD |
| 12 | Phased Implementation | `[SA-BANK:implementation-jumpstart-adopt-scale]`, `[SA-BANK:implementation-quarterly-milestones]`, `[SA-BANK:implementation-migration-targets]` | Jumpstart to Adopt to Scale timeline, quarterly milestones, migration percentage targets | Turns the recommendation into a practical rollout path with phases, milestones, migration targets, owners, and adoption gates. | Iris TDD Playbook, CNAF POC Restitution, Solutions Library |
| 13 | Future State / What Good Looks Like | `[SA-BANK:future-state-target-architecture]`, `[SA-BANK:future-state-deployment-options]`, `[SA-BANK:future-state-good-looks-like]` | Target architecture, deployment options, what good looks like | Shows the proposed Redis-enabled future state, operational model, availability posture, scaling path, and measurable definition of success. | Technical Diagram Toolkit, Iris TDD Playbook, Solutions Library |
| 14 | Mutual Action Plan | `[SA-BANK:map-action-owner-timeline]`, `[SA-BANK:map-joint-next-steps]`, `[SA-BANK:map-decision-checkpoints]` | Action, owner, timeline table | Documents shared next steps across Redis, customer technical stakeholders, procurement, security, operations, and executive sponsors. | Iris TDD Playbook, Slides Lab |
| 15 | Case Study / Reference | `[SA-BANK:case-study-customer-facing]`, `[SA-BANK:case-study-presenter-notes]`, `[SA-BANK:case-study-challenge-solution-results]` | Challenge, Solution, Results template with metrics, quote, QR code, customer-facing and presenter-notes pair | Provides reference proof in a reusable format that can be tailored to the audience while preserving source notes and approved proof points. | Slides Lab, Solutions Library |
| 16 | Sizing & Pricing | `[SA-BANK:sizing-shard-pricing-table]`, `[SA-BANK:sizing-methodology]`, `[SA-BANK:sizing-capacity-planning]`, `[SA-BANK:sizing-ps-credits-packages]` | Shard-based pricing table, sizing methodology, capacity planning, PS credits packages | Explains sizing inputs, capacity planning method, shard assumptions, pricing structure, and services options needed for commercial alignment. | Slides Lab, Iris TDD Playbook, Solutions Library |
| 17 | Support & Governance | `[SA-BANK:support-tier-matrix]`, `[SA-BANK:support-p1-p4-definitions]`, `[SA-BANK:governance-cadence]`, `[SA-BANK:governance-csm-role]` | Support tier matrix, P1-P4 definitions, governance cadence, CSM role | Sets expectations for production support, incident handling, escalation, operating cadence, ownership, and customer success engagement. | Slides Lab, Solutions Library |
| 18 | Business Outcomes | `[SA-BANK:business-outcomes-roi-summary]`, `[SA-BANK:business-outcomes-projected-benefits]`, `[SA-BANK:business-outcomes-cost-reduction]` | ROI summary, projected benefits, cost reduction metrics | Connects technical improvements to business value, including risk reduction, infrastructure savings, user experience, throughput, and operational efficiency. | Slides Lab, Iris TDD Playbook, Solutions Library |
| 19 | ROI / TCO Calculator | `[SA-BANK:roi-tco-side-by-side]`, `[SA-BANK:roi-cost-waterfall]`, `[SA-BANK:roi-timeline]`, `[SA-BANK:roi-cost-per-operation]`, `[SA-BANK:roi-downtime-cost-formula]` | TCO side-by-side, cost waterfall, ROI timeline, cost-per-operation, business case summary, downtime-cost formula | Builds the financial case using current versus Redis costs, benefit sources, payback timing, unit economics, outage exposure, and assumptions. | Slides Lab, Iris TDD Playbook, Solutions Library |
| 20 | Closing & Next Steps | `[SA-BANK:closing-thank-you]`, `[SA-BANK:closing-next-steps]`, `[SA-BANK:closing-contact-info]` | Thank you, next steps, contact info | Ends with clear follow-up actions, Redis and customer owners, contact information, and optional title or closing tagline usage. | SA Template Deck, Slides Lab |

## Maintenance

When adding a new reusable slide to the bank:

1. Add the slide to the SA Slide Bank deck on Google Drive. Do not add customer-confidential data or unapproved metrics.
2. Choose the matching category from the catalog. If no category fits, propose a catalog update before adding the slide.
3. Put the tag as the first line of speaker notes using `[SA-BANK:{category}-{variant}]`.
4. Use a stable, descriptive variant such as `customer`, `workstream`, `side-by-side`, `timeline`, or the target use case. Avoid dates, customer names, draft status, and slide numbers in tags.
5. Add `SOURCE:`, `INTENT:`, and `LOGIC:` notes after the tag when the slide needs provenance or calculation context.
6. Update this catalog with the tag, slide type, description, and source deck. Keep all 20 categories represented.
7. Verify the tag is unique in the bank before relying on it from an archetype or build workflow.

DO NOT edit the SA Template Deck or SA Slide Bank as part of a customer deck
build. Treat those Drive assets as read-only sources during build operations.

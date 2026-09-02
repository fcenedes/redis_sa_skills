# TDD deck outline

Customer name: `[customer name]`  
Date: `[date]`  
Presenter: `[presenter name]`

Use this as the starting outline for a customer TDD deck. Select slides from the SA Slide Bank by `[SA-BANK:*]` tag, then replace placeholders with customer-specific content and evidence.

| Slide | Purpose | Bank tag reference | Notes |
|-------|---------|--------------------|-------|
| 1 | Customer-branded title | `[SA-BANK:title-customer]` | Include confirmed customer logo, date, presenter, and approved confidentiality marker. |
| 2 | Agenda | `[SA-BANK:agenda-numbered]` | Keep to the customer meeting flow. |
| 3 | Current state architecture | `[SA-BANK:current-state-architecture]` | Optional if current architecture is unknown. Use a placeholder gap instead of inventing topology. |
| 4 | Pain points and business drivers | `[SA-BANK:current-state-pains]` | Tie pains to customer evidence, discovery notes, or open questions. |
| 5 | Stakeholder and success alignment | `[SA-BANK:current-state-stakeholders]` | Optional for short decks. |
| 6 | Why anything | `[SA-BANK:three-whys-anything]` | Use when the customer still needs change justification. Optional for late-stage opportunities. |
| 7 | Why Redis | `[SA-BANK:three-whys-redis]` | Keep claims specific to the proposed Redis capability. |
| 8 | Why now | `[SA-BANK:three-whys-now]` | Optional unless timing, renewal, migration, launch, or incident pressure matters. |
| 9 | Redis value proposition | `[SA-BANK:value-platform-overview]` | Use customer-relevant capabilities only. |
| 10 | Technical scope | `[SA-BANK:technical-scope-master]` | Define topic, success criterion, metric, data source, and owner. |
| 11 | Workstream breakdown | `[SA-BANK:technical-scope-workstream]` | Duplicate per major workstream when needed. Optional for simple TDDs. |
| 12 | Future state architecture | `[SA-BANK:architecture-future-state]` | Use GSlides toolkit shapes or delegated diagram output. |
| 13 | Current to future transition | `[SA-BANK:architecture-current-to-future]` | Optional when slide 12 already covers migration clearly. |
| 14 | TDD scorecard, key metrics | `[SA-BANK:tdd-scorecard-key-metrics]` | Include baseline, target, measurement method, and owner. |
| 15 | TDD scorecard, validated scenarios | `[SA-BANK:tdd-scorecard-validated-scenarios]` | Include scenario, acceptance signal, test data, and evidence source. |
| 16 | Exit criteria | `[SA-BANK:tdd-exit-criteria]` | Make go/no-go criteria explicit. |
| 17 | POC prerequisites | `[SA-BANK:poc-prerequisites]` | Optional if the deck is not followed by a POC. |
| 18 | POC plan and timeline | `[SA-BANK:poc-plan-timeline]` | Include phases, owners, dates, dependencies, and decision gate. |
| 19 | Phased implementation | `[SA-BANK:phased-implementation-jumpstart-adopt-scale]` | Use when the TDD should lead into delivery planning. |
| 20 | Mutual action plan | `[SA-BANK:mutual-action-plan]` | Include action, owner, due date, and dependency. |
| 21 | Case study or reference | `[SA-BANK:case-study-customer-facing]` | Optional. Use only approved references and sourced metrics. |
| 22 | Sizing and pricing | `[SA-BANK:sizing-pricing-shard-table]` | Optional if commercial details are out of scope. |
| 23 | ROI and TCO summary | `[SA-BANK:roi-tco-summary]` | Optional unless business case is part of the decision. |
| 24 | Next steps | `[SA-BANK:closing-next-steps]` | Keep actions specific and dated. |
| 25 | Closing | `[SA-BANK:closing-thank-you]` | Include confirmed contact information and approved tagline placement. |

## Optional slide guidance

Slides 5, 6, 8, 11, 13, 17, 19, 21, 22, and 23 are optional. Cut them when they do not support the meeting objective, when evidence is missing, or when they duplicate a stronger slide.

For short executive TDD decks, keep slides 1, 2, 4, 7, 9, 10, 12, 14, 15, 16, 18, 20, 24, and 25.

For technical deep dives, expand slides 11, 12, 14, and 15 by workstream, but preserve the same `[SA-BANK:*]` tag pattern in speaker notes.

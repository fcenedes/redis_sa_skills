# Deck archetypes

Use these archetypes to plan customer-facing Redis SA decks from the SA Slide Bank. Each slide line names the intended bank tag family. Treat tags as references to cataloged `[SA-BANK:*]` slides, then pick the specific variant from `sa-slide-catalog.md`.

## TDD deck (~20-25 slides)

Audience guidance: Use for technical decision makers, architects, platform teams, and application owners who need to validate fit, implementation shape, and measurable success criteria before a POC or rollout. Keep executive value visible, but make the technical proof concrete.

| # | Slide | Bank tag reference | Optional | Notes |
|---|-------|--------------------|----------|-------|
| 1 | Customer-branded title | `[SA-BANK:title-customer]` | No | Include confirmed logo and meeting context. |
| 2 | Agenda | `[SA-BANK:agenda-numbered]` | No | Match sections to the customer's decision process. |
| 3 | Current state overview | `[SA-BANK:current-state-architecture]` | No | Show existing stack and operational boundaries. |
| 4 | Current pains | `[SA-BANK:current-state-pain-points]` | No | Tie pain points to measurable impact. |
| 5 | Stakeholder map | `[SA-BANK:current-state-stakeholder-map]` | Yes | Add when multiple teams own the decision. |
| 6 | Why anything | `[SA-BANK:three-whys-anything]` | No | Establish why the status quo needs change. |
| 7 | Why Redis | `[SA-BANK:three-whys-redis]` | No | Connect Redis capabilities to the stated pains. |
| 8 | Why now | `[SA-BANK:three-whys-why-now]` | No | Use deadlines, risk, cost, or roadmap pressure. |
| 9 | Redis value proposition | `[SA-BANK:value-platform-overview]` | No | Keep broad value to one slide. |
| 10 | Technical scope | `[SA-BANK:scope-master-table]` | No | Define topics, success criteria, and metrics. |
| 11 | Workstream breakdown | `[SA-BANK:scope-workstream-breakdown]` | Yes | Use for complex or multi-team TDDs. |
| 12 | Current to future architecture | `[SA-BANK:architecture-current-future]` | No | Show before and after together when possible. |
| 13 | Target architecture | `[SA-BANK:future-state-target-architecture]` | No | Use toolkit shapes for simple diagrams. |
| 14 | Deployment options | `[SA-BANK:architecture-deployment-options-ring]` | Yes | Add when region, cloud, or tenancy choices matter. |
| 15 | TDD scorecard: workstream 1 | `[SA-BANK:tdd-scorecard-workstream]` | No | Pair key metrics with validated scenarios. |
| 16 | TDD scorecard: workstream 2 | `[SA-BANK:tdd-scorecard-workstream]` | Yes | Add one per major workstream. |
| 17 | Exit criteria | `[SA-BANK:tdd-exit-criteria-card]` | No | Make pass/fail decision criteria explicit. |
| 18 | POC plan | `[SA-BANK:poc-prerequisites]` | No | Include prerequisites and responsibilities. |
| 19 | POC timeline | `[SA-BANK:poc-timeline]` | No | Show dates, owners, and dependencies. |
| 20 | Phased implementation | `[SA-BANK:implementation-jumpstart-adopt-scale]` | No | Connect TDD outcome to rollout path. |
| 21 | Mutual action plan | `[SA-BANK:map-action-owner-timeline]` | No | Assign next steps and dates. |
| 22 | Case study or reference | `[SA-BANK:case-study-customer-facing]` | Yes | Use only when relevant to the customer context. |
| 23 | Pricing and sizing | `[SA-BANK:sizing-shard-pricing-table]` | Yes | Include when commercial fit is in scope. |
| 24 | ROI or TCO summary | `[SA-BANK:roi-business-case-summary]` | Yes | Use when economic justification is part of approval. |
| 25 | Closing and next steps | `[SA-BANK:closing-next-steps]` | No | Keep open actions concrete. |

## POC results / restitution (~15-20 slides)

Audience guidance: Use after a POC, benchmark, or hands-on validation. Lead with whether the agreed objectives were met, then show enough method and evidence for technical reviewers to trust the conclusion.

| # | Slide | Bank tag reference | Optional | Notes |
|---|-------|--------------------|----------|-------|
| 1 | Title | `[SA-BANK:title-customer]` | No | Name the POC and reporting period. |
| 2 | Agenda | `[SA-BANK:agenda-numbered]` | No | Separate objective recap, evidence, verdict, and next steps. |
| 3 | POC objectives recap | `[SA-BANK:poc-objectives-recap]` | No | Restate agreed success criteria. |
| 4 | Methodology | `[SA-BANK:poc-methodology]` | No | Include environment, datasets, load shape, and assumptions. |
| 5 | KPI synthesis | `[SA-BANK:poc-results-kpi-synthesis]` | No | Show the executive verdict in one slide. |
| 6 | Workstream result 1 | `[SA-BANK:poc-result-workstream]` | No | Use charts where available. |
| 7 | Workstream result 2 | `[SA-BANK:poc-result-workstream]` | Yes | Add for each validated scenario. |
| 8 | Workstream result 3 | `[SA-BANK:poc-result-workstream]` | Yes | Keep repeated slides concise. |
| 9 | Head-to-head comparison | `[SA-BANK:competitor-head-to-head]` | Yes | Use only for competitor displacement. |
| 10 | Operator comparison | `[SA-BANK:poc-results-operator-comparison]` | Yes | Add when multiple runbooks or operating models were tested. |
| 11 | Conclusions and verdict | `[SA-BANK:poc-results-verdict]` | No | State pass, partial pass, or not met against criteria. |
| 12 | Gaps and assumptions | `[SA-BANK:poc-results-gaps]` | Yes | Include when proof has limits. |
| 13 | Phased implementation | `[SA-BANK:implementation-quarterly-milestones]` | No | Convert evidence into rollout steps. |
| 14 | Pricing | `[SA-BANK:sizing-shard-pricing-table]` | Yes | Include when final commercial approval follows the POC. |
| 15 | Support and governance | `[SA-BANK:governance-cadence]` | Yes | Add for production readiness conversations. |
| 16 | Mutual action plan | `[SA-BANK:map-action-owner-timeline]` | No | Assign owners for remaining approval and launch tasks. |
| 17 | Closing | `[SA-BANK:closing-thank-you]` | No | Keep the closing short. |

## Architecture review (~10-15 slides)

Audience guidance: Use for architects, platform engineers, security stakeholders, and application teams reviewing a proposed Redis architecture. Favor clear topology, constraints, and tradeoffs over broad product messaging.

| # | Slide | Bank tag reference | Optional | Notes |
|---|-------|--------------------|----------|-------|
| 1 | Title | `[SA-BANK:title-customer]` | No | Name the architecture scope. |
| 2 | Current architecture | `[SA-BANK:architecture-current]` | No | Show systems, traffic, data ownership, and pain points. |
| 3 | Pain points | `[SA-BANK:current-state-pain-points]` | No | Link each pain to an architectural constraint. |
| 4 | Proposed architecture | `[SA-BANK:architecture-proposed]` | No | Use Redis components and integration boundaries. |
| 5 | Component deep dive: data model | `[SA-BANK:architecture-component-deep-dive]` | Yes | Add when data shape is a key decision. |
| 6 | Component deep dive: deployment | `[SA-BANK:architecture-deployment-options-ring]` | Yes | Add for cloud, region, network, or tenancy decisions. |
| 7 | Component deep dive: operations | `[SA-BANK:governance-cadence]` | Yes | Add for production operations review. |
| 8 | What good looks like | `[SA-BANK:future-state-good-looks-like]` | No | Define target-state quality and measurable outcomes. |
| 9 | Migration path | `[SA-BANK:implementation-jumpstart-adopt-scale]` | No | Show phases and cutover assumptions. |
| 10 | Risks and open questions | `[SA-BANK:scope-master-table]` | Yes | Use when architecture input is incomplete. |
| 11 | Mutual action plan | `[SA-BANK:map-action-owner-timeline]` | No | Resolve owners for decisions and missing inputs. |
| 12 | Closing | `[SA-BANK:closing-next-steps]` | No | End with next technical decision. |

## QBR (~10-12 slides)

Audience guidance: Use for customer sponsors, platform leaders, CSMs, and account teams. Keep the deck outcome-led: relationship health, usage, value delivered, risks, and next-quarter priorities.

| # | Slide | Bank tag reference | Optional | Notes |
|---|-------|--------------------|----------|-------|
| 1 | Title | `[SA-BANK:title-customer]` | No | Include quarter and account name. |
| 2 | Relationship summary | `[SA-BANK:qbr-relationship-summary]` | No | Summarize current engagement state. |
| 3 | Usage metrics and health | `[SA-BANK:qbr-usage-health]` | No | Use sourced metrics only. |
| 4 | Achievements this quarter | `[SA-BANK:qbr-achievements]` | No | Tie achievements to customer outcomes. |
| 5 | Business outcomes | `[SA-BANK:business-outcomes-summary]` | Yes | Add when quantified value is available. |
| 6 | Support and governance | `[SA-BANK:support-tier-matrix]` | Yes | Use when incidents, escalation, or cadence changed. |
| 7 | Roadmap and upcoming | `[SA-BANK:qbr-roadmap-upcoming]` | No | Connect Redis roadmap to customer priorities. |
| 8 | Risks and blockers | `[SA-BANK:qbr-risks-blockers]` | Yes | Include if action is needed from either side. |
| 9 | Action items | `[SA-BANK:map-action-owner-timeline]` | No | Make owners and dates explicit. |
| 10 | Closing | `[SA-BANK:closing-next-steps]` | No | Keep next engagement clear. |

## Business case / ROI (~12-15 slides)

Audience guidance: Use for economic buyers, sponsors, procurement partners, and technical leaders who need financial justification. Every claim needs a source, assumption, or `[TODO: need metric]` marker.

| # | Slide | Bank tag reference | Optional | Notes |
|---|-------|--------------------|----------|-------|
| 1 | Title | `[SA-BANK:title-customer]` | No | Name the investment decision. |
| 2 | Executive summary | `[SA-BANK:roi-executive-summary]` | No | Put the one-slide verdict up front. |
| 3 | Current state costs | `[SA-BANK:roi-current-state-costs]` | No | Break down infrastructure, operations, downtime, and opportunity cost. |
| 4 | Pain and cost drivers | `[SA-BANK:current-state-pain-points]` | Yes | Use when costs need context. |
| 5 | Redis proposed architecture | `[SA-BANK:future-state-target-architecture]` | No | Keep architecture brief and value-focused. |
| 6 | Redis cost model | `[SA-BANK:sizing-shard-pricing-table]` | No | Show shard sizing, capacity assumptions, and pricing input. |
| 7 | TCO side-by-side | `[SA-BANK:roi-tco-side-by-side]` | No | Compare current state with Redis. |
| 8 | Cost waterfall | `[SA-BANK:roi-cost-waterfall]` | No | Show where savings come from. |
| 9 | ROI timeline | `[SA-BANK:roi-timeline]` | No | Include payback period and major milestones. |
| 10 | Cost per operation | `[SA-BANK:roi-cost-per-operation]` | Yes | Add when throughput or unit economics matter. |
| 11 | Risk mitigation and assumptions | `[SA-BANK:roi-risk-assumptions]` | No | Make assumptions explicit. |
| 12 | Case study with proof points | `[SA-BANK:case-study-metrics]` | Yes | Include only relevant, sourced proof points. |
| 13 | Recommendation | `[SA-BANK:roi-recommendation]` | No | State recommended decision and why. |
| 14 | Mutual action plan | `[SA-BANK:map-action-owner-timeline]` | No | Assign commercial and technical next steps. |
| 15 | Closing | `[SA-BANK:closing-next-steps]` | No | End with the approval path. |

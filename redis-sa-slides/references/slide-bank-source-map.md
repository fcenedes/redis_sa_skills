# Slide bank source map

Maps each SA-BANK tag to its source: either a template slide number or a reference deck slide to adapt.

## Source legend

| Source | Drive ID | Type |
|--------|----------|------|
| Template | `1ONed_6eENDZeQ05WMEuJEhfv1TmSIN15x_DoS4wjwvg` | Layout library (133 slides) |
| Intesa TDD | `1LEKI38IJNj43tjQ7gw-MMdjkJpPXNcD84T22j4DWLlc` | SA reference deck |
| Intesa Internal | `1fw4ieFegCXKCxRMcc_YSzE-P0--SYcvRq449qLae2u8` | SA reference deck |
| CNAF TDD | `1zxvXswQMaguo9xn85OF43TLCsjw8kh5s61v_G2krB84` | SA reference deck |
| CNAF POC | `1TkEKNlC_4avBr-a63P94bKz6gZeALypU8xXerml_rgQ` | SA reference deck |
| Unicaja TDD | `1__TMbDdltHr8RmKWL6uoJSQsep3KhHyy2YckNbMW0-k` | SA reference deck |
| CNAF Hazelcast | `12wxe8aryyIapPw9Kq68K4FPfP8g2YKJgi-FfkmvWfAw` | SA reference deck |

## Category 1: Title & Agenda

| Tag | Template slide | Reference source | Notes |
|-----|---------------|-----------------|-------|
| `title-customer` | S5 (red TITLE) | All | Replace presenter name, date |
| `title-tdd` | S7 (dark TITLE_4) | Intesa, Unicaja | Used for TDD-specific title slides |
| `agenda-numbered` | S22 (TITLE_AND_BODY white) | CNAF | Numbered agenda items in body |

## Category 2: Current State & Pains

| Tag | Template slide | Reference source | Notes |
|-----|---------------|-----------------|-------|
| `current-state-architecture` | S25 (two-col white) | Intesa "Current State" slide, CNAF "Situation Actuelle" | Blank diagram area for customer architecture |
| `current-state-pain-points` | S27 (body dark) | Intesa "Pains discovered", CNAF "Problématiques Macro" | Bullet list of measured pains |
| `current-state-stakeholder-map` | S40 (two-col white) | Intesa "Info from customer" | Stakeholder roles and responsibilities |

## Category 3: Three Whys

| Tag | Template slide | Reference source | Notes |
|-----|---------------|-----------------|-------|
| `three-whys-rich` | S103 (two-col comparison) | Unicaja TDD "3-column Why" slide | Full why-anything/why-redis/why-now grid |
| `three-whys-condensed` | S24 (one-col text) | Unicaja condensed version | Single-column summary of all three whys |
| `three-whys-anything` | S103 adapted | Unicaja "Current State Challenges" | Why anything column only |
| `three-whys-redis` | S104 adapted | Unicaja "Redis Solution" column | Why Redis column only |
| `three-whys-why-now` | S29 (one-col dark) | Unicaja "Why now" column | Why now with timeline urgency |

## Category 4: Discovery

| Tag | Template slide | Reference source | Notes |
|-----|---------------|-----------------|-------|
| `discovery-questions-checklist` | S23 (two-col white) | Unicaja "Questions" slide | Pre-meeting discovery question checklist |
| `discovery-meeting-notes` | S28 (two-col dark) | Unicaja meeting notes section | Post-meeting notes capture |
| `discovery-decision-drivers` | S23 adapted | Unicaja "What is important for Unicaja" | Customer decision drivers grid |

## Category 5: Value Proposition

| Tag | Template slide | Reference source | Notes |
|-----|---------------|-----------------|-------|
| `value-platform-overview` | S26 (centered white) | CNAF "La plateforme Redis Enterprise" | Platform capabilities overview |
| `value-capability-grid` | S107 (multi-col) | CNAF "Vue matricielle des capacités" | Full capability matrix grid |
| `value-customer-matrix` | S108 (multi-col dark) | CNAF "Répondant à divers exigences" | Customer-facing value matrix |

## Category 6: Technical Scope

| Tag | Template slide | Reference source | Notes |
|-----|---------------|-----------------|-------|
| `scope-master-table` | S80 (table white) | Intesa "Technical Scope" 3-column table | Topic / Success / Metric master table |
| `scope-workstream-breakdown` | S82 (table white) | Intesa individual workstream slides | Per-workstream detail breakdown |
| `scope-success-metrics` | S84 (table white) | Intesa "Value Scorecard" slides | Key metrics + validated scenarios |

## Category 7: Architecture Diagrams

| Tag | Template slide | Reference source | Notes |
|-----|---------------|-----------------|-------|
| `architecture-cluster` | S32 (blank white) | Intesa "Redis Architecture" cluster diagram | Cluster node architecture |
| `architecture-ai-pipeline` | S35 (blank) | Unicaja "Components of Production Agent System" | AI/agent pipeline diagram |
| `architecture-cache-aside` | S42 (two-col) | CNAF cache pattern slides | Cache-aside pattern diagram |
| `architecture-rdi` | S43 (two-col dark) | CNAF RDI slides | Redis Data Integration flow |
| `architecture-component-deep-dive` | S44 (two-col) | Intesa multi-tenancy, CNAF architecture slides | Component detail diagram |
| `architecture-current-future` | S45 (two-col dark) | Intesa "Current State" + "Future State" | Split current/future diagram |
| `architecture-proposed` | S33 (blank dark) | Intesa "Future State" diagram | Proposed Redis architecture |
| `architecture-current` | S34 (blank) | Intesa "Current State" diagram | Current state diagram |
| `architecture-deployment-options-ring` | S46 (two-col) | Intesa "Deployment Options" ring diagram | VM/K8s/Cloud deployment ring |

## Category 8: Competitor Comparison

| Tag | Template slide | Reference source | Notes |
|-----|---------------|-----------------|-------|
| `comparison-hazelcast` | S105 (two-col comparison) | CNAF "Redis Enterprise vs Hazelcast" | Feature-by-feature comparison |
| `comparison-elastic` | S106 (two-col dark) | Adapted from CNAF comparison pattern | Elastic/OpenSearch comparison |
| `comparison-elasticache` | S109 (table) | Adapted | ElastiCache comparison table |
| `comparison-icon-score` | S110 (table) | CNAF icon-scored matrices | Icon-based scoring matrix |
| `competitor-head-to-head` | S111 (table) | CNAF "Comparatif 1/2" and "2/2" | Full head-to-head table |

## Category 9: TDD Scorecards

| Tag | Template slide | Reference source | Notes |
|-----|---------------|-----------------|-------|
| `tdd-scorecard-workstream` | S61 adapted | Intesa "Value Scorecard" per workstream | Per-workstream TDD scorecard |
| `tdd-key-metrics-validated-scenarios` | S62 adapted | Intesa "Key Metrics / Validated Scenarii" | Paired metrics + scenarios table |
| `tdd-scorecard-key-metrics` | S90 (timeline) | Intesa metrics column | Key metrics only scorecard |
| `tdd-scorecard-validated-scenarios` | S91 (dark timeline) | Intesa scenarios column | Validated scenarios only |
| `tdd-exit-criteria-card` | S92 (two-col) | Intesa success criteria compilation | Exit criteria checklist |

## Category 10: POC Plan

| Tag | Template slide | Reference source | Notes |
|-----|---------------|-----------------|-------|
| `poc-prerequisites` | S86 (two-col) | Intesa "POC Prerequisites" | Infrastructure and access prereqs |
| `poc-scenario-chapters` | S87 (dark timeline) | Intesa "POC Plan" table | Chapter/Scenario/Success/Metric/Owner/Timeline |
| `poc-timeline` | S88 (two-col) | Unicaja "Estimated Timeline" | Weekly POC timeline |
| `poc-owner-assignment` | S89 (dark two-col) | CNAF "POC Redis owners et Sessions" | Owner and session assignment |
| `poc-objectives-recap` | S93 (dark two-col) | Intesa "PoC Plan (draft)" | Objectives recap before POC |
| `poc-methodology` | S94 (dark title) | CNAF "Le POC - Méthodologie" | POC methodology description |

## Category 11: POC Results

| Tag | Template slide | Reference source | Notes |
|-----|---------------|-----------------|-------|
| `poc-results-kpi-synthesis` | S35 (big number) | CNAF "Synthèse des KPIs" | KPI headline numbers |
| `poc-results-performance-chart` | S36 (big number) | CNAF "Résultats" performance comparison | Performance comparison chart |
| `poc-results-operator-comparison` | S115 (chart slide) | CNAF "Comparatif 1/2" and "2/2" | Operator comparison table |
| `poc-results-verdict` | S95 (two-col) | CNAF "Conclusions, prochaines étapes" | Verdict and next steps |
| `poc-results-gaps` | S96 (dark two-col) | Adapted from CNAF conclusions | Gaps and remediation |
| `poc-result-workstream` | S97 (dark two-col) | Intesa workstream results pattern | Per-workstream POC results |

## Category 12: Phased Implementation

| Tag | Template slide | Reference source | Notes |
|-----|---------------|-----------------|-------|
| `implementation-jumpstart-adopt-scale` | S90 (timeline) | Intesa "Phased Implementation" | Jumpstart-Adopt-Scale timeline |
| `implementation-quarterly-milestones` | S98 (GTM roadmap) | CNAF "Phased Implementation" | Quarterly milestone view |
| `implementation-migration-targets` | S99 (GTM roadmap) | Intesa migration % targets | Migration completion targets |

## Category 13: Future State

| Tag | Template slide | Reference source | Notes |
|-----|---------------|-----------------|-------|
| `future-state-target-architecture` | S41 (dark two-col) | Intesa "Future State" diagram | Target Redis architecture |
| `future-state-deployment-options` | S47 (dark two-col) | Intesa "Deployment Options" | VM/K8s/Cloud options |
| `future-state-good-looks-like` | S102 (single col) | Intesa "What good look like" | Desired end state description |

## Category 14: Mutual Action Plan

| Tag | Template slide | Reference source | Notes |
|-----|---------------|-----------------|-------|
| `map-action-owner-timeline` | S112 (table) | Intesa "Mutual Action Plan" table | Action/Owner/Timeline table |
| `map-joint-next-steps` | S113 (table) | CNAF tracking objectives | Joint next steps table |
| `map-decision-checkpoints` | S114 (table) | Adapted from Intesa/CNAF | Decision gate checkpoints |

## Category 15: Case Study

| Tag | Template slide | Reference source | Notes |
|-----|---------------|-----------------|-------|
| `case-study-customer-facing` | S48 (case study) | CNAF "France Travail" case study | Challenge/Solution/Results with QR |
| `case-study-presenter-notes` | S48 with detailed notes | Same slide, richer speaker notes | Presenter-facing version |
| `case-study-challenge-solution-results` | S63 adapted | Adapted from case study pattern | Simplified 3-column case study |
| `case-study-metrics` | S64 adapted | CNAF France Travail metrics | Metric highlight callouts |

## Category 16: Sizing & Pricing

| Tag | Template slide | Reference source | Notes |
|-----|---------------|-----------------|-------|
| `sizing-shard-pricing-table` | S80 adapted | CNAF "Modèle de tarification" | Shard-based pricing table |
| `sizing-methodology` | S82 adapted | Intesa "Application Size split" | Sizing methodology |
| `sizing-capacity-planning` | S84 adapted | Intesa shard sizing tables | Capacity planning calculator |
| `sizing-ps-credits-packages` | S111 adapted | CNAF "Coût Estimatif" | PS credits and packages |

## Category 17: Support & Governance

| Tag | Template slide | Reference source | Notes |
|-----|---------------|-----------------|-------|
| `support-tier-matrix` | S103 adapted | CNAF "Support technique" | Support tier comparison |
| `support-p1-p4-definitions` | S104 adapted | CNAF "Technical Support Overview" | P1-P4 priority definitions |
| `governance-cadence` | S100 adapted | CNAF "Tracking Objectives" | QBR/monthly/weekly cadence |
| `governance-csm-role` | S101 adapted | CNAF "Customer Success Manager" | CSM role and responsibilities |

## Category 18: Business Outcomes

| Tag | Template slide | Reference source | Notes |
|-----|---------------|-----------------|-------|
| `business-outcomes-roi-summary` | S34 (big stat) | Unicaja "Positives Business Outcomes" | ROI headline number |
| `business-outcomes-projected-benefits` | S37 (custom stat) | Unicaja benefits list | Projected benefits |
| `business-outcomes-cost-reduction` | S38 (custom FAST) | Unicaja/Intesa cost patterns | Cost reduction highlight |
| `business-outcomes-summary` | S39 (custom stat) | Adapted | Business outcomes summary |

## Category 19: ROI/TCO

| Tag | Template slide | Reference source | Notes |
|-----|---------------|-----------------|-------|
| `roi-tco-side-by-side` | S65 (big number) | CNAF budget tables | TCO side-by-side comparison |
| `roi-cost-waterfall` | S66 (dark big number) | CNAF "Pourquoi 33% infrastructure en moins" | Cost waterfall visualization |
| `roi-timeline` | S67 (dark big number) | Adapted from implementation timeline | ROI realization timeline |
| `roi-cost-per-operation` | S68 (dark big number) | Intesa performance metrics | Cost per operation |
| `roi-downtime-cost-formula` | S69 (dark big number) | TDD rubric formula pattern | Downtime cost formula |
| `roi-current-state-costs` | S117 (line chart) | Adapted | Current state cost trends |
| `roi-executive-summary` | S119 (area chart) | Adapted | Executive ROI summary |
| `roi-business-case-summary` | S120 (column chart) | Adapted | Business case columns |
| `roi-risk-assumptions` | S121 (stacked chart) | Adapted | Risk and assumptions |
| `roi-recommendation` | S122 (doughnut chart) | Adapted | Recommendation visualization |

## Category 20: Closing

| Tag | Template slide | Reference source | Notes |
|-----|---------------|-----------------|-------|
| `closing-thank-you` | S55 (red closing) | All | Standard thank you |
| `closing-next-steps` | S56 (dark closing) | All | Next steps closing |
| `closing-contact-info` | S57 (dark alt closing) | All | Contact information |

## QBR-specific tags

| Tag | Template slide | Reference source | Notes |
|-----|---------------|-----------------|-------|
| `qbr-achievements` | S109 adapted | CNAF tracking patterns | QBR achievement highlights |
| `qbr-usage-health` | S110 adapted | CNAF CSM cadence | Usage and health metrics |
| `qbr-roadmap-upcoming` | S98 adapted | CNAF phased implementation | Upcoming quarter roadmap |
| `qbr-risks-blockers` | S99 adapted | Adapted | Risks and blockers |
| `qbr-relationship-summary` | S112 adapted | CNAF "Tracking Objectives" | Relationship summary table |

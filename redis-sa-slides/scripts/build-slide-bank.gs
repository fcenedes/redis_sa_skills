/**
 * SA Slide Bank Builder v3
 *
 * Copies real SA slides from 9 reference decks into the SA Slide Bank.
 * Opens each source deck once (cached), then copies slides in category order.
 *
 * HOW TO RUN:
 *   1. Open the SA Slide Bank deck in Google Slides
 *   2. Extensions > Apps Script
 *   3. Paste this entire script
 *   4. Run: buildSlideBank_Part1  (categories 1-10)
 *   5. Run: buildSlideBank_Part2  (categories 11-20)
 *   6. Delete the original template placeholder slides (first ~133 slides)
 *
 * Split into 2 parts to stay within Apps Script 6-minute execution limit.
 */

// ====== SOURCE DECK IDs ======
var SOURCES = {
  "Intesa TDD":  "1LEKI38IJNj43tjQ7gw-MMdjkJpPXNcD84T22j4DWLlc",
  "CNAF TDD":    "1zxvXswQMaguo9xn85OF43TLCsjw8kh5s61v_G2krB84",
  "CNAF POC":    "1TkEKNlC_4avBr-a63P94bKz6gZeALypU8xXerml_rgQ",
  "Unicaja TDD": "1__TMbDdltHr8RmKWL6uoJSQsep3KhHyy2YckNbMW0-k",
  "CNAF HZ":     "12wxe8aryyIapPw9Kq68K4FPfP8g2YKJgi-FfkmvWfAw",
  "Iris TDD":    "1wy9ZlNr0Gc3RzYInU7lMoa5LCWIldkRtbSlO6Ac1xuQ",
  "Nexi TDD":    "10kBknXUSMMwI6JHWIyQNuPZf3VPe4bbHxWIm4aSTayE",
  "Pierre Lab":  "1luHXhN2sFBZEb-IEKmu8lQWNK4OPXjoDpxPkV091Xis",
  "FT TAS":      "1RLKJXwi_mUz7hcjc9R1VNvy6b1mLznaC2LdgVx3ti0E"
};

// ====== HELPERS ======

var _deckCache = {};

function getSlides_(name) {
  if (_deckCache[name]) return _deckCache[name];
  try {
    var pres = SlidesApp.openById(SOURCES[name]);
    _deckCache[name] = pres.getSlides();
    Logger.log("Opened " + name + ": " + _deckCache[name].length + " slides");
  } catch (e) {
    Logger.log("FAILED to open " + name + ": " + e.message);
    _deckCache[name] = [];
  }
  return _deckCache[name];
}

var _ok = 0, _fail = 0;

function add_(bank, sourceName, slideNum, tag, desc) {
  var slides = getSlides_(sourceName);
  if (slideNum < 1 || slideNum > slides.length) {
    Logger.log("SKIP: " + sourceName + " S" + slideNum + " out of range (has " + slides.length + ")");
    _fail++;
    return;
  }
  try {
    var newSlide = bank.appendSlide(slides[slideNum - 1]);
    var notesPage = newSlide.getNotesPage();
    var shapes = notesPage.getShapes();
    for (var i = 0; i < shapes.length; i++) {
      if (shapes[i].getPlaceholderType() === SlidesApp.PlaceholderType.BODY) {
        shapes[i].getText().setText(
          "[SA-BANK:" + tag + "]\n" + desc + "\nSOURCE: " + sourceName + " slide " + slideNum
        );
        break;
      }
    }
    Logger.log("OK: [SA-BANK:" + tag + "] from " + sourceName + " S" + slideNum);
    _ok++;
  } catch (e) {
    Logger.log("ERROR: " + tag + " from " + sourceName + " S" + slideNum + ": " + e.message);
    _fail++;
  }
}

function divider_(bank, num, name) {
  // Duplicate first existing slide, then clear and repurpose as divider
  var base = bank.getSlides()[0];
  var slide = bank.appendSlide(base);
  // Remove all page elements (shapes, images, etc)
  var elements = slide.getPageElements();
  for (var i = elements.length - 1; i >= 0; i--) {
    elements[i].remove();
  }
  // Set dark background
  slide.getBackground().setSolidFill("#091A23");
  // Category title
  var title = slide.insertTextBox(num + ". " + name, 50, 150, 620, 80);
  title.getText().getTextStyle().setFontSize(36).setBold(true).setForegroundColor("#FFFFFF");
  // Subtitle
  var sub = slide.insertTextBox("SA SLIDE BANK", 50, 240, 620, 40);
  sub.getText().getTextStyle().setFontSize(16).setForegroundColor("#FF4438");
  // Speaker notes
  try {
    var notesPage = slide.getNotesPage();
    var noteShapes = notesPage.getShapes();
    for (var i = 0; i < noteShapes.length; i++) {
      if (noteShapes[i].getPlaceholderType() === SlidesApp.PlaceholderType.BODY) {
        noteShapes[i].getText().setText("[SA-BANK:DIVIDER]\nCategory divider — not copied into customer decks.");
        break;
      }
    }
  } catch (e) {
    Logger.log("Note for divider " + num + " failed: " + e.message);
  }
}

// ====== PART 1: Categories 1-10 ======

function buildSlideBank_Part1() {
  var bank = SlidesApp.getActivePresentation();
  _ok = 0; _fail = 0;

  // ── 1. TITLE & AGENDA ──
  divider_(bank, 1, "Title & Agenda");
  add_(bank, "Intesa TDD", 1, "title-customer", "Customer-branded TDD title slide with SA team");
  add_(bank, "Nexi TDD",   1, "title-customer", "Multi-SA team title slide (Riskshield)");
  add_(bank, "Nexi TDD",   2, "agenda-numbered", "Numbered agenda: context/3whys/current/future/validation/MAP");

  // ── 2. CURRENT STATE & PAINS ──
  divider_(bank, 2, "Current State & Pains");
  add_(bank, "Intesa TDD",  9, "current-state-architecture", "Current Hazelcast architecture and sizing diagram");
  add_(bank, "Intesa TDD", 11, "current-state-pain-points", "Discovered pains with measured symptoms");
  add_(bank, "Nexi TDD",    7, "current-state-pain-points", "Challenges and negative consequences (10 bullet points)");
  add_(bank, "Nexi TDD",    4, "current-state-architecture", "Customer context: volumes, regulatory, scaling pressure");
  add_(bank, "CNAF TDD",    58, "current-state-pain-points", "CNAF specific slide 58 (user-requested)");

  // ── 3. THREE WHYS ──
  divider_(bank, 3, "Three Whys");
  add_(bank, "Unicaja TDD", 2, "three-whys-rich", "Full 3-column Why Anything / Why Redis / Why Now (AI/agentic)");
  add_(bank, "Nexi TDD",    5, "three-whys-rich", "3 Whys: scale pressure / enterprise HA / compliance urgency");
  add_(bank, "Unicaja TDD", 3, "three-whys-condensed", "Condensed current/solution/benefits grid");

  // ── 4. DISCOVERY ──
  divider_(bank, 4, "Discovery");
  add_(bank, "Iris TDD",    2, "discovery-questions-checklist", "Qualify before TDD: 4 outcomes (Fit Now/Later/Broader/No Fit)");
  add_(bank, "Iris TDD",    4, "discovery-decision-drivers", "Maturity paths: Explore / Improve / Scale");
  add_(bank, "Iris TDD",    5, "discovery-questions-checklist", "Decision gate: proceed vs redirect criteria");
  add_(bank, "Unicaja TDD", 6, "discovery-questions-checklist", "Agent discovery questions checklist");
  add_(bank, "Unicaja TDD",16, "discovery-decision-drivers", "What is important for customer teams");

  // ── 5. VALUE PROPOSITION ──
  divider_(bank, 5, "Value Proposition");
  add_(bank, "CNAF TDD",   13, "value-platform-overview", "Redis Enterprise platform overview");
  add_(bank, "CNAF TDD",   15, "value-capability-grid", "Capability matrix with use case categories");
  add_(bank, "Nexi TDD",   11, "value-capability-grid", "Capabilities mapped to requirements (table)");
  add_(bank, "Nexi TDD",   12, "value-customer-matrix", "Capabilities mapped to requirements (cont)");
  add_(bank, "Intesa TDD", 12, "value-platform-overview", "Technical advantages over current setup");

  // ── 6. TECHNICAL SCOPE ──
  divider_(bank, 6, "Technical Scope");
  add_(bank, "Intesa TDD", 24, "scope-master-table", "Technical scope: provision/run/adopt phases with metrics");
  add_(bank, "CNAF TDD",   29, "scope-master-table", "Technical scope with success criteria (French)");
  add_(bank, "Unicaja TDD",10, "scope-workstream-breakdown", "Scope breakdown: provision/run/adopt/scale");
  add_(bank, "CNAF TDD",   10, "scope-success-metrics", "Success criteria with measurable KPIs");

  // ── 7. ARCHITECTURE DIAGRAMS ──
  divider_(bank, 7, "Architecture Diagrams");
  add_(bank, "Intesa TDD",  3, "architecture-cluster", "Redis single node separation of concerns");
  add_(bank, "Intesa TDD",  4, "architecture-cluster", "Redis cluster multi-tenancy diagram");
  add_(bank, "Nexi TDD",   25, "architecture-cluster", "Redis Enterprise single node architecture");
  add_(bank, "Nexi TDD",   26, "architecture-component-deep-dive", "Redis cluster multi-tenancy with HA variants");
  add_(bank, "Intesa TDD", 13, "architecture-proposed", "Future state Redis architecture diagram");
  add_(bank, "Intesa TDD", 14, "architecture-deployment-options-ring", "Deployment options: VM/K8s/Cloud ring");
  add_(bank, "Unicaja TDD",14, "architecture-ai-pipeline", "Production agent system components diagram");
  add_(bank, "Unicaja TDD",13, "architecture-cache-aside", "Redis as real-time context engine for AI");
  add_(bank, "Iris TDD",    8, "architecture-current-future", "Whiteboard: current state delta to Iris future state");
  add_(bank, "CNAF TDD",   23, "architecture-component-deep-dive", "Multi-tenant microservices architecture");
  add_(bank, "CNAF TDD",   24, "architecture-rdi", "Redis Flex RAM/SSD auto-tiering");

  // ── 8. COMPETITOR COMPARISON ──
  divider_(bank, 8, "Competitor Comparison");
  add_(bank, "CNAF TDD",   17, "comparison-hazelcast", "Redis vs Oracle Coherence 1/3");
  add_(bank, "CNAF TDD",   18, "comparison-elastic", "Redis vs Oracle Coherence 2/3");
  add_(bank, "CNAF TDD",   19, "comparison-elasticache", "Redis vs Oracle Coherence 3/3");
  add_(bank, "CNAF TDD",   20, "comparison-hazelcast", "Redis vs Hazelcast 1/2");
  add_(bank, "CNAF TDD",   21, "competitor-head-to-head", "Redis vs Hazelcast 2/2");
  add_(bank, "Nexi TDD",   31, "competitor-head-to-head", "OSS vs Enterprise analysis side-by-side");
  add_(bank, "CNAF POC",    7, "comparison-icon-score", "POC head-to-head Enterprise vs OpsTree 1/2");
  add_(bank, "CNAF POC",    8, "comparison-icon-score", "POC head-to-head Enterprise vs OpsTree 2/2");

  // ── 9. TDD SCORECARDS ──
  divider_(bank, 9, "TDD Scorecards");
  // Intesa classic scorecards
  add_(bank, "Intesa TDD", 19, "tdd-scorecard-workstream", "Value scorecard: Kubernetes Native");
  add_(bank, "Intesa TDD", 20, "tdd-scorecard-key-metrics", "Value scorecard: Configure & Right Size");
  add_(bank, "Intesa TDD", 21, "tdd-scorecard-validated-scenarios", "Value scorecard: Deploy FAST");
  add_(bank, "Intesa TDD", 22, "tdd-key-metrics-validated-scenarios", "Value scorecard: FAST & Always ON");
  // Iris AI/agentic scorecards (summary grids)
  add_(bank, "Iris TDD",   14, "tdd-scorecard-workstream", "Iris Explore & PoC scorecard: 9 dimensions");
  add_(bank, "Iris TDD",   24, "tdd-scorecard-workstream", "Iris Improve in Production scorecard: 9 dimensions");
  add_(bank, "Iris TDD",   34, "tdd-scorecard-workstream", "Iris Scale the Agentic Practice scorecard: 9 dimensions");
  // Iris individual scorecard details (best representatives)
  add_(bank, "Iris TDD",   15, "tdd-scorecard-key-metrics", "Iris: Zero-infra start (time-to-value metrics)");
  add_(bank, "Iris TDD",   18, "tdd-scorecard-key-metrics", "Iris: Grounded answers (context quality metrics)");
  add_(bank, "Iris TDD",   25, "tdd-scorecard-key-metrics", "Iris: Freshness as a feature (data freshness metrics)");
  add_(bank, "Iris TDD",   28, "tdd-scorecard-key-metrics", "Iris: Token cost down (economics metrics)");
  add_(bank, "Iris TDD",   35, "tdd-scorecard-key-metrics", "Iris: Built for agent traffic (scale metrics)");
  // Iris TDD methodology
  add_(bank, "Iris TDD",    9, "tdd-scorecard-validated-scenarios", "Scorecard anatomy: persona stars, workshop prompts, cell selection");
  add_(bank, "Iris TDD",   11, "tdd-exit-criteria-card", "Cell to exit-criteria card: baseline/target/owner/test/evidence");
  add_(bank, "Iris TDD",   12, "tdd-exit-criteria-card", "Five TDD outputs feeding one PoV decision");
  // Unicaja exit criteria
  add_(bank, "Unicaja TDD", 8, "tdd-exit-criteria-card", "Success criteria with testable pass/fail");

  // ── 10. POC PLAN ──
  divider_(bank, 10, "POC Plan");
  add_(bank, "Intesa TDD", 15, "poc-prerequisites", "POC prerequisites: operator, admin, sizing");
  add_(bank, "Intesa TDD", 16, "poc-scenario-chapters", "POC plan: chapter/scenario/success/metric/owner/timeline table");
  add_(bank, "Intesa TDD", 17, "poc-timeline", "POC plan visual: 4 workstreams");
  add_(bank, "CNAF TDD",   31, "poc-owner-assignment", "POC owners, sessions, and sequencing");
  add_(bank, "CNAF TDD",   30, "poc-methodology", "POC planning: 4 weeks, stakeholders");
  add_(bank, "Unicaja TDD", 9, "poc-objectives-recap", "Estimated POC timeline: 4 weeks");

  Logger.log("=== PART 1 DONE === OK: " + _ok + " | FAIL: " + _fail);
  Logger.log("Now run buildSlideBank_Part2()");
}

// ====== PART 2: Categories 11-20 ======

function buildSlideBank_Part2() {
  var bank = SlidesApp.getActivePresentation();
  _ok = 0; _fail = 0;

  // ── 11. POC RESULTS ──
  divider_(bank, 11, "POC Results");
  add_(bank, "CNAF POC",    4, "poc-results-kpi-synthesis", "KPI synthesis: failover, scaling, latency headlines");
  add_(bank, "CNAF POC",    5, "poc-results-performance-chart", "Pod loss results: 10x req/sec, 5x lower latency");
  add_(bank, "CNAF POC",    6, "poc-result-workstream", "Upgrade results: 10x req/sec, 28x lower latency");
  add_(bank, "CNAF POC",    7, "poc-results-operator-comparison", "Enterprise vs OpsTree comparison 1/2");
  add_(bank, "CNAF POC",    8, "poc-results-operator-comparison", "Enterprise vs OpsTree comparison 2/2");
  add_(bank, "CNAF POC",    9, "poc-results-verdict", "POC conclusions and next steps");
  add_(bank, "Unicaja TDD",11, "poc-results-gaps", "POC use cases progress tracker");

  // ── 12. PHASED IMPLEMENTATION ──
  divider_(bank, 12, "Phased Implementation");
  add_(bank, "Intesa TDD", 25, "implementation-jumpstart-adopt-scale", "Jumpstart/Adopt/Scale timeline with migration milestones");
  add_(bank, "CNAF TDD",   38, "implementation-quarterly-milestones", "Phased implementation with quarterly milestones");
  add_(bank, "CNAF TDD",   37, "implementation-migration-targets", "Use case adoption roadmap across phases");
  add_(bank, "Nexi TDD",   18, "implementation-quarterly-milestones", "Implementation timeline: PS kickoff to go-live (4 months)");
  add_(bank, "Nexi TDD",   20, "implementation-migration-targets", "Migration timeline: 6 weeks, wave-based");

  // ── 13. FUTURE STATE ──
  divider_(bank, 13, "Future State");
  add_(bank, "Intesa TDD", 13, "future-state-target-architecture", "Future state: Redis distributed caches + multi-region");
  add_(bank, "Intesa TDD", 14, "future-state-deployment-options", "Deployment: VM/K8s/Cloud + Redis Cloud ring");
  add_(bank, "Nexi TDD",    9, "future-state-good-looks-like", "Future state: benefits and positive outcomes (10 points)");
  add_(bank, "Unicaja TDD",12, "future-state-good-looks-like", "Desired future: scale, vector, cache, agent memory");

  // ── 14. MUTUAL ACTION PLAN ──
  divider_(bank, 14, "Mutual Action Plan");
  add_(bank, "Intesa TDD", 23, "map-action-owner-timeline", "MAP: action/owner/timeline table");
  add_(bank, "Nexi TDD",   22, "map-action-owner-timeline", "MAP: 7 actions with dates, owners, notes");
  add_(bank, "CNAF TDD",   40, "map-joint-next-steps", "Tracking objectives: bi-weekly/monthly/quarterly");

  // ── 15. CASE STUDY ──
  divider_(bank, 15, "Case Study");
  add_(bank, "CNAF TDD",   36, "case-study-customer-facing", "France Travail: legacy modernization, 98% processing time reduction");

  // ── 16. SIZING & PRICING ──
  divider_(bank, 16, "Sizing & Pricing");
  add_(bank, "Intesa TDD",  8, "sizing-methodology", "Application size split mapped to Redis shards");
  add_(bank, "Intesa TDD",  9, "sizing-capacity-planning", "Forecast data sizing mapped to Redis shards");
  add_(bank, "Nexi TDD",   16, "sizing-capacity-planning", "Sizing: current workload vs 2x (shards/memory/nodes)");
  add_(bank, "CNAF TDD",   27, "sizing-shard-pricing-table", "Shard-based pricing model: scale-up/scale-out");
  add_(bank, "CNAF TDD",   28, "sizing-ps-credits-packages", "Budget estimate: env/products/qty/price table");
  add_(bank, "CNAF POC",   10, "sizing-shard-pricing-table", "POC budget: Oracle Coherence replacement pricing");
  add_(bank, "Nexi TDD",   38, "sizing-shard-pricing-table", "Infra comparison: OSS vs Enterprise (prod + perf)");
  add_(bank, "Nexi TDD",   40, "sizing-ps-credits-packages", "Infra comparison summary with annual savings");

  // ── 17. SUPPORT & GOVERNANCE ──
  divider_(bank, 17, "Support & Governance");
  add_(bank, "CNAF TDD",   33, "support-tier-matrix", "Redis Technical Support tiers overview");
  add_(bank, "CNAF TDD",   34, "support-p1-p4-definitions", "Support P1-P4 priority definitions");
  add_(bank, "Nexi TDD",   59, "support-tier-matrix", "Enterprise support tiers with observability + dev suite");
  add_(bank, "Nexi TDD",   54, "governance-csm-role", "Pillars for success: CSM/TAM/Support/PS roles");
  add_(bank, "CNAF TDD",   39, "governance-csm-role", "Customer Success Manager role and cadence");
  add_(bank, "CNAF TDD",   40, "governance-cadence", "Bi-weekly/monthly/quarterly governance cadence");

  // ── 18. BUSINESS OUTCOMES ──
  divider_(bank, 18, "Business Outcomes");
  add_(bank, "Unicaja TDD",17, "business-outcomes-projected-benefits", "Positive business outcomes: control, flexibility, cost");
  add_(bank, "Unicaja TDD",15, "business-outcomes-roi-summary", "Renault AI Stack: 50% savings, 10x throughput, 90% LLM cost reduction");
  add_(bank, "Unicaja TDD",18, "business-outcomes-cost-reduction", "Measuring cache effectiveness: CHR, precision, recall, F1");
  add_(bank, "Nexi TDD",   33, "business-outcomes-roi-summary", "Value summary: anti-fraud, infra savings, scaling");
  add_(bank, "Nexi TDD",   42, "business-outcomes-cost-reduction", "Business impact: outage loss formula (TPS x fraud rate x loss/tx)");

  // ── 19. ROI / TCO ──
  divider_(bank, 19, "ROI / TCO");
  add_(bank, "CNAF POC",    9, "roi-tco-side-by-side", "Why at least 33% infrastructure savings");
  add_(bank, "Nexi TDD",   35, "roi-tco-side-by-side", "Projected infra costs: OSS linear vs Enterprise sub-linear");
  add_(bank, "Nexi TDD",   36, "roi-cost-waterfall", "Scaling with Enterprise: vertical + multi-tenancy pooling");
  add_(bank, "Nexi TDD",   37, "roi-cost-waterfall", "Enterprise results: 40-50% infra savings, sub-linear growth");
  add_(bank, "Nexi TDD",   41, "roi-cost-waterfall", "Infra comparison at 2x workload: OSS 36 nodes vs Enterprise 14");
  add_(bank, "CNAF TDD",   62, "roi-cost-waterfall", "CNAF slide 62 (user-requested)");

  // ── 20. CLOSING & NEXT STEPS ──
  divider_(bank, 20, "Closing & Next Steps");
  add_(bank, "CNAF TDD",   32, "closing-next-steps", "Self-training materials: docs, university, RedisInsight");
  add_(bank, "Nexi TDD",   60, "closing-next-steps", "DORA compliance mapping: DF/LT/MTTR/CFR with Redis");
  add_(bank, "Nexi TDD",   19, "closing-contact-info", "Online data migration: Replica Of, zero-downtime switch");

  Logger.log("=== PART 2 DONE === OK: " + _ok + " | FAIL: " + _fail);
  Logger.log("NEXT: Delete the original template placeholder slides (first ~133)");
}

// ====== PART 3: France Travail TAS + Pierre Slides Lab ======

function buildSlideBank_Part3() {
  var bank = SlidesApp.getActivePresentation();
  _ok = 0; _fail = 0;

  // ── FRANCE TRAVAIL TAS ──
  divider_(bank, 21, "France Travail TAS (POC patterns)");
  add_(bank, "FT TAS",  2, "architecture-current", "Current state: Redis on BOSH/TAS tile architecture");
  add_(bank, "FT TAS",  3, "architecture-proposed", "Future state: Redis on K8S with Service Broker for TAS6/10");
  add_(bank, "FT TAS",  4, "map-action-owner-timeline", "Action plan table: category/description/owner/date/status");
  add_(bank, "FT TAS",  5, "poc-timeline", "POC plan 4-6 weeks: workstreams, owners, milestones, success criteria");
  add_(bank, "FT TAS",  6, "poc-prerequisites", "POC pre-reqs & env setup: K8S, TAS, REC install");
  add_(bank, "FT TAS",  7, "poc-methodology", "POC connectivity & performance: scenarios and ateliers");
  add_(bank, "FT TAS",  8, "poc-scenario-chapters", "POC common usages & DevEx: backup, resize, delete scenarios");
  add_(bank, "FT TAS",  9, "poc-scenario-chapters", "POC chaos testing: pod kill, node kill, AZ loss scenarios");
  add_(bank, "FT TAS", 10, "poc-scenario-chapters", "POC Active-Active usages (optional): cross-region scenarios");

  // ── PIERRE LAB: SA Process Templates ──
  divider_(bank, 22, "Pierre Lab SA Templates");
  add_(bank, "Pierre Lab",  88, "scope-master-table", "Account tracker template: pain/app/3whys/TDD/POC columns");
  add_(bank, "Pierre Lab",  89, "poc-methodology", "Notional POC plan (blank template)");
  add_(bank, "Pierre Lab", 105, "poc-timeline", "Notional timeline: cloud trial, connectivity, perf baseline, POC");
  add_(bank, "Pierre Lab", 168, "scope-success-metrics", "Time To First: SA activity milestone tracker");
  add_(bank, "Pierre Lab", 173, "discovery-questions-checklist", "Discovery question template (EN)");
  add_(bank, "Pierre Lab", 214, "poc-timeline", "POV/POC plan: 8-week execution with workstream owners");
  add_(bank, "Pierre Lab", 215, "poc-timeline", "POV/POC plan: 6-week variant with chaos testing");

  // ── PIERRE LAB: Value Scorecards ──
  divider_(bank, 23, "Pierre Lab Value Scorecards");
  add_(bank, "Pierre Lab",  90, "tdd-scorecard-workstream", "Value scorecard: architecture, vectors, queries, DBaaS");
  add_(bank, "Pierre Lab",  92, "tdd-scorecard-key-metrics", "Value scorecard: operational KPIs (provision time, uptime, latency)");
  add_(bank, "Pierre Lab",  93, "tdd-scorecard-validated-scenarios", "Value scorecard: key metrics and success scenarii (K8s)");
  add_(bank, "Pierre Lab",  96, "tdd-scorecard-workstream", "Value scorecard Day 1: Cloud-specific (HA, sizing, security)");

  // ── PIERRE LAB: Architecture & HA ──
  divider_(bank, 24, "Pierre Lab Architecture");
  add_(bank, "Pierre Lab",  31, "architecture-cluster", "Single node architecture: control plane vs data plane");
  add_(bank, "Pierre Lab",  39, "architecture-cluster", "99.99% HA with rack zone awareness diagram");
  add_(bank, "Pierre Lab",  58, "architecture-cluster", "Shard failover diagram");
  add_(bank, "Pierre Lab",  63, "architecture-component-deep-dive", "Microservices multi-tenancy architecture");
  add_(bank, "Pierre Lab",  64, "architecture-cluster", "Vertical scalability via resharding");

  // ── PIERRE LAB: Competitive & Pricing ──
  divider_(bank, 25, "Pierre Lab Competitive & Pricing");
  add_(bank, "Pierre Lab", 102, "comparison-elasticache", "ElastiCache reserved memory vs Redis true-to-size TCO");
  add_(bank, "Pierre Lab", 103, "business-outcomes-cost-reduction", "Customer savings table: $2M Japanese giant, $1.36M Indian streaming");
  add_(bank, "Pierre Lab", 146, "comparison-icon-score", "Vector DB benchmark: Redis fastest across all datasets");
  add_(bank, "Pierre Lab",  83, "sizing-shard-pricing-table", "Redis Cloud pricing table: Nano through XLarge");

  // ── PIERRE LAB: Governance & Service Design ──
  divider_(bank, 26, "Pierre Lab Governance");
  add_(bank, "Pierre Lab", 211, "governance-cadence", "Service catalog decision framework: large/small/custom");
  add_(bank, "Pierre Lab", 212, "sizing-methodology", "T-shirt sizing: Small/Medium/Large target state");
  add_(bank, "Pierre Lab", 213, "governance-cadence", "Database governance: deployment patterns, A-A vs passive");

  Logger.log("=== PART 3 DONE === OK: " + _ok + " | FAIL: " + _fail);
  Logger.log("NEXT: Delete the original template placeholder slides (first ~133)");
}

// ====== FULL BUILD (if you have time, run this instead of parts) ======

function buildSlideBank() {
  buildSlideBank_Part1();
  buildSlideBank_Part2();
  buildSlideBank_Part3();
  Logger.log("=== FULL BUILD COMPLETE ===");
}

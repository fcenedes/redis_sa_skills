/**
 * SA Slide Bank Tagger v2
 *
 * Open the SA Slide Bank in Google Slides:
 *   Extensions > Apps Script > paste this > Run: tagSlideBank
 *
 * Uses an array (not object) to support multiple tags per slide.
 * Does NOT call saveAndClose() — changes save automatically.
 */

function tagSlideBank() {
  var deck = SlidesApp.getActivePresentation();
  var slides = deck.getSlides();
  var total = slides.length;
  Logger.log("Deck has " + total + " slides");

  // Array of [slideNumber (1-based), tag, description]
  var tags = [
    // === 1. Title & Agenda ===
    [5,   "title-customer",              "Red title slide with presenter name and date"],
    [7,   "title-tdd",                   "Dark title slide with image area"],
    [13,  "title-customer-dark",         "Dark title with full-bleed image"],
    [22,  "agenda-numbered",             "White body slide for numbered agenda items"],
    [27,  "agenda-numbered-dark",        "Dark body slide for agenda items"],

    // === 2. Current State & Pains ===
    [25,  "current-state-architecture",       "Two-column white for architecture diagrams"],
    [30,  "current-state-architecture-dark",  "Two-column dark for architecture diagrams"],
    [23,  "current-state-pain-points",        "Two-column white for pain points list"],
    [28,  "current-state-pain-points-dark",   "Two-column dark for pain points"],
    [40,  "current-state-stakeholder-map",    "Two-column white for stakeholder mapping"],

    // === 3. Three Whys ===
    [103, "three-whys-rich",             "Two-column comparison for Why Anything detailed"],
    [104, "three-whys-rich-dark",        "Dark two-column for Why Redis detailed"],
    [24,  "three-whys-condensed",        "One-column text for condensed 3-whys summary"],
    [29,  "three-whys-condensed-dark",   "Dark one-column for 3-whys summary"],
    [107, "three-whys-anything",         "Multi-column for why-anything grid"],
    [108, "three-whys-why-now",          "Dark multi-column for why-now urgency"],

    // === 4. Discovery ===
    [63,  "discovery-questions-checklist","Two-column white for discovery questions"],
    [64,  "discovery-meeting-notes",     "Dark two-column for meeting notes capture"],
    [102, "discovery-decision-drivers",  "Single column for customer decision drivers"],

    // === 5. Value Proposition ===
    [26,  "value-platform-overview",     "Centered title white for platform overview"],
    [31,  "value-platform-overview-dark","Dark centered for platform overview"],
    [105, "value-capability-grid",       "Two-column comparison for capability grid"],
    [106, "value-customer-matrix",       "Dark two-column for customer value matrix"],

    // === 6. Technical Scope ===
    [80,  "scope-master-table",          "Table white for topic/success/metric master scope"],
    [81,  "scope-master-table-dark",     "Dark table for master scope"],
    [82,  "scope-workstream-breakdown",  "Table white for workstream details"],
    [83,  "scope-workstream-breakdown-dark", "Dark table for workstream details"],
    [84,  "scope-success-metrics",       "Table white for success metrics"],
    [85,  "scope-success-metrics-dark",  "Dark table for success metrics"],

    // === 7. Architecture Diagrams ===
    [49,  "architecture-cluster",        "Blank white canvas for cluster diagram"],
    [50,  "architecture-proposed",       "Blank dark canvas for proposed architecture"],
    [51,  "architecture-current",        "Blank alt canvas for current state diagram"],
    [42,  "architecture-ai-pipeline",    "Two-column white for AI pipeline"],
    [43,  "architecture-ai-pipeline-dark","Dark two-column for AI pipeline"],
    [44,  "architecture-cache-aside",    "Two-column for cache-aside pattern"],
    [45,  "architecture-cache-aside-dark","Dark two-column for cache-aside"],
    [46,  "architecture-rdi",            "Two-column for RDI data flow"],
    [47,  "architecture-rdi-dark",       "Dark two-column for RDI flow"],
    [41,  "architecture-component-deep-dive", "Dark two-column for component deep dive"],
    [86,  "architecture-current-future", "Two-column for current vs future split"],
    [87,  "architecture-current-future-dark", "Dark timeline for current vs future"],
    [90,  "architecture-deployment-options-ring", "Timeline for deployment options"],

    // === 8. Competitor Comparison ===
    [109, "comparison-hazelcast",        "Table with highlights for Hazelcast comparison"],
    [110, "comparison-elastic",          "Table for Elastic/OpenSearch comparison"],
    [111, "comparison-elasticache",      "Table for ElastiCache comparison"],
    [112, "comparison-icon-score",       "Table for icon-scored comparison matrix"],
    [113, "competitor-head-to-head",     "Table for full head-to-head feature matrix"],

    // === 9. TDD Scorecards ===
    [61,  "tdd-scorecard-workstream",    "Org chart for per-workstream TDD scorecard"],
    [62,  "tdd-scorecard-workstream-dark","Dark org chart for TDD scorecard"],
    [91,  "tdd-key-metrics-validated-scenarios", "Dark timeline for metrics + scenarios pair"],
    [88,  "tdd-scorecard-key-metrics",   "Two-column for key metrics scorecard"],
    [89,  "tdd-scorecard-validated-scenarios", "Dark two-column for validated scenarios"],
    [92,  "tdd-exit-criteria-card",      "Two-column for exit criteria checklist"],

    // === 10. POC Plan ===
    [93,  "poc-prerequisites",           "Dark two-column for POC prerequisites"],
    [94,  "poc-scenario-chapters",       "Dark title for POC scenario chapters table"],
    [95,  "poc-timeline",                "Two-column for POC timeline"],
    [96,  "poc-timeline-dark",           "Dark two-column for POC timeline"],
    [97,  "poc-owner-assignment",        "Dark two-column for owner assignment"],
    [98,  "poc-objectives-recap",        "GTM roadmap for objectives recap"],
    [99,  "poc-methodology",             "GTM roadmap for POC methodology"],

    // === 11. POC Results ===
    [35,  "poc-results-kpi-synthesis",   "Big number for KPI synthesis headline"],
    [36,  "poc-results-performance-chart","Big number for performance comparison"],
    [115, "poc-results-operator-comparison",    "Chart slide for operator comparison"],
    [116, "poc-results-operator-comparison-dark","Dark chart for operator comparison"],
    [100, "poc-results-verdict",         "Dark GTM roadmap for verdict and next steps"],
    [101, "poc-results-gaps",            "Dark GTM roadmap for gaps and remediation"],
    [32,  "poc-result-workstream",       "Blank white for per-workstream results"],

    // === 12. Phased Implementation ===
    [33,  "implementation-jumpstart-adopt-scale", "Blank dark for jumpstart-adopt-scale"],
    [34,  "implementation-quarterly-milestones",  "Blank for quarterly milestones"],
    [37,  "implementation-migration-targets",     "Custom stat for migration targets"],

    // === 13. Future State ===
    [52,  "future-state-target-architecture",  "Divider white for target architecture"],
    [53,  "future-state-deployment-options",   "Divider dark for deployment options"],
    [54,  "future-state-good-looks-like",      "Divider dark-alt for desired end state"],

    // === 14. Mutual Action Plan ===
    [114, "map-action-owner-timeline",   "Table for action/owner/timeline MAP"],
    [117, "map-joint-next-steps",        "Line chart adapted for joint next steps"],
    [118, "map-decision-checkpoints",    "Combo chart adapted for decision checkpoints"],

    // === 15. Case Study ===
    [48,  "case-study-customer-facing",  "Case study with logo, QR code, metrics"],
    [79,  "case-study-presenter-notes",  "Logo grid adapted for case study sources"],
    [119, "case-study-challenge-solution-results", "Area chart adapted for challenge/solution/results"],
    [120, "case-study-metrics",          "Column chart adapted for metric highlights"],

    // === 16. Sizing & Pricing ===
    [121, "sizing-shard-pricing-table",  "Stacked chart adapted for shard pricing table"],
    [122, "sizing-methodology",          "Doughnut chart adapted for sizing methodology"],
    [123, "sizing-capacity-planning",    "Scatter chart adapted for capacity planning"],
    [124, "sizing-ps-credits-packages",  "Alt chart for PS credits and packages"],

    // === 17. Support & Governance ===
    [125, "support-tier-matrix",         "Venn diagram adapted for support tier comparison"],
    [126, "support-p1-p4-definitions",   "Segmented cycle for P1-P4 definitions"],
    [127, "governance-cadence",          "Pie chart adapted for governance cadence"],
    [128, "governance-csm-role",         "Doughnut grid for CSM role description"],

    // === 18. Business Outcomes ===
    [38,  "business-outcomes-roi-summary",       "Custom stat FAST for ROI headline"],
    [39,  "business-outcomes-projected-benefits", "Custom stat for projected benefits"],
    [65,  "business-outcomes-cost-reduction",     "Big number XX% for cost reduction"],
    [66,  "business-outcomes-summary",            "Dark big number for outcomes summary"],

    // === 19. ROI/TCO ===
    [67,  "roi-tco-side-by-side",        "Dark big number for TCO comparison"],
    [68,  "roi-cost-waterfall",          "Dark big number for cost waterfall"],
    [69,  "roi-timeline",                "Dark big number for ROI timeline"],
    [129, "roi-cost-per-operation",      "Doughnut grid dark for cost per operation"],
    [130, "roi-downtime-cost-formula",   "Device mockup white for downtime formula"],
    [131, "roi-current-state-costs",     "Device mockup dark for current state costs"],
    [132, "roi-executive-summary",       "World map white for executive summary"],
    [133, "roi-business-case-summary",   "World map dark for business case"],
    [134, "roi-risk-assumptions",        "US map for risk assumptions"],
    [135, "roi-recommendation",          "US map dark for recommendation"],

    // === 20. Closing ===
    [55,  "closing-thank-you",           "Red closing slide"],
    [56,  "closing-next-steps",          "Dark closing slide"],
    [57,  "closing-contact-info",        "Dark alt closing with contact info"],

    // === QBR-specific ===
    [70,  "qbr-achievements",            "Icon library light adapted for QBR achievements"],
    [74,  "qbr-usage-health",            "Icon library dark for usage health metrics"],
    [71,  "qbr-roadmap-upcoming",        "Icon library for upcoming quarter roadmap"],
    [75,  "qbr-risks-blockers",          "Icon library dark for risks and blockers"],
    [76,  "qbr-relationship-summary",    "Icon library dark for relationship summary"]
  ];

  var tagged = 0;
  var skipped = 0;
  var errors = [];

  for (var i = 0; i < tags.length; i++) {
    var slideNum = tags[i][0];
    var bankTag = tags[i][1];
    var desc = tags[i][2];

    if (slideNum < 1 || slideNum > total) {
      errors.push("Slide " + slideNum + " out of range (" + bankTag + ")");
      skipped++;
      continue;
    }

    try {
      var slide = slides[slideNum - 1];
      var notesPage = slide.getNotesPage();
      var shapes = notesPage.getShapes();
      var notesShape = null;

      // Find the body placeholder in notes
      for (var s = 0; s < shapes.length; s++) {
        if (shapes[s].getPlaceholderType() === SlidesApp.PlaceholderType.BODY) {
          notesShape = shapes[s];
          break;
        }
      }

      if (!notesShape) {
        errors.push("Slide " + slideNum + " no notes body (" + bankTag + ")");
        skipped++;
        continue;
      }

      var existing = notesShape.getText().asString().trim();
      var tagLine = "[SA-BANK:" + bankTag + "]";

      if (existing.indexOf(tagLine) !== -1) {
        Logger.log("Already tagged: S" + slideNum + " " + bankTag);
        skipped++;
        continue;
      }

      // Append tag (supports multiple tags per slide)
      var newContent = existing
        ? existing + "\n" + tagLine + "\n" + desc
        : tagLine + "\n" + desc;

      notesShape.getText().setText(newContent);
      tagged++;
      Logger.log("Tagged: S" + slideNum + " -> " + bankTag);

    } catch (e) {
      errors.push("Slide " + slideNum + " error: " + e.message + " (" + bankTag + ")");
      skipped++;
    }
  }

  Logger.log("=== DONE ===");
  Logger.log("Tagged: " + tagged);
  Logger.log("Skipped: " + skipped);
  if (errors.length > 0) {
    Logger.log("Errors:\n" + errors.join("\n"));
  }
}

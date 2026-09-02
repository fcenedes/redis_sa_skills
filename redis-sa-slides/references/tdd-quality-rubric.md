# TDD quality rubric

Use this rubric to build and review Redis SA Technical Deep Dive decks. A strong
TDD deck explains the customer's current technical reality, the Redis-based
future state, the validated pain behind the change, and the POC criteria that
will prove whether the proposed architecture works.

The quality bar is evidence. Avoid vague claims. Use real metrics when the user
provides them, and mark missing evidence as `[TODO: need metric]` or a more
specific `[TODO: ...]` gap.

## 1. Before Architecture (current state)

The current-state section must make the existing system concrete enough that an
engineer, architect, finance stakeholder, or executive sponsor can see why the
change is necessary.

Capture the current stack:

- Databases currently in use.
- Caches currently in use.
- Queues, streams, brokers, or eventing systems currently in use.
- Search, vector, analytics, or operational data stores currently in use.
- Application languages and frameworks that depend on these components.
- Cloud provider, region, deployment model, and network boundaries.
- Where Redis currently fits, if Redis is already present.
- Where Redis would fill a gap, if Redis is not already present.

Capture scale:

- Total data volume, including hot, warm, and archived data if relevant.
- Read QPS and write QPS, separated where possible.
- Peak QPS versus average QPS.
- Burst patterns, seasonal peaks, batch windows, and failover load.
- Current latency distribution, especially p95 and p99.
- Timeout rate, retry rate, error rate, and queue depth.
- Dataset growth rate by day, month, quarter, or year.
- Number of tenants, apps, regions, users, devices, or transactions served.
- Current infrastructure footprint: nodes, vCPU, memory, storage, licenses, and
  managed-service units.

Capture known technical pain with measured symptoms:

- Use latency numbers, not "it is slow".
- Use timeout or error percentages, not "it is unreliable".
- Use failover incident counts, failover duration, and recovery steps, not
  "failover is risky".
- Use cost per unit of scale, not "it is expensive".
- Use utilization, saturation, and capacity numbers, not "it does not scale".
- Use operational evidence: pager frequency, manual runbook steps, deployment
  freezes, data repair effort, or incident hours.

Capture constraints:

- Required language, framework, runtime, or client libraries.
- Existing API contracts or data contracts that cannot change immediately.
- Consistency, durability, retention, and ordering requirements.
- Cloud, Kubernetes, VM, bare-metal, hybrid, or on-premises deployment
  constraints.
- Security, network, compliance, data residency, and encryption constraints.
- Migration windows, blackout periods, release cadence, and dependency teams.
- Operational ownership and support constraints.

Every pain must state what it costs. Negative consequences with metrics are
required for a strong TDD.

Quantify performance waste:

- Formula: `stranded capacity = provisioned capacity - useful utilized capacity`.
- Example: `720 vCPU provisioned x 10-15% useful utilization = 612-648 vCPU
  stranded`.
- Example slide claim: `Only 10-15% CPU utilization on 720 vCPU means more than
  90% of paid compute is not contributing useful work.`

Quantify availability risk:

- Formula: `SLA gap seconds = current annual downtime seconds - target annual
  downtime seconds`.
- Formula: `availability exposure = SLA gap seconds x business loss per second`.
- Example: `EUR 112.50/sec fraud loss x 31,536 sec/year SLA gap =
  EUR 3.55M/year exposure`.
- Name the failure mode: single-AZ loss, node loss, shard loss, split brain,
  delayed failover, manual recovery, or data rebuild.

Quantify operational fragility:

- Name what breaks under the current model.
- Example: `Not tolerant against single AZ failure. Losing one AZ can remove
  one third of the data-bearing nodes.`
- Example: `Manual shard rebalancing requires 2 engineers for 4 hours per
  event, repeated 6 times per quarter.`
- Formula: `operational cost = people involved x hours per event x event count
  x loaded hourly cost`.

Quantify cost of inaction:

- Formula: `annual cost of inaction = downtime exposure + stranded capacity cost
  + operational toil cost + growth-driven infrastructure increase`.
- Include real numbers when available.
- If real numbers are missing, keep the formula and mark the missing inputs.
- Example: `EUR 112.50/sec fraud loss x 31,536 sec/year SLA gap =
  EUR 3.55M/year exposure`.
- Example: `8 extra nodes x EUR 1,625/month x 12 months = EUR 156K/year
  avoidable infrastructure cost`.

Minimum quality bar:

- Each current-state pain has a measured symptom.
- Each measured symptom has a consequence.
- Each consequence has a number, formula, or visible `[TODO: need metric]`.
- The deck names the technical constraint that Redis must respect.

## 2. After Architecture (proposed state)

The proposed-state section must show what changes technically, how Redis fits,
how the customer gets there, and which metrics improve.

Describe the Redis-based architecture:

- Which Redis deployment model is proposed: Redis Cloud, Redis Enterprise
  Software, Redis Community Edition, or hybrid.
- Which Redis capabilities are used: caching, session store, vector search,
  Redis Query Engine, JSON, Streams, probabilistic structures, active-active,
  clustering, persistence, or high availability.
- What Redis replaces.
- What Redis augments without replacing.
- What remains unchanged.
- Which application paths read from Redis.
- Which application paths write to Redis.
- Which systems of record remain authoritative.
- Which data is ephemeral, cached, derived, replicated, indexed, or persisted.

Describe integration points:

- Application-layer integration: clients, connection pooling, retries,
  pipelines, key naming, TTLs, serialization, and error handling.
- Data-pipeline integration: CDC, batch loads, stream producers and consumers,
  search indexing, vector embedding flows, or cache warming.
- Operations integration: observability, alerts, backup/restore, failover tests,
  runbooks, SLOs, and ownership.
- Security integration: ACLs, TLS, private connectivity, secret handling, data
  residency, and audit requirements.
- Platform integration: Kubernetes, Terraform, CI/CD, cloud networking,
  service discovery, and environment promotion.

Describe migration path:

- State the cutover model: parallel run, phased cutover, big-bang, shadow read,
  dual write, replay, or read-through/write-through introduction.
- Explain how risk was discussed with engineers.
- Identify rollback paths and decision gates.
- Identify data migration steps, validation checks, and reconciliation strategy.
- Identify which teams own app changes, platform changes, data migration, and
  production readiness.
- Identify required customer inputs and open questions.

Positive outcomes with metrics are required. Tie each improvement to the
current-state pain it resolves.

Quantify performance improvement:

- Example: `CPU utilization moves from 10-15% useful work to 70-80% useful
  work, with all cores contributing.`
- Example: `p99 read latency target decreases from [TODO: current p99] to
  [TODO: target p99] at [TODO: QPS].`
- Formula: `latency improvement = current p99 - target p99`.
- Formula: `throughput headroom = proven peak QPS / current peak QPS`.

Quantify availability improvement:

- Example: `99.99% availability means about 28K fewer seconds of downtime per
  year compared with 99.9%.`
- Formula: `annual downtime seconds = 31,536,000 x (1 - availability target)`.
- Formula: `downtime reduction = current annual downtime seconds - target annual
  downtime seconds`.
- Connect the architecture feature to the availability result: replica placement,
  quorum, multi-AZ, active-active, persistence, or automated failover.

Quantify infrastructure savings:

- Example: `$156K/year savings, 76% reduction`.
- Include node consolidation, license consolidation, managed-service reduction,
  storage reduction, or avoided overprovisioning where relevant.
- Formula: `annual savings = current annual run cost - proposed annual run cost`.
- Formula: `reduction percent = annual savings / current annual run cost x 100`.

Quantify scaling headroom:

- Example: `Linear scaling to 2x volume without doubling nodes.`
- Formula: `headroom ratio = proven target volume / current peak volume`.
- Formula: `node efficiency = target QPS / proposed node count`.
- Explain whether scaling is vertical, horizontal, sharded, replicated,
  active-active, or workload-separated.

Minimum quality bar:

- The future-state diagram maps Redis components to current-state pains.
- The deck names what Redis replaces, augments, and leaves unchanged.
- The migration path includes a risk-managed cutover approach.
- Each positive outcome has a metric, formula, or visible `[TODO: need metric]`.

## 3. Technical Pain Validation

The validation section proves that the pain is real for the technical team and
that the proposed proof work is anchored in engineering requirements.

Confirm the technical stakeholder:

- Name the technical stakeholder role, not only the business champion.
- Preferred evidence: architect, staff engineer, platform owner, operations
  owner, application owner, data owner, or security owner confirmation.
- Capture severity in the stakeholder's terms.
- Capture whether the stakeholder has authority to validate a POC or recommend
  production adoption.

Capture concrete technical requirements:

- Latency SLA, including p95, p99, or mean and where it is measured.
- Throughput target, including read/write mix and peak conditions.
- Consistency model: strong, eventual, read-your-writes, session consistency, or
  explicit tolerance.
- Availability target and failure domains: node, rack, AZ, region, network,
  process, or operator error.
- Recovery requirements: RTO, RPO, failover time, restore time, replay time, and
  manual intervention limits.
- Data size limits: object size, key count, index size, vector dimensions,
  retention, stream length, and memory budget.
- Security and compliance requirements: TLS, ACL, private network, encryption,
  data residency, audit, masking, or production-data restrictions.
- Operability requirements: observability, alerts, runbooks, backup cadence,
  upgrade process, support model, and ownership.

Plan or cite technical proof points:

- POC planned with testable criteria.
- Benchmark planned or completed with dataset, load shape, and measurement
  method.
- Architecture review sign-off planned or completed.
- Migration dry run planned or completed.
- Failure-mode test planned or completed.
- Security review planned or completed.
- Cost model reviewed with infrastructure or finance owner.

Minimum quality bar:

- A technical stakeholder confirmed the pain and severity.
- Requirements are concrete enough to shape architecture decisions.
- The deck names the proof point that will validate the proposed path.
- Business value claims trace back to technical pain, not generic Redis value.

## 4. POC Plan Review

Use this section only when a POC exists or is being proposed. Each checklist
item must be scored independently.

Scoring:

- `ANSWERED`: The deck provides enough detail for a third party to evaluate the
  item without asking the SA to interpret it.
- `PARTIAL`: The deck mentions the item but leaves ambiguity, missing numbers,
  missing ownership, or missing evidence.
- `NOT ANSWERED`: The deck does not address the item.

Record the score beside each item and add a remediation note for every
`PARTIAL` or `NOT ANSWERED` score.

1. Criteria map back to Why Redis capabilities.
   - Score: `ANSWERED` / `PARTIAL` / `NOT ANSWERED`.
   - Check both directions: every POC criterion should map to a Redis capability
     or architecture decision, and every claimed Redis capability should have a
     corresponding validation criterion.
   - Flag untested capabilities.
   - Flag unjustified criteria that do not connect to the proposed architecture.
2. Criteria are testable.
   - Score: `ANSWERED` / `PARTIAL` / `NOT ANSWERED`.
   - A third party must be able to determine pass or fail from the stated text
     alone.
   - Replace subjective wording with measurable thresholds, datasets,
     operations, and observation points.
3. Latency targets are numerical and measurable.
   - Score: `ANSWERED` / `PARTIAL` / `NOT ANSWERED`.
   - Specify measurement point: application, Redis client, Redis server, proxy,
     network boundary, or external monitor.
   - Specify statistical target: p95, p99, mean, max, or percentile band.
   - Specify load condition: QPS, concurrency, payload size, dataset size, and
     read/write mix.
4. Qualitative criteria are flagged.
   - Score: `ANSWERED` / `PARTIAL` / `NOT ANSWERED`.
   - Terms such as `fast`, `easy`, `seamless`, `scalable`, `simple`, and
     `production-ready` are not pass/fail conditions by themselves.
   - Convert qualitative criteria into measurable thresholds or mark
     `[TODO: define pass/fail]`.
5. Vector and search criteria include accuracy targets.
   - Score: `ANSWERED` / `PARTIAL` / `NOT ANSWERED`.
   - For vector search, include recall@k, precision, relevance judgment method,
     embedding model, dimensions, distance metric, and candidate count when
     relevant.
   - For search, include expected matching behavior, filter behavior, indexing
     freshness, query examples, and relevance acceptance criteria.
   - Do not accept latency-only validation for retrieval quality.
6. Each criterion has an owner assigned.
   - Score: `ANSWERED` / `PARTIAL` / `NOT ANSWERED`.
   - Name the customer owner, Redis owner, or joint owner responsible for
     preparing data, running the test, validating the result, and signing off.
   - Ownership should include due date or review cadence when the POC spans
     multiple meetings.
7. Datasets are sufficient, clear, and tied to future-state architecture.
   - Score: `ANSWERED` / `PARTIAL` / `NOT ANSWERED`.
   - State dataset size, shape, cardinality, skew, payload size, TTL or
     retention, vector dimensions, query mix, and growth assumptions where
     relevant.
   - Explain how the dataset represents the target production workflow.
   - Flag toy datasets that cannot validate future-state architecture.
8. Data source is identified and cleared.
   - Score: `ANSWERED` / `PARTIAL` / `NOT ANSWERED`.
   - Identify whether data is production, synthetic, masked, sampled, replayed,
     generated, or exported from another environment.
   - Confirm security, compliance, privacy, and data-residency clearance before
     using customer data.
   - Identify who can approve data use and who can provide the data.

Minimum quality bar:

- The checklist has 8 scored items.
- Each item has `ANSWERED` / `PARTIAL` / `NOT ANSWERED` scoring.
- Any `PARTIAL` or `NOT ANSWERED` item has a remediation note.
- The POC plan can be evaluated without private explanation from the SA.

## How the skill uses the rubric

When building a TDD deck, use the rubric to guide deck construction:

- Prompt the SA for the right level of current-state detail: stack, scale,
  constraints, measured pain, and quantified consequences.
- Check that Before Architecture slides contain measured symptoms, not vague
  pain.
- Check that negative-consequence slides include formulas or concrete figures.
- Check that After Architecture slides include a Redis architecture, integration
  points, migration path, and specific metrics per improvement area.
- Check that POC Plan slides have testable, numerical, owned criteria.
- Flag any slide that says `fast`, `easy`, `seamless`, or `scalable` without a
  number or pass/fail threshold.
- Mark `[TODO: need metric]` on any claim missing quantification.

When building a POC Results deck, cross-reference the POC criteria from this
rubric against actual results:

- Show which criteria passed, partially passed, failed, or were not tested.
- Keep methodology, dataset, measurement point, and ownership visible.
- Preserve gaps honestly instead of turning untested areas into wins.
- Convert unresolved items into next-step actions with owners.

When building an ROI/TCO deck, use this rubric to construct the business case:

- Pull negative-consequence formulas from Before Architecture.
- Pull positive-outcome metrics from After Architecture.
- Convert technical pain into annualized cost, risk exposure, avoided
  infrastructure spend, operational toil reduction, or scaling headroom.
- Keep assumptions explicit and mark missing inputs as `[TODO: need metric]`.
- Do not invent customer data, financial loss, utilization, downtime, or savings.

## Final checklist

- [ ] Before Architecture captures stack, scale, constraints, measured pain, and
  negative consequences with formulas.
- [ ] After Architecture captures Redis architecture, integration, migration, and
  positive outcomes with metrics.
- [ ] Technical Pain Validation identifies a technical stakeholder, concrete
  requirements, and proof points.
- [ ] POC Plan Review has exactly 8 checklist items, each scored
  `ANSWERED` / `PARTIAL` / `NOT ANSWERED`.
- [ ] Deck-building, POC Results, and ROI/TCO uses are explicit.
- [ ] Vague claims are flagged or replaced with metrics.

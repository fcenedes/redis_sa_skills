# Output Rubric: agent-memory-coordination

Grade each run against these criteria. 1-2 lines each.

- **Trigger correctness**: Did the skill activate for live multi-worker dispatch, worker-prompt storage, or gate-result recording, and correctly defer capability/readiness questions to agent-capability-ledger?
- **False-positive avoidance**: Did it avoid wrapping a single explicit test-run or simple question in memory-lookup/dispatch ceremony when no coordination was requested?
- **False-negative avoidance**: Did it activate on indirect coordination asks (e.g., "the auth and billing workers both need the same file") without the word "coordinate"?
- **Task fit**: Did each worker get a disjoint file-ownership set, with shared files reserved for a separate integrator prompt rather than co-owned?
- **Output usefulness**: Did the response report backend, namespace, `user_id`, read/write capability, and fallback status in the required report shape, not a vague "memory checked" statement?
- **Safety compliance**: Did it perform lazy-loaded write-tool discovery before declaring memory read-only/unavailable, and record skipped live proofs as skipped, never as passed?
- **Token discipline**: Did it point to `references/examples.md` and `references/tool-discovery.md` for copy-ready shapes instead of re-deriving them inline?
- **Evidence requirements**: Do episodic gate-result memories include dated, self-contained facts (no unresolved pronouns) with command and result?
- **Verification requirements**: Did it run the integration pass and full quality gate before commit/push when workers touched adjacent systems or shared files?
- **Anti-overreach**: Did it avoid building or maintaining capability-ledger row data (status/proof class/evidence path), leaving that to agent-capability-ledger?
- **Final-answer quality**: Does the final report include worker ownership, changed files, test/gate results, and re-anchor confirmation when anchored plan files exist?

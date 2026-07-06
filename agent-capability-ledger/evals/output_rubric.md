# Output Rubric: agent-capability-ledger

Grade each run against these criteria. 1-2 lines each.

- **Trigger correctness**: Did the skill activate for "what's done/missing", readiness, audit, or follow-up-planning questions, and correctly defer when the ask was actually live worker dispatch (agent-memory-coordination) or plan-state advancement (agent-plan-lifecycle)?
- **False-positive avoidance**: Did it avoid building a ledger for simple git/log/diff requests or unrelated infra questions that only mention a repo in passing?
- **False-negative avoidance**: Did it activate on indirect phrasing like "did we already do this?" or "track what's done before a follow-up plan" without the word "ledger"?
- **Task fit**: Did every capability get one row with a single status (`done`/`partial`/`missing`/`blocked`/`superseded`), split by ownership/proof type rather than bundled?
- **Output usefulness**: Did delta tasks come only from non-`done`/non-`superseded` rows, with an explicit next delta task per row?
- **Safety compliance**: Did it refuse to accept chat/memory claims as proof, and refuse to store secrets/credentials in memory sync packets?
- **Token discipline**: Did it load reference files (proof-taxonomy, memory-sync, redis-array-mirror) only when the task needed that specific detail, rather than dumping all references?
- **Evidence requirements**: Does every `done` row have both an evidence path and a verification command, not just one?
- **Verification requirements**: Did it flag stale proof (code changed after last validation) as a verification task before allowing implementation tasks?
- **Anti-overreach**: Did it avoid touching worker-prompt/gate-result memory (agent-memory-coordination's scope) and avoid advancing plan lifecycle state (agent-plan-lifecycle's scope)?
- **Final-answer quality**: Does the final report include a reconciliation summary (already satisfied / partial / missing / blocked / superseded IDs) that is directly usable as planning input?

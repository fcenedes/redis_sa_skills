# Model And Cost Routing Scenarios

Use an existing authorized file-backed plan for every dispatch scenario. Have a
reader select a route from the skill, then assess against the expectations below.
These check guidance consistency, not model performance or real provider billing.
Refresh price inputs alongside the pricing reference; do not preserve them as
timeless assumptions. An ordinary direct-edit request must still avoid dispatch.

| Scenario | Expected decision |
|---|---|
| Host offers Astra, Sol, Terra, Luna, GPT-5.5. Need a bounded docs/tests worker. | Luna low/medium or a justified direct/local route; do not select GPT-5.4, which this host does not offer. |
| Normal multi-file implementation. Standard input/output per 1M: Luna $0.20/$1.20, Terra $2/$12, Sol $4/$20, GPT-5.4 $2.50/$15, GPT-5.5 $5/$30. | Terra medium is the starting candidate; Sol if difficulty warrants. Do not claim GPT-5.4/5.5 are cheaper. File count alone does not force high. |
| Claude coordinator has Haiku 4.5, Sonnet 5, Opus 4.6, Opus 5, Fable 5.1. Need normal coding and an ambiguous architecture review. | Native Sonnet 5 medium if evaluated, otherwise high, for coding; explicit Opus 4.6 high for architecture; newer Opus/Fable only for demonstrated benefit including tokenizer-adjusted cost. No mandatory Codex bridge. |
| Haiku worker tool accepts a generic effort field but provider does not support it. | Omit the unsupported setting, record not supported; do not invent low effort. |
| API documentation lists GPT-5.4 but subagent tool does not; user explicitly pins it. | Report unavailable on this route; use another verified route supporting the pin or obtain a changed selection. Never silently substitute. |
| Fable 5.1 has a lower cache-hit rate than Opus 5. Output volume and cache creation are unknown. | No claim that Fable is cheaper overall; request/estimate usage, include writes/output/retries, preserve unknowns. |
| Worker is paid via subscription credits or Priority/Fast, but price sheet shows Standard API rates. | Record the actual billing surface/tier and verify its rates. Do not treat the Standard dollar estimate as the user's bill. |
| Two failed Terra attempts then Sol, each using 100k uncached input and 10k output, no tools/cache. | Arithmetic cost $1.24; one successful Sol attempt would be $0.60. Distinguish this synthetic example from measured task reliability. |
| Routine final documentation verification with an existing independent gate. | Capable fresh-context verifier; no mandatory Astra/Fable or two-provider review. Preserve the gate. |
| Choose a faster Claude mode to save cost; keep a cache alive for an hour. | `/fast` is a premium latency choice, not an Opus 4.6 cost selector. Choose cache TTL explicitly when appropriate; do not buy keepalive calls for presumed savings. |
| Local Qwen3-Coder-Next is available but memory fit and latency are unknown. | Check runtime tag/quantization, total memory, tools, and accepted-result latency; 3B active parameters do not mean 3B storage or zero cost. |
| Opus 4.6 and Opus 5 have equal $5/$25 rates; newer tokenizer uses approximately 1.3x tokens for the same text. | Prefer explicit Opus 4.6. Estimate roughly 30% higher token cost for equivalent text on newer Opus; upgrade only with demonstrated benefit. Do not use xhigh on Opus 4.6. |
| Sonnet 5 uses the newer tokenizer but costs $2/$10 versus Sonnet 4.6 at $3/$15. | A 1.3x token estimate yields $2.60/$13 per equivalent older-tokenizer text volume. Do not claim all newer Claude models cost more; compare actual usage and quality. |

For each case record requested/actual model and supported effort, availability,
billing basis, routing reason, fallback, and remaining unknowns. Fail the check
if a generic role default contradicts the model table or current price inputs.

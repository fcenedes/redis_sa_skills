# Agent Routing Table

Reviewed: **2026-09-10**. Treat these routes as starting hypotheses to validate
on representative tasks, not measured cross-model performance rankings. Use the
[pricing snapshot and cost method](model-pricing.md) for dated prices. Honor
explicit user/project model pins; report unavailable pins instead of silently
substituting. Support both Codex and Claude coordinators and workers.

## Selection Order

1. Confirm authorization, tools, context needs, quality gates, and deadline.
2. Inspect the host's callable model IDs and supported effort levels. A public
   API model, local cache entry, or vendor alias does not prove worker access.
3. Choose the least costly available route likely to pass those gates. Include
   context transfer, retries, review, tool charges, and latency in the decision.
4. Set model and effort explicitly; record the cost basis and fallback. Escalate
   for a concrete capability gap or failed quality gate, not a newer version.
5. Compare accepted results and actual usage before promoting a recurring route.

Claude coordinators may use their native Claude workers. Cross-provider routing
requires an explicit bridge/tool/CLI or human handoff; Claude names are not
Codex IDs. Use direct execution when delegation overhead exceeds its benefit.
For contracts and commands, load [specialist-roles](specialist-roles.md) and
[command-patterns](command-patterns.md) only as needed.

## Codex Models

The reviewed host exposes Astra, Sol, Terra, Luna, and GPT-5.5. GPT-5.4 is absent
from this host's subagent schema; retain it only for other verified routes.
Re-check availability on the destination host at dispatch time.

| Explicit model | Starting route | Escalation or fallback condition |
|---|---|---|
| `gpt-5.6-luna` | Bounded docs, tests, small fixes, mechanical edits; low/medium. | Move to Terra when repository reasoning or tool use exceeds its demonstrated reliability. |
| `gpt-5.6-terra` | Normal implementation, bounded multi-file work, ordinary review; medium. | Move to Sol for harder debugging, integration, or broader dependencies. Multiple files alone do not require high effort. |
| `gpt-5.6-sol` | Complex coding, sustained repo work, difficult regressions, substantive audits; medium/high. | Move to Astra when ambiguity, consequences, or observed quality justify the premium. Sol is not restricted to final review. |
| `gpt-6-astra` | Demanding architecture, unresolved subtle bugs, high-risk cross-system judgment. | Start with the lowest effort that preserves quality; justify premium model and additional effort separately. |
| `gpt-5.5` | Explicit pins, compatibility, or a workload where evaluations favor it. | Do not label it cheaper than Sol: its current standard token rates are higher. |
| `gpt-5.4` | Compatibility/pinned work on a host that actually exposes it. | Do not use as the default budget worker: Luna and Terra have lower current token rates. |

This division follows the current [Codex catalog](https://learn.chatgpt.com/docs/models),
[Luna](https://developers.openai.com/api/docs/models/gpt-5.6-luna),
[Terra](https://developers.openai.com/api/docs/models/gpt-5.6-terra), and
[Sol](https://developers.openai.com/api/docs/models/gpt-5.6-sol) descriptions,
with repo-specific task recommendations rather than vendor benchmark claims.

## Task And Role Defaults

| Task / role | Codex starting route | Claude starting route |
|---|---|---|
| Docs Worker, mechanical patch, ledger maintenance | Direct edit, tested local Qwen, or Luna low/medium. | Direct edit or Haiku 4.5 where sufficient; Sonnet 5 for harder content. |
| Implementor, Packet Worker, ordinary PR Reviewer | Terra medium. | Sonnet 5 medium after quality validation, otherwise high. |
| Coordinator, Spec Writer, Packet Reviewer | Terra medium for bounded scope; Sol medium/high for complex dependencies. | Sonnet 5 for bounded scope; Opus 4.6 high for ambiguous or consequential work. |
| UI Designer | Terra medium for known patterns; Sol/high for difficult interaction or visual problems. | Sonnet 5; Opus 4.6 for complex UI problems. Require browser/visual verification on either route. |
| Verifier, Capability Auditor, integration | Terra medium for straightforward evidence; Sol high for difficult gates. | Sonnet 5 for ordinary evidence; Opus 4.6 high for difficult gates. |
| Architecture, hard debugging, high-risk Auditor | Sol high; Astra when a concrete capability gap justifies it. | Opus 4.6 high; newer Opus/Fable only when demonstrated quality or latency gains justify total cost. |

For a required independent final gate, use a fresh-context verifier with access
to the evidence. Independence does not require a different provider or the most
expensive model. Use two-model review when the plan requires it or its expected
benefit justifies the extra cost; preserve every verification gate.

## Codex Effort And Surface Support

| Effort | Starting use |
|---|---|
| `low` | Mechanical changes, bounded extraction, simple questions. |
| `medium` | Normal implementation, tests, docs, routine review. |
| `high` | Difficult debugging, integration, substantive security/architecture review. |
| `xhigh` | Named unresolved complexity where high is insufficient. |
| `max`, `ultra` | Only when exposed and a user request or recorded risk/quality gap justifies the extra budget. |

On the reviewed subagent surface, all five current Codex models support
low/medium/high/xhigh; Luna also supports max; Astra/Sol/Terra also support
max/ultra. GPT-5.5 has no max/ultra there. Do not infer support from a different
API or app tool's broader argument enum. Codex CLI uses `model_reasoning_effort`;
the Responses API uses `reasoning.effort`. See the
[CLI configuration reference](https://learn.chatgpt.com/docs/config-file/config-reference).

## Claude Models And Effort

Prefer `claude-opus-4-6` for Opus work. Resolve this explicit ID instead of an
`opus` alias that may upgrade it. Newer Opus/Fable models remain available as
justified escalations, not automatic replacements. Compare tokenizer-adjusted
cost using the [pricing method](model-pricing.md#tokenizer-adjusted-comparison).

Use native Claude delegation from Claude Code, or resolve the exact model in
an explicit bridge. These are Claude API IDs, not guarantees about a
subscription's default or a bridge's available models.

| Model / API ID | Starting route | Effort |
|---|---|---|
| Haiku 4.5 / `claude-haiku-4-5-20251001` | Small summaries, straightforward docs, boilerplate. | No `output_config.effort` support; record not supported rather than inventing low. |
| Sonnet 5 / `claude-sonnet-5` | Cost-conscious coding and routine agent work. | High is vendor default; medium is a cost-saving candidate after evaluation. |
| Opus 4.6 / `claude-opus-4-6` | Preferred Opus route for complex coding, ambiguous specs, architecture, hard review. | High for demanding work; low/medium when sufficient. Supports max, not xhigh. |
| Opus 5 / `claude-opus-5` | Escalation when measured benefits justify the newer tokenizer and total task cost. | High initially for demanding work; do not transfer its effort settings to Opus 4.6. |
| Fable 5.1 / `claude-fable-5-1` | Hard reasoning and long agent runs when Opus is insufficient. | High initially for demanding work; evaluate low/medium for simpler workloads. |
| Fable 5, Opus 4.8/4.7, Sonnet 4.6 | Explicit pins, compatibility, or measured workload advantage. | Consult the exact version; effort recommendations do not transfer automatically. |

Fable 5.1 is the current Fable revision; Mythos 5.1 is an invitation-only
counterpart, not a default dispatch target. Its lower cache-read price can help
some repeated-context workloads, but output and cache-write costs still matter.
See [Fable 5.1](https://platform.claude.com/docs/en/models/fable-5-1/overview).

Claude's [effort guidance](https://platform.claude.com/docs/en/build-with-claude/effort)
is version-specific: Opus 4.6 supports low/medium/high/max, not xhigh.
Opus 4.7/4.8 coding guidance starts at xhigh, whereas
Opus 5, Sonnet 5, and Fable 5.1 default to high. Low/medium routes are cost
optimizations to validate, not claims of equal quality. Haiku 4.5 does not
support that effort parameter. Keep objective, authority, and verification
explicit at every effort level.

## Local Qwen / Ollama / LM Studio

Consider [Qwen3-Coder-Next](https://huggingface.co/Qwen/Qwen3-Coder-Next) alongside
already installed Qwen3-Coder variants. Verify the exact runtime tag,
quantization, tool support, memory fit, and time to an accepted result. Next has
80B total parameters and 3B active; active parameters alone do not determine RAM.
Do not download a large model merely to avoid a small API charge.

Use a tested local model for bounded patches, tests, summaries, and docs; keep
final high-risk authority with an appropriately capable independent reviewer.
Local inference has hardware, energy, queueing, and review costs; do not call it
free or automatically cheapest. Return a unified diff for patch handoff, with
owned files, verification, and blockers. Never apply without diff review.

## Routing Evidence

Record requested/actual model and effort, inheritance, availability source,
billing surface, service tier, price source/date or `unknown`, quality rationale,
fallback, and the escalation trigger. Do not invent dollar savings or success
rates. If a route fails, preserve its evidence and pass a compact failure summary
to the next worker; do not repeat the same ineffective prompt indefinitely.

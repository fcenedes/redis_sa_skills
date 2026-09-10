# Model Pricing And Efficiency

Verified **2026-09-10**. Prices below are **USD per 1M tokens**, direct-provider
standard API rates, excluding tools, taxes, regional premiums, and long-context
surcharges. They are not Codex/Claude subscription or usage-credit prices.
Check the actual billing surface and live rate before a material dispatch.

## OpenAI Snapshot

| Model | Uncached input | Cached input | Cache write | Output |
|---|---:|---:|---:|---:|
| GPT-5.6 Luna | $0.20 | $0.02 | $0.25 | $1.20 |
| GPT-5.6 Terra | $2.00 | $0.20 | $2.50 | $12.00 |
| GPT-5.6 Sol | $4.00 | $0.40 | $5.00 | $20.00 |
| GPT-6 Astra | $10.00 | $1.00 | $12.50 | $50.00 |

Source: [OpenAI pricing](https://developers.openai.com/api/docs/pricing),
Standard / Short context. Sol's promotional rate is stated to last at least
through **2026-11-21**; re-check before relying on it beyond that date. The same
page lists separate Batch, Flex, Fast, and long-context rates. Do not apply
Batch/Flex discounts to interactive workers or assume Standard when the runtime
uses Priority/Fast. API rate differences do not establish subscription usage.

| Compatibility model | Uncached input | Cached input | Output | Source |
|---|---:|---:|---:|---|
| GPT-5.4 | $2.50 | $0.25 | $15.00 | [GPT-5.4](https://developers.openai.com/api/docs/models/gpt-5.4) |
| GPT-5.5 | $5.00 | $0.50 | $30.00 | [GPT-5.5](https://developers.openai.com/api/docs/models/gpt-5.5) |

At these rates, Luna/Terra undercut GPT-5.4 and Sol undercuts GPT-5.5 for equal
uncached input/output counts. Model age is not a price ladder. GPT-5.4 remains
API-documented but is absent from the reviewed host's subagent options.

## Anthropic Snapshot

| Model | Uncached input | Cache hit | 5m write | 1h write | Output |
|---|---:|---:|---:|---:|---:|
| Haiku 4.5 | $1 | $0.10 | $1.25 | $2 | $5 |
| Sonnet 5 | $2 | $0.20 | $2.50 | $4 | $10 |
| Opus 5 | $5 | $0.50 | $6.25 | $10 | $25 |
| Fable 5.1 | $10 | $0.25 | $12.50 | $20 | $50 |
| Fable 5 | $10 | $1 | $12.50 | $20 | $50 |
| Opus 4.6 (preferred Opus route) | $5 | $0.50 | $6.25 | $10 | $25 |
| Opus 4.8 / 4.7 | $5 | $0.50 | $6.25 | $10 | $25 |
| Sonnet 4.6 | $3 | $0.30 | $3.75 | $6 | $15 |

Source: [Claude pricing](https://platform.claude.com/docs/en/about-claude/pricing).
Sonnet 5's $2/$10 price is now standard; the previously scheduled September 1
increase did not happen. Fable 5.1's cache-hit rate is 2.5% of base input;
the other listed models use 10%.

Use [Claude fast mode](https://code.claude.com/docs/en/fast-mode) for justified
latency needs: Opus 5/4.8 fast rates are $10/$50, versus $5/$25 standard.
`/fast` is not a cheaper-model selector and may switch the selected model.

For [Claude caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching),
put stable content before changing content. A cache hit refreshes its existing
TTL; it does not select the 1-hour tier. Select `ttl: "1h"` explicitly where
supported and worthwhile. Do not send keepalive requests solely to manufacture
cache savings. Include cache creation and invalidation in comparisons.

## Tokenizer-Adjusted Comparison

Anthropic documents roughly **30% more tokens for the same text** with Claude
4.7 and later models and Mythos Preview; the increase varies by workload.
Opus 4.6 uses the earlier tokenizer. See the
[provider tokenizer note](https://platform.claude.com/docs/en/about-claude/pricing).

Prefer explicit `claude-opus-4-6` for Opus work. At the same $5/$25 input/output
rates, 30% more tokens means roughly 30% more token cost for equivalent text,
assuming the same cache mix and generated content. Require measured quality,
fewer retries, or latency benefits before selecting a newer Opus/Fable route.
Keep these models documented as alternatives; do not silently upgrade the pin.

Use a **1.30 token-count estimate** only when comparing equivalent text from the
older tokenizer to the newer one and measured counts are unavailable. Do not
multiply actual billed counts again. Different output lengths, thinking,
cache behavior, and per-token prices change the final bill.

For example, Sonnet 5's $2/$10 rates become approximately $2.60/$13 per quantity
of text that used 1M old-tokenizer tokens under that estimate, still below
Sonnet 4.6's $3/$15. This arithmetic is why the tokenizer change alone does not
make every newer Claude model more expensive. Verify actual accepted-task cost.

## Optimize Cost Per Accepted Task

Treat these recommendations as an initial policy, then calibrate against the
same acceptance gates and representative tasks. A price sheet cannot prove
reliability, retry frequency, or end-to-end speed.

For API billing, estimate each attempt using disjoint provider usage buckets:

```text
attempt_cost = (uncached_input * input_rate
              + cache_read * cache_read_rate
              + cache_write * cache_write_rate
              + billed_output * output_rate) / 1_000_000
              + tool_and_runtime_cost
```

Split writes by TTL/rate when needed. Include billable reasoning in output
according to the provider's usage fields; do not count it twice. Across attempts,
include failed runs, escalation, coordinator context, and verifier usage.
Record elapsed time separately and compare total spend / accepted tasks only
when acceptance count is nonzero. Keep failed-task counts visible.

Example, **equal synthetic usage**, 100k uncached input + 10k output, no cache
or tools: Luna $0.032, Terra $0.32, GPT-5.4 $0.40, Sol $0.60, GPT-5.5 $0.80,
Astra $1.50. These are arithmetic comparisons, not task benchmarks. Two failed
Terra attempts followed by one Sol attempt cost $1.24; a successful first Sol
attempt costs $0.60. Start stronger when evidence predicts that escalation.

For recurring work, record model/version, effort, service tier, context size,
cache usage, total billable tokens, attempts, accepted/rejected results, spend,
and elapsed time. Promote a route only when it meets quality and deadline
constraints with better total cost. Keep unknown prices or usage marked unknown.

## Refresh Checklist

- [ ] Re-check callable IDs and effort support on the destination runtime.
- [ ] Re-open provider model/pricing pages; record date, billing mode, and tier.
- [ ] Check promotions, tokenizer changes, context thresholds, cache policy, and tools.
- [ ] Re-evaluate representative tasks before claiming improved efficiency.
- [ ] Update routing defaults, examples, role guidance, and evaluation scenarios together.

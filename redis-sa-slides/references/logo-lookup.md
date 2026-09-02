# Logo lookup

Use this workflow to find a customer logo for a Redis SA Slides deck. Never embed a logo until the user confirms the candidate.

## Required inputs

- Customer name.
- Customer domain, for example `example.com`.
- logo.dev API token, supplied at runtime only.

Do not store tokens, downloaded logos, customer assets, or search results in this repository.

## Primary lookup

Use the logo.dev image endpoint with the configured runtime token parameter and
PNG format:

```text
https://img.logo.dev/{domain}
```

Replace `{domain}` with the confirmed customer domain and pass the runtime token
through the request mechanism provided by the environment. Keep the token out of
logs and generated files.

## Response handling

1. Request a PNG candidate from logo.dev.
2. Treat HTTP 200 with image content as a candidate logo, not as approval.
3. Reject non-image responses, redirects to unrelated domains, placeholder images, broken images, and marks that do not match the customer.
4. Show the candidate to the user with the company name and domain used.
5. Wait for explicit user confirmation before embedding the logo in any slide.

If the user rejects the candidate, continue to fallback or leave a customer-logo gap.

## Web search fallback

Use web search only after logo.dev fails or the user rejects the logo.dev candidate. Search for a transparent SVG or PNG candidate using a query like:

```text
{company} logo transparent svg png
```

Prefer official brand, press, media kit, or company website sources. Avoid stale marks, low-resolution images, screenshots, social avatars, and unofficial recreations.

## Confirmation gate

Before embedding any fallback logo:

1. Show the candidate image and source URL to the user.
2. Ask the user to confirm that it is the correct logo for this deck.
3. Embed only the confirmed logo.

If no confirmed logo is available, leave `[TODO: customer logo]` in the deck and report the gap in the delivery summary.

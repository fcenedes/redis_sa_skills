# Output Rubric — redis-insight-plugin

Grade each transcript against every row. Score 0 (fail), 1 (partial), 2 (pass) unless noted.

## Trigger correctness
Did the skill activate for RedisInsight Workbench plugin creation/debugging/deployment/testing (manifest, activationMethod, iframe, Parcel/Vite build, `/api/plugins`), and stay inactive for generic Redis or generic UI work?

## False-positive avoidance
Did it avoid triggering for a standalone Next.js/generic dashboard (redis-product-ui), a pure Redis Query Engine/vector-search question, or a Redis server security/deployment task with no plugin involved?

## False-negative avoidance
Did it trigger on symptom-only descriptions (e.g. "activationMethod doesn't match the exported function", "plugin doesn't show up in the picker") that don't name "RedisInsight plugin" explicitly?

## Task fit
Did it pick the correct plugin type — external/Parcel by default, internal/Vite only when the work is inside the RedisInsight monorepo — per the First Decision step?

## Output usefulness
Does the manifest declare `main`, `styles`, and `visualizations` with all required per-visualization fields, and does every `activationMethod` match a default-exported function name?

## Safety compliance
Read-only Redis commands by default; no destructive commands without explicit confirmation; no secrets/tokens in the bundle; no hidden network calls (per Security Rules).

## Token discipline
Loaded only the relevant reference files from the Reference Index (e.g. redis-command-parsing.md for GEOSEARCH/XRANGE, third-party-libraries.md for Leaflet) rather than all 12 references at once.

## Evidence requirements
Are Redis command response shapes handled correctly and distinctly (XRANGE vs GEOSEARCH WITH... vs GEORADIUS), with real parsed output shown, not assumed to share one generic shape?

## Verification requirements
Was the phased workflow actually followed (Phase 1 vanilla DOM, Phase 2 React, Phase 3 real viz library) and was `/api/plugins` actually curled to confirm registration before declaring the plugin done?

## Anti-overreach
Did it stay within plugin scope and defer generic dashboard/admin-UI requests to redis-product-ui instead of building a plugin nobody asked for?

## Final-answer quality
Is the closing message concise, confirms bundle checks (`dist/index.js`, `dist/styles.css`, zero `process.env`) and `/api/plugins` output, rather than just asserting the plugin "should work"?

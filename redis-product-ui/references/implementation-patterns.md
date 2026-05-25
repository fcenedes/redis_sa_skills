# Implementation Patterns

Use the strongest local implementation source available without creating a private source dependency.

## Source Order

1. Existing repo components, tokens, theme provider, and package dependencies.
2. Public Redis UI Storybook behavior and rendered examples.
3. Local CSS fallback that mirrors Storybook patterns for demos and prototypes.

Do not reference private source repositories in generated code, docs, or comments. Do not vendor Storybook bundles or copied package source.

## When Redis UI Components Exist

- Import and use repo-installed Redis UI components instead of recreating them.
- Use the repo's existing theme provider and theme mode switching setup.
- Use composition APIs when a default component shell is too rigid.
- Prefer exported typography, layout, icon, table, and form components over raw HTML wrappers.
- Keep controlled and uncontrolled state consistent with the surrounding codebase.
- Import types from the same UI/table package that provides the component when available.

## When Building Standalone HTML/CSS Demos

- Implement a faithful static approximation using CSS variables from [tokens](tokens.md).
- Use `light2`/`dark2` for new Redis product demos unless the request targets RedisInsight.
- Build real product surfaces: app bar, sidebar, mid bar, search/filter table, inspector drawer, banners/toasts, and states.
- Include interactive enough behavior to validate theme switching, drawer/modal open state, row selection, search/filter affordances, and state changes.
- Avoid claiming package-level fidelity when the real component library is not installed.

## Theming

- Keep one coherent theme pair per surface: `light`/`dark` or `light2`/`dark2`.
- Put all theme colors behind CSS variables or repo theme tokens.
- Include focus variables, semantic state variables, table variables, input variables, and overlay variables.
- Verify text, icon, border, focus, and badge contrast in both modes.
- Respect reduced motion for drawers, toasts, skeletons, loaders, and animated row expansion.

## Composition

Use composition for advanced product surfaces:

- table top/bottom bars with custom filters/actions
- modal/drawer header/body/footer layouts
- section summary bars
- select/multiselect custom option rendering
- menu items with subheads and selected state
- slider marks and labels
- chip overflow and custom tooltips

Do not over-compose simple forms or buttons. Use the default component shape when it already matches the workflow.

## Icons

Use repo-provided Redis UI icons when available. Monochrome icons should inherit current color or use semantic icon tokens. Multicolor icons are for product/brand identity moments, not generic status.

## Verification

For real frontend changes, run the repo's tests/build and Playwright or browser verification. For static demos, open the file in a browser and verify light/dark, responsive layout, keyboard focus, table overflow, and console errors.

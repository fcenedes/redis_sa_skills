# Internal Vite Plugin

Build a Redis Insight plugin **inside** the RedisInsight monorepo.

## Path

```
RedisInsight/
  redisinsight/
    ui/
      src/
        packages/
          <plugin-name>/
            package.json
            index.html
            src/
              main.tsx
              components/
            vite.config.ts
```

If you are not working inside the RedisInsight repo, you do not want this — use [external-parcel-plugin.md](external-parcel-plugin.md) instead.

## Build Tool: Vite

Internal plugins integrate with the RedisInsight build, which already standardizes on Vite. Use the project's existing Vite config conventions and follow the surrounding plugin packages as templates.

## Vite Config Sketch

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/main.tsx',
      formats: ['es'],
      fileName: () => 'index.js',
    },
    cssCodeSplit: false,
    rollupOptions: {
      output: { assetFileNames: 'styles.css' },
    },
  },
});
```

Adjust to match the conventions of the existing internal packages — copy from a sibling rather than diverging.

## index.html

```html
<!doctype html>
<html>
  <head><meta charset="utf-8" /></head>
  <body class="theme_LIGHT">
    <div id="app"></div>
    <script type="module" src="./src/main.tsx"></script>
  </body>
</html>
```

The internal build produces a single `index.js` and `styles.css` consumed via the manifest.

## Theme and Shared UI Caveats

- Internal plugins **may** use the shared theme tokens and shared UI primitives — but only those with a stable contract.
- Avoid relying on `ThemeProvider` features that are not exposed via a documented props surface.
- Do not import from deep relative paths (`../../../../../`); use the monorepo's package alias if available.

## Internal Plugin DO NOT

- DO NOT bundle React or other shared runtime deps already provided by the host build.
- DO NOT introduce a Parcel build inside the monorepo. Match the existing tooling.
- DO NOT import from a sibling internal plugin — use shared utilities only.
- DO NOT mutate global window state outside of the documented `window.state` surface.

## When to Convert Internal → External

If the plugin is meant to ship outside RedisInsight (customer demo, field use, GitHub release), port it to an external Parcel layout. Keep the React component code; replace the build tool, bundle every dependency, and follow [external-parcel-plugin.md](external-parcel-plugin.md).

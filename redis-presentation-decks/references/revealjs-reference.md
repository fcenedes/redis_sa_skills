# Reveal.js Reference For Redis Decks

Use these Reveal.js features when they strengthen presenter control or technical explanation. Keep the default deck simple unless the user asks for interaction or the story benefits from it.

## Speaker Notes

Add private presenter notes with `<aside class="notes">`. Use notes for talk track, assumptions, demo commands, discovery questions, and objection handling.

```html
<section id="cache-aside-path">
  <h2>Cache-aside reduces repeated read pressure</h2>
  <div class="content">
    <p>Application reads Redis first, falls back to the database on miss, then writes the result with an explicit TTL.</p>
  </div>
  <aside class="notes">
    Ask whether stale reads are acceptable. If not, discuss invalidation, shorter TTLs, or write-through patterns.
  </aside>
</section>
```

Press `S` while presenting to open speaker view.

## Fragments

Use fragments to pace build-ups. Do not hide content that the audience needs for note-taking.

```html
<ul>
  <li class="fragment">Check Redis for the key.</li>
  <li class="fragment">Read the source of truth on miss.</li>
  <li class="fragment">Set the key with a TTL and return the response.</li>
</ul>
```

Useful classes include `fragment`, `fade-in`, `fade-up`, `fade-left`, `fade-right`, `highlight-red`, `highlight-green`, and `strike`.

## Backgrounds

Use solid backgrounds for section breaks and restrained image backgrounds only when the image directly supports the deck.

```html
<section data-background-color="#091A23" class="section-divider">
  <h1>Operating model</h1>
  <p>How the team runs Redis safely in production</p>
</section>
```

## Code And Commands

Use Space Mono code blocks for Redis commands, Query Engine syntax, JSON, YAML, and metrics. Keep examples short enough to read from the back of a room.

```html
<pre><code class="language-bash">redis-cli FT.SEARCH idx:products "*=>[KNN 5 @embedding $vec]" PARAMS 2 vec "$BLOB"</code></pre>
```

For line highlighting, include Reveal.js highlight markup:

```html
<pre><code class="language-bash" data-line-numbers="1|2-3">redis-cli XGROUP CREATE orders order-processors $ MKSTREAM
redis-cli XREADGROUP GROUP order-processors worker-1 COUNT 10 STREAMS orders &gt;</code></pre>
```

## Auto-Animate

Use `data-auto-animate` to evolve an architecture in place across two or three slides. Give matching elements stable `data-id` values.

```html
<section data-auto-animate>
  <h2>Current path</h2>
  <div data-id="api" class="flow-node">API</div>
</section>
<section data-auto-animate>
  <h2>Redis-enabled path</h2>
  <div data-id="api" class="flow-node">API</div>
  <div data-id="redis" class="flow-node redis">Redis cache</div>
</section>
```

## Export And Screenshot Review

Use `?export` to disable chart animations in the generated scaffold.

```bash
npx decktape reveal "presentation.html?export" presentation.pdf --screenshots --screenshots-directory screenshots
```

Inspect every screenshot. Check text fit, contrast, charts, icons, background state, code readability, speaker-note-free visible slides, and whether the slide message is obvious in five seconds.

## Reveal.js Configuration

The scaffold initializes Reveal.js with these defaults:

```javascript
Reveal.initialize({
  width: 1280,
  height: 720,
  margin: 0,
  controls: true,
  progress: true,
  hash: true,
  center: false,
  transition: "slide"
});
```

Set `center: true` only for minimal title or keynote-style slides. Keep `center: false` for technical decks with evidence blocks, charts, or architecture layouts.

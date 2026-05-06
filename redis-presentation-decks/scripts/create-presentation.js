#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const REVEAL_VERSION = '6.0.1';
const CHARTJS_VERSION = '4.5.1';
const REVEAL_PLUGINS_VERSION = '4.6.0';
const FONTAWESOME_VERSION = '7.2.0';
const BASE_STYLES_PATH = path.join(__dirname, '..', 'references', 'base-styles.css');

function printHelp() {
  console.log(`
create-presentation.js - Generate a Redis-branded Reveal.js presentation scaffold

Usage:
  node create-presentation.js [options]

Options:
  --slides, -s <num>    Number of horizontal slides
  --structure <list>    Mixed layout, for example "1,1,d,3,1,d,1"
                        1 = one horizontal slide
                        N = vertical stack with N slides
                        d = section divider
  --output, -o <file>   Output HTML file (default: presentation.html)
  --title <text>        HTML document title and title slide text
  --styles <file>       CSS filename copied next to the deck (default: styles.css)
  --help, -h            Show this help message

Examples:
  node create-presentation.js --slides 8 --title "Redis Caching Brief" -o deck/presentation.html
  node create-presentation.js --structure 1,1,d,3,1,d,1 --title "Redis Solution Architecture"
`);
}

function parseArgs(args) {
  const options = {
    slides: null,
    structure: null,
    output: 'presentation.html',
    title: 'Redis Presentation',
    stylesFile: 'styles.css',
  };

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === '--help' || arg === '-h') {
      printHelp();
      process.exit(0);
    }
    if (arg === '--slides' || arg === '-s') {
      options.slides = Number.parseInt(args[++i], 10);
    } else if (arg === '--structure') {
      options.structure = parseStructure(args[++i]);
    } else if (arg === '--output' || arg === '-o') {
      options.output = args[++i];
    } else if (arg === '--title') {
      options.title = args[++i];
    } else if (arg === '--styles') {
      options.stylesFile = args[++i];
    } else {
      console.error(`Unknown option: ${arg}`);
      process.exit(1);
    }
  }

  return options;
}

function parseStructure(value) {
  if (!value || typeof value !== 'string') {
    console.error('Error: --structure requires a comma-separated value.');
    process.exit(1);
  }

  return value.split(',').map((item) => {
    const trimmed = item.trim().toLowerCase();
    if (trimmed === 'd') return 'd';
    const count = Number.parseInt(trimmed, 10);
    if (!Number.isInteger(count) || count < 1) {
      console.error(`Error: Invalid structure item "${item}". Use positive integers or "d".`);
      process.exit(1);
    }
    return count;
  });
}

function validateOptions(options) {
  if (options.slides !== null && options.structure !== null) {
    console.error('Error: Use either --slides or --structure, not both.');
    process.exit(1);
  }

  if (options.slides !== null) {
    if (!Number.isInteger(options.slides) || options.slides < 1) {
      console.error('Error: --slides must be a positive integer.');
      process.exit(1);
    }
    options.structure = Array(options.slides).fill(1);
  }

  if (options.structure === null) {
    options.structure = [1, 1, 1, 1, 1];
  }

  if (!options.output || options.output.endsWith(path.sep)) {
    console.error('Error: --output must be a file path.');
    process.exit(1);
  }

  return options;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function slideWithContent(id, title, note) {
  return `        <section id="${id}">
          <p class="eyebrow">Redis architecture</p>
          <h2>${escapeHtml(title)}</h2>
          <div class="content">
            <p>Replace this with one clear slide message, supported by Redis evidence.</p>
          </div>
          <aside class="notes">${escapeHtml(note)}</aside>
        </section>
`;
}

function generateSlides(structure, title) {
  let slides = '';
  let hIndex = 1;
  let dividerCount = 1;
  let contentSlideCount = 1;

  for (const item of structure) {
    if (item === 'd') {
      slides += `        <section id="section-${dividerCount}" class="section-divider" data-state="is-section-divider">
          <h1>Section ${dividerCount}</h1>
          <p>Replace with the next audience question or Redis decision point.</p>
          <aside class="notes">Set up the next section and explain why it matters now.</aside>
        </section>
`;
      dividerCount += 1;
      hIndex += 1;
      continue;
    }

    if (item === 1) {
      if (hIndex === 1) {
        slides += `        <section id="title" class="section-divider" data-state="is-section-divider">
          <h1>${escapeHtml(title)}</h1>
          <p>Redis solution architecture deck</p>
          <aside class="notes">Open with the audience, the business pressure, and the specific Redis outcome this deck supports.</aside>
        </section>
`;
      } else {
        slides += slideWithContent(
          `slide-${contentSlideCount}`,
          `Slide ${contentSlideCount} title`,
          'State the presenter talk track, evidence source, and transition.'
        );
        contentSlideCount += 1;
      }
      hIndex += 1;
      continue;
    }

    slides += `        <section>
`;
    for (let vIndex = 1; vIndex <= item; vIndex += 1) {
      slides += slideWithContent(
        `slide-${contentSlideCount}-${vIndex}`,
        `Slide ${contentSlideCount}.${vIndex} title`,
        'Use vertical stacks for drill-down details, appendix depth, or optional implementation paths.'
      );
    }
    slides += `        </section>
`;
    contentSlideCount += 1;
    hIndex += 1;
  }

  return slides;
}

function generateHtml(options) {
  const safeTitle = escapeHtml(options.title);
  const safeStyles = escapeHtml(options.stylesFile);
  const slides = generateSlides(options.structure, options.title);

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeTitle}</title>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@${REVEAL_VERSION}/dist/reset.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@${REVEAL_VERSION}/dist/reveal.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@${REVEAL_VERSION}/dist/plugin/highlight/monokai.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@${FONTAWESOME_VERSION}/css/all.min.css">
  <link rel="stylesheet" href="${safeStyles}">

  <script src="https://cdn.jsdelivr.net/npm/chart.js@${CHARTJS_VERSION}/dist/chart.umd.js"></script>
</head>
<body>
  <div class="reveal">
    <div class="slides">
${slides}    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/reveal.js@${REVEAL_VERSION}/dist/reveal.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/reveal.js@${REVEAL_VERSION}/dist/plugin/notes.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/reveal.js@${REVEAL_VERSION}/dist/plugin/highlight.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/reveal.js-plugins@${REVEAL_PLUGINS_VERSION}/chart/plugin.js"></script>
  <script>
    const exportMode = window.location.search.includes('export');
    Reveal.initialize({
      width: 1280,
      height: 720,
      margin: 0,
      controls: true,
      progress: true,
      slideNumber: false,
      hash: true,
      center: false,
      transition: 'slide',
      plugins: [window.RevealNotes, window.RevealHighlight, window.RevealChart].filter(Boolean),
      chart: {
        defaults: Object.assign({
          color: '#091A23',
          borderColor: '#B9C2C6',
          responsive: true,
          font: { family: 'Space Grotesk' }
        }, exportMode ? { animation: false, animations: false } : {})
      }
    });
  </script>
</body>
</html>
`;
}

function copyStyles(outputDir, stylesFile) {
  const stylesOutputPath = outputDir && outputDir !== '.'
    ? path.join(outputDir, stylesFile)
    : stylesFile;
  const stylesDir = path.dirname(stylesOutputPath);

  if (stylesDir && stylesDir !== '.') {
    fs.mkdirSync(stylesDir, { recursive: true });
  }

  if (fs.existsSync(stylesOutputPath)) {
    console.log(`${stylesOutputPath} already exists, skipping style copy.`);
    return stylesOutputPath;
  }

  if (!fs.existsSync(BASE_STYLES_PATH)) {
    console.warn(`Warning: Could not find ${BASE_STYLES_PATH}.`);
    console.warn(`Copy redis-presentation-decks/references/base-styles.css to ${stylesOutputPath}.`);
    return stylesOutputPath;
  }

  fs.copyFileSync(BASE_STYLES_PATH, stylesOutputPath);
  console.log(`Copied Redis base styles to ${stylesOutputPath}`);
  return stylesOutputPath;
}

function main() {
  const options = validateOptions(parseArgs(process.argv.slice(2)));
  const outputDir = path.dirname(options.output);

  if (outputDir && outputDir !== '.') {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(options.output, generateHtml(options), 'utf8');
  console.log(`Created ${options.output}`);

  const stylesPath = copyStyles(outputDir, options.stylesFile);
  const totalSlides = options.structure.reduce((sum, item) => sum + (item === 'd' ? 1 : item), 0);

  console.log(`Presentation created with ${totalSlides} slides.`);
  console.log(`Edit ${options.output} and customize ${stylesPath}.`);
  console.log('Run check-charts, check-overflow, and screenshot review before delivery.');
}

main();

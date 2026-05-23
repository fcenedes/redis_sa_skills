#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

function printHelp() {
  console.log(`
check-overflow.js - Check Reveal.js slides for visible overflow

Usage:
  node check-overflow.js <path-to-presentation.html> [--width 1280] [--height 720] [--timeout 30000]

Requires:
  cd <skill-dir>
  npm install
  npx playwright install chromium
`);
}

function parseArgs(args) {
  const options = {
    htmlPath: null,
    width: 1280,
    height: 720,
    timeout: 30000,
  };

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === '--help' || arg === '-h') {
      printHelp();
      process.exit(0);
    }
    if (arg === '--width') {
      options.width = Number.parseInt(args[++i], 10);
    } else if (arg === '--height') {
      options.height = Number.parseInt(args[++i], 10);
    } else if (arg === '--timeout') {
      options.timeout = Number.parseInt(args[++i], 10);
    } else if (!options.htmlPath) {
      options.htmlPath = arg;
    } else {
      console.error(`Unknown option: ${arg}`);
      process.exit(1);
    }
  }

  if (!options.htmlPath) {
    printHelp();
    process.exit(1);
  }

  if (!Number.isInteger(options.width) || !Number.isInteger(options.height) || options.width < 1 || options.height < 1) {
    console.error('Error: --width and --height must be positive integers.');
    process.exit(1);
  }

  if (!Number.isInteger(options.timeout) || options.timeout < 1000) {
    console.error('Error: --timeout must be at least 1000 milliseconds.');
    process.exit(1);
  }

  return options;
}

async function loadPlaywright() {
  try {
    return require('playwright');
  } catch (error) {
    console.error('Error: Playwright is not installed for this skill.');
    console.error('Run: cd <skill-dir> && npm install && npx playwright install chromium');
    process.exit(1);
  }
}

async function waitForReveal(page, timeout) {
  await page.waitForFunction(
    () => window.Reveal && typeof window.Reveal.getSlides === 'function',
    null,
    { timeout }
  );
  await page.waitForFunction(
    () => !window.Reveal.isReady || window.Reveal.isReady(),
    null,
    { timeout }
  );
}

async function inspectSlide(page, index) {
  return page.evaluate(async (slideIndex) => {
    const slides = window.Reveal.getSlides();
    const slide = slides[slideIndex];
    const indices = window.Reveal.getIndices(slide);
    window.Reveal.slide(indices.h, indices.v || 0, indices.f || 0);
    await new Promise((resolve) => setTimeout(resolve, 80));

    const current = window.Reveal.getCurrentSlide();
    const rect = current.getBoundingClientRect();
    const verticalOverflow = current.scrollHeight - current.clientHeight;
    const horizontalOverflow = current.scrollWidth - current.clientWidth;
    const selector = [
      'h1',
      'h2',
      'h3',
      'p',
      'li',
      'pre',
      'code',
      'canvas',
      'img',
      'svg',
      'table',
      '.callout',
      '.evidence-block',
      '.metric-card',
      '.flow-node',
    ].join(',');

    const offenders = Array.from(current.querySelectorAll(selector))
      .map((element) => {
        const box = element.getBoundingClientRect();
        const overflows =
          box.left < rect.left - 1 ||
          box.top < rect.top - 1 ||
          box.right > rect.right + 1 ||
          box.bottom > rect.bottom + 1;
        return {
          tag: element.tagName.toLowerCase(),
          id: element.id || '',
          className: typeof element.className === 'string' ? element.className : '',
          text: (element.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 80),
          overflows,
        };
      })
      .filter((item) => item.overflows)
      .slice(0, 5);

    return {
      index: slideIndex + 1,
      id: current.id || `slide-${slideIndex + 1}`,
      h: indices.h,
      v: indices.v || 0,
      hasOverflow: verticalOverflow > 1 || horizontalOverflow > 1 || offenders.length > 0,
      verticalOverflow,
      horizontalOverflow,
      offenders,
    };
  }, index);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const htmlPath = path.resolve(options.htmlPath);

  if (!fs.existsSync(htmlPath)) {
    console.error(`Error: File not found: ${htmlPath}`);
    process.exit(1);
  }

  const { chromium } = await loadPlaywright();
  const browser = await chromium.launch({ headless: true });

  try {
    const page = await browser.newPage({ viewport: { width: options.width, height: options.height } });
    await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'networkidle', timeout: options.timeout });
    await waitForReveal(page, options.timeout);

    const slideCount = await page.evaluate(() => window.Reveal.getSlides().length);
    const results = [];
    for (let i = 0; i < slideCount; i += 1) {
      results.push(await inspectSlide(page, i));
    }

    let overflowCount = 0;
    console.log(`Checked ${slideCount} slide(s) in ${htmlPath}`);
    results.forEach((result) => {
      if (!result.hasOverflow) return;
      overflowCount += 1;
      console.log(`OVERFLOW: slide ${result.index} (${result.id}) at h=${result.h}, v=${result.v}`);
      if (result.verticalOverflow > 1) {
        console.log(`  vertical: ${result.verticalOverflow}px`);
      }
      if (result.horizontalOverflow > 1) {
        console.log(`  horizontal: ${result.horizontalOverflow}px`);
      }
      result.offenders.forEach((offender) => {
        console.log(`  offender: <${offender.tag}> ${offender.text}`);
      });
    });

    if (overflowCount === 0) {
      console.log('No overflow detected.');
    }

    if (overflowCount > 0) {
      process.exit(1);
    }
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error('Error:', error.message);
  process.exit(1);
});

#!/usr/bin/env node

const fs = require('fs');

const VALID_CHART_TYPES = new Set([
  'line',
  'bar',
  'pie',
  'doughnut',
  'radar',
  'polarArea',
  'bubble',
  'scatter',
]);

function printHelp() {
  console.log(`
check-charts.js - Validate Chart.js blocks in a Reveal.js deck

Usage:
  node check-charts.js <path-to-presentation.html>

Checks:
  - supported canvas[data-chart] type
  - JSON or CSV config is present
  - JSON parses successfully
  - data.datasets exists when JSON data is inline
  - options.maintainAspectRatio is false
`);
}

function getAttribute(attrs, name) {
  const regex = new RegExp(`${name}\\s*=\\s*(['"])(.*?)\\1`, 'i');
  const match = attrs.match(regex);
  return match ? match[2] : null;
}

function lineNumberAt(source, index) {
  return source.slice(0, index).split(/\r?\n/).length;
}

function extractCharts(html) {
  const charts = [];
  const regex = /<canvas\b([^>]*)>([\s\S]*?)<\/canvas>/gi;
  let match;

  while ((match = regex.exec(html)) !== null) {
    const attrs = match[1];
    const type = getAttribute(attrs, 'data-chart');
    if (!type) continue;

    const body = match[2] || '';
    const comment = body.match(/<!--([\s\S]*?)-->/);
    charts.push({
      type,
      configText: comment ? comment[1].trim() : null,
      externalSrc: getAttribute(attrs, 'data-chart-src'),
      lineNumber: lineNumberAt(html, match.index),
    });
  }

  return charts;
}

function validateCsv(chart, prefix) {
  const errors = [];
  const warnings = [];
  const lines = chart.configText.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);

  if (lines.length < 2) {
    errors.push(`${prefix}: CSV data needs a header row and at least one data row.`);
    return { errors, warnings };
  }

  const headerCount = lines[0].split(',').length;
  lines.slice(1).forEach((line, index) => {
    const count = line.split(',').length;
    if (count !== headerCount) {
      warnings.push(`${prefix}: CSV row ${index + 2} has ${count} columns, header has ${headerCount}.`);
    }
  });

  return { errors, warnings };
}

function validateJson(chart, prefix) {
  const errors = [];
  const warnings = [];
  let config;

  try {
    config = JSON.parse(chart.configText);
  } catch (error) {
    errors.push(`${prefix}: Invalid JSON - ${error.message}`);
    return { errors, warnings };
  }

  if (!config.data && !chart.externalSrc) {
    errors.push(`${prefix}: Missing required data property.`);
  }

  if (config.data) {
    if (!Array.isArray(config.data.datasets)) {
      errors.push(`${prefix}: data.datasets must be an array.`);
    } else if (config.data.datasets.length === 0) {
      errors.push(`${prefix}: data.datasets is empty.`);
    } else {
      config.data.datasets.forEach((dataset, index) => {
        if (!Object.prototype.hasOwnProperty.call(dataset, 'data')) {
          errors.push(`${prefix}: dataset ${index + 1} is missing data.`);
        }
      });
    }

    if (!config.data.labels && !['scatter', 'bubble'].includes(chart.type)) {
      warnings.push(`${prefix}: data.labels is missing; most non-scatter charts need labels.`);
    }
  }

  if (!config.options || config.options.maintainAspectRatio !== false) {
    warnings.push(`${prefix}: Set options.maintainAspectRatio to false to prevent overflow.`);
  }

  return { errors, warnings };
}

function validateChart(chart, index) {
  const prefix = `Chart ${index + 1} (line ${chart.lineNumber}, type ${chart.type})`;
  const errors = [];
  const warnings = [];

  if (!VALID_CHART_TYPES.has(chart.type)) {
    errors.push(`${prefix}: Unsupported chart type. Valid types: ${Array.from(VALID_CHART_TYPES).join(', ')}.`);
  }

  if (!chart.configText && !chart.externalSrc) {
    errors.push(`${prefix}: Missing config comment or data-chart-src.`);
    return { errors, warnings };
  }

  if (chart.externalSrc) {
    warnings.push(`${prefix}: Uses external source ${chart.externalSrc}; verify the file exists.`);
  }

  if (chart.configText) {
    const trimmed = chart.configText.trim();
    const result = trimmed.startsWith('{')
      ? validateJson(chart, prefix)
      : validateCsv(chart, prefix);
    errors.push(...result.errors);
    warnings.push(...result.warnings);
  }

  return { errors, warnings };
}

function main() {
  const htmlPath = process.argv[2];

  if (!htmlPath || htmlPath === '--help' || htmlPath === '-h') {
    printHelp();
    process.exit(htmlPath ? 0 : 1);
  }

  if (!fs.existsSync(htmlPath)) {
    console.error(`Error: File not found: ${htmlPath}`);
    process.exit(1);
  }

  const html = fs.readFileSync(htmlPath, 'utf8');
  const charts = extractCharts(html);
  console.log(`Checking charts in ${htmlPath}`);

  if (charts.length === 0) {
    console.log('No charts found.');
    return;
  }

  let errorCount = 0;
  let warningCount = 0;

  charts.forEach((chart, index) => {
    const { errors, warnings } = validateChart(chart, index);
    if (errors.length === 0 && warnings.length === 0) {
      console.log(`OK: Chart ${index + 1} (line ${chart.lineNumber}, type ${chart.type})`);
    }
    errors.forEach((error) => {
      errorCount += 1;
      console.log(`ERROR: ${error}`);
    });
    warnings.forEach((warning) => {
      warningCount += 1;
      console.log(`WARN: ${warning}`);
    });
  });

  console.log(`Total: ${charts.length} chart(s), ${errorCount} error(s), ${warningCount} warning(s).`);

  if (errorCount > 0) {
    process.exit(1);
  }
}

main();

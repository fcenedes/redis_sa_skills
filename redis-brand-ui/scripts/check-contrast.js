#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const registryPath = path.join(__dirname, "..", "references", "contrast-pairs.json");
const hexPattern = /^#[0-9A-Fa-f]{6}$/;

function readRegistry(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    throw new Error(`Unable to read contrast registry at ${filePath}: ${error.message}`);
  }
}

function validatePair(pair, index) {
  const prefix = `contrast pair ${index + 1}`;

  if (!pair || typeof pair !== "object" || Array.isArray(pair)) {
    throw new Error(`${prefix} must be an object`);
  }

  for (const field of ["label", "foreground", "background", "source"]) {
    if (typeof pair[field] !== "string" || pair[field].trim() === "") {
      throw new Error(`${prefix} must include a non-empty ${field} string`);
    }
  }

  for (const field of ["foreground", "background"]) {
    if (!hexPattern.test(pair[field])) {
      throw new Error(`${prefix} has invalid ${field} value ${pair[field]}; expected #RRGGBB`);
    }
  }

  if (typeof pair.minimum !== "number" || !Number.isFinite(pair.minimum)) {
    throw new Error(`${prefix} must include a finite minimum number`);
  }

  if (typeof pair.shouldPass !== "boolean") {
    throw new Error(`${prefix} must include a shouldPass boolean`);
  }
}

function luminance(hex) {
  const channels = hex
    .replace("#", "")
    .match(/.{2}/g)
    .map((value) => parseInt(value, 16) / 255)
    .map((value) => (value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4));

  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

function contrast(foreground, background) {
  const lighter = Math.max(luminance(foreground), luminance(background));
  const darker = Math.min(luminance(foreground), luminance(background));

  return (lighter + 0.05) / (darker + 0.05);
}

const pairs = readRegistry(registryPath);

if (!Array.isArray(pairs)) {
  throw new Error("Contrast registry must be a JSON array");
}

let failures = 0;

for (const [index, pair] of pairs.entries()) {
  validatePair(pair, index);

  const { foreground, background, minimum, shouldPass, label, source } = pair;
  const ratio = contrast(foreground, background);
  const pass = ratio >= minimum;
  const expected = shouldPass ? pass : !pass;
  const status = expected ? "PASS" : "FAIL";
  const expectation = shouldPass ? `>= ${minimum}:1` : `< ${minimum}:1`;
  console.log(`${status} ${label}: ${ratio.toFixed(2)}:1 expected ${expectation} [${source}]`);

  if (!expected) failures += 1;
}

process.exitCode = failures === 0 ? 0 : 1;

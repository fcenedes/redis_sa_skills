#!/usr/bin/env node

const pairs = [
  { foreground: "#091A23", background: "#FFFFFF", minimum: 4.5, shouldPass: true, label: "primary text on white" },
  { foreground: "#163341", background: "#FFFFFF", minimum: 4.5, shouldPass: true, label: "secondary text on white" },
  { foreground: "#FFFFFF", background: "#2D4754", minimum: 4.5, shouldPass: true, label: "white text on Dusk 90" },
  { foreground: "#091A23", background: "#FF4438", minimum: 4.5, shouldPass: true, label: "normal text on Hyper" },
  { foreground: "#FFFFFF", background: "#FF4438", minimum: 4.5, shouldPass: false, label: "white normal text on Hyper" },
  { foreground: "#FFFFFF", background: "#EB352A", minimum: 4.5, shouldPass: false, label: "white normal text on Deep Hyper" },
  { foreground: "#8A99A0", background: "#FFFFFF", minimum: 4.5, shouldPass: false, label: "muted text on white" },
  { foreground: "#F0F4F5", background: "#0A1A23", minimum: 4.5, shouldPass: true, label: "dark mode primary text on dark bg" },
  { foreground: "#C8D1D5", background: "#0A1A23", minimum: 4.5, shouldPass: true, label: "dark mode secondary text on dark bg" },
];

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

let failures = 0;

for (const { foreground, background, minimum, shouldPass, label } of pairs) {
  const ratio = contrast(foreground, background);
  const pass = ratio >= minimum;
  const expected = shouldPass ? pass : !pass;
  const status = expected ? "PASS" : "FAIL";
  const expectation = shouldPass ? `>= ${minimum}:1` : `< ${minimum}:1`;
  console.log(`${status} ${label}: ${ratio.toFixed(2)}:1 expected ${expectation}`);

  if (!expected) failures += 1;
}

process.exitCode = failures === 0 ? 0 : 1;

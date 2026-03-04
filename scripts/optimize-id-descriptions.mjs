#!/usr/bin/env node
/**
 * Optimizes Indonesian resume example meta descriptions for SEO:
 * 1. Shorten descriptions over 160 chars
 * 2. Ensure "curriculum vitae" appears in description (high-value Indonesian keyword)
 *
 * Usage: node scripts/optimize-id-descriptions.mjs [--dry-run]
 */
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const require2 = createRequire(path.join(rootDir, 'frontend', 'package.json'));
const matter = require2('gray-matter');

const DRY_RUN = process.argv.includes('--dry-run');
const MAX_DESC_LENGTH = 160;
const ID_DIR = path.join(rootDir, 'frontend/content/resume-examples/id');

const files = fs.readdirSync(ID_DIR).filter(f => f.endsWith('.mdx'));

let updated = 0;
let skipped = 0;
let tooLong = 0;
let errors = 0;

// Shortening rules for Indonesian descriptions
const shortenings = [
  ['yang ATS-friendly dan siap didownload gratis', 'ATS-friendly siap didownload'],
  ['dan siap didownload gratis', ''],
  ['Template curriculum vitae yang dioptimalkan', 'Template curriculum vitae'],
  ['dengan format profesional, contoh ringkasan, dan tips lolos seleksi 2026', 'dengan tips lolos seleksi ATS 2026'],
  ['dengan format profesional dan tips lolos seleksi 2026', 'dengan tips lolos seleksi 2026'],
  [', contoh ringkasan, dan tips lolos seleksi 2026', ''],
  [' dan tips lolos seleksi 2026', ''],
  ['untuk lolos seleksi ATS 2026', 'ATS 2026'],
  [' 2026', ''],
];

for (const file of files) {
  const filePath = path.join(ID_DIR, file);
  let raw, data, content;
  try {
    raw = fs.readFileSync(filePath, 'utf-8');
    ({ data, content } = matter(raw));
  } catch (e) {
    console.error(`ERROR parsing ${file}: ${e.message}`);
    errors++;
    continue;
  }

  if (!data.description) {
    skipped++;
    continue;
  }

  const desc = data.description;

  // Skip if already short and has "curriculum vitae"
  if (desc.length <= MAX_DESC_LENGTH && desc.toLowerCase().includes('curriculum vitae')) {
    skipped++;
    continue;
  }

  let newDesc = desc;

  // Step 1: Shorten if over limit
  if (newDesc.length > MAX_DESC_LENGTH) {
    for (const [from, to] of shortenings) {
      newDesc = newDesc.replace(from, to);
      if (newDesc.length <= MAX_DESC_LENGTH) break;
    }
    // Clean up double spaces
    newDesc = newDesc.replace(/  +/g, ' ').replace(/\. \./g, '.').replace(/ \./g, '.').replace(/\.\.+/g, '.').trim();
  }

  // Step 2: Ensure "curriculum vitae" appears
  if (!newDesc.toLowerCase().includes('curriculum vitae')) {
    // Replace "CV [Profession]" → "curriculum vitae [Profession]" in descriptions
    const replaced = newDesc.replace(/\bCV\b(?= [A-Z])/, 'curriculum vitae');
    if (replaced !== newDesc) {
      newDesc = replaced;
    }
  }

  if (newDesc === desc) {
    skipped++;
    continue;
  }

  // Final truncation if still too long
  if (newDesc.length > MAX_DESC_LENGTH) {
    const lastPeriod = newDesc.lastIndexOf('.', MAX_DESC_LENGTH - 1);
    if (lastPeriod > 80) {
      newDesc = newDesc.substring(0, lastPeriod + 1);
    }
  }

  if (newDesc.length > MAX_DESC_LENGTH) {
    tooLong++;
    skipped++;
    continue;
  }

  data.description = newDesc;

  if (DRY_RUN) {
    console.log(`${file} (${newDesc.length} chars):`);
    console.log(`  BEFORE: ${desc.substring(0, 90)}...`);
    console.log(`  AFTER:  ${newDesc.substring(0, 90)}...`);
  } else {
    const rebuilt = matter.stringify(content, data);
    fs.writeFileSync(filePath, rebuilt, 'utf-8');
  }
  updated++;
}

console.log(`\n=== SUMMARY ===`);
console.log(`Updated: ${updated}`);
console.log(`Skipped: ${skipped} (${tooLong} too long after trimming)`);
if (errors) console.log(`Errors: ${errors}`);
if (DRY_RUN) console.log('(dry run — no files changed)');

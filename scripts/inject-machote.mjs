#!/usr/bin/env node
/**
 * Injects "machote" (Mexican Spanish for template) synonym into Spanish
 * resume example body content. Inserts 1 sentence after the existing
 * "hoja de vida" sentence that was added by optimize-es-body-keywords.mjs.
 *
 * Usage: node scripts/inject-machote.mjs [--dry-run]
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
const ES_DIR = path.join(rootDir, 'frontend/content/resume-examples/es');

const files = fs.readdirSync(ES_DIR).filter(f => f.endsWith('.mdx'));

let updated = 0;
let skipped = 0;
let errors = 0;

for (const file of files) {
  const filePath = path.join(ES_DIR, file);
  let raw, data, content;
  try {
    raw = fs.readFileSync(filePath, 'utf-8');
    ({ data, content } = matter(raw));
  } catch (e) {
    console.error(`ERROR parsing ${file}: ${e.message}`);
    errors++;
    continue;
  }

  // Idempotency: skip if already contains "machote"
  if (content.includes('machote')) {
    skipped++;
    continue;
  }

  // Find the "hoja de vida" sentence inserted by optimize-es-body-keywords.mjs
  // and append our machote sentence after it
  const hojaPattern = /hoja de vida en Latinoamérica —[^.]+\./;
  const hojaMatch = content.match(hojaPattern);

  let newContent = content;
  let inserted = false;

  if (hojaMatch) {
    const insertPos = content.indexOf(hojaMatch[0]) + hojaMatch[0].length;
    const machoteSentence = ' En México, este tipo de documento también se conoce como machote de currículum o machote de CV.';
    newContent = content.substring(0, insertPos) + machoteSentence + content.substring(insertPos);
    inserted = true;
  }

  if (!inserted) {
    skipped++;
    if (DRY_RUN) console.log(`SKIP (no insertion point): ${file}`);
    continue;
  }

  if (DRY_RUN) {
    console.log(`OK: ${file}`);
  } else {
    const rebuilt = matter.stringify(newContent, data);
    fs.writeFileSync(filePath, rebuilt, 'utf-8');
  }
  updated++;
}

console.log(`\n=== SUMMARY ===`);
console.log(`Updated: ${updated}`);
console.log(`Skipped: ${skipped}`);
if (errors) console.log(`Errors: ${errors}`);
if (DRY_RUN) console.log('(dry run — no files changed)');

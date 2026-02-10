#!/usr/bin/env node
/**
 * Optimizes Spanish resume example tags for SEO.
 * Replaces generic filler tags (slots 5-8) with high-volume Spanish keywords:
 *   - "curriculum vitae de [job]"
 *   - "hoja de vida de [job]"
 *   - "formato de curriculum vitae [job]"
 *   - "modelo de curriculum vitae [job]"
 *
 * Usage: node scripts/optimize-es-tags.mjs [--dry-run]
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

  if (!data.tags || !data.jobTitle) {
    skipped++;
    continue;
  }

  const jobLower = data.jobTitle.toLowerCase();
  const oldTags = [...data.tags];

  // Keep first 4 tags (job-specific), replace slots 5-8 with high-volume keywords
  const kept = data.tags.slice(0, 4);
  const newKeywordTags = [
    `curriculum vitae de ${jobLower}`,
    `hoja de vida de ${jobLower}`,
    `formato de curriculum vitae ${jobLower}`,
    `modelo de curriculum vitae ${jobLower}`,
  ];

  data.tags = [...kept, ...newKeywordTags];

  if (DRY_RUN) {
    const replaced = oldTags.slice(4).join(', ');
    console.log(`${file}: replaced [${replaced}] → [${newKeywordTags.join(', ')}]`);
  } else {
    const rebuilt = matter.stringify(content, data);
    fs.writeFileSync(filePath, rebuilt, 'utf-8');
  }
  updated++;
}

console.log(`\n=== SUMMARY ===`);
console.log(`Updated: ${updated}`);
console.log(`Skipped: ${skipped}`);
if (errors) console.log(`Errors: ${errors}`);
if (DRY_RUN) console.log('(dry run — no files changed)');

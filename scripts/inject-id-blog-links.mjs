#!/usr/bin/env node
/**
 * Injects 2 Indonesian blog links into the "Sumber Daya Tambahan" section
 * of Indonesian resume example pages, just before the final CTA paragraph.
 *
 * Usage: node scripts/inject-id-blog-links.mjs [--dry-run]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const DRY_RUN = process.argv.includes('--dry-run');
const ID_DIR = path.join(rootDir, 'frontend/content/resume-examples/id');

const files = fs.readdirSync(ID_DIR).filter(f => f.endsWith('.mdx'));

// Indonesian blog links to inject
const newLinks = [
  '- [Cara Membuat CV yang Baik dan Benar](/id/blog/cara-membuat-cv) — Panduan lengkap membuat CV profesional dari nol yang lolos seleksi ATS',
  '- [Download Template CV Gratis](/id/blog/download-template-cv-gratis) — Unduh template CV gratis format Word dan PDF yang siap digunakan',
];

const IDEMPOTENCY_CHECK = '/id/blog/cara-membuat-cv';

let updated = 0;
let skipped = 0;
let errors = 0;

for (const file of files) {
  const filePath = path.join(ID_DIR, file);
  let raw;
  try {
    raw = fs.readFileSync(filePath, 'utf-8');
  } catch (e) {
    console.error(`ERROR reading ${file}: ${e.message}`);
    errors++;
    continue;
  }

  // Idempotency: skip if already has the blog link
  if (raw.includes(IDEMPOTENCY_CHECK)) {
    skipped++;
    continue;
  }

  let content = raw;
  let changed = false;

  // Find the CTA paragraph (starts with "Siap membuat CV")
  const ctaPattern = /\nSiap membuat CV [^\n]+\n/;
  const ctaMatch = content.match(ctaPattern);

  if (ctaMatch) {
    const insertPos = content.indexOf(ctaMatch[0]);
    const linksBlock = '\n' + newLinks.join('\n') + '\n';
    content = content.substring(0, insertPos) + linksBlock + content.substring(insertPos);
    changed = true;
  }

  if (!changed) {
    // Fallback: insert before last paragraph referencing /id/builder
    const builderPattern = /\n[^\n]*\/id\/builder[^\n]*\n*$/;
    const builderMatch = content.match(builderPattern);
    if (builderMatch) {
      const insertPos = content.lastIndexOf(builderMatch[0]);
      const linksBlock = '\n' + newLinks.join('\n') + '\n';
      content = content.substring(0, insertPos) + linksBlock + content.substring(insertPos);
      changed = true;
    }
  }

  if (!changed) {
    skipped++;
    if (DRY_RUN) console.log(`SKIP (no insertion point): ${file}`);
    continue;
  }

  if (DRY_RUN) {
    console.log(`OK: ${file}`);
  } else {
    fs.writeFileSync(filePath, content, 'utf-8');
  }
  updated++;
}

console.log(`\n=== SUMMARY ===`);
console.log(`Updated: ${updated}`);
console.log(`Skipped: ${skipped}`);
if (errors) console.log(`Errors: ${errors}`);
if (DRY_RUN) console.log('(dry run — no files changed)');

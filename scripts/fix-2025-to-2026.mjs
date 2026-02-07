#!/usr/bin/env node
/**
 * Updates resume example files that still reference 2025 to look like
 * they were originally published in 2026.
 *
 * Changes:
 * - title: "2025" → "2026"
 * - date: set to a 2026 date (spread across Jan 2026)
 * - Any "2025" references in body content → "2026"
 *
 * Usage: node scripts/fix-2025-to-2026.mjs [--dry-run]
 */

import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const require = createRequire(path.join(rootDir, 'frontend', 'package.json'));
const matter = require('gray-matter');

const DRY_RUN = process.argv.includes('--dry-run');
const CONTENT_DIR = path.join(rootDir, 'frontend/content/resume-examples');

const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.mdx'));
let updated = 0;
let skipped = 0;

for (const file of files) {
  const filePath = path.join(CONTENT_DIR, file);
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);

  const title = data.title || '';
  const hasOldTitle = title.includes('2025');
  const hasOldContent = content.includes('2025');
  const hasOldDate = data.date && data.date.toString().startsWith('2025');

  if (!hasOldTitle && !hasOldContent && !hasOldDate) {
    skipped++;
    continue;
  }

  // Update title
  if (hasOldTitle) {
    data.title = title.replace(/2025/g, '2026');
  }

  // Set date to Jan 2026 (spread files across the month for natural look)
  // Use a deterministic day based on the filename hash
  const day = (file.charCodeAt(0) + file.charCodeAt(1) + file.length) % 28 + 1;
  const paddedDay = day.toString().padStart(2, '0');
  data.date = `2026-01-${paddedDay}`;

  // Update body content references
  const newContent = content.replace(/2025/g, '2026');

  if (DRY_RUN) {
    console.log(`[DRY RUN] ${file}: title="${data.title}", date=${data.date}`);
  } else {
    const output = matter.stringify(newContent, data);
    fs.writeFileSync(filePath, output, 'utf8');
    console.log(`Updated: ${file} → date=${data.date}`);
  }
  updated++;
}

console.log(`\n✅ Updated: ${updated} files`);
console.log(`Skipped: ${skipped} files (already 2026)`);
if (DRY_RUN) console.log('This was a dry run.');

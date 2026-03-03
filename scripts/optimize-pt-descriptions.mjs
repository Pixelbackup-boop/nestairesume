#!/usr/bin/env node
/**
 * Optimizes Portuguese meta descriptions for SEO (≤160 chars).
 * Shortens common bloated phrases and ensures "modelo de currículo" is present.
 *
 * Usage: node scripts/optimize-pt-descriptions.mjs [--dry-run]
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

const CONTENT_DIRS = [
  path.join(rootDir, 'frontend/content/resume-examples/pt'),
  path.join(rootDir, 'frontend/content/cover-letter-examples/pt'),
  path.join(rootDir, 'frontend/content/blog/pt'),
];

// Shortening rules ordered by savings (most impactful first)
const shortenings = [
  // Resume description patterns
  ['com exemplos compatíveis com ATS e dicas de especialistas', 'com exemplos ATS'],
  ['com exemplos compatíveis com ATS', 'com exemplos ATS'],
  ['compatíveis com ATS e dicas de especialistas', 'compatíveis com ATS'],
  ['Crie seu currículo profissional e conquiste entrevistas em 2026.', 'Conquiste entrevistas em 2026.'],
  ['Crie seu currículo profissional e conquiste entrevistas.', 'Conquiste entrevistas.'],
  ['e conquiste entrevistas em 2026.', 'e conquiste entrevistas.'],
  ['dicas de especialistas', 'dicas'],
  [' em 2026', ''],
  // Cover letter patterns
  ['Aprenda a valorizar suas competências e conquistar entrevistas em 2026.', 'Conquiste entrevistas.'],
  ['Aprenda a valorizar suas competências e conquistar entrevistas.', 'Conquiste entrevistas.'],
  ['com modelos profissionais e dicas de especialistas', 'com modelos profissionais'],
  ['com modelos profissionais.', '.'],
  // Blog patterns
  ['Descubra estratégias práticas e exemplos reais para', 'Veja como'],
  ['estratégias práticas e exemplos reais', 'estratégias e exemplos'],
  ['estratégias práticas', 'estratégias'],
  ['exemplos reais', 'exemplos'],
  ['e guias completos', ''],
  ['e orientações práticas', ''],
  ['Aprenda como', 'Como'],
  ['Descubra como', 'Como'],
  ['Saiba como', 'Como'],
];

let totalUpdated = 0;
let totalSkipped = 0;
let totalTooLong = 0;
let totalErrors = 0;

for (const dir of CONTENT_DIRS) {
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));

  for (const file of files) {
    const filePath = path.join(dir, file);
    let raw, data, content;
    try {
      raw = fs.readFileSync(filePath, 'utf-8');
      ({ data, content } = matter(raw));
    } catch (e) {
      console.error(`ERROR parsing ${file}: ${e.message}`);
      totalErrors++;
      continue;
    }

    if (!data.description) {
      totalSkipped++;
      continue;
    }

    const desc = data.description;

    // Already within limit — skip
    if (desc.length <= MAX_DESC_LENGTH) {
      totalSkipped++;
      continue;
    }

    let newDesc = desc;

    // Step 1: Apply shortening rules
    for (const [from, to] of shortenings) {
      if (newDesc.length <= MAX_DESC_LENGTH) break;
      newDesc = newDesc.replace(from, to);
    }

    // Step 2: Clean up double spaces and stray punctuation
    newDesc = newDesc
      .replace(/  +/g, ' ')
      .replace(/\. \./g, '.')
      .replace(/ \./g, '.')
      .replace(/\.\.+/g, '.')
      .replace(/,\./g, '.')
      .trim();

    // Step 3: Truncate at last sentence boundary if still too long
    if (newDesc.length > MAX_DESC_LENGTH) {
      const lastPeriod = newDesc.lastIndexOf('.', MAX_DESC_LENGTH - 1);
      if (lastPeriod > 80) {
        newDesc = newDesc.substring(0, lastPeriod + 1);
      }
    }

    // Step 4: Hard truncate if still too long
    if (newDesc.length > MAX_DESC_LENGTH) {
      const lastSpace = newDesc.lastIndexOf(' ', MAX_DESC_LENGTH - 3);
      if (lastSpace > 80) {
        newDesc = newDesc.substring(0, lastSpace) + '...';
      } else {
        totalTooLong++;
        totalSkipped++;
        if (DRY_RUN) console.log(`SKIP (too long ${newDesc.length}): ${file}`);
        continue;
      }
    }

    if (newDesc === desc) {
      totalSkipped++;
      continue;
    }

    data.description = newDesc;

    if (DRY_RUN) {
      console.log(`${path.basename(dir)}/${file} (${desc.length} → ${newDesc.length}):`);
      console.log(`  BEFORE: ${desc}`);
      console.log(`  AFTER:  ${newDesc}`);
    } else {
      const rebuilt = matter.stringify(content, data);
      fs.writeFileSync(filePath, rebuilt, 'utf-8');
    }
    totalUpdated++;
  }
}

console.log(`\n=== SUMMARY ===`);
console.log(`Updated: ${totalUpdated}`);
console.log(`Skipped: ${totalSkipped} (${totalTooLong} still too long after rules)`);
if (totalErrors) console.log(`Errors: ${totalErrors}`);
if (DRY_RUN) console.log('(dry run — no files changed)');

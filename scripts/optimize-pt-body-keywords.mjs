#!/usr/bin/env node
/**
 * Adds "modelo de currículo" and "curriculum vitae" keyword mentions to
 * Portuguese resume example body content. Inserts 2 natural sentences:
 *   1. After intro paragraph — terminology explanation
 *   2. Before ATS section content — universal ATS advice
 *
 * Usage: node scripts/optimize-pt-body-keywords.mjs [--dry-run]
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
const PT_DIR = path.join(rootDir, 'frontend/content/resume-examples/pt');

const files = fs.readdirSync(PT_DIR).filter(f => f.endsWith('.mdx'));

let updated = 0;
let skipped = 0;
let errors = 0;

for (const file of files) {
  const filePath = path.join(PT_DIR, file);
  let raw, data, content;
  try {
    raw = fs.readFileSync(filePath, 'utf-8');
    ({ data, content } = matter(raw));
  } catch (e) {
    console.error(`ERROR parsing ${file}: ${e.message}`);
    errors++;
    continue;
  }

  // Idempotency: skip if already contains "curriculum vitae"
  if (content.includes('curriculum vitae') || content.includes('curriculum Vitae')) {
    skipped++;
    continue;
  }

  const jobTitle = data.jobTitle || '';
  let newContent = content;
  let changes = 0;

  // Location A: After the first paragraph following the first H2
  const introMatch = newContent.match(/^(## .+\n\n)([\s\S]+?)(\n\n##)/m);
  if (introMatch) {
    const heading = introMatch[1];
    const introParagraph = introMatch[2];
    const nextSection = introMatch[3];

    const sentence = ` Este documento — também conhecido como curriculum vitae (CV) — é o seu principal modelo de currículo para conquistar entrevistas na área de ${jobTitle}.`;

    const firstParaEnd = introParagraph.indexOf('\n\n');
    if (firstParaEnd > 0) {
      const firstPara = introParagraph.substring(0, firstParaEnd);
      const rest = introParagraph.substring(firstParaEnd);
      newContent = newContent.replace(
        introMatch[0],
        heading + firstPara + sentence + rest + nextSection
      );
    } else {
      newContent = newContent.replace(
        introMatch[0],
        heading + introParagraph + sentence + nextSection
      );
    }
    changes++;
  }

  // Location B: After ATS section heading, before existing content
  const atsPattern = /^(## (?:Otimização ATS|Otimizacao ATS|ATS).*\n\n)/m;
  const atsMatch = newContent.match(atsPattern);
  if (atsMatch) {
    const atsSentence = 'Seja chamado de currículo, curriculum vitae (CV) ou modelo de currículo, a otimização para sistemas ATS segue os mesmos princípios fundamentais. ';
    const atsPos = newContent.indexOf(atsMatch[0]);
    const insertPos = atsPos + atsMatch[1].length;
    newContent = newContent.substring(0, insertPos) + atsSentence + newContent.substring(insertPos);
    changes++;
  }

  if (changes === 0) {
    skipped++;
    if (DRY_RUN) console.log(`SKIP (no insertion points): ${file}`);
    continue;
  }

  if (DRY_RUN) {
    console.log(`${file}: ${changes} insertion(s)`);
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

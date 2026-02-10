#!/usr/bin/env node
/**
 * Adds "curriculum vitae" and "hoja de vida" keyword mentions to Spanish resume
 * example body content. Inserts 2 natural sentences:
 *   1. After intro paragraph — regional terminology explanation
 *   2. Before ATS section content — universal ATS advice
 *
 * Usage: node scripts/optimize-es-body-keywords.mjs [--dry-run]
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

  // Idempotency: skip if already contains "hoja de vida"
  if (content.includes('hoja de vida')) {
    skipped++;
    continue;
  }

  const jobTitle = data.jobTitle || '';
  let newContent = content;
  let changes = 0;

  // Location A: After the first paragraph following the first H2
  // Pattern: ## heading\n\nparagraph text\n\n
  const introMatch = newContent.match(/^(## .+\n\n)([\s\S]+?)(\n\n##)/m);
  if (introMatch) {
    const heading = introMatch[1];
    const introParagraph = introMatch[2];
    const nextSection = introMatch[3];

    const sentence = ` Este documento — también conocido como curriculum vitae (CV) o hoja de vida en Latinoamérica — es tu herramienta principal para conseguir entrevistas en el campo de ${jobTitle}.`;

    // Find the end of the first paragraph within the intro block
    const firstParaEnd = introParagraph.indexOf('\n\n');
    if (firstParaEnd > 0) {
      const firstPara = introParagraph.substring(0, firstParaEnd);
      const rest = introParagraph.substring(firstParaEnd);
      newContent = newContent.replace(
        introMatch[0],
        heading + firstPara + sentence + rest + nextSection
      );
    } else {
      // Single paragraph intro
      newContent = newContent.replace(
        introMatch[0],
        heading + introParagraph + sentence + nextSection
      );
    }
    changes++;
  }

  // Location B: After ATS section heading, before existing content
  // Match various Spanish ATS heading patterns
  const atsPattern = /^(## (?:Optimización ATS|Consejos de Optimización para ATS|Optimización ATS para Currículums?).*\n\n)/m;
  const atsMatch = newContent.match(atsPattern);
  if (atsMatch) {
    const atsSentence = 'Ya sea que lo llames currículum, curriculum vitae (CV) o hoja de vida, la optimización para sistemas ATS sigue los mismos principios fundamentales. ';
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

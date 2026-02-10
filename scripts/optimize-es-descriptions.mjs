#!/usr/bin/env node
/**
 * Optimizes Spanish resume example meta descriptions for SEO.
 * Two-step approach:
 *   1. Shorten bloated phrases (median 192 chars → ≤160)
 *   2. Inject "vitae" → "currículum vitae" to target 50K/month keyword
 *
 * Usage: node scripts/optimize-es-descriptions.mjs [--dry-run]
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
const ES_DIR = path.join(rootDir, 'frontend/content/resume-examples/es');

const files = fs.readdirSync(ES_DIR).filter(f => f.endsWith('.mdx'));

let updated = 0;
let skipped = 0;
let tooLong = 0;
let errors = 0;

// Shortening rules ordered by savings (most impactful first)
const shortenings = [
  ['plantillas compatibles con ATS para 2026', 'plantillas ATS'],
  ['plantillas optimizadas para ATS', 'plantillas ATS'],
  ['plantillas compatibles con ATS', 'plantillas ATS'],
  ['con formato profesional y plantillas', 'con plantillas ATS'],
  ['para impresionar a los gerentes de contratación', ''],
  ['para impresionar a los reclutadores', ''],
  ['para destacar ante los reclutadores', ''],
  ['para conseguir empleo en el sector creativo', ''],
  ['para conseguir empleo en el sector', ''],
  ['Aprende a mostrar tu experiencia en ', 'Destaca '],
  ['consejos expertos de redacción', 'consejos expertos'],
  ['Consejos de formato profesional, habilidades clave y tips de expertos', 'Consejos expertos'],
  ['consejos de expertos', 'consejos expertos'],
  ['Destaca tus habilidades de ', 'Destaca '],
  [' para 2026', ''],
  ['. Incluye consejos', '. Consejos'],
  ['y más para destacar', 'y más'],
  ['y más para impresionar', 'y más'],
  ['para impresionar a los mejores gerentes de contratación', ''],
  ['Aprende a destacar tus habilidades en ', 'Destaca '],
  ['Aprende a destacar tus habilidades de ', 'Destaca '],
  ['y consejos expertos de redacción para 2026', 'y consejos expertos'],
  ['para conseguir entrevistas', ''],
  ['Formato profesional, habilidades clave y ejemplos reales', 'Formato profesional y ejemplos'],
  ['con consejos de redacción', 'con consejos expertos'],
  ['con consejos expertos de redacción', 'con consejos expertos'],
  ['y cumplimiento de horarios', ''],
  ['y navegación de recursos', ''],
  ['Aprende cómo destacar tu ', 'Destaca tu '],
  ['Aprende a mostrar tus habilidades en ', 'Destaca '],
  ['y consejos expertos de redacción', 'y consejos expertos'],
  ['con consejos expertos y ejemplos reales', 'con consejos expertos'],
  ['Ejemplo y muestra de currículum de', 'Curriculum vitae de'],
  ['Ejemplos de currículum de', 'Curriculum vitae de'],
];

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

  if (!data.description) {
    skipped++;
    continue;
  }

  const desc = data.description;

  // Skip if already contains "vitae"
  if (desc.toLowerCase().includes('vitae')) {
    skipped++;
    continue;
  }

  let newDesc = desc;

  // Step 1: Shorten common bloated phrases first
  for (const [from, to] of shortenings) {
    newDesc = newDesc.replace(from, to);
  }

  // If still long, strip trailing "para conseguir ..." phrases
  if (newDesc.length > 160) {
    newDesc = newDesc.replace(/ para conseguir [^.]+\.?$/, '.');
  }
  // If still long, strip trailing "y capacidades ..." or "y experiencia ..." phrases
  if (newDesc.length > 160) {
    newDesc = newDesc.replace(/ y (?:capacidades|experiencia) [^.]+\.?$/, '.');
  }

  // Clean up double spaces and trailing periods from removals
  newDesc = newDesc.replace(/  +/g, ' ').replace(/\. \./g, '.').replace(/ \./g, '.').replace(/\.\.+/g, '.').trim();

  // Step 2: Inject "vitae" after first "currículum"
  // Try "Ejemplo de currículum de" → "Curriculum vitae de" (saves 5 + adds keyword)
  let vitaeAdded = false;
  const ejemploLong = newDesc.match(/Ejemplo profesional de currículum de/i);
  if (ejemploLong) {
    newDesc = newDesc.replace(/Ejemplo profesional de currículum de/i, 'Curriculum vitae de');
    vitaeAdded = true;
  }

  if (!vitaeAdded) {
    const ejemploShort = newDesc.match(/Ejemplo de currículum de/i);
    if (ejemploShort) {
      newDesc = newDesc.replace(/Ejemplo de currículum de/i, 'Curriculum vitae de');
      vitaeAdded = true;
    }
  }

  // Fallback: inject "vitae" after first "currículum"
  if (!vitaeAdded) {
    const replaced = newDesc.replace(
      /curr[ií]cul[ua]m/i,
      (match) => match + ' vitae'
    );
    if (replaced !== newDesc) {
      newDesc = replaced;
      vitaeAdded = true;
    }
  }

  // If no change was possible, skip
  if (newDesc === desc) {
    skipped++;
    continue;
  }

  // Final fallback: truncate at last sentence boundary within limit
  if (newDesc.length > MAX_DESC_LENGTH) {
    const lastPeriod = newDesc.lastIndexOf('.', MAX_DESC_LENGTH - 1);
    if (lastPeriod > 80) {
      newDesc = newDesc.substring(0, lastPeriod + 1);
    }
  }

  // If still too long, skip
  if (newDesc.length > MAX_DESC_LENGTH) {
    tooLong++;
    if (DRY_RUN) {
      console.log(`SKIP (too long ${newDesc.length} chars): ${file}`);
    }
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
console.log(`Skipped: ${skipped} (${tooLong} too long)`);
if (errors) console.log(`Errors: ${errors}`);
if (DRY_RUN) console.log('(dry run — no files changed)');

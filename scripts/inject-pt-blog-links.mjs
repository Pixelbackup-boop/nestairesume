#!/usr/bin/env node
/**
 * Adds 2 Portuguese blog links to the "Recursos Complementares" section
 * of Portuguese resume example pages.
 *
 * Links added before the final CTA paragraph:
 *   - Como Escrever um Currículo: Guia Completo
 *   - Modelos de Currículo Grátis
 *
 * Usage: node scripts/inject-pt-blog-links.mjs [--dry-run]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const DRY_RUN = process.argv.includes('--dry-run');
const PT_DIR = path.join(rootDir, 'frontend/content/resume-examples/pt');

const files = fs.readdirSync(PT_DIR).filter(f => f.endsWith('.mdx'));

// New Portuguese blog links to inject
const newLinks = [
  '- [Como Escrever um Currículo: Guia Completo](/pt/blog/como-escrever-curriculo) — Passo a passo completo para criar um currículo profissional do zero',
  '- [Modelos de Currículo Grátis](/pt/blog/modelos-curriculo-gratis) — Baixe modelos de currículo compatíveis com ATS e prontos para usar',
];

let updated = 0;
let skipped = 0;
let errors = 0;

for (const file of files) {
  const filePath = path.join(PT_DIR, file);
  let raw;
  try {
    raw = fs.readFileSync(filePath, 'utf-8');
  } catch (e) {
    console.error(`ERROR reading ${file}: ${e.message}`);
    errors++;
    continue;
  }

  // Idempotency: skip if already has the blog link
  if (raw.includes('/pt/blog/como-escrever-curriculo')) {
    skipped++;
    continue;
  }

  let content = raw;
  let changed = false;

  // Find the CTA paragraph (starts with "Pronto para criar")
  const ctaPattern = /\nPronto para criar [^\n]+\n/;
  const ctaMatch = content.match(ctaPattern);

  if (ctaMatch) {
    const insertPos = content.indexOf(ctaMatch[0]);
    const linksBlock = '\n' + newLinks.join('\n') + '\n';
    content = content.substring(0, insertPos) + linksBlock + content.substring(insertPos);
    changed = true;
  }

  if (!changed) {
    // Fallback: insert before last paragraph if it contains "/pt/builder"
    const builderPattern = /\n[^\n]*\/pt\/builder[^\n]*\n*$/;
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

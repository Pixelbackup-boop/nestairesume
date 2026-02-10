#!/usr/bin/env node
/**
 * Replaces English blog links with Spanish blog equivalents in Spanish
 * resume example pages, and adds 2 new Spanish blog links to the
 * "Recursos Relacionados" section.
 *
 * Usage: node scripts/inject-es-blog-links.mjs [--dry-run]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const DRY_RUN = process.argv.includes('--dry-run');
const ES_DIR = path.join(rootDir, 'frontend/content/resume-examples/es');

const files = fs.readdirSync(ES_DIR).filter(f => f.endsWith('.mdx'));

let updated = 0;
let skipped = 0;
let errors = 0;

// Replacement map: [regex, replacement]
const replacements = [
  // Long variant: "Cómo Escribir un Currículum: Guía Completa (2026)"
  [
    /- \[Cómo Escribir un Currículum: Guía Completa \(2026\)\]\(\/blog\/how-to-write-a-resume\)/g,
    '- [Formato de Curriculum Vitae: Guía Completa](/es/blog/formato-de-curriculum-vitae)',
  ],
  // Short variant: "Cómo Escribir un Currículum"
  [
    /- \[Cómo Escribir un Currículum\]\(\/blog\/how-to-write-a-resume\)/g,
    '- [Plantillas de Curriculum Vitae Gratis](/es/blog/plantillas-de-curriculum-vitae)',
  ],
  // ATS variant
  [
    /- \[Cómo Escribir un Currículum Compatible con ATS\]\(\/blog\/how-to-write-ats-friendly-resume\)/g,
    '- [Crear Curriculum Vitae Gratis Online](/es/blog/crear-curriculum-vitae-gratis)',
  ],
];

// Additional Spanish blog links to add (before final CTA)
const newLinks = [
  '- [Ejemplos de Hojas de Vida por Profesión](/es/blog/ejemplos-de-hojas-de-vida)',
  '- [Diseño de Curriculum Vitae: Guía Completa](/es/blog/diseno-de-curriculum-vitae)',
];

for (const file of files) {
  const filePath = path.join(ES_DIR, file);
  let raw;
  try {
    raw = fs.readFileSync(filePath, 'utf-8');
  } catch (e) {
    console.error(`ERROR reading ${file}: ${e.message}`);
    errors++;
    continue;
  }

  let content = raw;
  let changed = false;

  // Apply replacements
  for (const [regex, replacement] of replacements) {
    const before = content;
    content = content.replace(regex, replacement);
    if (content !== before) changed = true;
  }

  // Add new Spanish blog links if not already present
  if (!content.includes('/es/blog/ejemplos-de-hojas-de-vida')) {
    // Find the last CTA line pattern to insert before it
    const ctaPattern = /\n¿Necesitas un currículum profesional\?[^\n]*\n*$/;
    const ctaMatch = content.match(ctaPattern);
    if (ctaMatch) {
      const insertPos = content.lastIndexOf(ctaMatch[0]);
      const linksBlock = '\n' + newLinks.join('\n') + '\n';
      content = content.substring(0, insertPos) + linksBlock + content.substring(insertPos);
      changed = true;
    }
  }

  if (!changed) {
    skipped++;
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

#!/usr/bin/env node
/**
 * Fix internal links in Spanish resume examples to use:
 * 1. /es/ locale prefix
 * 2. Spanish route segments (ejemplos-de-curriculum, etc.)
 *
 * Run: node scripts/fix-es-internal-links.mjs
 * Dry run: node scripts/fix-es-internal-links.mjs --dry-run
 */

import fs from 'fs';
import path from 'path';

const DRY_RUN = process.argv.includes('--dry-run');
const ES_DIR = path.join(process.cwd(), 'frontend/content/resume-examples/es');

// Replacement rules: [pattern, replacement]
// Order matters — more specific patterns first
const REPLACEMENTS = [
  // Already-localized links: skip (these have /es/ prefix already)
  // We handle this by only matching links WITHOUT /es/ prefix

  // Route segment translations
  [/\]\(\/resume-examples\//g, '](/es/ejemplos-de-curriculum/'],
  [/\]\(\/cover-letter-examples\//g, '](/es/ejemplos-de-carta-de-presentacion/'],
  [/\]\(\/career-tips\//g, '](/es/consejos-profesionales/'],
  [/\]\(\/tools\//g, '](/es/herramientas/'],

  // Blog stays /blog/ but needs /es/ prefix
  [/\]\(\/blog\//g, '](/es/blog/'],

  // Builder (with various suffixes)
  [/\]\(\/builder\)/g, '](/es/creador-de-curriculum)'],
  [/\]\(\/builder#/g, '](/es/creador-de-curriculum#'],
  [/\]\(\/builder\s/g, '](/es/creador-de-curriculum '],

  // Onboarding
  [/\]\(\/onboarding\)/g, '](/es/onboarding)'],
  [/\]\(\/onboarding\//g, '](/es/onboarding/'],
];

let totalFiles = 0;
let modifiedFiles = 0;
let totalReplacements = 0;

const files = fs.readdirSync(ES_DIR).filter(f => f.endsWith('.mdx'));

for (const file of files) {
  const filePath = path.join(ES_DIR, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  const original = content;
  let fileReplacements = 0;

  for (const [pattern, replacement] of REPLACEMENTS) {
    const matches = content.match(pattern);
    if (matches) {
      fileReplacements += matches.length;
      content = content.replace(pattern, replacement);
    }
  }

  // Safety: don't double-prefix links that already have /es/
  // Check for accidental /es/es/ patterns
  const doublePrefix = content.match(/\/es\/es\//g);
  if (doublePrefix) {
    content = content.replace(/\/es\/es\//g, '/es/');
    console.warn(`  ⚠️  Fixed ${doublePrefix.length} double-prefix in ${file}`);
  }

  if (content !== original) {
    modifiedFiles++;
    totalReplacements += fileReplacements;
    if (!DRY_RUN) {
      fs.writeFileSync(filePath, content, 'utf-8');
    }
    if (DRY_RUN) {
      console.log(`  📝 ${file}: ${fileReplacements} replacements`);
    }
  }
  totalFiles++;
}

console.log(`\n${DRY_RUN ? '🔍 DRY RUN' : '✅ DONE'}`);
console.log(`  Files scanned: ${totalFiles}`);
console.log(`  Files modified: ${modifiedFiles}`);
console.log(`  Total replacements: ${totalReplacements}`);

if (DRY_RUN) {
  console.log('\nRun without --dry-run to apply changes.');
}

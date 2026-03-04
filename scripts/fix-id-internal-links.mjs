#!/usr/bin/env node
/**
 * Fix internal links in Indonesian resume/cover letter examples to use /id/ locale prefix.
 * Also fixes any links in blog/career-tips that are missing the /id/ prefix.
 *
 * Run: node scripts/fix-id-internal-links.mjs
 * Dry run: node scripts/fix-id-internal-links.mjs --dry-run
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const DRY_RUN = process.argv.includes('--dry-run');

const DIRS = [
  path.join(rootDir, 'frontend/content/resume-examples/id'),
  path.join(rootDir, 'frontend/content/cover-letter-examples/id'),
  path.join(rootDir, 'frontend/content/blog/id'),
  path.join(rootDir, 'frontend/content/career-tips/id'),
];

// Replacement rules: fix links missing the /id/ prefix
// These patterns match markdown links like (/) that don't start with /id/ or http
const REPLACEMENTS = [
  // Route segments — only if NOT already prefixed with /id/
  [/\]\(\/resume-examples\//g, '](/id/resume-examples/'],
  [/\]\(\/cover-letter-examples\//g, '](/id/cover-letter-examples/'],
  [/\]\(\/career-tips\//g, '](/id/career-tips/'],
  [/\]\(\/tools\//g, '](/id/tools/'],
  [/\]\(\/blog\//g, '](/id/blog/'],
  [/\]\(\/templates\b/g, '](/id/templates'],
  [/\]\(\/resume-examples\b/g, '](/id/resume-examples'],
  [/\]\(\/resume-format\b/g, '](/id/resume-format'],
  [/\]\(\/builder\)/g, '](/id/builder)'],
  [/\]\(\/builder#/g, '](/id/builder#'],
  [/\]\(\/builder\s/g, '](/id/builder '],
];

let totalFiles = 0;
let modifiedFiles = 0;
let totalReplacements = 0;

for (const dir of DIRS) {
  if (!fs.existsSync(dir)) {
    console.warn(`  ⚠️  Directory not found: ${dir}`);
    continue;
  }

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));

  for (const file of files) {
    const filePath = path.join(dir, file);
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

    // Fix double-prefix: /id/id/ → /id/
    const doublePrefix = content.match(/\/id\/id\//g);
    if (doublePrefix) {
      content = content.replace(/\/id\/id\//g, '/id/');
      console.warn(`  ⚠️  Fixed ${doublePrefix.length} double-prefix in ${file}`);
    }

    if (content !== original) {
      modifiedFiles++;
      totalReplacements += fileReplacements;
      if (!DRY_RUN) {
        fs.writeFileSync(filePath, content, 'utf-8');
      } else {
        console.log(`  📝 ${file}: ${fileReplacements} replacements`);
      }
    }
    totalFiles++;
  }
}

console.log(`\n${DRY_RUN ? '🔍 DRY RUN' : '✅ DONE'}`);
console.log(`  Files scanned: ${totalFiles}`);
console.log(`  Files modified: ${modifiedFiles}`);
console.log(`  Total replacements: ${totalReplacements}`);

if (DRY_RUN) {
  console.log('\nRun without --dry-run to apply changes.');
}

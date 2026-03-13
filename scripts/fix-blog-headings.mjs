#!/usr/bin/env node
/**
 * Fix blog heading structure for posts with only 1-2 H2s.
 * Promotes ### to ## and #### to ### to create proper heading hierarchy.
 *
 * Usage:
 *   node scripts/fix-blog-headings.mjs [--dry-run]
 */

import { createRequire } from 'node:module';
import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const require2 = createRequire(path.join(rootDir, 'frontend', 'package.json'));
const matter = require2('gray-matter');

const DRY_RUN = process.argv.includes('--dry-run');
const BLOG_DIR = path.join(rootDir, 'frontend', 'content', 'blog');
const LOCALES = ['ar', 'de', 'es', 'fr', 'id', 'it', 'ja', 'ko', 'nl', 'pl', 'pt', 'th', 'tr', 'vi'];

let totalFixed = 0;

function fixHeadings(dir, locale) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));
  let fixed = 0;

  for (const f of files) {
    const filePath = path.join(dir, f);
    let parsed;
    try { parsed = matter(fs.readFileSync(filePath, 'utf-8')); } catch { continue; }

    const { data: fm, content } = parsed;
    const lines = content.split('\n');

    // Count H2s
    const h2Count = lines.filter(l => /^## /.test(l)).length;
    if (h2Count >= 3) continue; // already OK

    // Count H3s — only promote if there are enough
    const h3Count = lines.filter(l => /^### /.test(l)).length;
    if (h3Count < 2) continue; // not enough to promote

    // Promote: ### → ##, #### → ###, ##### → ####
    const newLines = lines.map(l => {
      if (/^##### /.test(l)) return l.replace(/^#####/, '####');
      if (/^#### /.test(l)) return l.replace(/^####/, '###');
      if (/^### /.test(l)) return l.replace(/^###/, '##');
      return l;
    });

    // Verify we now have 3+ H2s
    const newH2Count = newLines.filter(l => /^## /.test(l)).length;
    if (newH2Count < 3) continue;

    if (!DRY_RUN) {
      fs.writeFileSync(filePath, matter.stringify(newLines.join('\n'), fm));
    }

    if (DRY_RUN && fixed < 3) {
      console.log(`  [${locale}] ${f}: ${h2Count} H2s → ${newH2Count} H2s (promoted ${h3Count} H3s)`);
    }
    fixed++;
  }

  if (fixed > 0) console.log(`${locale}: ${fixed} blogs fixed`);
  totalFixed += fixed;
}

// Process locale blog dirs
for (const locale of LOCALES) {
  fixHeadings(path.join(BLOG_DIR, locale), locale);
}

// Also process EN root blog dir
fixHeadings(BLOG_DIR, 'en');

console.log(`\n${DRY_RUN ? '[DRY RUN] ' : ''}Total blog headings fixed: ${totalFixed}`);

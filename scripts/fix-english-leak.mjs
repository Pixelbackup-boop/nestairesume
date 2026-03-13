#!/usr/bin/env node
/**
 * Remove English expansion sections that leaked into non-EN blog posts.
 * Detects English headings in locale files and strips them.
 */

import { createRequire } from 'node:module';
import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const require2 = createRequire(path.join(rootDir, 'frontend', 'package.json'));
const matter = require2('gray-matter');

const BLOG_DIR = path.join(rootDir, 'frontend', 'content', 'blog');
const LOCALES = ['ar', 'de', 'es', 'fr', 'id', 'it', 'ja', 'ko', 'nl', 'pl', 'pt', 'th', 'tr', 'vi'];

const EN_HEADINGS = [
  '## Common Mistakes to Avoid',
  '## Expert Tips for 2026',
  '## Step-by-Step Checklist',
  '## Trends Shaping Job Applications in 2026',
  '## How to Prepare Effectively',
  '## Body Language and Communication Tips',
  '## Structure of an Effective Cover Letter',
  '## Cover Letter Mistakes That Cost You Interviews',
  '## How ATS Systems Work in 2026',
  '## Choosing the Right AI Resume Tool',
  '## Salary Negotiation Strategies',
  '## How to Present Skills on Your Resume',
  '## Building a Professional Network That Leads to Jobs',
  '## Choosing the Right Resume Template',
];

let totalFixed = 0;

for (const locale of LOCALES) {
  const dir = path.join(BLOG_DIR, locale);
  if (!fs.existsSync(dir)) continue;

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));
  let fixed = 0;

  for (const f of files) {
    const filePath = path.join(dir, f);
    let parsed;
    try { parsed = matter(fs.readFileSync(filePath, 'utf-8')); } catch { continue; }

    const { data: fm, content } = parsed;
    let newContent = content;
    let changed = false;

    for (const heading of EN_HEADINGS) {
      const idx = newContent.indexOf(heading);
      if (idx === -1) continue;

      // Find the next ## heading after this one (or end of content)
      const afterHeading = newContent.substring(idx + heading.length);
      const nextH2 = afterHeading.search(/\n## /);

      if (nextH2 !== -1) {
        // Remove from this heading to the next heading
        newContent = newContent.substring(0, idx) + afterHeading.substring(nextH2 + 1);
      } else {
        // Remove from this heading to end
        newContent = newContent.substring(0, idx).trimEnd() + '\n';
      }
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(filePath, matter.stringify(newContent, fm));
      fixed++;
    }
  }

  if (fixed > 0) console.log(`${locale}: ${fixed} files cleaned`);
  totalFixed += fixed;
}

console.log(`\nTotal files cleaned: ${totalFixed}`);

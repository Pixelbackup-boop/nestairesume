#!/usr/bin/env node
/**
 * Fix duplicate descriptions within the same (locale, contentType) pair.
 * Differentiates by inserting slug-derived keywords into the description.
 *
 * Usage:
 *   node scripts/fix-duplicate-descs.mjs [--dry-run]
 */

import { createRequire } from 'node:module';
import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const require2 = createRequire(path.join(rootDir, 'frontend', 'package.json'));
const matter = require2('gray-matter');

const DRY_RUN = process.argv.includes('--dry-run');
const CONTENT_BASE = path.join(rootDir, 'frontend', 'content');
const CONTENT_TYPES = ['resume-examples', 'cover-letter-examples', 'blog', 'career-tips'];
const LOCALES = ['en', 'ar', 'de', 'es', 'fr', 'id', 'it', 'ja', 'ko', 'nl', 'pl', 'pt', 'th', 'tr', 'vi'];

function slugToWords(slug) {
  return slug.replace(/-/g, ' ');
}

let totalFixed = 0;

for (const contentType of CONTENT_TYPES) {
  for (const locale of LOCALES) {
    const dir = locale === 'en'
      ? path.join(CONTENT_BASE, contentType)
      : path.join(CONTENT_BASE, contentType, locale);
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));

    // Group by description
    const descMap = new Map();
    for (const f of files) {
      const filePath = path.join(dir, f);
      try {
        const raw = fs.readFileSync(filePath, 'utf-8');
        const parsed = matter(raw);
        const desc = parsed.data.description || '';
        if (!desc) continue;
        const slug = f.replace('.mdx', '');
        if (!descMap.has(desc)) descMap.set(desc, []);
        descMap.get(desc).push({ filePath, slug, fm: parsed.data, content: parsed.content });
      } catch { /* skip */ }
    }

    for (const [desc, group] of descMap) {
      if (group.length < 2) continue;

      // Keep first, modify rest
      group.sort((a, b) => a.slug.length - b.slug.length);

      for (let i = 1; i < group.length; i++) {
        const { filePath, slug, fm, content } = group[i];
        const jobName = slugToWords(slug);

        // Strategy: prepend or insert the job-specific keyword
        let newDesc = desc;

        // Try to find a good insertion point
        // If desc starts with a generic phrase, prepend the job name
        const firstSentenceEnd = desc.indexOf('.');
        if (firstSentenceEnd > 0 && firstSentenceEnd < 100) {
          // Insert job name reference into first sentence
          const first = desc.substring(0, firstSentenceEnd);
          const rest = desc.substring(firstSentenceEnd);
          if (!first.toLowerCase().includes(jobName.toLowerCase())) {
            newDesc = `${first} for ${jobName}${rest}`;
          } else {
            // Already has job name, append differentiator
            newDesc = `${desc.substring(0, desc.length - 1)} — ${jobName} focus.`;
          }
        } else {
          // Short desc, append
          newDesc = `${desc} Tailored for ${jobName} roles.`;
        }

        // Truncate if too long (max 160)
        if (newDesc.length > 160) {
          // Try shorter approach
          newDesc = `${desc.substring(0, 140)} — ${jobName}.`;
        }
        if (newDesc.length > 160) {
          newDesc = desc.substring(0, 155) + '...';
        }

        // Skip if no change or same as original
        if (newDesc === desc) continue;

        if (DRY_RUN) {
          console.log(`  [${locale}/${contentType}] ${slug}`);
          console.log(`    OLD: ${desc.substring(0, 80)}...`);
          console.log(`    NEW: ${newDesc.substring(0, 80)}...`);
        } else {
          fm.description = newDesc;
          fs.writeFileSync(filePath, matter.stringify(content, fm));
        }
        totalFixed++;
      }
    }
  }
}

console.log(`\n${DRY_RUN ? '[DRY RUN] ' : ''}Total duplicate descriptions fixed: ${totalFixed}`);

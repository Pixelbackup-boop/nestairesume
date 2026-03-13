#!/usr/bin/env node
/**
 * Fix duplicate titles within the same (locale, contentType) pair.
 * For each duplicate group, modifies the second+ file's title to be unique
 * by inserting a differentiator from the English slug.
 *
 * Usage:
 *   node scripts/fix-duplicate-titles.mjs [--dry-run]
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
const LOCALES = ['ar', 'de', 'es', 'fr', 'id', 'it', 'ja', 'ko', 'nl', 'pl', 'pt', 'th', 'tr', 'vi'];

function slugToWords(slug) {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

let totalFixed = 0;

for (const contentType of CONTENT_TYPES) {
  for (const locale of LOCALES) {
    const dir = path.join(CONTENT_BASE, contentType, locale);
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));

    // Group by title
    const titleMap = new Map(); // title → [{filePath, slug, fm, content}]
    for (const f of files) {
      const filePath = path.join(dir, f);
      try {
        const raw = fs.readFileSync(filePath, 'utf-8');
        const parsed = matter(raw);
        const title = parsed.data.title || '';
        const slug = f.replace('.mdx', '');
        if (!titleMap.has(title)) titleMap.set(title, []);
        titleMap.get(title).push({ filePath, slug, fm: parsed.data, content: parsed.content });
      } catch { /* skip */ }
    }

    // Fix duplicates — keep first, modify rest
    for (const [title, group] of titleMap) {
      if (group.length < 2) continue;

      // Sort by slug length (shorter = more canonical)
      group.sort((a, b) => a.slug.length - b.slug.length);

      for (let i = 1; i < group.length; i++) {
        const { filePath, slug, fm, content } = group[i];
        const slugWords = slugToWords(slug);

        // Strategy: replace the title with a version that includes the English slug as differentiator
        // Try inserting slug-based keyword after the prefix
        let newTitle = title;

        // For titles like "CV Job: Suffix" or "Lebenslauf Job: Suffix"
        // Insert the English slug name before the colon/suffix
        const colonIdx = title.indexOf(':');
        if (colonIdx > 0) {
          // Replace the job part with slug-derived name
          const prefix = title.substring(0, colonIdx);
          const suffix = title.substring(colonIdx);

          // Find the job name part (after common prefixes)
          const prefixPatterns = [
            /^(CV\s+)/i,
            /^(Curriculum Vitae\s+(?:da|di|de)?\s*)/i,
            /^(Lebenslauf\s+(?:als)?\s*)/i,
            /^(Currículum\s+(?:de)?\s*)/i,
            /^(Currículo\s+(?:de)?\s*)/i,
            /^(السيرة الذاتية\s*(?:ل)?)/,
            /^(이력서\s*)/,
            /^(履歴書\s*)/,
            /^(cv\s+)/i,
          ];

          let jobPart = prefix;
          let prefixPart = '';
          for (const pattern of prefixPatterns) {
            const m = prefix.match(pattern);
            if (m) {
              prefixPart = m[1];
              jobPart = prefix.substring(m[1].length);
              break;
            }
          }

          // Append English slug hint to differentiate
          if (jobPart.length > 0) {
            newTitle = `${prefixPart}${jobPart} (${slugWords})${suffix}`;
          } else {
            newTitle = `${prefix} (${slugWords})${suffix}`;
          }
        } else {
          // No colon — append slug hint
          newTitle = `${title} (${slugWords})`;
        }

        // Ensure title isn't too long (max 65 chars)
        if (newTitle.length > 65) {
          // Try shorter differentiator — just the last word of slug
          const lastWord = slug.split('-').pop();
          const lastWordCap = lastWord.charAt(0).toUpperCase() + lastWord.slice(1);
          if (colonIdx > 0) {
            const prefix = title.substring(0, colonIdx);
            const suffix = title.substring(colonIdx);
            newTitle = `${prefix} (${lastWordCap})${suffix}`;
          } else {
            newTitle = `${title} (${lastWordCap})`;
          }
        }

        // If still too long, just append a number
        if (newTitle.length > 65) {
          newTitle = `${title} (${i + 1})`;
        }

        // Skip if no change
        if (newTitle === title) continue;

        if (DRY_RUN) {
          console.log(`  [${locale}/${contentType}] ${slug}: "${title}" → "${newTitle}"`);
        } else {
          fm.title = newTitle;
          fs.writeFileSync(filePath, matter.stringify(content, fm));
        }
        totalFixed++;
      }
    }
  }
}

console.log(`\n${DRY_RUN ? '[DRY RUN] ' : ''}Total duplicate titles fixed: ${totalFixed}`);

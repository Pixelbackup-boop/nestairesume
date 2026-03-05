#!/usr/bin/env node
/**
 * Fix pages where tags[0] uses a hyphenated slug form (e.g., "dental-hygienist resume")
 * but tags[1] has the proper spaced search query (e.g., "dental hygienist resume").
 * Swaps tags[0] and tags[1] so the real search query is primary.
 */
import fs from 'fs';
import path from 'path';
import { createRequire } from 'node:module';

const rootDir = process.cwd();
const require2 = createRequire(path.join(rootDir, 'frontend', 'package.json'));
const matter = require2('gray-matter');

const dirs = [
  path.join(rootDir, 'frontend', 'content', 'resume-examples'),
  path.join(rootDir, 'frontend', 'content', 'blog'),
];

let fixed = 0;

for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.mdx'))) {
    const filePath = path.join(dir, f);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    if (!data.tags || data.tags.length < 2) continue;

    const tag0 = data.tags[0];
    const tag1 = data.tags[1];

    // Detect slug-form tags[0]: contains a hyphen in the job-title portion
    // Job-title portion = everything before " resume" or " cv"
    const jobPart = tag0.replace(/\s+(resume|cv|example|template).*$/, '').trim();
    if (!jobPart.includes('-')) continue;

    // Check if tags[1] is the same keyword but without hyphens
    const tag0Normalized = tag0.replace(/-/g, ' ').toLowerCase();
    const tag1Normalized = tag1.toLowerCase();

    // tags[1] should be similar to tags[0] but with spaces instead of hyphens
    if (tag0Normalized === tag1Normalized || tag1Normalized.startsWith(tag0Normalized.split(' ')[0])) {
      data.tags[0] = tag1;
      data.tags[1] = tag0;
      const rebuilt = matter.stringify(content, data);
      fs.writeFileSync(filePath, rebuilt);
      fixed++;
      console.log(`Fixed: ${f}  ${tag0} → ${tag1}`);
    }
  }
}

console.log(`\nTotal fixed: ${fixed}`);

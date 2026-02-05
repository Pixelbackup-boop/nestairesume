#!/usr/bin/env node
/**
 * Shorten Meta Descriptions to ≤160 characters
 * Preserves primary keyword and compelling copy while trimming to Google's display limit.
 */

import { createRequire } from 'node:module';
import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const require2 = createRequire(path.join(rootDir, 'frontend', 'package.json'));
const matter = require2('gray-matter');

const DIRS = [
  path.join(rootDir, 'frontend', 'content', 'resume-examples'),
  path.join(rootDir, 'frontend', 'content', 'blog'),
  path.join(rootDir, 'frontend', 'content', 'career-tips'),
];

const MAX_LEN = 158;
let updated = 0;
let skipped = 0;
let alreadyOk = 0;

function shortenDescription(desc, slug, jobTitle) {
  if (!desc || desc.length <= MAX_LEN) return null;

  // Strategy: try to cut at sentence boundary, then at phrase boundary
  // Keep the most important part (beginning) which has the keyword

  // Try cutting at last period within limit
  let shortened = desc;

  // First, remove common trailing phrases
  const trailingPhrases = [
    /\s*Free \d{4} guide with ATS tips\.?$/i,
    /\s*Free guide with ATS.+$/i,
    /\s*Free \d{4} guide.+$/i,
    /\s*Includes \d{4} salary data.+$/i,
    /\s*Includes? (?:free |ATS ).+$/i,
    /\s*Use our (?:free |AI ).+$/i,
    /\s*Download (?:free |our ).+$/i,
    /\s*Get (?:free |our |started).+$/i,
  ];

  for (const pattern of trailingPhrases) {
    const trimmed = shortened.replace(pattern, '');
    if (trimmed.length <= MAX_LEN && trimmed.length > 80) {
      return trimmed.endsWith('.') ? trimmed : trimmed + '.';
    }
  }

  // Try cutting at last sentence within limit
  const sentences = desc.split(/(?<=\.)\s+/);
  let result = '';
  for (const s of sentences) {
    if ((result + (result ? ' ' : '') + s).length <= MAX_LEN) {
      result += (result ? ' ' : '') + s;
    } else {
      break;
    }
  }

  if (result.length >= 80 && result.length <= MAX_LEN) {
    return result.endsWith('.') ? result : result + '.';
  }

  // Try cutting at comma or dash boundary
  const phrases = desc.split(/(?<=,)\s+|(?<=—)\s*|(?<=–)\s*/);
  result = '';
  for (const p of phrases) {
    if ((result + (result ? ' ' : '') + p).length <= MAX_LEN) {
      result += (result ? ' ' : '') + p;
    } else {
      break;
    }
  }

  if (result.length >= 80 && result.length <= MAX_LEN) {
    // Clean up trailing comma
    result = result.replace(/,\s*$/, '');
    return result.endsWith('.') ? result : result + '.';
  }

  // Last resort: hard truncate at word boundary
  const words = desc.split(/\s+/);
  result = '';
  for (const w of words) {
    if ((result + ' ' + w).length <= MAX_LEN - 3) {
      result += (result ? ' ' : '') + w;
    } else {
      break;
    }
  }

  // Remove trailing punctuation artifacts
  result = result.replace(/[,;:\-—–]\s*$/, '');
  return result.endsWith('.') ? result : result + '.';
}

for (const dir of DIRS) {
  if (!fs.existsSync(dir)) continue;

  for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.mdx'))) {
    const filePath = path.join(dir, f);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);

    if (!data.description || data.description.length <= MAX_LEN) {
      alreadyOk++;
      continue;
    }

    const newDesc = shortenDescription(
      data.description,
      data.slug || f.replace('.mdx', ''),
      data.jobTitle || data.title
    );

    if (!newDesc || newDesc.length > MAX_LEN) {
      console.log(`⚠ Could not shorten: ${f} (${data.description.length} chars)`);
      skipped++;
      continue;
    }

    data.description = newDesc;
    const newRaw = matter.stringify(content, data);
    fs.writeFileSync(filePath, newRaw);
    updated++;
  }
}

console.log(`\nDone: ${updated} descriptions shortened, ${alreadyOk} already OK, ${skipped} could not shorten`);

// Verify
let stillLong = 0;
for (const dir of DIRS) {
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.mdx'))) {
    const { data } = matter(fs.readFileSync(path.join(dir, f), 'utf-8'));
    if (data.description && data.description.length > MAX_LEN) {
      stillLong++;
      console.log(`Still long (${data.description.length}): ${f} — "${data.description}"`);
    }
  }
}
console.log(`\nVerification: ${stillLong} descriptions still over ${MAX_LEN} chars`);

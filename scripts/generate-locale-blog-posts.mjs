#!/usr/bin/env node
/**
 * Generate translated blog posts for a target locale.
 *
 * Usage:
 *   node scripts/generate-locale-blog-posts.mjs --lang de
 *   node scripts/generate-locale-blog-posts.mjs --lang ar --dry-run
 *   node scripts/generate-locale-blog-posts.mjs --lang ar --limit 5
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.resolve(__dirname, '../frontend/content/blog');

// ---------- CLI args ----------
const args = process.argv.slice(2);
const LANG = args.find((a, i) => args[i - 1] === '--lang') || '';
const DRY_RUN = args.includes('--dry-run');
const LIMIT = parseInt(args.find((a, i) => args[i - 1] === '--limit') || '0', 10);

if (!['de', 'ar', 'fr', 'ja', 'it', 'ko', 'th', 'vi', 'pt', 'tr'].includes(LANG)) {
  console.error('Usage: --lang de|ar|fr|ja|it|ko|th|vi|pt|tr  [--dry-run] [--limit N]');
  process.exit(1);
}

// ---------- YAML helper ----------
function yamlStr(s) {
  if (!s) return "''";
  if (/[:#\[\]{}|>&*!,?'"]/.test(s) || s.startsWith(' ') || s.endsWith(' ')) {
    return `'${s.replace(/'/g, "''")}'`;
  }
  return s;
}

function yamlMultiline(s) {
  return s.replace(/\n/g, '\n  ');
}

// ---------- Load language data ----------
async function main() {
  const langData = await import(`./locale-data/blog-${LANG}.mjs`);
  const { TOPICS, CONFIG } = langData;

  const outDir = path.join(BLOG_DIR, LANG);
  if (!DRY_RUN) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const topics = LIMIT > 0 ? TOPICS.slice(0, LIMIT) : TOPICS;
  let created = 0;
  let skipped = 0;
  let errors = 0;

  for (const topic of topics) {
    const outFile = path.join(outDir, `${topic.slug}.mdx`);

    // Skip if already exists
    if (fs.existsSync(outFile)) {
      skipped++;
      continue;
    }

    try {
      const mdx = generateMDX(topic, CONFIG);

      if (DRY_RUN) {
        console.log(`[DRY] Would create: ${LANG}/${topic.slug}.mdx (${topic.title})`);
      } else {
        fs.writeFileSync(outFile, mdx, 'utf-8');
      }
      created++;
    } catch (err) {
      console.error(`[ERROR] ${topic.slug}: ${err.message}`);
      errors++;
    }
  }

  console.log(`\n=== ${LANG.toUpperCase()} Blog Posts ===`);
  console.log(`Created: ${created}`);
  console.log(`Skipped (existing): ${skipped}`);
  console.log(`Errors: ${errors}`);
  console.log(`Total topics: ${topics.length}`);
}

function generateMDX(topic, config) {
  const {
    slug, title, description, category, tags, image, imageAlt,
    featured, postType, faq, body,
  } = topic;

  const author = config.author;
  const authorBio = config.authorBio;
  const date = config.date || '2026-02-26';

  // Build frontmatter
  let fm = '---\n';
  fm += `title: ${yamlStr(title)}\n`;
  fm += `slug: ${slug}\n`;
  fm += `description: >-\n  ${yamlMultiline(description)}\n`;
  fm += `date: '${date}'\n`;
  fm += `author: ${yamlStr(author)}\n`;
  fm += `authorBio: >-\n  ${yamlMultiline(authorBio)}\n`;
  fm += `category: ${yamlStr(category)}\n`;
  fm += `tags:\n`;
  for (const tag of tags) {
    fm += `  - ${yamlStr(tag)}\n`;
  }
  fm += `image: ${image || '/blog/ar-placeholder.jpg'}\n`;
  fm += `imageAlt: ${yamlStr(imageAlt || title)}\n`;
  fm += `featured: ${featured || false}\n`;
  if (postType) {
    fm += `postType: ${postType}\n`;
  }

  // FAQ
  if (faq && faq.length > 0) {
    fm += `faq:\n`;
    for (const item of faq) {
      fm += `  - question: ${yamlStr(item.question)}\n`;
      fm += `    answer: >-\n      ${yamlMultiline(item.answer)}\n`;
    }
  }

  fm += '---\n\n';

  return fm + body;
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

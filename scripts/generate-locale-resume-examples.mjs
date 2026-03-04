#!/usr/bin/env node
/**
 * Generates translated resume example MDX files for fr/de/ar.
 * Reads English source files for structure, then generates translated content
 * with keyword-optimized frontmatter and category-specific body templates.
 *
 * Usage:
 *   node scripts/generate-locale-resume-examples.mjs --lang fr [--dry-run] [--limit N]
 */
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const require2 = createRequire(path.join(rootDir, 'frontend', 'package.json'));
const matter = require2('gray-matter');

// ─── CLI args ────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const langIdx = args.indexOf('--lang');
if (langIdx === -1 || !args[langIdx + 1]) {
  console.error('Usage: node scripts/generate-locale-resume-examples.mjs --lang fr|de|ar [--dry-run] [--limit N]');
  process.exit(1);
}
const LANG = args[langIdx + 1];
const DRY_RUN = args.includes('--dry-run');
const limitArg = args.includes('--limit') ? parseInt(args[args.indexOf('--limit') + 1], 10) : null;

if (!['fr', 'de', 'ar', 'ja', 'it', 'ko', 'th', 'vi', 'pt', 'tr', 'id', 'nl', 'pl'].includes(LANG)) {
  console.error(`Unsupported language: ${LANG}. Use fr, de, ar, ja, it, ko, th, vi, pt, tr, id, nl, or pl.`);
  process.exit(1);
}

// ─── Paths ───────────────────────────────────────────────────────────────────
const EN_DIR = path.join(rootDir, 'frontend/content/resume-examples');
const OUT_DIR = path.join(EN_DIR, LANG);

if (!DRY_RUN && !fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// ─── Load language data ──────────────────────────────────────────────────────
const langData = await import(`./locale-data/resume-${LANG}.mjs`);

// ─── Helpers ─────────────────────────────────────────────────────────────────

function translateJobTitle(enTitle) {
  if (langData.JOB_TITLES[enTitle]) return langData.JOB_TITLES[enTitle];
  // Fallback: keep English title
  return enTitle;
}

function translateCategory(category) {
  return langData.CATEGORIES[category] || category;
}

/** Escape a YAML string value — wrap in single quotes if it contains special chars */
function yamlStr(str) {
  if (!str) return "''";
  if (/[:#\[\]{}&*!|>'"%@`]/.test(str) || str.includes("'")) {
    return "'" + str.replace(/'/g, "''") + "'";
  }
  return str;
}

// ─── Generate MDX ────────────────────────────────────────────────────────────

function generateMDX(enData) {
  const { slug, jobTitle: enJobTitle, category, keySkills, avgSalary, jobGrowth } = enData;
  const jobTitle = translateJobTitle(enJobTitle);
  const translatedCategory = translateCategory(category);
  const skills = keySkills || [];
  const date = new Date().toISOString().split('T')[0];

  const cfg = langData.CONFIG;
  const title = cfg.titlePattern(jobTitle);
  const description = cfg.descriptionPattern(jobTitle);
  const imageAlt = cfg.imageAltPattern(jobTitle);
  const tags = langData.generateTags(jobTitle, slug);
  const faq = langData.generateFAQ(jobTitle);
  const body = langData.generateBody(jobTitle, category, skills, avgSalary || '$50,000', jobGrowth || '+5%', slug);

  const frontmatter = `---
title: ${yamlStr(title)}
slug: ${slug}
description: >-
  ${description}
date: '${date}'
author: ${cfg.author}
authorBio: >-
  ${cfg.authorBio}
category: ${translatedCategory}
tags:
${tags.map(t => `  - ${t}`).join('\n')}
image: /images/resume-examples/${slug}.png
imageAlt: ${yamlStr(imageAlt)}
featured: false
jobTitle: ${yamlStr(jobTitle)}
avgSalary: '${avgSalary || '$50,000'}'
jobGrowth: ${jobGrowth || '+5%'}
keySkills:
${skills.slice(0, 8).map(s => `  - ${s}`).join('\n')}
faq:
${faq.map(f => `  - question: ${yamlStr(f.question)}
    answer: >-
      ${f.answer}`).join('\n')}
---`;

  return frontmatter + '\n' + body + '\n';
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🌐 Generating ${LANG.toUpperCase()} resume examples...\n`);

  const enFiles = fs.readdirSync(EN_DIR).filter(f => f.endsWith('.mdx'));
  const existing = fs.existsSync(OUT_DIR)
    ? new Set(fs.readdirSync(OUT_DIR).filter(f => f.endsWith('.mdx')).map(f => f.replace('.mdx', '')))
    : new Set();

  console.log(`📊 English source files: ${enFiles.length}`);
  console.log(`📊 Existing ${LANG}: ${existing.size}`);

  const toGenerate = [];
  for (const file of enFiles) {
    const slug = file.replace('.mdx', '');
    if (existing.has(slug)) continue;

    try {
      const raw = fs.readFileSync(path.join(EN_DIR, file), 'utf-8');
      const { data } = matter(raw);
      toGenerate.push({
        slug,
        jobTitle: data.jobTitle || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        category: data.category || 'Other',
        keySkills: data.keySkills || [],
        avgSalary: data.avgSalary || '$50,000',
        jobGrowth: data.jobGrowth || '+5%',
      });
    } catch (e) {
      console.error(`  ERROR reading ${file}: ${e.message}`);
    }
  }

  let files = toGenerate;
  if (limitArg && limitArg > 0) {
    files = files.slice(0, limitArg);
    console.log(`📉 Limited to first ${limitArg} files`);
  }

  console.log(`📝 Will generate ${files.length} ${LANG} resume examples...\n`);

  let created = 0;
  let errors = 0;
  const untranslated = [];

  for (const data of files) {
    try {
      const mdx = generateMDX(data);
      const outputPath = path.join(OUT_DIR, `${data.slug}.mdx`);

      if (DRY_RUN) {
        const translated = translateJobTitle(data.jobTitle);
        if (translated === data.jobTitle) untranslated.push(data.jobTitle);
        console.log(`  [DRY RUN] ${data.slug}.mdx → ${translated}`);
      } else {
        fs.writeFileSync(outputPath, mdx, 'utf-8');
        created++;
        if (created % 50 === 0) console.log(`  ✓ Generated ${created} files...`);
      }
    } catch (e) {
      console.error(`  ERROR generating ${data.slug}: ${e.message}`);
      errors++;
    }
  }

  console.log(`\n${'═'.repeat(50)}`);
  console.log(`  Language:   ${LANG}`);
  console.log(`  Generated:  ${DRY_RUN ? files.length + ' (dry run)' : created}`);
  if (errors) console.log(`  Errors:     ${errors}`);
  if (untranslated.length > 0) {
    console.log(`  ⚠️  Untranslated titles: ${untranslated.length}`);
    untranslated.forEach(t => console.log(`     - ${t}`));
  }
  console.log(`  Total ${LANG}: ${existing.size + (DRY_RUN ? 0 : created)}`);
  console.log(`${'═'.repeat(50)}\n`);
}

main().catch(console.error);

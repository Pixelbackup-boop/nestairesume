#!/usr/bin/env node

/**
 * Fix blog posts with fewer than 6 tags by adding relevant related tags.
 * Adds 2-3 tags based on existing tags and category.
 *
 * Usage: node scripts/fix-blog-tags.mjs [--dry-run]
 */

import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const require = createRequire(path.join(rootDir, 'frontend', 'package.json'));
const matter = require('gray-matter');

const DRY_RUN = process.argv.includes('--dry-run');
const MIN_TAGS = 6;

// Related tags pool by category
const categoryTags = {
  'Resume Tips': ['resume writing guide', 'resume format', 'professional resume', 'resume template', 'ats resume template', 'job application tips'],
  'Career Advice': ['career development', 'job search strategy', 'career tips 2026', 'professional growth', 'job hunting guide', 'career planning'],
  'Resume Design': ['resume layout', 'resume template design', 'visual resume', 'resume formatting tips', 'creative resume', 'professional resume design'],
  'AI Tools': ['AI resume builder', 'AI writing tools', 'resume automation', 'AI career tools', 'artificial intelligence resume', 'AI job search'],
  'Technical SEO': ['resume SEO', 'ATS optimization', 'resume parsing', 'applicant tracking system', 'resume keywords strategy', 'resume search optimization'],
  'Interview Preparation': ['interview tips', 'job interview guide', 'interview questions', 'interview preparation 2026', 'behavioral interview', 'interview success'],
  'Career Development': ['professional development', 'career growth', 'skill building', 'career advancement', 'professional skills', 'career strategy'],
  'Job Search': ['job search tips', 'job hunting', 'employment search', 'find jobs 2026', 'job application', 'job market'],
};

// Keyword-based related tags
const keywordRelated = {
  'ATS': ['ats resume template', 'applicant tracking system', 'ats optimization'],
  'resume': ['resume writing guide', 'professional resume', 'resume format'],
  'cover letter': ['cover letter template', 'cover letter writing tips', 'cover letter format'],
  'student': ['entry-level resume', 'new graduate resume', 'first job resume'],
  'career change': ['transferable skills resume', 'career pivot', 'career transition resume'],
  'LinkedIn': ['LinkedIn optimization', 'online presence', 'professional networking'],
  'salary': ['salary research', 'compensation guide', 'job offer negotiation'],
  'interview': ['interview preparation 2026', 'interview success tips', 'common interview questions'],
  'remote work': ['remote job resume', 'virtual work', 'flexible work resume'],
  'skills': ['resume skills section', 'key skills for resume', 'in-demand skills 2026'],
  'fonts': ['resume typography', 'resume readability', 'professional document design'],
  'action verbs': ['resume power words', 'achievement statements', 'resume bullet points'],
  'google docs': ['free resume tools', 'online resume builder', 'document templates'],
  'Indeed': ['job board optimization', 'online job search', 'job board resume tips'],
  'Japanese': ['international resume', 'Japan job market', 'rirekisho template'],
  'Word': ['Microsoft Office resume', 'resume file format', 'downloadable resume template'],
  'ChatGPT': ['AI resume writing', 'generative AI tools', 'AI productivity tools'],
  'fresher': ['graduate resume', 'campus placement resume', 'no experience resume'],
  'gaps': ['employment gaps explanation', 'career break resume', 'return to work resume'],
};

let fixed = 0;
let skipped = 0;

const dir = path.resolve(rootDir, 'frontend/content/blog');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);

  const tags = data.tags || [];
  if (tags.length >= MIN_TAGS) {
    skipped++;
    continue;
  }

  const needed = MIN_TAGS - tags.length;
  const existingLower = new Set(tags.map(t => t.toLowerCase()));
  const newTags = [];

  // 1. Add from keyword matches
  for (const tag of tags) {
    for (const [keyword, related] of Object.entries(keywordRelated)) {
      if (tag.toLowerCase().includes(keyword.toLowerCase())) {
        for (const r of related) {
          if (!existingLower.has(r.toLowerCase()) && !newTags.some(t => t.toLowerCase() === r.toLowerCase())) {
            newTags.push(r);
            existingLower.add(r.toLowerCase());
          }
          if (newTags.length >= needed) break;
        }
      }
      if (newTags.length >= needed) break;
    }
    if (newTags.length >= needed) break;
  }

  // 2. Add from category pool if still needed
  if (newTags.length < needed) {
    const pool = categoryTags[data.category] || categoryTags['Resume Tips'];
    for (const r of pool) {
      if (!existingLower.has(r.toLowerCase()) && !newTags.some(t => t.toLowerCase() === r.toLowerCase())) {
        newTags.push(r);
        existingLower.add(r.toLowerCase());
      }
      if (newTags.length >= needed) break;
    }
  }

  if (newTags.length === 0) {
    skipped++;
    continue;
  }

  data.tags = [...tags, ...newTags.slice(0, needed)];

  if (DRY_RUN) {
    console.log(`${file}: ${tags.length} -> ${data.tags.length} tags`);
    console.log(`  Added: ${newTags.slice(0, needed).join(', ')}`);
  } else {
    const updated = matter.stringify(content, data);
    fs.writeFileSync(filePath, updated, 'utf8');
    console.log(`${file}: added ${newTags.slice(0, needed).join(', ')}`);
  }
  fixed++;
}

console.log(`\n=== SUMMARY ===`);
console.log(`Fixed: ${fixed}`);
console.log(`Skipped: ${skipped}`);
if (DRY_RUN) console.log('This was a dry run.');

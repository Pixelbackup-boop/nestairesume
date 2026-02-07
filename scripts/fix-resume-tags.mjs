#!/usr/bin/env node
/**
 * Fix resume example pages with fewer than 6 tags by adding relevant related tags.
 * Also trims pages with more than 8 tags down to 8.
 *
 * Usage: node scripts/fix-resume-tags.mjs [--dry-run]
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
const MAX_TAGS = 8;

// Related tags pool by category
const categoryTags = {
  'Technology': ['resume writing guide', 'professional resume', 'ats resume template', 'resume format', 'tech resume tips', 'resume skills section'],
  'Healthcare': ['healthcare resume', 'professional resume', 'ats resume template', 'resume writing guide', 'medical resume tips', 'clinical resume format'],
  'Education': ['education resume', 'professional resume', 'ats resume template', 'resume writing guide', 'teaching resume tips', 'academic resume format'],
  'Business': ['business resume', 'professional resume', 'ats resume template', 'resume writing guide', 'corporate resume tips', 'resume format'],
  'Finance': ['finance resume', 'professional resume', 'ats resume template', 'resume writing guide', 'accounting resume tips', 'resume format'],
  'Sales': ['sales resume', 'professional resume', 'ats resume template', 'resume writing guide', 'sales resume tips', 'resume format'],
  'Marketing': ['marketing resume', 'professional resume', 'ats resume template', 'resume writing guide', 'digital marketing resume', 'resume format'],
  'Legal': ['legal resume', 'professional resume', 'ats resume template', 'resume writing guide', 'law resume tips', 'resume format'],
  'Creative': ['creative resume', 'professional resume', 'ats resume template', 'resume writing guide', 'portfolio resume tips', 'resume format'],
  'Design': ['design resume', 'professional resume', 'ats resume template', 'resume writing guide', 'creative resume tips', 'resume format'],
  'Hospitality': ['hospitality resume', 'professional resume', 'ats resume template', 'resume writing guide', 'service industry resume', 'resume format'],
  'Food Service': ['food service resume', 'professional resume', 'ats resume template', 'resume writing guide', 'restaurant resume tips', 'resume format'],
  'Customer Service': ['customer service resume', 'professional resume', 'ats resume template', 'resume writing guide', 'service resume tips', 'resume format'],
  'Trades': ['trades resume', 'professional resume', 'ats resume template', 'resume writing guide', 'skilled trades resume', 'resume format'],
  'Construction': ['construction resume', 'professional resume', 'ats resume template', 'resume writing guide', 'trades resume tips', 'resume format'],
  'Maintenance': ['maintenance resume', 'professional resume', 'ats resume template', 'resume writing guide', 'technical resume tips', 'resume format'],
  'Cleaning': ['cleaning resume', 'professional resume', 'ats resume template', 'resume writing guide', 'service resume tips', 'resume format'],
  'Government': ['government resume', 'professional resume', 'ats resume template', 'resume writing guide', 'federal resume tips', 'resume format'],
  'Public Safety': ['public safety resume', 'professional resume', 'ats resume template', 'resume writing guide', 'government resume tips', 'resume format'],
  'Transportation': ['transportation resume', 'professional resume', 'ats resume template', 'resume writing guide', 'logistics resume tips', 'resume format'],
  'Sports & Fitness': ['fitness resume', 'professional resume', 'ats resume template', 'resume writing guide', 'sports resume tips', 'resume format'],
  'Beauty & Wellness': ['wellness resume', 'professional resume', 'ats resume template', 'resume writing guide', 'beauty industry resume', 'resume format'],
  'Animal Care': ['animal care resume', 'professional resume', 'ats resume template', 'resume writing guide', 'veterinary resume tips', 'resume format'],
};

// Keyword-based related tags
const keywordRelated = {
  'engineer': ['engineering resume', 'technical resume', 'stem resume tips'],
  'developer': ['developer resume', 'tech resume tips', 'programming resume'],
  'manager': ['management resume', 'leadership resume', 'resume for managers'],
  'analyst': ['analyst resume', 'data resume tips', 'analytical resume'],
  'nurse': ['nursing resume', 'clinical resume', 'healthcare resume tips'],
  'teacher': ['teaching resume', 'education resume', 'academic resume'],
  'assistant': ['administrative resume', 'entry-level resume', 'office resume tips'],
  'technician': ['technical resume', 'skilled trades resume', 'certification resume'],
  'specialist': ['specialist resume', 'professional resume tips', 'industry resume'],
  'coordinator': ['coordinator resume', 'project management resume', 'organizational resume'],
  'director': ['executive resume', 'leadership resume', 'director resume tips'],
  'chef': ['culinary resume', 'restaurant resume', 'food industry resume'],
  'sales': ['sales resume tips', 'revenue-focused resume', 'sales achievements resume'],
  'design': ['design portfolio resume', 'creative resume tips', 'visual resume'],
  'counsel': ['counseling resume', 'social services resume', 'client-facing resume'],
  'intern': ['entry-level resume', 'internship resume', 'student resume tips'],
};

const dir = path.resolve(rootDir, 'frontend/content/resume-examples');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));

let addedTags = 0;
let trimmedTags = 0;
let skipped = 0;

for (const file of files) {
  const filePath = path.join(dir, file);
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);

  const tags = data.tags || [];

  // Handle under-tagged files
  if (tags.length < MIN_TAGS) {
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
      const pool = categoryTags[data.category] || categoryTags['Technology'] || ['professional resume', 'ats resume template', 'resume writing guide', 'resume format', 'resume tips 2026', 'job application tips'];
      for (const r of pool) {
        if (!existingLower.has(r.toLowerCase()) && !newTags.some(t => t.toLowerCase() === r.toLowerCase())) {
          newTags.push(r);
          existingLower.add(r.toLowerCase());
        }
        if (newTags.length >= needed) break;
      }
    }

    if (newTags.length > 0) {
      data.tags = [...tags, ...newTags.slice(0, needed)];
      if (DRY_RUN) {
        console.log(`${file}: ${tags.length} → ${data.tags.length} tags (added: ${newTags.slice(0, needed).join(', ')})`);
      } else {
        const updated = matter.stringify(content, data);
        fs.writeFileSync(filePath, updated, 'utf8');
      }
      addedTags++;
      continue;
    }
  }

  // Handle over-tagged files
  if (tags.length > MAX_TAGS) {
    // Keep the first 8 tags (they tend to be the most relevant)
    data.tags = tags.slice(0, MAX_TAGS);
    if (DRY_RUN) {
      console.log(`${file}: ${tags.length} → ${data.tags.length} tags (trimmed)`);
    } else {
      const updated = matter.stringify(content, data);
      fs.writeFileSync(filePath, updated, 'utf8');
    }
    trimmedTags++;
    continue;
  }

  skipped++;
}

console.log(`\n=== SUMMARY ===`);
console.log(`Tags added (under 6): ${addedTags}`);
console.log(`Tags trimmed (over 8): ${trimmedTags}`);
console.log(`Skipped (OK): ${skipped}`);
if (DRY_RUN) console.log('This was a dry run.');

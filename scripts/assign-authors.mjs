#!/usr/bin/env node
/**
 * Assigns authors to resume example pages based on their category.
 * Each author covers specific industry categories.
 */

import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const require = createRequire(path.join(rootDir, 'frontend', 'package.json'));
const matter = require('gray-matter');

const CONTENT_DIR = path.join(rootDir, 'frontend/content/resume-examples');

// Category → Author mapping (matches posts.ts AUTHORS.categories)
const CATEGORY_AUTHOR = {
  // Alex Brown – HR & Resume Strategist
  "HR": "Alex Brown",
  "Administrative": "Alex Brown",
  "Education": "Alex Brown",
  "Entry-Level": "Alex Brown",
  "Social Services": "Alex Brown",
  "Legal": "Alex Brown",
  "Law Enforcement": "Alex Brown",

  // Ken Coleman – Career Coach & Bestselling Author
  "Business": "Ken Coleman",
  "Management": "Ken Coleman",
  "Consulting": "Ken Coleman",
  "Sales": "Ken Coleman",
  "Marketing": "Ken Coleman",
  "Finance": "Ken Coleman",
  "Insurance": "Ken Coleman",
  "Real Estate": "Ken Coleman",
  "Events": "Ken Coleman",

  // Jason M. Hill – Recruiter & Career Strategist (Tech/Engineering)
  "Technology": "Jason M. Hill",
  "Engineering": "Jason M. Hill",
  "Science": "Jason M. Hill",
  "Research": "Jason M. Hill",

  // Sarah Sutton – Remote Work & Career Expert
  "Customer Service": "Sarah Sutton",
  "Retail": "Sarah Sutton",
  "Logistics": "Sarah Sutton",
  "Supply Chain": "Sarah Sutton",
  "Transportation": "Sarah Sutton",
  "Automotive": "Sarah Sutton",
  "Aviation": "Sarah Sutton",
  "Maritime": "Sarah Sutton",

  // Anna Papalia – Interview Coach & Career Influencer
  "Healthcare": "Anna Papalia",
  "Creative": "Anna Papalia",
  "Hospitality": "Anna Papalia",
  "Fitness": "Anna Papalia",
  "Beauty": "Anna Papalia",
  "Entertainment": "Anna Papalia",
  "Animal Care": "Anna Papalia",
  "Childcare": "Anna Papalia",
  "Trades": "Anna Papalia",
  "Manufacturing": "Anna Papalia",
  "Construction": "Anna Papalia",
  "Architecture": "Anna Papalia",
  "Security": "Anna Papalia",
  "Media": "Anna Papalia",
};

const DEFAULT_AUTHOR = "Alex Brown";

// Run
const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.mdx'));
console.log(`Assigning authors to ${files.length} files...\n`);

const authorCounts = {};
let changed = 0;

for (const file of files) {
  const filePath = path.join(CONTENT_DIR, file);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  const category = data.category || 'General';
  const newAuthor = CATEGORY_AUTHOR[category] || DEFAULT_AUTHOR;

  if (data.author !== newAuthor) {
    data.author = newAuthor;
    const newFileContent = matter.stringify(content, data);
    fs.writeFileSync(filePath, newFileContent, 'utf-8');
    changed++;
  }

  authorCounts[newAuthor] = (authorCounts[newAuthor] || 0) + 1;
}

console.log(`\n✅ Assigned authors to ${files.length} pages (${changed} changed).\n`);
console.log('Distribution:');
Object.entries(authorCounts)
  .sort((a, b) => b[1] - a[1])
  .forEach(([author, count]) => console.log(`  ${author}: ${count} pages`));

/**
 * SEO Fix Script - Pass 4: Remove duplicate format section headings
 * The old "Choosing the right resume format is critical for X roles:" line
 * remained when the bullet points were replaced with new category-specific tips.
 * Run: node scripts/fix-resume-seo-pass4.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const EXAMPLES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'resume-examples');

const files = fs.readdirSync(EXAMPLES_DIR).filter(f => f.endsWith('.mdx')).sort();
console.log(`\nPass 4: Removing duplicate format section headings...\n`);

let fixed = 0;

for (const file of files) {
  const filePath = path.join(EXAMPLES_DIR, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Pattern: old heading line followed by new heading line
  // "Choosing the right resume format is critical for X roles:\n<new category-specific intro>"
  const duplicatePattern = /Choosing the right resume format is critical for .+ roles:\n(Choosing the right resume format matters|Financial services hiring follows|The resume format you choose|Creative roles like|Hospitality hiring moves|Sales hiring is|Administrative hiring focuses|Engineering resumes for|Education sector resumes|Transportation and logistics|Marketing resumes for|Legal sector resumes|HR resumes for|Real estate resumes|Here is how to format|Scientific resumes for|Food service hiring|Management resumes for|Security and law enforcement)/;

  if (duplicatePattern.test(content)) {
    content = content.replace(/Choosing the right resume format is critical for .+ roles:\n/, '');
    fs.writeFileSync(filePath, content, 'utf-8');
    fixed++;
  }

  // Also catch: "Use the right resume format to brew up..." and similar custom old headings
  // followed by new tips
  const altDuplicate = /Use the right resume format to .+:\n\n(Choosing|Financial|The resume|Creative|Hospitality|Sales|Administrative|Engineering|Education|Transportation|Marketing|Legal|HR |Real estate|Here is|Scientific|Food service|Management|Security)/;
  if (altDuplicate.test(content)) {
    content = content.replace(/Use the right resume format to .+:\n\n/, '');
    fs.writeFileSync(filePath, content, 'utf-8');
    fixed++;
  }
}

console.log(`✅ Pass 4 complete: ${fixed} duplicate headings removed`);

// Verify
let remaining = 0;
for (const file of files) {
  const filePath = path.join(EXAMPLES_DIR, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const count = (content.match(/Choosing the right resume format/g) || []).length;
  if (count > 1) remaining++;
}
console.log(`   Files still with duplicate: ${remaining}`);

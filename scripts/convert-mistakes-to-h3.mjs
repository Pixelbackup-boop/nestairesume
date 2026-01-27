#!/usr/bin/env node
/**
 * Converts "Common Mistakes to Avoid" sections from numbered lists to H3 headings.
 *
 * Before: 1. **Listing every technology** — Focus on relevant skills for the job
 * After:  ### Listing every technology
 *         Focus on relevant skills for the job
 *
 * This improves AI extractability — each mistake becomes a discrete semantic entity
 * that Google's AI Overviews and LLMs can cite independently.
 */

import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const RESUME_EXAMPLES_DIR = join(process.cwd(), 'frontend/content/resume-examples');

async function convertFile(filePath) {
  const content = await readFile(filePath, 'utf-8');

  // Find the "Common Mistakes to Avoid" section
  const sectionRegex = /^## Common Mistakes to Avoid\n\n([\s\S]*?)(?=\n## |\n---|\Z)/m;
  const match = content.match(sectionRegex);

  if (!match) {
    return { file: filePath, status: 'no-section' };
  }

  const sectionBody = match[1];

  // Check if already converted (has ### headings instead of numbered items)
  if (sectionBody.includes('### ')) {
    return { file: filePath, status: 'already-converted' };
  }

  // Check if it uses numbered list pattern
  if (!/^\d+\.\s+\*\*/m.test(sectionBody)) {
    return { file: filePath, status: 'unknown-format' };
  }

  // Convert numbered items to H3 headings
  // Pattern: 1. **Bold text** — rest of the explanation
  // Also handles: 1. **Bold text** - rest (with hyphen instead of em-dash)
  const convertedBody = sectionBody.replace(
    /^\d+\.\s+\*\*(.+?)\*\*\s*(?:—|[-–])\s*(.+)$/gm,
    (_, title, explanation) => {
      return `### ${title.trim()}\n\n${explanation.trim()}`;
    }
  );

  if (convertedBody === sectionBody) {
    return { file: filePath, status: 'no-changes' };
  }

  const newContent = content.replace(sectionBody, convertedBody);
  await writeFile(filePath, newContent, 'utf-8');

  return { file: filePath, status: 'converted' };
}

async function main() {
  const files = await readdir(RESUME_EXAMPLES_DIR);
  const mdxFiles = files.filter(f => f.endsWith('.mdx')).sort();

  console.log(`Found ${mdxFiles.length} MDX files\n`);

  const results = { converted: 0, 'no-section': 0, 'already-converted': 0, 'unknown-format': 0, 'no-changes': 0 };
  const issues = [];

  for (const file of mdxFiles) {
    const filePath = join(RESUME_EXAMPLES_DIR, file);
    const result = await convertFile(filePath);
    results[result.status]++;

    if (result.status === 'unknown-format' || result.status === 'no-changes') {
      issues.push(result);
    }
  }

  console.log('Results:');
  console.log(`  Converted:         ${results.converted}`);
  console.log(`  Already converted: ${results['already-converted']}`);
  console.log(`  No section found:  ${results['no-section']}`);
  console.log(`  Unknown format:    ${results['unknown-format']}`);
  console.log(`  No changes made:   ${results['no-changes']}`);

  if (issues.length > 0) {
    console.log('\nFiles needing manual review:');
    issues.forEach(i => console.log(`  [${i.status}] ${i.file}`));
  }
}

main().catch(console.error);

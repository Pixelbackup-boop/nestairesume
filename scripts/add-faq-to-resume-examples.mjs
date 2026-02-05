#!/usr/bin/env node

/**
 * Adds FAQ frontmatter to all resume example MDX files.
 * Generates 5 contextual "People Also Ask" questions per job title.
 *
 * This script handles both:
 * - Clean files (no FAQ yet) — adds FAQ
 * - Corrupted files (from prior run with $ regex bug) — cleans up and re-adds
 *
 * Usage: node scripts/add-faq-to-resume-examples.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, '../frontend/content/resume-examples');

function generateFAQ(jobTitle, keySkills, avgSalary, jobGrowth) {
  const skillsList = keySkills.slice(0, 5).join(', ');
  const salary = avgSalary || 'competitive pay';
  const growth = jobGrowth || 'steady growth';

  return [
    {
      question: `What skills should I put on a ${jobTitle} resume?`,
      answer: `Key skills for a ${jobTitle} resume include ${skillsList}. List both technical and soft skills relevant to the job description. Place your strongest and most relevant skills near the top of your skills section for maximum ATS visibility.`,
    },
    {
      question: `How long should a ${jobTitle} resume be?`,
      answer: `A ${jobTitle} resume should be one page for candidates with less than 5 years of experience, and up to two pages for senior professionals. Focus on relevant achievements and quantifiable results rather than listing every responsibility.`,
    },
    {
      question: `What is the best resume format for a ${jobTitle}?`,
      answer: `The reverse-chronological format works best for most ${jobTitle} candidates because it highlights career progression. If you're changing careers, consider a combination format that leads with relevant skills. Always use a clean, ATS-friendly layout.`,
    },
    {
      question: `How much does a ${jobTitle} make?`,
      answer: `The average ${jobTitle} salary is approximately ${salary}, with ${growth} projected job growth. Salaries vary based on location, experience level, industry, and company size. Include quantifiable achievements on your resume to negotiate higher compensation.`,
    },
    {
      question: `What should I include in my ${jobTitle} resume?`,
      answer: `A strong ${jobTitle} resume should include a compelling professional summary, a skills section with ${skillsList}, detailed work experience with quantified achievements, relevant education, and certifications. Tailor each section to match the specific job description you are applying for.`,
    },
  ];
}

function formatFAQYaml(faq) {
  let yaml = 'faq:\n';
  for (const item of faq) {
    const q = item.question.replace(/"/g, '\\"');
    const a = item.answer.replace(/"/g, '\\"');
    yaml += `  - question: "${q}"\n`;
    yaml += `    answer: "${a}"\n`;
  }
  return yaml;
}

/**
 * Extracts clean frontmatter and content from a file that may be corrupted.
 * The corruption pattern: $ in salary values was treated as regex backreference,
 * causing frontmatter duplication inside FAQ answer text.
 *
 * Strategy: Extract original frontmatter lines (before `faq:`), then find the
 * markdown content after the last `---` delimiter.
 */
function extractCleanParts(fileContent) {
  const lines = fileContent.split('\n');

  // Find the opening ---
  if (lines[0] !== '---') {
    return null;
  }

  // Collect original frontmatter lines (everything between first --- and faq: or second ---)
  const frontmatterLines = [];
  let i = 1;
  while (i < lines.length) {
    const line = lines[i];
    if (line === '---' || line.startsWith('faq:')) {
      break;
    }
    frontmatterLines.push(line);
    i++;
  }

  // Find the LAST occurrence of a line that is exactly "---"
  // This is where the content body starts
  let lastDashIndex = -1;
  for (let j = lines.length - 1; j >= 1; j--) {
    if (lines[j] === '---') {
      lastDashIndex = j;
      break;
    }
  }

  if (lastDashIndex === -1) {
    return null;
  }

  const contentBody = lines.slice(lastDashIndex + 1).join('\n');
  const cleanFrontmatter = frontmatterLines.join('\n');

  return { cleanFrontmatter, contentBody };
}

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');

  // Extract clean parts (handles both clean and corrupted files)
  const parts = extractCleanParts(content);
  if (!parts) {
    return { error: true, file: path.basename(filePath), reason: 'Could not parse' };
  }

  const { cleanFrontmatter, contentBody } = parts;

  // Extract fields from clean frontmatter
  const jobTitleMatch = cleanFrontmatter.match(/jobTitle:\s*"([^"]+)"/);
  const keySkillsMatch = cleanFrontmatter.match(/keySkills:\s*\[([^\]]+)\]/);
  const avgSalaryMatch = cleanFrontmatter.match(/avgSalary:\s*"([^"]+)"/);
  const jobGrowthMatch = cleanFrontmatter.match(/jobGrowth:\s*"([^"]+)"/);

  const jobTitle = jobTitleMatch?.[1] || 'Professional';
  const keySkills = keySkillsMatch
    ? keySkillsMatch[1].match(/"([^"]+)"/g)?.map(s => s.replace(/"/g, '')) || []
    : [];
  const avgSalary = avgSalaryMatch?.[1];
  const jobGrowth = jobGrowthMatch?.[1];

  const faq = generateFAQ(jobTitle, keySkills, avgSalary, jobGrowth);
  const faqYaml = formatFAQYaml(faq);

  // Build the file using string concatenation (no regex replacement)
  const updatedContent = `---\n${cleanFrontmatter}\n${faqYaml}---${contentBody}`;

  fs.writeFileSync(filePath, updatedContent, 'utf-8');
  return { success: true, file: path.basename(filePath), jobTitle };
}

// Main
const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.mdx'));
console.log(`Found ${files.length} resume example files\n`);

let success = 0;
let errors = 0;

for (const file of files) {
  const result = processFile(path.join(CONTENT_DIR, file));
  if (result.success) {
    success++;
    if (success <= 5 || success % 50 === 0) {
      console.log(`  [${success}] ${result.file} (${result.jobTitle})`);
    }
  } else {
    errors++;
    console.log(`  ERROR: ${result.file} - ${result.reason}`);
  }
}

console.log(`\nDone! ${success} updated, ${errors} errors`);

#!/usr/bin/env node

/**
 * Fix meta descriptions to be 150-160 characters.
 *
 * Problems:
 * - 365 resume examples: too short (~100 chars)
 * - 481 cover letter examples: too long (~170 chars)
 * - 36 blog posts: too short (~95 chars)
 *
 * Strategy:
 * - Resume examples: Build unique descriptions from tags[0] + keySkills + category
 * - Cover letters: Trim the template while preserving keySkills mention
 * - Blog posts: Expand with more detail from tags
 *
 * Usage: node scripts/fix-meta-descriptions.mjs [--dry-run]
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
const MIN_LEN = 150;
const MAX_LEN = 160;

let stats = { resumeFixed: 0, coverFixed: 0, blogFixed: 0, skipped: 0, errors: 0 };

function titleCase(str) {
  return str.replace(/\b\w/g, c => c.toUpperCase());
}

function getJobTitle(data, slug) {
  if (data.jobTitle) return data.jobTitle;
  // Derive from slug: "software-engineer" -> "Software Engineer"
  return titleCase(slug.replace(/-/g, ' '));
}

function pickSkills(keySkills, count = 2) {
  if (!keySkills || keySkills.length === 0) return [];
  // Pick the first few skills (they tend to be the most important)
  return keySkills.slice(0, count);
}

function buildResumeDescription(data, slug) {
  const jobTitle = getJobTitle(data, slug);
  const skills = pickSkills(data.keySkills, 3);
  const keyword = data.tags?.[0] || `${jobTitle.toLowerCase()} resume`;
  const category = data.category || '';

  // Ensure tags[0] words appear in description (CLAUDE.md requirement)
  const keywordWords = keyword.toLowerCase().split(/\s+/);

  // Try multiple templates, picking the first that fits 150-160
  const candidates = [];

  if (skills.length >= 3) {
    candidates.push(`${jobTitle} resume example with ATS-friendly templates for 2026. Highlight ${skills[0].toLowerCase()}, ${skills[1].toLowerCase()}, and ${skills[2].toLowerCase()} to impress hiring managers.`);
  }
  if (skills.length >= 2) {
    candidates.push(`${jobTitle} resume example with ATS-friendly templates for 2026. Highlight ${skills[0].toLowerCase()}, ${skills[1].toLowerCase()}, and more to stand out to hiring managers.`);
    candidates.push(`${jobTitle} resume example with ATS-friendly templates for 2026. Showcase your ${skills[0].toLowerCase()} and ${skills[1].toLowerCase()} expertise.`);
  }
  if (skills.length >= 1) {
    candidates.push(`${jobTitle} resume example with ATS-friendly templates for 2026. Highlight your ${skills[0].toLowerCase()} skills with expert tips and real examples.`);
  }
  candidates.push(`${jobTitle} resume example with ATS-friendly templates and expert writing tips for 2026. Professional format, key skills, and real examples to land interviews.`);
  candidates.push(`${jobTitle} resume example for 2026 with ATS-optimized templates. Professional format advice, key skills, and expert writing tips to land ${category.toLowerCase()} interviews.`);
  candidates.push(`${jobTitle} resume example with ATS-friendly templates for 2026. Expert writing tips, professional format advice, and real examples to help you land more interviews.`);

  // Pick the first candidate that fits in range
  for (const desc of candidates) {
    if (desc.length >= MIN_LEN && desc.length <= MAX_LEN) {
      // Verify tags[0] words
      if (verifyKeyword(desc, keywordWords)) return desc;
    }
  }

  // If none fit exactly, find the closest to 155 chars that passes keyword check
  let best = candidates[0];
  let bestDist = Math.abs(candidates[0].length - 155);
  for (const desc of candidates) {
    const dist = Math.abs(desc.length - 155);
    if (dist < bestDist) {
      best = desc;
      bestDist = dist;
    }
  }

  // Trim if over
  if (best.length > MAX_LEN) {
    const lastSpace = best.lastIndexOf(' ', MAX_LEN - 2);
    if (lastSpace > MIN_LEN - 10) {
      best = best.slice(0, lastSpace) + '.';
    }
  }

  if (!verifyKeyword(best, keywordWords)) return null;

  return best;
}

function verifyKeyword(desc, keywordWords) {
  const descLower = desc.toLowerCase();
  const missingWords = keywordWords.filter(w => !descLower.includes(w));
  const trulyMissing = missingWords.filter(w => w !== 'resume' && w !== 'example');
  return trulyMissing.length === 0;
}

function buildCoverLetterDescription(data, slug) {
  const jobTitle = getJobTitle(data, slug);
  const skills = pickSkills(data.keySkills, 3);
  const category = data.category || '';

  // Try multiple templates in order of preference, picking the first that fits 150-160
  const candidates = [];

  if (skills.length >= 2) {
    candidates.push(`${jobTitle} cover letter example for 2026. Show hiring managers your ${skills[0].toLowerCase()} and ${skills[1].toLowerCase()} expertise.`);
    candidates.push(`${jobTitle} cover letter example with templates for 2026. Showcase your ${skills[0].toLowerCase()} and ${skills[1].toLowerCase()} skills.`);
  }
  if (skills.length >= 3) {
    candidates.push(`${jobTitle} cover letter example for 2026. Highlight your ${skills[0].toLowerCase()}, ${skills[1].toLowerCase()}, and ${skills[2].toLowerCase()} expertise.`);
  }
  if (skills.length >= 1) {
    candidates.push(`${jobTitle} cover letter example with expert writing tips for 2026. Stand out to hiring managers with your ${skills[0].toLowerCase()} expertise.`);
    candidates.push(`Professional ${jobTitle.toLowerCase()} cover letter example for 2026. Expert templates and tips to highlight your ${skills[0].toLowerCase()} skills and land interviews.`);
  }
  candidates.push(`${jobTitle} cover letter example with professional templates and expert writing tips for 2026. Stand out to hiring managers and land more interviews.`);
  candidates.push(`Professional ${jobTitle.toLowerCase()} cover letter example for 2026. ATS-friendly templates, expert writing tips, and proven strategies to land ${category.toLowerCase()} interviews.`);
  candidates.push(`${jobTitle} cover letter example for 2026 with ATS-friendly templates. Professional writing tips and proven strategies to impress hiring managers and land interviews.`);

  // Pick the first candidate that fits in range
  for (const desc of candidates) {
    if (desc.length >= MIN_LEN && desc.length <= MAX_LEN) return desc;
  }

  // If none fit exactly, find the closest to 155 chars
  let best = candidates[0];
  let bestDist = Math.abs(candidates[0].length - 155);
  for (const desc of candidates) {
    const dist = Math.abs(desc.length - 155);
    if (dist < bestDist) {
      best = desc;
      bestDist = dist;
    }
  }

  // Trim if over
  if (best.length > MAX_LEN) {
    const lastSpace = best.lastIndexOf(' ', MAX_LEN - 2);
    if (lastSpace > MIN_LEN - 10) {
      best = best.slice(0, lastSpace) + '.';
    }
  }

  return best;
}

function processFile(filePath, type) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(raw);

    if (!data.description) return;

    const currentLen = data.description.length;

    // Skip if already in range
    if (currentLen >= MIN_LEN && currentLen <= MAX_LEN) {
      stats.skipped++;
      return;
    }

    const slug = data.slug || path.basename(filePath, '.mdx');
    let newDesc;

    if (type === 'resume') {
      newDesc = buildResumeDescription(data, slug);
    } else if (type === 'cover-letter') {
      newDesc = buildCoverLetterDescription(data, slug);
    } else {
      // Blog: skip for now (only 36, need manual expansion)
      stats.skipped++;
      return;
    }

    if (!newDesc) {
      stats.skipped++;
      return;
    }

    // Don't replace if new description is also out of range
    if (newDesc.length < MIN_LEN || newDesc.length > MAX_LEN) {
      if (!DRY_RUN) {
        console.log(`  WARN: ${slug} generated ${newDesc.length} chars: "${newDesc}"`);
      }
      // Still write it if it's closer to target than current
      if (Math.abs(newDesc.length - 155) >= Math.abs(currentLen - 155)) {
        stats.skipped++;
        return;
      }
    }

    if (DRY_RUN) {
      console.log(`[${type}] ${slug}: ${currentLen} -> ${newDesc.length} chars`);
      console.log(`  OLD: "${data.description}"`);
      console.log(`  NEW: "${newDesc}"`);
      console.log();
    } else {
      data.description = newDesc;
      const updated = matter.stringify(content, data);
      fs.writeFileSync(filePath, updated, 'utf8');
    }

    if (type === 'resume') stats.resumeFixed++;
    else if (type === 'cover-letter') stats.coverFixed++;
    else stats.blogFixed++;

  } catch (err) {
    console.error(`ERROR: ${filePath}: ${err.message}`);
    stats.errors++;
  }
}

function processDirectory(dir, type) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));
  console.log(`\nProcessing ${files.length} ${type} files in ${dir}...`);

  for (const file of files) {
    processFile(path.join(dir, file), type);
  }
}

const baseDir = path.resolve(process.cwd(), 'frontend/content');

// Check if we're already in frontend/
const altBaseDir = path.resolve(process.cwd(), 'content');
const contentDir = fs.existsSync(baseDir) ? baseDir : altBaseDir;

console.log(`${DRY_RUN ? '=== DRY RUN ===' : '=== WRITING FILES ==='}`);
console.log(`Content dir: ${contentDir}`);

processDirectory(path.join(contentDir, 'resume-examples'), 'resume');
processDirectory(path.join(contentDir, 'cover-letter-examples'), 'cover-letter');

console.log('\n=== SUMMARY ===');
console.log(`Resume descriptions fixed: ${stats.resumeFixed}`);
console.log(`Cover letter descriptions fixed: ${stats.coverFixed}`);
console.log(`Blog descriptions fixed: ${stats.blogFixed}`);
console.log(`Skipped (already OK or manual): ${stats.skipped}`);
console.log(`Errors: ${stats.errors}`);

if (DRY_RUN) {
  console.log('\nThis was a dry run. Run without --dry-run to apply changes.');
}

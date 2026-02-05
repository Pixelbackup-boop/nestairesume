#!/usr/bin/env node
/**
 * Shorten titles to ≤60 chars while PRESERVING target keywords.
 * Rule: tags[0] keyword must appear in the final title. Never remove it.
 */
import { createRequire } from 'node:module';
import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const require2 = createRequire(path.join(rootDir, 'frontend', 'package.json'));
const matter = require2('gray-matter');

const MAX_LEN = 60;

const DIRS = [
  path.join(rootDir, 'frontend', 'content', 'resume-examples'),
  path.join(rootDir, 'frontend', 'content', 'blog'),
  path.join(rootDir, 'frontend', 'content', 'career-tips'),
];

// Manual overrides for blog posts (each is unique)
const BLOG_TITLE_OVERRIDES = {
  'resume-builder-word-template.mdx': 'Resume Builder for Word: Templates & Tips (2026)',
  'japanese-resume-maker.mdx': 'Japanese Resume (Rirekisho) Guide: Format & Tips (2026)',
  'linkedin-profile-optimization.mdx': 'LinkedIn Profile Optimization: Get Noticed (2026)',
  'resume-keywords-by-industry.mdx': 'Resume Keywords by Industry: 500+ ATS-Friendly Words',
  'how-to-list-skills-on-resume.mdx': 'How to List Skills on a Resume: Examples (2026)',
  'indeed-resume-tips.mdx': 'Indeed Resume Tips: Optimize Your Profile (2026)',
  'how-to-list-projects-on-resume.mdx': 'How to List Projects on a Resume (With Examples)',
  'what-is-ats-guide.mdx': 'What Is an ATS? Applicant Tracking Systems Guide',
  'chronological-resume-format.mdx': 'Chronological Resume Format: Guide & Examples (2026)',
  'how-to-write-professional-summary.mdx': 'How to Write a Professional Summary (15 Examples)',
  'resume-maker-google-docs.mdx': 'Resume in Google Docs: Free Templates & Tips (2026)',
  'salary-negotiation-tips.mdx': 'Salary Negotiation Tips: How to Negotiate Offers',
  'how-to-write-cover-letter.mdx': 'How to Write a Cover Letter: Guide & Examples (2026)',
  'best-resume-writing-services.mdx': 'Best Resume Writing Services 2026: Honest Review',
  'resume-paper-printing-tips.mdx': 'Resume Paper & Printing Tips for Interviews (2026)',
  'resume-with-1-year-experience.mdx': 'Resume With 1 Year of Experience: Examples & Tips',
  'ai-ml-resume-guide.mdx': 'AI/ML Resume Guide: Get More Interviews (2026)',
  'simple-resume-format-freshers.mdx': 'Simple Resume Format for Freshers: Templates (2026)',
  'how-to-write-a-resume.mdx': 'How to Write a Resume: Complete Guide (2026)',
  'how-to-write-student-resume.mdx': 'Student Resume With No Experience: Guide (2026)',
};

// Career tips overrides
const CAREER_OVERRIDES = {
  'ai-resume-tools.mdx': 'Best AI Resume Writing Tools 2026 (Free & Paid)',
};

/**
 * For resume example pages: shorten while keeping keyword
 */
function shortenResumeTitle(title, keyword, jobTitle) {
  if (title.length <= MAX_LEN) return null;

  // Extract the abbreviation if present in jobTitle: e.g., "Certified Nursing Assistant (CNA)"
  const abbrMatch = jobTitle.match(/\(([A-Z]{2,})\)/);
  const abbr = abbrMatch ? abbrMatch[1] : null;

  // Check if the keyword uses the abbreviation
  const keywordLower = keyword.toLowerCase();
  const keywordUsesAbbr = abbr && keywordLower.includes(abbr.toLowerCase());

  // Strategy 1: If keyword uses abbreviation, use abbreviation form in title
  if (keywordUsesAbbr) {
    const candidate = `${abbr} Resume: Examples & Writing Guide 2026`;
    if (candidate.length <= MAX_LEN && keywordLower.split(' ').every(w => candidate.toLowerCase().includes(w))) {
      return candidate;
    }
  }

  // Strategy 2: Build title from keyword directly (title-cased) + shortened suffix
  // Convert keyword like "business administration resume" to "Business Administration Resume"
  const keywordTitleCase = keyword
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  // Ensure "Resume" is in the keyword title; if not, we need to preserve it
  const hasResume = keywordLower.includes('resume');

  const suffixes = [
    ': Examples & Writing Guide 2026',  // original
    ': Examples & Guide (2026)',
    ': Example & Guide 2026',
    ' Example & Writing Guide 2026',
    ': Guide & Examples 2026',
    ' Resume Guide & Examples 2026',
  ];

  // If keyword already contains "Resume", build: KeywordTitleCase + suffix
  if (hasResume) {
    for (const suffix of suffixes) {
      const candidate = keywordTitleCase + suffix;
      if (candidate.length <= MAX_LEN) {
        return candidate;
      }
    }
    // Last resort: keyword + minimal suffix
    const minimal = keywordTitleCase + ': Guide 2026';
    if (minimal.length <= MAX_LEN) return minimal;

    // Even more minimal
    return keywordTitleCase.length <= MAX_LEN ? keywordTitleCase : null;
  }

  // If keyword doesn't have "Resume" (shouldn't happen for resume examples, but safety)
  const base = keywordTitleCase + ' Resume';
  for (const suffix of [': Examples & Writing Guide 2026', ': Examples & Guide 2026', ': Guide 2026']) {
    const candidate = base + suffix;
    if (candidate.length <= MAX_LEN) return candidate;
  }

  return null;
}

function verifyKeywordPresent(newTitle, keyword) {
  const titleLower = newTitle.toLowerCase();
  const words = keyword.toLowerCase().split(/\s+/);
  // Every significant keyword word must be in the title
  return words.every(w => titleLower.includes(w));
}

let updated = 0;
let skipped = 0;
let alreadyOk = 0;
const changes = [];
const failures = [];

for (const dir of DIRS) {
  if (!fs.existsSync(dir)) continue;
  const dirName = path.basename(dir);

  for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.mdx'))) {
    const filePath = path.join(dir, f);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);

    if (!data.title || data.title.length <= MAX_LEN) {
      alreadyOk++;
      continue;
    }

    const keyword = data.tags ? data.tags[0] : '';
    let newTitle = null;

    if (dirName === 'blog' && BLOG_TITLE_OVERRIDES[f]) {
      newTitle = BLOG_TITLE_OVERRIDES[f];
    } else if (dirName === 'career-tips' && CAREER_OVERRIDES[f]) {
      newTitle = CAREER_OVERRIDES[f];
    } else if (dirName === 'resume-examples') {
      newTitle = shortenResumeTitle(data.title, keyword, data.jobTitle || '');
    }

    if (!newTitle) {
      console.log(`SKIP (no safe shortening): ${f} (${data.title.length}) "${data.title}"`);
      console.log(`   KEYWORD: "${keyword}"`);
      failures.push(f);
      skipped++;
      continue;
    }

    if (newTitle.length > MAX_LEN) {
      console.log(`SKIP (still too long ${newTitle.length}): ${f} → "${newTitle}"`);
      failures.push(f);
      skipped++;
      continue;
    }

    // SAFETY CHECK: verify keyword is preserved
    if (keyword && !verifyKeywordPresent(newTitle, keyword)) {
      console.log(`BLOCKED (keyword missing): ${f}`);
      console.log(`   OLD: "${data.title}"`);
      console.log(`   NEW: "${newTitle}"`);
      console.log(`   KEYWORD: "${keyword}"`);
      failures.push(f);
      skipped++;
      continue;
    }

    changes.push({
      file: f,
      old: data.title,
      oldLen: data.title.length,
      new: newTitle,
      newLen: newTitle.length,
      keyword,
    });

    data.title = newTitle;
    const newRaw = matter.stringify(content, data);
    fs.writeFileSync(filePath, newRaw);
    updated++;
  }
}

console.log(`\n=== RESULTS ===`);
console.log(`Updated: ${updated}`);
console.log(`Already OK: ${alreadyOk}`);
console.log(`Skipped: ${skipped}`);

if (changes.length) {
  console.log(`\n=== CHANGES MADE ===`);
  for (const c of changes) {
    console.log(`${c.file}: ${c.oldLen} → ${c.newLen}`);
    console.log(`   OLD: "${c.old}"`);
    console.log(`   NEW: "${c.new}"`);
    console.log(`   KW:  "${c.keyword}" ✓`);
  }
}

if (failures.length) {
  console.log(`\n=== FAILURES (need manual review) ===`);
  for (const f of failures) console.log(`  - ${f}`);
}

// Verification pass
let stillLong = 0;
let keywordMissing = 0;
for (const dir of DIRS) {
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.mdx'))) {
    const { data } = matter(fs.readFileSync(path.join(dir, f), 'utf-8'));
    if (data.title && data.title.length > MAX_LEN) stillLong++;
    const kw = data.tags ? data.tags[0] : '';
    if (kw && data.title && !verifyKeywordPresent(data.title, kw)) {
      keywordMissing++;
      console.log(`KEYWORD MISSING in: ${f} — kw "${kw}" not in "${data.title}"`);
    }
  }
}
console.log(`\n=== VERIFICATION ===`);
console.log(`Titles still over ${MAX_LEN}: ${stillLong}`);
console.log(`Titles missing keyword: ${keywordMissing}`);

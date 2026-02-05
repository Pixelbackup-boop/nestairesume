#!/usr/bin/env node
/**
 * Comprehensive SEO Audit Script
 * Checks all content pages against Google 2026 SEO guidelines from CLAUDE.md
 *
 * Checks:
 *  1. Title tag length (50-60 chars)
 *  2. Meta description length (150-160 chars)
 *  3. URL slug quality (short, lowercase, hyphens, no numbers)
 *  4. Content length (word count by content type)
 *  5. Heading structure (H1 presence, H2/H3 usage, spacing)
 *  6. Keyword in first 150 words
 *  7. Paragraph length (no walls of text)
 *  8. Internal linking (at least 1 internal link)
 *  9. E-E-A-T signals (named author, citations)
 * 10. Tags count (6-8 recommended)
 * 11. Content freshness (2026 references)
 * 12. Image alt text (frontmatter imageAlt)
 * 13. Required sections (resume examples only)
 * 14. FAQ presence (resume examples / blog)
 * 15. Duplicate detection (title/description duplicates)
 */

import { createRequire } from 'node:module';
import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const require = createRequire(path.join(rootDir, 'frontend', 'package.json'));
const matter = require('gray-matter');

const CONTENT_DIRS = {
  'resume-examples': path.join(rootDir, 'frontend', 'content', 'resume-examples'),
  'blog': path.join(rootDir, 'frontend', 'content', 'blog'),
  'career-tips': path.join(rootDir, 'frontend', 'content', 'career-tips'),
};

// Min word counts by content type
const MIN_WORDS = {
  'resume-examples': 800,
  'blog': 1500,
  'career-tips': 800,
};

// Required sections for resume example pages
const RESUME_REQUIRED_SECTIONS = [
  { pattern: /^## What Makes a Great .+ Resume\?/m, name: 'Unique Intro' },
  { pattern: /^## Professional Summary Examples/m, name: 'Professional Summaries' },
  { pattern: /^## Salary & Job Outlook/m, name: 'Salary & Job Outlook' },
  { pattern: /^## Essential Skills to Highlight/m, name: 'Skills Section' },
  { pattern: /^## Achievement-Focused Bullet Points/m, name: 'Achievement Bullets' },
  { pattern: /^## .+ Resume Format & Template Tips/m, name: 'Format Tips' },
  { pattern: /^## Hiring Manager Tip/m, name: 'Hiring Manager Tip' },
  { pattern: /^## Common .+ Interview Questions/m, name: 'Interview Questions' },
  { pattern: /^## Common Mistakes to Avoid/m, name: 'Common Mistakes' },
  { pattern: /^## ATS Optimization/m, name: 'ATS Optimization' },
];

// Track duplicates
const seenTitles = new Map();
const seenDescriptions = new Map();

// Results
const issues = [];
const stats = {
  totalFiles: 0,
  totalIssues: 0,
  critical: 0,
  warning: 0,
  info: 0,
  byCategory: {},
  byCheck: {},
};

function addIssue(file, severity, check, message) {
  issues.push({ file, severity, check, message });
  stats.totalIssues++;
  stats[severity] = (stats[severity] || 0) + 1;
  stats.byCheck[check] = (stats.byCheck[check] || 0) + 1;
}

function countWords(text) {
  return text.replace(/[#*\->\[\]\(\)]/g, ' ').split(/\s+/).filter(w => w.length > 0).length;
}

function getHeadings(content) {
  const headings = [];
  const lines = content.split('\n');
  for (const line of lines) {
    const match = line.match(/^(#{1,6})\s+(.+)/);
    if (match) {
      headings.push({ level: match[1].length, text: match[2] });
    }
  }
  return headings;
}

function getParagraphs(content) {
  // Split by blank lines, filter out headings and list items
  const blocks = content.split(/\n\n+/);
  return blocks.filter(b => {
    const trimmed = b.trim();
    return trimmed.length > 0
      && !trimmed.startsWith('#')
      && !trimmed.startsWith('-')
      && !trimmed.startsWith('>')
      && !trimmed.startsWith('|')
      && !trimmed.startsWith('```')
      && !trimmed.startsWith('---');
  });
}

function hasInternalLinks(content) {
  // Match markdown links that are relative (not starting with http)
  const internalLinkPattern = /\[([^\]]+)\]\(\/[^)]+\)/g;
  return (content.match(internalLinkPattern) || []).length;
}

function hasExternalCitations(content) {
  // Check for authoritative source links
  const citations = {
    bls: /bls\.gov/i.test(content),
    glassdoor: /glassdoor\.com/i.test(content),
    payscale: /payscale\.com/i.test(content),
    anyExternal: /\[([^\]]+)\]\(https?:\/\/[^)]+\)/g.test(content),
  };
  return citations;
}

function checkSlug(slug) {
  const issues = [];
  if (slug !== slug.toLowerCase()) issues.push('not lowercase');
  if (slug.includes('_')) issues.push('uses underscores (should use hyphens)');
  if (/\d{4}/.test(slug)) issues.push('contains year number (may become outdated)');
  if (slug.length > 60) issues.push('too long (>60 chars)');
  if (slug.split('-').length > 8) issues.push('too many words (>8)');
  return issues;
}

function auditFile(filePath, contentType) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data: fm, content } = matter(raw);
  const fileName = path.basename(filePath, '.mdx');
  const shortPath = `${contentType}/${fileName}`;

  stats.totalFiles++;
  stats.byCategory[contentType] = (stats.byCategory[contentType] || 0) + 1;

  // ─── 1. TITLE TAG ───
  const title = fm.title || '';
  if (!title) {
    addIssue(shortPath, 'critical', 'title-missing', 'No title in frontmatter');
  } else {
    if (title.length < 30) {
      addIssue(shortPath, 'warning', 'title-short', `Title too short: ${title.length} chars (min 30). Title: "${title}"`);
    }
    if (title.length > 65) {
      addIssue(shortPath, 'warning', 'title-long', `Title too long: ${title.length} chars (max ~60). Title: "${title}"`);
    }
    // Check for year freshness
    if (!title.includes('2026') && !title.includes('2025')) {
      addIssue(shortPath, 'info', 'title-no-year', `Title missing current year (2026). Title: "${title}"`);
    }
    // Track duplicates
    if (seenTitles.has(title)) {
      addIssue(shortPath, 'critical', 'title-duplicate', `Duplicate title with ${seenTitles.get(title)}. Title: "${title}"`);
    } else {
      seenTitles.set(title, shortPath);
    }
  }

  // ─── 2. META DESCRIPTION ───
  const desc = fm.description || '';
  if (!desc) {
    addIssue(shortPath, 'critical', 'desc-missing', 'No description in frontmatter');
  } else {
    if (desc.length < 80) {
      addIssue(shortPath, 'warning', 'desc-short', `Description too short: ${desc.length} chars (min ~120). Desc: "${desc.substring(0, 80)}..."`);
    }
    if (desc.length > 165) {
      addIssue(shortPath, 'warning', 'desc-long', `Description too long: ${desc.length} chars (max ~160). Will be truncated in SERPs`);
    }
    // Track duplicates
    const descNorm = desc.toLowerCase().trim();
    if (seenDescriptions.has(descNorm)) {
      addIssue(shortPath, 'critical', 'desc-duplicate', `Duplicate description with ${seenDescriptions.get(descNorm)}`);
    } else {
      seenDescriptions.set(descNorm, shortPath);
    }
  }

  // ─── 3. URL SLUG ───
  const slug = fm.slug || fileName;
  const slugIssues = checkSlug(slug);
  for (const si of slugIssues) {
    addIssue(shortPath, 'warning', 'slug-issue', `Slug "${slug}": ${si}`);
  }

  // ─── 4. CONTENT LENGTH ───
  const wordCount = countWords(content);
  const minWords = MIN_WORDS[contentType] || 800;
  if (wordCount < minWords) {
    addIssue(shortPath, 'critical', 'content-thin', `Only ${wordCount} words (min ${minWords} for ${contentType})`);
  } else if (wordCount < minWords * 1.2) {
    addIssue(shortPath, 'info', 'content-borderline', `${wordCount} words — just above minimum (${minWords}). Consider expanding`);
  }

  // ─── 5. HEADING STRUCTURE ───
  const headings = getHeadings(content);
  const h1s = headings.filter(h => h.level === 1);
  const h2s = headings.filter(h => h.level === 2);
  const h3s = headings.filter(h => h.level === 3);

  if (h1s.length > 0) {
    addIssue(shortPath, 'warning', 'h1-in-body', `H1 found in body content (${h1s.length}x). MDX body should use H2+ only; H1 is the page title`);
  }
  if (h2s.length < 3) {
    addIssue(shortPath, 'warning', 'few-h2s', `Only ${h2s.length} H2 sections. Pages should have 3+ major sections`);
  }

  // Check heading spacing (every ~300 words)
  const lines = content.split('\n');
  let wordsSinceHeading = 0;
  let maxGap = 0;
  for (const line of lines) {
    if (/^#{1,6}\s/.test(line)) {
      if (wordsSinceHeading > maxGap) maxGap = wordsSinceHeading;
      wordsSinceHeading = 0;
    } else {
      wordsSinceHeading += line.split(/\s+/).filter(w => w.length > 0).length;
    }
  }
  if (maxGap > 500) {
    addIssue(shortPath, 'warning', 'heading-gap', `Longest stretch without heading: ~${maxGap} words (recommended: break every ~300 words)`);
  }

  // ─── 6. KEYWORD IN FIRST 150 WORDS ───
  const slug_keywords = slug.split('-').filter(w => w.length > 3);
  const first150words = content.split(/\s+/).slice(0, 150).join(' ').toLowerCase();
  const keywordInFirst150 = slug_keywords.some(kw => first150words.includes(kw));
  if (!keywordInFirst150 && slug_keywords.length > 0) {
    addIssue(shortPath, 'info', 'keyword-late', `Primary keyword (${slug_keywords.join(', ')}) not found in first 150 words`);
  }

  // ─── 7. PARAGRAPH LENGTH ───
  const paragraphs = getParagraphs(content);
  let longParagraphs = 0;
  for (const p of paragraphs) {
    const pWords = countWords(p);
    if (pWords > 100) {
      longParagraphs++;
    }
  }
  if (longParagraphs > 3) {
    addIssue(shortPath, 'warning', 'long-paragraphs', `${longParagraphs} paragraphs over 100 words. Keep paragraphs to 40-70 words for readability`);
  }

  // ─── 8. INTERNAL LINKING ───
  const internalLinkCount = hasInternalLinks(content);
  if (internalLinkCount === 0) {
    addIssue(shortPath, 'warning', 'no-internal-links', 'No internal links found. Every page should link to at least one other page');
  }

  // ─── 9. E-E-A-T SIGNALS ───
  const author = fm.author || '';
  if (!author) {
    addIssue(shortPath, 'critical', 'no-author', 'No author in frontmatter (E-E-A-T requirement)');
  } else if (/team|admin|staff|editor/i.test(author)) {
    addIssue(shortPath, 'warning', 'generic-author', `Generic author name "${author}". Use a named individual for E-E-A-T`);
  }

  // Citations (for resume examples, check salary citations)
  if (contentType === 'resume-examples') {
    const citations = hasExternalCitations(content);
    if (!citations.bls) {
      addIssue(shortPath, 'warning', 'no-bls-citation', 'Missing BLS (Bureau of Labor Statistics) citation for salary data');
    }
    if (!citations.glassdoor && !citations.payscale) {
      addIssue(shortPath, 'warning', 'no-salary-citation', 'Missing Glassdoor/PayScale salary citation');
    }
  }

  // ─── 10. TAGS ───
  const tags = fm.tags || [];
  if (tags.length === 0) {
    addIssue(shortPath, 'critical', 'no-tags', 'No tags in frontmatter');
  } else if (tags.length < 6) {
    addIssue(shortPath, 'info', 'few-tags', `Only ${tags.length} tags (recommended: 6-8)`);
  } else if (tags.length > 10) {
    addIssue(shortPath, 'info', 'many-tags', `${tags.length} tags (recommended: 6-8). Too many may dilute relevance`);
  }

  // ─── 11. CONTENT FRESHNESS ───
  if (!content.includes('2026') && !title.includes('2026')) {
    addIssue(shortPath, 'info', 'no-year-in-content', 'No "2026" reference in body or title. Consider adding current year for freshness signals');
  }

  // ─── 12. IMAGE ALT TEXT ───
  if (!fm.imageAlt && fm.image) {
    addIssue(shortPath, 'warning', 'no-image-alt', 'Has image but missing imageAlt in frontmatter');
  }

  // ─── 13. REQUIRED SECTIONS (resume examples only) ───
  if (contentType === 'resume-examples') {
    for (const section of RESUME_REQUIRED_SECTIONS) {
      if (!section.pattern.test(content)) {
        addIssue(shortPath, 'critical', 'missing-section', `Missing required section: "${section.name}"`);
      }
    }

    // Check for 3 professional summary levels
    const hasEntry = /entry.level|for entry/i.test(content);
    const hasMid = /mid.level|for mid/i.test(content);
    const hasSenior = /senior|for senior/i.test(content);
    if (!hasEntry || !hasMid || !hasSenior) {
      const missing = [];
      if (!hasEntry) missing.push('Entry-Level');
      if (!hasMid) missing.push('Mid-Level');
      if (!hasSenior) missing.push('Senior');
      addIssue(shortPath, 'warning', 'incomplete-summaries', `Professional summaries missing levels: ${missing.join(', ')}`);
    }

    // Check FAQ in frontmatter
    if (!fm.faq || fm.faq.length === 0) {
      addIssue(shortPath, 'warning', 'no-faq', 'No FAQ in frontmatter (structured data opportunity)');
    } else if (fm.faq.length < 3) {
      addIssue(shortPath, 'info', 'few-faq', `Only ${fm.faq.length} FAQ items (recommended: 3-5)`);
    }

    // Check key skills in frontmatter
    if (!fm.keySkills || fm.keySkills.length === 0) {
      addIssue(shortPath, 'warning', 'no-key-skills', 'No keySkills in frontmatter');
    }

    // Check salary data in frontmatter
    if (!fm.avgSalary) {
      addIssue(shortPath, 'warning', 'no-salary-data', 'No avgSalary in frontmatter');
    }
    if (!fm.jobGrowth) {
      addIssue(shortPath, 'warning', 'no-growth-data', 'No jobGrowth in frontmatter');
    }
  }

  // ─── 14. BLOG-SPECIFIC CHECKS ───
  if (contentType === 'blog') {
    // Check FAQ in frontmatter
    if (!fm.faq || fm.faq.length === 0) {
      addIssue(shortPath, 'info', 'blog-no-faq', 'No FAQ in frontmatter (consider adding for featured snippets)');
    }
  }

  // ─── 15. H1 / TITLE ALIGNMENT ───
  // In MDX, the first ## heading acts as the visible H1 on page
  if (h2s.length > 0) {
    const firstH2 = h2s[0].text.toLowerCase();
    const titleLower = title.toLowerCase();
    // Extract key terms from slug
    const slugTerms = slug.split('-').filter(w => w.length > 3);
    const firstH2HasKeyword = slugTerms.some(t => firstH2.includes(t));
    const titleHasKeyword = slugTerms.some(t => titleLower.includes(t));
    if (titleHasKeyword && !firstH2HasKeyword && slugTerms.length > 0) {
      addIssue(shortPath, 'info', 'h1-keyword-mismatch', `Title contains keyword but first H2 ("${h2s[0].text}") does not. Consider aligning`);
    }
  }

  return { wordCount, headingCount: headings.length, h2Count: h2s.length, h3Count: h3s.length, internalLinks: internalLinkCount, tags: tags.length };
}

// ═══════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════

console.log('═══════════════════════════════════════════════');
console.log('  SEO AUDIT — Google 2026 Guidelines Check');
console.log('═══════════════════════════════════════════════\n');

const fileStats = [];

for (const [contentType, dir] of Object.entries(CONTENT_DIRS)) {
  if (!fs.existsSync(dir)) {
    console.log(`⚠ Directory not found: ${dir}`);
    continue;
  }

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));
  console.log(`Auditing ${files.length} ${contentType} files...`);

  for (const file of files) {
    try {
      const s = auditFile(path.join(dir, file), contentType);
      fileStats.push({ file: `${contentType}/${path.basename(file, '.mdx')}`, ...s });
    } catch (err) {
      addIssue(`${contentType}/${file}`, 'critical', 'parse-error', `Failed to parse: ${err.message}`);
    }
  }
}

// ═══════════════════════════════════════════════
// REPORT
// ═══════════════════════════════════════════════

console.log('\n═══════════════════════════════════════════════');
console.log('  AUDIT SUMMARY');
console.log('═══════════════════════════════════════════════\n');

console.log(`Total files audited: ${stats.totalFiles}`);
console.log(`Total issues found:  ${stats.totalIssues}`);
console.log(`  🔴 Critical: ${stats.critical}`);
console.log(`  🟡 Warning:  ${stats.warning}`);
console.log(`  🔵 Info:     ${stats.info}`);

console.log('\n─── Issues by Category ───');
for (const [cat, count] of Object.entries(stats.byCategory)) {
  console.log(`  ${cat}: ${count} files audited`);
}

console.log('\n─── Issues by Check (sorted by count) ───');
const sortedChecks = Object.entries(stats.byCheck).sort((a, b) => b[1] - a[1]);
for (const [check, count] of sortedChecks) {
  console.log(`  ${check}: ${count}`);
}

// Content length stats
const wordCounts = fileStats.map(f => f.wordCount).sort((a, b) => a - b);
if (wordCounts.length > 0) {
  console.log('\n─── Content Length Stats ───');
  console.log(`  Min:    ${wordCounts[0]} words`);
  console.log(`  Max:    ${wordCounts[wordCounts.length - 1]} words`);
  console.log(`  Median: ${wordCounts[Math.floor(wordCounts.length / 2)]} words`);
  console.log(`  Avg:    ${Math.round(wordCounts.reduce((a, b) => a + b, 0) / wordCounts.length)} words`);

  // Distribution
  const under800 = wordCounts.filter(w => w < 800).length;
  const under1500 = wordCounts.filter(w => w >= 800 && w < 1500).length;
  const mid = wordCounts.filter(w => w >= 1500 && w < 2500).length;
  const long = wordCounts.filter(w => w >= 2500).length;
  console.log(`  <800 words:      ${under800} files`);
  console.log(`  800-1499 words:  ${under1500} files`);
  console.log(`  1500-2499 words: ${mid} files`);
  console.log(`  2500+ words:     ${long} files`);
}

// Internal link stats
const linkCounts = fileStats.map(f => f.internalLinks);
const noLinks = linkCounts.filter(l => l === 0).length;
console.log(`\n─── Internal Linking ───`);
console.log(`  Pages with 0 internal links: ${noLinks} / ${fileStats.length}`);
console.log(`  Avg internal links per page: ${(linkCounts.reduce((a, b) => a + b, 0) / linkCounts.length).toFixed(1)}`);

// ═══════════════════════════════════════════════
// DETAILED ISSUES (grouped by severity)
// ═══════════════════════════════════════════════

console.log('\n\n═══════════════════════════════════════════════');
console.log('  CRITICAL ISSUES (must fix)');
console.log('═══════════════════════════════════════════════\n');

const criticals = issues.filter(i => i.severity === 'critical');
if (criticals.length === 0) {
  console.log('  ✅ No critical issues found!');
} else {
  for (const i of criticals) {
    console.log(`  🔴 [${i.check}] ${i.file}`);
    console.log(`     ${i.message}\n`);
  }
}

console.log('\n═══════════════════════════════════════════════');
console.log('  WARNINGS (should fix)');
console.log('═══════════════════════════════════════════════\n');

const warnings = issues.filter(i => i.severity === 'warning');
if (warnings.length === 0) {
  console.log('  ✅ No warnings found!');
} else {
  // Group warnings by check
  const groupedWarnings = {};
  for (const w of warnings) {
    if (!groupedWarnings[w.check]) groupedWarnings[w.check] = [];
    groupedWarnings[w.check].push(w);
  }
  for (const [check, items] of Object.entries(groupedWarnings)) {
    console.log(`  🟡 ${check} (${items.length} pages):`);
    // Show first 5 examples
    for (const item of items.slice(0, 5)) {
      console.log(`     - ${item.file}: ${item.message}`);
    }
    if (items.length > 5) {
      console.log(`     ... and ${items.length - 5} more`);
    }
    console.log('');
  }
}

console.log('\n═══════════════════════════════════════════════');
console.log('  INFO (nice to fix)');
console.log('═══════════════════════════════════════════════\n');

const infos = issues.filter(i => i.severity === 'info');
if (infos.length === 0) {
  console.log('  ✅ No info issues found!');
} else {
  // Group by check, show counts only
  const groupedInfo = {};
  for (const i of infos) {
    if (!groupedInfo[i.check]) groupedInfo[i.check] = [];
    groupedInfo[i.check].push(i);
  }
  for (const [check, items] of Object.entries(groupedInfo)) {
    console.log(`  🔵 ${check}: ${items.length} pages`);
    // Show first 3 examples
    for (const item of items.slice(0, 3)) {
      console.log(`     - ${item.file}: ${item.message}`);
    }
    if (items.length > 3) {
      console.log(`     ... and ${items.length - 3} more`);
    }
    console.log('');
  }
}

// ═══════════════════════════════════════════════
// PASS RATE
// ═══════════════════════════════════════════════

console.log('\n═══════════════════════════════════════════════');
console.log('  PASS RATE BY CHECK');
console.log('═══════════════════════════════════════════════\n');

const allChecks = [
  'title-missing', 'title-short', 'title-long', 'title-duplicate',
  'desc-missing', 'desc-short', 'desc-long', 'desc-duplicate',
  'slug-issue',
  'content-thin',
  'h1-in-body', 'few-h2s', 'heading-gap',
  'keyword-late',
  'long-paragraphs',
  'no-internal-links',
  'no-author', 'generic-author',
  'no-tags', 'few-tags',
  'no-image-alt',
  'missing-section',
  'no-bls-citation', 'no-salary-citation',
];

for (const check of allChecks) {
  const failCount = stats.byCheck[check] || 0;
  const passRate = ((1 - failCount / stats.totalFiles) * 100).toFixed(1);
  const bar = '█'.repeat(Math.round(passRate / 5)) + '░'.repeat(20 - Math.round(passRate / 5));
  const icon = passRate >= 95 ? '✅' : passRate >= 80 ? '🟡' : '🔴';
  console.log(`  ${icon} ${bar} ${passRate}% — ${check} (${failCount} failures)`);
}

console.log('\n═══════════════════════════════════════════════');
console.log('  AUDIT COMPLETE');
console.log('═══════════════════════════════════════════════');

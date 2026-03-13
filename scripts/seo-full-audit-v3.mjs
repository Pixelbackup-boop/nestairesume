#!/usr/bin/env node
/**
 * Comprehensive SEO Audit v3 — All 18,315+ Content Pages
 *
 * Scans all content types (resume-examples, cover-letter-examples, blog, career-tips)
 * across all 15 locales against Google 2026 SEO guidelines from CLAUDE.md.
 *
 * 22 checks: frontmatter (7), keyword placement (5), content quality (5),
 * required sections (1 meta → 10 sub), citations (2), duplicates (2).
 *
 * Usage:
 *   node scripts/seo-full-audit-v3.mjs [options]
 *     --type=resume-examples   Audit one content type only
 *     --locale=en              Audit one locale only
 *     --verbose                Print all issues to console
 *     --json-only              Suppress console, only write JSON
 *     --output=path            Custom JSON output path
 */

import { createRequire } from 'node:module';
import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const require2 = createRequire(path.join(rootDir, 'frontend', 'package.json'));
const matter = require2('gray-matter');

// ═══════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════

const CONTENT_BASE = path.join(rootDir, 'frontend', 'content');

const CONTENT_TYPES = {
  'resume-examples': 'resume-examples',
  'cover-letter-examples': 'cover-letter-examples',
  'blog': 'blog',
  'career-tips': 'career-tips',
};

const LOCALES = ['ar', 'de', 'es', 'fr', 'id', 'it', 'ja', 'ko', 'nl', 'pl', 'pt', 'th', 'tr', 'vi'];

const MIN_WORDS = {
  'resume-examples': 800,
  'cover-letter-examples': 800,
  'blog': 1500,
  'career-tips': 800,
};

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

const NEAR_DUPLICATE_GROUPS = [
  ['cna', 'certified-nursing-assistant', 'nursing-assistant'],
  ['pharmacy-tech', 'pharmacy-technician'],
  ['desktop-support', 'desktop-support-engineer'],
];

const GENERIC_AUTHOR_RE = /^(team|admin|staff|editor|editorial|content\s*team)$/i;
const INTERNAL_LINK_RE = /\[([^\]]+)\]\(\/[^)]+\)/g;
const HEADING_RE = /^(#{1,6})\s+(.+)/;

// ═══════════════════════════════════════════════
// CLI ARGS
// ═══════════════════════════════════════════════

const args = Object.fromEntries(
  process.argv.slice(2)
    .filter(a => a.startsWith('--'))
    .map(a => {
      const [k, v] = a.replace(/^--/, '').split('=');
      return [k, v || true];
    })
);

const filterType = args.type || null;
const filterLocale = args.locale || null;
const verbose = !!args.verbose;
const jsonOnly = !!args['json-only'];
const outputPath = args.output || path.join(rootDir, 'seo-audit-report-v3.json');

// ═══════════════════════════════════════════════
// DATA STRUCTURES
// ═══════════════════════════════════════════════

const allIssues = [];       // { file, contentType, locale, severity, check, message }
const fileResults = [];     // { file, contentType, locale, issueCount }
const dupTitles = new Map();   // key: `${locale}:${contentType}:${title}` -> filePath
const dupDescs = new Map();    // key: `${locale}:${contentType}:${desc}` -> filePath

const stats = {
  totalFiles: 0,
  filesWithIssues: 0,
  totalIssues: 0,
  bySeverity: { critical: 0, warning: 0, info: 0 },
  byContentType: {},  // { type: { total, withIssues, critical, warning, info } }
  byLocale: {},        // { locale: { total, withIssues, critical, warning, info } }
  byCheck: {},         // { check: { fail: N, total: N } }
};

function initGroup(map, key) {
  if (!map[key]) map[key] = { total: 0, withIssues: 0, critical: 0, warning: 0, info: 0 };
}

// ═══════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════

// CJK characters (Japanese kanji/hiragana/katakana, Chinese, Korean hangul)
const CJK_REGEX = /[\u3000-\u9fff\uac00-\ud7af\uf900-\ufaff]/gu;
const THAI_REGEX = /[\u0E00-\u0E7F]/gu;
const CJK_LOCALES = new Set(['ja', 'ko', 'zh']);
const THAI_LOCALE = 'th';

// Known abbreviation equivalences for keyword checking
const ABBREV_EQUIV = {
  'cv': ['curriculum', 'vitae', 'currículum', 'currículo', 'lebenslauf'],
  'lettera': ['presentazione'],
  'carta': ['presentacion', 'presentación', 'apresentação'],
  'surat': ['lamaran', 'kerja'],
  'list': ['motywacyjny'],
  'brief': ['sollicitatiebrief'],
  'bewerbung': ['bewerbungsschreiben'],
  'lm': ['lettre', 'motivation'],
};

function kwWordPresent(word, text) {
  if (text.includes(word)) return true;
  // Check if word is covered by an abbreviation present in text
  for (const [abbr, originals] of Object.entries(ABBREV_EQUIV)) {
    if (originals.includes(word) && text.includes(abbr)) return true;
  }
  return false;
}

function countWords(text, locale) {
  const clean = text.replace(/[#*\->\[\]\(\)]/g, ' ');
  if (locale && CJK_LOCALES.has(locale)) {
    // CJK: each character ≈ 1 word, plus count space-separated non-CJK tokens
    const cjkCount = (clean.match(CJK_REGEX) || []).length;
    const nonCjk = clean.replace(CJK_REGEX, ' ');
    const nonCjkWords = nonCjk.trim().split(/\s+/).filter(w => w.length > 0).length;
    return cjkCount + nonCjkWords;
  }
  if (locale === THAI_LOCALE) {
    // Thai: no spaces between words, avg ~3 chars per word
    const thaiCount = (clean.match(THAI_REGEX) || []).length;
    const nonThai = clean.replace(THAI_REGEX, ' ');
    const nonThaiWords = nonThai.trim().split(/\s+/).filter(w => w.length > 0).length;
    return Math.round(thaiCount / 3) + nonThaiWords;
  }
  return clean.split(/\s+/).filter(w => w.length > 0).length;
}

function getHeadings(content) {
  const headings = [];
  for (const line of content.split('\n')) {
    const m = line.match(HEADING_RE);
    if (m) headings.push({ level: m[1].length, text: m[2] });
  }
  return headings;
}

function getParagraphs(content) {
  return content.split(/\n\n+/).filter(b => {
    const t = b.trim();
    return t.length > 0 && !t.startsWith('#') && !t.startsWith('-')
      && !t.startsWith('>') && !t.startsWith('|')
      && !t.startsWith('```') && !t.startsWith('---');
  });
}

function internalLinkCount(content) {
  return (content.match(INTERNAL_LINK_RE) || []).length;
}

// ═══════════════════════════════════════════════
// FILE DISCOVERY
// ═══════════════════════════════════════════════

function discoverFiles() {
  const files = [];
  const typeEntries = filterType
    ? [[filterType, filterType]]
    : Object.entries(CONTENT_TYPES);

  for (const [contentType] of typeEntries) {
    const baseDir = path.join(CONTENT_BASE, contentType);
    if (!fs.existsSync(baseDir)) continue;

    // English (root-level) files
    if (!filterLocale || filterLocale === 'en') {
      for (const f of fs.readdirSync(baseDir)) {
        if (f.endsWith('.mdx')) {
          files.push({
            filePath: path.join(baseDir, f),
            contentType,
            locale: 'en',
            slug: f.replace('.mdx', ''),
          });
        }
      }
    }

    // Locale subdirectories
    for (const entry of fs.readdirSync(baseDir, { withFileTypes: true })) {
      if (!entry.isDirectory() || !LOCALES.includes(entry.name)) continue;
      if (filterLocale && filterLocale !== entry.name) continue;

      const localeDir = path.join(baseDir, entry.name);
      for (const f of fs.readdirSync(localeDir)) {
        if (f.endsWith('.mdx')) {
          files.push({
            filePath: path.join(localeDir, f),
            contentType,
            locale: entry.name,
            slug: f.replace('.mdx', ''),
          });
        }
      }
    }
  }

  return files;
}

// ═══════════════════════════════════════════════
// AUDIT CHECKS
// ═══════════════════════════════════════════════

function auditFile(fileInfo) {
  const { filePath, contentType, locale, slug } = fileInfo;
  const issues = [];

  let fm, content;
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    ({ data: fm, content } = matter(raw));
  } catch (err) {
    issues.push({ severity: 'critical', check: 'parse-error', message: `Failed to parse: ${err.message}` });
    return { issues, desc: '' };
  }

  const title = fm.title || '';
  const desc = fm.description || '';
  const tags = fm.tags || [];
  const author = fm.author || '';
  const keyword = tags[0] || '';
  const kwLower = keyword.toLowerCase();
  const kwWords = kwLower.split(/\s+/).filter(Boolean);
  const contentLower = content.toLowerCase();
  const titleLower = title.toLowerCase();
  const descLower = desc.toLowerCase();
  const shortPath = locale === 'en'
    ? `${contentType}/${slug}`
    : `${contentType}/${locale}/${slug}`;

  // ─── 1. TITLE LENGTH ───
  if (!title) {
    issues.push({ severity: 'critical', check: 'title-length', message: 'No title in frontmatter' });
  } else {
    // CJK characters are ~2x info-dense, so adjust thresholds
    const titleMin = CJK_LOCALES.has(locale) ? 15 : 30;
    const titleMax = CJK_LOCALES.has(locale) ? 40 : 65;
    if (title.length < titleMin) {
      issues.push({ severity: 'warning', check: 'title-length', message: `Title too short: ${title.length} chars (min ${titleMin})` });
    }
    if (title.length > titleMax) {
      issues.push({ severity: 'warning', check: 'title-length', message: `Title too long: ${title.length} chars (max ~${titleMax})` });
    }
  }

  // ─── 2. DESCRIPTION LENGTH ───
  if (!desc) {
    issues.push({ severity: 'critical', check: 'desc-length', message: 'No description in frontmatter' });
  } else {
    // CJK characters are ~2x more info-dense, so adjust thresholds
    const descMinLen = CJK_LOCALES.has(locale) ? 40 : 80;
    const descMaxLen = CJK_LOCALES.has(locale) ? 100 : 165;
    if (desc.length < descMinLen) {
      issues.push({ severity: 'warning', check: 'desc-length', message: `Description too short: ${desc.length} chars (min ${descMinLen})` });
    }
    if (desc.length > descMaxLen) {
      issues.push({ severity: 'warning', check: 'desc-length', message: `Description too long: ${desc.length} chars (max ~${descMaxLen})` });
    }
  }

  // ─── 3. SLUG QUALITY ───
  const fmSlug = fm.slug || slug;
  if (fmSlug !== fmSlug.toLowerCase()) {
    issues.push({ severity: 'warning', check: 'slug-quality', message: `Slug not lowercase: "${fmSlug}"` });
  }
  if (fmSlug.includes('_')) {
    issues.push({ severity: 'warning', check: 'slug-quality', message: `Slug uses underscores: "${fmSlug}"` });
  }
  if (/\d{4}/.test(fmSlug)) {
    issues.push({ severity: 'warning', check: 'slug-quality', message: `Slug contains year number: "${fmSlug}"` });
  }

  // ─── 4. TAGS COUNT ───
  if (tags.length === 0) {
    issues.push({ severity: 'critical', check: 'tags-count', message: 'No tags in frontmatter' });
  } else if (tags.length < 6) {
    issues.push({ severity: 'info', check: 'tags-count', message: `Only ${tags.length} tags (recommended: 6-8)` });
  } else if (tags.length > 10) {
    issues.push({ severity: 'info', check: 'tags-count', message: `${tags.length} tags (recommended: 6-8)` });
  }

  // ─── 5. AUTHOR CHECK ───
  if (!author) {
    issues.push({ severity: 'critical', check: 'author-check', message: 'No author in frontmatter' });
  } else if (GENERIC_AUTHOR_RE.test(author)) {
    issues.push({ severity: 'warning', check: 'author-check', message: `Generic author name: "${author}"` });
  }

  // ─── 6. DATE CHECK ───
  const dateStr = fm.date ? String(fm.date) : '';
  if (!dateStr) {
    issues.push({ severity: 'warning', check: 'date-check', message: 'No date in frontmatter' });
  } else if (!dateStr.includes('2026') && !dateStr.includes('2027')) {
    issues.push({ severity: 'info', check: 'date-check', message: `Date "${dateStr}" is not 2026+` });
  }

  // ─── 7. IMAGE ALT ───
  if (fm.image && !fm.imageAlt) {
    issues.push({ severity: 'warning', check: 'image-alt', message: 'Has image but no imageAlt' });
  }

  // ─── 8. KEYWORD IN TITLE ───
  if (kwWords.length > 0 && title) {
    const missing = kwWords.filter(w => !kwWordPresent(w, titleLower));
    if (missing.length > 0) {
      issues.push({ severity: 'critical', check: 'kw-in-title', message: `Title missing keyword words: [${missing.join(', ')}]` });
    }
  }

  // ─── 9. KEYWORD IN DESCRIPTION ───
  if (kwWords.length > 0 && desc) {
    const missing = kwWords.filter(w => !kwWordPresent(w, descLower));
    if (missing.length > 0) {
      issues.push({ severity: 'critical', check: 'kw-in-desc', message: `Description missing keyword words: [${missing.join(', ')}]` });
    }
  }

  // ─── 10. KEYWORD IN FIRST 150 WORDS ───
  if (kwWords.length > 0) {
    let first150text;
    if (CJK_LOCALES.has(locale)) {
      // For CJK: take first ~300 characters (≈150 word equivalents)
      first150text = content.substring(0, 300).toLowerCase();
    } else {
      const bodyWords = content.trim().split(/\s+/);
      first150text = bodyWords.slice(0, 150).join(' ').toLowerCase();
    }
    const missing = kwWords.filter(w => !first150text.includes(w));
    if (missing.length > 0) {
      issues.push({ severity: 'warning', check: 'kw-in-first-150', message: `Keyword not in first 150 words (missing: [${missing.join(', ')}])` });
    }
  }

  // ─── 11. KEYWORD IN SLUG ───
  // Only check EN — locale files keep English slugs but have localized tags[0]
  if (kwWords.length > 0 && locale === 'en') {
    const slugLower = fmSlug.toLowerCase();
    const majorWords = kwWords.filter(w => w.length > 2);
    if (majorWords.length > 0) {
      const missing = majorWords.filter(w => !slugLower.includes(w));
      if (missing.length > Math.floor(majorWords.length / 2)) {
        issues.push({ severity: 'warning', check: 'kw-in-slug', message: `Slug "${fmSlug}" missing keyword words: [${missing.join(', ')}]` });
      }
    }
  }

  // ─── 12. KEYWORD BODY DENSITY ───
  if (kwWords.length > 0 && kwLower) {
    const bodyText = content.replace(/```[\s\S]*?```/g, '').replace(/[#*\[\]()_`>|\\-]/g, ' ');
    const totalWords = countWords(bodyText, locale);
    const kwClean = kwLower.replace(/[#*\[\]()_`>|\\-]/g, ' ').replace(/\s+/g, ' ').trim();
    const kwRegex = new RegExp(kwClean.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    const kwMatches = (bodyText.toLowerCase().match(kwRegex) || []).length;
    const kwWordCount = kwLower.split(/\s+/).filter(Boolean).length;
    const density = totalWords > 0 ? ((kwMatches * kwWordCount) / totalWords) * 100 : 0;
    // CJK/Thai char-based counting inflates word count, so lower thresholds
    const densityMin = CJK_LOCALES.has(locale) ? 0.05 : locale === THAI_LOCALE ? 0.2 : 0.3;
    const densityMax = CJK_LOCALES.has(locale) ? 0.7 : 3.5;
    if (density < densityMin) {
      issues.push({ severity: 'warning', check: 'kw-body-density', message: `Keyword density very low: ${density.toFixed(2)}% (${kwMatches}/${totalWords} words)` });
    } else if (density > densityMax) {
      issues.push({ severity: 'warning', check: 'kw-body-density', message: `Keyword density too high: ${density.toFixed(2)}% — possible stuffing` });
    }
  }

  // ─── 13. CONTENT LENGTH ───
  const wordCount = countWords(content, locale);
  const minWords = MIN_WORDS[contentType] || 800;
  if (wordCount < minWords) {
    issues.push({ severity: 'critical', check: 'content-length', message: `Only ${wordCount} words (min ${minWords})` });
  }

  // ─── 14. HEADING STRUCTURE ───
  const headings = getHeadings(content);
  const h2s = headings.filter(h => h.level === 2);
  if (h2s.length < 3) {
    issues.push({ severity: 'warning', check: 'heading-structure', message: `Only ${h2s.length} H2 sections (need 3+)` });
  }
  // Check max gap between headings
  let wordsSinceHeading = 0;
  let maxGap = 0;
  for (const line of content.split('\n')) {
    if (/^#{1,6}\s/.test(line)) {
      if (wordsSinceHeading > maxGap) maxGap = wordsSinceHeading;
      wordsSinceHeading = 0;
    } else {
      wordsSinceHeading += line.split(/\s+/).filter(w => w.length > 0).length;
    }
  }
  if (maxGap > 500) {
    issues.push({ severity: 'warning', check: 'heading-structure', message: `Longest heading gap: ~${maxGap} words (max ~300 recommended)` });
  }

  // ─── 15. INTERNAL LINKS ───
  if (internalLinkCount(content) === 0) {
    issues.push({ severity: 'warning', check: 'internal-links', message: 'No internal links found' });
  }

  // ─── 16. LONG PARAGRAPHS ───
  const paragraphs = getParagraphs(content);
  const longParas = paragraphs.filter(p => countWords(p) > 100).length;
  if (longParas > 3) {
    issues.push({ severity: 'warning', check: 'long-paragraphs', message: `${longParas} paragraphs over 100 words` });
  }

  // ─── 17. CONTENT FRESHNESS ───
  if (!content.includes('2026') && !title.includes('2026')) {
    issues.push({ severity: 'info', check: 'content-freshness', message: 'No "2026" reference in body or title' });
  }

  // ─── 18. REQUIRED SECTIONS (resume-examples only) ───
  if (contentType === 'resume-examples') {
    if (locale === 'en') {
      // EN: check exact section headings
      for (const section of RESUME_REQUIRED_SECTIONS) {
        if (!section.pattern.test(content)) {
          issues.push({ severity: 'critical', check: 'required-sections', message: `Missing: "${section.name}"` });
        }
      }
    } else {
      // Locale: proxy check — at least 10 H2 headings
      if (h2s.length < 10) {
        issues.push({ severity: 'warning', check: 'required-sections', message: `Only ${h2s.length} H2 sections (locale resumes should have ~10+)` });
      }
    }
  }

  // ─── 19. SALARY CITATIONS (resume-examples only) ───
  if (contentType === 'resume-examples') {
    if (locale === 'en') {
      // EN requires BLS specifically
      if (!/bls\.gov/i.test(content)) {
        issues.push({ severity: 'warning', check: 'salary-citations', message: 'Missing BLS citation' });
      }
      if (!/glassdoor\.com/i.test(content) && !/payscale\.com/i.test(content)) {
        issues.push({ severity: 'warning', check: 'salary-citations', message: 'Missing Glassdoor/PayScale citation' });
      }
    } else {
      // Non-EN: accept any salary authority link (BLS, Glassdoor, PayScale, or locale-specific)
      const hasSalarySource = /bls\.gov|glassdoor\.com|payscale\.com|indeed\.com|salary\.com|doe\.go\.th|molisa\.gov\.vn|destatis\.de|ine\.es|insee\.fr|istat\.it|ibge\.gov\.br|tuik\.gov\.tr|bps\.go\.id|cbs\.nl|gus\.pl|stat\.go\.jp|kostat\.go\.kr/i.test(content);
      if (!hasSalarySource) {
        issues.push({ severity: 'warning', check: 'salary-citations', message: 'Missing salary authority citation' });
      }
    }
  }

  // ─── 20. RESUME METADATA (resume-examples only) ───
  if (contentType === 'resume-examples') {
    if (!fm.avgSalary) {
      issues.push({ severity: 'warning', check: 'resume-metadata', message: 'Missing avgSalary in frontmatter' });
    }
    if (!fm.jobGrowth) {
      issues.push({ severity: 'warning', check: 'resume-metadata', message: 'Missing jobGrowth in frontmatter' });
    }
    if (!fm.keySkills || fm.keySkills.length === 0) {
      issues.push({ severity: 'warning', check: 'resume-metadata', message: 'Missing keySkills in frontmatter' });
    }
  }

  // ─── 21 & 22. DUPLICATE TRACKING (post-processed) ───
  // Store for later duplicate detection
  if (title) {
    const titleKey = `${locale}:${contentType}:${title}`;
    if (dupTitles.has(titleKey)) {
      issues.push({ severity: 'critical', check: 'duplicate-title', message: `Duplicate title with ${dupTitles.get(titleKey)}` });
    } else {
      dupTitles.set(titleKey, shortPath);
    }
  }
  if (desc) {
    const descKey = `${locale}:${contentType}:${desc.toLowerCase().trim()}`;
    if (dupDescs.has(descKey)) {
      issues.push({ severity: 'critical', check: 'duplicate-desc', message: `Duplicate description with ${dupDescs.get(descKey)}` });
    } else {
      dupDescs.set(descKey, shortPath);
    }
  }

  return { issues, desc: fm.description || '' };
}

// ═══════════════════════════════════════════════
// NEAR-DUPLICATE CHECK
// ═══════════════════════════════════════════════

function checkNearDuplicates(fileMap) {
  const nearDupIssues = [];

  for (const group of NEAR_DUPLICATE_GROUPS) {
    const groupFiles = group
      .map(slug => fileMap.get(`en:resume-examples:${slug}`))
      .filter(Boolean);

    if (groupFiles.length < 2) continue;

    // Compare descriptions pairwise
    for (let i = 0; i < groupFiles.length; i++) {
      for (let j = i + 1; j < groupFiles.length; j++) {
        const a = groupFiles[i];
        const b = groupFiles[j];
        if (a.desc && b.desc) {
          const aWords = new Set(a.desc.toLowerCase().split(/\s+/));
          const bWords = new Set(b.desc.toLowerCase().split(/\s+/));
          const intersection = [...aWords].filter(w => bWords.has(w)).length;
          const similarity = intersection / Math.max(aWords.size, bWords.size);
          if (similarity > 0.8) {
            nearDupIssues.push({
              severity: 'warning',
              check: 'near-duplicate',
              file: `${a.slug} vs ${b.slug}`,
              contentType: 'resume-examples',
              locale: 'en',
              message: `Near-duplicate descriptions (${(similarity * 100).toFixed(0)}% overlap): "${a.slug}" and "${b.slug}"`,
            });
          }
        }
      }
    }
  }

  return nearDupIssues;
}

// ═══════════════════════════════════════════════
// CONSOLE OUTPUT
// ═══════════════════════════════════════════════

function printSummary() {
  const log = console.log.bind(console);
  const sep = '='.repeat(70);
  const thin = '-'.repeat(70);

  log(`\n${sep}`);
  log('  SEO FULL AUDIT v3 — Google 2026 Guidelines');
  log(sep);

  // Section 1: Scan stats
  log(`\n  Files scanned:     ${stats.totalFiles.toLocaleString()}`);
  log(`  Files with issues: ${stats.filesWithIssues.toLocaleString()} (${((stats.filesWithIssues / stats.totalFiles) * 100).toFixed(1)}%)`);
  log(`  Files passing ALL: ${(stats.totalFiles - stats.filesWithIssues).toLocaleString()} (${(((stats.totalFiles - stats.filesWithIssues) / stats.totalFiles) * 100).toFixed(1)}%)`);
  log(`  Total issues:      ${stats.totalIssues.toLocaleString()}`);
  log(`    Critical: ${stats.bySeverity.critical.toLocaleString()}`);
  log(`    Warning:  ${stats.bySeverity.warning.toLocaleString()}`);
  log(`    Info:     ${stats.bySeverity.info.toLocaleString()}`);

  // Section 3: Top 10 violations
  log(`\n${thin}`);
  log('  TOP 10 VIOLATIONS');
  log(thin);
  const sortedChecks = Object.entries(stats.byCheck)
    .map(([check, data]) => ({ check, fail: data.fail }))
    .sort((a, b) => b.fail - a.fail)
    .slice(0, 10);
  for (const { check, fail } of sortedChecks) {
    const pct = ((fail / stats.totalFiles) * 100).toFixed(1);
    log(`  ${String(fail).padStart(6)} failures  (${pct.padStart(5)}%)  ${check}`);
  }

  // Section 4: By content type
  log(`\n${thin}`);
  log('  COMPLIANCE BY CONTENT TYPE');
  log(thin);
  log(`  ${'Type'.padEnd(28)} ${'Total'.padStart(7)} ${'Pass%'.padStart(7)} ${'Crit'.padStart(6)} ${'Warn'.padStart(6)} ${'Info'.padStart(6)}`);
  for (const [type, d] of Object.entries(stats.byContentType)) {
    const passRate = (((d.total - d.withIssues) / d.total) * 100).toFixed(1);
    log(`  ${type.padEnd(28)} ${String(d.total).padStart(7)} ${(passRate + '%').padStart(7)} ${String(d.critical).padStart(6)} ${String(d.warning).padStart(6)} ${String(d.info).padStart(6)}`);
  }

  // Section 5: By locale
  log(`\n${thin}`);
  log('  COMPLIANCE BY LOCALE');
  log(thin);
  log(`  ${'Locale'.padEnd(10)} ${'Total'.padStart(7)} ${'Pass%'.padStart(7)} ${'Crit'.padStart(6)} ${'Warn'.padStart(6)} ${'Info'.padStart(6)}`);
  const localeEntries = Object.entries(stats.byLocale).sort((a, b) => {
    const aRate = (a[1].total - a[1].withIssues) / a[1].total;
    const bRate = (b[1].total - b[1].withIssues) / b[1].total;
    return aRate - bRate; // worst first
  });
  for (const [loc, d] of localeEntries) {
    const passRate = (((d.total - d.withIssues) / d.total) * 100).toFixed(1);
    log(`  ${loc.padEnd(10)} ${String(d.total).padStart(7)} ${(passRate + '%').padStart(7)} ${String(d.critical).padStart(6)} ${String(d.warning).padStart(6)} ${String(d.info).padStart(6)}`);
  }

  // Section 6: Pass rate per check
  log(`\n${thin}`);
  log('  PASS RATE PER CHECK');
  log(thin);
  const allCheckEntries = Object.entries(stats.byCheck)
    .map(([check, data]) => ({ check, fail: data.fail, total: data.total }))
    .sort((a, b) => (a.fail / a.total) - (b.fail / b.total)); // best pass rate first
  for (const { check, fail, total } of allCheckEntries) {
    const passRate = (((total - fail) / total) * 100).toFixed(1);
    const barLen = Math.round((total - fail) / total * 20);
    const bar = '#'.repeat(barLen) + '.'.repeat(20 - barLen);
    const icon = passRate >= 95 ? 'OK' : passRate >= 80 ? '!!' : 'XX';
    log(`  ${icon} [${bar}] ${passRate.padStart(5)}%  ${check} (${fail} fail / ${total})`);
  }

  // Verbose: print all issues
  if (verbose) {
    log(`\n${sep}`);
    log('  ALL ISSUES (VERBOSE)');
    log(sep);
    const grouped = {};
    for (const issue of allIssues) {
      if (!grouped[issue.check]) grouped[issue.check] = [];
      grouped[issue.check].push(issue);
    }
    for (const [check, items] of Object.entries(grouped).sort((a, b) => b[1].length - a[1].length)) {
      log(`\n  --- ${check} (${items.length}) ---`);
      for (const item of items.slice(0, 20)) {
        log(`    [${item.severity}] ${item.file}: ${item.message}`);
      }
      if (items.length > 20) log(`    ... and ${items.length - 20} more`);
    }
  }

  log(`\n${sep}`);
  log('  AUDIT COMPLETE');
  log(sep);
}

// ═══════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════

const startTime = Date.now();

if (!jsonOnly) {
  console.log('Discovering files...');
}

const files = discoverFiles();

if (!jsonOnly) {
  console.log(`Found ${files.length.toLocaleString()} files. Auditing...`);
}

// For near-duplicate check, store desc per file
const fileMetaMap = new Map(); // key: `${locale}:${contentType}:${slug}` -> { slug, desc }

for (let i = 0; i < files.length; i++) {
  const fileInfo = files[i];

  // Progress indicator
  if (!jsonOnly && (i + 1) % 2000 === 0) {
    process.stdout.write(`  ${i + 1} / ${files.length} files processed...\r`);
  }

  const result = auditFile(fileInfo);
  const issues = result.issues;
  const { contentType, locale, slug } = fileInfo;
  const shortPath = locale === 'en'
    ? `${contentType}/${slug}`
    : `${contentType}/${locale}/${slug}`;

  // Store meta for near-duplicate check
  fileMetaMap.set(`${locale}:${contentType}:${slug}`, {
    slug,
    desc: result.desc || '',
  });

  // Update stats
  stats.totalFiles++;
  initGroup(stats.byContentType, contentType);
  initGroup(stats.byLocale, locale);
  stats.byContentType[contentType].total++;
  stats.byLocale[locale].total++;

  if (issues.length > 0) {
    stats.filesWithIssues++;
    stats.byContentType[contentType].withIssues++;
    stats.byLocale[locale].withIssues++;
  }

  for (const issue of issues) {
    stats.totalIssues++;
    stats.bySeverity[issue.severity]++;
    stats.byContentType[contentType][issue.severity]++;
    stats.byLocale[locale][issue.severity]++;

    if (!stats.byCheck[issue.check]) stats.byCheck[issue.check] = { fail: 0, total: stats.totalFiles };
    stats.byCheck[issue.check].fail++;

    allIssues.push({
      file: shortPath,
      contentType,
      locale,
      severity: issue.severity,
      check: issue.check,
      message: issue.message,
    });
  }

  fileResults.push({ file: shortPath, contentType, locale, issueCount: issues.length });
}

// Fix byCheck totals (set all to totalFiles)
for (const check of Object.keys(stats.byCheck)) {
  stats.byCheck[check].total = stats.totalFiles;
}

// Near-duplicate check
const nearDupIssues = checkNearDuplicates(fileMetaMap);
for (const issue of nearDupIssues) {
  stats.totalIssues++;
  stats.bySeverity[issue.severity]++;
  if (!stats.byCheck[issue.check]) stats.byCheck[issue.check] = { fail: 0, total: stats.totalFiles };
  stats.byCheck[issue.check].fail++;
  allIssues.push(issue);
}

const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

if (!jsonOnly) {
  console.log(`\nCompleted in ${elapsed}s`);
  printSummary();
}

// Write JSON report (only files with issues)
const jsonReport = {
  meta: {
    timestamp: new Date().toISOString(),
    elapsedSeconds: parseFloat(elapsed),
    totalFiles: stats.totalFiles,
    filesWithIssues: stats.filesWithIssues,
    passRate: `${(((stats.totalFiles - stats.filesWithIssues) / stats.totalFiles) * 100).toFixed(1)}%`,
    filters: { type: filterType, locale: filterLocale },
  },
  summary: {
    bySeverity: stats.bySeverity,
    byContentType: stats.byContentType,
    byLocale: stats.byLocale,
    byCheck: stats.byCheck,
  },
  topViolations: Object.entries(stats.byCheck)
    .map(([check, data]) => ({ check, failures: data.fail, pctFailing: `${((data.fail / stats.totalFiles) * 100).toFixed(1)}%` }))
    .sort((a, b) => b.failures - a.failures)
    .slice(0, 20),
  issues: allIssues,
};

fs.writeFileSync(outputPath, JSON.stringify(jsonReport, null, 2));

if (!jsonOnly) {
  console.log(`\nJSON report written to: ${outputPath}`);
}

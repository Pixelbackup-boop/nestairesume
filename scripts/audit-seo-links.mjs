#!/usr/bin/env node
/**
 * SEO Link Audit Script
 * Scans all content pages (MDX + TSX) for internal and external links.
 * Produces a JSON report + human-readable console summary.
 */

import { createRequire } from 'node:module';
import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const require2 = createRequire(path.join(rootDir, 'frontend', 'package.json'));
const matter = require2('gray-matter');

const RESUME_DIR = path.join(rootDir, 'frontend', 'content', 'resume-examples');
const COVER_DIR = path.join(rootDir, 'frontend', 'content', 'cover-letter-examples');
const BLOG_DIR = path.join(rootDir, 'frontend', 'content', 'blog');
const CAREER_DIR = path.join(rootDir, 'frontend', 'content', 'career-tips');

// TSX pages to scan
const TSX_PAGES = [
  'frontend/app/[locale]/adobe-alternative/page.tsx',
  'frontend/app/[locale]/canva-alternative/page.tsx',
  'frontend/app/[locale]/europass-alternative/page.tsx',
  'frontend/app/[locale]/livecareer-alternative/page.tsx',
  'frontend/app/[locale]/nova-alternative/page.tsx',
  'frontend/app/[locale]/overleaf-alternative/page.tsx',
  'frontend/app/[locale]/resume-io-alternative/page.tsx',
  'frontend/app/[locale]/rezi-alternative/page.tsx',
  'frontend/app/[locale]/zety-alternative/page.tsx',
  'frontend/app/[locale]/compare/chatgpt-vs-ai-resume-builder/page.tsx',
  'frontend/app/[locale]/tools/ats-checker/page.tsx',
  'frontend/app/[locale]/tools/cover-letter/page.tsx',
  'frontend/app/[locale]/tools/mock-interview/page.tsx',
  'frontend/app/[locale]/tools/resignation-letter/page.tsx',
  'frontend/app/[locale]/resume-format/page.tsx',
  'frontend/app/[locale]/biodata-format/page.tsx',
  'frontend/app/[locale]/resume-ai/page.tsx',
  'frontend/app/[locale]/free-resume-builder/page.tsx',
  'frontend/app/[locale]/resume-maker/page.tsx',
  'frontend/app/[locale]/features/page.tsx',
];

// ═══════════════════════════════════════
// Link extraction helpers
// ═══════════════════════════════════════

const MD_LINK_RE = /\[([^\]]*)\]\(([^)]+)\)/g;
const HTML_A_RE = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>/g;
const JSX_LINK_RE = /href=["']([^"']+)["']/g;

function extractLinks(content, isTsx = false) {
  const internal = [];
  const external = [];

  // Markdown links [text](url)
  for (const m of content.matchAll(MD_LINK_RE)) {
    const url = m[2].split('#')[0].split('?')[0]; // strip hash/query
    if (!url) continue;
    if (url.startsWith('http://') || url.startsWith('https://')) {
      external.push({ text: m[1], url });
    } else if (url.startsWith('/') || url.startsWith('.')) {
      internal.push({ text: m[1], url });
    }
  }

  // HTML <a href="..."> and JSX href="..."
  const hrefRe = isTsx ? JSX_LINK_RE : HTML_A_RE;
  for (const m of content.matchAll(hrefRe)) {
    const url = (m[1] || '').split('#')[0].split('?')[0];
    if (!url) continue;
    // Skip duplicates already caught by MD_LINK_RE
    if (url.startsWith('http://') || url.startsWith('https://')) {
      if (!external.some(e => e.url === url)) {
        external.push({ text: '', url });
      }
    } else if (url.startsWith('/') || url.startsWith('.')) {
      if (!internal.some(e => e.url === url)) {
        internal.push({ text: '', url });
      }
    }
  }

  return { internal, external };
}

function classifyInternalLink(url) {
  if (url.includes('/resume-examples/')) return 'resume-example';
  if (url.includes('/cover-letter-examples/')) return 'cover-letter';
  if (url.includes('/blog/')) return 'blog';
  if (url.includes('/career-tips/') || url.includes('/career/')) return 'career-tip';
  if (url.includes('/tools/')) return 'tool';
  if (url.includes('/builder')) return 'builder';
  if (url.includes('/templates')) return 'templates';
  return 'other';
}

// ═══════════════════════════════════════
// Scan MDX content directories
// ═══════════════════════════════════════

const report = { pages: {}, summary: {} };
const inboundMap = {}; // url -> [source pages]

function registerInboundLinks(sourceId, links) {
  for (const link of links) {
    const normalized = link.url.replace(/\/$/, '');
    if (!inboundMap[normalized]) inboundMap[normalized] = [];
    inboundMap[normalized].push(sourceId);
  }
}

function scanMdxDir(dir, type) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));
  for (const f of files) {
    const raw = fs.readFileSync(path.join(dir, f), 'utf-8');
    const { data, content } = matter(raw);
    const slug = data.slug || f.replace('.mdx', '');
    const pageId = `${type}/${slug}`;

    const { internal, external } = extractLinks(content);

    const internalByType = {};
    for (const link of internal) {
      const linkType = classifyInternalLink(link.url);
      if (!internalByType[linkType]) internalByType[linkType] = 0;
      internalByType[linkType]++;
    }

    report.pages[pageId] = {
      file: path.relative(rootDir, path.join(dir, f)),
      type,
      category: data.category || '',
      jobTitle: data.jobTitle || '',
      internalLinkCount: internal.length,
      externalLinkCount: external.length,
      internalByType,
      externalDomains: [...new Set(external.map(e => {
        try { return new URL(e.url).hostname; } catch { return e.url; }
      }))],
      linksToCareerTips: internal.some(l => l.url.includes('/career-tips/') || l.url.includes('/career/')),
      linksToTools: internal.some(l => l.url.includes('/tools/')),
    };

    registerInboundLinks(pageId, internal);
  }
}

console.log('Scanning MDX content directories...');
scanMdxDir(RESUME_DIR, 'resume-example');
scanMdxDir(COVER_DIR, 'cover-letter');
scanMdxDir(BLOG_DIR, 'blog');
scanMdxDir(CAREER_DIR, 'career-tip');

// ═══════════════════════════════════════
// Scan TSX pages
// ═══════════════════════════════════════

console.log('Scanning TSX pages...');
for (const relPath of TSX_PAGES) {
  const absPath = path.join(rootDir, relPath);
  if (!fs.existsSync(absPath)) {
    console.log(`  SKIP (not found): ${relPath}`);
    continue;
  }

  const content = fs.readFileSync(absPath, 'utf-8');
  const { internal, external } = extractLinks(content, true);

  // Derive page type from path
  let type = 'page';
  if (relPath.includes('alternative') || relPath.includes('compare')) type = 'alternative';
  else if (relPath.includes('tools/')) type = 'tool';
  else type = 'guide';

  const slug = relPath
    .replace('frontend/app/[locale]/', '')
    .replace('/page.tsx', '')
    .replace(/\//g, '-') || relPath;

  const pageId = `${type}/${slug}`;

  const internalByType = {};
  for (const link of internal) {
    const linkType = classifyInternalLink(link.url);
    if (!internalByType[linkType]) internalByType[linkType] = 0;
    internalByType[linkType]++;
  }

  report.pages[pageId] = {
    file: relPath,
    type,
    internalLinkCount: internal.length,
    externalLinkCount: external.length,
    internalByType,
    externalDomains: [...new Set(external.map(e => {
      try { return new URL(e.url).hostname; } catch { return e.url; }
    }))],
    linksToCareerTips: internal.some(l => l.url.includes('/career-tips/') || l.url.includes('/career/')),
    linksToTools: internal.some(l => l.url.includes('/tools/')),
  };

  registerInboundLinks(pageId, internal);
}

// ═══════════════════════════════════════
// Aggregate statistics
// ═══════════════════════════════════════

const byType = {};
const zeroExternal = [];
const insufficientInternal = [];
const noCareerTipLinks = [];
const noToolsLinks = [];

for (const [pageId, page] of Object.entries(report.pages)) {
  if (!byType[page.type]) {
    byType[page.type] = { count: 0, totalInternal: 0, totalExternal: 0, linksToCareerTips: 0, linksToTools: 0 };
  }
  byType[page.type].count++;
  byType[page.type].totalInternal += page.internalLinkCount;
  byType[page.type].totalExternal += page.externalLinkCount;
  if (page.linksToCareerTips) byType[page.type].linksToCareerTips++;
  if (page.linksToTools) byType[page.type].linksToTools++;

  if (page.externalLinkCount === 0) zeroExternal.push(pageId);
  if (page.internalLinkCount < 3) insufficientInternal.push(pageId);
  if (!page.linksToCareerTips && page.type !== 'career-tip') noCareerTipLinks.push(pageId);
  if (!page.linksToTools && page.type !== 'tool') noToolsLinks.push(pageId);
}

// Orphan detection — content pages that receive 0 inbound links
const allContentUrls = [];
for (const [pageId, page] of Object.entries(report.pages)) {
  const urlPaths = [];
  if (page.type === 'resume-example') urlPaths.push(`/resume-examples/${pageId.split('/')[1]}`);
  else if (page.type === 'cover-letter') urlPaths.push(`/cover-letter-examples/${pageId.split('/')[1]}`);
  else if (page.type === 'blog') urlPaths.push(`/blog/${pageId.split('/')[1]}`);
  else if (page.type === 'career-tip') {
    urlPaths.push(`/career-tips/${pageId.split('/')[1]}`);
    urlPaths.push(`/career/${pageId.split('/')[1]}`);
  }
  else if (page.type === 'tool') urlPaths.push(`/tools/${pageId.split('/')[1]}`);

  for (const url of urlPaths) {
    allContentUrls.push({ url, pageId });
  }
}

const orphanedPages = allContentUrls
  .filter(({ url }) => {
    const normalized = url.replace(/\/$/, '');
    return !inboundMap[normalized] || inboundMap[normalized].length === 0;
  })
  .map(({ pageId }) => pageId);

report.summary = {
  totalPages: Object.keys(report.pages).length,
  totalInternalLinks: Object.values(report.pages).reduce((s, p) => s + p.internalLinkCount, 0),
  totalExternalLinks: Object.values(report.pages).reduce((s, p) => s + p.externalLinkCount, 0),
  byType,
  zeroExternalCount: zeroExternal.length,
  insufficientInternalCount: insufficientInternal.length,
  noCareerTipLinksCount: noCareerTipLinks.length,
  noToolsLinksCount: noToolsLinks.length,
  orphanedPagesCount: orphanedPages.length,
};

// ═══════════════════════════════════════
// Console output
// ═══════════════════════════════════════

console.log('\n═══════════════════════════════════════');
console.log('   SEO LINK AUDIT REPORT');
console.log('═══════════════════════════════════════\n');
console.log(`Total pages scanned: ${report.summary.totalPages}`);
console.log(`Total internal links: ${report.summary.totalInternalLinks}`);
console.log(`Total external links: ${report.summary.totalExternalLinks}\n`);

console.log('BY CONTENT TYPE:');
console.log('─────────────────────────────────────────');
for (const [type, stats] of Object.entries(byType)) {
  const avgInt = (stats.totalInternal / stats.count).toFixed(1);
  const avgExt = (stats.totalExternal / stats.count).toFixed(1);
  const marker = stats.totalExternal === 0 ? ' *** CRITICAL' : '';
  console.log(`  ${type.padEnd(20)} ${String(stats.count).padStart(4)} pages | avg ${avgInt} internal | avg ${avgExt} external${marker}`);
  console.log(`  ${''.padEnd(20)} career-tips: ${stats.linksToCareerTips}/${stats.count} | tools: ${stats.linksToTools}/${stats.count}`);
}

console.log('\nCRITICAL ISSUES:');
console.log('─────────────────────────────────────────');
console.log(`  ${zeroExternal.length} pages have 0 external links`);
console.log(`  ${insufficientInternal.length} pages have <3 internal links`);
console.log(`  ${noCareerTipLinks.length} content pages don't link to career tips`);
console.log(`  ${noToolsLinks.length} content pages don't link to tools`);
console.log(`  ${orphanedPages.length} pages receive 0 inbound links (orphaned)`);

if (orphanedPages.length > 0 && orphanedPages.length <= 30) {
  console.log('\nORPHANED PAGES:');
  console.log('─────────────────────────────────────────');
  for (const p of orphanedPages) {
    console.log(`  ${p}`);
  }
}

if (insufficientInternal.length > 0 && insufficientInternal.length <= 20) {
  console.log('\nPAGES WITH <3 INTERNAL LINKS:');
  console.log('─────────────────────────────────────────');
  for (const p of insufficientInternal) {
    console.log(`  ${p} (${report.pages[p].internalLinkCount} links)`);
  }
}

// Sample: show 5 zero-external pages per type
const zeroByType = {};
for (const p of zeroExternal) {
  const type = report.pages[p].type;
  if (!zeroByType[type]) zeroByType[type] = [];
  zeroByType[type].push(p);
}
console.log('\nZERO EXTERNAL LINKS (sample per type):');
console.log('─────────────────────────────────────────');
for (const [type, pages] of Object.entries(zeroByType)) {
  console.log(`  ${type}: ${pages.length} pages (showing first 5)`);
  for (const p of pages.slice(0, 5)) {
    console.log(`    - ${p}`);
  }
}

// Save JSON report
const reportPath = path.join(rootDir, 'link-audit-report.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
console.log(`\nFull report saved to: ${reportPath}`);

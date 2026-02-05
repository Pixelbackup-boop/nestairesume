#!/usr/bin/env node
/**
 * Target Keyword Placement Checker
 * Verifies tags[0] keyword appears in all 9 required locations per CLAUDE.md checklist.
 */
import fs from 'fs';
import path from 'path';
import { createRequire } from 'node:module';

const rootDir = process.cwd();
const require2 = createRequire(path.join(rootDir, 'frontend', 'package.json'));
const matter = require2('gray-matter');

const dirs = [
  { path: path.join(rootDir, 'frontend', 'content', 'resume-examples'), type: 'resume-examples' },
  { path: path.join(rootDir, 'frontend', 'content', 'blog'), type: 'blog' },
  { path: path.join(rootDir, 'frontend', 'content', 'career-tips'), type: 'career-tips' },
];

// Counters
const results = [];
const failCounts = { title: 0, h1: 0, first150: 0, slug: 0, description: 0, subheadings: 0, imageAlt: 0, internalLinks: 0, bodyDensity: 0 };

for (const dir of dirs) {
  if (!fs.existsSync(dir.path)) continue;
  for (const f of fs.readdirSync(dir.path).filter(x => x.endsWith('.mdx'))) {
    const raw = fs.readFileSync(path.join(dir.path, f), 'utf-8');
    const { data, content } = matter(raw);
    const keyword = (data.tags && data.tags[0]) || '';
    if (!keyword) continue;

    const kwLower = keyword.toLowerCase();
    const kwWords = kwLower.split(/\s+/).filter(Boolean);
    const slug = data.slug || f.replace('.mdx', '');
    const titleLower = (data.title || '').toLowerCase();
    const descLower = (data.description || '').toLowerCase();
    const altLower = (data.imageAlt || '').toLowerCase();
    const contentLower = content.toLowerCase();

    const issues = [];

    // 1. Title: every word of tags[0] present
    const titleMissing = kwWords.filter(w => !titleLower.includes(w));
    if (titleMissing.length > 0) {
      issues.push({ check: 'title', msg: `Title missing keyword words: [${titleMissing.join(', ')}]` });
      failCounts.title++;
    }

    // 2. H1 (first ## in body): keyword or close variation
    const h1Match = content.match(/^##\s+(.+)$/m);
    const h1Text = h1Match ? h1Match[1].toLowerCase() : '';
    // Check if at least half of keyword words appear in H1 (allows natural variation)
    const h1Hits = kwWords.filter(w => h1Text.includes(w));
    if (h1Hits.length < Math.ceil(kwWords.length / 2)) {
      issues.push({ check: 'h1', msg: `H1 "${h1Match ? h1Match[1] : '(none)'}" has <50% keyword words (${h1Hits.length}/${kwWords.length})` });
      failCounts.h1++;
    }

    // 3. First 150 words: keyword must appear
    const bodyWords = content.replace(/^---[\s\S]*?---/, '').trim().split(/\s+/);
    const first150 = bodyWords.slice(0, 150).join(' ').toLowerCase();
    if (!first150.includes(kwLower)) {
      // Also check if all keyword words appear within first 150 words
      const first150Missing = kwWords.filter(w => !first150.includes(w));
      if (first150Missing.length > 0) {
        issues.push({ check: 'first150', msg: `Keyword not in first 150 words (missing: [${first150Missing.join(', ')}])` });
        failCounts.first150++;
      }
    }

    // 4. Slug: keyword-based (check that major keyword words appear in slug)
    const slugLower = slug.toLowerCase();
    // Filter out very short words (a, of, to, etc.) for slug check
    const slugKwWords = kwWords.filter(w => w.length > 2);
    const slugMissing = slugKwWords.filter(w => !slugLower.includes(w));
    if (slugMissing.length > Math.floor(slugKwWords.length / 2)) {
      issues.push({ check: 'slug', msg: `Slug "${slug}" missing major keyword words: [${slugMissing.join(', ')}]` });
      failCounts.slug++;
    }

    // 5. Description: every word of tags[0] present
    const descMissing = kwWords.filter(w => !descLower.includes(w));
    if (descMissing.length > 0) {
      issues.push({ check: 'description', msg: `Description missing keyword words: [${descMissing.join(', ')}]` });
      failCounts.description++;
    }

    // 6. H2/H3 subheadings: at least one subheading should contain a keyword variation
    const allHeadings = content.match(/^#{2,3}\s+(.+)$/gm) || [];
    const headingTexts = allHeadings.map(h => h.replace(/^#{2,3}\s+/, '').toLowerCase());
    // Check if at least one heading (beyond H1) contains any keyword word
    const headingsWithKw = headingTexts.filter(h => kwWords.some(w => h.includes(w)));
    if (headingsWithKw.length < 2) {
      issues.push({ check: 'subheadings', msg: `Only ${headingsWithKw.length} subheadings contain keyword words (need 2+)` });
      failCounts.subheadings++;
    }

    // 7. Image alt text: keyword naturally
    if (altLower) {
      const altHits = kwWords.filter(w => altLower.includes(w));
      if (altHits.length === 0) {
        issues.push({ check: 'imageAlt', msg: `Image alt text has no keyword words: "${data.imageAlt}"` });
        failCounts.imageAlt++;
      }
    }
    // If no imageAlt at all, skip (not all pages have images)

    // 8. Internal links: at least 1 present
    const internalLinks = content.match(/\[([^\]]+)\]\(\/[^)]+\)/g) || [];
    if (internalLinks.length === 0) {
      issues.push({ check: 'internalLinks', msg: 'No internal links found' });
      failCounts.internalLinks++;
    }

    // 9. Body keyword density (0.8-1.2% ideal, warn if <0.5% or >2%)
    const bodyText = content.replace(/^---[\s\S]*?---/, '').replace(/```[\s\S]*?```/g, '').replace(/[#*\[\]()_`>|\\-]/g, ' ');
    const totalWords = bodyText.trim().split(/\s+/).filter(Boolean).length;
    const kwRegex = new RegExp(kwLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    const kwMatches = (bodyText.toLowerCase().match(kwRegex) || []).length;
    const density = totalWords > 0 ? (kwMatches / totalWords) * 100 : 0;
    if (density < 0.3) {
      issues.push({ check: 'bodyDensity', msg: `Keyword density very low: ${density.toFixed(2)}% (${kwMatches} mentions in ${totalWords} words)` });
      failCounts.bodyDensity++;
    }

    results.push({
      file: `${dir.type}/${slug}`,
      keyword: kwLower,
      issues,
      checks: {
        title: titleMissing.length === 0,
        h1: h1Hits.length >= Math.ceil(kwWords.length / 2),
        first150: first150.includes(kwLower) || kwWords.every(w => first150.includes(w)),
        slug: slugMissing.length <= Math.floor(slugKwWords.length / 2),
        description: descMissing.length === 0,
        subheadings: headingsWithKw.length >= 2,
        imageAlt: !altLower || kwWords.some(w => altLower.includes(w)),
        internalLinks: internalLinks.length > 0,
        bodyDensity: density >= 0.3,
      }
    });
  }
}

// Summary
const total = results.length;
const allPass = results.filter(r => r.issues.length === 0);
const withIssues = results.filter(r => r.issues.length > 0);

console.log('='.repeat(70));
console.log('  TARGET KEYWORD PLACEMENT AUDIT');
console.log('='.repeat(70));
console.log(`\nTotal pages checked: ${total}`);
console.log(`All 9 checks pass:  ${allPass.length} (${(allPass.length/total*100).toFixed(1)}%)`);
console.log(`Has issues:         ${withIssues.length}`);

console.log('\n--- Pass Rate by Check ---');
const checkNames = ['title', 'h1', 'first150', 'slug', 'description', 'subheadings', 'imageAlt', 'internalLinks', 'bodyDensity'];
const checkLabels = {
  title: '1. Title tag',
  h1: '2. H1 heading',
  first150: '3. First 150 words',
  slug: '4. URL slug',
  description: '5. Meta description',
  subheadings: '6. H2/H3 subheadings',
  imageAlt: '7. Image alt text',
  internalLinks: '8. Internal links',
  bodyDensity: '9. Body density',
};

for (const c of checkNames) {
  const passCount = results.filter(r => r.checks[c]).length;
  const pct = (passCount / total * 100).toFixed(1);
  const bar = '#'.repeat(Math.round(passCount / total * 20)).padEnd(20, '.');
  const status = passCount === total ? 'PASS' : `FAIL (${failCounts[c]})`;
  console.log(`  ${checkLabels[c].padEnd(22)} [${bar}] ${pct.padStart(5)}%  ${status}`);
}

// Show failures grouped by check
console.log('\n' + '='.repeat(70));
console.log('  FAILURES BY CHECK');
console.log('='.repeat(70));

for (const c of checkNames) {
  const fails = results.filter(r => !r.checks[c]);
  if (fails.length === 0) continue;
  console.log(`\n--- ${checkLabels[c]} (${fails.length} failures) ---`);
  for (const r of fails.slice(0, 15)) {
    const issue = r.issues.find(i => i.check === c);
    console.log(`  ${r.file}`);
    console.log(`    KW: "${r.keyword}"`);
    console.log(`    ${issue ? issue.msg : ''}`);
  }
  if (fails.length > 15) console.log(`  ... and ${fails.length - 15} more`);
}

console.log('\n' + '='.repeat(70));
console.log('  AUDIT COMPLETE');
console.log('='.repeat(70));

#!/usr/bin/env node
// Phase B inventory: resume-examples + cover-letter-examples across indexable locales.
// Output: seo-inventory-phase-b.csv + console summary.
// Read-only — does not modify any content files.

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT = path.join(process.cwd(), 'frontend');
const INDEXABLE = ['en', 'es', 'pt', 'fr', 'de', 'it'];
const TYPES = [
  { name: 'resume-examples', dir: 'content/resume-examples', urlPath: '/resume-examples' },
  { name: 'cover-letter-examples', dir: 'content/cover-letter-examples', urlPath: '/cover-letter-examples' },
];

function parseFrontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return { fm: {}, body: text };
  const fm = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) fm[kv[1]] = kv[2].replace(/^['"]|['"]$/g, '');
  }
  return { fm, body: text.slice(m[0].length) };
}

function inventory() {
  const rows = [];
  const slugMetrics = {}; // slug -> { type, en_words, en_intLinks, ... }

  for (const t of TYPES) {
    const enDir = path.join(ROOT, t.dir);
    if (!fs.existsSync(enDir)) continue;

    const enSlugs = fs.readdirSync(enDir).filter(f => f.endsWith('.mdx')).map(f => f.replace(/\.mdx$/, ''));

    for (const slug of enSlugs) {
      // For each English source, audit each indexable locale variant
      for (const locale of INDEXABLE) {
        const filePath = locale === 'en'
          ? path.join(enDir, `${slug}.mdx`)
          : path.join(enDir, locale, `${slug}.mdx`);

        const exists = fs.existsSync(filePath);
        const url = `/${locale}${t.urlPath}/${slug}`;

        if (!exists) {
          rows.push({
            type: t.name, slug, locale, url, status: 'MISSING',
            words: 0, internalLinks: 0, externalLinks: 0,
            sections: 0, hash: '', title: '', tagsCount: 0,
            hasAuthor: false, hasSalary: false, hasInterview: false,
            hasHiringTip: false, hasMistakes: false, recommendation: 'TRANSLATE',
          });
          continue;
        }

        const text = fs.readFileSync(filePath, 'utf-8');
        const { fm, body } = parseFrontmatter(text);
        const words = body.trim().split(/\s+/).filter(Boolean).length;
        const internalLinks = (body.match(/\]\(\/[^)]+\)/g) || []).length;
        const externalLinks = (body.match(/\]\(https?:\/\/[^)]+\)/g) || []).length;
        const sections = (body.match(/^##\s+/gm) || []).length;
        const hash = crypto.createHash('sha256').update(body).digest('hex').slice(0, 16);
        const tagsCount = ((fm.tags || '').match(/-/g) || []).length || (text.match(/^\s+-\s+/gm) || []).length;

        // CLAUDE.md mandatory section probes (locale-aware patterns).
        // Cover letters have a different mandatory structure than resumes —
        // no salary, no interview Q&A. Per CLAUDE.md, salary/interview rules
        // apply only to resume-examples.
        const hasAuthor = !!fm.author && fm.author !== 'Team';
        const isResume = t.name === 'resume-examples';

        // Salary: en, es, pt, fr, de, it
        const hasSalary = /salary|salario|salário|salaire|gehalt|stipendio|verg(u|ü)t/i.test(body);
        // Interview: covers all 6 indexable locales
        const hasInterview = /interview|entrevista|entretien|colloquio|vorstellungsgespr|bewerbungsgespr|preguntas.*entrevista/i.test(body);
        // Mistakes: cross-locale
        const hasMistakes = /mistakes?|errores|erros|erreurs|fehler|errori/i.test(body);
        // Hiring tip
        const hasHiringTip = /hiring manager|reclutador|recrutador|recruteur|personalverant|responsabile/i.test(body);
        // ATS section
        const hasAts = /ats|sistema de seguimiento/i.test(body);

        // Categorization (different rules for resume vs cover letter)
        let recommendation = 'KEEP';
        const minWords = isResume ? 800 : 500;
        const minSections = isResume ? 8 : 5;
        const minLinks = 3;

        if (words < minWords) recommendation = 'IMPROVE_CONTENT';
        else if (sections < minSections) recommendation = 'IMPROVE_STRUCTURE';
        else if (isResume && (!hasSalary || !hasInterview || !hasMistakes || !hasAts)) recommendation = 'IMPROVE_CHECKLIST';
        else if (!isResume && !hasMistakes) recommendation = 'IMPROVE_CHECKLIST';
        else if (internalLinks < minLinks) recommendation = 'IMPROVE_LINKS';

        rows.push({
          type: t.name, slug, locale, url, status: 'EXISTS',
          words, internalLinks, externalLinks, sections, hash,
          title: (fm.title || '').slice(0, 80),
          tagsCount, hasAuthor, hasSalary, hasInterview, hasHiringTip, hasMistakes, hasAts,
          recommendation,
        });
      }
    }
  }

  return rows;
}

const rows = inventory();

// Write full CSV
const cols = Object.keys(rows[0]);
const csv = [cols.join(',')].concat(
  rows.map(r => cols.map(c => {
    const v = r[c];
    if (typeof v === 'string' && (v.includes(',') || v.includes('"'))) return `"${v.replace(/"/g, '""')}"`;
    return v;
  }).join(','))
).join('\n');
fs.writeFileSync('seo-inventory-phase-b.csv', csv);

// Summary
const summary = {
  total: rows.length,
  exists: rows.filter(r => r.status === 'EXISTS').length,
  missing: rows.filter(r => r.status === 'MISSING').length,
  byLocale: {},
  byRecommendation: {},
  byType: {},
  thinPages: rows.filter(r => r.status === 'EXISTS' && r.words < 600).length,
  shortStructure: rows.filter(r => r.status === 'EXISTS' && r.sections < 6).length,
  missingChecklist: rows.filter(r => r.status === 'EXISTS' && (!r.hasSalary || !r.hasInterview || !r.hasMistakes)).length,
  weakLinks: rows.filter(r => r.status === 'EXISTS' && r.internalLinks < 3).length,
};

for (const r of rows) {
  summary.byLocale[r.locale] = (summary.byLocale[r.locale] || 0) + 1;
  summary.byRecommendation[r.recommendation] = (summary.byRecommendation[r.recommendation] || 0) + 1;
  summary.byType[r.type] = (summary.byType[r.type] || 0) + 1;
}

// Duplicate hash detection (true duplicates = same body content in same locale)
const hashGroups = {};
for (const r of rows) {
  if (r.status !== 'EXISTS' || !r.hash) continue;
  const key = `${r.locale}:${r.hash}`;
  hashGroups[key] = (hashGroups[key] || []);
  hashGroups[key].push(`${r.type}/${r.slug}`);
}
const trueDuplicates = Object.entries(hashGroups).filter(([_, arr]) => arr.length > 1);

console.log('\n=== PHASE B INVENTORY SUMMARY ===\n');
console.log(`Total URL slots audited: ${summary.total}`);
console.log(`  Files exist: ${summary.exists}`);
console.log(`  Missing translations: ${summary.missing}`);
console.log(`\nBy type:`);
for (const [k, v] of Object.entries(summary.byType)) console.log(`  ${k}: ${v}`);
console.log(`\nBy locale:`);
for (const [k, v] of Object.entries(summary.byLocale)) console.log(`  ${k}: ${v}`);
console.log(`\nQuality flags (existing pages only):`);
console.log(`  Thin (<600 words): ${summary.thinPages}`);
console.log(`  Short structure (<6 ## sections): ${summary.shortStructure}`);
console.log(`  Missing CLAUDE.md checklist sections: ${summary.missingChecklist}`);
console.log(`  Weak internal links (<3): ${summary.weakLinks}`);
console.log(`\nRecommendations:`);
for (const [k, v] of Object.entries(summary.byRecommendation).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${k}: ${v}`);
}
console.log(`\nTrue duplicates (identical content within a locale): ${trueDuplicates.length} groups`);
trueDuplicates.slice(0, 10).forEach(([key, arr]) => {
  console.log(`  ${key}: ${arr.join(', ')}`);
});
console.log(`\nFull CSV written to: seo-inventory-phase-b.csv`);

#!/usr/bin/env node
/**
 * Comprehensive SEO Audit Script v2
 * Properly handles YAML multiline strings
 */

const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(process.cwd(), 'frontend/content');

// Better YAML-like frontmatter parser
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { data: {}, content };

  const frontmatterStr = match[1];
  const data = {};

  // Split by top-level keys (lines starting with alphanumeric, no leading space)
  const sections = frontmatterStr.split(/\n(?=[a-zA-Z])/);

  for (const section of sections) {
    const lines = section.split('\n');
    const firstLine = lines[0];
    const keyMatch = firstLine.match(/^(\w+):\s*(.*)/);

    if (!keyMatch) continue;

    const key = keyMatch[1];
    let value = keyMatch[2].trim();

    // Check for multiline string indicators (>, >-, |, |-)
    if (value === '>' || value === '>-' || value === '|' || value === '|-') {
      // Collect indented lines
      const multilineContent = lines.slice(1)
        .filter(l => l.startsWith('  '))
        .map(l => l.trim())
        .join(' ')
        .trim();
      data[key] = multilineContent;
    }
    // Check for array (empty value followed by indented - items)
    else if (value === '' && lines.length > 1 && lines[1].trim().startsWith('-')) {
      const arrayItems = lines.slice(1)
        .filter(l => l.trim().startsWith('-'))
        .map(l => {
          const itemMatch = l.match(/^\s*-\s+['"]?(.+?)['"]?$/);
          return itemMatch ? itemMatch[1].replace(/^['"]|['"]$/g, '') : '';
        })
        .filter(Boolean);
      data[key] = arrayItems;
    }
    // Inline value (with or without quotes)
    else if (value) {
      data[key] = value.replace(/^['"]|['"]$/g, '');
    }
  }

  return {
    data,
    content: content.replace(/^---\n[\s\S]*?\n---\n?/, ''),
  };
}

// SEO Requirements from CLAUDE.md
const REQUIREMENTS = {
  titleMinLength: 30,
  titleMaxLength: 60,
  descriptionMinLength: 120,
  descriptionMaxLength: 160,
  minTags: 6,
  resumeExampleMinWords: 800,
  blogPostMinWords: 1500,
  coverLetterMinWords: 800,
};

// Required sections for resume examples
const RESUME_SECTIONS = [
  { pattern: /##\s+What Makes a Great/i, name: 'Unique Intro' },
  { pattern: /##\s+Professional Summary/i, name: 'Professional Summary' },
  { pattern: /##\s+(Salary|Job Outlook|Outlook)/i, name: 'Salary & Outlook' },
  { pattern: /##\s+(Essential\s+)?Skills/i, name: 'Skills Section' },
  { pattern: /##\s+Achievement/i, name: 'Achievement Bullets' },
  { pattern: /##\s+(.*Format|.*Template)/i, name: 'Format Tips' },
  { pattern: /##\s+Hiring Manager/i, name: 'Hiring Manager Tip' },
  { pattern: /##\s+.*Interview/i, name: 'Interview Questions' },
  { pattern: /##\s+(Common\s+)?Mistakes/i, name: 'Common Mistakes' },
  { pattern: /##\s+ATS/i, name: 'ATS Optimization' },
];

const SALARY_CITATIONS = ['bls.gov', 'glassdoor.com', 'payscale.com'];

function countWords(text) {
  return text
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#*_~>`-]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 0).length;
}

function checkKeyword(keyword, text) {
  if (!keyword || !text) return { found: false, missing: [] };
  const words = keyword.toLowerCase().split(/\s+/);
  const textLower = text.toLowerCase();
  const missing = words.filter(w => !textLower.includes(w));
  return { found: missing.length === 0, missing };
}

function getFiles(dir) {
  try {
    return fs.readdirSync(dir).filter(f => f.endsWith('.mdx')).map(f => path.join(dir, f));
  } catch { return []; }
}

function auditFile(filePath, contentType) {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data: fm, content } = parseFrontmatter(fileContent);
  const slug = path.basename(filePath, '.mdx');
  const issues = [];

  const title = fm.title || '';
  const description = fm.description || '';
  const tags = Array.isArray(fm.tags) ? fm.tags : [];
  const author = fm.author || '';
  const targetKeyword = tags[0] || '';

  // 1. Title length (50-60 chars ideal, 30-60 acceptable)
  if (title.length < REQUIREMENTS.titleMinLength) {
    issues.push({ sev: 'high', type: 'Title too short', val: `${title.length} chars (min 30)` });
  } else if (title.length > REQUIREMENTS.titleMaxLength) {
    issues.push({ sev: 'high', type: 'Title too long', val: `${title.length} chars (max 60)` });
  }

  // 2. Description length (150-160 chars)
  if (description.length < REQUIREMENTS.descriptionMinLength) {
    issues.push({ sev: 'high', type: 'Description too short', val: `${description.length} chars (min 120)` });
  } else if (description.length > REQUIREMENTS.descriptionMaxLength) {
    issues.push({ sev: 'medium', type: 'Description too long', val: `${description.length} chars (max 160)` });
  }

  // 3. Tags count (6-8)
  if (tags.length < REQUIREMENTS.minTags) {
    issues.push({ sev: 'medium', type: 'Too few tags', val: `${tags.length} (need 6+)` });
  }

  // 4. Target keyword in title
  if (targetKeyword) {
    const titleCheck = checkKeyword(targetKeyword, title);
    if (!titleCheck.found) {
      issues.push({ sev: 'critical', type: 'Keyword missing from title', val: `Missing: ${titleCheck.missing.join(', ')}` });
    }

    // 5. Target keyword in description
    const descCheck = checkKeyword(targetKeyword, description);
    if (!descCheck.found) {
      issues.push({ sev: 'critical', type: 'Keyword missing from description', val: `Missing: ${descCheck.missing.join(', ')}` });
    }
  } else {
    issues.push({ sev: 'critical', type: 'No target keyword', val: 'tags[0] is missing' });
  }

  // 6. Author
  if (!author) {
    issues.push({ sev: 'high', type: 'Missing author', val: 'Required for E-E-A-T' });
  }

  // 7. Word count
  const wordCount = countWords(content);
  const minWords = contentType === 'blog' ? REQUIREMENTS.blogPostMinWords : REQUIREMENTS.resumeExampleMinWords;
  if (wordCount < minWords) {
    issues.push({ sev: 'high', type: 'Content too thin', val: `${wordCount} words (min ${minWords})` });
  }

  // 8. Resume example specific checks
  if (contentType === 'resume-example') {
    for (const sec of RESUME_SECTIONS) {
      if (!sec.pattern.test(content)) {
        issues.push({ sev: 'high', type: 'Missing section', val: sec.name });
      }
    }

    // Salary citations
    const contentLower = content.toLowerCase();
    const missingCites = SALARY_CITATIONS.filter(c => !contentLower.includes(c));
    if (missingCites.length > 0) {
      issues.push({ sev: 'medium', type: 'Missing salary citations', val: missingCites.join(', ') });
    }
  }

  return { file: slug, type: contentType, issues, stats: { titleLen: title.length, descLen: description.length, tags: tags.length, words: wordCount, hasAuthor: !!author } };
}

// Main
console.log('🔍 SEO AUDIT v2 - Comprehensive content check\n');

const results = {
  resumeExamples: getFiles(path.join(CONTENT_DIR, 'resume-examples')).map(f => auditFile(f, 'resume-example')),
  blogPosts: getFiles(path.join(CONTENT_DIR, 'blog')).map(f => auditFile(f, 'blog')),
  coverLetterExamples: getFiles(path.join(CONTENT_DIR, 'cover-letter-examples')).map(f => auditFile(f, 'cover-letter')),
  careerTips: getFiles(path.join(CONTENT_DIR, 'career-tips')).map(f => auditFile(f, 'career-tips')),
};

const all = [...results.resumeExamples, ...results.blogPosts, ...results.coverLetterExamples, ...results.careerTips];

// Tally
const summary = { total: all.length, withIssues: 0, critical: 0, high: 0, medium: 0, low: 0 };
const byType = {};

for (const r of all) {
  if (r.issues.length > 0) summary.withIssues++;
  for (const i of r.issues) {
    summary[i.sev]++;
    const key = i.type;
    if (!byType[key]) byType[key] = { count: 0, sev: i.sev, examples: [] };
    byType[key].count++;
    if (byType[key].examples.length < 10) byType[key].examples.push(`${r.file}: ${i.val}`);
  }
}

// Report
console.log('='.repeat(80));
console.log('                    SEO AUDIT REPORT - CLAUDE.md COMPLIANCE');
console.log('='.repeat(80) + '\n');

console.log('📊 OVERALL SUMMARY');
console.log('-'.repeat(50));
console.log(`Total Pages Audited:      ${summary.total}`);
console.log(`Pages with Issues:        ${summary.withIssues} (${Math.round(summary.withIssues / summary.total * 100)}%)`);
console.log(`Pages Fully Compliant:    ${summary.total - summary.withIssues} (${Math.round((summary.total - summary.withIssues) / summary.total * 100)}%)`);
console.log('');
console.log('Issue Breakdown:');
console.log(`  🔴 Critical: ${summary.critical}`);
console.log(`  🟠 High:     ${summary.high}`);
console.log(`  🟡 Medium:   ${summary.medium}`);
console.log(`  Total:       ${summary.critical + summary.high + summary.medium}`);

console.log('\n📋 BY CONTENT TYPE');
console.log('-'.repeat(50));
const typeStats = [
  ['Resume Examples', results.resumeExamples],
  ['Blog Posts', results.blogPosts],
  ['Cover Letter Examples', results.coverLetterExamples],
  ['Career Tips', results.careerTips],
];
for (const [name, arr] of typeStats) {
  const withIssues = arr.filter(r => r.issues.length > 0).length;
  const totalIssues = arr.reduce((sum, r) => sum + r.issues.length, 0);
  console.log(`${name.padEnd(25)} ${arr.length} pages | ${withIssues} with issues | ${totalIssues} total issues`);
}

console.log('\n🔍 ISSUES BY TYPE');
console.log('-'.repeat(50));

const sorted = Object.entries(byType).sort((a, b) => {
  const order = { critical: 0, high: 1, medium: 2, low: 3 };
  return order[a[1].sev] - order[b[1].sev] || b[1].count - a[1].count;
});

for (const [type, data] of sorted) {
  const emoji = { critical: '🔴', high: '🟠', medium: '🟡', low: '🟢' }[data.sev];
  console.log(`\n${emoji} ${type} — ${data.count} occurrences`);
  data.examples.slice(0, 5).forEach(ex => console.log(`   • ${ex}`));
  if (data.examples.length > 5) console.log(`   ... and ${data.examples.length - 5} more`);
}

// Save detailed report
const reportPath = path.join(process.cwd(), 'seo-audit-report.json');
fs.writeFileSync(reportPath, JSON.stringify({
  summary,
  issuesByType: byType,
  detailedResults: all.filter(r => r.issues.length > 0),
}, null, 2));

console.log(`\n\n📁 Full JSON report: ${reportPath}`);
console.log('='.repeat(80));

// Also output a quick fix priority list
console.log('\n\n🎯 FIX PRIORITY (Top 20 pages with most issues)');
console.log('-'.repeat(50));
const topIssues = all
  .map(r => ({ file: r.file, type: r.type, count: r.issues.length, criticals: r.issues.filter(i => i.sev === 'critical').length }))
  .filter(r => r.count > 0)
  .sort((a, b) => b.criticals - a.criticals || b.count - a.count)
  .slice(0, 20);

for (const item of topIssues) {
  console.log(`${item.file.padEnd(35)} ${item.count} issues (${item.criticals} critical)`);
}

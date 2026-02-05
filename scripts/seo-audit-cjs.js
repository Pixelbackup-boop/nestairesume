#!/usr/bin/env node
/**
 * Comprehensive SEO Audit Script (CommonJS version)
 * Checks all content pages against CLAUDE.md SEO guidelines
 */

const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(process.cwd(), 'frontend/content');

// Parse frontmatter manually
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { data: {}, content };

  const frontmatterStr = match[1];
  const data = {};

  // Parse YAML-like frontmatter
  const lines = frontmatterStr.split('\n');
  let currentKey = null;
  let inArray = false;
  let arrayValues = [];

  for (const line of lines) {
    // Array item
    if (line.match(/^\s*-\s+(.+)/)) {
      const value = line.match(/^\s*-\s+['"]?(.+?)['"]?$/)?.[1] || line.match(/^\s*-\s+(.+)/)[1];
      if (inArray && currentKey) {
        arrayValues.push(value.replace(/^['"]|['"]$/g, ''));
      }
      continue;
    }

    // Key-value pair
    const kvMatch = line.match(/^(\w+):\s*(.*)/);
    if (kvMatch) {
      // Save previous array
      if (inArray && currentKey) {
        data[currentKey] = arrayValues;
      }

      currentKey = kvMatch[1];
      const value = kvMatch[2].trim();

      if (value === '' || value === '|') {
        // Array or multiline starts
        inArray = true;
        arrayValues = [];
      } else {
        inArray = false;
        data[currentKey] = value.replace(/^['"]|['"]$/g, '');
      }
    }
  }

  // Save last array
  if (inArray && currentKey) {
    data[currentKey] = arrayValues;
  }

  return {
    data,
    content: content.replace(/^---\n[\s\S]*?\n---\n?/, ''),
  };
}

// SEO Requirements
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
const RESUME_EXAMPLE_SECTIONS = [
  { pattern: /##\s+What Makes a Great.*Resume/i, name: 'Unique Intro (What Makes a Great...)' },
  { pattern: /##\s+Professional Summary/i, name: 'Professional Summary Examples' },
  { pattern: /##\s+Salary|##\s+.*Outlook/i, name: 'Salary & Job Outlook' },
  { pattern: /##\s+(Essential\s+)?Skills/i, name: 'Skills Section' },
  { pattern: /##\s+Achievement/i, name: 'Achievement Bullets' },
  { pattern: /##\s+.*Format|##\s+.*Template/i, name: 'Format/Template Tips' },
  { pattern: /##\s+Hiring Manager/i, name: 'Hiring Manager Tip' },
  { pattern: /##\s+.*Interview/i, name: 'Interview Questions' },
  { pattern: /##\s+(Common\s+)?Mistakes/i, name: 'Common Mistakes' },
  { pattern: /##\s+ATS/i, name: 'ATS Optimization' },
];

// Salary citation patterns
const SALARY_CITATIONS = [
  { pattern: /bls\.gov/i, name: 'BLS' },
  { pattern: /glassdoor\.com/i, name: 'Glassdoor' },
  { pattern: /payscale\.com/i, name: 'PayScale' },
];

function countWords(text) {
  const cleanText = text
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#*_~>`-]/g, ' ')
    .trim();

  return cleanText.split(/\s+/).filter(w => w.length > 0).length;
}

function checkKeywordInText(keyword, text) {
  if (!keyword || !text) return { found: false, missingWords: [] };

  const keywordWords = keyword.toLowerCase().split(/\s+/);
  const textLower = text.toLowerCase();
  const missingWords = keywordWords.filter(word => !textLower.includes(word));

  return { found: missingWords.length === 0, missingWords };
}

function getFiles(dir) {
  try {
    return fs.readdirSync(dir).filter(f => f.endsWith('.mdx')).map(f => path.join(dir, f));
  } catch (e) {
    return [];
  }
}

function auditFile(filePath, contentType) {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data: frontmatter, content } = parseFrontmatter(fileContent);
  const slug = path.basename(filePath, '.mdx');
  const issues = [];

  // 1. Title length
  const title = frontmatter.title || '';
  if (title.length < REQUIREMENTS.titleMinLength) {
    issues.push({ severity: 'high', type: 'Title too short', value: `${title.length} chars` });
  }
  if (title.length > REQUIREMENTS.titleMaxLength) {
    issues.push({ severity: 'high', type: 'Title too long', value: `${title.length} chars` });
  }

  // 2. Description length
  const description = frontmatter.description || '';
  if (description.length < REQUIREMENTS.descriptionMinLength) {
    issues.push({ severity: 'high', type: 'Description too short', value: `${description.length} chars` });
  }
  if (description.length > REQUIREMENTS.descriptionMaxLength) {
    issues.push({ severity: 'medium', type: 'Description too long', value: `${description.length} chars` });
  }

  // 3. Tags
  const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : [];
  if (tags.length < REQUIREMENTS.minTags) {
    issues.push({ severity: 'medium', type: 'Too few tags', value: `${tags.length} tags` });
  }

  // 4. Target keyword checks
  const targetKeyword = tags[0] || '';
  if (targetKeyword) {
    const titleCheck = checkKeywordInText(targetKeyword, title);
    if (!titleCheck.found) {
      issues.push({
        severity: 'critical',
        type: 'Keyword missing from title',
        value: `Missing: ${titleCheck.missingWords.join(', ')}`,
      });
    }

    const descCheck = checkKeywordInText(targetKeyword, description);
    if (!descCheck.found) {
      issues.push({
        severity: 'critical',
        type: 'Keyword missing from description',
        value: `Missing: ${descCheck.missingWords.join(', ')}`,
      });
    }
  } else {
    issues.push({ severity: 'critical', type: 'No target keyword (tags[0])', value: 'N/A' });
  }

  // 5. Author
  if (!frontmatter.author) {
    issues.push({ severity: 'high', type: 'Missing author', value: 'No author in frontmatter' });
  }

  // 6. Word count
  const wordCount = countWords(content);
  let minWords = REQUIREMENTS.resumeExampleMinWords;
  if (contentType === 'blog') minWords = REQUIREMENTS.blogPostMinWords;

  if (wordCount < minWords) {
    issues.push({ severity: 'high', type: 'Content too thin', value: `${wordCount} words (min: ${minWords})` });
  }

  // 7. Resume example sections
  if (contentType === 'resume-example') {
    for (const section of RESUME_EXAMPLE_SECTIONS) {
      if (!section.pattern.test(content)) {
        issues.push({ severity: 'high', type: 'Missing section', value: section.name });
      }
    }

    // Salary citations
    const missingSalaryCitations = SALARY_CITATIONS.filter(c => !c.pattern.test(content));
    if (missingSalaryCitations.length > 0) {
      issues.push({
        severity: 'medium',
        type: 'Missing salary citations',
        value: missingSalaryCitations.map(c => c.name).join(', '),
      });
    }
  }

  return { file: slug, contentType, issues, stats: { titleLen: title.length, descLen: description.length, tags: tags.length, words: wordCount } };
}

// Run audit
console.log('🔍 SEO AUDIT - Checking all content pages...\n');

const results = {
  resumeExamples: getFiles(path.join(CONTENT_DIR, 'resume-examples')).map(f => auditFile(f, 'resume-example')),
  blogPosts: getFiles(path.join(CONTENT_DIR, 'blog')).map(f => auditFile(f, 'blog')),
  coverLetterExamples: getFiles(path.join(CONTENT_DIR, 'cover-letter-examples')).map(f => auditFile(f, 'cover-letter')),
  careerTips: getFiles(path.join(CONTENT_DIR, 'career-tips')).map(f => auditFile(f, 'career-tips')),
};

const allResults = [...results.resumeExamples, ...results.blogPosts, ...results.coverLetterExamples, ...results.careerTips];

// Summary
const summary = {
  totalPages: allResults.length,
  pagesWithIssues: allResults.filter(r => r.issues.length > 0).length,
  critical: 0, high: 0, medium: 0, low: 0,
};

const issuesByType = {};

for (const result of allResults) {
  for (const issue of result.issues) {
    summary[issue.severity]++;
    if (!issuesByType[issue.type]) {
      issuesByType[issue.type] = { count: 0, severity: issue.severity, files: [] };
    }
    issuesByType[issue.type].count++;
    if (issuesByType[issue.type].files.length < 10) {
      issuesByType[issue.type].files.push(`${result.file}: ${issue.value}`);
    }
  }
}

// Print report
console.log('='.repeat(80));
console.log('                         SEO AUDIT REPORT');
console.log('='.repeat(80));
console.log('');
console.log('📊 SUMMARY');
console.log('-'.repeat(50));
console.log(`Total Pages Audited:      ${summary.totalPages}`);
console.log(`Pages with Issues:        ${summary.pagesWithIssues} (${Math.round(summary.pagesWithIssues / summary.totalPages * 100)}%)`);
console.log(`Pages Passing All Checks: ${summary.totalPages - summary.pagesWithIssues} (${Math.round((summary.totalPages - summary.pagesWithIssues) / summary.totalPages * 100)}%)`);
console.log('');
console.log(`🔴 Critical Issues:       ${summary.critical}`);
console.log(`🟠 High Issues:           ${summary.high}`);
console.log(`🟡 Medium Issues:         ${summary.medium}`);
console.log(`Total Issues:             ${summary.critical + summary.high + summary.medium}`);

console.log('\n📋 BY CONTENT TYPE');
console.log('-'.repeat(50));
console.log(`Resume Examples (306):       ${results.resumeExamples.filter(r => r.issues.length > 0).length} pages with issues`);
console.log(`Blog Posts (46):             ${results.blogPosts.filter(r => r.issues.length > 0).length} pages with issues`);
console.log(`Cover Letter Examples (100): ${results.coverLetterExamples.filter(r => r.issues.length > 0).length} pages with issues`);
console.log(`Career Tips (7):             ${results.careerTips.filter(r => r.issues.length > 0).length} pages with issues`);

console.log('\n🔍 ISSUES BY TYPE (sorted by severity & count)');
console.log('-'.repeat(50));

const sortedIssues = Object.entries(issuesByType).sort((a, b) => {
  const order = { critical: 0, high: 1, medium: 2, low: 3 };
  if (order[a[1].severity] !== order[b[1].severity]) return order[a[1].severity] - order[b[1].severity];
  return b[1].count - a[1].count;
});

for (const [type, data] of sortedIssues) {
  const emoji = { critical: '🔴', high: '🟠', medium: '🟡', low: '🟢' }[data.severity];
  console.log(`\n${emoji} ${type} (${data.count} occurrences)`);
  console.log('   Examples:');
  data.files.slice(0, 5).forEach(f => console.log(`   - ${f}`));
  if (data.files.length > 5) console.log(`   ... and ${data.files.length - 5} more`);
}

// Write JSON report
const reportPath = path.join(process.cwd(), 'seo-audit-report.json');
fs.writeFileSync(reportPath, JSON.stringify({ summary, issuesByType, results }, null, 2));
console.log(`\n\n📁 Full report saved to: ${reportPath}`);

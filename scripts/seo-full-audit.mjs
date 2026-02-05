#!/usr/bin/env node
/**
 * Comprehensive SEO Audit Script
 * Checks all content pages against CLAUDE.md SEO guidelines
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'frontend/content');

// SEO Requirements from CLAUDE.md
const REQUIREMENTS = {
  titleMinLength: 30,
  titleMaxLength: 60,
  descriptionMinLength: 120,
  descriptionMaxLength: 160,
  minTags: 6,
  maxTags: 8,
  resumeExampleMinWords: 800,
  blogPostMinWords: 1500,
  blogPostMaxWords: 2500,
  careerTipsMinWords: 800,
  coverLetterMinWords: 800,
};

// Required sections for resume examples
const RESUME_EXAMPLE_SECTIONS = [
  { pattern: /##\s+What Makes a Great.*Resume/i, name: 'Unique Intro' },
  { pattern: /##\s+Professional Summary Examples/i, name: 'Professional Summaries' },
  { pattern: /##\s+Salary.*Job Outlook|##\s+.*Salary.*Outlook/i, name: 'Salary & Job Outlook' },
  { pattern: /##\s+Essential Skills to Highlight/i, name: 'Skills Section' },
  { pattern: /##\s+Achievement-Focused Bullet Points/i, name: 'Achievement Bullets' },
  { pattern: /##\s+.*Resume Format.*Template Tips|##\s+.*Format.*Tips/i, name: 'Format Tips' },
  { pattern: /##\s+Hiring Manager Tip/i, name: 'Hiring Manager Tip' },
  { pattern: /##\s+Common.*Interview Questions/i, name: 'Interview Questions' },
  { pattern: /##\s+Common Mistakes to Avoid/i, name: 'Common Mistakes' },
  { pattern: /##\s+ATS Optimization/i, name: 'ATS Optimization' },
];

// Salary citation requirements
const SALARY_CITATIONS = [
  { pattern: /bls\.gov/i, name: 'BLS' },
  { pattern: /glassdoor\.com/i, name: 'Glassdoor' },
  { pattern: /payscale\.com/i, name: 'PayScale' },
];

const issues = {
  critical: [],
  high: [],
  medium: [],
  low: [],
};

function countWords(text) {
  // Remove frontmatter delimiters and code blocks
  const cleanText = text
    .replace(/^---[\s\S]*?---/m, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#*_~>`-]/g, ' ')
    .trim();

  const words = cleanText.split(/\s+/).filter(w => w.length > 0);
  return words.length;
}

function checkKeywordInText(keyword, text) {
  if (!keyword || !text) return { found: false, words: [] };

  const keywordWords = keyword.toLowerCase().split(/\s+/);
  const textLower = text.toLowerCase();
  const missingWords = keywordWords.filter(word => !textLower.includes(word));

  return {
    found: missingWords.length === 0,
    missingWords,
  };
}

function auditFile(filePath, contentType) {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data: frontmatter, content } = matter(fileContent);
  const slug = path.basename(filePath, '.mdx');
  const fileIssues = [];

  // 1. Check title length
  const title = frontmatter.title || '';
  if (title.length < REQUIREMENTS.titleMinLength) {
    fileIssues.push({
      severity: 'high',
      issue: `Title too short: ${title.length} chars (min: ${REQUIREMENTS.titleMinLength})`,
      value: title,
    });
  }
  if (title.length > REQUIREMENTS.titleMaxLength) {
    fileIssues.push({
      severity: 'high',
      issue: `Title too long: ${title.length} chars (max: ${REQUIREMENTS.titleMaxLength})`,
      value: title,
    });
  }

  // 2. Check description length
  const description = frontmatter.description || '';
  if (description.length < REQUIREMENTS.descriptionMinLength) {
    fileIssues.push({
      severity: 'high',
      issue: `Description too short: ${description.length} chars (min: ${REQUIREMENTS.descriptionMinLength})`,
      value: description.substring(0, 80) + '...',
    });
  }
  if (description.length > REQUIREMENTS.descriptionMaxLength) {
    fileIssues.push({
      severity: 'medium',
      issue: `Description too long: ${description.length} chars (max: ${REQUIREMENTS.descriptionMaxLength})`,
      value: description.substring(0, 80) + '...',
    });
  }

  // 3. Check tags count
  const tags = frontmatter.tags || [];
  if (tags.length < REQUIREMENTS.minTags) {
    fileIssues.push({
      severity: 'medium',
      issue: `Too few tags: ${tags.length} (min: ${REQUIREMENTS.minTags})`,
      value: tags.join(', '),
    });
  }

  // 4. Check target keyword (tags[0]) in title and description
  const targetKeyword = tags[0] || '';
  if (targetKeyword) {
    const titleCheck = checkKeywordInText(targetKeyword, title);
    if (!titleCheck.found) {
      fileIssues.push({
        severity: 'critical',
        issue: `Target keyword words missing from title`,
        value: `Missing: "${titleCheck.missingWords.join(', ')}" | Keyword: "${targetKeyword}"`,
      });
    }

    const descCheck = checkKeywordInText(targetKeyword, description);
    if (!descCheck.found) {
      fileIssues.push({
        severity: 'critical',
        issue: `Target keyword words missing from description`,
        value: `Missing: "${descCheck.missingWords.join(', ')}" | Keyword: "${targetKeyword}"`,
      });
    }
  } else {
    fileIssues.push({
      severity: 'critical',
      issue: 'No target keyword (tags[0]) defined',
      value: 'N/A',
    });
  }

  // 5. Check author
  if (!frontmatter.author) {
    fileIssues.push({
      severity: 'high',
      issue: 'Missing author attribution',
      value: 'No author in frontmatter',
    });
  }

  // 6. Check word count based on content type
  const wordCount = countWords(fileContent);
  let minWords = REQUIREMENTS.resumeExampleMinWords;

  if (contentType === 'blog') {
    minWords = REQUIREMENTS.blogPostMinWords;
  } else if (contentType === 'career-tips') {
    minWords = REQUIREMENTS.careerTipsMinWords;
  } else if (contentType === 'cover-letter') {
    minWords = REQUIREMENTS.coverLetterMinWords;
  }

  if (wordCount < minWords) {
    fileIssues.push({
      severity: 'high',
      issue: `Content too thin: ${wordCount} words (min: ${minWords})`,
      value: `Word count: ${wordCount}`,
    });
  }

  // 7. Resume example specific checks
  if (contentType === 'resume-example') {
    // Check required sections
    for (const section of RESUME_EXAMPLE_SECTIONS) {
      if (!section.pattern.test(content)) {
        fileIssues.push({
          severity: 'high',
          issue: `Missing required section: ${section.name}`,
          value: 'Section not found in content',
        });
      }
    }

    // Check salary citations
    const missingSalaryCitations = SALARY_CITATIONS.filter(
      cite => !cite.pattern.test(content)
    );
    if (missingSalaryCitations.length > 0) {
      fileIssues.push({
        severity: 'medium',
        issue: `Missing salary citations`,
        value: `Missing: ${missingSalaryCitations.map(c => c.name).join(', ')}`,
      });
    }
  }

  // 8. Check for keyword in first 150 words
  const first150Words = content.split(/\s+/).slice(0, 150).join(' ').toLowerCase();
  if (targetKeyword && !first150Words.includes(targetKeyword.toLowerCase().split(' ')[0])) {
    fileIssues.push({
      severity: 'medium',
      issue: 'Target keyword not in first 150 words',
      value: `Keyword: "${targetKeyword}"`,
    });
  }

  // 9. Check date freshness (should be 2025 or 2026)
  const dateStr = frontmatter.date || '';
  if (dateStr && !dateStr.includes('2025') && !dateStr.includes('2026')) {
    fileIssues.push({
      severity: 'low',
      issue: 'Content date may be outdated',
      value: `Date: ${dateStr}`,
    });
  }

  return {
    file: slug,
    path: filePath,
    contentType,
    issues: fileIssues,
    stats: {
      titleLength: title.length,
      descLength: description.length,
      tagCount: tags.length,
      wordCount,
      hasAuthor: !!frontmatter.author,
    },
  };
}

async function runAudit() {
  console.log('🔍 Starting comprehensive SEO audit...\n');

  const results = {
    resumeExamples: [],
    blogPosts: [],
    coverLetterExamples: [],
    careerTips: [],
  };

  // Audit Resume Examples
  console.log('📄 Auditing Resume Examples...');
  const resumeFiles = await glob(`${CONTENT_DIR}/resume-examples/*.mdx`);
  for (const file of resumeFiles) {
    results.resumeExamples.push(auditFile(file, 'resume-example'));
  }
  console.log(`   Found ${resumeFiles.length} files`);

  // Audit Blog Posts
  console.log('📝 Auditing Blog Posts...');
  const blogFiles = await glob(`${CONTENT_DIR}/blog/*.mdx`);
  for (const file of blogFiles) {
    results.blogPosts.push(auditFile(file, 'blog'));
  }
  console.log(`   Found ${blogFiles.length} files`);

  // Audit Cover Letter Examples
  console.log('✉️ Auditing Cover Letter Examples...');
  const coverLetterFiles = await glob(`${CONTENT_DIR}/cover-letter-examples/*.mdx`);
  for (const file of coverLetterFiles) {
    results.coverLetterExamples.push(auditFile(file, 'cover-letter'));
  }
  console.log(`   Found ${coverLetterFiles.length} files`);

  // Audit Career Tips
  console.log('💼 Auditing Career Tips...');
  const careerTipsFiles = await glob(`${CONTENT_DIR}/career-tips/*.mdx`);
  for (const file of careerTipsFiles) {
    results.careerTips.push(auditFile(file, 'career-tips'));
  }
  console.log(`   Found ${careerTipsFiles.length} files`);

  // Compile statistics
  const allResults = [
    ...results.resumeExamples,
    ...results.blogPosts,
    ...results.coverLetterExamples,
    ...results.careerTips,
  ];

  const summary = {
    totalPages: allResults.length,
    pagesWithIssues: allResults.filter(r => r.issues.length > 0).length,
    pagesWithoutIssues: allResults.filter(r => r.issues.length === 0).length,
    criticalIssues: 0,
    highIssues: 0,
    mediumIssues: 0,
    lowIssues: 0,
  };

  const issuesByType = {};

  for (const result of allResults) {
    for (const issue of result.issues) {
      summary[`${issue.severity}Issues`]++;

      const issueKey = issue.issue.split(':')[0];
      if (!issuesByType[issueKey]) {
        issuesByType[issueKey] = { count: 0, severity: issue.severity, examples: [] };
      }
      issuesByType[issueKey].count++;
      if (issuesByType[issueKey].examples.length < 5) {
        issuesByType[issueKey].examples.push({
          file: result.file,
          value: issue.value,
        });
      }
    }
  }

  // Generate report
  console.log('\n' + '='.repeat(80));
  console.log('                         SEO AUDIT REPORT');
  console.log('='.repeat(80) + '\n');

  console.log('📊 SUMMARY');
  console.log('-'.repeat(40));
  console.log(`Total Pages Audited:     ${summary.totalPages}`);
  console.log(`Pages with Issues:       ${summary.pagesWithIssues} (${Math.round(summary.pagesWithIssues/summary.totalPages*100)}%)`);
  console.log(`Pages without Issues:    ${summary.pagesWithoutIssues} (${Math.round(summary.pagesWithoutIssues/summary.totalPages*100)}%)`);
  console.log('');
  console.log(`🔴 Critical Issues:      ${summary.criticalIssues}`);
  console.log(`🟠 High Issues:          ${summary.highIssues}`);
  console.log(`🟡 Medium Issues:        ${summary.mediumIssues}`);
  console.log(`🟢 Low Issues:           ${summary.lowIssues}`);
  console.log(`   Total Issues:         ${summary.criticalIssues + summary.highIssues + summary.mediumIssues + summary.lowIssues}`);

  console.log('\n📋 BY CONTENT TYPE');
  console.log('-'.repeat(40));
  console.log(`Resume Examples:         ${results.resumeExamples.length} pages, ${results.resumeExamples.reduce((a, r) => a + r.issues.length, 0)} issues`);
  console.log(`Blog Posts:              ${results.blogPosts.length} pages, ${results.blogPosts.reduce((a, r) => a + r.issues.length, 0)} issues`);
  console.log(`Cover Letter Examples:   ${results.coverLetterExamples.length} pages, ${results.coverLetterExamples.reduce((a, r) => a + r.issues.length, 0)} issues`);
  console.log(`Career Tips:             ${results.careerTips.length} pages, ${results.careerTips.reduce((a, r) => a + r.issues.length, 0)} issues`);

  console.log('\n🔍 ISSUES BY TYPE');
  console.log('-'.repeat(40));

  const sortedIssues = Object.entries(issuesByType).sort((a, b) => {
    const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    if (severityOrder[a[1].severity] !== severityOrder[b[1].severity]) {
      return severityOrder[a[1].severity] - severityOrder[b[1].severity];
    }
    return b[1].count - a[1].count;
  });

  for (const [issueType, data] of sortedIssues) {
    const severityEmoji = {
      critical: '🔴',
      high: '🟠',
      medium: '🟡',
      low: '🟢',
    }[data.severity];

    console.log(`\n${severityEmoji} ${issueType}`);
    console.log(`   Count: ${data.count} occurrences`);
    console.log(`   Examples:`);
    for (const ex of data.examples) {
      console.log(`   - ${ex.file}: ${ex.value.substring(0, 60)}${ex.value.length > 60 ? '...' : ''}`);
    }
  }

  // Write detailed JSON report
  const reportPath = path.join(process.cwd(), 'seo-audit-report.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    summary,
    issuesByType,
    results: {
      resumeExamples: results.resumeExamples.filter(r => r.issues.length > 0),
      blogPosts: results.blogPosts.filter(r => r.issues.length > 0),
      coverLetterExamples: results.coverLetterExamples.filter(r => r.issues.length > 0),
      careerTips: results.careerTips.filter(r => r.issues.length > 0),
    },
  }, null, 2));

  console.log(`\n\n📁 Detailed report saved to: ${reportPath}`);
  console.log('='.repeat(80) + '\n');
}

runAudit().catch(console.error);

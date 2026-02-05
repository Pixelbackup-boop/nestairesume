#!/usr/bin/env node
/**
 * Add Internal Links to All Content Pages
 *
 * For resume examples:
 *  - 3 related resume examples (same category, rotating selection)
 *  - 1 relevant blog post
 *  - Link to builder page
 *  - Replaces existing CTA or appends before end
 *
 * For blog posts:
 *  - 2-3 related resume examples
 *  - 1-2 related blog posts
 *  - Link to builder page
 */

import { createRequire } from 'node:module';
import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const require2 = createRequire(path.join(rootDir, 'frontend', 'package.json'));
const matter = require2('gray-matter');

const RESUME_DIR = path.join(rootDir, 'frontend', 'content', 'resume-examples');
const BLOG_DIR = path.join(rootDir, 'frontend', 'content', 'blog');
const CAREER_DIR = path.join(rootDir, 'frontend', 'content', 'career-tips');

// ═══════════════════════════════════════
// STEP 1: Build index of all pages
// ═══════════════════════════════════════

const resumePages = [];
const categoryMap = {};

for (const f of fs.readdirSync(RESUME_DIR).filter(x => x.endsWith('.mdx'))) {
  const raw = fs.readFileSync(path.join(RESUME_DIR, f), 'utf-8');
  const { data } = matter(raw);
  const slug = data.slug || f.replace('.mdx', '');
  const cat = data.category || 'Unknown';
  const jobTitle = data.jobTitle || data.title || slug;

  resumePages.push({ slug, category: cat, jobTitle, file: f });
  if (!categoryMap[cat]) categoryMap[cat] = [];
  categoryMap[cat].push({ slug, jobTitle });
}

// ═══════════════════════════════════════
// STEP 2: Map categories to blog posts
// ═══════════════════════════════════════

const CATEGORY_BLOG_MAP = {
  'Technology': [
    { slug: 'ai-ml-resume-guide', title: 'AI & ML Resume Guide' },
    { slug: 'how-to-list-skills-on-resume', title: 'How to List Skills on a Resume' },
    { slug: 'how-to-write-ats-friendly-resume', title: 'How to Write an ATS-Friendly Resume' },
  ],
  'Healthcare': [
    { slug: 'resume-keywords-by-industry', title: 'Resume Keywords by Industry' },
    { slug: 'how-to-write-professional-summary', title: 'How to Write a Professional Summary' },
    { slug: 'how-to-write-ats-friendly-resume', title: 'How to Write an ATS-Friendly Resume' },
  ],
  'Finance': [
    { slug: 'salary-negotiation-tips', title: 'Salary Negotiation Tips' },
    { slug: 'resume-keywords-by-industry', title: 'Resume Keywords by Industry' },
    { slug: 'how-to-write-professional-summary', title: 'How to Write a Professional Summary' },
  ],
  'Business': [
    { slug: 'how-to-write-professional-summary', title: 'How to Write a Professional Summary' },
    { slug: 'resume-for-career-change', title: 'Resume for Career Change' },
    { slug: 'how-to-write-ats-friendly-resume', title: 'How to Write an ATS-Friendly Resume' },
  ],
  'Hospitality': [
    { slug: 'how-to-write-a-resume', title: 'How to Write a Resume' },
    { slug: 'resume-action-verbs', title: 'Resume Action Verbs' },
    { slug: 'interview-preparation-guide', title: 'Interview Preparation Guide' },
  ],
  'Marketing': [
    { slug: 'linkedin-profile-optimization', title: 'LinkedIn Profile Optimization' },
    { slug: 'how-to-list-skills-on-resume', title: 'How to List Skills on a Resume' },
    { slug: 'resume-action-verbs', title: 'Resume Action Verbs' },
  ],
  'Engineering': [
    { slug: 'how-to-list-projects-on-resume', title: 'How to List Projects on a Resume' },
    { slug: 'resume-keywords-by-industry', title: 'Resume Keywords by Industry' },
    { slug: 'how-to-write-ats-friendly-resume', title: 'How to Write an ATS-Friendly Resume' },
  ],
  'Sales': [
    { slug: 'salary-negotiation-tips', title: 'Salary Negotiation Tips' },
    { slug: 'resume-action-verbs', title: 'Resume Action Verbs' },
    { slug: 'how-to-write-professional-summary', title: 'How to Write a Professional Summary' },
  ],
  'HR': [
    { slug: 'how-to-write-professional-summary', title: 'How to Write a Professional Summary' },
    { slug: 'resume-keywords-by-industry', title: 'Resume Keywords by Industry' },
    { slug: 'linkedin-profile-optimization', title: 'LinkedIn Profile Optimization' },
  ],
  'Management': [
    { slug: 'how-to-write-professional-summary', title: 'How to Write a Professional Summary' },
    { slug: 'resume-for-career-change', title: 'Resume for Career Change' },
    { slug: 'salary-negotiation-tips', title: 'Salary Negotiation Tips' },
  ],
  'Administrative': [
    { slug: 'how-to-write-a-resume', title: 'How to Write a Resume' },
    { slug: 'how-to-write-ats-friendly-resume', title: 'How to Write an ATS-Friendly Resume' },
    { slug: 'resume-objective-vs-summary', title: 'Resume Objective vs Summary' },
  ],
  'Logistics': [
    { slug: 'resume-action-verbs', title: 'Resume Action Verbs' },
    { slug: 'how-to-write-ats-friendly-resume', title: 'How to Write an ATS-Friendly Resume' },
    { slug: 'resume-keywords-by-industry', title: 'Resume Keywords by Industry' },
  ],
  'Retail': [
    { slug: 'how-to-write-a-resume', title: 'How to Write a Resume' },
    { slug: 'resume-action-verbs', title: 'Resume Action Verbs' },
    { slug: 'interview-preparation-guide', title: 'Interview Preparation Guide' },
  ],
  'Creative': [
    { slug: 'how-to-list-projects-on-resume', title: 'How to List Projects on a Resume' },
    { slug: 'resume-action-verbs', title: 'Resume Action Verbs' },
    { slug: 'linkedin-profile-optimization', title: 'LinkedIn Profile Optimization' },
  ],
  'Manufacturing': [
    { slug: 'resume-action-verbs', title: 'Resume Action Verbs' },
    { slug: 'how-to-write-ats-friendly-resume', title: 'How to Write an ATS-Friendly Resume' },
    { slug: 'resume-keywords-by-industry', title: 'Resume Keywords by Industry' },
  ],
  'Trades': [
    { slug: 'resume-keywords-by-industry', title: 'Resume Keywords by Industry' },
    { slug: 'how-to-write-ats-friendly-resume', title: 'How to Write an ATS-Friendly Resume' },
    { slug: 'resume-action-verbs', title: 'Resume Action Verbs' },
  ],
  'Customer Service': [
    { slug: 'how-to-write-professional-summary', title: 'How to Write a Professional Summary' },
    { slug: 'resume-action-verbs', title: 'Resume Action Verbs' },
    { slug: 'interview-preparation-guide', title: 'Interview Preparation Guide' },
  ],
  'Education': [
    { slug: 'how-to-write-a-resume', title: 'How to Write a Resume' },
    { slug: 'resume-for-career-change', title: 'Resume for Career Change' },
    { slug: 'how-to-write-cover-letter', title: 'How to Write a Cover Letter' },
  ],
  'Construction': [
    { slug: 'resume-action-verbs', title: 'Resume Action Verbs' },
    { slug: 'how-to-write-ats-friendly-resume', title: 'How to Write an ATS-Friendly Resume' },
    { slug: 'salary-negotiation-tips', title: 'Salary Negotiation Tips' },
  ],
  'Entry-Level': [
    { slug: 'how-to-write-student-resume', title: 'How to Write a Student Resume' },
    { slug: 'simple-resume-format-freshers', title: 'Simple Resume Format for Freshers' },
    { slug: 'resume-objective-vs-summary', title: 'Resume Objective vs Summary' },
  ],
};

// Default blog links for categories not explicitly mapped
const DEFAULT_BLOGS = [
  { slug: 'how-to-write-a-resume', title: 'How to Write a Resume' },
  { slug: 'how-to-write-ats-friendly-resume', title: 'How to Write an ATS-Friendly Resume' },
  { slug: 'resume-action-verbs', title: 'Resume Action Verbs' },
];

// ═══════════════════════════════════════
// STEP 3: Related blog post mapping for blog-to-blog links
// ═══════════════════════════════════════

const BLOG_RELATED = {
  'how-to-write-a-resume': ['how-to-write-professional-summary', 'resume-length-guide', 'chronological-resume-format'],
  'how-to-write-ats-friendly-resume': ['what-is-ats-guide', 'resume-keywords-by-industry', 'ats-parse-rate-meaning'],
  'how-to-write-professional-summary': ['resume-objective-vs-summary', 'how-to-write-a-resume', 'resume-action-verbs'],
  'how-to-write-cover-letter': ['how-to-email-resume', 'how-to-write-a-resume', 'interview-preparation-guide'],
  'how-to-write-student-resume': ['simple-resume-format-freshers', 'resume-with-1-year-experience', 'how-to-list-projects-on-resume'],
  'interview-preparation-guide': ['salary-negotiation-tips', 'how-to-write-professional-summary', 'resume-action-verbs'],
  'resume-action-verbs': ['how-to-list-skills-on-resume', 'resume-keywords-by-industry', 'how-to-write-professional-summary'],
  'resume-keywords-by-industry': ['how-to-write-ats-friendly-resume', 'what-is-ats-guide', 'resume-action-verbs'],
  'salary-negotiation-tips': ['interview-preparation-guide', 'linkedin-profile-optimization', 'how-to-email-resume'],
  'linkedin-profile-optimization': ['how-to-write-professional-summary', 'resume-for-career-change', 'salary-negotiation-tips'],
  'how-to-list-skills-on-resume': ['resume-action-verbs', 'resume-keywords-by-industry', 'how-to-write-ats-friendly-resume'],
  'resume-for-career-change': ['resume-gap-explanation-examples', 'how-to-write-professional-summary', 'resume-objective-vs-summary'],
  'resume-length-guide': ['chronological-resume-format', 'how-to-write-a-resume', 'simple-resume-format-freshers'],
  'top-resume-mistakes-to-avoid': ['how-to-write-a-resume', 'how-to-write-ats-friendly-resume', 'resume-action-verbs'],
  'what-is-ats-guide': ['how-to-write-ats-friendly-resume', 'ats-parse-rate-meaning', 'resume-keywords-by-industry'],
  'resume-vs-cv-difference': ['how-to-write-a-resume', 'resume-length-guide', 'chronological-resume-format'],
  'ai-ml-resume-guide': ['how-to-list-skills-on-resume', 'how-to-list-projects-on-resume', 'how-to-write-ats-friendly-resume'],
  'best-resume-builder-apps': ['resume-maker-google-docs', 'resume-builder-word-template', 'how-to-write-a-resume'],
  'how-to-list-projects-on-resume': ['how-to-list-skills-on-resume', 'resume-action-verbs', 'ai-ml-resume-guide'],
  'how-to-email-resume': ['how-to-write-cover-letter', 'interview-preparation-guide', 'linkedin-profile-optimization'],
  'resume-objective-vs-summary': ['how-to-write-professional-summary', 'how-to-write-a-resume', 'resume-for-career-change'],
  'resume-gap-explanation-examples': ['resume-for-career-change', 'how-to-write-professional-summary', 'interview-preparation-guide'],
  'chronological-resume-format': ['resume-length-guide', 'how-to-write-a-resume', 'resume-vs-cv-difference'],
  'simple-resume-format-freshers': ['how-to-write-student-resume', 'resume-with-1-year-experience', 'resume-objective-vs-summary'],
  'resume-with-1-year-experience': ['how-to-write-student-resume', 'simple-resume-format-freshers', 'resume-for-career-change'],
  'indeed-resume-tips': ['how-to-write-ats-friendly-resume', 'linkedin-profile-optimization', 'how-to-write-a-resume'],
  'best-resume-fonts-2026': ['resume-paper-printing-tips', 'how-to-write-a-resume', 'resume-length-guide'],
  'resume-paper-printing-tips': ['best-resume-fonts-2026', 'how-to-email-resume', 'how-to-write-a-resume'],
  'best-resume-writing-services': ['best-resume-builder-apps', 'how-to-write-a-resume', 'resume-maker-google-docs'],
  'resume-builder-word-template': ['resume-maker-google-docs', 'best-resume-builder-apps', 'how-to-write-a-resume'],
  'resume-maker-google-docs': ['resume-builder-word-template', 'best-resume-builder-apps', 'how-to-write-a-resume'],
  'how-to-list-remote-work-on-resume': ['how-to-list-skills-on-resume', 'how-to-write-professional-summary', 'resume-for-career-change'],
  'chatgpt-vs-claude-for-resumes': ['best-resume-builder-apps', 'how-to-write-a-resume', 'ai-ml-resume-guide'],
  'ats-parse-rate-meaning': ['what-is-ats-guide', 'how-to-write-ats-friendly-resume', 'resume-keywords-by-industry'],
  'japanese-resume-maker': ['resume-vs-cv-difference', 'how-to-write-a-resume', 'best-resume-builder-apps'],
};

// Blog slug → title map
const blogTitles = {};
for (const f of fs.readdirSync(BLOG_DIR).filter(x => x.endsWith('.mdx'))) {
  const { data } = matter(fs.readFileSync(path.join(BLOG_DIR, f), 'utf-8'));
  blogTitles[data.slug || f.replace('.mdx', '')] = data.title;
}

// ═══════════════════════════════════════
// STEP 4: Process resume example pages
// ═══════════════════════════════════════

function getRelatedResumes(slug, category, count = 3) {
  const sameCat = (categoryMap[category] || []).filter(p => p.slug !== slug);
  // Deterministic selection based on slug hash
  const hash = slug.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const shuffled = [...sameCat].sort((a, b) => {
    const ha = (a.slug.charCodeAt(0) + hash) % 100;
    const hb = (b.slug.charCodeAt(0) + hash) % 100;
    return ha - hb;
  });
  return shuffled.slice(0, count);
}

function getBlogForCategory(category) {
  const blogs = CATEGORY_BLOG_MAP[category] || DEFAULT_BLOGS;
  return blogs[0]; // Primary blog recommendation
}

function buildResumeLinksSection(slug, category, jobTitle) {
  const related = getRelatedResumes(slug, category);
  const blog = getBlogForCategory(category);

  let section = `\n## Explore More Resume Resources\n\n`;
  section += `Looking for more career guidance? Check out these related resources:\n\n`;

  for (const r of related) {
    section += `- [${r.jobTitle} Resume Example](/resume-examples/${r.slug})\n`;
  }

  if (blog) {
    section += `- [${blog.title}](/blog/${blog.slug})\n`;
  }

  section += `\nReady to build your ${jobTitle} resume? [Try our AI-powered resume builder](/builder) — optimized for ATS compatibility and recruiter expectations.\n`;

  return section;
}

let resumeUpdated = 0;
let resumeSkipped = 0;

for (const page of resumePages) {
  const filePath = path.join(RESUME_DIR, page.file);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  // Check if already has internal links section
  if (/## Explore More Resume Resources/.test(content)) {
    resumeSkipped++;
    continue;
  }

  const linksSection = buildResumeLinksSection(page.slug, page.category, page.jobTitle);

  // Remove existing CTA line if present (the "Ready to land..." or "Ready to build..." line)
  let updatedContent = content.replace(/\n+Ready to (?:land|build|create|start|get|take).+(?:AI-powered|resume builder|our builder).+\n*$/m, '');

  // Append the new links section
  updatedContent = updatedContent.trimEnd() + '\n' + linksSection;

  // Rebuild file
  const newRaw = matter.stringify(updatedContent, data);
  fs.writeFileSync(filePath, newRaw);
  resumeUpdated++;
}

console.log(`Resume examples: ${resumeUpdated} updated, ${resumeSkipped} skipped (already had links)`);

// ═══════════════════════════════════════
// STEP 5: Process blog posts
// ═══════════════════════════════════════

let blogUpdated = 0;
let blogSkipped = 0;

for (const f of fs.readdirSync(BLOG_DIR).filter(x => x.endsWith('.mdx'))) {
  const filePath = path.join(BLOG_DIR, f);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const slug = data.slug || f.replace('.mdx', '');

  // Skip if already has related resources section
  if (/## (?:Related|Explore|Further|More) /.test(content)) {
    blogSkipped++;
    continue;
  }

  // Get related blogs
  const relatedSlugs = BLOG_RELATED[slug] || ['how-to-write-a-resume', 'how-to-write-ats-friendly-resume', 'resume-action-verbs'];
  const relatedBlogs = relatedSlugs
    .filter(s => s !== slug && blogTitles[s])
    .slice(0, 2);

  // Get 2 related resume examples (pick from top categories)
  const relatedResumes = [];
  const topCats = ['Technology', 'Healthcare', 'Finance', 'Business', 'Marketing', 'Engineering'];
  const hash = slug.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const catIdx = hash % topCats.length;
  const cat1 = topCats[catIdx];
  const cat2 = topCats[(catIdx + 1) % topCats.length];

  if (categoryMap[cat1] && categoryMap[cat1].length > 0) {
    relatedResumes.push(categoryMap[cat1][hash % categoryMap[cat1].length]);
  }
  if (categoryMap[cat2] && categoryMap[cat2].length > 0) {
    relatedResumes.push(categoryMap[cat2][(hash + 7) % categoryMap[cat2].length]);
  }

  let section = `\n## Related Resources\n\n`;

  for (const b of relatedBlogs) {
    section += `- [${blogTitles[b]}](/blog/${b})\n`;
  }
  for (const r of relatedResumes) {
    section += `- [${r.jobTitle} Resume Example](/resume-examples/${r.slug})\n`;
  }

  section += `\nNeed a professional resume? [Try our AI-powered resume builder](/builder) to create an ATS-optimized resume in minutes.\n`;

  const updatedContent = content.trimEnd() + '\n' + section;
  const newRaw = matter.stringify(updatedContent, data);
  fs.writeFileSync(filePath, newRaw);
  blogUpdated++;
}

console.log(`Blog posts: ${blogUpdated} updated, ${blogSkipped} skipped`);

// ═══════════════════════════════════════
// STEP 6: Process career tips
// ═══════════════════════════════════════

let careerUpdated = 0;
let careerSkipped = 0;

for (const f of fs.readdirSync(CAREER_DIR).filter(x => x.endsWith('.mdx'))) {
  const filePath = path.join(CAREER_DIR, f);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const slug = data.slug || f.replace('.mdx', '');

  if (/## (?:Related|Explore|Further|More) /.test(content)) {
    careerSkipped++;
    continue;
  }

  // Find related resume examples based on slug keywords
  const keywords = slug.split('-').filter(w => w.length > 3);
  const matchingResumes = resumePages
    .filter(p => keywords.some(kw => p.slug.includes(kw)))
    .slice(0, 3);

  // If no keyword matches, pick from Technology category
  const relatedResumes = matchingResumes.length > 0
    ? matchingResumes
    : (categoryMap['Technology'] || []).slice(0, 3);

  let section = `\n## Related Resources\n\n`;

  for (const r of relatedResumes) {
    section += `- [${r.jobTitle} Resume Example](/resume-examples/${r.slug})\n`;
  }

  section += `- [How to Write an ATS-Friendly Resume](/blog/how-to-write-ats-friendly-resume)\n`;
  section += `\n[Build your resume now](/builder) with our AI-powered resume builder.\n`;

  const updatedContent = content.trimEnd() + '\n' + section;
  const newRaw = matter.stringify(updatedContent, data);
  fs.writeFileSync(filePath, newRaw);
  careerUpdated++;
}

console.log(`Career tips: ${careerUpdated} updated, ${careerSkipped} skipped`);
console.log(`\nTotal: ${resumeUpdated + blogUpdated + careerUpdated} files updated`);

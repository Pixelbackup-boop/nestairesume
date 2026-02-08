#!/usr/bin/env node
/**
 * Add Career Tips + Tools Cross-Links
 *
 * Adds to resume examples and blog posts:
 * - 1 career tips link in Related Resources
 * - 1 tools link in Related Resources
 *
 * Cover letters already handled by fix-cover-letter-links.mjs
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
// Career tips mapping by category
// ═══════════════════════════════════════

const CAREER_TIP_BY_CATEGORY = {
  'Technology': { slug: 'ai-resume-tools', title: 'AI Resume Tools Guide' },
  'Engineering': { slug: 'ai-resume-tools', title: 'AI Resume Tools Guide' },
  'Healthcare': { slug: 'career-guidance', title: 'Career Guidance' },
  'Education': { slug: 'career-development-plan', title: 'Career Development Plan' },
  'Finance': { slug: 'career-guidance', title: 'Career Guidance' },
  'Business': { slug: 'career-development-plan', title: 'Career Development Plan' },
  'Management': { slug: 'career-development-plan', title: 'Career Development Plan' },
  'Sales': { slug: 'interview-preparation-guide', title: 'Interview Preparation Guide' },
  'Marketing': { slug: 'career-development-plan', title: 'Career Development Plan' },
  'HR': { slug: 'career-guidance', title: 'Career Guidance' },
  'Entry-Level': { slug: 'how-to-write-cover-letter', title: 'How to Write a Cover Letter' },
};

const DEFAULT_CAREER_TIP = { slug: 'interview-preparation-guide', title: 'Interview Preparation Guide' };

function getCareerTipForCategory(category) {
  return CAREER_TIP_BY_CATEGORY[category] || DEFAULT_CAREER_TIP;
}

// Tools links by content type
const RESUME_TOOL_LINK = '- [Check Your Resume ATS Score](/tools/ats-checker)\n';
const BLOG_TOOL_LINKS = {
  'how-to-write-ats-friendly-resume': '- [Free ATS Resume Checker](/tools/ats-checker)\n',
  'how-to-write-cover-letter': '- [AI Cover Letter Generator](/tools/cover-letter)\n',
  'interview-preparation-guide': '- [Practice with Mock Interviews](/tools/mock-interview)\n',
  '_default': '- [Check Your Resume ATS Score](/tools/ats-checker)\n',
};

// ═══════════════════════════════════════
// Process resume examples
// ═══════════════════════════════════════

let resumeUpdated = 0;
let resumeSkipped = 0;

for (const f of fs.readdirSync(RESUME_DIR).filter(x => x.endsWith('.mdx'))) {
  const filePath = path.join(RESUME_DIR, f);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const slug = data.slug || f.replace('.mdx', '');
  const category = data.category || 'Unknown';

  // Idempotency: skip if already links to career-tips and tools
  if (content.includes('/career-tips/') && content.includes('/tools/')) {
    resumeSkipped++;
    continue;
  }

  let updatedContent = content;

  // Find the Related Resources section and add links before the CTA
  const relatedMatch = updatedContent.match(/## Related Resources\n([\s\S]*?)(\n(?:Need a professional|Ready to|Build your).+$)/m);

  if (relatedMatch) {
    const existingLinks = relatedMatch[1];
    const cta = relatedMatch[2];

    let newLinks = existingLinks.trimEnd() + '\n';

    // Add career tip link if not present
    if (!content.includes('/career-tips/') && !content.includes('/career/')) {
      const tip = getCareerTipForCategory(category);
      newLinks += `- [${tip.title}](/career-tips/${tip.slug})\n`;
    }

    // Add tools link if not present
    if (!content.includes('/tools/')) {
      newLinks += RESUME_TOOL_LINK;
    }

    updatedContent = updatedContent.replace(
      /## Related Resources\n[\s\S]*?(\n(?:Need a professional|Ready to|Build your).+$)/m,
      `## Related Resources\n${newLinks}${cta}`
    );
  } else {
    // No Related Resources section found — append at end
    const tip = getCareerTipForCategory(category);
    let appendSection = '';

    if (!content.includes('/career-tips/') && !content.includes('/career/')) {
      appendSection += `\n- [${tip.title}](/career-tips/${tip.slug})\n`;
    }
    if (!content.includes('/tools/')) {
      appendSection += RESUME_TOOL_LINK;
    }

    if (appendSection) {
      updatedContent = updatedContent.trimEnd() + '\n' + appendSection;
    }
  }

  if (updatedContent !== content) {
    const newRaw = matter.stringify(updatedContent, data);
    fs.writeFileSync(filePath, newRaw);
    resumeUpdated++;
  } else {
    resumeSkipped++;
  }
}

console.log(`Resume examples: ${resumeUpdated} updated, ${resumeSkipped} skipped`);

// ═══════════════════════════════════════
// Process blog posts
// ═══════════════════════════════════════

let blogUpdated = 0;
let blogSkipped = 0;

for (const f of fs.readdirSync(BLOG_DIR).filter(x => x.endsWith('.mdx'))) {
  const filePath = path.join(BLOG_DIR, f);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const slug = data.slug || f.replace('.mdx', '');

  // Idempotency check
  if (content.includes('/career-tips/') && content.includes('/tools/')) {
    blogSkipped++;
    continue;
  }

  let updatedContent = content;

  // Find Related Resources section
  const relatedMatch = updatedContent.match(/## Related Resources\n([\s\S]*?)(\n(?:Need a professional|Ready to|Build your|Try our).+$)/m);

  if (relatedMatch) {
    const existingLinks = relatedMatch[1];
    const cta = relatedMatch[2];

    let newLinks = existingLinks.trimEnd() + '\n';

    if (!content.includes('/career-tips/') && !content.includes('/career/')) {
      // Pick career tip based on blog topic
      const tip = slug.includes('interview') || slug.includes('salary')
        ? { slug: 'interview-preparation-guide', title: 'Interview Preparation Guide' }
        : slug.includes('ats') || slug.includes('keyword')
        ? { slug: 'how-to-write-ats-friendly-resume', title: 'How to Write an ATS-Friendly Resume' }
        : slug.includes('cover-letter')
        ? { slug: 'how-to-write-cover-letter', title: 'How to Write a Cover Letter' }
        : { slug: 'career-guidance', title: 'Career Guidance' };
      newLinks += `- [${tip.title}](/career-tips/${tip.slug})\n`;
    }

    if (!content.includes('/tools/')) {
      const toolLink = BLOG_TOOL_LINKS[slug] || BLOG_TOOL_LINKS['_default'];
      newLinks += toolLink;
    }

    updatedContent = updatedContent.replace(
      /## Related Resources\n[\s\S]*?(\n(?:Need a professional|Ready to|Build your|Try our).+$)/m,
      `## Related Resources\n${newLinks}${cta}`
    );
  } else {
    // No Related Resources — append links at end
    let appendLinks = '\n';
    if (!content.includes('/career-tips/') && !content.includes('/career/')) {
      appendLinks += `- [Career Guidance](/career-tips/career-guidance)\n`;
    }
    if (!content.includes('/tools/')) {
      const toolLink = BLOG_TOOL_LINKS[slug] || BLOG_TOOL_LINKS['_default'];
      appendLinks += toolLink;
    }
    updatedContent = updatedContent.trimEnd() + appendLinks;
  }

  if (updatedContent !== content) {
    const newRaw = matter.stringify(updatedContent, data);
    fs.writeFileSync(filePath, newRaw);
    blogUpdated++;
  } else {
    blogSkipped++;
  }
}

console.log(`Blog posts: ${blogUpdated} updated, ${blogSkipped} skipped`);
console.log(`\nTotal: ${resumeUpdated + blogUpdated} files updated`);

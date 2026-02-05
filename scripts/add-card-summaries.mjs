#!/usr/bin/env node
/**
 * Batch script to add compelling cardSummary to all resume example MDX files.
 * Generates profession-specific, click-worthy summaries.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_DIR = path.join(__dirname, '../frontend/content/resume-examples');

// Category-specific templates with action verbs and value propositions
const CATEGORY_TEMPLATES = {
  Technology: [
    (job, skills) => `Land your dream ${job} role. See how top professionals highlight ${skills[0]} and ${skills[1]} to pass ATS screening.`,
    (job, skills) => `Get hired as a ${job}. Learn how to showcase ${skills[0]}, ${skills[1]}, and technical impact.`,
    (job, skills) => `Stand out in tech hiring. Discover how ${job}s present ${skills[0]} expertise and project wins.`,
  ],
  Healthcare: [
    (job, skills) => `Stand out in healthcare hiring. Show how ${job}s showcase ${skills[0]} and patient outcomes.`,
    (job, skills) => `Get hired faster in healthcare. Learn how ${job}s highlight certifications and ${skills[1]}.`,
    (job, skills) => `Advance your ${job} career. See how top candidates present ${skills[0]} and clinical experience.`,
  ],
  Business: [
    (job, skills) => `Accelerate your ${job} career. Demonstrate ${skills[0]} and measurable business impact.`,
    (job, skills) => `Get noticed by hiring managers. See how ${job}s showcase ${skills[0]} and leadership wins.`,
    (job, skills) => `Land your next ${job} role. Learn to highlight ${skills[0]}, ${skills[1]}, and results.`,
  ],
  Management: [
    (job, skills) => `Step into leadership. See how ${job}s present ${skills[0]} and team achievements.`,
    (job, skills) => `Advance to ${job}. Showcase ${skills[0]}, strategic thinking, and measurable outcomes.`,
    (job, skills) => `Get promoted faster. Learn how ${job}s highlight ${skills[0]} and leadership impact.`,
  ],
  Finance: [
    (job, skills) => `Advance your finance career. See how ${job}s showcase ${skills[0]} and analytical wins.`,
    (job, skills) => `Get hired in finance. Learn to present ${skills[0]}, ${skills[1]}, and quantified results.`,
    (job, skills) => `Stand out to finance recruiters. Discover how ${job}s highlight ${skills[0]} expertise.`,
  ],
  Sales: [
    (job, skills) => `Crush your sales job search. See how top ${job}s showcase quota attainment and ${skills[0]}.`,
    (job, skills) => `Get hired in sales. Learn to highlight ${skills[0]}, revenue wins, and client relationships.`,
    (job, skills) => `Land your next ${job} role. Present ${skills[0]} skills and sales achievements that convert.`,
  ],
  Marketing: [
    (job, skills) => `Get hired in marketing. See how ${job}s showcase ${skills[0]} and campaign ROI.`,
    (job, skills) => `Stand out to marketing recruiters. Highlight ${skills[0]}, ${skills[1]}, and growth metrics.`,
    (job, skills) => `Advance your ${job} career. Learn to present ${skills[0]} expertise and measurable impact.`,
  ],
  Engineering: [
    (job, skills) => `Land your ${job} dream job. Showcase ${skills[0]}, ${skills[1]}, and engineering impact.`,
    (job, skills) => `Get hired as a ${job}. See how engineers present ${skills[0]} and project achievements.`,
    (job, skills) => `Stand out in engineering. Learn how ${job}s highlight ${skills[0]} and technical wins.`,
  ],
  Creative: [
    (job, skills) => `Get hired in creative roles. See how ${job}s present ${skills[0]} and portfolio highlights.`,
    (job, skills) => `Land your dream ${job} job. Showcase ${skills[0]}, creative vision, and client wins.`,
    (job, skills) => `Stand out to creative directors. Learn how ${job}s highlight ${skills[0]} expertise.`,
  ],
  Hospitality: [
    (job, skills) => `Get hired in hospitality. See how ${job}s showcase ${skills[0]} and guest experience wins.`,
    (job, skills) => `Land your ${job} role faster. Highlight ${skills[0]}, service excellence, and team impact.`,
    (job, skills) => `Stand out in hospitality hiring. Learn how ${job}s present ${skills[0]} and customer results.`,
  ],
  Retail: [
    (job, skills) => `Get hired in retail. See how ${job}s showcase ${skills[0]} and sales performance.`,
    (job, skills) => `Land your ${job} role. Highlight ${skills[0]}, customer service, and store achievements.`,
    (job, skills) => `Stand out to retail managers. Learn how ${job}s present ${skills[0]} and team results.`,
  ],
  Administrative: [
    (job, skills) => `Get hired as a ${job}. See how to showcase ${skills[0]} and organizational impact.`,
    (job, skills) => `Land your ${job} role. Highlight ${skills[0]}, efficiency wins, and office management skills.`,
    (job, skills) => `Stand out in admin hiring. Learn how ${job}s present ${skills[0]} and productivity results.`,
  ],
  HR: [
    (job, skills) => `Advance your HR career. See how ${job}s showcase ${skills[0]} and people impact.`,
    (job, skills) => `Get hired in HR. Learn to highlight ${skills[0]}, talent wins, and organizational results.`,
    (job, skills) => `Land your ${job} role. Present ${skills[0]} expertise and HR achievements that matter.`,
  ],
  Logistics: [
    (job, skills) => `Get hired in logistics. See how ${job}s showcase ${skills[0]} and operational efficiency.`,
    (job, skills) => `Land your ${job} role. Highlight ${skills[0]}, cost savings, and supply chain wins.`,
    (job, skills) => `Stand out in logistics hiring. Learn how ${job}s present ${skills[0]} and delivery results.`,
  ],
  'Supply Chain': [
    (job, skills) => `Advance your supply chain career. Showcase ${skills[0]} and operational improvements.`,
    (job, skills) => `Get hired in supply chain. See how ${job}s highlight ${skills[0]} and efficiency wins.`,
    (job, skills) => `Land your ${job} role. Present ${skills[0]} expertise and cost optimization results.`,
  ],
  Education: [
    (job, skills) => `Get hired in education. See how ${job}s showcase ${skills[0]} and student outcomes.`,
    (job, skills) => `Land your ${job} role. Highlight ${skills[0]}, curriculum wins, and classroom impact.`,
    (job, skills) => `Stand out to school administrators. Learn how ${job}s present ${skills[0]} expertise.`,
  ],
  'Customer Service': [
    (job, skills) => `Get hired in customer service. See how ${job}s showcase ${skills[0]} and satisfaction scores.`,
    (job, skills) => `Land your ${job} role. Highlight ${skills[0]}, problem-solving, and customer wins.`,
    (job, skills) => `Stand out in support hiring. Learn how ${job}s present ${skills[0]} and resolution results.`,
  ],
  Trades: [
    (job, skills) => `Get hired faster as a ${job}. Showcase ${skills[0]}, certifications, and hands-on expertise.`,
    (job, skills) => `Land your ${job} job. Highlight ${skills[0]}, safety record, and project completions.`,
    (job, skills) => `Stand out in trades hiring. See how ${job}s present ${skills[0]} and practical skills.`,
  ],
  Manufacturing: [
    (job, skills) => `Get hired in manufacturing. See how ${job}s showcase ${skills[0]} and production results.`,
    (job, skills) => `Land your ${job} role. Highlight ${skills[0]}, quality metrics, and efficiency wins.`,
    (job, skills) => `Stand out on the floor. Learn how ${job}s present ${skills[0]} and safety compliance.`,
  ],
  Construction: [
    (job, skills) => `Get hired in construction. See how ${job}s showcase ${skills[0]} and project completions.`,
    (job, skills) => `Land your ${job} job. Highlight ${skills[0]}, safety certifications, and on-time delivery.`,
    (job, skills) => `Stand out to contractors. Learn how ${job}s present ${skills[0]} and build experience.`,
  ],
  Transportation: [
    (job, skills) => `Get hired in transportation. See how ${job}s showcase ${skills[0]} and safety record.`,
    (job, skills) => `Land your ${job} role. Highlight ${skills[0]}, delivery metrics, and route efficiency.`,
    (job, skills) => `Stand out to fleet managers. Learn how ${job}s present ${skills[0]} and driving experience.`,
  ],
  Research: [
    (job, skills) => `Advance your research career. See how ${job}s showcase ${skills[0]} and published findings.`,
    (job, skills) => `Get hired in research. Highlight ${skills[0]}, methodology expertise, and grant success.`,
    (job, skills) => `Land your ${job} role. Present ${skills[0]} and impactful research contributions.`,
  ],
  Science: [
    (job, skills) => `Get hired in science. See how ${job}s showcase ${skills[0]} and lab expertise.`,
    (job, skills) => `Land your ${job} role. Highlight ${skills[0]}, research wins, and technical precision.`,
    (job, skills) => `Stand out to research teams. Learn how ${job}s present ${skills[0]} and discoveries.`,
  ],
  Consulting: [
    (job, skills) => `Land your consulting role. See how ${job}s showcase ${skills[0]} and client impact.`,
    (job, skills) => `Get hired as a ${job}. Highlight ${skills[0]}, strategic thinking, and project wins.`,
    (job, skills) => `Stand out to consulting firms. Present ${skills[0]} expertise and measurable results.`,
  ],
};

// Fallback template for categories not listed
const DEFAULT_TEMPLATES = [
  (job, skills) => `Get hired as a ${job}. See how professionals showcase ${skills[0]} and key achievements.`,
  (job, skills) => `Land your ${job} role. Highlight ${skills[0]}, ${skills[1]}, and measurable results.`,
  (job, skills) => `Stand out in your job search. Learn how ${job}s present ${skills[0]} and career wins.`,
];

function getTemplate(category, index) {
  const templates = CATEGORY_TEMPLATES[category] || DEFAULT_TEMPLATES;
  return templates[index % templates.length];
}

function generateCardSummary(jobTitle, keySkills, category) {
  // Ensure we have at least 2 skills for templates
  const skills = keySkills.length >= 2
    ? keySkills
    : [...keySkills, 'relevant experience', 'key achievements'].slice(0, 2);

  // Use a deterministic index based on job title to vary templates
  const index = jobTitle.length % 3;
  const template = getTemplate(category, index);

  return template(jobTitle, skills);
}

function parseAndUpdateMDX(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');

  // Check if cardSummary already exists
  if (content.includes('cardSummary:')) {
    return { skipped: true, file: path.basename(filePath) };
  }

  // Extract frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    return { error: true, file: path.basename(filePath), reason: 'No frontmatter found' };
  }

  const frontmatter = frontmatterMatch[1];
  const body = content.slice(frontmatterMatch[0].length);

  // Parse key fields from frontmatter
  const jobTitleMatch = frontmatter.match(/jobTitle:\s*(.+)/);
  const categoryMatch = frontmatter.match(/category:\s*(.+)/);
  const keySkillsMatch = frontmatter.match(/keySkills:\n((?:\s+-\s+.+\n?)+)/);

  if (!jobTitleMatch) {
    return { error: true, file: path.basename(filePath), reason: 'No jobTitle found' };
  }

  const jobTitle = jobTitleMatch[1].trim().replace(/['"]/g, '');
  const category = categoryMatch ? categoryMatch[1].trim().replace(/['"]/g, '') : 'General';

  // Parse keySkills array
  const keySkills = [];
  if (keySkillsMatch) {
    const skillLines = keySkillsMatch[1].split('\n');
    for (const line of skillLines) {
      const skillMatch = line.match(/^\s+-\s+(.+)/);
      if (skillMatch) {
        keySkills.push(skillMatch[1].trim().replace(/['"]/g, ''));
      }
    }
  }

  // Generate cardSummary
  const cardSummary = generateCardSummary(jobTitle, keySkills, category);

  // Insert cardSummary after description in frontmatter
  const descriptionMatch = frontmatter.match(/(description:[\s\S]*?)(\n[a-zA-Z]+:)/);
  let newFrontmatter;

  if (descriptionMatch) {
    // Find where description ends (could be multi-line with >-)
    const descEnd = frontmatter.indexOf(descriptionMatch[2], frontmatter.indexOf('description:'));
    newFrontmatter =
      frontmatter.slice(0, descEnd) +
      `\ncardSummary: >-\n  ${cardSummary}` +
      frontmatter.slice(descEnd);
  } else {
    // Fallback: add at end of frontmatter
    newFrontmatter = frontmatter + `\ncardSummary: >-\n  ${cardSummary}`;
  }

  // Reconstruct file
  const newContent = `---\n${newFrontmatter}\n---${body}`;

  fs.writeFileSync(filePath, newContent, 'utf-8');

  return {
    success: true,
    file: path.basename(filePath),
    jobTitle,
    category,
    cardSummary
  };
}

// Main execution
console.log('🚀 Adding cardSummary to resume examples...\n');

const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.mdx'));
console.log(`Found ${files.length} MDX files\n`);

let success = 0;
let skipped = 0;
let errors = 0;

for (const file of files) {
  const filePath = path.join(CONTENT_DIR, file);
  const result = parseAndUpdateMDX(filePath);

  if (result.success) {
    success++;
    console.log(`✅ ${result.file}`);
    console.log(`   "${result.cardSummary}"\n`);
  } else if (result.skipped) {
    skipped++;
    console.log(`⏭️  ${result.file} (already has cardSummary)`);
  } else {
    errors++;
    console.log(`❌ ${result.file}: ${result.reason}`);
  }
}

console.log('\n📊 Summary:');
console.log(`   ✅ Updated: ${success}`);
console.log(`   ⏭️  Skipped: ${skipped}`);
console.log(`   ❌ Errors: ${errors}`);
console.log(`   📁 Total: ${files.length}`);

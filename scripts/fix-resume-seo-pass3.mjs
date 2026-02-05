/**
 * SEO Fix Script - Pass 3: Fix remaining 21 openings + 5 CTAs
 * Run: node scripts/fix-resume-seo-pass3.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const EXAMPLES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'resume-examples');

const ctaVariations = [
  (job) => `Ready to build your ${job} resume? Our AI resume builder helps you create a polished, ATS-optimized resume in minutes — no formatting headaches, no guesswork.`,
  (job) => `Start building your ${job} resume today. Our AI-powered tool handles formatting and optimization so you can focus on what matters — landing the interview.`,
  (job) => `Your next ${job} role starts with a great resume. Try our AI resume builder to generate a tailored, professional resume that gets past ATS filters and into hiring managers' hands.`,
  (job) => `Don't let a weak resume hold you back. Use our AI resume builder to craft a ${job} resume that highlights your strengths and passes applicant tracking systems with ease.`,
  (job) => `Take the next step in your career. Our AI resume builder creates a ${job} resume tailored to your experience, optimized for ATS, and ready to send in minutes.`,
  (job) => `Put your best foot forward. Build a standout ${job} resume with our AI-powered tool — professionally formatted, keyword-optimized, and designed to get results.`,
  (job) => `A strong ${job} resume opens doors. Let our AI resume builder help you create one that showcases your qualifications and passes automated screening systems.`,
  (job) => `Stop spending hours on formatting. Our AI resume builder creates a professional ${job} resume in minutes — ATS-friendly, visually clean, and tailored to your career level.`,
  (job) => `Ready to land your next ${job} position? Build a resume that stands out with our AI-powered builder — optimized for both recruiters and applicant tracking systems.`,
  (job) => `Get hired faster with a professionally crafted ${job} resume. Our AI builder handles the formatting and keyword optimization while you provide the experience.`,
  (job) => `Want a ${job} resume that actually gets callbacks? Our AI resume builder creates tailored, ATS-friendly resumes that put your qualifications in the best light.`,
  (job) => `Build a ${job} resume that works. Our AI tool structures your experience into a professional format that hiring managers and ATS systems both respond to.`,
];

const categoryOpenings = {
  Technology: (job, salary, growth, skills) =>
    `Landing a ${job} role in today's competitive tech market requires more than technical skills — it requires a resume that communicates your value within seconds. With an average salary of ${salary} and ${growth} projected job growth, ${job} positions attract strong applicant pools. Your resume needs to demonstrate hands-on expertise with tools like ${skills.slice(0, 3).join(', ')}, along with measurable project outcomes that prove you can deliver. This guide breaks down exactly how to structure your ${job} resume so that both automated screening systems and human reviewers move you forward.`,
  Healthcare: (job, salary, growth, skills) =>
    `Healthcare employers evaluate ${job} candidates differently than most industries — clinical competence, certifications, and patient outcomes drive hiring decisions. With ${growth} job growth and an average salary of ${salary}, the ${job} field is expanding, but competition for top positions remains strong. Your resume must immediately communicate your licensure, specialty experience, and measurable patient care results. This guide covers the specific sections, metrics, and formatting that healthcare recruiters look for when reviewing ${job} applications.`,
  Finance: (job, salary, growth, skills) =>
    `Finance hiring is detail-oriented and numbers-driven — exactly how your ${job} resume should read. Earning an average of ${salary} with ${growth} projected growth, ${job} roles require demonstrable precision, compliance knowledge, and quantifiable business impact. Hiring managers look for specific certifications, software proficiency in tools like ${skills.filter(s => /Excel|SAP|QuickBooks|Oracle|Bloomberg/i.test(s)).slice(0, 2).join(' and ') || 'industry-standard platforms'}, and concrete examples of cost savings or process improvements. This guide shows you how to build a ${job} resume that speaks the language finance teams understand.`,
  Creative: (job, salary, growth, skills) =>
    `A ${job} resume faces a unique challenge — it must demonstrate creative ability through a professional document format. At an average salary of ${salary}, ${job} roles attract talented candidates, and hiring managers expect to see both artistic vision and business results. Your portfolio showcases your visual work, but the resume must prove you deliver measurable outcomes: engagement rates, brand impact, and production efficiency. This guide covers how to balance creative credibility with the structured format that gets your ${job} application past screening systems.`,
  Hospitality: (job, salary, growth, skills) =>
    `Hospitality hiring moves fast, and your ${job} resume needs to make an impression quickly. With ${growth} job growth and an average salary of ${salary}, ${job} positions reward candidates who can demonstrate speed, service quality, and operational reliability. Managers want to see guest satisfaction metrics, volume handled during peak periods, and relevant certifications — not generic job descriptions. This guide shows you exactly how to present your ${job} experience in a format that busy hospitality hiring managers respond to.`,
  Sales: (job, salary, growth, skills) =>
    `In sales, your resume is your first pitch — and a ${job} resume should close as effectively as you do. With average compensation of ${salary} and ${growth} market growth, ${job} roles demand proof of revenue impact. Hiring managers will look for quota attainment, deal sizes, pipeline metrics, and account growth before they read anything else. This guide covers how to structure your ${job} resume so your sales numbers lead every section and your track record speaks for itself.`,
  Administrative: (job, salary, growth, skills) =>
    `Administrative roles like ${job} are evaluated on precision, speed, and reliability — your resume should reflect all three. At an average salary of ${salary} with ${growth} projected growth, ${job} positions require candidates who can demonstrate processing efficiency, software proficiency, and organizational skills through concrete metrics. Hiring managers scan for specific tools like ${skills.filter(s => /Excel|SAP|Oracle|Microsoft|Google/i.test(s)).slice(0, 2).join(' and ') || 'enterprise software platforms'}, accuracy rates, and volume handled. This guide covers the format and content that ${job} hiring teams prioritize.`,
  Engineering: (job, salary, growth, skills) =>
    `Engineering firms evaluate ${job} candidates on technical qualifications, project complexity, and problem-solving track record. With an average salary of ${salary} and ${growth} industry growth, ${job} roles attract candidates with strong technical foundations. Your resume needs to showcase licensure, project scope (budgets, team sizes, timelines), and specific tools: ${skills.slice(0, 3).join(', ')}. This guide explains how to format your ${job} resume so that technical reviewers and hiring managers both see a qualified engineer.`,
  Education: (job, salary, growth, skills) =>
    `Education hiring committees review ${job} applications with specific criteria in mind: licensure, student impact, and professional growth. Earning an average of ${salary} with ${growth} projected demand, ${job} positions require candidates who can demonstrate measurable classroom outcomes alongside administrative competence. This guide covers how to present your teaching experience, certifications, and student achievement data in the format that school administrators and hiring committees expect.`,
  Transportation: (job, salary, growth, skills) =>
    `Fleet managers and recruiters reviewing ${job} applications check three things immediately: credentials, safety record, and equipment experience. With an average salary of ${salary} and ${growth} industry growth driven by demand, ${job} positions are available — but carriers prioritize candidates with clean driving records and documented compliance. This guide shows how to structure your ${job} resume so that your credentials and safe driving metrics appear exactly where recruiters look for them.`,
  Marketing: (job, salary, growth, skills) =>
    `Marketing is a results-driven field, and your ${job} resume must prove you drive measurable business outcomes. At an average salary of ${salary} with ${growth} growth, ${job} roles attract data-savvy candidates who can demonstrate campaign ROI, audience growth, and conversion improvements. Hiring managers want specifics: which channels you managed, what tools you used (${skills.slice(0, 3).join(', ')}), and what metrics moved as a result. This guide covers how to present your ${job} experience in a format that proves marketing impact.`,
  Legal: (job, salary, growth, skills) =>
    `Legal hiring follows established conventions, and your ${job} resume must conform to the profession's expectations while demonstrating substantive expertise. With an average salary of ${salary} and ${growth} market outlook, ${job} positions require clear evidence of bar admissions, practice area depth, and caseload management capability. This guide covers the formatting standards and content priorities that law firms and legal departments apply when reviewing ${job} candidates.`,
  "Human Resources": (job, salary, growth, skills) =>
    `HR professionals evaluate resumes for a living — which means your ${job} resume will be scrutinized more closely than most. Earning an average of ${salary} with ${growth} projected demand, ${job} roles require demonstrated expertise in talent management, compliance, and measurable program outcomes. This guide covers how to present your HR experience in a format that passes both the ATS systems you likely manage and the peer review of fellow HR professionals.`,
  Management: (job, salary, growth, skills) =>
    `Management hiring evaluates ${job} candidates on leadership track record, operational impact, and strategic thinking ability. With an average salary of ${salary} and ${growth} projected growth, ${job} positions require proof that you can lead teams, manage budgets, and improve business outcomes. Your resume must show progressive responsibility, quantified results, and the ability to drive performance at scale. This guide covers the format and content that gets ${job} resumes to the top of the stack.`,
  Science: (job, salary, growth, skills) =>
    `Scientific hiring for ${job} positions evaluates candidates on research rigor, technical methodology, and publication output. At an average salary of ${salary} with ${growth} growth, ${job} roles require deep expertise in ${skills.slice(0, 3).join(', ')} alongside the ability to communicate complex findings. This guide covers how to present your research experience, laboratory skills, and scientific contributions in the format that hiring committees and industry recruiters expect.`,
};

const defaultOpening = (job, salary, growth, skills, category) =>
  `Building an effective ${job} resume requires understanding what hiring managers in the ${category || 'industry'} sector prioritize during screening. With an average salary of ${salary} and ${growth} projected job growth, ${job} positions attract qualified candidates — and your resume must stand out from the start. Beyond listing responsibilities, a strong ${job} resume quantifies your impact, highlights relevant skills like ${skills.slice(0, 3).join(', ')}, and presents your experience in a format that passes both automated screening and human review. This guide covers the specific content and structure that gets ${job} applicants called in for interviews.`;

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm = {};
  const lines = match[1].split('\n');
  for (const line of lines) {
    const kv = line.match(/^(\w+):\s*"?(.+?)"?\s*$/);
    if (kv) fm[kv[1]] = kv[2].replace(/^"/, '').replace(/"$/, '');
    const arrMatch = line.match(/^(\w+):\s*\[(.+)\]/);
    if (arrMatch) fm[arrMatch[1]] = arrMatch[2].split(',').map(s => s.trim().replace(/^"/, '').replace(/"$/, ''));
  }
  return fm;
}

const files = fs.readdirSync(EXAMPLES_DIR).filter(f => f.endsWith('.mdx')).sort();
console.log(`\nPass 3: Fixing remaining openings + CTAs...\n`);

let openingsFixed = 0;
let ctasFixed = 0;

files.forEach((file, i) => {
  const filePath = path.join(EXAMPLES_DIR, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  const fm = parseFrontmatter(content);
  const job = fm.jobTitle || path.basename(file, '.mdx');
  const category = fm.category || 'Professional';
  const skills = fm.keySkills || [];
  const salary = fm.avgSalary || 'competitive';
  const growth = fm.jobGrowth || 'positive';
  let changed = false;

  // Fix remaining openings — "interviews" (plural) variant
  const templateOpening = /This .+ resume example shows exactly what hiring managers want to see\. The right resume format makes the difference between landing interviews and getting filtered out\.\s*/;
  if (templateOpening.test(content)) {
    const gen = categoryOpenings[category] || defaultOpening;
    const newOpening = gen(job, salary, growth, skills, category);
    content = content.replace(templateOpening, newOpening + ' ');
    openingsFixed++;
    changed = true;
  }

  // Fix remaining identical CTAs
  const ctaPattern = /Use our AI resume builder to create a professional resume template with the perfect resume format in minutes\./;
  if (ctaPattern.test(content)) {
    const ctaIndex = (i + 7) % ctaVariations.length; // offset to avoid same CTA as neighbors
    const newCTA = ctaVariations[ctaIndex](job);
    content = content.replace(/Ready to build your .+ resume\? Use our AI resume builder to create a professional resume template with the perfect resume format in minutes\./, newCTA);
    // Also handle if the "Ready to build" part is missing
    content = content.replace(/Use our AI resume builder to create a professional resume template with the perfect resume format in minutes\./, newCTA);
    ctasFixed++;
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf-8');
  }
});

console.log(`✅ Pass 3 complete:\n`);
console.log(`  📝 Openings fixed:    ${openingsFixed}`);
console.log(`  🎯 CTAs fixed:        ${ctasFixed}`);

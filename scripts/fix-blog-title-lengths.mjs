import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');
const path = require('path');
const matter = require(path.join(process.cwd(), 'frontend/node_modules/gray-matter'));

const blogDir = path.join(process.cwd(), 'frontend/content/blog');

// Hand-crafted titles: 50-60 chars, tags[0] words preserved
const titleFixes = {
  'ai-ml-resume-guide': 'AI & Machine Learning Resume Guide: More Interviews (2026)',  // 58, has "AI" and "resume"
  'ai-prompts-resume-writing': 'Resume Builder AI Prompts: Best Writing Prompts for 2026',  // 56, has "resume builder ai prompt"
  'best-ai-resume-maker-tools': 'Best AI Resume Maker Tools Compared & Reviewed (2026)',  // 52, has "best resume maker ai"
  'best-resume-writing-services': 'Best Resume Writing Services in 2026: Honest Full Review',  // 56, has "best resume writing services"
  'canva-ai-resume-builder-guide': 'Canva AI Resume Builder: Complete Review & Guide (2026)',  // 53, has "canva ai resume builder"
  'how-to-list-remote-work-on-resume': 'How to List Remote Work on a Resume: Examples (2026)',  // 52
  'how-to-list-skills-on-resume': 'How to List Skills on a Resume: Best Examples (2026)',  // 51, has "resume skills" (resume + skills)
  'how-to-write-a-resume': 'How to Write a Resume: The Complete Step-by-Step Guide (2026)',  // 59, has "how to write a resume"
  'how-to-write-ats-friendly-resume': 'How to Write an ATS-Friendly Resume: Complete Guide (2026)',  // 57, has "ATS"
  'how-to-write-student-resume': 'Student Resume With No Experience: Complete Guide (2026)',  // 53, has "student resume"
  'indeed-resume-tips': 'Indeed Resume Tips: Optimize Your Profile & Get Hired (2026)',  // 59, has "Indeed resume"
  'interview-preparation-guide': 'The Ultimate Interview Preparation Guide for Success (2026)',  // 58, has "interview"
  'job-search-strategy': 'Job Search Strategy 2026: The Complete Playbook & Guide',  // 55, has "job search strategy"
  'linkedin-profile-optimization': 'LinkedIn Profile Optimization: Stand Out to Recruiters (2026)',  // 60
  'resume-builder-word-template': 'Resume Builder for Word: Templates, Tips & Examples (2026)',  // 57, has "resume builder word"
};

let fixed = 0;
for (const [slug, newTitle] of Object.entries(titleFixes)) {
  // Skip if too long
  if (newTitle.length > 60) {
    console.log('⚠️  [' + newTitle.length + '] SKIP (over 60): ' + slug);
    continue;
  }

  const filePath = path.join(blogDir, slug + '.mdx');
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);

  // Verify tags[0] words present
  const tag0 = (data.tags?.[0] || '').toLowerCase();
  const tagWords = tag0.split(/\s+/).filter(w => w.length > 1);
  const titleLower = newTitle.toLowerCase();
  const missing = tagWords.filter(w => !titleLower.includes(w));
  if (missing.length > 0) {
    console.log('⚠️  ' + slug + ': tags[0] "' + tag0 + '" words missing: ' + missing.join(', '));
    continue;
  }

  data.title = newTitle;
  const newRaw = matter.stringify(content, data);
  fs.writeFileSync(filePath, newRaw);
  console.log('✅ [' + newTitle.length + '] ' + slug + ': ' + newTitle);
  fixed++;
}
console.log('\nFixed: ' + fixed);

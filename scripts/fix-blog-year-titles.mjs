import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');
const path = require('path');
const matter = require(path.join(process.cwd(), 'frontend/node_modules/gray-matter'));

const blogDir = path.join(process.cwd(), 'frontend/content/blog');

const titleFixes = {
  'ats-parse-rate-meaning': 'What is ATS Parse Rate? Why Yours Might Be Low (2026)',
  'chatgpt-vs-claude-for-resumes': 'ChatGPT vs Claude: Which AI Writes Better Resumes? (2026)',
  'how-to-list-projects-on-resume': 'How to List Projects on a Resume: Examples & Tips (2026)',
  'how-to-write-professional-summary': 'How to Write a Professional Summary: 15 Examples (2026)',
  'resume-action-verbs': '200+ Resume Action Verbs to Strengthen Your Resume (2026)',
  'resume-for-career-change': 'How to Write a Resume for Career Change: Examples (2026)',
  'resume-gap-explanation-examples': 'How to Explain Resume Gaps: Layoff Examples & Tips (2026)',
  'resume-keywords-by-industry': 'Resume Keywords by Industry: 500+ ATS-Friendly Words (2026)',
  'resume-length-guide': 'Resume Length: Should It Be 1 Page or 2 Pages? (2026)',
  'resume-vs-cv-difference': 'Resume vs CV: Key Differences & When to Use Each (2026)',
  'resume-with-1-year-experience': 'Resume With 1 Year of Experience: Examples & Tips (2026)',
  'salary-negotiation-tips': 'Salary Negotiation Tips: How to Negotiate Offers (2026)',
  'tell-me-about-yourself-answer': "How to Answer 'Tell Me About Yourself': Scripts (2026)",
  'top-resume-mistakes-to-avoid': '10 Resume Mistakes That Could Cost You the Job (2026)',
  'what-is-ats-guide': 'What Is an ATS? Applicant Tracking Systems Guide (2026)',
};

let fixed = 0;
for (const [slug, newTitle] of Object.entries(titleFixes)) {
  const filePath = path.join(blogDir, slug + '.mdx');
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);

  // Verify tags[0] words still present in new title
  const tag0 = (data.tags?.[0] || '').toLowerCase();
  const tagWords = tag0.split(/\s+/).filter(w => w.length > 1);
  const titleLower = newTitle.toLowerCase();
  const missing = tagWords.filter(w => !titleLower.includes(w));
  if (missing.length > 0) {
    console.log('⚠️  ' + slug + ': tags[0] words missing from new title: ' + missing.join(', '));
    continue;
  }

  data.title = newTitle;
  const newRaw = matter.stringify(content, data);
  fs.writeFileSync(filePath, newRaw);
  console.log('✅ [' + newTitle.length + '] ' + slug + ': ' + newTitle);
  fixed++;
}
console.log('\nFixed: ' + fixed + '/15');

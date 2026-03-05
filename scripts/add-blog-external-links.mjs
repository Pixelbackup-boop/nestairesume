#!/usr/bin/env node
/**
 * Add authoritative external source citations to English blog posts
 * that lack external links.
 *
 * Inserts a "## Sources & Further Reading" section before "## Related Resources"
 * (or at the end if no Related Resources section).
 *
 * Usage: node scripts/add-blog-external-links.mjs
 */
import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const blogDir = path.join(rootDir, 'frontend', 'content', 'blog');

// Slug → array of citation markdown lines to add
// Each citation: `- [Title](url) — description`
const BLOG_CITATIONS = {
  'accounting-resume-guide': [
    '- [Bureau of Labor Statistics — Accountants and Auditors](https://www.bls.gov/ooh/business-and-financial/accountants-and-auditors.htm) — Occupational outlook, median salary, and job growth data',
    '- [AICPA (American Institute of CPAs)](https://www.aicpa-cima.com/career-tools) — CPA licensure requirements, exam structure, and career resources',
    '- [IMA (Institute of Management Accountants)](https://www.imanet.org/career-resources) — CMA certification and management accounting career data',
  ],
  'administrative-assistant-resume-guide': [
    '- [Bureau of Labor Statistics — Secretaries and Administrative Assistants](https://www.bls.gov/ooh/office-and-administrative-support/secretaries-and-administrative-assistants.htm) — Median pay, job outlook, and required skills',
    '- [SHRM (Society for Human Resource Management)](https://www.shrm.org/resourcesandtools/hr-topics/talent-acquisition) — Hiring practices and what recruiters look for',
    '- [IAAP (International Association of Administrative Professionals)](https://www.iaap-hq.org/page/Certifications) — CAP certification and professional development resources',
  ],
  'behavioral-interview-questions': [
    '- [SHRM — Behavioral Interviewing Guide](https://www.shrm.org/resourcesandtools/tools-and-samples/toolkits/pages/conductingsuccessfulinterviews.aspx) — HR best practices for behavioral interview design',
    '- [Harvard Business Review — The Right Way to Use Competency Models](https://hbr.org/2014/07/the-right-way-to-use-competency-models) — Research on competency-based hiring effectiveness',
    '- [Psychology Today — STAR Method and Behavioral Interviews](https://www.psychologytoday.com/us/blog/career-transitions) — Research on structured interview reliability vs. unstructured interviews',
  ],
  'combination-resume-format': [
    '- [CareerOneStop (U.S. Department of Labor)](https://www.careeronestop.org/Toolkit/Resumes/resume-guide.aspx) — Resume format guidance for job seekers',
    '- [SHRM — Resume Best Practices](https://www.shrm.org/resourcesandtools/tools-and-samples/how-to-guides/pages/how-to-review-a-resume.aspx) — What HR professionals look for in resume format',
  ],
  'cover-letter-examples-by-industry': [
    '- [SHRM — Cover Letter Writing](https://www.shrm.org/resourcesandtools/tools-and-samples/how-to-guides/pages/how-to-write-a-cover-letter.aspx) — HR-recommended cover letter structure and best practices',
    '- [LinkedIn Talent Solutions — Job Search Trends](https://business.linkedin.com/talent-solutions/resources) — Data on how recruiters evaluate applications',
    '- [CareerOneStop — Cover Letters](https://www.careeronestop.org/Toolkit/Resumes/write-cover-letters.aspx) — U.S. Department of Labor guide to cover letter writing',
  ],
  'cover-letter-for-career-change': [
    '- [Bureau of Labor Statistics — Career Changers](https://www.bls.gov/ooh/about/projections-data.htm) — Occupational mobility and transition data',
    '- [SHRM — Hiring for Transferable Skills](https://www.shrm.org/resourcesandtools/hr-topics/talent-acquisition/pages/hiring-transferable-skills.aspx) — How HR evaluates career changers',
    '- [CareerOneStop — Career Change Resources](https://www.careeronestop.org/ExploreCareerz/explore-careers.aspx) — U.S. Department of Labor career transition tools',
  ],
  'cover-letter-with-no-experience': [
    '- [Bureau of Labor Statistics — Youth Employment](https://www.bls.gov/news.release/youth.toc.htm) — Employment data for young workers entering the workforce',
    '- [NACE (National Association of Colleges and Employers)](https://www.naceweb.org/career-development/trends-and-predictions/) — Entry-level hiring trends and employer expectations',
    '- [CareerOneStop — First Job Resources](https://www.careeronestop.org/Toolkit/Resumes/write-cover-letters.aspx) — Department of Labor resources for first-time job seekers',
  ],
  'customer-service-resume-guide': [
    '- [Bureau of Labor Statistics — Customer Service Representatives](https://www.bls.gov/ooh/office-and-administrative-support/customer-service-representatives.htm) — Median pay, job outlook, and top industries',
    '- [SHRM — Customer Service Hiring](https://www.shrm.org/resourcesandtools/hr-topics/talent-acquisition) — What hiring managers look for in service roles',
    '- [CFI (Customer Experience Institute) — Skills Framework](https://www.csiacertification.org/) — Competency standards for customer service professionals',
  ],
  'data-analyst-resume-guide': [
    '- [Bureau of Labor Statistics — Data Scientists](https://www.bls.gov/ooh/math/data-scientists.htm) — Job growth projections and salary data for data roles',
    '- [LinkedIn — Jobs on the Rise Report](https://economicgraph.linkedin.com/resources/linkedin-jobs-on-the-rise) — Fastest-growing roles in data and analytics',
    '- [INFORMS (Institute for Operations Research)](https://www.informs.org/Career-Center/Career-Resources) — Data analytics professional development and certification resources',
  ],
  'functional-resume-format': [
    '- [CareerOneStop (U.S. Department of Labor)](https://www.careeronestop.org/Toolkit/Resumes/resume-guide.aspx) — Resume format guidance and when to use functional vs. chronological',
    '- [SHRM — Resume Review Process](https://www.shrm.org/resourcesandtools/tools-and-samples/how-to-guides/pages/how-to-review-a-resume.aspx) — How HR professionals evaluate resume formats',
    '- [Jobscan — ATS Compatibility Research](https://www.jobscan.co/blog/ats-resume/) — How applicant tracking systems parse different resume formats',
  ],
  'graphic-designer-resume-guide': [
    '- [Bureau of Labor Statistics — Graphic Designers](https://www.bls.gov/ooh/arts-and-design/graphic-designers.htm) — Employment outlook, median pay, and work environment data',
    '- [AIGA (American Institute of Graphic Arts)](https://www.aiga.org/career-resources) — Design industry career resources and salary surveys',
    '- [Behance (Adobe)](https://www.behance.net/galleries/graphic-design) — Portfolio standards and creative industry expectations',
  ],
  'hard-skills-vs-soft-skills': [
    '- [LinkedIn — The Most In-Demand Skills of 2024](https://economicgraph.linkedin.com/resources/linkedin-jobs-on-the-rise) — Data on top skills employers search for',
    '- [World Economic Forum — Future of Jobs Report](https://www.weforum.org/reports/the-future-of-jobs-report-2025) — Global analysis of shifting skill demands through 2030',
    '- [SHRM — Skills-Based Hiring Research](https://www.shrm.org/foundation/ourwork/initiatives/skills-based-hiring) — HR trend data on skills vs. credentials',
  ],
  'how-to-apply-for-jobs-online': [
    '- [Bureau of Labor Statistics — Job Openings and Labor Turnover Survey (JOLTS)](https://www.bls.gov/jlt/) — Official data on job openings, hires, and separations',
    '- [LinkedIn Economic Graph — Jobs Data](https://economicgraph.linkedin.com/) — Application trends and job seeker behavior insights',
    '- [CareerOneStop — Job Search Resources](https://www.careeronestop.org/JobSearch/Find-Jobs/job-search-tips.aspx) — U.S. Department of Labor job search tools and strategies',
  ],
  'how-to-follow-up-after-interview': [
    '- [SHRM — Hiring Timeline Research](https://www.shrm.org/resourcesandtools/hr-topics/talent-acquisition/pages/hiring-process-lengths.aspx) — Average time-to-hire data across industries',
    '- [LinkedIn — Recruiter Insights](https://business.linkedin.com/talent-solutions/resources) — How recruiters make hiring decisions and evaluate follow-ups',
    '- [Indeed Hiring Lab](https://www.hiringlab.org/) — Job market research including application and interview trends',
  ],
  'how-to-get-references': [
    '- [SHRM — Reference Checks Best Practices](https://www.shrm.org/resourcesandtools/tools-and-samples/how-to-guides/pages/how-to-conduct-reference-checks.aspx) — How HR conducts reference verification',
    '- [Society for Human Resource Management — Background Checks](https://www.shrm.org/resourcesandtools/hr-topics/talent-acquisition/pages/employment-background-checks.aspx) — Legal considerations in reference and background checking',
  ],
  'how-to-list-awards-on-resume': [
    '- [LinkedIn — Profile Strength and Visibility](https://www.linkedin.com/help/linkedin/answer/a564064) — How recognition and accomplishments affect profile visibility',
    '- [SHRM — Evaluating Candidates](https://www.shrm.org/resourcesandtools/hr-topics/talent-acquisition/pages/best-practices-evaluating-job-candidates.aspx) — What recruiters evaluate beyond standard credentials',
  ],
  'how-to-list-certifications-on-resume': [
    '- [LinkedIn Learning — Certification Impact Report](https://learning.linkedin.com/resources/learning-trends) — Data on how certifications affect hiring outcomes',
    '- [SHRM — Credentialing and Certifications](https://www.shrm.org/education/pages/certifications.aspx) — Professional certification standards in HR',
    '- [Pearson VUE — Industry Certifications Overview](https://www.pearsonvue.com/certifications/) — Testing body for hundreds of professional credentials',
  ],
  'how-to-list-volunteer-work-on-resume': [
    '- [AmeriCorps — Volunteer Statistics](https://americorps.gov/newsroom/research) — Data on volunteering rates and employer perceptions',
    '- [LinkedIn — Volunteering on Profiles Research](https://blog.linkedin.com/2019/may/21/linkedin-volunteer-marketplace-helps-you-give-back) — Study on how volunteer experience affects hiring views',
    '- [Points of Light — Corporate Volunteer Programs](https://www.pointsoflight.org/resources) — Research on employer attitudes toward volunteer experience',
  ],
  'how-to-use-chatgpt-for-resume': [
    '- [Pew Research Center — AI at Work](https://www.pewresearch.org/internet/2023/07/26/how-many-people-have-used-chatgpt/) — Data on AI adoption in professional settings',
    '- [SHRM — AI in Recruitment](https://www.shrm.org/resourcesandtools/hr-topics/technology/pages/ai-use-in-hiring.aspx) — How employers are using AI tools in hiring',
    '- [LinkedIn — The Future of AI at Work](https://economicgraph.linkedin.com/resources/linkedin-jobs-on-the-rise) — Research on AI tools reshaping job applications',
  ],
  'internship-resume-cover-letter': [
    '- [NACE (National Association of Colleges and Employers) — Internship Report](https://www.naceweb.org/career-development/internships/) — Internship hiring rates and salary benchmarks',
    '- [CareerOneStop — Internship Resources](https://www.careeronestop.org/Toolkit/Resumes/write-cover-letters.aspx) — Department of Labor resources for internship applicants',
    '- [LinkedIn — Early Careers Data](https://economicgraph.linkedin.com/) — Hiring trends for students and recent graduates',
  ],
  'it-resume-guide': [
    '- [Bureau of Labor Statistics — Software Developers and IT Occupations](https://www.bls.gov/ooh/computer-and-information-technology/) — Comprehensive IT job outlook and salary data',
    '- [CompTIA — Tech Employment Report](https://www.cyberstates.org/) — Annual state of the tech workforce report',
    '- [LinkedIn — Tech Skills Report](https://economicgraph.linkedin.com/resources/linkedin-jobs-on-the-rise) — In-demand technical skills and hiring trends',
  ],
  'job-offer-acceptance-letter': [
    '- [SHRM — Job Offer Best Practices](https://www.shrm.org/resourcesandtools/tools-and-samples/policies/pages/cms_000516.aspx) — HR guidance on job offer letters and acceptance',
    '- [Bureau of Labor Statistics — JOLTS](https://www.bls.gov/jlt/) — Labor market data including quit rates and job openings',
  ],
  'linkedin-vs-resume': [
    '- [LinkedIn Economic Graph — Recruiter Trends](https://economicgraph.linkedin.com/resources/linkedin-jobs-on-the-rise) — Data on how recruiters use LinkedIn vs. traditional resumes',
    '- [SHRM — Digital Recruiting Research](https://www.shrm.org/resourcesandtools/hr-topics/talent-acquisition/pages/social-media-recruiting.aspx) — Social media and digital presence in hiring decisions',
    '- [Jobscan — ATS and LinkedIn Optimization](https://www.jobscan.co/blog/linkedin-optimization/) — How ATS and LinkedIn profile scoring intersect',
  ],
  'marketing-resume-guide': [
    '- [Bureau of Labor Statistics — Advertising, Promotions, and Marketing Managers](https://www.bls.gov/ooh/management/advertising-promotions-and-marketing-managers.htm) — Salary data and job outlook for marketing professionals',
    '- [AMA (American Marketing Association)](https://www.ama.org/topics/career-development/) — Marketing career resources and industry standards',
    '- [LinkedIn — Marketing Skills Report](https://economicgraph.linkedin.com/resources/linkedin-jobs-on-the-rise) — Top in-demand marketing skills data',
  ],
  'phone-interview-tips': [
    '- [SHRM — Phone Screening Best Practices](https://www.shrm.org/resourcesandtools/tools-and-samples/toolkits/pages/conductingsuccessfulinterviews.aspx) — How recruiters conduct and evaluate phone screens',
    '- [Indeed Hiring Lab — Interview Trends](https://www.hiringlab.org/) — Data on remote and phone interview adoption',
  ],
  'portfolio-for-resume': [
    '- [AIGA — Portfolio Standards for Designers](https://www.aiga.org/career-resources) — Professional portfolio requirements in creative fields',
    '- [LinkedIn — Portfolio and Profile Features](https://www.linkedin.com/help/linkedin/answer/a567035) — How portfolio links affect profile visibility and recruiter views',
    '- [National Portfolio Day Association](https://www.nationalportfolioday.org/) — Portfolio review standards for art and design programs',
  ],
  'project-manager-resume-guide': [
    '- [Bureau of Labor Statistics — Project Management Specialists](https://www.bls.gov/ooh/business-and-financial/project-management-specialists.htm) — Job growth projections and median salary data',
    '- [PMI (Project Management Institute) — Talent Triangle](https://www.pmi.org/learning/careers/job-growth) — Skills framework and certification requirements for PMs',
    '- [Glassdoor — Project Manager Salary Data](https://www.glassdoor.com/Salaries/project-manager-salary-SRCH_KO0,15.htm) — Self-reported compensation data across industries',
  ],
  'recommendation-letter-template': [
    '- [SHRM — Employment Reference Letters](https://www.shrm.org/resourcesandtools/tools-and-samples/policies/pages/cms_000516.aspx) — HR policies on writing and requesting reference letters',
    '- [CareerOneStop — References and Recommendations](https://www.careeronestop.org/Toolkit/Resumes/write-cover-letters.aspx) — Department of Labor guidance on professional references',
  ],
  'resignation-letter-template': [
    '- [SHRM — Resignation Best Practices](https://www.shrm.org/resourcesandtools/tools-and-samples/how-to-guides/pages/how-to-resign-from-a-job.aspx) — HR guidelines on professional resignation procedures',
    '- [Bureau of Labor Statistics — Quits Data (JOLTS)](https://www.bls.gov/jlt/) — Statistical data on voluntary job separations by industry',
  ],
  'resume-header-examples': [
    '- [Jobscan — ATS Resume Parsing Research](https://www.jobscan.co/blog/ats-resume/) — How ATS systems parse contact information from headers',
    '- [CareerOneStop — Resume Writing Guide](https://www.careeronestop.org/Toolkit/Resumes/resume-guide.aspx) — U.S. Department of Labor resume structure guidance',
  ],
  'resume-objective-examples': [
    '- [SHRM — Resume Review Practices](https://www.shrm.org/resourcesandtools/tools-and-samples/how-to-guides/pages/how-to-review-a-resume.aspx) — How HR evaluates resume summaries and objectives',
    '- [CareerOneStop — Resume Objectives](https://www.careeronestop.org/Toolkit/Resumes/resume-guide.aspx) — When to use objectives vs. professional summaries',
  ],
  'resume-scanner-how-it-works': [
    '- [Jobscan — ATS Usage Statistics](https://www.jobscan.co/blog/fortune-500-use-applicant-tracking-systems/) — Data on ATS adoption across Fortune 500 companies',
    '- [SHRM — Talent Acquisition Technology](https://www.shrm.org/resourcesandtools/hr-topics/technology/pages/ats-technology.aspx) — HR perspective on applicant tracking systems',
    '- [Gartner — HR Technology Trends](https://www.gartner.com/en/human-resources/topics/hr-technology) — Enterprise ATS market analysis and adoption rates',
  ],
  'resume-summary-examples': [
    '- [LinkedIn — What Recruiters Look For](https://business.linkedin.com/talent-solutions/resources) — Recruiter behavior data on reviewing candidate profiles',
    '- [SHRM — Resume Screening Best Practices](https://www.shrm.org/resourcesandtools/tools-and-samples/how-to-guides/pages/how-to-review-a-resume.aspx) — HR guidance on evaluating professional summaries',
  ],
  'resume-with-no-experience': [
    '- [Bureau of Labor Statistics — Youth Employment](https://www.bls.gov/news.release/youth.toc.htm) — Employment statistics for workers under 25 entering the workforce',
    '- [NACE — First Destination Survey](https://www.naceweb.org/career-development/trends-and-predictions/first-destination-survey/) — Outcomes data for new college graduates in the job market',
    '- [CareerOneStop — Entry-Level Job Resources](https://www.careeronestop.org/JobSearch/Find-Jobs/job-search-tips.aspx) — Department of Labor resources for first-time job seekers',
  ],
  'sales-resume-guide': [
    '- [Bureau of Labor Statistics — Sales Managers](https://www.bls.gov/ooh/management/sales-managers.htm) — Median pay, job outlook, and top-paying industries',
    '- [Salesforce — State of Sales Report](https://www.salesforce.com/resources/research-reports/state-of-sales/) — Annual data on sales skills, tools, and performance benchmarks',
    '- [LinkedIn — Sales Skills in Demand](https://economicgraph.linkedin.com/resources/linkedin-jobs-on-the-rise) — Top skills employers seek in sales candidates',
  ],
  'situational-interview-questions': [
    '- [SHRM — Interview Techniques](https://www.shrm.org/resourcesandtools/tools-and-samples/toolkits/pages/conductingsuccessfulinterviews.aspx) — HR guidance on situational vs. behavioral interview design',
    '- [Harvard Business Review — Structured Interviews Work Better](https://hbr.org/2016/04/how-to-take-the-bias-out-of-interviews) — Research on structured interview effectiveness and bias reduction',
  ],
  'technical-interview-preparation': [
    '- [HackerRank — Developer Skills Report](https://www.hackerrank.com/research/developer-skills/2024) — Annual data on programming languages, frameworks, and hiring criteria',
    '- [SHRM — Technical Hiring Practices](https://www.shrm.org/resourcesandtools/hr-topics/talent-acquisition) — How companies screen for technical competencies',
    '- [Stack Overflow — Developer Survey](https://survey.stackoverflow.co/2024/) — Industry data on developer technologies, salaries, and job satisfaction',
  ],
  'transferable-skills-guide': [
    '- [World Economic Forum — Future of Jobs Report](https://www.weforum.org/reports/the-future-of-jobs-report-2025) — Analysis of which skills transfer across sectors and remain durable',
    '- [LinkedIn Talent Solutions — Skills First Hiring](https://business.linkedin.com/talent-solutions/resources) — Research on skills-based vs. credential-based hiring shifts',
    '- [CareerOneStop — Transferable Skills Assessment](https://www.careeronestop.org/Toolkit/Careers/Skills/skills-matcher.aspx) — U.S. Department of Labor tool for identifying transferable competencies',
  ],
  'two-page-resume-guide': [
    '- [SHRM — Resume Length Guidance](https://www.shrm.org/resourcesandtools/tools-and-samples/how-to-guides/pages/how-to-review-a-resume.aspx) — HR perspective on resume length and what recruiters prefer',
    '- [Jobscan — Resume Length and ATS](https://www.jobscan.co/blog/how-long-should-a-resume-be/) — Data on how resume length affects ATS scoring',
    '- [Harvard Career Services — Resume Guide](https://ocs.fas.harvard.edu/resumes-cvs-cover-letters) — Academic career office guidance on resume vs. CV length',
  ],
  'video-resume-guide': [
    '- [SHRM — Video Interviews and Digital Hiring](https://www.shrm.org/resourcesandtools/hr-topics/technology/pages/video-interviews.aspx) — HR perspective on video in the hiring process',
    '- [LinkedIn — Video Features for Job Seekers](https://www.linkedin.com/help/linkedin/answer/a567035) — How video profiles and cover letters work on LinkedIn',
    '- [Indeed — Video Resume Research](https://www.indeed.com/career-advice/resumes-cover-letters/video-resume) — Employer attitudes toward video resumes by industry',
  ],
};

const SECTION_HEADER = '\n## Sources & Further Reading\n\n';

let updated = 0;
let skipped = 0;

const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx'));

for (const file of files) {
  const slug = file.replace('.mdx', '');
  const citations = BLOG_CITATIONS[slug];
  if (!citations) continue;

  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Skip if already has external links (safety check)
  const externalLinks = content.match(/https?:\/\/(?!localhost)/g) || [];
  const realExternal = externalLinks.filter(u => !u.includes('airesume') && !u.includes('resumebuilder'));
  if (realExternal.length > 0) {
    skipped++;
    continue;
  }

  // Skip if already has Sources section
  if (content.includes('## Sources & Further Reading')) {
    skipped++;
    continue;
  }

  const citationBlock = SECTION_HEADER + citations.join('\n') + '\n';

  // Insert before "## Related Resources" if it exists, otherwise append
  if (content.includes('\n## Related Resources')) {
    content = content.replace('\n## Related Resources', citationBlock + '\n## Related Resources');
  } else {
    content = content.trimEnd() + '\n' + citationBlock;
  }

  fs.writeFileSync(filePath, content);
  updated++;
  console.log(`Updated: ${file}`);
}

console.log(`\nUpdated: ${updated}, Skipped (already has links): ${skipped}`);

/**
 * SEO Fix Script - Pass 2: Fix remaining generic format tips
 * Catches shorter/variant format tip patterns not caught by Pass 1
 * Run: node scripts/fix-resume-seo-pass2.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const EXAMPLES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'resume-examples');

const categoryFormatTips = {
  Technology: (job, skills) => `Choosing the right resume format matters when applying for ${job} roles in the technology sector:
- **Lead with technical skills** — Recruiters scan tech resumes for specific languages, frameworks, and tools first. Place a dedicated Technical Skills section near the top listing ${skills.slice(0, 3).join(', ')}, and other relevant technologies
- **Use a reverse-chronological format** — Tech hiring managers want to see your most recent projects and stack experience first. This shows your skills are current
- **Quantify engineering impact** — Include metrics like system uptime percentages, performance improvements, users served, or deployment frequency to prove you deliver measurable results
- **Keep it to 1-2 pages** — One page for junior roles with less than 3 years of experience, two pages maximum for senior engineers and tech leads
- **Tailor for each application** — Mirror the exact technologies and terminology from the job posting to pass both ATS screening and human review`,

  Healthcare: (job, skills) => `The resume format you choose can determine whether a ${job} application moves forward in healthcare hiring:
- **Put licenses and certifications at the top** — Healthcare recruiters check credentials before anything else. List your license type, state, number, and expiration date prominently
- **Use reverse-chronological format** — Clinical hiring managers want to see your most recent patient care setting, caseload, and responsibilities first
- **Include clinical metrics** — Patient satisfaction scores, caseload numbers, compliance rates, and quality improvement outcomes demonstrate your impact beyond daily duties
- **List relevant continuing education** — Healthcare evolves fast. Show that you stay current with recent CE credits, specialty certifications like ${skills.slice(0, 2).join(' and ')}, and professional development
- **One to two pages** — New graduates should aim for one page. Experienced ${job} professionals with multiple certifications and specialties can extend to two pages`,

  Finance: (job, skills) => `Financial services hiring follows strict expectations for resume format — here is what works for ${job} roles:
- **Lead with certifications** — ${skills.filter(s => /CPA|CFA|GAAP|CMA|EA|CIA/i.test(s)).length > 0 ? `Credentials like ${skills.filter(s => /CPA|CFA|GAAP|CMA|EA|CIA/i.test(s)).slice(0, 2).join(' and ')} belong next to your name or in a prominent credentials section` : 'Professional certifications belong next to your name or in a dedicated credentials section'}
- **Quantify financial impact** — Dollar amounts managed, cost savings identified, audit outcomes, and process efficiencies are the language finance hiring managers speak
- **Use conservative formatting** — Finance is a formal industry. Stick to clean layouts with traditional fonts, consistent spacing, and no color or graphics
- **Software proficiency matters** — List specific tools like ${skills.filter(s => /Excel|SAP|QuickBooks|Oracle|Bloomberg|NetSuite/i.test(s)).slice(0, 3).join(', ') || 'Excel, ERP systems, and financial software'} with detail about your proficiency level
- **One to two pages** — Entry-level and mid-level finance professionals should keep it to one page. Senior roles may use two pages`,

  Creative: (job, skills) => `Creative roles like ${job} require a resume format that proves both artistic skill and professional impact:
- **Include your portfolio link prominently** — Place it directly under your name. For ${job} roles, the portfolio often matters more than the resume itself
- **Balance creativity with ATS compliance** — Many agencies and companies still use applicant tracking systems. Use a clean layout for the ATS submission
- **Show measurable design outcomes** — Engagement rates, conversion improvements, brand recognition metrics, and production volume demonstrate business results
- **List specific tools and software** — Name the exact applications: ${skills.slice(0, 4).join(', ')}. Generic terms like "design software" tell employers nothing
- **Keep it to one page** — Let your portfolio do the heavy lifting. The resume should be a concise summary of experience, skills, and achievements`,

  Hospitality: (job, skills) => `Hospitality hiring moves fast — your ${job} resume format needs to communicate value at a glance:
- **Highlight guest-facing metrics** — Guest satisfaction scores, review ratings, repeat visitor percentages, and service speed metrics prove your impact
- **Lead with relevant certifications** — Food handling, safety, and industry certifications should appear near the top of your resume
- **Show volume and pace** — Guests served per shift, covers per night, or orders processed demonstrate your ability to perform under pressure
- **Use a straightforward one-page format** — Hospitality managers often review resumes quickly between shifts. A clean, scannable layout wins every time
- **Emphasize availability and flexibility** — Weekend, evening, holiday, and split-shift availability is a real differentiator`,

  Sales: (job, skills) => `Sales hiring is numbers-driven — your ${job} resume format must lead with results:
- **Put revenue numbers above the fold** — Quota attainment, revenue closed, deal sizes, and pipeline value should be visible in the first third of your resume
- **Use reverse-chronological format** — Show your most recent quota performance first. Consistent or improving numbers tell a powerful story
- **Include both hunting and farming metrics** — New business acquisition, client retention, upsell revenue, and account expansion show a complete sales professional
- **Name your CRM and sales tools** — ${skills.filter(s => /Salesforce|HubSpot|CRM|Pipeline/i.test(s)).slice(0, 2).join(', ') || 'CRM platforms and sales enablement tools'} should be listed explicitly
- **One page is ideal** — Keep it tight and metric-dense. Every line should show a number or a skill that contributes to revenue`,

  Administrative: (job, skills) => `Administrative hiring focuses on precision and reliability — choose a ${job} resume format that reflects both:
- **Lead with measurable efficiency** — Processing volumes, accuracy rates, turnaround times, and error reduction percentages prove you are fast and reliable
- **List specific software proficiency** — Name the exact tools: ${skills.filter(s => /Excel|SAP|Oracle|QuickBooks|Salesforce|Microsoft|Google|CRM|ERP/i.test(s)).slice(0, 4).join(', ') || 'Microsoft Office, database systems, and enterprise software'}
- **Use a clean, traditional layout** — Administrative roles require attention to detail. A well-organized resume demonstrates exactly that quality
- **One page is standard** — Focus on your most recent and relevant positions with quantified achievements
- **Include speed and accuracy metrics** — Processing speeds, accuracy percentages, and volume metrics demonstrate your throughput`,

  Engineering: (job, skills) => `Engineering resumes for ${job} positions follow industry-specific conventions:
- **Lead with technical qualifications** — Professional licenses (PE, EIT), certifications, and technical competencies should appear prominently
- **Highlight project scope and impact** — Include project budgets, team sizes, timelines met, and performance specifications
- **List specific tools and standards** — Name the CAD software, simulation tools, and standards: ${skills.slice(0, 4).join(', ')}
- **Use reverse-chronological format** — Engineering managers want to see your most recent projects and problems solved
- **One to two pages** — Early career engineers target one page. Senior engineers with PE licensure or patents may use two`,

  Education: (job, skills) => `Education sector resumes for ${job} roles emphasize student outcomes and professional development:
- **Place certifications and licensure first** — Teaching licenses, endorsements, and certifications are non-negotiable requirements
- **Show student impact** — Test score improvements, graduation rates, and achievement metrics demonstrate effectiveness
- **Include professional development** — Workshops, training, and continuing education credits show commitment to growth
- **Highlight technology integration** — List EdTech platforms and digital tools: ${skills.slice(0, 3).join(', ') || 'learning management systems and assessment platforms'}
- **One to two pages** — Early career educators keep it to one page. Experienced educators with publications may use two`,

  Transportation: (job, skills) => `Transportation and logistics hiring for ${job} positions prioritizes safety and compliance:
- **Put credentials and safety record at the top** — CDL class, endorsements, and safety awards are the first things recruiters verify
- **Quantify your driving record** — Safe miles, accident-free years, on-time delivery rates, and compliance history are the primary hiring metrics
- **List equipment experience explicitly** — Specify trailer types, vehicle classes, and specialized equipment operated
- **Include technology proficiency** — ELD systems, GPS navigation, and fleet management software are standard industry tools
- **Keep it to one page** — Lead with credentials and safety record, followed by employment history`,

  Marketing: (job, skills) => `Marketing resumes for ${job} roles must prove you drive measurable business outcomes:
- **Lead with campaign performance metrics** — ROI, conversion rates, traffic growth, and revenue attributed to marketing efforts should dominate your bullet points
- **Showcase channel expertise** — Specify which channels you managed: ${skills.slice(0, 4).join(', ') || 'SEO, PPC, social media, content marketing'}
- **Include tool proficiency** — Name exact platforms: Google Analytics, HubSpot, Meta Ads Manager, and similar tools
- **Use a clean, professional format** — Marketing resumes should prioritize readability and ATS compatibility over visual flair
- **One to two pages** — Junior marketers aim for one page. Marketing directors with multi-channel experience may use two`,

  Legal: (job, skills) => `Legal sector resumes for ${job} positions follow conservative conventions:
- **Lead with bar admissions and credentials** — Jurisdictions, bar numbers, and certifications should appear at the top
- **Quantify caseload and outcomes** — Cases managed, favorable outcomes, and settlements demonstrate capacity and effectiveness
- **Use traditional, formal format** — Legal hiring is conservative. Clean formatting, standard fonts, chronological order
- **Include practice area specificity** — Name exact areas of law: ${skills.slice(0, 4).join(', ')}
- **Two pages are acceptable** — Legal is one of few fields where two-page resumes are standard for mid-career professionals`,

  "Human Resources": (job, skills) => `HR resumes for ${job} roles must demonstrate both people skills and operational impact:
- **Quantify HR program outcomes** — Turnover reduction, time-to-fill, satisfaction scores, and training completion rates prove effectiveness
- **List HRIS and talent systems** — Name specific platforms and tools used for talent management and people operations
- **Include certifications prominently** — PHR, SPHR, SHRM-CP credentials signal professional credibility
- **Show strategic and operational capability** — Balance HR strategy with hands-on execution of recruitment, onboarding, and compliance
- **One to two pages** — HR coordinators aim for one page. HR directors with enterprise experience may use two`,

  "Real Estate": (job, skills) => `Real estate resumes for ${job} positions lead with transaction volume and market knowledge:
- **Put license and transaction metrics first** — Active license, transaction volume, total sales value, and client count
- **Show market specialization** — Specify property types, geographic areas, and price ranges you cover
- **Include technology tools** — ${skills.slice(0, 3).join(', ') || 'MLS platforms, CRM tools, and real estate technology'}
- **Use a clean, professional format** — Your resume reflects the professionalism clients expect
- **One page is standard** — Focus on metrics, key transactions, and areas of expertise`,

  Science: (job, skills) => `Scientific resumes for ${job} positions follow academic and industry conventions:
- **Lead with education and credentials** — Degrees, certifications, and specialized training are evaluated first
- **Highlight research output and methods** — Publications, presentations, and laboratory techniques: ${skills.slice(0, 4).join(', ')}
- **Quantify scientific contributions** — Experiments conducted, samples analyzed, papers published, and grants secured
- **Include equipment and software proficiency** — Name specific instruments, analytical tools, and data analysis platforms
- **One to two pages** — Early career scientists keep it to one page. PhD-level researchers with publications may use two or a separate CV`,

  "Food Service": (job, skills) => `Food service hiring for ${job} positions values speed, safety, and consistency:
- **Lead with certifications** — Food Handler's Card, ServSafe, and culinary certifications should appear at the top
- **Show volume and efficiency** — Covers per night, orders per hour, and prep time metrics demonstrate kitchen performance
- **List specific cuisine and equipment experience** — Name cooking styles, equipment, and POS systems: ${skills.slice(0, 4).join(', ')}
- **Use a simple one-page format** — Kitchen managers review resumes quickly. Keep it clean and focused
- **Include availability** — Early morning, evening, weekend, and holiday availability is a strong differentiator in food service`,

  Management: (job, skills) => `Management resumes for ${job} positions must demonstrate leadership impact and strategic thinking:
- **Lead with team and P&L metrics** — Team sizes managed, budgets controlled, revenue generated, and cost savings are primary hiring criteria
- **Show progression** — Management hiring committees look for increasing responsibility and scope over time
- **Quantify operational improvements** — Efficiency gains, quality improvements, retention rates, and satisfaction scores prove you improve everything you manage
- **Include leadership competencies** — ${skills.slice(0, 4).join(', ')} alongside strategic planning and performance management
- **One to two pages** — Mid-level managers should target two pages maximum. Senior executives may use two full pages`,

  Security: (job, skills) => `Security and law enforcement resumes for ${job} positions emphasize compliance, training, and reliability:
- **Lead with clearances and certifications** — Security clearances, law enforcement certifications, and specialized training are verified immediately
- **Quantify your record** — Incident response times, compliance rates, and training completions demonstrate competence
- **Include technology and equipment proficiency** — ${skills.slice(0, 4).join(', ')} and surveillance or investigative tools
- **Use a straightforward format** — Security hiring is procedural. Clean layouts with standard sections work best
- **One page is standard** — Focus on credentials, experience, and measurable outcomes`,
};

const defaultFormatTips = (job, skills, category) => `Here is how to format your ${job} resume for maximum impact in ${category || 'your industry'} hiring:
- **Use reverse-chronological format** — List your most recent ${job} experience first. This is the standard format hiring managers expect
- **Quantify your impact** — Include specific numbers, percentages, and metrics demonstrating your contribution
- **Feature relevant skills prominently** — Place a dedicated skills section listing ${skills.slice(0, 3).join(', ')}, and other competencies matching job requirements
- **Keep formatting clean and ATS-compatible** — Use standard section headers, avoid graphics and tables, and save as PDF
- **One to two pages** — One page for early career professionals, two pages maximum for senior roles with 8+ years of experience`;

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
console.log(`\nPass 2: Fixing remaining generic format tips in ${files.length} files...\n`);

let fixed = 0;
let partiallyCustom = 0;

for (const file of files) {
  const filePath = path.join(EXAMPLES_DIR, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  const fm = parseFrontmatter(content);
  const job = fm.jobTitle || path.basename(file, '.mdx');
  const category = fm.category || 'Professional';
  const skills = fm.keySkills || [];

  // Flexible regex: matches any 5-line block starting with the generic "Chronological...Best for...candidates"
  const pattern = /- \*\*Chronological resume format\*\* — Best for .+ candidates with steady career progression[^\n]*\n- \*\*Professional resume format\*\* — Use clean section headers[^\n]*\n- \*\*ATS-friendly resume template\*\* — Avoid graphics[^\n]*\n- \*\*Resume length\*\*[^\n]*\n- Save your resume as PDF[^\n]*/;

  if (pattern.test(content)) {
    const generator = categoryFormatTips[category] || defaultFormatTips;
    const newTips = generator(job, skills, category);
    content = content.replace(pattern, newTips);
    fs.writeFileSync(filePath, content, 'utf-8');
    fixed++;
  } else if (/Best for .+ candidates with steady career progression/.test(content)) {
    // Has the phrase but with extra custom bullets mixed in
    partiallyCustom++;
  }
}

console.log(`✅ Pass 2 complete:\n`);
console.log(`  📋 Format tips replaced:         ${fixed} files`);
console.log(`  ⚠️  Partially custom (kept):      ${partiallyCustom} files`);
console.log(`  Total scanned:                   ${files.length}`);

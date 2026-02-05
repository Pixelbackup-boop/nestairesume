/**
 * SEO Fix Script for Resume Example Pages
 * Fixes: dates, template openings, template format tips, identical CTAs
 * Run: node scripts/fix-resume-seo.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const EXAMPLES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'resume-examples');

// ── STEP 1: CTA VARIATIONS ──────────────────────────────────────────────────
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

// ── STEP 2: CATEGORY-SPECIFIC FORMAT TIPS ────────────────────────────────────
const categoryFormatTips = {
  Technology: (job, skills) => `Choosing the right resume format matters when applying for ${job} roles in the technology sector:
- **Lead with technical skills** — Recruiters scan tech resumes for specific languages, frameworks, and tools first. Place a dedicated Technical Skills section near the top listing ${skills.slice(0, 3).join(', ')}, and other relevant technologies
- **Use a reverse-chronological format** — Tech hiring managers want to see your most recent projects and stack experience first. This shows your skills are current
- **Quantify engineering impact** — Include metrics like system uptime percentages, performance improvements, users served, or deployment frequency to prove you deliver measurable results
- **Keep it to 1-2 pages** — One page for junior roles with less than 3 years of experience, two pages maximum for senior engineers and tech leads
- **Tailor for each application** — Mirror the exact technologies and terminology from the job posting. If they say "React" don't write "ReactJS" — match their language precisely`,

  Healthcare: (job, skills) => `The resume format you choose can determine whether a ${job} application moves forward in healthcare hiring:
- **Put licenses and certifications at the top** — Healthcare recruiters check credentials before anything else. List your license type, state, number, and expiration date prominently
- **Use reverse-chronological format** — Clinical hiring managers want to see your most recent patient care setting, caseload, and responsibilities first
- **Include clinical metrics** — Patient satisfaction scores, caseload numbers, compliance rates, and quality improvement outcomes demonstrate your impact beyond daily duties
- **List relevant continuing education** — Healthcare evolves fast. Show that you stay current with recent CE credits, specialty certifications like ${skills.slice(0, 2).join(' and ')}, and professional development
- **One to two pages** — New graduates should aim for one page. Experienced ${job} professionals with multiple certifications and specialties can extend to two pages`,

  Finance: (job, skills) => `Financial services hiring follows strict expectations for resume format — here is what works for ${job} roles:
- **Lead with certifications** — ${skills.filter(s => s.includes('CPA') || s.includes('CFA') || s.includes('GAAP') || s.includes('CMA')).length > 0 ? `Credentials like ${skills.filter(s => /CPA|CFA|GAAP|CMA|EA|CIA/.test(s)).slice(0, 2).join(' and ')} belong next to your name or in a prominent credentials section` : 'Professional certifications belong next to your name or in a dedicated credentials section'}
- **Quantify financial impact** — Dollar amounts managed, cost savings identified, audit outcomes, and process efficiencies are the language finance hiring managers speak. Every bullet point should include a number
- **Use conservative formatting** — Finance is a formal industry. Stick to clean layouts with traditional fonts, consistent spacing, and no color or graphics. Your attention to detail starts with your resume
- **Software proficiency matters** — List specific tools like ${skills.filter(s => /Excel|SAP|QuickBooks|Oracle|Bloomberg|NetSuite/i.test(s)).slice(0, 3).join(', ') || 'Excel, ERP systems, and financial software'} with detail about your proficiency level
- **One to two pages** — Entry-level and mid-level finance professionals should keep it to one page. Senior controllers, directors, and CFOs may use two pages`,

  Creative: (job, skills) => `Creative roles like ${job} require a resume format that proves both artistic skill and professional impact:
- **Include your portfolio link prominently** — Place it directly under your name. For ${job} roles, the portfolio often matters more than the resume itself. Use a clean URL and make sure it loads correctly
- **Balance creativity with ATS compliance** — Many agencies and companies still use applicant tracking systems. Use a clean layout for the ATS submission and save your creative formatting for the portfolio
- **Show measurable design outcomes** — Engagement rates, conversion improvements, brand recognition metrics, and production volume demonstrate that your creative work drives business results
- **List specific tools and software** — Name the exact applications: ${skills.slice(0, 4).join(', ')}. Generic terms like "design software" tell employers nothing
- **Keep it to one page** — Let your portfolio do the heavy lifting. The resume should be a concise summary of your experience, skills, and achievements — not a design showcase`,

  Hospitality: (job, skills) => `Hospitality hiring moves fast — your ${job} resume format needs to communicate value at a glance:
- **Highlight guest-facing metrics** — Guest satisfaction scores, review ratings, repeat visitor percentages, and service speed metrics prove your impact. Every hospitality employer cares about the guest experience
- **Lead with relevant certifications** — ${skills.some(s => /ServSafe|Food Safety|TIPS|CDL/i.test(s)) ? `Certifications like ${skills.filter(s => /ServSafe|Food Safety|TIPS|Alcohol/i.test(s)).slice(0, 2).join(' and ')} should appear near the top` : 'Food handling, safety, and industry certifications should appear near the top of your resume'}
- **Show volume and pace** — Guests served per shift, covers per night, or orders processed demonstrate your ability to perform under pressure in fast-paced environments
- **Use a straightforward one-page format** — Hospitality managers often review resumes quickly between shifts. A clean, scannable layout with clear section headers wins every time
- **Emphasize availability and flexibility** — Weekend, evening, holiday, and split-shift availability is a real differentiator. Mention your scheduling flexibility if applicable`,

  Sales: (job, skills) => `Sales hiring is numbers-driven — your ${job} resume format must lead with results:
- **Put revenue numbers above the fold** — Quota attainment percentage, total revenue closed, deal sizes, and pipeline value should be visible in the first 30% of your resume. Sales managers scan for these immediately
- **Use reverse-chronological format** — Show your most recent quota performance first. Consistent or improving numbers tell a powerful story of a top performer
- **Include both hunting and farming metrics** — New business acquisition, client retention rates, upsell revenue, and account expansion show a complete sales professional
- **Name your CRM and sales tools** — ${skills.filter(s => /Salesforce|HubSpot|CRM|Pipeline/i.test(s)).slice(0, 2).join(', ') || 'Salesforce, HubSpot, or similar CRM platforms'} should be listed explicitly along with any sales enablement tools you have used
- **One page is ideal** — Keep it tight and metric-dense. Every line should either show a number or a skill that directly contributes to revenue generation`,

  Administrative: (job, skills) => `Administrative hiring focuses on precision and reliability — choose a ${job} resume format that reflects both:
- **Lead with measurable efficiency** — Processing volumes, accuracy rates, turnaround times, and error reduction percentages prove that you are fast and reliable. These metrics matter more than job descriptions
- **List specific software proficiency** — Name the exact tools: ${skills.filter(s => /Excel|SAP|Oracle|QuickBooks|Salesforce|Microsoft|Google|CRM|ERP/i.test(s)).slice(0, 4).join(', ') || 'Microsoft Office, database systems, and relevant enterprise software'}. Include your skill level (pivot tables, macros, advanced formulas)
- **Use a clean, traditional layout** — Administrative roles require attention to detail. A well-organized resume with consistent formatting demonstrates exactly that quality
- **One page is standard** — Administrative resumes should be concise. Focus on your most recent and relevant positions with quantified achievements
- **Include typing speed and data metrics** — ${skills.some(s => /WPM|Typing|Data/i.test(s)) ? 'WPM, KPH, accuracy rates, and daily processing volumes are standard metrics that employers expect to see' : 'If applicable, include processing speeds, accuracy percentages, and volume metrics that demonstrate your throughput'}`,

  Engineering: (job, skills) => `Engineering resumes for ${job} positions follow industry-specific conventions:
- **Lead with technical qualifications** — Professional licenses (PE, EIT), relevant certifications, and technical competencies should appear prominently. Engineering hiring managers verify credentials early
- **Highlight project scope and impact** — Include project budgets, team sizes, timelines met, and performance specifications. Engineers who can manage complexity and deliver on schedule stand out
- **List specific tools and standards** — Name the CAD software, simulation tools, programming languages, and industry standards you work with: ${skills.slice(0, 4).join(', ')}
- **Use reverse-chronological format** — Engineering managers want to see your most recent projects and the technical problems you solved. Progressive responsibility demonstrates career growth
- **One to two pages** — Early career engineers should target one page. Senior engineers and those with PE licensure, patents, or publications may use two pages`,

  Education: (job, skills) => `Education sector resumes for ${job} roles emphasize student outcomes and professional development:
- **Place certifications and licensure first** — Teaching licenses, endorsements, and grade-level or subject-area certifications are non-negotiable requirements that hiring committees check immediately
- **Show student impact** — Test score improvements, graduation rates, program participation, and student achievement metrics demonstrate your effectiveness beyond daily instruction
- **Include professional development** — Workshops, training programs, and continuing education credits show commitment to growth. Education employers value lifelong learners
- **Highlight technology integration** — List specific EdTech platforms, learning management systems, and digital tools you use: ${skills.filter(s => /LMS|Google Classroom|Canvas|Blackboard|Smart/i.test(s)).slice(0, 3).join(', ') || 'learning management systems, classroom technology, and assessment platforms'}
- **One to two pages** — Early career educators should keep it to one page. Experienced educators with publications, committee work, and multiple certifications may use two`,

  Transportation: (job, skills) => `Transportation and logistics hiring for ${job} positions prioritizes safety and compliance:
- **Put your CDL, endorsements, and safety record at the top** — These are the first things fleet managers and recruiters verify. Include your CDL class, endorsement codes, and any safety awards prominently
- **Quantify your driving record** — Safe miles driven, accident-free years, on-time delivery percentages, and DOT compliance history are the primary metrics that determine hiring decisions
- **List equipment experience explicitly** — Specify the trailer types, vehicle classes, and specialized equipment you have operated. Each type requires different skills and employers match accordingly
- **Include technology proficiency** — ${skills.filter(s => /ELD|GPS|Fleet|Samsara|KeepTruckin/i.test(s)).slice(0, 3).join(', ') || 'ELD systems, GPS navigation, and fleet management software'} are now standard tools in the industry
- **Keep it to one page** — A clean, straightforward format works best. Lead with your credentials and safety record, followed by employment history with route types and freight specializations`,

  Marketing: (job, skills) => `Marketing resumes for ${job} roles must prove you drive measurable business outcomes:
- **Lead with campaign performance metrics** — ROI, conversion rates, traffic growth, engagement rates, and revenue attributed to marketing efforts should dominate your bullet points
- **Showcase channel expertise** — Specify which channels you have managed: ${skills.filter(s => /SEO|PPC|Social|Content|Email|Analytics/i.test(s)).slice(0, 4).join(', ') || 'SEO, PPC, social media, content marketing, and email campaigns'}. Marketing is broad — employers want to know your specific strengths
- **Include tool proficiency** — Name the exact platforms: Google Analytics, HubSpot, Salesforce Marketing Cloud, Meta Ads Manager, and similar tools. Marketing is increasingly technical
- **Use a clean, professional format** — Despite being in a creative-adjacent field, marketing resumes should prioritize readability and ATS compatibility over visual flair
- **One to two pages** — Junior marketers should aim for one page. Marketing managers and directors with multi-channel experience may use two pages`,

  Legal: (job, skills) => `Legal sector resumes for ${job} positions follow conservative conventions that reflect the profession:
- **Lead with your bar admissions and credentials** — Jurisdictions, bar numbers, and any specialized certifications should appear at the top of the resume or immediately after your name
- **Quantify your caseload and outcomes** — Number of cases managed, favorable outcomes, settlements negotiated, and contracts reviewed demonstrate your capacity and effectiveness
- **Use a traditional, formal format** — Legal hiring is conservative. Stick to clean formatting, standard fonts, and chronological order. Avoid any creative elements
- **Include practice area specificity** — Name the exact areas of law: ${skills.slice(0, 4).join(', ')}. General "legal experience" is insufficient for specialized hiring
- **Two pages are acceptable** — The legal profession is one of the few fields where two-page resumes are standard, even for mid-career professionals. Include relevant publications and pro bono work`,

  "Human Resources": (job, skills) => `HR resumes for ${job} roles must demonstrate both people skills and operational impact:
- **Quantify HR program outcomes** — Turnover reduction percentages, time-to-fill metrics, employee satisfaction scores, and training program completion rates prove your effectiveness
- **List HRIS and talent systems** — Name the specific platforms: ${skills.filter(s => /Workday|ADP|BambooHR|SAP|Greenhouse|Lever/i.test(s)).slice(0, 3).join(', ') || 'HRIS platforms, ATS tools, and talent management systems'}. HR is increasingly technology-driven
- **Include certifications prominently** — PHR, SPHR, SHRM-CP, or SHRM-SCP credentials signal professional credibility and should appear near the top
- **Show both strategic and operational capability** — Senior HR roles require strategy, but hiring managers also want to see hands-on execution of recruitment, onboarding, compliance, and employee relations
- **One to two pages** — HR coordinators and generalists should aim for one page. HR directors and VPs with enterprise-level experience may use two`,

  "Real Estate": (job, skills) => `Real estate resumes for ${job} positions lead with transaction volume and market knowledge:
- **Put license information and transaction metrics first** — Active real estate license, transaction volume, total sales value, and client count are the first things brokers and hiring managers verify
- **Show market specialization** — Specify property types (residential, commercial, luxury, industrial), geographic areas, and price ranges you work within
- **Include technology tools** — ${skills.filter(s => /MLS|CRM|Zillow|Realtor|DocuSign/i.test(s)).slice(0, 3).join(', ') || 'MLS platforms, CRM tools, and real estate technology'} should be listed explicitly
- **Use a clean, professional format** — Real estate is a relationship business. Your resume should reflect professionalism and attention to detail
- **One page is standard** — Keep it focused on your most impressive metrics, key transactions, and areas of expertise`,
};

// Default fallback for categories not listed above
const defaultFormatTips = (job, skills, category) => `Here is how to format your ${job} resume for maximum impact in ${category || 'your'} industry hiring:
- **Use reverse-chronological format** — List your most recent ${job} experience first. This is the standard format that hiring managers and recruiters expect to see
- **Quantify your impact** — Include specific numbers, percentages, and metrics that demonstrate your contribution. Measurable results always outperform generic responsibility lists
- **Feature relevant skills prominently** — Place a dedicated skills section listing ${skills.slice(0, 3).join(', ')}, and other competencies that match the job requirements
- **Keep formatting clean and ATS-compatible** — Use standard section headers, avoid graphics and tables, and save as PDF. Many employers use applicant tracking systems that cannot parse complex layouts
- **One to two pages** — One page for early career professionals, two pages maximum for those with 8+ years of experience or senior-level roles`;

// ── STEP 3: UNIQUE OPENING PARAGRAPH GENERATORS ─────────────────────────────
// These create genuinely different openings based on category + job specifics
const categoryOpenings = {
  Technology: (job, salary, growth, skills) =>
    `Landing a ${job} role in today's competitive tech market requires more than technical skills — it requires a resume that communicates your value within seconds. With an average salary of ${salary} and ${growth} projected job growth, ${job} positions attract strong applicant pools. Your resume needs to demonstrate hands-on expertise with tools like ${skills.slice(0, 3).join(', ')}, along with measurable project outcomes that prove you can deliver. This guide breaks down exactly how to structure your ${job} resume so that both automated screening systems and human reviewers move you forward.`,

  Healthcare: (job, salary, growth, skills) =>
    `Healthcare employers evaluate ${job} candidates differently than most industries — clinical competence, certifications, and patient outcomes drive hiring decisions. With ${growth} job growth and an average salary of ${salary}, the ${job} field is expanding, but competition for top positions remains strong. Your resume must immediately communicate your licensure, specialty experience, and measurable patient care results. This guide covers the specific sections, metrics, and formatting that healthcare recruiters look for when reviewing ${job} applications.`,

  Finance: (job, salary, growth, skills) =>
    `Finance hiring is detail-oriented and numbers-driven — exactly how your ${job} resume should read. Earning an average of ${salary} with ${growth} projected growth, ${job} roles require demonstrable precision, compliance knowledge, and quantifiable business impact. Hiring managers look for specific certifications, software proficiency in tools like ${skills.filter(s => /Excel|SAP|QuickBooks|Oracle|Bloomberg/i.test(s)).slice(0, 2).join(' and ') || 'industry-standard platforms'}, and concrete examples of cost savings or process improvements. This guide shows you how to build a ${job} resume that speaks the language finance teams understand.`,

  Creative: (job, salary, growth, skills) =>
    `A ${job} resume faces a unique challenge — it must demonstrate creative ability through a professional document format. At an average salary of ${salary}, ${job} roles attract talented candidates, and hiring managers expect to see both artistic vision and business results. Your portfolio showcases your visual work, but the resume must prove you deliver measurable outcomes: engagement rates, brand impact, and production efficiency. This guide covers how to balance creative credibility with the structured format that gets your ${job} application past screening systems and in front of decision-makers.`,

  Hospitality: (job, salary, growth, skills) =>
    `Hospitality hiring moves fast, and your ${job} resume needs to make an impression quickly. With ${growth} job growth and an average salary of ${salary}, ${job} positions reward candidates who can demonstrate speed, service quality, and operational reliability. Managers want to see guest satisfaction metrics, volume handled during peak periods, and relevant certifications — not generic job descriptions. This guide shows you exactly how to present your ${job} experience in a format that busy hospitality hiring managers respond to.`,

  Sales: (job, salary, growth, skills) =>
    `In sales, your resume is your first pitch — and a ${job} resume should close as effectively as you do. With average compensation of ${salary} and ${growth} market growth, ${job} roles demand proof of revenue impact. Hiring managers will look for quota attainment, deal sizes, pipeline metrics, and account growth before they read anything else. This guide covers how to structure your ${job} resume so your sales numbers lead every section and your track record speaks for itself.`,

  Administrative: (job, salary, growth, skills) =>
    `Administrative roles like ${job} are evaluated on precision, speed, and reliability — your resume should reflect all three. At an average salary of ${salary} with ${growth} projected growth, ${job} positions require candidates who can demonstrate processing efficiency, software proficiency, and organizational skills through concrete metrics. Hiring managers scan for specific tools like ${skills.filter(s => /Excel|SAP|Oracle|Microsoft|Google/i.test(s)).slice(0, 2).join(' and ') || 'enterprise software platforms'}, accuracy rates, and volume handled. This guide covers the format and content that ${job} hiring teams prioritize.`,

  Engineering: (job, salary, growth, skills) =>
    `Engineering firms evaluate ${job} candidates on technical qualifications, project complexity, and problem-solving track record. With an average salary of ${salary} and ${growth} industry growth, ${job} roles attract candidates with strong technical foundations. Your resume needs to showcase licensure, project scope (budgets, team sizes, timelines), and specific tools: ${skills.slice(0, 3).join(', ')}. This guide explains how to format your ${job} resume so that technical reviewers and hiring managers both see a qualified engineer.`,

  Education: (job, salary, growth, skills) =>
    `Education hiring committees review ${job} applications with specific criteria in mind: licensure, student impact, and professional growth. Earning an average of ${salary} with ${growth} projected demand, ${job} positions require candidates who can demonstrate measurable classroom outcomes alongside administrative competence. This guide covers how to present your teaching experience, certifications, and student achievement data in the format that school administrators and hiring committees expect to see.`,

  Transportation: (job, salary, growth, skills) =>
    `Fleet managers and recruiters reviewing ${job} applications check three things immediately: credentials, safety record, and equipment experience. With an average salary of ${salary} and ${growth} industry growth driven by demand, ${job} positions are available — but carriers prioritize candidates with clean driving records and documented compliance. This guide shows how to structure your ${job} resume so that your CDL credentials, endorsements, and safe driving metrics appear exactly where recruiters look for them.`,

  Marketing: (job, salary, growth, skills) =>
    `Marketing is a results-driven field, and your ${job} resume must prove you drive measurable business outcomes. At an average salary of ${salary} with ${growth} growth, ${job} roles attract data-savvy candidates who can demonstrate campaign ROI, audience growth, and conversion improvements. Hiring managers want specifics: which channels you managed, what tools you used (${skills.slice(0, 3).join(', ')}), and what metrics moved as a result. This guide covers how to present your ${job} experience in a format that proves marketing impact.`,

  Legal: (job, salary, growth, skills) =>
    `Legal hiring follows established conventions, and your ${job} resume must conform to the profession's expectations while demonstrating substantive expertise. With an average salary of ${salary} and ${growth} market outlook, ${job} positions require clear evidence of bar admissions, practice area depth, and caseload management capability. This guide covers the formatting standards and content priorities that law firms and legal departments apply when reviewing ${job} candidates.`,

  "Human Resources": (job, salary, growth, skills) =>
    `HR professionals evaluate resumes for a living — which means your ${job} resume will be scrutinized more closely than most. Earning an average of ${salary} with ${growth} projected demand, ${job} roles require demonstrated expertise in talent management, compliance, and measurable program outcomes. This guide covers how to present your HR experience in a format that passes both the ATS systems you likely manage and the peer review of fellow HR professionals.`,

  "Real Estate": (job, salary, growth, skills) =>
    `Real estate hiring is driven by transaction volume and market expertise. Your ${job} resume must demonstrate a proven track record of closed deals, client relationships, and market knowledge. At an average of ${salary} with ${growth} industry growth, ${job} positions reward professionals who can quantify their sales performance and showcase their area specialization. This guide shows how to format your resume so that brokers and firms immediately see your production numbers and market expertise.`,
};

const defaultOpening = (job, salary, growth, skills, category) =>
  `Building an effective ${job} resume requires understanding what hiring managers in the ${category || 'industry'} sector prioritize during screening. With an average salary of ${salary} and ${growth} projected job growth, ${job} positions attract qualified candidates — and your resume must stand out from the start. Beyond listing responsibilities, a strong ${job} resume quantifies your impact, highlights relevant skills like ${skills.slice(0, 3).join(', ')}, and presents your experience in a format that passes both automated screening and human review. This guide covers the specific content and structure that gets ${job} applicants called in for interviews.`;

// ── MAIN SCRIPT ──────────────────────────────────────────────────────────────

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm = {};
  const lines = match[1].split('\n');
  for (const line of lines) {
    const kv = line.match(/^(\w+):\s*"?(.+?)"?\s*$/);
    if (kv) {
      let val = kv[2].replace(/^"/, '').replace(/"$/, '');
      fm[kv[1]] = val;
    }
    const arrMatch = line.match(/^(\w+):\s*\[(.+)\]/);
    if (arrMatch) {
      fm[arrMatch[1]] = arrMatch[2].split(',').map(s => s.trim().replace(/^"/, '').replace(/"$/, ''));
    }
  }
  return fm;
}

function processFile(filePath, index, total) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const fm = parseFrontmatter(content);
  const job = fm.jobTitle || fm.title?.split(' Resume')[0] || path.basename(filePath, '.mdx');
  const category = fm.category || 'Professional';
  const skills = fm.keySkills || [];
  const salary = fm.avgSalary || 'competitive';
  const growth = fm.jobGrowth || 'positive';
  const slug = fm.slug || path.basename(filePath, '.mdx');

  let changes = [];

  // ── FIX 1: Update dates 2025 → 2026 ──
  const dateUpdated = content.replace(/2025/g, '2026');
  if (dateUpdated !== content) {
    content = dateUpdated;
    changes.push('dates');
  }

  // ── FIX 2: Replace template opening paragraph ──
  // Pattern: "This [job] resume example shows exactly what hiring managers want to see. The right resume format makes the difference between landing an interview and getting filtered out."
  const templateOpeningRegex = /This .+ resume example shows exactly what hiring managers want to see\. The right resume format makes the difference between landing an interview and getting filtered out\./;
  if (templateOpeningRegex.test(content)) {
    const openingGenerator = categoryOpenings[category] || defaultOpening;
    const newOpening = openingGenerator(job, salary, growth, skills, category);

    // Replace just the template sentence(s) — keep the rest of the paragraph
    content = content.replace(
      /This .+ resume example shows exactly what hiring managers want to see\. The right resume format makes the difference between landing an interview and getting filtered out\.\s*/,
      newOpening + ' '
    );
    changes.push('opening');
  }

  // ── FIX 3: Replace template format tips section ──
  // Detect the generic format tips block
  const genericFormatRegex = /- \*\*Chronological resume format\*\* — Best for .+ candidates with steady career progression.*\n.*- \*\*Professional resume format\*\* — Use clean section headers, consistent spacing, and a modern but readable font.*\n.*- \*\*ATS-friendly resume template\*\* — Avoid graphics, tables, and columns that confuse applicant tracking systems\..*\n.*- \*\*Resume length\*\* — 1 page for entry-level.*\n.*- Save your resume as PDF to preserve your resume format across all devices and ATS platforms/;

  if (genericFormatRegex.test(content)) {
    const formatGenerator = categoryFormatTips[category] || defaultFormatTips;
    const newFormatTips = formatGenerator(job, skills, category);

    content = content.replace(genericFormatRegex, newFormatTips);
    changes.push('format-tips');
  }

  // ── FIX 4: Replace identical CTA ──
  const genericCTARegex = /Ready to build your .+ resume\? Use our AI resume builder to create a professional resume template with the perfect resume format in minutes\./;
  if (genericCTARegex.test(content)) {
    // Use consistent CTA per file based on index to avoid randomness on re-runs
    const ctaIndex = index % ctaVariations.length;
    const newCTA = ctaVariations[ctaIndex](job);
    content = content.replace(genericCTARegex, newCTA);
    changes.push('cta');
  }

  // Also handle slight variation: "Start with a proven resume example and get on the road..."
  const altCTARegex = /Ready to build your .+ resume\? Use our AI resume builder to create a professional resume template with the perfect resume format in minutes\. Start with a proven resume example.*/;
  if (altCTARegex.test(content)) {
    const ctaIndex = index % ctaVariations.length;
    const newCTA = ctaVariations[ctaIndex](job);
    content = content.replace(altCTARegex, newCTA);
    if (!changes.includes('cta')) changes.push('cta');
  }

  if (changes.length > 0) {
    fs.writeFileSync(filePath, content, 'utf-8');
  }

  return changes;
}

// ── RUN ──────────────────────────────────────────────────────────────────────

const files = fs.readdirSync(EXAMPLES_DIR)
  .filter(f => f.endsWith('.mdx'))
  .sort();

console.log(`\nProcessing ${files.length} resume example files...\n`);

const stats = { dates: 0, opening: 0, 'format-tips': 0, cta: 0, unchanged: 0 };

files.forEach((file, i) => {
  const filePath = path.join(EXAMPLES_DIR, file);
  const changes = processFile(filePath, i, files.length);

  if (changes.length === 0) {
    stats.unchanged++;
  } else {
    changes.forEach(c => stats[c]++);
  }

  if ((i + 1) % 50 === 0 || i === files.length - 1) {
    console.log(`  Processed ${i + 1}/${files.length}...`);
  }
});

console.log(`\n✅ Done! Changes applied:\n`);
console.log(`  📅 Dates updated (2025→2026):      ${stats.dates} files`);
console.log(`  📝 Openings rewritten:              ${stats.opening} files`);
console.log(`  📋 Format tips made job-specific:   ${stats['format-tips']} files`);
console.log(`  🎯 CTAs varied:                     ${stats.cta} files`);
console.log(`  ⏭️  Already unique (no changes):     ${stats.unchanged} files`);
console.log(`\n  Total files processed: ${files.length}`);

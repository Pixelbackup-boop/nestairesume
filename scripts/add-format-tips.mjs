#!/usr/bin/env node
/**
 * Add "Resume Format & Template Tips" section to resume example MDX files that are missing it.
 * Each file gets profession-specific formatting advice.
 * Inserts before "Hiring Manager Tip" or "Common Mistakes" section.
 *
 * Usage: node scripts/add-format-tips.mjs [--dry-run]
 */

import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const require = createRequire(path.join(rootDir, 'frontend', 'package.json'));
const matter = require('gray-matter');

const CONTENT_DIR = path.join(rootDir, 'frontend/content/resume-examples');
const DRY_RUN = process.argv.includes('--dry-run');

// ─── Slug-specific format tips ──────────────────────────────────────
const SLUG_TIPS = {
  'firefighter': {
    intro: 'Fire department hiring panels scan resumes differently than corporate recruiters. Your format must prioritize certifications, apparatus experience, and physical qualifications:',
    tips: [
      '**Lead with certifications and licenses** — Place Firefighter I/II, EMT/Paramedic, Hazmat, and CPAT certification in a dedicated section immediately after your contact information. Departments verify these before reading anything else',
      '**List apparatus and equipment experience** — Create a "Qualifications" section noting specific apparatus operated (engine, ladder, rescue, tanker) and specialized equipment (thermal imager, Jaws of Life, SCBA). Match these to the department fleet',
      '**Use fire service terminology, not corporate language** — "Performed primary search in IDLH environment" communicates to fire officers. "Responded to emergencies" does not. Mirror the terminology from the job announcement',
      '**Include physical fitness data** — CPAT completion date, annual physical assessment results, and specialized team qualifications (rope rescue, swift water, confined space) demonstrate readiness',
      '**Keep it to 1-2 pages in reverse chronological order** — Lead with your most recent department. Include response volume, station assignment, and rank. Fire hiring panels expect a clean, military-style format without creative elements',
    ],
  },
  'police-officer': {
    intro: 'Law enforcement hiring is documentation-heavy and highly structured. Your resume format must reflect the precision and discipline expected of officers:',
    tips: [
      '**Place POST certification and academy at the top** — Badge number (if appropriate), certification number, and academy graduation date belong in a credentials section right below your name',
      '**Organize by assignment and rank** — Use clear role headers: "Patrol Officer — South Division," "Detective — Major Crimes Unit." Hiring panels want to see your career progression at a glance',
      '**Quantify patrol and investigative work** — Calls for service volume, arrest statistics, case clearance rates, and commendation counts. Numbers differentiate experienced officers from basic applicants',
      '**List specialized training in a dedicated section** — CIT, SWAT, K-9, accident reconstruction, firearms instructor, and FTO certifications deserve their own block. These are the qualifications that earn assignment to specialized units',
      '**Use a clean, conservative format** — No colors, graphics, or creative layouts. Law enforcement values professionalism. One-inch margins, consistent fonts, and structured sections signal discipline',
    ],
  },
  'college-professor': {
    intro: 'Academic positions require a CV rather than a resume. Format expectations are rigid and discipline-specific:',
    tips: [
      '**Use CV format, not resume format** — Academic CVs have no page limit. Include every publication, presentation, grant, course taught, and committee assignment. Completeness matters more than brevity',
      '**Organize publications by type and citation style** — Peer-reviewed articles, book chapters, conference proceedings, and works in progress each get separate subsections. Use your discipline standard citation format (APA, MLA, Chicago)',
      '**List grants with full details** — Agency name, award number, amount, your role (PI, Co-PI, Senior Personnel), and project period. Include unfunded proposals for major grants — they demonstrate competitiveness',
      '**Separate teaching from research sections** — Courses taught with enrollment numbers, new courses developed, and teaching evaluations belong in their own section distinct from research activities',
      '**Include service and mentorship** — Committee assignments, dissertation committees chaired, editorial board memberships, and conference organization roles demonstrate institutional citizenship',
    ],
  },
  'photographer': {
    intro: 'Photography hiring is portfolio-first, but your resume still matters for establishing professional credibility and business acumen:',
    tips: [
      '**Put your portfolio URL in the header** — Make it the most prominent element after your name. No hiring manager will evaluate a photographer without seeing work samples',
      '**Organize by photography genre** — If you shoot multiple genres (wedding, commercial, editorial), group experience accordingly. Studios and agencies hire for specific genre expertise',
      '**Include technical and business metrics** — Events per year, images delivered per project, turnaround time, client satisfaction rates, and revenue figures prove professional capacity beyond artistic talent',
      '**List equipment familiarity without making it the focus** — Camera systems, lighting rigs, and post-processing tools belong in a skills section, not in your bullet points. Capabilities matter more than gear',
      '**Keep the resume to 1 page** — Let your portfolio do the visual heavy lifting. The resume should be clean, minimal, and text-focused with strong metrics and clear specialization',
    ],
  },
  'paralegal': {
    intro: 'Law firm hiring managers expect paralegal resumes that mirror the precision and attention to detail required in legal work:',
    tips: [
      '**Lead with practice area specialization** — State your litigation, corporate, IP, family, or real estate focus in the first line of your summary. Attorneys hire for practice area experience first',
      '**Create a "Legal Technology" section** — List Westlaw, LexisNexis, Relativity, e-filing platforms, and case management software separately. Technology proficiency is a primary screening criterion',
      '**Quantify caseload and document volumes** — "Managed 45 active cases" and "Reviewed 150,000 documents in e-discovery" demonstrate capacity. Law firms need to know you can handle their volume',
      '**Include bar-related credentials** — Paralegal certificate program (note ABA-approval status), any state certifications (CP, RP, CLA), and CLE hours completed. These verify professional qualification',
      '**Use professional, conservative formatting** — Law firms expect the same attention to formatting they require in court filings. Consistent fonts, proper alignment, and flawless grammar are non-negotiable',
    ],
  },
  'elementary-teacher': {
    intro: 'School principals scan teacher resumes for licensure, student outcome data, and classroom management evidence. Your format should surface these immediately:',
    tips: [
      '**Place teaching license and endorsements at the top** — License type (standard, professional, initial), state, endorsement areas, and expiration date. Principals verify licensure before reading further',
      '**Lead experience bullets with student outcome data** — Assessment score improvements, reading level gains, and proficiency rate increases are the metrics administrators care about most',
      '**Include a "Classroom Management" line in each role** — Name your methodology (PBIS, Responsive Classroom, Love and Logic) and include a data point: referral reduction, attendance improvement, or behavior tracking results',
      '**List grade levels and subjects with specificity** — "3rd Grade ELA/Math — 26 students" is more informative than "Elementary Teacher." Include student population details (ELL percentage, inclusion students)',
      '**Add a "Professional Development" section** — But only include PD you implemented with results. "Completed Orton-Gillingham training; 12 struggling readers gained 1.5 grade levels" shows applied learning',
    ],
  },
  'dog-trainer': {
    intro: 'Dog training is a credentials-driven field where methodology transparency and client results determine hiring:',
    tips: [
      '**List certifications immediately after your name** — CPDT-KA, CPDT-KSA, KPA-CTP, IAABC, or Fear Free credentials establish professional legitimacy. Uncertified trainers are increasingly filtered out',
      '**State your training methodology clearly** — The industry has strong philosophical divides. Whether positive reinforcement, clicker-based, or balanced training, make your approach explicit in your summary',
      '**Quantify client outcomes** — Annual consultation volume, behavior improvement success rates, class completion percentages, and client retention rates prove professional effectiveness',
      '**Separate specializations** — Behavior modification, basic obedience, service dog training, competition prep, and puppy socialization are distinct services. Organize your experience around your specialties',
      '**Include continuing education** — Conference attendance (APDT, ClickerExpo), mentorship programs, webinar hours, and books or programs studied. The field evolves rapidly and employers value ongoing learning',
    ],
  },
  'animator': {
    intro: 'Animation studios evaluate technical capability, production speed, and pipeline fit. Your resume format must complement your demo reel:',
    tips: [
      '**Demo reel link is mandatory** — Place it in the header alongside your email. Keep it under 2 minutes, lead with your strongest shot, and include only work relevant to the position. A resume without a reel gets skipped',
      '**Specify animation discipline** — 2D, 3D character, motion graphics, VFX, or stop-motion are different hiring tracks. State your specialty clearly in your title and summary',
      '**Include production credits with scale** — "Animated 120 shots for [Series Name], Netflix" communicates more than "Worked on animated TV show." Name the project, studio, platform, and your shot count',
      '**List pipeline tools and collaboration software** — ShotGrid/Shotgun, Perforce, Maya, Blender, After Effects, Nuke — studios need to know you fit their pipeline without extensive onboarding',
      '**Keep the resume to 1 page** — Studios review hundreds of applications. Your reel shows skill; your resume shows professionalism, speed, and collaboration capability. Keep it tight and metric-driven',
    ],
  },
  'music-producer': {
    intro: 'Music industry hiring evaluates your catalog, technical capability, and genre fit. Your resume format should drive people to listen:',
    tips: [
      '**Lead with a listening link** — Spotify artist profile, SoundCloud, or personal website with embedded players. Place it in the header. A producer resume without a discography link will not be reviewed',
      '**Include commercial metrics** — Streaming numbers, chart positions, sync licensing placements, and session client roster. "50M+ combined Spotify streams" or "Music placed in 3 national TV commercials" proves market viability',
      '**List DAW and studio proficiency with context** — "Mixed 45-track album in Pro Tools at Capitol Studios" beats "Proficient in Pro Tools." Show what you created, not just what software you own',
      '**Organize by genre or service type** — Production, mixing, mastering, and composition are distinct services. If you specialize in specific genres, group credits accordingly',
      '**Keep the resume concise and link-driven** — One page maximum. Your resume is a gateway to your work, not a substitute for it. Include relevant credits, metrics, and links — let the music speak for itself',
    ],
  },
};

// ─── Category-based fallback format tips ────────────────────────────
const CATEGORY_TIPS = {
  'Education': (jobTitle, skills) => ({
    intro: `${jobTitle} resumes are reviewed by administrators who prioritize licensure, student outcomes, and instructional methodology. Format your resume to surface these elements immediately:`,
    tips: [
      `**Place licensure and endorsements prominently** — Teaching license type, state, endorsement areas, and expiration date should appear in a credentials section near the top. Administrators verify licensure before proceeding`,
      `**Lead each role with student outcome metrics** — Test score improvements, proficiency rates, and learning gains are the primary evidence principals evaluate. Open each position with your strongest data point`,
      `**Include grade level, subject, and class size** — "4th Grade Math/Science — 28 students, including 6 IEP and 4 ELL" gives administrators the context they need to evaluate your experience`,
      `**Add a focused Professional Development section** — Include only training you implemented with measurable results. Workshops without application are padding; applied training with data is compelling`,
      `**Keep it to 1-2 pages** — One page for teachers with under 5 years experience. Two pages only if you have leadership roles, curriculum development, or published research to document`,
    ],
  }),
  'Legal': (jobTitle, skills) => ({
    intro: `Legal hiring demands the same precision in your resume that firms expect in court filings. Format your ${jobTitle} resume for the exactness attorneys require:`,
    tips: [
      `**Lead with practice area specialization** — State your legal focus (litigation, corporate, IP, family) in the first line of your summary. Law firms filter by practice area before anything else`,
      `**Create a dedicated Legal Technology section** — Westlaw, LexisNexis, Relativity, e-filing platforms, and case management software proficiency are primary screening criteria`,
      `**Quantify case volumes and document scales** — "Managed 40+ active cases" and "Reviewed 100K documents in e-discovery" demonstrates capacity that firms need to assess staffing`,
      `**Include certifications and credentials** — Paralegal certificates (note ABA-approval), state-specific certifications, and continuing legal education hours verify professional qualification`,
      `**Maintain flawless grammar and conservative formatting** — Typos on a legal resume are disqualifying. Use consistent fonts, professional spacing, and meticulous proofreading`,
    ],
  }),
  'Healthcare': (jobTitle, skills) => ({
    intro: `Healthcare ${jobTitle} resumes are screened for credentials first and experience second. Your format must prioritize licensure and clinical qualifications:`,
    tips: [
      `**Place licenses and certifications at the top** — License type, number, state, and expiration date. Include BLS, ACLS, and specialty certifications. Facilities verify credentials before reviewing experience`,
      `**Specify patient population and acuity** — "Medical-surgical unit, 12-15 patients per shift" or "ICU, 1:2 nurse-to-patient ratio" tells hiring managers exactly where you have worked`,
      `**Name EHR systems specifically** — Epic, Cerner, Meditech, or CPSI — not "electronic health records." Facilities want staff who can start productively without extensive system training`,
      `**Include compliance and quality metrics** — Infection rates, falls data, medication error rates, or survey results demonstrate quality awareness beyond basic patient care`,
      `**Use reverse chronological format, 1-2 pages** — Lead with your most recent clinical role. Include clinical hours for new graduates. Keep formatting professional and easy to scan`,
    ],
  }),
  'Trades & Labor': (jobTitle, skills) => ({
    intro: `${jobTitle} hiring focuses on certifications, safety record, and hands-on capability. Your resume format should make these immediately visible:`,
    tips: [
      `**Lead with certifications and safety training** — OSHA 10/30, trade licenses, and equipment certifications belong in a credentials section right after your contact information`,
      `**Include project scope and volume metrics** — Number of projects completed, dollar values, square footage, and team sizes demonstrate professional capacity beyond generic job descriptions`,
      `**List specific equipment and tools operated** — Name the equipment: forklifts, backhoes, welding rigs, or diagnostic tools. Matching equipment experience to employer needs is a primary hiring filter`,
      `**Highlight your safety record** — Years without incidents, safety awards, and protocol compliance data. Companies prioritize ${jobTitle} candidates who minimize liability risk`,
      `**Keep formatting clean and functional** — One page preferred. Use clear section headers, bullet points, and consistent formatting. Avoid creative layouts — trade hiring values substance over style`,
    ],
  }),
  'Creative & Design': (jobTitle, skills) => ({
    intro: `${jobTitle} hiring is portfolio-driven, but your resume establishes professional credibility and business impact:`,
    tips: [
      `**Portfolio link in the header is mandatory** — Make it the most prominent element after your name. A creative resume without a work samples link is incomplete`,
      `**State your creative specialization clearly** — Brand design, UX/UI, motion graphics, and illustration are different hiring tracks. Make your focus obvious in the first line of your summary`,
      `**Include production metrics alongside creative output** — Projects completed, turnaround times, client counts, and revenue impact prove professional capacity beyond artistic talent`,
      `**List tools in a skills section, not in your bullets** — Software proficiency (Adobe Creative Suite, Figma, After Effects) belongs in a clean skills block. Bullets should describe what you created and the business outcome`,
      `**Keep the resume to 1 page with clean design** — Your portfolio showcases creative ability. Your resume should be text-focused, metric-driven, and professionally formatted`,
    ],
  }),
  'Hospitality & Service': (jobTitle, skills) => ({
    intro: `${jobTitle} resumes need to demonstrate service quality, revenue impact, and operational capability in a scannable format:`,
    tips: [
      `**Lead with guest satisfaction metrics** — Review scores, satisfaction ratings, NPS, or repeat customer rates belong in your summary or first bullet point. Service quality is the primary hiring criterion`,
      `**Include volume and revenue data** — Covers per shift, guests served, daily revenue, average check size, or upselling percentages demonstrate capacity and financial contribution`,
      `**Name POS and reservation systems** — Toast, Square, OpenTable, Opera, or Micros. Properties want ${jobTitle} staff who can be productive immediately without extensive system training`,
      `**List certifications prominently** — ServSafe, food handler, alcohol service (TIPS), and any hospitality-specific certifications should be visible near the top of your resume`,
      `**Keep it to 1 page with clear sections** — Hospitality hiring moves fast. Hiring managers scan for relevant experience, certifications, and metrics in under 30 seconds`,
    ],
  }),
  'Public Service': (jobTitle, skills) => ({
    intro: `Government and public service ${jobTitle} hiring follows structured processes. Your resume must meet format expectations while highlighting public impact:`,
    tips: [
      `**Specify jurisdiction size and scope** — "Served municipality of 85,000 residents" or "Managed 14-department coordination" contextualizes your public service experience`,
      `**List certifications and professional development** — Government positions often require specific credentials. Include every relevant certification, training program, and CE course`,
      `**Quantify constituent impact** — Processing volumes, response times, program participation rates, and cost savings demonstrate measurable public service effectiveness`,
      `**Use clear, jargon-free language** — Hiring panels may include members from different agencies. Spell out program names and explain initiatives in terms of community benefit`,
      `**Follow agency format requirements** — Some government positions specify resume format and length. If the posting includes format instructions, follow them exactly`,
    ],
  }),
  'Business & Finance': (jobTitle, skills) => ({
    intro: `${jobTitle} resumes must demonstrate both functional expertise and measurable business impact. Format for maximum clarity:`,
    tips: [
      `**Lead with your strongest metric** — Revenue generated, cost savings, portfolio size, or process improvement percentages belong in your summary. Hiring managers scan for business impact first`,
      `**Name specific software and platforms** — QuickBooks, SAP, Salesforce, HubSpot, or Excel (specify advanced features). Generic "computer proficiency" is meaningless in ${jobTitle} hiring`,
      `**Quantify every achievement** — Percentages, dollar amounts, time savings, and headcount numbers. "Managed accounts" is a task; "Managed 50+ accounts totaling $2.5M annual revenue" is an achievement`,
      `**Include industry certifications** — CPA, CFA, PMP, Six Sigma, or relevant professional certifications deserve prominent placement. These are primary screening criteria for many ${jobTitle} roles`,
      `**Use reverse chronological format, 1-2 pages** — One page for under 7 years experience. Conservative formatting with clear section headers. Business hiring favors substance over creative design`,
    ],
  }),
  'Animal Care': (jobTitle, skills) => ({
    intro: `${jobTitle} hiring evaluates credentials, animal handling capability, and client service skills. Your resume format should surface qualifications immediately:`,
    tips: [
      `**List certifications prominently** — Professional credentials (CPDT-KA, CVT, Fear Free, NAIA) establish credibility. Place them right after your name or in a dedicated section near the top`,
      `**Specify animal types and care capacity** — Include species handled, daily census, and specialized procedures. "Cared for 50+ animals across 12 species" provides more context than "Provided animal care"`,
      `**Include outcome metrics** — Adoption rates, training success percentages, rehabilitation completions, or client satisfaction scores demonstrate effectiveness beyond basic care duties`,
      `**Mention safety and health protocols** — Zoonotic disease prevention, bite protocols, and emergency procedures knowledge shows professional awareness of risk management`,
      `**Keep it to 1 page with clean, professional formatting** — Use clear sections for credentials, experience, and skills. Include any relevant continuing education or conference attendance`,
    ],
  }),
};

const CATEGORY_MAP = {
  'Technology': 'Business & Finance',
  'Healthcare': 'Healthcare',
  'Education': 'Education',
  'Business': 'Business & Finance',
  'Finance': 'Business & Finance',
  'Sales': 'Business & Finance',
  'Marketing': 'Business & Finance',
  'Legal': 'Legal',
  'Creative': 'Creative & Design',
  'Design': 'Creative & Design',
  'Hospitality': 'Hospitality & Service',
  'Food Service': 'Hospitality & Service',
  'Customer Service': 'Hospitality & Service',
  'Trades': 'Trades & Labor',
  'Construction': 'Trades & Labor',
  'Maintenance': 'Trades & Labor',
  'Cleaning': 'Trades & Labor',
  'Government': 'Public Service',
  'Public Safety': 'Public Service',
  'Transportation': 'Public Service',
  'Sports & Fitness': 'Hospitality & Service',
  'Beauty & Wellness': 'Hospitality & Service',
  'Animal Care': 'Animal Care',
};

function getTips(slug, jobTitle, category, skills) {
  if (SLUG_TIPS[slug]) return SLUG_TIPS[slug];
  const mappedCat = CATEGORY_MAP[category] || 'Business & Finance';
  const generator = CATEGORY_TIPS[mappedCat] || CATEGORY_TIPS['Business & Finance'];
  return generator(jobTitle, skills);
}

function buildSection(jobTitle, tips) {
  let section = `\n## ${jobTitle} Resume Format & Template Tips\n\n${tips.intro}\n\n`;
  for (const tip of tips.tips) {
    section += `- ${tip}\n`;
  }
  section += '\n';
  return section;
}

// ─── Main ────────────────────────────────────────────────────────────
const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.mdx'));
let added = 0;
let skipped = 0;

console.log(`Processing ${files.length} files...\n`);

for (const file of files) {
  const filePath = path.join(CONTENT_DIR, file);
  const raw = fs.readFileSync(filePath, 'utf8');

  // Skip if already has format tips section
  if (/^## .*(Resume Format|Format & Template)/m.test(raw)) {
    skipped++;
    continue;
  }

  const { data, content } = matter(raw);
  const slug = data.slug || file.replace('.mdx', '');
  const jobTitle = data.jobTitle || slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const category = data.category || '';
  const skills = data.keySkills || [];

  const tips = getTips(slug, jobTitle, category, skills);
  const section = buildSection(jobTitle, tips);

  // Insert before "Hiring Manager Tip" or "Common Mistakes"
  let newContent;
  if (content.includes('## Hiring Manager Tip')) {
    newContent = content.replace('## Hiring Manager Tip', section + '## Hiring Manager Tip');
  } else if (content.includes('## Common Mistakes')) {
    newContent = content.replace('## Common Mistakes', section + '## Common Mistakes');
  } else if (/## ATS Optimization/m.test(content)) {
    newContent = content.replace(/## ATS Optimization/, section + '## ATS Optimization');
  } else {
    newContent = content + '\n' + section;
  }

  if (DRY_RUN) {
    console.log(`[DRY RUN] Would add Format Tips to: ${file}`);
  } else {
    const updated = matter.stringify(newContent, data);
    fs.writeFileSync(filePath, updated, 'utf8');
    console.log(`Added Format Tips to: ${file}`);
  }
  added++;
}

console.log(`\n✅ Format Tips: ${added} sections added, ${skipped} already had it.`);
if (DRY_RUN) console.log('This was a dry run.');

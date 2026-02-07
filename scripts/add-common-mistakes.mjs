#!/usr/bin/env node
/**
 * Add "Common Mistakes to Avoid" section to resume example MDX files that are missing it.
 * Each file gets 5 profession-specific mistakes.
 * Inserts before "Hiring Manager Tip" or "ATS Optimization" section.
 *
 * Usage: node scripts/add-common-mistakes.mjs [--dry-run]
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

// ─── Slug-specific mistakes ─────────────────────────────────────────────
const SLUG_MISTAKES = {
  'firefighter': [
    { title: 'Omitting certifications and license numbers', detail: 'Fire departments verify EMT, Paramedic, Firefighter I/II, and Hazmat certifications before interviews. List each with the issuing body and expiration date.' },
    { title: 'Describing only fire suppression duties', detail: 'Modern firefighters handle EMS calls, technical rescue, hazmat response, and community education. A resume that only mentions putting out fires undersells your scope.' },
    { title: 'Ignoring physical fitness standards', detail: 'CPAT completion, annual physical assessments, and specialized rescue team qualifications are differentiators. Departments want proof you meet the physical demands.' },
    { title: 'Using civilian job language', detail: '"Managed emergencies" is vague. Use fire service terminology: "Performed primary search in zero-visibility IDLH environment" or "Operated as nozzle operator on first-due engine."' },
    { title: 'Not mentioning apparatus and equipment experience', detail: 'List specific apparatus you have operated (engine, ladder/truck, rescue, tanker) and specialized equipment (Jaws of Life, thermal imaging camera, SCBA). Departments match candidates to their fleet.' },
  ],
  'police-officer': [
    { title: 'Leaving off POST certification and academy details', detail: 'Every department verifies Peace Officer Standards and Training certification. Include your academy name, graduation date, and any specialized academy training (detective, K-9, SWAT).' },
    { title: 'Listing only patrol duties without metrics', detail: '"Patrolled assigned area" describes every officer. Quantify: arrest numbers, citation volume, case clearance rates, community engagement events organized, or training hours completed.' },
    { title: 'Omitting specialized unit experience', detail: 'Narcotics, gang task force, school resource officer, accident reconstruction, or crisis negotiation experience sets you apart. Highlight unit assignments even if they were temporary.' },
    { title: 'Not mentioning technology proficiency', detail: 'Modern policing relies on body cameras, CAD/RMS systems, license plate readers, and digital evidence management. Departments upgrading technology want officers who can adapt.' },
    { title: 'Ignoring community policing achievements', detail: 'Departments increasingly value community relations. If you led neighborhood watch programs, youth mentorship, or de-escalation training initiatives, these belong on your resume.' },
  ],
  'college-professor': [
    { title: 'Submitting a resume instead of a CV', detail: 'Academic positions require a comprehensive curriculum vitae listing all publications, courses taught, grants, conference presentations, and committee service. A 1-2 page resume signals unfamiliarity with academic hiring.' },
    { title: 'Listing publications without citation format', detail: 'Use your discipline standard citation format (APA, MLA, Chicago). Include DOIs for published work and note "under review" or "forthcoming" status for pending publications.' },
    { title: 'Neglecting teaching philosophy and pedagogy', detail: 'Even research-focused institutions want evidence of teaching effectiveness. Include course evaluations scores, pedagogical innovations, and curriculum development contributions.' },
    { title: 'Not distinguishing grant roles', detail: 'List whether you were PI, Co-PI, or senior personnel on each grant. Include the funding agency, award amount, and project period. Unfunded proposals for major grants still demonstrate competitiveness.' },
    { title: 'Omitting graduate student mentorship', detail: 'Number of dissertations chaired, thesis committees served on, and post-doc mentees supervised are key metrics at research universities. Search committees evaluate your capacity to build a lab group.' },
  ],
  'photographer': [
    { title: 'Not linking to a portfolio', detail: 'A photographer resume without a portfolio link is incomplete. Include your website URL prominently in the header. If you specialize in different genres, organize portfolio sections accordingly.' },
    { title: 'Listing equipment instead of capabilities', detail: '"Own Canon R5 and three L-series lenses" is gear bragging. Instead: "Specialize in low-light event photography delivering 500+ edited images per wedding with 48-hour turnaround."' },
    { title: 'Omitting post-processing and delivery workflow', detail: 'Clients hire for the full service. Mention your editing software (Lightroom, Capture One, Photoshop), turnaround times, and delivery platforms (galleries, prints, albums).' },
    { title: 'No business metrics for freelance work', detail: 'If freelance, include client count, annual bookings, repeat client rate, or revenue growth. Treating photography as "just art" without business awareness limits corporate and agency opportunities.' },
    { title: 'Generic descriptions for different photography genres', detail: 'Wedding, commercial, editorial, product, and portrait photography require different skills. Tailor your bullets to the specific genre the employer shoots. A product photography studio does not care about your wedding experience.' },
  ],
  'animator': [
    { title: 'No demo reel or portfolio link', detail: 'An animator resume without a demo reel link will be discarded immediately. Place it in your header. Keep the reel under 2 minutes, lead with your strongest work, and include only pieces relevant to the position.' },
    { title: 'Listing software without showing what you created', detail: '"Proficient in Maya, Blender, After Effects" tells studios nothing. Instead: "Animated 30-second character sequences in Maya for a Netflix original series viewed by 15M+ households."' },
    { title: 'Not specifying animation type', detail: '2D, 3D, stop-motion, motion graphics, and VFX are different disciplines. Studios hire for specific pipelines. Make your specialization clear in the first line of your summary.' },
    { title: 'Omitting pipeline and collaboration experience', detail: 'Studios work in structured pipelines. Mention your experience with asset management (Shotgun/ShotGrid, Perforce), render farms, and handoff workflows between modeling, rigging, and animation departments.' },
    { title: 'Ignoring frame counts and production scale', detail: 'Quantify your output: frames per day, shots completed per episode, or total runtime animated. Production managers evaluate speed alongside quality when staffing projects.' },
  ],
  'fashion-designer': [
    { title: 'No visual portfolio accompanying the resume', detail: 'Fashion hiring is portfolio-driven. Link to your website or attach a PDF lookbook. Your resume gets you consideration; your portfolio gets you hired.' },
    { title: 'Not specifying market segment experience', detail: 'Luxury, contemporary, fast fashion, athleisure, and childrenswear are different worlds. Hiring managers want to know you understand their price point, customer, and production timeline.' },
    { title: 'Omitting technical design skills', detail: 'Pattern making, draping, tech pack creation, and PLM software (Centric, YuniquePLM) proficiency matter as much as creative vision. Especially at mid-level, technical execution is what gets tested.' },
    { title: 'No production or sourcing context', detail: 'Mention fabric sourcing, manufacturer relationships, costing, and quality control experience. Designers who understand the business side of production are more valuable than pure creatives.' },
    { title: 'Using only creative language without business metrics', detail: '"Designed a beautiful collection" is subjective. "Designed 40-piece resort collection that generated $2.1M in wholesale orders" demonstrates business impact.' },
  ],
  'paralegal': [
    { title: 'Not specifying practice area experience', detail: 'Litigation, corporate, real estate, family law, IP, and immigration paralegals do fundamentally different work. Attorneys hire for practice area familiarity, so lead with your specialization.' },
    { title: 'Omitting legal technology proficiency', detail: 'List specific platforms: Westlaw, LexisNexis, Relativity, Clio, NetDocuments, or iManage. Law firms investing in technology want paralegals who reduce the learning curve.' },
    { title: 'Describing tasks instead of case outcomes', detail: '"Drafted discovery requests" is a task. "Drafted discovery requests for 35+ cases, including a $4.2M commercial litigation matter that settled favorably" shows scope and outcome.' },
    { title: 'Leaving off certification status', detail: 'Include your paralegal certificate or degree, ABA-approval status of your program, and any state-specific certifications (CP, RP, CLA). Many firms require ABA-approved program graduates.' },
    { title: 'Not mentioning case volume and document management scale', detail: 'Managing a 500-document case is different from managing 500,000 documents in e-discovery. Include document volumes, deposition counts, and case values to show your capacity.' },
  ],
  'elementary-teacher': [
    { title: 'Listing grade levels without student outcomes', detail: '"Taught 3rd grade reading" is a duty. "Raised 3rd grade reading proficiency from 62% to 81% on state assessment through guided reading groups and differentiated instruction" is an achievement.' },
    { title: 'Omitting state licensure details', detail: 'Include your teaching license type (standard, professional, initial), endorsement areas, and state. Principals verify licensure before scheduling interviews.' },
    { title: 'Not mentioning classroom management approach', detail: 'Every principal wants to know you can manage a classroom. Reference your methodology (PBIS, responsive classroom, Love and Logic) and observable results (office referral reduction, behavior data).' },
    { title: 'Generic professional development listing', detail: 'Do not list every workshop you attended. Highlight PD that you then implemented with measurable results: "Completed Orton-Gillingham training; implemented with 12 struggling readers who averaged 1.5 grade-level growth."' },
    { title: 'Ignoring parent and community engagement', detail: 'Mention parent communication systems, conference participation rates, community partnerships, or family literacy events you organized. Schools value teachers who build relationships beyond the classroom.' },
  ],
  'dog-trainer': [
    { title: 'Not listing certifications prominently', detail: 'CPDT-KA, CPDT-KSA, KPA-CTP, IAABC, or Fear Free certification immediately signals professionalism. Place certifications right after your name or in a dedicated section near the top.' },
    { title: 'Describing only basic obedience work', detail: 'Specializations in behavior modification, reactivity, separation anxiety, service dog training, or competition obedience differentiate you. Specify what types of cases you handle.' },
    { title: 'No client volume or success metrics', detail: '"Trained dogs" is meaningless. "Conducted 600+ private behavior consultations annually with a 92% client-reported improvement rate" demonstrates professional capacity.' },
    { title: 'Omitting training methodology', detail: 'The industry has strong methodology preferences. State whether you use positive reinforcement, clicker training, or balanced methods. Employers and clients select trainers based on philosophy alignment.' },
    { title: 'Leaving off continuing education', detail: 'Dog training science evolves rapidly. List recent seminars, conferences (APDT, ClickerExpo), and authors or programs you have studied under. This signals commitment to evidence-based practice.' },
  ],
  'music-producer': [
    { title: 'No links to produced work', detail: 'Include your Spotify, SoundCloud, or personal website link in the header. A producer resume without a discography or listening link will not be taken seriously.' },
    { title: 'Listing DAWs without production context', detail: '"Proficient in Pro Tools, Logic, Ableton" is generic. Instead: "Produced and mixed 45-track album in Pro Tools, mastered for Dolby Atmos distribution across Apple Music."' },
    { title: 'Not mentioning commercial metrics', detail: 'Include streaming numbers, chart positions, sync placements, or revenue generated. "Co-produced track reaching #12 on Billboard Hot 100 with 50M+ Spotify streams" proves commercial viability.' },
    { title: 'Omitting studio and gear experience', detail: 'Mention studio environments (commercial, home, mobile), console experience (SSL, Neve, API), and whether you handle your own engineering. Versatility in studio setup is valued.' },
    { title: 'Ignoring genre specialization', detail: 'Hip-hop, pop, country, EDM, and film scoring producers have different workflows and client expectations. State your genre focus clearly so employers and artists can assess fit.' },
  ],
};

// ─── Category-based fallback mistakes ────────────────────────────────
const CATEGORY_MISTAKES = {
  'Education': (jobTitle, skills) => [
    { title: 'Listing duties instead of student outcomes', detail: `"Taught ${skills[0] || 'classes'}" describes your assignment, not your impact. Quantify student growth, assessment gains, or program completion rates.` },
    { title: 'Omitting licensure and endorsement details', detail: `Include your teaching license type, endorsement areas, and state. Administrators verify credentials before scheduling interviews for ${jobTitle} positions.` },
    { title: 'Not mentioning differentiation strategies', detail: `Schools prioritize ${jobTitle} candidates who serve diverse learners. Reference specific strategies you use for ELL students, IEP accommodations, or gifted learners.` },
    { title: 'Generic professional development listing', detail: `Listing every workshop is padding. Highlight PD you implemented with measurable student impact. Quality over quantity signals intentional growth.` },
    { title: 'Ignoring technology integration', detail: `Digital literacy is expected. Mention specific edtech platforms (Google Classroom, Canvas, Nearpod) and how you used them to improve engagement or learning outcomes.` },
  ],
  'Legal': (jobTitle, skills) => [
    { title: 'Not specifying practice area expertise', detail: `${jobTitle} candidates must lead with their specialization. Litigation, corporate, IP, family, and real estate work require different skill sets. Hiring attorneys filter by practice area first.` },
    { title: 'Omitting legal technology proficiency', detail: `List specific platforms: Westlaw, LexisNexis, Relativity, Clio, or NetDocuments. Law firms want ${jobTitle} professionals who reduce the technology learning curve.` },
    { title: 'Describing tasks without case context', detail: `"Drafted motions" is generic. Add case type, complexity, and outcome: "Drafted 15+ dispositive motions in commercial litigation matters ranging from $500K to $8M."` },
    { title: 'Leaving off bar admission or certification details', detail: `Include jurisdiction, admission date, and any specialty certifications. Employers verify credentials early in the hiring process.` },
    { title: 'Not quantifying case volume', detail: `Managing 10 cases is different from 100. Include caseload size, document volumes, and deadline complexity to demonstrate capacity.` },
  ],
  'Healthcare': (jobTitle, skills) => [
    { title: 'Not listing licenses and certifications prominently', detail: `Healthcare employers verify credentials first. Place your license type, number, state, and expiration near the top. Missing credentials means immediate disqualification.` },
    { title: 'Using generic patient care descriptions', detail: `"Provided patient care" describes every healthcare worker. Specify patient population, acuity level, and volume: "Managed care for 12-15 acute medical-surgical patients per shift."` },
    { title: 'Omitting EHR system experience', detail: `Name specific systems (Epic, Cerner, Meditech) rather than "electronic health records." Facilities want ${jobTitle} candidates who can onboard quickly to their platform.` },
    { title: 'Not mentioning compliance and safety metrics', detail: `Include infection rates, falls prevention data, medication error rates, or Joint Commission survey results. ${jobTitle} candidates who track outcomes demonstrate quality awareness.` },
    { title: 'Ignoring continuing education and specialty training', detail: `Healthcare evolves constantly. List relevant CEUs, specialty certifications, and clinical competencies that match the position requirements.` },
  ],
  'Trades & Labor': (jobTitle, skills) => [
    { title: 'Omitting certifications and safety training', detail: `OSHA 10/30, trade licenses, and equipment certifications must be listed prominently. ${jobTitle} hiring decisions often start with credential verification.` },
    { title: 'Listing tools without demonstrating what you built', detail: `"Operated hand and power tools" is assumed. Instead: "Completed 200+ residential ${skills[0] || 'projects'} per year with zero safety incidents and 98% client satisfaction."` },
    { title: 'Not quantifying project scope', detail: `Include project values, square footage, timelines, and team sizes. "Led 4-person crew on $150K residential renovation completed 3 days ahead of schedule" shows capability.` },
    { title: 'Ignoring safety record', detail: `Zero-incident streaks, safety committee participation, and OSHA compliance metrics matter. Companies face liability costs and want ${jobTitle} professionals with clean safety records.` },
    { title: 'Not mentioning code compliance knowledge', detail: `Building codes, inspection standards, and permit processes vary by jurisdiction. Demonstrating code knowledge shows you deliver work that passes inspection the first time.` },
  ],
  'Business & Finance': (jobTitle, skills) => [
    { title: 'Listing responsibilities without financial impact', detail: `"Managed budgets" is a task. "${jobTitle} who managed $2.4M operating budget with 3% under-spend while maintaining service levels" is an achievement.` },
    { title: 'Not specifying software and platform proficiency', detail: `Name exact tools: QuickBooks, SAP, Salesforce, Excel (specify advanced features like pivot tables, VLOOKUP, macros). Generic "computer skills" is meaningless in ${jobTitle} hiring.` },
    { title: 'Omitting regulatory and compliance knowledge', detail: `Financial roles require compliance awareness. Mention specific regulations, certifications (CPA, CFA, Series licenses), and audit experience relevant to the position.` },
    { title: 'Using jargon without demonstrating results', detail: `"Optimized processes" and "streamlined operations" are clichés without metrics. Attach percentage improvements, time savings, or revenue impact to every claim.` },
    { title: 'Ignoring cross-functional collaboration', detail: `${jobTitle} roles rarely work in isolation. Mention which departments you collaborated with and the business outcomes of that coordination.` },
  ],
  'Creative & Design': (jobTitle, skills) => [
    { title: 'No portfolio or work samples link', detail: `Creative hiring is portfolio-driven. Your resume opens the door; your work gets you hired. Include your portfolio URL prominently in the header.` },
    { title: 'Listing software without showing what you created', detail: `"Proficient in Adobe Creative Suite" tells nothing. "Designed 200+ social media assets monthly for a 500K-follower brand using Photoshop and Illustrator" shows production capacity.` },
    { title: 'Not specifying your creative specialty', detail: `Brand design, UX/UI, motion graphics, illustration, and ${skills[0] || 'production design'} are different fields. Hiring managers filter by specialization — make yours clear immediately.` },
    { title: 'Omitting client or stakeholder management experience', detail: `Creative work involves feedback cycles. Mention how many stakeholders you managed, revision processes, and how you balanced creative vision with business requirements.` },
    { title: 'No metrics on creative output impact', detail: `"Designed marketing materials" is a task. "Designed email campaign templates that increased click-through rate by 35%" connects creative work to business outcomes.` },
  ],
  'Hospitality & Service': (jobTitle, skills) => [
    { title: 'Not mentioning customer satisfaction metrics', detail: `Guest satisfaction scores, review ratings, repeat customer rates, and NPS scores prove service quality. ${jobTitle} candidates with documented guest feedback stand out.` },
    { title: 'Listing duties without volume context', detail: `"Served customers" is universal. "Served 150+ guests per shift in a 200-seat fine dining restaurant with a 4.8/5.0 guest satisfaction average" shows capacity and quality.` },
    { title: 'Omitting POS and reservation system experience', detail: `Name specific systems: Toast, Square, OpenTable, Opera, Micros. Properties want ${jobTitle} professionals who can start productive on day one.` },
    { title: 'Ignoring upselling and revenue achievements', detail: `Include average check increases, add-on sales rates, or revenue per cover improvements. Revenue generation skills differentiate strong ${jobTitle} candidates.` },
    { title: 'Not mentioning health and safety compliance', detail: `ServSafe, food handler certifications, health inspection scores, and safety protocol adherence are baseline requirements. List them to avoid being filtered out.` },
  ],
  'Public Service': (jobTitle, skills) => [
    { title: 'Not specifying jurisdiction and scope', detail: `Public service varies enormously by jurisdiction size. "Served a municipality of 85,000 residents across 14 departments" contextualizes your experience better than a generic ${jobTitle} description.` },
    { title: 'Omitting certifications and professional development', detail: `Government ${jobTitle} positions often require specific certifications. List every relevant credential, training program, and continuing education course.` },
    { title: 'Using internal agency jargon without context', detail: `Hiring panels from different agencies may not know your acronyms. Spell out program names and explain initiatives in terms of public impact.` },
    { title: 'Not quantifying constituent or community impact', detail: `"Served the public" is vague. "Processed 200+ permit applications monthly with a 2-day average turnaround" or "Reduced response time by 30% through workflow redesign" shows measurable impact.` },
    { title: 'Ignoring technology modernization experience', detail: `Government agencies are digitizing rapidly. Experience with digital permitting, online portals, GIS, or data analytics platforms demonstrates forward-thinking capability.` },
  ],
  'Animal Care': (jobTitle, skills) => [
    { title: 'Not listing certifications and training credentials', detail: `Animal-related certifications (CPDT-KA, CVT, Fear Free, NAIA) immediately establish professional credibility. Place them prominently near your name.` },
    { title: 'Describing only basic animal handling', detail: `"Cared for animals" is every ${jobTitle} job. Specify animal types, daily census, specialized procedures, and behavioral assessment skills that differentiate your experience.` },
    { title: 'No metrics on animal outcomes', detail: `Adoption rates, rehabilitation success rates, training completion percentages, or client satisfaction scores prove your effectiveness. Quantify everything possible.` },
    { title: 'Omitting safety and health protocol knowledge', detail: `Zoonotic disease prevention, bite protocols, quarantine procedures, and emergency veterinary response knowledge are critical. Facilities need ${jobTitle} staff who minimize risk.` },
    { title: 'Ignoring business and client management skills', detail: `If your role involves client interaction, include client volume, retention rates, and education or consultation work. Animal care is increasingly a client-facing profession.` },
  ],
};

// Mapping from resume example categories to our fallback categories
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

function getMistakes(slug, jobTitle, category, skills) {
  if (SLUG_MISTAKES[slug]) return SLUG_MISTAKES[slug];
  const mappedCat = CATEGORY_MAP[category] || 'Business & Finance';
  const generator = CATEGORY_MISTAKES[mappedCat] || CATEGORY_MISTAKES['Business & Finance'];
  return generator(jobTitle, skills);
}

function buildSection(jobTitle, mistakes) {
  let section = `\n## Common Mistakes to Avoid\n\n`;
  for (const m of mistakes) {
    section += `### ${m.title}\n\n${m.detail}\n\n`;
  }
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

  // Skip if already has the section
  if (/^## Common Mistakes/m.test(raw)) {
    skipped++;
    continue;
  }

  const { data, content } = matter(raw);
  const slug = data.slug || file.replace('.mdx', '');
  const jobTitle = data.jobTitle || slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const category = data.category || '';
  const skills = data.keySkills || [];

  const mistakes = getMistakes(slug, jobTitle, category, skills);
  const section = buildSection(jobTitle, mistakes);

  // Insert before "## Hiring Manager Tip" or "## ATS Optimization" or at end
  let newContent;
  if (content.includes('## Hiring Manager Tip')) {
    newContent = content.replace('## Hiring Manager Tip', section + '## Hiring Manager Tip');
  } else if (/## ATS Optimization/m.test(content)) {
    newContent = content.replace(/## ATS Optimization/, section + '## ATS Optimization');
  } else {
    newContent = content + '\n' + section;
  }

  if (DRY_RUN) {
    console.log(`[DRY RUN] Would add Common Mistakes to: ${file}`);
  } else {
    const updated = matter.stringify(newContent, data);
    fs.writeFileSync(filePath, updated, 'utf8');
    console.log(`Added Common Mistakes to: ${file}`);
  }
  added++;
}

console.log(`\n✅ Common Mistakes: ${added} sections added, ${skipped} already had it.`);
if (DRY_RUN) console.log('This was a dry run.');

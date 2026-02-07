#!/usr/bin/env node
/**
 * Add "Achievement-Focused Bullet Points" section to resume example MDX files that are missing it.
 * Each file gets 6 profession-specific achievement examples.
 * Inserts after "Essential Skills" / "Key Skills" section or before "Resume Format" section.
 *
 * Usage: node scripts/add-achievement-bullets.mjs [--dry-run]
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

// ─── Slug-specific bullets ──────────────────────────────────────────────
const SLUG_BULLETS = {
  'firefighter': [
    'Responded to 1,200+ emergency calls annually including structure fires, medical emergencies, and technical rescues with a 4-minute average response time',
    'Performed primary search and rescue operations in zero-visibility IDLH environments, contributing to 15 successful victim rescues over 3 years',
    'Operated as nozzle operator and backup on first-due engine company, completing fire suppression for 85+ structure fires with zero civilian casualties',
    'Trained 12 probationary firefighters on SCBA operations, hose advancement, and ladder placement, achieving 100% academy pass rate for mentees',
    'Maintained apparatus and equipment readiness for Engine 7, completing 200+ daily checks with zero out-of-service incidents during shift',
    'Led community fire prevention education program reaching 3,500+ residents and 15 schools, contributing to a 22% reduction in residential fire calls',
  ],
  'police-officer': [
    'Patrolled a 12-square-mile jurisdiction responding to 8-15 calls for service per shift with an average response time of 3.5 minutes for priority calls',
    'Conducted 250+ traffic stops and 45 felony arrests annually while maintaining zero use-of-force complaints over a 4-year period',
    'Investigated 60+ criminal cases per year including burglary, assault, and fraud, achieving a 72% case clearance rate exceeding departmental average by 15%',
    'Served as Field Training Officer for 8 recruit officers, developing 12-week training plans that resulted in 100% successful completion of probationary period',
    'Organized and led 6 community policing events annually including National Night Out and youth mentorship programs, increasing community trust survey scores by 18%',
    'Completed 200+ hours of specialized training in crisis intervention, de-escalation, and active shooter response, qualifying as department CIT team member',
  ],
  'college-professor': [
    'Taught 4 courses per semester (120+ students) with average teaching evaluations of 4.7/5.0 across undergraduate and graduate levels',
    'Published 12 peer-reviewed articles in top-tier journals including 3 with impact factors above 5.0, accumulating 450+ citations',
    'Secured $380K in external grant funding as PI from NSF and NEH, supporting 6 graduate research assistants over 4 years',
    'Chaired 5 doctoral dissertations and served on 12 thesis committees, with 4 former advisees now in tenure-track positions',
    'Developed and launched 2 new courses in the department curriculum, with one becoming a required course in the revised major sequence',
    'Delivered 18 invited conference presentations and 3 keynote addresses at international disciplinary conferences',
  ],
  'elementary-teacher': [
    'Raised 3rd grade reading proficiency from 62% to 81% on state assessment through guided reading groups and differentiated instruction over 2 academic years',
    'Managed a classroom of 26 students using PBIS framework, reducing office referrals by 45% compared to prior year while maintaining 95% daily attendance',
    'Implemented project-based learning units in math and science, increasing student engagement scores by 30% on quarterly climate surveys',
    'Trained 8 new teachers on district literacy curriculum as grade-level team lead, providing weekly coaching and model lesson observations',
    'Organized annual STEM fair with 120+ student participants and 15 community business partners, running for 4 consecutive years',
    'Maintained 98% parent conference attendance rate through proactive communication via ClassDojo, weekly newsletters, and bilingual outreach',
  ],
  'paralegal': [
    'Managed case files for 45+ active litigation matters simultaneously, coordinating discovery deadlines and court filings with zero missed deadlines over 3 years',
    'Drafted 200+ legal documents including motions, discovery requests, and settlement agreements for commercial litigation cases valued at $500K-$8M',
    'Organized and reviewed 150,000+ documents in e-discovery using Relativity, reducing attorney review time by 35% through effective search term development',
    'Prepared trial exhibits and witness binders for 6 jury trials, supporting favorable verdicts or settlements in 5 of 6 cases',
    'Coordinated 40+ depositions annually, managing scheduling, reporter booking, exhibit preparation, and transcript review for multi-party litigation',
    'Trained 3 junior paralegals on firm procedures, e-filing systems, and document management protocols, reducing onboarding time from 8 weeks to 5',
  ],
  'photographer': [
    'Photographed 75+ weddings annually delivering 500-800 edited images per event with a 48-hour preview turnaround and 99% client satisfaction rate',
    'Built a freelance photography business from zero to $120K annual revenue within 3 years, maintaining a 60% repeat client rate through consistent quality',
    'Shot and edited product photography for 12 e-commerce brands totaling 8,000+ SKU images, contributing to an average 25% increase in conversion rates',
    'Published editorial work in 8 regional and national publications including feature stories with 15+ page spreads',
    'Managed a team of 3 second shooters and 2 editing assistants, maintaining brand consistency across 100+ events per year',
    'Created and taught 4 photography workshops for 200+ students on composition, lighting, and post-processing techniques',
  ],
  'dog-trainer': [
    'Conducted 600+ private behavior consultations annually specializing in reactivity, separation anxiety, and aggression with a 92% client-reported improvement rate',
    'Designed and led 8-week group obedience classes for 15 dogs per session, graduating 400+ dogs annually with a 95% course completion rate',
    'Rehabilitated 50+ shelter dogs with severe behavioral issues, directly contributing to a 40% increase in facility adoption rate',
    'Built a client base of 200+ recurring clients through referral programs and community partnerships, growing annual revenue by 35% year-over-year',
    'Trained 4 service dogs from puppy stage through public access certification, achieving AKC Canine Good Citizen certification for all 4 within 18 months',
    'Mentored 6 apprentice trainers through 500+ hours of supervised instruction, with 4 earning CPDT-KA certification within their first year',
  ],
  'animator': [
    'Animated 120+ shots for a Netflix original series averaging 8 seconds per shot, completing work 10% ahead of production schedule',
    'Created character animation sequences for 3 feature-length films with combined box office revenue exceeding $200M worldwide',
    'Developed rigging solutions for 15 unique character models in Maya, reducing animation setup time by 25% across the production pipeline',
    'Produced 40+ motion graphics videos for corporate clients totaling 60 minutes of final content with an average 2-week turnaround per project',
    'Led a team of 4 junior animators on a 26-episode TV series, conducting weekly reviews and maintaining consistent character performance across episodes',
    'Won Best Animated Short at 2 regional film festivals for an independently produced 4-minute film created over 6 months',
  ],
  'music-producer': [
    'Produced and mixed 45+ tracks across 3 albums, with lead single reaching #12 on Billboard Hot 100 and accumulating 50M+ Spotify streams',
    'Operated and maintained a commercial recording studio with $200K+ in equipment, booking 300+ studio hours annually at 85% capacity',
    'Composed and produced original scores for 8 independent films and 15 commercial advertisements, generating $180K in sync licensing revenue',
    'Engineered and mixed live recordings for 20+ concert events ranging from 500-seat venues to 5,000-seat arenas with multi-track capture',
    'Mentored 6 emerging artists through the full production process from demo to master, with 3 securing distribution deals within 12 months',
    'Built a catalog of 200+ original beats and production elements, licensing 80+ placements to independent artists and content creators',
  ],
};

// ─── Category-based fallback bullets ────────────────────────────────
const CATEGORY_BULLETS = {
  'Education': (jobTitle, skills) => [
    `Improved student ${skills[0] || 'achievement'} outcomes by 20% through data-driven instruction and differentiated learning strategies across a roster of 25+ students`,
    `Developed and implemented curriculum aligned to state standards for ${skills[1] || 'core subjects'}, adopted by 4 teachers across the grade-level team`,
    `Maintained 95%+ daily attendance and reduced behavioral referrals by 35% through consistent classroom management using PBIS framework`,
    `Led professional learning community meetings for 8 educators, focusing on assessment analysis and instructional strategy refinement`,
    `Organized 3+ school-wide events annually including literacy nights, STEM fairs, and parent workshops with 150+ family participants`,
    `Mentored 5 new ${jobTitle} staff members, providing weekly observations and feedback that accelerated their professional growth during first year`,
  ],
  'Legal': (jobTitle, skills) => [
    `Managed 40+ active case files simultaneously, maintaining zero missed court deadlines across civil and ${skills[0] || 'litigation'} matters`,
    `Drafted 150+ legal documents including motions, briefs, and discovery requests for cases valued at $100K-$5M`,
    `Organized and reviewed 100,000+ documents during e-discovery using Relativity, reducing attorney review time by 30%`,
    `Coordinated 30+ depositions annually, managing scheduling, exhibit preparation, and transcript review for multi-party proceedings`,
    `Researched case law and statutes using Westlaw and LexisNexis, preparing 50+ legal memoranda supporting favorable case outcomes`,
    `Trained 2 junior staff members on office procedures, e-filing systems, and ${skills[1] || 'document management'} protocols`,
  ],
  'Healthcare': (jobTitle, skills) => [
    `Provided direct patient care for 12-15 patients per shift in a ${skills[0] || 'medical-surgical'} unit, maintaining 98% patient satisfaction scores`,
    `Administered 50+ medications daily with zero medication errors over 18-month period through strict adherence to verification protocols`,
    `Documented patient assessments, vital signs, and care plans in Epic EHR, completing all charting within 30 minutes of shift end`,
    `Trained 4 new ${jobTitle} staff members on unit protocols and EHR documentation, reducing onboarding time by 2 weeks`,
    `Participated in quality improvement initiative that reduced patient falls by 40% through enhanced assessment protocols and bed alarm compliance`,
    `Coordinated discharge planning for 20+ patients weekly, collaborating with physicians, social workers, and family members to ensure continuity of care`,
  ],
  'Trades & Labor': (jobTitle, skills) => [
    `Completed 200+ ${skills[0] || 'service'} projects annually with zero safety incidents and 97% client satisfaction rating`,
    `Led a crew of 3-5 workers on residential and commercial jobs, consistently finishing projects on schedule and within budget`,
    `Maintained all equipment and tools in inspection-ready condition, reducing downtime by 25% through preventive maintenance schedule`,
    `Trained 6 new team members on safety protocols, equipment operation, and quality standards, achieving zero OSHA violations during tenure`,
    `Generated $15K+ in monthly revenue through efficient job completion and customer referral program with 40% repeat client rate`,
    `Passed all municipal inspections on first attempt across 150+ projects through meticulous attention to code requirements and documentation`,
  ],
  'Creative & Design': (jobTitle, skills) => [
    `Created 500+ pieces of original ${skills[0] || 'creative'} content annually for clients across technology, retail, and entertainment industries`,
    `Managed 15+ concurrent projects with an average turnaround of 5 business days, maintaining 98% on-time delivery rate`,
    `Built and maintained a client portfolio of 30+ recurring accounts, growing annual revenue by 25% through referrals and portfolio expansion`,
    `Collaborated with cross-functional teams of 5-10 stakeholders per project, conducting client presentations and incorporating feedback within 2 revision cycles`,
    `Won 3 industry awards for creative excellence, with work featured in 5+ publications and online showcases`,
    `Mentored 4 junior ${jobTitle} team members, conducting weekly portfolio reviews and providing technical skill development guidance`,
  ],
  'Hospitality & Service': (jobTitle, skills) => [
    `Served 150+ guests per shift in a high-volume environment, maintaining a 4.8/5.0 guest satisfaction average across 500+ reviewed interactions`,
    `Generated $5K+ in daily revenue through upselling and personalized service recommendations, exceeding monthly targets by 15% consistently`,
    `Trained 10+ new team members on service standards, POS systems, and safety procedures, reducing average training period from 3 weeks to 2`,
    `Resolved 20+ guest complaints weekly with a 95% first-contact resolution rate, converting dissatisfied guests into repeat customers`,
    `Managed inventory and supply ordering for $8K+ in weekly stock, reducing waste by 18% through improved tracking and rotation procedures`,
    `Received Employee of the Month recognition 4 times for exceeding service metrics and maintaining perfect attendance over 12 months`,
  ],
  'Public Service': (jobTitle, skills) => [
    `Processed 200+ ${skills[0] || 'public'} service requests monthly with a 2-day average turnaround time, exceeding departmental SLA by 20%`,
    `Managed a caseload of 75+ constituents, providing individualized assistance and referrals that resolved 90% of cases within 30 days`,
    `Implemented workflow improvements that reduced processing backlog by 40% and saved the department 15 hours per week in manual tasks`,
    `Conducted 50+ community outreach events and presentations annually, increasing program awareness and participation by 30%`,
    `Prepared 25+ reports and policy recommendations for supervisors, with 3 proposals adopted as departmental procedure changes`,
    `Trained 5 new staff members on regulatory procedures, database systems, and ${skills[1] || 'constituent service'} protocols`,
  ],
  'Business & Finance': (jobTitle, skills) => [
    `Managed a portfolio of 50+ client accounts totaling $2.5M in annual revenue, achieving 95% client retention rate over 3 years`,
    `Streamlined ${skills[0] || 'operational'} processes that reduced turnaround time by 30% and saved the department 20+ hours per week`,
    `Prepared and presented quarterly financial reports and performance analyses for senior leadership, supporting $500K+ in strategic decisions`,
    `Led cross-functional team of 6 on process improvement initiative that reduced errors by 45% and increased throughput by 25%`,
    `Negotiated vendor contracts worth $300K+ annually, securing 15% cost reduction while maintaining service quality benchmarks`,
    `Trained 8 new team members on CRM systems, reporting procedures, and client management protocols, reducing ramp-up time by 3 weeks`,
  ],
  'Animal Care': (jobTitle, skills) => [
    `Provided daily care for 50+ animals across multiple species, maintaining health records and administering medications with zero errors over 18 months`,
    `Increased adoption rates by 35% through improved animal socialization programs and enrichment activities for 200+ shelter residents`,
    `Conducted 15+ behavioral assessments weekly, developing individualized training and rehabilitation plans for animals with behavioral challenges`,
    `Managed facility cleaning and sanitation protocols for a 100-animal capacity center, maintaining zero disease outbreak incidents`,
    `Trained 8 volunteers and 3 new staff members on animal handling, safety procedures, and enrichment techniques`,
    `Organized 6 community adoption events annually with 100+ attendees each, resulting in 150+ successful placements per year`,
  ],
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

function getBullets(slug, jobTitle, category, skills) {
  if (SLUG_BULLETS[slug]) return SLUG_BULLETS[slug];
  const mappedCat = CATEGORY_MAP[category] || 'Business & Finance';
  const generator = CATEGORY_BULLETS[mappedCat] || CATEGORY_BULLETS['Business & Finance'];
  return generator(jobTitle, skills);
}

function buildSection(jobTitle, bullets) {
  let section = `\n## Achievement-Focused Bullet Points\n\nUse the STAR method (Situation, Task, Action, Result) with quantifiable metrics:\n\n`;
  for (const b of bullets) {
    section += `- "${b}"\n`;
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

  // Skip if already has any achievement/bullet points section
  if (/^## (Achievement|Work Experience Bullet|Bullet Point)/m.test(raw)) {
    skipped++;
    continue;
  }

  const { data, content } = matter(raw);
  const slug = data.slug || file.replace('.mdx', '');
  const jobTitle = data.jobTitle || slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const category = data.category || '';
  const skills = data.keySkills || [];

  const bullets = getBullets(slug, jobTitle, category, skills);
  const section = buildSection(jobTitle, bullets);

  // Insert after skills section or before format tips
  let newContent;
  const skillsMatch = content.match(/^(## (?:Essential Skills|Key Skills|Essential Technical|Technical Skills).*)\n/m);
  const formatMatch = content.match(/^(## .+Resume Format)/m);

  if (skillsMatch) {
    // Find the end of the skills section (next ## heading)
    const skillsIdx = content.indexOf(skillsMatch[0]);
    const afterSkills = content.indexOf('\n## ', skillsIdx + skillsMatch[0].length);
    if (afterSkills !== -1) {
      newContent = content.slice(0, afterSkills) + '\n' + section + content.slice(afterSkills);
    } else {
      newContent = content + '\n' + section;
    }
  } else if (formatMatch) {
    newContent = content.replace(formatMatch[0], section + formatMatch[0]);
  } else {
    // Insert before Hiring Manager Tip or Common Mistakes
    if (content.includes('## Hiring Manager Tip')) {
      newContent = content.replace('## Hiring Manager Tip', section + '## Hiring Manager Tip');
    } else if (content.includes('## Common Mistakes')) {
      newContent = content.replace('## Common Mistakes', section + '## Common Mistakes');
    } else {
      newContent = content + '\n' + section;
    }
  }

  if (DRY_RUN) {
    console.log(`[DRY RUN] Would add Achievement Bullets to: ${file}`);
  } else {
    const updated = matter.stringify(newContent, data);
    fs.writeFileSync(filePath, updated, 'utf8');
    console.log(`Added Achievement Bullets to: ${file}`);
  }
  added++;
}

console.log(`\n✅ Achievement Bullets: ${added} sections added, ${skipped} already had it.`);
if (DRY_RUN) console.log('This was a dry run.');

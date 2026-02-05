#!/usr/bin/env node
/**
 * Generates cover letter example MDX files for resume examples that don't have one.
 * Uses resume example data (category, jobTitle, keySkills) to create profession-specific content.
 *
 * Usage:
 *   node scripts/generate-cover-letter-examples.mjs [--tier 1|2|3|all] [--dry-run] [--limit N]
 *
 * Options:
 *   --tier 1      Generate Tier 1 high-priority (HR, Sales, Government, Tech gaps)
 *   --tier 2      Generate Tier 2 medium-priority (Food Service, Trades, Hospitality)
 *   --tier 3      Generate Tier 3 long-tail (remaining)
 *   --tier all    Generate all missing (default)
 *   --dry-run     Preview without writing files
 *   --limit N     Only generate first N files
 */

import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const require = createRequire(path.join(rootDir, 'frontend', 'package.json'));
const matter = require('gray-matter');

const RESUME_DIR = path.join(rootDir, 'frontend/content/resume-examples');
const COVER_LETTER_DIR = path.join(rootDir, 'frontend/content/cover-letter-examples');

// ─── Parse CLI args ────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const tierArg = args.includes('--tier') ? args[args.indexOf('--tier') + 1] : 'all';
const dryRun = args.includes('--dry-run');
const limitArg = args.includes('--limit') ? parseInt(args[args.indexOf('--limit') + 1], 10) : null;

// ─── Author rotation ───────────────────────────────────────────────────────
const AUTHORS = [
  { name: 'Alex Brown', categories: ['HR', 'Administrative', 'Education', 'Entry-Level', 'Social Services', 'Legal', 'Law Enforcement', 'Government'] },
  { name: 'Ken Coleman', categories: ['Business', 'Management', 'Consulting', 'Sales', 'Marketing', 'Finance', 'Insurance', 'Real Estate', 'Events'] },
  { name: 'Jason M. Hill', categories: ['Technology', 'Engineering', 'Science', 'Research'] },
  { name: 'Sarah Sutton', categories: ['Customer Service', 'Retail', 'Logistics', 'Supply Chain', 'Transportation', 'Automotive', 'Aviation', 'Maritime'] },
  { name: 'Anna Papalia', categories: ['Healthcare', 'Creative', 'Hospitality', 'Fitness', 'Beauty', 'Entertainment', 'Animal Care', 'Childcare', 'Trades', 'Manufacturing', 'Construction', 'Architecture', 'Security', 'Media', 'Food Service', 'Cleaning'] },
];

function getAuthorForCategory(category) {
  for (const author of AUTHORS) {
    if (author.categories.some(c => category.toLowerCase().includes(c.toLowerCase()) || c.toLowerCase().includes(category.toLowerCase()))) {
      return author.name;
    }
  }
  return 'Alex Brown'; // fallback
}

// ─── Tier definitions ──────────────────────────────────────────────────────
const TIER_1 = [
  'hr-manager', 'hr-coordinator', 'hr-director', 'hr-assistant', 'hr-business-partner', 'hr-executive', 'recruiter', 'technical-recruiter', 'talent-acquisition-specialist', 'it-recruiter', 'recruiting-coordinator',
  'sales-engineer', 'sales-director', 'sales-executive', 'sales-associate', 'sales-coordinator', 'sales-assistant', 'sales-consultant', 'inside-sales', 'tech-sales',
  'firefighter', 'police-officer', 'correctional-officer', 'tsa-agent', 'postal-worker', 'probation-officer', 'security-guard', 'security-officer',
  'medical-scribe', 'medical-office-assistant', 'pharmacy-tech', 'pharmacy-assistant',
  'data-architect', 'solutions-engineer', 'release-engineer', 'qa-analyst', 'qa-manager', 'qa-tester', 'help-desk-technician', 'it-specialist', 'it-technician', 'it-support-tech', 'desktop-support',
];

const TIER_2 = [
  'sous-chef', 'line-cook', 'prep-cook', 'pastry-chef', 'baker', 'dishwasher', 'food-runner', 'busser', 'fast-food-worker', 'kitchen-manager', 'head-cook', 'sushi-chef', 'pizza-maker', 'caterer', 'catering-manager', 'food-service', 'food-service-worker', 'food-service-director', 'dietary-aide', 'cafeteria-worker', 'food-expeditor', 'food-truck-operator', 'food-stylist', 'food-scientist', 'food-safety-manager', 'sommelier', 'banquet-chef', 'executive-chef',
  'roofer', 'painter', 'mason', 'landscaper', 'concrete-finisher', 'glazier', 'drywall-installer', 'floor-installer', 'locksmith', 'pest-control-technician', 'insulation-worker', 'fence-installer', 'iron-worker', 'ironworker', 'sheet-metal-worker', 'cabinet-maker', 'millwright', 'solar-installer', 'wind-turbine-technician', 'elevator-technician', 'building-maintenance-technician', 'appliance-repair-technician', 'industrial-maintenance-technician', 'cnc-machinist',
  'housekeeper', 'housekeeping-supervisor', 'front-desk-agent', 'bellhop', 'night-auditor', 'valet-attendant', 'cruise-ship-worker', 'reservation-agent', 'spa-manager',
  'janitor', 'dispatcher', 'warehouse-associate', 'house-cleaner', 'commercial-cleaner', 'residential-cleaner', 'hospital-housekeeper', 'carpet-cleaner', 'window-cleaner', 'pool-cleaner', 'pool-technician', 'pressure-washer',
];

// ─── Category-specific content generators ──────────────────────────────────

const CATEGORY_OPENERS = {
  HR: (jobTitle) => `Unlike other business roles, HR positions require proving you can navigate sensitive workplace dynamics while driving organizational outcomes. The most effective HR cover letters demonstrate both strategic thinking and people skills through specific examples.`,
  Sales: (jobTitle) => `Your cover letter is your first sales pitch — and hiring managers judge it accordingly. The most effective approach shows you've researched their sales challenges and can articulate how you'll contribute to revenue targets.`,
  Technology: (jobTitle) => `A standout cover letter goes beyond listing technologies. It demonstrates problem-solving ability, quantifies impact, and shows genuine interest in the company's technical challenges.`,
  Healthcare: (jobTitle) => `Healthcare hiring managers look for candidates who demonstrate both technical skills and genuine dedication to patient outcomes. Your cover letter must balance clinical competence with compassionate care.`,
  Government: (jobTitle) => `Government and public sector applications require a different approach than private sector. You need to directly address the job announcement requirements while demonstrating commitment to public service and community safety.`,
  'Food Service': (jobTitle) => `Food service hiring managers look for reliability, teamwork, and genuine passion for the culinary arts. Your cover letter should demonstrate both technical kitchen skills and the ability to thrive in fast-paced, high-pressure environments.`,
  Hospitality: (jobTitle) => `The hospitality industry values warmth, attention to detail, and grace under pressure. Your cover letter should showcase your service orientation and ability to create memorable guest experiences.`,
  Trades: (jobTitle) => `Employers value licensed professionals who can work independently and deliver quality craftsmanship. Your cover letter should highlight hands-on expertise, safety consciousness, and problem-solving ability.`,
  Creative: (jobTitle) => `The best creative professionals balance artistic excellence with client needs and project constraints. Your cover letter must showcase your creative vision while demonstrating business acumen.`,
  Education: (jobTitle) => `Administrators look for educators who inspire learning and adapt to diverse student needs. Your cover letter should demonstrate pedagogical expertise, classroom management skills, and genuine commitment to student success.`,
  Administrative: (jobTitle) => `Employers seek candidates who anticipate needs, solve problems proactively, and maintain confidentiality. An effective cover letter showcases organizational excellence and the ability to keep operations running smoothly.`,
  Finance: (jobTitle) => `Hiring managers look for candidates who can translate complex data into actionable insights. Your cover letter must demonstrate analytical rigor, attention to detail, and sound judgment with financial matters.`,
  Retail: (jobTitle) => `Employers value reliability, product knowledge, and genuine enthusiasm for customer service. Your cover letter should highlight sales achievements and the ability to thrive in fast-paced retail environments.`,
  'Customer Service': (jobTitle) => `Customer service roles require exceptional communication skills and genuine empathy for customer needs. Your cover letter should demonstrate your ability to resolve issues efficiently while maintaining positive relationships.`,
  Logistics: (jobTitle) => `Supply chain and logistics employers value efficiency, accuracy, and the ability to handle time-sensitive operations. Your cover letter should highlight your experience with inventory management, scheduling, and process optimization.`,
  default: (jobTitle) => `Focus on specific achievements that prove you can deliver results from day one. The most effective cover letters combine relevant experience with genuine enthusiasm for the role.`,
};

const CATEGORY_MISTAKES = {
  HR: [
    'Using HR jargon — without demonstrating practical application or measurable outcomes',
    'Omitting compliance knowledge — failing to mention legal/regulatory expertise relevant to HR',
    'Ignoring employee relations — not addressing conflict resolution or sensitive situations handled',
    'No systems proficiency — overlooking HRIS, ATS, and analytics experience',
    'Missing confidentiality signals — forgetting to demonstrate discretion with sensitive matters',
  ],
  Sales: [
    'Context-free quota numbers — listing achievements without explaining strategy or market conditions',
    'No company research — failing to mention their products, market position, or challenges',
    'Overly aggressive tone — using pushy language instead of consultative approach',
    'Incomplete sales cycle — not demonstrating understanding from prospecting to close',
    'No CRM mention — forgetting to highlight pipeline management and sales tools',
  ],
  Technology: [
    'Technology laundry list — listing every tool instead of focusing on relevant stack',
    'No metrics — describing responsibilities without quantified impact',
    'Generic opening — using boilerplate that could apply to any tech company',
    'Missing scale context — failing to mention system size, users, or complexity',
    'No company-specific interest — not showing genuine knowledge of their tech challenges',
  ],
  Healthcare: [
    'No license status — failing to confirm active certification upfront',
    'Task-focused — describing duties instead of patient outcomes',
    'Jargon overload — using clinical terms without practical context',
    'No EMR experience — overlooking importance of system proficiency',
    'Missing compliance awareness — not addressing HIPAA and patient privacy',
  ],
  Government: [
    'Ignoring KSAs — not directly addressing knowledge, skills, abilities from posting',
    'No procedural experience — failing to mention government-specific processes',
    'Private sector metrics — using business language that doesn\'t translate to public service',
    'Clearance omission — overlooking security clearance status or eligibility',
    'Missing mission alignment — not demonstrating commitment to public service',
  ],
  'Food Service': [
    'No certifications — failing to mention ServSafe or Food Handler\'s Card',
    'Volume unexplained — not demonstrating high-volume kitchen experience',
    'Solo focus — overlooking teamwork essential in kitchen environments',
    'Schedule rigidity — not addressing availability for nights, weekends, holidays',
    'Generic experience — forgetting to mention specific cuisines or techniques',
  ],
  Hospitality: [
    'Task-focused — describing duties instead of guest experience outcomes',
    'No service recovery — failing to demonstrate handling difficult situations',
    'Missing systems — not mentioning PMS, POS, or reservation systems',
    'Schedule limitations — overlooking importance of flexibility',
    'No service passion — failing to convey enthusiasm for hospitality',
  ],
  Trades: [
    'No credentials listed — failing to mention licenses, certs, or union status',
    'Safety unaddressed — not mentioning OSHA compliance or safety record',
    'Equipment gaps — overlooking tools, vehicle, and equipment requirements',
    'No technical ability — failing to mention blueprint reading or technical skills',
    'Availability unclear — not addressing travel flexibility or start date',
  ],
  'Customer Service': [
    'No metrics — failing to mention satisfaction scores or resolution rates',
    'Generic soft skills — saying "people person" instead of specific examples',
    'No systems — overlooking CRM, ticketing, and communication tools',
    'Missing de-escalation — not addressing experience with difficult situations',
    'No channel experience — failing to specify phone, chat, email expertise',
  ],
  Logistics: [
    'No volume context — failing to mention orders, shipments, or units handled',
    'Missing certifications — overlooking forklift, hazmat, or DOT credentials',
    'No systems experience — failing to mention WMS, TMS, or inventory software',
    'Safety oversight — not addressing safety protocols or compliance',
    'Efficiency unstated — no mention of process improvements or cost savings',
  ],
  default: [
    'Generic template — using boilerplate that could apply to any job',
    'No research — failing to address the company\'s specific needs',
    'Resume repetition — copying your resume instead of adding context',
    'No quantification — forgetting to include specific metrics and achievements',
    'Unproofread submission — sending without checking for errors',
  ],
};

function getCategoryOpener(category, jobTitle) {
  const normalizedCategory = normalizeCategory(category);
  const opener = CATEGORY_OPENERS[normalizedCategory] || CATEGORY_OPENERS.default;
  return opener(jobTitle);
}

function getCategoryMistakes(category) {
  const normalizedCategory = normalizeCategory(category);
  return CATEGORY_MISTAKES[normalizedCategory] || CATEGORY_MISTAKES.default;
}

function normalizeCategory(category) {
  const categoryLower = category.toLowerCase();
  if (categoryLower.includes('hr') || categoryLower.includes('human resource')) return 'HR';
  if (categoryLower.includes('sales')) return 'Sales';
  if (categoryLower.includes('tech') || categoryLower.includes('engineering') || categoryLower.includes('it') || categoryLower.includes('software')) return 'Technology';
  if (categoryLower.includes('health') || categoryLower.includes('medical') || categoryLower.includes('nursing')) return 'Healthcare';
  if (categoryLower.includes('government') || categoryLower.includes('public') || categoryLower.includes('law enforcement') || categoryLower.includes('security') || categoryLower.includes('police') || categoryLower.includes('correction')) return 'Government';
  if (categoryLower.includes('food') || categoryLower.includes('culinary') || categoryLower.includes('restaurant') || categoryLower.includes('kitchen')) return 'Food Service';
  if (categoryLower.includes('hospitality') || categoryLower.includes('hotel') || categoryLower.includes('resort')) return 'Hospitality';
  if (categoryLower.includes('trade') || categoryLower.includes('construction') || categoryLower.includes('manufacturing')) return 'Trades';
  if (categoryLower.includes('creative') || categoryLower.includes('design') || categoryLower.includes('art') || categoryLower.includes('media')) return 'Creative';
  if (categoryLower.includes('education') || categoryLower.includes('teaching') || categoryLower.includes('academic')) return 'Education';
  if (categoryLower.includes('admin') || categoryLower.includes('office') || categoryLower.includes('clerical')) return 'Administrative';
  if (categoryLower.includes('finance') || categoryLower.includes('accounting') || categoryLower.includes('banking')) return 'Finance';
  if (categoryLower.includes('retail') || categoryLower.includes('store') || categoryLower.includes('merchandise')) return 'Retail';
  if (categoryLower.includes('cleaning') || categoryLower.includes('janitorial') || categoryLower.includes('housekeeping')) return 'Hospitality';
  if (categoryLower.includes('customer service') || categoryLower.includes('support')) return 'Customer Service';
  if (categoryLower.includes('logistics') || categoryLower.includes('warehouse') || categoryLower.includes('supply chain') || categoryLower.includes('transportation')) return 'Logistics';
  return 'default';
}

// ─── Generate cover letter example ─────────────────────────────────────────

function generateExampleLetter(jobTitle, skills, category) {
  const normalizedCategory = normalizeCategory(category);
  const topSkills = skills.slice(0, 4).join(', ');

  const templates = {
    HR: `Dear Hiring Manager,

I am writing to express my strong interest in the ${jobTitle} position at [Company Name]. With a track record of developing HR initiatives that improve employee engagement and reduce turnover, I am excited about the opportunity to contribute to your team.

In my current role at [Current Company], I have successfully implemented an employee onboarding program that reduced new hire turnover by 35% in the first 90 days. I also led the transition to a new HRIS system, training 50+ managers and achieving 98% adoption within two months. My experience with ${topSkills} has prepared me to make an immediate impact in this role.

What draws me to [Company Name] is your commitment to [specific company value or initiative]. I am particularly impressed by [specific program, culture element, or recent news]. I believe my experience in strategic HR initiatives aligns well with your goals of building a high-performing, engaged workforce.

I would welcome the opportunity to discuss how my HR expertise can support your team's objectives. Thank you for considering my application.

Best regards,
[Your Name]`,

    Sales: `Dear Hiring Manager,

I am excited to apply for the ${jobTitle} position at [Company Name]. As a sales professional who has consistently exceeded quota by 25-40%, I am drawn to your company's innovative approach to [specific product/market].

At [Current Company], I built a client portfolio generating $2.3M in annual revenue while maintaining a 92% client retention rate. I achieved this by focusing on consultative selling and understanding each client's unique business challenges. My expertise in ${topSkills} has been essential to building lasting relationships and closing complex deals.

Your company's recent expansion into [specific market or product launch] aligns perfectly with my experience in [relevant sales experience]. I am confident I can contribute to your sales team's growth objectives while representing your brand with integrity and enthusiasm.

I would love to discuss how my sales track record can help [Company Name] achieve its revenue goals. Thank you for your consideration.

Sincerely,
[Your Name]`,

    Technology: `Dear Hiring Manager,

I am writing to apply for the ${jobTitle} position at [Company Name]. Your team's work on [specific product/technology] caught my attention — particularly [specific feature or engineering challenge]. As a professional with experience building scalable solutions, I am excited about the opportunity to contribute.

At [Current Company], I led development of a system serving 500K+ daily users, reducing response times by 60% through architectural improvements. I also established code review practices that reduced production bugs by 40%. My proficiency in ${topSkills} enables me to deliver high-quality solutions while mentoring team members.

What excites me most about [Company Name] is [specific technical challenge or company mission]. I believe my background in building reliable, scalable systems would enable me to make meaningful contributions from day one.

I'd welcome the opportunity to discuss how my technical experience aligns with your team's goals. Thank you for considering my application.

Best regards,
[Your Name]`,

    Healthcare: `Dear Hiring Manager,

I am writing to express my interest in the ${jobTitle} position at [Healthcare Facility Name]. With [X years] of experience providing compassionate, patient-centered care, I am eager to bring my clinical expertise to your team.

In my current role at [Current Facility], I have maintained a 98% patient satisfaction rating while managing a caseload of [X patients/day]. I implemented a patient education initiative that improved medication adherence by 25%. My experience with ${topSkills} has prepared me to deliver exceptional care in your environment.

I am particularly drawn to [Healthcare Facility Name] because of your commitment to [specific program, patient population, or organizational value]. Your reputation for [specific quality or achievement] aligns with my professional values.

I would welcome the opportunity to discuss how my clinical background can contribute to your patient care mission. Thank you for considering my application.

Respectfully,
[Your Name]`,

    Government: `Dear Hiring Manager,

I am writing to apply for the ${jobTitle} position (Announcement Number: [Number]). I meet all qualifications outlined in the job announcement and am committed to serving the public through this role.

In my current position at [Current Agency/Employer], I have demonstrated the knowledge, skills, and abilities required for this role. I have [specific achievement relevant to KSAs], resulting in [measurable outcome]. My experience with ${topSkills} directly aligns with the position requirements.

I am committed to public service and understand the importance of [specific mission or responsibility of the agency]. My track record of [relevant experience] demonstrates my ability to contribute effectively to your team's mission.

I have attached all required documents and am available to discuss my qualifications at your convenience. Thank you for considering my application.

Respectfully submitted,
[Your Name]`,

    'Food Service': `Dear Hiring Manager,

I am writing to apply for the ${jobTitle} position at [Restaurant/Establishment Name]. With [X years] of experience in high-volume kitchen environments, I am ready to bring my culinary skills and dedication to your team.

At [Current Employer], I have consistently performed under pressure during peak service hours, maintaining quality while helping the kitchen produce [X covers/night]. I hold current ServSafe certification and have experience with ${topSkills}. My commitment to food safety, cleanliness, and teamwork has made me a reliable member of every kitchen team I've joined.

I am excited about [Restaurant Name] because of your reputation for [specific cuisine, quality, or approach]. I would bring the same dedication and positive attitude to your kitchen.

I am available for any shift and ready to start immediately. Thank you for considering my application.

Best regards,
[Your Name]`,

    Hospitality: `Dear Hiring Manager,

I am excited to apply for the ${jobTitle} position at [Property Name]. Creating memorable guest experiences is my passion, and I am eager to bring my hospitality skills to your team.

At [Current Property], I maintained a guest satisfaction score of 4.8/5 while handling [X guests/interactions per day]. I resolved a guest complaint regarding [situation] that resulted in a positive online review specifically mentioning my service. My experience with ${topSkills} has prepared me to exceed your service standards.

I am drawn to [Property Name] because of your reputation for [specific service element or brand value]. I would bring genuine warmth, attention to detail, and problem-solving skills to every guest interaction.

I am flexible with scheduling and excited to contribute to your team. Thank you for considering my application.

Warmly,
[Your Name]`,

    Trades: `Dear Hiring Manager,

I am writing to apply for the ${jobTitle} position with [Company Name]. As a licensed professional with [X years] of hands-on experience, I am ready to bring my expertise to your team.

In my current role, I have completed [X projects] while maintaining an impeccable safety record with zero incidents in the past [X years]. I am proficient in ${topSkills} and take pride in delivering quality work on time and within budget. I hold current [relevant licenses/certifications] and have my own reliable transportation and tools.

I am impressed by [Company Name]'s reputation for [quality/safety/specific projects]. I am available to start immediately and willing to travel as needed for job sites.

I would welcome the opportunity to discuss how my skills can contribute to your team. Thank you for considering my application.

Respectfully,
[Your Name]`,

    'Customer Service': `Dear Hiring Manager,

I am writing to apply for the ${jobTitle} position at [Company Name]. With a proven track record of delivering exceptional customer experiences, I am excited about the opportunity to contribute to your support team.

At [Current Company], I maintained a 98% customer satisfaction rating while handling 50+ interactions daily across phone, chat, and email channels. I reduced average handle time by 15% without sacrificing quality, and my first-call resolution rate of 92% consistently ranked among the top performers. My proficiency with ${topSkills} enables me to resolve issues efficiently while building positive customer relationships.

What draws me to [Company Name] is your reputation for [specific customer focus or company value]. I believe that great customer service creates loyal customers, and I would bring that same dedication to every interaction with your customers.

I would welcome the opportunity to discuss how my customer service skills can support your team's goals. Thank you for considering my application.

Best regards,
[Your Name]`,

    Logistics: `Dear Hiring Manager,

I am writing to apply for the ${jobTitle} position at [Company Name]. With [X years] of experience in logistics operations, I am ready to bring my efficiency-focused approach to your team.

At [Current Employer], I managed receiving and shipping operations for 500+ daily orders while maintaining 99.8% accuracy. I identified and implemented a zone picking optimization that reduced fulfillment time by 20%. I hold current forklift certification and have experience with ${topSkills}. My commitment to safety and accuracy has contributed to zero recordable incidents over the past two years.

I am drawn to [Company Name]'s commitment to [operational excellence, customer satisfaction, or specific company trait]. I thrive in fast-paced environments where precision and efficiency matter.

I am flexible with scheduling, physically capable of meeting job demands, and ready to start immediately. Thank you for considering my application.

Respectfully,
[Your Name]`,

    default: `Dear Hiring Manager,

I am writing to express my strong interest in the ${jobTitle} position at [Company Name]. With relevant experience and a proven track record of delivering results, I am excited about the opportunity to contribute to your team.

At [Current Employer], I have [specific achievement with measurable outcome]. My experience with ${topSkills} has prepared me to make an immediate impact in this position.

I am particularly drawn to [Company Name] because of [specific company attribute, value, or recent news]. I believe my background aligns well with your team's goals and would bring [specific value proposition] to this role.

I would welcome the opportunity to discuss how my experience can benefit your organization. Thank you for considering my application.

Best regards,
[Your Name]`,
  };

  return templates[normalizedCategory] || templates.default;
}

function generateKeyElements(category, jobTitle) {
  const normalizedCategory = normalizeCategory(category);

  const elements = {
    HR: [
      { title: 'HR-Specific Achievements', quote: 'reduced new hire turnover by 35%', desc: 'leads with measurable HR outcomes that demonstrate business impact.' },
      { title: 'Strategic Thinking', quote: 'goals of building a high-performing, engaged workforce', desc: 'demonstrates understanding of HR\'s role in business strategy.' },
      { title: 'Systems Proficiency', quote: '98% adoption within two months', desc: 'shows ability to drive technology adoption and change management.' },
      { title: 'Culture Alignment', desc: 'References the company\'s values and employer brand to show fit.' },
      { title: 'Concise Communication', desc: 'Models the clear, professional communication HR professionals need.' },
    ],
    Sales: [
      { title: 'Revenue Impact', quote: '$2.3M in annual revenue', desc: 'leads with the numbers that matter most in sales.' },
      { title: 'Retention Focus', quote: '92% client retention rate', desc: 'demonstrates relationship-building beyond just closing deals.' },
      { title: 'Consultative Approach', quote: 'understanding each client\'s unique business challenges', desc: 'shows modern sales methodology.' },
      { title: 'Market Research', desc: 'References specific company products, market position, or recent news.' },
      { title: 'Clear Ask', desc: 'Includes a confident call to action — the mark of a true salesperson.' },
    ],
    Technology: [
      { title: 'Scale Context', quote: 'serving 500K+ daily users', desc: 'establishes the scale of systems you\'ve worked with.' },
      { title: 'Performance Metrics', quote: 'reducing response times by 60%', desc: 'quantifies technical improvements.' },
      { title: 'Quality Focus', quote: 'reduced production bugs by 40%', desc: 'demonstrates engineering discipline beyond just shipping code.' },
      { title: 'Technical Credibility', desc: 'Mentions relevant technologies without turning into a keyword dump.' },
      { title: 'Genuine Interest', desc: 'Shows specific knowledge of the company\'s technical challenges or products.' },
    ],
    Healthcare: [
      { title: 'Patient Outcomes', quote: '98% patient satisfaction rating', desc: 'leads with patient-centered metrics.' },
      { title: 'Clinical Impact', quote: 'improved medication adherence by 25%', desc: 'shows measurable improvement in care quality.' },
      { title: 'Credentials Clarity', desc: 'Clearly establishes licensure, certifications, and compliance awareness.' },
      { title: 'Mission Alignment', desc: 'Connects personal values to the healthcare facility\'s mission.' },
      { title: 'Professional Tone', desc: 'Models the professional communication expected in clinical settings.' },
    ],
    Government: [
      { title: 'KSA Alignment', desc: 'Directly addresses the knowledge, skills, and abilities from the job announcement.' },
      { title: 'Measurable Results', desc: 'Quantifies achievements in government-relevant terms.' },
      { title: 'Public Service Commitment', desc: 'Demonstrates genuine dedication to the agency\'s mission.' },
      { title: 'Compliance Awareness', desc: 'Shows understanding of government procedures and regulations.' },
      { title: 'Document Completeness', desc: 'References attached required documents.' },
    ],
    'Food Service': [
      { title: 'Volume Experience', quote: 'high-volume kitchen environments', desc: 'establishes ability to handle busy service.' },
      { title: 'Certifications', quote: 'ServSafe certification', desc: 'demonstrates food safety credentials.' },
      { title: 'Team Orientation', quote: 'teamwork has made me a reliable member', desc: 'shows kitchen culture fit.' },
      { title: 'Flexibility', quote: 'available for any shift', desc: 'addresses scheduling requirements upfront.' },
      { title: 'Enthusiasm', desc: 'Shows genuine passion for the cuisine or establishment.' },
    ],
    Hospitality: [
      { title: 'Guest Satisfaction', quote: 'guest satisfaction score of 4.8/5', desc: 'leads with service metrics.' },
      { title: 'Problem Resolution', desc: 'Demonstrates ability to turn complaints into positive experiences.' },
      { title: 'Service Philosophy', quote: 'Creating memorable guest experiences', desc: 'shows hospitality mindset.' },
      { title: 'Flexibility', quote: 'flexible with scheduling', desc: 'addresses industry\'s scheduling demands.' },
      { title: 'Warmth', desc: 'The letter\'s tone itself demonstrates service orientation.' },
    ],
    Trades: [
      { title: 'Safety Record', quote: 'zero incidents in the past [X years]', desc: 'establishes safety consciousness.' },
      { title: 'Licensing', quote: 'current [relevant licenses/certifications]', desc: 'confirms required credentials.' },
      { title: 'Quality Commitment', quote: 'delivering quality work on time and within budget', desc: 'shows professionalism.' },
      { title: 'Practical Readiness', quote: 'reliable transportation and tools', desc: 'addresses logistical requirements.' },
      { title: 'Availability', desc: 'Demonstrates flexibility for job sites and start date.' },
    ],
    'Customer Service': [
      { title: 'Satisfaction Metrics', quote: 'maintained a 98% satisfaction rating', desc: 'leads with measurable service quality.' },
      { title: 'Resolution Efficiency', quote: 'resolved issues on first contact', desc: 'shows ability to handle problems quickly.' },
      { title: 'Communication Skills', desc: 'The letter itself demonstrates clear, empathetic communication.' },
      { title: 'Difficult Situation Handling', desc: 'Shows experience de-escalating challenging interactions.' },
      { title: 'Systems Proficiency', desc: 'Mentions CRM, ticketing, and communication platforms.' },
    ],
    Logistics: [
      { title: 'Volume Context', quote: 'managing 500+ shipments daily', desc: 'establishes operational scale.' },
      { title: 'Efficiency Gains', quote: 'reduced fulfillment time by 20%', desc: 'shows process improvement capability.' },
      { title: 'Accuracy Focus', quote: '99.8% order accuracy rate', desc: 'demonstrates attention to detail.' },
      { title: 'Systems Knowledge', desc: 'Mentions WMS, TMS, or inventory management experience.' },
      { title: 'Safety Compliance', desc: 'Addresses OSHA, DOT, or hazmat certifications where relevant.' },
    ],
    default: [
      { title: 'Specific Achievements', desc: 'Leads with measurable outcomes rather than generic responsibilities.' },
      { title: 'Company Research', desc: 'Shows genuine knowledge of and interest in the specific employer.' },
      { title: 'Value Proposition', desc: 'Clearly articulates what value the candidate brings to the role.' },
      { title: 'Professional Tone', desc: 'The letter models the communication style the role requires.' },
      { title: 'Clear Ask', desc: 'Includes a confident closing with a call to action.' },
    ],
  };

  return elements[normalizedCategory] || elements.default;
}

// ─── Generate specialization tips ──────────────────────────────────────────

function generateSpecializationTips(jobTitle, category) {
  const normalizedCategory = normalizeCategory(category);
  const lowerTitle = jobTitle.toLowerCase();

  const specs = {
    HR: `### HR Coordinator
- Emphasize organizational skills and attention to detail
- Mention HRIS experience and reporting capabilities
- Highlight ability to support multiple stakeholders

### HR Manager
- Focus on strategic initiatives and business partnership
- Mention employee relations and policy development
- Highlight team leadership and project management

### HR Director/Executive
- Emphasize organizational transformation and culture change
- Mention C-suite collaboration and board-level communication
- Highlight talent strategy and workforce planning`,

    Sales: `### Inside Sales
- Emphasize phone/video selling skills and call metrics
- Mention CRM proficiency and pipeline management
- Highlight ability to qualify leads and set appointments

### Field Sales / Outside Sales
- Focus on territory development and face-to-face relationship building
- Mention travel flexibility and self-motivation
- Highlight presentation skills and closing ability

### Sales Management
- Emphasize team development and coaching
- Mention quota roll-up and forecasting accuracy
- Highlight hiring, training, and performance management`,

    Technology: `### Junior / Entry-Level
- Highlight internships, bootcamps, and personal projects
- Emphasize eagerness to learn and grow
- Mention relevant coursework or certifications

### Mid-Level / Senior
- Focus on ownership and measurable impact
- Quantify contributions with specific metrics
- Highlight mentorship and cross-team collaboration

### Tech Lead / Architect
- Emphasize architectural decisions and technical leadership
- Show organizational impact beyond individual contribution
- Highlight team development and technical strategy`,

    Healthcare: `### Clinical Staff
- Emphasize patient care skills and bedside manner
- Mention specific procedures and patient populations
- Highlight certifications and continuing education

### Healthcare Management
- Focus on department operations and quality metrics
- Mention regulatory compliance and accreditation experience
- Highlight staff development and resource management

### Specialized Roles
- Emphasize relevant specialty certifications
- Mention specific equipment or technique proficiency
- Highlight experience with target patient populations`,

    Government: `### Entry-Level / Academy Graduate
- Emphasize academy training and certifications completed
- Show commitment to public service and community safety
- Highlight physical fitness and ability to meet job demands

### Experienced Officer / Agent
- Lead with years of service and specific assignments
- Mention commendations, certifications, and specialized training
- Show progression through ranks or increasing responsibility

### Supervisory / Administrative Roles
- Emphasize leadership experience and team management
- Mention policy development and compliance oversight
- Highlight budget management and resource allocation`,

    'Customer Service': `### Phone Support Representative
- Emphasize call handling metrics and first-call resolution
- Mention phone system and CRM experience
- Highlight active listening and de-escalation skills

### Chat/Email Support
- Focus on written communication skills and response times
- Mention multi-tasking ability and typing speed
- Highlight knowledge base navigation

### Customer Success / Account Management
- Emphasize retention rates and upselling achievements
- Mention relationship-building over time
- Highlight proactive outreach and health scoring`,

    Logistics: `### Warehouse Associate
- Emphasize picking accuracy and productivity metrics
- Mention forklift certification and equipment experience
- Highlight safety compliance and physical capability

### Shipping/Receiving Coordinator
- Focus on documentation accuracy and carrier relationships
- Mention customs and international shipping experience
- Highlight inventory management systems

### Supply Chain / Operations Manager
- Emphasize cost reduction and efficiency improvements
- Mention vendor management and contract negotiation
- Highlight team leadership and cross-functional collaboration`,

    default: `### Entry-Level / New to the Field
- Highlight transferable skills and relevant education
- Show enthusiasm for learning and growth
- Focus on soft skills like reliability and teamwork

### Experienced Professionals
- Lead with specific achievements and measurable outcomes
- Show progression in responsibility
- Highlight industry-specific expertise

### Senior / Leadership Roles
- Emphasize strategic impact and team development
- Show how you've influenced processes or culture
- Include examples of decisions with long-term impact`,
  };

  return specs[normalizedCategory] || specs.default;
}

// ─── Generate metrics to include ───────────────────────────────────────────

function generateMetricsToInclude(category) {
  const normalizedCategory = normalizeCategory(category);

  const metrics = {
    HR: {
      always: [
        'Years of HR experience',
        'Size of employee population supported',
        'Key HRIS systems used',
        'Certifications (SHRM, PHR)',
      ],
      powerful: [
        'Turnover reduction percentages',
        'Time-to-fill improvements',
        'Employee engagement score increases',
        'Training program completion rates',
        'Cost savings from process improvements',
      ],
    },
    Sales: {
      always: [
        'Quota attainment percentage',
        'Revenue generated (annual or quarterly)',
        'Years of sales experience',
        'Industry or vertical expertise',
      ],
      powerful: [
        'Ranking among peers',
        'Client retention rate',
        'Average deal size',
        'Sales cycle length',
        'New business vs. expansion revenue',
      ],
    },
    Technology: {
      always: [
        'Years of experience',
        'Primary tech stack',
        'Scale of systems (users, transactions)',
        'Team size if applicable',
      ],
      powerful: [
        'Performance improvements (%, latency)',
        'Cost savings or efficiency gains',
        'Bug/incident reduction',
        'Code quality metrics',
        'Project delivery outcomes',
      ],
    },
    Healthcare: {
      always: [
        'License type and status',
        'Years of clinical experience',
        'Specialty or patient population',
        'EMR/EHR systems used',
      ],
      powerful: [
        'Patient satisfaction scores',
        'Clinical outcome improvements',
        'Caseload managed',
        'Quality metrics achieved',
        'Training or certifications',
      ],
    },
    Government: {
      always: [
        'Years of relevant experience',
        'Security clearance status',
        'Agency or program familiarity',
        'Specific KSAs addressed',
      ],
      powerful: [
        'Budget managed',
        'Team size supervised',
        'Process improvements implemented',
        'Compliance achievements',
        'Award or recognition received',
      ],
    },
    'Food Service': {
      always: [
        'Years of kitchen experience',
        'Food safety certifications',
        'Volume/covers handled',
        'Cuisine or specialty expertise',
      ],
      powerful: [
        'Cost control achievements',
        'Menu development contributions',
        'Team training provided',
        'Customer satisfaction improvements',
        'Efficiency gains in kitchen operations',
      ],
    },
    Hospitality: {
      always: [
        'Years of hospitality experience',
        'Guest satisfaction scores',
        'Property management systems used',
        'Languages spoken',
      ],
      powerful: [
        'Revenue per room improvements',
        'Upselling achievements',
        'Problem resolution examples',
        'Training certifications',
        'Awards or recognition',
      ],
    },
    Trades: {
      always: [
        'Years of experience',
        'Licenses and certifications held',
        'Safety record',
        'Types of projects completed',
      ],
      powerful: [
        'Number of projects completed',
        'Budget sizes managed',
        'On-time completion rate',
        'Quality or inspection scores',
        'Apprentice training provided',
      ],
    },
    'Customer Service': {
      always: [
        'Years of customer service experience',
        'Customer satisfaction scores',
        'Communication channels (phone, chat, email)',
        'CRM and ticketing systems used',
      ],
      powerful: [
        'First-call resolution rate',
        'Average handle time improvements',
        'Customer retention rates',
        'Team satisfaction scores',
        'Training or mentoring provided',
      ],
    },
    Logistics: {
      always: [
        'Years of logistics/warehouse experience',
        'Volume handled (orders, shipments, units)',
        'Systems proficiency (WMS, TMS)',
        'Certifications (forklift, hazmat, DOT)',
      ],
      powerful: [
        'Order accuracy rate',
        'Efficiency improvements',
        'Cost reduction achievements',
        'Safety record',
        'Team size managed',
      ],
    },
    default: {
      always: [
        'Years of relevant experience',
        'Key skills or certifications',
        'Industry or domain expertise',
        'Team or project scope',
      ],
      powerful: [
        'Quantified achievements',
        'Cost savings or revenue impact',
        'Process improvements',
        'Recognition or awards',
        'Team development',
      ],
    },
  };

  return metrics[normalizedCategory] || metrics.default;
}

function generateExperienceTips(jobTitle, category) {
  const normalizedCategory = normalizeCategory(category);

  return {
    junior: normalizedCategory === 'Technology'
      ? `Focus on internships, coursework projects, and any open-source contributions. Emphasize eagerness to learn and grow. If you completed relevant bootcamps or certifications, highlight specific projects you built.`
      : normalizedCategory === 'Healthcare'
      ? `Highlight clinical rotations, volunteer experience, and any patient interaction. Emphasize your certifications and genuine passion for patient care. Mention specific preceptors or programs that shaped your approach.`
      : normalizedCategory === 'Sales'
      ? `Focus on any customer-facing experience, even from retail or service jobs. Highlight times you exceeded goals or helped customers solve problems. Show your competitive drive and coachability.`
      : `Highlight transferable skills from internships, part-time work, or volunteer experience. Show enthusiasm for learning and demonstrate relevant coursework or certifications. Focus on soft skills like reliability and teamwork.`,

    mid: normalizedCategory === 'Technology'
      ? `Lead with ownership and measurable impact from your current role. Quantify your contributions with metrics — users served, performance improvements, team size. Show ability to work across teams and mentor others.`
      : normalizedCategory === 'Healthcare'
      ? `Emphasize your specialized clinical experience and patient outcomes. Show progression in responsibility and any quality improvement initiatives you've led. Mention your approach to continuing education.`
      : normalizedCategory === 'Sales'
      ? `Lead with your quota attainment history and revenue impact. Show deal complexity and sales cycle understanding. Demonstrate how you've developed business in new territories or accounts.`
      : `Focus on specific achievements with measurable outcomes from your current and recent roles. Show progression in responsibility and any leadership or mentoring you've done. Quantify your impact where possible.`,

    senior: normalizedCategory === 'Technology'
      ? `Emphasize architectural decisions, technical leadership, and organizational impact. Show how you've influenced technology strategy and developed talent. Include scale metrics that demonstrate senior-level scope.`
      : normalizedCategory === 'Healthcare'
      ? `Highlight leadership experience, protocol development, and department-level improvements. Show how you've mentored junior staff and contributed to quality metrics. Demonstrate your role in compliance and best practices.`
      : normalizedCategory === 'Sales'
      ? `Focus on team leadership, revenue at scale, and strategic account management. Show how you've developed sales playbooks, trained reps, or expanded into new markets. Emphasize enterprise-level deal complexity.`
      : `Emphasize leadership experience, strategic impact, and team development. Show how you've influenced processes, policies, or organizational direction. Include examples of decisions with long-term impact.`,
  };
}

// ─── Generate FAQ ──────────────────────────────────────────────────────────

function generateFAQ(jobTitle, category) {
  const normalizedCategory = normalizeCategory(category);
  const categoryFAQs = {
    HR: [
      { question: `Should I mention HR certifications in my cover letter?`, answer: `Yes, briefly mention relevant certifications like SHRM-CP, PHR, or SPHR in your cover letter, especially if the job posting requires them. However, save the detailed list for your resume. In the cover letter, focus on how your certified knowledge has driven results — for example, "Applied my SHRM-CP training to redesign our onboarding program, reducing new hire turnover by 35%."` },
      { question: `How do I address sensitive HR experience in a cover letter?`, answer: `Reference your experience handling sensitive situations without disclosing specifics. For example, "Led investigations requiring discretion and thorough documentation" or "Managed confidential employee relations matters resulting in positive resolutions." This demonstrates experience while respecting confidentiality.` },
      { question: `Should I tailor my HR cover letter to the company's culture?`, answer: `Absolutely. Research the company's values, recent news, and employer brand. Reference specific initiatives that align with your HR philosophy. Hiring managers notice when candidates understand their culture — it's a core HR competency.` },
      { question: `How long should my ${jobTitle} cover letter be?`, answer: `Keep it to one page, ideally 3-4 paragraphs or 250-350 words. HR hiring managers review many applications and appreciate concise communication — a skill they'll expect you to model.` },
    ],
    Sales: [
      { question: `Should I include my quota numbers in a sales cover letter?`, answer: `Absolutely. Sales is a numbers-driven profession, and hiring managers expect to see performance metrics. Include your quota attainment percentage, revenue generated, or ranking among peers. "Achieved 142% of quota in Q4 2024, ranking #2 among 45 reps" is exactly what they want to see.` },
      { question: `How aggressive should my tone be in a sales cover letter?`, answer: `Confident but not pushy. You're demonstrating your sales ability through the letter itself, so use persuasive language and a clear call to action. However, avoid clichés like "I won't take no for an answer" — modern sales values consultative approaches over hard-close tactics.` },
      { question: `Should I mention specific products or markets in my cover letter?`, answer: `Yes, demonstrate that you've researched the company. Mention their products, target market, or recent wins. Connecting your experience to their specific sales motion shows you're not mass-applying and that you understand their business.` },
      { question: `How do I address a career change into sales?`, answer: `Focus on transferable skills: customer interaction, quota-driven environments, competitive achievements, or persuasion experience. Many successful sales professionals came from service, hospitality, or other customer-facing roles. Emphasize your hunger to learn and earn.` },
    ],
    Technology: [
      { question: `Should I mention my GitHub in a ${jobTitle} cover letter?`, answer: `Yes, if you have quality contributions. Reference specific projects or contributions briefly: "My open-source work on [project] demonstrates my approach to clean, documented code." Don't just drop a link — give context for why it's relevant.` },
      { question: `How technical should my cover letter be?`, answer: `Balance technical credibility with readability. Mention specific technologies relevant to the job, but focus on outcomes rather than implementation details. "Built a real-time data pipeline processing 50K events/second" is better than a paragraph explaining your Kafka configuration.` },
      { question: `Should I explain employment gaps in tech?`, answer: `Only if they're significant. Brief gaps for job searching don't need explanation. If you took time for a bootcamp, personal project, or family reasons, mention it positively: "Used my career break to complete AWS certification and contribute to open-source projects."` },
      { question: `How do I stand out when applying to competitive tech companies?`, answer: `Research their engineering blog, open-source projects, or specific technical challenges. Reference something specific that genuinely interests you. Generic enthusiasm for "the company's mission" won't differentiate you from hundreds of other applicants.` },
    ],
    Healthcare: [
      { question: `Should I mention my license status in the cover letter?`, answer: `Yes, include your license type and status (active, state, any compact agreements). For example: "I hold an active RN license in [State] with compact privileges." This is often a threshold requirement, and confirming it upfront saves the recruiter time.` },
      { question: `How do I balance clinical skills with compassion in my cover letter?`, answer: `Show both through specific examples. Instead of saying "I'm compassionate," describe a situation: "When a patient's family struggled to understand their diagnosis, I scheduled additional time to explain options and provide resources, resulting in their grateful feedback to administration."` },
      { question: `Should I address COVID-19 experience?`, answer: `If relevant to the role, yes. Pandemic experience demonstrates adaptability, crisis response, and resilience. Mention specific skills gained: PPE protocols, telehealth adoption, surge capacity management, or infection control improvements.` },
      { question: `How long should a healthcare cover letter be?`, answer: `One page maximum. Hiring managers in healthcare review many applications and value efficiency. Lead with your credentials and most relevant clinical experience. Save detailed procedure lists for your resume.` },
    ],
    'Customer Service': [
      { question: `Should I mention specific satisfaction scores in my cover letter?`, answer: `Yes, customer service is a metrics-driven field. If you maintained a 98% satisfaction rating, achieved 90% first-call resolution, or reduced average handle time by 15%, include those numbers. They demonstrate that you're focused on the outcomes that matter.` },
      { question: `How do I demonstrate soft skills without sounding generic?`, answer: `Use specific examples instead of listing traits. Rather than saying "I'm a good communicator," write: "De-escalated a situation with an upset customer by actively listening, acknowledging their frustration, and offering a solution that retained their business." Evidence beats adjectives.` },
      { question: `Should I mention my experience with specific systems?`, answer: `Absolutely. CRM platforms (Salesforce, Zendesk, HubSpot), ticketing systems, and communication tools are important. If the job posting mentions specific software, address your experience directly. Even if it's similar software, mention your ability to learn new systems quickly.` },
      { question: `How do I address experience across multiple channels?`, answer: `If you have phone, chat, email, and social media experience, highlight your versatility. "Provided omnichannel support across phone (60% volume), live chat (25%), and email (15%)" shows you can handle the variety of modern customer service.` },
    ],
    Logistics: [
      { question: `Should I mention certifications in my cover letter?`, answer: `Yes, certifications are critical in logistics. Forklift certification, hazmat handling, DOT compliance, and OSHA safety training should be mentioned prominently. Many logistics positions have strict certification requirements — addressing them upfront shows you're qualified.` },
      { question: `How do I quantify logistics experience?`, answer: `Use volume, accuracy, and efficiency metrics. "Managed receiving for 500+ daily shipments with 99.8% accuracy" or "Reduced pick-to-ship time by 25% through zone optimization" tells hiring managers exactly what you can handle. Logistics is numbers-driven.` },
      { question: `Should I address physical requirements?`, answer: `If the job involves physical demands (lifting, standing, operating equipment), it's worth addressing your ability to meet them. "Comfortable with physical demands including lifting up to 50 lbs and standing for extended shifts" removes a potential concern.` },
      { question: `How important is systems experience?`, answer: `Very important. Warehouse Management Systems (WMS), Transportation Management Systems (TMS), and inventory software are standard. Mention specific systems you've used and your proficiency level. If you don't have experience with their exact system, emphasize your ability to learn quickly.` },
    ],
    default: [
      { question: `How long should my ${jobTitle} cover letter be?`, answer: `Keep it to one page — ideally 3-4 paragraphs or 250-350 words. Hiring managers appreciate candidates who communicate value concisely. If you can't fit everything, focus on your most relevant achievements and save the details for your resume.` },
      { question: `Should I repeat what's on my resume in the cover letter?`, answer: `No. The cover letter should add context, not duplicate information. Use it to explain the "why" behind your career moves, highlight achievements most relevant to this specific role, and demonstrate genuine interest in the company.` },
      { question: `What if I don't know the hiring manager's name?`, answer: `"Dear Hiring Manager" is perfectly acceptable. Avoid outdated phrases like "To Whom It May Concern." If you want to go the extra mile, try LinkedIn to find the hiring manager or team lead, but don't stress if you can't find a name.` },
      { question: `How do I address career gaps or a non-traditional background?`, answer: `Address it briefly and positively. Focus on what you did during the gap (skills gained, freelance work, education, caregiving) and pivot quickly to why you're an excellent fit for this role. Don't apologize — frame your unique path as an asset.` },
    ],
  };

  return categoryFAQs[normalizedCategory] || categoryFAQs.default;
}

// ─── Generate tags ─────────────────────────────────────────────────────────

function generateTags(jobTitle, slug) {
  const lowerTitle = jobTitle.toLowerCase();
  const slugTitle = slug.replace(/-/g, ' ');
  // Use Set to remove duplicates, then convert back to array
  const tags = [
    `${lowerTitle} cover letter`,
    `${lowerTitle} cover letter example`,
    `${lowerTitle} cover letter template`,
    `cover letter for ${lowerTitle}`,
    `${lowerTitle} application letter`,
    `how to write ${lowerTitle} cover letter`,
    `professional cover letter`,
    `cover letter example`,
  ];
  // If slug-based title is different from jobTitle, add it
  if (slugTitle !== lowerTitle) {
    tags.splice(2, 0, `${slugTitle} cover letter`);
  }
  return [...new Set(tags)].slice(0, 8);
}

// ─── Generate full MDX content ─────────────────────────────────────────────

function generateMDX(resumeData) {
  const { slug, jobTitle, category, keySkills } = resumeData;
  const author = getAuthorForCategory(category);
  const date = new Date().toISOString().split('T')[0];
  const tags = generateTags(jobTitle, slug);
  const faq = generateFAQ(jobTitle, category);
  const skills = keySkills || [];
  const lowerTitle = jobTitle.toLowerCase();

  const opener = getCategoryOpener(category, jobTitle);
  const mistakes = getCategoryMistakes(category);
  const exampleLetter = generateExampleLetter(jobTitle, skills, category);
  const keyElements = generateKeyElements(category, jobTitle);
  const specializationTips = generateSpecializationTips(jobTitle, category);
  const metricsToInclude = generateMetricsToInclude(category);

  // Build frontmatter - ensure target keyword appears in title and description
  const frontmatter = {
    title: `${jobTitle} Cover Letter Example & Writing Guide 2026`,
    slug,
    description: `Professional ${lowerTitle} cover letter example with templates. Learn how to showcase your ${skills.slice(0, 2).join(' and ').toLowerCase() || 'skills'} expertise and land ${lowerTitle} interviews.`,
    date,
    author,
    category,
    tags,
    jobTitle,
    keySkills: skills.slice(0, 8),
    featured: false,
    faq,
  };

  // Build body content - keyword in first 100-150 words per SEO guidelines
  const body = `
## What Makes a ${jobTitle} Cover Letter Stand Out?

${opener}

Unlike your resume which lists what you've done, your ${lowerTitle} cover letter explains *why* your experience matters for this role and what drives your professional passion.

## ${jobTitle} Cover Letter Example

Here's a proven cover letter format for ${lowerTitle} positions:

**Example for ${jobTitle}:**

---

${exampleLetter}

---

## Key Elements of an Effective ${jobTitle} Cover Letter

${keyElements.map((el, i) => `### ${i + 1}. ${el.title}
${el.quote ? `"${el.quote}" ` : ''}${el.desc}`).join('\n\n')}

## Cover Letters by ${jobTitle} Specialization

${specializationTips}

## Metrics to Include in Your ${jobTitle} Cover Letter

**Always include:**
${metricsToInclude.always.map(m => `- ${m}`).join('\n')}

**Powerful additions:**
${metricsToInclude.powerful.map(m => `- ${m}`).join('\n')}

## Common ${jobTitle} Cover Letter Mistakes

${mistakes.map(m => {
    const parts = m.split(' — ');
    if (parts.length === 2) {
      return `- **${parts[0]}** — ${parts[1]}`;
    }
    return `- **${m.split(' ').slice(0, 3).join(' ')}** — ${m}`;
  }).join('\n')}

`;

  // Combine into final MDX
  const yamlFrontmatter = `---
title: '${frontmatter.title}'
slug: ${frontmatter.slug}
description: >-
  ${frontmatter.description}
date: '${frontmatter.date}'
author: ${frontmatter.author}
category: ${frontmatter.category}
tags:
${frontmatter.tags.map(t => `  - ${t}`).join('\n')}
jobTitle: ${frontmatter.jobTitle}
keySkills:
${frontmatter.keySkills.map(s => `  - ${s}`).join('\n')}
featured: ${frontmatter.featured}
faq:
${frontmatter.faq.map(f => `  - question: ${f.question}
    answer: >-
      ${f.answer.replace(/\n/g, '\n      ')}`).join('\n')}
---`;

  return yamlFrontmatter + body;
}

// ─── Main execution ────────────────────────────────────────────────────────

async function main() {
  console.log('🔍 Scanning for missing cover letter examples...\n');

  // Get all resume examples
  const resumeFiles = fs.readdirSync(RESUME_DIR).filter(f => f.endsWith('.mdx'));
  const coverLetterFiles = new Set(
    fs.readdirSync(COVER_LETTER_DIR).filter(f => f.endsWith('.mdx')).map(f => f.replace('.mdx', ''))
  );

  // Find missing cover letters
  const missing = [];
  for (const file of resumeFiles) {
    const slug = file.replace('.mdx', '');
    if (!coverLetterFiles.has(slug)) {
      const filePath = path.join(RESUME_DIR, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(content);
      missing.push({
        slug,
        jobTitle: data.jobTitle || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        category: data.category || 'Other',
        keySkills: data.keySkills || [],
      });
    }
  }

  console.log(`📊 Found ${missing.length} resume examples without cover letters\n`);

  // Filter by tier
  let toGenerate = missing;
  if (tierArg === '1') {
    toGenerate = missing.filter(m => TIER_1.includes(m.slug));
    console.log(`🎯 Tier 1 filter: ${toGenerate.length} high-priority examples\n`);
  } else if (tierArg === '2') {
    toGenerate = missing.filter(m => TIER_2.includes(m.slug));
    console.log(`🎯 Tier 2 filter: ${toGenerate.length} medium-priority examples\n`);
  } else if (tierArg === '3') {
    toGenerate = missing.filter(m => !TIER_1.includes(m.slug) && !TIER_2.includes(m.slug));
    console.log(`🎯 Tier 3 filter: ${toGenerate.length} long-tail examples\n`);
  }

  // Apply limit
  if (limitArg && limitArg > 0) {
    toGenerate = toGenerate.slice(0, limitArg);
    console.log(`📉 Limited to first ${limitArg} examples\n`);
  }

  if (toGenerate.length === 0) {
    console.log('✅ No cover letters to generate!');
    return;
  }

  console.log(`📝 Generating ${toGenerate.length} cover letter examples...\n`);

  let created = 0;
  for (const resume of toGenerate) {
    const mdx = generateMDX(resume);
    const outputPath = path.join(COVER_LETTER_DIR, `${resume.slug}.mdx`);

    if (dryRun) {
      console.log(`[DRY RUN] Would create: ${resume.slug}.mdx (${resume.category})`);
    } else {
      fs.writeFileSync(outputPath, mdx, 'utf-8');
      console.log(`✅ Created: ${resume.slug}.mdx`);
      created++;
    }
  }

  console.log(`\n🎉 Done! ${dryRun ? 'Would create' : 'Created'} ${created || toGenerate.length} cover letter examples.`);

  // Show count
  const newTotal = coverLetterFiles.size + (dryRun ? 0 : created);
  console.log(`📈 Total cover letter examples: ${newTotal}`);
}

main().catch(console.error);

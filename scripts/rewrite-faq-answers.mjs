#!/usr/bin/env node
/**
 * Rewrites templated FAQ answers across all resume example pages.
 *
 * Problem: All 306 pages use identical FAQ answer templates with only
 * {jobTitle} and {skills} swapped — a clear programmatic spam signal.
 *
 * Solution: Generate category-aware, profession-specific FAQ answers
 * with varied sentence structures per industry group.
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

// ─── Category-specific context for FAQ generation ───────────────────────

const CATEGORY_CONTEXT = {
  Technology: {
    hiringCulture: 'technical interviews and coding assessments',
    resumeFocus: 'technical depth, project complexity, and system scale',
    formatAdvice: 'a dedicated Technical Skills section grouped by domain (languages, frameworks, cloud, tools) near the top',
    lengthNote: 'One page for engineers with under 5 years of experience. Senior engineers, architects, and engineering managers with significant system design or leadership scope can justify two pages',
    uniqueSection: 'a GitHub profile link or portfolio of technical projects',
    salaryFactors: 'tech stack demand, company stage (startup vs. FAANG), and remote vs. on-site arrangement',
  },
  Healthcare: {
    hiringCulture: 'credential verification and clinical competency assessments',
    resumeFocus: 'licensure, certifications, patient care metrics, and clinical specializations',
    formatAdvice: 'a Licenses & Certifications section placed prominently before work experience — healthcare recruiters check credentials first',
    lengthNote: 'One page for early-career clinicians. Experienced professionals with multiple specialties, certifications, or leadership roles may use two pages',
    uniqueSection: 'license numbers, state of licensure, and expiration dates',
    salaryFactors: 'specialty area, shift differentials, geographic region, and facility type (hospital vs. private practice)',
  },
  Finance: {
    hiringCulture: 'compliance-focused screening with attention to regulatory knowledge',
    resumeFocus: 'accuracy metrics, compliance track records, financial volume handled, and regulatory certifications',
    formatAdvice: 'quantified financial metrics early — dollar volumes processed, portfolio sizes managed, or audit results achieved',
    lengthNote: 'One page for analysts and entry-level roles. Senior professionals managing teams or large portfolios may extend to two pages',
    uniqueSection: 'regulatory certifications (CPA, CFA, Series licenses) and compliance training',
    salaryFactors: 'institution size, regulatory complexity, geographic market, and specialization (lending vs. investment vs. insurance)',
  },
  Hospitality: {
    hiringCulture: 'fast-paced hiring where personality, reliability, and guest service skills matter as much as experience',
    resumeFocus: 'guest satisfaction scores, revenue contribution, service volume, and team leadership',
    formatAdvice: 'certifications (TIPS, ServSafe, food handler permits) prominently displayed, since many positions require them before a start date',
    lengthNote: 'One page is standard across all experience levels in hospitality. Hiring managers review high volumes of applications quickly',
    uniqueSection: 'specific venue types and service volumes (covers per night, occupancy rates, bar revenue)',
    salaryFactors: 'venue type (fine dining vs. casual), location (resort vs. urban), tips structure, and seasonal demand',
  },
  Business: {
    hiringCulture: 'structured hiring with emphasis on leadership capability, strategic thinking, and measurable business outcomes',
    resumeFocus: 'revenue impact, team sizes managed, process improvements, and cross-functional leadership',
    formatAdvice: 'a results-driven professional summary with specific business metrics (revenue growth, cost savings, team development outcomes)',
    lengthNote: 'One page for mid-level professionals. Directors, VPs, and executives with broad organizational impact may use two pages',
    uniqueSection: 'quantified business outcomes — revenue generated, costs reduced, teams built, and initiatives launched',
    salaryFactors: 'industry sector, company size, scope of responsibility, and geographic market',
  },
  Management: {
    hiringCulture: 'structured hiring with emphasis on leadership capability, strategic thinking, and measurable business outcomes',
    resumeFocus: 'team leadership, operational improvements, P&L responsibility, and stakeholder management',
    formatAdvice: 'leadership metrics front and center — team sizes, budget responsibility, and operational KPIs that demonstrate management capability',
    lengthNote: 'One page for first-time managers. Senior managers and directors overseeing multiple teams or departments may use two pages',
    uniqueSection: 'management scope — number of direct reports, budget size, and cross-functional teams coordinated',
    salaryFactors: 'industry, number of direct reports, P&L responsibility, and whether the role is individual-contributor or people-management track',
  },
  Marketing: {
    hiringCulture: 'portfolio and results-driven hiring where campaign performance metrics speak louder than job titles',
    resumeFocus: 'campaign ROI, traffic and conversion metrics, audience growth, and channel expertise',
    formatAdvice: 'specific marketing channels and platforms you have driven results on — Google Ads, social media, email, SEO — with performance numbers attached',
    lengthNote: 'One page for specialists and coordinators. Marketing directors or heads of marketing with multi-channel, multi-team experience can extend to two',
    uniqueSection: 'campaign case studies or portfolio links demonstrating measurable marketing outcomes',
    salaryFactors: 'specialization (performance marketing pays more than general), industry, company growth stage, and whether the role is in-house vs. agency',
  },
  Engineering: {
    hiringCulture: 'technical evaluation with emphasis on hands-on design experience, simulation proficiency, and industry-specific knowledge',
    resumeFocus: 'design tools (CAD platforms, simulation software), project complexity, industry standards compliance, and measurable design outcomes',
    formatAdvice: 'specific engineering tools and platforms with years of experience listed — hiring managers scan for exact CAD/simulation software matches',
    lengthNote: 'One page for engineers with under 7 years of experience. Senior engineers with patents, publications, or cross-industry project portfolios may use two pages',
    uniqueSection: 'engineering standards and certifications (PE license, FE certification, industry-specific standards like ASME, IEEE, or ISO)',
    salaryFactors: 'engineering discipline, PE licensure, industry sector (aerospace and defense typically pay more), and project complexity',
  },
  Sales: {
    hiringCulture: 'metrics-first hiring where quota attainment, revenue generated, and deal sizes determine candidacy',
    resumeFocus: 'quota attainment percentages, revenue generated, deal sizes, pipeline value, and client retention rates',
    formatAdvice: 'your sales numbers above everything — quota attainment, revenue closed, and deal metrics should appear in the first few lines of your resume',
    lengthNote: 'One page is strongly preferred. Sales hiring managers are fast readers who want numbers, not narratives',
    uniqueSection: 'a Sales Performance section or Achievement Highlights box showing quota attainment, revenue, and rankings',
    salaryFactors: 'base-to-commission ratio, industry (SaaS and enterprise tend to pay highest), territory size, and deal complexity',
  },
  HR: {
    hiringCulture: 'process-oriented hiring with attention to employment law knowledge, HRIS proficiency, and people management skills',
    resumeFocus: 'HR systems expertise, hiring metrics (time-to-fill, cost-per-hire), employee retention rates, and compliance knowledge',
    formatAdvice: 'HRIS platforms and HR certifications (PHR, SPHR, SHRM-CP) prominently listed — these are the first things HR hiring managers verify',
    lengthNote: 'One page for coordinators and generalists. HR directors and VPs managing enterprise-wide programs may use two pages',
    uniqueSection: 'HR technology platforms (Workday, ADP, BambooHR, Greenhouse) and professional certifications',
    salaryFactors: 'company size, HR specialization (compensation and benefits tend to pay more), and whether the role is generalist or specialist',
  },
  Logistics: {
    hiringCulture: 'operations-focused hiring where efficiency metrics, system proficiency, and supply chain knowledge drive decisions',
    resumeFocus: 'throughput metrics, cost reduction achievements, system expertise (WMS, TMS, ERP), and supply chain optimization outcomes',
    formatAdvice: 'operational metrics and system proficiency up front — units processed, shipping accuracy rates, cost savings, and the specific WMS/TMS/ERP platforms you know',
    lengthNote: 'One page for coordinators and specialists. Senior managers overseeing multi-site or global operations may use two pages',
    uniqueSection: 'supply chain systems (SAP, Oracle, Manhattan WMS) and logistics certifications (CSCP, CLTD, Six Sigma)',
    salaryFactors: 'supply chain complexity, global vs. domestic scope, industry (pharma and tech logistics pay premiums), and operational scale',
  },
  Administrative: {
    hiringCulture: 'efficiency-focused hiring where organizational skills, software proficiency, and reliability are evaluated quickly',
    resumeFocus: 'office productivity tools, organizational accomplishments, process improvements, and the scope of executive support provided',
    formatAdvice: 'software proficiency listed clearly (Microsoft 365, Google Workspace, scheduling tools, CRM/ERP systems) since administrative hiring often filters on specific tools',
    lengthNote: 'One page is standard and expected. Administrative roles demand conciseness — a well-organized one-page resume demonstrates the organizational skills the job requires',
    uniqueSection: 'specific executive support scope — number of executives supported, calendar complexity, travel coordination volume',
    salaryFactors: 'executive level supported (C-suite assistants earn significantly more), industry, company size, and specialized skills (legal or medical administrative)',
  },
  Retail: {
    hiringCulture: 'high-volume hiring where availability, customer service orientation, and sales metrics determine candidate selection',
    resumeFocus: 'sales performance, customer satisfaction scores, transaction volumes, and team leadership within a store environment',
    formatAdvice: 'sales and customer metrics near the top — daily transaction volumes, upselling results, mystery shopper scores, and any team leadership responsibilities',
    lengthNote: 'One page is expected. Retail hiring managers review large applicant pools quickly and appreciate concise, scannable resumes',
    uniqueSection: 'POS system experience (specific platforms like Square, Shopify POS, NCR) and sales performance rankings',
    salaryFactors: 'store type (luxury retail pays more), management responsibility, commission structure, and geographic location',
  },
  Creative: {
    hiringCulture: 'portfolio-driven hiring where visual work and creative impact matter more than traditional resume content',
    resumeFocus: 'creative tools mastery, portfolio highlights, brand impact metrics, and client or project diversity',
    formatAdvice: 'your portfolio URL directly under your name — for creative roles, the portfolio often outweighs the resume. Keep the resume ATS-friendly and let the portfolio showcase your visual skills',
    lengthNote: 'One page is preferred. Let your portfolio demonstrate depth — the resume should be a concise summary of experience, tools, and measurable creative outcomes',
    uniqueSection: 'a portfolio link and 2-3 featured project highlights with measurable results (engagement rates, brand recognition, awards)',
    salaryFactors: 'specialization (UX and product design pay more than print), industry, in-house vs. agency, and portfolio strength',
  },
  Manufacturing: {
    hiringCulture: 'skills-based hiring focused on equipment certifications, safety records, and production efficiency metrics',
    resumeFocus: 'equipment operation certifications, production metrics (units produced, defect rates), safety record, and lean manufacturing experience',
    formatAdvice: 'certifications and equipment qualifications prominently displayed — manufacturing employers often require specific certifications before they can assign you to equipment or production lines',
    lengthNote: 'One page is standard. Focus on certifications, equipment you can operate, and production metrics rather than lengthy job descriptions',
    uniqueSection: 'equipment certifications, safety training records (OSHA, lockout/tagout), and lean/Six Sigma credentials',
    salaryFactors: 'equipment specialization, shift (night shifts often pay premiums), industry sector, union status, and geographic location',
  },
  Trades: {
    hiringCulture: 'certification and hands-on skills-driven hiring where trade licenses and safety records are non-negotiable',
    resumeFocus: 'trade certifications and licenses, safety compliance record, project types and scale, and specific equipment proficiency',
    formatAdvice: 'a dedicated Certifications & Licenses section at the top of your resume — trade employers verify credentials before reviewing experience',
    lengthNote: 'One page at all experience levels. Trades hiring is practical — list your certifications, equipment, project types, and safety record clearly',
    uniqueSection: 'trade licenses (journeyman, master), OSHA certifications, and specific project types completed with values or scale',
    salaryFactors: 'trade specialization, journeyman vs. master certification, union vs. non-union, geographic demand, and willingness to travel',
  },
  'Customer Service': {
    hiringCulture: 'volume hiring where communication skills, problem-solving ability, and customer satisfaction metrics are the primary evaluators',
    resumeFocus: 'customer satisfaction scores, ticket volumes handled, resolution rates, and CRM/helpdesk platform experience',
    formatAdvice: 'customer metrics and platform experience near the top — CSAT scores, average handle time, first-call resolution rates, and the specific CRM or ticketing systems you have used',
    lengthNote: 'One page is standard. Customer service managers review large applicant pools and need to assess your qualifications quickly',
    uniqueSection: 'CRM and helpdesk platform experience (Zendesk, Salesforce Service Cloud, Freshdesk) and customer satisfaction metrics',
    salaryFactors: 'support channel (phone vs. technical support), industry, language skills, and whether the role is frontline vs. escalation/management',
  },
  'Real Estate': {
    hiringCulture: 'results-driven hiring where transaction volume, sales figures, and client relationships determine success',
    resumeFocus: 'transaction volume, sales dollar amounts, client portfolio size, and license/certification credentials',
    formatAdvice: 'your real estate license, transaction volume, and sales figures prominently displayed — brokerages evaluate agents primarily on production metrics',
    lengthNote: 'One page is expected. Focus on your license, production numbers, market expertise, and client results',
    uniqueSection: 'real estate license details, transaction volume, and market specialization (residential, commercial, luxury)',
    salaryFactors: 'commission structure, market (luxury and commercial pay more), brokerage split, transaction volume, and geographic market activity',
  },
  Fitness: {
    hiringCulture: 'certification-first hiring where nationally recognized credentials and client results determine candidacy',
    resumeFocus: 'fitness certifications (NASM, ACE, NSCA), client transformation results, class sizes, and retention rates',
    formatAdvice: 'certifications at the top (NASM-CPT, ACE, CSCS, group fitness certifications) — gyms and studios verify credentials before interviewing',
    lengthNote: 'One page is standard. Include your certifications, specializations, client results, and class/session metrics',
    uniqueSection: 'nationally recognized certifications, CPR/AED certification, specialty certifications (corrective exercise, nutrition coaching)',
    salaryFactors: 'certification level, specialization (strength and conditioning pays more), private vs. gym employment, client base size, and geographic market',
  },
  Education: {
    hiringCulture: 'credential-based hiring where degrees, teaching certifications, and classroom outcomes are evaluated systematically',
    resumeFocus: 'teaching certifications, subject expertise, student outcome improvements, and classroom management skills',
    formatAdvice: 'your teaching license/certification, degree, and subject endorsements at the top — school districts verify these before reviewing anything else',
    lengthNote: 'One to two pages depending on experience. New teachers should aim for one page; experienced educators with publications, curriculum development, or administrative experience may use two',
    uniqueSection: 'teaching certifications, state endorsements, and measurable student outcomes (test score improvements, graduation rates)',
    salaryFactors: 'degree level (masters earns a higher step), years of experience, school district, geographic location, and subject demand (STEM and special education often pay premiums)',
  },
  Construction: {
    hiringCulture: 'skills and safety-focused hiring where trade certifications, equipment proficiency, and safety records are mandatory qualifiers',
    resumeFocus: 'OSHA certifications, equipment operation skills, project types and values, and safety record',
    formatAdvice: 'a Certifications & Safety section near the top listing OSHA 10/30, first aid, equipment licenses, and trade certifications — contractors check these before reviewing experience',
    lengthNote: 'One page at all levels. Construction hiring is direct — certifications, trade skills, equipment, project types, and safety record are what matter',
    uniqueSection: 'OSHA certifications, equipment operation licenses, and project types with values (residential, commercial, heavy civil)',
    salaryFactors: 'trade specialization, OSHA certification level, union status, project type (heavy civil pays more), and geographic demand',
  },
  Transportation: {
    hiringCulture: 'license and compliance-first hiring where CDL class, endorsements, and driving record are checked before any other qualification',
    resumeFocus: 'CDL class and endorsements, driving record (clean MVR), miles driven, routes covered, and DOT compliance',
    formatAdvice: 'CDL class, endorsements, and clean driving record at the very top — transportation employers will not proceed without verifying these credentials',
    lengthNote: 'One page is standard. Include your license details, endorsements, driving record summary, and route/mileage experience',
    uniqueSection: 'CDL class and endorsements, MVR status, DOT medical certification, and specific vehicle types operated',
    salaryFactors: 'CDL endorsements (hazmat and tanker pay premiums), route type (OTR vs. local), company vs. owner-operator, and geographic demand',
  },
  Science: {
    hiringCulture: 'credential and methodology-driven hiring where publications, research experience, and technical proficiency are primary evaluators',
    resumeFocus: 'research methodologies, laboratory techniques, publications, and scientific instrumentation proficiency',
    formatAdvice: 'your degree, research focus, and key publications or conference presentations listed prominently — scientific hiring managers evaluate academic credentials and research output first',
    lengthNote: 'One to two pages. Research scientists with publications and grant experience may extend to two pages or attach a separate publication list',
    uniqueSection: 'publications, conference presentations, research grants, and specific laboratory techniques or instrumentation',
    salaryFactors: 'degree level (PhD commands higher compensation), research field, industry vs. academic setting, and geographic location',
  },
  Events: {
    hiringCulture: 'portfolio and reference-driven hiring where event scale, budget management, and vendor coordination demonstrate competency',
    resumeFocus: 'event scale (attendees, budget), vendor management, logistics coordination, and client satisfaction',
    formatAdvice: 'event portfolio highlights — types of events planned, attendance numbers, budgets managed, and specific client or guest satisfaction metrics',
    lengthNote: 'One page is standard. Include your most impressive events with attendee counts, budgets, and outcomes',
    uniqueSection: 'event types managed, largest budget handled, peak attendee count, and venue relationships',
    salaryFactors: 'event type (corporate pays more than social), budget sizes managed, geographic market, and whether the role is in-house vs. agency',
  },
  'Animal Care': {
    hiringCulture: 'credential and hands-on experience-driven hiring where veterinary certifications and animal handling skills are verified first',
    resumeFocus: 'veterinary certifications (RVT, CVT), animal handling experience, clinical procedures performed, and species expertise',
    formatAdvice: 'your veterinary technician certification or license, species experience, and clinical procedure proficiency listed at the top',
    lengthNote: 'One page is standard. Focus on your credentials, species experience, procedure proficiency, and clinical or practice management skills',
    uniqueSection: 'veterinary credentials (RVT, CVT, VTS), species expertise, and clinical procedure proficiency',
    salaryFactors: 'credential level, specialty area (emergency and critical care pay more), practice type (specialty hospital vs. general practice), and geographic location',
  },
  'Social Services': {
    hiringCulture: 'mission-driven hiring where licensure, caseload management, and client outcomes are primary evaluation criteria',
    resumeFocus: 'licensure (LCSW, LMSW), caseload sizes, client outcomes, and intervention methodologies',
    formatAdvice: 'your social work license, caseload scope, and client population experience prominently displayed — agencies verify licensure and population expertise first',
    lengthNote: 'One page for early-career professionals. Licensed clinical social workers with supervisory experience or specialized populations may use two pages',
    uniqueSection: 'social work licensure (LCSW, LMSW, LSW), client populations served, and evidence-based intervention methodologies',
    salaryFactors: 'licensure level, setting (hospital social workers earn more than agency), clinical vs. macro practice, and geographic location',
  },
  Security: {
    hiringCulture: 'certification and clearance-first hiring where security licenses, background checks, and training records are mandatory',
    resumeFocus: 'security certifications and licenses, clearance level, patrol/monitoring experience, and incident response record',
    formatAdvice: 'your security license, certifications (CPP, PSP), and any security clearance prominently at the top — employers verify these before reviewing experience',
    lengthNote: 'One page is standard. Focus on your license, certifications, patrol scope, and incident handling record',
    uniqueSection: 'security license, clearance level, and specific security systems or technologies operated (CCTV, access control, alarm systems)',
    salaryFactors: 'security clearance level, specialization (cybersecurity vs. physical), facility type, armed vs. unarmed, and geographic market',
  },
  Legal: {
    hiringCulture: 'credential-driven hiring where attention to detail, legal knowledge, and document management precision are scrutinized',
    resumeFocus: 'legal software proficiency, case types supported, document management accuracy, and paralegal certification',
    formatAdvice: 'your paralegal certification or legal credentials, practice areas, and legal software proficiency (Westlaw, LexisNexis, Clio) displayed prominently',
    lengthNote: 'One page for paralegals and legal assistants. Senior paralegals or legal professionals with multiple practice area experience may use two',
    uniqueSection: 'paralegal certification, practice area expertise, and legal technology platforms',
    salaryFactors: 'practice area (corporate and IP pay more), firm size (BigLaw vs. boutique), geographic market, and certification level',
  },
  Insurance: {
    hiringCulture: 'license-first hiring where state insurance licenses, product knowledge, and sales or claims metrics are primary qualifiers',
    resumeFocus: 'insurance licenses, product lines handled, policy volume or claims processed, and customer retention metrics',
    formatAdvice: 'your insurance license types and states prominently at the top — carriers and agencies verify active licensure before proceeding',
    lengthNote: 'One page is standard. Include your license details, product line experience, sales or claims volume, and customer satisfaction metrics',
    uniqueSection: 'insurance license types (P&C, Life & Health), product specialization, and book of business size',
    salaryFactors: 'license type, product specialization, commission structure, book of business size, and geographic market',
  },
  Consulting: {
    hiringCulture: 'case-study and impact-driven hiring where analytical skills, client management, and project outcomes are evaluated rigorously',
    resumeFocus: 'client impact metrics, project scope and outcomes, analytical methodologies, and industry expertise',
    formatAdvice: 'project-based experience sections showing client (anonymized if needed), challenge, approach, and quantified outcome — consulting firms evaluate your impact methodology',
    lengthNote: 'One page for analysts and associates. Senior consultants and managers with extensive client portfolios may use two pages',
    uniqueSection: 'project case studies with quantified outcomes, industry specializations, and analytical frameworks used',
    salaryFactors: 'firm tier (MBB vs. boutique), specialization, degree and MBA status, and project travel requirements',
  },
  'Entry-Level': {
    hiringCulture: 'potential-focused hiring where education, internships, projects, and transferable skills matter more than years of experience',
    resumeFocus: 'education, internships, projects, volunteer work, and transferable skills from academic or part-time experience',
    formatAdvice: 'your education and relevant coursework near the top, followed by internships, projects, and transferable skills — employers hiring entry-level candidates expect limited professional experience',
    lengthNote: 'One page only. Entry-level resumes should never exceed one page — focus on your strongest qualifications and most relevant experiences',
    uniqueSection: 'relevant coursework, academic projects, internships, and extracurricular leadership roles',
    salaryFactors: 'degree field, internship experience, geographic market, and industry demand for entry-level talent',
  },
  'Law Enforcement': {
    hiringCulture: 'background investigation-driven hiring where physical fitness, academy training, and clean records are mandatory prerequisites',
    resumeFocus: 'academy training, certifications (POST), physical fitness test results, patrol experience, and community engagement',
    formatAdvice: 'your POST certification, academy completion, and any specialized training (crisis intervention, de-escalation, firearms) listed prominently',
    lengthNote: 'One page is standard. Focus on certifications, training, patrol scope, and community engagement initiatives',
    uniqueSection: 'POST certification, academy details, specialized training, and community policing achievements',
    salaryFactors: 'department size, geographic location, rank, specialized unit assignment, and overtime/off-duty opportunities',
  },
};

// Fallback for unmapped categories
const DEFAULT_CONTEXT = {
  hiringCulture: 'skills and experience-driven hiring where relevant qualifications and measurable results determine candidacy',
  resumeFocus: 'relevant qualifications, measurable achievements, and skills that directly match the job requirements',
  formatAdvice: 'your most relevant qualifications and strongest achievements near the top where hiring managers will see them first',
  lengthNote: 'One page for most professionals. Those with 10+ years of directly relevant experience may extend to two pages',
  uniqueSection: 'industry-specific certifications, measurable achievements, and relevant technical tools',
  salaryFactors: 'experience level, specialization, industry demand, geographic location, and company size',
};

// ─── FAQ Answer Generators ──────────────────────────────────────────────

function getContext(category) {
  return CATEGORY_CONTEXT[category] || DEFAULT_CONTEXT;
}

function topSkills(keySkills, count = 3) {
  return keySkills.slice(0, count).join(', ');
}

function allSkills(keySkills) {
  if (keySkills.length <= 3) return keySkills.join(', ');
  const last = keySkills[keySkills.length - 1];
  const rest = keySkills.slice(0, -1).join(', ');
  return `${rest}, and ${last}`;
}

function generateQ1(jobTitle, keySkills, category) {
  const ctx = getContext(category);
  const top3 = topSkills(keySkills, 3);
  const top5 = topSkills(keySkills, 5);

  // Vary the answer structure based on category hash
  const hash = category.length + jobTitle.length;

  if (hash % 3 === 0) {
    return `For a ${jobTitle} resume, prioritize skills that match both the job description and ${ctx.hiringCulture}. Core competencies like ${top3} should appear in a dedicated skills section. Beyond technical abilities, include industry-specific tools and platforms you have hands-on experience with. Review each job posting carefully — the exact skill terminology the employer uses is what their ATS will scan for.`;
  } else if (hash % 3 === 1) {
    return `The strongest ${jobTitle} resumes feature a mix of technical and applied skills relevant to ${ctx.resumeFocus}. Start with ${top5}, then add any specialized certifications or tools specific to your experience. Arrange skills by relevance to the target role rather than alphabetically, and mirror the language from the job posting to improve ATS match rates.`;
  } else {
    return `${jobTitle} hiring managers evaluate candidates on ${ctx.resumeFocus}. Your skills section should lead with ${top3} and include additional competencies that demonstrate your range within the field. Group related skills together rather than listing them randomly, and always prioritize skills mentioned in the specific job description you are applying for.`;
  }
}

function generateQ2(jobTitle, category) {
  const ctx = getContext(category);
  return `${ctx.lengthNote}. For ${jobTitle} positions specifically, focus on depth over breadth — detailed accomplishments with measurable outcomes in your most relevant roles are more valuable than brief mentions of every position you have held.`;
}

function generateQ3(jobTitle, category) {
  const ctx = getContext(category);
  const hash = (category.length * 3 + jobTitle.length) % 4;

  if (hash === 0) {
    return `Most ${jobTitle} candidates should use a reverse-chronological format, which puts your most recent and relevant experience first. This works well in ${ctx.hiringCulture} because it shows career progression. Place ${ctx.formatAdvice}. If you are transitioning from a different field, a combination format that leads with transferable skills can bridge the gap.`;
  } else if (hash === 1) {
    return `A reverse-chronological format is the standard for ${jobTitle} roles because hiring managers want to see your current skills and recent accomplishments first. Include ${ctx.formatAdvice}. Save as a PDF to preserve formatting across platforms, and keep section headers standard (Experience, Skills, Education) so applicant tracking systems can parse your content correctly.`;
  } else if (hash === 2) {
    return `For ${jobTitle} applications, the reverse-chronological format performs best in ${ctx.hiringCulture}. What sets strong resumes apart in this field is ${ctx.formatAdvice}. Avoid creative formatting that might fail ATS parsing — clean structure with clear sections and consistent formatting signals professionalism.`;
  } else {
    return `The ideal ${jobTitle} resume uses a reverse-chronological layout showcasing your most recent role first. Since this field involves ${ctx.hiringCulture}, make sure to include ${ctx.formatAdvice}. Use a single-column layout with standard fonts to ensure compatibility with applicant tracking systems.`;
  }
}

function generateQ4(jobTitle, avgSalary, jobGrowth, category) {
  const ctx = getContext(category);
  const salary = avgSalary || 'varies by experience and location';
  const growth = jobGrowth || 'stable';

  return `${jobTitle} professionals earn an average of ${salary}, with ${growth} projected job growth. Compensation varies significantly based on ${ctx.salaryFactors}. To position yourself for higher compensation, emphasize quantifiable achievements on your resume that demonstrate the value you deliver — hiring managers use specific accomplishments to justify above-average offers.`;
}

function generateQ5(jobTitle, keySkills, category) {
  const ctx = getContext(category);
  const top3 = topSkills(keySkills, 3);

  const hash = (jobTitle.length + category.length * 2) % 3;

  if (hash === 0) {
    return `A competitive ${jobTitle} resume should open with a professional summary highlighting your strongest qualifications, followed by ${ctx.uniqueSection}. Include a skills section covering ${top3} and other relevant competencies. Your work experience should emphasize achievements with specific metrics rather than listing daily responsibilities. Add education, relevant certifications, and any additional sections that demonstrate your expertise in this specific area.`;
  } else if (hash === 1) {
    return `Build your ${jobTitle} resume around these sections: a targeted professional summary, a skills section featuring ${top3}, detailed work experience with quantified results, and ${ctx.uniqueSection}. Education and certifications should follow. The most important element across all sections is specificity — name the tools you used, the scale you operated at, and the outcomes you achieved rather than describing generic responsibilities.`;
  } else {
    return `An effective ${jobTitle} resume combines a concise professional summary with ${ctx.uniqueSection}, a skills section highlighting ${top3}, and achievement-driven work experience entries. Since this field involves ${ctx.hiringCulture}, tailor every section to the specific position. Include education and certifications relevant to the role, and customize your resume for each application by matching the terminology in the job posting.`;
  }
}

// ─── Main Script ────────────────────────────────────────────────────────

function processFile(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  const jobTitle = data.jobTitle || 'Professional';
  const keySkills = data.keySkills || [];
  const category = data.category || 'General';
  const avgSalary = data.avgSalary || '';
  const jobGrowth = data.jobGrowth || '';

  // Generate new FAQ answers
  const newFaq = [
    {
      question: `What skills should I put on a ${jobTitle} resume?`,
      answer: generateQ1(jobTitle, keySkills, category),
    },
    {
      question: `How long should a ${jobTitle} resume be?`,
      answer: generateQ2(jobTitle, category),
    },
    {
      question: `What is the best resume format for a ${jobTitle}?`,
      answer: generateQ3(jobTitle, category),
    },
    {
      question: `How much does a ${jobTitle} make?`,
      answer: generateQ4(jobTitle, avgSalary, jobGrowth, category),
    },
    {
      question: `What should I include in my ${jobTitle} resume?`,
      answer: generateQ5(jobTitle, keySkills, category),
    },
  ];

  // Update frontmatter
  data.faq = newFaq;

  // Rebuild file
  const newFileContent = matter.stringify(content, data);
  fs.writeFileSync(filePath, newFileContent, 'utf-8');

  return { file: path.basename(filePath), jobTitle, category };
}

// Run
const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.mdx'));
console.log(`Processing ${files.length} resume example files...\n`);

let processed = 0;
const categoryCounts = {};

for (const file of files) {
  const filePath = path.join(CONTENT_DIR, file);
  const result = processFile(filePath);
  categoryCounts[result.category] = (categoryCounts[result.category] || 0) + 1;
  processed++;
}

console.log(`\n✅ Rewrote FAQ answers for ${processed} pages.\n`);
console.log('By category:');
Object.entries(categoryCounts)
  .sort((a, b) => b[1] - a[1])
  .forEach(([cat, count]) => console.log(`  ${cat}: ${count} pages`));

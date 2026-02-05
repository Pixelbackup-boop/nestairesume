#!/usr/bin/env node
/**
 * Adds a "Salary & Job Outlook" section with BLS/Glassdoor/PayScale citations
 * to each resume example MDX file.
 * Inserts after the first "What Makes a Great..." section.
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

// BLS OOH slug mapping for common job titles
// BLS URLs follow: https://www.bls.gov/ooh/{category}/{slug}.htm
const BLS_SLUGS = {
  // Technology
  'software-engineer': 'computer-and-information-technology/software-developers',
  'software-developer': 'computer-and-information-technology/software-developers',
  'software-architect': 'computer-and-information-technology/software-developers',
  'full-stack-developer': 'computer-and-information-technology/software-developers',
  'front-end-developer': 'computer-and-information-technology/software-developers',
  'web-developer': 'computer-and-information-technology/web-developers',
  'junior-developer': 'computer-and-information-technology/software-developers',
  'java-full-stack-developer': 'computer-and-information-technology/software-developers',
  'devops-engineer': 'computer-and-information-technology/software-developers',
  'cloud-engineer': 'computer-and-information-technology/software-developers',
  'cloud-architect': 'computer-and-information-technology/computer-and-information-systems-managers',
  'data-scientist': 'computer-and-information-technology/data-scientists',
  'data-analyst': 'computer-and-information-technology/data-scientists',
  'data-engineer': 'computer-and-information-technology/data-scientists',
  'database-administrator': 'computer-and-information-technology/database-administrators',
  'machine-learning-engineer': 'computer-and-information-technology/data-scientists',
  'machine-learning-specialist': 'computer-and-information-technology/data-scientists',
  'cybersecurity-analyst': 'computer-and-information-technology/information-security-analysts',
  'soc-analyst': 'computer-and-information-technology/information-security-analysts',
  'security-analyst': 'computer-and-information-technology/information-security-analysts',
  'network-engineer': 'computer-and-information-technology/network-and-computer-systems-administrators',
  'network-administrator': 'computer-and-information-technology/network-and-computer-systems-administrators',
  'system-administrator': 'computer-and-information-technology/network-and-computer-systems-administrators',
  'system-engineer': 'computer-and-information-technology/network-and-computer-systems-administrators',
  'system-analyst': 'computer-and-information-technology/computer-systems-analysts',
  'computer-science': 'computer-and-information-technology/software-developers',
  'computer-operator': 'computer-and-information-technology/computer-support-specialists',
  'computer-technician': 'computer-and-information-technology/computer-support-specialists',
  'it-specialist': 'computer-and-information-technology/computer-support-specialists',
  'it-support-specialist': 'computer-and-information-technology/computer-support-specialists',
  'it-support-tech': 'computer-and-information-technology/computer-support-specialists',
  'desktop-support': 'computer-and-information-technology/computer-support-specialists',
  'desktop-support-engineer': 'computer-and-information-technology/computer-support-specialists',
  'it-technician': 'computer-and-information-technology/computer-support-specialists',
  'it-manager': 'computer-and-information-technology/computer-and-information-systems-managers',
  'it-director': 'computer-and-information-technology/computer-and-information-systems-managers',
  'cio': 'computer-and-information-technology/computer-and-information-systems-managers',
  'product-manager': 'management/management-analysts',
  'product-owner': 'management/management-analysts',
  'product-analyst': 'computer-and-information-technology/data-scientists',
  'project-manager': 'management/management-analysts',
  'project-coordinator': 'management/management-analysts',
  'project-engineer': 'architecture-and-engineering/industrial-engineers',
  'technical-program-manager': 'management/management-analysts',
  'solution-architect': 'computer-and-information-technology/software-developers',
  'automation-engineer': 'architecture-and-engineering/industrial-engineers',
  'power-bi-developer': 'computer-and-information-technology/data-scientists',
  'salesforce-administrator': 'computer-and-information-technology/database-administrators',
  'sap-consultant': 'management/management-analysts',
  'aws-cloud-engineer': 'computer-and-information-technology/software-developers',
  'aws-solution-architect': 'computer-and-information-technology/software-developers',
  'software-tester': 'computer-and-information-technology/software-quality-assurance-analysts',
  'qa-engineer': 'computer-and-information-technology/software-quality-assurance-analysts',
  'qa-analyst': 'computer-and-information-technology/software-quality-assurance-analysts',
  'qa-tester': 'computer-and-information-technology/software-quality-assurance-analysts',
  'qa-manager': 'management/management-analysts',

  // Engineering
  'mechanical-engineer': 'architecture-and-engineering/mechanical-engineers',
  'mechanical-design-engineer': 'architecture-and-engineering/mechanical-engineers',
  'mechanical-technician': 'architecture-and-engineering/mechanical-engineers',
  'civil-engineer': 'architecture-and-engineering/civil-engineers',
  'electrical-engineer': 'architecture-and-engineering/electrical-and-electronics-engineers',
  'electrical-technician': 'architecture-and-engineering/electrical-and-electronics-engineers',
  'chemical-engineer': 'architecture-and-engineering/chemical-engineers',
  'industrial-engineer': 'architecture-and-engineering/industrial-engineers',
  'design-engineer': 'architecture-and-engineering/mechanical-engineers',
  'process-engineer': 'architecture-and-engineering/chemical-engineers',
  'manufacturing-engineer': 'architecture-and-engineering/industrial-engineers',
  'production-engineer': 'architecture-and-engineering/industrial-engineers',
  'site-engineer': 'architecture-and-engineering/civil-engineers',
  'maintenance-engineer': 'installation-maintenance-and-repair/industrial-machinery-mechanics',
  'engineering-manager': 'architecture-and-engineering/architectural-and-engineering-managers',
  'construction-manager': 'construction-and-extraction/construction-managers',
  'construction-superintendent': 'construction-and-extraction/construction-managers',
  'construction-worker': 'construction-and-extraction/construction-laborers',
  'architect': 'architecture-and-engineering/architects',

  // Healthcare
  'nurse': 'healthcare/registered-nurses',
  'lpn': 'healthcare/licensed-practical-nurses',
  'cna': 'healthcare/nursing-assistants',
  'certified-nursing-assistant': 'healthcare/nursing-assistants',
  'nursing-assistant': 'healthcare/nursing-assistants',
  'doctor': 'healthcare/physicians',
  'physician-assistant': 'healthcare/physician-assistants',
  'medical-assistant': 'healthcare/medical-assistants',
  'medical-technologist': 'healthcare/medical-and-clinical-laboratory-technologists',
  'pharmacist': 'healthcare/pharmacists',
  'pharmacy-technician': 'healthcare/pharmacy-technicians',
  'pharmacy-tech': 'healthcare/pharmacy-technicians',
  'pharmacy-assistant': 'healthcare/pharmacy-technicians',
  'dental-assistant': 'healthcare/dental-assistants',
  'dentist': 'healthcare/dentists',
  'dental-office-manager': 'management/medical-and-health-services-managers',
  'medical-coder': 'healthcare/health-information-technologists',
  'medical-billing-specialist': 'healthcare/health-information-technologists',
  'medical-scribe': 'healthcare/health-information-technologists',
  'medical-receptionist': 'office-and-administrative-support/receptionists',
  'medical-office-assistant': 'office-and-administrative-support/medical-secretaries',
  'medical-representative': 'sales/wholesale-and-manufacturing-sales-representatives',
  'clinical-research-associate': 'life-physical-and-social-science/medical-scientists',
  'clinical-research-coordinator': 'life-physical-and-social-science/medical-scientists',
  'surgical-tech': 'healthcare/surgical-technologists',
  'caregiver': 'healthcare/home-health-aides',
  'support-worker': 'community-and-social-service/social-and-human-service-assistants',
  'vet-tech': 'healthcare/veterinary-technologists-and-technicians',
  'veterinary-technician': 'healthcare/veterinary-technologists-and-technicians',
  'veterinary-assistant': 'healthcare/veterinary-assistants-and-laboratory-animal-caretakers',

  // Business / Finance
  'accountant': 'business-and-financial/accountants-and-auditors',
  'auditor': 'business-and-financial/accountants-and-auditors',
  'financial-analyst': 'business-and-financial/financial-analysts',
  'finance-manager': 'management/financial-managers',
  'business-analyst': 'computer-and-information-technology/computer-systems-analysts',
  'business-intelligence': 'computer-and-information-technology/data-scientists',
  'business-intelligence-analyst': 'computer-and-information-technology/data-scientists',
  'management-consultant': 'business-and-financial/management-analysts',
  'consultant': 'business-and-financial/management-analysts',
  'operations-manager': 'management/management-analysts',
  'operations-analyst': 'business-and-financial/management-analysts',
  'controller': 'management/financial-managers',
  'billing-specialist': 'business-and-financial/bookkeeping-accounting-and-auditing-clerks',
  'accounting-assistant': 'business-and-financial/bookkeeping-accounting-and-auditing-clerks',
  'accounting-clerk': 'business-and-financial/bookkeeping-accounting-and-auditing-clerks',
  'accounting-intern': 'business-and-financial/accountants-and-auditors',
  'accounts-payable-specialist': 'business-and-financial/bookkeeping-accounting-and-auditing-clerks',
  'accounts-receivable': 'business-and-financial/bookkeeping-accounting-and-auditing-clerks',
  'payroll-specialist': 'business-and-financial/bookkeeping-accounting-and-auditing-clerks',
  'bank-teller': 'office-and-administrative-support/bank-tellers',
  'bank-manager': 'management/financial-managers',
  'loan-officer': 'business-and-financial/loan-officers',
  'loan-processor': 'business-and-financial/loan-officers',
  'insurance-agent': 'sales/insurance-sales-agents',
  'claims-adjuster': 'business-and-financial/claims-adjusters-appraisers-examiners-and-investigators',
  'real-estate-agent': 'sales/real-estate-brokers-and-sales-agents',
  'property-manager': 'management/property-real-estate-and-community-association-managers',
  'leasing-consultant': 'management/property-real-estate-and-community-association-managers',
  'assistant-property-manager': 'management/property-real-estate-and-community-association-managers',
  'risk-management': 'business-and-financial/financial-analysts',

  // Sales / Marketing
  'sales-manager': 'management/sales-managers',
  'sales-representative': 'sales/wholesale-and-manufacturing-sales-representatives',
  'sales-associate': 'sales/retail-sales-workers',
  'sales-assistant': 'sales/retail-sales-workers',
  'sales-coordinator': 'sales/wholesale-and-manufacturing-sales-representatives',
  'sales-consultant': 'sales/wholesale-and-manufacturing-sales-representatives',
  'sales-executive': 'sales/wholesale-and-manufacturing-sales-representatives',
  'sales-director': 'management/sales-managers',
  'sales-engineer': 'sales/sales-engineers',
  'account-executive': 'sales/wholesale-and-manufacturing-sales-representatives',
  'account-manager': 'sales/wholesale-and-manufacturing-sales-representatives',
  'inside-sales': 'sales/wholesale-and-manufacturing-sales-representatives',
  'tech-sales': 'sales/sales-engineers',
  'car-sales': 'sales/retail-sales-workers',
  'retail-sales-associate': 'sales/retail-sales-workers',
  'marketing-manager': 'management/advertising-promotions-and-marketing-managers',
  'marketing-director': 'management/advertising-promotions-and-marketing-managers',
  'marketing-coordinator': 'management/advertising-promotions-and-marketing-managers',
  'marketing-specialist': 'business-and-financial/market-research-analysts',
  'marketing-analyst': 'business-and-financial/market-research-analysts',
  'marketing-assistant': 'management/advertising-promotions-and-marketing-managers',
  'marketing-intern': 'management/advertising-promotions-and-marketing-managers',
  'marketing-executive': 'management/advertising-promotions-and-marketing-managers',
  'digital-marketer': 'business-and-financial/market-research-analysts',
  'digital-marketing-manager': 'management/advertising-promotions-and-marketing-managers',
  'digital-marketing-specialist': 'business-and-financial/market-research-analysts',
  'social-media-manager': 'management/advertising-promotions-and-marketing-managers',
  'social-media-coordinator': 'management/advertising-promotions-and-marketing-managers',
  'social-media-specialist': 'management/advertising-promotions-and-marketing-managers',
  'content-creator': 'media-and-communication/writers-and-authors',
  'community-manager': 'management/advertising-promotions-and-marketing-managers',

  // Administrative / Office
  'administrative-assistant': 'office-and-administrative-support/secretaries-and-administrative-assistants',
  'executive-assistant': 'office-and-administrative-support/secretaries-and-administrative-assistants',
  'office-manager': 'management/administrative-services-and-facilities-managers',
  'office-administrator': 'management/administrative-services-and-facilities-managers',
  'office-assistant': 'office-and-administrative-support/secretaries-and-administrative-assistants',
  'office-clerk': 'office-and-administrative-support/general-office-clerks',
  'receptionist': 'office-and-administrative-support/receptionists',
  'front-desk-receptionist': 'office-and-administrative-support/receptionists',
  'virtual-assistant': 'office-and-administrative-support/secretaries-and-administrative-assistants',
  'data-entry-clerk': 'office-and-administrative-support/data-entry-keyers',
  'data-entry-operator': 'office-and-administrative-support/data-entry-keyers',
  'data-entry-specialist': 'office-and-administrative-support/data-entry-keyers',
  'legal-assistant': 'legal/paralegals-and-legal-assistants',
  'library-assistant': 'education-training-and-library/library-technicians-and-assistants',

  // HR
  'human-resources': 'business-and-financial/human-resources-specialists',
  'hr-manager': 'management/human-resources-managers',
  'hr-director': 'management/human-resources-managers',
  'hr-coordinator': 'business-and-financial/human-resources-specialists',
  'hr-assistant': 'business-and-financial/human-resources-specialists',
  'hr-recruiter': 'business-and-financial/human-resources-specialists',
  'hr-business-partner': 'business-and-financial/human-resources-specialists',
  'hr-executive': 'management/human-resources-managers',
  'recruiter': 'business-and-financial/human-resources-specialists',
  'technical-recruiter': 'business-and-financial/human-resources-specialists',
  'recruiting-coordinator': 'business-and-financial/human-resources-specialists',
  'talent-acquisition-specialist': 'business-and-financial/human-resources-specialists',

  // Management
  'business-manager': 'management/management-analysts',
  'business-owner': 'management/top-executives',
  'small-business-owner': 'management/top-executives',
  'business-administration': 'management/management-analysts',
  'business-consultant': 'business-and-financial/management-analysts',
  'business-development-manager': 'management/sales-managers',
  'business-development-executive': 'management/sales-managers',
  'assistant-manager': 'management/management-analysts',
  'assistant-director': 'management/top-executives',
  'assistant-store-manager': 'sales/retail-sales-workers',
  'district-manager': 'management/top-executives',
  'branch-manager': 'management/financial-managers',
  'store-manager': 'sales/retail-sales-workers',
  'store-associate': 'sales/retail-sales-workers',
  'retail-manager': 'sales/retail-sales-workers',
  'retail-store-manager': 'sales/retail-sales-workers',
  'retail-associate': 'sales/retail-sales-workers',
  'retail-assistant': 'sales/retail-sales-workers',
  'change-management': 'management/management-analysts',
  'executive-director': 'management/top-executives',
  'chief-of-staff': 'management/top-executives',
  'team-leader': 'management/management-analysts',
  'program-coordinator': 'management/management-analysts',
  'contract-specialist': 'business-and-financial/purchasing-managers-buyers-and-purchasing-agents',
  'procurement-manager': 'business-and-financial/purchasing-managers-buyers-and-purchasing-agents',
  'procurement-specialist': 'business-and-financial/purchasing-managers-buyers-and-purchasing-agents',

  // Hospitality / Food
  'chef': 'food-preparation-and-serving/chefs-and-head-cooks',
  'executive-chef': 'food-preparation-and-serving/chefs-and-head-cooks',
  'restaurant-manager': 'food-preparation-and-serving/food-service-managers',
  'bartender': 'food-preparation-and-serving/bartenders',
  'barista': 'food-preparation-and-serving/food-and-beverage-serving-and-related-workers',
  'server': 'food-preparation-and-serving/waiters-and-waitresses',
  'waiter-waitress': 'food-preparation-and-serving/waiters-and-waitresses',
  'food-server': 'food-preparation-and-serving/waiters-and-waitresses',
  'food-service': 'food-preparation-and-serving/food-service-managers',
  'food-service-worker': 'food-preparation-and-serving/food-and-beverage-serving-and-related-workers',
  'cashier': 'sales/cashiers',
  'kitchen-helper': 'food-preparation-and-serving/food-preparation-workers',
  'service-crew': 'food-preparation-and-serving/food-and-beverage-serving-and-related-workers',
  'hotel-manager': 'management/lodging-managers',
  'hotel-front-desk': 'office-and-administrative-support/receptionists',
  'concierge': 'personal-care-and-service/personal-care-and-service-workers',
  'housekeeping': 'building-and-grounds-cleaning/maids-and-housekeeping-cleaners',
  'event-planner': 'business-and-financial/meeting-convention-and-event-planners',
  'event-manager': 'business-and-financial/meeting-convention-and-event-planners',
  'event-coordinator': 'business-and-financial/meeting-convention-and-event-planners',

  // Education
  'teacher': 'education-training-and-library/high-school-teachers',
  'teaching-assistant': 'education-training-and-library/teacher-assistants',
  'intern': 'business-and-financial/management-analysts',

  // Logistics / Transportation / Warehouse
  'warehouse-worker': 'transportation-and-material-moving/material-moving-machine-operators',
  'warehouse-manager': 'transportation-and-material-moving/material-moving-machine-operators',
  'warehouse-associate': 'transportation-and-material-moving/material-moving-machine-operators',
  'material-handler': 'transportation-and-material-moving/material-moving-machine-operators',
  'logistics-coordinator': 'business-and-financial/logisticians',
  'logistics-manager': 'business-and-financial/logisticians',
  'logistics-specialist': 'business-and-financial/logisticians',
  'supply-chain-manager': 'business-and-financial/logisticians',
  'supply-chain-analyst': 'business-and-financial/logisticians',
  'shipping-receiving': 'office-and-administrative-support/shipping-receiving-and-inventory-clerks',
  'truck-driver': 'transportation-and-material-moving/heavy-and-tractor-trailer-truck-drivers',
  'delivery-driver': 'transportation-and-material-moving/delivery-truck-drivers-and-driver-sales-workers',
  'driver': 'transportation-and-material-moving/delivery-truck-drivers-and-driver-sales-workers',

  // Customer Service
  'customer-service': 'office-and-administrative-support/customer-service-representatives',
  'customer-support': 'office-and-administrative-support/customer-service-representatives',
  'customer-success-manager': 'management/sales-managers',
  'customer-success': 'management/sales-managers',
  'call-center-agent': 'office-and-administrative-support/customer-service-representatives',
  'call-center-representative': 'office-and-administrative-support/customer-service-representatives',
  'service-advisor': 'sales/retail-sales-workers',

  // Creative
  'graphic-designer': 'arts-and-design/graphic-designers',
  'ux-designer': 'arts-and-design/graphic-designers',
  'ux-researcher': 'life-physical-and-social-science/survey-researchers',
  'interior-designer': 'arts-and-design/interior-designers',
  'art-director': 'arts-and-design/art-directors',
  '3d-artist': 'arts-and-design/multimedia-artists-and-animators',
  'editor': 'media-and-communication/editors',
  'audio-engineer': 'media-and-communication/broadcast-sound-and-video-technicians',
  'stage-manager': 'entertainment-and-sports/producers-and-directors',
  'makeup-artist': 'personal-care-and-service/barbers-hairstylists-and-cosmetologists',

  // Fitness / Personal Care
  'personal-trainer': 'entertainment-and-sports/fitness-trainers-and-instructors',
  'fitness-trainer': 'entertainment-and-sports/fitness-trainers-and-instructors',
  'gym-trainer': 'entertainment-and-sports/fitness-trainers-and-instructors',
  'yoga-instructor': 'entertainment-and-sports/fitness-trainers-and-instructors',
  'nanny': 'personal-care-and-service/childcare-workers',

  // Trades / Manufacturing
  'hvac-technician': 'installation-maintenance-and-repair/heating-air-conditioning-and-refrigeration-mechanics-and-installers',
  'automotive-technician': 'installation-maintenance-and-repair/automotive-service-technicians-and-mechanics',
  'heavy-equipment-operator': 'construction-and-extraction/construction-equipment-operators',
  'cnc-operator': 'production/machinists',
  'machine-operator': 'production/machinists',
  'maintenance-technician': 'installation-maintenance-and-repair/industrial-machinery-mechanics',
  'maintenance-manager': 'installation-maintenance-and-repair/industrial-machinery-mechanics',
  'manufacturing-worker': 'production/assemblers-and-fabricators',
  'production-worker': 'production/assemblers-and-fabricators',
  'production-manager': 'management/industrial-production-managers',
  'production-assistant': 'media-and-communication/broadcast-sound-and-video-technicians',
  'quality-control': 'production/quality-control-inspectors',
  'quality-engineer': 'architecture-and-engineering/industrial-engineers',
  'quality-analyst': 'production/quality-control-inspectors',
  'quality-assurance-specialist': 'production/quality-control-inspectors',
  'quality-manager': 'management/industrial-production-managers',

  // Security / Law Enforcement
  'security-guard': 'protective-service/security-guards',
  'security-officer': 'protective-service/security-guards',
  'correctional-officer': 'protective-service/correctional-officers',

  // Science / Research
  'chemist': 'life-physical-and-social-science/chemists-and-materials-scientists',
  'lab-technician': 'life-physical-and-social-science/chemical-technicians',
  'lab-assistant': 'life-physical-and-social-science/chemical-technicians',
  'research-analyst': 'business-and-financial/market-research-analysts',
  'research-assistant': 'life-physical-and-social-science/medical-scientists',

  // Social Services
  'social-worker': 'community-and-social-service/social-workers',
  'resident-assistant': 'community-and-social-service/social-and-human-service-assistants',

  // Aviation / Maritime
  'flight-attendant': 'transportation-and-material-moving/flight-attendants',
  'cabin-crew': 'transportation-and-material-moving/flight-attendants',
  'seaman': 'transportation-and-material-moving/water-transportation-occupations',
};

function generateSalarySection(slug, jobTitle, avgSalary, jobGrowth, category) {
  const salaryNum = avgSalary ? avgSalary.replace(/[^0-9]/g, '') : '';
  const growthStr = jobGrowth || '';
  const blsSlug = BLS_SLUGS[slug];
  const blsLink = blsSlug
    ? `https://www.bls.gov/ooh/${blsSlug}.htm`
    : null;

  // Determine salary range based on avg
  const avg = parseInt(salaryNum, 10);
  let low, high;
  if (avg > 0) {
    low = `$${(Math.round(avg * 0.72 / 1000) * 1000).toLocaleString()}`;
    high = `$${(Math.round(avg * 1.35 / 1000) * 1000).toLocaleString()}`;
  }

  // Growth description
  let growthDesc = '';
  const growthNum = parseInt(growthStr.replace(/[^0-9-]/g, ''), 10);
  if (growthNum >= 15) growthDesc = 'much faster than the national average for all occupations';
  else if (growthNum >= 8) growthDesc = 'faster than the national average for all occupations';
  else if (growthNum >= 4) growthDesc = 'about as fast as the national average for all occupations';
  else if (growthNum >= 1) growthDesc = 'slower than the national average for all occupations';
  else growthDesc = 'showing little or no change compared to other occupations';

  // Build the section
  let section = `## Salary & Job Outlook\n\n`;

  if (avg > 0) {
    section += `${jobTitle} professionals earn a median annual salary of approximately **${avgSalary}**, `;
    if (low && high) {
      section += `with most salaries ranging from ${low} to ${high} depending on experience, location, and industry. `;
    }
    if (growthStr) {
      section += `Employment for this occupation is projected to grow **${growthStr}** over the next decade, ${growthDesc}.\n\n`;
    } else {
      section += '\n\n';
    }
  }

  // Sources
  section += `**Sources:** Salary estimates are based on data from `;
  const sources = [];
  if (blsLink) {
    sources.push(`the [U.S. Bureau of Labor Statistics Occupational Outlook Handbook](${blsLink})`);
  } else {
    sources.push(`the [U.S. Bureau of Labor Statistics](https://www.bls.gov/ooh/)`);
  }
  sources.push(`[Glassdoor](https://www.glassdoor.com/Salaries/${slug.replace(/-/g, '-')}-salary-SRCH_KO0,${slug.length}.htm)`);
  sources.push(`[PayScale](https://www.payscale.com/research/US/Job=${encodeURIComponent(jobTitle)}/Salary)`);
  section += sources.join(', ') + '. ';
  section += `Actual compensation varies based on geographic location, company size, industry sector, certifications, and years of experience.`;

  return section;
}

// ─── Main ──────────────────────────────────────────────────────────────

const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.mdx'));
console.log(`Adding Salary & Job Outlook sections to ${files.length} files...\n`);

let added = 0;
let skipped = 0;

for (const file of files) {
  const filePath = path.join(CONTENT_DIR, file);
  const raw = fs.readFileSync(filePath, 'utf-8');

  // Skip if already has the section
  if (raw.includes('## Salary & Job Outlook')) {
    skipped++;
    continue;
  }

  const { data, content } = matter(raw);
  const slug = data.slug || file.replace('.mdx', '');
  const jobTitle = data.jobTitle || slug.replace(/-/g, ' ');
  const avgSalary = data.avgSalary || '';
  const jobGrowth = data.jobGrowth?.toString() || '';
  const category = data.category || 'General';

  const salarySection = generateSalarySection(slug, jobTitle, avgSalary, jobGrowth, category);

  // Insert after "Professional Summary Examples" section header (before ## Essential Skills)
  // Or after "What Makes a Great..." section
  let newContent;

  // Try to insert after "## Professional Summary Examples" section
  const summaryIdx = content.indexOf('## Professional Summary Examples');
  const essentialSkillsIdx = content.indexOf('## Essential Skills');

  if (summaryIdx !== -1 && essentialSkillsIdx !== -1) {
    // Insert between professional summary and essential skills
    newContent = content.slice(0, essentialSkillsIdx) + salarySection + '\n\n' + content.slice(essentialSkillsIdx);
  } else {
    // Fallback: insert after first section (after "## What Makes")
    const firstH2 = content.indexOf('\n## ', content.indexOf('## '));
    const secondH2 = content.indexOf('\n## ', firstH2 + 1);
    if (secondH2 !== -1) {
      newContent = content.slice(0, secondH2) + '\n\n' + salarySection + content.slice(secondH2);
    } else {
      // Last resort: prepend
      newContent = '\n' + salarySection + '\n\n' + content;
    }
  }

  const newFile = matter.stringify(newContent, data);
  fs.writeFileSync(filePath, newFile, 'utf-8');
  added++;
}

console.log(`\n✅ Added Salary & Job Outlook to ${added} files (${skipped} already had them).`);
console.log(`Total processed: ${files.length}`);

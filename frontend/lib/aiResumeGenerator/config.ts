/**
 * AI Resume Generator Configuration
 */

import { JobCategory, OnboardingInput } from './types';

/**
 * Detect job category based on job title keywords
 */
export function detectJobCategory(jobTitle: string): JobCategory {
  const title = jobTitle.toLowerCase();

  if (
    /developer|engineer|programmer|software|devops|data scientist|data analyst|architect|backend|frontend|fullstack|machine learning|artificial intelligence/.test(
      title
    )
  ) {
    return 'tech';
  }
  if (/designer|ux|ui|graphic|creative|artist|visual/.test(title)) {
    return 'design';
  }
  if (/marketing|seo|content|social media|brand|growth|digital/.test(title)) {
    return 'marketing';
  }
  if (/accountant|finance|analyst|investment|banking|cfo|controller/.test(title)) {
    return 'finance';
  }
  if (/nurse|doctor|medical|healthcare|physician|therapist|clinical/.test(title)) {
    return 'healthcare';
  }
  if (/teacher|professor|instructor|educator|tutor|academic/.test(title)) {
    return 'education';
  }
  if (/sales|account executive|business development|representative/.test(title)) {
    return 'sales';
  }
  if (
    /waiter|waitress|server|bartender|barista|chef|cook|host|hostess|restaurant|food service|busser|dishwasher|catering|hospitality/.test(
      title
    )
  ) {
    return 'hospitality';
  }
  return 'general';
}

/**
 * Experience years based on level
 */
export const experienceYears: Record<OnboardingInput['experienceLevel'], number> = {
  entry: 1,
  mid: 4,
  senior: 8,
  executive: 15,
};

/**
 * Job-specific skill sets
 */
export const skillsByCategory: Record<JobCategory, string[]> = {
  tech: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'AWS', 'Docker', 'REST APIs'],
  design: [
    'Figma',
    'Adobe XD',
    'Sketch',
    'Photoshop',
    'Illustrator',
    'Prototyping',
    'User Research',
    'Wireframing',
    'Design Systems',
    'Typography',
  ],
  marketing: [
    'SEO',
    'Google Analytics',
    'Content Strategy',
    'Social Media',
    'Email Marketing',
    'PPC',
    'CRM',
    'Copywriting',
    'A/B Testing',
    'HubSpot',
  ],
  finance: [
    'Financial Analysis',
    'Excel',
    'QuickBooks',
    'SAP',
    'Budgeting',
    'Forecasting',
    'GAAP',
    'Auditing',
    'Risk Management',
    'Financial Modeling',
  ],
  healthcare: [
    'Patient Care',
    'EMR Systems',
    'HIPAA Compliance',
    'Clinical Assessment',
    'Care Planning',
    'Medical Terminology',
    'Patient Education',
    'Team Collaboration',
    'Documentation',
    'Critical Thinking',
  ],
  education: [
    'Curriculum Development',
    'Classroom Management',
    'Student Assessment',
    'Differentiated Instruction',
    'Educational Technology',
    'Lesson Planning',
    'Communication',
    'Mentoring',
    'Special Education',
    'Parent Relations',
  ],
  sales: [
    'CRM Software',
    'Lead Generation',
    'Negotiation',
    'Cold Calling',
    'Pipeline Management',
    'Salesforce',
    'Account Management',
    'Presentation Skills',
    'Closing Deals',
    'Client Relations',
  ],
  hospitality: [
    'Customer Service',
    'POS Systems',
    'Food Safety',
    'Cash Handling',
    'Menu Knowledge',
    'Team Collaboration',
    'Multitasking',
    'Communication',
    'Time Management',
    'Conflict Resolution',
  ],
  general: [
    'Project Management',
    'Communication',
    'Problem Solving',
    'Team Leadership',
    'Microsoft Office',
    'Time Management',
    'Critical Thinking',
    'Adaptability',
    'Collaboration',
    'Organization',
  ],
};

/**
 * Phone formats by locale
 */
export const phoneFormats: Record<string, string> = {
  en: '+1 (555) 000-0000',
  es: '+34 600 000 000',
  fr: '+33 6 00 00 00 00',
  de: '+49 170 0000000',
  ar: '+971 50 000 0000',
};

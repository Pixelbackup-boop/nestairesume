/**
 * AI Resume Generator Types
 */

export interface OnboardingInput {
  fullName: string;
  jobTitle: string;
  experienceLevel: 'entry' | 'mid' | 'senior' | 'executive';
  locale?: string; // 'en' | 'es' | 'fr' | 'de' | 'ar'
}

export type JobCategory =
  | 'tech'
  | 'design'
  | 'marketing'
  | 'finance'
  | 'healthcare'
  | 'education'
  | 'sales'
  | 'hospitality'
  | 'general';

export type LocaleData = {
  cities: string[];
  country: string;
  companies: Record<JobCategory, string[]>;
  degrees: Record<JobCategory, { degree: string; school: string }>;
  educationDescription: string;
  yearsText: (years: number) => string;
};

export type SummaryTemplates = Record<JobCategory, Record<OnboardingInput['experienceLevel'], string>>;

export type JobDescriptions = Record<JobCategory, string[][]>;

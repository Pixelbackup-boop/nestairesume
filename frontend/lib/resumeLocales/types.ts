/**
 * Shared types for resume locale data
 */

export type JobCategory = 'tech' | 'design' | 'marketing' | 'finance' | 'healthcare' | 'education' | 'sales' | 'hospitality' | 'general';

export type ExperienceLevel = 'entry' | 'mid' | 'senior' | 'executive';

export type LocaleData = {
    cities: string[];
    country: string;
    nationality: string;
    companies: Record<JobCategory, string[]>;
    degrees: Record<JobCategory, { degree: string; school: string }>;
    educationDescription: string;
    yearsText: (years: number) => string;
};

export type SummaryTemplates = Record<JobCategory, Record<ExperienceLevel, string | string[]>>;

export type JobDescriptions = Record<JobCategory, string[][]>;

export type TitlePrefixes = {
    senior: string;
    lead: string;
    director: string;
};

export type MasterDegree = {
    tech: string;
    business: string;
    school: string;
};

export type ProficiencyLabels = {
    native: string;
    fluent: string;
    intermediate: string;
};

export type LocaleLanguage = {
    name: string;
    proficiency: 'native' | 'fluent' | 'intermediate';
    level: number;
};

export interface LocaleBundle {
    localeData: LocaleData;
    summaryTemplates: SummaryTemplates;
    jobDescriptions: JobDescriptions;
    masterDegree: MasterDegree;
    phoneFormat: string;
    titlePrefixes: TitlePrefixes;
    skillNames: Record<JobCategory, string[]>;
    languages: LocaleLanguage[];
    interests: string[];
    strengths: string[];
    proficiencyLabels: ProficiencyLabels;
}

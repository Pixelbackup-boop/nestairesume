/**
 * AI Resume Generator Module
 *
 * Generates professional resume content based on user's name and job title.
 * Supports multiple locales (en, es, fr, de, ar).
 *
 * Usage:
 *   import { generateAIResume, generateSummaryOnly } from '@/lib/aiResumeGenerator';
 *
 * Split files:
 * - types.ts: Type definitions
 * - config.ts: Skills, job detection, experience years
 * - (main exports remain in parent file for now - can be further split later)
 */

// Re-export types
export type { OnboardingInput, JobCategory, LocaleData, SummaryTemplates, JobDescriptions } from './types';

// Re-export config utilities
export { detectJobCategory, experienceYears, skillsByCategory, phoneFormats } from './config';

// Re-export main generator functions from the parent file
// This maintains backward compatibility while the data is still in the original file
export { generateAIResume, generateAIResumeAsync, generateSummaryOnly } from '../aiResumeGenerator';

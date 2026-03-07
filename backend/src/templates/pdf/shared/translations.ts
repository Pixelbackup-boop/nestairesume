/**
 * Translation helpers for PDF template generation
 * Provides default English translations when frontend doesn't pass translations
 */

import { PdfTranslations } from '../../../types/pdf';

/**
 * Default English translations for backward compatibility
 * Used when frontend doesn't provide translations
 */
export const defaultTranslations: PdfTranslations = {
    sections: {
        experience: 'Experience',
        workExperience: 'Work Experience',
        education: 'Education',
        skills: 'Skills',
        languages: 'Languages',
        interests: 'Interests',
        strengths: 'Strengths',
        certifications: 'Certifications',
        awards: 'Awards',
        summary: 'Summary',
        profile: 'Profile',
        contact: 'Contact',
        additionalInfo: 'Additional Information',
        socialLinks: 'Social Links',
        personalDetails: 'Personal Details',
        credentials: 'Credentials',
    },
    labels: {
        present: 'Present',
        nationality: 'Nationality',
        id: 'ID Number',
        passport: 'Passport',
        drivingLicense: 'Driving License',
        native: 'Native',
        fluent: 'Fluent',
        advanced: 'Advanced',
        intermediate: 'Intermediate',
        basic: 'Basic',
    },
};

/**
 * Safely get translation value with fallback to default English
 * @param translations - Optional translations from frontend
 * @returns Complete translations object with defaults filled in
 */
export function getTranslations(translations?: PdfTranslations): PdfTranslations {
    if (!translations) {
        return defaultTranslations;
    }

    // Merge with defaults to ensure all keys exist
    return {
        sections: {
            ...defaultTranslations.sections,
            ...translations.sections,
        },
        labels: {
            ...defaultTranslations.labels,
            ...translations.labels,
        },
    };
}

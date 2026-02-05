"use strict";
/**
 * Translation helpers for PDF template generation
 * Provides default English translations when frontend doesn't pass translations
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultTranslations = void 0;
exports.getTranslations = getTranslations;
/**
 * Default English translations for backward compatibility
 * Used when frontend doesn't provide translations
 */
exports.defaultTranslations = {
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
        references: 'References',
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
    },
};
/**
 * Safely get translation value with fallback to default English
 * @param translations - Optional translations from frontend
 * @returns Complete translations object with defaults filled in
 */
function getTranslations(translations) {
    if (!translations) {
        return exports.defaultTranslations;
    }
    // Merge with defaults to ensure all keys exist
    return {
        sections: {
            ...exports.defaultTranslations.sections,
            ...translations.sections,
        },
        labels: {
            ...exports.defaultTranslations.labels,
            ...translations.labels,
        },
    };
}
//# sourceMappingURL=translations.js.map
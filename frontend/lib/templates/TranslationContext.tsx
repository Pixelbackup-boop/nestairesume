'use client';

import React, { createContext, useContext, ReactNode } from 'react';

/**
 * Translation strings for template section headers and labels
 * Mirrors PdfTranslations from pdfService.ts for consistency
 */
export interface TemplateTranslations {
    sections: {
        experience: string;
        workExperience: string;
        education: string;
        skills: string;
        languages: string;
        interests: string;
        strengths: string;
        certifications: string;
        awards: string;
        summary: string;
        profile: string;
        contact: string;
        additionalInfo: string;
        socialLinks: string;
        personalDetails: string;
        credentials: string;
    };
    labels: {
        present: string;
        nationality?: string;
        id?: string;
        passport?: string;
        drivingLicense?: string;
        native?: string;
        fluent?: string;
        advanced?: string;
        intermediate?: string;
        basic?: string;
        gpa?: string;
        activities?: string;
    };
    /** RTL direction support */
    isRtl?: boolean;
}

/**
 * Default English translations (fallback)
 */
export const defaultTranslations: TemplateTranslations = {
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
        gpa: 'GPA',
        activities: 'Activities',
    },
    isRtl: false,
};

const TranslationContext = createContext<TemplateTranslations>(defaultTranslations);

interface TranslationProviderProps {
    translations?: TemplateTranslations;
    children: ReactNode;
}

/**
 * Provider to wrap template components with translations
 */
export function TranslationProvider({ translations, children }: TranslationProviderProps) {
    // Merge provided translations with defaults to ensure all keys exist
    const mergedTranslations: TemplateTranslations = translations
        ? {
            sections: { ...defaultTranslations.sections, ...translations.sections },
            labels: { ...defaultTranslations.labels, ...translations.labels },
            isRtl: translations.isRtl ?? defaultTranslations.isRtl,
        }
        : defaultTranslations;

    return (
        <TranslationContext.Provider value={mergedTranslations}>
            {children}
        </TranslationContext.Provider>
    );
}

/**
 * Hook to access translations in template components
 * Returns translations object with sections and labels
 *
 * @example
 * const t = useTemplateTranslations();
 * <SectionHeader>{t.sections.experience}</SectionHeader>
 */
export function useTemplateTranslations(): TemplateTranslations {
    return useContext(TranslationContext);
}

/**
 * PDF Generation Service
 * Connects frontend to backend Puppeteer PDF generation API
 */

import api from './api';
import { getThemeById, ThemeColor } from './templates/builder/colorPresets';
import type { ResumeData } from '@/store/useResumeStore';

/**
 * Translation strings for PDF section headers and labels
 * Matches backend PdfTranslations interface
 */
export interface PdfTranslations {
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
        references: string;
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
    };
}

// Known backend template IDs (must exist in backend/src/templates/pdf/index.ts)
const knownTemplates = new Set([
    // Sidebar templates
    'sidebar-dark-navy', 'sidebar-narrow-yellow', 'sidebar-monogram',
    // Header templates
    'header-dark', 'header-dark-banner', 'header-dark-box',
    'header-diagonal-yellow', 'header-ribbon-yellow', 'header-decorative',
    'header-geometric', 'header-icon-sections', 'header-icon-orange', 'header-blue-clean',
    // Classic templates
    'classic-professional', 'classic-pro',
    // Minimal templates
    'minimal-timeline', 'minimal-labels-tan', 'minimal-blue-sections',
    // Legacy layout aliases (backend handles these)
    'classic', 'sidebar', 'header', 'minimal',
]);

// Get backend template ID from frontend template
function getBackendTemplateId(frontendTemplate: string): string {
    // If template ID is already known to backend, pass it through directly
    if (knownTemplates.has(frontendTemplate)) {
        return frontendTemplate;
    }

    // Handle layout config IDs like "classic-normal-left" - extract base layout
    // Backend has legacy aliases: 'sidebar' -> sidebar-dark-navy, 'header' -> header-dark, etc.
    const baseLayout = frontendTemplate.split('-')[0];
    if (knownTemplates.has(baseLayout)) {
        return baseLayout;
    }

    // Final fallback
    return 'classic-professional';
}

/**
 * Generate and download a PDF resume
 *
 * @param resumeData - The resume data from the store
 * @param templateId - Frontend template ID (e.g., 'sidebar', 'classic-normal-left')
 * @param themeId - Theme ID (e.g., 'navy', 'emerald', 'custom')
 * @param customColor - Custom color hex (required when themeId is 'custom')
 * @param translations - Optional translations for section headers (for i18n support)
 * @param locale - Locale for date formatting (e.g., 'en', 'es', 'fr')
 */
export async function downloadPdf(
    resumeData: ResumeData,
    templateId: string,
    themeId: string,
    customColor?: string,
    translations?: PdfTranslations,
    locale?: string
): Promise<void> {
    // Get theme colors
    const theme: ThemeColor = getThemeById(themeId, customColor);

    // Get backend template ID
    const backendTemplateId = getBackendTemplateId(templateId);

    // Call backend API
    const response = await api.post('/pdf/generate', {
        data: resumeData,
        templateId: backendTemplateId,
        theme: {
            name: theme.name,
            primary: theme.primary,
            secondary: theme.secondary,
            accent: theme.accent,
            text: theme.text,
            background: theme.background,
            heading: theme.heading,
        },
        translations,
        locale: locale || 'en',
    }, {
        responseType: 'blob',
    });

    // Create download link
    const blob = new Blob([response.data as BlobPart], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    // Generate filename from name
    const name = resumeData.personalInfo?.fullName || 'resume';
    const sanitizedName = name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    const filename = `${sanitizedName}_resume.pdf`;

    // Trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Cleanup
    URL.revokeObjectURL(url);
}

/**
 * Generate PDF and return as base64 (for preview purposes)
 *
 * @param locale - Locale for date formatting (e.g., 'en', 'es', 'fr')
 */
export async function previewPdf(
    resumeData: ResumeData,
    templateId: string,
    themeId: string,
    customColor?: string,
    translations?: PdfTranslations,
    locale?: string
): Promise<string> {
    const theme: ThemeColor = getThemeById(themeId, customColor);
    const backendTemplateId = getBackendTemplateId(templateId);

    const response = await api.post('/pdf/preview', {
        data: resumeData,
        templateId: backendTemplateId,
        theme: {
            name: theme.name,
            primary: theme.primary,
            secondary: theme.secondary,
            accent: theme.accent,
            text: theme.text,
            background: theme.background,
            heading: theme.heading,
        },
        translations,
        locale: locale || 'en',
    });

    return (response.data as { pdf: string }).pdf; // base64 string
}

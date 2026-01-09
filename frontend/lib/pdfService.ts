/**
 * PDF Generation Service
 * Connects frontend to backend Puppeteer PDF generation API
 */

import api from './api';
import { getThemeById, ThemeColor } from './templates/builder/colorPresets';
import type { ResumeData } from '@/store/useResumeStore';

// Map frontend template IDs to backend template IDs
const templateMap: Record<string, string> = {
    'classic': 'classic-professional',
    'sidebar': 'sidebar-modern',
    'header': 'header-bold',
    'minimal': 'minimal-clean',
    'creative': 'europass-classic',
};

// Get backend template ID from frontend template
function getBackendTemplateId(frontendTemplate: string): string {
    // Handle layout config IDs like "classic-normal-left"
    const baseLayout = frontendTemplate.split('-')[0];
    return templateMap[baseLayout] || 'classic-professional';
}

/**
 * Generate and download a PDF resume
 *
 * @param resumeData - The resume data from the store
 * @param templateId - Frontend template ID (e.g., 'sidebar', 'classic-normal-left')
 * @param themeId - Theme ID (e.g., 'navy', 'emerald', 'custom')
 * @param customColor - Custom color hex (required when themeId is 'custom')
 */
export async function downloadPdf(
    resumeData: ResumeData,
    templateId: string,
    themeId: string,
    customColor?: string
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
    }, {
        responseType: 'blob',
    });

    // Create download link
    const blob = new Blob([response.data], { type: 'application/pdf' });
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
 */
export async function previewPdf(
    resumeData: ResumeData,
    templateId: string,
    themeId: string,
    customColor?: string
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
    });

    return response.data.pdf; // base64 string
}

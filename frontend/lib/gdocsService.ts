/**
 * Google Docs Generation Service
 * Uses the same DOCX backend endpoint (Google Docs imports .docx natively)
 */

import api from './api';
import { getThemeById, generateTheme, ThemeColor } from './templates/builder/colorPresets';
import type { ResumeData } from '@/store/useResumeStore';
import type { PdfTranslations } from './pdfService';

/**
 * Generate and download a Google Docs-compatible resume (.docx)
 */
export async function downloadGdocs(
    resumeData: ResumeData,
    templateId: string,
    themeId: string,
    customColor?: string,
    translations?: PdfTranslations,
    locale?: string
): Promise<void> {
    // Handle pipe-delimited dual-color format (e.g., "#5b21b6|#a78bfa")
    let theme: ThemeColor;
    if (customColor && customColor.includes('|')) {
        const [primary, secondary] = customColor.split('|');
        theme = { ...generateTheme(primary), secondary };
    } else {
        theme = getThemeById(themeId, customColor);
    }

    // Uses the same DOCX endpoint — gdocs templates are registered in the DOCX registry
    const response = await api.post('/docx/generate', {
        data: resumeData,
        templateId,
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

    const blob = response.data as Blob;
    const url = URL.createObjectURL(blob);

    const name = resumeData.personalInfo?.fullName || 'resume';
    const sanitizedName = name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    const filename = `${sanitizedName}_resume_gdocs.docx`;

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}

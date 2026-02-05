/**
 * DOCX Generation Service
 * Connects frontend to backend DOCX generation API
 */

import api from './api';
import { getThemeById, ThemeColor } from './templates/builder/colorPresets';
import type { ResumeData } from '@/store/useResumeStore';
import type { PdfTranslations } from './pdfService';

/**
 * Generate and download a DOCX resume
 */
export async function downloadDocx(
    resumeData: ResumeData,
    templateId: string,
    themeId: string,
    customColor?: string,
    translations?: PdfTranslations,
    locale?: string
): Promise<void> {
    const theme: ThemeColor = getThemeById(themeId, customColor);

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
    const filename = `${sanitizedName}_resume.docx`;

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}

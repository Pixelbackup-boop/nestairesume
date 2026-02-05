/**
 * DOCX Template Helpers
 * Word-safe utilities for table-based HTML → DOCX conversion
 */

import { PdfResumeData, PdfTheme, PdfTranslations } from '../../../types/pdf';
import { escapeHtml, formatDescription, getContrastText, hexToRgba, getLanguageLevel } from '../../pdf/shared/helpers';
import { formatLocalizedDate } from '../../pdf/shared/dateUtils';
import { getTranslations } from '../../pdf/shared/translations';

// Re-export shared helpers
export { escapeHtml, formatDescription, getContrastText, hexToRgba, getLanguageLevel, formatLocalizedDate, getTranslations };

// Word-safe font families (must be installed on user's machine)
export const DOCX_FONTS = {
    heading: "'Calibri', 'Arial', sans-serif",
    body: "'Calibri', 'Arial', sans-serif",
    serif: "'Georgia', 'Times New Roman', serif",
};

/**
 * Format date range for DOCX templates
 */
export function formatDateRange(
    startDate: string | undefined,
    endDate: string | undefined,
    current: boolean,
    presentLabel: string = 'Present',
    locale: string = 'en'
): string {
    const start = formatLocalizedDate(startDate, locale);
    const end = current ? presentLabel : formatLocalizedDate(endDate, locale);
    if (!start && !end) return '';
    if (!start) return end || '';
    if (!end) return start;
    return `${start} – ${end}`;
}

/**
 * Build contact info line (text-based, no SVG icons)
 */
export function buildContactLine(personalInfo: PdfResumeData['personalInfo']): string {
    const parts: string[] = [];
    if (personalInfo.email) parts.push(escapeHtml(personalInfo.email));
    if (personalInfo.phone) parts.push(escapeHtml(personalInfo.phone));
    if (personalInfo.location) parts.push(escapeHtml(personalInfo.location));
    if (personalInfo.website) parts.push(escapeHtml(personalInfo.website));
    if (personalInfo.linkedin) parts.push(escapeHtml(personalInfo.linkedin));
    return parts.join('  |  ');
}

/**
 * Build contact items as vertical list (for sidebar templates)
 */
export function buildContactList(personalInfo: PdfResumeData['personalInfo'], color: string = '#ffffff'): string {
    const items: string[] = [];
    if (personalInfo.email) items.push(`<p style="margin:0 0 4px 0;font-size:10px;color:${color};">&#9993; ${escapeHtml(personalInfo.email)}</p>`);
    if (personalInfo.phone) items.push(`<p style="margin:0 0 4px 0;font-size:10px;color:${color};">&#9742; ${escapeHtml(personalInfo.phone)}</p>`);
    if (personalInfo.location) items.push(`<p style="margin:0 0 4px 0;font-size:10px;color:${color};">&#9679; ${escapeHtml(personalInfo.location)}</p>`);
    if (personalInfo.website) items.push(`<p style="margin:0 0 4px 0;font-size:10px;color:${color};">&#9741; ${escapeHtml(personalInfo.website)}</p>`);
    if (personalInfo.linkedin) items.push(`<p style="margin:0 0 4px 0;font-size:10px;color:${color};">in ${escapeHtml(personalInfo.linkedin)}</p>`);
    return items.join('');
}

/**
 * Render profile image HTML for DOCX (base64 supported by html-to-docx)
 */
export function renderProfileImage(
    profileImage: string | undefined,
    size: number = 80,
    shape: 'circle' | 'rounded' | 'square' = 'circle'
): string {
    if (!profileImage) return '';
    const borderRadius = shape === 'circle' ? '50%' : shape === 'rounded' ? '8px' : '0';
    return `<img src="${profileImage}" width="${size}" height="${size}" style="width:${size}px;height:${size}px;border-radius:${borderRadius};object-fit:cover;display:block;" />`;
}

/**
 * Render skills as comma-separated or bullet list
 */
export function renderSkillsList(skills: PdfResumeData['skills'], mode: 'inline' | 'list' = 'inline'): string {
    if (!skills?.length) return '';
    if (mode === 'inline') {
        return skills.map(s => escapeHtml(s.name)).join(', ');
    }
    return skills.map(s => `<li style="margin:0 0 2px 0;">${escapeHtml(s.name)}</li>`).join('');
}

/**
 * Render language proficiency as text
 */
export function getLanguageProficiencyText(proficiency: string): string {
    const map: Record<string, string> = {
        native: 'Native',
        fluent: 'Fluent',
        advanced: 'Advanced',
        intermediate: 'Intermediate',
        basic: 'Basic',
    };
    return map[proficiency?.toLowerCase()] || proficiency || '';
}

/**
 * Wrap DOCX template HTML in a minimal document structure
 * No external CSS, no Google Fonts, no Tailwind — inline styles only
 */
export function wrapDocxHtml(bodyHtml: string): string {
    return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
    body {
        font-family: Calibri, Arial, sans-serif;
        font-size: 11pt;
        color: #333333;
        margin: 0;
        padding: 0;
        line-height: 1.4;
    }
    table {
        border-collapse: collapse;
    }
    p {
        margin: 0 0 4px 0;
    }
    ul {
        margin: 4px 0;
        padding-left: 20px;
    }
    li {
        margin: 0 0 2px 0;
    }
</style>
</head>
<body>
${bodyHtml}
</body>
</html>`;
}

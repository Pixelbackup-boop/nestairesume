/**
 * DOCX Template Helpers
 * Word-safe utilities for table-based HTML → DOCX conversion
 */
import { PdfResumeData } from '../../../types/pdf';
import { escapeHtml, formatDescription, getContrastText, hexToRgba, getLanguageLevel } from '../../pdf/shared/helpers';
import { formatLocalizedDate } from '../../pdf/shared/dateUtils';
import { getTranslations } from '../../pdf/shared/translations';
export { escapeHtml, formatDescription, getContrastText, hexToRgba, getLanguageLevel, formatLocalizedDate, getTranslations };
export declare const DOCX_FONTS: {
    heading: string;
    body: string;
    serif: string;
};
/**
 * Format date range for DOCX templates
 */
export declare function formatDateRange(startDate: string | undefined, endDate: string | undefined, current: boolean, presentLabel?: string, locale?: string): string;
/**
 * Build contact info line (text-based, no SVG icons)
 */
export declare function buildContactLine(personalInfo: PdfResumeData['personalInfo']): string;
/**
 * Build contact items as vertical list (for sidebar templates)
 */
export declare function buildContactList(personalInfo: PdfResumeData['personalInfo'], color?: string): string;
/**
 * Render profile image HTML for DOCX (base64 supported by html-to-docx)
 */
export declare function renderProfileImage(profileImage: string | undefined, size?: number, shape?: 'circle' | 'rounded' | 'square'): string;
/**
 * Render skills as comma-separated or bullet list
 */
export declare function renderSkillsList(skills: PdfResumeData['skills'], mode?: 'inline' | 'list'): string;
/**
 * Render language proficiency as text
 */
export declare function getLanguageProficiencyText(proficiency: string): string;
/**
 * Wrap DOCX template HTML in a minimal document structure
 * No external CSS, no Google Fonts, no Tailwind — inline styles only
 */
export declare function wrapDocxHtml(bodyHtml: string): string;
//# sourceMappingURL=docxHelpers.d.ts.map
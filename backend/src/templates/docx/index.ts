/**
 * DOCX Template Registry
 * Maps template IDs to their renderers (4 Word + 4 Google Docs templates)
 * Google Docs templates also output .docx (Google Docs imports .docx natively)
 */

import { PdfResumeData, PdfTheme, PdfTranslations } from '../../types/pdf';
import { renderDocxClassic } from './docx-classic';
import { renderDocxSidebar } from './docx-sidebar';
import { renderDocxHeader } from './docx-header';
import { renderDocxMinimal } from './docx-minimal';
import { renderGdocsClean } from '../gdocs/gdocs-clean';
import { renderGdocsCoral } from '../gdocs/gdocs-coral';
import { renderGdocsElegant } from '../gdocs/gdocs-elegant';
import { renderGdocsCompact } from '../gdocs/gdocs-compact';

export type DocxTemplateRenderer = (
    data: PdfResumeData,
    theme: PdfTheme,
    translations?: PdfTranslations,
    locale?: string
) => string;

export const docxTemplates: Record<string, DocxTemplateRenderer> = {
    // Microsoft Word templates
    'docx-classic': renderDocxClassic,
    'docx-sidebar': renderDocxSidebar,
    'docx-header': renderDocxHeader,
    'docx-minimal': renderDocxMinimal,
    // Google Docs templates (same .docx output, Google Docs-optimized styling)
    'gdocs-clean': renderGdocsClean,
    'gdocs-coral': renderGdocsCoral,
    'gdocs-elegant': renderGdocsElegant,
    'gdocs-compact': renderGdocsCompact,
};

export function getDocxTemplateRenderer(templateId: string): DocxTemplateRenderer {
    const renderer = docxTemplates[templateId];
    if (!renderer) {
        console.warn(`DOCX template "${templateId}" not found, falling back to docx-classic`);
        return renderDocxClassic;
    }
    return renderer;
}

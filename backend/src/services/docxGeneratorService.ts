/**
 * DOCX Generator Service
 * Converts table-based HTML templates to .docx using html-to-docx
 */

import HTMLtoDOCX from 'html-to-docx';
import { PdfResumeData, PdfTheme, PdfGenerateRequest, PdfTranslations } from '../types/pdf';
import { getDocxTemplateRenderer } from '../templates/docx';
import { wrapDocxHtml } from '../templates/docx/shared/docxHelpers';
import { getTranslations } from '../templates/pdf/shared/translations';

/**
 * Render resume data to DOCX buffer
 */
export async function renderResumeDocx(
    data: PdfResumeData,
    templateId: string,
    theme: PdfTheme,
    translations?: PdfTranslations,
    locale: string = 'en'
): Promise<Buffer> {
    const renderTemplate = getDocxTemplateRenderer(templateId);
    const t = getTranslations(translations);

    // Render template to HTML
    const templateHtml = renderTemplate(data, theme, t, locale);

    // Wrap in minimal document structure
    const fullHtml = wrapDocxHtml(templateHtml);

    // Convert to DOCX
    const docxBuffer = await HTMLtoDOCX(fullHtml, null, {
        table: { row: { cantSplit: true } },
        footer: false,
        pageNumber: false,
        margins: {
            top: 720,      // 0.5 inch (in TWIPs: 1 inch = 1440)
            bottom: 720,
            left: 720,
            right: 720,
            header: 720,
            footer: 720,
            gutter: 0,
        },
    });

    return Buffer.from(docxBuffer as ArrayBuffer);
}

/**
 * Process a DOCX generation request
 */
export async function processDocxRequest(request: PdfGenerateRequest): Promise<Buffer> {
    const { data, templateId, theme, translations, locale } = request;
    return renderResumeDocx(data, templateId, theme, translations, locale || 'en');
}

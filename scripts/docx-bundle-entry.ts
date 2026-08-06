/**
 * Entry for the DOCX template bundle (see build-docx-templates.mjs).
 *
 * Exposes the backend's DOCX/GDocs string-template registry as a single
 * self-contained renderer the Cloudflare Worker can import — the Worker then
 * feeds the returned HTML to html-to-docx.
 */
import { getDocxTemplateRenderer } from '../backend/src/templates/docx';
import { wrapDocxHtml } from '../backend/src/templates/docx/shared/docxHelpers';
import { getTranslations } from '../backend/src/templates/pdf/shared/translations';
import type { PdfResumeData, PdfTheme, PdfTranslations } from '../backend/src/types/pdf';

export function renderDocxHtml(
    data: PdfResumeData,
    templateId: string,
    theme: PdfTheme,
    translations?: PdfTranslations,
    locale: string = 'en'
): string {
    const renderTemplate = getDocxTemplateRenderer(templateId);
    const t = getTranslations(translations);
    const templateHtml = renderTemplate(data, theme, t, locale);
    return wrapDocxHtml(templateHtml);
}

/**
 * DOCX Template Registry
 * Maps template IDs to their renderers (4 Word + 4 Google Docs templates)
 * Google Docs templates also output .docx (Google Docs imports .docx natively)
 */
import { PdfResumeData, PdfTheme, PdfTranslations } from '../../types/pdf';
export type DocxTemplateRenderer = (data: PdfResumeData, theme: PdfTheme, translations?: PdfTranslations, locale?: string) => string;
export declare const docxTemplates: Record<string, DocxTemplateRenderer>;
export declare function getDocxTemplateRenderer(templateId: string): DocxTemplateRenderer;
//# sourceMappingURL=index.d.ts.map
/**
 * DOCX Generator Service
 * Converts table-based HTML templates to .docx using html-to-docx
 */
import { PdfResumeData, PdfTheme, PdfGenerateRequest, PdfTranslations } from '../types/pdf';
/**
 * Render resume data to DOCX buffer
 */
export declare function renderResumeDocx(data: PdfResumeData, templateId: string, theme: PdfTheme, translations?: PdfTranslations, locale?: string): Promise<Buffer>;
/**
 * Process a DOCX generation request
 */
export declare function processDocxRequest(request: PdfGenerateRequest): Promise<Buffer>;
//# sourceMappingURL=docxGeneratorService.d.ts.map
/**
 * PDF Generator Service
 * Uses Puppeteer to generate PDFs from HTML templates
 */
import { PdfResumeData, PdfTheme, PdfGenerateRequest, PdfTranslations } from '../types/pdf';
/**
 * Close the browser instance (call on server shutdown)
 */
export declare function closeBrowser(): Promise<void>;
/**
 * Generate PDF from HTML string
 */
export declare function generatePdfFromHtml(html: string): Promise<Buffer>;
/**
 * Render resume data to PDF
 */
export declare function renderResumePdf(data: PdfResumeData, templateId: string, theme: PdfTheme, translations?: PdfTranslations, locale?: string): Promise<Buffer>;
/**
 * Process a PDF generation request
 */
export declare function processPdfRequest(request: PdfGenerateRequest): Promise<Buffer>;
//# sourceMappingURL=pdfGeneratorService.d.ts.map
"use strict";
/**
 * PDF Generator Service
 * Uses Puppeteer to generate PDFs from HTML templates
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeBrowser = closeBrowser;
exports.generatePdfFromHtml = generatePdfFromHtml;
exports.renderResumePdf = renderResumePdf;
exports.processPdfRequest = processPdfRequest;
const puppeteer_1 = __importDefault(require("puppeteer"));
const pdf_1 = require("../templates/pdf");
const htmlWrapper_1 = require("../templates/pdf/shared/htmlWrapper");
const translations_1 = require("../templates/pdf/shared/translations");
// Browser singleton for performance
let browser = null;
/**
 * Get or create a shared Puppeteer browser instance
 */
async function getBrowser() {
    if (!browser || !browser.connected) {
        browser = await puppeteer_1.default.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--disable-gpu',
            ],
        });
    }
    return browser;
}
/**
 * Close the browser instance (call on server shutdown)
 */
async function closeBrowser() {
    if (browser) {
        await browser.close();
        browser = null;
    }
}
/**
 * Generate PDF from HTML string
 */
async function generatePdfFromHtml(html) {
    const browserInstance = await getBrowser();
    let page = null;
    try {
        page = await browserInstance.newPage();
        // Set viewport for consistent rendering
        await page.setViewport({
            width: 794, // A4 width in pixels at 96 DPI
            height: 1123, // A4 height in pixels at 96 DPI
        });
        // Load HTML and wait for fonts/resources
        await page.setContent(html, {
            waitUntil: 'networkidle0',
            timeout: 30000,
        });
        // Wait for fonts to load (networkidle0 usually covers this, but add small buffer)
        await new Promise(resolve => setTimeout(resolve, 100));
        // Generate PDF
        // Note: Don't specify margins here - let CSS @page rules control them
        // @page { margin: 20px 0 0 0 } for page 2+
        // @page :first { margin: 0 } for first page
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            preferCSSPageSize: true,
        });
        return Buffer.from(pdfBuffer);
    }
    finally {
        if (page) {
            await page.close();
        }
    }
}
/**
 * Render resume data to PDF
 */
async function renderResumePdf(data, templateId, theme, translations, locale = 'en') {
    // Get the appropriate template renderer
    const renderTemplate = (0, pdf_1.getTemplateRenderer)(templateId);
    // Get translations with defaults
    const t = (0, translations_1.getTranslations)(translations);
    // Render template to HTML content (pass locale for date localization)
    const templateHtml = renderTemplate(data, theme, t, locale);
    // Wrap with full HTML document (fonts, CSS, etc.) - pass locale for RTL support
    const fullHtml = (0, htmlWrapper_1.wrapHtml)(templateHtml, {
        headingFont: data.fonts?.heading || 'Inter',
        bodyFont: data.fonts?.body || 'Inter',
        locale,
    });
    // Generate PDF
    return generatePdfFromHtml(fullHtml);
}
/**
 * Process a PDF generation request
 */
async function processPdfRequest(request) {
    const { data, templateId, theme, translations, locale } = request;
    return renderResumePdf(data, templateId, theme, translations, locale || 'en');
}
// Cleanup on process exit
process.on('SIGINT', async () => {
    await closeBrowser();
    process.exit(0);
});
process.on('SIGTERM', async () => {
    await closeBrowser();
    process.exit(0);
});
//# sourceMappingURL=pdfGeneratorService.js.map
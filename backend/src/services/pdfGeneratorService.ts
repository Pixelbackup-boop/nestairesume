/**
 * PDF Generator Service
 * Uses Puppeteer to generate PDFs from HTML templates
 */

import puppeteer, { Browser, Page } from 'puppeteer';
import { PdfResumeData, PdfTheme, PdfGenerateRequest, PdfTranslations } from '../types/pdf';
import { getTemplateRenderer } from '../templates/pdf';
import { wrapHtml } from '../templates/pdf/shared/htmlWrapper';
import { getTranslations } from '../templates/pdf/shared/translations';

// Browser singleton for performance
let browser: Browser | null = null;

/**
 * Get or create a shared Puppeteer browser instance
 */
async function getBrowser(): Promise<Browser> {
    if (!browser || !browser.connected) {
        browser = await puppeteer.launch({
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
export async function closeBrowser(): Promise<void> {
    if (browser) {
        await browser.close();
        browser = null;
    }
}

/**
 * Generate PDF from HTML string
 */
export async function generatePdfFromHtml(html: string): Promise<Buffer> {
    const browserInstance = await getBrowser();
    let page: Page | null = null;

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
    } finally {
        if (page) {
            await page.close();
        }
    }
}

/**
 * Render resume data to PDF
 */
export async function renderResumePdf(
    data: PdfResumeData,
    templateId: string,
    theme: PdfTheme,
    translations?: PdfTranslations,
    locale: string = 'en'
): Promise<Buffer> {
    // Get the appropriate template renderer
    const renderTemplate = getTemplateRenderer(templateId);

    // Get translations with defaults
    const t = getTranslations(translations);

    // Render template to HTML content (pass locale for date localization)
    const templateHtml = renderTemplate(data, theme, t, locale);

    // Categorize templates for margin strategy
    const sidebarTemplates = [
        'sidebar-dark-navy',
        'sidebar-narrow-yellow',
        'sidebar-monogram',
        'header-dark'
    ];

    const headerTemplates = [
        'header-dark-banner',
        'header-blue-clean',
        'header-icon-sections',
        'header-icon-orange',
        'header-geometric',
        'header-diagonal-yellow',
        'header-ribbon-yellow',
        'header-decorative',
        'header-dark-box'
    ];

    let marginStrategy: 'sidebar' | 'full-bleed' | 'standard' = 'standard';

    if (sidebarTemplates.includes(templateId)) {
        marginStrategy = 'sidebar'; // 20px uniform
    } else if (headerTemplates.includes(templateId)) {
        marginStrategy = 'full-bleed'; // 0px
    }

    // Wrap with full HTML document (fonts, CSS, etc.) - pass locale for RTL support
    const fullHtml = wrapHtml(templateHtml, {
        headingFont: data.fonts?.heading || 'Inter',
        bodyFont: data.fonts?.body || 'Inter',
        locale,
        marginStrategy
    });

    // Generate PDF
    return generatePdfFromHtml(fullHtml);
}

/**
 * Process a PDF generation request
 */
export async function processPdfRequest(request: PdfGenerateRequest): Promise<Buffer> {
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

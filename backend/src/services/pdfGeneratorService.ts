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

// Concurrency control — limits simultaneous Puppeteer pages to prevent OOM on 4GB Cloud Run
const MAX_CONCURRENT_PAGES = 8;
const QUEUE_TIMEOUT_MS = 30_000;
let activePages = 0;
const waitQueue: Array<{ resolve: () => void; reject: (err: Error) => void }> = [];

async function acquirePageSlot(): Promise<void> {
    if (activePages < MAX_CONCURRENT_PAGES) {
        activePages++;
        return;
    }
    // Queue this request — it will be resolved when a slot frees up
    return new Promise<void>((resolve, reject) => {
        const timer = setTimeout(() => {
            const idx = waitQueue.findIndex(w => w.resolve === resolve);
            if (idx !== -1) waitQueue.splice(idx, 1);
            reject(new Error('PDF queue timeout — server busy, please try again'));
        }, QUEUE_TIMEOUT_MS);

        waitQueue.push({
            resolve: () => { clearTimeout(timer); activePages++; resolve(); },
            reject,
        });
    });
}

function releasePageSlot(): void {
    activePages--;
    if (waitQueue.length > 0) {
        const next = waitQueue.shift()!;
        next.resolve();
    }
}

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
    await acquirePageSlot();

    const browserInstance = await getBrowser();
    let page: Page | null = null;

    try {
        page = await browserInstance.newPage();

        await page.setViewport({
            width: 794,  // A4 width at 96 DPI
            height: 1123, // A4 height at 96 DPI
        });

        await page.setContent(html, {
            waitUntil: 'networkidle2',
            timeout: 15000,
        });

        // Wait for base64 @font-face fonts to decode
        await page.evaluate('document.fonts.ready');

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
        releasePageSlot();
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

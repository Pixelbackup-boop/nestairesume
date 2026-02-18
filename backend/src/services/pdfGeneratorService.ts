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
 * Get or create a shared Puppeteer browser instance.
 * Retries once on launch failure (handles transient OOM / cold-start).
 */
async function getBrowser(): Promise<Browser> {
    if (browser && browser.connected) {
        return browser;
    }

    // Clean up stale reference
    if (browser) {
        try { await browser.close(); } catch { /* already dead */ }
        browser = null;
    }

    const launchOptions = {
        headless: true as const,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--no-first-run',
            '--disable-extensions',
        ],
    };

    // Attempt launch with one retry
    for (let attempt = 1; attempt <= 2; attempt++) {
        try {
            browser = await puppeteer.launch(launchOptions);
            return browser;
        } catch (err) {
            console.error(`[PDF] Browser launch attempt ${attempt} failed:`, err);
            if (attempt === 2) throw err;
            await new Promise(r => setTimeout(r, 1000));
        }
    }

    throw new Error('Failed to launch browser after 2 attempts');
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
 * Includes a JS-based pagination pass (ported from frontend PagedPreview.tsx)
 * that measures elements and adds margin-top to prevent content splitting at page boundaries.
 */
export async function generatePdfFromHtml(
    html: string,
    marginStrategy: 'sidebar' | 'full-bleed' | 'standard' = 'standard'
): Promise<Buffer> {
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

        // Smart pagination — ported from frontend PagedPreview.tsx
        // Measures element positions and adds margin-top to push elements past page boundaries.
        // NOTE: Uses a string template instead of a function to avoid esbuild's __name helper
        // (which doesn't exist in Puppeteer's browser context).
        // Smart pagination — ported from frontend PagedPreview.tsx
        // Measures element positions and adds margin-top to push elements past page boundaries.
        // NOTE: Uses a string template instead of a function to avoid esbuild's __name helper
        // (which doesn't exist in Puppeteer's browser context).
        await page.evaluate(`(function() {
            try {
            // A4 dimensions and margins (must match CSS @page)
            var A4_HEIGHT = 1123;
            var MARGIN_TOP = 40;    // Top margin on page 2+
            var MARGIN_BOTTOM = 40; // Bottom margin on all pages
            var PAGE_GAP = 0;       // No visual gap in PDF generation (continuous)
            
            var strategy = '${marginStrategy}';
            var isStandard = strategy === 'standard';
            
            // Define printable areas
            // Page 1: 0 to (1123 - 40) = 1083px
            // Page 2+: Starts at 1123. Printable area is (1123 - 40 - 40) = 1043px
            
            var firstPageMaxHeight = isStandard ? A4_HEIGHT - MARGIN_BOTTOM : A4_HEIGHT;
            var subsequentPageMaxHeight = isStandard ? A4_HEIGHT - MARGIN_TOP - MARGIN_BOTTOM : A4_HEIGHT;

            // Helper: Get the bottom Y coordinate of the page content area for a given Y position
            var getPageContentBottom = function(y) {
                if (y < firstPageMaxHeight) {
                    return firstPageMaxHeight;
                }
                
                // For subsequent pages
                var yMinusFirst = y - firstPageMaxHeight;
                // Which subsequent page is this? (0-indexed relative to page 2)
                var subPageIdx = Math.floor(yMinusFirst / subsequentPageMaxHeight);
                
                // Return the accumulated height at the bottom of this page's content area
                return firstPageMaxHeight + (subPageIdx + 1) * subsequentPageMaxHeight;
            };

            // Helper: Get the start Y coordinate of the NEXT page's content area
            var getNextPageStart = function(y) {
                 if (y < firstPageMaxHeight) {
                    return firstPageMaxHeight; // Start of Page 2 content (which is implicitly at Y=1083 in continuous flow, but visually pushed by Margin Top)
                }
                
                var yMinusFirst = y - firstPageMaxHeight;
                var subPageIdx = Math.floor(yMinusFirst / subsequentPageMaxHeight);
                
                return firstPageMaxHeight + (subPageIdx + 1) * subsequentPageMaxHeight;
            };

            var container = document.querySelector('.resume-page') || document.body;
            
            // Select all elements that should be kept together
            var elements = Array.from(container.querySelectorAll(
                '[data-paginate], .section-header, .resume-entry, h2, h3, ' +
                '.credential-item, .reference-item, .language-item, .skill-item, ' +
                '[class*="entry"], [class*="item"]'
            ));

            // State tracking
            var cumulativeOffset = 0;
            
            // History of offsets at various Y positions to handle multi-column layouts
            // Array of { originalTop: number, offsetAtThatPoint: number }
            var offsetHistory = [];
            
            var updates = [];

            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];
                var rect = element.getBoundingClientRect();
                
                // Get absolute position relative to container (assuming container is at top 0 for calculation simplicity or relative delta)
                // We use rect.top directly since we are in a headless environment and standard flow
                var rawTop = rect.top; 
                var height = rect.height;

                // MULTI-COLUMN SUPPORT:
                // Detect "Jumps" (backward movement in Y position) which indicate a new column
                if (offsetHistory.length > 0) {
                    var prevEntry = offsetHistory[offsetHistory.length - 1];
                    var prevTop = prevEntry.originalTop;
                    
                    // If we jumped back up significantly (more than 50px), it's a new column
                    if (rawTop < prevTop - 50) {
                        // Find the offset we should use for this Y-position
                        // We want the MINIMUM offset seen at this level (or above) to respect shared headers
                        var bestHistoricalOffset = offsetHistory.reduce(function(min, entry) {
                            if (entry.originalTop <= rawTop + 5) {
                                return Math.max(min, entry.offsetAtThatPoint);
                            }
                            return min;
                        }, 0);
                        
                        // Reset cumulative offset for this new column
                        cumulativeOffset = bestHistoricalOffset;
                    }
                }

                // Calculate where the element WOULD be with current offsets
                var adjustedTop = rawTop + cumulativeOffset;
                var adjustedBottom = adjustedTop + height;

                // Record this position in history
                offsetHistory.push({
                    originalTop: rawTop,
                    offsetAtThatPoint: cumulativeOffset
                });

                // OVERSIZED ELEMENT PROTECTION: If element > 90% of page height, let it span naturally
                if (height > A4_HEIGHT * 0.9) {
                    continue; 
                }

                // Check boundaries
                var pageContentBottom = getPageContentBottom(adjustedTop);
                var shouldPush = adjustedBottom > pageContentBottom;

                // ORPHAN PROTECTION: Push headers/sections if < 60px from bottom
                if (!shouldPush && height >= 80) {
                     var isBreakable = element.hasAttribute('data-paginate') || 
                                      element.tagName === 'H2' || 
                                      element.tagName === 'H3' ||
                                      element.classList.contains('section-header');
                                      
                     if (isBreakable) {
                        var spaceRemaining = pageContentBottom - adjustedBottom;
                        if (spaceRemaining < 60) {
                            shouldPush = true;
                        }
                     }
                }

                if (shouldPush) {
                    var nextStart = getNextPageStart(adjustedTop);
                    
                    // Logic: Frontend pushes to (nextPageStart + PAGE_MARGIN_TOP).
                    // In Backend, CSS @page handles the physical margin.
                    // However, we need to ensure we push ENOUGH to get into the next page's flow.
                    // If we push exactly to nextStart, the browser's paginator should wrap it to the next page.
                    // We add a small buffer (1px) to ensure it definitely crosses the boundary.
                    
                    var targetY = nextStart + 1; 
                    var pushDistance = targetY - rawTop - cumulativeOffset;

                    if (pushDistance > 0) {
                        updates.push({ element: element, pushPx: pushDistance });
                        cumulativeOffset += pushDistance;
                        
                        // Update history for this push so subsequent elements in this column know
                        offsetHistory[offsetHistory.length - 1].offsetAtThatPoint = cumulativeOffset;
                    }
                }
            }

                // Apply updates
                for (var j = 0; j < updates.length; j++) {
                    updates[j].element.style.marginTop = updates[j].pushPx + 'px';
                }
            } catch (e) {
                console.error('Pagination Script Error:', e);
                // Don't crash the PDF generation, just log and continue
            }
        })()`);

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

    // Generate PDF with smart pagination
    return generatePdfFromHtml(fullHtml, marginStrategy);
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

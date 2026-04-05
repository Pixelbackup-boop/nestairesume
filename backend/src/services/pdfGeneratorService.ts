/**
 * PDF Generator Service
 * Uses Puppeteer to generate PDFs from HTML templates
 */

import puppeteer, { Browser, Page } from 'puppeteer';
import { PDFDocument, PDFName, PDFRawStream, PDFArray, PDFRef } from 'pdf-lib';
import { decodePDFRawStream } from 'pdf-lib/cjs/core/streams/decode';
import logger from '../lib/logger';
import { captureError, trackPdfGeneration } from '../lib/sentry';
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
            logger.error({ err, attempt }, 'Browser launch attempt failed');
            captureError(err instanceof Error ? err : new Error(String(err)), {
                tags: { service: 'pdf', operation: 'browser-launch' },
                extra: { attempt },
            });
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
 * Remove trailing blank pages from a PDF buffer.
 * A page is considered blank if its content stream has no visible drawing
 * operators (no text, images, or filled/stroked paths).
 */
async function removeTrailingBlankPages(pdfBuffer: Buffer): Promise<Buffer> {
    try {
        const pdfDoc = await PDFDocument.load(pdfBuffer);
        const pages = pdfDoc.getPages();

        if (pages.length <= 1) return pdfBuffer;

        const context = pdfDoc.context;

        let removed = 0;
        for (let i = pages.length - 1; i >= 1; i--) {
            const page = pages[i];
            const contentsEntry = page.node.get(PDFName.of('Contents'));

            if (!contentsEntry) {
                pdfDoc.removePage(i);
                removed++;
                continue;
            }

            // Collect content stream refs (could be single ref or array of refs)
            const streamRefs: PDFRef[] = [];
            if (contentsEntry instanceof PDFRef) {
                streamRefs.push(contentsEntry);
            } else if (contentsEntry instanceof PDFArray) {
                for (let k = 0; k < contentsEntry.size(); k++) {
                    const entry = contentsEntry.get(k);
                    if (entry instanceof PDFRef) streamRefs.push(entry);
                }
            }

            // Decode each stream and check for visible drawing operators
            let decoded = '';
            for (const ref of streamRefs) {
                const obj = context.lookup(ref);
                if (obj instanceof PDFRawStream) {
                    const bytes = decodePDFRawStream(obj).decode();
                    decoded += new TextDecoder('latin1').decode(bytes);
                }
            }

            // Check for text (Tj/TJ) or images/XObjects (Do) — the only meaningful content.
            // Background fills (re f) are just page backgrounds, not real content.
            const hasVisibleContent = /\b(Tj|TJ|Do)\b/.test(decoded);

            if (!hasVisibleContent) {
                pdfDoc.removePage(i);
                removed++;
                continue;
            }

            // Stop at the first non-blank page from the end
            break;
        }

        if (removed === 0) return pdfBuffer;

        logger.info({ removedPages: removed }, 'Removed trailing blank pages from PDF');
        const trimmedBytes = await pdfDoc.save();
        return Buffer.from(trimmedBytes);
    } catch (err) {
        logger.warn({ err }, 'Failed to check for blank pages, returning original PDF');
        return pdfBuffer;
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
    const startTime = Date.now();

    try {
        page = await browserInstance.newPage();

        await page.setViewport({
            width: 794,  // A4 width at 96 DPI
            height: 1123, // A4 height at 96 DPI
        });

        await page.setContent(html, {
            waitUntil: 'domcontentloaded',
            timeout: 15000,
        });

        // Wait for all fonts (base64 + Google Fonts CDN for CJK/Thai) to load.
        // Uses document.fonts.ready which resolves when all @font-face fonts are loaded.
        // Wrapped in Promise.race with a 10s timeout to prevent hangs if CDN is unreachable.
        await page.evaluate(`Promise.race([
            Promise.all([
                new Promise(function(resolve) {
                    if (document.readyState === 'complete') return resolve();
                    window.addEventListener('load', function() { resolve(); }, { once: true });
                }),
                document.fonts.ready
            ]),
            new Promise(function(resolve) { setTimeout(resolve, 10000); })
        ])`);

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
            
            // Margin strategy determines @page CSS margins
            var strategy = '${marginStrategy}';
            var hasPageCssMargins = (strategy === 'standard');

            // Content boundaries for DETECTION (always reserve 40px margins)
            // Page 1: content should stop at 1083px (1123 - 40)
            // Page 2+: content area is 1043px (1123 - 40 top - 40 bottom)
            var firstPageMaxHeight = A4_HEIGHT - MARGIN_BOTTOM;
            var subsequentPageMaxHeight = A4_HEIGHT - MARGIN_TOP - MARGIN_BOTTOM;

            // Physical page boundaries for PUSH TARGETS (where Puppeteer actually breaks pages)
            // For standard: @page margin shrinks content area → physical = content boundary
            // For full-bleed/sidebar: @page margin is 0 → physical = full A4 height
            var firstPagePhysical = hasPageCssMargins ? firstPageMaxHeight : A4_HEIGHT;
            var subsequentPagePhysical = hasPageCssMargins ? subsequentPageMaxHeight : A4_HEIGHT;

            // Helper: Get the bottom Y coordinate of the content area for a given Y position
            var getPageContentBottom = function(y) {
                if (y < firstPagePhysical) {
                    return firstPageMaxHeight; // Content stops at 1083 regardless of strategy
                }

                // For subsequent pages
                var yMinusFirst = y - firstPagePhysical;
                var subPageIdx = Math.floor(yMinusFirst / subsequentPagePhysical);
                var pageStart = firstPagePhysical + subPageIdx * subsequentPagePhysical;

                // Content stops MARGIN_BOTTOM before the next physical page break
                return pageStart + subsequentPagePhysical - MARGIN_BOTTOM;
            };

            // Helper: Get the PHYSICAL start of the NEXT page (where Puppeteer breaks)
            var getNextPageStart = function(y) {
                if (y < firstPagePhysical) {
                    return firstPagePhysical; // Physical page 2 starts at 1123 (full-bleed) or 1083 (standard)
                }

                var yMinusFirst = y - firstPagePhysical;
                var subPageIdx = Math.floor(yMinusFirst / subsequentPagePhysical);

                return firstPagePhysical + (subPageIdx + 1) * subsequentPagePhysical;
            };

            var container = document.querySelector('.resume-page') || document.body;
            
            // Select all elements that should be kept together
            var elements = Array.from(container.querySelectorAll(
                '[data-paginate], .section-header, .resume-entry, h2, h3, ' +
                '.credential-item, .language-item, .skill-item, ' +
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

                    // Push past the physical page boundary + add content top margin.
                    // For standard: @page CSS adds top margin on page 2+, just push past boundary.
                    // For full-bleed/sidebar: @page margin is 0, so we must add MARGIN_TOP manually
                    // to create visual spacing at the top of the next page.
                    var contentTopOffset = hasPageCssMargins ? 0 : MARGIN_TOP;
                    var targetY = nextStart + 1 + contentTopOffset;
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

                // Phase 3: PAGE 2+ TOP MARGIN ENFORCEMENT (matches frontend PagedPreview.tsx)
                // For full-bleed/sidebar templates, @page margin is 0 so there's no automatic
                // top margin on page 2+. Find the first element at the top of each page and
                // push it down by MARGIN_TOP to create visual spacing.
                if (!hasPageCssMargins) {
                    var totalHeight = container.scrollHeight || container.offsetHeight;
                    var totalPages = Math.ceil(totalHeight / A4_HEIGHT);

                    for (var pageIdx = 1; pageIdx < totalPages; pageIdx++) {
                        var pageTopPx = pageIdx * A4_HEIGHT;

                        // Find elements near the top of this page
                        var allEls = container.querySelectorAll('*');
                        var bestEl = null;
                        var bestTop = Infinity;

                        for (var k = 0; k < allEls.length; k++) {
                            var el = allEls[k];
                            // Skip non-visible or already-pushed elements
                            if (el.offsetParent === null && el !== container) continue;
                            if (el.style.marginTop && parseFloat(el.style.marginTop) > 0) continue;

                            var elRect = el.getBoundingClientRect();
                            var elTop = elRect.top;
                            var dist = elTop - pageTopPx;

                            // Element starts within 30px of page top (and not before)
                            if (dist >= -5 && dist < 30 && elTop < bestTop) {
                                bestTop = elTop;
                                bestEl = el;
                            }
                        }

                        // Push the topmost element down by MARGIN_TOP
                        if (bestEl) {
                            var distFromTop = bestTop - pageTopPx;
                            if (distFromTop < MARGIN_TOP) {
                                var push = MARGIN_TOP - distFromTop;
                                if (push > 1) {
                                    bestEl.style.marginTop = Math.ceil(push) + 'px';
                                }
                            }
                        }
                    }
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

        const result = await removeTrailingBlankPages(Buffer.from(pdfBuffer));
        const durationMs = Date.now() - startTime;
        trackPdfGeneration(marginStrategy, durationMs, true, result.length);
        return result;
    } catch (error) {
        const durationMs = Date.now() - startTime;
        trackPdfGeneration(marginStrategy, durationMs, false);
        captureError(error instanceof Error ? error : new Error(String(error)), {
            tags: { service: 'pdf', operation: 'generatePdfFromHtml' },
            extra: { marginStrategy, durationMs },
        });
        throw error;
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
    locale: string = 'en',
    watermark: boolean = false
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
        'header-dark',
    ];

    // Only truly full-bleed templates (edge-to-edge colored backgrounds on page 1)
    const headerTemplates = [
        'header-diagonal-yellow',
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
        marginStrategy,
        watermark
    });

    // Generate PDF with smart pagination
    return generatePdfFromHtml(fullHtml, marginStrategy);
}

/**
 * Process a PDF generation request
 */
export async function processPdfRequest(request: PdfGenerateRequest): Promise<Buffer> {
    const { data, templateId, theme, translations, locale, watermark } = request;
    return renderResumePdf(data, templateId, theme, translations, locale || 'en', watermark || false);
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

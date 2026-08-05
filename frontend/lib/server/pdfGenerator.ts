/**
 * PDF generation on Cloudflare Workers via Browser Rendering.
 *
 * Ported from backend/src/services/pdfGeneratorService.ts (Puppeteer on Cloud
 * Run). Differences:
 * - @cloudflare/puppeteer against the BROWSER binding instead of local Chrome
 * - session reuse via sessions()/connect() + keep_alive instead of a process
 *   -wide browser singleton (worker isolates are ephemeral)
 * - no queue: Browser Rendering enforces its own concurrency limits; launch
 *   failures surface as 503s in the route
 *
 * Template HTML comes from the same generated React bundle the backend used
 * (lib/pdf-templates/reactTemplates.js) — the 16 browser-preview components
 * rendered with renderToStaticMarkup.
 */
import puppeteer, { type BrowserWorker, type Browser } from '@cloudflare/puppeteer';
import { PDFDocument, PDFName, PDFRawStream, PDFArray, PDFRef, decodePDFRawStream } from 'pdf-lib';
import {
  hasReactTemplate,
  renderReactTemplate,
} from '@/lib/pdf-templates/reactTemplates';
import {
  wrapHtml,
  getTranslations,
  sanitizeLocale,
  type MarginStrategy,
  type PdfTranslations,
} from './pdfHtml';

const RTL_LOCALES = ['ar', 'he', 'fa', 'ur'];

// customThemeColor is interpolated into the sidebar backdrop's style attribute
// by the template bundle — only hex (optionally "primary|secondary") may pass.
const SAFE_THEME_COLOR = /^#[0-9a-fA-F]{3,8}(\|#[0-9a-fA-F]{3,8})?$/;

// The rendered page runs with network access in Browser Rendering. Resume data
// is user-controlled, so only the font CDNs (and inline data: assets) may load —
// everything else is blocked to prevent SSRF/exfiltration from the renderer.
const ALLOWED_REQUEST_HOSTS = new Set(['fonts.googleapis.com', 'fonts.gstatic.com']);

function isAllowedPageRequest(url: string): boolean {
  if (url.startsWith('data:') || url === 'about:blank') return true;
  try {
    return ALLOWED_REQUEST_HOSTS.has(new URL(url).hostname);
  } catch {
    return false;
  }
}

// Keep the browser alive briefly between requests so bursts of downloads
// reuse one session instead of paying ~2s launch latency each time.
const KEEP_ALIVE_MS = 60_000;

export interface PdfGenerateRequest {
  data: Record<string, unknown> & {
    personalInfo?: { fullName?: string };
    fonts?: { heading?: string; body?: string };
    customThemeColor?: string;
  };
  templateId: string;
  theme: Record<string, unknown>;
  translations?: PdfTranslations;
  locale?: string;
  watermark?: boolean;
}

/** Reuse a free Browser Rendering session when one exists, else launch. */
async function getBrowser(endpoint: BrowserWorker): Promise<Browser> {
  try {
    const sessions = await puppeteer.sessions(endpoint);
    const free = sessions.find((s) => !s.connectionId);
    if (free) {
      return await puppeteer.connect(endpoint, free.sessionId);
    }
  } catch {
    // Session listing/reconnect is a fast path only — fall through to launch
  }
  return puppeteer.launch(endpoint, { keep_alive: KEEP_ALIVE_MS });
}

/**
 * Remove trailing blank pages (no text/image/XObject operators) — the smart
 * pagination margins occasionally push a final page that is empty.
 */
async function removeTrailingBlankPages(pdfBytes: Uint8Array): Promise<Uint8Array> {
  try {
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const pages = pdfDoc.getPages();
    if (pages.length <= 1) return pdfBytes;

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

      const streamRefs: PDFRef[] = [];
      if (contentsEntry instanceof PDFRef) {
        streamRefs.push(contentsEntry);
      } else if (contentsEntry instanceof PDFArray) {
        for (let k = 0; k < contentsEntry.size(); k++) {
          const entry = contentsEntry.get(k);
          if (entry instanceof PDFRef) streamRefs.push(entry);
        }
      }

      let decoded = '';
      for (const ref of streamRefs) {
        const obj = context.lookup(ref);
        if (obj instanceof PDFRawStream) {
          const bytes = decodePDFRawStream(obj).decode();
          decoded += new TextDecoder('latin1').decode(bytes);
        }
      }

      // Text (Tj/TJ) or images/XObjects (Do) are the only meaningful content;
      // background fills (re f) are just page backgrounds.
      if (!/\b(Tj|TJ|Do)\b/.test(decoded)) {
        pdfDoc.removePage(i);
        removed++;
        continue;
      }
      break;
    }

    if (removed === 0) return pdfBytes;
    return await pdfDoc.save();
  } catch {
    return pdfBytes;
  }
}

/** JS pagination pass — verbatim port of the backend script (PagedPreview.tsx logic). */
function paginationScript(marginStrategy: MarginStrategy): string {
  return `(function() {
            try {
            var A4_HEIGHT = 1123;
            var MARGIN_TOP = 40;
            var MARGIN_BOTTOM = 40;

            var strategy = '${marginStrategy}';
            var hasPageCssMargins = (strategy === 'standard');

            var firstPageMaxHeight = A4_HEIGHT - MARGIN_BOTTOM;
            var subsequentPageMaxHeight = A4_HEIGHT - MARGIN_TOP - MARGIN_BOTTOM;

            var firstPagePhysical = hasPageCssMargins ? firstPageMaxHeight : A4_HEIGHT;
            var subsequentPagePhysical = hasPageCssMargins ? subsequentPageMaxHeight : A4_HEIGHT;

            var getPageContentBottom = function(y) {
                if (y < firstPagePhysical) {
                    return firstPageMaxHeight;
                }
                var yMinusFirst = y - firstPagePhysical;
                var subPageIdx = Math.floor(yMinusFirst / subsequentPagePhysical);
                var pageStart = firstPagePhysical + subPageIdx * subsequentPagePhysical;
                return pageStart + subsequentPagePhysical - MARGIN_BOTTOM;
            };

            var getNextPageStart = function(y) {
                if (y < firstPagePhysical) {
                    return firstPagePhysical;
                }
                var yMinusFirst = y - firstPagePhysical;
                var subPageIdx = Math.floor(yMinusFirst / subsequentPagePhysical);
                return firstPagePhysical + (subPageIdx + 1) * subsequentPagePhysical;
            };

            var container = document.querySelector('.resume-page') || document.body;

            var elements = Array.from(container.querySelectorAll(
                '[data-paginate], .section-header, .resume-entry, h2, h3, ' +
                '.credential-item, .language-item, .skill-item, ' +
                '[class*="entry"], [class*="item"]'
            ));

            var cumulativeOffset = 0;
            var offsetHistory = [];
            var updates = [];

            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];
                var rect = element.getBoundingClientRect();
                var rawTop = rect.top;
                var height = rect.height;

                if (offsetHistory.length > 0) {
                    var prevEntry = offsetHistory[offsetHistory.length - 1];
                    var prevTop = prevEntry.originalTop;
                    if (rawTop < prevTop - 50) {
                        var bestHistoricalOffset = offsetHistory.reduce(function(min, entry) {
                            if (entry.originalTop <= rawTop + 5) {
                                return Math.max(min, entry.offsetAtThatPoint);
                            }
                            return min;
                        }, 0);
                        cumulativeOffset = bestHistoricalOffset;
                    }
                }

                var adjustedTop = rawTop + cumulativeOffset;
                var adjustedBottom = adjustedTop + height;

                offsetHistory.push({
                    originalTop: rawTop,
                    offsetAtThatPoint: cumulativeOffset
                });

                if (height > A4_HEIGHT * 0.9) {
                    continue;
                }

                var pageContentBottom = getPageContentBottom(adjustedTop);
                var shouldPush = adjustedBottom > pageContentBottom;

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
                    var contentTopOffset = hasPageCssMargins ? 0 : MARGIN_TOP;
                    var targetY = nextStart + 1 + contentTopOffset;
                    var pushDistance = targetY - rawTop - cumulativeOffset;

                    if (pushDistance > 0) {
                        updates.push({ element: element, pushPx: pushDistance });
                        cumulativeOffset += pushDistance;
                        offsetHistory[offsetHistory.length - 1].offsetAtThatPoint = cumulativeOffset;
                    }
                }
            }

                for (var j = 0; j < updates.length; j++) {
                    updates[j].element.style.marginTop = updates[j].pushPx + 'px';
                }

                if (!hasPageCssMargins) {
                    var totalHeight = container.scrollHeight || container.offsetHeight;
                    var totalPages = Math.ceil(totalHeight / A4_HEIGHT);

                    for (var pageIdx = 1; pageIdx < totalPages; pageIdx++) {
                        var pageTopPx = pageIdx * A4_HEIGHT;
                        var allEls = container.querySelectorAll('*');
                        var bestEl = null;
                        var bestTop = Infinity;

                        for (var k = 0; k < allEls.length; k++) {
                            var el = allEls[k];
                            if (el.offsetParent === null && el !== container) continue;
                            if (el.style.marginTop && parseFloat(el.style.marginTop) > 0) continue;

                            var elRect = el.getBoundingClientRect();
                            var elTop = elRect.top;
                            var dist = elTop - pageTopPx;

                            if (dist >= -5 && dist < 30 && elTop < bestTop) {
                                bestTop = elTop;
                                bestEl = el;
                            }
                        }

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
            }
        })()`;
}

/** Render a full HTML document to a paginated A4 PDF. */
export async function generatePdfFromHtml(
  endpoint: BrowserWorker,
  html: string,
  marginStrategy: MarginStrategy = 'standard'
): Promise<Uint8Array> {
  const browser = await getBrowser(endpoint);
  let pageClosed = false;
  const page = await browser.newPage();

  try {
    await page.setViewport({ width: 794, height: 1123 }); // A4 at 96 DPI

    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (isAllowedPageRequest(req.url())) {
        void req.continue();
      } else {
        void req.abort();
      }
    });

    await page.setContent(html, { waitUntil: 'domcontentloaded', timeout: 15000 });

    // Wait for Google Fonts to finish loading, capped at 10s.
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

    await page.evaluate(paginationScript(marginStrategy));

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
    });

    await page.close();
    pageClosed = true;

    return removeTrailingBlankPages(new Uint8Array(pdfBuffer));
  } finally {
    if (!pageClosed) {
      await page.close().catch(() => {});
    }
    // Disconnect (not close): keep_alive lets the next request reuse the session
    browser.disconnect();
  }
}

/** Render resume data through the shared React templates to a PDF. */
export async function renderResumePdf(
  endpoint: BrowserWorker,
  request: PdfGenerateRequest
): Promise<Uint8Array> {
  const { data, templateId, theme, translations, watermark = false } = request;
  const locale = sanitizeLocale(request.locale);

  if (!hasReactTemplate(templateId)) {
    throw new Error(`Unknown template id: ${templateId}`);
  }

  // The template bundle interpolates this into a raw style attribute
  if (typeof data.customThemeColor === 'string' && !SAFE_THEME_COLOR.test(data.customThemeColor)) {
    delete data.customThemeColor;
  }

  const t = getTranslations(translations);
  const templateHtml = renderReactTemplate(templateId, data, theme, {
    ...t,
    isRtl: RTL_LOCALES.includes(locale),
  });

  // Margin strategy per template family (mirrors the backend lists)
  const sidebarTemplates = ['sidebar-dark-navy', 'sidebar-narrow-yellow', 'sidebar-monogram', 'header-dark'];
  const fullBleedTemplates = ['header-diagonal-yellow'];

  let marginStrategy: MarginStrategy = 'standard';
  if (sidebarTemplates.includes(templateId)) marginStrategy = 'sidebar';
  else if (fullBleedTemplates.includes(templateId)) marginStrategy = 'full-bleed';

  const fonts = data.fonts || {};
  const fullHtml = wrapHtml(templateHtml, {
    headingFont: fonts.heading || 'Inter',
    bodyFont: fonts.body || 'Inter',
    locale,
    marginStrategy,
    watermark,
  });

  return generatePdfFromHtml(endpoint, fullHtml, marginStrategy);
}

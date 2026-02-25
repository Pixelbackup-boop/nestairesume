/**
 * Font Cache for PDF Generation
 * Pre-fetches Google Fonts at startup and caches them as base64 @font-face rules.
 * Eliminates network requests during PDF rendering.
 */

import { fontPresets } from './helpers';
import logger from '../../../lib/logger';

const fontStyleCache = new Map<string, string>();

const ARABIC_FONT = {
    name: 'Noto Sans Arabic',
    googleFont: 'Noto+Sans+Arabic:wght@400;500;600;700'
};

// Chrome UA to get woff2 format (smallest)
const CHROME_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

async function fetchAndCacheFont(fontName: string, googleFont: string): Promise<void> {
    const url = `https://fonts.googleapis.com/css2?family=${googleFont}&display=swap`;

    const cssResponse = await fetch(url, {
        headers: { 'User-Agent': CHROME_UA }
    });

    if (!cssResponse.ok) {
        logger.warn({ fontName, status: cssResponse.status }, 'Failed to fetch CSS for font');
        return;
    }

    let css = await cssResponse.text();

    // Find all font file URLs and replace with base64 data URIs
    const urlRegex = /url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g;
    const matches = [...css.matchAll(urlRegex)];

    for (const match of matches) {
        const fontUrl = match[1];
        try {
            const fontResponse = await fetch(fontUrl);
            if (fontResponse.ok) {
                const buffer = Buffer.from(await fontResponse.arrayBuffer());
                const base64 = buffer.toString('base64');
                const mime = fontUrl.includes('.woff2') ? 'font/woff2' : 'font/woff';
                css = css.replace(fontUrl, `data:${mime};base64,${base64}`);
            }
        } catch {
            logger.warn({ fontUrl }, 'Failed to download font file');
        }
    }

    fontStyleCache.set(fontName, css);
}

/**
 * Initialize the font cache. Call once at server startup.
 * Downloads all Google Fonts and converts to base64 for offline PDF rendering.
 */
export async function initFontCache(): Promise<void> {
    const start = Date.now();
    logger.info('Caching Google Fonts');

    const fontsToCache = [
        ...fontPresets.filter(f => f.googleFont).map(f => ({ name: f.name, googleFont: f.googleFont! })),
        ARABIC_FONT
    ];

    await Promise.allSettled(
        fontsToCache.map(f => fetchAndCacheFont(f.name, f.googleFont))
    );

    logger.info({ cached: fontStyleCache.size, total: fontsToCache.length, durationMs: Date.now() - start }, 'Font cache initialized');
}

/**
 * Get cached @font-face CSS for a font. Returns null for system fonts.
 */
export function getCachedFontStyles(fontName: string): string | null {
    return fontStyleCache.get(fontName) || null;
}

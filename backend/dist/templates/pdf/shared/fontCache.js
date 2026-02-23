"use strict";
/**
 * Font Cache for PDF Generation
 * Pre-fetches Google Fonts at startup and caches them as base64 @font-face rules.
 * Eliminates network requests during PDF rendering.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.initFontCache = initFontCache;
exports.getCachedFontStyles = getCachedFontStyles;
const helpers_1 = require("./helpers");
const fontStyleCache = new Map();
const ARABIC_FONT = {
    name: 'Noto Sans Arabic',
    googleFont: 'Noto+Sans+Arabic:wght@400;500;600;700'
};
// Chrome UA to get woff2 format (smallest)
const CHROME_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
async function fetchAndCacheFont(fontName, googleFont) {
    const url = `https://fonts.googleapis.com/css2?family=${googleFont}&display=swap`;
    const cssResponse = await fetch(url, {
        headers: { 'User-Agent': CHROME_UA }
    });
    if (!cssResponse.ok) {
        console.warn(`[FontCache] Failed to fetch CSS for ${fontName}: ${cssResponse.status}`);
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
        }
        catch {
            console.warn(`[FontCache] Failed to download: ${fontUrl}`);
        }
    }
    fontStyleCache.set(fontName, css);
}
/**
 * Initialize the font cache. Call once at server startup.
 * Downloads all Google Fonts and converts to base64 for offline PDF rendering.
 */
async function initFontCache() {
    const start = Date.now();
    console.log('[FontCache] Caching Google Fonts...');
    const fontsToCache = [
        ...helpers_1.fontPresets.filter(f => f.googleFont).map(f => ({ name: f.name, googleFont: f.googleFont })),
        ARABIC_FONT
    ];
    await Promise.allSettled(fontsToCache.map(f => fetchAndCacheFont(f.name, f.googleFont)));
    console.log(`[FontCache] Cached ${fontStyleCache.size}/${fontsToCache.length} fonts in ${Date.now() - start}ms`);
}
/**
 * Get cached @font-face CSS for a font. Returns null for system fonts.
 */
function getCachedFontStyles(fontName) {
    return fontStyleCache.get(fontName) || null;
}
//# sourceMappingURL=fontCache.js.map
/**
 * Font Cache for PDF Generation
 * Pre-fetches Google Fonts at startup and caches them as base64 @font-face rules.
 * Eliminates network requests during PDF rendering.
 */
/**
 * Initialize the font cache. Call once at server startup.
 * Downloads all Google Fonts and converts to base64 for offline PDF rendering.
 */
export declare function initFontCache(): Promise<void>;
/**
 * Get cached @font-face CSS for a font. Returns null for system fonts.
 */
export declare function getCachedFontStyles(fontName: string): string | null;
//# sourceMappingURL=fontCache.d.ts.map
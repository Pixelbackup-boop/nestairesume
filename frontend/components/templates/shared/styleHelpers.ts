// Style Helper Functions for Templates
// Re-exports from themes.ts + additional template-specific helpers

import { CSSProperties } from 'react';
import { getBackgroundStyle, getFontFamily, fontSizes as themeFontSizes } from '@/lib/themes';
import { ThemeColor } from '@/lib/themes';

// Re-export from themes.ts for convenience
export { getBackgroundStyle, getFontFamily };
export const fontSizes = themeFontSizes;

/**
 * Font size configuration that respects user's size preference (small/medium/large)
 * Each template should use these values instead of hardcoded pixel values.
 *
 * Usage:
 *   const sizeConfig = fontSizes[fonts?.size || 'medium'];
 *   const fs = getScaledFontSizes(sizeConfig, scale);
 *   <h1 style={{ fontSize: fs.name }}>...</h1>
 *   <h3 style={{ fontSize: fs.sectionHeading }}>...</h3>
 *   <p style={{ fontSize: fs.body }}>...</p>
 */
export interface ScaledFontSizes {
    // Header elements
    name: string;           // Main name in header (e.g., 32px -> 18px scaled)
    jobTitle: string;       // Job title below name (e.g., 14px -> 10px scaled)

    // Section headings
    sectionHeading: string; // Section headers like "EXPERIENCE" (e.g., 14px -> 10px scaled)
    sidebarHeading: string; // Sidebar section headers (e.g., 13px -> 9px scaled)

    // Content text
    entryTitle: string;     // Job titles, degree names (e.g., 12px -> 8px scaled)
    body: string;           // Regular body text (e.g., 11px -> 7px scaled)
    small: string;          // Dates, locations, small text (e.g., 10px -> 6px scaled)
    tiny: string;           // Very small text (e.g., 9px -> 5px scaled)
}

/**
 * Get scaled font sizes based on user's size preference AND scale factor.
 *
 * @param sizeConfig - The user's font size preference from fontSizes[small|medium|large]
 * @param scale - Scale factor (1 = full size, <1 = thumbnail/preview)
 */
// Cache for getScaledFontSizes — very few unique combinations (3 sizes × 2 scales)
const fontSizeCache = new Map<string, ScaledFontSizes>();

export const getScaledFontSizes = (
    sizeConfig: { base: string; heading: string; subheading: string },
    scale: number
): ScaledFontSizes => {
    const cacheKey = `${sizeConfig.base}-${scale < 1 ? 'sm' : 'lg'}`;
    const cached = fontSizeCache.get(cacheKey);
    if (cached) return cached;

    // Parse the base sizes
    const baseSize = parseInt(sizeConfig.base);      // 12, 14, or 16

    // Calculate multiplier based on user preference (medium is baseline)
    // small: 12/14 = 0.857, medium: 14/14 = 1, large: 16/14 = 1.143
    const sizeMult = baseSize / 14;

    // Scale multiplier for thumbnails
    const scaleMult = scale < 1 ? 0.6 : 1;

    // Combined multiplier
    const mult = sizeMult * scaleMult;

    // Calculate sizes with minimum bounds
    const calcSize = (normalPx: number, minPx: number = 5): string => {
        const size = Math.max(minPx, Math.round(normalPx * mult));
        return `${size}px`;
    };

    const result: ScaledFontSizes = {
        name: calcSize(32, 12),           // 32px normal, 12px minimum
        jobTitle: calcSize(14, 8),        // 14px normal
        sectionHeading: calcSize(14, 8),  // 14px normal
        sidebarHeading: calcSize(13, 7),  // 13px normal
        entryTitle: calcSize(12, 7),      // 12px normal
        body: calcSize(11, 6),            // 11px normal
        small: calcSize(10, 5),           // 10px normal
        tiny: calcSize(9, 5),             // 9px normal
    };

    fontSizeCache.set(cacheKey, result);
    return result;
};

/**
 * Get scaled font size based on scale factor.
 * Useful for preview thumbnails that need smaller text.
 */
export const getScaledSize = (normalSize: string, scale: number, smallSize?: string): string => {
    if (scale < 1 && smallSize) return smallSize;
    return normalSize;
};

/**
 * Get image border radius based on shape setting.
 */
export const getImageBorderRadius = (shape?: 'circle' | 'rounded' | 'square'): string => {
    switch (shape) {
        case 'circle': return '50%';
        case 'rounded': return '8px';
        case 'square':
        default: return '0';
    }
};

/**
 * Format ID type for display.
 */
export const formatIdType = (idType?: string): string => {
    switch (idType) {
        case 'id': return 'ID';
        case 'passport': return 'Passport';
        case 'driving_license': return 'Driving License';
        default: return '';
    }
};

/**
 * Common section heading styles.
 */
export const getSectionHeadingStyle = (
    theme: ThemeColor,
    headingFont: string,
    scale: number,
    options?: { uppercase?: boolean; withBorder?: boolean }
): CSSProperties => ({
    color: theme.heading,
    fontFamily: headingFont,
    fontSize: scale < 1 ? '10px' : '13px',
    fontWeight: 700,
    textTransform: options?.uppercase !== false ? 'uppercase' : 'none',
    letterSpacing: '0.05em',
    ...(options?.withBorder && {
        borderBottom: `1px solid ${theme.accent}`,
        paddingBottom: '4px',
        marginBottom: '8px',
    }),
});

/**
 * Scale-aware padding helper.
 */
export const getScaledPadding = (scale: number, normalPx: number, smallPx?: number): string => {
    return `${scale < 1 ? (smallPx ?? normalPx * 0.4) : normalPx}px`;
};

/**
 * Scale-aware image size helper.
 */
export const getScaledImageSize = (scale: number, normalPx: number, smallPx?: number): string => {
    return `${scale < 1 ? (smallPx ?? normalPx * 0.6) : normalPx}px`;
};

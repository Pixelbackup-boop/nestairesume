/**
 * Color utility functions for dual-color templates with auto-contrast text.
 * Uses WCAG 2.0 relative luminance calculation for accessibility.
 */

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface DualColor {
  primary: string;   // sidebar background
  secondary: string; // accent color
}

/**
 * Convert hex color to RGB values
 */
export function hexToRgb(hex: string): RGB {
  const cleanHex = hex.replace('#', '');
  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(cleanHex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

/**
 * Calculate relative luminance per WCAG 2.0
 * Human eyes are most sensitive to green (0.7152), least to blue (0.0722)
 */
export function getLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  const [rs, gs, bs] = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Return appropriate text color (dark or light) based on background luminance.
 * Threshold 0.179 derives from WCAG 2.0's 4.5:1 contrast ratio requirement.
 */
export function getContrastText(bgHex: string): string {
  const luminance = getLuminance(bgHex);
  return luminance > 0.179 ? '#1e293b' : '#f8fafc'; // slate-800 or slate-50
}

/**
 * Parse dual color string "primary|secondary" format.
 * Used by templates that support both sidebar background and accent color.
 */
export function parseDualColor(
  colorStr: string | undefined,
  defaults: DualColor = { primary: '#0f172a', secondary: '#facc15' }
): DualColor {
  if (!colorStr) return defaults;

  const parts = colorStr.split('|');

  // If only single color provided, use it as accent (backwards compatible)
  if (parts.length === 1) {
    return {
      primary: defaults.primary,
      secondary: parts[0] || defaults.secondary,
    };
  }

  return {
    primary: parts[0] || defaults.primary,
    secondary: parts[1] || defaults.secondary,
  };
}

/**
 * Convert hex to rgba string with opacity
 */
export function hexToRgba(hex: string, opacity: number): string {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/**
 * PDF Template Helpers
 * Mirrors frontend theme generation and styling utilities
 */
import { PdfTheme, PdfBackgroundSettings } from '../../../types/pdf';
export declare const hexToRgb: (hex: string) => {
    r: number;
    g: number;
    b: number;
} | null;
/**
 * Calculate relative luminance per WCAG 2.0
 */
export declare const getLuminance: (hex: string) => number;
/**
 * Return appropriate text color based on background luminance.
 */
export declare const getContrastText: (bgHex: string) => string;
/**
 * Convert hex to rgba string with opacity
 */
export declare const hexToRgba: (hex: string, opacity: number) => string;
export interface DualColor {
    primary: string;
    secondary: string;
}
/**
 * Parse dual color string "primary|secondary" format.
 */
export declare const parseDualColor: (colorStr: string | undefined, defaults?: DualColor) => DualColor;
export declare const generateThemeFromPrimary: (primaryHex: string) => PdfTheme;
export declare const themePresets: Record<string, PdfTheme>;
export interface FontPreset {
    name: string;
    fontFamily: string;
    googleFont?: string;
}
export declare const fontPresets: FontPreset[];
export declare const getFontFamily: (fontName: string) => string;
export declare const getGoogleFontUrl: (fontName: string) => string | null;
export declare const fontSizes: {
    small: {
        name: string;
        base: string;
        heading: string;
        subheading: string;
    };
    medium: {
        name: string;
        base: string;
        heading: string;
        subheading: string;
    };
    large: {
        name: string;
        base: string;
        heading: string;
        subheading: string;
    };
};
export declare const getBackgroundCSS: (bg?: PdfBackgroundSettings) => string;
export declare const getImageBorderRadius: (shape?: "circle" | "rounded" | "square") => string;
export declare const formatIdType: (idType?: string) => string;
export declare const escapeHtml: (text: string | undefined | null) => string;
export declare const formatDescription: (text: string | undefined | null) => string;
export type IconName = 'email' | 'phone' | 'location' | 'linkedin' | 'website' | 'github' | 'calendar' | 'building' | 'briefcase' | 'graduation-cap' | 'award' | 'users' | 'lightbulb' | 'globe' | 'star' | 'heart' | 'music' | 'camera' | 'plane' | 'book' | 'coffee' | 'code' | 'zap' | 'flag' | 'user' | 'wrench' | 'palette' | 'tent' | 'languages';
export declare const getIconSVG: (name: IconName, color?: string, size?: number) => string;
/**
 * Convert language proficiency string to numeric level (0-100)
 * Handles cases where level might be undefined/missing
 */
export declare const getLanguageLevel: (lang: {
    level?: number;
    proficiency?: string;
}) => number;
//# sourceMappingURL=helpers.d.ts.map
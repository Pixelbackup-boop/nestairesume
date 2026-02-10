/**
 * PDF Template Helpers
 * Mirrors frontend theme generation and styling utilities
 */

import { PdfTheme, PdfBackgroundSettings, BackgroundPattern } from '../../../types/pdf';

// --- Color Helpers ---

export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

/**
 * Calculate relative luminance per WCAG 2.0
 */
export const getLuminance = (hex: string): number => {
    const rgb = hexToRgb(hex);
    if (!rgb) return 0;
    const [rs, gs, bs] = [rgb.r, rgb.g, rgb.b].map((v) => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

/**
 * Return appropriate text color based on background luminance.
 */
export const getContrastText = (bgHex: string): string => {
    const luminance = getLuminance(bgHex);
    return luminance > 0.179 ? '#1e293b' : '#f8fafc';
};

/**
 * Convert hex to rgba string with opacity
 */
export const hexToRgba = (hex: string, opacity: number): string => {
    const rgb = hexToRgb(hex);
    if (!rgb) return `rgba(0, 0, 0, ${opacity})`;
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
};

export interface DualColor {
    primary: string;
    secondary: string;
}

/**
 * Parse dual color string "primary|secondary" format.
 */
export const parseDualColor = (
    colorStr: string | undefined,
    defaults: DualColor = { primary: '#0f172a', secondary: '#facc15' }
): DualColor => {
    if (!colorStr) return defaults;
    const parts = colorStr.split('|');
    if (parts.length === 1) {
        return { primary: defaults.primary, secondary: parts[0] || defaults.secondary };
    }
    return { primary: parts[0] || defaults.primary, secondary: parts[1] || defaults.secondary };
};

const adjustColor = (hex: string, amount: number): string => {
    let usePound = false;
    if (hex[0] === '#') {
        hex = hex.slice(1);
        usePound = true;
    }
    const num = parseInt(hex, 16);
    let r = (num >> 16) + amount;
    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    let b = ((num >> 8) & 0x00FF) + amount;
    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    let g = (num & 0x0000FF) + amount;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16).padStart(6, '0');
};

export const generateThemeFromPrimary = (primaryHex: string): PdfTheme => ({
    name: 'Custom',
    primary: primaryHex,
    secondary: adjustColor(primaryHex, 40),
    accent: adjustColor(primaryHex, 180),
    text: '#334155',
    background: '#ffffff',
    heading: adjustColor(primaryHex, -20),
});

// --- Preset Themes ---

export const themePresets: Record<string, PdfTheme> = {
    navy: { name: 'Navy Blue', primary: '#1e3a8a', secondary: '#3b82f6', accent: '#dbeafe', text: '#1f2937', background: '#ffffff', heading: '#111827' },
    emerald: { name: 'Emerald Green', primary: '#059669', secondary: '#34d399', accent: '#d1fae5', text: '#064e3b', background: '#ffffff', heading: '#065f46' },
    crimson: { name: 'Crimson Red', primary: '#be123c', secondary: '#fb7185', accent: '#ffe4e6', text: '#881337', background: '#ffffff', heading: '#9f1239' },
    purple: { name: 'Royal Purple', primary: '#7e22ce', secondary: '#a855f7', accent: '#f3e8ff', text: '#4b5563', background: '#ffffff', heading: '#581c87' },
    black: { name: 'Sleek Black', primary: '#18181b', secondary: '#52525b', accent: '#f4f4f5', text: '#18181b', background: '#ffffff', heading: '#000000' },
    teal: { name: 'Teal Ocean', primary: '#0f766e', secondary: '#14b8a6', accent: '#ccfbf1', text: '#334155', background: '#ffffff', heading: '#0f172a' },
    orange: { name: 'Orange Sunset', primary: '#c2410c', secondary: '#f97316', accent: '#ffedd5', text: '#431407', background: '#ffffff', heading: '#7c2d12' },
    indigo: { name: 'Indigo Night', primary: '#3730a3', secondary: '#6366f1', accent: '#e0e7ff', text: '#312e81', background: '#ffffff', heading: '#1e1b4b' },
    slate: { name: 'Slate Gray', primary: '#475569', secondary: '#94a3b8', accent: '#f1f5f9', text: '#334155', background: '#ffffff', heading: '#0f172a' },
    pink: { name: 'Berry Pink', primary: '#db2777', secondary: '#f472b6', accent: '#fce7f3', text: '#831843', background: '#ffffff', heading: '#9d174d' },
};

// --- Font Helpers ---

export interface FontPreset {
    name: string;
    fontFamily: string;
    googleFont?: string;
}

export const fontPresets: FontPreset[] = [
    { name: 'Inter', fontFamily: "'Inter', sans-serif", googleFont: 'Inter:wght@400;500;600;700' },
    { name: 'Roboto', fontFamily: "'Roboto', sans-serif", googleFont: 'Roboto:wght@400;500;700' },
    { name: 'Open Sans', fontFamily: "'Open Sans', sans-serif", googleFont: 'Open+Sans:wght@400;600;700' },
    { name: 'Lato', fontFamily: "'Lato', sans-serif", googleFont: 'Lato:wght@400;700' },
    { name: 'Poppins', fontFamily: "'Poppins', sans-serif", googleFont: 'Poppins:wght@400;500;600;700' },
    { name: 'Montserrat', fontFamily: "'Montserrat', sans-serif", googleFont: 'Montserrat:wght@400;500;600;700' },
    { name: 'Playfair Display', fontFamily: "'Playfair Display', serif", googleFont: 'Playfair+Display:wght@400;700' },
    { name: 'Merriweather', fontFamily: "'Merriweather', serif", googleFont: 'Merriweather:wght@400;700' },
    { name: 'Georgia', fontFamily: "Georgia, serif" },
    { name: 'Times New Roman', fontFamily: "'Times New Roman', Times, serif" },
    // Template-default fonts (used by specific templates, not shown in Design tab)
    { name: 'Titan One', fontFamily: "'Titan One', cursive", googleFont: 'Titan+One' },
    { name: 'Oswald', fontFamily: "'Oswald', sans-serif", googleFont: 'Oswald:wght@400;500;600;700' },
    { name: 'Roboto Slab', fontFamily: "'Roboto Slab', serif", googleFont: 'Roboto+Slab:wght@400;500;600;700' },
    { name: 'Roboto Condensed', fontFamily: "'Roboto Condensed', sans-serif", googleFont: 'Roboto+Condensed:wght@400;700' },
    { name: 'Source Sans Pro', fontFamily: "'Source Sans 3', sans-serif", googleFont: 'Source+Sans+3:wght@400;600;700' },
];

export const getFontFamily = (fontName: string): string => {
    const preset = fontPresets.find(f => f.name === fontName);
    return preset?.fontFamily || "'Inter', sans-serif";
};

export const getGoogleFontUrl = (fontName: string): string | null => {
    const preset = fontPresets.find(f => f.name === fontName);
    return preset?.googleFont ? `https://fonts.googleapis.com/css2?family=${preset.googleFont}&display=swap` : null;
};

// --- Font Sizes ---

export const fontSizes = {
    small: {
        name: 'Small',
        base: '12px',
        heading: '20px',
        subheading: '14px',
    },
    medium: {
        name: 'Medium',
        base: '14px',
        heading: '24px',
        subheading: '16px',
    },
    large: {
        name: 'Large',
        base: '16px',
        heading: '28px',
        subheading: '18px',
    },
};

/**
 * Get font scale factor based on size preference.
 * Matches frontend scaling logic:
 * Small (12px base) -> 0.857 (12/14)
 * Medium (14px base) -> 1.0 (14/14)
 * Large (16px base) -> 1.143 (16/14)
 */
export const getFontScale = (size?: 'small' | 'medium' | 'large'): number => {
    switch (size) {
        case 'small': return 0.857;
        case 'large': return 1.143;
        case 'medium':
        default: return 1.0;
    }
};

// --- Background Helpers ---

const getPatternSVG = (pattern: BackgroundPattern, color: string, opacity: number): string => {
    const opacityValue = opacity / 100;
    const patternColor = encodeURIComponent(color);

    switch (pattern) {
        case 'dots':
            return `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='${patternColor}' fill-opacity='${opacityValue}'/%3E%3C/svg%3E")`;
        case 'lines':
            return `url("data:image/svg+xml,%3Csvg width='100' height='8' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='0' y1='4' x2='100' y2='4' stroke='${patternColor}' stroke-opacity='${opacityValue}' stroke-width='1'/%3E%3C/svg%3E")`;
        case 'grid':
            return `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none'/%3E%3Cpath d='M40 0v40M0 40h40' stroke='${patternColor}' stroke-opacity='${opacityValue}' stroke-width='0.5'/%3E%3C/svg%3E")`;
        case 'diagonal':
            return `url("data:image/svg+xml,%3Csvg width='10' height='10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10L10 0' stroke='${patternColor}' stroke-opacity='${opacityValue}' stroke-width='0.5'/%3E%3C/svg%3E")`;
        case 'crosshatch':
            // Two diagonal lines crossing
            return `url("data:image/svg+xml,%3Csvg width='16' height='16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 16L16 0M0 0L16 16' stroke='${patternColor}' stroke-opacity='${opacityValue}' stroke-width='0.5'/%3E%3C/svg%3E")`;
        case 'chevron':
            // Arrow/V pattern
            return `url("data:image/svg+xml,%3Csvg width='24' height='12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 12L12 0L24 12' fill='none' stroke='${patternColor}' stroke-opacity='${opacityValue}' stroke-width='0.5'/%3E%3C/svg%3E")`;
        case 'hexagon':
            // Honeycomb pattern
            return `url("data:image/svg+xml,%3Csvg width='28' height='49' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14 0L28 8.5V25.5L14 34L0 25.5V8.5L14 0zM14 49L28 40.5V23.5' fill='none' stroke='${patternColor}' stroke-opacity='${opacityValue}' stroke-width='0.5'/%3E%3C/svg%3E")`;
        case 'waves':
            // Wavy horizontal lines
            return `url("data:image/svg+xml,%3Csvg width='40' height='12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 6C5 6 5 2 10 2S15 6 20 6S25 2 30 2S35 6 40 6' fill='none' stroke='${patternColor}' stroke-opacity='${opacityValue}' stroke-width='0.5'/%3E%3C/svg%3E")`;
        case 'diamond':
            // Small rhombus pattern
            return `url("data:image/svg+xml,%3Csvg width='16' height='16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 0L16 8L8 16L0 8Z' fill='none' stroke='${patternColor}' stroke-opacity='${opacityValue}' stroke-width='0.5'/%3E%3C/svg%3E")`;
        default:
            return 'none';
    }
};

export const getBackgroundCSS = (bg?: PdfBackgroundSettings): string => {
    if (!bg) return '';
    const baseColor = bg.color || '#ffffff';

    switch (bg.type) {
        case 'gradient':
            return `background: linear-gradient(${bg.gradientDirection || 'to bottom'}, ${baseColor}, ${bg.gradientEnd || '#f8fafc'});`;
        case 'pattern':
            if (bg.pattern && bg.pattern !== 'none') {
                const rgb = hexToRgb(baseColor);
                const brightness = rgb ? (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000 : 255;
                const patternColor = brightness > 128 ? '#000000' : '#ffffff';
                const patternSvg = getPatternSVG(bg.pattern, patternColor, bg.patternOpacity);
                return `background-color: ${baseColor}; background-image: ${patternSvg}; background-repeat: repeat; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important;`;
            }
            return `background-color: ${baseColor};`;
        case 'solid':
        default:
            return `background-color: ${baseColor};`;
    }
};

// --- Image Helpers ---

export const getImageBorderRadius = (shape?: 'circle' | 'rounded' | 'square'): string => {
    switch (shape) {
        case 'circle': return '50%';
        case 'rounded': return '8px';
        case 'square':
        default: return '0';
    }
};

// --- ID Type Formatting ---

export const formatIdType = (idType?: string): string => {
    switch (idType) {
        case 'id': return 'ID';
        case 'passport': return 'Passport';
        case 'driving_license': return 'Driving License';
        default: return '';
    }
};

// --- HTML Escaping ---

export const escapeHtml = (text: string | undefined | null): string => {
    if (!text) return '';
    const map: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
};

// Preserve newlines in descriptions
export const formatDescription = (text: string | undefined | null): string => {
    if (!text) return '';
    return escapeHtml(text).replace(/\n/g, '<br>');
};

// Format descriptions with proper bullet point alignment
export const formatDescriptionWithBullets = (text: string | undefined | null): string => {
    if (!text) return '';
    const escaped = escapeHtml(text);
    return escaped.split('\n').map(line => {
        const bulletMatch = line.match(/^([•\-·]\s*)(.*)/);
        if (bulletMatch) {
            return `<div style="display: flex;"><span style="flex-shrink: 0;">${bulletMatch[1]}</span><span>${bulletMatch[2]}</span></div>`;
        }
        return line ? `<div>${line}</div>` : '<div style="height: 0.5em;"></div>';
    }).join('');
};

// --- SVG Icons (Lucide Replication) ---

export type IconName = 'email' | 'phone' | 'location' | 'linkedin' | 'website' | 'github' | 'calendar' | 'building' | 'briefcase' | 'graduation-cap' | 'award' | 'users' | 'lightbulb' | 'globe' | 'star' | 'heart' | 'music' | 'camera' | 'plane' | 'book' | 'coffee' | 'code' | 'zap' | 'flag' | 'user' | 'wrench' | 'palette' | 'tent' | 'languages' | 'instagram' | 'x' | 'dribbble' | 'behance' | 'smartphone' | 'id-card' | 'monitor' | 'bike' | 'cooking-pot' | 'gamepad' | 'film' | 'book-open' | 'running' | 'swimming' | 'hiking' | 'football' | 'tennis' | 'yoga' | 'moon' | 'diamond' | 'link';

export const getIconSVG = (name: IconName, color: string = '#000000', size: number = 16, filled: boolean = false): string => {
    const paths: Record<IconName, string> = {
        email: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
        phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
        location: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
        linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
        website: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
        github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
        calendar: '<rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>',
        building: '<rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M16 14h.01"/>',
        briefcase: '<rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
        'graduation-cap': '<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
        award: '<circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>',
        users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
        lightbulb: '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-1 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
        globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
        star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
        heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
        music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
        camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
        plane: '<path d="M2 6s4-1 6-1 14 6 14 6l-2-2-12-8z"/><path d="M12 10a2 2 0 0 1-2-2"/><path d="M21 21s-6-14-6-14l-2 2 8 12z"/><path d="M3 3 21 21"/>',
        book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
        coffee: '<path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" x2="6" y1="1" y2="4"/><line x1="10" x2="10" y1="1" y2="4"/><line x1="14" x2="14" y1="1" y2="4"/>',
        code: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
        zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
        flag: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/>',
        user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
        wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
        palette: '<circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>',
        tent: '<path d="M3.5 21 14 3"/><path d="M20.5 21 10 3"/><path d="M15.5 21 12 15l-3.5 6"/><path d="M2 21h20"/>',
        languages: '<path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/>',
        instagram: '<rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>',
        x: '<path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/>', // Approximation of X logo using strokes
        dribbble: '<circle cx="12" cy="12" r="10"/><path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"/><path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"/><path d="M8.56 2.75c4.37 6 6 9.42 8 13.25"/>',
        behance: '<path d="M5 17V7h4a2 2 0 0 1 0 4H7v1h2a2 2 0 0 1 0 4H5"/><path d="M15 13h5a2.5 2.5 0 1 0-5 0v.5"/><path d="M16 9h4"/>',
        smartphone: '<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>',
        'id-card': '<rect width="20" height="14" x="2" y="5" rx="2"/><path d="M2 10h20"/><circle cx="8" cy="15" r="2"/><path d="M14 15h4"/>',
        monitor: '<rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>',
        bike: '<circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/>',
        'cooking-pot': '<path d="M2 12h20"/><path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"/><path d="m4 8 16-4"/>',
        gamepad: '<line x1="6" x2="10" y1="12" y2="12"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="15" x2="15.01" y1="13" y2="13"/><line x1="18" x2="18.01" y1="11" y2="11"/><rect width="20" height="12" x="2" y="6" rx="2"/>',
        film: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18"/><path d="M3 7.5h4"/><path d="M3 12h18"/><path d="M3 16.5h4"/><path d="M17 3v18"/><path d="M17 7.5h4"/><path d="M17 16.5h4"/>',
        'book-open': '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
        running: '<circle cx="13" cy="4" r="2"/><path d="m6 21 3-9 3 2"/><path d="m10 14-1-4 5-3"/><path d="m15 7 3 5 3-1"/>',
        swimming: '<circle cx="6" cy="6" r="2"/><path d="M8 8h6l-2 4"/><path d="M2 16c1.5-1 3-1.5 4.5-.5s3 1.5 4.5.5 3-1.5 4.5-.5 3 1.5 4.5.5"/><path d="M2 20c1.5-1 3-1.5 4.5-.5s3 1.5 4.5.5 3-1.5 4.5-.5 3 1.5 4.5.5"/>',
        hiking: '<circle cx="13" cy="4" r="2"/><path d="m7 21 3-10"/><path d="m10 11-1-4h5l2 5"/><line x1="18" x2="18" y1="3" y2="21"/>',
        football: '<circle cx="12" cy="12" r="10"/><path d="m12 8 4 3-1.5 5h-5L8 11z"/><path d="M12 2v6"/><path d="m20.5 7.5-5 3.5"/><path d="m3.5 7.5 5 3.5"/><path d="m5 18.5 4.5-2.5"/><path d="m19 18.5-4.5-2.5"/>',
        tennis: '<circle cx="17" cy="5" r="3"/><path d="M3 21 14 7"/><circle cx="5" cy="19" r="3"/>',
        yoga: '<circle cx="12" cy="4" r="2"/><path d="M4 20h16"/><path d="M8 20v-6l4-3 4 3v6"/><path d="M4 14h16"/>',
        moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
        diamond: '<path d="M12 2l10 10-10 10L2 12z"/>',
        link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    };

    const path = paths[name] || paths.star;

    return `
        <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${filled ? color : 'none'}" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
            ${path}
        </svg>
    `;
};

// --- Language Level Helpers ---

/**
 * Convert language proficiency string to numeric level (0-100)
 * Handles cases where level might be undefined/missing
 */
export const getLanguageLevel = (lang: { level?: number; proficiency?: string }): number => {
    // If level exists and is valid, use it
    if (typeof lang.level === 'number' && !isNaN(lang.level)) {
        return lang.level;
    }

    // Convert proficiency string to numeric level
    const proficiencyMap: Record<string, number> = {
        'native': 100,
        'fluent': 85,
        'advanced': 70,
        'intermediate': 50,
        'basic': 30,
    };

    const proficiency = (lang.proficiency || '').toLowerCase();
    return proficiencyMap[proficiency] || 50; // Default to 50 if unknown
};

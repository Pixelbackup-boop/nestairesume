/**
 * PDF Template Helpers
 * Mirrors frontend theme generation and styling utilities
 */

import { PdfTheme, PdfBackgroundSettings, BackgroundPattern } from '../../../types/pdf';

// --- Color Helpers ---

const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
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
        case 'driving_license': return 'License';
        default: return '';
    }
};

// --- HTML Escaping ---

export const escapeHtml = (text: string): string => {
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
export const formatDescription = (text: string): string => {
    return escapeHtml(text).replace(/\n/g, '<br>');
};

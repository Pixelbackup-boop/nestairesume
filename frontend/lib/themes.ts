import type { BackgroundSettings } from "../store/useResumeStore";

export type ThemeColor = {
    name: string;
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    background: string;
    heading: string;
    id?: string;
};

// --- Helper Functions ---

// Helper: Hex to RGB
const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

// Helper: Lighten/Darken color (amount: -100 to 100)
const adjustColor = (hex: string, amount: number) => {
    let usePound = false;
    if (hex[0] === "#") {
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

    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16).padStart(6, '0');
};

export const generateTheme = (primaryHex: string): ThemeColor => {
    return {
        name: 'Custom',
        primary: primaryHex,
        secondary: adjustColor(primaryHex, 40),
        accent: adjustColor(primaryHex, 180),
        text: '#334155',
        background: '#ffffff',
        heading: adjustColor(primaryHex, -20),
    };
};

// --- Data Definitions ---

// --- Data Definitions ---

export type LayoutCategory = 'Professional' | 'Modern' | 'Simple' | 'Creative';

export interface LayoutConfig {
    id: string;
    baseLayout: 'classic' | 'sidebar' | 'header' | 'minimal' | 'creative';
    name: string;
    description: string;
    category: LayoutCategory;
    // Structural Parameters
    sidebarPos?: 'left' | 'right'; // For sidebar layout
    headerAlignment?: 'left' | 'center' | 'right';
    sectionSpacing: 'compact' | 'normal' | 'spacious';
    margins: 'compact' | 'normal' | 'wide';
    contentOrder: string[]; // E.g., ['summary', 'experience', 'education']
}

// Base layouts (The actual React components)
export const baseLayouts = [
    { id: 'classic', name: 'Classic' },
    { id: 'sidebar', name: 'Sidebar' },
    { id: 'header', name: 'Header' },
    { id: 'minimal', name: 'Minimal' },
    { id: 'creative', name: 'Creative' },
];

const generateLayouts = (): LayoutConfig[] => {
    const layouts: LayoutConfig[] = [];
    const spacings = ['compact', 'normal', 'spacious'] as const;
    const margins = ['compact', 'normal', 'wide'] as const;
    const alignments = ['left', 'center', 'right'] as const;

    // 1. Classic Variations (10) - Professional
    spacings.forEach((spacing) => {
        alignments.forEach((align) => {
            layouts.push({
                id: `classic-${spacing}-${align}`,
                baseLayout: 'classic',
                name: `Classic ${spacing === 'compact' ? 'Condensed' : spacing === 'spacious' ? 'Air' : ''} ${align === 'center' ? 'Centered' : ''}`,
                description: `Traditional layout with ${spacing} spacing and ${align} alignment.`,
                category: 'Professional',
                sectionSpacing: spacing,
                margins: 'normal',
                headerAlignment: align,
                contentOrder: ['summary', 'experience', 'education', 'skills']
            });
        });
    });
    // Add a specific 'Classic Inverse' order
    layouts.push({
        id: `classic-education-first`,
        baseLayout: 'classic',
        name: 'Classic Academic',
        description: 'Education listed before experience.',
        category: 'Professional',
        sectionSpacing: 'normal',
        margins: 'normal',
        headerAlignment: 'left',
        contentOrder: ['summary', 'education', 'experience', 'skills']
    });

    // 2. Sidebar Variations (12) - Modern
    ['left', 'right'].forEach((side) => {
        spacings.forEach((spacing) => {
            ['normal', 'compact'].forEach((margin) => {
                layouts.push({
                    id: `sidebar-${side}-${spacing}-${margin}`,
                    baseLayout: 'sidebar',
                    name: `${side === 'left' ? 'Left' : 'Right'} Sidebar ${spacing === 'compact' ? 'Dense' : ''}`,
                    description: `${side === 'left' ? 'Left' : 'Right'} sidebar with ${spacing} spacing.`,
                    category: 'Modern',
                    sidebarPos: side as 'left' | 'right',
                    sectionSpacing: spacing,
                    margins: margin as 'normal' | 'compact',
                    contentOrder: ['skills', 'education'] // Sidebar logic might handle this differently
                });
            });
        });
    });

    // 3. Header Variations (9) - Modern
    alignments.forEach(align => {
        spacings.forEach(spacing => {
            layouts.push({
                id: `header-${align}-${spacing}`,
                baseLayout: 'header',
                name: `Bold ${align} ${spacing === 'spacious' ? 'Open' : ''}`,
                description: `Bold header aligned ${align} with ${spacing} spacing.`,
                category: 'Modern',
                headerAlignment: align,
                sectionSpacing: spacing,
                margins: 'normal',
                contentOrder: ['summary', 'experience', 'education']
            });
        });
    });

    // 4. Minimal Variations (10) - Simple
    // Minimal relies heavily on spacing and font weights (handled by theme), but we can vary structure
    spacings.forEach(spacing => {
        margins.forEach(margin => {
            layouts.push({
                id: `minimal-${spacing}-${margin}`,
                baseLayout: 'minimal',
                name: `Minimal ${spacing} ${margin === 'wide' ? 'Wide' : ''}`,
                description: `Clean minimalist design with ${spacing} spacing.`,
                category: 'Simple',
                sectionSpacing: spacing,
                margins: margin,
                headerAlignment: 'left',
                contentOrder: ['summary', 'experience', 'education']
            });
        });
    });

    // 5. Creative Variations (9) - Creative
    // Creative can have different emphasis
    alignments.forEach(align => {
        spacings.forEach(spacing => {
            layouts.push({
                id: `creative-${align}-${spacing}`,
                baseLayout: 'creative',
                name: `Creative ${align} ${spacing}`,
                description: `Artistic layout aligned ${align}.`,
                category: 'Creative',
                headerAlignment: align,
                sectionSpacing: spacing,
                margins: 'wide',
                contentOrder: ['summary', 'skills', 'experience']
            });
        });
    });

    return layouts;
};

export const layoutPresets = generateLayouts();


export const colorPresets: ThemeColor[] = [
    { name: 'Navy Blue', id: 'navy', primary: '#1e3a8a', secondary: '#3b82f6', accent: '#dbeafe', text: '#1f2937', background: '#ffffff', heading: '#111827' },
    { name: 'Emerald Green', id: 'emerald', primary: '#059669', secondary: '#34d399', accent: '#d1fae5', text: '#064e3b', background: '#ffffff', heading: '#065f46' },
    { name: 'Crimson Red', id: 'crimson', primary: '#be123c', secondary: '#fb7185', accent: '#ffe4e6', text: '#881337', background: '#ffffff', heading: '#9f1239' },
    { name: 'Royal Purple', id: 'purple', primary: '#7e22ce', secondary: '#a855f7', accent: '#f3e8ff', text: '#4b5563', background: '#ffffff', heading: '#581c87' },
    { name: 'Sleek Black', id: 'black', primary: '#18181b', secondary: '#52525b', accent: '#f4f4f5', text: '#18181b', background: '#ffffff', heading: '#000000' },
    { name: 'Teal Ocean', id: 'teal', primary: '#0f766e', secondary: '#14b8a6', accent: '#ccfbf1', text: '#334155', background: '#ffffff', heading: '#0f172a' },
    { name: 'Orange Sunset', id: 'orange', primary: '#c2410c', secondary: '#f97316', accent: '#ffedd5', text: '#431407', background: '#ffffff', heading: '#7c2d12' },
    { name: 'Indigo Night', id: 'indigo', primary: '#3730a3', secondary: '#6366f1', accent: '#e0e7ff', text: '#312e81', background: '#ffffff', heading: '#1e1b4b' },
    { name: 'Chocolate', id: 'brown', primary: '#451a03', secondary: '#78350f', accent: '#fef3c7', text: '#451a03', background: '#fffbeb', heading: '#451a03' },
    { name: 'Slate Gray', id: 'slate', primary: '#475569', secondary: '#94a3b8', accent: '#f1f5f9', text: '#334155', background: '#ffffff', heading: '#0f172a' },
    { name: 'Berry Pink', id: 'pink', primary: '#db2777', secondary: '#f472b6', accent: '#fce7f3', text: '#831843', background: '#ffffff', heading: '#9d174d' },
    { name: 'Forest Green', id: 'forest', primary: '#14532d', secondary: '#16a34a', accent: '#dcfce7', text: '#14532d', background: '#ffffff', heading: '#052e16' },
    { name: 'Gold Luxury', id: 'gold', primary: '#854d0e', secondary: '#eab308', accent: '#fef9c3', text: '#422006', background: '#ffffff', heading: '#713f12' },
    { name: 'Sky Blue', id: 'sky', primary: '#0369a1', secondary: '#38bdf8', accent: '#e0f2fe', text: '#0c4a6e', background: '#ffffff', heading: '#075985' },
    { name: 'Violet', id: 'violet', primary: '#5b21b6', secondary: '#8b5cf6', accent: '#ede9fe', text: '#4c1d95', background: '#ffffff', heading: '#2e1065' },
    { name: 'Rose Red', id: 'rose', primary: '#e11d48', secondary: '#fb7185', accent: '#ffe4e6', text: '#881337', background: '#ffffff', heading: '#9f1239' },
    { name: 'Cyan Tech', id: 'cyan', primary: '#0891b2', secondary: '#22d3ee', accent: '#cffafe', text: '#164e63', background: '#ffffff', heading: '#155e75' },
    { name: 'Lime Zest', id: 'lime', primary: '#3f6212', secondary: '#84cc16', accent: '#ecfccb', text: '#1a2e05', background: '#ffffff', heading: '#365314' },
    { name: 'Fuchsia', id: 'fuchsia', primary: '#a21caf', secondary: '#d946ef', accent: '#fae8ff', text: '#701a75', background: '#ffffff', heading: '#86198f' },
    { name: 'Warm Stone', id: 'stone', primary: '#57534e', secondary: '#a8a29e', accent: '#f5f5f4', text: '#292524', background: '#ffffff', heading: '#1c1917' },
];

export const fontPairings = [
    { id: 'modern-sans', heading: 'Inter', body: 'Inter', name: 'Modern Clean' },
    { id: 'elegant-serif', heading: 'Merriweather', body: 'Open Sans', name: 'Elegant Editorial' },
    { id: 'bold-impact', heading: 'Poppins', body: 'Roboto', name: 'Bold Impact' },
    { id: 'classic-serif', heading: 'Playfair Display', body: 'Lato', name: 'Classic Luxury' },
    { id: 'tech-minimal', heading: 'Roboto', body: 'Roboto', name: 'Tech Minimal' },
    { id: 'friendly-soft', heading: 'Inria Sans', body: 'Lato', name: 'Friendly Soft' }, // Inria substitute
    { id: 'formal-trust', heading: 'Georgia', body: 'Open Sans', name: 'Formal Trust' },
    { id: 'sharp-pro', heading: 'Montserrat', body: 'Inter', name: 'Sharp Professional' },
    { id: 'creative-flow', heading: 'Lato', body: 'Merriweather', name: 'Creative Flow' },
    { id: 'traditional', heading: 'Times New Roman', body: 'Arial', name: 'Strictly Traditional' },
];

export const patterns = [
    { id: 'none', name: 'Clean' },
    { id: 'dots', name: 'Dots' },
    { id: 'grid', name: 'Grid' },
    { id: 'lines', name: 'Lines' },
    { id: 'diagonal', name: 'Diagonal' },
    { id: 'crosshatch', name: 'Cross' },
    { id: 'chevron', name: 'Chevron' },
    { id: 'hexagon', name: 'Hex' },
    { id: 'waves', name: 'Waves' },
    { id: 'diamond', name: 'Diamond' },
];

export const gradients = [
    { id: 'none', name: 'Solid', direction: '', secondary: '' },
    { id: 'soft-fade', name: 'Soft Fade', direction: 'to bottom', secondary: '#f8fafc' },
    { id: 'corner-glow', name: 'Corner Glow', direction: 'to bottom right', secondary: '#f1f5f9' },
];

// Keep backward compatibility for 'themes' object used in ResumePreview.tsx
// by populating it with the color presets
export const themes: Record<string, ThemeColor> = colorPresets.reduce((acc, color) => {
    acc[color.id!] = color;
    return acc;
}, {} as Record<string, ThemeColor>);

// Re-export specific helpers expected by other components
export const templates = layoutPresets;
export const backgroundColors = [
    { name: 'White', color: '#ffffff' },
    { name: 'Cream', color: '#fffbeb' },
    { name: 'Light Gray', color: '#f8fafc' },
    { name: 'Soft Blue', color: '#eff6ff' },
    { name: 'Warm Beige', color: '#f5f5f4' },
    { name: 'Mint', color: '#f0fdf4' },
];

export const gradientPresets = [
    { name: 'Subtle Gray', start: '#ffffff', end: '#f1f5f9', direction: 'to bottom' },
    { name: 'Ocean Breeze', start: '#eff6ff', end: '#dbeafe', direction: 'to bottom right' },
    { name: 'Sunset Glow', start: '#fff7ed', end: '#ffedd5', direction: 'to bottom right' },
    { name: 'Minty Fresh', start: '#f0fdf4', end: '#dcfce7', direction: 'to bottom' },
];

// Re-export pattern logic
export const getPatternSVG = (pattern: string, color: string, opacity: number): string => {
    const opacityValue = opacity / 100;
    const patternColor = color || '#000000';

    switch (pattern) {
        case 'dots':
            return `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='${encodeURIComponent(patternColor)}' fill-opacity='${opacityValue}'/%3E%3C/svg%3E")`;
        case 'lines':
            return `url("data:image/svg+xml,%3Csvg width='100' height='8' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='0' y1='4' x2='100' y2='4' stroke='${encodeURIComponent(patternColor)}' stroke-opacity='${opacityValue}' stroke-width='1'/%3E%3C/svg%3E")`;
        case 'grid':
            return `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none'/%3E%3Cpath d='M40 0v40M0 40h40' stroke='${encodeURIComponent(patternColor)}' stroke-opacity='${opacityValue}' stroke-width='0.5'/%3E%3C/svg%3E")`;
        case 'diagonal':
            return `url("data:image/svg+xml,%3Csvg width='10' height='10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10L10 0' stroke='${encodeURIComponent(patternColor)}' stroke-opacity='${opacityValue}' stroke-width='0.5'/%3E%3C/svg%3E")`;
        case 'crosshatch':
            // Elegant crosshatch - two diagonal lines crossing
            return `url("data:image/svg+xml,%3Csvg width='16' height='16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 16L16 0M0 0L16 16' stroke='${encodeURIComponent(patternColor)}' stroke-opacity='${opacityValue}' stroke-width='0.5'/%3E%3C/svg%3E")`;
        case 'chevron':
            // Subtle chevron/arrow pattern
            return `url("data:image/svg+xml,%3Csvg width='24' height='12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 12L12 0L24 12' fill='none' stroke='${encodeURIComponent(patternColor)}' stroke-opacity='${opacityValue}' stroke-width='0.5'/%3E%3C/svg%3E")`;
        case 'hexagon':
            // Honeycomb hexagon pattern
            return `url("data:image/svg+xml,%3Csvg width='28' height='49' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14 0L28 8.5V25.5L14 34L0 25.5V8.5L14 0zM14 49L28 40.5V23.5' fill='none' stroke='${encodeURIComponent(patternColor)}' stroke-opacity='${opacityValue}' stroke-width='0.5'/%3E%3C/svg%3E")`;
        case 'waves':
            // Subtle wave lines
            return `url("data:image/svg+xml,%3Csvg width='40' height='12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 6C5 6 5 2 10 2S15 6 20 6S25 2 30 2S35 6 40 6' fill='none' stroke='${encodeURIComponent(patternColor)}' stroke-opacity='${opacityValue}' stroke-width='0.5'/%3E%3C/svg%3E")`;
        case 'diamond':
            // Small diamond/rhombus pattern
            return `url("data:image/svg+xml,%3Csvg width='16' height='16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 0L16 8L8 16L0 8Z' fill='none' stroke='${encodeURIComponent(patternColor)}' stroke-opacity='${opacityValue}' stroke-width='0.5'/%3E%3C/svg%3E")`;
        default:
            return 'none';
    }
};

export const getBackgroundStyle = (bg: BackgroundSettings): React.CSSProperties => {
    const baseColor = bg.color || '#ffffff';

    switch (bg.type) {
        case 'gradient':
            return {
                background: `linear-gradient(${bg.gradientDirection || 'to bottom'}, ${baseColor}, ${bg.gradientEnd || '#f8fafc'})`,
            };
        case 'pattern':
            if (bg.pattern && bg.pattern !== 'none') {
                // Calculate contrast to decide pattern color (black or white)
                let patternColor = '#1e293b'; // Default dark slate
                const rgb = hexToRgb(baseColor);
                if (rgb) {
                    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
                    patternColor = brightness > 128 ? '#000000' : '#ffffff';
                }

                const patternSvg = getPatternSVG(bg.pattern, patternColor, bg.patternOpacity);
                return {
                    backgroundColor: baseColor,
                    backgroundImage: patternSvg,
                };
            }
            return { backgroundColor: baseColor };
        case 'solid':
        default:
            return { backgroundColor: baseColor };
    }
};

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
    // Template-default fonts (used by specific templates, not shown in Design tab picker)
    { name: 'Titan One', fontFamily: "'Titan One', cursive", googleFont: 'Titan+One' },
    { name: 'Oswald', fontFamily: "'Oswald', sans-serif", googleFont: 'Oswald:wght@400;500;600;700' },
    { name: 'Roboto Slab', fontFamily: "'Roboto Slab', serif", googleFont: 'Roboto+Slab:wght@400;500;600;700' },
    { name: 'Roboto Condensed', fontFamily: "'Roboto Condensed', sans-serif", googleFont: 'Roboto+Condensed:wght@400;700' },
    { name: 'Source Sans Pro', fontFamily: "'Source Sans 3', sans-serif", googleFont: 'Source+Sans+3:wght@400;600;700' },
];

// User-selectable fonts shown in Design tab (excludes template-default-only fonts)
export const userFontPresets = fontPresets.slice(0, 10);

export const getFontFamily = (fontName: string): string => {
    const preset = fontPresets.find(f => f.name === fontName);
    return preset?.fontFamily || "'Inter', sans-serif";
};

export const getGoogleFontsUrl = (...fontNames: string[]): string | null => {
    const families = fontNames
        .map(name => fontPresets.find(f => f.name === name)?.googleFont)
        .filter((g): g is string => !!g);
    // Deduplicate
    const unique = [...new Set(families)];
    if (unique.length === 0) return null;
    return `https://fonts.googleapis.com/css2?${unique.map(f => `family=${f}`).join('&')}&display=swap`;
};

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



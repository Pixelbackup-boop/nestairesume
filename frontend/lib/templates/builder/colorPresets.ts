// Color Presets for Builder Templates
// Extracted from themes.ts for cleaner organization

export interface ThemeColor {
    id: string;
    name: string;
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    background: string;
    heading: string;
}

/**
 * 20 color presets for resume themes.
 * Each preset defines a complete color scheme.
 */
export const colorPresets: ThemeColor[] = [
    { id: 'navy', name: 'Navy Blue', primary: '#1e3a8a', secondary: '#3b82f6', accent: '#dbeafe', text: '#1f2937', background: '#ffffff', heading: '#111827' },
    { id: 'emerald', name: 'Emerald Green', primary: '#059669', secondary: '#34d399', accent: '#d1fae5', text: '#064e3b', background: '#ffffff', heading: '#065f46' },
    { id: 'crimson', name: 'Crimson Red', primary: '#be123c', secondary: '#fb7185', accent: '#ffe4e6', text: '#881337', background: '#ffffff', heading: '#9f1239' },
    { id: 'purple', name: 'Royal Purple', primary: '#7e22ce', secondary: '#a855f7', accent: '#f3e8ff', text: '#4b5563', background: '#ffffff', heading: '#581c87' },
    { id: 'black', name: 'Sleek Black', primary: '#18181b', secondary: '#52525b', accent: '#f4f4f5', text: '#18181b', background: '#ffffff', heading: '#000000' },
    { id: 'teal', name: 'Teal Ocean', primary: '#0f766e', secondary: '#14b8a6', accent: '#ccfbf1', text: '#334155', background: '#ffffff', heading: '#0f172a' },
    { id: 'orange', name: 'Orange Sunset', primary: '#c2410c', secondary: '#f97316', accent: '#ffedd5', text: '#431407', background: '#ffffff', heading: '#7c2d12' },
    { id: 'indigo', name: 'Indigo Night', primary: '#3730a3', secondary: '#6366f1', accent: '#e0e7ff', text: '#312e81', background: '#ffffff', heading: '#1e1b4b' },
    { id: 'brown', name: 'Chocolate', primary: '#451a03', secondary: '#78350f', accent: '#fef3c7', text: '#451a03', background: '#fffbeb', heading: '#451a03' },
    { id: 'slate', name: 'Slate Gray', primary: '#475569', secondary: '#94a3b8', accent: '#f1f5f9', text: '#334155', background: '#ffffff', heading: '#0f172a' },
    { id: 'pink', name: 'Berry Pink', primary: '#db2777', secondary: '#f472b6', accent: '#fce7f3', text: '#831843', background: '#ffffff', heading: '#9d174d' },
    { id: 'forest', name: 'Forest Green', primary: '#14532d', secondary: '#16a34a', accent: '#dcfce7', text: '#14532d', background: '#ffffff', heading: '#052e16' },
    { id: 'gold', name: 'Gold Luxury', primary: '#854d0e', secondary: '#eab308', accent: '#fef9c3', text: '#422006', background: '#ffffff', heading: '#713f12' },
    { id: 'sky', name: 'Sky Blue', primary: '#0369a1', secondary: '#38bdf8', accent: '#e0f2fe', text: '#0c4a6e', background: '#ffffff', heading: '#075985' },
    { id: 'violet', name: 'Violet', primary: '#5b21b6', secondary: '#8b5cf6', accent: '#ede9fe', text: '#4c1d95', background: '#ffffff', heading: '#2e1065' },
    { id: 'rose', name: 'Rose Red', primary: '#e11d48', secondary: '#fb7185', accent: '#ffe4e6', text: '#881337', background: '#ffffff', heading: '#9f1239' },
    { id: 'cyan', name: 'Cyan Tech', primary: '#0891b2', secondary: '#22d3ee', accent: '#cffafe', text: '#164e63', background: '#ffffff', heading: '#155e75' },
    { id: 'lime', name: 'Lime Zest', primary: '#3f6212', secondary: '#84cc16', accent: '#ecfccb', text: '#1a2e05', background: '#ffffff', heading: '#365314' },
    { id: 'fuchsia', name: 'Fuchsia', primary: '#a21caf', secondary: '#d946ef', accent: '#fae8ff', text: '#701a75', background: '#ffffff', heading: '#86198f' },
    { id: 'stone', name: 'Warm Stone', primary: '#57534e', secondary: '#a8a29e', accent: '#f5f5f4', text: '#292524', background: '#ffffff', heading: '#1c1917' },
];

/**
 * Map accent colors to preset theme IDs.
 * Used to determine if a custom color matches a preset.
 */
export const colorToThemeId: Record<string, string> = {
    '#1e3a8a': 'navy',
    '#059669': 'emerald',
    '#be123c': 'crimson',
    '#7e22ce': 'purple',
    '#18181b': 'black',
    '#0f766e': 'teal',
    '#c2410c': 'orange',
    '#3730a3': 'indigo',
    '#475569': 'slate',
    '#db2777': 'pink',
    '#14532d': 'forest',
    '#854d0e': 'gold',
    '#0369a1': 'sky',
    '#5b21b6': 'violet',
    '#e11d48': 'rose',
    '#0891b2': 'cyan',
};

// Helper: Lighten/Darken color (amount: -100 to 100)
const adjustColor = (hex: string, amount: number): string => {
    let cleanHex = hex;
    let usePound = false;
    if (cleanHex[0] === '#') {
        cleanHex = cleanHex.slice(1);
        usePound = true;
    }
    const num = parseInt(cleanHex, 16);
    let r = (num >> 16) + amount;
    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    let b = ((num >> 8) & 0x00FF) + amount;
    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    let g = (num & 0x0000FF) + amount;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound ? '#' : '') + (b | (g << 8) | (r << 16)).toString(16).padStart(6, '0');
};

/**
 * Generate a complete theme from any hex color.
 * Used when a custom color doesn't match a preset.
 */
export const generateTheme = (primaryHex: string): ThemeColor => {
    return {
        id: 'custom',
        name: 'Custom',
        primary: primaryHex,
        secondary: adjustColor(primaryHex, 40),
        accent: adjustColor(primaryHex, 180),
        text: '#334155',
        background: '#ffffff',
        heading: adjustColor(primaryHex, -20),
    };
};

/**
 * Get a color preset by ID, or generate a custom theme.
 */
export const getThemeById = (themeId: string, customColor?: string): ThemeColor => {
    if (themeId === 'custom' && customColor) {
        return generateTheme(customColor);
    }
    const preset = colorPresets.find(c => c.id === themeId);
    return preset || colorPresets[0]; // Default to navy
};

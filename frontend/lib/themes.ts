export type ThemeColor = {
    name: string;
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    background: string;
    heading: string;
};

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
        secondary: adjustColor(primaryHex, 40), // Lighter version for secondary
        accent: adjustColor(primaryHex, 180),   // Very light for background accents
        text: '#334155',
        background: '#ffffff',
        heading: adjustColor(primaryHex, -20), // Darker version for headings
    };
};

export const presetColors = [
    { name: 'Navy', hex: '#1e3a8a' },      // Professional Blue
    { name: 'Slate', hex: '#64748b' },     // Modern Gray
    { name: 'Emerald', hex: '#059669' },   // Trustworthy Green
    { name: 'Burgundy', hex: '#7f1d1d' },  // Professional Red
    { name: 'Royal', hex: '#4338ca' },     // Creative Blue
    { name: 'Graphite', hex: '#374151' },  // Strong Gray
    { name: 'Teal', hex: '#0f766e' },      // Modern Green/Blue
    { name: 'Black', hex: '#000000' },     // Classic
];

export const themes: Record<string, ThemeColor> = {
    navy: {
        name: 'Professional Navy',
        primary: '#1e3a8a', // blue-900
        secondary: '#3b82f6', // blue-500
        accent: '#dbeafe', // blue-100
        text: '#1f2937', // gray-800
        background: '#ffffff',
        heading: '#111827', // gray-900
    },
    teal: {
        name: 'Modern Teal',
        primary: '#0f766e', // teal-700
        secondary: '#14b8a6', // teal-500
        accent: '#ccfbf1', // teal-100
        text: '#334155', // slate-700
        background: '#ffffff',
        heading: '#0f172a', // slate-900
    },
    // ... we can maintain existing ones for backward compatibility, 
    // but effectively we can generate everything dynamically now.
    dark: {
        name: 'Elegant Dark',
        primary: '#18181b', // zinc-900
        secondary: '#52525b', // zinc-600
        accent: '#e4e4e7', // zinc-200
        text: '#18181b', // zinc-900
        background: '#ffffff',
        heading: '#000000',
    },
    purple: {
        name: 'Creative Purple',
        primary: '#7e22ce', // purple-700
        secondary: '#a855f7', // purple-500
        accent: '#f3e8ff', // purple-100
        text: '#4b5563', // gray-600
        background: '#ffffff',
        heading: '#581c87', // purple-900
    },
};

export const templates = [
    { id: 'classic', name: 'Classic Executive', description: 'Traditional and clean' },
    { id: 'sidebar', name: 'Modern Sidebar', description: 'Two-column layout' },
    { id: 'header', name: 'Bold Header', description: 'Impactful top section' },
    { id: 'minimal', name: 'Minimalist', description: 'Simple and effective' },
    { id: 'creative', name: 'Creative', description: 'Stand out from the crowd' },
];

// Template Color Schemas
// Defines how many colors each template uses and where they apply

export type ColorSchemaType = 'single' | 'dual';

export interface TemplateColorSchema {
    templateId: string;
    schemaType: ColorSchemaType;
    colorAreas: string[]; // Where colors are applied
    displayHint?: 'gradient' | 'stacked'; // How dual-color swatches render in DesignTab
}

/**
 * Single-color presets (10 colors)
 * For templates with ONE colored area (header, accents only)
 */
export interface SingleColorPreset {
    id: string;
    name: string;
    color: string;
}

/**
 * Dual-color presets (10 pairs)
 * For templates with TWO colored areas (header + sidebar)
 */
export interface DualColorPreset {
    id: string;
    name: string;
    primary: string;    // Header, main accents
    secondary: string;  // Sidebar, secondary areas
}

/**
 * 10 single-color presets
 */
export const singleColorPresets: SingleColorPreset[] = [
    { id: 'amber', name: 'Amber', color: '#f59e0b' },
    { id: 'blue', name: 'Blue', color: '#2563eb' },
    { id: 'emerald', name: 'Emerald', color: '#059669' },
    { id: 'red', name: 'Red', color: '#dc2626' },
    { id: 'purple', name: 'Purple', color: '#7c3aed' },
    { id: 'teal', name: 'Teal', color: '#0d9488' },
    { id: 'orange', name: 'Orange', color: '#ea580c' },
    { id: 'pink', name: 'Pink', color: '#ec4899' },
    { id: 'slate', name: 'Slate', color: '#475569' },
    { id: 'indigo', name: 'Indigo', color: '#4f46e5' },
];

/**
 * 10 dual-color presets
 * Primary = dark background (sidebar/header)
 * Secondary = vibrant accent color (highlights, borders, progress bars)
 */
export const dualColorPresets: DualColorPreset[] = [
    { id: 'slate-gold', name: 'Slate Gold', primary: '#0f172a', secondary: '#facc15' },
    { id: 'navy-sky', name: 'Navy Sky', primary: '#1e3a5f', secondary: '#38bdf8' },
    { id: 'forest-lime', name: 'Forest Lime', primary: '#14532d', secondary: '#84cc16' },
    { id: 'burgundy-coral', name: 'Burgundy', primary: '#881337', secondary: '#fb7185' },
    { id: 'charcoal-amber', name: 'Charcoal', primary: '#1f2937', secondary: '#f59e0b' },
    { id: 'teal-cyan', name: 'Teal Cyan', primary: '#134e4a', secondary: '#22d3d1' },
    { id: 'brown-orange', name: 'Brown', primary: '#451a03', secondary: '#fb923c' },
    { id: 'purple-violet', name: 'Purple', primary: '#3b0764', secondary: '#a78bfa' },
    { id: 'rose-pink', name: 'Rose Pink', primary: '#4c0519', secondary: '#f472b6' },
    { id: 'indigo-blue', name: 'Indigo', primary: '#1e1b4b', secondary: '#818cf8' },
];

/**
 * 10 gradient presets — smooth analogous/monochromatic transitions
 * Designed for header gradients on CVs (white text on top).
 * Primary = deeper shade, Secondary = lighter shade of the same hue family.
 */
export const gradientPresets: DualColorPreset[] = [
    { id: 'deep-ocean', name: 'Deep Ocean', primary: '#1e3a5f', secondary: '#3b82f6' },
    { id: 'royal-violet', name: 'Royal Violet', primary: '#5b21b6', secondary: '#a78bfa' },
    { id: 'emerald-mist', name: 'Emerald', primary: '#065f46', secondary: '#34d399' },
    { id: 'steel', name: 'Steel', primary: '#1e293b', secondary: '#64748b' },
    { id: 'sapphire', name: 'Sapphire', primary: '#1e1b4b', secondary: '#6366f1' },
    { id: 'crimson-rose', name: 'Crimson', primary: '#9f1239', secondary: '#fb7185' },
    { id: 'teal-wave', name: 'Teal Wave', primary: '#115e59', secondary: '#2dd4bf' },
    { id: 'golden-dusk', name: 'Golden', primary: '#78350f', secondary: '#f59e0b' },
    { id: 'midnight', name: 'Midnight', primary: '#0f172a', secondary: '#3b82f6' },
    { id: 'plum-berry', name: 'Plum Berry', primary: '#701a75', secondary: '#d946ef' },
];

/**
 * Template color schema definitions
 * Maps each template to its color type
 */
export const templateColorSchemas: Record<string, TemplateColorSchema> = {
    // Header templates
    'header-dark': {
        templateId: 'header-dark',
        schemaType: 'dual',
        colorAreas: ['header background', 'sidebar background'],
    },
    'header-diagonal-yellow': {
        templateId: 'header-diagonal-yellow',
        schemaType: 'single',
        colorAreas: ['header background', 'accents'],
    },
    'header-dark-box': {
        templateId: 'header-dark-box',
        schemaType: 'dual',
        colorAreas: ['name box', 'accents'],
    },
    'header-geometric': {
        templateId: 'header-geometric',
        schemaType: 'single',
        colorAreas: ['header pattern', 'accents'],
    },
    'header-dark-banner': {
        templateId: 'header-dark-banner',
        schemaType: 'dual',
        colorAreas: ['header background', 'accents'],
    },
    'header-decorative': {
        templateId: 'header-decorative',
        schemaType: 'dual',
        colorAreas: ['header background', 'accents'],
    },
    'header-green-centered': {
        templateId: 'header-green-centered',
        schemaType: 'single',
        colorAreas: ['header background', 'accents'],
    },
    'header-ribbon-yellow': {
        templateId: 'header-ribbon-yellow',
        schemaType: 'single',
        colorAreas: ['ribbon banner', 'accents'],
    },
    'header-icon-sections': {
        templateId: 'header-icon-sections',
        schemaType: 'single',
        colorAreas: ['header background', 'section icons'],
    },
    'header-light-gray': {
        templateId: 'header-light-gray',
        schemaType: 'dual',
        colorAreas: ['header background', 'body background'],
    },
    'header-blue-clean': {
        templateId: 'header-blue-clean',
        schemaType: 'dual',
        colorAreas: ['header gradient', 'accents'],
        displayHint: 'gradient',
    },
    'header-dark-variant': {
        templateId: 'header-dark-variant',
        schemaType: 'dual',
        colorAreas: ['header background', 'sidebar background'],
    },

    // Sidebar templates (all dual-color)
    'sidebar-modern': {
        templateId: 'sidebar-modern',
        schemaType: 'dual',
        colorAreas: ['sidebar background', 'accents'],
    },

    // Classic templates (mostly single-color)
    'classic-professional': {
        templateId: 'classic-professional',
        schemaType: 'single',
        colorAreas: ['accents', 'section headers'],
    },

    // Minimal templates (single-color)
    'minimal-clean': {
        templateId: 'minimal-clean',
        schemaType: 'single',
        colorAreas: ['accents only'],
    },

    // Europass (single-color)
    'europass-classic': {
        templateId: 'europass-classic',
        schemaType: 'single',
        colorAreas: ['accents', 'borders'],
    },

    // Header Bold (existing - single color)
    'header-bold': {
        templateId: 'header-bold',
        schemaType: 'single',
        colorAreas: ['header background', 'accents'],
    },
};

/**
 * Get color schema for a template
 * Returns 'single' as default if template not found
 */
export function getTemplateColorSchema(templateId: string): TemplateColorSchema {
    return templateColorSchemas[templateId] || {
        templateId,
        schemaType: 'single',
        colorAreas: ['accents'],
    };
}

/**
 * Get appropriate presets for a template
 */
export function getPresetsForTemplate(templateId: string): SingleColorPreset[] | DualColorPreset[] {
    const schema = getTemplateColorSchema(templateId);
    if (schema.displayHint === 'gradient') return gradientPresets;
    return schema.schemaType === 'dual' ? dualColorPresets : singleColorPresets;
}

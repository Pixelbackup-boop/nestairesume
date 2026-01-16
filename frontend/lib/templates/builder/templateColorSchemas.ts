// Template Color Schemas
// Defines how many colors each template uses and where they apply

export type ColorSchemaType = 'single' | 'dual';

export interface TemplateColorSchema {
    templateId: string;
    schemaType: ColorSchemaType;
    colorAreas: string[]; // Where colors are applied
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
        schemaType: 'single',
        colorAreas: ['decorative elements', 'accents'],
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
    'header-icon-orange': {
        templateId: 'header-icon-orange',
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
        schemaType: 'single',
        colorAreas: ['header background', 'accents'],
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
    return schema.schemaType === 'dual' ? dualColorPresets : singleColorPresets;
}

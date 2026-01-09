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
 * Each has a dark primary + complementary light secondary
 */
export const dualColorPresets: DualColorPreset[] = [
    { id: 'slate', name: 'Slate', primary: '#334155', secondary: '#f1f5f9' },
    { id: 'navy', name: 'Navy', primary: '#1e3a5f', secondary: '#e0f2fe' },
    { id: 'forest', name: 'Forest', primary: '#166534', secondary: '#dcfce7' },
    { id: 'burgundy', name: 'Burgundy', primary: '#881337', secondary: '#fce7f3' },
    { id: 'charcoal', name: 'Charcoal', primary: '#1f2937', secondary: '#f3f4f6' },
    { id: 'teal', name: 'Teal', primary: '#0f766e', secondary: '#ccfbf1' },
    { id: 'brown', name: 'Brown', primary: '#78350f', secondary: '#fef3c7' },
    { id: 'purple', name: 'Purple', primary: '#5b21b6', secondary: '#ede9fe' },
    { id: 'rose', name: 'Rose', primary: '#9f1239', secondary: '#ffe4e6' },
    { id: 'indigo', name: 'Indigo', primary: '#3730a3', secondary: '#e0e7ff' },
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
        schemaType: 'single',
        colorAreas: ['name box', 'accents'],
    },
    'header-geometric': {
        templateId: 'header-geometric',
        schemaType: 'single',
        colorAreas: ['header pattern', 'accents'],
    },
    'header-dark-banner': {
        templateId: 'header-dark-banner',
        schemaType: 'single',
        colorAreas: ['header banner', 'accents'],
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

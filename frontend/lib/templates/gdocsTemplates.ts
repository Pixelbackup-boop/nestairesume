/**
 * Google Docs Template Definitions
 * 4 Google Docs resume templates (output as .docx, optimized for Google Docs import)
 */

export interface GdocsTemplate {
    id: string;
    name: string;
    style: string;
    layout: 'classic' | 'sidebar' | 'header' | 'minimal';
    accentColor: string;
    description: string;
}

export const gdocsTemplates: GdocsTemplate[] = [
    {
        id: 'gdocs-clean',
        name: 'Clean',
        style: 'Google-style',
        layout: 'classic',
        accentColor: '#4285f4',
        description: 'Single-column layout with Google blue accents. Clean and professional.',
    },
    {
        id: 'gdocs-coral',
        name: 'Coral',
        style: 'Modern',
        layout: 'header',
        accentColor: '#e8634a',
        description: 'Warm coral header band with modern typography. Eye-catching and bold.',
    },
    {
        id: 'gdocs-elegant',
        name: 'Elegant',
        style: 'Traditional',
        layout: 'classic',
        accentColor: '#2d5016',
        description: 'Serif fonts with deep green accents. Perfect for academic and traditional roles.',
    },
    {
        id: 'gdocs-compact',
        name: 'Compact',
        style: 'Dense',
        layout: 'sidebar',
        accentColor: '#0d7377',
        description: 'Two-column sidebar layout. Maximizes content per page with teal accents.',
    },
];

export function getGdocsTemplateById(id: string): GdocsTemplate | undefined {
    return gdocsTemplates.find((t) => t.id === id);
}

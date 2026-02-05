/**
 * DOCX Template Definitions
 * 4 Microsoft Word resume templates
 */

export interface DocxTemplate {
    id: string;
    name: string;
    style: string;
    layout: 'classic' | 'sidebar' | 'header' | 'minimal';
    accentColor: string;
    description: string;
}

export const docxTemplates: DocxTemplate[] = [
    {
        id: 'docx-classic',
        name: 'Classic',
        style: 'Traditional',
        layout: 'classic',
        accentColor: '#1e3a8a',
        description: 'Single-column layout with photo and centered name. Perfect for any industry.',
    },
    {
        id: 'docx-sidebar',
        name: 'Sidebar',
        style: 'Professional',
        layout: 'sidebar',
        accentColor: '#1e3a8a',
        description: 'Two-column layout with dark sidebar for contact and skills.',
    },
    {
        id: 'docx-header',
        name: 'Header Band',
        style: 'Bold',
        layout: 'header',
        accentColor: '#1e3a8a',
        description: 'Full-width dark header band with your name and contact details.',
    },
    {
        id: 'docx-minimal',
        name: 'Minimal',
        style: 'Clean',
        layout: 'minimal',
        accentColor: '#333333',
        description: 'Clean layout with thin dividers and elegant typography.',
    },
];

export function getDocxTemplateById(id: string): DocxTemplate | undefined {
    return docxTemplates.find((t) => t.id === id);
}

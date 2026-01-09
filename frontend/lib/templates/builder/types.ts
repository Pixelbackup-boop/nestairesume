// Builder Template Types
// Centralized type definitions for the form-based resume builder

export type LayoutType = 'classic' | 'sidebar' | 'header' | 'minimal' | 'europass';

export type TemplateCategory = 'professional' | 'modern' | 'creative' | 'minimal' | 'bold';

export interface BuilderTemplate {
    id: string;
    name: string;
    style: string;
    layout: LayoutType;           // Explicit layout type - eliminates string parsing
    layoutPresetId: string;       // Maps to themes.ts layoutPresets
    category: TemplateCategory;
    accentColor: string;
    gradientColors: string;       // Tailwind gradient classes for visual styling
    templateId?: string;          // Optional: exact React component ID (for unique layouts)
    thumbnail?: string;           // Optional: path to reference image (e.g., '/templates/header-dark.jpg')
}

export interface TemplateTheme {
    themeId: string | null;
    customColor: string;
}

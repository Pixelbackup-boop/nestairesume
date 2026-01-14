// Builder Templates Registry
// Aggregates all 16 featured builder templates

import type { BuilderTemplate, LayoutType, TemplateTheme } from '../types';
import { colorToThemeId } from '../colorPresets';

// Import from category folders
import { classicProTemplate } from './professional';
import { sidebarVariants } from './modern';
import { headerVariants } from './bold';
import { minimalVariants } from './minimal';

// Re-export individual templates for direct access
export { classicProTemplate } from './professional';
export { sidebarVariants } from './modern';
export { headerVariants } from './bold';
export { minimalVariants } from './minimal';

/**
 * All 16 featured builder templates.
 */
export const builderTemplates: BuilderTemplate[] = [
    // Classic (1 template)
    classicProTemplate,
    // Sidebar variants (3 templates)
    ...sidebarVariants,
    // Header variants (9 templates)
    ...headerVariants,
    // Minimal variants (3 templates)
    ...minimalVariants,
];

/**
 * Get a template by its user-friendly ID.
 */
export const getTemplateById = (id: string): BuilderTemplate | undefined => {
    return builderTemplates.find(t => t.id === id);
};

/**
 * Get the layout preset ID for a template.
 * Used to apply detailed layout configuration from themes.ts.
 */
export const getLayoutPresetId = (templateId: string): string => {
    const template = getTemplateById(templateId);
    return template?.layoutPresetId || 'classic-normal-left';
};

/**
 * Get the layout type directly from a template ID.
 * Eliminates need for brittle string parsing in ResumePreview.
 */
export const getLayoutType = (templateId: string): LayoutType => {
    const template = getTemplateById(templateId);
    return template?.layout || 'classic';
};

/**
 * Get theme settings for a template.
 * Returns { themeId, customColor } - use themeId if it matches a preset.
 */
export const getTemplateTheme = (templateId: string): TemplateTheme => {
    const template = getTemplateById(templateId);
    if (!template) return { themeId: 'navy', customColor: '' };

    const matchedThemeId = colorToThemeId[template.accentColor];
    if (matchedThemeId) {
        return { themeId: matchedThemeId, customColor: '' };
    }
    // If no preset matches, return the custom color
    return { themeId: null, customColor: template.accentColor };
};

/**
 * Get all templates by category.
 */
export const getTemplatesByCategory = (category: BuilderTemplate['category']): BuilderTemplate[] => {
    return builderTemplates.filter(t => t.category === category);
};

/**
 * Get all unique template categories.
 */
export const getCategories = (): BuilderTemplate['category'][] => {
    const categories = new Set(builderTemplates.map(t => t.category));
    return Array.from(categories);
};

/**
 * Get template thumbnail path by ID.
 * Returns undefined if template or thumbnail not found.
 */
export const getTemplateThumbnail = (templateId: string): string | undefined => {
    const template = getTemplateById(templateId);
    return template?.thumbnail;
};

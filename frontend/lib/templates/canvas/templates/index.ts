// Canvas Templates Registry
// Aggregates all individual canvas templates

import type { CanvasTemplate } from '@/store/useCanvasStore';

// Import individual templates
export { classicProfessionalTemplate } from './classic-professional';
export { modernSidebarTemplate } from './modern-sidebar';
export { minimalCleanTemplate } from './minimal-clean';
export { boldCreativeTemplate } from './bold-creative';
export { twoColumnTemplate } from './two-column';

// Import for aggregation
import { classicProfessionalTemplate } from './classic-professional';
import { modernSidebarTemplate } from './modern-sidebar';
import { minimalCleanTemplate } from './minimal-clean';
import { boldCreativeTemplate } from './bold-creative';
import { twoColumnTemplate } from './two-column';

/**
 * All canvas templates.
 * Add new templates here after creating their individual files.
 */
export const canvasTemplates: CanvasTemplate[] = [
    classicProfessionalTemplate,
    modernSidebarTemplate,
    minimalCleanTemplate,
    boldCreativeTemplate,
    twoColumnTemplate,
];

/**
 * Get a canvas template by ID.
 */
export const getCanvasTemplateById = (id: string): CanvasTemplate | undefined => {
    return canvasTemplates.find(t => t.id === id);
};

/**
 * Get canvas templates by category.
 */
export const getCanvasTemplatesByCategory = (category: CanvasTemplate['category']): CanvasTemplate[] => {
    return canvasTemplates.filter(t => t.category === category);
};

/**
 * Get all unique canvas template categories.
 */
export const getCanvasCategories = (): CanvasTemplate['category'][] => {
    const categories = new Set(canvasTemplates.map(t => t.category));
    return Array.from(categories);
};

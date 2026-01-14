// Builder Templates: Featured Minimal Variants
// 3 featured minimal templates
import type { BuilderTemplate } from '../../types';

// Timeline minimal - creative style
export const minimalTimelineTemplate: BuilderTemplate = {
    id: 'minimal-timeline',
    name: 'Timeline',
    style: 'Creative',
    layout: 'minimal',
    layoutPresetId: 'minimal-normal-center',
    category: 'creative',
    accentColor: '#ef4444',
    gradientColors: 'from-red-500 to-red-700',
};

// Labels tan minimal - professional style
export const minimalLabelsTanTemplate: BuilderTemplate = {
    id: 'minimal-labels-tan',
    name: 'Labels Tan',
    style: 'Professional',
    layout: 'minimal',
    layoutPresetId: 'minimal-normal-center',
    category: 'professional',
    accentColor: '#b45309',
    gradientColors: 'from-amber-600 to-amber-800',
};

// Blue sections minimal - professional style
export const minimalBlueSectionsTemplate: BuilderTemplate = {
    id: 'minimal-blue-sections',
    name: 'Blue Sections',
    style: 'Professional',
    layout: 'minimal',
    layoutPresetId: 'minimal-normal-center',
    category: 'professional',
    accentColor: '#2563eb',
    gradientColors: 'from-blue-600 to-blue-800',
};

// Export all featured minimal variants
export const minimalVariants: BuilderTemplate[] = [
    minimalTimelineTemplate,
    minimalLabelsTanTemplate,
    minimalBlueSectionsTemplate,
];

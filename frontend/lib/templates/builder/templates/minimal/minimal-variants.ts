// Builder Templates: Minimal Variants
// 7 minimal template variations with different color schemes
import type { BuilderTemplate } from '../../types';

// Simple clean minimal - minimalist style
export const minimalSimpleTemplate: BuilderTemplate = {
    id: 'minimal-simple',
    name: 'Simple Clean',
    style: 'Minimalist',
    layout: 'minimal',
    layoutPresetId: 'minimal-normal-center',
    category: 'minimal',
    accentColor: '#374151',
    gradientColors: 'from-gray-700 to-gray-900',
};

// Centered red minimal - minimalist style
export const minimalCenteredRedTemplate: BuilderTemplate = {
    id: 'minimal-centered-red',
    name: 'Centered Red',
    style: 'Minimalist',
    layout: 'minimal',
    layoutPresetId: 'minimal-normal-center',
    category: 'minimal',
    accentColor: '#dc2626',
    gradientColors: 'from-red-600 to-red-800',
};

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

// Underline red minimal - minimalist style
export const minimalUnderlineTemplate: BuilderTemplate = {
    id: 'minimal-underline',
    name: 'Underline Red',
    style: 'Minimalist',
    layout: 'minimal',
    layoutPresetId: 'minimal-normal-center',
    category: 'minimal',
    accentColor: '#b91c1c',
    gradientColors: 'from-red-700 to-red-900',
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

// Section bars yellow minimal - bold style
export const minimalSectionBarsTemplate: BuilderTemplate = {
    id: 'minimal-section-bars',
    name: 'Section Bars',
    style: 'Bold',
    layout: 'minimal',
    layoutPresetId: 'minimal-normal-center',
    category: 'bold',
    accentColor: '#ca8a04',
    gradientColors: 'from-yellow-600 to-yellow-800',
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

// Export all minimal variants
export const minimalVariants: BuilderTemplate[] = [
    minimalSimpleTemplate,
    minimalCenteredRedTemplate,
    minimalTimelineTemplate,
    minimalUnderlineTemplate,
    minimalLabelsTanTemplate,
    minimalSectionBarsTemplate,
    minimalBlueSectionsTemplate,
];

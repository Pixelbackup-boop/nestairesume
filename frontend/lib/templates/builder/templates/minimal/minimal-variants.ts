// Builder Templates: Featured Minimal Variants
// 3 featured minimal templates
import type { BuilderTemplate } from '../../types';

// Timeline minimal - ATS-friendly style
export const minimalTimelineTemplate: BuilderTemplate = {
    id: 'minimal-timeline',
    name: 'Timeline',
    style: 'ATS-Friendly',
    layout: 'minimal',
    layoutPresetId: 'minimal-normal-center',
    category: 'ats-friendly',
    accentColor: '#ef4444',
    gradientColors: 'from-red-500 to-red-700',
    templateId: 'minimal-timeline',
};

// Labels tan minimal - ATS-friendly style
export const minimalLabelsTanTemplate: BuilderTemplate = {
    id: 'minimal-labels-tan',
    name: 'Labels Tan',
    style: 'ATS-Friendly',
    layout: 'minimal',
    layoutPresetId: 'minimal-normal-center',
    category: 'ats-friendly',
    accentColor: '#b45309',
    gradientColors: 'from-amber-600 to-amber-800',
    templateId: 'minimal-labels-tan',
};

// Blue sections minimal - simple clean style
export const minimalBlueSectionsTemplate: BuilderTemplate = {
    id: 'minimal-blue-sections',
    name: 'Blue Sections',
    style: 'Simple & Clean',
    layout: 'minimal',
    layoutPresetId: 'minimal-normal-center',
    category: 'minimal',
    accentColor: '#2563eb',
    gradientColors: 'from-blue-600 to-blue-800',
    templateId: 'minimal-blue-sections',
};

// Export all featured minimal variants
export const minimalVariants: BuilderTemplate[] = [
    minimalTimelineTemplate,
    minimalLabelsTanTemplate,
    minimalBlueSectionsTemplate,
];

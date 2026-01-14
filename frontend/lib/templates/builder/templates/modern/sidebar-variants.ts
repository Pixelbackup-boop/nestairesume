// Builder Templates: Featured Sidebar Variants
// 3 featured sidebar templates
import type { BuilderTemplate } from '../../types';

// Dark navy sidebar - corporate
export const sidebarDarkNavyTemplate: BuilderTemplate = {
    id: 'sidebar-dark-navy',
    name: 'Navy Corporate',
    style: 'Corporate',
    layout: 'sidebar',
    layoutPresetId: 'sidebar-left-normal-normal',
    category: 'professional',
    accentColor: '#1e3a5f',
    gradientColors: 'from-blue-900 to-slate-800',
};

// Narrow yellow sidebar
export const sidebarNarrowYellowTemplate: BuilderTemplate = {
    id: 'sidebar-narrow-yellow',
    name: 'Narrow Yellow',
    style: 'Compact Professional',
    layout: 'sidebar',
    layoutPresetId: 'sidebar-left-normal-normal',
    category: 'modern',
    accentColor: '#eab308',
    gradientColors: 'from-yellow-500 to-yellow-700',
};

// Teal sidebar with monogram style
export const sidebarMonogramTemplate: BuilderTemplate = {
    id: 'sidebar-monogram',
    name: 'Teal Monogram',
    style: 'Professional',
    layout: 'sidebar',
    layoutPresetId: 'sidebar-left-normal-normal',
    category: 'modern',
    accentColor: '#0d9488',
    gradientColors: 'from-teal-500 to-teal-700',
};

// Export all featured sidebar variants
export const sidebarVariants: BuilderTemplate[] = [
    sidebarDarkNavyTemplate,
    sidebarNarrowYellowTemplate,
    sidebarMonogramTemplate,
];

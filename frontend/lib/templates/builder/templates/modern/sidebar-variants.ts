// Builder Templates: Sidebar Variants
// 13 sidebar template variations with different color schemes
import type { BuilderTemplate } from '../../types';

// Yellow sidebar - warm professional
export const sidebarYellowTemplate: BuilderTemplate = {
    id: 'sidebar-yellow',
    name: 'Yellow Sidebar',
    style: 'Warm Professional',
    layout: 'sidebar',
    layoutPresetId: 'sidebar-left-normal-normal',
    category: 'modern',
    accentColor: '#f59e0b',
    gradientColors: 'from-amber-500 to-amber-700',
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

// Orange/coral sidebar - bold and energetic
export const sidebarOrangeTemplate: BuilderTemplate = {
    id: 'sidebar-orange',
    name: 'Coral Sidebar',
    style: 'Bold & Energetic',
    layout: 'sidebar',
    layoutPresetId: 'sidebar-left-normal-normal',
    category: 'bold',
    accentColor: '#f97316',
    gradientColors: 'from-orange-500 to-orange-700',
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

// Dark gray/slate sidebar - executive
export const sidebarDarkGrayTemplate: BuilderTemplate = {
    id: 'sidebar-dark-gray',
    name: 'Slate Executive',
    style: 'Executive',
    layout: 'sidebar',
    layoutPresetId: 'sidebar-left-normal-normal',
    category: 'professional',
    accentColor: '#475569',
    gradientColors: 'from-slate-500 to-slate-700',
};

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

// Dark navy compact sidebar
export const sidebarNavyCompactTemplate: BuilderTemplate = {
    id: 'sidebar-navy-compact',
    name: 'Navy Compact',
    style: 'Compact Corporate',
    layout: 'sidebar',
    layoutPresetId: 'sidebar-left-normal-normal',
    category: 'professional',
    accentColor: '#1e3a5f',
    gradientColors: 'from-blue-800 to-slate-700',
};

// Dark slate minimal sidebar
export const sidebarDarkMinimalTemplate: BuilderTemplate = {
    id: 'sidebar-dark-minimal',
    name: 'Dark Minimal',
    style: 'Minimalist',
    layout: 'sidebar',
    layoutPresetId: 'sidebar-left-normal-normal',
    category: 'minimal',
    accentColor: '#334155',
    gradientColors: 'from-slate-600 to-slate-800',
};

// Green/teal sidebar - fresh and modern
export const sidebarGreenTealTemplate: BuilderTemplate = {
    id: 'sidebar-green-teal',
    name: 'Green Teal',
    style: 'Fresh Modern',
    layout: 'sidebar',
    layoutPresetId: 'sidebar-left-normal-normal',
    category: 'modern',
    accentColor: '#0d9488',
    gradientColors: 'from-teal-600 to-teal-800',
};

// Green variant 1 - lighter teal
export const sidebarGreenV1Template: BuilderTemplate = {
    id: 'sidebar-green-v1',
    name: 'Emerald Light',
    style: 'Fresh',
    layout: 'sidebar',
    layoutPresetId: 'sidebar-left-normal-normal',
    category: 'modern',
    accentColor: '#14b8a6',
    gradientColors: 'from-teal-500 to-teal-700',
};

// Green variant 2 - medium teal
export const sidebarGreenV2Template: BuilderTemplate = {
    id: 'sidebar-green-v2',
    name: 'Teal Professional',
    style: 'Professional',
    layout: 'sidebar',
    layoutPresetId: 'sidebar-left-normal-normal',
    category: 'professional',
    accentColor: '#10b981',
    gradientColors: 'from-emerald-500 to-emerald-700',
};

// Green variant 3 - darker emerald
export const sidebarGreenV3Template: BuilderTemplate = {
    id: 'sidebar-green-v3',
    name: 'Emerald Classic',
    style: 'Classic',
    layout: 'sidebar',
    layoutPresetId: 'sidebar-left-normal-normal',
    category: 'professional',
    accentColor: '#059669',
    gradientColors: 'from-emerald-600 to-emerald-800',
};

// Green variant 4 - deep forest
export const sidebarGreenV4Template: BuilderTemplate = {
    id: 'sidebar-green-v4',
    name: 'Forest Executive',
    style: 'Executive',
    layout: 'sidebar',
    layoutPresetId: 'sidebar-left-normal-normal',
    category: 'professional',
    accentColor: '#047857',
    gradientColors: 'from-emerald-700 to-emerald-900',
};

// Export all sidebar variants
export const sidebarVariants: BuilderTemplate[] = [
    sidebarYellowTemplate,
    sidebarMonogramTemplate,
    sidebarOrangeTemplate,
    sidebarNarrowYellowTemplate,
    sidebarDarkGrayTemplate,
    sidebarDarkNavyTemplate,
    sidebarNavyCompactTemplate,
    sidebarDarkMinimalTemplate,
    sidebarGreenTealTemplate,
    sidebarGreenV1Template,
    sidebarGreenV2Template,
    sidebarGreenV3Template,
    sidebarGreenV4Template,
];

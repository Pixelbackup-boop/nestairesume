// Builder Templates: Featured Header Variants
// 9 featured header templates
import type { BuilderTemplate } from '../../types';

// Dark header - professional style (UNIQUE LAYOUT: two-column with photo left)
export const headerDarkTemplate: BuilderTemplate = {
    id: 'header-dark',
    name: 'Dark Header',
    style: 'Professional',
    layout: 'header',
    layoutPresetId: 'header-normal-normal',
    category: 'professional',
    accentColor: '#facc15', // Yellow 400 - matches HeaderDark.tsx accent
    gradientColors: 'from-slate-600 to-slate-800',
    templateId: 'header-dark',
    thumbnail: '/templates/header-dark.jpg',
};

// Dark banner header - bold style (UNIQUE LAYOUT: dark header, two-column with skills/interests right)
export const headerDarkBannerTemplate: BuilderTemplate = {
    id: 'header-dark-banner',
    name: 'Dark Banner',
    style: 'Bold',
    layout: 'header',
    layoutPresetId: 'header-normal-normal',
    category: 'bold',
    accentColor: '#f59e0b',
    gradientColors: 'from-slate-900 to-slate-950',
    templateId: 'header-dark-banner',
    thumbnail: '/templates/header-dark-banner.webp',
};

// Dark box header - professional name box (UNIQUE LAYOUT: dark name box, circular skills)
export const headerDarkBoxTemplate: BuilderTemplate = {
    id: 'header-dark-box',
    name: 'Dark Box',
    style: 'Professional',
    layout: 'header',
    layoutPresetId: 'header-normal-normal',
    category: 'professional',
    accentColor: '#1e293b',
    gradientColors: 'from-slate-800 to-slate-900',
    templateId: 'header-dark-box',
    thumbnail: '/templates/header-dark-box.webp',
};

// Diagonal yellow header - creative style (UNIQUE LAYOUT: diagonal clip-path header)
export const headerDiagonalYellowTemplate: BuilderTemplate = {
    id: 'header-diagonal-yellow',
    name: 'Diagonal Yellow',
    style: 'Creative',
    layout: 'header',
    layoutPresetId: 'header-normal-normal',
    category: 'creative',
    accentColor: '#f59e0b',
    gradientColors: 'from-amber-500 to-amber-700',
    templateId: 'header-diagonal-yellow',
    thumbnail: '/templates/header-diagonal-yellow.webp',
};

// Yellow ribbon header - creative style (UNIQUE LAYOUT: ribbon banner, awards section, interests grid)
export const headerRibbonYellowTemplate: BuilderTemplate = {
    id: 'header-ribbon-yellow',
    name: 'Ribbon Yellow',
    style: 'Creative',
    layout: 'header',
    layoutPresetId: 'header-normal-normal',
    category: 'creative',
    accentColor: '#eab308',
    gradientColors: 'from-yellow-500 to-yellow-700',
    templateId: 'header-ribbon-yellow',
    thumbnail: '/templates/header-ribbon-yellow.webp',
};

// Decorative pink header - creative style (UNIQUE LAYOUT: wave pattern, centered name)
export const headerDecorativeTemplate: BuilderTemplate = {
    id: 'header-decorative',
    name: 'Decorative Pink',
    style: 'Creative',
    layout: 'header',
    layoutPresetId: 'header-normal-normal',
    category: 'creative',
    accentColor: '#ec4899',
    gradientColors: 'from-pink-500 to-pink-700',
    templateId: 'header-decorative',
    thumbnail: '/templates/header-decorative.webp',
};

// Geometric brown header - professional pattern (UNIQUE LAYOUT: geometric pattern, two-column with labels left)
export const headerGeometricTemplate: BuilderTemplate = {
    id: 'header-geometric',
    name: 'Geometric Brown',
    style: 'Professional',
    layout: 'header',
    layoutPresetId: 'header-normal-normal',
    category: 'professional',
    accentColor: '#92400e',
    gradientColors: 'from-amber-800 to-amber-900',
    templateId: 'header-geometric',
    thumbnail: '/templates/header-geometric.webp',
};

// Orange icon sections header - bold style (UNIQUE LAYOUT: labels-left, 3-column skills, hashtag strengths)
export const headerIconOrangeTemplate: BuilderTemplate = {
    id: 'header-icon-orange',
    name: 'Icon Orange',
    style: 'Bold',
    layout: 'header',
    layoutPresetId: 'header-normal-normal',
    category: 'bold',
    accentColor: '#ea580c',
    gradientColors: 'from-orange-600 to-orange-800',
    templateId: 'header-icon-sections',
    thumbnail: '/templates/header-icon-sections.webp',
};

// Blue clean header - professional style (UNIQUE LAYOUT: light blue header, photo left, two-column)
export const headerBlueCleanTemplate: BuilderTemplate = {
    id: 'header-blue-clean',
    name: 'Blue Clean',
    style: 'Professional',
    layout: 'header',
    layoutPresetId: 'header-normal-normal',
    category: 'professional',
    accentColor: '#2563eb',
    gradientColors: 'from-blue-600 to-blue-800',
    templateId: 'header-blue-clean',
    thumbnail: '/templates/header-blue.jpg',
};

// Export all featured header variants
export const headerVariants: BuilderTemplate[] = [
    headerDarkTemplate,
    headerDarkBannerTemplate,
    headerDarkBoxTemplate,
    headerDiagonalYellowTemplate,
    headerRibbonYellowTemplate,
    headerDecorativeTemplate,
    headerGeometricTemplate,
    headerIconOrangeTemplate,
    headerBlueCleanTemplate,
];

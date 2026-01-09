// Builder Templates: Header Variants
// 12 header template variations with different color schemes
import type { BuilderTemplate } from '../../types';

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
    templateId: 'header-diagonal-yellow', // Uses unique HeaderDiagonalYellow.tsx component
    thumbnail: '/templates/header-diagonal-yellow.webp',
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
    templateId: 'header-dark-box', // Uses unique HeaderDarkBox.tsx component
    thumbnail: '/templates/header-dark-box.webp',
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
    templateId: 'header-geometric', // Uses unique HeaderGeometric.tsx component
    thumbnail: '/templates/header-geometric.webp',
};

// Dark banner header - bold style (UNIQUE LAYOUT: dark header, two-column with skills/interests right)
export const headerDarkBannerTemplate: BuilderTemplate = {
    id: 'header-dark-banner',
    name: 'Dark Banner',
    style: 'Bold',
    layout: 'header',
    layoutPresetId: 'header-normal-normal',
    category: 'bold',
    accentColor: '#f59e0b', // Yellow/gold accent (matching reference)
    gradientColors: 'from-slate-900 to-slate-950',
    templateId: 'header-dark-banner', // Uses unique HeaderDarkBanner.tsx component
    thumbnail: '/templates/header-dark-banner.webp',
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
    templateId: 'header-decorative', // Uses unique HeaderDecorative.tsx component
    thumbnail: '/templates/header-decorative.webp',
};

// Green centered header - modern style (UNIQUE LAYOUT: centered photo, single-column, pill strengths)
export const headerGreenCenteredTemplate: BuilderTemplate = {
    id: 'header-green-centered',
    name: 'Green Centered',
    style: 'Modern',
    layout: 'header',
    layoutPresetId: 'header-normal-normal',
    category: 'modern',
    accentColor: '#059669',
    gradientColors: 'from-emerald-600 to-emerald-800',
    templateId: 'header-green-centered', // Uses unique HeaderGreenCentered.tsx component
    thumbnail: '/templates/header-green-centered.webp',
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
    templateId: 'header-ribbon-yellow', // Uses unique HeaderRibbonYellow.tsx component
    thumbnail: '/templates/header-ribbon-yellow.webp',
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
    templateId: 'header-icon-sections', // Uses unique HeaderIconSections.tsx component
    thumbnail: '/templates/header-icon-sections.webp',
};

// Light gray header - professional style (UNIQUE LAYOUT: light header, spaced letters, two-column)
export const headerLightGrayTemplate: BuilderTemplate = {
    id: 'header-light-gray',
    name: 'Light Gray',
    style: 'Professional',
    layout: 'header',
    layoutPresetId: 'header-normal-normal',
    category: 'professional',
    accentColor: '#64748b',
    gradientColors: 'from-slate-400 to-slate-600',
    templateId: 'header-light-gray', // Uses unique HeaderLightGray.tsx component
    thumbnail: '/templates/header-light-gray.jpg',
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
    templateId: 'header-blue-clean', // Uses unique HeaderBlueClean.tsx component
    thumbnail: '/templates/header-blue.jpg',
};

// Dark header - professional style (UNIQUE LAYOUT: two-column with photo left)
export const headerDarkTemplate: BuilderTemplate = {
    id: 'header-dark',
    name: 'Dark Header',
    style: 'Professional',
    layout: 'header',
    layoutPresetId: 'header-normal-normal',
    category: 'professional',
    accentColor: '#334155',
    gradientColors: 'from-slate-600 to-slate-800',
    templateId: 'header-dark', // Uses unique HeaderDark.tsx component
    thumbnail: '/templates/header-dark.jpg',
};

// Dark variant header - professional style
export const headerDarkVariantTemplate: BuilderTemplate = {
    id: 'header-dark-variant',
    name: 'Dark Variant',
    style: 'Professional',
    layout: 'header',
    layoutPresetId: 'header-normal-normal',
    category: 'professional',
    accentColor: '#475569',
    gradientColors: 'from-slate-500 to-slate-700',
    thumbnail: '/templates/header-dark-v1.jpg',
};

// Export all header variants
export const headerVariants: BuilderTemplate[] = [
    headerDiagonalYellowTemplate,
    headerDarkBoxTemplate,
    headerGeometricTemplate,
    headerDarkBannerTemplate,
    headerDecorativeTemplate,
    headerGreenCenteredTemplate,
    headerRibbonYellowTemplate,
    headerIconOrangeTemplate,
    headerLightGrayTemplate,
    headerBlueCleanTemplate,
    headerDarkTemplate,
    headerDarkVariantTemplate,
];

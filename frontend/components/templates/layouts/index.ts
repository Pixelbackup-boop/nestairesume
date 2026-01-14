// Template Registry
// Aggregates all template components and provides lookup functions

import { TemplateRegistryEntry, TemplateProps } from '../shared/types';

// --- Header Templates (9) ---
import HeaderDark, { headerDarkMeta } from './header/HeaderDark';
import HeaderDiagonalYellow, { headerDiagonalYellowMeta } from './header/HeaderDiagonalYellow';
import HeaderDarkBox, { headerDarkBoxMeta } from './header/HeaderDarkBox';
import HeaderGeometric, { headerGeometricMeta } from './header/HeaderGeometric';
import HeaderDarkBanner, { headerDarkBannerMeta } from './header/HeaderDarkBanner';
import HeaderDecorative, { headerDecorativeMeta } from './header/HeaderDecorative';
import HeaderRibbonYellow, { headerRibbonYellowMeta } from './header/HeaderRibbonYellow';
import HeaderIconSections, { headerIconSectionsMeta } from './header/HeaderIconSections';
import HeaderBlueClean, { headerBlueCleanMeta } from './header/HeaderBlueClean';

// --- Sidebar Templates (3) ---
import SidebarDarkNavy, { sidebarDarkNavyMeta } from './sidebar/SidebarDarkNavy';
import SidebarMonogram, { sidebarMonogramMeta } from './sidebar/SidebarMonogram';
import SidebarNarrowYellow, { sidebarNarrowYellowMeta } from './sidebar/SidebarNarrowYellow';

// --- Classic Templates (1) ---
import ClassicProfessional, { classicProfessionalMeta } from './classic/ClassicProfessional';

// --- Minimal Templates (3) ---
import MinimalBlueSections, { minimalBlueSectionsMeta } from './minimal/MinimalBlueSections';
import MinimalLabelsTan, { minimalLabelsTanMeta } from './minimal/MinimalLabelsTan';
import MinimalTimeline, { minimalTimelineMeta } from './minimal/MinimalTimeline';

// Re-export individual templates for direct access
export { default as HeaderDark } from './header/HeaderDark';
export { default as HeaderDiagonalYellow } from './header/HeaderDiagonalYellow';
export { default as HeaderDarkBox } from './header/HeaderDarkBox';
export { default as HeaderGeometric } from './header/HeaderGeometric';
export { default as HeaderDarkBanner } from './header/HeaderDarkBanner';
export { default as HeaderDecorative } from './header/HeaderDecorative';
export { default as HeaderRibbonYellow } from './header/HeaderRibbonYellow';
export { default as HeaderIconSections } from './header/HeaderIconSections';
export { default as HeaderBlueClean } from './header/HeaderBlueClean';

export { default as SidebarDarkNavy } from './sidebar/SidebarDarkNavy';
export { default as SidebarMonogram } from './sidebar/SidebarMonogram';
export { default as SidebarNarrowYellow } from './sidebar/SidebarNarrowYellow';

export { default as ClassicProfessional } from './classic/ClassicProfessional';

export { default as MinimalBlueSections } from './minimal/MinimalBlueSections';
export { default as MinimalLabelsTan } from './minimal/MinimalLabelsTan';
export { default as MinimalTimeline } from './minimal/MinimalTimeline';


/**
 * Template Registry - All 16 featured templates
 */
export const templateRegistry: TemplateRegistryEntry[] = [
    // Header (9)
    { ...headerDarkMeta, component: HeaderDark },
    { ...headerDiagonalYellowMeta, component: HeaderDiagonalYellow },
    { ...headerDarkBoxMeta, component: HeaderDarkBox },
    { ...headerGeometricMeta, component: HeaderGeometric },
    { ...headerDarkBannerMeta, component: HeaderDarkBanner },
    { ...headerDecorativeMeta, component: HeaderDecorative },
    { ...headerRibbonYellowMeta, component: HeaderRibbonYellow },
    { ...headerIconSectionsMeta, component: HeaderIconSections },
    { ...headerBlueCleanMeta, component: HeaderBlueClean },

    // Sidebar (3)
    { ...sidebarDarkNavyMeta, component: SidebarDarkNavy },
    { ...sidebarMonogramMeta, component: SidebarMonogram },
    { ...sidebarNarrowYellowMeta, component: SidebarNarrowYellow },

    // Classic (1)
    { ...classicProfessionalMeta, component: ClassicProfessional },

    // Minimal (3)
    { ...minimalBlueSectionsMeta, component: MinimalBlueSections },
    { ...minimalLabelsTanMeta, component: MinimalLabelsTan },
    { ...minimalTimelineMeta, component: MinimalTimeline },
];

/**
 * Get a template by ID
 */
export const getTemplateById = (id: string): TemplateRegistryEntry | undefined => {
    return templateRegistry.find(t => t.id === id);
};

/**
 * Get all templates in a category
 */
export const getTemplatesByCategory = (category: string): TemplateRegistryEntry[] => {
    return templateRegistry.filter(t => t.category === category);
};

/**
 * Get all unique template categories
 */
export const getTemplateCategories = (): string[] => {
    const categories = new Set(templateRegistry.map(t => t.category));
    return Array.from(categories);
};

/**
 * Get template component by ID (for direct rendering)
 */
export const getTemplateComponent = (id: string): React.ComponentType<TemplateProps> | undefined => {
    const template = getTemplateById(id);
    return template?.component;
};

// Legacy mapping: old layout types to new template IDs
// For backward compatibility with existing code
export const layoutToTemplateId: Record<string, string> = {
    'classic': 'classic-professional',
    'sidebar': 'sidebar-dark-navy',
    'header': 'header-dark',
    'minimal': 'minimal-timeline',
};

/**
 * Convert legacy layout type to template ID
 */
export const getTemplateIdFromLayout = (layout: string): string => {
    return layoutToTemplateId[layout] || 'classic-professional';
};

// Template Registry
// Aggregates all template components and provides lookup functions

import { TemplateRegistryEntry, TemplateProps } from '../shared/types';

// Import templates
import ClassicProfessional, { classicProfessionalMeta } from './classic/ClassicProfessional';
import EuropassClassic, { europassClassicMeta } from './classic/EuropassClassic';
import SidebarModern, { sidebarModernMeta } from './sidebar/SidebarModern';
import HeaderBold, { headerBoldMeta } from './header/HeaderBold';
import HeaderDark, { headerDarkMeta } from './header/HeaderDark';
import HeaderDiagonalYellow, { headerDiagonalYellowMeta } from './header/HeaderDiagonalYellow';
import HeaderDarkBox, { headerDarkBoxMeta } from './header/HeaderDarkBox';
import HeaderGeometric, { headerGeometricMeta } from './header/HeaderGeometric';
import HeaderDarkBanner, { headerDarkBannerMeta } from './header/HeaderDarkBanner';
import HeaderDecorative, { headerDecorativeMeta } from './header/HeaderDecorative';
import HeaderGreenCentered, { headerGreenCenteredMeta } from './header/HeaderGreenCentered';
import HeaderRibbonYellow, { headerRibbonYellowMeta } from './header/HeaderRibbonYellow';
import HeaderIconSections, { headerIconSectionsMeta } from './header/HeaderIconSections';
import HeaderLightGray, { headerLightGrayMeta } from './header/HeaderLightGray';
import HeaderBlueClean, { headerBlueCleanMeta } from './header/HeaderBlueClean';
import MinimalClean, { minimalCleanMeta } from './minimal/MinimalClean';

// Re-export individual templates for direct access
export { default as ClassicProfessional } from './classic/ClassicProfessional';
export { default as EuropassClassic } from './classic/EuropassClassic';
export { default as SidebarModern } from './sidebar/SidebarModern';
export { default as HeaderBold } from './header/HeaderBold';
export { default as HeaderDark } from './header/HeaderDark';
export { default as HeaderDiagonalYellow } from './header/HeaderDiagonalYellow';
export { default as HeaderDarkBox } from './header/HeaderDarkBox';
export { default as HeaderGeometric } from './header/HeaderGeometric';
export { default as HeaderDarkBanner } from './header/HeaderDarkBanner';
export { default as HeaderDecorative } from './header/HeaderDecorative';
export { default as HeaderGreenCentered } from './header/HeaderGreenCentered';
export { default as HeaderRibbonYellow } from './header/HeaderRibbonYellow';
export { default as HeaderIconSections } from './header/HeaderIconSections';
export { default as HeaderLightGray } from './header/HeaderLightGray';
export { default as HeaderBlueClean } from './header/HeaderBlueClean';
export { default as MinimalClean } from './minimal/MinimalClean';

/**
 * Template Registry - All available templates
 * Add new templates here after creating them
 */
export const templateRegistry: TemplateRegistryEntry[] = [
    { ...classicProfessionalMeta, component: ClassicProfessional },
    { ...europassClassicMeta, component: EuropassClassic },
    { ...sidebarModernMeta, component: SidebarModern },
    { ...headerBoldMeta, component: HeaderBold },
    { ...headerDarkMeta, component: HeaderDark },
    { ...headerDiagonalYellowMeta, component: HeaderDiagonalYellow },
    { ...headerDarkBoxMeta, component: HeaderDarkBox },
    { ...headerGeometricMeta, component: HeaderGeometric },
    { ...headerDarkBannerMeta, component: HeaderDarkBanner },
    { ...headerDecorativeMeta, component: HeaderDecorative },
    { ...headerGreenCenteredMeta, component: HeaderGreenCentered },
    { ...headerRibbonYellowMeta, component: HeaderRibbonYellow },
    { ...headerIconSectionsMeta, component: HeaderIconSections },
    { ...headerLightGrayMeta, component: HeaderLightGray },
    { ...headerBlueCleanMeta, component: HeaderBlueClean },
    { ...minimalCleanMeta, component: MinimalClean },
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
    'europass': 'europass-classic',
    'sidebar': 'sidebar-modern',
    'header': 'header-bold',
    'minimal': 'minimal-clean',
};

/**
 * Convert legacy layout type to template ID
 */
export const getTemplateIdFromLayout = (layout: string): string => {
    return layoutToTemplateId[layout] || 'classic-professional';
};

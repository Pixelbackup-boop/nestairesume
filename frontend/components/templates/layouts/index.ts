// Template Registry
// Aggregates all template components and provides lookup functions
// Components are lazy-loaded — only the active template's code is downloaded

import { lazy } from 'react';
import { TemplateRegistryEntry, TemplateProps } from '../shared/types';

// --- Metadata imports (static, small objects) ---
import { headerDarkMeta } from './header/HeaderDark';
import { headerDiagonalYellowMeta } from './header/HeaderDiagonalYellow';
import { headerDarkBoxMeta } from './header/HeaderDarkBox';
import { headerGeometricMeta } from './header/HeaderGeometric';
import { headerDarkBannerMeta } from './header/HeaderDarkBanner';
import { headerDecorativeMeta } from './header/HeaderDecorative';
import { headerRibbonYellowMeta } from './header/HeaderRibbonYellow';
import { headerIconSectionsMeta } from './header/HeaderIconSections';
import { headerBlueCleanMeta } from './header/HeaderBlueClean';
import { sidebarDarkNavyMeta } from './sidebar/SidebarDarkNavy';
import { sidebarMonogramMeta } from './sidebar/SidebarMonogram';
import { sidebarNarrowYellowMeta } from './sidebar/SidebarNarrowYellow';
import { classicProfessionalMeta } from './classic/ClassicProfessional';
import { minimalBlueSectionsMeta } from './minimal/MinimalBlueSections';
import { minimalLabelsTanMeta } from './minimal/MinimalLabelsTan';
import { minimalTimelineMeta } from './minimal/MinimalTimeline';

// --- Lazy-loaded components (only downloaded when used) ---
const HeaderDark = lazy(() => import('./header/HeaderDark'));
const HeaderDiagonalYellow = lazy(() => import('./header/HeaderDiagonalYellow'));
const HeaderDarkBox = lazy(() => import('./header/HeaderDarkBox'));
const HeaderGeometric = lazy(() => import('./header/HeaderGeometric'));
const HeaderDarkBanner = lazy(() => import('./header/HeaderDarkBanner'));
const HeaderDecorative = lazy(() => import('./header/HeaderDecorative'));
const HeaderRibbonYellow = lazy(() => import('./header/HeaderRibbonYellow'));
const HeaderIconSections = lazy(() => import('./header/HeaderIconSections'));
const HeaderBlueClean = lazy(() => import('./header/HeaderBlueClean'));
const SidebarDarkNavy = lazy(() => import('./sidebar/SidebarDarkNavy'));
const SidebarMonogram = lazy(() => import('./sidebar/SidebarMonogram'));
const SidebarNarrowYellow = lazy(() => import('./sidebar/SidebarNarrowYellow'));
const ClassicProfessional = lazy(() => import('./classic/ClassicProfessional'));
const MinimalBlueSections = lazy(() => import('./minimal/MinimalBlueSections'));
const MinimalLabelsTan = lazy(() => import('./minimal/MinimalLabelsTan'));
const MinimalTimeline = lazy(() => import('./minimal/MinimalTimeline'));

/**
 * Template Registry - All 16 featured templates
 * Metadata is eagerly loaded (small). Components are lazy-loaded (large).
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

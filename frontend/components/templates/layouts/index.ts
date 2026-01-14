// Template Registry
// Aggregates all template components and provides lookup functions

import { TemplateRegistryEntry, TemplateProps } from '../shared/types';

// --- Header Templates ---
import HeaderBoldCreative, { headerBoldCreativeMeta } from './header/HeaderBoldCreative';
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

// --- Sidebar Templates ---
import SidebarModern, { sidebarModernMeta } from './sidebar/SidebarModern';
import SidebarDarkGray, { sidebarDarkGrayMeta } from './sidebar/SidebarDarkGray';
import SidebarDarkMinimal, { sidebarDarkMinimalMeta } from './sidebar/SidebarDarkMinimal';
import SidebarDarkNavyCompact, { sidebarDarkNavyCompactMeta } from './sidebar/SidebarDarkNavyCompact';
import SidebarDarkNavy, { sidebarDarkNavyMeta } from './sidebar/SidebarDarkNavy';
import SidebarGreenTeal, { sidebarGreenTealMeta } from './sidebar/SidebarGreenTeal';
import SidebarGreenV1, { sidebarGreenV1Meta } from './sidebar/SidebarGreenV1';
import SidebarGreenV2, { sidebarGreenV2Meta } from './sidebar/SidebarGreenV2';
import SidebarGreenV3, { sidebarGreenV3Meta } from './sidebar/SidebarGreenV3';
import SidebarGreenV4, { sidebarGreenV4Meta } from './sidebar/SidebarGreenV4';
import SidebarMonogram, { sidebarMonogramMeta } from './sidebar/SidebarMonogram';
import SidebarNarrowYellow, { sidebarNarrowYellowMeta } from './sidebar/SidebarNarrowYellow';
import SidebarOrange, { sidebarOrangeMeta } from './sidebar/SidebarOrange';
import SidebarYellow, { sidebarYellowMeta } from './sidebar/SidebarYellow';

// --- Classic Templates ---
import ClassicProfessional, { classicProfessionalMeta } from './classic/ClassicProfessional';
import EuropassClassic, { europassClassicMeta } from './classic/EuropassClassic';
import ClassicAccentBars, { classicAccentBarsMeta } from './classic/ClassicAccentBars';
import ClassicBeige, { classicBeigeMeta } from './classic/ClassicBeige';
import ClassicGreen, { classicGreenMeta } from './classic/ClassicGreen';
import ClassicIconsTeal, { classicIconsTealMeta } from './classic/ClassicIconsTeal';
import ClassicLabelsLeft, { classicLabelsLeftMeta } from './classic/ClassicLabelsLeft';
import ClassicPhotoLeft, { classicPhotoLeftMeta } from './classic/ClassicPhotoLeft';
import ClassicSoftPills, { classicSoftPillsMeta } from './classic/ClassicSoftPills';
import ClassicStrengthBars, { classicStrengthBarsMeta } from './classic/ClassicStrengthBars';

// --- Minimal Templates ---
import MinimalClean, { minimalCleanMeta } from './minimal/MinimalClean';
import MinimalBlueSections, { minimalBlueSectionsMeta } from './minimal/MinimalBlueSections';
import MinimalCentered, { minimalCenteredMeta } from './minimal/MinimalCentered';
import MinimalLabelsTan, { minimalLabelsTanMeta } from './minimal/MinimalLabelsTan';
import MinimalSectionBars, { minimalSectionBarsMeta } from './minimal/MinimalSectionBars';
import MinimalSimple, { minimalSimpleMeta } from './minimal/MinimalSimple';
import MinimalTimeline, { minimalTimelineMeta } from './minimal/MinimalTimeline';
import MinimalUnderline, { minimalUnderlineMeta } from './minimal/MinimalUnderline';

// Re-export individual templates for direct access
export { default as HeaderBoldCreative } from './header/HeaderBoldCreative';
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

export { default as SidebarModern } from './sidebar/SidebarModern';
export { default as SidebarDarkGray } from './sidebar/SidebarDarkGray';
export { default as SidebarDarkMinimal } from './sidebar/SidebarDarkMinimal';
export { default as SidebarDarkNavyCompact } from './sidebar/SidebarDarkNavyCompact';
export { default as SidebarDarkNavy } from './sidebar/SidebarDarkNavy';
export { default as SidebarGreenTeal } from './sidebar/SidebarGreenTeal';
export { default as SidebarGreenV1 } from './sidebar/SidebarGreenV1';
export { default as SidebarGreenV2 } from './sidebar/SidebarGreenV2';
export { default as SidebarGreenV3 } from './sidebar/SidebarGreenV3';
export { default as SidebarGreenV4 } from './sidebar/SidebarGreenV4';
export { default as SidebarMonogram } from './sidebar/SidebarMonogram';
export { default as SidebarNarrowYellow } from './sidebar/SidebarNarrowYellow';
export { default as SidebarOrange } from './sidebar/SidebarOrange';
export { default as SidebarYellow } from './sidebar/SidebarYellow';

export { default as ClassicProfessional } from './classic/ClassicProfessional';
export { default as EuropassClassic } from './classic/EuropassClassic';
export { default as ClassicAccentBars } from './classic/ClassicAccentBars';
export { default as ClassicBeige } from './classic/ClassicBeige';
export { default as ClassicGreen } from './classic/ClassicGreen';
export { default as ClassicIconsTeal } from './classic/ClassicIconsTeal';
export { default as ClassicLabelsLeft } from './classic/ClassicLabelsLeft';
export { default as ClassicPhotoLeft } from './classic/ClassicPhotoLeft';
export { default as ClassicSoftPills } from './classic/ClassicSoftPills';
export { default as ClassicStrengthBars } from './classic/ClassicStrengthBars';

export { default as MinimalClean } from './minimal/MinimalClean';
export { default as MinimalBlueSections } from './minimal/MinimalBlueSections';
export { default as MinimalCentered } from './minimal/MinimalCentered';
export { default as MinimalLabelsTan } from './minimal/MinimalLabelsTan';
export { default as MinimalSectionBars } from './minimal/MinimalSectionBars';
export { default as MinimalSimple } from './minimal/MinimalSimple';
export { default as MinimalTimeline } from './minimal/MinimalTimeline';
export { default as MinimalUnderline } from './minimal/MinimalUnderline';


/**
 * Template Registry - All available templates
 * Add new templates here after creating them
 */
export const templateRegistry: TemplateRegistryEntry[] = [
    // Header
    { ...headerBoldCreativeMeta, component: HeaderBoldCreative },
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

    // Sidebar
    { ...sidebarModernMeta, component: SidebarModern },
    { ...sidebarDarkGrayMeta, component: SidebarDarkGray },
    { ...sidebarDarkMinimalMeta, component: SidebarDarkMinimal },
    { ...sidebarDarkNavyCompactMeta, component: SidebarDarkNavyCompact },
    { ...sidebarDarkNavyMeta, component: SidebarDarkNavy },
    { ...sidebarGreenTealMeta, component: SidebarGreenTeal },
    { ...sidebarGreenV1Meta, component: SidebarGreenV1 },
    { ...sidebarGreenV2Meta, component: SidebarGreenV2 },
    { ...sidebarGreenV3Meta, component: SidebarGreenV3 },
    { ...sidebarGreenV4Meta, component: SidebarGreenV4 },
    { ...sidebarMonogramMeta, component: SidebarMonogram },
    { ...sidebarNarrowYellowMeta, component: SidebarNarrowYellow },
    { ...sidebarOrangeMeta, component: SidebarOrange },
    { ...sidebarYellowMeta, component: SidebarYellow },

    // Classic
    { ...classicProfessionalMeta, component: ClassicProfessional },
    { ...europassClassicMeta, component: EuropassClassic },
    { ...classicAccentBarsMeta, component: ClassicAccentBars },
    { ...classicBeigeMeta, component: ClassicBeige },
    { ...classicGreenMeta, component: ClassicGreen },
    { ...classicIconsTealMeta, component: ClassicIconsTeal },
    { ...classicLabelsLeftMeta, component: ClassicLabelsLeft },
    { ...classicPhotoLeftMeta, component: ClassicPhotoLeft },
    { ...classicSoftPillsMeta, component: ClassicSoftPills },
    { ...classicStrengthBarsMeta, component: ClassicStrengthBars },

    // Minimal
    { ...minimalCleanMeta, component: MinimalClean },
    { ...minimalBlueSectionsMeta, component: MinimalBlueSections },
    { ...minimalCenteredMeta, component: MinimalCentered },
    { ...minimalLabelsTanMeta, component: MinimalLabelsTan },
    { ...minimalSectionBarsMeta, component: MinimalSectionBars },
    { ...minimalSimpleMeta, component: MinimalSimple },
    { ...minimalTimelineMeta, component: MinimalTimeline },
    { ...minimalUnderlineMeta, component: MinimalUnderline },
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
    'header': 'header-bold-creative',
    'minimal': 'minimal-clean',
};

/**
 * Convert legacy layout type to template ID
 */
export const getTemplateIdFromLayout = (layout: string): string => {
    return layoutToTemplateId[layout] || 'classic-professional';
};

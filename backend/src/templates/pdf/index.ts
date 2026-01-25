/**
 * PDF Template Registry
 * Exports all 16 featured PDF templates
 */

import { PdfResumeData, PdfTheme, PdfTranslations } from '../../types/pdf';
import { renderClassicProfessional } from './classic-professional';

// Sidebar Templates (3)
import { renderSidebarDarkNavy } from './sidebar-dark-navy';
import { renderSidebarNarrowYellow } from './sidebar-narrow-yellow';
import { renderSidebarMonogram } from './sidebar-monogram';

// Header Templates (9)
import { renderHeaderDark } from './header-dark';
import { renderHeaderDarkBanner } from './header-dark-banner';
import { renderHeaderDarkBox } from './header-dark-box';
import { renderHeaderDiagonalYellow } from './header-diagonal-yellow';
import { renderHeaderRibbonYellow } from './header-ribbon-yellow';
import { renderHeaderDecorative } from './header-decorative';
import { renderHeaderGeometric } from './header-geometric';
import { renderHeaderIconSections } from './header-icon-sections';
import { renderHeaderBlueClean } from './header-blue-clean';

// Minimal Templates (3)
import { renderMinimalTimeline } from './minimal-timeline';
import { renderMinimalLabelsTan } from './minimal-labels-tan';
import { renderMinimalBlueSections } from './minimal-blue-sections';

export type TemplateRenderer = (data: PdfResumeData, theme: PdfTheme, translations?: PdfTranslations, locale?: string) => string;

export const templates: Record<string, TemplateRenderer> = {
    // Sidebar Templates (3)
    'sidebar-dark-navy': renderSidebarDarkNavy,
    'sidebar-narrow-yellow': renderSidebarNarrowYellow,
    'sidebar-monogram': renderSidebarMonogram,

    // Header Templates (9)
    'header-dark': renderHeaderDark,
    'header-dark-banner': renderHeaderDarkBanner,
    'header-dark-box': renderHeaderDarkBox,
    'header-diagonal-yellow': renderHeaderDiagonalYellow,
    'header-ribbon-yellow': renderHeaderRibbonYellow,
    'header-decorative': renderHeaderDecorative,
    'header-geometric': renderHeaderGeometric,
    'header-icon-sections': renderHeaderIconSections,
    'header-icon-orange': renderHeaderIconSections, // Alias
    'header-blue-clean': renderHeaderBlueClean,

    // Classic Templates (1)
    'classic-professional': renderClassicProfessional,
    'classic-pro': renderClassicProfessional, // Alias

    // Minimal Templates (3)
    'minimal-timeline': renderMinimalTimeline,
    'minimal-labels-tan': renderMinimalLabelsTan,
    'minimal-blue-sections': renderMinimalBlueSections,

    // Legacy aliases for backward compatibility
    'classic': renderClassicProfessional,
    'sidebar': renderSidebarDarkNavy,
    'header': renderHeaderDark,
    'minimal': renderMinimalTimeline,
};

export const getTemplateRenderer = (templateId: string): TemplateRenderer => {
    const renderer = templates[templateId];
    if (!renderer) {
        console.warn(`Template "${templateId}" not found, falling back to classic-professional`);
        return renderClassicProfessional;
    }
    return renderer;
};

export {
    renderClassicProfessional,
    renderSidebarDarkNavy,
    renderSidebarNarrowYellow,
    renderSidebarMonogram,
    renderHeaderDark,
    renderHeaderDarkBanner,
    renderHeaderDarkBox,
    renderHeaderDiagonalYellow,
    renderHeaderRibbonYellow,
    renderHeaderDecorative,
    renderHeaderGeometric,
    renderHeaderIconSections,
    renderHeaderBlueClean,
    renderMinimalTimeline,
    renderMinimalLabelsTan,
    renderMinimalBlueSections,
};

/**
 * PDF Template Registry
 * Exports all 16 featured PDF templates
 */
import { PdfResumeData, PdfTheme, PdfTranslations } from '../../types/pdf';
import { renderClassicProfessional } from './classic-professional';
import { renderSidebarDarkNavy } from './sidebar-dark-navy';
import { renderSidebarNarrowYellow } from './sidebar-narrow-yellow';
import { renderSidebarMonogram } from './sidebar-monogram';
import { renderHeaderDark } from './header-dark';
import { renderHeaderDarkBanner } from './header-dark-banner';
import { renderHeaderDarkBox } from './header-dark-box';
import { renderHeaderDiagonalYellow } from './header-diagonal-yellow';
import { renderHeaderRibbonYellow } from './header-ribbon-yellow';
import { renderHeaderDecorative } from './header-decorative';
import { renderHeaderGeometric } from './header-geometric';
import { renderHeaderIconSections } from './header-icon-sections';
import { renderHeaderBlueClean } from './header-blue-clean';
import { renderMinimalTimeline } from './minimal-timeline';
import { renderMinimalLabelsTan } from './minimal-labels-tan';
import { renderMinimalBlueSections } from './minimal-blue-sections';
export type TemplateRenderer = (data: PdfResumeData, theme: PdfTheme, translations?: PdfTranslations, locale?: string) => string;
export declare const templates: Record<string, TemplateRenderer>;
export declare const getTemplateRenderer: (templateId: string) => TemplateRenderer;
export { renderClassicProfessional, renderSidebarDarkNavy, renderSidebarNarrowYellow, renderSidebarMonogram, renderHeaderDark, renderHeaderDarkBanner, renderHeaderDarkBox, renderHeaderDiagonalYellow, renderHeaderRibbonYellow, renderHeaderDecorative, renderHeaderGeometric, renderHeaderIconSections, renderHeaderBlueClean, renderMinimalTimeline, renderMinimalLabelsTan, renderMinimalBlueSections, };
//# sourceMappingURL=index.d.ts.map
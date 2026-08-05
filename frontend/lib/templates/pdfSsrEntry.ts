/**
 * SSR entry for backend PDF generation.
 *
 * Bundled by `scripts/build-pdf-react-templates.mjs` into
 * `backend/generated/reactTemplates.js` so the backend renders the SAME
 * React templates the browser preview uses (single source of truth).
 *
 * Uses createElement (no JSX) so the file needs no special transform config.
 * Note: the build aliases '@/hooks' to hooks/useTemplateSetup.ts to keep
 * browser-only hooks (ads, auth store, next-intl) out of the bundle.
 */
import { createElement, ComponentType } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { TranslationProvider, TemplateTranslations } from './TranslationContext';
import { getSidebarConfig } from './sidebarConfig';
import { TemplateProps } from '@/components/templates/shared/types';
import { ResumeData } from '@/store/useResumeStore';
import { ThemeColor } from '@/lib/themes';

// Classic (1)
import ClassicProfessional from '@/components/templates/layouts/classic/ClassicProfessional';
// Sidebar (3)
import SidebarDarkNavy from '@/components/templates/layouts/sidebar/SidebarDarkNavy';
import SidebarNarrowYellow from '@/components/templates/layouts/sidebar/SidebarNarrowYellow';
import SidebarMonogram from '@/components/templates/layouts/sidebar/SidebarMonogram';
// Header (9)
import HeaderDark from '@/components/templates/layouts/header/HeaderDark';
import HeaderDarkBanner from '@/components/templates/layouts/header/HeaderDarkBanner';
import HeaderDarkBox from '@/components/templates/layouts/header/HeaderDarkBox';
import HeaderDiagonalYellow from '@/components/templates/layouts/header/HeaderDiagonalYellow';
import HeaderRibbonYellow from '@/components/templates/layouts/header/HeaderRibbonYellow';
import HeaderDecorative from '@/components/templates/layouts/header/HeaderDecorative';
import HeaderGeometric from '@/components/templates/layouts/header/HeaderGeometric';
import HeaderIconSections from '@/components/templates/layouts/header/HeaderIconSections';
import HeaderBlueClean from '@/components/templates/layouts/header/HeaderBlueClean';
// Minimal (3)
import MinimalTimeline from '@/components/templates/layouts/minimal/MinimalTimeline';
import MinimalLabelsTan from '@/components/templates/layouts/minimal/MinimalLabelsTan';
import MinimalBlueSections from '@/components/templates/layouts/minimal/MinimalBlueSections';

// Keys mirror the backend PDF registry (backend/src/templates/pdf/index.ts),
// including its aliases, so the two lookups always agree.
const ssrTemplates: Record<string, ComponentType<TemplateProps>> = {
    // Sidebar (3)
    'sidebar-dark-navy': SidebarDarkNavy,
    'sidebar-narrow-yellow': SidebarNarrowYellow,
    'sidebar-monogram': SidebarMonogram,

    // Header (9)
    'header-dark': HeaderDark,
    'header-dark-banner': HeaderDarkBanner,
    'header-dark-box': HeaderDarkBox,
    'header-diagonal-yellow': HeaderDiagonalYellow,
    'header-ribbon-yellow': HeaderRibbonYellow,
    'header-decorative': HeaderDecorative,
    'header-geometric': HeaderGeometric,
    'header-icon-sections': HeaderIconSections,
    'header-icon-orange': HeaderIconSections, // Alias
    'header-blue-clean': HeaderBlueClean,

    // Classic (1)
    'classic-professional': ClassicProfessional,
    'classic-pro': ClassicProfessional, // Alias

    // Minimal (3)
    'minimal-timeline': MinimalTimeline,
    'minimal-labels-tan': MinimalLabelsTan,
    'minimal-blue-sections': MinimalBlueSections,

    // Legacy aliases for backward compatibility
    'classic': ClassicProfessional,
    'sidebar': SidebarDarkNavy,
    'header': HeaderDark,
    'minimal': MinimalTimeline,
};

export function hasReactTemplate(templateId: string): boolean {
    return templateId in ssrTemplates;
}

export function renderReactTemplate(
    templateId: string,
    data: ResumeData,
    theme: ThemeColor,
    translations?: TemplateTranslations
): string {
    const Template = ssrTemplates[templateId];
    if (!Template) {
        throw new Error(`No React SSR template registered for id: ${templateId}`);
    }
    const html = renderToStaticMarkup(
        createElement(TranslationProvider, {
            translations,
            children: createElement(Template, { data, theme, scale: 1 }),
        })
    );

    // Sidebar templates: repeat the sidebar background on every printed page.
    // Mirrors PagedPreview's per-page backdrop; .sidebar-bg-fixed (position:fixed)
    // is defined in the backend htmlWrapper and repeats per page in print.
    const sidebar = getSidebarConfig(templateId, data.customThemeColor);
    if (!sidebar) return html;

    const border = sidebar.accentBorder
        ? `border-${sidebar.accentBorder.side}:${sidebar.accentBorder.width}px solid ${sidebar.accentBorder.color};`
        : '';
    const backdrop = `<div class="sidebar-bg-fixed" style="width:${sidebar.width}px;background-color:${sidebar.bgColor};${border}"></div>`;
    return `${backdrop}<div class="main-content">${html}</div>`;
}

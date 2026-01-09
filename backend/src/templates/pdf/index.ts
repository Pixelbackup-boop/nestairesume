/**
 * PDF Template Registry
 * Exports all available PDF templates
 */

import { PdfResumeData, PdfTheme } from '../../types/pdf';
import { renderClassicProfessional } from './classic-professional';
import { renderEuropassClassic } from './europass-classic';
import { renderSidebarModern } from './sidebar-modern';
import { renderMinimalClean } from './minimal-clean';
import { renderHeaderBold } from './header-bold';

export type TemplateRenderer = (data: PdfResumeData, theme: PdfTheme) => string;

export const templates: Record<string, TemplateRenderer> = {
    'classic-professional': renderClassicProfessional,
    'europass-classic': renderEuropassClassic,
    'sidebar-modern': renderSidebarModern,
    'minimal-clean': renderMinimalClean,
    'header-bold': renderHeaderBold,
    // Aliases for backward compatibility
    'classic': renderClassicProfessional,
    'modern-sidebar': renderSidebarModern,
    'minimal': renderMinimalClean,
    'header': renderHeaderBold,
    'europass': renderEuropassClassic,
};

export const getTemplateRenderer = (templateId: string): TemplateRenderer => {
    const renderer = templates[templateId];
    if (!renderer) {
        console.warn(`Template "${templateId}" not found, falling back to classic-professional`);
        return renderClassicProfessional;
    }
    return renderer;
};

export { renderClassicProfessional, renderEuropassClassic, renderSidebarModern, renderMinimalClean, renderHeaderBold };

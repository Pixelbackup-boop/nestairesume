'use client';

import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { ThemeColor } from '@/lib/themes';
import { getTemplateById, getTemplateIdFromLayout, templateRegistry } from './layouts';
import { TranslationProvider, TemplateTranslations } from '@/lib/templates/TranslationContext';

// Re-export types for convenience
export type { TemplateProps, TemplateMeta, TemplateRegistryEntry } from './shared/types';
export { templateRegistry, getTemplateById, getTemplatesByCategory, getTemplateCategories } from './layouts';

// Legacy layout type for backward compatibility
export type LayoutType = 'classic' | 'sidebar' | 'header' | 'minimal' | 'europass';

interface UnifiedTemplateProps {
    data: ResumeData;
    theme: ThemeColor;
    scale?: number;
    /** New: Direct template ID (e.g., 'sidebar-modern') */
    templateId?: string;
    /** Legacy: Layout type (e.g., 'sidebar') - converted to templateId */
    layout?: LayoutType;
    /** Translations for section headers and labels (i18n support) */
    translations?: TemplateTranslations;
}

/**
 * UnifiedTemplate - Router that dispatches to the correct template component.
 *
 * Supports both:
 * - New templateId prop: <UnifiedTemplate templateId="sidebar-modern" ... />
 * - Legacy layout prop: <UnifiedTemplate layout="sidebar" ... />
 *
 * The templateId takes precedence if both are provided.
 */
export default function UnifiedTemplate({
    data,
    theme,
    scale = 1,
    templateId,
    layout,
    translations,
}: UnifiedTemplateProps) {
    // Determine which template to render
    // Priority: templateId > layout conversion > default
    let resolvedTemplateId = templateId;

    if (!resolvedTemplateId && layout) {
        // Convert legacy layout type to template ID
        resolvedTemplateId = getTemplateIdFromLayout(layout);
    }

    if (!resolvedTemplateId) {
        resolvedTemplateId = 'classic-professional';
    }

    // Look up template in registry
    const template = getTemplateById(resolvedTemplateId);

    if (!template) {
        // Fallback to classic if template not found
        const fallback = getTemplateById('classic-professional');
        if (!fallback) {
            return (
                <div className="p-4 text-red-500">
                    Template not found: {resolvedTemplateId}
                </div>
            );
        }
        const FallbackComponent = fallback.component;
        return (
            <TranslationProvider translations={translations}>
                <FallbackComponent data={data} theme={theme} scale={scale} />
            </TranslationProvider>
        );
    }

    const TemplateComponent = template.component;
    return (
        <TranslationProvider translations={translations}>
            <TemplateComponent data={data} theme={theme} scale={scale} />
        </TranslationProvider>
    );
}

// Named exports for direct template access (backward compatibility)
export { default as ClassicProfessional } from './layouts/classic/ClassicProfessional';
export { default as SidebarDarkNavy } from './layouts/sidebar/SidebarDarkNavy';
export { default as HeaderDark } from './layouts/header/HeaderDark';
export { default as MinimalTimeline } from './layouts/minimal/MinimalTimeline';

// Legacy named exports mapping to new components
export { default as ClassicTemplate } from './layouts/classic/ClassicProfessional';
export { default as SidebarTemplate } from './layouts/sidebar/SidebarDarkNavy';
export { default as HeaderTemplate } from './layouts/header/HeaderDark';
export { default as MinimalTemplate } from './layouts/minimal/MinimalTimeline';

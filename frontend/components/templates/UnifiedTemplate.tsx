'use client';

import React, { Suspense } from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { ThemeColor } from '@/lib/themes';
import { getTemplateById, getTemplateIdFromLayout } from './layouts';
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
 * Templates are lazy-loaded — only the active template's JS is downloaded.
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
        resolvedTemplateId = getTemplateIdFromLayout(layout);
    }

    if (!resolvedTemplateId) {
        resolvedTemplateId = 'classic-professional';
    }

    // Look up template in registry
    const template = getTemplateById(resolvedTemplateId);

    if (!template) {
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
            <Suspense fallback={<TemplateLoadingSkeleton />}>
                <TranslationProvider translations={translations}>
                    <FallbackComponent data={data} theme={theme} scale={scale} />
                </TranslationProvider>
            </Suspense>
        );
    }

    const TemplateComponent = template.component;
    return (
        <Suspense fallback={<TemplateLoadingSkeleton />}>
            <TranslationProvider translations={translations}>
                <TemplateComponent data={data} theme={theme} scale={scale} />
            </TranslationProvider>
        </Suspense>
    );
}

function TemplateLoadingSkeleton() {
    return (
        <div className="w-full h-full bg-white animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
        </div>
    );
}

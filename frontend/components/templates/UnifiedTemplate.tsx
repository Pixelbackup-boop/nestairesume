'use client';

import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { ThemeColor } from '@/lib/themes';
import { getTemplateById, getTemplateIdFromLayout, templateRegistry } from './layouts';

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
        return <FallbackComponent data={data} theme={theme} scale={scale} />;
    }

    const TemplateComponent = template.component;
    return <TemplateComponent data={data} theme={theme} scale={scale} />;
}

// Named exports for direct template access (backward compatibility)
export { default as ClassicProfessional } from './layouts/classic/ClassicProfessional';
export { default as SidebarModern } from './layouts/sidebar/SidebarModern';
export { default as HeaderBold } from './layouts/header/HeaderBold';
export { default as MinimalClean } from './layouts/minimal/MinimalClean';

// Legacy named exports mapping to new components
export { default as ClassicTemplate } from './layouts/classic/ClassicProfessional';
export { default as SidebarTemplate } from './layouts/sidebar/SidebarModern';
export { default as HeaderTemplate } from './layouts/header/HeaderBold';
export { default as MinimalTemplate } from './layouts/minimal/MinimalClean';

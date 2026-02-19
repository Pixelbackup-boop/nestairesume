'use client';

import React, { useRef, useState, useEffect } from 'react';
import UnifiedTemplate from '@/components/templates/UnifiedTemplate';
import {
    builderTemplates,
    getSampleResumeDataWithProfile,
    generateTheme,
} from '@/lib/templates/builder';

interface TemplateData {
    id: string;
    name: string;
    layout: string;
    accentColor?: string;
    templateId?: string;
}

interface BuilderTemplatePreviewProps {
    template: TemplateData;
}

const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

const getTemplateIdForLayout = (layout: string): string => {
    switch (layout) {
        case 'sidebar': return 'sidebar-modern';
        case 'header': return 'header-bold';
        case 'classic': return 'classic-professional';
        case 'minimal': return 'minimal-clean';
        case 'europass': return 'europass-classic';
        default: return 'classic-professional';
    }
};

export default function BuilderTemplatePreview({
    template,
}: BuilderTemplatePreviewProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(0);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const ro = new ResizeObserver(([entry]) => {
            const w = entry.contentRect.width;
            if (w > 0) setContainerWidth(w);
        });
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    // Stable sample data: always use global index from builderTemplates
    const globalIndex = builderTemplates.findIndex(t => t.id === template.id);
    const sampleData = getSampleResumeDataWithProfile(globalIndex >= 0 ? globalIndex : 0);
    const theme = generateTheme(template.accentColor || '#374151');
    const resolvedTemplateId = template.templateId || getTemplateIdForLayout(template.layout);
    const scale = containerWidth / A4_WIDTH;

    return (
        <div
            ref={containerRef}
            className="w-full rounded-lg overflow-hidden bg-white"
            style={{ aspectRatio: `${A4_WIDTH} / ${A4_HEIGHT}` }}
        >
            {containerWidth > 0 && (
                <div
                    style={{
                        width: `${A4_WIDTH}px`,
                        height: `${A4_HEIGHT}px`,
                        transform: `scale(${scale})`,
                        transformOrigin: 'top left',
                    }}
                >
                    <UnifiedTemplate
                        data={sampleData}
                        theme={theme}
                        templateId={resolvedTemplateId}
                        scale={1}
                    />
                </div>
            )}
        </div>
    );
}

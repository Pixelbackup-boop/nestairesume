'use client';

import React from 'react';
import UnifiedTemplate from '@/components/templates/UnifiedTemplate';
import { getSampleResumeDataWithProfile, generateTheme } from '@/lib/templates/builder';

interface TemplateData {
    id: string;
    name: string;
    layout: string;
    accentColor?: string;
    templateId?: string;
}

interface BuilderTemplatePreviewProps {
    template: TemplateData;
    templateIndex: number;
    thumbnailWidth?: number;
}

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
    templateIndex,
    thumbnailWidth = 254,
}: BuilderTemplatePreviewProps) {
    const sampleData = getSampleResumeDataWithProfile(templateIndex);
    const theme = generateTheme(template.accentColor || '#374151');

    const resolvedTemplateId = template.templateId || getTemplateIdForLayout(template.layout);

    const a4Width = 794;
    const a4Height = 1123;
    const cssScale = thumbnailWidth / a4Width;
    const thumbnailHeight = Math.round(a4Height * cssScale);

    return (
        <div
            className="rounded-lg overflow-hidden bg-white relative"
            style={{
                width: `${thumbnailWidth}px`,
                height: `${thumbnailHeight}px`,
            }}
        >
            <div
                style={{
                    width: `${a4Width}px`,
                    height: `${a4Height}px`,
                    transform: `scale(${cssScale})`,
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
        </div>
    );
}

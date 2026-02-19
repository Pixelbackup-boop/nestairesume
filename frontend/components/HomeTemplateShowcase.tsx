'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import {
    builderTemplates,
    getSampleResumeDataWithProfile,
    generateTheme,
} from '@/lib/templates/builder';
import UnifiedTemplate from '@/components/templates/UnifiedTemplate';

// 5 diverse templates to showcase on the homepage (mix of all categories)
const SHOWCASE_IDS = [
    'sidebar-dark-navy',      // Professional sidebar
    'header-dark',            // Executive header
    'header-decorative',      // Creative header
    'minimal-timeline',       // Clean minimal
    'classic-pro',            // Traditional classic
];

const THUMBNAIL_WIDTH = 254;
const A4_WIDTH = 794;
const A4_HEIGHT = 1123;
const CSS_SCALE = THUMBNAIL_WIDTH / A4_WIDTH;
const THUMBNAIL_HEIGHT = Math.round(A4_HEIGHT * CSS_SCALE);

function TemplateSkeleton() {
    return (
        <div className="animate-pulse">
            <div
                className="rounded-xl bg-gray-200 mb-3"
                style={{ width: '100%', aspectRatio: '3/4' }}
            />
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-1" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
    );
}

function TemplateCard({ templateId, index }: { templateId: string; index: number }) {
    const locale = useLocale();
    const template = builderTemplates.find(t => t.id === templateId);
    if (!template) return null;

    const sampleData = getSampleResumeDataWithProfile(index);
    const theme = generateTheme(template.accentColor || '#374151');
    const resolvedTemplateId = template.templateId || template.id;

    return (
        <Link href={`/${locale}/templates`} className="group cursor-pointer">
            <div className="aspect-[3/4] rounded-xl overflow-hidden border border-gray-200 mb-3 shadow-md group-hover:shadow-xl transition-shadow bg-white">
                <div
                    style={{
                        width: `${A4_WIDTH}px`,
                        height: `${A4_HEIGHT}px`,
                        transform: `scale(${CSS_SCALE})`,
                        transformOrigin: 'top left',
                    }}
                >
                    <Suspense fallback={<div className="w-full h-full bg-gray-100" />}>
                        <UnifiedTemplate
                            data={sampleData}
                            theme={theme}
                            templateId={resolvedTemplateId}
                            scale={1}
                        />
                    </Suspense>
                </div>
            </div>
            <h3 className="font-medium text-sm text-dark-teal">{template.name}</h3>
            <p className="text-xs text-dark-teal/80">{template.style}</p>
        </Link>
    );
}

export default function HomeTemplateShowcase() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {SHOWCASE_IDS.map((id, index) => (
                <Suspense key={id} fallback={<TemplateSkeleton />}>
                    <TemplateCard templateId={id} index={index} />
                </Suspense>
            ))}
        </div>
    );
}

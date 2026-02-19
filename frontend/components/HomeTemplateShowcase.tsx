'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { builderTemplates } from '@/lib/templates/builder';
import BuilderTemplatePreview from '@/components/templates/previews/BuilderTemplatePreview';

// 5 diverse templates for the homepage (mix of all categories)
const SHOWCASE_IDS = [
    'sidebar-dark-navy',
    'header-dark',
    'header-decorative',
    'minimal-timeline',
    'classic-pro',
];

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

export default function HomeTemplateShowcase() {
    const locale = useLocale();

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {SHOWCASE_IDS.map((id) => {
                const templateIndex = builderTemplates.findIndex(t => t.id === id);
                const template = builderTemplates[templateIndex];
                if (!template) return null;

                return (
                    <Link key={id} href={`/${locale}/templates`} className="group cursor-pointer">
                        <div className="aspect-[3/4] rounded-xl overflow-hidden border border-gray-200 mb-3 shadow-md group-hover:shadow-xl transition-shadow">
                            <Suspense fallback={<div className="w-full h-full bg-gray-100" />}>
                                <BuilderTemplatePreview
                                    template={template}
                                    templateIndex={templateIndex}
                                />
                            </Suspense>
                        </div>
                        <h3 className="font-medium text-sm text-dark-teal">{template.name}</h3>
                        <p className="text-xs text-dark-teal/80">{template.style}</p>
                    </Link>
                );
            })}
        </div>
    );
}

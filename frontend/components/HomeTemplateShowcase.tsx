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
    'sidebar-narrow-yellow',
    'header-blue-clean',
];

export default function HomeTemplateShowcase() {
    const locale = useLocale();

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {SHOWCASE_IDS.map((id) => {
                const template = builderTemplates.find(t => t.id === id);
                if (!template) return null;

                return (
                    <Link key={id} href={`/${locale}/templates`} className="group cursor-pointer">
                        <div className="rounded-xl overflow-hidden border border-gray-200 mb-3 shadow-md group-hover:shadow-xl transition-shadow">
                            <Suspense fallback={<div className="w-full bg-gray-100" style={{ aspectRatio: '794 / 1123' }} />}>
                                <BuilderTemplatePreview template={template} />
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

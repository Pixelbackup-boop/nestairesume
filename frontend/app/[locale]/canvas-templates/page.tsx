'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { TemplatesAnimations } from '@/components/TemplatesAnimations';
import {
    Search,
    Briefcase,
    Palette,
    Minimize2,
    Sparkles,
    ArrowRight,
    FileText,
} from 'lucide-react';
import { canvasTemplates } from '@/lib/templates/canvas';
import { useCanvasStore, CanvasTemplate } from '@/store/useCanvasStore';

type CategoryFilter = 'all' | 'professional' | 'creative' | 'minimal';

const categories: CategoryFilter[] = ['all', 'professional', 'creative', 'minimal'];

const categoryIcons: Record<CategoryFilter, React.ElementType> = {
    all: Sparkles,
    professional: Briefcase,
    creative: Palette,
    minimal: Minimize2,
};

export default function CanvasTemplatesPage() {
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations('CanvasTemplates');
    const { loadTemplate } = useCanvasStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
    const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);

    const localizedHref = (path: string) => locale === 'en' ? path : `/${locale}${path}`;

    const filteredTemplates = useMemo(() => {
        return canvasTemplates.filter((template) => {
            const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    const handleSelectTemplate = (template: CanvasTemplate) => {
        loadTemplate(template);
        router.push(localizedHref('/canvas-editor'));
    };

    const renderCanvasPreview = (template: CanvasTemplate) => {
        const scale = 0.28;
        const previewWidth = 595 * scale;
        const previewHeight = 842 * scale;

        return (
            <div
                className="relative overflow-hidden rounded-lg mx-auto"
                style={{
                    width: previewWidth,
                    height: previewHeight,
                    backgroundColor: template.backgroundColor,
                }}
            >
                <svg
                    width={previewWidth}
                    height={previewHeight}
                    viewBox="0 0 595 842"
                    className="absolute inset-0"
                >
                    {template.elements.map((element, index) => {
                        if (element.type === 'shape') {
                            if (element.shapeType === 'circle') {
                                const cx = element.x + element.width / 2;
                                const cy = element.y + element.height / 2;
                                const rx = element.width / 2;
                                const ry = element.height / 2;
                                if (element.imageSrc) {
                                    const clipId = `shape-clip-${template.id}-${index}`;
                                    return (
                                        <g key={index}>
                                            <defs>
                                                <clipPath id={clipId}>
                                                    <ellipse cx={cx} cy={cy} rx={rx} ry={ry} />
                                                </clipPath>
                                            </defs>
                                            <image
                                                href={element.imageSrc}
                                                x={element.x}
                                                y={element.y}
                                                width={element.width}
                                                height={element.height}
                                                clipPath={`url(#${clipId})`}
                                                preserveAspectRatio="xMidYMid slice"
                                            />
                                            {element.stroke && element.stroke !== 'transparent' && (
                                                <ellipse
                                                    cx={cx} cy={cy} rx={rx} ry={ry}
                                                    fill="none"
                                                    stroke={element.stroke}
                                                    strokeWidth={element.strokeWidth || 0}
                                                />
                                            )}
                                        </g>
                                    );
                                }
                                return (
                                    <ellipse
                                        key={index}
                                        cx={cx} cy={cy} rx={rx} ry={ry}
                                        fill={element.fill}
                                    />
                                );
                            }
                            return (
                                <rect
                                    key={index}
                                    x={element.x}
                                    y={element.y}
                                    width={element.width}
                                    height={element.height}
                                    fill={element.fill}
                                    rx={element.cornerRadius || 0}
                                />
                            );
                        }
                        if (element.type === 'text') {
                            const lines = element.text.split('\n');
                            const lineHeight = element.fontSize * (element.lineHeight || 1.4);
                            return (
                                <text
                                    key={index}
                                    x={element.x}
                                    y={element.y + element.fontSize}
                                    fill={element.fill}
                                    fontSize={element.fontSize}
                                    fontFamily={element.fontFamily || 'Inter, sans-serif'}
                                    fontWeight={element.fontWeight || 'normal'}
                                    textAnchor={element.align === 'center' ? 'middle' : element.align === 'right' ? 'end' : 'start'}
                                    dominantBaseline="auto"
                                >
                                    {lines.map((line, lineIndex) => (
                                        <tspan
                                            key={lineIndex}
                                            x={element.align === 'center' ? element.x + element.width / 2 : element.align === 'right' ? element.x + element.width : element.x}
                                            dy={lineIndex === 0 ? 0 : lineHeight}
                                        >
                                            {line}
                                        </tspan>
                                    ))}
                                </text>
                            );
                        }
                        if (element.type === 'icon') {
                            return (
                                <circle
                                    key={index}
                                    cx={element.x + element.width / 2}
                                    cy={element.y + element.height / 2}
                                    r={element.width / 2}
                                    fill={element.fill}
                                    opacity={0.8}
                                />
                            );
                        }
                        if (element.type === 'image') {
                            const clipId = `clip-${template.id}-${index}`;
                            return (
                                <g key={index}>
                                    <defs>
                                        <clipPath id={clipId}>
                                            <circle
                                                cx={element.x + element.width / 2}
                                                cy={element.y + element.height / 2}
                                                r={Math.min(element.width, element.height) / 2}
                                            />
                                        </clipPath>
                                    </defs>
                                    <image
                                        href={element.src}
                                        x={element.x}
                                        y={element.y}
                                        width={element.width}
                                        height={element.height}
                                        clipPath={`url(#${clipId})`}
                                        preserveAspectRatio="xMidYMid slice"
                                    />
                                </g>
                            );
                        }
                        return null;
                    })}
                </svg>
            </div>
        );
    };

    return (
        <div className="min-h-screen">
            <Header />

            {/* Hero */}
            <section className="pt-32 pb-8">
                <TemplatesAnimations.Hero>
                    <div className="max-w-6xl mx-auto px-6 text-center">
                        <span className="text-accent-green font-medium text-sm uppercase tracking-wider">{t('sectionTitle')}</span>
                        <h1 className="text-5xl font-bold mt-3 mb-4 text-gray-900">
                            {t('title')}<br />
                            <span className="gradient-text">{t('titleHighlight')}</span>
                        </h1>
                        <span className="inline-block px-5 py-2 text-lg font-extrabold uppercase tracking-wide text-white rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_4px_20px_rgba(0,220,130,0.4)] mb-5">
                            {t('freeBadge')}
                        </span>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg mt-1">
                            {t('subtitle')}
                        </p>
                    </div>
                </TemplatesAnimations.Hero>
            </section>

            {/* Cross-link to Form Builder Templates */}
            <section className="pb-6">
                <div className="max-w-6xl mx-auto px-6">
                    <Link
                        href={localizedHref('/templates')}
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-bg-card border border-border-subtle rounded-xl text-sm text-gray-600 hover:text-accent-green hover:border-accent-green transition-colors"
                    >
                        <FileText size={16} />
                        {t('formBuilderBanner')}
                        <span className="font-medium">{t('viewFormTemplates')}</span>
                        <ArrowRight size={14} />
                    </Link>
                </div>
            </section>

            {/* Templates Section - Dark Container */}
            <div className="templates-section-dark">
                {/* Search and Filters */}
                <section className="pb-6">
                    <TemplatesAnimations.FiltersSection>
                        <div className="max-w-6xl mx-auto px-6">
                            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                                {/* Search */}
                                <div className="relative w-full sm:w-80">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder={t('searchPlaceholder')}
                                        className="w-full pl-10 pr-4 py-2.5 bg-bg-card border border-border-subtle rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-accent-green transition-colors"
                                    />
                                </div>

                                {/* Category Filters */}
                                <div className="flex flex-wrap justify-center gap-2">
                                    {categories.map((category) => {
                                        const Icon = categoryIcons[category];
                                        const isActive = selectedCategory === category;
                                        return (
                                            <button
                                                key={category}
                                                onClick={() => setSelectedCategory(category)}
                                                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                    isActive
                                                        ? 'bg-accent-green text-bg-primary'
                                                        : 'bg-bg-card border border-border-subtle text-gray-600 hover:text-gray-900 hover:border-gray-400 hover:bg-gray-50'
                                                }`}
                                            >
                                                <Icon size={16} />
                                                {t(`categories.${category}`)}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Results count */}
                            <div className="mt-4 text-sm text-gray-500 text-center sm:text-left">
                                {filteredTemplates.length} {filteredTemplates.length === 1 ? 'template' : 'templates'} available
                            </div>
                        </div>
                    </TemplatesAnimations.FiltersSection>
                </section>

                {/* Templates Grid */}
                <section className="py-8">
                    <div className="max-w-6xl mx-auto px-6">
                        {filteredTemplates.length === 0 ? (
                            <TemplatesAnimations.NoResults className="text-center py-20">
                                <Search size={48} className="mx-auto text-gray-600 mb-4" />
                                <h3 className="text-xl font-medium text-gray-300 mb-2">{t('noResults')}</h3>
                                <p className="text-gray-500">{t('noResultsHint')}</p>
                            </TemplatesAnimations.NoResults>
                        ) : (
                            <TemplatesAnimations.TemplatesGrid className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                                {filteredTemplates.map((template) => (
                                    <TemplatesAnimations.TemplateCard
                                        key={template.id}
                                        isHovered={hoveredTemplate === template.id}
                                    >
                                        <div
                                            className="group cursor-pointer"
                                            onMouseEnter={() => setHoveredTemplate(template.id)}
                                            onMouseLeave={() => setHoveredTemplate(null)}
                                            onClick={() => handleSelectTemplate(template)}
                                        >
                                            <div className={`template-thumbnail-3d p-4 ${
                                                hoveredTemplate === template.id ? 'active' : ''
                                            }`}>
                                                {renderCanvasPreview(template)}
                                                {/* Hover overlay */}
                                                <TemplatesAnimations.HoverOverlay
                                                    isVisible={hoveredTemplate === template.id}
                                                    className="absolute inset-0 flex items-center justify-center bg-black/40"
                                                >
                                                    <span className="bg-accent-green text-bg-primary px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2">
                                                        {t('useTemplate')} <ArrowRight size={16} />
                                                    </span>
                                                </TemplatesAnimations.HoverOverlay>
                                            </div>
                                            <div className="mt-3 flex items-start justify-between">
                                                <div>
                                                    <h4 className="font-medium text-sm text-white">{template.name}</h4>
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-800 rounded text-xs text-gray-400 capitalize mt-1">
                                                        {template.category}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </TemplatesAnimations.TemplateCard>
                                ))}
                            </TemplatesAnimations.TemplatesGrid>
                        )}
                    </div>
                </section>
            </div>

            {/* Bottom CTA */}
            <section className="py-16">
                <TemplatesAnimations.CTA className="max-w-6xl mx-auto px-6 text-center">
                    <div className="inline-flex flex-col items-center p-8 bg-bg-card rounded-2xl border border-border-subtle">
                        <Palette className="text-accent-green mb-4" size={32} />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {t('startFromScratch.title')}
                        </h3>
                        <p className="text-gray-600 mb-4 max-w-md">
                            {t('startFromScratch.description')}
                        </p>
                        <Link
                            href={localizedHref('/canvas-editor')}
                            className="px-6 py-2.5 bg-accent-green text-bg-primary rounded-lg font-medium hover:bg-accent-teal transition-colors flex items-center gap-2"
                        >
                            {t('startFromScratch.button')} <ArrowRight size={18} />
                        </Link>
                    </div>
                </TemplatesAnimations.CTA>
            </section>

            <Footer />
        </div>
    );
}

'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { TemplatesAnimations } from '@/components/TemplatesAnimations';
import {
    FileText,
    Palette,
    Search,
    Briefcase,
    Minimize2,
    Monitor,
    Sparkles,
    ArrowRight,
} from 'lucide-react';
import {
    builderTemplates as sharedBuilderTemplates,
} from '@/lib/templates/builder';
import OnboardingModal from '@/components/OnboardingModal';
import FontLoader from '@/components/FontLoader';
import BuilderTemplatePreview from '@/components/templates/previews/BuilderTemplatePreview';

// Featured templates with unique layouts (16 total)
// These are the only templates shown in the gallery
// Other templates remain available via direct URL but not displayed here
const FEATURED_TEMPLATE_IDS = [
    // Sidebar layouts (3 unique)
    'sidebar-dark-navy',
    'sidebar-narrow-yellow',
    'sidebar-monogram',
    // Header layouts (9 unique)
    'header-dark',
    'header-dark-banner',
    'header-dark-box',
    'header-diagonal-yellow',
    'header-ribbon-yellow',
    'header-decorative',
    'header-geometric',
    'header-icon-sections',
    'header-blue-clean',
    // Classic layouts (1 unique)
    'classic-pro',
    // Minimal layouts (3 unique)
    'minimal-timeline',
    'minimal-labels-tan',
    'minimal-blue-sections',
];

type CategoryFilter = 'all' | 'professional' | 'modern' | 'creative' | 'minimal';

const categories: CategoryFilter[] = ['all', 'professional', 'modern', 'creative', 'minimal'];

// Use shared builder templates with additional style property for display
const builderTemplates = sharedBuilderTemplates.map(t => ({
    ...t,
    colors: t.gradientColors,
}));

const categoryIcons: Record<string, React.ElementType> = {
    all: Sparkles,
    professional: Briefcase,
    creative: Palette,
    minimal: Minimize2,
    modern: Monitor,
    classic: FileText,
};

export default function TemplatesPage() {
    const locale = useLocale();
    const t = useTranslations('Templates');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
    const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);

    // Modal state for builder templates
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTemplateForModal, setSelectedTemplateForModal] = useState<{ id: string; name: string } | null>(null);

    const localizedHref = (path: string) => `/${locale}${path}`;

    // Filter templates based on search, category, and featured list
    const filteredBuilderTemplates = useMemo(() => {
        return builderTemplates.filter((template) => {
            const isFeatured = FEATURED_TEMPLATE_IDS.includes(template.id);
            const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
            return isFeatured && matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    // Handle template selection - show onboarding modal
    const handleSelectBuilderTemplate = (templateId: string, templateName: string) => {
        setSelectedTemplateForModal({ id: templateId, name: templateName });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedTemplateForModal(null);
    };

    // Get translated category label
    const getCategoryLabel = (category: string): string => {
        try {
            return t(`categories.${category}`);
        } catch {
            return category.charAt(0).toUpperCase() + category.slice(1);
        }
    };

    const templateCount = filteredBuilderTemplates.length;

    return (
        <div className="min-h-screen">
            <FontLoader />
            <Header />

            {/* Hero - Animated */}
            <section className="pt-32 pb-8">
                <TemplatesAnimations.Hero>
                    <div className="max-w-6xl mx-auto px-6 text-center">
                        <span className="text-accent-green font-medium text-sm uppercase tracking-wider">{t('sectionTitle')}</span>
                        <h1 className="text-5xl font-bold mt-3 mb-6 text-gray-900">
                            {t('title')}<br />
                            <span className="gradient-text">{t('titleHighlight')}</span>
                        </h1>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            {t('subtitle')}
                        </p>
                    </div>
                </TemplatesAnimations.Hero>
            </section>

            {/* Templates Section - Dark Container */}
            <div className="templates-section-dark">
                {/* Search and Filters - Animated */}
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
                                const Icon = categoryIcons[category] || Sparkles;
                                const isActive = selectedCategory === category;
                                const label = getCategoryLabel(category);
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
                                        {label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                        {/* Results count */}
                        <div className="mt-4 text-sm text-gray-500 text-center sm:text-left">
                            {templateCount} {templateCount === 1 ? 'template' : 'templates'} available
                        </div>
                    </div>
                </TemplatesAnimations.FiltersSection>
            </section>

            {/* Templates Grid - Animated */}
            <section className="py-8">
                <div className="max-w-6xl mx-auto px-6">
                    {templateCount === 0 ? (
                        <TemplatesAnimations.NoResults className="text-center py-20">
                            <Search size={48} className="mx-auto text-gray-600 mb-4" />
                            <h3 className="text-xl font-medium text-gray-300 mb-2">{t('noResults')}</h3>
                            <p className="text-gray-500">{t('noResultsHint')}</p>
                        </TemplatesAnimations.NoResults>
                    ) : (
                        <TemplatesAnimations.TemplatesGrid className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                            {filteredBuilderTemplates.map((template) => (
                                <TemplatesAnimations.TemplateCard
                                    key={template.id}
                                    isHovered={hoveredTemplate === template.id}
                                >
                                    <div
                                        className="group cursor-pointer"
                                        onMouseEnter={() => setHoveredTemplate(template.id)}
                                        onMouseLeave={() => setHoveredTemplate(null)}
                                        onClick={() => handleSelectBuilderTemplate(template.id, template.name)}
                                    >
                                        <div className={`template-thumbnail-3d relative ${
                                            hoveredTemplate === template.id ? 'active' : ''
                                        }`}>
                                            <Suspense fallback={<div className="w-full bg-white rounded-lg" style={{ aspectRatio: '794 / 1123' }} />}>
                                                <BuilderTemplatePreview template={template} />
                                            </Suspense>
                                            {/* Hover overlay - Animated */}
                                            <TemplatesAnimations.HoverOverlay
                                                isVisible={hoveredTemplate === template.id}
                                                className="absolute inset-0 flex items-center justify-center bg-black/40"
                                            >
                                                <span className="bg-accent-green text-bg-primary px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2">
                                                    {t('useTemplate')} <ArrowRight size={16} />
                                                </span>
                                            </TemplatesAnimations.HoverOverlay>
                                        </div>
                                        <h4 className="font-medium text-sm text-white mt-3">{template.name}</h4>
                                        <p className="text-xs text-gray-500">{template.style}</p>
                                    </div>
                                </TemplatesAnimations.TemplateCard>
                            ))}
                        </TemplatesAnimations.TemplatesGrid>
                    )}
                </div>
                </section>
            </div>

            {/* Bottom CTA - Animated */}
            <section className="py-16">
                <TemplatesAnimations.CTA className="max-w-6xl mx-auto px-6 text-center">
                    <div className="inline-flex flex-col items-center p-8 bg-bg-card rounded-2xl border border-border-subtle">
                        <FileText className="text-accent-green mb-4" size={32} />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {t('startFromScratch.builder.title')}
                        </h3>
                        <p className="text-gray-600 mb-4 max-w-md">
                            {t('startFromScratch.builder.description')}
                        </p>
                        <Link
                            href={localizedHref('/onboarding')}
                            className="px-6 py-2.5 bg-accent-green text-bg-primary rounded-lg font-medium hover:bg-accent-teal transition-colors flex items-center gap-2"
                        >
                            {t('startFromScratch.builder.button')} <ArrowRight size={18} />
                        </Link>
                    </div>
                </TemplatesAnimations.CTA>
            </section>

            <Footer />

            {/* Onboarding Modal for Builder Templates */}
            {selectedTemplateForModal && (
                <OnboardingModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    templateId={selectedTemplateForModal.id}
                    templateName={selectedTemplateForModal.name}
                />
            )}
        </div>
    );
}

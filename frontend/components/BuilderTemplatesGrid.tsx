'use client';

import React, { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import {
    Search,
    Briefcase,
    Minimize2,
    Sparkles,
    Palette,
    ArrowRight,
} from 'lucide-react';
import {
    builderTemplates as sharedBuilderTemplates,
    getSampleResumeDataWithProfile,
    generateTheme,
} from '@/lib/templates/builder';
import OnboardingModal from '@/components/OnboardingModal';
import UnifiedTemplate from '@/components/templates/UnifiedTemplate';
import { TemplatesAnimations } from '@/components/TemplatesAnimations';

// Featured templates with unique layouts (16 total)
const FEATURED_TEMPLATE_IDS = [
    'sidebar-dark-navy',
    'sidebar-narrow-yellow',
    'sidebar-monogram',
    'header-dark',
    'header-dark-banner',
    'header-dark-box',
    'header-diagonal-yellow',
    'header-ribbon-yellow',
    'header-decorative',
    'header-geometric',
    'header-icon-orange',
    'header-blue-clean',
    'classic-pro',
    'minimal-timeline',
    'minimal-labels-tan',
    'minimal-blue-sections',
];

// Map SEO category slugs to template filter categories
const SEO_SLUG_TO_FILTER: Record<string, string> = {
    'creative': 'creative',
    'modern': 'professional', // modern SEO page shows professional templates
    'simple': 'minimal',
};

type CategoryFilter = 'all' | 'professional' | 'creative' | 'minimal';

const categoryIcons: Record<string, React.ElementType> = {
    all: Sparkles,
    professional: Briefcase,
    creative: Palette,
    minimal: Minimize2,
};

const builderTemplates = sharedBuilderTemplates.map(t => ({
    ...t,
    colors: t.gradientColors,
}));

interface BuilderTemplatesGridProps {
    initialCategory?: string; // SEO category slug to pre-select
    useTemplateLabel?: string;
    showFilters?: boolean;
}

export default function BuilderTemplatesGrid({
    initialCategory,
    useTemplateLabel = 'Use Template',
    showFilters = true,
}: BuilderTemplatesGridProps) {
    const t = useTranslations('Templates');

    // Convert SEO slug to filter category, default to 'all'
    const initialFilter = initialCategory
        ? (SEO_SLUG_TO_FILTER[initialCategory] as CategoryFilter) || 'all'
        : 'all';

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>(initialFilter);
    const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTemplateForModal, setSelectedTemplateForModal] = useState<{ id: string; name: string } | null>(null);

    const categories: CategoryFilter[] = ['all', 'professional', 'creative', 'minimal'];

    const filteredTemplates = useMemo(() => {
        return builderTemplates.filter((template) => {
            const isFeatured = FEATURED_TEMPLATE_IDS.includes(template.id);
            const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
            return isFeatured && matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    const handleSelectTemplate = (templateId: string, templateName: string) => {
        setSelectedTemplateForModal({ id: templateId, name: templateName });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedTemplateForModal(null);
    };

    const getCategoryLabel = (category: string): string => {
        try {
            return t(`categories.${category}`);
        } catch {
            return category.charAt(0).toUpperCase() + category.slice(1);
        }
    };

    const renderBuilderPreview = (template: typeof builderTemplates[0], templateIndex: number) => {
        const sampleData = getSampleResumeDataWithProfile(templateIndex);
        const theme = generateTheme(template.accentColor || '#374151');

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

        const resolvedTemplateId = (template as { templateId?: string }).templateId || getTemplateIdForLayout(template.layout);

        const a4Width = 794;
        const a4Height = 1123;
        const thumbnailWidth = 254;
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
    };

    return (
        <>
            {/* Search and Filters */}
            {showFilters && (
                <section className="pb-6">
                    <TemplatesAnimations.FiltersSection>
                        <div className="max-w-6xl mx-auto px-6">
                            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                                <div className="relative w-full sm:w-80">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder={t('searchPlaceholder')}
                                        className="w-full pl-10 pr-4 py-2.5 bg-slate-800/60 border border-slate-600/40 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-green transition-colors"
                                    />
                                </div>

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
                                                        ? 'bg-accent-green text-slate-900'
                                                        : 'bg-slate-800/60 border border-slate-600/40 text-gray-300 hover:text-white hover:border-slate-400'
                                                }`}
                                            >
                                                <Icon size={16} />
                                                {label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="mt-4 text-sm text-gray-500 text-center sm:text-left">
                                {filteredTemplates.length} {filteredTemplates.length === 1 ? 'template' : 'templates'} available
                            </div>
                        </div>
                    </TemplatesAnimations.FiltersSection>
                </section>
            )}

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
                            {filteredTemplates.map((template, index) => (
                                <TemplatesAnimations.TemplateCard
                                    key={template.id}
                                    isHovered={hoveredTemplate === template.id}
                                >
                                    <div
                                        className="group cursor-pointer"
                                        onMouseEnter={() => setHoveredTemplate(template.id)}
                                        onMouseLeave={() => setHoveredTemplate(null)}
                                        onClick={() => handleSelectTemplate(template.id, template.name)}
                                    >
                                        <div className={`template-thumbnail-3d relative ${
                                            hoveredTemplate === template.id ? 'active' : ''
                                        }`}>
                                            {renderBuilderPreview(template, index)}
                                            <TemplatesAnimations.HoverOverlay
                                                isVisible={hoveredTemplate === template.id}
                                                className="absolute inset-0 flex items-center justify-center bg-black/40"
                                            >
                                                <span className="bg-accent-green text-bg-primary px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2">
                                                    {useTemplateLabel} <ArrowRight size={16} />
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

            {/* Onboarding Modal */}
            {selectedTemplateForModal && (
                <OnboardingModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    templateId={selectedTemplateForModal.id}
                    templateName={selectedTemplateForModal.name}
                />
            )}
        </>
    );
}

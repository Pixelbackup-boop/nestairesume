import {
    Sparkles,
    Briefcase,
    Palette,
    FileCheck,
} from 'lucide-react';

// Featured templates with unique layouts (16 total)
export const FEATURED_TEMPLATE_IDS: string[] = [
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

export type CategoryFilter = 'all' | 'professional' | 'creative' | 'ats-friendly';

export const CATEGORY_ICONS: Record<CategoryFilter, React.ElementType> = {
    all: Sparkles,
    professional: Briefcase,
    creative: Palette,
    'ats-friendly': FileCheck,
};

export const CATEGORIES: CategoryFilter[] = ['all', 'professional', 'creative', 'ats-friendly'];

// Map SEO category slugs to template filter categories
export const SEO_SLUG_TO_FILTER: Record<string, CategoryFilter> = {
    'creative': 'creative',
    'modern': 'professional',
    'simple': 'ats-friendly',
    'ats-friendly': 'ats-friendly',
};

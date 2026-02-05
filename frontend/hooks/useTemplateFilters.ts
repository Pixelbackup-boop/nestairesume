'use client';

import { useState, useMemo, useCallback } from 'react';
import { CategoryFilter, FEATURED_TEMPLATE_IDS, SEO_SLUG_TO_FILTER } from '@/lib/templates/constants';
import { builderTemplates as sharedBuilderTemplates } from '@/lib/templates/builder';
import { canvasTemplates } from '@/lib/templates/canvas';

// Normalize builder templates
const builderTemplates = sharedBuilderTemplates.map(t => ({
    ...t,
    colors: t.gradientColors,
}));

export type { CategoryFilter };

interface UseTemplateFiltersOptions {
    initialCategory?: string; // SEO category slug or filter category
    filterFeaturedOnly?: boolean;
}

export function useTemplateFilters(options: UseTemplateFiltersOptions = {}) {
    const { initialCategory, filterFeaturedOnly = true } = options;

    // Convert SEO slug to filter category, default to 'all'
    const initialFilter = initialCategory
        ? (SEO_SLUG_TO_FILTER[initialCategory] as CategoryFilter) || (initialCategory as CategoryFilter) || 'all'
        : 'all';

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>(initialFilter);
    const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);

    const filteredBuilderTemplates = useMemo(() => {
        return builderTemplates.filter((template) => {
            const isFeatured = !filterFeaturedOnly || FEATURED_TEMPLATE_IDS.includes(template.id);
            const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
            return isFeatured && matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory, filterFeaturedOnly]);

    const filteredCanvasTemplates = useMemo(() => {
        return canvasTemplates.filter((template) => {
            const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    const resetFilters = useCallback(() => {
        setSelectedCategory('all');
        setSearchQuery('');
    }, []);

    return {
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        hoveredTemplate,
        setHoveredTemplate,
        filteredBuilderTemplates,
        filteredCanvasTemplates,
        resetFilters,
        builderTemplates, // expose for direct access if needed
    };
}

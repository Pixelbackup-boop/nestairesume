'use client';

import { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { getLocalizedPath } from '@/lib/localized-paths';

interface ExampleItem {
  slug: string;
  jobTitle: string;
  displayCategory: string;
  avgSalary?: string;
  keySkills: string[];
  description: string;
}

interface CategoryInfo {
  name: string;
  count: number;
}

interface Props {
  examples: ExampleItem[];
  categories: CategoryInfo[];
}

export default function ResumeExamplesGrid({ examples, categories }: Props) {
  const t = useTranslations('Common');
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    let result = examples;

    if (activeCategory !== 'All') {
      result = result.filter(e => e.displayCategory === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(e =>
        e.jobTitle.toLowerCase().includes(q) ||
        e.displayCategory.toLowerCase().includes(q) ||
        e.keySkills.some(s => s.toLowerCase().includes(q))
      );
    }

    return result;
  }, [examples, activeCategory, searchQuery]);

  const totalCount = examples.length;

  return (
    <div>
      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder={t('searchByJobTitle')}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent bg-white text-gray-900 placeholder:text-gray-500"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="mb-8 overflow-x-auto pb-2 -mx-2 px-2">
        <div className="flex gap-2 min-w-max">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
              activeCategory === 'All'
                ? 'bg-accent-green text-gray-900'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            All <span className="ml-1 text-xs opacity-70">{totalCount}</span>
          </button>
          {categories.map(cat => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                activeCategory === cat.name
                  ? 'bg-accent-green text-gray-900'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {cat.name} <span className="ml-1 text-xs opacity-70">{cat.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <p className="text-sm text-gray-400 mb-6">
        Showing {filtered.length} of {totalCount} resume examples
        {activeCategory !== 'All' && <> in <span className="font-medium text-gray-700">{activeCategory}</span></>}
        {searchQuery.trim() && <> matching &ldquo;<span className="font-medium text-gray-700">{searchQuery}</span>&rdquo;</>}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(example => (
            <Link
              key={example.slug}
              href={`/${locale}${getLocalizedPath(`/resume-examples/${example.slug}`, locale)}`}
              className="group block bg-white border border-gray-100 rounded-xl p-6 hover:shadow-lg transition hover:border-blue-300"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-lg text-gray-900 group-hover:text-accent-blue transition leading-tight">
                  {example.jobTitle}
                </h3>
                {example.avgSalary && (
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md whitespace-nowrap ml-2">
                    {example.avgSalary}
                  </span>
                )}
              </div>

              <span className="inline-block text-xs font-medium text-gray-400 bg-gray-50 px-2 py-0.5 rounded mb-3">
                {example.displayCategory}
              </span>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {example.keySkills.slice(0, 4).map((skill, i) => (
                  <span key={i} className="text-xs text-gray-600 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="text-sm text-accent-blue font-semibold flex items-center gap-1">
                View Guide
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg font-medium mb-2">No resume examples found</p>
          <p className="text-sm">Try a different search term or category</p>
        </div>
      )}
    </div>
  );
}

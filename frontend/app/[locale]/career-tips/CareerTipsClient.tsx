'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Sparkles, Search, ArrowRight, Clock } from 'lucide-react';

interface CareerTip {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
  featured?: boolean;
  readingTime: string;
}

interface CareerTipsClientProps {
  posts: CareerTip[];
  locale: string;
}

export default function CareerTipsClient({ posts, locale }: CareerTipsClientProps) {
  const t = useTranslations('CareerTips');

  const CATEGORIES = [
    { id: 'all', label: t('categories.all') },
    { id: 'resume-tips', label: t('categories.resumeTips') },
    { id: 'cover-letters', label: t('categories.coverLetters') },
    { id: 'interview-tips', label: t('categories.interviews') },
    { id: 'job-search', label: t('categories.jobSearch') },
    { id: 'career-advice', label: t('categories.careerAdvice') },
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    let filtered = posts;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        post => post.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        post =>
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query) ||
          post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery, posts]);

  const featuredPosts = useMemo(() => posts.filter(post => post.featured).slice(0, 3), [posts]);

  return (
    <>
      {/* Search Bar */}
      <div className="max-w-xl mx-auto mt-10 mb-16 px-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-primary/50 text-gray-900 placeholder-gray-400"
          />
        </div>
      </div>

      {/* Featured Articles */}
      {featuredPosts.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center gap-2 mb-8">
              <Sparkles size={20} className="text-teal-primary" />
              <h2 className="text-2xl font-bold text-gray-900">
                {t('featured')}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredPosts.map(post => (
                <Link
                  key={post.slug}
                  href={`/${locale}/career-tips/${post.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:shadow-teal-primary/10 transition-all duration-300"
                >
                  {post.image && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.imageAlt || post.title}
                        fill
                        className="object-cover motion-safe:group-hover:scale-105 motion-safe:transition-transform duration-300"
                        priority
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-teal-primary text-white text-xs font-medium rounded-full">
                          {t('featuredBadge')}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    <span className="text-xs font-medium text-teal-primary uppercase tracking-wider">
                      {post.category}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 mt-2 mb-3 group-hover:text-teal-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                      {post.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {post.readingTime}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Categories */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('categories.title')}
                  </h3>
                  <div className="space-y-2" role="radiogroup" aria-label={t('categories.title')}>
                    {CATEGORIES.map(category => (
                      <button
                        key={category.id}
                        role="radio"
                        aria-checked={selectedCategory === category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                          selectedCategory === category.id
                            ? 'bg-teal-primary text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {category.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* CTA Card */}
                <div className="bg-gradient-to-br from-teal-primary to-teal-secondary rounded-2xl p-6 text-white">
                  <h4 className="font-semibold text-lg mb-2">{t('cta.sidebarTitle')}</h4>
                  <p className="text-white/80 text-sm mb-4">
                    {t('cta.sidebarSubtitle')}
                  </p>
                  <Link
                    href={`/${locale}/onboarding`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white text-teal-primary rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors"
                  >
                    {t('cta.sidebarButton')}
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </aside>

            {/* Articles Grid */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  {t('allArticles')}
                </h2>
                <span className="text-sm text-gray-500">
                  {t('articleCount', { count: filteredPosts.length })}
                </span>
              </div>

              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPosts.map(post => (
                    <Link
                      key={post.slug}
                      href={`/${locale}/career-tips/${post.slug}`}
                      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
                    >
                      {post.image && (
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={post.image}
                            alt={post.imageAlt || post.title}
                            fill
                            className="object-cover motion-safe:group-hover:scale-105 motion-safe:transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs font-medium text-teal-primary uppercase tracking-wider">
                            {post.category}
                          </span>
                          <span className="text-gray-300">&bull;</span>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock size={12} />
                            {post.readingTime}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-teal-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                          {post.description}
                        </p>
                        <div className="flex items-center gap-2 flex-wrap">
                          {post.tags.slice(0, 3).map(tag => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen size={24} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {t('noArticles')}
                  </h3>
                  <p className="text-gray-500">
                    {t('noArticlesHint')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-teal-primary to-teal-secondary">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-white/80 mb-8">
            {t('cta.subtitle')}
          </p>
          <Link
            href={`/${locale}/onboarding`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-teal-primary rounded-full font-semibold hover:shadow-xl transition-all"
          >
            {t('cta.button')}
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </>
  );
}

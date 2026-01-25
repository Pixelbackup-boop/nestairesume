'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Sparkles, Search, ArrowRight, Clock, Tag, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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

const CATEGORIES = [
  { id: 'all', label: 'All Articles' },
  { id: 'resume-tips', label: 'Resume Tips' },
  { id: 'cover-letters', label: 'Cover Letters' },
  { id: 'interview-tips', label: 'Interview Tips' },
  { id: 'job-search', label: 'Job Search' },
  { id: 'career-advice', label: 'Career Advice' },
];

export default function CareerTipsPage() {
  const t = useTranslations('CareerTips');
  const locale = useLocale();
  const [posts, setPosts] = useState<CareerTip[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<CareerTip[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/career-tips');
        if (response.ok) {
          const data = await response.json();
          setPosts(data.posts || []);
          setFilteredPosts(data.posts || []);
        }
      } catch (error) {
        console.error('Failed to fetch career tips:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  useEffect(() => {
    let filtered = posts;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        post => post.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        post =>
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query) ||
          post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    setFilteredPosts(filtered);
  }, [selectedCategory, searchQuery, posts]);

  const featuredPosts = posts.filter(post => post.featured).slice(0, 3);

  return (
    <div className="min-h-screen bg-bg-primary">
      <Header />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-teal-primary/5 to-transparent" />
          <div className="max-w-6xl mx-auto px-6 relative">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-primary/10 rounded-full border border-teal-primary/20 mb-6">
                <BookOpen size={16} className="text-teal-primary" />
                <span className="text-sm text-teal-primary font-medium">{t('hero.badge') || 'Expert Career Guides'}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                {t('hero.title') || 'Career Tips'}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-primary to-teal-secondary">
                  {t('hero.titleHighlight') || '& Expert Advice'}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
                {t('hero.subtitle') || 'Master resume writing, ace interviews, and accelerate your career with our expert guides.'}
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto mt-10">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder={t('searchPlaceholder') || 'Search articles...'}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white dark:bg-bg-card rounded-xl border border-gray-200 dark:border-border-subtle focus:outline-none focus:ring-2 focus:ring-teal-primary/50 text-gray-900 dark:text-white placeholder-gray-400"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Articles */}
        {featuredPosts.length > 0 && (
          <section className="py-12 bg-gray-50 dark:bg-bg-secondary">
            <div className="max-w-6xl mx-auto px-6">
              <div className="flex items-center gap-2 mb-8">
                <Sparkles size={20} className="text-teal-primary" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t('featured') || 'Featured Articles'}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredPosts.map(post => (
                  <Link
                    key={post.slug}
                    href={`/${locale}/career-tips/${post.slug}`}
                    className="group bg-white dark:bg-bg-card rounded-2xl overflow-hidden border border-gray-100 dark:border-border-subtle hover:shadow-xl hover:shadow-teal-primary/10 transition-all duration-300"
                  >
                    {post.image && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.imageAlt || post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-teal-primary text-white text-xs font-medium rounded-full">
                            Featured
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="p-6">
                      <span className="text-xs font-medium text-teal-primary uppercase tracking-wider">
                        {post.category}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-2 mb-3 group-hover:text-teal-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
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
                  <div className="bg-white dark:bg-bg-card rounded-2xl border border-gray-100 dark:border-border-subtle p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      {t('categories.title') || 'Categories'}
                    </h3>
                    <div className="space-y-2">
                      {CATEGORIES.map(category => (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                            selectedCategory === category.id
                              ? 'bg-teal-primary text-white'
                              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'
                          }`}
                        >
                          {category.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* CTA Card */}
                  <div className="bg-gradient-to-br from-teal-primary to-teal-secondary rounded-2xl p-6 text-white">
                    <h4 className="font-semibold text-lg mb-2">Ready to Build Your Resume?</h4>
                    <p className="text-white/80 text-sm mb-4">
                      Put these tips into action with our AI resume builder.
                    </p>
                    <Link
                      href={`/${locale}/onboarding`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white text-teal-primary rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors"
                    >
                      Build Your Resume
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </aside>

              {/* Articles Grid */}
              <div className="lg:col-span-3">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {t('allArticles') || 'All Articles'}
                  </h2>
                  <span className="text-sm text-gray-500">
                    {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="bg-white dark:bg-bg-card rounded-2xl overflow-hidden animate-pulse">
                        <div className="h-48 bg-gray-200 dark:bg-gray-700" />
                        <div className="p-6 space-y-3">
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
                          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : filteredPosts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredPosts.map(post => (
                      <Link
                        key={post.slug}
                        href={`/${locale}/career-tips/${post.slug}`}
                        className="group bg-white dark:bg-bg-card rounded-2xl overflow-hidden border border-gray-100 dark:border-border-subtle hover:shadow-lg transition-all duration-300"
                      >
                        {post.image && (
                          <div className="relative h-48 overflow-hidden">
                            <Image
                              src={post.image}
                              alt={post.imageAlt || post.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs font-medium text-teal-primary uppercase tracking-wider">
                              {post.category}
                            </span>
                            <span className="text-gray-300 dark:text-gray-600">•</span>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Clock size={12} />
                              {post.readingTime}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-teal-primary transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                            {post.description}
                          </p>
                          <div className="flex items-center gap-2 flex-wrap">
                            {post.tags.slice(0, 3).map(tag => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 text-xs rounded-lg"
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
                    <div className="w-16 h-16 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BookOpen size={24} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      {t('noArticles') || 'No articles found'}
                    </h3>
                    <p className="text-gray-500">
                      {t('noArticlesHint') || 'Try adjusting your search or filter'}
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
              Ready to Apply These Tips?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Build a professional resume in minutes with our AI-powered builder.
            </p>
            <Link
              href={`/${locale}/onboarding`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-teal-primary rounded-full font-semibold hover:shadow-xl transition-all"
            >
              Build Your Resume Now
              <ArrowRight size={20} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

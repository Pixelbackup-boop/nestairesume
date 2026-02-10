import { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { searchPosts, getAllCategories } from '@/lib/blog/posts';
import BlogCard from '@/components/blog/BlogCard';
import SearchBar from '@/components/blog/SearchBar';
import CategoryFilter from '@/components/blog/CategoryFilter';
import { Search, ArrowLeft } from 'lucide-react';
import { getContent } from '@/lib/content/blog-pages';

const locales = ['en', 'es', 'fr', 'de', 'ar'] as const;
const BASE_URL = 'https://www.bestairesumes.com';

interface SearchPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ params }: SearchPageProps): Promise<Metadata> {
  const { locale } = await params;
  const c = getContent(locale).search;
  return {
    title: c.meta.title,
    description: c.meta.description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/blog/search`,
      languages: Object.fromEntries(
        locales.map(l => [l, `${BASE_URL}/${l}/blog/search`])
      ),
    },
  };
}

export default async function SearchPage({ params, searchParams }: SearchPageProps) {
  const { locale } = await params;
  const sp = await searchParams;
  const query = sp.q || '';
  const results = query ? await searchPosts(query) : [];
  const categories = await getAllCategories();
  const c = getContent(locale).search;

  const resultCountText = results.length === 1
    ? c.resultCount.replace('{count}', '1')
    : c.resultsCount.replace('{count}', String(results.length));

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-12">
        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-accent-green transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          {c.backToBlog}
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-accent-green/10 rounded-lg">
            <Search size={24} className="text-accent-green" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {c.title}
          </h1>
        </div>
        {query && (
          <p className="text-gray-600">
            {resultCountText} &quot;{query}&quot;
          </p>
        )}
      </div>

      {/* Search Bar */}
      <div className="max-w-xl mb-12">
        <Suspense fallback={<div className="h-12 bg-gray-100 rounded-xl animate-pulse" />}>
          <SearchBar />
        </Suspense>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1 order-2 lg:order-1">
          <div className="sticky top-24 space-y-6">
            <CategoryFilter categories={categories} />
          </div>
        </aside>

        {/* Results */}
        <div className="lg:col-span-3 order-1 lg:order-2">
          {!query ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">{c.startSearchTitle}</h3>
              <p className="text-gray-600">{c.startSearchSubtitle}</p>
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.map(post => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">{c.noResultsTitle}</h3>
              <p className="text-gray-600 mb-6">
                {c.noResultsText} &quot;{query}&quot;
              </p>
              <div className="text-sm text-gray-500">
                <p className="mb-2">{c.tryLabel}</p>
                <ul className="list-disc list-inside space-y-1">
                  {c.trySuggestions.map((suggestion, i) => (
                    <li key={i}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

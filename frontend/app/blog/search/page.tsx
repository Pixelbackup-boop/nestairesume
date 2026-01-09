import { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { searchPosts, getAllCategories } from '@/lib/blog/posts';
import BlogCard from '@/components/blog/BlogCard';
import SearchBar from '@/components/blog/SearchBar';
import CategoryFilter from '@/components/blog/CategoryFilter';
import { Search, ArrowLeft } from 'lucide-react';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export const metadata: Metadata = {
  title: 'Search Blog | ResumeAI',
  description: 'Search our blog for resume tips, career advice, and job search strategies.',
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || '';
  const results = query ? await searchPosts(query) : [];
  const categories = await getAllCategories();

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-accent-green transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-accent-green/10 rounded-lg">
            <Search size={24} className="text-accent-green" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Search Results
          </h1>
        </div>
        {query && (
          <p className="text-gray-400">
            {results.length} result{results.length !== 1 ? 's' : ''} for &quot;{query}&quot;
          </p>
        )}
      </div>

      {/* Search Bar */}
      <div className="max-w-xl mb-12">
        <Suspense fallback={<div className="h-12 bg-bg-card rounded-xl animate-pulse" />}>
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
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Start searching</h3>
              <p className="text-gray-400">Enter a search term to find articles</p>
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.map(post => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">No results found</h3>
              <p className="text-gray-400 mb-6">
                We couldn&apos;t find any articles matching &quot;{query}&quot;
              </p>
              <div className="text-sm text-gray-500">
                <p className="mb-2">Try:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Using different keywords</li>
                  <li>Checking your spelling</li>
                  <li>Browsing categories instead</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

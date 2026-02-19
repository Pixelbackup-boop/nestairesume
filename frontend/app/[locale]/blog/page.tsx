import { Suspense } from 'react';
import { Metadata } from 'next';
import { getAllPosts, getAllCategories, getFeaturedPosts, paginatePosts } from '@/lib/blog/posts';
import BlogCard from '@/components/blog/BlogCard';
import SearchBar from '@/components/blog/SearchBar';
import CategoryFilter from '@/components/blog/CategoryFilter';
import Pagination from '@/components/blog/Pagination';
import { BookOpen, Sparkles } from 'lucide-react';
import { getContent } from '@/lib/content/blog-pages';

const locales = ['en', 'es', 'fr', 'de', 'ar'] as const;
const BASE_URL = 'https://bestairesumes.com';

interface BlogPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  const c = getContent(locale).listing;
  return {
    title: c.meta.title,
    description: c.meta.description,
    openGraph: {
      title: c.meta.title,
      description: c.meta.ogDescription,
      type: 'website',
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/blog`,
      languages: Object.fromEntries(
        locales.map(l => [l, `${BASE_URL}/${l}/blog`])
      ),
    },
  };
}

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const { locale } = await params;
  const sp = await searchParams;
  const currentPage = Number(sp.page) || 1;
  const c = getContent(locale).listing;

  const allPosts = await getAllPosts();
  const categories = await getAllCategories();
  const featuredPosts = await getFeaturedPosts(3);
  const { posts, totalPages } = paginatePosts(allPosts, currentPage, 9);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-green/10 rounded-full border border-accent-green/20 mb-6">
          <BookOpen size={16} className="text-accent-green" />
          <span className="text-sm text-accent-green font-medium">{c.heroBadge}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {c.heroTitle}
          <span className="gradient-text">{c.heroTitleHighlight}</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {c.heroSubtitle}
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-12">
        <Suspense fallback={<div className="h-12 bg-gray-100 rounded-xl animate-pulse" />}>
          <SearchBar />
        </Suspense>
      </div>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && currentPage === 1 && (
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles size={20} className="text-accent-green" />
            <h2 className="text-xl font-semibold text-gray-900">{c.featuredArticles}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map(post => (
              <BlogCard key={post.slug} post={post} featured />
            ))}
          </div>
        </section>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1 order-2 lg:order-1">
          <div className="sticky top-24 space-y-6">
            <CategoryFilter categories={categories} />
          </div>
        </aside>

        {/* Posts Grid */}
        <div className="lg:col-span-3 order-1 lg:order-2">
          {posts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map(post => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                basePath={`/${locale}/blog`}
              />
            </>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">{c.noArticlesTitle}</h3>
              <p className="text-gray-600">{c.noArticlesSubtitle}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

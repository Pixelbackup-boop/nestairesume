import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostsByCategory, getAllCategories, paginatePosts } from '@/lib/blog/posts';
import BlogCard from '@/components/blog/BlogCard';
import CategoryFilter from '@/components/blog/CategoryFilter';
import Pagination from '@/components/blog/Pagination';
import SearchBar from '@/components/blog/SearchBar';
import { Folder, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { getContent } from '@/lib/content/blog-pages';
import { locales } from '@/i18n.config';

const BASE_URL = 'https://bestairesumes.com';

interface CategoryPageProps {
  params: Promise<{ locale: string; category: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return locales.flatMap(locale =>
    categories.map(category => ({
      locale,
      category: category.toLowerCase().replace(/\s+/g, '-'),
    }))
  );
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { locale, category } = await params;
  const c = getContent(locale).category;
  const categoryName = category.replace(/-/g, ' ').replace(/\b\w/g, ch => ch.toUpperCase());

  return {
    title: `${categoryName} ${c.metaTitleSuffix}`,
    description: c.metaDescTemplate.replace('{category}', categoryName.toLowerCase()),
    openGraph: {
      title: `${categoryName} ${c.metaTitleSuffix}`,
      description: c.metaDescTemplate.replace('{category}', categoryName.toLowerCase()),
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/blog/category/${category}`,
      languages: Object.fromEntries(
        locales.map(l => [l, `${BASE_URL}/${l}/blog/category/${category}`])
      ),
    },
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { locale, category } = await params;
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const c = getContent(locale).category;

  const categorySlug = category.toLowerCase();
  const allCategories = await getAllCategories();

  const matchedCategory = allCategories.find(
    cat => cat.toLowerCase().replace(/\s+/g, '-') === categorySlug
  );

  if (!matchedCategory) {
    notFound();
  }

  const categoryPosts = await getPostsByCategory(matchedCategory);
  const { posts, totalPages } = paginatePosts(categoryPosts, currentPage, 9);
  const categories = await getAllCategories();
  const displayName = matchedCategory;

  const articleCountText = categoryPosts.length === 1
    ? c.articleCount.replace('{count}', '1')
    : c.articlesCount.replace('{count}', String(categoryPosts.length));

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
            <Folder size={24} className="text-accent-green" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {displayName}
          </h1>
        </div>
        <p className="text-gray-600">
          {articleCountText}
        </p>
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
            <CategoryFilter categories={categories} activeCategory={categorySlug} />
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
                basePath={`/${locale}/blog/category/${category}`}
              />
            </>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Folder size={24} className="text-gray-400" />
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

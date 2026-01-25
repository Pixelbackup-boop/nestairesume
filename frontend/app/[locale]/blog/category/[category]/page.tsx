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

interface CategoryPageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}

// Generate static paths for all categories
export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map(category => ({
    category: category.toLowerCase().replace(/\s+/g, '-'),
  }));
}

// Generate metadata
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryName = category.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  return {
    title: `${categoryName} Articles | Best AI Resume Blog`,
    description: `Browse our ${categoryName.toLowerCase()} articles for expert advice, tips, and guides.`,
    openGraph: {
      title: `${categoryName} Articles | Best AI Resume Blog`,
      description: `Browse our ${categoryName.toLowerCase()} articles for expert advice, tips, and guides.`,
    },
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { category } = await params;
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  // Convert slug back to category name
  const categorySlug = category.toLowerCase();
  const allCategories = await getAllCategories();

  // Find matching category (case-insensitive)
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
            <Folder size={24} className="text-accent-green" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            {displayName}
          </h1>
        </div>
        <p className="text-gray-400">
          {categoryPosts.length} article{categoryPosts.length !== 1 ? 's' : ''} in this category
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-xl mb-12">
        <Suspense fallback={<div className="h-12 bg-bg-card rounded-xl animate-pulse" />}>
          <SearchBar placeholder={`Search in ${displayName}...`} />
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
                basePath={`/blog/category/${category}`}
              />
            </>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <Folder size={24} className="text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">No articles yet</h3>
              <p className="text-gray-400">Check back soon for new content in this category!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

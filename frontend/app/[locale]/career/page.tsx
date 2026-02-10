import { Suspense } from 'react';
import { Metadata } from 'next';
import { getAllCareerPosts, getAllCareerCategories, getFeaturedCareerPosts, paginatePosts } from '@/lib/blog/posts';
import BlogCard from '@/components/blog/BlogCard';
import SearchBar from '@/components/blog/SearchBar';
import CategoryFilter from '@/components/blog/CategoryFilter';
import Pagination from '@/components/blog/Pagination';
import { Briefcase, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getCareerListingContent } from '@/lib/content/career-pages';

const siteUrl = 'https://www.bestairesumes.com';
const locales = ['en', 'es', 'fr', 'de', 'ar'];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = getCareerListingContent(locale);
  return {
    title: c.meta.title,
    description: c.meta.description,
    openGraph: {
      title: c.meta.ogTitle,
      description: c.meta.ogDescription,
      type: 'website',
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/career`,
      languages: Object.fromEntries(locales.map(l => [l, `${siteUrl}/${l}/career`])),
    },
  };
}

interface CareerPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function CareerPage({ params, searchParams }: CareerPageProps) {
  const { locale } = await params;
  const sp = await searchParams;
  const currentPage = Number(sp.page) || 1;
  const c = getCareerListingContent(locale);

  const allPosts = await getAllCareerPosts();
  const categories = await getAllCareerCategories();
  const featuredPosts = await getFeaturedCareerPosts(3);
  const { posts, totalPages } = paginatePosts(allPosts, currentPage, 9);

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto px-6 py-12 pt-32">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-green/10 rounded-full border border-accent-green/20 mb-6">
            <Briefcase size={16} className="text-accent-green" />
            <span className="text-sm text-accent-green font-medium">{c.badge}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {c.title}{' '}
            <span className="gradient-text">{c.titleHighlight}</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {c.subtitle}
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12">
          <Suspense fallback={<div className="h-12 bg-bg-card rounded-xl animate-pulse" />}>
            <SearchBar basePath={`/${locale}/career`} />
          </Suspense>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && currentPage === 1 && (
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles size={20} className="text-accent-green" />
              <h2 className="text-xl font-semibold text-white">{c.featured}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPosts.map(post => (
                <BlogCard key={post.slug} post={post} featured basePath={`/${locale}/career`} />
              ))}
            </div>
          </section>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1 order-2 lg:order-1">
            <div className="sticky top-24 space-y-6">
              <CategoryFilter categories={categories} basePath={`/${locale}/career`} />
            </div>
          </aside>

          {/* Posts Grid */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            {posts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {posts.map(post => (
                    <BlogCard key={post.slug} post={post} basePath={`/${locale}/career`} />
                  ))}
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  basePath={`/${locale}/career`}
                />
              </>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase size={24} className="text-gray-500" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">{c.noPostsTitle}</h3>
                <p className="text-gray-400">{c.noPostsSub}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

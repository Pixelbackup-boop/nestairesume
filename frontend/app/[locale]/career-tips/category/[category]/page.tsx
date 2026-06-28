import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCareerTipsByCategory, getAllCareerTipsCategories, paginatePosts } from '@/lib/blog/posts';
import BlogCard from '@/components/blog/BlogCard';
import Pagination from '@/components/blog/Pagination';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Folder, ArrowLeft } from 'lucide-react';
import { locales } from '@/i18n.config';
import { getLocalizedUrl } from '@/lib/localized-paths';
import { hreflangAlternates } from '@/lib/hreflang';

const siteUrl = 'https://bestairesumes.com';

interface PageProps {
  params: Promise<{ locale: string; category: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateStaticParams() {
  const categories = await getAllCareerTipsCategories();
  return locales.flatMap(locale =>
    categories.map(category => ({
      locale,
      category: category.toLowerCase().replace(/\s+/g, '-'),
    }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, category } = await params;
  const categoryName = category.replace(/-/g, ' ').replace(/\b\w/g, ch => ch.toUpperCase());

  const title = `${categoryName} - Career Tips | Best AI Resume`;
  const description = `Browse career tips and advice about ${categoryName.toLowerCase()}. Expert guidance to help you advance your career.`;

  return {
    title,
    description,
    alternates: {
      canonical: getLocalizedUrl(siteUrl, `/career-tips/category/${category}`, locale),
      languages: hreflangAlternates(siteUrl, `/career-tips/category/${category}`),
    },
  };
}

export default async function CareerTipsCategoryPage({ params, searchParams }: PageProps) {
  const { locale, category } = await params;
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  const categorySlug = category.toLowerCase();
  const allCategories = await getAllCareerTipsCategories();

  const matchedCategory = allCategories.find(
    cat => cat.toLowerCase().replace(/\s+/g, '-') === categorySlug
  );

  if (!matchedCategory) {
    notFound();
  }

  const categoryPosts = await getCareerTipsByCategory(matchedCategory);
  const { posts, totalPages } = paginatePosts(categoryPosts, currentPage, 9);

  return (
    <>
      <Header />
      <main id="main-content" className="max-w-5xl mx-auto px-6 py-12">
        <Link
          href={`/${locale}/career-tips`}
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-green-600 transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Back to Career Tips
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-green-50 rounded-lg">
            <Folder size={24} className="text-green-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{matchedCategory}</h1>
            <p className="text-gray-600">{categoryPosts.length} article{categoryPosts.length !== 1 ? 's' : ''}</p>
          </div>
        </div>

        {posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map(post => (
                <BlogCard key={post.slug} post={post} basePath="career-tips" />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath={`/${locale}/career-tips/category/${category}`}
            />
          </>
        ) : (
          <div className="text-center py-16">
            <Folder size={24} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No articles yet</h3>
            <p className="text-gray-600">Check back soon for new content!</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

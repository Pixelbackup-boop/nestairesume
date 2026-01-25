import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getCareerTipBySlug, getRelatedCareerTips, getAllCareerTipsSlugs } from '@/lib/blog/posts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Clock, Calendar, User, ChevronRight, ArrowRight, Share2, Bookmark } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

const siteConfig = {
  name: 'Best AI Resume',
  url: 'https://www.bestairesumes.com',
};

export async function generateStaticParams() {
  const slugs = await getAllCareerTipsSlugs();
  const locales = ['en', 'es', 'fr', 'de', 'ar'];

  return locales.flatMap(locale =>
    slugs.map(slug => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getCareerTipBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${post.title} - Career Tips | Best AI Resume`,
    description: post.description,
    keywords: post.tags,
    openGraph: {
      type: 'article',
      locale: locale === 'ar' ? 'ar_SA' : `${locale}_${locale.toUpperCase()}`,
      url: `${siteConfig.url}/${locale}/career-tips/${slug}`,
      siteName: siteConfig.name,
      title: post.title,
      description: post.description,
      images: post.image ? [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.imageAlt || post.title,
        },
      ] : [],
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : [],
    },
    alternates: {
      canonical: `${siteConfig.url}/${locale}/career-tips/${slug}`,
    },
  };
}

// Extract headings from markdown content for TOC
function extractHeadings(content: string): { id: string; text: string; level: number }[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: { id: string; text: string; level: number }[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    headings.push({ id, text, level });
  }

  return headings;
}

// Simple markdown to HTML converter
function renderMarkdown(content: string): string {
  let html = content
    // Headers with IDs
    .replace(/^### (.+)$/gm, (_, text) => {
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return `<h3 id="${id}" class="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4 scroll-mt-24">${text}</h3>`;
    })
    .replace(/^## (.+)$/gm, (_, text) => {
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return `<h2 id="${id}" class="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-6 scroll-mt-24">${text}</h2>`;
    })
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-white">$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-teal-primary hover:underline">$1</a>')
    // Unordered lists
    .replace(/^- (.+)$/gm, '<li class="ml-4 mb-2">$1</li>')
    // Ordered lists
    .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 mb-2 list-decimal">$1</li>')
    // Paragraphs
    .replace(/\n\n/g, '</p><p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">')
    // Line breaks
    .replace(/\n/g, '<br/>');

  // Wrap lists
  html = html.replace(/(<li class="ml-4 mb-2">.*?<\/li>)+/gs, '<ul class="list-disc mb-6 space-y-1">$&</ul>');
  html = html.replace(/(<li class="ml-4 mb-2 list-decimal">.*?<\/li>)+/gs, '<ol class="list-decimal mb-6 space-y-1 ml-4">$&</ol>');

  return `<p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">${html}</p>`;
}

export default async function CareerTipArticlePage({ params }: PageProps) {
  const { locale, slug } = await params;
  const post = await getCareerTipBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedCareerTips(slug, 3);
  const headings = extractHeadings(post.content);
  const contentHtml = renderMarkdown(post.content);

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-bg-primary">
      <Header />

      <main className="pt-24 pb-16">
        {/* Breadcrumb */}
        <div className="max-w-6xl mx-auto px-6 mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href={`/${locale}`} className="hover:text-teal-primary transition-colors">
              Home
            </Link>
            <ChevronRight size={14} />
            <Link href={`/${locale}/career-tips`} className="hover:text-teal-primary transition-colors">
              Career Tips
            </Link>
            <ChevronRight size={14} />
            <span className="text-gray-400 truncate max-w-[200px]">{post.title}</span>
          </nav>
        </div>

        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <article className="lg:col-span-3">
              {/* Article Header */}
              <header className="mb-10">
                <span className="inline-block px-3 py-1 bg-teal-primary/10 text-teal-primary text-sm font-medium rounded-full mb-4">
                  {post.category}
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                  {post.title}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
                  {post.description}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 pb-6 border-b border-gray-200 dark:border-border-subtle">
                  <span className="flex items-center gap-2">
                    <User size={16} />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar size={16} />
                    {formattedDate}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock size={16} />
                    {post.readingTime}
                  </span>
                </div>
              </header>

              {/* Featured Image */}
              {post.image && (
                <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-10">
                  <Image
                    src={post.image}
                    alt={post.imageAlt || post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              {/* Article Content */}
              <div
                className="prose prose-lg dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />

              {/* Tags */}
              <div className="mt-10 pt-6 border-t border-gray-200 dark:border-border-subtle">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-gray-500">Tags:</span>
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 text-sm rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Share Section */}
              <div className="mt-8 p-6 bg-gray-50 dark:bg-bg-secondary rounded-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Found this helpful?</h3>
                    <p className="text-sm text-gray-500">Share it with others who might benefit</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="p-3 bg-white dark:bg-bg-card rounded-xl border border-gray-200 dark:border-border-subtle hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                      <Share2 size={20} className="text-gray-600 dark:text-gray-400" />
                    </button>
                    <button className="p-3 bg-white dark:bg-bg-card rounded-xl border border-gray-200 dark:border-border-subtle hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                      <Bookmark size={20} className="text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="mt-10 p-8 bg-gradient-to-r from-teal-primary to-teal-secondary rounded-2xl text-white">
                <h3 className="text-2xl font-bold mb-3">Ready to Build Your Resume?</h3>
                <p className="text-white/80 mb-6">
                  Put these tips into action with our AI-powered resume builder. Create a professional resume in minutes.
                </p>
                <Link
                  href={`/${locale}/onboarding`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-teal-primary rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                >
                  Build Your Resume Now
                  <ArrowRight size={20} />
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Table of Contents */}
                {headings.length > 0 && (
                  <div className="bg-white dark:bg-bg-card rounded-2xl border border-gray-100 dark:border-border-subtle p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Table of Contents
                    </h3>
                    <nav className="space-y-2">
                      {headings.map((heading, index) => (
                        <a
                          key={index}
                          href={`#${heading.id}`}
                          className={`block text-sm text-gray-600 dark:text-gray-400 hover:text-teal-primary transition-colors ${
                            heading.level === 3 ? 'pl-4' : ''
                          }`}
                        >
                          {heading.text}
                        </a>
                      ))}
                    </nav>
                  </div>
                )}

                {/* Related Articles */}
                {relatedPosts.length > 0 && (
                  <div className="bg-white dark:bg-bg-card rounded-2xl border border-gray-100 dark:border-border-subtle p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Related Articles
                    </h3>
                    <div className="space-y-4">
                      {relatedPosts.map(related => (
                        <Link
                          key={related.slug}
                          href={`/${locale}/career-tips/${related.slug}`}
                          className="block group"
                        >
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-teal-primary transition-colors line-clamp-2">
                            {related.title}
                          </h4>
                          <span className="text-xs text-gray-500 mt-1">
                            {related.readingTime}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick CTA */}
                <div className="bg-gradient-to-br from-teal-primary to-teal-secondary rounded-2xl p-6 text-white">
                  <h4 className="font-semibold text-lg mb-2">Build Your Resume</h4>
                  <p className="text-white/80 text-sm mb-4">
                    Create a professional resume with AI in minutes.
                  </p>
                  <Link
                    href={`/${locale}/onboarding`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white text-teal-primary rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors"
                  >
                    Get Started
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* More Articles Section */}
        {relatedPosts.length > 0 && (
          <section className="max-w-6xl mx-auto px-6 mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              More Career Tips
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map(related => (
                <Link
                  key={related.slug}
                  href={`/${locale}/career-tips/${related.slug}`}
                  className="group bg-white dark:bg-bg-card rounded-2xl overflow-hidden border border-gray-100 dark:border-border-subtle hover:shadow-lg transition-all duration-300"
                >
                  {related.image && (
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={related.image}
                        alt={related.imageAlt || related.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <span className="text-xs font-medium text-teal-primary uppercase tracking-wider">
                      {related.category}
                    </span>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white mt-2 group-hover:text-teal-primary transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                    <span className="text-xs text-gray-500 mt-2 block">
                      {related.readingTime}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

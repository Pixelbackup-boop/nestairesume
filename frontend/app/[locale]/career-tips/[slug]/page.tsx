import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getCareerTipBySlug, getRelatedCareerTips, getAllCareerTipsSlugs, getCareerTipAvailableLocales } from '@/lib/blog/posts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InArticleVideoAd from '@/components/ads/InArticleVideoAd';
import LeaderboardAd from '@/components/ads/LeaderboardAd';
import SidebarAd from '@/components/ads/SidebarAd';
import MultiplexAd from '@/components/ads/MultiplexAd';
import { splitHtmlAtMiddle } from '@/lib/splitContent';
import { Clock, Calendar, User, ChevronRight, ArrowRight } from 'lucide-react';
import { getLocalizedUrl } from '@/lib/localized-paths';
import { getTranslations } from 'next-intl/server';
import { locales, getOgLocale } from '@/i18n.config';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

const siteConfig = {
  name: 'Best AI Resume',
  url: 'https://bestairesumes.com',
};

export async function generateStaticParams() {
  const slugs = await getAllCareerTipsSlugs();
return locales.flatMap(locale =>
    slugs.map(slug => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getCareerTipBySlug(slug, locale);

  if (!post) {
    const t = await getTranslations({ locale, namespace: 'CareerTips' });
    return {
      title: t('article.notFound'),
    };
  }

  // Only emit canonical/hreflang for locales with their own MDX file —
  // fallback locales serve English content and would otherwise be
  // flagged as duplicates by Google.
  const availableLocales = getCareerTipAvailableLocales(slug, locales);
  const defaultLocale = availableLocales.includes('en') ? 'en' : (availableLocales[0] ?? 'en');
  const isLocaleNative = availableLocales.includes(locale);
  const canonical = isLocaleNative
    ? getLocalizedUrl(siteConfig.url, `/career-tips/${slug}`, locale)
    : getLocalizedUrl(siteConfig.url, `/career-tips/${slug}`, defaultLocale);
  const languages: Record<string, string> = {
    'x-default': getLocalizedUrl(siteConfig.url, `/career-tips/${slug}`, defaultLocale),
  };
  availableLocales.forEach((loc) => {
    languages[loc] = getLocalizedUrl(siteConfig.url, `/career-tips/${slug}`, loc);
  });

  return {
    // `absolute` bypasses the layout's `%s | Best AI Resume` template
    // which would otherwise duplicate the brand suffix.
    title: { absolute: `${post.title} - Career Tips | Best AI Resume` },
    description: post.description,
    keywords: post.tags,
    openGraph: {
      type: 'article',
      locale: getOgLocale(locale),
      url: getLocalizedUrl(siteConfig.url, `/career-tips/${slug}`, locale),
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
    // Fallback locale pages render English content; without noindex they sit
    // in "Crawled - currently not indexed" because the canonical points to
    // /en/ but the page itself stays index,follow.
    robots: isLocaleNative ? undefined : { index: false, follow: true },
    alternates: { canonical, languages },
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
      return `<h3 id="${id}" class="text-xl font-semibold text-gray-900 mt-8 mb-4 scroll-mt-24">${text}</h3>`;
    })
    .replace(/^## (.+)$/gm, (_, text) => {
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return `<h2 id="${id}" class="text-2xl font-bold text-gray-900 mt-10 mb-6 scroll-mt-24">${text}</h2>`;
    })
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-teal-primary hover:underline">$1</a>')
    // Unordered lists
    .replace(/^- (.+)$/gm, '<li class="ml-4 mb-2">$1</li>')
    // Ordered lists
    .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 mb-2 list-decimal">$1</li>')
    // Paragraphs
    .replace(/\n\n/g, '</p><p class="text-gray-600 leading-relaxed mb-6">')
    // Line breaks
    .replace(/\n/g, '<br/>');

  // Wrap lists
  html = html.replace(/(<li class="ml-4 mb-2">[\s\S]*?<\/li>)+/g, '<ul class="list-disc mb-6 space-y-1">$&</ul>');
  html = html.replace(/(<li class="ml-4 mb-2 list-decimal">[\s\S]*?<\/li>)+/g, '<ol class="list-decimal mb-6 space-y-1 ml-4">$&</ol>');

  return `<p class="text-gray-600 leading-relaxed mb-6">${html}</p>`;
}

export default async function CareerTipArticlePage({ params }: PageProps) {
  const { locale, slug } = await params;
  const post = await getCareerTipBySlug(slug, locale);
  const t = await getTranslations('CareerTips');

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedCareerTips(slug, 3);
  const headings = extractHeadings(post.content);
  const contentHtml = renderMarkdown(post.content);
  const [firstHalfHtml, secondHalfHtml] = splitHtmlAtMiddle(contentHtml);

  const dateLocale = locale === 'es' ? 'es-ES' : locale === 'fr' ? 'fr-FR' : locale === 'de' ? 'de-DE' : locale === 'ar' ? 'ar-SA' : 'en-US';
  const formattedDate = new Date(post.date).toLocaleDateString(dateLocale, {
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
              {t('article.breadcrumbHome')}
            </Link>
            <ChevronRight size={14} />
            <Link href={`/${locale}/career-tips`} className="hover:text-teal-primary transition-colors">
              {t('article.breadcrumbCareerTips')}
            </Link>
            <ChevronRight size={14} />
            <span className="text-gray-400 truncate max-w-[200px]">{post.title}</span>
          </nav>
        </div>

        {/* Leaderboard Ad */}
        <LeaderboardAd className="max-w-6xl mx-auto px-6 mb-8" />

        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <article className="lg:col-span-3">
              {/* Article Header */}
              <header className="mb-10">
                <span className="inline-block px-3 py-1 bg-teal-primary/10 text-teal-primary text-sm font-medium rounded-full mb-4">
                  {post.category}
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  {post.title}
                </h1>
                <p className="text-xl text-gray-600 mb-6">
                  {post.description}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 pb-6 border-b border-gray-200">
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

              {/* Article Content — First Half */}
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: firstHalfHtml }}
              />

              {/* In-Article Ad (mid-content) */}
              {secondHalfHtml && <InArticleVideoAd slotType="careerInArticle" className="my-8" />}

              {/* Article Content — Second Half */}
              {secondHalfHtml && (
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: secondHalfHtml }}
                />
              )}

              {/* Tags */}
              <div className="mt-10 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-gray-500">{t('article.tags')}</span>
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Section */}
              <div className="mt-10 p-8 bg-gradient-to-r from-teal-primary to-teal-secondary rounded-2xl text-white">
                <h3 className="text-2xl font-bold mb-3">{t('cta.title')}</h3>
                <p className="text-white/80 mb-6">
                  {t('cta.subtitle')}
                </p>
                <Link
                  href={`/${locale}/onboarding`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-teal-primary rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                >
                  {t('cta.button')}
                  <ArrowRight size={20} />
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Table of Contents */}
                {headings.length > 0 && (
                  <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {t('article.tableOfContents')}
                    </h3>
                    <nav className="space-y-2">
                      {headings.map((heading, index) => (
                        <a
                          key={index}
                          href={`#${heading.id}`}
                          className={`block text-sm text-gray-600 hover:text-teal-primary transition-colors ${
                            heading.level === 3 ? 'pl-4' : ''
                          }`}
                        >
                          {heading.text}
                        </a>
                      ))}
                    </nav>
                  </div>
                )}

                {/* Sidebar Ad */}
                <SidebarAd />

                {/* Related Articles */}
                {relatedPosts.length > 0 && (
                  <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {t('article.relatedArticles')}
                    </h3>
                    <div className="space-y-4">
                      {relatedPosts.map(related => (
                        <Link
                          key={related.slug}
                          href={`/${locale}/career-tips/${related.slug}`}
                          className="block group"
                        >
                          <h4 className="text-sm font-medium text-gray-900 group-hover:text-teal-primary transition-colors line-clamp-2">
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
          </div>
        </div>

        {/* More Articles Section */}
        {relatedPosts.length > 0 && (
          <section className="max-w-6xl mx-auto px-6 mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {t('article.moreCareerTips')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map(related => (
                <Link
                  key={related.slug}
                  href={`/${locale}/career-tips/${related.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
                >
                  {related.image && (
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={related.image}
                        alt={related.imageAlt || related.title}
                        fill
                        className="object-cover motion-safe:group-hover:scale-105 motion-safe:transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <span className="text-xs font-medium text-teal-primary uppercase tracking-wider">
                      {related.category}
                    </span>
                    <h3 className="text-base font-semibold text-gray-900 mt-2 group-hover:text-teal-primary transition-colors line-clamp-2">
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
        {/* Multiplex Ad */}
        <MultiplexAd className="max-w-6xl mx-auto px-6 py-8" />
      </main>

      <Footer />
    </div>
  );
}

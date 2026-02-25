import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { getPostBySlug, getAllCareerPostSlugs, getRelatedPosts } from '@/lib/blog/posts';
import { compileMDXContent, extractHeadings } from '@/lib/blog/mdx';
import { getAuthor } from '@/lib/resume-examples/posts';
import BlogHeader from '@/components/blog/BlogHeader';
import TableOfContents from '@/components/blog/TableOfContents';
import RelatedPosts from '@/components/blog/RelatedPosts';
import ShareButtons from '@/components/blog/ShareButtons';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InArticleVideoAd from '@/components/ads/InArticleVideoAd';
import { splitMarkdownAtMiddle } from '@/lib/splitContent';
import { getCareerArticleContent } from '@/lib/content/career-pages';
import { locales } from '@/i18n.config';

interface CareerPostPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

// Generate static paths for all career posts across all locales
export async function generateStaticParams() {
  const slugs = await getAllCareerPostSlugs();
  return locales.flatMap(locale => slugs.map(slug => ({ locale, slug })));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: CareerPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug, locale);

  if (!post) {
    const c = getCareerArticleContent(locale);
    return { title: c.notFound };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bestairesumes.com';
const alternateLanguages: Record<string, string> = {
    'x-default': `${siteUrl}/en/career/${post.slug}`,
  };
  locales.forEach((loc) => {
    alternateLanguages[loc] = `${siteUrl}/${loc}/career/${post.slug}`;
  });

  return {
    title: `${post.title} | Career Center | Best AI Resume`,
    description: post.description,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: post.image ? [{ url: post.image, alt: post.imageAlt }] : [],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : [],
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/career/${post.slug}`,
      languages: alternateLanguages,
    },
  };
}

// Component to render JSON-LD structured data safely
function JsonLd({ data }: { data: object }) {
  return (
    <Script
      id="json-ld-career"
      type="application/ld+json"
      strategy="afterInteractive"
    >
      {JSON.stringify(data)}
    </Script>
  );
}

export default async function CareerPostPage({ params }: CareerPostPageProps) {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  // Check if post is for career section
  if (post.postType !== 'career' && post.postType !== 'both') {
    notFound();
  }

  // Split and compile MDX content for mid-article ad placement
  const [firstMd, secondMd] = splitMarkdownAtMiddle(post.content);
  const { content: firstContent } = await compileMDXContent(firstMd);
  const { content: secondContent } = secondMd
    ? await compileMDXContent(secondMd)
    : { content: null };

  // Extract headings for table of contents
  const headings = extractHeadings(post.content);

  // Get related posts
  const relatedPosts = await getRelatedPosts(post.slug, 3);

  // Resolve author for E-E-A-T Person schema
  const author = getAuthor(post.author);

  // Build URL for sharing
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bestairesumes.com';
  const postUrl = `${siteUrl}/${locale}/career/${post.slug}`;

  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: author.name,
      jobTitle: author.jobTitle,
      url: `${siteUrl}/about/${author.slug}`,
      image: `${siteUrl}${author.image}`,
      knowsAbout: author.expertise,
      ...(author.linkedin ? { sameAs: [author.linkedin] } : {}),
      worksFor: {
        '@type': 'Organization',
        name: author.organization,
        url: siteUrl,
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'Best AI Resume',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    keywords: post.tags.join(', '),
  };

  return (
    <>
      <Header />
      {/* JSON-LD Structured Data */}
      <JsonLd data={jsonLd} />

      <article className="max-w-6xl mx-auto px-6 py-12 pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <BlogHeader post={post} basePath={`/${locale}/career`} />

            {/* Article Content — First Half */}
            <div className="prose-custom">
              {firstContent}
            </div>

            {/* In-Article Ad (mid-content) */}
            {secondContent && <InArticleVideoAd slotType="careerInArticle" className="my-8" />}

            {/* Article Content — Second Half */}
            {secondContent && (
              <div className="prose-custom">
                {secondContent}
              </div>
            )}

            {/* Share Buttons */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <ShareButtons title={post.title} url={postUrl} />
            </div>

            {/* Related Posts */}
            <RelatedPosts posts={relatedPosts} basePath={`/${locale}/career`} />
          </div>

          {/* Sidebar with TOC */}
          <aside className="lg:col-span-1 hidden lg:block">
            <TableOfContents headings={headings} />
          </aside>
        </div>
      </article>
      <Footer />
    </>
  );
}

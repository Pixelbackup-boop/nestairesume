import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { getPostBySlug, getAllCareerPostSlugs, getRelatedPosts } from '@/lib/blog/posts';
import { compileMDXContent, extractHeadings } from '@/lib/blog/mdx';
import BlogHeader from '@/components/blog/BlogHeader';
import TableOfContents from '@/components/blog/TableOfContents';
import RelatedPosts from '@/components/blog/RelatedPosts';
import ShareButtons from '@/components/blog/ShareButtons';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface CareerPostPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static paths for all career posts
export async function generateStaticParams() {
  const slugs = await getAllCareerPostSlugs();
  return slugs.map(slug => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: CareerPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bestairesumes.com';

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
      canonical: `${siteUrl}/career/${post.slug}`,
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
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Check if post is for career section
  if (post.postType !== 'career' && post.postType !== 'both') {
    notFound();
  }

  // Compile MDX content
  const { content } = await compileMDXContent(post.content);

  // Extract headings for table of contents
  const headings = extractHeadings(post.content);

  // Get related posts
  const relatedPosts = await getRelatedPosts(post.slug, 3);

  // Build URL for sharing
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bestairesumes.com';
  const postUrl = `${siteUrl}/career/${post.slug}`;

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
      '@type': 'Organization',
      name: post.author,
      url: siteUrl,
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
            <BlogHeader post={post} basePath="/career" />

            {/* Article Content */}
            <div className="prose-custom">
              {content}
            </div>

            {/* Share Buttons */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <ShareButtons title={post.title} url={postUrl} />
            </div>

            {/* Related Posts */}
            <RelatedPosts posts={relatedPosts} basePath="/career" />
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

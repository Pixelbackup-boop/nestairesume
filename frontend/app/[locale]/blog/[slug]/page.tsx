import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { getPostBySlug, getAllPostSlugs, getRelatedPosts } from '@/lib/blog/posts';
import { getAuthor } from '@/lib/resume-examples/posts';
import { compileMDXContent, extractHeadings } from '@/lib/blog/mdx';
import BlogHeader from '@/components/blog/BlogHeader';
import TableOfContents from '@/components/blog/TableOfContents';
import RelatedPosts from '@/components/blog/RelatedPosts';
import ShareButtons from '@/components/blog/ShareButtons';

const siteUrl = 'https://www.bestairesumes.com';
const locales = ['en', 'de', 'fr', 'es', 'ar'];

interface PostPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

// Generate static paths for all posts
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map(slug => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const url = `${siteUrl}/${locale}/blog/${post.slug}`;
  const languages: Record<string, string> = {
    'x-default': `${siteUrl}/en/blog/${post.slug}`,
  };
  locales.forEach((loc) => {
    languages[loc] = `${siteUrl}/${loc}/blog/${post.slug}`;
  });

  return {
    title: `${post.title} | Best AI Resume Blog`,
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
      canonical: url,
      languages,
    },
  };
}

// Component to render JSON-LD structured data safely
function JsonLd({ data, id = 'json-ld' }: { data: object; id?: string }) {
  return (
    <Script
      id={id}
      type="application/ld+json"
      strategy="afterInteractive"
    >
      {JSON.stringify(data)}
    </Script>
  );
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Compile MDX content
  const { content } = await compileMDXContent(post.content);

  // Extract headings for table of contents
  const headings = extractHeadings(post.content);

  // Get related posts
  const relatedPosts = await getRelatedPosts(post.slug, 3);

  // Build URL for sharing
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  // Resolve author for E-E-A-T Person schema
  const author = getAuthor(post.author);

  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
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

  // BreadcrumbList schema for SERP breadcrumb trail
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title },
    ],
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <JsonLd data={jsonLd} id="json-ld-blog" />
      <JsonLd data={breadcrumbJsonLd} id="json-ld-breadcrumb" />
      {post.faq && post.faq.length > 0 && (
        <JsonLd
          id="json-ld-faq"
          data={{
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: post.faq.map((item: { question: string; answer: string }) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
          }}
        />
      )}

      <article className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <BlogHeader post={post} />

            {/* Article Content */}
            <div className="prose-custom">
              {content}
            </div>

            {/* FAQ Section */}
            {post.faq && post.faq.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {post.faq.map((item: { question: string; answer: string }, index: number) => (
                    <details key={index} className="group border border-gray-200 rounded-lg">
                      <summary className="flex items-center justify-between cursor-pointer p-4 font-medium text-gray-900 hover:bg-gray-50 rounded-lg">
                        {item.question}
                        <svg className="w-5 h-5 transition-transform group-open:rotate-180 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </summary>
                      <p className="px-4 pb-4 text-gray-600 leading-relaxed">{item.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            )}

            {/* Share Buttons */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <ShareButtons title={post.title} url={postUrl} />
            </div>

            {/* Related Posts */}
            <RelatedPosts posts={relatedPosts} />

            {/* Cross-Content Internal Links */}
            <section className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Resume Tools & Resources
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <a
                  href="/resume-examples"
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition group"
                >
                  <span className="text-blue-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition">300+ Resume Examples</p>
                    <p className="text-xs text-gray-500">Job-specific writing guides</p>
                  </div>
                </a>
                <a
                  href="/resume-format"
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition group"
                >
                  <span className="text-blue-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition">Resume Format Guide 2026</p>
                    <p className="text-xs text-gray-500">Chronological, functional & combination</p>
                  </div>
                </a>
                <a
                  href="/templates"
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition group"
                >
                  <span className="text-blue-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition">Free Resume Templates</p>
                    <p className="text-xs text-gray-500">ATS-friendly professional designs</p>
                  </div>
                </a>
                <a
                  href="/"
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition group"
                >
                  <span className="text-blue-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition">AI Resume Builder</p>
                    <p className="text-xs text-gray-500">Create your resume in minutes</p>
                  </div>
                </a>
              </div>
            </section>
          </div>

          {/* Sidebar with TOC */}
          <aside className="lg:col-span-1 hidden lg:block">
            <TableOfContents headings={headings} />
          </aside>
        </div>
      </article>
    </>
  );
}

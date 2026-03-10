import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AUTHORS, getAllResumeExamples } from "@/lib/resume-examples/posts";
import { getAllCoverLetterExamples } from "@/lib/cover-letter-examples/posts";
import { getAllPosts } from "@/lib/blog/posts";
import { getAuthorProfileContent } from '@/lib/content/about-pages';
import { locales } from "@/i18n.config";

const siteUrl = "https://bestairesumes.com";

// Generate static params for all authors x locales
export async function generateStaticParams() {
  const slugs = Object.values(AUTHORS).map((a) => a.slug);
  return locales.flatMap((locale) =>
    slugs.map((author) => ({ locale, author }))
  );
}

// SEO metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; author: string }>;
}): Promise<Metadata> {
  const { author: authorSlug } = await params;
  const author = Object.values(AUTHORS).find((a) => a.slug === authorSlug);
  if (!author) return {};

  return {
    title: `${author.name} - ${author.jobTitle} | Best AI Resume`,
    description: `${author.name} is a ${author.jobTitle} at ${author.organization}. ${author.bio}`,
    authors: [{ name: author.name, url: `${siteUrl}/about/${author.slug}` }],
    openGraph: {
      title: `${author.name} - ${author.jobTitle}`,
      description: `${author.name} is a ${author.jobTitle} at ${author.organization}. ${author.bio}`,
      type: "profile",
      url: `${siteUrl}/about/${author.slug}`,
      images: [{ url: `${siteUrl}${author.image}`, alt: author.name }],
    },
  };
}

// Render JSON-LD structured data safely via next/script
function JsonLd({ data }: { data: object }) {
  return (
    <Script
      id="json-ld-author-profile"
      type="application/ld+json"
      strategy="afterInteractive"
    >
      {JSON.stringify(data)}
    </Script>
  );
}

export default async function AuthorProfilePage({
  params,
}: {
  params: Promise<{ locale: string; author: string }>;
}) {
  const { locale, author: authorSlug } = await params;
  const author = Object.values(AUTHORS).find((a) => a.slug === authorSlug);
  if (!author) notFound();

  const c = getAuthorProfileContent(locale);

  // Fetch all content types
  const [allResumeExamples, allCoverLetters, allBlogPosts] = await Promise.all([
    getAllResumeExamples(),
    getAllCoverLetterExamples(),
    getAllPosts(),
  ]);

  // Filter by author
  const authorResumes = allResumeExamples.filter((e) => e.author === author.name);
  const authorCoverLetters = allCoverLetters.filter((e) => e.author === author.name);
  const authorBlogPosts = allBlogPosts.filter((e) => e.author === author.name);

  // Combined stats
  const totalArticles = authorResumes.length + authorCoverLetters.length + authorBlogPosts.length;
  const recentResumes = authorResumes.slice(0, 12);
  const recentCoverLetters = authorCoverLetters.slice(0, 6);
  const recentBlogPosts = authorBlogPosts.slice(0, 6);

  // ProfilePage JSON-LD for Google Knowledge Graph
  // Safe: all values come from hardcoded AUTHORS constants, no user input
  const profileJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: author.name,
      jobTitle: author.jobTitle,
      url: `${siteUrl}/about/${author.slug}`,
      image: `${siteUrl}${author.image}`,
      description: `${author.jobTitle} at ${author.organization}. ${author.bio}`,
      ...(author.linkedin ? { sameAs: [author.linkedin] } : {}),
      worksFor: {
        "@type": "Organization",
        name: author.organization,
        url: siteUrl,
      },
      knowsAbout: author.expertise,
    },
  };

  return (
    <>
      <Header />
      <JsonLd data={profileJsonLd} />

      {/* Hero */}
      <section className="pt-32 pb-12 bg-light-teal">
        <div className="max-w-4xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-sm text-dark-teal/60 mb-8">
            <Link href={`/${locale}`} className="hover:text-teal-primary">{c.breadcrumb.home}</Link>
            <span>/</span>
            <Link href={`/${locale}/about`} className="hover:text-teal-primary">{c.breadcrumb.about}</Link>
            <span>/</span>
            <span className="text-dark-teal">{author.name}</span>
          </nav>

          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-teal-primary/20 flex-shrink-0 shadow-lg">
              <Image
                src={author.image}
                alt={`${author.name} - ${author.jobTitle}`}
                className="w-full h-full object-cover"
                width={144}
                height={144}
              />
            </div>

            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold text-dark-teal mb-2">{author.name}</h1>
              <p className="text-teal-primary font-semibold text-lg mb-3">
                {c.atOrg.replace('{jobTitle}', author.jobTitle).replace('{organization}', author.organization)}
              </p>
              <p className="text-dark-teal/70 max-w-lg mb-4">
                {author.bio}
                {totalArticles > 0 && c.authorOfGuides.replace('{count}', String(totalArticles))}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                {author.linkedin && (
                  <a
                    href={author.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    {c.connectLinkedIn}
                  </a>
                )}
                <Link
                  href={`/${locale}/resume-examples`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-teal-primary/10 text-teal-primary rounded-lg text-sm font-medium hover:bg-teal-primary/20 transition"
                >
                  {c.viewAllGuides}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-dark-teal mb-6">{c.areasOfExpertise}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {author.expertise.map((area) => (
              <div key={area} className="p-4 rounded-xl border border-gray-200 hover:border-teal-primary/30 transition">
                <h3 className="font-semibold text-dark-teal">{area}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume Guides */}
      {authorResumes.length > 0 && (
        <section className="py-12 bg-light-teal">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-dark-teal">
                {c.resumeGuidesBy.replace('{name}', author.name)}
              </h2>
              <span className="text-sm text-dark-teal/60">{c.guidesCount.replace('{count}', String(authorResumes.length))}</span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentResumes.map((example) => (
                <Link
                  key={example.slug}
                  href={`/${locale}/resume-examples/${example.slug}`}
                  className="block bg-white rounded-xl p-5 border border-gray-200 hover:border-teal-primary/30 hover:shadow-md transition"
                >
                  <h3 className="font-semibold text-dark-teal mb-1 text-sm leading-snug">
                    {example.jobTitle} Resume Guide
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-dark-teal/50">
                    <span className="bg-teal-primary/10 text-teal-primary px-2 py-0.5 rounded">
                      {example.displayCategory}
                    </span>
                    {example.avgSalary && <span>{example.avgSalary}</span>}
                  </div>
                </Link>
              ))}
            </div>

            {authorResumes.length > 12 && (
              <div className="text-center mt-8">
                <Link
                  href={`/${locale}/resume-examples`}
                  className="inline-flex items-center gap-2 text-teal-primary font-semibold hover:underline"
                >
                  {c.viewAllResumes.replace('{count}', String(authorResumes.length))}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Cover Letters */}
      {authorCoverLetters.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-dark-teal">
                {c.coverLetterExamplesBy.replace('{name}', author.name)}
              </h2>
              <span className="text-sm text-dark-teal/60">{c.examplesCount.replace('{count}', String(authorCoverLetters.length))}</span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentCoverLetters.map((example) => (
                <Link
                  key={example.slug}
                  href={`/${locale}/cover-letter-examples/${example.slug}`}
                  className="block bg-light-teal rounded-xl p-5 border border-gray-200 hover:border-teal-primary/30 hover:shadow-md transition"
                >
                  <h3 className="font-semibold text-dark-teal mb-1 text-sm leading-snug">
                    {example.jobTitle} Cover Letter
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-dark-teal/50">
                    <span className="bg-teal-primary/10 text-teal-primary px-2 py-0.5 rounded">
                      {example.displayCategory}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {authorCoverLetters.length > 6 && (
              <div className="text-center mt-8">
                <Link
                  href={`/${locale}/cover-letter-examples`}
                  className="inline-flex items-center gap-2 text-teal-primary font-semibold hover:underline"
                >
                  {c.viewAllCoverLetters.replace('{count}', String(authorCoverLetters.length))}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Blog Posts */}
      {authorBlogPosts.length > 0 && (
        <section className={`py-12 ${authorCoverLetters.length > 0 ? 'bg-light-teal' : 'bg-white'}`}>
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-dark-teal">
                {c.blogPostsBy.replace('{name}', author.name)}
              </h2>
              <span className="text-sm text-dark-teal/60">{c.postsCount.replace('{count}', String(authorBlogPosts.length))}</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {recentBlogPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/${locale}/blog/${post.slug}`}
                  className="block bg-white rounded-xl p-5 border border-gray-200 hover:border-teal-primary/30 hover:shadow-md transition"
                >
                  <h3 className="font-semibold text-dark-teal mb-2 text-sm leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-dark-teal/60 line-clamp-2 mb-2">
                    {post.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-dark-teal/50">
                    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                      {post.category}
                    </span>
                    <span>{post.readingTime}</span>
                  </div>
                </Link>
              ))}
            </div>

            {authorBlogPosts.length > 6 && (
              <div className="text-center mt-8">
                <Link
                  href={`/${locale}/blog`}
                  className="inline-flex items-center gap-2 text-teal-primary font-semibold hover:underline"
                >
                  {c.viewAllBlogPosts.replace('{count}', String(authorBlogPosts.length))}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-teal-gradient">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {c.cta.title}
          </h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            {c.cta.subtitle.replace('{name}', author.name)}
          </p>
          <Link
            href={`/${locale}/onboarding`}
            className="inline-flex items-center gap-2 bg-accent-orange text-white px-8 py-4 rounded-full font-semibold hover:bg-orange-600 transition shadow-lg"
          >
            {c.cta.button}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}

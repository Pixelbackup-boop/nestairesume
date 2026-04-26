import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InArticleVideoAd from "@/components/ads/InArticleVideoAd";
import LeaderboardAd from "@/components/ads/LeaderboardAd";
import SidebarAd from "@/components/ads/SidebarAd";
import MultiplexAd from "@/components/ads/MultiplexAd";
import { splitHtmlAtMiddle } from "@/lib/splitContent";
import {
  getCoverLetterExampleBySlug,
  getAllCoverLetterExampleSlugs,
  getRelatedCoverLetterExamples,
  getAuthor,
} from "@/lib/cover-letter-examples/posts";
import { getLocalizedUrl, getLocalizedPath } from "@/lib/localized-paths";
import { getContent } from "@/lib/content/cover-letter-article";
import LanguageAlternates from "@/components/LanguageAlternates";
import { locales } from "@/i18n.config";

const siteUrl = "https://bestairesumes.com";

// Generate static params for all examples and locales
export async function generateStaticParams() {
  const slugs = await getAllCoverLetterExampleSlugs();
  return locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

// Generate SEO metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const example = await getCoverLetterExampleBySlug(slug, locale);

  if (!example) {
    return { title: getContent(locale).notFound };
  }

  const title = `${example.jobTitle} Cover Letter Example & Writing Guide 2026`;
  const description = example.description;
  const url = getLocalizedUrl(siteUrl, `/cover-letter-examples/${slug}`, locale);
  const languages: Record<string, string> = {
    'x-default': `${siteUrl}/en/cover-letter-examples/${slug}`,
  };
  locales.forEach((loc) => {
    languages[loc] = getLocalizedUrl(siteUrl, `/cover-letter-examples/${slug}`, loc);
  });

  return {
    title,
    description,
    keywords: example.tags.join(", "),
    authors: [{ name: example.author }],
    openGraph: {
      title,
      description,
      type: "article",
      url,
      siteName: "Best AI Resume",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: title }],
      publishedTime: example.date,
      authors: [example.author],
      tags: example.tags,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
    alternates: {
      canonical: url,
      languages,
    },
  };
}

// Convert markdown content to HTML (simplified) - content is from controlled MDX files
function renderContent(content: string): string {
  let html = content;

  // Convert headers
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-xl font-semibold text-gray-900 mt-8 mb-4">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">$1</h2>');

  // Convert bold and italic
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Convert links
  html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-teal-primary hover:underline">$1</a>');

  // Convert lists
  html = html.replace(/^- (.+)$/gm, '<li class="ml-4 mb-2">$1</li>');
  html = html.replace(/^\d+\. (.+)$/gm, '<li class="ml-4 mb-2 list-decimal">$1</li>');
  // Wrap consecutive list items in proper container elements
  html = html.replace(/(<li class="ml-4 mb-2">[\s\S]*?<\/li>\n?)+/g, '<ul class="list-disc mb-4 space-y-1 ml-2">$&</ul>');
  html = html.replace(/(<li class="ml-4 mb-2 list-decimal">[\s\S]*?<\/li>\n?)+/g, '<ol class="list-decimal mb-4 space-y-1 ml-4">$&</ol>');

  // Convert paragraphs
  const lines = html.split('\n');
  html = lines
    .map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return '';
      if (trimmed.startsWith('<')) return line;
      if (trimmed.startsWith('-') || trimmed.match(/^\d+\./)) return line;
      return `<p class="text-gray-700 leading-relaxed mb-4">${trimmed}</p>`;
    })
    .join('\n');

  return html;
}

// Extract headings for TOC
function extractHeadings(content: string): { id: string; text: string; level: number }[] {
  const headings: { id: string; text: string; level: number }[] = [];
  const h2Regex = /^## (.+)$/gm;
  const h3Regex = /^### (.+)$/gm;

  let match;
  while ((match = h2Regex.exec(content)) !== null) {
    headings.push({ id: match[1].toLowerCase().replace(/\s+/g, '-'), text: match[1], level: 2 });
  }
  while ((match = h3Regex.exec(content)) !== null) {
    headings.push({ id: match[1].toLowerCase().replace(/\s+/g, '-'), text: match[1], level: 3 });
  }

  return headings;
}

export default async function CoverLetterExamplePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const example = await getCoverLetterExampleBySlug(slug, locale);
  const c = getContent(locale);

  if (!example) {
    notFound();
  }

  const author = getAuthor(example.author);
  const relatedExamples = await getRelatedCoverLetterExamples(slug, 3);
  const headings = extractHeadings(example.content);

  const localizedHref = (path: string) => `/${locale}${getLocalizedPath(path, locale)}`;

  // JSON-LD structured data - hardcoded objects from constants, safe for rendering
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${example.jobTitle} Cover Letter Example & Writing Guide`,
    description: example.description,
    datePublished: example.date,
    dateModified: example.date,
    url: getLocalizedUrl(siteUrl, `/cover-letter-examples/${slug}`, locale),
    publisher: {
      "@type": "Organization",
      name: "Best AI Resume",
      url: siteUrl,
    },
    author: [{
      "@type": "Person",
      name: author.name,
      jobTitle: author.jobTitle,
      url: `${siteUrl}/${locale}/about/${author.slug}`,
      image: `${siteUrl}${author.image}`,
      knowsAbout: author.expertise,
      ...(author.linkedin ? { sameAs: [author.linkedin] } : {}),
      worksFor: {
        "@type": "Organization",
        name: author.organization,
        url: siteUrl,
      },
    }],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Cover Letter Examples", item: getLocalizedUrl(siteUrl, '/cover-letter-examples', locale) },
      { "@type": "ListItem", position: 3, name: `${example.jobTitle} Cover Letter` },
    ],
  };

  const faqJsonLd = example.faq && example.faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: example.faq.map((item: { question: string; answer: string }) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  } : null;

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to Write a ${example.jobTitle} Cover Letter`,
    description: example.description,
    step: [
      { "@type": "HowToStep", text: "Research the company and job requirements" },
      { "@type": "HowToStep", text: "Write a compelling opening paragraph" },
      { "@type": "HowToStep", text: "Highlight 2-3 relevant achievements with metrics" },
      { "@type": "HowToStep", text: "Explain why you want this specific company" },
      { "@type": "HowToStep", text: "Close with a call to action and contact info" },
    ],
    tool: { "@type": "HowToTool", name: "Best AI Resume Builder", url: siteUrl },
  };

  // All JSON-LD objects are built from hardcoded constants and sanitized frontmatter
  const articleSchema = JSON.stringify(articleJsonLd);
  const breadcrumbSchema = JSON.stringify(breadcrumbJsonLd);
  const faqSchema = faqJsonLd ? JSON.stringify(faqJsonLd) : null;
  const howToSchema = JSON.stringify(howToJsonLd);

  // Split rendered HTML for mid-content ad placement
  const fullHtml = renderContent(example.content);
  const [firstHalfHtml, secondHalfHtml] = splitHtmlAtMiddle(fullHtml);

  return (
    <>
      <Header />

      {/* Article JSON-LD - hardcoded schema object */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: articleSchema }}
      />
      {/* BreadcrumbList JSON-LD - hardcoded schema object */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
      />
      {/* FAQPage JSON-LD - from controlled MDX frontmatter */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: faqSchema }}
        />
      )}
      {/* HowTo JSON-LD - hardcoded schema object */}
      <script type="application/ld+json">{howToSchema}</script>

      {/* Breadcrumb */}
      <nav className="pt-24 pb-4 bg-light-teal">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href={localizedHref("/")} className="hover:text-teal-primary">
              {c.breadcrumb.home}
            </Link>
            <span>/</span>
            <Link href={localizedHref("/cover-letter-examples")} className="hover:text-teal-primary">
              {c.breadcrumb.coverLetterExamples}
            </Link>
            <span>/</span>
            <span className="text-dark-teal">{example.jobTitle}</span>
          </div>
        </div>
      </nav>

      {/* Header Section */}
      <section className="py-8 bg-light-teal">
        <div className="max-w-6xl mx-auto px-6">
          <span className="inline-block px-3 py-1 bg-teal-primary/10 text-teal-primary text-sm font-medium rounded-full mb-4">
            {example.category}
          </span>
          <h1 className="text-4xl font-bold text-dark-teal mb-4">
            {example.jobTitle} {c.coverLetterSuffix}
          </h1>
          <p className="text-lg text-dark-teal/70 mb-6">{example.description}</p>

          <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
            <Link href={`/about/${author.slug}`} className="flex items-center gap-2 hover:text-teal-primary transition">
              <Image
                src={author.image}
                alt={author.name}
                className="w-8 h-8 rounded-full object-cover"
                width={32}
                height={32}
              />
              <span className="font-medium text-dark-teal">{author.name}</span>
            </Link>
            <span>•</span>
            <span>{author.jobTitle}</span>
            <span>•</span>
            <span>{example.readingTime}</span>
            <span>•</span>
            <span>{c.updated} {new Date(example.date).toLocaleDateString(locale === 'es' ? 'es-ES' : locale === 'fr' ? 'fr-FR' : locale === 'de' ? 'de-DE' : locale === 'ar' ? 'ar-SA' : 'en-US')}</span>
          </div>
        </div>
      </section>

      {/* Leaderboard Ad */}
      <LeaderboardAd className="py-4 bg-white max-w-6xl mx-auto px-6" />

      {/* Main Content */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Article Content */}
            <article className="lg:col-span-2">
              {/* Key Skills */}
              {example.keySkills.length > 0 && (
                <div className="bg-light-teal rounded-xl p-6 mb-8">
                  <h2 className="text-xl font-semibold text-dark-teal mb-4">
                    {c.keySkillsTitle}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {example.keySkills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-2 bg-white text-dark-teal text-sm rounded-lg border border-teal-primary/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Content — First Half */}
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: firstHalfHtml }}
              />

              {/* In-Article Ad (mid-content) */}
              {secondHalfHtml && <InArticleVideoAd slotType="resumeInArticle" className="my-8" />}

              {/* Content — Second Half */}
              {secondHalfHtml && (
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: secondHalfHtml }}
                />
              )}

              {/* Tags */}
              {example.tags.length > 0 && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-500 mb-3">
                    {c.relatedTopics}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {example.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQ Section */}
              {example.faq && example.faq.length > 0 && (
                <div className="mt-10 pt-8 border-t border-gray-200">
                  <h2 className="text-2xl font-bold text-dark-teal mb-6">
                    {c.faqTitle}
                  </h2>
                  <div className="space-y-3">
                    {example.faq.map((item: { question: string; answer: string }, index: number) => (
                      <details
                        key={index}
                        className="group bg-light-teal rounded-lg"
                      >
                        <summary className="flex items-center justify-between cursor-pointer px-5 py-4 text-dark-teal font-medium hover:text-teal-primary transition list-none">
                          <span>{item.question}</span>
                          <svg
                            className="w-5 h-5 flex-shrink-0 transition-transform group-open:rotate-180"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </summary>
                        <div className="px-5 pb-4 text-gray-600 leading-relaxed">
                          <p>{item.answer}</p>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              )}

              {/* Internal Links */}
              <div className="mt-10 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-dark-teal mb-4">
                  {c.relatedResourcesTitle}
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Link
                    href={localizedHref(`/resume-examples/${slug}`)}
                    className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-light-teal transition group"
                  >
                    <span className="text-teal-primary mt-0.5">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    </span>
                    <div>
                      <p className="text-sm font-medium text-dark-teal group-hover:text-teal-primary transition">{example.jobTitle} Resume Example</p>
                      <p className="text-xs text-dark-teal/60 mt-0.5">{c.resumeExampleSubtext}</p>
                    </div>
                  </Link>
                  <Link
                    href={localizedHref("/tools/cover-letter")}
                    className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-light-teal transition group"
                  >
                    <span className="text-teal-primary mt-0.5">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </span>
                    <div>
                      <p className="text-sm font-medium text-dark-teal group-hover:text-teal-primary transition">{c.coverLetterGenerator}</p>
                      <p className="text-xs text-dark-teal/60 mt-0.5">{c.coverLetterGeneratorSubtext}</p>
                    </div>
                  </Link>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="sticky top-24 z-10 space-y-6">
                {/* CTA Card */}
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <h3 className="font-semibold text-dark-teal mb-4">{c.sidebar.ctaTitle}</h3>
                  <p className="text-sm text-dark-teal/70 mb-4">
                    {c.sidebar.ctaSubtitle.replace('{jobTitle}', example.jobTitle)}
                  </p>
                  <Link
                    href={localizedHref("/tools/cover-letter")}
                    className="block w-full text-center bg-teal-primary text-white py-3 rounded-lg font-semibold hover:bg-teal-secondary transition"
                  >
                    {c.sidebar.ctaButton}
                  </Link>
                </div>

                {/* Sidebar Ad */}
                <SidebarAd />

                {/* Table of Contents */}
                {headings.length > 0 && (
                  <div className="bg-light-teal rounded-xl p-6">
                    <h3 className="font-semibold text-dark-teal mb-4">{c.sidebar.tocTitle}</h3>
                    <nav className="space-y-2">
                      {headings.map((heading, index) => (
                        <a
                          key={index}
                          href={`#${heading.id}`}
                          className={`block text-sm hover:text-teal-primary transition ${
                            heading.level === 3 ? "pl-4 text-dark-teal/60" : "text-dark-teal/80"
                          }`}
                        >
                          {heading.text}
                        </a>
                      ))}
                    </nav>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Examples */}
      {relatedExamples.length > 0 && (
        <section className="py-12 bg-light-teal">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-dark-teal mb-6">{c.relatedCoverLetters}</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {relatedExamples.map((related) => (
                <Link
                  key={related.slug}
                  href={localizedHref(`/cover-letter-examples/${related.slug}`)}
                  className="block bg-white rounded-xl p-5 hover:shadow-md transition hover:border-teal-primary/20 border border-transparent"
                >
                  <p className="font-semibold text-dark-teal">{related.jobTitle} Cover Letter</p>
                  <p className="text-sm text-dark-teal/60 mt-1">{related.category}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Language Alternates — internal-link signals to other locale variants */}
      <div className="max-w-6xl mx-auto px-6">
        <LanguageAlternates currentLocale={locale} path={`/cover-letter-examples/${slug}`} />
      </div>

      {/* Multiplex Ad */}
      <MultiplexAd className="max-w-6xl mx-auto px-6 py-8" />

      {/* Bottom CTA */}
      <section className="py-16 bg-gradient-to-r from-teal-primary to-teal-secondary">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {c.sidebar.ctaTitle} — {example.jobTitle}
          </h2>
          <p className="text-white/80 mb-8">
            {c.bottomCta.subtitle}
          </p>
          <Link
            href={localizedHref("/tools/cover-letter")}
            className="inline-flex items-center gap-2 bg-white text-teal-primary px-8 py-4 rounded-full font-semibold hover:bg-light-teal transition shadow-lg"
          >
            {c.bottomCta.button}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}

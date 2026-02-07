import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InArticleVideoAd from "@/components/ads/InArticleVideoAd";
import { splitHtmlAtMiddle } from "@/lib/splitContent";
import {
  getResumeExampleBySlug,
  getAllResumeExampleSlugs,
  getRelatedResumeExamples,
  getAuthor,
} from "@/lib/resume-examples/posts";

const siteUrl = "https://www.bestairesumes.com";
const locales = ["en", "de", "fr", "es", "ar"];

// Generate static params for all examples and locales
export async function generateStaticParams() {
  const slugs = await getAllResumeExampleSlugs();
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
  const example = await getResumeExampleBySlug(slug);

  if (!example) {
    return { title: "Not Found" };
  }

  const title = `${example.jobTitle} Resume: Examples & Writing Guide 2026`;
  const description = example.description;
  const url = `${siteUrl}/${locale}/resume-examples/${slug}`;
  const languages: Record<string, string> = {
    'x-default': `${siteUrl}/en/resume-examples/${slug}`,
  };
  locales.forEach((loc) => {
    languages[loc] = `${siteUrl}/${loc}/resume-examples/${slug}`;
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
      publishedTime: example.date,
      authors: [example.author],
      images: example.image ? [{ url: example.image, alt: example.imageAlt }] : [],
      tags: example.tags,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: example.image ? [example.image] : [],
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
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-xl font-semibold text-dark-teal mt-8 mb-4">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-dark-teal mt-10 mb-4">$1</h2>');

  // Convert bold and italic
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Convert links
  html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-teal-primary hover:underline">$1</a>');

  // Convert lists
  html = html.replace(/^- (.+)$/gm, '<li class="ml-4 mb-2">$1</li>');
  html = html.replace(/^\d+\. (.+)$/gm, '<li class="ml-4 mb-2 list-decimal">$1</li>');

  // Convert paragraphs (lines that don't start with special chars)
  const lines = html.split('\n');
  html = lines
    .map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return '';
      if (trimmed.startsWith('<')) return line;
      if (trimmed.startsWith('-') || trimmed.match(/^\d+\./)) return line;
      return `<p class="text-dark-teal/80 leading-relaxed mb-4">${trimmed}</p>`;
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

export default async function ResumeExamplePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const example = await getResumeExampleBySlug(slug);

  if (!example) {
    notFound();
  }

  const author = getAuthor(example.author);
  const relatedExamples = await getRelatedResumeExamples(slug, 3);
  const headings = extractHeadings(example.content);
  const t = await getTranslations({ locale, namespace: "ResumeExamples" });

  const localizedHref = (path: string) => `/${locale}${path}`;

  // JSON-LD structured data - hardcoded objects from constants, safe for rendering
  // Article schema for E-E-A-T author signals
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${example.jobTitle} Resume: Examples & Writing Guide`,
    description: example.description,
    image: example.image ? `${siteUrl}${example.image}` : undefined,
    datePublished: example.date,
    dateModified: example.date,
    url: `${siteUrl}/${locale}/resume-examples/${slug}`,
    publisher: {
      "@type": "Organization",
      name: "Best AI Resume",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
    },
    author: [{
      "@type": "Person",
      name: author.name,
      jobTitle: author.jobTitle,
      url: `${siteUrl}/about/${author.slug}`,
      image: `${siteUrl}${author.image}`,
      knowsAbout: author.expertise,
      ...(author.linkedin ? { sameAs: [author.linkedin] } : {}),
      worksFor: {
        "@type": "Organization",
        name: author.organization,
        url: siteUrl,
      },
    }],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/${locale}/resume-examples/${slug}`,
    },
  };

  // HowTo schema for rich snippets in search results
  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to Write a ${example.jobTitle} Resume`,
    description: example.description,
    image: example.image ? `${siteUrl}${example.image}` : undefined,
    step: [
      { "@type": "HowToStep", text: "Write a compelling professional summary" },
      { "@type": "HowToStep", text: "List your relevant skills and technologies" },
      { "@type": "HowToStep", text: "Describe your work experience with metrics" },
      { "@type": "HowToStep", text: "Add education and certifications" },
      { "@type": "HowToStep", text: "Proofread and optimize for ATS" },
    ],
    tool: {
      "@type": "HowToTool",
      name: "Best AI Resume Builder",
      url: siteUrl,
    },
  };

  // BreadcrumbList schema for SERP breadcrumb trail
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Resume Examples", item: `${siteUrl}/resume-examples` },
      { "@type": "ListItem", position: 3, name: `${example.jobTitle} Resume` },
    ],
  };

  // FAQPage schema for AI Overview citations - from controlled MDX frontmatter
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

  // All JSON-LD objects are built from hardcoded constants and sanitized frontmatter
  const articleSchema = JSON.stringify(articleJsonLd);
  const howToSchema = JSON.stringify(howToJsonLd);
  const breadcrumbSchema = JSON.stringify(breadcrumbJsonLd);
  const faqSchema = faqJsonLd ? JSON.stringify(faqJsonLd) : null;

  // Split rendered HTML for mid-content ad placement
  const fullHtml = renderContent(example.content);
  const [firstHalfHtml, secondHalfHtml] = splitHtmlAtMiddle(fullHtml);

  return (
    <>
      <Header />

      {/* Article JSON-LD for E-E-A-T author signals - hardcoded schema object */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: articleSchema }}
      />
      {/* HowTo JSON-LD for rich snippets - hardcoded schema object */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: howToSchema }}
      />
      {/* BreadcrumbList JSON-LD for SERP breadcrumb trail - hardcoded schema object, no user input */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
      />
      {/* FAQPage JSON-LD for AI Overview citations - from controlled MDX frontmatter, no user input */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: faqSchema }}
        />
      )}

      {/* Breadcrumb */}
      <nav className="pt-24 pb-4 bg-light-teal">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-dark-teal/60">
            <Link href={localizedHref("/")} className="hover:text-teal-primary">
              Home
            </Link>
            <span>/</span>
            <Link href={localizedHref("/resume-examples")} className="hover:text-teal-primary">
              Resume Examples
            </Link>
            <span>/</span>
            <span className="text-dark-teal">{example.jobTitle}</span>
          </div>
        </div>
      </nav>

      {/* Header Section — Full Width */}
      <section className="py-8 bg-light-teal">
        <div className="max-w-6xl mx-auto px-6">
          <span className="inline-block px-3 py-1 bg-teal-primary/10 text-teal-primary text-sm font-medium rounded-full mb-4">
            {example.category}
          </span>
          <h1 className="text-4xl font-bold text-dark-teal mb-4">
            {example.jobTitle} Resume
          </h1>
          <p className="text-lg text-dark-teal/70 mb-6">{example.description}</p>

          <div className="flex items-center gap-4 text-sm text-dark-teal/60 flex-wrap">
            <Link href={`/about/${author.slug}`} className="flex items-center gap-2 hover:text-teal-primary transition">
              <img
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
            {author.linkedin && (
              <>
                <span>•</span>
                <a
                  href={author.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium transition"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn
                </a>
              </>
            )}
            <span>•</span>
            <span>{example.readingTime}</span>
            <span>•</span>
            <span>Posted {new Date(example.date).toLocaleDateString()}</span>
          </div>
        </div>
      </section>

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
                    Key Skills for {example.jobTitle}
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
                  <h3 className="text-sm font-semibold text-dark-teal/60 mb-3">
                    Related Topics
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {example.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 text-dark-teal/70 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQ Section — People Also Ask */}
              {example.faq && example.faq.length > 0 && (
                <div className="mt-10 pt-8 border-t border-gray-200">
                  <h2 className="text-2xl font-bold text-dark-teal mb-6">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-3" itemScope itemType="https://schema.org/FAQPage">
                    {example.faq.map((item: { question: string; answer: string }, index: number) => (
                      <details
                        key={index}
                        className="group bg-light-teal rounded-lg"
                        itemScope
                        itemProp="mainEntity"
                        itemType="https://schema.org/Question"
                      >
                        <summary className="flex items-center justify-between cursor-pointer px-5 py-4 text-dark-teal font-medium hover:text-teal-primary transition list-none">
                          <span itemProp="name">{item.question}</span>
                          <svg
                            className="w-5 h-5 flex-shrink-0 transition-transform group-open:rotate-180"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </summary>
                        <div
                          className="px-5 pb-4 text-dark-teal/80 leading-relaxed"
                          itemScope
                          itemProp="acceptedAnswer"
                          itemType="https://schema.org/Answer"
                        >
                          <p itemProp="text">{item.answer}</p>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              )}

              {/* Internal Links — Resume Resources */}
              <div className="mt-10 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-dark-teal mb-4">
                  Resume Resources
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Link
                    href={localizedHref("/blog/how-to-write-ats-friendly-resume")}
                    className="flex items-start gap-3 p-4 bg-light-teal rounded-lg hover:bg-teal-primary/10 transition group"
                  >
                    <span className="text-teal-primary mt-0.5">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    </span>
                    <div>
                      <p className="text-sm font-medium text-dark-teal group-hover:text-teal-primary transition">How to Write an ATS-Friendly Resume</p>
                      <p className="text-xs text-dark-teal/50 mt-0.5">Beat applicant tracking systems</p>
                    </div>
                  </Link>
                  <Link
                    href={localizedHref("/blog/top-resume-mistakes-to-avoid")}
                    className="flex items-start gap-3 p-4 bg-light-teal rounded-lg hover:bg-teal-primary/10 transition group"
                  >
                    <span className="text-teal-primary mt-0.5">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
                    </span>
                    <div>
                      <p className="text-sm font-medium text-dark-teal group-hover:text-teal-primary transition">Top Resume Mistakes to Avoid</p>
                      <p className="text-xs text-dark-teal/50 mt-0.5">Common errors that cost you interviews</p>
                    </div>
                  </Link>
                  <Link
                    href={localizedHref("/resume-format")}
                    className="flex items-start gap-3 p-4 bg-light-teal rounded-lg hover:bg-teal-primary/10 transition group"
                  >
                    <span className="text-teal-primary mt-0.5">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                    </span>
                    <div>
                      <p className="text-sm font-medium text-dark-teal group-hover:text-teal-primary transition">Resume Format Guide 2026</p>
                      <p className="text-xs text-dark-teal/50 mt-0.5">Chronological, functional & combination</p>
                    </div>
                  </Link>
                  <Link
                    href={localizedHref("/blog/interview-preparation-guide")}
                    className="flex items-start gap-3 p-4 bg-light-teal rounded-lg hover:bg-teal-primary/10 transition group"
                  >
                    <span className="text-teal-primary mt-0.5">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </span>
                    <div>
                      <p className="text-sm font-medium text-dark-teal group-hover:text-teal-primary transition">Interview Preparation Guide</p>
                      <p className="text-xs text-dark-teal/50 mt-0.5">Ace your next job interview</p>
                    </div>
                  </Link>
                </div>
                <div className="mt-4 p-4 bg-gradient-to-r from-teal-primary/5 to-teal-primary/10 rounded-lg">
                  <p className="text-sm text-dark-teal/80">
                    Ready to create your {example.jobTitle} resume? Use our{" "}
                    <Link href={localizedHref("/")} className="text-teal-primary font-semibold hover:underline">
                      AI Resume Builder
                    </Link>{" "}
                    to generate an ATS-optimized resume in minutes. Browse{" "}
                    <Link href={localizedHref("/templates")} className="text-teal-primary font-semibold hover:underline">
                      free resume templates
                    </Link>{" "}
                    or explore more{" "}
                    <Link href={localizedHref("/resume-examples")} className="text-teal-primary font-semibold hover:underline">
                      resume examples
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Sticky wrapper: Quick Stats + Table of Contents */}
              <div className="sticky top-24 z-10 space-y-6">
                {/* Quick Stats */}
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="font-semibold text-dark-teal mb-4">Quick Stats</h3>
                  {example.avgSalary && (
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">💰</span>
                      <div>
                        <p className="text-sm text-dark-teal/60">Avg. Salary</p>
                        <p className="font-semibold text-dark-teal">{example.avgSalary}</p>
                      </div>
                    </div>
                  )}
                  {example.jobGrowth && (
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">📈</span>
                      <div>
                        <p className="text-sm text-dark-teal/60">Job Growth</p>
                        <p className="font-semibold text-dark-teal">{example.jobGrowth}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">🏢</span>
                    <div>
                      <p className="text-sm text-dark-teal/60">Industry</p>
                      <p className="font-semibold text-dark-teal">{example.category}</p>
                    </div>
                  </div>
                  <Link
                    href={localizedHref("/onboarding")}
                    className="block w-full text-center bg-teal-primary text-white py-3 rounded-lg font-semibold hover:bg-teal-secondary transition"
                  >
                    Build My {example.jobTitle} Resume
                  </Link>
                </div>

                {/* Table of Contents */}
                {headings.length > 0 && (
                  <div className="bg-light-teal rounded-xl p-6">
                    <h3 className="font-semibold text-dark-teal mb-4">Table of Contents</h3>
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

      {/* Related Jobs — full width */}
      {relatedExamples.length > 0 && (
        <section className="py-12 bg-light-teal">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-dark-teal mb-6">Related Jobs</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {relatedExamples.map((related) => (
                <Link
                  key={related.slug}
                  href={localizedHref(`/resume-examples/${related.slug}`)}
                  className="block bg-white rounded-xl p-5 hover:shadow-md transition"
                >
                  <p className="font-semibold text-dark-teal">{related.jobTitle}</p>
                  <p className="text-sm text-dark-teal/60 mt-1">{related.category}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-16 bg-teal-gradient">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Build Your {example.jobTitle} Resume Now
          </h2>
          <p className="text-white/80 mb-8">
            Join thousands of professionals who landed their dream jobs with Best AI Resume.
          </p>
          <Link
            href={localizedHref("/onboarding")}
            className="inline-flex items-center gap-2 bg-accent-orange text-white px-8 py-4 rounded-full font-semibold hover:bg-orange-600 transition shadow-lg"
          >
            Create My Resume — Free
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

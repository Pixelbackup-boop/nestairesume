import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AUTHORS } from "@/lib/resume-examples/posts";
import { getAuthorsContent } from '@/lib/content/about-pages';
import { locales } from '@/i18n.config';

const siteUrl = "https://bestairesumes.com";
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = getAuthorsContent(locale);

  return {
    title: c.meta.title,
    description: c.meta.description,
    openGraph: {
      title: c.meta.title,
      description: c.meta.ogDescription,
      type: "website",
      url: `${siteUrl}/${locale}/about/authors`,
    },
    twitter: {
      card: 'summary_large_image',
      title: c.meta.title,
      description: c.meta.ogDescription,
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/about/authors`,
      languages: Object.fromEntries(locales.map(l => [l, `${siteUrl}/${l}/about/authors`])),
    },
  };
}

export default async function AuthorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const c = getAuthorsContent(locale);
  const authors = Object.values(AUTHORS);

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-12 bg-light-teal">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-sm text-dark-teal/60 mb-8">
            <Link href={`/${locale}`} className="hover:text-teal-primary">
              {c.breadcrumb.home}
            </Link>
            <span>/</span>
            <Link href={`/${locale}/about`} className="hover:text-teal-primary">
              {c.breadcrumb.about}
            </Link>
            <span>/</span>
            <span className="text-dark-teal">{c.breadcrumb.authors}</span>
          </nav>

          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-dark-teal mb-4">
              {c.hero.title}
            </h1>
            <p className="text-lg text-dark-teal/70">
              {c.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Authors Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {authors.map((author) => (
              <Link
                key={author.slug}
                href={`/${locale}/about/${author.slug}`}
                className="group block bg-light-teal rounded-2xl p-6 border border-gray-200 hover:border-teal-primary/30 hover:shadow-lg transition-all duration-300"
              >
                {/* Avatar */}
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-md group-hover:shadow-lg transition">
                  <Image
                    src={author.image}
                    alt={author.name}
                    className="w-full h-full object-cover"
                    width={96}
                    height={96}
                  />
                </div>

                {/* Info */}
                <div className="text-center">
                  <h2 className="text-lg font-bold text-dark-teal mb-1 group-hover:text-teal-primary transition">
                    {author.name}
                  </h2>
                  <p className="text-sm text-teal-primary font-medium mb-3">
                    {author.jobTitle}
                  </p>
                  <p className="text-xs text-dark-teal/60 line-clamp-3 mb-4">
                    {author.bio}
                  </p>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap justify-center gap-1">
                    {author.expertise.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="text-xs bg-white text-dark-teal/70 px-2 py-0.5 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* View Profile Link */}
                <div className="mt-4 text-center">
                  <span className="inline-flex items-center gap-1 text-sm text-teal-primary font-medium group-hover:underline">
                    {c.viewProfile}
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-teal-gradient">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {c.cta.title}
          </h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            {c.cta.subtitle}
          </p>
          <Link
            href={`/${locale}/onboarding`}
            className="inline-flex items-center gap-2 bg-accent-orange text-white px-8 py-4 rounded-full font-semibold hover:bg-orange-600 transition shadow-lg"
          >
            {c.cta.button}
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
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

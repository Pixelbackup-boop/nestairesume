import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AUTHORS } from "@/lib/resume-examples/posts";

const siteUrl = "https://www.bestairesumes.com";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const locales = ['en', 'es', 'fr', 'de', 'ar'];
  const alternateLanguages: Record<string, string> = {
    'x-default': `${siteUrl}/en/about/authors`,
  };
  locales.forEach((loc) => {
    alternateLanguages[loc] = `${siteUrl}/${loc}/about/authors`;
  });

  return {
    title: "Our Expert Authors | Best AI Resume",
    description:
      "Meet the career experts, recruiters, and coaches behind our resume guides. Our authors bring real-world hiring experience to help you land your dream job.",
    openGraph: {
      title: "Our Expert Authors | Best AI Resume",
      description:
        "Meet the career experts, recruiters, and coaches behind our resume guides.",
      type: "website",
      url: `${siteUrl}/${locale}/about/authors`,
    },
    twitter: {
      card: 'summary_large_image',
      title: "Our Expert Authors | Best AI Resume",
      description: "Meet the career experts, recruiters, and coaches behind our resume guides.",
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/about/authors`,
      languages: alternateLanguages,
    },
  };
}

export default function AuthorsPage() {
  const authors = Object.values(AUTHORS);

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-12 bg-light-teal">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-sm text-dark-teal/60 mb-8">
            <Link href="/" className="hover:text-teal-primary">
              Home
            </Link>
            <span>/</span>
            <Link href="/about" className="hover:text-teal-primary">
              About
            </Link>
            <span>/</span>
            <span className="text-dark-teal">Authors</span>
          </nav>

          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-dark-teal mb-4">
              Meet Our Expert Authors
            </h1>
            <p className="text-lg text-dark-teal/70">
              Our team of career coaches, recruiters, and industry specialists
              create actionable resume guides backed by real hiring experience.
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
                href={`/about/${author.slug}`}
                className="group block bg-light-teal rounded-2xl p-6 border border-gray-200 hover:border-teal-primary/30 hover:shadow-lg transition-all duration-300"
              >
                {/* Avatar */}
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-md group-hover:shadow-lg transition">
                  <img
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
                    View Profile
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
            Build Your Resume with Expert Guidance
          </h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            Our AI builder applies the same strategies our experts recommend.
            Create a professional resume in minutes.
          </p>
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 bg-accent-orange text-white px-8 py-4 rounded-full font-semibold hover:bg-orange-600 transition shadow-lg"
          >
            Create My Resume — Free
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

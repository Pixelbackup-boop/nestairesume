import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_AUTHOR, getAllResumeExamples } from "@/lib/resume-examples/posts";

const siteUrl = "https://www.bestairesumes.com";

export const metadata: Metadata = {
  title: `${SITE_AUTHOR.name} - ${SITE_AUTHOR.jobTitle} | Best AI Resume`,
  description: `${SITE_AUTHOR.name} is a ${SITE_AUTHOR.jobTitle} at ${SITE_AUTHOR.organization}. Expert in resume writing, ATS optimization, and career strategy. Author of 300+ professional resume guides.`,
  authors: [{ name: SITE_AUTHOR.name, url: `${siteUrl}/about/alex-brown` }],
  openGraph: {
    title: `${SITE_AUTHOR.name} - ${SITE_AUTHOR.jobTitle}`,
    description: `${SITE_AUTHOR.name} is a ${SITE_AUTHOR.jobTitle} at ${SITE_AUTHOR.organization}. Author of 300+ professional resume guides.`,
    type: "profile",
    url: `${siteUrl}/about/alex-brown`,
    images: [{ url: `${siteUrl}${SITE_AUTHOR.image}`, alt: SITE_AUTHOR.name }],
  },
};

export default async function AuthorProfilePage() {
  const allExamples = await getAllResumeExamples();
  const recentArticles = allExamples.slice(0, 12);
  const totalArticles = allExamples.length;

  // ProfilePage JSON-LD for Google Knowledge Graph - built from hardcoded SITE_AUTHOR constants
  const profileJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: SITE_AUTHOR.name,
      jobTitle: SITE_AUTHOR.jobTitle,
      url: `${siteUrl}/about/alex-brown`,
      image: `${siteUrl}${SITE_AUTHOR.image}`,
      description: `${SITE_AUTHOR.jobTitle} at ${SITE_AUTHOR.organization}. Expert in resume writing, ATS optimization, and HR strategy.`,
      sameAs: [SITE_AUTHOR.linkedin],
      worksFor: {
        "@type": "Organization",
        name: SITE_AUTHOR.organization,
        url: siteUrl,
      },
      knowsAbout: [
        "Resume Writing",
        "ATS Optimization",
        "Career Strategy",
        "Human Resources",
        "Talent Acquisition",
        "Job Interview Preparation",
        "Professional Development",
      ],
    },
  };

  return (
    <>
      <Header />

      {/* ProfilePage JSON-LD - safe: built entirely from hardcoded constants, no user input */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
      />

      {/* Hero */}
      <section className="pt-32 pb-12 bg-light-teal">
        <div className="max-w-4xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-sm text-dark-teal/60 mb-8">
            <Link href="/" className="hover:text-teal-primary">Home</Link>
            <span>/</span>
            <Link href="/about" className="hover:text-teal-primary">About</Link>
            <span>/</span>
            <span className="text-dark-teal">{SITE_AUTHOR.name}</span>
          </nav>

          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-teal-primary/20 flex-shrink-0 shadow-lg">
              <img
                src={SITE_AUTHOR.image}
                alt={`${SITE_AUTHOR.name} - ${SITE_AUTHOR.jobTitle}`}
                className="w-full h-full object-cover"
                width={144}
                height={144}
              />
            </div>

            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold text-dark-teal mb-2">{SITE_AUTHOR.name}</h1>
              <p className="text-teal-primary font-semibold text-lg mb-3">
                {SITE_AUTHOR.jobTitle} at {SITE_AUTHOR.organization}
              </p>
              <p className="text-dark-teal/70 max-w-lg mb-4">
                Helping professionals craft resumes that pass ATS screening and impress hiring managers. Author of {totalArticles}+ resume guides covering every industry.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <a
                  href={SITE_AUTHOR.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  Connect on LinkedIn
                </a>
                <Link
                  href="/resume-examples"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-teal-primary/10 text-teal-primary rounded-lg text-sm font-medium hover:bg-teal-primary/20 transition"
                >
                  View All Guides
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-dark-teal mb-6">Areas of Expertise</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Resume Strategy", desc: "Crafting targeted resumes that align with specific job descriptions and industry requirements" },
              { title: "ATS Optimization", desc: "Ensuring resumes pass Applicant Tracking Systems used by 98% of Fortune 500 companies" },
              { title: "HR & Recruitment", desc: "Deep understanding of how hiring managers and recruiters evaluate candidates" },
              { title: "Career Transitions", desc: "Helping professionals pivot between industries with transferable skill positioning" },
              { title: "Interview Preparation", desc: "Aligning resume content with likely interview questions for consistency" },
              { title: "Industry Analysis", desc: "Tracking hiring trends across 300+ job titles and 18 industry categories" },
            ].map((area) => (
              <div key={area.title} className="p-4 rounded-xl border border-gray-200 hover:border-teal-primary/30 transition">
                <h3 className="font-semibold text-dark-teal mb-1">{area.title}</h3>
                <p className="text-sm text-dark-teal/60">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Articles */}
      <section className="py-12 bg-light-teal">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-dark-teal">
              Resume Guides by {SITE_AUTHOR.name}
            </h2>
            <span className="text-sm text-dark-teal/60">{totalArticles} articles</span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentArticles.map((example) => (
              <Link
                key={example.slug}
                href={`/resume-examples/${example.slug}`}
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

          {totalArticles > 12 && (
            <div className="text-center mt-8">
              <Link
                href="/resume-examples"
                className="inline-flex items-center gap-2 text-teal-primary font-semibold hover:underline"
              >
                View all {totalArticles} resume guides
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-teal-gradient">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Build Your Resume with Expert Guidance
          </h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            Use the same strategies {SITE_AUTHOR.name} recommends. Our AI builder applies expert resume techniques automatically.
          </p>
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 bg-accent-orange text-white px-8 py-4 rounded-full font-semibold hover:bg-orange-600 transition shadow-lg"
          >
            Create My Resume — Free
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

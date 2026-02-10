import { Metadata } from 'next';
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getContent, type PrivacyContent } from '@/lib/content/privacy-page';

const siteUrl = 'https://www.bestairesumes.com';
const locales = ['en', 'es', 'fr', 'de', 'ar'];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = getContent(locale);
  return {
    title: `${c.hero.badge} | Best AI Resume`,
    description: c.hero.subtitle,
    alternates: {
      canonical: `${siteUrl}/${locale}/privacy`,
      languages: Object.fromEntries(locales.map(l => [l, `${siteUrl}/${l}/privacy`])),
    },
  };
}

// Icon configs for the 3 highlight cards
const highlightIcons = [
  { border: 'border-accent-green', bg: 'bg-accent-green/20', text: 'text-accent-green', d: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  { border: 'border-accent-blue', bg: 'bg-accent-blue/20', text: 'text-accent-blue', d: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
  { border: 'border-accent-purple', bg: 'bg-accent-purple/20', text: 'text-accent-purple', d: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' },
];

// Colors for section list items — cycles through these
const sectionItemColors = ['text-accent-green', 'text-accent-blue', 'text-accent-purple'];

function CheckIcon({ className }: { className: string }) {
  return (
    <svg className={`w-5 h-5 mt-0.5 flex-shrink-0 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function renderItems(items: string[], iconColor: string, isNegative?: boolean) {
  return (
    <ul className="text-gray-400 space-y-2">
      {items.map((item, j) => {
        // Parse **bold** markdown in items
        const parts = item.split(/\*\*(.*?)\*\*/);
        return (
          <li key={j} className="flex items-start gap-2">
            {isNegative ? <XIcon /> : <CheckIcon className={iconColor} />}
            <span>
              {parts.map((part, k) =>
                k % 2 === 1 ? <strong key={k} className="text-white">{part}</strong> : part
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const c = getContent(locale);

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <span className="text-accent-green font-medium text-sm uppercase tracking-wider">{c.hero.badge}</span>
          <h1 className="text-5xl font-bold mt-3 mb-6 text-white">
            {c.hero.title}<br />
            <span className="gradient-text">{c.hero.titleHighlight}</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">{c.hero.subtitle}</p>
        </div>
      </section>

      {/* Key Privacy Highlights */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {c.highlights.map((h, i) => {
              const ic = highlightIcons[i];
              return (
                <div key={i} className={`feature-card rounded-xl p-8 border-l-4 ${ic.border}`}>
                  <div className={`w-12 h-12 rounded-lg ${ic.bg} flex items-center justify-center mb-5`}>
                    <svg className={`w-6 h-6 ${ic.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={ic.d} />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-xl mb-3 text-white">{h.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{h.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Policy */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-12">
            {c.sections.map((section, i) => {
              const iconColor = sectionItemColors[i % sectionItemColors.length];
              // "What We Don't Do" section uses X icons
              const isNegativeSection = i === 4;

              return (
                <div key={i}>
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-accent-green/20 flex items-center justify-center text-accent-green text-sm font-bold">
                      {i + 1}
                    </span>
                    {section.heading}
                  </h2>
                  <div className="feature-card rounded-xl p-6">
                    {/* Contact section (last) */}
                    {!section.intro && !section.items && !section.subsections && (
                      <p className="text-gray-400 leading-relaxed">
                        {c.contactText}{' '}
                        <a href="mailto:privacy@bestairesumes.com" className="text-accent-green hover:underline">
                          privacy@bestairesumes.com
                        </a>
                      </p>
                    )}

                    {section.intro && (
                      <p className="text-gray-400 mb-4 leading-relaxed">{section.intro}</p>
                    )}

                    {/* Subsections (e.g. "Data Stored on Our Servers" + "Data Stored Locally") */}
                    {section.subsections?.map((sub, si) => (
                      <div key={si} className={si > 0 ? 'mt-6' : ''}>
                        <h3 className="font-semibold text-white mb-3">{sub.subheading}</h3>
                        {renderItems(sub.items, iconColor)}
                      </div>
                    ))}

                    {/* Simple items list */}
                    {section.items && renderItems(section.items, iconColor, isNegativeSection)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Last Updated */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm">{c.lastUpdated}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4 text-white">
            {c.cta.title}<br />
            <span className="gradient-text">{c.cta.titleHighlight}</span>
          </h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">{c.cta.subtitle}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={`/${locale}/auth/register`} className="inline-flex items-center gap-2 bg-accent-green text-bg-primary px-8 py-4 rounded-xl font-semibold hover:bg-accent-teal transition">
              {c.cta.primaryBtn}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href={`/${locale}/about`} className="inline-flex items-center gap-2 border border-gray-600 text-white px-8 py-4 rounded-xl font-semibold hover:border-accent-green transition">
              {c.cta.secondaryBtn}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

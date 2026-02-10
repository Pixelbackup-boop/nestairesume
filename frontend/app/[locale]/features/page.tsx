import { Metadata } from 'next';
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  FeaturesHero,
  FeaturesGrid,
  FeatureCard,
  StepsHeader,
  StepsGrid,
  FeaturesStep,
  FeaturesAnimatedLine,
  FeaturesCTA,
} from "@/components/FeaturesAnimations";
import { getContent } from '@/lib/content/features';
import { getLocalizedPath } from '@/lib/localized-paths';

const locales = ['en', 'es', 'fr', 'de', 'ar'] as const;
const BASE_URL = 'https://www.bestairesume.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = getContent(locale);
  return {
    title: c.meta.title,
    description: c.meta.description,
    keywords: c.meta.keywords,
    alternates: {
      canonical: `${BASE_URL}/${locale}/features`,
      languages: Object.fromEntries(
        locales.map(l => [l, `${BASE_URL}/${l}/features`])
      ),
    },
  };
}

// Icon configs for the 6 feature cards (paired by index with content)
const featureIcons = [
  { color: 'accent-purple', path: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { color: 'accent-blue', path: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z' },
  { color: 'accent-green', path: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { color: 'accent-pink', paths: ['M15 12a3 3 0 11-6 0 3 3 0 016 0z', 'M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'] },
  { color: 'red', path: 'M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { color: 'yellow', path: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
];

const iconBgClass = (color: string) => {
  const map: Record<string, string> = {
    'accent-purple': 'bg-accent-purple/20',
    'accent-blue': 'bg-accent-blue/20',
    'accent-green': 'bg-accent-green/20',
    'accent-pink': 'bg-accent-pink/20',
    'red': 'bg-red-500/20',
    'yellow': 'bg-yellow-500/20',
  };
  return map[color] ?? 'bg-gray-500/20';
};

const iconTextClass = (color: string) => {
  const map: Record<string, string> = {
    'accent-purple': 'text-accent-purple',
    'accent-blue': 'text-accent-blue',
    'accent-green': 'text-accent-green',
    'accent-pink': 'text-accent-pink',
    'red': 'text-red-400',
    'yellow': 'text-yellow-400',
  };
  return map[color] ?? 'text-gray-400';
};

const stepColors = ['gradient-text', 'text-accent-teal', 'text-accent-purple'];

export default async function FeaturesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const c = getContent(locale);
  const localizedHref = (path: string) => `/${locale}${getLocalizedPath(path, locale)}`;

  return (
    <>
      <Header />

      {/* Hero - Animated */}
      <section className="pt-32 pb-16">
        <FeaturesHero>
          <div className="max-w-6xl mx-auto px-6 text-center">
            <span className="text-accent-green font-medium text-sm uppercase tracking-wider">{c.hero.badge}</span>
            <h1 className="text-5xl font-bold mt-3 mb-6 text-white">
              {c.hero.title}<br />
              <span className="gradient-text">{c.hero.titleHighlight}</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              {c.hero.subtitle}
            </p>
          </div>
        </FeaturesHero>
      </section>

      {/* Main Features - Staggered Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <FeaturesGrid className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {c.features.map((feat, i) => (
              <FeatureCard key={i}>
                <div className="feature-card rounded-xl p-8">
                  <div className={`w-12 h-12 rounded-lg ${iconBgClass(featureIcons[i].color)} flex items-center justify-center mb-5`}>
                    <svg className={`w-6 h-6 ${iconTextClass(featureIcons[i].color)}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {'paths' in featureIcons[i] ? (
                        (featureIcons[i] as { paths: string[] }).paths.map((p, j) => (
                          <path key={j} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={p} />
                        ))
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={(featureIcons[i] as { path: string }).path} />
                      )}
                    </svg>
                  </div>
                  <h3 className="font-semibold text-xl mb-3 text-white">{feat.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feat.description}</p>
                </div>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </div>
      </section>

      {/* How It Works - Animated Steps */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <StepsHeader className="text-center mb-16">
            <span className="text-accent-green font-medium text-sm uppercase tracking-wider">{c.steps.badge}</span>
            <h2 className="text-4xl font-bold mt-3 text-white">
              {c.steps.title}<br />
              <span className="gradient-text">{c.steps.titleHighlight}</span>
            </h2>
          </StepsHeader>

          <StepsGrid className="grid md:grid-cols-3 gap-8 relative">
            <FeaturesAnimatedLine />
            {c.steps.items.map((step, i) => (
              <FeaturesStep key={i} className="text-center">
                <div className="step-circle w-40 h-40 mx-auto rounded-full flex items-center justify-center mb-6 relative">
                  <span className={`text-6xl font-bold ${stepColors[i]}`}>{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-white">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.description}</p>
              </FeaturesStep>
            ))}
          </StepsGrid>
        </div>
      </section>

      {/* CTA - Animated */}
      <section className="py-24">
        <FeaturesCTA>
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-4 text-white">
              {c.cta.title}<br />
              <span className="gradient-text">{c.cta.titleHighlight}</span>
            </h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">{c.cta.description}</p>
            <Link href={localizedHref('/auth/register')} className="inline-flex items-center gap-2 bg-accent-green text-bg-primary px-8 py-4 rounded-xl font-semibold hover:bg-accent-teal transition btn-lift">
              {c.cta.ctaText}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </FeaturesCTA>
      </section>

      {/* External Resources */}
      <section className="py-8 bg-gray-900 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-lg font-semibold text-gray-300 mb-3">{c.externalResources.title}</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {c.externalResources.items.map((res, i) => (
              <a key={i} href={res.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
                <span className="text-gray-500">↗</span>
                <span className="text-sm text-gray-400">{res.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

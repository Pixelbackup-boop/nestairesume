import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ResumeExamplesGrid from '@/components/ResumeExamplesGrid';
import { getAllResumeExamples, getAllDisplayCategories } from '@/lib/resume-examples/posts';
import { getContent } from '@/lib/content/resume-examples-index';
import { getLocalizedPath, getLocalizedUrl } from '@/lib/localized-paths';
import { hreflangAlternates } from '@/lib/hreflang';
import { isIndexableExampleLocale } from '@/i18n.config';

const BASE_URL = 'https://bestairesumes.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = getContent(locale);
  return {
    title: c.meta.title,
    description: c.meta.description,
    alternates: {
      canonical: getLocalizedUrl(BASE_URL, '/resume-examples', locale),
      languages: hreflangAlternates(BASE_URL, '/resume-examples'),
    },
    ...(isIndexableExampleLocale(locale) ? {} : { robots: { index: false, follow: true } }),
  };
}

export default async function ResumeExamplesIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const c = getContent(locale);
  const localizedHref = (path: string) => `/${locale}${getLocalizedPath(path, locale)}`;

  const [allExamples, categories] = await Promise.all([
    getAllResumeExamples(),
    getAllDisplayCategories(),
  ]);

  const examples = allExamples.map(e => ({
    slug: e.slug,
    jobTitle: e.jobTitle,
    displayCategory: e.displayCategory,
    avgSalary: e.avgSalary,
    keySkills: e.keySkills,
    description: e.description,
  }));

  const collectionSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: c.meta.title,
    description: c.meta.description,
    url: getLocalizedUrl(BASE_URL, '/resume-examples', locale),
    hasPart: {
      '@type': 'ItemList',
      numberOfItems: allExamples.length,
      itemListElement: allExamples.slice(0, 20).map((e, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: e.jobTitle,
        url: getLocalizedUrl(BASE_URL, `/resume-examples/${e.slug}`, locale),
      })),
    },
  });

  return (
    <>
      <script type="application/ld+json">{collectionSchema}</script>
      <Header />

      <section className="pt-32 pb-16 bg-gray-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-accent-blue font-semibold tracking-wider uppercase text-sm mb-2 block">
            {c.hero.badge}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mt-2 mb-6 text-gray-900">
            {c.hero.title}<br />
            <span className="text-accent-primary">{c.hero.titleHighlight}</span>
          </h1>
          <p className="text-lg text-gray-600 mb-4 max-w-2xl mx-auto">
            {c.hero.subtitle.replace('{count}', String(allExamples.length))}
          </p>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <ResumeExamplesGrid examples={examples} categories={categories} />

          <div className="mt-16 text-center p-8 bg-gray-50 rounded-2xl border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{c.bottomCta.title}</h3>
            <p className="text-gray-600 mb-6">{c.bottomCta.description}</p>
            <Link href={localizedHref('/onboarding')} className="inline-block bg-accent-green text-gray-900 px-6 py-3 rounded-xl font-bold hover:bg-accent-teal transition">
              {c.bottomCta.ctaText}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

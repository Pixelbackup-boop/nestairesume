import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getAllCoverLetterExamples, getAllDisplayCategories } from '@/lib/cover-letter-examples/posts';
import { getContent } from '@/lib/content/cover-letter-examples-index';
import { getLocalizedPath } from '@/lib/localized-paths';
import { locales } from '@/i18n.config';

const BASE_URL = 'https://www.bestairesume.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = getContent(locale);
  return {
    title: c.meta.title,
    description: c.meta.description,
    keywords: c.meta.keywords,
    alternates: {
      canonical: `${BASE_URL}/${locale}${getLocalizedPath('/cover-letter-examples', locale)}`,
      languages: Object.fromEntries(
        locales.map(l => [l, `${BASE_URL}/${l}${getLocalizedPath('/cover-letter-examples', l)}`])
      ),
    },
  };
}

const tipIcons = [
  'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
];

const relatedResourceHrefs = ['/resume-examples', '/blog/how-to-write-cover-letter', '/templates'];

export default async function CoverLetterExamplesIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const c = getContent(locale);
  const localizedHref = (path: string) => `/${locale}${getLocalizedPath(path, locale)}`;

  const [allExamples, categories] = await Promise.all([
    getAllCoverLetterExamples(),
    getAllDisplayCategories(),
  ]);

  const examplesByCategory = allExamples.reduce((acc, example) => {
    const cat = example.displayCategory;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(example);
    return acc;
  }, {} as Record<string, typeof allExamples>);

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-light-teal border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-accent-blue font-semibold tracking-wider uppercase text-sm mb-2 block">
            {c.hero.badge}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mt-2 mb-6 text-dark-teal">
            {c.hero.title}<br />
            <span className="text-teal-primary">{c.hero.titleHighlight}</span>
          </h1>
          <p className="text-lg text-dark-teal/70 mb-8 max-w-2xl mx-auto">
            {c.hero.subtitle.replace('{count}', String(allExamples.length))}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#examples" className="px-8 py-4 bg-white border border-gray-200 text-dark-teal font-semibold rounded-xl hover:bg-gray-50 transition shadow-sm">
              {c.hero.ctaBrowse}
            </a>
            <Link href={localizedHref('/tools/cover-letter')} className="px-8 py-4 bg-teal-primary text-white font-semibold rounded-xl hover:bg-teal-secondary transition shadow-lg shadow-teal-primary/30">
              {c.hero.ctaCreate}
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-teal-primary">{allExamples.length}+</div>
              <div className="text-sm text-dark-teal/60 mt-1">{c.stats.examples}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-teal-primary">{categories.length}</div>
              <div className="text-sm text-dark-teal/60 mt-1">{c.stats.industries}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-teal-primary">Free</div>
              <div className="text-sm text-dark-teal/60 mt-1">{c.stats.free}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Cover Letter Tips Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-dark-teal mb-6 text-center">{c.tips.title}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {c.tips.items.map((tip, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-teal-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-teal-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tipIcons[i]} />
                  </svg>
                </div>
                <h3 className="font-bold text-dark-teal mb-2">{tip.title}</h3>
                <p className="text-dark-teal/70 text-sm">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Examples Grid by Category */}
      <section id="examples" className="py-12 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-dark-teal mb-8">{c.grid.title}</h2>

          {categories.map(category => (
            examplesByCategory[category.name] && examplesByCategory[category.name].length > 0 && (
              <div key={category.name} className="mb-12">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-dark-teal">
                    {category.name}
                    <span className="ml-2 text-sm font-normal text-dark-teal/50">({category.count} {c.grid.examplesLabel})</span>
                  </h3>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {examplesByCategory[category.name].map(example => (
                    <Link
                      key={example.slug}
                      href={localizedHref(`/cover-letter-examples/${example.slug}`)}
                      className="group block bg-light-teal hover:bg-teal-primary/10 rounded-xl p-5 transition border border-gray-100 hover:border-teal-primary/20"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-dark-teal group-hover:text-teal-primary transition">
                            {example.jobTitle} {c.grid.coverLetterSuffix}
                          </h4>
                          <p className="text-sm text-dark-teal/60 mt-1 line-clamp-2">{example.description}</p>
                        </div>
                        <svg className="w-5 h-5 text-dark-teal/40 group-hover:text-teal-primary transition flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                      {example.keySkills.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {example.keySkills.slice(0, 3).map(skill => (
                            <span key={skill} className="text-xs px-2 py-1 bg-white rounded text-dark-teal/70">
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            )
          ))}

          {allExamples.length === 0 && (
            <div className="text-center py-16">
              <p className="text-dark-teal/70 mb-4">{c.grid.comingSoon}</p>
              <Link href={localizedHref('/tools/cover-letter')} className="inline-block bg-teal-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-teal-secondary transition">
                {c.grid.comingSoonCta}
              </Link>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="mt-16 text-center p-8 bg-light-teal rounded-2xl border border-teal-primary/20">
            <h3 className="text-xl font-bold text-dark-teal mb-2">{c.bottomCta.title}</h3>
            <p className="text-dark-teal/70 mb-6">{c.bottomCta.description}</p>
            <Link href={localizedHref('/tools/cover-letter')} className="inline-block bg-teal-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-teal-secondary transition">
              {c.bottomCta.ctaText}
            </Link>
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-12 bg-light-teal">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-xl font-bold text-dark-teal mb-6 text-center">{c.relatedResources.title}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {c.relatedResources.items.map((res, i) => (
              <Link key={i} href={localizedHref(relatedResourceHrefs[i])} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-center">
                <h3 className="font-bold text-dark-teal mb-2">{res.title}</h3>
                <p className="text-dark-teal/60 text-sm">{res.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

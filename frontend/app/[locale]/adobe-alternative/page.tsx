import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getContent } from '@/lib/content/adobe-alternative';
import { getLocalizedPath } from '@/lib/localized-paths';
import { locales } from '@/i18n.config';

const siteUrl = 'https://bestairesumes.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const c = getContent(locale);
const alternateLanguages: Record<string, string> = { 'x-default': `${siteUrl}/en/adobe-alternative` };
    locales.forEach((loc) => { alternateLanguages[loc] = `${siteUrl}/${loc}/adobe-alternative`; });

    return {
        title: c.meta.title,
        description: c.meta.description,
        keywords: c.meta.keywords,
        openGraph: { title: c.meta.title, description: c.meta.description, type: 'article', url: `${siteUrl}/${locale}/adobe-alternative` },
        twitter: { card: 'summary_large_image', title: c.meta.title, description: c.meta.description },
        alternates: { canonical: `${siteUrl}/${locale}/adobe-alternative`, languages: alternateLanguages },
    };
}

/* SAFE: hero.subtitle and problem.description contain only hardcoded HTML from our own content files (no user input). The <strong> tags are static content authored by us. */
export default async function AdobeAlternativePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const c = getContent(locale);
    const localizedHref = (path: string) => `/${locale}${getLocalizedPath(path, locale)}`;

    const breadcrumbSchema = {
        '@context': 'https://schema.org', '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
            { '@type': 'ListItem', position: 2, name: c.schemas.breadcrumbName },
        ],
    };
    const faqSchema = {
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: c.faq.items.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })),
    };
    const articleSchema = {
        '@context': 'https://schema.org', '@type': 'Article',
        headline: c.schemas.articleHeadline, description: c.schemas.articleDescription,
        datePublished: '2026-01-26', dateModified: '2026-01-26',
        author: { '@type': 'Person', name: 'Alex Brown', url: `${siteUrl}/about/alex-brown`, jobTitle: 'Senior HR & Resume Strategist' },
        publisher: { '@type': 'Organization', name: 'Best AI Resume', url: siteUrl, logo: { '@type': 'ImageObject', url: `${siteUrl}/logo.png` } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}/adobe-alternative` },
    };

    // SAFE: These render hardcoded content strings from our own content files — no user input involved
    const heroSubtitleHtml = { __html: c.hero.subtitle };
    const problemDescHtml = { __html: c.problem.description };

    return (
        <>
            <Header />
            <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
            <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
            <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>

            {/* Hero */}
            <section className="pt-32 pb-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <span className="text-accent-teal font-semibold tracking-wider uppercase text-sm">{c.hero.badge}</span>
                    <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6 text-gray-900">
                        {c.hero.title}<br />
                        <span className="text-accent-teal">{c.hero.titleHighlight}</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
                       dangerouslySetInnerHTML={heroSubtitleHtml} />
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href={localizedHref('/onboarding')} className="px-8 py-4 bg-accent-teal text-white font-semibold rounded-xl hover:opacity-90 transition shadow-lg shadow-teal-500/30">{c.hero.ctaPrimary}</Link>
                        <a href="#comparison" className="px-8 py-4 bg-white border border-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition shadow-sm">{c.hero.ctaSecondary}</a>
                    </div>
                </div>
            </section>

            {/* Problem */}
            <section className="py-16 bg-white border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="bg-teal-50 border border-teal-200 rounded-2xl p-8 md:p-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{c.problem.title}</h2>
                        <p className="text-gray-700 mb-6 leading-relaxed"
                           dangerouslySetInnerHTML={problemDescHtml} />
                        <div className="grid md:grid-cols-3 gap-4">
                            {c.problem.stats.map((stat, i) => (
                                <div key={i} className="bg-white rounded-xl p-5 border border-teal-100">
                                    <div className={`text-3xl font-bold mb-1 ${i === c.problem.stats.length - 1 ? 'text-accent-green' : 'text-teal-600'}`}>{stat.value}</div>
                                    <p className="text-sm text-gray-600">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section id="comparison" className="py-16 bg-gray-50">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">{c.comparison.title}</h2>
                        <p className="text-gray-400">{c.comparison.subtitle}</p>
                    </div>
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-white border-b border-gray-100">
                                    <th className="text-left p-4 font-semibold text-gray-900">Feature</th>
                                    <th className="text-center p-4 font-semibold text-gray-400">{c.comparison.competitorName}</th>
                                    <th className="text-center p-4 font-semibold text-accent-teal">{c.comparison.oursName}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {c.comparison.rows.map((row, i) => (
                                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                                        <td className="p-4 font-medium text-gray-900 border-b border-gray-100">{row.feature}</td>
                                        <td className="p-4 text-center text-sm text-gray-600 border-b border-gray-100">{row.competitor}</td>
                                        <td className="p-4 text-center text-sm text-gray-800 font-medium border-b border-gray-100">{row.ours}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="md:hidden space-y-4">
                        {c.comparison.rows.map((row, i) => (
                            <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                                <h3 className="font-semibold text-gray-900 mb-3">{row.feature}</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between items-start gap-2">
                                        <span className="text-gray-500 shrink-0">{c.comparison.competitorName}:</span>
                                        <span className="text-gray-600 text-right">{row.competitor}</span>
                                    </div>
                                    <div className="flex justify-between items-start gap-2">
                                        <span className="text-accent-teal font-medium shrink-0">{c.comparison.oursName}:</span>
                                        <span className="text-gray-800 font-medium text-right">{row.ours}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Switch */}
            <section className="py-16 bg-white">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">{c.whySwitch.title}</h2>
                        <p className="text-gray-400">{c.whySwitch.subtitle}</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {c.whySwitch.reasons.map((reason, i) => (
                            <div key={i} className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                                <h3 className="font-bold text-xl mb-3 text-gray-900">{reason.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{reason.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Recommendation */}
            <section className="py-16 bg-white border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{c.recommendation.title}</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-2xl p-8 border border-gray-100">
                            <h3 className="font-bold text-lg text-gray-900 mb-4">{c.recommendation.useCompetitor.title}</h3>
                            <ul className="space-y-3 text-gray-600">
                                {c.recommendation.useCompetitor.items.map((item, i) => (
                                    <li key={i} className="flex gap-3"><span className="text-gray-500 mt-0.5">&bull;</span>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-teal-50 rounded-2xl p-8 border border-teal-200">
                            <h3 className="font-bold text-lg text-gray-900 mb-4">{c.recommendation.useUs.title}</h3>
                            <ul className="space-y-3 text-gray-700">
                                {c.recommendation.useUs.items.map((item, i) => (
                                    <li key={i} className="flex gap-3"><span className="text-accent-teal mt-0.5">&#10003;</span>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    {c.recommendation.bottomLine && (
                        <p className="text-center text-gray-400 mt-8 text-sm"><strong>{c.recommendation.bottomLine}</strong></p>
                    )}
                </div>
            </section>

            {/* Resume Examples CTA */}
            <section className="py-16 bg-gray-50 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{c.resumeExamples.title}</h2>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">{c.resumeExamples.description}</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href={localizedHref('/resume-examples')} className="px-6 py-3 bg-gray-50 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition">{c.resumeExamples.ctaBrowse}</Link>
                        <Link href={localizedHref('/templates')} className="px-6 py-3 bg-gray-50 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition">{c.resumeExamples.ctaTemplates}</Link>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16 bg-white border-t border-gray-100">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{c.faq.title}</h2>
                    <div className="space-y-4">
                        {c.faq.items.map((item, i) => (
                            <details key={i} className="bg-white rounded-xl border border-gray-100 group">
                                <summary className="p-5 font-medium text-gray-900 cursor-pointer hover:text-accent-teal transition list-none flex items-center justify-between">
                                    {item.question}
                                    <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </summary>
                                <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">{item.answer}</div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* Cross-Links */}
            <section className="py-12 bg-gray-50 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{c.crossLinks.title}</h3>
                    <div className="grid sm:grid-cols-4 gap-3 mb-8">
                        {c.crossLinks.items.map((item, i) => (
                            <Link key={i} href={localizedHref(item.href)} className="p-4 bg-white rounded-xl hover:bg-gray-50 transition text-center">
                                <p className="font-medium text-gray-900">{item.title}</p>
                                <p className="text-xs text-gray-400 mt-1">{item.subtitle}</p>
                            </Link>
                        ))}
                    </div>
                    {c.crossLinks.guides.length > 0 && (
                        <>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">{c.crossLinks.guidesTitle}</h3>
                            <div className="grid sm:grid-cols-2 gap-3">
                                {c.crossLinks.guides.map((guide, i) => (
                                    <Link key={i} href={localizedHref(guide.href)} className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition">
                                        <span className="text-accent-teal">&rarr;</span>
                                        <span className="text-sm text-gray-700">{guide.label}</span>
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* External Resources */}
            <section className="py-8 bg-gray-50 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{c.externalResources.title}</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                        {c.externalResources.items.map((item, i) => (
                            <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition border border-gray-100">
                                <span className="text-gray-400">&nearr;</span>
                                <span className="text-sm text-gray-700">{item.label}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{c.bottomCta.title}</h2>
                    <p className="text-gray-600 mb-8 text-lg">{c.bottomCta.description}</p>
                    <Link href={localizedHref('/onboarding')} className="inline-block px-10 py-4 bg-accent-teal text-white font-semibold rounded-xl hover:opacity-90 transition shadow-lg shadow-teal-500/30 text-lg">{c.bottomCta.cta}</Link>
                    <p className="text-gray-600 mt-4 text-sm">{c.bottomCta.subtext}</p>
                </div>
            </section>

            <Footer />
        </>
    );
}

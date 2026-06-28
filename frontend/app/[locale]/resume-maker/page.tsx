import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getContent } from '@/lib/content/resume-maker';
import { getLocalizedPath, getLocalizedUrl } from '@/lib/localized-paths';
import { hreflangAlternates } from '@/lib/hreflang';

const siteUrl = 'https://bestairesumes.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const c = getContent(locale);
    const alternateLanguages = hreflangAlternates(siteUrl, '/resume-maker');

    return {
        title: c.meta.title,
        description: c.meta.description,
        keywords: c.meta.keywords,
        openGraph: { title: c.meta.title, description: c.meta.description, type: 'article', url: getLocalizedUrl(siteUrl, '/resume-maker', locale) },
        twitter: { card: 'summary_large_image', title: c.meta.title, description: c.meta.description },
        alternates: { canonical: getLocalizedUrl(siteUrl, '/resume-maker', locale), languages: alternateLanguages },
    };
}

/* SAFE: hero.subtitle and features.subtitle contain only hardcoded HTML from our own content files (no user input). The <strong> and <a> tags are static content authored by us. */
export default async function ResumeMakerPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const c = getContent(locale);
    const localizedHref = (path: string) => locale === 'en' ? getLocalizedPath(path, locale) : `/${locale}${getLocalizedPath(path, locale)}`;

    const breadcrumbSchema = {
        '@context': 'https://schema.org', '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: getLocalizedUrl(siteUrl, '', locale) },
            { '@type': 'ListItem', position: 2, name: c.schemas.breadcrumbName },
        ],
    };
    const faqSchema = {
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: c.faq.items.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })),
    };
    const softwareAppSchema = {
        '@context': 'https://schema.org', '@type': 'SoftwareApplication',
        name: c.schemas.softwareAppName || c.schemas.articleHeadline,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web Browser',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', ratingCount: '2847' },
    };
    const articleSchema = {
        '@context': 'https://schema.org', '@type': 'Article',
        headline: c.schemas.articleHeadline, description: c.schemas.articleDescription,
        datePublished: '2026-01-28', dateModified: '2026-01-28',
        author: { '@type': 'Person', name: 'Sarah Chen', url: getLocalizedUrl(siteUrl, '/about/sarah-chen', locale), jobTitle: 'Career Coach & Resume Expert' },
        publisher: { '@type': 'Organization', name: 'Best AI Resume', url: siteUrl, logo: { '@type': 'ImageObject', url: `${siteUrl}/logo.png` } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': getLocalizedUrl(siteUrl, '/resume-maker', locale) },
    };

    // SAFE: These render hardcoded content strings from our own content files — no user input involved
    const heroSubtitleHtml = { __html: c.hero.subtitle };
    const featuresSubtitleHtml = { __html: c.features.subtitle };

    return (
        <>
            <Header />
            <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
            <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
            <script type="application/ld+json">{JSON.stringify(softwareAppSchema)}</script>
            <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>

            {/* Hero */}
            <section className="pt-32 pb-20 bg-gradient-to-b from-blue-50 to-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <span className="inline-block px-4 py-1.5 bg-accent-blue/10 text-accent-blue font-semibold rounded-full text-sm mb-6">
                        {c.hero.badge}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">
                        {c.hero.title}<br />
                        <span className="text-accent-blue">{c.hero.titleHighlight}</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
                       dangerouslySetInnerHTML={heroSubtitleHtml} />
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                        <Link href={localizedHref('/canvas-templates')} className="px-8 py-4 bg-accent-green text-white font-semibold rounded-xl hover:bg-green-600 transition shadow-lg shadow-green-500/30 text-lg">
                            Build Free Resume
                        </Link>
                        <Link href={localizedHref('/templates')} className="px-8 py-4 border-2 border-blue-500 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition text-lg">
                            Build Premium Resume
                        </Link>
                    </div>
                    {c.hero.trustBadges && (
                        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
                            {c.hero.trustBadges.map((badge, i) => (
                                <span key={i} className="flex items-center gap-1.5">
                                    <svg className="w-4 h-4 text-accent-blue" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                    {badge}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Trust / Social Proof */}
            {c.trust && (
                <section className="py-8 bg-white border-b border-gray-100">
                    <div className="max-w-4xl mx-auto px-6">
                        <div className="flex flex-wrap justify-center items-center gap-8 text-center">
                            {c.trust.stats.map((stat, i) => (
                                <div key={i} className="flex items-center gap-8">
                                    <div>
                                        <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                                        <div className="text-sm text-gray-500">{stat.label}</div>
                                    </div>
                                    {i < c.trust!.stats.length - 1 && (
                                        <div className="w-px h-10 bg-gray-200 hidden sm:block" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* How It Works */}
            <section className="py-20 bg-white">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">{c.howItWorks.title}</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">{c.howItWorks.subtitle}</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {c.howItWorks.steps.map((item) => (
                            <div key={item.step} className="text-center">
                                <div className="w-14 h-14 rounded-full bg-accent-blue text-white font-bold text-xl flex items-center justify-center mx-auto mb-5">
                                    {item.step}
                                </div>
                                <h3 className="font-bold text-xl mb-3 text-gray-900">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <Link href={localizedHref('/onboarding')} className="inline-block px-8 py-4 bg-accent-blue text-white font-semibold rounded-xl hover:bg-blue-600 transition">
                            {c.howItWorks.cta}
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">{c.features.title}</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto"
                           dangerouslySetInnerHTML={featuresSubtitleHtml} />
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {c.features.items.map((item, i) => (
                            <div key={i} className="bg-white rounded-2xl p-7 border border-gray-100">
                                <div className="flex items-center gap-2 mb-3">
                                    <svg className="w-5 h-5 text-accent-blue" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <h3 className="font-bold text-lg text-gray-900">{item.feature}</h3>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed pl-7">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison */}
            {c.comparison && (
                <section className="py-20 bg-white">
                    <div className="max-w-5xl mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">{c.comparison.title}</h2>
                            <p className="text-gray-600">{c.comparison.subtitle}</p>
                        </div>
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        <th className="text-left p-4 font-semibold text-gray-900">Feature</th>
                                        <th className="text-center p-4 font-semibold text-accent-blue">{c.comparison.oursName}</th>
                                        <th className="text-center p-4 font-semibold text-gray-400">{c.comparison.othersName}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {c.comparison.rows.map((row, i) => (
                                        <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                                            <td className="p-4 font-medium text-gray-900 border-b border-gray-100">{row.feature}</td>
                                            <td className="p-4 text-center text-sm text-green-600 font-medium border-b border-gray-100">{row.ours}</td>
                                            <td className="p-4 text-center text-sm text-gray-500 border-b border-gray-100">{row.others}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="md:hidden space-y-4">
                            {c.comparison.rows.map((row, i) => (
                                <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                    <h3 className="font-semibold text-gray-900 mb-3">{row.feature}</h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-accent-blue font-medium">{c.comparison!.oursName}:</span>
                                            <span className="text-green-600 font-medium">{row.ours}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">{c.comparison!.othersName}:</span>
                                            <span className="text-gray-500">{row.others}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Templates */}
            {c.templates && (
                <section className="py-20 bg-gray-50">
                    <div className="max-w-5xl mx-auto px-6 text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">{c.templates.title}</h2>
                        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">{c.templates.subtitle}</p>
                        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                            {c.templates.styles.map((style) => (
                                <div key={style} className="p-4 bg-white rounded-xl border border-gray-100 hover:border-accent-blue/30 hover:shadow-md transition">
                                    <p className="font-medium text-gray-900">{style}</p>
                                    <p className="text-xs text-accent-blue mt-1">Free</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href={localizedHref('/templates')} className="px-6 py-3 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition">
                                {c.templates.cta}
                            </Link>
                            <Link href={localizedHref('/resume-examples')} className="px-6 py-3 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition">
                                {c.features.cta}
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* FAQ */}
            <section className="py-20 bg-white">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">{c.faq.title}</h2>
                    <div className="space-y-4">
                        {c.faq.items.map((item, i) => (
                            <details key={i} className="bg-gray-50 rounded-xl border border-gray-100 group">
                                <summary className="p-5 font-medium text-gray-900 cursor-pointer hover:text-accent-blue transition list-none flex items-center justify-between">
                                    {item.question}
                                    <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
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
                    <div className="grid sm:grid-cols-3 gap-3 mb-8">
                        {c.crossLinks.items.map((item, i) => (
                            <Link key={i} href={localizedHref(item.href)} className="p-4 bg-white rounded-xl hover:bg-gray-50 transition text-center border border-gray-100">
                                <p className="font-medium text-gray-900">{item.title}</p>
                                <p className="text-xs text-gray-500 mt-1">{item.subtitle}</p>
                            </Link>
                        ))}
                    </div>
                    {c.crossLinks.guides.length > 0 && (
                        <>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">{c.crossLinks.guidesTitle}</h3>
                            <div className="grid sm:grid-cols-2 gap-3">
                                {c.crossLinks.guides.map((guide, i) => (
                                    <Link key={i} href={localizedHref(guide.href)} className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition border border-gray-100">
                                        <span className="text-accent-blue">&rarr;</span>
                                        <span className="text-sm text-gray-700">{guide.label}</span>
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-20 bg-gradient-to-b from-white to-blue-50">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{c.bottomCta.title}</h2>
                    <p className="text-gray-600 mb-8 text-lg">{c.bottomCta.description}</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href={localizedHref('/canvas-templates')} className="px-10 py-4 bg-accent-green text-white font-semibold rounded-xl hover:bg-green-600 transition shadow-lg shadow-green-500/30 text-lg">
                            Try Free Canvas Templates
                        </Link>
                        <Link href={localizedHref('/onboarding')} className="px-10 py-4 border-2 border-blue-500 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition text-lg">
                            Build Premium Resume
                        </Link>
                    </div>
                    <p className="text-gray-500 mt-4 text-sm">{c.bottomCta.subtext}</p>
                </div>
            </section>

            <Footer />
        </>
    );
}

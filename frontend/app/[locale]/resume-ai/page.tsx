import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getContent } from '@/lib/content/resume-ai';
import { getLocalizedPath, getLocalizedUrl } from '@/lib/localized-paths';
import { locales, isIndexableLocale } from '@/i18n.config';

const siteUrl = 'https://bestairesumes.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const c = getContent(locale);

const alternateLanguages: Record<string, string> = {
        'x-default': getLocalizedUrl(siteUrl, '/resume-ai', 'en'),
    };
    locales.forEach((loc) => {
      if (!isIndexableLocale(loc)) return; // only indexable locales in hreflang
        alternateLanguages[loc] = getLocalizedUrl(siteUrl, '/resume-ai', loc);
    });

    return {
        title: c.meta.title,
        description: c.meta.description,
        keywords: c.meta.keywords,
        openGraph: {
            title: c.meta.title,
            description: c.meta.description,
            type: 'article',
            url: getLocalizedUrl(siteUrl, '/resume-ai', locale),
        },
        twitter: {
            card: 'summary_large_image',
            title: c.meta.title,
            description: c.meta.description,
        },
        alternates: {
            canonical: getLocalizedUrl(siteUrl, '/resume-ai', locale),
            languages: alternateLanguages,
        },
    };
}

// SVG icon components — static, no content dependency
function IconPen() {
    return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
    );
}
function IconSearch() {
    return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    );
}
function IconChart() {
    return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
    );
}
function IconTrend() {
    return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
    );
}
function IconLayout() {
    return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
    );
}
function IconCheck() {
    return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
}

const featureIcons = [IconPen, IconSearch, IconChart, IconTrend, IconLayout, IconCheck];

export default async function ResumeAIPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const c = getContent(locale);
    const localizedHref = (path: string) => locale === 'en' ? getLocalizedPath(path, locale) : `/${locale}${getLocalizedPath(path, locale)}`;

    // Build schemas from localized content
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: getLocalizedUrl(siteUrl, '', locale) },
            { '@type': 'ListItem', position: 2, name: c.schemas.breadcrumbName },
        ],
    };

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: c.faq.items.map(item => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
    };

    const softwareAppSchema = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: c.schemas.softwareAppName,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web Browser',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', ratingCount: '3156' },
    };

    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: c.schemas.articleHeadline,
        description: c.schemas.articleDescription,
        datePublished: '2026-01-28',
        dateModified: '2026-01-28',
        author: {
            '@type': 'Person',
            name: 'Michael Torres',
            url: getLocalizedUrl(siteUrl, '/about/michael-torres', locale),
            jobTitle: 'AI Technology & Career Expert',
        },
        publisher: {
            '@type': 'Organization',
            name: 'Best AI Resume',
            url: siteUrl,
            logo: { '@type': 'ImageObject', url: `${siteUrl}/logo.png` },
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': getLocalizedUrl(siteUrl, '/resume-ai', locale) },
    };

    // SAFE: hardcoded content strings from the content file, no user input
    const heroSubtitleHtml = { __html: c.hero.subtitle };
    const whatIsDescHtml = { __html: c.whatIs.description };
    const bottomCtaDescHtml = { __html: c.bottomCta.description };

    return (
        <>
            <Header />

            {/* Schema markup */}
            <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
            <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
            <script type="application/ld+json">{JSON.stringify(softwareAppSchema)}</script>
            <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-gradient-to-b from-purple-50 to-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-700 font-semibold rounded-full text-sm mb-6">
                        {c.hero.badge}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">
                        {c.hero.title}<br />
                        <span className="text-purple-600">{c.hero.titleHighlight}</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed" dangerouslySetInnerHTML={heroSubtitleHtml} />
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                        <Link href={localizedHref('/canvas-templates')} className="px-8 py-4 bg-accent-green text-white font-semibold rounded-xl hover:bg-green-600 transition shadow-lg shadow-green-500/30 text-lg">
                            Build Free Resume
                        </Link>
                        <Link href={localizedHref('/templates')} className="px-8 py-4 border-2 border-purple-500 text-purple-600 font-semibold rounded-xl hover:bg-purple-50 transition text-lg">
                            Build Premium Resume
                        </Link>
                    </div>
                    <p className="text-sm text-gray-500">{c.hero.trustText}</p>
                </div>
            </section>

            {/* What is Resume AI */}
            <section className="py-16 bg-white border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 md:p-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{c.whatIs.title}</h2>
                        <p className="text-gray-700 leading-relaxed mb-6" dangerouslySetInnerHTML={whatIsDescHtml} />
                        <div className="grid md:grid-cols-3 gap-4">
                            {c.whatIs.stats.map((stat, i) => (
                                <div key={i} className="bg-white rounded-xl p-5 border border-purple-100">
                                    <div className="text-3xl font-bold text-purple-600 mb-1">{stat.value}</div>
                                    <p className="text-sm text-gray-600">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* AI Features Grid */}
            <section id="how-it-works" className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">{c.features.title}</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">{c.features.subtitle}</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {c.features.items.map((feature, i) => {
                            const Icon = featureIcons[i] ?? featureIcons[0];
                            return (
                                <div key={i} className="bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-lg transition">
                                    <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-5">
                                        <Icon />
                                    </div>
                                    <h3 className="font-bold text-lg mb-2 text-gray-900">{feature.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Before/After Examples */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">{c.beforeAfter.title}</h2>
                        <p className="text-gray-600">{c.beforeAfter.subtitle}</p>
                    </div>

                    <div className="space-y-6">
                        {c.beforeAfter.items.map((item, i) => (
                            <div key={i} className="grid md:grid-cols-2 gap-4">
                                <div className="bg-red-50 rounded-xl p-6 border border-red-100">
                                    <div className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-2">{c.beforeAfter.beforeLabel}</div>
                                    <p className="text-gray-700 italic">&quot;{item.before}&quot;</p>
                                </div>
                                <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                                    <div className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-2">{c.beforeAfter.afterLabel}</div>
                                    <p className="text-gray-700">&quot;{item.after}&quot;</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-10">
                        <Link href={localizedHref('/onboarding')} className="inline-block px-8 py-4 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition">
                            {c.beforeAfter.cta}
                        </Link>
                    </div>
                </div>
            </section>

            {/* AI vs Manual Comparison */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">{c.comparison.title}</h2>
                        <p className="text-gray-600">{c.comparison.subtitle}</p>
                    </div>

                    {/* Desktop: Table view */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-white border-b border-gray-200">
                                    <th className="text-left p-4 font-semibold text-gray-900">Aspect</th>
                                    <th className="text-center p-4 font-semibold text-purple-600">{c.comparison.oursName}</th>
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

                    {/* Mobile: Card view */}
                    <div className="md:hidden space-y-4">
                        {c.comparison.rows.map((row, i) => (
                            <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                <h3 className="font-semibold text-gray-900 mb-3">{row.feature}</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-purple-600 font-medium">{c.comparison.oursName}:</span>
                                        <span className="text-green-600 font-medium">{row.ours}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">{c.comparison.othersName}:</span>
                                        <span className="text-gray-500">{row.others}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Use Cases */}
            <section className="py-20 bg-white">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">{c.useCases.title}</h2>
                        <p className="text-gray-600">{c.useCases.subtitle}</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {c.useCases.items.map((item, i) => (
                            <div key={i} className="bg-purple-50 rounded-xl p-6 text-center">
                                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">{c.faq.title}</h2>
                    <div className="space-y-4">
                        {c.faq.items.map((item, i) => (
                            <details key={i} className="bg-white rounded-xl border border-gray-100 group">
                                <summary className="p-5 font-medium text-gray-900 cursor-pointer hover:text-purple-600 transition list-none flex items-center justify-between">
                                    {item.question}
                                    <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </summary>
                                <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                                    {item.answer}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* Cross-Links */}
            <section className="py-12 bg-white border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{c.crossLinks.title}</h3>
                    <div className="grid sm:grid-cols-3 gap-3 mb-8">
                        {c.crossLinks.items.map((link, i) => (
                            <Link key={i} href={localizedHref(link.href)} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition text-center border border-gray-100">
                                <p className="font-medium text-gray-900">{link.title}</p>
                                <p className="text-xs text-gray-500 mt-1">{link.subtitle}</p>
                            </Link>
                        ))}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{c.crossLinks.guidesTitle}</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                        {c.crossLinks.guides.map((guide, i) => (
                            <Link key={i} href={localizedHref(guide.href)} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition border border-gray-100">
                                <span className="text-purple-600">→</span>
                                <span className="text-sm text-gray-700">{guide.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-20 bg-gradient-to-b from-gray-50 to-purple-50">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{c.bottomCta.title}</h2>
                    <p className="text-gray-600 mb-8 text-lg" dangerouslySetInnerHTML={bottomCtaDescHtml} />
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href={localizedHref('/canvas-templates')} className="px-10 py-4 bg-accent-green text-white font-semibold rounded-xl hover:bg-green-600 transition shadow-lg shadow-green-500/30 text-lg">
                            Try Free Canvas Templates
                        </Link>
                        <Link href={localizedHref('/onboarding')} className="px-10 py-4 border-2 border-purple-500 text-purple-600 font-semibold rounded-xl hover:bg-purple-50 transition text-lg">
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

import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getContent } from '@/lib/content/biodata-format';
import { getLocalizedPath } from '@/lib/localized-paths';

const siteUrl = 'https://bestairesumes.com';

// ── Color lookup maps ────────────────────────────────────────────────
const structureColorMap: Record<string, { border: string; bg: string; title: string; detail: string }> = {
    orange: { border: 'border-orange-200', bg: 'bg-orange-50', title: 'text-orange-700', detail: 'text-orange-600' },
    blue: { border: 'border-blue-200', bg: 'bg-blue-50', title: 'text-blue-700', detail: 'text-blue-600' },
    default: { border: 'border-gray-200', bg: 'bg-gray-50', title: 'text-gray-700', detail: 'text-gray-500' },
    dark: { border: 'border-gray-300', bg: 'bg-gray-100', title: 'text-gray-600', detail: 'text-gray-500' },
};

const regionBorderColors = ['border-orange-500', 'border-green-500', 'border-blue-500', 'border-teal-primary'];

const templateCardColors: Record<string, { gradient: string; btnBg: string; btnHover: string; iconBg: string }> = {
    blue: { gradient: 'from-blue-50 to-blue-100', btnBg: 'bg-blue-500', btnHover: 'hover:bg-blue-600', iconBg: 'bg-blue-500' },
    orange: { gradient: 'from-orange-50 to-orange-100', btnBg: 'bg-orange-500', btnHover: 'hover:bg-orange-600', iconBg: 'bg-orange-500' },
};

// ── Metadata ─────────────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const c = getContent(locale);

    const locales = ['en', 'es', 'fr', 'de', 'ar'];
    const alternateLanguages: Record<string, string> = {
        'x-default': `${siteUrl}/en/biodata-format`,
    };
    locales.forEach((loc) => {
        alternateLanguages[loc] = `${siteUrl}/${loc}/biodata-format`;
    });

    return {
        title: c.meta.title,
        description: c.meta.description,
        keywords: c.meta.keywords,
        openGraph: {
            title: c.meta.title,
            description: c.meta.description,
            type: 'article',
            url: `${siteUrl}/${locale}/biodata-format`,
        },
        twitter: {
            card: 'summary_large_image',
            title: c.meta.title,
            description: c.meta.description,
        },
        alternates: {
            canonical: `${siteUrl}/${locale}/biodata-format`,
            languages: alternateLanguages,
        },
    };
}

// ── Page ──────────────────────────────────────────────────────────────
export default async function BiodataFormatPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const c = getContent(locale);
    const localizedHref = (path: string) => `/${locale}${getLocalizedPath(path, locale)}`;

    // SAFE: hardcoded content strings from the content file, no user input
    const heroSubtitleHtml = { __html: c.hero.subtitle };
    const whatIsParagraphsHtml = c.whatIs.paragraphs.map((p) => ({ __html: p }));

    // ── Schema markup ────────────────────────────────────────────────
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
            { '@type': 'ListItem', position: 2, name: c.schemas.breadcrumbName },
        ],
    };

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: c.faq.items.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
    };

    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: c.schemas.articleHeadline,
        description: c.schemas.articleDescription,
        author: { '@type': 'Organization', name: 'Best AI Resume', url: siteUrl },
        datePublished: '2026-01-28',
        dateModified: '2026-01-28',
    };

    return (
        <>
            <Header />
            <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
            <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
            <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>

            {/* Hero */}
            <section className="pt-32 pb-16 bg-gradient-to-b from-orange-50 to-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <span className="text-orange-600 font-semibold tracking-wider uppercase text-sm">{c.hero.badge}</span>
                    <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6 text-gray-900">
                        {c.hero.title}<br />
                        <span className="text-orange-500">{c.hero.titleHighlight}</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed" dangerouslySetInnerHTML={heroSubtitleHtml} />
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="#templates" className="px-8 py-4 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition shadow-sm">
                            {c.hero.ctaTemplates}
                        </a>
                        <Link href={localizedHref('/onboarding')} className="px-8 py-4 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition shadow-lg shadow-orange-500/30">
                            {c.hero.ctaBuild}
                        </Link>
                    </div>
                </div>
            </section>

            {/* What is Biodata */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">{c.whatIs.title}</h2>
                    {whatIsParagraphsHtml.map((html, i) => (
                        <p key={i} className="text-lg text-gray-700 leading-relaxed mb-6" dangerouslySetInnerHTML={html} />
                    ))}
                    <div className="bg-orange-50 border-l-4 border-orange-500 p-6 my-8 rounded-r-lg">
                        <h4 className="font-bold text-orange-900 mb-2">{c.whatIs.insightTitle}</h4>
                        <p className="text-orange-800">{c.whatIs.insightText}</p>
                    </div>
                </div>
            </section>

            {/* Biodata vs Resume vs CV */}
            <section id="comparison" className="py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">{c.vsComparison.title}</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">{c.vsComparison.subtitle}</p>
                    </div>

                    {/* Desktop table */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full border-collapse bg-white rounded-xl shadow-sm">
                            <thead>
                                <tr className="bg-gray-100 border-b border-gray-200">
                                    <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">{c.vsComparison.headers.aspect}</th>
                                    <th className="p-4 text-left text-sm font-semibold text-orange-600 uppercase tracking-wider">{c.vsComparison.headers.biodata}</th>
                                    <th className="p-4 text-left text-sm font-semibold text-blue-600 uppercase tracking-wider">{c.vsComparison.headers.resume}</th>
                                    <th className="p-4 text-left text-sm font-semibold text-teal-primary uppercase tracking-wider">{c.vsComparison.headers.cv}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {c.vsComparison.rows.map((row, i) => (
                                    <tr key={row.aspect} className={i % 2 === 1 ? 'bg-gray-50/50' : ''}>
                                        <td className="p-4 font-medium text-gray-900">{row.aspect}</td>
                                        <td className="p-4 text-gray-700">
                                            {row.biodataHighlight === 'green' ? (
                                                <><span className="text-green-600 font-medium">{row.biodata.split('(')[0].trim()}</span><br /><span className="text-sm text-gray-500">({row.biodata.split('(')[1]}</span></>
                                            ) : row.biodata}
                                        </td>
                                        <td className="p-4 text-gray-700">
                                            {row.biodataHighlight === 'green' ? (
                                                <><span className="text-amber-600 font-medium">{row.resume.split('(')[0].trim()}</span><br /><span className="text-sm text-gray-500">({row.resume.split('(')[1]}</span></>
                                            ) : row.resume}
                                        </td>
                                        <td className="p-4 text-gray-700">
                                            {row.biodataHighlight === 'green' ? (
                                                <><span className="text-amber-600 font-medium">{row.cv.split('(')[0].trim()}</span><br /><span className="text-sm text-gray-500">({row.cv.split('(')[1]}</span></>
                                            ) : row.cv}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile cards */}
                    <div className="md:hidden space-y-4">
                        {c.vsComparison.rows.map((row) => (
                            <div key={row.aspect} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                <h3 className="font-semibold text-gray-900 mb-3">{row.aspect}</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-start gap-2">
                                        <span className="text-orange-600 font-medium shrink-0 w-16">{c.vsComparison.headers.biodata}:</span>
                                        <span className={row.biodataHighlight === 'green' ? 'text-green-600 font-medium' : 'text-gray-700'}>{row.biodata}</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-blue-600 font-medium shrink-0 w-16">{c.vsComparison.headers.resume}:</span>
                                        <span className="text-gray-700">{row.resume}</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-teal-primary font-medium shrink-0 w-16">{c.vsComparison.headers.cv}:</span>
                                        <span className="text-gray-700">{row.cv}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Structure */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">{c.structure.title}</h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-8">{c.structure.description}</p>

                    <div className="bg-white border-2 border-gray-200 rounded-xl p-8 shadow-sm space-y-4 mb-8">
                        {c.structure.sections.map((s) => {
                            const colors = structureColorMap[s.colorGroup];
                            return (
                                <div key={s.number} className={`p-3 border-2 ${colors.border} rounded-lg ${colors.bg}`}>
                                    <span className={`font-bold ${colors.title}`}>{s.number}. {s.label}</span>
                                    <p className={`text-sm ${colors.detail} mt-1`}>{s.detail}</p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                        <h4 className="font-bold text-blue-900 mb-2">{c.structure.proTipTitle}</h4>
                        <p className="text-blue-800">{c.structure.proTipText}</p>
                    </div>
                </div>
            </section>

            {/* Personal Information */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">{c.personalInfo.title}</h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-8">{c.personalInfo.description}</p>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                                <span className="text-green-500">&#10003;</span> {c.personalInfo.alwaysInclude.title}
                            </h3>
                            <ul className="space-y-2 text-gray-700">
                                {c.personalInfo.alwaysInclude.items.map((item) => <li key={item}>&#8226; {item}</li>)}
                            </ul>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                                <span className="text-amber-500">~</span> {c.personalInfo.optional.title}
                            </h3>
                            <ul className="space-y-2 text-gray-700">
                                {c.personalInfo.optional.items.map((item) => <li key={item}>&#8226; {item}</li>)}
                            </ul>
                        </div>
                    </div>

                    <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
                        <h4 className="font-bold text-amber-900 mb-2">{c.personalInfo.noteTitle}</h4>
                        <p className="text-amber-800">{c.personalInfo.noteText}</p>
                    </div>
                </div>
            </section>

            {/* Types of Biodata */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">{c.types.title}</h2>

                    <div className="space-y-8">
                        {/* Job Biodata */}
                        <div className="bg-gradient-to-r from-blue-50 to-white p-8 rounded-xl border border-blue-100">
                            <h3 className="text-2xl font-bold text-blue-900 mb-4">{c.types.jobBiodata.title}</h3>
                            <p className="text-gray-700 mb-4">{c.types.jobBiodata.description}</p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">{c.types.jobBiodata.focusTitle}</h4>
                                    <ul className="text-gray-600 space-y-1">
                                        {c.types.jobBiodata.focusItems.map((item) => <li key={item}>&#8226; {item}</li>)}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">{c.types.jobBiodata.commonTitle}</h4>
                                    <ul className="text-gray-600 space-y-1">
                                        {c.types.jobBiodata.commonItems.map((item) => <li key={item}>&#8226; {item}</li>)}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Marriage Biodata */}
                        <div className="bg-gradient-to-r from-pink-50 to-white p-8 rounded-xl border border-pink-100">
                            <h3 className="text-2xl font-bold text-pink-900 mb-4">{c.types.marriageBiodata.title}</h3>
                            <p className="text-gray-700 mb-4">{c.types.marriageBiodata.description}</p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">{c.types.marriageBiodata.sectionsTitle}</h4>
                                    <ul className="text-gray-600 space-y-1">
                                        {c.types.marriageBiodata.sectionsItems.map((item) => <li key={item}>&#8226; {item}</li>)}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">{c.types.marriageBiodata.designTitle}</h4>
                                    <ul className="text-gray-600 space-y-1">
                                        {c.types.marriageBiodata.designItems.map((item) => <li key={item}>&#8226; {item}</li>)}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Regional Expectations */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">{c.regions.title}</h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-8">{c.regions.description}</p>

                    <div className="space-y-6">
                        {c.regions.items.map((region, i) => (
                            <div key={region.country} className={`bg-white p-6 rounded-xl shadow-sm border-l-4 ${regionBorderColors[i % regionBorderColors.length]}`}>
                                <h3 className="font-bold text-xl text-gray-900 mb-2">{region.flag} {region.country}</h3>
                                <p className="text-gray-700">{region.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Templates */}
            <section id="templates" className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">{c.templates.title}</h2>
                    <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">{c.templates.subtitle}</p>

                    <div className="grid md:grid-cols-2 gap-6">
                        {c.templates.cards.map((card) => {
                            const colors = templateCardColors[card.color] || templateCardColors.blue;
                            return (
                                <div key={card.title} className={`bg-gradient-to-br ${colors.gradient} p-8 rounded-xl text-center`}>
                                    <div className={`w-16 h-16 ${colors.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            {card.color === 'blue' ? (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            ) : (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            )}
                                        </svg>
                                    </div>
                                    <h3 className="font-bold text-xl text-gray-900 mb-2">{card.title}</h3>
                                    <p className="text-gray-600 mb-6">{card.description}</p>
                                    <Link href={localizedHref('/onboarding')} className={`inline-flex items-center gap-2 ${colors.btnBg} text-white px-6 py-3 rounded-xl font-semibold ${colors.btnHover} transition`}>
                                        {card.ctaLabel}
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Tips */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">{c.tips.title}</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {[c.tips.items.slice(0, 4), c.tips.items.slice(4)].map((column, colIdx) => (
                            <div key={colIdx} className="space-y-4">
                                {column.map((tip, i) => (
                                    <div key={tip.title} className="flex gap-4">
                                        <span className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">{colIdx * 4 + i + 1}</span>
                                        <div>
                                            <h3 className="font-bold text-gray-900">{tip.title}</h3>
                                            <p className="text-gray-600 text-sm">{tip.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16 bg-white">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{c.faq.title}</h2>
                    <div className="space-y-6">
                        {c.faq.items.map((item, i) => (
                            <div key={i} className="bg-gray-50 rounded-xl p-6">
                                <h3 className="font-bold text-lg text-gray-900 mb-2">{item.question}</h3>
                                <p className="text-gray-600">{item.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Cross Links */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">{c.crossLinks.title}</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {c.crossLinks.items.map((link) => (
                            <Link key={link.href} href={localizedHref(link.href)} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-center">
                                <h3 className="font-bold text-gray-900 mb-2">{link.title}</h3>
                                <p className="text-gray-600 text-sm">{link.subtitle}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* External Resources */}
            <section className="py-8 bg-white border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{c.externalResources.title}</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                        {c.externalResources.items.map((item) => (
                            <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                                <span className="text-gray-400">&#8599;</span>
                                <span className="text-sm text-gray-700">{item.label}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-24 bg-gradient-to-r from-orange-500 to-orange-600 text-center px-6">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">{c.bottomCta.title}</h2>
                <p className="text-orange-100 max-w-2xl mx-auto mb-10 text-lg">{c.bottomCta.description}</p>
                <Link href={localizedHref('/onboarding')} className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-xl font-bold hover:bg-orange-50 transition transform motion-safe:hover:scale-105 shadow-lg">
                    {c.bottomCta.ctaLabel}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
            </section>

            <Footer />
        </>
    );
}

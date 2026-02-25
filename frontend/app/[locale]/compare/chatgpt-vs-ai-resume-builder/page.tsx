import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getContent } from '@/lib/content/chatgpt-comparison';
import { getLocalizedPath } from '@/lib/localized-paths';
import { locales } from '@/i18n.config';

const siteUrl = 'https://bestairesumes.com';
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const c = getContent(locale);
    return {
        title: c.meta.title,
        description: c.meta.description,
        keywords: c.meta.keywords,
        openGraph: {
            title: c.meta.ogTitle,
            description: c.meta.ogDescription,
            type: 'article',
            url: `${siteUrl}/${locale}/compare/chatgpt-vs-ai-resume-builder`,
        },
        twitter: {
            card: 'summary_large_image',
            title: c.meta.twitterTitle,
            description: c.meta.twitterDescription,
        },
        alternates: {
            canonical: `${siteUrl}/${locale}/compare/chatgpt-vs-ai-resume-builder`,
            languages: Object.fromEntries(
                locales.map(l => [l, `${siteUrl}/${l}/compare/chatgpt-vs-ai-resume-builder`])
            ),
        },
    };
}

const statusIcon = (type: 'yes' | 'no' | 'partial') => {
    if (type === 'yes') return <span className="text-green-600 font-medium">&#10003;</span>;
    if (type === 'no') return <span className="text-red-500 font-medium">&#10007;</span>;
    return <span className="text-amber-500 font-medium">~</span>;
};

const crossLinkHrefs = ['/canva-alternative', '/overleaf-alternative', '/resume-io-alternative', '/rezi-alternative'];
const guideLinkHrefs = ['/blog/what-is-ats-guide', '/blog/how-to-write-a-resume', '/blog/chatgpt-vs-claude-for-resumes', '/blog/how-to-write-professional-summary'];

export default async function ChatGPTComparisonPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const c = getContent(locale);
    const localizedHref = (path: string) => `/${locale}${getLocalizedPath(path, locale)}`;

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
            { '@type': 'ListItem', position: 2, name: 'Compare', item: `${siteUrl}/compare` },
            { '@type': 'ListItem', position: 3, name: c.schemas.breadcrumbName },
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

    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: c.schemas.articleHeadline,
        description: c.schemas.articleDescription,
        datePublished: '2026-01-26',
        dateModified: '2026-01-26',
        author: {
            '@type': 'Person',
            name: 'Alex Brown',
            url: `${siteUrl}/about/alex-brown`,
            jobTitle: 'Senior HR & Resume Strategist',
        },
        publisher: {
            '@type': 'Organization',
            name: 'Best AI Resume',
            url: siteUrl,
            logo: { '@type': 'ImageObject', url: `${siteUrl}/logo.png` },
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}/${locale}/compare/chatgpt-vs-ai-resume-builder` },
    };

    return (
        <>
            <Header />
            <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
            <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
            <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>

            {/* Hero Section */}
            <section className="pt-32 pb-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <span className="text-accent-blue font-semibold tracking-wider uppercase text-sm">{c.hero.badge}</span>
                    <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6 text-gray-900">
                        {c.hero.title}<br />
                        <span className="text-accent-blue">{c.hero.titleHighlight}</span>
                    </h1>
                    {/* SAFE: content from hardcoded constant strings with inline <strong> formatting only */}
                    <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
                       dangerouslySetInnerHTML={{ __html: c.hero.subtitle /* SAFE: hardcoded content */ }} />
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href={localizedHref('/onboarding')} className="px-8 py-4 bg-accent-blue text-white font-semibold rounded-xl hover:bg-blue-600 transition shadow-lg shadow-blue-500/30">
                            {c.hero.ctaPrimary}
                        </Link>
                        <a href="#comparison" className="px-8 py-4 bg-white border border-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition shadow-sm">
                            {c.hero.ctaSecondary}
                        </a>
                    </div>
                </div>
            </section>

            {/* The Problem with ChatGPT Resumes */}
            <section className="py-16 bg-white border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 md:p-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{c.problem.title}</h2>
                        {/* SAFE: content from hardcoded constant strings with inline <strong> formatting only */}
                        <p className="text-gray-700 mb-6 leading-relaxed"
                           dangerouslySetInnerHTML={{ __html: c.problem.description /* SAFE: hardcoded content */ }} />
                        <div className="grid md:grid-cols-3 gap-4">
                            {c.problem.stats.map((stat, i) => (
                                <div key={i} className="bg-white rounded-xl p-5 border border-amber-100">
                                    <div className="text-3xl font-bold text-amber-500 mb-1">{stat.value}</div>
                                    <p className="text-sm text-gray-600">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Comparison Table */}
            <section id="comparison" className="py-16 bg-gray-50">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">{c.comparison.title}</h2>
                        <p className="text-gray-400">{c.comparison.subtitle}</p>
                    </div>

                    {/* Desktop: Table view */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-white border-b border-gray-100">
                                    <th className="text-left p-4 font-semibold text-gray-900">{c.comparison.colFeature}</th>
                                    <th className="text-center p-4 font-semibold text-gray-400">{c.comparison.colChatgpt}</th>
                                    <th className="text-center p-4 font-semibold text-accent-blue">{c.comparison.colBestAi}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {c.comparison.rows.map((row, i) => (
                                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                                        <td className="p-4 font-medium text-gray-900 border-b border-gray-100">{row.feature}</td>
                                        <td className="p-4 text-center text-sm text-gray-600 border-b border-gray-100">
                                            <span className="mr-2">{statusIcon(row.chatgptIcon)}</span>{row.chatgpt}
                                        </td>
                                        <td className="p-4 text-center text-sm text-gray-800 font-medium border-b border-gray-100">
                                            <span className="mr-2">{statusIcon(row.bestIcon)}</span>{row.best}
                                        </td>
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
                                    <div className="flex items-start gap-2">
                                        <span className="text-gray-400 shrink-0 w-20">{c.comparison.colChatgpt}:</span>
                                        <span className="text-gray-600 flex items-start gap-1">
                                            {statusIcon(row.chatgptIcon)} {row.chatgpt}
                                        </span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-accent-blue font-medium shrink-0 w-20">Best AI:</span>
                                        <span className="text-gray-800 font-medium flex items-start gap-1">
                                            {statusIcon(row.bestIcon)} {row.best}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What ChatGPT Does Well */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{c.strengths.title}</h2>
                    <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">{c.strengths.subtitle}</p>
                    <div className="grid md:grid-cols-2 gap-6">
                        {c.strengths.items.map((item, i) => (
                            <div key={i} className="bg-green-50 rounded-xl p-6 border border-green-100">
                                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-600 text-sm">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Where ChatGPT Falls Short */}
            <section className="py-16 bg-gray-50 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{c.shortcomings.title}</h2>
                    <div className="space-y-6">
                        {c.shortcomings.items.map((item, i) => (
                            <div key={i} className="bg-white rounded-xl p-6 border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Best of Both Worlds */}
            <section className="py-16 bg-white border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{c.bestApproach.title}</h2>
                    <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200">
                        <p className="text-gray-700 mb-6 leading-relaxed">{c.bestApproach.description}</p>
                        <ol className="space-y-4">
                            {c.bestApproach.steps.map((step, i) => (
                                <li key={i} className="flex gap-4">
                                    <span className="w-8 h-8 rounded-full bg-accent-blue text-white flex items-center justify-center font-bold text-sm shrink-0">{i + 1}</span>
                                    <div>
                                        <p className="font-medium text-gray-900">{step.title}</p>
                                        <p className="text-gray-600 text-sm mt-1">{step.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </section>

            {/* Who Should Use What */}
            <section className="py-16 bg-gray-50 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{c.whoShouldUse.title}</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-2xl p-8 border border-gray-100">
                            <h3 className="font-bold text-lg text-gray-900 mb-4">{c.whoShouldUse.useChatGPT.title}</h3>
                            <ul className="space-y-3 text-gray-600">
                                {c.whoShouldUse.useChatGPT.items.map((item, i) => (
                                    <li key={i} className="flex gap-3"><span className="text-gray-500 mt-0.5">&bull;</span>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200">
                            <h3 className="font-bold text-lg text-gray-900 mb-4">{c.whoShouldUse.useBestAI.title}</h3>
                            <ul className="space-y-3 text-gray-700">
                                {c.whoShouldUse.useBestAI.items.map((item, i) => (
                                    <li key={i} className="flex gap-3"><span className="text-accent-blue mt-0.5">&check;</span>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <p className="text-center text-gray-400 mt-8 text-sm">
                        <strong>{c.whoShouldUse.bottomLine.split(':')[0]}:</strong>{c.whoShouldUse.bottomLine.split(':').slice(1).join(':')}
                    </p>
                </div>
            </section>

            {/* Resume Examples CTA */}
            <section className="py-16 bg-white border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{c.resumeExamples.title}</h2>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">{c.resumeExamples.description}</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href={localizedHref('/resume-examples')} className="px-6 py-3 bg-gray-50 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition">
                            {c.resumeExamples.ctaBrowse}
                        </Link>
                        <Link href={localizedHref('/templates')} className="px-6 py-3 bg-gray-50 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition">
                            {c.resumeExamples.ctaTemplates}
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-gray-50 border-t border-gray-100">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{c.faq.title}</h2>
                    <div className="space-y-4">
                        {c.faq.items.map((item, i) => (
                            <details key={i} className="bg-white rounded-xl border border-gray-100 group">
                                <summary className="p-5 font-medium text-gray-900 cursor-pointer hover:text-accent-blue transition list-none flex items-center justify-between">
                                    {item.question}
                                    <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
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
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{c.crossLinks.compareTitle}</h3>
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                        {c.crossLinks.links.map((link, i) => (
                            <Link key={i} href={localizedHref(crossLinkHrefs[i])} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition text-center">
                                <p className="font-medium text-gray-900">{link.title}</p>
                                <p className="text-xs text-gray-400 mt-1">{link.subtitle}</p>
                            </Link>
                        ))}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{c.crossLinks.guidesTitle}</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                        {c.crossLinks.guides.map((guide, i) => (
                            <Link key={i} href={localizedHref(guideLinkHrefs[i])} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                                <span className="text-accent-blue">&rarr;</span>
                                <span className="text-sm text-gray-700">{guide.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* External Resources */}
            <section className="py-8 bg-gray-50 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{c.externalResources.title}</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                        {c.externalResources.items.map((res, i) => (
                            <a key={i} href={res.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition border border-gray-100">
                                <span className="text-gray-400">↗</span>
                                <span className="text-sm text-gray-700">{res.label}</span>
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
                    <Link href={localizedHref('/onboarding')} className="inline-block px-10 py-4 bg-accent-blue text-white font-semibold rounded-xl hover:bg-blue-600 transition shadow-lg shadow-blue-500/30 text-lg">
                        {c.bottomCta.ctaText}
                    </Link>
                    <p className="text-gray-600 mt-4 text-sm">{c.bottomCta.subtext}</p>
                </div>
            </section>

            <Footer />
        </>
    );
}

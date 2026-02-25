import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getContent } from '@/lib/content/resume-format';
import type { FormatComparisonItem } from '@/lib/content/resume-format';
import { getLocalizedPath } from '@/lib/localized-paths';
import { locales } from '@/i18n.config';

const siteUrl = 'https://bestairesumes.com';

// ── Color lookup maps ────────────────────────────────────────────────
const badgeColorMap: Record<string, string> = {
    green: 'text-green-600 bg-green-50',
    amber: 'text-amber-600 bg-amber-50',
    blue: 'text-blue-600 bg-blue-50',
};
const atsTextMap: Record<string, string> = {
    green: 'text-green-600',
    amber: 'text-amber-600',
};
const atsBgMap: Record<string, string> = {
    green: 'bg-green-500',
    amber: 'bg-amber-500',
};

function atsWidthClass(score: number): string {
    if (score >= 100) return 'w-full';
    if (score >= 95) return 'w-11/12';
    if (score >= 70) return 'w-2/3';
    return 'w-1/2';
}

// ── Metadata ─────────────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const c = getContent(locale);

const alternateLanguages: Record<string, string> = {
        'x-default': `${siteUrl}/en/resume-format`,
    };
    locales.forEach((loc) => {
        alternateLanguages[loc] = `${siteUrl}/${loc}/resume-format`;
    });

    return {
        title: c.meta.title,
        description: c.meta.description,
        keywords: c.meta.keywords,
        openGraph: {
            title: c.meta.title,
            description: c.meta.description,
            type: 'article',
            url: `${siteUrl}/${locale}/resume-format`,
        },
        twitter: {
            card: 'summary_large_image',
            title: c.meta.title,
            description: c.meta.description,
        },
        alternates: {
            canonical: `${siteUrl}/${locale}/resume-format`,
            languages: alternateLanguages,
        },
    };
}

// ── Mobile format card ───────────────────────────────────────────────
function FormatCard({ f }: { f: FormatComparisonItem }) {
    return (
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <div className="font-bold text-lg text-gray-900">{f.name}</div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full mt-1 inline-block ${badgeColorMap[f.badgeColor]}`}>{f.badge}</span>
                </div>
                <div className="text-right">
                    <div className={`text-sm font-bold ${atsTextMap[f.atsColor]}`}>{f.atsScore}% ATS</div>
                </div>
            </div>
            <div className="space-y-3 text-sm">
                <div>
                    <span className="font-semibold text-gray-700">Best For:</span>
                    <ul className="list-disc list-inside text-gray-600 mt-1">
                        {f.bestFor.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                </div>
                <div>
                    <span className="font-semibold text-gray-700">Avoid If:</span>
                    <p className="text-gray-600 mt-1">{f.avoidIf}</p>
                </div>
            </div>
        </div>
    );
}

// ── Page ──────────────────────────────────────────────────────────────
export default async function ResumeFormatPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const c = getContent(locale);
    const localizedHref = (path: string) => `/${locale}${getLocalizedPath(path, locale)}`;

    // SAFE: hardcoded content strings from the content file, no user input
    const chronoDescHtml = { __html: c.chronological.description };
    const functionalDescHtml = { __html: c.functional.description };

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

    const howToSchema = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: c.schemas.howToName,
        description: c.schemas.howToDescription,
        step: c.schemas.howToSteps.map((text) => ({ '@type': 'HowToStep', text })),
        tool: { '@type': 'HowToTool', name: c.schemas.howToToolName, url: siteUrl },
    };

    const downloadIcon = (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
    );

    return (
        <>
            <Header />
            <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
            <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
            <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>

            {/* Hero */}
            <section className="pt-32 pb-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <span className="text-accent-blue font-semibold tracking-wider uppercase text-sm">{c.hero.badge}</span>
                    <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6 text-gray-900">
                        {c.hero.title}<br />
                        <span className="text-accent-primary">{c.hero.titleHighlight}</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">{c.hero.subtitle}</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="#comparison" className="px-8 py-4 bg-white border border-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition shadow-sm">
                            {c.hero.ctaCompare}
                        </a>
                        <Link href={localizedHref('/onboarding')} className="px-8 py-4 bg-accent-blue text-white font-semibold rounded-xl hover:bg-blue-600 transition shadow-lg shadow-blue-500/30">
                            {c.hero.ctaBuild}
                        </Link>
                    </div>
                </div>
            </section>

            {/* Quick Comparison Table */}
            <section id="comparison" className="py-16 bg-white border-b border-gray-100">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">{c.comparison.title}</h2>
                        <p className="text-gray-400">{c.comparison.subtitle}</p>
                    </div>

                    {/* Desktop table */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="p-4 text-left text-sm font-semibold text-gray-400 uppercase tracking-wider">{c.comparison.tableHeaders.format}</th>
                                    <th className="p-4 text-left text-sm font-semibold text-gray-400 uppercase tracking-wider">{c.comparison.tableHeaders.bestFor}</th>
                                    <th className="p-4 text-left text-sm font-semibold text-gray-400 uppercase tracking-wider">{c.comparison.tableHeaders.avoidIf}</th>
                                    <th className="p-4 text-left text-sm font-semibold text-gray-400 uppercase tracking-wider">{c.comparison.tableHeaders.atsSafety}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {c.comparison.formats.map((f) => (
                                    <tr key={f.name} className="hover:bg-gray-50/50 transition">
                                        <td className="p-6">
                                            <div className="font-bold text-lg text-gray-900">{f.name}</div>
                                            <span className={`text-xs font-medium px-2 py-1 rounded-full mt-1 inline-block ${badgeColorMap[f.badgeColor]}`}>{f.badge}</span>
                                        </td>
                                        <td className="p-6 text-gray-700">
                                            <ul className="list-disc list-inside space-y-1">
                                                {f.bestFor.map((item) => <li key={item}>{item}</li>)}
                                            </ul>
                                        </td>
                                        <td className="p-6 text-gray-700">{f.avoidIf}</td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-2">
                                                <div className="w-full bg-gray-100 rounded-full h-2 w-24">
                                                    <div className={`${atsBgMap[f.atsColor]} h-2 rounded-full ${atsWidthClass(f.atsScore)}`}></div>
                                                </div>
                                                <span className={`text-sm font-bold ${atsTextMap[f.atsColor]}`}>{f.atsScore}%</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile cards */}
                    <div className="md:hidden space-y-6">
                        {c.comparison.formats.map((f) => <FormatCard key={f.name} f={f} />)}
                    </div>
                </div>
            </section>

            {/* Deep Dive: Chronological */}
            <section className="py-16 md:py-24 max-w-4xl mx-auto px-6">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">{c.chronological.title}</h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-6" dangerouslySetInnerHTML={chronoDescHtml} />

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8 rounded-r-lg">
                        <h4 className="font-bold text-blue-900 mb-2">{c.chronological.whyLoveTitle}</h4>
                        <p className="text-blue-800">{c.chronological.whyLoveText}</p>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-4">{c.chronological.structureTitle}</h3>
                    <div className="bg-white border-2 border-gray-100 rounded-xl p-8 shadow-sm space-y-4 font-mono text-sm text-gray-400">
                        {c.chronological.sections.map((s) =>
                            s.isCore ? (
                                <div key={s.label} className="p-4 border-2 border-blue-100 rounded bg-blue-50/50">
                                    <div className="font-bold text-blue-700">{s.label}</div>
                                    {s.detail && <div className="mt-2 text-xs">{s.detail.split(' / ').map((d) => <div key={d} className="mt-1">{d}</div>)}</div>}
                                </div>
                            ) : (
                                <div key={s.label} className={`p-2 border border-dashed border-gray-200 rounded bg-gray-50 ${s.label.includes('Header') || s.label.includes('Encabezado') ? 'text-center' : ''}`}>{s.label}</div>
                            )
                        )}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                    <a href="/templates/chronological_resume_template.docx" download className="inline-flex items-center justify-center gap-2 bg-gray-50 text-gray-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition">
                        {downloadIcon}
                        {c.chronological.downloadLabel}
                    </a>
                    <Link href={localizedHref('/onboarding')} className="inline-flex items-center justify-center gap-2 text-accent-blue font-semibold hover:underline">
                        {c.chronological.aiLabel} &rarr;
                    </Link>
                </div>
            </section>

            {/* Deep Dive: Functional */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">{c.functional.title}</h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-6" dangerouslySetInnerHTML={functionalDescHtml} />

                    <div className="bg-amber-50 border-l-4 border-amber-500 p-6 my-8 rounded-r-lg">
                        <h4 className="font-bold text-amber-900 mb-2">{c.functional.warningTitle}</h4>
                        <p className="text-amber-800">{c.functional.warningText}</p>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-4">{c.functional.structureTitle}</h3>
                    <div className="bg-white border-2 border-gray-100 rounded-xl p-8 shadow-sm space-y-4 font-mono text-sm text-gray-400">
                        {c.functional.sections.map((s) =>
                            s.isCore ? (
                                <div key={s.label} className="p-4 border-2 border-amber-100 rounded bg-amber-50/50">
                                    <div className="font-bold text-amber-700">{s.label}</div>
                                    {s.detail && <div className="mt-2 text-xs">{s.detail.split(' / ').map((d) => <div key={d} className="mt-1">{d}</div>)}</div>}
                                </div>
                            ) : (
                                <div key={s.label} className="p-2 border border-dashed border-gray-200 rounded bg-gray-50">{s.label}</div>
                            )
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                        <a href="/templates/functional_resume_template.docx" download className="inline-flex items-center justify-center gap-2 bg-gray-50 text-gray-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition">
                            {downloadIcon}
                            {c.functional.downloadLabel}
                        </a>
                        <Link href={localizedHref('/onboarding')} className="inline-flex items-center justify-center gap-2 text-accent-blue font-semibold hover:underline">
                            {c.functional.aiLabel} &rarr;
                        </Link>
                    </div>
                </div>
            </section>

            {/* Deep Dive: Combination */}
            <section className="py-16 md:py-24 max-w-4xl mx-auto px-6">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">{c.combination.title}</h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">{c.combination.description}</p>

                    <h3 className="text-xl font-bold text-gray-900 mb-4">{c.combination.whoForTitle}</h3>
                    <ul className="grid sm:grid-cols-2 gap-4 mb-8">
                        {c.combination.whoForItems.map((item) => (
                            <li key={item} className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                                <span className="text-green-500 text-xl">&#10003;</span>
                                <span className="text-gray-700">{item}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                        <a href="/templates/combination_resume_template.docx" download className="inline-flex items-center justify-center gap-2 bg-gray-50 text-gray-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition">
                            {downloadIcon}
                            {c.combination.downloadLabel}
                        </a>
                        <Link href={localizedHref('/onboarding')} className="inline-flex items-center justify-center gap-2 text-accent-blue font-semibold hover:underline">
                            {c.combination.aiLabel} &rarr;
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{c.faq.title}</h2>
                    <div className="space-y-6">
                        {c.faq.items.map((item, i) => (
                            <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                                <h3 className="font-bold text-lg text-gray-900 mb-2">{item.question}</h3>
                                <p className="text-gray-600">{item.answer}</p>
                            </div>
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

            {/* Sticky Bottom CTA (mobile) */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-2xl z-50 md:hidden">
                <div className="flex items-center justify-between gap-4">
                    <div className="text-sm font-medium text-gray-700">{c.stickyCta.text}</div>
                    <Link href={localizedHref('/onboarding')} className="bg-accent-blue text-white px-6 py-2 rounded-full font-bold text-sm">
                        {c.stickyCta.ctaLabel}
                    </Link>
                </div>
            </div>

            {/* Bottom CTA */}
            <section className="py-24 bg-gray-50 text-center px-6">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">{c.bottomCta.title}</h2>
                <p className="text-gray-500 max-w-2xl mx-auto mb-10 text-lg">{c.bottomCta.description}</p>
                <Link href={localizedHref('/onboarding')} className="inline-flex items-center gap-2 bg-accent-green text-gray-900 px-8 py-4 rounded-xl font-bold hover:bg-green-400 transition transform motion-safe:hover:scale-105">
                    {c.bottomCta.ctaLabel}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
            </section>

            <Footer />
        </>
    );
}

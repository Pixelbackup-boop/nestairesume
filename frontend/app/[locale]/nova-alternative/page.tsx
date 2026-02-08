import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const siteUrl = 'https://www.bestairesumes.com';

const faqItems = [
    { question: 'Is NovaResume (Nova CV) free?', answer: 'NovaResume offers a free plan with limited templates and features. Premium plans start at $19.99/month for full template access and customization. Best AI Resume Builder is 100% free with all features, all templates, and unlimited exports — no premium plan needed.' },
    { question: 'Is NovaResume a good resume builder?', answer: 'NovaResume offers clean templates and a straightforward builder interface. However, it lacks AI-powered writing features and charges for premium templates. Best AI Resume Builder provides AI content generation, real-time ATS scoring, and modern templates — all free.' },
    { question: 'What is the best free alternative to NovaResume?', answer: 'Best AI Resume Builder is the best free alternative. It offers everything NovaResume charges for — professional templates, PDF export, cover letters — plus AI writing and ATS optimization that NovaResume does not have.' },
    { question: 'Does NovaResume have AI features?', answer: 'NovaResume does not offer AI-powered resume writing. It relies on manual content entry with some pre-built suggestions. Best AI Resume Builder uses advanced AI to generate custom bullet points, professional summaries, and keyword-optimized content tailored to your target job.' },
    { question: 'Can I export my NovaResume as a PDF?', answer: 'PDF export on NovaResume requires a premium subscription. Best AI Resume Builder lets you export unlimited PDFs for free — no account upgrade needed.' },
];

/*
 * SECURITY: Schema Data Safety Declaration
 * ==========================================
 * All schema objects in this file contain ONLY hardcoded string constants.
 * No user input is used anywhere in these objects.
 * No dynamic data from APIs, databases, or URL parameters.
 * No external sources of any kind.
 * The JSON.stringify output is deterministic and safe.
 * This follows the standard Next.js pattern for JSON-LD structured data.
 * dangerouslySetInnerHTML is the ONLY way to embed JSON-LD in React/Next.js.
 * Content has been verified as safe hardcoded constants — no sanitization needed.
 */
const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'NovaResume Alternative' },
    ],
};

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
};

const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Best NovaResume (Nova CV) Alternative 2026: Free AI Resume Builder',
    description: 'Compare NovaResume vs Best AI Resume Builder. Get AI-powered writing, ATS optimization, and unlimited PDF exports — completely free.',
    datePublished: '2026-01-26',
    dateModified: '2026-01-26',
    author: { '@type': 'Person', name: 'Alex Brown', url: `${siteUrl}/about/alex-brown`, jobTitle: 'Senior HR & Resume Strategist' },
    publisher: { '@type': 'Organization', name: 'Best AI Resume', url: siteUrl, logo: { '@type': 'ImageObject', url: `${siteUrl}/logo.png` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}/nova-alternative` },
};

// SAFE: deterministic JSON.stringify of hardcoded-only constants (no user input whatsoever)
const breadcrumbSchemaHtml = JSON.stringify(breadcrumbSchema);
const faqSchemaHtml = JSON.stringify(faqSchema);
const articleSchemaHtml = JSON.stringify(articleSchema);

export const metadata: Metadata = {
    title: 'Best NovaResume Alternative 2026: Free AI Resume Builder | Best AI Resume',
    description: 'Looking for a free NovaResume (Nova CV) alternative? Compare Nova vs Best AI Resume Builder — AI writing, ATS templates, unlimited exports. Free forever.',
    keywords: 'nova cv maker, novaresume alternative, nova resume builder, nova cv, free resume builder, ai resume builder, nova resume free alternative',
};

// Static content only. All schema script tags use hardcoded constants (see safety declaration above).
export default function NovaAlternativePage() {
    return (
        <>
            <Header />
            {/* JSON-LD structured data — all values are hardcoded string constants defined above, no user input involved */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchemaHtml /* SAFE: hardcoded constants only — see safety declaration block */ }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchemaHtml /* SAFE: hardcoded constants only — see safety declaration block */ }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleSchemaHtml /* SAFE: hardcoded constants only — see safety declaration block */ }} />

            <section className="pt-32 pb-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <span className="text-accent-teal font-semibold tracking-wider uppercase text-sm">NovaResume Alternative</span>
                    <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6 text-gray-900">
                        Better Templates. AI Writing.<br />
                        <span className="text-accent-teal">Actually Free.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                        NovaResume charges <strong>$19.99/month</strong> for premium templates and PDF exports.
                        Get AI-powered writing, ATS scoring, and all templates for <strong>$0</strong>.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/onboarding" className="px-8 py-4 bg-accent-teal text-white font-semibold rounded-xl hover:opacity-90 transition shadow-lg shadow-teal-500/30">Build My Resume Free</Link>
                        <a href="#comparison" className="px-8 py-4 bg-white border border-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition shadow-sm">See the Comparison</a>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-white border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="bg-teal-50 border border-teal-200 rounded-2xl p-8 md:p-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">NovaResume: Clean Templates, Missing AI</h2>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            NovaResume (also known as Nova CV Maker) offers a simple builder with clean templates.
                            The problem: <strong>no AI writing assistance</strong>, limited free features, and premium pricing
                            for templates that other tools offer free. In 2026, a resume builder without AI is leaving
                            value on the table.
                        </p>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-white rounded-xl p-5 border border-teal-100">
                                <div className="text-3xl font-bold text-teal-600 mb-1">$19.99</div>
                                <p className="text-sm text-gray-600">per month for NovaResume premium</p>
                            </div>
                            <div className="bg-white rounded-xl p-5 border border-teal-100">
                                <div className="text-3xl font-bold text-teal-600 mb-1">0</div>
                                <p className="text-sm text-gray-600">AI features in NovaResume</p>
                            </div>
                            <div className="bg-white rounded-xl p-5 border border-teal-100">
                                <div className="text-3xl font-bold text-accent-green mb-1">$0</div>
                                <p className="text-sm text-gray-600">Best AI Resume Builder — full AI, free</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="comparison" className="py-16 bg-gray-50">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">NovaResume vs Best AI Resume Builder</h2>
                        <p className="text-gray-400">Basic builder vs AI-powered platform.</p>
                    </div>
                    {/* Desktop: Table view */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-white border-b border-gray-100">
                                    <th className="text-left p-4 font-semibold text-gray-900">Feature</th>
                                    <th className="text-center p-4 font-semibold text-gray-400">NovaResume</th>
                                    <th className="text-center p-4 font-semibold text-accent-teal">Best AI Resumes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { feature: 'Pricing', comp: '❌ Free limited / $19.99/mo premium', best: '✅ 100% free forever' },
                                    { feature: 'AI Resume Writing', comp: '❌ No AI features', best: '✅ AI-generated custom content' },
                                    { feature: 'ATS Optimization', comp: '⚠️ Basic format only', best: '✅ Real-time ATS score + keywords' },
                                    { feature: 'Template Quality', comp: '✅ Clean, minimal designs', best: '✅ 20+ modern ATS-tested templates' },
                                    { feature: 'PDF Export', comp: '❌ Premium only', best: '✅ Unlimited free exports' },
                                    { feature: 'Cover Letter', comp: '⚠️ Basic builder (premium)', best: '✅ AI-powered (free)' },
                                    { feature: 'Content Suggestions', comp: '❌ Manual entry only', best: '✅ AI writes from your experience' },
                                    { feature: 'Keyword Matching', comp: '❌ Not available', best: '✅ AI-powered keyword optimization' },
                                    { feature: 'Resume Examples', comp: '⚠️ Limited library', best: '✅ 300+ detailed examples' },
                                    { feature: 'Multiple Languages', comp: '✅ Multi-language support', best: '✅ 5 languages supported' },
                                ].map((row, i) => (
                                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                                        <td className="p-4 font-medium text-gray-900 border-b border-gray-100">{row.feature}</td>
                                        <td className="p-4 text-center text-sm text-gray-600 border-b border-gray-100">{row.comp}</td>
                                        <td className="p-4 text-center text-sm text-gray-800 font-medium border-b border-gray-100">{row.best}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile: Card view */}
                    <div className="md:hidden space-y-4">
                        {[
                            { feature: 'Pricing', comp: '❌ Free limited / $19.99/mo premium', best: '✅ 100% free forever' },
                            { feature: 'AI Resume Writing', comp: '❌ No AI features', best: '✅ AI-generated custom content' },
                            { feature: 'ATS Optimization', comp: '⚠️ Basic format only', best: '✅ Real-time ATS score + keywords' },
                            { feature: 'Template Quality', comp: '✅ Clean, minimal designs', best: '✅ 20+ modern ATS-tested templates' },
                            { feature: 'PDF Export', comp: '❌ Premium only', best: '✅ Unlimited free exports' },
                            { feature: 'Cover Letter', comp: '⚠️ Basic builder (premium)', best: '✅ AI-powered (free)' },
                            { feature: 'Content Suggestions', comp: '❌ Manual entry only', best: '✅ AI writes from your experience' },
                            { feature: 'Keyword Matching', comp: '❌ Not available', best: '✅ AI-powered keyword optimization' },
                            { feature: 'Resume Examples', comp: '⚠️ Limited library', best: '✅ 300+ detailed examples' },
                            { feature: 'Multiple Languages', comp: '✅ Multi-language support', best: '✅ 5 languages supported' },
                        ].map((row, i) => (
                            <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                <h3 className="font-semibold text-gray-900 mb-3">{row.feature}</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">NovaResume:</span>
                                        <span className="text-gray-600">{row.comp}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-accent-teal font-medium">Best AI Resumes:</span>
                                        <span className="text-gray-800 font-medium">{row.best}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Honest Recommendation</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-2xl p-8 border border-gray-100">
                            <h3 className="font-bold text-lg text-gray-900 mb-4">NovaResume might work if you...</h3>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex gap-3"><span className="text-gray-500 mt-0.5">&bull;</span>Prefer manually writing all resume content</li>
                                <li className="flex gap-3"><span className="text-gray-500 mt-0.5">&bull;</span>Like minimal, European-style CV templates</li>
                                <li className="flex gap-3"><span className="text-gray-500 mt-0.5">&bull;</span>Are willing to pay $19.99/mo for template access</li>
                                <li className="flex gap-3"><span className="text-gray-500 mt-0.5">&bull;</span>Don&apos;t need AI writing or ATS scoring</li>
                            </ul>
                        </div>
                        <div className="bg-teal-50 rounded-2xl p-8 border border-teal-200">
                            <h3 className="font-bold text-lg text-gray-900 mb-4">Best AI Resumes is better if you...</h3>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex gap-3"><span className="text-accent-teal mt-0.5">&#10003;</span>Want AI to help write your resume content</li>
                                <li className="flex gap-3"><span className="text-accent-teal mt-0.5">&#10003;</span>Need real-time ATS scoring and keyword suggestions</li>
                                <li className="flex gap-3"><span className="text-accent-teal mt-0.5">&#10003;</span>Want unlimited PDF exports without paying</li>
                                <li className="flex gap-3"><span className="text-accent-teal mt-0.5">&#10003;</span>Need all templates and features for free</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gray-50 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">See 300+ Free Resume Examples</h2>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                        Browse resume examples from <Link href="/resume-examples/software-developer" className="text-accent-teal hover:underline">software developer</Link> to <Link href="/resume-examples/data-analyst" className="text-accent-teal hover:underline">data analyst</Link> to <Link href="/resume-examples/nurse" className="text-accent-teal hover:underline">nurse</Link>.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/resume-examples" className="px-6 py-3 bg-gray-50 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition">Browse Resume Examples</Link>
                        <Link href="/templates" className="px-6 py-3 bg-gray-50 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition">View All Templates</Link>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-white border-t border-gray-100">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqItems.map((item, i) => (
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

            <section className="py-12 bg-gray-50 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Compare Other Resume Builders</h3>
                    <div className="grid sm:grid-cols-4 gap-3 mb-8">
                        <Link href="/zety-alternative" className="p-4 bg-white rounded-xl hover:bg-gray-50 transition text-center"><p className="font-medium text-gray-900">Zety Alternative</p><p className="text-xs text-gray-400 mt-1">Pricing comparison</p></Link>
                        <Link href="/canva-alternative" className="p-4 bg-white rounded-xl hover:bg-gray-50 transition text-center"><p className="font-medium text-gray-900">Canva Alternative</p><p className="text-xs text-gray-400 mt-1">Design tools vs AI</p></Link>
                        <Link href="/livecareer-alternative" className="p-4 bg-white rounded-xl hover:bg-gray-50 transition text-center"><p className="font-medium text-gray-900">LiveCareer Alternative</p><p className="text-xs text-gray-400 mt-1">Legacy vs modern</p></Link>
                        <Link href="/rezi-alternative" className="p-4 bg-white rounded-xl hover:bg-gray-50 transition text-center"><p className="font-medium text-gray-900">Rezi Alternative</p><p className="text-xs text-gray-400 mt-1">AI features comparison</p></Link>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-50">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">AI-Powered. Free Forever.</h2>
                    <p className="text-gray-600 mb-8 text-lg">Build a professional resume with AI writing, ATS scoring, and modern templates. No subscription, no limits.</p>
                    <Link href="/onboarding" className="inline-block px-10 py-4 bg-accent-teal text-white font-semibold rounded-xl hover:opacity-90 transition shadow-lg shadow-teal-500/30 text-lg">Build My Resume Free</Link>
                    <p className="text-gray-600 mt-4 text-sm">Free forever. No credit card required.</p>
                </div>
            </section>
            {/* External Resources */}
            <section className="py-8 bg-gray-50 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">External Resources</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                        <a href="https://novoresume.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition border border-gray-100">
                            <span className="text-gray-400">↗</span>
                            <span className="text-sm text-gray-700">Novorésumé Official Site</span>
                        </a>
                        <a href="https://www.bls.gov/ooh/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition border border-gray-100">
                            <span className="text-gray-400">↗</span>
                            <span className="text-sm text-gray-700">Bureau of Labor Statistics OOH</span>
                        </a>
                    </div>
                </div>
            </section>


            <Footer />
        </>
    );
}

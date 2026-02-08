import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const siteUrl = 'https://www.bestairesumes.com';

const faqItems = [
    { question: 'Is Rezi.ai free to use?', answer: 'Rezi offers a limited free plan that restricts you to 1 resume with basic features. Full access to AI writing, unlimited resumes, and all templates requires Rezi Pro at $29/month or $129/year. Best AI Resume Builder offers all features free with no limits.' },
    { question: 'Does Rezi.ai have good AI writing?', answer: 'Rezi was one of the first AI resume builders and has solid AI writing features. However, it limits AI credits on the free plan and charges for unlimited use. Best AI Resume Builder provides unlimited AI writing at no cost, with similar quality tailored to your specific job and industry.' },
    { question: 'What is the best free alternative to Rezi?', answer: 'Best AI Resume Builder is the best free alternative. It matches Rezi on AI writing quality and ATS optimization while being 100% free — no credit limits, no feature restrictions, no subscription needed.' },
    { question: 'Is Rezi better than other AI resume builders?', answer: 'Rezi is a strong product with good AI and ATS features. Its main drawback is pricing — $29/month is steep for job seekers. Best AI Resume Builder offers comparable AI quality, more templates, and real-time ATS scoring without any cost.' },
    { question: 'Can Rezi resumes pass ATS systems?', answer: 'Yes, Rezi templates are designed for ATS compatibility and include an ATS checker. Best AI Resume Builder also includes ATS-tested templates with a real-time score, plus AI-suggested keywords — all free of charge.' },
];

/*
 * SECURITY: Schema Data Safety Declaration
 * ==========================================
 * All schema objects in this file contain ONLY hardcoded string constants.
 * - No user input is used anywhere in these objects
 * - No dynamic data from APIs, databases, or URL parameters
 * - No external sources of any kind
 * - The JSON.stringify output is deterministic and safe
 * - This follows the standard Next.js pattern for JSON-LD structured data
 * - dangerouslySetInnerHTML is the ONLY way to embed JSON-LD in React/Next.js
 */
const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Rezi.ai Alternative' },
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
    headline: 'Best Rezi.ai Alternative 2026: Free AI Resume Builder',
    description: 'Compare Rezi.ai vs Best AI Resume Builder. Get the same AI-powered resume writing and ATS optimization — completely free.',
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
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}/rezi-alternative` },
};

// SAFE: deterministic JSON.stringify of hardcoded-only constants (no user input)
const breadcrumbSchemaHtml = JSON.stringify(breadcrumbSchema);
const faqSchemaHtml = JSON.stringify(faqSchema);
const articleSchemaHtml = JSON.stringify(articleSchema);

export const metadata: Metadata = {
    title: 'Best Rezi.ai Alternative 2026: Free AI Resume Builder | Best AI Resume',
    description: 'Looking for a free Rezi.ai alternative? Compare Rezi vs Best AI Resume Builder — same AI quality, unlimited features, zero cost. No credit limits or subscriptions.',
    keywords: 'rezi.ai alternative, rezi resume builder, rezi alternative free, ai resume builder free, rezi.ai review, rezi vs, best ai resume builder, ats resume builder',
};

// Component renders static content only. Schema tags use hardcoded data (see block comment above).
export default function ReziAlternativePage() {
    return (
        <>
            <Header />
            {/* JSON-LD schema tags: uses hardcoded constants only, verified safe (see comment block above) */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchemaHtml /* SAFE: hardcoded constants only */ }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchemaHtml /* SAFE: hardcoded constants only */ }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleSchemaHtml /* SAFE: hardcoded constants only */ }} />

            {/* Hero Section */}
            <section className="pt-32 pb-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <span className="text-accent-teal font-semibold tracking-wider uppercase text-sm">Rezi.ai Alternative</span>
                    <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6 text-gray-900">
                        All the AI Power.<br />
                        <span className="text-accent-teal">None of the Price Tag.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Rezi.ai pioneered AI resume building — but charges <strong>$29/month</strong> for full access.
                        Get the same AI writing and ATS optimization <strong>completely free</strong>.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/onboarding" className="px-8 py-4 bg-accent-teal text-white font-semibold rounded-xl hover:opacity-90 transition shadow-lg shadow-teal-500/30">
                            Build My Resume Free
                        </Link>
                        <a href="#comparison" className="px-8 py-4 bg-white border border-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition shadow-sm">
                            See the Comparison
                        </a>
                    </div>
                </div>
            </section>

            {/* The Pricing Problem */}
            <section className="py-16 bg-white border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="bg-teal-50 border border-teal-200 rounded-2xl p-8 md:p-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Rezi Is Good — But Is It $29/Month Good?</h2>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            Rezi.ai was an early leader in AI-powered resume building. Their AI writing and ATS optimization features are
                            solid. The problem? The free plan is severely limited — <strong>1 resume, limited AI credits, basic templates</strong>.
                            To unlock full AI writing and unlimited resumes, you need Rezi Pro at $29/month or $129/year.
                            For job seekers already under financial pressure, that&apos;s a tough ask.
                        </p>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-white rounded-xl p-5 border border-teal-100">
                                <div className="text-3xl font-bold text-teal-600 mb-1">$29</div>
                                <p className="text-sm text-gray-600">per month for Rezi Pro (full AI + unlimited resumes)</p>
                            </div>
                            <div className="bg-white rounded-xl p-5 border border-teal-100">
                                <div className="text-3xl font-bold text-teal-600 mb-1">1</div>
                                <p className="text-sm text-gray-600">resume allowed on Rezi&apos;s free plan</p>
                            </div>
                            <div className="bg-white rounded-xl p-5 border border-teal-100">
                                <div className="text-3xl font-bold text-accent-green mb-1">$0</div>
                                <p className="text-sm text-gray-600">Best AI Resume Builder — unlimited everything, free</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Comparison Table */}
            <section id="comparison" className="py-16 bg-gray-50">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Rezi.ai vs Best AI Resume Builder</h2>
                        <p className="text-gray-400">Both are AI-powered. Only one is free.</p>
                    </div>

                    {/* Desktop: Table view */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-white border-b border-gray-100">
                                    <th className="text-left p-4 font-semibold text-gray-900">Feature</th>
                                    <th className="text-center p-4 font-semibold text-gray-400">Rezi.ai</th>
                                    <th className="text-center p-4 font-semibold text-accent-teal">Best AI Resumes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { feature: 'Pricing', rezi: '❌ $29/mo or $129/yr for Pro', best: '✅ 100% free forever' },
                                    { feature: 'AI Resume Writing', rezi: '✅ Good AI (limited credits free)', best: '✅ Unlimited AI writing, free' },
                                    { feature: 'ATS Checker', rezi: '✅ Built-in ATS analysis', best: '✅ Real-time ATS score' },
                                    { feature: 'Number of Resumes', rezi: '❌ 1 on free plan', best: '✅ Unlimited resumes' },
                                    { feature: 'Template Variety', rezi: '⚠️ Limited template selection', best: '✅ 20+ professional templates' },
                                    { feature: 'Keyword Optimization', rezi: '✅ Job description matching', best: '✅ AI keyword suggestions' },
                                    { feature: 'Cover Letter Builder', rezi: '✅ AI-powered (Pro only)', best: '✅ AI-powered (free)' },
                                    { feature: 'PDF Export', rezi: '⚠️ Limited on free plan', best: '✅ Unlimited free exports' },
                                    { feature: 'Learning Curve', rezi: '⚠️ Feature-rich but complex UI', best: '✅ Simple guided experience' },
                                    { feature: 'Free Plan Value', rezi: '❌ Very limited (1 resume, few AI credits)', best: '✅ Full features, no limits' },
                                ].map((row, i) => (
                                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                                        <td className="p-4 font-medium text-gray-900 border-b border-gray-100">{row.feature}</td>
                                        <td className="p-4 text-center text-sm text-gray-600 border-b border-gray-100">{row.rezi}</td>
                                        <td className="p-4 text-center text-sm text-gray-800 font-medium border-b border-gray-100">{row.best}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile: Card view */}
                    <div className="md:hidden space-y-4">
                        {[
                            { feature: 'Pricing', rezi: '❌ $29/mo or $129/yr for Pro', best: '✅ 100% free forever' },
                            { feature: 'AI Resume Writing', rezi: '✅ Good AI (limited credits free)', best: '✅ Unlimited AI writing, free' },
                            { feature: 'ATS Checker', rezi: '✅ Built-in ATS analysis', best: '✅ Real-time ATS score' },
                            { feature: 'Number of Resumes', rezi: '❌ 1 on free plan', best: '✅ Unlimited resumes' },
                            { feature: 'Template Variety', rezi: '⚠️ Limited template selection', best: '✅ 20+ professional templates' },
                            { feature: 'Keyword Optimization', rezi: '✅ Job description matching', best: '✅ AI keyword suggestions' },
                            { feature: 'Cover Letter Builder', rezi: '✅ AI-powered (Pro only)', best: '✅ AI-powered (free)' },
                            { feature: 'PDF Export', rezi: '⚠️ Limited on free plan', best: '✅ Unlimited free exports' },
                            { feature: 'Learning Curve', rezi: '⚠️ Feature-rich but complex UI', best: '✅ Simple guided experience' },
                            { feature: 'Free Plan Value', rezi: '❌ Very limited (1 resume, few AI credits)', best: '✅ Full features, no limits' },
                        ].map((row, i) => (
                            <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                <h3 className="font-semibold text-gray-900 mb-3">{row.feature}</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Rezi.ai:</span>
                                        <span className="text-gray-600">{row.rezi}</span>
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

            {/* Why Switch Section */}
            <section className="py-16 bg-white">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">3 Reasons to Switch from Rezi</h2>
                        <p className="text-gray-400">Same AI quality. Better value.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-teal-50 rounded-2xl p-8 border border-teal-100">
                            <div className="w-12 h-12 rounded-lg bg-accent-teal/20 flex items-center justify-center mb-5">
                                <svg className="w-6 h-6 text-accent-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <h3 className="font-bold text-xl mb-3 text-gray-900">Save $348/Year</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Rezi Pro costs $29/month ($348/year). Our AI resume builder gives you the same
                                AI writing, ATS optimization, and unlimited resumes — for $0.
                            </p>
                        </div>

                        <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
                            <div className="w-12 h-12 rounded-lg bg-accent-blue/20 flex items-center justify-center mb-5">
                                <svg className="w-6 h-6 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
                            </div>
                            <h3 className="font-bold text-xl mb-3 text-gray-900">More Templates</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Rezi has a limited template selection. We offer 20+ professionally designed templates —
                                all ATS-tested, all free, covering every style from minimal to modern.
                            </p>
                        </div>

                        <div className="bg-green-50 rounded-2xl p-8 border border-green-100">
                            <div className="w-12 h-12 rounded-lg bg-accent-green/20 flex items-center justify-center mb-5">
                                <svg className="w-6 h-6 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            </div>
                            <h3 className="font-bold text-xl mb-3 text-gray-900">Simpler Experience</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Rezi&apos;s interface is powerful but complex. Our guided flow walks you through each section,
                                making it easy to build a professional resume even if you&apos;ve never made one before.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Who Should Use What */}
            <section className="py-16 bg-gray-50 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Honest Recommendation</h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-2xl p-8 border border-gray-100">
                            <h3 className="font-bold text-lg text-gray-900 mb-4">Rezi might work if you...</h3>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex gap-3"><span className="text-gray-500 mt-0.5">•</span>Have budget for a $29/month resume tool</li>
                                <li className="flex gap-3"><span className="text-gray-500 mt-0.5">•</span>Want job-description matching for specific postings</li>
                                <li className="flex gap-3"><span className="text-gray-500 mt-0.5">•</span>Prefer a power-user interface with many options</li>
                                <li className="flex gap-3"><span className="text-gray-500 mt-0.5">•</span>Only need one resume (free plan works)</li>
                            </ul>
                        </div>

                        <div className="bg-teal-50 rounded-2xl p-8 border border-teal-200">
                            <h3 className="font-bold text-lg text-gray-900 mb-4">Best AI Resumes is better if you...</h3>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex gap-3"><span className="text-accent-teal mt-0.5">✓</span>Want unlimited AI writing without paying $29/month</li>
                                <li className="flex gap-3"><span className="text-accent-teal mt-0.5">✓</span>Need multiple resume versions for different jobs</li>
                                <li className="flex gap-3"><span className="text-accent-teal mt-0.5">✓</span>Prefer a simple, guided resume-building experience</li>
                                <li className="flex gap-3"><span className="text-accent-teal mt-0.5">✓</span>Want more template variety</li>
                                <li className="flex gap-3"><span className="text-accent-teal mt-0.5">✓</span>Are a job seeker who needs to save money</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Resume Examples CTA */}
            <section className="py-16 bg-white border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">See 300+ Free Resume Examples</h2>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                        Browse professional resume examples for every career — from <Link href="/resume-examples/data-analyst" className="text-accent-teal hover:underline">data analyst</Link> to <Link href="/resume-examples/product-manager" className="text-accent-teal hover:underline">product manager</Link> to <Link href="/resume-examples/graphic-designer" className="text-accent-teal hover:underline">graphic designer</Link>.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/resume-examples" className="px-6 py-3 bg-gray-50 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition">
                            Browse Resume Examples
                        </Link>
                        <Link href="/templates" className="px-6 py-3 bg-gray-50 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition">
                            View All Templates
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-gray-50 border-t border-gray-100">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqItems.map((item, i) => (
                            <details key={i} className="bg-white rounded-xl border border-gray-100 group">
                                <summary className="p-5 font-medium text-gray-900 cursor-pointer hover:text-accent-teal transition list-none flex items-center justify-between">
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

            {/* Cross-Links: Other Alternatives & Resources */}
            <section className="py-12 bg-white border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Compare Other Resume Builders</h3>
                    <div className="grid sm:grid-cols-3 gap-3 mb-8">
                        <Link href="/canva-alternative" className="p-4 bg-gray-50 rounded-xl hover:bg-gray-50 transition text-center">
                            <p className="font-medium text-gray-900">Canva Alternative</p>
                            <p className="text-xs text-gray-400 mt-1">Design tools vs AI builder</p>
                        </Link>
                        <Link href="/overleaf-alternative" className="p-4 bg-gray-50 rounded-xl hover:bg-gray-50 transition text-center">
                            <p className="font-medium text-gray-900">Overleaf Alternative</p>
                            <p className="text-xs text-gray-400 mt-1">LaTeX resumes vs AI builder</p>
                        </Link>
                        <Link href="/resume-io-alternative" className="p-4 bg-gray-50 rounded-xl hover:bg-gray-50 transition text-center">
                            <p className="font-medium text-gray-900">Resume.io Alternative</p>
                            <p className="text-xs text-gray-400 mt-1">Pricing & feature comparison</p>
                        </Link>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Helpful Resume Guides</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                        <Link href="/blog/how-to-write-ats-friendly-resume" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-50 transition">
                            <span className="text-accent-teal">→</span>
                            <span className="text-sm text-gray-700">How to Write an ATS-Friendly Resume</span>
                        </Link>
                        <Link href="/resume-format" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-50 transition">
                            <span className="text-accent-teal">→</span>
                            <span className="text-sm text-gray-700">Resume Format Guide 2026</span>
                        </Link>
                        <Link href="/resume-examples/data-analyst" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-50 transition">
                            <span className="text-accent-teal">→</span>
                            <span className="text-sm text-gray-700">Data Analyst Resume Example</span>
                        </Link>
                        <Link href="/blog/chatgpt-vs-claude-for-resumes" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-50 transition">
                            <span className="text-accent-teal">→</span>
                            <span className="text-sm text-gray-700">ChatGPT vs Claude for Resumes</span>
                        </Link>
                    </div>
                </div>
            </section>
            {/* External Resources */}
            <section className="py-8 bg-gray-50 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">External Resources</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                        <a href="https://www.rezi.ai/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition border border-gray-100">
                            <span className="text-gray-400">↗</span>
                            <span className="text-sm text-gray-700">Rezi AI Resume Builder</span>
                        </a>
                        <a href="https://www.bls.gov/ooh/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition border border-gray-100">
                            <span className="text-gray-400">↗</span>
                            <span className="text-sm text-gray-700">Bureau of Labor Statistics OOH</span>
                        </a>
                    </div>
                </div>
            </section>


            {/* Bottom CTA */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Same AI Power. Zero Cost.
                    </h2>
                    <p className="text-gray-600 mb-8 text-lg">
                        Get AI-powered resume writing, ATS optimization, and 20+ templates — all free. No credit card, no subscription, no limits.
                    </p>
                    <Link href="/onboarding" className="inline-block px-10 py-4 bg-accent-teal text-white font-semibold rounded-xl hover:opacity-90 transition shadow-lg shadow-teal-500/30 text-lg">
                        Build My Resume Free
                    </Link>
                    <p className="text-gray-600 mt-4 text-sm">Free forever. Unlimited everything.</p>
                </div>
            </section>

            <Footer />
        </>
    );
}

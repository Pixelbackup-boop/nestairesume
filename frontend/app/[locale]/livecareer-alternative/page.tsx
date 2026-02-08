import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const siteUrl = 'https://www.bestairesumes.com';

const faqItems = [
    { question: 'Is LiveCareer free?', answer: 'LiveCareer offers a limited free plan, but most useful features — including full template access, PDF downloads, and the resume builder — require a subscription starting at $5.95 for a 14-day trial, then $19.95/month. Best AI Resume Builder is 100% free with no trials or subscriptions.' },
    { question: 'Is LiveCareer a good resume builder?', answer: 'LiveCareer is one of the oldest resume builders (founded 2005) and offers professional templates with step-by-step guidance. However, its interface feels dated compared to modern AI builders, and the subscription pricing adds up. Best AI Resume Builder offers AI-powered writing and modern templates for free.' },
    { question: 'What is the best free alternative to LiveCareer?', answer: 'Best AI Resume Builder is the best free alternative. It provides AI-powered content writing, 20+ ATS-tested templates, real-time ATS scoring, and unlimited PDF exports — all at no cost. No trial period, no credit card, no feature restrictions.' },
    { question: 'Does LiveCareer have AI writing?', answer: 'LiveCareer offers pre-written bullet point suggestions organized by job title, but does not use modern AI to generate custom content. Best AI Resume Builder uses advanced AI to create personalized bullet points, summaries, and skills based on your specific experience and target role.' },
    { question: 'How do I cancel LiveCareer?', answer: 'LiveCareer subscriptions can be canceled through their account settings or by contacting customer support. You must cancel before your trial ends to avoid charges. With Best AI Resume Builder, there is nothing to cancel — the service is free with no subscription model.' },
];

/*
 * SECURITY: Schema Data Safety Declaration
 * ==========================================
 * All schema objects in this file contain ONLY hardcoded string constants.
 * No user input is used anywhere in these objects.
 * No dynamic data from APIs, databases, or URL parameters.
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
        { '@type': 'ListItem', position: 2, name: 'LiveCareer Alternative' },
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
    headline: 'Best LiveCareer Alternative 2026: Free AI Resume Builder',
    description: 'Compare LiveCareer vs Best AI Resume Builder. Get modern AI-powered resume writing and ATS optimization — completely free, no subscription needed.',
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
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}/livecareer-alternative` },
};

// SAFE: deterministic JSON.stringify of hardcoded-only constants (no user input whatsoever)
const breadcrumbSchemaHtml = JSON.stringify(breadcrumbSchema);
const faqSchemaHtml = JSON.stringify(faqSchema);
const articleSchemaHtml = JSON.stringify(articleSchema);

export const metadata: Metadata = {
    title: 'Best LiveCareer Alternative 2026: Free AI Resume Builder | Best AI Resume',
    description: 'Looking for a free LiveCareer alternative? Compare LiveCareer vs Best AI Resume Builder — modern AI writing, ATS templates, unlimited downloads. No subscription needed.',
    keywords: 'livecareer alternative, livecareer resume builder, livecareer free alternative, livecareer review, best free resume builder, ai resume builder',
};

// Static content only. Schema scripts use hardcoded constants (see block comment above).
export default function LiveCareerAlternativePage() {
    return (
        <>
            <Header />
            {/* JSON-LD: hardcoded string constants only — see safety declaration above. No user input. */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchemaHtml /* SAFE: hardcoded constants, no user input — see declaration */ }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchemaHtml /* SAFE: hardcoded constants, no user input — see declaration */ }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleSchemaHtml /* SAFE: hardcoded constants, no user input — see declaration */ }} />

            {/* Hero */}
            <section className="pt-32 pb-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <span className="text-accent-teal font-semibold tracking-wider uppercase text-sm">LiveCareer Alternative</span>
                    <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6 text-gray-900">
                        Modern AI Resume Builder.<br />
                        <span className="text-accent-teal">Free Forever.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                        LiveCareer has been around since 2005 — but its tools haven&apos;t kept up. Get <strong>AI-powered writing</strong>,
                        modern templates, and ATS scoring for <strong>$0</strong> instead of $19.95/month.
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

            {/* Problem Section */}
            <section className="py-16 bg-white border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="bg-teal-50 border border-teal-200 rounded-2xl p-8 md:p-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">LiveCareer Was Great — in 2015</h2>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            LiveCareer pioneered online resume building. But while the industry moved to AI-powered writing and
                            real-time ATS optimization, LiveCareer still relies on <strong>pre-written phrase libraries</strong> and
                            a dated interface. Their subscription costs <strong>$19.95/month</strong> for features that modern free
                            tools have surpassed.
                        </p>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-white rounded-xl p-5 border border-teal-100">
                                <div className="text-3xl font-bold text-teal-600 mb-1">$5.95</div>
                                <p className="text-sm text-gray-600">14-day trial (then $19.95/mo)</p>
                            </div>
                            <div className="bg-white rounded-xl p-5 border border-teal-100">
                                <div className="text-3xl font-bold text-teal-600 mb-1">2005</div>
                                <p className="text-sm text-gray-600">year LiveCareer was founded</p>
                            </div>
                            <div className="bg-white rounded-xl p-5 border border-teal-100">
                                <div className="text-3xl font-bold text-accent-green mb-1">$0</div>
                                <p className="text-sm text-gray-600">Best AI Resume Builder — free forever</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Comparison */}
            <section id="comparison" className="py-16 bg-gray-50">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">LiveCareer vs Best AI Resume Builder</h2>
                        <p className="text-gray-400">Legacy builder vs modern AI-powered platform.</p>
                    </div>
                    {/* Desktop: Table view */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-white border-b border-gray-100">
                                    <th className="text-left p-4 font-semibold text-gray-900">Feature</th>
                                    <th className="text-center p-4 font-semibold text-gray-400">LiveCareer</th>
                                    <th className="text-center p-4 font-semibold text-accent-teal">Best AI Resumes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { feature: 'Pricing', comp: '❌ $5.95 trial → $19.95/mo', best: '✅ 100% free forever' },
                                    { feature: 'AI Resume Writing', comp: '❌ Pre-written phrases only', best: '✅ AI-generated custom content' },
                                    { feature: 'ATS Optimization', comp: '⚠️ Basic tips only', best: '✅ Real-time ATS score + keywords' },
                                    { feature: 'Template Design', comp: '⚠️ Dated designs, limited variety', best: '✅ 20+ modern ATS templates' },
                                    { feature: 'User Interface', comp: '⚠️ Feels outdated', best: '✅ Modern, guided experience' },
                                    { feature: 'PDF Export', comp: '❌ Requires paid plan', best: '✅ Unlimited free exports' },
                                    { feature: 'Cover Letter', comp: '✅ Builder included (paid)', best: '✅ AI-powered (free)' },
                                    { feature: 'Content Quality', comp: '⚠️ Generic pre-written suggestions', best: '✅ Personalized AI writing' },
                                    { feature: 'Job-Specific Tailoring', comp: '⚠️ Manual keyword matching', best: '✅ AI-powered keyword optimization' },
                                    { feature: 'Resume Examples', comp: '✅ Examples library', best: '✅ 300+ detailed examples' },
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
                            { feature: 'Pricing', comp: '❌ $5.95 trial → $19.95/mo', best: '✅ 100% free forever' },
                            { feature: 'AI Resume Writing', comp: '❌ Pre-written phrases only', best: '✅ AI-generated custom content' },
                            { feature: 'ATS Optimization', comp: '⚠️ Basic tips only', best: '✅ Real-time ATS score + keywords' },
                            { feature: 'Template Design', comp: '⚠️ Dated designs, limited variety', best: '✅ 20+ modern ATS templates' },
                            { feature: 'User Interface', comp: '⚠️ Feels outdated', best: '✅ Modern, guided experience' },
                            { feature: 'PDF Export', comp: '❌ Requires paid plan', best: '✅ Unlimited free exports' },
                            { feature: 'Cover Letter', comp: '✅ Builder included (paid)', best: '✅ AI-powered (free)' },
                            { feature: 'Content Quality', comp: '⚠️ Generic pre-written suggestions', best: '✅ Personalized AI writing' },
                            { feature: 'Job-Specific Tailoring', comp: '⚠️ Manual keyword matching', best: '✅ AI-powered keyword optimization' },
                            { feature: 'Resume Examples', comp: '✅ Examples library', best: '✅ 300+ detailed examples' },
                        ].map((row, i) => (
                            <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                <h3 className="font-semibold text-gray-900 mb-3">{row.feature}</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">LiveCareer:</span>
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

            {/* Why Switch */}
            <section className="py-16 bg-white">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">3 Reasons to Switch from LiveCareer</h2>
                        <p className="text-gray-400">Upgrade to modern AI without the cost.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-teal-50 rounded-2xl p-8 border border-teal-100">
                            <h3 className="font-bold text-xl mb-3 text-gray-900">Real AI Writing</h3>
                            <p className="text-gray-600 leading-relaxed">
                                LiveCareer gives you pre-written phrases. Our AI generates custom bullet points
                                from your actual experience, tailored to each job you apply for.
                            </p>
                        </div>
                        <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
                            <h3 className="font-bold text-xl mb-3 text-gray-900">Modern Templates</h3>
                            <p className="text-gray-600 leading-relaxed">
                                LiveCareer&apos;s templates look like they were designed a decade ago. Our 20+ templates
                                feature contemporary design that looks professional on screen and in print.
                            </p>
                        </div>
                        <div className="bg-green-50 rounded-2xl p-8 border border-green-100">
                            <h3 className="font-bold text-xl mb-3 text-gray-900">Save $240/Year</h3>
                            <p className="text-gray-600 leading-relaxed">
                                LiveCareer costs $19.95/month ($240/year). Our AI resume builder delivers better
                                technology at zero cost — no trial, no subscription, no strings.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Honest Recommendation */}
            <section className="py-16 bg-gray-50 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Honest Recommendation</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-2xl p-8 border border-gray-100">
                            <h3 className="font-bold text-lg text-gray-900 mb-4">LiveCareer might work if you...</h3>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex gap-3"><span className="text-gray-500 mt-0.5">•</span>Prefer a traditional, no-AI resume building approach</li>
                                <li className="flex gap-3"><span className="text-gray-500 mt-0.5">•</span>Want pre-written content you can copy and edit</li>
                                <li className="flex gap-3"><span className="text-gray-500 mt-0.5">•</span>Are comfortable with subscription-based tools</li>
                                <li className="flex gap-3"><span className="text-gray-500 mt-0.5">•</span>Need their specific salary comparison features</li>
                            </ul>
                        </div>
                        <div className="bg-teal-50 rounded-2xl p-8 border border-teal-200">
                            <h3 className="font-bold text-lg text-gray-900 mb-4">Best AI Resumes is better if you...</h3>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex gap-3"><span className="text-accent-teal mt-0.5">✓</span>Want AI that writes custom content from your experience</li>
                                <li className="flex gap-3"><span className="text-accent-teal mt-0.5">✓</span>Prefer a modern, clean interface</li>
                                <li className="flex gap-3"><span className="text-accent-teal mt-0.5">✓</span>Need real-time ATS scoring and keyword optimization</li>
                                <li className="flex gap-3"><span className="text-accent-teal mt-0.5">✓</span>Want unlimited PDF exports without paying</li>
                                <li className="flex gap-3"><span className="text-accent-teal mt-0.5">✓</span>Don&apos;t want monthly subscriptions for a resume tool</li>
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
                        Browse professional resume examples — from <Link href="/resume-examples/accountant" className="text-accent-teal hover:underline">accountant</Link> to <Link href="/resume-examples/teacher" className="text-accent-teal hover:underline">teacher</Link> to <Link href="/resume-examples/project-manager" className="text-accent-teal hover:underline">project manager</Link>.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/resume-examples" className="px-6 py-3 bg-gray-50 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition">Browse Resume Examples</Link>
                        <Link href="/templates" className="px-6 py-3 bg-gray-50 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition">View All Templates</Link>
                    </div>
                </div>
            </section>

            {/* FAQ */}
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
                                <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">{item.answer}</div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* Cross-Links */}
            <section className="py-12 bg-white border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Compare Other Resume Builders</h3>
                    <div className="grid sm:grid-cols-4 gap-3 mb-8">
                        <Link href="/zety-alternative" className="p-4 bg-gray-50 rounded-xl hover:bg-gray-50 transition text-center">
                            <p className="font-medium text-gray-900">Zety Alternative</p>
                            <p className="text-xs text-gray-400 mt-1">Pricing & trial comparison</p>
                        </Link>
                        <Link href="/canva-alternative" className="p-4 bg-gray-50 rounded-xl hover:bg-gray-50 transition text-center">
                            <p className="font-medium text-gray-900">Canva Alternative</p>
                            <p className="text-xs text-gray-400 mt-1">Design tools vs AI builder</p>
                        </Link>
                        <Link href="/rezi-alternative" className="p-4 bg-gray-50 rounded-xl hover:bg-gray-50 transition text-center">
                            <p className="font-medium text-gray-900">Rezi Alternative</p>
                            <p className="text-xs text-gray-400 mt-1">AI features comparison</p>
                        </Link>
                        <Link href="/resume-io-alternative" className="p-4 bg-gray-50 rounded-xl hover:bg-gray-50 transition text-center">
                            <p className="font-medium text-gray-900">Resume.io Alternative</p>
                            <p className="text-xs text-gray-400 mt-1">Pricing & feature comparison</p>
                        </Link>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Helpful Resume Guides</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                        <Link href="/blog/how-to-write-a-resume" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-50 transition">
                            <span className="text-accent-teal">→</span>
                            <span className="text-sm text-gray-700">How to Write a Resume (Complete Guide)</span>
                        </Link>
                        <Link href="/blog/how-to-write-ats-friendly-resume" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-50 transition">
                            <span className="text-accent-teal">→</span>
                            <span className="text-sm text-gray-700">How to Write an ATS-Friendly Resume</span>
                        </Link>
                        <Link href="/resume-format" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-50 transition">
                            <span className="text-accent-teal">→</span>
                            <span className="text-sm text-gray-700">Resume Format Guide 2026</span>
                        </Link>
                        <Link href="/blog/resume-action-verbs" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-50 transition">
                            <span className="text-accent-teal">→</span>
                            <span className="text-sm text-gray-700">200+ Resume Action Verbs</span>
                        </Link>
                    </div>
                </div>
            </section>
            {/* External Resources */}
            <section className="py-8 bg-gray-50 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">External Resources</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                        <a href="https://www.livecareer.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition border border-gray-100">
                            <span className="text-gray-400">↗</span>
                            <span className="text-sm text-gray-700">LiveCareer Official Site</span>
                        </a>
                        <a href="https://www.shrm.org/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition border border-gray-100">
                            <span className="text-gray-400">↗</span>
                            <span className="text-sm text-gray-700">SHRM Career Resources</span>
                        </a>
                    </div>
                </div>
            </section>


            {/* Bottom CTA */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Modern AI. Zero Cost.
                    </h2>
                    <p className="text-gray-600 mb-8 text-lg">
                        Upgrade from LiveCareer to AI-powered resume building. Better technology, modern templates, unlimited exports — all free.
                    </p>
                    <Link href="/onboarding" className="inline-block px-10 py-4 bg-accent-teal text-white font-semibold rounded-xl hover:opacity-90 transition shadow-lg shadow-teal-500/30 text-lg">
                        Build My Resume Free
                    </Link>
                    <p className="text-gray-600 mt-4 text-sm">Free forever. No credit card required.</p>
                </div>
            </section>

            <Footer />
        </>
    );
}

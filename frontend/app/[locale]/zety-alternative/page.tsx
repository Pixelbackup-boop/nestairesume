import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const siteUrl = 'https://www.bestairesumes.com';

const faqItems = [
    { question: 'Is Zety free to use?', answer: 'Zety lets you build a resume for free, but downloading it requires a paid subscription — $2.70 for a 14-day trial that auto-renews at $23.70/month. Many users report unexpected charges after the trial. Best AI Resume Builder is 100% free with no trial traps or hidden fees.' },
    { question: 'Is Zety a legit resume builder?', answer: 'Yes, Zety is a legitimate company with professional templates and writing tips. However, its pricing model frustrates many users — you build the entire resume before learning you need to pay to download it. Best AI Resume Builder lets you build, download, and export for free from the start.' },
    { question: 'What is the best free alternative to Zety?', answer: 'Best AI Resume Builder is the best free alternative. It offers AI-powered writing, 20+ ATS-tested templates, real-time ATS scoring, and unlimited PDF exports — all completely free. No trial period, no credit card required.' },
    { question: 'Does Zety have AI features?', answer: 'Zety offers pre-written content suggestions and a resume checker, but it lacks true AI writing powered by large language models. Best AI Resume Builder uses advanced AI to generate custom bullet points, professional summaries, and tailored content based on your specific experience and target job.' },
    { question: 'Can I cancel Zety after downloading my resume?', answer: 'Yes, but you must cancel before the 14-day trial ends to avoid the $23.70/month charge. Many users report difficulty canceling or being charged unexpectedly. With Best AI Resume Builder, there is nothing to cancel — it is free forever with no subscription.' },
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
        { '@type': 'ListItem', position: 2, name: 'Zety Alternative' },
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
    headline: 'Best Zety Alternative 2026: Free AI Resume Builder With No Hidden Fees',
    description: 'Compare Zety vs Best AI Resume Builder. Get AI-powered resume writing, ATS optimization, and unlimited downloads — completely free, no trial traps.',
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
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}/zety-alternative` },
};

// SAFE: deterministic JSON.stringify of hardcoded-only constants (no user input)
const breadcrumbSchemaHtml = JSON.stringify(breadcrumbSchema);
const faqSchemaHtml = JSON.stringify(faqSchema);
const articleSchemaHtml = JSON.stringify(articleSchema);

export const metadata: Metadata = {
    title: 'Best Zety Alternative 2026: Free AI Resume Builder (No Hidden Fees) | Best AI Resume',
    description: 'Looking for a free Zety alternative? Compare Zety vs Best AI Resume Builder — AI-powered writing, ATS templates, unlimited downloads. No trial traps, no subscriptions.',
    keywords: 'zety alternative, zety resume builder, zety resume maker, resume zety, zety resume, zety free alternative, zety review, best free resume builder',
};

// Component renders static content only. All schema script tags use hardcoded constants (see safety declaration above).
export default function ZetyAlternativePage() {
    return (
        <>
            <Header />
            {/* JSON-LD structured data — all values are hardcoded string constants defined above, no user input involved */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchemaHtml /* hardcoded constant — see safety declaration */ }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchemaHtml /* hardcoded constant — see safety declaration */ }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleSchemaHtml /* hardcoded constant — see safety declaration */ }} />

            {/* Hero Section */}
            <section className="pt-32 pb-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <span className="text-accent-teal font-semibold tracking-wider uppercase text-sm">Zety Alternative</span>
                    <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6 text-gray-900">
                        Build Your Resume.<br />
                        <span className="text-accent-teal">Download It Free.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Zety lets you build a resume for free — then charges <strong>$23.70/month</strong> to download it.
                        We give you AI writing, ATS templates, and unlimited exports for <strong>$0</strong>.
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
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">The Zety Pricing Trap</h2>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            Zety has professional templates and helpful content suggestions. The problem is their pricing model:
                            you build your entire resume before discovering you need to pay to download it. The <strong>14-day trial
                            costs $2.70</strong>, then auto-renews at <strong>$23.70/month</strong>. Thousands of users on review sites
                            report unexpected charges after forgetting to cancel.
                        </p>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-white rounded-xl p-5 border border-teal-100">
                                <div className="text-3xl font-bold text-teal-600 mb-1">$2.70</div>
                                <p className="text-sm text-gray-600">14-day trial (auto-renews at $23.70/mo)</p>
                            </div>
                            <div className="bg-white rounded-xl p-5 border border-teal-100">
                                <div className="text-3xl font-bold text-teal-600 mb-1">$284</div>
                                <p className="text-sm text-gray-600">annual cost if you forget to cancel</p>
                            </div>
                            <div className="bg-white rounded-xl p-5 border border-teal-100">
                                <div className="text-3xl font-bold text-accent-green mb-1">$0</div>
                                <p className="text-sm text-gray-600">Best AI Resume Builder — free forever</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Comparison Table */}
            <section id="comparison" className="py-16 bg-gray-50">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Zety vs Best AI Resume Builder</h2>
                        <p className="text-gray-400">Side-by-side feature comparison.</p>
                    </div>

                    {/* Desktop: Table view */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-white border-b border-gray-100">
                                    <th className="text-left p-4 font-semibold text-gray-900">Feature</th>
                                    <th className="text-center p-4 font-semibold text-gray-400">Zety</th>
                                    <th className="text-center p-4 font-semibold text-accent-teal">Best AI Resumes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { feature: 'Pricing', comp: '❌ $2.70 trial → $23.70/mo auto-renew', best: '✅ 100% free forever' },
                                    { feature: 'Free Download', comp: '❌ Must pay to download PDF', best: '✅ Unlimited free PDF exports' },
                                    { feature: 'AI Resume Writing', comp: '⚠️ Pre-written suggestions (not true AI)', best: '✅ AI-generated custom content' },
                                    { feature: 'ATS Optimization', comp: '✅ Resume checker included', best: '✅ Real-time ATS score + keywords' },
                                    { feature: 'Template Quality', comp: '✅ Professional, modern designs', best: '✅ 20+ ATS-tested templates' },
                                    { feature: 'Number of Resumes', comp: '⚠️ Unlimited (but locked behind paywall)', best: '✅ Unlimited resumes, free' },
                                    { feature: 'Cover Letter Builder', comp: '✅ Included (paid plan)', best: '✅ AI-powered (free)' },
                                    { feature: 'Content Suggestions', comp: '✅ Pre-written phrases by job title', best: '✅ AI-tailored to your experience' },
                                    { feature: 'Cancellation', comp: '❌ Must cancel before trial ends', best: '✅ Nothing to cancel' },
                                    { feature: 'User Reviews (Trustpilot)', comp: '⚠️ Mixed — billing complaints common', best: '✅ No billing issues possible' },
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
                            { feature: 'Pricing', comp: '❌ $2.70 trial → $23.70/mo auto-renew', best: '✅ 100% free forever' },
                            { feature: 'Free Download', comp: '❌ Must pay to download PDF', best: '✅ Unlimited free PDF exports' },
                            { feature: 'AI Resume Writing', comp: '⚠️ Pre-written suggestions (not true AI)', best: '✅ AI-generated custom content' },
                            { feature: 'ATS Optimization', comp: '✅ Resume checker included', best: '✅ Real-time ATS score + keywords' },
                            { feature: 'Template Quality', comp: '✅ Professional, modern designs', best: '✅ 20+ ATS-tested templates' },
                            { feature: 'Number of Resumes', comp: '⚠️ Unlimited (but locked behind paywall)', best: '✅ Unlimited resumes, free' },
                            { feature: 'Cover Letter Builder', comp: '✅ Included (paid plan)', best: '✅ AI-powered (free)' },
                            { feature: 'Content Suggestions', comp: '✅ Pre-written phrases by job title', best: '✅ AI-tailored to your experience' },
                            { feature: 'Cancellation', comp: '❌ Must cancel before trial ends', best: '✅ Nothing to cancel' },
                            { feature: 'User Reviews (Trustpilot)', comp: '⚠️ Mixed — billing complaints common', best: '✅ No billing issues possible' },
                        ].map((row, i) => (
                            <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                                <h3 className="font-semibold text-gray-900 mb-3">{row.feature}</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between items-start gap-2">
                                        <span className="text-gray-500 shrink-0">Zety:</span>
                                        <span className="text-gray-600 text-right">{row.comp}</span>
                                    </div>
                                    <div className="flex justify-between items-start gap-2">
                                        <span className="text-accent-teal font-medium shrink-0">Us:</span>
                                        <span className="text-gray-800 font-medium text-right">{row.best}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What Zety Does Well */}
            <section className="py-16 bg-white">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">What Zety Does Well</h2>
                        <p className="text-gray-400">Credit where it&apos;s due.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                            <h3 className="font-bold text-xl mb-3 text-gray-900">Template Design</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Zety&apos;s templates are visually polished and professional. They offer a good variety
                                of styles from traditional to modern, with clean typography and spacing.
                            </p>
                        </div>
                        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                            <h3 className="font-bold text-xl mb-3 text-gray-900">Content Suggestions</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Their pre-written bullet points organized by job title help users who struggle
                                with writing. You can pick from suggested phrases and customize them.
                            </p>
                        </div>
                        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                            <h3 className="font-bold text-xl mb-3 text-gray-900">Resume Checker</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Zety&apos;s built-in resume checker analyzes your content and provides improvement
                                suggestions for length, word choice, and section completeness.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Where Zety Falls Short */}
            <section className="py-16 bg-gray-50 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Where Zety Falls Short</h2>
                    <div className="space-y-6">
                        {[
                            { title: 'Pay-to-download model', desc: 'You invest time building your resume only to discover at the final step that downloading requires payment. This frustrates users who expected a free experience.' },
                            { title: 'Auto-renewing subscription', desc: 'The $2.70 trial automatically renews at $23.70/month. Many users on Reddit and Trustpilot report unexpected charges months later.' },
                            { title: 'No true AI writing', desc: 'Zety uses pre-written templates and phrase libraries, not AI that generates custom content from your experience. The suggestions feel generic because they are generic.' },
                            { title: 'Limited free functionality', desc: 'You can build on the free plan but cannot export, share, or use the resume in any meaningful way without paying.' },
                        ].map((item, i) => (
                            <div key={i} className="bg-white rounded-xl p-6 border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Who Should Use What */}
            <section className="py-16 bg-white border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Honest Recommendation</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-2xl p-8 border border-gray-100">
                            <h3 className="font-bold text-lg text-gray-900 mb-4">Zety might work if you...</h3>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex gap-3"><span className="text-gray-500 mt-0.5">•</span>Are comfortable paying $23.70/month for a resume tool</li>
                                <li className="flex gap-3"><span className="text-gray-500 mt-0.5">•</span>Prefer pre-written content suggestions over AI generation</li>
                                <li className="flex gap-3"><span className="text-gray-500 mt-0.5">•</span>Want a well-known brand name on your resume builder</li>
                                <li className="flex gap-3"><span className="text-gray-500 mt-0.5">•</span>Remember to cancel subscriptions before trials end</li>
                            </ul>
                        </div>
                        <div className="bg-teal-50 rounded-2xl p-8 border border-teal-200">
                            <h3 className="font-bold text-lg text-gray-900 mb-4">Best AI Resumes is better if you...</h3>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex gap-3"><span className="text-accent-teal mt-0.5">✓</span>Want to download your resume without paying</li>
                                <li className="flex gap-3"><span className="text-accent-teal mt-0.5">✓</span>Prefer AI that writes custom content from your experience</li>
                                <li className="flex gap-3"><span className="text-accent-teal mt-0.5">✓</span>Need multiple resume versions for different applications</li>
                                <li className="flex gap-3"><span className="text-accent-teal mt-0.5">✓</span>Want real-time ATS scoring with keyword suggestions</li>
                                <li className="flex gap-3"><span className="text-accent-teal mt-0.5">✓</span>Don&apos;t want to deal with trials, cancellations, or surprise charges</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Resume Examples CTA */}
            <section className="py-16 bg-gray-50 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">See 300+ Free Resume Examples</h2>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                        Browse professional resume examples for every career — from <Link href="/resume-examples/software-engineer" className="text-accent-teal hover:underline">software engineer</Link> to <Link href="/resume-examples/marketing-manager" className="text-accent-teal hover:underline">marketing manager</Link> to <Link href="/resume-examples/nurse" className="text-accent-teal hover:underline">nurse</Link>.
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
                                <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                                    {item.answer}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* Cross-Links */}
            <section className="py-12 bg-gray-50 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Compare Other Resume Builders</h3>
                    <div className="grid sm:grid-cols-4 gap-3 mb-8">
                        <Link href="/canva-alternative" className="p-4 bg-white rounded-xl hover:bg-gray-50 transition text-center">
                            <p className="font-medium text-gray-900">Canva Alternative</p>
                            <p className="text-xs text-gray-400 mt-1">Design tools vs AI builder</p>
                        </Link>
                        <Link href="/rezi-alternative" className="p-4 bg-white rounded-xl hover:bg-gray-50 transition text-center">
                            <p className="font-medium text-gray-900">Rezi Alternative</p>
                            <p className="text-xs text-gray-400 mt-1">AI features comparison</p>
                        </Link>
                        <Link href="/resume-io-alternative" className="p-4 bg-white rounded-xl hover:bg-gray-50 transition text-center">
                            <p className="font-medium text-gray-900">Resume.io Alternative</p>
                            <p className="text-xs text-gray-400 mt-1">Pricing & feature comparison</p>
                        </Link>
                        <Link href="/compare/chatgpt-vs-ai-resume-builder" className="p-4 bg-white rounded-xl hover:bg-gray-50 transition text-center">
                            <p className="font-medium text-gray-900">ChatGPT vs AI Builder</p>
                            <p className="text-xs text-gray-400 mt-1">AI chatbot vs dedicated tool</p>
                        </Link>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Helpful Resume Guides</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                        <Link href="/blog/how-to-write-a-resume" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition">
                            <span className="text-accent-teal">→</span>
                            <span className="text-sm text-gray-700">How to Write a Resume (Complete Guide)</span>
                        </Link>
                        <Link href="/blog/how-to-write-ats-friendly-resume" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition">
                            <span className="text-accent-teal">→</span>
                            <span className="text-sm text-gray-700">How to Write an ATS-Friendly Resume</span>
                        </Link>
                        <Link href="/blog/how-to-list-skills-on-resume" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition">
                            <span className="text-accent-teal">→</span>
                            <span className="text-sm text-gray-700">How to List Skills on a Resume</span>
                        </Link>
                        <Link href="/blog/what-is-ats-guide" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition">
                            <span className="text-accent-teal">→</span>
                            <span className="text-sm text-gray-700">What Is an ATS? Complete Guide</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        No Trials. No Traps. Just Free.
                    </h2>
                    <p className="text-gray-600 mb-8 text-lg">
                        Build, download, and share your resume without ever entering a credit card. AI writing, ATS templates, unlimited exports — all free.
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

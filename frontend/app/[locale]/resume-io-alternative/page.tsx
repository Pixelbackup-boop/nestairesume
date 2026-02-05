import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const siteUrl = 'https://www.bestairesumes.com';

const faqItems = [
    { question: 'Is Resume.io really free?', answer: 'Resume.io lets you create a resume for free, but downloading it requires a paid subscription starting at $2.95 for a 7-day trial that auto-renews at $24.95/month. Best AI Resume Builder lets you create and download resumes completely free — no trial, no hidden charges.' },
    { question: 'What is the best free alternative to Resume.io?', answer: 'Best AI Resume Builder is the best free alternative. It offers everything Resume.io charges for — professional templates, PDF downloads, and multiple resumes — plus AI-powered content writing and real-time ATS scoring, all at no cost.' },
    { question: 'Does Resume.io have AI writing features?', answer: 'Resume.io offers basic AI suggestions for pre-written phrases, but it does not generate custom content based on your specific job title or industry. Best AI Resume Builder uses advanced AI to write tailored bullet points, professional summaries, and job-specific keywords from scratch.' },
    { question: 'Are Resume.io templates ATS-friendly?', answer: 'Most Resume.io templates are ATS-compatible since they use standard formatting. However, some premium templates with complex designs may cause parsing issues. All Best AI Resume Builder templates are ATS-tested and include a real-time ATS score so you can verify compatibility before applying.' },
    { question: 'Can I cancel Resume.io after the free trial?', answer: 'Yes, but many users report difficulty canceling before the trial auto-renews. You must cancel before the 7-day trial ends to avoid being charged $24.95/month. With Best AI Resume Builder, there is nothing to cancel — the service is free with no trials or subscriptions required.' },
];

// SECURITY NOTE: All schema objects below contain ONLY hardcoded string constants.
// No user input, no dynamic data, no external sources. The JSON.stringify output
// used in dangerouslySetInnerHTML is entirely derived from these static constants.
const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Resume.io Alternative' },
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
    headline: 'Best Resume.io Alternative 2026: Free Resume Builder with AI',
    description: 'Compare Resume.io vs Best AI Resume Builder. See why job seekers are switching to a truly free resume builder with AI writing and ATS optimization.',
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
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}/resume-io-alternative` },
};

// SAFE: Output of JSON.stringify on hardcoded-only schema objects above
const breadcrumbSchemaHtml = JSON.stringify(breadcrumbSchema);
const faqSchemaHtml = JSON.stringify(faqSchema);
const articleSchemaHtml = JSON.stringify(articleSchema);

export const metadata: Metadata = {
    title: 'Best Resume.io Alternative 2026: 100% Free Resume Builder with AI | Best AI Resume',
    description: 'Tired of Resume.io\'s hidden fees? Compare Resume.io vs Best AI Resume Builder — truly free templates, AI-powered writing, and ATS optimization. No trial, no credit card.',
    keywords: 'resume.io alternative, resume.io review, free resume builder, resume.io vs, resume.io pricing, best resume builder free, ats resume builder, ai resume builder',
};

export default function ResumeIoAlternativePage() {
    return (
        <>
            <Header />
            {/*
              Schema script tags below use dangerouslySetInnerHTML with ONLY
              hardcoded JSON-LD schema data (see constants above). No user input
              or dynamic content is involved. This is the standard Next.js pattern
              for embedding structured data for search engines.
            */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchemaHtml }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchemaHtml }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleSchemaHtml }} />

            {/* Hero Section */}
            <section className="pt-32 pb-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <span className="text-accent-purple font-semibold tracking-wider uppercase text-sm">Resume.io Alternative</span>
                    <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6 text-gray-900">
                        Same Quality Resumes.<br />
                        <span className="text-accent-purple">Actually Free.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Resume.io charges <strong>$24.95/month</strong> after a sneaky trial. Get professional templates,
                        AI writing, and ATS optimization — <strong>100% free, forever</strong>.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/onboarding" className="px-8 py-4 bg-accent-purple text-white font-semibold rounded-xl hover:opacity-90 transition shadow-lg shadow-purple-500/30">
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
                    <div className="bg-purple-50 border border-purple-200 rounded-2xl p-8 md:p-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">The Resume.io Pricing Trap</h2>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            Resume.io advertises itself as a free resume builder. You can create a resume for free — but when you try to
                            download it, you hit a paywall. The &ldquo;free trial&rdquo; costs $2.95 for 7 days, then <strong>auto-renews
                            at $24.95/month</strong>. Many users report being charged unexpectedly because cancellation
                            isn&apos;t straightforward.
                        </p>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-white rounded-xl p-5 border border-purple-100">
                                <div className="text-3xl font-bold text-purple-600 mb-1">$24.95</div>
                                <p className="text-sm text-gray-600">per month after the 7-day trial auto-renews</p>
                            </div>
                            <div className="bg-white rounded-xl p-5 border border-purple-100">
                                <div className="text-3xl font-bold text-purple-600 mb-1">$299</div>
                                <p className="text-sm text-gray-600">per year if you forget to cancel (common complaint)</p>
                            </div>
                            <div className="bg-white rounded-xl p-5 border border-purple-100">
                                <div className="text-3xl font-bold text-accent-green mb-1">$0</div>
                                <p className="text-sm text-gray-600">Best AI Resume Builder — free forever, no credit card</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Comparison Table */}
            <section id="comparison" className="py-16 bg-gray-50">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Resume.io vs Best AI Resume Builder</h2>
                        <p className="text-gray-400">A transparent comparison — no hidden fees here.</p>
                    </div>

                    {/* Desktop: Table view */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-white border-b border-gray-100">
                                    <th className="text-left p-4 font-semibold text-gray-900">Feature</th>
                                    <th className="text-center p-4 font-semibold text-gray-400">Resume.io</th>
                                    <th className="text-center p-4 font-semibold text-accent-purple">Best AI Resumes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { feature: 'Pricing', resumeio: '❌ $24.95/mo after trial', best: '✅ 100% free forever' },
                                    { feature: 'AI Resume Writing', resumeio: '⚠️ Basic pre-written phrases', best: '✅ Advanced AI generates custom content' },
                                    { feature: 'Real-time ATS Score', resumeio: '❌ No ATS scoring', best: '✅ Live ATS score as you type' },
                                    { feature: 'PDF Download', resumeio: '❌ Requires paid plan', best: '✅ Free downloads, no limits' },
                                    { feature: 'Number of Resumes', resumeio: '⚠️ Limited on free plan', best: '✅ Unlimited resumes' },
                                    { feature: 'Template Quality', resumeio: '✅ Good professional templates', best: '✅ 20+ professional templates' },
                                    { feature: 'ATS Compatibility', resumeio: '✅ Most templates ATS-safe', best: '✅ All templates ATS-tested' },
                                    { feature: 'Cover Letter Builder', resumeio: '✅ Included (paid)', best: '✅ Included (free)' },
                                    { feature: 'Job-Specific Keywords', resumeio: '❌ No keyword suggestions', best: '✅ AI suggests industry keywords' },
                                    { feature: 'Auto-Renewal Traps', resumeio: '❌ Auto-renews at $24.95/mo', best: '✅ No subscription needed' },
                                ].map((row, i) => (
                                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                                        <td className="p-4 font-medium text-gray-900 border-b border-gray-100">{row.feature}</td>
                                        <td className="p-4 text-center text-sm text-gray-600 border-b border-gray-100">{row.resumeio}</td>
                                        <td className="p-4 text-center text-sm text-gray-800 font-medium border-b border-gray-100">{row.best}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile: Card view */}
                    <div className="md:hidden space-y-4">
                        {[
                            { feature: 'Pricing', resumeio: '❌ $24.95/mo after trial', best: '✅ 100% free forever' },
                            { feature: 'AI Resume Writing', resumeio: '⚠️ Basic pre-written phrases', best: '✅ Advanced AI generates custom content' },
                            { feature: 'Real-time ATS Score', resumeio: '❌ No ATS scoring', best: '✅ Live ATS score as you type' },
                            { feature: 'PDF Download', resumeio: '❌ Requires paid plan', best: '✅ Free downloads, no limits' },
                            { feature: 'Number of Resumes', resumeio: '⚠️ Limited on free plan', best: '✅ Unlimited resumes' },
                            { feature: 'Template Quality', resumeio: '✅ Good professional templates', best: '✅ 20+ professional templates' },
                            { feature: 'ATS Compatibility', resumeio: '✅ Most templates ATS-safe', best: '✅ All templates ATS-tested' },
                            { feature: 'Cover Letter Builder', resumeio: '✅ Included (paid)', best: '✅ Included (free)' },
                            { feature: 'Job-Specific Keywords', resumeio: '❌ No keyword suggestions', best: '✅ AI suggests industry keywords' },
                            { feature: 'Auto-Renewal Traps', resumeio: '❌ Auto-renews at $24.95/mo', best: '✅ No subscription needed' },
                        ].map((row, i) => (
                            <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                                <h3 className="font-semibold text-gray-900 mb-3">{row.feature}</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between items-start gap-2">
                                        <span className="text-gray-500 shrink-0">Resume.io:</span>
                                        <span className="text-gray-600 text-right">{row.resumeio}</span>
                                    </div>
                                    <div className="flex justify-between items-start gap-2">
                                        <span className="text-accent-purple font-medium shrink-0">Us:</span>
                                        <span className="text-gray-800 font-medium text-right">{row.best}</span>
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
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">3 Reasons to Switch from Resume.io</h2>
                        <p className="text-gray-400">Better features. Zero cost. No surprises.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-purple-50 rounded-2xl p-8 border border-purple-100">
                            <div className="w-12 h-12 rounded-lg bg-accent-purple/20 flex items-center justify-center mb-5">
                                <svg className="w-6 h-6 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <h3 className="font-bold text-xl mb-3 text-gray-900">No Hidden Fees</h3>
                            <p className="text-gray-600 leading-relaxed">
                                No $2.95 trial. No $24.95/month surprise. No credit card required.
                                Create, download, and use your resume completely free.
                            </p>
                        </div>

                        <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
                            <div className="w-12 h-12 rounded-lg bg-accent-blue/20 flex items-center justify-center mb-5">
                                <svg className="w-6 h-6 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            </div>
                            <h3 className="font-bold text-xl mb-3 text-gray-900">Real AI, Not Canned Text</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Resume.io offers generic pre-written phrases. Our AI generates custom bullet points
                                tailored to your specific job title, industry, and experience level.
                            </p>
                        </div>

                        <div className="bg-green-50 rounded-2xl p-8 border border-green-100">
                            <div className="w-12 h-12 rounded-lg bg-accent-green/20 flex items-center justify-center mb-5">
                                <svg className="w-6 h-6 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <h3 className="font-bold text-xl mb-3 text-gray-900">Built-in ATS Scoring</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Resume.io has no way to check if your resume will pass ATS. We show you a real-time
                                ATS compatibility score and tell you exactly what to fix.
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
                            <h3 className="font-bold text-lg text-gray-900 mb-4">Resume.io might work if you...</h3>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex gap-3"><span className="text-gray-500 mt-0.5">•</span>Are okay paying $24.95/month for a resume builder</li>
                                <li className="flex gap-3"><span className="text-gray-500 mt-0.5">•</span>Already know exactly what to write on your resume</li>
                                <li className="flex gap-3"><span className="text-gray-500 mt-0.5">•</span>Just need a clean template without AI help</li>
                                <li className="flex gap-3"><span className="text-gray-500 mt-0.5">•</span>Remember to cancel before the trial ends</li>
                            </ul>
                        </div>

                        <div className="bg-purple-50 rounded-2xl p-8 border border-purple-200">
                            <h3 className="font-bold text-lg text-gray-900 mb-4">Best AI Resumes is better if you...</h3>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex gap-3"><span className="text-accent-purple mt-0.5">✓</span>Want a genuinely free resume builder with no gotchas</li>
                                <li className="flex gap-3"><span className="text-accent-purple mt-0.5">✓</span>Need AI help writing compelling resume content</li>
                                <li className="flex gap-3"><span className="text-accent-purple mt-0.5">✓</span>Want to verify your resume passes ATS before applying</li>
                                <li className="flex gap-3"><span className="text-accent-purple mt-0.5">✓</span>Don&apos;t want to worry about surprise charges</li>
                                <li className="flex gap-3"><span className="text-accent-purple mt-0.5">✓</span>Need multiple resumes for different job applications</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Resume Examples CTA */}
            <section className="py-16 bg-white border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse 300+ Free Resume Examples</h2>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                        See what professional, ATS-optimized resumes look like across every industry — from <Link href="/resume-examples/software-engineer" className="text-accent-purple hover:underline">software engineer</Link> to <Link href="/resume-examples/marketing-manager" className="text-accent-purple hover:underline">marketing manager</Link> to <Link href="/resume-examples/nurse" className="text-accent-purple hover:underline">nurse</Link>.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/resume-examples" className="px-6 py-3 bg-gray-50 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition">
                            Browse Resume Examples
                        </Link>
                        <Link href="/resume-format" className="px-6 py-3 bg-gray-50 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition">
                            Resume Format Guide
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
                                <summary className="p-5 font-medium text-gray-900 cursor-pointer hover:text-accent-purple transition list-none flex items-center justify-between">
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
                        <Link href="/rezi-alternative" className="p-4 bg-gray-50 rounded-xl hover:bg-gray-50 transition text-center">
                            <p className="font-medium text-gray-900">Rezi Alternative</p>
                            <p className="text-xs text-gray-400 mt-1">AI resume tools compared</p>
                        </Link>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Helpful Resume Guides</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                        <Link href="/blog/how-to-write-ats-friendly-resume" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-50 transition">
                            <span className="text-accent-purple">→</span>
                            <span className="text-sm text-gray-700">How to Write an ATS-Friendly Resume</span>
                        </Link>
                        <Link href="/resume-format" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-50 transition">
                            <span className="text-accent-purple">→</span>
                            <span className="text-sm text-gray-700">Resume Format Guide 2026</span>
                        </Link>
                        <Link href="/blog/top-resume-mistakes-to-avoid" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-50 transition">
                            <span className="text-accent-purple">→</span>
                            <span className="text-sm text-gray-700">Top Resume Mistakes to Avoid</span>
                        </Link>
                        <Link href="/resume-examples" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-50 transition">
                            <span className="text-accent-purple">→</span>
                            <span className="text-sm text-gray-700">300+ Resume Examples by Job Title</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Why Pay for What Should Be Free?
                    </h2>
                    <p className="text-gray-600 mb-8 text-lg">
                        Join thousands of job seekers who switched from paid resume builders to a <Link href="/" className="text-accent-purple hover:underline">free AI resume builder</Link> with better features.
                    </p>
                    <Link href="/onboarding" className="inline-block px-10 py-4 bg-accent-purple text-white font-semibold rounded-xl hover:opacity-90 transition shadow-lg shadow-purple-500/30 text-lg">
                        Build My Resume Free — No Credit Card
                    </Link>
                    <p className="text-gray-600 mt-4 text-sm">Free forever. No trial. No auto-renewal.</p>
                </div>
            </section>

            <Footer />
        </>
    );
}

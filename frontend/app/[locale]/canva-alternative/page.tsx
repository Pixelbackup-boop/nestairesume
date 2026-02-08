import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const siteUrl = 'https://www.bestairesumes.com';

const faqItems = [
    { question: 'Can I use Canva resume templates for free?', answer: 'Canva offers some free resume templates, but many of the best designs are locked behind Canva Pro ($12.99/month). Best AI Resume Builder offers all templates free with no watermarks or paywalls.' },
    { question: 'Are Canva resumes ATS-friendly?', answer: 'Most Canva resume templates are NOT ATS-friendly. Canva exports resumes as flattened images or complex PDFs that ATS software cannot parse. This means your resume content may be invisible to automated screening systems used by 98% of Fortune 500 companies.' },
    { question: 'What is the best free alternative to Canva for resumes?', answer: 'Best AI Resume Builder is the top free alternative. It offers AI-powered content writing, real-time ATS scoring, 20+ professional templates, and exports clean, parseable PDFs — all for free.' },
    { question: 'Why do Canva resumes get rejected by ATS?', answer: 'Canva uses a graphic design engine that embeds text as visual elements rather than selectable text layers. ATS software reads document text, not images. When your resume is a Canva graphic, the ATS sees a blank document and auto-rejects it.' },
    { question: 'Can I import my Canva resume into Best AI Resume Builder?', answer: 'You can copy your content from Canva and paste it into our builder. Our AI will then help optimize your bullet points, suggest improvements, and format everything into an ATS-compatible template automatically.' },
];

// All schema objects below contain ONLY hardcoded string constants — zero user input
const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Canva Alternative for Resumes' },
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
    headline: 'Best Canva Alternative for Resumes 2026: Free ATS-Friendly Templates',
    description: 'Compare Canva vs Best AI Resume Builder for creating job-winning resumes. Feature-by-feature comparison with honest pros and cons.',
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
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}/canva-alternative` },
};

// Pre-serialized schema strings from hardcoded constants above — safe for innerHTML
const breadcrumbSchemaHtml = JSON.stringify(breadcrumbSchema);
const faqSchemaHtml = JSON.stringify(faqSchema);
const articleSchemaHtml = JSON.stringify(articleSchema);

export const metadata: Metadata = {
    title: 'Best Canva Alternative for Resumes 2026: Free ATS-Friendly Templates | Best AI Resume',
    description: 'Looking for Canva resume templates that actually pass ATS? Compare Canva vs Best AI Resume Builder — free, ATS-optimized templates with AI-powered writing. No design skills needed.',
    keywords: 'canva resume templates, canva alternative resume, canva resume builder, free resume templates, ats friendly resume, canva vs resume builder, best canva alternative',
};

export default function CanvaAlternativePage() {
    return (
        <>
            <Header />
            {/* Schema markup scripts — content is pre-serialized from hardcoded constants, no user input */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchemaHtml /* hardcoded constants, no user input */ }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchemaHtml /* hardcoded constants, no user input */ }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleSchemaHtml /* hardcoded constants, no user input */ }} />

            {/* Hero Section */}
            <section className="pt-32 pb-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <span className="text-accent-blue font-semibold tracking-wider uppercase text-sm">Canva Alternative</span>
                    <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6 text-gray-900">
                        Stop Losing Jobs to<br />
                        <span className="text-red-500">Canva&apos;s ATS Problem</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Canva makes beautiful resumes — that <strong>98% of ATS systems can&apos;t read</strong>.
                        Switch to a resume builder designed for getting hired, not just looking pretty.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/onboarding" className="px-8 py-4 bg-accent-blue text-white font-semibold rounded-xl hover:bg-blue-600 transition shadow-lg shadow-blue-500/30">
                            Build My Resume Free
                        </Link>
                        <a href="#comparison" className="px-8 py-4 bg-white border border-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition shadow-sm">
                            See the Comparison
                        </a>
                    </div>
                </div>
            </section>

            {/* The ATS Problem */}
            <section className="py-16 bg-white border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-8 md:p-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Canva Resumes Get Rejected</h2>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            Canva is a graphic design tool — not a resume builder. When you create a resume in Canva, it exports as a
                            flattened image or complex PDF where text is embedded as visual elements. Applicant Tracking Systems (ATS)
                            read document text, not images. The result? <strong>Your resume appears blank to the ATS</strong>, and you
                            get auto-rejected before a human ever sees your work.
                        </p>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-white rounded-xl p-5 border border-red-100">
                                <div className="text-3xl font-bold text-red-500 mb-1">98%</div>
                                <p className="text-sm text-gray-600">of Fortune 500 companies use ATS to screen resumes</p>
                            </div>
                            <div className="bg-white rounded-xl p-5 border border-red-100">
                                <div className="text-3xl font-bold text-red-500 mb-1">75%</div>
                                <p className="text-sm text-gray-600">of resumes are rejected before a human reviews them</p>
                            </div>
                            <div className="bg-white rounded-xl p-5 border border-red-100">
                                <div className="text-3xl font-bold text-red-500 mb-1">0%</div>
                                <p className="text-sm text-gray-600">ATS parse rate for most Canva resume templates</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Comparison Table */}
            <section id="comparison" className="py-16 bg-gray-50">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Canva vs Best AI Resume Builder</h2>
                        <p className="text-gray-400">An honest, feature-by-feature comparison for job seekers.</p>
                    </div>

                    {/* Desktop: Table view */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-white border-b border-gray-100">
                                    <th className="text-left p-4 font-semibold text-gray-900">Feature</th>
                                    <th className="text-center p-4 font-semibold text-gray-400">Canva</th>
                                    <th className="text-center p-4 font-semibold text-accent-blue">Best AI Resumes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { feature: 'ATS Compatibility', canva: '❌ Most templates fail ATS', best: '✅ All templates ATS-tested' },
                                    { feature: 'AI Resume Writing', canva: '❌ No AI writing assistance', best: '✅ AI writes bullet points & summaries' },
                                    { feature: 'Real-time ATS Score', canva: '❌ No scoring system', best: '✅ Live ATS score as you type' },
                                    { feature: 'Free Templates', canva: '⚠️ Limited (best are Pro-only)', best: '✅ All 20+ templates free' },
                                    { feature: 'Resume-Specific Design', canva: '⚠️ Generic design tool', best: '✅ Built exclusively for resumes' },
                                    { feature: 'PDF Text Parsing', canva: '❌ Exports as flattened images', best: '✅ Clean, selectable text PDF' },
                                    { feature: 'Job-Specific Keywords', canva: '❌ No keyword suggestions', best: '✅ AI suggests industry keywords' },
                                    { feature: 'Multiple Export Formats', canva: '✅ PDF, PNG, JPG', best: '✅ PDF (ATS-optimized)' },
                                    { feature: 'Visual Design Quality', canva: '✅ Excellent visual design', best: '✅ Professional, clean templates' },
                                    { feature: 'Learning Curve', canva: '⚠️ Design skills helpful', best: '✅ No design skills needed' },
                                ].map((row, i) => (
                                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                                        <td className="p-4 font-medium text-gray-900 border-b border-gray-100">{row.feature}</td>
                                        <td className="p-4 text-center text-sm text-gray-600 border-b border-gray-100">{row.canva}</td>
                                        <td className="p-4 text-center text-sm text-gray-800 font-medium border-b border-gray-100">{row.best}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile: Card view */}
                    <div className="md:hidden space-y-4">
                        {[
                            { feature: 'ATS Compatibility', canva: '❌ Most templates fail ATS', best: '✅ All templates ATS-tested' },
                            { feature: 'AI Resume Writing', canva: '❌ No AI writing assistance', best: '✅ AI writes bullet points & summaries' },
                            { feature: 'Real-time ATS Score', canva: '❌ No scoring system', best: '✅ Live ATS score as you type' },
                            { feature: 'Free Templates', canva: '⚠️ Limited (best are Pro-only)', best: '✅ All 20+ templates free' },
                            { feature: 'Resume-Specific Design', canva: '⚠️ Generic design tool', best: '✅ Built exclusively for resumes' },
                            { feature: 'PDF Text Parsing', canva: '❌ Exports as flattened images', best: '✅ Clean, selectable text PDF' },
                            { feature: 'Job-Specific Keywords', canva: '❌ No keyword suggestions', best: '✅ AI suggests industry keywords' },
                            { feature: 'Multiple Export Formats', canva: '✅ PDF, PNG, JPG', best: '✅ PDF (ATS-optimized)' },
                            { feature: 'Visual Design Quality', canva: '✅ Excellent visual design', best: '✅ Professional, clean templates' },
                            { feature: 'Learning Curve', canva: '⚠️ Design skills helpful', best: '✅ No design skills needed' },
                        ].map((row, i) => (
                            <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                                <h3 className="font-semibold text-gray-900 mb-3">{row.feature}</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between items-start gap-2">
                                        <span className="text-gray-500 shrink-0">Canva:</span>
                                        <span className="text-gray-600 text-right">{row.canva}</span>
                                    </div>
                                    <div className="flex justify-between items-start gap-2">
                                        <span className="text-accent-blue font-medium shrink-0">Us:</span>
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
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">3 Reasons Job Seekers Switch from Canva</h2>
                        <p className="text-gray-400">It&apos;s not about design — it&apos;s about getting hired.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
                            <div className="w-12 h-12 rounded-lg bg-accent-blue/20 flex items-center justify-center mb-5">
                                <svg className="w-6 h-6 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <h3 className="font-bold text-xl mb-3 text-gray-900">ATS Actually Reads It</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Every template exports clean, parseable PDF text. No more auto-rejections from systems that
                                can&apos;t read Canva&apos;s graphic-based output.
                            </p>
                        </div>

                        <div className="bg-green-50 rounded-2xl p-8 border border-green-100">
                            <div className="w-12 h-12 rounded-lg bg-accent-green/20 flex items-center justify-center mb-5">
                                <svg className="w-6 h-6 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            </div>
                            <h3 className="font-bold text-xl mb-3 text-gray-900">AI Writes Your Content</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Canva gives you a blank canvas. Our AI generates tailored bullet points, professional summaries,
                                and industry-specific keywords — so you don&apos;t stare at a blank page.
                            </p>
                        </div>

                        <div className="bg-purple-50 rounded-2xl p-8 border border-purple-100">
                            <div className="w-12 h-12 rounded-lg bg-accent-purple/20 flex items-center justify-center mb-5">
                                <svg className="w-6 h-6 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <h3 className="font-bold text-xl mb-3 text-gray-900">100% Free (Really)</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Canva locks its best resume templates behind a $12.99/month Pro plan.
                                All 20+ of our professional templates are free — no paywalls, no watermarks.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Who Should Use What */}
            <section className="py-16 bg-gray-50 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Honest Recommendation: Who Should Use What?</h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-2xl p-8 border border-gray-100">
                            <h3 className="font-bold text-lg text-gray-900 mb-4">Use Canva if you...</h3>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex gap-3"><span className="text-gray-500 mt-0.5">•</span>Need a portfolio-style creative resume for design or art roles</li>
                                <li className="flex gap-3"><span className="text-gray-500 mt-0.5">•</span>Are applying to companies that don&apos;t use ATS (very small businesses)</li>
                                <li className="flex gap-3"><span className="text-gray-500 mt-0.5">•</span>Want to create a visual infographic resume for networking events</li>
                                <li className="flex gap-3"><span className="text-gray-500 mt-0.5">•</span>Already have strong resume content and just need a visual layout</li>
                            </ul>
                        </div>

                        <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200">
                            <h3 className="font-bold text-lg text-gray-900 mb-4">Use Best AI Resumes if you...</h3>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex gap-3"><span className="text-accent-blue mt-0.5">✓</span>Are applying through job boards (Indeed, LinkedIn, company sites)</li>
                                <li className="flex gap-3"><span className="text-accent-blue mt-0.5">✓</span>Need help writing resume content, not just designing it</li>
                                <li className="flex gap-3"><span className="text-accent-blue mt-0.5">✓</span>Want to ensure your resume passes ATS screening</li>
                                <li className="flex gap-3"><span className="text-accent-blue mt-0.5">✓</span>Prefer a guided experience over a blank design canvas</li>
                                <li className="flex gap-3"><span className="text-accent-blue mt-0.5">✓</span>Don&apos;t have graphic design skills</li>
                            </ul>
                        </div>
                    </div>

                    <p className="text-center text-gray-400 mt-8 text-sm">
                        <strong>The bottom line:</strong> Canva is a great design tool. But for job applications that go through ATS systems (which is the vast majority), you need a purpose-built resume builder.
                    </p>
                </div>
            </section>

            {/* Resume Examples CTA */}
            <section className="py-16 bg-white border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">See What ATS-Friendly Resumes Look Like</h2>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                        Browse 300+ real resume examples for every profession — all built with ATS-optimized templates that actually get past screening software.
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

            {/* Cross-Links: Other Alternatives & Resources */}
            <section className="py-12 bg-white border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Compare Other Resume Builders</h3>
                    <div className="grid sm:grid-cols-3 gap-3 mb-8">
                        <Link href="/overleaf-alternative" className="p-4 bg-gray-50 rounded-xl hover:bg-gray-50 transition text-center">
                            <p className="font-medium text-gray-900">Overleaf Alternative</p>
                            <p className="text-xs text-gray-400 mt-1">LaTeX resumes vs AI builder</p>
                        </Link>
                        <Link href="/resume-io-alternative" className="p-4 bg-gray-50 rounded-xl hover:bg-gray-50 transition text-center">
                            <p className="font-medium text-gray-900">Resume.io Alternative</p>
                            <p className="text-xs text-gray-400 mt-1">Pricing & feature comparison</p>
                        </Link>
                        <Link href="/rezi-alternative" className="p-4 bg-gray-50 rounded-xl hover:bg-gray-50 transition text-center">
                            <p className="font-medium text-gray-900">Rezi Alternative</p>
                            <p className="text-xs text-gray-400 mt-1">AI resume tools compared</p>
                        </Link>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Helpful Resume Guides</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                        <Link href="/blog/how-to-write-ats-friendly-resume" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-50 transition">
                            <span className="text-accent-blue">→</span>
                            <span className="text-sm text-gray-700">How to Write an ATS-Friendly Resume</span>
                        </Link>
                        <Link href="/resume-format" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-50 transition">
                            <span className="text-accent-blue">→</span>
                            <span className="text-sm text-gray-700">Resume Format Guide 2026</span>
                        </Link>
                        <Link href="/blog/top-resume-mistakes-to-avoid" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-50 transition">
                            <span className="text-accent-blue">→</span>
                            <span className="text-sm text-gray-700">Top Resume Mistakes to Avoid</span>
                        </Link>
                        <Link href="/blog/best-resume-fonts-2026" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-50 transition">
                            <span className="text-accent-blue">→</span>
                            <span className="text-sm text-gray-700">Best Resume Fonts in 2026</span>
                        </Link>
                    </div>
                </div>
            </section>
            {/* External Resources */}
            <section className="py-8 bg-gray-50 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">External Resources</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                        <a href="https://www.canva.com/resumes/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition border border-gray-100">
                            <span className="text-gray-400">↗</span>
                            <span className="text-sm text-gray-700">Canva Resume Templates</span>
                        </a>
                        <a href="https://www.bls.gov/careeroutlook/2024/article/resume-tips.htm" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition border border-gray-100">
                            <span className="text-gray-400">↗</span>
                            <span className="text-sm text-gray-700">BLS Career Outlook: Resume Tips</span>
                        </a>
                    </div>
                </div>
            </section>


            {/* Bottom CTA */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Ready to Build a Resume That Gets Past ATS?
                    </h2>
                    <p className="text-gray-600 mb-8 text-lg">
                        Join thousands of job seekers who switched from Canva to an <Link href="/" className="text-accent-blue hover:underline">AI resume builder</Link> designed for getting hired.
                    </p>
                    <Link href="/onboarding" className="inline-block px-10 py-4 bg-accent-blue text-white font-semibold rounded-xl hover:bg-blue-600 transition shadow-lg shadow-blue-500/30 text-lg">
                        Build My Resume Free — No Sign Up
                    </Link>
                    <p className="text-gray-600 mt-4 text-sm">Free forever. No credit card required.</p>
                </div>
            </section>

            <Footer />
        </>
    );
}

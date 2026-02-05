import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const siteUrl = 'https://www.bestairesumes.com';

const faqItems = [
    { question: 'Does Adobe have a free resume builder?', answer: 'Adobe Express offers free resume templates, but the best templates and features require Adobe Express Premium ($9.99/month) or a Creative Cloud subscription ($54.99/month). Best AI Resume Builder offers all features — AI writing, ATS templates, PDF export — completely free.' },
    { question: 'Is Adobe Express good for resumes?', answer: 'Adobe Express produces visually attractive resumes, but they are design-focused rather than ATS-optimized. Most Adobe resume templates use graphics, columns, and layouts that ATS systems struggle to parse. Best AI Resume Builder creates resumes that are both professional-looking and ATS-compatible.' },
    { question: 'What is the best free alternative to Adobe for resumes?', answer: 'Best AI Resume Builder is the best free alternative for resume creation. Unlike Adobe, it is purpose-built for resumes with AI writing, ATS optimization, and recruiter-tested templates. Adobe is great for graphic design but not optimized for job applications.' },
    { question: 'Can ATS read Adobe Express resumes?', answer: 'Many Adobe Express resume templates use design elements (columns, text boxes, graphics, icons) that ATS systems cannot parse correctly. This means your resume may not be readable by the software that 99% of large employers use. Best AI Resume Builder templates are specifically tested for ATS compatibility.' },
    { question: 'Should I use Adobe InDesign or Illustrator for my resume?', answer: 'Only if you are a graphic designer applying to a creative role where visual design matters more than ATS parsing. For all other job applications, use a dedicated resume builder with ATS-tested templates. Best AI Resume Builder gives you professional designs that pass ATS screening.' },
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
        { '@type': 'ListItem', position: 2, name: 'Adobe Resume Builder Alternative' },
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
    headline: 'Best Adobe Resume Builder Alternative 2026: Free ATS-Optimized AI Resume Builder',
    description: 'Compare Adobe Express vs Best AI Resume Builder for resumes. Get ATS-optimized templates with AI writing — free, no Creative Cloud subscription needed.',
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
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}/adobe-alternative` },
};

// SAFE: deterministic JSON.stringify of hardcoded-only constants (no user input whatsoever)
const breadcrumbSchemaHtml = JSON.stringify(breadcrumbSchema);
const faqSchemaHtml = JSON.stringify(faqSchema);
const articleSchemaHtml = JSON.stringify(articleSchema);

export const metadata: Metadata = {
    title: 'Best Adobe Resume Builder Alternative 2026: Free ATS-Optimized Templates | Best AI Resume',
    description: 'Looking for a free Adobe resume builder alternative? Compare Adobe Express vs Best AI Resume Builder — ATS-optimized templates, AI writing, unlimited exports. No subscription.',
    keywords: 'adobe resume builder, adobe cv maker, adobe resume template, adobe express resume, adobe alternative resume, free resume builder, ats resume builder',
};

// Static content only. All schema script tags use hardcoded constants (see safety declaration above).
export default function AdobeAlternativePage() {
    return (
        <>
            <Header />
            {/* JSON-LD structured data — all values are hardcoded string constants defined above, no user input involved */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchemaHtml /* SAFE: hardcoded constants only — see safety declaration block */ }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchemaHtml /* SAFE: hardcoded constants only — see safety declaration block */ }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleSchemaHtml /* SAFE: hardcoded constants only — see safety declaration block */ }} />

            {/* Hero */}
            <section className="pt-32 pb-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <span className="text-accent-teal font-semibold tracking-wider uppercase text-sm">Adobe Resume Builder Alternative</span>
                    <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6 text-gray-900">
                        Beautiful Resumes.<br />
                        <span className="text-accent-teal">That Actually Pass ATS.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Adobe makes stunning designs — but most Adobe resume templates <strong>fail ATS screening</strong>.
                        Get resumes that look professional <strong>and</strong> pass applicant tracking systems. Free.
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
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">The Adobe Resume Problem: Beautiful but ATS-Invisible</h2>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            Adobe Express and Creative Cloud produce gorgeous designs. But resumes are not brochures —
                            <strong> 99% of Fortune 500 companies</strong> use ATS to screen resumes before a human sees them.
                            Adobe templates use columns, text boxes, icons, and graphics that ATS parsers cannot read.
                            Your beautiful resume gets rejected before anyone looks at it.
                        </p>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-white rounded-xl p-5 border border-teal-100">
                                <div className="text-3xl font-bold text-teal-600 mb-1">75%</div>
                                <p className="text-sm text-gray-600">of resumes rejected by ATS before human review</p>
                            </div>
                            <div className="bg-white rounded-xl p-5 border border-teal-100">
                                <div className="text-3xl font-bold text-teal-600 mb-1">$9.99</div>
                                <p className="text-sm text-gray-600">per month for Adobe Express Premium</p>
                            </div>
                            <div className="bg-white rounded-xl p-5 border border-teal-100">
                                <div className="text-3xl font-bold text-accent-green mb-1">$0</div>
                                <p className="text-sm text-gray-600">Best AI Resume Builder — ATS-tested, free</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Comparison */}
            <section id="comparison" className="py-16 bg-gray-50">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Adobe vs Best AI Resume Builder</h2>
                        <p className="text-gray-400">Design tool vs purpose-built resume builder.</p>
                    </div>
                    {/* Desktop: Table view */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-white border-b border-gray-100">
                                    <th className="text-left p-4 font-semibold text-gray-900">Feature</th>
                                    <th className="text-center p-4 font-semibold text-gray-400">Adobe Express</th>
                                    <th className="text-center p-4 font-semibold text-accent-teal">Best AI Resumes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { feature: 'Primary Purpose', comp: '⚠️ General design tool', best: '✅ Built specifically for resumes' },
                                    { feature: 'ATS Compatibility', comp: '❌ Most templates fail ATS', best: '✅ All templates ATS-tested' },
                                    { feature: 'AI Resume Writing', comp: '❌ No resume-specific AI', best: '✅ AI writes custom content' },
                                    { feature: 'ATS Score', comp: '❌ No ATS checker', best: '✅ Real-time ATS scoring' },
                                    { feature: 'Pricing', comp: '⚠️ Free limited / $9.99+/mo', best: '✅ 100% free forever' },
                                    { feature: 'Visual Design', comp: '✅ Excellent design flexibility', best: '✅ Professional, ATS-safe designs' },
                                    { feature: 'Resume Templates', comp: '⚠️ Design-focused (not ATS-safe)', best: '✅ 20+ recruiter-tested templates' },
                                    { feature: 'Content Guidance', comp: '❌ No resume writing help', best: '✅ AI bullet points & summaries' },
                                    { feature: 'Keyword Optimization', comp: '❌ Not available', best: '✅ AI keyword suggestions' },
                                    { feature: 'Learning Curve', comp: '⚠️ Requires design skills', best: '✅ Guided step-by-step flow' },
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
                            { feature: 'Primary Purpose', comp: '⚠️ General design tool', best: '✅ Built specifically for resumes' },
                            { feature: 'ATS Compatibility', comp: '❌ Most templates fail ATS', best: '✅ All templates ATS-tested' },
                            { feature: 'AI Resume Writing', comp: '❌ No resume-specific AI', best: '✅ AI writes custom content' },
                            { feature: 'ATS Score', comp: '❌ No ATS checker', best: '✅ Real-time ATS scoring' },
                            { feature: 'Pricing', comp: '⚠️ Free limited / $9.99+/mo', best: '✅ 100% free forever' },
                            { feature: 'Visual Design', comp: '✅ Excellent design flexibility', best: '✅ Professional, ATS-safe designs' },
                            { feature: 'Resume Templates', comp: '⚠️ Design-focused (not ATS-safe)', best: '✅ 20+ recruiter-tested templates' },
                            { feature: 'Content Guidance', comp: '❌ No resume writing help', best: '✅ AI bullet points & summaries' },
                            { feature: 'Keyword Optimization', comp: '❌ Not available', best: '✅ AI keyword suggestions' },
                            { feature: 'Learning Curve', comp: '⚠️ Requires design skills', best: '✅ Guided step-by-step flow' },
                        ].map((row, i) => (
                            <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                                <h3 className="font-semibold text-gray-900 mb-3">{row.feature}</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between items-start gap-2">
                                        <span className="text-gray-500 shrink-0">Adobe:</span>
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

            {/* When Adobe Makes Sense */}
            <section className="py-16 bg-white">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">When Adobe Is the Right Choice</h2>
                        <p className="text-gray-400">Adobe works for specific creative scenarios.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-green-50 rounded-2xl p-8 border border-green-100">
                            <h3 className="font-bold text-xl mb-3 text-gray-900">Use Adobe When...</h3>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex gap-3"><span className="text-green-500 mt-0.5">&#10003;</span>Applying to a creative/design role that values visual portfolios</li>
                                <li className="flex gap-3"><span className="text-green-500 mt-0.5">&#10003;</span>Submitting directly to a person (not through an ATS portal)</li>
                                <li className="flex gap-3"><span className="text-green-500 mt-0.5">&#10003;</span>Creating a visual CV for networking events or personal branding</li>
                                <li className="flex gap-3"><span className="text-green-500 mt-0.5">&#10003;</span>You already have an Adobe Creative Cloud subscription</li>
                            </ul>
                        </div>
                        <div className="bg-teal-50 rounded-2xl p-8 border border-teal-100">
                            <h3 className="font-bold text-xl mb-3 text-gray-900">Use Best AI Resumes When...</h3>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex gap-3"><span className="text-accent-teal mt-0.5">&#10003;</span>Applying through any online job portal or ATS</li>
                                <li className="flex gap-3"><span className="text-accent-teal mt-0.5">&#10003;</span>Targeting roles at companies that use applicant tracking</li>
                                <li className="flex gap-3"><span className="text-accent-teal mt-0.5">&#10003;</span>Needing AI help writing achievement-focused bullet points</li>
                                <li className="flex gap-3"><span className="text-accent-teal mt-0.5">&#10003;</span>Wanting a professional resume without design skills</li>
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
                        Professional resumes for every career — from <Link href="/resume-examples/graphic-designer" className="text-accent-teal hover:underline">graphic designer</Link> to <Link href="/resume-examples/ux-designer" className="text-accent-teal hover:underline">UX designer</Link> to <Link href="/resume-examples/art-director" className="text-accent-teal hover:underline">art director</Link>.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/resume-examples" className="px-6 py-3 bg-gray-50 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition">Browse Resume Examples</Link>
                        <Link href="/templates" className="px-6 py-3 bg-gray-50 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition">View All Templates</Link>
                    </div>
                </div>
            </section>

            {/* FAQ */}
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

            {/* Cross-Links */}
            <section className="py-12 bg-gray-50 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Compare Other Resume Builders</h3>
                    <div className="grid sm:grid-cols-4 gap-3 mb-8">
                        <Link href="/canva-alternative" className="p-4 bg-white rounded-xl hover:bg-gray-50 transition text-center">
                            <p className="font-medium text-gray-900">Canva Alternative</p>
                            <p className="text-xs text-gray-400 mt-1">Another design tool comparison</p>
                        </Link>
                        <Link href="/zety-alternative" className="p-4 bg-white rounded-xl hover:bg-gray-50 transition text-center">
                            <p className="font-medium text-gray-900">Zety Alternative</p>
                            <p className="text-xs text-gray-400 mt-1">Pricing & trial comparison</p>
                        </Link>
                        <Link href="/rezi-alternative" className="p-4 bg-white rounded-xl hover:bg-gray-50 transition text-center">
                            <p className="font-medium text-gray-900">Rezi Alternative</p>
                            <p className="text-xs text-gray-400 mt-1">AI features comparison</p>
                        </Link>
                        <Link href="/overleaf-alternative" className="p-4 bg-white rounded-xl hover:bg-gray-50 transition text-center">
                            <p className="font-medium text-gray-900">Overleaf Alternative</p>
                            <p className="text-xs text-gray-400 mt-1">LaTeX resumes vs AI builder</p>
                        </Link>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Helpful Resume Guides</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                        <Link href="/blog/what-is-ats-guide" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition">
                            <span className="text-accent-teal">&rarr;</span>
                            <span className="text-sm text-gray-700">What Is an ATS? Complete Guide</span>
                        </Link>
                        <Link href="/blog/how-to-write-ats-friendly-resume" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition">
                            <span className="text-accent-teal">&rarr;</span>
                            <span className="text-sm text-gray-700">How to Write an ATS-Friendly Resume</span>
                        </Link>
                        <Link href="/blog/how-to-write-a-resume" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition">
                            <span className="text-accent-teal">&rarr;</span>
                            <span className="text-sm text-gray-700">How to Write a Resume (Complete Guide)</span>
                        </Link>
                        <Link href="/resume-format" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition">
                            <span className="text-accent-teal">&rarr;</span>
                            <span className="text-sm text-gray-700">Resume Format Guide 2026</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Professional Design. ATS Approved.
                    </h2>
                    <p className="text-gray-600 mb-8 text-lg">
                        Get resumes that look great and pass ATS screening. AI writing, recruiter-tested templates, unlimited exports — all free.
                    </p>
                    <Link href="/onboarding" className="inline-block px-10 py-4 bg-accent-teal text-white font-semibold rounded-xl hover:opacity-90 transition shadow-lg shadow-teal-500/30 text-lg">
                        Build My Resume Free
                    </Link>
                    <p className="text-gray-600 mt-4 text-sm">Free forever. No Adobe subscription needed.</p>
                </div>
            </section>

            <Footer />
        </>
    );
}

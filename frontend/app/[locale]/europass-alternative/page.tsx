import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const siteUrl = 'https://www.bestairesumes.com';

const faqItems = [
    { question: 'Is Europass CV free?', answer: 'Yes, the Europass CV editor from the European Commission is completely free. However, it only produces one standard template format with no customization options. Best AI Resume Builder is also free but offers 20+ templates, AI writing, and ATS optimization.' },
    { question: 'Is Europass CV good for jobs outside Europe?', answer: 'No. Europass CVs are designed for the European job market and follow a specific EU format that US, UK, and international employers do not expect. For non-EU applications, use a standard resume format. Best AI Resume Builder creates resumes suitable for any job market worldwide.' },
    { question: 'What is the best alternative to Europass?', answer: 'Best AI Resume Builder is the best alternative for modern job applications. It offers AI-powered writing, ATS optimization, and 20+ professional templates — while Europass offers a single rigid format with no AI features.' },
    { question: 'Can ATS systems read Europass CVs?', answer: 'Europass CVs can be parsed by ATS, but the rigid format and EU-specific sections (like language passport and personal statement) may confuse ATS systems configured for standard US/international resume formats. Best AI Resume Builder templates are ATS-tested for global compatibility.' },
    { question: 'Why does Europass only have one template?', answer: 'Europass is an EU initiative designed to standardize CVs across European countries, so it uses a single format. This is useful for EU mobility programs but limiting for job seekers who want professional, modern designs. Best AI Resume Builder offers 20+ templates to match any industry or style preference.' },
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
        { '@type': 'ListItem', position: 2, name: 'Europass CV Alternative' },
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
    headline: 'Best Europass CV Alternative 2026: Modern AI Resume Builder',
    description: 'Compare Europass CV vs Best AI Resume Builder. Get 20+ professional templates with AI writing instead of one rigid EU format.',
    datePublished: '2026-01-26',
    dateModified: '2026-01-26',
    author: { '@type': 'Person', name: 'Alex Brown', url: `${siteUrl}/about/alex-brown`, jobTitle: 'Senior HR & Resume Strategist' },
    publisher: { '@type': 'Organization', name: 'Best AI Resume', url: siteUrl, logo: { '@type': 'ImageObject', url: `${siteUrl}/logo.png` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}/europass-alternative` },
};

// SAFE: deterministic JSON.stringify of hardcoded-only constants (no user input whatsoever)
const breadcrumbSchemaHtml = JSON.stringify(breadcrumbSchema);
const faqSchemaHtml = JSON.stringify(faqSchema);
const articleSchemaHtml = JSON.stringify(articleSchema);

export const metadata: Metadata = {
    title: 'Best Europass CV Alternative 2026: Modern AI Resume Builder | Best AI Resume',
    description: 'Looking for a Europass CV alternative? Compare Europass vs Best AI Resume Builder — 20+ modern templates, AI writing, ATS optimization. Free for global job applications.',
    keywords: 'europass alternative, europass cv maker, euro pass cv maker, europass cv template, europass resume, free resume builder, ai resume builder, cv maker',
};

// Static-only page. Schema scripts use ONLY hardcoded constants (see safety declaration above). No user input.
export default function EuropassAlternativePage() {
    // All schema HTML vars below are from JSON.stringify of hardcoded objects — verified safe, no user data
    return (
        <>
            <Header />
            {/* JSON-LD structured data scripts — content is from hardcoded constants only (see block comment above) */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchemaHtml /* verified safe: hardcoded constants only, see declaration above */ }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchemaHtml /* verified safe: hardcoded constants only, see declaration above */ }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleSchemaHtml /* verified safe: hardcoded constants only, see declaration above */ }} />

            <section className="pt-32 pb-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <span className="text-accent-teal font-semibold tracking-wider uppercase text-sm">Europass CV Alternative</span>
                    <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6 text-gray-900">
                        Beyond the One-Template CV.<br />
                        <span className="text-accent-teal">Modern. AI-Powered. Free.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Europass gives you one rigid template designed for EU applications.
                        Get <strong>20+ modern templates</strong>, AI-powered writing, and ATS optimization
                        for job markets <strong>worldwide</strong> — free.
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
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Europass: Good for EU, Limited Everywhere Else</h2>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            The Europass CV is an EU initiative that standardizes CVs for cross-border European job mobility.
                            It is free and government-backed — but it provides <strong>only one template format</strong>,
                            <strong> no AI writing help</strong>, and a rigid structure that looks outdated compared to modern resume
                            designs. For non-EU jobs, Europass can actually hurt your application.
                        </p>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-white rounded-xl p-5 border border-teal-100">
                                <div className="text-3xl font-bold text-teal-600 mb-1">1</div>
                                <p className="text-sm text-gray-600">template available on Europass</p>
                            </div>
                            <div className="bg-white rounded-xl p-5 border border-teal-100">
                                <div className="text-3xl font-bold text-teal-600 mb-1">0</div>
                                <p className="text-sm text-gray-600">AI features in Europass</p>
                            </div>
                            <div className="bg-white rounded-xl p-5 border border-teal-100">
                                <div className="text-3xl font-bold text-accent-green mb-1">20+</div>
                                <p className="text-sm text-gray-600">templates in Best AI Resume Builder (free)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="comparison" className="py-16 bg-gray-50">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Europass CV vs Best AI Resume Builder</h2>
                        <p className="text-gray-400">EU standard format vs modern AI-powered builder.</p>
                    </div>
                    {/* Desktop: Table view */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-white border-b border-gray-100">
                                    <th className="text-left p-4 font-semibold text-gray-900">Feature</th>
                                    <th className="text-center p-4 font-semibold text-gray-400">Europass</th>
                                    <th className="text-center p-4 font-semibold text-accent-teal">Best AI Resumes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { feature: 'Pricing', comp: '✅ Free (EU government tool)', best: '✅ Free (all features)' },
                                    { feature: 'Templates', comp: '❌ 1 rigid format only', best: '✅ 20+ professional designs' },
                                    { feature: 'AI Resume Writing', comp: '❌ No AI features', best: '✅ AI-generated custom content' },
                                    { feature: 'ATS Optimization', comp: '⚠️ EU-format parsing only', best: '✅ Global ATS scoring + keywords' },
                                    { feature: 'Design Customization', comp: '❌ Minimal — colors and fonts only', best: '✅ Full template + layout control' },
                                    { feature: 'Global Compatibility', comp: '❌ EU-focused, not ideal outside Europe', best: '✅ Works for any job market' },
                                    { feature: 'Cover Letter', comp: '✅ Basic cover letter builder', best: '✅ AI-powered cover letters' },
                                    { feature: 'Language Passport', comp: '✅ EU language skills framework', best: '⚠️ Standard language section' },
                                    { feature: 'Content Help', comp: '❌ Manual entry only', best: '✅ AI writes bullet points' },
                                    { feature: 'Modern Design', comp: '❌ Dated, institutional look', best: '✅ Contemporary, recruiter-approved' },
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
                            { feature: 'Pricing', comp: '✅ Free (EU government tool)', best: '✅ Free (all features)' },
                            { feature: 'Templates', comp: '❌ 1 rigid format only', best: '✅ 20+ professional designs' },
                            { feature: 'AI Resume Writing', comp: '❌ No AI features', best: '✅ AI-generated custom content' },
                            { feature: 'ATS Optimization', comp: '⚠️ EU-format parsing only', best: '✅ Global ATS scoring + keywords' },
                            { feature: 'Design Customization', comp: '❌ Minimal — colors and fonts only', best: '✅ Full template + layout control' },
                            { feature: 'Global Compatibility', comp: '❌ EU-focused, not ideal outside Europe', best: '✅ Works for any job market' },
                            { feature: 'Cover Letter', comp: '✅ Basic cover letter builder', best: '✅ AI-powered cover letters' },
                            { feature: 'Language Passport', comp: '✅ EU language skills framework', best: '⚠️ Standard language section' },
                            { feature: 'Content Help', comp: '❌ Manual entry only', best: '✅ AI writes bullet points' },
                            { feature: 'Modern Design', comp: '❌ Dated, institutional look', best: '✅ Contemporary, recruiter-approved' },
                        ].map((row, i) => (
                            <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                <h3 className="font-semibold text-gray-900 mb-3">{row.feature}</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Europass:</span>
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
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">When to Use Europass vs Best AI Resumes</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-2xl p-8 border border-gray-100">
                            <h3 className="font-bold text-lg text-gray-900 mb-4">Use Europass when...</h3>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex gap-3"><span className="text-gray-500 mt-0.5">&bull;</span>Applying for EU mobility programs (Erasmus, EU institutions)</li>
                                <li className="flex gap-3"><span className="text-gray-500 mt-0.5">&bull;</span>An employer specifically requests Europass format</li>
                                <li className="flex gap-3"><span className="text-gray-500 mt-0.5">&bull;</span>You need the EU Skills Passport or Language Passport</li>
                                <li className="flex gap-3"><span className="text-gray-500 mt-0.5">&bull;</span>Applying to European government or academic positions</li>
                            </ul>
                        </div>
                        <div className="bg-teal-50 rounded-2xl p-8 border border-teal-200">
                            <h3 className="font-bold text-lg text-gray-900 mb-4">Use Best AI Resumes when...</h3>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex gap-3"><span className="text-accent-teal mt-0.5">&#10003;</span>Applying to private companies (anywhere in the world)</li>
                                <li className="flex gap-3"><span className="text-accent-teal mt-0.5">&#10003;</span>Targeting jobs in the US, UK, Canada, or Asia</li>
                                <li className="flex gap-3"><span className="text-accent-teal mt-0.5">&#10003;</span>Wanting a modern, visually appealing design</li>
                                <li className="flex gap-3"><span className="text-accent-teal mt-0.5">&#10003;</span>Needing AI help writing bullet points and summaries</li>
                                <li className="flex gap-3"><span className="text-accent-teal mt-0.5">&#10003;</span>Applying through ATS portals (Indeed, LinkedIn, etc.)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gray-50 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">See 300+ Free Resume Examples</h2>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                        Professional resume examples — from <Link href="/resume-examples/software-engineer" className="text-accent-teal hover:underline">software engineer</Link> to <Link href="/resume-examples/data-scientist" className="text-accent-teal hover:underline">data scientist</Link> to <Link href="/resume-examples/financial-analyst" className="text-accent-teal hover:underline">financial analyst</Link>.
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
                        <Link href="/canva-alternative" className="p-4 bg-white rounded-xl hover:bg-gray-50 transition text-center"><p className="font-medium text-gray-900">Canva Alternative</p><p className="text-xs text-gray-400 mt-1">Design tools vs AI</p></Link>
                        <Link href="/zety-alternative" className="p-4 bg-white rounded-xl hover:bg-gray-50 transition text-center"><p className="font-medium text-gray-900">Zety Alternative</p><p className="text-xs text-gray-400 mt-1">Pricing comparison</p></Link>
                        <Link href="/overleaf-alternative" className="p-4 bg-white rounded-xl hover:bg-gray-50 transition text-center"><p className="font-medium text-gray-900">Overleaf Alternative</p><p className="text-xs text-gray-400 mt-1">LaTeX vs AI builder</p></Link>
                        <Link href="/nova-alternative" className="p-4 bg-white rounded-xl hover:bg-gray-50 transition text-center"><p className="font-medium text-gray-900">Nova Alternative</p><p className="text-xs text-gray-400 mt-1">CV builder comparison</p></Link>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-50">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Modern Resumes for a Global Job Market.</h2>
                    <p className="text-gray-600 mb-8 text-lg">Go beyond the one-template Europass format. AI writing, 20+ designs, ATS optimization — free for any job market.</p>
                    <Link href="/onboarding" className="inline-block px-10 py-4 bg-accent-teal text-white font-semibold rounded-xl hover:opacity-90 transition shadow-lg shadow-teal-500/30 text-lg">Build My Resume Free</Link>
                    <p className="text-gray-600 mt-4 text-sm">Free forever. Works worldwide.</p>
                </div>
            </section>
            {/* External Resources */}
            <section className="py-8 bg-gray-50 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">External Resources</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                        <a href="https://europa.eu/europass/en" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition border border-gray-100">
                            <span className="text-gray-400">↗</span>
                            <span className="text-sm text-gray-700">Europass Official Portal</span>
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

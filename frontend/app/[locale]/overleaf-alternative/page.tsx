import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const siteUrl = 'https://www.bestairesumes.com';

const faqItems = [
    { question: 'Is Overleaf good for making resumes?', answer: 'Overleaf is excellent for LaTeX-based academic CVs, but it has a steep learning curve and produces resumes that can fail ATS parsing. If you are applying to corporate jobs through online portals, a dedicated resume builder is more effective.' },
    { question: 'Are Overleaf resumes ATS-friendly?', answer: 'It depends on the LaTeX template. Many Overleaf resume templates use custom fonts, multi-column layouts, and special formatting that ATS systems cannot parse correctly. Simple single-column LaTeX templates can work, but most decorative templates will fail.' },
    { question: 'Do I need to know LaTeX to use Overleaf for resumes?', answer: 'Yes. Overleaf is a LaTeX editor, so you need at least basic LaTeX knowledge to customize templates, fix compilation errors, and adjust formatting. Best AI Resume Builder requires zero technical skills — just fill in your information and the AI handles the rest.' },
    { question: 'What is the best free alternative to Overleaf for resumes?', answer: 'Best AI Resume Builder is the best free alternative for job seekers. It offers AI-powered content writing, ATS optimization scoring, and professional templates — all without needing any LaTeX or coding knowledge.' },
    { question: 'Can I convert my Overleaf resume to an ATS-friendly format?', answer: 'You can copy the text content from your Overleaf PDF and paste it into Best AI Resume Builder. Our AI will restructure it into an ATS-compatible format while preserving your content and suggesting improvements.' },
];

// All schema objects below contain ONLY hardcoded string constants — zero user input.
// The dangerouslySetInnerHTML usage below is safe because the HTML content is
// JSON.stringify of these hardcoded objects with no dynamic or user-provided data.
const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Overleaf Alternative for Resumes' },
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
    headline: 'Best Overleaf Alternative for Resumes 2026: No LaTeX Required',
    description: 'Compare Overleaf vs Best AI Resume Builder for creating professional resumes. Feature-by-feature comparison for academics and job seekers.',
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
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}/overleaf-alternative` },
};

// Safe: JSON.stringify of hardcoded schema constants only — no user input involved
const breadcrumbSchemaHtml = JSON.stringify(breadcrumbSchema);
const faqSchemaHtml = JSON.stringify(faqSchema);
const articleSchemaHtml = JSON.stringify(articleSchema);

export const metadata: Metadata = {
    title: 'Best Overleaf Alternative for Resumes 2026: No LaTeX, ATS-Friendly | Best AI Resume',
    description: 'Looking for Overleaf resume templates without the LaTeX hassle? Compare Overleaf vs Best AI Resume Builder — free, ATS-optimized templates with AI-powered writing. No coding needed.',
    keywords: 'overleaf resume, overleaf resume template, overleaf alternative, latex resume template, overleaf cv, free resume builder, ats friendly resume, overleaf vs resume builder',
};

export default function OverleafAlternativePage() {
    // All schema HTML strings below are derived from hardcoded constants above.
    // No user input is involved — safe for dangerouslySetInnerHTML.
    return (
        <>
            <Header />
            {/* Schema: hardcoded JSON-LD from constants above, no user input */}
            <script type="application/ld+json" dangerouslySetInnerHTML={/* safe: hardcoded schema */ { __html: breadcrumbSchemaHtml }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={/* safe: hardcoded schema */ { __html: faqSchemaHtml }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={/* safe: hardcoded schema */ { __html: articleSchemaHtml }} />

            {/* Hero Section */}
            <section className="pt-32 pb-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <span className="text-accent-green font-semibold tracking-wider uppercase text-sm">Overleaf Alternative</span>
                    <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6 text-gray-900">
                        Beautiful Resumes.<br />
                        <span className="text-accent-green">No LaTeX Required.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Overleaf makes great academic CVs — if you know LaTeX. Get the same professional quality
                        with <strong>AI-powered writing</strong> and <strong>zero coding</strong>.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/onboarding" className="px-8 py-4 bg-accent-green text-white font-semibold rounded-xl hover:opacity-90 transition shadow-lg shadow-green-500/30">
                            Build My Resume Free
                        </Link>
                        <a href="#comparison" className="px-8 py-4 bg-white border border-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition shadow-sm">
                            See the Comparison
                        </a>
                    </div>
                </div>
            </section>

            {/* The LaTeX Problem */}
            <section className="py-16 bg-white border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 md:p-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">The Overleaf Resume Problem</h2>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            Overleaf is a powerful LaTeX editor built for academic papers and technical documents. Many engineers,
                            researchers, and academics use it to create polished CVs. But there are two significant drawbacks for
                            job seekers: <strong>LaTeX has a steep learning curve</strong>, and many Overleaf resume templates
                            use complex formatting that <strong>ATS systems cannot reliably parse</strong>.
                        </p>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-white rounded-xl p-5 border border-amber-100">
                                <div className="text-3xl font-bold text-amber-600 mb-1">~4 hrs</div>
                                <p className="text-sm text-gray-600">Average time to learn enough LaTeX to customize a resume template</p>
                            </div>
                            <div className="bg-white rounded-xl p-5 border border-amber-100">
                                <div className="text-3xl font-bold text-amber-600 mb-1">60%+</div>
                                <p className="text-sm text-gray-600">of Overleaf resume templates use multi-column layouts that confuse ATS</p>
                            </div>
                            <div className="bg-white rounded-xl p-5 border border-amber-100">
                                <div className="text-3xl font-bold text-amber-600 mb-1">0</div>
                                <p className="text-sm text-gray-600">AI writing assistance — Overleaf is a text editor, not a resume builder</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Comparison Table */}
            <section id="comparison" className="py-16 bg-gray-50">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Overleaf vs Best AI Resume Builder</h2>
                        <p className="text-gray-400">An honest comparison for engineers, researchers, and job seekers.</p>
                    </div>

                    {/* Desktop: Table view */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-white border-b border-gray-100">
                                    <th className="text-left p-4 font-semibold text-gray-900">Feature</th>
                                    <th className="text-center p-4 font-semibold text-gray-400">Overleaf</th>
                                    <th className="text-center p-4 font-semibold text-accent-green">Best AI Resumes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { feature: 'Learning Curve', overleaf: '❌ Requires LaTeX knowledge', best: '✅ No technical skills needed' },
                                    { feature: 'AI Resume Writing', overleaf: '❌ No AI assistance', best: '✅ AI writes bullet points & summaries' },
                                    { feature: 'ATS Compatibility', overleaf: '⚠️ Depends on template choice', best: '✅ All templates ATS-tested' },
                                    { feature: 'Real-time ATS Score', overleaf: '❌ No scoring system', best: '✅ Live ATS score as you type' },
                                    { feature: 'Setup Time', overleaf: '❌ Hours (learn LaTeX + customize)', best: '✅ Minutes (guided flow)' },
                                    { feature: 'Template Customization', overleaf: '✅ Full control via LaTeX code', best: '✅ Visual drag-and-drop editing' },
                                    { feature: 'Typography Quality', overleaf: '✅ Excellent (Computer Modern fonts)', best: '✅ Professional web fonts' },
                                    { feature: 'Debugging Errors', overleaf: '❌ LaTeX compilation errors common', best: '✅ No errors possible (WYSIWYG)' },
                                    { feature: 'Job-Specific Keywords', overleaf: '❌ No keyword suggestions', best: '✅ AI suggests industry keywords' },
                                    { feature: 'Free Tier', overleaf: '✅ Free (with limits)', best: '✅ All templates free' },
                                    { feature: 'Academic CV Support', overleaf: '✅ Excellent for publications/grants', best: '⚠️ Optimized for industry resumes' },
                                ].map((row, i) => (
                                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                                        <td className="p-4 font-medium text-gray-900 border-b border-gray-100">{row.feature}</td>
                                        <td className="p-4 text-center text-sm text-gray-600 border-b border-gray-100">{row.overleaf}</td>
                                        <td className="p-4 text-center text-sm text-gray-800 font-medium border-b border-gray-100">{row.best}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile: Card view */}
                    <div className="md:hidden space-y-4">
                        {[
                            { feature: 'Learning Curve', overleaf: '❌ Requires LaTeX knowledge', best: '✅ No technical skills needed' },
                            { feature: 'AI Resume Writing', overleaf: '❌ No AI assistance', best: '✅ AI writes bullet points & summaries' },
                            { feature: 'ATS Compatibility', overleaf: '⚠️ Depends on template choice', best: '✅ All templates ATS-tested' },
                            { feature: 'Real-time ATS Score', overleaf: '❌ No scoring system', best: '✅ Live ATS score as you type' },
                            { feature: 'Setup Time', overleaf: '❌ Hours (learn LaTeX + customize)', best: '✅ Minutes (guided flow)' },
                            { feature: 'Template Customization', overleaf: '✅ Full control via LaTeX code', best: '✅ Visual drag-and-drop editing' },
                            { feature: 'Typography Quality', overleaf: '✅ Excellent (Computer Modern fonts)', best: '✅ Professional web fonts' },
                            { feature: 'Debugging Errors', overleaf: '❌ LaTeX compilation errors common', best: '✅ No errors possible (WYSIWYG)' },
                            { feature: 'Job-Specific Keywords', overleaf: '❌ No keyword suggestions', best: '✅ AI suggests industry keywords' },
                            { feature: 'Free Tier', overleaf: '✅ Free (with limits)', best: '✅ All templates free' },
                            { feature: 'Academic CV Support', overleaf: '✅ Excellent for publications/grants', best: '⚠️ Optimized for industry resumes' },
                        ].map((row, i) => (
                            <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                <h3 className="font-semibold text-gray-900 mb-3">{row.feature}</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Overleaf:</span>
                                        <span className="text-gray-600">{row.overleaf}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-accent-green font-medium">Best AI Resumes:</span>
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
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">3 Reasons to Switch from Overleaf</h2>
                        <p className="text-gray-400">Spend time on your career, not on LaTeX syntax.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-green-50 rounded-2xl p-8 border border-green-100">
                            <div className="w-12 h-12 rounded-lg bg-accent-green/20 flex items-center justify-center mb-5">
                                <svg className="w-6 h-6 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <h3 className="font-bold text-xl mb-3 text-gray-900">Minutes, Not Hours</h3>
                            <p className="text-gray-600 leading-relaxed">
                                No more debugging <code className="text-sm bg-gray-50 px-1 rounded">\hfill</code> errors or
                                Googling LaTeX syntax. Pick a template, fill in your details, and let the AI polish your content.
                            </p>
                        </div>

                        <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
                            <div className="w-12 h-12 rounded-lg bg-accent-blue/20 flex items-center justify-center mb-5">
                                <svg className="w-6 h-6 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            </div>
                            <h3 className="font-bold text-xl mb-3 text-gray-900">AI Writes Your Content</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Overleaf is a text editor — you write everything yourself. Our AI generates tailored bullet points,
                                professional summaries, and suggests keywords that recruiters search for.
                            </p>
                        </div>

                        <div className="bg-purple-50 rounded-2xl p-8 border border-purple-100">
                            <div className="w-12 h-12 rounded-lg bg-accent-purple/20 flex items-center justify-center mb-5">
                                <svg className="w-6 h-6 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <h3 className="font-bold text-xl mb-3 text-gray-900">Guaranteed ATS Parsing</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Many Overleaf templates use multi-column layouts and custom fonts that ATS can&apos;t parse.
                                Every one of our templates is tested to ensure 100% ATS readability.
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
                            <h3 className="font-bold text-lg text-gray-900 mb-4">Use Overleaf if you...</h3>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex gap-3"><span className="text-gray-500 mt-0.5">•</span>Need a multi-page academic CV with publications, grants, and research</li>
                                <li className="flex gap-3"><span className="text-gray-500 mt-0.5">•</span>Are comfortable with LaTeX and enjoy fine-grained typographic control</li>
                                <li className="flex gap-3"><span className="text-gray-500 mt-0.5">•</span>Are applying to academic positions where CV format matters less than content</li>
                                <li className="flex gap-3"><span className="text-gray-500 mt-0.5">•</span>Want to version-control your resume in Git alongside your code</li>
                            </ul>
                        </div>

                        <div className="bg-green-50 rounded-2xl p-8 border border-green-200">
                            <h3 className="font-bold text-lg text-gray-900 mb-4">Use Best AI Resumes if you...</h3>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex gap-3"><span className="text-accent-green mt-0.5">✓</span>Are applying to industry jobs through ATS-powered job boards</li>
                                <li className="flex gap-3"><span className="text-accent-green mt-0.5">✓</span>Want AI help writing compelling bullet points and summaries</li>
                                <li className="flex gap-3"><span className="text-accent-green mt-0.5">✓</span>Don&apos;t want to learn LaTeX just to make a resume</li>
                                <li className="flex gap-3"><span className="text-accent-green mt-0.5">✓</span>Need a 1-2 page industry resume, not an academic CV</li>
                                <li className="flex gap-3"><span className="text-accent-green mt-0.5">✓</span>Want real-time ATS scoring to maximize your chances</li>
                            </ul>
                        </div>
                    </div>

                    <p className="text-center text-gray-400 mt-8 text-sm">
                        <strong>The bottom line:</strong> Overleaf is the gold standard for academic CVs. But if you&apos;re targeting industry roles and applying through online portals, a purpose-built <Link href="/" className="text-accent-green hover:underline">AI resume builder</Link> will save you hours and improve your ATS pass rate.
                    </p>
                </div>
            </section>

            {/* Resume Examples CTA */}
            <section className="py-16 bg-white border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">See ATS-Optimized Resume Examples</h2>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                        Browse 300+ professional resume examples — including <Link href="/resume-examples/software-engineer" className="text-accent-green hover:underline">software engineer</Link>, <Link href="/resume-examples/data-scientist" className="text-accent-green hover:underline">data scientist</Link>, and <Link href="/resume-examples/research-assistant" className="text-accent-green hover:underline">research assistant</Link> resumes.
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
                                <summary className="p-5 font-medium text-gray-900 cursor-pointer hover:text-accent-green transition list-none flex items-center justify-between">
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
                            <span className="text-accent-green">→</span>
                            <span className="text-sm text-gray-700">How to Write an ATS-Friendly Resume</span>
                        </Link>
                        <Link href="/resume-format" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-50 transition">
                            <span className="text-accent-green">→</span>
                            <span className="text-sm text-gray-700">Resume Format Guide 2026</span>
                        </Link>
                        <Link href="/resume-examples/software-engineer" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-50 transition">
                            <span className="text-accent-green">→</span>
                            <span className="text-sm text-gray-700">Software Engineer Resume Example</span>
                        </Link>
                        <Link href="/blog/best-resume-fonts-2026" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-50 transition">
                            <span className="text-accent-green">→</span>
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
                        <a href="https://www.overleaf.com/gallery/tagged/cv" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition border border-gray-100">
                            <span className="text-gray-400">↗</span>
                            <span className="text-sm text-gray-700">Overleaf CV Templates</span>
                        </a>
                        <a href="https://www.bls.gov/ooh/computer-and-information-technology/home.htm" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition border border-gray-100">
                            <span className="text-gray-400">↗</span>
                            <span className="text-sm text-gray-700">BLS: Technology Careers</span>
                        </a>
                    </div>
                </div>
            </section>


            {/* Bottom CTA */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Skip the LaTeX. Build a Resume That Gets Hired.
                    </h2>
                    <p className="text-gray-600 mb-8 text-lg">
                        Join thousands of engineers and researchers who switched to an <Link href="/" className="text-accent-green hover:underline">AI resume builder</Link> that handles formatting so they can focus on content.
                    </p>
                    <Link href="/onboarding" className="inline-block px-10 py-4 bg-accent-green text-white font-semibold rounded-xl hover:opacity-90 transition shadow-lg shadow-green-500/30 text-lg">
                        Build My Resume Free — No LaTeX Needed
                    </Link>
                    <p className="text-gray-600 mt-4 text-sm">Free forever. No credit card required.</p>
                </div>
            </section>

            <Footer />
        </>
    );
}

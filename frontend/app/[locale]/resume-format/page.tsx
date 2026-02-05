import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const siteUrl = 'https://www.bestairesumes.com';

const faqItems = [
    { question: 'Which resume format is best for students?', answer: 'The Chronological format is still best. Place your Education section above your Work Experience if you are a new grad.' },
    { question: 'Does ATS read PDF files?', answer: 'Yes, modern ATS can read PDFs. However, stick to standard fonts and avoid using columns or graphics, as these can confuse the parser regardless of file format.' },
    { question: 'Can I switch formats mid-career?', answer: 'Absolutely. If you are pivoting to a new industry, a Combination format allows you to highlight your transferable skills first.' },
    { question: 'What is the most common resume format?', answer: 'The reverse-chronological format is used by over 90% of job seekers. It lists your most recent experience first and is the format recruiters and ATS systems are most familiar with.' },
    { question: 'Should I use a one-column or two-column resume format?', answer: 'Use a single-column format for maximum ATS compatibility. Two-column layouts can confuse parsing software, causing information to be read out of order or skipped entirely.' },
];

// All schema objects contain only hardcoded string constants — no user input
const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Resume Format Guide' },
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

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Choose the Right Resume Format',
    description: 'Learn which resume format is best for your career situation: chronological, functional, or combination.',
    step: [
        { '@type': 'HowToStep', text: 'Assess your career situation: steady progression, career change, or gaps' },
        { '@type': 'HowToStep', text: 'Choose chronological format for consistent work history in the same industry' },
        { '@type': 'HowToStep', text: 'Choose functional format for career changes or significant employment gaps' },
        { '@type': 'HowToStep', text: 'Choose combination format for senior roles or highly specialized expertise' },
        { '@type': 'HowToStep', text: 'Download a template and customize it with your information' },
    ],
    tool: { '@type': 'HowToTool', name: 'Best AI Resume Builder', url: siteUrl },
};

export const metadata: Metadata = {
    title: 'Resume Format Guide 2026: Chronological, Functional & Combination (Free Templates) | Best AI Resume',
    description: 'Choose the best resume format for your career. Compare chronological, functional, and combination formats with free downloadable templates. ATS-friendly guide updated for 2026.',
    keywords: 'resume format, resume format 2026, chronological resume, functional resume, combination resume, resume template, ATS resume format, best resume format',
};

export default function ResumeFormatPage() {
    return (
        <>
            <Header />
            {/* Schema markup — all hardcoded constants, no user input */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

            {/* Hero Section */}
            <section className="pt-32 pb-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <span className="text-accent-blue font-semibold tracking-wider uppercase text-sm">Updated for 2026</span>
                    <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6 text-gray-900">
                        Best Resume Formats for 2026<br />
                        <span className="text-accent-primary">(Free Templates)</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Stop guessing. Discover the 3 standard resume formats used by 99% of recruiters,
                        and learn strictly when to use each one to beat the ATS.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="#comparison" className="px-8 py-4 bg-white border border-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition shadow-sm">
                            Compare Formats
                        </a>
                        <Link href="/onboarding" className="px-8 py-4 bg-accent-blue text-white font-semibold rounded-xl hover:bg-blue-600 transition shadow-lg shadow-blue-500/30">
                            Build My Resume Now
                        </Link>
                    </div>
                </div>
            </section>

            {/* Quick Comparison Table */}
            <section id="comparison" className="py-16 bg-white border-b border-gray-100">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Comparison: Which Format is Right for You?</h2>
                        <p className="text-gray-400">Don't overthink it. Find your career situation below.</p>
                    </div>

                    {/* Desktop: Table view */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="p-4 text-left text-sm font-semibold text-gray-400 uppercase tracking-wider">Format</th>
                                    <th className="p-4 text-left text-sm font-semibold text-gray-400 uppercase tracking-wider">Best For</th>
                                    <th className="p-4 text-left text-sm font-semibold text-gray-400 uppercase tracking-wider">Avoid If</th>
                                    <th className="p-4 text-left text-sm font-semibold text-gray-400 uppercase tracking-wider">ATS Safety</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <tr className="hover:bg-gray-50/50 transition">
                                    <td className="p-6">
                                        <div className="font-bold text-lg text-gray-900">1. Chronological</div>
                                        <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full mt-1 inline-block">Most Popular</span>
                                    </td>
                                    <td className="p-6 text-gray-700">
                                        <ul className="list-disc list-inside space-y-1">
                                            <li>Consistent work history</li>
                                            <li>Staying in the same industry</li>
                                            <li>Climbing the corporate ladder</li>
                                        </ul>
                                    </td>
                                    <td className="p-6 text-gray-700">
                                        You have major employment gaps or are changing careers completely.
                                    </td>
                                    <td className="p-6">
                                        <div className="flex items-center gap-2">
                                            <div className="w-full bg-gray-100 rounded-full h-2 w-24">
                                                <div className="bg-green-500 h-2 rounded-full w-full"></div>
                                            </div>
                                            <span className="text-sm font-bold text-green-600">100%</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="hover:bg-gray-50/50 transition">
                                    <td className="p-6">
                                        <div className="font-bold text-lg text-gray-900">2. Functional</div>
                                        <span className="text-xs text-amber-600 font-medium bg-amber-50 px-2 py-1 rounded-full mt-1 inline-block">Skills-Based</span>
                                    </td>
                                    <td className="p-6 text-gray-700">
                                        <ul className="list-disc list-inside space-y-1">
                                            <li>Major career changers</li>
                                            <li>Long employment gaps</li>
                                            <li>Freelancers / Gig workers</li>
                                        </ul>
                                    </td>
                                    <td className="p-6 text-gray-700">
                                        You have a traditional career path (recruiters might think you're hiding something).
                                    </td>
                                    <td className="p-6">
                                        <div className="flex items-center gap-2">
                                            <div className="w-full bg-gray-100 rounded-full h-2 w-24">
                                                <div className="bg-amber-500 h-2 rounded-full w-2/3"></div>
                                            </div>
                                            <span className="text-sm font-bold text-amber-600">70%</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="hover:bg-gray-50/50 transition">
                                    <td className="p-6">
                                        <div className="font-bold text-lg text-gray-900">3. Combination</div>
                                        <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-full mt-1 inline-block">Hybrid</span>
                                    </td>
                                    <td className="p-6 text-gray-700">
                                        <ul className="list-disc list-inside space-y-1">
                                            <li>Senior Executives</li>
                                            <li>Highly specialized experts</li>
                                            <li>Diverse skill sets</li>
                                        </ul>
                                    </td>
                                    <td className="p-6 text-gray-700">
                                        Entry-level candidates (you don't have enough skills yet).
                                    </td>
                                    <td className="p-6">
                                        <div className="flex items-center gap-2">
                                            <div className="w-full bg-gray-100 rounded-full h-2 w-24">
                                                <div className="bg-green-500 h-2 rounded-full w-11/12"></div>
                                            </div>
                                            <span className="text-sm font-bold text-green-600">95%</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile: Card view */}
                    <div className="md:hidden space-y-6">
                        {/* Chronological */}
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <div className="font-bold text-lg text-gray-900">1. Chronological</div>
                                    <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full mt-1 inline-block">Most Popular</span>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-bold text-green-600">100% ATS</div>
                                </div>
                            </div>
                            <div className="space-y-3 text-sm">
                                <div>
                                    <span className="font-semibold text-gray-700">Best For:</span>
                                    <ul className="list-disc list-inside text-gray-600 mt-1">
                                        <li>Consistent work history</li>
                                        <li>Staying in the same industry</li>
                                        <li>Climbing the corporate ladder</li>
                                    </ul>
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-700">Avoid If:</span>
                                    <p className="text-gray-600 mt-1">You have major employment gaps or are changing careers completely.</p>
                                </div>
                            </div>
                        </div>

                        {/* Functional */}
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <div className="font-bold text-lg text-gray-900">2. Functional</div>
                                    <span className="text-xs text-amber-600 font-medium bg-amber-50 px-2 py-1 rounded-full mt-1 inline-block">Skills-Based</span>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-bold text-amber-600">70% ATS</div>
                                </div>
                            </div>
                            <div className="space-y-3 text-sm">
                                <div>
                                    <span className="font-semibold text-gray-700">Best For:</span>
                                    <ul className="list-disc list-inside text-gray-600 mt-1">
                                        <li>Major career changers</li>
                                        <li>Long employment gaps</li>
                                        <li>Freelancers / Gig workers</li>
                                    </ul>
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-700">Avoid If:</span>
                                    <p className="text-gray-600 mt-1">You have a traditional career path (recruiters might think you&apos;re hiding something).</p>
                                </div>
                            </div>
                        </div>

                        {/* Combination */}
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <div className="font-bold text-lg text-gray-900">3. Combination</div>
                                    <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-full mt-1 inline-block">Hybrid</span>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-bold text-green-600">95% ATS</div>
                                </div>
                            </div>
                            <div className="space-y-3 text-sm">
                                <div>
                                    <span className="font-semibold text-gray-700">Best For:</span>
                                    <ul className="list-disc list-inside text-gray-600 mt-1">
                                        <li>Senior Executives</li>
                                        <li>Highly specialized experts</li>
                                        <li>Diverse skill sets</li>
                                    </ul>
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-700">Avoid If:</span>
                                    <p className="text-gray-600 mt-1">Entry-level candidates (you don&apos;t have enough skills yet).</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Deep Dive: Chronological */}
            <section className="py-16 md:py-24 max-w-4xl mx-auto px-6">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">1. The Chronological Resume Format</h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        This is the gold standard. When a recruiter opens a resume, their brain is wired to look for this format.
                        It lists your work history in <strong>reverse-chronological order</strong> (newest job first).
                    </p>

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8 rounded-r-lg">
                        <h4 className="font-bold text-blue-900 mb-2">Why Recruiters Love It:</h4>
                        <p className="text-blue-800">It tells a clear story of your career progression. They can instantly see where you've been and how you've grown.</p>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-4">Structure:</h3>
                    <div className="bg-white border-2 border-gray-100 rounded-xl p-8 shadow-sm space-y-4 font-mono text-sm text-gray-400">
                        <div className="text-center p-2 border border-dashed border-gray-200 rounded bg-gray-50">Header (Name & Contact)</div>
                        <div className="p-2 border border-dashed border-gray-200 rounded bg-gray-50">Professional Summary</div>
                        <div className="p-4 border-2 border-blue-100 rounded bg-blue-50/50">
                            <div className="font-bold text-blue-700">Work Experience (The Core)</div>
                            <div className="mt-2 text-xs">Job 1 (Current)</div>
                            <div className="mt-1 text-xs">Job 2 (Previous)</div>
                            <div className="mt-1 text-xs">Job 3 (Previous)</div>
                        </div>
                        <div className="p-2 border border-dashed border-gray-200 rounded bg-gray-50">Education</div>
                        <div className="p-2 border border-dashed border-gray-200 rounded bg-gray-50">Skills</div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                    <a href="/templates/chronological_resume_template.docx" download className="inline-flex items-center justify-center gap-2 bg-gray-50 text-gray-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        Download Word Template
                    </a>
                    <Link href="/onboarding" className="inline-flex items-center justify-center gap-2 text-accent-blue font-semibold hover:underline">
                        Create a Chronological Resume with AI &rarr;
                    </Link>
                </div>
            </section>

            {/* Deep Dive: Functional */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">2. The Functional (Skills-Based) Resume Format</h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        The functional resume flips the script. Instead of focusing on <em>when</em> you worked, it focuses on <em>what you can do</em>.
                        It groups your achievements into skill categories (e.g., "Project Management," "Sales Leadership") rather than by job title.
                    </p>

                    <div className="bg-amber-50 border-l-4 border-amber-500 p-6 my-8 rounded-r-lg">
                        <h4 className="font-bold text-amber-900 mb-2">Warning:</h4>
                        <p className="text-amber-800">Some Applicant Tracking Systems (ATS) struggle to read this format. Use it only if necessary (e.g., career gaps &gt; 2 years).</p>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-4">Structure:</h3>
                    <div className="bg-white border-2 border-gray-100 rounded-xl p-8 shadow-sm space-y-4 font-mono text-sm text-gray-400">
                        <div className="text-center p-2 border border-dashed border-gray-200 rounded bg-gray-50">Header</div>
                        <div className="p-2 border border-dashed border-gray-200 rounded bg-gray-50">Summary</div>
                        <div className="p-4 border-2 border-amber-100 rounded bg-amber-50/50">
                            <div className="font-bold text-amber-700">Relevant Skills (The Core)</div>
                            <div className="mt-2 text-xs">Skill Category A (3-4 bullets)</div>
                            <div className="mt-1 text-xs">Skill Category B (3-4 bullets)</div>
                        </div>
                        <div className="p-2 border border-dashed border-gray-200 rounded bg-gray-50">Work History (Brief list only)</div>
                        <div className="p-2 border border-dashed border-gray-200 rounded bg-gray-50">Education</div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                        <a href="/templates/functional_resume_template.docx" download className="inline-flex items-center justify-center gap-2 bg-gray-50 text-gray-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                            Download Word Template
                        </a>
                        <Link href="/onboarding" className="inline-flex items-center justify-center gap-2 text-accent-blue font-semibold hover:underline">
                            Build Functional Resume with AI &rarr;
                        </Link>
                    </div>
                </div>
            </section>

            {/* Deep Dive: Combination */}
            <section className="py-16 md:py-24 max-w-4xl mx-auto px-6">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">3. The Combination (Hybrid) Format</h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        As the name suggests, this blends the best of both worlds. It starts with a detailed skills summary (like a Functional resume)
                        but follows it with a robust chronological work history.
                    </p>

                    <h3 className="text-xl font-bold text-gray-900 mb-4">Who Is It For?</h3>
                    <ul className="grid sm:grid-cols-2 gap-4 mb-8">
                        <li className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                            <span className="text-green-500 text-xl">✓</span>
                            <span className="text-gray-700">Senior Executives</span>
                        </li>
                        <li className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                            <span className="text-green-500 text-xl">✓</span>
                            <span className="text-gray-700">Career Pivoters (Expert level)</span>
                        </li>
                    </ul>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                        <a href="/templates/combination_resume_template.docx" download className="inline-flex items-center justify-center gap-2 bg-gray-50 text-gray-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                            Download Word Template
                        </a>
                        <Link href="/onboarding" className="inline-flex items-center justify-center gap-2 text-accent-blue font-semibold hover:underline">
                            Build Combination Resume with AI &rarr;
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ Section with Schema Markup */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>

                    <div className="space-y-6">
                        {faqItems.map((item, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                                <h3 className="font-bold text-lg text-gray-900 mb-2">{item.question}</h3>
                                <p className="text-gray-600">{item.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sticky Bottom CTA */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-2xl z-50 md:hidden">
                <div className="flex items-center justify-between gap-4">
                    <div className="text-sm font-medium text-gray-700">
                        Confused by formatting?
                    </div>
                    <Link href="/onboarding" className="bg-accent-blue text-white px-6 py-2 rounded-full font-bold text-sm">
                        Use AI Builder
                    </Link>
                </div>
            </div>

            <section className="py-24 bg-gray-50 text-center px-6">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Stop Fighting with Margins</h2>
                <p className="text-gray-500 max-w-2xl mx-auto mb-10 text-lg">
                    Our AI Resume Builder automatically handles formatting, fonts, and margins.
                    Choose from 20+ recruiter-approved templates and switch formats with one click.
                </p>
                <Link href="/onboarding" className="inline-flex items-center gap-2 bg-accent-green text-gray-900 px-8 py-4 rounded-xl font-bold hover:bg-green-400 transition transform hover:scale-105">
                    Build My Resume Free
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
            </section>

            <Footer />
        </>
    );
}

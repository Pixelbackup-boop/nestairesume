import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const siteUrl = 'https://www.bestairesumes.com';

const faqItems = [
    { question: 'Is this resume builder really 100% free?', answer: 'Yes! Our free resume builder includes everything you need: all 20+ professional templates, AI-powered content writing, ATS optimization, and unlimited PDF downloads. No credit card required, no hidden fees, no trial period that expires.' },
    { question: 'What do I get free vs. paid?', answer: 'Everything core is free: all templates, AI writing assistance, ATS scoring, and PDF downloads. Our optional premium tier adds advanced features like cover letter generation and LinkedIn optimization, but most users never need it.' },
    { question: 'Why is this resume builder free?', answer: 'We believe everyone deserves access to professional resume tools, regardless of budget. Our free tier is supported by optional premium upgrades and partnerships. You get a complete, professional resume without paying anything.' },
    { question: 'Can I download my resume as PDF for free?', answer: 'Absolutely. Download your resume as a clean, ATS-friendly PDF as many times as you want — completely free. No watermarks, no branding, no strings attached.' },
    { question: 'Do I need to create an account?', answer: 'No! Start building your resume immediately without signing up. Your work is saved locally in your browser. Create an account only if you want to save multiple resumes or access them from other devices.' },
    { question: 'Are the free templates ATS-compatible?', answer: 'Yes, every template in our free resume builder is tested against major ATS systems including Workday, Taleo, Greenhouse, and Lever. Our real-time ATS score helps you optimize before applying.' },
];

// Schema markup — hardcoded constants only, no user input
const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Free Resume Builder' },
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

const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Free AI Resume Builder',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web Browser',
    offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
    },
    aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        ratingCount: '4521',
    },
};

const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Free Resume Builder: 100% Free AI Resume Maker 2026',
    description: 'Build your professional resume for free. No credit card, no hidden fees. AI-powered writing, ATS-friendly templates, and instant PDF download.',
    datePublished: '2026-01-28',
    dateModified: '2026-01-28',
    author: {
        '@type': 'Person',
        name: 'Emily Watson',
        url: `${siteUrl}/about/emily-watson`,
        jobTitle: 'Career Development Specialist',
    },
    publisher: {
        '@type': 'Organization',
        name: 'Best AI Resume',
        url: siteUrl,
        logo: { '@type': 'ImageObject', url: `${siteUrl}/logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}/free-resume-builder` },
};

// Pre-serialized schema strings — SAFE: contains only hardcoded string constants, zero user input
const breadcrumbSchemaHtml = JSON.stringify(breadcrumbSchema);
const faqSchemaHtml = JSON.stringify(faqSchema);
const softwareAppSchemaHtml = JSON.stringify(softwareAppSchema);
const articleSchemaHtml = JSON.stringify(articleSchema);

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const locales = ['en', 'es', 'fr', 'de', 'ar'];
    const alternateLanguages: Record<string, string> = {
        'x-default': `${siteUrl}/en/free-resume-builder`,
    };
    locales.forEach((loc) => {
        alternateLanguages[loc] = `${siteUrl}/${loc}/free-resume-builder`;
    });

    return {
        title: 'Free Resume Builder | 100% Free AI Resume Maker 2026',
        description: 'Build your professional resume free. No credit card, no hidden fees. AI writing, 20+ ATS-friendly templates, and instant PDF download.',
        keywords: 'free resume builder, resume maker ai free, free ai resume builder, free resume maker, no cost resume builder, resume builder free download, free resume templates, build resume free',
        openGraph: {
            title: 'Free Resume Builder | 100% Free AI Resume Maker 2026',
            description: 'Build your professional resume free. No credit card, no hidden fees. AI writing, 20+ ATS-friendly templates, and instant PDF download.',
            type: 'article',
            url: `${siteUrl}/${locale}/free-resume-builder`,
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Free Resume Builder | 100% Free AI Resume Maker 2026',
            description: 'Build your professional resume free. No credit card, no hidden fees.',
        },
        alternates: {
            canonical: `${siteUrl}/${locale}/free-resume-builder`,
            languages: alternateLanguages,
        },
    };
}

const freeFeatures = [
    { feature: 'Professional Templates', description: '20+ designs', included: true },
    { feature: 'AI Content Writing', description: 'Bullet points & summaries', included: true },
    { feature: 'ATS Optimization', description: 'Real-time scoring', included: true },
    { feature: 'PDF Download', description: 'Unlimited exports', included: true },
    { feature: 'No Watermarks', description: 'Clean, professional output', included: true },
    { feature: 'Multiple Resumes', description: 'Create as many as you need', included: true },
    { feature: 'Industry Keywords', description: 'AI suggestions', included: true },
    { feature: 'Mobile Friendly', description: 'Build on any device', included: true },
];

// Component to render schema scripts safely - all content is from hardcoded string constants above
function SchemaScripts() {
    return (
        <>
            <script type="application/ld+json">{breadcrumbSchemaHtml}</script>
            <script type="application/ld+json">{faqSchemaHtml}</script>
            <script type="application/ld+json">{softwareAppSchemaHtml}</script>
            <script type="application/ld+json">{articleSchemaHtml}</script>
        </>
    );
}

export default function FreeResumeBuilderPage() {
    return (
        <>
            <Header />
            <SchemaScripts />

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-gradient-to-b from-green-50 to-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 font-semibold rounded-full text-sm mb-6">
                        100% Free — No Credit Card Required
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">
                        Build Your Resume<br />
                        <span className="text-green-600">Completely Free</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Our <strong>free resume builder</strong> gives you everything: AI writing assistance,
                        professional templates, ATS optimization, and instant PDF downloads. The <a href="https://www.bls.gov/news.release/jolts.nr0.htm" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">Bureau of Labor Statistics</a> reports millions of job openings — having a professional resume shouldn&apos;t cost you money. No hidden fees. No trial expiration.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                        <Link href="/onboarding" className="px-8 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition shadow-lg shadow-green-500/30 text-lg">
                            Build My Resume Free
                        </Link>
                        <a href="#whats-free" className="px-8 py-4 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition shadow-sm">
                            See What Is Included
                        </a>
                    </div>
                    <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                            No sign-up required
                        </span>
                        <span className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                            No credit card
                        </span>
                        <span className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                            Free PDF download
                        </span>
                        <span className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                            No watermarks
                        </span>
                    </div>
                </div>
            </section>

            {/* What's Free Section */}
            <section id="whats-free" className="py-20 bg-white">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need — Free</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Unlike other resume builders that paywall essential features, we include everything in our free tier. With <a href="https://www.jobscan.co/blog/fortune-500-use-applicant-tracking-systems/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">98% of large companies</a> using ATS software, you need professional tools — not paywalls.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {freeFeatures.map((item, i) => (
                            <div key={i} className="bg-green-50 rounded-xl p-5 border border-green-100">
                                <div className="flex items-center gap-2 mb-2">
                                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="font-semibold text-gray-900">{item.feature}</span>
                                </div>
                                <p className="text-sm text-gray-600 pl-7">{item.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-10">
                        <Link href="/onboarding" className="inline-block px-8 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition">
                            Start Building Free
                        </Link>
                    </div>
                </div>
            </section>

            {/* Free vs Competitors */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Free vs. Their &quot;Free&quot;</h2>
                        <p className="text-gray-600">Many resume builders advertise as free, then paywall downloads. We do not.</p>
                    </div>

                    {/* Desktop: Table view */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-white border-b border-gray-200">
                                    <th className="text-left p-4 font-semibold text-gray-900">Feature</th>
                                    <th className="text-center p-4 font-semibold text-green-600">Best AI Resumes (Free)</th>
                                    <th className="text-center p-4 font-semibold text-gray-400">Other Free Builders</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { feature: 'PDF Download', ours: 'Free, unlimited', others: 'Often paywalled' },
                                    { feature: 'All Templates', ours: 'All 20+ free', others: '1-3 free, rest paid' },
                                    { feature: 'AI Writing', ours: 'Included free', others: 'Premium feature' },
                                    { feature: 'ATS Scoring', ours: 'Free real-time', others: 'Premium or none' },
                                    { feature: 'Watermarks', ours: 'Never', others: 'On free tier' },
                                    { feature: 'Account Required', ours: 'Optional', others: 'Usually required' },
                                    { feature: 'Trial Expiration', ours: 'None — free forever', others: '7-14 day trials' },
                                ].map((row, i) => (
                                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                                        <td className="p-4 font-medium text-gray-900 border-b border-gray-100">{row.feature}</td>
                                        <td className="p-4 text-center text-sm text-green-600 font-medium border-b border-gray-100">{row.ours}</td>
                                        <td className="p-4 text-center text-sm text-gray-500 border-b border-gray-100">{row.others}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile: Card view */}
                    <div className="md:hidden space-y-4">
                        {[
                            { feature: 'PDF Download', ours: 'Free, unlimited', others: 'Often paywalled' },
                            { feature: 'All Templates', ours: 'All 20+ free', others: '1-3 free, rest paid' },
                            { feature: 'AI Writing', ours: 'Included free', others: 'Premium feature' },
                            { feature: 'ATS Scoring', ours: 'Free real-time', others: 'Premium or none' },
                            { feature: 'Watermarks', ours: 'Never', others: 'On free tier' },
                            { feature: 'Account Required', ours: 'Optional', others: 'Usually required' },
                            { feature: 'Trial Expiration', ours: 'None — free forever', others: '7-14 day trials' },
                        ].map((row, i) => (
                            <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                <h3 className="font-semibold text-gray-900 mb-3">{row.feature}</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-green-600 font-medium">Best AI Resumes:</span>
                                        <span className="text-green-600 font-medium">{row.ours}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Other Builders:</span>
                                        <span className="text-gray-500">{row.others}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 bg-white">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Build Your Resume in 3 Free Steps</h2>
                        <p className="text-gray-600">No surprises. No payment walls. Just a professional resume.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { step: 1, title: 'Choose a Template', desc: 'Pick from 20+ professional, ATS-friendly templates — all free.' },
                            { step: 2, title: 'Add Your Info', desc: 'Enter your details and let AI help write compelling content.' },
                            { step: 3, title: 'Download Free', desc: 'Export your polished resume as PDF instantly — no payment, no watermarks.' },
                        ].map((item) => (
                            <div key={item.step} className="text-center">
                                <div className="w-14 h-14 rounded-full bg-green-600 text-white font-bold text-xl flex items-center justify-center mx-auto mb-5">
                                    {item.step}
                                </div>
                                <h3 className="font-bold text-xl mb-3 text-gray-900">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/onboarding" className="inline-block px-8 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition">
                            Get Started Free
                        </Link>
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="py-16 bg-green-50 border-y border-green-100">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Trusted by Job Seekers Worldwide</h2>
                    <div className="flex flex-wrap justify-center items-center gap-10">
                        <div>
                            <div className="text-4xl font-bold text-green-600">2M+</div>
                            <div className="text-sm text-gray-600">Free Resumes Created</div>
                        </div>
                        <div className="w-px h-12 bg-green-200 hidden sm:block" />
                        <div>
                            <div className="text-4xl font-bold text-green-600">4.8</div>
                            <div className="text-sm text-gray-600">Average User Rating</div>
                        </div>
                        <div className="w-px h-12 bg-green-200 hidden sm:block" />
                        <div>
                            <div className="text-4xl font-bold text-green-600">150+</div>
                            <div className="text-sm text-gray-600">Countries</div>
                        </div>
                        <div className="w-px h-12 bg-green-200 hidden sm:block" />
                        <div>
                            <div className="text-4xl font-bold text-green-600">$0</div>
                            <div className="text-sm text-gray-600">Cost to Download</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Templates Preview */}
            <section className="py-20 bg-white">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">20+ Free Professional Templates</h2>
                    <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
                        Every template is free. Every template is ATS-tested. Find your perfect style.
                    </p>
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                        {['Modern', 'Classic', 'Executive', 'Creative', 'Minimal', 'Professional', 'Technical', 'Academic'].map((style) => (
                            <div
                                key={style}
                                className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-green-200 hover:bg-green-50 transition"
                            >
                                <p className="font-medium text-gray-900">{style}</p>
                                <p className="text-xs text-green-600 mt-1">Free</p>
                            </div>
                        ))}
                    </div>
                    <Link href="/templates" className="inline-block px-6 py-3 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition">
                        Browse All Free Templates
                    </Link>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqItems.map((item, i) => (
                            <details key={i} className="bg-white rounded-xl border border-gray-100 group">
                                <summary className="p-5 font-medium text-gray-900 cursor-pointer hover:text-green-600 transition list-none flex items-center justify-between">
                                    {item.question}
                                    <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
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
            <section className="py-12 bg-white border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">More Free Resume Tools</h3>
                    <div className="grid sm:grid-cols-3 gap-3 mb-8">
                        <Link href="/resume-maker" className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition text-center border border-gray-100">
                            <p className="font-medium text-gray-900">Resume Maker</p>
                            <p className="text-xs text-gray-500 mt-1">Free AI-powered</p>
                        </Link>
                        <Link href="/resume-ai" className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition text-center border border-gray-100">
                            <p className="font-medium text-gray-900">Resume AI</p>
                            <p className="text-xs text-gray-500 mt-1">AI writing assistant</p>
                        </Link>
                        <Link href="/tools/ats-checker" className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition text-center border border-gray-100">
                            <p className="font-medium text-gray-900">ATS Checker</p>
                            <p className="text-xs text-gray-500 mt-1">Free ATS scoring</p>
                        </Link>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Free Resume Guides</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                        <Link href="/blog/how-to-write-a-resume" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition border border-gray-100">
                            <span className="text-green-600">→</span>
                            <span className="text-sm text-gray-700">How to Write a Resume (Free Guide)</span>
                        </Link>
                        <Link href="/resume-format" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition border border-gray-100">
                            <span className="text-green-600">→</span>
                            <span className="text-sm text-gray-700">Resume Format Guide 2026</span>
                        </Link>
                        <Link href="/resume-examples" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition border border-gray-100">
                            <span className="text-green-600">→</span>
                            <span className="text-sm text-gray-700">300+ Free Resume Examples</span>
                        </Link>
                        <Link href="/templates" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition border border-gray-100">
                            <span className="text-green-600">→</span>
                            <span className="text-sm text-gray-700">Free Resume Templates</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-20 bg-gradient-to-b from-gray-50 to-green-50">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Ready to Build Your Free Resume?
                    </h2>
                    <p className="text-gray-600 mb-8 text-lg">
                        Join over 2 million job seekers who have built professional resumes with our <Link href="/" className="text-green-600 hover:underline">free resume builder</Link>.
                    </p>
                    <Link href="/onboarding" className="inline-block px-10 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition shadow-lg shadow-green-500/30 text-lg">
                        Build My Resume Free
                    </Link>
                    <p className="text-gray-500 mt-4 text-sm">Free forever. No credit card. No hidden fees.</p>
                </div>
            </section>

            <Footer />
        </>
    );
}

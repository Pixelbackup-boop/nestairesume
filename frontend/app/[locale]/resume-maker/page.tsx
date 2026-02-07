import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const siteUrl = 'https://www.bestairesumes.com';

const faqItems = [
    { question: 'Is this resume maker really free?', answer: 'Yes! Our AI-powered resume maker is 100% free to use. Create unlimited resumes, access all 20+ professional templates, and download your resume as a PDF — no credit card or subscription required.' },
    { question: 'What makes this the best resume maker?', answer: 'Unlike generic resume makers, our tool uses AI to write professional bullet points, optimize your content for ATS systems, and suggest industry-specific keywords. You get a resume that looks great AND passes automated screening.' },
    { question: 'Can I download my resume as PDF for free?', answer: 'Absolutely. Every resume you create can be downloaded as a clean, ATS-friendly PDF at no cost. No watermarks, no paywalls, no catches.' },
    { question: 'How long does it take to make a resume?', answer: 'Most users create a professional resume in under 10 minutes. Our AI pre-fills content suggestions, so you spend less time staring at a blank page and more time applying to jobs.' },
    { question: 'Is my resume ATS-compatible?', answer: 'Yes. Every template in our resume maker is tested against major ATS systems (Workday, Taleo, Greenhouse, Lever). Our real-time ATS score helps you optimize your resume before you submit it.' },
    { question: 'Can I create multiple resumes for different jobs?', answer: 'Yes! Create as many tailored resumes as you need. Many job seekers customize their resume for each application to match specific job descriptions — our resume maker makes this fast and easy.' },
];

// Schema markup — hardcoded constants only, no user input
const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Resume Maker' },
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
    name: 'Best AI Resume Maker',
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
        ratingCount: '2847',
    },
};

const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Free Resume Maker: AI-Powered Resume Builder 2026',
    description: 'Create professional resumes in minutes with our free AI resume maker. ATS-friendly templates, AI writing assistance, and instant PDF downloads.',
    datePublished: '2026-01-28',
    dateModified: '2026-01-28',
    author: {
        '@type': 'Person',
        name: 'Sarah Chen',
        url: `${siteUrl}/about/sarah-chen`,
        jobTitle: 'Career Coach & Resume Expert',
    },
    publisher: {
        '@type': 'Organization',
        name: 'Best AI Resume',
        url: siteUrl,
        logo: { '@type': 'ImageObject', url: `${siteUrl}/logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}/resume-maker` },
};

// Pre-serialized schema strings — SAFE: contains only hardcoded constants, zero user input
const breadcrumbSchemaHtml = JSON.stringify(breadcrumbSchema);
const faqSchemaHtml = JSON.stringify(faqSchema);
const softwareAppSchemaHtml = JSON.stringify(softwareAppSchema);
const articleSchemaHtml = JSON.stringify(articleSchema);

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const locales = ['en', 'es', 'fr', 'de', 'ar'];
    const alternateLanguages: Record<string, string> = {
        'x-default': `${siteUrl}/en/resume-maker`,
    };
    locales.forEach((loc) => {
        alternateLanguages[loc] = `${siteUrl}/${loc}/resume-maker`;
    });

    return {
        title: 'Free Resume Maker | AI-Powered Resume Builder 2026',
        description: 'Create a professional resume in minutes with our free AI resume maker. ATS-friendly templates, AI writing, and instant PDF download.',
        keywords: 'resume maker, resume maker ai free, best resume maker ai, free resume maker, ai resume maker, resume builder, resume creator, make a resume',
        openGraph: {
            title: 'Free Resume Maker | AI-Powered Resume Builder 2026',
            description: 'Create a professional resume in minutes with our free AI resume maker. ATS-friendly templates, AI writing, and instant PDF download.',
            type: 'article',
            url: `${siteUrl}/${locale}/resume-maker`,
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Free Resume Maker | AI-Powered Resume Builder 2026',
            description: 'Create a professional resume in minutes with our free AI resume maker.',
        },
        alternates: {
            canonical: `${siteUrl}/${locale}/resume-maker`,
            languages: alternateLanguages,
        },
    };
}

const features = [
    {
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        title: 'AI-Powered Writing',
        description: 'Our AI writes professional bullet points, summaries, and skill descriptions tailored to your industry and experience level.',
        color: 'blue',
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        title: 'ATS-Optimized Templates',
        description: 'Every template is tested against major ATS systems like Workday, Taleo, and Greenhouse. Your resume gets past the bots and into human hands.',
        color: 'green',
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
        ),
        title: 'Instant PDF Download',
        description: 'Download your polished resume as a clean PDF in one click. No watermarks, no paywalls — completely free.',
        color: 'purple',
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        title: 'Ready in Minutes',
        description: 'No more blank page anxiety. Our guided flow and AI suggestions help you build a complete resume in under 10 minutes.',
        color: 'orange',
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
        title: 'Real-Time ATS Score',
        description: 'See how your resume scores against ATS requirements as you type. Optimize before you submit.',
        color: 'teal',
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
        ),
        title: '20+ Pro Templates',
        description: 'Choose from professionally designed templates for every industry and career level. All free, all ATS-friendly.',
        color: 'pink',
    },
];

const steps = [
    { step: 1, title: 'Choose a Template', description: 'Pick from 20+ ATS-friendly professional templates designed for your industry.' },
    { step: 2, title: 'Add Your Information', description: 'Enter your experience and let AI suggest improvements, keywords, and professional phrasing.' },
    { step: 3, title: 'Download & Apply', description: 'Export your polished resume as PDF and start applying to jobs immediately.' },
];

const colorClasses: Record<string, { bg: string; iconBg: string; iconText: string }> = {
    blue: { bg: 'bg-blue-50', iconBg: 'bg-blue-100', iconText: 'text-accent-blue' },
    green: { bg: 'bg-green-50', iconBg: 'bg-green-100', iconText: 'text-green-600' },
    purple: { bg: 'bg-purple-50', iconBg: 'bg-purple-100', iconText: 'text-purple-600' },
    orange: { bg: 'bg-orange-50', iconBg: 'bg-orange-100', iconText: 'text-orange-600' },
    teal: { bg: 'bg-teal-50', iconBg: 'bg-teal-100', iconText: 'text-teal-600' },
    pink: { bg: 'bg-pink-50', iconBg: 'bg-pink-100', iconText: 'text-pink-600' },
};

export default function ResumeMakerPage() {
    return (
        <>
            <Header />
            {/* Schema markup — SAFE: pre-serialized from hardcoded constants, contains zero user input */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchemaHtml /* hardcoded constants only */ }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchemaHtml /* hardcoded constants only */ }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: softwareAppSchemaHtml /* hardcoded constants only */ }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleSchemaHtml /* hardcoded constants only */ }} />

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-gradient-to-b from-blue-50 to-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <span className="inline-block px-4 py-1.5 bg-accent-blue/10 text-accent-blue font-semibold rounded-full text-sm mb-6">
                        Free AI Resume Maker
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">
                        Create Your Professional<br />
                        <span className="text-accent-blue">Resume in Minutes</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Our free <strong>resume maker</strong> uses AI to help you write compelling content,
                        optimize for ATS systems, and land more interviews. With <a href="https://www.jobscan.co/blog/fortune-500-use-applicant-tracking-systems/" target="_blank" rel="noopener noreferrer" className="text-accent-blue hover:underline">98% of Fortune 500 companies</a> using ATS software, having an optimized resume is essential. No design skills needed.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                        <Link href="/onboarding" className="px-8 py-4 bg-accent-blue text-white font-semibold rounded-xl hover:bg-blue-600 transition shadow-lg shadow-blue-500/30 text-lg">
                            Make My Resume Free
                        </Link>
                        <Link href="/templates" className="px-8 py-4 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition shadow-sm">
                            View Templates
                        </Link>
                    </div>
                    <p className="text-sm text-gray-500">
                        No sign-up required · No credit card · Free PDF download
                    </p>
                </div>
            </section>

            {/* Social Proof */}
            <section className="py-8 bg-white border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="flex flex-wrap justify-center items-center gap-8 text-center">
                        <div>
                            <div className="text-3xl font-bold text-gray-900">2M+</div>
                            <div className="text-sm text-gray-500">Resumes Created</div>
                        </div>
                        <div className="w-px h-10 bg-gray-200 hidden sm:block" />
                        <div>
                            <div className="text-3xl font-bold text-gray-900">4.8</div>
                            <div className="text-sm text-gray-500">User Rating</div>
                        </div>
                        <div className="w-px h-10 bg-gray-200 hidden sm:block" />
                        <div>
                            <div className="text-3xl font-bold text-gray-900">20+</div>
                            <div className="text-sm text-gray-500">Free Templates</div>
                        </div>
                        <div className="w-px h-10 bg-gray-200 hidden sm:block" />
                        <div>
                            <div className="text-3xl font-bold text-gray-900">10 min</div>
                            <div className="text-sm text-gray-500">Avg. Build Time</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 bg-white">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">How Our Resume Maker Works</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Create a job-winning resume in three simple steps. Our AI does the heavy lifting.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {steps.map((item) => (
                            <div key={item.step} className="text-center">
                                <div className="w-14 h-14 rounded-full bg-accent-blue text-white font-bold text-xl flex items-center justify-center mx-auto mb-5">
                                    {item.step}
                                </div>
                                <h3 className="font-bold text-xl mb-3 text-gray-900">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/onboarding" className="inline-block px-8 py-4 bg-accent-blue text-white font-semibold rounded-xl hover:bg-blue-600 transition">
                            Start Building Now
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Free Resume Maker?</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            More than just a template — our AI resume maker helps you write better content and get past ATS screening.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, i) => {
                            const colors = colorClasses[feature.color];
                            return (
                                <div key={i} className={`${colors.bg} rounded-2xl p-7 border border-gray-100`}>
                                    <div className={`w-12 h-12 rounded-xl ${colors.iconBg} ${colors.iconText} flex items-center justify-center mb-5`}>
                                        {feature.icon}
                                    </div>
                                    <h3 className="font-bold text-lg mb-2 text-gray-900">{feature.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="py-20 bg-white">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Resume Maker vs. The Competition</h2>
                        <p className="text-gray-600">See why job seekers choose our free AI resume maker over alternatives.</p>
                    </div>

                    {/* Desktop: Table view */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="text-left p-4 font-semibold text-gray-900">Feature</th>
                                    <th className="text-center p-4 font-semibold text-accent-blue">Best AI Resumes</th>
                                    <th className="text-center p-4 font-semibold text-gray-400">Other Makers</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { feature: 'AI Writing Assistance', best: 'Full AI writing', other: 'Basic or none' },
                                    { feature: 'ATS Optimization', best: 'Real-time scoring', other: 'Limited testing' },
                                    { feature: 'All Templates Free', best: '20+ templates', other: 'Most are paid' },
                                    { feature: 'Free PDF Download', best: 'Always free', other: 'Often paywalled' },
                                    { feature: 'No Account Required', best: 'Start instantly', other: 'Usually required' },
                                    { feature: 'Industry Keywords', best: 'AI suggestions', other: 'Manual only' },
                                    { feature: 'Multiple Versions', best: 'Unlimited', other: 'Often limited' },
                                ].map((row, i) => (
                                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                                        <td className="p-4 font-medium text-gray-900 border-b border-gray-100">{row.feature}</td>
                                        <td className="p-4 text-center text-sm text-green-600 font-medium border-b border-gray-100">{row.best}</td>
                                        <td className="p-4 text-center text-sm text-gray-500 border-b border-gray-100">{row.other}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile: Card view */}
                    <div className="md:hidden space-y-4">
                        {[
                            { feature: 'AI Writing Assistance', best: 'Full AI writing', other: 'Basic or none' },
                            { feature: 'ATS Optimization', best: 'Real-time scoring', other: 'Limited testing' },
                            { feature: 'All Templates Free', best: '20+ templates', other: 'Most are paid' },
                            { feature: 'Free PDF Download', best: 'Always free', other: 'Often paywalled' },
                            { feature: 'No Account Required', best: 'Start instantly', other: 'Usually required' },
                            { feature: 'Industry Keywords', best: 'AI suggestions', other: 'Manual only' },
                            { feature: 'Multiple Versions', best: 'Unlimited', other: 'Often limited' },
                        ].map((row, i) => (
                            <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                <h3 className="font-semibold text-gray-900 mb-3">{row.feature}</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-accent-blue font-medium">Best AI Resumes:</span>
                                        <span className="text-green-600 font-medium">{row.best}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Other Makers:</span>
                                        <span className="text-gray-500">{row.other}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Template Showcase */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Professional Templates for Every Career</h2>
                    <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
                        From creative designers to corporate executives — find the perfect resume template for your industry.
                    </p>
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                        {['Software Engineer', 'Marketing Manager', 'Nurse', 'Sales Executive', 'Data Analyst', 'Teacher', 'Project Manager', 'Designer'].map((job) => (
                            <Link
                                key={job}
                                href={`/resume-examples/${job.toLowerCase().replace(/ /g, '-')}`}
                                className="p-4 bg-white rounded-xl border border-gray-100 hover:border-accent-blue/30 hover:shadow-md transition text-sm font-medium text-gray-700"
                            >
                                {job} Resume
                            </Link>
                        ))}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/templates" className="px-6 py-3 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition">
                            Browse All Templates
                        </Link>
                        <Link href="/resume-examples" className="px-6 py-3 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition">
                            See 300+ Resume Examples
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-white">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqItems.map((item, i) => (
                            <details key={i} className="bg-gray-50 rounded-xl border border-gray-100 group">
                                <summary className="p-5 font-medium text-gray-900 cursor-pointer hover:text-accent-blue transition list-none flex items-center justify-between">
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
            <section className="py-12 bg-gray-50 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Resume Tools</h3>
                    <div className="grid sm:grid-cols-3 gap-3 mb-8">
                        <Link href="/resume-ai" className="p-4 bg-white rounded-xl hover:bg-gray-50 transition text-center border border-gray-100">
                            <p className="font-medium text-gray-900">Resume AI</p>
                            <p className="text-xs text-gray-500 mt-1">AI-powered resume builder</p>
                        </Link>
                        <Link href="/tools/ats-checker" className="p-4 bg-white rounded-xl hover:bg-gray-50 transition text-center border border-gray-100">
                            <p className="font-medium text-gray-900">ATS Checker</p>
                            <p className="text-xs text-gray-500 mt-1">Test your resume ATS score</p>
                        </Link>
                        <Link href="/free-resume-builder" className="p-4 bg-white rounded-xl hover:bg-gray-50 transition text-center border border-gray-100">
                            <p className="font-medium text-gray-900">Free Resume Builder</p>
                            <p className="text-xs text-gray-500 mt-1">100% free resume creation</p>
                        </Link>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Helpful Guides</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                        <Link href="/blog/how-to-write-a-resume" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition border border-gray-100">
                            <span className="text-accent-blue">→</span>
                            <span className="text-sm text-gray-700">How to Write a Resume (2026 Guide)</span>
                        </Link>
                        <Link href="/blog/how-to-write-ats-friendly-resume" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition border border-gray-100">
                            <span className="text-accent-blue">→</span>
                            <span className="text-sm text-gray-700">How to Write an ATS-Friendly Resume</span>
                        </Link>
                        <Link href="/resume-format" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition border border-gray-100">
                            <span className="text-accent-blue">→</span>
                            <span className="text-sm text-gray-700">Resume Format Guide</span>
                        </Link>
                        <Link href="/blog/top-resume-mistakes-to-avoid" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition border border-gray-100">
                            <span className="text-accent-blue">→</span>
                            <span className="text-sm text-gray-700">Top Resume Mistakes to Avoid</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-20 bg-gradient-to-b from-white to-blue-50">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Ready to Make Your Resume?
                    </h2>
                    <p className="text-gray-600 mb-8 text-lg">
                        Join over 2 million job seekers who have created professional resumes with our free AI <Link href="/" className="text-accent-blue hover:underline">resume builder</Link>.
                    </p>
                    <Link href="/onboarding" className="inline-block px-10 py-4 bg-accent-blue text-white font-semibold rounded-xl hover:bg-blue-600 transition shadow-lg shadow-blue-500/30 text-lg">
                        Create My Resume Free
                    </Link>
                    <p className="text-gray-500 mt-4 text-sm">Free forever. No credit card required.</p>
                </div>
            </section>

            <Footer />
        </>
    );
}

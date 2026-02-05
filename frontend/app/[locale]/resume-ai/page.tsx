import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const siteUrl = 'https://www.bestairesumes.com';

const faqItems = [
    { question: 'What is Resume AI?', answer: 'Resume AI refers to artificial intelligence technology that helps you create professional resumes. Our Resume AI tool writes compelling bullet points, optimizes your content for ATS systems, suggests industry keywords, and formats everything automatically — so you get a job-winning resume in minutes instead of hours.' },
    { question: 'Is Resume AI better than writing a resume myself?', answer: 'Resume AI helps you write better content faster. It analyzes thousands of successful resumes to suggest professional phrasing, quantifiable achievements, and industry-specific keywords you might miss. You still control the final content — AI just makes the process easier and more effective.' },
    { question: 'Can Resume AI pass ATS screening?', answer: 'Yes! Our Resume AI is specifically designed for ATS compatibility. It formats your resume with clean, parseable text, suggests keywords that match job descriptions, and provides a real-time ATS score so you can optimize before submitting.' },
    { question: 'Is this Resume AI tool free?', answer: 'Yes, our Resume AI builder is 100% free. Create unlimited resumes, access all templates, and download PDFs at no cost. No credit card or subscription required.' },
    { question: 'How does Resume AI generate content?', answer: 'Our AI analyzes your job title, industry, and experience level to generate tailored suggestions. It uses patterns from millions of successful resumes to craft professional summaries, achievement-focused bullet points, and skill descriptions that resonate with hiring managers.' },
    { question: 'Will my resume look AI-generated?', answer: 'No. Our Resume AI creates natural, professional content that reads like it was written by an expert resume writer. You can edit any suggestion to add your personal voice, and the final result is uniquely yours.' },
];

// Schema markup — hardcoded constants only, no user input
const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Resume AI' },
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
    name: 'Resume AI Builder',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web Browser',
    offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
    },
    aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '3156',
    },
};

const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Resume AI: Free AI Resume Builder & Generator 2026',
    description: 'Build your resume with AI. Our free Resume AI tool writes professional content, optimizes for ATS, and creates job-winning resumes in minutes.',
    datePublished: '2026-01-28',
    dateModified: '2026-01-28',
    author: {
        '@type': 'Person',
        name: 'Michael Torres',
        url: `${siteUrl}/about/michael-torres`,
        jobTitle: 'AI Technology & Career Expert',
    },
    publisher: {
        '@type': 'Organization',
        name: 'Best AI Resume',
        url: siteUrl,
        logo: { '@type': 'ImageObject', url: `${siteUrl}/logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}/resume-ai` },
};

// Pre-serialized schema strings — SAFE: contains only hardcoded string constants, zero user input
const breadcrumbSchemaHtml = JSON.stringify(breadcrumbSchema);
const faqSchemaHtml = JSON.stringify(faqSchema);
const softwareAppSchemaHtml = JSON.stringify(softwareAppSchema);
const articleSchemaHtml = JSON.stringify(articleSchema);

export const metadata: Metadata = {
    title: 'Resume AI | Free AI Resume Builder & Generator 2026',
    description: 'Build your resume with AI in seconds. Free Resume AI tool that writes professional content, optimizes for ATS, and helps you land interviews.',
    keywords: 'resume ai, ai resume builder, ai resume generator, resume artificial intelligence, ai powered resume, smart resume builder, ai resume writer, resume ai free',
    alternates: {
        canonical: `${siteUrl}/resume-ai`,
    },
};

const aiFeatures = [
    {
        title: 'AI Content Writing',
        description: 'Our AI writes professional bullet points, summaries, and skill descriptions based on your experience and target role.',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
        ),
    },
    {
        title: 'Smart Keyword Optimization',
        description: 'AI analyzes job descriptions and suggests industry-specific keywords to help your resume match what employers are looking for.',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        ),
    },
    {
        title: 'ATS Score Analysis',
        description: 'Real-time AI scoring tells you exactly how your resume performs against ATS systems before you apply.',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
    },
    {
        title: 'Achievement Quantification',
        description: 'AI helps transform vague descriptions into quantifiable achievements with metrics that impress hiring managers.',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
        ),
    },
    {
        title: 'Industry-Specific Templates',
        description: 'AI recommends the best template layout and sections based on your industry and career level.',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
        ),
    },
    {
        title: 'Grammar & Tone Check',
        description: 'AI reviews your content for grammar, spelling, and professional tone — ensuring error-free, polished results.',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
];

const beforeAfter = [
    {
        before: 'Responsible for managing team and projects',
        after: 'Led cross-functional team of 8 engineers, delivering 12 projects on time with 98% client satisfaction',
    },
    {
        before: 'Helped increase sales',
        after: 'Drove 34% YoY revenue growth ($2.4M) by implementing data-driven outreach strategy',
    },
    {
        before: 'Good at customer service',
        after: 'Achieved 4.9/5 customer satisfaction rating, resolving 150+ inquiries daily with 95% first-contact resolution',
    },
];

// Component to render schema scripts safely - all content is from hardcoded constants above
function SchemaScripts() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: breadcrumbSchemaHtml }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: faqSchemaHtml }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: softwareAppSchemaHtml }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: articleSchemaHtml }}
            />
        </>
    );
}

export default function ResumeAIPage() {
    return (
        <>
            <Header />
            <SchemaScripts />

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-gradient-to-b from-purple-50 to-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-700 font-semibold rounded-full text-sm mb-6">
                        Powered by Advanced AI
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">
                        Build Your Resume<br />
                        <span className="text-purple-600">With AI in Seconds</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Our <strong>Resume AI</strong> writes professional content, optimizes for ATS systems,
                        and helps you create job-winning resumes — all for free. According to <a href="https://www.linkedin.com/business/talent/blog/talent-acquisition/how-recruiters-use-ai" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">LinkedIn research</a>, recruiters spend an average of just 7 seconds reviewing each resume. Let AI help you make every second count.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                        <Link href="/onboarding" className="px-8 py-4 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition shadow-lg shadow-purple-500/30 text-lg">
                            Try Resume AI Free
                        </Link>
                        <a href="#how-it-works" className="px-8 py-4 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition shadow-sm">
                            See How It Works
                        </a>
                    </div>
                    <p className="text-sm text-gray-500">
                        No sign-up required · 100% free · AI-powered content
                    </p>
                </div>
            </section>

            {/* What is Resume AI */}
            <section className="py-16 bg-white border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 md:p-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">What is Resume AI?</h2>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            <strong>Resume AI</strong> uses artificial intelligence to transform how you create resumes.
                            Instead of staring at a blank page, our AI analyzes your experience, understands your target role,
                            and generates professional content tailored to your industry. As noted by the <a href="https://www.shrm.org/topics-tools/news/talent-acquisition/ai-rapidly-transforming-how-companies-recruit" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">Society for Human Resource Management (SHRM)</a>, AI is rapidly transforming recruitment — and AI-assisted resume writing is now widely accepted by employers.
                        </p>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-white rounded-xl p-5 border border-purple-100">
                                <div className="text-3xl font-bold text-purple-600 mb-1">10x</div>
                                <p className="text-sm text-gray-600">Faster than manual writing</p>
                            </div>
                            <div className="bg-white rounded-xl p-5 border border-purple-100">
                                <div className="text-3xl font-bold text-purple-600 mb-1">85%</div>
                                <p className="text-sm text-gray-600">Higher ATS pass rate</p>
                            </div>
                            <div className="bg-white rounded-xl p-5 border border-purple-100">
                                <div className="text-3xl font-bold text-purple-600 mb-1">3M+</div>
                                <p className="text-sm text-gray-600">Resumes created with AI</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* AI Features Grid */}
            <section id="how-it-works" className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">How Resume AI Helps You</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Our AI does more than just format your resume — it actively helps you write better content.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {aiFeatures.map((feature, i) => (
                            <div key={i} className="bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-lg transition">
                                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-5">
                                    {feature.icon}
                                </div>
                                <h3 className="font-bold text-lg mb-2 text-gray-900">{feature.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Before/After Examples */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">See AI Transform Your Resume</h2>
                        <p className="text-gray-600">Real examples of how Resume AI improves your content.</p>
                    </div>

                    <div className="space-y-6">
                        {beforeAfter.map((item, i) => (
                            <div key={i} className="grid md:grid-cols-2 gap-4">
                                <div className="bg-red-50 rounded-xl p-6 border border-red-100">
                                    <div className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-2">Before</div>
                                    <p className="text-gray-700 italic">&quot;{item.before}&quot;</p>
                                </div>
                                <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                                    <div className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-2">After AI</div>
                                    <p className="text-gray-700">&quot;{item.after}&quot;</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-10">
                        <Link href="/onboarding" className="inline-block px-8 py-4 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition">
                            Transform My Resume with AI
                        </Link>
                    </div>
                </div>
            </section>

            {/* AI vs Manual Comparison */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Resume AI vs. Writing It Yourself</h2>
                        <p className="text-gray-600">See why job seekers choose AI-powered resume building.</p>
                    </div>

                    {/* Desktop: Table view */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-white border-b border-gray-200">
                                    <th className="text-left p-4 font-semibold text-gray-900">Aspect</th>
                                    <th className="text-center p-4 font-semibold text-purple-600">With Resume AI</th>
                                    <th className="text-center p-4 font-semibold text-gray-400">Manual Writing</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { aspect: 'Time to Complete', ai: '10-15 minutes', manual: '2-4 hours' },
                                    { aspect: 'Professional Phrasing', ai: 'AI-generated suggestions', manual: 'Research required' },
                                    { aspect: 'ATS Optimization', ai: 'Automatic', manual: 'Manual guesswork' },
                                    { aspect: 'Industry Keywords', ai: 'AI-suggested', manual: 'Self-research' },
                                    { aspect: 'Grammar/Spelling', ai: 'Auto-checked', manual: 'Easy to miss errors' },
                                    { aspect: 'Achievement Metrics', ai: 'AI helps quantify', manual: 'Often forgotten' },
                                    { aspect: 'Format/Design', ai: '20+ templates', manual: 'Start from scratch' },
                                ].map((row, i) => (
                                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                                        <td className="p-4 font-medium text-gray-900 border-b border-gray-100">{row.aspect}</td>
                                        <td className="p-4 text-center text-sm text-green-600 font-medium border-b border-gray-100">{row.ai}</td>
                                        <td className="p-4 text-center text-sm text-gray-500 border-b border-gray-100">{row.manual}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile: Card view */}
                    <div className="md:hidden space-y-4">
                        {[
                            { aspect: 'Time to Complete', ai: '10-15 minutes', manual: '2-4 hours' },
                            { aspect: 'Professional Phrasing', ai: 'AI-generated suggestions', manual: 'Research required' },
                            { aspect: 'ATS Optimization', ai: 'Automatic', manual: 'Manual guesswork' },
                            { aspect: 'Industry Keywords', ai: 'AI-suggested', manual: 'Self-research' },
                            { aspect: 'Grammar/Spelling', ai: 'Auto-checked', manual: 'Easy to miss errors' },
                            { aspect: 'Achievement Metrics', ai: 'AI helps quantify', manual: 'Often forgotten' },
                            { aspect: 'Format/Design', ai: '20+ templates', manual: 'Start from scratch' },
                        ].map((row, i) => (
                            <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                <h3 className="font-semibold text-gray-900 mb-3">{row.aspect}</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-purple-600 font-medium">With Resume AI:</span>
                                        <span className="text-green-600 font-medium">{row.ai}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Manual Writing:</span>
                                        <span className="text-gray-500">{row.manual}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Use Cases */}
            <section className="py-20 bg-white">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Who Uses Resume AI?</h2>
                        <p className="text-gray-600">AI-powered resume building works for everyone.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: 'Career Changers', desc: 'AI helps translate skills from one industry to another' },
                            { title: 'Recent Graduates', desc: 'Turn internships and projects into professional achievements' },
                            { title: 'Senior Professionals', desc: 'Condense 20+ years into a compelling 2-page resume' },
                            { title: 'Job Seekers', desc: 'Create tailored resumes for each application quickly' },
                        ].map((item, i) => (
                            <div key={i} className="bg-purple-50 rounded-xl p-6 text-center">
                                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqItems.map((item, i) => (
                            <details key={i} className="bg-white rounded-xl border border-gray-100 group">
                                <summary className="p-5 font-medium text-gray-900 cursor-pointer hover:text-purple-600 transition list-none flex items-center justify-between">
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
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">More AI Resume Tools</h3>
                    <div className="grid sm:grid-cols-3 gap-3 mb-8">
                        <Link href="/resume-maker" className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition text-center border border-gray-100">
                            <p className="font-medium text-gray-900">Resume Maker</p>
                            <p className="text-xs text-gray-500 mt-1">Free AI resume maker</p>
                        </Link>
                        <Link href="/tools/ats-checker" className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition text-center border border-gray-100">
                            <p className="font-medium text-gray-900">ATS Checker</p>
                            <p className="text-xs text-gray-500 mt-1">AI-powered ATS analysis</p>
                        </Link>
                        <Link href="/free-resume-builder" className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition text-center border border-gray-100">
                            <p className="font-medium text-gray-900">Free Resume Builder</p>
                            <p className="text-xs text-gray-500 mt-1">100% free AI builder</p>
                        </Link>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">AI Resume Guides</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                        <Link href="/career-tips/ai-resume-tools" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition border border-gray-100">
                            <span className="text-purple-600">→</span>
                            <span className="text-sm text-gray-700">AI Tools for Resume Writing (2026)</span>
                        </Link>
                        <Link href="/blog/chatgpt-vs-claude-for-resumes" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition border border-gray-100">
                            <span className="text-purple-600">→</span>
                            <span className="text-sm text-gray-700">ChatGPT vs Claude for Resumes</span>
                        </Link>
                        <Link href="/blog/how-to-write-ats-friendly-resume" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition border border-gray-100">
                            <span className="text-purple-600">→</span>
                            <span className="text-sm text-gray-700">How to Write an ATS-Friendly Resume</span>
                        </Link>
                        <Link href="/resume-examples" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition border border-gray-100">
                            <span className="text-purple-600">→</span>
                            <span className="text-sm text-gray-700">300+ Resume Examples</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-20 bg-gradient-to-b from-gray-50 to-purple-50">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Ready to Build Your Resume with AI?
                    </h2>
                    <p className="text-gray-600 mb-8 text-lg">
                        Join millions of job seekers using <Link href="/" className="text-purple-600 hover:underline">AI-powered resume building</Link> to land more interviews.
                    </p>
                    <Link href="/onboarding" className="inline-block px-10 py-4 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition shadow-lg shadow-purple-500/30 text-lg">
                        Start With Resume AI Free
                    </Link>
                    <p className="text-gray-500 mt-4 text-sm">Free forever. No credit card required.</p>
                </div>
            </section>

            <Footer />
        </>
    );
}

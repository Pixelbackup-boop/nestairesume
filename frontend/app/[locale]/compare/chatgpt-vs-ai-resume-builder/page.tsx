import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const siteUrl = 'https://www.bestairesumes.com';

const faqItems = [
    { question: 'Can ChatGPT write a good resume?', answer: 'ChatGPT can generate resume text (bullet points, summaries, objectives), but it cannot format a resume, ensure ATS compatibility, or output a downloadable PDF. You still need a separate tool to format and design the document. A dedicated AI resume builder handles writing AND formatting in one step.' },
    { question: 'Is it okay to use AI to write a resume?', answer: 'Yes. AI-assisted resume writing is widely accepted in 2026. Hiring managers care about the quality of your resume content, not how it was created. The key is to personalize AI-generated content with your real achievements, metrics, and experiences — never submit generic AI output without customization.' },
    { question: 'What are the disadvantages of using ChatGPT for resumes?', answer: 'ChatGPT produces plain text without formatting, has no ATS awareness, cannot score your resume against job descriptions, produces generic content without your specific metrics, and requires you to manually copy-paste into a template. It also has no resume-specific training — it treats resume writing like any other text task.' },
    { question: 'Do ATS systems reject ChatGPT resumes?', answer: 'ATS systems do not detect or care about AI-written content. However, if you paste ChatGPT text into a poorly formatted template (like a Canva graphic or Word table), the ATS may fail to parse it. A dedicated resume builder ensures both the content AND format are ATS-compatible.' },
    { question: 'Is Best AI Resume Builder better than ChatGPT for resumes?', answer: 'For the specific task of creating a job-ready resume, yes. Best AI Resume Builder combines AI writing with professional formatting, ATS optimization, keyword matching, and PDF export in one tool. ChatGPT is a general-purpose AI — it can write text but cannot format, score, or export a resume.' },
];

// All schema objects below contain ONLY hardcoded string constants — zero user input
const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Compare', item: `${siteUrl}/compare` },
        { '@type': 'ListItem', position: 3, name: 'ChatGPT vs AI Resume Builder' },
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
    headline: 'ChatGPT vs AI Resume Builder: Which Makes Better Resumes in 2026?',
    description: 'Compare using ChatGPT vs a dedicated AI resume builder for creating job-winning resumes. Feature-by-feature comparison with honest pros and cons.',
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
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}/compare/chatgpt-vs-ai-resume-builder` },
};

// Pre-serialized schema strings from hardcoded constants above — safe for rendering
const breadcrumbSchemaHtml = JSON.stringify(breadcrumbSchema);
const faqSchemaHtml = JSON.stringify(faqSchema);
const articleSchemaHtml = JSON.stringify(articleSchema);

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const locales = ['en', 'es', 'fr', 'de', 'ar'];
    const alternateLanguages: Record<string, string> = {
        'x-default': `${siteUrl}/en/compare/chatgpt-vs-ai-resume-builder`,
    };
    locales.forEach((loc) => {
        alternateLanguages[loc] = `${siteUrl}/${loc}/compare/chatgpt-vs-ai-resume-builder`;
    });

    return {
        title: 'ChatGPT vs AI Resume Builder: Which Creates Better Resumes? (2026) | Best AI Resume',
        description: 'Should you use ChatGPT or a dedicated AI resume builder to write your resume? Compare formatting, ATS compatibility, and output quality. See which tool gets more interviews.',
        keywords: 'chatgpt resume, chatgpt resume builder, ai resume builder, chatgpt vs resume builder, write resume with chatgpt, ai resume writer',
        openGraph: {
            title: 'ChatGPT vs AI Resume Builder: Which Creates Better Resumes? (2026)',
            description: 'Compare using ChatGPT vs a dedicated AI resume builder. Feature-by-feature comparison with honest pros and cons.',
            type: 'article',
            url: `${siteUrl}/${locale}/compare/chatgpt-vs-ai-resume-builder`,
        },
        twitter: {
            card: 'summary_large_image',
            title: 'ChatGPT vs AI Resume Builder: Which Creates Better Resumes?',
            description: 'Compare using ChatGPT vs a dedicated AI resume builder for creating job-winning resumes.',
        },
        alternates: {
            canonical: `${siteUrl}/${locale}/compare/chatgpt-vs-ai-resume-builder`,
            languages: alternateLanguages,
        },
    };
}

export default function ChatGPTComparisonPage() {
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
                    <span className="text-accent-blue font-semibold tracking-wider uppercase text-sm">Comparison</span>
                    <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6 text-gray-900">
                        ChatGPT vs AI Resume Builder:<br />
                        <span className="text-accent-blue">Which Gets You Hired?</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                        ChatGPT can write text. A resume builder creates <strong>interview-ready documents</strong>.
                        Here&apos;s why that difference matters for your job search.
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

            {/* The Problem with ChatGPT Resumes */}
            <section className="py-16 bg-white border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 md:p-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">The Problem: ChatGPT Writes Text, Not Resumes</h2>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            ChatGPT is a general-purpose AI that generates text. It can write resume bullet points, summaries,
                            and cover letters — but it <strong>cannot format a document, ensure ATS compatibility, or export a PDF</strong>.
                            You get raw text that you still need to design, format, and optimize yourself.
                        </p>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-white rounded-xl p-5 border border-amber-100">
                                <div className="text-3xl font-bold text-amber-500 mb-1">0</div>
                                <p className="text-sm text-gray-600">Templates included — ChatGPT outputs plain text only</p>
                            </div>
                            <div className="bg-white rounded-xl p-5 border border-amber-100">
                                <div className="text-3xl font-bold text-amber-500 mb-1">0%</div>
                                <p className="text-sm text-gray-600">ATS awareness — no keyword scoring or format checking</p>
                            </div>
                            <div className="bg-white rounded-xl p-5 border border-amber-100">
                                <div className="text-3xl font-bold text-amber-500 mb-1">3+</div>
                                <p className="text-sm text-gray-600">Extra tools needed — template, formatter, PDF converter</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Comparison Table */}
            <section id="comparison" className="py-16 bg-gray-50">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">ChatGPT vs Best AI Resume Builder</h2>
                        <p className="text-gray-400">An honest, feature-by-feature comparison for job seekers.</p>
                    </div>

                    {/* Desktop: Table view */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-white border-b border-gray-100">
                                    <th className="text-left p-4 font-semibold text-gray-900">Feature</th>
                                    <th className="text-center p-4 font-semibold text-gray-400">ChatGPT</th>
                                    <th className="text-center p-4 font-semibold text-accent-blue">Best AI Resumes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { feature: 'AI Content Writing', chatgpt: 'Strong general text generation', best: 'Resume-specific AI with industry keywords', chatgptIcon: 'yes', bestIcon: 'yes' },
                                    { feature: 'Professional Templates', chatgpt: 'No templates — text only', best: '20+ ATS-tested templates', chatgptIcon: 'no', bestIcon: 'yes' },
                                    { feature: 'ATS Optimization', chatgpt: 'No ATS awareness', best: 'Real-time ATS score and keyword matching', chatgptIcon: 'no', bestIcon: 'yes' },
                                    { feature: 'PDF Export', chatgpt: 'No document export', best: 'One-click clean PDF export', chatgptIcon: 'no', bestIcon: 'yes' },
                                    { feature: 'Formatting and Design', chatgpt: 'Plain text output only', best: 'Professional formatting built-in', chatgptIcon: 'no', bestIcon: 'yes' },
                                    { feature: 'Job Description Matching', chatgpt: 'Manual — paste JD into prompt', best: 'Automatic keyword extraction and matching', chatgptIcon: 'partial', bestIcon: 'yes' },
                                    { feature: 'Section Structure', chatgpt: 'You define the structure in prompts', best: 'Guided section-by-section flow', chatgptIcon: 'partial', bestIcon: 'yes' },
                                    { feature: 'Consistency', chatgpt: 'Output varies by prompt quality', best: 'Consistent, tested output every time', chatgptIcon: 'partial', bestIcon: 'yes' },
                                    { feature: 'Content Personalization', chatgpt: 'Requires detailed prompting', best: 'Pulls from your entered experience', chatgptIcon: 'partial', bestIcon: 'yes' },
                                    { feature: 'Price', chatgpt: 'Free (GPT-3.5) or $20/mo (GPT-4)', best: 'Free tier available', chatgptIcon: 'yes', bestIcon: 'yes' },
                                    { feature: 'Learning Curve', chatgpt: 'Prompt engineering required', best: 'Fill-in-the-blank simplicity', chatgptIcon: 'partial', bestIcon: 'yes' },
                                    { feature: 'Multiple Resumes', chatgpt: 'Start from scratch each time', best: 'Save and edit multiple versions', chatgptIcon: 'partial', bestIcon: 'yes' },
                                ].map((row, i) => {
                                    const icon = (type: string) => {
                                        if (type === 'yes') return <span className="text-green-600 font-medium">&#10003;</span>;
                                        if (type === 'no') return <span className="text-red-500 font-medium">&#10007;</span>;
                                        return <span className="text-amber-500 font-medium">~</span>;
                                    };
                                    return (
                                        <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                                            <td className="p-4 font-medium text-gray-900 border-b border-gray-100">{row.feature}</td>
                                            <td className="p-4 text-center text-sm text-gray-600 border-b border-gray-100">
                                                <span className="mr-2">{icon(row.chatgptIcon)}</span>{row.chatgpt}
                                            </td>
                                            <td className="p-4 text-center text-sm text-gray-800 font-medium border-b border-gray-100">
                                                <span className="mr-2">{icon(row.bestIcon)}</span>{row.best}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile: Card view */}
                    <div className="md:hidden space-y-4">
                        {[
                            { feature: 'AI Content Writing', chatgpt: 'Strong general text generation', best: 'Resume-specific AI with industry keywords', chatgptIcon: 'yes', bestIcon: 'yes' },
                            { feature: 'Professional Templates', chatgpt: 'No templates — text only', best: '20+ ATS-tested templates', chatgptIcon: 'no', bestIcon: 'yes' },
                            { feature: 'ATS Optimization', chatgpt: 'No ATS awareness', best: 'Real-time ATS score and keyword matching', chatgptIcon: 'no', bestIcon: 'yes' },
                            { feature: 'PDF Export', chatgpt: 'No document export', best: 'One-click clean PDF export', chatgptIcon: 'no', bestIcon: 'yes' },
                            { feature: 'Formatting and Design', chatgpt: 'Plain text output only', best: 'Professional formatting built-in', chatgptIcon: 'no', bestIcon: 'yes' },
                            { feature: 'Job Description Matching', chatgpt: 'Manual — paste JD into prompt', best: 'Automatic keyword extraction and matching', chatgptIcon: 'partial', bestIcon: 'yes' },
                            { feature: 'Section Structure', chatgpt: 'You define the structure in prompts', best: 'Guided section-by-section flow', chatgptIcon: 'partial', bestIcon: 'yes' },
                            { feature: 'Consistency', chatgpt: 'Output varies by prompt quality', best: 'Consistent, tested output every time', chatgptIcon: 'partial', bestIcon: 'yes' },
                            { feature: 'Content Personalization', chatgpt: 'Requires detailed prompting', best: 'Pulls from your entered experience', chatgptIcon: 'partial', bestIcon: 'yes' },
                            { feature: 'Price', chatgpt: 'Free (GPT-3.5) or $20/mo (GPT-4)', best: 'Free tier available', chatgptIcon: 'yes', bestIcon: 'yes' },
                            { feature: 'Learning Curve', chatgpt: 'Prompt engineering required', best: 'Fill-in-the-blank simplicity', chatgptIcon: 'partial', bestIcon: 'yes' },
                            { feature: 'Multiple Resumes', chatgpt: 'Start from scratch each time', best: 'Save and edit multiple versions', chatgptIcon: 'partial', bestIcon: 'yes' },
                        ].map((row, i) => {
                            const icon = (type: string) => {
                                if (type === 'yes') return <span className="text-green-600 font-medium">&#10003;</span>;
                                if (type === 'no') return <span className="text-red-500 font-medium">&#10007;</span>;
                                return <span className="text-amber-500 font-medium">~</span>;
                            };
                            return (
                                <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                    <h3 className="font-semibold text-gray-900 mb-3">{row.feature}</h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-start gap-2">
                                            <span className="text-gray-400 shrink-0 w-20">ChatGPT:</span>
                                            <span className="text-gray-600 flex items-start gap-1">
                                                {icon(row.chatgptIcon)} {row.chatgpt}
                                            </span>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <span className="text-accent-blue font-medium shrink-0 w-20">Best AI:</span>
                                            <span className="text-gray-800 font-medium flex items-start gap-1">
                                                {icon(row.bestIcon)} {row.best}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* What ChatGPT Does Well */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What ChatGPT Does Well for Resumes</h2>
                    <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
                        To be fair, ChatGPT has real strengths. Here&apos;s where it genuinely helps with resume writing:
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                            <h3 className="font-bold text-gray-900 mb-2">Brainstorming Bullet Points</h3>
                            <p className="text-gray-600 text-sm">ChatGPT excels at generating multiple versions of achievement-focused bullet points from a job description. Great for overcoming writer&apos;s block.</p>
                        </div>
                        <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                            <h3 className="font-bold text-gray-900 mb-2">Rewriting Weak Content</h3>
                            <p className="text-gray-600 text-sm">Paste a duty-based bullet point and ask ChatGPT to rewrite it as an achievement. It&apos;s good at transforming &ldquo;responsible for&rdquo; into action verbs with metrics.</p>
                        </div>
                        <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                            <h3 className="font-bold text-gray-900 mb-2">Industry Keyword Research</h3>
                            <p className="text-gray-600 text-sm">Ask ChatGPT to identify key skills and keywords for a specific role. It provides solid keyword lists that help with ATS matching.</p>
                        </div>
                        <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                            <h3 className="font-bold text-gray-900 mb-2">Cover Letter Drafts</h3>
                            <p className="text-gray-600 text-sm">ChatGPT writes reasonable first drafts of cover letters. You&apos;ll need to personalize them, but it&apos;s a solid starting point.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Where ChatGPT Falls Short */}
            <section className="py-16 bg-gray-50 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Where ChatGPT Falls Short</h2>

                    <div className="space-y-6">
                        <div className="bg-white rounded-xl p-6 border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-2">No Formatting or Templates</h3>
                            <p className="text-gray-600">ChatGPT outputs plain text. You need a separate tool (Google Docs, Word, Canva, or a resume builder) to format it into a professional document. This adds time and introduces formatting errors.</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-2">No ATS Awareness</h3>
                            <p className="text-gray-600">ChatGPT does not know which keywords an ATS is scanning for, what section headers it expects, or what format it can parse. It generates text without any awareness of automated screening systems.</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-2">Generic Output Without Your Data</h3>
                            <p className="text-gray-600">Unless you provide extremely detailed prompts with your specific metrics and achievements, ChatGPT generates generic content. &ldquo;Managed a team of professionals&rdquo; instead of &ldquo;Led a 12-person engineering team that shipped 3 products ahead of schedule.&rdquo;</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-2">Inconsistent Quality</h3>
                            <p className="text-gray-600">ChatGPT&apos;s output quality depends entirely on your prompt. Small changes in wording produce very different results. A dedicated resume builder produces consistent, tested output every time.</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-2">No PDF Export</h3>
                            <p className="text-gray-600">You cannot send a ChatGPT conversation to a recruiter. You need to copy the text, paste it into a template, adjust the formatting, and export as PDF — a process that takes 30+ minutes.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Best of Both Worlds */}
            <section className="py-16 bg-white border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">The Best Approach: Use Both</h2>

                    <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200">
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            Here&apos;s the optimal workflow for using AI to create a resume in 2026:
                        </p>
                        <ol className="space-y-4">
                            <li className="flex gap-4">
                                <span className="w-8 h-8 rounded-full bg-accent-blue text-white flex items-center justify-center font-bold text-sm shrink-0">1</span>
                                <div>
                                    <p className="font-medium text-gray-900">Use ChatGPT for brainstorming</p>
                                    <p className="text-gray-600 text-sm mt-1">Ask it to generate bullet point ideas, rewrite weak content, and identify industry keywords for your target role.</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <span className="w-8 h-8 rounded-full bg-accent-blue text-white flex items-center justify-center font-bold text-sm shrink-0">2</span>
                                <div>
                                    <p className="font-medium text-gray-900">Build your resume in a dedicated builder</p>
                                    <p className="text-gray-600 text-sm mt-1">Use Best AI Resume Builder to format your content into a professional, ATS-optimized template with proper structure and keyword matching.</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <span className="w-8 h-8 rounded-full bg-accent-blue text-white flex items-center justify-center font-bold text-sm shrink-0">3</span>
                                <div>
                                    <p className="font-medium text-gray-900">Personalize with your real data</p>
                                    <p className="text-gray-600 text-sm mt-1">Replace generic AI text with your actual metrics, achievements, and company names. No AI tool can know your specific accomplishments — you add that.</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <span className="w-8 h-8 rounded-full bg-accent-blue text-white flex items-center justify-center font-bold text-sm shrink-0">4</span>
                                <div>
                                    <p className="font-medium text-gray-900">Export and apply</p>
                                    <p className="text-gray-600 text-sm mt-1">Download your ATS-optimized PDF and apply directly. No copy-pasting, no formatting struggles, no extra tools needed.</p>
                                </div>
                            </li>
                        </ol>
                    </div>
                </div>
            </section>

            {/* Who Should Use What */}
            <section className="py-16 bg-gray-50 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Honest Recommendation: Who Should Use What?</h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-2xl p-8 border border-gray-100">
                            <h3 className="font-bold text-lg text-gray-900 mb-4">Use ChatGPT if you...</h3>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex gap-3"><span className="text-gray-500 mt-0.5">&bull;</span>Already have a well-formatted resume template</li>
                                <li className="flex gap-3"><span className="text-gray-500 mt-0.5">&bull;</span>Just need help brainstorming bullet point ideas</li>
                                <li className="flex gap-3"><span className="text-gray-500 mt-0.5">&bull;</span>Are comfortable with document formatting</li>
                                <li className="flex gap-3"><span className="text-gray-500 mt-0.5">&bull;</span>Want to research industry keywords and trends</li>
                            </ul>
                        </div>

                        <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200">
                            <h3 className="font-bold text-lg text-gray-900 mb-4">Use Best AI Resumes if you...</h3>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex gap-3"><span className="text-accent-blue mt-0.5">&check;</span>Want a complete, job-ready resume from one tool</li>
                                <li className="flex gap-3"><span className="text-accent-blue mt-0.5">&check;</span>Need ATS-optimized formatting and keyword scoring</li>
                                <li className="flex gap-3"><span className="text-accent-blue mt-0.5">&check;</span>Do not want to deal with templates and formatting</li>
                                <li className="flex gap-3"><span className="text-accent-blue mt-0.5">&check;</span>Want to save and edit multiple resume versions</li>
                                <li className="flex gap-3"><span className="text-accent-blue mt-0.5">&check;</span>Need one-click PDF export ready to send</li>
                            </ul>
                        </div>
                    </div>

                    <p className="text-center text-gray-400 mt-8 text-sm">
                        <strong>The bottom line:</strong> ChatGPT is a great writing assistant, but it is not a resume builder. For a complete, ATS-ready resume, you need a purpose-built tool.
                    </p>
                </div>
            </section>

            {/* Resume Examples CTA */}
            <section className="py-16 bg-white border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">See What AI-Built Resumes Look Like</h2>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                        Browse 300+ real resume examples for every profession — all built with ATS-optimized AI that goes beyond what ChatGPT alone can produce.
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

            {/* Cross-Links */}
            <section className="py-12 bg-white border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Compare Other Resume Builders</h3>
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                        <Link href="/canva-alternative" className="p-4 bg-gray-50 rounded-xl hover:bg-gray-50 transition text-center">
                            <p className="font-medium text-gray-900">Canva Alternative</p>
                            <p className="text-xs text-gray-400 mt-1">Design tool vs resume builder</p>
                        </Link>
                        <Link href="/overleaf-alternative" className="p-4 bg-gray-50 rounded-xl hover:bg-gray-50 transition text-center">
                            <p className="font-medium text-gray-900">Overleaf Alternative</p>
                            <p className="text-xs text-gray-400 mt-1">LaTeX vs AI builder</p>
                        </Link>
                        <Link href="/resume-io-alternative" className="p-4 bg-gray-50 rounded-xl hover:bg-gray-50 transition text-center">
                            <p className="font-medium text-gray-900">Resume.io Alternative</p>
                            <p className="text-xs text-gray-400 mt-1">Pricing and features compared</p>
                        </Link>
                        <Link href="/rezi-alternative" className="p-4 bg-gray-50 rounded-xl hover:bg-gray-50 transition text-center">
                            <p className="font-medium text-gray-900">Rezi Alternative</p>
                            <p className="text-xs text-gray-400 mt-1">AI tools compared</p>
                        </Link>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Helpful Resume Guides</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                        <Link href="/blog/what-is-ats-guide" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-50 transition">
                            <span className="text-accent-blue">&rarr;</span>
                            <span className="text-sm text-gray-700">What Is an ATS? Complete Guide</span>
                        </Link>
                        <Link href="/blog/how-to-write-a-resume" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-50 transition">
                            <span className="text-accent-blue">&rarr;</span>
                            <span className="text-sm text-gray-700">How to Write a Resume (Step-by-Step)</span>
                        </Link>
                        <Link href="/blog/chatgpt-vs-claude-for-resumes" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-50 transition">
                            <span className="text-accent-blue">&rarr;</span>
                            <span className="text-sm text-gray-700">ChatGPT vs Claude for Resumes</span>
                        </Link>
                        <Link href="/blog/how-to-write-professional-summary" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-50 transition">
                            <span className="text-accent-blue">&rarr;</span>
                            <span className="text-sm text-gray-700">How to Write a Professional Summary</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Ready to Go Beyond ChatGPT?
                    </h2>
                    <p className="text-gray-600 mb-8 text-lg">
                        Create a complete, ATS-optimized resume with our <Link href="/" className="text-accent-blue hover:underline">AI resume builder</Link> — writing, formatting, and PDF export in one tool.
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

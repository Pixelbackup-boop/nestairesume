import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const siteUrl = 'https://www.bestairesumes.com';

const faqItems = [
    { question: 'What is the difference between biodata and resume?', answer: 'A resume focuses on professional experience, skills, and achievements tailored to a specific job. A biodata includes personal details like date of birth, marital status, religion, and family background in addition to professional information. Resumes are standard in Western countries, while biodata is preferred in South Asia, Middle East, and parts of Southeast Asia.' },
    { question: 'Is biodata format used for job applications?', answer: 'Yes, biodata is commonly used for job applications in India, Pakistan, Bangladesh, Philippines, and Middle Eastern countries. Government jobs, public sector positions, and traditional companies often specifically request biodata format instead of a resume.' },
    { question: 'What personal details should I include in biodata?', answer: 'A job biodata typically includes: full name, date of birth, gender, nationality, marital status, languages known, and permanent/current address. For marriage biodata, you may also include height, weight, religion, caste, family details, and horoscope information.' },
    { question: 'How long should a biodata be?', answer: 'A biodata should ideally be 1-2 pages. Job biodata is typically 1 page, while marriage biodata can extend to 2 pages to include family details and personal preferences. Keep it concise while including all relevant information.' },
    { question: 'Can I use a resume builder to create biodata?', answer: 'Yes, you can use our AI resume builder to create biodata. Start with our standard resume template and add the personal information sections that biodata requires. Our builder allows you to customize sections to match the biodata format expected in your region.' },
    { question: 'What is marriage biodata?', answer: 'Marriage biodata (also called matrimonial biodata) is used in countries with arranged marriage traditions like India and Pakistan. It includes extensive personal information about the individual, family background, education, career, horoscope details, and partner preferences to help families evaluate compatibility.' },
];

// All schema objects contain only hardcoded string constants — no user input
const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Biodata Format Guide' },
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
    headline: 'Biodata Format Guide 2026: Templates, Examples & How to Write',
    description: 'Complete guide to biodata format for job applications and marriage. Learn the difference between biodata vs resume, download free templates, and see examples.',
    author: {
        '@type': 'Organization',
        name: 'Best AI Resume',
        url: siteUrl,
    },
    datePublished: '2026-01-28',
    dateModified: '2026-01-28',
};

export const metadata: Metadata = {
    title: 'Biodata Format 2026: Free Templates, Examples & Writing Guide | Best AI Resume',
    description: 'Learn the biodata format for job applications. Compare biodata vs resume, download free biodata templates (PDF & Word), and see examples for India, Pakistan & more.',
    keywords: 'biodata format, biodata, biodata for job, biodata vs resume, marriage biodata format, biodata template, simple biodata format, job biodata',
    openGraph: {
        title: 'Biodata Format 2026: Free Templates & Complete Guide',
        description: 'Complete biodata format guide with free templates. Learn when to use biodata vs resume for jobs in India, Pakistan, and Middle East.',
        type: 'article',
    },
};

export default function BiodataFormatPage() {
    return (
        <>
            <Header />
            {/* Schema markup — all hardcoded constants, no user input */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

            {/* Hero Section */}
            <section className="pt-32 pb-16 bg-gradient-to-b from-orange-50 to-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <span className="text-orange-600 font-semibold tracking-wider uppercase text-sm">Complete Guide for 2026</span>
                    <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6 text-gray-900">
                        Biodata Format Guide<br />
                        <span className="text-orange-500">(Free Templates)</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                        The <strong>biodata format</strong> is the standard document for job applications in India, Pakistan, Bangladesh, and the Middle East.
                        Learn when to use biodata vs resume, and download free templates that match regional expectations.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="#templates" className="px-8 py-4 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition shadow-sm">
                            Download Templates
                        </a>
                        <Link href="/onboarding" className="px-8 py-4 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition shadow-lg shadow-orange-500/30">
                            Create Biodata with AI
                        </Link>
                    </div>
                </div>
            </section>

            {/* What is Biodata */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Biodata?</h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        <strong>Biodata</strong> (short for <em>biographical data</em>) is a document that provides a comprehensive overview of your personal and professional background.
                        Unlike a resume that focuses primarily on work experience and skills, biodata includes <strong>personal details</strong> such as date of birth, marital status, nationality, religion, and sometimes family information.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        The biodata format is widely used in <strong>South Asian countries</strong> (India, Pakistan, Bangladesh, Sri Lanka), the <strong>Middle East</strong> (UAE, Saudi Arabia, Qatar), and parts of <strong>Southeast Asia</strong> (Philippines, Malaysia).
                        Government jobs, public sector companies, and traditional organizations in these regions often specifically request biodata rather than a Western-style resume.
                    </p>

                    <div className="bg-orange-50 border-l-4 border-orange-500 p-6 my-8 rounded-r-lg">
                        <h4 className="font-bold text-orange-900 mb-2">Key Insight:</h4>
                        <p className="text-orange-800">If you're applying for jobs in India, Pakistan, or the Gulf countries, knowing the biodata format is essential. Many employers will reject applications that don't follow the expected format.</p>
                    </div>
                </div>
            </section>

            {/* Biodata vs Resume vs CV Comparison */}
            <section id="comparison" className="py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Biodata vs Resume vs CV: What's the Difference?</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Understanding when to use each document is crucial for your job search success.</p>
                    </div>

                    {/* Desktop: Table view */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full border-collapse bg-white rounded-xl shadow-sm">
                            <thead>
                                <tr className="bg-gray-100 border-b border-gray-200">
                                    <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Aspect</th>
                                    <th className="p-4 text-left text-sm font-semibold text-orange-600 uppercase tracking-wider">Biodata</th>
                                    <th className="p-4 text-left text-sm font-semibold text-blue-600 uppercase tracking-wider">Resume</th>
                                    <th className="p-4 text-left text-sm font-semibold text-teal-primary uppercase tracking-wider">CV</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <tr>
                                    <td className="p-4 font-medium text-gray-900">Length</td>
                                    <td className="p-4 text-gray-700">1-2 pages</td>
                                    <td className="p-4 text-gray-700">1-2 pages</td>
                                    <td className="p-4 text-gray-700">2+ pages</td>
                                </tr>
                                <tr className="bg-gray-50/50">
                                    <td className="p-4 font-medium text-gray-900">Personal Details</td>
                                    <td className="p-4 text-gray-700">
                                        <span className="text-green-600 font-medium">Extensive</span><br />
                                        <span className="text-sm text-gray-500">DOB, marital status, religion, family</span>
                                    </td>
                                    <td className="p-4 text-gray-700">
                                        <span className="text-amber-600 font-medium">Minimal</span><br />
                                        <span className="text-sm text-gray-500">Name, contact info only</span>
                                    </td>
                                    <td className="p-4 text-gray-700">
                                        <span className="text-amber-600 font-medium">Minimal</span><br />
                                        <span className="text-sm text-gray-500">Name, contact info only</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-medium text-gray-900">Focus</td>
                                    <td className="p-4 text-gray-700">Personal background + Career</td>
                                    <td className="p-4 text-gray-700">Skills + Achievements</td>
                                    <td className="p-4 text-gray-700">Academic + Research</td>
                                </tr>
                                <tr className="bg-gray-50/50">
                                    <td className="p-4 font-medium text-gray-900">Common Regions</td>
                                    <td className="p-4 text-gray-700">India, Pakistan, Middle East, Philippines</td>
                                    <td className="p-4 text-gray-700">USA, Canada, Australia</td>
                                    <td className="p-4 text-gray-700">Europe, UK, Academia worldwide</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-medium text-gray-900">Best For</td>
                                    <td className="p-4 text-gray-700">Government jobs, traditional companies, matrimonial</td>
                                    <td className="p-4 text-gray-700">Corporate jobs, startups, tech</td>
                                    <td className="p-4 text-gray-700">Academic positions, research, medical</td>
                                </tr>
                                <tr className="bg-gray-50/50">
                                    <td className="p-4 font-medium text-gray-900">Customization</td>
                                    <td className="p-4 text-gray-700">Same biodata for multiple applications</td>
                                    <td className="p-4 text-gray-700">Tailored for each job</td>
                                    <td className="p-4 text-gray-700">Updated as achievements grow</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile: Card view */}
                    <div className="md:hidden space-y-4">
                        {[
                            { aspect: 'Length', biodata: '1-2 pages', resume: '1-2 pages', cv: '2+ pages' },
                            { aspect: 'Personal Details', biodata: 'Extensive (DOB, marital status, religion, family)', resume: 'Minimal (name, contact only)', cv: 'Minimal (name, contact only)', biodataHighlight: 'green' },
                            { aspect: 'Focus', biodata: 'Personal background + Career', resume: 'Skills + Achievements', cv: 'Academic + Research' },
                            { aspect: 'Common Regions', biodata: 'India, Pakistan, Middle East, Philippines', resume: 'USA, Canada, Australia', cv: 'Europe, UK, Academia worldwide' },
                            { aspect: 'Best For', biodata: 'Government jobs, traditional companies, matrimonial', resume: 'Corporate jobs, startups, tech', cv: 'Academic positions, research, medical' },
                            { aspect: 'Customization', biodata: 'Same biodata for multiple applications', resume: 'Tailored for each job', cv: 'Updated as achievements grow' },
                        ].map((row, i) => (
                            <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                <h3 className="font-semibold text-gray-900 mb-3">{row.aspect}</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-start gap-2">
                                        <span className="text-orange-600 font-medium shrink-0 w-16">Biodata:</span>
                                        <span className={row.biodataHighlight === 'green' ? 'text-green-600 font-medium' : 'text-gray-700'}>{row.biodata}</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-blue-600 font-medium shrink-0 w-16">Resume:</span>
                                        <span className="text-gray-700">{row.resume}</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-teal-primary font-medium shrink-0 w-16">CV:</span>
                                        <span className="text-gray-700">{row.cv}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Biodata Format Structure */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Standard Biodata Format Structure</h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-8">
                        While there's no single "official" biodata format, most employers expect these sections in this order:
                    </p>

                    <div className="bg-white border-2 border-gray-200 rounded-xl p-8 shadow-sm space-y-4 mb-8">
                        <div className="text-center p-3 border-2 border-orange-200 rounded-lg bg-orange-50">
                            <span className="font-bold text-orange-700">1. Personal Information</span>
                            <p className="text-sm text-orange-600 mt-1">Name, Photo, DOB, Gender, Marital Status, Nationality</p>
                        </div>
                        <div className="p-3 border border-gray-200 rounded-lg bg-gray-50">
                            <span className="font-bold text-gray-700">2. Contact Details</span>
                            <p className="text-sm text-gray-500 mt-1">Address (Permanent & Current), Phone, Email</p>
                        </div>
                        <div className="p-3 border border-gray-200 rounded-lg bg-gray-50">
                            <span className="font-bold text-gray-700">3. Career Objective</span>
                            <p className="text-sm text-gray-500 mt-1">2-3 sentences about your career goals</p>
                        </div>
                        <div className="p-3 border border-blue-200 rounded-lg bg-blue-50">
                            <span className="font-bold text-blue-700">4. Educational Qualifications</span>
                            <p className="text-sm text-blue-600 mt-1">Degrees, Institutions, Years, Percentages/CGPA</p>
                        </div>
                        <div className="p-3 border border-blue-200 rounded-lg bg-blue-50">
                            <span className="font-bold text-blue-700">5. Work Experience</span>
                            <p className="text-sm text-blue-600 mt-1">Company, Designation, Duration, Responsibilities</p>
                        </div>
                        <div className="p-3 border border-gray-200 rounded-lg bg-gray-50">
                            <span className="font-bold text-gray-700">6. Skills & Competencies</span>
                            <p className="text-sm text-gray-500 mt-1">Technical skills, Languages, Software proficiency</p>
                        </div>
                        <div className="p-3 border border-gray-200 rounded-lg bg-gray-50">
                            <span className="font-bold text-gray-700">7. Additional Information</span>
                            <p className="text-sm text-gray-500 mt-1">Hobbies, Interests, Achievements, References</p>
                        </div>
                        <div className="p-3 border border-gray-300 rounded-lg bg-gray-100">
                            <span className="font-bold text-gray-600">8. Declaration</span>
                            <p className="text-sm text-gray-500 mt-1">"I hereby declare that the above information is true..."</p>
                        </div>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                        <h4 className="font-bold text-blue-900 mb-2">Pro Tip:</h4>
                        <p className="text-blue-800">Always include a passport-size photograph in the top right corner of your biodata. This is expected in most South Asian and Middle Eastern countries, unlike Western resumes where photos are discouraged.</p>
                    </div>
                </div>
            </section>

            {/* Personal Information Section Deep Dive */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">What Personal Information to Include in Biodata</h2>

                    <p className="text-lg text-gray-700 leading-relaxed mb-8">
                        The personal information section is what distinguishes biodata from a resume. Here's what's typically expected:
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                                <span className="text-green-500">✓</span> Always Include
                            </h3>
                            <ul className="space-y-2 text-gray-700">
                                <li>• Full Name (as per official documents)</li>
                                <li>• Date of Birth</li>
                                <li>• Gender</li>
                                <li>• Nationality</li>
                                <li>• Marital Status</li>
                                <li>• Languages Known</li>
                                <li>• Permanent Address</li>
                                <li>• Current Address</li>
                                <li>• Phone Number</li>
                                <li>• Email Address</li>
                            </ul>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                                <span className="text-amber-500">~</span> Optional (Context-Dependent)
                            </h3>
                            <ul className="space-y-2 text-gray-700">
                                <li>• Father's Name & Occupation</li>
                                <li>• Mother's Name</li>
                                <li>• Religion (if required by employer)</li>
                                <li>• Caste/Community (government jobs in India)</li>
                                <li>• Blood Group</li>
                                <li>• Height & Weight</li>
                                <li>• Passport Number (for overseas jobs)</li>
                                <li>• Visa Status</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
                        <h4 className="font-bold text-amber-900 mb-2">Important Note:</h4>
                        <p className="text-amber-800">While biodata traditionally includes details like religion and caste, many modern private companies in India are moving away from requesting this information. Include only what is specifically asked for in the job posting.</p>
                    </div>
                </div>
            </section>

            {/* Types of Biodata */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Types of Biodata</h2>

                    <div className="space-y-8">
                        {/* Job Biodata */}
                        <div className="bg-gradient-to-r from-blue-50 to-white p-8 rounded-xl border border-blue-100">
                            <h3 className="text-2xl font-bold text-blue-900 mb-4">1. Job Biodata (Employment Biodata)</h3>
                            <p className="text-gray-700 mb-4">
                                Used for job applications, especially in government sectors, PSUs (Public Sector Undertakings), and traditional companies in South Asia.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Key Focus Areas:</h4>
                                    <ul className="text-gray-600 space-y-1">
                                        <li>• Educational qualifications with grades</li>
                                        <li>• Work experience with responsibilities</li>
                                        <li>• Technical and soft skills</li>
                                        <li>• Certifications and training</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Common For:</h4>
                                    <ul className="text-gray-600 space-y-1">
                                        <li>• UPSC, SSC, Bank exams (India)</li>
                                        <li>• PPSC, FPSC jobs (Pakistan)</li>
                                        <li>• Gulf country employment</li>
                                        <li>• Teaching positions</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Marriage Biodata */}
                        <div className="bg-gradient-to-r from-pink-50 to-white p-8 rounded-xl border border-pink-100">
                            <h3 className="text-2xl font-bold text-pink-900 mb-4">2. Marriage Biodata (Matrimonial Biodata)</h3>
                            <p className="text-gray-700 mb-4">
                                Used in arranged marriage traditions in India, Pakistan, Bangladesh, and among diaspora communities. This format includes extensive personal and family details.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Additional Sections:</h4>
                                    <ul className="text-gray-600 space-y-1">
                                        <li>• Family background (parents, siblings)</li>
                                        <li>• Horoscope / Kundli details</li>
                                        <li>• Physical attributes</li>
                                        <li>• Partner preferences</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Design Elements:</h4>
                                    <ul className="text-gray-600 space-y-1">
                                        <li>• Decorative borders</li>
                                        <li>• Professional photographs</li>
                                        <li>• Religious symbols (optional)</li>
                                        <li>• 2-3 pages typical</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Regional Biodata Expectations */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Biodata Format by Region</h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-8">
                        Expectations vary by country. Here's what employers in different regions typically expect:
                    </p>

                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-orange-500">
                            <h3 className="font-bold text-xl text-gray-900 mb-2">🇮🇳 India</h3>
                            <p className="text-gray-700">Biodata is standard for government jobs (UPSC, SSC, State PSCs), banks, and PSUs. Private MNCs often prefer resumes. Include father's name, caste category (for reservation), and a declaration statement. Photo is mandatory.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
                            <h3 className="font-bold text-xl text-gray-900 mb-2">🇵🇰 Pakistan</h3>
                            <p className="text-gray-700">Similar to India. CNIC (national ID) number is often required. Father's name and address are standard. Government and semi-government positions require detailed biodata format.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
                            <h3 className="font-bold text-xl text-gray-900 mb-2">🇦🇪 UAE / Gulf Countries</h3>
                            <p className="text-gray-700">Employers expect biodata with photo, nationality, visa status, and availability. Religion may be asked. Include passport details if applying from abroad. Both biodata and CV formats are accepted.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-teal-primary">
                            <h3 className="font-bold text-xl text-gray-900 mb-2">🇵🇭 Philippines</h3>
                            <p className="text-gray-700">Personal Data Sheet (PDS) is the official biodata format for government positions. Private companies may accept either biodata or resume. Height, weight, and civil status are commonly included.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Templates Section */}
            <section id="templates" className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Free Biodata Templates</h2>
                    <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                        Download our professionally designed biodata templates in Word and PDF format. Customize them with your information.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl text-center">
                            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-xl text-gray-900 mb-2">Job Biodata Template</h3>
                            <p className="text-gray-600 mb-6">Professional format for job applications with all standard sections.</p>
                            <Link href="/onboarding" className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition">
                                Create with AI Builder
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-xl text-center">
                            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-xl text-gray-900 mb-2">Simple Biodata Format</h3>
                            <p className="text-gray-600 mb-6">Clean, minimal design suitable for freshers and entry-level positions.</p>
                            <Link href="/onboarding" className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition">
                                Start Building
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tips for Writing */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Tips for Writing an Effective Biodata</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <span className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">1</span>
                                <div>
                                    <h3 className="font-bold text-gray-900">Use a professional photograph</h3>
                                    <p className="text-gray-600 text-sm">Passport-size, formal attire, plain background. No selfies or casual photos.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <span className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">2</span>
                                <div>
                                    <h3 className="font-bold text-gray-900">Keep it concise</h3>
                                    <p className="text-gray-600 text-sm">1-2 pages maximum. Recruiters don't read lengthy documents.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <span className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">3</span>
                                <div>
                                    <h3 className="font-bold text-gray-900">Use consistent formatting</h3>
                                    <p className="text-gray-600 text-sm">Same font throughout, clear section headers, proper alignment.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <span className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">4</span>
                                <div>
                                    <h3 className="font-bold text-gray-900">Include a declaration</h3>
                                    <p className="text-gray-600 text-sm">"I hereby declare that the information provided is true to the best of my knowledge."</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <span className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">5</span>
                                <div>
                                    <h3 className="font-bold text-gray-900">List education in reverse order</h3>
                                    <p className="text-gray-600 text-sm">Most recent qualification first. Include percentage/CGPA if impressive.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <span className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">6</span>
                                <div>
                                    <h3 className="font-bold text-gray-900">Proofread carefully</h3>
                                    <p className="text-gray-600 text-sm">Spelling errors and typos create a negative impression instantly.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <span className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">7</span>
                                <div>
                                    <h3 className="font-bold text-gray-900">Include relevant details only</h3>
                                    <p className="text-gray-600 text-sm">Don't add information that isn't asked for or isn't relevant to the job.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <span className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">8</span>
                                <div>
                                    <h3 className="font-bold text-gray-900">Sign and date your biodata</h3>
                                    <p className="text-gray-600 text-sm">Add your signature at the end with the current date and place.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-white">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>

                    <div className="space-y-6">
                        {faqItems.map((item, index) => (
                            <div key={index} className="bg-gray-50 rounded-xl p-6">
                                <h3 className="font-bold text-lg text-gray-900 mb-2">{item.question}</h3>
                                <p className="text-gray-600">{item.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Internal Links Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Related Resources</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <Link href="/resume-format" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-center">
                            <h3 className="font-bold text-gray-900 mb-2">Resume Format Guide</h3>
                            <p className="text-gray-600 text-sm">Chronological, functional & combination formats</p>
                        </Link>
                        <Link href="/templates" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-center">
                            <h3 className="font-bold text-gray-900 mb-2">Resume Templates</h3>
                            <p className="text-gray-600 text-sm">20+ professional templates for any job</p>
                        </Link>
                        <Link href="/resume-examples" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-center">
                            <h3 className="font-bold text-gray-900 mb-2">Resume Examples</h3>
                            <p className="text-gray-600 text-sm">300+ job-specific resume examples</p>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 bg-gradient-to-r from-orange-500 to-orange-600 text-center px-6">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Create Your Biodata in Minutes</h2>
                <p className="text-orange-100 max-w-2xl mx-auto mb-10 text-lg">
                    Our AI-powered builder helps you create a professional biodata with all the right sections.
                    Choose from multiple templates and export as PDF or Word.
                </p>
                <Link href="/onboarding" className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-xl font-bold hover:bg-orange-50 transition transform hover:scale-105 shadow-lg">
                    Build My Biodata Free
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            </section>

            <Footer />
        </>
    );
}

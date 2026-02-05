'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const siteUrl = 'https://www.bestairesumes.com';

// ATS systems list (non-translatable brand names)
const atsSystems = ['Workday', 'Greenhouse', 'Taleo', 'iCIMS', 'Lever', 'BambooHR', 'ADP', 'SAP SuccessFactors'];

export default function ATSCheckerPage() {
    const t = useTranslations('AtsChecker');

    // FAQ items with translations
    const faqItems = [
        { question: t('faq.whatIsAts.question'), answer: t('faq.whatIsAts.answer') },
        { question: t('faq.whyFail.question'), answer: t('faq.whyFail.answer') },
        { question: t('faq.bestFormat.question'), answer: t('faq.bestFormat.answer') },
        { question: t('faq.keywords.question'), answer: t('faq.keywords.answer') },
        { question: t('faq.twoColumn.question'), answer: t('faq.twoColumn.answer') },
        { question: t('faq.jobTitle.question'), answer: t('faq.jobTitle.answer') },
    ];

    // Schema objects for SEO (hardcoded constants - safe for dangerouslySetInnerHTML)
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
            { '@type': 'ListItem', position: 2, name: 'Tools', item: `${siteUrl}/tools` },
            { '@type': 'ListItem', position: 3, name: 'ATS Resume Checker' },
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

    const softwareSchema = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'ATS Resume Checker',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        description: 'Free ATS resume checker that scans your resume for compatibility with Applicant Tracking Systems.',
    };

    return (
        <>
            <Header />
            {/* Schema markup - all constants derived from translations, safe for SEO */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />

            {/* Hero Section */}
            <section className="pt-32 pb-16 bg-gradient-to-b from-blue-50 to-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">{t('hero.badge')}</span>
                    <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6 text-gray-900">
                        {t('hero.title')}<br />
                        <span className="text-blue-600">{t('hero.titleHighlight')}</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                        <strong>{t('hero.statistic')}</strong>{' '}
                        {t('hero.description')}
                    </p>
                </div>
            </section>

            {/* ATS Check Tool Area */}
            <section className="py-12 bg-white">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12 border-2 border-dashed border-blue-200">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('tool.title')}</h2>
                            <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                                {t('tool.description')}
                            </p>
                            <Link
                                href="/onboarding"
                                className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/30"
                            >
                                {t('tool.cta')}
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </Link>
                            <p className="text-sm text-gray-500 mt-4">{t('tool.subtext')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* What ATS Checks For */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">{t('checks.title')}</h2>
                    <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                        {t('checks.subtitle')}
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-2">{t('checks.keywords.title')}</h3>
                                    <p className="text-gray-600 text-sm">{t('checks.keywords.description')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-2">{t('checks.formatting.title')}</h3>
                                    <p className="text-gray-600 text-sm">{t('checks.formatting.description')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-2">{t('checks.contact.title')}</h3>
                                    <p className="text-gray-600 text-sm">{t('checks.contact.description')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-2">{t('checks.dates.title')}</h3>
                                    <p className="text-gray-600 text-sm">{t('checks.dates.description')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ATS Optimization Checklist */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">{t('checklist.title')}</h2>
                    <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                        {t('checklist.subtitle')}
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-bold text-green-600 mb-4 flex items-center gap-2">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                {t('checklist.doThis')}
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <span className="text-green-500 mt-1">✓</span>
                                    <span className="text-gray-700">{t('checklist.dos.singleColumn')}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-green-500 mt-1">✓</span>
                                    <span className="text-gray-700">{t('checklist.dos.keywords')}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-green-500 mt-1">✓</span>
                                    <span className="text-gray-700">{t('checklist.dos.standardHeadings')}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-green-500 mt-1">✓</span>
                                    <span className="text-gray-700">{t('checklist.dos.fileFormat')}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-green-500 mt-1">✓</span>
                                    <span className="text-gray-700">{t('checklist.dos.standardFonts')}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-green-500 mt-1">✓</span>
                                    <span className="text-gray-700">{t('checklist.dos.spellOut')}</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-red-600 mb-4 flex items-center gap-2">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                {t('checklist.avoidThis')}
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <span className="text-red-500 mt-1">✗</span>
                                    <span className="text-gray-700">{t('checklist.donts.tables')}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-red-500 mt-1">✗</span>
                                    <span className="text-gray-700">{t('checklist.donts.images')}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-red-500 mt-1">✗</span>
                                    <span className="text-gray-700">{t('checklist.donts.headers')}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-red-500 mt-1">✗</span>
                                    <span className="text-gray-700">{t('checklist.donts.creativeTitles')}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-red-500 mt-1">✗</span>
                                    <span className="text-gray-700">{t('checklist.donts.fancyFonts')}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-red-500 mt-1">✗</span>
                                    <span className="text-gray-700">{t('checklist.donts.lightText')}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Popular ATS Systems */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">{t('systems.title')}</h2>
                    <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                        {t('systems.subtitle')}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {atsSystems.map(ats => (
                            <div key={ats} className="bg-white p-4 rounded-lg text-center border border-gray-200">
                                <span className="font-medium text-gray-700">{ats}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-white">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{t('faq.title')}</h2>

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

            {/* Internal Links */}
            <section className="py-12 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">{t('resources.title')}</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <Link href="/blog/how-to-write-ats-friendly-resume" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-center">
                            <h3 className="font-bold text-gray-900 mb-2">{t('resources.guide.title')}</h3>
                            <p className="text-gray-600 text-sm">{t('resources.guide.description')}</p>
                        </Link>
                        <Link href="/templates" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-center">
                            <h3 className="font-bold text-gray-900 mb-2">{t('resources.templates.title')}</h3>
                            <p className="text-gray-600 text-sm">{t('resources.templates.description')}</p>
                        </Link>
                        <Link href="/resume-examples" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-center">
                            <h3 className="font-bold text-gray-900 mb-2">{t('resources.examples.title')}</h3>
                            <p className="text-gray-600 text-sm">{t('resources.examples.description')}</p>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-600 text-center px-6">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">{t('cta.title')}</h2>
                <p className="text-blue-100 max-w-2xl mx-auto mb-10 text-lg">
                    {t('cta.description')}
                </p>
                <Link href="/onboarding" className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition transform hover:scale-105 shadow-lg">
                    {t('cta.button')}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            </section>

            <Footer />
        </>
    );
}

import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BuilderTemplatesGrid from '@/components/BuilderTemplatesGrid';
import { getTranslations } from 'next-intl/server';
import { locales } from '@/i18n.config';
import {
    CheckCircle,
    ShieldCheck,
    FileText,
    ScanLine,
    ArrowRight,
    AlertTriangle,
    XCircle,
} from 'lucide-react';

const siteUrl = 'https://bestairesumes.com';
export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'ATSTemplates' });

    const alternateLanguages: Record<string, string> = {
        'x-default': `${siteUrl}/en/ats-friendly-templates`,
    };
    locales.forEach((loc) => {
        alternateLanguages[loc] = `${siteUrl}/${loc}/ats-friendly-templates`;
    });

    return {
        title: t('meta.title'),
        description: t('meta.description'),
        keywords: [
            'ats friendly resume template',
            'ats resume template',
            'ats compatible resume',
            'applicant tracking system resume',
            'ats optimized resume template',
            'free ats resume template',
            'ats resume format',
            'resume template that passes ats',
        ],
        openGraph: {
            title: t('meta.title'),
            description: t('meta.description'),
            type: 'website',
            url: `${siteUrl}/${locale}/ats-friendly-templates`,
        },
        twitter: {
            card: 'summary_large_image',
            title: t('meta.title'),
            description: t('meta.description'),
        },
        alternates: {
            canonical: `${siteUrl}/${locale}/ats-friendly-templates`,
            languages: alternateLanguages,
        },
    };
}

function JsonLd({ data, id }: { data: object; id: string }) {
    return (
        <Script
            id={id}
            type="application/ld+json"
            strategy="afterInteractive"
        >
            {JSON.stringify(data)}
        </Script>
    );
}

const ATS_FEATURES = [
    { icon: ScanLine, key: 'parseable' },
    { icon: FileText, key: 'standardHeaders' },
    { icon: ShieldCheck, key: 'testedATS' },
    { icon: CheckCircle, key: 'cleanFormatting' },
] as const;

const FAQ_COUNT = 5;

export default async function ATSFriendlyTemplatesPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'ATSTemplates' });

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: t('breadcrumb.home'), item: `${siteUrl}/${locale}` },
            { '@type': 'ListItem', position: 2, name: t('breadcrumb.current') },
        ],
    };

    const collectionSchema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: t('hero.title'),
        description: t('meta.description'),
        url: `${siteUrl}/${locale}/ats-friendly-templates`,
        isPartOf: { '@type': 'WebSite', name: 'Best AI Resume', url: siteUrl },
        about: {
            '@type': 'Thing',
            name: 'ATS-Friendly Resume Templates',
            description: 'Professional resume templates optimized for Applicant Tracking Systems',
        },
        numberOfItems: 16,
    };

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: Array.from({ length: FAQ_COUNT }, (_, i) => ({
            '@type': 'Question',
            name: t(`faq.items.${i + 1}.q`),
            acceptedAnswer: {
                '@type': 'Answer',
                text: t(`faq.items.${i + 1}.a`),
            },
        })),
    };

    return (
        <>
            <Header />
            <JsonLd data={breadcrumbSchema} id="json-ld-breadcrumb" />
            <JsonLd data={collectionSchema} id="json-ld-collection" />
            <JsonLd data={faqSchema} id="json-ld-faq" />

            {/* Hero Section */}
            <section className="pt-32 pb-16 bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 text-green-700 text-sm font-semibold">
                        <ShieldCheck size={16} />
                        {t('hero.badge')}
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
                        {t('hero.title')}
                    </h1>
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                        {t('hero.subtitle')}
                    </p>
                    <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5"><CheckCircle size={16} className="text-green-500" /> {t('hero.check1')}</span>
                        <span className="flex items-center gap-1.5"><CheckCircle size={16} className="text-green-500" /> {t('hero.check2')}</span>
                        <span className="flex items-center gap-1.5"><CheckCircle size={16} className="text-green-500" /> {t('hero.check3')}</span>
                    </div>
                </div>
            </section>

            {/* What Makes a Resume ATS-Friendly — Educational Content */}
            <section className="py-16 bg-white">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                        {t('whatMakes.title')}
                    </h2>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                        {t('whatMakes.p1')}
                    </p>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                        {t('whatMakes.p2')}
                    </p>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        {t('whatMakes.p3')}
                    </p>

                    {/* Internal links */}
                    <div className="flex flex-wrap gap-3 mb-6">
                        <Link href={`/${locale}/blog/how-to-write-ats-friendly-resume`} className="text-sm text-green-700 bg-green-50 px-3 py-1.5 rounded-full hover:bg-green-100 transition">
                            {t('whatMakes.link1')}
                        </Link>
                        <Link href={`/${locale}/blog/what-is-ats-guide`} className="text-sm text-green-700 bg-green-50 px-3 py-1.5 rounded-full hover:bg-green-100 transition">
                            {t('whatMakes.link2')}
                        </Link>
                        <Link href={`/${locale}/blog/ats-parse-rate-meaning`} className="text-sm text-green-700 bg-green-50 px-3 py-1.5 rounded-full hover:bg-green-100 transition">
                            {t('whatMakes.link3')}
                        </Link>
                    </div>
                </div>
            </section>

            {/* ATS Features Grid */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-5xl mx-auto px-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-gray-900">
                        {t('features.title')}
                    </h2>
                    <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                        {t('features.subtitle')}
                    </p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {ATS_FEATURES.map(({ icon: Icon, key }) => (
                            <div key={key} className="p-6 rounded-xl border border-gray-100 bg-white hover:shadow-md transition-shadow">
                                <Icon size={28} className="text-green-600 mb-3" />
                                <h3 className="font-semibold text-gray-900 mb-2">{t(`features.${key}.title`)}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{t(`features.${key}.description`)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Templates Grid */}
            <section className="templates-section-dark py-16">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-white">
                        {t('grid.title')}
                    </h2>
                    <p className="text-gray-400 text-center mb-8">
                        {t('grid.subtitle')}
                    </p>
                </div>
                <BuilderTemplatesGrid useTemplateLabel={t('grid.useTemplate')} showFilters={true} />
            </section>

            {/* Common Formatting Mistakes Section */}
            <section className="py-16 bg-white">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                        {t('mistakes.title')}
                    </h2>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        {t('mistakes.intro')}
                    </p>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex gap-3 p-4 rounded-lg bg-red-50/60 border border-red-100">
                                <XCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="font-semibold text-gray-900 text-sm mb-1">{t(`mistakes.items.${i}.title`)}</h3>
                                    <p className="text-sm text-gray-600">{t(`mistakes.items.${i}.description`)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="mt-6 text-sm text-gray-500">
                        {t('mistakes.cta')}{' '}
                        <Link href={`/${locale}/tools/ats-checker`} className="text-green-700 font-medium hover:underline">
                            {t('mistakes.ctaLink')}
                        </Link>
                    </p>
                </div>
            </section>

            {/* How ATS Works Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-gray-900">
                        {t('howATS.title')}
                    </h2>
                    <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                        {t('howATS.intro')}
                    </p>
                    <div className="space-y-8">
                        {[1, 2, 3].map((step) => (
                            <div key={step} className="flex gap-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 text-green-700 font-bold flex items-center justify-center text-sm">
                                    {step}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">{t(`howATS.step${step}.title`)}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{t(`howATS.step${step}.description`)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 p-4 rounded-lg bg-amber-50 border border-amber-200 flex gap-3">
                        <AlertTriangle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-amber-800">
                            {t('howATS.warning')}
                        </p>
                    </div>
                </div>
            </section>

            {/* ATS Checklist Section */}
            <section className="py-16 bg-white">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                        {t('checklist.title')}
                    </h2>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        {t('checklist.intro')}
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-green-50/50">
                                <CheckCircle size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-gray-700">{t(`checklist.items.${i}`)}</span>
                            </div>
                        ))}
                    </div>
                    <p className="mt-6 text-gray-600 text-sm leading-relaxed">
                        {t('checklist.outro')}{' '}
                        <Link href={`/${locale}/resume-examples`} className="text-green-700 font-medium hover:underline">
                            {t('checklist.outroLink')}
                        </Link>
                    </p>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900">
                        {t('faq.title')}
                    </h2>
                    <div className="space-y-6">
                        {Array.from({ length: FAQ_COUNT }, (_, i) => i + 1).map((i) => (
                            <div key={i} className="bg-white rounded-xl p-6 border border-gray-100">
                                <h3 className="font-semibold text-gray-900 mb-3">{t(`faq.items.${i}.q`)}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{t(`faq.items.${i}.a`)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-white text-center px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('cta.title')}</h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-lg">
                    {t('cta.subtitle')}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href={`/${locale}/onboarding`}
                        className="inline-flex items-center gap-2 bg-accent-green text-gray-900 px-8 py-4 rounded-xl font-bold hover:bg-green-400 transition transform motion-safe:hover:scale-105"
                    >
                        {t('cta.buildButton')}
                        <ArrowRight size={18} />
                    </Link>
                    <Link
                        href={`/${locale}/tools/ats-checker`}
                        className="inline-flex items-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-xl font-bold border border-gray-200 hover:border-gray-300 transition"
                    >
                        {t('cta.checkButton')}
                    </Link>
                </div>
                <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                    <Link href={`/${locale}/templates`} className="hover:text-gray-700 underline underline-offset-2">{t('cta.browseAll')}</Link>
                    <Link href={`/${locale}/resume-format`} className="hover:text-gray-700 underline underline-offset-2">{t('cta.formatGuide')}</Link>
                    <Link href={`/${locale}/resume-examples`} className="hover:text-gray-700 underline underline-offset-2">{t('cta.examples')}</Link>
                </div>
            </section>

            <Footer />
        </>
    );
}

import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { TEMPLATE_CATEGORIES } from '@/lib/templates/categories';

export const metadata: Metadata = {
    title: 'Free Resume Templates 2026 (Word, Google Docs, PDF) | Best AI Resume',
    description: 'Download the best free resume templates for 2026. Choose from Microsoft Word, Google Docs, Simple, or ATS-friendly styles. No signup required.',
};

export default function TemplatesIndex() {
    // BreadcrumbList schema — all values are hardcoded string constants, no user input involved
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.bestairesumes.com' },
            { '@type': 'ListItem', position: 2, name: 'Templates' },
        ],
    };

    return (
        <>
            <Header />
            {/* BreadcrumbList schema — hardcoded constants only */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <section className="pt-32 pb-16 bg-gray-50 border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6 text-gray-900">
                        Free Resume Templates<br />
                        <span className="text-accent-primary">Updated for 2026</span>
                    </h1>
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                        Don't start from a blank page. Choose a professional template format below to get started.
                    </p>
                </div>
            </section>

            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-8">
                        {TEMPLATE_CATEGORIES.map((cat) => (
                            <Link
                                key={cat.slug}
                                href={`/templates/${cat.slug}`}
                                className="group block bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl transition hover:border-accent-blue"
                            >
                                <h3 className="font-bold text-2xl text-gray-900 group-hover:text-accent-blue transition mb-4">
                                    {cat.title}
                                </h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    {cat.heroText}
                                </p>
                                <div className="flex items-center text-accent-blue font-bold">
                                    View Collection &rarr;
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}

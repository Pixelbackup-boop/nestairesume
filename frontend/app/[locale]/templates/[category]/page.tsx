import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getCategoryBySlug, getAllCategorySlugs } from '@/lib/templates/categories';
import { docxTemplates } from '@/lib/templates/docxTemplates';
import { gdocsTemplates } from '@/lib/templates/gdocsTemplates';
import BuilderTemplatesGrid from '@/components/BuilderTemplatesGrid';

// Categories that use builder templates (vs docx/gdocs)
const BUILDER_TEMPLATE_CATEGORIES = ['creative', 'modern', 'simple', 'ats-friendly'];

interface Props {
    params: {
        category: string;
        locale: string;
    };
}

export async function generateStaticParams() {
    const slugs = getAllCategorySlugs();
    return slugs.map((slug) => ({
        category: slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { category } = await params;
    const catData = getCategoryBySlug(category);

    if (!catData) {
        return {
            title: 'Resume Templates | Best AI Resume',
        };
    }

    return {
        title: catData.seoTitle,
        description: catData.seoDescription,
    };
}

export default async function TemplateCategoryPage({ params }: Props) {
    const { category } = await params;
    const catData = getCategoryBySlug(category);

    if (!catData) {
        notFound();
    }

    // BreadcrumbList schema — all values are hardcoded string constants, no user input involved
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.bestairesumes.com' },
            { '@type': 'ListItem', position: 2, name: 'Templates', item: 'https://www.bestairesumes.com/templates' },
            { '@type': 'ListItem', position: 3, name: catData.title },
        ],
    };

    return (
        <>
            <Header />
            {/* BreadcrumbList schema — hardcoded constants only */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            {/* Hero Section */}
            <section className="pt-32 pb-16 bg-gray-50 border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="mb-4 inline-block px-3 py-1 rounded-full bg-accent-blue/10 text-accent-blue text-sm font-semibold uppercase tracking-wider">
                        {catData.slug.replace('-', ' ')} Collection
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
                        {catData.title}
                    </h1>
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                        {catData.heroText}
                    </p>
                    <div className="flex justify-center gap-4">
                        <a href="#templates" className="bg-accent-green text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-green-400 transition">
                            Browse Templates
                        </a>
                    </div>
                </div>
            </section>

            {/* SEO Content Block (The "Text Trap") */}
            <section className="py-12 bg-white">
                <div className="max-w-3xl mx-auto px-6 text-gray-600 leading-relaxed text-sm md:text-base">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Why choose a {catData.keyword}?</h2>
                    <p className="mb-4">
                        In 2026, recruiters spend less than 7 seconds reviewing a resume. Using a <strong>{catData.keyword}</strong> ensures
                        that your information is presented in a format they recognize and trust. Unlike overly creative designs that confuse
                        Applicant Tracking Systems (ATS), our {catData.title.toLowerCase()} prioritize readability and structure.
                    </p>
                    <p>
                        Whether you are a student, mid-level professional, or executive, these templates provide the perfect foundation
                        for your career story.
                    </p>
                </div>
            </section>

            {/* Templates Grid */}
            <section id="templates" className={`py-16 ${BUILDER_TEMPLATE_CATEGORIES.includes(category) ? 'templates-section-dark' : 'bg-gray-50'}`}>
                {BUILDER_TEMPLATE_CATEGORIES.includes(category) ? (
                    <BuilderTemplatesGrid initialCategory={category} useTemplateLabel="Use Template" />
                ) : (
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
                        Available Templates
                    </h2>

                    {category === 'microsoftword' ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {docxTemplates.map((tpl) => (
                                <div key={tpl.id} className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                                    <div className="aspect-[1/1.4] bg-gray-50 relative overflow-hidden">
                                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                                            <div className="w-12 h-12 rounded-xl mb-3 flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: tpl.accentColor }}>
                                                W
                                            </div>
                                            <span className="text-gray-700 font-semibold text-sm">{tpl.name}</span>
                                            <span className="text-gray-400 text-xs mt-1">{tpl.style}</span>
                                        </div>
                                        <div className="absolute inset-0 bg-gray-50/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4 p-6">
                                            <Link href={`/word-onboarding?template=${tpl.id}`} className="w-full bg-accent-green text-gray-900 font-bold py-3 rounded-lg text-center hover:bg-accent-teal transition">
                                                Edit in AI
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="p-4 border-t border-gray-100">
                                        <h3 className="font-bold text-gray-900">{tpl.name}</h3>
                                        <p className="text-xs text-gray-500 mt-1">{tpl.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : category === 'google-docs' ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {gdocsTemplates.map((tpl) => (
                                <div key={tpl.id} className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                                    <div className="aspect-[1/1.4] bg-gray-50 relative overflow-hidden">
                                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                                            <div className="w-12 h-12 rounded-xl mb-3 flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: tpl.accentColor }}>
                                                G
                                            </div>
                                            <span className="text-gray-700 font-semibold text-sm">{tpl.name}</span>
                                            <span className="text-gray-400 text-xs mt-1">{tpl.style}</span>
                                        </div>
                                        <div className="absolute inset-0 bg-gray-50/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4 p-6">
                                            <Link href={`/gdocs-onboarding?template=${tpl.id}`} className="w-full bg-accent-green text-gray-900 font-bold py-3 rounded-lg text-center hover:bg-accent-teal transition">
                                                Edit in AI
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="p-4 border-t border-gray-100">
                                        <h3 className="font-bold text-gray-900">{tpl.name}</h3>
                                        <p className="text-xs text-gray-500 mt-1">{tpl.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : null}
                </div>
                )}
            </section>

            {/* Conversion Section */}
            <section className="py-24 bg-gray-50 text-center px-6">
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Tired of formatting files?</h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-lg">
                    Downloading templates is great, but filling them out is a pain.
                    Our AI Resume Builder does the formatting for you instantly.
                </p>
                <Link href={category === 'microsoftword' ? '/word-onboarding' : category === 'google-docs' ? '/gdocs-onboarding' : '/onboarding'} className="inline-flex items-center gap-2 bg-accent-green text-gray-900 px-8 py-4 rounded-xl font-bold hover:bg-green-400 transition transform hover:scale-105">
                    Build With AI Instead
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
            </section>

            <Footer />
        </>
    );
}

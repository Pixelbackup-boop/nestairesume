import { Metadata } from 'next';

const siteUrl = 'https://www.bestairesumes.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const locales = ['en', 'es', 'fr', 'de', 'ar'];
    const alternateLanguages: Record<string, string> = {
        'x-default': `${siteUrl}/en/tools/ats-checker`,
    };
    locales.forEach((loc) => {
        alternateLanguages[loc] = `${siteUrl}/${loc}/tools/ats-checker`;
    });

    return {
        title: 'Free ATS Resume Checker | Score Your Resume Instantly | Best AI Resume',
        description: 'Check your resume against ATS systems for free. Get instant scoring, keyword analysis, and optimization tips to pass automated screening.',
        openGraph: {
            title: 'Free ATS Resume Checker | Score Your Resume Instantly',
            description: 'Check your resume against ATS systems for free. Get instant scoring, keyword analysis, and optimization tips.',
            type: 'website',
            url: `${siteUrl}/${locale}/tools/ats-checker`,
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Free ATS Resume Checker | Score Your Resume Instantly',
            description: 'Check your resume against ATS systems for free. Get instant scoring and optimization tips.',
        },
        alternates: {
            canonical: `${siteUrl}/${locale}/tools/ats-checker`,
            languages: alternateLanguages,
        },
    };
}

export default function AtsCheckerLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

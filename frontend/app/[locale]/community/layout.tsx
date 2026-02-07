import { Metadata } from 'next';

const siteUrl = 'https://www.bestairesumes.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const locales = ['en', 'es', 'fr', 'de', 'ar'];
    const alternateLanguages: Record<string, string> = {
        'x-default': `${siteUrl}/en/community`,
    };
    locales.forEach((loc) => {
        alternateLanguages[loc] = `${siteUrl}/${loc}/community`;
    });

    return {
        title: 'Community Templates | Best AI Resume',
        description: 'Browse and download community-created resume templates. Share your own professional designs with job seekers worldwide.',
        openGraph: {
            title: 'Community Templates | Best AI Resume',
            description: 'Browse and download community-created resume templates. Share your own professional designs with job seekers worldwide.',
            type: 'website',
            url: `${siteUrl}/${locale}/community`,
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Community Templates | Best AI Resume',
            description: 'Browse and download community-created resume templates.',
        },
        alternates: {
            canonical: `${siteUrl}/${locale}/community`,
            languages: alternateLanguages,
        },
    };
}

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

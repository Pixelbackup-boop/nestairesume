import { Metadata } from 'next';
import Header from '@/components/Header';
import { locales, isIndexableLocale } from '@/i18n.config';
import { getLocalizedUrl } from '@/lib/localized-paths';

const siteUrl = 'https://bestairesumes.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
const alternateLanguages: Record<string, string> = {
        'x-default': getLocalizedUrl(siteUrl, '/community', 'en'),
    };
    locales.forEach((loc) => {
      if (!isIndexableLocale(loc)) return; // only indexable locales in hreflang
        alternateLanguages[loc] = getLocalizedUrl(siteUrl, '/community', loc);
    });

    return {
        title: 'Community Templates | Best AI Resume',
        description: 'Browse and download community-created resume templates. Share your own professional designs with job seekers worldwide.',
        openGraph: {
            title: 'Community Templates | Best AI Resume',
            description: 'Browse and download community-created resume templates. Share your own professional designs with job seekers worldwide.',
            type: 'website',
            url: getLocalizedUrl(siteUrl, '/community', locale),
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Community Templates | Best AI Resume',
            description: 'Browse and download community-created resume templates.',
        },
        alternates: {
            canonical: getLocalizedUrl(siteUrl, '/community', locale),
            languages: alternateLanguages,
        },
    };
}

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main className="pt-20">
                {children}
            </main>
        </>
    );
}

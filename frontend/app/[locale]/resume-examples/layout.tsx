import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { locales } from '@/i18n.config';
import { getLocalizedPath, getLocalizedUrl } from '@/lib/localized-paths';

const siteUrl = 'https://bestairesumes.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ResumeExamples' });

const alternateLanguages: Record<string, string> = {
    'x-default': getLocalizedUrl(siteUrl, '/resume-examples', 'en'),
  };
  locales.forEach((loc) => {
    alternateLanguages[loc] = getLocalizedUrl(siteUrl, '/resume-examples', loc);
  });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      url: getLocalizedUrl(siteUrl, '/resume-examples', locale),
      siteName: 'Best AI Resume',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('meta.title'),
      description: t('meta.description'),
    },
    alternates: {
      canonical: getLocalizedUrl(siteUrl, '/resume-examples', locale),
      languages: alternateLanguages,
    },
  };
}

export default function ResumeExamplesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

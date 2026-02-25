import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { locales } from '@/i18n.config';

const siteUrl = 'https://bestairesumes.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ResumeExamples' });

const alternateLanguages: Record<string, string> = {
    'x-default': `${siteUrl}/en/resume-examples`,
  };
  locales.forEach((loc) => {
    alternateLanguages[loc] = `${siteUrl}/${loc}/resume-examples`;
  });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      url: `${siteUrl}/${locale}/resume-examples`,
      siteName: 'Best AI Resume',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('meta.title'),
      description: t('meta.description'),
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/resume-examples`,
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

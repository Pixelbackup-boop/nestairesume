import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

const siteConfig = {
  name: 'Best AI Resume',
  url: 'https://www.bestairesumes.com',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Onboarding.meta' });

  const title = t('title');
  const description = t('description');

  return {
    title,
    description,
    keywords: [
      'create resume',
      'AI resume generator',
      'build resume online',
      'quick resume maker',
      'professional CV creator',
    ],
    openGraph: {
      type: 'website',
      locale: locale === 'ar' ? 'ar_SA' : `${locale}_${locale.toUpperCase()}`,
      url: `${siteConfig.url}/${locale}/onboarding`,
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: '/og-onboarding.png',
          width: 1200,
          height: 630,
          alt: 'Create Your Resume with AI',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `${siteConfig.url}/${locale}/onboarding`,
      languages: Object.fromEntries([
        ['x-default', `${siteConfig.url}/en/onboarding`],
        ...['en', 'es', 'fr', 'de', 'ar'].map(l => [l, `${siteConfig.url}/${l}/onboarding`]),
      ]),
    },
  };
}

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

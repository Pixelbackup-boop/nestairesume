import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { getOgLocale } from '@/i18n.config';

const siteConfig = {
  name: 'Best AI Resume',
  url: 'https://bestairesumes.com',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Features.meta' });

  const title = t('title');
  const description = t('description');

  return {
    title,
    description,
    keywords: [
      'AI resume builder features',
      'resume writing AI',
      'ATS optimization',
      'resume templates',
      'professional resume maker',
      'AI-powered CV builder',
      'resume PDF export',
    ],
    openGraph: {
      type: 'website',
      locale: getOgLocale(locale),
      url: `${siteConfig.url}/${locale}/features`,
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: '/og-features.png',
          width: 1200,
          height: 630,
          alt: 'AI Resume Builder Features',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `${siteConfig.url}/${locale}/features`,
    },
  };
}

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

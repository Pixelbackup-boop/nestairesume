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
  const t = await getTranslations({ locale, namespace: 'CareerTips.meta' });

  const title = t('title');
  const description = t('description');

  return {
    title,
    description,
    keywords: [
      'career tips',
      'resume advice',
      'job search tips',
      'resume writing guide',
      'career advice',
      'interview tips',
      'professional resume tips',
      'CV writing tips',
    ],
    openGraph: {
      type: 'website',
      locale: getOgLocale(locale),
      url: `${siteConfig.url}/${locale}/career-tips`,
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: '/og-career-tips.png',
          width: 1200,
          height: 630,
          alt: 'Career Tips & Resume Advice',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `${siteConfig.url}/${locale}/career-tips`,
    },
  };
}

export default function CareerTipsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

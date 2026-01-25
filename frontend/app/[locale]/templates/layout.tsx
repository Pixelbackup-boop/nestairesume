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
  const t = await getTranslations({ locale, namespace: 'Templates.meta' });

  const title = t('title');
  const description = t('description');

  return {
    title,
    description,
    keywords: [
      'resume templates',
      'professional CV templates',
      'free resume templates',
      'ATS-friendly templates',
      'modern resume designs',
      'creative resume templates',
      'minimalist CV templates',
    ],
    openGraph: {
      type: 'website',
      locale: locale === 'ar' ? 'ar_SA' : `${locale}_${locale.toUpperCase()}`,
      url: `${siteConfig.url}/${locale}/templates`,
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: '/og-templates.png',
          width: 1200,
          height: 630,
          alt: 'Professional Resume Templates',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `${siteConfig.url}/${locale}/templates`,
    },
  };
}

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

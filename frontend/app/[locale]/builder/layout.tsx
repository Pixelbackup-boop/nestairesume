import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { locales, getOgLocale } from '@/i18n.config';

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
  const t = await getTranslations({ locale, namespace: 'Builder.meta' });

  const title = t('title');
  const description = t('description');

  return {
    title,
    description,
    keywords: [
      'resume builder',
      'CV maker',
      'online resume editor',
      'create resume online',
      'professional resume builder',
      'AI resume creator',
    ],
    openGraph: {
      type: 'website',
      locale: getOgLocale(locale),
      url: `${siteConfig.url}/${locale}/builder`,
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: '/og-builder.png',
          width: 1200,
          height: 630,
          alt: 'AI Resume Builder',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `${siteConfig.url}/${locale}/builder`,
      languages: Object.fromEntries([
        ['x-default', `${siteConfig.url}/en/builder`],
        ...locales.map(l => [l, `${siteConfig.url}/${l}/builder`]),
      ]),
    },
  };
}

export default function BuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

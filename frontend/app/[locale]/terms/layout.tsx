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
  const t = await getTranslations({ locale, namespace: 'Terms.meta' });

  const title = t('title');
  const description = t('description');

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      locale: locale === 'ar' ? 'ar_SA' : `${locale}_${locale.toUpperCase()}`,
      url: `${siteConfig.url}/${locale}/terms`,
      siteName: siteConfig.name,
      title,
      description,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    alternates: {
      canonical: `${siteConfig.url}/${locale}/terms`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

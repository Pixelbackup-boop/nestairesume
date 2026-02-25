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
  const t = await getTranslations({ locale, namespace: 'Auth.meta' });

  const title = t('registerTitle');
  const description = t('registerDescription');

  return {
    title,
    description,
    keywords: [
      'sign up resume builder',
      'create account',
      'register AI resume',
      'free resume builder account',
    ],
    openGraph: {
      type: 'website',
      locale: getOgLocale(locale),
      url: `${siteConfig.url}/${locale}/auth/register`,
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
      canonical: `${siteConfig.url}/${locale}/auth/register`,
    },
  };
}

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

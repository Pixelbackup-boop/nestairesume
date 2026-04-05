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
  const t = await getTranslations({ locale, namespace: 'Billing.meta' });

  const title = t('title');
  const description = t('description');

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      locale: getOgLocale(locale),
      url: `${siteConfig.url}/${locale}/billing`,
      siteName: siteConfig.name,
      title,
      description,
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function BillingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

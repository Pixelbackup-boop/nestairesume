import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { locales, getOgLocale, isIndexableLocale } from '@/i18n.config';
import { getLocalizedUrl } from '@/lib/localized-paths';

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
  const t = await getTranslations({ locale, namespace: 'ResignationLetter.meta' });

  const title = t('title');
  const description = t('description');

const alternateLanguages: Record<string, string> = {
    'x-default': getLocalizedUrl(siteConfig.url, '/tools/resignation-letter', 'en'),
  };
  locales.forEach((loc) => {
      if (!isIndexableLocale(loc)) return; // only indexable locales in hreflang
    alternateLanguages[loc] = getLocalizedUrl(siteConfig.url, '/tools/resignation-letter', loc);
  });

  return {
    title,
    description,
    keywords: [
      'resignation letter generator',
      'AI resignation letter',
      'free resignation letter',
      'professional resignation',
      'quit job letter',
      'resignation letter template',
      'two weeks notice',
      'resignation letter builder',
    ],
    openGraph: {
      type: 'website',
      locale: getOgLocale(locale),
      url: getLocalizedUrl(siteConfig.url, '/tools/resignation-letter', locale),
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: '/og-resignation-letter.png',
          width: 1200,
          height: 630,
          alt: 'AI Resignation Letter Generator',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: getLocalizedUrl(siteConfig.url, '/tools/resignation-letter', locale),
      languages: alternateLanguages,
    },
  };
}

function getBreadcrumbSchema(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: getLocalizedUrl(siteConfig.url, '', locale) },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: getLocalizedUrl(siteConfig.url, '/tools', locale) },
      { '@type': 'ListItem', position: 3, name: 'Resignation Letter Generator', item: getLocalizedUrl(siteConfig.url, '/tools/resignation-letter', locale) },
    ],
  };
}

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'AI Resignation Letter Generator',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

export default async function ResignationLetterLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const breadcrumbSchema = getBreadcrumbSchema(locale);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
      {children}
    </>
  );
}

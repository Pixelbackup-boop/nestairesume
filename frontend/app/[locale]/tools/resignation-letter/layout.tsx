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
  const t = await getTranslations({ locale, namespace: 'ResignationLetter.meta' });

  const title = t('title');
  const description = t('description');

const alternateLanguages: Record<string, string> = {
    'x-default': `${siteConfig.url}/en/tools/resignation-letter`,
  };
  locales.forEach((loc) => {
    alternateLanguages[loc] = `${siteConfig.url}/${loc}/tools/resignation-letter`;
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
      url: `${siteConfig.url}/${locale}/tools/resignation-letter`,
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
      canonical: `${siteConfig.url}/${locale}/tools/resignation-letter`,
      languages: alternateLanguages,
    },
  };
}

// Breadcrumb schema — hardcoded constants only, no user input
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: `${siteConfig.url}/tools` },
    { '@type': 'ListItem', position: 3, name: 'Resignation Letter Generator', item: `${siteConfig.url}/tools/resignation-letter` },
  ],
};

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

export default function ResignationLetterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
      {children}
    </>
  );
}

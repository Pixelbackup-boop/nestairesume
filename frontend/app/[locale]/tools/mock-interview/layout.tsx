import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { locales, getOgLocale } from '@/i18n.config';
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
  const t = await getTranslations({ locale, namespace: 'MockInterview.meta' });

  const title = t('title');
  const description = t('description');

const alternateLanguages: Record<string, string> = {
    'x-default': getLocalizedUrl(siteConfig.url, '/tools/mock-interview', 'en'),
  };
  locales.forEach((loc) => {
    alternateLanguages[loc] = getLocalizedUrl(siteConfig.url, '/tools/mock-interview', loc);
  });

  return {
    title,
    description,
    keywords: [
      'mock interview',
      'interview practice',
      'AI mock interview',
      'behavioral interview questions',
      'STAR method practice',
      'job interview preparation',
      'free interview practice',
      'interview simulator',
    ],
    openGraph: {
      type: 'website',
      locale: getOgLocale(locale),
      url: getLocalizedUrl(siteConfig.url, '/tools/mock-interview', locale),
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: '/og-mock-interview.png',
          width: 1200,
          height: 630,
          alt: 'AI Mock Interview Practice Tool',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: getLocalizedUrl(siteConfig.url, '/tools/mock-interview', locale),
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
      { '@type': 'ListItem', position: 3, name: 'Mock Interview', item: getLocalizedUrl(siteConfig.url, '/tools/mock-interview', locale) },
    ],
  };
}

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'AI Mock Interview Practice',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

export default async function MockInterviewLayout({
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

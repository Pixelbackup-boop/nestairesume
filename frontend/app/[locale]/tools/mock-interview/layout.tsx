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
  const t = await getTranslations({ locale, namespace: 'MockInterview.meta' });

  const title = t('title');
  const description = t('description');

const alternateLanguages: Record<string, string> = {
    'x-default': `${siteConfig.url}/en/tools/mock-interview`,
  };
  locales.forEach((loc) => {
    alternateLanguages[loc] = `${siteConfig.url}/${loc}/tools/mock-interview`;
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
      url: `${siteConfig.url}/${locale}/tools/mock-interview`,
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
      canonical: `${siteConfig.url}/${locale}/tools/mock-interview`,
      languages: alternateLanguages,
    },
  };
}

function getBreadcrumbSchema(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteConfig.url}/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: `${siteConfig.url}/${locale}/tools` },
      { '@type': 'ListItem', position: 3, name: 'Mock Interview', item: `${siteConfig.url}/${locale}/tools/mock-interview` },
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

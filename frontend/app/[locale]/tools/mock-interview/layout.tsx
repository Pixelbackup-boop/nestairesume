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
  const t = await getTranslations({ locale, namespace: 'MockInterview.meta' });

  const title = t('title');
  const description = t('description');

  const locales = ['en', 'es', 'fr', 'de', 'ar'];
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
      locale: locale === 'ar' ? 'ar_SA' : `${locale}_${locale.toUpperCase()}`,
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

// Breadcrumb schema — hardcoded constants only, no user input
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: `${siteConfig.url}/tools` },
    { '@type': 'ListItem', position: 3, name: 'Mock Interview' },
  ],
};

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

export default function MockInterviewLayout({
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

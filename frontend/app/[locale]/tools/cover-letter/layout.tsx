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
  const t = await getTranslations({ locale, namespace: 'CoverLetter.meta' });

  const title = t('title');
  const description = t('description');

const alternateLanguages: Record<string, string> = {
    'x-default': `${siteConfig.url}/en/tools/cover-letter`,
  };
  locales.forEach((loc) => {
    alternateLanguages[loc] = `${siteConfig.url}/${loc}/tools/cover-letter`;
  });

  return {
    title,
    description,
    keywords: [
      'cover letter generator',
      'AI cover letter',
      'free cover letter maker',
      'professional cover letter',
      'job application letter',
      'cover letter template',
      'write cover letter',
      'cover letter builder',
    ],
    openGraph: {
      type: 'website',
      locale: getOgLocale(locale),
      url: `${siteConfig.url}/${locale}/tools/cover-letter`,
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: '/og-cover-letter.png',
          width: 1200,
          height: 630,
          alt: 'AI Cover Letter Generator',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `${siteConfig.url}/${locale}/tools/cover-letter`,
      languages: alternateLanguages,
    },
  };
}

// Breadcrumb schema factory — locale-aware, hardcoded constants only
function getBreadcrumbSchema(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteConfig.url}/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: `${siteConfig.url}/${locale}/tools` },
      { '@type': 'ListItem', position: 3, name: 'Cover Letter Generator', item: `${siteConfig.url}/${locale}/tools/cover-letter` },
    ],
  };
}

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'AI Cover Letter Generator',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

export default async function CoverLetterLayout({
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

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
  const t = await getTranslations({ locale, namespace: 'AtsChecker.meta' });

  const title = t('title');
  const description = t('description');

const alternateLanguages: Record<string, string> = {
    'x-default': getLocalizedUrl(siteConfig.url, '/tools/ats-checker', 'en'),
  };
  locales.forEach((loc) => {
      if (!isIndexableLocale(loc)) return; // only indexable locales in hreflang
    alternateLanguages[loc] = getLocalizedUrl(siteConfig.url, '/tools/ats-checker', loc);
  });

  return {
    title,
    description,
    keywords: [
      'ATS resume checker',
      'ATS score',
      'resume ATS scan',
      'applicant tracking system',
      'ATS-friendly resume',
      'resume keyword checker',
      'ATS optimization',
      'free resume checker',
    ],
    openGraph: {
      type: 'website',
      locale: getOgLocale(locale),
      url: getLocalizedUrl(siteConfig.url, '/tools/ats-checker', locale),
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: '/og-ats-checker.png',
          width: 1200,
          height: 630,
          alt: 'Free ATS Resume Checker',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: getLocalizedUrl(siteConfig.url, '/tools/ats-checker', locale),
      languages: alternateLanguages,
    },
  };
}

// SoftwareApplication schema — hardcoded constants only, no user input
const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'ATS Resume Checker',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

function getBreadcrumbSchema(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: getLocalizedUrl(siteConfig.url, '', locale) },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: getLocalizedUrl(siteConfig.url, '/tools', locale) },
      { '@type': 'ListItem', position: 3, name: 'ATS Resume Checker', item: getLocalizedUrl(siteConfig.url, '/tools/ats-checker', locale) },
    ],
  };
}

export default async function AtsCheckerLayout({
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
      {/* Breadcrumb + SoftwareApp schemas — hardcoded constants, safe for rendering */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
      {children}
    </>
  );
}

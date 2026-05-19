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
  const t = await getTranslations({ locale, namespace: 'Pricing.meta' });

  const title = t('title');
  const description = t('description');

const alternateLanguages: Record<string, string> = {
    'x-default': getLocalizedUrl(siteConfig.url, '/pricing', 'en'),
  };
  locales.forEach((loc) => {
    alternateLanguages[loc] = getLocalizedUrl(siteConfig.url, '/pricing', loc);
  });

  return {
    title,
    description,
    keywords: [
      'resume builder pricing',
      'CV maker plans',
      'AI resume subscription',
      'affordable resume builder',
      'professional resume pricing',
    ],
    openGraph: {
      type: 'website',
      locale: getOgLocale(locale),
      url: getLocalizedUrl(siteConfig.url, '/pricing', locale),
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: '/og-pricing.png',
          width: 1200,
          height: 630,
          alt: 'Best AI Resume Pricing Plans',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: getLocalizedUrl(siteConfig.url, '/pricing', locale),
      languages: alternateLanguages,
    },
  };
}

// Breadcrumb schema — hardcoded constants only, no user input
function getBreadcrumbSchema(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: getLocalizedUrl(siteConfig.url, '', locale) },
      { '@type': 'ListItem', position: 2, name: 'Pricing', item: getLocalizedUrl(siteConfig.url, '/pricing', locale) },
    ],
  };
}

export default async function PricingLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const breadcrumbSchema = getBreadcrumbSchema(locale);
  // SAFE: breadcrumbSchema is built from hardcoded constants and locale param only
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}

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
  const t = await getTranslations({ locale, namespace: 'Templates.meta' });

  const title = t('title');
  const description = t('description');

const alternateLanguages: Record<string, string> = {
    'x-default': getLocalizedUrl(siteConfig.url, '/templates', 'en'),
  };
  locales.forEach((loc) => {
    alternateLanguages[loc] = getLocalizedUrl(siteConfig.url, '/templates', loc);
  });

  return {
    title,
    description,
    keywords: [
      'resume templates',
      'professional CV templates',
      'free resume templates',
      'ATS-friendly templates',
      'modern resume designs',
      'creative resume templates',
      'minimalist CV templates',
    ],
    openGraph: {
      type: 'website',
      locale: getOgLocale(locale),
      url: getLocalizedUrl(siteConfig.url, '/templates', locale),
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: '/og-templates.png',
          width: 1200,
          height: 630,
          alt: 'Professional Resume Templates',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: getLocalizedUrl(siteConfig.url, '/templates', locale),
      languages: alternateLanguages,
    },
  };
}

// Breadcrumb schema — hardcoded constants and locale param only, no user input
function getBreadcrumbSchema(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: getLocalizedUrl(siteConfig.url, '', locale) },
      { '@type': 'ListItem', position: 2, name: 'Templates', item: getLocalizedUrl(siteConfig.url, '/templates', locale) },
    ],
  };
}

export default async function TemplatesLayout({
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
      {/* SAFE: schema built from hardcoded constants and locale param only */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}

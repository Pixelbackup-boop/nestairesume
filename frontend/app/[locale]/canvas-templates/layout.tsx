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
  const t = await getTranslations({ locale, namespace: 'CanvasTemplates.meta' });

  const title = t('title');
  const description = t('description');

const alternateLanguages: Record<string, string> = {
    'x-default': getLocalizedUrl(siteConfig.url, '/canvas-templates', 'en'),
  };
  locales.forEach((loc) => {
    alternateLanguages[loc] = getLocalizedUrl(siteConfig.url, '/canvas-templates', loc);
  });

  return {
    title,
    description,
    keywords: [
      'canvas resume templates',
      'visual resume builder',
      'drag and drop resume',
      'creative resume templates',
      'custom resume design',
      'resume design tool',
    ],
    openGraph: {
      type: 'website',
      locale: getOgLocale(locale),
      url: getLocalizedUrl(siteConfig.url, '/canvas-templates', locale),
      siteName: siteConfig.name,
      title,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: getLocalizedUrl(siteConfig.url, '/canvas-templates', locale),
      languages: alternateLanguages,
    },
  };
}

// SAFE: Breadcrumb schema — hardcoded constants and locale param only, no user input
function getBreadcrumbSchema(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: getLocalizedUrl(siteConfig.url, '', locale) },
      { '@type': 'ListItem', position: 2, name: 'Templates', item: getLocalizedUrl(siteConfig.url, '/templates', locale) },
      { '@type': 'ListItem', position: 3, name: 'Canvas Templates' },
    ],
  };
}

export default async function CanvasTemplatesLayout({
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
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      {children}
    </>
  );
}

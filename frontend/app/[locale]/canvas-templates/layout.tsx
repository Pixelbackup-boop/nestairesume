import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

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

  const locales = ['en', 'es', 'fr', 'de', 'ar'];
  const alternateLanguages: Record<string, string> = {
    'x-default': `${siteConfig.url}/en/canvas-templates`,
  };
  locales.forEach((loc) => {
    alternateLanguages[loc] = `${siteConfig.url}/${loc}/canvas-templates`;
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
      locale: locale === 'ar' ? 'ar_SA' : `${locale}_${locale.toUpperCase()}`,
      url: `${siteConfig.url}/${locale}/canvas-templates`,
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
      canonical: `${siteConfig.url}/${locale}/canvas-templates`,
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
    { '@type': 'ListItem', position: 2, name: 'Templates', item: `${siteConfig.url}/en/templates` },
    { '@type': 'ListItem', position: 3, name: 'Canvas Templates' },
  ],
};

export default function CanvasTemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}

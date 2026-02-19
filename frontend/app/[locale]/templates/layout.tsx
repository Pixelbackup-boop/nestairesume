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
  const t = await getTranslations({ locale, namespace: 'Templates.meta' });

  const title = t('title');
  const description = t('description');

  const locales = ['en', 'es', 'fr', 'de', 'ar'];
  const alternateLanguages: Record<string, string> = {
    'x-default': `${siteConfig.url}/en/templates`,
  };
  locales.forEach((loc) => {
    alternateLanguages[loc] = `${siteConfig.url}/${loc}/templates`;
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
      locale: locale === 'ar' ? 'ar_SA' : `${locale}_${locale.toUpperCase()}`,
      url: `${siteConfig.url}/${locale}/templates`,
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
      canonical: `${siteConfig.url}/${locale}/templates`,
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
    { '@type': 'ListItem', position: 2, name: 'Templates' },
  ],
};

export default function TemplatesLayout({
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

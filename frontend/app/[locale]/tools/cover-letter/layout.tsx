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
  const t = await getTranslations({ locale, namespace: 'CoverLetter.meta' });

  const title = t('title');
  const description = t('description');

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
      locale: locale === 'ar' ? 'ar_SA' : `${locale}_${locale.toUpperCase()}`,
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
    },
  };
}

export default function CoverLetterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

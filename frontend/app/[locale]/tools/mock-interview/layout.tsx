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

  const title = 'Free AI Mock Interview Practice | Best AI Resume';
  const description =
    'Practice job interviews with AI-generated questions tailored to your role. Get instant STAR method feedback on your answers. Free mock interview tool.';

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
    },
  };
}

export default function MockInterviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

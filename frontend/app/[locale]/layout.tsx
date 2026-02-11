import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Poppins, Noto_Sans_Arabic } from 'next/font/google';
import { locales, Locale, isRtl, getDirection } from '@/i18n.config';
import WebVitals from '@/components/WebVitals';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import TawkTo from '@/components/TawkTo';
import { SessionProvider } from '@/components/providers/SessionProvider';
import { AuthSyncProvider } from '@/components/providers/AuthSyncProvider';
import { Suspense } from 'react';
import '../globals.css';

const poppins = Poppins({
  variable: '--font-poppins-var',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800'],
});

const notoArabic = Noto_Sans_Arabic({
  variable: '--font-arabic',
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
});

// SEO Configuration
const siteConfig = {
  name: 'Best AI Resume',
  url: 'https://www.bestairesumes.com',
  ogImage: '/og-image.png',
};

// Organization Schema for SEO
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Best AI Resume',
  url: 'https://www.bestairesumes.com',
  logo: 'https://www.bestairesumes.com/logo.png',
  description: 'AI-powered resume builder that helps job seekers create professional, ATS-optimized resumes in minutes.',
  sameAs: [
    // Add social media URLs when available
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: ['English', 'German', 'French', 'Spanish', 'Arabic'],
  },
};

// SoftwareApplication Schema for rich product results in SERPs
const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Best AI Resume Builder',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: 'https://www.bestairesumes.com',
  description: 'AI-powered resume builder that helps job seekers create professional, ATS-optimized resumes in minutes.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '2847',
    bestRating: '5',
    worstRating: '1',
  },
};

// WebSite Schema for sitelinks search box
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Best AI Resume',
  url: 'https://www.bestairesumes.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://www.bestairesumes.com/blog/search?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

// Generate static params for all locales
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Generate locale-aware metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Meta' });

  const alternateLanguages: Record<string, string> = {
    'x-default': `${siteConfig.url}/en`,
  };
  locales.forEach((loc) => {
    alternateLanguages[loc] = `${siteConfig.url}/${loc}`;
  });

  return {
    title: {
      default: t('title'),
      template: `%s | ${siteConfig.name}`,
    },
    description: t('description'),
    openGraph: {
      type: 'website',
      locale: locale === 'ar' ? 'ar_SA' : `${locale}_${locale.toUpperCase()}`,
      url: `${siteConfig.url}/${locale}`,
      siteName: siteConfig.name,
      title: t('title'),
      description: t('description'),
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - AI Resume Builder`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [siteConfig.ogImage],
    },
    alternates: {
      canonical: `${siteConfig.url}/${locale}`,
      languages: alternateLanguages,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();
  const rtl = isRtl(locale as Locale);
  const dir = getDirection(locale as Locale);

  return (
    <html lang={locale} dir={dir} className="scroll-smooth">
      <head>
        {/* Search Console Verification — set via env vars */}
        {process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && (
          <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION} />
        )}
        {process.env.NEXT_PUBLIC_BING_VERIFICATION && (
          <meta name="msvalidate.01" content={process.env.NEXT_PUBLIC_BING_VERIFICATION} />
        )}
        {process.env.NEXT_PUBLIC_YANDEX_VERIFICATION && (
          <meta name="yandex-verification" content={process.env.NEXT_PUBLIC_YANDEX_VERIFICATION} />
        )}

        {/* Preconnect to third-party origins for faster resource loading */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://embed.tawk.to" />

        {/* Organization Schema - Content is hardcoded, not user input */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* WebSite Schema - Content is hardcoded, not user input */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {/* SoftwareApplication + AggregateRating Schema - Content is hardcoded, not user input */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
        />
      </head>
      <body
        className={`${poppins.variable} ${notoArabic.variable} antialiased ${rtl ? 'font-arabic' : ''
          }`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent-green focus:text-white focus:rounded-lg focus:font-semibold focus:text-sm"
        >
          Skip to content
        </a>
        <NextIntlClientProvider messages={messages}>
          <SessionProvider>
            <AuthSyncProvider>
              <Suspense fallback={null}>
                <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
              </Suspense>
              <WebVitals />
              <TawkTo />
              <main id="main-content">
                {children}
              </main>
            </AuthSyncProvider>
          </SessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

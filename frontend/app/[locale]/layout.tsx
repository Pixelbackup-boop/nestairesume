import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Poppins, Noto_Sans_Arabic, Noto_Sans_JP, Noto_Sans_KR, Noto_Sans_SC, Noto_Sans_Thai } from 'next/font/google';
import { locales, Locale, getDirection, getOgLocale } from '@/i18n.config';
import { getLocalizedUrl } from '@/lib/localized-paths';
import WebVitals from '@/components/WebVitals';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import TawkTo from '@/components/TawkTo';
import { SessionProvider } from '@/components/providers/SessionProvider';
import { AuthSyncProvider } from '@/components/providers/AuthSyncProvider';
import { Suspense } from 'react';
import Script from 'next/script';
import { getGlobalSettings } from '@/lib/getGlobalSettings';
import '../globals.css';

const poppins = Poppins({
  variable: '--font-poppins-var',
  subsets: ['latin', 'latin-ext'],
  // 800 (extrabold) dropped: only 16 uses sitewide — browser falls back
  // to 700 (bold) with imperceptible visual difference. Removing it cuts
  // 2 woff2 preload files (one per subset) from every page load.
  weight: ['400', '500', '600', '700'],
});

const notoArabic = Noto_Sans_Arabic({
  variable: '--font-arabic',
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: false,
});

const notoJP = Noto_Sans_JP({
  variable: '--font-japanese',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: false,
});

const notoKR = Noto_Sans_KR({
  variable: '--font-korean',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: false,
});

const notoSC = Noto_Sans_SC({
  variable: '--font-chinese',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: false,
});

const notoThai = Noto_Sans_Thai({
  variable: '--font-thai',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: false,
});

// Non-Latin font class mapping
const fontClassMap: Record<string, string> = {
  ar: 'font-arabic',
  ja: 'font-japanese',
  ko: 'font-korean',
  zh: 'font-chinese',
  th: 'font-thai',
};

// Only load the Noto font needed for the current locale (avoids preloading all 5)
const localeFontVar: Record<string, string> = {
  ar: notoArabic.variable,
  ja: notoJP.variable,
  ko: notoKR.variable,
  zh: notoSC.variable,
  th: notoThai.variable,
};

// SEO Configuration
const siteConfig = {
  name: 'Best AI Resume',
  url: 'https://bestairesumes.com',
  ogImage: '/og-image.png',
};

// Organization Schema for SEO
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Best AI Resume',
  url: 'https://bestairesumes.com',
  logo: 'https://bestairesumes.com/logo.png',
  description: 'AI-powered resume builder that helps job seekers create professional, ATS-optimized resumes in minutes.',
  sameAs: [
    // Add social media URLs when available
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: ['English', 'Spanish', 'French', 'German', 'Arabic', 'Japanese', 'Korean', 'Italian', 'Portuguese', 'Turkish', 'Vietnamese', 'Thai', 'Chinese', 'Malay', 'Indonesian', 'Polish', 'Dutch'],
  },
};

// SoftwareApplication Schema for rich product results in SERPs
const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Best AI Resume Builder',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: 'https://bestairesumes.com',
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
  url: 'https://bestairesumes.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://bestairesumes.com/blog/search?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

// Generate static params for all locales
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Locales whose translations are AI-generated and still need human review
// (per project memory). We emit `noindex` for these to stop Google wasting
// crawl budget on thin/duplicate content while we improve them. Removing
// them from the index also lifts the site-wide quality signal that was
// suppressing indexation on the strong locales.
//
// Indexed (human-reviewed quality): en, es, fr, de, ar.
const NOINDEX_LOCALES = new Set<string>([
  'ja', 'ko', 'it', 'pt', 'tr', 'vi', 'th', 'zh', 'ms', 'id', 'pl', 'nl',
]);

// Generate locale-aware metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Meta' });

  // Only the indexed locales appear in the hreflang map. Including noindexed
  // locales as alternates contradicts the robots tag and confuses Google.
  const alternateLanguages: Record<string, string> = {
    'x-default': getLocalizedUrl(siteConfig.url, '', 'en'),
  };
  locales.forEach((loc) => {
    if (!NOINDEX_LOCALES.has(loc)) {
      alternateLanguages[loc] = getLocalizedUrl(siteConfig.url, '', loc);
    }
  });

  const robots = NOINDEX_LOCALES.has(locale)
    ? { index: false, follow: true }
    : undefined;

  return {
    title: {
      default: t('title'),
      template: `%s | ${siteConfig.name}`,
    },
    description: t('description'),
    ...(robots ? { robots } : {}),
    openGraph: {
      type: 'website',
      locale: getOgLocale(locale),
      url: getLocalizedUrl(siteConfig.url, '', locale),
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
      canonical: getLocalizedUrl(siteConfig.url, '', locale),
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
  const dir = getDirection(locale as Locale);

  // Fetch admin-configured settings from DB, fall back to env vars
  const settings = await getGlobalSettings();
  const googleVerification = settings?.googleSiteVerification || process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  const bingVerification = settings?.bingSiteVerification || process.env.NEXT_PUBLIC_BING_VERIFICATION;
  const yandexVerification = settings?.yandexSiteVerification || process.env.NEXT_PUBLIC_YANDEX_VERIFICATION;
  const gaId = settings?.googleAnalyticsId || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang={locale} dir={dir} className="scroll-smooth">
      <head>
        {/* Search Console Verification — from admin settings or env vars */}
        {googleVerification && (
          <meta name="google-site-verification" content={googleVerification} />
        )}
        {bingVerification && (
          <meta name="msvalidate.01" content={bingVerification} />
        )}
        {yandexVerification && (
          <meta name="yandex-verification" content={yandexVerification} />
        )}
        <meta name="p:domain_verify" content="ce878063a9827734d7f65855aa88496e" />

        {/* Preconnect to third-party origins for faster resource loading */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://embed.tawk.to" />
        <link rel="dns-prefetch" href="https://widget.trustpilot.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />

        {/* AdSense moved out of <head> to a deferred <Script> below.
            PSI flagged it as 137KB unused JS + 113ms main-thread cost,
            blocking mobile LCP. The AdSense crawler renders pages
            (it's a real browser), so deferred loading still allows
            verification — what matters is the script tag exists in the
            rendered DOM, not when it executes. */}

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
        className={`${poppins.variable} ${localeFontVar[locale] || ''} antialiased ${fontClassMap[locale] || ''}`}
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
                <GoogleAnalytics measurementId={gaId} />
              </Suspense>
              <WebVitals />
              <TawkTo />
              {/* AdSense deferred to lazyOnload (was in <head> — see note above) */}
              <Script
                id="adsense-script"
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8805972435327777"
                strategy="lazyOnload"
                crossOrigin="anonymous"
              />
              <Script
                src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
                strategy="lazyOnload"
              />
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

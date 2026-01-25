import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Poppins, Noto_Sans_Arabic } from 'next/font/google';
import { locales, Locale, isRtl, getDirection } from '@/i18n.config';
import { ThemeProvider } from '@/components/ThemeProvider';
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

  const alternateLanguages: Record<string, string> = {};
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
    <html lang={locale} dir={dir} className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${notoArabic.variable} antialiased ${
          rtl ? 'font-arabic' : ''
        }`}
      >
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

// i18n Configuration
// Defines supported locales, default locale, and RTL settings

export const locales = ['en', 'es', 'fr', 'de', 'ar', 'ja', 'ko', 'it', 'pt', 'tr', 'vi', 'th', 'zh', 'ms', 'id', 'pl', 'nl'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  ar: 'العربية',
  ja: '日本語',
  ko: '한국어',
  it: 'Italiano',
  pt: 'Português',
  tr: 'Türkçe',
  vi: 'Tiếng Việt',
  th: 'ไทย',
  zh: '简体中文',
  ms: 'Bahasa Melayu',
  id: 'Bahasa Indonesia',
  pl: 'Polski',
  nl: 'Nederlands',
};

// Short codes for display in compact UI
export const localeCodes: Record<Locale, string> = {
  en: 'EN',
  es: 'ES',
  fr: 'FR',
  de: 'DE',
  ar: 'AR',
  ja: 'JA',
  ko: 'KO',
  it: 'IT',
  pt: 'PT',
  tr: 'TR',
  vi: 'VI',
  th: 'TH',
  zh: 'ZH',
  ms: 'MS',
  id: 'ID',
  pl: 'PL',
  nl: 'NL',
};

// OpenGraph locale codes (locale → country-specific code)
export const ogLocaleMap: Record<Locale, string> = {
  en: 'en_US',
  es: 'es_ES',
  fr: 'fr_FR',
  de: 'de_DE',
  ar: 'ar_SA',
  ja: 'ja_JP',
  ko: 'ko_KR',
  it: 'it_IT',
  pt: 'pt_BR',
  tr: 'tr_TR',
  vi: 'vi_VN',
  th: 'th_TH',
  zh: 'zh_CN',
  ms: 'ms_MY',
  id: 'id_ID',
  pl: 'pl_PL',
  nl: 'nl_NL',
};

export const getOgLocale = (locale: string): string =>
  ogLocaleMap[locale as Locale] || `${locale}_${locale.toUpperCase()}`;

// Locales where resume-examples + cover-letter-examples are allowed to be
// indexed by search engines. Other locales serve the content but emit
// `noindex` so Google focuses crawl budget on locales with proven traffic.
// Decision: Apr 2026 — based on 90 days of GSC click data showing zero
// click-throughs from non-listed locales for example slug pages.
export const INDEXABLE_EXAMPLE_LOCALES: ReadonlyArray<Locale> = ['en', 'es', 'pt', 'fr', 'de', 'it'];

export const isIndexableExampleLocale = (locale: string): boolean =>
  INDEXABLE_EXAMPLE_LOCALES.includes(locale as Locale);

// RTL languages
export const rtlLocales: Locale[] = ['ar'];

export const isRtl = (locale: Locale): boolean => rtlLocales.includes(locale);

// Language direction
export const getDirection = (locale: Locale): 'ltr' | 'rtl' =>
  isRtl(locale) ? 'rtl' : 'ltr';

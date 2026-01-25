// i18n Configuration
// Defines supported locales, default locale, and RTL settings

export const locales = ['en', 'es', 'fr', 'de', 'ar'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  ar: 'العربية',
};

// Short codes for display in compact UI
export const localeCodes: Record<Locale, string> = {
  en: 'EN',
  es: 'ES',
  fr: 'FR',
  de: 'DE',
  ar: 'AR',
};

// RTL languages
export const rtlLocales: Locale[] = ['ar'];

export const isRtl = (locale: Locale): boolean => rtlLocales.includes(locale);

// Language direction
export const getDirection = (locale: Locale): 'ltr' | 'rtl' =>
  isRtl(locale) ? 'rtl' : 'ltr';

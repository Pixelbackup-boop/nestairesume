import { getRequestConfig } from 'next-intl/server';
import { locales, Locale } from '../i18n.config';

export default getRequestConfig(async ({ requestLocale }) => {
  // Get the locale from the request (set by middleware)
  let locale = await requestLocale;

  // Validate that the incoming locale is supported
  if (!locale || !locales.includes(locale as Locale)) {
    locale = 'en'; // Default to English
  }

  // Load messages for the requested locale
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});

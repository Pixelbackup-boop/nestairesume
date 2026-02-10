import { getRequestConfig } from 'next-intl/server';
import { locales, Locale } from '../i18n.config';
import enMessages from '../messages/en.json';

// Deep merge: locale messages override English defaults.
// Missing keys in any locale automatically fall back to English.
function deepMerge(
  base: Record<string, unknown>,
  override: Record<string, unknown>
): Record<string, unknown> {
  const result = { ...base };
  for (const key of Object.keys(override)) {
    if (
      override[key] && typeof override[key] === 'object' && !Array.isArray(override[key]) &&
      result[key] && typeof result[key] === 'object' && !Array.isArray(result[key])
    ) {
      result[key] = deepMerge(
        result[key] as Record<string, unknown>,
        override[key] as Record<string, unknown>
      );
    } else {
      result[key] = override[key];
    }
  }
  return result;
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !locales.includes(locale as Locale)) {
    locale = 'en';
  }

  // English: use directly, no merging needed
  if (locale === 'en') {
    return { locale, messages: enMessages };
  }

  // Other locales: deep-merge with English as fallback base
  const localeMessages = (await import(`../messages/${locale}.json`)).default;
  return {
    locale,
    messages: deepMerge(enMessages, localeMessages) as Record<string, string>,
  };
});

import { INDEXABLE_LOCALES } from '@/i18n.config';
import { getLocalizedUrl } from '@/lib/localized-paths';

/**
 * Build the `alternates.languages` map for a path, emitting hreflang entries
 * for INDEXABLE locales only (en, es, fr, de, ar) plus `x-default` → English.
 *
 * Single source of truth for hreflang. Listing a noindexed locale as an
 * alternate contradicts that locale's robots `noindex` tag, and Google drops
 * the entire hreflang cluster when any alternate points to a noindexed URL —
 * so every page must filter alternates to the indexable set. Derive from this
 * helper instead of iterating `locales` directly.
 */
export function hreflangAlternates(baseUrl: string, path: string): Record<string, string> {
  const languages: Record<string, string> = {
    'x-default': getLocalizedUrl(baseUrl, path, 'en'),
  };
  for (const loc of INDEXABLE_LOCALES) {
    languages[loc] = getLocalizedUrl(baseUrl, path, loc);
  }
  return languages;
}

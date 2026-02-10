// Centralized route segment translations for localized URLs.
// Used by middleware (rewrite/redirect), sitemap, and metadata generation.

const ROUTE_TRANSLATIONS: Record<string, Record<string, string>> = {
  es: {
    'resume-examples': 'ejemplos-de-curriculum',
    'cover-letter-examples': 'ejemplos-de-carta-de-presentacion',
    'career-tips': 'consejos-profesionales',
    'tools': 'herramientas',
    'builder': 'creador-de-curriculum',
  },
};

// Reverse maps: localized segment → English segment (per locale)
const REVERSE_TRANSLATIONS: Record<string, Record<string, string>> = {};
for (const [locale, map] of Object.entries(ROUTE_TRANSLATIONS)) {
  REVERSE_TRANSLATIONS[locale] = Object.fromEntries(
    Object.entries(map).map(([en, localized]) => [localized, en])
  );
}

/**
 * Translate a path's first route segment to the localized version.
 * e.g. getLocalizedPath('/resume-examples/software-engineer', 'es')
 *   → '/ejemplos-de-curriculum/software-engineer'
 */
export function getLocalizedPath(path: string, locale: string): string {
  const map = ROUTE_TRANSLATIONS[locale];
  if (!map) return path;

  // Match the first path segment after leading /
  const match = path.match(/^\/([^/]+)(.*)/);
  if (!match) return path;

  const [, segment, rest] = match;
  const translated = map[segment];
  return translated ? `/${translated}${rest}` : path;
}

/**
 * Build a full localized URL: baseUrl + /locale + localizedPath
 * e.g. getLocalizedUrl('https://example.com', '/resume-examples/slug', 'es')
 *   → 'https://example.com/es/ejemplos-de-curriculum/slug'
 */
export function getLocalizedUrl(baseUrl: string, path: string, locale: string): string {
  const localizedPath = getLocalizedPath(path, locale);
  return `${baseUrl}/${locale}${localizedPath}`;
}

/**
 * Reverse-translate: localized segment → English segment.
 * Returns null if the segment has no translation for this locale.
 */
export function getEnglishSegment(localizedSegment: string, locale: string): string | null {
  return REVERSE_TRANSLATIONS[locale]?.[localizedSegment] ?? null;
}

/**
 * Get the localized equivalent of an English segment for a given locale.
 * Returns the original segment if no translation exists.
 */
export function getLocalizedSegment(englishSegment: string, locale: string): string {
  return ROUTE_TRANSLATIONS[locale]?.[englishSegment] ?? englishSegment;
}

/**
 * Check if an English segment has a localized version for the given locale.
 */
export function hasLocalizedSegment(englishSegment: string, locale: string): boolean {
  return !!(ROUTE_TRANSLATIONS[locale]?.[englishSegment]);
}

export { ROUTE_TRANSLATIONS, REVERSE_TRANSLATIONS };

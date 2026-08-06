import fs from 'fs';
import { contentExistsSync, contentReaddirSync, contentReadFileSync } from '@/lib/content-fs';
import path from 'path';

/**
 * Resolves the file path for locale-specific content with English fallback.
 *
 * Directory structure:
 *   content/resume-examples/software-engineer.mdx        (English - source of truth)
 *   content/resume-examples/es/software-engineer.mdx     (Spanish)
 *   content/resume-examples/fr/software-engineer.mdx     (French)
 *
 * If the locale-specific file doesn't exist, falls back to English.
 */
export function resolveContentPath(contentDir: string, slug: string, locale: string): string {
  if (locale !== 'en') {
    const localePath = path.join(contentDir, locale, `${slug}.mdx`);
    if (contentExistsSync(localePath)) return localePath;
  }
  const rootPath = path.join(contentDir, `${slug}.mdx`);
  if (!contentExistsSync(rootPath)) return '';
  return rootPath;
}

/**
 * Returns true only when this slug has a *dedicated* MDX file for the
 * requested locale. Used to decide which locales should appear in
 * canonical/hreflang metadata — locales that just fall back to English
 * are NOT counted.
 *
 * For 'en', "dedicated" means the root file exists.
 */
export function hasLocaleContent(contentDir: string, slug: string, locale: string): boolean {
  const filePath = locale === 'en'
    ? path.join(contentDir, `${slug}.mdx`)
    : path.join(contentDir, locale, `${slug}.mdx`);
  return contentExistsSync(filePath);
}

/**
 * For a given slug, returns the subset of `allLocales` that have their own
 * MDX file (no English fallback). Order is preserved.
 */
export function getContentLocales(
  contentDir: string,
  slug: string,
  allLocales: readonly string[],
): string[] {
  return allLocales.filter((loc) => hasLocaleContent(contentDir, slug, loc));
}

import fs from 'fs';
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
    if (fs.existsSync(localePath)) return localePath;
  }
  const rootPath = path.join(contentDir, `${slug}.mdx`);
  if (!fs.existsSync(rootPath)) return '';
  return rootPath;
}

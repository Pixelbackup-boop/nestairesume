import Link from 'next/link';
import { Globe } from 'lucide-react';
import { INDEXABLE_LOCALES, localeNames, type Locale } from '@/i18n.config';
import { getLocalizedPath } from '@/lib/localized-paths';

interface Props {
  currentLocale: string;
  /** Path without locale prefix, e.g. '/resume-examples/software-engineer' */
  path: string;
  /** Localized section title — falls back to English if not provided */
  title?: string;
}

const defaultTitles: Record<string, string> = {
  en: 'Read in your language',
  es: 'Lee en tu idioma',
  pt: 'Leia no seu idioma',
  fr: 'Lire dans votre langue',
  de: 'In Ihrer Sprache lesen',
  ar: 'اقرأ بلغتك',
  ja: 'お好みの言語で読む',
  ko: '원하는 언어로 읽기',
  it: 'Leggi nella tua lingua',
  tr: 'Kendi dilinizde okuyun',
  vi: 'Đọc bằng ngôn ngữ của bạn',
  th: 'อ่านในภาษาของคุณ',
  zh: '使用您的语言阅读',
  ms: 'Baca dalam bahasa anda',
  id: 'Baca dalam bahasa Anda',
  pl: 'Czytaj w swoim języku',
  nl: 'Lees in uw taal',
};

export default function LanguageAlternates({ currentLocale, path, title }: Props) {
  // Only link to INDEXABLE locales. Emitting crawlable <a hreflang> tags to the
  // 12 noindexed locales voids the hreflang cluster (Google drops the whole
  // cluster when an alternate points at a noindexed URL) and surfaces those
  // copies as "Alternate page with proper canonical tag".
  const others = INDEXABLE_LOCALES.filter((l) => l !== currentLocale) as Locale[];
  const heading = title ?? defaultTitles[currentLocale] ?? defaultTitles.en;

  return (
    <section className="mt-12 pt-8 border-t border-gray-200" aria-label={heading}>
      <h2 className="flex items-center gap-2 text-sm font-semibold text-dark-teal/60 uppercase tracking-wide mb-4">
        <Globe size={16} />
        {heading}
      </h2>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {others.map((locale) => (
          <li key={locale}>
            <Link
              href={`/${locale}${getLocalizedPath(path, locale)}`}
              hrefLang={locale}
              className="block px-3 py-2 text-sm text-dark-teal/80 bg-gray-50 hover:bg-light-teal hover:text-teal-primary rounded-lg transition border border-transparent hover:border-teal-primary/20"
            >
              {localeNames[locale]}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

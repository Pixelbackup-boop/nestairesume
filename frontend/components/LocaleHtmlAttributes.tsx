'use client';

import { useEffect } from 'react';

interface LocaleHtmlAttributesProps {
  lang: string;
  dir: string;
  rtl: boolean;
}

/**
 * Sets locale-specific attributes (lang, dir, font class) on the root
 * <html> and <body> elements after hydration. The root layout provides
 * default lang="en" — this component overrides it per locale.
 */
export default function LocaleHtmlAttributes({ lang, dir, rtl }: LocaleHtmlAttributesProps) {
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    if (rtl) {
      document.body.classList.add('font-arabic');
    } else {
      document.body.classList.remove('font-arabic');
    }
  }, [lang, dir, rtl]);

  return null;
}

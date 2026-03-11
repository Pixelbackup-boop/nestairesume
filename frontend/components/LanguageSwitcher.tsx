'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { locales, localeNames, localeCodes, Locale } from '@/i18n.config';

interface LanguageSwitcherProps {
  scrolled?: boolean;
  isHomePage?: boolean;
}

export default function LanguageSwitcher({ scrolled = true, isHomePage = false }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('LanguageSwitcher');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const switchLocale = (newLocale: Locale) => {
    // Replace current locale in pathname with new locale
    // pathname is like /en/pricing or /es/templates
    const segments = pathname.split('/');
    if (segments[1] && locales.includes(segments[1] as Locale)) {
      segments[1] = newLocale;
    } else {
      // No locale in path (shouldn't happen with middleware), prepend it
      segments.splice(1, 0, newLocale);
    }
    const newPath = segments.join('/') || `/${newLocale}`;

    // Persist preference in cookie
    // eslint-disable-next-line react-hooks/immutability
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000;SameSite=Lax`;

    router.push(newPath);
    setIsOpen(false);
  };

  // Determine text colors based on scroll state and page
  const useDarkText = scrolled || !isHomePage;
  const buttonTextColor = useDarkText ? 'text-dark-teal/70 hover:text-dark-teal' : 'text-white/80 hover:text-white';
  const buttonHoverBg = useDarkText ? 'hover:bg-gray-100' : 'hover:bg-white/10';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors rounded-lg ${buttonTextColor} ${buttonHoverBg}`}
        aria-label={t('label')}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe size={16} />
        <span>{localeCodes[locale]}</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute top-full right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden z-50 max-h-80 overflow-y-auto"
          role="listbox"
          aria-label={t('label')}
        >
          {locales.map((loc) => (
            <button
              key={loc}
              onClick={() => switchLocale(loc)}
              className={`flex items-center justify-between w-full px-4 py-2.5 text-sm transition-colors ${
                locale === loc
                  ? 'bg-teal-primary/10 text-teal-primary'
                  : 'text-dark-teal/70 hover:bg-gray-50 hover:text-dark-teal'
              }`}
              role="option"
              aria-selected={locale === loc}
            >
              <span className="flex items-center gap-3">
                <span className="text-xs font-semibold w-6 text-center opacity-60">
                  {localeCodes[loc]}
                </span>
                <span>{localeNames[loc]}</span>
              </span>
              {locale === loc && <Check size={14} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

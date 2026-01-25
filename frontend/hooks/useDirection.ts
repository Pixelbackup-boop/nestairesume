'use client';

import { useLocale } from 'next-intl';
import { isRtl, getDirection, Locale } from '@/i18n.config';

/**
 * Hook to get direction-related values for RTL support
 */
export function useDirection() {
  const locale = useLocale() as Locale;
  const rtl = isRtl(locale);
  const dir = getDirection(locale);

  return {
    /** Current language direction: 'ltr' or 'rtl' */
    dir,
    /** Whether current locale is RTL */
    isRtl: rtl,
    /** Text alignment based on direction */
    textAlign: rtl ? 'right' : 'left',
    /** Flex direction for horizontal layouts */
    flexDirection: rtl ? 'row-reverse' : 'row',
    /** Current locale code */
    locale,
  };
}

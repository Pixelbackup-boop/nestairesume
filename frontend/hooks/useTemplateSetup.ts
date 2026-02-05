'use client';

import { useMemo } from 'react';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '@/components/templates/shared/styleHelpers';
import { useTemplateTranslations } from '@/lib/templates/TranslationContext';
import { parseDualColor, getContrastText } from '@/lib/templates/builder/colorUtils';

interface FontConfig {
  heading?: string;
  body?: string;
  size?: 'small' | 'medium' | 'large';
}

interface TemplateColors {
  primary: string;
  secondary: string;
  primaryText: string;
  secondaryText: string;
  mainBg: string;
  mainText: string;
}

interface UseTemplateSetupOptions {
  /** Custom theme color (can be single color or "primary|secondary" format) */
  customThemeColor?: string;
  /** Font configuration */
  fonts?: FontConfig;
  /** Scale factor for preview */
  scale?: number;
  /** Default primary color */
  defaultPrimary?: string;
  /** Default secondary/accent color */
  defaultSecondary?: string;
  /** Default heading font */
  defaultHeadingFont?: string;
  /** Default body font */
  defaultBodyFont?: string;
}

interface UseTemplateSetupReturn {
  /** Font family for headings */
  headingFont: string;
  /** Font family for body text */
  bodyFont: string;
  /** Font size configuration */
  sizeConfig: typeof fontSizes['medium'];
  /** Scaled font sizes based on scale factor */
  fs: ScaledFontSizes;
  /** Template translations */
  t: ReturnType<typeof useTemplateTranslations>;
  /** Calculated colors with contrast text colors */
  colors: TemplateColors;
  /** Scale factor */
  scale: number;
}

/**
 * Custom hook for setting up template fonts, colors, and sizes.
 *
 * This hook consolidates the common initialization pattern used across all
 * resume templates, reducing ~20 lines of boilerplate in each template.
 *
 * @example
 * ```tsx
 * function MyTemplate({ data, scale = 1 }: TemplateProps) {
 *   const { personalInfo, experience, customThemeColor, fonts } = data;
 *
 *   const { headingFont, bodyFont, fs, t, colors } = useTemplateSetup({
 *     customThemeColor,
 *     fonts,
 *     scale,
 *     defaultPrimary: '#0f172a',
 *     defaultSecondary: '#facc15',
 *   });
 *
 *   return (
 *     <div style={{ fontFamily: bodyFont, color: colors.mainText }}>
 *       <h1 style={{ fontFamily: headingFont, color: colors.primary }}>
 *         {personalInfo.fullName}
 *       </h1>
 *     </div>
 *   );
 * }
 * ```
 */
export function useTemplateSetup({
  customThemeColor,
  fonts,
  scale = 1,
  defaultPrimary = '#2563eb', // Blue 600
  defaultSecondary = '#f59e0b', // Amber 500
  defaultHeadingFont = 'Montserrat',
  defaultBodyFont = 'Open Sans',
}: UseTemplateSetupOptions = {}): UseTemplateSetupReturn {
  // Get translations
  const t = useTemplateTranslations();

  // Calculate fonts
  const headingFont = useMemo(
    () => getFontFamily(fonts?.heading || defaultHeadingFont),
    [fonts?.heading, defaultHeadingFont]
  );

  const bodyFont = useMemo(
    () => getFontFamily(fonts?.body || defaultBodyFont),
    [fonts?.body, defaultBodyFont]
  );

  // Get size configuration
  const sizeConfig = useMemo(
    () => fontSizes[fonts?.size || 'medium'],
    [fonts?.size]
  );

  // Calculate scaled font sizes
  const fs = useMemo(
    () => getScaledFontSizes(sizeConfig, scale),
    [sizeConfig, scale]
  );

  // Parse and calculate colors
  const colors = useMemo<TemplateColors>(() => {
    const { primary, secondary } = parseDualColor(customThemeColor, {
      primary: defaultPrimary,
      secondary: defaultSecondary,
    });

    return {
      primary,
      secondary,
      primaryText: getContrastText(primary),
      secondaryText: getContrastText(secondary),
      mainBg: '#ffffff',
      mainText: '#334155', // Slate 700
    };
  }, [customThemeColor, defaultPrimary, defaultSecondary]);

  return {
    headingFont,
    bodyFont,
    sizeConfig,
    fs,
    t,
    colors,
    scale,
  };
}

export default useTemplateSetup;

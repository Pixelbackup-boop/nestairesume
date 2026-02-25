/**
 * HTML Wrapper for PDF Generation
 * Wraps template content with proper document structure, fonts, and CSS
 */

import { getCachedFontStyles } from './fontCache';

interface WrapperOptions {
    headingFont: string;
    bodyFont: string;
    locale?: string;
    // 'sidebar': 20px uniform (allows bleed with negative margin)
    // 'full-bleed': 0px (headers/banners handling own padding)
    // 'standard': 40px (default safe margin)
    marginStrategy?: 'sidebar' | 'full-bleed' | 'standard';
}

// RTL locales list
const RTL_LOCALES = ['ar', 'he', 'fa', 'ur'];

// Non-Latin locale font config (loaded via Google Fonts link, not base64 — CJK fonts are too large)
const CJK_FONT_MAP: Record<string, { family: string; googleParam: string }> = {
    ja: { family: 'Noto Sans JP', googleParam: 'Noto+Sans+JP:wght@400;500;600;700' },
    ko: { family: 'Noto Sans KR', googleParam: 'Noto+Sans+KR:wght@400;500;600;700' },
    zh: { family: 'Noto Sans SC', googleParam: 'Noto+Sans+SC:wght@400;500;600;700' },
    th: { family: 'Noto Sans Thai', googleParam: 'Noto+Sans+Thai:wght@400;500;600;700' },
};

/**
 * Check if a locale is RTL (Right-to-Left)
 */
const isRtl = (locale: string): boolean => RTL_LOCALES.includes(locale);

/**
 * Get direction for a locale
 */
const getDirection = (locale: string): 'ltr' | 'rtl' => isRtl(locale) ? 'rtl' : 'ltr';

/**
 * Generates inline @font-face CSS from cached fonts (no network requests)
 */
const generateFontStyles = (headingFont: string, bodyFont: string, locale: string): string => {
    const styles: string[] = [];

    const headingStyles = getCachedFontStyles(headingFont);
    if (headingStyles) styles.push(headingStyles);

    if (bodyFont !== headingFont) {
        const bodyStyles = getCachedFontStyles(bodyFont);
        if (bodyStyles) styles.push(bodyStyles);
    }

    if (isRtl(locale)) {
        const arabicStyles = getCachedFontStyles('Noto Sans Arabic');
        if (arabicStyles) styles.push(arabicStyles);
    }

    return styles.length > 0 ? `<style>${styles.join('\n')}</style>` : '';
};

/**
 * Get Google Fonts link tag for CJK/Thai locales (loaded via network, not base64)
 */
const getCjkFontLink = (locale: string): string => {
    const config = CJK_FONT_MAP[locale];
    if (!config) return '';
    return `<link href="https://fonts.googleapis.com/css2?family=${config.googleParam}&display=swap" rel="stylesheet">`;
};

/**
 * Get the primary font-family for a locale's body text
 */
const getLocaleFontFamily = (locale: string): string => {
    if (isRtl(locale)) return "'Noto Sans Arabic', 'Inter', sans-serif";
    const config = CJK_FONT_MAP[locale];
    if (config) return `'${config.family}', 'Inter', sans-serif`;
    return "'Inter', sans-serif";
};

export const wrapHtml = (content: string, options: WrapperOptions): string => {
    const { headingFont, bodyFont, locale = 'en', marginStrategy = 'standard' } = options;
    const fontStyles = generateFontStyles(headingFont, bodyFont, locale);
    const cjkFontLink = getCjkFontLink(locale);
    const dir = getDirection(locale);
    const isRtlLocale = isRtl(locale);

    // Margin logic
    let pageMargin = '40px 0 40px 0';
    let firstPageMargin = '0 0 40px 0'; // Default: Top handled by content/padding on P1

    if (marginStrategy === 'sidebar') {
        // Sidebar templates: Use 0 page margin for full bleed. 
        // Text safety is handled by internal Table Spacers (thead/tfoot).
        pageMargin = '0';
        firstPageMargin = '0';
    } else if (marginStrategy === 'full-bleed') {
        // Header templates usually want full control
        pageMargin = '0';
        firstPageMargin = '0';
    }

    return `<!DOCTYPE html>
<html lang="${locale}" dir="${dir}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resume</title>
    ${cjkFontLink}
    ${fontStyles}
    <style>
        /* A4 Page Setup */
        @page {
            size: A4;
            margin: ${pageMargin};
        }

        @page :first {
            margin: ${firstPageMargin};
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        html, body {
            width: 210mm;
            min-height: 297mm;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: ${getLocaleFontFamily(locale)};
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
        }

        /* RTL Support */
        [dir="rtl"] body {
            font-family: 'Noto Sans Arabic', 'Inter', sans-serif;
            text-align: right;
        }

        [dir="rtl"] .text-left { text-align: right; }
        [dir="rtl"] .text-right { text-align: left; }

        /* RTL flex direction reversal for horizontal layouts */
        [dir="rtl"] .flex-row-reverse-rtl { flex-direction: row-reverse; }

        /* RTL sidebar positioning - sidebar moves to right */
        [dir="rtl"] .sidebar-bg-fixed {
            left: auto;
            right: 0;
        }

        [dir="rtl"] .sidebar-accent-stripe {
            left: auto;
            right: 0;
        }

        /* RTL margin/padding adjustments */
        [dir="rtl"] .ml-2 { margin-left: 0; margin-right: 0.5rem; }
        [dir="rtl"] .ml-3 { margin-left: 0; margin-right: 0.75rem; }
        [dir="rtl"] .ml-4 { margin-left: 0; margin-right: 1rem; }
        [dir="rtl"] .mr-2 { margin-right: 0; margin-left: 0.5rem; }
        [dir="rtl"] .mr-3 { margin-right: 0; margin-left: 0.75rem; }
        [dir="rtl"] .mr-4 { margin-right: 0; margin-left: 1rem; }
        [dir="rtl"] .pl-2 { padding-left: 0; padding-right: 0.5rem; }
        [dir="rtl"] .pl-4 { padding-left: 0; padding-right: 1rem; }
        [dir="rtl"] .pr-2 { padding-right: 0; padding-left: 0.5rem; }
        [dir="rtl"] .pr-4 { padding-right: 0; padding-left: 1rem; }

        /* RTL border adjustments */
        [dir="rtl"] .border-l-2 { border-left: none; border-right-width: 2px; border-right-style: solid; }
        [dir="rtl"] .border-r-2 { border-right: none; border-left-width: 2px; border-left-style: solid; }

        /* Resume container */
        .resume-page {
            width: 210mm;
            min-height: 297mm;
            background: white;
            position: relative;
        }

        /* Section break control — individual items stay together, sections can flow across pages.
           The JS pagination script (pdfGeneratorService) handles item-level pushing via margin-top.
           Matching frontend behavior where break-inside:avoid is NOT applied to section wrappers. */
        .resume-entry,
        [data-paginate="item"] {
            page-break-inside: avoid;
            break-inside: avoid;
        }

        /* Utility classes matching Tailwind */
        .flex { display: flex; }
        .flex-1 { flex: 1; }
        .flex-col { flex-direction: column; }
        .flex-wrap { flex-wrap: wrap; }
        .flex-shrink-0 { flex-shrink: 0; }
        .items-center { align-items: center; }
        .items-baseline { align-items: baseline; }
        .justify-center { justify-content: center; }
        .justify-between { justify-content: space-between; }
        .text-center { text-align: center; }
        .font-bold { font-weight: 700; }
        .font-semibold { font-weight: 600; }
        .font-medium { font-weight: 500; }
        .uppercase { text-transform: uppercase; }
        .capitalize { text-transform: capitalize; }
        .break-all { word-break: break-all; }
        .object-cover { object-fit: cover; }
        .relative { position: relative; }
        .absolute { position: absolute; }
        .w-full { width: 100%; }
        .h-full { height: 100%; }

        /* Spacing */
        .gap-1 { gap: 0.25rem; }
        .gap-2 { gap: 0.5rem; }
        .gap-3 { gap: 0.75rem; }
        .gap-4 { gap: 1rem; }
        .mb-1 { margin-bottom: 0.25rem; }
        .mb-2 { margin-bottom: 0.5rem; }
        .mb-3 { margin-bottom: 0.75rem; }
        .mb-4 { margin-bottom: 1rem; }
        .mb-5 { margin-bottom: 1.25rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        .mt-2 { margin-top: 0.5rem; }
        .ml-2 { margin-left: 0.5rem; }
        .pb-4 { padding-bottom: 1rem; }
        .space-y-1 > * + * { margin-top: 0.25rem; }
        .space-y-2 > * + * { margin-top: 0.5rem; }
        .space-y-3 > * + * { margin-top: 0.75rem; }
        .space-y-4 > * + * { margin-top: 1rem; }

        /* Borders */
        .border-b-2 { border-bottom-width: 2px; border-bottom-style: solid; }
        .border-2 { border-width: 2px; border-style: solid; }

        /* Opacity */
        .opacity-70 { opacity: 0.7; }
        .opacity-80 { opacity: 0.8; }
        .opacity-90 { opacity: 0.9; }

        /* Fixed sidebar background - repeats on every printed page */
        .sidebar-bg-fixed {
            position: fixed;
            top: 0;
            left: 0;
            width: 35%;
            height: 297mm; /* A4 height */
            z-index: 0;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
        }

        /* Fixed accent stripe on sidebar edge - repeats on every printed page */
        .sidebar-accent-stripe {
            position: fixed;
            top: 0;
            left: 0;
            width: 8px;
            height: 297mm; /* A4 height */
            z-index: 1;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
        }

        /* Sidebar content wrapper - flows naturally */
        .sidebar-content {
            position: relative;
            z-index: 1;
        }

        /* Main content wrapper */
        .main-content {
            position: relative;
            z-index: 1;
        }
    </style>
</head>
<body>
    <div class="resume-page">
        ${content}
    </div>
</body>
</html>`;
};

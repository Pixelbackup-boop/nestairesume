/**
 * HTML document wrapper for PDF generation on Cloudflare Workers.
 *
 * Ported from backend/src/templates/pdf/shared/htmlWrapper.ts with one change:
 * fonts load via Google Fonts <link> tags instead of the fs-backed base64 cache
 * (Workers has no fs; the Browser Rendering page fetches them over the network
 * and pdfGenerator waits on document.fonts.ready before printing).
 */

export type MarginStrategy = 'sidebar' | 'full-bleed' | 'standard';

export interface PdfTranslations {
  sections?: Record<string, string>;
  labels?: Record<string, string>;
}

interface WrapperOptions {
  headingFont: string;
  bodyFont: string;
  locale?: string;
  marginStrategy?: MarginStrategy;
  watermark?: boolean;
}

const RTL_LOCALES = ['ar', 'he', 'fa', 'ur'];
const CJK_LOCALES = ['ja', 'ko', 'zh', 'th'];

// locale is request-controlled and interpolated into the <html lang> attribute
// and CSS — restrict to a BCP-47-ish shape so it can't break out of the markup.
const SAFE_LOCALE = /^[a-z]{2,3}(-[a-zA-Z0-9]{2,8})?$/;

/** Returns the locale if it is attribute-safe, otherwise 'en'. */
export function sanitizeLocale(locale: string | undefined): string {
  return locale && SAFE_LOCALE.test(locale) ? locale : 'en';
}

// Mirrors backend fontPresets (shared/helpers.ts) — Google Fonts URL params per font
const FONT_GOOGLE_PARAMS: Record<string, string> = {
  Inter: 'Inter:wght@400;500;600;700',
  Roboto: 'Roboto:wght@400;500;700',
  'Open Sans': 'Open+Sans:wght@400;600;700',
  Lato: 'Lato:wght@400;700',
  Poppins: 'Poppins:wght@400;500;600;700',
  Montserrat: 'Montserrat:wght@400;500;600;700',
  'Playfair Display': 'Playfair+Display:wght@400;700',
  Merriweather: 'Merriweather:wght@400;700',
  'Titan One': 'Titan+One',
  Oswald: 'Oswald:wght@400;500;600;700',
  'Roboto Slab': 'Roboto+Slab:wght@400;500;600;700',
  'Roboto Condensed': 'Roboto+Condensed:wght@400;700',
  'Source Sans Pro': 'Source+Sans+3:wght@400;600;700',
};

const CJK_FONT_MAP: Record<string, { family: string; googleParam: string }> = {
  ja: { family: 'Noto Sans JP', googleParam: 'Noto+Sans+JP:wght@400;500;600;700' },
  ko: { family: 'Noto Sans KR', googleParam: 'Noto+Sans+KR:wght@400;500;600;700' },
  zh: { family: 'Noto Sans SC', googleParam: 'Noto+Sans+SC:wght@400;500;600;700' },
  th: { family: 'Noto Sans Thai', googleParam: 'Noto+Sans+Thai:wght@400;500;600;700' },
};

const ARABIC_GOOGLE_PARAM = 'Noto+Sans+Arabic:wght@400;500;600;700';

const isRtl = (locale: string): boolean => RTL_LOCALES.includes(locale);

/** Single Google Fonts <link> covering heading/body fonts + locale script fonts */
const getFontLinks = (headingFont: string, bodyFont: string, locale: string): string => {
  const params = new Set<string>();

  for (const font of [headingFont, bodyFont, 'Inter']) {
    const param = FONT_GOOGLE_PARAMS[font];
    if (param) params.add(param);
  }
  if (isRtl(locale)) params.add(ARABIC_GOOGLE_PARAM);
  const cjk = CJK_FONT_MAP[locale];
  if (cjk) params.add(cjk.googleParam);

  if (params.size === 0) return '';
  const familyParams = [...params].map((p) => `family=${p}`).join('&');
  return `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?${familyParams}&display=swap" rel="stylesheet">`;
};

const getLocaleFontFamily = (locale: string): string => {
  if (isRtl(locale)) return "'Noto Sans Arabic', 'Inter', sans-serif";
  const config = CJK_FONT_MAP[locale];
  if (config) return `'${config.family}', 'Inter', sans-serif`;
  return "'Inter', sans-serif";
};

const getNonLatinTypographyCss = (locale: string): string => {
  const isCjk = CJK_LOCALES.includes(locale);
  const isArabic = RTL_LOCALES.includes(locale);
  if (!isCjk && !isArabic) return '';

  const lineHeight = isCjk ? '1.4' : '1.35';
  return `
        /* Non-Latin Typography Normalization */
        body {
            line-height: ${lineHeight};
            word-break: break-word;
            overflow-wrap: break-word;
        }
        p, li, span, div, td, th {
            line-height: inherit;
        }
    `;
};

// ==================== Default translations ====================
// Ported from backend shared/translations.ts

export const defaultTranslations: PdfTranslations = {
  sections: {
    experience: 'Experience',
    workExperience: 'Work Experience',
    education: 'Education',
    skills: 'Skills',
    languages: 'Languages',
    interests: 'Interests',
    strengths: 'Strengths',
    certifications: 'Certifications',
    awards: 'Awards',
    summary: 'Summary',
    profile: 'Profile',
    contact: 'Contact',
    additionalInfo: 'Additional Information',
    socialLinks: 'Social Links',
    personalDetails: 'Personal Details',
    credentials: 'Credentials',
  },
  labels: {
    present: 'Present',
    nationality: 'Nationality',
    id: 'ID Number',
    passport: 'Passport',
    drivingLicense: 'Driving License',
    native: 'Native',
    fluent: 'Fluent',
    advanced: 'Advanced',
    intermediate: 'Intermediate',
    basic: 'Basic',
    gpa: 'GPA',
    activities: 'Activities',
  },
};

export function getTranslations(translations?: PdfTranslations): PdfTranslations {
  if (!translations) return defaultTranslations;
  return {
    sections: { ...defaultTranslations.sections, ...translations.sections },
    labels: { ...defaultTranslations.labels, ...translations.labels },
  };
}

// ==================== Document wrapper ====================

export const wrapHtml = (content: string, options: WrapperOptions): string => {
  const { headingFont, bodyFont, marginStrategy = 'standard', watermark = false } = options;
  const locale = sanitizeLocale(options.locale);
  const fontLinks = getFontLinks(headingFont, bodyFont, locale);
  const dir = isRtl(locale) ? 'rtl' : 'ltr';

  let pageMargin = '40px 0 40px 0';
  let firstPageMargin = '0 0 40px 0';
  if (marginStrategy === 'sidebar' || marginStrategy === 'full-bleed') {
    pageMargin = '0';
    firstPageMargin = '0';
  }

  return `<!DOCTYPE html>
<html lang="${locale}" dir="${dir}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resume</title>
    ${fontLinks}
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
        [dir="rtl"] .flex-row-reverse-rtl { flex-direction: row-reverse; }
        [dir="rtl"] .sidebar-bg-fixed { left: auto; right: 0; }
        [dir="rtl"] .sidebar-accent-stripe { left: auto; right: 0; }
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
        [dir="rtl"] .border-l-2 { border-left: none; border-right-width: 2px; border-right-style: solid; }
        [dir="rtl"] .border-r-2 { border-right: none; border-left-width: 2px; border-left-style: solid; }

        ${getNonLatinTypographyCss(locale)}

        /* Resume container */
        .resume-page {
            width: 210mm;
            min-height: 297mm;
            background: white;
            position: relative;
        }

        /* Section break control — individual items stay together, sections can flow across pages. */
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

        /* Watermark overlay for free users — repeats on every printed page via position:fixed */
        .watermark-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 210mm;
            height: 297mm;
            display: flex;
            align-items: center;
            justify-content: center;
            pointer-events: none;
            z-index: 9999;
        }
        .watermark-text {
            font-family: 'Inter', Arial, sans-serif;
            font-size: 42px;
            font-weight: 700;
            color: rgba(150, 150, 150, 0.18);
            transform: rotate(-35deg);
            white-space: nowrap;
            letter-spacing: 4px;
            user-select: none;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
        }
    </style>
</head>
<body>
    ${watermark ? '<div class="watermark-overlay"><span class="watermark-text">www.bestairesumes.com</span></div>' : ''}
    <div class="resume-page">
        ${content}
    </div>
</body>
</html>`;
};

/**
 * HTML Wrapper for PDF Generation
 * Wraps template content with proper document structure, fonts, and CSS
 */

import { getGoogleFontUrl } from './helpers';

interface WrapperOptions {
    headingFont: string;
    bodyFont: string;
}

/**
 * Generates Google Fonts link tags for the specified fonts
 */
const generateFontLinks = (headingFont: string, bodyFont: string): string => {
    const fonts = new Set<string>();

    const headingUrl = getGoogleFontUrl(headingFont);
    const bodyUrl = getGoogleFontUrl(bodyFont);

    if (headingUrl) fonts.add(headingUrl);
    if (bodyUrl) fonts.add(bodyUrl);

    return Array.from(fonts)
        .map(url => `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${url}" rel="stylesheet">`)
        .join('\n');
};

/**
 * Wraps template HTML content with a complete HTML document
 */
export const wrapHtml = (content: string, options: WrapperOptions): string => {
    const { headingFont, bodyFont } = options;
    const fontLinks = generateFontLinks(headingFont, bodyFont);

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resume</title>
    ${fontLinks}
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        /* A4 Page Setup */
        @page {
            size: A4;
            margin: 0;
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
            font-family: 'Inter', sans-serif;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
        }

        /* Resume container */
        .resume-page {
            width: 210mm;
            min-height: 297mm;
            background: white;
            position: relative;
        }

        /* Section break control */
        .resume-section {
            page-break-inside: avoid;
            break-inside: avoid;
        }

        .resume-entry {
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

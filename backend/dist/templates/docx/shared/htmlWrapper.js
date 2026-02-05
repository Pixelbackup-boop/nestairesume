"use strict";
/**
 * DOCX-safe HTML Wrapper
 * Wraps template HTML for html-to-docx conversion.
 * No @page CSS, no Google Fonts, no Tailwind CDN — Word uses its own fonts.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapDocxHtml = void 0;
const RTL_LOCALES = ['ar', 'he', 'fa', 'ur'];
const wrapDocxHtml = (content, locale = 'en') => {
    const isRtl = RTL_LOCALES.includes(locale);
    const dir = isRtl ? 'rtl' : 'ltr';
    return `<!DOCTYPE html>
<html lang="${locale}" dir="${dir}">
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: Calibri, Arial, sans-serif;
            font-size: 11pt;
            color: #333333;
            margin: 0;
            padding: 0;
            line-height: 1.4;
        }
        h1 { font-size: 22pt; margin: 0 0 4pt 0; }
        h2 { font-size: 13pt; margin: 16pt 0 6pt 0; }
        h3 { font-size: 11pt; margin: 0; }
        p { margin: 2pt 0; }
        table { border-collapse: collapse; }
        td { vertical-align: top; }
        ul { margin: 2pt 0; padding-left: 18pt; }
        li { margin-bottom: 2pt; }
        hr { border: none; border-top: 1px solid #cccccc; margin: 8pt 0; }
    </style>
</head>
<body>
${content}
</body>
</html>`;
};
exports.wrapDocxHtml = wrapDocxHtml;
//# sourceMappingURL=htmlWrapper.js.map
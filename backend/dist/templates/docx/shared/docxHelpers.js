"use strict";
/**
 * DOCX Template Helpers
 * Word-safe utilities for table-based HTML → DOCX conversion
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DOCX_FONTS = exports.getTranslations = exports.formatLocalizedDate = exports.getLanguageLevel = exports.hexToRgba = exports.getContrastText = exports.formatDescription = exports.escapeHtml = void 0;
exports.formatDateRange = formatDateRange;
exports.buildContactLine = buildContactLine;
exports.buildContactList = buildContactList;
exports.renderProfileImage = renderProfileImage;
exports.renderSkillsList = renderSkillsList;
exports.getLanguageProficiencyText = getLanguageProficiencyText;
exports.wrapDocxHtml = wrapDocxHtml;
const helpers_1 = require("../../pdf/shared/helpers");
Object.defineProperty(exports, "escapeHtml", { enumerable: true, get: function () { return helpers_1.escapeHtml; } });
Object.defineProperty(exports, "formatDescription", { enumerable: true, get: function () { return helpers_1.formatDescription; } });
Object.defineProperty(exports, "getContrastText", { enumerable: true, get: function () { return helpers_1.getContrastText; } });
Object.defineProperty(exports, "hexToRgba", { enumerable: true, get: function () { return helpers_1.hexToRgba; } });
Object.defineProperty(exports, "getLanguageLevel", { enumerable: true, get: function () { return helpers_1.getLanguageLevel; } });
const dateUtils_1 = require("../../pdf/shared/dateUtils");
Object.defineProperty(exports, "formatLocalizedDate", { enumerable: true, get: function () { return dateUtils_1.formatLocalizedDate; } });
const translations_1 = require("../../pdf/shared/translations");
Object.defineProperty(exports, "getTranslations", { enumerable: true, get: function () { return translations_1.getTranslations; } });
// Word-safe font families (must be installed on user's machine)
exports.DOCX_FONTS = {
    heading: "'Calibri', 'Arial', sans-serif",
    body: "'Calibri', 'Arial', sans-serif",
    serif: "'Georgia', 'Times New Roman', serif",
};
/**
 * Format date range for DOCX templates
 */
function formatDateRange(startDate, endDate, current, presentLabel = 'Present', locale = 'en') {
    const start = (0, dateUtils_1.formatLocalizedDate)(startDate, locale);
    const end = current ? presentLabel : (0, dateUtils_1.formatLocalizedDate)(endDate, locale);
    if (!start && !end)
        return '';
    if (!start)
        return end || '';
    if (!end)
        return start;
    return `${start} – ${end}`;
}
/**
 * Build contact info line (text-based, no SVG icons)
 */
function buildContactLine(personalInfo) {
    const parts = [];
    if (personalInfo.email)
        parts.push((0, helpers_1.escapeHtml)(personalInfo.email));
    if (personalInfo.phone)
        parts.push((0, helpers_1.escapeHtml)(personalInfo.phone));
    if (personalInfo.location)
        parts.push((0, helpers_1.escapeHtml)(personalInfo.location));
    if (personalInfo.website)
        parts.push((0, helpers_1.escapeHtml)(personalInfo.website));
    if (personalInfo.linkedin)
        parts.push((0, helpers_1.escapeHtml)(personalInfo.linkedin));
    return parts.join('  |  ');
}
/**
 * Build contact items as vertical list (for sidebar templates)
 */
function buildContactList(personalInfo, color = '#ffffff') {
    const items = [];
    if (personalInfo.email)
        items.push(`<p style="margin:0 0 4px 0;font-size:10px;color:${color};">&#9993; ${(0, helpers_1.escapeHtml)(personalInfo.email)}</p>`);
    if (personalInfo.phone)
        items.push(`<p style="margin:0 0 4px 0;font-size:10px;color:${color};">&#9742; ${(0, helpers_1.escapeHtml)(personalInfo.phone)}</p>`);
    if (personalInfo.location)
        items.push(`<p style="margin:0 0 4px 0;font-size:10px;color:${color};">&#9679; ${(0, helpers_1.escapeHtml)(personalInfo.location)}</p>`);
    if (personalInfo.website)
        items.push(`<p style="margin:0 0 4px 0;font-size:10px;color:${color};">&#9741; ${(0, helpers_1.escapeHtml)(personalInfo.website)}</p>`);
    if (personalInfo.linkedin)
        items.push(`<p style="margin:0 0 4px 0;font-size:10px;color:${color};">in ${(0, helpers_1.escapeHtml)(personalInfo.linkedin)}</p>`);
    return items.join('');
}
/**
 * Render profile image HTML for DOCX (base64 supported by html-to-docx)
 */
function renderProfileImage(profileImage, size = 80, shape = 'circle') {
    if (!profileImage)
        return '';
    const borderRadius = shape === 'circle' ? '50%' : shape === 'rounded' ? '8px' : '0';
    return `<img src="${profileImage}" width="${size}" height="${size}" style="width:${size}px;height:${size}px;border-radius:${borderRadius};object-fit:cover;display:block;" />`;
}
/**
 * Render skills as comma-separated or bullet list
 */
function renderSkillsList(skills, mode = 'inline') {
    if (!skills?.length)
        return '';
    if (mode === 'inline') {
        return skills.map(s => (0, helpers_1.escapeHtml)(s.name)).join(', ');
    }
    return skills.map(s => `<li style="margin:0 0 2px 0;">${(0, helpers_1.escapeHtml)(s.name)}</li>`).join('');
}
/**
 * Render language proficiency as text
 */
function getLanguageProficiencyText(proficiency) {
    const map = {
        native: 'Native',
        fluent: 'Fluent',
        advanced: 'Advanced',
        intermediate: 'Intermediate',
        basic: 'Basic',
    };
    return map[proficiency?.toLowerCase()] || proficiency || '';
}
/**
 * Wrap DOCX template HTML in a minimal document structure
 * No external CSS, no Google Fonts, no Tailwind — inline styles only
 */
function wrapDocxHtml(bodyHtml) {
    return `<!DOCTYPE html>
<html>
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
    table {
        border-collapse: collapse;
    }
    p {
        margin: 0 0 4px 0;
    }
    ul {
        margin: 4px 0;
        padding-left: 20px;
    }
    li {
        margin: 0 0 2px 0;
    }
</style>
</head>
<body>
${bodyHtml}
</body>
</html>`;
}
//# sourceMappingURL=docxHelpers.js.map
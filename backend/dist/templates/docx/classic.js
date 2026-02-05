"use strict";
/**
 * Classic DOCX Template
 * Single-column layout with centered header.
 * Used for classic-professional, classic-pro, minimal-timeline,
 * minimal-labels-tan, minimal-blue-sections, and legacy aliases.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderDocxClassic = void 0;
const helpers_1 = require("../pdf/shared/helpers");
const translations_1 = require("../pdf/shared/translations");
const dateUtils_1 = require("../pdf/shared/dateUtils");
const proficiencyLabel = (level) => {
    if (level >= 90)
        return 'Native';
    if (level >= 75)
        return 'Fluent';
    if (level >= 60)
        return 'Advanced';
    if (level >= 40)
        return 'Intermediate';
    return 'Basic';
};
const skillLabel = (level) => `${level}/5`;
const renderDocxClassic = (data, theme, translations, locale = 'en') => {
    const t = (0, translations_1.getTranslations)(translations);
    const { personalInfo, experience = [], education = [], skills = [], languages = [], interests = [], strengths = [], certifications = [], references = [], } = data;
    const primaryColor = data.customThemeColor || theme.primary;
    // Contact line
    const contactItems = [
        personalInfo.email,
        personalInfo.phone,
        personalInfo.location,
        personalInfo.nationality,
    ].filter(Boolean);
    const idInfo = personalInfo.idType && personalInfo.idNumber
        ? `<p style="font-size: 9pt; color: #666666;">${(0, helpers_1.formatIdType)(personalInfo.idType)}: ${(0, helpers_1.escapeHtml)(personalInfo.idNumber)}</p>`
        : '';
    const sectionHeader = (title) => `<h2 style="color: ${primaryColor}; border-bottom: 1px solid ${primaryColor}; padding-bottom: 2pt; text-transform: uppercase; letter-spacing: 1pt;">${title}</h2>`;
    // Social links
    const socialItems = [];
    if (personalInfo.linkedin)
        socialItems.push(`LinkedIn: ${(0, helpers_1.escapeHtml)(personalInfo.linkedin)}`);
    if (personalInfo.github)
        socialItems.push(`GitHub: ${(0, helpers_1.escapeHtml)(personalInfo.github)}`);
    if (personalInfo.twitter)
        socialItems.push(`Twitter: ${(0, helpers_1.escapeHtml)(personalInfo.twitter)}`);
    if (personalInfo.dribbble)
        socialItems.push(`Dribbble: ${(0, helpers_1.escapeHtml)(personalInfo.dribbble)}`);
    if (personalInfo.behance)
        socialItems.push(`Behance: ${(0, helpers_1.escapeHtml)(personalInfo.behance)}`);
    if (personalInfo.instagram)
        socialItems.push(`Instagram: ${(0, helpers_1.escapeHtml)(personalInfo.instagram)}`);
    return `
<div style="padding: 0;">
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 12pt; padding-bottom: 8pt; border-bottom: 2px solid ${primaryColor};">
        <h1 style="color: ${primaryColor};">${(0, helpers_1.escapeHtml)(personalInfo.fullName || 'Your Name')}</h1>
        <p style="font-size: 13pt; color: #555555; margin-bottom: 4pt;">${(0, helpers_1.escapeHtml)(personalInfo.jobTitle || '')}</p>
        <p style="font-size: 10pt; color: #666666;">${contactItems.map(i => (0, helpers_1.escapeHtml)(i)).join(' | ')}</p>
        ${personalInfo.website ? `<p style="font-size: 10pt; color: #666666;">${(0, helpers_1.escapeHtml)(personalInfo.website)}</p>` : ''}
        ${idInfo}
    </div>

    ${personalInfo.summary ? `
    ${sectionHeader(t.sections.summary)}
    <p>${(0, helpers_1.formatDescription)(personalInfo.summary)}</p>
    ` : ''}

    ${experience.length > 0 ? `
    ${sectionHeader(t.sections.experience)}
    ${experience.map(exp => `
    <table style="width: 100%; margin-bottom: 8pt;">
        <tr>
            <td style="width: 75%;"><strong>${(0, helpers_1.escapeHtml)(exp.title)}</strong></td>
            <td style="width: 25%; text-align: right; font-size: 10pt; color: #666666;">
                ${(0, dateUtils_1.formatLocalizedDate)(exp.startDate, locale)} – ${exp.current ? t.labels.present : (0, dateUtils_1.formatLocalizedDate)(exp.endDate, locale)}
            </td>
        </tr>
        <tr>
            <td colspan="2" style="font-size: 10pt; color: #555555;">
                ${(0, helpers_1.escapeHtml)(exp.company)}${(exp.city || exp.country) ? `, ${[exp.city, exp.country].filter(Boolean).map(s => (0, helpers_1.escapeHtml)(s)).join(', ')}` : ''}
            </td>
        </tr>
    </table>
    ${exp.description ? `<p style="font-size: 10pt; margin-bottom: 8pt;">${(0, helpers_1.formatDescription)(exp.description)}</p>` : ''}
    `).join('')}
    ` : ''}

    ${education.length > 0 ? `
    ${sectionHeader(t.sections.education)}
    ${education.map(edu => `
    <table style="width: 100%; margin-bottom: 6pt;">
        <tr>
            <td style="width: 75%;"><strong>${(0, helpers_1.escapeHtml)(edu.school)}</strong></td>
            <td style="width: 25%; text-align: right; font-size: 10pt; color: #666666;">
                ${(0, dateUtils_1.formatLocalizedDate)(edu.startDate, locale)} – ${edu.current ? t.labels.present : (0, dateUtils_1.formatLocalizedDate)(edu.endDate, locale)}
            </td>
        </tr>
        <tr>
            <td colspan="2" style="font-size: 10pt; color: #555555;">
                ${(0, helpers_1.escapeHtml)(edu.degree)}${edu.gpa ? ` | GPA: ${(0, helpers_1.escapeHtml)(edu.gpa)}` : ''}
            </td>
        </tr>
    </table>
    ${edu.honors ? `<p style="font-size: 9pt; color: #666666;">${(0, helpers_1.escapeHtml)(edu.honors)}</p>` : ''}
    `).join('')}
    ` : ''}

    ${skills.length > 0 ? `
    ${sectionHeader(t.sections.skills)}
    <table style="width: 100%;">
        ${skills.map(skill => `
        <tr>
            <td style="width: 50%; padding: 2pt 0;">${(0, helpers_1.escapeHtml)(skill.name)}</td>
            <td style="width: 50%; padding: 2pt 0; color: #666666;">${skillLabel(skill.level || 3)}</td>
        </tr>
        `).join('')}
    </table>
    ` : ''}

    ${languages.length > 0 ? `
    ${sectionHeader(t.sections.languages)}
    <table style="width: 100%;">
        ${languages.map(lang => `
        <tr>
            <td style="width: 50%; padding: 2pt 0;">${(0, helpers_1.escapeHtml)(lang.name)}</td>
            <td style="width: 50%; padding: 2pt 0; color: #666666; text-transform: capitalize;">${(0, helpers_1.escapeHtml)(lang.proficiency) || proficiencyLabel((0, helpers_1.getLanguageLevel)(lang))}</td>
        </tr>
        `).join('')}
    </table>
    ` : ''}

    ${strengths.length > 0 ? `
    ${sectionHeader(t.sections.strengths)}
    <p>${strengths.map(s => (0, helpers_1.escapeHtml)(s.name)).join(' | ')}</p>
    ` : ''}

    ${certifications.length > 0 ? `
    ${sectionHeader(t.sections.certifications)}
    ${certifications.map(cert => `
    <p><strong>${(0, helpers_1.escapeHtml)(cert.name)}</strong> — ${(0, helpers_1.escapeHtml)(cert.issuer)}, ${(0, dateUtils_1.formatLocalizedDate)(cert.date, locale)}</p>
    `).join('')}
    ` : ''}

    ${interests.length > 0 ? `
    ${sectionHeader(t.sections.interests)}
    <p>${interests.map(i => (0, helpers_1.escapeHtml)(i.name)).join(' | ')}</p>
    ` : ''}

    ${socialItems.length > 0 ? `
    ${sectionHeader(t.sections.socialLinks)}
    <p style="font-size: 10pt;">${socialItems.join(' | ')}</p>
    ` : ''}

    ${references.length > 0 ? `
    ${sectionHeader(t.sections.references)}
    ${references.map(ref => `
    <p>
        <strong>${(0, helpers_1.escapeHtml)(ref.name)}</strong> — ${(0, helpers_1.escapeHtml)(ref.title)}${ref.company ? `, ${(0, helpers_1.escapeHtml)(ref.company)}` : ''}
        ${(ref.phone || ref.email) ? `<br/><span style="font-size: 9pt; color: #666666;">${[ref.phone, ref.email].filter(Boolean).map(s => (0, helpers_1.escapeHtml)(s)).join(' | ')}</span>` : ''}
    </p>
    `).join('')}
    ` : ''}

    ${personalInfo.customField ? `
    ${sectionHeader((0, helpers_1.escapeHtml)(personalInfo.customFieldLabel || t.sections.additionalInfo))}
    <p>${(0, helpers_1.formatDescription)(personalInfo.customField)}</p>
    ` : ''}
</div>`;
};
exports.renderDocxClassic = renderDocxClassic;
//# sourceMappingURL=classic.js.map
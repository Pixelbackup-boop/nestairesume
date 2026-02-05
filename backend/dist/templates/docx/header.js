"use strict";
/**
 * Header DOCX Template
 * Full-width dark header band with name/contact, then single-column body.
 * Used for all header-* templates (header-dark, header-dark-banner, etc.).
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderDocxHeader = void 0;
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
const renderDocxHeader = (data, theme, translations, locale = 'en') => {
    const t = (0, translations_1.getTranslations)(translations);
    const { personalInfo, experience = [], education = [], skills = [], languages = [], interests = [], strengths = [], certifications = [], references = [], } = data;
    const { primary: headerBg, secondary: accentColor } = (0, helpers_1.parseDualColor)(data.customThemeColor, { primary: theme.primary || '#0f172a', secondary: theme.accent || '#facc15' });
    const headerText = (0, helpers_1.getContrastText)(headerBg);
    const headerMuted = headerText === '#f8fafc' ? '#94a3b8' : '#64748b';
    const mainText = '#334155';
    const primaryColor = data.customThemeColor || theme.primary;
    const sectionHeader = (title) => `<h2 style="color: ${primaryColor}; border-bottom: 2px solid ${accentColor}; padding-bottom: 2pt; text-transform: uppercase; letter-spacing: 1pt;">${title}</h2>`;
    // Contact items for header row
    const contactItems = [
        personalInfo.email ? `Email: ${(0, helpers_1.escapeHtml)(personalInfo.email)}` : '',
        personalInfo.phone ? `Phone: ${(0, helpers_1.escapeHtml)(personalInfo.phone)}` : '',
        personalInfo.location ? `Location: ${(0, helpers_1.escapeHtml)(personalInfo.location)}` : '',
        personalInfo.website ? `Web: ${(0, helpers_1.escapeHtml)(personalInfo.website)}` : '',
    ].filter(Boolean);
    const idInfo = personalInfo.idType && personalInfo.idNumber
        ? `<p style="font-size: 9pt; color: ${headerMuted};">${(0, helpers_1.formatIdType)(personalInfo.idType)}: ${(0, helpers_1.escapeHtml)(personalInfo.idNumber)}</p>`
        : '';
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
<!-- Header Band -->
<table style="width: 100%; background-color: ${headerBg};" cellpadding="0" cellspacing="0">
    <tr>
        <td style="padding: 24pt 20pt;">
            <h1 style="color: ${headerText}; font-size: 22pt; margin-bottom: 2pt;">${(0, helpers_1.escapeHtml)(personalInfo.fullName || 'Your Name')}</h1>
            <p style="color: ${accentColor}; font-size: 13pt; margin-bottom: 8pt;">${(0, helpers_1.escapeHtml)(personalInfo.jobTitle || '')}</p>
            <p style="font-size: 9pt; color: ${headerMuted};">${contactItems.join(' | ')}</p>
            ${personalInfo.nationality ? `<p style="font-size: 9pt; color: ${headerMuted};">Nationality: ${(0, helpers_1.escapeHtml)(personalInfo.nationality)}</p>` : ''}
            ${idInfo}
        </td>
    </tr>
</table>

<!-- Body -->
<div style="padding: 16pt 20pt;">

    ${personalInfo.summary ? `
    ${sectionHeader(t.sections.summary)}
    <p style="color: ${mainText};">${(0, helpers_1.formatDescription)(personalInfo.summary)}</p>
    ` : ''}

    ${experience.length > 0 ? `
    ${sectionHeader(t.sections.experience)}
    ${experience.map(exp => `
    <table style="width: 100%; margin-bottom: 8pt;">
        <tr>
            <td style="width: 70%;"><strong>${(0, helpers_1.escapeHtml)(exp.title)}</strong></td>
            <td style="width: 30%; text-align: right; font-size: 9pt; color: #888888;">
                ${(0, dateUtils_1.formatLocalizedDate)(exp.startDate, locale)} – ${exp.current ? t.labels.present : (0, dateUtils_1.formatLocalizedDate)(exp.endDate, locale)}
            </td>
        </tr>
        <tr>
            <td colspan="2" style="font-size: 10pt; color: #555555;">
                ${(0, helpers_1.escapeHtml)(exp.company)}${(exp.city || exp.country) ? `, ${[exp.city, exp.country].filter(Boolean).map(s => (0, helpers_1.escapeHtml)(s)).join(', ')}` : ''}
            </td>
        </tr>
    </table>
    ${exp.description ? `<p style="font-size: 10pt; color: ${mainText}; margin-bottom: 8pt;">${(0, helpers_1.formatDescription)(exp.description)}</p>` : ''}
    `).join('')}
    ` : ''}

    ${education.length > 0 ? `
    ${sectionHeader(t.sections.education)}
    ${education.map(edu => `
    <table style="width: 100%; margin-bottom: 6pt;">
        <tr>
            <td style="width: 70%;"><strong>${(0, helpers_1.escapeHtml)(edu.school)}</strong></td>
            <td style="width: 30%; text-align: right; font-size: 9pt; color: #888888;">
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

    <!-- Two-column section: Skills + Languages side by side -->
    ${(skills.length > 0 || languages.length > 0) ? `
    <table style="width: 100%;" cellpadding="0" cellspacing="0">
        <tr>
            ${skills.length > 0 ? `
            <td style="width: ${languages.length > 0 ? '50%' : '100%'}; vertical-align: top; padding-right: 12pt;">
                ${sectionHeader(t.sections.skills)}
                <table style="width: 100%;">
                    ${skills.map(skill => `
                    <tr>
                        <td style="padding: 1pt 0;">${(0, helpers_1.escapeHtml)(skill.name)}</td>
                        <td style="padding: 1pt 0; color: #666666; text-align: right;">${skill.level || 3}/5</td>
                    </tr>
                    `).join('')}
                </table>
            </td>` : ''}
            ${languages.length > 0 ? `
            <td style="width: ${skills.length > 0 ? '50%' : '100%'}; vertical-align: top;">
                ${sectionHeader(t.sections.languages)}
                <table style="width: 100%;">
                    ${languages.map(lang => `
                    <tr>
                        <td style="padding: 1pt 0;">${(0, helpers_1.escapeHtml)(lang.name)}</td>
                        <td style="padding: 1pt 0; color: #666666; text-align: right; text-transform: capitalize;">
                            ${(0, helpers_1.escapeHtml)(lang.proficiency) || proficiencyLabel((0, helpers_1.getLanguageLevel)(lang))}
                        </td>
                    </tr>
                    `).join('')}
                </table>
            </td>` : ''}
        </tr>
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
exports.renderDocxHeader = renderDocxHeader;
//# sourceMappingURL=header.js.map
"use strict";
/**
 * Sidebar DOCX Template
 * Two-column table layout: 35% left sidebar (dark bg) + 65% right main.
 * Used for sidebar-dark-navy, sidebar-narrow-yellow, sidebar-monogram.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderDocxSidebar = void 0;
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
const renderDocxSidebar = (data, theme, translations, locale = 'en') => {
    const t = (0, translations_1.getTranslations)(translations);
    const { personalInfo, experience = [], education = [], skills = [], languages = [], interests = [], strengths = [], certifications = [], references = [], } = data;
    const sidebarBg = data.customThemeColor || theme.primary || '#0f172a';
    const accentColor = theme.accent || '#3b82f6';
    const sidebarText = (0, helpers_1.getContrastText)(sidebarBg);
    const sidebarMuted = sidebarText === '#f8fafc' ? '#94a3b8' : '#64748b';
    const mainText = '#334155';
    const primaryColor = data.customThemeColor || theme.primary;
    const sidebarHeader = (title) => `<h2 style="color: ${accentColor}; border-bottom: 1px solid ${accentColor}; padding-bottom: 2pt; text-transform: uppercase; letter-spacing: 1pt; font-size: 12pt;">${title}</h2>`;
    const mainHeader = (title) => `<h2 style="color: ${primaryColor}; border-bottom: 2px solid ${primaryColor}; padding-bottom: 2pt; text-transform: uppercase; letter-spacing: 1pt;">${title}</h2>`;
    // Build sidebar content
    const sidebarSections = [];
    // Contact
    const contactItems = [];
    if (personalInfo.phone)
        contactItems.push(`Phone: ${(0, helpers_1.escapeHtml)(personalInfo.phone)}`);
    if (personalInfo.email)
        contactItems.push(`Email: ${(0, helpers_1.escapeHtml)(personalInfo.email)}`);
    if (personalInfo.location)
        contactItems.push(`Location: ${(0, helpers_1.escapeHtml)(personalInfo.location)}`);
    if (personalInfo.website)
        contactItems.push(`Website: ${(0, helpers_1.escapeHtml)(personalInfo.website)}`);
    if (personalInfo.nationality)
        contactItems.push(`Nationality: ${(0, helpers_1.escapeHtml)(personalInfo.nationality)}`);
    if (contactItems.length > 0) {
        sidebarSections.push(`
            ${sidebarHeader(t.sections.contact)}
            ${contactItems.map(item => `<p style="font-size: 9pt; color: ${sidebarMuted}; margin-bottom: 4pt;">${item}</p>`).join('')}
        `);
    }
    // ID info
    if (personalInfo.idType && personalInfo.idNumber) {
        sidebarSections.push(`
            <p style="font-size: 9pt; color: ${sidebarMuted};">${(0, helpers_1.formatIdType)(personalInfo.idType)}: ${(0, helpers_1.escapeHtml)(personalInfo.idNumber)}</p>
        `);
    }
    // Skills
    if (skills.length > 0) {
        sidebarSections.push(`
            ${sidebarHeader(t.sections.skills)}
            ${skills.map(skill => `
                <p style="font-size: 9pt; color: ${sidebarText}; margin-bottom: 2pt;">
                    ${(0, helpers_1.escapeHtml)(skill.name)} <span style="color: ${sidebarMuted};">(${skill.level || 3}/5)</span>
                </p>
            `).join('')}
        `);
    }
    // Languages
    if (languages.length > 0) {
        sidebarSections.push(`
            ${sidebarHeader(t.sections.languages)}
            ${languages.map(lang => `
                <p style="font-size: 9pt; color: ${sidebarText}; margin-bottom: 2pt;">
                    ${(0, helpers_1.escapeHtml)(lang.name)} — <span style="color: ${sidebarMuted}; text-transform: capitalize;">${(0, helpers_1.escapeHtml)(lang.proficiency) || proficiencyLabel((0, helpers_1.getLanguageLevel)(lang))}</span>
                </p>
            `).join('')}
        `);
    }
    // Strengths
    if (strengths.length > 0) {
        sidebarSections.push(`
            ${sidebarHeader(t.sections.strengths)}
            ${strengths.map(s => `<p style="font-size: 9pt; color: ${sidebarText}; margin-bottom: 2pt;">${(0, helpers_1.escapeHtml)(s.name)}</p>`).join('')}
        `);
    }
    // Interests
    if (interests.length > 0) {
        sidebarSections.push(`
            ${sidebarHeader(t.sections.interests)}
            <p style="font-size: 9pt; color: ${sidebarText};">${interests.map(i => (0, helpers_1.escapeHtml)(i.name)).join(', ')}</p>
        `);
    }
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
    if (socialItems.length > 0) {
        sidebarSections.push(`
            ${sidebarHeader(t.sections.socialLinks)}
            ${socialItems.map(item => `<p style="font-size: 9pt; color: ${sidebarMuted}; margin-bottom: 2pt;">${item}</p>`).join('')}
        `);
    }
    // Build main content
    const mainSections = [];
    // Summary
    if (personalInfo.summary) {
        mainSections.push(`
            ${mainHeader(t.sections.summary)}
            <p style="color: ${mainText};">${(0, helpers_1.formatDescription)(personalInfo.summary)}</p>
        `);
    }
    // Experience
    if (experience.length > 0) {
        mainSections.push(`
            ${mainHeader(t.sections.experience)}
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
        `);
    }
    // Education
    if (education.length > 0) {
        mainSections.push(`
            ${mainHeader(t.sections.education)}
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
        `);
    }
    // Certifications
    if (certifications.length > 0) {
        mainSections.push(`
            ${mainHeader(t.sections.certifications)}
            ${certifications.map(cert => `
            <p><strong>${(0, helpers_1.escapeHtml)(cert.name)}</strong> — ${(0, helpers_1.escapeHtml)(cert.issuer)}, ${(0, dateUtils_1.formatLocalizedDate)(cert.date, locale)}</p>
            `).join('')}
        `);
    }
    // References
    if (references.length > 0) {
        mainSections.push(`
            ${mainHeader(t.sections.references)}
            ${references.map(ref => `
            <p>
                <strong>${(0, helpers_1.escapeHtml)(ref.name)}</strong> — ${(0, helpers_1.escapeHtml)(ref.title)}${ref.company ? `, ${(0, helpers_1.escapeHtml)(ref.company)}` : ''}
                ${(ref.phone || ref.email) ? `<br/><span style="font-size: 9pt; color: #666666;">${[ref.phone, ref.email].filter(Boolean).map(s => (0, helpers_1.escapeHtml)(s)).join(' | ')}</span>` : ''}
            </p>
            `).join('')}
        `);
    }
    // Custom field
    if (personalInfo.customField) {
        mainSections.push(`
            ${mainHeader((0, helpers_1.escapeHtml)(personalInfo.customFieldLabel || t.sections.additionalInfo))}
            <p>${(0, helpers_1.formatDescription)(personalInfo.customField)}</p>
        `);
    }
    return `
<table style="width: 100%;" cellpadding="0" cellspacing="0">
    <tr>
        <!-- Sidebar -->
        <td style="width: 35%; background-color: ${sidebarBg}; padding: 20pt 16pt; vertical-align: top;">
            <!-- Name & Title -->
            <h1 style="color: ${sidebarText}; font-size: 18pt; margin-bottom: 2pt;">${(0, helpers_1.escapeHtml)(personalInfo.fullName || 'Your Name')}</h1>
            <p style="color: ${accentColor}; font-size: 11pt; margin-bottom: 12pt;">${(0, helpers_1.escapeHtml)(personalInfo.jobTitle || '')}</p>

            ${sidebarSections.join('')}
        </td>

        <!-- Main Content -->
        <td style="width: 65%; padding: 20pt 20pt 20pt 24pt; vertical-align: top;">
            ${mainSections.join('')}
        </td>
    </tr>
</table>`;
};
exports.renderDocxSidebar = renderDocxSidebar;
//# sourceMappingURL=sidebar.js.map
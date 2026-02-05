"use strict";
/**
 * Google Docs Compact Template
 * Dense layout, teal accent, maximizes content per page
 * Two-column sidebar design optimized for Google Docs import
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderGdocsCompact = renderGdocsCompact;
const docxHelpers_1 = require("../docx/shared/docxHelpers");
const FONT = "'Arial', sans-serif";
function renderGdocsCompact(data, theme, translations, locale) {
    const t = (0, docxHelpers_1.getTranslations)(translations);
    const pi = data.personalInfo;
    const primary = theme.primary || '#0d7377';
    const sidebarBg = '#f0fafa';
    const sidebarText = '#1a3a3a';
    let sidebar = '';
    let main = '';
    // === SIDEBAR (left column — light teal background) ===
    // Profile image
    if (pi.profileImage) {
        sidebar += `<div style="text-align:center;margin-bottom:10px;">`;
        sidebar += (0, docxHelpers_1.renderProfileImage)(pi.profileImage, 70, pi.imageShape || 'circle');
        sidebar += `</div>`;
    }
    // Name in sidebar
    sidebar += `<p style="margin:0 0 2px 0;font-size:13pt;font-weight:bold;color:${primary};text-align:center;font-family:${FONT};">${(0, docxHelpers_1.escapeHtml)(pi.fullName)}</p>`;
    if (pi.jobTitle) {
        sidebar += `<p style="margin:0 0 10px 0;font-size:8pt;color:#666666;text-align:center;font-family:${FONT};">${(0, docxHelpers_1.escapeHtml)(pi.jobTitle)}</p>`;
    }
    // Contact
    sidebar += sidebarSectionHeader(t.sections.contact, primary);
    if (pi.email)
        sidebar += `<p style="margin:0 0 3px 0;font-size:8pt;color:${sidebarText};font-family:${FONT};">&#9993; ${(0, docxHelpers_1.escapeHtml)(pi.email)}</p>`;
    if (pi.phone)
        sidebar += `<p style="margin:0 0 3px 0;font-size:8pt;color:${sidebarText};font-family:${FONT};">&#9742; ${(0, docxHelpers_1.escapeHtml)(pi.phone)}</p>`;
    if (pi.location)
        sidebar += `<p style="margin:0 0 3px 0;font-size:8pt;color:${sidebarText};font-family:${FONT};">&#9679; ${(0, docxHelpers_1.escapeHtml)(pi.location)}</p>`;
    if (pi.website)
        sidebar += `<p style="margin:0 0 3px 0;font-size:8pt;color:${sidebarText};font-family:${FONT};">&#9741; ${(0, docxHelpers_1.escapeHtml)(pi.website)}</p>`;
    if (pi.linkedin)
        sidebar += `<p style="margin:0 0 3px 0;font-size:8pt;color:${sidebarText};font-family:${FONT};">in ${(0, docxHelpers_1.escapeHtml)(pi.linkedin)}</p>`;
    sidebar += `<br />`;
    // Skills in sidebar
    if (data.skills?.length) {
        sidebar += sidebarSectionHeader(t.sections.skills, primary);
        sidebar += `<ul style="margin:0 0 6px 0;padding-left:14px;">`;
        for (const skill of data.skills) {
            sidebar += `<li style="margin:0 0 1px 0;font-size:8pt;color:${sidebarText};font-family:${FONT};">${(0, docxHelpers_1.escapeHtml)(skill.name)}</li>`;
        }
        sidebar += `</ul>`;
    }
    // Languages in sidebar
    if (data.languages?.length) {
        sidebar += sidebarSectionHeader(t.sections.languages, primary);
        for (const lang of data.languages) {
            sidebar += `<p style="margin:0 0 2px 0;font-size:8pt;color:${sidebarText};font-family:${FONT};">${(0, docxHelpers_1.escapeHtml)(lang.name)} — ${(0, docxHelpers_1.getLanguageProficiencyText)(lang.proficiency)}</p>`;
        }
        sidebar += `<br />`;
    }
    // Interests in sidebar
    if (data.interests?.length) {
        sidebar += sidebarSectionHeader(t.sections.interests, primary);
        for (const interest of data.interests) {
            sidebar += `<p style="margin:0 0 1px 0;font-size:8pt;color:${sidebarText};font-family:${FONT};">&#8226; ${(0, docxHelpers_1.escapeHtml)(interest.name)}</p>`;
        }
    }
    // === MAIN CONTENT (right column) ===
    // Summary
    if (pi.summary) {
        main += mainSectionHeader(t.sections.summary, primary);
        main += `<p style="font-size:9pt;color:#444444;margin:0 0 10px 0;font-family:${FONT};line-height:1.5;">${(0, docxHelpers_1.formatDescription)(pi.summary)}</p>`;
    }
    // Experience
    if (data.experience?.length) {
        main += mainSectionHeader(t.sections.workExperience, primary);
        for (const exp of data.experience) {
            main += `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">`;
            main += `<tr>`;
            main += `<td style="vertical-align:top;">`;
            main += `<p style="margin:0;font-size:10pt;font-weight:bold;color:#222222;font-family:${FONT};">${(0, docxHelpers_1.escapeHtml)(exp.title)}</p>`;
            main += `<p style="margin:0 0 2px 0;font-size:9pt;color:${primary};font-family:${FONT};">${(0, docxHelpers_1.escapeHtml)(exp.company)}${exp.city ? ', ' + (0, docxHelpers_1.escapeHtml)(exp.city) : ''}</p>`;
            main += `</td>`;
            main += `<td style="vertical-align:top;text-align:right;white-space:nowrap;width:120px;">`;
            main += `<p style="margin:0;font-size:8pt;color:#999999;font-family:${FONT};">${(0, docxHelpers_1.formatDateRange)(exp.startDate, exp.endDate, exp.current, t.labels.present, locale)}</p>`;
            main += `</td>`;
            main += `</tr></table>`;
            if (exp.description) {
                main += `<p style="font-size:9pt;color:#444444;margin:0 0 6px 0;font-family:${FONT};">${(0, docxHelpers_1.formatDescription)(exp.description)}</p>`;
            }
        }
    }
    // Education
    if (data.education?.length) {
        main += mainSectionHeader(t.sections.education, primary);
        for (const edu of data.education) {
            main += `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:6px;">`;
            main += `<tr>`;
            main += `<td style="vertical-align:top;">`;
            main += `<p style="margin:0;font-size:10pt;font-weight:bold;color:#222222;font-family:${FONT};">${(0, docxHelpers_1.escapeHtml)(edu.school)}</p>`;
            main += `<p style="margin:0;font-size:9pt;color:#555555;font-family:${FONT};">${(0, docxHelpers_1.escapeHtml)(edu.degree)}</p>`;
            main += `</td>`;
            main += `<td style="vertical-align:top;text-align:right;white-space:nowrap;width:120px;">`;
            main += `<p style="margin:0;font-size:8pt;color:#999999;font-family:${FONT};">${(0, docxHelpers_1.formatDateRange)(edu.startDate, edu.endDate, edu.current, t.labels.present, locale)}</p>`;
            main += `</td>`;
            main += `</tr></table>`;
            if (edu.description) {
                main += `<p style="font-size:9pt;color:#444444;margin:0 0 5px 0;font-family:${FONT};">${(0, docxHelpers_1.formatDescription)(edu.description)}</p>`;
            }
        }
    }
    // Certifications
    if (data.certifications?.length) {
        main += mainSectionHeader(t.sections.certifications, primary);
        for (const cert of data.certifications) {
            main += `<p style="margin:0 0 3px 0;font-size:9pt;font-family:${FONT};"><strong>${(0, docxHelpers_1.escapeHtml)(cert.name)}</strong> — ${(0, docxHelpers_1.escapeHtml)(cert.issuer)}${cert.date ? ', ' + (0, docxHelpers_1.escapeHtml)(cert.date) : ''}</p>`;
        }
        main += `<br />`;
    }
    // Awards
    if (data.awards?.length) {
        main += mainSectionHeader(t.sections.awards, primary);
        for (const award of data.awards) {
            main += `<p style="margin:0 0 3px 0;font-size:9pt;font-family:${FONT};"><strong>${(0, docxHelpers_1.escapeHtml)(award.title)}</strong> — ${(0, docxHelpers_1.escapeHtml)(award.issuer)}${award.date ? ', ' + (0, docxHelpers_1.escapeHtml)(award.date) : ''}</p>`;
        }
    }
    // === Assemble two-column layout ===
    return `
<table width="100%" cellpadding="0" cellspacing="0" style="min-height:800px;">
<tr>
    <td width="30%" style="vertical-align:top;background-color:${sidebarBg};padding:16px 12px;color:${sidebarText};">
        ${sidebar}
    </td>
    <td width="70%" style="vertical-align:top;padding:16px 16px;">
        ${main}
    </td>
</tr>
</table>`;
}
function sidebarSectionHeader(title, color) {
    return `<p style="margin:6px 0 4px 0;font-size:9pt;font-weight:bold;color:${color};text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid ${color};padding-bottom:2px;font-family:'Arial',sans-serif;">${title}</p>`;
}
function mainSectionHeader(title, color) {
    return `<p style="margin:8px 0 5px 0;font-size:11pt;font-weight:bold;color:${color};border-bottom:1px solid ${color};padding-bottom:2px;text-transform:uppercase;letter-spacing:1px;font-family:'Arial',sans-serif;">${title}</p>`;
}
//# sourceMappingURL=gdocs-compact.js.map
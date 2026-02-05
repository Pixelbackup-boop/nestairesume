"use strict";
/**
 * DOCX Sidebar Template
 * Two-column table: left sidebar (dark bg, photo, contact, skills) + right main content
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderDocxSidebar = renderDocxSidebar;
const docxHelpers_1 = require("./shared/docxHelpers");
function renderDocxSidebar(data, theme, translations, locale) {
    const t = (0, docxHelpers_1.getTranslations)(translations);
    const pi = data.personalInfo;
    const primary = theme.primary || '#1e3a8a';
    const sidebarText = (0, docxHelpers_1.getContrastText)(primary);
    let sidebar = '';
    let main = '';
    // === SIDEBAR (left column) ===
    // Profile image
    if (pi.profileImage) {
        sidebar += `<div style="text-align:center;margin-bottom:12px;">`;
        sidebar += (0, docxHelpers_1.renderProfileImage)(pi.profileImage, 90, pi.imageShape || 'circle');
        sidebar += `</div>`;
    }
    // Name in sidebar
    sidebar += `<p style="margin:0 0 2px 0;font-size:14pt;font-weight:bold;color:${sidebarText};text-align:center;">${(0, docxHelpers_1.escapeHtml)(pi.fullName)}</p>`;
    if (pi.jobTitle) {
        sidebar += `<p style="margin:0 0 12px 0;font-size:9pt;color:${sidebarText};opacity:0.85;text-align:center;">${(0, docxHelpers_1.escapeHtml)(pi.jobTitle)}</p>`;
    }
    // Contact section
    sidebar += sidebarSectionHeader(t.sections.contact, sidebarText);
    sidebar += (0, docxHelpers_1.buildContactList)(pi, sidebarText);
    sidebar += `<br />`;
    // Skills in sidebar
    if (data.skills?.length) {
        sidebar += sidebarSectionHeader(t.sections.skills, sidebarText);
        sidebar += `<ul style="margin:0 0 8px 0;padding-left:16px;">`;
        for (const skill of data.skills) {
            sidebar += `<li style="margin:0 0 2px 0;font-size:9pt;color:${sidebarText};">${(0, docxHelpers_1.escapeHtml)(skill.name)}</li>`;
        }
        sidebar += `</ul>`;
    }
    // Languages in sidebar
    if (data.languages?.length) {
        sidebar += sidebarSectionHeader(t.sections.languages, sidebarText);
        for (const lang of data.languages) {
            sidebar += `<p style="margin:0 0 3px 0;font-size:9pt;color:${sidebarText};">${(0, docxHelpers_1.escapeHtml)(lang.name)} — ${(0, docxHelpers_1.getLanguageProficiencyText)(lang.proficiency)}</p>`;
        }
        sidebar += `<br />`;
    }
    // Interests in sidebar
    if (data.interests?.length) {
        sidebar += sidebarSectionHeader(t.sections.interests, sidebarText);
        for (const interest of data.interests) {
            sidebar += `<p style="margin:0 0 2px 0;font-size:9pt;color:${sidebarText};">&#8226; ${(0, docxHelpers_1.escapeHtml)(interest.name)}</p>`;
        }
    }
    // === MAIN CONTENT (right column) ===
    // Summary
    if (pi.summary) {
        main += mainSectionHeader(t.sections.summary, primary);
        main += `<p style="font-size:10pt;color:#444444;margin:0 0 12px 0;">${(0, docxHelpers_1.formatDescription)(pi.summary)}</p>`;
    }
    // Experience
    if (data.experience?.length) {
        main += mainSectionHeader(t.sections.workExperience, primary);
        for (const exp of data.experience) {
            main += `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">`;
            main += `<tr>`;
            main += `<td style="vertical-align:top;">`;
            main += `<p style="margin:0;font-size:11pt;font-weight:bold;color:#222222;">${(0, docxHelpers_1.escapeHtml)(exp.title)}</p>`;
            main += `<p style="margin:0 0 3px 0;font-size:9pt;color:${primary};">${(0, docxHelpers_1.escapeHtml)(exp.company)}${exp.city ? ', ' + (0, docxHelpers_1.escapeHtml)(exp.city) : ''}</p>`;
            main += `</td>`;
            main += `<td style="vertical-align:top;text-align:right;white-space:nowrap;width:120px;">`;
            main += `<p style="margin:0;font-size:8pt;color:#888888;">${(0, docxHelpers_1.formatDateRange)(exp.startDate, exp.endDate, exp.current, t.labels.present, locale)}</p>`;
            main += `</td>`;
            main += `</tr></table>`;
            if (exp.description) {
                main += `<p style="font-size:9pt;color:#444444;margin:0 0 8px 0;">${(0, docxHelpers_1.formatDescription)(exp.description)}</p>`;
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
            main += `<p style="margin:0;font-size:11pt;font-weight:bold;color:#222222;">${(0, docxHelpers_1.escapeHtml)(edu.school)}</p>`;
            main += `<p style="margin:0;font-size:9pt;color:#555555;">${(0, docxHelpers_1.escapeHtml)(edu.degree)}</p>`;
            main += `</td>`;
            main += `<td style="vertical-align:top;text-align:right;white-space:nowrap;width:120px;">`;
            main += `<p style="margin:0;font-size:8pt;color:#888888;">${(0, docxHelpers_1.formatDateRange)(edu.startDate, edu.endDate, edu.current, t.labels.present, locale)}</p>`;
            main += `</td>`;
            main += `</tr></table>`;
            if (edu.description) {
                main += `<p style="font-size:9pt;color:#444444;margin:0 0 6px 0;">${(0, docxHelpers_1.formatDescription)(edu.description)}</p>`;
            }
        }
    }
    // Certifications
    if (data.certifications?.length) {
        main += mainSectionHeader(t.sections.certifications, primary);
        for (const cert of data.certifications) {
            main += `<p style="margin:0 0 4px 0;font-size:9pt;"><strong>${(0, docxHelpers_1.escapeHtml)(cert.name)}</strong> — ${(0, docxHelpers_1.escapeHtml)(cert.issuer)}${cert.date ? ', ' + (0, docxHelpers_1.escapeHtml)(cert.date) : ''}</p>`;
        }
        main += `<br />`;
    }
    // Awards
    if (data.awards?.length) {
        main += mainSectionHeader(t.sections.awards, primary);
        for (const award of data.awards) {
            main += `<p style="margin:0 0 4px 0;font-size:9pt;"><strong>${(0, docxHelpers_1.escapeHtml)(award.title)}</strong> — ${(0, docxHelpers_1.escapeHtml)(award.issuer)}${award.date ? ', ' + (0, docxHelpers_1.escapeHtml)(award.date) : ''}</p>`;
        }
    }
    // === Assemble two-column layout ===
    return `
<table width="100%" cellpadding="0" cellspacing="0" style="min-height:800px;">
<tr>
    <td width="32%" style="vertical-align:top;background-color:${primary};padding:20px 14px;color:${sidebarText};">
        ${sidebar}
    </td>
    <td width="68%" style="vertical-align:top;padding:20px 18px;">
        ${main}
    </td>
</tr>
</table>`;
}
function sidebarSectionHeader(title, color) {
    return `<p style="margin:8px 0 4px 0;font-size:10pt;font-weight:bold;color:${color};text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid ${color};padding-bottom:2px;">${title}</p>`;
}
function mainSectionHeader(title, color) {
    return `<p style="margin:10px 0 6px 0;font-size:12pt;font-weight:bold;color:${color};border-bottom:1px solid ${color};padding-bottom:3px;text-transform:uppercase;letter-spacing:1px;">${title}</p>`;
}
//# sourceMappingURL=docx-sidebar.js.map
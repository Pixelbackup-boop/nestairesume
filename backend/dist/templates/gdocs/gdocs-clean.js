"use strict";
/**
 * Google Docs Clean Template
 * Single-column, Google-blue accent, Arial-first, optimized for Google Docs import
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderGdocsClean = renderGdocsClean;
const docxHelpers_1 = require("../docx/shared/docxHelpers");
const FONT = "'Arial', sans-serif";
function renderGdocsClean(data, theme, translations, locale) {
    const t = (0, docxHelpers_1.getTranslations)(translations);
    const pi = data.personalInfo;
    const primary = theme.primary || '#4285f4';
    let html = '';
    // --- Header: Photo + Name + Contact ---
    html += `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">`;
    html += `<tr>`;
    if (pi.profileImage) {
        html += `<td width="85" style="vertical-align:top;padding-right:14px;">`;
        html += (0, docxHelpers_1.renderProfileImage)(pi.profileImage, 75, pi.imageShape || 'circle');
        html += `</td>`;
    }
    html += `<td style="vertical-align:top;">`;
    html += `<p style="margin:0 0 2px 0;font-size:22pt;font-weight:bold;color:${primary};font-family:${FONT};">${(0, docxHelpers_1.escapeHtml)(pi.fullName)}</p>`;
    if (pi.jobTitle) {
        html += `<p style="margin:0 0 6px 0;font-size:11pt;color:#5f6368;font-family:${FONT};">${(0, docxHelpers_1.escapeHtml)(pi.jobTitle)}</p>`;
    }
    html += `<p style="margin:0;font-size:9pt;color:#80868b;font-family:${FONT};">${(0, docxHelpers_1.buildContactLine)(pi)}</p>`;
    html += `</td>`;
    html += `</tr></table>`;
    // Divider
    html += `<hr style="border:none;border-top:2px solid ${primary};margin:0 0 12px 0;" />`;
    // --- Summary ---
    if (pi.summary) {
        html += sectionHeader(t.sections.summary, primary);
        html += `<p style="font-size:10pt;color:#3c4043;margin:0 0 12px 0;font-family:${FONT};line-height:1.5;">${(0, docxHelpers_1.formatDescription)(pi.summary)}</p>`;
    }
    // --- Experience ---
    if (data.experience?.length) {
        html += sectionHeader(t.sections.workExperience, primary);
        for (const exp of data.experience) {
            html += `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;">`;
            html += `<tr>`;
            html += `<td style="vertical-align:top;">`;
            html += `<p style="margin:0;font-size:11pt;font-weight:bold;color:#202124;font-family:${FONT};">${(0, docxHelpers_1.escapeHtml)(exp.title)}</p>`;
            html += `<p style="margin:0 0 4px 0;font-size:10pt;color:${primary};font-family:${FONT};">${(0, docxHelpers_1.escapeHtml)(exp.company)}${exp.city ? ', ' + (0, docxHelpers_1.escapeHtml)(exp.city) : ''}</p>`;
            html += `</td>`;
            html += `<td style="vertical-align:top;text-align:right;white-space:nowrap;width:140px;">`;
            html += `<p style="margin:0;font-size:9pt;color:#80868b;font-family:${FONT};">${(0, docxHelpers_1.formatDateRange)(exp.startDate, exp.endDate, exp.current, t.labels.present, locale)}</p>`;
            html += `</td>`;
            html += `</tr></table>`;
            if (exp.description) {
                html += `<p style="font-size:10pt;color:#3c4043;margin:0 0 8px 0;font-family:${FONT};">${(0, docxHelpers_1.formatDescription)(exp.description)}</p>`;
            }
        }
    }
    // --- Education ---
    if (data.education?.length) {
        html += sectionHeader(t.sections.education, primary);
        for (const edu of data.education) {
            html += `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">`;
            html += `<tr>`;
            html += `<td style="vertical-align:top;">`;
            html += `<p style="margin:0;font-size:11pt;font-weight:bold;color:#202124;font-family:${FONT};">${(0, docxHelpers_1.escapeHtml)(edu.school)}</p>`;
            html += `<p style="margin:0;font-size:10pt;color:#5f6368;font-family:${FONT};">${(0, docxHelpers_1.escapeHtml)(edu.degree)}</p>`;
            html += `</td>`;
            html += `<td style="vertical-align:top;text-align:right;white-space:nowrap;width:140px;">`;
            html += `<p style="margin:0;font-size:9pt;color:#80868b;font-family:${FONT};">${(0, docxHelpers_1.formatDateRange)(edu.startDate, edu.endDate, edu.current, t.labels.present, locale)}</p>`;
            html += `</td>`;
            html += `</tr></table>`;
            if (edu.description) {
                html += `<p style="font-size:10pt;color:#3c4043;margin:0 0 6px 0;font-family:${FONT};">${(0, docxHelpers_1.formatDescription)(edu.description)}</p>`;
            }
        }
    }
    // --- Skills ---
    if (data.skills?.length) {
        html += sectionHeader(t.sections.skills, primary);
        html += `<p style="font-size:10pt;color:#3c4043;margin:0 0 12px 0;font-family:${FONT};">${(0, docxHelpers_1.renderSkillsList)(data.skills, 'inline')}</p>`;
    }
    // --- Languages ---
    if (data.languages?.length) {
        html += sectionHeader(t.sections.languages, primary);
        html += `<p style="font-size:10pt;color:#3c4043;margin:0 0 12px 0;font-family:${FONT};">`;
        html += data.languages.map(l => `${(0, docxHelpers_1.escapeHtml)(l.name)} (${(0, docxHelpers_1.getLanguageProficiencyText)(l.proficiency)})`).join(', ');
        html += `</p>`;
    }
    // --- Certifications ---
    if (data.certifications?.length) {
        html += sectionHeader(t.sections.certifications, primary);
        for (const cert of data.certifications) {
            html += `<p style="margin:0 0 4px 0;font-size:10pt;font-family:${FONT};"><strong>${(0, docxHelpers_1.escapeHtml)(cert.name)}</strong> — ${(0, docxHelpers_1.escapeHtml)(cert.issuer)}${cert.date ? ', ' + (0, docxHelpers_1.escapeHtml)(cert.date) : ''}</p>`;
        }
        html += `<br />`;
    }
    // --- Interests ---
    if (data.interests?.length) {
        html += sectionHeader(t.sections.interests, primary);
        html += `<p style="font-size:10pt;color:#3c4043;margin:0 0 12px 0;font-family:${FONT};">${data.interests.map(i => (0, docxHelpers_1.escapeHtml)(i.name)).join(', ')}</p>`;
    }
    return html;
}
function sectionHeader(title, color) {
    return `<p style="margin:12px 0 6px 0;font-size:12pt;font-weight:bold;color:${color};border-bottom:1px solid ${color};padding-bottom:3px;text-transform:uppercase;letter-spacing:1px;font-family:'Arial',sans-serif;">${(0, docxHelpers_1.escapeHtml)(title)}</p>`;
}
//# sourceMappingURL=gdocs-clean.js.map
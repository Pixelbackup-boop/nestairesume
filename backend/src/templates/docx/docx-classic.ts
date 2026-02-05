/**
 * DOCX Classic Template
 * Single-column layout with centered name and photo at top
 * Traditional top-down resume format
 */

import { PdfResumeData, PdfTheme, PdfTranslations } from '../../types/pdf';
import {
    escapeHtml, formatDescription, formatDateRange, buildContactLine,
    renderProfileImage, renderSkillsList, getLanguageProficiencyText,
    getTranslations, DOCX_FONTS,
} from './shared/docxHelpers';

export function renderDocxClassic(
    data: PdfResumeData,
    theme: PdfTheme,
    translations?: PdfTranslations,
    locale?: string
): string {
    const t = getTranslations(translations);
    const pi = data.personalInfo;
    const primary = theme.primary || '#1e3a8a';

    let html = '';

    // --- Header: Photo + Name + Contact ---
    html += `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">`;
    html += `<tr>`;

    // Profile image on the left
    if (pi.profileImage) {
        html += `<td width="90" style="vertical-align:top;padding-right:16px;">`;
        html += renderProfileImage(pi.profileImage, 80, pi.imageShape || 'circle');
        html += `</td>`;
    }

    // Name + Job Title + Contact
    html += `<td style="vertical-align:top;">`;
    html += `<p style="margin:0 0 2px 0;font-size:22pt;font-weight:bold;color:${primary};font-family:${DOCX_FONTS.heading};">${escapeHtml(pi.fullName)}</p>`;
    if (pi.jobTitle) {
        html += `<p style="margin:0 0 6px 0;font-size:12pt;color:#555555;">${escapeHtml(pi.jobTitle)}</p>`;
    }
    html += `<p style="margin:0;font-size:9pt;color:#777777;">${buildContactLine(pi)}</p>`;
    html += `</td>`;
    html += `</tr></table>`;

    // Divider
    html += `<hr style="border:none;border-top:2px solid ${primary};margin:0 0 12px 0;" />`;

    // --- Summary ---
    if (pi.summary) {
        html += sectionHeader(t.sections.summary, primary);
        html += `<p style="font-size:10pt;color:#444444;margin:0 0 12px 0;">${formatDescription(pi.summary)}</p>`;
    }

    // --- Experience ---
    if (data.experience?.length) {
        html += sectionHeader(t.sections.workExperience, primary);
        for (const exp of data.experience) {
            html += `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;">`;
            html += `<tr>`;
            html += `<td style="vertical-align:top;">`;
            html += `<p style="margin:0;font-size:11pt;font-weight:bold;color:#222222;">${escapeHtml(exp.title)}</p>`;
            html += `<p style="margin:0 0 4px 0;font-size:10pt;color:${primary};">${escapeHtml(exp.company)}${exp.city ? ', ' + escapeHtml(exp.city) : ''}</p>`;
            html += `</td>`;
            html += `<td style="vertical-align:top;text-align:right;white-space:nowrap;width:140px;">`;
            html += `<p style="margin:0;font-size:9pt;color:#888888;">${formatDateRange(exp.startDate, exp.endDate, exp.current, t.labels.present, locale)}</p>`;
            html += `</td>`;
            html += `</tr></table>`;
            if (exp.description) {
                html += `<p style="font-size:10pt;color:#444444;margin:0 0 8px 0;">${formatDescription(exp.description)}</p>`;
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
            html += `<p style="margin:0;font-size:11pt;font-weight:bold;color:#222222;">${escapeHtml(edu.school)}</p>`;
            html += `<p style="margin:0;font-size:10pt;color:#555555;">${escapeHtml(edu.degree)}</p>`;
            html += `</td>`;
            html += `<td style="vertical-align:top;text-align:right;white-space:nowrap;width:140px;">`;
            html += `<p style="margin:0;font-size:9pt;color:#888888;">${formatDateRange(edu.startDate, edu.endDate, edu.current, t.labels.present, locale)}</p>`;
            html += `</td>`;
            html += `</tr></table>`;
            if (edu.description) {
                html += `<p style="font-size:10pt;color:#444444;margin:0 0 6px 0;">${formatDescription(edu.description)}</p>`;
            }
        }
    }

    // --- Skills ---
    if (data.skills?.length) {
        html += sectionHeader(t.sections.skills, primary);
        html += `<p style="font-size:10pt;color:#444444;margin:0 0 12px 0;">${renderSkillsList(data.skills, 'inline')}</p>`;
    }

    // --- Languages ---
    if (data.languages?.length) {
        html += sectionHeader(t.sections.languages, primary);
        html += `<p style="font-size:10pt;color:#444444;margin:0 0 12px 0;">`;
        html += data.languages.map(l => `${escapeHtml(l.name)} (${getLanguageProficiencyText(l.proficiency)})`).join(', ');
        html += `</p>`;
    }

    // --- Certifications ---
    if (data.certifications?.length) {
        html += sectionHeader(t.sections.certifications, primary);
        for (const cert of data.certifications) {
            html += `<p style="margin:0 0 4px 0;font-size:10pt;"><strong>${escapeHtml(cert.name)}</strong> — ${escapeHtml(cert.issuer)}${cert.date ? ', ' + escapeHtml(cert.date) : ''}</p>`;
        }
        html += `<br />`;
    }

    // --- Interests ---
    if (data.interests?.length) {
        html += sectionHeader(t.sections.interests, primary);
        html += `<p style="font-size:10pt;color:#444444;margin:0 0 12px 0;">${data.interests.map(i => escapeHtml(i.name)).join(', ')}</p>`;
    }

    return html;
}

function sectionHeader(title: string, color: string): string {
    return `<p style="margin:12px 0 6px 0;font-size:13pt;font-weight:bold;color:${color};border-bottom:1px solid ${color};padding-bottom:3px;text-transform:uppercase;letter-spacing:1px;">${escapeHtml(title)}</p>`;
}

/**
 * Google Docs Elegant Template
 * Georgia serif font, deep green accent, traditional/academic style
 * Optimized for Google Docs import
 */

import { PdfResumeData, PdfTheme, PdfTranslations } from '../../types/pdf';
import {
    escapeHtml, formatDescription, formatDateRange,
    renderProfileImage, renderSkillsList, getLanguageProficiencyText,
    getTranslations,
} from '../docx/shared/docxHelpers';

const FONT_HEADING = "'Georgia', 'Times New Roman', serif";
const FONT_BODY = "'Arial', sans-serif";

export function renderGdocsElegant(
    data: PdfResumeData,
    theme: PdfTheme,
    translations?: PdfTranslations,
    locale?: string
): string {
    const t = getTranslations(translations);
    const pi = data.personalInfo;
    const primary = theme.primary || '#2d5016';

    let html = '';

    // --- Header: Centered name with photo above ---
    html += `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">`;
    html += `<tr>`;
    html += `<td style="text-align:center;padding:4px 0;">`;

    if (pi.profileImage) {
        html += `<div style="text-align:center;margin-bottom:8px;">`;
        html += renderProfileImage(pi.profileImage, 80, pi.imageShape || 'circle');
        html += `</div>`;
    }

    html += `<p style="margin:0 0 2px 0;font-size:24pt;font-weight:bold;color:${primary};font-family:${FONT_HEADING};">${escapeHtml(pi.fullName)}</p>`;
    if (pi.jobTitle) {
        html += `<p style="margin:0 0 6px 0;font-size:12pt;color:#555555;font-family:${FONT_HEADING};font-style:italic;">${escapeHtml(pi.jobTitle)}</p>`;
    }

    // Contact as centered line
    const contactParts: string[] = [];
    if (pi.email) contactParts.push(escapeHtml(pi.email));
    if (pi.phone) contactParts.push(escapeHtml(pi.phone));
    if (pi.location) contactParts.push(escapeHtml(pi.location));
    if (pi.website) contactParts.push(escapeHtml(pi.website));
    if (pi.linkedin) contactParts.push(escapeHtml(pi.linkedin));
    if (contactParts.length) {
        html += `<p style="margin:0;font-size:9pt;color:#777777;font-family:${FONT_BODY};">${contactParts.join('  &#8226;  ')}</p>`;
    }

    html += `</td>`;
    html += `</tr></table>`;

    // Elegant double divider
    html += `<hr style="border:none;border-top:1px solid ${primary};margin:4px 0 2px 0;" />`;
    html += `<hr style="border:none;border-top:1px solid ${primary};margin:2px 0 12px 0;" />`;

    // --- Summary ---
    if (pi.summary) {
        html += sectionHeader(t.sections.summary, primary);
        html += `<p style="font-size:10pt;color:#444444;margin:0 0 12px 0;font-family:${FONT_BODY};line-height:1.6;">${formatDescription(pi.summary)}</p>`;
    }

    // --- Experience ---
    if (data.experience?.length) {
        html += sectionHeader(t.sections.workExperience, primary);
        for (const exp of data.experience) {
            html += `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;">`;
            html += `<tr>`;
            html += `<td style="vertical-align:top;">`;
            html += `<p style="margin:0;font-size:11pt;font-weight:bold;color:#222222;font-family:${FONT_HEADING};">${escapeHtml(exp.title)}</p>`;
            html += `<p style="margin:0 0 3px 0;font-size:10pt;color:${primary};font-family:${FONT_BODY};">${escapeHtml(exp.company)}${exp.city ? ', ' + escapeHtml(exp.city) : ''}</p>`;
            html += `</td>`;
            html += `<td style="vertical-align:top;text-align:right;white-space:nowrap;width:140px;">`;
            html += `<p style="margin:0;font-size:9pt;color:#888888;font-family:${FONT_BODY};font-style:italic;">${formatDateRange(exp.startDate, exp.endDate, exp.current, t.labels.present, locale)}</p>`;
            html += `</td>`;
            html += `</tr></table>`;
            if (exp.description) {
                html += `<p style="font-size:10pt;color:#444444;margin:0 0 8px 0;font-family:${FONT_BODY};">${formatDescription(exp.description)}</p>`;
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
            html += `<p style="margin:0;font-size:11pt;font-weight:bold;color:#222222;font-family:${FONT_HEADING};">${escapeHtml(edu.school)}</p>`;
            html += `<p style="margin:0;font-size:10pt;color:#555555;font-family:${FONT_BODY};">${escapeHtml(edu.degree)}</p>`;
            html += `</td>`;
            html += `<td style="vertical-align:top;text-align:right;white-space:nowrap;width:140px;">`;
            html += `<p style="margin:0;font-size:9pt;color:#888888;font-family:${FONT_BODY};font-style:italic;">${formatDateRange(edu.startDate, edu.endDate, edu.current, t.labels.present, locale)}</p>`;
            html += `</td>`;
            html += `</tr></table>`;
            if (edu.description) {
                html += `<p style="font-size:10pt;color:#444444;margin:0 0 6px 0;font-family:${FONT_BODY};">${formatDescription(edu.description)}</p>`;
            }
        }
    }

    // --- Skills ---
    if (data.skills?.length) {
        html += sectionHeader(t.sections.skills, primary);
        html += `<p style="font-size:10pt;color:#444444;margin:0 0 12px 0;font-family:${FONT_BODY};">${renderSkillsList(data.skills, 'inline')}</p>`;
    }

    // --- Languages ---
    if (data.languages?.length) {
        html += sectionHeader(t.sections.languages, primary);
        html += `<p style="font-size:10pt;color:#444444;margin:0 0 12px 0;font-family:${FONT_BODY};">`;
        html += data.languages.map(l => `${escapeHtml(l.name)} (${getLanguageProficiencyText(l.proficiency)})`).join(', ');
        html += `</p>`;
    }

    // --- Certifications ---
    if (data.certifications?.length) {
        html += sectionHeader(t.sections.certifications, primary);
        for (const cert of data.certifications) {
            html += `<p style="margin:0 0 4px 0;font-size:10pt;font-family:${FONT_BODY};"><strong>${escapeHtml(cert.name)}</strong> — ${escapeHtml(cert.issuer)}${cert.date ? ', ' + escapeHtml(cert.date) : ''}</p>`;
        }
        html += `<br />`;
    }

    // --- Interests ---
    if (data.interests?.length) {
        html += sectionHeader(t.sections.interests, primary);
        html += `<p style="font-size:10pt;color:#444444;margin:0 0 12px 0;font-family:${FONT_BODY};">${data.interests.map(i => escapeHtml(i.name)).join(', ')}</p>`;
    }

    return html;
}

function sectionHeader(title: string, color: string): string {
    return `<p style="margin:12px 0 6px 0;font-size:13pt;font-weight:bold;color:${color};border-bottom:1px solid ${color};padding-bottom:3px;font-family:'Georgia','Times New Roman',serif;letter-spacing:0.5px;">${escapeHtml(title)}</p>`;
}

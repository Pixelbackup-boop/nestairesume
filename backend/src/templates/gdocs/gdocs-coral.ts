/**
 * Google Docs Coral Template
 * Warm coral accent, modern layout with subtle section backgrounds
 * Optimized for Google Docs import
 */

import { PdfResumeData, PdfTheme, PdfTranslations } from '../../types/pdf';
import {
    escapeHtml, formatDescription, formatDateRange, buildContactLine,
    renderProfileImage, renderSkillsList, getLanguageProficiencyText,
    getTranslations,
} from '../docx/shared/docxHelpers';

const FONT = "'Arial', sans-serif";

export function renderGdocsCoral(
    data: PdfResumeData,
    theme: PdfTheme,
    translations?: PdfTranslations,
    locale?: string
): string {
    const t = getTranslations(translations);
    const pi = data.personalInfo;
    const primary = theme.primary || '#e8634a';

    let html = '';

    // --- Header with coral background bar ---
    html += `<table width="100%" cellpadding="0" cellspacing="0" style="background-color:${primary};margin-bottom:14px;">`;
    html += `<tr>`;

    if (pi.profileImage) {
        html += `<td width="95" style="vertical-align:middle;padding:16px 10px 16px 16px;">`;
        html += renderProfileImage(pi.profileImage, 75, pi.imageShape || 'circle');
        html += `</td>`;
    }

    html += `<td style="vertical-align:middle;padding:16px;">`;
    html += `<p style="margin:0 0 2px 0;font-size:22pt;font-weight:bold;color:#ffffff;font-family:${FONT};">${escapeHtml(pi.fullName)}</p>`;
    if (pi.jobTitle) {
        html += `<p style="margin:0 0 6px 0;font-size:11pt;color:#fce4ec;font-family:${FONT};">${escapeHtml(pi.jobTitle)}</p>`;
    }
    html += `<p style="margin:0;font-size:9pt;color:#fce4ec;font-family:${FONT};">${buildContactLine(pi)}</p>`;
    html += `</td>`;
    html += `</tr></table>`;

    // --- Summary ---
    if (pi.summary) {
        html += sectionHeader(t.sections.summary, primary);
        html += `<p style="font-size:10pt;color:#444444;margin:0 0 12px 0;font-family:${FONT};line-height:1.5;">${formatDescription(pi.summary)}</p>`;
    }

    // --- Experience ---
    if (data.experience?.length) {
        html += sectionHeader(t.sections.workExperience, primary);
        for (const exp of data.experience) {
            html += `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;">`;
            html += `<tr>`;
            html += `<td style="vertical-align:top;">`;
            html += `<p style="margin:0;font-size:11pt;font-weight:bold;color:#333333;font-family:${FONT};">${escapeHtml(exp.title)}</p>`;
            html += `<p style="margin:0 0 3px 0;font-size:10pt;color:${primary};font-family:${FONT};">${escapeHtml(exp.company)}${exp.city ? ', ' + escapeHtml(exp.city) : ''}</p>`;
            html += `</td>`;
            html += `<td style="vertical-align:top;text-align:right;white-space:nowrap;width:140px;">`;
            html += `<p style="margin:0;font-size:9pt;color:#999999;font-family:${FONT};">${formatDateRange(exp.startDate, exp.endDate, exp.current, t.labels.present, locale)}</p>`;
            html += `</td>`;
            html += `</tr></table>`;
            if (exp.description) {
                html += `<p style="font-size:10pt;color:#444444;margin:0 0 8px 0;font-family:${FONT};">${formatDescription(exp.description)}</p>`;
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
            html += `<p style="margin:0;font-size:11pt;font-weight:bold;color:#333333;font-family:${FONT};">${escapeHtml(edu.school)}</p>`;
            html += `<p style="margin:0;font-size:10pt;color:#666666;font-family:${FONT};">${escapeHtml(edu.degree)}</p>`;
            html += `</td>`;
            html += `<td style="vertical-align:top;text-align:right;white-space:nowrap;width:140px;">`;
            html += `<p style="margin:0;font-size:9pt;color:#999999;font-family:${FONT};">${formatDateRange(edu.startDate, edu.endDate, edu.current, t.labels.present, locale)}</p>`;
            html += `</td>`;
            html += `</tr></table>`;
            if (edu.description) {
                html += `<p style="font-size:10pt;color:#444444;margin:0 0 6px 0;font-family:${FONT};">${formatDescription(edu.description)}</p>`;
            }
        }
    }

    // --- Two-column: Skills + Languages ---
    const hasSkills = data.skills?.length;
    const hasLanguages = data.languages?.length;
    if (hasSkills || hasLanguages) {
        html += `<table width="100%" cellpadding="0" cellspacing="0" style="margin-top:4px;">`;
        html += `<tr>`;
        if (hasSkills) {
            html += `<td${hasLanguages ? ' width="60%"' : ''} style="vertical-align:top;padding-right:12px;">`;
            html += sectionHeader(t.sections.skills, primary);
            html += `<p style="font-size:10pt;color:#444444;font-family:${FONT};">${renderSkillsList(data.skills, 'inline')}</p>`;
            html += `</td>`;
        }
        if (hasLanguages) {
            html += `<td${hasSkills ? ' width="40%"' : ''} style="vertical-align:top;">`;
            html += sectionHeader(t.sections.languages, primary);
            html += `<p style="font-size:10pt;color:#444444;font-family:${FONT};">`;
            html += data.languages.map(l => `${escapeHtml(l.name)} (${getLanguageProficiencyText(l.proficiency)})`).join('<br />');
            html += `</p>`;
            html += `</td>`;
        }
        html += `</tr></table>`;
    }

    // --- Certifications ---
    if (data.certifications?.length) {
        html += sectionHeader(t.sections.certifications, primary);
        for (const cert of data.certifications) {
            html += `<p style="margin:0 0 4px 0;font-size:10pt;font-family:${FONT};"><strong>${escapeHtml(cert.name)}</strong> — ${escapeHtml(cert.issuer)}${cert.date ? ', ' + escapeHtml(cert.date) : ''}</p>`;
        }
        html += `<br />`;
    }

    // --- Interests ---
    if (data.interests?.length) {
        html += sectionHeader(t.sections.interests, primary);
        html += `<p style="font-size:10pt;color:#444444;margin:0 0 12px 0;font-family:${FONT};">${data.interests.map(i => escapeHtml(i.name)).join(', ')}</p>`;
    }

    return html;
}

function sectionHeader(title: string, color: string): string {
    return `<p style="margin:12px 0 6px 0;font-size:12pt;font-weight:bold;color:${color};border-bottom:2px solid ${color};padding-bottom:3px;text-transform:uppercase;letter-spacing:1px;font-family:'Arial',sans-serif;">${escapeHtml(title)}</p>`;
}

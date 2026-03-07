/**
 * DOCX Minimal Template
 * Clean layout with thin dividers, photo top-left, name left + contact right
 */

import { PdfResumeData, PdfTheme, PdfTranslations } from '../../types/pdf';
import {
    escapeHtml, formatDescription, formatDateRange, buildContactLine,
    renderProfileImage, renderSkillsList, getLanguageProficiencyText,
    getTranslations, DOCX_FONTS,
} from './shared/docxHelpers';

export function renderDocxMinimal(
    data: PdfResumeData,
    theme: PdfTheme,
    translations?: PdfTranslations,
    locale?: string
): string {
    const t = getTranslations(translations);
    const pi = data.personalInfo;
    const primary = theme.primary || '#333333';

    let html = '';

    // === Header: Photo + Name left, Contact right ===
    html += `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">`;
    html += `<tr>`;

    // Photo + Name (left)
    html += `<td style="vertical-align:middle;">`;
    html += `<table cellpadding="0" cellspacing="0"><tr>`;
    if (pi.profileImage) {
        html += `<td style="vertical-align:middle;padding-right:14px;">`;
        html += renderProfileImage(pi.profileImage, 70, pi.imageShape || 'circle');
        html += `</td>`;
    }
    html += `<td style="vertical-align:middle;">`;
    html += `<p style="margin:0 0 2px 0;font-size:20pt;font-weight:bold;color:${primary};font-family:${DOCX_FONTS.heading};">${escapeHtml(pi.fullName)}</p>`;
    if (pi.jobTitle) {
        html += `<p style="margin:0;font-size:11pt;color:#666666;">${escapeHtml(pi.jobTitle)}</p>`;
    }
    html += `</td>`;
    html += `</tr></table>`;
    html += `</td>`;

    // Contact info (right-aligned)
    html += `<td style="vertical-align:middle;text-align:right;">`;
    if (pi.email) html += `<p style="margin:0 0 2px 0;font-size:9pt;color:#555555;">${escapeHtml(pi.email)}</p>`;
    if (pi.phone) html += `<p style="margin:0 0 2px 0;font-size:9pt;color:#555555;">${escapeHtml(pi.phone)}</p>`;
    if (pi.location) html += `<p style="margin:0 0 2px 0;font-size:9pt;color:#555555;">${escapeHtml(pi.location)}</p>`;
    if (pi.website) html += `<p style="margin:0 0 2px 0;font-size:9pt;color:#555555;">${escapeHtml(pi.website)}</p>`;
    if (pi.linkedin) html += `<p style="margin:0;font-size:9pt;color:#555555;">${escapeHtml(pi.linkedin)}</p>`;
    html += `</td>`;

    html += `</tr></table>`;

    // Thin divider
    html += `<hr style="border:none;border-top:1px solid #cccccc;margin:0 0 10px 0;" />`;

    // === Summary ===
    if (pi.summary) {
        html += sectionHeader(t.sections.summary, primary);
        html += `<p style="font-size:10pt;color:#444444;margin:0 0 10px 0;line-height:1.5;">${formatDescription(pi.summary)}</p>`;
    }

    // === Experience ===
    if (data.experience?.length) {
        html += sectionHeader(t.sections.workExperience, primary);
        for (const exp of data.experience) {
            html += `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">`;
            html += `<tr>`;
            html += `<td style="vertical-align:top;">`;
            html += `<p style="margin:0;font-size:11pt;font-weight:bold;color:#222222;">${escapeHtml(exp.title)}</p>`;
            html += `<p style="margin:0 0 3px 0;font-size:10pt;color:#666666;">${escapeHtml(exp.company)}${exp.city ? ' · ' + escapeHtml(exp.city) : ''}</p>`;
            html += `</td>`;
            html += `<td style="vertical-align:top;text-align:right;white-space:nowrap;width:140px;">`;
            html += `<p style="margin:0;font-size:9pt;color:#999999;">${formatDateRange(exp.startDate, exp.endDate, exp.current, t.labels.present, locale)}</p>`;
            html += `</td>`;
            html += `</tr></table>`;
            if (exp.description) {
                html += `<p style="font-size:10pt;color:#444444;margin:0 0 8px 0;">${formatDescription(exp.description)}</p>`;
            }
        }
    }

    // === Education ===
    if (data.education?.length) {
        html += sectionHeader(t.sections.education, primary);
        for (const edu of data.education) {
            html += `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:6px;">`;
            html += `<tr>`;
            html += `<td style="vertical-align:top;">`;
            html += `<p style="margin:0;font-size:11pt;font-weight:bold;color:#222222;">${escapeHtml(edu.school)}</p>`;
            html += `<p style="margin:0;font-size:10pt;color:#666666;">${escapeHtml(edu.degree)}</p>`;
            html += `</td>`;
            html += `<td style="vertical-align:top;text-align:right;white-space:nowrap;width:140px;">`;
            html += `<p style="margin:0;font-size:9pt;color:#999999;">${formatDateRange(edu.startDate, edu.endDate, edu.current, t.labels.present, locale)}</p>`;
            html += `</td>`;
            html += `</tr></table>`;
            if (edu.description) {
                html += `<p style="font-size:10pt;color:#444444;margin:0 0 6px 0;">${formatDescription(edu.description)}</p>`;
            }
        }
    }

    // === Two-column: Skills + Languages ===
    const hasSkills = data.skills?.length;
    const hasLanguages = data.languages?.length;
    if (hasSkills || hasLanguages) {
        html += `<table width="100%" cellpadding="0" cellspacing="0">`;
        html += `<tr>`;
        if (hasSkills) {
            html += `<td${hasLanguages ? ' width="60%"' : ''} style="vertical-align:top;padding-right:12px;">`;
            html += sectionHeader(t.sections.skills, primary);
            html += `<p style="font-size:10pt;color:#444444;">${renderSkillsList(data.skills, 'inline')}</p>`;
            html += `</td>`;
        }
        if (hasLanguages) {
            html += `<td${hasSkills ? ' width="40%"' : ''} style="vertical-align:top;">`;
            html += sectionHeader(t.sections.languages, primary);
            html += `<p style="font-size:10pt;color:#444444;">`;
            html += data.languages.map(l => `${escapeHtml(l.name)} (${getLanguageProficiencyText(l.proficiency, t.labels)})`).join('<br />');
            html += `</p>`;
            html += `</td>`;
        }
        html += `</tr></table>`;
    }

    // === Certifications ===
    if (data.certifications?.length) {
        html += sectionHeader(t.sections.certifications, primary);
        for (const cert of data.certifications) {
            html += `<p style="margin:0 0 4px 0;font-size:10pt;"><strong>${escapeHtml(cert.name)}</strong> — ${escapeHtml(cert.issuer)}${cert.date ? ', ' + escapeHtml(cert.date) : ''}</p>`;
        }
    }

    // === Interests ===
    if (data.interests?.length) {
        html += sectionHeader(t.sections.interests, primary);
        html += `<p style="font-size:10pt;color:#444444;">${data.interests.map(i => escapeHtml(i.name)).join(' · ')}</p>`;
    }

    return html;
}

function sectionHeader(title: string, color: string): string {
    return `<p style="margin:10px 0 5px 0;font-size:11pt;font-weight:bold;color:${color};border-bottom:1px solid #dddddd;padding-bottom:3px;letter-spacing:0.5px;">${escapeHtml(title)}</p>`;
}

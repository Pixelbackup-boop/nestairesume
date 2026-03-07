/**
 * DOCX Header Template
 * Full-width dark header band with photo + name, then single-column body
 */

import { PdfResumeData, PdfTheme, PdfTranslations } from '../../types/pdf';
import {
    escapeHtml, formatDescription, formatDateRange, buildContactLine,
    renderProfileImage, renderSkillsList, getLanguageProficiencyText,
    getContrastText, getTranslations, DOCX_FONTS,
} from './shared/docxHelpers';

export function renderDocxHeader(
    data: PdfResumeData,
    theme: PdfTheme,
    translations?: PdfTranslations,
    locale?: string
): string {
    const t = getTranslations(translations);
    const pi = data.personalInfo;
    const primary = theme.primary || '#1e3a8a';
    const headerText = getContrastText(primary);

    let html = '';

    // === Header Band ===
    html += `<table width="100%" cellpadding="0" cellspacing="0" style="background-color:${primary};margin-bottom:16px;">`;
    html += `<tr>`;

    // Photo in header
    if (pi.profileImage) {
        html += `<td width="100" style="vertical-align:middle;padding:20px 12px 20px 20px;">`;
        html += renderProfileImage(pi.profileImage, 80, pi.imageShape || 'circle');
        html += `</td>`;
    }

    // Name + Title + Contact
    html += `<td style="vertical-align:middle;padding:20px;">`;
    html += `<p style="margin:0 0 2px 0;font-size:22pt;font-weight:bold;color:${headerText};font-family:${DOCX_FONTS.heading};">${escapeHtml(pi.fullName)}</p>`;
    if (pi.jobTitle) {
        html += `<p style="margin:0 0 8px 0;font-size:12pt;color:${headerText};opacity:0.9;">${escapeHtml(pi.jobTitle)}</p>`;
    }
    html += `<p style="margin:0;font-size:9pt;color:${headerText};opacity:0.8;">${buildContactLine(pi)}</p>`;
    html += `</td>`;
    html += `</tr></table>`;

    // === Body Content ===
    const bodyPadding = 'padding:0 4px;';

    // Summary
    if (pi.summary) {
        html += `<div style="${bodyPadding}">`;
        html += sectionHeader(t.sections.summary, primary);
        html += `<p style="font-size:10pt;color:#444444;margin:0 0 12px 0;">${formatDescription(pi.summary)}</p>`;
        html += `</div>`;
    }

    // Experience
    if (data.experience?.length) {
        html += `<div style="${bodyPadding}">`;
        html += sectionHeader(t.sections.workExperience, primary);
        for (const exp of data.experience) {
            html += `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;">`;
            html += `<tr>`;
            html += `<td style="vertical-align:top;">`;
            html += `<p style="margin:0;font-size:11pt;font-weight:bold;color:#222222;">${escapeHtml(exp.title)}</p>`;
            html += `<p style="margin:0 0 3px 0;font-size:10pt;color:${primary};">${escapeHtml(exp.company)}${exp.city ? ', ' + escapeHtml(exp.city) : ''}</p>`;
            html += `</td>`;
            html += `<td style="vertical-align:top;text-align:right;white-space:nowrap;width:140px;">`;
            html += `<p style="margin:0;font-size:9pt;color:#888888;">${formatDateRange(exp.startDate, exp.endDate, exp.current, t.labels.present, locale)}</p>`;
            html += `</td>`;
            html += `</tr></table>`;
            if (exp.description) {
                html += `<p style="font-size:10pt;color:#444444;margin:0 0 8px 0;">${formatDescription(exp.description)}</p>`;
            }
        }
        html += `</div>`;
    }

    // Education
    if (data.education?.length) {
        html += `<div style="${bodyPadding}">`;
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
        html += `</div>`;
    }

    // Two-column bottom: Skills + Languages
    const hasSkills = data.skills?.length;
    const hasLanguages = data.languages?.length;
    if (hasSkills || hasLanguages) {
        html += `<table width="100%" cellpadding="0" cellspacing="0" style="margin-top:4px;">`;
        html += `<tr>`;
        if (hasSkills) {
            html += `<td${hasLanguages ? ' width="60%"' : ''} style="vertical-align:top;padding:0 8px 0 4px;">`;
            html += sectionHeader(t.sections.skills, primary);
            html += `<p style="font-size:10pt;color:#444444;">${renderSkillsList(data.skills, 'inline')}</p>`;
            html += `</td>`;
        }
        if (hasLanguages) {
            html += `<td${hasSkills ? ' width="40%"' : ''} style="vertical-align:top;padding:0 4px 0 8px;">`;
            html += sectionHeader(t.sections.languages, primary);
            html += `<p style="font-size:10pt;color:#444444;">`;
            html += data.languages.map(l => `${escapeHtml(l.name)} (${getLanguageProficiencyText(l.proficiency, t.labels)})`).join('<br />');
            html += `</p>`;
            html += `</td>`;
        }
        html += `</tr></table>`;
    }

    // Certifications
    if (data.certifications?.length) {
        html += `<div style="${bodyPadding}">`;
        html += sectionHeader(t.sections.certifications, primary);
        for (const cert of data.certifications) {
            html += `<p style="margin:0 0 4px 0;font-size:10pt;"><strong>${escapeHtml(cert.name)}</strong> — ${escapeHtml(cert.issuer)}${cert.date ? ', ' + escapeHtml(cert.date) : ''}</p>`;
        }
        html += `</div>`;
    }

    return html;
}

function sectionHeader(title: string, color: string): string {
    return `<p style="margin:12px 0 6px 0;font-size:13pt;font-weight:bold;color:${color};border-bottom:1px solid ${color};padding-bottom:3px;text-transform:uppercase;letter-spacing:1px;">${escapeHtml(title)}</p>`;
}

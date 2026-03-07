/**
 * DOCX Sidebar Template
 * Two-column table: left sidebar (dark bg, photo, contact, skills) + right main content
 */

import { PdfResumeData, PdfTheme, PdfTranslations } from '../../types/pdf';
import {
    escapeHtml, formatDescription, formatDateRange, buildContactList,
    renderProfileImage, renderSkillsList, getLanguageProficiencyText,
    getContrastText, getTranslations, DOCX_FONTS,
} from './shared/docxHelpers';

export function renderDocxSidebar(
    data: PdfResumeData,
    theme: PdfTheme,
    translations?: PdfTranslations,
    locale?: string
): string {
    const t = getTranslations(translations);
    const pi = data.personalInfo;
    const primary = theme.primary || '#1e3a8a';
    const sidebarText = getContrastText(primary);

    let sidebar = '';
    let main = '';

    // === SIDEBAR (left column) ===

    // Profile image
    if (pi.profileImage) {
        sidebar += `<div style="text-align:center;margin-bottom:12px;">`;
        sidebar += renderProfileImage(pi.profileImage, 90, pi.imageShape || 'circle');
        sidebar += `</div>`;
    }

    // Name in sidebar
    sidebar += `<p style="margin:0 0 2px 0;font-size:14pt;font-weight:bold;color:${sidebarText};text-align:center;">${escapeHtml(pi.fullName)}</p>`;
    if (pi.jobTitle) {
        sidebar += `<p style="margin:0 0 12px 0;font-size:9pt;color:${sidebarText};opacity:0.85;text-align:center;">${escapeHtml(pi.jobTitle)}</p>`;
    }

    // Contact section
    sidebar += sidebarSectionHeader(t.sections.contact, sidebarText);
    sidebar += buildContactList(pi, sidebarText);
    sidebar += `<br />`;

    // Skills in sidebar
    if (data.skills?.length) {
        sidebar += sidebarSectionHeader(t.sections.skills, sidebarText);
        sidebar += `<ul style="margin:0 0 8px 0;padding-left:16px;">`;
        for (const skill of data.skills) {
            sidebar += `<li style="margin:0 0 2px 0;font-size:9pt;color:${sidebarText};">${escapeHtml(skill.name)}</li>`;
        }
        sidebar += `</ul>`;
    }

    // Languages in sidebar
    if (data.languages?.length) {
        sidebar += sidebarSectionHeader(t.sections.languages, sidebarText);
        for (const lang of data.languages) {
            sidebar += `<p style="margin:0 0 3px 0;font-size:9pt;color:${sidebarText};">${escapeHtml(lang.name)} — ${getLanguageProficiencyText(lang.proficiency, t.labels)}</p>`;
        }
        sidebar += `<br />`;
    }

    // Interests in sidebar
    if (data.interests?.length) {
        sidebar += sidebarSectionHeader(t.sections.interests, sidebarText);
        for (const interest of data.interests) {
            sidebar += `<p style="margin:0 0 2px 0;font-size:9pt;color:${sidebarText};">&#8226; ${escapeHtml(interest.name)}</p>`;
        }
    }

    // === MAIN CONTENT (right column) ===

    // Summary
    if (pi.summary) {
        main += mainSectionHeader(t.sections.summary, primary);
        main += `<p style="font-size:10pt;color:#444444;margin:0 0 12px 0;">${formatDescription(pi.summary)}</p>`;
    }

    // Experience
    if (data.experience?.length) {
        main += mainSectionHeader(t.sections.workExperience, primary);
        for (const exp of data.experience) {
            main += `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">`;
            main += `<tr>`;
            main += `<td style="vertical-align:top;">`;
            main += `<p style="margin:0;font-size:11pt;font-weight:bold;color:#222222;">${escapeHtml(exp.title)}</p>`;
            main += `<p style="margin:0 0 3px 0;font-size:9pt;color:${primary};">${escapeHtml(exp.company)}${exp.city ? ', ' + escapeHtml(exp.city) : ''}</p>`;
            main += `</td>`;
            main += `<td style="vertical-align:top;text-align:right;white-space:nowrap;width:120px;">`;
            main += `<p style="margin:0;font-size:8pt;color:#888888;">${formatDateRange(exp.startDate, exp.endDate, exp.current, t.labels.present, locale)}</p>`;
            main += `</td>`;
            main += `</tr></table>`;
            if (exp.description) {
                main += `<p style="font-size:9pt;color:#444444;margin:0 0 8px 0;">${formatDescription(exp.description)}</p>`;
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
            main += `<p style="margin:0;font-size:11pt;font-weight:bold;color:#222222;">${escapeHtml(edu.school)}</p>`;
            main += `<p style="margin:0;font-size:9pt;color:#555555;">${escapeHtml(edu.degree)}</p>`;
            main += `</td>`;
            main += `<td style="vertical-align:top;text-align:right;white-space:nowrap;width:120px;">`;
            main += `<p style="margin:0;font-size:8pt;color:#888888;">${formatDateRange(edu.startDate, edu.endDate, edu.current, t.labels.present, locale)}</p>`;
            main += `</td>`;
            main += `</tr></table>`;
            if (edu.description) {
                main += `<p style="font-size:9pt;color:#444444;margin:0 0 6px 0;">${formatDescription(edu.description)}</p>`;
            }
        }
    }

    // Certifications
    if (data.certifications?.length) {
        main += mainSectionHeader(t.sections.certifications, primary);
        for (const cert of data.certifications) {
            main += `<p style="margin:0 0 4px 0;font-size:9pt;"><strong>${escapeHtml(cert.name)}</strong> — ${escapeHtml(cert.issuer)}${cert.date ? ', ' + escapeHtml(cert.date) : ''}</p>`;
        }
        main += `<br />`;
    }

    // Awards
    if (data.awards?.length) {
        main += mainSectionHeader(t.sections.awards, primary);
        for (const award of data.awards) {
            main += `<p style="margin:0 0 4px 0;font-size:9pt;"><strong>${escapeHtml(award.title)}</strong> — ${escapeHtml(award.issuer)}${award.date ? ', ' + escapeHtml(award.date) : ''}</p>`;
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

function sidebarSectionHeader(title: string, color: string): string {
    return `<p style="margin:8px 0 4px 0;font-size:10pt;font-weight:bold;color:${color};text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid ${color};padding-bottom:2px;">${title}</p>`;
}

function mainSectionHeader(title: string, color: string): string {
    return `<p style="margin:10px 0 6px 0;font-size:12pt;font-weight:bold;color:${color};border-bottom:1px solid ${color};padding-bottom:3px;text-transform:uppercase;letter-spacing:1px;">${title}</p>`;
}

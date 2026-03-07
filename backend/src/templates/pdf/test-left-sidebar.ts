/**
 * Test Left Sidebar Template
 * Experimental template to fix sidebar background on multi-page PDFs
 */

import { PdfResumeData, PdfTheme, PdfTranslations } from '../../types/pdf';
import {
    getFontFamily,
    escapeHtml,
    formatDescription,
    getIconSVG,
    IconName,
    translateProficiency,
} from './shared/helpers';
import { getTranslations } from './shared/translations';
import { formatLocalizedDate } from './shared/dateUtils';

export const renderTestLeftSidebar = (data: PdfResumeData, theme: PdfTheme, translations?: PdfTranslations, locale: string = 'en'): string => {
    const t = getTranslations(translations);
    const {
        personalInfo,
        experience = [],
        education = [],
        skills = [],
        languages = [],
        certifications = [],
        awards = [],
        fonts,
    } = data;

    const headingFont = getFontFamily(fonts?.heading || 'Roboto');
    const bodyFont = getFontFamily(fonts?.body || 'Roboto');

    // Fixed colors
    const sidebarBg = '#0f172a'; // Dark navy
    const sidebarText = '#e2e8f0'; // Light text
    const mainText = '#334155';
    const accentColor = theme.primary || '#3b82f6';

    // Contact items
    const contactItems = [
        { value: personalInfo.phone, icon: 'phone' },
        { value: personalInfo.email, icon: 'email' },
        { value: personalInfo.location, icon: 'location' },
        { value: personalInfo.website, icon: 'website' }
    ].filter(item => item.value);

    // Profile Image
    const photoSize = 100;
    const profileImage = personalInfo.profileImage ? `
        <img
            src="${personalInfo.profileImage}"
            alt="${escapeHtml(personalInfo.fullName)}"
            style="width: ${photoSize}px; height: ${photoSize}px; border-radius: 50%; object-fit: cover; border: 3px solid ${accentColor};"
        />
    ` : `
        <div style="width: ${photoSize}px; height: ${photoSize}px; border-radius: 50%; background-color: ${accentColor}20; border: 3px solid ${accentColor}; display: flex; align-items: center; justify-content: center; font-family: ${headingFont}; font-size: 36px; color: ${accentColor}; font-weight: 700;">
            ${escapeHtml(personalInfo.fullName?.charAt(0) || '?')}
        </div>
    `;

    // Section headers
    const SidebarHeader = (title: string) => `
        <h3 style="font-family: ${headingFont}; font-size: 12px; font-weight: 700; color: ${accentColor}; text-transform: uppercase; margin: 0 0 12px 0; padding-bottom: 4px; border-bottom: 1px solid ${accentColor}40;">
            ${title}
        </h3>
    `;

    const MainHeader = (title: string) => `
        <h3 style="font-family: ${headingFont}; font-size: 14px; font-weight: 700; color: ${sidebarBg}; text-transform: uppercase; margin: 0 0 12px 0; padding-bottom: 4px; border-bottom: 2px solid ${accentColor};">
            ${title}
        </h3>
    `;

    // SOLUTION: Use position:fixed for sidebar background (repeats on every printed page)
    // Combined with @page { margin: 0 } so fixed element fills entire physical page
    return `
        <style>
            /* CRITICAL: Zero page margins so fixed elements fill physical page */
            @page {
                size: A4;
                margin: 0 !important;
            }

            /* Fixed sidebar background - appears on EVERY page */
            .sidebar-bg {
                position: fixed;
                top: -2px;
                left: 0;
                width: 35%;
                height: calc(100% + 4px);
                background-color: ${sidebarBg};
                z-index: 0;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }

            /* Main content wrapper - flex layout */
            .test-layout {
                display: flex;
                width: 100%;
                min-height: 297mm;
                position: relative;
                z-index: 1;
            }

            /* Sidebar content - transparent bg (fixed element provides color) */
            .test-sidebar {
                width: 35%;
                flex-shrink: 0;
                color: ${sidebarText};
                padding: 40px 28px;
                position: relative;
                z-index: 1;
            }

            /* Main content area */
            .test-main {
                flex: 1;
                background-color: #ffffff;
                color: ${mainText};
                position: relative;
                z-index: 1;
            }
        </style>

        <!-- FIXED SIDEBAR BACKGROUND - repeats on every page -->
        <div class="sidebar-bg"></div>

        <div class="test-layout">
            <!-- SIDEBAR CONTENT -->
            <div class="test-sidebar">
                <!-- Photo -->
                <div style="margin-bottom: 32px; text-align: center;">
                    ${profileImage}
                </div>

                <!-- Contact -->
                <div style="margin-bottom: 28px;">
                    ${SidebarHeader(t.sections.contact)}
                    <div style="font-size: 11px; display: flex; flex-direction: column; gap: 10px;">
                        ${contactItems.map(item => `
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <span style="color: ${accentColor};">${getIconSVG(item.icon as IconName, accentColor, 12)}</span>
                                <span style="word-break: break-all;">${escapeHtml(item.value!)}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Education -->
                ${education.length > 0 ? `
                    <div style="margin-bottom: 28px;">
                        ${SidebarHeader(t.sections.education)}
                        <div style="display: flex; flex-direction: column; gap: 12px;">
                            ${education.map(edu => `
                                <div>
                                    <div style="font-weight: 700; font-size: 12px; color: #ffffff;">
                                        ${escapeHtml(edu.degree)}
                                        ${edu.gpa ? `<span style="margin-left: 6px; font-weight: 400; opacity: 0.8;">GPA: ${escapeHtml(edu.gpa)}</span>` : ''}
                                    </div>
                                    <div style="font-size: 11px; color: ${accentColor};">${escapeHtml(edu.school)}</div>
                                    <div style="font-size: 10px; opacity: 0.8;">${formatLocalizedDate(edu.startDate, locale)} – ${edu.endDate ? formatLocalizedDate(edu.endDate, locale) : t.labels.present}</div>
                                    ${edu.honors ? `<div style="font-size: 10px; color: #cbd5e1; opacity: 0.8; margin-top: 2px;">${escapeHtml(edu.honors)}</div>` : ''}
                                    ${edu.clubs ? `<div style="font-size: 9px; color: #94a3b8; opacity: 0.7; margin-top: 1px;">Activities: ${escapeHtml(edu.clubs)}</div>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Skills -->
                ${skills.length > 0 ? `
                    <div style="margin-bottom: 28px;">
                        ${SidebarHeader(t.sections.skills)}
                        <div style="display: flex; flex-direction: column; gap: 8px;">
                            ${skills.map(skill => `
                                <div>
                                    <div style="font-size: 11px; margin-bottom: 3px;">${escapeHtml(skill.name)}</div>
                                    <div style="width: 100%; height: 4px; background-color: ${accentColor}30; border-radius: 2px;">
                                        <div style="width: ${skill.level * 20}%; height: 100%; background-color: ${accentColor}; border-radius: 2px;"></div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Languages -->
                ${languages.length > 0 ? `
                    <div>
                        ${SidebarHeader(t.sections.languages)}
                        <div style="font-size: 11px; display: flex; flex-wrap: wrap; gap: 6px;">
                            ${languages.map(lang => `
                                <span>${escapeHtml(lang.name)} <span style="color: ${accentColor};">(${escapeHtml(translateProficiency(lang.proficiency, t.labels))})</span></span>
                            `).join(' • ')}
                        </div>
                    </div>
                ` : ''}
            </div>

            <!-- MAIN CONTENT AREA -->
            <div class="test-main">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead><tr><td style="height: 20px;"></td></tr></thead>
                    <tfoot><tr><td style="height: 20px;"></td></tr></tfoot>
                    <tbody>
                        <tr>
                            <td style="padding: 20px 36px; vertical-align: top;">

                <!-- Header -->
                <div style="margin-bottom: 32px;">
                    <h1 style="font-family: ${headingFont}; font-size: 28px; font-weight: 800; color: ${sidebarBg}; text-transform: uppercase; margin: 0 0 6px 0;">
                        ${escapeHtml(personalInfo.fullName || 'Your Name')}
                    </h1>
                    <p style="font-family: ${headingFont}; font-size: 14px; color: ${accentColor}; text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em; margin: 0;">
                        ${escapeHtml(personalInfo.jobTitle || 'Job Title')}
                    </p>
                </div>

                <!-- Profile -->
                ${personalInfo.summary ? `
                    <div style="margin-bottom: 24px;">
                        ${MainHeader(t.sections.profile)}
                        <p style="line-height: 1.5; font-size: 11px; color: #475569;">
                            ${formatDescription(personalInfo.summary)}
                        </p>
                    </div>
                ` : ''}

                <!-- Experience -->
                ${experience.length > 0 ? `
                    <div style="margin-bottom: 24px;">
                        ${MainHeader(t.sections.experience)}
                        <div style="display: flex; flex-direction: column; gap: 16px;">
                            ${experience.map(exp => `
                                <div>
                                    <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px;">
                                        <h4 style="font-weight: 700; font-size: 12px; color: ${sidebarBg}; margin: 0; text-transform: uppercase;">
                                            ${escapeHtml(exp.title)}
                                        </h4>
                                        <span style="font-size: 10px; color: ${accentColor}; font-weight: 600;">
                                            ${formatLocalizedDate(exp.startDate, locale)} – ${exp.current ? t.labels.present : formatLocalizedDate(exp.endDate, locale)}
                                        </span>
                                    </div>
                                    <div style="font-size: 11px; color: #64748b; margin-bottom: 6px; font-weight: 500;">
                                        ${escapeHtml(exp.company)}${(exp.city || exp.country) ? ` | ${escapeHtml([exp.city, exp.country].filter(Boolean).join(', '))}` : ''}
                                    </div>
                                    <div style="font-size: 11px; line-height: 1.5; color: #475569;">
                                        ${formatDescription(exp.description || '')}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Certifications -->
                ${certifications && certifications.length > 0 ? `
                    <div style="margin-bottom: 24px;">
                        ${MainHeader(t.sections.certifications)}
                        <div style="display: flex; flex-direction: column; gap: 10px;">
                            ${certifications.map(cert => `
                                <div>
                                    <span style="font-weight: 700; font-size: 11px; color: ${sidebarBg};">${escapeHtml(cert.name)}</span>
                                    <span style="font-size: 10px; color: ${accentColor};"> - ${escapeHtml(cert.issuer)}</span>
                                    <span style="font-size: 10px; color: #64748b;"> (${formatLocalizedDate(cert.date, locale)})</span>
                                    ${cert.url ? `<div style="font-size: 9px; color: #6b7280; opacity: 0.7;">${escapeHtml(cert.url)}</div>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Awards -->
                ${awards && awards.length > 0 ? `
                    <div>
                        ${MainHeader(t.sections.awards)}
                        <div style="display: flex; flex-direction: column; gap: 10px;">
                            ${awards.map(award => `
                                <div>
                                    <span style="font-weight: 700; font-size: 11px; color: ${sidebarBg};">${escapeHtml(award.title)}</span>
                                    <span style="font-size: 10px; color: ${accentColor};"> - ${escapeHtml(award.issuer)}</span>
                                    <span style="font-size: 10px; color: #64748b;"> (${formatLocalizedDate(award.date, locale)})</span>
                                    ${award.description ? `<p style="font-size: 10px; color: #475569; margin: 3px 0 0 0;">${formatDescription(award.description)}</p>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
};

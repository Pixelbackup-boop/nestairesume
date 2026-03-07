/**
 * Header Dark Template
 * Ported from frontend/components/templates/layouts/header/HeaderDark.tsx
 */

import { PdfResumeData, PdfTheme, PdfTranslations } from '../../types/pdf';
import {
    getFontFamily,
    escapeHtml,
    formatDescription,
    formatDescriptionWithBullets,
    getIconSVG,
    IconName,
    parseDualColor,
    getContrastText,
    hexToRgba,
    getFontScale,
    translateProficiency,
} from './shared/helpers';
import { getTranslations } from './shared/translations';
import { formatLocalizedDate } from './shared/dateUtils';

export const renderHeaderDark = (data: PdfResumeData, theme: PdfTheme, translations?: PdfTranslations, locale: string = 'en'): string => {
    const t = getTranslations(translations);
    const {
        personalInfo,
        experience = [],
        education = [],
        skills = [],
        languages = [],
        strengths = [],
        interests = [],
        certifications = [],
        awards = [],
        customFields = [],
        fonts
    } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Montserrat');
    const bodyFont = getFontFamily(fonts?.body || 'Open Sans');

    // Font Scaling
    const scale = getFontScale(fonts?.size);
    const s = (px: number) => `${Math.max(5, Math.round(px * scale))}px`;

    // Parse dual color: primary = sidebar bg, secondary = accent
    const { primary: sidebarBg, secondary: accentColor } = parseDualColor(
        data.customThemeColor,
        { primary: '#0f172a', secondary: '#facc15' } // Slate 900 + Yellow 400 defaults
    );

    // Auto-calculate text colors based on backgrounds
    const sidebarText = getContrastText(sidebarBg);
    const mainBg = '#ffffff';
    const textDark = '#334155'; // Slate 700

    // Helper for Sidebar Section Headers
    const SidebarSectionHeader = (title: string) => `
        <h3 style="font-family: ${headingFont}; font-size: ${s(14)}; font-weight: 700; color: ${sidebarText}; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 20px; padding-bottom: 8px; border-bottom: 2px solid ${accentColor};">
            ${title}
        </h3>
    `;

    // Helper for Main Section Headers
    const MainSectionHeader = (title: string) => `
        <h3 style="font-family: ${headingFont}; font-size: ${s(14)}; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 24px; display: flex; align-items: center; gap: 16px;">
            <span style="width: 40px; height: 4px; background-color: ${accentColor}; display: inline-block;"></span>
            ${title}
        </h3>
    `;

    // Profile Image - use flexbox centering (matching frontend)
    const profileImage = personalInfo.profileImage ? `
        <img
            src="${personalInfo.profileImage}"
            alt="${escapeHtml(personalInfo.fullName)}"
            style="width: 140px; height: 140px; border-radius: 50%; object-fit: cover; border: 4px solid ${accentColor};"
        />
    ` : `
        <div style="width: 140px; height: 140px; border-radius: 50%; background-color: ${hexToRgba(sidebarText, 0.1)}; border: 4px solid ${accentColor}; display: flex; align-items: center; justify-content: center; font-size: 48px; color: ${sidebarText};">
            ${escapeHtml(personalInfo.fullName?.charAt(0) || '?')}
        </div>
    `;

    return `
        <!-- Fixed background that covers full page on ALL pages -->
        <div class="sidebar-bg-fixed" style="background-color: ${sidebarBg}; position: fixed; top: -2px; left: 0; width: 33%; height: calc(100% + 4px); min-height: 100vh; z-index: 0; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important;"></div>

        <!-- Flex layout for content structure (matching frontend) -->
        <div style="width: 100%; font-family: ${bodyFont}; font-size: ${s(13)}; color: ${textDark}; display: flex; box-sizing: border-box; position: relative;">


            <!-- Left Sidebar -->
            <aside class="sidebar-content" style="width: 33%; color: ${sidebarText}; padding: 32px 20px; flex-shrink: 0; display: flex; flex-direction: column; align-items: center; position: relative; z-index: 1;">

                <!-- Photo -->
                <div style="margin-bottom: 32px;">
                    ${profileImage}
                </div>

                <!-- Contact Info -->
                <div style="width: 100%; margin-bottom: 40px;">
                    ${SidebarSectionHeader(t.sections.contact)}
                    <div style="font-size: ${s(12)}; display: flex; flex-direction: column; gap: 12px;">
                        ${personalInfo.phone ? `
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <span style="opacity: 0.9;">${getIconSVG('phone', sidebarText, 14)}</span>
                                <span style="word-break: break-all; opacity: 0.9;">${escapeHtml(personalInfo.phone)}</span>
                            </div>
                        ` : ''}
                        ${personalInfo.email ? `
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <span style="opacity: 0.9;">${getIconSVG('email', sidebarText, 14)}</span>
                                <span style="word-break: break-all; opacity: 0.9;">${escapeHtml(personalInfo.email)}</span>
                            </div>
                        ` : ''}
                        ${personalInfo.location ? `
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <span style="opacity: 0.9;">${getIconSVG('location', sidebarText, 14)}</span>
                                <span style="word-break: break-all; opacity: 0.9;">${escapeHtml(personalInfo.location)}</span>
                            </div>
                        ` : ''}
                        ${personalInfo.website ? `
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <span style="opacity: 0.9;">${getIconSVG('website', sidebarText, 14)}</span>
                                <span style="word-break: break-all; opacity: 0.9;">${escapeHtml(personalInfo.website)}</span>
                            </div>
                        ` : ''}
                        ${personalInfo.linkedin ? `
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <span style="opacity: 0.9;">${getIconSVG('linkedin', sidebarText, 14)}</span>
                                <span style="word-break: break-all; opacity: 0.9;">${escapeHtml(personalInfo.linkedin)}</span>
                            </div>
                        ` : ''}
                    </div>
                </div>

                <!-- Personal Details -->
                ${(personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber)) ? `
                    <div style="width: 100%; margin-bottom: 40px;">
                        ${SidebarSectionHeader(t.sections.personalDetails)}
                        <div style="font-size: ${s(12)}; display: flex; flex-direction: column; gap: 8px; color: ${sidebarText};">
                            ${personalInfo.nationality ? `<div><span style="font-weight: 500; color: ${accentColor};">${t.labels.nationality || 'Nationality'}:</span> ${escapeHtml(personalInfo.nationality)}</div>` : ''}
                            ${personalInfo.idType && personalInfo.idNumber ? `
                                <div><span style="font-weight: 500; color: ${accentColor};">${personalInfo.idType === 'id' ? (t.labels.id || 'ID') : personalInfo.idType === 'passport' ? (t.labels.passport || 'Passport') : (t.labels.drivingLicense || 'Driving License')}:</span> ${escapeHtml(personalInfo.idNumber)}</div>
                            ` : ''}
                        </div>
                    </div>
                ` : ''}

                <!-- Skills -->
                ${skills.length > 0 ? `
                    <div style="width: 100%; margin-bottom: 40px;">
                        ${SidebarSectionHeader(t.sections.skills)}
                        <div style="display: flex; flex-direction: column; gap: 10px;">
                            ${skills.map(skill => `
                                <div data-paginate="item">
                                    <div style="margin-bottom: 4px; font-size: ${s(12)}; font-weight: 500;">${escapeHtml(skill.name)}</div>
                                    <div style="width: 100%; height: 6px; background-color: ${hexToRgba(sidebarText, 0.15)}; border-radius: 3px; overflow: hidden;">
                                        <div style="width: ${(skill.level || 3) * 20}%; height: 100%; background-color: ${accentColor};"></div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Strengths -->
                ${strengths && strengths.length > 0 ? `
                    <div style="width: 100%; margin-bottom: 40px;">
                        ${SidebarSectionHeader(t.sections.strengths)}
                        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                            ${strengths.map(str => `
                                <span data-paginate="item" style="background-color: ${hexToRgba(sidebarText, 0.08)}; color: ${accentColor}; padding: 4px 12px; border-radius: 4px; font-size: ${s(11)}; font-weight: 500; border: 1px solid ${hexToRgba(accentColor, 0.25)};">
                                    ${escapeHtml(str.name)}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Interests -->
                ${interests && interests.length > 0 ? `
                    <div style="width: 100%; margin-bottom: 40px;">
                        ${SidebarSectionHeader(t.sections.interests)}
                        <div style="display: flex; flex-wrap: wrap; gap: 12px;">
                            ${interests.map(int => `
                                <span data-paginate="item" style="font-size: ${s(12)}; display: flex; align-items: center; gap: 6px; color: ${sidebarText};">
                                    <span style="color: ${accentColor};">✦</span> ${escapeHtml(int.name)}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

            </aside>

            <!-- Main Content -->
            <main style="flex: 1; background-color: ${mainBg}; position: relative; z-index: 1;">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead><tr><td style="height: 20px;"></td></tr></thead>
                    <tfoot><tr><td style="height: 20px;"></td></tr></tfoot>
                    <tbody>
                        <tr>
                            <td style="padding: 24px 40px 32px 40px; vertical-align: top;">
                
                <!-- Name Header -->
                <div style="margin-bottom: 24px;">
                    <h1 style="font-family: ${headingFont}; font-size: ${s(36)}; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 0.1em; margin: 0; line-height: 1;">
                        ${escapeHtml(personalInfo.fullName || 'Your Name')}
                    </h1>
                    <p style="font-size: ${s(14)}; color: #64748b; text-transform: uppercase; font-weight: 600; margin-top: 10px; letter-spacing: 0.05em;">
                        ${escapeHtml(personalInfo.jobTitle || 'Job Title')}
                    </p>
                </div>

                <!-- Profile -->
                ${personalInfo.summary ? `
                    <section class="resume-section" style="margin-bottom: 40px;">
                        ${MainSectionHeader(t.sections.profile)}
                        <p style="line-height: 1.6; font-size: ${s(13)}; color: #334155;">
                            ${formatDescription(personalInfo.summary)}
                        </p>
                    </section>
                ` : ''}

                <!-- Experience -->
                ${experience.length > 0 ? `
                    <section class="resume-section" style="margin-bottom: 40px;">
                        ${MainSectionHeader(t.sections.experience)}
                        <div style="display: flex; flex-direction: column; gap: 24px;">
                            ${experience.map(exp => `
                                <div data-paginate="item" class="resume-entry">
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 2px; align-items: baseline;">
                                        <h4 style="font-weight: 700; font-size: ${s(15)}; text-transform: uppercase; color: #0f172a; margin: 0;">
                                            ${escapeHtml(exp.title)}
                                        </h4>
                                    </div>
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: ${s(12)}; color: #64748b; font-weight: 600;">
                                        <span>${escapeHtml(exp.company)}${(exp.city || exp.country) ? `, ${escapeHtml([exp.city, exp.country].filter(Boolean).join(', '))}` : ''}</span>
                                        <span>${formatLocalizedDate(exp.startDate, locale)} – ${exp.current ? t.labels.present : formatLocalizedDate(exp.endDate, locale)}</span>
                                    </div>
                                    <div style="font-size: ${s(13)}; line-height: 1.6; color: #334155;">
                                        ${formatDescriptionWithBullets(exp.description || '')}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </section>
                ` : ''}

                <!-- Education -->
                ${education.length > 0 ? `
                    <section class="resume-section" style="margin-bottom: 40px;">
                        ${MainSectionHeader(t.sections.education)}
                        <div style="display: flex; flex-direction: column; gap: 20px;">
                            ${education.map(edu => `
                                <div data-paginate="item" class="resume-entry">
                                    <h4 style="font-weight: 700; font-size: ${s(15)}; color: #0f172a; margin: 0;">
                                        ${escapeHtml(edu.degree)}
                                        ${edu.gpa ? `<span style="margin-left: 8px; opacity: 0.8; font-size: ${s(13)};">GPA: ${escapeHtml(edu.gpa)}</span>` : ''}
                                    </h4>
                                    <p style="font-size: ${s(13)}; color: #475569; font-weight: 500; margin: 2px 0;">
                                        ${escapeHtml(edu.school)}${(edu.city || edu.country) ? `, ${escapeHtml([edu.city, edu.country].filter(Boolean).join(', '))}` : ''}
                                    </p>
                                    <p style="font-size: ${s(12)}; color: #64748b; margin: 0;">
                                        ${formatLocalizedDate(edu.startDate, locale)} – ${edu.endDate ? formatLocalizedDate(edu.endDate, locale) : t.labels.present}
                                    </p>
                                    ${edu.honors ? `<p style="font-size: ${s(11)}; color: #4b5563; opacity: 0.8; margin: 0;">${escapeHtml(edu.honors)}</p>` : ''}
                                    ${edu.clubs ? `<p style="font-size: ${s(10)}; color: #6b7280; opacity: 0.7; margin: 0;">Activities: ${escapeHtml(edu.clubs)}</p>` : ''}

                                    ${edu.description ? `<p style="font-size: ${s(12)}; line-height: 1.6; color: #4b5563; margin-top: 4px;">${formatDescription(edu.description)}</p>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </section>
                ` : ''}

                <!-- Languages -->
                ${languages && languages.length > 0 ? `
                    <section class="resume-section" style="margin-bottom: 40px;">
                        ${MainSectionHeader(t.sections.languages)}
                        <div style="display: flex; flex-wrap: wrap; gap: 12px 24px;">
                            ${languages.map(lang => `
                                <div data-paginate="item" style="font-size: ${s(13)};">
                                    <span style="font-weight: 600; color: #0f172a;">${escapeHtml(lang.name)}</span>
                                    <span style="color: #64748b; margin-left: 6px;">(${escapeHtml(translateProficiency(lang.proficiency, t.labels))})</span>
                                </div>
                            `).join('')}
                        </div>
                    </section>
                ` : ''}

                <!-- Social Links -->
                ${((personalInfo as any).x || (personalInfo as any).github || (personalInfo as any).dribbble || (personalInfo as any).behance || (personalInfo as any).instagram) ? `
                    <section class="resume-section" style="margin-bottom: 40px;">
                        ${MainSectionHeader(t.sections.socialLinks || 'Social Links')}
                        <div style="display: flex; flex-direction: column; gap: 8px; font-size: ${s(13)};">
                            ${(personalInfo as any).x ? `<div data-paginate="item"><span style="font-weight: 600; color: #0f172a;">X:</span> <span style="color: #334155;">${escapeHtml((personalInfo as any).x)}</span></div>` : ''}
                            ${(personalInfo as any).github ? `<div data-paginate="item"><span style="font-weight: 600; color: #0f172a;">GitHub:</span> <span style="color: #334155;">${escapeHtml((personalInfo as any).github)}</span></div>` : ''}
                            ${(personalInfo as any).dribbble ? `<div data-paginate="item"><span style="font-weight: 600; color: #0f172a;">Dribbble:</span> <span style="color: #334155;">${escapeHtml((personalInfo as any).dribbble)}</span></div>` : ''}
                            ${(personalInfo as any).behance ? `<div data-paginate="item"><span style="font-weight: 600; color: #0f172a;">Behance:</span> <span style="color: #334155;">${escapeHtml((personalInfo as any).behance)}</span></div>` : ''}
                            ${(personalInfo as any).instagram ? `<div data-paginate="item"><span style="font-weight: 600; color: #0f172a;">Instagram:</span> <span style="color: #334155;">${escapeHtml((personalInfo as any).instagram)}</span></div>` : ''}
                        </div>
                    </section>
                ` : ''}

                <!-- Credentials -->
                ${(certifications && certifications.length > 0) || (awards && awards.length > 0) ? `
                    <section class="resume-section" style="margin-bottom: 40px;">
                        ${MainSectionHeader(t.sections.credentials)}
                        <div style="display: flex; gap: 40px;">
                            ${certifications && certifications.length > 0 ? `
                                <div style="flex: 1;">
                                    <h4 style="font-size: ${s(13)}; font-weight: 600; color: #64748b; margin-bottom: 12px;">${t.sections.certifications}</h4>
                                    <div style="display: flex; flex-direction: column; gap: 12px;">
                                        ${certifications.map(cert => `
                                            <div data-paginate="item" class="resume-entry">
                                                <div style="font-weight: 700; font-size: ${s(13)}; color: #0f172a;">${escapeHtml(cert.name)}</div>
                                                <div style="font-size: ${s(12)}; color: #64748b;">${escapeHtml(cert.issuer)} • ${formatLocalizedDate(cert.date, locale)}</div>
                                                ${cert.url ? `<div style="font-size: ${s(10)}; color: #6b7280; opacity: 0.7;">${escapeHtml(cert.url)}</div>` : ''}
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}
                            ${awards && awards.length > 0 ? `
                                <div style="flex: 1;">
                                    <h4 style="font-size: ${s(13)}; font-weight: 600; color: #64748b; margin-bottom: 12px;">${t.sections.awards}</h4>
                                    <div style="display: flex; flex-direction: column; gap: 12px;">
                                        ${awards.map(award => `
                                            <div data-paginate="item" class="resume-entry">
                                                <div style="font-weight: 700; font-size: ${s(13)}; color: #0f172a;">${escapeHtml(award.title)}</div>
                                                <div style="font-size: ${s(12)}; color: #64748b;">${escapeHtml(award.issuer)} • ${formatLocalizedDate(award.date, locale)}</div>
                                            
                                                ${award.description ? `<p style="font-size: ${s(11)}; line-height: 1.5; color: #4b5563; margin-top: 2px;">${formatDescription(award.description)}</p>` : ''}
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                    </section>
                ` : ''}




                <!-- Custom Fields -->
                ${customFields.map(field => `
                    <section class="resume-section">
                        ${MainSectionHeader(field.label)}
                        <p style="font-size: ${s(13)}; line-height: 1.6; color: #334155;">${formatDescription(field.content)}</p>
                    </section>
                `).join('')}

                            </td>
                        </tr>
                    </tbody>
                </table>
            </main>
        </div>
    `;
};

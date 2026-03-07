/**
 * Sidebar Monogram Template
 * Ported from frontend/components/templates/layouts/sidebar/SidebarMonogram.tsx
 */

import { PdfResumeData, PdfTheme, PdfTranslations } from '../../types/pdf';
import {
    getFontFamily,
    fontSizes,
    getBackgroundCSS,
    escapeHtml,
    formatDescription,
    getIconSVG,
    IconName,
    getFontScale,
    parseDualColor,
    translateProficiency,
} from './shared/helpers';
import { getTranslations } from './shared/translations';
import { formatLocalizedDate } from './shared/dateUtils';

export const renderSidebarMonogram = (data: PdfResumeData, theme: PdfTheme, translations?: PdfTranslations, locale: string = 'en'): string => {
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
        fonts,
        background
    } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Playfair Display');
    const bodyFont = getFontFamily(fonts?.body || 'Lato');

    // Font Scaling
    const scale = getFontScale(fonts?.size);
    const s = (px: number) => `${Math.max(5, Math.round(px * scale))}px`;
    const sNum = (px: number) => Math.max(5, Math.round(px * scale));

    const fs = {
        name: s(42),
        jobTitle: s(16),
        sidebarHeader: s(14),
        mainHeader: s(16),
        entryTitle: s(14),
        body: s(12),
        small: s(11),
        initials: s(40)
    };

    // Theme colors - matching frontend SidebarMonogram.tsx
    const sidebarBg = '#374151'; // Gray 700 (dark sidebar)
    const mainBg = '#FFFFFF';
    const sidebarText = '#f9fafb'; // Light text for dark background
    const mainText = '#1f2937'; // Gray 800
    const accentColor = parseDualColor(data.customThemeColor, { primary: '#374151', secondary: '#facc15' }).secondary;

    // Monogram helper
    const initials = personalInfo.fullName
        ? personalInfo.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
        : '?';

    // --- Helpers ---
    const SidebarHeader = (title: string) => `
        <h3 style="font-family: ${headingFont}; font-size: ${fs.sidebarHeader}; font-weight: 700; color: ${accentColor}; text-transform: uppercase; margin: 0 0 16px 0; letter-spacing: 0.1em;">
            ${title}
        </h3>
    `;

    const MainHeader = (title: string) => `
        <h3 style="font-family: ${headingFont}; font-size: ${fs.mainHeader}; font-weight: 700; color: #374151; text-transform: uppercase; margin: 0 0 16px 0; padding-bottom: 4px; border-bottom: 2px solid #374151;">
            ${title}
        </h3>
    `;

    const contactItems = [
        { value: personalInfo.phone, icon: 'phone' },
        { value: personalInfo.email, icon: 'email' },
        { value: personalInfo.location, icon: 'location' },
        { value: personalInfo.website, icon: 'website' },
        { value: personalInfo.linkedin, icon: 'linkedin' }
    ].filter(item => item.value);

    return `
        <!-- Fixed background that covers full page on ALL pages -->
        <div class="sidebar-bg-fixed" style="background-color: ${sidebarBg}; position: fixed; top: 0; left: 0; width: 30%; height: 297mm; z-index: 0; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important;"></div>
        <!-- Fixed accent stripe at 30% position (right edge of sidebar) - full page height -->
        <div style="position: fixed; top: 0; left: 30%; width: 8px; height: 297mm; background-color: ${accentColor}; z-index: 2;"></div>

        <!-- Table layout for content structure -->
        <div style="width: 100%; min-height: 100%; font-family: ${bodyFont}; color: ${mainText}; display: table; table-layout: fixed; position: relative;">

            <!-- Sidebar (30%) - table-cell, no border (handled by fixed stripe) -->
            <aside style="display: table-cell; width: 30%; color: ${sidebarText}; padding: 32px 24px; vertical-align: top;">

                <!-- Profile Image or Monogram -->
                <div style="margin-bottom: 32px; display: flex; justify-content: center;">
                    ${personalInfo.profileImage ? `
                        <img
                            src="${personalInfo.profileImage}"
                            alt="${escapeHtml(personalInfo.fullName || 'Profile')}"
                            style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 4px solid ${accentColor}; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);"
                        />
                    ` : `
                        <div style="width: 100px; height: 100px; border-radius: 50%; background-color: ${mainBg}; display: flex; align-items: center; justify-content: center; color: ${sidebarBg}; font-family: ${headingFont}; font-size: ${fs.initials}; font-weight: 700; border: 4px solid ${accentColor};">
                            ${initials}
                        </div>
                    `}
                </div>

                <!-- Contact -->
                <div style="margin-bottom: 40px;">
                    ${SidebarHeader(t.sections.contact)}
                    <div style="font-size: ${fs.body}; display: flex; flex-direction: column; gap: 12px;">
                        ${contactItems.map(item => `
                            <div style="display: flex; gap: 10px; align-items: flex-start;">
                                <span style="color: ${accentColor}; margin-top: 2px;">${getIconSVG(item.icon as IconName, accentColor, sNum(14))}</span>
                                <span style="word-break: break-all;">${escapeHtml(item.value!)}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Personal Details -->
                ${(personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber)) ? `
                    <div style="margin-bottom: 40px;">
                        ${SidebarHeader(t.sections.personalDetails)}
                        <div style="font-size: ${fs.body}; display: flex; flex-direction: column; gap: 8px;">
                            ${personalInfo.nationality ? `<div><span style="color: ${accentColor}; font-weight: 500;">${t.labels.nationality || 'Nationality'}:</span> ${escapeHtml(personalInfo.nationality)}</div>` : ''}
                            ${personalInfo.idType && personalInfo.idNumber ? `
                                <div><span style="color: ${accentColor}; font-weight: 500;">${personalInfo.idType === 'id' ? (t.labels.id || 'ID') : personalInfo.idType === 'passport' ? (t.labels.passport || 'Passport') : (t.labels.drivingLicense || 'Driving License')}:</span> ${escapeHtml(personalInfo.idNumber)}</div>
                            ` : ''}
                        </div>
                    </div>
                ` : ''}

                <!-- Languages -->
                ${languages && languages.length > 0 ? `
                    <div style="margin-bottom: 40px;">
                        ${SidebarHeader(t.sections.languages)}
                        <div style="display: flex; flex-direction: column; gap: 8px; font-size: ${fs.body};">
                            ${languages.map(lang => `
                                <div data-paginate="item" style="display: flex; justify-content: space-between; align-items: center;">
                                    <span>${escapeHtml(lang.name)}</span>
                                    ${lang.proficiency ? `<span style="color: ${accentColor}; font-weight: 500;">${escapeHtml(translateProficiency(lang.proficiency, t.labels))}</span>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Strengths -->
                ${strengths && strengths.length > 0 ? `
                    <div style="margin-bottom: 40px;">
                        ${SidebarHeader(t.sections.strengths)}
                        <div style="display: flex; flex-direction: column; gap: 8px;">
                            ${strengths.map(str => `
                                <div data-paginate="item">
                                    <div style="font-size: ${fs.body}; margin-bottom: 4px; color: ${sidebarText};">
                                        ${escapeHtml(str.name)}
                                    </div>
                                    <div style="width: 100%; height: 5px; background-color: #6b7280; border-radius: 3px;">
                                        <div style="width: ${(str as any).level ?? 80}%; height: 100%; background-color: ${accentColor}; border-radius: 3px;"></div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

            </aside>

            <!-- Main Content (70%) - table-cell for equal height -->
            <main style="display: table-cell; width: 70%; vertical-align: top; background-color: ${mainBg};">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead><tr><td style="height: 20px;"></td></tr></thead>
                    <tfoot><tr><td style="height: 20px;"></td></tr></tfoot>
                    <tbody>
                        <tr>
                            <td style="padding: 24px 48px; vertical-align: top;">

                <!-- Header -->
                <div style="margin-bottom: 32px; border-bottom: 1px solid ${accentColor}; padding-bottom: 16px;">
                    <h1 style="font-family: ${headingFont}; font-size: ${fs.name}; font-weight: 700; color: #111827; text-transform: uppercase; margin: 0 0 8px 0; letter-spacing: 0.05em;">
                        ${escapeHtml(personalInfo.fullName || 'Your Name')}
                    </h1>
                    <p style="font-family: ${headingFont}; font-size: ${fs.jobTitle}; color: #4b5563; text-transform: uppercase; font-weight: 500; letter-spacing: 0.2em; margin: 0;">
                        ${escapeHtml(personalInfo.jobTitle || 'Job Title')}
                    </p>
                </div>

                <!-- Profile -->
                ${personalInfo.summary ? `
                    <div class="resume-section" style="margin-bottom: 24px;">
                        ${MainHeader(t.sections.profile)}
                        <p style="line-height: 1.6; font-size: ${fs.body}; color: #4b5563;">
                            ${formatDescription(personalInfo.summary)}
                        </p>
                    </div>
                ` : ''}

                <!-- Experience -->
                ${experience.length > 0 ? `
                    <div class="resume-section" style="margin-bottom: 24px;">
                        ${MainHeader(t.sections.experience)}
                        <div style="display: flex; flex-direction: column; gap: 24px;">
                            ${experience.map(exp => `
                                <div data-paginate="item">
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                                        <h4 style="font-weight: 800; font-size: ${fs.entryTitle}; color: ${mainText}; margin: 0; text-transform: uppercase;">
                                            ${escapeHtml(exp.title)}
                                        </h4>
                                        <span style="font-size: ${fs.small}; color: #374151; font-weight: 600;">
                                            ${formatLocalizedDate(exp.startDate, locale)} – ${exp.current ? t.labels.present : formatLocalizedDate(exp.endDate, locale)}
                                        </span>
                                    </div>
                                    <div style="font-size: ${fs.body}; color: #6b7280; margin-bottom: 8px; font-weight: 600;">
                                        ${escapeHtml(exp.company)}${(exp.city || exp.country) ? ` | ${escapeHtml([exp.city, exp.country].filter(Boolean).join(', '))}` : ''}
                                    </div>
                                    <div style="font-size: ${fs.body}; line-height: 1.6; color: #4b5563;">
                                        ${formatDescription(exp.description || '')}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Education -->
                ${education.length > 0 ? `
                    <div class="resume-section" style="margin-bottom: 24px;">
                        ${MainHeader(t.sections.education)}
                        <div style="display: flex; flex-direction: column; gap: 16px;">
                            ${education.map(edu => `
                                <div data-paginate="item">
                                    <h4 style="font-weight: 700; font-size: ${fs.entryTitle}; color: #111827; margin: 0;">
                                        ${escapeHtml(edu.degree)}
                                        ${edu.gpa ? `<span style="margin-left: 8px; opacity: 0.8; font-weight: 500;">GPA: ${escapeHtml(edu.gpa)}</span>` : ''}
                                    </h4>
                                    <div style="font-size: ${fs.body}; color: #4b5563;">
                                        ${escapeHtml(edu.school)}${(edu.city || edu.country) ? `, ${escapeHtml([edu.city, edu.country].filter(Boolean).join(', '))}` : ''}
                                    </div>
                                    <div style="font-size: ${fs.small}; color: #6b7280;">
                                        ${formatLocalizedDate(edu.startDate, locale)} – ${edu.endDate ? formatLocalizedDate(edu.endDate, locale) : t.labels.present}
                                    </div>
                                    ${edu.honors ? `<p style="font-size: ${s(11)}; color: #4b5563; opacity: 0.8; margin: 0;">${escapeHtml(edu.honors)}</p>` : ''}
                                    ${edu.clubs ? `<p style="font-size: ${s(10)}; color: #6b7280; opacity: 0.7; margin: 0;">Activities: ${escapeHtml(edu.clubs)}</p>` : ''}

                                    ${edu.description ? `<p style="font-size: ${s(12)}; line-height: 1.6; color: #4b5563; margin-top: 4px;">${formatDescription(edu.description)}</p>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Skills -->
                ${skills.length > 0 ? `
                    <div class="resume-section" style="margin-bottom: 24px;">
                        ${MainHeader(t.sections.skills)}
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                            ${skills.map(skill => `
                                <div data-paginate="item">
                                    <div style="display: flex; justify-content: space-between; font-size: ${fs.body}; margin-bottom: 4px;">
                                        <span style="font-weight: 500; color: #374151;">${escapeHtml(skill.name)}</span>
                                    </div>
                                    <div style="width: 100%; height: 6px; background-color: #e5e7eb; border-radius: 3px;">
                                        <div style="width: ${(skill.level || 3) * 20}%; height: 100%; background-color: ${accentColor}; border-radius: 3px;"></div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Interests -->
                ${interests && interests.length > 0 ? `
                    <div class="resume-section" style="margin-bottom: 24px;">
                        ${MainHeader(t.sections.interests)}
                        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                            ${interests.map(int => `
                                <div data-paginate="item" style="display: flex; align-items: center; gap: 8px; font-size: ${fs.body};">
                                    <span style="color: ${accentColor}; font-size: 8px;">●</span>
                                    <span style="font-weight: 500;">${escapeHtml(int.name)}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Social Links -->
                ${((personalInfo as any).x || (personalInfo as any).github || (personalInfo as any).dribbble || (personalInfo as any).behance || (personalInfo as any).instagram) ? `
                    <div class="resume-section" style="margin-bottom: 24px;">
                        ${MainHeader(t.sections.socialLinks)}
                        <div style="font-size: ${fs.body};">
                            ${(personalInfo as any).x ? `<div data-paginate="item" style="margin-bottom: 8px;"><span style="font-weight: 600;">X:</span> ${escapeHtml((personalInfo as any).x)}</div>` : ''}
                            ${(personalInfo as any).github ? `<div data-paginate="item" style="margin-bottom: 8px;"><span style="font-weight: 600;">GitHub:</span> ${escapeHtml((personalInfo as any).github)}</div>` : ''}
                            ${(personalInfo as any).dribbble ? `<div data-paginate="item" style="margin-bottom: 8px;"><span style="font-weight: 600;">Dribbble:</span> ${escapeHtml((personalInfo as any).dribbble)}</div>` : ''}
                            ${(personalInfo as any).behance ? `<div data-paginate="item" style="margin-bottom: 8px;"><span style="font-weight: 600;">Behance:</span> ${escapeHtml((personalInfo as any).behance)}</div>` : ''}
                            ${(personalInfo as any).instagram ? `<div data-paginate="item" style="margin-bottom: 8px;"><span style="font-weight: 600;">Instagram:</span> ${escapeHtml((personalInfo as any).instagram)}</div>` : ''}
                        </div>
                    </div>
                ` : ''}

                <!-- Credentials (Certifications & Awards) -->
                ${(certifications.length > 0 || awards.length > 0) ? `
                    <div class="resume-section" style="margin-top: 24px;">
                        ${MainHeader(t.sections.credentials)}

                        ${certifications.length > 0 ? `
                            <div style="margin-bottom: ${awards.length > 0 ? '24px' : '0'};">
                                <h4 style="font-size: 13px; font-weight: 600; color: #4b5563; margin: 0 0 12px 0;">
                                    ${t.sections.certifications}
                                </h4>
                                <div style="display: flex; flex-direction: column; gap: 12px;">
                                    ${certifications.map(cert => `
                                        <div data-paginate="item">
                                            <div style="font-weight: 600; font-size: ${fs.body}; color: ${mainText};">
                                                ${escapeHtml(cert.name)}
                                            </div>
                                            <div style="font-size: ${fs.small}; color: #6b7280;">
                                                ${escapeHtml(cert.issuer)} • ${formatLocalizedDate(cert.date, locale)}
                                            </div>
                                            ${cert.url ? `<div style="font-size: ${s(10)}; color: #6b7280; opacity: 0.7;">${escapeHtml(cert.url)}</div>` : ''}
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}

                        ${awards.length > 0 ? `
                            <div>
                                <h4 style="font-size: 13px; font-weight: 600; color: #4b5563; margin: 0 0 12px 0;">
                                    ${t.sections.awards}
                                </h4>
                                <div style="display: flex; flex-direction: column; gap: 12px;">
                                    ${awards.map(award => `
                                        <div data-paginate="item">
                                            <div style="font-weight: 600; font-size: ${fs.body}; color: ${mainText};">
                                                ${escapeHtml(award.title)}
                                            </div>
                                            <div style="font-size: ${fs.small}; color: #6b7280;">
                                                ${escapeHtml(award.issuer)} • ${formatLocalizedDate(award.date, locale)}
                                            </div>
                                            ${award.description ? `
                                                <p style="font-size: ${fs.small}; color: #374151; margin: 4px 0 0 0; line-height: 1.5;">
                                                    ${formatDescription(award.description)}
                                                </p>
                                            ` : ''}
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}
                    </div>
                ` : ''}

                <!-- Custom Fields -->
                ${customFields.map(field => `
                    <div class="resume-section" style="margin-top: 24px;">
                        ${MainHeader(field.label)}
                        <p style="line-height: 1.6; font-size: ${fs.body}; color: #4b5563;">
                            ${formatDescription(field.content)}
                        </p>
                    </div>
                `).join('')}

                            </td>
                        </tr>
                    </tbody>
                </table>
            </main>
        </div>
    `;
};

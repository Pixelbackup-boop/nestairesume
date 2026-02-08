/**
 * Sidebar Dark Navy Template
 * Ported from frontend/components/templates/layouts/sidebar/SidebarDarkNavy.tsx
 */

import { PdfResumeData, PdfTheme, PdfTranslations } from '../../types/pdf';
import {
    getFontFamily,
    fontSizes,
    getBackgroundCSS,
    escapeHtml,
    formatDescription,
    getIconSVG,
    getFontScale,
    IconName
} from './shared/helpers';
import { getTranslations } from './shared/translations';
import { formatLocalizedDate } from './shared/dateUtils';

export const renderSidebarDarkNavy = (data: PdfResumeData, theme: PdfTheme, translations?: PdfTranslations, locale: string = 'en'): string => {
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
    const headingFont = getFontFamily(fonts?.heading || 'Roboto');
    const bodyFont = getFontFamily(fonts?.body || 'Roboto');

    // Font Scaling
    const scale = getFontScale(fonts?.size);
    const s = (px: number) => `${Math.max(5, Math.round(px * scale))}px`;

    const fs = {
        name: s(32),
        jobTitle: s(14),
        sectionHeading: s(14),
        sidebarHeading: s(13),
        entryTitle: s(12),
        body: s(11),
        small: s(10),
        tiny: s(9)
    };

    // Fixed colors based on frontend
    const sidebarBg = '#0f172a'; // Slate 900
    const mainBg = '#FFFFFF';
    const sidebarText = '#e2e8f0'; // Slate 200
    const mainText = '#334155'; // Slate 700
    const accentColor = theme.primary || '#059669'; // Emerald 600 default (was Blue 500)

    // --- Helpers ---
    const SidebarHeader = (title: string) => `
        <h3 style="font-family: ${headingFont}; font-size: ${fs.sidebarHeading}; font-weight: 700; color: ${accentColor}; text-transform: uppercase; margin: 0 0 16px 0; padding-bottom: 4px; border-bottom: 1px solid ${accentColor}40;">
            ${title}
        </h3>
    `;

    const MainHeader = (title: string) => `
        <h3 style="font-family: ${headingFont}; font-size: ${fs.sectionHeading}; font-weight: 700; color: ${sidebarBg}; text-transform: uppercase; margin: 0 0 16px 0; padding-bottom: 4px; border-bottom: 2px solid ${accentColor};">
            ${title}
        </h3>
    `;

    // Profile Image
    const photoSize = 120;
    const profileImage = personalInfo.profileImage ? `
        <img
            src="${personalInfo.profileImage}"
            alt="${escapeHtml(personalInfo.fullName)}"
            style="width: ${photoSize}px; height: ${photoSize}px; border-radius: 50%; object-fit: cover; border: 4px solid ${accentColor};"
        />
    ` : `
        <div style="width: ${photoSize}px; height: ${photoSize}px; border-radius: 50%; background-color: ${accentColor}20; border: 4px solid ${accentColor}; display: flex; align-items: center; justify-content: center; font-family: ${headingFont}; font-size: 48px; color: ${accentColor}; font-weight: 700;">
            ${escapeHtml(personalInfo.fullName?.charAt(0) || '?')}
        </div>
    `;

    const contactItems = [
        { value: personalInfo.phone, icon: 'phone' },
        { value: personalInfo.email, icon: 'email' },
        { value: personalInfo.location, icon: 'location' },
        { value: personalInfo.website, icon: 'website' }
    ].filter(item => item.value);

    return `
        <!-- Fixed sidebar background - OUTSIDE flex, repeats on all pages -->
        <div class="sidebar-bg-fixed" style="background-color: ${sidebarBg}; position: fixed; top: -2px; left: 0; width: 35%; height: calc(100% + 4px); min-height: 100vh; z-index: 0; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important;"></div>

        <div style="width: 100%; min-height: 100%; font-family: ${bodyFont}; display: flex; position: relative;">

            <!-- Sidebar (35%) -->
            <aside class="sidebar-content" style="width: 35%; color: ${sidebarText}; padding: 48px 32px; flex-shrink: 0; min-height: 100%; position: relative; z-index: 1;">
                
                <!-- Photo -->
                <div style="margin-bottom: 48px; display: flex; justify-content: center;">
                    ${profileImage}
                </div>

                <!-- Contact -->
                <div style="margin-bottom: 40px;">
                    ${SidebarHeader(t.sections.contact)}
                    <div style="font-size: ${fs.body}; display: flex; flex-direction: column; gap: 12px; color: ${sidebarText};">
                        ${contactItems.map(item => `
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <span style="color: ${accentColor};">${getIconSVG(item.icon as IconName, accentColor, 14)}</span>
                                <span style="word-break: break-all; color: ${sidebarText};">${escapeHtml(item.value!)}</span>
                            </div>
                        `).join('')}
                        

                    </div>
                </div>

                <!-- Personal Details -->
                ${(personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber)) ? `
                    <div style="margin-bottom: 40px;">
                        ${SidebarHeader(t.sections.personalDetails)}
                        <div style="font-size: 11px; display: flex; flex-direction: column; gap: 8px; color: ${sidebarText};">
                            ${personalInfo.nationality ? `<div><span style="font-weight: 500; color: ${accentColor};">Nationality:</span> ${escapeHtml(personalInfo.nationality)}</div>` : ''}
                            ${personalInfo.idType && personalInfo.idNumber ? `
                                <div><span style="font-weight: 500; color: ${accentColor};">${personalInfo.idType === 'id' ? 'ID' : personalInfo.idType === 'passport' ? 'Passport' : 'Driving License'}:</span> ${escapeHtml(personalInfo.idNumber)}</div>
                            ` : ''}
                        </div>
                    </div>
                ` : ''}



                <!-- Skills -->
                ${skills.length > 0 ? `
                    <div>
                        ${SidebarHeader(t.sections.skills)}
                        <div style="display: flex; flex-direction: column; gap: 10px; color: ${sidebarText};">
                            ${skills.map(skill => `
                                <div>
                                    <div style="display: flex; justify-content: space-between; font-size: ${fs.entryTitle}; margin-bottom: 4px;">
                                        <span style="font-weight: 500; color: ${sidebarText};">${escapeHtml(skill.name)}</span>
                                    </div>
                                    <div style="width: 100%; height: 4px; background-color: ${accentColor}30; border-radius: 2px;">
                                        <div style="width: ${skill.level * 20}%; height: 100%; background-color: ${accentColor}; border-radius: 2px;"></div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Strengths -->
                ${strengths && strengths.length > 0 ? `
                    <div style="width: 100%; margin-top: 20px;">
                        ${SidebarHeader(t.sections.strengths)}
                        <div style="display: flex; flex-direction: column; gap: 10px; color: ${sidebarText};">
                            ${strengths.map(str => `
                                <div>
                                    <div style="display: flex; justify-content: space-between; font-size: ${fs.entryTitle}; margin-bottom: 4px;">
                                        <span style="font-weight: 500; color: ${sidebarText};">${escapeHtml(str.name)}</span>
                                    </div>
                                    <div style="width: 100%; height: 4px; background-color: ${accentColor}30; border-radius: 2px;">
                                        <div style="width: ${str.level}%; height: 100%; background-color: ${accentColor}; border-radius: 2px;"></div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

            </aside>

            <!-- Main Content (65%) -->
            <main style="flex: 1; background-color: ${mainBg}; color: ${mainText};">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead><tr><td style="height: 20px;"></td></tr></thead>
                    <tfoot><tr><td style="height: 20px;"></td></tr></tfoot>
                    <tbody>
                        <tr>
                            <td style="padding: 20px 48px; vertical-align: top;">
                
                <!-- Header -->
                <div style="margin-bottom: 48px; border-bottom: 2px solid ${accentColor}; padding-bottom: 20px;">
                    <h1 style="font-family: ${headingFont}; font-size: ${fs.name}; font-weight: 800; color: ${sidebarBg}; text-transform: uppercase; margin: 0 0 8px 0; line-height: 1.1;">
                        ${escapeHtml(personalInfo.fullName || 'Your Name')}
                    </h1>
                    <p style="font-family: ${headingFont}; font-size: ${fs.jobTitle}; color: ${accentColor}; text-transform: uppercase; font-weight: 600; letter-spacing: 0.1em; margin: 0;">
                        ${escapeHtml(personalInfo.jobTitle || 'Job Title')}
                    </p>
                </div>

                <!-- Profile -->
                ${personalInfo.summary ? `
                    <div style="margin-bottom: 24px;">
                        ${MainHeader(t.sections.profile)}
                        <p style="line-height: 1.6; font-size: ${fs.body}; color: #475569;">
                            ${formatDescription(personalInfo.summary)}
                        </p>
                    </div>
                ` : ''}

                <!-- Experience -->
                ${experience.length > 0 ? `
                    <div style="margin-bottom: 24px;">
                        ${MainHeader(t.sections.experience)}
                        <div style="display: flex; flex-direction: column; gap: 24px;">
                            ${experience.map(exp => `
                                <div>
                                    <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
                                        <h4 style="font-weight: 700; font-size: ${fs.entryTitle}; color: ${sidebarBg}; margin: 0; text-transform: uppercase;">
                                            ${escapeHtml(exp.title)}
                                        </h4>
                                        <span style="font-size: ${fs.small}; color: ${accentColor}; font-weight: 600;">
                                            ${formatLocalizedDate(exp.startDate, locale)} – ${exp.current ? t.labels.present : formatLocalizedDate(exp.endDate, locale)}
                                        </span>
                                    </div>
                                    <div style="font-size: ${fs.body}; color: #64748b; margin-bottom: 8px; font-weight: 600;">
                                        ${escapeHtml(exp.company)}${exp.city ? ` | ${escapeHtml(exp.city)}` : ''}
                                    </div>
                                    <div style="font-size: ${fs.body}; line-height: 1.6; color: #475569;">
                                        ${formatDescription(exp.description || '')}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Education (Moved to Main) -->
                ${education.length > 0 ? `
                    <div style="margin-bottom: 24px;">
                        ${MainHeader(t.sections.education)}
                        <div style="display: flex; flex-direction: column; gap: 16px;">
                            ${education.map(edu => `
                                <div>
                                    <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
                                        <h4 style="font-weight: 700; font-size: ${fs.entryTitle}; color: ${sidebarBg}; margin: 0; text-transform: uppercase;">
                                            ${escapeHtml(edu.degree)}
                                        </h4>
                                        <span style="font-size: ${fs.small}; color: ${accentColor}; font-weight: 600;">
                                            ${formatLocalizedDate(edu.startDate, locale)} – ${edu.endDate ? formatLocalizedDate(edu.endDate, locale) : t.labels.present}
                                        </span>
                                    </div>
                                    <div style="font-size: ${fs.body}; color: #64748b; margin-bottom: 2px; font-weight: 600;">
                                        ${escapeHtml(edu.school)}
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
                        <div style="display: flex; flex-direction: column; gap: 16px;">
                            ${certifications.map(cert => `
                                <div>
                                    <h4 style="font-weight: 700; font-size: ${fs.entryTitle}; color: ${sidebarBg}; margin: 0 0 4px 0;">
                                        ${escapeHtml(cert.name)}
                                    </h4>
                                    <div style="font-size: ${fs.body}; color: ${accentColor}; font-weight: 500; margin-bottom: 2px;">
                                        ${escapeHtml(cert.issuer)}
                                    </div>
                                    <div style="font-size: ${fs.small}; color: #64748b;">
                                        ${formatLocalizedDate(cert.date, locale)}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Awards -->
                ${awards && awards.length > 0 ? `
                    <div style="margin-bottom: 24px;">
                        ${MainHeader(t.sections.awards)}
                        <div style="display: flex; flex-direction: column; gap: 16px;">
                            ${awards.map(award => `
                                <div>
                                    <h4 style="font-weight: 700; font-size: ${fs.entryTitle}; color: ${sidebarBg}; margin: 0 0 4px 0;">
                                        ${escapeHtml(award.title)}
                                    </h4>
                                    <div style="font-size: ${fs.body}; color: ${accentColor}; font-weight: 500; margin-bottom: 2px;">
                                        ${escapeHtml(award.issuer)}
                                    </div>
                                    <div style="font-size: ${fs.small}; color: #64748b;">
                                        ${formatLocalizedDate(award.date, locale)}
                                    </div>
                                    ${award.description ? `
                                        <p style="font-size: ${fs.body}; line-height: 1.6; color: #475569; margin: 4px 0 0 0;">
                                            ${formatDescription(award.description)}
                                        </p>
                                    ` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Languages -->
                ${languages && languages.length > 0 ? `
                    <div style="margin-bottom: 24px;">
                        ${MainHeader(t.sections.languages)}
                        <div style="display: flex; flex-wrap: wrap; gap: 12px;">
                            ${languages.map(lang => `
                                <span style="font-size: ${fs.body}; color: #475569; display: flex; align-items: center; gap: 8px;">
                                    <span style="font-weight: 500; color: ${sidebarBg};">${escapeHtml(lang.name)}</span>
                                    <span style="color: ${accentColor};">(${escapeHtml(lang.proficiency)})</span>
                                </span>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Social Links (Moved to Main) -->
                ${['github', 'x', 'linkedin', 'dribbble', 'behance', 'instagram'].some(net => (personalInfo as any)[net]) ? `
                    <div style="margin-bottom: 24px;">
                        ${MainHeader(t.sections.socialLinks || 'Social Links')}
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                            ${['github', 'x', 'linkedin', 'dribbble', 'behance', 'instagram'].map(network => {
        const val = (personalInfo as any)[network];
        if (!val) return '';
        return `
                                    <div style="display: flex; align-items: center; gap: 10px;">
                                        <div style="width: 24px; height: 24px; border-radius: 50%; background-color: ${accentColor}; display: flex; align-items: center; justify-content: center;">
                                            <span style="color: #FFFFFF;">${getIconSVG(network as IconName, '#FFFFFF', 14)}</span>
                                        </div>
                                        <span style="word-break: break-all; color: ${mainText}; font-size: ${fs.body};">${escapeHtml(val)}</span>
                                    </div>
                                `;
    }).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Interests -->
                ${interests && interests.length > 0 ? `
                    <div style="margin-bottom: 24px;">
                        ${MainHeader(t.sections.interests)}
                         <div style="display: flex; flex-wrap: wrap; gap: 12px;">
                            ${interests.map(int => `
                                <span style="font-size: ${fs.body}; color: #475569; display: flex; align-items: center; gap: 6px;">
                                    <span style="color: ${accentColor}; font-size: ${fs.small};">●</span>
                                    ${escapeHtml(int.name)}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
                
                <!-- References -->
                ${data.references && data.references.length > 0 ? `
                    <div style="margin-bottom: 24px;">
                        ${MainHeader(t.sections.references)}
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
                            ${data.references.map(ref => `
                                <div>
                                    <div style="font-weight: 700; font-size: ${fs.sidebarHeading}; color: ${sidebarBg};">${escapeHtml(ref.name)}</div>
                                    <div style="font-size: ${fs.body}; color: #475569;">${escapeHtml(ref.title)}, ${escapeHtml(ref.company)}</div>
                                    ${ref.email ? `<div style="font-size: ${fs.small}; color: ${accentColor};">${escapeHtml(ref.email)}</div>` : ''}
                                    ${ref.phone ? `<div style="font-size: ${fs.small}; color: ${accentColor};">${escapeHtml(ref.phone)}</div>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}


                
                <!-- Custom Fields -->
                ${customFields.map(field => `
                    <div style="margin-bottom: 24px;">
                        ${MainHeader(field.label)}
                        <p style="line-height: 1.6; font-size: ${fs.body}; color: #475569;">
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

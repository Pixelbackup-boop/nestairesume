"use strict";
/**
 * Sidebar Dark Navy Template
 * Ported from frontend/components/templates/layouts/sidebar/SidebarDarkNavy.tsx
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderSidebarDarkNavy = void 0;
const helpers_1 = require("./shared/helpers");
const translations_1 = require("./shared/translations");
const dateUtils_1 = require("./shared/dateUtils");
const renderSidebarDarkNavy = (data, theme, translations, locale = 'en') => {
    const t = (0, translations_1.getTranslations)(translations);
    const { personalInfo, experience = [], education = [], skills = [], languages = [], strengths = [], interests = [], certifications = [], awards = [], customFields = [], fonts, background } = data;
    const headingFont = (0, helpers_1.getFontFamily)(fonts?.heading || 'Roboto Slab');
    const bodyFont = (0, helpers_1.getFontFamily)(fonts?.body || 'Open Sans');
    // Font Scaling
    const scale = (0, helpers_1.getFontScale)(fonts?.size);
    const s = (px) => `${Math.max(5, Math.round(px * scale))}px`;
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
    const sidebarBg = '#1e293b'; // Slate 800 (matches frontend)
    const mainBg = '#FFFFFF';
    const sidebarText = '#e2e8f0'; // Slate 200
    const mainText = '#334155'; // Slate 700
    const accentColor = theme.primary || '#059669'; // Emerald 600 default (was Blue 500)
    // --- Helpers ---
    const SidebarHeader = (title) => `
        <h3 style="font-family: ${headingFont}; font-size: ${fs.sidebarHeading}; font-weight: 700; color: ${accentColor}; text-transform: uppercase; margin: 0 0 16px 0; padding-bottom: 4px; border-bottom: 1px solid ${accentColor}40;">
            ${title}
        </h3>
    `;
    const MainHeader = (title) => `
        <h3 style="font-family: ${headingFont}; font-size: ${fs.sectionHeading}; font-weight: 700; color: ${sidebarBg}; text-transform: uppercase; margin: 0 0 16px 0; padding-bottom: 4px; border-bottom: 2px solid ${accentColor};">
            ${title}
        </h3>
    `;
    // Profile Image
    const photoSize = 120;
    const profileImage = personalInfo.profileImage ? `
        <img
            src="${personalInfo.profileImage}"
            alt="${(0, helpers_1.escapeHtml)(personalInfo.fullName)}"
            style="width: ${photoSize}px; height: ${photoSize}px; border-radius: 50%; object-fit: cover; border: 4px solid ${accentColor};"
        />
    ` : `
        <div style="width: ${photoSize}px; height: ${photoSize}px; border-radius: 50%; background-color: ${accentColor}20; border: 4px solid ${accentColor}; display: flex; align-items: center; justify-content: center; font-family: ${headingFont}; font-size: 48px; color: ${accentColor}; font-weight: 700;">
            ${(0, helpers_1.escapeHtml)(personalInfo.fullName?.charAt(0) || '?')}
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
                                <span style="color: ${accentColor};">${(0, helpers_1.getIconSVG)(item.icon, accentColor, 14)}</span>
                                <span style="word-break: break-all; color: ${sidebarText};">${(0, helpers_1.escapeHtml)(item.value)}</span>
                            </div>
                        `).join('')}
                        

                    </div>
                </div>

                <!-- Personal Details -->
                ${(personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber)) ? `
                    <div style="margin-bottom: 40px;">
                        ${SidebarHeader(t.sections.personalDetails)}
                        <div style="font-size: 11px; display: flex; flex-direction: column; gap: 8px; color: ${sidebarText};">
                            ${personalInfo.nationality ? `<div><span style="font-weight: 500; color: ${accentColor};">Nationality:</span> ${(0, helpers_1.escapeHtml)(personalInfo.nationality)}</div>` : ''}
                            ${personalInfo.idType && personalInfo.idNumber ? `
                                <div><span style="font-weight: 500; color: ${accentColor};">${personalInfo.idType === 'id' ? 'ID' : personalInfo.idType === 'passport' ? 'Passport' : 'Driving License'}:</span> ${(0, helpers_1.escapeHtml)(personalInfo.idNumber)}</div>
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
                                <div data-paginate="item">
                                    <div style="display: flex; justify-content: space-between; font-size: ${fs.entryTitle}; margin-bottom: 4px;">
                                        <span style="font-weight: 500; color: ${sidebarText};">${(0, helpers_1.escapeHtml)(skill.name)}</span>
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
                                <div data-paginate="item">
                                    <div style="display: flex; justify-content: space-between; font-size: ${fs.entryTitle}; margin-bottom: 4px;">
                                        <span style="font-weight: 500; color: ${sidebarText};">${(0, helpers_1.escapeHtml)(str.name)}</span>
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
                        ${(0, helpers_1.escapeHtml)(personalInfo.fullName || 'Your Name')}
                    </h1>
                    <p style="font-family: ${headingFont}; font-size: ${fs.jobTitle}; color: ${accentColor}; text-transform: uppercase; font-weight: 600; letter-spacing: 0.1em; margin: 0;">
                        ${(0, helpers_1.escapeHtml)(personalInfo.jobTitle || 'Job Title')}
                    </p>
                </div>

                <!-- Profile -->
                ${personalInfo.summary ? `
                    <div style="margin-bottom: 24px;">
                        ${MainHeader(t.sections.profile)}
                        <p style="line-height: 1.6; font-size: ${fs.body}; color: #475569;">
                            ${(0, helpers_1.formatDescription)(personalInfo.summary)}
                        </p>
                    </div>
                ` : ''}

                <!-- Experience -->
                ${experience.length > 0 ? `
                    <div style="margin-bottom: 24px;">
                        ${MainHeader(t.sections.experience)}
                        <div style="display: flex; flex-direction: column; gap: 24px;">
                            ${experience.map(exp => `
                                <div data-paginate="item">
                                    <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
                                        <h4 style="font-weight: 700; font-size: ${fs.entryTitle}; color: ${sidebarBg}; margin: 0; text-transform: uppercase;">
                                            ${(0, helpers_1.escapeHtml)(exp.title)}
                                        </h4>
                                        <span style="font-size: ${fs.small}; color: ${accentColor}; font-weight: 600;">
                                            ${(0, dateUtils_1.formatLocalizedDate)(exp.startDate, locale)} – ${exp.current ? t.labels.present : (0, dateUtils_1.formatLocalizedDate)(exp.endDate, locale)}
                                        </span>
                                    </div>
                                    <div style="font-size: ${fs.body}; color: #64748b; margin-bottom: 8px; font-weight: 600;">
                                        ${(0, helpers_1.escapeHtml)(exp.company)}${exp.city ? ` | ${(0, helpers_1.escapeHtml)(exp.city)}` : ''}
                                    </div>
                                    <div style="font-size: ${fs.body}; line-height: 1.6; color: #475569;">
                                        ${(0, helpers_1.formatDescription)(exp.description || '')}
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
                                <div data-paginate="item">
                                    <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
                                        <h4 style="font-weight: 700; font-size: ${fs.entryTitle}; color: ${sidebarBg}; margin: 0; text-transform: uppercase;">
                                            ${(0, helpers_1.escapeHtml)(edu.degree)}
                                        </h4>
                                        <span style="font-size: ${fs.small}; color: ${accentColor}; font-weight: 600;">
                                            ${(0, dateUtils_1.formatLocalizedDate)(edu.startDate, locale)} – ${edu.endDate ? (0, dateUtils_1.formatLocalizedDate)(edu.endDate, locale) : t.labels.present}
                                        </span>
                                    </div>
                                    <div style="font-size: ${fs.body}; color: #64748b; margin-bottom: 2px; font-weight: 600;">
                                        ${(0, helpers_1.escapeHtml)(edu.school)}
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
                                <div data-paginate="item">
                                    <h4 style="font-weight: 700; font-size: ${fs.entryTitle}; color: ${sidebarBg}; margin: 0 0 4px 0;">
                                        ${(0, helpers_1.escapeHtml)(cert.name)}
                                    </h4>
                                    <div style="font-size: ${fs.body}; color: ${accentColor}; font-weight: 500; margin-bottom: 2px;">
                                        ${(0, helpers_1.escapeHtml)(cert.issuer)}
                                    </div>
                                    <div style="font-size: ${fs.small}; color: #64748b;">
                                        ${(0, dateUtils_1.formatLocalizedDate)(cert.date, locale)}
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
                                <div data-paginate="item">
                                    <h4 style="font-weight: 700; font-size: ${fs.entryTitle}; color: ${sidebarBg}; margin: 0 0 4px 0;">
                                        ${(0, helpers_1.escapeHtml)(award.title)}
                                    </h4>
                                    <div style="font-size: ${fs.body}; color: ${accentColor}; font-weight: 500; margin-bottom: 2px;">
                                        ${(0, helpers_1.escapeHtml)(award.issuer)}
                                    </div>
                                    <div style="font-size: ${fs.small}; color: #64748b;">
                                        ${(0, dateUtils_1.formatLocalizedDate)(award.date, locale)}
                                    </div>
                                    ${award.description ? `
                                        <p style="font-size: ${fs.body}; line-height: 1.6; color: #475569; margin: 4px 0 0 0;">
                                            ${(0, helpers_1.formatDescription)(award.description)}
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
                                <span data-paginate="item" style="font-size: ${fs.body}; color: #475569; display: flex; align-items: center; gap: 8px;">
                                    <span style="font-weight: 500; color: ${sidebarBg};">${(0, helpers_1.escapeHtml)(lang.name)}</span>
                                    <span style="color: ${accentColor};">(${(0, helpers_1.escapeHtml)(lang.proficiency)})</span>
                                </span>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Social Links (Moved to Main) -->
                ${['github', 'x', 'linkedin', 'dribbble', 'behance', 'instagram'].some(net => personalInfo[net]) ? `
                    <div style="margin-bottom: 24px;">
                        ${MainHeader(t.sections.socialLinks || 'Social Links')}
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                            ${['github', 'x', 'linkedin', 'dribbble', 'behance', 'instagram'].map(network => {
        const val = personalInfo[network];
        if (!val)
            return '';
        return `
                                    <div data-paginate="item" style="display: flex; align-items: center; gap: 10px;">
                                        <div style="width: 24px; height: 24px; border-radius: 50%; background-color: ${accentColor}; display: flex; align-items: center; justify-content: center;">
                                            <span style="color: #FFFFFF;">${(0, helpers_1.getIconSVG)(network, '#FFFFFF', 14)}</span>
                                        </div>
                                        <span style="word-break: break-all; color: ${mainText}; font-size: ${fs.body};">${(0, helpers_1.escapeHtml)(val)}</span>
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
                                <span data-paginate="item" style="font-size: ${fs.body}; color: #475569; display: flex; align-items: center; gap: 6px;">
                                    <span style="color: ${accentColor}; font-size: ${fs.small};">●</span>
                                    ${(0, helpers_1.escapeHtml)(int.name)}
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
                                <div data-paginate="item">
                                    <div style="font-weight: 700; font-size: ${fs.sidebarHeading}; color: ${sidebarBg};">${(0, helpers_1.escapeHtml)(ref.name)}</div>
                                    <div style="font-size: ${fs.body}; color: #475569;">${(0, helpers_1.escapeHtml)(ref.title)}, ${(0, helpers_1.escapeHtml)(ref.company)}</div>
                                    ${ref.email ? `<div style="font-size: ${fs.small}; color: ${accentColor};">${(0, helpers_1.escapeHtml)(ref.email)}</div>` : ''}
                                    ${ref.phone ? `<div style="font-size: ${fs.small}; color: ${accentColor};">${(0, helpers_1.escapeHtml)(ref.phone)}</div>` : ''}
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
                            ${(0, helpers_1.formatDescription)(field.content)}
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
exports.renderSidebarDarkNavy = renderSidebarDarkNavy;
//# sourceMappingURL=sidebar-dark-navy.js.map
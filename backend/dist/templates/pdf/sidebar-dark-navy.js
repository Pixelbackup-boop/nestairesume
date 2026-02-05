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
    const { personalInfo, experience = [], education = [], skills = [], languages = [], strengths = [], interests = [], certifications = [], awards = [], fonts, background } = data;
    const headingFont = (0, helpers_1.getFontFamily)(fonts?.heading || 'Roboto');
    const bodyFont = (0, helpers_1.getFontFamily)(fonts?.body || 'Roboto');
    // Fixed colors based on frontend
    const sidebarBg = '#0f172a'; // Slate 900
    const mainBg = '#FFFFFF';
    const sidebarText = '#e2e8f0'; // Slate 200
    const mainText = '#334155'; // Slate 700
    const accentColor = theme.primary || '#3b82f6'; // Blue 500 default
    // --- Helpers ---
    const SidebarHeader = (title) => `
        <h3 style="font-family: ${headingFont}; font-size: 14px; font-weight: 700; color: ${accentColor}; text-transform: uppercase; margin: 0 0 16px 0; padding-bottom: 4px; border-bottom: 1px solid ${accentColor}40;">
            ${title}
        </h3>
    `;
    const MainHeader = (title) => `
        <h3 style="font-family: ${headingFont}; font-size: 16px; font-weight: 700; color: ${sidebarBg}; text-transform: uppercase; margin: 0 0 16px 0; padding-bottom: 4px; border-bottom: 2px solid ${accentColor};">
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
        <div class="sidebar-bg-fixed" style="background-color: ${sidebarBg};"></div>

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
                    <div style="font-size: 12px; display: flex; flex-direction: column; gap: 12px; color: ${sidebarText};">
                        ${contactItems.map(item => `
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <span style="color: ${accentColor};">${(0, helpers_1.getIconSVG)(item.icon, accentColor, 14)}</span>
                                <span style="word-break: break-all; color: ${sidebarText};">${(0, helpers_1.escapeHtml)(item.value)}</span>
                            </div>
                        `).join('')}
                        
                        <!-- Extra Socials -->
                        ${['github', 'twitter', 'linkedin', 'dribbble', 'behance', 'instagram'].map(network => {
        const val = personalInfo[network];
        if (!val || contactItems.find(c => c.value === val))
            return '';
        return `
                                <div style="display: flex; align-items: center; gap: 10px;">
                                    <span style="color: ${accentColor};">${(0, helpers_1.getIconSVG)(network, accentColor, 14)}</span>
                                    <span style="word-break: break-all; color: ${sidebarText};">${(0, helpers_1.escapeHtml)(val)}</span>
                                </div>
                            `;
    }).join('')}
                    </div>
                </div>

                <!-- Personal Details -->
                ${(personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber)) ? `
                    <div style="margin-bottom: 40px;">
                        ${SidebarHeader(t.sections.personalDetails)}
                        <div style="font-size: 12px; display: flex; flex-direction: column; gap: 8px; color: ${sidebarText};">
                            ${personalInfo.nationality ? `<div><span style="font-weight: 500; color: ${accentColor};">Nationality:</span> ${(0, helpers_1.escapeHtml)(personalInfo.nationality)}</div>` : ''}
                            ${personalInfo.idType && personalInfo.idNumber ? `
                                <div><span style="font-weight: 500; color: ${accentColor};">${personalInfo.idType === 'id' ? 'ID' : personalInfo.idType === 'passport' ? 'Passport' : 'License'}:</span> ${(0, helpers_1.escapeHtml)(personalInfo.idNumber)}</div>
                            ` : ''}
                        </div>
                    </div>
                ` : ''}

                <!-- Education -->
                ${education.length > 0 ? `
                    <div style="margin-bottom: 40px;">
                        ${SidebarHeader(t.sections.education)}
                        <div style="display: flex; flex-direction: column; gap: 16px; color: ${sidebarText};">
                            ${education.map(edu => `
                                <div>
                                    <div style="font-weight: 700; font-size: 13px; color: #ffffff;">${(0, helpers_1.escapeHtml)(edu.degree)}</div>
                                    <div style="font-size: 12px; color: ${accentColor}; margin-bottom: 2px;">${(0, helpers_1.escapeHtml)(edu.school)}</div>
                                    <div style="font-size: 11px; color: ${sidebarText}; opacity: 0.8;">${(0, dateUtils_1.formatLocalizedDate)(edu.startDate, locale)} – ${edu.endDate ? (0, dateUtils_1.formatLocalizedDate)(edu.endDate, locale) : t.labels.present}</div>
                                </div>
                            `).join('')}
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
                                    <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
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

            </aside>

            <!-- Main Content (65%) -->
            <main style="flex: 1; padding: 64px 48px; background-color: ${mainBg}; color: ${mainText};">
                
                <!-- Header -->
                <div style="margin-bottom: 56px;">
                    <h1 style="font-family: ${headingFont}; font-size: 38px; font-weight: 800; color: ${sidebarBg}; text-transform: uppercase; margin: 0 0 8px 0; line-height: 1.1;">
                        ${(0, helpers_1.escapeHtml)(personalInfo.fullName || 'Your Name')}
                    </h1>
                    <p style="font-family: ${headingFont}; font-size: 16px; color: ${accentColor}; text-transform: uppercase; font-weight: 600; letter-spacing: 0.1em; margin: 0;">
                        ${(0, helpers_1.escapeHtml)(personalInfo.jobTitle || 'Job Title')}
                    </p>
                </div>

                <!-- Profile -->
                ${personalInfo.summary ? `
                    <div style="margin-bottom: 40px;">
                        ${MainHeader(t.sections.profile)}
                        <p style="line-height: 1.6; font-size: 12px; color: #475569;">
                            ${(0, helpers_1.formatDescription)(personalInfo.summary)}
                        </p>
                    </div>
                ` : ''}

                <!-- Experience -->
                ${experience.length > 0 ? `
                    <div style="margin-bottom: 40px;">
                        ${MainHeader(t.sections.experience)}
                        <div style="display: flex; flex-direction: column; gap: 24px;">
                            ${experience.map(exp => `
                                <div>
                                    <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
                                        <h4 style="font-weight: 700; font-size: 14px; color: ${sidebarBg}; margin: 0; text-transform: uppercase;">
                                            ${(0, helpers_1.escapeHtml)(exp.title)}
                                        </h4>
                                        <span style="font-size: 11px; color: ${accentColor}; font-weight: 600;">
                                            ${(0, dateUtils_1.formatLocalizedDate)(exp.startDate, locale)} – ${exp.current ? t.labels.present : (0, dateUtils_1.formatLocalizedDate)(exp.endDate, locale)}
                                        </span>
                                    </div>
                                    <div style="font-size: 12px; color: #64748b; margin-bottom: 8px; font-weight: 600;">
                                        ${(0, helpers_1.escapeHtml)(exp.company)}${exp.city ? ` | ${(0, helpers_1.escapeHtml)(exp.city)}` : ''}
                                    </div>
                                    <div style="font-size: 12px; line-height: 1.6; color: #475569;">
                                        ${(0, helpers_1.formatDescription)(exp.description || '')}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Strengths -->
                ${strengths && strengths.length > 0 ? `
                    <div style="margin-bottom: 40px;">
                        ${MainHeader(t.sections.strengths)}
                         <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                            ${strengths.map(str => `
                                <span style="border: 1px solid ${accentColor}; color: ${accentColor}; padding: 4px 12px; border-radius: 99px; font-size: 11px; font-weight: 600;">
                                    ${(0, helpers_1.escapeHtml)(str.name)}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Certifications -->
                ${certifications && certifications.length > 0 ? `
                    <div style="margin-bottom: 40px;">
                        ${MainHeader(t.sections.certifications)}
                        <div style="display: flex; flex-direction: column; gap: 16px;">
                            ${certifications.map(cert => `
                                <div>
                                    <h4 style="font-weight: 700; font-size: 14px; color: ${sidebarBg}; margin: 0 0 4px 0;">
                                        ${(0, helpers_1.escapeHtml)(cert.name)}
                                    </h4>
                                    <div style="font-size: 12px; color: ${accentColor}; font-weight: 500; margin-bottom: 2px;">
                                        ${(0, helpers_1.escapeHtml)(cert.issuer)}
                                    </div>
                                    <div style="font-size: 11px; color: #64748b;">
                                        ${(0, dateUtils_1.formatLocalizedDate)(cert.date, locale)}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Awards -->
                ${awards && awards.length > 0 ? `
                    <div style="margin-bottom: 40px;">
                        ${MainHeader(t.sections.awards)}
                        <div style="display: flex; flex-direction: column; gap: 16px;">
                            ${awards.map(award => `
                                <div>
                                    <h4 style="font-weight: 700; font-size: 14px; color: ${sidebarBg}; margin: 0 0 4px 0;">
                                        ${(0, helpers_1.escapeHtml)(award.title)}
                                    </h4>
                                    <div style="font-size: 12px; color: ${accentColor}; font-weight: 500; margin-bottom: 2px;">
                                        ${(0, helpers_1.escapeHtml)(award.issuer)}
                                    </div>
                                    <div style="font-size: 11px; color: #64748b;">
                                        ${(0, dateUtils_1.formatLocalizedDate)(award.date, locale)}
                                    </div>
                                    ${award.description ? `
                                        <p style="font-size: 12px; line-height: 1.6; color: #475569; margin: 4px 0 0 0;">
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
                    <div style="margin-bottom: 40px;">
                        ${MainHeader(t.sections.languages)}
                        <div style="display: flex; flex-wrap: wrap; gap: 12px;">
                            ${languages.map(lang => `
                                <span style="font-size: 12px; color: #475569; display: flex; align-items: center; gap: 8px;">
                                    <span style="font-weight: 500; color: ${sidebarBg};">${(0, helpers_1.escapeHtml)(lang.name)}</span>
                                    <span style="color: ${accentColor};">(${(0, helpers_1.escapeHtml)(lang.proficiency)})</span>
                                </span>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Interests -->
                ${interests && interests.length > 0 ? `
                    <div>
                        ${MainHeader(t.sections.interests)}
                         <div style="display: flex; flex-wrap: wrap; gap: 12px;">
                            ${interests.map(int => `
                                <span style="font-size: 12px; color: #475569; display: flex; align-items: center; gap: 6px;">
                                    <span style="color: ${accentColor}; font-size: 10px;">●</span>
                                    ${(0, helpers_1.escapeHtml)(int.name)}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
                
                <!-- References -->
                ${data.references && data.references.length > 0 ? `
                    <div style="margin-top: 40px;">
                        ${MainHeader(t.sections.references)}
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
                            ${data.references.map(ref => `
                                <div>
                                    <div style="font-weight: 700; font-size: 13px; color: ${sidebarBg};">${(0, helpers_1.escapeHtml)(ref.name)}</div>
                                    <div style="font-size: 12px; color: #475569;">${(0, helpers_1.escapeHtml)(ref.title)}, ${(0, helpers_1.escapeHtml)(ref.company)}</div>
                                    ${ref.email ? `<div style="font-size: 11px; color: ${accentColor};">${(0, helpers_1.escapeHtml)(ref.email)}</div>` : ''}
                                    ${ref.phone ? `<div style="font-size: 11px; color: ${accentColor};">${(0, helpers_1.escapeHtml)(ref.phone)}</div>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
                
                <!-- Custom Field (Full Width) -->
                ${personalInfo.customField ? `
                    <div style="margin-top: 40px;">
                        ${MainHeader(personalInfo.customFieldLabel || t.sections.additionalInfo)}
                        <p style="line-height: 1.6; font-size: 12px; color: #475569;">
                            ${(0, helpers_1.formatDescription)(personalInfo.customField)}
                        </p>
                    </div>
                ` : ''}

            </main>
        </div>
    `;
};
exports.renderSidebarDarkNavy = renderSidebarDarkNavy;
//# sourceMappingURL=sidebar-dark-navy.js.map
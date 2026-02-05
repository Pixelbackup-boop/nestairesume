"use strict";
/**
 * Sidebar Narrow Yellow Template
 * Ported from frontend/components/templates/layouts/sidebar/SidebarNarrowYellow.tsx
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderSidebarNarrowYellow = void 0;
const helpers_1 = require("./shared/helpers");
const translations_1 = require("./shared/translations");
const dateUtils_1 = require("./shared/dateUtils");
const renderSidebarNarrowYellow = (data, theme, translations, locale = 'en') => {
    const t = (0, translations_1.getTranslations)(translations);
    const { personalInfo, experience = [], education = [], skills = [], languages = [], strengths = [], interests = [], certifications = [], awards = [], fonts, background } = data;
    const headingFont = (0, helpers_1.getFontFamily)(fonts?.heading || 'Oswald');
    const bodyFont = (0, helpers_1.getFontFamily)(fonts?.body || 'Roboto');
    // Colors
    const sidebarBg = '#facc15'; // Yellow 400
    const mainBg = '#FFFFFF';
    const sidebarText = '#1f2937'; // Gray 800
    const mainText = '#1f2937';
    const accentColor = theme.primary || '#facc15'; // Use theme color with yellow fallback
    const accentDark = '#ca8a04'; // Yellow 600 for text accents
    // Profile Image
    const photoSize = 80;
    const profileImage = personalInfo.profileImage ? `
        <img
            src="${personalInfo.profileImage}"
            alt="${(0, helpers_1.escapeHtml)(personalInfo.fullName)}"
            style="width: ${photoSize}px; height: ${photoSize}px; border-radius: 50%; object-fit: cover; border: 3px solid ${sidebarText};"
        />
    ` : `
        <div style="width: ${photoSize}px; height: ${photoSize}px; border-radius: 50%; background-color: ${sidebarText}; display: flex; align-items: center; justify-content: center; font-family: ${headingFont}; font-size: 32px; color: ${sidebarBg}; font-weight: 700;">
            ${(0, helpers_1.escapeHtml)(personalInfo.fullName?.charAt(0) || '?')}
        </div>
    `;
    // Contact items with icons
    const contactItems = [
        { value: personalInfo.phone, icon: 'phone' },
        { value: personalInfo.email, icon: 'email' },
        { value: personalInfo.location, icon: 'location' },
        { value: personalInfo.website, icon: 'website' }
    ].filter(item => item.value);
    // Helpers
    const SidebarHeader = (title) => `
        <h3 style="font-family: ${headingFont}; font-size: 12px; font-weight: 700; color: ${sidebarText}; text-transform: uppercase; margin: 0 0 12px 0; border-bottom: 2px solid ${sidebarText}; padding-bottom: 4px; text-align: center;">
            ${title}
        </h3>
    `;
    const MainHeader = (title) => `
        <h3 style="font-family: ${headingFont}; font-size: 16px; font-weight: 800; color: ${mainText}; text-transform: uppercase; margin: 0 0 16px 0; border-bottom: 4px solid ${sidebarBg}; display: inline-block; padding-bottom: 4px;">
            ${title}
        </h3>
    `;
    return `
        <!-- Fixed sidebar background - OUTSIDE flex, repeats on all pages -->
        <div class="sidebar-bg-fixed" style="background-color: ${sidebarBg}; width: 30%;"></div>

        <div style="width: 100%; min-height: 100%; font-family: ${bodyFont}; display: flex; position: relative;">

            <!-- Sidebar (30%) -->
            <aside class="sidebar-content" style="width: 30%; color: ${sidebarText}; padding: 40px 20px; flex-shrink: 0; min-height: 100%; position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center;">

                <!-- Photo -->
                <div style="margin-bottom: 40px;">
                    ${profileImage}
                </div>

                <!-- Contact with icons + text -->
                <div style="margin-bottom: 32px; width: 100%;">
                    <div style="display: flex; flex-direction: column; gap: 10px; font-size: 11px;">
                        ${contactItems.map(item => `
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <span style="color: ${sidebarText}; flex-shrink: 0;">${(0, helpers_1.getIconSVG)(item.icon, sidebarText, 14)}</span>
                                <span style="word-break: break-all;">${(0, helpers_1.escapeHtml)(item.value)}</span>
                            </div>
                        `).join('')}
                        
                        <!-- Extra Socials -->
                        ${['github', 'twitter', 'linkedin', 'dribbble', 'behance', 'instagram'].map(network => {
        const val = personalInfo[network];
        if (!val || contactItems.find(c => c.value === val))
            return '';
        return `
                                <div style="display: flex; align-items: center; gap: 8px;">
                                    <span style="color: ${sidebarText}; flex-shrink: 0;">${(0, helpers_1.getIconSVG)(network, sidebarText, 14)}</span>
                                    <span style="word-break: break-all;">${(0, helpers_1.escapeHtml)(val)}</span>
                                </div>
                            `;
    }).join('')}
                    </div>
                </div>

                <!-- Skills with progress bars -->
                ${skills.length > 0 ? `
                    <div style="width: 100%; margin-bottom: 32px;">
                        ${SidebarHeader(t.sections.skills)}
                        <div style="display: flex; flex-direction: column; gap: 12px;">
                            ${skills.map(skill => {
        const level = skill.level || 3;
        const percentage = (level / 5) * 100;
        return `
                                    <div>
                                        <div style="margin-bottom: 4px; font-size: 11px; font-weight: 600; color: ${sidebarText};">${(0, helpers_1.escapeHtml)(skill.name)}</div>
                                        <div style="width: 100%; height: 6px; background-color: rgba(31, 41, 55, 0.2); border-radius: 3px; overflow: hidden;">
                                            <div style="width: ${percentage}%; height: 100%; background-color: ${sidebarText}; border-radius: 3px;"></div>
                                        </div>
                                    </div>
                                `;
    }).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Interests -->
                ${interests && interests.length > 0 ? `
                    <div style="width: 100%;">
                        ${SidebarHeader(t.sections.interests)}
                        <div style="display: flex; flex-direction: column; gap: 8px; font-size: 11px;">
                            ${interests.map(int => `
                                <div style="display: flex; align-items: center; gap: 8px;">
                                    <span style="color: ${sidebarText}; font-size: 8px;">●</span>
                                    <span style="font-weight: 500;">${(0, helpers_1.escapeHtml)(int.name)}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

            </aside>

            <!-- Main Content (78%) -->
            <main style="flex: 1; padding: 56px 40px; background-color: ${mainBg}; color: ${mainText};">

                <!-- Header -->
                <div style="margin-bottom: 48px;">
                    <h1 style="font-family: ${headingFont}; font-size: 42px; font-weight: 800; color: ${mainText}; text-transform: uppercase; margin: 0 0 8px 0; line-height: 0.95;">
                        ${(0, helpers_1.escapeHtml)(personalInfo.fullName || 'Your Name')}
                    </h1>
                    <p style="font-family: ${headingFont}; font-size: 16px; color: ${accentDark}; text-transform: uppercase; font-weight: 700; letter-spacing: 0.15em; margin: 0;">
                        ${(0, helpers_1.escapeHtml)(personalInfo.jobTitle || 'Job Title')}
                    </p>
                </div>

                <!-- Profile -->
                ${personalInfo.summary ? `
                    <div style="margin-bottom: 32px;">
                        ${MainHeader(t.sections.profile)}
                        <p style="line-height: 1.6; font-size: 12px; color: #374151;">
                            ${(0, helpers_1.formatDescription)(personalInfo.summary)}
                        </p>
                    </div>
                ` : ''}

                <!-- Experience -->
                ${experience.length > 0 ? `
                    <div style="margin-bottom: 32px;">
                        ${MainHeader(t.sections.experience)}
                        <div style="display: flex; flex-direction: column; gap: 20px;">
                            ${experience.map(exp => `
                                <div>
                                    <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
                                        <h4 style="font-weight: 700; font-size: 13px; color: ${mainText}; margin: 0; text-transform: uppercase;">
                                            ${(0, helpers_1.escapeHtml)(exp.title)}
                                        </h4>
                                        <span style="font-size: 11px; color: ${accentDark}; font-weight: 700;">
                                            ${(0, dateUtils_1.formatLocalizedDate)(exp.startDate, locale)} – ${exp.current ? t.labels.present : (0, dateUtils_1.formatLocalizedDate)(exp.endDate, locale)}
                                        </span>
                                    </div>
                                    <div style="font-size: 12px; color: #4b5563; margin-bottom: 6px; font-weight: 600;">
                                        ${(0, helpers_1.escapeHtml)(exp.company)}${exp.city ? `, ${(0, helpers_1.escapeHtml)(exp.city)}` : ''}
                                    </div>
                                    <div style="font-size: 12px; line-height: 1.6; color: #374151;">
                                        ${(0, helpers_1.formatDescription)(exp.description || '')}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Education -->
                ${education.length > 0 ? `
                    <div style="margin-bottom: 32px;">
                        ${MainHeader(t.sections.education)}
                        <div style="display: flex; flex-direction: column; gap: 16px;">
                            ${education.map(edu => `
                                <div>
                                    <h4 style="font-weight: 700; font-size: 13px; color: ${mainText}; margin: 0 0 2px 0; text-transform: uppercase;">
                                        ${(0, helpers_1.escapeHtml)(edu.degree)}
                                    </h4>
                                    <div style="font-size: 12px; color: #4b5563;">
                                        ${(0, helpers_1.escapeHtml)(edu.school)}${edu.city ? `, ${(0, helpers_1.escapeHtml)(edu.city)}` : ''}
                                    </div>
                                    <div style="font-size: 11px; color: #666;">
                                        ${(0, dateUtils_1.formatLocalizedDate)(edu.startDate, locale)} – ${edu.endDate ? (0, dateUtils_1.formatLocalizedDate)(edu.endDate, locale) : t.labels.present}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Certifications -->
                ${certifications && certifications.length > 0 ? `
                    <div style="margin-bottom: 32px;">
                        ${MainHeader(t.sections.certifications)}
                        <div style="display: flex; flex-direction: column; gap: 12px;">
                            ${certifications.map(cert => `
                                <div>
                                    <h4 style="font-weight: 700; font-size: 13px; color: ${mainText}; margin: 0 0 2px 0;">
                                        ${(0, helpers_1.escapeHtml)(cert.name)}
                                    </h4>
                                    <div style="font-size: 12px; color: ${accentDark}; font-weight: 500;">
                                        ${(0, helpers_1.escapeHtml)(cert.issuer)}
                                    </div>
                                    <div style="font-size: 11px; color: #666;">
                                        ${(0, dateUtils_1.formatLocalizedDate)(cert.date, locale)}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Awards -->
                ${awards && awards.length > 0 ? `
                    <div style="margin-bottom: 32px;">
                        ${MainHeader(t.sections.awards)}
                        <div style="display: flex; flex-direction: column; gap: 12px;">
                            ${awards.map(award => `
                                <div>
                                    <h4 style="font-weight: 700; font-size: 13px; color: ${mainText}; margin: 0 0 2px 0;">
                                        ${(0, helpers_1.escapeHtml)(award.title)}
                                    </h4>
                                    <div style="font-size: 12px; color: ${accentDark}; font-weight: 500;">
                                        ${(0, helpers_1.escapeHtml)(award.issuer)}
                                    </div>
                                    <div style="font-size: 11px; color: #666;">
                                        ${(0, dateUtils_1.formatLocalizedDate)(award.date, locale)}
                                    </div>
                                    ${award.description ? `
                                        <p style="font-size: 12px; line-height: 1.5; color: #374151; margin: 4px 0 0 0;">
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
                    <div style="margin-bottom: 32px;">
                        ${MainHeader(t.sections.languages)}
                        <div style="display: flex; flex-wrap: wrap; gap: 12px 24px;">
                            ${languages.map(lang => `
                                <div style="font-size: 12px; font-weight: 700; color: #374151;">
                                    ${(0, helpers_1.escapeHtml)(lang.name)} <span style="font-weight: 400; opacity: 0.8;">(${(0, helpers_1.escapeHtml)(lang.proficiency)})</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Personal Details -->
                ${(personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber)) ? `
                    <div style="width: 100%; margin-bottom: 32px;">
                        ${SidebarHeader(t.sections.personalDetails)}
                        <div style="display: flex; flex-direction: column; gap: 8px; font-size: 11px;">
                            ${personalInfo.nationality ? `<div><span style="font-weight: 600;">Nationality:</span> ${(0, helpers_1.escapeHtml)(personalInfo.nationality)}</div>` : ''}
                            ${personalInfo.idType && personalInfo.idNumber ? `
                                <div><span style="font-weight: 600;">${personalInfo.idType === 'id' ? 'ID' : personalInfo.idType === 'passport' ? 'Passport' : 'License'}:</span> ${(0, helpers_1.escapeHtml)(personalInfo.idNumber)}</div>
                            ` : ''}
                        </div>
                    </div>
                ` : ''}
                
                <!-- Strengths -->
                ${strengths && strengths.length > 0 ? `
                    <div style="margin-bottom: 32px;">
                        ${MainHeader(t.sections.strengths)}
                        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                            ${strengths.map(str => `
                                <span style="background-color: ${sidebarBg}; color: ${sidebarText}; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700;">
                                    ${(0, helpers_1.escapeHtml)(str.name)}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- References -->
                ${data.references && data.references.length > 0 ? `
                    <div style="margin-bottom: 32px;">
                        ${MainHeader(t.sections.references)}
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                            ${data.references.map(ref => `
                                <div>
                                    <div style="font-weight: 700; font-size: 13px; color: ${mainText};">${(0, helpers_1.escapeHtml)(ref.name)}</div>
                                    <div style="font-size: 12px; color: #4b5563;">${(0, helpers_1.escapeHtml)(ref.title)}, ${(0, helpers_1.escapeHtml)(ref.company)}</div>
                                    ${ref.email ? `<div style="font-size: 11px; color: ${accentDark};">${(0, helpers_1.escapeHtml)(ref.email)}</div>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Custom Field -->
                ${personalInfo.customField ? `
                    <div>
                        ${MainHeader(personalInfo.customFieldLabel || t.sections.additionalInfo)}
                        <p style="line-height: 1.6; font-size: 12px; color: #374151;">
                            ${(0, helpers_1.formatDescription)(personalInfo.customField)}
                        </p>
                    </div>
                ` : ''}

            </main>
        </div>
    `;
};
exports.renderSidebarNarrowYellow = renderSidebarNarrowYellow;
//# sourceMappingURL=sidebar-narrow-yellow.js.map
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
    const { personalInfo, experience = [], education = [], skills = [], languages = [], strengths = [], interests = [], certifications = [], awards = [], customFields = [], fonts, background } = data;
    const headingFont = (0, helpers_1.getFontFamily)(fonts?.heading || 'Oswald');
    const bodyFont = (0, helpers_1.getFontFamily)(fonts?.body || 'Roboto Condensed');
    // Font Scaling
    const scale = (0, helpers_1.getFontScale)(fonts?.size);
    const s = (px) => `${Math.max(5, Math.round(px * scale))}px`;
    const sNum = (px) => Math.max(5, Math.round(px * scale));
    const fs = {
        name: s(42),
        jobTitle: s(16),
        sidebarHeader: s(12),
        mainHeader: s(16),
        entryTitle: s(13),
        body: s(12),
        small: s(11),
        initials: s(32),
        icon: sNum(14)
    };
    // Colors — sidebar is always yellow (template identity), accent is user-customizable
    const sidebarBg = '#facc15';
    const mainBg = '#FFFFFF';
    const sidebarText = '#1f2937';
    const mainText = '#1f2937';
    const accentColor = theme.primary || '#b45309';
    // Profile Image
    const photoSize = 80;
    const profileImage = personalInfo.profileImage ? `
        <img
            src="${personalInfo.profileImage}"
            alt="${(0, helpers_1.escapeHtml)(personalInfo.fullName)}"
            style="width: ${photoSize}px; height: ${photoSize}px; border-radius: 50%; object-fit: cover; border: 3px solid ${sidebarText};"
        />
    ` : `
        <div style="width: ${photoSize}px; height: ${photoSize}px; border-radius: 50%; background-color: ${sidebarText}; display: flex; align-items: center; justify-content: center; font-family: ${headingFont}; font-size: ${fs.initials}; color: ${sidebarBg}; font-weight: 700;">
            ${(0, helpers_1.escapeHtml)(personalInfo.fullName?.charAt(0) || '?')}
        </div>
    `;
    // Contact items with icons
    const contactItems = [
        { value: personalInfo.phone, icon: 'phone' },
        { value: personalInfo.email, icon: 'email' },
        { value: personalInfo.location, icon: 'location' },
        { value: personalInfo.website, icon: 'website' },
        { value: personalInfo.linkedin, icon: 'linkedin' },
    ].filter(item => item.value);
    // Helpers
    const SidebarHeader = (title) => `
        <h3 style="font-family: ${headingFont}; font-size: ${fs.sidebarHeader}; font-weight: 700; color: ${sidebarText}; text-transform: uppercase; margin: 0 0 12px 0; border-bottom: 2px solid ${sidebarText}; padding-bottom: 4px; text-align: center;">
            ${title}
        </h3>
    `;
    const MainHeader = (title) => `
        <h3 style="font-family: ${headingFont}; font-size: ${fs.mainHeader}; font-weight: 800; color: ${mainText}; text-transform: uppercase; margin: 0 0 16px 0; border-bottom: 4px solid ${accentColor}; display: inline-block; padding-bottom: 4px;">
            ${title}
        </h3>
    `;
    return `
        <!-- Fixed sidebar background - OUTSIDE flex, repeats on all pages -->
        <div class="sidebar-bg-fixed" style="background-color: ${sidebarBg}; position: fixed; top: -2px; left: 0; width: 30%; height: calc(100% + 4px); min-height: 100vh; z-index: 0; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important;"></div>

        <div style="width: 100%; min-height: 100%; font-family: ${bodyFont}; display: flex; position: relative;">

            <!-- Sidebar (30%) -->
            <aside class="sidebar-content" style="width: 30%; color: ${sidebarText}; padding: 40px 20px; flex-shrink: 0; min-height: 100%; position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center;">

                <!-- Photo -->
                <div style="margin-bottom: 40px;">
                    ${profileImage}
                </div>

                <!-- Contact with icons + text -->
                <div style="margin-bottom: 32px; width: 100%;">
                    <div style="display: flex; flex-direction: column; gap: 10px; font-size: ${fs.small};">
                        ${contactItems.map(item => `
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <span style="color: ${sidebarText}; flex-shrink: 0;">${(0, helpers_1.getIconSVG)(item.icon, sidebarText, fs.icon)}</span>
                                <span style="word-break: break-all;">${(0, helpers_1.escapeHtml)(item.value)}</span>
                            </div>
                        `).join('')}
                        
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
                                    <div data-paginate="item">
                                        <div style="margin-bottom: 4px; font-size: ${fs.small}; font-weight: 600; color: ${sidebarText};">${(0, helpers_1.escapeHtml)(skill.name)}</div>
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
                        <div style="display: flex; flex-direction: column; gap: 8px; font-size: ${fs.small};">
                            ${interests.map(int => `
                                <div data-paginate="item" style="display: flex; align-items: center; gap: 8px;">
                                    <span style="color: ${sidebarText}; font-size: 8px;">●</span>
                                    <span style="font-weight: 500;">${(0, helpers_1.escapeHtml)(int.name)}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

            </aside>

            <!-- Main Content (78%) -->
            <main style="flex: 1; background-color: ${mainBg}; color: ${mainText};">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead><tr><td style="height: 20px;"></td></tr></thead>
                    <tfoot><tr><td style="height: 20px;"></td></tr></tfoot>
                    <tbody>
                        <tr>
                            <td style="padding: 36px 40px; vertical-align: top;">
                
                <!-- Header -->
                <div style="margin-bottom: 48px;">
                    <h1 style="font-family: ${headingFont}; font-size: ${fs.name}; font-weight: 800; color: ${mainText}; text-transform: uppercase; margin: 0 0 8px 0; line-height: 0.95;">
                        ${(0, helpers_1.escapeHtml)(personalInfo.fullName || 'Your Name')}
                    </h1>
                    <p style="font-family: ${headingFont}; font-size: ${fs.jobTitle}; color: ${accentColor}; text-transform: uppercase; font-weight: 700; letter-spacing: 0.15em; margin: 0;">
                        ${(0, helpers_1.escapeHtml)(personalInfo.jobTitle || 'Job Title')}
                    </p>
                </div>

                <!-- Profile -->
                ${personalInfo.summary ? `
                    <div style="margin-bottom: 32px;">
                        ${MainHeader(t.sections.profile)}
                        <p style="line-height: 1.6; font-size: ${fs.body}; color: #374151;">
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
                                <div data-paginate="item">
                                    <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
                                        <h4 style="font-weight: 700; font-size: ${fs.entryTitle}; color: ${mainText}; margin: 0; text-transform: uppercase;">
                                            ${(0, helpers_1.escapeHtml)(exp.title)}
                                        </h4>
                                        <span style="font-size: ${fs.small}; color: ${accentColor}; font-weight: 700;">
                                            ${(0, dateUtils_1.formatLocalizedDate)(exp.startDate, locale)} – ${exp.current ? t.labels.present : (0, dateUtils_1.formatLocalizedDate)(exp.endDate, locale)}
                                        </span>
                                    </div>
                                    <div style="font-size: ${fs.body}; color: #4b5563; margin-bottom: 6px; font-weight: 600;">
                                        ${(0, helpers_1.escapeHtml)(exp.company)}${exp.city ? `, ${(0, helpers_1.escapeHtml)(exp.city)}` : ''}
                                    </div>
                                    <div style="font-size: ${fs.body}; line-height: 1.6; color: #374151;">
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
                                <div data-paginate="item">
                                    <h4 style="font-weight: 700; font-size: ${fs.entryTitle}; color: ${mainText}; margin: 0 0 2px 0; text-transform: uppercase;">
                                        ${(0, helpers_1.escapeHtml)(edu.degree)}
                                    </h4>
                                    <div style="font-size: ${fs.body}; color: #4b5563;">
                                        ${(0, helpers_1.escapeHtml)(edu.school)}${edu.city ? `, ${(0, helpers_1.escapeHtml)(edu.city)}` : ''}
                                    </div>
                                    <div style="font-size: ${fs.small}; color: #666;">
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
                                <div data-paginate="item">
                                    <h4 style="font-weight: 700; font-size: ${fs.entryTitle}; color: ${mainText}; margin: 0 0 2px 0;">
                                        ${(0, helpers_1.escapeHtml)(cert.name)}
                                    </h4>
                                    <div style="font-size: ${fs.body}; color: ${accentColor}; font-weight: 500;">
                                        ${(0, helpers_1.escapeHtml)(cert.issuer)}
                                    </div>
                                    <div style="font-size: ${fs.small}; color: #666;">
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
                                <div data-paginate="item">
                                    <h4 style="font-weight: 700; font-size: ${fs.entryTitle}; color: ${mainText}; margin: 0 0 2px 0;">
                                        ${(0, helpers_1.escapeHtml)(award.title)}
                                    </h4>
                                    <div style="font-size: ${fs.body}; color: ${accentColor}; font-weight: 500;">
                                        ${(0, helpers_1.escapeHtml)(award.issuer)}
                                    </div>
                                    <div style="font-size: ${fs.small}; color: #666;">
                                        ${(0, dateUtils_1.formatLocalizedDate)(award.date, locale)}
                                    </div>
                                    ${award.description ? `
                                        <p style="font-size: ${fs.body}; line-height: 1.5; color: #374151; margin: 4px 0 0 0;">
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
                                <div data-paginate="item" style="font-size: ${fs.body}; font-weight: 700; color: #374151;">
                                    ${(0, helpers_1.escapeHtml)(lang.name)} <span style="font-weight: 400; opacity: 0.8;">(${(0, helpers_1.escapeHtml)(lang.proficiency)})</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Personal Details -->
                ${(personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber)) ? `
                    <div style="margin-bottom: 32px;">
                        ${MainHeader(t.sections.personalDetails)}
                        <div style="display: flex; flex-direction: column; gap: 8px; font-size: ${fs.body};">
                            ${personalInfo.nationality ? `<div data-paginate="item"><span style="font-weight: 600;">Nationality:</span> ${(0, helpers_1.escapeHtml)(personalInfo.nationality)}</div>` : ''}
                            ${personalInfo.idType && personalInfo.idNumber ? `
                                <div data-paginate="item"><span style="font-weight: 600;">${personalInfo.idType === 'id' ? 'ID' : personalInfo.idType === 'passport' ? 'Passport' : 'Driving License'}:</span> ${(0, helpers_1.escapeHtml)(personalInfo.idNumber)}</div>
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
                                <span data-paginate="item" style="background-color: ${accentColor}; color: #1f2937; padding: 4px 12px; border-radius: 20px; font-size: ${fs.small}; font-weight: 700;">
                                    ${(0, helpers_1.escapeHtml)(str.name)}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Social Links (excluding LinkedIn, which is in sidebar contact) -->
                ${(() => {
        const socials = ['x', 'github', 'dribbble', 'behance', 'instagram']
            .filter(network => personalInfo[network]);
        return socials.length > 0 ? `
                    <div style="margin-bottom: 32px;">
                        ${MainHeader(t.sections.socialLinks || 'Social Links')}
                        <div style="display: flex; flex-direction: column; gap: 8px; font-size: ${fs.body};">
                            ${socials.map(network => `
                                <div data-paginate="item"><span style="font-weight: 600;">${network === 'x' ? 'X' : network === 'github' ? 'GitHub' : network.charAt(0).toUpperCase() + network.slice(1)}:</span> ${(0, helpers_1.escapeHtml)(personalInfo[network])}</div>
                            `).join('')}
                        </div>
                    </div>
                ` : '';
    })()}

                <!-- References -->
                ${data.references && data.references.length > 0 ? `
                    <div style="margin-bottom: 32px;">
                        ${MainHeader(t.sections.references)}
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                            ${data.references.map(ref => `
                                <div data-paginate="item">
                                    <div style="font-weight: 700; font-size: ${fs.entryTitle}; color: ${mainText};">${(0, helpers_1.escapeHtml)(ref.name)}</div>
                                    <div style="font-size: ${fs.body}; color: #4b5563;">${(0, helpers_1.escapeHtml)(ref.title)}, ${(0, helpers_1.escapeHtml)(ref.company)}</div>
                                    ${ref.email ? `<div style="font-size: ${fs.small}; color: ${accentColor};">${(0, helpers_1.escapeHtml)(ref.email)}</div>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}



                <!-- Custom Fields -->
                ${customFields.map(field => `
                    <div style="margin-bottom: 32px;">
                        ${MainHeader(field.label)}
                        <p style="line-height: 1.6; font-size: ${fs.body}; color: #374151;">
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
exports.renderSidebarNarrowYellow = renderSidebarNarrowYellow;
//# sourceMappingURL=sidebar-narrow-yellow.js.map
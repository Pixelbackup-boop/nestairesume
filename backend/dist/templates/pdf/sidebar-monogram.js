"use strict";
/**
 * Sidebar Monogram Template
 * Ported from frontend/components/templates/layouts/sidebar/SidebarMonogram.tsx
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderSidebarMonogram = void 0;
const helpers_1 = require("./shared/helpers");
const translations_1 = require("./shared/translations");
const dateUtils_1 = require("./shared/dateUtils");
const renderSidebarMonogram = (data, theme, translations, locale = 'en') => {
    const t = (0, translations_1.getTranslations)(translations);
    const { personalInfo, experience = [], education = [], skills = [], languages = [], strengths = [], interests = [], certifications = [], awards = [], fonts, background } = data;
    const headingFont = (0, helpers_1.getFontFamily)(fonts?.heading || 'Playfair Display');
    const bodyFont = (0, helpers_1.getFontFamily)(fonts?.body || 'Lato');
    // Theme colors - matching frontend SidebarMonogram.tsx
    const sidebarBg = '#374151'; // Gray 700 (dark sidebar)
    const mainBg = '#FFFFFF';
    const sidebarText = '#f9fafb'; // Light text for dark background
    const mainText = '#1f2937'; // Gray 800
    const accentColor = data.customThemeColor || '#facc15'; // Yellow 400 (gold)
    // Monogram helper
    const initials = personalInfo.fullName
        ? personalInfo.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
        : '?';
    // --- Helpers ---
    const SidebarHeader = (title) => `
        <h3 style="font-family: ${headingFont}; font-size: 14px; font-weight: 700; color: ${accentColor}; text-transform: uppercase; margin: 0 0 16px 0; letter-spacing: 0.1em;">
            ${title}
        </h3>
    `;
    const MainHeader = (title) => `
        <h3 style="font-family: ${headingFont}; font-size: 16px; font-weight: 700; color: #374151; text-transform: uppercase; margin: 0 0 16px 0; padding-bottom: 4px; border-bottom: 2px solid #374151;">
            ${title}
        </h3>
    `;
    const contactItems = [
        { value: personalInfo.phone, icon: 'phone' },
        { value: personalInfo.email, icon: 'email' },
        { value: personalInfo.location, icon: 'location' },
        { value: personalInfo.website, icon: 'website' }
    ].filter(item => item.value);
    return `
        <!-- Fixed background that covers full page on ALL pages -->
        <div class="sidebar-bg-fixed" style="background-color: ${sidebarBg}; width: 30%;"></div>
        <!-- Fixed accent stripe at 30% position (right edge of sidebar) - full page height -->
        <div style="position: fixed; top: 0; left: 30%; width: 8px; height: 100%; background-color: ${accentColor}; z-index: 2;"></div>

        <!-- Table layout for content structure -->
        <div style="width: 100%; min-height: 100%; font-family: ${bodyFont}; background-color: ${mainBg}; color: ${mainText}; display: table; table-layout: fixed; position: relative;">

            <!-- Sidebar (30%) - table-cell, no border (handled by fixed stripe) -->
            <aside style="display: table-cell; width: 30%; background-color: ${sidebarBg}; color: ${sidebarText}; padding: 48px 24px; vertical-align: top;">

                <!-- Profile Image or Monogram -->
                <div style="margin-bottom: 48px; display: flex; justify-content: center;">
                    ${personalInfo.profileImage ? `
                        <img
                            src="${personalInfo.profileImage}"
                            alt="${(0, helpers_1.escapeHtml)(personalInfo.fullName || 'Profile')}"
                            style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 4px solid ${accentColor}; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);"
                        />
                    ` : `
                        <div style="width: 100px; height: 100px; border-radius: 50%; background-color: ${mainBg}; display: flex; align-items: center; justify-content: center; color: ${sidebarBg}; font-family: ${headingFont}; font-size: 40px; font-weight: 700; border: 4px solid ${accentColor};">
                            ${initials}
                        </div>
                    `}
                </div>

                <!-- Contact -->
                <div style="margin-bottom: 40px;">
                    ${SidebarHeader(t.sections.contact)}
                    <div style="font-size: 12px; display: flex; flex-direction: column; gap: 12px;">
                        ${contactItems.map(item => `
                            <div style="display: flex; gap: 10px; align-items: flex-start;">
                                <span style="color: ${accentColor}; margin-top: 2px;">${(0, helpers_1.getIconSVG)(item.icon, accentColor, 14)}</span>
                                <span style="word-break: break-all;">${(0, helpers_1.escapeHtml)(item.value)}</span>
                            </div>
                        `).join('')}
                    </div>
                        <!-- Extra Socials -->
                        ${['github', 'twitter', 'linkedin', 'dribbble', 'behance', 'instagram'].map(network => {
        const val = personalInfo[network];
        if (!val || contactItems.find(c => c.value === val))
            return '';
        return `
                                <div style="display: flex; gap: 10px; align-items: flex-start;">
                                    <span style="color: ${accentColor}; margin-top: 2px;">${(0, helpers_1.getIconSVG)(network, accentColor, 14)}</span>
                                    <span style="word-break: break-all;">${(0, helpers_1.escapeHtml)(val)}</span>
                                </div>
                            `;
    }).join('')}
                    </div>
                </div>

                <!-- Personal Details -->
                ${(personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber)) ? `
                    <div style="margin-bottom: 40px;">
                        ${SidebarHeader(t.sections.personalDetails)}
                        <div style="font-size: 12px; display: flex; flex-direction: column; gap: 8px;">
                            ${personalInfo.nationality ? `<div><span style="color: ${accentColor}; font-weight: 500;">Nationality:</span> ${(0, helpers_1.escapeHtml)(personalInfo.nationality)}</div>` : ''}
                            ${personalInfo.idType && personalInfo.idNumber ? `
                                <div><span style="color: ${accentColor}; font-weight: 500;">${personalInfo.idType === 'id' ? 'ID' : personalInfo.idType === 'passport' ? 'Passport' : 'License'}:</span> ${(0, helpers_1.escapeHtml)(personalInfo.idNumber)}</div>
                            ` : ''}
                        </div>
                    </div>
                ` : ''}

                <!-- Languages -->
                ${languages && languages.length > 0 ? `
                    <div style="margin-bottom: 40px;">
                        ${SidebarHeader(t.sections.languages)}
                        <div style="display: flex; flex-direction: column; gap: 8px; font-size: 12px;">
                            ${languages.map(lang => `
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <span>${(0, helpers_1.escapeHtml)(lang.name)}</span>
                                    ${lang.proficiency ? `<span style="color: ${accentColor}; font-weight: 500;">${(0, helpers_1.escapeHtml)(lang.proficiency)}</span>` : ''}
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
                                <div>
                                    <div style="font-size: 12px; margin-bottom: 4px; color: ${sidebarText};">
                                        ${(0, helpers_1.escapeHtml)(str.name)}
                                    </div>
                                    <div style="width: 100%; height: 5px; background-color: #6b7280; border-radius: 3px;">
                                        <div style="width: ${str.level ?? 80}%; height: 100%; background-color: ${accentColor}; border-radius: 3px;"></div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Interests -->
                ${interests && interests.length > 0 ? `
                    <div style="margin-bottom: 40px;">
                        ${SidebarHeader(t.sections.interests)}
                        <div style="display: flex; flex-direction: column; gap: 6px; font-size: 12px;">
                            ${interests.map(int => `
                                <div>• ${(0, helpers_1.escapeHtml)(int.name)}</div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

            </aside>

            <!-- Main Content (70%) - table-cell for equal height -->
            <main style="display: table-cell; width: 70%; padding: 64px 48px; vertical-align: top;">

                <!-- Header -->
                <div style="margin-bottom: 48px; border-bottom: 1px solid ${accentColor}; padding-bottom: 16px;">
                    <h1 style="font-family: ${headingFont}; font-size: 42px; font-weight: 700; color: #111827; text-transform: uppercase; margin: 0 0 8px 0; letter-spacing: 0.05em;">
                        ${(0, helpers_1.escapeHtml)(personalInfo.fullName || 'Your Name')}
                    </h1>
                    <p style="font-family: ${headingFont}; font-size: 16px; color: #4b5563; text-transform: uppercase; font-weight: 500; letter-spacing: 0.2em; margin: 0;">
                        ${(0, helpers_1.escapeHtml)(personalInfo.jobTitle || 'Job Title')}
                    </p>
                </div>

                <!-- Profile -->
                ${personalInfo.summary ? `
                    <div style="margin-bottom: 40px;">
                        ${MainHeader(t.sections.profile)}
                        <p style="line-height: 1.6; font-size: 12px; color: #4b5563;">
                            ${(0, helpers_1.formatDescription)(personalInfo.summary)}
                        </p>
                    </div>
                ` : ''}

                <!-- Experience -->
                ${experience.length > 0 ? `
                    <div style="margin-bottom: 40px;">
                        ${MainHeader(t.sections.experience)}
                        <div style="display: flex; flex-direction: column; gap: 32px;">
                            ${experience.map(exp => `
                                <div>
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                                        <h4 style="font-weight: 800; font-size: 14px; color: ${mainText}; margin: 0; text-transform: uppercase;">
                                            ${(0, helpers_1.escapeHtml)(exp.title)}
                                        </h4>
                                        <span style="font-size: 11px; color: #374151; font-weight: 600;">
                                            ${(0, dateUtils_1.formatLocalizedDate)(exp.startDate, locale)} – ${exp.current ? t.labels.present : (0, dateUtils_1.formatLocalizedDate)(exp.endDate, locale)}
                                        </span>
                                    </div>
                                    <div style="font-size: 12px; color: #6b7280; margin-bottom: 8px; font-weight: 600;">
                                        ${(0, helpers_1.escapeHtml)(exp.company)}${exp.city ? ` | ${(0, helpers_1.escapeHtml)(exp.city)}` : ''}
                                    </div>
                                    <div style="font-size: 12px; line-height: 1.6; color: #4b5563;">
                                        ${(0, helpers_1.formatDescription)(exp.description || '')}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Education -->
                ${education.length > 0 ? `
                    <div style="margin-bottom: 40px;">
                        ${MainHeader(t.sections.education)}
                        <div style="display: flex; flex-direction: column; gap: 16px;">
                            ${education.map(edu => `
                                <div data-paginate="item">
                                    <h4 style="font-weight: 700; font-size: 14px; color: #111827; margin: 0;">
                                        ${(0, helpers_1.escapeHtml)(edu.degree)}
                                    </h4>
                                    <div style="font-size: 12px; color: #4b5563;">
                                        ${(0, helpers_1.escapeHtml)(edu.school)}${edu.city ? `, ${(0, helpers_1.escapeHtml)(edu.city)}` : ''}
                                    </div>
                                    <div style="font-size: 11px; color: #6b7280;">
                                        ${(0, dateUtils_1.formatLocalizedDate)(edu.startDate, locale)} – ${edu.endDate ? (0, dateUtils_1.formatLocalizedDate)(edu.endDate, locale) : t.labels.present}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Skills -->
                ${skills.length > 0 ? `
                    <div style="margin-bottom: 40px;">
                        ${MainHeader(t.sections.skills)}
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                            ${skills.map(skill => `
                                <div>
                                    <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                                        <span style="font-weight: 500; color: #374151;">${(0, helpers_1.escapeHtml)(skill.name)}</span>
                                    </div>
                                    <div style="width: 100%; height: 6px; background-color: #e5e7eb; border-radius: 3px;">
                                        <div style="width: ${(skill.level || 3) * 20}%; height: 100%; background-color: ${accentColor}; border-radius: 3px;"></div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Credentials (Certifications & Awards) -->
                ${(certifications.length > 0 || awards.length > 0) ? `
                    <div style="margin-top: 40px;">
                        ${MainHeader(t.sections.credentials)}

                        ${certifications.length > 0 ? `
                            <div style="margin-bottom: ${awards.length > 0 ? '24px' : '0'};">
                                <h4 style="font-size: 13px; font-weight: 600; color: #4b5563; margin: 0 0 12px 0;">
                                    ${t.sections.certifications}
                                </h4>
                                <div style="display: flex; flex-direction: column; gap: 12px;">
                                    ${certifications.map(cert => `
                                        <div data-paginate="item">
                                            <div style="font-weight: 600; font-size: 12px; color: ${mainText};">
                                                ${(0, helpers_1.escapeHtml)(cert.name)}
                                            </div>
                                            <div style="font-size: 11px; color: #6b7280;">
                                                ${(0, helpers_1.escapeHtml)(cert.issuer)} • ${(0, dateUtils_1.formatLocalizedDate)(cert.date, locale)}
                                            </div>
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
                                            <div style="font-weight: 600; font-size: 12px; color: ${mainText};">
                                                ${(0, helpers_1.escapeHtml)(award.title)}
                                            </div>
                                            <div style="font-size: 11px; color: #6b7280;">
                                                ${(0, helpers_1.escapeHtml)(award.issuer)} • ${(0, dateUtils_1.formatLocalizedDate)(award.date, locale)}
                                            </div>
                                            ${award.description ? `
                                                <p style="font-size: 11px; color: #374151; margin: 4px 0 0 0; line-height: 1.5;">
                                                    ${(0, helpers_1.formatDescription)(award.description)}
                                                </p>
                                            ` : ''}
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}
                    </div>
                ` : ''}

                <!-- References -->
                ${data.references && data.references.length > 0 ? `
                    <div style="margin-top: 40px;">
                        ${MainHeader(t.sections.references)}
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
                            ${data.references.map(ref => `
                                <div>
                                    <div style="font-weight: 700; font-size: 13px; color: ${mainText};">${(0, helpers_1.escapeHtml)(ref.name)}</div>
                                    <div style="font-size: 12px; color: #4b5563;">${(0, helpers_1.escapeHtml)(ref.title)}, ${(0, helpers_1.escapeHtml)(ref.company)}</div>
                                    ${ref.email ? `<div style="font-size: 11px; color: ${accentColor};">${(0, helpers_1.escapeHtml)(ref.email)}</div>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Custom Field -->
                ${personalInfo.customField ? `
                    <div style="margin-top: 40px;">
                        ${MainHeader(personalInfo.customFieldLabel || t.sections.additionalInfo)}
                         <p style="line-height: 1.6; font-size: 12px; color: #4b5563;">
                            ${(0, helpers_1.formatDescription)(personalInfo.customField)}
                        </p>
                    </div>
                ` : ''}

            </main>
        </div>
    `;
};
exports.renderSidebarMonogram = renderSidebarMonogram;
//# sourceMappingURL=sidebar-monogram.js.map
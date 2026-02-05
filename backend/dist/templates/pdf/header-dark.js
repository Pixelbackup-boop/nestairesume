"use strict";
/**
 * Header Dark Template
 * Ported from frontend/components/templates/layouts/header/HeaderDark.tsx
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderHeaderDark = void 0;
const helpers_1 = require("./shared/helpers");
const translations_1 = require("./shared/translations");
const dateUtils_1 = require("./shared/dateUtils");
const renderHeaderDark = (data, theme, translations, locale = 'en') => {
    const t = (0, translations_1.getTranslations)(translations);
    const { personalInfo, experience = [], education = [], skills = [], languages = [], strengths = [], interests = [], certifications = [], awards = [], fonts } = data;
    const headingFont = (0, helpers_1.getFontFamily)(fonts?.heading || 'Montserrat');
    const bodyFont = (0, helpers_1.getFontFamily)(fonts?.body || 'Open Sans');
    // Parse dual color: primary = sidebar bg, secondary = accent
    const { primary: sidebarBg, secondary: accentColor } = (0, helpers_1.parseDualColor)(data.customThemeColor, { primary: '#0f172a', secondary: '#facc15' } // Slate 900 + Yellow 400 defaults
    );
    // Auto-calculate text colors based on backgrounds
    const sidebarText = (0, helpers_1.getContrastText)(sidebarBg);
    const mainBg = '#ffffff';
    const textDark = '#334155'; // Slate 700
    // Helper for Sidebar Section Headers
    const SidebarSectionHeader = (title) => `
        <h3 style="font-family: ${headingFont}; font-size: 14px; font-weight: 700; color: ${sidebarText}; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 20px; padding-bottom: 8px; border-bottom: 2px solid ${accentColor};">
            ${title}
        </h3>
    `;
    // Helper for Main Section Headers
    const MainSectionHeader = (title) => `
        <h3 style="font-family: ${headingFont}; font-size: 14px; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 24px; display: flex; align-items: center; gap: 16px;">
            <span style="width: 40px; height: 4px; background-color: ${accentColor}; display: inline-block;"></span>
            ${title}
        </h3>
    `;
    // Profile Image - use flexbox centering (matching frontend)
    const profileImage = personalInfo.profileImage ? `
        <img
            src="${personalInfo.profileImage}"
            alt="${(0, helpers_1.escapeHtml)(personalInfo.fullName)}"
            style="width: 140px; height: 140px; border-radius: 50%; object-fit: cover; border: 4px solid ${accentColor};"
        />
    ` : `
        <div style="width: 140px; height: 140px; border-radius: 50%; background-color: ${(0, helpers_1.hexToRgba)(sidebarText, 0.1)}; border: 4px solid ${accentColor}; display: flex; align-items: center; justify-content: center; font-size: 48px; color: ${sidebarText};">
            ${(0, helpers_1.escapeHtml)(personalInfo.fullName?.charAt(0) || '?')}
        </div>
    `;
    return `
        <!-- Fixed background that covers full page on ALL pages -->
        <div class="sidebar-bg-fixed" style="background-color: ${sidebarBg}; width: 33%;"></div>

        <!-- Flex layout for content structure (matching frontend) -->
        <div style="width: 100%; min-height: 100%; font-family: ${bodyFont}; font-size: 10pt; color: ${textDark}; display: flex; box-sizing: border-box;">

            <!-- Left Sidebar -->
            <aside class="sidebar-content" style="width: 33%; background-color: ${sidebarBg}; color: ${sidebarText}; padding: 40px 20px; flex-shrink: 0; min-height: 100%; display: flex; flex-direction: column; align-items: center; position: relative; z-index: 1;">

                <!-- Photo -->
                <div style="margin-bottom: 50px;">
                    ${profileImage}
                </div>

                <!-- Contact Info -->
                <div style="width: 100%; margin-bottom: 40px;">
                    ${SidebarSectionHeader(t.sections.contact)}
                    <div style="font-size: 9pt; display: flex; flex-direction: column; gap: 12px;">
                        ${personalInfo.phone ? `
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <span style="opacity: 0.9;">${(0, helpers_1.getIconSVG)('phone', sidebarText, 14)}</span>
                                <span style="word-break: break-all; opacity: 0.9;">${(0, helpers_1.escapeHtml)(personalInfo.phone)}</span>
                            </div>
                        ` : ''}
                        ${personalInfo.email ? `
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <span style="opacity: 0.9;">${(0, helpers_1.getIconSVG)('email', sidebarText, 14)}</span>
                                <span style="word-break: break-all; opacity: 0.9;">${(0, helpers_1.escapeHtml)(personalInfo.email)}</span>
                            </div>
                        ` : ''}
                        ${personalInfo.location ? `
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <span style="opacity: 0.9;">${(0, helpers_1.getIconSVG)('location', sidebarText, 14)}</span>
                                <span style="word-break: break-all; opacity: 0.9;">${(0, helpers_1.escapeHtml)(personalInfo.location)}</span>
                            </div>
                        ` : ''}
                        ${personalInfo.website ? `
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <span style="opacity: 0.9;">${(0, helpers_1.getIconSVG)('website', sidebarText, 14)}</span>
                                <span style="word-break: break-all; opacity: 0.9;">${(0, helpers_1.escapeHtml)(personalInfo.website)}</span>
                            </div>
                        ` : ''}
                        ${personalInfo.linkedin ? `
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <span style="opacity: 0.9;">${(0, helpers_1.getIconSVG)('linkedin', sidebarText, 14)}</span>
                                <span style="word-break: break-all; opacity: 0.9;">${(0, helpers_1.escapeHtml)(personalInfo.linkedin)}</span>
                            </div>
                        ` : ''}
                        ${personalInfo.github ? `
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <span style="opacity: 0.9;">${(0, helpers_1.getIconSVG)('github', sidebarText, 14)}</span>
                                <span style="word-break: break-all; opacity: 0.9;">${(0, helpers_1.escapeHtml)(personalInfo.github)}</span>
                            </div>
                        ` : ''}
                        ${personalInfo.twitter ? `
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <span style="opacity: 0.9;">${(0, helpers_1.getIconSVG)('users', sidebarText, 14)}</span>
                                <span style="word-break: break-all; opacity: 0.9;">${(0, helpers_1.escapeHtml)(personalInfo.twitter)}</span>
                            </div>
                        ` : ''}
                        ${personalInfo.dribbble ? `
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <span style="opacity: 0.9;">${(0, helpers_1.getIconSVG)('palette', sidebarText, 14)}</span>
                                <span style="word-break: break-all; opacity: 0.9;">${(0, helpers_1.escapeHtml)(personalInfo.dribbble)}</span>
                            </div>
                        ` : ''}
                        ${personalInfo.behance ? `
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <span style="opacity: 0.9;">${(0, helpers_1.getIconSVG)('palette', sidebarText, 14)}</span>
                                <span style="word-break: break-all; opacity: 0.9;">${(0, helpers_1.escapeHtml)(personalInfo.behance)}</span>
                            </div>
                        ` : ''}
                        ${personalInfo.instagram ? `
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <span style="opacity: 0.9;">${(0, helpers_1.getIconSVG)('camera', sidebarText, 14)}</span>
                                <span style="word-break: break-all; opacity: 0.9;">${(0, helpers_1.escapeHtml)(personalInfo.instagram)}</span>
                            </div>
                        ` : ''}
                    </div>
                </div>

                <!-- Skills -->
                ${skills.length > 0 ? `
                    <div style="width: 100%; margin-bottom: 40px;">
                        ${SidebarSectionHeader(t.sections.skills)}
                        <div style="display: flex; flex-direction: column; gap: 10px;">
                            ${skills.map(skill => `
                                <div>
                                    <div style="margin-bottom: 4px; font-size: 9pt; font-weight: 500;">${(0, helpers_1.escapeHtml)(skill.name)}</div>
                                    <div style="width: 100%; height: 6px; background-color: ${(0, helpers_1.hexToRgba)(sidebarText, 0.15)}; border-radius: 3px; overflow: hidden;">
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
                                <span style="background-color: ${(0, helpers_1.hexToRgba)(sidebarText, 0.08)}; color: ${accentColor}; padding: 4px 12px; border-radius: 4px; font-size: 8pt; font-weight: 500; border: 1px solid ${(0, helpers_1.hexToRgba)(accentColor, 0.25)};">
                                    ${(0, helpers_1.escapeHtml)(str.name)}
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
                                <span style="font-size: 9pt; display: flex; align-items: center; gap: 6px; color: ${sidebarText};">
                                    <span style="color: ${accentColor};">✦</span> ${(0, helpers_1.escapeHtml)(int.name)}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

            </aside>

            <!-- Main Content -->
            <main style="flex: 1; padding: 56px 40px; background-color: ${mainBg}; display: flex; flex-direction: column;">
                
                <!-- Name Header -->
                <div style="margin-bottom: 50px;">
                    <h1 style="font-family: ${headingFont}; font-size: 36px; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 0.1em; margin: 0; line-height: 1;">
                        ${(0, helpers_1.escapeHtml)(personalInfo.fullName || 'Your Name')}
                    </h1>
                    <p style="font-size: 14px; color: #64748b; text-transform: uppercase; font-weight: 600; margin-top: 10px; letter-spacing: 0.05em;">
                        ${(0, helpers_1.escapeHtml)(personalInfo.jobTitle || 'Job Title')}
                    </p>
                </div>

                <!-- Profile -->
                ${personalInfo.summary ? `
                    <section style="margin-bottom: 40px;">
                        ${MainSectionHeader(t.sections.profile)}
                        <p style="line-height: 1.6; font-size: 10pt; color: #334155;">
                            ${(0, helpers_1.formatDescription)(personalInfo.summary)}
                        </p>
                    </section>
                ` : ''}

                <!-- Experience -->
                ${experience.length > 0 ? `
                    <section style="margin-bottom: 40px;">
                        ${MainSectionHeader(t.sections.experience)}
                        <div style="display: flex; flex-direction: column; gap: 24px;">
                            ${experience.map(exp => `
                                <div>
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 2px; align-items: baseline;">
                                        <h4 style="font-weight: 700; font-size: 11pt; text-transform: uppercase; color: #0f172a; margin: 0;">
                                            ${(0, helpers_1.escapeHtml)(exp.title)}
                                        </h4>
                                    </div>
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 9pt; color: #64748b; font-weight: 600;">
                                        <span>${(0, helpers_1.escapeHtml)(exp.company)}${exp.city ? `, ${(0, helpers_1.escapeHtml)(exp.city)}` : ''}</span>
                                        <span>${(0, dateUtils_1.formatLocalizedDate)(exp.startDate, locale)} – ${exp.current ? t.labels.present : (0, dateUtils_1.formatLocalizedDate)(exp.endDate, locale)}</span>
                                    </div>
                                    <div style="font-size: 10pt; line-height: 1.6; color: #334155;">
                                        ${(0, helpers_1.formatDescription)(exp.description || '')}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </section>
                ` : ''}

                <!-- Education -->
                ${education.length > 0 ? `
                    <section style="margin-bottom: 40px;">
                        ${MainSectionHeader(t.sections.education)}
                        <div style="display: flex; flex-direction: column; gap: 20px;">
                            ${education.map(edu => `
                                <div>
                                    <h4 style="font-weight: 700; font-size: 11pt; color: #0f172a; margin: 0;">
                                        ${(0, helpers_1.escapeHtml)(edu.degree)}
                                    </h4>
                                    <p style="font-size: 10pt; color: #475569; font-weight: 500; margin: 2px 0;">
                                        ${(0, helpers_1.escapeHtml)(edu.school)}${edu.city ? `, ${(0, helpers_1.escapeHtml)(edu.city)}` : ''}
                                    </p>
                                    <p style="font-size: 9pt; color: #64748b; margin: 0;">
                                        ${(0, dateUtils_1.formatLocalizedDate)(edu.startDate, locale)} – ${edu.endDate ? (0, dateUtils_1.formatLocalizedDate)(edu.endDate, locale) : t.labels.present}
                                    </p>
                                </div>
                            `).join('')}
                        </div>
                    </section>
                ` : ''}

                <!-- Languages -->
                ${languages && languages.length > 0 ? `
                    <section style="margin-bottom: 40px;">
                        ${MainSectionHeader(t.sections.languages)}
                        <div style="display: flex; flex-wrap: wrap; gap: 12px 24px;">
                            ${languages.map(lang => `
                                <div style="font-size: 10pt;">
                                    <span style="font-weight: 600; color: #0f172a;">${(0, helpers_1.escapeHtml)(lang.name)}</span>
                                    <span style="color: #64748b; margin-left: 6px;">(${(0, helpers_1.escapeHtml)(lang.proficiency)})</span>
                                </div>
                            `).join('')}
                        </div>
                    </section>
                ` : ''}

                <!-- Credentials -->
                ${(certifications && certifications.length > 0) || (awards && awards.length > 0) ? `
                    <section style="margin-bottom: 40px;">
                        ${MainSectionHeader(t.sections.credentials)}
                        <div style="display: flex; gap: 40px;">
                            ${certifications && certifications.length > 0 ? `
                                <div style="flex: 1;">
                                    <h4 style="font-size: 10pt; font-weight: 600; color: #64748b; margin-bottom: 12px;">Certifications</h4>
                                    <div style="display: flex; flex-direction: column; gap: 12px;">
                                        ${certifications.map(cert => `
                                            <div>
                                                <div style="font-weight: 700; font-size: 10pt; color: #0f172a;">${(0, helpers_1.escapeHtml)(cert.name)}</div>
                                                <div style="font-size: 9pt; color: #64748b;">${(0, helpers_1.escapeHtml)(cert.issuer)} • ${(0, dateUtils_1.formatLocalizedDate)(cert.date, locale)}</div>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}
                            ${awards && awards.length > 0 ? `
                                <div style="flex: 1;">
                                    <h4 style="font-size: 10pt; font-weight: 600; color: #64748b; margin-bottom: 12px;">Awards & Achievements</h4>
                                    <div style="display: flex; flex-direction: column; gap: 12px;">
                                        ${awards.map(award => `
                                            <div>
                                                <div style="font-weight: 700; font-size: 10pt; color: #0f172a;">${(0, helpers_1.escapeHtml)(award.title)}</div>
                                                <div style="font-size: 9pt; color: #64748b;">${(0, helpers_1.escapeHtml)(award.issuer)} • ${(0, dateUtils_1.formatLocalizedDate)(award.date, locale)}</div>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                    </section>
                ` : ''}

                <!-- References -->
                ${data.references && data.references.length > 0 ? `
                    <section style="margin-bottom: 40px;">
                        ${MainSectionHeader(t.sections.references)}
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                            ${data.references.map(ref => `
                                <div>
                                    <div style="font-weight: 700; font-size: 10pt; color: #0f172a;">${(0, helpers_1.escapeHtml)(ref.name)}</div>
                                    <div style="font-size: 9pt; color: #64748b;">${(0, helpers_1.escapeHtml)(ref.title)}, ${(0, helpers_1.escapeHtml)(ref.company)}</div>
                                    ${ref.email ? `<div style="font-size: 9pt; color: ${accentColor};">${(0, helpers_1.escapeHtml)(ref.email)}</div>` : ''}
                                    ${ref.phone ? `<div style="font-size: 9pt; color: ${accentColor};">${(0, helpers_1.escapeHtml)(ref.phone)}</div>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </section>
                ` : ''}

                <!-- Personal Details & Custom Field -->
                ${(personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber) || personalInfo.customField) ? `
                    <section>
                        ${MainSectionHeader(t.sections.additionalInfo)}
                        <div style="font-size: 10pt; color: #334155; display: flex; flex-direction: column; gap: 12px;">
                            ${personalInfo.nationality ? `<div><span style="font-weight: 700; color: #0f172a;">Nationality:</span> ${(0, helpers_1.escapeHtml)(personalInfo.nationality)}</div>` : ''}
                            ${personalInfo.idType && personalInfo.idNumber ? `
                                <div><span style="font-weight: 700; color: #0f172a;">${personalInfo.idType === 'id' ? 'ID' : personalInfo.idType === 'passport' ? 'Passport' : 'License'}:</span> ${(0, helpers_1.escapeHtml)(personalInfo.idNumber)}</div>
                            ` : ''}
                            ${personalInfo.customField ? `
                                <div>
                                    <span style="font-weight: 700; color: #0f172a; display: block; margin-bottom: 4px;">${(0, helpers_1.escapeHtml)(personalInfo.customFieldLabel || 'Custom Info')}</span>
                                    ${(0, helpers_1.formatDescription)(personalInfo.customField)}
                                </div>
                            ` : ''}
                        </div>
                    </section>
                ` : ''}

            </main>
        </div>
    `;
};
exports.renderHeaderDark = renderHeaderDark;
//# sourceMappingURL=header-dark.js.map
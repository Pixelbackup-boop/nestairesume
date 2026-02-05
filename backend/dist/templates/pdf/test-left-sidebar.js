"use strict";
/**
 * Test Left Sidebar Template
 * Experimental template to fix sidebar background on multi-page PDFs
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderTestLeftSidebar = void 0;
const helpers_1 = require("./shared/helpers");
const translations_1 = require("./shared/translations");
const dateUtils_1 = require("./shared/dateUtils");
const renderTestLeftSidebar = (data, theme, translations, locale = 'en') => {
    const t = (0, translations_1.getTranslations)(translations);
    const { personalInfo, experience = [], education = [], skills = [], languages = [], certifications = [], awards = [], fonts, } = data;
    const headingFont = (0, helpers_1.getFontFamily)(fonts?.heading || 'Roboto');
    const bodyFont = (0, helpers_1.getFontFamily)(fonts?.body || 'Roboto');
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
            alt="${(0, helpers_1.escapeHtml)(personalInfo.fullName)}"
            style="width: ${photoSize}px; height: ${photoSize}px; border-radius: 50%; object-fit: cover; border: 3px solid ${accentColor};"
        />
    ` : `
        <div style="width: ${photoSize}px; height: ${photoSize}px; border-radius: 50%; background-color: ${accentColor}20; border: 3px solid ${accentColor}; display: flex; align-items: center; justify-content: center; font-family: ${headingFont}; font-size: 36px; color: ${accentColor}; font-weight: 700;">
            ${(0, helpers_1.escapeHtml)(personalInfo.fullName?.charAt(0) || '?')}
        </div>
    `;
    // Section headers
    const SidebarHeader = (title) => `
        <h3 style="font-family: ${headingFont}; font-size: 12px; font-weight: 700; color: ${accentColor}; text-transform: uppercase; margin: 0 0 12px 0; padding-bottom: 4px; border-bottom: 1px solid ${accentColor}40;">
            ${title}
        </h3>
    `;
    const MainHeader = (title) => `
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
                top: 0;
                left: 0;
                bottom: 0;
                width: 35%;
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
                padding: 40px 36px;
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
                                <span style="color: ${accentColor};">${(0, helpers_1.getIconSVG)(item.icon, accentColor, 12)}</span>
                                <span style="word-break: break-all;">${(0, helpers_1.escapeHtml)(item.value)}</span>
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
                                    <div style="font-weight: 700; font-size: 12px; color: #ffffff;">${(0, helpers_1.escapeHtml)(edu.degree)}</div>
                                    <div style="font-size: 11px; color: ${accentColor};">${(0, helpers_1.escapeHtml)(edu.school)}</div>
                                    <div style="font-size: 10px; opacity: 0.8;">${(0, dateUtils_1.formatLocalizedDate)(edu.startDate, locale)} – ${edu.endDate ? (0, dateUtils_1.formatLocalizedDate)(edu.endDate, locale) : t.labels.present}</div>
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
                                    <div style="font-size: 11px; margin-bottom: 3px;">${(0, helpers_1.escapeHtml)(skill.name)}</div>
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
                                <span>${(0, helpers_1.escapeHtml)(lang.name)} <span style="color: ${accentColor};">(${(0, helpers_1.escapeHtml)(lang.proficiency)})</span></span>
                            `).join(' • ')}
                        </div>
                    </div>
                ` : ''}
            </div>

            <!-- MAIN CONTENT AREA -->
            <div class="test-main">
                <!-- Header -->
                <div style="margin-bottom: 32px;">
                    <h1 style="font-family: ${headingFont}; font-size: 28px; font-weight: 800; color: ${sidebarBg}; text-transform: uppercase; margin: 0 0 6px 0;">
                        ${(0, helpers_1.escapeHtml)(personalInfo.fullName || 'Your Name')}
                    </h1>
                    <p style="font-family: ${headingFont}; font-size: 14px; color: ${accentColor}; text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em; margin: 0;">
                        ${(0, helpers_1.escapeHtml)(personalInfo.jobTitle || 'Job Title')}
                    </p>
                </div>

                <!-- Profile -->
                ${personalInfo.summary ? `
                    <div style="margin-bottom: 24px;">
                        ${MainHeader(t.sections.profile)}
                        <p style="line-height: 1.5; font-size: 11px; color: #475569;">
                            ${(0, helpers_1.formatDescription)(personalInfo.summary)}
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
                                            ${(0, helpers_1.escapeHtml)(exp.title)}
                                        </h4>
                                        <span style="font-size: 10px; color: ${accentColor}; font-weight: 600;">
                                            ${(0, dateUtils_1.formatLocalizedDate)(exp.startDate, locale)} – ${exp.current ? t.labels.present : (0, dateUtils_1.formatLocalizedDate)(exp.endDate, locale)}
                                        </span>
                                    </div>
                                    <div style="font-size: 11px; color: #64748b; margin-bottom: 6px; font-weight: 500;">
                                        ${(0, helpers_1.escapeHtml)(exp.company)}${exp.city ? ` | ${(0, helpers_1.escapeHtml)(exp.city)}` : ''}
                                    </div>
                                    <div style="font-size: 11px; line-height: 1.5; color: #475569;">
                                        ${(0, helpers_1.formatDescription)(exp.description || '')}
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
                                    <span style="font-weight: 700; font-size: 11px; color: ${sidebarBg};">${(0, helpers_1.escapeHtml)(cert.name)}</span>
                                    <span style="font-size: 10px; color: ${accentColor};"> - ${(0, helpers_1.escapeHtml)(cert.issuer)}</span>
                                    <span style="font-size: 10px; color: #64748b;"> (${(0, dateUtils_1.formatLocalizedDate)(cert.date, locale)})</span>
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
                                    <span style="font-weight: 700; font-size: 11px; color: ${sidebarBg};">${(0, helpers_1.escapeHtml)(award.title)}</span>
                                    <span style="font-size: 10px; color: ${accentColor};"> - ${(0, helpers_1.escapeHtml)(award.issuer)}</span>
                                    <span style="font-size: 10px; color: #64748b;"> (${(0, dateUtils_1.formatLocalizedDate)(award.date, locale)})</span>
                                    ${award.description ? `<p style="font-size: 10px; color: #475569; margin: 3px 0 0 0;">${(0, helpers_1.formatDescription)(award.description)}</p>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
};
exports.renderTestLeftSidebar = renderTestLeftSidebar;
//# sourceMappingURL=test-left-sidebar.js.map
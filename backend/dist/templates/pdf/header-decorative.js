"use strict";
/**
 * Header Decorative Template
 * Ported from frontend/components/templates/layouts/header/HeaderDecorative.tsx
 *
 * Dark header with subtle geometric line pattern.
 * Photo overlaps the bottom edge of the header on the left.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderHeaderDecorative = void 0;
const helpers_1 = require("./shared/helpers");
const translations_1 = require("./shared/translations");
const dateUtils_1 = require("./shared/dateUtils");
// Lucide-style SVG icons for consistent rendering
const icons = {
    user: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>`,
    briefcase: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>`,
    graduationCap: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>`,
    wrench: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
    messageCircle: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>`,
    zap: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>`,
    star: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>`,
    trophy: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>`,
    link: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
    clipboardList: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>`,
    fileText: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>`,
    pin: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`,
};
const renderHeaderDecorative = (data, theme, translations, locale = 'en') => {
    const t = (0, translations_1.getTranslations)(translations);
    const { personalInfo, experience = [], education = [], skills = [], languages = [], strengths = [], interests = [], awards = [], certifications = [], references = [], customFields = [], fonts } = data;
    const headingFont = (0, helpers_1.getFontFamily)(fonts?.heading || 'Merriweather');
    const bodyFont = (0, helpers_1.getFontFamily)(fonts?.body || 'Inter');
    const sizeConfig = data.fonts?.size || 'medium'; // 'small' | 'medium' | 'large'
    // Font Scaling
    const scale = (0, helpers_1.getFontScale)(fonts?.size);
    const s = (px) => `${Math.max(5, Math.round(px * scale))}px`;
    const sizes = {
        name: s(32),
        jobTitle: s(14),
        sectionHeading: s(14),
        entryTitle: s(12),
        body: s(11),
        small: s(10)
    };
    // Colors — dual color: primary = header bg, secondary = accent
    const { primary: headerBgColor, secondary: accentColor } = (0, helpers_1.parseDualColor)(data.customThemeColor, { primary: '#1f1f1f', secondary: '#eab308' });
    const headerText = (0, helpers_1.getContrastText)(headerBgColor);
    // Dimensions
    const headerHeight = 180;
    const photoSize = 150;
    const photoOffset = photoSize / 3;
    // Helper for Section Headers
    const SectionHeader = (title, iconName) => `
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px; border-bottom: 2px solid #f3f4f6; padding-bottom: 8px;">
            <span style="display: flex; align-items: center; justify-content: center; color: ${accentColor};">${icons[iconName] || icons.star}</span>
            <h3 style="font-family: ${headingFont}; font-size: ${sizes.sectionHeading}; font-weight: 800; color: #111827; text-transform: uppercase; letter-spacing: 0.05em; margin: 0;">
                ${title}
            </h3>
        </div>
    `;
    // Progress bar with striped pattern
    const StripedProgressBar = (label, value) => `
        <div data-paginate="item" style="margin-bottom: 12px; page-break-inside: avoid;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px; font-size: ${sizes.body};">
                <span style="font-weight: 500;">${(0, helpers_1.escapeHtml)(label)}</span>
            </div>
            <div style="width: 100%; height: 6px; background-color: #f3f4f6; border-radius: 3px; overflow: hidden;">
                <div style="width: ${value}%; height: 100%; background-color: ${accentColor}; border-radius: 3px;"></div>
            </div>
        </div>
    `;
    // Profile Image
    const profileImage = personalInfo.profileImage ? `
        <img
            src="${personalInfo.profileImage}"
            alt="${(0, helpers_1.escapeHtml)(personalInfo.fullName)}"
            style="width: 100%; height: 100%; object-fit: cover;"
        />
    ` : `
        <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 48px; color: #9ca3af; background-color: #e5e7eb;">
            ${(0, helpers_1.escapeHtml)(personalInfo.fullName?.charAt(0) || '?')}
        </div>
    `;
    return `
        <div style="width: 100%; min-height: 100%; font-family: ${bodyFont}; font-size: ${sizes.body}; background-color: #ffffff; color: #374151; position: relative; box-sizing: border-box;">
            <!-- Header Area -->
            <header style="height: ${headerHeight}px; background: radial-gradient(ellipse at 10% 0%, ${accentColor}44, transparent 60%), radial-gradient(ellipse at 90% 100%, ${accentColor}22, transparent 60%), linear-gradient(160deg, ${headerBgColor}, ${headerBgColor}); position: relative; margin-bottom: ${photoOffset + 40}px; overflow: visible;">

                <div style="padding: 32px 40px; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: flex-end; position: relative; z-index: 10;">
                    <h1 style="font-family: ${headingFont}; font-size: ${sizes.name}; font-weight: 700; color: ${headerText}; text-align: right; margin-bottom: 4px; letter-spacing: 0.05em;">
                        ${(0, helpers_1.escapeHtml)(personalInfo.fullName || 'Your Name')}
                    </h1>
                    <p style="font-size: ${sizes.jobTitle}; color: ${headerText}; font-weight: 600; text-transform: uppercase; text-align: right; margin-bottom: 12px;">
                        ${(0, helpers_1.escapeHtml)(personalInfo.jobTitle || 'Job Title')}
                    </p>

                    <div style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: flex-end; color: ${headerText}cc; font-size: ${sizes.small};">
                        ${personalInfo.email ? `<span>${(0, helpers_1.escapeHtml)(personalInfo.email)}</span>` : ''}
                        ${personalInfo.phone ? `<span>${(0, helpers_1.escapeHtml)(personalInfo.phone)}</span>` : ''}
                        ${personalInfo.location ? `<span>${(0, helpers_1.escapeHtml)(personalInfo.location)}</span>` : ''}
                        ${personalInfo.website ? `<span>${(0, helpers_1.escapeHtml)(personalInfo.website)}</span>` : ''}
                    </div>
                </div>

                <!-- Overlapping Photo (Left Aligned) -->
                <div style="position: absolute; bottom: -${photoOffset}px; left: 40px; width: ${photoSize}px; height: ${photoSize}px; border-radius: 50%; border: 6px solid #ffffff; overflow: hidden; background-color: #e5e7eb; z-index: 20;">
                    ${profileImage}
                </div>
            </header>

            <!-- Main Content Body -->
            <div style="display: flex; gap: 40px; padding: 0 40px 40px;">

                <!-- Main Column (Left) -->
                <div style="width: 60%;">

                    ${personalInfo.summary ? `
                        <section style="margin-bottom: 32px;">
                            ${SectionHeader(t.sections.profile, 'user')}
                            <p style="line-height: 1.6; font-size: ${sizes.body};">${(0, helpers_1.formatDescription)(personalInfo.summary)}</p>
                        </section>
                    ` : ''}

                    ${experience.length > 0 ? `
                        <section style="margin-bottom: 32px;">
                            ${SectionHeader(t.sections.experience, 'briefcase')}
                            <div style="display: flex; flex-direction: column; gap: 24px;">
                                ${experience.map(exp => `
                                    <div data-paginate="item" style="page-break-inside: avoid;">
                                        <div style="display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 2px;">
                                            <h4 style="font-weight: 700; font-size: ${sizes.entryTitle}; color: #111827;">${(0, helpers_1.escapeHtml)(exp.title)}</h4>
                                            <span style="font-size: ${sizes.small}; color: #6b7280; font-style: italic;">
                                                ${(0, dateUtils_1.formatLocalizedDate)(exp.startDate, locale)} – ${exp.current ? t.labels.present : (0, dateUtils_1.formatLocalizedDate)(exp.endDate, locale)}
                                            </span>
                                        </div>
                                        <p style="font-size: ${sizes.body}; font-weight: 500; color: ${accentColor}; margin-bottom: 4px;">
                                            ${(0, helpers_1.escapeHtml)(exp.company)}, ${(0, helpers_1.escapeHtml)(exp.city)}
                                        </p>
                                        <p style="font-size: ${sizes.body}; line-height: 1.5;">
                                            ${(0, helpers_1.formatDescription)(exp.description || '')}
                                        </p>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    ${education.length > 0 ? `
                        <section style="margin-bottom: 32px;">
                            ${SectionHeader(t.sections.education, 'graduationCap')}
                            <div style="display: flex; flex-direction: column; gap: 16px;">
                                ${education.map(edu => `
                                    <div data-paginate="item" style="page-break-inside: avoid;">
                                        <h4 style="font-weight: 700; font-size: ${sizes.entryTitle}; color: #111827;">${(0, helpers_1.escapeHtml)(edu.degree)}</h4>
                                        <p style="font-size: ${sizes.body}; font-weight: 500; color: ${accentColor};">
                                            ${(0, helpers_1.escapeHtml)(edu.school)}, ${(0, helpers_1.escapeHtml)(edu.city)}
                                        </p>
                                        <p style="font-size: ${sizes.small}; color: #6b7280;">
                                            ${(0, dateUtils_1.formatLocalizedDate)(edu.startDate, locale)} – ${edu.current ? t.labels.present : (edu.endDate ? (0, dateUtils_1.formatLocalizedDate)(edu.endDate, locale) : t.labels.present)}
                                        </p>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Personal Details -->
                    ${(personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber)) ? `
                        <section style="margin-bottom: 32px;">
                            ${SectionHeader(t.sections.personalDetails, 'fileText')}
                            <div style="display: flex; flex-direction: column; gap: 6px; font-size: ${sizes.body};">
                                ${personalInfo.nationality ? `<div data-paginate="item" style="page-break-inside: avoid;"><span style="font-weight: 600;">Nationality:</span> ${(0, helpers_1.escapeHtml)(personalInfo.nationality)}</div>` : ''}
                                ${personalInfo.idType && personalInfo.idNumber ? `
                                    <div data-paginate="item" style="page-break-inside: avoid;">
                                        <span style="font-weight: 600;">
                                            ${personalInfo.idType === 'id' ? 'ID' :
        personalInfo.idType === 'passport' ? 'Passport' :
            personalInfo.idType === 'driving_license' ? 'Driving License' : 'ID'}:
                                        </span> ${(0, helpers_1.escapeHtml)(personalInfo.idNumber)}
                                    </div>
                                ` : ''}
                            </div>
                        </section>
                    ` : ''}
                </div>

                <!-- Sidebar (Right) -->
                <div style="width: 35%;">

                    <!-- Skills -->
                    ${skills.length > 0 ? `
                        <section style="margin-bottom: 32px;">
                            ${SectionHeader(t.sections.skills, 'wrench')}
                            <div>
                                ${skills.map(skill => StripedProgressBar(skill.name, (skill.level || 3) * 20)).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Languages -->
                    ${languages && languages.length > 0 ? `
                        <section style="margin-bottom: 32px;">
                            ${SectionHeader(t.sections.languages, 'messageCircle')}
                            <div style="display: flex; flex-direction: column; gap: 8px;">
                                ${languages.map(lang => `
                                    <div data-paginate="item" style="display: flex; justify-content: space-between; font-size: ${sizes.body}; page-break-inside: avoid;">
                                        <span style="font-weight: 500;">${(0, helpers_1.escapeHtml)(lang.name)}</span>
                                        <span style="font-size: ${sizes.small}; color: #6b7280;">${(0, helpers_1.escapeHtml)(lang.proficiency)}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Strengths -->
                    ${strengths && strengths.length > 0 ? `
                        <section style="margin-bottom: 32px;">
                            ${SectionHeader(t.sections.strengths, 'zap')}
                            <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                                ${strengths.map(str => `
                                    <span data-paginate="item" style="font-size: ${sizes.small}; font-weight: 600; color: ${accentColor}; border: 1px solid ${accentColor}; padding: 2px 8px; border-radius: 12px; page-break-inside: avoid; display: inline-block;">
                                        ${(0, helpers_1.escapeHtml)(str.name)}
                                    </span>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Interests -->
                    ${interests && interests.length > 0 ? `
                        <section style="margin-bottom: 32px;">
                            ${SectionHeader(t.sections.interests, 'star')}
                            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                                ${interests.map(int => `
                                    <span data-paginate="item" style="font-size: ${sizes.small}; background-color: #f3f4f6; padding: 4px 8px; border-radius: 4px; color: #374151; border-left: 3px solid ${accentColor}; page-break-inside: avoid; display: inline-block;">
                                        ${(0, helpers_1.escapeHtml)(int.name)}
                                    </span>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Credentials -->
                    ${(certifications && certifications.length > 0) || (awards && awards.length > 0) ? `
                        <section style="margin-bottom: 32px;">
                            ${SectionHeader(t.sections.credentials, 'trophy')}
                            ${certifications && certifications.length > 0 ? `
                                <div style="margin-bottom: ${awards && awards.length > 0 ? '16px' : '0'};">
                                    <h4 style="font-size: ${sizes.small}; font-weight: 600; color: #6b7280; margin-bottom: 8px;">${t.sections.certifications}</h4>
                                    <div style="display: flex; flex-direction: column; gap: 12px;">
                                        ${certifications.map(cert => `
                                            <div data-paginate="item" style="font-size: ${sizes.body}; page-break-inside: avoid;">
                                                <p style="font-weight: 700; color: #111827;">${(0, helpers_1.escapeHtml)(cert.name)}</p>
                                                <p style="font-size: ${sizes.small}; color: #6b7280;">
                                                    ${(0, helpers_1.escapeHtml)(cert.issuer)} • ${(0, dateUtils_1.formatLocalizedDate)(cert.date, locale)}
                                                </p>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}
                            ${awards && awards.length > 0 ? `
                                <div>
                                    <h4 style="font-size: ${sizes.small}; font-weight: 600; color: #6b7280; margin-bottom: 8px;">${t.sections.awards}</h4>
                                    <div style="display: flex; flex-direction: column; gap: 12px;">
                                        ${awards.map(awr => `
                                            <div data-paginate="item" style="font-size: ${sizes.body}; page-break-inside: avoid;">
                                                <p style="font-weight: 700; color: #111827;">${(0, helpers_1.escapeHtml)(awr.title)}</p>
                                                <p style="font-size: ${sizes.small}; color: #6b7280;">
                                                    ${(0, helpers_1.escapeHtml)(awr.issuer)} • ${(0, dateUtils_1.formatLocalizedDate)(awr.date, locale)}
                                                </p>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}
                        </section>
                    ` : ''}

                    <!-- Social Links -->
                    ${(personalInfo.linkedin || personalInfo.x || personalInfo.github || personalInfo.dribbble || personalInfo.behance || personalInfo.instagram) ? `
                        <section style="margin-bottom: 32px;">
                            ${SectionHeader(t.sections.socialLinks, 'link')}
                            <div style="display: flex; flex-direction: column; gap: 6px; font-size: ${sizes.body};">
                                ${personalInfo.linkedin ? `<div data-paginate="item" style="page-break-inside: avoid;"><span style="font-weight: 600;">LinkedIn:</span> ${(0, helpers_1.escapeHtml)(personalInfo.linkedin)}</div>` : ''}
                                ${personalInfo.x ? `<div data-paginate="item" style="page-break-inside: avoid;"><span style="font-weight: 600;">X:</span> ${(0, helpers_1.escapeHtml)(personalInfo.x)}</div>` : ''}
                                ${personalInfo.github ? `<div data-paginate="item" style="page-break-inside: avoid;"><span style="font-weight: 600;">GitHub:</span> ${(0, helpers_1.escapeHtml)(personalInfo.github)}</div>` : ''}
                                ${personalInfo.dribbble ? `<div data-paginate="item" style="page-break-inside: avoid;"><span style="font-weight: 600;">Dribbble:</span> ${(0, helpers_1.escapeHtml)(personalInfo.dribbble)}</div>` : ''}
                                ${personalInfo.behance ? `<div data-paginate="item" style="page-break-inside: avoid;"><span style="font-weight: 600;">Behance:</span> ${(0, helpers_1.escapeHtml)(personalInfo.behance)}</div>` : ''}
                                ${personalInfo.instagram ? `<div data-paginate="item" style="page-break-inside: avoid;"><span style="font-weight: 600;">Instagram:</span> ${(0, helpers_1.escapeHtml)(personalInfo.instagram)}</div>` : ''}
                            </div>
                        </section>
                    ` : ''}

                    <!-- References -->
                    ${references && references.length > 0 ? `
                        <section style="margin-bottom: 32px;">
                            ${SectionHeader(t.sections.references, 'clipboardList')}
                            <div style="display: flex; flex-direction: column; gap: 12px;">
                                ${references.map(ref => `
                                    <div data-paginate="item" style="page-break-inside: avoid;">
                                        <div style="font-weight: 700; font-size: ${sizes.body}; color: #111827;">${(0, helpers_1.escapeHtml)(ref.name)}</div>
                                        <div style="font-size: ${sizes.small}; color: #6b7280;">${(0, helpers_1.escapeHtml)(ref.title)}, ${(0, helpers_1.escapeHtml)(ref.company)}</div>
                                        ${ref.email ? `<div style="font-size: ${sizes.small}; color: #374151;">${(0, helpers_1.escapeHtml)(ref.email)}</div>` : ''}
                                        ${ref.phone ? `<div style="font-size: ${sizes.small}; color: #374151;">${(0, helpers_1.escapeHtml)(ref.phone)}</div>` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Custom Fields -->
                    ${customFields.map(field => `
                        <section style="margin-bottom: 32px;">
                            ${SectionHeader((0, helpers_1.escapeHtml)(field.label), 'pin')}
                            <p data-paginate="item" style="font-size: ${sizes.body}; line-height: 1.6; page-break-inside: avoid;">${(0, helpers_1.formatDescription)(field.content)}</p>
                        </section>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
};
exports.renderHeaderDecorative = renderHeaderDecorative;
//# sourceMappingURL=header-decorative.js.map
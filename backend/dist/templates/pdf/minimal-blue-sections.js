"use strict";
/**
 * Minimal Blue Sections Template
 * Ported from frontend/components/templates/layouts/minimal/MinimalBlueSections.tsx
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderMinimalBlueSections = void 0;
const helpers_1 = require("./shared/helpers");
const translations_1 = require("./shared/translations");
const dateUtils_1 = require("./shared/dateUtils");
const renderMinimalBlueSections = (data, theme, translations, locale = 'en') => {
    const t = (0, translations_1.getTranslations)(translations);
    const { personalInfo, experience = [], education = [], skills = [], languages = [], strengths = [], interests = [], certifications = [], awards = [], fonts, background } = data;
    const headingFont = (0, helpers_1.getFontFamily)(fonts?.heading || 'Roboto');
    const bodyFont = (0, helpers_1.getFontFamily)(fonts?.body || 'Open Sans');
    const sizeConfig = helpers_1.fontSizes[fonts?.size || 'medium'];
    // Theme
    const mainText = '#1f2937';
    // Use customThemeColor if available, otherwise default to Blue 500 (#3b82f6)
    const accentColor = data.customThemeColor || '#3b82f6';
    // Progress bar helper
    const ProgressBar = (label, value) => `
        <div style="margin-bottom: 10px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                <span style="font-size: 12px; font-weight: 500; color: #374151;">${(0, helpers_1.escapeHtml)(label)}</span>
            </div>
            <div style="width: 100%; height: 6px; background-color: #e5e7eb; border-radius: 3px;">
                <div style="width: ${value}%; height: 100%; background-color: ${accentColor}; border-radius: 3px;"></div>
            </div>
        </div>
    `;
    // Helper for Section Headers
    const SectionHeader = (title) => `
        <h3 style="font-family: ${headingFont}; font-size: 16px; font-weight: 700; color: #fff; text-transform: uppercase; background-color: ${accentColor}; padding: 4px 12px; margin-bottom: 16px; letter-spacing: 0.05em; border-radius: 2px;">
            ${title}
        </h3>
    `;
    // Helper for Contact Items
    const contactItems = [
        personalInfo.email,
        personalInfo.phone,
        personalInfo.location
    ].filter(Boolean);
    return `
        <div style="width: 100%; min-height: 100%; font-family: ${bodyFont}; font-size: ${sizeConfig.base}; background-color: #FFFFFF; color: ${mainText}; padding: 56px; box-sizing: border-box; display: flex; flex-direction: column;">
            
            <!-- Header -->
            <header style="margin-bottom: 56px; border-bottom: 2px solid ${accentColor}; padding-bottom: 24px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-end;">
                    <div>
                        <h1 style="font-family: ${headingFont}; font-size: 38px; font-weight: 700; color: #000; text-transform: uppercase; margin: 0 0 4px 0;">
                            ${(0, helpers_1.escapeHtml)(personalInfo.fullName || 'Your Name')}
                        </h1>
                        <p style="font-size: 16px; color: ${accentColor}; font-weight: 600; margin: 0;">
                            ${(0, helpers_1.escapeHtml)(personalInfo.jobTitle || 'Job Title')}
                        </p>
                    </div>
                    <!-- Contact - Compact Right -->
                    <div style="font-size: 12px; text-align: right; color: #4b5563; display: flex; flex-direction: column; gap: 2px;">
                        ${contactItems.map(item => `<span>${(0, helpers_1.escapeHtml)(item)}</span>`).join('')}
                    </div>
                </div>
            </header>

            <!-- Profile -->
            ${personalInfo.summary ? `
                <section style="margin-bottom: 40px;">
                    ${SectionHeader(t.sections.profile)}
                    <p style="line-height: 1.6; font-size: 14px; color: #374151; padding-left: 8px;">
                        ${(0, helpers_1.formatDescription)(personalInfo.summary)}
                    </p>
                </section>
            ` : ''}

            <!-- Experience -->
            ${experience.length > 0 ? `
                <section style="margin-bottom: 40px;">
                    ${SectionHeader(t.sections.experience)}
                    <div style="display: flex; flex-direction: column; gap: 32px; padding-left: 8px;">
                        ${experience.map(exp => `
                            <div>
                                <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
                                    <h4 style="font-weight: 700; font-size: 14px; color: #000; margin: 0;">${(0, helpers_1.escapeHtml)(exp.title)}</h4>
                                    <span style="font-size: 12px; color: #4b5563;">${(0, dateUtils_1.formatLocalizedDate)(exp.startDate, locale)} – ${exp.current ? t.labels.present : (0, dateUtils_1.formatLocalizedDate)(exp.endDate, locale)}</span>
                                </div>
                                <div style="font-size: 12px; color: ${accentColor}; font-weight: 600; margin-bottom: 4px;">
                                    ${(0, helpers_1.escapeHtml)(exp.company)}${exp.city ? `, ${(0, helpers_1.escapeHtml)(exp.city)}` : ''}
                                </div>
                                <div style="font-size: 14px; line-height: 1.6; color: #374151;">
                                    ${(0, helpers_1.formatDescription)(exp.description || '')}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </section>
            ` : ''}

            <!-- Two Column for Ed/Skills -->
            <div style="display: flex; gap: 32px;">
                <!-- Education -->
                ${education.length > 0 ? `
                    <div style="flex: 1;">
                        ${SectionHeader(t.sections.education)}
                        <div style="display: flex; flex-direction: column; gap: 16px; padding-left: 8px;">
                            ${education.map(edu => `
                                <div>
                                    <h4 style="font-weight: 700; font-size: 14px; color: #000; margin: 0;">${(0, helpers_1.escapeHtml)(edu.degree)}</h4>
                                    <div style="font-size: 14px; color: #4b5563;">${(0, helpers_1.escapeHtml)(edu.school)}, ${(0, helpers_1.escapeHtml)(edu.city)}</div>
                                    <div style="font-size: 12px; color: #6b7280;">${(0, dateUtils_1.formatLocalizedDate)(edu.startDate, locale)} – ${edu.endDate ? (0, dateUtils_1.formatLocalizedDate)(edu.endDate, locale) : t.labels.present}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : '<div style="flex: 1;"></div>'}

                <!-- Skills -->
                ${skills.length > 0 ? `
                    <div style="flex: 1;">
                        ${SectionHeader(t.sections.skills)}
                        <div style="padding-left: 8px;">
                            ${skills.map(skill => ProgressBar(skill.name, (skill.level || 3) * 20)).join('')}
                        </div>
                    </div>
                ` : '<div style="flex: 1;"></div>'}
            </div>

            <!-- Languages and Strengths Row -->
            ${(languages && languages.length > 0) || (strengths && strengths.length > 0) ? `
                <div style="display: flex; gap: 32px; margin-top: 40px;">
                    ${languages && languages.length > 0 ? `
                        <div style="flex: 1;">
                            ${SectionHeader(t.sections.languages)}
                            <div style="display: flex; flex-direction: column; gap: 8px; padding-left: 8px;">
                                ${languages.map(lang => `
                                    <div style="font-size: 14px; color: #374151;">
                                        <span style="font-weight: 600;">${(0, helpers_1.escapeHtml)(lang.name)}</span> 
                                        <span style="color: #6b7280; font-size: 12px;">(${(0, helpers_1.escapeHtml)(lang.proficiency)})</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : '<div style="flex: 1;"></div>'}

                    ${strengths && strengths.length > 0 ? `
                        <div style="flex: 1;">
                            ${SectionHeader(t.sections.strengths)}
                            <div style="padding-left: 8px;">
                                ${strengths.map(str => ProgressBar(str.name, str.level ?? 80)).join('')}
                            </div>
                        </div>
                    ` : '<div style="flex: 1;"></div>'}
                </div>
            ` : ''}

            <!-- Interests -->
            ${interests && interests.length > 0 ? `
                <section style="margin-top: 40px;">
                    ${SectionHeader(t.sections.interests)}
                    <p style="line-height: 1.6; font-size: 14px; color: #374151; padding-left: 8px;">
                        ${interests.map(i => (0, helpers_1.escapeHtml)(i.name)).join(' • ')}
                    </p>
                </section>
            ` : ''}

            <!-- Credentials -->
            ${(certifications && certifications.length > 0) || (awards && awards.length > 0) ? `
                <section style="margin-top: 40px;">
                    ${SectionHeader(t.sections.credentials)}
                    <div style="padding-left: 8px;">
                        ${certifications && certifications.length > 0 ? `
                            <div style="margin-bottom: ${awards && awards.length > 0 ? '16px' : '0'};">
                                <h4 style="font-size: 14px; font-weight: 600; color: #6b7280; margin-bottom: 8px;">Certifications</h4>
                                <div style="display: flex; flex-direction: column; gap: 8px;">
                                    ${certifications.map(cert => `
                                        <div>
                                            <div style="font-weight: 600; font-size: 14px; color: #000;">${(0, helpers_1.escapeHtml)(cert.name)}</div>
                                            <div style="font-size: 12px; color: #6b7280;">${(0, helpers_1.escapeHtml)(cert.issuer)} • ${(0, dateUtils_1.formatLocalizedDate)(cert.date, locale)}</div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}
                        ${awards && awards.length > 0 ? `
                            <div>
                                <h4 style="font-size: 14px; font-weight: 600; color: #6b7280; margin-bottom: 8px;">Awards & Achievements</h4>
                                <div style="display: flex; flex-direction: column; gap: 8px;">
                                    ${awards.map(award => `
                                        <div>
                                            <div style="font-weight: 600; font-size: 14px; color: #000;">${(0, helpers_1.escapeHtml)(award.title)}</div>
                                            <div style="font-size: 12px; color: #6b7280;">${(0, helpers_1.escapeHtml)(award.issuer)} • ${(0, dateUtils_1.formatLocalizedDate)(award.date, locale)}</div>
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
                <section style="margin-top: 40px;">
                    ${SectionHeader(t.sections.references)}
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; padding-left: 8px;">
                        ${data.references.map(ref => `
                            <div>
                                <div style="font-weight: 600; font-size: 14px; color: #000;">${(0, helpers_1.escapeHtml)(ref.name)}</div>
                                <div style="font-size: 13px; color: #6b7280;">${(0, helpers_1.escapeHtml)(ref.title)}, ${(0, helpers_1.escapeHtml)(ref.company)}</div>
                                ${ref.email ? `<div style="font-size: 12px; color: ${accentColor};">${(0, helpers_1.escapeHtml)(ref.email)}</div>` : ''}
                                ${ref.phone ? `<div style="font-size: 12px; color: ${accentColor};">${(0, helpers_1.escapeHtml)(ref.phone)}</div>` : ''}
                            </div>
                        `).join('')}
                    </div>
                </section>
            ` : ''}

            <!-- Additional Info (Personal & Social) -->
            ${(personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber) || personalInfo.customField || personalInfo.github || personalInfo.twitter || personalInfo.linkedin) ? `
                <section style="margin-top: 40px;">
                    ${SectionHeader(t.sections.additionalInfo)}
                    <div style="padding-left: 8px; display: flex; flex-direction: column; gap: 16px;">
                        
                        <!-- Personal Details -->
                        ${(personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber) || personalInfo.customField) ? `
                            <div style="font-size: 14px; color: #374151;">
                                ${personalInfo.nationality ? `<div><span style="font-weight: 600;">Nationality:</span> ${(0, helpers_1.escapeHtml)(personalInfo.nationality)}</div>` : ''}
                                ${personalInfo.idType && personalInfo.idNumber ? `
                                    <div><span style="font-weight: 600;">${personalInfo.idType === 'id' ? 'ID' : personalInfo.idType === 'passport' ? 'Passport' : 'License'}:</span> ${(0, helpers_1.escapeHtml)(personalInfo.idNumber)}</div>
                                ` : ''}
                                ${personalInfo.customField ? `
                                    <div style="margin-top: 8px;">
                                        <span style="font-weight: 600; display: block;">${(0, helpers_1.escapeHtml)(personalInfo.customFieldLabel || 'Additional Info')}</span>
                                        ${(0, helpers_1.formatDescription)(personalInfo.customField)}
                                    </div>
                                ` : ''}
                            </div>
                        ` : ''}

                        <!-- Social Links -->
                        ${(personalInfo.github || personalInfo.twitter || personalInfo.linkedin || personalInfo.dribbble || personalInfo.behance || personalInfo.instagram || personalInfo.website) ? `
                            <div style="display: flex; flex-direction: column; gap: 8px; font-size: 13px;">
                                ${personalInfo.linkedin ? `<div><span style="font-weight: 600; color: #1f2937;">LinkedIn:</span> <span style="color: ${accentColor};">${(0, helpers_1.escapeHtml)(personalInfo.linkedin)}</span></div>` : ''}
                                ${personalInfo.github ? `<div><span style="font-weight: 600; color: #1f2937;">GitHub:</span> <span style="color: ${accentColor};">${(0, helpers_1.escapeHtml)(personalInfo.github)}</span></div>` : ''}
                                ${personalInfo.twitter ? `<div><span style="font-weight: 600; color: #1f2937;">Twitter:</span> <span style="color: ${accentColor};">${(0, helpers_1.escapeHtml)(personalInfo.twitter)}</span></div>` : ''}
                                ${personalInfo.dribbble ? `<div><span style="font-weight: 600; color: #1f2937;">Dribbble:</span> <span style="color: ${accentColor};">${(0, helpers_1.escapeHtml)(personalInfo.dribbble)}</span></div>` : ''}
                                ${personalInfo.behance ? `<div><span style="font-weight: 600; color: #1f2937;">Behance:</span> <span style="color: ${accentColor};">${(0, helpers_1.escapeHtml)(personalInfo.behance)}</span></div>` : ''}
                                ${personalInfo.instagram ? `<div><span style="font-weight: 600; color: #1f2937;">Instagram:</span> <span style="color: ${accentColor};">${(0, helpers_1.escapeHtml)(personalInfo.instagram)}</span></div>` : ''}
                                ${personalInfo.website ? `<div><span style="font-weight: 600; color: #1f2937;">Website:</span> <span style="color: ${accentColor};">${(0, helpers_1.escapeHtml)(personalInfo.website)}</span></div>` : ''}
                            </div>
                        ` : ''}
                    </div>
                </section>
            ` : ''}

        </div>
    `;
};
exports.renderMinimalBlueSections = renderMinimalBlueSections;
//# sourceMappingURL=minimal-blue-sections.js.map
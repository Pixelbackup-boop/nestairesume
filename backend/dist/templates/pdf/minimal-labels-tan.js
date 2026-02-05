"use strict";
/**
 * Minimal Labels Tan Template
 * Ported from frontend/components/templates/layouts/minimal/MinimalLabelsTan.tsx
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderMinimalLabelsTan = void 0;
const helpers_1 = require("./shared/helpers");
const translations_1 = require("./shared/translations");
const dateUtils_1 = require("./shared/dateUtils");
const renderMinimalLabelsTan = (data, theme, translations, locale = 'en') => {
    const t = (0, translations_1.getTranslations)(translations);
    const { personalInfo, experience = [], education = [], skills = [], languages = [], strengths = [], interests = [], certifications = [], awards = [], fonts } = data;
    const headingFont = (0, helpers_1.getFontFamily)(fonts?.heading || 'Lato');
    const bodyFont = (0, helpers_1.getFontFamily)(fonts?.body || 'Lato');
    const sizeConfig = helpers_1.fontSizes[fonts?.size || 'medium'];
    // Custom Colors for this template
    // Note: Using white background - the "tan" accent comes from the label text color
    const mainBg = '#ffffff'; // White body background (fixed)
    const mainText = '#44403c'; // Stone 700
    const labelText = '#a8a29e'; // Stone 400 (tan accent)
    // Progress bar helper
    const ProgressBar = (label, value) => `
        <div style="margin-bottom: 10px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                <span style="font-size: 12px; font-weight: 500; color: ${mainText};">${(0, helpers_1.escapeHtml)(label)}</span>
            </div>
            <div style="width: 100%; height: 6px; background-color: #e5e7eb; border-radius: 3px;">
                <div style="width: ${value}%; height: 100%; background-color: ${data.customThemeColor || labelText}; border-radius: 3px;"></div>
            </div>
        </div>
    `;
    // Helper for Row Layout
    const Row = (label, content) => `
        <div style="display: flex; margin-bottom: 0;">
            <div style="width: 30%; padding-right: 24px; flex-shrink: 0;">
                <h3 style="font-size: 18px; font-weight: 600; color: #000; margin: 0;">${label}</h3>
            </div>
            <div style="flex: 1;">
                ${content}
            </div>
        </div>
    `;
    return `
        <div style="width: 100%; min-height: 100%; font-family: ${bodyFont}; font-size: ${sizeConfig.base}; background-color: ${mainBg}; color: ${mainText}; padding: 64px; box-sizing: border-box; display: flex; flex-direction: column;">
            
            <!-- Header -->
            <header style="margin-left: 30%; margin-bottom: 64px;">
                <h1 style="font-family: ${headingFont}; font-size: 38px; font-weight: 400; color: #000; margin: 0 0 4px 0;">
                    ${(0, helpers_1.escapeHtml)(personalInfo.fullName || 'Your Name')}
                </h1>
                <p style="font-size: 16px; color: #000; font-weight: 400; margin-bottom: 16px;">
                    ${(0, helpers_1.escapeHtml)(personalInfo.jobTitle || 'Job Title')}
                </p>

                <!-- Contact -->
                <div style="font-size: 12px; display: flex; gap: 16px; color: #000; flex-wrap: wrap;">
                    ${[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.website]
        .filter(Boolean)
        .map(item => `<span>${(0, helpers_1.escapeHtml)(item)}</span>`)
        .join('')}
                </div>
            </header>

            <!-- Sections Wrapper -->
            <div style="display: flex; flex-direction: column; gap: 48px;">
                
                <!-- Profile -->
                ${personalInfo.summary ? Row(t.sections.profile, `
                    <p style="margin: 0; line-height: 1.6; font-size: 14px;">
                        ${(0, helpers_1.formatDescription)(personalInfo.summary)}
                    </p>
                `) : ''}

                <!-- Experience -->
                ${experience.length > 0 ? `
                    <div style="display: flex;">
                        <div style="width: 30%; padding-right: 24px; flex-shrink: 0;">
                            <h3 style="font-size: 18px; font-weight: 600; color: #000; margin: 0;">${t.sections.experience}</h3>
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 24px;">
                            ${experience.map(exp => `
                                <div>
                                    <h4 style="font-weight: 600; font-size: 14px; color: #000; margin: 0;">${(0, helpers_1.escapeHtml)(exp.title)}</h4>
                                    <div style="font-size: 14px; color: ${labelText}; margin-bottom: 8px;">
                                        ${(0, helpers_1.escapeHtml)(exp.company)}, ${(0, dateUtils_1.formatLocalizedDate)(exp.startDate, locale)}–${exp.current ? t.labels.present : (0, dateUtils_1.formatLocalizedDate)(exp.endDate, locale)}
                                    </div>
                                    <p style="margin: 0; line-height: 1.6; font-size: 14px;">
                                        ${(0, helpers_1.formatDescription)(exp.description || '')}
                                    </p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Education -->
                ${education.length > 0 ? `
                    <div style="display: flex;">
                        <div style="width: 30%; padding-right: 24px; flex-shrink: 0;">
                            <h3 style="font-size: 18px; font-weight: 600; color: #000; margin: 0;">${t.sections.education}</h3>
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 16px;">
                            ${education.map(edu => `
                                <div>
                                    <h4 style="font-weight: 600; font-size: 14px; color: #000; margin: 0;">${(0, helpers_1.escapeHtml)(edu.degree)}</h4>
                                    <div style="font-size: 14px; color: ${labelText};">
                                        ${(0, helpers_1.escapeHtml)(edu.school)} | ${(0, dateUtils_1.formatLocalizedDate)(edu.startDate, locale)}–${edu.endDate ? (0, dateUtils_1.formatLocalizedDate)(edu.endDate, locale) : t.labels.present}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Skills -->
                ${skills.length > 0 ? `
                    <div style="display: flex;">
                        <div style="width: 30%; padding-right: 24px; flex-shrink: 0;">
                            <h3 style="font-size: 18px; font-weight: 600; color: #000; margin: 0;">${t.sections.skills}</h3>
                        </div>
                        <div style="flex: 1;">
                            ${skills.map(skill => ProgressBar(skill.name, (skill.level || 3) * 20)).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Languages -->
                ${languages && languages.length > 0 ? Row(t.sections.languages, `
                    <p style="margin: 0; line-height: 1.8; font-size: 14px;">
                        ${languages.map(l => `${(0, helpers_1.escapeHtml)(l.name)} (${(0, helpers_1.escapeHtml)(l.proficiency)})`).join(', ')}
                    </p>
                `) : ''}

                <!-- Strengths -->
                ${strengths && strengths.length > 0 ? Row(t.sections.strengths, `
                    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                        ${strengths.map(str => `
                            <span style="font-size: 12px; color: ${mainText}; background-color: #f5f5f4; padding: 4px 8px; border-radius: 4px;">
                                ${(0, helpers_1.escapeHtml)(str.name)}
                            </span>
                        `).join('')}
                    </div>
                `) : ''}

                <!-- Interests -->
                ${interests && interests.length > 0 ? Row(t.sections.interests, `
                    <p style="margin: 0; line-height: 1.8; font-size: 14px;">
                        ${interests.map(i => (0, helpers_1.escapeHtml)(i.name)).join(', ')}
                    </p>
                `) : ''}

                <!-- Credentials -->
                ${(certifications && certifications.length > 0) || (awards && awards.length > 0) ? `
                    <div style="display: flex;">
                        <div style="width: 30%; padding-right: 24px; flex-shrink: 0;">
                            <h3 style="font-size: 18px; font-weight: 600; color: #000; margin: 0;">${t.sections.credentials}</h3>
                        </div>
                        <div style="flex: 1;">
                            ${certifications && certifications.length > 0 ? `
                                <div style="margin-bottom: ${awards && awards.length > 0 ? '16px' : '0'};">
                                    <h4 style="font-size: 12px; font-weight: 600; color: ${labelText}; margin-bottom: 8px;">Certifications</h4>
                                    <div style="display: flex; flex-direction: column; gap: 8px;">
                                        ${certifications.map(cert => `
                                            <div>
                                                <div style="font-weight: 600; font-size: 14px; color: ${mainText};">${(0, helpers_1.escapeHtml)(cert.name)}</div>
                                                <div style="font-size: 12px; color: ${labelText};">${(0, helpers_1.escapeHtml)(cert.issuer)} • ${(0, dateUtils_1.formatLocalizedDate)(cert.date, locale)}</div>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}
                            ${awards && awards.length > 0 ? `
                                <div>
                                    <h4 style="font-size: 12px; font-weight: 600; color: ${labelText}; margin-bottom: 8px;">Awards & Achievements</h4>
                                    <div style="display: flex; flex-direction: column; gap: 8px;">
                                        ${awards.map(award => `
                                            <div>
                                                <div style="font-weight: 600; font-size: 14px; color: ${mainText};">${(0, helpers_1.escapeHtml)(award.title)}</div>
                                                <div style="font-size: 12px; color: ${labelText};">${(0, helpers_1.escapeHtml)(award.issuer)} • ${(0, dateUtils_1.formatLocalizedDate)(award.date, locale)}</div>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                ` : ''}

                <!-- References -->
                ${data.references && data.references.length > 0 ? Row(t.sections.references, `
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                        ${data.references.map(ref => `
                            <div>
                                <div style="font-weight: 600; font-size: 14px; color: ${mainText};">${(0, helpers_1.escapeHtml)(ref.name)}</div>
                                <div style="font-size: 12px; color: ${labelText};">${(0, helpers_1.escapeHtml)(ref.title)}, ${(0, helpers_1.escapeHtml)(ref.company)}</div>
                                ${ref.email ? `<div style="font-size: 12px; color: ${labelText};">${(0, helpers_1.escapeHtml)(ref.email)}</div>` : ''}
                            </div>
                        `).join('')}
                    </div>
                `) : ''}

                <!-- Personal Info -->
                ${(personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber) || personalInfo.customField) ? Row(t.sections.additionalInfo, `
                    <div style="display: flex; flex-direction: column; gap: 4px; font-size: 14px;">
                        ${personalInfo.nationality ? `<div><span style="color: ${labelText};">Nationality:</span> ${(0, helpers_1.escapeHtml)(personalInfo.nationality)}</div>` : ''}
                        ${personalInfo.idType && personalInfo.idNumber ? `
                            <div><span style="color: ${labelText};">${personalInfo.idType === 'id' ? 'ID' : personalInfo.idType === 'passport' ? 'Passport' : 'License'}:</span> ${(0, helpers_1.escapeHtml)(personalInfo.idNumber)}</div>
                        ` : ''}
                        ${personalInfo.customField ? `
                            <div style="margin-top: 4px;">
                                <span style="color: ${labelText}; display: block;">${(0, helpers_1.escapeHtml)(personalInfo.customFieldLabel || 'Info')}</span>
                                ${(0, helpers_1.formatDescription)(personalInfo.customField)}
                            </div>
                        ` : ''}
                    </div>
                `) : ''}

                <!-- Social Links (Extended) -->
                ${(personalInfo.website || personalInfo.github || personalInfo.linkedin || personalInfo.twitter || personalInfo.dribbble || personalInfo.behance || personalInfo.instagram) ? Row(t.sections.socialLinks, `
                    <div style="display: flex; flex-wrap: wrap; gap: 16px; font-size: 14px;">
                        ${personalInfo.website ? `<a href="${personalInfo.website}" style="color: ${labelText}; text-decoration: none;">Website</a>` : ''}
                        ${personalInfo.linkedin ? `<a href="${personalInfo.linkedin}" style="color: ${labelText}; text-decoration: none;">LinkedIn</a>` : ''}
                        ${personalInfo.github ? `<a href="${personalInfo.github}" style="color: ${labelText}; text-decoration: none;">GitHub</a>` : ''}
                        ${personalInfo.twitter ? `<a href="${personalInfo.twitter}" style="color: ${labelText}; text-decoration: none;">Twitter</a>` : ''}
                        ${personalInfo.dribbble ? `<a href="${personalInfo.dribbble}" style="color: ${labelText}; text-decoration: none;">Dribbble</a>` : ''}
                        ${personalInfo.behance ? `<a href="${personalInfo.behance}" style="color: ${labelText}; text-decoration: none;">Behance</a>` : ''}
                        ${personalInfo.instagram ? `<a href="${personalInfo.instagram}" style="color: ${labelText}; text-decoration: none;">Instagram</a>` : ''}
                    </div>
                `) : ''}

            </div>
        </div>
    `;
};
exports.renderMinimalLabelsTan = renderMinimalLabelsTan;
//# sourceMappingURL=minimal-labels-tan.js.map
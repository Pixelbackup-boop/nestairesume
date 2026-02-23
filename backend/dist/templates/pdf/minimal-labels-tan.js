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
    const { personalInfo, experience = [], education = [], skills = [], languages = [], strengths = [], interests = [], certifications = [], awards = [], customFields = [], fonts } = data;
    const headingFont = (0, helpers_1.getFontFamily)(fonts?.heading || 'Lato');
    const bodyFont = (0, helpers_1.getFontFamily)(fonts?.body || 'Lato');
    const sizeConfig = helpers_1.fontSizes[fonts?.size || 'medium'];
    // Font Scaling
    const scale = (0, helpers_1.getFontScale)(fonts?.size);
    const s = (px) => `${Math.max(5, Math.round(px * scale))}px`;
    // Custom Colors for this template
    // Note: Using white background - the "tan" accent comes from the label text color
    const mainBg = '#ffffff'; // White body background (fixed)
    const mainText = '#44403c'; // Stone 700
    const labelText = '#a8a29e'; // Stone 400 (tan accent)
    // Progress bar helper
    const ProgressBar = (label, value) => `
        <div data-paginate="item" style="margin-bottom: 10px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                <span style="font-size: ${s(12)}; font-weight: 500; color: ${mainText};">${(0, helpers_1.escapeHtml)(label)}</span>
            </div>
            <div style="width: 100%; height: 6px; background-color: #e5e7eb; border-radius: 3px;">
                <div style="width: ${value}%; height: 100%; background-color: ${data.customThemeColor || labelText}; border-radius: 3px;"></div>
            </div>
        </div>
    `;
    // Helper for Row Layout
    const Row = (label, content) => `
        <div class="resume-section" style="display: flex; margin-bottom: 0;">
            <div style="width: 30%; padding-right: 24px; flex-shrink: 0;">
                <h3 style="font-size: ${s(18)}; font-weight: 600; color: #000; margin: 0;">${label}</h3>
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
                <h1 style="font-family: ${headingFont}; font-size: ${s(38)}; font-weight: 400; color: #000; margin: 0 0 4px 0;">
                    ${(0, helpers_1.escapeHtml)(personalInfo.fullName || 'Your Name')}
                </h1>
                <p style="font-size: ${s(16)}; color: #000; font-weight: 400; margin-bottom: 16px;">
                    ${(0, helpers_1.escapeHtml)(personalInfo.jobTitle || 'Job Title')}
                </p>

                <!-- Contact -->
                <div style="font-size: ${s(12)}; display: flex; gap: 16px; color: #000; flex-wrap: wrap;">
                    ${[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.website, personalInfo.linkedin]
        .filter(Boolean)
        .map(item => `<span>${(0, helpers_1.escapeHtml)(item)}</span>`)
        .join('')}
                </div>
            </header>

            <!-- Sections Wrapper -->
            <div style="display: flex; flex-direction: column; gap: 48px;">
                
                <!-- Profile -->
                ${personalInfo.summary ? Row(t.sections.profile, `
                    <p style="margin: 0; line-height: 1.6; font-size: ${s(14)};">
                        ${(0, helpers_1.formatDescription)(personalInfo.summary)}
                    </p>
                `) : ''}

                <!-- Experience -->
                ${experience.length > 0 ? `
                    <div class="resume-section" style="display: flex;">
                        <div style="width: 30%; padding-right: 24px; flex-shrink: 0;">
                            <h3 style="font-size: ${s(18)}; font-weight: 600; color: #000; margin: 0;">${t.sections.experience}</h3>
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 24px;">
                            ${experience.map(exp => `
                                <div data-paginate="item">
                                    <h4 style="font-weight: 600; font-size: ${s(14)}; color: #000; margin: 0;">${(0, helpers_1.escapeHtml)(exp.title)}</h4>
                                    <div style="font-size: ${s(14)}; color: ${data.customThemeColor || labelText}; margin-bottom: 8px;">
                                        ${(0, helpers_1.escapeHtml)(exp.company)}${(exp.city || exp.country) ? `, ${(0, helpers_1.escapeHtml)([exp.city, exp.country].filter(Boolean).join(', '))}` : ''} | ${(0, dateUtils_1.formatLocalizedDate)(exp.startDate, locale)}–${exp.current ? t.labels.present : (0, dateUtils_1.formatLocalizedDate)(exp.endDate, locale)}
                                    </div>
                                    <p style="margin: 0; line-height: 1.6; font-size: ${s(14)};">
                                        ${(0, helpers_1.formatDescription)(exp.description || '')}
                                    </p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Education -->
                ${education.length > 0 ? `
                    <div class="resume-section" style="display: flex;">
                        <div style="width: 30%; padding-right: 24px; flex-shrink: 0;">
                            <h3 style="font-size: ${s(18)}; font-weight: 600; color: #000; margin: 0;">${t.sections.education}</h3>
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 16px;">
                            ${education.map(edu => `
                                <div data-paginate="item">
                                    <h4 style="font-weight: 600; font-size: ${s(14)}; color: #000; margin: 0;">
                                        ${(0, helpers_1.escapeHtml)(edu.degree)}
                                        ${edu.gpa ? `<span style="margin-left: 8px; opacity: 0.8; font-weight: 400;">GPA: ${(0, helpers_1.escapeHtml)(edu.gpa)}</span>` : ''}
                                    </h4>
                                    <div style="font-size: ${s(14)}; color: ${labelText};">
                                        ${(0, helpers_1.escapeHtml)(edu.school)}${(edu.city || edu.country) ? `, ${(0, helpers_1.escapeHtml)([edu.city, edu.country].filter(Boolean).join(', '))}` : ''} | ${(0, dateUtils_1.formatLocalizedDate)(edu.startDate, locale)}–${edu.endDate ? (0, dateUtils_1.formatLocalizedDate)(edu.endDate, locale) : t.labels.present}
                                    </div>
                                    ${edu.honors ? `<p style="font-size: ${s(11)}; color: #4b5563; opacity: 0.8; margin: 0;">${(0, helpers_1.escapeHtml)(edu.honors)}</p>` : ''}
                                    ${edu.clubs ? `<p style="font-size: ${s(10)}; color: #6b7280; opacity: 0.7; margin: 0;">Activities: ${(0, helpers_1.escapeHtml)(edu.clubs)}</p>` : ''}

                                    ${edu.description ? `<p style="font-size: ${s(12)}; line-height: 1.6; color: #4b5563; margin-top: 4px;">${(0, helpers_1.formatDescription)(edu.description)}</p>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Skills -->
                ${skills.length > 0 ? `
                    <div class="resume-section" style="display: flex;">
                        <div style="width: 30%; padding-right: 24px; flex-shrink: 0;">
                            <h3 style="font-size: ${s(18)}; font-weight: 600; color: #000; margin: 0;">${t.sections.skills}</h3>
                        </div>
                        <div style="flex: 1;">
                            ${skills.map(skill => ProgressBar(skill.name, (skill.level || 3) * 20)).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Languages -->
                ${languages && languages.length > 0 ? Row(t.sections.languages, `
                    <p style="margin: 0; line-height: 1.8; font-size: ${s(14)};">
                        ${languages.map(l => `${(0, helpers_1.escapeHtml)(l.name)} (${(0, helpers_1.escapeHtml)(l.proficiency)})`).join(', ')}
                    </p>
                `) : ''}

                <!-- Strengths -->
                ${strengths && strengths.length > 0 ? Row(t.sections.strengths, `
                    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                        ${strengths.map(str => `
                            <span style="font-size: ${s(12)}; color: ${mainText}; background-color: #f5f5f4; padding: 4px 8px; border-radius: 4px;">
                                ${(0, helpers_1.escapeHtml)(str.name)}
                            </span>
                        `).join('')}
                    </div>
                `) : ''}

                <!-- Interests -->
                ${interests && interests.length > 0 ? Row(t.sections.interests, `
                    <p style="margin: 0; line-height: 1.8; font-size: ${s(14)};">
                        ${interests.map(i => (0, helpers_1.escapeHtml)(i.name)).join(', ')}
                    </p>
                `) : ''}

                <!-- Credentials -->
                ${(certifications && certifications.length > 0) || (awards && awards.length > 0) ? `
                    <div class="resume-section" style="display: flex;">
                        <div style="width: 30%; padding-right: 24px; flex-shrink: 0;">
                            <h3 style="font-size: ${s(18)}; font-weight: 600; color: #000; margin: 0;">${t.sections.credentials}</h3>
                        </div>
                        <div style="flex: 1;">
                            ${certifications && certifications.length > 0 ? `
                                <div style="margin-bottom: ${awards && awards.length > 0 ? '16px' : '0'};">
                                    <h4 style="font-size: ${s(12)}; font-weight: 600; color: ${labelText}; margin-bottom: 8px;">${t.sections.certifications}</h4>
                                    <div style="display: flex; flex-direction: column; gap: 8px;">
                                        ${certifications.map(cert => `
                                            <div data-paginate="item">
                                                <div style="font-weight: 600; font-size: ${s(14)}; color: ${mainText};">${(0, helpers_1.escapeHtml)(cert.name)}</div>
                                                <div style="font-size: ${s(12)}; color: ${labelText};">${(0, helpers_1.escapeHtml)(cert.issuer)} • ${(0, dateUtils_1.formatLocalizedDate)(cert.date, locale)}</div>
                                                ${cert.url ? `<div style="font-size: ${s(10)}; color: #6b7280; opacity: 0.7;">${(0, helpers_1.escapeHtml)(cert.url)}</div>` : ''}
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}
                            ${awards && awards.length > 0 ? `
                                <div>
                                    <h4 style="font-size: ${s(12)}; font-weight: 600; color: ${labelText}; margin-bottom: 8px;">${t.sections.awards}</h4>
                                    <div style="display: flex; flex-direction: column; gap: 8px;">
                                        ${awards.map(award => `
                                            <div data-paginate="item">
                                                <div style="font-weight: 600; font-size: ${s(14)}; color: ${mainText};">${(0, helpers_1.escapeHtml)(award.title)}</div>
                                                <div style="font-size: ${s(12)}; color: ${labelText};">${(0, helpers_1.escapeHtml)(award.issuer)} • ${(0, dateUtils_1.formatLocalizedDate)(award.date, locale)}</div>
                                            
                                                ${award.description ? `<p style="font-size: ${s(11)}; line-height: 1.5; color: #4b5563; margin-top: 2px;">${(0, helpers_1.formatDescription)(award.description)}</p>` : ''}
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                ` : ''}

                <!-- Social Links -->
                ${(personalInfo.github || personalInfo.x || personalInfo.dribbble || personalInfo.behance || personalInfo.instagram) ? Row(t.sections.socialLinks, `
                    <div style="display: flex; flex-direction: column; gap: 6px; font-size: ${s(14)};">
                        ${personalInfo.x ? `<div><span style="font-weight: 600;">X:</span> ${(0, helpers_1.escapeHtml)(personalInfo.x)}</div>` : ''}
                        ${personalInfo.github ? `<div><span style="font-weight: 600;">GitHub:</span> ${(0, helpers_1.escapeHtml)(personalInfo.github)}</div>` : ''}
                        ${personalInfo.dribbble ? `<div><span style="font-weight: 600;">Dribbble:</span> ${(0, helpers_1.escapeHtml)(personalInfo.dribbble)}</div>` : ''}
                        ${personalInfo.behance ? `<div><span style="font-weight: 600;">Behance:</span> ${(0, helpers_1.escapeHtml)(personalInfo.behance)}</div>` : ''}
                        ${personalInfo.instagram ? `<div><span style="font-weight: 600;">Instagram:</span> ${(0, helpers_1.escapeHtml)(personalInfo.instagram)}</div>` : ''}
                    </div>
                `) : ''}

                <!-- Personal Details -->
                ${(personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber)) ? Row(t.sections.personalDetails, `
                    <div style="display: flex; flex-direction: column; gap: 4px; font-size: ${s(14)};">
                        ${personalInfo.nationality ? `<div><span style="color: ${labelText};">Nationality:</span> ${(0, helpers_1.escapeHtml)(personalInfo.nationality)}</div>` : ''}
                        ${personalInfo.idType && personalInfo.idNumber ? `
                            <div><span style="color: ${labelText};">${personalInfo.idType === 'id' ? 'ID' : personalInfo.idType === 'passport' ? 'Passport' : 'Driving License'}:</span> ${(0, helpers_1.escapeHtml)(personalInfo.idNumber)}</div>
                        ` : ''}
                    </div>
                `) : ''}

                <!-- Custom Fields -->
                ${customFields.map(field => Row(field.label, `
                    <p style="margin: 0; line-height: 1.6; font-size: ${s(14)};">
                        ${(0, helpers_1.formatDescription)(field.content)}
                    </p>
                `)).join('')}

            </div>
        </div>
    `;
};
exports.renderMinimalLabelsTan = renderMinimalLabelsTan;
//# sourceMappingURL=minimal-labels-tan.js.map
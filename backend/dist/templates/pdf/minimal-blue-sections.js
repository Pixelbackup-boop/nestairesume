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
    const { personalInfo, experience = [], education = [], skills = [], languages = [], strengths = [], interests = [], certifications = [], awards = [], customFields = [], fonts, background } = data;
    const headingFont = (0, helpers_1.getFontFamily)(fonts?.heading || 'Roboto');
    const bodyFont = (0, helpers_1.getFontFamily)(fonts?.body || 'Open Sans');
    const sizeConfig = helpers_1.fontSizes[fonts?.size || 'medium'];
    // Font Scaling
    const scale = (0, helpers_1.getFontScale)(fonts?.size);
    const s = (px) => `${Math.max(5, Math.round(px * scale))}px`;
    // Theme
    const mainText = '#1f2937';
    // Use customThemeColor if available, otherwise default to Blue 500 (#3b82f6)
    const accentColor = data.customThemeColor || '#3b82f6';
    // Progress bar helper
    const ProgressBar = (label, value) => `
        <div data-paginate="item" style="margin-bottom: 10px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                <span style="font-size: ${s(12)}; font-weight: 500; color: #374151;">${(0, helpers_1.escapeHtml)(label)}</span>
            </div>
            <div style="width: 100%; height: 6px; background-color: #e5e7eb; border-radius: 3px;">
                <div style="width: ${value}%; height: 100%; background-color: ${accentColor}; border-radius: 3px;"></div>
            </div>
        </div>
    `;
    // Helper for Section Headers
    const SectionHeader = (title) => `
        <h3 style="font-family: ${headingFont}; font-size: ${s(16)}; font-weight: 700; color: #fff; text-transform: uppercase; background-color: ${accentColor}; padding: 4px 12px; margin-bottom: 16px; letter-spacing: 0.05em; border-radius: 2px;">
            ${title}
        </h3>
    `;
    // Helper for Contact Items
    const contactItems = [
        personalInfo.email,
        personalInfo.phone,
        personalInfo.location,
        personalInfo.website,
        personalInfo.linkedin,
    ].filter(Boolean);
    return `
        <div style="width: 100%; min-height: 100%; font-family: ${bodyFont}; font-size: ${sizeConfig.base}; background-color: #FFFFFF; color: ${mainText}; padding: 56px; box-sizing: border-box; display: flex; flex-direction: column;">
            
            <!-- Header -->
            <header style="margin-bottom: 56px; border-bottom: 2px solid ${accentColor}; padding-bottom: 24px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <div>
                        <h1 style="font-family: ${headingFont}; font-size: ${s(38)}; font-weight: 700; color: #000; text-transform: uppercase; margin: 0 0 4px 0;">
                            ${(0, helpers_1.escapeHtml)(personalInfo.fullName || 'Your Name')}
                        </h1>
                        <p style="font-size: ${s(16)}; color: ${accentColor}; font-weight: 600; margin: 0;">
                            ${(0, helpers_1.escapeHtml)(personalInfo.jobTitle || 'Job Title')}
                        </p>
                    </div>
                    <!-- Contact - Compact Right -->
                    <div style="font-size: ${s(12)}; text-align: right; color: #4b5563; display: flex; flex-direction: column; gap: 2px;">
                        ${contactItems.map(item => `<span>${(0, helpers_1.escapeHtml)(item)}</span>`).join('')}
                    </div>
                </div>
            </header>

            <!-- Profile -->
            ${personalInfo.summary ? `
                <section class="resume-section" style="margin-bottom: 40px;">
                    ${SectionHeader(t.sections.profile)}
                    <p style="line-height: 1.6; font-size: ${s(14)}; color: #374151; padding-left: 8px;">
                        ${(0, helpers_1.formatDescription)(personalInfo.summary)}
                    </p>
                </section>
            ` : ''}

            <!-- Experience -->
            ${experience.length > 0 ? `
                <section class="resume-section" style="margin-bottom: 40px;">
                    ${SectionHeader(t.sections.experience)}
                    <div style="display: flex; flex-direction: column; gap: 32px; padding-left: 8px;">
                        ${experience.map(exp => `
                            <div data-paginate="item">
                                <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
                                    <h4 style="font-weight: 700; font-size: ${s(14)}; color: #000; margin: 0;">${(0, helpers_1.escapeHtml)(exp.title)}</h4>
                                    <span style="font-size: ${s(12)}; color: #4b5563;">${(0, dateUtils_1.formatLocalizedDate)(exp.startDate, locale)} – ${exp.current ? t.labels.present : (0, dateUtils_1.formatLocalizedDate)(exp.endDate, locale)}</span>
                                </div>
                                <div style="font-size: ${s(12)}; color: ${accentColor}; font-weight: 600; margin-bottom: 4px;">
                                    ${(0, helpers_1.escapeHtml)(exp.company)}${(exp.city || exp.country) ? `, ${(0, helpers_1.escapeHtml)([exp.city, exp.country].filter(Boolean).join(', '))}` : ''}
                                </div>
                                <div style="font-size: ${s(14)}; line-height: 1.6; color: #374151;">
                                    ${(0, helpers_1.formatDescription)(exp.description || '')}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </section>
            ` : ''}

            <!-- Two Column for Ed/Skills -->
            <section class="resume-section" style="margin-bottom: 40px;">
            <div style="display: flex; gap: 32px;">
                <!-- Education -->
                ${education.length > 0 ? `
                    <div style="flex: 1;">
                        ${SectionHeader(t.sections.education)}
                        <div style="display: flex; flex-direction: column; gap: 16px; padding-left: 8px;">
                            ${education.map(edu => `
                                <div data-paginate="item">
                                    <h4 style="font-weight: 700; font-size: ${s(14)}; color: #000; margin: 0;">
                                        ${(0, helpers_1.escapeHtml)(edu.degree)}
                                        ${edu.gpa ? `<span style="margin-left: 8px; opacity: 0.8; font-weight: 500;">GPA: ${(0, helpers_1.escapeHtml)(edu.gpa)}</span>` : ''}
                                    </h4>
                                    <div style="font-size: ${s(14)}; color: #4b5563;">${(0, helpers_1.escapeHtml)(edu.school)}${(edu.city || edu.country) ? `, ${(0, helpers_1.escapeHtml)([edu.city, edu.country].filter(Boolean).join(', '))}` : ''}</div>
                                    <div style="font-size: ${s(12)}; color: #6b7280;">${(0, dateUtils_1.formatLocalizedDate)(edu.startDate, locale)} – ${edu.endDate ? (0, dateUtils_1.formatLocalizedDate)(edu.endDate, locale) : t.labels.present}</div>
                                    ${edu.honors ? `<p style="font-size: ${s(11)}; color: #4b5563; opacity: 0.8; margin: 0;">${(0, helpers_1.escapeHtml)(edu.honors)}</p>` : ''}
                                    ${edu.clubs ? `<p style="font-size: ${s(10)}; color: #6b7280; opacity: 0.7; margin: 0;">Activities: ${(0, helpers_1.escapeHtml)(edu.clubs)}</p>` : ''}

                                    ${edu.description ? `<p style="font-size: ${s(12)}; line-height: 1.6; color: #4b5563; margin-top: 4px;">${(0, helpers_1.formatDescription)(edu.description)}</p>` : ''}
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
            </section>

            <!-- Languages and Strengths Row -->
            ${(languages && languages.length > 0) || (strengths && strengths.length > 0) ? `
                <section class="resume-section" style="margin-bottom: 40px;">
                <div style="display: flex; gap: 32px;">
                    ${languages && languages.length > 0 ? `
                        <div style="flex: 1;">
                            ${SectionHeader(t.sections.languages)}
                            <div style="display: flex; flex-direction: column; gap: 8px; padding-left: 8px;">
                                ${languages.map(lang => `
                                    <div data-paginate="item" style="font-size: ${s(14)}; color: #374151;">
                                        <span style="font-weight: 600;">${(0, helpers_1.escapeHtml)(lang.name)}</span> 
                                        <span style="color: #6b7280; font-size: ${s(12)};">(${(0, helpers_1.escapeHtml)(lang.proficiency)})</span>
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
                </section>
            ` : ''}

            <!-- Interests -->
            ${interests && interests.length > 0 ? `
                <section class="resume-section" style="margin-top: 40px;">
                    ${SectionHeader(t.sections.interests)}
                    <p style="line-height: 1.6; font-size: ${s(14)}; color: #374151; padding-left: 8px;">
                        ${interests.map(i => (0, helpers_1.escapeHtml)(i.name)).join(' • ')}
                    </p>
                </section>
            ` : ''}

            <!-- Social Links -->
            ${(personalInfo.github || personalInfo.x || personalInfo.dribbble || personalInfo.behance || personalInfo.instagram) ? `
                <section class="resume-section" style="margin-top: 40px;">
                    ${SectionHeader(t.sections.socialLinks)}
                    <div style="padding-left: 8px; display: flex; flex-direction: column; gap: 8px; font-size: ${s(13)};">
                        ${personalInfo.github ? `<div data-paginate="item"><span style="font-weight: 600; color: #1f2937;">GitHub:</span> <span style="color: ${accentColor};">${(0, helpers_1.escapeHtml)(personalInfo.github)}</span></div>` : ''}
                        ${personalInfo.x ? `<div data-paginate="item"><span style="font-weight: 600; color: #1f2937;">X:</span> <span style="color: ${accentColor};">${(0, helpers_1.escapeHtml)(personalInfo.x)}</span></div>` : ''}
                        ${personalInfo.dribbble ? `<div data-paginate="item"><span style="font-weight: 600; color: #1f2937;">Dribbble:</span> <span style="color: ${accentColor};">${(0, helpers_1.escapeHtml)(personalInfo.dribbble)}</span></div>` : ''}
                        ${personalInfo.behance ? `<div data-paginate="item"><span style="font-weight: 600; color: #1f2937;">Behance:</span> <span style="color: ${accentColor};">${(0, helpers_1.escapeHtml)(personalInfo.behance)}</span></div>` : ''}
                        ${personalInfo.instagram ? `<div data-paginate="item"><span style="font-weight: 600; color: #1f2937;">Instagram:</span> <span style="color: ${accentColor};">${(0, helpers_1.escapeHtml)(personalInfo.instagram)}</span></div>` : ''}
                    </div>
                </section>
            ` : ''}

            <!-- Credentials -->
            ${(certifications && certifications.length > 0) || (awards && awards.length > 0) ? `
                <section class="resume-section" style="margin-top: 40px;">
                    ${SectionHeader(t.sections.credentials)}
                    <div style="padding-left: 8px;">
                        ${certifications && certifications.length > 0 ? `
                            <div style="margin-bottom: ${awards && awards.length > 0 ? '16px' : '0'};">
                                <h4 style="font-size: ${s(14)}; font-weight: 600; color: #6b7280; margin-bottom: 8px;">${t.sections.certifications}</h4>
                                <div style="display: flex; flex-direction: column; gap: 8px;">
                                    ${certifications.map(cert => `
                                        <div data-paginate="item">
                                            <div style="font-weight: 600; font-size: ${s(14)}; color: #000;">${(0, helpers_1.escapeHtml)(cert.name)}</div>
                                            <div style="font-size: ${s(12)}; color: #6b7280;">${(0, helpers_1.escapeHtml)(cert.issuer)} • ${(0, dateUtils_1.formatLocalizedDate)(cert.date, locale)}</div>
                                            ${cert.url ? `<div style="font-size: ${s(10)}; color: #6b7280; opacity: 0.7;">${(0, helpers_1.escapeHtml)(cert.url)}</div>` : ''}
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}
                        ${awards && awards.length > 0 ? `
                            <div>
                                <h4 style="font-size: ${s(14)}; font-weight: 600; color: #6b7280; margin-bottom: 8px;">${t.sections.awards}</h4>
                                <div style="display: flex; flex-direction: column; gap: 8px;">
                                    ${awards.map(award => `
                                        <div data-paginate="item">
                                            <div style="font-weight: 600; font-size: ${s(14)}; color: #000;">${(0, helpers_1.escapeHtml)(award.title)}</div>
                                            <div style="font-size: ${s(12)}; color: #6b7280;">${(0, helpers_1.escapeHtml)(award.issuer)} • ${(0, dateUtils_1.formatLocalizedDate)(award.date, locale)}</div>
                                        
                                            ${award.description ? `<p style="font-size: ${s(11)}; line-height: 1.5; color: #4b5563; margin-top: 2px;">${(0, helpers_1.formatDescription)(award.description)}</p>` : ''}
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}
                    </div>
                </section>
            ` : ''}

            <!-- Personal Details -->
            ${(personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber)) ? `
                <section class="resume-section" style="margin-top: 40px;">
                    ${SectionHeader(t.sections.personalDetails)}
                    <div style="padding-left: 8px; font-size: ${s(14)}; color: #374151;">
                        ${personalInfo.nationality ? `<div><span style="font-weight: 600;">Nationality:</span> ${(0, helpers_1.escapeHtml)(personalInfo.nationality)}</div>` : ''}
                        ${personalInfo.idType && personalInfo.idNumber ? `
                            <div><span style="font-weight: 600;">${personalInfo.idType === 'id' ? 'ID' : personalInfo.idType === 'passport' ? 'Passport' : 'Driving License'}:</span> ${(0, helpers_1.escapeHtml)(personalInfo.idNumber)}</div>
                        ` : ''}
                    </div>
                </section>
            ` : ''}

            <!-- Custom Fields -->
            ${customFields.map(field => `
                <section class="resume-section" style="margin-top: 40px;">
                    ${SectionHeader(field.label)}
                    <p style="line-height: 1.6; font-size: ${s(14)}; color: #374151; padding-left: 8px;">
                        ${(0, helpers_1.formatDescription)(field.content)}
                    </p>
                </section>
            `).join('')}

        </div>
    `;
};
exports.renderMinimalBlueSections = renderMinimalBlueSections;
//# sourceMappingURL=minimal-blue-sections.js.map
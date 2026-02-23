"use strict";
/**
 * Minimal Timeline Template
 * Ported from frontend/components/templates/layouts/minimal/MinimalTimeline.tsx
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderMinimalTimeline = void 0;
const helpers_1 = require("./shared/helpers");
const translations_1 = require("./shared/translations");
const dateUtils_1 = require("./shared/dateUtils");
const renderMinimalTimeline = (data, theme, translations, locale = 'en') => {
    const t = (0, translations_1.getTranslations)(translations);
    const { personalInfo, experience = [], education = [], skills = [], languages = [], strengths = [], interests = [], certifications = [], awards = [], customFields = [], fonts } = data;
    const headingFont = (0, helpers_1.getFontFamily)(fonts?.heading || 'Roboto');
    const bodyFont = (0, helpers_1.getFontFamily)(fonts?.body || 'Source Sans Pro');
    const sizeConfig = helpers_1.fontSizes[fonts?.size || 'medium'];
    // Font Scaling
    const scale = (0, helpers_1.getFontScale)(fonts?.size);
    const s = (px) => `${Math.max(5, Math.round(px * scale))}px`;
    // Theme
    const timelineColor = '#e5e7eb';
    const dotColor = data.customThemeColor || '#000000';
    // Progress bar helper
    const ProgressBar = (label, value) => `
        <div data-paginate="item" style="margin-bottom: 10px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                <span style="font-size: ${s(12)}; font-weight: 500; color: #1f2937;">${(0, helpers_1.escapeHtml)(label)}</span>
            </div>
            <div style="width: 100%; height: 6px; background-color: #e5e7eb; border-radius: 3px;">
                <div style="width: ${value}%; height: 100%; background-color: ${dotColor}; border-radius: 3px;"></div>
            </div>
        </div>
    `;
    // Helper for Section Headers
    const SectionHeader = (title) => `
        <h3 style="font-family: ${headingFont}; font-size: ${s(16)}; font-weight: 700; margin-bottom: 24px; margin-left: 20px; text-transform: uppercase; color: ${dotColor};">
            ${title}
        </h3>
    `;
    return `
        <div style="width: 100%; min-height: 100%; font-family: ${bodyFont}; font-size: ${sizeConfig.base}; background-color: #FFFFFF; color: #1f2937; padding: 40px; box-sizing: border-box; display: flex; flex-direction: column;">
            
            <!-- Header -->
            <header style="margin-bottom: 64px; margin-left: 20px;">
                <h1 style="font-family: ${headingFont}; font-size: ${s(38)}; font-weight: 700; color: #000; margin: 0 0 4px 0;">
                    ${(0, helpers_1.escapeHtml)(personalInfo.fullName || 'Your Name')}
                </h1>
                <p style="font-size: ${s(16)}; color: #4b5563; margin-bottom: 12px;">
                    ${(0, helpers_1.escapeHtml)(personalInfo.jobTitle || 'Job Title')}
                </p>
                <div style="font-size: ${s(12)}; color: #6b7280;">
                    ${[personalInfo.location, personalInfo.email, personalInfo.phone, personalInfo.website, personalInfo.linkedin]
        .filter(Boolean)
        .map(item => (0, helpers_1.escapeHtml)(item))
        .join('  |  ')}
                </div>
            </header>

            <!-- Experience with Timeline -->
            ${experience.length > 0 ? `
                <section class="resume-section" style="margin-bottom: 40px;">
                    ${SectionHeader(t.sections.experience)}
                    <div style="border-left: 2px solid ${timelineColor}; margin-left: 20px; padding-left: 24px;">
                        ${experience.map(exp => `
                            <div data-paginate="item" style="position: relative; margin-bottom: 32px;">
                                <!-- Timeline Dot -->
                                <div style="position: absolute; left: -31px; top: 4px; width: 12px; height: 12px; border-radius: 50%; background-color: ${dotColor}; border: 2px solid white;"></div>

                                <h4 style="font-weight: 700; font-size: ${s(14)}; color: #000; margin: 0;">${(0, helpers_1.escapeHtml)(exp.title)}</h4>
                                <div style="font-size: ${s(12)}; color: #6b7280; margin-bottom: 4px;">
                                    ${(0, helpers_1.escapeHtml)(exp.company)}${(exp.city || exp.country) ? `, ${(0, helpers_1.escapeHtml)([exp.city, exp.country].filter(Boolean).join(', '))}` : ''} | ${(0, dateUtils_1.formatLocalizedDate)(exp.startDate, locale)} – ${exp.current ? t.labels.present : (0, dateUtils_1.formatLocalizedDate)(exp.endDate, locale)}
                                </div>
                                <p style="font-size: ${s(14)}; line-height: 1.6; margin: 0;">
                                    ${(0, helpers_1.formatDescription)(exp.description || '')}
                                </p>
                            </div>
                        `).join('')}
                    </div>
                </section>
            ` : ''}

            <!-- Education with Timeline -->
            ${education.length > 0 ? `
                <section class="resume-section" style="margin-bottom: 40px;">
                    ${SectionHeader(t.sections.education)}
                    <div style="border-left: 2px solid ${timelineColor}; margin-left: 20px; padding-left: 24px;">
                        ${education.map(edu => `
                            <div data-paginate="item" style="position: relative; margin-bottom: 24px;">
                                <!-- Timeline Dot -->
                                <div style="position: absolute; left: -31px; top: 4px; width: 12px; height: 12px; border-radius: 50%; background-color: ${dotColor}; border: 2px solid white;"></div>
                                
                                <h4 style="font-weight: 700; font-size: ${s(14)}; color: #000; margin: 0;">
                                    ${(0, helpers_1.escapeHtml)(edu.degree)}
                                    ${edu.gpa ? `<span style="margin-left: 8px; opacity: 0.8; font-weight: 500;">GPA: ${(0, helpers_1.escapeHtml)(edu.gpa)}</span>` : ''}
                                </h4>
                                <div style="font-size: ${s(14)};">${(0, helpers_1.escapeHtml)(edu.school)}${(edu.city || edu.country) ? `, ${(0, helpers_1.escapeHtml)([edu.city, edu.country].filter(Boolean).join(', '))}` : ''}</div>
                                <div style="font-size: ${s(12)}; color: #6b7280;">${(0, dateUtils_1.formatLocalizedDate)(edu.startDate, locale)} – ${edu.endDate ? (0, dateUtils_1.formatLocalizedDate)(edu.endDate, locale) : t.labels.present}</div>
                                ${edu.honors ? `<p style="font-size: ${s(11)}; color: #4b5563; opacity: 0.8; margin: 0;">${(0, helpers_1.escapeHtml)(edu.honors)}</p>` : ''}
                                ${edu.clubs ? `<p style="font-size: ${s(10)}; color: #6b7280; opacity: 0.7; margin: 0;">Activities: ${(0, helpers_1.escapeHtml)(edu.clubs)}</p>` : ''}

                                ${edu.description ? `<p style="font-size: ${s(12)}; line-height: 1.6; color: #4b5563; margin-top: 4px;">${(0, helpers_1.formatDescription)(edu.description)}</p>` : ''}
                            </div>
                        `).join('')}
                    </div>
                </section>
            ` : ''}

            <!-- Skills -->
            ${skills.length > 0 ? `
                <section class="resume-section" style="margin-left: 20px; margin-bottom: 32px;">
                    <h3 style="font-family: ${headingFont}; font-size: ${s(16)}; font-weight: 700; margin-bottom: 16px; text-transform: uppercase; color: ${dotColor};">${t.sections.skills}</h3>
                    <div>
                        ${skills.map(skill => ProgressBar(skill.name, (skill.level || 3) * 20)).join('')}
                    </div>
                </section>
            ` : ''}

            <!-- Languages -->
            ${languages && languages.length > 0 ? `
                <section class="resume-section" style="margin-left: 20px; margin-bottom: 32px;">
                    <h3 style="font-family: ${headingFont}; font-size: ${s(16)}; font-weight: 700; margin-bottom: 16px; text-transform: uppercase; color: ${dotColor};">${t.sections.languages}</h3>
                    <p style="line-height: 1.8; font-size: ${s(14)};">
                        ${languages.map(l => `${(0, helpers_1.escapeHtml)(l.name)} (${(0, helpers_1.escapeHtml)(l.proficiency)})`).join('  •  ')}
                    </p>
                </section>
            ` : ''}

            <!-- Personal Details -->
            ${(personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber)) ? `
                <section class="resume-section" style="margin-left: 20px; margin-bottom: 32px;">
                    <h3 style="font-family: ${headingFont}; font-size: ${s(16)}; font-weight: 700; margin-bottom: 16px; text-transform: uppercase; color: ${dotColor};">${t.sections.personalDetails}</h3>
                    <div style="font-size: ${s(14)}; color: #374151;">
                        ${personalInfo.nationality ? `<div data-paginate="item"><span style="font-weight: 600;">Nationality:</span> ${(0, helpers_1.escapeHtml)(personalInfo.nationality)}</div>` : ''}
                        ${personalInfo.idType && personalInfo.idNumber ? `<div data-paginate="item" style="margin-top: 4px;"><span style="font-weight: 600;">${personalInfo.idType === 'passport' ? 'Passport Number' : personalInfo.idType === 'id' ? 'ID Number' : 'Driving License'}:</span> ${(0, helpers_1.escapeHtml)(personalInfo.idNumber)}</div>` : ''}
                    </div>
                </section>
            ` : ''}

            <!-- Strengths -->
            ${strengths && strengths.length > 0 ? `
                <section class="resume-section" style="margin-left: 20px; margin-bottom: 32px;">
                    <h3 style="font-family: ${headingFont}; font-size: ${s(16)}; font-weight: 700; margin-bottom: 16px; text-transform: uppercase; color: ${dotColor};">${t.sections.strengths}</h3>
                    <div style="display: flex; flex-wrap: wrap; gap: 12px;">
                        ${strengths.map(str => `
                            <span data-paginate="item" style="font-size: ${s(14)}; color: #1f2937; background-color: #f3f4f6; padding: 4px 8px; border-radius: 4px;">
                                ${(0, helpers_1.escapeHtml)(str.name)}
                            </span>
                        `).join('')}
                    </div>
                </section>
            ` : ''}

            <!-- Interests -->
            ${interests && interests.length > 0 ? `
                <section class="resume-section" style="margin-left: 20px; margin-bottom: 32px;">
                    <h3 style="font-family: ${headingFont}; font-size: ${s(16)}; font-weight: 700; margin-bottom: 16px; text-transform: uppercase; color: ${dotColor};">${t.sections.interests}</h3>
                    <p style="line-height: 1.8; font-size: ${s(14)};">
                        ${interests.map(i => (0, helpers_1.escapeHtml)(i.name)).join(' • ')}
                    </p>
                </section>
            ` : ''}

            <!-- Social Links -->
            ${(personalInfo.github || personalInfo.x || personalInfo.dribbble || personalInfo.behance || personalInfo.instagram) ? `
                <section class="resume-section" style="margin-left: 20px; margin-bottom: 32px;">
                    <h3 style="font-family: ${headingFont}; font-size: ${s(16)}; font-weight: 700; margin-bottom: 16px; text-transform: uppercase; color: ${dotColor};">${t.sections.socialLinks}</h3>
                    <div style="display: flex; flex-direction: column; gap: 8px; font-size: ${s(13)};">
                        ${personalInfo.github ? `<div data-paginate="item"><span style="font-weight: 600; color: #1f2937;">GitHub:</span> <span style="color: ${dotColor};">${(0, helpers_1.escapeHtml)(personalInfo.github)}</span></div>` : ''}
                        ${personalInfo.x ? `<div data-paginate="item"><span style="font-weight: 600; color: #1f2937;">X:</span> <span style="color: ${dotColor};">${(0, helpers_1.escapeHtml)(personalInfo.x)}</span></div>` : ''}
                        ${personalInfo.dribbble ? `<div data-paginate="item"><span style="font-weight: 600; color: #1f2937;">Dribbble:</span> <span style="color: ${dotColor};">${(0, helpers_1.escapeHtml)(personalInfo.dribbble)}</span></div>` : ''}
                        ${personalInfo.behance ? `<div data-paginate="item"><span style="font-weight: 600; color: #1f2937;">Behance:</span> <span style="color: ${dotColor};">${(0, helpers_1.escapeHtml)(personalInfo.behance)}</span></div>` : ''}
                        ${personalInfo.instagram ? `<div data-paginate="item"><span style="font-weight: 600; color: #1f2937;">Instagram:</span> <span style="color: ${dotColor};">${(0, helpers_1.escapeHtml)(personalInfo.instagram)}</span></div>` : ''}
                    </div>
                </section>
            ` : ''}

            <!-- Credentials -->
            ${(certifications && certifications.length > 0) || (awards && awards.length > 0) ? `
                <section class="resume-section" style="margin-left: 20px; margin-bottom: 32px;">
                    <h3 style="font-family: ${headingFont}; font-size: ${s(16)}; font-weight: 700; margin-bottom: 16px; text-transform: uppercase; color: ${dotColor};">${t.sections.credentials}</h3>
                    ${certifications && certifications.length > 0 ? `
                        <div style="margin-bottom: ${awards && awards.length > 0 ? '16px' : '0'};">
                            <h4 style="font-size: ${s(14)}; font-weight: 600; color: #6b7280; margin-bottom: 8px;">${t.sections.certifications}</h4>
                            <div style="display: flex; flex-direction: column; gap: 8px;">
                                ${certifications.map(cert => `
                                    <div data-paginate="item">
                                        <div style="font-weight: 600; font-size: ${s(14)}; color: #1f2937;">${(0, helpers_1.escapeHtml)(cert.name)}</div>
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
                                        <div style="font-weight: 600; font-size: ${s(14)}; color: #1f2937;">${(0, helpers_1.escapeHtml)(award.title)}</div>
                                        <div style="font-size: ${s(12)}; color: #6b7280;">${(0, helpers_1.escapeHtml)(award.issuer)} • ${(0, dateUtils_1.formatLocalizedDate)(award.date, locale)}</div>
                                    
                                        ${award.description ? `<p style="font-size: ${s(11)}; line-height: 1.5; color: #4b5563; margin-top: 2px;">${(0, helpers_1.formatDescription)(award.description)}</p>` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                </section>
            ` : ''}

            <!-- Custom Fields -->
            ${customFields.map(field => `
                <section class="resume-section" style="margin-left: 20px; margin-bottom: 32px;">
                    <h3 style="font-family: ${headingFont}; font-size: ${s(16)}; font-weight: 700; margin-bottom: 16px; text-transform: uppercase; color: ${dotColor};">${(0, helpers_1.escapeHtml)(field.label)}</h3>
                    <div style="font-size: ${s(14)}; color: #374151; line-height: 1.6;">
                        ${(0, helpers_1.formatDescription)(field.content)}
                    </div>
                </section>
            `).join('')}

        </div>
    `;
};
exports.renderMinimalTimeline = renderMinimalTimeline;
//# sourceMappingURL=minimal-timeline.js.map
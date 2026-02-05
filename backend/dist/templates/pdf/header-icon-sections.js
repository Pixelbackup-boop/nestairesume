"use strict";
/**
 * Header Icon Sections Template
 * Ported from frontend/components/templates/layouts/header/HeaderIconSections.tsx
 *
 * Stacked sections where each section is enclosed in a box with a black border.
 * Distinctive Cyan background and Orange accents.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderHeaderIconSections = void 0;
const helpers_1 = require("./shared/helpers");
const translations_1 = require("./shared/translations");
const dateUtils_1 = require("./shared/dateUtils");
const renderHeaderIconSections = (data, theme, translations, locale = 'en') => {
    const t = (0, translations_1.getTranslations)(translations);
    const { personalInfo, experience = [], education = [], skills = [], languages = [], strengths = [], interests = [], certifications = [], awards = [], fonts } = data;
    // Font Families
    const headingFont = (0, helpers_1.getFontFamily)(fonts?.heading || 'Merriweather');
    const bodyFont = (0, helpers_1.getFontFamily)(fonts?.body || 'Inter');
    // Font Sizes (Dynamic)
    const sizeConfig = {
        small: { base: 10, heading: 20, subheading: 12 },
        medium: { base: 11, heading: 24, subheading: 14 },
        large: { base: 12, heading: 28, subheading: 16 }
    }[fonts?.size || 'medium'];
    const sizes = {
        name: sizeConfig.heading + 8, // ~32px for medium
        jobTitle: sizeConfig.subheading,
        sectionHeading: sizeConfig.subheading,
        entryTitle: sizeConfig.base + 1,
        body: sizeConfig.base,
        small: sizeConfig.base - 1
    };
    // Colors
    // Default to white background (removed #ecfeff hardcode) unless user overrides
    const pageBg = '#ffffff';
    const orangeAccent = data.customThemeColor || theme.primary || '#ea580c';
    const borderColor = '#000000';
    // Use user text color if provided, otherwise default for this template is black
    // But this template has specific black borders/text design.
    // We'll respect specific text sections.
    // Dimensions
    const photoSize = 140;
    // Helpers
    const ProgressBar = (label, value) => `
        <div style="margin-bottom: 12px;" data-paginate="item">
            <div style="font-size: ${sizes.body}pt; font-weight: 500; margin-bottom: 4px;">${(0, helpers_1.escapeHtml)(label)}</div>
            <div style="width: 100%; height: 8px; background-color: #e5e7eb; border-radius: 4px; overflow: hidden;">
                <div style="width: ${value}%; height: 100%; background-color: ${orangeAccent}; border-radius: 4px;"></div>
            </div>
        </div>
    `;
    const BoxSection = (title, icon, content) => `
        <section style="border: 1px solid ${borderColor}; background-color: #ffffff; padding: 44px 32px 32px 32px; margin-bottom: 32px; position: relative; box-shadow: 4px 4px 0px 0px rgba(0,0,0,0.1);" data-paginate>
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 24px; border-bottom: 2px solid ${orangeAccent}; padding-bottom: 8px;">
                <span style="background-color: ${orangeAccent}; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px;">
                    ${icon}
                </span>
                <h3 style="font-family: ${headingFont}; font-size: ${sizes.sectionHeading}pt; font-weight: 700; text-transform: uppercase; color: #1f2937;">
                    ${title}
                </h3>
            </div>
            <div style="font-size: ${sizes.body}pt;">
                ${content}
            </div>
        </section>
    `;
    // Profile Image
    const profileImage = personalInfo.profileImage ? `
        <div style="width: ${photoSize}px; height: ${photoSize}px; border-radius: 50%; border: 2px solid ${orangeAccent}; padding: 4px; overflow: hidden; flex-shrink: 0;">
            <img
                src="${personalInfo.profileImage}"
                alt="${(0, helpers_1.escapeHtml)(personalInfo.fullName)}"
                style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;"
            />
        </div>
    ` : `
        <div style="width: ${photoSize}px; height: ${photoSize}px; border-radius: 50%; border: 2px solid ${orangeAccent}; display: flex; align-items: center; justify-content: center; font-size: 48px; color: ${orangeAccent}; background-color: #fff7ed; flex-shrink: 0;">
            ${(0, helpers_1.escapeHtml)(personalInfo.fullName?.charAt(0) || '?')}
        </div>
    `;
    return `
        <div style="width: 100%; min-height: 100%; font-family: ${bodyFont}; font-size: ${sizes.body}pt; background-color: ${pageBg}; color: #000000; padding: 32px; box-sizing: border-box;">

            <!-- Header Box -->
            <header style="display: flex; align-items: center; gap: 32px; border: 1px solid ${borderColor}; background-color: #ffffff; padding: 32px; margin-bottom: 32px; box-shadow: 4px 4px 0px 0px rgba(0,0,0,0.1);">
                <!-- Photo -->
                ${profileImage}

                <!-- Name & Contact -->
                <div style="flex: 1;">
                    <h1 style="font-family: ${headingFont}; font-size: ${sizes.name}pt; font-weight: 700; color: #000000; margin-bottom: 8px; line-height: 1.1;">
                        ${(0, helpers_1.escapeHtml)(personalInfo.fullName || 'Your Name')}
                    </h1>
                    <p style="font-size: ${sizes.jobTitle}pt; color: ${orangeAccent}; font-weight: 600; text-transform: uppercase; margin-bottom: 12px; letter-spacing: 0.05em;">
                        ${(0, helpers_1.escapeHtml)(personalInfo.jobTitle || 'Job Title')}
                    </p>

                    <div style="display: flex; flex-wrap: wrap; gap: 8px 16px; font-size: ${sizes.small}pt; color: #4b5563;">
                        ${personalInfo.email ? `<span>&#9993; ${(0, helpers_1.escapeHtml)(personalInfo.email)}</span>` : ''}
                        ${personalInfo.phone ? `<span>&#128241; ${(0, helpers_1.escapeHtml)(personalInfo.phone)}</span>` : ''}
                        ${personalInfo.location ? `<span>&#128205; ${(0, helpers_1.escapeHtml)(personalInfo.location)}</span>` : ''}
                    </div>
                </div>
            </header>

            <!-- Profile Section -->
            ${personalInfo.summary ? BoxSection(t.sections.profile, '&#128100;', `<p style="line-height: 1.6;">${(0, helpers_1.formatDescription)(personalInfo.summary)}</p>`) : ''}

            <!-- Experience Section -->
            ${experience.length > 0 ? BoxSection(t.sections.experience, '&#128188;', `
                <div style="display: flex; flex-direction: column; gap: 24px;">
                    ${experience.map(exp => `
                        <div data-paginate="item">
                            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
                                <h4 style="font-weight: 700; font-size: ${sizes.entryTitle}pt;">${(0, helpers_1.escapeHtml)(exp.title)}</h4>
                                <span style="font-size: ${sizes.small}pt; font-weight: 600; color: ${orangeAccent};">
                                    ${(0, dateUtils_1.formatLocalizedDate)(exp.startDate, locale)} – ${exp.current ? t.labels.present : (0, dateUtils_1.formatLocalizedDate)(exp.endDate, locale)}
                                </span>
                            </div>
                            <p style="font-size: ${sizes.body}pt; font-style: italic; margin-bottom: 6px; color: #525252;">
                                ${(0, helpers_1.escapeHtml)(exp.company)}, ${(0, helpers_1.escapeHtml)(exp.city)}
                            </p>
                            <p style="font-size: ${sizes.body}pt; line-height: 1.5;">
                                ${(0, helpers_1.formatDescription)(exp.description || '')}
                            </p>
                        </div>
                    `).join('')}
                </div>
            `) : ''}

            <!-- Education Section -->
            ${education.length > 0 ? BoxSection(t.sections.education, '&#127891;', `
                <div style="display: flex; flex-direction: column; gap: 20px;">
                    ${education.map(edu => `
                        <div data-paginate="item">
                            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
                                <h4 style="font-weight: 700; font-size: ${sizes.entryTitle}pt;">${(0, helpers_1.escapeHtml)(edu.degree)}</h4>
                                <span style="font-size: ${sizes.small}pt; font-weight: 600; color: ${orangeAccent};">
                                    ${(0, dateUtils_1.formatLocalizedDate)(edu.startDate, locale)} – ${edu.endDate ? (0, dateUtils_1.formatLocalizedDate)(edu.endDate, locale) : t.labels.present}
                                </span>
                            </div>
                            <p style="font-size: ${sizes.body}pt; font-style: italic; color: #525252;">
                                ${(0, helpers_1.escapeHtml)(edu.school)}, ${(0, helpers_1.escapeHtml)(edu.city)}
                            </p>
                        </div>
                    `).join('')}
                </div>
            `) : ''}

            <!-- Skills & Strengths Row -->
            <div style="display: flex; gap: 32px;">
                <!-- Skills Section -->
                ${skills.length > 0 ? `
                    <div style="flex: 1;">
                        ${BoxSection(t.sections.skills, '&#9881;', `
                            <div>
                                ${skills.map(skill => ProgressBar(skill.name, skill.level ? skill.level * 20 : 80)).join('')}
                            </div>
                        `)}
                    </div>
                ` : ''}

                <!-- Strengths Section -->
                ${strengths && strengths.length > 0 ? `
                    <div style="flex: 1;">
                        ${BoxSection(t.sections.strengths, '&#11088;', `
                            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                                ${strengths.map(str => `
                                    <span style="background-color: #fff7ed; color: ${orangeAccent}; border: 1px solid ${orangeAccent}; padding: 4px 12px; border-radius: 4px; font-size: ${sizes.small}pt; font-weight: 600; display: inline-block;">
                                        ${(0, helpers_1.escapeHtml)(str.name)}
                                    </span>
                                `).join('')}
                            </div>
                        `)}
                    </div>
                ` : ''}
            </div>

            <!-- Languages & Interests Row -->
            <div style="display: flex; gap: 32px;">
                ${languages && languages.length > 0 ? `
                    <div style="flex: 1;">
                        ${BoxSection(t.sections.languages, '&#128483;', `
                            <div style="display: flex; flex-direction: column; gap: 8px;">
                                ${languages.map(lang => `
                                    <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #f3f4f6; padding-bottom: 4px;" data-paginate="item">
                                        <span style="font-weight: 600;">${(0, helpers_1.escapeHtml)(lang.name)}</span>
                                        <span style="color: #6b7280;">${(0, helpers_1.escapeHtml)(lang.proficiency)}</span>
                                    </div>
                                `).join('')}
                            </div>
                        `)}
                    </div>
                ` : ''}

                ${interests && interests.length > 0 ? `
                    <div style="flex: 1;">
                        ${BoxSection(t.sections.interests, '&#127912;', `
                            <div style="display: flex; flex-wrap: wrap; gap: 12px;">
                                ${interests.map(int => `
                                    <span style="display: flex; align-items: center; gap: 6px;">
                                        <span style="color: ${orangeAccent};">&#9733;</span> ${(0, helpers_1.escapeHtml)(int.name)}
                                    </span>
                                `).join('')}
                            </div>
                        `)}
                    </div>
                ` : ''}
            </div>

            <!-- Credentials Section -->
            ${(certifications && certifications.length > 0) || (awards && awards.length > 0) ? BoxSection(t.sections.credentials, '&#127942;', `
                <div style="display: flex; gap: 32px;">
                    ${certifications && certifications.length > 0 ? `
                        <div style="flex: 1;">
                            <h4 style="font-size: ${sizes.small}pt; font-weight: 600; color: #6b7280; margin-bottom: 8px;">${t.sections.certifications}</h4>
                            <div style="display: flex; flex-direction: column; gap: 8px;">
                                ${certifications.map(cert => `
                                    <div data-paginate="item">
                                        <div style="font-weight: 600; font-size: ${sizes.body}pt;">${(0, helpers_1.escapeHtml)(cert.name)}</div>
                                        <div style="font-size: ${sizes.small}pt; color: #6b7280;">${(0, helpers_1.escapeHtml)(cert.issuer)} • ${(0, dateUtils_1.formatLocalizedDate)(cert.date, locale)}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    ${awards && awards.length > 0 ? `
                        <div style="flex: 1;">
                            <h4 style="font-size: ${sizes.small}pt; font-weight: 600; color: #6b7280; margin-bottom: 8px;">${t.sections.awards}</h4>
                            <div style="display: flex; flex-direction: column; gap: 8px;">
                                ${awards.map(award => `
                                    <div data-paginate="item">
                                        <div style="font-weight: 600; font-size: ${sizes.body}pt;">${(0, helpers_1.escapeHtml)(award.title)}</div>
                                        <div style="font-size: ${sizes.small}pt; color: #6b7280;">${(0, helpers_1.escapeHtml)(award.issuer)} • ${(0, dateUtils_1.formatLocalizedDate)(award.date, locale)}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
            `) : ''}

            <!-- Social Links (Boxed) -->
            ${(personalInfo.linkedin || personalInfo.twitter || personalInfo.github || personalInfo.dribbble || personalInfo.behance || personalInfo.instagram) ? BoxSection(t.sections.socialLinks, '&#128279;', `
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    ${personalInfo.linkedin ? `<div><span style="font-weight: 600;">LinkedIn:</span> ${(0, helpers_1.escapeHtml)(personalInfo.linkedin)}</div>` : ''}
                    ${personalInfo.twitter ? `<div><span style="font-weight: 600;">Twitter:</span> ${(0, helpers_1.escapeHtml)(personalInfo.twitter)}</div>` : ''}
                    ${personalInfo.github ? `<div><span style="font-weight: 600;">GitHub:</span> ${(0, helpers_1.escapeHtml)(personalInfo.github)}</div>` : ''}
                    ${personalInfo.dribbble ? `<div><span style="font-weight: 600;">Dribbble:</span> ${(0, helpers_1.escapeHtml)(personalInfo.dribbble)}</div>` : ''}
                    ${personalInfo.behance ? `<div><span style="font-weight: 600;">Behance:</span> ${(0, helpers_1.escapeHtml)(personalInfo.behance)}</div>` : ''}
                    ${personalInfo.instagram ? `<div><span style="font-weight: 600;">Instagram:</span> ${(0, helpers_1.escapeHtml)(personalInfo.instagram)}</div>` : ''}
                </div>
            `) : ''}

            <!-- References (Boxed) -->
            ${data.references && data.references.length > 0 ? BoxSection(t.sections.references, '&#128203;', `
                <div style="display: flex; flex-direction: column; gap: 16px;">
                    ${data.references.map(ref => `
                        <div data-paginate="item">
                            <div style="font-weight: 700; font-size: ${sizes.entryTitle}pt;">${(0, helpers_1.escapeHtml)(ref.name)}</div>
                            <div style="font-size: ${sizes.body}pt; font-style: italic; color: #525252;">${(0, helpers_1.escapeHtml)(ref.title)}, ${(0, helpers_1.escapeHtml)(ref.company)}</div>
                            ${ref.email ? `<div style="font-size: ${sizes.small}pt; color: #6b7280;">${(0, helpers_1.escapeHtml)(ref.email)}</div>` : ''}
                            ${ref.phone ? `<div style="font-size: ${sizes.small}pt; color: #6b7280;">${(0, helpers_1.escapeHtml)(ref.phone)}</div>` : ''}
                        </div>
                    `).join('')}
                </div>
            `) : ''}

            <!-- Personal Details (Boxed) -->
            ${(personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber)) ? BoxSection(t.sections.personalDetails, '&#128221;', `
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    ${personalInfo.nationality ? `<div><span style="font-weight: 600;">Nationality:</span> ${(0, helpers_1.escapeHtml)(personalInfo.nationality)}</div>` : ''}
                    ${personalInfo.idType && personalInfo.idNumber ? `
                        <div>
                            <span style="font-weight: 600;">
                                ${personalInfo.idType === 'id' ? 'ID' : personalInfo.idType === 'passport' ? 'Passport' : personalInfo.idType === 'driving_license' ? 'Driving License' : 'ID'}:
                            </span> ${(0, helpers_1.escapeHtml)(personalInfo.idNumber)}
                        </div>
                    ` : ''}
                </div>
            `) : ''}

            <!-- Custom Field (Boxed) -->
            ${personalInfo.customField && personalInfo.customFieldLabel ? BoxSection(personalInfo.customFieldLabel, '&#128204;', `
                <p style="line-height: 1.6;">${(0, helpers_1.formatDescription)(personalInfo.customField)}</p>
            `) : ''}

        </div>
    `;
};
exports.renderHeaderIconSections = renderHeaderIconSections;
//# sourceMappingURL=header-icon-sections.js.map
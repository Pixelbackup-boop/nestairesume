"use strict";
/**
 * Classic Professional Template
 * Traditional top-down professional resume layout with centered header.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderClassicProfessional = void 0;
const helpers_1 = require("./shared/helpers");
const translations_1 = require("./shared/translations");
const dateUtils_1 = require("./shared/dateUtils");
const renderClassicProfessional = (data, theme, translations, locale = 'en') => {
    const t = (0, translations_1.getTranslations)(translations);
    const { personalInfo, experience = [], education = [], skills = [], languages = [], interests = [], strengths = [], certifications = [], awards = [], customFields = [], background, fonts } = data;
    // Force white background - no background customization in builder UI
    const bgStyle = 'background-color: #ffffff;';
    const headingFont = (0, helpers_1.getFontFamily)(fonts?.heading || 'Inter');
    const bodyFont = (0, helpers_1.getFontFamily)(fonts?.body || 'Inter');
    const sizeConfig = helpers_1.fontSizes[fonts?.size || 'medium'];
    // Font Scaling
    const scale = (0, helpers_1.getFontScale)(fonts?.size);
    const s = (px) => `${Math.max(5, Math.round(px * scale))}px`;
    // Custom Theme Color Override
    const primaryColor = data.customThemeColor || theme.primary;
    const accentColor = data.customThemeColor || theme.accent; // Usually accent is same as primary in this theme logic or secondary? 
    // In classic-professional, accent is used for underlines. Theme.primary is used for headers.
    // Let's make them consistent if custom color is provided.
    const effectivePrimary = data.customThemeColor || theme.primary;
    const effectiveAccent = data.customThemeColor || theme.accent;
    // Build sections
    const profileImage = personalInfo.profileImage ? `
        <div class="flex justify-center mb-3">
            <img
                src="${personalInfo.profileImage}"
                alt="${(0, helpers_1.escapeHtml)(personalInfo.fullName)}"
                class="object-cover border-2"
                style="width: 80px; height: 80px; border-radius: ${(0, helpers_1.getImageBorderRadius)(personalInfo.imageShape)}; border-color: ${effectivePrimary};"
            />
        </div>
    ` : '';
    const contactItems = [
        personalInfo.email,
        personalInfo.phone,
        personalInfo.location,
        personalInfo.website,
        personalInfo.linkedin,
    ].filter(Boolean);
    const contactHtml = contactItems.map((item, i) => `${i > 0 ? '<span>&bull;</span>' : ''}<span style="word-break: break-all;">${(0, helpers_1.escapeHtml)(item)}</span>`).join('');
    const summarySection = personalInfo.summary ? `
        <section class="mb-5 resume-section">
            <h2 style="color: ${effectivePrimary}; font-family: ${headingFont}; font-size: ${s(14)}; font-weight: 700; border-bottom: 1px solid ${effectiveAccent}; padding-bottom: 4px; margin-bottom: 12px;">
                ${t.sections.profile}
            </h2>
            <p style="color: ${theme.text}; line-height: 1.5; font-size: ${sizeConfig.base};">
                ${(0, helpers_1.formatDescription)(personalInfo.summary)}
            </p>
        </section>
    ` : '';
    const experienceSection = experience.length > 0 ? `
        <section class="mb-5">
            <h2 style="color: ${effectivePrimary}; font-family: ${headingFont}; font-size: ${s(14)}; font-weight: 700; border-bottom: 1px solid ${effectiveAccent}; padding-bottom: 4px; margin-bottom: 12px;">
                ${t.sections.experience}
            </h2>
            <div class="space-y-3">
                ${experience.map(exp => `
                    <div data-paginate="item" class="resume-entry">
                        <div class="flex justify-between items-baseline">
                            <h3 style="color: ${theme.text}; font-weight: 600; font-size: ${sizeConfig.base};">
                                ${(0, helpers_1.escapeHtml)(exp.title)}
                            </h3>
                            <span style="color: ${theme.text}; opacity: 0.7; font-size: ${s(11)};">
                                ${(0, dateUtils_1.formatLocalizedDate)(exp.startDate, locale)} – ${exp.current ? t.labels.present : (0, dateUtils_1.formatLocalizedDate)(exp.endDate, locale)}
                            </span>
                        </div>
                        <p style="color: ${theme.secondary}; font-size: ${s(12)}; margin-bottom: 4px;">
                            ${(0, helpers_1.escapeHtml)(exp.company)}${(exp.city || exp.country) ? `, ${[exp.city, exp.country].filter(Boolean).map(s => (0, helpers_1.escapeHtml)(s)).join(', ')}` : ''}
                        </p>
                        ${exp.description ? `
                            <p style="color: ${theme.text}; opacity: 0.8; font-size: ${s(12)}; line-height: 1.4;">
                                ${(0, helpers_1.formatDescription)(exp.description)}
                            </p>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        </section>
    ` : '';
    const educationSection = education.length > 0 ? `
        <section class="mb-5">
            <h2 style="color: ${effectivePrimary}; font-family: ${headingFont}; font-size: ${s(14)}; font-weight: 700; border-bottom: 1px solid ${effectiveAccent}; padding-bottom: 4px; margin-bottom: 12px;">
                ${t.sections.education}
            </h2>
            <div class="space-y-2">
                ${education.map(edu => `
                    <div data-paginate="item" class="resume-entry">
                        <div class="flex justify-between items-baseline">
                            <h3 style="color: ${theme.text}; font-weight: 600; font-size: ${sizeConfig.base};">
                                ${(0, helpers_1.escapeHtml)(edu.school)}${(edu.city || edu.country) ? `, ${(0, helpers_1.escapeHtml)([edu.city, edu.country].filter(Boolean).join(', '))}` : ''}
                            </h3>
                            <span style="color: ${theme.text}; opacity: 0.7; font-size: ${s(11)};">
                                ${(0, dateUtils_1.formatLocalizedDate)(edu.startDate, locale)} – ${edu.current ? t.labels.present : (0, dateUtils_1.formatLocalizedDate)(edu.endDate, locale)}
                            </span>
                        </div>
                        <p style="color: ${theme.secondary}; font-size: ${s(12)};">
                            ${(0, helpers_1.escapeHtml)(edu.degree)}
                            ${edu.gpa ? `<span style="margin-left: 8px; opacity: 0.8;">GPA: ${(0, helpers_1.escapeHtml)(edu.gpa)}</span>` : ''}
                        </p>
                        ${edu.honors ? `<p style="color: ${theme.text}; opacity: 0.7; font-size: ${s(11)};">${(0, helpers_1.escapeHtml)(edu.honors)}</p>` : ''}
                        ${edu.clubs ? `<p style="color: ${theme.text}; opacity: 0.6; font-size: ${s(10)};">Activities: ${(0, helpers_1.escapeHtml)(edu.clubs)}</p>` : ''}
                    
                        ${edu.description ? `<p style="font-size: ${s(12)}; line-height: 1.6; color: #4b5563; margin-top: 4px;">${(0, helpers_1.formatDescription)(edu.description)}</p>` : ''}
                    </div>
                `).join('')}
            </div>
        </section>
    ` : '';
    const skillsSection = skills.length > 0 ? `
        <section class="mb-5">
            <h2 style="color: ${effectivePrimary}; font-family: ${headingFont}; font-size: ${s(14)}; font-weight: 700; border-bottom: 1px solid ${effectiveAccent}; padding-bottom: 4px; margin-bottom: 12px;">
                ${t.sections.skills}
            </h2>
            <div class="space-y-1">
                ${skills.map(skill => `
                    <div data-paginate="item" class="flex items-center gap-2 resume-entry">
                        <span style="color: ${theme.text}; font-size: ${s(12)}; min-width: 100px;">
                            ${(0, helpers_1.escapeHtml)(skill.name)}
                        </span>
                        <div class="flex gap-1">
                            ${[1, 2, 3, 4, 5].map(dot => `
                                <div style="width: 8px; height: 8px; border-radius: 50%; background-color: ${dot <= (skill.level || 3) ? effectivePrimary : `${effectivePrimary}30`};"></div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>
    ` : '';
    const languagesSection = languages && languages.length > 0 ? `
        <section class="mb-5">
            <h2 style="color: ${effectivePrimary}; font-family: ${headingFont}; font-size: ${s(14)}; font-weight: 700; border-bottom: 1px solid ${effectiveAccent}; padding-bottom: 4px; margin-bottom: 12px;">
                ${t.sections.languages}
            </h2>
            <div class="space-y-1">
                ${languages.map(lang => `
                    <div data-paginate="item" class="flex items-center justify-between resume-entry">
                        <span style="color: ${theme.text}; font-size: ${s(12)};">${(0, helpers_1.escapeHtml)(lang.name)}</span>
                            <div class="flex items-center gap-2">
                                <span style="color: ${theme.text}; opacity: 0.7; font-size: ${s(10)}; text-transform: capitalize;">
                                    ${(0, helpers_1.escapeHtml)(lang.proficiency)}
                                </span>
                                <div style="width: 80px; height: 6px; background-color: ${effectivePrimary}30; border-radius: 3px; overflow: hidden;">
                                    <div style="width: ${(0, helpers_1.getLanguageLevel)(lang)}%; height: 100%; background-color: ${effectivePrimary};"></div>
                                </div>
                            </div>
                    </div>
                `).join('')}
            </div>
        </section>
    ` : '';
    const strengthsSection = strengths && strengths.length > 0 ? `
        <section class="mb-5 resume-section">
            <h2 style="color: ${effectivePrimary}; font-family: ${headingFont}; font-size: ${s(14)}; font-weight: 700; border-bottom: 1px solid ${effectiveAccent}; padding-bottom: 4px; margin-bottom: 12px;">
                ${t.sections.strengths}
            </h2>
            <p style="color: ${theme.text}; font-size: ${s(12)}; line-height: 1.6;">
                ${strengths.map(strength => (0, helpers_1.escapeHtml)(strength.name)).join(' &bull; ')}
            </p>
        </section>
    ` : '';
    const certificationsSection = certifications && certifications.length > 0 ? `
        <section class="mb-5">
            <h2 style="color: ${effectivePrimary}; font-family: ${headingFont}; font-size: ${s(14)}; font-weight: 700; border-bottom: 1px solid ${effectiveAccent}; padding-bottom: 4px; margin-bottom: 12px;">
                ${t.sections.certifications}
            </h2>
            <div class="space-y-1">
                ${certifications.map(cert => `
                    <div data-paginate="item" class="resume-entry">
                        <span style="color: ${theme.text}; font-weight: 500; font-size: ${s(12)};">${(0, helpers_1.escapeHtml)(cert.name)}</span>
                        <span style="color: ${theme.text}; opacity: 0.7; font-size: ${s(11)}; margin-left: 8px;">
                            ${(0, helpers_1.escapeHtml)(cert.issuer)} &bull; ${(0, dateUtils_1.formatLocalizedDate)(cert.date, locale)}
                        </span>
                        ${cert.url ? `<div style="font-size: ${s(10)}; color: #6b7280; opacity: 0.7;">${(0, helpers_1.escapeHtml)(cert.url)}</div>` : ''}
                    </div>
                `).join('')}
            </div>
        </section>
    ` : '';
    const awardsSection = awards.length > 0 ? `
        <section class="mb-5">
            <h2 style="color: ${effectivePrimary}; font-family: ${headingFont}; font-size: ${s(14)}; font-weight: 700; border-bottom: 1px solid ${effectiveAccent}; padding-bottom: 4px; margin-bottom: 12px;">
                ${t.sections.awards}
            </h2>
            <div class="space-y-2">
                ${awards.map(award => `
                    <div data-paginate="item" class="resume-entry">
                        <div style="color: ${theme.text}; font-weight: 600; font-size: ${sizeConfig.base};">
                            ${(0, helpers_1.escapeHtml)(award.title)}
                        </div>
                        <div style="color: ${theme.text}; opacity: 0.7; font-size: ${s(11)};">
                            ${(0, helpers_1.escapeHtml)(award.issuer)} &bull; ${(0, dateUtils_1.formatLocalizedDate)(award.date, locale)}
                        </div>
                        ${award.description ? `
                            <p style="color: ${theme.text}; opacity: 0.8; font-size: ${s(12)}; line-height: 1.4;">
                                ${(0, helpers_1.formatDescription)(award.description)}
                            </p>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        </section>
    ` : '';
    const interestsSection = interests && interests.length > 0 ? `
        <section class="mb-5 resume-section">
            <h2 style="color: ${effectivePrimary}; font-family: ${headingFont}; font-size: ${s(14)}; font-weight: 700; border-bottom: 1px solid ${effectiveAccent}; padding-bottom: 4px; margin-bottom: 12px;">
                ${t.sections.interests}
            </h2>
            <p style="color: ${theme.text}; font-size: ${s(12)};">
                ${interests.map(i => (0, helpers_1.escapeHtml)(i.name)).join(' &bull; ')}
            </p>
        </section>
    ` : '';
    // Personal Details section (nationality + ID/passport/driving license)
    const hasPersonalDetails = personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber);
    const personalDetailsSection = hasPersonalDetails ? `
        <section class="mb-5 resume-section">
            <h2 style="color: ${effectivePrimary}; font-family: ${headingFont}; font-size: ${s(14)}; font-weight: 700; border-bottom: 1px solid ${effectiveAccent}; padding-bottom: 4px; margin-bottom: 12px;">
                ${t.sections.personalDetails}
            </h2>
            <div style="display: flex; flex-direction: column; gap: 4px; font-size: ${s(12)};">
                ${personalInfo.nationality ? `<div data-paginate="item"><strong>${t.labels.nationality}:</strong> ${(0, helpers_1.escapeHtml)(personalInfo.nationality)}</div>` : ''}
                ${personalInfo.idType && personalInfo.idNumber ? `<div data-paginate="item"><strong>${(0, helpers_1.formatIdType)(personalInfo.idType)}:</strong> ${(0, helpers_1.escapeHtml)(personalInfo.idNumber)}</div>` : ''}
            </div>
        </section>
    ` : '';
    // Social Links section (LinkedIn excluded — shown in header)
    const hasSocialLinks = personalInfo.x || personalInfo.github || personalInfo.dribbble || personalInfo.behance || personalInfo.instagram;
    const socialLinksSection = hasSocialLinks ? `
        <section class="mb-5 resume-section">
            <h2 style="color: ${effectivePrimary}; font-family: ${headingFont}; font-size: ${s(14)}; font-weight: 700; border-bottom: 1px solid ${effectiveAccent}; padding-bottom: 4px; margin-bottom: 12px;">
                ${t.sections.socialLinks}
            </h2>
            <div class="flex flex-wrap gap-3" style="font-size: ${s(12)};">
                ${personalInfo.x ? `<span data-paginate="item" style="color: ${theme.text};"><strong>X:</strong> ${(0, helpers_1.escapeHtml)(personalInfo.x)}</span>` : ''}
                ${personalInfo.github ? `<span data-paginate="item" style="color: ${theme.text};"><strong>GitHub:</strong> ${(0, helpers_1.escapeHtml)(personalInfo.github)}</span>` : ''}
                ${personalInfo.dribbble ? `<span data-paginate="item" style="color: ${theme.text};"><strong>Dribbble:</strong> ${(0, helpers_1.escapeHtml)(personalInfo.dribbble)}</span>` : ''}
                ${personalInfo.behance ? `<span data-paginate="item" style="color: ${theme.text};"><strong>Behance:</strong> ${(0, helpers_1.escapeHtml)(personalInfo.behance)}</span>` : ''}
                ${personalInfo.instagram ? `<span data-paginate="item" style="color: ${theme.text};"><strong>Instagram:</strong> ${(0, helpers_1.escapeHtml)(personalInfo.instagram)}</span>` : ''}
            </div>
        </section>
    ` : '';
    // Custom Fields section
    const customFieldsSection = customFields.map(field => `
        <section class="mb-5 resume-section">
            <h2 style="color: ${effectivePrimary}; font-family: ${headingFont}; font-size: ${s(14)}; font-weight: 700; border-bottom: 1px solid ${effectiveAccent}; padding-bottom: 4px; margin-bottom: 12px;">
                ${(0, helpers_1.escapeHtml)(field.label)}
            </h2>
            <p style="color: ${theme.text}; font-size: ${s(12)}; line-height: 1.5; white-space: pre-line;">
                ${(0, helpers_1.formatDescription)(field.content)}
            </p>
        </section>
    `).join('');
    return `
        <div class="w-full h-full" style="font-family: ${bodyFont}; font-size: ${sizeConfig.base}; ${bgStyle} padding: 40px;">
            <!-- Header -->
            <header class="text-center mb-6 pb-4 border-b-2" style="border-color: ${effectiveAccent};">
                ${profileImage}
                <h1 style="color: ${effectivePrimary}; font-family: ${headingFont}; font-size: ${sizeConfig.heading}; font-weight: 700; margin-bottom: 4px;">
                    ${(0, helpers_1.escapeHtml)(personalInfo.fullName || 'Your Name')}
                </h1>
                <p style="color: ${theme.secondary}; font-size: ${sizeConfig.subheading}; margin-bottom: 8px;">
                    ${(0, helpers_1.escapeHtml)(personalInfo.jobTitle || 'Job Title')}
                </p>
                <div class="flex flex-wrap justify-center gap-3" style="color: ${theme.text}; font-size: ${s(12)};">
                    ${contactHtml}
                </div>
            </header>

            ${summarySection}
            ${experienceSection}
            ${educationSection}
            ${skillsSection}
            ${languagesSection}
            ${strengthsSection}
            ${certificationsSection}
            ${awardsSection}
            ${interestsSection}
            ${personalDetailsSection}
            ${socialLinksSection}
            ${customFieldsSection}
        </div>
    `;
};
exports.renderClassicProfessional = renderClassicProfessional;
//# sourceMappingURL=classic-professional.js.map
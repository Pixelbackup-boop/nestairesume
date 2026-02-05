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
    const { personalInfo, experience = [], education = [], skills = [], languages = [], interests = [], strengths = [], certifications = [], references = [], background, fonts } = data;
    // Force white background - no background customization in builder UI
    const bgStyle = 'background-color: #ffffff;';
    const headingFont = (0, helpers_1.getFontFamily)(fonts?.heading || 'Inter');
    const bodyFont = (0, helpers_1.getFontFamily)(fonts?.body || 'Inter');
    const sizeConfig = helpers_1.fontSizes[fonts?.size || 'medium'];
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
    const idInfo = personalInfo.idType && personalInfo.idNumber ? `
        <div style="color: ${theme.text}; font-size: 11px; margin-top: 4px; opacity: 0.8;">
            ${(0, helpers_1.formatIdType)(personalInfo.idType)}: ${(0, helpers_1.escapeHtml)(personalInfo.idNumber)}
        </div>
    ` : '';
    const contactItems = [
        personalInfo.email,
        personalInfo.phone,
        personalInfo.location,
        personalInfo.nationality,
    ].filter(Boolean);
    const contactHtml = contactItems.map((item, i) => `${i > 0 ? '<span>&bull;</span>' : ''}<span>${(0, helpers_1.escapeHtml)(item)}</span>`).join('');
    const summarySection = personalInfo.summary ? `
        <section class="mb-5 resume-section">
            <h2 style="color: ${effectivePrimary}; font-family: ${headingFont}; font-size: 14px; font-weight: 700; border-bottom: 1px solid ${effectiveAccent}; padding-bottom: 4px; margin-bottom: 12px;">
                ${t.sections.summary}
            </h2>
            <p style="color: ${theme.text}; line-height: 1.5; font-size: ${sizeConfig.base};">
                ${(0, helpers_1.formatDescription)(personalInfo.summary)}
            </p>
        </section>
    ` : '';
    const experienceSection = experience.length > 0 ? `
        <section class="mb-5">
            <h2 style="color: ${effectivePrimary}; font-family: ${headingFont}; font-size: 14px; font-weight: 700; border-bottom: 1px solid ${effectiveAccent}; padding-bottom: 4px; margin-bottom: 12px;">
                ${t.sections.experience}
            </h2>
            <div class="space-y-3">
                ${experience.map(exp => `
                    <div class="resume-entry">
                        <div class="flex justify-between items-baseline">
                            <h3 style="color: ${theme.text}; font-weight: 600; font-size: ${sizeConfig.base};">
                                ${(0, helpers_1.escapeHtml)(exp.title)}
                            </h3>
                            <span style="color: ${theme.text}; opacity: 0.7; font-size: 11px;">
                                ${(0, dateUtils_1.formatLocalizedDate)(exp.startDate, locale)} – ${exp.current ? t.labels.present : (0, dateUtils_1.formatLocalizedDate)(exp.endDate, locale)}
                            </span>
                        </div>
                        <p style="color: ${theme.secondary}; font-size: 12px; margin-bottom: 4px;">
                            ${(0, helpers_1.escapeHtml)(exp.company)}${(exp.city || exp.country) ? `, ${[exp.city, exp.country].filter(Boolean).map(s => (0, helpers_1.escapeHtml)(s)).join(', ')}` : ''}
                        </p>
                        ${exp.description ? `
                            <p style="color: ${theme.text}; opacity: 0.8; font-size: 12px; line-height: 1.4;">
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
            <h2 style="color: ${effectivePrimary}; font-family: ${headingFont}; font-size: 14px; font-weight: 700; border-bottom: 1px solid ${effectiveAccent}; padding-bottom: 4px; margin-bottom: 12px;">
                ${t.sections.education}
            </h2>
            <div class="space-y-2">
                ${education.map(edu => `
                    <div class="resume-entry">
                        <div class="flex justify-between items-baseline">
                            <h3 style="color: ${theme.text}; font-weight: 600; font-size: ${sizeConfig.base};">
                                ${(0, helpers_1.escapeHtml)(edu.school)}
                            </h3>
                            <span style="color: ${theme.text}; opacity: 0.7; font-size: 11px;">
                                ${(0, dateUtils_1.formatLocalizedDate)(edu.startDate, locale)} – ${edu.current ? t.labels.present : (0, dateUtils_1.formatLocalizedDate)(edu.endDate, locale)}
                            </span>
                        </div>
                        <p style="color: ${theme.secondary}; font-size: 12px;">
                            ${(0, helpers_1.escapeHtml)(edu.degree)}
                            ${edu.gpa ? `<span style="margin-left: 8px; opacity: 0.8;">GPA: ${(0, helpers_1.escapeHtml)(edu.gpa)}</span>` : ''}
                        </p>
                        ${edu.honors ? `<p style="color: ${theme.text}; opacity: 0.7; font-size: 11px;">${(0, helpers_1.escapeHtml)(edu.honors)}</p>` : ''}
                        ${edu.clubs ? `<p style="color: ${theme.text}; opacity: 0.6; font-size: 10px;">Activities: ${(0, helpers_1.escapeHtml)(edu.clubs)}</p>` : ''}
                    </div>
                `).join('')}
            </div>
        </section>
    ` : '';
    const skillsSection = skills.length > 0 ? `
        <section class="mb-5">
            <h2 style="color: ${effectivePrimary}; font-family: ${headingFont}; font-size: 14px; font-weight: 700; border-bottom: 1px solid ${effectiveAccent}; padding-bottom: 4px; margin-bottom: 12px;">
                ${t.sections.skills}
            </h2>
            <div class="space-y-1">
                ${skills.map(skill => `
                    <div class="flex items-center gap-2 resume-entry">
                        <span style="color: ${theme.text}; font-size: 12px; min-width: 100px;">
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
            <h2 style="color: ${effectivePrimary}; font-family: ${headingFont}; font-size: 14px; font-weight: 700; border-bottom: 1px solid ${effectiveAccent}; padding-bottom: 4px; margin-bottom: 12px;">
                ${t.sections.languages}
            </h2>
            <div class="space-y-1">
                ${languages.map(lang => `
                    <div class="flex items-center justify-between resume-entry">
                        <span style="color: ${theme.text}; font-size: 12px;">${(0, helpers_1.escapeHtml)(lang.name)}</span>
                        <div class="flex items-center gap-2">
                            <div style="width: 80px; height: 6px; background-color: ${effectivePrimary}30; border-radius: 3px; overflow: hidden;">
                                <div style="width: ${(0, helpers_1.getLanguageLevel)(lang)}%; height: 100%; background-color: ${effectivePrimary};"></div>
                            </div>
                            <span style="color: ${theme.text}; opacity: 0.7; font-size: 10px; text-transform: capitalize;">
                                ${(0, helpers_1.escapeHtml)(lang.proficiency)}
                            </span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>
    ` : '';
    const strengthsSection = strengths && strengths.length > 0 ? `
        <section class="mb-5">
            <h2 style="color: ${effectivePrimary}; font-family: ${headingFont}; font-size: 14px; font-weight: 700; border-bottom: 1px solid ${effectiveAccent}; padding-bottom: 4px; margin-bottom: 12px;">
                ${t.sections.strengths}
            </h2>
            <div class="flex flex-wrap gap-1">
                ${strengths.map(strength => `
                    <span class="resume-entry" style="background-color: ${effectivePrimary}15; color: ${effectivePrimary}; padding: 4px 10px; border-radius: 4px; font-size: 11px;">
                        ${(0, helpers_1.escapeHtml)(strength.name)}
                    </span>
                `).join('')}
            </div>
        </section>
    ` : '';
    const certificationsSection = certifications && certifications.length > 0 ? `
        <section class="mb-5">
            <h2 style="color: ${effectivePrimary}; font-family: ${headingFont}; font-size: 14px; font-weight: 700; border-bottom: 1px solid ${effectiveAccent}; padding-bottom: 4px; margin-bottom: 12px;">
                ${t.sections.certifications}
            </h2>
            <div class="space-y-1">
                ${certifications.map(cert => `
                    <div class="resume-entry">
                        <span style="color: ${theme.text}; font-weight: 500; font-size: 12px;">${(0, helpers_1.escapeHtml)(cert.name)}</span>
                        <span style="color: ${theme.text}; opacity: 0.7; font-size: 11px; margin-left: 8px;">
                            ${(0, helpers_1.escapeHtml)(cert.issuer)} &bull; ${(0, dateUtils_1.formatLocalizedDate)(cert.date, locale)}
                        </span>
                    </div>
                `).join('')}
            </div>
        </section>
    ` : '';
    const interestsSection = interests && interests.length > 0 ? `
        <section>
            <h2 style="color: ${effectivePrimary}; font-family: ${headingFont}; font-size: 14px; font-weight: 700; border-bottom: 1px solid ${effectiveAccent}; padding-bottom: 4px; margin-bottom: 12px;">
                ${t.sections.interests}
            </h2>
            <p style="color: ${theme.text}; font-size: 12px;">
                ${interests.map(i => (0, helpers_1.escapeHtml)(i.name)).join(' &bull; ')}
            </p>
        </section>
    ` : '';
    // Social Links section
    const hasSocialLinks = personalInfo.linkedin || personalInfo.twitter || personalInfo.github || personalInfo.dribbble || personalInfo.behance || personalInfo.instagram;
    const socialLinksSection = hasSocialLinks ? `
        <section class="mb-5">
            <h2 style="color: ${effectivePrimary}; font-family: ${headingFont}; font-size: 14px; font-weight: 700; border-bottom: 1px solid ${effectiveAccent}; padding-bottom: 4px; margin-bottom: 12px;">
                ${t.sections.socialLinks}
            </h2>
            <div class="flex flex-wrap gap-3" style="font-size: 12px;">
                ${personalInfo.linkedin ? `<span style="color: ${theme.text};"><strong>LinkedIn:</strong> ${(0, helpers_1.escapeHtml)(personalInfo.linkedin)}</span>` : ''}
                ${personalInfo.twitter ? `<span style="color: ${theme.text};"><strong>Twitter:</strong> ${(0, helpers_1.escapeHtml)(personalInfo.twitter)}</span>` : ''}
                ${personalInfo.github ? `<span style="color: ${theme.text};"><strong>GitHub:</strong> ${(0, helpers_1.escapeHtml)(personalInfo.github)}</span>` : ''}
                ${personalInfo.dribbble ? `<span style="color: ${theme.text};"><strong>Dribbble:</strong> ${(0, helpers_1.escapeHtml)(personalInfo.dribbble)}</span>` : ''}
                ${personalInfo.behance ? `<span style="color: ${theme.text};"><strong>Behance:</strong> ${(0, helpers_1.escapeHtml)(personalInfo.behance)}</span>` : ''}
                ${personalInfo.instagram ? `<span style="color: ${theme.text};"><strong>Instagram:</strong> ${(0, helpers_1.escapeHtml)(personalInfo.instagram)}</span>` : ''}
            </div>
        </section>
    ` : '';
    // References section
    const referencesSection = references && references.length > 0 ? `
        <section class="mb-5">
            <h2 style="color: ${effectivePrimary}; font-family: ${headingFont}; font-size: 14px; font-weight: 700; border-bottom: 1px solid ${effectiveAccent}; padding-bottom: 4px; margin-bottom: 12px;">
                ${t.sections.references}
            </h2>
            <div class="space-y-2">
                ${references.map(ref => `
                    <div>
                        <div style="color: ${theme.text}; font-weight: 600; font-size: ${sizeConfig.base};">
                            ${(0, helpers_1.escapeHtml)(ref.name)}
                        </div>
                        <div style="color: ${theme.secondary}; font-size: 12px;">
                            ${(0, helpers_1.escapeHtml)(ref.title)}${ref.company ? `, ${(0, helpers_1.escapeHtml)(ref.company)}` : ''}
                        </div>
                        ${(ref.phone || ref.email) ? `
                            <div style="color: ${theme.text}; opacity: 0.7; font-size: 11px;">
                                ${ref.phone ? `<span>${(0, helpers_1.escapeHtml)(ref.phone)}</span>` : ''}
                                ${ref.phone && ref.email ? '<span> &bull; </span>' : ''}
                                ${ref.email ? `<span>${(0, helpers_1.escapeHtml)(ref.email)}</span>` : ''}
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        </section>
    ` : '';
    // Custom Field section
    const customFieldSection = personalInfo.customField ? `
        <section class="mb-5">
            <h2 style="color: ${effectivePrimary}; font-family: ${headingFont}; font-size: 14px; font-weight: 700; border-bottom: 1px solid ${effectiveAccent}; padding-bottom: 4px; margin-bottom: 12px;">
                ${(0, helpers_1.escapeHtml)(personalInfo.customFieldLabel || t.sections.additionalInfo)}
            </h2>
            <p style="color: ${theme.text}; font-size: 12px; line-height: 1.5; white-space: pre-line;">
                ${(0, helpers_1.formatDescription)(personalInfo.customField)}
            </p>
        </section>
    ` : '';
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
                <div class="flex flex-wrap justify-center gap-3" style="color: ${theme.text}; font-size: 12px;">
                    ${contactHtml}
                </div>
                ${idInfo}
            </header>

            ${summarySection}
            ${experienceSection}
            ${educationSection}
            ${skillsSection}
            ${languagesSection}
            ${strengthsSection}
            ${certificationsSection}
            ${interestsSection}
            ${socialLinksSection}
            ${referencesSection}
            ${customFieldSection}
        </div>
    `;
};
exports.renderClassicProfessional = renderClassicProfessional;
//# sourceMappingURL=classic-professional.js.map
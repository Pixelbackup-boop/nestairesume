"use strict";
/**
 * Header Diagonal Yellow Template
 * Ported from frontend/components/templates/layouts/header/HeaderDiagonalYellow.tsx
 *
 * Layout matches frontend:
 * - Header: Dark background (#18181b) with yellow diagonal on top-right
 * - Photo: Circular, centered at ~60%, overlapping header bottom
 * - Contact: Top-right on yellow diagonal area
 * - Body: 55/45 two-column split
 * - Left: About Me, Experience
 * - Right: Education, Skills, Strengths, Interests, Credentials, Languages
 * - Footer: Yellow diagonal at bottom-left (fixed on every page)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderHeaderDiagonalYellow = void 0;
const helpers_1 = require("./shared/helpers");
const translations_1 = require("./shared/translations");
const dateUtils_1 = require("./shared/dateUtils");
const renderHeaderDiagonalYellow = (data, theme, translations, locale = 'en') => {
    const t = (0, translations_1.getTranslations)(translations);
    const { personalInfo, experience = [], education = [], skills = [], languages = [], interests = [], strengths = [], certifications = [], awards = [], customFields = [], fonts } = data;
    const headingFont = (0, helpers_1.getFontFamily)(fonts?.heading || 'Titan One');
    const bodyFont = (0, helpers_1.getFontFamily)(fonts?.body || 'Inter');
    const sizeConfig = helpers_1.fontSizes[fonts?.size || 'medium'];
    // Font Scaling
    const scale = (0, helpers_1.getFontScale)(fonts?.size);
    const s = (px) => `${Math.max(5, Math.round(px * scale))}px`;
    const sNum = (px) => Math.max(5, Math.round(px * scale));
    const fs = {
        name: s(32),
        jobTitle: s(14),
        sectionHeading: s(14),
        entryTitle: s(12),
        body: s(11),
        small: s(10),
        tiny: s(9)
    };
    // Colors matching frontend
    const darkBg = '#18181b';
    const accentColor = theme.primary || '#facc15';
    const textColor = '#3f3f46';
    // Simple section header matching frontend
    const SectionHeader = (title) => `
        <h3 style="font-size: ${fs.sectionHeading}; font-weight: 900; color: #18181b; text-transform: uppercase; margin-bottom: 12px; letter-spacing: 0.05em;">
            ${title}
        </h3>
    `;
    // Progress bar for skills - matches frontend ProgressBar component
    const ProgressBar = (label, value) => `
        <div style="margin-bottom: 8px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
                <span style="font-size: ${fs.small}; font-weight: 700; color: #18181b;">${(0, helpers_1.escapeHtml)(label)}</span>
            </div>
            <div style="width: 100%; height: 10px; background-color: #e4e4e7; border-radius: 4px;">
                <div style="width: ${value}%; height: 100%; background-color: ${accentColor}; border-radius: 4px;"></div>
            </div>
        </div>
    `;
    // Profile Image - circular, positioned to overlap header bottom
    const profileImage = personalInfo.profileImage ? `
        <img
            src="${personalInfo.profileImage}"
            alt="${(0, helpers_1.escapeHtml)(personalInfo.fullName)}"
            style="position: absolute; bottom: -75px; left: 60%; transform: translateX(-50%); width: 150px; height: 150px; border-radius: 50%; border: 5px solid #ffffff; object-fit: cover; z-index: 20;"
        />
    ` : '';
    // About Me section
    const aboutMeHtml = personalInfo.summary ? `
        <div style="margin-bottom: 24px;">
            ${SectionHeader(t.sections.profile)}
            <p style="line-height: 1.6; font-size: ${fs.body}; color: ${textColor};">
                ${(0, helpers_1.formatDescription)(personalInfo.summary)}
            </p>
        </div>
    ` : '';
    // Experience section - matches frontend space-y-4 (16px gap)
    const experienceHtml = experience.length > 0 ? `
        <div style="margin-bottom: 24px;">
            ${SectionHeader(t.sections.experience)}
            <div style="display: flex; flex-direction: column; gap: 16px;">
                ${experience.map(exp => `
                    <div data-paginate="item">
                        <h4 style="font-size: ${fs.entryTitle}; font-weight: 800; color: #18181b; text-transform: uppercase;">
                            ${(0, helpers_1.escapeHtml)(exp.title)}
                        </h4>
                        <div style="display: flex; justify-content: space-between; font-size: ${fs.small}; color: #52525b; margin-bottom: 4px; font-weight: 600;">
                            <span>${(0, helpers_1.escapeHtml)(exp.company)}${(exp.city || exp.country) ? `, ${(0, helpers_1.escapeHtml)([exp.city, exp.country].filter(Boolean).join(', '))}` : ''}</span>
                            <span>${(0, dateUtils_1.formatLocalizedDate)(exp.startDate, locale)} - ${exp.current ? t.labels.present : (0, dateUtils_1.formatLocalizedDate)(exp.endDate, locale)}</span>
                        </div>
                        ${exp.description ? `
                            <div style="font-size: ${fs.body}; line-height: 1.5; color: ${textColor};">
                                ${(0, helpers_1.formatDescription)(exp.description)}
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        </div>
    ` : '';
    // Education section - matches frontend space-y-4 (16px gap)
    const educationHtml = education.length > 0 ? `
        <div style="margin-bottom: 24px;">
            ${SectionHeader(t.sections.education)}
            <div style="display: flex; flex-direction: column; gap: 16px;">
                ${education.map(edu => `
                    <div data-paginate="item">
                        <h4 style="font-size: ${fs.entryTitle}; font-weight: 800; color: #18181b; text-transform: uppercase;">
                            ${(0, helpers_1.escapeHtml)(edu.degree)}
                            ${edu.gpa ? `<span style="margin-left: 8px; opacity: 0.8; font-weight: 600; text-transform: none;">GPA: ${(0, helpers_1.escapeHtml)(edu.gpa)}</span>` : ''}
                        </h4>
                        <div style="font-size: ${fs.small}; color: #52525b; font-weight: 600;">
                            ${(0, helpers_1.escapeHtml)(edu.school)}${(edu.city || edu.country) ? `, ${(0, helpers_1.escapeHtml)([edu.city, edu.country].filter(Boolean).join(', '))}` : ''} | ${(0, dateUtils_1.formatLocalizedDate)(edu.startDate, locale)} - ${edu.current ? t.labels.present : (0, dateUtils_1.formatLocalizedDate)(edu.endDate, locale)}
                        </div>
                        ${edu.honors ? `<p style="font-size: ${s(11)}; color: #4b5563; opacity: 0.8; margin: 0;">${(0, helpers_1.escapeHtml)(edu.honors)}</p>` : ''}
                        ${edu.clubs ? `<p style="font-size: ${s(10)}; color: #6b7280; opacity: 0.7; margin: 0;">Activities: ${(0, helpers_1.escapeHtml)(edu.clubs)}</p>` : ''}

                        ${edu.description ? `<p style="font-size: ${s(12)}; line-height: 1.6; color: #4b5563; margin-top: 4px;">${(0, helpers_1.formatDescription)(edu.description)}</p>` : ''}
                    </div>
                `).join('')}
            </div>
        </div>
    ` : '';
    // Skills section with progress bars
    const skillsHtml = skills.length > 0 ? `
        <div style="margin-bottom: 24px;">
            ${SectionHeader(t.sections.skills)}
            <div>
                ${skills.map(skill => `
                    <div data-paginate="item">
                        ${ProgressBar(skill.name, (skill.level || 3) * 20)}
                    </div>
                `).join('')}
            </div>
        </div>
    ` : '';
    // Strengths (tags/badges) - matches frontend fs.small (10px)
    const strengthsHtml = strengths && strengths.length > 0 ? `
        <div style="margin-bottom: 24px;">
            ${SectionHeader(t.sections.strengths)}
            <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                ${strengths.map(str => `
                    <span data-paginate="item" style="background-color: ${accentColor}; color: #18181b; padding: 4px 12px; border-radius: 4px; font-size: ${fs.small}; font-weight: 600;">
                        ${(0, helpers_1.escapeHtml)(str.name)}
                    </span>
                `).join('')}
            </div>
        </div>
    ` : '';
    // Interests - matches frontend fs.body (11px)
    const interestsHtml = interests && interests.length > 0 ? `
        <div style="margin-bottom: 24px;">
            ${SectionHeader(t.sections.interests)}
            <div style="display: flex; flex-wrap: wrap; gap: 8px 16px;">
                ${interests.map(int => `
                    <span data-paginate="item" style="font-size: ${fs.body}; font-weight: 500; display: inline-flex; align-items: center; gap: 4px;">
                        ${(0, helpers_1.getIconSVG)('star', accentColor, sNum(10), true)} ${(0, helpers_1.escapeHtml)(int.name)}
                    </span>
                `).join('')}
            </div>
        </div>
    ` : '';
    // Credentials (Certifications & Awards) - matches frontend fs.small (10px) for sub-headers, fs.body (11px) for names
    const credentialsHtml = (certifications && certifications.length > 0) || (awards && awards.length > 0) ? `
        <div style="margin-bottom: 24px;">
            ${SectionHeader(t.sections.credentials)}
            ${certifications && certifications.length > 0 ? `
                <div style="margin-bottom: ${awards && awards.length > 0 ? '16px' : '0'};">
                    <h4 style="font-size: ${fs.small}; font-weight: 600; color: #52525b; margin-bottom: 8px;">${t.sections.certifications}</h4>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        ${certifications.map(cert => `
                            <div data-paginate="item">
                                <div style="font-weight: 600; font-size: ${fs.body}; color: #18181b;">${(0, helpers_1.escapeHtml)(cert.name)}</div>
                                <div style="font-size: ${fs.small}; color: #52525b;">${(0, helpers_1.escapeHtml)(cert.issuer)} • ${(0, dateUtils_1.formatLocalizedDate)(cert.date, locale)}</div>
                                ${cert.url ? `<div style="font-size: ${s(10)}; color: #6b7280; opacity: 0.7;">${(0, helpers_1.escapeHtml)(cert.url)}</div>` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
            ${awards && awards.length > 0 ? `
                <div>
                    <h4 style="font-size: ${fs.small}; font-weight: 600; color: #52525b; margin-bottom: 8px;">${t.sections.awards}</h4>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        ${awards.map(award => `
                            <div data-paginate="item">
                                <div style="font-weight: 600; font-size: ${fs.body}; color: #18181b;">${(0, helpers_1.escapeHtml)(award.title)}</div>
                                <div style="font-size: ${fs.small}; color: #52525b;">${(0, helpers_1.escapeHtml)(award.issuer)} • ${(0, dateUtils_1.formatLocalizedDate)(award.date, locale)}</div>
                            
                                ${award.description ? `<p style="font-size: ${s(11)}; line-height: 1.5; color: #4b5563; margin-top: 2px;">${(0, helpers_1.formatDescription)(award.description)}</p>` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
        </div>
    ` : '';
    // Languages
    const languagesHtml = languages && languages.length > 0 ? `
        <div style="margin-bottom: 24px;">
            ${SectionHeader(t.sections.languages)}
            <div style="display: flex; flex-direction: column;">
                ${languages.map(lang => `
                    <div data-paginate="item" style="display: flex; justify-content: space-between; margin-bottom: 4px; font-size: ${fs.body}; font-weight: 600; border-bottom: 1px solid #e4e4e7; padding-bottom: 2px;">
                        <span>${(0, helpers_1.escapeHtml)(lang.name)}</span>
                        <span style="color: #52525b;">${(0, helpers_1.escapeHtml)(lang.proficiency || '')}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    ` : '';
    // Social Links
    const hasSocialLinks = personalInfo.x || personalInfo.github || personalInfo.dribbble || personalInfo.behance || personalInfo.instagram;
    const socialLinksHtml = hasSocialLinks ? `
        <div style="margin-bottom: 24px;">
            ${SectionHeader(t.sections.socialLinks)}
            <div style="display: flex; flex-direction: column; gap: 4px; font-size: ${fs.body};">
                ${personalInfo.x ? `<div data-paginate="item"><strong>X:</strong> ${(0, helpers_1.escapeHtml)(personalInfo.x)}</div>` : ''}
                ${personalInfo.github ? `<div data-paginate="item"><strong>GitHub:</strong> ${(0, helpers_1.escapeHtml)(personalInfo.github)}</div>` : ''}
                ${personalInfo.dribbble ? `<div data-paginate="item"><strong>Dribbble:</strong> ${(0, helpers_1.escapeHtml)(personalInfo.dribbble)}</div>` : ''}
                ${personalInfo.behance ? `<div data-paginate="item"><strong>Behance:</strong> ${(0, helpers_1.escapeHtml)(personalInfo.behance)}</div>` : ''}
                ${personalInfo.instagram ? `<div data-paginate="item"><strong>Instagram:</strong> ${(0, helpers_1.escapeHtml)(personalInfo.instagram)}</div>` : ''}
            </div>
        </div>
    ` : '';
    // Personal Details (Nationality, ID) - matches frontend
    const formatIdType = (idType) => {
        switch (idType) {
            case 'id': return 'ID';
            case 'passport': return 'Passport';
            case 'driving_license': return 'Driving License';
            default: return 'ID';
        }
    };
    const hasPersonalDetails = personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber);
    const personalDetailsHtml = hasPersonalDetails ? `
        <div style="margin-bottom: 24px;">
            ${SectionHeader(t.sections.personalDetails)}
            <div style="display: flex; flex-direction: column; gap: 4px; font-size: ${fs.body};">
                ${personalInfo.nationality ? `<div data-paginate="item"><strong>Nationality:</strong> ${(0, helpers_1.escapeHtml)(personalInfo.nationality)}</div>` : ''}
                ${personalInfo.idType && personalInfo.idNumber ? `<div data-paginate="item"><strong>${formatIdType(personalInfo.idType)}:</strong> ${(0, helpers_1.escapeHtml)(personalInfo.idNumber)}</div>` : ''}
            </div>
        </div>
    ` : '';
    // Custom Fields
    const customFieldsHtml = customFields.map(field => `
        <div style="margin-bottom: 24px;">
            ${SectionHeader(field.label)}
            <p style="font-size: ${fs.body}; line-height: 1.6;">${(0, helpers_1.formatDescription)(field.content)}</p>
        </div>
    `).join('');
    // Contact items for header - matches frontend fs.small (10px)
    const contactHtml = `
        <div style="text-align: right; font-size: ${fs.small}; color: #18181b; font-weight: 600; z-index: 10;">
            ${personalInfo.phone ? `<div style="margin-bottom: 4px;">${(0, helpers_1.escapeHtml)(personalInfo.phone)}</div>` : ''}
            ${personalInfo.email ? `<div style="margin-bottom: 4px;">${(0, helpers_1.escapeHtml)(personalInfo.email)}</div>` : ''}
            ${personalInfo.location ? `<div style="margin-bottom: 4px;">${(0, helpers_1.escapeHtml)(personalInfo.location)}</div>` : ''}
            ${personalInfo.website ? `<div style="margin-bottom: 4px;">${(0, helpers_1.escapeHtml)(personalInfo.website)}</div>` : ''}
            ${personalInfo.linkedin ? `<div>${(0, helpers_1.escapeHtml)(personalInfo.linkedin)}</div>` : ''}
        </div>
    `;
    // HTML Construction
    return `
        <div style="width: 100%; min-height: 100%; font-family: ${bodyFont}; color: ${textColor}; background-color: #ffffff; position: relative;">

            <!-- Header Area -->
            <div style="height: 220px; background-color: ${darkBg}; position: relative; margin-bottom: 80px;">

                <!-- Yellow Diagonal Shape Top-Right -->
                <div style="position: absolute; top: 0; right: 0; width: 35%; height: 100%; background-color: ${accentColor}; clip-path: polygon(30% 0, 100% 0, 100% 100%, 0% 100%); -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important;"></div>

                <!-- Header Content -->
                <div style="padding: 40px; display: flex; justify-content: space-between; align-items: flex-start; height: 100%; position: relative; z-index: 10;">

                    <!-- Name - Left side -->
                    <div style="width: 60%; padding-top: 20px;">
                        <h1 style="font-family: ${headingFont}; font-size: ${fs.name}; font-weight: 400; color: #ffffff; text-transform: uppercase; line-height: 1.1; margin: 0 0 16px 0;">
                            ${(0, helpers_1.escapeHtml)(personalInfo.fullName)}
                        </h1>
                        <p style="font-size: ${fs.jobTitle}; color: ${accentColor}; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700; margin: 0;">
                            ${(0, helpers_1.escapeHtml)(personalInfo.jobTitle)}
                        </p>
                    </div>

                    <!-- Contact - Top Right (on Yellow) -->
                    <div style="width: 30%;">
                        ${contactHtml}
                    </div>
                </div>

                <!-- Photo - Centered overlapping bottom edge -->
                ${profileImage}
            </div>

            <!-- Two Column Layout - 55/45 split matching frontend -->
            <div style="display: flex; padding: 0 40px 40px; gap: 30px;">

                <!-- Left Column (55%) - About Me, Experience, Education -->
                <div style="width: 55%;">
                    ${aboutMeHtml}
                    ${experienceHtml}
                    ${educationHtml}
                    ${personalDetailsHtml}
                </div>

                <!-- Right Column (45%) - Skills, Strengths, Interests, Languages, Credentials, Social Links, Personal Details, Custom Field -->
                <div style="width: 45%;">
                    ${skillsHtml}
                    ${strengthsHtml}
                    ${interestsHtml}
                    ${languagesHtml}
                    ${credentialsHtml}
                    ${socialLinksHtml}
                    ${customFieldsHtml}
                </div>
            </div>
        </div>
    `;
};
exports.renderHeaderDiagonalYellow = renderHeaderDiagonalYellow;
//# sourceMappingURL=header-diagonal-yellow.js.map
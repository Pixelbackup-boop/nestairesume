"use strict";
/**
 * Header Dark Box Template
 * Ported from frontend/components/templates/layouts/header/HeaderDarkBox.tsx
 *
 * Distinctive bordered box containing only the name, with contact info beside it.
 * Dual-color schema: primary = box border color, secondary = accent highlights.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderHeaderDarkBox = void 0;
const translations_1 = require("./shared/translations");
const helpers_1 = require("./shared/helpers");
const dateUtils_1 = require("./shared/dateUtils");
// Note: getBackgroundCSS removed - header-dark-box always uses white body background
// Helper function to convert proficiency string to percentage
function getLanguageLevelPercent(proficiency) {
    const prof = proficiency?.toLowerCase() || '';
    if (prof.includes('native') || prof === 'native')
        return 100;
    if (prof.includes('fluent') || prof === 'fluent')
        return 95;
    if (prof.includes('advanced') || prof === 'advanced')
        return 80;
    if (prof.includes('intermediate') || prof === 'intermediate')
        return 60;
    if (prof.includes('basic') || prof === 'basic')
        return 40;
    return 50; // default
}
const renderHeaderDarkBox = (data, theme, translations, locale = 'en') => {
    const t = (0, translations_1.getTranslations)(translations);
    const { personalInfo, experience = [], education = [], skills = [], languages = [], strengths = [], interests = [], certifications = [], awards = [], customFields = [], fonts } = data;
    // Note: 'background' not destructured - this template always uses white body
    const headingFont = (0, helpers_1.getFontFamily)(fonts?.heading || 'Inter');
    const bodyFont = (0, helpers_1.getFontFamily)(fonts?.body || 'Inter');
    // Font Scaling
    const scale = (0, helpers_1.getFontScale)(fonts?.size);
    const s = (px) => `${Math.max(5, Math.round(px * scale))}px`;
    const sNum = (px) => Math.max(5, Math.round(px * scale));
    const fs = {
        name: '28px', // Fixed - header name box doesn't scale
        sectionHeading: s(14),
        entryTitle: s(12), // 12px matches frontend
        body: s(11), // 11px matches frontend
        small: s(10), // 10px matches frontend
    };
    // Parse dual color: primary = box BORDER, secondary = accent highlights
    // This makes both colors visually distinct in the template
    const { primary: boxBorderColor, secondary: accentColor } = (0, helpers_1.parseDualColor)(data.customThemeColor, { primary: '#2563eb', secondary: '#facc15' } // Blue border, Yellow accents by default
    );
    // Helper for Section Headers with Icon
    const SectionHeader = (title, icon) => `
        <h3 style="font-family: ${headingFont}; font-size: ${fs.sectionHeading}; font-weight: 700; color: ${accentColor}; margin-bottom: 14px; display: flex; align-items: center; gap: 8px;">
            <span style="font-size: ${fs.sectionHeading};">${icon}</span>
            ${title}
        </h3>
    `;
    // Circular progress for skills
    const circleTextSize = s(12);
    const circleLabelSize = s(11);
    const CircularProgress = (value, label) => {
        const radius = 32;
        const circumference = 2 * Math.PI * radius;
        const strokeDashoffset = circumference - (value / 100) * circumference;
        return `
            <div style="display: flex; flex-direction: column; align-items: center;">
                <svg width="80" height="80" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r="${radius}" fill="none" stroke="#e5e7eb" stroke-width="8"/>
                    <circle cx="40" cy="40" r="${radius}" fill="none" stroke="${accentColor}" stroke-width="8"
                        stroke-dasharray="${circumference}" stroke-dashoffset="${strokeDashoffset}"
                        transform="rotate(-90 40 40)" stroke-linecap="round"/>
                    <text x="40" y="45" text-anchor="middle" font-size="${circleTextSize}" fill="#374151" font-weight="600">${value}%</text>
                </svg>
                <span style="font-size: ${circleLabelSize}; color: #374151; margin-top: 4px; text-align: center; max-width: 80px;">${(0, helpers_1.escapeHtml)(label)}</span>
            </div>
        `;
    };
    // Progress bar for expertise with level
    const ProgressBar = (label, value) => `
        <div style="margin-bottom: 12px;">
            <div style="font-size: ${fs.body}; font-weight: 500; color: #374151; margin-bottom: 4px;">${(0, helpers_1.escapeHtml)(label)}</div>
            <div style="width: 100%; height: 10px; background-color: #e5e7eb; border-radius: 2px;">
                <div style="width: ${value}%; height: 100%; background-color: ${accentColor}; border-radius: 2px;"></div>
            </div>
        </div>
    `;
    // Profile Avatar - Shows image or initials placeholder
    const getInitials = (name) => {
        const parts = (name || 'YN').trim().split(/\s+/);
        if (parts.length === 1) {
            return parts[0].substring(0, 2).toUpperCase();
        }
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    };
    const ProfileAvatar = (profileImage, fullName, size = 120) => {
        const initials = getInitials(fullName);
        const fontSize = Math.round(size * 0.4);
        if (profileImage) {
            return `
                <div style="width: ${size}px; height: ${size}px; border-radius: 50%; overflow: hidden; border: 3px solid ${accentColor}; flex-shrink: 0;">
                    <img src="${(0, helpers_1.escapeHtml)(profileImage)}" alt="${(0, helpers_1.escapeHtml)(fullName)}" style="width: 100%; height: 100%; object-fit: cover;" />
                </div>
            `;
        }
        // Placeholder with initials
        return `
            <div style="width: ${size}px; height: ${size}px; border-radius: 50%; background-color: #e5e7eb; border: 3px solid ${accentColor}; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                <span style="font-family: ${headingFont}; font-size: ${fontSize}px; font-weight: 700; color: ${accentColor};">
                    ${initials}
                </span>
            </div>
        `;
    };
    return `
        <div style="width: 100%; min-height: 100%; font-family: ${bodyFont}; font-size: ${fs.body}; background-color: #ffffff; padding: 40px; box-sizing: border-box;">

            <!-- Header Area -->
            <header style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 48px;">

                <!-- Profile Avatar - Circle with image or initials -->
                ${ProfileAvatar(personalInfo.profileImage, personalInfo.fullName || 'Your Name', 120)}

                <!-- Name + Job Title -->
                <div style="text-align: center;">
                    <h1 style="font-family: ${headingFont}; font-size: ${fs.name}; font-weight: 900; color: #1f2937; letter-spacing: 0.05em; text-transform: uppercase; margin: 0; line-height: 1;">
                        ${(0, helpers_1.escapeHtml)(personalInfo.fullName || 'Your Name')}
                    </h1>
                    ${personalInfo.jobTitle ? `
                        <p style="font-family: ${bodyFont}; font-size: ${fs.body}; color: #6b7280; font-weight: 500; margin: 8px 0 0 0;">
                            ${(0, helpers_1.escapeHtml)(personalInfo.jobTitle)}
                        </p>
                    ` : ''}
                </div>

                <!-- Contact Info - Right Aligned -->
                <div style="text-align: right; font-size: ${fs.body}; color: #374151; line-height: 1.8; padding-top: 10px;">
                    ${personalInfo.phone ? `<div><strong>Phone:</strong> ${(0, helpers_1.escapeHtml)(personalInfo.phone)}</div>` : ''}
                    ${personalInfo.email ? `<div><strong>Email:</strong> ${(0, helpers_1.escapeHtml)(personalInfo.email)}</div>` : ''}
                    ${personalInfo.location ? `<div><strong>Location:</strong> ${(0, helpers_1.escapeHtml)(personalInfo.location)}</div>` : ''}
                    ${personalInfo.website ? `<div><strong>Web:</strong> ${(0, helpers_1.escapeHtml)(personalInfo.website)}</div>` : ''}
                    ${personalInfo.linkedin ? `<div><strong>LinkedIn:</strong> ${(0, helpers_1.escapeHtml)(personalInfo.linkedin)}</div>` : ''}
                </div>
            </header>

            <!-- Two-Column Body -->
            <div style="display: flex; gap: 48px;">

                <!-- LEFT COLUMN -->
                <div style="width: 60%;">

                    <!-- Profile / Summary -->
                    ${personalInfo.summary ? `
                        <section class="resume-section" style="margin-bottom: 24px;">
                            ${SectionHeader(t.sections.profile, (0, helpers_1.getIconSVG)('user', accentColor, sNum(16)))}
                            <p style="color: #374151; line-height: 1.6; font-size: ${fs.body};">
                                ${(0, helpers_1.formatDescription)(personalInfo.summary)}
                            </p>
                        </section>
                    ` : ''}

                    <!-- Work Experience -->
                    ${experience.length > 0 ? `
                        <section class="resume-section" style="margin-bottom: 24px;">
                            ${SectionHeader(t.sections.experience, (0, helpers_1.getIconSVG)('briefcase', accentColor, sNum(16)))}
                            <div style="display: flex; flex-direction: column; gap: 20px;">
                                ${experience.map(exp => `
                                    <div data-paginate="item">
                                        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
                                            <h4 style="font-weight: 800; font-size: ${fs.entryTitle}; color: #1f2937;">
                                                ${(0, helpers_1.escapeHtml)(exp.title)}
                                            </h4>
                                            <span style="font-size: ${fs.small}; color: #6b7280; font-weight: 500;">
                                                ${(0, dateUtils_1.formatLocalizedDate)(exp.startDate, locale)} – ${exp.current ? t.labels.present : (0, dateUtils_1.formatLocalizedDate)(exp.endDate, locale)}
                                            </span>
                                        </div>
                                        <p style="font-size: ${fs.body}; color: ${accentColor}; font-weight: 700; margin-bottom: 6px; text-transform: uppercase;">
                                            ${(0, helpers_1.escapeHtml)(exp.company)} ${(exp.city || exp.country) ? `| ${(0, helpers_1.escapeHtml)([exp.city, exp.country].filter(Boolean).join(', '))}` : ''}
                                        </p>
                                        ${exp.description ? `
                                            <p style="font-size: ${fs.body}; color: #4b5563; line-height: 1.5;">
                                                ${(0, helpers_1.formatDescription)(exp.description)}
                                            </p>
                                        ` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Education (Left Column) -->
                    ${education.length > 0 ? `
                        <section class="resume-section" style="margin-bottom: 24px;">
                            ${SectionHeader(t.sections.education, (0, helpers_1.getIconSVG)('graduation-cap', accentColor, sNum(16)))}
                            <div style="display: flex; flex-direction: column; gap: 16px;">
                                ${education.slice(0, 2).map(edu => `
                                    <div data-paginate="item">
                                        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
                                            <h4 style="font-weight: 800; font-size: ${fs.entryTitle}; color: #1f2937;">
                                                ${(0, helpers_1.escapeHtml)(edu.degree)}
                                                ${edu.gpa ? `<span style="margin-left: 8px; opacity: 0.8; font-weight: 500;">GPA: ${(0, helpers_1.escapeHtml)(edu.gpa)}</span>` : ''}
                                            </h4>
                                            <span style="font-size: ${fs.small}; color: #6b7280; font-weight: 500;">
                                                ${(0, dateUtils_1.formatLocalizedDate)(edu.startDate, locale)} – ${edu.endDate ? (0, dateUtils_1.formatLocalizedDate)(edu.endDate, locale) : t.labels.present}
                                            </span>
                                        </div>
                                        <p style="font-size: ${fs.body}; color: ${accentColor}; font-weight: 700;">
                                            ${(0, helpers_1.escapeHtml)(edu.school)} ${(edu.city || edu.country) ? `| ${(0, helpers_1.escapeHtml)([edu.city, edu.country].filter(Boolean).join(', '))}` : ''}
                                        </p>
                                        ${edu.honors ? `<p style="font-size: ${s(11)}; color: #4b5563; opacity: 0.8; margin: 0;">${(0, helpers_1.escapeHtml)(edu.honors)}</p>` : ''}
                                        ${edu.clubs ? `<p style="font-size: ${s(10)}; color: #6b7280; opacity: 0.7; margin: 0;">Activities: ${(0, helpers_1.escapeHtml)(edu.clubs)}</p>` : ''}
                                        ${edu.description ? `<p style="font-size: ${fs.small}; line-height: 1.6; color: #4b5563; margin-top: 4px;">${(0, helpers_1.formatDescription)(edu.description)}</p>` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Personal Details -->
                    ${personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber) ? `
                        <section class="resume-section" style="margin-bottom: 24px;">
                            ${SectionHeader(t.sections.personalDetails, (0, helpers_1.getIconSVG)('id-card', accentColor, sNum(16)))}
                            <div style="display: flex; flex-direction: column; gap: 8px; font-size: ${fs.body};">
                                ${personalInfo.nationality ? `
                                    <div><span style="font-weight: 600; color: #111827;">Nationality:</span> <span style="color: #374151;">${(0, helpers_1.escapeHtml)(personalInfo.nationality)}</span></div>
                                ` : ''}
                                ${personalInfo.idType && personalInfo.idNumber ? `
                                    <div>
                                        <span style="font-weight: 600; color: #111827;">
                                            ${personalInfo.idType === 'id' ? 'ID' : personalInfo.idType === 'passport' ? 'Passport' : 'Driving License'}:
                                        </span> <span style="color: #374151;">${(0, helpers_1.escapeHtml)(personalInfo.idNumber)}</span>
                                    </div>
                                ` : ''}
                            </div>
                        </section>
                    ` : ''}
                </div>

                <!-- RIGHT COLUMN -->
                <div style="width: 40%;">

                    <!-- Education (Right Column - additional) -->
                    ${education.length > 2 ? `
                        <section class="resume-section" style="margin-bottom: 24px;">
                            ${SectionHeader(t.sections.education + ' (Cont.)', '&#127891;')}
                            <div style="display: flex; flex-direction: column; gap: 16px;">
                                ${education.slice(2).map(edu => `
                                    <div data-paginate="item">
                                        <h4 style="font-weight: 800; font-size: ${fs.entryTitle}; color: #1f2937; margin-bottom: 4px;">
                                            ${(0, helpers_1.escapeHtml)(edu.degree)}
                                            ${edu.gpa ? `<span style="margin-left: 8px; opacity: 0.8; font-weight: 500;">GPA: ${(0, helpers_1.escapeHtml)(edu.gpa)}</span>` : ''}
                                        </h4>
                                        <p style="font-size: ${fs.body}; color: ${accentColor}; font-weight: 700; margin-bottom: 2px;">
                                            ${(0, helpers_1.escapeHtml)(edu.school)}
                                        </p>
                                        <span style="font-size: ${fs.small}; color: #6b7280;">
                                            ${(0, dateUtils_1.formatLocalizedDate)(edu.startDate, locale)} – ${edu.endDate ? (0, dateUtils_1.formatLocalizedDate)(edu.endDate, locale) : t.labels.present}
                                        </span>
                                        ${edu.honors ? `<p style="font-size: ${s(11)}; color: #4b5563; opacity: 0.8; margin: 0;">${(0, helpers_1.escapeHtml)(edu.honors)}</p>` : ''}
                                        ${edu.clubs ? `<p style="font-size: ${s(10)}; color: #6b7280; opacity: 0.7; margin: 0;">Activities: ${(0, helpers_1.escapeHtml)(edu.clubs)}</p>` : ''}
                                        ${edu.description ? `<p style="font-size: ${fs.small}; line-height: 1.6; color: #4b5563; margin-top: 4px;">${(0, helpers_1.formatDescription)(edu.description)}</p>` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Languages -->
                    ${languages && languages.length > 0 ? `
                        <section class="resume-section" style="margin-bottom: 24px;">
                            ${SectionHeader(t.sections.languages, (0, helpers_1.getIconSVG)('languages', accentColor, sNum(16)))}
                            <div style="display: flex; flex-direction: column; gap: 12px;">
                                ${languages.map(lang => `
                                    <div data-paginate="item">${ProgressBar(lang.name, lang.level || getLanguageLevelPercent(lang.proficiency))}</div>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Skills (Circular) -->
                    ${skills.length > 0 ? `
                        <section class="resume-section" style="margin-bottom: 24px;">
                            ${SectionHeader(t.sections.skills, (0, helpers_1.getIconSVG)('users', accentColor, sNum(16)))}
                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 10px;">
                                ${skills.map(skill => `<div data-paginate="item">${CircularProgress(skill.level ? skill.level * 20 : 80, skill.name)}</div>`).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Strengths (Bars) -->
                    ${strengths && strengths.length > 0 ? `
                        <section class="resume-section" style="margin-bottom: 24px;">
                            ${SectionHeader(t.sections.strengths, (0, helpers_1.getIconSVG)('code', accentColor, sNum(16)))}
                            <div>
                                ${strengths.map(str => `<div data-paginate="item">${ProgressBar(str.name, str.level ?? 80)}</div>`).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Interests -->
                    ${interests && interests.length > 0 ? `
                        <section class="resume-section" style="margin-bottom: 24px;">
                            ${SectionHeader(t.sections.interests, (0, helpers_1.getIconSVG)('star', accentColor, sNum(16)))}
                            <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                                ${interests.map(int => `
                                    <span data-paginate="item" style="font-size: ${fs.body}; font-weight: 500; color: #4b5563;">
                                        ${(0, helpers_1.escapeHtml)(int.name)}
                                    </span>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Credentials -->
                    ${(certifications && certifications.length > 0) || (awards && awards.length > 0) ? `
                        <section class="resume-section" style="margin-bottom: 24px;">
                            ${SectionHeader(t.sections.credentials, (0, helpers_1.getIconSVG)('award', accentColor, sNum(16)))}
                            ${certifications && certifications.length > 0 ? `
                                <div style="margin-bottom: ${awards && awards.length > 0 ? '16px' : '0'};">
                                    <h4 style="font-size: ${fs.body}; font-weight: 600; color: #6b7280; margin-bottom: 8px;">${t.sections.certifications}</h4>
                                    <div style="display: flex; flex-direction: column; gap: 8px;">
                                        ${certifications.map(cert => `
                                            <div data-paginate="item">
                                                <div style="font-weight: 600; font-size: ${fs.body}; color: #1f2937;">${(0, helpers_1.escapeHtml)(cert.name)}</div>
                                                <div style="font-size: ${fs.small}; color: #6b7280;">${(0, helpers_1.escapeHtml)(cert.issuer)} • ${(0, dateUtils_1.formatLocalizedDate)(cert.date, locale)}</div>
                                                ${cert.url ? `<div style="font-size: ${s(10)}; color: #6b7280; opacity: 0.7;">${(0, helpers_1.escapeHtml)(cert.url)}</div>` : ''}
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}
                            ${awards && awards.length > 0 ? `
                                <div>
                                    <h4 style="font-size: ${fs.body}; font-weight: 600; color: #6b7280; margin-bottom: 8px;">${t.sections.awards}</h4>
                                    <div style="display: flex; flex-direction: column; gap: 8px;">
                                        ${awards.map(award => `
                                            <div data-paginate="item">
                                                <div style="font-weight: 600; font-size: ${fs.body}; color: #1f2937;">${(0, helpers_1.escapeHtml)(award.title)}</div>
                                                <div style="font-size: ${fs.small}; color: #6b7280;">${(0, helpers_1.escapeHtml)(award.issuer)} • ${(0, dateUtils_1.formatLocalizedDate)(award.date, locale)}</div>
                                            
                                                ${award.description ? `<p style="font-size: ${s(11)}; line-height: 1.5; color: #4b5563; margin-top: 2px;">${(0, helpers_1.formatDescription)(award.description)}</p>` : ''}
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}
                        </section>
                    ` : ''}

                    <!-- Social Links -->
                    ${(personalInfo.x || personalInfo.github || personalInfo.dribbble || personalInfo.behance || personalInfo.instagram) ? `
                        <section class="resume-section" style="margin-bottom: 24px;">
                            ${SectionHeader(t.sections.socialLinks, (0, helpers_1.getIconSVG)('globe', accentColor, sNum(16)))}
                            <div style="display: flex; flex-direction: column; gap: 8px;">
                                ${personalInfo.x ? `
                                    <div data-paginate="item" style="display: flex; align-items: center; gap: 8px; font-size: ${fs.body};">
                                        <span>${(0, helpers_1.getIconSVG)('x', accentColor, sNum(14))}</span>
                                        <span style="color: #374151;">${(0, helpers_1.escapeHtml)(personalInfo.x)}</span>
                                    </div>
                                ` : ''}
                                ${personalInfo.github ? `
                                    <div data-paginate="item" style="display: flex; align-items: center; gap: 8px; font-size: ${fs.body};">
                                        <span>${(0, helpers_1.getIconSVG)('github', accentColor, sNum(14))}</span>
                                        <span style="color: #374151;">${(0, helpers_1.escapeHtml)(personalInfo.github)}</span>
                                    </div>
                                ` : ''}
                                ${personalInfo.dribbble ? `
                                    <div data-paginate="item" style="display: flex; align-items: center; gap: 8px; font-size: ${fs.body};">
                                        <span>${(0, helpers_1.getIconSVG)('dribbble', accentColor, sNum(14))}</span>
                                        <span style="color: #374151;">${(0, helpers_1.escapeHtml)(personalInfo.dribbble)}</span>
                                    </div>
                                ` : ''}
                                ${personalInfo.behance ? `
                                    <div data-paginate="item" style="display: flex; align-items: center; gap: 8px; font-size: ${fs.body};">
                                        <span>${(0, helpers_1.getIconSVG)('behance', accentColor, sNum(14))}</span>
                                        <span style="color: #374151;">${(0, helpers_1.escapeHtml)(personalInfo.behance)}</span>
                                    </div>
                                ` : ''}
                                ${personalInfo.instagram ? `
                                    <div data-paginate="item" style="display: flex; align-items: center; gap: 8px; font-size: ${fs.body};">
                                        <span>${(0, helpers_1.getIconSVG)('instagram', accentColor, sNum(14))}</span>
                                        <span style="color: #374151;">${(0, helpers_1.escapeHtml)(personalInfo.instagram)}</span>
                                    </div>
                                ` : ''}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Custom Fields -->
                    ${customFields.map(field => `
                        <section class="resume-section" style="margin-bottom: 24px;">
                            ${SectionHeader((0, helpers_1.escapeHtml)(field.label), (0, helpers_1.getIconSVG)('id-card', accentColor, sNum(16)))}
                            <p style="font-size: ${fs.body}; color: #374151; line-height: 1.6;">
                                ${(0, helpers_1.formatDescription)(field.content)}
                            </p>
                        </section>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
};
exports.renderHeaderDarkBox = renderHeaderDarkBox;
//# sourceMappingURL=header-dark-box.js.map
/**
 * Classic Professional Template
 * Traditional top-down professional resume layout with centered header.
 */

import { PdfResumeData, PdfTheme } from '../../types/pdf';
import {
    getFontFamily,
    fontSizes,
    getBackgroundCSS,
    getImageBorderRadius,
    formatIdType,
    escapeHtml,
    formatDescription,
} from './shared/helpers';

export const renderClassicProfessional = (data: PdfResumeData, theme: PdfTheme): string => {
    const { personalInfo, experience, education, skills, languages, interests, strengths, certifications, background, fonts } = data;
    const bgStyle = getBackgroundCSS(background);
    const headingFont = getFontFamily(fonts?.heading || 'Inter');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Build sections
    const profileImage = personalInfo.profileImage ? `
        <div class="flex justify-center mb-3">
            <img
                src="${personalInfo.profileImage}"
                alt="${escapeHtml(personalInfo.fullName)}"
                class="object-cover border-2"
                style="width: 80px; height: 80px; border-radius: ${getImageBorderRadius(personalInfo.imageShape)}; border-color: ${theme.primary};"
            />
        </div>
    ` : '';

    const idInfo = personalInfo.idType && personalInfo.idNumber ? `
        <div style="color: ${theme.text}; font-size: 11px; margin-top: 4px; opacity: 0.8;">
            ${formatIdType(personalInfo.idType)}: ${escapeHtml(personalInfo.idNumber)}
        </div>
    ` : '';

    const contactItems = [
        personalInfo.email,
        personalInfo.phone,
        personalInfo.location,
        personalInfo.nationality,
    ].filter(Boolean);

    const contactHtml = contactItems.map((item, i) =>
        `${i > 0 ? '<span>&bull;</span>' : ''}<span>${escapeHtml(item!)}</span>`
    ).join('');

    const summarySection = personalInfo.summary ? `
        <section class="mb-5 resume-section">
            <h2 style="color: ${theme.primary}; font-family: ${headingFont}; font-size: 14px; font-weight: 700; border-bottom: 1px solid ${theme.accent}; padding-bottom: 4px; margin-bottom: 12px;">
                Professional Summary
            </h2>
            <p style="color: ${theme.text}; line-height: 1.5; font-size: ${sizeConfig.base};">
                ${formatDescription(personalInfo.summary)}
            </p>
        </section>
    ` : '';

    const experienceSection = experience.length > 0 ? `
        <section class="mb-5 resume-section">
            <h2 style="color: ${theme.primary}; font-family: ${headingFont}; font-size: 14px; font-weight: 700; border-bottom: 1px solid ${theme.accent}; padding-bottom: 4px; margin-bottom: 12px;">
                Experience
            </h2>
            <div class="space-y-3">
                ${experience.map(exp => `
                    <div class="resume-entry">
                        <div class="flex justify-between items-baseline">
                            <h3 style="color: ${theme.text}; font-weight: 600; font-size: ${sizeConfig.base};">
                                ${escapeHtml(exp.title)}
                            </h3>
                            <span style="color: ${theme.text}; opacity: 0.7; font-size: 11px;">
                                ${escapeHtml(exp.startDate)} – ${exp.current ? 'Present' : escapeHtml(exp.endDate)}
                            </span>
                        </div>
                        <p style="color: ${theme.secondary}; font-size: 12px; margin-bottom: 4px;">
                            ${escapeHtml(exp.company)}${(exp.city || exp.country) ? `, ${[exp.city, exp.country].filter(Boolean).map(s => escapeHtml(s)).join(', ')}` : ''}
                        </p>
                        ${exp.description ? `
                            <p style="color: ${theme.text}; opacity: 0.8; font-size: 12px; line-height: 1.4;">
                                ${formatDescription(exp.description)}
                            </p>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        </section>
    ` : '';

    const educationSection = education.length > 0 ? `
        <section class="mb-5 resume-section">
            <h2 style="color: ${theme.primary}; font-family: ${headingFont}; font-size: 14px; font-weight: 700; border-bottom: 1px solid ${theme.accent}; padding-bottom: 4px; margin-bottom: 12px;">
                Education
            </h2>
            <div class="space-y-2">
                ${education.map(edu => `
                    <div class="resume-entry">
                        <div class="flex justify-between items-baseline">
                            <h3 style="color: ${theme.text}; font-weight: 600; font-size: ${sizeConfig.base};">
                                ${escapeHtml(edu.school)}
                            </h3>
                            <span style="color: ${theme.text}; opacity: 0.7; font-size: 11px;">
                                ${escapeHtml(edu.startDate)} – ${edu.current ? 'Present' : escapeHtml(edu.endDate)}
                            </span>
                        </div>
                        <p style="color: ${theme.secondary}; font-size: 12px;">
                            ${escapeHtml(edu.degree)}
                            ${edu.gpa ? `<span style="margin-left: 8px; opacity: 0.8;">GPA: ${escapeHtml(edu.gpa)}</span>` : ''}
                        </p>
                        ${edu.honors ? `<p style="color: ${theme.text}; opacity: 0.7; font-size: 11px;">${escapeHtml(edu.honors)}</p>` : ''}
                        ${edu.clubs ? `<p style="color: ${theme.text}; opacity: 0.6; font-size: 10px;">Activities: ${escapeHtml(edu.clubs)}</p>` : ''}
                    </div>
                `).join('')}
            </div>
        </section>
    ` : '';

    const skillsSection = skills.length > 0 ? `
        <section class="mb-5 resume-section">
            <h2 style="color: ${theme.primary}; font-family: ${headingFont}; font-size: 14px; font-weight: 700; border-bottom: 1px solid ${theme.accent}; padding-bottom: 4px; margin-bottom: 12px;">
                Skills
            </h2>
            <div class="space-y-1">
                ${skills.map(skill => `
                    <div class="flex items-center gap-2">
                        <span style="color: ${theme.text}; font-size: 12px; min-width: 100px;">
                            ${escapeHtml(skill.name)}
                        </span>
                        <div class="flex gap-1">
                            ${[1, 2, 3, 4, 5].map(dot => `
                                <div style="width: 8px; height: 8px; border-radius: 50%; background-color: ${dot <= (skill.level || 3) ? theme.primary : `${theme.primary}30`};"></div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>
    ` : '';

    const languagesSection = languages && languages.length > 0 ? `
        <section class="mb-5 resume-section">
            <h2 style="color: ${theme.primary}; font-family: ${headingFont}; font-size: 14px; font-weight: 700; border-bottom: 1px solid ${theme.accent}; padding-bottom: 4px; margin-bottom: 12px;">
                Languages
            </h2>
            <div class="space-y-1">
                ${languages.map(lang => `
                    <div class="flex items-center justify-between">
                        <span style="color: ${theme.text}; font-size: 12px;">${escapeHtml(lang.name)}</span>
                        <div class="flex items-center gap-2">
                            <div style="width: 80px; height: 6px; background-color: ${theme.primary}30; border-radius: 3px; overflow: hidden;">
                                <div style="width: ${lang.level}%; height: 100%; background-color: ${theme.primary};"></div>
                            </div>
                            <span style="color: ${theme.text}; opacity: 0.7; font-size: 10px; text-transform: capitalize;">
                                ${escapeHtml(lang.proficiency)}
                            </span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>
    ` : '';

    const strengthsSection = strengths && strengths.length > 0 ? `
        <section class="mb-5 resume-section">
            <h2 style="color: ${theme.primary}; font-family: ${headingFont}; font-size: 14px; font-weight: 700; border-bottom: 1px solid ${theme.accent}; padding-bottom: 4px; margin-bottom: 12px;">
                Strengths
            </h2>
            <div class="flex flex-wrap gap-1">
                ${strengths.map(strength => `
                    <span style="background-color: ${theme.primary}15; color: ${theme.primary}; padding: 4px 10px; border-radius: 4px; font-size: 11px;">
                        ${escapeHtml(strength.name)}
                    </span>
                `).join('')}
            </div>
        </section>
    ` : '';

    const certificationsSection = certifications && certifications.length > 0 ? `
        <section class="mb-5 resume-section">
            <h2 style="color: ${theme.primary}; font-family: ${headingFont}; font-size: 14px; font-weight: 700; border-bottom: 1px solid ${theme.accent}; padding-bottom: 4px; margin-bottom: 12px;">
                Certifications
            </h2>
            <div class="space-y-1">
                ${certifications.map(cert => `
                    <div>
                        <span style="color: ${theme.text}; font-weight: 500; font-size: 12px;">${escapeHtml(cert.name)}</span>
                        <span style="color: ${theme.text}; opacity: 0.7; font-size: 11px; margin-left: 8px;">
                            ${escapeHtml(cert.issuer)} &bull; ${escapeHtml(cert.date)}
                        </span>
                    </div>
                `).join('')}
            </div>
        </section>
    ` : '';

    const interestsSection = interests && interests.length > 0 ? `
        <section class="resume-section">
            <h2 style="color: ${theme.primary}; font-family: ${headingFont}; font-size: 14px; font-weight: 700; border-bottom: 1px solid ${theme.accent}; padding-bottom: 4px; margin-bottom: 12px;">
                Interests
            </h2>
            <p style="color: ${theme.text}; font-size: 12px;">
                ${interests.map(i => escapeHtml(i.name)).join(' &bull; ')}
            </p>
        </section>
    ` : '';

    return `
        <div class="w-full h-full" style="font-family: ${bodyFont}; font-size: ${sizeConfig.base}; ${bgStyle} padding: 40px;">
            <!-- Header -->
            <header class="text-center mb-6 pb-4 border-b-2" style="border-color: ${theme.accent};">
                ${profileImage}
                <h1 style="color: ${theme.primary}; font-family: ${headingFont}; font-size: ${sizeConfig.heading}; font-weight: 700; margin-bottom: 4px;">
                    ${escapeHtml(personalInfo.fullName || 'Your Name')}
                </h1>
                <p style="color: ${theme.secondary}; font-size: ${sizeConfig.subheading}; margin-bottom: 8px;">
                    ${escapeHtml(personalInfo.jobTitle || 'Job Title')}
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
        </div>
    `;
};

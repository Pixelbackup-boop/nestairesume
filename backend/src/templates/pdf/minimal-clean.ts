/**
 * Minimal Clean Template
 * Clean, simple, typography-focused layout with minimal styling.
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

export const renderMinimalClean = (data: PdfResumeData, theme: PdfTheme): string => {
    const { personalInfo, experience, education, skills, languages, interests, strengths, certifications, background, fonts } = data;
    const bgStyle = getBackgroundCSS(background);
    const headingFont = getFontFamily(fonts?.heading || 'Inter');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    const profileImage = personalInfo.profileImage ? `
        <img
            src="${personalInfo.profileImage}"
            alt="${escapeHtml(personalInfo.fullName)}"
            class="object-cover"
            style="width: 56px; height: 56px; border-radius: ${getImageBorderRadius(personalInfo.imageShape)};"
        />
    ` : '';

    const contactLine = [personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.nationality]
        .filter(Boolean)
        .map(item => escapeHtml(item!))
        .join(' &bull; ');

    const idInfo = personalInfo.idType && personalInfo.idNumber ? `
        <p style="color: ${theme.text}; opacity: 0.6; font-size: 10px; margin-top: 4px;">
            ${formatIdType(personalInfo.idType)}: ${escapeHtml(personalInfo.idNumber)}
        </p>
    ` : '';

    const summarySection = personalInfo.summary ? `
        <section class="mb-5 resume-section">
            <p style="color: ${theme.text}; line-height: 1.6; font-size: 12px;">
                ${formatDescription(personalInfo.summary)}
            </p>
        </section>
    ` : '';

    const experienceSection = experience.length > 0 ? `
        <section class="mb-5 resume-section">
            <h2 style="color: ${theme.primary}; font-family: ${headingFont}; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;">
                Experience
            </h2>
            <div class="space-y-3">
                ${experience.map(exp => `
                    <div class="resume-entry">
                        <div class="flex justify-between items-baseline">
                            <span style="color: ${theme.text}; font-weight: 500; font-size: 12px;">
                                ${escapeHtml(exp.title)} — ${escapeHtml(exp.company)}
                            </span>
                            <span style="color: ${theme.text}; opacity: 0.5; font-size: 10px;">
                                ${escapeHtml(exp.startDate)} – ${exp.current ? 'Present' : escapeHtml(exp.endDate)}
                            </span>
                        </div>
                        ${exp.description ? `
                            <p style="color: ${theme.text}; opacity: 0.7; font-size: 11px; margin-top: 2px;">
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
            <h2 style="color: ${theme.primary}; font-family: ${headingFont}; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;">
                Education
            </h2>
            <div class="space-y-2">
                ${education.map(edu => `
                    <div class="resume-entry">
                        <div>
                            <span style="color: ${theme.text}; font-size: 12px;">
                                ${escapeHtml(edu.degree)}, ${escapeHtml(edu.school)}
                            </span>
                            <span style="color: ${theme.text}; opacity: 0.5; font-size: 10px; margin-left: 8px;">
                                ${escapeHtml(edu.startDate)} – ${edu.current ? 'Present' : escapeHtml(edu.endDate)}
                            </span>
                            ${edu.gpa ? `<span style="color: ${theme.primary}; font-size: 10px; margin-left: 8px;">GPA: ${escapeHtml(edu.gpa)}</span>` : ''}
                        </div>
                        ${edu.honors ? `<p style="color: ${theme.text}; opacity: 0.6; font-size: 10px;">${escapeHtml(edu.honors)}</p>` : ''}
                    </div>
                `).join('')}
            </div>
        </section>
    ` : '';

    const skillsSection = skills.length > 0 ? `
        <section class="mb-5 resume-section">
            <h2 style="color: ${theme.primary}; font-family: ${headingFont}; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;">
                Skills
            </h2>
            <div class="space-y-1">
                ${skills.map(skill => `
                    <div class="flex items-center gap-2">
                        <span style="color: ${theme.text}; font-size: 11px; min-width: 80px;">
                            ${escapeHtml(skill.name)}
                        </span>
                        <div style="flex: 1; height: 4px; background-color: ${theme.primary}20; border-radius: 2px; overflow: hidden;">
                            <div style="width: ${((skill.level || 3) / 5) * 100}%; height: 100%; background-color: ${theme.primary};"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>
    ` : '';

    const languagesSection = languages && languages.length > 0 ? `
        <section class="mb-5 resume-section">
            <h2 style="color: ${theme.primary}; font-family: ${headingFont}; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;">
                Languages
            </h2>
            <p style="color: ${theme.text}; opacity: 0.8; font-size: 11px;">
                ${languages.map(l => `${escapeHtml(l.name)} (${escapeHtml(l.proficiency)})`).join(', ')}
            </p>
        </section>
    ` : '';

    const strengthsSection = strengths && strengths.length > 0 ? `
        <section class="mb-5 resume-section">
            <h2 style="color: ${theme.primary}; font-family: ${headingFont}; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;">
                Strengths
            </h2>
            <p style="color: ${theme.text}; opacity: 0.8; font-size: 11px;">
                ${strengths.map(s => escapeHtml(s.name)).join(', ')}
            </p>
        </section>
    ` : '';

    const certificationsSection = certifications && certifications.length > 0 ? `
        <section class="mb-5 resume-section">
            <h2 style="color: ${theme.primary}; font-family: ${headingFont}; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;">
                Certifications
            </h2>
            <div class="space-y-1">
                ${certifications.map(cert => `
                    <p style="color: ${theme.text}; opacity: 0.8; font-size: 11px;">
                        ${escapeHtml(cert.name)} — ${escapeHtml(cert.issuer)}, ${escapeHtml(cert.date)}
                    </p>
                `).join('')}
            </div>
        </section>
    ` : '';

    const interestsSection = interests && interests.length > 0 ? `
        <section class="resume-section">
            <h2 style="color: ${theme.primary}; font-family: ${headingFont}; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;">
                Interests
            </h2>
            <p style="color: ${theme.text}; opacity: 0.8; font-size: 11px;">
                ${interests.map(i => escapeHtml(i.name)).join(', ')}
            </p>
        </section>
    ` : '';

    return `
        <div class="w-full h-full" style="font-family: ${bodyFont}; font-size: ${sizeConfig.base}; ${bgStyle} padding: 40px;">
            <!-- Header -->
            <header class="mb-5">
                <div class="flex items-center gap-3 mb-2">
                    ${profileImage}
                    <div>
                        <h1 style="color: ${theme.text}; font-family: ${headingFont}; font-size: ${sizeConfig.heading}; font-weight: 700;">
                            ${escapeHtml(personalInfo.fullName || 'Your Name')}
                        </h1>
                        <p style="color: ${theme.primary}; font-size: ${sizeConfig.subheading};">
                            ${escapeHtml(personalInfo.jobTitle || 'Job Title')}
                        </p>
                    </div>
                </div>
                <p style="color: ${theme.text}; opacity: 0.7; font-size: 11px;">
                    ${contactLine}
                </p>
                ${idInfo}
                <div style="height: 1px; background-color: ${theme.primary}; margin-top: 12px;"></div>
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

/**
 * Europass Classic Template
 * Clean single-column layout with blue left accent stripe, inspired by Europass CV format.
 */

import { PdfResumeData, PdfTheme } from '../../types/pdf';
import {
    getFontFamily,
    fontSizes,
    getBackgroundCSS,
    formatIdType,
    escapeHtml,
    formatDescription,
} from './shared/helpers';

export const renderEuropassClassic = (data: PdfResumeData, theme: PdfTheme): string => {
    const { personalInfo, experience, education, skills, languages, interests, strengths, certifications, background, fonts } = data;
    const bgStyle = getBackgroundCSS(background);
    const headingFont = getFontFamily(fonts?.heading || 'Inter');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    const accentWidth = '6px';

    // Profile photo
    const profileImage = personalInfo.profileImage ? `
        <div style="flex-shrink: 0; width: 100px; height: 100px; border-radius: 50%; border: 3px solid ${theme.primary}; overflow: hidden;">
            <img src="${personalInfo.profileImage}" alt="${escapeHtml(personalInfo.fullName)}" style="width: 100%; height: 100%; object-fit: cover;" />
        </div>
    ` : '';

    // Personal details row
    const personalDetails = [];
    if (personalInfo.nationality) personalDetails.push(`<strong>Nationality:</strong> ${escapeHtml(personalInfo.nationality)}`);
    if (personalInfo.idType && personalInfo.idNumber) {
        personalDetails.push(`<strong>${formatIdType(personalInfo.idType)}:</strong> ${escapeHtml(personalInfo.idNumber)}`);
    }

    const summarySection = personalInfo.summary ? `
        <section class="mb-5 resume-section">
            <h2 style="color: ${theme.primary}; font-family: ${headingFont}; font-size: 14px; font-weight: 700; border-bottom: 2px solid ${theme.primary}; padding-bottom: 4px; margin-bottom: 12px;">
                About Myself
            </h2>
            <p style="color: ${theme.text}; line-height: 1.6; font-size: 12px;">
                ${formatDescription(personalInfo.summary)}
            </p>
        </section>
    ` : '';

    const experienceSection = experience.length > 0 ? `
        <section class="mb-5 resume-section">
            <h2 style="color: ${theme.primary}; font-family: ${headingFont}; font-size: 14px; font-weight: 700; border-bottom: 2px solid ${theme.primary}; padding-bottom: 4px; margin-bottom: 12px;">
                Work Experience
            </h2>
            <div class="space-y-4">
                ${experience.map(exp => `
                    <div class="resume-entry">
                        <h3 style="color: ${theme.text}; font-weight: 700; font-size: 13px; margin-bottom: 2px;">
                            ${escapeHtml(exp.title)}
                        </h3>
                        <p style="color: ${theme.text}; font-size: 12px; margin-bottom: 2px;">
                            <em>${escapeHtml(exp.company)}</em>
                            <span style="color: ${theme.text}; opacity: 0.7;">
                                [ ${escapeHtml(exp.startDate)} – ${exp.current ? 'Present' : escapeHtml(exp.endDate)} ]
                            </span>
                        </p>
                        ${(exp.city || exp.country) ? `
                            <p style="color: ${theme.text}; font-size: 11px; margin-bottom: 4px;">
                                <strong>City:</strong> ${escapeHtml(exp.city || '')} | <strong>Country:</strong> ${escapeHtml(exp.country || '')}
                            </p>
                        ` : ''}
                        ${exp.description ? `
                            <p style="color: ${theme.text}; opacity: 0.85; font-size: 11px; line-height: 1.5;">
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
            <h2 style="color: ${theme.primary}; font-family: ${headingFont}; font-size: 14px; font-weight: 700; border-bottom: 2px solid ${theme.primary}; padding-bottom: 4px; margin-bottom: 12px;">
                Education and Training
            </h2>
            <div class="space-y-3">
                ${education.map(edu => `
                    <div class="resume-entry">
                        <h3 style="color: ${theme.text}; font-weight: 700; font-size: 13px;">
                            ${escapeHtml(edu.degree)}
                        </h3>
                        <p style="color: ${theme.text}; font-size: 12px;">
                            <em>${escapeHtml(edu.school)}</em>
                            ${(edu.startDate || edu.endDate) ? `
                                <span style="opacity: 0.7;">
                                    [ ${escapeHtml(edu.startDate)} – ${edu.current ? 'Present' : escapeHtml(edu.endDate)} ]
                                </span>
                            ` : ''}
                        </p>
                        ${edu.gpa ? `<p style="color: ${theme.text}; font-size: 11px;">GPA: ${escapeHtml(edu.gpa)}</p>` : ''}
                    </div>
                `).join('')}
            </div>
        </section>
    ` : '';

    const languagesSection = languages && languages.length > 0 ? `
        <section class="mb-5 resume-section">
            <h2 style="color: ${theme.primary}; font-family: ${headingFont}; font-size: 14px; font-weight: 700; border-bottom: 2px solid ${theme.primary}; padding-bottom: 4px; margin-bottom: 12px;">
                Language Skills
            </h2>
            <div class="space-y-2">
                ${languages.map(lang => `
                    <div style="font-size: 12px;">
                        <span style="color: ${theme.text}; font-weight: 600;">${escapeHtml(lang.name)}</span>
                        <span style="color: ${theme.text}; opacity: 0.7; margin-left: 8px; text-transform: capitalize;">
                            (${escapeHtml(lang.proficiency)})
                        </span>
                    </div>
                `).join('')}
            </div>
        </section>
    ` : '';

    const skillsSection = skills.length > 0 ? `
        <section class="mb-5 resume-section">
            <h2 style="color: ${theme.primary}; font-family: ${headingFont}; font-size: 14px; font-weight: 700; border-bottom: 2px solid ${theme.primary}; padding-bottom: 4px; margin-bottom: 12px;">
                Skills
            </h2>
            <p style="color: ${theme.text}; font-size: 12px;">
                ${skills.map(s => escapeHtml(s.name)).join(' &bull; ')}
            </p>
        </section>
    ` : '';

    const certificationsSection = certifications && certifications.length > 0 ? `
        <section class="mb-5 resume-section">
            <h2 style="color: ${theme.primary}; font-family: ${headingFont}; font-size: 14px; font-weight: 700; border-bottom: 2px solid ${theme.primary}; padding-bottom: 4px; margin-bottom: 12px;">
                Certifications
            </h2>
            <div class="space-y-2">
                ${certifications.map(cert => `
                    <div style="font-size: 12px;">
                        <span style="color: ${theme.text}; font-weight: 600;">${escapeHtml(cert.name)}</span>
                        <span style="color: ${theme.text}; opacity: 0.7; margin-left: 8px;">
                            — ${escapeHtml(cert.issuer)}, ${escapeHtml(cert.date)}
                        </span>
                    </div>
                `).join('')}
            </div>
        </section>
    ` : '';

    const strengthsSection = strengths && strengths.length > 0 ? `
        <section class="mb-5 resume-section">
            <h2 style="color: ${theme.primary}; font-family: ${headingFont}; font-size: 14px; font-weight: 700; border-bottom: 2px solid ${theme.primary}; padding-bottom: 4px; margin-bottom: 12px;">
                Strengths
            </h2>
            <p style="color: ${theme.text}; font-size: 12px;">
                ${strengths.map(s => escapeHtml(s.name)).join(' &bull; ')}
            </p>
        </section>
    ` : '';

    const interestsSection = interests && interests.length > 0 ? `
        <section class="resume-section">
            <h2 style="color: ${theme.primary}; font-family: ${headingFont}; font-size: 14px; font-weight: 700; border-bottom: 2px solid ${theme.primary}; padding-bottom: 4px; margin-bottom: 12px;">
                Interests
            </h2>
            <p style="color: ${theme.text}; font-size: 12px;">
                ${interests.map(i => escapeHtml(i.name)).join(' &bull; ')}
            </p>
        </section>
    ` : '';

    return `
        <div class="w-full h-full relative" style="font-family: ${bodyFont}; font-size: ${sizeConfig.base}; ${bgStyle}">
            <!-- Blue Left Accent Stripe -->
            <div style="position: absolute; left: 0; top: 0; bottom: 0; width: ${accentWidth}; background-color: ${theme.primary};"></div>

            <!-- Main Content -->
            <div style="padding-left: 50px; padding-right: 40px; padding-top: 32px; padding-bottom: 32px;">
                <!-- Header -->
                <header class="flex gap-4 mb-6" style="align-items: flex-start;">
                    ${profileImage}
                    <div style="flex: 1;">
                        <h1 style="color: ${theme.text}; font-family: ${headingFont}; font-size: 28px; font-weight: 700; margin-bottom: 8px;">
                            ${escapeHtml(personalInfo.fullName || 'Your Name')}
                        </h1>
                        ${personalDetails.length > 0 ? `
                            <div style="color: ${theme.text}; font-size: 12px; margin-bottom: 4px;">
                                ${personalDetails.join(' ')}
                            </div>
                        ` : ''}
                        <div style="color: ${theme.text}; font-size: 12px; margin-bottom: 2px;">
                            ${personalInfo.phone ? `<span style="margin-right: 16px;"><span style="color: ${theme.primary};">&#128222;</span> ${escapeHtml(personalInfo.phone)}</span>` : ''}
                            ${personalInfo.email ? `<span><span style="color: ${theme.primary};">&#9993;</span> ${escapeHtml(personalInfo.email)}</span>` : ''}
                        </div>
                        ${personalInfo.location ? `
                            <div style="color: ${theme.text}; font-size: 12px;">
                                <span style="color: ${theme.primary};">&#128205;</span> ${escapeHtml(personalInfo.location)}
                            </div>
                        ` : ''}
                    </div>
                </header>

                ${summarySection}
                ${experienceSection}
                ${educationSection}
                ${languagesSection}
                ${skillsSection}
                ${certificationsSection}
                ${strengthsSection}
                ${interestsSection}
            </div>
        </div>
    `;
};

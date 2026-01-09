/**
 * Sidebar Modern Template
 * Two-column layout with colored sidebar containing contact and skills.
 * Uses position:fixed for sidebar background to extend across all pages in PDF.
 * In print media, position:fixed elements repeat on every page.
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

export const renderSidebarModern = (data: PdfResumeData, theme: PdfTheme): string => {
    const { personalInfo, experience, education, skills, languages, interests, strengths, certifications, background, fonts } = data;
    const bgStyle = getBackgroundCSS(background);
    const headingFont = getFontFamily(fonts?.heading || 'Inter');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Profile image in sidebar
    const profileImage = personalInfo.profileImage ? `
        <div style="text-align: center; margin-bottom: 12px;">
            <img
                src="${personalInfo.profileImage}"
                alt="${escapeHtml(personalInfo.fullName)}"
                style="width: 100px; height: 100px; border-radius: ${getImageBorderRadius(personalInfo.imageShape)}; border: 2px solid rgba(255,255,255,0.3); object-fit: cover;"
            />
        </div>
    ` : '';

    // Contact section in sidebar
    const contactItems = [];
    if (personalInfo.email) contactItems.push(`<p style="margin-bottom: 4px; word-break: break-all;">${escapeHtml(personalInfo.email)}</p>`);
    if (personalInfo.phone) contactItems.push(`<p style="margin-bottom: 4px;">${escapeHtml(personalInfo.phone)}</p>`);
    if (personalInfo.location) contactItems.push(`<p style="margin-bottom: 4px;">${escapeHtml(personalInfo.location)}</p>`);
    if (personalInfo.nationality) contactItems.push(`<p style="margin-bottom: 4px;">${escapeHtml(personalInfo.nationality)}</p>`);
    if (personalInfo.website) contactItems.push(`<p style="margin-bottom: 4px; word-break: break-all;">${escapeHtml(personalInfo.website)}</p>`);
    if (personalInfo.linkedin) contactItems.push(`<p style="margin-bottom: 4px; word-break: break-all;">${escapeHtml(personalInfo.linkedin)}</p>`);

    const idInfo = personalInfo.idType && personalInfo.idNumber ? `
        <p style="margin-top: 8px; opacity: 0.8;">${formatIdType(personalInfo.idType)}: ${escapeHtml(personalInfo.idNumber)}</p>
    ` : '';

    // Skills section in sidebar
    const skillsSection = skills.length > 0 ? `
        <div style="margin-bottom: 16px;">
            <h3 style="font-family: ${headingFont}; font-size: 12px; font-weight: 700; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">
                Skills
            </h3>
            <div style="font-size: 10px;">
                ${skills.map(skill => `
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
                        <span>${escapeHtml(skill.name)}</span>
                        <span style="display: flex; gap: 2px;">
                            ${[1, 2, 3, 4, 5].map(dot => `
                                <span style="display: inline-block; width: 5px; height: 5px; border-radius: 50%; background-color: ${dot <= (skill.level || 3) ? '#ffffff' : 'rgba(255,255,255,0.3)'};"></span>
                            `).join('')}
                        </span>
                    </div>
                `).join('')}
            </div>
        </div>
    ` : '';

    // Languages section in sidebar
    const languagesSection = languages && languages.length > 0 ? `
        <div style="margin-bottom: 16px;">
            <h3 style="font-family: ${headingFont}; font-size: 12px; font-weight: 700; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">
                Languages
            </h3>
            <div style="font-size: 10px;">
                ${languages.map(lang => `
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                        <span>${escapeHtml(lang.name)}</span>
                        <span style="opacity: 0.7; text-transform: capitalize;">${escapeHtml(lang.proficiency)}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    ` : '';

    // Interests section in sidebar
    const interestsSection = interests && interests.length > 0 ? `
        <div>
            <h3 style="font-family: ${headingFont}; font-size: 12px; font-weight: 700; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">
                Interests
            </h3>
            <div style="font-size: 10px;">
                ${interests.map(interest => `
                    <span style="display: inline-block; background-color: rgba(255,255,255,0.15); padding: 3px 6px; border-radius: 3px; margin-right: 4px; margin-bottom: 4px;">
                        ${escapeHtml(interest.name)}
                    </span>
                `).join('')}
            </div>
        </div>
    ` : '';

    // Main content sections
    const summarySection = personalInfo.summary ? `
        <div style="margin-bottom: 16px;">
            <p style="color: ${theme.text}; line-height: 1.5; font-size: 12px;">
                ${formatDescription(personalInfo.summary)}
            </p>
        </div>
    ` : '';

    const experienceSection = experience.length > 0 ? `
        <div style="margin-bottom: 16px;">
            <h2 style="color: ${theme.text}; font-family: ${headingFont}; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">
                Experience
            </h2>
            ${experience.map(exp => `
                <div style="margin-bottom: 12px; page-break-inside: avoid;">
                    <div style="display: flex; justify-content: space-between; align-items: baseline;">
                        <h3 style="color: ${theme.text}; font-weight: 600; font-size: 13px; margin: 0;">
                            ${escapeHtml(exp.title)}
                        </h3>
                        <span style="color: ${theme.text}; opacity: 0.6; font-size: 10px;">
                            ${escapeHtml(exp.startDate)} – ${exp.current ? 'Present' : escapeHtml(exp.endDate)}
                        </span>
                    </div>
                    <p style="color: ${theme.primary}; font-size: 11px; margin: 0 0 4px 0;">
                        ${escapeHtml(exp.company)}${(exp.city || exp.country) ? ` &bull; ${[exp.city, exp.country].filter(Boolean).map(s => escapeHtml(s)).join(', ')}` : ''}
                    </p>
                    ${exp.description ? `
                        <p style="color: ${theme.text}; opacity: 0.8; font-size: 11px; line-height: 1.4; margin: 0;">
                            ${formatDescription(exp.description)}
                        </p>
                    ` : ''}
                </div>
            `).join('')}
        </div>
    ` : '';

    const educationSection = education.length > 0 ? `
        <div style="margin-bottom: 16px;">
            <h2 style="color: ${theme.text}; font-family: ${headingFont}; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">
                Education
            </h2>
            ${education.map(edu => `
                <div style="margin-bottom: 8px; page-break-inside: avoid;">
                    <div style="display: flex; justify-content: space-between; align-items: baseline;">
                        <h3 style="color: ${theme.text}; font-weight: 600; font-size: 13px; margin: 0;">
                            ${escapeHtml(edu.school)}
                        </h3>
                        <span style="color: ${theme.text}; opacity: 0.6; font-size: 10px;">
                            ${escapeHtml(edu.startDate)} – ${edu.current ? 'Present' : escapeHtml(edu.endDate)}
                        </span>
                    </div>
                    <p style="color: ${theme.primary}; font-size: 11px; margin: 0;">
                        ${escapeHtml(edu.degree)}
                        ${edu.gpa ? `<span style="margin-left: 8px; opacity: 0.8;">GPA: ${escapeHtml(edu.gpa)}</span>` : ''}
                    </p>
                    ${edu.honors ? `<p style="color: ${theme.text}; opacity: 0.7; font-size: 10px; margin: 0;">${escapeHtml(edu.honors)}</p>` : ''}
                </div>
            `).join('')}
        </div>
    ` : '';

    const strengthsSection = strengths && strengths.length > 0 ? `
        <div style="margin-bottom: 16px;">
            <h2 style="color: ${theme.text}; font-family: ${headingFont}; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">
                Strengths
            </h2>
            <div>
                ${strengths.map(strength => `
                    <span style="display: inline-block; background-color: ${theme.primary}15; color: ${theme.primary}; padding: 4px 10px; border-radius: 4px; font-size: 11px; margin-right: 4px; margin-bottom: 4px;">
                        ${escapeHtml(strength.name)}
                    </span>
                `).join('')}
            </div>
        </div>
    ` : '';

    const certificationsSection = certifications && certifications.length > 0 ? `
        <div>
            <h2 style="color: ${theme.text}; font-family: ${headingFont}; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">
                Certifications
            </h2>
            ${certifications.map(cert => `
                <div style="margin-bottom: 8px;">
                    <p style="color: ${theme.text}; font-weight: 500; font-size: 12px; margin: 0;">${escapeHtml(cert.name)}</p>
                    <p style="color: ${theme.text}; opacity: 0.7; font-size: 10px; margin: 0;">${escapeHtml(cert.issuer)} &bull; ${escapeHtml(cert.date)}</p>
                </div>
            `).join('')}
        </div>
    ` : '';

    // Use position:fixed for sidebar background - repeats on every page in print media
    return `
        <!-- Fixed sidebar background - this repeats on every printed page -->
        <div class="sidebar-bg-fixed" style="background-color: ${theme.primary};"></div>

        <!-- Content wrapper using flexbox -->
        <div style="display: flex; width: 100%; font-family: ${bodyFont}; font-size: ${sizeConfig.base};">
            <!-- Sidebar Content Area (35% width) -->
            <div class="sidebar-content" style="width: 35%; padding: 24px; color: #ffffff; flex-shrink: 0;">
                ${profileImage}

                <!-- Name & Job Title -->
                <div style="text-align: center; margin-bottom: 16px;">
                    <h1 style="font-family: ${headingFont}; font-size: 18px; font-weight: 700; margin: 0 0 2px 0; line-height: 1.2;">
                        ${escapeHtml(personalInfo.fullName || 'Your Name')}
                    </h1>
                    <p style="font-size: 12px; opacity: 0.9; margin: 0;">
                        ${escapeHtml(personalInfo.jobTitle || 'Job Title')}
                    </p>
                </div>

                <!-- Contact Info -->
                <div style="margin-bottom: 16px; font-size: 11px;">
                    <h3 style="font-family: ${headingFont}; font-size: 12px; font-weight: 700; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.05em;">
                        Contact
                    </h3>
                    ${contactItems.join('')}
                    ${idInfo}
                </div>

                ${skillsSection}
                ${languagesSection}
                ${interestsSection}
            </div>

            <!-- Main Content Area (65% width) -->
            <div class="main-content" style="width: 65%; padding: 24px; ${bgStyle}">
                ${summarySection}
                ${experienceSection}
                ${educationSection}
                ${strengthsSection}
                ${certificationsSection}
            </div>
        </div>
    `;
};

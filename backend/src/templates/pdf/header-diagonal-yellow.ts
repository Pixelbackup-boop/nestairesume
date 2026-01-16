/**
 * Header Diagonal Yellow Template
 * Ported from frontend/components/templates/layouts/header/HeaderDiagonalYellow.tsx
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
    getIconSVG,
    IconName,
    getLanguageLevel
} from './shared/helpers';

export const renderHeaderDiagonalYellow = (data: PdfResumeData, theme: PdfTheme): string => {
    const {
        personalInfo,
        experience = [],
        education = [],
        skills = [],
        languages = [],
        interests = [],
        strengths = [],
        certifications = [],
        awards = [],
        background,
        fonts
    } = data;
    const bgStyle = getBackgroundCSS(background);
    const headingFont = getFontFamily(fonts?.heading || 'Inter');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // --- Helpers ---
    const SectionHeader = (title: string, icon: IconName) => `
        <div style="display: flex; align-items: center; gap: 8px; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 16px;">
            <div style="width: 24px; height: 24px; background-color: ${theme.primary}; border-radius: 4px; display: flex; align-items: center; justify-content: center;">
                ${getIconSVG(icon, '#ffffff', 14)}
            </div>
            <h3 style="font-family: ${headingFont}; font-size: 16px; font-weight: 700; text-transform: uppercase;">
                ${title}
            </h3>
        </div>
    `;

    // Progress bar helper
    const ProgressBar = (label: string, value: number) => `
        <div style="margin-bottom: 10px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                <span style="font-size: 11px; font-weight: 500;">${escapeHtml(label)}</span>
            </div>
            <div style="width: 100%; height: 6px; background-color: #e5e7eb; border-radius: 3px;">
                <div style="width: ${value}%; height: 100%; background-color: ${theme.primary}; border-radius: 3px;"></div>
            </div>
        </div>
    `;

    // --- Components ---

    const contactItems = [
        { value: personalInfo.email, icon: 'email' },
        { value: personalInfo.phone, icon: 'phone' },
        { value: personalInfo.location, icon: 'location' },
        { value: personalInfo.linkedin, icon: 'linkedin' },
        { value: personalInfo.website, icon: 'website' }
    ].filter(item => item.value);

    // Profile Image
    const profileImage = personalInfo.profileImage ? `
        <img
            src="${personalInfo.profileImage}"
            alt="${escapeHtml(personalInfo.fullName)}"
            style="width: 128px; height: 128px; border-radius: 50%; object-fit: cover; border: 4px solid #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);"
        />
    ` : '';

    // Experience
    const experienceHtml = experience.length > 0 ? `
        <div style="margin-bottom: 32px; page-break-inside: avoid;">
            ${SectionHeader('Experience', 'briefcase')}
            <div style="display: flex; flex-direction: column; gap: 20px;">
                ${experience.map(exp => `
                    <div>
                        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
                            <h4 style="font-family: ${headingFont}; font-size: 14px; font-weight: 700;">${escapeHtml(exp.title)}</h4>
                            <span style="font-size: 12px; color: #6b7280; font-weight: 500;">
                                ${escapeHtml(exp.startDate)} – ${exp.current ? 'Present' : escapeHtml(exp.endDate)}
                            </span>
                        </div>
                        <div style="font-size: 12px; font-weight: 600; color: ${theme.primary}; margin-bottom: 4px;">
                            ${escapeHtml(exp.company)}${exp.city ? ` • ${escapeHtml(exp.city)}` : ''}
                        </div>
                        <div style="font-size: 11px; line-height: 1.5; color: #374151;">
                            ${formatDescription(exp.description)}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    ` : '';

    // Education
    const educationHtml = education.length > 0 ? `
        <div style="margin-bottom: 32px; page-break-inside: avoid;">
            ${SectionHeader('Education', 'graduation-cap')}
            <div style="display: flex; flex-direction: column; gap: 16px;">
                ${education.map(edu => `
                    <div>
                        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
                            <h4 style="font-family: ${headingFont}; font-size: 14px; font-weight: 700;">${escapeHtml(edu.school)}</h4>
                            <span style="font-size: 12px; color: #6b7280; font-weight: 500;">
                                ${escapeHtml(edu.startDate)} – ${edu.current ? 'Present' : escapeHtml(edu.endDate)}
                            </span>
                        </div>
                        <div style="font-size: 12px; color: #374151;">
                            <span style="font-weight: 600;">${escapeHtml(edu.degree)}</span>
                            ${edu.gpa ? `<span style="color: #6b7280;"> • GPA: ${escapeHtml(edu.gpa)}</span>` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    ` : '';

    // Skills
    const skillsHtml = skills.length > 0 ? `
        <div style="margin-bottom: 32px; page-break-inside: avoid;">
            ${SectionHeader('Skills', 'code')}
            <div>
                ${skills.map(skill => ProgressBar(skill.name, (skill.level || 3) * 20)).join('')}
            </div>
        </div>
    ` : '';

    // Languages (New)
    const languagesHtml = languages && languages.length > 0 ? `
        <div style="margin-bottom: 32px; page-break-inside: avoid;">
            ${SectionHeader('Languages', 'globe')}
            <div style="display: flex; flex-direction: column; gap: 8px;">
                ${languages.map(lang => `
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 12px; font-weight: 500;">${escapeHtml(lang.name)}</span>
                        <div style="display: flex; gap: 2px;">
                            ${[1, 2, 3, 4, 5].map(i => `
                                <div style="width: 24px; height: 6px; background-color: ${i <= (getLanguageLevel(lang) / 20) ? theme.primary : '#e5e7eb'}; border-radius: 2px;"></div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    ` : '';

    // Credentials
    const credentialsHtml = (certifications && certifications.length > 0) || (awards && awards.length > 0) ? `
        <div style="margin-bottom: 32px; page-break-inside: avoid;">
            ${SectionHeader('Credentials', 'award')}
            ${certifications && certifications.length > 0 ? `
                <div style="margin-bottom: ${awards && awards.length > 0 ? '16px' : '0'};">
                    <h4 style="font-size: 11px; font-weight: 600; color: #6b7280; margin-bottom: 8px;">Certifications</h4>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        ${certifications.map(cert => `
                            <div>
                                <div style="font-weight: 600; font-size: 12px;">${escapeHtml(cert.name)}</div>
                                <div style="font-size: 11px; color: #6b7280;">${escapeHtml(cert.issuer)} • ${escapeHtml(cert.date)}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
            ${awards && awards.length > 0 ? `
                <div>
                    <h4 style="font-size: 11px; font-weight: 600; color: #6b7280; margin-bottom: 8px;">Awards & Achievements</h4>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        ${awards.map(award => `
                            <div>
                                <div style="font-weight: 600; font-size: 12px;">${escapeHtml(award.title)}</div>
                                <div style="font-size: 11px; color: #6b7280;">${escapeHtml(award.issuer)} • ${escapeHtml(award.date)}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
        </div>
    ` : '';

    // HTML Construction
    return `
        <div style="width: 100%; min-height: 100%; font-family: ${bodyFont}; color: #1f2937; background-color: ${background?.color || '#ffffff'}; overflow: hidden; position: relative;">
            
            <!-- Diagonal Background -->
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 280px; background-color: ${theme.primary}; clip-path: polygon(0 0, 100% 0, 100% 65%, 0 100%); z-index: 0;"></div>
            
            <!-- Header Content -->
            <div style="position: relative; z-index: 10; padding: 40px 48px 20px 48px; display: flex; gap: 40px; align-items: flex-start;">
                
                <!-- Left: Photo -->
                <div style="flex-shrink: 0;">
                    ${profileImage}
                </div>

                <!-- Right: Name & Summary -->
                <div style="flex: 1; padding-top: 12px;">
                    <h1 style="font-family: ${headingFont}; font-size: 32px; font-weight: 800; color: #ffffff; line-height: 1.1; margin: 0 0 8px 0;">
                        ${escapeHtml(personalInfo.fullName)}
                    </h1>
                    <p style="font-family: ${headingFont}; font-size: 16px; color: rgba(255,255,255,0.9); font-weight: 500; margin: 0 0 16px 0;">
                        ${escapeHtml(personalInfo.jobTitle)}
                    </p>
                    <div style="font-size: 12px; color: rgba(255,255,255,0.85); line-height: 1.6; max-width: 90%;">
                        ${formatDescription(personalInfo.summary || '')}
                    </div>
                </div>
            </div>

            <!-- Two Column Layout -->
            <div style="display: flex; gap: 48px; padding: 20px 48px;">
                
                <!-- Left Sidebar (Contact, Skills, Languages) -->
                <div style="width: 30%; flex-shrink: 0;">
                    
                    <!-- Contact -->
                    <div style="margin-bottom: 32px;">
                        ${SectionHeader('Contact', 'phone')}
                        <div style="display: flex; flex-direction: column; gap: 12px; font-size: 11px;">
                            ${contactItems.map(item => `
                                <div style="display: flex; align-items: center; gap: 8px;">
                                    ${getIconSVG(item.icon as IconName, theme.primary, 14)}
                                    <span style="word-break: break-all;">${escapeHtml(item.value!)}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    ${skillsHtml}
                    ${languagesHtml}
                    ${credentialsHtml}

                </div>

                <!-- Main Content (Experience, Education) -->
                <div style="flex: 1;">
                    ${experienceHtml}
                    ${educationHtml}
                </div>
            </div>
        </div>
    `;
};

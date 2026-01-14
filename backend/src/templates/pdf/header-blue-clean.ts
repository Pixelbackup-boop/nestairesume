/**
 * Header Blue Clean Template
 * Ported from frontend/components/templates/layouts/header/HeaderBlueClean.tsx
 */

import { PdfResumeData, PdfTheme } from '../../types/pdf';
import {
    getFontFamily,
    fontSizes,
    getBackgroundCSS,
    escapeHtml,
    formatDescription,
    getIconSVG,
    IconName,
    getLanguageLevel
} from './shared/helpers';

export const renderHeaderBlueClean = (data: PdfResumeData, theme: PdfTheme): string => {
    const {
        personalInfo,
        experience = [],
        education = [],
        skills = [],
        languages = [],
        strengths = [],
        interests = [],
        fonts,
        background
    } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Roboto');
    const bodyFont = getFontFamily(fonts?.body || 'Open Sans');
    const bgStyle = getBackgroundCSS(background);

    // Fixed colors
    const headerBg = theme.primary || '#2563eb'; // Blue-600 defaults
    const textColor = theme.text || '#1f2937';

    // --- Helpers ---
    const SectionHeader = (title: string, icon: IconName) => `
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px; border-bottom: 2px solid ${theme.primary}20; padding-bottom: 8px;">
            <div style="background-color: ${theme.primary}15; color: ${theme.primary}; padding: 6px; border-radius: 6px;">
                 ${getIconSVG(icon, theme.primary, 18)}
            </div>
            <h3 style="font-family: ${headingFont}; font-size: 16px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: ${theme.heading}; margin: 0;">
                ${title}
            </h3>
        </div>
    `;

    // Profile Image
    const profileImage = personalInfo.profileImage ? `
        <div style="width: 140px; height: 140px; border-radius: 16px; border: 4px solid #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); overflow: hidden; transform: rotate(-3deg);">
            <img
                src="${personalInfo.profileImage}"
                alt="${escapeHtml(personalInfo.fullName)}"
                style="width: 100%; height: 100%; object-fit: cover; transform: rotate(3deg) scale(1.1);"
            />
        </div>
    ` : '';

    const contactItems = [
        { value: personalInfo.email, icon: 'email' },
        { value: personalInfo.phone, icon: 'phone' },
        { value: personalInfo.location, icon: 'location' },
        { value: personalInfo.linkedin, icon: 'linkedin' },
        { value: personalInfo.website, icon: 'website' }
    ].filter(item => item.value);

    return `
        <div style="width: 100%; min-height: 100%; font-family: ${bodyFont}; color: ${textColor}; ${bgStyle}">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, ${theme.primary}, ${theme.secondary}); color: white; padding: 48px 48px 64px 48px; clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);">
                <div style="display: flex; gap: 40px; align-items: center;">
                    ${profileImage}
                    <div style="flex: 1;">
                        <h1 style="font-family: ${headingFont}; font-size: 42px; font-weight: 800; line-height: 1.1; margin: 0 0 8px 0;">
                            ${escapeHtml(personalInfo.fullName || 'Your Name')}
                        </h1>
                        <p style="font-family: ${headingFont}; font-size: 18px; font-weight: 500; opacity: 0.9; margin: 0 0 24px 0;">
                            ${escapeHtml(personalInfo.jobTitle || 'Job Title')}
                        </p>

                        <div style="display: flex; flex-wrap: wrap; gap: 12px 24px;">
                            ${contactItems.map(item => `
                                <div style="display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 500;">
                                    ${getIconSVG(item.icon as IconName, '#ffffff', 14)}
                                    <span>${escapeHtml(item.value!)}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Content Two Columns -->
            <div style="display: flex; gap: 48px; padding: 0 48px; margin-top: -20px;">
                
                <!-- Main Column (Left) -->
                <div style="flex: 1; min-width: 0;">
                    
                    ${personalInfo.summary ? `
                        <div style="background: white; padding: 24px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); margin-bottom: 32px;">
                            <h3 style="font-family: ${headingFont}; font-size: 14px; font-weight: 700; text-transform: uppercase; color: ${theme.primary}; margin-bottom: 12px;">About Me</h3>
                            <p style="font-size: 13px; line-height: 1.6; color: #4b5563;">
                                ${formatDescription(personalInfo.summary)}
                            </p>
                        </div>
                    ` : ''}

                    ${experience.length > 0 ? `
                        <div style="margin-bottom: 32px;">
                            ${SectionHeader('Experience', 'briefcase')}
                            <div style="display: flex; flex-direction: column; gap: 24px;">
                                ${experience.map(exp => `
                                    <div style="position: relative; padding-left: 20px; border-left: 2px solid ${theme.primary}20;">
                                        <div style="position: absolute; left: -6px; top: 6px; width: 10px; height: 10px; border-radius: 50%; background: ${theme.primary}; border: 2px solid white;"></div>
                                        
                                        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
                                            <h4 style="font-family: ${headingFont}; font-size: 14px; font-weight: 700; color: ${theme.heading}; margin: 0;">${escapeHtml(exp.title)}</h4>
                                        </div>
                                        
                                        <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: 600; color: ${theme.primary}; margin-bottom: 8px;">
                                            <span>${escapeHtml(exp.company)}</span>
                                            <span>${escapeHtml(exp.startDate)} – ${exp.current ? 'Present' : escapeHtml(exp.endDate)}</span>
                                        </div>

                                        <div style="font-size: 12px; line-height: 1.6; color: #4b5563;">
                                            ${formatDescription(exp.description || '')}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}

                    ${education.length > 0 ? `
                        <div style="margin-bottom: 32px;">
                            ${SectionHeader('Education', 'graduation-cap')}
                            <div style="display: flex; flex-direction: column; gap: 16px;">
                                ${education.map(edu => `
                                    <div style="display: flex; gap: 16px; align-items: center;">
                                        <div style="width: 4px; height: 40px; background-color: ${theme.secondary}; border-radius: 2px;"></div>
                                        <div>
                                            <h4 style="font-family: ${headingFont}; font-size: 14px; font-weight: 700; color: ${theme.heading}; margin: 0;">${escapeHtml(edu.school)}</h4>
                                            <div style="font-size: 12px; color: #4b5563;">
                                                <span style="font-weight: 600; color: ${theme.primary};">${escapeHtml(edu.degree)}</span>
                                                <span style="color: #9ca3af;"> • ${escapeHtml(edu.startDate)} – ${edu.endDate}</span>
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>

                <!-- Sidebar (Right) -->
                <div style="width: 240px; flex-shrink: 0; padding-top: 20px;">
                    
                    ${skills.length > 0 ? `
                        <div style="margin-bottom: 40px;">
                            ${SectionHeader('Skills', 'code')}
                            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                                ${skills.map(skill => `
                                    <div style="background: white; border: 1px solid ${theme.primary}30; padding: 6px 12px; border-radius: 6px; font-size: 11px; font-weight: 600; color: ${theme.heading}; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                                        ${escapeHtml(skill.name)}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}

                    ${languages && languages.length > 0 ? `
                        <div style="margin-bottom: 40px;">
                            ${SectionHeader('Languages', 'globe')}
                            <div style="display: flex; flex-direction: column; gap: 12px;">
                                ${languages.map(lang => `
                                    <div>
                                        <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: 600; margin-bottom: 4px;">
                                            <span>${escapeHtml(lang.name)}</span>
                                            <span style="color: ${theme.primary};">${escapeHtml(lang.proficiency)}</span>
                                        </div>
                                        <div style="height: 6px; background: #e5e7eb; border-radius: 3px; overflow: hidden;">
                                            <div style="width: ${getLanguageLevel(lang)}%; height: 100%; background: ${theme.primary};"></div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}

                    ${interests && interests.length > 0 ? `
                        <div style="margin-bottom: 40px;">
                            ${SectionHeader('Interests', 'heart')}
                            <div style="display: flex; flex-direction: column; gap: 8px;">
                                ${interests.map(int => `
                                    <div style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: #4b5563;">
                                        <span style="color: ${theme.secondary};">●</span>
                                        ${escapeHtml(int.name)}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
};

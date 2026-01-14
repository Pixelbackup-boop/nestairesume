/**
 * Minimal Blue Sections Template
 * Ported from frontend/components/templates/layouts/minimal/MinimalBlueSections.tsx
 */

import { PdfResumeData, PdfTheme } from '../../types/pdf';
import {
    getFontFamily,
    fontSizes,
    getBackgroundCSS,
    escapeHtml,
    formatDescription,
} from './shared/helpers';

export const renderMinimalBlueSections = (data: PdfResumeData, theme: PdfTheme): string => {
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
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Theme
    const mainText = '#1f2937';
    // Use customThemeColor if available, otherwise default to Blue 500 (#3b82f6)
    const accentColor = data.customThemeColor || '#3b82f6';

    // Helper for Section Headers
    const SectionHeader = (title: string) => `
        <h3 style="font-family: ${headingFont}; font-size: 16px; font-weight: 700; color: #fff; text-transform: uppercase; background-color: ${accentColor}; padding: 4px 12px; margin-bottom: 16px; letter-spacing: 0.05em; border-radius: 2px;">
            ${title}
        </h3>
    `;

    // Helper for Contact Items
    const contactItems = [
        personalInfo.email,
        personalInfo.phone,
        personalInfo.location
    ].filter(Boolean);

    return `
        <div style="width: 100%; min-height: 100%; font-family: ${bodyFont}; font-size: ${sizeConfig.base}; background-color: #FFFFFF; color: ${mainText}; padding: 56px; box-sizing: border-box; display: flex; flex-direction: column;">
            
            <!-- Header -->
            <header style="margin-bottom: 56px; border-bottom: 2px solid ${accentColor}; padding-bottom: 24px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-end;">
                    <div>
                        <h1 style="font-family: ${headingFont}; font-size: 38px; font-weight: 700; color: #000; text-transform: uppercase; margin: 0 0 4px 0;">
                            ${escapeHtml(personalInfo.fullName || 'Your Name')}
                        </h1>
                        <p style="font-size: 16px; color: ${accentColor}; font-weight: 600; margin: 0;">
                            ${escapeHtml(personalInfo.jobTitle || 'Job Title')}
                        </p>
                    </div>
                    <!-- Contact - Compact Right -->
                    <div style="font-size: 12px; text-align: right; color: #4b5563; display: flex; flex-direction: column; gap: 2px;">
                        ${contactItems.map(item => `<span>${escapeHtml(item!)}</span>`).join('')}
                    </div>
                </div>
            </header>

            <!-- Profile -->
            ${personalInfo.summary ? `
                <section style="margin-bottom: 40px;">
                    ${SectionHeader('Profile')}
                    <p style="line-height: 1.6; font-size: 14px; color: #374151; padding-left: 8px;">
                        ${formatDescription(personalInfo.summary)}
                    </p>
                </section>
            ` : ''}

            <!-- Experience -->
            ${experience.length > 0 ? `
                <section style="margin-bottom: 40px;">
                    ${SectionHeader('Experience')}
                    <div style="display: flex; flex-direction: column; gap: 32px; padding-left: 8px;">
                        ${experience.map(exp => `
                            <div>
                                <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
                                    <h4 style="font-weight: 700; font-size: 14px; color: #000; margin: 0;">${escapeHtml(exp.title)}</h4>
                                    <span style="font-size: 12px; color: #4b5563;">${escapeHtml(exp.startDate)} – ${exp.current ? 'Present' : escapeHtml(exp.endDate)}</span>
                                </div>
                                <div style="font-size: 12px; color: ${accentColor}; font-weight: 600; margin-bottom: 4px;">
                                    ${escapeHtml(exp.company)}${exp.city ? `, ${escapeHtml(exp.city)}` : ''}
                                </div>
                                <div style="font-size: 14px; line-height: 1.6; color: #374151;">
                                    ${formatDescription(exp.description || '')}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </section>
            ` : ''}

            <!-- Two Column for Ed/Skills -->
            <div style="display: flex; gap: 32px;">
                <!-- Education -->
                ${education.length > 0 ? `
                    <div style="flex: 1;">
                        ${SectionHeader('Education')}
                        <div style="display: flex; flex-direction: column; gap: 16px; padding-left: 8px;">
                            ${education.map(edu => `
                                <div>
                                    <h4 style="font-weight: 700; font-size: 14px; color: #000; margin: 0;">${escapeHtml(edu.degree)}</h4>
                                    <div style="font-size: 14px; color: #4b5563;">${escapeHtml(edu.school)}, ${escapeHtml(edu.city)}</div>
                                    <div style="font-size: 12px; color: #6b7280;">${escapeHtml(edu.startDate)} – ${edu.endDate || 'Present'}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : '<div style="flex: 1;"></div>'}

                <!-- Skills -->
                ${skills.length > 0 ? `
                    <div style="flex: 1;">
                        ${SectionHeader('Skills')}
                        <div style="display: flex; flex-wrap: wrap; gap: 8px; padding-left: 8px;">
                            ${skills.map(skill => `
                                <span style="font-size: 12px; color: #000; background-color: #f3f4f6; padding: 4px 8px; border-radius: 4px;">
                                    ${escapeHtml(skill.name)}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                ` : '<div style="flex: 1;"></div>'}
            </div>

            <!-- Languages and Strengths Row -->
            ${(languages && languages.length > 0) || (strengths && strengths.length > 0) ? `
                <div style="display: flex; gap: 32px; margin-top: 40px;">
                    ${languages && languages.length > 0 ? `
                        <div style="flex: 1;">
                            ${SectionHeader('Languages')}
                            <div style="display: flex; flex-direction: column; gap: 8px; padding-left: 8px;">
                                ${languages.map(lang => `
                                    <div style="font-size: 14px; color: #374151;">
                                        <span style="font-weight: 600;">${escapeHtml(lang.name)}</span> 
                                        <span style="color: #6b7280; font-size: 12px;">(${escapeHtml(lang.proficiency)})</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : '<div style="flex: 1;"></div>'}

                    ${strengths && strengths.length > 0 ? `
                        <div style="flex: 1;">
                            ${SectionHeader('Strengths')}
                            <div style="display: flex; flex-wrap: wrap; gap: 8px; padding-left: 8px;">
                                ${strengths.map(str => `
                                    <span style="font-size: 12px; color: #000; background-color: #f3f4f6; padding: 4px 8px; border-radius: 4px;">
                                        ${escapeHtml(str.name)}
                                    </span>
                                `).join('')}
                            </div>
                        </div>
                    ` : '<div style="flex: 1;"></div>'}
                </div>
            ` : ''}

            <!-- Interests -->
            ${interests && interests.length > 0 ? `
                <section style="margin-top: 40px;">
                    ${SectionHeader('Interests')}
                    <p style="line-height: 1.6; font-size: 14px; color: #374151; padding-left: 8px;">
                        ${interests.map(i => escapeHtml(i.name)).join(' • ')}
                    </p>
                </section>
            ` : ''}

        </div>
    `;
};

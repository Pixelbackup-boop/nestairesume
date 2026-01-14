/**
 * Minimal Labels Tan Template
 * Ported from frontend/components/templates/layouts/minimal/MinimalLabelsTan.tsx
 */

import { PdfResumeData, PdfTheme } from '../../types/pdf';
import {
    getFontFamily,
    fontSizes,
    escapeHtml,
    formatDescription,
} from './shared/helpers';

export const renderMinimalLabelsTan = (data: PdfResumeData, theme: PdfTheme): string => {
    const {
        personalInfo,
        experience = [],
        education = [],
        skills = [],
        languages = [],
        strengths = [],
        interests = [],
        fonts
    } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Lato');
    const bodyFont = getFontFamily(fonts?.body || 'Lato');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Custom Colors for this template
    const mainBg = '#fdfbf7'; // Warm white/ivory
    const mainText = '#44403c'; // Stone 700
    const labelText = '#a8a29e'; // Stone 400

    // Helper for Row Layout
    const Row = (label: string, content: string) => `
        <div style="display: flex; margin-bottom: 0;">
            <div style="width: 30%; padding-right: 24px; flex-shrink: 0;">
                <h3 style="font-size: 12px; color: ${labelText}; margin: 0;">${label}</h3>
            </div>
            <div style="flex: 1;">
                ${content}
            </div>
        </div>
    `;

    return `
        <div style="width: 100%; min-height: 100%; font-family: ${bodyFont}; font-size: ${sizeConfig.base}; background-color: ${mainBg}; color: ${mainText}; padding: 64px; box-sizing: border-box; display: flex; flex-direction: column;">
            
            <!-- Header -->
            <header style="margin-left: 30%; margin-bottom: 64px;">
                <h1 style="font-family: ${headingFont}; font-size: 38px; font-weight: 400; color: #000; text-transform: lowercase; margin: 0 0 4px 0;">
                    ${escapeHtml(personalInfo.fullName || 'Your Name')}
                </h1>
                <p style="font-size: 16px; color: ${labelText}; font-weight: 400; text-transform: lowercase; margin-bottom: 16px;">
                    ${escapeHtml(personalInfo.jobTitle || 'Job Title')}
                </p>

                <!-- Contact -->
                <div style="font-size: 12px; display: flex; gap: 16px; color: ${labelText}; flex-wrap: wrap;">
                    ${[personalInfo.email, personalInfo.phone, personalInfo.location]
            .filter(Boolean)
            .map(item => `<span>${escapeHtml(item!)}</span>`)
            .join('')}
                </div>
            </header>

            <!-- Sections Wrapper -->
            <div style="display: flex; flex-direction: column; gap: 48px;">
                
                <!-- Profile -->
                ${personalInfo.summary ? Row('Profile', `
                    <p style="margin: 0; line-height: 1.6; font-size: 14px;">
                        ${formatDescription(personalInfo.summary)}
                    </p>
                `) : ''}

                <!-- Experience -->
                ${experience.length > 0 ? `
                    <div style="display: flex;">
                        <div style="width: 30%; padding-right: 24px; flex-shrink: 0;">
                            <h3 style="font-size: 12px; color: ${labelText}; margin: 0;">Experience</h3>
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 24px;">
                            ${experience.map(exp => `
                                <div>
                                    <h4 style="font-weight: 600; font-size: 14px; color: #000; margin: 0;">${escapeHtml(exp.title)}</h4>
                                    <div style="font-size: 14px; color: ${labelText}; margin-bottom: 8px;">
                                        ${escapeHtml(exp.company)}, ${escapeHtml(exp.startDate)}–${exp.current ? 'Present' : escapeHtml(exp.endDate)}
                                    </div>
                                    <p style="margin: 0; line-height: 1.6; font-size: 14px;">
                                        ${formatDescription(exp.description || '')}
                                    </p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Education -->
                ${education.length > 0 ? `
                    <div style="display: flex;">
                        <div style="width: 30%; padding-right: 24px; flex-shrink: 0;">
                            <h3 style="font-size: 12px; color: ${labelText}; margin: 0;">Education</h3>
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 16px;">
                            ${education.map(edu => `
                                <div>
                                    <h4 style="font-weight: 600; font-size: 14px; color: #000; margin: 0;">${escapeHtml(edu.degree)}</h4>
                                    <div style="font-size: 14px; color: ${labelText};">
                                        ${escapeHtml(edu.school)} | ${escapeHtml(edu.startDate)}–${edu.endDate || 'Present'}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Skills -->
                ${skills.length > 0 ? Row('Skills', `
                    <p style="margin: 0; line-height: 1.8; font-size: 14px;">
                        ${skills.map(skill => escapeHtml(skill.name)).join('  /  ')}
                    </p>
                `) : ''}

                <!-- Languages -->
                ${languages && languages.length > 0 ? Row('Languages', `
                    <p style="margin: 0; line-height: 1.8; font-size: 14px;">
                        ${languages.map(l => `${escapeHtml(l.name)} (${escapeHtml(l.proficiency)})`).join(', ')}
                    </p>
                `) : ''}

                <!-- Strengths -->
                ${strengths && strengths.length > 0 ? Row('Strengths', `
                    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                        ${strengths.map(str => `
                            <span style="font-size: 12px; color: ${mainText}; background-color: #f5f5f4; padding: 4px 8px; border-radius: 4px;">
                                ${escapeHtml(str.name)}
                            </span>
                        `).join('')}
                    </div>
                `) : ''}

                <!-- Interests -->
                ${interests && interests.length > 0 ? Row('Interests', `
                    <p style="margin: 0; line-height: 1.8; font-size: 14px;">
                        ${interests.map(i => escapeHtml(i.name)).join(', ')}
                    </p>
                `) : ''}

            </div>
        </div>
    `;
};

/**
 * Header Icon Sections Template
 * Ported from frontend/components/templates/layouts/header/HeaderIconSections.tsx
 *
 * Stacked sections where each section is enclosed in a box with a black border.
 * Distinctive Cyan background and Orange accents.
 */

import { PdfResumeData, PdfTheme } from '../../types/pdf';
import {
    getFontFamily,
    getBackgroundCSS,
    escapeHtml,
    formatDescription
} from './shared/helpers';

export const renderHeaderIconSections = (data: PdfResumeData, theme: PdfTheme): string => {
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
    const headingFont = getFontFamily(fonts?.heading || 'Merriweather');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    const bgStyle = getBackgroundCSS(background);

    // Colors
    const orangeAccent = data.customThemeColor || theme.primary || '#ea580c'; // Orange 600
    const pageBg = '#ecfeff'; // Cyan 50
    const borderColor = '#000000';

    // Dimensions
    const photoSize = 140;

    // Progress bar
    const ProgressBar = (label: string, value: number) => `
        <div style="margin-bottom: 12px;">
            <div style="font-size: 10pt; font-weight: 500; margin-bottom: 4px;">${escapeHtml(label)}</div>
            <div style="width: 100%; height: 8px; background-color: #e5e7eb; border-radius: 4px; overflow: hidden;">
                <div style="width: ${value}%; height: 100%; background-color: ${orangeAccent}; border-radius: 4px;"></div>
            </div>
        </div>
    `;

    // Box Section helper
    const BoxSection = (title: string, icon: string, content: string) => `
        <section style="border: 1px solid ${borderColor}; background-color: #ffffff; padding: 32px; margin-bottom: 32px; position: relative; box-shadow: 4px 4px 0px 0px rgba(0,0,0,0.1);">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 24px; border-bottom: 2px solid ${orangeAccent}; padding-bottom: 8px;">
                <span style="background-color: ${orangeAccent}; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px;">
                    ${icon}
                </span>
                <h3 style="font-family: ${headingFont}; font-size: 14px; font-weight: 700; text-transform: uppercase; color: #1f2937;">
                    ${title}
                </h3>
            </div>
            <div style="font-size: 10pt;">
                ${content}
            </div>
        </section>
    `;

    // Profile Image
    const profileImage = personalInfo.profileImage ? `
        <div style="width: ${photoSize}px; height: ${photoSize}px; border-radius: 50%; border: 2px solid ${orangeAccent}; padding: 4px; overflow: hidden; flex-shrink: 0;">
            <img
                src="${personalInfo.profileImage}"
                alt="${escapeHtml(personalInfo.fullName)}"
                style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;"
            />
        </div>
    ` : `
        <div style="width: ${photoSize}px; height: ${photoSize}px; border-radius: 50%; border: 2px solid ${orangeAccent}; display: flex; align-items: center; justify-content: center; font-size: 48px; color: ${orangeAccent}; background-color: #fff7ed; flex-shrink: 0;">
            ${escapeHtml(personalInfo.fullName?.charAt(0) || '?')}
        </div>
    `;

    return `
        <div style="width: 100%; min-height: 100%; font-family: ${bodyFont}; font-size: 10pt; background-color: ${pageBg}; color: #000000; padding: 32px; box-sizing: border-box; ${bgStyle}">

            <!-- Header Box -->
            <header style="display: flex; align-items: center; gap: 32px; border: 1px solid ${borderColor}; background-color: #ffffff; padding: 32px; margin-bottom: 32px; box-shadow: 4px 4px 0px 0px rgba(0,0,0,0.1);">

                <!-- Photo -->
                ${profileImage}

                <!-- Name & Contact -->
                <div style="flex: 1;">
                    <h1 style="font-family: ${headingFont}; font-size: 32px; font-weight: 700; color: #000000; margin-bottom: 8px; line-height: 1.1;">
                        ${escapeHtml(personalInfo.fullName || 'Your Name')}
                    </h1>
                    <p style="font-size: 14px; color: ${orangeAccent}; font-weight: 600; text-transform: uppercase; margin-bottom: 12px; letter-spacing: 0.05em;">
                        ${escapeHtml(personalInfo.jobTitle || 'Job Title')}
                    </p>

                    <div style="display: flex; flex-wrap: wrap; gap: 8px 16px; font-size: 10px; color: #4b5563;">
                        ${personalInfo.email ? `<span>&#9993; ${escapeHtml(personalInfo.email)}</span>` : ''}
                        ${personalInfo.phone ? `<span>&#128241; ${escapeHtml(personalInfo.phone)}</span>` : ''}
                        ${personalInfo.location ? `<span>&#128205; ${escapeHtml(personalInfo.location)}</span>` : ''}
                    </div>
                </div>
            </header>

            <!-- Profile Section -->
            ${personalInfo.summary ? BoxSection('Profile', '&#128100;', `<p style="line-height: 1.6;">${formatDescription(personalInfo.summary)}</p>`) : ''}

            <!-- Experience Section -->
            ${experience.length > 0 ? BoxSection('Experience', '&#128188;', `
                <div style="display: flex; flex-direction: column; gap: 24px;">
                    ${experience.map(exp => `
                        <div>
                            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
                                <h4 style="font-weight: 700; font-size: 11pt;">${escapeHtml(exp.title)}</h4>
                                <span style="font-size: 10px; font-weight: 600; color: ${orangeAccent};">
                                    ${escapeHtml(exp.startDate)} – ${exp.current ? 'Present' : escapeHtml(exp.endDate)}
                                </span>
                            </div>
                            <p style="font-size: 10pt; font-style: italic; margin-bottom: 6px; color: #525252;">
                                ${escapeHtml(exp.company)}, ${escapeHtml(exp.city)}
                            </p>
                            <p style="font-size: 10pt; line-height: 1.5;">
                                ${formatDescription(exp.description || '')}
                            </p>
                        </div>
                    `).join('')}
                </div>
            `) : ''}

            <!-- Education Section -->
            ${education.length > 0 ? BoxSection('Education', '&#127891;', `
                <div style="display: flex; flex-direction: column; gap: 20px;">
                    ${education.map(edu => `
                        <div>
                            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
                                <h4 style="font-weight: 700; font-size: 11pt;">${escapeHtml(edu.degree)}</h4>
                                <span style="font-size: 10px; font-weight: 600; color: ${orangeAccent};">
                                    ${escapeHtml(edu.startDate)} – ${edu.endDate || 'Present'}
                                </span>
                            </div>
                            <p style="font-size: 10pt; font-style: italic; color: #525252;">
                                ${escapeHtml(edu.school)}, ${escapeHtml(edu.city)}
                            </p>
                        </div>
                    `).join('')}
                </div>
            `) : ''}

            <!-- Skills & Strengths Row -->
            <div style="display: flex; gap: 32px;">
                <!-- Skills Section -->
                ${skills.length > 0 ? `
                    <div style="flex: 1;">
                        ${BoxSection('Skills', '&#9881;', `
                            <div>
                                ${skills.map(skill => ProgressBar(skill.name, skill.level ? skill.level * 20 : 80)).join('')}
                            </div>
                        `)}
                    </div>
                ` : ''}

                <!-- Strengths Section -->
                ${strengths && strengths.length > 0 ? `
                    <div style="flex: 1;">
                        ${BoxSection('Strengths', '&#11088;', `
                            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                                ${strengths.map(str => `
                                    <span style="background-color: #fff7ed; color: ${orangeAccent}; border: 1px solid ${orangeAccent}; padding: 4px 12px; border-radius: 4px; font-size: 10px; font-weight: 600;">
                                        ${escapeHtml(str.name)}
                                    </span>
                                `).join('')}
                            </div>
                        `)}
                    </div>
                ` : ''}
            </div>

            <!-- Languages & Interests Row -->
            <div style="display: flex; gap: 32px;">
                <!-- Languages Section -->
                ${languages && languages.length > 0 ? `
                    <div style="flex: 1;">
                        ${BoxSection('Languages', '&#128483;', `
                            <div style="display: flex; flex-direction: column; gap: 8px;">
                                ${languages.map(lang => `
                                    <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #f3f4f6; padding-bottom: 4px;">
                                        <span style="font-weight: 600;">${escapeHtml(lang.name)}</span>
                                        <span style="color: #6b7280;">${escapeHtml(lang.proficiency)}</span>
                                    </div>
                                `).join('')}
                            </div>
                        `)}
                    </div>
                ` : ''}

                <!-- Interests Section -->
                ${interests && interests.length > 0 ? `
                    <div style="flex: 1;">
                        ${BoxSection('Interests', '&#127912;', `
                            <div style="display: flex; flex-wrap: wrap; gap: 12px;">
                                ${interests.map(int => `
                                    <span style="display: flex; align-items: center; gap: 6px;">
                                        <span style="color: ${orangeAccent};">&#9733;</span> ${escapeHtml(int.name)}
                                    </span>
                                `).join('')}
                            </div>
                        `)}
                    </div>
                ` : ''}
            </div>
        </div>
    `;
};

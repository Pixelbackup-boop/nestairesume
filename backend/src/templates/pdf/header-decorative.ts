/**
 * Header Decorative Template
 * Ported from frontend/components/templates/layouts/header/HeaderDecorative.tsx
 *
 * Dark header with subtle geometric line pattern.
 * Photo overlaps the bottom edge of the header on the left.
 */

import { PdfResumeData, PdfTheme } from '../../types/pdf';
import {
    getFontFamily,
    getBackgroundCSS,
    escapeHtml,
    formatDescription
} from './shared/helpers';

export const renderHeaderDecorative = (data: PdfResumeData, theme: PdfTheme): string => {
    const {
        personalInfo,
        experience = [],
        education = [],
        skills = [],
        languages = [],
        strengths = [],
        interests = [],
        awards = [],
        certifications = [],
        fonts,
        background
    } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Merriweather');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    const bgStyle = getBackgroundCSS(background);

    // Colors
    const headerBg = '#1f1f1f'; // Dark Grey/Black
    const accentColor = data.customThemeColor || theme.primary || '#eab308'; // Yellow 500

    // Dimensions
    const headerHeight = 180;
    const photoSize = 150;
    const photoOffset = photoSize / 3;

    // Helper for Section Headers
    const SectionHeader = (title: string, icon: string) => `
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px; border-bottom: 2px solid #f3f4f6; padding-bottom: 8px;">
            <span style="font-size: 14px;">${icon}</span>
            <h3 style="font-family: ${headingFont}; font-size: 14px; font-weight: 800; color: #111827; text-transform: uppercase; letter-spacing: 0.05em;">
                ${title}
            </h3>
        </div>
    `;

    // Progress bar with striped pattern
    const StripedProgressBar = (label: string, value: number) => `
        <div style="margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px; font-size: 10pt;">
                <span style="font-weight: 500;">${escapeHtml(label)}</span>
            </div>
            <div style="width: 100%; height: 6px; background-color: #f3f4f6; border-radius: 3px; overflow: hidden;">
                <div style="width: ${value}%; height: 100%; background-color: ${accentColor}; border-radius: 3px;"></div>
            </div>
        </div>
    `;

    // Profile Image
    const profileImage = personalInfo.profileImage ? `
        <img
            src="${personalInfo.profileImage}"
            alt="${escapeHtml(personalInfo.fullName)}"
            style="width: 100%; height: 100%; object-fit: cover;"
        />
    ` : `
        <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 48px; color: #9ca3af; background-color: #e5e7eb;">
            ${escapeHtml(personalInfo.fullName?.charAt(0) || '?')}
        </div>
    `;

    return `
        <div style="width: 100%; min-height: 100%; font-family: ${bodyFont}; font-size: 10pt; background-color: #ffffff; color: #374151; position: relative; box-sizing: border-box; ${bgStyle}">

            <!-- Header Area -->
            <header style="height: ${headerHeight}px; background-color: ${headerBg}; position: relative; margin-bottom: ${photoOffset + 40}px; overflow: visible;">

                <!-- Decorative Pattern (SVG) -->
                <svg style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.1; pointer-events: none;">
                    <pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                        <circle cx="20" cy="20" r="18" fill="none" stroke="white" stroke-width="1"/>
                    </pattern>
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"/>
                </svg>

                <div style="padding: 32px 40px; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: flex-end; position: relative; z-index: 10;">
                    <h1 style="font-family: ${headingFont}; font-size: 32px; font-weight: 700; color: white; text-align: right; margin-bottom: 4px; letter-spacing: 0.05em;">
                        ${escapeHtml(personalInfo.fullName || 'Your Name')}
                    </h1>
                    <p style="font-size: 14px; color: ${accentColor}; font-weight: 600; text-transform: uppercase; text-align: right; margin-bottom: 12px;">
                        ${escapeHtml(personalInfo.jobTitle || 'Job Title')}
                    </p>

                    <div style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: flex-end; color: #d1d5db; font-size: 10px;">
                        ${personalInfo.email ? `<span>${escapeHtml(personalInfo.email)}</span>` : ''}
                        ${personalInfo.phone ? `<span>${escapeHtml(personalInfo.phone)}</span>` : ''}
                        ${personalInfo.location ? `<span>${escapeHtml(personalInfo.location)}</span>` : ''}
                        ${personalInfo.website ? `<span>${escapeHtml(personalInfo.website)}</span>` : ''}
                    </div>
                </div>

                <!-- Overlapping Photo (Left Aligned) -->
                <div style="position: absolute; bottom: -${photoOffset}px; left: 40px; width: ${photoSize}px; height: ${photoSize}px; border-radius: 50%; border: 6px solid #ffffff; overflow: hidden; background-color: #e5e7eb; z-index: 20;">
                    ${profileImage}
                </div>
            </header>

            <!-- Main Content Body -->
            <div style="display: flex; gap: 40px; padding: 0 40px 40px;">

                <!-- Main Column (Left) -->
                <div style="width: 60%;">

                    ${personalInfo.summary ? `
                        <section style="margin-bottom: 32px;">
                            ${SectionHeader('Profile', '&#128100;')}
                            <p style="line-height: 1.6; font-size: 10pt;">${formatDescription(personalInfo.summary)}</p>
                        </section>
                    ` : ''}

                    ${experience.length > 0 ? `
                        <section style="margin-bottom: 32px;">
                            ${SectionHeader('Experience', '&#128188;')}
                            <div style="display: flex; flex-direction: column; gap: 24px;">
                                ${experience.map(exp => `
                                    <div>
                                        <div style="display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 2px;">
                                            <h4 style="font-weight: 700; font-size: 11pt; color: #111827;">${escapeHtml(exp.title)}</h4>
                                            <span style="font-size: 9pt; color: #6b7280; font-style: italic;">
                                                ${escapeHtml(exp.startDate)} – ${exp.current ? 'Present' : escapeHtml(exp.endDate)}
                                            </span>
                                        </div>
                                        <p style="font-size: 10pt; font-weight: 500; color: ${accentColor}; margin-bottom: 4px;">
                                            ${escapeHtml(exp.company)}, ${escapeHtml(exp.city)}
                                        </p>
                                        <p style="font-size: 10pt; line-height: 1.5;">
                                            ${formatDescription(exp.description || '')}
                                        </p>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    ${education.length > 0 ? `
                        <section style="margin-bottom: 32px;">
                            ${SectionHeader('Education', '&#127891;')}
                            <div style="display: flex; flex-direction: column; gap: 16px;">
                                ${education.map(edu => `
                                    <div>
                                        <h4 style="font-weight: 700; font-size: 11pt; color: #111827;">${escapeHtml(edu.degree)}</h4>
                                        <p style="font-size: 10pt; font-weight: 500; color: ${accentColor};">
                                            ${escapeHtml(edu.school)}, ${escapeHtml(edu.city)}
                                        </p>
                                        <p style="font-size: 9pt; color: #6b7280;">
                                            ${escapeHtml(edu.startDate)} – ${edu.endDate || 'Present'}
                                        </p>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}
                </div>

                <!-- Sidebar (Right) -->
                <div style="width: 35%;">

                    <!-- Skills -->
                    ${skills.length > 0 ? `
                        <section style="margin-bottom: 32px;">
                            ${SectionHeader('Skills', '&#128736;')}
                            <div>
                                ${skills.map(skill => StripedProgressBar(skill.name, (skill.level || 3) * 20)).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Languages -->
                    ${languages && languages.length > 0 ? `
                        <section style="margin-bottom: 32px;">
                            ${SectionHeader('Languages', '&#128483;')}
                            <div style="display: flex; flex-direction: column; gap: 8px;">
                                ${languages.map(lang => `
                                    <div style="display: flex; justify-content: space-between; font-size: 10pt;">
                                        <span style="font-weight: 500;">${escapeHtml(lang.name)}</span>
                                        <span style="font-size: 9pt; color: #6b7280;">${escapeHtml(lang.proficiency)}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Strengths -->
                    ${strengths && strengths.length > 0 ? `
                        <section style="margin-bottom: 32px;">
                            ${SectionHeader('Strengths', '&#9889;')}
                            <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                                ${strengths.map(str => `
                                    <span style="font-size: 9pt; font-weight: 600; color: ${accentColor}; border: 1px solid ${accentColor}; padding: 2px 8px; border-radius: 12px;">
                                        ${escapeHtml(str.name)}
                                    </span>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Interests -->
                    ${interests && interests.length > 0 ? `
                        <section style="margin-bottom: 32px;">
                            ${SectionHeader('Interests', '&#11088;')}
                            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                                ${interests.map(int => `
                                    <span style="font-size: 9pt; background-color: #f3f4f6; padding: 4px 8px; border-radius: 4px; color: #374151; border-left: 3px solid ${accentColor};">
                                        ${escapeHtml(int.name)}
                                    </span>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Credentials -->
                    ${(certifications && certifications.length > 0) || (awards && awards.length > 0) ? `
                        <section style="margin-bottom: 32px;">
                            ${SectionHeader('Credentials', '&#127942;')}
                            ${certifications && certifications.length > 0 ? `
                                <div style="margin-bottom: ${awards && awards.length > 0 ? '16px' : '0'};">
                                    <h4 style="font-size: 9pt; font-weight: 600; color: #6b7280; margin-bottom: 8px;">Certifications</h4>
                                    <div style="display: flex; flex-direction: column; gap: 12px;">
                                        ${certifications.map(cert => `
                                            <div style="font-size: 10pt;">
                                                <p style="font-weight: 700; color: #111827;">${escapeHtml(cert.name)}</p>
                                                <p style="font-size: 9pt; color: #6b7280;">
                                                    ${escapeHtml(cert.issuer)} • ${escapeHtml(cert.date)}
                                                </p>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}
                            ${awards && awards.length > 0 ? `
                                <div>
                                    <h4 style="font-size: 9pt; font-weight: 600; color: #6b7280; margin-bottom: 8px;">Awards & Achievements</h4>
                                    <div style="display: flex; flex-direction: column; gap: 12px;">
                                        ${awards.map(awr => `
                                            <div style="font-size: 10pt;">
                                                <p style="font-weight: 700; color: #111827;">${escapeHtml(awr.title)}</p>
                                                <p style="font-size: 9pt; color: #6b7280;">
                                                    ${escapeHtml(awr.issuer)} • ${escapeHtml(awr.date)}
                                                </p>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}
                        </section>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
};

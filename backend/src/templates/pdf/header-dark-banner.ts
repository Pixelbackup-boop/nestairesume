/**
 * Header Dark Banner Template
 * Ported from frontend/components/templates/layouts/header/HeaderDarkBanner.tsx
 *
 * Features a bold black header banner with name left and circular photo right.
 * Two-column body with experience on left, skills/languages/strengths/interests on right.
 */

import { PdfResumeData, PdfTheme } from '../../types/pdf';
import {
    getFontFamily,
    getBackgroundCSS,
    escapeHtml,
    formatDescription,
    getLanguageLevel,
    parseDualColor,
    getContrastText
} from './shared/helpers';

export const renderHeaderDarkBanner = (data: PdfResumeData, theme: PdfTheme): string => {
    const {
        personalInfo,
        experience = [],
        education = [],
        skills = [],
        languages = [],
        strengths = [],
        interests = [],
        certifications = [],
        awards = [],
        fonts,
        background
    } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Inter');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    const bgStyle = getBackgroundCSS(background);

    // Parse dual color: primary = header bg, secondary = accent
    const { primary: headerBgColor, secondary: accentColor } = parseDualColor(
        data.customThemeColor,
        { primary: '#0f172a', secondary: '#f59e0b' } // Slate 900 + Amber 500 defaults
    );

    // Auto-calculate header text color based on background
    const headerText = getContrastText(headerBgColor);
    const headerTextMuted = headerText === '#f8fafc' ? '#d1d5db' : '#6b7280';

    // Helper for Section Headers
    const SectionHeader = (title: string) => `
        <h3 style="font-family: ${headingFont}; font-size: 13px; font-weight: 500; color: ${accentColor}; margin-bottom: 12px;">
            ${title}
        </h3>
    `;

    // Helper for circular progress (languages)
    const CircularProgress = (value: number, label: string) => {
        const radius = 28;
        const circumference = 2 * Math.PI * radius;
        const strokeDashoffset = circumference - (value / 100) * circumference;
        return `
            <div style="display: flex; flex-direction: column; align-items: center; width: 70px;">
                <svg width="70" height="70" viewBox="0 0 70 70">
                    <circle cx="35" cy="35" r="${radius}" fill="none" stroke="#e5e7eb" stroke-width="3"/>
                    <circle cx="35" cy="35" r="${radius}" fill="none" stroke="#374151" stroke-width="3"
                        stroke-dasharray="${circumference}" stroke-dashoffset="${strokeDashoffset}"
                        transform="rotate(-90 35 35)" stroke-linecap="round"/>
                    <text x="35" y="40" text-anchor="middle" font-size="16px" fill="#374151" font-weight="600">${value}%</text>
                </svg>
                <span style="font-size: 10px; color: #4b5563; margin-top: 4px; text-align: center;">${escapeHtml(label)}</span>
            </div>
        `;
    };

    // Helper for progress bars (skills)
    const ProgressBar = (label: string, value: number) => `
        <div style="margin-bottom: 10px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                <span style="font-size: 10px; font-weight: 500; color: #374151;">${escapeHtml(label)}</span>
            </div>
            <div style="width: 100%; height: 6px; background-color: #e5e7eb; border-radius: 3px;">
                <div style="width: ${value}%; height: 100%; background-color: ${accentColor}; border-radius: 3px;"></div>
            </div>
        </div>
    `;

    // Interest icon helper
    const getInterestIcon = (name: string): string => {
        const nameLower = name.toLowerCase();
        if (nameLower.includes('music') || nameLower.includes('rock')) return '&#127925;';
        if (nameLower.includes('football') || nameLower.includes('soccer')) return '&#9917;';
        if (nameLower.includes('photo')) return '&#128247;';
        if (nameLower.includes('hiking') || nameLower.includes('hike')) return '&#129406;';
        if (nameLower.includes('biking') || nameLower.includes('bike') || nameLower.includes('cycling')) return '&#128692;';
        if (nameLower.includes('tennis')) return '&#127934;';
        if (nameLower.includes('travel')) return '&#9992;';
        if (nameLower.includes('reading') || nameLower.includes('book')) return '&#128218;';
        if (nameLower.includes('cooking') || nameLower.includes('food')) return '&#127859;';
        if (nameLower.includes('gaming') || nameLower.includes('game')) return '&#127918;';
        if (nameLower.includes('film') || nameLower.includes('movie')) return '&#127916;';
        if (nameLower.includes('art') || nameLower.includes('paint')) return '&#127912;';
        if (nameLower.includes('yoga') || nameLower.includes('meditation')) return '&#129495;';
        if (nameLower.includes('swim')) return '&#127946;';
        if (nameLower.includes('run')) return '&#127939;';
        return '&#11088;';
    };

    // Profile Image
    const profileImage = personalInfo.profileImage ? `
        <img
            src="${personalInfo.profileImage}"
            alt="${escapeHtml(personalInfo.fullName)}"
            style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 3px solid ${headerText};"
        />
    ` : '';

    return `
        <div style="width: 100%; min-height: 100%; font-family: ${bodyFont}; font-size: 10pt; background-color: #ffffff; box-sizing: border-box; ${bgStyle}">

            <!-- Dark Header Banner -->
            <header style="background-color: ${headerBgColor}; height: 160px; padding: 24px 32px; display: flex; justify-content: space-between; align-items: center;">

                <!-- Left: Name and Contact -->
                <div>
                    <h1 style="font-family: ${headingFont}; font-size: 28px; font-weight: 400; color: ${headerText}; letter-spacing: 0.02em; margin-bottom: 12px;">
                        ${escapeHtml(personalInfo.fullName || 'Your Name')}
                    </h1>
                    <div style="display: flex; gap: 16px; font-size: 10px; color: ${headerTextMuted}; flex-wrap: wrap;">
                        ${personalInfo.phone ? `<span>&#128241; ${escapeHtml(personalInfo.phone)}</span>` : ''}
                        ${personalInfo.email ? `<span>&#9993; ${escapeHtml(personalInfo.email)}</span>` : ''}
                        ${personalInfo.website ? `<span>&#127760; ${escapeHtml(personalInfo.website)}</span>` : ''}
                    </div>
                </div>

                <!-- Right: Profile Photo -->
                ${profileImage}
            </header>

            <!-- Two-Column Body -->
            <div style="display: flex; padding: 24px; gap: 24px;">

                <!-- LEFT COLUMN - Summary, Experience, Education -->
                <div style="width: 55%;">

                    <!-- Resume Summary -->
                    ${personalInfo.summary ? `
                        <section style="margin-bottom: 20px;">
                            ${SectionHeader('Resume summary')}
                            <p style="color: #374151; line-height: 1.6; font-size: 10pt;">
                                ${formatDescription(personalInfo.summary)}
                            </p>
                        </section>
                    ` : ''}

                    <!-- Work Experience -->
                    ${experience.length > 0 ? `
                        <section style="margin-bottom: 20px;">
                            ${SectionHeader('Work experience')}
                            <div style="display: flex; flex-direction: column; gap: 16px;">
                                ${experience.map(exp => `
                                    <div>
                                        <p style="font-size: 9px; color: ${accentColor}; margin-bottom: 2px;">
                                            &#128197; ${escapeHtml(exp.startDate)} – ${exp.current ? 'PRESENT' : escapeHtml(exp.endDate)}
                                            ${exp.city ? ` &#128205; ${escapeHtml(exp.city.toUpperCase())}` : ''}
                                        </p>
                                        <h4 style="font-weight: 700; font-size: 11pt; color: #1f2937; margin-bottom: 2px;">
                                            ${escapeHtml(exp.title)}
                                        </h4>
                                        <p style="font-size: 10pt; color: #4b5563; font-weight: 600; margin-bottom: 4px;">
                                            ${escapeHtml(exp.company)}
                                        </p>
                                        ${exp.description ? `
                                            <ul style="padding-left: 16px; margin: 0; list-style: disc;">
                                                ${exp.description.split('\n').filter(Boolean).map(line => `
                                                    <li style="font-size: 9pt; color: #4b5563; margin-bottom: 2px; line-height: 1.5;">
                                                        ${escapeHtml(line.replace(/^[-•]\s*/, ''))}
                                                    </li>
                                                `).join('')}
                                            </ul>
                                        ` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Education -->
                    ${education.length > 0 ? `
                        <section style="margin-bottom: 20px;">
                            ${SectionHeader('Education')}
                            <div style="display: flex; flex-direction: column; gap: 12px;">
                                ${education.map(edu => `
                                    <div>
                                        <p style="font-size: 9px; color: ${accentColor}; margin-bottom: 2px;">
                                            &#128197; ${escapeHtml(edu.startDate)}
                                            ${edu.city ? ` &#128205; ${escapeHtml(edu.city.toUpperCase())}` : ''}
                                        </p>
                                        <h4 style="font-weight: 700; font-size: 11pt; color: #1f2937; margin-bottom: 2px;">
                                            ${escapeHtml(edu.degree)}
                                        </h4>
                                        <p style="font-size: 10pt; color: #4b5563; font-weight: 600;">
                                            ${escapeHtml(edu.school)}
                                        </p>
                                        ${edu.description ? `
                                            <p style="font-size: 9pt; color: #6b7280; margin-top: 4px;">
                                                ${formatDescription(edu.description)}
                                            </p>
                                        ` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}
                </div>

                <!-- RIGHT COLUMN - Skills, Languages, Strengths, Interests -->
                <div style="width: 45%;">

                    <!-- Skills with Progress Bars -->
                    ${skills.length > 0 ? `
                        <section style="margin-bottom: 20px;">
                            ${SectionHeader('Skills')}
                            <p style="font-size: 8px; color: #6b7280; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">
                                &#128187; SOFTWARE
                            </p>
                            <div>
                                ${skills.map(skill => ProgressBar(skill.name, skill.level * 20)).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Languages with Circular Indicators -->
                    ${languages && languages.length > 0 ? `
                        <section style="margin-bottom: 20px;">
                            ${SectionHeader('Languages')}
                            <div style="display: flex; gap: 16px; flex-wrap: wrap;">
                                ${languages.slice(0, 3).map(lang => CircularProgress(getLanguageLevel(lang), lang.name)).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Strengths as Pill Badges -->
                    ${strengths && strengths.length > 0 ? `
                        <section style="margin-bottom: 20px;">
                            ${SectionHeader('Strengths')}
                            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                                ${strengths.map(strength => `
                                    <span style="background-color: ${accentColor}; color: ${getContrastText(accentColor)}; padding: 4px 12px; border-radius: 4px; font-size: 10px; font-weight: 500;">
                                        ${escapeHtml(strength.name)}
                                    </span>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Interests with Icons -->
                    ${interests && interests.length > 0 ? `
                        <section style="margin-bottom: 20px;">
                            ${SectionHeader('Interests')}
                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
                                ${interests.slice(0, 6).map(interest => `
                                    <div style="text-align: center;">
                                        <div style="font-size: 28px; margin-bottom: 4px;">
                                            ${interest.icon || getInterestIcon(interest.name)}
                                        </div>
                                        <div style="font-size: 9px; color: #4b5563;">
                                            ${escapeHtml(interest.name)}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Credentials -->
                    ${(certifications && certifications.length > 0) || (awards && awards.length > 0) ? `
                        <section>
                            ${SectionHeader('Credentials')}
                            ${certifications && certifications.length > 0 ? `
                                <div style="margin-bottom: ${awards && awards.length > 0 ? '16px' : '0'};">
                                    <h4 style="font-size: 10px; font-weight: 600; color: #6b7280; margin-bottom: 8px; text-transform: uppercase;">Certifications</h4>
                                    <div style="display: flex; flex-direction: column; gap: 8px;">
                                        ${certifications.map(cert => `
                                            <div>
                                                <div style="font-weight: 600; font-size: 10pt; color: #1f2937;">${escapeHtml(cert.name)}</div>
                                                <div style="font-size: 9px; color: #6b7280;">${escapeHtml(cert.issuer)} • ${escapeHtml(cert.date)}</div>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}
                            ${awards && awards.length > 0 ? `
                                <div>
                                    <h4 style="font-size: 10px; font-weight: 600; color: #6b7280; margin-bottom: 8px; text-transform: uppercase;">Awards & Achievements</h4>
                                    <div style="display: flex; flex-direction: column; gap: 8px;">
                                        ${awards.map(award => `
                                            <div>
                                                <div style="font-weight: 600; font-size: 10pt; color: #1f2937;">${escapeHtml(award.title)}</div>
                                                <div style="font-size: 9px; color: #6b7280;">${escapeHtml(award.issuer)} • ${escapeHtml(award.date)}</div>
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

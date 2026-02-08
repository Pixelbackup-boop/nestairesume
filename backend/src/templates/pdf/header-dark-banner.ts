/**
 * Header Dark Banner Template
 * Ported from frontend/components/templates/layouts/header/HeaderDarkBanner.tsx
 *
 * Features a bold black header banner with name left and circular photo right.
 * Two-column body with experience on left, skills/languages/strengths/interests on right.
 */

import { PdfResumeData, PdfTheme, PdfTranslations } from '../../types/pdf';
import { getTranslations } from './shared/translations';
import { formatLocalizedDate } from './shared/dateUtils';
import {
    getFontFamily,
    escapeHtml,
    formatDescription,
    getLanguageLevel,
    parseDualColor,
    getContrastText,
    getFontScale
} from './shared/helpers';

export const renderHeaderDarkBanner = (
    data: PdfResumeData,
    theme: PdfTheme,
    translations?: PdfTranslations,
    locale: string = 'en'
): string => {
    const t = getTranslations(translations);
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
        customFields = [],
        fonts
    } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Inter');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');

    // Font Scaling
    const scale = getFontScale(fonts?.size);
    const s = (px: number) => `${Math.max(5, Math.round(px * scale))}px`;

    // Note: header-dark-banner always uses white body background; only header uses dual color

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
        <h3 style="font-family: ${headingFont}; font-size: ${s(13)}; font-weight: 500; color: ${accentColor}; margin-bottom: 12px;">
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
                    <text x="35" y="40" text-anchor="middle" font-size="${s(16)}" fill="#374151" font-weight="600">${value}%</text>
                </svg>
                <span style="font-size: ${s(10)}; color: #4b5563; margin-top: 4px; text-align: center;">${escapeHtml(label)}</span>
            </div>
        `;
    };

    // Helper for progress bars (skills)
    const ProgressBar = (label: string, value: number) => `
        <div style="margin-bottom: 10px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                <span style="font-size: ${s(10)}; font-weight: 500; color: #374151;">${escapeHtml(label)}</span>
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
        <div style="width: 100%; min-height: 100%; font-family: ${bodyFont}; font-size: ${s(13)}; background-color: #ffffff; box-sizing: border-box;">

            <!-- Dark Header Banner -->
            <header style="background-color: ${headerBgColor}; height: 160px; padding: 24px 32px; display: flex; justify-content: space-between; align-items: center;">

                <!-- Left: Name and Contact -->
                <div>
                    <h1 style="font-family: ${headingFont}; font-size: ${s(28)}; font-weight: 400; color: ${headerText}; letter-spacing: 0.02em; margin-bottom: 12px;">
                        ${escapeHtml(personalInfo.fullName || 'Your Name')}
                    </h1>
                    <div style="display: flex; gap: 16px; font-size: ${s(10)}; color: ${headerTextMuted}; flex-wrap: wrap;">
                        ${personalInfo.phone ? `<span>&#128241; ${escapeHtml(personalInfo.phone)}</span>` : ''}
                        ${personalInfo.email ? `<span>&#9993; ${escapeHtml(personalInfo.email)}</span>` : ''}
                        ${personalInfo.location ? `<span>&#128205; ${escapeHtml(personalInfo.location)}</span>` : ''}
                        ${personalInfo.website ? `<span>&#127760; ${escapeHtml(personalInfo.website)}</span>` : ''}
                        ${personalInfo.linkedin ? `<span>&#128279; ${escapeHtml(personalInfo.linkedin)}</span>` : ''}
                        ${personalInfo.github ? `<span>&#128187; ${escapeHtml(personalInfo.github)}</span>` : ''}
                        ${personalInfo.x ? `<span>&#128038; ${escapeHtml(personalInfo.x)}</span>` : ''}
                        ${personalInfo.dribbble ? `<span>&#127936; ${escapeHtml(personalInfo.dribbble)}</span>` : ''}
                        ${personalInfo.behance ? `<span>&#127912; ${escapeHtml(personalInfo.behance)}</span>` : ''}
                        ${personalInfo.instagram ? `<span>&#128247; ${escapeHtml(personalInfo.instagram)}</span>` : ''}
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
                            ${SectionHeader(t.sections.summary)}
                            <p style="color: #374151; line-height: 1.6; font-size: ${s(13)};">
                                ${formatDescription(personalInfo.summary)}
                            </p>
                        </section>
                    ` : ''}

                    <!-- Work Experience -->
                    ${experience.length > 0 ? `
                        <section style="margin-bottom: 20px;">
                            ${SectionHeader(t.sections.workExperience)}
                            <div style="display: flex; flex-direction: column; gap: 16px;">
                                ${experience.map(exp => `
                                    <div>
                                        <p style="font-size: ${s(9)}; color: ${accentColor}; margin-bottom: 2px;">
                                            &#128197; ${formatLocalizedDate(exp.startDate, locale)} – ${exp.current ? t.labels.present.toUpperCase() : formatLocalizedDate(exp.endDate, locale)}
                                            ${exp.city ? ` &#128205; ${escapeHtml(exp.city.toUpperCase())}` : ''}
                                        </p>
                                        <h4 style="font-weight: 700; font-size: ${s(15)}; color: #1f2937; margin-bottom: 2px;">
                                            ${escapeHtml(exp.title)}
                                        </h4>
                                        <p style="font-size: ${s(13)}; color: #4b5563; font-weight: 600; margin-bottom: 4px;">
                                            ${escapeHtml(exp.company)}
                                        </p>
                                        ${exp.description ? `
                                            <ul style="padding-left: 16px; margin: 0; list-style: disc;">
                                                ${exp.description.split('\n').filter(Boolean).map(line => `
                                                    <li style="font-size: ${s(12)}; color: #4b5563; margin-bottom: 2px; line-height: 1.5;">
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
                            ${SectionHeader(t.sections.education)}
                            <div style="display: flex; flex-direction: column; gap: 12px;">
                                ${education.map(edu => `
                                    <div>
                                        <p style="font-size: ${s(9)}; color: ${accentColor}; margin-bottom: 2px;">
                                            &#128197; ${formatLocalizedDate(edu.startDate, locale)}
                                            ${edu.city ? ` &#128205; ${escapeHtml(edu.city.toUpperCase())}` : ''}
                                        </p>
                                        <h4 style="font-weight: 700; font-size: ${s(15)}; color: #1f2937; margin-bottom: 2px;">
                                            ${escapeHtml(edu.degree)}
                                        </h4>
                                        <p style="font-size: ${s(13)}; color: #4b5563; font-weight: 600;">
                                            ${escapeHtml(edu.school)}
                                        </p>
                                        ${edu.description ? `
                                            <p style="font-size: ${s(12)}; color: #6b7280; margin-top: 4px;">
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
                            ${SectionHeader(t.sections.skills)}
                            <p style="font-size: ${s(8)}; color: #6b7280; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">
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
                            ${SectionHeader(t.sections.languages)}
                            <div style="display: flex; gap: 16px; flex-wrap: wrap;">
                                ${languages.map(lang => CircularProgress(getLanguageLevel(lang), lang.name)).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Strengths as Pill Badges -->
                    ${strengths && strengths.length > 0 ? `
                        <section style="margin-bottom: 20px;">
                            ${SectionHeader(t.sections.strengths)}
                            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                                ${strengths.map(strength => `
                                    <span style="background-color: ${accentColor}; color: ${getContrastText(accentColor)}; padding: 4px 12px; border-radius: 4px; font-size: ${s(10)}; font-weight: 500;">
                                        ${escapeHtml(strength.name)}
                                    </span>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Interests with Icons -->
                    ${interests && interests.length > 0 ? `
                        <section style="margin-bottom: 20px;">
                            ${SectionHeader(t.sections.interests)}
                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
                                ${interests.slice(0, 6).map(interest => `
                                    <div style="text-align: center;">
                                        <div style="font-size: 28px; margin-bottom: 4px;">
                                            ${interest.icon || getInterestIcon(interest.name)}
                                        </div>
                                        <div style="font-size: ${s(9)}; color: #4b5563;">
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
                            ${SectionHeader(t.sections.credentials)}
                            ${certifications && certifications.length > 0 ? `
                                <div style="margin-bottom: ${awards && awards.length > 0 ? '16px' : '0'};">
                                    <h4 style="font-size: ${s(10)}; font-weight: 600; color: #6b7280; margin-bottom: 8px; text-transform: uppercase;">Certifications</h4>
                                    <div style="display: flex; flex-direction: column; gap: 8px;">
                                        ${certifications.map(cert => `
                                            <div>
                                                <div style="font-weight: 600; font-size: ${s(13)}; color: #1f2937;">${escapeHtml(cert.name)}</div>
                                                <div style="font-size: ${s(9)}; color: #6b7280;">${escapeHtml(cert.issuer)} • ${formatLocalizedDate(cert.date, locale)}</div>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}
                            ${awards && awards.length > 0 ? `
                                <div>
                                    <h4 style="font-size: ${s(10)}; font-weight: 600; color: #6b7280; margin-bottom: 8px; text-transform: uppercase;">Awards & Achievements</h4>
                                    <div style="display: flex; flex-direction: column; gap: 8px;">
                                        ${awards.map(award => `
                                            <div>
                                                <div style="font-weight: 600; font-size: ${s(13)}; color: #1f2937;">${escapeHtml(award.title)}</div>
                                                <div style="font-size: ${s(9)}; color: #6b7280;">${escapeHtml(award.issuer)} • ${formatLocalizedDate(award.date, locale)}</div>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}
                        </section>
                    ` : ''}

                    <!-- References -->
                    ${data.references && data.references.length > 0 ? `
                        <section>
                            ${SectionHeader(t.sections.references)}
                            <div style="display: grid; grid-template-columns: 1fr; gap: 12px;">
                                ${data.references.map(ref => `
                                    <div>
                                        <div style="font-weight: 600; font-size: ${s(13)}; color: #1f2937;">${escapeHtml(ref.name)}</div>
                                        <div style="font-size: ${s(9)}; color: #6b7280;">${escapeHtml(ref.title)}, ${escapeHtml(ref.company)}</div>
                                        ${ref.email ? `<div style="font-size: ${s(9)}; color: ${accentColor};">${escapeHtml(ref.email)}</div>` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}
                    
                    <!-- Personal Details -->
                    ${(personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber)) ? `
                        <section style="margin-top: 20px;">
                            ${SectionHeader(t.sections.additionalInfo)}
                            <div style="font-size: ${s(12)}; color: #4b5563; display: flex; flex-direction: column; gap: 6px;">
                                ${personalInfo.nationality ? `<div><span style="font-weight: 600;">Nationality:</span> ${escapeHtml(personalInfo.nationality)}</div>` : ''}
                                ${personalInfo.idType && personalInfo.idNumber ? `
                                    <div><span style="font-weight: 600;">${personalInfo.idType === 'id' ? 'ID' : personalInfo.idType === 'passport' ? 'Passport' : 'Driving License'}:</span> ${escapeHtml(personalInfo.idNumber)}</div>
                                ` : ''}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Custom Fields -->
                    ${customFields.map(field => `
                        <section style="margin-top: 20px;">
                            ${SectionHeader(field.label)}
                            <p style="font-size: ${s(12)}; color: #4b5563; line-height: 1.6;">
                                ${formatDescription(field.content)}
                            </p>
                        </section>
                    `).join('')}

                    <!-- Social Links -->
                    ${(personalInfo.x || personalInfo.github || personalInfo.dribbble || personalInfo.behance || personalInfo.instagram) ? `
                        <section style="margin-top: 20px;">
                            ${SectionHeader(t.sections.socialLinks)}
                            <div style="display: flex; flex-direction: column; gap: 6px; font-size: ${s(12)};">
                                ${personalInfo.github ? `<div style="color: #374151;">&#128187; ${escapeHtml(personalInfo.github)}</div>` : ''}
                                ${personalInfo.x ? `<div style="color: #374151;">&#128038; ${escapeHtml(personalInfo.x)}</div>` : ''}
                                ${personalInfo.dribbble ? `<div style="color: #374151;">&#127936; ${escapeHtml(personalInfo.dribbble)}</div>` : ''}
                                ${personalInfo.behance ? `<div style="color: #374151;">&#127912; ${escapeHtml(personalInfo.behance)}</div>` : ''}
                                ${personalInfo.instagram ? `<div style="color: #374151;">&#128247; ${escapeHtml(personalInfo.instagram)}</div>` : ''}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Personal Details -->
                    ${(personalInfo.nationality || personalInfo.idType) ? `
                        <section style="margin-top: 20px;">
                            ${SectionHeader(t.sections.personalDetails)}
                            <div style="display: flex; flex-direction: column; gap: 6px; font-size: ${s(12)};">
                                ${personalInfo.nationality ? `<div style="color: #374151;">&#127757; Nationality: ${escapeHtml(personalInfo.nationality)}</div>` : ''}
                                ${personalInfo.idType && personalInfo.idNumber ? `<div style="color: #374151;">&#128196; ${escapeHtml(personalInfo.idType)}: ${escapeHtml(personalInfo.idNumber)}</div>` : ''}
                            </div>
                        </section>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
};

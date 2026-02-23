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
    getFontScale,
    getIconSVG,
    IconName
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

    // Icon helper shorthand
    const icon = (name: IconName, size: number = 12) => getIconSVG(name, headerTextMuted, size);
    const bodyIcon = (name: IconName, color: string = '#374151', size: number = 12) => getIconSVG(name, color, size);
    const accentIcon = (name: IconName, size: number = 10) => getIconSVG(name, accentColor, size);

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
            <div data-paginate="item" style="display: flex; flex-direction: column; align-items: center; width: 70px;">
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
        <div data-paginate="item" style="margin-bottom: 10px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                <span style="font-size: ${s(10)}; font-weight: 500; color: #374151;">${escapeHtml(label)}</span>
            </div>
            <div style="width: 100%; height: 6px; background-color: #e5e7eb; border-radius: 3px;">
                <div style="width: ${value}%; height: 100%; background-color: ${accentColor}; border-radius: 3px;"></div>
            </div>
        </div>
    `;

    // Interest icon helper — returns SVG icon based on interest name
    const getInterestIcon = (name: string): string => {
        const nameLower = name.toLowerCase();
        const color = '#4b5563';
        const size = 24;

        if (nameLower.includes('music') || nameLower.includes('rock')) return getIconSVG('music', color, size);
        if (nameLower.includes('football') || nameLower.includes('soccer')) return getIconSVG('football', color, size);
        if (nameLower.includes('photo')) return getIconSVG('camera', color, size);
        if (nameLower.includes('hiking') || nameLower.includes('hike')) return getIconSVG('hiking', color, size);
        if (nameLower.includes('biking') || nameLower.includes('bike') || nameLower.includes('cycling')) return getIconSVG('bike', color, size);
        if (nameLower.includes('tennis')) return getIconSVG('tennis', color, size);
        if (nameLower.includes('travel')) return getIconSVG('plane', color, size);
        if (nameLower.includes('reading') || nameLower.includes('book')) return getIconSVG('book-open', color, size);
        if (nameLower.includes('cooking') || nameLower.includes('food')) return getIconSVG('cooking-pot', color, size);
        if (nameLower.includes('gaming') || nameLower.includes('game')) return getIconSVG('gamepad', color, size);
        if (nameLower.includes('film') || nameLower.includes('movie')) return getIconSVG('film', color, size);
        if (nameLower.includes('art') || nameLower.includes('paint')) return getIconSVG('palette', color, size);
        if (nameLower.includes('yoga') || nameLower.includes('meditation')) return getIconSVG('yoga', color, size);
        if (nameLower.includes('swim')) return getIconSVG('swimming', color, size);
        if (nameLower.includes('run')) return getIconSVG('running', color, size);
        if (nameLower.includes('sleep') || nameLower.includes('rest') || nameLower.includes('nap')) return getIconSVG('moon', color, size);
        return getIconSVG('star', color, size);
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
                    <div style="display: flex; gap: 16px; font-size: ${s(10)}; color: ${headerTextMuted}; flex-wrap: wrap; align-items: center;">
                        ${personalInfo.phone ? `<span style="display: inline-flex; align-items: center; gap: 4px;">${icon('phone')} ${escapeHtml(personalInfo.phone)}</span>` : ''}
                        ${personalInfo.email ? `<span style="display: inline-flex; align-items: center; gap: 4px;">${icon('email')} ${escapeHtml(personalInfo.email)}</span>` : ''}
                        ${personalInfo.location ? `<span style="display: inline-flex; align-items: center; gap: 4px;">${icon('location')} ${escapeHtml(personalInfo.location)}</span>` : ''}
                        ${personalInfo.website ? `<span style="display: inline-flex; align-items: center; gap: 4px;">${icon('website')} ${escapeHtml(personalInfo.website)}</span>` : ''}
                        ${personalInfo.linkedin ? `<span style="display: inline-flex; align-items: center; gap: 4px;">${icon('linkedin')} ${escapeHtml(personalInfo.linkedin)}</span>` : ''}
                    </div>
                </div>

                <!-- Right: Profile Photo -->
                ${profileImage}
            </header>

            <!-- Page-margin table: thead/tfoot repeat on every printed page -->
            <table style="width: 100%; border-collapse: collapse;">
                <thead><tr><td style="height: 30px;"></td></tr></thead>
                <tfoot><tr><td style="height: 30px;"></td></tr></tfoot>
                <tbody><tr><td style="padding: 0 24px;">
                    <div style="display: flex; gap: 24px;">
                <!-- LEFT COLUMN - Summary, Experience, Education -->
                <div style="width: 55%;">
                            
                            <!-- Resume Summary -->
                            ${personalInfo.summary ? `
                                <section class="resume-section" style="margin-bottom: 20px;">
                                    ${SectionHeader(t.sections.summary)}
                                    <p style="color: #374151; line-height: 1.6; font-size: ${s(13)};">
                                        ${formatDescription(personalInfo.summary)}
                                    </p>
                                </section>
                            ` : ''}

                            <!-- Work Experience -->
                            ${experience.length > 0 ? `
                                <section class="resume-section" style="margin-bottom: 20px;">
                                    ${SectionHeader(t.sections.workExperience)}
                                    <div style="display: block;">
                                        ${experience.map((exp, index) => `
                                            <div data-paginate="item" class="resume-entry" style="margin-bottom: ${index === experience.length - 1 ? 0 : 16}px;">
                                                <p style="font-size: ${s(9)}; color: ${accentColor}; margin-bottom: 2px; display: flex; align-items: center; gap: 4px; flex-wrap: wrap;">
                                                    ${accentIcon('calendar')} ${formatLocalizedDate(exp.startDate, locale)} – ${exp.current ? t.labels.present.toUpperCase() : formatLocalizedDate(exp.endDate, locale)}
                                                    ${(exp.city || exp.country) ? `<span style="display: inline-flex; align-items: center; gap: 4px; margin-left: 4px;">${accentIcon('location')} ${escapeHtml([exp.city, exp.country].filter(Boolean).join(', ').toUpperCase())}</span>` : ''}
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
                                <section class="resume-section" style="margin-bottom: 20px;">
                                    ${SectionHeader(t.sections.education)}
                                    <div style="display: block;">
                                        ${education.map((edu, index) => `
                                            <div data-paginate="item" class="resume-entry" style="margin-bottom: ${index === education.length - 1 ? 0 : 12}px;">
                                                <p style="font-size: ${s(9)}; color: ${accentColor}; margin-bottom: 2px; display: flex; align-items: center; gap: 4px; flex-wrap: wrap;">
                                                    ${accentIcon('calendar')} ${formatLocalizedDate(edu.startDate, locale)}
                                                    ${(edu.city || edu.country) ? `<span style="display: inline-flex; align-items: center; gap: 4px; margin-left: 4px;">${accentIcon('location')} ${escapeHtml([edu.city, edu.country].filter(Boolean).join(', ').toUpperCase())}</span>` : ''}
                                                </p>
                                                <h4 style="font-weight: 700; font-size: ${s(15)}; color: #1f2937; margin-bottom: 2px;">
                                                    ${escapeHtml(edu.degree)}
                                                    ${edu.gpa ? `<span style="margin-left: 8px; opacity: 0.8; font-size: ${s(13)};">GPA: ${escapeHtml(edu.gpa)}</span>` : ''}
                                                </h4>
                                                <p style="font-size: ${s(13)}; color: #4b5563; font-weight: 600;">
                                                    ${escapeHtml(edu.school)}
                                                </p>
                                                ${edu.honors ? `<p style="font-size: ${s(11)}; color: #4b5563; opacity: 0.8; margin: 0;">${escapeHtml(edu.honors)}</p>` : ''}
                                                ${edu.clubs ? `<p style="font-size: ${s(10)}; color: #6b7280; opacity: 0.7; margin: 0;">Activities: ${escapeHtml(edu.clubs)}</p>` : ''}
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

                            <!-- Interests -->
                            ${interests && interests.length > 0 ? `
                                <section class="resume-section" style="margin-bottom: 20px;">
                                    ${SectionHeader(t.sections.interests)}
                                    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                                        ${interests.map(interest => `
                                            <div data-paginate="item" style="display: flex; align-items: center; gap: 6px; font-size: ${s(12)};">
                                                <span style="color: ${accentColor}; font-size: 8px;">●</span>
                                                <span style="font-weight: 500;">${escapeHtml(interest.name)}</span>
                                            </div>
                                        `).join('')}
                                    </div>
                                </section>
                            ` : ''}

                            <!-- Personal Details -->
                            ${(personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber)) ? `
                                <section class="resume-section" style="margin-bottom: 20px;">
                                    ${SectionHeader(t.sections.personalDetails)}
                                    <div style="font-size: ${s(12)}; color: #4b5563; display: flex; flex-direction: column; gap: 6px;">
                                        ${personalInfo.nationality ? `<div data-paginate="item" style="display: flex; align-items: center; gap: 4px;">${bodyIcon('globe', '#4b5563', 12)} <span style="font-weight: 600;">Nationality:</span> ${escapeHtml(personalInfo.nationality)}</div>` : ''}
                                        ${personalInfo.idType && personalInfo.idNumber ? `
                                            <div data-paginate="item" style="display: flex; align-items: center; gap: 4px;">${bodyIcon('id-card', '#4b5563', 12)} <span style="font-weight: 600;">${personalInfo.idType === 'id' ? 'ID' : personalInfo.idType === 'passport' ? 'Passport' : 'Driving License'}:</span> ${escapeHtml(personalInfo.idNumber)}</div>
                                        ` : ''}
                                    </div>
                                </section>
                            ` : ''}
                </div>

                <!-- RIGHT COLUMN - Skills, Languages, Strengths, Interests -->
                <div style="width: 45%;">
                            
                            <!-- Skills with Progress Bars -->
                            ${skills.length > 0 ? `
                                <section class="resume-section" style="margin-bottom: 20px;">
                                    ${SectionHeader(t.sections.skills)}
                                    <p style="font-size: ${s(8)}; color: #6b7280; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em; display: flex; align-items: center; gap: 4px;">
                                        ${bodyIcon('monitor', '#6b7280', 10)} SOFTWARE
                                    </p>
                                    <div>
                                        ${skills.map(skill => ProgressBar(skill.name, skill.level * 20)).join('')}
                                    </div>
                                </section>
                            ` : ''}

                            <!-- Languages with Circular Indicators -->
                            ${languages && languages.length > 0 ? `
                                <section class="resume-section" style="margin-bottom: 20px;">
                                    ${SectionHeader(t.sections.languages)}
                                    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
                                        ${languages.map(lang => CircularProgress(getLanguageLevel(lang), lang.name)).join('')}
                                    </div>
                                </section>
                            ` : ''}

                            <!-- Strengths as Pill Badges -->
                            ${strengths && strengths.length > 0 ? `
                                <section class="resume-section" style="margin-bottom: 20px;">
                                    ${SectionHeader(t.sections.strengths)}
                                    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                                        ${strengths.map(strength => `
                                            <span data-paginate="item" style="background-color: ${accentColor}; color: ${getContrastText(accentColor)}; padding: 4px 12px; border-radius: 4px; font-size: ${s(10)}; font-weight: 500;">
                                                ${escapeHtml(strength.name)}
                                            </span>
                                        `).join('')}
                                    </div>
                                </section>
                            ` : ''}

                            <!-- Credentials -->
                            ${(certifications && certifications.length > 0) || (awards && awards.length > 0) ? `
                                <section class="resume-section">
                                    ${SectionHeader(t.sections.credentials)}
                                    ${certifications && certifications.length > 0 ? `
                                        <div style="margin-bottom: ${awards && awards.length > 0 ? '16px' : '0'}; display: block;">
                                            <h4 style="font-size: ${s(10)}; font-weight: 600; color: #6b7280; margin-bottom: 8px; text-transform: uppercase;">${t.sections.certifications}</h4>
                                            <div style="display: block;">
                                                ${certifications.map((cert, index) => `
                                                    <div data-paginate="item" class="resume-entry" style="margin-bottom: ${index === certifications.length - 1 ? 0 : 8}px;">
                                                        <div style="font-weight: 600; font-size: ${s(13)}; color: #1f2937;">${escapeHtml(cert.name)}</div>
                                                        <div style="font-size: ${s(9)}; color: #6b7280;">${escapeHtml(cert.issuer)} • ${formatLocalizedDate(cert.date, locale)}</div>
                                                        ${cert.url ? `<div style="font-size: ${s(10)}; color: #6b7280; opacity: 0.7;">${escapeHtml(cert.url)}</div>` : ''}
                                                    </div>
                                                `).join('')}
                                            </div>
                                        </div>
                                    ` : ''}
                                    ${awards && awards.length > 0 ? `
                                        <div style="display: block;">
                                            <h4 style="font-size: ${s(10)}; font-weight: 600; color: #6b7280; margin-bottom: 8px; text-transform: uppercase;">${t.sections.awards}</h4>
                                            <div style="display: block;">
                                                ${awards.map((award, index) => `
                                                    <div data-paginate="item" class="resume-entry" style="margin-bottom: ${index === awards.length - 1 ? 0 : 8}px;">
                                                        <div style="font-weight: 600; font-size: ${s(13)}; color: #1f2937;">${escapeHtml(award.title)}</div>
                                                        <div style="font-size: ${s(9)}; color: #6b7280;">${escapeHtml(award.issuer)} • ${formatLocalizedDate(award.date, locale)}</div>
                                                        ${award.description ? `<p style="font-size: ${s(9)}; line-height: 1.5; color: #4b5563; margin-top: 2px;">${formatDescription(award.description)}</p>` : ''}
                                                    </div>
                                                `).join('')}
                                            </div>
                                        </div>
                                    ` : ''}
                                </section>
                            ` : ''}

                            <!-- Social Links -->
                            ${(personalInfo.x || personalInfo.github || personalInfo.dribbble || personalInfo.behance || personalInfo.instagram) ? `
                                <section class="resume-section" style="margin-top: 20px;">
                                    ${SectionHeader(t.sections.socialLinks)}
                                    <div style="display: flex; flex-direction: column; gap: 6px; font-size: ${s(12)};">
                                        ${personalInfo.github ? `<div data-paginate="item" style="color: #374151; display: flex; align-items: center; gap: 4px;">${bodyIcon('github')} ${escapeHtml(personalInfo.github)}</div>` : ''}
                                        ${personalInfo.x ? `<div data-paginate="item" style="color: #374151; display: flex; align-items: center; gap: 4px;">${bodyIcon('x')} ${escapeHtml(personalInfo.x)}</div>` : ''}
                                        ${personalInfo.dribbble ? `<div data-paginate="item" style="color: #374151; display: flex; align-items: center; gap: 4px;">${bodyIcon('dribbble')} ${escapeHtml(personalInfo.dribbble)}</div>` : ''}
                                        ${personalInfo.behance ? `<div data-paginate="item" style="color: #374151; display: flex; align-items: center; gap: 4px;">${bodyIcon('behance')} ${escapeHtml(personalInfo.behance)}</div>` : ''}
                                        ${personalInfo.instagram ? `<div data-paginate="item" style="color: #374151; display: flex; align-items: center; gap: 4px;">${bodyIcon('instagram')} ${escapeHtml(personalInfo.instagram)}</div>` : ''}
                                    </div>
                                </section>
                            ` : ''}

                            <!-- Custom Fields -->
                            ${customFields.map(field => `
                                <section class="resume-section" style="margin-top: 20px;">
                                    ${SectionHeader(field.label)}
                                    <p style="font-size: ${s(12)}; color: #4b5563; line-height: 1.6;">
                                        ${formatDescription(field.content)}
                                    </p>
                                </section>
                            `).join('')}
                        </div>
                    </div>
                </td></tr></tbody>
            </table>
        </div>
    `;
};

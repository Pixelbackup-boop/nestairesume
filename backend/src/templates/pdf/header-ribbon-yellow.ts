/**
 * Header Ribbon Yellow Template
 * Ported from frontend/components/templates/layouts/header/HeaderRibbonYellow.tsx
 *
 * Yellow ribbon banner with circular photo overlapping at top.
 * Two-column layout with awards and interests section.
 */

import { PdfResumeData, PdfTheme, PdfTranslations } from '../../types/pdf';
import {
    getFontFamily,
    escapeHtml,
    formatDescription
} from './shared/helpers';
import { getTranslations } from './shared/translations';
import { formatLocalizedDate } from './shared/dateUtils';

export const renderHeaderRibbonYellow = (
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
        awards = [],
        certifications = [],
        references = [],
        fonts
    } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Inter');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    // Note: header-ribbon-yellow always uses white body background; no bgStyle needed

    // Colors
    const accentColor = data.customThemeColor || theme.primary || '#eab308';

    // Helper for Section Headers with Yellow Circle Icon
    const SectionHeader = (title: string, icon: string) => `
        <h3 style="font-family: ${headingFont}; font-size: 13px; font-weight: 700; color: #1f2937; margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">
            <span style="background-color: ${accentColor}; color: #ffffff; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px;">
                ${icon}
            </span>
            ${title}
        </h3>
    `;

    // Progress bar helper
    const ProgressBar = (label: string, value: number) => `
        <div style="margin-bottom: 10px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                <span style="font-size: 10pt; font-weight: 500; color: #374151;">${escapeHtml(label)}</span>
            </div>
            <div style="width: 100%; height: 6px; background-color: #e5e7eb; border-radius: 3px;">
                <div style="width: ${value}%; height: 100%; background-color: ${accentColor}; border-radius: 3px;"></div>
            </div>
        </div>
    `;

    // Interest icon helper
    const getInterestIcon = (name: string): string => {
        const nameLower = name.toLowerCase();
        if (nameLower.includes('travel')) return '&#9992;';
        if (nameLower.includes('photo')) return '&#128247;';
        if (nameLower.includes('novel') || nameLower.includes('book') || nameLower.includes('read')) return '&#128218;';
        if (nameLower.includes('ballet') || nameLower.includes('dance')) return '&#128131;';
        if (nameLower.includes('snowboard') || nameLower.includes('ski')) return '&#127938;';
        if (nameLower.includes('climb') || nameLower.includes('hik')) return '&#129495;';
        if (nameLower.includes('music') || nameLower.includes('guitar')) return '&#127925;';
        if (nameLower.includes('cook') || nameLower.includes('food')) return '&#127859;';
        if (nameLower.includes('game') || nameLower.includes('gaming')) return '&#127918;';
        if (nameLower.includes('film') || nameLower.includes('movie')) return '&#127916;';
        if (nameLower.includes('art') || nameLower.includes('paint')) return '&#127912;';
        if (nameLower.includes('sport') || nameLower.includes('fitness')) return '&#127939;';
        if (nameLower.includes('yoga')) return '&#129495;';
        if (nameLower.includes('swim')) return '&#127946;';
        if (nameLower.includes('cycle') || nameLower.includes('bike')) return '&#128692;';
        if (nameLower.includes('garden')) return '&#127793;';
        if (nameLower.includes('coffee')) return '&#9749;';
        if (nameLower.includes('wine')) return '&#127863;';
        return '&#11088;';
    };

    // Profile Image with yellow circle background - STATIC SIZE (not affected by text size)
    const profileImage = personalInfo.profileImage ? `
        <img
            src="${personalInfo.profileImage}"
            alt="${escapeHtml(personalInfo.fullName)}"
            style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 5px solid #374151;"
        />
    ` : `
        <div style="width: 100px; height: 100px; border-radius: 50%; background-color: #e5e7eb; border: 5px solid #374151; display: flex; align-items: center; justify-content: center; font-size: 36px; color: #9ca3af; font-weight: 700;">
            ${escapeHtml(personalInfo.fullName?.charAt(0) || '?')}
        </div>
    `;

    return `
        <div style="width: 100%; min-height: 100%; font-family: ${bodyFont}; font-size: 10pt; background-color: #ffffff; position: relative; box-sizing: border-box;">

            <!-- Header Area with Photo and Diagonal Ribbon - STATIC SIZES -->
            <header style="text-align: center; padding-top: 32px; padding-bottom: 16px;">

                <!-- Profile Photo - STATIC SIZE, no yellow background -->
                <div style="display: flex; justify-content: center; margin-bottom: -5px; position: relative; z-index: 10;">
                    ${profileImage}
                </div>

                <!-- Diagonal Parallelogram Ribbon - STATIC SIZE, WIDER -->
                <div style="display: flex; justify-content: center; margin-left: 0; margin-right: 0;">
                    <div style="background-color: ${accentColor}; height: 72px; padding-left: 180px; padding-right: 180px; display: flex; align-items: center; justify-content: center; transform: skewX(-10deg);">
                        <!-- Name - counter-skew to keep text straight, STATIC size -->
                        <h1 style="font-family: ${headingFont}; font-size: 28px; font-weight: 700; color: #ffffff; text-transform: uppercase; letter-spacing: 0.1em; transform: skewX(10deg); margin: 0;">
                            ${escapeHtml(personalInfo.fullName || 'Your Name')}
                        </h1>
                    </div>
                </div>

                <!-- Contact Info -->
                <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; font-size: 10px; color: #6b7280; margin-top: 16px;">
                    ${personalInfo.phone ? `<span>${escapeHtml(personalInfo.phone)}</span>` : ''}
                    ${personalInfo.email ? `<span>|</span><span>${escapeHtml(personalInfo.email)}</span>` : ''}
                    ${personalInfo.website ? `<span>|</span><span>${escapeHtml(personalInfo.website)}</span>` : ''}
                    ${personalInfo.linkedin ? `<span>|</span><span>${escapeHtml(personalInfo.linkedin)}</span>` : ''}
                    ${personalInfo.nationality ? `<span>|</span><span>${escapeHtml(personalInfo.nationality)}</span>` : ''}
                    ${personalInfo.idType && personalInfo.idNumber ? `<span>|</span><span>${personalInfo.idType === 'id' ? 'ID' : personalInfo.idType === 'passport' ? 'Passport' : 'License'}: ${escapeHtml(personalInfo.idNumber)}</span>` : ''}
                </div>

                <!-- Social Links Row -->
                ${(personalInfo.twitter || personalInfo.github || personalInfo.dribbble || personalInfo.behance || personalInfo.instagram) ? `
                    <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; font-size: 9px; color: #6b7280; margin-top: 8px;">
                        ${personalInfo.twitter ? `<span>Twitter: ${escapeHtml(personalInfo.twitter)}</span>` : ''}
                        ${personalInfo.github ? `<span>GitHub: ${escapeHtml(personalInfo.github)}</span>` : ''}
                        ${personalInfo.dribbble ? `<span>Dribbble: ${escapeHtml(personalInfo.dribbble)}</span>` : ''}
                        ${personalInfo.behance ? `<span>Behance: ${escapeHtml(personalInfo.behance)}</span>` : ''}
                        ${personalInfo.instagram ? `<span>Instagram: ${escapeHtml(personalInfo.instagram)}</span>` : ''}
                    </div>
                ` : ''}
            </header>

            <!-- Two-Column Body -->
            <div style="display: flex; gap: 24px; padding: 0 32px 32px;">

                <!-- LEFT COLUMN - Profile, Experience, Education -->
                <div style="width: 55%;">

                    <!-- Profile / Summary -->
                    ${personalInfo.summary ? `
                        <section style="margin-bottom: 20px;">
                            ${SectionHeader(t.sections.profile, '&#128100;')}
                            <p style="color: #374151; line-height: 1.6; font-size: 10pt;">
                                ${formatDescription(personalInfo.summary)}
                            </p>
                        </section>
                    ` : ''}

                    <!-- Work Experience -->
                    ${experience.length > 0 ? `
                        <section style="margin-bottom: 20px;">
                            ${SectionHeader(t.sections.workExperience, '&#128188;')}
                            <div style="display: flex; flex-direction: column; gap: 12px;">
                                ${experience.map(exp => `
                                    <div>
                                        <p style="font-size: 9px; color: #6b7280; margin-bottom: 2px; text-transform: uppercase;">
                                            ${formatLocalizedDate(exp.startDate, locale)} – ${exp.current ? t.labels.present.toUpperCase() : formatLocalizedDate(exp.endDate, locale)}
                                            ${exp.city ? `&nbsp;&nbsp;&nbsp;&nbsp;${escapeHtml(exp.city.toUpperCase())}` : ''}
                                        </p>
                                        <h4 style="font-weight: 700; font-size: 11pt; color: #1f2937; margin-bottom: 1px;">
                                            ${escapeHtml(exp.title)}
                                        </h4>
                                        <p style="font-size: 10pt; color: ${accentColor}; font-weight: 600; margin-bottom: 4px;">
                                            ${escapeHtml(exp.company)}
                                        </p>
                                        ${exp.description ? `
                                            <ul style="padding-left: 14px; margin: 0; list-style: disc;">
                                                ${exp.description.split('\n').filter(Boolean).map(line => `
                                                    <li style="font-size: 9pt; color: #4b5563; margin-bottom: 1px; line-height: 1.4;">
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
                            ${SectionHeader(t.sections.education, '&#127891;')}
                            <div style="display: flex; flex-direction: column; gap: 12px;">
                                ${education.map(edu => `
                                    <div>
                                        <p style="font-size: 9px; color: #6b7280; margin-bottom: 2px; text-transform: uppercase;">
                                            ${formatLocalizedDate(edu.startDate, locale)} – ${edu.current ? t.labels.present.toUpperCase() : formatLocalizedDate(edu.endDate, locale)}
                                            ${edu.city ? `&nbsp;&nbsp;&nbsp;&nbsp;${escapeHtml(edu.city.toUpperCase())}` : ''}
                                        </p>
                                        <h4 style="font-weight: 700; font-size: 11pt; color: #1f2937; margin-bottom: 1px;">
                                            ${escapeHtml(edu.degree)}
                                        </h4>
                                        <p style="font-size: 10pt; color: ${accentColor}; font-weight: 600;">
                                            ${escapeHtml(edu.school)}
                                        </p>
                                        ${edu.description ? `
                                            <p style="font-size: 9pt; color: #6b7280; margin-top: 2px;">
                                                ${formatDescription(edu.description)}
                                            </p>
                                        ` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}
                </div>

                <!-- RIGHT COLUMN - Awards, Skills, Interests -->
                <div style="width: 45%;">

                    <!-- Credentials -->
                    ${(certifications && certifications.length > 0) || (awards && awards.length > 0) ? `
                        <section style="margin-bottom: 20px;">
                            ${SectionHeader(t.sections.credentials, '&#127942;')}
                            ${certifications && certifications.length > 0 ? `
                                <div style="margin-bottom: ${awards && awards.length > 0 ? '16px' : '0'};">
                                    <h4 style="font-size: 9px; font-weight: 600; color: #6b7280; margin-bottom: 8px; text-transform: uppercase;">${t.sections.certifications}</h4>
                                    <div style="display: flex; flex-direction: column; gap: 12px;">
                                        ${certifications.map(cert => `
                                            <div>
                                                <h4 style="font-weight: 700; font-size: 11pt; color: #1f2937; margin-bottom: 1px;">
                                                    ${escapeHtml(cert.name)}
                                                </h4>
                                                <p style="font-size: 10pt; color: ${accentColor}; font-weight: 600;">
                                                    ${escapeHtml(cert.issuer)}
                                                </p>
                                                <p style="font-size: 9px; color: #6b7280; margin-top: 2px;">
                                                    ${formatLocalizedDate(cert.date, locale)}
                                                </p>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}
                            ${awards && awards.length > 0 ? `
                                <div>
                                    <h4 style="font-size: 9px; font-weight: 600; color: #6b7280; margin-bottom: 8px; text-transform: uppercase;">${t.sections.awards}</h4>
                                    <div style="display: flex; flex-direction: column; gap: 12px;">
                                        ${awards.map(award => `
                                            <div>
                                                <h4 style="font-weight: 700; font-size: 11pt; color: #1f2937; margin-bottom: 1px;">
                                                    ${escapeHtml(award.title)}
                                                </h4>
                                                <p style="font-size: 10pt; color: ${accentColor}; font-weight: 600;">
                                                    ${escapeHtml(award.issuer)}
                                                </p>
                                                <p style="font-size: 9px; color: #6b7280; margin-top: 2px;">
                                                    ${formatLocalizedDate(award.date, locale)}
                                                </p>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}
                        </section>
                    ` : ''}

                    <!-- Skills -->
                    ${skills.length > 0 ? `
                        <section style="margin-bottom: 20px;">
                            ${SectionHeader(t.sections.skills, '&#9881;')}
                            <div>
                                ${skills.map(skill => ProgressBar(skill.name, (skill.level || 3) * 20)).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Interests with Icons Grid -->
                    ${interests && interests.length > 0 ? `
                        <section style="margin-bottom: 20px;">
                            ${SectionHeader(t.sections.interests, '&#11088;')}
                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
                                ${interests.slice(0, 6).map(interest => `
                                    <div style="text-align: center;">
                                        <div style="font-size: 28px; margin-bottom: 4px; color: ${accentColor};">
                                            ${getInterestIcon(interest.name)}
                                        </div>
                                        <div style="font-size: 9px; color: #374151;">
                                            ${escapeHtml(interest.name)}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Languages -->
                    ${languages && languages.length > 0 ? `
                        <section style="margin-bottom: 20px;">
                            ${SectionHeader(t.sections.languages, '&#128483;')}
                            <div style="display: flex; flex-direction: column; gap: 8px;">
                                ${languages.map(lang => `
                                    <div style="display: flex; justify-content: space-between; font-size: 10pt;">
                                        <span style="font-weight: 600; color: #1f2937;">${escapeHtml(lang.name)}</span>
                                        <span style="color: #6b7280;">${escapeHtml(lang.proficiency)}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Strengths -->
                    ${strengths && strengths.length > 0 ? `
                        <section style="margin-bottom: 20px;">
                            ${SectionHeader(t.sections.strengths, '&#128170;')}
                            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                                ${strengths.map(strength => `
                                    <span style="background-color: ${accentColor}; color: #ffffff; padding: 4px 12px; border-radius: 9999px; font-size: 10px; font-weight: 500;">
                                        ${escapeHtml(strength.name)}
                                    </span>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- References -->
                    ${references && references.length > 0 ? `
                        <section style="margin-bottom: 20px;">
                            ${SectionHeader(t.sections.references, '&#128203;')}
                            <div style="display: flex; flex-direction: column; gap: 12px;">
                                ${references.map(ref => `
                                    <div>
                                        <h4 style="font-weight: 700; font-size: 11pt; color: #1f2937; margin-bottom: 1px;">
                                            ${escapeHtml(ref.name)}
                                        </h4>
                                        <p style="font-size: 10pt; color: ${accentColor}; font-weight: 600; margin-bottom: 2px;">
                                            ${escapeHtml(ref.title)}${ref.company ? ` at ${escapeHtml(ref.company)}` : ''}
                                        </p>
                                        <div style="font-size: 9px; color: #6b7280;">
                                            ${ref.phone ? `<div>${escapeHtml(ref.phone)}</div>` : ''}
                                            ${ref.email ? `<div>${escapeHtml(ref.email)}</div>` : ''}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Custom Field -->
                    ${personalInfo.customField ? `
                        <section>
                            ${SectionHeader(personalInfo.customFieldLabel || t.sections.additionalInfo, '&#128221;')}
                            <p style="color: #374151; line-height: 1.6; font-size: 10pt;">
                                ${formatDescription(personalInfo.customField)}
                            </p>
                        </section>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
};

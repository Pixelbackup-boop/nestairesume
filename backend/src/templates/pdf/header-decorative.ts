/**
 * Header Decorative Template
 * Ported from frontend/components/templates/layouts/header/HeaderDecorative.tsx
 *
 * Dark header with subtle geometric line pattern.
 * Photo overlaps the bottom edge of the header on the left.
 */

import { PdfResumeData, PdfTheme, PdfTranslations } from '../../types/pdf';
import {
    getFontFamily,
    escapeHtml,
    formatDescription
} from './shared/helpers';
import { getTranslations } from './shared/translations';
import { formatLocalizedDate } from './shared/dateUtils';

export const renderHeaderDecorative = (data: PdfResumeData, theme: PdfTheme, translations?: PdfTranslations, locale: string = 'en'): string => {
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
    const headingFont = getFontFamily(fonts?.heading || 'Merriweather');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    const sizeConfig = data.fonts?.size || 'medium'; // 'small' | 'medium' | 'large'

    // Calculate font sizes matching frontend styleHelpers.tsx
    // multiplier: small=0.857, medium=1, large=1.143 (approx)
    // based on styleHelpers: sizeMult = baseSize / 14.
    // We can simplify by pre-calculating or using a helper if available, but here we can derive.

    const getSizes = (size: 'small' | 'medium' | 'large') => {
        const mult = size === 'small' ? 0.857 : size === 'large' ? 1.143 : 1;
        const calc = (val: number) => `${Math.round(val * mult)}px`;
        return {
            name: calc(32),
            jobTitle: calc(14),
            sectionHeading: calc(14),
            entryTitle: calc(12),
            body: calc(11),
            small: calc(10)
        };
    };

    const sizes = getSizes(sizeConfig);

    // Colors
    const headerBg = '#1f1f1f'; // Dark Grey/Black
    const accentColor = data.customThemeColor || theme.primary || '#eab308'; // Yellow 500

    // Dimensions
    const headerHeight = 180;
    const photoSize = 150;
    const photoOffset = photoSize / 3;

    // Helper for Section Headers
    const SectionHeader = (title: string, icon: string) => `
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px; border-bottom: 2px solid #f3f4f6; padding-bottom: 8px; page-break-after: avoid;">
            <span style="font-size: ${sizes.sectionHeading};">${icon}</span>
            <h3 style="font-family: ${headingFont}; font-size: ${sizes.sectionHeading}; font-weight: 800; color: #111827; text-transform: uppercase; letter-spacing: 0.05em; margin: 0;">
                ${title}
            </h3>
        </div>
    `;

    // Progress bar with striped pattern
    const StripedProgressBar = (label: string, value: number) => `
        <div style="margin-bottom: 12px; page-break-inside: avoid;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px; font-size: ${sizes.body};">
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

    const styles = `
        <style>
            @page {
                margin-top: 30px;
                margin-bottom: 30px;
            }
            @page :first {
                margin-top: 0;
            }
        </style>
    `;

    return `
        <div style="width: 100%; min-height: 100%; font-family: ${bodyFont}; font-size: ${sizes.body}; background-color: #ffffff; color: #374151; position: relative; box-sizing: border-box;">
            ${styles}
            <!-- Header Area -->
            <header style="height: ${headerHeight}px; background-color: ${headerBg}; position: relative; margin-bottom: ${photoOffset + 40}px; overflow: visible;">

                <!-- Decorative Pattern (SVG) -->
                <svg style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.1; pointer-events: none;">
                    <pattern id="pattern-circles" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="10" cy="10" r="9" fill="none" stroke="white" stroke-width="0.5"/>
                    </pattern>
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"/>
                </svg>

                <div style="padding: 32px 40px; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: flex-end; position: relative; z-index: 10;">
                    <h1 style="font-family: ${headingFont}; font-size: ${sizes.name}; font-weight: 700; color: white; text-align: right; margin-bottom: 4px; letter-spacing: 0.05em;">
                        ${escapeHtml(personalInfo.fullName || 'Your Name')}
                    </h1>
                    <p style="font-size: ${sizes.jobTitle}; color: ${accentColor}; font-weight: 600; text-transform: uppercase; text-align: right; margin-bottom: 12px;">
                        ${escapeHtml(personalInfo.jobTitle || 'Job Title')}
                    </p>

                    <div style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: flex-end; color: #d1d5db; font-size: ${sizes.small};">
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
                            ${SectionHeader(t.sections.profile, '&#128100;')}
                            <p style="line-height: 1.6; font-size: ${sizes.body};">${formatDescription(personalInfo.summary)}</p>
                        </section>
                    ` : ''}

                    ${experience.length > 0 ? `
                        <section style="margin-bottom: 32px;">
                            ${SectionHeader(t.sections.experience, '&#128188;')}
                            <div style="display: flex; flex-direction: column; gap: 24px;">
                                ${experience.map(exp => `
                                    <div style="page-break-inside: avoid;">
                                        <div style="display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 2px;">
                                            <h4 style="font-weight: 700; font-size: ${sizes.entryTitle}; color: #111827;">${escapeHtml(exp.title)}</h4>
                                            <span style="font-size: ${sizes.small}; color: #6b7280; font-style: italic;">
                                                ${formatLocalizedDate(exp.startDate, locale)} – ${exp.current ? t.labels.present : formatLocalizedDate(exp.endDate, locale)}
                                            </span>
                                        </div>
                                        <p style="font-size: ${sizes.body}; font-weight: 500; color: ${accentColor}; margin-bottom: 4px;">
                                            ${escapeHtml(exp.company)}, ${escapeHtml(exp.city)}
                                        </p>
                                        <p style="font-size: ${sizes.body}; line-height: 1.5;">
                                            ${formatDescription(exp.description || '')}
                                        </p>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    ${education.length > 0 ? `
                        <section style="margin-bottom: 32px;">
                            ${SectionHeader(t.sections.education, '&#127891;')}
                            <div style="display: flex; flex-direction: column; gap: 16px;">
                                ${education.map(edu => `
                                    <div style="page-break-inside: avoid;">
                                        <h4 style="font-weight: 700; font-size: ${sizes.entryTitle}; color: #111827;">${escapeHtml(edu.degree)}</h4>
                                        <p style="font-size: ${sizes.body}; font-weight: 500; color: ${accentColor};">
                                            ${escapeHtml(edu.school)}, ${escapeHtml(edu.city)}
                                        </p>
                                        <p style="font-size: ${sizes.small}; color: #6b7280;">
                                            ${formatLocalizedDate(edu.startDate, locale)} – ${edu.current ? t.labels.present : (edu.endDate ? formatLocalizedDate(edu.endDate, locale) : t.labels.present)}
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
                            ${SectionHeader(t.sections.skills, '&#128736;')}
                            <div>
                                ${skills.map(skill => StripedProgressBar(skill.name, (skill.level || 3) * 20)).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Languages -->
                    ${languages && languages.length > 0 ? `
                        <section style="margin-bottom: 32px;">
                            ${SectionHeader(t.sections.languages, '&#128483;')}
                            <div style="display: flex; flex-direction: column; gap: 8px;">
                                ${languages.map(lang => `
                                    <div style="display: flex; justify-content: space-between; font-size: ${sizes.body}; page-break-inside: avoid;">
                                        <span style="font-weight: 500;">${escapeHtml(lang.name)}</span>
                                        <span style="font-size: ${sizes.small}; color: #6b7280;">${escapeHtml(lang.proficiency)}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Strengths -->
                    ${strengths && strengths.length > 0 ? `
                        <section style="margin-bottom: 32px;">
                            ${SectionHeader(t.sections.strengths, '&#9889;')}
                            <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                                ${strengths.map(str => `
                                    <span style="font-size: ${sizes.small}; font-weight: 600; color: ${accentColor}; border: 1px solid ${accentColor}; padding: 2px 8px; border-radius: 12px; page-break-inside: avoid; display: inline-block;">
                                        ${escapeHtml(str.name)}
                                    </span>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Interests -->
                    ${interests && interests.length > 0 ? `
                        <section style="margin-bottom: 32px;">
                            ${SectionHeader(t.sections.interests, '&#11088;')}
                            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                                ${interests.map(int => `
                                    <span style="font-size: ${sizes.small}; background-color: #f3f4f6; padding: 4px 8px; border-radius: 4px; color: #374151; border-left: 3px solid ${accentColor};">
                                        ${escapeHtml(int.name)}
                                    </span>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Credentials -->
                    ${(certifications && certifications.length > 0) || (awards && awards.length > 0) ? `
                        <section style="margin-bottom: 32px;">
                            ${SectionHeader(t.sections.credentials, '&#127942;')}
                            ${certifications && certifications.length > 0 ? `
                                <div style="margin-bottom: ${awards && awards.length > 0 ? '16px' : '0'};">
                                    <h4 style="font-size: ${sizes.small}; font-weight: 600; color: #6b7280; margin-bottom: 8px;">${t.sections.certifications}</h4>
                                    <div style="display: flex; flex-direction: column; gap: 12px;">
                                        ${certifications.map(cert => `
                                            <div style="font-size: ${sizes.body}; page-break-inside: avoid;">
                                                <p style="font-weight: 700; color: #111827;">${escapeHtml(cert.name)}</p>
                                                <p style="font-size: ${sizes.small}; color: #6b7280;">
                                                    ${escapeHtml(cert.issuer)} • ${formatLocalizedDate(cert.date, locale)}
                                                </p>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}
                            ${awards && awards.length > 0 ? `
                                <div>
                                    <h4 style="font-size: ${sizes.small}; font-weight: 600; color: #6b7280; margin-bottom: 8px;">${t.sections.awards}</h4>
                                    <div style="display: flex; flex-direction: column; gap: 12px;">
                                        ${awards.map(awr => `
                                            <div style="font-size: ${sizes.body}; page-break-inside: avoid;">
                                                <p style="font-weight: 700; color: #111827;">${escapeHtml(awr.title)}</p>
                                                <p style="font-size: ${sizes.small}; color: #6b7280;">
                                                    ${escapeHtml(awr.issuer)} • ${formatLocalizedDate(awr.date, locale)}
                                                </p>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}
                        </section>
                    ` : ''}

                    <!-- Social Links -->
                    ${(personalInfo.linkedin || personalInfo.twitter || personalInfo.github || personalInfo.dribbble || personalInfo.behance || personalInfo.instagram) ? `
                        <section style="margin-bottom: 32px;">
                            ${SectionHeader(t.sections.socialLinks, '&#128279;')}
                            <div style="display: flex; flex-direction: column; gap: 6px; font-size: ${sizes.body};">
                                ${personalInfo.linkedin ? `<div><span style="font-weight: 600;">LinkedIn:</span> ${escapeHtml(personalInfo.linkedin)}</div>` : ''}
                                ${personalInfo.twitter ? `<div><span style="font-weight: 600;">Twitter:</span> ${escapeHtml(personalInfo.twitter)}</div>` : ''}
                                ${personalInfo.github ? `<div><span style="font-weight: 600;">GitHub:</span> ${escapeHtml(personalInfo.github)}</div>` : ''}
                                ${personalInfo.dribbble ? `<div><span style="font-weight: 600;">Dribbble:</span> ${escapeHtml(personalInfo.dribbble)}</div>` : ''}
                                ${personalInfo.behance ? `<div><span style="font-weight: 600;">Behance:</span> ${escapeHtml(personalInfo.behance)}</div>` : ''}
                                ${personalInfo.instagram ? `<div><span style="font-weight: 600;">Instagram:</span> ${escapeHtml(personalInfo.instagram)}</div>` : ''}
                            </div>
                        </section>
                    ` : ''}

                    <!-- References -->
                    ${references && references.length > 0 ? `
                        <section style="margin-bottom: 32px;">
                            ${SectionHeader(t.sections.references, '&#128203;')}
                            <div style="display: flex; flex-direction: column; gap: 12px;">
                                ${references.map(ref => `
                                    <div style="page-break-inside: avoid;">
                                        <div style="font-weight: 700; font-size: ${sizes.body}; color: #111827;">${escapeHtml(ref.name)}</div>
                                        <div style="font-size: ${sizes.small}; color: #6b7280;">${escapeHtml(ref.title)}, ${escapeHtml(ref.company)}</div>
                                        ${ref.email ? `<div style="font-size: ${sizes.small}; color: #374151;">${escapeHtml(ref.email)}</div>` : ''}
                                        ${ref.phone ? `<div style="font-size: ${sizes.small}; color: #374151;">${escapeHtml(ref.phone)}</div>` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Personal Details -->
                    ${(personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber)) ? `
                        <section style="margin-bottom: 32px;">
                            ${SectionHeader(t.sections.personalDetails, '&#128221;')}
                            <div style="display: flex; flex-direction: column; gap: 6px; font-size: ${sizes.body};">
                                ${personalInfo.nationality ? `<div><span style="font-weight: 600;">Nationality:</span> ${escapeHtml(personalInfo.nationality)}</div>` : ''}
                                ${personalInfo.idType && personalInfo.idNumber ? `
                                    <div>
                                        <span style="font-weight: 600;">
                                            ${personalInfo.idType === 'id' ? 'ID' :
                    personalInfo.idType === 'passport' ? 'Passport' :
                        personalInfo.idType === 'driving_license' ? 'Driving License' : 'ID'}:
                                        </span> ${escapeHtml(personalInfo.idNumber)}
                                    </div>
                                ` : ''}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Custom Field -->
                    ${personalInfo.customField && personalInfo.customFieldLabel ? `
                        <section style="margin-bottom: 32px;">
                            ${SectionHeader(escapeHtml(personalInfo.customFieldLabel), '&#128204;')}
                            <p style="font-size: ${sizes.body}; line-height: 1.6;">${formatDescription(personalInfo.customField)}</p>
                        </section>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
};

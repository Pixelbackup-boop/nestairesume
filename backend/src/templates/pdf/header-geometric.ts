/**
 * Header Geometric Template
 * Ported from frontend/components/templates/layouts/header/HeaderGeometric.tsx
 */

import { PdfResumeData, PdfTheme, PdfTranslations } from '../../types/pdf';
import {
    getFontFamily,
    fontSizes,
    getBackgroundCSS,
    escapeHtml,
    formatDescription,
    getLanguageLevel,
    getFontScale,
    getIconSVG
} from './shared/helpers';
import { getTranslations } from './shared/translations';
import { formatLocalizedDate } from './shared/dateUtils';

export const renderHeaderGeometric = (data: PdfResumeData, theme: PdfTheme, translations?: PdfTranslations, locale: string = 'en'): string => {
    const t = getTranslations(translations);
    const {
        personalInfo,
        experience = [],
        education = [],
        skills = [],
        strengths = [],
        languages = [],
        interests = [],
        certifications = [],
        awards = [],
        customFields = [],
        fonts,
        customThemeColor
    } = data;

    const headingFont = getFontFamily(fonts?.heading || 'Merriweather');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Fixed colors matching frontend
    const headerBgColor = customThemeColor || '#78350f'; // Follows accent color
    const accentColor = customThemeColor || '#92400e'; // Amber-800 (Copper)
    const textColor = '#374151'; // Gray-700

    // Dimensions
    const patternHeight = 120;

    // Font Scaling
    const scale = getFontScale(fonts?.size);
    const s = (px: number) => `${Math.max(5, Math.round(px * scale))}px`;
    const sNum = (px: number) => Math.max(5, Math.round(px * scale));

    const fs = {
        name: s(32),
        sectionHeading: s(14),
        entryTitle: s(13),
        body: s(12),
        small: s(10)
    };

    const SectionRow = (label: string, content: string) => `
        <div class="resume-section" style="display: flex; margin-bottom: 20px;">
            <div style="width: 25%; padding-right: 20px;">
                <h3 style="
                    font-family: ${headingFont};
                    font-size: ${fs.sectionHeading};
                    color: ${accentColor};
                    text-transform: uppercase;
                    border-bottom: 2px solid ${accentColor};
                    padding-bottom: 4px;
                    display: inline-block;
                    margin: 0;
                ">
                    ${escapeHtml(label)}
                </h3>
            </div>
            <div style="width: 75%;">
                ${content}
            </div>
        </div>
    `;

    const CircularProgress = (value: number, label: string) => {
        const size = 60; // Fixed size for PDF (equivalent to standard scale)
        const strokeWidth = 4;
        const radius = (size - strokeWidth) / 2;
        const circumference = 2 * Math.PI * radius;
        const strokeDashoffset = circumference - (value / 100) * circumference;

        return `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 4px; width: ${size + 20}px;">
            <div style="position: relative; width: ${size}px; height: ${size}px;">
                <svg width="${size}" height="${size}" style="transform: rotate(-90deg);">
                    <!-- Background track -->
                    <circle
                        cx="${size / 2}"
                        cy="${size / 2}"
                        r="${radius}"
                        fill="none"
                        stroke="#e5e7eb"
                        stroke-width="${strokeWidth}"
                    />
                    <!-- Progress arc -->
                    <circle
                        cx="${size / 2}"
                        cy="${size / 2}"
                        r="${radius}"
                        fill="none"
                        stroke="${accentColor}"
                        stroke-width="${strokeWidth}"
                        stroke-dasharray="${circumference}"
                        stroke-dashoffset="${strokeDashoffset}"
                        stroke-linecap="round"
                    />
                </svg>
                <!-- Center value -->
                <div style="
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: ${fs.sectionHeading};
                    font-weight: 600;
                    color: #374151;
                ">
                    ${Math.round(value)}%
                </div>
            </div>
            <!-- Label -->
            <span style="
                font-size: ${fs.body};
                color: #374151;
                text-align: center;
                word-break: break-word;
                width: 100%;
            ">
                ${escapeHtml(label)}
            </span>
        </div>
        `;
    };

    return `
        <div style="width: 100%; min-height: 100%; font-family: ${bodyFont}; font-size: ${fs.body}; background-color: #ffffff; color: ${textColor}; position: relative;">
            
            <!-- Geometric Pattern Decoration -->
            <div style="height: ${patternHeight}px; background-color: #ffffff; position: relative; overflow: hidden;">
                <svg width="100%" height="100%" viewBox="0 0 800 120" preserveAspectRatio="none" style="position: absolute; top: 0; left: 0;">
                    <path d="M0 0 L200 120 L400 0 L600 120 L800 0 V120 H0 Z" fill="none" stroke="${accentColor}" stroke-width="0.5" opacity="0.3" />
                    <path d="M0 120 L200 0 L400 120 L600 0 L800 120" fill="none" stroke="${accentColor}" stroke-width="0.5" opacity="0.3" />
                    <path d="M100 0 L300 120 L500 0 L700 120" fill="none" stroke="${accentColor}" stroke-width="0.5" opacity="0.3" />
                    <circle cx="200" cy="60" r="2" fill="${accentColor}" opacity="0.6" />
                    <circle cx="400" cy="60" r="2" fill="${accentColor}" opacity="0.6" />
                    <circle cx="600" cy="60" r="2" fill="${accentColor}" opacity="0.6" />
                </svg>
            </div>

            <!-- Header Bar -->
            <div style="
                background-color: ${headerBgColor};
                color: #ffffff;
                padding: 10px 40px;
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
                margin-bottom: 20px;
            ">
                <h1 style="
                    font-family: ${headingFont};
                    font-size: ${fs.name};
                    font-weight: 400;
                    letter-spacing: 0.05em;
                    margin-bottom: 8px;
                ">
                    ${escapeHtml(personalInfo.fullName || 'Your Name')}
                </h1>

                <div style="
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 24px;
                    font-size: ${fs.small};
                    color: rgba(255,255,255,0.9);
                ">
                    ${personalInfo.email ? `<span>${escapeHtml(personalInfo.email)}</span>` : ''}
                    ${personalInfo.phone ? `<span>${escapeHtml(personalInfo.phone)}</span>` : ''}
                    ${personalInfo.location ? `<span>${escapeHtml(personalInfo.location)}</span>` : ''}
                    ${personalInfo.website ? `<span>${escapeHtml(personalInfo.website)}</span>` : ''}
                    ${personalInfo.linkedin ? `<span>${escapeHtml(personalInfo.linkedin)}</span>` : ''}
                </div>
            </div>

            <!-- Main Content Body -->
            <div style="padding: 20px 40px 40px 40px;">

                ${personalInfo.summary ? SectionRow(t.sections.profile,
        `<p style="line-height: 1.6; margin-top: 0;">${formatDescription(personalInfo.summary)}</p>`
    ) : ''}

                ${experience.length > 0 ? SectionRow(t.sections.experience, `
                    <div style="display: flex; flex-direction: column; gap: 24px;">
                        ${experience.map(exp => `
                            <div data-paginate="item">
                                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
                                    <h4 style="font-size: ${fs.entryTitle}; font-weight: 700; color: #1f2937; margin: 0;">
                                        ${escapeHtml(exp.title)}
                                    </h4>
                                    <span style="font-size: ${fs.small}; color: #6b7280;">
                                        ${formatLocalizedDate(exp.startDate, locale)} - ${exp.current ? t.labels.present : formatLocalizedDate(exp.endDate, locale)}
                                    </span>
                                </div>
                                <p style="color: ${accentColor}; font-weight: 600; margin-bottom: 4px; font-size: ${fs.body};">
                                    ${escapeHtml(exp.company)} ${(exp.city || exp.country) ? `| ${escapeHtml([exp.city, exp.country].filter(Boolean).join(', '))}` : ''}
                                </p>
                                ${exp.description ? `
                                    <div style="font-size: ${fs.body}; line-height: 1.5; color: #4b5563;">
                                        ${formatDescription(exp.description)}
                                    </div>
                                ` : ''}
                            </div>
                        `).join('')}
                    </div>
                `) : ''}

                ${education.length > 0 ? SectionRow(t.sections.education, `
                    <div style="display: flex; flex-direction: column; gap: 16px;">
                        ${education.map(edu => `
                            <div data-paginate="item">
                                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
                                    <h4 style="font-size: ${fs.entryTitle}; font-weight: 700; color: #1f2937; margin: 0;">
                                        ${escapeHtml(edu.degree)}
                                        ${edu.gpa ? `<span style="margin-left: 8px; opacity: 0.8; font-weight: 500;">GPA: ${escapeHtml(edu.gpa)}</span>` : ''}
                                    </h4>
                                    <span style="font-size: ${fs.small}; color: #6b7280;">
                                        ${formatLocalizedDate(edu.startDate, locale)} - ${edu.current ? t.labels.present : formatLocalizedDate(edu.endDate, locale)}
                                    </span>
                                </div>
                                <p style="color: ${accentColor}; font-weight: 600; font-size: ${fs.body}; margin-bottom: 4px;">
                                    ${escapeHtml(edu.school)}${(edu.city || edu.country) ? `, ${escapeHtml([edu.city, edu.country].filter(Boolean).join(', '))}` : ''}
                                </p>
                                ${edu.honors ? `<p style="font-size: ${fs.small}; color: #4b5563; opacity: 0.8; margin: 0;">${escapeHtml(edu.honors)}</p>` : ''}
                                ${edu.clubs ? `<p style="font-size: ${s(10)}; color: #6b7280; opacity: 0.7; margin: 0;">Activities: ${escapeHtml(edu.clubs)}</p>` : ''}
                                ${edu.description ? `<p style="font-size: ${fs.small}; margin-top: 2px;">${formatDescription(edu.description)}</p>` : ''}
                            </div>
                        `).join('')}
                    </div>
                `) : ''}

                ${strengths.length > 0 ? SectionRow(t.sections.strengths, `
                    <div style="display: flex; flex-wrap: wrap; gap: 30px;">
                        ${strengths.slice(0, 4).map(str => {
        const val = str.level > 5 ? str.level : str.level * 20;
        return CircularProgress(val, str.name);
    }).join('')}
                    </div>
                `) : ''}

                ${skills.length > 0 ? SectionRow(t.sections.skills, `
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        ${skills.map(skill => {
        const val = skill.level > 5 ? skill.level : (skill.level || 3) * 20;
        return `
                                <div data-paginate="item">
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                                        <span style="font-size: ${fs.body}; font-weight: 500; color: ${theme.heading};">${escapeHtml(skill.name)}</span>
                                    </div>
                                    <div style="width: 100%; height: 6px; background-color: #f1f5f9; border-radius: 3px;">
                                        <div style="width: ${val}%; height: 100%; background-color: ${accentColor}; border-radius: 3px;"></div>
                                    </div>
                                </div>
                            `;
    }).join('')}
                    </div>
                `) : ''}

                ${languages.length > 0 ? SectionRow(t.sections.languages, `
                     <div style="display: flex; flex-direction: column; gap: 8px;">
                        ${languages.map(lang => `
                            <div data-paginate="item" style="display: flex; justify-content: space-between; border-bottom: 1px solid #f3f4f6; padding-bottom: 4px;">
                                <span style="font-weight: 600; color: #1f2937;">${escapeHtml(lang.name)}</span>
                                <span style="color: #6b7280;">${escapeHtml(lang.proficiency)}</span>
                            </div>
                        `).join('')}
                     </div>
                `) : ''}

                ${interests.length > 0 ? SectionRow(t.sections.interests, `
                    <div style="display: flex; flex-wrap: wrap; gap: 16px;">
                        ${interests.map(int => `
                            <span data-paginate="item" style="color: #374151; display: flex; align-items: center; gap: 6px;">
                                ${getIconSVG('diamond', accentColor, sNum(10), true)} ${escapeHtml(int.name)}
                            </span>
                        `).join('')}
                    </div>
                `) : ''}

                ${(certifications.length > 0 || awards.length > 0) ? SectionRow(t.sections.credentials, `
                    <div>
                        ${certifications.length > 0 ? `
                            <div style="margin-bottom: 16px;">
                                <h4 style="font-size: ${fs.small}; font-weight: 600; color: #6b7280; margin-bottom: 8px;">${t.sections.certifications}</h4>
                                <div style="display: flex; flex-direction: column; gap: 8px;">
                                    ${certifications.map(cert => `
                                        <div data-paginate="item">
                                            <div style="font-weight: 600; color: #1f2937;">${escapeHtml(cert.name)}</div>
                                            <div style="font-size: ${fs.small}; color: #6b7280;">${escapeHtml(cert.issuer)} • ${formatLocalizedDate(cert.date, locale)}</div>
                                            ${cert.url ? `<div style="font-size: ${s(10)}; color: #6b7280; opacity: 0.7;">${escapeHtml(cert.url)}</div>` : ''}
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}

                        ${awards.length > 0 ? `
                            <div>
                                <h4 style="font-size: ${fs.small}; font-weight: 600; color: #6b7280; margin-bottom: 8px;">${t.sections.awards}</h4>
                                <div style="display: flex; flex-direction: column; gap: 8px;">
                                    ${awards.map(award => `
                                        <div data-paginate="item">
                                            <div style="font-weight: 600; color: #1f2937;">${escapeHtml(award.title)}</div>
                                            <div style="font-size: ${fs.small}; color: #6b7280;">${escapeHtml(award.issuer)} • ${formatLocalizedDate(award.date, locale)}</div>
                                        
                                            ${award.description ? `<p style="font-size: ${s(11)}; line-height: 1.5; color: #4b5563; margin-top: 2px;">${formatDescription(award.description)}</p>` : ''}
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}
                    </div>
                `) : ''}

                ${(personalInfo.x || personalInfo.github || personalInfo.dribbble || personalInfo.behance || personalInfo.instagram) ? SectionRow(t.sections.socialLinks, `
                    <div style="display: flex; flex-direction: column; gap: 6px;">
                        ${personalInfo.x ? `<div data-paginate="item"><span style="font-weight: 600;">X:</span> ${escapeHtml(personalInfo.x)}</div>` : ''}
                        ${personalInfo.github ? `<div data-paginate="item"><span style="font-weight: 600;">GitHub:</span> ${escapeHtml(personalInfo.github)}</div>` : ''}
                        ${personalInfo.dribbble ? `<div data-paginate="item"><span style="font-weight: 600;">Dribbble:</span> ${escapeHtml(personalInfo.dribbble)}</div>` : ''}
                        ${personalInfo.behance ? `<div data-paginate="item"><span style="font-weight: 600;">Behance:</span> ${escapeHtml(personalInfo.behance)}</div>` : ''}
                        ${personalInfo.instagram ? `<div data-paginate="item"><span style="font-weight: 600;">Instagram:</span> ${escapeHtml(personalInfo.instagram)}</div>` : ''}
                    </div>
                `) : ''}
                
                ${(personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber)) ? SectionRow(t.sections.personalDetails, `
                    <div style="display: flex; flex-direction: column; gap: 6px;">
                        ${personalInfo.nationality ? `<div data-paginate="item"><span style="font-weight: 600;">Nationality:</span> ${escapeHtml(personalInfo.nationality)}</div>` : ''}
                        ${(personalInfo.idType && personalInfo.idNumber) ? `
                            <div data-paginate="item">
                                <span style="font-weight: 600;">
                                    ${personalInfo.idType === 'id' ? 'ID' :
                personalInfo.idType === 'passport' ? 'Passport' :
                    personalInfo.idType === 'driving_license' ? 'Driving License' : 'ID'}:
                                </span> ${escapeHtml(personalInfo.idNumber)}
                            </div>
                        ` : ''}
                    </div>
                `) : ''}

                ${customFields.map(field => SectionRow(field.label, `
                    <p style="line-height: 1.6; margin: 0;">${formatDescription(field.content)}</p>
                `)).join('')}

            </div>
        </div>
    `;
};

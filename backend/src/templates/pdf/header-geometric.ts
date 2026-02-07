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
    getLanguageLevel
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
        references = [],
        customFields = [],
        fonts,
        customThemeColor
    } = data;

    const headingFont = getFontFamily(fonts?.heading || 'Merriweather');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Fixed colors matching frontend
    const headerBgColor = '#78350f'; // Amber-900 (Dark Brown)
    const accentColor = customThemeColor || '#92400e'; // Amber-800 (Copper)
    const textColor = '#374151'; // Gray-700

    // Dimensions
    const patternHeight = 120;

    // Name font size calculation (matching frontend 32px base)
    const sizeName = fonts?.size || 'medium';
    const nameSize = sizeName === 'small' ? '28px' : sizeName === 'large' ? '36px' : '32px';

    // Parse base size for relative scaling
    const baseSizeVal = parseInt(sizeConfig.base); // e.g. 14

    // Derived sizes to match frontend hierarchy
    const sizes = {
        name: nameSize,
        sectionHeading: `${baseSizeVal}px`,       // ~14px
        entryTitle: `${baseSizeVal - 1}px`,       // ~13px
        body: `${baseSizeVal - 2}px`,             // ~12px
        small: `${baseSizeVal - 4}px`,            // ~10px
    };

    const SectionRow = (label: string, content: string) => `
        <div style="display: flex; margin-bottom: 20px; page-break-inside: avoid;">
            <div style="width: 25%; padding-right: 20px;">
                <h3 style="
                    font-family: ${headingFont};
                    font-size: ${sizes.sectionHeading};
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
                    font-size: 14px;
                    font-weight: 600;
                    color: #374151;
                ">
                    ${Math.round(value)}%
                </div>
            </div>
            <!-- Label -->
            <span style="
                font-size: 12px;
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
        <div style="width: 100%; min-height: 100%; font-family: ${bodyFont}; font-size: ${sizeConfig.base}; background-color: #ffffff; color: ${textColor}; position: relative;">
            
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
                    font-size: ${sizes.name};
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
                    font-size: ${sizes.small};
                    color: rgba(255,255,255,0.9);
                ">
                    ${personalInfo.email ? `<span>${escapeHtml(personalInfo.email)}</span>` : ''}
                    ${personalInfo.phone ? `<span>${escapeHtml(personalInfo.phone)}</span>` : ''}
                    ${personalInfo.location ? `<span>${escapeHtml(personalInfo.location)}</span>` : ''}
                </div>
            </div>

            <!-- Main Content Body -->
            <div style="padding: 20px 40px;">

                ${personalInfo.summary ? SectionRow(t.sections.profile,
        `<p style="line-height: 1.6; margin-top: 0;">${formatDescription(personalInfo.summary)}</p>`
    ) : ''}

                ${experience.length > 0 ? SectionRow(t.sections.experience, `
                    <div style="display: flex; flex-direction: column; gap: 24px;">
                        ${experience.map(exp => `
                            <div>
                                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
                                    <h4 style="font-size: ${sizes.entryTitle}; font-weight: 700; color: #1f2937; margin: 0;">
                                        ${escapeHtml(exp.title)}
                                    </h4>
                                    <span style="font-size: ${sizes.small}; color: #6b7280;">
                                        ${formatLocalizedDate(exp.startDate, locale)} - ${exp.current ? t.labels.present : formatLocalizedDate(exp.endDate, locale)}
                                    </span>
                                </div>
                                <p style="color: ${accentColor}; font-weight: 600; margin-bottom: 4px; font-size: ${sizes.body};">
                                    ${escapeHtml(exp.company)} ${exp.city ? `| ${escapeHtml(exp.city)}` : ''}
                                </p>
                                ${exp.description ? `
                                    <div style="font-size: ${sizes.body}; line-height: 1.5; color: #4b5563;">
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
                            <div>
                                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
                                    <h4 style="font-size: ${sizes.entryTitle}; font-weight: 700; color: #1f2937; margin: 0;">
                                        ${escapeHtml(edu.degree)}
                                    </h4>
                                    <span style="font-size: ${sizes.small}; color: #6b7280;">
                                        ${formatLocalizedDate(edu.startDate, locale)} - ${edu.current ? t.labels.present : formatLocalizedDate(edu.endDate, locale)}
                                    </span>
                                </div>
                                <p style="color: ${accentColor}; font-weight: 600; font-size: ${sizes.body}; margin-bottom: 4px;">
                                    ${escapeHtml(edu.school)}, ${escapeHtml(edu.city)}
                                </p>
                                ${edu.description ? `<p style="font-size: ${sizes.small}; margin-top: 2px;">${formatDescription(edu.description)}</p>` : ''}
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
                                <div>
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                                        <span style="font-size: 11px; font-weight: 500; color: ${theme.heading};">${escapeHtml(skill.name)}</span>
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
                            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #f3f4f6; padding-bottom: 4px;">
                                <span style="font-weight: 600; color: #1f2937;">${escapeHtml(lang.name)}</span>
                                <span style="color: #6b7280;">${escapeHtml(lang.proficiency)}</span>
                            </div>
                        `).join('')}
                     </div>
                `) : ''}

                ${interests.length > 0 ? SectionRow(t.sections.interests, `
                    <div style="display: flex; flex-wrap: wrap; gap: 16px;">
                        ${interests.map(int => `
                            <span style="color: #374151; display: flex; align-items: center; gap: 6px;">
                                <span style="color: ${accentColor};">◆</span> ${escapeHtml(int.name)}
                            </span>
                        `).join('')}
                    </div>
                `) : ''}

                ${(certifications.length > 0 || awards.length > 0) ? SectionRow(t.sections.credentials, `
                    <div>
                        ${certifications.length > 0 ? `
                            <div style="margin-bottom: 16px;">
                                <h4 style="font-size: ${sizes.small}; font-weight: 600; color: #6b7280; margin-bottom: 8px;">${t.sections.certifications}</h4>
                                <div style="display: flex; flex-direction: column; gap: 8px;">
                                    ${certifications.map(cert => `
                                        <div>
                                            <div style="font-weight: 600; color: #1f2937;">${escapeHtml(cert.name)}</div>
                                            <div style="font-size: ${sizes.small}; color: #6b7280;">${escapeHtml(cert.issuer)} • ${formatLocalizedDate(cert.date, locale)}</div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}

                        ${awards.length > 0 ? `
                            <div>
                                <h4 style="font-size: ${sizes.small}; font-weight: 600; color: #6b7280; margin-bottom: 8px;">${t.sections.awards}</h4>
                                <div style="display: flex; flex-direction: column; gap: 8px;">
                                    ${awards.map(award => `
                                        <div>
                                            <div style="font-weight: 600; color: #1f2937;">${escapeHtml(award.title)}</div>
                                            <div style="font-size: ${sizes.small}; color: #6b7280;">${escapeHtml(award.issuer)} • ${formatLocalizedDate(award.date, locale)}</div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}
                    </div>
                `) : ''}

                ${(personalInfo.linkedin || personalInfo.x || personalInfo.github || personalInfo.dribbble || personalInfo.behance || personalInfo.instagram) ? SectionRow(t.sections.socialLinks, `
                    <div style="display: flex; flex-direction: column; gap: 6px;">
                        ${personalInfo.linkedin ? `<div><span style="font-weight: 600;">LinkedIn:</span> ${escapeHtml(personalInfo.linkedin)}</div>` : ''}
                        ${personalInfo.x ? `<div><span style="font-weight: 600;">X:</span> ${escapeHtml(personalInfo.x)}</div>` : ''}
                        ${personalInfo.github ? `<div><span style="font-weight: 600;">GitHub:</span> ${escapeHtml(personalInfo.github)}</div>` : ''}
                        ${personalInfo.dribbble ? `<div><span style="font-weight: 600;">Dribbble:</span> ${escapeHtml(personalInfo.dribbble)}</div>` : ''}
                        ${personalInfo.behance ? `<div><span style="font-weight: 600;">Behance:</span> ${escapeHtml(personalInfo.behance)}</div>` : ''}
                        ${personalInfo.instagram ? `<div><span style="font-weight: 600;">Instagram:</span> ${escapeHtml(personalInfo.instagram)}</div>` : ''}
                    </div>
                `) : ''}
                
                ${references.length > 0 ? SectionRow(t.sections.references, `
                    <div style="display: flex; flex-direction: column; gap: 16px;">
                        ${references.map(ref => `
                            <div>
                                <div style="font-weight: 700; color: #1f2937;">${escapeHtml(ref.name)}</div>
                                <div style="color: #6b7280;">${escapeHtml(ref.title)}, ${escapeHtml(ref.company)}</div>
                                ${ref.email ? `<div style="font-size: ${sizes.small}; color: #4b5563;">${escapeHtml(ref.email)}</div>` : ''}
                                ${ref.phone ? `<div style="font-size: ${sizes.small}; color: #4b5563;">${escapeHtml(ref.phone)}</div>` : ''}
                            </div>
                        `).join('')}
                    </div>
                `) : ''}

                ${(personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber)) ? SectionRow(t.sections.personalDetails, `
                    <div style="display: flex; flex-direction: column; gap: 6px;">
                        ${personalInfo.nationality ? `<div><span style="font-weight: 600;">Nationality:</span> ${escapeHtml(personalInfo.nationality)}</div>` : ''}
                        ${(personalInfo.idType && personalInfo.idNumber) ? `
                            <div>
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

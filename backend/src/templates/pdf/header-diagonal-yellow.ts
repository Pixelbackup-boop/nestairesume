/**
 * Header Diagonal Yellow Template
 * Ported from frontend/components/templates/layouts/header/HeaderDiagonalYellow.tsx
 *
 * Layout matches frontend:
 * - Header: Dark background (#18181b) with yellow diagonal on top-right
 * - Photo: Circular, centered at ~60%, overlapping header bottom
 * - Contact: Top-right on yellow diagonal area
 * - Body: 55/45 two-column split
 * - Left: About Me, Experience
 * - Right: Education, Skills, Strengths, Interests, Credentials, Languages
 * - Footer: Yellow diagonal at bottom-left (fixed on every page)
 */

import { PdfResumeData, PdfTheme, PdfTranslations } from '../../types/pdf';
import {
    getFontFamily,
    fontSizes,
    escapeHtml,
    formatDescription,
} from './shared/helpers';
import { getTranslations } from './shared/translations';
import { formatLocalizedDate } from './shared/dateUtils';

export const renderHeaderDiagonalYellow = (data: PdfResumeData, theme: PdfTheme, translations?: PdfTranslations, locale: string = 'en'): string => {
    const t = getTranslations(translations);
    const {
        personalInfo,
        experience = [],
        education = [],
        skills = [],
        languages = [],
        interests = [],
        strengths = [],
        certifications = [],
        awards = [],
        references = [],
        fonts
    } = data;

    const headingFont = getFontFamily(fonts?.heading || 'Titan One');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Colors matching frontend
    const darkBg = '#18181b';
    const accentColor = theme.primary || '#facc15';
    const textColor = '#3f3f46';

    // Simple section header matching frontend
    const SectionHeader = (title: string) => `
        <h3 style="font-size: 14px; font-weight: 900; color: #18181b; text-transform: uppercase; margin-bottom: 12px; letter-spacing: 0.05em;">
            ${title}
        </h3>
    `;

    // Progress bar for skills - matches frontend ProgressBar component
    const ProgressBar = (label: string, value: number) => `
        <div style="margin-bottom: 8px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
                <span style="font-size: 10px; font-weight: 700; color: #18181b;">${escapeHtml(label)}</span>
            </div>
            <div style="width: 100%; height: 10px; background-color: #e4e4e7; border-radius: 4px;">
                <div style="width: ${value}%; height: 100%; background-color: ${accentColor}; border-radius: 4px;"></div>
            </div>
        </div>
    `;

    // Profile Image - circular, positioned to overlap header bottom
    const profileImage = personalInfo.profileImage ? `
        <img
            src="${personalInfo.profileImage}"
            alt="${escapeHtml(personalInfo.fullName)}"
            style="position: absolute; bottom: -75px; left: 60%; transform: translateX(-50%); width: 150px; height: 150px; border-radius: 50%; border: 5px solid #ffffff; object-fit: cover; z-index: 20;"
        />
    ` : '';

    // About Me section
    const aboutMeHtml = personalInfo.summary ? `
        <div data-paginate style="margin-bottom: 24px;">
            ${SectionHeader(t.sections.profile)}
            <p style="line-height: 1.6; font-size: 11px; color: ${textColor};">
                ${formatDescription(personalInfo.summary)}
            </p>
        </div>
    ` : '';

    // Experience section - matches frontend space-y-4 (16px gap)
    const experienceHtml = experience.length > 0 ? `
        <div data-paginate style="margin-bottom: 24px;">
            ${SectionHeader(t.sections.experience)}
            <div style="display: flex; flex-direction: column; gap: 16px;">
                ${experience.map(exp => `
                    <div data-paginate="item">
                        <h4 style="font-size: 12px; font-weight: 800; color: #18181b; text-transform: uppercase;">
                            ${escapeHtml(exp.title)}
                        </h4>
                        <div style="display: flex; justify-content: space-between; font-size: 10px; color: #52525b; margin-bottom: 4px; font-weight: 600;">
                            <span>${escapeHtml(exp.company)}</span>
                            <span>${formatLocalizedDate(exp.startDate, locale)} - ${exp.current ? t.labels.present : formatLocalizedDate(exp.endDate, locale)}</span>
                        </div>
                        ${exp.description ? `
                            <div style="font-size: 11px; line-height: 1.5; color: ${textColor};">
                                ${formatDescription(exp.description)}
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        </div>
    ` : '';

    // Education section - matches frontend space-y-4 (16px gap)
    const educationHtml = education.length > 0 ? `
        <div data-paginate style="margin-bottom: 24px;">
            ${SectionHeader(t.sections.education)}
            <div style="display: flex; flex-direction: column; gap: 16px;">
                ${education.map(edu => `
                    <div data-paginate="item">
                        <h4 style="font-size: 12px; font-weight: 800; color: #18181b; text-transform: uppercase;">
                            ${escapeHtml(edu.degree)}
                        </h4>
                        <div style="font-size: 10px; color: #52525b; font-weight: 600;">
                            ${escapeHtml(edu.school)}, ${formatLocalizedDate(edu.startDate, locale)} - ${edu.current ? t.labels.present : formatLocalizedDate(edu.endDate, locale)}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    ` : '';

    // Skills section with progress bars
    const skillsHtml = skills.length > 0 ? `
        <div data-paginate style="margin-bottom: 24px;">
            ${SectionHeader(t.sections.skills)}
            <div>
                ${skills.map(skill => `
                    <div data-paginate="item">
                        ${ProgressBar(skill.name, (skill.level || 3) * 20)}
                    </div>
                `).join('')}
            </div>
        </div>
    ` : '';

    // Strengths (tags/badges) - matches frontend fs.small (10px)
    const strengthsHtml = strengths && strengths.length > 0 ? `
        <div data-paginate style="margin-bottom: 24px;">
            ${SectionHeader(t.sections.strengths)}
            <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                ${strengths.map(str => `
                    <span data-paginate="item" style="background-color: ${accentColor}; color: #18181b; padding: 4px 12px; border-radius: 4px; font-size: 10px; font-weight: 600;">
                        ${escapeHtml(str.name)}
                    </span>
                `).join('')}
            </div>
        </div>
    ` : '';

    // Interests - matches frontend fs.body (11px)
    const interestsHtml = interests && interests.length > 0 ? `
        <div data-paginate style="margin-bottom: 24px;">
            ${SectionHeader(t.sections.interests)}
            <div style="display: flex; flex-wrap: wrap; gap: 8px 16px;">
                ${interests.map(int => `
                    <span style="font-size: 11px; font-weight: 500;">
                        ★ ${escapeHtml(int.name)}
                    </span>
                `).join('')}
            </div>
        </div>
    ` : '';

    // Credentials (Certifications & Awards) - matches frontend fs.small (10px) for sub-headers, fs.body (11px) for names
    const credentialsHtml = (certifications && certifications.length > 0) || (awards && awards.length > 0) ? `
        <div data-paginate style="margin-bottom: 24px;">
            ${SectionHeader(t.sections.credentials)}
            ${certifications && certifications.length > 0 ? `
                <div style="margin-bottom: ${awards && awards.length > 0 ? '16px' : '0'};">
                    <h4 style="font-size: 10px; font-weight: 600; color: #52525b; margin-bottom: 8px;">${t.sections.certifications}</h4>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        ${certifications.map(cert => `
                            <div data-paginate="item">
                                <div style="font-weight: 600; font-size: 11px; color: #18181b;">${escapeHtml(cert.name)}</div>
                                <div style="font-size: 10px; color: #52525b;">${escapeHtml(cert.issuer)} • ${formatLocalizedDate(cert.date, locale)}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
            ${awards && awards.length > 0 ? `
                <div>
                    <h4 style="font-size: 10px; font-weight: 600; color: #52525b; margin-bottom: 8px;">${t.sections.awards}</h4>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        ${awards.map(award => `
                            <div data-paginate="item">
                                <div style="font-weight: 600; font-size: 11px; color: #18181b;">${escapeHtml(award.title)}</div>
                                <div style="font-size: 10px; color: #52525b;">${escapeHtml(award.issuer)} • ${formatLocalizedDate(award.date, locale)}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
        </div>
    ` : '';

    // Languages
    const languagesHtml = languages && languages.length > 0 ? `
        <div data-paginate style="margin-bottom: 24px;">
            ${SectionHeader(t.sections.languages)}
            <div style="display: flex; flex-direction: column;">
                ${languages.map(lang => `
                    <div data-paginate="item" style="display: flex; justify-content: space-between; margin-bottom: 4px; font-size: 11px; font-weight: 600; border-bottom: 1px solid #e4e4e7; padding-bottom: 2px;">
                        <span>${escapeHtml(lang.name)}</span>
                        <span style="color: #52525b;">${escapeHtml(lang.proficiency || '')}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    ` : '';

    // Social Links
    const hasSocialLinks = personalInfo.linkedin || personalInfo.twitter || personalInfo.github || personalInfo.dribbble || personalInfo.behance || personalInfo.instagram;
    const socialLinksHtml = hasSocialLinks ? `
        <div data-paginate style="margin-bottom: 24px;">
            ${SectionHeader(t.sections.socialLinks)}
            <div style="display: flex; flex-direction: column; gap: 4px; font-size: 11px;">
                ${personalInfo.linkedin ? `<div data-paginate="item"><strong>LinkedIn:</strong> ${escapeHtml(personalInfo.linkedin)}</div>` : ''}
                ${personalInfo.twitter ? `<div data-paginate="item"><strong>Twitter:</strong> ${escapeHtml(personalInfo.twitter)}</div>` : ''}
                ${personalInfo.github ? `<div data-paginate="item"><strong>GitHub:</strong> ${escapeHtml(personalInfo.github)}</div>` : ''}
                ${personalInfo.dribbble ? `<div data-paginate="item"><strong>Dribbble:</strong> ${escapeHtml(personalInfo.dribbble)}</div>` : ''}
                ${personalInfo.behance ? `<div data-paginate="item"><strong>Behance:</strong> ${escapeHtml(personalInfo.behance)}</div>` : ''}
                ${personalInfo.instagram ? `<div data-paginate="item"><strong>Instagram:</strong> ${escapeHtml(personalInfo.instagram)}</div>` : ''}
            </div>
        </div>
    ` : '';

    // References
    const referencesHtml = references && references.length > 0 ? `
        <div data-paginate style="margin-bottom: 24px;">
            ${SectionHeader(t.sections.references)}
            <div style="display: flex; flex-direction: column; gap: 12px;">
                ${references.map(ref => `
                    <div data-paginate="item">
                        <div style="font-weight: 700; font-size: 11px; color: #18181b;">${escapeHtml(ref.name)}</div>
                        <div style="font-size: 10px; color: #52525b;">${escapeHtml(ref.title)}, ${escapeHtml(ref.company)}</div>
                        ${ref.email ? `<div style="font-size: 10px; color: #52525b;">${escapeHtml(ref.email)}</div>` : ''}
                        ${ref.phone ? `<div style="font-size: 10px; color: #52525b;">${escapeHtml(ref.phone)}</div>` : ''}
                    </div>
                `).join('')}
            </div>
        </div>
    ` : '';

    // Personal Details (Nationality, ID) - matches frontend
    const formatIdType = (idType: string): string => {
        switch (idType) {
            case 'id': return 'ID';
            case 'passport': return 'Passport';
            case 'driving_license': return 'Driving License';
            default: return 'ID';
        }
    };
    const hasPersonalDetails = personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber);
    const personalDetailsHtml = hasPersonalDetails ? `
        <div data-paginate style="margin-bottom: 24px;">
            ${SectionHeader(t.sections.personalDetails)}
            <div style="display: flex; flex-direction: column; gap: 4px; font-size: 11px;">
                ${personalInfo.nationality ? `<div data-paginate="item"><strong>Nationality:</strong> ${escapeHtml(personalInfo.nationality)}</div>` : ''}
                ${personalInfo.idType && personalInfo.idNumber ? `<div data-paginate="item"><strong>${formatIdType(personalInfo.idType)}:</strong> ${escapeHtml(personalInfo.idNumber)}</div>` : ''}
            </div>
        </div>
    ` : '';

    // Custom Field
    const customFieldHtml = personalInfo.customField && personalInfo.customFieldLabel ? `
        <div data-paginate style="margin-bottom: 24px;">
            ${SectionHeader(personalInfo.customFieldLabel)}
            <p style="font-size: 11px; line-height: 1.6;">${escapeHtml(personalInfo.customField)}</p>
        </div>
    ` : '';

    // Contact items for header - matches frontend fs.small (10px)
    const contactHtml = `
        <div style="text-align: right; font-size: 10px; color: #18181b; font-weight: 600; z-index: 10;">
            ${personalInfo.phone ? `<div style="margin-bottom: 4px;">${escapeHtml(personalInfo.phone)}</div>` : ''}
            ${personalInfo.email ? `<div style="margin-bottom: 4px;">${escapeHtml(personalInfo.email)}</div>` : ''}
            ${personalInfo.location ? `<div style="margin-bottom: 4px;">${escapeHtml(personalInfo.location)}</div>` : ''}
            ${personalInfo.website ? `<div>${escapeHtml(personalInfo.website)}</div>` : ''}
        </div>
    `;

    // HTML Construction
    return `
        <div style="width: 100%; min-height: 100%; font-family: ${bodyFont}; color: ${textColor}; background-color: #ffffff; position: relative;">

            <!-- Footer Diagonal Container - Fixed full page height, diagonal at bottom -->
            <div style="position: fixed; top: 0; left: 0; width: 100%; height: 297mm; pointer-events: none; z-index: 0;">
                <div style="position: absolute; bottom: 0; left: 0; width: 40%; height: 80px; background-color: ${accentColor}; clip-path: polygon(0 0, 70% 100%, 0% 100%); -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important;"></div>
            </div>

            <!-- Header Area -->
            <div style="height: 220px; background-color: ${darkBg}; position: relative; margin-bottom: 80px;">

                <!-- Yellow Diagonal Shape Top-Right -->
                <div style="position: absolute; top: 0; right: 0; width: 35%; height: 100%; background-color: ${accentColor}; clip-path: polygon(30% 0, 100% 0, 100% 100%, 0% 100%); -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important;"></div>

                <!-- Header Content -->
                <div style="padding: 40px; display: flex; justify-content: space-between; align-items: flex-start; height: 100%; position: relative; z-index: 10;">

                    <!-- Name - Left side -->
                    <div style="width: 60%; padding-top: 20px;">
                        <h1 style="font-family: ${headingFont}; font-size: 32px; font-weight: 400; color: #ffffff; text-transform: uppercase; line-height: 1.1; margin: 0 0 16px 0;">
                            ${escapeHtml(personalInfo.fullName)}
                        </h1>
                        <p style="font-size: 14px; color: ${accentColor}; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700; margin: 0;">
                            ${escapeHtml(personalInfo.jobTitle)}
                        </p>
                    </div>

                    <!-- Contact - Top Right (on Yellow) -->
                    <div style="width: 30%;">
                        ${contactHtml}
                    </div>
                </div>

                <!-- Photo - Centered overlapping bottom edge -->
                ${profileImage}
            </div>

            <!-- Two Column Layout - 55/45 split matching frontend -->
            <div style="display: flex; padding: 0 40px 40px; gap: 30px;">

                <!-- Left Column (55%) - About Me, Experience -->
                <div style="width: 55%;">
                    ${aboutMeHtml}
                    ${experienceHtml}
                </div>

                <!-- Right Column (45%) - Education, Skills, Strengths, Interests, Languages, Credentials, Social Links, References, Personal Details, Custom Field -->
                <div style="width: 45%;">
                    ${educationHtml}
                    ${skillsHtml}
                    ${strengthsHtml}
                    ${interestsHtml}
                    ${languagesHtml}
                    ${credentialsHtml}
                    ${socialLinksHtml}
                    ${referencesHtml}
                    ${personalDetailsHtml}
                    ${customFieldHtml}
                </div>
            </div>
        </div>
    `;
};

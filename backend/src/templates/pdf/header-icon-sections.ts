import { PdfResumeData, PdfTheme, PdfTranslations } from '../../types/pdf';
import {
    getFontFamily,
    escapeHtml,
    formatDescription,
    getFontScale
} from './shared/helpers';
import { getTranslations } from './shared/translations';
import { formatLocalizedDate } from './shared/dateUtils';

export const renderHeaderIconSections = (
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

    // Font Families
    const headingFont = getFontFamily(fonts?.heading || 'Merriweather');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');

    // Font Scaling
    const scale = getFontScale(fonts?.size);
    const s = (px: number) => `${Math.max(5, Math.round(px * scale))}px`;

    const fs = {
        name: s(32),
        jobTitle: s(14),
        sectionHeading: s(14),
        entryTitle: s(12),
        body: s(11),
        small: s(10)
    };

    // Colors
    // Default to white background (removed #ecfeff hardcode) unless user overrides
    const pageBg = '#ffffff';
    const orangeAccent = data.customThemeColor || theme.primary || '#ea580c';
    const borderColor = '#000000';

    // Use user text color if provided, otherwise default for this template is black
    // But this template has specific black borders/text design.
    // We'll respect specific text sections.

    // Dimensions
    const photoSize = 140;

    // Helpers
    const ProgressBar = (label: string, value: number) => `
        <div style="margin-bottom: 12px;" data-paginate="item">
            <div style="font-size: ${fs.body}; font-weight: 500; margin-bottom: 4px;">${escapeHtml(label)}</div>
            <div style="width: 100%; height: 8px; background-color: #e5e7eb; border-radius: 4px; overflow: hidden;">
                <div style="width: ${value}%; height: 100%; background-color: ${orangeAccent}; border-radius: 4px;"></div>
            </div>
        </div>
    `;

    const BoxSection = (title: string, icon: string, content: string) => `
        <section style="border: 1px solid ${borderColor}; background-color: #ffffff; padding: 44px 32px 32px 32px; margin-bottom: 32px; position: relative; box-shadow: 4px 4px 0px 0px rgba(0,0,0,0.1);" data-paginate>
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 24px; border-bottom: 2px solid ${orangeAccent}; padding-bottom: 8px;">
                <span style="background-color: ${orangeAccent}; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px;">
                    ${icon}
                </span>
                <h3 style="font-family: ${headingFont}; font-size: ${fs.sectionHeading}; font-weight: 700; text-transform: uppercase; color: #1f2937;">
                    ${title}
                </h3>
            </div>
            <div style="font-size: ${fs.body};">
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
        <div style="width: 100%; min-height: 100%; font-family: ${bodyFont}; font-size: ${fs.body}; background-color: ${pageBg}; color: #000000; padding: 32px; box-sizing: border-box;">

            <!-- Header Box -->
            <header style="display: flex; align-items: center; gap: 32px; border: 1px solid ${borderColor}; background-color: #ffffff; padding: 32px; margin-bottom: 32px; box-shadow: 4px 4px 0px 0px rgba(0,0,0,0.1);">
                <!-- Photo -->
                ${profileImage}

                <!-- Name & Contact -->
                <div style="flex: 1;">
                    <h1 style="font-family: ${headingFont}; font-size: ${fs.name}; font-weight: 700; color: #000000; margin-bottom: 8px; line-height: 1.1;">
                        ${escapeHtml(personalInfo.fullName || 'Your Name')}
                    </h1>
                    <p style="font-size: ${fs.jobTitle}; color: ${orangeAccent}; font-weight: 600; text-transform: uppercase; margin-bottom: 12px; letter-spacing: 0.05em;">
                        ${escapeHtml(personalInfo.jobTitle || 'Job Title')}
                    </p>

                    <div style="display: flex; flex-wrap: wrap; gap: 8px 16px; font-size: ${fs.small}; color: #4b5563;">
                        ${personalInfo.email ? `<span>&#9993; ${escapeHtml(personalInfo.email)}</span>` : ''}
                        ${personalInfo.phone ? `<span>&#128241; ${escapeHtml(personalInfo.phone)}</span>` : ''}
                        ${personalInfo.location ? `<span>&#128205; ${escapeHtml(personalInfo.location)}</span>` : ''}
                    </div>
                </div>
            </header>

            <!-- Profile Section -->
            ${personalInfo.summary ? BoxSection(t.sections.profile, '&#128100;', `<p style="line-height: 1.6;">${formatDescription(personalInfo.summary)}</p>`) : ''}

            <!-- Experience Section -->
            ${experience.length > 0 ? BoxSection(t.sections.experience, '&#128188;', `
                <div style="display: flex; flex-direction: column; gap: 24px;">
                    ${experience.map(exp => `
                        <div data-paginate="item">
                            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
                                <h4 style="font-weight: 700; font-size: ${fs.entryTitle};">${escapeHtml(exp.title)}</h4>
                                <span style="font-size: ${fs.small}; font-weight: 600; color: ${orangeAccent};">
                                    ${formatLocalizedDate(exp.startDate, locale)} – ${exp.current ? t.labels.present : formatLocalizedDate(exp.endDate, locale)}
                                </span>
                            </div>
                            <p style="font-size: ${fs.body}; font-style: italic; margin-bottom: 6px; color: #525252;">
                                ${escapeHtml(exp.company)}, ${escapeHtml(exp.city)}
                            </p>
                            <p style="font-size: ${fs.body}; line-height: 1.5;">
                                ${formatDescription(exp.description || '')}
                            </p>
                        </div>
                    `).join('')}
                </div>
            `) : ''}

            <!-- Education Section -->
            ${education.length > 0 ? BoxSection(t.sections.education, '&#127891;', `
                <div style="display: flex; flex-direction: column; gap: 20px;">
                    ${education.map(edu => `
                        <div data-paginate="item">
                            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
                                <h4 style="font-weight: 700; font-size: ${fs.entryTitle};">${escapeHtml(edu.degree)}</h4>
                                <span style="font-size: ${fs.small}; font-weight: 600; color: ${orangeAccent};">
                                    ${formatLocalizedDate(edu.startDate, locale)} – ${edu.endDate ? formatLocalizedDate(edu.endDate, locale) : t.labels.present}
                                </span>
                            </div>
                            <p style="font-size: ${fs.body}; font-style: italic; color: #525252;">
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
                        ${BoxSection(t.sections.skills, '&#9881;', `
                            <div>
                                ${skills.map(skill => ProgressBar(skill.name, skill.level ? skill.level * 20 : 80)).join('')}
                            </div>
                        `)}
                    </div>
                ` : ''}

                <!-- Strengths Section -->
                ${strengths && strengths.length > 0 ? `
                    <div style="flex: 1;">
                        ${BoxSection(t.sections.strengths, '&#11088;', `
                            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                                ${strengths.map(str => `
                                    <span style="background-color: #fff7ed; color: ${orangeAccent}; border: 1px solid ${orangeAccent}; padding: 4px 12px; border-radius: 4px; font-size: ${fs.small}; font-weight: 600; display: inline-block;">
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
                ${languages && languages.length > 0 ? `
                    <div style="flex: 1;">
                        ${BoxSection(t.sections.languages, '&#128483;', `
                            <div style="display: flex; flex-direction: column; gap: 8px;">
                                ${languages.map(lang => `
                                    <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #f3f4f6; padding-bottom: 4px;" data-paginate="item">
                                        <span style="font-weight: 600;">${escapeHtml(lang.name)}</span>
                                        <span style="color: #6b7280;">${escapeHtml(lang.proficiency)}</span>
                                    </div>
                                `).join('')}
                            </div>
                        `)}
                    </div>
                ` : ''}

                ${interests && interests.length > 0 ? `
                    <div style="flex: 1;">
                        ${BoxSection(t.sections.interests, '&#127912;', `
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

            <!-- Credentials Section -->
            ${(certifications && certifications.length > 0) || (awards && awards.length > 0) ? BoxSection(t.sections.credentials, '&#127942;', `
                <div style="display: flex; gap: 32px;">
                    ${certifications && certifications.length > 0 ? `
                        <div style="flex: 1;">
                            <h4 style="font-size: ${fs.small}; font-weight: 600; color: #6b7280; margin-bottom: 8px;">${t.sections.certifications}</h4>
                            <div style="display: flex; flex-direction: column; gap: 8px;">
                                ${certifications.map(cert => `
                                    <div data-paginate="item">
                                        <div style="font-weight: 600; font-size: ${fs.body};">${escapeHtml(cert.name)}</div>
                                        <div style="font-size: ${fs.small}; color: #6b7280;">${escapeHtml(cert.issuer)} • ${formatLocalizedDate(cert.date, locale)}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    ${awards && awards.length > 0 ? `
                        <div style="flex: 1;">
                            <h4 style="font-size: ${fs.small}; font-weight: 600; color: #6b7280; margin-bottom: 8px;">${t.sections.awards}</h4>
                            <div style="display: flex; flex-direction: column; gap: 8px;">
                                ${awards.map(award => `
                                    <div data-paginate="item">
                                        <div style="font-weight: 600; font-size: ${fs.body};">${escapeHtml(award.title)}</div>
                                        <div style="font-size: ${fs.small}; color: #6b7280;">${escapeHtml(award.issuer)} • ${formatLocalizedDate(award.date, locale)}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
            `) : ''}

            <!-- Social Links (Boxed) -->
            ${(personalInfo.linkedin || personalInfo.x || personalInfo.github || personalInfo.dribbble || personalInfo.behance || personalInfo.instagram) ? BoxSection(t.sections.socialLinks, '&#128279;', `
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    ${personalInfo.linkedin ? `<div><span style="font-weight: 600;">LinkedIn:</span> ${escapeHtml(personalInfo.linkedin)}</div>` : ''}
                    ${personalInfo.x ? `<div><span style="font-weight: 600;">X:</span> ${escapeHtml(personalInfo.x)}</div>` : ''}
                    ${personalInfo.github ? `<div><span style="font-weight: 600;">GitHub:</span> ${escapeHtml(personalInfo.github)}</div>` : ''}
                    ${personalInfo.dribbble ? `<div><span style="font-weight: 600;">Dribbble:</span> ${escapeHtml(personalInfo.dribbble)}</div>` : ''}
                    ${personalInfo.behance ? `<div><span style="font-weight: 600;">Behance:</span> ${escapeHtml(personalInfo.behance)}</div>` : ''}
                    ${personalInfo.instagram ? `<div><span style="font-weight: 600;">Instagram:</span> ${escapeHtml(personalInfo.instagram)}</div>` : ''}
                </div>
            `) : ''}

            <!-- References (Boxed) -->
            ${data.references && data.references.length > 0 ? BoxSection(t.sections.references, '&#128203;', `
                <div style="display: flex; flex-direction: column; gap: 16px;">
                    ${data.references.map(ref => `
                        <div data-paginate="item">
                            <div style="font-weight: 700; font-size: ${fs.entryTitle};">${escapeHtml(ref.name)}</div>
                            <div style="font-size: ${fs.body}; font-style: italic; color: #525252;">${escapeHtml(ref.title)}, ${escapeHtml(ref.company)}</div>
                            ${ref.email ? `<div style="font-size: ${fs.small}; color: #6b7280;">${escapeHtml(ref.email)}</div>` : ''}
                            ${ref.phone ? `<div style="font-size: ${fs.small}; color: #6b7280;">${escapeHtml(ref.phone)}</div>` : ''}
                        </div>
                    `).join('')}
                </div>
            `) : ''}

            <!-- Personal Details (Boxed) -->
            ${(personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber)) ? BoxSection(t.sections.personalDetails, '&#128221;', `
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    ${personalInfo.nationality ? `<div><span style="font-weight: 600;">Nationality:</span> ${escapeHtml(personalInfo.nationality)}</div>` : ''}
                    ${personalInfo.idType && personalInfo.idNumber ? `
                        <div>
                            <span style="font-weight: 600;">
                                ${personalInfo.idType === 'id' ? 'ID' : personalInfo.idType === 'passport' ? 'Passport' : personalInfo.idType === 'driving_license' ? 'Driving License' : 'ID'}:
                            </span> ${escapeHtml(personalInfo.idNumber)}
                        </div>
                    ` : ''}
                </div>
            `) : ''}

            <!-- Custom Fields (Boxed) -->
            ${customFields.map(field => BoxSection(field.label, '&#128204;', `
                <p style="line-height: 1.6;">${formatDescription(field.content)}</p>
            `)).join('')}

        </div>
    `;
};

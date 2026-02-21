import { PdfResumeData, PdfTheme, PdfTranslations } from '../../types/pdf';
import {
    getFontFamily,
    escapeHtml,
    formatDescription,
    getFontScale,
    getIconSVG
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
    const sNum = (px: number) => Math.max(5, Math.round(px * scale));

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
        <section class="resume-section" style="margin-bottom: 32px;">
            <div>
                <div style="display: flex; align-items: center; gap: 12px; border: 1px solid ${borderColor}; background-color: #ffffff; padding: 8px 24px; box-shadow: 4px 4px 0px 0px rgba(0,0,0,0.1); margin-bottom: 12px;">
                    <span style="background-color: ${orangeAccent}; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        ${icon}
                    </span>
                    <span style="font-family: ${headingFont}; font-size: ${fs.sectionHeading}; font-weight: 700; text-transform: uppercase; color: #1f2937;">
                        ${title}
                    </span>
                </div>
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
                        ${personalInfo.email ? `<span style="display: inline-flex; align-items: center; gap: 4px;">${getIconSVG('email', '#4b5563', 12)} ${escapeHtml(personalInfo.email)}</span>` : ''}
                        ${personalInfo.phone ? `<span style="display: inline-flex; align-items: center; gap: 4px;">${getIconSVG('phone', '#4b5563', 12)} ${escapeHtml(personalInfo.phone)}</span>` : ''}
                        ${personalInfo.location ? `<span style="display: inline-flex; align-items: center; gap: 4px;">${getIconSVG('location', '#4b5563', 12)} ${escapeHtml(personalInfo.location)}</span>` : ''}
                        ${personalInfo.website ? `<span style="display: inline-flex; align-items: center; gap: 4px;">${getIconSVG('website', '#4b5563', 12)} ${escapeHtml(personalInfo.website)}</span>` : ''}
                        ${personalInfo.linkedin ? `<span style="display: inline-flex; align-items: center; gap: 4px;">${getIconSVG('linkedin', '#4b5563', 12)} ${escapeHtml(personalInfo.linkedin)}</span>` : ''}
                    </div>
                </div>
            </header>

            <!-- Profile Section -->
            ${personalInfo.summary ? BoxSection(t.sections.profile, getIconSVG('user', '#ffffff', sNum(16)), `<p style="line-height: 1.6;">${formatDescription(personalInfo.summary)}</p>`) : ''}

            <!-- Experience Section -->
            ${experience.length > 0 ? BoxSection(t.sections.experience, getIconSVG('briefcase', '#ffffff', sNum(16)), `
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
                                ${escapeHtml(exp.company)}${(exp.city || exp.country) ? `, ${escapeHtml([exp.city, exp.country].filter(Boolean).join(', '))}` : ''}
                            </p>
                            <p style="font-size: ${fs.body}; line-height: 1.5;">
                                ${formatDescription(exp.description || '')}
                            </p>
                        </div>
                    `).join('')}
                </div>
            `) : ''}

            <!-- Education Section -->
            ${education.length > 0 ? BoxSection(t.sections.education, getIconSVG('graduation-cap', '#ffffff', sNum(16)), `
                <div style="display: flex; flex-direction: column; gap: 20px;">
                    ${education.map(edu => `
                        <div data-paginate="item">
                            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
                                <h4 style="font-weight: 700; font-size: ${fs.entryTitle};">
                                    ${escapeHtml(edu.degree)}
                                    ${edu.gpa ? `<span style="margin-left: 8px; opacity: 0.8; font-weight: 500;">GPA: ${escapeHtml(edu.gpa)}</span>` : ''}
                                </h4>
                                <span style="font-size: ${fs.small}; font-weight: 600; color: ${orangeAccent};">
                                    ${formatLocalizedDate(edu.startDate, locale)} – ${edu.endDate ? formatLocalizedDate(edu.endDate, locale) : t.labels.present}
                                </span>
                            </div>
                            <p style="font-size: ${fs.body}; font-style: italic; color: #525252;">
                                ${escapeHtml(edu.school)}${(edu.city || edu.country) ? `, ${escapeHtml([edu.city, edu.country].filter(Boolean).join(', '))}` : ''}
                            </p>
                            ${edu.honors ? `<p style="font-size: ${s(11)}; color: #4b5563; opacity: 0.8; margin: 0;">${escapeHtml(edu.honors)}</p>` : ''}
                            ${edu.clubs ? `<p style="font-size: ${s(10)}; color: #6b7280; opacity: 0.7; margin: 0;">Activities: ${escapeHtml(edu.clubs)}</p>` : ''}

                            ${edu.description ? `<p style="font-size: ${s(12)}; line-height: 1.6; color: #4b5563; margin-top: 4px;">${formatDescription(edu.description)}</p>` : ''}
                        </div>
                    `).join('')}
                </div>
            `) : ''}

            <!-- Skills & Strengths Row -->
            <div style="display: flex; gap: 32px;">
                <!-- Skills Section -->
                ${skills.length > 0 ? `
                    <div style="flex: 1;">
                        ${BoxSection(t.sections.skills, getIconSVG('users', '#ffffff', sNum(16)), `
                            <div>
                                ${skills.map(skill => ProgressBar(skill.name, skill.level ? skill.level * 20 : 80)).join('')}
                            </div>
                        `)}
                    </div>
                ` : ''}

                <!-- Strengths Section -->
                ${strengths && strengths.length > 0 ? `
                    <div style="flex: 1;">
                        ${BoxSection(t.sections.strengths, getIconSVG('code', '#ffffff', sNum(16)), `
                            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                                ${strengths.map(str => `
                                    <span data-paginate="item" style="background-color: #fff7ed; color: ${orangeAccent}; border: 1px solid ${orangeAccent}; padding: 4px 12px; border-radius: 4px; font-size: ${fs.small}; font-weight: 600; display: inline-block;">
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
                        ${BoxSection(t.sections.languages, getIconSVG('languages', '#ffffff', sNum(16)), `
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
                        ${BoxSection(t.sections.interests, getIconSVG('star', '#ffffff', sNum(16)), `
                            <div style="display: flex; flex-wrap: wrap; gap: 12px;">
                                ${interests.map(int => `
                                    <span data-paginate="item" style="display: flex; align-items: center; gap: 6px;">
                                        ${getIconSVG('star', orangeAccent, sNum(12))} ${escapeHtml(int.name)}
                                    </span>
                                `).join('')}
                            </div>
                        `)}
                    </div>
                ` : ''}
            </div>

            <!-- Personal Details (Boxed) -->
            ${(personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber)) ? BoxSection(t.sections.personalDetails, getIconSVG('id-card', '#ffffff', sNum(16)), `
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    ${personalInfo.nationality ? `<div data-paginate="item"><span style="font-weight: 600;">Nationality:</span> ${escapeHtml(personalInfo.nationality)}</div>` : ''}
                    ${personalInfo.idType && personalInfo.idNumber ? `
                        <div data-paginate="item">
                            <span style="font-weight: 600;">
                                ${personalInfo.idType === 'id' ? 'ID' : personalInfo.idType === 'passport' ? 'Passport' : personalInfo.idType === 'driving_license' ? 'Driving License' : 'ID'}:
                            </span> ${escapeHtml(personalInfo.idNumber)}
                        </div>
                    ` : ''}
                </div>
            `) : ''}

            <!-- Credentials Section -->
            ${(certifications && certifications.length > 0) || (awards && awards.length > 0) ? BoxSection(t.sections.credentials, getIconSVG('award', '#ffffff', sNum(16)), `
                <div style="display: flex; gap: 32px;">
                    ${certifications && certifications.length > 0 ? `
                        <div style="flex: 1;">
                            <h4 style="font-size: ${fs.small}; font-weight: 600; color: #6b7280; margin-bottom: 8px;">${t.sections.certifications}</h4>
                            <div style="display: flex; flex-direction: column; gap: 8px;">
                                ${certifications.map(cert => `
                                    <div data-paginate="item">
                                        <div style="font-weight: 600; font-size: ${fs.body};">${escapeHtml(cert.name)}</div>
                                        <div style="font-size: ${fs.small}; color: #6b7280;">${escapeHtml(cert.issuer)} • ${formatLocalizedDate(cert.date, locale)}</div>
                                        ${cert.url ? `<div style="font-size: ${s(10)}; color: #6b7280; opacity: 0.7;">${escapeHtml(cert.url)}</div>` : ''}
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
                                    
                                        ${award.description ? `<p style="font-size: ${s(11)}; line-height: 1.5; color: #4b5563; margin-top: 2px;">${formatDescription(award.description)}</p>` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
            `) : ''}

            <!-- Social Links (Boxed) -->
            ${(personalInfo.x || personalInfo.github || personalInfo.dribbble || personalInfo.behance || personalInfo.instagram) ? BoxSection(t.sections.socialLinks, getIconSVG('globe', '#ffffff', sNum(16)), `
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    ${personalInfo.x ? `<div data-paginate="item"><span style="font-weight: 600;">X:</span> ${escapeHtml(personalInfo.x)}</div>` : ''}
                    ${personalInfo.github ? `<div data-paginate="item"><span style="font-weight: 600;">GitHub:</span> ${escapeHtml(personalInfo.github)}</div>` : ''}
                    ${personalInfo.dribbble ? `<div data-paginate="item"><span style="font-weight: 600;">Dribbble:</span> ${escapeHtml(personalInfo.dribbble)}</div>` : ''}
                    ${personalInfo.behance ? `<div data-paginate="item"><span style="font-weight: 600;">Behance:</span> ${escapeHtml(personalInfo.behance)}</div>` : ''}
                    ${personalInfo.instagram ? `<div data-paginate="item"><span style="font-weight: 600;">Instagram:</span> ${escapeHtml(personalInfo.instagram)}</div>` : ''}
                </div>
            `) : ''}

            <!-- Custom Fields (Boxed) -->
            ${customFields.map(field => BoxSection(field.label, getIconSVG('id-card', '#ffffff', sNum(16)), `
                <p style="line-height: 1.6;">${formatDescription(field.content)}</p>
            `)).join('')}

        </div>
    `;
};

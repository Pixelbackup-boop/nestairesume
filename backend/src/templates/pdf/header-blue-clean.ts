/**
 * Header Blue Clean Template
 * Ported from frontend/components/templates/layouts/header/HeaderBlueClean.tsx
 */

import { PdfResumeData, PdfTheme, PdfTranslations } from '../../types/pdf';
import {
    getFontFamily,
    fontSizes,
    escapeHtml,
    formatDescription,
    getIconSVG,
    IconName,
    getLanguageLevel
} from './shared/helpers';
import { getTranslations } from './shared/translations';
import { formatLocalizedDate } from './shared/dateUtils';

export const renderHeaderBlueClean = (data: PdfResumeData, theme: PdfTheme, translations?: PdfTranslations, locale: string = 'en'): string => {
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
        fonts
    } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Roboto');
    const bodyFont = getFontFamily(fonts?.body || 'Open Sans');

    // Fixed colors
    const headerBg = theme.primary || '#2563eb'; // Blue-600 defaults
    const textColor = theme.text || '#1f2937';

    // --- Helpers ---
    const SectionHeader = (title: string, icon: IconName) => `
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px; border-bottom: 2px solid ${theme.primary}20; padding-bottom: 8px;">
            <div style="background-color: ${theme.primary}15; color: ${theme.primary}; padding: 6px; border-radius: 6px;">
                 ${getIconSVG(icon, theme.primary, 18)}
            </div>
            <h3 style="font-family: ${headingFont}; font-size: 16px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: ${theme.heading}; margin: 0;">
                ${title}
            </h3>
        </div>
    `;

    // Profile Image
    const profileImage = personalInfo.profileImage ? `
        <div style="width: 140px; height: 140px; border-radius: 16px; border: 4px solid #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); overflow: hidden; transform: rotate(-3deg);">
            <img
                src="${personalInfo.profileImage}"
                alt="${escapeHtml(personalInfo.fullName)}"
                style="width: 100%; height: 100%; object-fit: cover; transform: rotate(3deg) scale(1.1);"
            />
        </div>
    ` : '';

    const contactItems = [
        { value: personalInfo.email, icon: 'email' },
        { value: personalInfo.phone, icon: 'phone' },
        { value: personalInfo.location, icon: 'location' },
        { value: personalInfo.linkedin, icon: 'linkedin' },
        { value: personalInfo.website, icon: 'website' }
    ].filter(item => item.value);

    return `
        <div style="width: 100%; min-height: 100%; font-family: ${bodyFont}; color: ${textColor}; background-color: #ffffff;">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, ${theme.primary}, ${theme.secondary}); color: white; padding: 48px 48px 64px 48px; clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);">
                <div style="display: flex; gap: 40px; align-items: center;">
                    ${profileImage}
                    <div style="flex: 1;">
                        <h1 style="font-family: ${headingFont}; font-size: 42px; font-weight: 800; line-height: 1.1; margin: 0 0 8px 0;">
                            ${escapeHtml(personalInfo.fullName || 'Your Name')}
                        </h1>
                        <p style="font-family: ${headingFont}; font-size: 18px; font-weight: 500; opacity: 0.9; margin: 0 0 24px 0;">
                            ${escapeHtml(personalInfo.jobTitle || 'Job Title')}
                        </p>

                        <div style="display: flex; flex-wrap: wrap; gap: 12px 24px;">
                            ${contactItems.map(item => `
                                <div style="display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 500;">
                                    ${getIconSVG(item.icon as IconName, '#ffffff', 14)}
                                    <span>${escapeHtml(item.value!)}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Content Two Columns -->
            <div style="display: flex; gap: 48px; padding: 0 48px; margin-top: -20px;">
                
                <!-- Main Column (Left) -->
                <div style="flex: 1; min-width: 0;">
                    
                    ${personalInfo.summary ? `
                        <div style="background: white; padding: 24px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); margin-bottom: 32px;">
                            <h3 style="font-family: ${headingFont}; font-size: 14px; font-weight: 700; text-transform: uppercase; color: ${theme.primary}; margin-bottom: 12px;">${t.sections.profile}</h3>
                            <p style="font-size: 13px; line-height: 1.6; color: #4b5563;">
                                ${formatDescription(personalInfo.summary)}
                            </p>
                        </div>
                    ` : ''}

                    ${experience.length > 0 ? `
                        <div style="margin-bottom: 32px;">
                            ${SectionHeader(t.sections.experience, 'briefcase')}
                            <div style="display: flex; flex-direction: column; gap: 24px;">
                                ${experience.map(exp => `
                                    <div style="position: relative; padding-left: 20px; border-left: 2px solid ${theme.primary}20;">
                                        <div style="position: absolute; left: -6px; top: 6px; width: 10px; height: 10px; border-radius: 50%; background: ${theme.primary}; border: 2px solid white;"></div>
                                        
                                        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
                                            <h4 style="font-family: ${headingFont}; font-size: 14px; font-weight: 700; color: ${theme.heading}; margin: 0;">${escapeHtml(exp.title)}</h4>
                                        </div>
                                        
                                        <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: 600; color: ${theme.primary}; margin-bottom: 8px;">
                                            <span>${escapeHtml(exp.company)}</span>
                                            <span>${formatLocalizedDate(exp.startDate, locale)} – ${exp.current ? t.labels.present : formatLocalizedDate(exp.endDate, locale)}</span>
                                        </div>

                                        <div style="font-size: 12px; line-height: 1.6; color: #4b5563;">
                                            ${formatDescription(exp.description || '')}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}

                    ${education.length > 0 ? `
                        <div style="margin-bottom: 32px;">
                            ${SectionHeader(t.sections.education, 'graduation-cap')}
                            <div style="display: flex; flex-direction: column; gap: 16px;">
                                ${education.map(edu => `
                                    <div style="display: flex; gap: 16px; align-items: center;">
                                        <div style="width: 4px; height: 40px; background-color: ${theme.secondary}; border-radius: 2px;"></div>
                                        <div>
                                            <h4 style="font-family: ${headingFont}; font-size: 14px; font-weight: 700; color: ${theme.heading}; margin: 0;">${escapeHtml(edu.school)}</h4>
                                            <div style="font-size: 12px; color: #4b5563;">
                                                <span style="font-weight: 600; color: ${theme.primary};">${escapeHtml(edu.degree)}</span>
                                                <span style="color: #9ca3af;"> • ${formatLocalizedDate(edu.startDate, locale)} – ${formatLocalizedDate(edu.endDate, locale)}</span>
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>

                <!-- Sidebar (Right) -->
                <div style="width: 240px; flex-shrink: 0; padding-top: 20px;">
                    
                    ${skills.length > 0 ? `
                        <div style="margin-bottom: 40px;">
                            ${SectionHeader(t.sections.skills, 'code')}
                            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                                ${skills.map(skill => `
                                    <div style="background: white; border: 1px solid ${theme.primary}30; padding: 6px 12px; border-radius: 6px; font-size: 11px; font-weight: 600; color: ${theme.heading}; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                                        ${escapeHtml(skill.name)}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}

                    ${languages && languages.length > 0 ? `
                        <div style="margin-bottom: 40px;">
                            ${SectionHeader(t.sections.languages, 'globe')}
                            <div style="display: flex; flex-direction: column; gap: 12px;">
                                ${languages.map(lang => `
                                    <div>
                                        <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: 600; margin-bottom: 4px;">
                                            <span>${escapeHtml(lang.name)}</span>
                                            <span style="color: ${theme.primary};">${escapeHtml(lang.proficiency)}</span>
                                        </div>
                                        <div style="height: 6px; background: #e5e7eb; border-radius: 3px; overflow: hidden;">
                                            <div style="width: ${getLanguageLevel(lang)}%; height: 100%; background: ${theme.primary};"></div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}

                    ${interests && interests.length > 0 ? `
                        <div style="margin-bottom: 40px;">
                            ${SectionHeader(t.sections.interests, 'heart')}
                            <div style="display: flex; flex-direction: column; gap: 8px;">
                                ${interests.map(int => `
                                    <div style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: #4b5563;">
                                        <span style="color: ${theme.secondary};">●</span>
                                        ${escapeHtml(int.name)}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}

                    ${(certifications && certifications.length > 0) || (awards && awards.length > 0) ? `
                        <div style="margin-bottom: 40px;">
                            ${SectionHeader(t.sections.credentials, 'award')}
                            ${certifications && certifications.length > 0 ? `
                                <div style="margin-bottom: ${awards && awards.length > 0 ? '16px' : '0'};">
                                    <h4 style="font-size: 11px; font-weight: 600; color: #6b7280; margin-bottom: 8px;">${t.sections.certifications}</h4>
                                    <div style="display: flex; flex-direction: column; gap: 8px;">
                                        ${certifications.map(cert => `
                                            <div>
                                                <div style="font-weight: 600; font-size: 12px; color: ${theme.heading};">${escapeHtml(cert.name)}</div>
                                                <div style="font-size: 11px; color: #6b7280;">${escapeHtml(cert.issuer)} • ${formatLocalizedDate(cert.date, locale)}</div>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}
                            ${awards && awards.length > 0 ? `
                                <div>
                                    <h4 style="font-size: 11px; font-weight: 600; color: #6b7280; margin-bottom: 8px;">${t.sections.awards}</h4>
                                    <div style="display: flex; flex-direction: column; gap: 8px;">
                                        ${awards.map(award => `
                                            <div>
                                                <div style="font-weight: 600; font-size: 12px; color: ${theme.heading};">${escapeHtml(award.title)}</div>
                                                <div style="font-size: 11px; color: #6b7280;">${escapeHtml(award.issuer)} • ${formatLocalizedDate(award.date, locale)}</div>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                    ` : ''}

                    <!-- Social Links (Extended) -->
                    ${(personalInfo.github || personalInfo.twitter || personalInfo.dribbble || personalInfo.behance || personalInfo.instagram) ? `
                        <div style="margin-bottom: 40px;">
                            ${SectionHeader(t.sections.socialLinks, 'users')}
                            <div style="display: flex; flex-direction: column; gap: 8px; font-size: 12px;">
                                ${personalInfo.github ? `
                                    <div style="display: flex; align-items: center; gap: 8px;">
                                        ${getIconSVG('github', theme.primary, 14)}
                                        <a href="${personalInfo.github}" style="color: ${theme.heading}; text-decoration: none;">GitHub</a>
                                    </div>` : ''}
                                ${personalInfo.twitter ? `
                                    <div style="display: flex; align-items: center; gap: 8px;">
                                        ${getIconSVG('users', theme.primary, 14)}
                                        <a href="${personalInfo.twitter}" style="color: ${theme.heading}; text-decoration: none;">Twitter</a>
                                    </div>` : ''}
                                ${personalInfo.dribbble ? `
                                    <div style="display: flex; align-items: center; gap: 8px;">
                                        ${getIconSVG('palette', theme.primary, 14)}
                                        <a href="${personalInfo.dribbble}" style="color: ${theme.heading}; text-decoration: none;">Dribbble</a>
                                    </div>` : ''}
                                ${personalInfo.behance ? `
                                    <div style="display: flex; align-items: center; gap: 8px;">
                                        ${getIconSVG('palette', theme.primary, 14)}
                                        <a href="${personalInfo.behance}" style="color: ${theme.heading}; text-decoration: none;">Behance</a>
                                    </div>` : ''}
                                ${personalInfo.instagram ? `
                                    <div style="display: flex; align-items: center; gap: 8px;">
                                        ${getIconSVG('camera', theme.primary, 14)}
                                        <a href="${personalInfo.instagram}" style="color: ${theme.heading}; text-decoration: none;">Instagram</a>
                                    </div>` : ''}
                            </div>
                        </div>
                    ` : ''}

                    <!-- References -->
                    ${data.references && data.references.length > 0 ? `
                        <div style="margin-bottom: 40px;">
                            ${SectionHeader(t.sections.references, 'users')}
                            <div style="display: flex; flex-direction: column; gap: 16px;">
                                ${data.references.map(ref => `
                                    <div>
                                        <div style="font-weight: 700; font-size: 12px; color: ${theme.heading};">${escapeHtml(ref.name)}</div>
                                        <div style="font-size: 11px; font-style: italic; color: #4b5563;">${escapeHtml(ref.title)}, ${escapeHtml(ref.company)}</div>
                                        ${ref.email ? `<div style="font-size: 11px; color: ${theme.primary};">${escapeHtml(ref.email)}</div>` : ''}
                                        ${ref.phone ? `<div style="font-size: 11px; color: ${theme.primary};">${escapeHtml(ref.phone)}</div>` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}

                    <!-- Personal Details -->
                    ${(personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber) || personalInfo.customField) ? `
                        <div style="margin-bottom: 40px;">
                            ${SectionHeader(t.sections.personalDetails, 'user')}
                            <div style="display: flex; flex-direction: column; gap: 8px; font-size: 12px; color: #4b5563;">
                                ${personalInfo.nationality ? `<div><span style="font-weight: 600; color: ${theme.heading};">Nationality:</span> ${escapeHtml(personalInfo.nationality)}</div>` : ''}
                                ${personalInfo.idType && personalInfo.idNumber ? `
                                    <div><span style="font-weight: 600; color: ${theme.heading};">${personalInfo.idType === 'id' ? 'ID' : personalInfo.idType === 'passport' ? 'Passport' : 'License'}:</span> ${escapeHtml(personalInfo.idNumber)}</div>
                                ` : ''}
                                ${personalInfo.customField ? `
                                    <div style="margin-top: 8px;">
                                        <span style="font-weight: 600; color: ${theme.heading}; display: block; margin-bottom: 2px;">${escapeHtml(personalInfo.customFieldLabel || t.sections.additionalInfo)}</span>
                                        ${formatDescription(personalInfo.customField)}
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    ` : ''}

                </div>
            </div>
        </div>
    `;
};

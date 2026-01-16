/**
 * Header Geometric Template
 * Ported from frontend/components/templates/layouts/header/HeaderGeometric.tsx
 */

import { PdfResumeData, PdfTheme } from '../../types/pdf';
import {
    getFontFamily,
    fontSizes,
    getBackgroundCSS,
    escapeHtml,
    formatDescription,
    getIconSVG,
    IconName,
    getLanguageLevel
} from './shared/helpers';

export const renderHeaderGeometric = (data: PdfResumeData, theme: PdfTheme): string => {
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
        fonts,
        background
    } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Space Grotesk');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    const bgStyle = getBackgroundCSS(background);

    // --- Helpers ---
    const ProgressBar = (label: string, value: number) => `
        <div style="margin-bottom: 10px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                <span style="font-size: 11px; font-weight: 500; color: ${theme.heading};">${escapeHtml(label)}</span>
            </div>
            <div style="width: 100%; height: 6px; background-color: #f1f5f9; border-radius: 3px;">
                <div style="width: ${value}%; height: 100%; background-color: ${theme.primary}; border-radius: 3px;"></div>
            </div>
        </div>
    `;

    const SectionHeader = (title: string) => `
        <div style="margin-bottom: 20px; page-break-inside: avoid;">
            <h3 style="font-family: ${headingFont}; font-size: 16px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: ${theme.primary}; border-left: 4px solid ${theme.primary}; padding-left: 12px; margin-bottom: 4px;">
                ${title}
            </h3>
            <div style="height: 1px; width: 100%; background: linear-gradient(to right, ${theme.primary}40, transparent);"></div>
        </div>
    `;

    const contactItems = [
        { value: personalInfo.email, icon: 'email' },
        { value: personalInfo.phone, icon: 'phone' },
        { value: personalInfo.location, icon: 'location' },
        { value: personalInfo.linkedin, icon: 'linkedin' },
        { value: personalInfo.website, icon: 'website' }
    ].filter(item => item.value);

    // Profile Image - Hexagon Clip
    const profileImage = personalInfo.profileImage ? `
        <div style="width: 140px; height: 140px; clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); background-color: white; padding: 4px;">
            <img
                src="${personalInfo.profileImage}"
                alt="${escapeHtml(personalInfo.fullName)}"
                style="width: 100%; height: 100%; object-fit: cover; clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);"
            />
        </div>
    ` : '';

    return `
        <div style="width: 100%; min-height: 100%; font-family: ${bodyFont}; color: #334155; ${bgStyle} position: relative;">
            
            <!-- Geometric Header BG -->
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 260px; z-index: 0; overflow: hidden;">
                <div style="position: absolute; top: -50px; right: -50px; width: 400px; height: 400px; background-color: ${theme.primary}; opacity: 0.1; transform: rotate(45deg);"></div>
                <div style="position: absolute; top: 100px; left: -50px; width: 200px; height: 200px; background-color: ${theme.secondary}; opacity: 0.1; borderRadius: 50%;"></div>
                <div style="position: absolute; top: 0; width: 100%; height: 100%; background: linear-gradient(180deg, ${theme.background}00 0%, ${theme.background} 100%);"></div>
            </div>

            <div style="position: relative; z-index: 10; padding: 40px 50px;">
                
                <!-- Header -->
                <div style="display: flex; gap: 40px; align-items: center; margin-bottom: 50px;">
                    ${profileImage}
                    <div style="flex: 1;">
                        <h1 style="font-family: ${headingFont}; font-size: 38px; font-weight: 700; color: ${theme.heading}; line-height: 1.1; margin: 0 0 8px 0;">
                            ${escapeHtml(personalInfo.fullName || 'Your Name')}
                        </h1>
                        <p style="font-family: ${headingFont}; font-size: 18px; color: ${theme.primary}; font-weight: 500; margin: 0 0 16px 0; text-transform: uppercase; letter-spacing: 0.05em;">
                            ${escapeHtml(personalInfo.jobTitle || 'Job Title')}
                        </p>
                        
                        <!-- Contact Grid -->
                        <div style="display: flex; flex-wrap: wrap; gap: 12px 24px;">
                            ${contactItems.map(item => `
                                <div style="display: flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 500; color: #64748b;">
                                    <span style="color: ${theme.primary};">${getIconSVG(item.icon as IconName, theme.primary, 14)}</span>
                                    <span>${escapeHtml(item.value!)}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- Main Grid -->
                <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 40px;">
                    
                    <!-- Left Column -->
                    <div>
                        ${personalInfo.summary ? `
                            <div style="margin-bottom: 30px;">
                                ${SectionHeader('About Me')}
                                <p style="font-size: 12px; line-height: 1.6;">${formatDescription(personalInfo.summary)}</p>
                            </div>
                        ` : ''}

                        ${experience.length > 0 ? `
                            <div style="margin-bottom: 30px;">
                                ${SectionHeader('Experience')}
                                <div style="display: flex; flex-direction: column; gap: 20px;">
                                    ${experience.map(exp => `
                                        <div>
                                            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
                                                <h4 style="font-size: 13px; font-weight: 700; color: ${theme.heading}; margin: 0;">${escapeHtml(exp.title)}</h4>
                                                <span style="font-size: 11px; color: #94a3b8; font-weight: 500;">
                                                    ${escapeHtml(exp.startDate)} – ${exp.current ? 'Present' : escapeHtml(exp.endDate)}
                                                </span>
                                            </div>
                                            <div style="font-size: 12px; font-weight: 600; color: ${theme.primary}; margin-bottom: 6px;">
                                                ${escapeHtml(exp.company)}
                                            </div>
                                            <div style="font-size: 11px; line-height: 1.5; color: #475569;">
                                                ${formatDescription(exp.description || '')}
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}

                        ${education.length > 0 ? `
                            <div style="margin-bottom: 30px;">
                                ${SectionHeader('Education')}
                                <div style="display: flex; flex-direction: column; gap: 16px;">
                                    ${education.map(edu => `
                                        <div>
                                            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
                                                <h4 style="font-size: 13px; font-weight: 700; color: ${theme.heading}; margin: 0;">${escapeHtml(edu.school)}</h4>
                                                <span style="font-size: 11px; color: #94a3b8; font-weight: 500;">
                                                    ${escapeHtml(edu.startDate)} – ${edu.current ? 'Present' : escapeHtml(edu.endDate)}
                                                </span>
                                            </div>
                                            <div style="font-size: 12px; color: #475569;">
                                                <span style="font-weight: 600;">${escapeHtml(edu.degree)}</span>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}
                    </div>

                    <!-- Right Column -->
                    <div>
                        ${skills.length > 0 ? `
                            <div style="margin-bottom: 30px;">
                                ${SectionHeader('Skills')}
                                <div>
                                    ${skills.map(skill => ProgressBar(skill.name, (skill.level || 3) * 20)).join('')}
                                </div>
                            </div>
                        ` : ''}

                         ${languages && languages.length > 0 ? `
                            <div style="margin-bottom: 30px;">
                                ${SectionHeader('Languages')}
                                <div style="display: flex; flex-direction: column; gap: 8px;">
                                    ${languages.map(lang => `
                                        <div>
                                            <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 2px;">
                                                <span style="font-weight: 600;">${escapeHtml(lang.name)}</span>
                                                <span style="color: #94a3b8;">${escapeHtml(lang.proficiency)}</span>
                                            </div>
                                            <div style="width: 100%; height: 4px; background-color: #f1f5f9; border-radius: 2px;">
                                                <div style="width: ${getLanguageLevel(lang)}%; height: 100%; background-color: ${theme.primary}; border-radius: 2px;"></div>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}

                        ${strengths && strengths.length > 0 ? `
                            <div style="margin-bottom: 30px;">
                                ${SectionHeader('Strengths')}
                                <div style="display: flex; flex-direction: column; gap: 8px;">
                                    ${strengths.map(str => `
                                        <div style="display: flex; align-items: center; gap: 8px; font-size: 11px; color: #475569;">
                                            <span style="color: ${theme.primary}; font-size: 14px;">★</span>
                                            ${escapeHtml(str.name)}
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}
                         
                        ${interests && interests.length > 0 ? `
                            <div style="margin-bottom: 30px;">
                                ${SectionHeader('Interests')}
                                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                                    ${interests.map(int => `
                                        <span style="font-size: 11px; color: #475569; padding: 4px 8px; background-color: #f1f5f9; border-radius: 4px;">
                                            ${escapeHtml(int.name)}
                                        </span>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}

                        ${(certifications && certifications.length > 0) || (awards && awards.length > 0) ? `
                            <div style="margin-bottom: 30px;">
                                ${SectionHeader('Credentials')}
                                ${certifications && certifications.length > 0 ? `
                                    <div style="margin-bottom: ${awards && awards.length > 0 ? '16px' : '0'};">
                                        <h4 style="font-size: 11px; font-weight: 600; color: #94a3b8; margin-bottom: 8px;">Certifications</h4>
                                        <div style="display: flex; flex-direction: column; gap: 8px;">
                                            ${certifications.map(cert => `
                                                <div>
                                                    <div style="font-weight: 600; font-size: 11px; color: ${theme.heading};">${escapeHtml(cert.name)}</div>
                                                    <div style="font-size: 10px; color: #94a3b8;">${escapeHtml(cert.issuer)} • ${escapeHtml(cert.date)}</div>
                                                </div>
                                            `).join('')}
                                        </div>
                                    </div>
                                ` : ''}
                                ${awards && awards.length > 0 ? `
                                    <div>
                                        <h4 style="font-size: 11px; font-weight: 600; color: #94a3b8; margin-bottom: 8px;">Awards & Achievements</h4>
                                        <div style="display: flex; flex-direction: column; gap: 8px;">
                                            ${awards.map(award => `
                                                <div>
                                                    <div style="font-weight: 600; font-size: 11px; color: ${theme.heading};">${escapeHtml(award.title)}</div>
                                                    <div style="font-size: 10px; color: #94a3b8;">${escapeHtml(award.issuer)} • ${escapeHtml(award.date)}</div>
                                                </div>
                                            `).join('')}
                                        </div>
                                    </div>
                                ` : ''}
                            </div>
                        ` : ''}
                    </div>

                </div>
            </div>
        </div>
    `;
};

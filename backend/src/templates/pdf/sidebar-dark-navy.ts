/**
 * Sidebar Dark Navy Template
 * Ported from frontend/components/templates/layouts/sidebar/SidebarDarkNavy.tsx
 */

import { PdfResumeData, PdfTheme } from '../../types/pdf';
import {
    getFontFamily,
    fontSizes,
    getBackgroundCSS,
    escapeHtml,
    formatDescription,
    getIconSVG,
    IconName
} from './shared/helpers';

export const renderSidebarDarkNavy = (data: PdfResumeData, theme: PdfTheme): string => {
    const {
        personalInfo,
        experience = [],
        education = [],
        skills = [],
        languages = [],
        strengths = [],
        interests = [],
        fonts,
        background
    } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Roboto');
    const bodyFont = getFontFamily(fonts?.body || 'Roboto');

    // Fixed colors based on frontend
    const sidebarBg = '#0f172a'; // Slate 900
    const mainBg = '#FFFFFF';
    const sidebarText = '#e2e8f0'; // Slate 200
    const mainText = '#334155'; // Slate 700
    const accentColor = theme.primary || '#3b82f6'; // Blue 500 default

    // --- Helpers ---
    const SidebarHeader = (title: string) => `
        <h3 style="font-family: ${headingFont}; font-size: 14px; font-weight: 700; color: ${accentColor}; text-transform: uppercase; margin: 0 0 16px 0; padding-bottom: 4px; border-bottom: 1px solid ${accentColor}40;">
            ${title}
        </h3>
    `;

    const MainHeader = (title: string) => `
        <h3 style="font-family: ${headingFont}; font-size: 16px; font-weight: 700; color: ${sidebarBg}; text-transform: uppercase; margin: 0 0 16px 0; padding-bottom: 4px; border-bottom: 2px solid ${accentColor};">
            ${title}
        </h3>
    `;

    // Profile Image
    const photoSize = 120;
    const profileImage = personalInfo.profileImage ? `
        <img
            src="${personalInfo.profileImage}"
            alt="${escapeHtml(personalInfo.fullName)}"
            style="width: ${photoSize}px; height: ${photoSize}px; border-radius: 50%; object-fit: cover; border: 4px solid ${accentColor};"
        />
    ` : `
        <div style="width: ${photoSize}px; height: ${photoSize}px; border-radius: 50%; background-color: ${accentColor}20; border: 4px solid ${accentColor}; display: flex; align-items: center; justify-content: center; font-family: ${headingFont}; font-size: 48px; color: ${accentColor}; font-weight: 700;">
            ${escapeHtml(personalInfo.fullName?.charAt(0) || '?')}
        </div>
    `;

    const contactItems = [
        { value: personalInfo.phone, icon: 'phone' },
        { value: personalInfo.email, icon: 'email' },
        { value: personalInfo.location, icon: 'location' },
        { value: personalInfo.website, icon: 'website' }
    ].filter(item => item.value);

    return `
        <div style="width: 100%; min-height: 100%; font-family: ${bodyFont}; background-color: ${mainBg}; color: ${mainText}; display: flex;">
            
            <!-- Sidebar (35%) -->
            <aside style="width: 35%; background-color: ${sidebarBg}; color: ${sidebarText}; padding: 48px 32px; flex-shrink: 0; min-height: 100%;">
                
                <!-- Photo -->
                <div style="margin-bottom: 48px; display: flex; justify-content: center;">
                    ${profileImage}
                </div>

                <!-- Contact -->
                <div style="margin-bottom: 40px;">
                    ${SidebarHeader('Contact')}
                    <div style="font-size: 12px; display: flex; flex-direction: column; gap: 12px;">
                        ${contactItems.map(item => `
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <span style="color: ${accentColor};">${getIconSVG(item.icon as IconName, accentColor, 14)}</span>
                                <span style="word-break: break-all;">${escapeHtml(item.value!)}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Education -->
                ${education.length > 0 ? `
                    <div style="margin-bottom: 40px;">
                        ${SidebarHeader('Education')}
                        <div style="display: flex; flex-direction: column; gap: 16px;">
                            ${education.map(edu => `
                                <div>
                                    <div style="font-weight: 700; font-size: 13px; color: #ffffff;">${escapeHtml(edu.degree)}</div>
                                    <div style="font-size: 12px; color: ${accentColor}; margin-bottom: 2px;">${escapeHtml(edu.school)}</div>
                                    <div style="font-size: 11px; opacity: 0.8;">${escapeHtml(edu.startDate)} – ${edu.endDate || 'Present'}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Skills -->
                ${skills.length > 0 ? `
                    <div>
                        ${SidebarHeader('Skills')}
                        <div style="display: flex; flex-direction: column; gap: 10px;">
                            ${skills.map(skill => `
                                <div>
                                    <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                                        <span style="font-weight: 500;">${escapeHtml(skill.name)}</span>
                                    </div>
                                    <div style="width: 100%; height: 4px; background-color: ${accentColor}30; border-radius: 2px;">
                                        <div style="width: ${skill.level * 20}%; height: 100%; background-color: ${accentColor}; border-radius: 2px;"></div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Languages -->
                 ${languages && languages.length > 0 ? `
                    <div style="margin-top: 40px;">
                        ${SidebarHeader('Languages')}
                         <div style="display: flex; flex-direction: column; gap: 8px;">
                            ${languages.map(lang => `
                                <div style="display: flex; justify-content: space-between; font-size: 12px;">
                                    <span>${escapeHtml(lang.name)}</span>
                                    <span style="color: ${accentColor}; opacity: 0.9;">${escapeHtml(lang.proficiency)}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

            </aside>

            <!-- Main Content (65%) -->
            <main style="flex: 1; padding: 64px 48px;">
                
                <!-- Header -->
                <div style="margin-bottom: 56px;">
                    <h1 style="font-family: ${headingFont}; font-size: 38px; font-weight: 800; color: ${sidebarBg}; text-transform: uppercase; margin: 0 0 8px 0; line-height: 1.1;">
                        ${escapeHtml(personalInfo.fullName || 'Your Name')}
                    </h1>
                    <p style="font-family: ${headingFont}; font-size: 16px; color: ${accentColor}; text-transform: uppercase; font-weight: 600; letter-spacing: 0.1em; margin: 0;">
                        ${escapeHtml(personalInfo.jobTitle || 'Job Title')}
                    </p>
                </div>

                <!-- Profile -->
                ${personalInfo.summary ? `
                    <div style="margin-bottom: 40px;">
                        ${MainHeader('Profile')}
                        <p style="line-height: 1.6; font-size: 12px; color: #475569;">
                            ${formatDescription(personalInfo.summary)}
                        </p>
                    </div>
                ` : ''}

                <!-- Experience -->
                ${experience.length > 0 ? `
                    <div style="margin-bottom: 40px;">
                        ${MainHeader('Experience')}
                        <div style="display: flex; flex-direction: column; gap: 24px;">
                            ${experience.map(exp => `
                                <div>
                                    <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
                                        <h4 style="font-weight: 700; font-size: 14px; color: ${sidebarBg}; margin: 0; text-transform: uppercase;">
                                            ${escapeHtml(exp.title)}
                                        </h4>
                                        <span style="font-size: 11px; color: ${accentColor}; font-weight: 600;">
                                            ${escapeHtml(exp.startDate)} – ${exp.current ? 'Present' : escapeHtml(exp.endDate)}
                                        </span>
                                    </div>
                                    <div style="font-size: 12px; color: #64748b; margin-bottom: 8px; font-weight: 600;">
                                        ${escapeHtml(exp.company)}${exp.city ? ` | ${escapeHtml(exp.city)}` : ''}
                                    </div>
                                    <div style="font-size: 12px; line-height: 1.6; color: #475569;">
                                        ${formatDescription(exp.description || '')}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Strengths -->
                ${strengths && strengths.length > 0 ? `
                    <div style="margin-bottom: 40px;">
                        ${MainHeader('Strengths')}
                         <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                            ${strengths.map(str => `
                                <span style="border: 1px solid ${accentColor}; color: ${accentColor}; padding: 4px 12px; border-radius: 99px; font-size: 11px; font-weight: 600;">
                                    ${escapeHtml(str.name)}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
                
                <!-- Interests -->
                ${interests && interests.length > 0 ? `
                    <div>
                        ${MainHeader('Interests')}
                         <div style="display: flex; flex-wrap: wrap; gap: 12px;">
                            ${interests.map(int => `
                                <span style="font-size: 12px; color: #475569; display: flex; align-items: center; gap: 6px;">
                                    <span style="color: ${accentColor}; font-size: 10px;">●</span>
                                    ${escapeHtml(int.name)}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

            </main>
        </div>
    `;
};

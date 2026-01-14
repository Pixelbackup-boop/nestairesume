/**
 * Sidebar Monogram Template
 * Ported from frontend/components/templates/layouts/sidebar/SidebarMonogram.tsx
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

export const renderSidebarMonogram = (data: PdfResumeData, theme: PdfTheme): string => {
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

    // Theme colors
    const primaryColor = theme.primary || '#000000';
    const sidebarBg = '#f3f4f6'; // Gray 100
    const mainBg = '#FFFFFF';
    const sidebarText = '#374151'; // Gray 700
    const mainText = '#1f2937'; // Gray 800

    // Monogram helper
    const initials = personalInfo.fullName
        ? personalInfo.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
        : '?';

    // --- Helpers ---
    const SidebarHeader = (title: string) => `
        <h3 style="font-family: ${headingFont}; font-size: 14px; font-weight: 700; color: ${primaryColor}; text-transform: uppercase; margin: 0 0 16px 0; letter-spacing: 0.1em;">
            ${title}
        </h3>
    `;

    const MainHeader = (title: string) => `
        <h3 style="font-family: ${headingFont}; font-size: 16px; font-weight: 700; color: ${primaryColor}; text-transform: uppercase; margin: 0 0 16px 0; padding-bottom: 4px; border-bottom: 2px solid ${primaryColor}20;">
            ${title}
        </h3>
    `;

    const contactItems = [
        { value: personalInfo.phone, icon: 'phone' },
        { value: personalInfo.email, icon: 'email' },
        { value: personalInfo.location, icon: 'location' },
        { value: personalInfo.website, icon: 'website' }
    ].filter(item => item.value);

    return `
        <div style="width: 100%; min-height: 100%; font-family: ${bodyFont}; background-color: ${mainBg}; color: ${mainText}; display: flex;">
            
            <!-- Sidebar (30%) -->
            <aside style="width: 30%; background-color: ${sidebarBg}; color: ${sidebarText}; padding: 48px 24px; flex-shrink: 0; min-height: 100%; border-right: 1px solid #e5e7eb;">
                
                <!-- Monogram Circle -->
                <div style="margin-bottom: 48px; display: flex; justify-content: center;">
                    <div style="width: 100px; height: 100px; border-radius: 50%; background-color: ${primaryColor}; display: flex; align-items: center; justify-content: center; color: #ffffff; font-family: ${headingFont}; font-size: 40px; font-weight: 700; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                        ${initials}
                    </div>
                </div>

                <!-- Contact -->
                <div style="margin-bottom: 40px;">
                    ${SidebarHeader('Contact')}
                    <div style="font-size: 12px; display: flex; flex-direction: column; gap: 12px;">
                        ${contactItems.map(item => `
                            <div style="display: flex; gap: 10px; align-items: flex-start;">
                                <span style="color: ${primaryColor}; margin-top: 2px;">${getIconSVG(item.icon as IconName, primaryColor, 14)}</span>
                                <span style="word-break: break-all;">${escapeHtml(item.value!)}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Education (Sidebar) -->
                ${education.length > 0 ? `
                    <div style="margin-bottom: 40px;">
                        ${SidebarHeader('Education')}
                        <div style="display: flex; flex-direction: column; gap: 16px;">
                            ${education.map(edu => `
                                <div>
                                    <div style="font-weight: 700; font-size: 13px; color: ${primaryColor};">${escapeHtml(edu.degree)}</div>
                                    <div style="font-size: 12px; color: #4b5563;">${escapeHtml(edu.school)}</div>
                                    <div style="font-size: 11px; color: #6b7280; font-style: italic;">${escapeHtml(edu.startDate)} – ${edu.endDate || 'Present'}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Skills -->
                ${skills.length > 0 ? `
                    <div style="margin-bottom: 40px;">
                        ${SidebarHeader('Skills')}
                        <div style="display: flex; flex-direction: column; gap: 8px;">
                            ${skills.map(skill => `
                                <div>
                                    <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 2px;">
                                        <span>${escapeHtml(skill.name)}</span>
                                    </div>
                                    <div style="width: 100%; height: 6px; background-color: #d1d5db; border-radius: 3px;">
                                        <div style="width: ${skill.level * 20}%; height: 100%; background-color: ${primaryColor}; border-radius: 3px;"></div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Languages -->
                ${languages && languages.length > 0 ? `
                    <div>
                        ${SidebarHeader('Languages')}
                        <div style="display: flex; flex-direction: column; gap: 6px; font-size: 12px;">
                            ${languages.map(lang => `
                                <div style="display: flex; justify-content: space-between;">
                                    <span>${escapeHtml(lang.name)}</span>
                                    <span style="color: #6b7280;">${escapeHtml(lang.proficiency)}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

            </aside>

            <!-- Main Content (70%) -->
            <main style="flex: 1; padding: 64px 48px;">
                
                <!-- Header -->
                <div style="margin-bottom: 48px;">
                    <h1 style="font-family: ${headingFont}; font-size: 42px; font-weight: 900; color: ${primaryColor}; text-transform: uppercase; margin: 0 0 4px 0; letter-spacing: -0.02em;">
                        ${escapeHtml(personalInfo.fullName || 'Your Name')}
                    </h1>
                    <p style="font-family: ${headingFont}; font-size: 16px; color: #6b7280; text-transform: uppercase; font-weight: 500; letter-spacing: 0.2em; margin: 0;">
                        ${escapeHtml(personalInfo.jobTitle || 'Job Title')}
                    </p>
                </div>

                <!-- Profile -->
                ${personalInfo.summary ? `
                    <div style="margin-bottom: 40px;">
                        ${MainHeader('About')}
                        <p style="line-height: 1.6; font-size: 12px; color: #4b5563;">
                            ${formatDescription(personalInfo.summary)}
                        </p>
                    </div>
                ` : ''}

                <!-- Experience -->
                ${experience.length > 0 ? `
                    <div style="margin-bottom: 40px;">
                        ${MainHeader('Experience')}
                        <div style="display: flex; flex-direction: column; gap: 32px;">
                            ${experience.map(exp => `
                                <div>
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                                        <h4 style="font-weight: 800; font-size: 14px; color: ${mainText}; margin: 0; text-transform: uppercase;">
                                            ${escapeHtml(exp.title)}
                                        </h4>
                                        <span style="font-size: 11px; color: ${primaryColor}; font-weight: 700; background: ${primaryColor}10; padding: 2px 6px; border-radius: 4px;">
                                            ${escapeHtml(exp.startDate)} – ${exp.current ? 'Present' : escapeHtml(exp.endDate)}
                                        </span>
                                    </div>
                                    <div style="font-size: 12px; color: #6b7280; margin-bottom: 8px; font-weight: 600;">
                                        ${escapeHtml(exp.company)}${exp.city ? ` | ${escapeHtml(exp.city)}` : ''}
                                    </div>
                                    <div style="font-size: 12px; line-height: 1.6; color: #4b5563;">
                                        ${formatDescription(exp.description || '')}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Strengths & Interests -->
                ${(strengths || interests) ? `
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px;">
                        ${strengths && strengths.length > 0 ? `
                            <div>
                                ${MainHeader('Strengths')}
                                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                                    ${strengths.map(str => `
                                        <span style="border: 1px solid ${primaryColor}; color: ${primaryColor}; padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: 600;">
                                            ${escapeHtml(str.name)}
                                        </span>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}
                        
                        ${interests && interests.length > 0 ? `
                            <div>
                                ${MainHeader('Interests')}
                                <ul style="padding-left: 16px; margin: 0; font-size: 12px; color: #4b5563;">
                                    ${interests.map(int => `
                                        <li style="margin-bottom: 4px;">${escapeHtml(int.name)}</li>
                                    `).join('')}
                                </ul>
                            </div>
                        ` : ''}
                    </div>
                ` : ''}

            </main>
        </div>
    `;
};

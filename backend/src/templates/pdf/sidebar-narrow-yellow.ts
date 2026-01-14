/**
 * Sidebar Narrow Yellow Template
 * Ported from frontend/components/templates/layouts/sidebar/SidebarNarrowYellow.tsx
 */

import { PdfResumeData, PdfTheme } from '../../types/pdf';
import {
    getFontFamily,
    fontSizes,
    getBackgroundCSS,
    escapeHtml,
    formatDescription,
} from './shared/helpers';

export const renderSidebarNarrowYellow = (data: PdfResumeData, theme: PdfTheme): string => {
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
    const headingFont = getFontFamily(fonts?.heading || 'Oswald');
    const bodyFont = getFontFamily(fonts?.body || 'Roboto');

    // Theme
    const sidebarBg = '#facc15'; // Yellow 400
    const mainBg = '#FFFFFF';
    const sidebarText = '#000000';
    const mainText = '#1f2937';

    // Helpers
    const SidebarHeader = (title: string) => `
        <h3 style="font-family: ${headingFont}; font-size: 14px; font-weight: 700; color: #000000; text-transform: uppercase; margin: 0 0 12px 0; border-bottom: 2px solid #000000; padding-bottom: 2px;">
            ${title}
        </h3>
    `;

    const MainHeader = (title: string) => `
        <h3 style="font-family: ${headingFont}; font-size: 18px; font-weight: 700; color: #000000; text-transform: uppercase; margin: 0 0 16px 0; letter-spacing: 0.05em; border-left: 4px solid #facc15; padding-left: 8px;">
            ${title}
        </h3>
    `;

    return `
        <div style="width: 100%; min-height: 100%; font-family: ${bodyFont}; background-color: ${mainBg}; color: ${mainText}; display: flex;">
            
            <!-- Sidebar (25%) - Narrow -->
            <aside style="width: 25%; background-color: ${sidebarBg}; color: ${sidebarText}; padding: 40px 16px; flex-shrink: 0; min-height: 100%;">
                
                <!-- Contact -->
                <div style="margin-bottom: 40px; font-size: 11px; font-weight: 500;">
                    ${SidebarHeader('Contact')}
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                         ${personalInfo.email ? `<div style="word-break: break-all;">${escapeHtml(personalInfo.email)}</div>` : ''}
                        ${personalInfo.phone ? `<div>${escapeHtml(personalInfo.phone)}</div>` : ''}
                        ${personalInfo.location ? `<div>${escapeHtml(personalInfo.location)}</div>` : ''}
                        ${personalInfo.website ? `<div style="word-break: break-all;">${escapeHtml(personalInfo.website)}</div>` : ''}
                    </div>
                </div>

                <!-- Skills -->
                ${skills.length > 0 ? `
                    <div style="margin-bottom: 40px;">
                        ${SidebarHeader('Skills')}
                        <div style="display: flex; flex-direction: column; gap: 12px;">
                            ${skills.map(skill => `
                                <div>
                                    <div style="font-size: 11px; font-weight: 700; margin-bottom: 2px;">${escapeHtml(skill.name)}</div>
                                    <div style="width: 100%; height: 4px; background-color: rgba(0,0,0,0.1);">
                                        <div style="width: ${skill.level * 20}%; height: 100%; background-color: #000000;"></div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Education -->
                 ${education.length > 0 ? `
                    <div style="margin-bottom: 40px;">
                        ${SidebarHeader('Education')}
                        <div style="display: flex; flex-direction: column; gap: 16px;">
                            ${education.map(edu => `
                                <div>
                                    <div style="font-weight: 700; font-size: 12px; line-height: 1.2;">${escapeHtml(edu.degree)}</div>
                                    <div style="font-size: 11px; margin-top: 2px;">${escapeHtml(edu.school)}</div>
                                    <div style="font-size: 10px; opacity: 0.7;">${escapeHtml(edu.startDate)} – ${edu.endDate || 'Present'}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Languages -->
                ${languages && languages.length > 0 ? `
                    <div style="margin-bottom: 40px;">
                        ${SidebarHeader('Languages')}
                        <div style="display: flex; flex-direction: column; gap: 4px; font-size: 11px;">
                            ${languages.map(lang => `
                                <div>
                                    <strong>${escapeHtml(lang.name)}</strong>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

            </aside>

            <!-- Main Content (75%) -->
            <main style="flex: 1; padding: 64px 48px;">
                
                <!-- Header -->
                <div style="margin-bottom: 48px; border-bottom: 4px solid #facc15; padding-bottom: 24px;">
                    <h1 style="font-family: ${headingFont}; font-size: 48px; font-weight: 700; color: #000000; text-transform: uppercase; margin: 0 0 4px 0; line-height: 0.9;">
                        ${escapeHtml(personalInfo.fullName || 'Your Name')}
                    </h1>
                    <p style="font-family: ${headingFont}; font-size: 18px; color: #4b5563; text-transform: uppercase; font-weight: 500; letter-spacing: 0.1em; margin: 0;">
                        ${escapeHtml(personalInfo.jobTitle || 'Job Title')}
                    </p>
                </div>

                <!-- Profile -->
                ${personalInfo.summary ? `
                    <div style="margin-bottom: 40px;">
                        ${MainHeader('About Me')}
                        <p style="line-height: 1.6; font-size: 12px; color: #374151;">
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
                                        <h4 style="font-weight: 700; font-size: 14px; color: #000000; margin: 0; text-transform: uppercase;">
                                            ${escapeHtml(exp.title)}
                                        </h4>
                                        <span style="font-size: 11px; color: #4b5563; font-weight: 600; background-color: #facc15; padding: 2px 6px;">
                                            ${escapeHtml(exp.startDate)} – ${exp.current ? 'Present' : escapeHtml(exp.endDate)}
                                        </span>
                                    </div>
                                    <div style="font-size: 12px; color: #4b5563; margin-bottom: 6px; font-weight: 600; font-style: italic;">
                                        ${escapeHtml(exp.company)} | ${escapeHtml(exp.city)}
                                    </div>
                                    <div style="font-size: 12px; line-height: 1.6; color: #374151;">
                                        ${formatDescription(exp.description || '')}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Strengths -->
                ${strengths && strengths.length > 0 ? `
                    <div>
                        ${MainHeader('Strengths')}
                        <div style="display: flex; flex-wrap: wrap; gap: 12px;">
                            ${strengths.map(str => `
                                <span style="font-size: 12px; color: #000000; border-bottom: 2px solid #facc15; padding-bottom: 2px; font-weight: 500;">
                                    ${escapeHtml(str.name)}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

            </main>
        </div>
    `;
};

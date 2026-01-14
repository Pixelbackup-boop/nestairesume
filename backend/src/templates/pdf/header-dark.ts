/**
 * Header Dark Template
 * Ported from frontend/components/templates/layouts/header/HeaderDark.tsx
 */

import { PdfResumeData, PdfTheme } from '../../types/pdf';
import {
    getFontFamily,
    getBackgroundCSS,
    escapeHtml,
    formatDescription,
    getIconSVG,
    IconName
} from './shared/helpers';

export const renderHeaderDark = (data: PdfResumeData, theme: PdfTheme): string => {
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
    const headingFont = getFontFamily(fonts?.heading || 'Montserrat');
    const bodyFont = getFontFamily(fonts?.body || 'Open Sans');
    const bgStyle = getBackgroundCSS(background);

    // Fixed colors
    const sidebarBg = '#0f172a'; // Slate 900
    const mainBg = '#ffffff';
    const accentColor = theme.primary || '#facc15'; // Yellow 400
    const textLight = '#f8fafc'; // Slate 50
    const textDark = '#334155'; // Slate 700

    // Helper for Sidebar Section Headers
    const SidebarSectionHeader = (title: string) => `
        <h3 style="font-family: ${headingFont}; font-size: 14px; font-weight: 700; color: #ffffff; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 20px; padding-bottom: 8px; border-bottom: 2px solid ${accentColor};">
            ${title}
        </h3>
    `;

    // Helper for Main Section Headers
    const MainSectionHeader = (title: string) => `
        <h3 style="font-family: ${headingFont}; font-size: 14px; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 24px; display: flex; align-items: center; gap: 16px;">
            <span style="width: 40px; height: 4px; background-color: ${accentColor}; display: inline-block;"></span>
            ${title}
        </h3>
    `;

    // Profile Image
    const profileImage = personalInfo.profileImage ? `
        <img
            src="${personalInfo.profileImage}"
            alt="${escapeHtml(personalInfo.fullName)}"
            style="width: 140px; height: 140px; border-radius: 50%; object-fit: cover; border: 4px solid ${accentColor};"
        />
    ` : `
        <div style="width: 140px; height: 140px; border-radius: 50%; background-color: #1e293b; border: 4px solid ${accentColor}; display: flex; align-items: center; justify-content: center; font-size: 48px; color: ${textLight};">
            ${escapeHtml(personalInfo.fullName?.charAt(0) || '?')}
        </div>
    `;

    return `
        <div style="width: 100%; min-height: 100%; font-family: ${bodyFont}; font-size: 10pt; background-color: ${mainBg}; color: ${textDark}; display: flex; box-sizing: border-box; ${bgStyle}">
            
            <!-- Left Sidebar -->
            <aside style="width: 33%; background-color: ${sidebarBg}; color: ${textLight}; padding: 48px 32px; display: flex; flex-direction: column; align-items: center; flex-shrink: 0; min-height: 100%;">
                
                <!-- Photo -->
                <div style="margin-bottom: 50px;">
                    ${profileImage}
                </div>

                <!-- Contact Info -->
                <div style="width: 100%; margin-bottom: 40px;">
                    ${SidebarSectionHeader('Contact')}
                    <div style="font-size: 9pt; display: flex; flex-direction: column; gap: 12px;">
                        ${personalInfo.phone ? `
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <span style="filter: grayscale(1); font-size: 1.2em;">📞</span>
                                <span style="word-break: break-all; opacity: 0.9;">${escapeHtml(personalInfo.phone)}</span>
                            </div>
                        ` : ''}
                        ${personalInfo.email ? `
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <span style="filter: grayscale(1); font-size: 1.2em;">✉️</span>
                                <span style="word-break: break-all; opacity: 0.9;">${escapeHtml(personalInfo.email)}</span>
                            </div>
                        ` : ''}
                        ${personalInfo.location ? `
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <span style="filter: grayscale(1); font-size: 1.2em;">📍</span>
                                <span style="word-break: break-all; opacity: 0.9;">${escapeHtml(personalInfo.location)}</span>
                            </div>
                        ` : ''}
                        ${personalInfo.website ? `
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <span style="filter: grayscale(1); font-size: 1.2em;">🌐</span>
                                <span style="word-break: break-all; opacity: 0.9;">${escapeHtml(personalInfo.website)}</span>
                            </div>
                        ` : ''}
                        ${personalInfo.linkedin ? `
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <span style="filter: grayscale(1); font-size: 1.2em; fill: white;">${getIconSVG('linkedin', '#ffffff', 14)}</span>
                                <span style="word-break: break-all; opacity: 0.9;">${escapeHtml(personalInfo.linkedin)}</span>
                            </div>
                        ` : ''}
                    </div>
                </div>

                <!-- Skills -->
                ${skills.length > 0 ? `
                    <div style="width: 100%; margin-bottom: 40px;">
                        ${SidebarSectionHeader('Skills')}
                        <div style="display: flex; flex-direction: column; gap: 10px;">
                            ${skills.map(skill => `
                                <div>
                                    <div style="margin-bottom: 4px; font-size: 9pt; font-weight: 500;">${escapeHtml(skill.name)}</div>
                                    <div style="width: 100%; height: 6px; background-color: #334155; border-radius: 3px; overflow: hidden;">
                                        <div style="width: ${skill.level * 20}%; height: 100%; background-color: ${accentColor};"></div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Languages -->
                ${languages && languages.length > 0 ? `
                    <div style="width: 100%; margin-bottom: 40px;">
                        ${SidebarSectionHeader('Languages')}
                        <ul style="list-style: none; padding: 0; margin: 0;">
                            ${languages.map(lang => `
                                <li style="margin-bottom: 6px; font-size: 9pt;">
                                    <span style="font-weight: 600;">${escapeHtml(lang.name)}</span> 
                                    <span style="opacity: 0.7; font-size: 0.9em;">- ${escapeHtml(lang.proficiency)}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                ` : ''}

                <!-- Strengths -->
                ${strengths && strengths.length > 0 ? `
                    <div style="width: 100%; margin-bottom: 40px;">
                        ${SidebarSectionHeader('Strengths')}
                        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                            ${strengths.map(str => `
                                <span style="background-color: #1e293b; color: ${accentColor}; padding: 4px 12px; border-radius: 4px; font-size: 8pt; font-weight: 500; border: 1px solid ${accentColor}40;">
                                    ${escapeHtml(str.name)}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Interests -->
                ${interests && interests.length > 0 ? `
                    <div style="width: 100%; margin-bottom: 40px;">
                        ${SidebarSectionHeader('Interests')}
                        <div style="display: flex; flex-wrap: wrap; gap: 12px;">
                            ${interests.map(int => `
                                <span style="font-size: 9pt; display: flex; align-items: center; gap: 6px;">
                                    <span style="color: ${accentColor};">✦</span> ${escapeHtml(int.name)}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

            </aside>

            <!-- Main Content -->
            <main style="flex: 1; padding: 64px 48px; display: flex; flex-direction: column;">
                
                <!-- Name Header -->
                <div style="margin-bottom: 50px;">
                    <h1 style="font-family: ${headingFont}; font-size: 36px; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 0.1em; margin: 0; line-height: 1;">
                        ${escapeHtml(personalInfo.fullName || 'Your Name')}
                    </h1>
                    <p style="font-size: 14px; color: #64748b; text-transform: uppercase; font-weight: 600; margin-top: 10px; letter-spacing: 0.05em;">
                        ${escapeHtml(personalInfo.jobTitle || 'Job Title')}
                    </p>
                </div>

                <!-- Profile -->
                ${personalInfo.summary ? `
                    <section style="margin-bottom: 40px;">
                        ${MainSectionHeader('Profile')}
                        <p style="line-height: 1.6; font-size: 10pt; color: #334155;">
                            ${formatDescription(personalInfo.summary)}
                        </p>
                    </section>
                ` : ''}

                <!-- Experience -->
                ${experience.length > 0 ? `
                    <section style="margin-bottom: 40px;">
                        ${MainSectionHeader('Experience')}
                        <div style="display: flex; flex-direction: column; gap: 24px;">
                            ${experience.map(exp => `
                                <div>
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 2px; align-items: baseline;">
                                        <h4 style="font-weight: 700; font-size: 11pt; text-transform: uppercase; color: #0f172a; margin: 0;">
                                            ${escapeHtml(exp.title)}
                                        </h4>
                                    </div>
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 9pt; color: #64748b; font-weight: 600;">
                                        <span>${escapeHtml(exp.company)}${exp.city ? `, ${escapeHtml(exp.city)}` : ''}</span>
                                        <span>${escapeHtml(exp.startDate)} – ${exp.current ? 'Present' : escapeHtml(exp.endDate)}</span>
                                    </div>
                                    <div style="font-size: 10pt; line-height: 1.6; color: #334155;">
                                        ${formatDescription(exp.description || '')}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </section>
                ` : ''}

                <!-- Education -->
                ${education.length > 0 ? `
                    <section style="margin-bottom: 40px;">
                        ${MainSectionHeader('Education')}
                        <div style="display: flex; flex-direction: column; gap: 20px;">
                            ${education.map(edu => `
                                <div>
                                    <h4 style="font-weight: 700; font-size: 11pt; color: #0f172a; margin: 0;">
                                        ${escapeHtml(edu.degree)}
                                    </h4>
                                    <p style="font-size: 10pt; color: #475569; font-weight: 500; margin: 2px 0;">
                                        ${escapeHtml(edu.school)}${edu.city ? `, ${escapeHtml(edu.city)}` : ''}
                                    </p>
                                    <p style="font-size: 9pt; color: #64748b; margin: 0;">
                                        ${escapeHtml(edu.startDate)} – ${edu.endDate || 'Present'}
                                    </p>
                                </div>
                            `).join('')}
                        </div>
                    </section>
                ` : ''}

                <!-- References -->
                ${data.references && data.references.length > 0 ? `
                    <section>
                        ${MainSectionHeader('References')}
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                            ${data.references.map(ref => `
                                <div>
                                    <div style="font-weight: 700; font-size: 10pt; color: #0f172a;">${escapeHtml(ref.name)}</div>
                                    <div style="font-size: 9pt; color: #64748b;">${escapeHtml(ref.title)}, ${escapeHtml(ref.company)}</div>
                                </div>
                            `).join('')}
                        </div>
                    </section>
                ` : ''}

            </main>
        </div>
    `;
};

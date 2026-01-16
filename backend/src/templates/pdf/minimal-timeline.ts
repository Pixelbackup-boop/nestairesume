/**
 * Minimal Timeline Template
 * Ported from frontend/components/templates/layouts/minimal/MinimalTimeline.tsx
 */

import { PdfResumeData, PdfTheme } from '../../types/pdf';
import {
    getFontFamily,
    fontSizes,
    escapeHtml,
    formatDescription,
} from './shared/helpers';

export const renderMinimalTimeline = (data: PdfResumeData, theme: PdfTheme): string => {
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
    const bodyFont = getFontFamily(fonts?.body || 'Source Sans Pro');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Theme
    const timelineColor = '#e5e7eb';
    const dotColor = data.customThemeColor || '#000000';

    // Progress bar helper
    const ProgressBar = (label: string, value: number) => `
        <div style="margin-bottom: 10px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                <span style="font-size: 12px; font-weight: 500; color: #1f2937;">${escapeHtml(label)}</span>
            </div>
            <div style="width: 100%; height: 6px; background-color: #e5e7eb; border-radius: 3px;">
                <div style="width: ${value}%; height: 100%; background-color: ${dotColor}; border-radius: 3px;"></div>
            </div>
        </div>
    `;

    // Helper for Section Headers
    const SectionHeader = (title: string) => `
        <h3 style="font-family: ${headingFont}; font-size: 16px; font-weight: 700; margin-bottom: 24px; margin-left: 20px; text-transform: uppercase;">
            ${title}
        </h3>
    `;

    return `
        <div style="width: 100%; min-height: 100%; font-family: ${bodyFont}; font-size: ${sizeConfig.base}; background-color: #FFFFFF; color: #1f2937; padding: 64px; box-sizing: border-box; display: flex; flex-direction: column;">
            
            <!-- Header -->
            <header style="margin-bottom: 64px; margin-left: 20px;">
                <h1 style="font-family: ${headingFont}; font-size: 38px; font-weight: 700; color: #000; margin: 0 0 4px 0;">
                    ${escapeHtml(personalInfo.fullName || 'Your Name')}
                </h1>
                <p style="font-size: 16px; color: #4b5563; margin-bottom: 12px;">
                    ${escapeHtml(personalInfo.jobTitle || 'Job Title')}
                </p>
                <div style="font-size: 12px; color: #6b7280;">
                    ${[personalInfo.location, personalInfo.email, personalInfo.phone]
            .filter(Boolean)
            .map(item => escapeHtml(item!))
            .join('  |  ')}
                </div>
            </header>

            <!-- Experience with Timeline -->
            ${experience.length > 0 ? `
                <section style="margin-bottom: 40px;">
                    ${SectionHeader('Experience')}
                    <div style="border-left: 2px solid ${timelineColor}; margin-left: 20px; padding-left: 24px;">
                        ${experience.map(exp => `
                            <div style="position: relative; margin-bottom: 32px;">
                                <!-- Timeline Dot -->
                                <div style="position: absolute; left: -31px; top: 4px; width: 12px; height: 12px; border-radius: 50%; background-color: ${dotColor}; border: 2px solid white;"></div>

                                <h4 style="font-weight: 700; font-size: 14px; color: #000; margin: 0;">${escapeHtml(exp.title)}</h4>
                                <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">
                                    ${escapeHtml(exp.company)} | ${escapeHtml(exp.startDate)} – ${exp.current ? 'Present' : escapeHtml(exp.endDate)}
                                </div>
                                <p style="font-size: 14px; line-height: 1.6; margin: 0;">
                                    ${formatDescription(exp.description || '')}
                                </p>
                            </div>
                        `).join('')}
                    </div>
                </section>
            ` : ''}

            <!-- Education with Timeline -->
            ${education.length > 0 ? `
                <section style="margin-bottom: 40px;">
                    ${SectionHeader('Education')}
                    <div style="border-left: 2px solid ${timelineColor}; margin-left: 20px; padding-left: 24px;">
                        ${education.map(edu => `
                            <div style="position: relative; margin-bottom: 24px;">
                                <!-- Timeline Dot -->
                                <div style="position: absolute; left: -31px; top: 4px; width: 12px; height: 12px; border-radius: 50%; background-color: ${dotColor}; border: 2px solid white;"></div>
                                
                                <h4 style="font-weight: 700; font-size: 14px; color: #000; margin: 0;">${escapeHtml(edu.degree)}</h4>
                                <div style="font-size: 14px;">${escapeHtml(edu.school)}, ${escapeHtml(edu.city)}</div>
                                <div style="font-size: 12px; color: #6b7280;">${escapeHtml(edu.startDate)} – ${edu.endDate || 'Present'}</div>
                            </div>
                        `).join('')}
                    </div>
                </section>
            ` : ''}

            <!-- Skills -->
            ${skills.length > 0 ? `
                <section style="margin-left: 20px; margin-bottom: 32px;">
                    <h3 style="font-family: ${headingFont}; font-size: 16px; font-weight: 700; margin-bottom: 16px; text-transform: uppercase;">Skills</h3>
                    <div>
                        ${skills.map(skill => ProgressBar(skill.name, (skill.level || 3) * 20)).join('')}
                    </div>
                </section>
            ` : ''}

            <!-- Languages -->
            ${languages && languages.length > 0 ? `
                <section style="margin-left: 20px; margin-bottom: 32px;">
                    <h3 style="font-family: ${headingFont}; font-size: 16px; font-weight: 700; margin-bottom: 16px; text-transform: uppercase;">Languages</h3>
                    <p style="line-height: 1.8; font-size: 14px;">
                        ${languages.map(l => `${escapeHtml(l.name)} (${escapeHtml(l.proficiency)})`).join('  •  ')}
                    </p>
                </section>
            ` : ''}

            <!-- Strengths -->
            ${strengths && strengths.length > 0 ? `
                <section style="margin-left: 20px; margin-bottom: 32px;">
                    <h3 style="font-family: ${headingFont}; font-size: 16px; font-weight: 700; margin-bottom: 16px; text-transform: uppercase;">Strengths</h3>
                    <div style="display: flex; flex-wrap: wrap; gap: 12px;">
                        ${strengths.map(str => `
                            <span style="font-size: 14px; color: #1f2937; background-color: #f3f4f6; padding: 4px 8px; border-radius: 4px;">
                                ${escapeHtml(str.name)}
                            </span>
                        `).join('')}
                    </div>
                </section>
            ` : ''}

            <!-- Interests -->
            ${interests && interests.length > 0 ? `
                <section style="margin-left: 20px; margin-bottom: 32px;">
                    <h3 style="font-family: ${headingFont}; font-size: 16px; font-weight: 700; margin-bottom: 16px; text-transform: uppercase;">Interests</h3>
                    <p style="line-height: 1.8; font-size: 14px;">
                        ${interests.map(i => escapeHtml(i.name)).join(' • ')}
                    </p>
                </section>
            ` : ''}

            <!-- Credentials -->
            ${(certifications && certifications.length > 0) || (awards && awards.length > 0) ? `
                <section style="margin-left: 20px; margin-bottom: 32px;">
                    <h3 style="font-family: ${headingFont}; font-size: 16px; font-weight: 700; margin-bottom: 16px; text-transform: uppercase;">Credentials</h3>
                    ${certifications && certifications.length > 0 ? `
                        <div style="margin-bottom: ${awards && awards.length > 0 ? '16px' : '0'};">
                            <h4 style="font-size: 14px; font-weight: 600; color: #6b7280; margin-bottom: 8px;">Certifications</h4>
                            <div style="display: flex; flex-direction: column; gap: 8px;">
                                ${certifications.map(cert => `
                                    <div>
                                        <div style="font-weight: 600; font-size: 14px; color: #1f2937;">${escapeHtml(cert.name)}</div>
                                        <div style="font-size: 12px; color: #6b7280;">${escapeHtml(cert.issuer)} • ${escapeHtml(cert.date)}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    ${awards && awards.length > 0 ? `
                        <div>
                            <h4 style="font-size: 14px; font-weight: 600; color: #6b7280; margin-bottom: 8px;">Awards & Achievements</h4>
                            <div style="display: flex; flex-direction: column; gap: 8px;">
                                ${awards.map(award => `
                                    <div>
                                        <div style="font-weight: 600; font-size: 14px; color: #1f2937;">${escapeHtml(award.title)}</div>
                                        <div style="font-size: 12px; color: #6b7280;">${escapeHtml(award.issuer)} • ${escapeHtml(award.date)}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                </section>
            ` : ''}

        </div>
    `;
};

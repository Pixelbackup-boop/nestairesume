/**
 * Header Dark Box Template
 * Ported from frontend/components/templates/layouts/header/HeaderDarkBox.tsx
 *
 * Distinctive dark box containing only the name, with contact info beside it.
 * Single-color schema - accent applies to name box and section headers.
 */

import { PdfResumeData, PdfTheme } from '../../types/pdf';
import {
    getFontFamily,
    getBackgroundCSS,
    escapeHtml,
    formatDescription
} from './shared/helpers';

export const renderHeaderDarkBox = (data: PdfResumeData, theme: PdfTheme): string => {
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
    const headingFont = getFontFamily(fonts?.heading || 'Inter');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    const bgStyle = getBackgroundCSS(background);

    // Colors
    const accentColor = data.customThemeColor || theme.primary || '#2563eb';

    // Helper for Section Headers with Icon
    const SectionHeader = (title: string, icon: string) => `
        <h3 style="font-family: ${headingFont}; font-size: 14px; font-weight: 700; color: ${accentColor}; margin-bottom: 14px; display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 14px;">${icon}</span>
            ${title}
        </h3>
    `;

    // Circular progress for skills
    const CircularProgress = (value: number, label: string) => {
        const radius = 32;
        const circumference = 2 * Math.PI * radius;
        const strokeDashoffset = circumference - (value / 100) * circumference;
        return `
            <div style="display: flex; flex-direction: column; align-items: center;">
                <svg width="80" height="80" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r="${radius}" fill="none" stroke="#e5e7eb" stroke-width="8"/>
                    <circle cx="40" cy="40" r="${radius}" fill="none" stroke="${accentColor}" stroke-width="8"
                        stroke-dasharray="${circumference}" stroke-dashoffset="${strokeDashoffset}"
                        transform="rotate(-90 40 40)" stroke-linecap="round"/>
                    <text x="40" y="45" text-anchor="middle" font-size="12px" fill="#374151" font-weight="600">${value}%</text>
                </svg>
                <span style="font-size: 11px; color: #374151; margin-top: 4px; text-align: center; max-width: 80px;">${escapeHtml(label)}</span>
            </div>
        `;
    };

    // Progress bar for expertise with level
    const ProgressBar = (label: string, value: number) => `
        <div style="margin-bottom: 12px;">
            <div style="font-size: 10pt; font-weight: 500; color: #374151; margin-bottom: 4px;">${escapeHtml(label)}</div>
            <div style="width: 100%; height: 10px; background-color: #e5e7eb; border-radius: 2px;">
                <div style="width: ${value}%; height: 100%; background-color: ${accentColor}; border-radius: 2px;"></div>
            </div>
        </div>
    `;

    // Profile Avatar - Shows image or initials placeholder
    const getInitials = (name: string): string => {
        const parts = (name || 'YN').trim().split(/\s+/);
        if (parts.length === 1) {
            return parts[0].substring(0, 2).toUpperCase();
        }
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    };

    const ProfileAvatar = (profileImage: string | undefined, fullName: string, size: number = 120) => {
        const initials = getInitials(fullName);
        const fontSize = Math.round(size * 0.4);

        if (profileImage) {
            return `
                <div style="width: ${size}px; height: ${size}px; border-radius: 50%; overflow: hidden; border: 3px solid ${accentColor}; flex-shrink: 0;">
                    <img src="${escapeHtml(profileImage)}" alt="${escapeHtml(fullName)}" style="width: 100%; height: 100%; object-fit: cover;" />
                </div>
            `;
        }

        // Placeholder with initials
        return `
            <div style="width: ${size}px; height: ${size}px; border-radius: 50%; background-color: #e5e7eb; border: 3px solid ${accentColor}; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                <span style="font-family: ${headingFont}; font-size: ${fontSize}px; font-weight: 700; color: ${accentColor};">
                    ${initials}
                </span>
            </div>
        `;
    };

    return `
        <div style="width: 100%; min-height: 100%; font-family: ${bodyFont}; font-size: 10pt; background-color: #ffffff; padding: 40px; box-sizing: border-box; ${bgStyle}">

            <!-- Header Area -->
            <header style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 48px;">

                <!-- Profile Avatar - Circle with image or initials -->
                ${ProfileAvatar(personalInfo.profileImage, personalInfo.fullName || 'Your Name', 120)}

                <!-- Name Box - Solid Vibrant Color -->
                <div style="background-color: ${accentColor}; padding: 40px 60px; display: inline-block; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
                    <h1 style="font-family: ${headingFont}; font-size: 28px; font-weight: 900; color: #ffffff; letter-spacing: 0.05em; text-transform: uppercase; margin: 0; line-height: 1;">
                        ${escapeHtml(personalInfo.fullName || 'Your Name')}
                    </h1>
                </div>

                <!-- Contact Info - Right Aligned -->
                <div style="text-align: right; font-size: 10pt; color: #374151; line-height: 1.8; padding-top: 10px;">
                    ${personalInfo.phone ? `<div><strong>Phone:</strong> ${escapeHtml(personalInfo.phone)}</div>` : ''}
                    ${personalInfo.email ? `<div><strong>Email:</strong> ${escapeHtml(personalInfo.email)}</div>` : ''}
                    ${personalInfo.website ? `<div><strong>Web:</strong> ${escapeHtml(personalInfo.website)}</div>` : ''}
                    ${personalInfo.location ? `<div><strong>Loc:</strong> ${escapeHtml(personalInfo.location)}</div>` : ''}
                </div>
            </header>

            <!-- Two-Column Body -->
            <div style="display: flex; gap: 48px;">

                <!-- LEFT COLUMN -->
                <div style="width: 60%;">

                    <!-- Profile / Summary -->
                    ${personalInfo.summary ? `
                        <section style="margin-bottom: 28px;">
                            ${SectionHeader('Profile', '&#128100;')}
                            <p style="color: #374151; line-height: 1.6; font-size: 10pt;">
                                ${formatDescription(personalInfo.summary)}
                            </p>
                        </section>
                    ` : ''}

                    <!-- Work Experience -->
                    ${experience.length > 0 ? `
                        <section style="margin-bottom: 28px;">
                            ${SectionHeader('Experience', '&#128188;')}
                            <div style="display: flex; flex-direction: column; gap: 20px;">
                                ${experience.map(exp => `
                                    <div>
                                        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
                                            <h4 style="font-weight: 800; font-size: 11pt; color: #1f2937;">
                                                ${escapeHtml(exp.title)}
                                            </h4>
                                            <span style="font-size: 9pt; color: #6b7280; font-weight: 500;">
                                                ${escapeHtml(exp.startDate)} – ${exp.current ? 'Present' : escapeHtml(exp.endDate)}
                                            </span>
                                        </div>
                                        <p style="font-size: 10pt; color: ${accentColor}; font-weight: 700; margin-bottom: 6px; text-transform: uppercase;">
                                            ${escapeHtml(exp.company)} ${exp.city ? `| ${escapeHtml(exp.city)}` : ''}
                                        </p>
                                        ${exp.description ? `
                                            <p style="font-size: 10pt; color: #4b5563; line-height: 1.5;">
                                                ${formatDescription(exp.description)}
                                            </p>
                                        ` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Education (Left Column) -->
                    ${education.length > 0 ? `
                        <section style="margin-bottom: 28px;">
                            ${SectionHeader('Education', '&#127891;')}
                            <div style="display: flex; flex-direction: column; gap: 16px;">
                                ${education.slice(0, 2).map(edu => `
                                    <div>
                                        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
                                            <h4 style="font-weight: 800; font-size: 11pt; color: #1f2937;">
                                                ${escapeHtml(edu.degree)}
                                            </h4>
                                            <span style="font-size: 9pt; color: #6b7280; font-weight: 500;">
                                                ${escapeHtml(edu.startDate)} – ${edu.endDate || 'Present'}
                                            </span>
                                        </div>
                                        <p style="font-size: 10pt; color: ${accentColor}; font-weight: 700;">
                                            ${escapeHtml(edu.school)} ${edu.city ? `| ${escapeHtml(edu.city)}` : ''}
                                        </p>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}
                </div>

                <!-- RIGHT COLUMN -->
                <div style="width: 40%;">

                    <!-- Education (Right Column - additional) -->
                    ${education.length > 2 ? `
                        <section style="margin-bottom: 28px;">
                            ${SectionHeader('Education (Cont.)', '&#127891;')}
                            <div style="display: flex; flex-direction: column; gap: 16px;">
                                ${education.slice(2).map(edu => `
                                    <div>
                                        <h4 style="font-weight: 800; font-size: 11pt; color: #1f2937; margin-bottom: 4px;">
                                            ${escapeHtml(edu.degree)}
                                        </h4>
                                        <p style="font-size: 10pt; color: ${accentColor}; font-weight: 700; margin-bottom: 2px;">
                                            ${escapeHtml(edu.school)}
                                        </p>
                                        <span style="font-size: 9pt; color: #6b7280;">
                                            ${escapeHtml(edu.startDate)} – ${edu.endDate || 'Present'}
                                        </span>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Languages -->
                    ${languages && languages.length > 0 ? `
                        <section style="margin-bottom: 28px;">
                            ${SectionHeader('Languages', '&#128483;')}
                            <div style="display: flex; flex-direction: column; gap: 8px;">
                                ${languages.map(lang => `
                                    <div style="display: flex; justify-content: space-between; font-size: 10pt;">
                                        <span style="font-weight: 600;">${escapeHtml(lang.name)}</span>
                                        <span style="color: #6b7280;">${escapeHtml(lang.proficiency)}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Skills (Circular) -->
                    ${skills.length > 0 ? `
                        <section style="margin-bottom: 28px;">
                            ${SectionHeader('Skills', '&#129309;')}
                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 10px;">
                                ${skills.map(skill => CircularProgress(skill.level ? skill.level * 20 : 80, skill.name)).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Strengths (Bars) -->
                    ${strengths && strengths.length > 0 ? `
                        <section style="margin-bottom: 28px;">
                            ${SectionHeader('Expertise', '&#128187;')}
                            <div>
                                ${strengths.map(str => ProgressBar(str.name, (str as any).level ?? 80)).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Interests -->
                    ${interests && interests.length > 0 ? `
                        <section style="margin-bottom: 28px;">
                            ${SectionHeader('Interests', '&#11088;')}
                            <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                                ${interests.map(int => `
                                    <span style="font-size: 10pt; font-weight: 500; color: #4b5563;">
                                        ${escapeHtml(int.name)}
                                    </span>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Credentials -->
                    ${(certifications && certifications.length > 0) || (awards && awards.length > 0) ? `
                        <section style="margin-bottom: 28px;">
                            ${SectionHeader('Credentials', '&#127942;')}
                            ${certifications && certifications.length > 0 ? `
                                <div style="margin-bottom: ${awards && awards.length > 0 ? '16px' : '0'};">
                                    <h4 style="font-size: 10pt; font-weight: 600; color: #6b7280; margin-bottom: 8px;">Certifications</h4>
                                    <div style="display: flex; flex-direction: column; gap: 8px;">
                                        ${certifications.map(cert => `
                                            <div>
                                                <div style="font-weight: 600; font-size: 10pt; color: #1f2937;">${escapeHtml(cert.name)}</div>
                                                <div style="font-size: 9pt; color: #6b7280;">${escapeHtml(cert.issuer)} • ${escapeHtml(cert.date)}</div>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}
                            ${awards && awards.length > 0 ? `
                                <div>
                                    <h4 style="font-size: 10pt; font-weight: 600; color: #6b7280; margin-bottom: 8px;">Awards & Achievements</h4>
                                    <div style="display: flex; flex-direction: column; gap: 8px;">
                                        ${awards.map(award => `
                                            <div>
                                                <div style="font-weight: 600; font-size: 10pt; color: #1f2937;">${escapeHtml(award.title)}</div>
                                                <div style="font-size: 9pt; color: #6b7280;">${escapeHtml(award.issuer)} • ${escapeHtml(award.date)}</div>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}
                        </section>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
};

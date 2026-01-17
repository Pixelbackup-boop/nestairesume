/**
 * Header Dark Box Template
 * Ported from frontend/components/templates/layouts/header/HeaderDarkBox.tsx
 *
 * Distinctive bordered box containing only the name, with contact info beside it.
 * Dual-color schema: primary = box border color, secondary = accent highlights.
 */

import { PdfResumeData, PdfTheme } from '../../types/pdf';
import {
    getFontFamily,
    escapeHtml,
    formatDescription,
    parseDualColor
} from './shared/helpers';
// Note: getBackgroundCSS removed - header-dark-box always uses white body background

// Helper function to convert proficiency string to percentage
function getLanguageLevelPercent(proficiency: string): number {
    const prof = proficiency?.toLowerCase() || '';
    if (prof.includes('native') || prof === 'native') return 100;
    if (prof.includes('fluent') || prof === 'fluent') return 95;
    if (prof.includes('advanced') || prof === 'advanced') return 80;
    if (prof.includes('intermediate') || prof === 'intermediate') return 60;
    if (prof.includes('basic') || prof === 'basic') return 40;
    return 50; // default
}

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
        references = [],
        fonts
    } = data;
    // Note: 'background' not destructured - this template always uses white body
    const headingFont = getFontFamily(fonts?.heading || 'Inter');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');

    // Font size scaling based on user's size preference (small/medium/large)
    // MUST match frontend styleHelpers.ts getScaledFontSizes() for identical content flow
    // small: 12px base (0.857x), medium: 14px base (1x), large: 16px base (1.143x)
    // Note: Header name stays fixed at 28px - only body content scales
    const sizeMultiplier = fonts?.size === 'small' ? 0.857 : fonts?.size === 'large' ? 1.143 : 1;
    const fs = {
        name: '28px', // Fixed - header name box doesn't scale
        sectionHeading: `${Math.round(14 * sizeMultiplier)}px`,
        entryTitle: `${Math.round(12 * sizeMultiplier)}px`, // 12px matches frontend
        body: `${Math.round(11 * sizeMultiplier)}px`,       // 11px matches frontend
        small: `${Math.round(10 * sizeMultiplier)}px`,      // 10px matches frontend
    };

    // Parse dual color: primary = box BORDER, secondary = accent highlights
    // This makes both colors visually distinct in the template
    const { primary: boxBorderColor, secondary: accentColor } = parseDualColor(
        data.customThemeColor,
        { primary: '#2563eb', secondary: '#facc15' } // Blue border, Yellow accents by default
    );

    // Helper for Section Headers with Icon
    const SectionHeader = (title: string, icon: string) => `
        <h3 style="font-family: ${headingFont}; font-size: ${fs.sectionHeading}; font-weight: 700; color: ${accentColor}; margin-bottom: 14px; display: flex; align-items: center; gap: 8px;">
            <span style="font-size: ${fs.sectionHeading};">${icon}</span>
            ${title}
        </h3>
    `;

    // Circular progress for skills
    const circleTextSize = `${Math.round(12 * sizeMultiplier)}px`;
    const circleLabelSize = `${Math.round(11 * sizeMultiplier)}px`;
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
                    <text x="40" y="45" text-anchor="middle" font-size="${circleTextSize}" fill="#374151" font-weight="600">${value}%</text>
                </svg>
                <span style="font-size: ${circleLabelSize}; color: #374151; margin-top: 4px; text-align: center; max-width: 80px;">${escapeHtml(label)}</span>
            </div>
        `;
    };

    // Progress bar for expertise with level
    const ProgressBar = (label: string, value: number) => `
        <div style="margin-bottom: 12px;">
            <div style="font-size: ${fs.body}; font-weight: 500; color: #374151; margin-bottom: 4px;">${escapeHtml(label)}</div>
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
        <div style="width: 100%; min-height: 100%; font-family: ${bodyFont}; font-size: ${fs.body}; background-color: #ffffff; padding: 40px; box-sizing: border-box;">

            <!-- Header Area -->
            <header data-paginate style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 48px;">

                <!-- Profile Avatar - Circle with image or initials -->
                ${ProfileAvatar(personalInfo.profileImage, personalInfo.fullName || 'Your Name', 120)}

                <!-- Name Box - Bordered Outline Style -->
                <div style="background-color: #ffffff; border: 4px solid ${boxBorderColor}; padding: 32px 48px; display: inline-block;">
                    <h1 style="font-family: ${headingFont}; font-size: ${fs.name}; font-weight: 900; color: #1f2937; letter-spacing: 0.05em; text-transform: uppercase; margin: 0; line-height: 1;">
                        ${escapeHtml(personalInfo.fullName || 'Your Name')}
                    </h1>
                </div>

                <!-- Contact Info - Right Aligned -->
                <div style="text-align: right; font-size: ${fs.body}; color: #374151; line-height: 1.8; padding-top: 10px;">
                    ${personalInfo.phone ? `<div><strong>Phone:</strong> ${escapeHtml(personalInfo.phone)}</div>` : ''}
                    ${personalInfo.email ? `<div><strong>Email:</strong> ${escapeHtml(personalInfo.email)}</div>` : ''}
                    ${personalInfo.website ? `<div><strong>Web:</strong> ${escapeHtml(personalInfo.website)}</div>` : ''}
                    ${personalInfo.location ? `<div><strong>Loc:</strong> ${escapeHtml(personalInfo.location)}</div>` : ''}
                    ${personalInfo.linkedin ? `<div><strong>LinkedIn:</strong> ${escapeHtml(personalInfo.linkedin)}</div>` : ''}
                    ${personalInfo.nationality ? `<div><strong>Nationality:</strong> ${escapeHtml(personalInfo.nationality)}</div>` : ''}
                    ${personalInfo.idType && personalInfo.idNumber ? `<div><strong>${personalInfo.idType === 'id' ? 'ID' : personalInfo.idType === 'passport' ? 'Passport' : 'License'}:</strong> ${escapeHtml(personalInfo.idNumber)}</div>` : ''}
                </div>
            </header>

            <!-- Two-Column Body -->
            <div style="display: flex; gap: 48px;">

                <!-- LEFT COLUMN -->
                <div style="width: 60%;">

                    <!-- Profile / Summary -->
                    ${personalInfo.summary ? `
                        <section data-paginate style="margin-bottom: 24px;">
                            ${SectionHeader('Profile', '&#128100;')}
                            <p style="color: #374151; line-height: 1.6; font-size: ${fs.body};">
                                ${formatDescription(personalInfo.summary)}
                            </p>
                        </section>
                    ` : ''}

                    <!-- Work Experience -->
                    ${experience.length > 0 ? `
                        <section data-paginate style="margin-bottom: 24px;">
                            ${SectionHeader('Experience', '&#128188;')}
                            <div style="display: flex; flex-direction: column; gap: 20px;">
                                ${experience.map(exp => `
                                    <div data-paginate="item">
                                        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
                                            <h4 style="font-weight: 800; font-size: ${fs.entryTitle}; color: #1f2937;">
                                                ${escapeHtml(exp.title)}
                                            </h4>
                                            <span style="font-size: ${fs.small}; color: #6b7280; font-weight: 500;">
                                                ${escapeHtml(exp.startDate)} – ${exp.current ? 'Present' : escapeHtml(exp.endDate)}
                                            </span>
                                        </div>
                                        <p style="font-size: ${fs.body}; color: ${accentColor}; font-weight: 700; margin-bottom: 6px; text-transform: uppercase;">
                                            ${escapeHtml(exp.company)} ${exp.city ? `| ${escapeHtml(exp.city)}` : ''}
                                        </p>
                                        ${exp.description ? `
                                            <p style="font-size: ${fs.body}; color: #4b5563; line-height: 1.5;">
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
                        <section data-paginate style="margin-bottom: 24px;">
                            ${SectionHeader('Education', '&#127891;')}
                            <div style="display: flex; flex-direction: column; gap: 16px;">
                                ${education.slice(0, 2).map(edu => `
                                    <div data-paginate="item">
                                        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
                                            <h4 style="font-weight: 800; font-size: ${fs.entryTitle}; color: #1f2937;">
                                                ${escapeHtml(edu.degree)}
                                            </h4>
                                            <span style="font-size: ${fs.small}; color: #6b7280; font-weight: 500;">
                                                ${escapeHtml(edu.startDate)} – ${edu.endDate || 'Present'}
                                            </span>
                                        </div>
                                        <p style="font-size: ${fs.body}; color: ${accentColor}; font-weight: 700;">
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
                        <section data-paginate style="margin-bottom: 24px;">
                            ${SectionHeader('Education (Cont.)', '&#127891;')}
                            <div style="display: flex; flex-direction: column; gap: 16px;">
                                ${education.slice(2).map(edu => `
                                    <div data-paginate="item">
                                        <h4 style="font-weight: 800; font-size: ${fs.entryTitle}; color: #1f2937; margin-bottom: 4px;">
                                            ${escapeHtml(edu.degree)}
                                        </h4>
                                        <p style="font-size: ${fs.body}; color: ${accentColor}; font-weight: 700; margin-bottom: 2px;">
                                            ${escapeHtml(edu.school)}
                                        </p>
                                        <span style="font-size: ${fs.small}; color: #6b7280;">
                                            ${escapeHtml(edu.startDate)} – ${edu.endDate || 'Present'}
                                        </span>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Languages -->
                    ${languages && languages.length > 0 ? `
                        <section data-paginate style="margin-bottom: 24px;">
                            ${SectionHeader('Languages', '&#128483;')}
                            <div style="display: flex; flex-direction: column; gap: 12px;">
                                ${languages.map(lang => `
                                    <div data-paginate="item">${ProgressBar(lang.name, lang.level || getLanguageLevelPercent(lang.proficiency))}</div>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Skills (Circular) -->
                    ${skills.length > 0 ? `
                        <section data-paginate style="margin-bottom: 24px;">
                            ${SectionHeader('Skills', '&#129309;')}
                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 10px;">
                                ${skills.map(skill => `<div data-paginate="item">${CircularProgress(skill.level ? skill.level * 20 : 80, skill.name)}</div>`).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Strengths (Bars) -->
                    ${strengths && strengths.length > 0 ? `
                        <section data-paginate style="margin-bottom: 24px;">
                            ${SectionHeader('Expertise', '&#128187;')}
                            <div>
                                ${strengths.map(str => `<div data-paginate="item">${ProgressBar(str.name, (str as any).level ?? 80)}</div>`).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Interests -->
                    ${interests && interests.length > 0 ? `
                        <section data-paginate style="margin-bottom: 24px;">
                            ${SectionHeader('Interests', '&#11088;')}
                            <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                                ${interests.map(int => `
                                    <span data-paginate="item" style="font-size: ${fs.body}; font-weight: 500; color: #4b5563;">
                                        ${escapeHtml(int.name)}
                                    </span>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Credentials -->
                    ${(certifications && certifications.length > 0) || (awards && awards.length > 0) ? `
                        <section data-paginate style="margin-bottom: 24px;">
                            ${SectionHeader('Credentials', '&#127942;')}
                            ${certifications && certifications.length > 0 ? `
                                <div style="margin-bottom: ${awards && awards.length > 0 ? '16px' : '0'};">
                                    <h4 style="font-size: ${fs.body}; font-weight: 600; color: #6b7280; margin-bottom: 8px;">Certifications</h4>
                                    <div style="display: flex; flex-direction: column; gap: 8px;">
                                        ${certifications.map(cert => `
                                            <div data-paginate="item">
                                                <div style="font-weight: 600; font-size: ${fs.body}; color: #1f2937;">${escapeHtml(cert.name)}</div>
                                                <div style="font-size: ${fs.small}; color: #6b7280;">${escapeHtml(cert.issuer)} • ${escapeHtml(cert.date)}</div>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}
                            ${awards && awards.length > 0 ? `
                                <div>
                                    <h4 style="font-size: ${fs.body}; font-weight: 600; color: #6b7280; margin-bottom: 8px;">Awards & Achievements</h4>
                                    <div style="display: flex; flex-direction: column; gap: 8px;">
                                        ${awards.map(award => `
                                            <div data-paginate="item">
                                                <div style="font-weight: 600; font-size: ${fs.body}; color: #1f2937;">${escapeHtml(award.title)}</div>
                                                <div style="font-size: ${fs.small}; color: #6b7280;">${escapeHtml(award.issuer)} • ${escapeHtml(award.date)}</div>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}
                        </section>
                    ` : ''}

                    <!-- Social Links -->
                    ${(personalInfo.twitter || personalInfo.github || personalInfo.dribbble || personalInfo.behance || personalInfo.instagram) ? `
                        <section data-paginate style="margin-bottom: 24px;">
                            ${SectionHeader('Social Links', '&#128279;')}
                            <div style="display: flex; flex-direction: column; gap: 8px;">
                                ${personalInfo.twitter ? `
                                    <div data-paginate="item" style="display: flex; align-items: center; gap: 8px; font-size: ${fs.body};">
                                        <span>&#128038;</span>
                                        <span style="color: #374151;">${escapeHtml(personalInfo.twitter)}</span>
                                    </div>
                                ` : ''}
                                ${personalInfo.github ? `
                                    <div data-paginate="item" style="display: flex; align-items: center; gap: 8px; font-size: ${fs.body};">
                                        <span>&#128187;</span>
                                        <span style="color: #374151;">${escapeHtml(personalInfo.github)}</span>
                                    </div>
                                ` : ''}
                                ${personalInfo.dribbble ? `
                                    <div data-paginate="item" style="display: flex; align-items: center; gap: 8px; font-size: ${fs.body};">
                                        <span>&#127936;</span>
                                        <span style="color: #374151;">${escapeHtml(personalInfo.dribbble)}</span>
                                    </div>
                                ` : ''}
                                ${personalInfo.behance ? `
                                    <div data-paginate="item" style="display: flex; align-items: center; gap: 8px; font-size: ${fs.body};">
                                        <span>&#127912;</span>
                                        <span style="color: #374151;">${escapeHtml(personalInfo.behance)}</span>
                                    </div>
                                ` : ''}
                                ${personalInfo.instagram ? `
                                    <div data-paginate="item" style="display: flex; align-items: center; gap: 8px; font-size: ${fs.body};">
                                        <span>&#128247;</span>
                                        <span style="color: #374151;">${escapeHtml(personalInfo.instagram)}</span>
                                    </div>
                                ` : ''}
                            </div>
                        </section>
                    ` : ''}

                    <!-- References -->
                    ${references && references.length > 0 ? `
                        <section data-paginate style="margin-bottom: 24px;">
                            ${SectionHeader('References', '&#128101;')}
                            <div style="display: flex; flex-direction: column; gap: 12px;">
                                ${references.map(ref => `
                                    <div data-paginate="item">
                                        <div style="font-weight: 700; font-size: ${fs.body}; color: #1f2937;">${escapeHtml(ref.name)}</div>
                                        <div style="font-size: ${fs.small}; color: ${accentColor}; font-weight: 600;">
                                            ${escapeHtml(ref.title)}${ref.company ? `, ${escapeHtml(ref.company)}` : ''}
                                        </div>
                                        ${(ref.email || ref.phone) ? `
                                            <div style="font-size: ${fs.small}; color: #6b7280; margin-top: 2px;">
                                                ${ref.email ? `<span>${escapeHtml(ref.email)}</span>` : ''}
                                                ${ref.email && ref.phone ? ' • ' : ''}
                                                ${ref.phone ? `<span>${escapeHtml(ref.phone)}</span>` : ''}
                                            </div>
                                        ` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Custom Field -->
                    ${personalInfo.customField && personalInfo.customFieldLabel ? `
                        <section data-paginate style="margin-bottom: 24px;">
                            ${SectionHeader(escapeHtml(personalInfo.customFieldLabel), '&#128203;')}
                            <p style="font-size: ${fs.body}; color: #374151; line-height: 1.6;">
                                ${formatDescription(personalInfo.customField)}
                            </p>
                        </section>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
};

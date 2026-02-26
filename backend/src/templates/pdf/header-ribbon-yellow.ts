/**
 * Header Ribbon Yellow Template
 * Ported from frontend/components/templates/layouts/header/HeaderRibbonYellow.tsx
 *
 * Yellow ribbon banner with circular photo overlapping at top.
 * Two-column layout with awards and interests section.
 */

import { PdfResumeData, PdfTheme, PdfTranslations } from '../../types/pdf';
import {
    getFontFamily,
    escapeHtml,
    formatDescription,
    getFontScale,
    getIconSVG,
    IconName
} from './shared/helpers';
import { getTranslations } from './shared/translations';
import { formatLocalizedDate } from './shared/dateUtils';

export const renderHeaderRibbonYellow = (
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
        awards = [],
        certifications = [],
        customFields = [],
        fonts
    } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Inter');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    // Note: header-ribbon-yellow always uses white body background; no bgStyle needed

    // Font Scaling
    const scale = getFontScale(fonts?.size);
    const s = (px: number) => `${Math.max(5, Math.round(px * scale))}px`;
    const sNum = (px: number) => Math.max(5, Math.round(px * scale));

    const fs = {
        name: s(28),
        sectionHeading: s(13),
        sectionIcon: s(14),
        entryTitle: s(14), // ~11pt
        body: s(12),       // ~10pt
        small: s(10),      // ~9px/10px
        interestIcon: s(28)
    };

    // Colors
    const accentColor = data.customThemeColor || theme.primary || '#eab308';

    // Helper for Section Headers with Yellow Circle Icon
    const SectionHeader = (title: string, icon: string) => `
        <h3 style="font-family: ${headingFont}; font-size: ${fs.sectionHeading}; font-weight: 700; color: #1f2937; margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">
            <span style="background-color: ${accentColor}; color: #ffffff; width: ${s(28)}; height: ${s(28)}; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: ${fs.sectionIcon};">
                ${icon}
            </span>
            ${title}
        </h3>
    `;

    // Progress bar helper
    const ProgressBar = (label: string, value: number) => `
        <div style="margin-bottom: 10px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                <span style="font-size: ${fs.body}; font-weight: 500; color: #374151;">${escapeHtml(label)}</span>
            </div>
            <div style="width: 100%; height: 6px; background-color: #e5e7eb; border-radius: 3px;">
                <div style="width: ${value}%; height: 100%; background-color: ${accentColor}; border-radius: 3px;"></div>
            </div>
        </div>
    `;

    // Interest icon helper - SVG icons matching frontend Lucide icons
    const getInterestIcon = (name: string): string => {
        const nameLower = name.toLowerCase();
        const color = accentColor;
        const size = sNum(28);

        if (nameLower.includes('music') || nameLower.includes('guitar') || nameLower.includes('rock')) return getIconSVG('music', color, size);
        if (nameLower.includes('football') || nameLower.includes('soccer') || nameLower.includes('sport') || nameLower.includes('fitness')) return getIconSVG('football', color, size);
        if (nameLower.includes('photo')) return getIconSVG('camera', color, size);
        if (nameLower.includes('hiking') || nameLower.includes('hike') || nameLower.includes('climb')) return getIconSVG('hiking', color, size);
        if (nameLower.includes('biking') || nameLower.includes('bike') || nameLower.includes('cycling') || nameLower.includes('cycle')) return getIconSVG('bike', color, size);
        if (nameLower.includes('tennis')) return getIconSVG('tennis', color, size);
        if (nameLower.includes('travel')) return getIconSVG('plane', color, size);
        if (nameLower.includes('reading') || nameLower.includes('book') || nameLower.includes('novel') || nameLower.includes('read')) return getIconSVG('book-open', color, size);
        if (nameLower.includes('cooking') || nameLower.includes('food') || nameLower.includes('cook')) return getIconSVG('cooking-pot', color, size);
        if (nameLower.includes('gaming') || nameLower.includes('game')) return getIconSVG('gamepad', color, size);
        if (nameLower.includes('film') || nameLower.includes('movie')) return getIconSVG('film', color, size);
        if (nameLower.includes('art') || nameLower.includes('paint') || nameLower.includes('ballet') || nameLower.includes('dance')) return getIconSVG('palette', color, size);
        if (nameLower.includes('yoga') || nameLower.includes('meditation')) return getIconSVG('yoga', color, size);
        if (nameLower.includes('swim')) return getIconSVG('swimming', color, size);
        if (nameLower.includes('run')) return getIconSVG('running', color, size);
        if (nameLower.includes('sleep') || nameLower.includes('rest') || nameLower.includes('nap')) return getIconSVG('moon', color, size);
        if (nameLower.includes('coffee')) return getIconSVG('coffee', color, size);
        if (nameLower.includes('garden')) return getIconSVG('tent', color, size);
        if (nameLower.includes('ski') || nameLower.includes('snowboard')) return getIconSVG('hiking', color, size);
        return getIconSVG('star', color, size);
    };

    // Profile Image with yellow circle background - STATIC SIZE (not affected by text size)
    const profileImage = personalInfo.profileImage ? `
        <img
            src="${personalInfo.profileImage}"
            alt="${escapeHtml(personalInfo.fullName)}"
            style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 5px solid #374151;"
        />
    ` : `
        <div style="width: 100px; height: 100px; border-radius: 50%; background-color: #e5e7eb; border: 5px solid #374151; display: flex; align-items: center; justify-content: center; font-size: 36px; color: #9ca3af; font-weight: 700;">
            ${escapeHtml(personalInfo.fullName?.charAt(0) || '?')}
        </div>
    `;

    return `
        <div style="width: 100%; min-height: 100%; font-family: ${bodyFont}; font-size: ${fs.body}; background-color: #ffffff; position: relative; box-sizing: border-box; padding: 24px 40px;">

            <!-- Header Area with Photo and Diagonal Ribbon - STATIC SIZES -->
            <header style="text-align: center; padding-bottom: 16px;">

                <!-- Profile Photo - STATIC SIZE, no yellow background -->
                <div style="display: flex; justify-content: center; margin-bottom: -5px; position: relative; z-index: 10;">
                    ${profileImage}
                </div>

                <!-- Diagonal Parallelogram Ribbon - STATIC SIZE, WIDER -->
                <div style="display: flex; justify-content: center; margin-left: 0; margin-right: 0;">
                    <div style="background-color: ${accentColor}; height: 72px; padding-left: 180px; padding-right: 180px; display: flex; align-items: center; justify-content: center; transform: skewX(-10deg);">
                        <!-- Name - counter-skew to keep text straight, STATIC size -->
                        <h1 style="font-family: ${headingFont}; font-size: ${fs.name}; font-weight: 700; color: #ffffff; text-transform: uppercase; letter-spacing: 0.1em; transform: skewX(10deg); margin: 0;">
                            ${escapeHtml(personalInfo.fullName || 'Your Name')}
                        </h1>
                    </div>
                </div>

                <!-- Contact Info -->
                <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; font-size: ${fs.small}; color: #6b7280; margin-top: 16px;">
                    ${personalInfo.phone ? `<span>${escapeHtml(personalInfo.phone)}</span>` : ''}
                    ${personalInfo.email ? `<span>|</span><span>${escapeHtml(personalInfo.email)}</span>` : ''}
                    ${personalInfo.website ? `<span>|</span><span>${escapeHtml(personalInfo.website)}</span>` : ''}
                    ${personalInfo.linkedin ? `<span>|</span><span>${escapeHtml(personalInfo.linkedin)}</span>` : ''}
                </div>

            </header>

            <!-- Two-Column Body -->
            <div style="display: flex; gap: 24px;">

                <!-- LEFT COLUMN - Profile, Experience, Education -->
                <div style="width: 55%;">

                    <!-- Profile / Summary -->
                    ${personalInfo.summary ? `
                        <section class="resume-section" style="margin-bottom: 20px;">
                            ${SectionHeader(t.sections.profile, getIconSVG('user', 'white', sNum(14)))}
                            <p style="color: #374151; line-height: 1.6; font-size: ${fs.body};">
                                ${formatDescription(personalInfo.summary)}
                            </p>
                        </section>
                    ` : ''}

                    <!-- Work Experience -->
                    ${experience.length > 0 ? `
                        <section class="resume-section" style="margin-bottom: 20px;">
                            ${SectionHeader(t.sections.experience, getIconSVG('briefcase', 'white', sNum(14)))}
                            <div style="display: flex; flex-direction: column; gap: 12px;">
                                ${experience.map(exp => `
                                    <div data-paginate="item">
                                        <p style="font-size: ${fs.small}; color: #6b7280; margin-bottom: 2px; text-transform: uppercase;">
                                            ${formatLocalizedDate(exp.startDate, locale)} – ${exp.current ? t.labels.present.toUpperCase() : formatLocalizedDate(exp.endDate, locale)}
                                            ${(exp.city || exp.country) ? `&nbsp;&nbsp;&nbsp;&nbsp;${escapeHtml([exp.city, exp.country].filter(Boolean).join(', ').toUpperCase())}` : ''}
                                        </p>
                                        <h4 style="font-weight: 700; font-size: ${fs.entryTitle}; color: #1f2937; margin-bottom: 1px;">
                                            ${escapeHtml(exp.title)}
                                        </h4>
                                        <p style="font-size: ${fs.body}; color: ${accentColor}; font-weight: 600; margin-bottom: 4px;">
                                            ${escapeHtml(exp.company)}
                                        </p>
                                        ${exp.description ? `
                                            <ul style="padding-left: 14px; margin: 0; list-style: disc;">
                                                ${exp.description.split('\n').filter(Boolean).map(line => `
                                                    <li style="font-size: ${fs.small}; color: #4b5563; margin-bottom: 1px; line-height: 1.4;">
                                                        ${escapeHtml(line.replace(/^[-•]\s*/, ''))}
                                                    </li>
                                                `).join('')}
                                            </ul>
                                        ` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Education -->
                    ${education.length > 0 ? `
                        <section class="resume-section" style="margin-bottom: 20px;">
                            ${SectionHeader(t.sections.education, getIconSVG('graduation-cap', 'white', sNum(14)))}
                            <div style="display: flex; flex-direction: column; gap: 12px;">
                                ${education.map(edu => `
                                    <div data-paginate="item">
                                        <p style="font-size: ${fs.small}; color: #6b7280; margin-bottom: 2px; text-transform: uppercase;">
                                            ${formatLocalizedDate(edu.startDate, locale)} – ${edu.current ? t.labels.present.toUpperCase() : formatLocalizedDate(edu.endDate, locale)}
                                            ${(edu.city || edu.country) ? `&nbsp;&nbsp;&nbsp;&nbsp;${escapeHtml([edu.city, edu.country].filter(Boolean).join(', ').toUpperCase())}` : ''}
                                        </p>
                                        <h4 style="font-weight: 700; font-size: ${fs.entryTitle}; color: #1f2937; margin-bottom: 1px;">
                                            ${escapeHtml(edu.degree)}
                                            ${edu.gpa ? `<span style="margin-left: 8px; opacity: 0.8; font-weight: 500;">GPA: ${escapeHtml(edu.gpa)}</span>` : ''}
                                        </h4>
                                        <p style="font-size: ${fs.body}; color: ${accentColor}; font-weight: 600;">
                                            ${escapeHtml(edu.school)}
                                        </p>
                                        ${edu.honors ? `<p style="font-size: ${s(11)}; color: #4b5563; opacity: 0.8; margin: 0;">${escapeHtml(edu.honors)}</p>` : ''}
                                        ${edu.clubs ? `<p style="font-size: ${s(10)}; color: #6b7280; opacity: 0.7; margin: 0;">Activities: ${escapeHtml(edu.clubs)}</p>` : ''}
                                        ${edu.description ? `
                                            <p style="font-size: ${fs.small}; color: #6b7280; margin-top: 2px;">
                                                ${formatDescription(edu.description)}
                                            </p>
                                        ` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Personal Details -->
                    ${(personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber)) ? `
                        <section class="resume-section" style="margin-bottom: 20px;">
                            ${SectionHeader(t.sections.personalDetails, getIconSVG('user', 'white', sNum(14)))}
                            <div style="display: flex; flex-direction: column; gap: 8px; font-size: ${fs.body}; color: #1f2937;">
                                ${personalInfo.nationality ? `
                                    <div data-paginate="item">
                                        <span style="font-weight: 700;">Nationality:</span> ${escapeHtml(personalInfo.nationality)}
                                    </div>
                                ` : ''}
                                ${personalInfo.idType && personalInfo.idNumber ? `
                                    <div data-paginate="item">
                                        <span style="font-weight: 700;">
                                            ${personalInfo.idType === 'id' ? 'ID' : personalInfo.idType === 'passport' ? 'Passport' : 'Driving License'}:
                                        </span> ${escapeHtml(personalInfo.idNumber)}
                                    </div>
                                ` : ''}
                            </div>
                        </section>
                    ` : ''}
                </div>

                <!-- RIGHT COLUMN - Awards, Skills, Interests -->
                <div style="width: 45%;">

                    <!-- Credentials -->
                    ${(certifications && certifications.length > 0) || (awards && awards.length > 0) ? `
                        <section class="resume-section" style="margin-bottom: 20px;">
                            ${SectionHeader(t.sections.credentials, getIconSVG('award', 'white', sNum(14)))}
                            ${certifications && certifications.length > 0 ? `
                                <div style="margin-bottom: ${awards && awards.length > 0 ? '16px' : '0'};">
                                    <h4 style="font-size: ${fs.small}; font-weight: 600; color: #6b7280; margin-bottom: 8px; text-transform: uppercase;">${t.sections.certifications}</h4>
                                    <div style="display: flex; flex-direction: column; gap: 12px;">
                                        ${certifications.map(cert => `
                                            <div data-paginate="item">
                                                <h4 style="font-weight: 700; font-size: ${fs.entryTitle}; color: #1f2937; margin-bottom: 1px;">
                                                    ${escapeHtml(cert.name)}
                                                </h4>
                                                <p style="font-size: ${fs.body}; color: ${accentColor}; font-weight: 600;">
                                                    ${escapeHtml(cert.issuer)}
                                                </p>
                                                <p style="font-size: ${fs.small}; color: #6b7280; margin-top: 2px;">
                                                    ${formatLocalizedDate(cert.date, locale)}
                                                </p>
                                                ${cert.url ? `<div style="font-size: ${s(10)}; color: #6b7280; opacity: 0.7;">${escapeHtml(cert.url)}</div>` : ''}
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}
                            ${awards && awards.length > 0 ? `
                                <div>
                                    <h4 style="font-size: ${fs.small}; font-weight: 600; color: #6b7280; margin-bottom: 8px; text-transform: uppercase;">${t.sections.awards}</h4>
                                    <div style="display: flex; flex-direction: column; gap: 12px;">
                                        ${awards.map(award => `
                                            <div data-paginate="item">
                                                <h4 style="font-weight: 700; font-size: ${fs.entryTitle}; color: #1f2937; margin-bottom: 1px;">
                                                    ${escapeHtml(award.title)}
                                                </h4>
                                                <p style="font-size: ${fs.body}; color: ${accentColor}; font-weight: 600;">
                                                    ${escapeHtml(award.issuer)}
                                                </p>
                                                <p style="font-size: ${fs.small}; color: #6b7280; margin-top: 2px;">
                                                    ${formatLocalizedDate(award.date, locale)}
                                                </p>
                                            
                                                ${award.description ? `<p style="font-size: ${s(11)}; line-height: 1.5; color: #4b5563; margin-top: 2px;">${formatDescription(award.description)}</p>` : ''}
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}
                        </section>
                    ` : ''}

                    <!-- Skills -->
                    ${skills.length > 0 ? `
                        <section class="resume-section" style="margin-bottom: 20px;">
                            ${SectionHeader(t.sections.skills, getIconSVG('wrench', 'white', sNum(14)))}
                            <div>
                                ${skills.map(skill => `<div data-paginate="item">${ProgressBar(skill.name, (skill.level || 3) * 20)}</div>`).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Interests with Icons Grid -->
                    ${interests && interests.length > 0 ? `
                        <section class="resume-section" style="margin-bottom: 20px;">
                            ${SectionHeader(t.sections.interests, getIconSVG('star', 'white', sNum(14)))}
                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
                                ${interests.slice(0, 6).map(interest => `
                                    <div data-paginate="item" style="text-align: center;">
                                        <div style="font-size: ${fs.interestIcon}; margin-bottom: 4px; color: ${accentColor};">
                                            ${getInterestIcon(interest.name)}
                                        </div>
                                        <div style="font-size: ${fs.small}; color: #374151;">
                                            ${escapeHtml(interest.name)}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Languages -->
                    ${languages && languages.length > 0 ? `
                        <section class="resume-section" style="margin-bottom: 20px;">
                            ${SectionHeader(t.sections.languages, getIconSVG('languages', 'white', sNum(14)))}
                            <div style="display: flex; flex-direction: column; gap: 8px;">
                                ${languages.map(lang => `
                                    <div data-paginate="item" style="display: flex; justify-content: space-between; font-size: ${fs.body};">
                                        <span style="font-weight: 600; color: #1f2937;">${escapeHtml(lang.name)}</span>
                                        <span style="color: #6b7280;">${escapeHtml(lang.proficiency)}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Social Links -->
                    ${(personalInfo.x || personalInfo.github || personalInfo.dribbble || personalInfo.behance || personalInfo.instagram) ? `
                        <section class="resume-section" style="margin-bottom: 20px;">
                            ${SectionHeader(t.sections.socialLinks, getIconSVG('link', 'white', sNum(14)))}
                            <div style="display: flex; flex-direction: column; gap: 8px;">
                                ${(['x', 'github', 'dribbble', 'behance', 'instagram'] as IconName[]).map(network => {
        const val = (personalInfo as any)[network];
        if (!val) return '';
        return `
                                        <div data-paginate="item" style="display: flex; align-items: center; gap: 10px;">
                                            <div style="width: ${s(24)}; height: ${s(24)}; border-radius: 50%; background-color: ${accentColor}; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                                ${getIconSVG(network, '#FFFFFF', sNum(14))}
                                            </div>
                                            <span style="word-break: break-all; color: #374151; font-size: ${fs.small};">${escapeHtml(val)}</span>
                                        </div>
                                    `;
    }).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Strengths -->
                    ${strengths && strengths.length > 0 ? `
                        <section class="resume-section" style="margin-bottom: 20px;">
                            ${SectionHeader(t.sections.strengths, getIconSVG('zap', 'white', sNum(14)))}
                            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                                ${strengths.map(strength => `
                                    <span data-paginate="item" style="background-color: ${accentColor}; color: #ffffff; padding: 4px 12px; border-radius: 9999px; font-size: ${fs.small}; font-weight: 500;">
                                        ${escapeHtml(strength.name)}
                                    </span>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Custom Fields -->
                    ${customFields.map(field => `
                        <section class="resume-section" style="margin-bottom: 20px;">
                            ${SectionHeader(field.label, getIconSVG('id-card', 'white', sNum(14)))}
                            <p style="color: #374151; line-height: 1.6; font-size: ${fs.body};">
                                ${formatDescription(field.content)}
                            </p>
                        </section>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
};

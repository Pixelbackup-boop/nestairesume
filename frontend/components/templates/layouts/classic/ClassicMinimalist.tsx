'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';

/**
 * Classic Minimalist Template
 * Reference: classic-minimalist.jpg
 * 
 * Layout:
 * - Single Column.
 * - Whitespace: Heavy use.
 * - Typography: Small, clean sans-serif (Inter/Helvetica).
 * - No dividing lines mostly, just spacing.
 */
export default function ClassicMinimalist({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Inter');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes
    const fs = getScaledFontSizes(sizeConfig, scale);

    // Colors
    const mainText = '#1f2937';
    const subText = '#6b7280';
    const accentColor = customThemeColor || '#000000'; // Black is the minimal accent

    return (
        <div
            className="w-full h-full"
            style={{
                fontFamily: bodyFont,
                fontSize: sizeConfig.base,
                backgroundColor: '#FFFFFF',
                color: mainText,
                padding: scale < 1 ? '32px' : '72px', // Spacious
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Header */}
            <header style={{ marginBottom: scale < 1 ? 40 : 72 }}>
                <h1
                    style={{
                        fontFamily: headingFont,
                        fontSize: fs.name,
                        fontWeight: 600,
                        color: '#000',
                        margin: 0,
                        marginBottom: 4,
                        letterSpacing: '-0.02em'
                    }}
                >
                    {personalInfo.fullName}
                </h1>
                <p
                    style={{
                        fontSize: fs.jobTitle,
                        color: subText,
                        fontWeight: 400,
                        marginBottom: 16
                    }}
                >
                    {personalInfo.jobTitle}
                </p>

                {/* Contact - Very subtle */}
                <div style={{
                    fontSize: fs.small,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                    color: subText
                }}>
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.website && <span>{personalInfo.website}</span>}
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                </div>
            </header>

            {/* Profile - Optional, keep it brief if exists */}
            {personalInfo.summary && (
                <section style={{ marginBottom: scale < 1 ? 32 : 56 }}>
                    <h3 style={{ fontSize: fs.small, textTransform: 'uppercase', color: subText, marginBottom: 16, letterSpacing: '0.1em' }}>About</h3>
                    <p style={{ lineHeight: 1.7, fontSize: fs.body, color: mainText, maxWidth: '80%' }}>
                        {personalInfo.summary}
                    </p>
                </section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <section style={{ marginBottom: scale < 1 ? 32 : 56 }}>
                    <h3 style={{ fontSize: fs.small, textTransform: 'uppercase', color: subText, marginBottom: 24, letterSpacing: '0.1em' }}>Experience</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: scale < 1 ? 24 : 40 }}>
                        {experience.map((exp) => (
                            <div key={exp.id}>
                                <div style={{ marginBottom: 4 }}>
                                    <span style={{ fontWeight: 600, fontSize: fs.entryTitle, color: '#000' }}>{exp.title}</span>
                                    <span style={{ margin: '0 8px', color: '#e5e7eb' }}>|</span>
                                    <span style={{ fontSize: fs.body, color: '#000' }}>{exp.company}</span>
                                </div>
                                <div style={{ fontSize: fs.small, color: subText, marginBottom: 12 }}>
                                    {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                                </div>
                                <p style={{ fontSize: fs.body, lineHeight: 1.7, color: mainText }}>
                                    {exp.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {education.length > 0 && (
                <section style={{ marginBottom: scale < 1 ? 32 : 56 }}>
                    <h3 style={{ fontSize: fs.small, textTransform: 'uppercase', color: subText, marginBottom: 24, letterSpacing: '0.1em' }}>Education</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {education.map((edu) => (
                            <div key={edu.id}>
                                <div style={{ fontWeight: 600, fontSize: fs.entryTitle, color: '#000', marginBottom: 2 }}>{edu.degree}</div>
                                <div style={{ fontSize: fs.body, color: mainText }}>{edu.school}, {edu.city}</div>
                                <div style={{ fontSize: fs.small, color: subText, marginTop: 2 }}>{edu.startDate} — {edu.endDate || 'Present'}</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {skills.length > 0 && (
                <section>
                    <h3 style={{ fontSize: fs.small, textTransform: 'uppercase', color: subText, marginBottom: 16, letterSpacing: '0.1em' }}>Skills</h3>
                    <p style={{ lineHeight: 1.8, fontSize: fs.body, color: mainText }}>
                        {skills.map(skill => skill.name).join(', ')}
                    </p>
                </section>
            )}
        </div>
    );
}

// Meta
export const classicMinimalistMeta: TemplateMeta = {
    id: 'classic-minimalist',
    name: 'Classic Minimalist',
    category: 'classic',
    thumbnail: '/templates/classic-minimalist.jpg',
    description: 'Ultra-clean layout with generous whitespace',
};

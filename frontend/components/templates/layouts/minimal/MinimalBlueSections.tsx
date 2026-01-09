'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';

/**
 * Minimal Blue Sections Template
 * Reference: minimal-blue-sections.jpg
 * 
 * Layout:
 * - Single Column Main Body.
 * - Header: Name left, Blue background strip for section headers? 
 *   Actually per name "Blue Sections", likely sections have blue headers or backgrounds.
 *   Specs say: "Section headers have blue background strip".
 * - Typography: Clean Sans.
 */
export default function MinimalBlueSections({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Roboto');
    const bodyFont = getFontFamily(fonts?.body || 'Open Sans');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes
    const fs = getScaledFontSizes(sizeConfig, scale);

    // Colors
    const mainText = '#1f2937';
    const accentColor = customThemeColor || '#3b82f6'; // Blue 500
    const sectionBg = '#eff6ff'; // Very light blue for full band if needed, or just header bg. Let's do header bg.

    return (
        <div
            className="w-full h-full"
            style={{
                fontFamily: bodyFont,
                fontSize: sizeConfig.base,
                backgroundColor: '#FFFFFF',
                color: mainText,
                padding: scale < 1 ? '32px' : '56px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Header */}
            <header style={{ marginBottom: scale < 1 ? 32 : 56, borderBottom: `2px solid ${accentColor}`, paddingBottom: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                        <h1
                            style={{
                                fontFamily: headingFont,
                                fontSize: fs.name,
                                fontWeight: 700,
                                color: '#000',
                                textTransform: 'uppercase',
                                margin: 0,
                                marginBottom: 4,
                            }}
                        >
                            {personalInfo.fullName}
                        </h1>
                        <p
                            style={{
                                fontSize: fs.jobTitle,
                                color: accentColor,
                                fontWeight: 600,
                                margin: 0
                            }}
                        >
                            {personalInfo.jobTitle}
                        </p>
                    </div>
                    {/* Contact - Compact Right */}
                    <div style={{
                        fontSize: fs.small,
                        textAlign: 'right',
                        color: '#4b5563',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}>
                        {personalInfo.email && <span>{personalInfo.email}</span>}
                        {personalInfo.phone && <span>{personalInfo.phone}</span>}
                        {personalInfo.location && <span>{personalInfo.location}</span>}
                    </div>
                </div>
            </header>

            {/* Profile */}
            {personalInfo.summary && (
                <section style={{ marginBottom: scale < 1 ? 24 : 40 }}>
                    <SectionHeader title="Profile" bg={accentColor} fs={fs} headingFont={headingFont} />
                    <p style={{ lineHeight: 1.6, fontSize: fs.body, color: '#374151', paddingLeft: 8 }}>
                        {personalInfo.summary}
                    </p>
                </section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <section style={{ marginBottom: scale < 1 ? 24 : 40 }}>
                    <SectionHeader title="Experience" bg={accentColor} fs={fs} headingFont={headingFont} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: scale < 1 ? 20 : 32, paddingLeft: 8 }}>
                        {experience.map((exp) => (
                            <div key={exp.id}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#000' }}>{exp.title}</h4>
                                    <span style={{ fontSize: fs.small, color: '#4b5563' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                                </div>
                                <div style={{ fontSize: fs.small, color: accentColor, fontWeight: 600, marginBottom: 4 }}>
                                    {exp.company}, {exp.city}
                                </div>
                                <p style={{ fontSize: fs.body, lineHeight: 1.6, color: '#374151' }}>
                                    {exp.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Two Column for Ed/Skills */}
            <div style={{ display: 'flex', gap: 32 }}>
                {education.length > 0 && (
                    <div style={{ flex: 1 }}>
                        <SectionHeader title="Education" bg={accentColor} fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingLeft: 8 }}>
                            {education.map((edu) => (
                                <div key={edu.id}>
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#000' }}>{edu.degree}</h4>
                                    <div style={{ fontSize: fs.body, color: '#4b5563' }}>{edu.school}, {edu.city}</div>
                                    <div style={{ fontSize: fs.small, color: '#6b7280' }}>{edu.startDate} – {edu.endDate || 'Present'}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {skills.length > 0 && (
                    <div style={{ flex: 1 }}>
                        <SectionHeader title="Skills" bg={accentColor} fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, paddingLeft: 8 }}>
                            {skills.map((skill) => (
                                <span key={skill.id} style={{
                                    fontSize: fs.small,
                                    color: '#000',
                                    backgroundColor: '#f3f4f6',
                                    padding: '4px 8px',
                                    borderRadius: 4
                                }}>
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// Helper
function SectionHeader({ title, bg, fs, headingFont }: { title: string, bg: string, fs: ScaledFontSizes, headingFont: string }) {
    return (
        <h3
            style={{
                fontFamily: headingFont,
                fontSize: fs.sectionHeading,
                fontWeight: 700,
                color: '#fff',
                textTransform: 'uppercase',
                backgroundColor: bg,
                padding: '4px 12px',
                marginBottom: 16,
                letterSpacing: '0.05em',
                borderRadius: 2
            }}
        >
            {title}
        </h3>
    );
}

// Meta
export const minimalBlueSectionsMeta: TemplateMeta = {
    id: 'minimal-blue-sections',
    name: 'Minimal Blue Sections',
    category: 'minimal',
    thumbnail: '/templates/minimal-blue-sections.jpg',
    description: 'Clean layout with distinct colored section headers',
};

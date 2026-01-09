'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';

/**
 * Classic Accent Bars Template
 * Reference: classic-accent-bars.jpg
 * 
 * Layout:
 * - Single Column, Centered Header.
 * - Header: Name left/center, thick colored bar above/below.
 * - Sections: Separated by thin lines.
 * - Color: Navy Blue/Gold accents.
 */
export default function ClassicAccentBars({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Merriweather');
    const bodyFont = getFontFamily(fonts?.body || 'Open Sans');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes
    const fs = getScaledFontSizes(sizeConfig, scale);

    // Colors
    const mainText = '#333333';
    const accentColor = customThemeColor || '#1e3a8a'; // Navy Blue
    const secondaryColor = '#d97706'; // Gold/Amber accent

    return (
        <div
            className="w-full h-full"
            style={{
                fontFamily: bodyFont,
                fontSize: sizeConfig.base,
                backgroundColor: '#FFFFFF',
                color: mainText,
                padding: scale < 1 ? '32px' : '64px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Header */}
            <header style={{ marginBottom: scale < 1 ? 32 : 56, textAlign: 'center' }}>
                <div style={{ width: '60px', height: '6px', backgroundColor: secondaryColor, margin: '0 auto 24px auto' }}></div>
                <h1
                    style={{
                        fontFamily: headingFont,
                        fontSize: fs.name,
                        fontWeight: 700,
                        color: accentColor,
                        textTransform: 'uppercase',
                        margin: 0,
                        marginBottom: 12,
                        letterSpacing: '0.05em'
                    }}
                >
                    {personalInfo.fullName}
                </h1>
                <p
                    style={{
                        fontSize: fs.jobTitle,
                        color: '#555',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        marginBottom: 24
                    }}
                >
                    {personalInfo.jobTitle}
                </p>

                {/* Contact Line */}
                <div style={{
                    fontSize: fs.small,
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: '16px',
                    color: '#666',
                    borderTop: '1px solid #e5e7eb',
                    borderBottom: '1px solid #e5e7eb',
                    padding: '12px 0'
                }}>
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                    {personalInfo.website && <span>{personalInfo.website}</span>}
                </div>
            </header>

            {/* Profile */}
            {personalInfo.summary && (
                <section style={{ marginBottom: scale < 1 ? 24 : 40 }}>
                    <SectionHeader title="Professional Profile" color={accentColor} fs={fs} headingFont={headingFont} />
                    <p style={{ lineHeight: 1.6, fontSize: fs.body, color: '#444', textAlign: 'justify' }}>
                        {personalInfo.summary}
                    </p>
                </section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <section style={{ marginBottom: scale < 1 ? 24 : 40 }}>
                    <SectionHeader title="Experience" color={accentColor} fs={fs} headingFont={headingFont} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: scale < 1 ? 20 : 32 }}>
                        {experience.map((exp) => (
                            <div key={exp.id}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, alignItems: 'baseline' }}>
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#000' }}>{exp.title}</h4>
                                    <span style={{ fontSize: fs.small, color: '#666', fontStyle: 'italic' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                                </div>
                                <div style={{ fontSize: fs.body, color: accentColor, fontWeight: 600, marginBottom: 8 }}>
                                    {exp.company}, {exp.city}
                                </div>
                                <p style={{ fontSize: fs.body, lineHeight: 1.6, color: '#444' }}>
                                    {exp.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Two Column Section for Education & Skills */}
            <div style={{ display: 'flex', gap: scale < 1 ? 24 : 48 }}>
                {/* Education */}
                {education.length > 0 && (
                    <div style={{ flex: 1 }}>
                        <SectionHeader title="Education" color={accentColor} fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {education.map((edu) => (
                                <div key={edu.id}>
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#000' }}>{edu.degree}</h4>
                                    <div style={{ fontSize: fs.body, color: '#444' }}>{edu.school}, {edu.city}</div>
                                    <div style={{ fontSize: fs.small, color: '#666' }}>{edu.startDate} – {edu.endDate || 'Present'}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Skills */}
                {skills.length > 0 && (
                    <div style={{ flex: 1 }}>
                        <SectionHeader title="Core Skills" color={accentColor} fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px' }}>
                            {skills.map((skill) => (
                                <div key={skill.id} style={{ fontSize: fs.body, color: '#444', display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <span style={{ color: secondaryColor, fontSize: '0.8em' }}>■</span>
                                    {skill.name}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// Helper
function SectionHeader({ title, color, fs, headingFont }: { title: string, color: string, fs: ScaledFontSizes, headingFont: string }) {
    return (
        <h3
            style={{
                fontFamily: headingFont,
                fontSize: fs.sectionHeading,
                fontWeight: 700,
                color: color,
                textTransform: 'uppercase',
                borderBottom: `2px solid ${color}`,
                paddingBottom: 8,
                marginBottom: 16,
                letterSpacing: '0.05em'
            }}
        >
            {title}
        </h3>
    );
}

// Meta
export const classicAccentBarsMeta: TemplateMeta = {
    id: 'classic-accent-bars',
    name: 'Classic Accent Bars',
    category: 'classic',
    thumbnail: '/templates/classic-accent-bars.jpg',
    description: 'Traditional layout with elegant color accents',
};

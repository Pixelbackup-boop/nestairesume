'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';

/**
 * Classic Green Template
 * Reference: classic-green.jpg
 * 
 * Layout:
 * - Single Column, Top-Aligned.
 * - Header: Name left, thick green bar at very top.
 * - Sections: Green headings.
 */
export default function ClassicGreen({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Roboto Slab');
    const bodyFont = getFontFamily(fonts?.body || 'Roboto');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes
    const fs = getScaledFontSizes(sizeConfig, scale);

    // Colors
    const mainText = '#333333';
    const accentColor = customThemeColor || '#15803d'; // Green 600

    return (
        <div
            className="w-full h-full"
            style={{
                fontFamily: bodyFont,
                fontSize: sizeConfig.base,
                backgroundColor: '#FFFFFF',
                color: mainText,
                padding: scale < 1 ? '32px' : '64px', // Reduced top padding handled by border
                paddingTop: 0,
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                borderTop: `20px solid ${accentColor}`
            }}
        >
            {/* Header */}
            <header style={{ marginTop: scale < 1 ? 32 : 56, marginBottom: scale < 1 ? 32 : 56 }}>
                <h1
                    style={{
                        fontFamily: headingFont,
                        fontSize: fs.name,
                        fontWeight: 700,
                        color: '#000',
                        textTransform: 'uppercase',
                        margin: 0,
                        marginBottom: 4,
                        letterSpacing: '0.05em'
                    }}
                >
                    {personalInfo.fullName}
                </h1>
                <p
                    style={{
                        fontSize: fs.jobTitle,
                        color: accentColor,
                        textTransform: 'uppercase',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        marginBottom: 16
                    }}
                >
                    {personalInfo.jobTitle}
                </p>

                {/* Contact - Line separated */}
                <div style={{
                    fontSize: fs.small,
                    display: 'flex',
                    gap: '24px',
                    color: '#555',
                    fontWeight: 500
                }}>
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                    {personalInfo.website && <span>{personalInfo.website}</span>}
                </div>
            </header>

            {/* Content Container - Two Column Grid for Skills maybe, or just flow? Spec says Single Column mostly but maybe 2-col skills */}
            {/* Profile */}
            {personalInfo.summary && (
                <section style={{ marginBottom: scale < 1 ? 24 : 40 }}>
                    <SectionHeader title="Profile" color={accentColor} fs={fs} headingFont={headingFont} />
                    <p style={{ lineHeight: 1.6, fontSize: fs.body, color: '#333' }}>
                        {personalInfo.summary}
                    </p>
                </section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <section style={{ marginBottom: scale < 1 ? 24 : 40 }}>
                    <SectionHeader title="Employment History" color={accentColor} fs={fs} headingFont={headingFont} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: scale < 1 ? 20 : 32 }}>
                        {experience.map((exp) => (
                            <div key={exp.id}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2, alignItems: 'center' }}>
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#000' }}>{exp.title}</h4>
                                    <span style={{ fontSize: fs.small, color: '#000', fontWeight: 600 }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                                </div>
                                <div style={{ fontSize: fs.body, color: accentColor, fontWeight: 500, marginBottom: 8 }}>
                                    {exp.company}, {exp.city}
                                </div>
                                <p style={{ fontSize: fs.body, lineHeight: 1.6, color: '#333' }}>
                                    {exp.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {education.length > 0 && (
                <section style={{ marginBottom: scale < 1 ? 24 : 40 }}>
                    <SectionHeader title="Education" color={accentColor} fs={fs} headingFont={headingFont} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {education.map((edu) => (
                            <div key={edu.id}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#000' }}>{edu.degree}</h4>
                                    <span style={{ fontSize: fs.small, color: '#000', fontWeight: 600 }}>{edu.endDate || 'Present'}</span>
                                </div>
                                <div style={{ fontSize: fs.body, color: '#555' }}>{edu.school}, {edu.city}</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {skills.length > 0 && (
                <section>
                    <SectionHeader title="Skills" color={accentColor} fs={fs} headingFont={headingFont} />
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px' }}>
                        {skills.map((skill) => (
                            <span key={skill.id} data-paginate="item" style={{ fontSize: fs.body, color: '#333', fontWeight: 500, border: '1px solid #e5e7eb', padding: '4px 8px', borderRadius: 4 }}>
                                {skill.name}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {/* Languages */}
            {languages && languages.length > 0 && (
                <section style={{ marginTop: scale < 1 ? 24 : 40 }}>
                    <SectionHeader title="Languages" color={accentColor} fs={fs} headingFont={headingFont} />
                    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                        {languages.map((lang) => (
                            <div key={lang.id} data-paginate="item" style={{ fontSize: fs.body, color: '#333' }}>
                                <strong>{lang.name}</strong> <span style={{ color: '#666' }}>- {lang.proficiency}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Strengths */}
            {data.strengths && data.strengths.length > 0 && (
                <section style={{ marginTop: scale < 1 ? 24 : 40 }}>
                    <SectionHeader title="Strengths" color={accentColor} fs={fs} headingFont={headingFont} />
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {data.strengths.map((str) => (
                            <span key={str.id} style={{
                                fontSize: fs.body,
                                color: '#15803d',
                                fontWeight: 600,
                                backgroundColor: '#f0fdf4',
                                padding: '4px 8px',
                                borderRadius: 4
                            }}>
                                {str.name}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {/* Interests */}
            {data.interests && data.interests.length > 0 && (
                <section style={{ marginTop: scale < 1 ? 24 : 40 }}>
                    <SectionHeader title="Interests" color={accentColor} fs={fs} headingFont={headingFont} />
                    <div style={{ fontSize: fs.body, color: '#333' }}>
                        {data.interests.map(int => int.name).join(' • ')}
                    </div>
                </section>
            )}
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
                borderBottom: `1px solid #e5e7eb`,
                paddingBottom: 8,
                marginBottom: 16,
            }}
        >
            {title}
        </h3>
    );
}

// Meta
export const classicGreenMeta: TemplateMeta = {
    id: 'classic-green',
    name: 'Classic Green',
    category: 'classic',
    thumbnail: '/templates/classic-green.jpg',
    description: 'Clean professional layout with strong top accent',
};

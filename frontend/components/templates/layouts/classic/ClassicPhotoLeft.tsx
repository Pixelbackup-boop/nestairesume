'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';

/**
 * Classic Photo Left Template
 * Reference: classic-photo-left.webp
 * 
 * Layout:
 * - Header: Large Photo Left, Name/Details Right.
 * - Body: Standard Two-Column or Single. Let's do Single for Classic simplicity.
 * - Style: Gray/Neutral professional.
 */
export default function ClassicPhotoLeft({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Montserrat');
    const bodyFont = getFontFamily(fonts?.body || 'Open Sans');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes
    const fs = getScaledFontSizes(sizeConfig, scale);

    // Colors
    const mainText = '#1f2937';
    const accentColor = customThemeColor || '#4b5563'; // Gray 600

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
            <header style={{
                display: 'flex',
                gap: scale < 1 ? 24 : 40,
                marginBottom: scale < 1 ? 40 : 64,
                alignItems: 'center'
            }}>
                {/* Photo Left */}
                <div style={{ flexShrink: 0 }}>
                    {personalInfo.profileImage ? (
                        <img
                            src={personalInfo.profileImage}
                            alt={personalInfo.fullName}
                            style={{
                                width: scale < 1 ? 100 : 140,
                                height: scale < 1 ? 100 : 140,
                                borderRadius: '4px', // Slight rounded, not circle
                                objectFit: 'cover',
                            }}
                        />
                    ) : (
                        <div
                            style={{
                                width: scale < 1 ? 100 : 140,
                                height: scale < 1 ? 100 : 140,
                                borderRadius: '4px',
                                backgroundColor: '#f3f4f6',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: fs.name,
                                color: '#d1d5db',
                            }}
                        >
                            <span style={{ fontSize: '2em' }}>👤</span>
                        </div>
                    )}
                </div>

                {/* Info Right */}
                <div style={{ flex: 1 }}>
                    <h1
                        style={{
                            fontFamily: headingFont,
                            fontSize: fs.name,
                            fontWeight: 700,
                            color: '#111827',
                            margin: 0,
                            marginBottom: 4,
                            lineHeight: 1.1
                        }}
                    >
                        {personalInfo.fullName}
                    </h1>
                    <p
                        style={{
                            fontSize: fs.jobTitle,
                            color: accentColor,
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            marginBottom: 16
                        }}
                    >
                        {personalInfo.jobTitle}
                    </p>

                    {/* Contact */}
                    <div style={{
                        fontSize: fs.small,
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px 24px',
                        color: '#4b5563',
                        fontWeight: 500
                    }}>
                        {personalInfo.phone && <span>{personalInfo.phone}</span>}
                        {personalInfo.email && <span>{personalInfo.email}</span>}
                        {personalInfo.location && <span>{personalInfo.location}</span>}
                        {personalInfo.website && <span>{personalInfo.website}</span>}
                    </div>
                </div>
            </header>

            {/* Profile */}
            {personalInfo.summary && (
                <section style={{ marginBottom: scale < 1 ? 32 : 56 }}>
                    <SectionHeader title="About" color={accentColor} fs={fs} headingFont={headingFont} />
                    <p style={{ lineHeight: 1.6, fontSize: fs.body, color: '#374151', paddingLeft: 12, borderLeft: `2px solid ${accentColor}` }}>
                        {personalInfo.summary}
                    </p>
                </section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <section style={{ marginBottom: scale < 1 ? 32 : 56 }}>
                    <SectionHeader title="Work History" color={accentColor} fs={fs} headingFont={headingFont} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: scale < 1 ? 24 : 40 }}>
                        {experience.map((exp) => (
                            <div key={exp.id}>
                                <div style={{ marginBottom: 4 }}>
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#111827', display: 'inline', marginRight: 8 }}>{exp.title}</h4>
                                    <span style={{ fontSize: fs.small, color: '#6b7280' }}>| {exp.company}</span>
                                </div>
                                <div style={{ fontSize: fs.small, textTransform: 'uppercase', color: accentColor, marginBottom: 8, fontWeight: 600 }}>
                                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                                </div>
                                <p style={{ fontSize: fs.body, lineHeight: 1.6, color: '#374151' }}>
                                    {exp.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Two Cols for Ed/Skills */}
            <div style={{ display: 'flex', gap: scale < 1 ? 24 : 48 }}>
                {education.length > 0 && (
                    <div style={{ flex: 1 }}>
                        <SectionHeader title="Education" color={accentColor} fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {education.map((edu) => (
                                <div key={edu.id}>
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#111827' }}>{edu.degree}</h4>
                                    <div style={{ fontSize: fs.body, color: '#4b5563' }}>{edu.school}</div>
                                    <div style={{ fontSize: fs.small, color: '#6b7280' }}>{edu.startDate} – {edu.endDate || 'Present'}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {skills.length > 0 && (
                    <div style={{ flex: 1 }}>
                        <SectionHeader title="Expertise" color={accentColor} fs={fs} headingFont={headingFont} />
                        <ul style={{ margin: 0, paddingLeft: 16, fontSize: fs.body, color: '#374151', lineHeight: 2 }}>
                            {skills.map(skill => (
                                <li key={skill.id}>{skill.name}</li>
                            ))}
                        </ul>
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
                fontWeight: 800,
                color: '#111827',
                textTransform: 'uppercase',
                marginBottom: 20,
            }}
        >
            {title}
        </h3>
    );
}

// Meta
export const classicPhotoLeftMeta: TemplateMeta = {
    id: 'classic-photo-left',
    name: 'Classic Photo Left',
    category: 'classic',
    thumbnail: '/templates/classic-photo-left.webp',
    description: 'Header focused layout with prominent photo',
};

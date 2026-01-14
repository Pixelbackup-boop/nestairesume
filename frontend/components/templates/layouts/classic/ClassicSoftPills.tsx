'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';

/**
 * Classic Soft Pills Template
 * Reference: classic-soft-pills.webp
 * 
 * Layout:
 * - Standard Layout.
 * - Special: Skills and/or Section Headers use "Pill" background styling (rounded corners, soft bg).
 * - Accent: Light Blue/Blue-Gray.
 */
export default function ClassicSoftPills({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Nunito'); // Rounded fonts fit well
    const bodyFont = getFontFamily(fonts?.body || 'Nunito');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes
    const fs = getScaledFontSizes(sizeConfig, scale);

    // Colors
    const mainText = '#1f2937';
    const accentColor = customThemeColor || '#3b82f6'; // Blue 500
    const pillBg = '#eff6ff'; // Blue 50

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
            <header style={{ marginBottom: scale < 1 ? 40 : 64, textAlign: 'center' }}>
                <h1
                    style={{
                        fontFamily: headingFont,
                        fontSize: fs.name,
                        fontWeight: 800,
                        color: accentColor,
                        margin: 0,
                        marginBottom: 4,
                    }}
                >
                    {personalInfo.fullName}
                </h1>
                <p
                    style={{
                        fontSize: fs.jobTitle,
                        color: '#4b5563',
                        fontWeight: 600,
                        marginBottom: 16
                    }}
                >
                    {personalInfo.jobTitle}
                </p>

                {/* Contact Pills */}
                <div style={{
                    fontSize: fs.small,
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: '12px',
                    color: '#4b5563',
                    fontWeight: 500
                }}>
                    {personalInfo.email && <span style={{ backgroundColor: '#f3f4f6', padding: '4px 12px', borderRadius: 999 }}>{personalInfo.email}</span>}
                    {personalInfo.phone && <span style={{ backgroundColor: '#f3f4f6', padding: '4px 12px', borderRadius: 999 }}>{personalInfo.phone}</span>}
                    {personalInfo.location && <span style={{ backgroundColor: '#f3f4f6', padding: '4px 12px', borderRadius: 999 }}>{personalInfo.location}</span>}
                </div>
            </header>

            {/* Profile */}
            {personalInfo.summary && (
                <section style={{ marginBottom: scale < 1 ? 32 : 56 }}>
                    <SectionHeader title="Profile" color={accentColor} pillBg={pillBg} fs={fs} headingFont={headingFont} />
                    <p style={{ lineHeight: 1.6, fontSize: fs.body, color: '#374151' }}>
                        {personalInfo.summary}
                    </p>
                </section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <section style={{ marginBottom: scale < 1 ? 32 : 56 }}>
                    <SectionHeader title="Experience" color={accentColor} pillBg={pillBg} fs={fs} headingFont={headingFont} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: scale < 1 ? 24 : 40 }}>
                        {experience.map((exp) => (
                            <div key={exp.id}>
                                <div style={{ marginBottom: 4 }}>
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#111827' }}>{exp.title}</h4>
                                    <div style={{ fontSize: fs.small, color: accentColor, fontWeight: 700 }}>{exp.company}</div>
                                </div>
                                <div style={{ fontSize: fs.small, color: '#6b7280', marginBottom: 8 }}>
                                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate} | {exp.city}
                                </div>
                                <p style={{ fontSize: fs.body, lineHeight: 1.6, color: '#374151' }}>
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
                    <SectionHeader title="Education" color={accentColor} pillBg={pillBg} fs={fs} headingFont={headingFont} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {education.map((edu) => (
                            <div key={edu.id}>
                                <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#111827' }}>{edu.degree}</h4>
                                <div style={{ fontSize: fs.body, color: '#4b5563' }}>{edu.school}</div>
                                <div style={{ fontSize: fs.small, color: '#6b7280' }}>{edu.startDate} – {edu.endDate || 'Present'}</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {skills.length > 0 && (
                <section>
                    <SectionHeader title="Skills" color={accentColor} pillBg={pillBg} fs={fs} headingFont={headingFont} />
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                        {skills.map((skill) => (
                            <span
                                key={skill.id}
                                data-paginate="item"
                                style={{
                                    backgroundColor: pillBg,
                                    color: accentColor,
                                    padding: '6px 16px',
                                    borderRadius: 999,
                                    fontSize: fs.body,
                                    fontWeight: 600,
                                    border: `1px solid ${accentColor}20`
                                }}
                            >
                                {skill.name}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {/* Languages */}
            {languages && languages.length > 0 && (
                <section style={{ marginBottom: scale < 1 ? 32 : 56 }}>
                    <SectionHeader title="Languages" color={accentColor} pillBg={pillBg} fs={fs} headingFont={headingFont} />
                    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                        {languages.map((lang) => (
                            <div key={lang.id} data-paginate="item" style={{ fontSize: fs.body, color: '#374151', display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span style={{ fontWeight: 700 }}>{lang.name}</span>
                                <span style={{ fontSize: fs.small, backgroundColor: '#f3f4f6', padding: '2px 8px', borderRadius: 12 }}>{lang.proficiency}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Strengths */}
            {data.strengths && data.strengths.length > 0 && (
                <section style={{ marginBottom: scale < 1 ? 32 : 56 }}>
                    <SectionHeader title="Strengths" color={accentColor} pillBg={pillBg} fs={fs} headingFont={headingFont} />
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                        {data.strengths.map((str) => (
                            <span key={str.id} style={{
                                backgroundColor: pillBg,
                                color: accentColor,
                                padding: '6px 16px',
                                borderRadius: 999,
                                fontSize: fs.body,
                                fontWeight: 600,
                                border: `1px solid ${accentColor}20`
                            }}>
                                {str.name}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {/* Interests */}
            {data.interests && data.interests.length > 0 && (
                <section>
                    <SectionHeader title="Interests" color={accentColor} pillBg={pillBg} fs={fs} headingFont={headingFont} />
                    <p style={{ lineHeight: 1.6, fontSize: fs.body, color: '#374151' }}>
                        {data.interests.map(int => int.name).join(' • ')}
                    </p>
                </section>
            )}
        </div>
    );
}

// Helper
function SectionHeader({ title, color, pillBg, fs, headingFont }: { title: string, color: string, pillBg: string, fs: ScaledFontSizes, headingFont: string }) {
    return (
        <h3
            style={{
                fontFamily: headingFont,
                fontSize: fs.sectionHeading,
                fontWeight: 800,
                color: color,
                textTransform: 'uppercase',
                marginBottom: 20,
                display: 'inline-block',
                borderBottom: `3px solid ${pillBg}`
            }}
        >
            {title}
        </h3>
    );
}

// Meta
export const classicSoftPillsMeta: TemplateMeta = {
    id: 'classic-soft-pills',
    name: 'Classic Soft Pills',
    category: 'classic',
    thumbnail: '/templates/classic-soft-pills.webp',
    description: 'Friendly layout with soft rounded elements',
};

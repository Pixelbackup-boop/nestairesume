'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';

/**
 * Classic Modern Template
 * Reference: classic-modern.jpg
 * 
 * Layout:
 * - Single Column, Centered Header.
 * - Header: Name big, centered. Small photo optional (specs usually say no photo for classic, 
 *   but let's check spec. classic_specifications.md usually implies no photo for classic unless specified.
 *   Let's assume text-only header for Classic Modern to distinguish from Header templates).
 * - Sections: Bold Uppercase borders.
 */
export default function ClassicModern({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Roboto');
    const bodyFont = getFontFamily(fonts?.body || 'Roboto');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes
    const fs = getScaledFontSizes(sizeConfig, scale);

    // Colors
    const mainText = '#1f2937';
    const accentColor = customThemeColor || '#2563eb'; // Royal Blue

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
            <header style={{ marginBottom: scale < 1 ? 32 : 48, textAlign: 'center', borderBottom: `4px solid ${accentColor}`, paddingBottom: 24 }}>
                <h1
                    style={{
                        fontFamily: headingFont,
                        fontSize: fs.name,
                        fontWeight: 900,
                        color: '#000',
                        textTransform: 'uppercase',
                        margin: 0,
                        marginBottom: 8,
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
                        fontWeight: 700,
                        letterSpacing: '0.15em',
                        marginBottom: 16
                    }}
                >
                    {personalInfo.jobTitle}
                </p>

                {/* Contact */}
                <div style={{
                    fontSize: fs.small,
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '24px',
                    color: '#4b5563',
                    fontWeight: 500
                }}>
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                </div>
            </header>

            {/* Profile */}
            {personalInfo.summary && (
                <section style={{ marginBottom: scale < 1 ? 24 : 40 }}>
                    <SectionHeader title="About" color={accentColor} fs={fs} headingFont={headingFont} />
                    <p style={{ lineHeight: 1.6, fontSize: fs.body, color: '#374151' }}>
                        {personalInfo.summary}
                    </p>
                </section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <section style={{ marginBottom: scale < 1 ? 24 : 40 }}>
                    <SectionHeader title="Professional Experience" color={accentColor} fs={fs} headingFont={headingFont} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: scale < 1 ? 20 : 32 }}>
                        {experience.map((exp) => (
                            <div key={exp.id}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2, alignItems: 'center' }}>
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#000' }}>{exp.title}</h4>
                                    <span style={{ fontSize: fs.small, color: accentColor, fontWeight: 700 }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                                </div>
                                <div style={{ fontSize: fs.body, color: '#4b5563', fontWeight: 500, marginBottom: 8 }}>
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

            {/* Education */}
            {education.length > 0 && (
                <section style={{ marginBottom: scale < 1 ? 24 : 40 }}>
                    <SectionHeader title="Education" color={accentColor} fs={fs} headingFont={headingFont} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {education.map((edu) => (
                            <div key={edu.id}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#000' }}>{edu.degree}</h4>
                                    <span style={{ fontSize: fs.small, color: '#4b5563' }}>{edu.endDate || 'Present'}</span>
                                </div>
                                <div style={{ fontSize: fs.body, color: '#4b5563' }}>{edu.school}, {edu.city}</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills - Grid */}
            {skills.length > 0 && (
                <section>
                    <SectionHeader title="Technical Skills" color={accentColor} fs={fs} headingFont={headingFont} />
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                        {skills.map((skill) => (
                            <div key={skill.id} style={{
                                fontSize: fs.body,
                                color: '#000',
                                fontWeight: 500,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 6
                            }}>
                                <div style={{ width: 6, height: 6, backgroundColor: accentColor, borderRadius: '50%' }}></div>
                                {skill.name}
                            </div>
                        ))}
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
                fontWeight: 800,
                color: '#000',
                textTransform: 'uppercase',
                borderLeft: `5px solid ${color}`,
                paddingLeft: 12,
                marginBottom: 20,
                lineHeight: 1
            }}
        >
            {title}
        </h3>
    );
}

// Meta
export const classicModernMeta: TemplateMeta = {
    id: 'classic-modern',
    name: 'Classic Modern',
    category: 'classic',
    thumbnail: '/templates/classic-modern.jpg',
    description: 'Modern take on classic resume with bold headers',
};

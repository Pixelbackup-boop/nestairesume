'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';

/**
 * Minimal Centered Template
 * Reference: minimal-centered.jpg
 * 
 * Layout:
 * - Centered Layout for entire document likely.
 * - Header: Centered.
 * - Titles: Centered.
 * - Content: Centered (or just headers centered, content justified/left). Usually content is left-aligned for readability, headers centered.
 */
export default function MinimalCentered({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Montserrat');
    const bodyFont = getFontFamily(fonts?.body || 'Work Sans');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes
    const fs = getScaledFontSizes(sizeConfig, scale);

    // Colors
    const mainText = '#1f2937';
    const accentColor = customThemeColor || '#000000'; // Black minimal

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
                alignItems: 'center' // Center everything container-wise
            }}
        >
            {/* Header Centered */}
            <header style={{ marginBottom: scale < 1 ? 40 : 64, textAlign: 'center', width: '100%', maxWidth: '80%' }}>
                <h1
                    style={{
                        fontFamily: headingFont,
                        fontSize: fs.name,
                        fontWeight: 300,
                        color: '#000',
                        textTransform: 'uppercase',
                        margin: 0,
                        marginBottom: 8,
                        letterSpacing: '0.2em'
                    }}
                >
                    {personalInfo.fullName}
                </h1>
                <p
                    style={{
                        fontSize: fs.jobTitle,
                        color: '#6b7280',
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        marginBottom: 16
                    }}
                >
                    {personalInfo.jobTitle}
                </p>

                {/* Contact Divider Line style */}
                <div style={{
                    fontSize: fs.small,
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: '16px',
                    color: '#6b7280',
                    borderTop: '1px solid #e5e7eb',
                    paddingTop: 16
                }}>
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                    {personalInfo.website && <span>{personalInfo.website}</span>}
                </div>
            </header>

            {/* Content Container - Limited width for optimal line length in centered layout */}
            <div style={{ width: '100%' }}>

                {/* Profile */}
                {personalInfo.summary && (
                    <section style={{ marginBottom: scale < 1 ? 32 : 56, textAlign: 'center' }}>
                        <SectionHeader title="Profile" fs={fs} headingFont={headingFont} />
                        <p style={{ lineHeight: 1.8, fontSize: fs.body, color: '#374151' }}>
                            {personalInfo.summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <section style={{ marginBottom: scale < 1 ? 32 : 56 }}>
                        <SectionHeader title="Work Experience" fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: scale < 1 ? 24 : 40 }}>
                            {experience.map((exp) => (
                                <div key={exp.id}>
                                    {/* Centered Entry Header */}
                                    <div style={{ textAlign: 'center', marginBottom: 8 }}>
                                        <h4 style={{ fontWeight: 600, fontSize: fs.entryTitle, color: '#000', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{exp.title}</h4>
                                        <div style={{ fontSize: fs.body, color: '#4b5563', fontStyle: 'italic' }}>{exp.company} | {exp.startDate} – {exp.current ? 'Present' : exp.endDate}</div>
                                    </div>
                                    <p style={{ fontSize: fs.body, lineHeight: 1.6, color: '#374151', textAlign: 'justify', textAlignLast: 'center' }}>
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <section style={{ marginBottom: scale < 1 ? 32 : 56, textAlign: 'center' }}>
                        <SectionHeader title="Education" fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {education.map((edu) => (
                                <div key={edu.id}>
                                    <h4 style={{ fontWeight: 600, fontSize: fs.entryTitle, color: '#000' }}>{edu.degree}</h4>
                                    <div style={{ fontSize: fs.body, color: '#4b5563' }}>{edu.school}, {edu.city}</div>
                                    <div style={{ fontSize: fs.small, color: '#9ca3af' }}>{edu.startDate} – {edu.endDate || 'Present'}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {skills.length > 0 && (
                    <section style={{ textAlign: 'center' }}>
                        <SectionHeader title="Expertise" fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 16 }}>
                            {skills.map((skill) => (
                                <span key={skill.id} style={{ fontSize: fs.body, color: '#374151', borderBottom: '1px solid #e5e7eb' }}>
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}

// Helper
function SectionHeader({ title, fs, headingFont }: { title: string, fs: ScaledFontSizes, headingFont: string }) {
    return (
        <h3
            style={{
                fontFamily: headingFont,
                fontSize: fs.small,
                fontWeight: 600,
                color: '#9ca3af',
                textTransform: 'uppercase',
                marginBottom: 24,
                textAlign: 'center',
                letterSpacing: '0.2em'
            }}
        >
            {title}
        </h3>
    );
}

// Meta
export const minimalCenteredMeta: TemplateMeta = {
    id: 'minimal-centered',
    name: 'Minimal Centered',
    category: 'minimal',
    thumbnail: '/templates/minimal-centered.jpg',
    description: 'Elegant centered typography for a refined look',
};

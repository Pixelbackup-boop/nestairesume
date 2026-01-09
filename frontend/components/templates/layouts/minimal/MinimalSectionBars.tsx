'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';

/**
 * Minimal Section Bars Template
 * Reference: minimal-section-bars.jpg
 * 
 * Layout:
 * - Single Column.
 * - Headers: Followed by a long thin horizontal line that spans width (or partial).
 * - Style: Crisp, architectural.
 */
export default function MinimalSectionBars({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Roboto');
    const bodyFont = getFontFamily(fonts?.body || 'Roboto');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes
    const fs = getScaledFontSizes(sizeConfig, scale);

    // Colors
    const mainText = '#1f2937';
    const accentColor = customThemeColor || '#000000'; // Black bars

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
            <header style={{ marginBottom: scale < 1 ? 40 : 64 }}>
                <h1
                    style={{
                        fontFamily: headingFont,
                        fontSize: fs.name,
                        fontWeight: 300,
                        color: '#000',
                        textTransform: 'uppercase',
                        margin: 0,
                        marginBottom: 8,
                        letterSpacing: '0.1em'
                    }}
                >
                    {personalInfo.fullName}
                </h1>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p
                        style={{
                            fontSize: fs.jobTitle,
                            color: '#4b5563',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                        }}
                    >
                        {personalInfo.jobTitle}
                    </p>
                    {/* Contact - Right aligned on same line if fits, or separate */}
                    <div style={{
                        fontSize: fs.small,
                        display: 'flex',
                        gap: '16px',
                        color: '#4b5563',
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
                    <SectionHeader title="Profile" color={accentColor} fs={fs} headingFont={headingFont} />
                    <p style={{ lineHeight: 1.6, fontSize: fs.body, color: '#374151' }}>
                        {personalInfo.summary}
                    </p>
                </section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <section style={{ marginBottom: scale < 1 ? 24 : 40 }}>
                    <SectionHeader title="Experience" color={accentColor} fs={fs} headingFont={headingFont} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: scale < 1 ? 24 : 32 }}>
                        {experience.map((exp) => (
                            <div key={exp.id}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#000' }}>{exp.title}</h4>
                                    <span style={{ fontSize: fs.small, color: '#4b5563' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                                </div>
                                <div style={{ fontSize: fs.body, color: '#4b5563', marginBottom: 8, fontStyle: 'italic' }}>
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
                                    <span style={{ fontSize: fs.small, color: '#4b5563' }}>{edu.startDate} – {edu.endDate || 'Present'}</span>
                                </div>
                                <div style={{ fontSize: fs.body, color: '#374151' }}>{edu.school}, {edu.city}</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {skills.length > 0 && (
                <section>
                    <SectionHeader title="Skills" color={accentColor} fs={fs} headingFont={headingFont} />
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                        {skills.map((skill) => (
                            <span key={skill.id} style={{ fontSize: fs.body, color: '#374151', paddingBottom: 2, borderBottom: '1px solid #e5e7eb' }}>
                                {skill.name}
                            </span>
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
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
            <h3
                style={{
                    fontFamily: headingFont,
                    fontSize: fs.sectionHeading,
                    fontWeight: 700,
                    color: '#000',
                    textTransform: 'uppercase',
                    margin: 0,
                    marginRight: 16,
                    flexShrink: 0
                }}
            >
                {title}
            </h3>
            <div style={{ flex: 1, height: 2, backgroundColor: '#000' }}></div>
        </div>
    );
}

// Meta
export const minimalSectionBarsMeta: TemplateMeta = {
    id: 'minimal-section-bars',
    name: 'Minimal Section Bars',
    category: 'minimal',
    thumbnail: '/templates/minimal-section-bars.jpg',
    description: 'Structured layout with geometric section dividers',
};

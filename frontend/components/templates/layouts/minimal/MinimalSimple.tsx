'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';

/**
 * Minimal Simple Template
 * Reference: minimal-simple.jpg
 * 
 * Layout:
 * - Extremely Basic. 
 * - Name big.
 * - Standard flow.
 * - No decorative elements besides line breaks.
 */
export default function MinimalSimple({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Helvetica');
    const bodyFont = getFontFamily(fonts?.body || 'Helvetica');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes
    const fs = getScaledFontSizes(sizeConfig, scale);

    return (
        <div
            className="w-full h-full"
            style={{
                fontFamily: bodyFont,
                fontSize: sizeConfig.base,
                backgroundColor: '#FFFFFF',
                color: '#222',
                padding: scale < 1 ? '32px' : '64px', // Standard generous margin
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Header */}
            <header style={{ marginBottom: scale < 1 ? 32 : 56 }}>
                <h1
                    style={{
                        fontFamily: headingFont,
                        fontSize: fs.name,
                        fontWeight: 700,
                        color: '#000',
                        margin: 0,
                        marginBottom: 4,
                        letterSpacing: '-0.03em'
                    }}
                >
                    {personalInfo.fullName}
                </h1>
                <p
                    style={{
                        fontSize: fs.jobTitle,
                        color: '#555',
                        fontWeight: 400,
                        marginBottom: 8
                    }}
                >
                    {personalInfo.jobTitle}
                </p>
                <div style={{ fontSize: fs.small, color: '#555' }}>
                    {[personalInfo.email, personalInfo.phone, personalInfo.location]
                        .filter(Boolean)
                        .join('  •  ')
                    }
                </div>
            </header>

            {/* Body - Clean blocks */}
            {personalInfo.summary && (
                <section style={{ marginBottom: 32 }}>
                    <p style={{ lineHeight: 1.6, fontSize: fs.body, color: '#222' }}>
                        {personalInfo.summary}
                    </p>
                </section>
            )}

            {experience.length > 0 && (
                <section style={{ marginBottom: 32 }}>
                    <h3 style={{ fontSize: fs.sectionHeading, fontWeight: 700, borderBottom: '1px solid #ccc', paddingBottom: 4, marginBottom: 16 }}>Experience</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                        {experience.map((exp) => (
                            <div key={exp.id}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle }}>{exp.title}</h4>
                                    <span style={{ fontSize: fs.small, color: '#555' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                                </div>
                                <div style={{ fontSize: fs.body, marginBottom: 8 }}>{exp.company}, {exp.city}</div>
                                <p style={{ fontSize: fs.body, lineHeight: 1.6, color: '#444' }}>
                                    {exp.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {education.length > 0 && (
                <section style={{ marginBottom: 32 }}>
                    <h3 style={{ fontSize: fs.sectionHeading, fontWeight: 700, borderBottom: '1px solid #ccc', paddingBottom: 4, marginBottom: 16 }}>Education</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {education.map((edu) => (
                            <div key={edu.id}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle }}>{edu.degree}</h4>
                                    <span style={{ fontSize: fs.small, color: '#555' }}>{edu.startDate} – {edu.endDate || 'Present'}</span>
                                </div>
                                <div style={{ fontSize: fs.body }}>{edu.school}, {edu.city}</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {skills.length > 0 && (
                <section>
                    <h3 style={{ fontSize: fs.sectionHeading, fontWeight: 700, borderBottom: '1px solid #ccc', paddingBottom: 4, marginBottom: 16 }}>Skills</h3>
                    <p style={{ lineHeight: 1.6, fontSize: fs.body }}>
                        {skills.map(skill => skill.name).join(', ')}
                    </p>
                </section>
            )}
        </div>
    );
}

// Meta
export const minimalSimpleMeta: TemplateMeta = {
    id: 'minimal-simple',
    name: 'Minimal Simple',
    category: 'minimal',
    thumbnail: '/templates/minimal-simple.jpg',
    description: 'The essence of a resume, unadorned',
};

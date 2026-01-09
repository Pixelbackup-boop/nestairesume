'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';

/**
 * Minimal Underline Template
 * Reference: minimal-underline.jpg
 * 
 * Layout:
 * - Single Column.
 * - Headers: Clean black underlining.
 * - Simple and effective.
 */
export default function MinimalUnderline({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Times New Roman'); // Serif headers work well here too
    const bodyFont = getFontFamily(fonts?.body || 'Arial');
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
                color: '#111',
                padding: scale < 1 ? '32px' : '64px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Header */}
            <header style={{ marginBottom: scale < 1 ? 40 : 64, borderBottom: '1px solid #000', paddingBottom: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h1
                        style={{
                            fontFamily: headingFont,
                            fontSize: fs.name,
                            fontWeight: 700,
                            color: '#000',
                            margin: 0,
                            lineHeight: 1
                        }}
                    >
                        {personalInfo.fullName}
                    </h1>
                    <div style={{ fontSize: fs.small, color: '#333' }}>{personalInfo.location || 'City, Country'}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                    <p style={{ fontSize: fs.jobTitle, margin: 0, fontStyle: 'italic' }}>{personalInfo.jobTitle}</p>
                    <div style={{ fontSize: fs.small, color: '#333' }}>
                        {[personalInfo.email, personalInfo.phone].filter(Boolean).join(' | ')}
                    </div>
                </div>
            </header>

            {/* Profile */}
            {personalInfo.summary && (
                <section style={{ marginBottom: 32 }}>
                    <SectionHeader title="Profile" fs={fs} headingFont={headingFont} />
                    <p style={{ lineHeight: 1.6, fontSize: fs.body }}>{personalInfo.summary}</p>
                </section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <section style={{ marginBottom: 32 }}>
                    <SectionHeader title="Professional Experience" fs={fs} headingFont={headingFont} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                        {experience.map((exp) => (
                            <div key={exp.id}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#000' }}>{exp.title}</h4>
                                    <span style={{ fontSize: fs.small }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                                </div>
                                <div style={{ fontSize: fs.body, marginBottom: 8, fontStyle: 'italic' }}>{exp.company}</div>
                                <p style={{ fontSize: fs.body, lineHeight: 1.6 }}>{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {education.length > 0 && (
                <section style={{ marginBottom: 32 }}>
                    <SectionHeader title="Education" fs={fs} headingFont={headingFont} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {education.map((edu) => (
                            <div key={edu.id}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle }}>{edu.degree}</h4>
                                    <span style={{ fontSize: fs.small }}>{edu.startDate} – {edu.endDate || 'Present'}</span>
                                </div>
                                <div style={{ fontSize: fs.body, fontStyle: 'italic' }}>{edu.school}, {edu.city}</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
            {/* Skills */}
            {skills.length > 0 && (
                <section>
                    <SectionHeader title="Technical Skills" fs={fs} headingFont={headingFont} />
                    <p style={{ lineHeight: 1.6, fontSize: fs.body }}>
                        {skills.map(skill => skill.name).join(', ')}
                    </p>
                </section>
            )}

        </div>
    );
}

// Helper
function SectionHeader({ title, fs, headingFont }: { title: string, fs: ScaledFontSizes, headingFont: string }) {
    return (
        <h3
            style={{
                fontFamily: headingFont,
                fontSize: fs.sectionHeading,
                fontWeight: 700,
                color: '#000',
                textTransform: 'uppercase',
                borderBottom: '1px solid #000',
                paddingBottom: 4,
                marginBottom: 16
            }}
        >
            {title}
        </h3>
    );
}

// Meta
export const minimalUnderlineMeta: TemplateMeta = {
    id: 'minimal-underline',
    name: 'Minimal Underline',
    category: 'minimal',
    thumbnail: '/templates/minimal-underline.jpg',
    description: 'Sparse but structured with clear underlining',
};

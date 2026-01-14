'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';

/**
 * Classic Labels Left Template
 * Reference: classic-labels-left.webp
 * 
 * Layout:
 * - "Left Rail" Labels format.
 * - Dates and secondary info in left margin (20-25%).
 * - Content in main right area.
 * - Clean, grid-like feel.
 */
export default function ClassicLabelsLeft({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Lato');
    const bodyFont = getFontFamily(fonts?.body || 'Lato');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes
    const fs = getScaledFontSizes(sizeConfig, scale);

    // Colors
    const mainText = '#333333';
    const labelColor = '#6b7280'; // Gray for left labels
    const accentColor = customThemeColor || '#333333'; // Minimal black usually

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
            <header style={{ marginLeft: '25%', marginBottom: scale < 1 ? 32 : 56 }}>
                <h1
                    style={{
                        fontFamily: headingFont,
                        fontSize: fs.name,
                        fontWeight: 300,
                        color: '#000',
                        textTransform: 'uppercase',
                        margin: 0,
                        marginBottom: 4,
                        letterSpacing: '0.1em'
                    }}
                >
                    {personalInfo.fullName}
                </h1>
                <p
                    style={{
                        fontSize: fs.jobTitle,
                        color: '#000',
                        fontWeight: 700,
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
                    gap: '16px',
                    color: labelColor,
                    flexWrap: 'wrap'
                }}>
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                </div>
            </header>

            {/* Profile */}
            {personalInfo.summary && (
                <Section
                    title="Profile"
                    fs={fs}
                    headingFont={headingFont}
                    content={
                        <p style={{ lineHeight: 1.6, fontSize: fs.body, color: '#333', marginTop: 0 }}>
                            {personalInfo.summary}
                        </p>
                    }
                />
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <Section
                    title="Experience"
                    fs={fs}
                    headingFont={headingFont}
                    content={
                        <div style={{ display: 'flex', flexDirection: 'column', gap: scale < 1 ? 20 : 32 }}>
                            {experience.map((exp) => (
                                <div key={exp.id} style={{ display: 'flex' }}>
                                    {/* Left Date Column inside Content if we want to be strict, or section-wide? 
                                        The 'Classic Labels Left' usually implies the Section Title is on the left.
                                        Let's put dates on the left of each item too?
                                        Actually, let's keep Section Title on far left rail, and Dates on left mini-rail of item?
                                        Let's stick to Section Title Left Rail, Main Content Right.
                                        And put dates in the Item content header.
                                    */}
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                                            <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#000' }}>{exp.title}</h4>
                                        </div>
                                        <div style={{ fontSize: fs.small, color: '#000', fontWeight: 600, marginBottom: 8 }}>
                                            {exp.company} | {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                                        </div>
                                        <p style={{ fontSize: fs.body, lineHeight: 1.6, color: '#444' }}>
                                            {exp.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                />
            )}

            {/* Education */}
            {education.length > 0 && (
                <Section
                    title="Education"
                    fs={fs}
                    headingFont={headingFont}
                    content={
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {education.map((edu) => (
                                <div key={edu.id}>
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#000' }}>{edu.degree}</h4>
                                    <div style={{ fontSize: fs.body, color: '#444' }}>{edu.school}, {edu.city}</div>
                                    <div style={{ fontSize: fs.small, color: labelColor }}>{edu.startDate} – {edu.endDate || 'Present'}</div>
                                </div>
                            ))}
                        </div>
                    }
                />
            )}

            {/* Skills */}
            {skills.length > 0 && (
                <Section
                    title="Skills"
                    fs={fs}
                    headingFont={headingFont}
                    content={
                        <p style={{ lineHeight: 1.8, fontSize: fs.body, color: '#333' }}>
                            {skills.map(skill => skill.name).join(' • ')}
                        </p>
                    }
                />
            )}

            {/* Languages */}
            {languages && languages.length > 0 && (
                <Section
                    title="Languages"
                    fs={fs}
                    headingFont={headingFont}
                    content={
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {languages.map((lang) => (
                                <div key={lang.id} data-paginate="item" style={{ fontSize: fs.body, color: '#333' }}>
                                    <span style={{ fontWeight: 700 }}>{lang.name}</span>: {lang.proficiency}
                                </div>
                            ))}
                        </div>
                    }
                />
            )}

            {/* Strengths */}
            {data.strengths && data.strengths.length > 0 && (
                <Section
                    title="Strengths"
                    fs={fs}
                    headingFont={headingFont}
                    content={
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                            {data.strengths.map((str) => (
                                <span key={str.id} style={{
                                    fontSize: fs.small,
                                    color: '#fff',
                                    backgroundColor: labelColor,
                                    padding: '4px 10px',
                                    borderRadius: 12,
                                    fontWeight: 600
                                }}>
                                    {str.name}
                                </span>
                            ))}
                        </div>
                    }
                />
            )}

            {/* Interests */}
            {data.interests && data.interests.length > 0 && (
                <Section
                    title="Interests"
                    fs={fs}
                    headingFont={headingFont}
                    content={
                        <p style={{ lineHeight: 1.8, fontSize: fs.body, color: '#333' }}>
                            {data.interests.map(int => int.name).join(', ')}
                        </p>
                    }
                />
            )}
        </div>
    );
}

// Helper Component for Left Label Layout
function Section({ title, content, fs, headingFont }: { title: string, content: React.ReactNode, fs: ScaledFontSizes, headingFont: string }) {
    return (
        <section style={{ display: 'flex', marginBottom: 32 }}>
            <div style={{ width: '25%', paddingRight: 24, flexShrink: 0 }}>
                <h3 style={{
                    fontFamily: headingFont,
                    fontSize: fs.sectionHeading,
                    fontWeight: 700,
                    color: '#000',
                    textTransform: 'uppercase',
                    margin: 0,
                    textAlign: 'right', // Right align against the content line
                    letterSpacing: '0.05em'
                }}>
                    {title}
                </h3>
            </div>
            <div style={{ flex: 1, borderLeft: '1px solid #e5e7eb', paddingLeft: 24 }}>
                {content}
            </div>
        </section>
    );
}

// Meta
export const classicLabelsLeftMeta: TemplateMeta = {
    id: 'classic-labels-left',
    name: 'Classic Labels Left',
    category: 'classic',
    thumbnail: '/templates/classic-labels-left.webp',
    description: 'Distinct left-rail layout for clear sectioning',
};

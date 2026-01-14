'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';
import ProgressBar from '../../shared/ProgressBar';

/**
 * Classic Strength Bars Template
 * Reference: classic-strength-bars.webp
 * 
 * Layout:
 * - Two Column Layout.
 * - Right Column: Dedicated to Skills with prominent bars.
 * - Accent: Red or Bold Red.
 */
export default function ClassicStrengthBars({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Roboto Condensed');
    const bodyFont = getFontFamily(fonts?.body || 'Roboto');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes
    const fs = getScaledFontSizes(sizeConfig, scale);

    // Colors
    const mainText = '#1f2937';
    const accentColor = customThemeColor || '#dc2626'; // Red 600
    const lightGray = '#f3f4f6';

    return (
        <div
            className="w-full h-full"
            style={{
                fontFamily: bodyFont,
                fontSize: sizeConfig.base,
                backgroundColor: '#FFFFFF',
                color: mainText,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Header - Full Width */}
            <header style={{
                padding: scale < 1 ? '32px' : '56px',
                backgroundColor: '#1f2937',
                color: '#fff',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div>
                    <h1
                        style={{
                            fontFamily: headingFont,
                            fontSize: fs.name,
                            fontWeight: 700,
                            color: '#fff',
                            textTransform: 'uppercase',
                            margin: 0,
                            marginBottom: 4,
                            lineHeight: 1
                        }}
                    >
                        {personalInfo.fullName}
                    </h1>
                    <p
                        style={{
                            fontSize: fs.jobTitle,
                            color: accentColor, // Red accent title
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em'
                        }}
                    >
                        {personalInfo.jobTitle}
                    </p>
                </div>

                <div style={{
                    fontSize: fs.small,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: 6,
                    color: '#e5e7eb',
                }}>
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                </div>
            </header>

            {/* Main Body - 2 Columns */}
            <div style={{ flex: 1, display: 'flex' }}>
                {/* Main Content (Left, 65%) */}
                <div style={{ flex: '65%', padding: scale < 1 ? '32px' : '56px' }}>
                    {/* Profile */}
                    {personalInfo.summary && (
                        <section style={{ marginBottom: scale < 1 ? 32 : 48 }}>
                            <SectionHeader title="Summary" color={accentColor} fs={fs} headingFont={headingFont} />
                            <p style={{ lineHeight: 1.6, fontSize: fs.body, color: '#374151' }}>
                                {personalInfo.summary}
                            </p>
                        </section>
                    )}

                    {/* Experience */}
                    {experience.length > 0 && (
                        <section style={{ marginBottom: scale < 1 ? 32 : 48 }}>
                            <SectionHeader title="Experience" color={accentColor} fs={fs} headingFont={headingFont} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: scale < 1 ? 24 : 40 }}>
                                {experience.map((exp) => (
                                    <div key={exp.id}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                                            <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#111827' }}>{exp.title}</h4>
                                            <span style={{ fontSize: fs.small, color: '#6b7280' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                                        </div>
                                        <div style={{ fontSize: fs.body, color: accentColor, fontWeight: 700, marginBottom: 8, textTransform: 'uppercase' }}>
                                            {exp.company}
                                        </div>
                                        <p style={{ fontSize: fs.body, lineHeight: 1.6, color: '#374151' }}>
                                            {exp.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar (Right, 35%) with slightly gray bg? */}
                <div style={{ flex: '35%', backgroundColor: '#f9fafb', padding: scale < 1 ? '32px' : '56px', borderLeft: '1px solid #e5e7eb' }}>
                    {/* Skills - Bars */}
                    {skills.length > 0 && (
                        <section style={{ marginBottom: scale < 1 ? 32 : 48 }}>
                            <SectionHeader title="Expertise" color={accentColor} fs={fs} headingFont={headingFont} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                {skills.map((skill) => (
                                    <div key={skill.id} data-paginate="item">
                                        <div style={{ fontSize: fs.body, color: '#111827', fontWeight: 600, marginBottom: 6 }}>{skill.name}</div>
                                        <ProgressBar
                                            value={skill.level * 20}
                                            color={accentColor}
                                            trackColor="#e5e7eb"
                                            height={8}
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {education.length > 0 && (
                        <section>
                            <SectionHeader title="Education" color={accentColor} fs={fs} headingFont={headingFont} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                {education.map((edu) => (
                                    <div key={edu.id}>
                                        <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#111827' }}>{edu.degree}</h4>
                                        <div style={{ fontSize: fs.body, color: '#4b5563' }}>{edu.school}, {edu.city}</div>
                                        <div style={{ fontSize: fs.small, color: '#6b7280' }}>{edu.startDate} – {edu.endDate || 'Present'}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
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
                color: '#111827',
                textTransform: 'uppercase',
                marginBottom: 20,
                borderBottom: `2px solid ${color}`,
                paddingBottom: 4
            }}
        >
            {title}
        </h3>
    );
}

// Meta
export const classicStrengthBarsMeta: TemplateMeta = {
    id: 'classic-strength-bars',
    name: 'Classic Strength Bars',
    category: 'classic',
    thumbnail: '/templates/classic-strength-bars.webp',
    description: 'Impactful layout highlighting skills with style',
};

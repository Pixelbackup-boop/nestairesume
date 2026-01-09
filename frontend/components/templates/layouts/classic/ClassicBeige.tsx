'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';

/**
 * Classic Beige Template
 * Reference: classic-beige.jpg
 * 
 * Layout:
 * - Single Column.
 * - Background: Light Beige/Cream (#fbf7f1).
 * - Style: Serif typography, very traditional/academic.
 * - Borders: Double lines.
 */
export default function ClassicBeige({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Times New Roman');
    const bodyFont = getFontFamily(fonts?.body || 'Georgia');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes
    const fs = getScaledFontSizes(sizeConfig, scale);

    // Colors
    const bg = '#fefcf8'; // Very light cream
    const boxBg = '#f5f5f0'; // Slightly darker beige area
    const mainText = '#292524'; // Warm Black
    const accentColor = customThemeColor || '#57534e'; // Stone 600

    return (
        <div
            className="w-full h-full"
            style={{
                fontFamily: bodyFont,
                fontSize: sizeConfig.base,
                backgroundColor: bg,
                color: mainText,
                padding: scale < 1 ? '32px' : '56px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                border: scale < 1 ? 'none' : '1px solid #e7e5e4', // Subtle page border
            }}
        >
            {/* Header Box */}
            <header
                style={{
                    backgroundColor: boxBg,
                    padding: scale < 1 ? '24px' : '40px',
                    textAlign: 'center',
                    marginBottom: scale < 1 ? 32 : 48,
                    borderBottom: `1px double ${accentColor}`,
                    borderTop: `1px double ${accentColor}`,
                }}
            >
                <h1
                    style={{
                        fontFamily: headingFont,
                        fontSize: fs.name, // Make it big
                        fontWeight: 400, // Regular weight for serif elegance
                        color: '#000',
                        textTransform: 'uppercase',
                        margin: 0,
                        marginBottom: 12,
                        letterSpacing: '0.1em'
                    }}
                >
                    {personalInfo.fullName}
                </h1>
                <p
                    style={{
                        fontSize: fs.jobTitle,
                        color: accentColor,
                        fontStyle: 'italic',
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
                    gap: '16px',
                    color: '#444',
                    fontFamily: headingFont
                }}>
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                </div>
            </header>

            {/* Content */}
            <div style={{ padding: '0 16px' }}>
                {/* Profile */}
                {personalInfo.summary && (
                    <section style={{ marginBottom: scale < 1 ? 24 : 40 }}>
                        <SectionHeader title="Profile" color={accentColor} fs={fs} headingFont={headingFont} />
                        <p style={{ lineHeight: 1.8, fontSize: fs.body, color: '#333' }}>
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
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                        <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, fontFamily: headingFont, color: '#000' }}>{exp.title}</h4>
                                        <span style={{ fontSize: fs.small, color: '#555', fontFamily: headingFont }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                                    </div>
                                    <div style={{ fontSize: fs.body, color: accentColor, fontStyle: 'italic', marginBottom: 8 }}>
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
                                        <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, fontFamily: headingFont, color: '#000' }}>{edu.degree}</h4>
                                        <span style={{ fontSize: fs.small, color: '#555', fontFamily: headingFont }}>{edu.startDate} – {edu.endDate || 'Present'}</span>
                                    </div>
                                    <div style={{ fontSize: fs.body, color: '#333' }}>{edu.school}, {edu.city}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills - Simple List */}
                {skills.length > 0 && (
                    <section>
                        <SectionHeader title="Skills" color={accentColor} fs={fs} headingFont={headingFont} />
                        <p style={{ lineHeight: 1.8, fontSize: fs.body, color: '#333' }}>
                            {skills.map(skill => skill.name).join(' • ')}
                        </p>
                    </section>
                )}
            </div>
        </div>
    );
}

// Helper
function SectionHeader({ title, color, fs, headingFont }: { title: string, color: string, fs: ScaledFontSizes, headingFont: string }) {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 16,
            borderBottom: `1px solid #d6d3d1`,
            paddingBottom: 4
        }}>
            <h3
                style={{
                    fontFamily: headingFont,
                    fontSize: fs.sectionHeading,
                    fontWeight: 700,
                    color: '#000',
                    textTransform: 'uppercase',
                    marginRight: 16,
                    letterSpacing: '0.05em'
                }}
            >
                {title}
            </h3>
        </div>
    );
}

// Meta
export const classicBeigeMeta: TemplateMeta = {
    id: 'classic-beige',
    name: 'Classic Beige',
    category: 'classic',
    thumbnail: '/templates/classic-beige.jpg',
    description: 'Timeless layout on a cream background',
};

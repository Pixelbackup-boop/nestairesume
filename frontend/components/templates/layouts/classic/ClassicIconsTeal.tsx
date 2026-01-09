'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';

/**
 * Classic Icons Teal Template
 * Reference: classic-icons-teal.webp
 * 
 * Layout:
 * - Two Column Body.
 * - Header: Name and Title centered or left.
 * - Icons: Prominent Teal icons for sections and contact.
 * - Accent: Teal 600 (#0d9488).
 */
export default function ClassicIconsTeal({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Roboto');
    const bodyFont = getFontFamily(fonts?.body || 'Open Sans');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes
    const fs = getScaledFontSizes(sizeConfig, scale);

    // Colors
    const mainText = '#333333';
    const accentColor = customThemeColor || '#0d9488'; // Teal 600

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
            <header style={{ marginBottom: scale < 1 ? 32 : 56, display: 'flex', alignItems: 'center', gap: 24, paddingBottom: 24, borderBottom: `2px solid ${accentColor}` }}>
                {/* Photo optional - Spec didn't emphasize, but classic usually checks check personalInfo.profileImage */}
                {personalInfo.profileImage && (
                    <img
                        src={personalInfo.profileImage}
                        alt={personalInfo.fullName}
                        style={{
                            width: scale < 1 ? 80 : 120,
                            height: scale < 1 ? 80 : 120,
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: `3px solid ${accentColor}`
                        }}
                    />
                )}

                <div style={{ flex: 1 }}>
                    <h1
                        style={{
                            fontFamily: headingFont,
                            fontSize: fs.name,
                            fontWeight: 700,
                            color: '#1f2937',
                            textTransform: 'uppercase',
                            margin: 0,
                            marginBottom: 8,
                        }}
                    >
                        {personalInfo.fullName}
                    </h1>
                    <p
                        style={{
                            fontSize: fs.jobTitle,
                            color: accentColor,
                            fontWeight: 600,
                            marginBottom: 12,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em'
                        }}
                    >
                        {personalInfo.jobTitle}
                    </p>

                    {/* Contact Grid */}
                    <div style={{
                        fontSize: fs.small,
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '12px 24px',
                        color: '#4b5563',
                    }}>
                        {personalInfo.phone && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <span style={{ color: accentColor }}>📞</span> {personalInfo.phone}
                            </div>
                        )}
                        {personalInfo.email && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <span style={{ color: accentColor }}>✉️</span> {personalInfo.email}
                            </div>
                        )}
                        {personalInfo.location && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <span style={{ color: accentColor }}>📍</span> {personalInfo.location}
                            </div>
                        )}
                        {personalInfo.website && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <span style={{ color: accentColor }}>🌐</span> {personalInfo.website}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <div style={{ display: 'flex', gap: scale < 1 ? 24 : 48 }}>
                {/* Left Column (Main Content) */}
                <div style={{ flex: 2 }}>
                    {/* Profile */}
                    {personalInfo.summary && (
                        <section style={{ marginBottom: scale < 1 ? 24 : 40 }}>
                            <SectionHeader title="Profile" icon="👤" color={accentColor} fs={fs} headingFont={headingFont} />
                            <p style={{ lineHeight: 1.6, fontSize: fs.body, color: '#374151' }}>
                                {personalInfo.summary}
                            </p>
                        </section>
                    )}

                    {/* Experience */}
                    {experience.length > 0 && (
                        <section style={{ marginBottom: scale < 1 ? 24 : 40 }}>
                            <SectionHeader title="Experience" icon="💼" color={accentColor} fs={fs} headingFont={headingFont} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: scale < 1 ? 20 : 32 }}>
                                {experience.map((exp) => (
                                    <div key={exp.id}>
                                        <div style={{ marginBottom: 4 }}>
                                            <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#111827', display: 'inline', marginRight: 8 }}>{exp.title}</h4>
                                            <span style={{ fontSize: fs.small, color: accentColor, fontWeight: 600 }}>| {exp.company}</span>
                                        </div>
                                        <div style={{ fontSize: fs.small, color: '#6b7280', marginBottom: 8, fontStyle: 'italic' }}>
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
                </div>

                {/* Right Column (Sidebar-ish) */}
                <div style={{ flex: 1 }}>
                    {/* Education */}
                    {education.length > 0 && (
                        <section style={{ marginBottom: scale < 1 ? 24 : 40 }}>
                            <SectionHeader title="Education" icon="🎓" color={accentColor} fs={fs} headingFont={headingFont} />
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
                            <SectionHeader title="Skills" icon="🛠️" color={accentColor} fs={fs} headingFont={headingFont} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {skills.map((skill) => (
                                    <div key={skill.id} style={{ fontSize: fs.body, color: '#374151', display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <div style={{ width: 6, height: 6, backgroundColor: accentColor, borderRadius: '50%' }}></div>
                                        {skill.name}
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
function SectionHeader({ title, icon, color, fs, headingFont }: { title: string, icon: string, color: string, fs: ScaledFontSizes, headingFont: string }) {
    return (
        <h3
            style={{
                fontFamily: headingFont,
                fontSize: fs.sectionHeading,
                fontWeight: 700,
                color: '#111827',
                textTransform: 'uppercase',
                marginBottom: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                borderBottom: `1px solid #e5e7eb`,
                paddingBottom: 8
            }}
        >
            <span style={{ color: color, fontSize: '1.2em' }}>{icon}</span> {title}
        </h3>
    );
}

// Meta
export const classicIconsTealMeta: TemplateMeta = {
    id: 'classic-icons-teal',
    name: 'Classic Icons Teal',
    category: 'classic',
    thumbnail: '/templates/classic-icons-teal.webp',
    description: 'Two-column layout with distinct teal iconography',
};

'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';

/**
 * Sidebar Dark Navy Compact Template
 * Reference: sidebar-dark-navy-compact.jpg
 * 
 * Layout:
 * - Sidebar: 25% width (Narrow). Navy (#0f172a).
 * - Main: 75% width. Slate 50 (#f8fafc).
 * - Compact typography and spacing for information density.
 * - Accent: Sky 400 (#38bdf8).
 */
export default function SidebarDarkNavyCompact({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Inter');
    const bodyFont = getFontFamily(fonts?.body || 'Inter'); // Inter is good for compact UI
    const sizeConfig = fontSizes[fonts?.size || 'small']; // Default to small/medium for compact

    // Get scaled font sizes
    const fs = getScaledFontSizes(sizeConfig, scale);

    // Colors
    const sidebarBg = '#0f172a'; // Slate 900
    const mainBg = '#f8fafc'; // Slate 50
    const sidebarText = '#e2e8f0'; // Slate 200
    const mainText = '#1e293b'; // Slate 800
    const accentColor = customThemeColor || '#38bdf8'; // Sky 400

    // Dimensions
    const photoSize = scale < 1 ? 60 : 90;

    return (
        <div
            className="w-full h-full"
            style={{
                fontFamily: bodyFont,
                fontSize: sizeConfig.base,
                backgroundColor: mainBg,
                color: mainText,
                display: 'flex',
                boxSizing: 'border-box'
            }}
        >
            {/* Sidebar - Compact Navy */}
            <aside
                style={{
                    width: '25%',
                    backgroundColor: sidebarBg,
                    color: sidebarText,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: scale < 1 ? '20px 12px' : '40px 24px',
                    flexShrink: 0,
                    minHeight: '100%'
                }}
            >
                {/* Photo */}
                <div style={{ marginBottom: scale < 1 ? 24 : 32, alignSelf: 'center' }}>
                    {personalInfo.profileImage ? (
                        <img
                            src={personalInfo.profileImage}
                            alt={personalInfo.fullName}
                            style={{
                                width: photoSize,
                                height: photoSize,
                                borderRadius: '50%',
                                objectFit: 'cover',
                                border: `2px solid ${accentColor}`,
                            }}
                        />
                    ) : (
                        <div
                            style={{
                                width: photoSize,
                                height: photoSize,
                                borderRadius: '50%',
                                backgroundColor: '#1e293b',
                                border: `2px solid ${accentColor}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: fs.sectionHeading,
                                color: '#94a3b8',
                            }}
                        >
                            {personalInfo.fullName?.charAt(0) || '?'}
                        </div>
                    )}
                </div>

                {/* Contact */}
                <div style={{ marginBottom: 32 }}>
                    <h5 style={{ color: accentColor, fontWeight: 700, textTransform: 'uppercase', fontSize: fs.small, marginBottom: 12, borderBottom: '1px solid #334155', paddingBottom: 4 }}>Contact</h5>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: fs.small }}>
                        {personalInfo.phone && <div style={{ display: 'flex', gap: 8 }}><span>📱</span><span>{personalInfo.phone}</span></div>}
                        {personalInfo.email && <div style={{ display: 'flex', gap: 8, wordBreak: 'break-all' }}><span>✉️</span><span>{personalInfo.email}</span></div>}
                        {personalInfo.location && <div style={{ display: 'flex', gap: 8 }}><span>📍</span><span>{personalInfo.location}</span></div>}
                        {personalInfo.website && <div style={{ display: 'flex', gap: 8, wordBreak: 'break-all' }}><span>🌐</span><span>{personalInfo.website}</span></div>}
                    </div>
                </div>

                {/* Skills */}
                {skills.length > 0 && (
                    <div style={{ marginBottom: 32 }}>
                        <h5 style={{ color: accentColor, fontWeight: 700, textTransform: 'uppercase', fontSize: fs.small, marginBottom: 12, borderBottom: '1px solid #334155', paddingBottom: 4 }}>Skills</h5>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {skills.map(skill => (
                                <span key={skill.id} style={{ backgroundColor: '#1e293b', padding: '2px 8px', borderRadius: 4, fontSize: fs.small, color: '#e2e8f0' }}>
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Languages */}
                {languages && languages.length > 0 && (
                    <div>
                        <h5 style={{ color: accentColor, fontWeight: 700, textTransform: 'uppercase', fontSize: fs.small, marginBottom: 12, borderBottom: '1px solid #334155', paddingBottom: 4 }}>Language</h5>
                        <ul style={{ paddingLeft: 16, margin: 0, fontSize: fs.small }}>
                            {languages.map(lang => (
                                <li key={lang.id} style={{ marginBottom: 4 }}>{lang.name}</li>
                            ))}
                        </ul>
                    </div>
                )}

            </aside>

            {/* Main Content */}
            <main
                style={{
                    flex: 1,
                    padding: scale < 1 ? '24px 20px' : '48px 40px',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* Header */}
                <div style={{ marginBottom: scale < 1 ? 24 : 40, borderBottom: `2px solid ${accentColor}`, paddingBottom: 16 }}>
                    <h1
                        style={{
                            fontFamily: headingFont,
                            fontSize: fs.name,
                            fontWeight: 800,
                            color: '#0f172a',
                            textTransform: 'uppercase',
                            margin: 0,
                            lineHeight: 1.1
                        }}
                    >
                        {personalInfo.fullName}
                    </h1>
                    <p
                        style={{
                            fontSize: fs.jobTitle,
                            color: accentColor,
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            marginTop: 4,
                            marginBottom: 0
                        }}
                    >
                        {personalInfo.jobTitle}
                    </p>
                </div>

                {/* Summary */}
                {personalInfo.summary && (
                    <div className="mb-6 resume-section">
                        <h3 style={{ fontSize: fs.sectionHeading, fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', marginBottom: 8 }}>Profile</h3>
                        <p style={{ fontSize: fs.body, lineHeight: 1.5, color: '#334155' }}>{personalInfo.summary}</p>
                    </div>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <div className="mb-6 resume-section">
                        <h3 style={{ fontSize: fs.sectionHeading, fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', marginBottom: 12 }}>Experience</h3>
                        <div className="space-y-5">
                            {experience.map(exp => (
                                <div key={exp.id}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                        <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#0f172a' }}>{exp.title}</h4>
                                        <span style={{ fontSize: fs.small, color: '#64748b', fontWeight: 500 }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                                    </div>
                                    <div style={{ fontSize: fs.small, color: accentColor, fontWeight: 600, marginBottom: 4 }}>{exp.company}, {exp.city}</div>
                                    <p style={{ fontSize: fs.body, lineHeight: 1.5, color: '#334155' }}>{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <div className="mb-6 resume-section">
                        <h3 style={{ fontSize: fs.sectionHeading, fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', marginBottom: 12 }}>Education</h3>
                        <div className="space-y-4">
                            {education.map(edu => (
                                <div key={edu.id}>
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#0f172a' }}>{edu.degree}</h4>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ fontSize: fs.body, color: '#475569' }}>{edu.school}, {edu.city}</span>
                                        <span style={{ fontSize: fs.small, color: '#64748b' }}>{edu.startDate} – {edu.endDate || 'Present'}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
}

// Meta
export const sidebarDarkNavyCompactMeta: TemplateMeta = {
    id: 'sidebar-dark-navy-compact',
    name: 'Dark Navy Compact',
    category: 'sidebar',
    thumbnail: '/templates/sidebar-dark-navy-compact.jpg',
    description: 'Compact space-saving template with navy sidebar',
};

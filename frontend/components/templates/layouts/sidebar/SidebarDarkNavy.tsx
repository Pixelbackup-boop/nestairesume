'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';
import ProgressBar from '../../shared/ProgressBar';

/**
 * Sidebar Dark Navy Template
 * Reference: sidebar-dark-navy.jpg
 * 
 * Layout:
 * - Sidebar: 35% width, Left. Slate 800 (#1e293b).
 * - Main: 65% width. White (#FFFFFF).
 * - Accent: Blue 400 (#60a5fa).
 * - Photo: Sidebar Top, Circle.
 * - Timeline: Vertical line in experience section.
 */
export default function SidebarDarkNavy({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Roboto Slab'); // Serif for headers as per spec hint
    const bodyFont = getFontFamily(fonts?.body || 'Open Sans');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes
    const fs = getScaledFontSizes(sizeConfig, scale);

    // Colors
    const sidebarBg = '#1e293b'; // Slate 800
    const mainBg = '#FFFFFF';
    const sidebarText = '#e2e8f0'; // Slate 200
    const mainText = '#334155'; // Slate 700
    const accentColor = customThemeColor || '#60a5fa'; // Blue 400

    // Dimensions
    const photoSize = scale < 1 ? 80 : 120;
    const sidebarWidth = '35%';

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
            {/* Sidebar */}
            <aside
                style={{
                    width: sidebarWidth,
                    backgroundColor: sidebarBg,
                    color: sidebarText,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: scale < 1 ? '32px 20px' : '64px 40px',
                    flexShrink: 0,
                    minHeight: '100%',
                    alignItems: 'center'
                }}
            >
                {/* Photo */}
                <div style={{ marginBottom: scale < 1 ? 32 : 48 }}>
                    {personalInfo.profileImage ? (
                        <img
                            src={personalInfo.profileImage}
                            alt={personalInfo.fullName}
                            style={{
                                width: photoSize,
                                height: photoSize,
                                borderRadius: '50%',
                                objectFit: 'cover',
                                border: `4px solid ${accentColor}`,
                            }}
                        />
                    ) : (
                        <div
                            style={{
                                width: photoSize,
                                height: photoSize,
                                borderRadius: '50%',
                                backgroundColor: '#0f172a',
                                border: `4px solid ${accentColor}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: fs.name,
                                color: accentColor,
                            }}
                        >
                            {personalInfo.fullName?.charAt(0) || '?'}
                        </div>
                    )}
                </div>

                {/* Contact */}
                <div style={{ width: '100%', marginBottom: 40 }}>
                    <SidebarSectionHeader title="Methods" color={accentColor} fs={fs} headingFont={headingFont} />
                    <div style={{ fontSize: fs.body, display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {personalInfo.phone && <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span>📞</span><span>{personalInfo.phone}</span></div>}
                        {personalInfo.email && <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span>✉️</span><span style={{ wordBreak: 'break-all' }}>{personalInfo.email}</span></div>}
                        {personalInfo.location && <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span>📍</span><span>{personalInfo.location}</span></div>}
                        {personalInfo.website && <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span>🌐</span><span style={{ wordBreak: 'break-all' }}>{personalInfo.website}</span></div>}
                    </div>
                </div>

                {/* Skills */}
                {skills.length > 0 && (
                    <div style={{ width: '100%', marginBottom: 40 }}>
                        <SidebarSectionHeader title="Pro Skills" color={accentColor} fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {skills.map((skill) => (
                                <div key={skill.id}>
                                    <div style={{ marginBottom: 4, fontSize: fs.body, fontWeight: 500 }}>{skill.name}</div>
                                    <ProgressBar
                                        value={skill.level * 20}
                                        color={accentColor}
                                        trackColor="#334155"
                                        height={6}
                                        scale={1}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Languages */}
                {languages && languages.length > 0 && (
                    <div style={{ width: '100%' }}>
                        <SidebarSectionHeader title="Languages" color={accentColor} fs={fs} headingFont={headingFont} />
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: fs.body, lineHeight: 1.6 }}>
                            {languages.map((lang) => (
                                <li key={lang.id}>{lang.name}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </aside>

            {/* Main Content */}
            <main
                style={{
                    flex: 1,
                    padding: scale < 1 ? '32px 24px' : '64px 48px',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* Header */}
                <div style={{ marginBottom: scale < 1 ? 40 : 60, borderBottom: `2px solid ${accentColor}`, paddingBottom: 24 }}>
                    <h1
                        style={{
                            fontFamily: headingFont,
                            fontSize: fs.name,
                            fontWeight: 700,
                            color: '#0f172a',
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
                            fontWeight: 600,
                            letterSpacing: '0.1em'
                        }}
                    >
                        {personalInfo.jobTitle}
                    </p>
                </div>

                {/* Profile */}
                {personalInfo.summary && (
                    <section className="mb-8 resume-section">
                        <h3 style={{ fontFamily: headingFont, fontSize: fs.sectionHeading, color: '#0f172a', textTransform: 'uppercase', marginBottom: 16, fontWeight: 700 }}>Profile</h3>
                        <p style={{ lineHeight: 1.6, fontSize: fs.body, color: '#334155' }}>{personalInfo.summary}</p>
                    </section>
                )}

                {/* Experience with Timeline */}
                {experience.length > 0 && (
                    <section className="mb-8 resume-section">
                        <h3 style={{ fontFamily: headingFont, fontSize: fs.sectionHeading, color: '#0f172a', textTransform: 'uppercase', marginBottom: 24, fontWeight: 700 }}>Work Experience</h3>
                        <div style={{ position: 'relative', paddingLeft: 20, borderLeft: '2px solid #e2e8f0' }}>
                            {experience.map((exp) => (
                                <div key={exp.id} style={{ position: 'relative', marginBottom: 32 }}>
                                    {/* Timeline Dot */}
                                    <div style={{ position: 'absolute', left: -25, top: 4, width: 12, height: 12, borderRadius: '50%', backgroundColor: accentColor, border: '2px solid white' }}></div>

                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#0f172a', marginBottom: 4 }}>{exp.title}</h4>
                                    <div style={{ fontSize: fs.small, color: '#64748b', fontWeight: 600, marginBottom: 8 }}>
                                        {exp.company} | {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                                    </div>
                                    <p style={{ fontSize: fs.body, lineHeight: 1.6, color: '#4b5563' }}>{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <section className="mb-8 resume-section">
                        <h3 style={{ fontFamily: headingFont, fontSize: fs.sectionHeading, color: '#0f172a', textTransform: 'uppercase', marginBottom: 16, fontWeight: 700 }}>Education</h3>
                        <div style={{ display: 'grid', gap: 16 }}>
                            {education.map((edu) => (
                                <div key={edu.id}>
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#0f172a' }}>{edu.degree}</h4>
                                    <div style={{ fontSize: fs.body, color: '#4b5563' }}>{edu.school}, {edu.city}</div>
                                    <div style={{ fontSize: fs.small, color: '#64748b' }}>{edu.startDate} – {edu.endDate || 'Present'}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

            </main>
        </div>
    );
}

// Helpers
function SidebarSectionHeader({ title, color, fs, headingFont }: { title: string, color: string, fs: ScaledFontSizes, headingFont: string }) {
    return (
        <h3
            style={{
                fontFamily: headingFont,
                fontSize: fs.sidebarHeading,
                fontWeight: 700,
                color: '#FFFFFF',
                textTransform: 'uppercase',
                marginBottom: 16,
                paddingBottom: 4,
                borderBottom: `2px solid ${color}`
            }}
        >
            {title}
        </h3>
    );
}

// Meta
export const sidebarDarkNavyMeta: TemplateMeta = {
    id: 'sidebar-dark-navy',
    name: 'Dark Navy Sidebar',
    category: 'sidebar',
    thumbnail: '/templates/sidebar-dark-navy.jpg',
    description: 'Navy sidebar with blue accents and timeline',
};

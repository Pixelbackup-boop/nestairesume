'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';

/**
 * Sidebar Dark Minimal Template
 * Reference: sidebar-dark-minimal.jpg
 * 
 * Layout:
 * - Sidebar: 30% width, Left. Gray 800 (#1f2937).
 * - Main: 70% width. White (#FFFFFF).
 * - Photo: Sidebar Top, 100px Square/Rounded.
 * - Colors: Sidebar Text White, Accent Gray 300.
 */
export default function SidebarDarkMinimal({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Inter'); // Clean sans
    const bodyFont = getFontFamily(fonts?.body || 'Roboto');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes
    const fs = getScaledFontSizes(sizeConfig, scale);

    // Colors
    const sidebarBg = '#1f2937'; // Gray 800
    const mainBg = '#FFFFFF';
    const sidebarText = '#f3f4f6'; // Gray 100
    const mainText = '#1f2937'; // Gray 800
    const accentColor = customThemeColor || '#d1d5db'; // Gray 300

    // Dimensions
    const photoSize = scale < 1 ? 70 : 100;

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
                    width: '30%',
                    backgroundColor: sidebarBg,
                    color: sidebarText,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: scale < 1 ? '24px 16px' : '48px 32px',
                    flexShrink: 0,
                    minHeight: '100%'
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
                                borderRadius: '12px', // Rounded square
                                objectFit: 'cover',
                            }}
                        />
                    ) : (
                        <div
                            style={{
                                width: photoSize,
                                height: photoSize,
                                borderRadius: '12px',
                                backgroundColor: '#374151',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: fs.name,
                                color: '#9ca3af',
                            }}
                        >
                            {personalInfo.fullName?.charAt(0) || '?'}
                        </div>
                    )}
                </div>

                {/* Contact */}
                <div style={{ marginBottom: 40, fontSize: fs.body }}>
                    <h4 style={{ textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: fs.small, color: accentColor, marginBottom: 16 }}>Contact</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {personalInfo.phone && <div>{personalInfo.phone}</div>}
                        {personalInfo.email && <div>{personalInfo.email}</div>}
                        {personalInfo.location && <div>{personalInfo.location}</div>}
                        {personalInfo.website && <div>{personalInfo.website}</div>}
                    </div>
                </div>

                {/* Skills - Minimal List */}
                {skills.length > 0 && (
                    <div style={{ marginBottom: 40 }}>
                        <h4 style={{ textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: fs.small, color: accentColor, marginBottom: 16 }}>Skills</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: fs.body }}>
                            {skills.map(skill => (
                                <div key={skill.id}>{skill.name}</div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Languages */}
                {languages && languages.length > 0 && (
                    <div>
                        <h4 style={{ textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: fs.small, color: accentColor, marginBottom: 16 }}>Languages</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: fs.body }}>
                            {languages.map(lang => (
                                <div key={lang.id}>{lang.name}</div>
                            ))}
                        </div>
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
                {/* Name Header */}
                <div style={{ marginBottom: scale < 1 ? 40 : 64 }}>
                    <h1
                        style={{
                            fontFamily: headingFont,
                            fontSize: fs.name, // 32px spec thin
                            fontWeight: 300, // Light/Thin
                            color: '#000000',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            margin: 0,
                            marginBottom: 8
                        }}
                    >
                        {personalInfo.fullName || 'Your Name'}
                    </h1>
                    <p
                        style={{
                            fontSize: fs.jobTitle,
                            color: '#6b7280',
                            textTransform: 'uppercase',
                            fontWeight: 500,
                            letterSpacing: '0.2em'
                        }}
                    >
                        {personalInfo.jobTitle || 'Job Title'}
                    </p>
                </div>

                {/* Profile */}
                {personalInfo.summary && (
                    <section className="mb-10 resume-section" data-paginate>
                        <h3 style={{ fontFamily: headingFont, fontSize: fs.sectionHeading, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 16, color: '#111827' }}>Profile</h3>
                        <p style={{ lineHeight: 1.7, fontSize: fs.body, color: '#4b5563' }}>
                            {personalInfo.summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <section className="mb-10 resume-section" data-paginate>
                        <h3 style={{ fontFamily: headingFont, fontSize: fs.sectionHeading, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 24, color: '#111827' }}>Experience</h3>
                        <div className="space-y-8">
                            {experience.map(exp => (
                                <div key={exp.id}>
                                    <h4 style={{ fontWeight: 600, fontSize: fs.entryTitle, textTransform: 'uppercase', marginBottom: 4 }}>{exp.title}</h4>
                                    <div style={{ fontSize: fs.small, color: '#6b7280', marginBottom: 8, fontStyle: 'italic' }}>
                                        {exp.company} | {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                    </div>
                                    <p style={{ fontSize: fs.body, lineHeight: 1.6, color: '#4b5563' }}>{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <section className="mb-10 resume-section" data-paginate>
                        <h3 style={{ fontFamily: headingFont, fontSize: fs.sectionHeading, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 24, color: '#111827' }}>Education</h3>
                        <div className="space-y-6">
                            {education.map(edu => (
                                <div key={edu.id}>
                                    <h4 style={{ fontWeight: 600, fontSize: fs.entryTitle, textTransform: 'uppercase', marginBottom: 4 }}>{edu.degree}</h4>
                                    <div style={{ fontSize: fs.body, color: '#4b5563', marginBottom: 2 }}>{edu.school}, {edu.city}</div>
                                    <div style={{ fontSize: fs.small, color: '#6b7280' }}>{edu.startDate} - {edu.endDate || 'Present'}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

            </main>
        </div>
    );
}

// Meta
export const sidebarDarkMinimalMeta: TemplateMeta = {
    id: 'sidebar-dark-minimal',
    name: 'Dark Minimal Sidebar',
    category: 'sidebar',
    thumbnail: '/templates/sidebar-dark-minimal.jpg',
    description: 'Clean minimal dark sidebar',
};

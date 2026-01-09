'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';
import ProgressBar from '../../shared/ProgressBar';

/**
 * Sidebar Green V2 Template
 * Reference: sidebar-green-v2.jpg
 * 
 * Layout:
 * - Sidebar: 30% width, Left. Green 700 (#166534). Lighter than V1.
 * - Main: 70% width. White (#FFFFFF).
 * - Headers: Green text.
 */
export default function SidebarGreenV2({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Montserrat');
    const bodyFont = getFontFamily(fonts?.body || 'Roboto');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes
    const fs = getScaledFontSizes(sizeConfig, scale);

    // Colors
    const sidebarBg = '#166534'; // Green 700 (Emerald-ish)
    const mainBg = '#FFFFFF';
    const sidebarText = '#f0fdf4';
    const mainText = '#1f2937';
    const accentColor = customThemeColor || '#22c55e'; // Green 500

    // Dimensions
    const photoSize = scale < 1 ? 80 : 120;
    const sidebarWidth = '30%';

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
                    padding: scale < 1 ? '32px 16px' : '56px 24px',
                    flexShrink: 0,
                    minHeight: '100%',
                }}
            >
                {/* Photo */}
                <div style={{ marginBottom: scale < 1 ? 32 : 48, alignSelf: 'center' }}>
                    {personalInfo.profileImage ? (
                        <img
                            src={personalInfo.profileImage}
                            alt={personalInfo.fullName}
                            style={{
                                width: photoSize,
                                height: photoSize,
                                borderRadius: '50%',
                                objectFit: 'cover',
                                border: `3px solid white`,
                            }}
                        />
                    ) : (
                        <div
                            style={{
                                width: photoSize,
                                height: photoSize,
                                borderRadius: '50%',
                                backgroundColor: '#14532d',
                                border: `3px solid white`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: fs.name,
                                color: '#fff',
                            }}
                        >
                            {personalInfo.fullName?.charAt(0) || '?'}
                        </div>
                    )}
                </div>

                {/* Contact */}
                <div style={{ marginBottom: 40 }}>
                    <SidebarHeader title="Contact" color="white" fs={fs} headingFont={headingFont} />
                    <div style={{ fontSize: fs.body, display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {personalInfo.phone && <div>{personalInfo.phone}</div>}
                        {personalInfo.email && <div style={{ wordBreak: 'break-all' }}>{personalInfo.email}</div>}
                        {personalInfo.location && <div>{personalInfo.location}</div>}
                    </div>
                </div>

                {/* Skills */}
                {skills.length > 0 && (
                    <div style={{ marginBottom: 40 }}>
                        <SidebarHeader title="Skills" color="white" fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {skills.map((skill) => (
                                <div key={skill.id}>
                                    <div style={{ marginBottom: 4, fontSize: fs.body }}>{skill.name}</div>
                                    <ProgressBar
                                        value={skill.level * 20}
                                        color={'#ffffff'}
                                        trackColor="#14532d"
                                        height={4}
                                        scale={1}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </aside>

            {/* Main Content */}
            <main
                style={{
                    flex: 1,
                    padding: scale < 1 ? '32px 24px' : '56px 40px',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* Header */}
                <div style={{ marginBottom: scale < 1 ? 40 : 64 }}>
                    <h1
                        style={{
                            fontFamily: headingFont,
                            fontSize: fs.name,
                            fontWeight: 800,
                            color: '#166534',
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
                            color: '#15803d',
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
                    <section className="mb-10 resume-section">
                        <MainHeader title="Profile" color={'#166534'} fs={fs} headingFont={headingFont} />
                        <p style={{ lineHeight: 1.6, fontSize: fs.body, color: '#374151' }}>
                            {personalInfo.summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <section className="mb-10 resume-section">
                        <MainHeader title="Experience" color={'#166534'} fs={fs} headingFont={headingFont} />
                        <div className="space-y-8">
                            {experience.map((exp) => (
                                <div key={exp.id}>
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#111827', marginBottom: 2 }}>
                                        {exp.title}
                                    </h4>
                                    <div style={{ fontSize: fs.small, color: '#166534', fontWeight: 600, marginBottom: 8, textTransform: 'uppercase' }}>
                                        {exp.company} | {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
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
                    <section className="mb-10 resume-section">
                        <MainHeader title="Education" color={'#166534'} fs={fs} headingFont={headingFont} />
                        <div className="space-y-4">
                            {education.map((edu) => (
                                <div key={edu.id}>
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#111827' }}>
                                        {edu.degree}
                                    </h4>
                                    <div style={{ fontSize: fs.body, color: '#4b5563' }}>
                                        {edu.school}, {edu.city}
                                    </div>
                                    <div style={{ fontSize: fs.small, color: '#6b7280' }}>
                                        {edu.startDate} – {edu.endDate || 'Present'}
                                    </div>
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
function SidebarHeader({ title, color, fs, headingFont }: { title: string, color: string, fs: ScaledFontSizes, headingFont: string }) {
    return (
        <h3
            style={{
                fontFamily: headingFont,
                fontSize: fs.sidebarHeading,
                fontWeight: 700,
                color: color,
                textTransform: 'uppercase',
                marginBottom: 16,
                letterSpacing: '0.1em'
            }}
        >
            {title}
        </h3>
    );
}

function MainHeader({ title, color, fs, headingFont }: { title: string, color: string, fs: ScaledFontSizes, headingFont: string }) {
    return (
        <h3
            style={{
                fontFamily: headingFont,
                fontSize: fs.sectionHeading,
                fontWeight: 700,
                color: color,
                textTransform: 'uppercase',
                marginBottom: 20,
                letterSpacing: '0.15em',
                borderBottom: `2px solid #e5e7eb`,
                paddingBottom: 8
            }}
        >
            {title}
        </h3>
    );
}

// Meta
export const sidebarGreenV2Meta: TemplateMeta = {
    id: 'sidebar-green-v2',
    name: 'Green Sidebar V2',
    category: 'sidebar',
    thumbnail: '/templates/sidebar-green-v2.jpg',
    description: 'Emerald green sidebar with clean modern type',
};

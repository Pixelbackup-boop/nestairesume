'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';
import ProgressBar from '../../shared/ProgressBar';

/**
 * Sidebar Yellow Template
 * Reference: sidebar-yellow.webp
 * 
 * Layout:
 * - Sidebar: 35% width, Left. Yellow 500 (#eab308).
 * - Text: Dark Gray/Black for contrast.
 * - Main: 65% width. White.
 * - Style: Bold.
 */
export default function SidebarYellow({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Roboto Black');
    const bodyFont = getFontFamily(fonts?.body || 'Roboto');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes
    const fs = getScaledFontSizes(sizeConfig, scale);

    // Colors
    const sidebarBg = '#eab308'; // Yellow 500
    const mainBg = '#FFFFFF';
    const sidebarText = '#1f2937'; // Gray 800 - High contrast on yellow
    const mainText = '#1f2937';

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
                    padding: scale < 1 ? '32px 20px' : '64px 32px',
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
                                border: `4px solid #1f2937`, // Dark border
                            }}
                        />
                    ) : (
                        <div
                            style={{
                                width: photoSize,
                                height: photoSize,
                                borderRadius: '50%',
                                backgroundColor: '#ca8a04',
                                border: `4px solid #1f2937`,
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
                    <SidebarHeader title="Contact" color="#1f2937" fs={fs} headingFont={headingFont} />
                    <div style={{ fontSize: fs.body, display: 'flex', flexDirection: 'column', gap: 12, fontWeight: 500 }}>
                        {personalInfo.phone && <div>{personalInfo.phone}</div>}
                        {personalInfo.email && <div style={{ wordBreak: 'break-all' }}>{personalInfo.email}</div>}
                        {personalInfo.location && <div>{personalInfo.location}</div>}
                        {personalInfo.website && <div style={{ wordBreak: 'break-all' }}>{personalInfo.website}</div>}
                    </div>
                </div>

                {/* Education */}
                {education.length > 0 && (
                    <div style={{ marginBottom: 40 }}>
                        <SidebarHeader title="Education" color="#1f2937" fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {education.map((edu) => (
                                <div key={edu.id}>
                                    <div style={{ fontWeight: 700, fontSize: fs.body }}>{edu.degree}</div>
                                    <div style={{ fontSize: fs.small }}>{edu.school}</div>
                                    <div style={{ fontSize: fs.small }}>{edu.startDate} – {edu.endDate || 'Present'}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Skills */}
                {skills.length > 0 && (
                    <div>
                        <SidebarHeader title="Skills" color="#1f2937" fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {skills.map((skill) => (
                                <div key={skill.id} data-paginate="item">
                                    <div style={{ marginBottom: 4, fontSize: fs.body, fontWeight: 700 }}>{skill.name}</div>
                                    <ProgressBar
                                        value={skill.level * 20}
                                        color={'#1f2937'}
                                        trackColor="rgba(0,0,0,0.1)"
                                        height={6}
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
                    padding: scale < 1 ? '32px 24px' : '64px 48px',
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
                            fontWeight: 900,
                            color: '#000',
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
                            color: '#eab308', // Yellow 500
                            textTransform: 'uppercase',
                            fontWeight: 700,
                            letterSpacing: '0.1em'
                        }}
                    >
                        {personalInfo.jobTitle}
                    </p>
                </div>

                {/* Profile */}
                {personalInfo.summary && (
                    <section className="mb-10 resume-section">
                        <MainHeader title="Profile" color={'#eab308'} fs={fs} headingFont={headingFont} />
                        <p style={{ lineHeight: 1.6, fontSize: fs.body, color: '#374151' }}>
                            {personalInfo.summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <section className="mb-10 resume-section">
                        <MainHeader title="Work History" color={'#eab308'} fs={fs} headingFont={headingFont} />
                        <div className="space-y-8">
                            {experience.map((exp) => (
                                <div key={exp.id}>
                                    <h4 style={{ fontWeight: 800, fontSize: fs.entryTitle, color: '#000', marginBottom: 2, textTransform: 'uppercase' }}>
                                        {exp.title}
                                    </h4>
                                    <div style={{ fontSize: fs.small, color: '#ca8a04', fontWeight: 600, marginBottom: 6 }}>
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

                {/* Languages (Main) */}
                {languages && languages.length > 0 && (
                    <section className="mb-10 resume-section">
                        <MainHeader title="Languages" color={'#eab308'} fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'flex', gap: 16 }}>
                            {languages.map((lang) => (
                                <span key={lang.id} style={{ fontWeight: 700, color: '#374151', fontSize: fs.body }} data-paginate="item">
                                    {lang.name}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* Strengths */}
                {data.strengths && data.strengths.length > 0 && (
                    <section className="mb-10 resume-section">
                        <MainHeader title="Strengths" color={'#eab308'} fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                            {data.strengths.map((str) => (
                                <span key={str.id} style={{
                                    backgroundColor: '#eab308',
                                    color: '#000',
                                    padding: '4px 12px',
                                    fontWeight: 700,
                                    fontSize: fs.small
                                }}>
                                    {str.name}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* Interests */}
                {data.interests && data.interests.length > 0 && (
                    <section className="mb-10 resume-section">
                        <MainHeader title="Interests" color={'#eab308'} fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'flex', gap: '12px 24px', flexWrap: 'wrap' }}>
                            {data.interests.map((int) => (
                                <span key={int.id} style={{ fontWeight: 500, color: '#374151', fontSize: fs.body }}>
                                    • {int.name}
                                </span>
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
                fontWeight: 800,
                color: color,
                textTransform: 'uppercase',
                marginBottom: 16,
                paddingBottom: 4,
                borderBottom: `3px solid ${color}`
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
                fontWeight: 800,
                color: '#000',
                textTransform: 'uppercase',
                marginBottom: 20,
            }}
        >
            <span style={{ borderBottom: `6px solid ${color}`, paddingBottom: 0 }}>{title}</span>
        </h3>
    );
}

// Meta
export const sidebarYellowMeta: TemplateMeta = {
    id: 'sidebar-yellow',
    name: 'Yellow Bold Sidebar',
    category: 'sidebar',
    thumbnail: '/templates/sidebar-yellow.webp',
    description: 'Bold yellow sidebar with high contrast text',
};

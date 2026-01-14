'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';
import ProgressBar from '../../shared/ProgressBar';

/**
 * Sidebar Green V4 Template
 * Reference: sidebar-green-v4.jpg
 * 
 * Layout:
 * - Sidebar: 30% width, Left. Emerald 500 (#10b981). Bright Green.
 * - Main: 70% width. White (#FFFFFF).
 * - Text: Likely White on Sidebar.
 */
export default function SidebarGreenV4({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Poppins');
    const bodyFont = getFontFamily(fonts?.body || 'Open Sans');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes
    const fs = getScaledFontSizes(sizeConfig, scale);

    // Colors
    const sidebarBg = '#10b981'; // Emerald 500
    const mainBg = '#FFFFFF';
    const sidebarText = '#ffffff';
    const mainText = '#1f2937';

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
                                border: `4px solid white`,
                            }}
                        />
                    ) : (
                        <div
                            style={{
                                width: photoSize,
                                height: photoSize,
                                borderRadius: '50%',
                                backgroundColor: '#059669',
                                border: `4px solid white`,
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

                {/* Skills - Bars */}
                {skills.length > 0 && (
                    <div style={{ marginBottom: 40 }}>
                        <SidebarHeader title="Skills" color="white" fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {skills.map((skill) => (
                                <div key={skill.id} data-paginate="item">
                                    <div style={{ marginBottom: 4, fontSize: fs.body, fontWeight: 500 }}>{skill.name}</div>
                                    <ProgressBar
                                        value={skill.level * 20}
                                        color={'#ffffff'}
                                        trackColor="rgba(255,255,255,0.3)"
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
                    <div style={{ marginBottom: 40 }}>
                        <SidebarHeader title="Languages" color="white" fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            {languages.map((lang) => (
                                <div key={lang.id} style={{ fontSize: fs.body }} data-paginate="item">
                                    {lang.name}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Strengths */}
                {data.strengths && data.strengths.length > 0 && (
                    <div style={{ marginBottom: 40 }}>
                        <SidebarHeader title="Strengths" color="white" fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                            {data.strengths.map((str) => (
                                <span key={str.id} style={{
                                    backgroundColor: '#059669',
                                    color: '#ffffff',
                                    padding: '4px 8px',
                                    borderRadius: 4,
                                    fontSize: fs.small
                                }}>
                                    {str.name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Interests */}
                {data.interests && data.interests.length > 0 && (
                    <div style={{ marginBottom: 40 }}>
                        <SidebarHeader title="Interests" color="white" fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            {data.interests.map((int) => (
                                <div key={int.id} style={{ fontSize: fs.body }}>
                                    • {int.name}
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
                            color: '#10b981',
                            textTransform: 'uppercase',
                            fontWeight: 600,
                            letterSpacing: '0.05em'
                        }}
                    >
                        {personalInfo.jobTitle}
                    </p>
                </div>

                {/* Profile */}
                {personalInfo.summary && (
                    <section className="mb-10 resume-section">
                        <MainHeader title="Profile" color={'#10b981'} fs={fs} headingFont={headingFont} />
                        <p style={{ lineHeight: 1.6, fontSize: fs.body, color: '#374151' }}>
                            {personalInfo.summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <section className="mb-10 resume-section">
                        <MainHeader title="Work Experience" color={'#10b981'} fs={fs} headingFont={headingFont} />
                        <div className="space-y-8">
                            {experience.map((exp) => (
                                <div key={exp.id}>
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#1f2937', marginBottom: 2 }}>
                                        {exp.title}
                                    </h4>
                                    <div style={{ fontSize: fs.small, color: '#10b981', fontWeight: 600, marginBottom: 8, textTransform: 'uppercase' }}>
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
                        <MainHeader title="Education" color={'#10b981'} fs={fs} headingFont={headingFont} />
                        <div className="space-y-4">
                            {education.map((edu) => (
                                <div key={edu.id}>
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#1f2937' }}>
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
                paddingBottom: 4,
                borderBottom: `2px solid #e5e7eb`
            }}
        >
            {title}
        </h3>
    );
}

// Meta
export const sidebarGreenV4Meta: TemplateMeta = {
    id: 'sidebar-green-v4',
    name: 'Green Sidebar V4',
    category: 'sidebar',
    thumbnail: '/templates/sidebar-green-v4.jpg',
    description: 'Bright emerald green sidebar for high visibility',
};

'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';
import ProgressBar from '../../shared/ProgressBar';

/**
 * Sidebar Green Teal Template
 * Reference: sidebar-green-teal.jpg
 * 
 * Layout:
 * - Sidebar: 33% width, Left. Teal 800 (#115e59).
 * - Main: 67% width. White (#FFFFFF).
 * - Accent: Teal 500 (#14b8a6).
 */
export default function SidebarGreenTeal({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Lato');
    const bodyFont = getFontFamily(fonts?.body || 'Open Sans');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes
    const fs = getScaledFontSizes(sizeConfig, scale);

    // Colors
    const sidebarBg = '#115e59'; // Teal 800
    const mainBg = '#FFFFFF';
    const sidebarText = '#ccfbf1'; // Teal 50
    const mainText = '#134e4a'; // Teal 900
    const accentColor = customThemeColor || '#14b8a6'; // Teal 500

    // Dimensions
    const photoSize = scale < 1 ? 90 : 130;
    const sidebarWidth = '33%';

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
                                border: `4px solid ${accentColor}`,
                            }}
                        />
                    ) : (
                        <div
                            style={{
                                width: photoSize,
                                height: photoSize,
                                borderRadius: '50%',
                                backgroundColor: '#0f766e',
                                border: `4px solid ${accentColor}`,
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
                    <SidebarSectionHeader title="Contact Info" color={accentColor} fs={fs} headingFont={headingFont} />
                    <div style={{ fontSize: fs.body, display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {personalInfo.phone && <div>{personalInfo.phone}</div>}
                        {personalInfo.email && <div style={{ wordBreak: 'break-all' }}>{personalInfo.email}</div>}
                        {personalInfo.location && <div>{personalInfo.location}</div>}
                        {personalInfo.website && <div style={{ wordBreak: 'break-all' }}>{personalInfo.website}</div>}
                    </div>
                </div>

                {/* Education (Sidebar as per some layouts, or keep consistent with others?) 
                     Lets put education in sidebar if short, main if long. 
                     Ref image usually puts contact/skills/education or languages in sidebar.
                     Let's put Skills here.
                 */}
                {skills.length > 0 && (
                    <div style={{ marginBottom: 40 }}>
                        <SidebarSectionHeader title="Skills" color={accentColor} fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {skills.map((skill) => (
                                <div key={skill.id} data-paginate="item">
                                    <div style={{ marginBottom: 4, fontSize: fs.body, fontWeight: 500 }}>{skill.name}</div>
                                    <ProgressBar
                                        value={skill.level * 20}
                                        color={accentColor}
                                        trackColor="#0f766e"
                                        height={8}
                                        scale={1}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Languages */}
                {languages && languages.length > 0 && (
                    <div>
                        <SidebarSectionHeader title="Languages" color={accentColor} fs={fs} headingFont={headingFont} />
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
                    <div style={{ marginTop: 40 }}>
                        <SidebarSectionHeader title="Strengths" color={accentColor} fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                            {data.strengths.map((str) => (
                                <span key={str.id} style={{
                                    backgroundColor: '#0f766e',
                                    color: '#ccfbf1',
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
                    <div style={{ marginTop: 40 }}>
                        <SidebarSectionHeader title="Interests" color={accentColor} fs={fs} headingFont={headingFont} />
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
                            color: '#115e59',
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
                            color: '#14b8a6', // Teal 500
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
                        <MainSectionHeader title="Profile" color={'#115e59'} fs={fs} headingFont={headingFont} />
                        <p style={{ lineHeight: 1.6, fontSize: fs.body, color: '#334155' }}>
                            {personalInfo.summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <section className="mb-10 resume-section">
                        <MainSectionHeader title="Employment History" color={'#115e59'} fs={fs} headingFont={headingFont} />
                        <div className="space-y-8">
                            {experience.map((exp) => (
                                <div key={exp.id}>
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#0f172a', marginBottom: 2 }}>
                                        {exp.title}
                                    </h4>
                                    <div style={{ fontSize: fs.small, color: '#134e4a', fontWeight: 600, marginBottom: 8 }}>
                                        {exp.company} | {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                                    </div>
                                    <p style={{ fontSize: fs.body, lineHeight: 1.6, color: '#334155' }}>
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education in Main if spec didn't strictly say sidebar. Left column specs usually put contact/skills. */}
                {education.length > 0 && (
                    <section className="mb-10 resume-section">
                        <MainSectionHeader title="Education" color={'#115e59'} fs={fs} headingFont={headingFont} />
                        <div className="space-y-4">
                            {education.map((edu) => (
                                <div key={edu.id}>
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#0f172a' }}>
                                        {edu.degree}
                                    </h4>
                                    <div style={{ fontSize: fs.body, color: '#4b5563' }}>
                                        {edu.school}, {edu.city}
                                    </div>
                                    <div style={{ fontSize: fs.small, color: '#64748b' }}>
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
                borderBottom: `1px solid ${color}`
            }}
        >
            {title}
        </h3>
    );
}

function MainSectionHeader({ title, color, fs, headingFont }: { title: string, color: string, fs: ScaledFontSizes, headingFont: string }) {
    return (
        <h3
            style={{
                fontFamily: headingFont,
                fontSize: fs.sectionHeading,
                fontWeight: 700,
                color: color,
                textTransform: 'uppercase',
                marginBottom: 20,
                paddingBottom: 8,
                borderBottom: `2px solid #e2e8f0`
            }}
        >
            {title}
        </h3>
    );
}

// Meta
export const sidebarGreenTealMeta: TemplateMeta = {
    id: 'sidebar-green-teal',
    name: 'Green Teal Sidebar',
    category: 'sidebar',
    thumbnail: '/templates/sidebar-green-teal.jpg',
    description: 'Deep teal sidebar with clean white content area',
};

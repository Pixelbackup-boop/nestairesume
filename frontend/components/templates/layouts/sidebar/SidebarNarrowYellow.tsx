'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';
import ProgressBar from '../../shared/ProgressBar';

/**
 * Sidebar Narrow Yellow Template
 * Reference: sidebar-narrow-yellow.webp
 * 
 * Layout:
 * - Sidebar: ~20% width (Narrow), Left. Yellow 400 (#facc15).
 * - Main: 80% width. White.
 * - Sidebar Text: Dark Gray.
 * - Content: Icons only or minimal text in sidebar.
 */
export default function SidebarNarrowYellow({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Oswald');
    const bodyFont = getFontFamily(fonts?.body || 'Roboto Condensed');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes
    const fs = getScaledFontSizes(sizeConfig, scale);

    // Colors
    const sidebarBg = '#facc15'; // Yellow 400
    const mainBg = '#FFFFFF';
    const sidebarText = '#1f2937';
    const mainText = '#1f2937';

    // Dimensions
    const photoSize = scale < 1 ? 60 : 100;
    const sidebarWidth = '22%'; // Slight adjustment to accommodate some text

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
                    padding: scale < 1 ? '32px 12px' : '56px 20px',
                    flexShrink: 0,
                    minHeight: '100%',
                    alignItems: 'center'
                }}
            >
                {/* Photo */}
                <div style={{ marginBottom: scale < 1 ? 32 : 56 }}>
                    {personalInfo.profileImage ? (
                        <img
                            src={personalInfo.profileImage}
                            alt={personalInfo.fullName}
                            style={{
                                width: photoSize,
                                height: photoSize,
                                borderRadius: '50%',
                                objectFit: 'cover',
                                border: `4px solid #1f2937`,
                            }}
                        />
                    ) : (
                        <div
                            style={{
                                width: photoSize,
                                height: photoSize,
                                borderRadius: '50%',
                                backgroundColor: '#1f2937',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: fs.name,
                                color: '#facc15',
                            }}
                        >
                            {personalInfo.fullName?.charAt(0) || '?'}
                        </div>
                    )}
                </div>

                {/* Contact Icons */}
                <div style={{ marginBottom: 40, width: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
                        {personalInfo.phone && <div title={personalInfo.phone} style={{ fontSize: '1.5em' }}>📞</div>}
                        {personalInfo.email && <div title={personalInfo.email} style={{ fontSize: '1.5em' }}>✉️</div>}
                        {personalInfo.location && <div title={personalInfo.location} style={{ fontSize: '1.5em' }}>📍</div>}
                        {personalInfo.website && <div title={personalInfo.website} style={{ fontSize: '1.5em' }}>🌐</div>}
                    </div>
                </div>

                {/* Vertical Text or Initials? Let's just put skills vertically/compactly */}
                {skills.length > 0 && (
                    <div style={{ width: '100%', textAlign: 'center' }}>
                        <h4 style={{ fontWeight: 800, textTransform: 'uppercase', marginBottom: 12, borderBottom: '2px solid #1f2937', display: 'inline-block' }}>Skills</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: fs.small, fontWeight: 700 }}>
                            {skills.map((skill) => (
                                <div key={skill.id}>{skill.name}</div>
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
                            fontSize: scale < 1 ? '32px' : '56px', // Massive name
                            fontWeight: 800,
                            color: '#1f2937',
                            textTransform: 'uppercase',
                            margin: 0,
                            lineHeight: 0.9,
                            marginBottom: 8,
                        }}
                    >
                        {personalInfo.fullName}
                    </h1>
                    <p
                        style={{
                            fontSize: fs.jobTitle,
                            color: '#ca8a04', // Darker yellow
                            textTransform: 'uppercase',
                            fontWeight: 700,
                            letterSpacing: '0.2em'
                        }}
                    >
                        {personalInfo.jobTitle}
                    </p>
                </div>

                {/* Profile */}
                {personalInfo.summary && (
                    <section className="mb-10 resume-section">
                        <MainHeader title="About Me" color={'#1f2937'} fs={fs} headingFont={headingFont} />
                        <p style={{ lineHeight: 1.6, fontSize: fs.body, color: '#374151' }}>
                            {personalInfo.summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <section className="mb-10 resume-section">
                        <MainHeader title="Experience" color={'#1f2937'} fs={fs} headingFont={headingFont} />
                        <div className="space-y-8">
                            {experience.map((exp) => (
                                <div key={exp.id}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                                        <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#000', textTransform: 'uppercase' }}>
                                            {exp.title}
                                        </h4>
                                        <span style={{ fontSize: fs.small, color: '#ca8a04', fontWeight: 700 }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                                    </div>
                                    <div style={{ fontSize: fs.small, color: '#4b5563', marginBottom: 6, fontWeight: 600 }}>
                                        {exp.company}, {exp.city}
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
                        <MainHeader title="Education" color={'#1f2937'} fs={fs} headingFont={headingFont} />
                        <div className="space-y-4">
                            {education.map((edu) => (
                                <div key={edu.id}>
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#000', textTransform: 'uppercase' }}>
                                        {edu.degree}
                                    </h4>
                                    <div style={{ fontSize: fs.body, color: '#4b5563' }}>
                                        {edu.school}, {edu.city}
                                    </div>
                                    <div style={{ fontSize: fs.small, color: '#666' }}>
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
function MainHeader({ title, color, fs, headingFont }: { title: string, color: string, fs: ScaledFontSizes, headingFont: string }) {
    return (
        <h3
            style={{
                fontFamily: headingFont,
                fontSize: fs.sectionHeading,
                fontWeight: 800,
                color: color,
                textTransform: 'uppercase',
                marginBottom: 20,
                borderBottom: `4px solid #facc15`, // Thick yellow underline
                display: 'inline-block',
                paddingBottom: 4
            }}
        >
            {title}
        </h3>
    );
}

// Meta
export const sidebarNarrowYellowMeta: TemplateMeta = {
    id: 'sidebar-narrow-yellow',
    name: 'Narrow Yellow Sidebar',
    category: 'sidebar',
    thumbnail: '/templates/sidebar-narrow-yellow.webp',
    description: 'High impact narrow yellow sidebar with icon focus',
};

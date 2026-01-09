'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';
import ProgressBar from '../../shared/ProgressBar';

/**
 * Sidebar Dark Gray Template
 * Reference: sidebar-dark-gray.jpg
 * 
 * Layout:
 * - Sidebar: 33% width, Left. Dark Gray (#333333).
 * - Main: 67% width. White (#FFFFFF).
 * - Photo: Sidebar Top Center, 120px Circle, Border 4px White.
 * - Margins: 0px (Full bleed sidebar).
 */
export default function SidebarDarkGray({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Roboto');
    const bodyFont = getFontFamily(fonts?.body || 'Open Sans');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes
    const fs = getScaledFontSizes(sizeConfig, scale);

    // Colors
    const sidebarBg = '#333333';
    const mainBg = '#FFFFFF';
    const sidebarText = '#FFFFFF';
    const mainText = '#333333';
    const accentColor = customThemeColor || '#10b981'; // Emerald 500

    // Dimensions
    const photoSize = scale < 1 ? 80 : 120;
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
                boxSizing: 'border-box',
            }}
        >
            {/* Sidebar - Dark Gray */}
            <aside
                style={{
                    width: sidebarWidth,
                    backgroundColor: sidebarBg,
                    color: sidebarText,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: scale < 1 ? '24px 16px' : '48px 32px',
                    flexShrink: 0,
                    minHeight: '100%',
                }}
            >
                {/* Photo */}
                <div style={{ marginBottom: scale < 1 ? 24 : 40 }}>
                    {personalInfo.profileImage ? (
                        <img
                            src={personalInfo.profileImage}
                            alt={personalInfo.fullName}
                            style={{
                                width: photoSize,
                                height: photoSize,
                                borderRadius: '50%',
                                objectFit: 'cover',
                                border: `4px solid #FFFFFF`,
                            }}
                        />
                    ) : (
                        <div
                            style={{
                                width: photoSize,
                                height: photoSize,
                                borderRadius: '50%',
                                backgroundColor: '#4b5563',
                                border: `4px solid #FFFFFF`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: fs.name,
                                color: '#FFFFFF',
                            }}
                        >
                            {personalInfo.fullName?.charAt(0) || '?'}
                        </div>
                    )}
                </div>

                {/* Contact Info */}
                <div style={{ width: '100%', marginBottom: 40 }}>
                    <SidebarSectionHeader title="Contact" color={accentColor} fs={fs} headingFont={headingFont} />
                    <div style={{ fontSize: fs.body, display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {personalInfo.phone && <ContactItem icon="📞" text={personalInfo.phone} />}
                        {personalInfo.email && <ContactItem icon="✉️" text={personalInfo.email} />}
                        {personalInfo.location && <ContactItem icon="📍" text={personalInfo.location} />}
                        {personalInfo.website && <ContactItem icon="🌐" text={personalInfo.website} />}
                    </div>
                </div>

                {/* Skills */}
                {skills.length > 0 && (
                    <div style={{ width: '100%', marginBottom: 40 }}>
                        <SidebarSectionHeader title="Skills" color={accentColor} fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {skills.map((skill) => (
                                <div key={skill.id}>
                                    <div style={{ marginBottom: 4, fontSize: fs.body, fontWeight: 500 }}>{skill.name}</div>
                                    <ProgressBar
                                        value={skill.level * 20}
                                        color={accentColor}
                                        trackColor="#4b5563"
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
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            {languages.map((lang) => (
                                <div key={lang.id} style={{ fontSize: fs.body }}>
                                    {lang.name} - <span style={{ opacity: 0.8 }}>{lang.proficiency}</span>
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
                {/* Header Info */}
                <div style={{ marginBottom: scale < 1 ? 32 : 50 }}>
                    <h1
                        style={{
                            fontFamily: headingFont,
                            fontSize: fs.name, // 28px spec
                            fontWeight: 700,
                            color: mainText,
                            textTransform: 'uppercase',
                            margin: 0,
                            marginBottom: 8
                        }}
                    >
                        {personalInfo.fullName || 'Your Name'}
                    </h1>
                    <p
                        style={{
                            fontSize: fs.jobTitle,
                            color: '#666666',
                            textTransform: 'uppercase',
                            fontWeight: 500,
                            letterSpacing: '0.05em'
                        }}
                    >
                        {personalInfo.jobTitle || 'Job Title'}
                    </p>
                </div>

                {/* Profile */}
                {personalInfo.summary && (
                    <section className="mb-8 resume-section" data-paginate>
                        <MainSectionHeader title="Profile" color={mainText} fs={fs} headingFont={headingFont} />
                        <p style={{ lineHeight: 1.6, fontSize: fs.body, color: '#4b5563' }}>
                            {personalInfo.summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <section className="mb-8 resume-section" data-paginate>
                        <MainSectionHeader title="Experience" color={mainText} fs={fs} headingFont={headingFont} />
                        <div className="space-y-6">
                            {experience.map((exp) => (
                                <div key={exp.id}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2, alignItems: 'baseline' }}>
                                        <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#000' }}>
                                            {exp.title}
                                        </h4>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: fs.small, color: '#666', fontWeight: 500 }}>
                                        <span>{exp.company}, {exp.city}</span>
                                        <span>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                                    </div>

                                    <p style={{ fontSize: fs.body, lineHeight: 1.6, color: '#4b5563' }}>
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <section className="mb-8 resume-section" data-paginate>
                        <MainSectionHeader title="Education" color={mainText} fs={fs} headingFont={headingFont} />
                        <div className="space-y-4">
                            {education.map((edu) => (
                                <div key={edu.id}>
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#000' }}>
                                        {edu.degree}
                                    </h4>
                                    <p style={{ fontSize: fs.body, color: '#444', fontWeight: 500 }}>
                                        {edu.school}, {edu.city}
                                    </p>
                                    <p style={{ fontSize: fs.small, color: '#666' }}>
                                        {edu.startDate} – {edu.endDate || 'Present'}
                                    </p>
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
                fontSize: fs.sidebarHeading, // 14px spec
                fontWeight: 700,
                color: '#FFFFFF',
                textTransform: 'uppercase',
                marginBottom: 16,
                paddingBottom: 4,
                borderBottom: '1px solid #555555'
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
                fontSize: fs.sectionHeading, // 14px spec
                fontWeight: 700,
                color: color,
                textTransform: 'uppercase',
                marginBottom: 20,
                paddingBottom: 4,
                borderBottom: '2px solid #EEEEEE'
            }}
        >
            {title}
        </h3>
    );
}

function ContactItem({ icon, text }: { icon: string, text: string }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: '1.2em' }}>{icon}</span>
            <span style={{ wordBreak: 'break-all', opacity: 0.9 }}>{text}</span>
        </div>
    );
}

// Meta
export const sidebarDarkGrayMeta: TemplateMeta = {
    id: 'sidebar-dark-gray',
    name: 'Dark Gray Sidebar',
    category: 'sidebar',
    thumbnail: '/templates/sidebar-dark-gray.jpg',
    description: 'Professional dark gray sidebar with emerald accents',
};

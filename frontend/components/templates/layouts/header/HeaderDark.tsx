'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';
import ProgressBar from '../../shared/ProgressBar';

/**
 * Header Dark Template
 * Full-height Dark Sidebar layout.
 * Photo, Contact, Skills in dark sidebar. Name, Profile, Experience in white main content.
 *
 * Layout:
 * - Left Sidebar (~33%): Dark Slate 900 (#0f172a) background. White text.
 * - Main Content (~67%): White background. Dark text.
 * - Photo: Top of sidebar, circular.
 * - Name: Top of main content, Bold Uppercase.
 * - Accent: Gold/Yellow (#facc15) for highlights.
 *
 * Matches reference: frontend/Resume-template/organized/02-header/header-dark.jpg
 * (Note: The file name says "header-dark" but the spec describes a dark sidebar layout similar to the image analysis).
 */
export default function HeaderDark({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, references, certifications, awards, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Montserrat'); // defaults to Montserrat/Inter
    const bodyFont = getFontFamily(fonts?.body || 'Open Sans');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes
    const fs = getScaledFontSizes(sizeConfig, scale);

    // Colors
    const sidebarBg = '#0f172a'; // Slate 900
    const mainBg = '#ffffff';
    const accentColor = customThemeColor || '#facc15'; // Yellow 400
    const textLight = '#f8fafc'; // Slate 50
    const textDark = '#334155'; // Slate 700

    // Dimensions
    const photoSize = scale < 1 ? 80 : 140;

    return (
        <div
            className="w-full h-full"
            style={{
                fontFamily: bodyFont,
                fontSize: sizeConfig.base,
                backgroundColor: mainBg,
                color: textDark,
                display: 'flex',
                boxSizing: 'border-box'
            }}
        >
            {/* Left Sidebar - Dark */}
            <aside
                style={{
                    width: '33%',
                    backgroundColor: sidebarBg,
                    color: textLight,
                    padding: scale < 1 ? '24px 16px' : '48px 32px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flexShrink: 0,
                    minHeight: '100%'
                }}
            >
                {/* Photo */}
                <div style={{ marginBottom: scale < 1 ? 32 : 50 }}>
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
                                backgroundColor: '#1e293b',
                                border: `4px solid ${accentColor}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: fs.name,
                                color: textLight,
                            }}
                        >
                            {personalInfo.fullName?.charAt(0) || '?'}
                        </div>
                    )}
                </div>

                {/* Contact Info (Dark Sidebar) */}
                <div style={{ width: '100%', marginBottom: 40 }}>
                    <SidebarSectionHeader title="Contact" color={accentColor} fs={fs} headingFont={headingFont} />
                    <div style={{ fontSize: fs.body, display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {personalInfo.phone && <ContactItem icon="📞" text={personalInfo.phone} />}
                        {personalInfo.email && <ContactItem icon="✉️" text={personalInfo.email} />}
                        {personalInfo.location && <ContactItem icon="📍" text={personalInfo.location} />}
                        {personalInfo.website && <ContactItem icon="🌐" text={personalInfo.website} />}
                    </div>
                </div>

                {/* Skills (Dark Sidebar) */}
                {skills.length > 0 && (
                    <div style={{ width: '100%', marginBottom: 40 }}>
                        <SidebarSectionHeader title="Skills" color={accentColor} fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {skills.map((skill) => (
                                <div key={skill.id} data-paginate="item">
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

                {/* Languages (Dark Sidebar) */}
                {languages && languages.length > 0 && (
                    <div style={{ width: '100%', marginBottom: 40 }}>
                        <SidebarSectionHeader title="Languages" color={accentColor} fs={fs} headingFont={headingFont} />
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {languages.map((lang) => (
                                <li key={lang.id} data-paginate="item" style={{ marginBottom: 6, fontSize: fs.body }}>
                                    <span style={{ fontWeight: 600 }}>{lang.name}</span> <span style={{ opacity: 0.7, fontSize: '0.9em' }}>- {lang.proficiency}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Strengths (Dark Sidebar) */}
                {data.strengths && data.strengths.length > 0 && (
                    <div style={{ width: '100%', marginBottom: 40 }}>
                        <SidebarSectionHeader title="Strengths" color={accentColor} fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                            {data.strengths.map((str) => (
                                <span key={str.id} data-paginate="item" style={{
                                    backgroundColor: '#1e293b',
                                    color: accentColor,
                                    padding: '4px 12px',
                                    borderRadius: 4,
                                    fontSize: fs.small,
                                    fontWeight: 500,
                                    border: `1px solid ${accentColor}40`
                                }}>
                                    {str.name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Interests (Dark Sidebar) */}
                {data.interests && data.interests.length > 0 && (
                    <div style={{ width: '100%', marginBottom: 40 }}>
                        <SidebarSectionHeader title="Interests" color={accentColor} fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                            {data.interests.map((int) => (
                                <span key={int.id} style={{ fontSize: fs.body, display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <span style={{ color: accentColor }}>✦</span> {int.name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

            </aside>

            {/* Main Content - White */}
            <main
                style={{
                    flex: 1,
                    padding: scale < 1 ? '32px 24px' : '64px 48px',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* Name Header */}
                <div style={{ marginBottom: scale < 1 ? 32 : 50 }}>
                    <h1
                        style={{
                            fontFamily: headingFont,
                            fontSize: fs.name,
                            fontWeight: 800, // Bold
                            color: '#0f172a',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            margin: 0,
                            lineHeight: 1
                        }}
                    >
                        {personalInfo.fullName || 'Your Name'}
                    </h1>
                    <p
                        style={{
                            fontSize: fs.jobTitle,
                            color: '#64748b',
                            textTransform: 'uppercase',
                            fontWeight: 600,
                            marginTop: 10,
                            letterSpacing: '0.05em'
                        }}
                    >
                        {personalInfo.jobTitle || 'Job Title'}
                    </p>
                </div>

                {/* Profile */}
                {personalInfo.summary && (
                    <section className="mb-10 resume-section" data-paginate>
                        <SectionHeaderMain title="Profile" color={'#0f172a'} accent={accentColor} fs={fs} headingFont={headingFont} />
                        <p style={{ lineHeight: 1.6, fontSize: fs.body, color: '#334155' }}>
                            {personalInfo.summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <section className="mb-10 resume-section" data-paginate>
                        <SectionHeaderMain title="Experience" color={'#0f172a'} accent={accentColor} fs={fs} headingFont={headingFont} />
                        <div className="space-y-8">
                            {experience.map((exp) => (
                                <div key={exp.id}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2, alignItems: 'baseline' }}>
                                        <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, textTransform: 'uppercase', color: '#0f172a' }}>
                                            {exp.title}
                                        </h4>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: fs.small, color: '#64748b', fontWeight: 600 }}>
                                        <span>{exp.company}, {exp.city}</span>
                                        <span>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                                    </div>

                                    <p style={{ fontSize: fs.body, lineHeight: 1.6, color: '#334155' }}>
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <section className="mb-10 resume-section" data-paginate>
                        <SectionHeaderMain title="Education" color={'#0f172a'} accent={accentColor} fs={fs} headingFont={headingFont} />
                        <div className="space-y-6">
                            {education.map((edu) => (
                                <div key={edu.id}>
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#0f172a' }}>
                                        {edu.degree}
                                    </h4>
                                    <p style={{ fontSize: fs.body, color: '#475569', fontWeight: 500 }}>
                                        {edu.school}, {edu.city}
                                    </p>
                                    <p style={{ fontSize: fs.small, color: '#64748b' }}>
                                        {edu.startDate} – {edu.endDate || 'Present'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Credentials (Certifications & Awards) */}
                {((certifications && certifications.length > 0) || (awards && awards.length > 0)) && (
                    <section className="mb-10 resume-section" data-paginate>
                        <SectionHeaderMain title="Credentials" color={'#0f172a'} accent={accentColor} fs={fs} headingFont={headingFont} />

                        {certifications && certifications.length > 0 && (
                            <div style={{ marginBottom: awards && awards.length > 0 ? 24 : 0 }}>
                                <h4 style={{ fontSize: fs.entryTitle, fontWeight: 600, color: '#475569', marginBottom: 12 }}>
                                    Certifications
                                </h4>
                                <div className="space-y-3">
                                    {certifications.map((cert) => (
                                        <div key={cert.id} data-paginate="item">
                                            <div style={{ fontWeight: 600, fontSize: fs.body, color: '#0f172a' }}>{cert.name}</div>
                                            <div style={{ fontSize: fs.small, color: '#64748b' }}>{cert.issuer} • {cert.date}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {awards && awards.length > 0 && (
                            <div>
                                <h4 style={{ fontSize: fs.entryTitle, fontWeight: 600, color: '#475569', marginBottom: 12 }}>
                                    Awards & Achievements
                                </h4>
                                <div className="space-y-3">
                                    {awards.map((award) => (
                                        <div key={award.id} data-paginate="item">
                                            <div style={{ fontWeight: 600, fontSize: fs.body, color: '#0f172a' }}>{award.title}</div>
                                            <div style={{ fontSize: fs.small, color: '#64748b' }}>{award.issuer} • {award.date}</div>
                                            {award.description && (
                                                <p style={{ fontSize: fs.small, color: '#334155', marginTop: 4, lineHeight: 1.5 }}>
                                                    {award.description}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>
                )}

                {/* References */}
                {references && references.length > 0 && (
                    <section className="resume-section" data-paginate>
                        <SectionHeaderMain title="References" color={'#0f172a'} accent={accentColor} fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                            {references.map((ref) => (
                                <div key={ref.id}>
                                    <div style={{ fontWeight: 700, fontSize: fs.body, color: '#0f172a' }}>{ref.name}</div>
                                    <div style={{ fontSize: fs.small, color: '#64748b' }}>{ref.title}, {ref.company}</div>
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
                fontSize: fs.sectionHeading,
                fontWeight: 700,
                color: '#ffffff',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: 20,
                paddingBottom: 8,
                borderBottom: `2px solid ${color}`
            }}
        >
            {title}
        </h3>
    );
}

function SectionHeaderMain({ title, color, accent, fs, headingFont }: { title: string, color: string, accent: string, fs: ScaledFontSizes, headingFont: string }) {
    return (
        <h3
            style={{
                fontFamily: headingFont,
                fontSize: fs.sectionHeading,
                fontWeight: 800,
                color: color,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                marginBottom: 24,
                display: 'flex',
                alignItems: 'center',
                gap: 16
            }}
        >
            <span style={{ width: 40, height: 4, backgroundColor: accent }}></span>
            {title}
        </h3>
    );
}

function ContactItem({ icon, text }: { icon: string, text: string }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ filter: 'grayscale(1)', fontSize: '1.2em' }}>{icon}</span>
            <span style={{ wordBreak: 'break-all', opacity: 0.9 }}>{text}</span>
        </div>
    );
}

// Template metadata
export const headerDarkMeta: TemplateMeta = {
    id: 'header-dark',
    name: 'Dark Sidebar',
    category: 'header',
    thumbnail: '/templates/header-dark.png',
    description: 'Modern slate dark sidebar with gold accents',
};

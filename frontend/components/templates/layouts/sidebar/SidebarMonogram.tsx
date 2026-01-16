'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';
import ProgressBar from '../../shared/ProgressBar';

/**
 * Sidebar Monogram Template
 * Reference: sidebar-monogram.webp
 * 
 * Layout:
 * - Sidebar: 30% width, Left. Gray 700 (#374151).
 * - Main: 70% width. White.
 * - Header: Large Monogram (Initials) instead of photo.
 * - Accent: Gold (#facc15).
 */
export default function SidebarMonogram({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, customThemeColor, fonts, certifications, awards } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Playfair Display');
    const bodyFont = getFontFamily(fonts?.body || 'Lato');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes
    const fs = getScaledFontSizes(sizeConfig, scale);

    // Colors
    const sidebarBg = '#374151'; // Gray 700
    const mainBg = '#FFFFFF';
    const sidebarText = '#f9fafb';
    const mainText = '#1f2937';
    const accentColor = customThemeColor || '#facc15'; // Yellow 400

    // Dimensions
    const monogramSize = scale < 1 ? 80 : 120;
    const sidebarWidth = '30%';

    // Initials
    const initials = personalInfo.fullName
        ? personalInfo.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
        : 'YN';

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
                    alignItems: 'center',
                    borderRight: `8px solid ${accentColor}`
                }}
            >
                {/* Profile Image or Monogram */}
                {personalInfo.profileImage ? (
                    <img
                        src={personalInfo.profileImage}
                        alt={personalInfo.fullName || 'Profile'}
                        style={{
                            marginBottom: scale < 1 ? 32 : 56,
                            width: monogramSize,
                            height: monogramSize,
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: `4px solid ${accentColor}`
                        }}
                    />
                ) : (
                    <div
                        style={{
                            marginBottom: scale < 1 ? 32 : 56,
                            width: monogramSize,
                            height: monogramSize,
                            borderRadius: '50%',
                            backgroundColor: mainBg,
                            color: sidebarBg,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: fs.name,
                            fontFamily: headingFont,
                            fontWeight: 900,
                            border: `4px solid ${accentColor}`
                        }}
                    >
                        {initials}
                    </div>
                )}

                {/* Contact */}
                <div style={{ width: '100%', marginBottom: 40 }}>
                    <SidebarHeader title="Contact" color={accentColor} fs={fs} headingFont={headingFont} />
                    <div style={{ fontSize: fs.body, display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {personalInfo.phone && <div style={{ display: 'flex', gap: 8 }}><span>📞</span><span>{personalInfo.phone}</span></div>}
                        {personalInfo.email && <div style={{ display: 'flex', gap: 8 }}><span>✉️</span><span style={{ wordBreak: 'break-all' }}>{personalInfo.email}</span></div>}
                        {personalInfo.location && <div style={{ display: 'flex', gap: 8 }}><span>📍</span><span>{personalInfo.location}</span></div>}
                    </div>
                </div>

                {/* Languages */}
                {languages && languages.length > 0 && (
                    <div style={{ width: '100%', marginBottom: 40 }}>
                        <SidebarHeader title="Languages" color={accentColor} fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {languages.map((lang) => (
                                <div key={lang.id} style={{ fontSize: fs.body, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} data-paginate="item">
                                    <span>{lang.name}</span>
                                    {lang.proficiency && (
                                        <span style={{ fontSize: fs.small, color: accentColor, fontWeight: 500 }}>
                                            {lang.proficiency}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Strengths */}
                {data.strengths && data.strengths.length > 0 && (
                    <div style={{ width: '100%', marginBottom: 40 }}>
                        <SidebarHeader title="Strengths" color={accentColor} fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {data.strengths.map((str) => (
                                <div key={str.id} data-paginate="item">
                                    <div style={{ fontSize: fs.small, marginBottom: 4, color: sidebarText }}>
                                        {str.name}
                                    </div>
                                    <ProgressBar value={str.level ?? 80} color={accentColor} height={5} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Interests */}
                {data.interests && data.interests.length > 0 && (
                    <div style={{ width: '100%', marginBottom: 40 }}>
                        <SidebarHeader title="Interests" color={accentColor} fs={fs} headingFont={headingFont} />
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
                    padding: scale < 1 ? '32px 24px' : '56px 40px',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* Header */}
                <div style={{ marginBottom: scale < 1 ? 40 : 64, borderBottom: `1px solid ${accentColor}`, paddingBottom: 16 }}>
                    <h1
                        style={{
                            fontFamily: headingFont,
                            fontSize: fs.name,
                            fontWeight: 700,
                            color: '#111827',
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
                            color: '#4b5563',
                            textTransform: 'uppercase',
                            fontWeight: 500,
                            letterSpacing: '0.2em'
                        }}
                    >
                        {personalInfo.jobTitle}
                    </p>
                </div>

                {/* Profile */}
                {personalInfo.summary && (
                    <section className="mb-10 resume-section">
                        <MainHeader title="Profile" color={'#374151'} fs={fs} headingFont={headingFont} />
                        <p style={{ lineHeight: 1.6, fontSize: fs.body, color: '#374151' }}>
                            {personalInfo.summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <section className="mb-10 resume-section">
                        <MainHeader title="Experience" color={'#374151'} fs={fs} headingFont={headingFont} />
                        <div className="space-y-8">
                            {experience.map((exp) => (
                                <div key={exp.id}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                                        <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#111827' }}>
                                            {exp.title}
                                        </h4>
                                        <span style={{ fontSize: fs.small, color: '#374151', fontWeight: 600 }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                                    </div>
                                    <div style={{ fontSize: fs.small, color: '#6b7280', marginBottom: 6 }}>
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
                        <MainHeader title="Education" color={'#374151'} fs={fs} headingFont={headingFont} />
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

                {/* Skills */}
                {skills.length > 0 && (
                    <section className="mb-10 resume-section">
                        <MainHeader title="Skills" color={'#374151'} fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                            {skills.map((skill) => (
                                <div key={skill.id} data-paginate="item">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: fs.small, marginBottom: 4 }}>
                                        <span style={{ fontWeight: 500, color: '#374151' }}>{skill.name}</span>
                                    </div>
                                    <ProgressBar value={(skill.level || 3) * 20} color={accentColor} height={6} />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Credentials (Certifications & Awards) */}
                {((certifications && certifications.length > 0) || (awards && awards.length > 0)) && (
                    <section className="mb-10 resume-section">
                        <MainHeader title="Credentials" color={'#374151'} fs={fs} headingFont={headingFont} />

                        {/* Certifications */}
                        {certifications && certifications.length > 0 && (
                            <div style={{ marginBottom: awards && awards.length > 0 ? 24 : 0 }}>
                                <h4 style={{
                                    fontSize: fs.entryTitle,
                                    fontWeight: 600,
                                    color: '#4b5563',
                                    marginBottom: 12
                                }}>
                                    Certifications
                                </h4>
                                <div className="space-y-3">
                                    {certifications.map((cert) => (
                                        <div key={cert.id} data-paginate="item">
                                            <div style={{ fontWeight: 600, fontSize: fs.body, color: '#111827' }}>
                                                {cert.name}
                                            </div>
                                            <div style={{ fontSize: fs.small, color: '#6b7280' }}>
                                                {cert.issuer} • {cert.date}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Awards & Achievements */}
                        {awards && awards.length > 0 && (
                            <div>
                                <h4 style={{
                                    fontSize: fs.entryTitle,
                                    fontWeight: 600,
                                    color: '#4b5563',
                                    marginBottom: 12
                                }}>
                                    Awards & Achievements
                                </h4>
                                <div className="space-y-3">
                                    {awards.map((award) => (
                                        <div key={award.id} data-paginate="item">
                                            <div style={{ fontWeight: 600, fontSize: fs.body, color: '#111827' }}>
                                                {award.title}
                                            </div>
                                            <div style={{ fontSize: fs.small, color: '#6b7280' }}>
                                                {award.issuer} • {award.date}
                                            </div>
                                            {award.description && (
                                                <p style={{ fontSize: fs.small, color: '#374151', marginTop: 4, lineHeight: 1.5 }}>
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
                borderBottom: `2px solid ${color}`,
                display: 'inline-block',
                paddingBottom: 4
            }}
        >
            {title}
        </h3>
    );
}

// Meta
export const sidebarMonogramMeta: TemplateMeta = {
    id: 'sidebar-monogram',
    name: 'Monogram Sidebar',
    category: 'sidebar',
    thumbnail: '/templates/sidebar-monogram.webp',
    description: 'Elegant layout using initials monogram instead of photo',
};

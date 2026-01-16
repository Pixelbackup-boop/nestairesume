'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';
import ProgressBar from '../../shared/ProgressBar';

/**
 * Header Blue Clean Template
 * Left Sidebar layout with Sky Blue background.
 * Photo, Contact, Skills in sidebar. Name, Profile, Experience in main content.
 *
 * Layout:
 * - Left Sidebar (~35%): Sky 100 (#e0f2fe) background. Full height.
 * - Main Content (~65%): White background. Full height.
 * - Photo: Top of sidebar, circular.
 * - Name: Top of main content, Thin Uppercase.
 *
 * Matches reference: frontend/Resume-template/unique-layouts/10-blue-clean.webp
 */
export default function HeaderBlueClean({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, awards, certifications, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Roboto'); // defaults to Roboto/Inter
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes
    const fs = getScaledFontSizes(sizeConfig, scale);

    // Colors
    const sidebarBg = '#e0f2fe'; // Sky 100
    const mainBg = '#ffffff';
    const accentColor = customThemeColor || '#0369a1'; // Sky 700
    const textColor = '#334155'; // Slate 700

    // Dimensions
    const photoSize = scale < 1 ? 80 : 150;

    return (
        <div
            className="w-full h-full"
            style={{
                fontFamily: bodyFont,
                fontSize: sizeConfig.base,
                backgroundColor: mainBg,
                color: textColor,
                display: 'flex',
                boxSizing: 'border-box'
            }}
        >
            {/* Left Sidebar */}
            <aside
                style={{
                    width: '35%',
                    backgroundColor: sidebarBg,
                    padding: scale < 1 ? '20px 16px' : '40px 32px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flexShrink: 0,
                    minHeight: '100%'
                }}
            >
                {/* Photo */}
                <div style={{ marginBottom: scale < 1 ? 24 : 48 }}>
                    {personalInfo.profileImage ? (
                        <img
                            src={personalInfo.profileImage}
                            alt={personalInfo.fullName}
                            style={{
                                width: photoSize,
                                height: photoSize,
                                borderRadius: '50%',
                                objectFit: 'cover',
                                border: `4px solid #ffffff`,
                            }}
                        />
                    ) : (
                        <div
                            style={{
                                width: photoSize,
                                height: photoSize,
                                borderRadius: '50%',
                                backgroundColor: '#bfdbfe',
                                border: `4px solid #ffffff`,
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

                {/* Contact Info (In Sidebar) */}
                <div style={{ width: '100%', marginBottom: 40 }}>
                    <SectionHeader title="Contact" color={accentColor} fs={fs} headingFont={headingFont} />
                    <div style={{ fontSize: fs.small, display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {personalInfo.phone && <ContactItem icon="📱" text={personalInfo.phone} />}
                        {personalInfo.email && <ContactItem icon="✉️" text={personalInfo.email} />}
                        {personalInfo.location && <ContactItem icon="📍" text={personalInfo.location} />}
                        {personalInfo.website && <ContactItem icon="🌐" text={personalInfo.website} />}
                    </div>
                </div>

                {/* Skills (In Sidebar) */}
                {skills.length > 0 && (
                    <div style={{ width: '100%', marginBottom: 40 }}>
                        <SectionHeader title="Skills" color={accentColor} fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {skills.map((skill) => (
                                <div key={skill.id} data-paginate="item">
                                    <div style={{ marginBottom: 2, fontSize: fs.body, fontWeight: 500 }}>{skill.name}</div>
                                    <ProgressBar
                                        value={skill.level * 20}
                                        color={accentColor}
                                        height={6}
                                        scale={1}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Awards (In Sidebar) */}
                {awards && awards.length > 0 && (
                    <div style={{ width: '100%', marginBottom: 40 }}>
                        <SectionHeader title="Awards" color={accentColor} fs={fs} headingFont={headingFont} />
                        {awards.map((award) => (
                            <div key={award.id} style={{ marginBottom: 12 }}>
                                <div style={{ fontWeight: 700, fontSize: fs.body }}>{award.title}</div>
                                <div style={{ fontSize: fs.small, opacity: 0.8 }}>{award.issuer} | {award.date}</div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Languages (In Sidebar) */}
                {data.languages && data.languages.length > 0 && (
                    <div style={{ width: '100%', marginBottom: 40 }}>
                        <SectionHeader title="Languages" color={accentColor} fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {data.languages.map((lang) => (
                                <div key={lang.id} data-paginate="item" style={{ display: 'flex', justifyContent: 'space-between', fontSize: fs.body }}>
                                    <span style={{ fontWeight: 500 }}>{lang.name}</span>
                                    <span style={{ opacity: 0.7 }}>{lang.proficiency}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Strengths (In Sidebar) */}
                {data.strengths && data.strengths.length > 0 && (
                    <div style={{ width: '100%', marginBottom: 40 }}>
                        <SectionHeader title="Strengths" color={accentColor} fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                            {data.strengths.map((str) => (
                                <span key={str.id} data-paginate="item" style={{
                                    backgroundColor: '#bfdbfe',
                                    color: '#1e3a8a',
                                    padding: '4px 12px',
                                    borderRadius: 12,
                                    fontSize: fs.small,
                                    fontWeight: 500
                                }}>
                                    {str.name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Interests (In Sidebar) */}
                {data.interests && data.interests.length > 0 && (
                    <div style={{ width: '100%', marginBottom: 40 }}>
                        <SectionHeader title="Interests" color={accentColor} fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                            {data.interests.map((int) => (
                                <span key={int.id} style={{ fontSize: fs.body, display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <span>•</span> {int.name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

            </aside>

            {/* Main Content */}
            <main
                style={{
                    flex: 1,
                    padding: scale < 1 ? '24px' : '48px',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* Name Header (In Content) */}
                <div style={{ marginBottom: scale < 1 ? 32 : 60, borderBottom: `2px solid ${sidebarBg}`, paddingBottom: 24 }}>
                    <h1
                        style={{
                            fontFamily: headingFont,
                            fontSize: fs.name,
                            fontWeight: 300, // Thin/Light
                            color: '#0f172a',
                            textTransform: 'uppercase', // Uppercase
                            letterSpacing: '0.15em',
                            margin: 0,
                            lineHeight: 1.2
                        }}
                    >
                        {personalInfo.fullName || 'Your Name'}
                    </h1>
                    <p
                        style={{
                            fontSize: fs.jobTitle,
                            color: accentColor,
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            fontWeight: 700,
                            marginTop: 8
                        }}
                    >
                        {personalInfo.jobTitle || 'Job Title'}
                    </p>
                </div>

                {/* Profile */}
                {personalInfo.summary && (
                    <section className="mb-8 resume-section" data-paginate>
                        <SectionHeaderMain title="Profile" color={'#0f172a'} fs={fs} headingFont={headingFont} />
                        <p style={{ lineHeight: 1.6, fontSize: fs.body, color: '#475569' }}>
                            {personalInfo.summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <section className="mb-8 resume-section" data-paginate>
                        <SectionHeaderMain title="Experience" color={'#0f172a'} fs={fs} headingFont={headingFont} />
                        <div className="space-y-8">
                            {experience.map((exp) => (
                                <div key={exp.id}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, alignItems: 'baseline' }}>
                                        <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, textTransform: 'uppercase', color: '#334155' }}>
                                            {exp.title}
                                        </h4>
                                        <span style={{ fontSize: fs.small, color: accentColor, fontWeight: 600 }}>
                                            {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                                        </span>
                                    </div>
                                    <p style={{ fontSize: fs.body, fontWeight: 500, color: '#64748b', marginBottom: 6 }}>
                                        {exp.company}, {exp.city}
                                    </p>
                                    <p style={{ fontSize: fs.body, lineHeight: 1.6, color: '#475569' }}>
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
                        <SectionHeaderMain title="Education" color={'#0f172a'} fs={fs} headingFont={headingFont} />
                        <div className="space-y-6">
                            {education.map((edu) => (
                                <div key={edu.id}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                                        <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#334155' }}>
                                            {edu.degree}
                                        </h4>
                                        <span style={{ fontSize: fs.small, color: accentColor }}>
                                            {edu.startDate} – {edu.endDate || 'Present'}
                                        </span>
                                    </div>
                                    <p style={{ fontSize: fs.body, color: '#64748b' }}>
                                        {edu.school}, {edu.city}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Credentials (Certifications & Awards) */}
                {((certifications && certifications.length > 0) || (awards && awards.length > 0)) && (
                    <section className="mb-8 resume-section" data-paginate>
                        <SectionHeaderMain title="Credentials" color={'#0f172a'} fs={fs} headingFont={headingFont} />

                        {certifications && certifications.length > 0 && (
                            <div style={{ marginBottom: awards && awards.length > 0 ? 24 : 0 }}>
                                <h4 style={{ fontSize: fs.entryTitle, fontWeight: 600, color: '#475569', marginBottom: 12 }}>
                                    Certifications
                                </h4>
                                <div className="space-y-3">
                                    {certifications.map((cert) => (
                                        <div key={cert.id} data-paginate="item">
                                            <div style={{ fontWeight: 600, fontSize: fs.body, color: '#334155' }}>{cert.name}</div>
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
                                            <div style={{ fontWeight: 600, fontSize: fs.body, color: '#334155' }}>{award.title}</div>
                                            <div style={{ fontSize: fs.small, color: '#64748b' }}>{award.issuer} • {award.date}</div>
                                            {award.description && (
                                                <p style={{ fontSize: fs.small, color: '#475569', marginTop: 4, lineHeight: 1.5 }}>
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
function SectionHeader({ title, color, fs, headingFont }: { title: string, color: string, fs: ScaledFontSizes, headingFont: string }) {
    return (
        <h3
            style={{
                fontFamily: headingFont,
                fontSize: fs.sectionHeading,
                fontWeight: 700,
                color: color,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: 16,
                borderBottom: `1px solid ${color}40`,
                paddingBottom: 4
            }}
        >
            {title}
        </h3>
    );
}

function SectionHeaderMain({ title, color, fs, headingFont }: { title: string, color: string, fs: ScaledFontSizes, headingFont: string }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{ width: 40, height: 2, backgroundColor: color }}></div>
            <h3
                style={{
                    fontFamily: headingFont,
                    fontSize: fs.sectionHeading,
                    fontWeight: 800,
                    color: color,
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                }}
            >
                {title}
            </h3>
        </div>
    );
}

function ContactItem({ icon, text }: { icon: string, text: string }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: '1.2em' }}>{icon}</span>
            <span style={{ wordBreak: 'break-all' }}>{text}</span>
        </div>
    );
}

// Template metadata
export const headerBlueCleanMeta: TemplateMeta = {
    id: 'header-blue-clean',
    name: 'Blue Clean',
    category: 'header',
    thumbnail: '/templates/header-blue-clean.png',
    description: 'Clean sidebar layout with sky blue accent',
};

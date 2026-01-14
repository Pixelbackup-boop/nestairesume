'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';

/**
 * Header Decorative Template
 * Dark header with subtle geometric line pattern.
 * Photo overlaps the bottom edge of the header on the left.
 *
 * Layout:
 * - Header: Dark Grey (#1f1f1f) with SVG Line Pattern.
 * - Photo: Left-aligned, overlapping bottom edge.
 * - Name/Contact: Right-aligned in header, text white/yellow.
 * - Body: Two-column layout (Main Left, Sidebar Right).
 *
 * Matches reference: frontend/Resume-template/unique-layouts/16-decorative-pattern.webp
 */
export default function HeaderDecorative({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, awards, interests, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Merriweather');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes
    const fs = getScaledFontSizes(sizeConfig, scale);

    // Colors
    const headerBg = '#1f1f1f'; // Dark Grey/Black
    const accentColor = customThemeColor || '#eab308'; // Yellow 500

    // Dimensions
    const headerHeight = scale < 1 ? 100 : 180;
    const photoSize = scale < 1 ? 80 : 150;
    const photoOffset = photoSize / 3;

    return (
        <div
            className="w-full h-full"
            style={{
                fontFamily: bodyFont,
                fontSize: sizeConfig.base,
                backgroundColor: '#ffffff',
                color: '#374151',
                position: 'relative',
            }}
        >
            {/* Header Area */}
            <header
                style={{
                    height: headerHeight,
                    backgroundColor: headerBg,
                    position: 'relative',
                    marginBottom: photoOffset + (scale < 1 ? 20 : 40),
                    overflow: 'visible', // Allow photo to break out
                }}
            >
                {/* Decorative Pattern (SVG) */}
                <svg
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.1, pointerEvents: 'none' }}
                >
                    <pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                        <circle cx="20" cy="20" r="18" fill="none" stroke="white" strokeWidth="1" />
                    </pattern>
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)" />
                </svg>

                <div style={{
                    padding: scale < 1 ? '16px 20px' : '32px 40px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    position: 'relative',
                    zIndex: 10
                }}>
                    <h1 style={{
                        fontFamily: headingFont,
                        fontSize: fs.name,
                        fontWeight: 700,
                        color: 'white',
                        textAlign: 'right',
                        marginBottom: 4,
                        letterSpacing: '0.05em'
                    }}>
                        {personalInfo.fullName || 'Your Name'}
                    </h1>
                    <p style={{
                        fontSize: fs.jobTitle,
                        color: accentColor,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        textAlign: 'right',
                        marginBottom: 12
                    }}>
                        {personalInfo.jobTitle || 'Job Title'}
                    </p>

                    <div style={{
                        display: 'flex',
                        gap: 16,
                        flexWrap: 'wrap',
                        justifyContent: 'flex-end',
                        color: '#d1d5db', // Gray 300
                        fontSize: fs.small
                    }}>
                        {personalInfo.email && <span>{personalInfo.email}</span>}
                        {personalInfo.phone && <span>{personalInfo.phone}</span>}
                        {personalInfo.location && <span>{personalInfo.location}</span>}
                        {personalInfo.website && <span>{personalInfo.website}</span>}
                    </div>
                </div>

                {/* Overlapping Photo (Left Aligned) */}
                <div style={{
                    position: 'absolute',
                    bottom: -photoOffset,
                    left: scale < 1 ? 20 : 40,
                    width: photoSize,
                    height: photoSize,
                    borderRadius: '50%',
                    border: `6px solid #ffffff`,
                    overflow: 'hidden',
                    backgroundColor: '#e5e7eb',
                    zIndex: 20
                }}>
                    {personalInfo.profileImage ? (
                        <img
                            src={personalInfo.profileImage}
                            alt={personalInfo.fullName}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    ) : (
                        <div style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: fs.name,
                            color: '#9ca3af'
                        }}>
                            {personalInfo.fullName?.charAt(0) || '?'}
                        </div>
                    )}
                </div>
            </header>

            {/* Main Content Body */}
            <div style={{
                display: 'flex',
                gap: scale < 1 ? 20 : 40,
                padding: scale < 1 ? '0 20px 20px' : '0 40px 40px',
            }}>
                {/* Main Column (Left) */}
                <div style={{ width: '60%' }}>
                    {personalInfo.summary && (
                        <section className="mb-8 resume-section" data-paginate>
                            <SectionHeader title="Profile" icon="👤" accent={accentColor} fs={fs} headingFont={headingFont} />
                            <p style={{ lineHeight: 1.6, fontSize: fs.body }}>{personalInfo.summary}</p>
                        </section>
                    )}

                    {experience.length > 0 && (
                        <section className="mb-8 resume-section" data-paginate>
                            <SectionHeader title="Experience" icon="💼" accent={accentColor} fs={fs} headingFont={headingFont} />
                            <div className="space-y-6">
                                {experience.map((exp) => (
                                    <div key={exp.id}>
                                        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 2 }}>
                                            <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#111827' }}>{exp.title}</h4>
                                            <span style={{ fontSize: fs.small, color: '#6b7280', fontStyle: 'italic' }}>
                                                {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                                            </span>
                                        </div>
                                        <p style={{ fontSize: fs.body, fontWeight: 500, color: accentColor, marginBottom: 4 }}>
                                            {exp.company}, {exp.city}
                                        </p>
                                        <p style={{ fontSize: fs.body, lineHeight: 1.5 }}>
                                            {exp.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {education.length > 0 && (
                        <section className="mb-8 resume-section" data-paginate>
                            <SectionHeader title="Education" icon="🎓" accent={accentColor} fs={fs} headingFont={headingFont} />
                            <div className="space-y-4">
                                {education.map((edu) => (
                                    <div key={edu.id}>
                                        <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#111827' }}>{edu.degree}</h4>
                                        <p style={{ fontSize: fs.body, fontWeight: 500, color: accentColor }}>
                                            {edu.school}, {edu.city}
                                        </p>
                                        <p style={{ fontSize: fs.small, color: '#6b7280' }}>
                                            {edu.startDate} – {edu.endDate || 'Present'}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar (Right) */}
                <div style={{ width: '35%' }}>

                    {/* Skills */}
                    {skills.length > 0 && (
                        <section className="mb-8 resume-section" data-paginate>
                            <SectionHeader title="Skills" icon="🛠️" accent={accentColor} fs={fs} headingFont={headingFont} />
                            <div className="space-y-3">
                                {skills.map((skill) => (
                                    <div key={skill.id} data-paginate="item">
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2, fontSize: fs.body }}>
                                            <span style={{ fontWeight: 500 }}>{skill.name}</span>
                                        </div>
                                        {/* Stylized Progress Bar */}
                                        <div style={{ width: '100%', height: 6, backgroundColor: '#f3f4f6', borderRadius: 3 }}>
                                            <div style={{
                                                width: `${(skill.level || 3) * 20}%`,
                                                height: '100%',
                                                backgroundColor: accentColor,
                                                borderRadius: 3,
                                                backgroundImage: 'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)',
                                                backgroundSize: '1rem 1rem'
                                            }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Languages */}
                    {data.languages && data.languages.length > 0 && (
                        <section className="mb-8 resume-section" data-paginate>
                            <SectionHeader title="Languages" icon="🗣️" accent={accentColor} fs={fs} headingFont={headingFont} />
                            <div className="space-y-2">
                                {data.languages.map((lang) => (
                                    <div key={lang.id} data-paginate="item" style={{ display: 'flex', justifyContent: 'space-between', fontSize: fs.body }}>
                                        <span style={{ fontWeight: 500 }}>{lang.name}</span>
                                        <span style={{ fontSize: fs.small, color: '#6b7280' }}>{lang.proficiency}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Strengths */}
                    {data.strengths && data.strengths.length > 0 && (
                        <section className="mb-8 resume-section" data-paginate>
                            <SectionHeader title="Strengths" icon="⚡" accent={accentColor} fs={fs} headingFont={headingFont} />
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                {data.strengths.map((str) => (
                                    <span key={str.id} data-paginate="item" style={{
                                        fontSize: fs.small,
                                        fontWeight: 600,
                                        color: accentColor,
                                        border: `1px solid ${accentColor}`,
                                        padding: '2px 8px',
                                        borderRadius: 12
                                    }}>
                                        {str.name}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Interests */}
                    {interests && interests.length > 0 && (
                        <section className="mb-8 resume-section" data-paginate>
                            <SectionHeader title="Interests" icon="⭐" accent={accentColor} fs={fs} headingFont={headingFont} />
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                {interests.map((int) => (
                                    <span key={int.id} style={{
                                        fontSize: fs.small,
                                        backgroundColor: '#f3f4f6',
                                        padding: '4px 8px',
                                        borderRadius: 4,
                                        color: '#374151',
                                        borderLeft: `3px solid ${accentColor}`
                                    }}>
                                        {int.name}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Additional Details like Awards */}
                    {awards && awards.length > 0 && (
                        <section className="mb-8 resume-section" data-paginate>
                            <SectionHeader title="Awards" icon="🏆" accent={accentColor} fs={fs} headingFont={headingFont} />
                            <div className="space-y-4">
                                {awards.map((awr) => (
                                    <div key={awr.id} style={{ fontSize: fs.body }}>
                                        <p style={{ fontWeight: 700, color: '#111827' }}>{awr.title}</p>
                                        <p style={{ fontSize: fs.small, color: '#6b7280' }}>
                                            {awr.issuer} | {awr.date}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}

function SectionHeader({ title, icon, accent, fs, headingFont }: { title: string, icon: string, accent: string, fs: ScaledFontSizes, headingFont: string }) {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 16,
            borderBottom: '2px solid #f3f4f6',
            paddingBottom: 8
        }}>
            <span style={{ fontSize: fs.sectionHeading }}>{icon}</span>
            <h3 style={{
                fontFamily: headingFont,
                fontSize: fs.sectionHeading,
                fontWeight: 800,
                color: '#111827',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
            }}>
                {title}
            </h3>
        </div>
    );
}

// Template metadata
export const headerDecorativeMeta: TemplateMeta = {
    id: 'header-decorative',
    name: 'Decorative',
    category: 'header',
    thumbnail: '/templates/header-decorative.png',
    description: 'Modern dark header with geometric patterns',
};

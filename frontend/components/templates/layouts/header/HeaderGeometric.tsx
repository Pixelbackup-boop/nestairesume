'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';
import CircularProgress from '../../shared/CircularProgress';
import ProgressBar from '../../shared/ProgressBar';

/**
 * Header Geometric Template
 * Features a geometric pattern top decoration, dark header bar with centered name,
 * and a two-column body with section labels on the left.
 *
 * Layout:
 * - Geometric pattern decoration at top (Triangular Mesh)
 * - Dark header bar (#78350f) with centered name
 * - Two-column body: Labels LEFT (~25%), Content RIGHT (~75%)
 * - Circular charts for strengths
 *
 * Matches reference: frontend/Resume-template/unique-layouts/09-geometric-header.webp
 */
export default function HeaderGeometric({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, strengths, interests, certifications, awards, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Merriweather'); // Serif default
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes
    const fs = getScaledFontSizes(sizeConfig, scale);

    // Fixed colors
    const headerBgColor = '#78350f'; // Amber-900 (Dark Brown)
    const accentColor = customThemeColor || '#92400e'; // Amber-800 (Copper)
    const textColor = '#374151'; // Gray-700

    // Dimensions
    const patternHeight = scale < 1 ? 60 : 120;
    const headerHeight = scale < 1 ? 60 : 100;

    return (
        <div
            className="w-full h-full"
            style={{
                fontFamily: bodyFont,
                fontSize: sizeConfig.base,
                backgroundColor: '#ffffff',
                color: textColor,
            }}
        >
            {/* Geometric Pattern Decoration */}
            <div
                style={{
                    height: patternHeight,
                    backgroundColor: '#ffffff',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 800 120"
                    preserveAspectRatio="none"
                    style={{ position: 'absolute', top: 0, left: 0 }}
                >
                    {/* Triangular Mesh Pattern */}
                    <path d="M0 0 L200 120 L400 0 L600 120 L800 0 V120 H0 Z" fill="none" stroke={accentColor} strokeWidth="0.5" opacity="0.3" />
                    <path d="M0 120 L200 0 L400 120 L600 0 L800 120" fill="none" stroke={accentColor} strokeWidth="0.5" opacity="0.3" />
                    <path d="M100 0 L300 120 L500 0 L700 120" fill="none" stroke={accentColor} strokeWidth="0.5" opacity="0.3" />
                    {/* Random connection points for 'mesh' look */}
                    <circle cx="200" cy="60" r="2" fill={accentColor} opacity="0.6" />
                    <circle cx="400" cy="60" r="2" fill={accentColor} opacity="0.6" />
                    <circle cx="600" cy="60" r="2" fill={accentColor} opacity="0.6" />
                </svg>
            </div>

            {/* Header Bar - Dark Brown */}
            <header
                className="resume-section"
                data-paginate
                style={{
                    backgroundColor: headerBgColor,
                    color: '#ffffff',
                    padding: scale < 1 ? '10px 20px' : '20px 40px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                }}
            >
                <h1
                    style={{
                        fontFamily: headingFont,
                        fontSize: fs.name,
                        fontWeight: 400,
                        letterSpacing: '0.05em',
                        marginBottom: scale < 1 ? 4 : 8,
                    }}
                >
                    {personalInfo.fullName || 'Your Name'}
                </h1>

                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: scale < 1 ? '12px' : '24px',
                        fontSize: fs.small,
                        color: 'rgba(255,255,255,0.9)',
                    }}
                >
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                </div>
            </header>

            {/* Main Content Body */}
            <div style={{ padding: scale < 1 ? '20px' : '40px' }}>

                {/* Summary */}
                {personalInfo.summary && (
                    <SectionRow label="Profile" fs={fs} headingFont={headingFont} accentColor={accentColor} scale={scale}>
                        <p style={{ lineHeight: 1.6 }}>{personalInfo.summary}</p>
                    </SectionRow>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <SectionRow label="Experience" fs={fs} headingFont={headingFont} accentColor={accentColor} scale={scale}>
                        <div className="space-y-6">
                            {experience.map((exp) => (
                                <div key={exp.id}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                                        <h4 style={{ fontSize: fs.entryTitle, fontWeight: 700, color: '#1f2937' }}>
                                            {exp.title}
                                        </h4>
                                        <span style={{ fontSize: fs.small, color: '#6b7280' }}>
                                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                        </span>
                                    </div>
                                    <p style={{ color: accentColor, fontWeight: 600, fontSize: fs.body, marginBottom: 4 }}>
                                        {exp.company} {exp.city && `| ${exp.city}`}
                                    </p>
                                    {exp.description && (
                                        <p style={{ fontSize: fs.body, lineHeight: 1.5, color: '#4b5563' }}>
                                            {exp.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </SectionRow>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <SectionRow label="Education" fs={fs} headingFont={headingFont} accentColor={accentColor} scale={scale}>
                        <div className="space-y-4">
                            {education.map((edu) => (
                                <div key={edu.id}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                                        <h4 style={{ fontSize: fs.entryTitle, fontWeight: 700, color: '#1f2937' }}>
                                            {edu.degree}
                                        </h4>
                                        <span style={{ fontSize: fs.small, color: '#6b7280' }}>
                                            {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                                        </span>
                                    </div>
                                    <p style={{ color: accentColor, fontWeight: 600, fontSize: fs.body }}>
                                        {edu.school}, {edu.city}
                                    </p>
                                    {edu.description && (
                                        <p style={{ fontSize: fs.small, marginTop: 2 }}>{edu.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </SectionRow>
                )}

                {/* Core Strengths - Circular */}
                {strengths && strengths.length > 0 && (
                    <SectionRow label="Strengths" fs={fs} headingFont={headingFont} accentColor={accentColor} scale={scale}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: scale < 1 ? 15 : 30 }}>
                            {strengths.slice(0, 4).map((strength) => (
                                <div key={strength.id} data-paginate="item">
                                    <CircularProgress
                                        value={strength.level * 20} // Assuming 1-5 scale
                                        size={scale < 1 ? 50 : 80}
                                        color={accentColor}
                                        strokeWidth={4}
                                        label={strength.name}
                                        fontSize={scale < 1 ? 9 : 14}
                                        scale={scale}
                                    />
                                </div>
                            ))}
                        </div>
                    </SectionRow>
                )}

                {/* Skills */}
                {skills.length > 0 && (
                    <SectionRow label="Skills" fs={fs} headingFont={headingFont} accentColor={accentColor} scale={scale}>
                        <div className="space-y-2">
                            {skills.map((skill) => (
                                <div key={skill.id} data-paginate="item">
                                    <ProgressBar
                                        label={skill.name}
                                        value={(skill.level || 3) * 20}
                                        color={accentColor}
                                        height={scale < 1 ? 4 : 6}
                                        scale={1}
                                    />
                                </div>
                            ))}
                        </div>
                    </SectionRow>
                )}

                {/* Languages */}
                {data.languages && data.languages.length > 0 && (
                    <SectionRow label="Languages" fs={fs} headingFont={headingFont} accentColor={accentColor} scale={scale}>
                        <div className="space-y-2">
                            {data.languages.map((lang) => (
                                <div key={lang.id} data-paginate="item" style={{ display: 'flex', justifyContent: 'space-between', fontSize: fs.body, borderBottom: '1px solid #f3f4f6', paddingBottom: 4 }}>
                                    <span style={{ fontWeight: 600, color: '#1f2937' }}>{lang.name}</span>
                                    <span style={{ color: '#6b7280' }}>{lang.proficiency}</span>
                                </div>
                            ))}
                        </div>
                    </SectionRow>
                )}

                {/* Interests */}
                {data.interests && data.interests.length > 0 && (
                    <SectionRow label="Interests" fs={fs} headingFont={headingFont} accentColor={accentColor} scale={scale}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                            {data.interests.map((int) => (
                                <span key={int.id} style={{ fontSize: fs.body, color: '#374151', display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <span style={{ color: accentColor }}>◆</span> {int.name}
                                </span>
                            ))}
                        </div>
                    </SectionRow>
                )}

                {/* Credentials (Certifications & Awards) */}
                {((certifications && certifications.length > 0) || (awards && awards.length > 0)) && (
                    <SectionRow label="Credentials" fs={fs} headingFont={headingFont} accentColor={accentColor} scale={scale}>
                        {certifications && certifications.length > 0 && (
                            <div style={{ marginBottom: awards && awards.length > 0 ? 16 : 0 }}>
                                <h4 style={{ fontSize: fs.small, fontWeight: 600, color: '#6b7280', marginBottom: 8 }}>
                                    Certifications
                                </h4>
                                <div className="space-y-2">
                                    {certifications.map((cert) => (
                                        <div key={cert.id} data-paginate="item">
                                            <div style={{ fontWeight: 600, fontSize: fs.body, color: '#1f2937' }}>{cert.name}</div>
                                            <div style={{ fontSize: fs.small, color: '#6b7280' }}>{cert.issuer} • {cert.date}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {awards && awards.length > 0 && (
                            <div>
                                <h4 style={{ fontSize: fs.small, fontWeight: 600, color: '#6b7280', marginBottom: 8 }}>
                                    Awards & Achievements
                                </h4>
                                <div className="space-y-2">
                                    {awards.map((award) => (
                                        <div key={award.id} data-paginate="item">
                                            <div style={{ fontWeight: 600, fontSize: fs.body, color: '#1f2937' }}>{award.title}</div>
                                            <div style={{ fontSize: fs.small, color: '#6b7280' }}>{award.issuer} • {award.date}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </SectionRow>
                )}

            </div>
        </div>
    );
}

// Helper: Two-Column Section with Left Label
function SectionRow({ label, fs, headingFont, accentColor, scale, children }: {
    label: string,
    fs: ScaledFontSizes,
    headingFont: string,
    accentColor: string,
    scale: number,
    children: React.ReactNode
}) {
    return (
        <section
            className="resume-section"
            data-paginate
            style={{
                display: 'flex',
                marginBottom: scale < 1 ? 20 : 40,
                pageBreakInside: 'avoid'
            }}
        >
            {/* Left Column: Label */}
            <div style={{ width: '25%', paddingRight: 20 }}>
                <h3
                    style={{
                        fontFamily: headingFont,
                        fontSize: fs.sectionHeading,
                        color: accentColor,
                        textTransform: 'uppercase',
                        borderBottom: `2px solid ${accentColor}`,
                        paddingBottom: 4,
                        display: 'inline-block',
                        marginBottom: 0,
                    }}
                >
                    {label}
                </h3>
            </div>

            {/* Right Column: Content */}
            <div style={{ width: '75%' }}>
                {children}
            </div>
        </section>
    );
}

// Template metadata
export const headerGeometricMeta: TemplateMeta = {
    id: 'header-geometric',
    name: 'Geometric',
    category: 'header',
    thumbnail: '/templates/header-geometric.png',
    description: 'Professional layout with geometric pattern and side labels',
};

'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';
import ProgressBar from '../../shared/ProgressBar';

/**
 * Header Diagonal Yellow Template
 * Creative diagonal header with yellow background and angled cut.
 * Single-color schema - accent color applies to header and decorations.
 *
 * Layout:
 * - Diagonal header (yellow) with name LEFT, photo CENTER-RIGHT, contact TOP-RIGHT
 * - Two-column body: Left (Objective, Experience), Right (Education, Skills, Languages)
 * - Yellow accent bar on right edge
 *
 * Matches reference: frontend/Resume-template/unique-layouts/06-diagonal-header.webp
 */
export default function HeaderDiagonalYellow({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Inter');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes that respect user's size preference + scale
    const fs = getScaledFontSizes(sizeConfig, scale);

    // Single color preset - use customThemeColor or default yellow
    const accentColor = customThemeColor || '#f59e0b';

    // Calculate responsive sizes
    const headerHeight = scale < 1 ? 140 : 280;
    const photoSize = scale < 1 ? 60 : 120;

    return (
        <div
            className="w-full h-full"
            style={{
                fontFamily: bodyFont,
                fontSize: sizeConfig.base,
                backgroundColor: '#ffffff',
                position: 'relative',
            }}
        >
            {/* Right accent bar */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: scale < 1 ? '4px' : '8px',
                    height: '100%',
                    backgroundColor: accentColor,
                }}
            />

            {/* Diagonal Header */}
            <header
                className="resume-section"
                data-paginate
                style={{
                    position: 'relative',
                    height: headerHeight,
                    backgroundColor: accentColor,
                    clipPath: 'polygon(0 0, 100% 0, 100% 70%, 65% 100%, 0 100%)',
                    padding: scale < 1 ? '16px' : '32px',
                    paddingRight: scale < 1 ? '100px' : '200px',
                }}
            >
                {/* Name - Large stencil style */}
                <h1
                    style={{
                        fontFamily: headingFont,
                        fontSize: fs.name,
                        fontWeight: 900,
                        color: '#1f2937',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        lineHeight: 1.1,
                        maxWidth: scale < 1 ? '120px' : '240px',
                    }}
                >
                    {personalInfo.fullName || 'Your Name'}
                </h1>

                {/* Profile Photo - Positioned in header */}
                {personalInfo.profileImage && (
                    <div
                        style={{
                            position: 'absolute',
                            top: scale < 1 ? '30px' : '60px',
                            right: scale < 1 ? '110px' : '220px',
                        }}
                    >
                        <img
                            src={personalInfo.profileImage}
                            alt={personalInfo.fullName}
                            style={{
                                width: photoSize,
                                height: photoSize,
                                borderRadius: '50%',
                                objectFit: 'cover',
                                border: '3px solid white',
                            }}
                        />
                    </div>
                )}
            </header>

            {/* Contact Info - Top Right (outside diagonal) */}
            <div
                style={{
                    position: 'absolute',
                    top: scale < 1 ? '16px' : '32px',
                    right: scale < 1 ? '20px' : '40px',
                    textAlign: 'right',
                    fontSize: fs.body,
                    color: '#374151',
                }}
            >
                {personalInfo.phone && (
                    <div style={{ marginBottom: scale < 1 ? '2px' : '4px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                        <span>📱</span> {personalInfo.phone}
                    </div>
                )}
                {personalInfo.email && (
                    <div style={{ marginBottom: scale < 1 ? '2px' : '4px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                        <span>✉️</span> {personalInfo.email}
                    </div>
                )}
                {personalInfo.location && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                        <span>📍</span> {personalInfo.location}
                    </div>
                )}
            </div>

            {/* Two-Column Body */}
            <div style={{ display: 'flex', padding: scale < 1 ? '12px' : '24px', paddingRight: scale < 1 ? '16px' : '32px' }}>
                {/* LEFT COLUMN - Objective, Experience */}
                <div style={{ width: '50%', paddingRight: scale < 1 ? '12px' : '24px' }}>
                    {/* Resume Objective / Summary */}
                    {personalInfo.summary && (
                        <section className="mb-5 resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon="👤">
                                RESUME OBJECTIVE
                            </SectionHeader>
                            <p style={{ color: '#374151', lineHeight: 1.6, fontSize: fs.body }}>
                                {personalInfo.summary}
                            </p>
                        </section>
                    )}

                    {/* Work Experience */}
                    {experience.length > 0 && (
                        <section className="mb-5 resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon="📋">
                                WORK EXPERIENCE
                            </SectionHeader>
                            <div className="space-y-4">
                                {experience.map((exp) => (
                                    <div key={exp.id} className="resume-entry" data-paginate>
                                        <p style={{ fontSize: fs.small, color: '#6b7280', marginBottom: '2px' }}>
                                            📅 {exp.startDate} – {exp.current ? 'PRESENT' : exp.endDate}
                                            {exp.city && ` 📍 ${exp.city}`}
                                        </p>
                                        <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#1f2937', marginBottom: '2px' }}>
                                            {exp.title}
                                        </h4>
                                        <p style={{ fontSize: fs.body, color: '#4b5563', fontWeight: 600, marginBottom: '4px' }}>
                                            {exp.company}
                                        </p>
                                        {exp.description && (
                                            <ul style={{ paddingLeft: scale < 1 ? '12px' : '16px', margin: 0, listStyle: 'disc' }}>
                                                {exp.description.split('\n').filter(Boolean).map((line, idx) => (
                                                    <li key={idx} style={{ fontSize: fs.small, color: '#4b5563', marginBottom: '2px', lineHeight: 1.5 }}>
                                                        {line.replace(/^[-•]\s*/, '')}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* RIGHT COLUMN - Education, Skills, Languages */}
                <div style={{ width: '50%', paddingLeft: scale < 1 ? '12px' : '24px' }}>
                    {/* Education */}
                    {education.length > 0 && (
                        <section className="mb-5 resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon="🎓">
                                EDUCATION
                            </SectionHeader>
                            <div className="space-y-3">
                                {education.map((edu) => (
                                    <div key={edu.id} className="resume-entry" data-paginate>
                                        <p style={{ fontSize: fs.small, color: '#6b7280', marginBottom: '2px' }}>
                                            📅 {edu.startDate} – {edu.current ? 'PRESENT' : edu.endDate}
                                            {edu.city && ` 📍 ${edu.city}`}
                                        </p>
                                        <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#1f2937', marginBottom: '2px' }}>
                                            {edu.degree}
                                        </h4>
                                        <p style={{ fontSize: fs.body, color: '#4b5563', fontWeight: 600 }}>
                                            {edu.school}
                                        </p>
                                        {edu.description && (
                                            <p style={{ fontSize: fs.small, color: '#6b7280', marginTop: '4px' }}>
                                                {edu.description}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills with Progress Bars */}
                    {skills.length > 0 && (
                        <section className="mb-5 resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon="⚙️">
                                SKILLS
                            </SectionHeader>
                            <div className="space-y-2">
                                {skills.map((skill) => (
                                    <ProgressBar
                                        key={skill.id}
                                        label={skill.name}
                                        value={skill.level * 20}
                                        color={accentColor}
                                        height={6}
                                        scale={scale}
                                    />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Languages */}
                    {languages && languages.length > 0 && (
                        <section className="resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon="🌐">
                                LANGUAGES
                            </SectionHeader>
                            <div className="space-y-1">
                                {languages.map((lang) => (
                                    <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: fs.body }}>
                                        <span style={{ color: '#374151' }}>{lang.name}</span>
                                        <span style={{ color: accentColor, fontWeight: 600, textTransform: 'capitalize' }}>
                                            {lang.proficiency}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>

            {/* Footer Contact */}
            <div
                style={{
                    position: 'absolute',
                    bottom: scale < 1 ? '12px' : '24px',
                    right: scale < 1 ? '20px' : '40px',
                    textAlign: 'right',
                    fontSize: fs.small,
                    color: '#6b7280',
                }}
            >
                {personalInfo.location && <div>📍 {personalInfo.location}</div>}
                {personalInfo.website && <div>🌐 {personalInfo.website}</div>}
            </div>
        </div>
    );
}

// Section Header with Icon
interface SectionHeaderProps {
    fs: ScaledFontSizes;
    headingFont: string;
    accentColor: string;
    icon: string;
    children: React.ReactNode;
}

function SectionHeader({ fs, headingFont, accentColor, icon, children }: SectionHeaderProps) {
    const basePx = parseInt(fs.body);
    const isSmall = basePx < 10;

    return (
        <h3
            style={{
                fontFamily: headingFont,
                fontSize: fs.sectionHeading,
                fontWeight: 800,
                color: '#1f2937',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: isSmall ? '8px' : '14px',
                display: 'flex',
                alignItems: 'center',
                gap: isSmall ? '4px' : '8px',
            }}
        >
            <span style={{ fontSize: fs.sectionHeading }}>{icon}</span>
            {children}
        </h3>
    );
}

// Template metadata for registry
export const headerDiagonalYellowMeta: TemplateMeta = {
    id: 'header-diagonal-yellow',
    name: 'Diagonal Yellow',
    category: 'header',
    thumbnail: '/templates/header-diagonal-yellow.png',
    description: 'Creative diagonal header with bold yellow accent',
};

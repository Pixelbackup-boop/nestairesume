'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';
import CircularProgress from '../../shared/CircularProgress';
import ProgressBar from '../../shared/ProgressBar';

/**
 * Header Dark Box Template
 * Distinctive dark box containing only the name, with contact info beside it.
 * Single-color schema - accent applies to name box and section headers.
 *
 * Layout:
 * - Dark box with name (top-left), contact info (top-right)
 * - Two-column body: Left (Objective, Experience, Education), Right (Education, Skills with circles, Computer Skills)
 *
 * Matches reference: frontend/Resume-template/unique-layouts/08-header-box.webp
 */
export default function HeaderDarkBox({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, strengths, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Inter');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes that respect user's size preference + scale
    const fs = getScaledFontSizes(sizeConfig, scale);

    // Single color preset - use customThemeColor or default Blue 600 (Vibrant)
    const accentColor = customThemeColor || '#2563eb';

    return (
        <div
            className="w-full h-full"
            style={{
                fontFamily: bodyFont,
                fontSize: sizeConfig.base,
                backgroundColor: '#ffffff',
                padding: scale < 1 ? '20px' : '40px',
            }}
        >
            {/* Header Area */}
            <header
                className="resume-section"
                data-paginate
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: scale < 1 ? '24px' : '48px',
                }}
            >
                {/* Name Box - Solid Vibrant Blue */}
                <div
                    style={{
                        backgroundColor: accentColor,
                        padding: scale < 1 ? '20px 30px' : '40px 60px',
                        display: 'inline-block',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    }}
                >
                    <h1
                        style={{
                            fontFamily: headingFont,
                            fontSize: fs.name,
                            fontWeight: 900, // Black weight
                            color: '#ffffff',
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                            margin: 0,
                            lineHeight: 1,
                        }}
                    >
                        {personalInfo.fullName || 'Your Name'}
                    </h1>
                </div>

                {/* Contact Info - Right Aligned */}
                <div
                    style={{
                        textAlign: 'right', // Changed to Right to match "opposite"
                        fontSize: fs.body,
                        color: '#374151',
                        lineHeight: 1.8,
                        paddingTop: 10,
                    }}
                >
                    {personalInfo.phone && (
                        <div><strong>Phone:</strong> {personalInfo.phone}</div>
                    )}
                    {personalInfo.email && (
                        <div><strong>Email:</strong> {personalInfo.email}</div>
                    )}
                    {personalInfo.website && (
                        <div><strong>Web:</strong> {personalInfo.website}</div>
                    )}
                    {personalInfo.location && (
                        <div><strong>Loc:</strong> {personalInfo.location}</div>
                    )}
                </div>
            </header>

            {/* Two-Column Body */}
            <div style={{ display: 'flex', gap: scale < 1 ? '24px' : '48px' }}>
                {/* LEFT COLUMN */}
                <div style={{ width: '60%' }}>
                    {/* Resume Objective / Summary */}
                    {personalInfo.summary && (
                        <section className="mb-6 resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon="👤">
                                Profile
                            </SectionHeader>
                            <p style={{ color: '#374151', lineHeight: 1.6, fontSize: fs.body }}>
                                {personalInfo.summary}
                            </p>
                        </section>
                    )}

                    {/* Work Experience */}
                    {experience.length > 0 && (
                        <section className="mb-6 resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon="💼">
                                Experience
                            </SectionHeader>
                            <div className="space-y-5">
                                {experience.map((exp) => (
                                    <div key={exp.id} className="resume-entry" data-paginate>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                                            <h4 style={{ fontWeight: 800, fontSize: fs.entryTitle, color: '#1f2937' }}>
                                                {exp.title}
                                            </h4>
                                            <span style={{ fontSize: fs.small, color: '#6b7280', fontWeight: 500 }}>
                                                {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                                            </span>
                                        </div>

                                        <p style={{ fontSize: fs.body, color: accentColor, fontWeight: 700, marginBottom: '6px', textTransform: 'uppercase' }}>
                                            {exp.company} {exp.city && `| ${exp.city}`}
                                        </p>
                                        {exp.description && (
                                            <p style={{ fontSize: fs.body, color: '#4b5563', lineHeight: 1.5 }}>
                                                {exp.description}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education (Left Column) */}
                    {education.length > 0 && (
                        <section className="mb-6 resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon="🎓">
                                Education
                            </SectionHeader>
                            <div className="space-y-4">
                                {education.slice(0, 2).map((edu) => (
                                    <div key={edu.id} className="resume-entry" data-paginate>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                                            <h4 style={{ fontWeight: 800, fontSize: fs.entryTitle, color: '#1f2937' }}>
                                                {edu.degree}
                                            </h4>
                                            <span style={{ fontSize: fs.small, color: '#6b7280', fontWeight: 500 }}>
                                                {edu.startDate} – {edu.endDate || 'Present'}
                                            </span>
                                        </div>
                                        <p style={{ fontSize: fs.body, color: accentColor, fontWeight: 700 }}>
                                            {edu.school} {edu.city && `| ${edu.city}`}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* RIGHT COLUMN */}
                <div style={{ width: '40%' }}>
                    {/* Education (Right Column - additional) */}
                    {education.length > 2 && (
                        <section className="mb-6 resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon="🎓">
                                Education (Cont.)
                            </SectionHeader>
                            <div className="space-y-4">
                                {education.slice(2).map((edu) => (
                                    <div key={edu.id} className="resume-entry" data-paginate>
                                        <h4 style={{ fontWeight: 800, fontSize: fs.entryTitle, color: '#1f2937', marginBottom: '4px' }}>
                                            {edu.degree}
                                        </h4>
                                        <p style={{ fontSize: fs.body, color: accentColor, fontWeight: 700, marginBottom: '2px' }}>
                                            {edu.school}
                                        </p>
                                        <span style={{ fontSize: fs.small, color: '#6b7280' }}>
                                            {edu.startDate} – {edu.endDate || 'Present'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills (Circular) */}
                    {skills.length > 0 && (
                        <section className="mb-6 resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon="🤝">
                                Skills
                            </SectionHeader>
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(3, 1fr)',
                                    gap: scale < 1 ? '10px' : '20px',
                                    marginTop: 10,
                                }}
                            >
                                {skills.map((skill) => (
                                    <CircularProgress
                                        key={skill.id}
                                        value={skill.level ? skill.level * 20 : 80}
                                        size={scale < 1 ? 50 : 80}
                                        color={accentColor}
                                        strokeWidth={scale < 1 ? 5 : 8}
                                        fontSize={scale < 1 ? 8 : 12}
                                        label={skill.name}
                                        labelFontSize={scale < 1 ? 8 : 11}
                                        scale={1}
                                    />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Strengths (Bars) */}
                    {strengths && strengths.length > 0 && (
                        <section className="mb-6 resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon="💻">
                                Expertise
                            </SectionHeader>
                            <div className="space-y-3">
                                {strengths.map((str) => (
                                    <ProgressBar
                                        key={str.id}
                                        label={str.name}
                                        value={100} // Solid bars for expertise
                                        color={accentColor}
                                        height={scale < 1 ? 6 : 10}
                                        scale={1}
                                    />
                                ))}
                            </div>
                        </section>
                    )}
                </div>
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
                fontWeight: 700,
                color: accentColor,
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
export const headerDarkBoxMeta: TemplateMeta = {
    id: 'header-dark-box',
    name: 'Dark Box',
    category: 'header',
    thumbnail: '/templates/header-dark-box.png',
    description: 'Professional header with dark name box and circular skill indicators',
};

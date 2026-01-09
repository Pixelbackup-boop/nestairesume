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

    // Single color preset - use customThemeColor or default dark blue
    const accentColor = customThemeColor || '#1e3a5f';

    return (
        <div
            className="w-full h-full"
            style={{
                fontFamily: bodyFont,
                fontSize: sizeConfig.base,
                backgroundColor: '#ffffff',
                padding: scale < 1 ? '16px' : '32px',
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
                    marginBottom: scale < 1 ? '16px' : '32px',
                }}
            >
                {/* Name Box */}
                <div
                    style={{
                        backgroundColor: accentColor,
                        padding: scale < 1 ? '16px 24px' : '32px 48px',
                        display: 'inline-block',
                    }}
                >
                    <h1
                        style={{
                            fontFamily: headingFont,
                            fontSize: fs.name,
                            fontWeight: 700,
                            color: '#ffffff',
                            letterSpacing: '0.02em',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {personalInfo.fullName || 'Your Name'}
                    </h1>
                </div>

                {/* Contact Info */}
                <div
                    style={{
                        textAlign: 'left',
                        fontSize: fs.body,
                        color: '#374151',
                        lineHeight: 1.8,
                    }}
                >
                    {personalInfo.phone && (
                        <div><strong>Phone number:</strong> {personalInfo.phone}</div>
                    )}
                    {personalInfo.email && (
                        <div><strong>Email address:</strong> {personalInfo.email}</div>
                    )}
                    {personalInfo.website && (
                        <div><strong>Web:</strong> {personalInfo.website}</div>
                    )}
                    {personalInfo.location && (
                        <div><strong>Location:</strong> {personalInfo.location}</div>
                    )}
                </div>
            </header>

            {/* Two-Column Body */}
            <div style={{ display: 'flex', gap: scale < 1 ? '16px' : '32px' }}>
                {/* LEFT COLUMN */}
                <div style={{ width: '55%' }}>
                    {/* Resume Objective / Summary */}
                    {personalInfo.summary && (
                        <section className="mb-5 resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon="👤">
                                Resume objective
                            </SectionHeader>
                            <p style={{ color: '#374151', lineHeight: 1.6, fontSize: fs.body }}>
                                {personalInfo.summary}
                            </p>
                        </section>
                    )}

                    {/* Work Experience */}
                    {experience.length > 0 && (
                        <section className="mb-5 resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon="💼">
                                Work experience
                            </SectionHeader>
                            <div className="space-y-4">
                                {experience.map((exp) => (
                                    <div key={exp.id} className="resume-entry" data-paginate>
                                        <p style={{ fontSize: fs.small, color: '#6b7280', marginBottom: '2px' }}>
                                            {exp.startDate} – {exp.current ? 'PRESENT' : exp.endDate}
                                            {exp.city && `    ${exp.city.toUpperCase()}`}
                                        </p>
                                        <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#1f2937', marginBottom: '2px' }}>
                                            {exp.title}
                                        </h4>
                                        <p style={{ fontSize: fs.body, color: accentColor, fontWeight: 600, marginBottom: '4px' }}>
                                            {exp.company}
                                        </p>
                                        {exp.description && (
                                            <p style={{ fontSize: fs.small, color: '#4b5563', lineHeight: 1.5 }}>
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
                        <section className="mb-5 resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon="🎓">
                                Education
                            </SectionHeader>
                            <div className="space-y-3">
                                {education.slice(0, 2).map((edu) => (
                                    <div key={edu.id} className="resume-entry" data-paginate>
                                        <p style={{ fontSize: fs.small, color: '#6b7280', marginBottom: '2px' }}>
                                            {edu.startDate}    {edu.city?.toUpperCase()}
                                        </p>
                                        <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#1f2937', marginBottom: '2px' }}>
                                            {edu.degree}
                                        </h4>
                                        <p style={{ fontSize: fs.body, color: accentColor, fontWeight: 600 }}>
                                            {edu.school}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* RIGHT COLUMN */}
                <div style={{ width: '45%' }}>
                    {/* Education (Right Column - additional) */}
                    {education.length > 2 && (
                        <section className="mb-5 resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon="🎓">
                                Education
                            </SectionHeader>
                            <div className="space-y-3">
                                {education.slice(2).map((edu) => (
                                    <div key={edu.id} className="resume-entry" data-paginate>
                                        <p style={{ fontSize: fs.small, color: '#6b7280', marginBottom: '2px' }}>
                                            {edu.startDate}    {edu.city?.toUpperCase()}
                                        </p>
                                        <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#1f2937', marginBottom: '2px' }}>
                                            {edu.degree}
                                        </h4>
                                        <p style={{ fontSize: fs.body, color: accentColor, fontWeight: 600 }}>
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

                    {/* Interpersonal Skills (Circular Progress) */}
                    {strengths && strengths.length > 0 && (
                        <section className="mb-5 resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon="🤝">
                                Interpersonal skills
                            </SectionHeader>
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(3, 1fr)',
                                    gap: scale < 1 ? '8px' : '16px',
                                }}
                            >
                                {strengths.slice(0, 6).map((strength) => (
                                    <CircularProgress
                                        key={strength.id}
                                        value={strength.level}
                                        size={scale < 1 ? 40 : 70}
                                        color={accentColor}
                                        strokeWidth={scale < 1 ? 4 : 6}
                                        fontSize={scale < 1 ? 10 : 16}
                                        label={strength.name}
                                        labelFontSize={scale < 1 ? 6 : 9}
                                        scale={1}
                                    />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Computer Skills (Progress Bars) */}
                    {skills.length > 0 && (
                        <section className="mb-5 resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon="💻">
                                Computer skills
                            </SectionHeader>
                            <p style={{ fontSize: fs.small, color: '#6b7280', marginBottom: scale < 1 ? '6px' : '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                — SOFTWARE
                            </p>
                            <div className="space-y-2">
                                {skills.map((skill) => (
                                    <ProgressBar
                                        key={skill.id}
                                        label={skill.name}
                                        value={skill.level * 20}
                                        color={accentColor}
                                        height={scale < 1 ? 4 : 6}
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

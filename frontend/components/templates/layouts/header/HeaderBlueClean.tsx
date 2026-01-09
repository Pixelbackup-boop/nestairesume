'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';

/**
 * Header Blue Clean Template
 * Light blue header with job title above name. Photo on left side.
 * Two-column body with contact/skills/awards on left, experience/education on right.
 *
 * Layout:
 * - Light blue header with photo left, job title + name right
 * - Summary below header
 * - Two-column body: Left (Contact, Skills, Awards), Right (Experience, Education)
 * - Section headers with spaced-out letters
 *
 * Matches reference: frontend/Canva/Blue Clean Professional CV Resume.jpg
 */
export default function HeaderBlueClean({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, awards, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Inter');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes that respect user's size preference + scale
    const fs = getScaledFontSizes(sizeConfig, scale);

    // Single color preset - use customThemeColor or default blue
    const accentColor = customThemeColor || '#2563eb';
    const headerBgColor = '#dbeafe'; // Light blue background

    // Calculate responsive sizes
    const photoSize = scale < 1 ? 60 : 120;

    return (
        <div
            className="w-full h-full"
            style={{
                fontFamily: bodyFont,
                fontSize: sizeConfig.base,
                backgroundColor: '#ffffff',
            }}
        >
            {/* Header */}
            <header
                className="resume-section"
                data-paginate
                style={{
                    backgroundColor: headerBgColor,
                    display: 'flex',
                    alignItems: 'center',
                    gap: scale < 1 ? 16 : 32,
                    padding: scale < 1 ? 16 : 32,
                }}
            >
                {/* Circular Photo */}
                <div>
                    {personalInfo.profileImage ? (
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
                    ) : (
                        <div
                            style={{
                                width: photoSize,
                                height: photoSize,
                                borderRadius: '50%',
                                backgroundColor: '#bfdbfe',
                                border: '3px solid white',
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

                {/* Name and Job Title */}
                <div>
                    {personalInfo.jobTitle && (
                        <p
                            style={{
                                fontSize: fs.small,
                                color: '#64748b',
                                letterSpacing: '0.3em',
                                textTransform: 'uppercase',
                                marginBottom: scale < 1 ? 2 : 4,
                            }}
                        >
                            {personalInfo.jobTitle}
                        </p>
                    )}
                    <h1
                        style={{
                            fontFamily: headingFont,
                            fontSize: fs.name,
                            fontWeight: 400,
                            color: '#1f2937',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                        }}
                    >
                        {personalInfo.fullName || 'Your Name'}
                    </h1>
                </div>
            </header>

            {/* Summary Section */}
            {personalInfo.summary && (
                <div
                    className="resume-section"
                    data-paginate
                    style={{
                        padding: scale < 1 ? '12px 16px' : '24px 32px',
                        borderBottom: '1px solid #e5e7eb',
                    }}
                >
                    <p style={{ color: '#4b5563', lineHeight: 1.6, fontSize: fs.body, fontStyle: 'italic' }}>
                        {personalInfo.summary}
                    </p>
                </div>
            )}

            {/* Two-Column Body */}
            <div
                style={{
                    display: 'flex',
                    padding: scale < 1 ? 16 : 32,
                    gap: scale < 1 ? 16 : 32,
                }}
            >
                {/* LEFT COLUMN - Contact, Skills, Awards */}
                <div style={{ width: '35%' }}>
                    {/* Contact */}
                    <section className="mb-4 resume-section" data-paginate>
                        <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor}>
                            CONTACT
                        </SectionHeader>
                        <div className="space-y-2">
                            {personalInfo.phone && (
                                <ContactItem icon="📱" text={personalInfo.phone} fs={fs} scale={scale} />
                            )}
                            {personalInfo.email && (
                                <ContactItem icon="✉️" text={personalInfo.email} fs={fs} scale={scale} />
                            )}
                            {personalInfo.location && (
                                <ContactItem icon="📍" text={personalInfo.location} fs={fs} scale={scale} />
                            )}
                        </div>
                    </section>

                    {/* Skills */}
                    {skills.length > 0 && (
                        <section className="mb-4 resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor}>
                                SKILLS
                            </SectionHeader>
                            <ul style={{ paddingLeft: scale < 1 ? '10px' : '14px', margin: 0, listStyle: 'disc' }}>
                                {skills.map((skill) => (
                                    <li key={skill.id} style={{ fontSize: fs.body, color: '#374151', marginBottom: '4px' }}>
                                        {skill.name}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Awards */}
                    {awards && awards.length > 0 && (
                        <section className="resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor}>
                                AWARD
                            </SectionHeader>
                            <ul style={{ paddingLeft: scale < 1 ? '10px' : '14px', margin: 0, listStyle: 'disc' }}>
                                {awards.map((award) => (
                                    <li key={award.id} style={{ fontSize: fs.body, color: '#374151', marginBottom: '6px' }}>
                                        {award.title}
                                        {award.date && (
                                            <span style={{ color: '#6b7280', fontSize: fs.small }}> ({award.date})</span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </div>

                {/* RIGHT COLUMN - Experience, Education */}
                <div style={{ width: '65%' }}>
                    {/* Experience */}
                    {experience.length > 0 && (
                        <section className="mb-4 resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor}>
                                EXPERIENCE
                            </SectionHeader>
                            <div className="space-y-4">
                                {experience.map((exp) => (
                                    <div key={exp.id} className="resume-entry" data-paginate>
                                        <h4
                                            style={{
                                                fontWeight: 700,
                                                fontSize: fs.entryTitle,
                                                color: '#1f2937',
                                                textTransform: 'uppercase',
                                                marginBottom: '2px',
                                            }}
                                        >
                                            {exp.title}
                                        </h4>
                                        <p style={{ fontSize: fs.body, color: '#4b5563', marginBottom: '2px' }}>
                                            {exp.company}
                                        </p>
                                        <p style={{ fontSize: fs.small, color: accentColor, marginBottom: '6px' }}>
                                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                        </p>
                                        {exp.description && (
                                            <ul style={{ paddingLeft: scale < 1 ? '10px' : '14px', margin: 0, listStyle: 'disc' }}>
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

                    {/* Education */}
                    {education.length > 0 && (
                        <section className="resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor}>
                                EDUCATION
                            </SectionHeader>
                            <div className="space-y-3">
                                {education.map((edu) => (
                                    <div key={edu.id} className="resume-entry" data-paginate>
                                        <p style={{ fontSize: fs.small, color: accentColor, marginBottom: '2px' }}>
                                            {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                                        </p>
                                        <h4
                                            style={{
                                                fontWeight: 700,
                                                fontSize: fs.entryTitle,
                                                color: '#1f2937',
                                                textTransform: 'uppercase',
                                                marginBottom: '2px',
                                            }}
                                        >
                                            {edu.school}
                                        </h4>
                                        <p style={{ fontSize: fs.body, color: '#4b5563' }}>
                                            {edu.degree}
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

// Contact Item with Icon
interface ContactItemProps {
    icon: string;
    text: string;
    fs: ScaledFontSizes;
    scale: number;
}

function ContactItem({ icon, text, fs, scale }: ContactItemProps) {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: scale < 1 ? 6 : 10,
                marginBottom: scale < 1 ? 4 : 8,
                fontSize: fs.body,
                color: '#374151',
            }}
        >
            <span style={{ fontSize: fs.body }}>{icon}</span>
            <span>{text}</span>
        </div>
    );
}

// Section Header with Spaced Letters
interface SectionHeaderProps {
    fs: ScaledFontSizes;
    headingFont: string;
    accentColor: string;
    children: React.ReactNode;
}

function SectionHeader({ fs, headingFont, accentColor, children }: SectionHeaderProps) {
    const basePx = parseInt(fs.body);
    const isSmall = basePx < 10;

    return (
        <h3
            style={{
                fontFamily: headingFont,
                fontSize: fs.sectionHeading,
                fontWeight: 600,
                color: accentColor,
                letterSpacing: '0.2em',
                marginBottom: isSmall ? '8px' : '14px',
            }}
        >
            {children}
        </h3>
    );
}

// Template metadata for registry
export const headerBlueCleanMeta: TemplateMeta = {
    id: 'header-blue-clean',
    name: 'Blue Clean',
    category: 'header',
    thumbnail: '/templates/header-blue-clean.png',
    description: 'Clean professional template with light blue header',
};

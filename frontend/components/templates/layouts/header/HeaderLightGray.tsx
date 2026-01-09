'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';

/**
 * Header Light Gray Template
 * Light gray/blue header with name and job title. Clean, professional styling.
 * Two-column body with contact/skills/education on left, profile/experience on right.
 *
 * Layout:
 * - Light gray header with name, job title, and circular photo right
 * - Two-column body: Left (Contact icons, Skills list, Education), Right (Profile, Experience)
 * - Section headers with spaced-out letters
 *
 * Matches reference: frontend/Canva/Grey Clean CV Resume Photo.jpg
 */
export default function HeaderLightGray({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Inter');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes that respect user's size preference + scale
    const fs = getScaledFontSizes(sizeConfig, scale);

    // Single color preset - use customThemeColor or default slate gray
    const accentColor = customThemeColor || '#64748b';
    const headerBgColor = '#e2e8f0'; // Light gray/blue background

    // Calculate responsive sizes
    const headerHeight = scale < 1 ? 80 : 160;
    const photoSize = scale < 1 ? 50 : 100;

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
                    height: headerHeight,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: scale < 1 ? '0 16px' : '0 32px',
                    position: 'relative',
                }}
            >
                {/* Name and Job Title */}
                <div>
                    <h1
                        style={{
                            fontFamily: headingFont,
                            fontSize: fs.name,
                            fontWeight: 400,
                            color: '#1f2937',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            marginBottom: scale < 1 ? 2 : 4,
                        }}
                    >
                        {personalInfo.fullName || 'Your Name'}
                    </h1>
                    {personalInfo.jobTitle && (
                        <p
                            style={{
                                fontSize: fs.small,
                                color: '#64748b',
                                letterSpacing: '0.3em',
                                textTransform: 'uppercase',
                            }}
                        >
                            {personalInfo.jobTitle}
                        </p>
                    )}
                </div>

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
                                backgroundColor: '#cbd5e1',
                                border: '3px solid white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: fs.name,
                                color: '#64748b',
                            }}
                        >
                            {personalInfo.fullName?.charAt(0) || '?'}
                        </div>
                    )}
                </div>
            </header>

            {/* Two-Column Body */}
            <div
                style={{
                    display: 'flex',
                    padding: scale < 1 ? 16 : 32,
                    gap: scale < 1 ? 16 : 32,
                }}
            >
                {/* LEFT COLUMN - Contact, Skills, Education */}
                <div style={{ width: '35%' }}>
                    {/* Contact Info */}
                    <div style={{ marginBottom: scale < 1 ? 16 : 32 }}>
                        {personalInfo.phone && (
                            <ContactItem icon="📱" text={personalInfo.phone} fs={fs} scale={scale} />
                        )}
                        {personalInfo.email && (
                            <ContactItem icon="✉️" text={personalInfo.email} fs={fs} scale={scale} />
                        )}
                        {personalInfo.location && (
                            <ContactItem icon="📍" text={personalInfo.location} fs={fs} scale={scale} />
                        )}
                        {personalInfo.website && (
                            <ContactItem icon="🌐" text={personalInfo.website} fs={fs} scale={scale} />
                        )}
                    </div>

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

                    {/* Education */}
                    {education.length > 0 && (
                        <section className="resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor}>
                                EDUCATION
                            </SectionHeader>
                            <div className="space-y-3">
                                {education.map((edu) => (
                                    <div key={edu.id} className="resume-entry" data-paginate>
                                        <h4
                                            style={{
                                                fontWeight: 700,
                                                fontSize: fs.entryTitle,
                                                color: '#1f2937',
                                                textTransform: 'uppercase',
                                                marginBottom: '2px',
                                            }}
                                        >
                                            {edu.degree}
                                        </h4>
                                        <p style={{ fontSize: fs.body, color: '#4b5563', marginBottom: '2px' }}>
                                            {edu.school}
                                        </p>
                                        <p style={{ fontSize: fs.small, color: accentColor }}>
                                            {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* RIGHT COLUMN - Profile, Experience */}
                <div style={{ width: '65%' }}>
                    {/* Profile / Summary */}
                    {personalInfo.summary && (
                        <section className="mb-4 resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor}>
                                PROFILE
                            </SectionHeader>
                            <p style={{ color: '#374151', lineHeight: 1.6, fontSize: fs.body, fontStyle: 'italic' }}>
                                {personalInfo.summary}
                            </p>
                        </section>
                    )}

                    {/* Experience */}
                    {experience.length > 0 && (
                        <section className="resume-section" data-paginate>
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
                marginBottom: scale < 1 ? 6 : 10,
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
                fontWeight: 400,
                color: accentColor,
                letterSpacing: '0.25em',
                marginBottom: isSmall ? '8px' : '14px',
                borderBottom: `1px solid ${accentColor}`,
                paddingBottom: isSmall ? '4px' : '8px',
            }}
        >
            {children}
        </h3>
    );
}

// Template metadata for registry
export const headerLightGrayMeta: TemplateMeta = {
    id: 'header-light-gray',
    name: 'Light Gray',
    category: 'header',
    thumbnail: '/templates/header-light-gray.png',
    description: 'Clean professional template with light gray header and spaced section titles',
};

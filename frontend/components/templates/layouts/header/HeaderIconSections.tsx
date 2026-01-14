'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';
import ProgressBar from '../../shared/ProgressBar';

/**
 * Header Icon Sections Template
 * Stacked sections where each section is enclosed in a box with a black border.
 * Distinctive Cyan background and Orange accents.
 *
 * Layout:
 * - Page Background: Cyan 50 (#ecfeff)
 * - Header: Photo Left, Name Right
 * - Body: Single Column, Stacked Boxes
 * - Stylus: Black borders around everything.
 *
 * Matches reference: frontend/Resume-template/unique-layouts/27-icon-section-headers.webp 
 * (Note: Reference name implies icons, but description highlights the Boxes & Cyan)
 */
export default function HeaderIconSections({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, strengths, awards, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Merriweather');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes
    const fs = getScaledFontSizes(sizeConfig, scale);

    // Colors
    const orangeAccent = customThemeColor || '#ea580c'; // Orange 600
    const pageBg = '#ecfeff'; // Cyan 50
    const borderColor = '#000000';

    // Dimensions
    const photoSize = scale < 1 ? 80 : 140;

    return (
        <div
            className="w-full h-full"
            style={{
                fontFamily: bodyFont,
                fontSize: sizeConfig.base,
                backgroundColor: pageBg,
                color: '#000000',
                padding: scale < 1 ? '16px' : '32px',
            }}
        >
            {/* Header Box */}
            <header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: scale < 1 ? 16 : 32,
                    border: `1px solid ${borderColor}`,
                    backgroundColor: '#ffffff',
                    padding: scale < 1 ? '16px' : '32px',
                    marginBottom: scale < 1 ? 16 : 32,
                    boxShadow: '4px 4px 0px 0px rgba(0,0,0,0.1)', // Subtle shadow
                }}
            >
                {/* Photo */}
                <div style={{ flexShrink: 0 }}>
                    {personalInfo.profileImage ? (
                        <div style={{
                            width: photoSize,
                            height: photoSize,
                            borderRadius: '50%',
                            border: `2px solid ${orangeAccent}`,
                            padding: 4,
                            overflow: 'hidden'
                        }}>
                            <img
                                src={personalInfo.profileImage}
                                alt={personalInfo.fullName}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '50%',
                                }}
                            />
                        </div>
                    ) : (
                        <div
                            style={{
                                width: photoSize,
                                height: photoSize,
                                borderRadius: '50%',
                                border: `2px solid ${orangeAccent}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: fs.name,
                                color: orangeAccent,
                                backgroundColor: '#fff7ed',
                            }}
                        >
                            {personalInfo.fullName?.charAt(0) || '?'}
                        </div>
                    )}
                </div>

                {/* Name & Contact */}
                <div style={{ flex: 1 }}>
                    <h1
                        style={{
                            fontFamily: headingFont,
                            fontSize: fs.name,
                            fontWeight: 700,
                            color: '#000000',
                            marginBottom: 8,
                            lineHeight: 1.1,
                        }}
                    >
                        {personalInfo.fullName || 'Your Name'}
                    </h1>
                    <p
                        style={{
                            fontSize: fs.jobTitle,
                            color: orangeAccent,
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            marginBottom: 12,
                            letterSpacing: '0.05em'
                        }}
                    >
                        {personalInfo.jobTitle || 'Job Title'}
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px', fontSize: fs.small, color: '#4b5563' }}>
                        {personalInfo.email && <span>✉️ {personalInfo.email}</span>}
                        {personalInfo.phone && <span>📱 {personalInfo.phone}</span>}
                        {personalInfo.location && <span>📍 {personalInfo.location}</span>}
                    </div>
                </div>
            </header>

            {/* Profile Section */}
            {personalInfo.summary && (
                <BoxSection borderColor={borderColor} title="Profile" icon="👤" accent={orangeAccent} fs={fs} headingFont={headingFont} scale={scale}>
                    <p style={{ lineHeight: 1.6 }}>{personalInfo.summary}</p>
                </BoxSection>
            )}

            {/* Experience Section */}
            {experience.length > 0 && (
                <BoxSection borderColor={borderColor} title="Experience" icon="💼" accent={orangeAccent} fs={fs} headingFont={headingFont} scale={scale}>
                    <div className="space-y-6">
                        {experience.map((exp) => (
                            <div key={exp.id}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle }}>{exp.title}</h4>
                                    <span style={{ fontSize: fs.small, fontWeight: 600, color: orangeAccent }}>
                                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                                    </span>
                                </div>
                                <p style={{ fontSize: fs.body, fontStyle: 'italic', marginBottom: 6, color: '#525252' }}>
                                    {exp.company}, {exp.city}
                                </p>
                                <p style={{ fontSize: fs.body, lineHeight: 1.5 }}>
                                    {exp.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </BoxSection>
            )}

            {/* Education Section */}
            {education.length > 0 && (
                <BoxSection borderColor={borderColor} title="Education" icon="🎓" accent={orangeAccent} fs={fs} headingFont={headingFont} scale={scale}>
                    <div className="space-y-5">
                        {education.map((edu) => (
                            <div key={edu.id}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle }}>{edu.degree}</h4>
                                    <span style={{ fontSize: fs.small, fontWeight: 600, color: orangeAccent }}>
                                        {edu.startDate} – {edu.endDate || 'Present'}
                                    </span>
                                </div>
                                <p style={{ fontSize: fs.body, fontStyle: 'italic', color: '#525252' }}>
                                    {edu.school}, {edu.city}
                                </p>
                            </div>
                        ))}
                    </div>
                </BoxSection>
            )}

            <div style={{ display: 'flex', gap: scale < 1 ? 16 : 32 }}>
                {/* Skills Section */}
                {skills.length > 0 && (
                    <div style={{ flex: 1 }}>
                        <BoxSection borderColor={borderColor} title="Skills" icon="⚙️" accent={orangeAccent} fs={fs} headingFont={headingFont} scale={scale}>
                            <div className="space-y-3">
                                {skills.map((skill) => (
                                    <div key={skill.id} data-paginate="item">
                                        <ProgressBar
                                            label={skill.name}
                                            value={skill.level ? skill.level * 20 : 80}
                                            color={orangeAccent}
                                            height={scale < 1 ? 6 : 8}
                                            scale={1}
                                        />
                                    </div>
                                ))}
                            </div>
                        </BoxSection>
                    </div>
                )}

                {/* Awards/Strengths Section */}
                {(strengths && strengths.length > 0) && (
                    <div style={{ flex: 1 }}>
                        <BoxSection borderColor={borderColor} title="Strengths" icon="⭐" accent={orangeAccent} fs={fs} headingFont={headingFont} scale={scale}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                {strengths.map((str) => (
                                    <span key={str.id} data-paginate="item" style={{
                                        backgroundColor: '#fff7ed', // Light orange bg
                                        color: orangeAccent,
                                        border: `1px solid ${orangeAccent}`,
                                        padding: '4px 12px',
                                        borderRadius: 4,
                                        fontSize: fs.small,
                                        fontWeight: 600
                                    }}>
                                        {str.name}
                                    </span>
                                ))}
                            </div>
                        </BoxSection>
                    </div>
                )}
            </div>
            {/* Languages & Interests Row */}
            <div style={{ display: 'flex', gap: scale < 1 ? 16 : 32, marginTop: scale < 1 ? 16 : 32 }}>
                {/* Languages Section */}
                {data.languages && data.languages.length > 0 && (
                    <div style={{ flex: 1 }}>
                        <BoxSection borderColor={borderColor} title="Languages" icon="🗣️" accent={orangeAccent} fs={fs} headingFont={headingFont} scale={scale}>
                            <div className="space-y-2">
                                {data.languages.map((lang) => (
                                    <div key={lang.id} data-paginate="item" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f3f4f6', paddingBottom: 4 }}>
                                        <span style={{ fontWeight: 600 }}>{lang.name}</span>
                                        <span style={{ color: '#6b7280' }}>{lang.proficiency}</span>
                                    </div>
                                ))}
                            </div>
                        </BoxSection>
                    </div>
                )}

                {/* Interests Section */}
                {data.interests && data.interests.length > 0 && (
                    <div style={{ flex: 1 }}>
                        <BoxSection borderColor={borderColor} title="Interests" icon="🎨" accent={orangeAccent} fs={fs} headingFont={headingFont} scale={scale}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                                {data.interests.map((int) => (
                                    <span key={int.id} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <span style={{ color: orangeAccent }}>★</span> {int.name}
                                    </span>
                                ))}
                            </div>
                        </BoxSection>
                    </div>
                )}
            </div>

        </div>
    );
}

// Reusable Boxed Section
interface BoxSectionProps {
    borderColor: string;
    title: string;
    icon: string;
    accent: string;
    fs: ScaledFontSizes;
    headingFont: string;
    scale: number;
    children: React.ReactNode;
}

function BoxSection({ borderColor, title, icon, accent, fs, headingFont, scale, children }: BoxSectionProps) {
    return (
        <section
            className="resume-section"
            data-paginate
            style={{
                border: `1px solid ${borderColor}`,
                backgroundColor: '#ffffff',
                padding: scale < 1 ? '16px' : '32px',
                marginBottom: scale < 1 ? 16 : 32,
                position: 'relative',
                boxShadow: '4px 4px 0px 0px rgba(0,0,0,0.1)',
            }}
        >
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: scale < 1 ? 16 : 24,
                borderBottom: `2px solid ${accent}`,
                paddingBottom: 8
            }}>
                <span style={{
                    backgroundColor: accent,
                    color: 'white',
                    width: scale < 1 ? 24 : 32,
                    height: scale < 1 ? 24 : 32,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: scale < 1 ? 12 : 16
                }}>
                    {icon}
                </span>
                <h3 style={{
                    fontFamily: headingFont,
                    fontSize: fs.sectionHeading,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: '#1f2937'
                }}>
                    {title}
                </h3>
            </div>
            <div style={{ fontSize: fs.body }}>
                {children}
            </div>
        </section>
    );
}

// Template metadata
export const headerIconSectionsMeta: TemplateMeta = {
    id: 'header-icon-sections',
    name: 'Boxed Sections',
    category: 'header',
    thumbnail: '/templates/header-icon-sections.png',
    description: 'Distinctive layout with boxed sections and cyan background',
};

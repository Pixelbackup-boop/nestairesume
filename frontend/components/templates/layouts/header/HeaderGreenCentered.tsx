'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';
import CircularProgress from '../../shared/CircularProgress';

/**
 * Header Green Centered Template
 * Green header band with centered circular photo overlapping.
 * Single-column layout with green section headers and icons.
 *
 * Layout:
 * - Green header band at top
 * - Centered circular photo (overlapping header)
 * - Name and contact info centered below photo
 * - Single-column body: Profile, Work Experience, Education, Languages (circles), Strengths (pills)
 *
 * Matches reference: frontend/Resume-template/unique-layouts/17-circle-photo-center.webp
 */
export default function HeaderGreenCentered({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, strengths, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Inter');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes that respect user's size preference + scale
    const fs = getScaledFontSizes(sizeConfig, scale);

    // Single color preset - use customThemeColor or default green
    const accentColor = customThemeColor || '#059669';

    // Calculate responsive sizes
    const headerHeight = scale < 1 ? 50 : 100;
    const photoSize = scale < 1 ? 60 : 120;
    const photoTopOffset = scale < 1 ? 20 : 40;

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
            {/* Green Header Band */}
            <div
                style={{
                    height: headerHeight,
                    backgroundColor: accentColor,
                }}
            />

            {/* Centered Photo (overlapping header) */}
            <div
                style={{
                    position: 'absolute',
                    top: photoTopOffset,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 10,
                }}
            >
                {personalInfo.profileImage ? (
                    <img
                        src={personalInfo.profileImage}
                        alt={personalInfo.fullName}
                        style={{
                            width: photoSize,
                            height: photoSize,
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: '4px solid white',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        }}
                    />
                ) : (
                    <div
                        style={{
                            width: photoSize,
                            height: photoSize,
                            borderRadius: '50%',
                            backgroundColor: '#e5e7eb',
                            border: '4px solid white',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: fs.name,
                            color: '#9ca3af',
                        }}
                    >
                        {personalInfo.fullName?.charAt(0) || '?'}
                    </div>
                )}
            </div>

            {/* Name and Contact (centered below photo) */}
            <header
                className="resume-section"
                data-paginate
                style={{
                    textAlign: 'center',
                    paddingTop: scale < 1 ? 35 : 70,
                    paddingBottom: scale < 1 ? 12 : 24,
                    paddingLeft: scale < 1 ? 16 : 32,
                    paddingRight: scale < 1 ? 16 : 32,
                }}
            >
                <h1
                    style={{
                        fontFamily: headingFont,
                        fontSize: fs.name,
                        fontWeight: 700,
                        color: '#1f2937',
                        marginBottom: scale < 1 ? 4 : 8,
                    }}
                >
                    {personalInfo.fullName || 'Your Name'}
                </h1>

                {/* Contact Info Row */}
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: scale < 1 ? '8px' : '16px',
                        fontSize: fs.small,
                        color: '#6b7280',
                    }}
                >
                    {personalInfo.dateOfBirth && (
                        <span>📅 {personalInfo.dateOfBirth}</span>
                    )}
                    {personalInfo.location && (
                        <span>📍 {personalInfo.location}</span>
                    )}
                    {personalInfo.phone && (
                        <span>📱 {personalInfo.phone}</span>
                    )}
                    {personalInfo.email && (
                        <span>✉️ {personalInfo.email}</span>
                    )}
                </div>
            </header>

            {/* Main Content - Single Column */}
            <div style={{ padding: scale < 1 ? '0 16px 16px' : '0 32px 32px' }}>
                {/* Profile / Summary */}
                {personalInfo.summary && (
                    <section className="mb-5 resume-section" data-paginate>
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
                    <section className="mb-5 resume-section" data-paginate>
                        <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon="💼">
                            Work experience
                        </SectionHeader>
                        <div className="space-y-4">
                            {experience.map((exp) => (
                                <div key={exp.id} className="resume-entry" data-paginate>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2px' }}>
                                        <div>
                                            <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: accentColor }}>
                                                {exp.title}
                                            </h4>
                                            <p style={{ fontSize: fs.body, color: '#1f2937', fontWeight: 600 }}>
                                                {exp.company}
                                            </p>
                                        </div>
                                        <div style={{ textAlign: 'right', fontSize: fs.small, color: '#6b7280' }}>
                                            <div>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</div>
                                            {exp.city && <div>{exp.city}</div>}
                                        </div>
                                    </div>
                                    {exp.description && (
                                        <ul style={{ paddingLeft: scale < 1 ? '12px' : '16px', margin: 0, listStyle: 'disc', marginTop: '4px' }}>
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
                    <section className="mb-5 resume-section" data-paginate>
                        <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon="🎓">
                            Education
                        </SectionHeader>
                        <div className="space-y-3">
                            {education.map((edu) => (
                                <div key={edu.id} className="resume-entry" data-paginate>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div>
                                            <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: accentColor }}>
                                                {edu.degree}
                                            </h4>
                                            <p style={{ fontSize: fs.body, color: '#1f2937', fontWeight: 600 }}>
                                                {edu.school}
                                            </p>
                                            {edu.description && (
                                                <p style={{ fontSize: fs.small, color: '#6b7280', marginTop: '2px' }}>
                                                    {edu.description}
                                                </p>
                                            )}
                                        </div>
                                        <div style={{ textAlign: 'right', fontSize: fs.small, color: '#6b7280' }}>
                                            <div>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</div>
                                            {edu.city && <div>{edu.city}</div>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Languages with Circular Progress */}
                {languages && languages.length > 0 && (
                    <section className="mb-5 resume-section" data-paginate>
                        <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon="🌐">
                            Languages
                        </SectionHeader>
                        <div
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: scale < 1 ? '12px' : '24px',
                                justifyContent: 'flex-start',
                            }}
                        >
                            {languages.map((lang) => (
                                <CircularProgress
                                    key={lang.id}
                                    value={getProficiencyLevel(lang.proficiency)}
                                    size={scale < 1 ? 40 : 70}
                                    color={accentColor}
                                    strokeWidth={scale < 1 ? 4 : 6}
                                    fontSize={scale < 1 ? 10 : 16}
                                    label={lang.name}
                                    labelFontSize={scale < 1 ? 7 : 11}
                                    scale={1}
                                />
                            ))}
                        </div>
                    </section>
                )}

                {/* Strengths as Colored Pills */}
                {strengths && strengths.length > 0 && (
                    <section className="resume-section" data-paginate>
                        <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon="💪">
                            Strengths
                        </SectionHeader>
                        <div
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: scale < 1 ? '6px' : '10px',
                            }}
                        >
                            {strengths.map((strength, index) => (
                                <span
                                    key={strength.id}
                                    style={{
                                        backgroundColor: getPillColor(index, accentColor),
                                        color: '#ffffff',
                                        padding: scale < 1 ? '3px 8px' : '6px 14px',
                                        borderRadius: '9999px',
                                        fontSize: fs.small,
                                        fontWeight: 500,
                                    }}
                                >
                                    {strength.name}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills (if no strengths, show skills as pills) */}
                {(!strengths || strengths.length === 0) && skills.length > 0 && (
                    <section className="resume-section" data-paginate>
                        <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon="⚙️">
                            Skills
                        </SectionHeader>
                        <div
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: scale < 1 ? '6px' : '10px',
                            }}
                        >
                            {skills.map((skill, index) => (
                                <span
                                    key={skill.id}
                                    style={{
                                        backgroundColor: getPillColor(index, accentColor),
                                        color: '#ffffff',
                                        padding: scale < 1 ? '3px 8px' : '6px 14px',
                                        borderRadius: '9999px',
                                        fontSize: fs.small,
                                        fontWeight: 500,
                                    }}
                                >
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </section>
                )}
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
                gap: isSmall ? '6px' : '10px',
                borderBottom: `2px solid ${accentColor}`,
                paddingBottom: isSmall ? '4px' : '8px',
            }}
        >
            <span
                style={{
                    backgroundColor: accentColor,
                    color: '#ffffff',
                    width: isSmall ? '18px' : '28px',
                    height: isSmall ? '18px' : '28px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: isSmall ? '10px' : '14px',
                }}
            >
                {icon}
            </span>
            {children}
        </h3>
    );
}

// Convert proficiency string to percentage
function getProficiencyLevel(proficiency: string): number {
    const levels: Record<string, number> = {
        'native': 100,
        'fluent': 95,
        'advanced': 85,
        'intermediate': 70,
        'basic': 50,
        'beginner': 30,
    };
    return levels[proficiency.toLowerCase()] || 70;
}

// Get pill color based on index (cycling through accent variations)
function getPillColor(index: number, accentColor: string): string {
    const colors = [
        accentColor,
        '#10b981', // emerald
        '#14b8a6', // teal
        '#06b6d4', // cyan
        '#0ea5e9', // sky
        '#3b82f6', // blue
    ];
    return colors[index % colors.length];
}

// Template metadata for registry
export const headerGreenCenteredMeta: TemplateMeta = {
    id: 'header-green-centered',
    name: 'Green Centered',
    category: 'header',
    thumbnail: '/templates/header-green-centered.png',
    description: 'Modern template with centered photo and green accents',
};

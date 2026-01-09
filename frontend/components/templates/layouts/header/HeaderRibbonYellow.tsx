'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';

/**
 * Header Ribbon Yellow Template
 * Yellow ribbon banner with circular photo overlapping at top.
 * Two-column layout with awards and interests section.
 *
 * Layout:
 * - Circular photo at top center (overlapping ribbon)
 * - Yellow ribbon banner with name
 * - Contact info centered below
 * - Two-column body: Left (Profile, Experience, Education), Right (Awards, Skills, Interests grid)
 *
 * Matches reference: frontend/Resume-template/unique-layouts/22-ribbon-banner.webp
 */
export default function HeaderRibbonYellow({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, awards, interests, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Inter');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes that respect user's size preference + scale
    const fs = getScaledFontSizes(sizeConfig, scale);

    // Single color preset - use customThemeColor or default yellow
    const accentColor = customThemeColor || '#eab308';

    // Calculate responsive sizes
    const photoSize = scale < 1 ? 50 : 100;
    const ribbonHeight = scale < 1 ? 28 : 56;

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
            {/* Header Area with Photo and Ribbon */}
            <header
                className="resume-section"
                data-paginate
                style={{
                    textAlign: 'center',
                    paddingTop: scale < 1 ? 12 : 24,
                    paddingBottom: scale < 1 ? 12 : 24,
                }}
            >
                {/* Circular Photo */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: scale < 1 ? -15 : -30,
                        position: 'relative',
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
                                border: '4px solid #374151',
                                backgroundColor: '#ffffff',
                            }}
                        />
                    ) : (
                        <div
                            style={{
                                width: photoSize,
                                height: photoSize,
                                borderRadius: '50%',
                                backgroundColor: '#e5e7eb',
                                border: '4px solid #374151',
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

                {/* Yellow Ribbon Banner */}
                <div
                    style={{
                        backgroundColor: accentColor,
                        height: ribbonHeight,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        marginLeft: scale < 1 ? 24 : 48,
                        marginRight: scale < 1 ? 24 : 48,
                    }}
                >
                    {/* Ribbon Left Fold */}
                    <div
                        style={{
                            position: 'absolute',
                            left: scale < 1 ? -12 : -24,
                            top: 0,
                            width: 0,
                            height: 0,
                            borderTop: `${ribbonHeight / 2}px solid transparent`,
                            borderBottom: `${ribbonHeight / 2}px solid transparent`,
                            borderRight: `${scale < 1 ? 12 : 24}px solid ${accentColor}`,
                        }}
                    />
                    {/* Ribbon Right Fold */}
                    <div
                        style={{
                            position: 'absolute',
                            right: scale < 1 ? -12 : -24,
                            top: 0,
                            width: 0,
                            height: 0,
                            borderTop: `${ribbonHeight / 2}px solid transparent`,
                            borderBottom: `${ribbonHeight / 2}px solid transparent`,
                            borderLeft: `${scale < 1 ? 12 : 24}px solid ${accentColor}`,
                        }}
                    />
                    <h1
                        style={{
                            fontFamily: headingFont,
                            fontSize: fs.name,
                            fontWeight: 700,
                            color: '#ffffff',
                            textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                        }}
                    >
                        {personalInfo.fullName || 'Your Name'}
                    </h1>
                </div>

                {/* Contact Info */}
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: scale < 1 ? '6px' : '12px',
                        fontSize: fs.small,
                        color: '#6b7280',
                        marginTop: scale < 1 ? 8 : 16,
                    }}
                >
                    {personalInfo.dateOfBirth && (
                        <span>{personalInfo.dateOfBirth}</span>
                    )}
                    {personalInfo.phone && (
                        <>
                            <span>|</span>
                            <span>{personalInfo.phone}</span>
                        </>
                    )}
                    {personalInfo.email && (
                        <>
                            <span>|</span>
                            <span>{personalInfo.email}</span>
                        </>
                    )}
                    {personalInfo.website && (
                        <>
                            <span>|</span>
                            <span>{personalInfo.website}</span>
                        </>
                    )}
                </div>
            </header>

            {/* Two-Column Body */}
            <div
                style={{
                    display: 'flex',
                    gap: scale < 1 ? 12 : 24,
                    padding: scale < 1 ? '0 16px 16px' : '0 32px 32px',
                }}
            >
                {/* LEFT COLUMN - Profile, Experience, Education */}
                <div style={{ width: '55%' }}>
                    {/* Profile / Summary */}
                    {personalInfo.summary && (
                        <section className="mb-4 resume-section" data-paginate>
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
                        <section className="mb-4 resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon="💼">
                                Work experience
                            </SectionHeader>
                            <div className="space-y-3">
                                {experience.map((exp) => (
                                    <div key={exp.id} className="resume-entry" data-paginate>
                                        <p style={{ fontSize: fs.tiny, color: '#6b7280', marginBottom: '2px', textTransform: 'uppercase' }}>
                                            {exp.startDate} – {exp.current ? 'PRESENT' : exp.endDate}
                                            {exp.city && `    ${exp.city.toUpperCase()}`}
                                        </p>
                                        <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#1f2937', marginBottom: '1px' }}>
                                            {exp.title}
                                        </h4>
                                        <p style={{ fontSize: fs.body, color: accentColor, fontWeight: 600, marginBottom: '4px' }}>
                                            {exp.company}
                                        </p>
                                        {exp.description && (
                                            <ul style={{ paddingLeft: scale < 1 ? '10px' : '14px', margin: 0, listStyle: 'disc' }}>
                                                {exp.description.split('\n').filter(Boolean).map((line, idx) => (
                                                    <li key={idx} style={{ fontSize: fs.small, color: '#4b5563', marginBottom: '1px', lineHeight: 1.4 }}>
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
                        <section className="mb-4 resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon="🎓">
                                Education
                            </SectionHeader>
                            <div className="space-y-3">
                                {education.map((edu) => (
                                    <div key={edu.id} className="resume-entry" data-paginate>
                                        <p style={{ fontSize: fs.tiny, color: '#6b7280', marginBottom: '2px', textTransform: 'uppercase' }}>
                                            {edu.startDate} – {edu.current ? 'PRESENT' : edu.endDate}
                                            {edu.city && `    ${edu.city.toUpperCase()}`}
                                        </p>
                                        <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#1f2937', marginBottom: '1px' }}>
                                            {edu.degree}
                                        </h4>
                                        <p style={{ fontSize: fs.body, color: accentColor, fontWeight: 600 }}>
                                            {edu.school}
                                        </p>
                                        {edu.description && (
                                            <p style={{ fontSize: fs.small, color: '#6b7280', marginTop: '2px' }}>
                                                {edu.description}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* RIGHT COLUMN - Awards, Skills, Interests */}
                <div style={{ width: '45%' }}>
                    {/* Awards */}
                    {awards && awards.length > 0 && (
                        <section className="mb-4 resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon="🏆">
                                Awards
                            </SectionHeader>
                            <div className="space-y-3">
                                {awards.map((award) => (
                                    <div key={award.id} className="resume-entry" data-paginate>
                                        <p style={{ fontSize: fs.tiny, color: '#6b7280', marginBottom: '2px' }}>
                                            {award.date}
                                        </p>
                                        <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#1f2937', marginBottom: '1px' }}>
                                            {award.title}
                                        </h4>
                                        <p style={{ fontSize: fs.body, color: accentColor, fontWeight: 600 }}>
                                            {award.issuer}
                                        </p>
                                        {award.description && (
                                            <p style={{ fontSize: fs.small, color: '#6b7280', marginTop: '2px' }}>
                                                {award.description}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills */}
                    {skills.length > 0 && (
                        <section className="mb-4 resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon="⚙️">
                                Skills
                            </SectionHeader>
                            <p style={{ fontSize: fs.tiny, color: '#6b7280', marginBottom: scale < 1 ? '4px' : '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                — SOFTWARE
                            </p>
                            <ul style={{ paddingLeft: scale < 1 ? '10px' : '14px', margin: 0, listStyle: 'disc' }}>
                                {skills.map((skill) => (
                                    <li key={skill.id} style={{ fontSize: fs.body, color: '#374151', marginBottom: '2px' }}>
                                        {skill.name}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Interests with Icons Grid */}
                    {interests && interests.length > 0 && (
                        <section className="resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon="⭐">
                                Interests
                            </SectionHeader>
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(3, 1fr)',
                                    gap: scale < 1 ? '8px' : '16px',
                                }}
                            >
                                {interests.slice(0, 6).map((interest) => (
                                    <div
                                        key={interest.id}
                                        style={{
                                            textAlign: 'center',
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize: scale < 1 ? '16px' : '28px',
                                                marginBottom: scale < 1 ? '2px' : '4px',
                                                color: accentColor,
                                            }}
                                        >
                                            {getInterestIcon(interest.name)}
                                        </div>
                                        <div style={{ fontSize: fs.tiny, color: '#374151' }}>
                                            {interest.name}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* If no interests, show strengths instead */}
                    {(!interests || interests.length === 0) && data.strengths && data.strengths.length > 0 && (
                        <section className="resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon="💪">
                                Strengths
                            </SectionHeader>
                            <div
                                style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: scale < 1 ? '4px' : '8px',
                                }}
                            >
                                {data.strengths.map((strength) => (
                                    <span
                                        key={strength.id}
                                        style={{
                                            backgroundColor: accentColor,
                                            color: '#ffffff',
                                            padding: scale < 1 ? '2px 6px' : '4px 12px',
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
                </div>
            </div>
        </div>
    );
}

// Section Header with Yellow Circle Icon
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
                color: '#1f2937',
                marginBottom: isSmall ? '6px' : '12px',
                display: 'flex',
                alignItems: 'center',
                gap: isSmall ? '6px' : '10px',
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

// Get interest icon based on name
function getInterestIcon(name: string): string {
    const nameLower = name.toLowerCase();
    if (nameLower.includes('travel')) return '✈️';
    if (nameLower.includes('photo')) return '📷';
    if (nameLower.includes('novel') || nameLower.includes('book') || nameLower.includes('read')) return '📚';
    if (nameLower.includes('ballet') || nameLower.includes('dance')) return '💃';
    if (nameLower.includes('snowboard') || nameLower.includes('ski')) return '🏂';
    if (nameLower.includes('climb') || nameLower.includes('hik')) return '🧗';
    if (nameLower.includes('music') || nameLower.includes('guitar')) return '🎵';
    if (nameLower.includes('cook') || nameLower.includes('food')) return '🍳';
    if (nameLower.includes('game') || nameLower.includes('gaming')) return '🎮';
    if (nameLower.includes('film') || nameLower.includes('movie')) return '🎬';
    if (nameLower.includes('art') || nameLower.includes('paint')) return '🎨';
    if (nameLower.includes('sport') || nameLower.includes('fitness')) return '🏃';
    if (nameLower.includes('yoga')) return '🧘';
    if (nameLower.includes('swim')) return '🏊';
    if (nameLower.includes('cycle') || nameLower.includes('bike')) return '🚴';
    if (nameLower.includes('garden')) return '🌱';
    if (nameLower.includes('coffee')) return '☕';
    if (nameLower.includes('wine')) return '🍷';
    return '⭐';
}

// Template metadata for registry
export const headerRibbonYellowMeta: TemplateMeta = {
    id: 'header-ribbon-yellow',
    name: 'Ribbon Yellow',
    category: 'header',
    thumbnail: '/templates/header-ribbon-yellow.png',
    description: 'Creative template with yellow ribbon banner and interests grid',
};

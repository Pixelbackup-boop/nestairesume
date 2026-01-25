'use client';

import { memo } from 'react';
import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';
import ProgressBar from '../../shared/ProgressBar';
import { useTemplateTranslations } from '@/lib/templates/TranslationContext';

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
function HeaderRibbonYellow({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, awards, interests, certifications, references, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Inter');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes that respect user's size preference + scale
    const fs = getScaledFontSizes(sizeConfig, scale);

    const t = useTemplateTranslations();

    // Single color preset - use customThemeColor or default yellow
    const accentColor = customThemeColor || '#eab308';

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
            {/* Header Area with Photo and Diagonal Ribbon - STATIC SIZES (not affected by text size) */}
            <header
                className="resume-section"
                data-paginate
                style={{
                    textAlign: 'center',
                    paddingTop: scale < 1 ? 16 : 32,
                    paddingBottom: scale < 1 ? 8 : 16,
                }}
            >
                {/* Profile Photo - STATIC SIZE, no yellow background */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: scale < 1 ? -5 : -5, // 2px gap above ribbon
                        position: 'relative',
                        zIndex: 10,
                    }}
                >
                    {/* Photo with dark border only - no yellow circle */}
                    {personalInfo.profileImage ? (
                        <img
                            src={personalInfo.profileImage}
                            alt={personalInfo.fullName}
                            style={{
                                width: scale < 1 ? 60 : 120, // STATIC
                                height: scale < 1 ? 60 : 120,
                                borderRadius: '50%',
                                objectFit: 'cover',
                                border: `${scale < 1 ? 3 : 5}px solid #374151`,
                            }}
                        />
                    ) : (
                        <div
                            style={{
                                width: scale < 1 ? 60 : 120, // STATIC
                                height: scale < 1 ? 60 : 120,
                                borderRadius: '50%',
                                backgroundColor: '#e5e7eb',
                                border: `${scale < 1 ? 3 : 5}px solid #374151`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: scale < 1 ? '24px' : '42px', // STATIC
                                color: '#9ca3af',
                                fontWeight: 700,
                            }}
                        >
                            {personalInfo.fullName?.charAt(0) || '?'}
                        </div>
                    )}
                </div>

                {/* Diagonal Parallelogram Ribbon - STATIC SIZE, WIDER */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginLeft: scale < 1 ? 10 : 0,
                        marginRight: scale < 1 ? 10 : 0,
                    }}
                >
                    <div
                        style={{
                            backgroundColor: accentColor,
                            height: scale < 1 ? 36 : 72, // STATIC
                            paddingLeft: scale < 1 ? 90 : 180, // +20px wider on each side
                            paddingRight: scale < 1 ? 90 : 180,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transform: 'skewX(-10deg)', // Creates diagonal parallelogram
                        }}
                    >
                        {/* Name - counter-skew to keep text straight, STATIC size */}
                        <h1
                            style={{
                                fontFamily: headingFont,
                                fontSize: scale < 1 ? '14px' : '28px', // STATIC - not affected by text size setting
                                fontWeight: 700,
                                color: '#ffffff',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                transform: 'skewX(10deg)', // Counter-skew text
                                margin: 0,
                            }}
                        >
                            {personalInfo.fullName || 'Your Name'}
                        </h1>
                    </div>
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
                    {personalInfo.phone && (
                        <span>{personalInfo.phone}</span>
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
                    {personalInfo.linkedin && (
                        <>
                            <span>|</span>
                            <span>{personalInfo.linkedin}</span>
                        </>
                    )}
                    {personalInfo.nationality && (
                        <>
                            <span>|</span>
                            <span>{personalInfo.nationality}</span>
                        </>
                    )}
                    {personalInfo.idType && personalInfo.idNumber && (
                        <>
                            <span>|</span>
                            <span>{personalInfo.idType === 'id' ? 'ID' : personalInfo.idType === 'passport' ? 'Passport' : 'License'}: {personalInfo.idNumber}</span>
                        </>
                    )}
                </div>

                {/* Social Links Row */}
                {(personalInfo.twitter || personalInfo.github || personalInfo.dribbble || personalInfo.behance || personalInfo.instagram) && (
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            gap: scale < 1 ? '6px' : '12px',
                            fontSize: fs.small,
                            color: '#6b7280',
                            marginTop: scale < 1 ? 4 : 8,
                        }}
                    >
                        {personalInfo.twitter && <span>Twitter: {personalInfo.twitter}</span>}
                        {personalInfo.github && <span>GitHub: {personalInfo.github}</span>}
                        {personalInfo.dribbble && <span>Dribbble: {personalInfo.dribbble}</span>}
                        {personalInfo.behance && <span>Behance: {personalInfo.behance}</span>}
                        {personalInfo.instagram && <span>Instagram: {personalInfo.instagram}</span>}
                    </div>
                )}
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
                                {t.sections.profile}
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
                                {t.sections.experience}
                            </SectionHeader>
                            <div className="space-y-3">
                                {experience.map((exp) => (
                                    <div key={exp.id} className="resume-entry" data-paginate>
                                        <p style={{ fontSize: fs.tiny, color: '#6b7280', marginBottom: '2px', textTransform: 'uppercase' }}>
                                            {exp.startDate} – {exp.current ? t.labels.present : exp.endDate}
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
                                {t.sections.education}
                            </SectionHeader>
                            <div className="space-y-3">
                                {education.map((edu) => (
                                    <div key={edu.id} className="resume-entry" data-paginate>
                                        <p style={{ fontSize: fs.tiny, color: '#6b7280', marginBottom: '2px', textTransform: 'uppercase' }}>
                                            {edu.startDate} – {edu.current ? t.labels.present : edu.endDate}
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
                    {/* Credentials (Certifications & Awards) */}
                    {((certifications && certifications.length > 0) || (awards && awards.length > 0)) && (
                        <section className="mb-4 resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon="🏆">
                                {t.sections.credentials}
                            </SectionHeader>

                            {certifications && certifications.length > 0 && (
                                <div style={{ marginBottom: awards && awards.length > 0 ? 16 : 0 }}>
                                    <h4 style={{ fontSize: fs.small, fontWeight: 600, color: '#6b7280', marginBottom: 8 }}>
                                        {t.sections.certifications}
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
                                        {t.sections.awards}
                                    </h4>
                                    <div className="space-y-2">
                                        {awards.map((award) => (
                                            <div key={award.id} data-paginate="item">
                                                <div style={{ fontWeight: 600, fontSize: fs.body, color: '#1f2937' }}>{award.title}</div>
                                                <div style={{ fontSize: fs.small, color: '#6b7280' }}>{award.issuer} • {award.date}</div>
                                                {award.description && (
                                                    <p style={{ fontSize: fs.small, color: '#4b5563', marginTop: 2 }}>
                                                        {award.description}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </section>
                    )}

                    {/* Skills */}
                    {skills.length > 0 && (
                        <section className="mb-4 resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon="⚙️">
                                {t.sections.skills}
                            </SectionHeader>
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
                        </section>
                    )}

                    {/* Interests with Icons Grid */}
                    {interests && interests.length > 0 && (
                        <section className="resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon="⭐">
                                {t.sections.interests}
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

                    {/* Languages */}
                    {data.languages && data.languages.length > 0 && (
                        <section className="mb-4 resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon="🗣️">
                                {t.sections.languages}
                            </SectionHeader>
                            <div className="space-y-2">
                                {data.languages.map((lang) => (
                                    <div key={lang.id} data-paginate="item" style={{ display: 'flex', justifyContent: 'space-between', fontSize: fs.body }}>
                                        <span style={{ fontWeight: 600, color: '#1f2937' }}>{lang.name}</span>
                                        <span style={{ color: '#6b7280' }}>{lang.proficiency}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Strengths */}
                    {data.strengths && data.strengths.length > 0 && (
                        <section className="mb-4 resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon="💪">
                                {t.sections.strengths}
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
                                        data-paginate="item"
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

                    {/* References */}
                    {references && references.length > 0 && (
                        <section className="mb-4 resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon="📋">
                                {t.sections.references}
                            </SectionHeader>
                            <div className="space-y-3">
                                {references.map((ref) => (
                                    <div key={ref.id} className="resume-entry" data-paginate>
                                        <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#1f2937', marginBottom: '1px' }}>
                                            {ref.name}
                                        </h4>
                                        <p style={{ fontSize: fs.body, color: accentColor, fontWeight: 600, marginBottom: '2px' }}>
                                            {ref.title}{ref.company && ` at ${ref.company}`}
                                        </p>
                                        <div style={{ fontSize: fs.small, color: '#6b7280' }}>
                                            {ref.phone && <div>{ref.phone}</div>}
                                            {ref.email && <div>{ref.email}</div>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Custom Field */}
                    {personalInfo.customField && (
                        <section className="resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon="📝">
                                {personalInfo.customFieldLabel || 'Additional Information'}
                            </SectionHeader>
                            <p style={{ color: '#374151', lineHeight: 1.6, fontSize: fs.body }}>
                                {personalInfo.customField}
                            </p>
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

// Wrap with memo to prevent unnecessary re-renders
export default memo(HeaderRibbonYellow);

// Template metadata for registry
export const headerRibbonYellowMeta: TemplateMeta = {
    id: 'header-ribbon-yellow',
    name: 'Ribbon Yellow',
    category: 'header',
    thumbnail: '/templates/header-ribbon-yellow.png',
    description: 'Creative template with yellow ribbon banner and interests grid',
};

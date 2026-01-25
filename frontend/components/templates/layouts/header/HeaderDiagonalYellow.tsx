'use client';

import { memo } from 'react';
import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';
import ProgressBar from '../../shared/ProgressBar';
import { useTemplateTranslations } from '@/lib/templates/TranslationContext';

/**
 * Header Diagonal Yellow Template
 * Creative diagonal header with yellow background and angled cut.
 * Single-color schema - accent color applies to header and decorations.
 *
 * Layout:
 * - Header: Dark background (#18181b) with Yellow Diagonal shape on right.
 * - Photo: Center-right, overlapping header.
 * - Body: Two-column 55/45 split.
 * - Footer: Yellow Diagonal shape on bottom-left.
 *
 * Matches reference: frontend/Resume-template/unique-layouts/06-diagonal-header.webp
 */
function HeaderDiagonalYellow({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, strengths, interests, certifications, awards, references, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Titan One');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes
    const fs = getScaledFontSizes(sizeConfig, scale);

    const t = useTemplateTranslations();

    // Fixed colors based on reference
    const darkBg = '#18181b';
    const accentColor = customThemeColor || '#facc15'; // Yellow-400
    const textColor = '#3f3f46'; // Zinc-700

    // Dimensions
    const headerHeight = scale < 1 ? 120 : 220;
    const photoSize = scale < 1 ? 80 : 150;

    return (
        <div
            className="w-full h-full"
            style={{
                fontFamily: bodyFont,
                fontSize: sizeConfig.base,
                backgroundColor: '#ffffff',
                position: 'relative',
                overflow: 'hidden',
                color: textColor,
            }}
        >
            {/* Header Area */}
            <div
                style={{
                    height: headerHeight,
                    backgroundColor: darkBg,
                    position: 'relative',
                    marginBottom: scale < 1 ? 40 : 80, // Space for overlapping photo
                }}
            >
                {/* Yellow Diagonal Shape Top-Right */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '35%',
                        height: '100%',
                        backgroundColor: accentColor,
                        clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)',
                    }}
                />

                {/* Content Container */}
                <div
                    style={{
                        padding: scale < 1 ? '20px' : '40px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        height: '100%',
                    }}
                >
                    {/* Name - Left side */}
                    <div style={{ width: '60%', paddingTop: scale < 1 ? 10 : 20 }}>
                        <h1
                            style={{
                                fontFamily: headingFont,
                                fontSize: fs.name,
                                fontWeight: 400, // Titan One is heavy by default
                                color: '#ffffff',
                                textTransform: 'uppercase',
                                lineHeight: 1.1,
                                marginBottom: scale < 1 ? 8 : 16,
                            }}
                        >
                            {personalInfo.fullName || 'Your Name'}
                        </h1>
                        <p
                            style={{
                                fontSize: fs.jobTitle,
                                color: accentColor,
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                fontWeight: 700,
                            }}
                        >
                            {personalInfo.jobTitle || 'Job Title'}
                        </p>
                    </div>

                    {/* Contact - Top Right (on Yellow) */}
                    <div
                        style={{
                            width: '30%',
                            textAlign: 'right',
                            fontSize: fs.small,
                            color: '#18181b',
                            fontWeight: 600,
                            zIndex: 10,
                        }}
                    >
                        {personalInfo.phone && <div style={{ marginBottom: 4 }}>{personalInfo.phone}</div>}
                        {personalInfo.email && <div style={{ marginBottom: 4 }}>{personalInfo.email}</div>}
                        {personalInfo.location && <div style={{ marginBottom: 4 }}>{personalInfo.location}</div>}
                        {personalInfo.website && <div>{personalInfo.website}</div>}
                    </div>
                </div>

                {/* Photo - Centered overlapping bottom edge */}
                {personalInfo.profileImage && (
                    <div
                        style={{
                            position: 'absolute',
                            bottom: -(photoSize / 2),
                            left: '60%', // Approx visual center of info flow
                            transform: 'translateX(-50%)',
                            width: photoSize,
                            height: photoSize,
                            borderRadius: '50%',
                            border: '5px solid #ffffff',
                            overflow: 'hidden',
                            backgroundColor: '#fff',
                            zIndex: 20,
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <img
                            src={personalInfo.profileImage}
                            alt={personalInfo.fullName}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                )}
            </div>

            {/* Two Column Layout */}
            <div
                style={{
                    display: 'flex',
                    padding: scale < 1 ? '0 20px 20px' : '0 40px 40px',
                    gap: scale < 1 ? 15 : 30,
                }}
            >
                {/* Left Column (55%) */}
                <div style={{ width: '55%' }}>
                    {personalInfo.summary && (
                        <section className="mb-6 resume-section" data-paginate>
                            <SectionHeader fs={fs} title={t.sections.profile} />
                            <p style={{ lineHeight: 1.6, fontSize: fs.body }}>
                                {personalInfo.summary}
                            </p>
                        </section>
                    )}

                    {experience.length > 0 && (
                        <section className="mb-6 resume-section" data-paginate>
                            <SectionHeader fs={fs} title={t.sections.experience} />
                            <div className="space-y-4">
                                {experience.map((exp) => (
                                    <div key={exp.id} className="resume-entry" data-paginate>
                                        <h4 style={{ fontSize: fs.entryTitle, fontWeight: 800, color: '#18181b', textTransform: 'uppercase' }}>
                                            {exp.title}
                                        </h4>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: fs.small, color: '#52525b', marginBottom: 4, fontWeight: 600 }}>
                                            <span>{exp.company}</span>
                                            <span>{exp.startDate} - {exp.current ? t.labels.present : exp.endDate}</span>
                                        </div>
                                        {exp.description && (
                                            <p style={{ fontSize: fs.body, lineHeight: 1.5 }}>
                                                {exp.description}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Right Column (45%) */}
                <div style={{ width: '45%' }}>
                    {education.length > 0 && (
                        <section className="mb-6 resume-section" data-paginate>
                            <SectionHeader fs={fs} title={t.sections.education} />
                            <div className="space-y-4">
                                {education.map((edu) => (
                                    <div key={edu.id} className="resume-entry" data-paginate>
                                        <h4 style={{ fontSize: fs.entryTitle, fontWeight: 800, color: '#18181b', textTransform: 'uppercase' }}>
                                            {edu.degree}
                                        </h4>
                                        <div style={{ fontSize: fs.small, color: '#52525b', fontWeight: 600 }}>
                                            {edu.school}, {edu.startDate} - {edu.current ? t.labels.present : edu.endDate}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {skills.length > 0 && (
                        <section className="mb-6 resume-section" data-paginate>
                            <SectionHeader fs={fs} title={t.sections.skills} />
                            <div className="space-y-2">
                                {skills.map((skill) => (
                                    <div key={skill.id} data-paginate="item">
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2, fontSize: fs.small, fontWeight: 700, color: '#18181b' }}>
                                            <span>{skill.name}</span>
                                        </div>
                                        <ProgressBar
                                            value={skill.level * 20}
                                            color={accentColor}
                                            height={scale < 1 ? 6 : 10}
                                            scale={scale}
                                            trackColor="#e4e4e7" // Zinc-200
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Strengths */}
                    {strengths && strengths.length > 0 && (
                        <section className="mb-6 resume-section" data-paginate>
                            <SectionHeader fs={fs} title={t.sections.strengths} />
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                {strengths.map((str) => (
                                    <span key={str.id} data-paginate="item" style={{
                                        backgroundColor: accentColor,
                                        color: '#18181b',
                                        padding: scale < 1 ? '2px 8px' : '4px 12px',
                                        borderRadius: 4,
                                        fontSize: fs.small,
                                        fontWeight: 600
                                    }}>
                                        {str.name}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Interests */}
                    {interests && interests.length > 0 && (
                        <section className="mb-6 resume-section" data-paginate>
                            <SectionHeader fs={fs} title={t.sections.interests} />
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px' }}>
                                {interests.map((int) => (
                                    <span key={int.id} style={{ fontSize: fs.body, fontWeight: 500 }}>
                                        ★ {int.name}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Languages */}
                    {languages && languages.length > 0 && (
                        <section className="mb-6 resume-section" data-paginate>
                            <SectionHeader fs={fs} title={t.sections.languages} />
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {languages.map((lang) => (
                                    <li key={lang.id} data-paginate="item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: fs.body, fontWeight: 600, borderBottom: '1px solid #e4e4e7', paddingBottom: 2 }}>
                                        <span>{lang.name}</span>
                                        <span style={{ color: '#52525b' }}>{lang.proficiency}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Credentials (Certifications & Awards) */}
                    {((certifications && certifications.length > 0) || (awards && awards.length > 0)) && (
                        <section className="mb-6 resume-section" data-paginate>
                            <SectionHeader fs={fs} title={t.sections.credentials} />

                            {certifications && certifications.length > 0 && (
                                <div style={{ marginBottom: awards && awards.length > 0 ? 16 : 0 }}>
                                    <h4 style={{ fontSize: fs.small, fontWeight: 600, color: '#52525b', marginBottom: 8 }}>
                                        {t.sections.certifications}
                                    </h4>
                                    <div className="space-y-2">
                                        {certifications.map((cert) => (
                                            <div key={cert.id} data-paginate="item">
                                                <div style={{ fontWeight: 600, fontSize: fs.body, color: '#18181b' }}>{cert.name}</div>
                                                <div style={{ fontSize: fs.small, color: '#52525b' }}>{cert.issuer} • {cert.date}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {awards && awards.length > 0 && (
                                <div>
                                    <h4 style={{ fontSize: fs.small, fontWeight: 600, color: '#52525b', marginBottom: 8 }}>
                                        {t.sections.awards}
                                    </h4>
                                    <div className="space-y-2">
                                        {awards.map((award) => (
                                            <div key={award.id} data-paginate="item">
                                                <div style={{ fontWeight: 600, fontSize: fs.body, color: '#18181b' }}>{award.title}</div>
                                                <div style={{ fontSize: fs.small, color: '#52525b' }}>{award.issuer} • {award.date}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </section>
                    )}

                    {/* Social Links */}
                    {(personalInfo.linkedin || personalInfo.twitter || personalInfo.github || personalInfo.dribbble || personalInfo.behance || personalInfo.instagram) && (
                        <section className="mb-6 resume-section" data-paginate>
                            <SectionHeader fs={fs} title={t.sections.socialLinks} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: fs.body }}>
                                {personalInfo.linkedin && (
                                    <div data-paginate="item"><strong>LinkedIn:</strong> {personalInfo.linkedin}</div>
                                )}
                                {personalInfo.twitter && (
                                    <div data-paginate="item"><strong>Twitter:</strong> {personalInfo.twitter}</div>
                                )}
                                {personalInfo.github && (
                                    <div data-paginate="item"><strong>GitHub:</strong> {personalInfo.github}</div>
                                )}
                                {personalInfo.dribbble && (
                                    <div data-paginate="item"><strong>Dribbble:</strong> {personalInfo.dribbble}</div>
                                )}
                                {personalInfo.behance && (
                                    <div data-paginate="item"><strong>Behance:</strong> {personalInfo.behance}</div>
                                )}
                                {personalInfo.instagram && (
                                    <div data-paginate="item"><strong>Instagram:</strong> {personalInfo.instagram}</div>
                                )}
                            </div>
                        </section>
                    )}

                    {/* References */}
                    {references && references.length > 0 && (
                        <section className="mb-6 resume-section" data-paginate>
                            <SectionHeader fs={fs} title={t.sections.references} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {references.map((ref) => (
                                    <div key={ref.id} data-paginate="item">
                                        <div style={{ fontWeight: 700, fontSize: fs.body, color: '#18181b' }}>{ref.name}</div>
                                        <div style={{ fontSize: fs.small, color: '#52525b' }}>{ref.title}, {ref.company}</div>
                                        {ref.email && <div style={{ fontSize: fs.small, color: '#52525b' }}>{ref.email}</div>}
                                        {ref.phone && <div style={{ fontSize: fs.small, color: '#52525b' }}>{ref.phone}</div>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Personal Details (Nationality, ID) */}
                    {(personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber)) && (
                        <section className="mb-6 resume-section" data-paginate>
                            <SectionHeader fs={fs} title={t.sections.personalDetails} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: fs.body }}>
                                {personalInfo.nationality && (
                                    <div data-paginate="item"><strong>Nationality:</strong> {personalInfo.nationality}</div>
                                )}
                                {personalInfo.idType && personalInfo.idNumber && (
                                    <div data-paginate="item">
                                        <strong>{personalInfo.idType === 'id' ? 'ID' : personalInfo.idType === 'passport' ? 'Passport' : personalInfo.idType === 'driving_license' ? 'Driving License' : 'ID'}:</strong> {personalInfo.idNumber}
                                    </div>
                                )}
                            </div>
                        </section>
                    )}

                    {/* Custom Field */}
                    {personalInfo.customField && personalInfo.customFieldLabel && (
                        <section className="mb-6 resume-section" data-paginate>
                            <SectionHeader fs={fs} title={personalInfo.customFieldLabel} />
                            <p style={{ fontSize: fs.body, lineHeight: 1.6 }}>{personalInfo.customField}</p>
                        </section>
                    )}
                </div>
            </div>

            {/* Footer Diagonal - Now rendered by PagedPreview backdrop for proper multi-page support */}
        </div >
    );
}

function SectionHeader({ fs, title }: { fs: ScaledFontSizes, title: string }) {
    return (
        <h3
            style={{
                fontSize: fs.sectionHeading,
                fontWeight: 900,
                color: '#18181b', // Zinc-900
                textTransform: 'uppercase',
                marginBottom: parseInt(fs.body) < 10 ? 8 : 12,
                letterSpacing: '0.05em',
            }}
        >
            {title}
        </h3>
    );
}

// Wrap with memo to prevent unnecessary re-renders
export default memo(HeaderDiagonalYellow);

// Template metadata for registry
export const headerDiagonalYellowMeta: TemplateMeta = {
    id: 'header-diagonal-yellow',
    name: 'Diagonal Yellow',
    category: 'header',
    thumbnail: '/templates/header-diagonal-yellow.png',
    description: 'Bold diagonal layout with dark header and yellow accents',
};

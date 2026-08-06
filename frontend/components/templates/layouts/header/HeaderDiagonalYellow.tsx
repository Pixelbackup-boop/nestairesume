'use client';

import { memo } from 'react';
import { Star } from 'lucide-react';
import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes, translateProficiency } from '../../shared/styleHelpers';
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
function HeaderDiagonalYellow({ data, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, strengths, interests, certifications, awards, customFields, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Titan One');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes
    const fs = getScaledFontSizes(sizeConfig, scale);

    // Spacing helper for responsive scaling
    const sizeMult = parseInt(sizeConfig.base) / 14;
    const sp = (px: number) => Math.round(px * sizeMult);

    // Icon helpers
    const iconSm = scale < 1 ? 8 : sp(10);

    const t = useTemplateTranslations();

    // Fixed colors based on reference
    const darkBg = '#18181b';
    const accentColor = customThemeColor || '#facc15'; // Yellow-400
    const textColor = '#3f3f46'; // Zinc-700

    // Dimensions
    const headerHeight = scale < 1 ? 120 : sp(220);
    const photoSize = scale < 1 ? 80 : sp(150);

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
                    marginBottom: scale < 1 ? 40 : sp(80), // Space for overlapping photo
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
                        padding: scale < 1 ? '20px' : `${sp(40)}px`,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        height: '100%',
                    }}
                >
                    {/* Name - Left side */}
                    <div style={{ width: '60%', paddingTop: scale < 1 ? 10 : sp(20) }}>
                        <h1
                            style={{
                                fontFamily: headingFont,
                                fontSize: fs.name,
                                fontWeight: 400, // Titan One is heavy by default
                                color: '#ffffff',
                                textTransform: 'uppercase',
                                lineHeight: 1.1,
                                marginBottom: scale < 1 ? 8 : sp(16),
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
                        {personalInfo.phone && <div style={{ marginBottom: sp(4) }}>{personalInfo.phone}</div>}
                        {personalInfo.email && <div style={{ marginBottom: sp(4) }}>{personalInfo.email}</div>}
                        {personalInfo.location && <div style={{ marginBottom: sp(4) }}>{personalInfo.location}</div>}
                        {personalInfo.website && <div style={{ marginBottom: sp(4) }}>{personalInfo.website}</div>}
                        {personalInfo.linkedin && <div>{personalInfo.linkedin}</div>}
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
                            border: `${sp(5)}px solid #ffffff`,
                            overflow: 'hidden',
                            backgroundColor: '#fff',
                            zIndex: 20,
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
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
                    padding: scale < 1 ? '0 20px 20px' : `0 ${sp(40)}px ${sp(40)}px`,
                    gap: scale < 1 ? 15 : sp(30),
                }}
            >
                {/* Left Column (55%) */}
                <div style={{ width: '55%' }}>
                    {personalInfo.summary && (
                        <section className="resume-section" style={{ marginBottom: sp(16) }}>
                            <SectionHeader fs={fs} title={t.sections.profile} sp={sp} />
                            <p style={{ lineHeight: 1.6, fontSize: fs.body }}>
                                {personalInfo.summary}
                            </p>
                        </section>
                    )}

                    {experience.length > 0 && (
                        <section className="resume-section" style={{ marginBottom: sp(16) }}>
                            <SectionHeader fs={fs} title={t.sections.experience} sp={sp} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: sp(16) }}>
                                {experience.map((exp) => (
                                    <div key={exp.id} className="resume-entry" data-paginate="item">
                                        <h4 style={{ fontSize: fs.entryTitle, fontWeight: 800, color: '#18181b', textTransform: 'uppercase' }}>
                                            {exp.title}
                                        </h4>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: fs.small, color: '#52525b', marginBottom: sp(4), fontWeight: 600 }}>
                                            <span>{exp.company}{(exp.city || exp.country) && `, ${[exp.city, exp.country].filter(Boolean).join(', ')}`}</span>
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

                    {education.length > 0 && (
                        <section className="resume-section" style={{ marginBottom: sp(16) }}>
                            <SectionHeader fs={fs} title={t.sections.education} sp={sp} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: sp(16) }}>
                                {education.map((edu) => (
                                    <div key={edu.id} className="resume-entry" data-paginate="item">
                                        <h4 style={{ fontSize: fs.entryTitle, fontWeight: 800, color: '#18181b', textTransform: 'uppercase' }}>
                                            {edu.degree}
                                            {edu.gpa && <span style={{ marginLeft: 8, opacity: 0.8, fontWeight: 500, fontSize: fs.body, textTransform: 'none' }}>{ t.labels.gpa || 'GPA' }: {edu.gpa}</span>}
                                        </h4>
                                        <div style={{ fontSize: fs.small, color: '#52525b', fontWeight: 600 }}>
                                            {edu.school}{(edu.city || edu.country) && `, ${[edu.city, edu.country].filter(Boolean).join(', ')}`} | {edu.startDate} - {edu.current ? t.labels.present : edu.endDate}
                                        </div>
                                        {edu.honors && (
                                            <p style={{ fontSize: fs.small, color: '#52525b', opacity: 0.8 }}>{edu.honors}</p>
                                        )}
                                        {edu.clubs && (
                                            <p style={{ fontSize: fs.small, color: '#71717a', opacity: 0.7 }}>{ t.labels.activities || 'Activities' }: {edu.clubs}</p>
                                        )}
                                        {edu.description && (
                                            <p style={{ fontSize: fs.small || fs.body, lineHeight: 1.5, color: '#4b5563', marginTop: '4px' }}>{edu.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Personal Details (Nationality, ID) */}
                    {(personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber)) && (
                        <section className="resume-section" style={{ marginBottom: sp(16) }}>
                            <SectionHeader fs={fs} title={t.sections.personalDetails} sp={sp} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: sp(4), fontSize: fs.body }}>
                                {personalInfo.nationality && (
                                    <div data-paginate="item"><strong>{t.labels.nationality || 'Nationality'}:</strong> {personalInfo.nationality}</div>
                                )}
                                {personalInfo.idType && personalInfo.idNumber && (
                                    <div data-paginate="item">
                                        <strong>{personalInfo.idType === 'id' ? (t.labels.id || 'ID') : personalInfo.idType === 'passport' ? (t.labels.passport || 'Passport') : personalInfo.idType === 'driving_license' ? (t.labels.drivingLicense || 'Driving License') : (t.labels.id || 'ID')}:</strong> {personalInfo.idNumber}
                                    </div>
                                )}
                            </div>
                        </section>
                    )}
                </div>

                {/* Right Column (45%) */}
                <div style={{ width: '45%' }}>
                    {skills.length > 0 && (
                        <section className="resume-section" style={{ marginBottom: sp(16) }}>
                            <SectionHeader fs={fs} title={t.sections.skills} sp={sp} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: sp(8) }}>
                                {skills.map((skill) => (
                                    <div key={skill.id} data-paginate="item">
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: sp(2), fontSize: fs.small, fontWeight: 700, color: '#18181b' }}>
                                            <span>{skill.name}</span>
                                        </div>
                                        <ProgressBar
                                            value={skill.level * 20}
                                            color={accentColor}
                                            height={scale < 1 ? 6 : sp(10)}
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
                        <section className="resume-section" style={{ marginBottom: sp(16) }}>
                            <SectionHeader fs={fs} title={t.sections.strengths} sp={sp} />
                            <div data-paginate="item" style={{ display: 'flex', flexWrap: 'wrap', gap: sp(6) }}>
                                {strengths.map((str) => (
                                    <span key={str.id} style={{
                                        backgroundColor: accentColor,
                                        color: '#18181b',
                                        padding: scale < 1 ? '2px 8px' : `${sp(4)}px ${sp(12)}px`,
                                        borderRadius: sp(4),
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
                        <section className="resume-section" style={{ marginBottom: sp(16) }}>
                            <SectionHeader fs={fs} title={t.sections.interests} sp={sp} />
                            <div data-paginate="item" style={{ display: 'flex', flexWrap: 'wrap', gap: `${sp(8)}px ${sp(16)}px` }}>
                                {interests.map((int) => (
                                    <span key={int.id} style={{ fontSize: fs.body, fontWeight: 500, display: 'flex', alignItems: 'center', gap: sp(4) }}>
                                        <Star size={iconSm} color={accentColor} fill={accentColor} /> {int.name}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Languages */}
                    {languages && languages.length > 0 && (
                        <section className="resume-section" style={{ marginBottom: sp(16) }}>
                            <SectionHeader fs={fs} title={t.sections.languages} sp={sp} />
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {languages.map((lang) => (
                                    <li key={lang.id} data-paginate="item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: sp(4), fontSize: fs.body, fontWeight: 600, borderBottom: `${sp(1)}px solid #e4e4e7`, paddingBottom: sp(2) }}>
                                        <span>{lang.name}</span>
                                        <span style={{ color: '#52525b', textTransform: 'capitalize' }}>{translateProficiency(lang.proficiency, t.labels)}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Credentials (Certifications & Awards) */}
                    {((certifications && certifications.length > 0) || (awards && awards.length > 0)) && (
                        <section className="resume-section" style={{ marginBottom: sp(16) }}>
                            <SectionHeader fs={fs} title={t.sections.credentials} sp={sp} />

                            {certifications && certifications.length > 0 && (
                                <div style={{ marginBottom: awards && awards.length > 0 ? sp(16) : 0 }}>
                                    <h4 style={{ fontSize: fs.small, fontWeight: 600, color: '#52525b', marginBottom: sp(8) }}>
                                        {t.sections.certifications}
                                    </h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: sp(8) }}>
                                        {certifications.map((cert) => (
                                            <div key={cert.id} data-paginate="item">
                                                <div style={{ fontWeight: 600, fontSize: fs.body, color: '#18181b' }}>{cert.name}</div>
                                                <div style={{ fontSize: fs.small, color: '#52525b' }}>{cert.issuer} • {cert.date}</div>
                                                {cert.url && <div style={{ fontSize: fs.small, color: '#52525b', opacity: 0.7 }}>{cert.url}</div>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {awards && awards.length > 0 && (
                                <div>
                                    <h4 style={{ fontSize: fs.small, fontWeight: 600, color: '#52525b', marginBottom: sp(8) }}>
                                        {t.sections.awards}
                                    </h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: sp(8) }}>
                                        {awards.map((award) => (
                                            <div key={award.id} data-paginate="item">
                                                <div style={{ fontWeight: 600, fontSize: fs.body, color: '#18181b' }}>{award.title}</div>
                                                <div style={{ fontSize: fs.small, color: '#52525b' }}>{award.issuer} • {award.date}</div>
                                            
                                                {award.description && (
                                                    <p style={{ fontSize: fs.small || fs.body, lineHeight: 1.5, color: '#4b5563', marginTop: '4px' }}>{award.description}</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </section>
                    )}

                    {/* Social Links */}
                    {(personalInfo.x || personalInfo.github || personalInfo.dribbble || personalInfo.behance || personalInfo.instagram) && (
                        <section className="resume-section" style={{ marginBottom: sp(16) }}>
                            <SectionHeader fs={fs} title={t.sections.socialLinks} sp={sp} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: sp(4), fontSize: fs.body }}>
                                {personalInfo.x && (
                                    <div data-paginate="item"><strong>X:</strong> {personalInfo.x}</div>
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


                    {/* Custom Fields */}
                    {customFields?.map((field) => (
                        <section key={field.id} className="resume-section" style={{ marginBottom: sp(16) }}>
                            <SectionHeader fs={fs} title={field.label} sp={sp} />
                            <p style={{ fontSize: fs.body, lineHeight: 1.6 }}>{field.content}</p>
                        </section>
                    ))}
                </div>
            </div>

            {/* Footer Diagonal - Now rendered by PagedPreview backdrop for proper multi-page support */}
        </div >
    );
}

function SectionHeader({ fs, title, sp }: { fs: ScaledFontSizes, title: string, sp: (px: number) => number }) {
    return (
        <h3
            style={{
                fontSize: fs.sectionHeading,
                fontWeight: 900,
                color: '#18181b', // Zinc-900
                textTransform: 'uppercase',
                marginBottom: sp(12),
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

'use client';

import { memo } from 'react';
import { Diamond } from 'lucide-react';
import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';
import CircularProgress from '../../shared/CircularProgress';
import ProgressBar from '../../shared/ProgressBar';
import { useTemplateTranslations } from '@/lib/templates/TranslationContext';

/**
 * Header Geometric Template
 * Features a geometric pattern top decoration, dark header bar with centered name,
 * and a two-column body with section labels on the left.
 *
 * Layout:
 * - Geometric pattern decoration at top (Triangular Mesh)
 * - Dark header bar (#78350f) with centered name
 * - Two-column body: Labels LEFT (~25%), Content RIGHT (~75%)
 * - Circular charts for strengths
 *
 * Matches reference: frontend/Resume-template/unique-layouts/09-geometric-header.webp
 */
function HeaderGeometric({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, strengths, interests, certifications, awards, customFields, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Merriweather'); // Serif default
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes
    const fs = getScaledFontSizes(sizeConfig, scale);
    const sizeMult = parseInt(sizeConfig.base) / 14;
    const sp = (px: number) => Math.round(px * sizeMult);

    const t = useTemplateTranslations();

    // Fixed colors
    const headerBgColor = customThemeColor || '#78350f'; // Follows accent color
    const accentColor = customThemeColor || '#92400e'; // Amber-800 (Copper)
    const textColor = '#374151'; // Gray-700

    // Dimensions
    const patternHeight = scale < 1 ? 60 : sp(120);
    const headerHeight = scale < 1 ? 60 : sp(100);

    return (
        <div
            className="w-full h-full"
            style={{
                fontFamily: bodyFont,
                fontSize: sizeConfig.base,
                backgroundColor: '#ffffff',
                color: textColor,
            }}
        >
            {/* Geometric Pattern Decoration */}
            <div
                style={{
                    height: patternHeight,
                    backgroundColor: '#ffffff',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 800 120"
                    preserveAspectRatio="none"
                    style={{ position: 'absolute', top: 0, left: 0 }}
                >
                    {/* Triangular Mesh Pattern */}
                    <path d="M0 0 L200 120 L400 0 L600 120 L800 0 V120 H0 Z" fill="none" stroke={accentColor} strokeWidth="0.5" opacity="0.3" />
                    <path d="M0 120 L200 0 L400 120 L600 0 L800 120" fill="none" stroke={accentColor} strokeWidth="0.5" opacity="0.3" />
                    <path d="M100 0 L300 120 L500 0 L700 120" fill="none" stroke={accentColor} strokeWidth="0.5" opacity="0.3" />
                    {/* Random connection points for 'mesh' look */}
                    <circle cx="200" cy="60" r="2" fill={accentColor} opacity="0.6" />
                    <circle cx="400" cy="60" r="2" fill={accentColor} opacity="0.6" />
                    <circle cx="600" cy="60" r="2" fill={accentColor} opacity="0.6" />
                </svg>
            </div>

            {/* Header Bar - Dark Brown */}
            <header
                style={{
                    backgroundColor: headerBgColor,
                    color: '#ffffff',
                    padding: scale < 1 ? '10px 20px' : `${sp(20)}px ${sp(40)}px`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                }}
            >
                <h1
                    style={{
                        fontFamily: headingFont,
                        fontSize: fs.name,
                        fontWeight: 400,
                        letterSpacing: '0.05em',
                        marginBottom: scale < 1 ? 4 : sp(8),
                    }}
                >
                    {personalInfo.fullName || 'Your Name'}
                </h1>

                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: scale < 1 ? '12px' : sp(24)+'px',
                        fontSize: fs.small,
                        color: 'rgba(255,255,255,0.9)',
                    }}
                >
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                    {personalInfo.website && <span>{personalInfo.website}</span>}
                    {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
                </div>
            </header>

            {/* Main Content Body */}
            <div style={{ padding: scale < 1 ? '20px' : sp(40)+'px' }}>

                {/* Summary */}
                {personalInfo.summary && (
                    <SectionRow label={t.sections.profile} fs={fs} headingFont={headingFont} accentColor={accentColor} scale={scale} sp={sp}>
                        <p style={{ lineHeight: 1.6 }}>{personalInfo.summary}</p>
                    </SectionRow>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <SectionRow label={t.sections.experience} fs={fs} headingFont={headingFont} accentColor={accentColor} scale={scale} sp={sp}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: sp(24)+'px' }}>
                            {experience.map((exp) => (
                                <div key={exp.id} data-paginate="item">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: sp(2) }}>
                                        <h4 style={{ fontSize: fs.entryTitle, fontWeight: 700, color: '#1f2937' }}>
                                            {exp.title}
                                        </h4>
                                        <span style={{ fontSize: fs.small, color: '#6b7280' }}>
                                            {exp.startDate} - {exp.current ? t.labels.present : exp.endDate}
                                        </span>
                                    </div>
                                    <p style={{ color: accentColor, fontWeight: 600, fontSize: fs.body, marginBottom: sp(4) }}>
                                        {exp.company} {(exp.city || exp.country) && `| ${[exp.city, exp.country].filter(Boolean).join(', ')}`}
                                    </p>
                                    {exp.description && (
                                        <p style={{ fontSize: fs.body, lineHeight: 1.5, color: '#4b5563' }}>
                                            {exp.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </SectionRow>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <SectionRow label={t.sections.education} fs={fs} headingFont={headingFont} accentColor={accentColor} scale={scale} sp={sp}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: sp(16)+'px' }}>
                            {education.map((edu) => (
                                <div key={edu.id} data-paginate="item">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: sp(2) }}>
                                        <h4 style={{ fontSize: fs.entryTitle, fontWeight: 700, color: '#1f2937' }}>
                                            {edu.degree}
                                            {edu.gpa && <span style={{ marginLeft: 8, opacity: 0.8, fontWeight: 500, fontSize: fs.body }}>GPA: {edu.gpa}</span>}
                                        </h4>
                                        <span style={{ fontSize: fs.small, color: '#6b7280' }}>
                                            {edu.startDate} - {edu.current ? t.labels.present : edu.endDate}
                                        </span>
                                    </div>
                                    <p style={{ color: accentColor, fontWeight: 600, fontSize: fs.body }}>
                                        {edu.school}{(edu.city || edu.country) && `, ${[edu.city, edu.country].filter(Boolean).join(', ')}`}
                                    </p>
                                    {edu.honors && (
                                        <p style={{ fontSize: fs.small, color: '#4b5563', opacity: 0.8 }}>{edu.honors}</p>
                                    )}
                                    {edu.clubs && (
                                        <p style={{ fontSize: fs.small, color: '#6b7280', opacity: 0.7 }}>Activities: {edu.clubs}</p>
                                    )}
                                    {edu.description && (
                                        <p style={{ fontSize: fs.small, marginTop: sp(2) }}>{edu.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </SectionRow>
                )}

                {/* Core Strengths - Circular */}
                {strengths && strengths.length > 0 && (
                    <SectionRow label={t.sections.strengths} fs={fs} headingFont={headingFont} accentColor={accentColor} scale={scale} sp={sp} keepTogether={true}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: scale < 1 ? 15 : sp(30) }}>
                            {strengths.slice(0, 4).map((strength) => (
                                <div key={strength.id}>
                                    <CircularProgress
                                        value={strength.level > 5 ? strength.level : strength.level * 20}
                                        size={scale < 1 ? 50 : sp(80)}
                                        color={accentColor}
                                        strokeWidth={scale < 1 ? 3 : sp(4)}
                                        label={strength.name}
                                        fontSize={scale < 1 ? 9 : sp(14)}
                                        scale={scale}
                                    />
                                </div>
                            ))}
                        </div>
                    </SectionRow>
                )}

                {/* Skills */}
                {skills.length > 0 && (
                    <SectionRow label={t.sections.skills} fs={fs} headingFont={headingFont} accentColor={accentColor} scale={scale} sp={sp}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: sp(8)+'px' }}>
                            {skills.map((skill) => (
                                <div key={skill.id} data-paginate="item">
                                    <ProgressBar
                                        label={skill.name}
                                        value={(skill.level || 3) * 20}
                                        color={accentColor}
                                        height={scale < 1 ? 4 : sp(6)}
                                        scale={1}
                                    />
                                </div>
                            ))}
                        </div>
                    </SectionRow>
                )}

                {/* Languages */}
                {data.languages && data.languages.length > 0 && (
                    <SectionRow label={t.sections.languages} fs={fs} headingFont={headingFont} accentColor={accentColor} scale={scale} sp={sp}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: sp(8)+'px' }}>
                            {data.languages.map((lang) => (
                                <div key={lang.id} data-paginate="item" style={{ display: 'flex', justifyContent: 'space-between', fontSize: fs.body, borderBottom: `${sp(1)}px solid #f3f4f6`, paddingBottom: sp(4) }}>
                                    <span style={{ fontWeight: 600, color: '#1f2937' }}>{lang.name}</span>
                                    <span style={{ color: '#6b7280', textTransform: 'capitalize' }}>{lang.proficiency}</span>
                                </div>
                            ))}
                        </div>
                    </SectionRow>
                )}

                {/* Interests */}
                {data.interests && data.interests.length > 0 && (
                    <SectionRow label={t.sections.interests} fs={fs} headingFont={headingFont} accentColor={accentColor} scale={scale} sp={sp}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: sp(16) }}>
                            {data.interests.map((int) => (
                                <span key={int.id} data-paginate="item" style={{ fontSize: fs.body, color: '#374151', display: 'flex', alignItems: 'center', gap: sp(6) }}>
                                    <Diamond size={sp(10)} color={accentColor} fill={accentColor} /> {int.name}
                                </span>
                            ))}
                        </div>
                    </SectionRow>
                )}

                {/* Credentials (Certifications & Awards) */}
                {((certifications && certifications.length > 0) || (awards && awards.length > 0)) && (
                    <SectionRow label={t.sections.credentials} fs={fs} headingFont={headingFont} accentColor={accentColor} scale={scale} sp={sp}>
                        {certifications && certifications.length > 0 && (
                            <div style={{ marginBottom: awards && awards.length > 0 ? sp(16) : 0 }}>
                                <h4 style={{ fontSize: fs.small, fontWeight: 600, color: '#6b7280', marginBottom: sp(8) }}>
                                    {t.sections.certifications}
                                </h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: sp(8)+'px' }}>
                                    {certifications.map((cert) => (
                                        <div key={cert.id} data-paginate="item">
                                            <div style={{ fontWeight: 600, fontSize: fs.body, color: '#1f2937' }}>{cert.name}</div>
                                            <div style={{ fontSize: fs.small, color: '#6b7280' }}>{cert.issuer} • {cert.date}</div>
                                            {cert.url && <div style={{ fontSize: fs.small, color: '#6b7280', opacity: 0.7 }}>{cert.url}</div>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {awards && awards.length > 0 && (
                            <div>
                                <h4 style={{ fontSize: fs.small, fontWeight: 600, color: '#6b7280', marginBottom: sp(8) }}>
                                    {t.sections.awards}
                                </h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: sp(8)+'px' }}>
                                    {awards.map((award) => (
                                        <div key={award.id} data-paginate="item">
                                            <div style={{ fontWeight: 600, fontSize: fs.body, color: '#1f2937' }}>{award.title}</div>
                                            <div style={{ fontSize: fs.small, color: '#6b7280' }}>{award.issuer} • {award.date}</div>
                                        
                                            {award.description && (
                                                <p style={{ fontSize: fs.small || fs.body, lineHeight: 1.5, color: '#4b5563', marginTop: '4px' }}>{award.description}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </SectionRow>
                )}

                {/* Social Links */}
                {(personalInfo.x || personalInfo.github || personalInfo.dribbble || personalInfo.behance || personalInfo.instagram) && (
                    <SectionRow label={t.sections.socialLinks} fs={fs} headingFont={headingFont} accentColor={accentColor} scale={scale} sp={sp}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: sp(6), fontSize: fs.body }}>
                            {personalInfo.x && <div data-paginate="item"><span style={{ fontWeight: 600 }}>X:</span> {personalInfo.x}</div>}
                            {personalInfo.github && <div data-paginate="item"><span style={{ fontWeight: 600 }}>GitHub:</span> {personalInfo.github}</div>}
                            {personalInfo.dribbble && <div data-paginate="item"><span style={{ fontWeight: 600 }}>Dribbble:</span> {personalInfo.dribbble}</div>}
                            {personalInfo.behance && <div data-paginate="item"><span style={{ fontWeight: 600 }}>Behance:</span> {personalInfo.behance}</div>}
                            {personalInfo.instagram && <div data-paginate="item"><span style={{ fontWeight: 600 }}>Instagram:</span> {personalInfo.instagram}</div>}
                        </div>
                    </SectionRow>
                )}


                {/* Personal Details */}
                {(personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber)) && (
                    <SectionRow label={t.sections.personalDetails} fs={fs} headingFont={headingFont} accentColor={accentColor} scale={scale} sp={sp}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: sp(6), fontSize: fs.body }}>
                            {personalInfo.nationality && (
                                <div data-paginate="item"><span style={{ fontWeight: 600 }}>{t.labels.nationality || 'Nationality'}:</span> {personalInfo.nationality}</div>
                            )}
                            {personalInfo.idType && personalInfo.idNumber && (
                                <div data-paginate="item">
                                    <span style={{ fontWeight: 600 }}>
                                        {personalInfo.idType === 'id' ? (t.labels.id || 'ID') :
                                            personalInfo.idType === 'passport' ? (t.labels.passport || 'Passport') :
                                                personalInfo.idType === 'driving_license' ? (t.labels.drivingLicense || 'Driving License') : (t.labels.id || 'ID')}:
                                    </span> {personalInfo.idNumber}
                                </div>
                            )}
                        </div>
                    </SectionRow>
                )}

                {/* Custom Fields */}
                {customFields?.map((field) => (
                    <SectionRow key={field.id} label={field.label} fs={fs} headingFont={headingFont} accentColor={accentColor} scale={scale} sp={sp}>
                        <p style={{ lineHeight: 1.6 }}>{field.content}</p>
                    </SectionRow>
                ))}

            </div>
        </div>
    );
}

// Helper: Two-Column Section with Left Label
function SectionRow({ label, fs, headingFont, accentColor, scale, sp, children, keepTogether = false }: {
    label: string,
    fs: ScaledFontSizes,
    headingFont: string,
    accentColor: string,
    scale: number,
    sp: (px: number) => number,
    children: React.ReactNode,
    keepTogether?: boolean
}) {
    return (
        <div
            className="section-row resume-section"
            {...(keepTogether ? { 'data-paginate': true } : {})}
            style={{
                display: 'flex',
                marginBottom: scale < 1 ? 10 : sp(20),
                // Removed pageBreakInside: 'avoid' to allow granular splitting unless keepTogether is set by PagedPreview logic
            }}
        >
            {/* Left Column: Label */}
            <div style={{ width: '25%', paddingRight: sp(20) }}>
                <div
                    role="heading"
                    aria-level={3}
                    style={{
                        fontFamily: headingFont,
                        fontSize: fs.sectionHeading,
                        color: accentColor,
                        textTransform: 'uppercase',
                        borderBottom: `${sp(2)}px solid ${accentColor}`,
                        paddingBottom: sp(4),
                        display: 'inline-block',
                        marginBottom: 0,
                    }}
                >
                    {label}
                </div>
            </div>

            {/* Right Column: Content */}
            <div style={{ width: '75%' }}>
                {children}
            </div>
        </div>
    );
}

// Wrap with memo to prevent unnecessary re-renders
export default memo(HeaderGeometric);

// Template metadata
export const headerGeometricMeta: TemplateMeta = {
    id: 'header-geometric',
    name: 'Geometric Brown',
    category: 'header',
    thumbnail: '/templates/header-geometric.png',
    description: 'Professional layout with geometric pattern and side labels',
};

'use client';

import { memo } from 'react';
import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';
import { useTemplateTranslations } from '@/lib/templates/TranslationContext';
import { parseDualColor, getContrastText } from '@/lib/templates/builder/colorUtils';
import {
    User, Briefcase, GraduationCap, Wrench, MessageCircle, Zap, Star, Trophy,
    Link, ClipboardList, FileText, Pin, LucideIcon
} from 'lucide-react';

/**
 * Header Decorative Template
 * Dark header with subtle geometric line pattern.
 * Photo overlaps the bottom edge of the header on the left.
 *
 * Layout:
 * - Header: Dark Grey (#1f1f1f) with SVG Line Pattern.
 * - Photo: Left-aligned, overlapping bottom edge.
 * - Name/Contact: Right-aligned in header, text white/yellow.
 * - Body: Two-column layout (Main Left, Sidebar Right).
 *
 * Matches reference: frontend/Resume-template/unique-layouts/16-decorative-pattern.webp
 */
function HeaderDecorative({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, awards, interests, certifications, references, customFields, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Merriweather');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes
    const fs = getScaledFontSizes(sizeConfig, scale);
    const sizeMult = parseInt(sizeConfig.base) / 14;
    const sp = (px: number) => Math.round(px * sizeMult);
    const t = useTemplateTranslations();

    // Colors — dual color: primary = header bg, secondary = accent
    const { primary: headerBgColor, secondary: accentColor } = parseDualColor(
        customThemeColor,
        { primary: '#1f1f1f', secondary: '#eab308' }
    );
    const headerText = getContrastText(headerBgColor);

    // Dimensions
    const headerHeight = scale < 1 ? 100 : sp(180);
    const photoSize = scale < 1 ? 80 : sp(150);
    const photoOffset = photoSize / 3;

    return (
        <div
            className="w-full h-full"
            style={{
                fontFamily: bodyFont,
                fontSize: sizeConfig.base,
                backgroundColor: '#ffffff',
                color: '#374151',
                position: 'relative',
            }}
        >
            {/* Header Area */}
            <header
                style={{
                    height: headerHeight,
                    background: `radial-gradient(ellipse at 10% 0%, ${accentColor}44, transparent 60%), radial-gradient(ellipse at 90% 100%, ${accentColor}22, transparent 60%), linear-gradient(160deg, ${headerBgColor}, ${headerBgColor})`,
                    position: 'relative',
                    marginBottom: photoOffset + (scale < 1 ? 20 : sp(40)),
                    overflow: 'visible', // Allow photo to break out
                }}
            >

                <div style={{
                    padding: scale < 1 ? '16px 20px' : `${sp(32)}px ${sp(40)}px`,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    position: 'relative',
                    zIndex: 10
                }}>
                    <h1 style={{
                        fontFamily: headingFont,
                        fontSize: fs.name,
                        fontWeight: 700,
                        color: headerText,
                        textAlign: 'right',
                        marginBottom: sp(4),
                        letterSpacing: '0.05em'
                    }}>
                        {personalInfo.fullName || 'Your Name'}
                    </h1>
                    <p style={{
                        fontSize: fs.jobTitle,
                        color: headerText,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        textAlign: 'right',
                        marginBottom: sp(12)
                    }}>
                        {personalInfo.jobTitle || 'Job Title'}
                    </p>

                    <div style={{
                        display: 'flex',
                        gap: sp(16),
                        flexWrap: 'wrap',
                        justifyContent: 'flex-end',
                        color: `${headerText}cc`,
                        fontSize: fs.small
                    }}>
                        {personalInfo.email && <span>{personalInfo.email}</span>}
                        {personalInfo.phone && <span>{personalInfo.phone}</span>}
                        {personalInfo.location && <span>{personalInfo.location}</span>}
                        {personalInfo.website && <span style={{ wordBreak: 'break-all' as const }}>{personalInfo.website}</span>}
                        {personalInfo.linkedin && <span style={{ wordBreak: 'break-all' as const }}>{personalInfo.linkedin}</span>}
                    </div>
                </div>

                {/* Overlapping Photo (Left Aligned) */}
                <div style={{
                    position: 'absolute',
                    bottom: -photoOffset,
                    left: scale < 1 ? 20 : sp(40),
                    width: photoSize,
                    height: photoSize,
                    borderRadius: '50%',
                    border: `${sp(6)}px solid #ffffff`,
                    overflow: 'hidden',
                    backgroundColor: '#e5e7eb',
                    zIndex: 20
                }}>
                    {personalInfo.profileImage ? (
                        <img
                            src={personalInfo.profileImage}
                            alt={personalInfo.fullName}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    ) : (
                        <div style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: fs.name,
                            color: '#9ca3af'
                        }}>
                            {personalInfo.fullName?.charAt(0) || '?'}
                        </div>
                    )}
                </div>
            </header>

            {/* Main Content Body */}
            <div style={{
                display: 'flex',
                gap: scale < 1 ? 20 : sp(40),
                padding: scale < 1 ? '0 20px 20px' : `0 ${sp(40)}px ${sp(40)}px`,
            }}>
                {/* Main Column (Left) */}
                <div style={{ width: '60%' }}>
                    {personalInfo.summary && (
                        <section className="resume-section" style={{ marginBottom: sp(20) }}>
                            <SectionHeader title={t.sections.profile} icon={User} accent={accentColor} fs={fs} headingFont={headingFont} sp={sp} />
                            <p style={{ lineHeight: 1.6, fontSize: fs.body }}>{personalInfo.summary}</p>
                        </section>
                    )}

                    {experience.length > 0 && (
                        <div className="resume-section" style={{ marginBottom: sp(20) }}>
                            <SectionHeader title={t.sections.experience} icon={Briefcase} accent={accentColor} fs={fs} headingFont={headingFont} sp={sp} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: sp(24)+'px' }}>
                                {experience.map((exp) => (
                                    <div key={exp.id} data-paginate="item">
                                        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: sp(2) }}>
                                            <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#111827' }}>{exp.title}</h4>
                                            <span style={{ fontSize: fs.small, color: '#6b7280', fontStyle: 'italic' }}>
                                                {exp.startDate} – {exp.current ? t.labels.present : exp.endDate}
                                            </span>
                                        </div>
                                        <p style={{ fontSize: fs.body, fontWeight: 500, color: accentColor, marginBottom: sp(4) }}>
                                            {exp.company}, {exp.city}
                                        </p>
                                        <p style={{ fontSize: fs.body, lineHeight: 1.5 }}>
                                            {exp.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {education.length > 0 && (
                        <div className="resume-section" style={{ marginBottom: sp(20) }}>
                            <SectionHeader title={t.sections.education} icon={GraduationCap} accent={accentColor} fs={fs} headingFont={headingFont} sp={sp} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: sp(16)+'px' }}>
                                {education.map((edu) => (
                                    <div key={edu.id} data-paginate="item">
                                        <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#111827' }}>{edu.degree}</h4>
                                        <p style={{ fontSize: fs.body, fontWeight: 500, color: accentColor }}>
                                            {edu.school}, {edu.city}
                                        </p>
                                        <p style={{ fontSize: fs.small, color: '#6b7280' }}>
                                            {edu.startDate} – {edu.endDate || t.labels.present}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Personal Details */}
                    {(personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber)) && (
                        <div className="resume-section" style={{ marginBottom: sp(20) }}>
                            <SectionHeader title={t.sections.personalDetails} icon={FileText} accent={accentColor} fs={fs} headingFont={headingFont} sp={sp} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: sp(6), fontSize: fs.body }}>
                                {personalInfo.nationality && (
                                    <div data-paginate="item"><span style={{ fontWeight: 600 }}>Nationality:</span> {personalInfo.nationality}</div>
                                )}
                                {personalInfo.idType && personalInfo.idNumber && (
                                    <div data-paginate="item">
                                        <span style={{ fontWeight: 600 }}>
                                            {personalInfo.idType === 'id' ? 'ID' :
                                                personalInfo.idType === 'passport' ? 'Passport' :
                                                    personalInfo.idType === 'driving_license' ? 'Driving License' : 'ID'}:
                                        </span> {personalInfo.idNumber}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar (Right) */}
                <div style={{ width: '35%' }}>

                    {/* Skills */}
                    {skills.length > 0 && (
                        <div className="resume-section" style={{ marginBottom: sp(20) }}>
                            <SectionHeader title={t.sections.skills} icon={Wrench} accent={accentColor} fs={fs} headingFont={headingFont} sp={sp} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: sp(12)+'px' }}>
                                {skills.map((skill) => (
                                    <div key={skill.id} data-paginate="item">
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: sp(2), fontSize: fs.body }}>
                                            <span style={{ fontWeight: 500 }}>{skill.name}</span>
                                        </div>
                                        {/* Stylized Progress Bar */}
                                        <div style={{ width: '100%', height: sp(6), backgroundColor: '#f3f4f6', borderRadius: sp(3) }}>
                                            <div style={{
                                                width: `${(skill.level || 3) * 20}%`,
                                                height: '100%',
                                                backgroundColor: accentColor,
                                                borderRadius: sp(3),
                                                backgroundImage: 'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)',
                                                backgroundSize: '1rem 1rem'
                                            }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Languages */}
                    {data.languages && data.languages.length > 0 && (
                        <div className="resume-section" style={{ marginBottom: sp(20) }}>
                            <SectionHeader title={t.sections.languages} icon={MessageCircle} accent={accentColor} fs={fs} headingFont={headingFont} sp={sp} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: sp(8)+'px' }}>
                                {data.languages.map((lang) => (
                                    <div key={lang.id} data-paginate="item" style={{ display: 'flex', justifyContent: 'space-between', fontSize: fs.body }}>
                                        <span style={{ fontWeight: 500 }}>{lang.name}</span>
                                        <span style={{ fontSize: fs.small, color: '#6b7280', textTransform: 'capitalize' }}>{lang.proficiency}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Strengths */}
                    {data.strengths && data.strengths.length > 0 && (
                        <div className="resume-section" style={{ marginBottom: sp(20) }}>
                            <SectionHeader title={t.sections.strengths} icon={Zap} accent={accentColor} fs={fs} headingFont={headingFont} sp={sp} />
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: sp(6) }}>
                                {data.strengths.map((str) => (
                                    <span key={str.id} data-paginate="item" style={{
                                        fontSize: fs.small,
                                        fontWeight: 600,
                                        color: accentColor,
                                        border: `${sp(1)}px solid ${accentColor}`,
                                        padding: `${sp(2)}px ${sp(8)}px`,
                                        borderRadius: sp(12)
                                    }}>
                                        {str.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Interests */}
                    {interests && interests.length > 0 && (
                        <div className="resume-section" style={{ marginBottom: sp(20) }}>
                            <SectionHeader title={t.sections.interests} icon={Star} accent={accentColor} fs={fs} headingFont={headingFont} sp={sp} />
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: sp(8) }}>
                                {interests.map((int) => (
                                    <span key={int.id} data-paginate="item" style={{
                                        fontSize: fs.small,
                                        backgroundColor: '#f3f4f6',
                                        padding: `${sp(4)}px ${sp(8)}px`,
                                        borderRadius: sp(4),
                                        color: '#374151',
                                        borderLeft: `${sp(3)}px solid ${accentColor}`
                                    }}>
                                        {int.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Credentials (Certifications & Awards) */}
                    {((certifications && certifications.length > 0) || (awards && awards.length > 0)) && (
                        <div className="resume-section" style={{ marginBottom: sp(20) }}>
                            <SectionHeader title={t.sections.credentials} icon={Trophy} accent={accentColor} fs={fs} headingFont={headingFont} sp={sp} />

                            {certifications && certifications.length > 0 && (
                                <div style={{ marginBottom: awards && awards.length > 0 ? sp(16) : 0 }}>
                                    <h4 style={{ fontSize: fs.small, fontWeight: 600, color: '#6b7280', marginBottom: sp(8), textTransform: 'uppercase' }}>
                                        {t.sections.certifications}
                                    </h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: sp(12)+'px' }}>
                                        {certifications.map((cert) => (
                                            <div key={cert.id} data-paginate="item">
                                                <div style={{ fontWeight: 600, fontSize: fs.body, color: '#111827' }}>{cert.name}</div>
                                                <div style={{ fontSize: fs.small, color: '#6b7280' }}>{cert.issuer} • {cert.date}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {awards && awards.length > 0 && (
                                <div>
                                    <h4 style={{ fontSize: fs.small, fontWeight: 600, color: '#6b7280', marginBottom: sp(8), textTransform: 'uppercase' }}>
                                        {t.sections.awards}
                                    </h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: sp(12)+'px' }}>
                                        {awards.map((awr) => (
                                            <div key={awr.id} data-paginate="item">
                                                <div style={{ fontWeight: 600, fontSize: fs.body, color: '#111827' }}>{awr.title}</div>
                                                <div style={{ fontSize: fs.small, color: '#6b7280' }}>{awr.issuer} • {awr.date}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Social Links */}
                    {(personalInfo.x || personalInfo.github || personalInfo.dribbble || personalInfo.behance || personalInfo.instagram) && (
                        <div className="resume-section" style={{ marginBottom: sp(20) }}>
                            <SectionHeader title={t.sections.socialLinks} icon={Link} accent={accentColor} fs={fs} headingFont={headingFont} sp={sp} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: sp(6), fontSize: fs.body }}>
                                {personalInfo.x && <div data-paginate="item"><span style={{ fontWeight: 600 }}>X:</span> {personalInfo.x}</div>}
                                {personalInfo.github && <div data-paginate="item"><span style={{ fontWeight: 600 }}>GitHub:</span> {personalInfo.github}</div>}
                                {personalInfo.dribbble && <div data-paginate="item"><span style={{ fontWeight: 600 }}>Dribbble:</span> {personalInfo.dribbble}</div>}
                                {personalInfo.behance && <div data-paginate="item"><span style={{ fontWeight: 600 }}>Behance:</span> {personalInfo.behance}</div>}
                                {personalInfo.instagram && <div data-paginate="item"><span style={{ fontWeight: 600 }}>Instagram:</span> {personalInfo.instagram}</div>}
                            </div>
                        </div>
                    )}

                    {/* References */}
                    {references && references.length > 0 && (
                        <div className="resume-section" style={{ marginBottom: sp(20) }}>
                            <SectionHeader title={t.sections.references} icon={ClipboardList} accent={accentColor} fs={fs} headingFont={headingFont} sp={sp} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: sp(12) }}>
                                {references.map((ref) => (
                                    <div key={ref.id} data-paginate="item">
                                        <div style={{ fontWeight: 700, fontSize: fs.body, color: '#111827' }}>{ref.name}</div>
                                        <div style={{ fontSize: fs.small, color: '#6b7280' }}>{ref.title}, {ref.company}</div>
                                        {ref.email && <div style={{ fontSize: fs.small, color: '#374151' }}>{ref.email}</div>}
                                        {ref.phone && <div style={{ fontSize: fs.small, color: '#374151' }}>{ref.phone}</div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Custom Fields */}
                    {customFields?.map((field) => (
                        <div key={field.id} className="resume-section" style={{ marginBottom: sp(20) }}>
                            <SectionHeader title={field.label} icon={Pin} accent={accentColor} fs={fs} headingFont={headingFont} sp={sp} />
                            <p style={{ fontSize: fs.body, lineHeight: 1.6 }} data-paginate="item">{field.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function SectionHeader({ title, icon: Icon, accent, fs, headingFont, sp }: { title: string, icon: LucideIcon, accent: string, fs: ScaledFontSizes, headingFont: string, sp: (px: number) => number }) {
    const iconSize = sp(16);

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: sp(8),
            marginBottom: sp(16),
            borderBottom: `${sp(2)}px solid #f3f4f6`,
            paddingBottom: sp(8)
        }}>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: accent }}>
                <Icon size={iconSize} strokeWidth={2} />
            </span>
            <h3 style={{
                fontFamily: headingFont,
                fontSize: fs.sectionHeading,
                fontWeight: 800,
                color: '#111827',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
            }}>
                {title}
            </h3>
        </div>
    );
}

// Wrap with memo to prevent unnecessary re-renders
export default memo(HeaderDecorative);

// Template metadata
export const headerDecorativeMeta: TemplateMeta = {
    id: 'header-decorative',
    name: 'Decorative',
    category: 'header',
    thumbnail: '/templates/header-decorative.png',
    description: 'Modern dark header with geometric patterns',
};

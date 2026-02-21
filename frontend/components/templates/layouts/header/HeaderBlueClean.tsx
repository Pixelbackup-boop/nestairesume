'use client';

import React, { memo } from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe, Briefcase, GraduationCap, Code, Heart, Award, Users, User, FileText, Twitter, Github, Dribbble, Palette, Camera } from 'lucide-react';
import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, getScaledFontSizes, ScaledFontSizes, fontSizes } from '../../shared/styleHelpers';
import ProgressBar from '../../shared/ProgressBar';
import { useTemplateTranslations } from '@/lib/templates/TranslationContext';
import { parseDualColor } from '@/lib/templates/builder/colorUtils';

/**
 * Header Blue Clean Template
 * Header layout with gradient banner and two-column content below.
 * Matches backend PDF: header-blue-clean.ts
 */
function HeaderBlueClean({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, awards, certifications, customFields, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Roboto');
    const bodyFont = getFontFamily(fonts?.body || 'Open Sans');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];
    const fs = getScaledFontSizes(sizeConfig, scale);
    const t = useTemplateTranslations();

    // Colors - dual color for gradient header
    const { primary: primaryColor, secondary: secondaryColor } = parseDualColor(
        customThemeColor,
        { primary: '#7c3aed', secondary: '#a78bfa' } // Violet-600 + Violet-400 defaults
    );
    const headingColor = theme.heading || '#1f2937';
    const textColor = theme.text || '#1f2937';

    // Spacing helper: scales all dimensions proportionally with font size preference
    // Small (12/14 = 0.857x), Medium (14/14 = 1.0x), Large (16/14 = 1.143x)
    const sizeMult = parseInt(sizeConfig.base) / 14;
    const sp = (px: number) => Math.round(px * sizeMult);

    // Icon size helpers
    const iconSm = scale < 1 ? 8 : sp(10);
    const iconMd = scale < 1 ? 10 : sp(12);

    // Helper to get language level percentage
    const getLanguageLevel = (lang: { proficiency: string }) => {
        const levels: Record<string, number> = {
            'native': 100, 'fluent': 90, 'advanced': 80,
            'intermediate': 60, 'basic': 40, 'beginner': 20
        };
        return levels[lang.proficiency?.toLowerCase()] || 60;
    };

    // Contact items for header
    const contactItems = [
        { value: personalInfo.email, icon: <Mail size={iconMd} color="white" />, label: 'email' },
        { value: personalInfo.phone, icon: <Phone size={iconMd} color="white" />, label: 'phone' },
        { value: personalInfo.location, icon: <MapPin size={iconMd} color="white" />, label: 'location' },
        { value: personalInfo.linkedin, icon: <Linkedin size={iconMd} color="white" />, label: 'linkedin' },
        { value: personalInfo.website, icon: <Globe size={iconMd} color="white" />, label: 'website' }
    ].filter(item => item.value);

    return (
        <div
            className="w-full h-full"
            style={{
                fontFamily: bodyFont,
                fontSize: fs.body,
                backgroundColor: '#ffffff',
                color: textColor,
            }}
        >
            {/* Gradient Header with Diagonal Clip */}
            <header
                style={{
                    background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                    color: 'white',
                    padding: scale < 1 ? '24px 24px 32px 24px' : `${sp(48)}px ${sp(48)}px ${sp(64)}px ${sp(48)}px`,
                    clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
                }}
            >
                <div style={{ display: 'flex', gap: sp(48), alignItems: 'center' }}>
                    {/* Photo - rounded corners with rotation */}
                    {personalInfo.profileImage && (
                        <div
                            style={{
                                width: scale < 1 ? 70 : sp(140),
                                height: scale < 1 ? 70 : sp(140),
                                borderRadius: sp(16),
                                border: `${sp(4)}px solid #ffffff`,
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                overflow: 'hidden',
                                transform: 'rotate(-3deg)',
                                flexShrink: 0,
                            }}
                        >
                            <img
                                src={personalInfo.profileImage}
                                alt={personalInfo.fullName}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transform: 'rotate(3deg) scale(1.1)',
                                }}
                            />
                        </div>
                    )}

                    {/* Name & Contact */}
                    <div style={{ flex: 1 }}>
                        <h1
                            style={{
                                fontFamily: headingFont,
                                fontSize: `${parseInt(fs.name) * 1.2}px`,
                                fontWeight: 800,
                                lineHeight: 1.1,
                                margin: `0 0 ${sp(8)}px 0`,
                            }}
                        >
                            {personalInfo.fullName || 'Your Name'}
                        </h1>
                        <p
                            style={{
                                fontFamily: headingFont,
                                fontSize: fs.jobTitle,
                                fontWeight: 500,
                                opacity: 0.9,
                                margin: `0 0 ${sp(24)}px 0`,
                            }}
                        >
                            {personalInfo.jobTitle || 'Job Title'}
                        </p>

                        {/* Contact Row */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: `${sp(12)}px ${sp(24)}px`, alignItems: 'center' }}>
                            {contactItems.map((item, idx) => (
                                <div
                                    key={idx}
                                    data-paginate="item"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: sp(8),
                                        fontSize: fs.small,
                                        fontWeight: 500,
                                    }}
                                >
                                    {item.icon}
                                    <span>{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </header>

            {/* Two Column Content */}
            <div
                style={{
                    display: 'flex',
                    gap: sp(48),
                    padding: `0 ${sp(48)}px`,
                    marginTop: scale < 1 ? -10 : -sp(20),
                }}
            >
                {/* Main Column (Left) */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    {/* About Me Card */}
                    {personalInfo.summary && (
                        <div
                            className="resume-section"
                            style={{
                                background: 'white',
                                padding: sp(24),
                                borderRadius: sp(12),
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                                marginBottom: sp(16),
                            }}
                        >
                            <h3
                                style={{
                                    fontFamily: headingFont,
                                    fontSize: fs.sectionHeading,
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    color: primaryColor,
                                    marginBottom: sp(12),
                                }}
                            >
                                {t.sections.profile}
                            </h3>
                            <p style={{ fontSize: fs.body, lineHeight: 1.6, color: '#4b5563' }}>
                                {personalInfo.summary}
                            </p>
                        </div>
                    )}

                    {/* Experience */}
                    {experience.length > 0 && (
                        <div className="resume-section" style={{ marginBottom: sp(16) }}>
                            <SectionHeader title={t.sections.experience} icon={<Briefcase size={parseInt(fs.sectionHeading)} color={primaryColor} />} primary={primaryColor} fs={fs} headingFont={headingFont} sp={sp} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: sp(24) }}>
                                {experience.map((exp) => (
                                    <div
                                        key={exp.id}
                                        data-paginate="item"
                                        style={{
                                            position: 'relative',
                                            paddingLeft: sp(20),
                                            borderLeft: `${sp(2)}px solid ${primaryColor}20`,
                                        }}
                                    >
                                        {/* Timeline dot */}
                                        <div
                                            style={{
                                                position: 'absolute',
                                                left: -sp(6),
                                                top: sp(6),
                                                width: sp(10),
                                                height: sp(10),
                                                borderRadius: '50%',
                                                background: primaryColor,
                                                border: `${sp(2)}px solid white`,
                                            }}
                                        />

                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: sp(4) }}>
                                            <h4 style={{ fontFamily: headingFont, fontSize: fs.entryTitle, fontWeight: 700, color: headingColor, margin: 0 }}>
                                                {exp.title}
                                            </h4>
                                        </div>

                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: fs.small, fontWeight: 600, color: primaryColor, marginBottom: sp(8) }}>
                                            <span>{exp.company}{(exp.city || exp.country) && `, ${[exp.city, exp.country].filter(Boolean).join(', ')}`}</span>
                                            <span>{exp.startDate} – {exp.current ? t.labels.present : exp.endDate}</span>
                                        </div>

                                        <div style={{ fontSize: fs.small, lineHeight: 1.6, color: '#4b5563' }}>
                                            {exp.description}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Education */}
                    {education.length > 0 && (
                        <div className="resume-section" style={{ marginBottom: sp(16) }}>
                            <SectionHeader title={t.sections.education} icon={<GraduationCap size={parseInt(fs.sectionHeading)} color={primaryColor} />} primary={primaryColor} fs={fs} headingFont={headingFont} sp={sp} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: sp(16) }}>
                                {education.map((edu) => (
                                    <div key={edu.id} data-paginate="item">
                                        <div style={{ display: 'flex', gap: sp(16), alignItems: 'center' }}>
                                            <div style={{ width: sp(4), height: sp(40), backgroundColor: secondaryColor, borderRadius: sp(2) }} />
                                            <div>
                                                <h4 style={{ fontFamily: headingFont, fontSize: fs.entryTitle, fontWeight: 700, color: headingColor, margin: 0 }}>
                                                    {edu.school}{(edu.city || edu.country) && `, ${[edu.city, edu.country].filter(Boolean).join(', ')}`}
                                                </h4>
                                                <div style={{ fontSize: fs.small, color: '#4b5563' }}>
                                                    <span style={{ fontWeight: 600, color: primaryColor }}>{edu.degree}</span>
                                                    {edu.gpa && <span style={{ marginLeft: 8, opacity: 0.8 }}>GPA: {edu.gpa}</span>}
                                                    <span style={{ color: '#9ca3af' }}> • {edu.startDate} – {edu.endDate || t.labels.present}</span>
                                                </div>
                                            </div>
                                        </div>
                                        {edu.honors && (
                                            <p style={{ fontSize: fs.small, color: '#4b5563', opacity: 0.8, paddingLeft: sp(20) }}>{edu.honors}</p>
                                        )}
                                        {edu.clubs && (
                                            <p style={{ fontSize: fs.small, color: '#6b7280', opacity: 0.7, paddingLeft: sp(20) }}>Activities: {edu.clubs}</p>
                                        )}
                                        {edu.description && (
                                            <p style={{ fontSize: fs.small || fs.body, lineHeight: 1.5, color: '#4b5563', marginTop: '4px', paddingLeft: sp(20) }}>{edu.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Personal Details */}
                    {(personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber)) && (
                        <div className="resume-section" style={{ marginBottom: sp(16) }}>
                            <SectionHeader title={t.sections.personalDetails} icon={<User size={parseInt(fs.sectionHeading)} color={primaryColor} />} primary={primaryColor} fs={fs} headingFont={headingFont} sp={sp} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: sp(8), fontSize: fs.small, color: '#4b5563' }}>
                                {personalInfo.nationality && (
                                    <div data-paginate="item"><span style={{ fontWeight: 600, color: headingColor }}>Nationality:</span> {personalInfo.nationality}</div>
                                )}
                                {personalInfo.idType && personalInfo.idNumber && (
                                    <div data-paginate="item">
                                        <span style={{ fontWeight: 600, color: headingColor }}>
                                            {personalInfo.idType === 'id' ? 'ID' : personalInfo.idType === 'passport' ? 'Passport' : 'License'}:
                                        </span> {personalInfo.idNumber}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar (Right) */}
                <div style={{ width: scale < 1 ? 120 : sp(240), flexShrink: 0, paddingTop: sp(20) }}>
                    {/* Skills - Tags */}
                    {skills.length > 0 && (
                        <div className="resume-section" style={{ marginBottom: sp(16) }}>
                            <SectionHeader title={t.sections.skills} icon={<Code size={parseInt(fs.sectionHeading)} color={primaryColor} />} primary={primaryColor} fs={fs} headingFont={headingFont} sp={sp} />
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: sp(8) }}>
                                {skills.map((skill) => (
                                    <div
                                        key={skill.id}
                                        data-paginate="item"
                                        style={{
                                            background: 'white',
                                            border: `1px solid ${primaryColor}30`,
                                            padding: `${sp(6)}px ${sp(12)}px`,
                                            borderRadius: sp(6),
                                            fontSize: fs.small,
                                            fontWeight: 600,
                                            color: headingColor,
                                            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                                        }}
                                    >
                                        {skill.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Languages - Progress Bars */}
                    {data.languages && data.languages.length > 0 && (
                        <div className="resume-section" style={{ marginBottom: sp(16) }}>
                            <SectionHeader title={t.sections.languages} icon={<Globe size={parseInt(fs.sectionHeading)} color={primaryColor} />} primary={primaryColor} fs={fs} headingFont={headingFont} sp={sp} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: sp(12) }}>
                                {data.languages.map((lang) => (
                                    <div key={lang.id} data-paginate="item">
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: fs.small, fontWeight: 600, marginBottom: sp(4) }}>
                                            <span>{lang.name}</span>
                                            <span style={{ color: primaryColor, textTransform: 'capitalize' }}>{lang.proficiency}</span>
                                        </div>
                                        <ProgressBar value={getLanguageLevel(lang)} color={primaryColor} height={scale < 1 ? 4 : sp(6)} scale={scale} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Interests - Bullets */}
                    {data.interests && data.interests.length > 0 && (
                        <div className="resume-section" style={{ marginBottom: sp(16) }}>
                            <SectionHeader title={t.sections.interests} icon={<Heart size={parseInt(fs.sectionHeading)} color={primaryColor} />} primary={primaryColor} fs={fs} headingFont={headingFont} sp={sp} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: sp(8) }}>
                                {data.interests.map((int) => (
                                    <div key={int.id} data-paginate="item" style={{ display: 'flex', alignItems: 'center', gap: sp(8), fontSize: fs.small, color: '#4b5563' }}>
                                        <span style={{ color: secondaryColor }}>●</span>
                                        {int.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Credentials */}
                    {((certifications && certifications.length > 0) || (awards && awards.length > 0)) && (
                        <div className="resume-section" style={{ marginBottom: sp(16) }}>
                            <SectionHeader title={t.sections.credentials} icon={<Award size={parseInt(fs.sectionHeading)} color={primaryColor} />} primary={primaryColor} fs={fs} headingFont={headingFont} sp={sp} />

                            {certifications && certifications.length > 0 && (
                                <div style={{ marginBottom: awards && awards.length > 0 ? sp(16) : 0 }}>
                                    <h4 style={{ fontSize: fs.small, fontWeight: 600, color: '#6b7280', marginBottom: sp(8) }}>{t.sections.certifications}</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: sp(8) }}>
                                        {certifications.map((cert) => (
                                            <div key={cert.id} data-paginate="item">
                                                <div style={{ fontWeight: 600, fontSize: fs.small, color: headingColor }}>{cert.name}</div>
                                                <div style={{ fontSize: fs.tiny, color: '#6b7280' }}>{cert.issuer} • {cert.date}</div>
                                                {cert.url && <div style={{ fontSize: fs.tiny, color: '#6b7280', opacity: 0.7 }}>{cert.url}</div>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {awards && awards.length > 0 && (
                                <div>
                                    <h4 style={{ fontSize: fs.small, fontWeight: 600, color: '#6b7280', marginBottom: sp(8) }}>{t.sections.awards}</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: sp(8) }}>
                                        {awards.map((award) => (
                                            <div key={award.id} data-paginate="item">
                                                <div style={{ fontWeight: 600, fontSize: fs.small, color: headingColor }}>{award.title}</div>
                                                <div style={{ fontSize: fs.tiny, color: '#6b7280' }}>{award.issuer} • {award.date}</div>
                                            
                                                {award.description && (
                                                    <p style={{ fontSize: fs.small || fs.body, lineHeight: 1.5, color: '#4b5563', marginTop: '4px' }}>{award.description}</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Social Links */}
                    {(personalInfo.github || personalInfo.x || personalInfo.dribbble || personalInfo.behance || personalInfo.instagram) && (
                        <div className="resume-section" style={{ marginBottom: sp(16) }}>
                            <SectionHeader title={t.sections.socialLinks} icon={<Users size={parseInt(fs.sectionHeading)} color={primaryColor} />} primary={primaryColor} fs={fs} headingFont={headingFont} sp={sp} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: sp(8), fontSize: fs.small }}>
                                {personalInfo.github && <div data-paginate="item"><SocialLink icon={<Github size={iconMd} color={primaryColor} />} label="GitHub" url={personalInfo.github} primary={primaryColor} sp={sp} /></div>}
                                {personalInfo.x && <div data-paginate="item"><SocialLink icon={<Twitter size={iconMd} color={primaryColor} />} label="X" url={personalInfo.x} primary={primaryColor} sp={sp} /></div>}
                                {personalInfo.dribbble && <div data-paginate="item"><SocialLink icon={<Dribbble size={iconMd} color={primaryColor} />} label="Dribbble" url={personalInfo.dribbble} primary={primaryColor} sp={sp} /></div>}
                                {personalInfo.behance && <div data-paginate="item"><SocialLink icon={<Palette size={iconMd} color={primaryColor} />} label="Behance" url={personalInfo.behance} primary={primaryColor} sp={sp} /></div>}
                                {personalInfo.instagram && <div data-paginate="item"><SocialLink icon={<Camera size={iconMd} color={primaryColor} />} label="Instagram" url={personalInfo.instagram} primary={primaryColor} sp={sp} /></div>}
                            </div>
                        </div>
                    )}


                    {/* Custom Fields */}
                    {customFields?.map((field) => (
                        <div key={field.id} className="resume-section" style={{ marginBottom: sp(16) }}>
                            <SectionHeader title={field.label} icon={<FileText size={parseInt(fs.sectionHeading)} color={primaryColor} />} primary={primaryColor} fs={fs} headingFont={headingFont} sp={sp} />
                            <p style={{ fontSize: fs.small, color: '#4b5563', lineHeight: 1.6 }}>{field.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Section Header with icon in colored box
function SectionHeader({ title, icon, primary, fs, headingFont, sp }: {
    title: string;
    icon: React.ReactNode;
    primary: string;
    fs: ScaledFontSizes;
    headingFont: string;
    sp: (px: number) => number;
}) {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: sp(12),
            marginBottom: sp(20),
            borderBottom: `${sp(2)}px solid ${primary}20`,
            paddingBottom: sp(8),
        }}>
            <div style={{
                backgroundColor: `${primary}15`,
                color: primary,
                padding: sp(6),
                borderRadius: sp(6),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                {icon}
            </div>
            <h3 style={{
                fontFamily: headingFont,
                fontSize: fs.sectionHeading,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#1f2937',
                margin: 0,
            }}>
                {title}
            </h3>
        </div>
    );
}

// Social link item
function SocialLink({ icon, label, url, primary, sp }: { icon: React.ReactNode; label: string; url: string; primary: string; sp: (px: number) => number }) {
    return (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: sp(8) }}>
            <div style={{ display: 'flex', alignItems: 'center', paddingTop: sp(2) }}>{icon}</div>
            <div>
                <div style={{ fontWeight: 600, color: '#1f2937' }}>{label}</div>
                <div style={{ color: primary, wordBreak: 'break-all' }}>{url}</div>
            </div>
        </div>
    );
}

// Wrap with memo to prevent unnecessary re-renders
export default memo(HeaderBlueClean);

// Template metadata
export const headerBlueCleanMeta: TemplateMeta = {
    id: 'header-blue-clean',
    name: 'Blue Clean',
    category: 'header',
    thumbnail: '/templates/header-blue-clean.png',
    description: 'Modern header layout with gradient banner and two-column content',
};

'use client';

import { memo } from 'react';
import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, getScaledFontSizes, ScaledFontSizes, fontSizes } from '../../shared/styleHelpers';
import ProgressBar from '../../shared/ProgressBar';
import { useTemplateTranslations } from '@/lib/templates/TranslationContext';

/**
 * Header Blue Clean Template
 * Header layout with gradient banner and two-column content below.
 * Matches backend PDF: header-blue-clean.ts
 */
function HeaderBlueClean({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, awards, certifications, references, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Roboto');
    const bodyFont = getFontFamily(fonts?.body || 'Open Sans');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];
    const fs = getScaledFontSizes(sizeConfig, scale);
    const t = useTemplateTranslations();

    // Colors - match PDF theme
    const primaryColor = customThemeColor || theme.primary || '#7c3aed'; // Violet-600
    const secondaryColor = theme.secondary || '#a78bfa'; // Violet-400
    const headingColor = theme.heading || '#1f2937';
    const textColor = theme.text || '#1f2937';

    // Spacing
    const sp = {
        xs: 4 * scale,
        sm: 8 * scale,
        md: 12 * scale,
        lg: 16 * scale,
        xl: 24 * scale,
        xxl: 32 * scale,
        xxxl: 48 * scale,
    };

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
        { value: personalInfo.email, icon: '✉️', label: 'email' },
        { value: personalInfo.phone, icon: '📱', label: 'phone' },
        { value: personalInfo.location, icon: '📍', label: 'location' },
        { value: personalInfo.linkedin, icon: '🔗', label: 'linkedin' },
        { value: personalInfo.website, icon: '🌐', label: 'website' }
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
                    padding: `${sp.xxxl}px ${sp.xxxl}px ${sp.xxxl + sp.lg}px ${sp.xxxl}px`,
                    clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
                }}
            >
                <div style={{ display: 'flex', gap: sp.xxxl, alignItems: 'center' }}>
                    {/* Photo - rounded corners with rotation */}
                    {personalInfo.profileImage && (
                        <div
                            style={{
                                width: 140 * scale,
                                height: 140 * scale,
                                borderRadius: 16 * scale,
                                border: '4px solid #ffffff',
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
                                margin: `0 0 ${sp.sm}px 0`,
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
                                margin: `0 0 ${sp.xl}px 0`,
                            }}
                        >
                            {personalInfo.jobTitle || 'Job Title'}
                        </p>

                        {/* Contact Row */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: `${sp.md}px ${sp.xl}px` }}>
                            {contactItems.map((item, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: sp.sm,
                                        fontSize: fs.small,
                                        fontWeight: 500,
                                    }}
                                >
                                    <span>{item.icon}</span>
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
                    gap: sp.xxxl,
                    padding: `0 ${sp.xxxl}px`,
                    marginTop: -20 * scale,
                }}
            >
                {/* Main Column (Left) */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    {/* About Me Card */}
                    {personalInfo.summary && (
                        <div
                            className="resume-section"
                            data-paginate
                            style={{
                                background: 'white',
                                padding: sp.xl,
                                borderRadius: 12 * scale,
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                                marginBottom: sp.xxl,
                            }}
                        >
                            <h3
                                style={{
                                    fontFamily: headingFont,
                                    fontSize: fs.sectionHeading,
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    color: primaryColor,
                                    marginBottom: sp.md,
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
                        <div style={{ marginBottom: sp.xxl }}>
                            <SectionHeader title={t.sections.experience} icon="💼" primary={primaryColor} fs={fs} headingFont={headingFont} sp={sp} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: sp.xl }}>
                                {experience.map((exp) => (
                                    <div
                                        key={exp.id}
                                        data-paginate="item"
                                        style={{
                                            position: 'relative',
                                            paddingLeft: 20 * scale,
                                            borderLeft: `2px solid ${primaryColor}20`,
                                        }}
                                    >
                                        {/* Timeline dot */}
                                        <div
                                            style={{
                                                position: 'absolute',
                                                left: -6 * scale,
                                                top: 6 * scale,
                                                width: 10 * scale,
                                                height: 10 * scale,
                                                borderRadius: '50%',
                                                background: primaryColor,
                                                border: '2px solid white',
                                            }}
                                        />

                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: sp.xs }}>
                                            <h4 style={{ fontFamily: headingFont, fontSize: fs.entryTitle, fontWeight: 700, color: headingColor, margin: 0 }}>
                                                {exp.title}
                                            </h4>
                                        </div>

                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: fs.small, fontWeight: 600, color: primaryColor, marginBottom: sp.sm }}>
                                            <span>{exp.company}</span>
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
                        <div style={{ marginBottom: sp.xxl }}>
                            <SectionHeader title={t.sections.education} icon="🎓" primary={primaryColor} fs={fs} headingFont={headingFont} sp={sp} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: sp.lg }}>
                                {education.map((edu) => (
                                    <div key={edu.id} data-paginate="item" style={{ display: 'flex', gap: sp.lg, alignItems: 'center' }}>
                                        <div style={{ width: 4 * scale, height: 40 * scale, backgroundColor: secondaryColor, borderRadius: 2 * scale }} />
                                        <div>
                                            <h4 style={{ fontFamily: headingFont, fontSize: fs.entryTitle, fontWeight: 700, color: headingColor, margin: 0 }}>
                                                {edu.school}
                                            </h4>
                                            <div style={{ fontSize: fs.small, color: '#4b5563' }}>
                                                <span style={{ fontWeight: 600, color: primaryColor }}>{edu.degree}</span>
                                                <span style={{ color: '#9ca3af' }}> • {edu.startDate} – {edu.endDate || t.labels.present}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar (Right) */}
                <div style={{ width: 240 * scale, flexShrink: 0, paddingTop: 20 * scale }}>
                    {/* Skills - Tags */}
                    {skills.length > 0 && (
                        <div style={{ marginBottom: sp.xxxl }}>
                            <SectionHeader title={t.sections.skills} icon="💻" primary={primaryColor} fs={fs} headingFont={headingFont} sp={sp} />
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: sp.sm }}>
                                {skills.map((skill) => (
                                    <div
                                        key={skill.id}
                                        data-paginate="item"
                                        style={{
                                            background: 'white',
                                            border: `1px solid ${primaryColor}30`,
                                            padding: `${sp.xs + 2}px ${sp.md}px`,
                                            borderRadius: 6 * scale,
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
                        <div style={{ marginBottom: sp.xxxl }}>
                            <SectionHeader title={t.sections.languages} icon="🌍" primary={primaryColor} fs={fs} headingFont={headingFont} sp={sp} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: sp.md }}>
                                {data.languages.map((lang) => (
                                    <div key={lang.id} data-paginate="item">
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: fs.small, fontWeight: 600, marginBottom: sp.xs }}>
                                            <span>{lang.name}</span>
                                            <span style={{ color: primaryColor }}>{lang.proficiency}</span>
                                        </div>
                                        <ProgressBar value={getLanguageLevel(lang)} color={primaryColor} height={6} scale={scale} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Interests - Bullets */}
                    {data.interests && data.interests.length > 0 && (
                        <div style={{ marginBottom: sp.xxxl }}>
                            <SectionHeader title={t.sections.interests} icon="❤️" primary={primaryColor} fs={fs} headingFont={headingFont} sp={sp} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: sp.sm }}>
                                {data.interests.map((int) => (
                                    <div key={int.id} data-paginate="item" style={{ display: 'flex', alignItems: 'center', gap: sp.sm, fontSize: fs.small, color: '#4b5563' }}>
                                        <span style={{ color: secondaryColor }}>●</span>
                                        {int.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Credentials */}
                    {((certifications && certifications.length > 0) || (awards && awards.length > 0)) && (
                        <div style={{ marginBottom: sp.xxxl }}>
                            <SectionHeader title={t.sections.credentials} icon="🏆" primary={primaryColor} fs={fs} headingFont={headingFont} sp={sp} />

                            {certifications && certifications.length > 0 && (
                                <div style={{ marginBottom: awards && awards.length > 0 ? sp.lg : 0 }}>
                                    <h4 style={{ fontSize: fs.small, fontWeight: 600, color: '#6b7280', marginBottom: sp.sm }}>{t.sections.certifications}</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: sp.sm }}>
                                        {certifications.map((cert) => (
                                            <div key={cert.id} data-paginate="item">
                                                <div style={{ fontWeight: 600, fontSize: fs.small, color: headingColor }}>{cert.name}</div>
                                                <div style={{ fontSize: fs.tiny, color: '#6b7280' }}>{cert.issuer} • {cert.date}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {awards && awards.length > 0 && (
                                <div>
                                    <h4 style={{ fontSize: fs.small, fontWeight: 600, color: '#6b7280', marginBottom: sp.sm }}>{t.sections.awards}</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: sp.sm }}>
                                        {awards.map((award) => (
                                            <div key={award.id} data-paginate="item">
                                                <div style={{ fontWeight: 600, fontSize: fs.small, color: headingColor }}>{award.title}</div>
                                                <div style={{ fontSize: fs.tiny, color: '#6b7280' }}>{award.issuer} • {award.date}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Social Links */}
                    {(personalInfo.github || personalInfo.twitter || personalInfo.dribbble || personalInfo.behance || personalInfo.instagram) && (
                        <div style={{ marginBottom: sp.xxxl }}>
                            <SectionHeader title={t.sections.socialLinks} icon="👥" primary={primaryColor} fs={fs} headingFont={headingFont} sp={sp} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: sp.sm, fontSize: fs.small }}>
                                {personalInfo.github && <SocialLink icon="💻" label="GitHub" url={personalInfo.github} primary={primaryColor} />}
                                {personalInfo.twitter && <SocialLink icon="🐦" label="Twitter" url={personalInfo.twitter} primary={primaryColor} />}
                                {personalInfo.dribbble && <SocialLink icon="🎨" label="Dribbble" url={personalInfo.dribbble} primary={primaryColor} />}
                                {personalInfo.behance && <SocialLink icon="🎨" label="Behance" url={personalInfo.behance} primary={primaryColor} />}
                                {personalInfo.instagram && <SocialLink icon="📷" label="Instagram" url={personalInfo.instagram} primary={primaryColor} />}
                            </div>
                        </div>
                    )}

                    {/* References */}
                    {references && references.length > 0 && (
                        <div style={{ marginBottom: sp.xxxl }}>
                            <SectionHeader title={t.sections.references} icon="👥" primary={primaryColor} fs={fs} headingFont={headingFont} sp={sp} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: sp.lg }}>
                                {references.map((ref) => (
                                    <div key={ref.id} data-paginate="item">
                                        <div style={{ fontWeight: 700, fontSize: fs.small, color: headingColor }}>{ref.name}</div>
                                        <div style={{ fontSize: fs.tiny, fontStyle: 'italic', color: '#4b5563' }}>{ref.title}, {ref.company}</div>
                                        {ref.email && <div style={{ fontSize: fs.tiny, color: primaryColor }}>{ref.email}</div>}
                                        {ref.phone && <div style={{ fontSize: fs.tiny, color: primaryColor }}>{ref.phone}</div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Personal Details */}
                    {(personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber) || personalInfo.customField) && (
                        <div style={{ marginBottom: sp.xxxl }}>
                            <SectionHeader title={t.sections.personalDetails} icon="👤" primary={primaryColor} fs={fs} headingFont={headingFont} sp={sp} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: sp.sm, fontSize: fs.small, color: '#4b5563' }}>
                                {personalInfo.nationality && (
                                    <div><span style={{ fontWeight: 600, color: headingColor }}>Nationality:</span> {personalInfo.nationality}</div>
                                )}
                                {personalInfo.idType && personalInfo.idNumber && (
                                    <div>
                                        <span style={{ fontWeight: 600, color: headingColor }}>
                                            {personalInfo.idType === 'id' ? 'ID' : personalInfo.idType === 'passport' ? 'Passport' : 'License'}:
                                        </span> {personalInfo.idNumber}
                                    </div>
                                )}
                                {personalInfo.customField && (
                                    <div style={{ marginTop: sp.sm }}>
                                        <span style={{ fontWeight: 600, color: headingColor, display: 'block', marginBottom: 2 }}>
                                            {personalInfo.customFieldLabel || 'Additional Info'}
                                        </span>
                                        {personalInfo.customField}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Section Header with icon in colored box
function SectionHeader({ title, icon, primary, fs, headingFont, sp }: {
    title: string;
    icon: string;
    primary: string;
    fs: ScaledFontSizes;
    headingFont: string;
    sp: Record<string, number>;
}) {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: sp.md,
            marginBottom: sp.lg + sp.xs,
            borderBottom: `2px solid ${primary}20`,
            paddingBottom: sp.sm,
        }}>
            <div style={{
                backgroundColor: `${primary}15`,
                color: primary,
                padding: sp.xs + 2,
                borderRadius: 6,
                fontSize: fs.sectionHeading,
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
function SocialLink({ icon, label, url, primary }: { icon: string; label: string; url: string; primary: string }) {
    return (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
            <span>{icon}</span>
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

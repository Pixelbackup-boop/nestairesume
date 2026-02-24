'use client';

import { memo } from 'react';
import { Phone, Mail, MapPin, Globe, Linkedin } from 'lucide-react';
import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';
import ProgressBar from '../../shared/ProgressBar';
import { useTemplateTranslations } from '@/lib/templates/TranslationContext';

/**
 * Sidebar Narrow Yellow Template
 * Reference: sidebar-narrow-yellow.webp
 *
 * Layout:
 * - Sidebar: ~20% width (Narrow), Left. Yellow 400 (#facc15).
 * - Main: 80% width. White.
 * - Sidebar Text: Dark Gray.
 * - Content: Icons only or minimal text in sidebar.
 */
function SidebarNarrowYellow({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, certifications, awards, customFields, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Oswald');
    const bodyFont = getFontFamily(fonts?.body || 'Roboto Condensed');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes
    const fs = getScaledFontSizes(sizeConfig, scale);
    const sizeMult = parseInt(sizeConfig.base) / 14;
    const sp = (px: number) => Math.round(px * sizeMult);
    const t = useTemplateTranslations();

    // Icon sizes
    const iconSm = scale < 1 ? 8 : sp(14);

    // Colors — sidebar is always yellow (template identity), accent is user-customizable
    const sidebarBg = '#facc15';
    const mainBg = '#FFFFFF';
    const sidebarText = getContrastColor(sidebarBg);
    const mainText = '#1f2937';
    const accentColor = customThemeColor || theme?.primary || '#b45309';

    // Dimensions
    const photoSize = scale < 1 ? 60 : sp(100);
    const sidebarWidth = '30%'; // Wider sidebar to fit skills with levels and interests

    return (
        <div
            className="w-full h-full"
            style={{
                fontFamily: bodyFont,
                fontSize: sizeConfig.base,
                backgroundColor: mainBg,
                color: mainText,
                display: 'flex',
                flexDirection: 'row',
                boxSizing: 'border-box'
            }}
        >
            {/* Sidebar */}
            <aside
                style={{
                    width: sidebarWidth,
                    backgroundColor: sidebarBg,
                    color: sidebarText,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: scale < 1 ? '32px 12px' : `${sp(56)}px ${sp(20)}px`,
                    flexShrink: 0,
                    minHeight: '100%',
                    alignItems: 'center'
                }}
            >
                {/* Photo */}
                <div style={{ marginBottom: scale < 1 ? 32 : sp(56) }}>
                    {personalInfo.profileImage ? (
                        <img
                            src={personalInfo.profileImage}
                            alt={personalInfo.fullName}
                            style={{
                                width: photoSize,
                                height: photoSize,
                                borderRadius: '50%',
                                objectFit: 'cover',
                                border: `${sp(4)}px solid ${sidebarText}`,
                            }}
                        />
                    ) : (
                        <div
                            style={{
                                width: photoSize,
                                height: photoSize,
                                borderRadius: '50%',
                                backgroundColor: sidebarText,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: fs.name,
                                color: sidebarBg,
                            }}
                        >
                            {personalInfo.fullName?.charAt(0) || '?'}
                        </div>
                    )}
                </div>

                {/* Contact */}
                <div style={{ marginBottom: sp(20), width: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: sp(10), fontSize: fs.small }}>
                        {personalInfo.phone && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: sp(8) }}>
                                <Phone size={iconSm} color={sidebarText} />
                                <span>{personalInfo.phone}</span>
                            </div>
                        )}
                        {personalInfo.email && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: sp(8) }}>
                                <Mail size={iconSm} color={sidebarText} />
                                <span style={{ wordBreak: 'break-all' }}>{personalInfo.email}</span>
                            </div>
                        )}
                        {personalInfo.location && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: sp(8) }}>
                                <MapPin size={iconSm} color={sidebarText} />
                                <span>{personalInfo.location}</span>
                            </div>
                        )}
                        {personalInfo.website && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: sp(8) }}>
                                <Globe size={iconSm} color={sidebarText} />
                                <span style={{ wordBreak: 'break-all' }}>{personalInfo.website}</span>
                            </div>
                        )}
                        {personalInfo.linkedin && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: sp(8) }}>
                                <Linkedin size={iconSm} color={sidebarText} />
                                <span style={{ wordBreak: 'break-all' }}>{personalInfo.linkedin}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Skills with proficiency levels */}
                {skills.length > 0 && (
                    <div style={{ width: '100%', marginBottom: sp(20) }}>
                        <SidebarHeader title={t.sections.skills} sp={sp} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: sp(12) }}>
                            {skills.map((skill) => (
                                <div key={skill.id} data-paginate="item">
                                    <div style={{ marginBottom: sp(4), fontSize: fs.small, fontWeight: 600 }}>{skill.name}</div>
                                    <ProgressBar
                                        value={skill.level || 3}
                                        maxValue={5}
                                        variant="solid"
                                        color={sidebarText}
                                        trackColor={`${sidebarText}33`}
                                        height={scale < 1 ? 4 : sp(6)}
                                        scale={1}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </aside>

            {/* Main Content */}
            <main
                style={{
                    flex: 1,
                    padding: scale < 1 ? '32px 24px' : `${sp(56)}px ${sp(40)}px`,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* Header */}
                <div style={{ marginBottom: scale < 1 ? 40 : sp(64) }}>
                    <h1
                        style={{
                            fontFamily: headingFont,
                            fontSize: scale < 1 ? '32px' : sp(56) + 'px',
                            fontWeight: 800,
                            color: '#1f2937',
                            textTransform: 'uppercase',
                            margin: 0,
                            lineHeight: 0.9,
                            marginBottom: sp(8),
                        }}
                    >
                        {personalInfo.fullName}
                    </h1>
                    <p
                        style={{
                            fontSize: fs.jobTitle,
                            color: accentColor,
                            textTransform: 'uppercase',
                            fontWeight: 700,
                            letterSpacing: '0.2em'
                        }}
                    >
                        {personalInfo.jobTitle}
                    </p>
                </div>

                {/* Profile */}
                {personalInfo.summary && (
                    <section className="resume-section" style={{ marginBottom: sp(20) }}>
                        <MainHeader title={t.sections.profile} color={'#1f2937'} fs={fs} headingFont={headingFont} accentColor={accentColor} sp={sp} />
                        <p style={{ lineHeight: 1.6, fontSize: fs.body, color: '#374151' }}>
                            {personalInfo.summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <section className="resume-section" style={{ marginBottom: sp(20) }}>
                        <MainHeader title={t.sections.experience} color={'#1f2937'} fs={fs} headingFont={headingFont} accentColor={accentColor} sp={sp} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: sp(32) + 'px' }}>
                            {experience.map((exp) => (
                                <div key={exp.id} data-paginate="item">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: sp(2) }}>
                                        <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#000', textTransform: 'uppercase' }}>
                                            {exp.title}
                                        </h4>
                                        <span style={{ fontSize: fs.small, color: accentColor, fontWeight: 700 }}>{exp.startDate} – {exp.current ? t.labels.present : exp.endDate}</span>
                                    </div>
                                    <div style={{ fontSize: fs.small, color: '#4b5563', marginBottom: sp(6), fontWeight: 600 }}>
                                        {exp.company}{(exp.city || exp.country) && `, ${[exp.city, exp.country].filter(Boolean).join(', ')}`}
                                    </div>
                                    <p style={{ fontSize: fs.body, lineHeight: 1.6, color: '#374151' }}>
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <section className="resume-section" style={{ marginBottom: sp(20) }}>
                        <MainHeader title={t.sections.education} color={'#1f2937'} fs={fs} headingFont={headingFont} accentColor={accentColor} sp={sp} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: sp(16) + 'px' }}>
                            {education.map((edu) => (
                                <div key={edu.id} data-paginate="item">
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#000', textTransform: 'uppercase' }}>
                                        {edu.degree}
                                        {edu.gpa && <span style={{ marginLeft: 8, opacity: 0.8, fontWeight: 500, fontSize: fs.body, textTransform: 'none' }}>GPA: {edu.gpa}</span>}
                                    </h4>
                                    <div style={{ fontSize: fs.body, color: '#4b5563' }}>
                                        {edu.school}{(edu.city || edu.country) && `, ${[edu.city, edu.country].filter(Boolean).join(', ')}`}
                                    </div>
                                    <div style={{ fontSize: fs.small, color: '#666' }}>
                                        {edu.startDate} – {edu.endDate || t.labels.present}
                                    </div>
                                    {edu.honors && (
                                        <p style={{ fontSize: fs.small, color: '#4b5563', opacity: 0.8 }}>{edu.honors}</p>
                                    )}
                                    {edu.clubs && (
                                        <p style={{ fontSize: fs.small, color: '#666', opacity: 0.7 }}>Activities: {edu.clubs}</p>
                                    )}
                                    {edu.description && (
                                        <p style={{ fontSize: fs.small || fs.body, lineHeight: 1.5, color: '#4b5563', marginTop: '4px' }}>{edu.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
                {/* Interests */}
                {data.interests && data.interests.length > 0 && (
                    <section className="resume-section" style={{ marginBottom: sp(20) }}>
                        <MainHeader title={t.sections.interests} color={'#1f2937'} fs={fs} headingFont={headingFont} accentColor={accentColor} sp={sp} />
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: sp(8) }}>
                            {data.interests.map((int) => (
                                <div key={int.id} data-paginate="item" style={{ display: 'flex', alignItems: 'center', gap: sp(8), fontSize: fs.body }}>
                                    <span style={{ color: accentColor, fontSize: sp(8) + 'px' }}>●</span>
                                    <span style={{ fontWeight: 500 }}>{int.name}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Certifications */}
                {certifications && certifications.length > 0 && (
                    <section className="resume-section" style={{ marginBottom: sp(20) }}>
                        <MainHeader title={t.sections.certifications} color={'#1f2937'} fs={fs} headingFont={headingFont} accentColor={accentColor} sp={sp} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: sp(12) + 'px' }}>
                            {certifications.map((cert) => (
                                <div key={cert.id} data-paginate="item">
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#000' }}>
                                        {cert.name}
                                    </h4>
                                    <div style={{ fontSize: fs.body, color: accentColor, fontWeight: 500 }}>
                                        {cert.issuer}
                                    </div>
                                    <div style={{ fontSize: fs.small, color: '#666' }}>
                                        {cert.date}
                                    </div>
                                    {cert.url && <div style={{ fontSize: fs.small, color: '#666', opacity: 0.7 }}>{cert.url}</div>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Awards */}
                {awards && awards.length > 0 && (
                    <section className="resume-section" style={{ marginBottom: sp(20) }}>
                        <MainHeader title={t.sections.awards} color={'#1f2937'} fs={fs} headingFont={headingFont} accentColor={accentColor} sp={sp} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: sp(12) + 'px' }}>
                            {awards.map((award) => (
                                <div key={award.id} data-paginate="item">
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#000' }}>
                                        {award.title}
                                    </h4>
                                    <div style={{ fontSize: fs.body, color: accentColor, fontWeight: 500 }}>
                                        {award.issuer}
                                    </div>
                                    <div style={{ fontSize: fs.small, color: '#666' }}>
                                        {award.date}
                                    </div>
                                    {award.description && (
                                        <p style={{ fontSize: fs.body, lineHeight: 1.5, color: '#374151', marginTop: sp(4) }}>
                                            {award.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Languages */}
                {languages && languages.length > 0 && (
                    <section className="resume-section" style={{ marginBottom: sp(20) }}>
                        <MainHeader title={t.sections.languages} color={'#1f2937'} fs={fs} headingFont={headingFont} accentColor={accentColor} sp={sp} />
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: `${sp(12)}px ${sp(24)}px` }}>
                            {languages.map((lang) => (
                                <div key={lang.id} style={{ fontSize: fs.body, fontWeight: 700, color: '#374151' }} data-paginate="item">
                                    {lang.name} <span style={{ fontWeight: 400, opacity: 0.8, textTransform: 'capitalize' }}>({lang.proficiency})</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Personal Details - Moved here */}
                {(personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber)) && (
                    <section className="resume-section" style={{ marginBottom: sp(20) }}>
                        <MainHeader title={t.sections.personalDetails} color={'#1f2937'} fs={fs} headingFont={headingFont} accentColor={accentColor} sp={sp} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: sp(8), fontSize: fs.body }}>
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
                    </section>
                )}

                {/* Strengths */}
                {data.strengths && data.strengths.length > 0 && (
                    <section className="resume-section" style={{ marginBottom: sp(20) }}>
                        <MainHeader title={t.sections.strengths} color={'#1f2937'} fs={fs} headingFont={headingFont} accentColor={accentColor} sp={sp} />
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: sp(8) }}>
                            {data.strengths.map((str) => (
                                <span key={str.id} data-paginate="item" style={{
                                    backgroundColor: accentColor,
                                    color: '#1f2937',
                                    padding: `${sp(4)}px ${sp(12)}px`,
                                    borderRadius: sp(20),
                                    fontSize: fs.small,
                                    fontWeight: 700
                                }}>
                                    {str.name}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* Social Links */}
                {(personalInfo.x || personalInfo.github || personalInfo.dribbble || personalInfo.behance || personalInfo.instagram) && (
                    <section className="resume-section" style={{ marginBottom: sp(20) }}>
                        <MainHeader title={t.sections.socialLinks} color={'#1f2937'} fs={fs} headingFont={headingFont} accentColor={accentColor} sp={sp} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: sp(8), fontSize: fs.body }}>
                            {personalInfo.x && <div data-paginate="item"><span style={{ fontWeight: 600 }}>X:</span> {personalInfo.x}</div>}
                            {personalInfo.github && <div data-paginate="item"><span style={{ fontWeight: 600 }}>GitHub:</span> {personalInfo.github}</div>}
                            {personalInfo.dribbble && <div data-paginate="item"><span style={{ fontWeight: 600 }}>Dribbble:</span> {personalInfo.dribbble}</div>}
                            {personalInfo.behance && <div data-paginate="item"><span style={{ fontWeight: 600 }}>Behance:</span> {personalInfo.behance}</div>}
                            {personalInfo.instagram && <div data-paginate="item"><span style={{ fontWeight: 600 }}>Instagram:</span> {personalInfo.instagram}</div>}
                        </div>
                    </section>
                )}

                {/* Custom Fields */}
                {customFields?.map((field) => (
                    <section key={field.id} className="resume-section" style={{ marginBottom: sp(20) }}>
                        <MainHeader title={field.label} color={'#1f2937'} fs={fs} headingFont={headingFont} accentColor={accentColor} sp={sp} />
                        <p style={{ fontSize: fs.body, lineHeight: 1.6, color: '#374151' }}>{field.content}</p>
                    </section>
                ))}

            </main>
        </div>
    );
}

// Helpers
function SidebarHeader({ title, sp }: { title: string; sp: (px: number) => number }) {
    return (
        <h4 style={{
            fontWeight: 800,
            textTransform: 'uppercase',
            marginBottom: sp(12),
            borderBottom: `${sp(2)}px solid currentColor`,
            paddingBottom: sp(4),
            fontSize: sp(12) + 'px',
            letterSpacing: '0.05em'
        }}>
            {title}
        </h4>
    );
}

function MainHeader({ title, color, fs, headingFont, accentColor, sp }: { title: string; color: string; fs: ScaledFontSizes; headingFont: string; accentColor: string; sp: (px: number) => number }) {
    return (
        <h3
            style={{
                fontFamily: headingFont,
                fontSize: fs.sectionHeading,
                fontWeight: 800,
                color: color,
                textTransform: 'uppercase',
                marginBottom: sp(20),
                borderBottom: `${sp(4)}px solid ${accentColor}`,
                display: 'inline-block',
                paddingBottom: sp(4)
            }}
        >
            {title}
        </h3>
    );
}

// Color Helpers
const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

const getContrastColor = (hex: string) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return '#1f2937';
    // YIQ equation
    const yiq = ((rgb.r * 299) + (rgb.g * 587) + (rgb.b * 114)) / 1000;
    return yiq >= 128 ? '#1f2937' : '#ffffff';
};

export default memo(SidebarNarrowYellow);

// Meta
export const sidebarNarrowYellowMeta: TemplateMeta = {
    id: 'sidebar-narrow-yellow',
    name: 'Narrow Yellow',
    category: 'sidebar',
    thumbnail: '/templates/sidebar-narrow-yellow.webp',
    description: 'High impact narrow yellow sidebar with icon focus',
};

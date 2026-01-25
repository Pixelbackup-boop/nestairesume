'use client';

import { memo } from 'react';
import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';
import ProgressBar from '../../shared/ProgressBar';
import { useTemplateTranslations } from '@/lib/templates/TranslationContext';

/**
 * Sidebar Dark Navy Template
 * Reference: sidebar-dark-navy.jpg
 * 
 * Layout:
 * - Sidebar: 35% width, Left. Slate 800 (#1e293b).
 * - Main: 65% width. White (#FFFFFF).
 * - Accent: Blue 400 (#60a5fa).
 * - Photo: Sidebar Top, Circle.
 * - Timeline: Vertical line in experience section.
 */
function SidebarDarkNavy({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, certifications, awards, interests, references, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Roboto Slab'); // Serif for headers as per spec hint
    const bodyFont = getFontFamily(fonts?.body || 'Open Sans');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes
    const fs = getScaledFontSizes(sizeConfig, scale);

    const t = useTemplateTranslations();

    // Colors
    const sidebarBg = '#1e293b'; // Slate 800
    const mainBg = '#FFFFFF';
    const sidebarText = '#e2e8f0'; // Slate 200
    const mainText = '#334155'; // Slate 700
    const accentColor = customThemeColor || '#60a5fa'; // Blue 400

    // Dimensions
    const photoSize = scale < 1 ? 80 : 120;
    const sidebarWidth = '35%';

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
                    padding: scale < 1 ? '32px 20px' : '64px 40px',
                    flexShrink: 0,
                    minHeight: '100%',
                    alignItems: 'center'
                }}
            >
                {/* Photo */}
                <div style={{ marginBottom: scale < 1 ? 32 : 48 }}>
                    {personalInfo.profileImage ? (
                        <img
                            src={personalInfo.profileImage}
                            alt={personalInfo.fullName}
                            style={{
                                width: photoSize,
                                height: photoSize,
                                borderRadius: '50%',
                                objectFit: 'cover',
                                border: `4px solid ${accentColor}`,
                            }}
                        />
                    ) : (
                        <div
                            style={{
                                width: photoSize,
                                height: photoSize,
                                borderRadius: '50%',
                                backgroundColor: '#0f172a',
                                border: `4px solid ${accentColor}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: fs.name,
                                color: accentColor,
                            }}
                        >
                            {personalInfo.fullName?.charAt(0) || '?'}
                        </div>
                    )}
                </div>

                {/* Contact */}
                <div style={{ width: '100%', marginBottom: 40 }}>
                    <SidebarSectionHeader title={t.sections.contact} color={accentColor} fs={fs} headingFont={headingFont} />
                    <div style={{ fontSize: fs.body, display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {personalInfo.phone && <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span>📞</span><span>{personalInfo.phone}</span></div>}
                        {personalInfo.email && <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span>✉️</span><span style={{ wordBreak: 'break-all' }}>{personalInfo.email}</span></div>}
                        {personalInfo.location && <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span>📍</span><span>{personalInfo.location}</span></div>}
                        {personalInfo.website && <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span>🌐</span><span style={{ wordBreak: 'break-all' }}>{personalInfo.website}</span></div>}
                    </div>
                </div>

                {/* Skills */}
                {skills.length > 0 && (
                    <div style={{ width: '100%', marginBottom: 40 }}>
                        <SidebarSectionHeader title={t.sections.skills} color={accentColor} fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {skills.map((skill) => (
                                <div key={skill.id} data-paginate="item">
                                    <div style={{ marginBottom: 4, fontSize: fs.body, fontWeight: 500 }}>{skill.name}</div>
                                    <ProgressBar
                                        value={skill.level * 20}
                                        color={accentColor}
                                        trackColor="#334155"
                                        height={6}
                                        scale={1}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Strengths */}
                {data.strengths && data.strengths.length > 0 && (
                    <div style={{ width: '100%', marginTop: 40 }}>
                        <SidebarSectionHeader title={t.sections.strengths} color={accentColor} fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {data.strengths.map((str) => (
                                <div key={str.id} data-paginate="item">
                                    <div style={{ marginBottom: 4, fontSize: fs.body, fontWeight: 500 }}>{str.name}</div>
                                    <ProgressBar
                                        value={str.level}
                                        color={accentColor}
                                        trackColor="#334155"
                                        height={6}
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
                    padding: scale < 1 ? '32px 24px' : '64px 48px',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* Header */}
                <div style={{ marginBottom: scale < 1 ? 40 : 60, borderBottom: `2px solid ${accentColor}`, paddingBottom: 24 }}>
                    <h1
                        style={{
                            fontFamily: headingFont,
                            fontSize: fs.name,
                            fontWeight: 700,
                            color: '#0f172a',
                            textTransform: 'uppercase',
                            margin: 0,
                            marginBottom: 8,
                            letterSpacing: '0.05em'
                        }}
                    >
                        {personalInfo.fullName}
                    </h1>
                    <p
                        style={{
                            fontSize: fs.jobTitle,
                            color: accentColor,
                            textTransform: 'uppercase',
                            fontWeight: 600,
                            letterSpacing: '0.1em'
                        }}
                    >
                        {personalInfo.jobTitle}
                    </p>
                </div>

                {/* Profile */}
                {personalInfo.summary && (
                    <section className="mb-8 resume-section">
                        <h3 style={{ fontFamily: headingFont, fontSize: fs.sectionHeading, color: '#0f172a', textTransform: 'uppercase', marginBottom: 16, fontWeight: 700 }}>{t.sections.profile}</h3>
                        <p style={{ lineHeight: 1.6, fontSize: fs.body, color: '#334155' }}>{personalInfo.summary}</p>
                    </section>
                )}

                {/* Experience with Timeline */}
                {experience.length > 0 && (
                    <section className="mb-8 resume-section">
                        <h3 style={{ fontFamily: headingFont, fontSize: fs.sectionHeading, color: '#0f172a', textTransform: 'uppercase', marginBottom: 24, fontWeight: 700 }}>{t.sections.experience}</h3>
                        <div style={{
                            position: 'relative',
                            paddingLeft: 20,
                            borderLeft: '2px solid #e2e8f0'
                        }}>
                            {experience.map((exp) => (
                                <div key={exp.id} style={{ position: 'relative', marginBottom: 32 }}>
                                    {/* Timeline Dot */}
                                    <div style={{
                                        position: 'absolute',
                                        left: -25,
                                        top: 4,
                                        width: 12,
                                        height: 12,
                                        borderRadius: '50%',
                                        backgroundColor: accentColor,
                                        border: '2px solid white'
                                    }}></div>

                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#0f172a', marginBottom: 4 }}>{exp.title}</h4>
                                    <div style={{ fontSize: fs.small, color: '#64748b', fontWeight: 600, marginBottom: 8 }}>
                                        {exp.company} | {exp.startDate} – {exp.current ? t.labels.present : exp.endDate}
                                    </div>
                                    <p style={{ fontSize: fs.body, lineHeight: 1.6, color: '#4b5563' }}>{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <section className="mb-8 resume-section">
                        <h3 style={{ fontFamily: headingFont, fontSize: fs.sectionHeading, color: '#0f172a', textTransform: 'uppercase', marginBottom: 16, fontWeight: 700 }}>{t.sections.education}</h3>
                        <div style={{ display: 'grid', gap: 16 }}>
                            {education.map((edu) => (
                                <div key={edu.id}>
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#0f172a' }}>{edu.degree}</h4>
                                    <div style={{ fontSize: fs.body, color: '#4b5563' }}>{edu.school}, {edu.city}</div>
                                    <div style={{ fontSize: fs.small, color: '#64748b' }}>{edu.startDate} – {edu.endDate || t.labels.present}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Certifications */}
                {certifications && certifications.length > 0 && (
                    <section className="mb-8 resume-section" data-paginate="section">
                        <h3 style={{ fontFamily: headingFont, fontSize: fs.sectionHeading, color: '#0f172a', textTransform: 'uppercase', marginBottom: 16, fontWeight: 700 }}>{t.sections.certifications}</h3>
                        <div style={{ display: 'grid', gap: 16 }}>
                            {certifications.map((cert) => (
                                <div key={cert.id} data-paginate="item">
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#0f172a' }}>{cert.name}</h4>
                                    <div style={{ fontSize: fs.body, color: accentColor, fontWeight: 500 }}>{cert.issuer}</div>
                                    <div style={{ fontSize: fs.small, color: '#64748b' }}>{cert.date}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Awards */}
                {awards && awards.length > 0 && (
                    <section className="mb-8 resume-section" data-paginate="section">
                        <h3 style={{ fontFamily: headingFont, fontSize: fs.sectionHeading, color: '#0f172a', textTransform: 'uppercase', marginBottom: 16, fontWeight: 700 }}>{t.sections.awards}</h3>
                        <div style={{ display: 'grid', gap: 16 }}>
                            {awards.map((award) => (
                                <div key={award.id} data-paginate="item">
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#0f172a' }}>{award.title}</h4>
                                    <div style={{ fontSize: fs.body, color: accentColor, fontWeight: 500 }}>{award.issuer}</div>
                                    <div style={{ fontSize: fs.small, color: '#64748b' }}>{award.date}</div>
                                    {award.description && (
                                        <p style={{ fontSize: fs.body, lineHeight: 1.6, color: '#4b5563', marginTop: 4 }}>{award.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Languages */}
                {languages && languages.length > 0 && (
                    <section className="mb-8 resume-section" data-paginate="section">
                        <h3 style={{ fontFamily: headingFont, fontSize: fs.sectionHeading, color: '#0f172a', textTransform: 'uppercase', marginBottom: 16, fontWeight: 700 }}>{t.sections.languages}</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                            {languages.map((lang) => (
                                <div key={lang.id} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: fs.body }}>
                                    <span style={{ fontWeight: 500, color: '#0f172a' }}>{lang.name}</span>
                                    <span style={{ fontSize: fs.small, color: accentColor, textTransform: 'capitalize' }}>({lang.proficiency})</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Interests / Hobbies */}
                {interests && interests.length > 0 && (
                    <section className="mb-8 resume-section" data-paginate="section">
                        <h3 style={{ fontFamily: headingFont, fontSize: fs.sectionHeading, color: '#0f172a', textTransform: 'uppercase', marginBottom: 16, fontWeight: 700 }}>{t.sections.interests}</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                            {interests.map((int) => (
                                <span key={int.id} style={{ fontSize: fs.body, color: '#475569', display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <span style={{ color: accentColor, fontSize: '10px' }}>●</span>
                                    {int.name}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* Social Links */}
                {(personalInfo.linkedin || personalInfo.twitter || personalInfo.github || personalInfo.dribbble || personalInfo.behance || personalInfo.instagram) && (
                    <section className="mb-8 resume-section" data-paginate="section">
                        <h3 style={{ fontFamily: headingFont, fontSize: fs.sectionHeading, color: '#0f172a', textTransform: 'uppercase', marginBottom: 16, fontWeight: 700 }}>{t.sections.socialLinks}</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: fs.body }}>
                            {personalInfo.linkedin && <div><span style={{ fontWeight: 600 }}>LinkedIn:</span> {personalInfo.linkedin}</div>}
                            {personalInfo.twitter && <div><span style={{ fontWeight: 600 }}>Twitter:</span> {personalInfo.twitter}</div>}
                            {personalInfo.github && <div><span style={{ fontWeight: 600 }}>GitHub:</span> {personalInfo.github}</div>}
                            {personalInfo.dribbble && <div><span style={{ fontWeight: 600 }}>Dribbble:</span> {personalInfo.dribbble}</div>}
                            {personalInfo.behance && <div><span style={{ fontWeight: 600 }}>Behance:</span> {personalInfo.behance}</div>}
                            {personalInfo.instagram && <div><span style={{ fontWeight: 600 }}>Instagram:</span> {personalInfo.instagram}</div>}
                        </div>
                    </section>
                )}

                {/* References */}
                {references && references.length > 0 && (
                    <section className="mb-8 resume-section" data-paginate="section">
                        <h3 style={{ fontFamily: headingFont, fontSize: fs.sectionHeading, color: '#0f172a', textTransform: 'uppercase', marginBottom: 16, fontWeight: 700 }}>{t.sections.references}</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {references.map((ref) => (
                                <div key={ref.id} data-paginate="item">
                                    <div style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#0f172a' }}>{ref.name}</div>
                                    <div style={{ fontSize: fs.body, color: '#64748b' }}>{ref.title}, {ref.company}</div>
                                    {ref.email && <div style={{ fontSize: fs.small, color: '#475569' }}>{ref.email}</div>}
                                    {ref.phone && <div style={{ fontSize: fs.small, color: '#475569' }}>{ref.phone}</div>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Personal Details */}
                {(personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber)) && (
                    <section className="mb-8 resume-section" data-paginate="section">
                        <h3 style={{ fontFamily: headingFont, fontSize: fs.sectionHeading, color: '#0f172a', textTransform: 'uppercase', marginBottom: 16, fontWeight: 700 }}>{t.sections.personalDetails}</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: fs.body }}>
                            {personalInfo.nationality && (
                                <div><span style={{ fontWeight: 600 }}>Nationality:</span> {personalInfo.nationality}</div>
                            )}
                            {personalInfo.idType && personalInfo.idNumber && (
                                <div>
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

                {/* Custom Field */}
                {personalInfo.customField && personalInfo.customFieldLabel && (
                    <section className="mb-8 resume-section" data-paginate="section">
                        <h3 style={{ fontFamily: headingFont, fontSize: fs.sectionHeading, color: '#0f172a', textTransform: 'uppercase', marginBottom: 16, fontWeight: 700 }}>{personalInfo.customFieldLabel}</h3>
                        <p style={{ fontSize: fs.body, lineHeight: 1.6, color: '#334155' }}>{personalInfo.customField}</p>
                    </section>
                )}

            </main>
        </div>
    );
}

// Helpers
function SidebarSectionHeader({ title, color, fs, headingFont }: { title: string, color: string, fs: ScaledFontSizes, headingFont: string }) {
    return (
        <h3
            style={{
                fontFamily: headingFont,
                fontSize: fs.sidebarHeading,
                fontWeight: 700,
                color: '#FFFFFF',
                textTransform: 'uppercase',
                marginBottom: 16,
                paddingBottom: 4,
                borderBottom: `2px solid ${color}`
            }}
        >
            {title}
        </h3>
    );
}

export default memo(SidebarDarkNavy);

// Meta
export const sidebarDarkNavyMeta: TemplateMeta = {
    id: 'sidebar-dark-navy',
    name: 'Dark Navy Sidebar',
    category: 'sidebar',
    thumbnail: '/templates/sidebar-dark-navy.jpg',
    description: 'Navy sidebar with blue accents and timeline',
};

'use client';

import { memo } from 'react';
import { Phone, Mail, MapPin, Globe } from 'lucide-react';
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
    const { personalInfo, experience, education, skills, languages, certifications, awards, interests, references, customFields, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Roboto Slab'); // Serif for headers as per spec hint
    const bodyFont = getFontFamily(fonts?.body || 'Open Sans');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes
    const fs = getScaledFontSizes(sizeConfig, scale);

    const sizeMult = parseInt(sizeConfig.base) / 14;
    const sp = (px: number) => Math.round(px * sizeMult);

    const t = useTemplateTranslations();

    // Colors
    const sidebarBg = '#1e293b'; // Slate 800
    const mainBg = '#FFFFFF';
    const sidebarText = '#e2e8f0'; // Slate 200
    const mainText = '#334155'; // Slate 700
    const accentColor = customThemeColor || theme?.primary || '#059669'; // Emerald 600 default

    // Dimensions
    const photoSize = scale < 1 ? 80 : sp(120);
    const sidebarWidth = '35%';

    // Icon helpers
    const iconSm = scale < 1 ? 8 : sp(14);

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
                    padding: scale < 1 ? '24px 16px' : `${sp(48)}px ${sp(32)}px`,
                    flexShrink: 0,
                    alignItems: 'center'
                }}
            >
                {/* Photo */}
                <div style={{ marginBottom: scale < 1 ? 24 : sp(32) }}>
                    {personalInfo.profileImage ? (
                        <img
                            src={personalInfo.profileImage}
                            alt={personalInfo.fullName}
                            style={{
                                width: photoSize,
                                height: photoSize,
                                borderRadius: '50%',
                                objectFit: 'cover',
                                border: `${sp(4)}px solid ${accentColor}`,
                            }}
                        />
                    ) : (
                        <div
                            style={{
                                width: photoSize,
                                height: photoSize,
                                borderRadius: '50%',
                                backgroundColor: '#0f172a',
                                border: `${sp(4)}px solid ${accentColor}`,
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
                <div style={{ width: '100%', marginBottom: sp(16) }}>
                    <SidebarSectionHeader title={t.sections.contact} color={accentColor} fs={fs} headingFont={headingFont} sp={sp} />
                    <div style={{ fontSize: fs.body, display: 'flex', flexDirection: 'column', gap: sp(10) }}>
                        {personalInfo.phone && <div data-paginate="item" style={{ display: 'flex', alignItems: 'center', gap: sp(10) }}><Phone size={iconSm} color={accentColor} /><span>{personalInfo.phone}</span></div>}
                        {personalInfo.email && <div data-paginate="item" style={{ display: 'flex', alignItems: 'center', gap: sp(10) }}><Mail size={iconSm} color={accentColor} /><span style={{ wordBreak: 'break-all' }}>{personalInfo.email}</span></div>}
                        {personalInfo.location && <div data-paginate="item" style={{ display: 'flex', alignItems: 'center', gap: sp(10) }}><MapPin size={iconSm} color={accentColor} /><span>{personalInfo.location}</span></div>}
                        {personalInfo.website && <div data-paginate="item" style={{ display: 'flex', alignItems: 'center', gap: sp(10) }}><Globe size={iconSm} color={accentColor} /><span style={{ wordBreak: 'break-all' }}>{personalInfo.website}</span></div>}


                    </div>
                </div>

                {/* Personal Details (Moved to Sidebar) */}
                {(personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber)) && (
                    <div style={{ width: '100%', marginBottom: sp(32) }}>
                        <SidebarSectionHeader title={t.sections.personalDetails} color={accentColor} fs={fs} headingFont={headingFont} sp={sp} />
                        <div style={{ fontSize: fs.body, display: 'flex', flexDirection: 'column', gap: sp(6), color: sidebarText }}>
                            {personalInfo.nationality && (
                                <div data-paginate="item"><span style={{ fontWeight: 500, color: accentColor }}>Nationality:</span> {personalInfo.nationality}</div>
                            )}
                            {personalInfo.idType && personalInfo.idNumber && (
                                <div data-paginate="item">
                                    <span style={{ fontWeight: 500, color: accentColor }}>
                                        {personalInfo.idType === 'id' ? 'ID' :
                                            personalInfo.idType === 'passport' ? 'Passport' :
                                                personalInfo.idType === 'driving_license' ? 'Driving License' : 'ID'}:
                                    </span> {personalInfo.idNumber}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Skills */}
                {skills.length > 0 && (
                    <div style={{ width: '100%', marginBottom: sp(32) }}>
                        <SidebarSectionHeader title={t.sections.skills} color={accentColor} fs={fs} headingFont={headingFont} sp={sp} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: sp(10) }}>
                            {skills.map((skill) => (
                                <div key={skill.id} data-paginate="item">
                                    <div style={{ marginBottom: sp(4), fontSize: fs.body, fontWeight: 500 }}>{skill.name}</div>
                                    <ProgressBar
                                        value={skill.level * 20}
                                        color={accentColor}
                                        trackColor="#334155"
                                        height={scale < 1 ? 4 : sp(6)}
                                        scale={1}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Strengths */}
                {data.strengths && data.strengths.length > 0 && (
                    <div style={{ width: '100%', marginTop: sp(16) }}>
                        <SidebarSectionHeader title={t.sections.strengths} color={accentColor} fs={fs} headingFont={headingFont} sp={sp} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: sp(10) }}>
                            {data.strengths.map((str) => (
                                <div key={str.id} data-paginate="item">
                                    <div style={{ marginBottom: sp(4), fontSize: fs.body, fontWeight: 500 }}>{str.name}</div>
                                    <ProgressBar
                                        value={str.level}
                                        color={accentColor}
                                        trackColor="#334155"
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
                    padding: scale < 1 ? '24px 24px' : `${sp(20)}px ${sp(48)}px`,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* Header */}
                <div style={{ marginBottom: scale < 1 ? 32 : sp(48), borderBottom: `${sp(2)}px solid ${accentColor}`, paddingBottom: sp(20) }}>
                    <h1
                        style={{
                            fontFamily: headingFont,
                            fontSize: fs.name,
                            fontWeight: 700,
                            color: '#0f172a',
                            textTransform: 'uppercase',
                            margin: 0,
                            marginBottom: sp(8),
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
                    <section className="resume-section" style={{ marginBottom: sp(20) }}>
                        <h3 style={{ fontFamily: headingFont, fontSize: fs.sectionHeading, color: '#0f172a', textTransform: 'uppercase', marginBottom: sp(16), fontWeight: 700, borderBottom: `${sp(2)}px solid ${accentColor}`, paddingBottom: sp(4) }}>{t.sections.profile}</h3>
                        <p style={{ lineHeight: 1.6, fontSize: fs.body, color: '#334155' }}>{personalInfo.summary}</p>
                    </section>
                )}

                {/* Experience with Timeline */}
                {experience.length > 0 && (
                    <section className="resume-section" style={{ marginBottom: sp(16) }}>
                        <h3 style={{ fontFamily: headingFont, fontSize: fs.sectionHeading, color: '#0f172a', textTransform: 'uppercase', marginBottom: sp(20), fontWeight: 700, borderBottom: `${sp(2)}px solid ${accentColor}`, paddingBottom: sp(4) }}>{t.sections.experience}</h3>
                        <div style={{
                            position: 'relative',
                            paddingLeft: sp(20),
                            borderLeft: `${sp(2)}px solid #e2e8f0`
                        }}>
                            {experience.map((exp) => (
                                <div key={exp.id} data-paginate="item" style={{ position: 'relative', marginBottom: sp(24) }}>
                                    {/* Timeline Dot */}
                                    <div style={{
                                        position: 'absolute',
                                        left: -sp(25),
                                        top: sp(4),
                                        width: sp(12),
                                        height: sp(12),
                                        borderRadius: '50%',
                                        backgroundColor: accentColor,
                                        border: `${sp(2)}px solid white`
                                    }}></div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: sp(4) }}>
                                        <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#0f172a', margin: 0, textTransform: 'uppercase' }}>
                                            {exp.title}
                                        </h4>
                                        <span style={{ fontSize: fs.small, color: accentColor, fontWeight: 600 }}>
                                            {exp.startDate} – {exp.current ? t.labels.present : exp.endDate}
                                        </span>
                                    </div>
                                    <div style={{ fontSize: fs.small, color: '#64748b', fontWeight: 600, marginBottom: sp(8) }}>
                                        {exp.company}{exp.city ? ` | ${exp.city}` : ''}
                                    </div>
                                    <div style={{ fontSize: fs.body, lineHeight: 1.6, color: '#4b5563' }}>
                                        {exp.description?.split('\n').map((line, i) => {
                                            const bulletMatch = line.match(/^([•\-·]\s*)(.*)/);
                                            if (bulletMatch) {
                                                return (
                                                    <div key={i} style={{ display: 'flex' }}>
                                                        <span style={{ flexShrink: 0 }}>{bulletMatch[1]}</span>
                                                        <span>{bulletMatch[2]}</span>
                                                    </div>
                                                );
                                            }
                                            return line ? <div key={i}>{line}</div> : <div key={i} style={{ height: '0.5em' }} />;
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <section className="resume-section" style={{ marginBottom: sp(20) }}>
                        <h3 style={{ fontFamily: headingFont, fontSize: fs.sectionHeading, color: '#0f172a', textTransform: 'uppercase', marginBottom: sp(16), fontWeight: 700, borderBottom: `${sp(2)}px solid ${accentColor}`, paddingBottom: sp(4) }}>{t.sections.education}</h3>
                        <div style={{ display: 'grid', gap: sp(16) }}>
                            {education.map((edu) => (
                                <div key={edu.id} data-paginate="item">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: sp(4) }}>
                                        <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#0f172a', margin: 0, textTransform: 'uppercase' }}>
                                            {edu.degree}
                                        </h4>
                                        <span style={{ fontSize: fs.small, color: accentColor, fontWeight: 600 }}>
                                            {edu.startDate} – {edu.endDate || t.labels.present}
                                        </span>
                                    </div>
                                    <div style={{ fontSize: fs.body, color: '#64748b', fontWeight: 600 }}>
                                        {edu.school}{edu.city ? `, ${edu.city}` : ''}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Certifications */}
                {certifications && certifications.length > 0 && (
                    <section className="resume-section" style={{ marginBottom: sp(20) }}>
                        <h3 style={{ fontFamily: headingFont, fontSize: fs.sectionHeading, color: '#0f172a', textTransform: 'uppercase', marginBottom: sp(16), fontWeight: 700, borderBottom: `${sp(2)}px solid ${accentColor}`, paddingBottom: sp(4) }}>{t.sections.certifications}</h3>
                        <div style={{ display: 'grid', gap: sp(16) }}>
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
                    <section className="resume-section" style={{ marginBottom: sp(20) }}>
                        <h3 style={{ fontFamily: headingFont, fontSize: fs.sectionHeading, color: '#0f172a', textTransform: 'uppercase', marginBottom: sp(16), fontWeight: 700, borderBottom: `${sp(2)}px solid ${accentColor}`, paddingBottom: sp(4) }}>{t.sections.awards}</h3>
                        <div style={{ display: 'grid', gap: sp(16) }}>
                            {awards.map((award) => (
                                <div key={award.id} data-paginate="item">
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#0f172a' }}>{award.title}</h4>
                                    <div style={{ fontSize: fs.body, color: accentColor, fontWeight: 500 }}>{award.issuer}</div>
                                    <div style={{ fontSize: fs.small, color: '#64748b' }}>{award.date}</div>
                                    {award.description && (
                                        <p style={{ fontSize: fs.body, lineHeight: 1.6, color: '#4b5563', marginTop: sp(4) }}>{award.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Languages */}
                {languages && languages.length > 0 && (
                    <section className="resume-section" style={{ marginBottom: sp(20) }}>
                        <h3 style={{ fontFamily: headingFont, fontSize: fs.sectionHeading, color: '#0f172a', textTransform: 'uppercase', marginBottom: sp(16), fontWeight: 700, borderBottom: `${sp(2)}px solid ${accentColor}`, paddingBottom: sp(4) }}>{t.sections.languages}</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: sp(12) }}>
                            {languages.map((lang) => (
                                <div key={lang.id} data-paginate="item" style={{ display: 'flex', alignItems: 'center', gap: sp(8), fontSize: fs.body }}>
                                    <span style={{ fontWeight: 500, color: '#0f172a' }}>{lang.name}</span>
                                    <span style={{ fontSize: fs.small, color: accentColor, textTransform: 'capitalize' }}>({lang.proficiency})</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Social Links (Moved to Main) */}
                {(personalInfo.github || personalInfo.x || personalInfo.linkedin || personalInfo.dribbble || personalInfo.behance || personalInfo.instagram) && (
                    <section className="resume-section" style={{ marginBottom: sp(20) }}>
                        <h3 style={{ fontFamily: headingFont, fontSize: fs.sectionHeading, color: '#0f172a', textTransform: 'uppercase', marginBottom: sp(16), fontWeight: 700, borderBottom: `${sp(2)}px solid ${accentColor}`, paddingBottom: sp(4) }}>{t.sections.socialLinks || 'Social Links'}</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: `${sp(12)}px ${sp(24)}px` }}>
                            {personalInfo.github && <div data-paginate="item"><SocialRow icon="github" value={personalInfo.github} color={accentColor} textColor={mainText} sp={sp} /></div>}
                            {personalInfo.x && <div data-paginate="item"><SocialRow icon="x" value={personalInfo.x} color={accentColor} textColor={mainText} sp={sp} /></div>}
                            {personalInfo.linkedin && <div data-paginate="item"><SocialRow icon="linkedin" value={personalInfo.linkedin} color={accentColor} textColor={mainText} sp={sp} /></div>}
                            {personalInfo.dribbble && <div data-paginate="item"><SocialRow icon="dribbble" value={personalInfo.dribbble} color={accentColor} textColor={mainText} sp={sp} /></div>}
                            {personalInfo.behance && <div data-paginate="item"><SocialRow icon="behance" value={personalInfo.behance} color={accentColor} textColor={mainText} sp={sp} /></div>}
                            {personalInfo.instagram && <div data-paginate="item"><SocialRow icon="instagram" value={personalInfo.instagram} color={accentColor} textColor={mainText} sp={sp} /></div>}
                        </div>
                    </section>
                )}

                {/* Interests / Hobbies */}
                {interests && interests.length > 0 && (
                    <section className="resume-section" style={{ marginBottom: sp(20) }}>
                        <h3 style={{ fontFamily: headingFont, fontSize: fs.sectionHeading, color: '#0f172a', textTransform: 'uppercase', marginBottom: sp(16), fontWeight: 700, borderBottom: `${sp(2)}px solid ${accentColor}`, paddingBottom: sp(4) }}>{t.sections.interests}</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: sp(12) }}>
                            {interests.map((int) => (
                                <span key={int.id} data-paginate="item" style={{ fontSize: fs.body, color: '#475569', display: 'flex', alignItems: 'center', gap: sp(6) }}>
                                    <span style={{ color: accentColor, fontSize: sp(10) + 'px' }}>●</span>
                                    {int.name}
                                </span>
                            ))}
                        </div>
                    </section>
                )}



                {/* References */}
                {references && references.length > 0 && (
                    <section className="resume-section" style={{ marginBottom: sp(20) }}>
                        <h3 style={{ fontFamily: headingFont, fontSize: fs.sectionHeading, color: '#0f172a', textTransform: 'uppercase', marginBottom: sp(16), fontWeight: 700, borderBottom: `${sp(2)}px solid ${accentColor}`, paddingBottom: sp(4) }}>{t.sections.references}</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: sp(16) }}>
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



                {/* Custom Fields */}
                {customFields?.map((field) => (
                    <section key={field.id} className="resume-section" style={{ marginBottom: sp(20) }}>
                        <h3 style={{ fontFamily: headingFont, fontSize: fs.sectionHeading, color: '#0f172a', textTransform: 'uppercase', marginBottom: sp(16), fontWeight: 700, borderBottom: `${sp(2)}px solid ${accentColor}`, paddingBottom: sp(4) }}>{field.label}</h3>
                        <p style={{ fontSize: fs.body, lineHeight: 1.6, color: '#334155' }}>{field.content}</p>
                    </section>
                ))}



            </main>
        </div>
    );
}

// Helpers
function SidebarSectionHeader({ title, color, fs, headingFont, sp }: { title: string, color: string, fs: ScaledFontSizes, headingFont: string, sp: (px: number) => number }) {
    return (
        <h3
            style={{
                fontFamily: headingFont,
                fontSize: fs.sidebarHeading,
                fontWeight: 700,
                color: '#FFFFFF',
                textTransform: 'uppercase',
                marginBottom: sp(16),
                paddingBottom: sp(4),
                borderBottom: `${sp(2)}px solid ${color}`
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

// Helper for Social Icons matched to Backend logic
function SocialRow({ icon, value, color, textColor, sp }: { icon: string, value: string, color: string, textColor: string, sp: (px: number) => number }) {
    if (!value) return null;
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: sp(10) }}>
            <div style={{
                width: sp(24),
                height: sp(24),
                borderRadius: '50%',
                backgroundColor: color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
            }}>
                <span style={{ color: '#FFFFFF', display: 'flex' }}>{getSocialIcon(icon, sp(14))}</span>
            </div>
            <span style={{ wordBreak: 'break-all', color: textColor }}>{value}</span>
        </div>
    );
}

function getSocialIcon(name: string, size: number = 14) {
    const props = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

    switch (name) {
        case 'github': return (
            <svg {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
        );
        case 'linkedin': return (
            <svg {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
        );
        case 'instagram': return (
            <svg {...props}><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
        );
        case 'x': return (
            <svg {...props}><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
        );
        case 'dribbble': return (
            <svg {...props}><circle cx="12" cy="12" r="10" /><path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" /><path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" /><path d="M8.56 2.75c4.37 6 6 9.42 8 13.25" /></svg>
        );
        case 'behance': return (
            <svg {...props}><path d="M5 17V7h4a2 2 0 0 1 0 4H7v1h2a2 2 0 0 1 0 4H5" /><path d="M15 13h5a2.5 2.5 0 1 0-5 0v.5" /><path d="M16 9h4" /></svg>
        );
        default: return <Globe {...props} />;
    }
}

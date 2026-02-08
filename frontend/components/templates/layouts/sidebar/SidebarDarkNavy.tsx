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

    const t = useTemplateTranslations();

    // Colors
    const sidebarBg = '#1e293b'; // Slate 800
    const mainBg = '#FFFFFF';
    const sidebarText = '#e2e8f0'; // Slate 200
    const mainText = '#334155'; // Slate 700
    const accentColor = customThemeColor || theme?.primary || '#059669'; // Emerald 600 default

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
                    padding: scale < 1 ? '24px 16px' : '48px 32px', // Reduced padding
                    flexShrink: 0,
                    alignItems: 'center'
                }}
            >
                {/* Photo */}
                <div style={{ marginBottom: scale < 1 ? 24 : 32 }}> {/* Reduced margin */}
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
                <div style={{ width: '100%', marginBottom: 16 }}> {/* Reduced margin */}
                    <SidebarSectionHeader title={t.sections.contact} color={accentColor} fs={fs} headingFont={headingFont} />
                    <div style={{ fontSize: fs.body, display: 'flex', flexDirection: 'column', gap: 10 }}> {/* Reduced gap */}
                        {personalInfo.phone && <div data-paginate="item" style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Phone size={14} color={accentColor} /><span>{personalInfo.phone}</span></div>}
                        {personalInfo.email && <div data-paginate="item" style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Mail size={14} color={accentColor} /><span style={{ wordBreak: 'break-all' }}>{personalInfo.email}</span></div>}
                        {personalInfo.location && <div data-paginate="item" style={{ display: 'flex', alignItems: 'center', gap: 10 }}><MapPin size={14} color={accentColor} /><span>{personalInfo.location}</span></div>}
                        {personalInfo.website && <div data-paginate="item" style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Globe size={14} color={accentColor} /><span style={{ wordBreak: 'break-all' }}>{personalInfo.website}</span></div>}


                    </div>
                </div>

                {/* Personal Details (Moved to Sidebar) */}
                {(personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber)) && (
                    <div style={{ width: '100%', marginBottom: 32 }}> {/* Reduced margin */}
                        <SidebarSectionHeader title={t.sections.personalDetails} color={accentColor} fs={fs} headingFont={headingFont} />
                        <div style={{ fontSize: fs.body, display: 'flex', flexDirection: 'column', gap: 6, color: sidebarText }}> {/* Reduced gap */}
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
                    <div style={{ width: '100%', marginBottom: 32 }}> {/* Reduced margin */}
                        <SidebarSectionHeader title={t.sections.skills} color={accentColor} fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}> {/* Reduced gap */}
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
                    <div style={{ width: '100%', marginTop: 16 }}> {/* Reduced margin */}
                        <SidebarSectionHeader title={t.sections.strengths} color={accentColor} fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}> {/* Reduced gap */}
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
                    padding: scale < 1 ? '24px 24px' : '20px 48px', // Reduced padding to match backend (was 48px 40px)
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* Header */}
                <div style={{ marginBottom: scale < 1 ? 32 : 48, borderBottom: `2px solid ${accentColor}`, paddingBottom: 20 }}> {/* Reduced margin/padding */}
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
                    <section className="mb-5 resume-section">
                        <h3 style={{ fontFamily: headingFont, fontSize: fs.sectionHeading, color: '#0f172a', textTransform: 'uppercase', marginBottom: 16, fontWeight: 700, borderBottom: `2px solid ${accentColor}`, paddingBottom: 4 }}>{t.sections.profile}</h3>
                        <p style={{ lineHeight: 1.6, fontSize: fs.body, color: '#334155' }}>{personalInfo.summary}</p>
                    </section>
                )}

                {/* Experience with Timeline */}
                {experience.length > 0 && (
                    <section className="mb-4 resume-section"> {/* Reduced section margin */}
                        <h3 style={{ fontFamily: headingFont, fontSize: fs.sectionHeading, color: '#0f172a', textTransform: 'uppercase', marginBottom: 20, fontWeight: 700, borderBottom: `2px solid ${accentColor}`, paddingBottom: 4 }}>{t.sections.experience}</h3> {/* Reduced header margin */}
                        <div style={{
                            position: 'relative',
                            paddingLeft: 20,
                            borderLeft: '2px solid #e2e8f0'
                        }}>
                            {experience.map((exp) => (
                                <div key={exp.id} data-paginate="item" style={{ position: 'relative', marginBottom: 24 }}> {/* Reduced item margin from 32 to 24 */}
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

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                                        <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#0f172a', margin: 0, textTransform: 'uppercase' }}>
                                            {exp.title}
                                        </h4>
                                        <span style={{ fontSize: fs.small, color: accentColor, fontWeight: 600 }}>
                                            {exp.startDate} – {exp.current ? t.labels.present : exp.endDate}
                                        </span>
                                    </div>
                                    <div style={{ fontSize: fs.small, color: '#64748b', fontWeight: 600, marginBottom: 8 }}>
                                        {exp.company}{exp.city ? ` | ${exp.city}` : ''}
                                    </div>
                                    <p style={{ fontSize: fs.body, lineHeight: 1.6, color: '#4b5563' }}>{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <section className="mb-5 resume-section">
                        <h3 style={{ fontFamily: headingFont, fontSize: fs.sectionHeading, color: '#0f172a', textTransform: 'uppercase', marginBottom: 16, fontWeight: 700, borderBottom: `2px solid ${accentColor}`, paddingBottom: 4 }}>{t.sections.education}</h3>
                        <div style={{ display: 'grid', gap: 16 }}>
                            {education.map((edu) => (
                                <div key={edu.id} data-paginate="item">
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
                    <section className="mb-5 resume-section">
                        <h3 style={{ fontFamily: headingFont, fontSize: fs.sectionHeading, color: '#0f172a', textTransform: 'uppercase', marginBottom: 16, fontWeight: 700, borderBottom: `2px solid ${accentColor}`, paddingBottom: 4 }}>{t.sections.certifications}</h3>
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
                    <section className="mb-5 resume-section">
                        <h3 style={{ fontFamily: headingFont, fontSize: fs.sectionHeading, color: '#0f172a', textTransform: 'uppercase', marginBottom: 16, fontWeight: 700, borderBottom: `2px solid ${accentColor}`, paddingBottom: 4 }}>{t.sections.awards}</h3>
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
                    <section className="mb-5 resume-section">
                        <h3 style={{ fontFamily: headingFont, fontSize: fs.sectionHeading, color: '#0f172a', textTransform: 'uppercase', marginBottom: 16, fontWeight: 700, borderBottom: `2px solid ${accentColor}`, paddingBottom: 4 }}>{t.sections.languages}</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                            {languages.map((lang) => (
                                <div key={lang.id} data-paginate="item" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: fs.body }}>
                                    <span style={{ fontWeight: 500, color: '#0f172a' }}>{lang.name}</span>
                                    <span style={{ fontSize: fs.small, color: accentColor, textTransform: 'capitalize' }}>({lang.proficiency})</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Social Links (Moved to Main) */}
                {(personalInfo.github || personalInfo.x || personalInfo.linkedin || personalInfo.dribbble || personalInfo.behance || personalInfo.instagram) && (
                    <section className="mb-5 resume-section">
                        <h3 style={{ fontFamily: headingFont, fontSize: fs.sectionHeading, color: '#0f172a', textTransform: 'uppercase', marginBottom: 16, fontWeight: 700, borderBottom: `2px solid ${accentColor}`, paddingBottom: 4 }}>{t.sections.socialLinks || 'Social Links'}</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 24px' }}>
                            {personalInfo.github && <div data-paginate="item"><SocialRow icon="github" value={personalInfo.github} color={accentColor} textColor={mainText} /></div>}
                            {personalInfo.x && <div data-paginate="item"><SocialRow icon="x" value={personalInfo.x} color={accentColor} textColor={mainText} /></div>}
                            {personalInfo.linkedin && <div data-paginate="item"><SocialRow icon="linkedin" value={personalInfo.linkedin} color={accentColor} textColor={mainText} /></div>}
                            {personalInfo.dribbble && <div data-paginate="item"><SocialRow icon="dribbble" value={personalInfo.dribbble} color={accentColor} textColor={mainText} /></div>}
                            {personalInfo.behance && <div data-paginate="item"><SocialRow icon="behance" value={personalInfo.behance} color={accentColor} textColor={mainText} /></div>}
                            {personalInfo.instagram && <div data-paginate="item"><SocialRow icon="instagram" value={personalInfo.instagram} color={accentColor} textColor={mainText} /></div>}
                        </div>
                    </section>
                )}

                {/* Interests / Hobbies */}
                {interests && interests.length > 0 && (
                    <section className="mb-5 resume-section">
                        <h3 style={{ fontFamily: headingFont, fontSize: fs.sectionHeading, color: '#0f172a', textTransform: 'uppercase', marginBottom: 16, fontWeight: 700, borderBottom: `2px solid ${accentColor}`, paddingBottom: 4 }}>{t.sections.interests}</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                            {interests.map((int) => (
                                <span key={int.id} data-paginate="item" style={{ fontSize: fs.body, color: '#475569', display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <span style={{ color: accentColor, fontSize: '10px' }}>●</span>
                                    {int.name}
                                </span>
                            ))}
                        </div>
                    </section>
                )}



                {/* References */}
                {references && references.length > 0 && (
                    <section className="mb-5 resume-section">
                        <h3 style={{ fontFamily: headingFont, fontSize: fs.sectionHeading, color: '#0f172a', textTransform: 'uppercase', marginBottom: 16, fontWeight: 700, borderBottom: `2px solid ${accentColor}`, paddingBottom: 4 }}>{t.sections.references}</h3>
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



                {/* Custom Fields */}
                {customFields?.map((field) => (
                    <section key={field.id} className="mb-5 resume-section">
                        <h3 style={{ fontFamily: headingFont, fontSize: fs.sectionHeading, color: '#0f172a', textTransform: 'uppercase', marginBottom: 16, fontWeight: 700, borderBottom: `2px solid ${accentColor}`, paddingBottom: 4 }}>{field.label}</h3>
                        <p style={{ fontSize: fs.body, lineHeight: 1.6, color: '#334155' }}>{field.content}</p>
                    </section>
                ))}



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

// Helper for Social Icons matched to Backend logic
function SocialRow({ icon, value, color, textColor }: { icon: string, value: string, color: string, textColor: string }) {
    if (!value) return null;
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                backgroundColor: color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
            }}>
                <span style={{ color: '#FFFFFF', display: 'flex' }}>{getSocialIcon(icon)}</span>
            </div>
            <span style={{ wordBreak: 'break-all', color: textColor }}>{value}</span>
        </div>
    );
}

function getSocialIcon(name: string) {
    const size = 14;
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

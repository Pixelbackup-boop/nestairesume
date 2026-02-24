'use client';

import { memo } from 'react';
import { Sparkles } from 'lucide-react';
import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';
import ProgressBar from '../../shared/ProgressBar';
import { parseDualColor, getContrastText, hexToRgba } from '@/lib/templates/builder/colorUtils';
import { useTemplateTranslations } from '@/lib/templates/TranslationContext';

// SVG Icon component for consistent rendering with backend PDF
const SvgIcon = ({ name, color = '#ffffff', size = 14 }: { name: string; color?: string; size?: number }) => {
    const paths: Record<string, string> = {
        phone: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z',
        email: 'M2 4h20v16H2zM22 7l-10 7L2 7',
        location: 'M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0ZM12 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
        website: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20',
        linkedin: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4z',
    };
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d={paths[name] || paths.website} />
        </svg>
    );
};

/**
 * Header Dark Template
 * Full-height Dark Sidebar layout.
 * Photo, Contact, Skills in dark sidebar. Name, Profile, Experience in white main content.
 *
 * Layout:
 * - Left Sidebar (~33%): Dark Slate 900 (#0f172a) background. White text.
 * - Main Content (~67%): White background. Dark text.
 * - Photo: Top of sidebar, circular.
 * - Name: Top of main content, Bold Uppercase.
 * - Accent: Gold/Yellow (#facc15) for highlights.
 *
 * Matches reference: frontend/Resume-template/organized/02-header/header-dark.jpg
 * (Note: The file name says "header-dark" but the spec describes a dark sidebar layout similar to the image analysis).
 */
function HeaderDark({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, certifications, awards, customFields, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Montserrat'); // defaults to Montserrat/Inter
    const bodyFont = getFontFamily(fonts?.body || 'Open Sans');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];
    const t = useTemplateTranslations();

    // Get scaled font sizes
    const fs = getScaledFontSizes(sizeConfig, scale);

    // Spacing multiplier based on font size
    const sizeMult = parseInt(sizeConfig.base) / 14;
    const sp = (px: number) => Math.round(px * sizeMult);

    // Icon size helpers
    const iconSm = scale < 1 ? 8 : sp(10);
    const iconMd = scale < 1 ? 10 : sp(12);

    // Parse dual color: primary = sidebar bg, secondary = accent
    const { primary: sidebarBg, secondary: accentColor } = parseDualColor(
        customThemeColor,
        { primary: '#0f172a', secondary: '#facc15' } // Slate 900 + Yellow 400 defaults
    );

    // Auto-calculate text colors based on backgrounds
    const sidebarText = getContrastText(sidebarBg);
    const accentText = getContrastText(accentColor);
    const mainBg = '#ffffff';
    const textDark = '#334155'; // Slate 700

    // Dimensions
    const photoSize = scale < 1 ? 80 : sp(140);

    return (
        <div
            className="w-full h-full"
            style={{
                fontFamily: bodyFont,
                fontSize: sizeConfig.base,
                backgroundColor: mainBg,
                color: textDark,
                display: 'flex',
                boxSizing: 'border-box'
            }}
        >
            {/* Left Sidebar - Dark */}
            <aside
                style={{
                    width: '33%',
                    backgroundColor: sidebarBg,
                    color: sidebarText,
                    padding: scale < 1 ? '24px 16px' : `${sp(48)}px ${sp(32)}px`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flexShrink: 0,
                    minHeight: '100%'
                }}
            >
                {/* Photo */}
                <div style={{ marginBottom: scale < 1 ? 32 : sp(50) }}>
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
                                backgroundColor: hexToRgba(sidebarText, 0.1),
                                border: `${sp(4)}px solid ${accentColor}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: fs.name,
                                color: sidebarText,
                            }}
                        >
                            {personalInfo.fullName?.charAt(0) || '?'}
                        </div>
                    )}
                </div>

                {/* Contact Info (Dark Sidebar) */}
                <div style={{ width: '100%', marginBottom: sp(20) }}>
                    <SidebarSectionHeader title={t.sections.contact} accentColor={accentColor} textColor={sidebarText} fs={fs} headingFont={headingFont} sp={sp} />
                    <div style={{ fontSize: fs.body, display: 'flex', flexDirection: 'column', gap: sp(12) }}>
                        {personalInfo.phone && <ContactItemSvg icon="phone" text={personalInfo.phone} color={sidebarText} sp={sp} />}
                        {personalInfo.email && <ContactItemSvg icon="email" text={personalInfo.email} color={sidebarText} sp={sp} />}
                        {personalInfo.location && <ContactItemSvg icon="location" text={personalInfo.location} color={sidebarText} sp={sp} />}
                        {personalInfo.website && <ContactItemSvg icon="website" text={personalInfo.website} color={sidebarText} sp={sp} />}
                        {personalInfo.linkedin && <ContactItemSvg icon="linkedin" text={personalInfo.linkedin} color={sidebarText} sp={sp} />}
                    </div>
                </div>

                {/* Personal Details (Dark Sidebar) */}
                {(personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber)) && (
                    <div style={{ width: '100%', marginBottom: sp(20) }}>
                        <SidebarSectionHeader title={t.sections.personalDetails} accentColor={accentColor} textColor={sidebarText} fs={fs} headingFont={headingFont} sp={sp} />
                        <div style={{ fontSize: fs.body, display: 'flex', flexDirection: 'column', gap: sp(8), color: sidebarText }}>
                            {personalInfo.nationality && (
                                <div><span style={{ fontWeight: 600, color: accentColor }}>Nationality:</span> {personalInfo.nationality}</div>
                            )}
                            {personalInfo.idType && personalInfo.idNumber && (
                                <div>
                                    <span style={{ fontWeight: 600, color: accentColor }}>
                                        {personalInfo.idType === 'id' ? 'ID' :
                                            personalInfo.idType === 'passport' ? 'Passport' :
                                                personalInfo.idType === 'driving_license' ? 'Driving License' : 'ID'}:
                                    </span> {personalInfo.idNumber}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Skills (Dark Sidebar) */}
                {skills.length > 0 && (
                    <div style={{ width: '100%', marginBottom: sp(20) }}>
                        <SidebarSectionHeader title={t.sections.skills} accentColor={accentColor} textColor={sidebarText} fs={fs} headingFont={headingFont} sp={sp} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: sp(10) }}>
                            {skills.map((skill) => (
                                <div key={skill.id} data-paginate="item" className="resume-entry">
                                    <div style={{ marginBottom: sp(4), fontSize: fs.body, fontWeight: 500 }}>{skill.name}</div>
                                    <ProgressBar
                                        value={(skill.level || 3) * 20}
                                        color={accentColor}
                                        trackColor={hexToRgba(sidebarText, 0.15)}
                                        height={scale < 1 ? 4 : sp(6)}
                                        scale={1}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Strengths (Dark Sidebar) */}
                {data.strengths && data.strengths.length > 0 && (
                    <div style={{ width: '100%', marginBottom: sp(40) }}>
                        <SidebarSectionHeader title={t.sections.strengths} accentColor={accentColor} textColor={sidebarText} fs={fs} headingFont={headingFont} sp={sp} />
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: sp(8) }}>
                            {data.strengths.map((str) => (
                                <span key={str.id} data-paginate="item" className="resume-entry" style={{
                                    backgroundColor: hexToRgba(sidebarText, 0.08),
                                    color: accentColor,
                                    padding: `${sp(4)}px ${sp(12)}px`,
                                    borderRadius: sp(4),
                                    fontSize: fs.small,
                                    fontWeight: 500,
                                    border: `1px solid ${hexToRgba(accentColor, 0.25)}`
                                }}>
                                    {str.name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Interests (Dark Sidebar) */}
                {data.interests && data.interests.length > 0 && (
                    <div style={{ width: '100%', marginBottom: sp(40) }}>
                        <SidebarSectionHeader title={t.sections.interests} accentColor={accentColor} textColor={sidebarText} fs={fs} headingFont={headingFont} sp={sp} />
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: sp(12) }}>
                            {data.interests.map((int) => (
                                <span key={int.id} data-paginate="item" style={{ fontSize: fs.body, display: 'flex', alignItems: 'center', gap: sp(6), color: sidebarText }}>
                                    <Sparkles size={iconSm} color={accentColor} /> {int.name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

            </aside>

            {/* Main Content - White */}
            <main
                style={{
                    flex: 1,
                    padding: scale < 1 ? '20px 24px 30px 24px' : `${sp(40)}px ${sp(48)}px ${sp(60)}px ${sp(48)}px`,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* Name Header */}
                <div style={{ marginBottom: scale < 1 ? 16 : sp(24) }}>
                    <h1
                        style={{
                            fontFamily: headingFont,
                            fontSize: fs.name,
                            fontWeight: 800, // Bold
                            color: '#0f172a',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            margin: 0,
                            lineHeight: 1
                        }}
                    >
                        {personalInfo.fullName || 'Your Name'}
                    </h1>
                    <p
                        style={{
                            fontSize: fs.jobTitle,
                            color: '#64748b',
                            textTransform: 'uppercase',
                            fontWeight: 600,
                            marginTop: sp(10),
                            letterSpacing: '0.05em'
                        }}
                    >
                        {personalInfo.jobTitle || 'Job Title'}
                    </p>
                </div>

                {/* Profile */}
                {personalInfo.summary && (
                    <section className="resume-section" style={{ marginBottom: sp(20) }}>
                        <SectionHeaderMain title={t.sections.profile} color={'#0f172a'} accent={accentColor} fs={fs} headingFont={headingFont} sp={sp} />
                        <p style={{ lineHeight: 1.6, fontSize: fs.body, color: '#334155' }}>
                            {personalInfo.summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <section className="resume-section" style={{ marginBottom: sp(20) }}>
                        <SectionHeaderMain title={t.sections.experience} color={'#0f172a'} accent={accentColor} fs={fs} headingFont={headingFont} sp={sp} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: `${sp(32)}px` }}>
                            {experience.map((exp) => (
                                <div key={exp.id} data-paginate="item" className="resume-entry">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: sp(2), alignItems: 'baseline' }}>
                                        <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, textTransform: 'uppercase', color: '#0f172a' }}>
                                            {exp.title}
                                        </h4>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: sp(6), fontSize: fs.small, color: '#64748b', fontWeight: 600 }}>
                                        <span>{exp.company}{(exp.city || exp.country) && `, ${[exp.city, exp.country].filter(Boolean).join(', ')}`}</span>
                                        <span>{exp.startDate} – {exp.current ? t.labels.present : exp.endDate}</span>
                                    </div>

                                    <div style={{ fontSize: fs.body, lineHeight: 1.6, color: '#334155' }}>
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
                        <SectionHeaderMain title={t.sections.education} color={'#0f172a'} accent={accentColor} fs={fs} headingFont={headingFont} sp={sp} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: `${sp(24)}px` }}>
                            {education.map((edu) => (
                                <div key={edu.id} data-paginate="item" className="resume-entry">
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#0f172a' }}>
                                        {edu.degree}
                                        {edu.gpa && <span style={{ marginLeft: 8, opacity: 0.8, fontWeight: 500, fontSize: fs.body }}>GPA: {edu.gpa}</span>}
                                    </h4>
                                    <p style={{ fontSize: fs.body, color: '#475569', fontWeight: 500 }}>
                                        {edu.school}{(edu.city || edu.country) && `, ${[edu.city, edu.country].filter(Boolean).join(', ')}`}
                                    </p>
                                    <p style={{ fontSize: fs.small, color: '#64748b' }}>
                                        {edu.startDate} – {edu.endDate || t.labels.present}
                                    </p>
                                    {edu.honors && (
                                        <p style={{ fontSize: fs.small, color: '#475569', opacity: 0.8 }}>{edu.honors}</p>
                                    )}
                                    {edu.clubs && (
                                        <p style={{ fontSize: fs.small, color: '#64748b', opacity: 0.7 }}>Activities: {edu.clubs}</p>
                                    )}
                                    {edu.description && (
                                        <p style={{ fontSize: fs.small || fs.body, lineHeight: 1.5, color: '#4b5563', marginTop: '4px' }}>{edu.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Languages */}
                {languages && languages.length > 0 && (
                    <section className="resume-section" style={{ marginBottom: sp(20) }}>
                        <SectionHeaderMain title={t.sections.languages} color={'#0f172a'} accent={accentColor} fs={fs} headingFont={headingFont} sp={sp} />
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: `${sp(12)}px ${sp(24)}px` }}>
                            {languages.map((lang) => (
                                <div key={lang.id} style={{ fontSize: fs.body }} data-paginate="item" className="resume-entry">
                                    <span style={{ fontWeight: 600, color: '#0f172a' }}>{lang.name}</span>
                                    <span style={{ color: '#64748b', marginLeft: sp(6), textTransform: 'capitalize' }}>({lang.proficiency})</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Social Links */}
                {(personalInfo.x || personalInfo.github || personalInfo.dribbble || personalInfo.behance || personalInfo.instagram) && (
                    <section className="resume-section" style={{ marginBottom: sp(20) }}>
                        <SectionHeaderMain title={t.sections.socialLinks} color={'#0f172a'} accent={accentColor} fs={fs} headingFont={headingFont} sp={sp} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: sp(8), fontSize: fs.body }}>
                            {personalInfo.x && <div data-paginate="item" className="resume-entry"><span style={{ fontWeight: 600, color: '#0f172a' }}>X:</span> <span style={{ color: '#334155' }}>{personalInfo.x}</span></div>}
                            {personalInfo.github && <div data-paginate="item" className="resume-entry"><span style={{ fontWeight: 600, color: '#0f172a' }}>GitHub:</span> <span style={{ color: '#334155' }}>{personalInfo.github}</span></div>}
                            {personalInfo.dribbble && <div data-paginate="item" className="resume-entry"><span style={{ fontWeight: 600, color: '#0f172a' }}>Dribbble:</span> <span style={{ color: '#334155' }}>{personalInfo.dribbble}</span></div>}
                            {personalInfo.behance && <div data-paginate="item" className="resume-entry"><span style={{ fontWeight: 600, color: '#0f172a' }}>Behance:</span> <span style={{ color: '#334155' }}>{personalInfo.behance}</span></div>}
                            {personalInfo.instagram && <div data-paginate="item" className="resume-entry"><span style={{ fontWeight: 600, color: '#0f172a' }}>Instagram:</span> <span style={{ color: '#334155' }}>{personalInfo.instagram}</span></div>}
                        </div>
                    </section>
                )}

                {/* Credentials (Certifications & Awards) */}
                {((certifications && certifications.length > 0) || (awards && awards.length > 0)) && (
                    <section className="resume-section" style={{ marginBottom: sp(20) }}>
                        <SectionHeaderMain title={t.sections.credentials} color={'#0f172a'} accent={accentColor} fs={fs} headingFont={headingFont} sp={sp} />

                        {certifications && certifications.length > 0 && (
                            <div style={{ marginBottom: awards && awards.length > 0 ? sp(24) : 0 }}>
                                <h4 style={{ fontSize: fs.entryTitle, fontWeight: 600, color: '#475569', marginBottom: sp(12) }}>
                                    {t.sections.certifications}
                                </h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: `${sp(12)}px` }}>
                                    {certifications.map((cert) => (
                                        <div key={cert.id} data-paginate="item" className="resume-entry">
                                            <div style={{ fontWeight: 600, fontSize: fs.body, color: '#0f172a' }}>{cert.name}</div>
                                            <div style={{ fontSize: fs.small, color: '#64748b' }}>{cert.issuer} • {cert.date}</div>
                                            {cert.url && <div style={{ fontSize: fs.small, color: '#64748b', opacity: 0.7 }}>{cert.url}</div>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {awards && awards.length > 0 && (
                            <div>
                                <h4 style={{ fontSize: fs.entryTitle, fontWeight: 600, color: '#475569', marginBottom: sp(12) }}>
                                    {t.sections.awards}
                                </h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: `${sp(12)}px` }}>
                                    {awards.map((award) => (
                                        <div key={award.id} data-paginate="item" className="resume-entry">
                                            <div style={{ fontWeight: 600, fontSize: fs.body, color: '#0f172a' }}>{award.title}</div>
                                            <div style={{ fontSize: fs.small, color: '#64748b' }}>{award.issuer} • {award.date}</div>
                                            {award.description && (
                                                <p style={{ fontSize: fs.small, color: '#334155', marginTop: sp(4), lineHeight: 1.5 }}>
                                                    {award.description}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>
                )}


                {/* Custom Fields */}
                {customFields?.map((field) => (
                    <section key={field.id} className="resume-section" style={{ marginBottom: sp(20) }}>
                        <SectionHeaderMain title={field.label} color={'#0f172a'} accent={accentColor} fs={fs} headingFont={headingFont} sp={sp} />
                        <p style={{ fontSize: fs.body, lineHeight: 1.6, color: '#334155' }}>{field.content}</p>
                    </section>
                ))}

            </main>
        </div>
    );
}

// Helpers
function SidebarSectionHeader({ title, accentColor, textColor, fs, headingFont, sp }: { title: string, accentColor: string, textColor: string, fs: ScaledFontSizes, headingFont: string, sp: (px: number) => number }) {
    return (
        <h3
            style={{
                fontFamily: headingFont,
                fontSize: fs.sectionHeading,
                fontWeight: 700,
                color: textColor,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: sp(20),
                paddingBottom: sp(8),
                borderBottom: `${sp(2)}px solid ${accentColor}`
            }}
        >
            {title}
        </h3>
    );
}

function SectionHeaderMain({ title, color, accent, fs, headingFont, sp }: { title: string, color: string, accent: string, fs: ScaledFontSizes, headingFont: string, sp: (px: number) => number }) {
    return (
        <h3
            style={{
                fontFamily: headingFont,
                fontSize: fs.sectionHeading,
                fontWeight: 800,
                color: color,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                marginBottom: sp(24),
                display: 'flex',
                alignItems: 'center',
                gap: sp(16)
            }}
        >
            <span style={{ width: sp(40), height: sp(4), backgroundColor: accent }}></span>
            {title}
        </h3>
    );
}

function ContactItemSvg({ icon, text, color, sp }: { icon: string, text: string, color: string, sp: (px: number) => number }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: sp(12) }}>
            <span style={{ opacity: 0.9 }}><SvgIcon name={icon} color={color} size={sp(14)} /></span>
            <span style={{ wordBreak: 'break-all', opacity: 0.9 }}>{text}</span>
        </div>
    );
}

// Wrap with memo to prevent unnecessary re-renders
export default memo(HeaderDark);

// Template metadata
export const headerDarkMeta: TemplateMeta = {
    id: 'header-dark',
    name: 'Dark Header',
    category: 'header',
    thumbnail: '/templates/header-dark.png',
    description: 'Modern slate dark header with gold accents',
};

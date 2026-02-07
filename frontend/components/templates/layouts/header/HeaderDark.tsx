'use client';

import { memo } from 'react';
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
    const { personalInfo, experience, education, skills, languages, references, certifications, awards, customFields, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Montserrat'); // defaults to Montserrat/Inter
    const bodyFont = getFontFamily(fonts?.body || 'Open Sans');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];
    const t = useTemplateTranslations();

    // Get scaled font sizes
    const fs = getScaledFontSizes(sizeConfig, scale);

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
    const photoSize = scale < 1 ? 80 : 140;

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
                    padding: scale < 1 ? '24px 16px' : '48px 32px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flexShrink: 0,
                    minHeight: '100%'
                }}
            >
                {/* Photo */}
                <div style={{ marginBottom: scale < 1 ? 32 : 50 }}>
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
                                backgroundColor: hexToRgba(sidebarText, 0.1),
                                border: `4px solid ${accentColor}`,
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
                <div style={{ width: '100%', marginBottom: 40 }}>
                    <SidebarSectionHeader title={t.sections.contact} accentColor={accentColor} textColor={sidebarText} fs={fs} headingFont={headingFont} />
                    <div style={{ fontSize: fs.body, display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {personalInfo.phone && <ContactItemSvg icon="phone" text={personalInfo.phone} color={sidebarText} />}
                        {personalInfo.email && <ContactItemSvg icon="email" text={personalInfo.email} color={sidebarText} />}
                        {personalInfo.location && <ContactItemSvg icon="location" text={personalInfo.location} color={sidebarText} />}
                        {personalInfo.website && <ContactItemSvg icon="website" text={personalInfo.website} color={sidebarText} />}
                        {personalInfo.linkedin && <ContactItemSvg icon="linkedin" text={personalInfo.linkedin} color={sidebarText} />}
                    </div>
                </div>

                {/* Skills (Dark Sidebar) */}
                {skills.length > 0 && (
                    <div style={{ width: '100%', marginBottom: 40 }}>
                        <SidebarSectionHeader title={t.sections.skills} accentColor={accentColor} textColor={sidebarText} fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {skills.map((skill) => (
                                <div key={skill.id} data-paginate="item">
                                    <div style={{ marginBottom: 4, fontSize: fs.body, fontWeight: 500 }}>{skill.name}</div>
                                    <ProgressBar
                                        value={(skill.level || 3) * 20}
                                        color={accentColor}
                                        trackColor={hexToRgba(sidebarText, 0.15)}
                                        height={6}
                                        scale={1}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Strengths (Dark Sidebar) */}
                {data.strengths && data.strengths.length > 0 && (
                    <div style={{ width: '100%', marginBottom: 40 }}>
                        <SidebarSectionHeader title={t.sections.strengths} accentColor={accentColor} textColor={sidebarText} fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                            {data.strengths.map((str) => (
                                <span key={str.id} data-paginate="item" style={{
                                    backgroundColor: hexToRgba(sidebarText, 0.08),
                                    color: accentColor,
                                    padding: '4px 12px',
                                    borderRadius: 4,
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
                    <div style={{ width: '100%', marginBottom: 40 }}>
                        <SidebarSectionHeader title={t.sections.interests} accentColor={accentColor} textColor={sidebarText} fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                            {data.interests.map((int) => (
                                <span key={int.id} style={{ fontSize: fs.body, display: 'flex', alignItems: 'center', gap: 6, color: sidebarText }}>
                                    <span style={{ color: accentColor }}>✦</span> {int.name}
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
                    padding: scale < 1 ? '32px 24px' : '64px 48px',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* Name Header */}
                <div style={{ marginBottom: scale < 1 ? 32 : 50 }}>
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
                            marginTop: 10,
                            letterSpacing: '0.05em'
                        }}
                    >
                        {personalInfo.jobTitle || 'Job Title'}
                    </p>
                </div>

                {/* Profile */}
                {personalInfo.summary && (
                    <section className="mb-10 resume-section" data-paginate>
                        <SectionHeaderMain title={t.sections.profile} color={'#0f172a'} accent={accentColor} fs={fs} headingFont={headingFont} />
                        <p style={{ lineHeight: 1.6, fontSize: fs.body, color: '#334155' }}>
                            {personalInfo.summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <section className="mb-10 resume-section" data-paginate>
                        <SectionHeaderMain title={t.sections.experience} color={'#0f172a'} accent={accentColor} fs={fs} headingFont={headingFont} />
                        <div className="space-y-8">
                            {experience.map((exp) => (
                                <div key={exp.id} data-paginate="item">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2, alignItems: 'baseline' }}>
                                        <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, textTransform: 'uppercase', color: '#0f172a' }}>
                                            {exp.title}
                                        </h4>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: fs.small, color: '#64748b', fontWeight: 600 }}>
                                        <span>{exp.company}, {exp.city}</span>
                                        <span>{exp.startDate} – {exp.current ? t.labels.present : exp.endDate}</span>
                                    </div>

                                    <p style={{ fontSize: fs.body, lineHeight: 1.6, color: '#334155' }}>
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <section className="mb-10 resume-section" data-paginate>
                        <SectionHeaderMain title={t.sections.education} color={'#0f172a'} accent={accentColor} fs={fs} headingFont={headingFont} />
                        <div className="space-y-6">
                            {education.map((edu) => (
                                <div key={edu.id} data-paginate="item">
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#0f172a' }}>
                                        {edu.degree}
                                    </h4>
                                    <p style={{ fontSize: fs.body, color: '#475569', fontWeight: 500 }}>
                                        {edu.school}, {edu.city}
                                    </p>
                                    <p style={{ fontSize: fs.small, color: '#64748b' }}>
                                        {edu.startDate} – {edu.endDate || t.labels.present}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Languages */}
                {languages && languages.length > 0 && (
                    <section className="mb-10 resume-section" data-paginate>
                        <SectionHeaderMain title={t.sections.languages} color={'#0f172a'} accent={accentColor} fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 24px' }}>
                            {languages.map((lang) => (
                                <div key={lang.id} style={{ fontSize: fs.body }} data-paginate="item">
                                    <span style={{ fontWeight: 600, color: '#0f172a' }}>{lang.name}</span>
                                    <span style={{ color: '#64748b', marginLeft: 6 }}>({lang.proficiency})</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Credentials (Certifications & Awards) */}
                {((certifications && certifications.length > 0) || (awards && awards.length > 0)) && (
                    <section className="mb-10 resume-section" data-paginate>
                        <SectionHeaderMain title={t.sections.credentials} color={'#0f172a'} accent={accentColor} fs={fs} headingFont={headingFont} />

                        {certifications && certifications.length > 0 && (
                            <div style={{ marginBottom: awards && awards.length > 0 ? 24 : 0 }}>
                                <h4 style={{ fontSize: fs.entryTitle, fontWeight: 600, color: '#475569', marginBottom: 12 }}>
                                    {t.sections.certifications}
                                </h4>
                                <div className="space-y-3">
                                    {certifications.map((cert) => (
                                        <div key={cert.id} data-paginate="item">
                                            <div style={{ fontWeight: 600, fontSize: fs.body, color: '#0f172a' }}>{cert.name}</div>
                                            <div style={{ fontSize: fs.small, color: '#64748b' }}>{cert.issuer} • {cert.date}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {awards && awards.length > 0 && (
                            <div>
                                <h4 style={{ fontSize: fs.entryTitle, fontWeight: 600, color: '#475569', marginBottom: 12 }}>
                                    {t.sections.awards}
                                </h4>
                                <div className="space-y-3">
                                    {awards.map((award) => (
                                        <div key={award.id} data-paginate="item">
                                            <div style={{ fontWeight: 600, fontSize: fs.body, color: '#0f172a' }}>{award.title}</div>
                                            <div style={{ fontSize: fs.small, color: '#64748b' }}>{award.issuer} • {award.date}</div>
                                            {award.description && (
                                                <p style={{ fontSize: fs.small, color: '#334155', marginTop: 4, lineHeight: 1.5 }}>
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

                {/* References */}
                {references && references.length > 0 && (
                    <section className="mb-10 resume-section" data-paginate>
                        <SectionHeaderMain title={t.sections.references} color={'#0f172a'} accent={accentColor} fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                            {references.map((ref) => (
                                <div key={ref.id}>
                                    <div style={{ fontWeight: 700, fontSize: fs.body, color: '#0f172a' }}>{ref.name}</div>
                                    <div style={{ fontSize: fs.small, color: '#64748b' }}>{ref.title}, {ref.company}</div>
                                    {ref.email && <div style={{ fontSize: fs.small, color: '#64748b' }}>{ref.email}</div>}
                                    {ref.phone && <div style={{ fontSize: fs.small, color: '#64748b' }}>{ref.phone}</div>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Social Links */}
                {(personalInfo.x || personalInfo.github || personalInfo.dribbble || personalInfo.behance || personalInfo.instagram) && (
                    <section className="mb-10 resume-section" data-paginate>
                        <SectionHeaderMain title={t.sections.socialLinks} color={'#0f172a'} accent={accentColor} fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: fs.body }}>
                            {personalInfo.x && <div><span style={{ fontWeight: 600, color: '#0f172a' }}>X:</span> <span style={{ color: '#334155' }}>{personalInfo.x}</span></div>}
                            {personalInfo.github && <div><span style={{ fontWeight: 600, color: '#0f172a' }}>GitHub:</span> <span style={{ color: '#334155' }}>{personalInfo.github}</span></div>}
                            {personalInfo.dribbble && <div><span style={{ fontWeight: 600, color: '#0f172a' }}>Dribbble:</span> <span style={{ color: '#334155' }}>{personalInfo.dribbble}</span></div>}
                            {personalInfo.behance && <div><span style={{ fontWeight: 600, color: '#0f172a' }}>Behance:</span> <span style={{ color: '#334155' }}>{personalInfo.behance}</span></div>}
                            {personalInfo.instagram && <div><span style={{ fontWeight: 600, color: '#0f172a' }}>Instagram:</span> <span style={{ color: '#334155' }}>{personalInfo.instagram}</span></div>}
                        </div>
                    </section>
                )}

                {/* Personal Details */}
                {(personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber)) && (
                    <section className="mb-10 resume-section" data-paginate>
                        <SectionHeaderMain title={t.sections.personalDetails} color={'#0f172a'} accent={accentColor} fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: fs.body }}>
                            {personalInfo.nationality && (
                                <div><span style={{ fontWeight: 600, color: '#0f172a' }}>Nationality:</span> <span style={{ color: '#334155' }}>{personalInfo.nationality}</span></div>
                            )}
                            {personalInfo.idType && personalInfo.idNumber && (
                                <div>
                                    <span style={{ fontWeight: 600, color: '#0f172a' }}>
                                        {personalInfo.idType === 'id' ? 'ID' :
                                         personalInfo.idType === 'passport' ? 'Passport' :
                                         personalInfo.idType === 'driving_license' ? 'Driving License' : 'ID'}:
                                    </span> <span style={{ color: '#334155' }}>{personalInfo.idNumber}</span>
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {/* Custom Fields */}
                {customFields?.map((field) => (
                    <section key={field.id} className="resume-section" data-paginate>
                        <SectionHeaderMain title={field.label} color={'#0f172a'} accent={accentColor} fs={fs} headingFont={headingFont} />
                        <p style={{ fontSize: fs.body, lineHeight: 1.6, color: '#334155' }}>{field.content}</p>
                    </section>
                ))}

            </main>
        </div>
    );
}

// Helpers
function SidebarSectionHeader({ title, accentColor, textColor, fs, headingFont }: { title: string, accentColor: string, textColor: string, fs: ScaledFontSizes, headingFont: string }) {
    return (
        <h3
            style={{
                fontFamily: headingFont,
                fontSize: fs.sectionHeading,
                fontWeight: 700,
                color: textColor,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: 20,
                paddingBottom: 8,
                borderBottom: `2px solid ${accentColor}`
            }}
        >
            {title}
        </h3>
    );
}

function SectionHeaderMain({ title, color, accent, fs, headingFont }: { title: string, color: string, accent: string, fs: ScaledFontSizes, headingFont: string }) {
    return (
        <h3
            data-paginate
            style={{
                fontFamily: headingFont,
                fontSize: fs.sectionHeading,
                fontWeight: 800,
                color: color,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                marginBottom: 24,
                display: 'flex',
                alignItems: 'center',
                gap: 16
            }}
        >
            <span style={{ width: 40, height: 4, backgroundColor: accent }}></span>
            {title}
        </h3>
    );
}

function ContactItemSvg({ icon, text, color }: { icon: string, text: string, color: string }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ opacity: 0.9 }}><SvgIcon name={icon} color={color} size={14} /></span>
            <span style={{ wordBreak: 'break-all', opacity: 0.9 }}>{text}</span>
        </div>
    );
}

// Wrap with memo to prevent unnecessary re-renders
export default memo(HeaderDark);

// Template metadata
export const headerDarkMeta: TemplateMeta = {
    id: 'header-dark',
    name: 'Dark Sidebar',
    category: 'header',
    thumbnail: '/templates/header-dark.png',
    description: 'Modern slate dark sidebar with gold accents',
};

'use client';

import { memo } from 'react';
import { Phone, Mail, MapPin, Globe, Linkedin } from 'lucide-react';
import { TemplateProps, TemplateMeta } from '../../shared/types';
import { ScaledFontSizes, translateProficiency } from '../../shared/styleHelpers';
import ProgressBar from '../../shared/ProgressBar';
import { useTemplateSetup } from '@/hooks';

/**
 * Sidebar Monogram Template
 * Reference: sidebar-monogram.webp
 *
 * Layout:
 * - Sidebar: 30% width, Left. Gray 700 (#374151).
 * - Main: 70% width. White.
 * - Header: Large Monogram (Initials) instead of photo.
 * - Accent: Gold (#facc15).
 */
function SidebarMonogram({ data, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, customThemeColor, fonts, certifications, awards, customFields } = data;

    const { headingFont, bodyFont, sizeConfig, fs, t, colors } = useTemplateSetup({
        customThemeColor,
        fonts,
        scale,
        defaultSecondary: '#facc15',  // Yellow 400 accent
        defaultHeadingFont: 'Playfair Display',
        defaultBodyFont: 'Lato',
    });

    const sizeMult = parseInt(sizeConfig.base) / 14;
    const sp = (px: number) => Math.round(px * sizeMult);

    // Colors
    const sidebarBg = '#374151'; // Gray 700
    const mainBg = '#FFFFFF';
    const sidebarText = '#f9fafb';
    const mainText = '#1f2937';
    const accentColor = colors.secondary;

    // Dimensions
    const monogramSize = scale < 1 ? 80 : sp(120);
    const sidebarWidth = '30%';

    // Icons
    const iconSm = scale < 1 ? 8 : sp(14);

    // Initials
    const initials = personalInfo.fullName
        ? personalInfo.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
        : 'YN';

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
                    padding: scale < 1 ? '32px 16px' : `${sp(48)}px ${sp(24)}px`,
                    flexShrink: 0,
                    alignItems: 'center',
                }}
            >
                {/* Profile Image or Monogram */}
                {personalInfo.profileImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={personalInfo.profileImage}
                        alt={personalInfo.fullName || 'Profile'}
                        style={{
                            marginBottom: scale < 1 ? 32 : sp(32),
                            width: monogramSize,
                            height: monogramSize,
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: `${sp(4)}px solid ${accentColor}`
                        }}
                    />
                ) : (
                    <div
                        style={{
                            marginBottom: scale < 1 ? 32 : sp(32),
                            width: monogramSize,
                            height: monogramSize,
                            borderRadius: '50%',
                            backgroundColor: mainBg,
                            color: sidebarBg,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: fs.name,
                            fontFamily: headingFont,
                            fontWeight: 900,
                            border: `${sp(4)}px solid ${accentColor}`
                        }}
                    >
                        {initials}
                    </div>
                )}

                {/* Contact */}
                <div style={{ width: '100%', marginBottom: sp(16) }}>
                    <SidebarHeader title={t.sections.contact} color={accentColor} fs={fs} headingFont={headingFont} sp={sp} />
                    <div style={{ fontSize: fs.body, display: 'flex', flexDirection: 'column', gap: sp(10) }}>
                        {personalInfo.phone && <div style={{ display: 'flex', alignItems: 'flex-start', gap: sp(8) }}><Phone size={iconSm} color={sidebarText} style={{ marginTop: sp(3), flexShrink: 0 }} /><span>{personalInfo.phone}</span></div>}
                        {personalInfo.email && <div style={{ display: 'flex', alignItems: 'flex-start', gap: sp(8) }}><Mail size={iconSm} color={sidebarText} style={{ marginTop: sp(3), flexShrink: 0 }} /><span style={{ wordBreak: 'break-all' }}>{personalInfo.email}</span></div>}
                        {personalInfo.location && <div style={{ display: 'flex', alignItems: 'flex-start', gap: sp(8) }}><MapPin size={iconSm} color={sidebarText} style={{ marginTop: sp(3), flexShrink: 0 }} /><span>{personalInfo.location}</span></div>}
                        {personalInfo.website && <div style={{ display: 'flex', alignItems: 'flex-start', gap: sp(8) }}><Globe size={iconSm} color={sidebarText} style={{ marginTop: sp(3), flexShrink: 0 }} /><span style={{ wordBreak: 'break-all' }}>{personalInfo.website}</span></div>}
                        {personalInfo.linkedin && <div style={{ display: 'flex', alignItems: 'flex-start', gap: sp(8) }}><Linkedin size={iconSm} color={sidebarText} style={{ marginTop: sp(3), flexShrink: 0 }} /><span style={{ wordBreak: 'break-all' }}>{personalInfo.linkedin}</span></div>}
                    </div>
                </div>

                {/* Personal Details */}
                {(personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber)) && (
                    <div style={{ width: '100%', marginBottom: sp(16) }}>
                        <SidebarHeader title={t.sections.personalDetails} color={accentColor} fs={fs} headingFont={headingFont} sp={sp} />
                        <div style={{ fontSize: fs.body, display: 'flex', flexDirection: 'column', gap: sp(6) }}>
                            {personalInfo.nationality && (
                                <div><span style={{ color: accentColor, fontWeight: 500 }}>{t.labels.nationality || 'Nationality'}:</span> {personalInfo.nationality}</div>
                            )}
                            {personalInfo.idType && personalInfo.idNumber && (
                                <div>
                                    <span style={{ color: accentColor, fontWeight: 500 }}>
                                        {personalInfo.idType === 'id' ? (t.labels.id || 'ID') :
                                            personalInfo.idType === 'passport' ? (t.labels.passport || 'Passport') :
                                                personalInfo.idType === 'driving_license' ? (t.labels.drivingLicense || 'Driving License') : (t.labels.id || 'ID')}:
                                    </span> {personalInfo.idNumber}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Languages */}
                {languages && languages.length > 0 && (
                    <div style={{ width: '100%', marginBottom: sp(16) }}>
                        <SidebarHeader title={t.sections.languages} color={accentColor} fs={fs} headingFont={headingFont} sp={sp} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: sp(6) }}>
                            {languages.map((lang) => (
                                <div key={lang.id} style={{ fontSize: fs.body, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} data-paginate="item">
                                    <span>{lang.name}</span>
                                    {lang.proficiency && (
                                        <span style={{ fontSize: fs.small, color: accentColor, fontWeight: 500, textTransform: 'capitalize' }}>
                                            {translateProficiency(lang.proficiency, t.labels)}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Strengths */}
                {data.strengths && data.strengths.length > 0 && (
                    <div style={{ width: '100%', marginBottom: sp(16) }}>
                        <SidebarHeader title={t.sections.strengths} color={accentColor} fs={fs} headingFont={headingFont} sp={sp} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: sp(6) }}>
                            {data.strengths.map((str) => (
                                <div key={str.id} data-paginate="item">
                                    <div style={{ fontSize: fs.small, marginBottom: sp(4), color: sidebarText }}>
                                        {str.name}
                                    </div>
                                    <ProgressBar value={str.level ?? 80} color={accentColor} height={scale < 1 ? 4 : sp(5)} />
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
                    padding: scale < 1 ? '24px 24px 32px 24px' : `${sp(20)}px ${sp(40)}px ${sp(60)}px ${sp(40)}px`,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* Header */}
                <div style={{ marginBottom: sp(12), borderBottom: `${sp(1)}px solid ${accentColor}`, paddingBottom: sp(16) }}>
                    <h1
                        style={{
                            fontFamily: headingFont,
                            fontSize: fs.name,
                            fontWeight: 700,
                            color: '#111827',
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
                            color: '#4b5563',
                            textTransform: 'uppercase',
                            fontWeight: 500,
                            letterSpacing: '0.2em',
                            margin: 0
                        }}
                    >
                        {personalInfo.jobTitle}
                    </p>
                </div>

                {/* Profile */}
                {personalInfo.summary && (
                    <section className="resume-section" style={{ marginBottom: sp(16) }}>
                        <MainHeader title={t.sections.profile} color={'#374151'} fs={fs} headingFont={headingFont} sp={sp} />
                        <p style={{ lineHeight: 1.6, fontSize: fs.body, color: '#374151' }}>
                            {personalInfo.summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <section className="resume-section" style={{ marginBottom: sp(16) }}>
                        <MainHeader title={t.sections.experience} color={'#374151'} fs={fs} headingFont={headingFont} sp={sp} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: sp(32) + 'px' }}>
                            {experience.map((exp) => (
                                <div key={exp.id} data-paginate="item">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: sp(2) }}>
                                        <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#111827' }}>
                                            {exp.title}
                                        </h4>
                                        <span style={{ fontSize: fs.small, color: '#374151', fontWeight: 600 }}>{exp.startDate} – {exp.current ? t.labels.present : exp.endDate}</span>
                                    </div>
                                    <div style={{ fontSize: fs.small, color: '#6b7280', marginBottom: sp(6) }}>
                                        {exp.company}{(exp.city || exp.country) && `, ${[exp.city, exp.country].filter(Boolean).join(', ')}`}
                                    </div>
                                    <div style={{ fontSize: fs.body, lineHeight: 1.6, color: '#374151' }}>
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
                    <section className="resume-section" style={{ marginBottom: sp(16) }}>
                        <MainHeader title={t.sections.education} color={'#374151'} fs={fs} headingFont={headingFont} sp={sp} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: sp(16) + 'px' }}>
                            {education.map((edu) => (
                                <div key={edu.id} data-paginate="item">
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#111827' }}>
                                        {edu.degree}
                                        {edu.gpa && <span style={{ marginLeft: 8, opacity: 0.8, fontWeight: 500, fontSize: fs.body }}>{ t.labels.gpa || 'GPA' }: {edu.gpa}</span>}
                                    </h4>
                                    <div style={{ fontSize: fs.body, color: '#4b5563' }}>
                                        {edu.school}{(edu.city || edu.country) && `, ${[edu.city, edu.country].filter(Boolean).join(', ')}`}
                                    </div>
                                    <div style={{ fontSize: fs.small, color: '#6b7280' }}>
                                        {edu.startDate} – {edu.endDate || t.labels.present}
                                    </div>
                                    {edu.honors && (
                                        <p style={{ fontSize: fs.small, color: '#4b5563', opacity: 0.8 }}>{edu.honors}</p>
                                    )}
                                    {edu.clubs && (
                                        <p style={{ fontSize: fs.small, color: '#6b7280', opacity: 0.7 }}>{ t.labels.activities || 'Activities' }: {edu.clubs}</p>
                                    )}
                                    {edu.description && (
                                        <p style={{ fontSize: fs.small || fs.body, lineHeight: 1.5, color: '#4b5563', marginTop: '4px' }}>{edu.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {skills.length > 0 && (
                    <section className="resume-section" style={{ marginBottom: sp(16) }}>
                        <MainHeader title={t.sections.skills} color={'#374151'} fs={fs} headingFont={headingFont} sp={sp} />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: sp(12) }}>
                            {skills.map((skill) => (
                                <div key={skill.id} data-paginate="item">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: fs.small, marginBottom: sp(4) }}>
                                        <span style={{ fontWeight: 500, color: '#374151' }}>{skill.name}</span>
                                    </div>
                                    <ProgressBar value={(skill.level || 3) * 20} color={accentColor} height={scale < 1 ? 4 : sp(6)} />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Interests */}
                {data.interests && data.interests.length > 0 && (
                    <section className="resume-section" style={{ marginBottom: sp(16) }}>
                        <MainHeader title={t.sections.interests} color={'#374151'} fs={fs} headingFont={headingFont} sp={sp} />
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

                {/* Social Links */}
                {(personalInfo.x || personalInfo.github || personalInfo.dribbble || personalInfo.behance || personalInfo.instagram) && (
                    <section className="resume-section" style={{ marginBottom: sp(16) }}>
                        <MainHeader title={t.sections.socialLinks} color={'#374151'} fs={fs} headingFont={headingFont} sp={sp} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: sp(8), fontSize: fs.body }}>
                            {personalInfo.x && <div data-paginate="item"><span style={{ fontWeight: 600 }}>X:</span> {personalInfo.x}</div>}
                            {personalInfo.github && <div data-paginate="item"><span style={{ fontWeight: 600 }}>GitHub:</span> {personalInfo.github}</div>}
                            {personalInfo.dribbble && <div data-paginate="item"><span style={{ fontWeight: 600 }}>Dribbble:</span> {personalInfo.dribbble}</div>}
                            {personalInfo.behance && <div data-paginate="item"><span style={{ fontWeight: 600 }}>Behance:</span> {personalInfo.behance}</div>}
                            {personalInfo.instagram && <div data-paginate="item"><span style={{ fontWeight: 600 }}>Instagram:</span> {personalInfo.instagram}</div>}
                        </div>
                    </section>
                )}

                {/* Credentials (Certifications & Awards) */}
                {((certifications && certifications.length > 0) || (awards && awards.length > 0)) && (
                    <section className="resume-section" style={{ marginBottom: sp(16) }}>
                        <MainHeader title={t.sections.credentials} color={'#374151'} fs={fs} headingFont={headingFont} sp={sp} />

                        {/* Certifications */}
                        {certifications && certifications.length > 0 && (
                            <div style={{ marginBottom: awards && awards.length > 0 ? sp(24) : 0 }}>
                                <h4 style={{
                                    fontSize: fs.entryTitle,
                                    fontWeight: 600,
                                    color: '#4b5563',
                                    marginBottom: sp(12)
                                }}>
                                    {t.sections.certifications}
                                </h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: sp(12) + 'px' }}>
                                    {certifications.map((cert) => (
                                        <div key={cert.id} data-paginate="item">
                                            <div style={{ fontWeight: 600, fontSize: fs.body, color: '#111827' }}>
                                                {cert.name}
                                            </div>
                                            <div style={{ fontSize: fs.small, color: '#6b7280' }}>
                                                {cert.issuer} • {cert.date}
                                            </div>
                                            {cert.url && <div style={{ fontSize: fs.small, color: '#6b7280', opacity: 0.7 }}>{cert.url}</div>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Awards & Achievements */}
                        {awards && awards.length > 0 && (
                            <div>
                                <h4 style={{
                                    fontSize: fs.entryTitle,
                                    fontWeight: 600,
                                    color: '#4b5563',
                                    marginBottom: sp(12)
                                }}>
                                    {t.sections.awards}
                                </h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: sp(12) + 'px' }}>
                                    {awards.map((award) => (
                                        <div key={award.id} data-paginate="item">
                                            <div style={{ fontWeight: 600, fontSize: fs.body, color: '#111827' }}>
                                                {award.title}
                                            </div>
                                            <div style={{ fontSize: fs.small, color: '#6b7280' }}>
                                                {award.issuer} • {award.date}
                                            </div>
                                            {award.description && (
                                                <p style={{ fontSize: fs.small, color: '#374151', marginTop: sp(4), lineHeight: 1.5 }}>
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
                    <section key={field.id} className="resume-section" style={{ marginBottom: sp(16) }}>
                        <MainHeader title={field.label} color={'#374151'} fs={fs} headingFont={headingFont} sp={sp} />
                        <p style={{ fontSize: fs.body, lineHeight: 1.6, color: '#374151' }}>{field.content}</p>
                    </section>
                ))}
            </main>
        </div>
    );
}

// Helpers
function SidebarHeader({ title, color, fs, headingFont, sp }: { title: string, color: string, fs: ScaledFontSizes, headingFont: string, sp: (px: number) => number }) {
    return (
        <h3
            style={{
                fontFamily: headingFont,
                fontSize: fs.sidebarHeading,
                fontWeight: 700,
                color: color,
                textTransform: 'uppercase',
                marginBottom: sp(16),
                letterSpacing: '0.1em'
            }}
        >
            {title}
        </h3>
    );
}

function MainHeader({ title, color, fs, headingFont, sp }: { title: string, color: string, fs: ScaledFontSizes, headingFont: string, sp: (px: number) => number }) {
    return (
        <h3
            style={{
                fontFamily: headingFont,
                fontSize: fs.sectionHeading,
                fontWeight: 700,
                color: color,
                textTransform: 'uppercase',
                marginBottom: sp(16),
                borderBottom: `${sp(2)}px solid ${color}`,
                display: 'inline-block',
                paddingBottom: sp(4)
            }}
        >
            {title}
        </h3>
    );
}

export default memo(SidebarMonogram);

// Meta
export const sidebarMonogramMeta: TemplateMeta = {
    id: 'sidebar-monogram',
    name: 'Teal Monogram',
    category: 'sidebar',
    thumbnail: '/templates/sidebar-monogram.webp',
    description: 'Elegant layout using initials monogram instead of photo',
};

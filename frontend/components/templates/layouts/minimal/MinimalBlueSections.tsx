'use client';

import { memo } from 'react';
import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes, translateProficiency } from '../../shared/styleHelpers';
import ProgressBar from '../../shared/ProgressBar';
import ResumeEntry from '../../shared/ResumeEntry';
import { useTemplateTranslations } from '@/lib/templates/TranslationContext';

/**
 * Minimal Blue Sections Template
 * Reference: minimal-blue-sections.jpg
 *
 * Layout:
 * - Single Column Main Body.
 * - Header: Name left, Blue background strip for section headers?
 *   Actually per name "Blue Sections", likely sections have blue headers or backgrounds.
 *   Specs say: "Section headers have blue background strip".
 * - Typography: Clean Sans.
 */
function MinimalBlueSections({ data, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, strengths, certifications, awards, customFields, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Roboto');
    const bodyFont = getFontFamily(fonts?.body || 'Open Sans');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes
    const fs = getScaledFontSizes(sizeConfig, scale);
    const sizeMult = parseInt(sizeConfig.base) / 14;
    const sp = (px: number) => Math.round(px * sizeMult);
    const t = useTemplateTranslations();

    // Colors
    const mainText = '#1f2937';
    const accentColor = customThemeColor || '#3b82f6'; // Blue 500


    return (
        <div
            className="w-full h-full"
            style={{
                fontFamily: bodyFont,
                fontSize: sizeConfig.base,
                backgroundColor: '#FFFFFF',
                color: mainText,
                padding: scale < 1 ? '32px' : sp(56)+'px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Header */}
            <header style={{ marginBottom: sp(32), borderBottom: `${sp(2)}px solid ${accentColor}`, paddingBottom: sp(24) }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <h1
                            style={{
                                fontFamily: headingFont,
                                fontSize: fs.name,
                                fontWeight: 700,
                                color: '#000',
                                textTransform: 'uppercase',
                                margin: 0,
                                marginBottom: sp(4),
                            }}
                        >
                            {personalInfo.fullName}
                        </h1>
                        <p
                            style={{
                                fontSize: fs.jobTitle,
                                color: accentColor,
                                fontWeight: 600,
                                margin: 0
                            }}
                        >
                            {personalInfo.jobTitle}
                        </p>
                    </div>
                    {/* Contact - Compact Right */}
                    <div style={{
                        fontSize: fs.small,
                        textAlign: 'right',
                        color: '#4b5563',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: sp(2)
                    }}>
                        {personalInfo.email && <span>{personalInfo.email}</span>}
                        {personalInfo.phone && <span>{personalInfo.phone}</span>}
                        {personalInfo.location && <span>{personalInfo.location}</span>}
                        {personalInfo.website && <span>{personalInfo.website}</span>}
                        {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
                    </div>
                </div>
            </header>

            {/* Profile */}
            {personalInfo.summary && (
                <section className="resume-section" style={{ marginBottom: sp(20) }}>
                    <SectionHeader title={t.sections.profile} bg={accentColor} fs={fs} headingFont={headingFont} sp={sp} />
                    <p style={{ lineHeight: 1.6, fontSize: fs.body, color: '#374151', paddingLeft: sp(8) }}>
                        {personalInfo.summary}
                    </p>
                </section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <section className="resume-section" style={{ marginBottom: sp(20) }}>
                    <SectionHeader title={t.sections.experience} bg={accentColor} fs={fs} headingFont={headingFont} sp={sp} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: scale < 1 ? 20 : sp(32), paddingLeft: sp(8) }}>
                        {experience.map((exp) => (
                            <ResumeEntry key={exp.id}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: sp(2) }}>
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#000' }}>{exp.title}</h4>
                                    <span style={{ fontSize: fs.small, color: '#4b5563' }}>{exp.startDate} – {exp.current ? t.labels.present : exp.endDate}</span>
                                </div>
                                <div style={{ fontSize: fs.small, color: accentColor, fontWeight: 600, marginBottom: sp(4) }}>
                                    {exp.company}{(exp.city || exp.country) && `, ${[exp.city, exp.country].filter(Boolean).join(', ')}`}
                                </div>
                                <p style={{ fontSize: fs.body, lineHeight: 1.6, color: '#374151' }}>
                                    {exp.description}
                                </p>
                            </ResumeEntry>
                        ))}
                    </div>
                </section>
            )}

            {/* Two Column for Ed/Skills */}
            <section className="resume-section" style={{ marginBottom: sp(20) }}>
            <div style={{ display: 'flex', gap: sp(32) }}>
                {education.length > 0 && (
                    <div style={{ flex: 1 }}>
                        <SectionHeader title={t.sections.education} bg={accentColor} fs={fs} headingFont={headingFont} sp={sp} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: sp(16), paddingLeft: sp(8) }}>
                            {education.map((edu) => (
                                <ResumeEntry key={edu.id}>
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#000' }}>
                                        {edu.degree}
                                        {edu.gpa && <span style={{ marginLeft: 8, opacity: 0.8, fontWeight: 500, fontSize: fs.body }}>{ t.labels.gpa || 'GPA' }: {edu.gpa}</span>}
                                    </h4>
                                    <div style={{ fontSize: fs.body, color: '#4b5563' }}>{edu.school}{(edu.city || edu.country) && `, ${[edu.city, edu.country].filter(Boolean).join(', ')}`}</div>
                                    <div style={{ fontSize: fs.small, color: '#6b7280' }}>{edu.startDate} – {edu.endDate || t.labels.present}</div>
                                    {edu.honors && (
                                        <p style={{ fontSize: fs.small, color: '#4b5563', opacity: 0.8 }}>{edu.honors}</p>
                                    )}
                                    {edu.clubs && (
                                        <p style={{ fontSize: fs.small, color: '#6b7280', opacity: 0.7 }}>{ t.labels.activities || 'Activities' }: {edu.clubs}</p>
                                    )}
                                    {edu.description && (
                                        <p style={{ fontSize: fs.small || fs.body, lineHeight: 1.5, color: '#4b5563', marginTop: '4px' }}>{edu.description}</p>
                                    )}
                                </ResumeEntry>
                            ))}
                        </div>
                    </div>
                )}

                {skills.length > 0 && (
                    <div style={{ flex: 1 }}>
                        <SectionHeader title={t.sections.skills} bg={accentColor} fs={fs} headingFont={headingFont} sp={sp} />
                        <div style={{ paddingLeft: sp(8), display: 'flex', flexDirection: 'column', gap: sp(8)+'px' }}>
                            {skills.map((skill) => (
                                <div key={skill.id} data-paginate="item">
                                    <ProgressBar
                                        label={skill.name}
                                        value={(skill.level || 3) * 20}
                                        color={accentColor}
                                        height={scale < 1 ? 4 : sp(6)}
                                        scale={1}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            </section>

            {/* Languages and Strengths Row */}
            {((languages && languages.length > 0) || (strengths && strengths.length > 0)) && (
                <section className="resume-section" style={{ marginBottom: sp(20) }}>
                <div style={{ display: 'flex', gap: sp(32) }}>
                    {languages && languages.length > 0 && (
                        <div style={{ flex: 1 }}>
                            <SectionHeader title={t.sections.languages} bg={accentColor} fs={fs} headingFont={headingFont} sp={sp} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: sp(8), paddingLeft: sp(8) }}>
                                {languages.map((lang) => (
                                    <div key={lang.id} style={{ fontSize: fs.body, color: '#374151' }} data-paginate="item">
                                        <span style={{ fontWeight: 600 }}>{lang.name}</span> <span style={{ color: '#6b7280', fontSize: fs.small, textTransform: 'capitalize' }}>({translateProficiency(lang.proficiency, t.labels)})</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {strengths && strengths.length > 0 && (
                        <div style={{ flex: 1 }}>
                            <SectionHeader title={t.sections.strengths} bg={accentColor} fs={fs} headingFont={headingFont} sp={sp} />
                            <div style={{ paddingLeft: sp(8), display: 'flex', flexDirection: 'column', gap: sp(8)+'px' }}>
                                {strengths.map((str) => (
                                    <div key={str.id} data-paginate="item">
                                        <ProgressBar
                                            label={str.name}
                                            value={str.level ?? 80}
                                            color={accentColor}
                                            height={scale < 1 ? 4 : sp(6)}
                                            scale={1}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                </section>
            )}

            {/* Interests */}
            {data.interests && data.interests.length > 0 && (
                <section className="resume-section" style={{ marginTop: sp(20) }}>
                    <SectionHeader title={t.sections.interests} bg={accentColor} fs={fs} headingFont={headingFont} sp={sp} />
                    <p style={{ lineHeight: 1.6, fontSize: fs.body, color: '#374151', paddingLeft: sp(8) }}>
                        {data.interests.map(int => int.name).join(' • ')}
                    </p>
                </section>
            )}

            {/* Social Links */}
            {(personalInfo.x || personalInfo.github || personalInfo.dribbble || personalInfo.behance || personalInfo.instagram) && (
                <section className="resume-section" style={{ marginTop: sp(20) }}>
                    <SectionHeader title={t.sections.socialLinks} bg={accentColor} fs={fs} headingFont={headingFont} sp={sp} />
                    <div style={{ paddingLeft: sp(8), display: 'flex', flexDirection: 'column', gap: sp(8), fontSize: fs.body }}>
                        {personalInfo.x && <div><span style={{ fontWeight: 600 }}>X:</span> {personalInfo.x}</div>}
                        {personalInfo.github && <div><span style={{ fontWeight: 600 }}>GitHub:</span> {personalInfo.github}</div>}
                        {personalInfo.dribbble && <div><span style={{ fontWeight: 600 }}>Dribbble:</span> {personalInfo.dribbble}</div>}
                        {personalInfo.behance && <div><span style={{ fontWeight: 600 }}>Behance:</span> {personalInfo.behance}</div>}
                        {personalInfo.instagram && <div><span style={{ fontWeight: 600 }}>Instagram:</span> {personalInfo.instagram}</div>}
                    </div>
                </section>
            )}

            {/* Credentials (Certifications & Awards) */}
            {((certifications && certifications.length > 0) || (awards && awards.length > 0)) && (
                <section className="resume-section" style={{ marginTop: sp(20) }}>
                    <SectionHeader title={t.sections.credentials} bg={accentColor} fs={fs} headingFont={headingFont} sp={sp} />
                    <div style={{ paddingLeft: sp(8) }}>
                        {certifications && certifications.length > 0 && (
                            <div style={{ marginBottom: awards && awards.length > 0 ? sp(16) : 0 }}>
                                <h4 style={{ fontSize: fs.body, fontWeight: 600, color: '#6b7280', marginBottom: sp(8) }}>
                                    {t.sections.certifications}
                                </h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: sp(8) }}>
                                    {certifications.map((cert) => (
                                        <div key={cert.id} data-paginate="item">
                                            <div style={{ fontWeight: 600, fontSize: fs.body, color: '#000' }}>{cert.name}</div>
                                            <div style={{ fontSize: fs.small, color: '#6b7280' }}>{cert.issuer} • {cert.date}</div>
                                            {cert.url && <div style={{ fontSize: fs.small, color: '#6b7280', opacity: 0.7 }}>{cert.url}</div>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {awards && awards.length > 0 && (
                            <div>
                                <h4 style={{ fontSize: fs.body, fontWeight: 600, color: '#6b7280', marginBottom: sp(8) }}>
                                    {t.sections.awards}
                                </h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: sp(8) }}>
                                    {awards.map((award) => (
                                        <div key={award.id} data-paginate="item">
                                            <div style={{ fontWeight: 600, fontSize: fs.body, color: '#000' }}>{award.title}</div>
                                            <div style={{ fontSize: fs.small, color: '#6b7280' }}>{award.issuer} • {award.date}</div>
                                        
                                            {award.description && (
                                                <p style={{ fontSize: fs.small || fs.body, lineHeight: 1.5, color: '#4b5563', marginTop: '4px' }}>{award.description}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Personal Details */}
            {(personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber)) && (
                <section className="resume-section" style={{ marginTop: sp(20) }}>
                    <SectionHeader title={t.sections.personalDetails} bg={accentColor} fs={fs} headingFont={headingFont} sp={sp} />
                    <div style={{ paddingLeft: sp(8), display: 'flex', flexDirection: 'column', gap: sp(8), fontSize: fs.body }}>
                        {personalInfo.nationality && (
                            <div><span style={{ fontWeight: 600 }}>{t.labels.nationality || 'Nationality'}:</span> {personalInfo.nationality}</div>
                        )}
                        {personalInfo.idType && personalInfo.idNumber && (
                            <div>
                                <span style={{ fontWeight: 600 }}>
                                    {personalInfo.idType === 'id' ? (t.labels.id || 'ID') :
                                        personalInfo.idType === 'passport' ? (t.labels.passport || 'Passport') :
                                            personalInfo.idType === 'driving_license' ? (t.labels.drivingLicense || 'Driving License') : (t.labels.id || 'ID')}:
                                </span> {personalInfo.idNumber}
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Custom Fields */}
            {customFields?.map((field) => (
                <section key={field.id} className="resume-section" style={{ marginTop: sp(20) }}>
                    <SectionHeader title={field.label} bg={accentColor} fs={fs} headingFont={headingFont} sp={sp} />
                    <p style={{ paddingLeft: sp(8), lineHeight: 1.6, fontSize: fs.body, color: '#374151' }}>{field.content}</p>
                </section>
            ))}
        </div>
    );
}

// Helper
function SectionHeader({ title, bg, fs, headingFont, sp }: { title: string, bg: string, fs: ScaledFontSizes, headingFont: string, sp: (px: number) => number }) {
    return (
        <h3
            style={{
                fontFamily: headingFont,
                fontSize: fs.sectionHeading,
                fontWeight: 700,
                color: '#fff',
                textTransform: 'uppercase',
                backgroundColor: bg,
                padding: `${sp(4)}px ${sp(12)}px`,
                marginBottom: sp(16),
                letterSpacing: '0.05em',
                borderRadius: sp(2)
            }}
        >
            {title}
        </h3>
    );
}

export default memo(MinimalBlueSections);

// Meta
export const minimalBlueSectionsMeta: TemplateMeta = {
    id: 'minimal-blue-sections',
    name: 'Blue Sections',
    category: 'minimal',
    thumbnail: '/templates/minimal-blue-sections.jpg',
    description: 'Clean layout with distinct colored section headers',
};

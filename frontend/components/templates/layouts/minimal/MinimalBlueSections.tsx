'use client';

import { memo } from 'react';
import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';
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
function MinimalBlueSections({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, strengths, certifications, awards, references, customFields, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Roboto');
    const bodyFont = getFontFamily(fonts?.body || 'Open Sans');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes
    const fs = getScaledFontSizes(sizeConfig, scale);
    const t = useTemplateTranslations();

    // Colors
    const mainText = '#1f2937';
    const accentColor = customThemeColor || '#3b82f6'; // Blue 500
    const sectionBg = '#eff6ff'; // Very light blue for full band if needed, or just header bg. Let's do header bg.

    return (
        <div
            className="w-full h-full"
            style={{
                fontFamily: bodyFont,
                fontSize: sizeConfig.base,
                backgroundColor: '#FFFFFF',
                color: mainText,
                padding: scale < 1 ? '32px' : '56px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Header */}
            <header style={{ marginBottom: 32, borderBottom: `2px solid ${accentColor}`, paddingBottom: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                        <h1
                            style={{
                                fontFamily: headingFont,
                                fontSize: fs.name,
                                fontWeight: 700,
                                color: '#000',
                                textTransform: 'uppercase',
                                margin: 0,
                                marginBottom: 4,
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
                        gap: 2
                    }}>
                        {personalInfo.email && <span>{personalInfo.email}</span>}
                        {personalInfo.phone && <span>{personalInfo.phone}</span>}
                        {personalInfo.location && <span>{personalInfo.location}</span>}
                    </div>
                </div>
            </header>

            {/* Profile */}
            {personalInfo.summary && (
                <section style={{ marginBottom: 20 }}>
                    <SectionHeader title={t.sections.profile} bg={accentColor} fs={fs} headingFont={headingFont} />
                    <p style={{ lineHeight: 1.6, fontSize: fs.body, color: '#374151', paddingLeft: 8 }}>
                        {personalInfo.summary}
                    </p>
                </section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <section style={{ marginBottom: 20 }}>
                    <SectionHeader title={t.sections.experience} bg={accentColor} fs={fs} headingFont={headingFont} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: scale < 1 ? 20 : 32, paddingLeft: 8 }}>
                        {experience.map((exp) => (
                            <ResumeEntry key={exp.id}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#000' }}>{exp.title}</h4>
                                    <span style={{ fontSize: fs.small, color: '#4b5563' }}>{exp.startDate} – {exp.current ? t.labels.present : exp.endDate}</span>
                                </div>
                                <div style={{ fontSize: fs.small, color: accentColor, fontWeight: 600, marginBottom: 4 }}>
                                    {exp.company}, {exp.city}
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
            <div style={{ display: 'flex', gap: 32 }}>
                {education.length > 0 && (
                    <div style={{ flex: 1 }}>
                        <SectionHeader title={t.sections.education} bg={accentColor} fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingLeft: 8 }}>
                            {education.map((edu) => (
                                <ResumeEntry key={edu.id}>
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#000' }}>{edu.degree}</h4>
                                    <div style={{ fontSize: fs.body, color: '#4b5563' }}>{edu.school}, {edu.city}</div>
                                    <div style={{ fontSize: fs.small, color: '#6b7280' }}>{edu.startDate} – {edu.endDate || t.labels.present}</div>
                                </ResumeEntry>
                            ))}
                        </div>
                    </div>
                )}

                {skills.length > 0 && (
                    <div style={{ flex: 1 }}>
                        <SectionHeader title={t.sections.skills} bg={accentColor} fs={fs} headingFont={headingFont} />
                        <div className="space-y-2" style={{ paddingLeft: 8 }}>
                            {skills.map((skill) => (
                                <div key={skill.id} data-paginate="item">
                                    <ProgressBar
                                        label={skill.name}
                                        value={(skill.level || 3) * 20}
                                        color={accentColor}
                                        height={6}
                                        scale={1}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Languages and Strengths Row */}
            {((languages && languages.length > 0) || (strengths && strengths.length > 0)) && (
                <div style={{ display: 'flex', gap: 32, marginTop: 20 }}>
                    {languages && languages.length > 0 && (
                        <div style={{ flex: 1 }}>
                            <SectionHeader title={t.sections.languages} bg={accentColor} fs={fs} headingFont={headingFont} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 8 }}>
                                {languages.map((lang) => (
                                    <div key={lang.id} style={{ fontSize: fs.body, color: '#374151' }} data-paginate="item">
                                        <span style={{ fontWeight: 600 }}>{lang.name}</span> <span style={{ color: '#6b7280', fontSize: fs.small }}>({lang.proficiency})</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {strengths && strengths.length > 0 && (
                        <div style={{ flex: 1 }}>
                            <SectionHeader title={t.sections.strengths} bg={accentColor} fs={fs} headingFont={headingFont} />
                            <div className="space-y-2" style={{ paddingLeft: 8 }}>
                                {strengths.map((str) => (
                                    <div key={str.id} data-paginate="item">
                                        <ProgressBar
                                            label={str.name}
                                            value={str.level ?? 80}
                                            color={accentColor}
                                            height={6}
                                            scale={1}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Interests */}
            {data.interests && data.interests.length > 0 && (
                <section style={{ marginTop: 20 }}>
                    <SectionHeader title={t.sections.interests} bg={accentColor} fs={fs} headingFont={headingFont} />
                    <p style={{ lineHeight: 1.6, fontSize: fs.body, color: '#374151', paddingLeft: 8 }}>
                        {data.interests.map(int => int.name).join(' • ')}
                    </p>
                </section>
            )}

            {/* Credentials (Certifications & Awards) */}
            {((certifications && certifications.length > 0) || (awards && awards.length > 0)) && (
                <section style={{ marginTop: 20 }}>
                    <SectionHeader title={t.sections.credentials} bg={accentColor} fs={fs} headingFont={headingFont} />
                    <div style={{ paddingLeft: 8 }}>
                        {certifications && certifications.length > 0 && (
                            <div style={{ marginBottom: awards && awards.length > 0 ? 16 : 0 }}>
                                <h4 style={{ fontSize: fs.body, fontWeight: 600, color: '#6b7280', marginBottom: 8 }}>
                                    {t.sections.certifications}
                                </h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {certifications.map((cert) => (
                                        <div key={cert.id} data-paginate="item">
                                            <div style={{ fontWeight: 600, fontSize: fs.body, color: '#000' }}>{cert.name}</div>
                                            <div style={{ fontSize: fs.small, color: '#6b7280' }}>{cert.issuer} • {cert.date}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {awards && awards.length > 0 && (
                            <div>
                                <h4 style={{ fontSize: fs.body, fontWeight: 600, color: '#6b7280', marginBottom: 8 }}>
                                    {t.sections.awards}
                                </h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {awards.map((award) => (
                                        <div key={award.id} data-paginate="item">
                                            <div style={{ fontWeight: 600, fontSize: fs.body, color: '#000' }}>{award.title}</div>
                                            <div style={{ fontSize: fs.small, color: '#6b7280' }}>{award.issuer} • {award.date}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Social Links */}
            {(personalInfo.linkedin || personalInfo.x || personalInfo.github || personalInfo.dribbble || personalInfo.behance || personalInfo.instagram) && (
                <section style={{ marginTop: 20 }}>
                    <SectionHeader title={t.sections.socialLinks} bg={accentColor} fs={fs} headingFont={headingFont} />
                    <div style={{ paddingLeft: 8, display: 'flex', flexDirection: 'column', gap: 8, fontSize: fs.body }}>
                        {personalInfo.linkedin && <div><span style={{ fontWeight: 600 }}>LinkedIn:</span> {personalInfo.linkedin}</div>}
                        {personalInfo.x && <div><span style={{ fontWeight: 600 }}>X:</span> {personalInfo.x}</div>}
                        {personalInfo.github && <div><span style={{ fontWeight: 600 }}>GitHub:</span> {personalInfo.github}</div>}
                        {personalInfo.dribbble && <div><span style={{ fontWeight: 600 }}>Dribbble:</span> {personalInfo.dribbble}</div>}
                        {personalInfo.behance && <div><span style={{ fontWeight: 600 }}>Behance:</span> {personalInfo.behance}</div>}
                        {personalInfo.instagram && <div><span style={{ fontWeight: 600 }}>Instagram:</span> {personalInfo.instagram}</div>}
                    </div>
                </section>
            )}

            {/* References */}
            {references && references.length > 0 && (
                <section style={{ marginTop: 20 }}>
                    <SectionHeader title={t.sections.references} bg={accentColor} fs={fs} headingFont={headingFont} />
                    <div style={{ paddingLeft: 8, display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {references.map((ref) => (
                            <div key={ref.id} data-paginate="item">
                                <div style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#000' }}>{ref.name}</div>
                                <div style={{ fontSize: fs.body, color: '#4b5563' }}>{ref.title}, {ref.company}</div>
                                {ref.email && <div style={{ fontSize: fs.small, color: '#6b7280' }}>{ref.email}</div>}
                                {ref.phone && <div style={{ fontSize: fs.small, color: '#6b7280' }}>{ref.phone}</div>}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Personal Details */}
            {(personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber)) && (
                <section style={{ marginTop: 20 }}>
                    <SectionHeader title={t.sections.personalDetails} bg={accentColor} fs={fs} headingFont={headingFont} />
                    <div style={{ paddingLeft: 8, display: 'flex', flexDirection: 'column', gap: 8, fontSize: fs.body }}>
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

            {/* Custom Fields */}
            {customFields?.map((field) => (
                <section key={field.id} style={{ marginTop: 20 }}>
                    <SectionHeader title={field.label} bg={accentColor} fs={fs} headingFont={headingFont} />
                    <p style={{ paddingLeft: 8, lineHeight: 1.6, fontSize: fs.body, color: '#374151' }}>{field.content}</p>
                </section>
            ))}
        </div>
    );
}

// Helper
function SectionHeader({ title, bg, fs, headingFont }: { title: string, bg: string, fs: ScaledFontSizes, headingFont: string }) {
    return (
        <h3
            style={{
                fontFamily: headingFont,
                fontSize: fs.sectionHeading,
                fontWeight: 700,
                color: '#fff',
                textTransform: 'uppercase',
                backgroundColor: bg,
                padding: '4px 12px',
                marginBottom: 16,
                letterSpacing: '0.05em',
                borderRadius: 2
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
    name: 'Minimal Blue Sections',
    category: 'minimal',
    thumbnail: '/templates/minimal-blue-sections.jpg',
    description: 'Clean layout with distinct colored section headers',
};

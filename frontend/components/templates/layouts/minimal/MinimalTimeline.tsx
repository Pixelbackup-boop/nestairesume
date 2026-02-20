'use client';

import { memo } from 'react';
import { TemplateProps, TemplateMeta } from '../../shared/types';
import ProgressBar from '../../shared/ProgressBar';

import { useTemplateSetup } from '@/hooks';

/**
 * Minimal Timeline Template
 * Reference: minimal-timeline.webp
 *
 * Layout:
 * - Left vertical line connecting items in experience/education.
 * - Single column but with the visual timeline aid.
 * - Simple dots on the timeline.
 */
function MinimalTimeline({ data, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, certifications, awards, references, customFields, customThemeColor, fonts } = data;

    const { headingFont, bodyFont, sizeConfig, fs, t, colors } = useTemplateSetup({
        customThemeColor,
        fonts,
        scale,
        defaultPrimary: '#000000',
        defaultHeadingFont: 'Roboto',
        defaultBodyFont: 'Source Sans Pro',
    });

    const sizeMult = parseInt(sizeConfig.base) / 14;
    const sp = (px: number) => Math.round(px * sizeMult);

    // Colors
    const timelineColor = '#e5e7eb';
    const dotColor = customThemeColor || colors.primary;

    return (
        <div
            className="w-full h-full"
            style={{
                fontFamily: bodyFont,
                fontSize: sizeConfig.base,
                backgroundColor: '#FFFFFF',
                color: '#1f2937',
                padding: scale < 1 ? '32px' : sp(64)+'px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Header */}
            <header style={{ marginBottom: sp(32), marginLeft: sp(20) }}>
                <h1
                    style={{
                        fontFamily: headingFont,
                        fontSize: fs.name,
                        fontWeight: 700,
                        color: '#000',
                        margin: 0,
                        marginBottom: sp(4),
                    }}
                >
                    {personalInfo.fullName}
                </h1>
                <p style={{ fontSize: fs.jobTitle, color: '#4b5563', marginBottom: sp(12) }}>{personalInfo.jobTitle}</p>
                <div style={{ fontSize: fs.small, color: '#6b7280' }}>
                    {[personalInfo.location, personalInfo.email, personalInfo.phone, personalInfo.website, personalInfo.linkedin].filter(Boolean).join('  |  ')}
                </div>
            </header>

            {/* Experience with Timeline */}
            {experience.length > 0 && (
                <section className="resume-section" style={{ marginBottom: sp(20) }}>
                    <h3 style={{ fontSize: fs.sectionHeading, fontWeight: 700, marginBottom: sp(24), marginLeft: sp(20), textTransform: 'uppercase', color: dotColor }}>{t.sections.experience}</h3>
                    <div style={{ borderLeft: `${sp(2)}px solid ${timelineColor}`, marginLeft: sp(20), paddingLeft: sp(24) }}>
                        {experience.map((exp) => (
                            <div key={exp.id} data-paginate="item" style={{ position: 'relative', marginBottom: sp(32) }}>
                                {/* Timeline Dot */}
                                <div style={{
                                    position: 'absolute',
                                    left: -sp(31),
                                    top: sp(6),
                                    width: sp(12),
                                    height: sp(12),
                                    borderRadius: '50%',
                                    backgroundColor: dotColor,
                                    border: `${sp(2)}px solid white`,
                                    zIndex: 1
                                }} />

                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: sp(2) }}>
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#000' }}>{exp.title}</h4>
                                    <span style={{ fontSize: fs.small, color: '#4b5563' }}>{exp.startDate} – {exp.current ? t.labels.present : exp.endDate}</span>
                                </div>
                                <div style={{ fontSize: fs.small, color: '#000', fontWeight: 600, marginBottom: sp(4) }}>
                                    {exp.company}, {exp.city}
                                </div>
                                <p style={{ fontSize: fs.body, lineHeight: 1.6, color: '#374151' }}>
                                    {exp.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education with Timeline */}
            {education.length > 0 && (
                <section className="resume-section" style={{ marginBottom: sp(20) }}>
                    <h3 style={{ fontSize: fs.sectionHeading, fontWeight: 700, marginBottom: sp(24), marginLeft: sp(20), textTransform: 'uppercase', color: dotColor }}>{t.sections.education}</h3>
                    <div style={{ borderLeft: `${sp(2)}px solid ${timelineColor}`, marginLeft: sp(20), paddingLeft: sp(24) }}>
                        {education.map((edu) => (
                            <div key={edu.id} data-paginate="item" style={{ position: 'relative', marginBottom: sp(24) }}>
                                {/* Timeline Dot */}
                                <div style={{
                                    position: 'absolute',
                                    left: -sp(31),
                                    top: sp(6),
                                    width: sp(12),
                                    height: sp(12),
                                    borderRadius: '50%',
                                    backgroundColor: dotColor,
                                    border: `${sp(2)}px solid white`,
                                    zIndex: 1
                                }}></div>

                                <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#000' }}>{edu.degree}</h4>
                                <div style={{ fontSize: fs.body, color: '#4b5563' }}>{edu.school}, {edu.city}</div>
                                <div style={{ fontSize: fs.small, color: '#6b7280' }}>{edu.startDate} – {edu.endDate || t.labels.present}</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {skills.length > 0 && (
                <section className="resume-section" style={{ marginLeft: sp(20) }}>
                    <h3 style={{ fontSize: fs.sectionHeading, fontWeight: 700, marginBottom: sp(16), textTransform: 'uppercase', color: dotColor }}>{t.sections.skills}</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: sp(8)+'px' }}>
                        {skills.map((skill) => (
                            <div key={skill.id} data-paginate="item">
                                <ProgressBar
                                    label={skill.name}
                                    value={(skill.level || 3) * 20}
                                    color={dotColor}
                                    height={scale < 1 ? 4 : sp(6)}
                                    scale={1}
                                />
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Languages */}
            {languages && languages.length > 0 && (
                <section className="resume-section" style={{ marginLeft: sp(20), marginTop: sp(20) }}>
                    <h3 style={{ fontSize: fs.sectionHeading, fontWeight: 700, marginBottom: sp(16), textTransform: 'uppercase', color: dotColor }}>{t.sections.languages}</h3>
                    <p style={{ lineHeight: 1.8, fontSize: fs.body }}>
                        {languages.map(l => `${l.name} (${l.proficiency ? l.proficiency.charAt(0).toUpperCase() + l.proficiency.slice(1) : ''})`).join('  •  ')}
                    </p>
                </section>
            )}

            {/* Personal Details */}
            {(personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber)) && (
                <section className="resume-section" style={{ marginLeft: sp(20), marginTop: sp(20) }}>
                    <h3 style={{ fontSize: fs.sectionHeading, fontWeight: 700, marginBottom: sp(16), textTransform: 'uppercase', color: dotColor }}>{t.sections.personalDetails}</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: sp(8), fontSize: fs.body }}>
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

            {/* Strengths */}
            {data.strengths && data.strengths.length > 0 && (
                <section className="resume-section" style={{ marginLeft: sp(20), marginTop: sp(20) }}>
                    <h3 style={{ fontSize: fs.sectionHeading, fontWeight: 700, marginBottom: sp(16), textTransform: 'uppercase', color: dotColor }}>{t.sections.strengths}</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: sp(12) }}>
                        {data.strengths.map((str) => (
                            <span key={str.id} style={{
                                fontSize: fs.body,
                                color: '#1f2937',
                                backgroundColor: '#f3f4f6',
                                padding: `${sp(4)}px ${sp(8)}px`,
                                borderRadius: sp(4)
                            }}>
                                {str.name}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {/* Interests */}
            {data.interests && data.interests.length > 0 && (
                <section className="resume-section" style={{ marginLeft: sp(20), marginTop: sp(20) }}>
                    <h3 style={{ fontSize: fs.sectionHeading, fontWeight: 700, marginBottom: sp(16), textTransform: 'uppercase', color: dotColor }}>{t.sections.interests}</h3>
                    <p style={{ lineHeight: 1.8, fontSize: fs.body }}>
                        {data.interests.map(i => i.name).join(' • ')}
                    </p>
                </section>
            )}

            {/* Social Links */}
            {(personalInfo.x || personalInfo.github || personalInfo.dribbble || personalInfo.behance || personalInfo.instagram) && (
                <section className="resume-section" style={{ marginLeft: sp(20), marginTop: sp(20) }}>
                    <h3 style={{ fontSize: fs.sectionHeading, fontWeight: 700, marginBottom: sp(16), textTransform: 'uppercase', color: dotColor }}>{t.sections.socialLinks}</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: sp(8), fontSize: fs.body }}>
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
                <section className="resume-section" style={{ marginLeft: sp(20), marginTop: sp(20) }}>
                    <h3 style={{ fontSize: fs.sectionHeading, fontWeight: 700, marginBottom: sp(16), textTransform: 'uppercase', color: dotColor }}>{t.sections.credentials}</h3>

                    {certifications && certifications.length > 0 && (
                        <div style={{ marginBottom: awards && awards.length > 0 ? sp(16) : 0 }}>
                            <h4 style={{ fontSize: fs.body, fontWeight: 600, color: '#6b7280', marginBottom: sp(8) }}>
                                {t.sections.certifications}
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: sp(8)+'px' }}>
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
                            <h4 style={{ fontSize: fs.body, fontWeight: 600, color: '#6b7280', marginBottom: sp(8) }}>
                                {t.sections.awards}
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: sp(8)+'px' }}>
                                {awards.map((award) => (
                                    <div key={award.id} data-paginate="item">
                                        <div style={{ fontWeight: 600, fontSize: fs.body, color: '#000' }}>{award.title}</div>
                                        <div style={{ fontSize: fs.small, color: '#6b7280' }}>{award.issuer} • {award.date}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </section>
            )}

            {/* References */}
            {references && references.length > 0 && (
                <section className="resume-section" style={{ marginLeft: sp(20), marginTop: sp(20) }}>
                    <h3 style={{ fontSize: fs.sectionHeading, fontWeight: 700, marginBottom: sp(16), textTransform: 'uppercase', color: dotColor }}>{t.sections.references}</h3>
                    <div style={{ paddingLeft: sp(16), display: 'flex', flexDirection: 'column', gap: sp(16) }}>
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

            {/* Custom Fields */}
            {customFields?.map((field) => (
                <section key={field.id} className="resume-section" style={{ marginLeft: sp(20), marginTop: sp(20) }}>
                    <h3 style={{ fontSize: fs.sectionHeading, fontWeight: 700, marginBottom: sp(16), textTransform: 'uppercase', color: dotColor }}>{field.label}</h3>
                    <p style={{ lineHeight: 1.6, fontSize: fs.body }}>{field.content}</p>
                </section>
            ))}

        </div>
    );
}

export default memo(MinimalTimeline);

// Meta
export const minimalTimelineMeta: TemplateMeta = {
    id: 'minimal-timeline',
    name: 'Minimal Timeline',
    category: 'minimal',
    thumbnail: '/templates/minimal-timeline.webp',
    description: 'Timeline-based layout for clear chronological progression',
};

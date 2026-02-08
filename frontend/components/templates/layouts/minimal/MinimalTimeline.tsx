'use client';

import { memo } from 'react';
import { TemplateProps, TemplateMeta } from '../../shared/types';
import ProgressBar from '../../shared/ProgressBar';
import ResumeEntry from '../../shared/ResumeEntry';
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

    // Colors
    const timelineColor = '#e5e7eb';
    const dotColor = colors.primary;

    return (
        <div
            className="w-full h-full"
            style={{
                fontFamily: bodyFont,
                fontSize: sizeConfig.base,
                backgroundColor: '#FFFFFF',
                color: '#1f2937',
                padding: scale < 1 ? '32px' : '64px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Header */}
            <header style={{ marginBottom: 32, marginLeft: 20 }}>
                <h1
                    style={{
                        fontFamily: headingFont,
                        fontSize: fs.name,
                        fontWeight: 700,
                        color: '#000',
                        margin: 0,
                        marginBottom: 4,
                    }}
                >
                    {personalInfo.fullName}
                </h1>
                <p style={{ fontSize: fs.jobTitle, color: '#4b5563', marginBottom: 12 }}>{personalInfo.jobTitle}</p>
                <div style={{ fontSize: fs.small, color: '#6b7280' }}>
                    {[personalInfo.location, personalInfo.email, personalInfo.phone].filter(Boolean).join('  |  ')}
                </div>
            </header>

            {/* Experience with Timeline */}
            {experience.length > 0 && (
                <section style={{ marginBottom: 20 }}>
                    <h3 style={{ fontSize: fs.sectionHeading, fontWeight: 700, marginBottom: 24, marginLeft: 20, textTransform: 'uppercase' }}>{t.sections.experience}</h3>
                    <div style={{ borderLeft: `2px solid ${timelineColor}`, marginLeft: 20, paddingLeft: 24 }}>
                        {experience.map((exp) => (
                            <ResumeEntry key={exp.id} style={{ position: 'relative', marginBottom: 32 }}>
                                {/* Timeline Dot */}
                                <div style={{
                                    position: 'absolute',
                                    left: -31,
                                    top: 6,
                                    width: 12,
                                    height: 12,
                                    borderRadius: '50%',
                                    backgroundColor: dotColor,
                                    border: '2px solid white',
                                    zIndex: 1
                                }} />

                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#000' }}>{exp.title}</h4>
                                    <span style={{ fontSize: fs.small, color: '#4b5563' }}>{exp.startDate} – {exp.current ? t.labels.present : exp.endDate}</span>
                                </div>
                                <div style={{ fontSize: fs.small, color: '#000', fontWeight: 600, marginBottom: 4 }}>
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

            {/* Education with Timeline */}
            {education.length > 0 && (
                <section style={{ marginBottom: 20 }}>
                    <h3 style={{ fontSize: fs.sectionHeading, fontWeight: 700, marginBottom: 24, marginLeft: 20, textTransform: 'uppercase' }}>{t.sections.education}</h3>
                    <div style={{ borderLeft: `2px solid ${timelineColor}`, marginLeft: 20, paddingLeft: 24 }}>
                        {education.map((edu) => (
                            <ResumeEntry key={edu.id} style={{ position: 'relative', marginBottom: 24 }}>
                                {/* Timeline Dot */}
                                <div style={{
                                    position: 'absolute',
                                    left: -31,
                                    top: 6,
                                    width: 12,
                                    height: 12,
                                    borderRadius: '50%',
                                    backgroundColor: dotColor,
                                    border: '2px solid white',
                                    zIndex: 1
                                }}></div>

                                <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#000' }}>{edu.degree}</h4>
                                <div style={{ fontSize: fs.body, color: '#4b5563' }}>{edu.school}, {edu.city}</div>
                                <div style={{ fontSize: fs.small, color: '#6b7280' }}>{edu.startDate} – {edu.endDate || t.labels.present}</div>
                            </ResumeEntry>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {skills.length > 0 && (
                <section style={{ marginLeft: 20 }}>
                    <h3 style={{ fontSize: fs.sectionHeading, fontWeight: 700, marginBottom: 16, textTransform: 'uppercase' }}>{t.sections.skills}</h3>
                    <div className="space-y-2">
                        {skills.map((skill) => (
                            <div key={skill.id} data-paginate="item">
                                <ProgressBar
                                    label={skill.name}
                                    value={(skill.level || 3) * 20}
                                    color={dotColor}
                                    height={6}
                                    scale={1}
                                />
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Languages */}
            {languages && languages.length > 0 && (
                <section style={{ marginLeft: 20, marginTop: 20 }}>
                    <h3 style={{ fontSize: fs.sectionHeading, fontWeight: 700, marginBottom: 16, textTransform: 'uppercase' }}>{t.sections.languages}</h3>
                    <p style={{ lineHeight: 1.8, fontSize: fs.body }}>
                        {languages.map(l => `${l.name} (${l.proficiency})`).join('  •  ')}
                    </p>
                </section>
            )}

            {/* Strengths */}
            {data.strengths && data.strengths.length > 0 && (
                <section style={{ marginLeft: 20, marginTop: 20 }}>
                    <h3 style={{ fontSize: fs.sectionHeading, fontWeight: 700, marginBottom: 16, textTransform: 'uppercase' }}>{t.sections.strengths}</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                        {data.strengths.map((str) => (
                            <span key={str.id} style={{
                                fontSize: fs.body,
                                color: '#1f2937',
                                backgroundColor: '#f3f4f6',
                                padding: '4px 8px',
                                borderRadius: 4
                            }}>
                                {str.name}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {/* Interests */}
            {data.interests && data.interests.length > 0 && (
                <section style={{ marginLeft: 20, marginTop: 20 }}>
                    <h3 style={{ fontSize: fs.sectionHeading, fontWeight: 700, marginBottom: 16, textTransform: 'uppercase' }}>{t.sections.interests}</h3>
                    <p style={{ lineHeight: 1.8, fontSize: fs.body }}>
                        {data.interests.map(i => i.name).join(' • ')}
                    </p>
                </section>
            )}

            {/* Credentials (Certifications & Awards) */}
            {((certifications && certifications.length > 0) || (awards && awards.length > 0)) && (
                <section style={{ marginLeft: 20, marginTop: 20 }}>
                    <h3 style={{ fontSize: fs.sectionHeading, fontWeight: 700, marginBottom: 16, textTransform: 'uppercase' }}>{t.sections.credentials}</h3>

                    {certifications && certifications.length > 0 && (
                        <div style={{ marginBottom: awards && awards.length > 0 ? 16 : 0 }}>
                            <h4 style={{ fontSize: fs.body, fontWeight: 600, color: '#6b7280', marginBottom: 8 }}>
                                {t.sections.certifications}
                            </h4>
                            <div className="space-y-2">
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
                            <div className="space-y-2">
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

            {/* Social Links */}
            {(personalInfo.linkedin || personalInfo.x || personalInfo.github || personalInfo.dribbble || personalInfo.behance || personalInfo.instagram) && (
                <section style={{ marginLeft: 20, marginTop: 20 }}>
                    <h3 style={{ fontSize: fs.sectionHeading, fontWeight: 700, marginBottom: 16, textTransform: 'uppercase' }}>{t.sections.socialLinks}</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: fs.body }}>
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
                <section style={{ marginLeft: 20, marginTop: 20 }}>
                    <h3 style={{ fontSize: fs.sectionHeading, fontWeight: 700, marginBottom: 16, textTransform: 'uppercase' }}>{t.sections.references}</h3>
                    <div style={{ paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
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
                <section style={{ marginLeft: 20, marginTop: 20 }}>
                    <h3 style={{ fontSize: fs.sectionHeading, fontWeight: 700, marginBottom: 16, textTransform: 'uppercase' }}>{t.sections.personalDetails}</h3>
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

            {/* Custom Fields */}
            {customFields?.map((field) => (
                <section key={field.id} style={{ marginLeft: 20, marginTop: 20 }}>
                    <h3 style={{ fontSize: fs.sectionHeading, fontWeight: 700, marginBottom: 16, textTransform: 'uppercase' }}>{field.label}</h3>
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

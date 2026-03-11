'use client';

import { memo } from 'react';
import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, translateProficiency } from '../../shared/styleHelpers';
import ProgressBar from '../../shared/ProgressBar';
import ResumeEntry from '../../shared/ResumeEntry';
import { useTemplateTranslations } from '@/lib/templates/TranslationContext';

/**
 * Minimal Labels Tan Template
 * Reference: minimal-labels-tan.webp
 *
 * Layout:
 * - Two Column Layout (Left: Labels/Dates, Right: Content).
 * - Background: Light Tan/Off-white (#fefce8 or #fffbeb).
 * - Style: Very simple, similar to ClassicLabelsLeft but warmer minimal feel.
 */
function MinimalLabelsTan({ data, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, certifications, awards, customFields, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Lato');
    const bodyFont = getFontFamily(fonts?.body || 'Lato');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes
    const fs = getScaledFontSizes(sizeConfig, scale);
    const sizeMult = parseInt(sizeConfig.base) / 14;
    const sp = (px: number) => Math.round(px * sizeMult);

    const t = useTemplateTranslations();

    // Colors
    const mainBg = '#fdfbf7'; // Warm white/ivory
    const mainText = '#44403c'; // Stone 700
    const labelText = '#a8a29e'; // Stone 400

    return (
        <div
            className="w-full h-full"
            style={{
                fontFamily: bodyFont,
                fontSize: sizeConfig.base,
                backgroundColor: mainBg,
                color: mainText,
                padding: scale < 1 ? '32px' : sp(64)+'px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Header */}
            <header style={{ marginLeft: '30%', marginBottom: sp(32) }}>
                <h1
                    style={{
                        fontFamily: headingFont,
                        fontSize: fs.name,
                        fontWeight: 400,
                        color: '#000',
                        margin: 0,
                        marginBottom: sp(4),
                    }}
                >
                    {personalInfo.fullName}
                </h1>
                <p
                    style={{
                        fontSize: fs.jobTitle,
                        color: '#000',
                        fontWeight: 400,
                        marginBottom: sp(16)
                    }}
                >
                    {personalInfo.jobTitle}
                </p>

                {/* Contact */}
                <div style={{
                    fontSize: fs.small,
                    display: 'flex',
                    gap: sp(16)+'px',
                    color: '#000',
                    flexWrap: 'wrap'
                }}>
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                    {personalInfo.website && <span>{personalInfo.website}</span>}
                    {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
                </div>
            </header>

            {/* Sections Wrapper */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: sp(24) }}>

                {/* Profile */}
                {personalInfo.summary && (
                    <div className="resume-section" style={{ display: 'flex' }}>
                        <div style={{ width: '30%', paddingRight: sp(24), flexShrink: 0 }}>
                            <h3 style={{ fontSize: sp(18), fontWeight: 600, color: '#000', margin: 0 }}>{t.sections.profile}</h3>
                        </div>
                        <div style={{ flex: 1 }}>
                            <p style={{ margin: 0, lineHeight: 1.6, fontSize: fs.body }}>{personalInfo.summary}</p>
                        </div>
                    </div>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <div className="resume-section" style={{ display: 'flex' }}>
                        <div style={{ width: '30%', paddingRight: sp(24), flexShrink: 0 }}>
                            <h3 style={{ fontSize: sp(18), fontWeight: 600, color: '#000', margin: 0 }}>{t.sections.experience}</h3>
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: sp(24) }}>
                            {experience.map((exp) => (
                                <ResumeEntry key={exp.id}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: sp(2) }}>
                                        <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#000' }}>{exp.title}</h4>
                                        <span style={{ fontSize: fs.small, color: '#4b5563' }}>{exp.startDate} – {exp.current ? t.labels.present : exp.endDate}</span>
                                    </div>
                                    <div style={{ fontSize: fs.small, color: customThemeColor || '#d97706', fontWeight: 600, marginBottom: sp(4) }}>
                                        {exp.company}{(exp.city || exp.country) && `, ${[exp.city, exp.country].filter(Boolean).join(', ')}`}
                                    </div>
                                    <p style={{ fontSize: fs.body, lineHeight: 1.6, color: '#374151' }}>
                                        {exp.description}
                                    </p>
                                </ResumeEntry>
                            ))}
                        </div>
                    </div>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <div className="resume-section" style={{ display: 'flex' }}>
                        <div style={{ width: '30%', paddingRight: sp(24), flexShrink: 0 }}>
                            <h3 style={{ fontSize: sp(18), fontWeight: 600, color: '#000', margin: 0 }}>{t.sections.education}</h3>
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: sp(16) }}>
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

                {/* Skills */}
                {skills.length > 0 && (
                    <div className="resume-section" style={{ display: 'flex' }}>
                        <div style={{ width: '30%', paddingRight: sp(24), flexShrink: 0 }}>
                            <h3 style={{ fontSize: sp(18), fontWeight: 600, color: '#000', margin: 0 }}>{t.sections.skills}</h3>
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: sp(8) }}>
                            {skills.map((skill) => (
                                <div key={skill.id} data-paginate="item">
                                    <ProgressBar
                                        label={skill.name}
                                        value={(skill.level || 3) * 20}
                                        color={customThemeColor || '#a8a29e'}
                                        height={scale < 1 ? 4 : sp(6)}
                                        scale={1}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Languages */}
                {languages && languages.length > 0 && (
                    <div className="resume-section" style={{ display: 'flex' }}>
                        <div style={{ width: '30%', paddingRight: sp(24), flexShrink: 0 }}>
                            <h3 style={{ fontSize: sp(18), fontWeight: 600, color: '#000', margin: 0 }}>{t.sections.languages}</h3>
                        </div>
                        <div style={{ flex: 1 }}>
                            <p style={{ margin: 0, lineHeight: 1.8, fontSize: fs.body }}>
                                {languages.map(l => `${l.name} (${translateProficiency(l.proficiency, t.labels)})`).join(', ')}
                            </p>
                        </div>
                    </div>
                )}

                {/* Strengths */}
                {data.strengths && data.strengths.length > 0 && (
                    <div className="resume-section" style={{ display: 'flex' }}>
                        <div style={{ width: '30%', paddingRight: sp(24), flexShrink: 0 }}>
                            <h3 style={{ fontSize: sp(18), fontWeight: 600, color: '#000', margin: 0 }}>{t.sections.strengths}</h3>
                        </div>
                        <div style={{ flex: 1, display: 'flex', gap: sp(8), flexWrap: 'wrap' }}>
                            {data.strengths.map((str) => (
                                <span key={str.id} style={{
                                    fontSize: fs.small,
                                    color: mainText,
                                    backgroundColor: '#f5f5f4',
                                    padding: `${sp(4)}px ${sp(8)}px`,
                                    borderRadius: sp(4)
                                }}>
                                    {str.name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Interests */}
                {data.interests && data.interests.length > 0 && (
                    <div className="resume-section" style={{ display: 'flex' }}>
                        <div style={{ width: '30%', paddingRight: sp(24), flexShrink: 0 }}>
                            <h3 style={{ fontSize: sp(18), fontWeight: 600, color: '#000', margin: 0 }}>{t.sections.interests}</h3>
                        </div>
                        <div style={{ flex: 1 }}>
                            <p style={{ margin: 0, lineHeight: 1.8, fontSize: fs.body }}>
                                {data.interests.map(i => i.name).join(', ')}
                            </p>
                        </div>
                    </div>
                )}

                {/* Credentials (Certifications & Awards) */}
                {((certifications && certifications.length > 0) || (awards && awards.length > 0)) && (
                    <div className="resume-section" style={{ display: 'flex' }}>
                        <div style={{ width: '30%', paddingRight: sp(24), flexShrink: 0 }}>
                            <h3 style={{ fontSize: sp(18), fontWeight: 600, color: '#000', margin: 0 }}>{t.sections.credentials}</h3>
                        </div>
                        <div style={{ flex: 1 }}>
                            {certifications && certifications.length > 0 && (
                                <div style={{ marginBottom: awards && awards.length > 0 ? sp(16) : 0 }}>
                                    <h4 style={{ fontSize: fs.small, fontWeight: 600, color: labelText, marginBottom: sp(8) }}>
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
                                    <h4 style={{ fontSize: fs.small, fontWeight: 600, color: labelText, marginBottom: sp(8) }}>
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
                    </div>
                )}

                {/* Social Links */}
                {(personalInfo.x || personalInfo.github || personalInfo.dribbble || personalInfo.behance || personalInfo.instagram) && (
                    <div className="resume-section" style={{ display: 'flex' }}>
                        <div style={{ width: '30%', paddingRight: sp(24), flexShrink: 0 }}>
                            <h3 style={{ fontSize: sp(18), fontWeight: 600, color: '#000', margin: 0 }}>{t.sections.socialLinks}</h3>
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: sp(6), fontSize: fs.body }}>
                            {personalInfo.x && <div><span style={{ fontWeight: 600 }}>X:</span> {personalInfo.x}</div>}
                            {personalInfo.github && <div><span style={{ fontWeight: 600 }}>GitHub:</span> {personalInfo.github}</div>}
                            {personalInfo.dribbble && <div><span style={{ fontWeight: 600 }}>Dribbble:</span> {personalInfo.dribbble}</div>}
                            {personalInfo.behance && <div><span style={{ fontWeight: 600 }}>Behance:</span> {personalInfo.behance}</div>}
                            {personalInfo.instagram && <div><span style={{ fontWeight: 600 }}>Instagram:</span> {personalInfo.instagram}</div>}
                        </div>
                    </div>
                )}

                {/* Personal Details */}
                {(personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber)) && (
                    <div className="resume-section" style={{ display: 'flex' }}>
                        <div style={{ width: '30%', paddingRight: sp(24), flexShrink: 0 }}>
                            <h3 style={{ fontSize: sp(18), fontWeight: 600, color: '#000', margin: 0 }}>{t.sections.personalDetails}</h3>
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: sp(6), fontSize: fs.body }}>
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
                    </div>
                )}

                {/* Custom Fields */}
                {customFields?.map((field) => (
                    <div key={field.id} className="resume-section" style={{ display: 'flex', marginTop: sp(24) }}>
                        <div style={{ width: '30%', paddingRight: sp(24), flexShrink: 0 }}>
                            <h3 style={{ fontSize: sp(18), fontWeight: 600, color: '#000', margin: 0 }}>{field.label}</h3>
                        </div>
                        <div style={{ flex: 1 }}>
                            <p style={{ margin: 0, lineHeight: 1.6, fontSize: fs.body }}>{field.content}</p>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}

export default memo(MinimalLabelsTan);

// Meta
export const minimalLabelsTanMeta: TemplateMeta = {
    id: 'minimal-labels-tan',
    name: 'Labels Tan',
    category: 'minimal',
    thumbnail: '/templates/minimal-labels-tan.webp',
    description: 'Warm, understated layout with left-aligned labels',
};

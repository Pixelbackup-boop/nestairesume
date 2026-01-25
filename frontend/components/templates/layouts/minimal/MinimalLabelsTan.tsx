'use client';

import { memo } from 'react';
import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';
import ProgressBar from '../../shared/ProgressBar';
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
function MinimalLabelsTan({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, certifications, awards, references, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Lato');
    const bodyFont = getFontFamily(fonts?.body || 'Lato');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes
    const fs = getScaledFontSizes(sizeConfig, scale);

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
                padding: scale < 1 ? '32px' : '64px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Header */}
            <header style={{ marginLeft: '30%', marginBottom: scale < 1 ? 40 : 64 }}>
                <h1
                    style={{
                        fontFamily: headingFont,
                        fontSize: fs.name,
                        fontWeight: 400,
                        color: '#000',
                        textTransform: 'lowercase', // Stylish minimal lowercase? Or Keep Standard. Let's do standard minimal.
                        margin: 0,
                        marginBottom: 4,
                    }}
                >
                    {personalInfo.fullName}
                </h1>
                <p
                    style={{
                        fontSize: fs.jobTitle,
                        color: labelText,
                        fontWeight: 400,
                        textTransform: 'lowercase',
                        marginBottom: 16
                    }}
                >
                    {personalInfo.jobTitle}
                </p>

                {/* Contact */}
                <div style={{
                    fontSize: fs.small,
                    display: 'flex',
                    gap: '16px',
                    color: labelText,
                    flexWrap: 'wrap'
                }}>
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                </div>
            </header>

            {/* Sections Wrapper */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: scale < 1 ? 32 : 48 }}>

                {/* Profile */}
                {personalInfo.summary && (
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '30%', paddingRight: 24, flexShrink: 0 }}>
                            <h3 style={{ fontSize: fs.small, color: labelText, margin: 0 }}>{t.sections.profile}</h3>
                        </div>
                        <div style={{ flex: 1 }}>
                            <p style={{ margin: 0, lineHeight: 1.6, fontSize: fs.body }}>{personalInfo.summary}</p>
                        </div>
                    </div>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '30%', paddingRight: 24, flexShrink: 0 }}>
                            <h3 style={{ fontSize: fs.small, color: labelText, margin: 0 }}>{t.sections.experience}</h3>
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
                            {experience.map((exp) => (
                                <div key={exp.id}>
                                    <h4 style={{ fontWeight: 600, fontSize: fs.entryTitle, color: '#000', margin: 0 }}>{exp.title}</h4>
                                    <div style={{ fontSize: fs.body, color: labelText, marginBottom: 8 }}>
                                        {exp.company}, {exp.startDate}–{exp.current ? t.labels.present : exp.endDate}
                                    </div>
                                    <p style={{ margin: 0, lineHeight: 1.6, fontSize: fs.body }}>{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '30%', paddingRight: 24, flexShrink: 0 }}>
                            <h3 style={{ fontSize: fs.small, color: labelText, margin: 0 }}>{t.sections.education}</h3>
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {education.map((edu) => (
                                <div key={edu.id}>
                                    <h4 style={{ fontWeight: 600, fontSize: fs.entryTitle, color: '#000', margin: 0 }}>{edu.degree}</h4>
                                    <div style={{ fontSize: fs.body, color: labelText }}>
                                        {edu.school} | {edu.startDate}–{edu.endDate || t.labels.present}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Skills */}
                {skills.length > 0 && (
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '30%', paddingRight: 24, flexShrink: 0 }}>
                            <h3 style={{ fontSize: fs.small, color: labelText, margin: 0 }}>{t.sections.skills}</h3>
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {skills.map((skill) => (
                                <div key={skill.id} data-paginate="item">
                                    <ProgressBar
                                        label={skill.name}
                                        value={(skill.level || 3) * 20}
                                        color={customThemeColor || '#a8a29e'}
                                        height={6}
                                        scale={1}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Languages */}
                {languages && languages.length > 0 && (
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '30%', paddingRight: 24, flexShrink: 0 }}>
                            <h3 style={{ fontSize: fs.small, color: labelText, margin: 0 }}>{t.sections.languages}</h3>
                        </div>
                        <div style={{ flex: 1 }}>
                            <p style={{ margin: 0, lineHeight: 1.8, fontSize: fs.body }}>
                                {languages.map(l => `${l.name} (${l.proficiency})`).join(', ')}
                            </p>
                        </div>
                    </div>
                )}

                {/* Strengths */}
                {data.strengths && data.strengths.length > 0 && (
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '30%', paddingRight: 24, flexShrink: 0 }}>
                            <h3 style={{ fontSize: fs.small, color: labelText, margin: 0 }}>{t.sections.strengths}</h3>
                        </div>
                        <div style={{ flex: 1, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            {data.strengths.map((str) => (
                                <span key={str.id} style={{
                                    fontSize: fs.small,
                                    color: mainText,
                                    backgroundColor: '#f5f5f4',
                                    padding: '4px 8px',
                                    borderRadius: 4
                                }}>
                                    {str.name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Interests */}
                {data.interests && data.interests.length > 0 && (
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '30%', paddingRight: 24, flexShrink: 0 }}>
                            <h3 style={{ fontSize: fs.small, color: labelText, margin: 0 }}>{t.sections.interests}</h3>
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
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '30%', paddingRight: 24, flexShrink: 0 }}>
                            <h3 style={{ fontSize: fs.small, color: labelText, margin: 0 }}>{t.sections.credentials}</h3>
                        </div>
                        <div style={{ flex: 1 }}>
                            {certifications && certifications.length > 0 && (
                                <div style={{ marginBottom: awards && awards.length > 0 ? 16 : 0 }}>
                                    <h4 style={{ fontSize: fs.small, fontWeight: 600, color: labelText, marginBottom: 8 }}>
                                        {t.sections.certifications}
                                    </h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                        {certifications.map((cert) => (
                                            <div key={cert.id}>
                                                <div style={{ fontWeight: 600, fontSize: fs.body, color: mainText }}>{cert.name}</div>
                                                <div style={{ fontSize: fs.small, color: labelText }}>{cert.issuer} • {cert.date}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {awards && awards.length > 0 && (
                                <div>
                                    <h4 style={{ fontSize: fs.small, fontWeight: 600, color: labelText, marginBottom: 8 }}>
                                        {t.sections.awards}
                                    </h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                        {awards.map((award) => (
                                            <div key={award.id}>
                                                <div style={{ fontWeight: 600, fontSize: fs.body, color: mainText }}>{award.title}</div>
                                                <div style={{ fontSize: fs.small, color: labelText }}>{award.issuer} • {award.date}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Social Links */}
                {(personalInfo.linkedin || personalInfo.twitter || personalInfo.github || personalInfo.dribbble || personalInfo.behance || personalInfo.instagram) && (
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '30%', paddingRight: 24, flexShrink: 0 }}>
                            <h3 style={{ fontSize: fs.small, color: labelText, margin: 0 }}>{t.sections.socialLinks}</h3>
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, fontSize: fs.body }}>
                            {personalInfo.linkedin && <div><span style={{ fontWeight: 600 }}>LinkedIn:</span> {personalInfo.linkedin}</div>}
                            {personalInfo.twitter && <div><span style={{ fontWeight: 600 }}>Twitter:</span> {personalInfo.twitter}</div>}
                            {personalInfo.github && <div><span style={{ fontWeight: 600 }}>GitHub:</span> {personalInfo.github}</div>}
                            {personalInfo.dribbble && <div><span style={{ fontWeight: 600 }}>Dribbble:</span> {personalInfo.dribbble}</div>}
                            {personalInfo.behance && <div><span style={{ fontWeight: 600 }}>Behance:</span> {personalInfo.behance}</div>}
                            {personalInfo.instagram && <div><span style={{ fontWeight: 600 }}>Instagram:</span> {personalInfo.instagram}</div>}
                        </div>
                    </div>
                )}

                {/* References */}
                {references && references.length > 0 && (
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '30%', paddingRight: 24, flexShrink: 0 }}>
                            <h3 style={{ fontSize: fs.small, color: labelText, margin: 0 }}>{t.sections.references}</h3>
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {references.map((ref) => (
                                <div key={ref.id}>
                                    <div style={{ fontWeight: 600, fontSize: fs.body, color: mainText }}>{ref.name}</div>
                                    <div style={{ fontSize: fs.body, color: labelText }}>{ref.title}, {ref.company}</div>
                                    {ref.email && <div style={{ fontSize: fs.small, color: labelText }}>{ref.email}</div>}
                                    {ref.phone && <div style={{ fontSize: fs.small, color: labelText }}>{ref.phone}</div>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Personal Details */}
                {(personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber)) && (
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '30%', paddingRight: 24, flexShrink: 0 }}>
                            <h3 style={{ fontSize: fs.small, color: labelText, margin: 0 }}>{t.sections.personalDetails}</h3>
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, fontSize: fs.body }}>
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
                    </div>
                )}

                {/* Custom Field */}
                {personalInfo.customField && personalInfo.customFieldLabel && (
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '30%', paddingRight: 24, flexShrink: 0 }}>
                            <h3 style={{ fontSize: fs.small, color: labelText, margin: 0 }}>{personalInfo.customFieldLabel}</h3>
                        </div>
                        <div style={{ flex: 1 }}>
                            <p style={{ margin: 0, lineHeight: 1.6, fontSize: fs.body }}>{personalInfo.customField}</p>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

export default memo(MinimalLabelsTan);

// Meta
export const minimalLabelsTanMeta: TemplateMeta = {
    id: 'minimal-labels-tan',
    name: 'Minimal Labels Tan',
    category: 'minimal',
    thumbnail: '/templates/minimal-labels-tan.webp',
    description: 'Warm, understated layout with left-aligned labels',
};

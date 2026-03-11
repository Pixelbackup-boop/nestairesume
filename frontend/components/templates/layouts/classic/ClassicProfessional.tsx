'use client';

import { memo } from 'react';
import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getBackgroundStyle, getFontFamily, fontSizes, getImageBorderRadius, formatIdType, translateProficiency } from '../../shared/styleHelpers';
import SectionHeader from '../../shared/SectionHeader';
import ResumeEntry from '../../shared/ResumeEntry';
import { useTemplateTranslations } from '@/lib/templates/TranslationContext';

/**
 * Classic Professional Template
 * Traditional top-down professional resume layout with centered header.
 */
function ClassicProfessional({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, interests, strengths, certifications, awards, customFields, background, fonts } = data;
    const bgStyle = getBackgroundStyle(background);
    const headingFont = getFontFamily(fonts?.heading || 'Inter');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];
const sizeMult = parseInt(sizeConfig.base) / 14;
    const sp = (px: number) => Math.round(px * sizeMult);
    const t = useTemplateTranslations();

    return (
        <div
            className="w-full h-full"
            style={{
                fontFamily: bodyFont,
                fontSize: sizeConfig.base,
                ...bgStyle,
                padding: scale < 1 ? '16px' : `${sp(40)}px ${sp(44)}px`,
            }}
        >
            {/* Header */}
            <header
                className="text-center"
                style={{
                    marginBottom: sp(16),
                    paddingBottom: sp(16),
                    borderBottom: `${sp(2)}px solid ${theme.accent}`,
                }}
            >
                {/* Profile Image */}
                {personalInfo.profileImage && (
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: sp(12) }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={personalInfo.profileImage}
                            alt={personalInfo.fullName}
                            style={{
                                objectFit: 'cover',
                                border: `${sp(2)}px solid ${theme.primary}`,
                                width: scale < 1 ? '48px' : sp(80) + 'px',
                                height: scale < 1 ? '48px' : sp(80) + 'px',
                                borderRadius: getImageBorderRadius(personalInfo.imageShape),
                            }}
                        />
                    </div>
                )}
                <h1
                    style={{
                        color: theme.primary,
                        fontFamily: headingFont,
                        fontSize: scale < 1 ? '18px' : sizeConfig.heading,
                        fontWeight: 700,
                        marginBottom: sp(4),
                    }}
                >
                    {personalInfo.fullName || 'Your Name'}
                </h1>
                <p style={{ color: theme.secondary, fontSize: scale < 1 ? '12px' : sizeConfig.subheading, marginBottom: sp(8) }}>
                    {personalInfo.jobTitle || 'Job Title'}
                </p>
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: sp(12) + 'px',
                        color: theme.text,
                        fontSize: scale < 1 ? '8px' : sp(12) + 'px',
                    }}
                >
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>&bull;</span>}
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.location && <span>&bull;</span>}
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                    {personalInfo.website && <span>&bull;</span>}
                    {personalInfo.website && <span style={{ wordBreak: 'break-all' as const }}>{personalInfo.website}</span>}
                    {personalInfo.linkedin && <span>&bull;</span>}
                    {personalInfo.linkedin && <span style={{ wordBreak: 'break-all' as const }}>{personalInfo.linkedin}</span>}
                </div>
            </header>

            {/* Summary */}
            {personalInfo.summary && (
                <section className="resume-section" style={{ marginBottom: sp(16) }}>
                    <SectionHeader
                        theme={theme}
                        headingFont={headingFont}
                        scale={scale}
                        variant="default"
                        style={{ borderBottom: `${sp(1)}px solid ${theme.accent}`, paddingBottom: sp(4) }}
                    >
                        {t.sections.profile}
                    </SectionHeader>
                    <p style={{ color: theme.text, lineHeight: 1.5, fontSize: scale < 1 ? '9px' : sizeConfig.base }}>
                        {personalInfo.summary}
                    </p>
                </section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <section className="resume-section" style={{ marginBottom: sp(16) }}>
                    <SectionHeader
                        theme={theme}
                        headingFont={headingFont}
                        scale={scale}
                        variant="default"
                        style={{ borderBottom: `${sp(1)}px solid ${theme.accent}`, paddingBottom: sp(4) }}
                    >
                        {t.sections.experience}
                    </SectionHeader>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: sp(12) + 'px' }}>
                        {experience.map((exp) => (
                            <ResumeEntry key={exp.id}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                    <h3 style={{ color: theme.text, fontWeight: 600, fontSize: scale < 1 ? '10px' : sizeConfig.base }}>
                                        {exp.title}
                                    </h3>
                                    <span style={{ color: theme.text, opacity: 0.7, fontSize: scale < 1 ? '8px' : sp(11) + 'px' }}>
                                        {exp.startDate} – {exp.current ? t.labels.present : exp.endDate}
                                    </span>
                                </div>
                                <p style={{ color: theme.secondary, fontSize: scale < 1 ? '9px' : sp(12) + 'px', marginBottom: sp(4) }}>
                                    {exp.company}{(exp.city || exp.country) && `, ${[exp.city, exp.country].filter(Boolean).join(', ')}`}
                                </p>
                                {exp.description && (
                                    <p style={{ color: theme.text, opacity: 0.8, fontSize: scale < 1 ? '8px' : sp(12) + 'px', lineHeight: 1.4, whiteSpace: 'pre-line' }}>
                                        {exp.description}
                                    </p>
                                )}
                            </ResumeEntry>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {education.length > 0 && (
                <section className="resume-section" style={{ marginBottom: sp(16) }}>
                    <SectionHeader
                        theme={theme}
                        headingFont={headingFont}
                        scale={scale}
                        variant="default"
                        style={{ borderBottom: `${sp(1)}px solid ${theme.accent}`, paddingBottom: sp(4) }}
                    >
                        {t.sections.education}
                    </SectionHeader>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: sp(8) + 'px' }}>
                        {education.map((edu) => (
                            <ResumeEntry key={edu.id}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                    <h3 style={{ color: theme.text, fontWeight: 600, fontSize: scale < 1 ? '10px' : sizeConfig.base }}>
                                        {edu.school}{(edu.city || edu.country) && `, ${[edu.city, edu.country].filter(Boolean).join(', ')}`}
                                    </h3>
                                    <span style={{ color: theme.text, opacity: 0.7, fontSize: scale < 1 ? '8px' : sp(11) + 'px' }}>
                                        {edu.startDate} – {edu.current ? t.labels.present : edu.endDate}
                                    </span>
                                </div>
                                <p style={{ color: theme.secondary, fontSize: scale < 1 ? '9px' : sp(12) + 'px' }}>
                                    {edu.degree}
                                    {edu.gpa && <span style={{ marginLeft: sp(8), opacity: 0.8 }}>{ t.labels.gpa || 'GPA' }: {edu.gpa}</span>}
                                </p>
                                {edu.honors && (
                                    <p style={{ color: theme.text, opacity: 0.7, fontSize: scale < 1 ? '8px' : sp(11) + 'px' }}>
                                        {edu.honors}
                                    </p>
                                )}
                                {edu.clubs && (
                                    <p style={{ color: theme.text, opacity: 0.6, fontSize: scale < 1 ? '7px' : sp(10) + 'px' }}>
                                        { t.labels.activities || 'Activities' }: {edu.clubs}
                                    </p>
                                )}
                                {edu.description && (
                                    <p style={{ color: theme.text, opacity: 0.7, fontSize: scale < 1 ? '8px' : sp(11) + 'px', lineHeight: 1.5, marginTop: '4px' }}>{edu.description}</p>
                                )}
                            </ResumeEntry>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {skills.length > 0 && (
                <section className="resume-section" style={{ marginBottom: sp(16) }}>
                    <SectionHeader
                        theme={theme}
                        headingFont={headingFont}
                        scale={scale}
                        variant="default"
                        style={{ borderBottom: `${sp(1)}px solid ${theme.accent}`, paddingBottom: sp(4) }}
                    >
                        {t.sections.skills}
                    </SectionHeader>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: sp(4) + 'px' }}>
                        {skills.map((skill) => (
                            <div key={skill.id} style={{ display: 'flex', alignItems: 'center', gap: sp(8) + 'px' }} data-paginate="item">
                                <span style={{ color: theme.text, fontSize: scale < 1 ? '9px' : sp(12) + 'px', minWidth: scale < 1 ? '60px' : sp(100) + 'px' }}>
                                    {skill.name}
                                </span>
                                <div style={{ display: 'flex', gap: sp(4) + 'px' }}>
                                    {[1, 2, 3, 4, 5].map((dot) => (
                                        <div
                                            key={dot}
                                            style={{
                                                width: scale < 1 ? '4px' : sp(8) + 'px',
                                                height: scale < 1 ? '4px' : sp(8) + 'px',
                                                borderRadius: '50%',
                                                backgroundColor: dot <= (skill.level || 3) ? theme.primary : `${theme.primary}30`,
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Languages */}
            {languages && languages.length > 0 && (
                <section className="resume-section" style={{ marginBottom: sp(16) }}>
                    <SectionHeader
                        theme={theme}
                        headingFont={headingFont}
                        scale={scale}
                        variant="default"
                        style={{ borderBottom: `${sp(1)}px solid ${theme.accent}`, paddingBottom: sp(4) }}
                    >
                        {t.sections.languages}
                    </SectionHeader>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: sp(4) + 'px' }}>
                        {languages.map((lang) => (
                            <div key={lang.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} data-paginate="item">
                                <span style={{ color: theme.text, fontSize: scale < 1 ? '9px' : sp(12) + 'px' }}>
                                    {lang.name}
                                </span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: sp(8) + 'px' }}>
                                    <span style={{ color: theme.text, opacity: 0.7, fontSize: scale < 1 ? '7px' : sp(10) + 'px', textTransform: 'capitalize' }}>
                                        {translateProficiency(lang.proficiency, t.labels)}
                                    </span>
                                    <div
                                        style={{
                                            width: scale < 1 ? '40px' : sp(80) + 'px',
                                            height: scale < 1 ? '3px' : sp(6) + 'px',
                                            backgroundColor: `${theme.primary}30`,
                                            borderRadius: sp(3) + 'px',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: `${lang.level}%`,
                                                height: '100%',
                                                backgroundColor: theme.primary,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Strengths */}
            {strengths && strengths.length > 0 && (
                <section className="resume-section" style={{ marginBottom: sp(16) }}>
                    <SectionHeader
                        theme={theme}
                        headingFont={headingFont}
                        scale={scale}
                        variant="default"
                        style={{ borderBottom: `${sp(1)}px solid ${theme.accent}`, paddingBottom: sp(4) }}
                    >
                        {t.sections.strengths}
                    </SectionHeader>
                    <p style={{ color: theme.text, fontSize: sp(12) + 'px', lineHeight: 1.6 }}>
                        {strengths.map((strength, i) => (
                            <span key={strength.id}>
                                {i > 0 && ' \u2022 '}
                                {strength.name}
                            </span>
                        ))}
                    </p>
                </section>
            )}

            {/* Certifications */}
            {certifications && certifications.length > 0 && (
                <section className="resume-section" style={{ marginBottom: sp(16) }}>
                    <SectionHeader
                        theme={theme}
                        headingFont={headingFont}
                        scale={scale}
                        variant="default"
                        style={{ borderBottom: `${sp(1)}px solid ${theme.accent}`, paddingBottom: sp(4) }}
                    >
                        {t.sections.certifications}
                    </SectionHeader>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: sp(4) + 'px' }}>
                        {certifications.map((cert) => (
                            <div key={cert.id} data-paginate="item">
                                <span style={{ color: theme.text, fontWeight: 500, fontSize: scale < 1 ? '9px' : sp(12) + 'px' }}>
                                    {cert.name}
                                </span>
                                <span style={{ color: theme.text, opacity: 0.7, fontSize: scale < 1 ? '8px' : sp(11) + 'px', marginLeft: sp(8) }}>
                                    {cert.issuer} &bull; {cert.date}
                                </span>
                                {cert.url && <div style={{ color: theme.text, opacity: 0.6, fontSize: scale < 1 ? '7px' : sp(10) + 'px' }}>{cert.url}</div>}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Awards */}
            {awards && awards.length > 0 && (
                <section className="resume-section" style={{ marginBottom: sp(16) }}>
                    <SectionHeader
                        theme={theme}
                        headingFont={headingFont}
                        scale={scale}
                        variant="default"
                        style={{ borderBottom: `${sp(1)}px solid ${theme.accent}`, paddingBottom: sp(4) }}
                    >
                        {t.sections.awards}
                    </SectionHeader>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: sp(8) + 'px' }}>
                        {awards.map((award) => (
                            <div key={award.id} data-paginate="item">
                                <div style={{ color: theme.text, fontWeight: 600, fontSize: scale < 1 ? '10px' : sizeConfig.base }}>
                                    {award.title}
                                </div>
                                <div style={{ color: theme.text, opacity: 0.7, fontSize: scale < 1 ? '8px' : sp(11) + 'px' }}>
                                    {award.issuer} &bull; {award.date}
                                </div>
                                {award.description && (
                                    <p style={{ color: theme.text, opacity: 0.8, fontSize: scale < 1 ? '8px' : sp(12) + 'px', lineHeight: 1.4 }}>
                                        {award.description}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Interests */}
            {interests && interests.length > 0 && (
                <section className="resume-section" style={{ marginBottom: sp(16) }}>
                    <SectionHeader
                        theme={theme}
                        headingFont={headingFont}
                        scale={scale}
                        variant="default"
                        style={{ borderBottom: `${sp(1)}px solid ${theme.accent}`, paddingBottom: sp(4) }}
                    >
                        {t.sections.interests}
                    </SectionHeader>
                    <p style={{ color: theme.text, fontSize: scale < 1 ? '9px' : sp(12) + 'px' }}>
                        {interests.map(i => i.name).join(' \u2022 ')}
                    </p>
                </section>
            )}

            {/* Personal Details */}
            {(personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber)) && (
                <section className="resume-section" style={{ marginBottom: sp(16) }}>
                    <SectionHeader
                        theme={theme}
                        headingFont={headingFont}
                        scale={scale}
                        variant="default"
                        style={{ borderBottom: `${sp(1)}px solid ${theme.accent}`, paddingBottom: sp(4) }}
                    >
                        {t.sections.personalDetails}
                    </SectionHeader>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: sp(4) + 'px', fontSize: scale < 1 ? '9px' : sp(12) + 'px' }}>
                        {personalInfo.nationality && (
                            <div data-paginate="item">
                                <strong>{t.labels.nationality}:</strong> {personalInfo.nationality}
                            </div>
                        )}
                        {personalInfo.idType && personalInfo.idNumber && (
                            <div data-paginate="item">
                                <strong>{formatIdType(personalInfo.idType, t.labels)}:</strong> {personalInfo.idNumber}
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Social Links */}
            {(personalInfo.x || personalInfo.github || personalInfo.dribbble || personalInfo.behance || personalInfo.instagram) && (
                <section className="resume-section" style={{ marginBottom: sp(16) }}>
                    <SectionHeader
                        theme={theme}
                        headingFont={headingFont}
                        scale={scale}
                        variant="default"
                        style={{ borderBottom: `${sp(1)}px solid ${theme.accent}`, paddingBottom: sp(4) }}
                    >
                        {t.sections.socialLinks}
                    </SectionHeader>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: sp(12) + 'px', fontSize: scale < 1 ? '9px' : sp(12) + 'px' }}>
                        {personalInfo.x && (
                            <span style={{ color: theme.text }}>
                                <strong>X:</strong> {personalInfo.x}
                            </span>
                        )}
                        {personalInfo.github && (
                            <span style={{ color: theme.text }}>
                                <strong>GitHub:</strong> {personalInfo.github}
                            </span>
                        )}
                        {personalInfo.dribbble && (
                            <span style={{ color: theme.text }}>
                                <strong>Dribbble:</strong> {personalInfo.dribbble}
                            </span>
                        )}
                        {personalInfo.behance && (
                            <span style={{ color: theme.text }}>
                                <strong>Behance:</strong> {personalInfo.behance}
                            </span>
                        )}
                        {personalInfo.instagram && (
                            <span style={{ color: theme.text }}>
                                <strong>Instagram:</strong> {personalInfo.instagram}
                            </span>
                        )}
                    </div>
                </section>
            )}

            {/* Custom Fields */}
            {customFields?.map((field) => (
                <section key={field.id} className="resume-section" style={{ marginBottom: sp(16) }}>
                    <SectionHeader
                        theme={theme}
                        headingFont={headingFont}
                        scale={scale}
                        variant="default"
                        style={{ borderBottom: `${sp(1)}px solid ${theme.accent}`, paddingBottom: sp(4) }}
                    >
                        {field.label}
                    </SectionHeader>
                    <p style={{ color: theme.text, fontSize: scale < 1 ? '9px' : sp(12) + 'px', lineHeight: 1.5, whiteSpace: 'pre-line' }}>
                        {field.content}
                    </p>
                </section>
            ))}
        </div>
    );
}

// Wrap with memo to prevent unnecessary re-renders
export default memo(ClassicProfessional);

// Template metadata for registry
export const classicProfessionalMeta: TemplateMeta = {
    id: 'classic-professional',
    name: 'Classic Professional',
    category: 'classic',
    thumbnail: '/templates/classic-professional.png',
    description: 'Traditional top-down layout with centered header',
};

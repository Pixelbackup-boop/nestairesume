'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getBackgroundStyle, getFontFamily, fontSizes, getImageBorderRadius, formatIdType } from '../../shared/styleHelpers';
import SectionHeader from '../../shared/SectionHeader';
import ResumeEntry from '../../shared/ResumeEntry';

/**
 * Classic Professional Template
 * Traditional top-down professional resume layout with centered header.
 */
export default function ClassicProfessional({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, interests, strengths, certifications, background, fonts } = data;
    const bgStyle = getBackgroundStyle(background);
    const headingFont = getFontFamily(fonts?.heading || 'Inter');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    return (
        <div
            className="w-full h-full"
            style={{
                fontFamily: bodyFont,
                fontSize: sizeConfig.base,
                ...bgStyle,
                padding: scale < 1 ? '16px' : '40px',
            }}
        >
            {/* Header */}
            <header className="text-center mb-6 pb-4 border-b-2" style={{ borderColor: theme.accent }}>
                {/* Profile Image */}
                {personalInfo.profileImage && (
                    <div className="flex justify-center mb-3">
                        <img
                            src={personalInfo.profileImage}
                            alt={personalInfo.fullName}
                            className="object-cover border-2"
                            style={{
                                width: scale < 1 ? '48px' : '80px',
                                height: scale < 1 ? '48px' : '80px',
                                borderRadius: getImageBorderRadius(personalInfo.imageShape),
                                borderColor: theme.primary,
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
                        marginBottom: '4px',
                    }}
                >
                    {personalInfo.fullName || 'Your Name'}
                </h1>
                <p style={{ color: theme.secondary, fontSize: scale < 1 ? '12px' : sizeConfig.subheading, marginBottom: '8px' }}>
                    {personalInfo.jobTitle || 'Job Title'}
                </p>
                <div
                    className="flex flex-wrap justify-center gap-3"
                    style={{ color: theme.text, fontSize: scale < 1 ? '8px' : '12px' }}
                >
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>•</span>}
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.location && <span>•</span>}
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                    {personalInfo.nationality && <span>•</span>}
                    {personalInfo.nationality && <span>{personalInfo.nationality}</span>}
                </div>
                {personalInfo.idType && personalInfo.idNumber && (
                    <div style={{ color: theme.text, fontSize: scale < 1 ? '7px' : '11px', marginTop: '4px', opacity: 0.8 }}>
                        {formatIdType(personalInfo.idType)}: {personalInfo.idNumber}
                    </div>
                )}
            </header>

            {/* Summary */}
            {personalInfo.summary && (
                <section className="mb-5 resume-section">
                    <SectionHeader
                        theme={theme}
                        headingFont={headingFont}
                        scale={scale}
                        variant="default"
                        style={{ borderBottom: `1px solid ${theme.accent}`, paddingBottom: '4px' }}
                    >
                        Professional Summary
                    </SectionHeader>
                    <p style={{ color: theme.text, lineHeight: 1.5, fontSize: scale < 1 ? '9px' : sizeConfig.base }}>
                        {personalInfo.summary}
                    </p>
                </section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <section className="mb-5 resume-section">
                    <SectionHeader
                        theme={theme}
                        headingFont={headingFont}
                        scale={scale}
                        variant="default"
                        style={{ borderBottom: `1px solid ${theme.accent}`, paddingBottom: '4px' }}
                    >
                        Experience
                    </SectionHeader>
                    <div className="space-y-3">
                        {experience.map((exp) => (
                            <ResumeEntry key={exp.id}>
                                <div className="flex justify-between items-baseline">
                                    <h3 style={{ color: theme.text, fontWeight: 600, fontSize: scale < 1 ? '10px' : sizeConfig.base }}>
                                        {exp.title}
                                    </h3>
                                    <span style={{ color: theme.text, opacity: 0.7, fontSize: scale < 1 ? '8px' : '11px' }}>
                                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                                    </span>
                                </div>
                                <p style={{ color: theme.secondary, fontSize: scale < 1 ? '9px' : '12px', marginBottom: '4px' }}>
                                    {exp.company}{(exp.city || exp.country) && `, ${[exp.city, exp.country].filter(Boolean).join(', ')}`}
                                </p>
                                {exp.description && (
                                    <p style={{ color: theme.text, opacity: 0.8, fontSize: scale < 1 ? '8px' : '12px', lineHeight: 1.4, whiteSpace: 'pre-line' }}>
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
                <section className="mb-5 resume-section">
                    <SectionHeader
                        theme={theme}
                        headingFont={headingFont}
                        scale={scale}
                        variant="default"
                        style={{ borderBottom: `1px solid ${theme.accent}`, paddingBottom: '4px' }}
                    >
                        Education
                    </SectionHeader>
                    <div className="space-y-2">
                        {education.map((edu) => (
                            <ResumeEntry key={edu.id}>
                                <div className="flex justify-between items-baseline">
                                    <h3 style={{ color: theme.text, fontWeight: 600, fontSize: scale < 1 ? '10px' : sizeConfig.base }}>
                                        {edu.school}
                                    </h3>
                                    <span style={{ color: theme.text, opacity: 0.7, fontSize: scale < 1 ? '8px' : '11px' }}>
                                        {edu.startDate} – {edu.current ? 'Present' : edu.endDate}
                                    </span>
                                </div>
                                <p style={{ color: theme.secondary, fontSize: scale < 1 ? '9px' : '12px' }}>
                                    {edu.degree}
                                    {edu.gpa && <span style={{ marginLeft: '8px', opacity: 0.8 }}>GPA: {edu.gpa}</span>}
                                </p>
                                {edu.honors && (
                                    <p style={{ color: theme.text, opacity: 0.7, fontSize: scale < 1 ? '8px' : '11px' }}>
                                        {edu.honors}
                                    </p>
                                )}
                                {edu.clubs && (
                                    <p style={{ color: theme.text, opacity: 0.6, fontSize: scale < 1 ? '7px' : '10px' }}>
                                        Activities: {edu.clubs}
                                    </p>
                                )}
                            </ResumeEntry>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {skills.length > 0 && (
                <section className="mb-5 resume-section">
                    <SectionHeader
                        theme={theme}
                        headingFont={headingFont}
                        scale={scale}
                        variant="default"
                        style={{ borderBottom: `1px solid ${theme.accent}`, paddingBottom: '4px' }}
                    >
                        Skills
                    </SectionHeader>
                    <div className="space-y-1">
                        {skills.map((skill) => (
                            <div key={skill.id} className="flex items-center gap-2">
                                <span style={{ color: theme.text, fontSize: scale < 1 ? '9px' : '12px', minWidth: scale < 1 ? '60px' : '100px' }}>
                                    {skill.name}
                                </span>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((dot) => (
                                        <div
                                            key={dot}
                                            style={{
                                                width: scale < 1 ? '4px' : '8px',
                                                height: scale < 1 ? '4px' : '8px',
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
                <section className="mb-5 resume-section">
                    <SectionHeader
                        theme={theme}
                        headingFont={headingFont}
                        scale={scale}
                        variant="default"
                        style={{ borderBottom: `1px solid ${theme.accent}`, paddingBottom: '4px' }}
                    >
                        Languages
                    </SectionHeader>
                    <div className="space-y-1">
                        {languages.map((lang) => (
                            <div key={lang.id} className="flex items-center justify-between">
                                <span style={{ color: theme.text, fontSize: scale < 1 ? '9px' : '12px' }}>
                                    {lang.name}
                                </span>
                                <div className="flex items-center gap-2">
                                    <div
                                        style={{
                                            width: scale < 1 ? '40px' : '80px',
                                            height: scale < 1 ? '3px' : '6px',
                                            backgroundColor: `${theme.primary}30`,
                                            borderRadius: '3px',
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
                                    <span style={{ color: theme.text, opacity: 0.7, fontSize: scale < 1 ? '7px' : '10px', textTransform: 'capitalize' }}>
                                        {lang.proficiency}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Strengths */}
            {strengths && strengths.length > 0 && (
                <section className="mb-5 resume-section">
                    <SectionHeader
                        theme={theme}
                        headingFont={headingFont}
                        scale={scale}
                        variant="default"
                        style={{ borderBottom: `1px solid ${theme.accent}`, paddingBottom: '4px' }}
                    >
                        Strengths
                    </SectionHeader>
                    <div className="flex flex-wrap gap-1">
                        {strengths.map((strength) => (
                            <span
                                key={strength.id}
                                style={{
                                    backgroundColor: `${theme.primary}15`,
                                    color: theme.primary,
                                    padding: scale < 1 ? '2px 6px' : '4px 10px',
                                    borderRadius: '4px',
                                    fontSize: scale < 1 ? '7px' : '11px',
                                }}
                            >
                                {strength.name}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {/* Certifications */}
            {certifications && certifications.length > 0 && (
                <section className="mb-5 resume-section">
                    <SectionHeader
                        theme={theme}
                        headingFont={headingFont}
                        scale={scale}
                        variant="default"
                        style={{ borderBottom: `1px solid ${theme.accent}`, paddingBottom: '4px' }}
                    >
                        Certifications
                    </SectionHeader>
                    <div className="space-y-1">
                        {certifications.map((cert) => (
                            <div key={cert.id}>
                                <span style={{ color: theme.text, fontWeight: 500, fontSize: scale < 1 ? '9px' : '12px' }}>
                                    {cert.name}
                                </span>
                                <span style={{ color: theme.text, opacity: 0.7, fontSize: scale < 1 ? '8px' : '11px', marginLeft: '8px' }}>
                                    {cert.issuer} • {cert.date}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Interests */}
            {interests && interests.length > 0 && (
                <section className="resume-section">
                    <SectionHeader
                        theme={theme}
                        headingFont={headingFont}
                        scale={scale}
                        variant="default"
                        style={{ borderBottom: `1px solid ${theme.accent}`, paddingBottom: '4px' }}
                    >
                        Interests
                    </SectionHeader>
                    <p style={{ color: theme.text, fontSize: scale < 1 ? '9px' : '12px' }}>
                        {interests.map(i => i.name).join(' • ')}
                    </p>
                </section>
            )}
        </div>
    );
}

// Template metadata for registry
export const classicProfessionalMeta: TemplateMeta = {
    id: 'classic-professional',
    name: 'Classic Professional',
    category: 'classic',
    thumbnail: '/templates/classic-professional.png',
    description: 'Traditional top-down layout with centered header',
};

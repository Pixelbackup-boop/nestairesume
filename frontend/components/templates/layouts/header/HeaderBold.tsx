'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getBackgroundStyle, getFontFamily, fontSizes, getImageBorderRadius, formatIdType } from '../../shared/styleHelpers';
import SectionHeader from '../../shared/SectionHeader';
import ResumeEntry from '../../shared/ResumeEntry';

/**
 * Header Bold Template
 * Full-width colored header banner with photo and contact info.
 */
export default function HeaderBold({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, interests, strengths, certifications, background, fonts } = data;
    const bgStyle = getBackgroundStyle(background);
    const headingFont = getFontFamily(fonts?.heading || 'Inter');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    return (
        <div className="w-full h-full" style={{ fontFamily: bodyFont, fontSize: sizeConfig.base }}>
            {/* Header Banner */}
            <header
                style={{
                    backgroundColor: theme.primary,
                    padding: scale < 1 ? '16px' : '32px',
                    textAlign: 'center',
                    color: '#ffffff',
                }}
            >
                {/* Profile Image */}
                {personalInfo.profileImage && (
                    <div className="flex justify-center mb-3">
                        <img
                            src={personalInfo.profileImage}
                            alt={personalInfo.fullName}
                            className="object-cover border-2 border-white/30"
                            style={{
                                width: scale < 1 ? '50px' : '90px',
                                height: scale < 1 ? '50px' : '90px',
                                borderRadius: getImageBorderRadius(personalInfo.imageShape),
                            }}
                        />
                    </div>
                )}
                <h1
                    style={{
                        fontFamily: headingFont,
                        fontSize: scale < 1 ? '18px' : sizeConfig.heading,
                        fontWeight: 700,
                        marginBottom: '4px',
                    }}
                >
                    {personalInfo.fullName || 'Your Name'}
                </h1>
                <p style={{ fontSize: scale < 1 ? '11px' : sizeConfig.subheading, opacity: 0.9, marginBottom: '8px' }}>
                    {personalInfo.jobTitle || 'Job Title'}
                </p>
                <div className="flex flex-wrap justify-center gap-2" style={{ fontSize: scale < 1 ? '7px' : '11px', opacity: 0.8 }}>
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>•</span>}
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.location && <span>•</span>}
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                    {personalInfo.nationality && <span>•</span>}
                    {personalInfo.nationality && <span>{personalInfo.nationality}</span>}
                </div>
                {personalInfo.idType && personalInfo.idNumber && (
                    <div style={{ fontSize: scale < 1 ? '6px' : '10px', marginTop: '6px', opacity: 0.7 }}>
                        {formatIdType(personalInfo.idType)}: {personalInfo.idNumber}
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main style={{ padding: scale < 1 ? '12px' : '24px', ...bgStyle }}>
                {/* Summary */}
                {personalInfo.summary && (
                    <section className="mb-5 resume-section">
                        <p style={{ color: theme.text, lineHeight: 1.5, fontSize: scale < 1 ? '8px' : '12px' }}>
                            {personalInfo.summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <section className="mb-5 resume-section">
                        <SectionHeader theme={theme} headingFont={headingFont} scale={scale} variant="uppercase">
                            Experience
                        </SectionHeader>
                        <div className="space-y-3">
                            {experience.map((exp) => (
                                <ResumeEntry key={exp.id}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 style={{ color: theme.text, fontWeight: 600, fontSize: scale < 1 ? '9px' : '13px' }}>
                                            {exp.title}
                                        </h3>
                                        <span style={{ color: theme.text, opacity: 0.6, fontSize: scale < 1 ? '7px' : '10px' }}>
                                            {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                                        </span>
                                    </div>
                                    <p style={{ color: theme.secondary, fontSize: scale < 1 ? '8px' : '11px', marginBottom: '4px' }}>
                                        {exp.company}{(exp.city || exp.country) && ` • ${[exp.city, exp.country].filter(Boolean).join(', ')}`}
                                    </p>
                                    {exp.description && (
                                        <p style={{ color: theme.text, opacity: 0.8, fontSize: scale < 1 ? '7px' : '11px', lineHeight: 1.4, whiteSpace: 'pre-line' }}>
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
                        <SectionHeader theme={theme} headingFont={headingFont} scale={scale} variant="uppercase">
                            Education
                        </SectionHeader>
                        <div className="space-y-2">
                            {education.map((edu) => (
                                <ResumeEntry key={edu.id}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 style={{ color: theme.text, fontWeight: 600, fontSize: scale < 1 ? '9px' : '13px' }}>
                                            {edu.school}
                                        </h3>
                                        <span style={{ color: theme.text, opacity: 0.6, fontSize: scale < 1 ? '7px' : '10px' }}>
                                            {edu.startDate} – {edu.current ? 'Present' : edu.endDate}
                                        </span>
                                    </div>
                                    <p style={{ color: theme.secondary, fontSize: scale < 1 ? '8px' : '11px' }}>
                                        {edu.degree}
                                        {edu.gpa && <span style={{ marginLeft: '8px', opacity: 0.8 }}>GPA: {edu.gpa}</span>}
                                    </p>
                                    {edu.honors && (
                                        <p style={{ color: theme.text, opacity: 0.7, fontSize: scale < 1 ? '7px' : '10px' }}>
                                            {edu.honors}
                                        </p>
                                    )}
                                    {edu.clubs && (
                                        <p style={{ color: theme.text, opacity: 0.6, fontSize: scale < 1 ? '6px' : '9px' }}>
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
                        <SectionHeader theme={theme} headingFont={headingFont} scale={scale} variant="uppercase">
                            Skills
                        </SectionHeader>
                        <div className="space-y-1">
                            {skills.map((skill) => (
                                <div key={skill.id} className="flex items-center gap-2">
                                    <span style={{ color: theme.text, fontSize: scale < 1 ? '8px' : '11px', minWidth: scale < 1 ? '50px' : '90px' }}>
                                        {skill.name}
                                    </span>
                                    <div
                                        style={{
                                            flex: 1,
                                            height: scale < 1 ? '3px' : '6px',
                                            backgroundColor: `${theme.primary}20`,
                                            borderRadius: '3px',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: `${((skill.level || 3) / 5) * 100}%`,
                                                height: '100%',
                                                backgroundColor: theme.primary,
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Languages */}
                {languages && languages.length > 0 && (
                    <section className="mb-5 resume-section">
                        <SectionHeader theme={theme} headingFont={headingFont} scale={scale} variant="uppercase">
                            Languages
                        </SectionHeader>
                        <div className="space-y-1">
                            {languages.map((lang) => (
                                <div key={lang.id} className="flex items-center gap-2">
                                    <span style={{ color: theme.text, fontSize: scale < 1 ? '8px' : '11px', minWidth: scale < 1 ? '50px' : '90px' }}>
                                        {lang.name}
                                    </span>
                                    <div
                                        style={{
                                            flex: 1,
                                            height: scale < 1 ? '3px' : '6px',
                                            backgroundColor: `${theme.primary}20`,
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
                                    <span style={{ color: theme.text, opacity: 0.6, fontSize: scale < 1 ? '6px' : '9px', textTransform: 'capitalize' }}>
                                        {lang.proficiency}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Strengths */}
                {strengths && strengths.length > 0 && (
                    <section className="mb-5 resume-section">
                        <SectionHeader theme={theme} headingFont={headingFont} scale={scale} variant="uppercase">
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
                        <SectionHeader theme={theme} headingFont={headingFont} scale={scale} variant="uppercase">
                            Certifications
                        </SectionHeader>
                        <div className="space-y-1">
                            {certifications.map((cert) => (
                                <div key={cert.id}>
                                    <span style={{ color: theme.text, fontWeight: 500, fontSize: scale < 1 ? '8px' : '11px' }}>
                                        {cert.name}
                                    </span>
                                    <span style={{ color: theme.text, opacity: 0.6, fontSize: scale < 1 ? '7px' : '10px', marginLeft: '8px' }}>
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
                        <SectionHeader theme={theme} headingFont={headingFont} scale={scale} variant="uppercase">
                            Interests
                        </SectionHeader>
                        <div className="flex flex-wrap gap-1">
                            {interests.map((interest) => (
                                <span
                                    key={interest.id}
                                    style={{
                                        backgroundColor: `${theme.primary}10`,
                                        color: theme.text,
                                        padding: scale < 1 ? '2px 6px' : '4px 10px',
                                        borderRadius: '4px',
                                        fontSize: scale < 1 ? '7px' : '11px',
                                    }}
                                >
                                    {interest.name}
                                </span>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}

// Template metadata for registry
export const headerBoldMeta: TemplateMeta = {
    id: 'header-bold',
    name: 'Bold Header',
    category: 'header',
    thumbnail: '/templates/header-bold.png',
    description: 'Full-width colored header banner',
};

'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getBackgroundStyle, getFontFamily, fontSizes, getImageBorderRadius, formatIdType } from '../../shared/styleHelpers';
import SectionHeader from '../../shared/SectionHeader';
import ResumeEntry from '../../shared/ResumeEntry';

/**
 * Minimal Clean Template
 * Clean, simple, typography-focused layout with minimal styling.
 */
export default function MinimalClean({ data, theme, scale = 1 }: TemplateProps) {
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
            {/* Simple Header */}
            <header className="mb-5">
                <div className="flex items-center gap-3 mb-2">
                    {/* Small Profile Image */}
                    {personalInfo.profileImage && (
                        <img
                            src={personalInfo.profileImage}
                            alt={personalInfo.fullName}
                            className="object-cover"
                            style={{
                                width: scale < 1 ? '32px' : '56px',
                                height: scale < 1 ? '32px' : '56px',
                                borderRadius: getImageBorderRadius(personalInfo.imageShape),
                            }}
                        />
                    )}
                    <div>
                        <h1
                            style={{
                                color: theme.text,
                                fontFamily: headingFont,
                                fontSize: scale < 1 ? '16px' : sizeConfig.heading,
                                fontWeight: 700,
                            }}
                        >
                            {personalInfo.fullName || 'Your Name'}
                        </h1>
                        <p style={{ color: theme.primary, fontSize: scale < 1 ? '10px' : sizeConfig.subheading }}>
                            {personalInfo.jobTitle || 'Job Title'}
                        </p>
                    </div>
                </div>
                <p style={{ color: theme.text, opacity: 0.7, fontSize: scale < 1 ? '8px' : '11px' }}>
                    {[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.nationality].filter(Boolean).join(' • ')}
                </p>
                {personalInfo.idType && personalInfo.idNumber && (
                    <p style={{ color: theme.text, opacity: 0.6, fontSize: scale < 1 ? '7px' : '10px', marginTop: '4px' }}>
                        {formatIdType(personalInfo.idType)}: {personalInfo.idNumber}
                    </p>
                )}
                {/* Thin accent line */}
                <div style={{ height: '1px', backgroundColor: theme.primary, marginTop: '12px' }} />
            </header>

            {/* Summary */}
            {personalInfo.summary && (
                <section className="mb-5 resume-section">
                    <p style={{ color: theme.text, lineHeight: 1.6, fontSize: scale < 1 ? '8px' : '12px' }}>
                        {personalInfo.summary}
                    </p>
                </section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <section className="mb-5 resume-section">
                    <SectionHeader theme={theme} headingFont={headingFont} scale={scale} variant="minimal">
                        Experience
                    </SectionHeader>
                    <div className="space-y-3">
                        {experience.map((exp) => (
                            <ResumeEntry key={exp.id}>
                                <div className="flex justify-between items-baseline">
                                    <span style={{ color: theme.text, fontWeight: 500, fontSize: scale < 1 ? '9px' : '12px' }}>
                                        {exp.title} — {exp.company}
                                    </span>
                                    <span style={{ color: theme.text, opacity: 0.5, fontSize: scale < 1 ? '7px' : '10px' }}>
                                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                                    </span>
                                </div>
                                {exp.description && (
                                    <p style={{ color: theme.text, opacity: 0.7, fontSize: scale < 1 ? '7px' : '11px', marginTop: '2px', whiteSpace: 'pre-line' }}>
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
                    <SectionHeader theme={theme} headingFont={headingFont} scale={scale} variant="minimal">
                        Education
                    </SectionHeader>
                    <div className="space-y-2">
                        {education.map((edu) => (
                            <ResumeEntry key={edu.id}>
                                <div>
                                    <span style={{ color: theme.text, fontSize: scale < 1 ? '9px' : '12px' }}>
                                        {edu.degree}, {edu.school}
                                    </span>
                                    <span style={{ color: theme.text, opacity: 0.5, fontSize: scale < 1 ? '7px' : '10px', marginLeft: '8px' }}>
                                        {edu.startDate} – {edu.current ? 'Present' : edu.endDate}
                                    </span>
                                    {edu.gpa && (
                                        <span style={{ color: theme.primary, fontSize: scale < 1 ? '7px' : '10px', marginLeft: '8px' }}>
                                            GPA: {edu.gpa}
                                        </span>
                                    )}
                                </div>
                                {edu.honors && (
                                    <p style={{ color: theme.text, opacity: 0.6, fontSize: scale < 1 ? '7px' : '10px' }}>
                                        {edu.honors}
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
                    <SectionHeader theme={theme} headingFont={headingFont} scale={scale} variant="minimal">
                        Skills
                    </SectionHeader>
                    <div className="space-y-1">
                        {skills.map((skill) => (
                            <div key={skill.id} className="flex items-center gap-2" data-paginate="item">
                                <span style={{ color: theme.text, fontSize: scale < 1 ? '8px' : '11px', minWidth: scale < 1 ? '50px' : '80px' }}>
                                    {skill.name}
                                </span>
                                <div
                                    style={{
                                        flex: 1,
                                        height: scale < 1 ? '2px' : '4px',
                                        backgroundColor: `${theme.primary}20`,
                                        borderRadius: '2px',
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
                    <SectionHeader theme={theme} headingFont={headingFont} scale={scale} variant="minimal">
                        Languages
                    </SectionHeader>
                    <p style={{ color: theme.text, opacity: 0.8, fontSize: scale < 1 ? '8px' : '11px' }}>
                        {languages.map(l => `${l.name} (${l.proficiency})`).join(', ')}
                    </p>
                </section>
            )}

            {/* Strengths */}
            {strengths && strengths.length > 0 && (
                <section className="mb-5 resume-section">
                    <SectionHeader theme={theme} headingFont={headingFont} scale={scale} variant="minimal">
                        Strengths
                    </SectionHeader>
                    <p style={{ color: theme.text, opacity: 0.8, fontSize: scale < 1 ? '8px' : '11px' }}>
                        {strengths.map(s => s.name).join(', ')}
                    </p>
                </section>
            )}

            {/* Certifications */}
            {certifications && certifications.length > 0 && (
                <section className="mb-5 resume-section">
                    <SectionHeader theme={theme} headingFont={headingFont} scale={scale} variant="minimal">
                        Certifications
                    </SectionHeader>
                    <div className="space-y-1">
                        {certifications.map((cert) => (
                            <p key={cert.id} style={{ color: theme.text, opacity: 0.8, fontSize: scale < 1 ? '8px' : '11px' }} data-paginate="item">
                                {cert.name} — {cert.issuer}, {cert.date}
                            </p>
                        ))}
                    </div>
                </section>
            )}

            {/* Interests */}
            {interests && interests.length > 0 && (
                <section className="resume-section">
                    <SectionHeader theme={theme} headingFont={headingFont} scale={scale} variant="minimal">
                        Interests
                    </SectionHeader>
                    <p style={{ color: theme.text, opacity: 0.8, fontSize: scale < 1 ? '8px' : '11px' }}>
                        {interests.map(i => i.name).join(', ')}
                    </p>
                </section>
            )}
        </div>
    );
}

// Template metadata for registry
export const minimalCleanMeta: TemplateMeta = {
    id: 'minimal-clean',
    name: 'Minimal Clean',
    category: 'minimal',
    thumbnail: '/templates/minimal-clean.png',
    description: 'Clean, typography-focused layout',
};

'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getBackgroundStyle, getFontFamily, fontSizes, getImageBorderRadius, formatIdType } from '../../shared/styleHelpers';
import SectionHeader from '../../shared/SectionHeader';
import ResumeEntry from '../../shared/ResumeEntry';

/**
 * Europass Classic Template
 * Clean single-column layout with blue left accent stripe, inspired by Europass CV format.
 */
export default function EuropassClassic({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, interests, strengths, certifications, background, fonts } = data;
    const bgStyle = getBackgroundStyle(background);
    const headingFont = getFontFamily(fonts?.heading || 'Inter');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Accent stripe width
    const accentWidth = scale < 1 ? '4px' : '6px';

    return (
        <div
            className="w-full h-full relative"
            style={{
                fontFamily: bodyFont,
                fontSize: sizeConfig.base,
                ...bgStyle,
            }}
        >
            {/* Blue Left Accent Stripe */}
            <div
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: accentWidth,
                    backgroundColor: theme.primary,
                }}
            />

            {/* Main Content */}
            <div style={{ paddingLeft: scale < 1 ? '20px' : '50px', paddingRight: scale < 1 ? '16px' : '40px', paddingTop: scale < 1 ? '16px' : '32px', paddingBottom: scale < 1 ? '16px' : '32px' }}>
                {/* Header */}
                <header className="flex gap-4 mb-6" style={{ alignItems: 'flex-start' }}>
                    {/* Profile Photo */}
                    {personalInfo.profileImage && (
                        <div
                            style={{
                                flexShrink: 0,
                                width: scale < 1 ? '60px' : '100px',
                                height: scale < 1 ? '60px' : '100px',
                                borderRadius: '50%',
                                border: `3px solid ${theme.primary}`,
                                overflow: 'hidden',
                            }}
                        >
                            <img
                                src={personalInfo.profileImage}
                                alt={personalInfo.fullName}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    {/* Name & Contact Info */}
                    <div className="flex-1">
                        <h1
                            style={{
                                color: theme.text,
                                fontFamily: headingFont,
                                fontSize: scale < 1 ? '18px' : '28px',
                                fontWeight: 700,
                                marginBottom: scale < 1 ? '4px' : '8px',
                            }}
                        >
                            {personalInfo.fullName || 'Your Name'}
                        </h1>

                        {/* Personal Details Row */}
                        <div style={{ color: theme.text, fontSize: scale < 1 ? '8px' : '12px', marginBottom: '4px' }}>
                            {personalInfo.nationality && (
                                <span><strong>Nationality:</strong> {personalInfo.nationality} </span>
                            )}
                            {personalInfo.idType && personalInfo.idNumber && (
                                <span><strong>{formatIdType(personalInfo.idType)}:</strong> {personalInfo.idNumber} </span>
                            )}
                        </div>

                        {/* Contact Row */}
                        <div style={{ color: theme.text, fontSize: scale < 1 ? '8px' : '12px', marginBottom: '2px' }}>
                            {personalInfo.phone && (
                                <span style={{ marginRight: scale < 1 ? '8px' : '16px' }}>
                                    <span style={{ color: theme.primary }}>📞</span> {personalInfo.phone}
                                </span>
                            )}
                            {personalInfo.email && (
                                <span>
                                    <span style={{ color: theme.primary }}>✉</span> {personalInfo.email}
                                </span>
                            )}
                        </div>

                        {/* Location Row */}
                        {personalInfo.location && (
                            <div style={{ color: theme.text, fontSize: scale < 1 ? '8px' : '12px' }}>
                                <span style={{ color: theme.primary }}>📍</span> {personalInfo.location}
                            </div>
                        )}
                    </div>
                </header>

                {/* About Myself / Summary */}
                {personalInfo.summary && (
                    <section className="mb-5 resume-section">
                        <SectionHeader theme={theme} headingFont={headingFont} scale={scale} variant="underline">
                            About Myself
                        </SectionHeader>
                        <p style={{ color: theme.text, lineHeight: 1.6, fontSize: scale < 1 ? '8px' : '12px' }}>
                            {personalInfo.summary}
                        </p>
                    </section>
                )}

                {/* Work Experience */}
                {experience.length > 0 && (
                    <section className="mb-5 resume-section">
                        <SectionHeader theme={theme} headingFont={headingFont} scale={scale} variant="underline">
                            Work Experience
                        </SectionHeader>
                        <div className="space-y-4">
                            {experience.map((exp) => (
                                <ResumeEntry key={exp.id}>
                                    <h3 style={{ color: theme.text, fontWeight: 700, fontSize: scale < 1 ? '10px' : '13px', marginBottom: '2px' }}>
                                        {exp.title}
                                    </h3>
                                    <p style={{ color: theme.text, fontSize: scale < 1 ? '9px' : '12px', marginBottom: '2px' }}>
                                        <em>{exp.company}</em>
                                        <span style={{ color: theme.text, opacity: 0.7 }}>
                                            {' '}[ {exp.startDate} – {exp.current ? 'Present' : exp.endDate} ]
                                        </span>
                                    </p>
                                    {(exp.city || exp.country) && (
                                        <p style={{ color: theme.text, fontSize: scale < 1 ? '8px' : '11px', marginBottom: '4px' }}>
                                            <strong>City:</strong> {exp.city} | <strong>Country:</strong> {exp.country}
                                        </p>
                                    )}
                                    {exp.description && (
                                        <p style={{ color: theme.text, opacity: 0.85, fontSize: scale < 1 ? '8px' : '11px', lineHeight: 1.5, whiteSpace: 'pre-line' }}>
                                            {exp.description}
                                        </p>
                                    )}
                                </ResumeEntry>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education and Training */}
                {education.length > 0 && (
                    <section className="mb-5 resume-section">
                        <SectionHeader theme={theme} headingFont={headingFont} scale={scale} variant="underline">
                            Education and Training
                        </SectionHeader>
                        <div className="space-y-3">
                            {education.map((edu) => (
                                <ResumeEntry key={edu.id}>
                                    <h3 style={{ color: theme.text, fontWeight: 700, fontSize: scale < 1 ? '10px' : '13px' }}>
                                        {edu.degree}
                                    </h3>
                                    <p style={{ color: theme.text, fontSize: scale < 1 ? '9px' : '12px' }}>
                                        <em>{edu.school}</em>
                                        {(edu.startDate || edu.endDate) && (
                                            <span style={{ opacity: 0.7 }}>
                                                {' '}[ {edu.startDate} – {edu.current ? 'Present' : edu.endDate} ]
                                            </span>
                                        )}
                                    </p>
                                    {edu.gpa && (
                                        <p style={{ color: theme.text, fontSize: scale < 1 ? '8px' : '11px' }}>
                                            GPA: {edu.gpa}
                                        </p>
                                    )}
                                </ResumeEntry>
                            ))}
                        </div>
                    </section>
                )}

                {/* Language Skills */}
                {languages && languages.length > 0 && (
                    <section className="mb-5 resume-section">
                        <SectionHeader theme={theme} headingFont={headingFont} scale={scale} variant="underline">
                            Language Skills
                        </SectionHeader>
                        <div className="space-y-2">
                            {languages.map((lang) => (
                                <div key={lang.id} data-paginate="item" style={{ fontSize: scale < 1 ? '9px' : '12px' }}>
                                    <span style={{ color: theme.text, fontWeight: 600 }}>{lang.name}</span>
                                    <span style={{ color: theme.text, opacity: 0.7, marginLeft: '8px', textTransform: 'capitalize' }}>
                                        ({lang.proficiency})
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills / Digital Skills */}
                {skills.length > 0 && (
                    <section className="mb-5 resume-section">
                        <SectionHeader theme={theme} headingFont={headingFont} scale={scale} variant="underline">
                            Skills
                        </SectionHeader>
                        <p style={{ color: theme.text, fontSize: scale < 1 ? '9px' : '12px' }}>
                            {skills.map(s => s.name).join(' • ')}
                        </p>
                    </section>
                )}

                {/* Certifications */}
                {certifications && certifications.length > 0 && (
                    <section className="mb-5 resume-section">
                        <SectionHeader theme={theme} headingFont={headingFont} scale={scale} variant="underline">
                            Certifications
                        </SectionHeader>
                        <div className="space-y-2">
                            {certifications.map((cert) => (
                                <div key={cert.id} data-paginate="item" style={{ fontSize: scale < 1 ? '9px' : '12px' }}>
                                    <span style={{ color: theme.text, fontWeight: 600 }}>{cert.name}</span>
                                    <span style={{ color: theme.text, opacity: 0.7, marginLeft: '8px' }}>
                                        — {cert.issuer}, {cert.date}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Strengths */}
                {strengths && strengths.length > 0 && (
                    <section className="mb-5 resume-section">
                        <SectionHeader theme={theme} headingFont={headingFont} scale={scale} variant="underline">
                            Strengths
                        </SectionHeader>
                        <p style={{ color: theme.text, fontSize: scale < 1 ? '9px' : '12px' }}>
                            {strengths.map(s => s.name).join(' • ')}
                        </p>
                    </section>
                )}

                {/* Interests */}
                {interests && interests.length > 0 && (
                    <section className="resume-section">
                        <SectionHeader theme={theme} headingFont={headingFont} scale={scale} variant="underline">
                            Interests
                        </SectionHeader>
                        <p style={{ color: theme.text, fontSize: scale < 1 ? '9px' : '12px' }}>
                            {interests.map(i => i.name).join(' • ')}
                        </p>
                    </section>
                )}
            </div>
        </div>
    );
}

// Template metadata for registry
export const europassClassicMeta: TemplateMeta = {
    id: 'europass-classic',
    name: 'Europass Classic',
    category: 'classic',
    thumbnail: '/templates/europass-classic.png',
    description: 'Clean Europass-style layout with blue accent stripe',
};

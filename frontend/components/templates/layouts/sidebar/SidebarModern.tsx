'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getBackgroundStyle, getFontFamily, fontSizes, getImageBorderRadius, formatIdType } from '../../shared/styleHelpers';
import SectionHeader from '../../shared/SectionHeader';
import ResumeEntry from '../../shared/ResumeEntry';

/**
 * Sidebar Modern Template
 * Two-column layout with colored sidebar containing contact and skills.
 * Uses flexbox for proper multi-page pagination support.
 */
export default function SidebarModern({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, interests, strengths, certifications, background, fonts } = data;
    const bgStyle = getBackgroundStyle(background);
    const headingFont = getFontFamily(fonts?.heading || 'Inter');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    const sidebarWidth = scale < 1 ? '38%' : '35%';

    return (
        <div
            className="w-full"
            style={{
                display: 'flex',
                fontFamily: bodyFont,
                fontSize: sizeConfig.base,
                minHeight: '297mm',
            }}
        >
            {/* Sidebar - flexbox stretch will extend with main content */}
            <aside
                style={{
                    width: sidebarWidth,
                    flexShrink: 0,
                    backgroundColor: theme.primary,
                    padding: scale < 1 ? '12px' : '24px',
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
                                width: scale < 1 ? '50px' : '100px',
                                height: scale < 1 ? '50px' : '100px',
                                borderRadius: getImageBorderRadius(personalInfo.imageShape),
                            }}
                        />
                    </div>
                )}

                {/* Name & Job Title in Sidebar */}
                <div className="text-center mb-4">
                    <h1
                        style={{
                            fontFamily: headingFont,
                            fontSize: scale < 1 ? '12px' : '18px',
                            fontWeight: 700,
                            marginBottom: '2px',
                            lineHeight: 1.2,
                        }}
                    >
                        {personalInfo.fullName || 'Your Name'}
                    </h1>
                    <p style={{ fontSize: scale < 1 ? '8px' : '12px', opacity: 0.9 }}>
                        {personalInfo.jobTitle || 'Job Title'}
                    </p>
                </div>

                {/* Contact Info */}
                <div className="mb-4" style={{ fontSize: scale < 1 ? '7px' : '11px' }}>
                    <h3
                        style={{
                            fontFamily: headingFont,
                            fontSize: scale < 1 ? '9px' : '12px',
                            fontWeight: 700,
                            marginBottom: '8px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                        }}
                    >
                        Contact
                    </h3>
                    {personalInfo.email && <p className="mb-1 break-all">{personalInfo.email}</p>}
                    {personalInfo.phone && <p className="mb-1">{personalInfo.phone}</p>}
                    {personalInfo.location && <p className="mb-1">{personalInfo.location}</p>}
                    {personalInfo.nationality && <p className="mb-1">{personalInfo.nationality}</p>}
                    {personalInfo.website && <p className="mb-1 break-all">{personalInfo.website}</p>}
                    {personalInfo.linkedin && <p className="mb-1 break-all">{personalInfo.linkedin}</p>}
                    {personalInfo.idType && personalInfo.idNumber && (
                        <p className="mt-2 opacity-80">
                            {formatIdType(personalInfo.idType)}: {personalInfo.idNumber}
                        </p>
                    )}
                </div>

                {/* Skills in Sidebar */}
                {skills.length > 0 && (
                    <div className="mb-4">
                        <h3
                            style={{
                                fontFamily: headingFont,
                                fontSize: scale < 1 ? '9px' : '12px',
                                fontWeight: 700,
                                marginBottom: '8px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                            }}
                        >
                            Skills
                        </h3>
                        <div className="space-y-1" style={{ fontSize: scale < 1 ? '7px' : '10px' }}>
                            {skills.map((skill) => (
                                <div key={skill.id} className="flex items-center gap-1" data-paginate="item">
                                    <span className="flex-1">{skill.name}</span>
                                    <div className="flex gap-0.5">
                                        {[1, 2, 3, 4, 5].map((dot) => (
                                            <div
                                                key={dot}
                                                style={{
                                                    width: scale < 1 ? '3px' : '5px',
                                                    height: scale < 1 ? '3px' : '5px',
                                                    borderRadius: '50%',
                                                    backgroundColor: dot <= (skill.level || 3) ? '#ffffff' : 'rgba(255,255,255,0.3)',
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Languages in Sidebar */}
                {languages && languages.length > 0 && (
                    <div className="mb-4">
                        <h3
                            style={{
                                fontFamily: headingFont,
                                fontSize: scale < 1 ? '9px' : '12px',
                                fontWeight: 700,
                                marginBottom: '8px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                            }}
                        >
                            Languages
                        </h3>
                        <div className="space-y-1" style={{ fontSize: scale < 1 ? '7px' : '10px' }}>
                            {languages.map((lang) => (
                                <div key={lang.id} className="flex justify-between items-center" data-paginate="item">
                                    <span>{lang.name}</span>
                                    <span className="opacity-70 capitalize">{lang.proficiency}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Interests in Sidebar */}
                {interests && interests.length > 0 && (
                    <div>
                        <h3
                            style={{
                                fontFamily: headingFont,
                                fontSize: scale < 1 ? '9px' : '12px',
                                fontWeight: 700,
                                marginBottom: '8px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                            }}
                        >
                            Interests
                        </h3>
                        <div className="flex flex-wrap gap-1" style={{ fontSize: scale < 1 ? '6px' : '10px' }}>
                            {interests.map((interest) => (
                                <span
                                    key={interest.id}
                                    style={{
                                        backgroundColor: 'rgba(255,255,255,0.15)',
                                        padding: scale < 1 ? '2px 4px' : '3px 6px',
                                        borderRadius: '3px',
                                    }}
                                >
                                    {interest.name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </aside>

            {/* Main Content - flex: 1 fills remaining width */}
            <main style={{ flex: 1, padding: scale < 1 ? '16px 12px 12px 12px' : '32px 24px 24px 24px', ...bgStyle }}>
                {/* Summary */}
                {personalInfo.summary && (
                    <section className="mb-4 resume-section">
                        <p style={{ color: theme.text, lineHeight: 1.5, fontSize: scale < 1 ? '8px' : '12px' }}>
                            {personalInfo.summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <section className="mb-4 resume-section">
                        <SectionHeader
                            theme={theme}
                            headingFont={headingFont}
                            scale={scale}
                            variant="uppercase"
                            style={{ color: theme.text }}
                        >
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
                                    <p style={{ color: theme.primary, fontSize: scale < 1 ? '8px' : '11px', marginBottom: '4px' }}>
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
                    <section className="mb-4 resume-section">
                        <SectionHeader
                            theme={theme}
                            headingFont={headingFont}
                            scale={scale}
                            variant="uppercase"
                            style={{ color: theme.text }}
                        >
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
                                    <p style={{ color: theme.primary, fontSize: scale < 1 ? '8px' : '11px' }}>
                                        {edu.degree}
                                        {edu.gpa && <span style={{ marginLeft: '8px', opacity: 0.8 }}>GPA: {edu.gpa}</span>}
                                    </p>
                                    {edu.honors && (
                                        <p style={{ color: theme.text, opacity: 0.7, fontSize: scale < 1 ? '7px' : '10px' }}>
                                            {edu.honors}
                                        </p>
                                    )}
                                </ResumeEntry>
                            ))}
                        </div>
                    </section>
                )}

                {/* Strengths */}
                {strengths && strengths.length > 0 && (
                    <section className="mb-4 resume-section">
                        <SectionHeader
                            theme={theme}
                            headingFont={headingFont}
                            scale={scale}
                            variant="uppercase"
                            style={{ color: theme.text }}
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
                    <section className="resume-section">
                        <SectionHeader
                            theme={theme}
                            headingFont={headingFont}
                            scale={scale}
                            variant="uppercase"
                            style={{ color: theme.text }}
                        >
                            Certifications
                        </SectionHeader>
                        <div className="space-y-2">
                            {certifications.map((cert) => (
                                <div key={cert.id} data-paginate="item">
                                    <p style={{ color: theme.text, fontWeight: 500, fontSize: scale < 1 ? '8px' : '12px' }}>
                                        {cert.name}
                                    </p>
                                    <p style={{ color: theme.text, opacity: 0.7, fontSize: scale < 1 ? '7px' : '10px' }}>
                                        {cert.issuer} • {cert.date}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}

// Template metadata for registry
export const sidebarModernMeta: TemplateMeta = {
    id: 'sidebar-modern',
    name: 'Modern Sidebar',
    category: 'sidebar',
    thumbnail: '/templates/sidebar-modern.png',
    description: 'Two-column layout with colored sidebar',
};

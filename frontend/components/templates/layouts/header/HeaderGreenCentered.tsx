'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';

/**
 * Header Green Centered Template
 * Ribbon-style header with timeline layout.
 *
 * Layout:
 * - Green "Ribbon" Banner strip.
 * - Photo: Large Circle, Overlaps header, Positioned Center-Left.
 * - Name: White text, Right of photo, inside/on ribbon.
 * - Body: Single Column flow with "Timeline" visual (Left Date / Right Content).
 * - Strengths: Solid Green Pills.
 *
 * Matches reference: frontend/Resume-template/unique-layouts/17-circle-photo-center.webp
 */
export default function HeaderGreenCentered({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, strengths, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Inter');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes
    const fs = getScaledFontSizes(sizeConfig, scale);

    // Colors
    const ribbonColor = customThemeColor || '#4b6858'; // Muted Forest Green
    const textColor = '#374151'; // Gray-700
    const lightGray = '#f3f4f6'; // Gray-100

    // Dimensions
    const bannerHeight = scale < 1 ? 60 : 120;
    const photoSize = scale < 1 ? 80 : 160;
    const timelineWidth = '20%';

    return (
        <div
            className="w-full h-full"
            style={{
                fontFamily: bodyFont,
                fontSize: sizeConfig.base,
                backgroundColor: '#ffffff',
                color: textColor,
                position: 'relative',
            }}
        >
            {/* Ribbon Header */}
            <header
                style={{
                    height: bannerHeight,
                    backgroundColor: ribbonColor,
                    position: 'relative',
                    marginBottom: scale < 1 ? 40 : 80, // Space for overlapping photo
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: scale < 1 ? '120px' : '220px', // Space for photo
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
            >
                {/* Ribbon End Effect (Left) - Simulation */}
                <div
                    style={{
                        position: 'absolute',
                        left: -10,
                        top: 10,
                        bottom: 10,
                        width: 10,
                        backgroundColor: '#2f4339', // Darker shade
                        clipPath: 'polygon(100% 0, 0 50%, 100% 100%)',
                    }}
                />

                <div style={{ color: '#ffffff' }}>
                    <h1
                        style={{
                            fontFamily: headingFont,
                            fontSize: fs.name,
                            fontWeight: 600,
                            lineHeight: 1.1,
                            marginBottom: 4,
                        }}
                    >
                        {personalInfo.fullName || 'Your Name'}
                    </h1>
                    <p
                        style={{
                            fontSize: fs.jobTitle,
                            opacity: 0.9,
                            fontWeight: 400,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                        }}
                    >
                        {personalInfo.jobTitle || 'Job Title'}
                    </p>
                </div>

                {/* Photo - Overlapping Cluster */}
                {personalInfo.profileImage && (
                    <div
                        style={{
                            position: 'absolute',
                            left: scale < 1 ? 20 : 40,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: photoSize,
                            height: photoSize,
                            borderRadius: '50%',
                            backgroundColor: '#ffffff',
                            padding: scale < 1 ? 4 : 8,
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <img
                            src={personalInfo.profileImage}
                            alt={personalInfo.fullName}
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                                objectFit: 'cover',
                            }}
                        />
                    </div>
                )}
            </header>

            {/* Contact Bar - Below Header */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: scale < 1 ? 15 : 30,
                    fontSize: fs.small,
                    color: '#4b5563',
                    marginBottom: scale < 1 ? 20 : 40,
                    borderBottom: `1px solid ${lightGray}`,
                    paddingBottom: scale < 1 ? 15 : 30,
                    marginLeft: scale < 1 ? 20 : 40,
                    marginRight: scale < 1 ? 20 : 40,
                    flexWrap: 'wrap',
                }}
            >
                {personalInfo.email && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        ✉️ {personalInfo.email}
                    </span>
                )}
                {personalInfo.phone && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        📱 {personalInfo.phone}
                    </span>
                )}
                {personalInfo.location && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        📍 {personalInfo.location}
                    </span>
                )}
            </div>

            {/* Main Content Body */}
            <div style={{ padding: scale < 1 ? '0 20px 20px' : '0 40px 40px' }}>

                {/* Profile */}
                {personalInfo.summary && (
                    <section className="mb-8" style={{ display: 'flex' }}>
                        <div style={{ width: timelineWidth }}>
                            <h3 style={{ fontFamily: headingFont, fontSize: fs.sectionHeading, color: ribbonColor, fontWeight: 700, textTransform: 'uppercase' }}>
                                Profile
                            </h3>
                        </div>
                        <div style={{ flex: 1, paddingLeft: 20, borderLeft: `2px solid ${lightGray}` }}>
                            <p style={{ lineHeight: 1.6, fontSize: fs.body }}>{personalInfo.summary}</p>
                        </div>
                    </section>
                )}

                {/* Experience - Timeline */}
                {experience.length > 0 && (
                    <section className="mb-8">
                        <div style={{ marginBottom: 15 }}>
                            <h3 style={{ fontFamily: headingFont, fontSize: fs.sectionHeading, color: ribbonColor, fontWeight: 700, textTransform: 'uppercase' }}>
                                Experience
                            </h3>
                        </div>
                        <div className="space-y-6">
                            {experience.map((exp) => (
                                <div key={exp.id} style={{ display: 'flex' }}>
                                    {/* Left: Date */}
                                    <div style={{ width: timelineWidth, textAlign: 'right', paddingRight: 20, fontSize: fs.small, color: '#6b7280', paddingTop: 4 }}>
                                        <div style={{ fontWeight: 600 }}>{exp.startDate}</div>
                                        <div>{exp.endDate || 'Present'}</div>
                                    </div>

                                    {/* Right: Content */}
                                    <div style={{ flex: 1, paddingLeft: 20, borderLeft: `2px solid ${lightGray}`, paddingBottom: 20 }}>
                                        <h4 style={{ fontSize: fs.entryTitle, fontWeight: 700, color: '#1f2937' }}>
                                            {exp.title}
                                        </h4>
                                        <p style={{ color: ribbonColor, fontWeight: 600, fontSize: fs.small, marginBottom: 8 }}>
                                            {exp.company}, {exp.city}
                                        </p>
                                        <p style={{ fontSize: fs.body, lineHeight: 1.5, color: '#4b5563' }}>
                                            {exp.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education - Timeline */}
                {education.length > 0 && (
                    <section className="mb-8">
                        <div style={{ marginBottom: 15 }}>
                            <h3 style={{ fontFamily: headingFont, fontSize: fs.sectionHeading, color: ribbonColor, fontWeight: 700, textTransform: 'uppercase' }}>
                                Education
                            </h3>
                        </div>
                        <div className="space-y-6">
                            {education.map((edu) => (
                                <div key={edu.id} style={{ display: 'flex' }}>
                                    {/* Left: Date */}
                                    <div style={{ width: timelineWidth, textAlign: 'right', paddingRight: 20, fontSize: fs.small, color: '#6b7280', paddingTop: 4 }}>
                                        <div style={{ fontWeight: 600 }}>{edu.startDate}</div>
                                        <div>{edu.endDate || 'Present'}</div>
                                    </div>

                                    {/* Right: Content */}
                                    <div style={{ flex: 1, paddingLeft: 20, borderLeft: `2px solid ${lightGray}`, paddingBottom: 20 }}>
                                        <h4 style={{ fontSize: fs.entryTitle, fontWeight: 700, color: '#1f2937' }}>
                                            {edu.degree}
                                        </h4>
                                        <p style={{ color: ribbonColor, fontWeight: 600, fontSize: fs.small }}>
                                            {edu.school}, {edu.city}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills & Strengths - Two Columns */}
                <div style={{ display: 'flex', gap: 40 }}>
                    {/* Strengths Pills */}
                    {strengths && strengths.length > 0 && (
                        <div style={{ flex: 1 }}>
                            <h3 style={{ fontFamily: headingFont, fontSize: fs.sectionHeading, color: ribbonColor, fontWeight: 700, textTransform: 'uppercase', marginBottom: 15 }}>
                                Strengths
                            </h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                {strengths.map((str) => (
                                    <span
                                        key={str.id}
                                        data-paginate="item"
                                        style={{
                                            backgroundColor: ribbonColor,
                                            color: '#ffffff',
                                            padding: scale < 1 ? '4px 10px' : '8px 16px',
                                            borderRadius: 999,
                                            fontSize: fs.small,
                                            fontWeight: 500,
                                        }}
                                    >
                                        {str.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Skills List */}
                    {skills.length > 0 && (
                        <div style={{ flex: 1 }}>
                            <h3 style={{ fontFamily: headingFont, fontSize: fs.sectionHeading, color: ribbonColor, fontWeight: 700, textTransform: 'uppercase', marginBottom: 15 }}>
                                Skills
                            </h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px' }}>
                                {skills.map((skill) => (
                                    <div key={skill.id} data-paginate="item" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: fs.body }}>
                                        <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: ribbonColor }} />
                                        {skill.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Template metadata
export const headerGreenCenteredMeta: TemplateMeta = {
    id: 'header-green-centered',
    name: 'Green Centered',
    category: 'header',
    thumbnail: '/templates/header-green-centered.png',
    description: 'Elegant ribbon header with timeline layout',
};

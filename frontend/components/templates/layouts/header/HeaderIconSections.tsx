'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';
import ProgressBar from '../../shared/ProgressBar';

/**
 * Header Icon Sections Template
 * Photo on left with name/summary on right. Labels-left layout with orange icon circles.
 * Skills and Languages displayed as 3-column progress bars.
 *
 * Layout:
 * - Header: Photo left, Name + Summary right
 * - Body: Labels-left sections (Personal info, Work Experience, Education, Skills, Strengths, Awards)
 * - Skills/Languages: 3-column progress bars
 * - Strengths: Hashtag-style tags
 *
 * Matches reference: frontend/Resume-template/unique-layouts/27-icon-section-headers.webp
 */
export default function HeaderIconSections({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, strengths, awards, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Inter');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes that respect user's size preference + scale
    const fs = getScaledFontSizes(sizeConfig, scale);

    // Single color preset - use customThemeColor or default orange
    const accentColor = customThemeColor || '#ea580c';

    // Calculate responsive sizes
    const photoSize = scale < 1 ? 60 : 120;
    const labelWidth = scale < 1 ? 80 : 140;

    return (
        <div
            className="w-full h-full"
            style={{
                fontFamily: bodyFont,
                fontSize: sizeConfig.base,
                backgroundColor: '#ffffff',
            }}
        >
            {/* Header Area - Photo Left, Name/Summary Right */}
            <header
                className="resume-section"
                data-paginate
                style={{
                    display: 'flex',
                    gap: scale < 1 ? 12 : 24,
                    padding: scale < 1 ? 16 : 32,
                    alignItems: 'flex-start',
                }}
            >
                {/* Photo */}
                <div>
                    {personalInfo.profileImage ? (
                        <img
                            src={personalInfo.profileImage}
                            alt={personalInfo.fullName}
                            style={{
                                width: photoSize,
                                height: photoSize,
                                objectFit: 'cover',
                                borderRadius: scale < 1 ? 4 : 8,
                            }}
                        />
                    ) : (
                        <div
                            style={{
                                width: photoSize,
                                height: photoSize,
                                backgroundColor: '#e5e7eb',
                                borderRadius: scale < 1 ? 4 : 8,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: fs.name,
                                color: '#9ca3af',
                            }}
                        >
                            {personalInfo.fullName?.charAt(0) || '?'}
                        </div>
                    )}
                </div>

                {/* Name and Summary */}
                <div style={{ flex: 1 }}>
                    <h1
                        style={{
                            fontFamily: headingFont,
                            fontSize: fs.name,
                            fontWeight: 700,
                            color: '#1f2937',
                            marginBottom: scale < 1 ? 8 : 16,
                        }}
                    >
                        {personalInfo.fullName || 'Your Name'}
                    </h1>
                    {personalInfo.summary && (
                        <p style={{ color: '#4b5563', lineHeight: 1.6, fontSize: fs.body }}>
                            {personalInfo.summary}
                        </p>
                    )}
                </div>
            </header>

            {/* Main Content - Labels Left Layout */}
            <div style={{ padding: scale < 1 ? '0 16px 16px' : '0 32px 32px' }}>
                {/* Personal Info Section */}
                <Section
                    label="Personal info"
                    icon="👤"
                    accentColor={accentColor}
                    fs={fs}
                    headingFont={headingFont}
                    labelWidth={labelWidth}
                    scale={scale}
                >
                    <div style={{ fontSize: fs.body, color: '#374151' }}>
                        <span><strong>Address:</strong> {personalInfo.location || 'Your Location'}</span>
                        {personalInfo.phone && (
                            <span style={{ marginLeft: scale < 1 ? 8 : 16 }}>
                                <span style={{ color: accentColor, marginRight: 4 }}>●</span>
                                <strong>Phone number:</strong> {personalInfo.phone}
                            </span>
                        )}
                        {personalInfo.email && (
                            <div style={{ marginTop: scale < 1 ? 2 : 4 }}>
                                <strong>Email address:</strong> {personalInfo.email}
                            </div>
                        )}
                    </div>
                </Section>

                {/* Work Experience */}
                {experience.length > 0 && (
                    <Section
                        label="Work experience"
                        icon="💼"
                        accentColor={accentColor}
                        fs={fs}
                        headingFont={headingFont}
                        labelWidth={labelWidth}
                        scale={scale}
                    >
                        <div className="space-y-4">
                            {experience.map((exp) => (
                                <div key={exp.id} className="resume-entry" data-paginate>
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#1f2937', marginBottom: '2px' }}>
                                        {exp.title}
                                    </h4>
                                    <p style={{ fontSize: fs.body, color: '#4b5563', fontWeight: 600, marginBottom: '2px' }}>
                                        {exp.company}
                                    </p>
                                    <p style={{ fontSize: fs.small, color: '#6b7280', marginBottom: '4px' }}>
                                        • {exp.startDate} – {exp.current ? 'present' : exp.endDate}
                                        {exp.city && ` • ${exp.city.toUpperCase()}`}
                                    </p>
                                    {exp.description && (
                                        <ul style={{ paddingLeft: scale < 1 ? '10px' : '14px', margin: 0, listStyle: 'disc' }}>
                                            {exp.description.split('\n').filter(Boolean).map((line, idx) => (
                                                <li key={idx} style={{ fontSize: fs.small, color: '#4b5563', marginBottom: '2px', lineHeight: 1.5 }}>
                                                    {line.replace(/^[-•]\s*/, '')}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </Section>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <Section
                        label="Education"
                        icon="🎓"
                        accentColor={accentColor}
                        fs={fs}
                        headingFont={headingFont}
                        labelWidth={labelWidth}
                        scale={scale}
                    >
                        <div className="space-y-3">
                            {education.map((edu) => (
                                <div key={edu.id} className="resume-entry" data-paginate>
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#1f2937', marginBottom: '2px' }}>
                                        {edu.degree}
                                    </h4>
                                    <p style={{ fontSize: fs.body, color: '#4b5563', fontWeight: 600, marginBottom: '2px' }}>
                                        {edu.school}
                                    </p>
                                    <p style={{ fontSize: fs.small, color: '#6b7280', marginBottom: '2px' }}>
                                        • {edu.startDate} – {edu.current ? 'present' : edu.endDate}
                                        {edu.city && ` • ${edu.city.toUpperCase()}`}
                                    </p>
                                    {edu.description && (
                                        <p style={{ fontSize: fs.small, color: '#4b5563' }}>
                                            {edu.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </Section>
                )}

                {/* Skills - 3 Column Progress Bars */}
                {skills.length > 0 && (
                    <Section
                        label="Skills"
                        icon="⚙️"
                        accentColor={accentColor}
                        fs={fs}
                        headingFont={headingFont}
                        labelWidth={labelWidth}
                        scale={scale}
                    >
                        <div>
                            <p style={{ fontSize: fs.tiny, color: '#6b7280', marginBottom: scale < 1 ? 4 : 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                – SOFTWARE
                            </p>
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(3, 1fr)',
                                    gap: scale < 1 ? '6px 12px' : '10px 24px',
                                }}
                            >
                                {skills.map((skill) => (
                                    <div key={skill.id}>
                                        <div style={{ fontSize: fs.small, color: '#374151', marginBottom: '2px' }}>
                                            {skill.name}
                                        </div>
                                        <ProgressBar
                                            value={skill.level * 20}
                                            color={accentColor}
                                            height={scale < 1 ? 4 : 6}
                                            scale={1}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Languages as separate sub-section */}
                        {languages && languages.length > 0 && (
                            <div style={{ marginTop: scale < 1 ? 10 : 20 }}>
                                <p style={{ fontSize: fs.tiny, color: '#6b7280', marginBottom: scale < 1 ? 4 : 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    – LANGUAGES
                                </p>
                                <div
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(3, 1fr)',
                                        gap: scale < 1 ? '6px 12px' : '10px 24px',
                                    }}
                                >
                                    {languages.map((lang) => (
                                        <div key={lang.id}>
                                            <div style={{ fontSize: fs.small, color: '#374151', marginBottom: '2px' }}>
                                                {lang.name}
                                            </div>
                                            <ProgressBar
                                                value={getProficiencyLevel(lang.proficiency)}
                                                color={accentColor}
                                                height={scale < 1 ? 4 : 6}
                                                scale={1}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </Section>
                )}

                {/* Strengths - Hashtag Style */}
                {strengths && strengths.length > 0 && (
                    <Section
                        label="Strengths"
                        icon="⭐"
                        accentColor={accentColor}
                        fs={fs}
                        headingFont={headingFont}
                        labelWidth={labelWidth}
                        scale={scale}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: scale < 1 ? '8px' : '16px',
                            }}
                        >
                            {strengths.map((strength) => (
                                <span
                                    key={strength.id}
                                    style={{
                                        fontSize: fs.body,
                                        color: '#374151',
                                    }}
                                >
                                    # {strength.name}
                                </span>
                            ))}
                        </div>
                    </Section>
                )}

                {/* Awards */}
                {awards && awards.length > 0 && (
                    <Section
                        label="Awards"
                        icon="🏆"
                        accentColor={accentColor}
                        fs={fs}
                        headingFont={headingFont}
                        labelWidth={labelWidth}
                        scale={scale}
                    >
                        <div className="space-y-3">
                            {awards.map((award) => (
                                <div key={award.id} className="resume-entry" data-paginate>
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#1f2937', marginBottom: '2px' }}>
                                        {award.title}
                                    </h4>
                                    <p style={{ fontSize: fs.body, color: '#4b5563', fontWeight: 600, marginBottom: '2px' }}>
                                        {award.issuer}
                                    </p>
                                    <p style={{ fontSize: fs.small, color: '#6b7280', marginBottom: '2px' }}>
                                        {award.date}
                                    </p>
                                    {award.description && (
                                        <p style={{ fontSize: fs.small, color: '#4b5563' }}>
                                            {award.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </Section>
                )}
            </div>
        </div>
    );
}

// Section Component with Icon Label on Left
interface SectionProps {
    label: string;
    icon: string;
    accentColor: string;
    fs: ScaledFontSizes;
    headingFont: string;
    labelWidth: number;
    scale: number;
    children: React.ReactNode;
}

function Section({ label, icon, accentColor, fs, headingFont, labelWidth, scale, children }: SectionProps) {
    const basePx = parseInt(fs.body);
    const isSmall = basePx < 10;
    const iconSize = isSmall ? 16 : 24;

    return (
        <div
            className="resume-section"
            data-paginate
            style={{
                display: 'flex',
                gap: scale < 1 ? 8 : 16,
                borderTop: '1px solid #e5e7eb',
                paddingTop: scale < 1 ? 10 : 20,
                paddingBottom: scale < 1 ? 10 : 20,
            }}
        >
            {/* Label Column */}
            <div
                style={{
                    width: labelWidth,
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: isSmall ? 4 : 8,
                }}
            >
                <span
                    style={{
                        backgroundColor: accentColor,
                        color: '#ffffff',
                        width: iconSize,
                        height: iconSize,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: isSmall ? '8px' : '12px',
                        flexShrink: 0,
                    }}
                >
                    {icon}
                </span>
                <span
                    style={{
                        fontFamily: headingFont,
                        fontSize: fs.sectionHeading,
                        fontWeight: 600,
                        color: accentColor,
                    }}
                >
                    {label}
                </span>
            </div>

            {/* Content Column */}
            <div style={{ flex: 1 }}>
                {children}
            </div>
        </div>
    );
}

// Convert proficiency string to percentage
function getProficiencyLevel(proficiency: string): number {
    const levels: Record<string, number> = {
        'native': 100,
        'fluent': 95,
        'advanced': 85,
        'intermediate': 70,
        'basic': 50,
        'beginner': 30,
    };
    return levels[proficiency.toLowerCase()] || 70;
}

// Template metadata for registry
export const headerIconSectionsMeta: TemplateMeta = {
    id: 'header-icon-sections',
    name: 'Icon Sections',
    category: 'header',
    thumbnail: '/templates/header-icon-sections.png',
    description: 'Professional template with icon section headers and 3-column skills',
};

'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';
import CircularProgress from '../../shared/CircularProgress';

/**
 * Header Decorative Template
 * Features a decorative wave/scallop pattern at the top with centered name.
 * Two-column body with experience on left, skills/languages/strengths on right.
 *
 * Layout:
 * - Decorative pattern header with wave/scallop design
 * - Centered name below pattern
 * - Summary text below name
 * - Two-column body: Left (Experience, Education), Right (Education cont., Languages, Strengths, Interests)
 *
 * Matches reference: frontend/Resume-template/unique-layouts/16-decorative-pattern.webp
 */
export default function HeaderDecorative({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, strengths, interests, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Inter');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes that respect user's size preference + scale
    const fs = getScaledFontSizes(sizeConfig, scale);

    // Single color preset - use customThemeColor or default pink
    const accentColor = customThemeColor || '#ec4899';

    // Calculate responsive sizes
    const patternHeight = scale < 1 ? 40 : 80;

    return (
        <div
            className="w-full h-full"
            style={{
                fontFamily: bodyFont,
                fontSize: sizeConfig.base,
                backgroundColor: '#fffbeb', // Light cream/yellow background
            }}
        >
            {/* Decorative Wave Pattern Header */}
            <div
                style={{
                    height: patternHeight,
                    backgroundColor: '#fffbeb',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 800 80"
                    preserveAspectRatio="none"
                    style={{ position: 'absolute', top: 0, left: 0 }}
                >
                    {/* Multiple rows of decorative scallops/waves */}
                    {[0, 15, 30, 45, 60].map((yOffset, rowIndex) => (
                        <g key={rowIndex}>
                            {[...Array(20)].map((_, i) => (
                                <path
                                    key={i}
                                    d={`M${i * 50 - 25 + (rowIndex % 2) * 25} ${yOffset + 20}
                                        Q${i * 50 + (rowIndex % 2) * 25} ${yOffset},
                                        ${i * 50 + 25 + (rowIndex % 2) * 25} ${yOffset + 20}`}
                                    fill="none"
                                    stroke={accentColor}
                                    strokeWidth="1"
                                    opacity={0.3 + rowIndex * 0.1}
                                />
                            ))}
                        </g>
                    ))}
                </svg>
            </div>

            {/* Centered Name */}
            <header
                className="resume-section"
                data-paginate
                style={{
                    textAlign: 'center',
                    padding: scale < 1 ? '12px' : '24px',
                    paddingTop: 0,
                }}
            >
                <h1
                    style={{
                        fontFamily: headingFont,
                        fontSize: fs.name,
                        fontWeight: 400,
                        color: '#1f2937',
                        letterSpacing: '0.05em',
                        marginBottom: scale < 1 ? '8px' : '16px',
                    }}
                >
                    {personalInfo.fullName || 'Your Name'}
                </h1>

                {/* Summary below name */}
                {personalInfo.summary && (
                    <p
                        style={{
                            fontSize: fs.body,
                            color: '#4b5563',
                            lineHeight: 1.6,
                            maxWidth: '90%',
                            margin: '0 auto',
                        }}
                    >
                        {personalInfo.summary}
                    </p>
                )}
            </header>

            {/* Two-Column Body */}
            <div
                style={{
                    display: 'flex',
                    padding: scale < 1 ? '8px 12px' : '16px 24px',
                    gap: scale < 1 ? '12px' : '24px',
                }}
            >
                {/* LEFT COLUMN - Experience, Education */}
                <div style={{ width: '55%' }}>
                    {/* Work Experience */}
                    {experience.length > 0 && (
                        <section className="mb-4 resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor}>
                                Work experience
                            </SectionHeader>
                            <div className="space-y-3">
                                {experience.map((exp) => (
                                    <div key={exp.id} className="resume-entry" data-paginate>
                                        <p style={{ fontSize: fs.small, color: accentColor, marginBottom: '2px' }}>
                                            ● {exp.startDate} – {exp.current ? 'PRESENT' : exp.endDate}
                                            {exp.city && ` ● ${exp.city.toUpperCase()}`}
                                        </p>
                                        <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#1f2937', marginBottom: '2px' }}>
                                            {exp.title}
                                        </h4>
                                        <p style={{ fontSize: fs.body, color: accentColor, fontWeight: 600, marginBottom: '4px' }}>
                                            {exp.company}
                                        </p>
                                        {exp.description && (
                                            <ul style={{ paddingLeft: scale < 1 ? '12px' : '16px', margin: 0, listStyle: 'disc' }}>
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
                        </section>
                    )}

                    {/* Education */}
                    {education.length > 0 && (
                        <section className="mb-4 resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor}>
                                Education
                            </SectionHeader>
                            <div className="space-y-3">
                                {education.slice(0, 2).map((edu) => (
                                    <div key={edu.id} className="resume-entry" data-paginate>
                                        <p style={{ fontSize: fs.small, color: accentColor, marginBottom: '2px' }}>
                                            ● {edu.startDate} – {edu.current ? 'PRESENT' : edu.endDate}
                                            {edu.city && ` ● ${edu.city.toUpperCase()}`}
                                        </p>
                                        <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#1f2937', marginBottom: '2px' }}>
                                            {edu.degree}
                                        </h4>
                                        <p style={{ fontSize: fs.body, color: accentColor, fontWeight: 600 }}>
                                            {edu.school}
                                        </p>
                                        {edu.description && (
                                            <p style={{ fontSize: fs.small, color: '#6b7280', marginTop: '4px' }}>
                                                {edu.description}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* RIGHT COLUMN - Education cont., Languages, Strengths, Interests */}
                <div style={{ width: '45%' }}>
                    {/* Additional Education (if more than 2) */}
                    {education.length > 2 && (
                        <section className="mb-4 resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor}>
                                Education
                            </SectionHeader>
                            <div className="space-y-3">
                                {education.slice(2).map((edu) => (
                                    <div key={edu.id} className="resume-entry" data-paginate>
                                        <p style={{ fontSize: fs.small, color: accentColor, marginBottom: '2px' }}>
                                            ● {edu.startDate}
                                            {edu.city && ` ● ${edu.city.toUpperCase()}`}
                                        </p>
                                        <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#1f2937', marginBottom: '2px' }}>
                                            {edu.degree}
                                        </h4>
                                        <p style={{ fontSize: fs.body, color: accentColor, fontWeight: 600 }}>
                                            {edu.school}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Languages with Circular Indicators */}
                    {languages && languages.length > 0 && (
                        <section className="mb-4 resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor}>
                                Languages
                            </SectionHeader>
                            <div
                                style={{
                                    display: 'flex',
                                    gap: scale < 1 ? '8px' : '16px',
                                    flexWrap: 'wrap',
                                }}
                            >
                                {languages.slice(0, 3).map((lang) => (
                                    <CircularProgress
                                        key={lang.id}
                                        value={lang.level}
                                        size={scale < 1 ? 40 : 60}
                                        color={accentColor}
                                        strokeWidth={scale < 1 ? 3 : 4}
                                        fontSize={scale < 1 ? 10 : 14}
                                        label={lang.name}
                                        labelFontSize={scale < 1 ? 6 : 9}
                                        scale={1}
                                    />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Strengths as Tags */}
                    {strengths && strengths.length > 0 && (
                        <section className="mb-4 resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor}>
                                Strengths
                            </SectionHeader>
                            <div
                                style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: scale < 1 ? '4px' : '8px',
                                }}
                            >
                                {strengths.map((strength) => (
                                    <span
                                        key={strength.id}
                                        style={{
                                            backgroundColor: `${accentColor}20`,
                                            color: accentColor,
                                            padding: scale < 1 ? '2px 6px' : '4px 10px',
                                            borderRadius: '4px',
                                            fontSize: fs.small,
                                            fontWeight: 500,
                                        }}
                                    >
                                        {strength.name}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Interests with Icons */}
                    {interests && interests.length > 0 && (
                        <section className="resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor}>
                                Interests
                            </SectionHeader>
                            <div
                                style={{
                                    display: 'flex',
                                    gap: scale < 1 ? '12px' : '24px',
                                    flexWrap: 'wrap',
                                }}
                            >
                                {interests.slice(0, 4).map((interest) => (
                                    <div
                                        key={interest.id}
                                        style={{
                                            textAlign: 'center',
                                            minWidth: scale < 1 ? '40px' : '60px',
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize: scale < 1 ? '16px' : '24px',
                                                marginBottom: '4px',
                                            }}
                                        >
                                            {interest.icon || getInterestIcon(interest.name)}
                                        </div>
                                        <div style={{ fontSize: fs.tiny, color: '#4b5563' }}>
                                            {interest.name}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}

// Section Header Component
interface SectionHeaderProps {
    fs: ScaledFontSizes;
    headingFont: string;
    accentColor: string;
    children: React.ReactNode;
}

function SectionHeader({ fs, headingFont, accentColor, children }: SectionHeaderProps) {
    const basePx = parseInt(fs.body);
    const isSmall = basePx < 10;

    return (
        <h3
            style={{
                fontFamily: headingFont,
                fontSize: fs.sectionHeading,
                fontWeight: 500,
                color: accentColor,
                marginBottom: isSmall ? '6px' : '12px',
                textTransform: 'lowercase',
            }}
        >
            {children}
        </h3>
    );
}

// Interest Icon Helper
function getInterestIcon(name: string): string {
    const nameLower = name.toLowerCase();
    if (nameLower.includes('read') || nameLower.includes('book')) return '📚';
    if (nameLower.includes('sport') || nameLower.includes('fitness')) return '🏃';
    if (nameLower.includes('travel')) return '✈️';
    if (nameLower.includes('photo')) return '📷';
    if (nameLower.includes('music')) return '🎵';
    if (nameLower.includes('cook') || nameLower.includes('food')) return '🍳';
    if (nameLower.includes('game') || nameLower.includes('gaming')) return '🎮';
    if (nameLower.includes('art') || nameLower.includes('paint')) return '🎨';
    if (nameLower.includes('hik')) return '🥾';
    if (nameLower.includes('yoga') || nameLower.includes('meditat')) return '🧘';
    return '⭐';
}

// Template metadata for registry
export const headerDecorativeMeta: TemplateMeta = {
    id: 'header-decorative',
    name: 'Decorative',
    category: 'header',
    thumbnail: '/templates/header-decorative.png',
    description: 'Creative template with decorative wave pattern and centered name',
};

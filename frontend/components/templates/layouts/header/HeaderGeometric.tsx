'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';

/**
 * Header Geometric Template
 * Features a geometric pattern top decoration, dark header bar with centered name,
 * and a two-column body with section labels on the left.
 * Single-color schema - accent applies to header, underlines, and decorations.
 *
 * Layout:
 * - Geometric pattern decoration at top
 * - Dark header bar with centered name and contact info
 * - Two-column body: Labels LEFT (~25%), Content RIGHT (~75%)
 * - Rectangular percentage boxes for strengths
 *
 * Matches reference: frontend/Resume-template/unique-layouts/09-geometric-header.webp
 */
export default function HeaderGeometric({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, strengths, interests, socialLinks, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Inter');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes that respect user's size preference + scale
    const fs = getScaledFontSizes(sizeConfig, scale);

    // Single color preset - use customThemeColor or default brown/tan
    const accentColor = customThemeColor || '#92400e';
    const headerBgColor = '#78350f'; // Darker brown for header

    // Calculate responsive sizes
    const patternHeight = scale < 1 ? 20 : 40;
    const headerHeight = scale < 1 ? 50 : 100;
    const leftColWidth = '22%';
    const rightColWidth = '78%';

    return (
        <div
            className="w-full h-full"
            style={{
                fontFamily: bodyFont,
                fontSize: sizeConfig.base,
                backgroundColor: '#ffffff',
            }}
        >
            {/* Geometric Pattern Decoration - Lines emanating from corner */}
            <div
                style={{
                    height: patternHeight,
                    backgroundColor: '#ffffff',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <svg
                    width="100%"
                    height="100%"
                    style={{ position: 'absolute', top: 0, left: 0 }}
                    viewBox="0 0 800 40"
                    preserveAspectRatio="none"
                >
                    {/* Radiating lines from top-left corner */}
                    {[...Array(20)].map((_, i) => (
                        <line
                            key={i}
                            x1="0"
                            y1="0"
                            x2={400 + i * 30}
                            y2="40"
                            stroke={accentColor}
                            strokeWidth="0.5"
                            opacity="0.4"
                        />
                    ))}
                </svg>
            </div>

            {/* Header Bar */}
            <header
                className="resume-section"
                data-paginate
                style={{
                    backgroundColor: headerBgColor,
                    height: headerHeight,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: scale < 1 ? '8px' : '16px',
                }}
            >
                <h1
                    style={{
                        fontFamily: headingFont,
                        fontSize: fs.name,
                        fontWeight: 400,
                        color: '#ffffff',
                        letterSpacing: '0.05em',
                        marginBottom: scale < 1 ? '4px' : '8px',
                    }}
                >
                    {personalInfo.fullName || 'Your Name'}
                </h1>
                <div
                    style={{
                        display: 'flex',
                        gap: scale < 1 ? '8px' : '16px',
                        fontSize: fs.small,
                        color: '#e5e7eb',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                    }}
                >
                    {personalInfo.phone && (
                        <span>📱 {personalInfo.phone}</span>
                    )}
                    {personalInfo.location && (
                        <span>📍 {personalInfo.location}</span>
                    )}
                    {personalInfo.email && (
                        <span>✉️ {personalInfo.email}</span>
                    )}
                </div>
            </header>

            {/* Two-Column Body */}
            <div style={{ padding: scale < 1 ? '12px' : '24px' }}>
                {/* Resume Summary */}
                {personalInfo.summary && (
                    <TwoColumnSection
                        label="Resume summary"
                        fs={fs}
                        headingFont={headingFont}
                        accentColor={accentColor}
                        leftWidth={leftColWidth}
                        rightWidth={rightColWidth}
                        scale={scale}
                    >
                        <p style={{ color: '#374151', lineHeight: 1.6, fontSize: fs.body }}>
                            {personalInfo.summary}
                        </p>
                    </TwoColumnSection>
                )}

                {/* Work Experience */}
                {experience.length > 0 && (
                    <TwoColumnSection
                        label="Work experience"
                        fs={fs}
                        headingFont={headingFont}
                        accentColor={accentColor}
                        leftWidth={leftColWidth}
                        rightWidth={rightColWidth}
                        scale={scale}
                    >
                        <div className="space-y-4">
                            {experience.map((exp) => (
                                <div key={exp.id} className="resume-entry" data-paginate>
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#1f2937', marginBottom: '2px' }}>
                                        {exp.title}
                                    </h4>
                                    <p style={{ fontSize: fs.body, color: accentColor, fontWeight: 600, marginBottom: '2px' }}>
                                        {exp.company}
                                    </p>
                                    <p style={{ fontSize: fs.small, color: '#6b7280', marginBottom: '6px' }}>
                                        📅 {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                                        {exp.city && ` 📍 ${exp.city}`}
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
                    </TwoColumnSection>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <TwoColumnSection
                        label="Education"
                        fs={fs}
                        headingFont={headingFont}
                        accentColor={accentColor}
                        leftWidth={leftColWidth}
                        rightWidth={rightColWidth}
                        scale={scale}
                    >
                        <div className="space-y-3">
                            {education.map((edu) => (
                                <div key={edu.id} className="resume-entry" data-paginate>
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#1f2937', marginBottom: '2px' }}>
                                        {edu.degree}
                                    </h4>
                                    <p style={{ fontSize: fs.body, color: accentColor, fontWeight: 600, marginBottom: '2px' }}>
                                        {edu.school}
                                    </p>
                                    <p style={{ fontSize: fs.small, color: '#6b7280', marginBottom: '4px' }}>
                                        📅 {edu.startDate} – {edu.current ? 'Present' : edu.endDate}
                                        {edu.city && ` 📍 ${edu.city}`}
                                    </p>
                                    {edu.description && (
                                        <ul style={{ paddingLeft: scale < 1 ? '12px' : '16px', margin: 0, listStyle: 'disc' }}>
                                            {edu.description.split('\n').filter(Boolean).map((line, idx) => (
                                                <li key={idx} style={{ fontSize: fs.small, color: '#4b5563', marginBottom: '2px', lineHeight: 1.5 }}>
                                                    {line.replace(/^[-•]\s*/, '')}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </TwoColumnSection>
                )}

                {/* Core Strengths with Rectangular Percentage Boxes */}
                {strengths && strengths.length > 0 && (
                    <TwoColumnSection
                        label="Core strengths"
                        fs={fs}
                        headingFont={headingFont}
                        accentColor={accentColor}
                        leftWidth={leftColWidth}
                        rightWidth={rightColWidth}
                        scale={scale}
                    >
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 1fr)',
                                gap: scale < 1 ? '8px' : '16px',
                            }}
                        >
                            {strengths.slice(0, 6).map((strength) => (
                                <PercentageBox
                                    key={strength.id}
                                    value={strength.level}
                                    label={strength.name}
                                    accentColor={accentColor}
                                    fs={fs}
                                    scale={scale}
                                />
                            ))}
                        </div>
                    </TwoColumnSection>
                )}

                {/* Skills (if no strengths, show skills) */}
                {(!strengths || strengths.length === 0) && skills.length > 0 && (
                    <TwoColumnSection
                        label="Skills"
                        fs={fs}
                        headingFont={headingFont}
                        accentColor={accentColor}
                        leftWidth={leftColWidth}
                        rightWidth={rightColWidth}
                        scale={scale}
                    >
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: scale < 1 ? '4px' : '8px' }}>
                            {skills.map((skill) => (
                                <span
                                    key={skill.id}
                                    style={{
                                        backgroundColor: `${accentColor}15`,
                                        color: accentColor,
                                        padding: scale < 1 ? '2px 6px' : '4px 12px',
                                        borderRadius: '4px',
                                        fontSize: fs.small,
                                        fontWeight: 500,
                                    }}
                                >
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </TwoColumnSection>
                )}

                {/* Interests */}
                {interests && interests.length > 0 && (
                    <TwoColumnSection
                        label="Interests"
                        fs={fs}
                        headingFont={headingFont}
                        accentColor={accentColor}
                        leftWidth={leftColWidth}
                        rightWidth={rightColWidth}
                        scale={scale}
                    >
                        <div
                            style={{
                                display: 'flex',
                                gap: scale < 1 ? '12px' : '24px',
                                flexWrap: 'wrap',
                            }}
                        >
                            {interests.slice(0, 6).map((interest) => (
                                <div
                                    key={interest.id}
                                    style={{
                                        textAlign: 'center',
                                        minWidth: scale < 1 ? '40px' : '60px',
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: scale < 1 ? '16px' : '28px',
                                            marginBottom: '4px',
                                            color: accentColor,
                                        }}
                                    >
                                        {interest.icon || '⭐'}
                                    </div>
                                    <div style={{ fontSize: fs.tiny, color: '#4b5563' }}>
                                        {interest.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TwoColumnSection>
                )}

                {/* Social Media */}
                {socialLinks && socialLinks.length > 0 && (
                    <TwoColumnSection
                        label="Social Media"
                        fs={fs}
                        headingFont={headingFont}
                        accentColor={accentColor}
                        leftWidth={leftColWidth}
                        rightWidth={rightColWidth}
                        scale={scale}
                    >
                        <div
                            style={{
                                display: 'flex',
                                gap: scale < 1 ? '12px' : '24px',
                                flexWrap: 'wrap',
                            }}
                        >
                            {socialLinks.map((link) => (
                                <div
                                    key={link.id}
                                    style={{
                                        textAlign: 'center',
                                        minWidth: scale < 1 ? '40px' : '60px',
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: scale < 1 ? '16px' : '28px',
                                            marginBottom: '4px',
                                            color: accentColor,
                                        }}
                                    >
                                        {getSocialIcon(link.platform)}
                                    </div>
                                    <div style={{ fontSize: fs.tiny, color: '#4b5563' }}>
                                        {link.username || link.platform}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TwoColumnSection>
                )}
            </div>
        </div>
    );
}

// Two-Column Section Layout
interface TwoColumnSectionProps {
    label: string;
    fs: ScaledFontSizes;
    headingFont: string;
    accentColor: string;
    leftWidth: string;
    rightWidth: string;
    scale: number;
    children: React.ReactNode;
}

function TwoColumnSection({ label, fs, headingFont, accentColor, leftWidth, rightWidth, scale, children }: TwoColumnSectionProps) {
    return (
        <section
            className="resume-section"
            data-paginate
            style={{
                display: 'flex',
                marginBottom: scale < 1 ? '12px' : '20px',
            }}
        >
            {/* Left Column - Label */}
            <div style={{ width: leftWidth, paddingRight: scale < 1 ? '8px' : '16px' }}>
                <h3
                    style={{
                        fontFamily: headingFont,
                        fontSize: fs.sectionHeading,
                        fontWeight: 500,
                        color: accentColor,
                        marginBottom: scale < 1 ? '4px' : '8px',
                    }}
                >
                    {label}
                </h3>
                <div
                    style={{
                        width: scale < 1 ? '30px' : '50px',
                        height: '2px',
                        backgroundColor: accentColor,
                    }}
                />
            </div>

            {/* Right Column - Content */}
            <div style={{ width: rightWidth, borderTop: `1px solid ${accentColor}`, paddingTop: scale < 1 ? '6px' : '12px' }}>
                {children}
            </div>
        </section>
    );
}

// Rectangular Percentage Box
interface PercentageBoxProps {
    value: number;
    label: string;
    accentColor: string;
    fs: ScaledFontSizes;
    scale: number;
}

function PercentageBox({ value, label, accentColor, fs, scale }: PercentageBoxProps) {
    const boxSize = scale < 1 ? 40 : 70;
    const percentage = Math.round(value); // value is already 0-100

    return (
        <div style={{ textAlign: 'center' }}>
            <div
                style={{
                    width: boxSize,
                    height: boxSize,
                    border: `2px solid ${accentColor}`,
                    borderRadius: '4px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '0 auto',
                    position: 'relative',
                }}
            >
                {/* Progress indicator on left edge */}
                <div
                    style={{
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        width: '4px',
                        height: `${percentage}%`,
                        backgroundColor: accentColor,
                        borderRadius: '0 0 0 2px',
                    }}
                />
                <span style={{ fontSize: fs.entryTitle, fontWeight: 700, color: '#1f2937' }}>
                    {percentage}
                </span>
                <span style={{ fontSize: fs.tiny, color: accentColor }}>%</span>
            </div>
            <div style={{ fontSize: fs.tiny, color: '#4b5563', marginTop: '4px' }}>
                {label}
            </div>
        </div>
    );
}

// Social Icon Helper
function getSocialIcon(platform?: string): string {
    const platformLower = platform?.toLowerCase() || '';
    if (platformLower.includes('linkedin')) return '🔗';
    if (platformLower.includes('github')) return '💻';
    if (platformLower.includes('twitter') || platformLower.includes('x')) return '🐦';
    if (platformLower.includes('facebook')) return '📘';
    if (platformLower.includes('instagram')) return '📷';
    if (platformLower.includes('youtube')) return '📺';
    if (platformLower.includes('dribbble')) return '🎨';
    if (platformLower.includes('behance')) return '🅱️';
    return '🌐';
}

// Template metadata for registry
export const headerGeometricMeta: TemplateMeta = {
    id: 'header-geometric',
    name: 'Geometric',
    category: 'header',
    thumbnail: '/templates/header-geometric.png',
    description: 'Professional layout with geometric pattern decoration and two-column body',
};

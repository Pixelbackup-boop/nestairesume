'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';
import CircularProgress from '../../shared/CircularProgress';
import ProgressBar from '../../shared/ProgressBar';

/**
 * Header Dark Banner Template
 * Features a bold black header banner with name left and circular photo right.
 * Two-column body with experience on left, skills/languages/strengths/interests on right.
 *
 * Layout:
 * - Dark banner header (~15% height) with name LEFT, photo RIGHT
 * - Two-column body: Left (Summary, Experience, Education), Right (Skills, Languages, Strengths, Interests)
 * - Circular progress indicators for languages
 * - Pill badges for strengths
 * - Icons for interests
 *
 * Matches reference: frontend/Resume-template/unique-layouts/10-dark-banner.webp
 */
export default function HeaderDarkBanner({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, strengths, interests, certifications, awards, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Inter');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes that respect user's size preference + scale
    const fs = getScaledFontSizes(sizeConfig, scale);

    // Single color preset - use customThemeColor or default yellow/gold
    const accentColor = customThemeColor || '#f59e0b';
    const headerBgColor = '#0f172a'; // Dark slate/black

    // Calculate responsive sizes
    const headerHeight = scale < 1 ? 80 : 160;
    const photoSize = scale < 1 ? 50 : 100;

    return (
        <div
            className="w-full h-full"
            style={{
                fontFamily: bodyFont,
                fontSize: sizeConfig.base,
                backgroundColor: '#ffffff',
            }}
        >
            {/* Dark Header Banner */}
            <header
                className="resume-section"
                data-paginate
                style={{
                    backgroundColor: headerBgColor,
                    height: headerHeight,
                    padding: scale < 1 ? '12px 16px' : '24px 32px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                {/* Left: Name and Contact */}
                <div>
                    <h1
                        style={{
                            fontFamily: headingFont,
                            fontSize: fs.name,
                            fontWeight: 400,
                            color: '#ffffff',
                            letterSpacing: '0.02em',
                            marginBottom: scale < 1 ? '6px' : '12px',
                        }}
                    >
                        {personalInfo.fullName || 'Your Name'}
                    </h1>
                    <div
                        style={{
                            display: 'flex',
                            gap: scale < 1 ? '8px' : '16px',
                            fontSize: fs.small,
                            color: '#d1d5db',
                            flexWrap: 'wrap',
                        }}
                    >
                        {personalInfo.phone && (
                            <span>📱 {personalInfo.phone}</span>
                        )}
                        {personalInfo.email && (
                            <span>✉️ {personalInfo.email}</span>
                        )}
                        {personalInfo.website && (
                            <span>🌐 {personalInfo.website}</span>
                        )}
                    </div>
                </div>

                {/* Right: Profile Photo */}
                {personalInfo.profileImage && (
                    <img
                        src={personalInfo.profileImage}
                        alt={personalInfo.fullName}
                        style={{
                            width: photoSize,
                            height: photoSize,
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: '3px solid #ffffff',
                        }}
                    />
                )}
            </header>

            {/* Two-Column Body */}
            <div
                style={{
                    display: 'flex',
                    padding: scale < 1 ? '12px' : '24px',
                    gap: scale < 1 ? '12px' : '24px',
                }}
            >
                {/* LEFT COLUMN - Summary, Experience, Education */}
                <div style={{ width: '55%' }}>
                    {/* Resume Summary */}
                    {personalInfo.summary && (
                        <section className="mb-4 resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor}>
                                Resume summary
                            </SectionHeader>
                            <p style={{ color: '#374151', lineHeight: 1.6, fontSize: fs.body }}>
                                {personalInfo.summary}
                            </p>
                        </section>
                    )}

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
                                            📅 {exp.startDate} – {exp.current ? 'PRESENT' : exp.endDate}
                                            {exp.city && ` 📍 ${exp.city.toUpperCase()}`}
                                        </p>
                                        <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#1f2937', marginBottom: '2px' }}>
                                            {exp.title}
                                        </h4>
                                        <p style={{ fontSize: fs.body, color: '#4b5563', fontWeight: 600, marginBottom: '4px' }}>
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
                                {education.map((edu) => (
                                    <div key={edu.id} className="resume-entry" data-paginate>
                                        <p style={{ fontSize: fs.small, color: accentColor, marginBottom: '2px' }}>
                                            📅 {edu.startDate}
                                            {edu.city && ` 📍 ${edu.city.toUpperCase()}`}
                                        </p>
                                        <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#1f2937', marginBottom: '2px' }}>
                                            {edu.degree}
                                        </h4>
                                        <p style={{ fontSize: fs.body, color: '#4b5563', fontWeight: 600 }}>
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

                {/* RIGHT COLUMN - Skills, Languages, Strengths, Interests */}
                <div style={{ width: '45%' }}>
                    {/* Skills with Progress Bars */}
                    {skills.length > 0 && (
                        <section className="mb-4 resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor}>
                                Skills
                            </SectionHeader>
                            <p style={{ fontSize: fs.tiny, color: '#6b7280', marginBottom: scale < 1 ? '4px' : '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                💻 SOFTWARE
                            </p>
                            <div className="space-y-2">
                                {skills.map((skill) => (
                                    <div key={skill.id} data-paginate="item">
                                        <ProgressBar
                                            label={skill.name}
                                            value={skill.level * 20}
                                            color={accentColor}
                                            height={scale < 1 ? 4 : 6}
                                            scale={1}
                                        />
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
                                    <div key={lang.id} data-paginate="item">
                                        <CircularProgress
                                            value={lang.level}
                                            size={scale < 1 ? 40 : 70}
                                            color="#374151"
                                            strokeWidth={scale < 1 ? 2 : 3}
                                            fontSize={scale < 1 ? 10 : 16}
                                            label={lang.name}
                                            labelFontSize={scale < 1 ? 6 : 10}
                                            scale={1}
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Strengths as Pill Badges */}
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
                                        data-paginate="item"
                                        style={{
                                            backgroundColor: accentColor,
                                            color: '#1f2937',
                                            padding: scale < 1 ? '2px 6px' : '4px 12px',
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
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(3, 1fr)',
                                    gap: scale < 1 ? '8px' : '16px',
                                }}
                            >
                                {interests.slice(0, 6).map((interest) => (
                                    <div
                                        key={interest.id}
                                        style={{
                                            textAlign: 'center',
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize: scale < 1 ? '16px' : '28px',
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

                    {/* Credentials (Certifications & Awards) */}
                    {((certifications && certifications.length > 0) || (awards && awards.length > 0)) && (
                        <section className="resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor}>
                                Credentials
                            </SectionHeader>

                            {certifications && certifications.length > 0 && (
                                <div style={{ marginBottom: awards && awards.length > 0 ? 16 : 0 }}>
                                    <p style={{ fontSize: fs.tiny, fontWeight: 600, color: '#6b7280', marginBottom: 8 }}>
                                        Certifications
                                    </p>
                                    <div className="space-y-2">
                                        {certifications.map((cert) => (
                                            <div key={cert.id} data-paginate="item">
                                                <div style={{ fontWeight: 600, fontSize: fs.body, color: '#1f2937' }}>{cert.name}</div>
                                                <div style={{ fontSize: fs.small, color: '#6b7280' }}>{cert.issuer} • {cert.date}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {awards && awards.length > 0 && (
                                <div>
                                    <p style={{ fontSize: fs.tiny, fontWeight: 600, color: '#6b7280', marginBottom: 8 }}>
                                        Awards & Achievements
                                    </p>
                                    <div className="space-y-2">
                                        {awards.map((award) => (
                                            <div key={award.id} data-paginate="item">
                                                <div style={{ fontWeight: 600, fontSize: fs.body, color: '#1f2937' }}>{award.title}</div>
                                                <div style={{ fontSize: fs.small, color: '#6b7280' }}>{award.issuer} • {award.date}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
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
            }}
        >
            {children}
        </h3>
    );
}

// Interest Icon Helper
function getInterestIcon(name: string): string {
    const nameLower = name.toLowerCase();
    if (nameLower.includes('music') || nameLower.includes('rock')) return '🎵';
    if (nameLower.includes('football') || nameLower.includes('soccer')) return '⚽';
    if (nameLower.includes('photo')) return '📷';
    if (nameLower.includes('hiking') || nameLower.includes('hike')) return '🥾';
    if (nameLower.includes('biking') || nameLower.includes('bike') || nameLower.includes('cycling')) return '🚴';
    if (nameLower.includes('tennis')) return '🎾';
    if (nameLower.includes('travel')) return '✈️';
    if (nameLower.includes('reading') || nameLower.includes('book')) return '📚';
    if (nameLower.includes('cooking') || nameLower.includes('food')) return '🍳';
    if (nameLower.includes('gaming') || nameLower.includes('game')) return '🎮';
    if (nameLower.includes('film') || nameLower.includes('movie')) return '🎬';
    if (nameLower.includes('art') || nameLower.includes('paint')) return '🎨';
    if (nameLower.includes('yoga') || nameLower.includes('meditation')) return '🧘';
    if (nameLower.includes('swim')) return '🏊';
    if (nameLower.includes('run')) return '🏃';
    return '⭐';
}

// Template metadata for registry
export const headerDarkBannerMeta: TemplateMeta = {
    id: 'header-dark-banner',
    name: 'Dark Banner',
    category: 'header',
    thumbnail: '/templates/header-dark-banner.png',
    description: 'Bold dark header with circular photo and two-column body layout',
};

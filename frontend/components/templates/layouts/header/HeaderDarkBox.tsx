'use client';

import { memo } from 'react';
import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';
import CircularProgress from '../../shared/CircularProgress';
import ProgressBar from '../../shared/ProgressBar';
import { parseDualColor } from '@/lib/templates/builder/colorUtils';
import { useTemplateTranslations } from '@/lib/templates/TranslationContext';

/**
 * Header Dark Box Template
 * Distinctive bordered box containing only the name, with contact info beside it.
 * Dual-color schema: primary = box border color, secondary = accent highlights.
 *
 * Layout:
 * - Bordered box with name (center), avatar (left), contact info (right)
 * - Two-column body: Left (Objective, Experience, Education), Right (Education, Skills with circles, Computer Skills)
 *
 * Matches reference: frontend/Resume-template/unique-layouts/08-header-box.webp
 */
function HeaderDarkBox({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, strengths, certifications, awards, references, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Inter');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes that respect user's size preference + scale
    const fs = getScaledFontSizes(sizeConfig, scale);

    // Parse dual color: primary = box BORDER, secondary = accent highlights
    // This makes both colors visually distinct in the template
    const { primary: boxBorderColor, secondary: accentColor } = parseDualColor(
        customThemeColor,
        { primary: '#2563eb', secondary: '#facc15' } // Blue border, Yellow accents by default
    );

    const t = useTemplateTranslations();

    return (
        <div
            className="w-full h-full"
            style={{
                fontFamily: bodyFont,
                fontSize: sizeConfig.base,
                backgroundColor: '#ffffff',
                padding: scale < 1 ? '20px' : '40px',
            }}
        >
            {/* Header Area */}
            <header
                className="resume-section"
                data-paginate
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: scale < 1 ? '24px' : '48px',
                }}
            >
                {/* Profile Avatar - Circle with image or initials */}
                <ProfileAvatar
                    profileImage={personalInfo.profileImage}
                    fullName={personalInfo.fullName || 'Your Name'}
                    size={scale < 1 ? 70 : 120}
                    accentColor={accentColor}
                    headingFont={headingFont}
                />

                {/* Name Box - Bordered Outline Style */}
                <div
                    style={{
                        backgroundColor: '#ffffff',
                        border: `${scale < 1 ? '3px' : '4px'} solid ${boxBorderColor}`,
                        padding: scale < 1 ? '16px 24px' : '32px 48px',
                        display: 'inline-block',
                    }}
                >
                    <h1
                        style={{
                            fontFamily: headingFont,
                            fontSize: scale < 1 ? '18px' : '28px', // Fixed - header name doesn't scale with text size
                            fontWeight: 900, // Black weight
                            color: '#1f2937', // Dark text on white background
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                            margin: 0,
                            lineHeight: 1,
                        }}
                    >
                        {personalInfo.fullName || 'Your Name'}
                    </h1>
                </div>

                {/* Contact Info - Right Aligned */}
                <div
                    style={{
                        textAlign: 'right', // Changed to Right to match "opposite"
                        fontSize: fs.body,
                        color: '#374151',
                        lineHeight: 1.8,
                        paddingTop: 10,
                    }}
                >
                    {personalInfo.phone && (
                        <div><strong>Phone:</strong> {personalInfo.phone}</div>
                    )}
                    {personalInfo.email && (
                        <div><strong>Email:</strong> {personalInfo.email}</div>
                    )}
                    {personalInfo.website && (
                        <div><strong>Web:</strong> {personalInfo.website}</div>
                    )}
                    {personalInfo.location && (
                        <div><strong>Loc:</strong> {personalInfo.location}</div>
                    )}
                    {personalInfo.linkedin && (
                        <div><strong>LinkedIn:</strong> {personalInfo.linkedin}</div>
                    )}
                    {personalInfo.nationality && (
                        <div><strong>Nationality:</strong> {personalInfo.nationality}</div>
                    )}
                    {personalInfo.idType && personalInfo.idNumber && (
                        <div><strong>{personalInfo.idType === 'id' ? 'ID' : personalInfo.idType === 'passport' ? 'Passport' : 'License'}:</strong> {personalInfo.idNumber}</div>
                    )}
                </div>
            </header>

            {/* Two-Column Body */}
            <div style={{ display: 'flex', gap: scale < 1 ? '24px' : '48px' }}>
                {/* LEFT COLUMN */}
                <div style={{ width: '60%' }}>
                    {/* Resume Objective / Summary */}
                    {personalInfo.summary && (
                        <section className="mb-6 resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon="👤">
                                {t.sections.profile}
                            </SectionHeader>
                            <p style={{ color: '#374151', lineHeight: 1.6, fontSize: fs.body }}>
                                {personalInfo.summary}
                            </p>
                        </section>
                    )}

                    {/* Work Experience */}
                    {experience.length > 0 && (
                        <section className="mb-6 resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon="💼">
                                {t.sections.experience}
                            </SectionHeader>
                            <div className="space-y-5">
                                {experience.map((exp) => (
                                    <div key={exp.id} className="resume-entry" data-paginate>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                                            <h4 style={{ fontWeight: 800, fontSize: fs.entryTitle, color: '#1f2937' }}>
                                                {exp.title}
                                            </h4>
                                            <span style={{ fontSize: fs.small, color: '#6b7280', fontWeight: 500 }}>
                                                {exp.startDate} – {exp.current ? t.labels.present : exp.endDate}
                                            </span>
                                        </div>

                                        <p style={{ fontSize: fs.body, color: accentColor, fontWeight: 700, marginBottom: '6px', textTransform: 'uppercase' }}>
                                            {exp.company} {exp.city && `| ${exp.city}`}
                                        </p>
                                        {exp.description && (
                                            <p style={{ fontSize: fs.body, color: '#4b5563', lineHeight: 1.5 }}>
                                                {exp.description}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education (Left Column) */}
                    {education.length > 0 && (
                        <section className="mb-6 resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon="🎓">
                                {t.sections.education}
                            </SectionHeader>
                            <div className="space-y-4">
                                {education.slice(0, 2).map((edu) => (
                                    <div key={edu.id} className="resume-entry" data-paginate>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                                            <h4 style={{ fontWeight: 800, fontSize: fs.entryTitle, color: '#1f2937' }}>
                                                {edu.degree}
                                            </h4>
                                            <span style={{ fontSize: fs.small, color: '#6b7280', fontWeight: 500 }}>
                                                {edu.startDate} – {edu.endDate || t.labels.present}
                                            </span>
                                        </div>
                                        <p style={{ fontSize: fs.body, color: accentColor, fontWeight: 700 }}>
                                            {edu.school} {edu.city && `| ${edu.city}`}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* RIGHT COLUMN */}
                <div style={{ width: '40%' }}>
                    {/* Education (Right Column - additional) */}
                    {education.length > 2 && (
                        <section className="mb-6 resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon="🎓">
                                Education (Cont.)
                            </SectionHeader>
                            <div className="space-y-4">
                                {education.slice(2).map((edu) => (
                                    <div key={edu.id} className="resume-entry" data-paginate>
                                        <h4 style={{ fontWeight: 800, fontSize: fs.entryTitle, color: '#1f2937', marginBottom: '4px' }}>
                                            {edu.degree}
                                        </h4>
                                        <p style={{ fontSize: fs.body, color: accentColor, fontWeight: 700, marginBottom: '2px' }}>
                                            {edu.school}
                                        </p>
                                        <span style={{ fontSize: fs.small, color: '#6b7280' }}>
                                            {edu.startDate} – {edu.endDate || t.labels.present}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Languages */}
                    {languages && languages.length > 0 && (
                        <section className="mb-6 resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon="🗣️">
                                {t.sections.languages}
                            </SectionHeader>
                            <div className="space-y-3">
                                {languages.map((lang) => (
                                    <div key={lang.id} data-paginate="item">
                                        <ProgressBar
                                            label={lang.name}
                                            value={lang.level || getLanguageLevelPercent(lang.proficiency)}
                                            color={accentColor}
                                            height={scale < 1 ? 6 : 10}
                                            scale={1}
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills (Circular) */}
                    {skills.length > 0 && (
                        <section className="mb-6 resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon="🤝">
                                {t.sections.skills}
                            </SectionHeader>
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(3, 1fr)',
                                    gap: scale < 1 ? '10px' : '20px',
                                    marginTop: 10,
                                }}
                            >
                                {skills.map((skill) => (
                                    <div key={skill.id} data-paginate="item">
                                        <CircularProgress
                                            value={skill.level ? skill.level * 20 : 80}
                                            size={scale < 1 ? 50 : 80}
                                            color={accentColor}
                                            strokeWidth={scale < 1 ? 5 : 8}
                                            fontSize={scale < 1 ? 8 : 12}
                                            label={skill.name}
                                            labelFontSize={scale < 1 ? 8 : 11}
                                            scale={1}
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Strengths (Bars) */}
                    {strengths && strengths.length > 0 && (
                        <section className="mb-6 resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon="💻">
                                {t.sections.strengths}
                            </SectionHeader>
                            <div className="space-y-3">
                                {strengths.map((str) => (
                                    <div key={str.id} data-paginate="item">
                                        <ProgressBar
                                            label={str.name}
                                            value={(str as any).level ?? 80}
                                            color={accentColor}
                                            height={scale < 1 ? 6 : 10}
                                            scale={1}
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Interests */}
                    {data.interests && data.interests.length > 0 && (
                        <section className="mb-6 resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon="⭐">
                                {t.sections.interests}
                            </SectionHeader>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                                {data.interests.map((int) => (
                                    <span key={int.id} style={{ fontSize: fs.body, fontWeight: 500, color: '#4b5563' }}>
                                        {int.name}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Credentials (Certifications & Awards) */}
                    {((certifications && certifications.length > 0) || (awards && awards.length > 0)) && (
                        <section className="resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon="🏆">
                                {t.sections.credentials}
                            </SectionHeader>

                            {certifications && certifications.length > 0 && (
                                <div style={{ marginBottom: awards && awards.length > 0 ? 16 : 0 }}>
                                    <h4 style={{ fontSize: fs.small, fontWeight: 600, color: '#6b7280', marginBottom: 8 }}>
                                        {t.sections.certifications}
                                    </h4>
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
                                    <h4 style={{ fontSize: fs.small, fontWeight: 600, color: '#6b7280', marginBottom: 8 }}>
                                        {t.sections.awards}
                                    </h4>
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

                    {/* Social Links */}
                    {(personalInfo.twitter || personalInfo.github || personalInfo.dribbble || personalInfo.behance || personalInfo.instagram) && (
                        <section className="mb-6 resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon="🔗">
                                {t.sections.socialLinks}
                            </SectionHeader>
                            <div className="space-y-2">
                                {personalInfo.twitter && (
                                    <div data-paginate="item" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: fs.body }}>
                                        <span>🐦</span>
                                        <span style={{ color: '#374151' }}>{personalInfo.twitter}</span>
                                    </div>
                                )}
                                {personalInfo.github && (
                                    <div data-paginate="item" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: fs.body }}>
                                        <span>💻</span>
                                        <span style={{ color: '#374151' }}>{personalInfo.github}</span>
                                    </div>
                                )}
                                {personalInfo.dribbble && (
                                    <div data-paginate="item" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: fs.body }}>
                                        <span>🏀</span>
                                        <span style={{ color: '#374151' }}>{personalInfo.dribbble}</span>
                                    </div>
                                )}
                                {personalInfo.behance && (
                                    <div data-paginate="item" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: fs.body }}>
                                        <span>🎨</span>
                                        <span style={{ color: '#374151' }}>{personalInfo.behance}</span>
                                    </div>
                                )}
                                {personalInfo.instagram && (
                                    <div data-paginate="item" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: fs.body }}>
                                        <span>📷</span>
                                        <span style={{ color: '#374151' }}>{personalInfo.instagram}</span>
                                    </div>
                                )}
                            </div>
                        </section>
                    )}

                    {/* References */}
                    {references && references.length > 0 && (
                        <section className="mb-6 resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon="👥">
                                {t.sections.references}
                            </SectionHeader>
                            <div className="space-y-3">
                                {references.map((ref) => (
                                    <div key={ref.id} data-paginate="item">
                                        <div style={{ fontWeight: 700, fontSize: fs.body, color: '#1f2937' }}>{ref.name}</div>
                                        <div style={{ fontSize: fs.small, color: accentColor, fontWeight: 600 }}>
                                            {ref.title}{ref.company && `, ${ref.company}`}
                                        </div>
                                        {(ref.email || ref.phone) && (
                                            <div style={{ fontSize: fs.small, color: '#6b7280', marginTop: 2 }}>
                                                {ref.email && <span>{ref.email}</span>}
                                                {ref.email && ref.phone && <span> • </span>}
                                                {ref.phone && <span>{ref.phone}</span>}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Custom Field */}
                    {personalInfo.customField && personalInfo.customFieldLabel && (
                        <section className="mb-6 resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon="📋">
                                {personalInfo.customFieldLabel}
                            </SectionHeader>
                            <p style={{ fontSize: fs.body, color: '#374151', lineHeight: 1.6 }}>
                                {personalInfo.customField}
                            </p>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}

// Helper function to convert proficiency string to percentage
function getLanguageLevelPercent(proficiency: string): number {
    const prof = proficiency?.toLowerCase() || '';
    if (prof.includes('native') || prof === 'native') return 100;
    if (prof.includes('fluent') || prof === 'fluent') return 95;
    if (prof.includes('advanced') || prof === 'advanced') return 80;
    if (prof.includes('intermediate') || prof === 'intermediate') return 60;
    if (prof.includes('basic') || prof === 'basic') return 40;
    return 50; // default
}

// Profile Avatar - Shows image or initials placeholder
interface ProfileAvatarProps {
    profileImage?: string;
    fullName: string;
    size: number;
    accentColor: string;
    headingFont: string;
}

function ProfileAvatar({ profileImage, fullName, size, accentColor, headingFont }: ProfileAvatarProps) {
    // Get initials from full name (up to 2 characters)
    const getInitials = (name: string): string => {
        const parts = name.trim().split(/\s+/);
        if (parts.length === 1) {
            return parts[0].substring(0, 2).toUpperCase();
        }
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    };

    const initials = getInitials(fullName);
    const fontSize = Math.round(size * 0.4);

    if (profileImage) {
        return (
            <div
                style={{
                    width: size,
                    height: size,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: `3px solid ${accentColor}`,
                    flexShrink: 0,
                }}
            >
                <img
                    src={profileImage}
                    alt={fullName}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
            </div>
        );
    }

    // Placeholder with initials
    return (
        <div
            style={{
                width: size,
                height: size,
                borderRadius: '50%',
                backgroundColor: '#e5e7eb',
                border: `3px solid ${accentColor}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
            }}
        >
            <span
                style={{
                    fontFamily: headingFont,
                    fontSize: fontSize,
                    fontWeight: 700,
                    color: accentColor,
                }}
            >
                {initials}
            </span>
        </div>
    );
}

// Section Header with Icon
interface SectionHeaderProps {
    fs: ScaledFontSizes;
    headingFont: string;
    accentColor: string;
    icon: string;
    children: React.ReactNode;
}

function SectionHeader({ fs, headingFont, accentColor, icon, children }: SectionHeaderProps) {
    const basePx = parseInt(fs.body);
    const isSmall = basePx < 10;

    return (
        <h3
            data-paginate // Enables orphan protection in PagedPreview
            style={{
                fontFamily: headingFont,
                fontSize: fs.sectionHeading,
                fontWeight: 700,
                color: accentColor,
                marginBottom: isSmall ? '8px' : '14px',
                display: 'flex',
                alignItems: 'center',
                gap: isSmall ? '4px' : '8px',
            }}
        >
            <span style={{ fontSize: fs.sectionHeading }}>{icon}</span>
            {children}
        </h3>
    );
}

// Wrap with memo to prevent unnecessary re-renders
export default memo(HeaderDarkBox);

// Template metadata for registry
export const headerDarkBoxMeta: TemplateMeta = {
    id: 'header-dark-box',
    name: 'Dark Box',
    category: 'header',
    thumbnail: '/templates/header-dark-box.png',
    description: 'Professional header with dark name box and circular skill indicators',
};

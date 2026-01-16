'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';
import CircularProgress from '../../shared/CircularProgress';
import ProgressBar from '../../shared/ProgressBar';

/**
 * Header Dark Box Template
 * Distinctive dark box containing only the name, with contact info beside it.
 * Single-color schema - accent applies to name box and section headers.
 *
 * Layout:
 * - Dark box with name (top-left), contact info (top-right)
 * - Two-column body: Left (Objective, Experience, Education), Right (Education, Skills with circles, Computer Skills)
 *
 * Matches reference: frontend/Resume-template/unique-layouts/08-header-box.webp
 */
export default function HeaderDarkBox({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, strengths, certifications, awards, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Inter');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes that respect user's size preference + scale
    const fs = getScaledFontSizes(sizeConfig, scale);

    // Single color preset - use customThemeColor or default Blue 600 (Vibrant)
    const accentColor = customThemeColor || '#2563eb';

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

                {/* Name Box - Solid Vibrant Blue */}
                <div
                    style={{
                        backgroundColor: accentColor,
                        padding: scale < 1 ? '20px 30px' : '40px 60px',
                        display: 'inline-block',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    }}
                >
                    <h1
                        style={{
                            fontFamily: headingFont,
                            fontSize: fs.name,
                            fontWeight: 900, // Black weight
                            color: '#ffffff',
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
                                Profile
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
                                Experience
                            </SectionHeader>
                            <div className="space-y-5">
                                {experience.map((exp) => (
                                    <div key={exp.id} className="resume-entry" data-paginate>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                                            <h4 style={{ fontWeight: 800, fontSize: fs.entryTitle, color: '#1f2937' }}>
                                                {exp.title}
                                            </h4>
                                            <span style={{ fontSize: fs.small, color: '#6b7280', fontWeight: 500 }}>
                                                {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
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
                                Education
                            </SectionHeader>
                            <div className="space-y-4">
                                {education.slice(0, 2).map((edu) => (
                                    <div key={edu.id} className="resume-entry" data-paginate>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                                            <h4 style={{ fontWeight: 800, fontSize: fs.entryTitle, color: '#1f2937' }}>
                                                {edu.degree}
                                            </h4>
                                            <span style={{ fontSize: fs.small, color: '#6b7280', fontWeight: 500 }}>
                                                {edu.startDate} – {edu.endDate || 'Present'}
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
                                            {edu.startDate} – {edu.endDate || 'Present'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Languages */}
                    {data.languages && data.languages.length > 0 && (
                        <section className="mb-6 resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon="🗣️">
                                Languages
                            </SectionHeader>
                            <div className="space-y-2">
                                {data.languages.map((lang) => (
                                    <div key={lang.id} data-paginate="item" style={{ display: 'flex', justifyContent: 'space-between', fontSize: fs.body }}>
                                        <span style={{ fontWeight: 600 }}>{lang.name}</span>
                                        <span style={{ color: '#6b7280' }}>{lang.proficiency}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills (Circular) */}
                    {skills.length > 0 && (
                        <section className="mb-6 resume-section" data-paginate>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon="🤝">
                                Skills
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
                                Expertise
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
                                Interests
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
                                Credentials
                            </SectionHeader>

                            {certifications && certifications.length > 0 && (
                                <div style={{ marginBottom: awards && awards.length > 0 ? 16 : 0 }}>
                                    <h4 style={{ fontSize: fs.small, fontWeight: 600, color: '#6b7280', marginBottom: 8 }}>
                                        Certifications
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
                                        Awards & Achievements
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
                </div>
            </div>
        </div>
    );
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

// Template metadata for registry
export const headerDarkBoxMeta: TemplateMeta = {
    id: 'header-dark-box',
    name: 'Dark Box',
    category: 'header',
    thumbnail: '/templates/header-dark-box.png',
    description: 'Professional header with dark name box and circular skill indicators',
};

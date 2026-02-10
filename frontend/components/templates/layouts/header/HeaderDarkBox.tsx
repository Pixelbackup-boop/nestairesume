'use client';

import { memo, ReactNode } from 'react';
import { User, Briefcase, GraduationCap, Languages, Users, Code, Star, Award, Link, ClipboardList, Twitter, Github, Dribbble, Palette, Camera } from 'lucide-react';
import { TemplateProps, TemplateMeta } from '../../shared/types';
import { ScaledFontSizes } from '../../shared/styleHelpers';
import CircularProgress from '../../shared/CircularProgress';
import ProgressBar from '../../shared/ProgressBar';
import { useTemplateSetup } from '@/hooks';

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
function HeaderDarkBox({ data, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, strengths, certifications, awards, references, customFields, customThemeColor, fonts } = data;

    const { headingFont, bodyFont, sizeConfig, fs, t, colors } = useTemplateSetup({
        customThemeColor,
        fonts,
        scale,
        defaultPrimary: '#2563eb',    // Blue border
        defaultSecondary: '#facc15',  // Yellow accents
        defaultHeadingFont: 'Inter',
        defaultBodyFont: 'Inter',
    });

    // Spacing helper
    const sizeMult = parseInt(sizeConfig.base) / 14;
    const sp = (px: number) => Math.round(px * sizeMult);

    // Dual-color: primary = box BORDER, secondary = accent highlights
    const boxBorderColor = colors.primary;
    const accentColor = colors.secondary;

    return (
        <div
            className="w-full h-full"
            style={{
                fontFamily: bodyFont,
                fontSize: sizeConfig.base,
                backgroundColor: '#ffffff',
                padding: scale < 1 ? '20px' : `${sp(40)}px`,
            }}
        >
            {/* Header Area */}
            <header
                className="resume-section"
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: scale < 1 ? '24px' : `${sp(48)}px`,
                }}
            >
                {/* Profile Avatar - Circle with image or initials */}
                <ProfileAvatar
                    profileImage={personalInfo.profileImage}
                    fullName={personalInfo.fullName || 'Your Name'}
                    size={scale < 1 ? 70 : sp(120)}
                    accentColor={accentColor}
                    headingFont={headingFont}
                    sp={sp}
                />

                {/* Name + Job Title */}
                <div style={{ textAlign: 'center' }}>
                    <h1
                        style={{
                            fontFamily: headingFont,
                            fontSize: scale < 1 ? '18px' : '28px',
                            fontWeight: 900,
                            color: '#1f2937',
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                            margin: 0,
                            lineHeight: 1,
                        }}
                    >
                        {personalInfo.fullName || 'Your Name'}
                    </h1>
                    {personalInfo.jobTitle && (
                        <p
                            style={{
                                fontFamily: bodyFont,
                                fontSize: scale < 1 ? '12px' : fs.body,
                                color: '#6b7280',
                                fontWeight: 500,
                                marginTop: scale < 1 ? '6px' : `${sp(8)}px`,
                                marginRight: 0,
                                marginBottom: 0,
                                marginLeft: 0,
                            }}
                        >
                            {personalInfo.jobTitle}
                        </p>
                    )}
                </div>

                {/* Contact Info - Right Aligned */}
                <div
                    style={{
                        textAlign: 'right', // Changed to Right to match "opposite"
                        fontSize: fs.body,
                        color: '#374151',
                        lineHeight: 1.8,
                        paddingTop: sp(10),
                    }}
                >
                    {personalInfo.phone && (
                        <div><strong>Phone:</strong> {personalInfo.phone}</div>
                    )}
                    {personalInfo.email && (
                        <div><strong>Email:</strong> {personalInfo.email}</div>
                    )}
                    {personalInfo.location && (
                        <div><strong>Location:</strong> {personalInfo.location}</div>
                    )}
                    {personalInfo.website && (
                        <div><strong>Web:</strong> {personalInfo.website}</div>
                    )}
                    {personalInfo.linkedin && (
                        <div><strong>LinkedIn:</strong> {personalInfo.linkedin}</div>
                    )}
                </div>
            </header>

            {/* Two-Column Body */}
            <div style={{ display: 'flex', gap: scale < 1 ? '24px' : `${sp(48)}px` }}>
                {/* LEFT COLUMN */}
                <div style={{ width: '60%' }}>
                    {/* Resume Objective / Summary */}
                    {personalInfo.summary && (
                        <section className="resume-section" style={{ marginBottom: sp(16) }}>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon={<User size={parseInt(fs.sectionHeading)} color={accentColor} />} sp={sp}>
                                {t.sections.profile}
                            </SectionHeader>
                            <p style={{ color: '#374151', lineHeight: 1.6, fontSize: fs.body }}>
                                {personalInfo.summary}
                            </p>
                        </section>
                    )}

                    {/* Experience */}
                    {experience.length > 0 && (
                        <section className="resume-section" style={{ marginBottom: sp(16) }}>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon={<Briefcase size={parseInt(fs.sectionHeading)} color={accentColor} />} sp={sp}>
                                {t.sections.experience}
                            </SectionHeader>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: sp(20) }}>
                                {experience.map((exp) => (
                                    <div key={exp.id} className="resume-entry" data-paginate="item">
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: sp(4) }}>
                                            <h4 style={{ fontWeight: 800, fontSize: fs.entryTitle, color: '#1f2937' }}>
                                                {exp.title}
                                            </h4>
                                            <span style={{ fontSize: fs.small, color: '#6b7280', fontWeight: 500 }}>
                                                {exp.startDate} – {exp.current ? t.labels.present : exp.endDate}
                                            </span>
                                        </div>

                                        <p style={{ fontSize: fs.body, color: accentColor, fontWeight: 700, marginBottom: sp(6), textTransform: 'uppercase' }}>
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
                        <section className="resume-section" style={{ marginBottom: sp(16) }}>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon={<GraduationCap size={parseInt(fs.sectionHeading)} color={accentColor} />} sp={sp}>
                                {t.sections.education}
                            </SectionHeader>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: sp(16) }}>
                                {education.slice(0, 2).map((edu) => (
                                    <div key={edu.id} className="resume-entry" data-paginate="item">
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: sp(4) }}>
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

                    {/* Personal Details */}
                    {(personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber)) && (
                        <section className="resume-section" style={{ marginBottom: sp(16) }}>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon={<ClipboardList size={parseInt(fs.sectionHeading)} color={accentColor} />} sp={sp}>
                                {t.sections.personalDetails}
                            </SectionHeader>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: sp(8), fontSize: fs.body }}>
                                {personalInfo.nationality && (
                                    <div><span style={{ fontWeight: 600, color: '#111827' }}>Nationality:</span> <span style={{ color: '#374151' }}>{personalInfo.nationality}</span></div>
                                )}
                                {personalInfo.idType && personalInfo.idNumber && (
                                    <div>
                                        <span style={{ fontWeight: 600, color: '#111827' }}>
                                            {personalInfo.idType === 'id' ? 'ID' :
                                                personalInfo.idType === 'passport' ? 'Passport' :
                                                    personalInfo.idType === 'driving_license' ? 'Driving License' : 'ID'}:
                                        </span> <span style={{ color: '#374151' }}>{personalInfo.idNumber}</span>
                                    </div>
                                )}
                            </div>
                        </section>
                    )}
                </div>

                {/* RIGHT COLUMN */}
                <div style={{ width: '40%' }}>
                    {/* Education (Right Column - additional) */}
                    {education.length > 2 && (
                        <section className="resume-section" style={{ marginBottom: sp(16) }}>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon={<GraduationCap size={parseInt(fs.sectionHeading)} color={accentColor} />} sp={sp}>
                                Education (Cont.)
                            </SectionHeader>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: sp(16) }}>
                                {education.slice(2).map((edu) => (
                                    <div key={edu.id} className="resume-entry" data-paginate="item">
                                        <h4 style={{ fontWeight: 800, fontSize: fs.entryTitle, color: '#1f2937', marginBottom: sp(4) }}>
                                            {edu.degree}
                                        </h4>
                                        <p style={{ fontSize: fs.body, color: accentColor, fontWeight: 700, marginBottom: sp(2) }}>
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
                        <section className="resume-section" style={{ marginBottom: sp(16) }}>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon={<Languages size={parseInt(fs.sectionHeading)} color={accentColor} />} sp={sp}>
                                {t.sections.languages}
                            </SectionHeader>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: sp(12) }}>
                                {languages.map((lang) => (
                                    <div key={lang.id} data-paginate="item">
                                        <ProgressBar
                                            label={lang.name}
                                            value={lang.level || getLanguageLevelPercent(lang.proficiency)}
                                            color={accentColor}
                                            height={scale < 1 ? 6 : sp(10)}
                                            scale={1}
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills (Circular) */}
                    {skills.length > 0 && (
                        <section className="resume-section" style={{ marginBottom: sp(16) }}>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon={<Users size={parseInt(fs.sectionHeading)} color={accentColor} />} sp={sp}>
                                {t.sections.skills}
                            </SectionHeader>
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(3, 1fr)',
                                    gap: scale < 1 ? '10px' : `${sp(20)}px`,
                                    marginTop: sp(10),
                                }}
                            >
                                {skills.map((skill) => (
                                    <div key={skill.id} data-paginate="item">
                                        <CircularProgress
                                            value={skill.level ? skill.level * 20 : 80}
                                            size={scale < 1 ? 50 : sp(80)}
                                            color={accentColor}
                                            strokeWidth={scale < 1 ? 5 : sp(8)}
                                            fontSize={scale < 1 ? 8 : sp(12)}
                                            label={skill.name}
                                            labelFontSize={scale < 1 ? 8 : sp(11)}
                                            scale={1}
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Strengths (Bars) */}
                    {strengths && strengths.length > 0 && (
                        <section className="resume-section" style={{ marginBottom: sp(16) }}>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon={<Code size={parseInt(fs.sectionHeading)} color={accentColor} />} sp={sp}>
                                {t.sections.strengths}
                            </SectionHeader>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: sp(12) }}>
                                {strengths.map((str) => (
                                    <div key={str.id} data-paginate="item">
                                        <ProgressBar
                                            label={str.name}
                                            value={(str as any).level ?? 80}
                                            color={accentColor}
                                            height={scale < 1 ? 6 : sp(10)}
                                            scale={1}
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Interests */}
                    {data.interests && data.interests.length > 0 && (
                        <section className="resume-section" style={{ marginBottom: sp(16) }}>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon={<Star size={parseInt(fs.sectionHeading)} color={accentColor} />} sp={sp}>
                                {t.sections.interests}
                            </SectionHeader>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: sp(10) }}>
                                {data.interests.map((int) => (
                                    <span key={int.id} data-paginate="item" style={{ fontSize: fs.body, fontWeight: 500, color: '#4b5563' }}>
                                        {int.name}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Credentials (Certifications & Awards) */}
                    {((certifications && certifications.length > 0) || (awards && awards.length > 0)) && (
                        <section className="resume-section">
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon={<Award size={parseInt(fs.sectionHeading)} color={accentColor} />} sp={sp}>
                                {t.sections.credentials}
                            </SectionHeader>

                            {certifications && certifications.length > 0 && (
                                <div style={{ marginBottom: awards && awards.length > 0 ? sp(16) : 0 }}>
                                    <h4 style={{ fontSize: fs.small, fontWeight: 600, color: '#6b7280', marginBottom: sp(8) }}>
                                        {t.sections.certifications}
                                    </h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: sp(8) }}>
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
                                    <h4 style={{ fontSize: fs.small, fontWeight: 600, color: '#6b7280', marginBottom: sp(8) }}>
                                        {t.sections.awards}
                                    </h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: sp(8) }}>
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
                    {(personalInfo.x || personalInfo.github || personalInfo.dribbble || personalInfo.behance || personalInfo.instagram) && (
                        <section className="resume-section" style={{ marginBottom: sp(16) }}>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon={<Link size={parseInt(fs.sectionHeading)} color={accentColor} />} sp={sp}>
                                {t.sections.socialLinks}
                            </SectionHeader>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: sp(8) }}>
                                {personalInfo.x && (
                                    <div data-paginate="item" style={{ display: 'flex', alignItems: 'center', gap: sp(8), fontSize: fs.body }}>
                                        <Twitter size={sp(14)} color={accentColor} />
                                        <span style={{ color: '#374151' }}>{personalInfo.x}</span>
                                    </div>
                                )}
                                {personalInfo.github && (
                                    <div data-paginate="item" style={{ display: 'flex', alignItems: 'center', gap: sp(8), fontSize: fs.body }}>
                                        <Github size={sp(14)} color={accentColor} />
                                        <span style={{ color: '#374151' }}>{personalInfo.github}</span>
                                    </div>
                                )}
                                {personalInfo.dribbble && (
                                    <div data-paginate="item" style={{ display: 'flex', alignItems: 'center', gap: sp(8), fontSize: fs.body }}>
                                        <Dribbble size={sp(14)} color={accentColor} />
                                        <span style={{ color: '#374151' }}>{personalInfo.dribbble}</span>
                                    </div>
                                )}
                                {personalInfo.behance && (
                                    <div data-paginate="item" style={{ display: 'flex', alignItems: 'center', gap: sp(8), fontSize: fs.body }}>
                                        <Palette size={sp(14)} color={accentColor} />
                                        <span style={{ color: '#374151' }}>{personalInfo.behance}</span>
                                    </div>
                                )}
                                {personalInfo.instagram && (
                                    <div data-paginate="item" style={{ display: 'flex', alignItems: 'center', gap: sp(8), fontSize: fs.body }}>
                                        <Camera size={sp(14)} color={accentColor} />
                                        <span style={{ color: '#374151' }}>{personalInfo.instagram}</span>
                                    </div>
                                )}
                            </div>
                        </section>
                    )}

                    {/* References */}
                    {references && references.length > 0 && (
                        <section className="resume-section" style={{ marginBottom: sp(16) }}>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon={<Users size={parseInt(fs.sectionHeading)} color={accentColor} />} sp={sp}>
                                {t.sections.references}
                            </SectionHeader>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: sp(12) }}>
                                {references.map((ref) => (
                                    <div key={ref.id} data-paginate="item">
                                        <div style={{ fontWeight: 700, fontSize: fs.body, color: '#1f2937' }}>{ref.name}</div>
                                        <div style={{ fontSize: fs.small, color: accentColor, fontWeight: 600 }}>
                                            {ref.title}{ref.company && `, ${ref.company}`}
                                        </div>
                                        {(ref.email || ref.phone) && (
                                            <div style={{ fontSize: fs.small, color: '#6b7280', marginTop: sp(2) }}>
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

                    {/* Custom Fields */}
                    {customFields?.map((field) => (
                        <section key={field.id} className="resume-section" style={{ marginBottom: sp(16) }}>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} icon={<ClipboardList size={parseInt(fs.sectionHeading)} color={accentColor} />} sp={sp}>
                                {field.label}
                            </SectionHeader>
                            <p style={{ fontSize: fs.body, color: '#374151', lineHeight: 1.6 }}>
                                {field.content}
                            </p>
                        </section>
                    ))}
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
    sp: (px: number) => number;
}

function ProfileAvatar({ profileImage, fullName, size, accentColor, headingFont, sp }: ProfileAvatarProps) {
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
                    border: `${sp(3)}px solid ${accentColor}`,
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
                border: `${sp(3)}px solid ${accentColor}`,
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
    icon: ReactNode;
    children: React.ReactNode;
    sp: (px: number) => number;
}

function SectionHeader({ fs, headingFont, accentColor, icon, children, sp }: SectionHeaderProps) {
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
                marginBottom: isSmall ? sp(8) : sp(14),
                display: 'flex',
                alignItems: 'center',
                gap: isSmall ? sp(4) : sp(8),
            }}
        >
            {icon}
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

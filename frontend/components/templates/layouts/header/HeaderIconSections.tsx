'use client';

import { memo } from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';
import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes, translateProficiency } from '../../shared/styleHelpers';
import ProgressBar from '../../shared/ProgressBar';
import { useTemplateTranslations } from '@/lib/templates/TranslationContext';

/**
 * Header Icon Sections Template
 * Stacked sections where each section is enclosed in a box with a black border.
 * Distinctive Cyan background and Orange accents.
 *
 * Layout:
 * - Page Background: Cyan 50 (#ecfeff)
 * - Header: Photo Left, Name Right
 * - Body: Single Column, Stacked Boxes
 * - Stylus: Black borders around everything.
 *
 * Matches reference: frontend/Resume-template/unique-layouts/27-icon-section-headers.webp 
 * (Note: Reference name implies icons, but description highlights the Boxes & Cyan)
 */
function HeaderIconSections({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, strengths, awards, certifications, customFields, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Merriweather');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];
    const t = useTemplateTranslations();

    // Get scaled font sizes
    const fs = getScaledFontSizes(sizeConfig, scale);

    // Scaled Spacing
    const sp = {
        xs: 4 * scale,
        sm: 8 * scale,
        md: 12 * scale,
        lg: 16 * scale,
        xl: 24 * scale,
        xxl: 32 * scale,
    };

    // Colors
    const orangeAccent = customThemeColor || '#ea580c'; // Orange 600
    const pageBg = '#ecfeff'; // Cyan 50
    const borderColor = '#000000';

    // Dimensions
    // Proportional photo size to match PDF look
    const photoSize = 140 * scale;

    return (
        <div
            className="w-full h-full"
            style={{
                fontFamily: bodyFont,
                fontSize: sizeConfig.base,
                backgroundColor: pageBg,
                color: '#000000',
                padding: sp.xxl,
            }}
        >
            {/* Header Box */}
            <header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: sp.xxl,
                    border: `1px solid ${borderColor}`,
                    backgroundColor: '#ffffff',
                    padding: sp.xxl,
                    marginBottom: sp.xxl,
                    boxShadow: '4px 4px 0px 0px rgba(0,0,0,0.1)', // Subtle shadow
                }}
            >
                {/* Photo */}
                <div style={{ flexShrink: 0 }}>
                    {personalInfo.profileImage ? (
                        <div style={{
                            width: photoSize,
                            height: photoSize,
                            borderRadius: '50%',
                            border: `2px solid ${orangeAccent}`,
                            padding: sp.xs,
                            overflow: 'hidden'
                        }}>
                            <img
                                src={personalInfo.profileImage}
                                alt={personalInfo.fullName}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '50%',
                                }}
                            />
                        </div>
                    ) : (
                        <div
                            style={{
                                width: photoSize,
                                height: photoSize,
                                borderRadius: '50%',
                                border: `2px solid ${orangeAccent}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: fs.name,
                                color: orangeAccent,
                                backgroundColor: '#fff7ed',
                            }}
                        >
                            {personalInfo.fullName?.charAt(0) || '?'}
                        </div>
                    )}
                </div>

                {/* Name & Contact */}
                <div style={{ flex: 1 }}>
                    <h1
                        style={{
                            fontFamily: headingFont,
                            fontSize: fs.name,
                            fontWeight: 700,
                            color: '#000000',
                            marginBottom: sp.sm,
                            lineHeight: 1.1,
                        }}
                    >
                        {personalInfo.fullName || 'Your Name'}
                    </h1>
                    <p
                        style={{
                            fontSize: fs.jobTitle,
                            color: orangeAccent,
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            marginBottom: sp.md,
                            letterSpacing: '0.05em'
                        }}
                    >
                        {personalInfo.jobTitle || 'Job Title'}
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: `${sp.sm}px ${sp.lg}px`, fontSize: fs.small, color: '#4b5563', alignItems: 'center' }}>
                        {personalInfo.email && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Mail size={12} color="#4b5563" /> {personalInfo.email}</span>}
                        {personalInfo.phone && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Phone size={12} color="#4b5563" /> {personalInfo.phone}</span>}
                        {personalInfo.location && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={12} color="#4b5563" /> {personalInfo.location}</span>}
                        {personalInfo.website && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Globe size={12} color="#4b5563" /> {personalInfo.website}</span>}
                        {personalInfo.linkedin && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Linkedin size={12} color="#4b5563" /> {personalInfo.linkedin}</span>}
                    </div>
                </div>
            </header>

            {/* Profile Section */}
            {personalInfo.summary && (
                <BoxSection borderColor={borderColor} title={t.sections.profile} icon="👤" accent={orangeAccent} fs={fs} headingFont={headingFont} sp={sp} scale={scale}>
                    <p style={{ lineHeight: 1.6 }}>{personalInfo.summary}</p>
                </BoxSection>
            )}

            {/* Experience Section */}
            {experience.length > 0 && (
                <BoxSection borderColor={borderColor} title={t.sections.experience} icon="💼" accent={orangeAccent} fs={fs} headingFont={headingFont} sp={sp} scale={scale}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: sp.xl }}>
                        {experience.map((exp) => (
                            <div key={exp.id} data-paginate="item">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: sp.xs }}>
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle }}>{exp.title}</h4>
                                    <span style={{ fontSize: fs.small, fontWeight: 600, color: orangeAccent }}>
                                        {exp.startDate} – {exp.current ? t.labels.present : exp.endDate}
                                    </span>
                                </div>
                                <p style={{ fontSize: fs.body, fontStyle: 'italic', marginBottom: 6 * scale, color: '#525252' }}>
                                    {exp.company}{(exp.city || exp.country) && `, ${[exp.city, exp.country].filter(Boolean).join(', ')}`}
                                </p>
                                <p style={{ fontSize: fs.body, lineHeight: 1.5 }}>
                                    {exp.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </BoxSection>
            )}

            {/* Education Section */}
            {education.length > 0 && (
                <BoxSection borderColor={borderColor} title={t.sections.education} icon="🎓" accent={orangeAccent} fs={fs} headingFont={headingFont} sp={sp} scale={scale}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 * scale }}>
                        {education.map((edu) => (
                            <div key={edu.id} data-paginate="item">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: sp.xs }}>
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle }}>
                                        {edu.degree}
                                        {edu.gpa && <span style={{ marginLeft: 8, opacity: 0.8, fontWeight: 500, fontSize: fs.body }}>{ t.labels.gpa || 'GPA' }: {edu.gpa}</span>}
                                    </h4>
                                    <span style={{ fontSize: fs.small, fontWeight: 600, color: orangeAccent }}>
                                        {edu.startDate} – {edu.endDate || t.labels.present}
                                    </span>
                                </div>
                                <p style={{ fontSize: fs.body, fontStyle: 'italic', color: '#525252' }}>
                                    {edu.school}{(edu.city || edu.country) && `, ${[edu.city, edu.country].filter(Boolean).join(', ')}`}
                                </p>
                                {edu.honors && (
                                    <p style={{ fontSize: fs.small, color: '#525252', opacity: 0.8 }}>{edu.honors}</p>
                                )}
                                {edu.clubs && (
                                    <p style={{ fontSize: fs.small, color: '#6b7280', opacity: 0.7 }}>{ t.labels.activities || 'Activities' }: {edu.clubs}</p>
                                )}
                                {edu.description && (
                                    <p style={{ fontSize: fs.small || fs.body, lineHeight: 1.5, color: '#4b5563', marginTop: '4px' }}>{edu.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </BoxSection>
            )}

            {/* Skills Section */}
            {skills.length > 0 && (
                <BoxSection borderColor={borderColor} title={t.sections.skills} icon="⚙️" accent={orangeAccent} fs={fs} headingFont={headingFont} sp={sp} scale={scale}>
                    <div>
                        {skills.map((skill) => (
                            <div key={skill.id} data-paginate="item" style={{ marginBottom: sp.md }}>
                                <ProgressBar
                                    label={skill.name}
                                    value={skill.level ? skill.level * 20 : 80}
                                    color={orangeAccent}
                                    height={8 * scale}
                                    scale={scale}
                                />
                            </div>
                        ))}
                    </div>
                </BoxSection>
            )}

            {/* Strengths Section */}
            {(strengths && strengths.length > 0) && (
                <BoxSection borderColor={borderColor} title={t.sections.strengths} icon="⭐" accent={orangeAccent} fs={fs} headingFont={headingFont} sp={sp} scale={scale}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: sp.sm }}>
                        {strengths.map((str) => (
                            <span key={str.id} data-paginate="item" style={{
                                backgroundColor: '#fff7ed',
                                color: orangeAccent,
                                border: `1px solid ${orangeAccent}`,
                                padding: `${4 * scale}px ${12 * scale}px`,
                                borderRadius: 4 * scale,
                                fontSize: fs.small,
                                fontWeight: 600
                            }}>
                                {str.name}
                            </span>
                        ))}
                    </div>
                </BoxSection>
            )}

            {/* Languages Section */}
            {data.languages && data.languages.length > 0 && (
                <BoxSection borderColor={borderColor} title={t.sections.languages} icon="🗣️" accent={orangeAccent} fs={fs} headingFont={headingFont} sp={sp} scale={scale}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: sp.sm }}>
                        {data.languages.map((lang) => (
                            <div key={lang.id} data-paginate="item" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f3f4f6', paddingBottom: 4 * scale }}>
                                <span style={{ fontWeight: 600 }}>{lang.name}</span>
                                <span style={{ color: '#6b7280', textTransform: 'capitalize' }}>{translateProficiency(lang.proficiency, t.labels)}</span>
                            </div>
                        ))}
                    </div>
                </BoxSection>
            )}

            {/* Interests Section */}
            {data.interests && data.interests.length > 0 && (
                <BoxSection borderColor={borderColor} title={t.sections.interests} icon="🎨" accent={orangeAccent} fs={fs} headingFont={headingFont} sp={sp} scale={scale}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: sp.md }}>
                        {data.interests.map((int) => (
                            <span key={int.id} data-paginate="item" style={{ display: 'flex', alignItems: 'center', gap: 6 * scale }}>
                                <span style={{ color: orangeAccent }}>★</span> {int.name}
                            </span>
                        ))}
                    </div>
                </BoxSection>
            )}

            {/* Personal Details */}
            {(personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber)) && (
                <BoxSection borderColor={borderColor} title={t.sections.personalDetails} icon="📝" accent={orangeAccent} fs={fs} headingFont={headingFont} sp={sp} scale={scale}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: sp.sm }}>
                        {personalInfo.nationality && (
                            <div data-paginate="item"><span style={{ fontWeight: 600 }}>{t.labels.nationality}:</span> {personalInfo.nationality}</div>
                        )}
                        {personalInfo.idType && personalInfo.idNumber && (
                            <div data-paginate="item">
                                <span style={{ fontWeight: 600 }}>
                                    {personalInfo.idType === 'id' ? t.labels.id :
                                        personalInfo.idType === 'passport' ? t.labels.passport :
                                            personalInfo.idType === 'driving_license' ? t.labels.drivingLicense : t.labels.id}:
                                </span> {personalInfo.idNumber}
                            </div>
                        )}
                    </div>
                </BoxSection>
            )}

            {/* Credentials (Certifications & Awards) */}
            {((certifications && certifications.length > 0) || (awards && awards.length > 0)) && (
                <BoxSection borderColor={borderColor} title={t.sections.credentials} icon="🏆" accent={orangeAccent} fs={fs} headingFont={headingFont} sp={sp} scale={scale}>
                    <div style={{ display: 'flex', gap: sp.xxl }}>
                        {certifications && certifications.length > 0 && (
                            <div style={{ flex: 1 }}>
                                <h4 style={{ fontSize: fs.small, fontWeight: 600, color: '#6b7280', marginBottom: sp.sm }}>
                                    {t.sections.certifications}
                                </h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: sp.sm }}>
                                    {certifications.map((cert) => (
                                        <div key={cert.id} data-paginate="item">
                                            <div style={{ fontWeight: 600, fontSize: fs.body }}>{cert.name}</div>
                                            <div style={{ fontSize: fs.small, color: '#6b7280' }}>{cert.issuer} • {cert.date}</div>
                                            {cert.url && <div style={{ fontSize: fs.small, color: '#6b7280', opacity: 0.7 }}>{cert.url}</div>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {awards && awards.length > 0 && (
                            <div style={{ flex: 1 }}>
                                <h4 style={{ fontSize: fs.small, fontWeight: 600, color: '#6b7280', marginBottom: sp.sm }}>
                                    {t.sections.awards}
                                </h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: sp.sm }}>
                                    {awards.map((award) => (
                                        <div key={award.id} data-paginate="item">
                                            <div style={{ fontWeight: 600, fontSize: fs.body }}>{award.title}</div>
                                            <div style={{ fontSize: fs.small, color: '#6b7280' }}>{award.issuer} • {award.date}</div>
                                        
                                            {award.description && (
                                                <p style={{ fontSize: fs.small || fs.body, lineHeight: 1.5, color: '#4b5563', marginTop: '4px' }}>{award.description}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </BoxSection>
            )}

            {/* Social Links */}
            {(personalInfo.x || personalInfo.github || personalInfo.dribbble || personalInfo.behance || personalInfo.instagram) && (
                <BoxSection borderColor={borderColor} title={t.sections.socialLinks} icon="🔗" accent={orangeAccent} fs={fs} headingFont={headingFont} sp={sp} scale={scale}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: sp.sm }}>
                        {personalInfo.x && <div data-paginate="item"><span style={{ fontWeight: 600 }}>X:</span> {personalInfo.x}</div>}
                        {personalInfo.github && <div data-paginate="item"><span style={{ fontWeight: 600 }}>GitHub:</span> {personalInfo.github}</div>}
                        {personalInfo.dribbble && <div data-paginate="item"><span style={{ fontWeight: 600 }}>Dribbble:</span> {personalInfo.dribbble}</div>}
                        {personalInfo.behance && <div data-paginate="item"><span style={{ fontWeight: 600 }}>Behance:</span> {personalInfo.behance}</div>}
                        {personalInfo.instagram && <div data-paginate="item"><span style={{ fontWeight: 600 }}>Instagram:</span> {personalInfo.instagram}</div>}
                    </div>
                </BoxSection>
            )}

            {/* Custom Fields */}
            {customFields?.map((field) => (
                <BoxSection key={field.id} borderColor={borderColor} title={field.label} icon="📌" accent={orangeAccent} fs={fs} headingFont={headingFont} sp={sp} scale={scale}>
                    <p style={{ lineHeight: 1.6 }}>{field.content}</p>
                </BoxSection>
            ))}

        </div>
    );
}

// Reusable Boxed Section
interface BoxSectionProps {
    borderColor: string;
    title: string;
    icon: string;
    accent: string;
    fs: ScaledFontSizes;
    headingFont: string;
    scale: number;
    sp: { xs: number, sm: number, md: number, lg: number, xl: number, xxl: number };
    children: React.ReactNode;
}

function BoxSection({ borderColor, title, icon, accent, fs, headingFont, scale, sp, children }: BoxSectionProps) {
    return (
        <section
            className="resume-section"
            style={{ marginBottom: sp.lg }}
        >
            <div data-paginate="item">
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: sp.md,
                    border: `1px solid ${borderColor}`,
                    backgroundColor: '#ffffff',
                    padding: `${sp.sm}px ${sp.lg}px`,
                    boxShadow: '4px 4px 0px 0px rgba(0,0,0,0.1)',
                    marginBottom: sp.md,
                }}>
                    <span style={{
                        backgroundColor: accent,
                        color: 'white',
                        width: 32 * scale,
                        height: 32 * scale,
                        minWidth: 32 * scale,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 16 * scale
                    }}>
                        {icon}
                    </span>
                    <span style={{
                        fontFamily: headingFont,
                        fontSize: fs.sectionHeading,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: '#1f2937'
                    }}>
                        {title}
                    </span>
                </div>
            </div>
            <div style={{ fontSize: fs.body }}>
                {children}
            </div>
        </section>
    );
}

// Wrap with memo to prevent unnecessary re-renders
export default memo(HeaderIconSections);

// Template metadata
export const headerIconSectionsMeta: TemplateMeta = {
    id: 'header-icon-sections',
    name: 'Icon Sections',
    category: 'header',
    thumbnail: '/templates/header-icon-sections.png',
    description: 'Distinctive layout with boxed sections and cyan background',
};

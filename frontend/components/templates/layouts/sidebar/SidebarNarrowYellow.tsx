'use client';

import { memo } from 'react';
import { Phone, Mail, MapPin, Globe } from 'lucide-react';
import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';
import ProgressBar from '../../shared/ProgressBar';
import { useTemplateTranslations } from '@/lib/templates/TranslationContext';

/**
 * Sidebar Narrow Yellow Template
 * Reference: sidebar-narrow-yellow.webp
 * 
 * Layout:
 * - Sidebar: ~20% width (Narrow), Left. Yellow 400 (#facc15).
 * - Main: 80% width. White.
 * - Sidebar Text: Dark Gray.
 * - Content: Icons only or minimal text in sidebar.
 */
function SidebarNarrowYellow({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, certifications, awards, references, customFields, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Oswald');
    const bodyFont = getFontFamily(fonts?.body || 'Roboto Condensed');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes
    const fs = getScaledFontSizes(sizeConfig, scale);
    const t = useTemplateTranslations();

    // Colors
    const sidebarBg = '#facc15'; // Yellow 400
    const mainBg = '#FFFFFF';
    const sidebarText = '#1f2937';
    const mainText = '#1f2937';

    // Dimensions
    const photoSize = scale < 1 ? 60 : 100;
    const sidebarWidth = '30%'; // Wider sidebar to fit skills with levels and interests

    return (
        <div
            className="w-full h-full"
            style={{
                fontFamily: bodyFont,
                fontSize: sizeConfig.base,
                backgroundColor: mainBg,
                color: mainText,
                display: 'flex',
                flexDirection: 'row',
                boxSizing: 'border-box'
            }}
        >
            {/* Sidebar */}
            <aside
                style={{
                    width: sidebarWidth,
                    backgroundColor: sidebarBg,
                    color: sidebarText,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: scale < 1 ? '32px 12px' : '56px 20px',
                    flexShrink: 0,
                    minHeight: '100%',
                    alignItems: 'center'
                }}
            >
                {/* Photo */}
                <div style={{ marginBottom: scale < 1 ? 32 : 56 }}>
                    {personalInfo.profileImage ? (
                        <img
                            src={personalInfo.profileImage}
                            alt={personalInfo.fullName}
                            style={{
                                width: photoSize,
                                height: photoSize,
                                borderRadius: '50%',
                                objectFit: 'cover',
                                border: `4px solid #1f2937`,
                            }}
                        />
                    ) : (
                        <div
                            style={{
                                width: photoSize,
                                height: photoSize,
                                borderRadius: '50%',
                                backgroundColor: '#1f2937',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: fs.name,
                                color: '#facc15',
                            }}
                        >
                            {personalInfo.fullName?.charAt(0) || '?'}
                        </div>
                    )}
                </div>

                {/* Contact */}
                <div style={{ marginBottom: 40, width: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: fs.small }}>
                        {personalInfo.phone && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <Phone size={14} color={sidebarText} />
                                <span>{personalInfo.phone}</span>
                            </div>
                        )}
                        {personalInfo.email && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <Mail size={14} color={sidebarText} />
                                <span style={{ wordBreak: 'break-all' }}>{personalInfo.email}</span>
                            </div>
                        )}
                        {personalInfo.location && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <MapPin size={14} color={sidebarText} />
                                <span>{personalInfo.location}</span>
                            </div>
                        )}
                        {personalInfo.website && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <Globe size={14} color={sidebarText} />
                                <span style={{ wordBreak: 'break-all' }}>{personalInfo.website}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Skills with proficiency levels */}
                {skills.length > 0 && (
                    <div style={{ width: '100%', marginBottom: 32 }}>
                        <SidebarHeader title={t.sections.skills} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {skills.map((skill) => (
                                <div key={skill.id} data-paginate="item">
                                    <div style={{ marginBottom: 4, fontSize: fs.small, fontWeight: 600 }}>{skill.name}</div>
                                    <ProgressBar
                                        value={skill.level || 3}
                                        maxValue={5}
                                        variant="solid"
                                        color="#1f2937"
                                        trackColor="rgba(31, 41, 55, 0.2)"
                                        height={6}
                                        scale={1}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Interests */}
                {data.interests && data.interests.length > 0 && (
                    <div style={{ width: '100%' }}>
                        <SidebarHeader title={t.sections.interests} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: fs.small }}>
                            {data.interests.map((int) => (
                                <div key={int.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <span style={{ color: '#1f2937', fontSize: '8px' }}>●</span>
                                    <span style={{ fontWeight: 500 }}>{int.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </aside>

            {/* Main Content */}
            <main
                style={{
                    flex: 1,
                    padding: scale < 1 ? '32px 24px' : '56px 40px',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* Header */}
                <div style={{ marginBottom: scale < 1 ? 40 : 64 }}>
                    <h1
                        style={{
                            fontFamily: headingFont,
                            fontSize: scale < 1 ? '32px' : '56px', // Massive name
                            fontWeight: 800,
                            color: '#1f2937',
                            textTransform: 'uppercase',
                            margin: 0,
                            lineHeight: 0.9,
                            marginBottom: 8,
                        }}
                    >
                        {personalInfo.fullName}
                    </h1>
                    <p
                        style={{
                            fontSize: fs.jobTitle,
                            color: '#ca8a04', // Darker yellow
                            textTransform: 'uppercase',
                            fontWeight: 700,
                            letterSpacing: '0.2em'
                        }}
                    >
                        {personalInfo.jobTitle}
                    </p>
                </div>

                {/* Profile */}
                {personalInfo.summary && (
                    <section className="mb-10 resume-section">
                        <MainHeader title={t.sections.profile} color={'#1f2937'} fs={fs} headingFont={headingFont} />
                        <p style={{ lineHeight: 1.6, fontSize: fs.body, color: '#374151' }}>
                            {personalInfo.summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <section className="mb-10 resume-section">
                        <MainHeader title={t.sections.experience} color={'#1f2937'} fs={fs} headingFont={headingFont} />
                        <div className="space-y-8">
                            {experience.map((exp) => (
                                <div key={exp.id}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                                        <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#000', textTransform: 'uppercase' }}>
                                            {exp.title}
                                        </h4>
                                        <span style={{ fontSize: fs.small, color: '#ca8a04', fontWeight: 700 }}>{exp.startDate} – {exp.current ? t.labels.present : exp.endDate}</span>
                                    </div>
                                    <div style={{ fontSize: fs.small, color: '#4b5563', marginBottom: 6, fontWeight: 600 }}>
                                        {exp.company}, {exp.city}
                                    </div>
                                    <p style={{ fontSize: fs.body, lineHeight: 1.6, color: '#374151' }}>
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <section className="mb-10 resume-section">
                        <MainHeader title={t.sections.education} color={'#1f2937'} fs={fs} headingFont={headingFont} />
                        <div className="space-y-4">
                            {education.map((edu) => (
                                <div key={edu.id}>
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#000', textTransform: 'uppercase' }}>
                                        {edu.degree}
                                    </h4>
                                    <div style={{ fontSize: fs.body, color: '#4b5563' }}>
                                        {edu.school}, {edu.city}
                                    </div>
                                    <div style={{ fontSize: fs.small, color: '#666' }}>
                                        {edu.startDate} – {edu.endDate || t.labels.present}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
                {/* Certifications */}
                {certifications && certifications.length > 0 && (
                    <section className="mb-10 resume-section" data-paginate="section">
                        <MainHeader title={t.sections.certifications} color={'#1f2937'} fs={fs} headingFont={headingFont} />
                        <div className="space-y-3">
                            {certifications.map((cert) => (
                                <div key={cert.id} data-paginate="item">
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#000' }}>
                                        {cert.name}
                                    </h4>
                                    <div style={{ fontSize: fs.body, color: '#ca8a04', fontWeight: 500 }}>
                                        {cert.issuer}
                                    </div>
                                    <div style={{ fontSize: fs.small, color: '#666' }}>
                                        {cert.date}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Awards */}
                {awards && awards.length > 0 && (
                    <section className="mb-10 resume-section" data-paginate="section">
                        <MainHeader title={t.sections.awards} color={'#1f2937'} fs={fs} headingFont={headingFont} />
                        <div className="space-y-3">
                            {awards.map((award) => (
                                <div key={award.id} data-paginate="item">
                                    <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#000' }}>
                                        {award.title}
                                    </h4>
                                    <div style={{ fontSize: fs.body, color: '#ca8a04', fontWeight: 500 }}>
                                        {award.issuer}
                                    </div>
                                    <div style={{ fontSize: fs.small, color: '#666' }}>
                                        {award.date}
                                    </div>
                                    {award.description && (
                                        <p style={{ fontSize: fs.body, lineHeight: 1.5, color: '#374151', marginTop: 4 }}>
                                            {award.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Languages */}
                {languages && languages.length > 0 && (
                    <section className="mb-10 resume-section" data-paginate="section">
                        <MainHeader title={t.sections.languages} color={'#1f2937'} fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 24px' }}>
                            {languages.map((lang) => (
                                <div key={lang.id} style={{ fontSize: fs.body, fontWeight: 700, color: '#374151' }} data-paginate="item">
                                    {lang.name} <span style={{ fontWeight: 400, opacity: 0.8 }}>({lang.proficiency})</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Strengths */}
                {data.strengths && data.strengths.length > 0 && (
                    <section className="mb-10 resume-section" data-paginate="section">
                        <MainHeader title={t.sections.strengths} color={'#1f2937'} fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                            {data.strengths.map((str) => (
                                <span key={str.id} style={{
                                    backgroundColor: '#facc15',
                                    color: '#1f2937',
                                    padding: '4px 12px',
                                    borderRadius: 20,
                                    fontSize: fs.small,
                                    fontWeight: 700
                                }}>
                                    {str.name}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* Social Links */}
                {(personalInfo.linkedin || personalInfo.x || personalInfo.github || personalInfo.dribbble || personalInfo.behance || personalInfo.instagram) && (
                    <section className="mb-10 resume-section" data-paginate="section">
                        <MainHeader title={t.sections.socialLinks} color={'#1f2937'} fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: fs.body }}>
                            {personalInfo.linkedin && <div><span style={{ fontWeight: 600 }}>LinkedIn:</span> {personalInfo.linkedin}</div>}
                            {personalInfo.x && <div><span style={{ fontWeight: 600 }}>X:</span> {personalInfo.x}</div>}
                            {personalInfo.github && <div><span style={{ fontWeight: 600 }}>GitHub:</span> {personalInfo.github}</div>}
                            {personalInfo.dribbble && <div><span style={{ fontWeight: 600 }}>Dribbble:</span> {personalInfo.dribbble}</div>}
                            {personalInfo.behance && <div><span style={{ fontWeight: 600 }}>Behance:</span> {personalInfo.behance}</div>}
                            {personalInfo.instagram && <div><span style={{ fontWeight: 600 }}>Instagram:</span> {personalInfo.instagram}</div>}
                        </div>
                    </section>
                )}

                {/* References */}
                {references && references.length > 0 && (
                    <section className="mb-10 resume-section" data-paginate="section">
                        <MainHeader title={t.sections.references} color={'#1f2937'} fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {references.map((ref) => (
                                <div key={ref.id} data-paginate="item">
                                    <div style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#000' }}>{ref.name}</div>
                                    <div style={{ fontSize: fs.body, color: '#4b5563' }}>{ref.title}, {ref.company}</div>
                                    {ref.email && <div style={{ fontSize: fs.small, color: '#666' }}>{ref.email}</div>}
                                    {ref.phone && <div style={{ fontSize: fs.small, color: '#666' }}>{ref.phone}</div>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Personal Details */}
                {(personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber)) && (
                    <section className="mb-10 resume-section" data-paginate="section">
                        <MainHeader title={t.sections.personalDetails} color={'#1f2937'} fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: fs.body }}>
                            {personalInfo.nationality && (
                                <div><span style={{ fontWeight: 600 }}>Nationality:</span> {personalInfo.nationality}</div>
                            )}
                            {personalInfo.idType && personalInfo.idNumber && (
                                <div>
                                    <span style={{ fontWeight: 600 }}>
                                        {personalInfo.idType === 'id' ? 'ID' :
                                         personalInfo.idType === 'passport' ? 'Passport' :
                                         personalInfo.idType === 'driving_license' ? 'Driving License' : 'ID'}:
                                    </span> {personalInfo.idNumber}
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {/* Custom Fields */}
                {customFields?.map((field) => (
                    <section key={field.id} className="mb-10 resume-section" data-paginate="section">
                        <MainHeader title={field.label} color={'#1f2937'} fs={fs} headingFont={headingFont} />
                        <p style={{ fontSize: fs.body, lineHeight: 1.6, color: '#374151' }}>{field.content}</p>
                    </section>
                ))}

            </main>
        </div>
    );
}

// Helpers
function SidebarHeader({ title }: { title: string }) {
    return (
        <h4 style={{
            fontWeight: 800,
            textTransform: 'uppercase',
            marginBottom: 12,
            borderBottom: '2px solid #1f2937',
            paddingBottom: 4,
            fontSize: '12px',
            letterSpacing: '0.05em'
        }}>
            {title}
        </h4>
    );
}

function MainHeader({ title, color, fs, headingFont }: { title: string, color: string, fs: ScaledFontSizes, headingFont: string }) {
    return (
        <h3
            style={{
                fontFamily: headingFont,
                fontSize: fs.sectionHeading,
                fontWeight: 800,
                color: color,
                textTransform: 'uppercase',
                marginBottom: 20,
                borderBottom: `4px solid #facc15`, // Thick yellow underline
                display: 'inline-block',
                paddingBottom: 4
            }}
        >
            {title}
        </h3>
    );
}

export default memo(SidebarNarrowYellow);

// Meta
export const sidebarNarrowYellowMeta: TemplateMeta = {
    id: 'sidebar-narrow-yellow',
    name: 'Narrow Yellow Sidebar',
    category: 'sidebar',
    thumbnail: '/templates/sidebar-narrow-yellow.webp',
    description: 'High impact narrow yellow sidebar with icon focus',
};

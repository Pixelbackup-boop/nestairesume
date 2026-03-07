'use client';

import React, { memo } from 'react';
import {
    User, Briefcase, GraduationCap, Award, Settings, Star, Languages, Zap, Link,
    ClipboardList, FileText, Music, Camera, BookOpen, Plane, CookingPot,
    Gamepad2, Film, Palette, Bike, Sprout, Coffee, Wine
} from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonRunning, faPersonSwimming, faPersonHiking, faPersonPraying, faPersonSkiing } from '@fortawesome/free-solid-svg-icons';
import { TemplateProps, TemplateMeta } from '../../shared/types';
import { ScaledFontSizes } from '../../shared/styleHelpers';
import ProgressBar from '../../shared/ProgressBar';
import { useTemplateSetup } from '@/hooks';

/**
 * Header Ribbon Yellow Template
 * Yellow ribbon banner with circular photo overlapping at top.
 * Two-column layout with awards and interests section.
 *
 * Layout:
 * - Circular photo at top center (overlapping ribbon)
 * - Yellow ribbon banner with name
 * - Contact info centered below
 * - Two-column body: Left (Profile, Experience, Education), Right (Awards, Skills, Interests grid)
 *
 * Matches reference: frontend/Resume-template/unique-layouts/22-ribbon-banner.webp
 */
function HeaderRibbonYellow({ data, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, awards, interests, certifications, customFields, customThemeColor, fonts } = data;

    const { headingFont, bodyFont, sizeConfig, fs, t, colors } = useTemplateSetup({
        customThemeColor,
        fonts,
        scale,
        defaultPrimary: '#eab308',  // Yellow accent
        defaultHeadingFont: 'Inter',
        defaultBodyFont: 'Inter',
    });

    const sizeMult = parseInt(sizeConfig.base) / 14;
    const sp = (px: number) => Math.round(px * sizeMult);

    const iconSm = scale < 1 ? 8 : sp(10);
    const iconMd = scale < 1 ? 10 : sp(14);

    // Single color preset — use customThemeColor directly (parseDualColor puts single colors in secondary, not primary)
    const accentColor = customThemeColor || '#eab308';

    return (
        <div
            className="w-full h-full"
            style={{
                fontFamily: bodyFont,
                fontSize: sizeConfig.base,
                backgroundColor: '#ffffff',
                position: 'relative',
            }}
        >
            {/* Header Area with Photo and Diagonal Ribbon */}
            <header
                className="resume-section"
                style={{
                    textAlign: 'center',
                    paddingTop: scale < 1 ? 16 : sp(32),
                    paddingBottom: scale < 1 ? 8 : sp(16),
                }}
            >
                {/* Profile Photo */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: scale < 1 ? -5 : -5,
                        position: 'relative',
                        zIndex: 10,
                    }}
                >
                    {/* Photo with dark border only - no yellow circle */}
                    {personalInfo.profileImage ? (
                        <img
                            src={personalInfo.profileImage}
                            alt={personalInfo.fullName}
                            style={{
                                width: scale < 1 ? 60 : sp(120),
                                height: scale < 1 ? 60 : sp(120),
                                borderRadius: '50%',
                                objectFit: 'cover',
                                border: `${scale < 1 ? 3 : sp(5)}px solid #374151`,
                            }}
                        />
                    ) : (
                        <div
                            style={{
                                width: scale < 1 ? 60 : sp(120),
                                height: scale < 1 ? 60 : sp(120),
                                borderRadius: '50%',
                                backgroundColor: '#e5e7eb',
                                border: `${scale < 1 ? 3 : sp(5)}px solid #374151`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: scale < 1 ? '24px' : sp(42) + 'px',
                                color: '#9ca3af',
                                fontWeight: 700,
                            }}
                        >
                            {personalInfo.fullName?.charAt(0) || '?'}
                        </div>
                    )}
                </div>

                {/* Diagonal Parallelogram Ribbon */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginLeft: scale < 1 ? 10 : 0,
                        marginRight: scale < 1 ? 10 : 0,
                    }}
                >
                    <div
                        style={{
                            backgroundColor: accentColor,
                            height: scale < 1 ? 36 : sp(72),
                            paddingLeft: scale < 1 ? 90 : sp(180),
                            paddingRight: scale < 1 ? 90 : sp(180),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transform: 'skewX(-10deg)',
                        }}
                    >
                        {/* Name - counter-skew to keep text straight */}
                        <h1
                            style={{
                                fontFamily: headingFont,
                                fontSize: scale < 1 ? '14px' : sp(28) + 'px',
                                fontWeight: 700,
                                color: '#ffffff',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                transform: 'skewX(10deg)',
                                margin: 0,
                            }}
                        >
                            {personalInfo.fullName || 'Your Name'}
                        </h1>
                    </div>
                </div>

                {/* Contact Info */}
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: scale < 1 ? '6px' : sp(12) + 'px',
                        fontSize: fs.small,
                        color: '#6b7280',
                        marginTop: scale < 1 ? 8 : sp(16),
                    }}
                >
                    {personalInfo.phone && (
                        <span>{personalInfo.phone}</span>
                    )}
                    {personalInfo.email && (
                        <>
                            <span>|</span>
                            <span>{personalInfo.email}</span>
                        </>
                    )}
                    {personalInfo.website && (
                        <>
                            <span>|</span>
                            <span>{personalInfo.website}</span>
                        </>
                    )}
                    {personalInfo.linkedin && (
                        <>
                            <span>|</span>
                            <span>{personalInfo.linkedin}</span>
                        </>
                    )}
                </div>

            </header>

            {/* Two-Column Body */}
            <div
                style={{
                    display: 'flex',
                    gap: scale < 1 ? 12 : sp(24),
                    padding: scale < 1 ? '0 16px 16px' : `0 ${sp(32)}px ${sp(32)}px`,
                }}
            >
                {/* LEFT COLUMN - Profile, Experience, Education */}
                <div style={{ width: '55%' }}>
                    {/* Profile / Summary */}
                    {personalInfo.summary && (
                        <section className="resume-section" style={{ marginBottom: sp(16) }}>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} sp={sp} icon={<User size={iconMd} color="#ffffff" />}>
                                {t.sections.profile}
                            </SectionHeader>
                            <p style={{ color: '#374151', lineHeight: 1.6, fontSize: fs.body }}>
                                {personalInfo.summary}
                            </p>
                        </section>
                    )}

                    {/* Work Experience */}
                    {experience.length > 0 && (
                        <section className="resume-section" style={{ marginBottom: sp(16) }}>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} sp={sp} icon={<Briefcase size={iconMd} color="#ffffff" />}>
                                {t.sections.experience}
                            </SectionHeader>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: sp(12) + 'px' }}>
                                {experience.map((exp) => (
                                    <div key={exp.id} className="resume-entry" data-paginate="item">
                                        <p style={{ fontSize: fs.tiny, color: '#6b7280', marginBottom: sp(2), textTransform: 'uppercase' }}>
                                            {exp.startDate} – {exp.current ? t.labels.present : exp.endDate}
                                            {(exp.city || exp.country) && `    ${[exp.city, exp.country].filter(Boolean).join(', ').toUpperCase()}`}
                                        </p>
                                        <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#1f2937', marginBottom: sp(1) }}>
                                            {exp.title}
                                        </h4>
                                        <p style={{ fontSize: fs.body, color: accentColor, fontWeight: 600, marginBottom: sp(4) }}>
                                            {exp.company}
                                        </p>
                                        {exp.description && (
                                            <ul style={{ paddingLeft: scale < 1 ? '10px' : sp(14) + 'px', margin: 0, listStyle: 'disc' }}>
                                                {exp.description.split('\n').filter(Boolean).map((line, idx) => (
                                                    <li key={idx} style={{ fontSize: fs.small, color: '#4b5563', marginBottom: sp(1), lineHeight: 1.4 }}>
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
                        <section className="resume-section" style={{ marginBottom: sp(16) }}>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} sp={sp} icon={<GraduationCap size={iconMd} color="#ffffff" />}>
                                {t.sections.education}
                            </SectionHeader>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: sp(12) + 'px' }}>
                                {education.map((edu) => (
                                    <div key={edu.id} className="resume-entry" data-paginate="item">
                                        <p style={{ fontSize: fs.tiny, color: '#6b7280', marginBottom: sp(2), textTransform: 'uppercase' }}>
                                            {edu.startDate} – {edu.current ? t.labels.present : edu.endDate}
                                            {(edu.city || edu.country) && `    ${[edu.city, edu.country].filter(Boolean).join(', ').toUpperCase()}`}
                                        </p>
                                        <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#1f2937', marginBottom: sp(1) }}>
                                            {edu.degree}
                                            {edu.gpa && <span style={{ marginLeft: 8, opacity: 0.8, fontWeight: 500, fontSize: fs.body }}>GPA: {edu.gpa}</span>}
                                        </h4>
                                        <p style={{ fontSize: fs.body, color: accentColor, fontWeight: 600 }}>
                                            {edu.school}
                                        </p>
                                        {edu.honors && (
                                            <p style={{ fontSize: fs.small, color: '#4b5563', opacity: 0.8 }}>{edu.honors}</p>
                                        )}
                                        {edu.clubs && (
                                            <p style={{ fontSize: fs.small, color: '#6b7280', opacity: 0.7 }}>Activities: {edu.clubs}</p>
                                        )}
                                        {edu.description && (
                                            <p style={{ fontSize: fs.small, color: '#6b7280', marginTop: sp(2) }}>
                                                {edu.description}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Personal Details */}
                    {(personalInfo.nationality || (personalInfo.idType && personalInfo.idNumber)) && (
                        <section className="resume-section" style={{ marginBottom: sp(16) }}>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} sp={sp} icon={<User size={iconMd} color="#ffffff" />}>
                                {t.sections.personalDetails}
                            </SectionHeader>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: sp(8) + 'px', fontSize: fs.body, color: '#1f2937' }}>
                                {personalInfo.nationality && (
                                    <div>
                                        <span style={{ fontWeight: 700 }}>{t.labels.nationality || 'Nationality'}:</span> {personalInfo.nationality}
                                    </div>
                                )}
                                {personalInfo.idType && personalInfo.idNumber && (
                                    <div>
                                        <span style={{ fontWeight: 700 }}>
                                            {personalInfo.idType === 'id' ? (t.labels.id || 'ID') :
                                                personalInfo.idType === 'passport' ? (t.labels.passport || 'Passport') :
                                                    personalInfo.idType === 'driving_license' ? (t.labels.drivingLicense || 'Driving License') : (t.labels.id || 'ID')}:
                                        </span> {personalInfo.idNumber}
                                    </div>
                                )}
                            </div>
                        </section>
                    )}
                </div>

                {/* RIGHT COLUMN - Awards, Skills, Interests */}
                <div style={{ width: '45%' }}>
                    {/* Credentials (Certifications & Awards) */}
                    {((certifications && certifications.length > 0) || (awards && awards.length > 0)) && (
                        <section className="resume-section" style={{ marginBottom: sp(16) }}>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} sp={sp} icon={<Award size={iconMd} color="#ffffff" />}>
                                {t.sections.credentials}
                            </SectionHeader>

                            {certifications && certifications.length > 0 && (
                                <div style={{ marginBottom: awards && awards.length > 0 ? sp(16) : 0 }}>
                                    <h4 style={{ fontSize: fs.small, fontWeight: 600, color: '#6b7280', marginBottom: sp(8) }}>
                                        {t.sections.certifications}
                                    </h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: sp(8) + 'px' }}>
                                        {certifications.map((cert) => (
                                            <div key={cert.id} data-paginate="item">
                                                <div style={{ fontWeight: 600, fontSize: fs.body, color: '#1f2937' }}>{cert.name}</div>
                                                <div style={{ fontSize: fs.small, color: '#6b7280' }}>{cert.issuer} • {cert.date}</div>
                                                {cert.url && <div style={{ fontSize: fs.small, color: '#6b7280', opacity: 0.7 }}>{cert.url}</div>}
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
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: sp(8) + 'px' }}>
                                        {awards.map((award) => (
                                            <div key={award.id} data-paginate="item">
                                                <div style={{ fontWeight: 600, fontSize: fs.body, color: '#1f2937' }}>{award.title}</div>
                                                <div style={{ fontSize: fs.small, color: '#6b7280' }}>{award.issuer} • {award.date}</div>
                                                {award.description && (
                                                    <p style={{ fontSize: fs.small, color: '#4b5563', marginTop: sp(2) }}>
                                                        {award.description}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </section>
                    )}

                    {/* Skills */}
                    {skills.length > 0 && (
                        <section className="resume-section" style={{ marginBottom: sp(16) }}>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} sp={sp} icon={<Settings size={iconMd} color="#ffffff" />}>
                                {t.sections.skills}
                            </SectionHeader>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: sp(8) + 'px' }}>
                                {skills.map((skill) => (
                                    <div key={skill.id} data-paginate="item">
                                        <ProgressBar
                                            label={skill.name}
                                            value={(skill.level || 3) * 20}
                                            color={accentColor}
                                            height={scale < 1 ? 4 : sp(6)}
                                            scale={1}
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Interests with Icons Grid */}
                    {interests && interests.length > 0 && (
                        <section className="resume-section">
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} sp={sp} icon={<Star size={iconMd} color="#ffffff" />}>
                                {t.sections.interests}
                            </SectionHeader>
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(3, 1fr)',
                                    gap: scale < 1 ? '8px' : sp(16) + 'px',
                                }}
                            >
                                {interests.slice(0, 6).map((interest) => (
                                    <div
                                        key={interest.id}
                                        data-paginate="item"
                                        style={{
                                            textAlign: 'center',
                                        }}
                                    >
                                        <div
                                            style={{
                                                marginBottom: scale < 1 ? '2px' : sp(4) + 'px',
                                                color: accentColor,
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            {getInterestIcon(interest.name, scale < 1 ? 16 : sp(28))}
                                        </div>
                                        <div style={{ fontSize: fs.tiny, color: '#374151' }}>
                                            {interest.name}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Languages */}
                    {data.languages && data.languages.length > 0 && (
                        <section className="resume-section" style={{ marginBottom: sp(16) }}>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} sp={sp} icon={<Languages size={iconMd} color="#ffffff" />}>
                                {t.sections.languages}
                            </SectionHeader>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: sp(8) + 'px' }}>
                                {data.languages.map((lang) => (
                                    <div key={lang.id} data-paginate="item" style={{ display: 'flex', justifyContent: 'space-between', fontSize: fs.body }}>
                                        <span style={{ fontWeight: 600, color: '#1f2937' }}>{lang.name}</span>
                                        <span style={{ color: '#6b7280', textTransform: 'capitalize' }}>{lang.proficiency}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Social Links */}
                    {(personalInfo.x || personalInfo.github || personalInfo.dribbble || personalInfo.behance || personalInfo.instagram) && (
                        <section className="resume-section" style={{ marginBottom: sp(16) }}>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} sp={sp} icon={<Link size={iconMd} color="#ffffff" />}>
                                {t.sections.socialLinks}
                            </SectionHeader>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: sp(8) + 'px' }}>
                                {personalInfo.x && <div data-paginate="item"><SocialRow icon="x" value={personalInfo.x} color={accentColor} sp={sp} /></div>}
                                {personalInfo.github && <div data-paginate="item"><SocialRow icon="github" value={personalInfo.github} color={accentColor} sp={sp} /></div>}
                                {personalInfo.dribbble && <div data-paginate="item"><SocialRow icon="dribbble" value={personalInfo.dribbble} color={accentColor} sp={sp} /></div>}
                                {personalInfo.behance && <div data-paginate="item"><SocialRow icon="behance" value={personalInfo.behance} color={accentColor} sp={sp} /></div>}
                                {personalInfo.instagram && <div data-paginate="item"><SocialRow icon="instagram" value={personalInfo.instagram} color={accentColor} sp={sp} /></div>}
                            </div>
                        </section>
                    )}

                    {/* Strengths */}
                    {data.strengths && data.strengths.length > 0 && (
                        <section className="resume-section" style={{ marginBottom: sp(16) }}>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} sp={sp} icon={<Zap size={iconMd} color="#ffffff" />}>
                                {t.sections.strengths}
                            </SectionHeader>
                            <div
                                style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: scale < 1 ? '4px' : sp(8) + 'px',
                                }}
                            >
                                {data.strengths.map((strength) => (
                                    <span
                                        key={strength.id}
                                        data-paginate="item"
                                        style={{
                                            backgroundColor: accentColor,
                                            color: '#ffffff',
                                            padding: scale < 1 ? '2px 6px' : `${sp(4)}px ${sp(12)}px`,
                                            borderRadius: '9999px',
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

                    {/* Custom Fields */}
                    {customFields?.map((field) => (
                        <section key={field.id} className="resume-section">
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} sp={sp} icon={<FileText size={iconMd} color="#ffffff" />}>
                                {field.label}
                            </SectionHeader>
                            <p style={{ color: '#374151', lineHeight: 1.6, fontSize: fs.body }}>
                                {field.content}
                            </p>
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Section Header with Yellow Circle Icon
interface SectionHeaderProps {
    fs: ScaledFontSizes;
    headingFont: string;
    accentColor: string;
    sp: (px: number) => number;
    icon: React.ReactNode;
    children: React.ReactNode;
}

function SectionHeader({ fs, headingFont, accentColor, sp, icon, children }: SectionHeaderProps) {
    return (
        <h3
            style={{
                fontFamily: headingFont,
                fontSize: fs.sectionHeading,
                fontWeight: 700,
                color: '#1f2937',
                marginBottom: sp(12),
                display: 'flex',
                alignItems: 'center',
                gap: sp(10),
            }}
        >
            <div
                style={{
                    backgroundColor: accentColor,
                    color: '#ffffff',
                    width: sp(28),
                    height: sp(28),
                    minWidth: sp(28),
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {icon}
            </div>
            {children}
        </h3>
    );
}

// Get interest icon based on name
function getInterestIcon(name: string, size: number): React.ReactNode {
    const nameLower = name.toLowerCase();
    const faSize = size < 20 ? size * 0.6 : size * 0.7;

    if (nameLower.includes('travel')) return <Plane size={size} />;
    if (nameLower.includes('photo')) return <Camera size={size} />;
    if (nameLower.includes('novel') || nameLower.includes('book') || nameLower.includes('read')) return <BookOpen size={size} />;
    if (nameLower.includes('ballet') || nameLower.includes('dance')) return <FontAwesomeIcon icon={faPersonRunning} style={{ width: faSize, height: faSize }} />;
    if (nameLower.includes('snowboard') || nameLower.includes('ski')) return <FontAwesomeIcon icon={faPersonSkiing} style={{ width: faSize, height: faSize }} />;
    if (nameLower.includes('climb') || nameLower.includes('hik')) return <FontAwesomeIcon icon={faPersonHiking} style={{ width: faSize, height: faSize }} />;
    if (nameLower.includes('music') || nameLower.includes('guitar')) return <Music size={size} />;
    if (nameLower.includes('cook') || nameLower.includes('food')) return <CookingPot size={size} />;
    if (nameLower.includes('game') || nameLower.includes('gaming')) return <Gamepad2 size={size} />;
    if (nameLower.includes('film') || nameLower.includes('movie')) return <Film size={size} />;
    if (nameLower.includes('art') || nameLower.includes('paint')) return <Palette size={size} />;
    if (nameLower.includes('sport') || nameLower.includes('fitness')) return <FontAwesomeIcon icon={faPersonRunning} style={{ width: faSize, height: faSize }} />;
    if (nameLower.includes('yoga') || nameLower.includes('meditation')) return <FontAwesomeIcon icon={faPersonPraying} style={{ width: faSize, height: faSize }} />;
    if (nameLower.includes('swim')) return <FontAwesomeIcon icon={faPersonSwimming} style={{ width: faSize, height: faSize }} />;
    if (nameLower.includes('cycle') || nameLower.includes('bike')) return <Bike size={size} />;
    if (nameLower.includes('garden')) return <Sprout size={size} />;
    if (nameLower.includes('coffee')) return <Coffee size={size} />;
    if (nameLower.includes('wine')) return <Wine size={size} />;
    return <Star size={size} />;
}

// Social link row with circular icon badge
function SocialRow({ icon, value, color, sp }: { icon: string; value: string; color: string; sp: (px: number) => number }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: sp(10) }}>
            <div style={{
                width: sp(24),
                height: sp(24),
                minWidth: sp(24),
                borderRadius: '50%',
                backgroundColor: color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
            }}>
                <span style={{ color: '#FFFFFF', display: 'flex' }}>{getSocialIcon(icon, sp(14))}</span>
            </div>
            <span style={{ wordBreak: 'break-all', color: '#374151', fontSize: '0.85em' }}>{value}</span>
        </div>
    );
}

// SVG icons for social networks
function getSocialIcon(name: string, size: number = 14) {
    const props = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
    switch (name) {
        case 'github': return (
            <svg {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
        );
        case 'linkedin': return (
            <svg {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
        );
        case 'instagram': return (
            <svg {...props}><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
        );
        case 'x': return (
            <svg {...props}><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
        );
        case 'dribbble': return (
            <svg {...props}><circle cx="12" cy="12" r="10" /><path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" /><path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" /><path d="M8.56 2.75c4.37 6 6 9.42 8 13.25" /></svg>
        );
        case 'behance': return (
            <svg {...props}><path d="M5 17V7h4a2 2 0 0 1 0 4H7v1h2a2 2 0 0 1 0 4H5" /><path d="M15 13h5a2.5 2.5 0 1 0-5 0v.5" /><path d="M16 9h4" /></svg>
        );
        default: return <Star size={size} />;
    }
}

// Wrap with memo to prevent unnecessary re-renders
export default memo(HeaderRibbonYellow);

// Template metadata for registry
export const headerRibbonYellowMeta: TemplateMeta = {
    id: 'header-ribbon-yellow',
    name: 'Ribbon Yellow',
    category: 'header',
    thumbnail: '/templates/header-ribbon-yellow.png',
    description: 'Creative template with yellow ribbon banner and interests grid',
};

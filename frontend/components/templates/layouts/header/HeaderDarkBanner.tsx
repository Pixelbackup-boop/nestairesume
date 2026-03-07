'use client';

import React, { memo } from 'react';
import {
    Phone, Mail, MapPin, Globe, Linkedin, Calendar, Monitor, Twitter,
    Dribbble, Palette, Camera, IdCard, Github, Music, Bike,
    Plane, BookOpen, CookingPot, Gamepad2, Film, Star, Moon
} from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonRunning, faPersonSwimming, faPersonHiking, faFutbol, faTableTennisPaddleBall, faPersonPraying } from '@fortawesome/free-solid-svg-icons';
import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';
import CircularProgress from '../../shared/CircularProgress';
import ProgressBar from '../../shared/ProgressBar';
import { parseDualColor, getContrastText } from '@/lib/templates/builder/colorUtils';
import { useTemplateTranslations } from '@/lib/templates/TranslationContext';

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
function HeaderDarkBanner({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, strengths, interests, certifications, awards, customFields, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Inter');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes that respect user's size preference + scale
    const fs = getScaledFontSizes(sizeConfig, scale);

    // Spacing helper: scales all dimensions proportionally with font size preference
    // Small (12/14 = 0.857x), Medium (14/14 = 1.0x), Large (16/14 = 1.143x)
    const sizeMult = parseInt(sizeConfig.base) / 14;
    const sp = (px: number) => Math.round(px * sizeMult);

    const t = useTemplateTranslations();

    // Parse dual color: primary = header bg, secondary = accent
    const { primary: headerBgColor, secondary: accentColor } = parseDualColor(
        customThemeColor,
        { primary: '#0f172a', secondary: '#f59e0b' } // Slate 900 + Amber 500 defaults
    );

    // Auto-calculate header text color based on background
    const headerText = getContrastText(headerBgColor);
    const headerTextMuted = headerText === '#f8fafc' ? '#d1d5db' : '#6b7280';

    // Calculate responsive sizes
    const headerHeight = scale < 1 ? 80 : sp(160);
    const photoSize = scale < 1 ? 50 : sp(100);

    // Icon size helpers
    const iconSm = scale < 1 ? 8 : sp(10);
    const iconMd = scale < 1 ? 10 : sp(12);

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
                style={{
                    backgroundColor: headerBgColor,
                    height: headerHeight,
                    padding: scale < 1 ? '12px 16px' : `${sp(24)}px ${sp(32)}px`,
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
                            color: headerText,
                            letterSpacing: '0.02em',
                            marginBottom: scale < 1 ? '6px' : `${sp(12)}px`,
                        }}
                    >
                        {personalInfo.fullName || 'Your Name'}
                    </h1>
                    <div
                        style={{
                            display: 'flex',
                            gap: scale < 1 ? '8px' : `${sp(16)}px`,
                            fontSize: fs.small,
                            color: headerTextMuted,
                            flexWrap: 'wrap',
                            alignItems: 'center',
                        }}
                    >
                        {personalInfo.phone && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: sp(4) }}><Phone size={sp(12)} color={headerTextMuted} /> {personalInfo.phone}</span>
                        )}
                        {personalInfo.email && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: sp(4) }}><Mail size={sp(12)} color={headerTextMuted} /> {personalInfo.email}</span>
                        )}
                        {personalInfo.location && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: sp(4) }}><MapPin size={sp(12)} color={headerTextMuted} /> {personalInfo.location}</span>
                        )}
                        {personalInfo.website && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: sp(4) }}><Globe size={sp(12)} color={headerTextMuted} /> {personalInfo.website}</span>
                        )}
                        {personalInfo.linkedin && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: sp(4) }}><Linkedin size={sp(12)} color={headerTextMuted} /> {personalInfo.linkedin}</span>
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
                            border: `${sp(3)}px solid ${headerText}`,
                        }}
                    />
                )}
            </header>

            {/* Two-Column Body */}
            <div
                style={{
                    display: 'flex',
                    padding: scale < 1 ? '12px' : `${sp(24)}px`,
                    gap: scale < 1 ? '12px' : `${sp(24)}px`,
                    WebkitBoxDecorationBreak: 'clone',
                    boxDecorationBreak: 'clone',
                }}
            >
                {/* LEFT COLUMN - Summary, Experience, Education */}
                <div style={{ width: '55%' }}>
                    {/* Resume Summary */}
                    {personalInfo.summary && (
                        <section className="resume-section" style={{ marginBottom: sp(16) }}>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} sp={sp}>
                                {t.sections.summary}
                            </SectionHeader>
                            <p style={{ color: '#374151', lineHeight: 1.6, fontSize: fs.body }}>
                                {personalInfo.summary}
                            </p>
                        </section>
                    )}

                    {/* Work Experience */}
                    {experience.length > 0 && (
                        <section className="resume-section" style={{ marginBottom: sp(16) }}>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} sp={sp}>
                                {t.sections.workExperience}
                            </SectionHeader>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: `${sp(12)}px` }}>
                                {experience.map((exp) => (
                                    <div key={exp.id} className="resume-entry" data-paginate="item">
                                        <p style={{ fontSize: fs.small, color: accentColor, marginBottom: '2px', display: 'flex', alignItems: 'center', gap: `${sp(4)}px`, flexWrap: 'wrap' }}>
                                            <Calendar size={iconSm} /> {exp.startDate} – {exp.current ? t.labels.present : exp.endDate}
                                            {(exp.city || exp.country) && <><MapPin size={iconSm} style={{ marginLeft: `${sp(4)}px` }} /> {[exp.city, exp.country].filter(Boolean).join(', ').toUpperCase()}</>}
                                        </p>
                                        <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#1f2937', marginBottom: '2px' }}>
                                            {exp.title}
                                        </h4>
                                        <p style={{ fontSize: fs.body, color: '#4b5563', fontWeight: 600, marginBottom: `${sp(4)}px` }}>
                                            {exp.company}
                                        </p>
                                        {exp.description && (
                                            <ul style={{ paddingLeft: scale < 1 ? '12px' : `${sp(16)}px`, margin: 0, listStyle: 'disc' }}>
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
                        <section className="resume-section" style={{ marginBottom: sp(16) }}>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} sp={sp}>
                                {t.sections.education}
                            </SectionHeader>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: `${sp(12)}px` }}>
                                {education.map((edu) => (
                                    <div key={edu.id} className="resume-entry" data-paginate="item">
                                        <p style={{ fontSize: fs.small, color: accentColor, marginBottom: '2px', display: 'flex', alignItems: 'center', gap: `${sp(4)}px`, flexWrap: 'wrap' }}>
                                            <Calendar size={iconSm} /> {edu.startDate}
                                            {(edu.city || edu.country) && <><MapPin size={iconSm} style={{ marginLeft: `${sp(4)}px` }} /> {[edu.city, edu.country].filter(Boolean).join(', ').toUpperCase()}</>}
                                        </p>
                                        <h4 style={{ fontWeight: 700, fontSize: fs.entryTitle, color: '#1f2937', marginBottom: '2px' }}>
                                            {edu.degree}
                                            {edu.gpa && <span style={{ marginLeft: 8, opacity: 0.8, fontWeight: 500, fontSize: fs.body }}>GPA: {edu.gpa}</span>}
                                        </h4>
                                        <p style={{ fontSize: fs.body, color: '#4b5563', fontWeight: 600 }}>
                                            {edu.school}
                                        </p>
                                        {edu.honors && (
                                            <p style={{ fontSize: fs.small, color: '#4b5563', opacity: 0.8 }}>{edu.honors}</p>
                                        )}
                                        {edu.clubs && (
                                            <p style={{ fontSize: fs.small, color: '#6b7280', opacity: 0.7 }}>Activities: {edu.clubs}</p>
                                        )}
                                        {edu.description && (
                                            <p style={{ fontSize: fs.small, color: '#6b7280', marginTop: `${sp(4)}px` }}>
                                                {edu.description}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Interests */}
                    {interests && interests.length > 0 && (
                        <section className="resume-section" style={{ marginBottom: sp(16) }}>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} sp={sp}>
                                {t.sections.interests}
                            </SectionHeader>
                            <div
                                style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: scale < 1 ? '6px' : `${sp(8)}px`,
                                }}
                            >
                                {interests.map((interest) => (
                                    <div
                                        key={interest.id}
                                        data-paginate="item"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: `${sp(6)}px`,
                                            fontSize: fs.body,
                                        }}
                                    >
                                        <span style={{ color: accentColor, fontSize: `${sp(8)}px` }}>●</span>
                                        <span style={{ fontWeight: 500 }}>{interest.name}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Personal Details */}
                    {(personalInfo.nationality || personalInfo.idType) && (
                        <section className="resume-section" style={{ marginBottom: sp(16) }}>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} sp={sp}>
                                {t.sections.personalDetails}
                            </SectionHeader>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: `${sp(4)}px`, fontSize: fs.small, color: '#374151' }}>
                                {personalInfo.nationality && <div data-paginate="item" style={{ display: 'flex', alignItems: 'center', gap: `${sp(4)}px` }}><Globe size={iconMd} /> {t.labels.nationality || 'Nationality'}: {personalInfo.nationality}</div>}
                                {personalInfo.idType && personalInfo.idNumber && (
                                    <div data-paginate="item" style={{ display: 'flex', alignItems: 'center', gap: `${sp(4)}px` }}><IdCard size={iconMd} /> {personalInfo.idType === 'id' ? (t.labels.id || 'ID') :
                                        personalInfo.idType === 'passport' ? (t.labels.passport || 'Passport') :
                                            personalInfo.idType === 'driving_license' ? (t.labels.drivingLicense || 'Driving License') : (t.labels.id || 'ID')}: {personalInfo.idNumber}</div>
                                )}
                            </div>
                        </section>
                    )}
                </div>

                {/* RIGHT COLUMN - Skills, Languages, Strengths, Interests */}
                <div style={{ width: '45%' }}>
                    {/* Skills with Progress Bars */}
                    {skills.length > 0 && (
                        <section className="resume-section" style={{ marginBottom: sp(16) }}>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} sp={sp}>
                                {t.sections.skills}
                            </SectionHeader>
                            <p style={{ fontSize: fs.tiny, color: '#6b7280', marginBottom: scale < 1 ? '4px' : `${sp(8)}px`, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: `${sp(4)}px` }}>
                                <Monitor size={iconSm} /> SOFTWARE
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: `${sp(8)}px` }}>
                                {skills.map((skill) => (
                                    <div key={skill.id} data-paginate="item">
                                        <ProgressBar
                                            label={skill.name}
                                            value={skill.level * 20}
                                            color={accentColor}
                                            height={scale < 1 ? 4 : sp(6)}
                                            scale={1}
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Languages with Circular Indicators */}
                    {languages && languages.length > 0 && (
                        <section className="resume-section" style={{ marginBottom: sp(16) }}>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} sp={sp}>
                                {t.sections.languages}
                            </SectionHeader>
                            <div
                                style={{
                                    display: 'flex',
                                    gap: scale < 1 ? '8px' : `${sp(16)}px`,
                                    flexWrap: 'wrap',
                                }}
                            >
                                {languages.map((lang) => (
                                    <div key={lang.id} data-paginate="item">
                                        <CircularProgress
                                            value={lang.level}
                                            size={scale < 1 ? 40 : sp(70)}
                                            color="#374151"
                                            strokeWidth={scale < 1 ? 2 : sp(3)}
                                            fontSize={scale < 1 ? 10 : sp(16)}
                                            label={lang.name}
                                            labelFontSize={scale < 1 ? 6 : sp(10)}
                                            scale={1}
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Strengths as Pill Badges */}
                    {strengths && strengths.length > 0 && (
                        <section className="resume-section" style={{ marginBottom: sp(16) }}>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} sp={sp}>
                                {t.sections.strengths}
                            </SectionHeader>
                            <div
                                style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: scale < 1 ? '4px' : `${sp(8)}px`,
                                }}
                            >
                                {strengths.map((strength) => (
                                    <span
                                        key={strength.id}
                                        data-paginate="item"
                                        style={{
                                            backgroundColor: accentColor,
                                            color: getContrastText(accentColor),
                                            padding: scale < 1 ? '2px 6px' : `${sp(4)}px ${sp(12)}px`,
                                            borderRadius: `${sp(4)}px`,
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

                    {/* Certifications & Awards — anti-orphan grouping */}
                    {((certifications && certifications.length > 0) || (awards && awards.length > 0)) && (
                        <section className="resume-section" style={{ marginTop: sp(16) }}>
                            {certifications && certifications.length > 0 && (
                                <div style={{ marginBottom: awards && awards.length > 0 ? sp(16) : 0 }}>
                                    {/* Group: heading + subheading + first cert → prevents orphan heading */}
                                    <div data-paginate="item">
                                        <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} sp={sp}>
                                            {t.sections.credentials}
                                        </SectionHeader>
                                        <p style={{ fontSize: fs.tiny, fontWeight: 600, color: '#6b7280', marginBottom: sp(8) }}>
                                            {t.sections.certifications}
                                        </p>
                                        <div>
                                            <div style={{ fontWeight: 600, fontSize: fs.body, color: '#1f2937' }}>{certifications[0].name}</div>
                                            <div style={{ fontSize: fs.small, color: '#6b7280' }}>{certifications[0].issuer} • {certifications[0].date}</div>
                                            {certifications[0].url && <div style={{ fontSize: fs.small, color: '#6b7280', opacity: 0.7 }}>{certifications[0].url}</div>}
                                        </div>
                                    </div>
                                    {/* Remaining certs paginate individually */}
                                    {certifications.slice(1).map((cert) => (
                                        <div key={cert.id} data-paginate="item" style={{ marginTop: `${sp(8)}px` }}>
                                            <div style={{ fontWeight: 600, fontSize: fs.body, color: '#1f2937' }}>{cert.name}</div>
                                            <div style={{ fontSize: fs.small, color: '#6b7280' }}>{cert.issuer} • {cert.date}</div>
                                            {cert.url && <div style={{ fontSize: fs.small, color: '#6b7280', opacity: 0.7 }}>{cert.url}</div>}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {awards && awards.length > 0 && (
                                <div>
                                    {/* Group: awards subheading + first award (+ section heading if no certs) */}
                                    <div data-paginate="item">
                                        {(!certifications || certifications.length === 0) && (
                                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} sp={sp}>
                                                {t.sections.credentials}
                                            </SectionHeader>
                                        )}
                                        <p style={{ fontSize: fs.tiny, fontWeight: 600, color: '#6b7280', marginBottom: sp(8) }}>
                                            {t.sections.awards}
                                        </p>
                                        <div>
                                            <div style={{ fontWeight: 600, fontSize: fs.body, color: '#1f2937' }}>{awards[0].title}</div>
                                            <div style={{ fontSize: fs.small, color: '#6b7280' }}>{awards[0].issuer} • {awards[0].date}</div>
                                            {awards[0].description && (
                                                <p style={{ fontSize: fs.small, lineHeight: 1.5, color: '#4b5563', marginTop: '2px' }}>{awards[0].description}</p>
                                            )}
                                        </div>
                                    </div>
                                    {/* Remaining awards paginate individually */}
                                    {awards.slice(1).map((award) => (
                                        <div key={award.id} data-paginate="item" style={{ marginTop: `${sp(8)}px` }}>
                                            <div style={{ fontWeight: 600, fontSize: fs.body, color: '#1f2937' }}>{award.title}</div>
                                            <div style={{ fontSize: fs.small, color: '#6b7280' }}>{award.issuer} • {award.date}</div>
                                            {award.description && (
                                                <p style={{ fontSize: fs.small, lineHeight: 1.5, color: '#4b5563', marginTop: '2px' }}>{award.description}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                    )}

                    {/* Social Links */}
                    {(personalInfo.x || personalInfo.github || personalInfo.dribbble || personalInfo.behance || personalInfo.instagram) && (
                        <section className="resume-section" style={{ marginTop: sp(16) }}>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} sp={sp}>
                                {t.sections.socialLinks}
                            </SectionHeader>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: `${sp(4)}px`, fontSize: fs.small, color: '#374151' }}>
                                {personalInfo.github && <div data-paginate="item" style={{ display: 'flex', alignItems: 'center', gap: `${sp(4)}px` }}><Github size={iconMd} /> {personalInfo.github}</div>}
                                {personalInfo.x && <div data-paginate="item" style={{ display: 'flex', alignItems: 'center', gap: `${sp(4)}px` }}><Twitter size={iconMd} /> {personalInfo.x}</div>}
                                {personalInfo.dribbble && <div data-paginate="item" style={{ display: 'flex', alignItems: 'center', gap: `${sp(4)}px` }}><Dribbble size={iconMd} /> {personalInfo.dribbble}</div>}
                                {personalInfo.behance && <div data-paginate="item" style={{ display: 'flex', alignItems: 'center', gap: `${sp(4)}px` }}><Palette size={iconMd} /> {personalInfo.behance}</div>}
                                {personalInfo.instagram && <div data-paginate="item" style={{ display: 'flex', alignItems: 'center', gap: `${sp(4)}px` }}><Camera size={iconMd} /> {personalInfo.instagram}</div>}
                            </div>
                        </section>
                    )}


                    {/* Custom Fields */}
                    {customFields?.map((field) => (
                        <section key={field.id} className="resume-section" style={{ marginTop: sp(16) }}>
                            <SectionHeader fs={fs} headingFont={headingFont} accentColor={accentColor} sp={sp}>
                                {field.label}
                            </SectionHeader>
                            <p style={{ fontSize: fs.body, lineHeight: 1.6, color: '#374151' }}>{field.content}</p>
                        </section>
                    ))}
                </div>
            </div>
        </div >
    );
}

// Section Header Component
interface SectionHeaderProps {
    fs: ScaledFontSizes;
    headingFont: string;
    accentColor: string;
    sp: (px: number) => number;
    children: React.ReactNode;
}

function SectionHeader({ fs, headingFont, accentColor, sp, children }: SectionHeaderProps) {
    return (
        <h3
            style={{
                fontFamily: headingFont,
                fontSize: fs.sectionHeading,
                fontWeight: 500,
                color: accentColor,
                marginBottom: `${sp(12)}px`,
            }}
        >
            {children}
        </h3>
    );
}

// Interest Icon Helper — returns Lucide or Font Awesome icon based on interest name
function getInterestIcon(name: string, size: number): React.ReactNode {
    const nameLower = name.toLowerCase();
    const faSize = size < 20 ? size * 0.6 : size * 0.7;

    if (nameLower.includes('music') || nameLower.includes('rock')) return <Music size={size} />;
    if (nameLower.includes('football') || nameLower.includes('soccer')) return <FontAwesomeIcon icon={faFutbol} style={{ width: faSize, height: faSize }} />;
    if (nameLower.includes('photo')) return <Camera size={size} />;
    if (nameLower.includes('hiking') || nameLower.includes('hike')) return <FontAwesomeIcon icon={faPersonHiking} style={{ width: faSize, height: faSize }} />;
    if (nameLower.includes('biking') || nameLower.includes('bike') || nameLower.includes('cycling')) return <Bike size={size} />;
    if (nameLower.includes('tennis')) return <FontAwesomeIcon icon={faTableTennisPaddleBall} style={{ width: faSize, height: faSize }} />;
    if (nameLower.includes('travel')) return <Plane size={size} />;
    if (nameLower.includes('reading') || nameLower.includes('book')) return <BookOpen size={size} />;
    if (nameLower.includes('cooking') || nameLower.includes('food')) return <CookingPot size={size} />;
    if (nameLower.includes('gaming') || nameLower.includes('game')) return <Gamepad2 size={size} />;
    if (nameLower.includes('film') || nameLower.includes('movie')) return <Film size={size} />;
    if (nameLower.includes('art') || nameLower.includes('paint')) return <Palette size={size} />;
    if (nameLower.includes('yoga') || nameLower.includes('meditation')) return <FontAwesomeIcon icon={faPersonPraying} style={{ width: faSize, height: faSize }} />;
    if (nameLower.includes('swim')) return <FontAwesomeIcon icon={faPersonSwimming} style={{ width: faSize, height: faSize }} />;
    if (nameLower.includes('run')) return <FontAwesomeIcon icon={faPersonRunning} style={{ width: faSize, height: faSize }} />;
    if (nameLower.includes('sleep') || nameLower.includes('rest') || nameLower.includes('nap')) return <Moon size={size} />;
    return <Star size={size} />;
}

// Wrap with memo to prevent unnecessary re-renders
export default memo(HeaderDarkBanner);

// Template metadata for registry
export const headerDarkBannerMeta: TemplateMeta = {
    id: 'header-dark-banner',
    name: 'Dark Banner',
    category: 'header',
    thumbnail: '/templates/header-dark-banner.png',
    description: 'Bold dark header with circular photo and two-column body layout',
};

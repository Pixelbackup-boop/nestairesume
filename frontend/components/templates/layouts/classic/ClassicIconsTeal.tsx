'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';
import { User, Briefcase, GraduationCap, Wrench, Languages, Heart, Phone, Mail, Globe, MapPin, Palette, Camera, Music, Tent, Zap } from 'lucide-react';

/**
 * Classic Icons Teal Template
 * Reference: classic-icons-teal.webp
 * 
 * Layout:
 * - Row-based layout.
 * - Header: Photo Left, Name/Summary Right.
 * - Sections: 
 *   - Left Column: Centered Icon + Section Title.
 *   - Right Column: Section Content.
 * - Vertical Divider separating left and right columns.
 * - Accent: Teal (#0d9488) or custom.
 */
export default function ClassicIconsTeal({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, interests, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Merriweather');
    const bodyFont = getFontFamily(fonts?.body || 'Open Sans');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes
    const fs = getScaledFontSizes(sizeConfig, scale);

    // Colors
    const mainText = '#333333';
    const accentColor = customThemeColor || '#0d9488'; // Teal 600
    const lightAccent = '#f0fdf9'; // Very light teal/white
    const borderColor = '#e5e7eb'; // Light gray for borders

    // Icons mapping
    // We can use a helper or just inline them.
    const iconSize = scale < 1 ? 16 : 24;
    const smallIconSize = scale < 1 ? 12 : 16;

    return (
        <div
            className="w-full h-full"
            style={{
                fontFamily: bodyFont,
                fontSize: sizeConfig.base,
                backgroundColor: '#FFFFFF',
                color: mainText,
                padding: scale < 1 ? '32px' : '56px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Top Header Section */}
            <header style={{
                display: 'flex',
                gap: scale < 1 ? 24 : 40,
                marginBottom: scale < 1 ? 32 : 56,
                alignItems: 'center'
            }}>
                {/* Photo */}
                {personalInfo.profileImage && (
                    <div style={{ flexShrink: 0 }}>
                        <img
                            src={personalInfo.profileImage}
                            alt={personalInfo.fullName}
                            style={{
                                width: scale < 1 ? 100 : 150,
                                height: scale < 1 ? 100 : 150,
                                borderRadius: '50%',
                                objectFit: 'cover',
                                border: `4px solid #e2e8f0` // Light gray border like reference
                            }}
                        />
                    </div>
                )}

                {/* Name & Summary */}
                <div style={{ flex: 1 }}>
                    <h1
                        style={{
                            fontFamily: headingFont,
                            fontSize: fs.name,
                            fontWeight: 700,
                            color: accentColor,
                            marginBottom: 8,
                            lineHeight: 1.2
                        }}
                    >
                        {personalInfo.fullName}
                    </h1>

                    {personalInfo.summary && (
                        <p style={{
                            fontSize: fs.body,
                            lineHeight: 1.6,
                            color: '#374151',
                            textAlign: 'justify'
                        }}>
                            {personalInfo.summary}
                        </p>
                    )}
                </div>
            </header>

            {/* Sections Container */}
            <div style={{ display: 'flex', flexDirection: 'column', borderTop: `1px solid ${borderColor}` }}>

                {/* Personal Info Section - mimicking the reference layout which puts contact info here */}
                <SectionRow
                    title="Personal info"
                    icon={<User size={iconSize} color="white" />}
                    accentColor={accentColor}
                    fs={fs}
                    borderColor={borderColor}
                    scale={scale}
                    headingFont={headingFont}
                >
                    <div style={{ fontSize: fs.small, color: '#4b5563', lineHeight: 1.8 }}>
                        {personalInfo.jobTitle && (
                            <div style={{ marginBottom: 4 }}>
                                <strong>Job Title:</strong> {personalInfo.jobTitle}
                            </div>
                        )}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 24px' }}>
                            {personalInfo.phone && <span><strong>Phone:</strong> {personalInfo.phone}</span>}
                            {personalInfo.email && <span><strong>Email:</strong> {personalInfo.email}</span>}
                            {personalInfo.location && <span><strong>Address:</strong> {personalInfo.location}</span>}
                            {personalInfo.website && <span><strong>Web:</strong> {personalInfo.website}</span>}
                        </div>
                    </div>
                </SectionRow>

                {/* Work Experience */}
                {experience.length > 0 && (
                    <SectionRow
                        title="Work experience"
                        icon={<Briefcase size={iconSize} color="white" />}
                        accentColor={accentColor}
                        fs={fs}
                        borderColor={borderColor}
                        scale={scale}
                        headingFont={headingFont}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: scale < 1 ? 16 : 24 }}>
                            {experience.map((exp) => (
                                <div key={exp.id}>
                                    <h4 style={{
                                        fontWeight: 700,
                                        fontSize: fs.entryTitle,
                                        color: '#111827',
                                        marginBottom: 2
                                    }}>
                                        {exp.title}
                                    </h4>
                                    <div style={{
                                        fontWeight: 700,
                                        fontSize: fs.body,
                                        color: '#374151',
                                        marginBottom: 4
                                    }}>
                                        {exp.company}
                                    </div>
                                    <div style={{
                                        fontSize: fs.small,
                                        color: '#6b7280',
                                        marginBottom: 8,
                                        fontWeight: 600,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em'
                                    }}>
                                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate} &nbsp; {exp.city && <span style={{ fontWeight: 400 }}>{exp.city}</span>}
                                    </div>
                                    <p style={{ fontSize: fs.body, lineHeight: 1.6, color: '#4b5563' }}>
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </SectionRow>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <SectionRow
                        title="Education"
                        icon={<GraduationCap size={iconSize} color="white" />}
                        accentColor={accentColor}
                        fs={fs}
                        borderColor={borderColor}
                        scale={scale}
                        headingFont={headingFont}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: scale < 1 ? 16 : 24 }}>
                            {education.map((edu) => (
                                <div key={edu.id}>
                                    <h4 style={{
                                        fontWeight: 700,
                                        fontSize: fs.entryTitle,
                                        color: '#111827',
                                        marginBottom: 2
                                    }}>
                                        {edu.degree}
                                    </h4>
                                    <div style={{
                                        fontWeight: 700,
                                        fontSize: fs.body,
                                        color: '#374151',
                                        marginBottom: 4
                                    }}>
                                        {edu.school}
                                    </div>
                                    <div style={{
                                        fontSize: fs.small,
                                        color: '#6b7280',
                                        marginBottom: 8,
                                        fontWeight: 600,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em'
                                    }}>
                                        {edu.startDate} – {edu.endDate || 'Present'} &nbsp; {edu.city && <span style={{ fontWeight: 400 }}>{edu.city}</span>}
                                    </div>
                                    {edu.description && (
                                        <p style={{ fontSize: fs.body, lineHeight: 1.6, color: '#4b5563' }}>
                                            {edu.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </SectionRow>
                )}

                {/* Skills */}
                {skills.length > 0 && (
                    <SectionRow
                        title="Skills"
                        icon={<Wrench size={iconSize} color="white" />}
                        accentColor={accentColor}
                        fs={fs}
                        borderColor={borderColor}
                        scale={scale}
                        headingFont={headingFont}
                    >
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px 40px' }}>
                            {skills.map((skill) => (
                                <div key={skill.id} data-paginate="item" style={{ flex: '1 0 45%', minWidth: '45%' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                        <span style={{ fontWeight: 700, fontSize: fs.small, textTransform: 'uppercase', color: '#374151' }}>{skill.name}</span>
                                    </div>
                                    <div style={{ width: '100%', height: 4, backgroundColor: '#e5e7eb', borderRadius: 2 }}>
                                        <div style={{
                                            width: `${skill.level ? skill.level * 20 : 100}%`,
                                            height: '100%',
                                            backgroundColor: accentColor,
                                            borderRadius: 2
                                        }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </SectionRow>
                )}

                {/* Languages */}
                {languages.length > 0 && (
                    <SectionRow
                        title="Languages"
                        icon={<Languages size={iconSize} color="white" />}
                        accentColor={accentColor}
                        fs={fs}
                        borderColor={borderColor}
                        scale={scale}
                        headingFont={headingFont}
                    >
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px 40px' }}>
                            {languages.map((lang) => (
                                <div key={lang.id} data-paginate="item" style={{ flex: '1 0 45%', minWidth: '45%' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, borderBottom: `1px solid ${accentColor}`, paddingBottom: 4 }}>
                                        <span style={{ fontWeight: 700, fontSize: fs.body, color: '#374151' }}>{lang.name}</span>
                                        <span style={{ fontSize: fs.small, color: '#6b7280', fontStyle: 'italic' }}>{lang.proficiency}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </SectionRow>
                )}

                {/* Strengths (Optional) */}
                {data.strengths && data.strengths.length > 0 && (
                    <SectionRow
                        title="Strengths"
                        icon={<Zap size={iconSize} color="white" />}
                        accentColor={accentColor}
                        fs={fs}
                        borderColor={borderColor}
                        scale={scale}
                        headingFont={headingFont}
                    >
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                            {data.strengths.map((strength) => (
                                <span key={strength.id} style={{
                                    backgroundColor: lightAccent,
                                    color: accentColor,
                                    border: `1px solid ${accentColor}`,
                                    padding: '6px 16px',
                                    borderRadius: 20,
                                    fontSize: fs.small,
                                    fontWeight: 600
                                }}>
                                    {strength.name}
                                </span>
                            ))}
                        </div>
                    </SectionRow>
                )}

                {/* Interests (Optional) */}
                {(interests && interests.length > 0) && (
                    <SectionRow
                        title="Interests"
                        icon={<Heart size={iconSize} color="white" />}
                        accentColor={accentColor}
                        fs={fs}
                        borderColor={borderColor}
                        scale={scale}
                        headingFont={headingFont}
                    >
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center' }}>
                            {interests.map((int) => (
                                <div key={int.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                                    {/* Try to map common interests to icons or just use a generic icon */}
                                    <div style={{ color: accentColor }}>
                                        {getInterestIcon(int.name, scale)}
                                    </div>
                                    <span style={{ fontSize: fs.small, fontWeight: 600, color: '#374151' }}>{int.name}</span>
                                </div>
                            ))}
                        </div>
                    </SectionRow>
                )}
            </div>
        </div>
    );
}

// ----------------------------------------------------------------------
// Components
// ----------------------------------------------------------------------

function SectionRow({ title, icon, accentColor, fs, borderColor, scale, headingFont, children }: any) {
    const iconBoxSize = scale < 1 ? 32 : 48;
    return (
        <div style={{
            display: 'flex',
            borderBottom: `1px solid ${borderColor}`,
            minHeight: scale < 1 ? 100 : 150
        }}>
            {/* Left Column: Label */}
            <div style={{
                flex: '0 0 25%',
                borderRight: `1px solid ${borderColor}`,
                padding: scale < 1 ? '24px 16px' : '40px 24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: 12
            }}>
                <div style={{
                    width: iconBoxSize,
                    height: iconBoxSize,
                    backgroundColor: accentColor,
                    borderRadius: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    {icon}
                </div>
                <h3 style={{
                    fontFamily: headingFont,
                    fontSize: fs.sectionHeading,
                    fontWeight: 700,
                    color: '#374151',
                    lineHeight: 1.2
                }}>
                    {title}
                </h3>
            </div>

            {/* Right Column: Content */}
            <div style={{
                flex: 1,
                padding: scale < 1 ? '24px 24px' : '40px 40px',
            }}>
                {children}
            </div>
        </div>
    );
}

function getInterestIcon(name: string, scale: number) {
    const size = scale < 1 ? 20 : 28;
    const lower = name.toLowerCase();
    if (lower.includes('music') || lower.includes('guitar') || lower.includes('piano')) return <Music size={size} />;
    if (lower.includes('photo') || lower.includes('camera')) return <Camera size={size} />;
    if (lower.includes('travel') || lower.includes('hiking') || lower.includes('camp')) return <Tent size={size} />;
    if (lower.includes('art') || lower.includes('draw') || lower.includes('paint')) return <Palette size={size} />;
    return <Heart size={size} />;
}

// ----------------------------------------------------------------------
// Metadata
// ----------------------------------------------------------------------

export const classicIconsTealMeta: TemplateMeta = {
    id: 'classic-icons-teal',
    name: 'Classic Icons Teal',
    category: 'classic',
    thumbnail: '/templates/classic-icons-teal.webp',
    description: 'Reference-style layout with row-based sections and prominent teal icons.',
};

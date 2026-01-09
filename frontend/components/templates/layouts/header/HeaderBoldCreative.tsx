'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';
import ProgressBar from '../../shared/ProgressBar';

/**
 * Header Bold Creative Template
 * Asymmetric two-column layout with massive typography and bold distinct sections.
 *
 * Layout:
 * - Left Column (40%): Gray background. Photo, Contact, Skills.
 * - Right Column (60%): White background. Massive Name, Profile, Experience.
 *
 * Matches reference: frontend/Resume-template/unique-layouts/12-bold-creative.webp
 * (Inferred design based on "Bold Creative" name and standard creative resume patterns)
 */
export default function HeaderBoldCreative({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, awards, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Montserrat');
    const bodyFont = getFontFamily(fonts?.body || 'Open Sans');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes
    const fs = getScaledFontSizes(sizeConfig, scale);

    // Colors
    const sidebarBg = '#f3f4f6'; // Gray 100
    const accentColor = customThemeColor || '#be123c'; // Rose 700
    const textColor = '#1f2937'; // Gray 800

    // Dimensions
    const photoSize = scale < 1 ? 100 : 180;

    return (
        <div
            className="w-full h-full"
            style={{
                fontFamily: bodyFont,
                fontSize: sizeConfig.base,
                backgroundColor: '#ffffff',
                color: textColor,
                display: 'flex',
                boxSizing: 'border-box'
            }}
        >
            {/* Left Sidebar */}
            <aside
                style={{
                    width: '40%',
                    backgroundColor: sidebarBg,
                    padding: scale < 1 ? '32px 20px' : '64px 40px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flexShrink: 0,
                    minHeight: '100%'
                }}
            >
                {/* Photo (Large, Square-ish with rounded corners) */}
                <div style={{ marginBottom: scale < 1 ? 40 : 60 }}>
                    {personalInfo.profileImage ? (
                        <img
                            src={personalInfo.profileImage}
                            alt={personalInfo.fullName}
                            style={{
                                width: photoSize,
                                height: photoSize,
                                borderRadius: '24px', // Soft square
                                objectFit: 'cover',
                                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                            }}
                        />
                    ) : (
                        <div
                            style={{
                                width: photoSize,
                                height: photoSize,
                                borderRadius: '24px',
                                backgroundColor: '#e5e7eb',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: fs.name,
                                color: '#9ca3af',
                            }}
                        >
                            {personalInfo.fullName?.charAt(0) || '?'}
                        </div>
                    )}
                </div>

                {/* Contact Info */}
                <div style={{ width: '100%', marginBottom: 50 }}>
                    <SidebarSectionHeader title="Contact" color={accentColor} fs={fs} headingFont={headingFont} />
                    <div style={{ fontSize: fs.body, display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {personalInfo.phone && <ContactItem icon="phone" text={personalInfo.phone} />}
                        {personalInfo.email && <ContactItem icon="email" text={personalInfo.email} />}
                        {personalInfo.location && <ContactItem icon="location" text={personalInfo.location} />}
                        {personalInfo.website && <ContactItem icon="website" text={personalInfo.website} />}
                    </div>
                </div>

                {/* Skills */}
                {skills.length > 0 && (
                    <div style={{ width: '100%', marginBottom: 40 }}>
                        <SidebarSectionHeader title="Skills" color={accentColor} fs={fs} headingFont={headingFont} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {skills.map((skill) => (
                                <div key={skill.id}>
                                    <div style={{ marginBottom: 4, fontSize: fs.body, fontWeight: 700 }}>{skill.name}</div>
                                    <ProgressBar
                                        value={skill.level * 20}
                                        color={accentColor}
                                        trackColor="#d1d5db"
                                        height={8}
                                        scale={1}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Awards */}
                {awards && awards.length > 0 && (
                    <div style={{ width: '100%', marginBottom: 40 }}>
                        <SidebarSectionHeader title="Awards" color={accentColor} fs={fs} headingFont={headingFont} />
                        {awards.map((award) => (
                            <div key={award.id} style={{ marginBottom: 12 }}>
                                <div style={{ fontWeight: 700, fontSize: fs.body }}>{award.title}</div>
                                <div style={{ fontSize: fs.small, opacity: 0.7 }}>{award.issuer} | {award.date}</div>
                            </div>
                        ))}
                    </div>
                )}

            </aside>

            {/* Main Content */}
            <main
                style={{
                    flex: 1,
                    padding: scale < 1 ? '32px 24px' : '64px 48px',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* Massive Name Header */}
                <div style={{ marginBottom: scale < 1 ? 40 : 80, paddingTop: scale < 1 ? 0 : 20 }}>
                    <p
                        style={{
                            fontSize: fs.jobTitle,
                            color: accentColor,
                            textTransform: 'uppercase',
                            fontWeight: 700,
                            letterSpacing: '0.2em',
                            marginBottom: 16
                        }}
                    >
                        {personalInfo.jobTitle || 'Job Title'}
                    </p>
                    <h1
                        style={{
                            fontFamily: headingFont,
                            fontSize: scale < 1 ? '36px' : '72px', // Massive font
                            fontWeight: 900,
                            color: '#111827',
                            lineHeight: 0.9,
                            textTransform: 'uppercase',
                            margin: 0,
                        }}
                    >
                        {personalInfo.fullName || 'Your Name'}
                    </h1>
                </div>

                {/* Profile */}
                {personalInfo.summary && (
                    <section className="mb-12 resume-section" data-paginate>
                        <SectionHeaderMain title="About" color={accentColor} fs={fs} headingFont={headingFont} />
                        <p style={{ lineHeight: 1.7, fontSize: fs.sectionHeading, fontWeight: 300, color: '#374151' }}>
                            {personalInfo.summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <section className="mb-12 resume-section" data-paginate>
                        <SectionHeaderMain title="Experience" color={accentColor} fs={fs} headingFont={headingFont} />
                        <div className="space-y-10">
                            {experience.map((exp) => (
                                <div key={exp.id}>
                                    <div style={{ marginBottom: 4 }}>
                                        <h4 style={{ fontWeight: 800, fontSize: fs.entryTitle, textTransform: 'uppercase', color: '#111827' }}>
                                            {exp.title}
                                        </h4>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, fontSize: fs.small, color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        <span>{exp.company}</span>
                                        <span style={{ width: 4, height: 4, backgroundColor: accentColor, borderRadius: '50%' }}></span>
                                        <span>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                                    </div>

                                    <p style={{ fontSize: fs.body, lineHeight: 1.6, color: '#4b5563' }}>
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <section className="mb-12 resume-section" data-paginate>
                        <SectionHeaderMain title="Education" color={accentColor} fs={fs} headingFont={headingFont} />
                        <div className="space-y-8">
                            {education.map((edu) => (
                                <div key={edu.id}>
                                    <h4 style={{ fontWeight: 800, fontSize: fs.entryTitle, color: '#111827' }}>
                                        {edu.degree}
                                    </h4>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4, fontSize: fs.small, color: '#6b7280', fontWeight: 500 }}>
                                        <span>{edu.school}, {edu.city}</span>
                                        <span style={{ color: accentColor }}>|</span>
                                        <span>{edu.startDate} – {edu.endDate || 'Present'}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

            </main>
        </div>
    );
}

// Helpers
function SidebarSectionHeader({ title, color, fs, headingFont }: { title: string, color: string, fs: ScaledFontSizes, headingFont: string }) {
    return (
        <h3
            style={{
                fontFamily: headingFont,
                fontSize: fs.sidebarHeading,
                fontWeight: 800,
                color: '#111827',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: 20,
                borderBottom: `4px solid ${color}`,
                paddingBottom: 4,
                display: 'inline-block'
            }}
        >
            {title}
        </h3>
    );
}

function SectionHeaderMain({ title, color, fs, headingFont }: { title: string, color: string, fs: ScaledFontSizes, headingFont: string }) {
    return (
        <h3
            style={{
                fontFamily: headingFont,
                fontSize: fs.small,
                fontWeight: 700,
                color: color,
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                marginBottom: 24,
            }}
        >
            {title}
        </h3>
    );
}

function ContactItem({ icon, text }: { icon: string, text: string }) {
    const icons: Record<string, string> = {
        phone: "📱",
        email: "✉️",
        location: "📍",
        website: "🌐"
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: '1.2em' }}>{icons[icon]}</span>
            <span style={{ wordBreak: 'break-all', fontWeight: 500 }}>{text}</span>
        </div>
    );
}

// Template metadata
export const headerBoldCreativeMeta: TemplateMeta = {
    id: 'header-bold-creative',
    name: 'Bold Creative',
    category: 'header',
    thumbnail: '/templates/header-bold-creative.png',
    description: 'Massive typography with asymmetric layout'
};

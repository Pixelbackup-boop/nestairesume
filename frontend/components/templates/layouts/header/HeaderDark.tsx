'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes, getScaledFontSizes, ScaledFontSizes } from '../../shared/styleHelpers';

/**
 * Lighten a hex color by a percentage
 * @param hex - Hex color string (e.g., '#334155')
 * @param percent - Percentage to lighten (0-100)
 */
function lightenColor(hex: string, percent: number): string {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.min(255, Math.floor((num >> 16) + (255 - (num >> 16)) * (percent / 100)));
    const g = Math.min(255, Math.floor(((num >> 8) & 0x00ff) + (255 - ((num >> 8) & 0x00ff)) * (percent / 100)));
    const b = Math.min(255, Math.floor((num & 0x0000ff) + (255 - (num & 0x0000ff)) * (percent / 100)));
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

/**
 * Header Dark Template
 * Two-column layout: Photo LEFT in dark header, Name RIGHT.
 * Body: Left column (gray) - Contact/Education/Skills/Languages
 * Body: Right column (white) - About/Experience/References
 *
 * Color Schema: DUAL (header + sidebar)
 * - Primary: Header background (dark)
 * - Secondary: Sidebar background (light)
 *
 * Matches reference: frontend/Resume-template/organized/02-header/header-dark.jpg
 */
export default function HeaderDark({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, languages, references, customThemeColor, fonts } = data;
    const headingFont = getFontFamily(fonts?.heading || 'Inter');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Get scaled font sizes that respect user's size preference + scale
    const fs = getScaledFontSizes(sizeConfig, scale);

    // Parse dual-color preset (format: "primary|secondary")
    // Fallback to default colors if not set
    const [primaryColor, secondaryColor] = (customThemeColor || '').split('|');
    const headerBgColor = primaryColor || '#334155';     // Dark header
    const leftColumnBg = secondaryColor || '#f1f5f9';    // Light sidebar
    // Derive accent from primary (use lighter version for contrast)
    const accentBarColor = primaryColor ? lightenColor(primaryColor, 40) : '#94a3b8';

    return (
        <div className="w-full h-full" style={{ fontFamily: bodyFont, fontSize: sizeConfig.base }}>
            {/* Header Banner - Photo LEFT, Name RIGHT */}
            <header
                className="resume-section"
                data-paginate
                style={{
                    backgroundColor: headerBgColor,
                    padding: scale < 1 ? '16px' : '28px 32px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: scale < 1 ? '12px' : '24px',
                }}
            >
                {/* Profile Photo - LEFT */}
                {personalInfo.profileImage && (
                    <div style={{ flexShrink: 0 }}>
                        <img
                            src={personalInfo.profileImage}
                            alt={personalInfo.fullName}
                            className="object-cover"
                            style={{
                                width: scale < 1 ? '50px' : '100px',
                                height: scale < 1 ? '50px' : '100px',
                                borderRadius: '50%',
                                border: '3px solid white',
                            }}
                        />
                    </div>
                )}

                {/* Name & Title - RIGHT */}
                <div style={{ flex: 1 }}>
                    <h1
                        style={{
                            fontFamily: headingFont,
                            fontSize: fs.name,
                            fontWeight: 700,
                            color: '#ffffff',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            marginBottom: scale < 1 ? '4px' : '8px',
                        }}
                    >
                        {personalInfo.fullName || 'Your Name'}
                    </h1>
                    {/* Accent Bar */}
                    <div
                        style={{
                            width: scale < 1 ? '40px' : '80px',
                            height: scale < 1 ? '3px' : '5px',
                            backgroundColor: accentBarColor,
                            marginBottom: scale < 1 ? '4px' : '8px',
                        }}
                    />
                    <p
                        style={{
                            fontSize: fs.jobTitle,
                            color: '#ffffff',
                            opacity: 0.9,
                        }}
                    >
                        {personalInfo.jobTitle || 'Job Title'}
                    </p>
                </div>
            </header>

            {/* Two-Column Body */}
            <div style={{ display: 'flex', minHeight: 0 }}>
                {/* LEFT COLUMN - Gray Background */}
                <aside
                    style={{
                        width: scale < 1 ? '35%' : '35%',
                        backgroundColor: leftColumnBg,
                        padding: scale < 1 ? '12px' : '24px',
                    }}
                >
                    {/* Contact Section */}
                    <section className="mb-5 resume-section" data-paginate>
                        <div className="space-y-2">
                            {personalInfo.email && (
                                <ContactItem fs={fs} icon="email" theme={theme} badgeColor={headerBgColor}>
                                    {personalInfo.email}
                                </ContactItem>
                            )}
                            {personalInfo.phone && (
                                <ContactItem fs={fs} icon="phone" theme={theme} badgeColor={headerBgColor}>
                                    {personalInfo.phone}
                                </ContactItem>
                            )}
                            {personalInfo.location && (
                                <ContactItem fs={fs} icon="location" theme={theme} badgeColor={headerBgColor}>
                                    {personalInfo.location}
                                </ContactItem>
                            )}
                            {personalInfo.website && (
                                <ContactItem fs={fs} icon="website" theme={theme} badgeColor={headerBgColor}>
                                    {personalInfo.website}
                                </ContactItem>
                            )}
                        </div>
                    </section>

                    {/* Education Section */}
                    {education.length > 0 && (
                        <section className="mb-5 resume-section" data-paginate>
                            <SidebarSectionHeader fs={fs} headingFont={headingFont}>
                                EDUCATION
                            </SidebarSectionHeader>
                            <div className="space-y-3">
                                {education.map((edu) => (
                                    <div key={edu.id} className="resume-entry" data-paginate>
                                        <h4 style={{
                                            color: theme.text,
                                            fontWeight: 600,
                                            fontSize: fs.entryTitle,
                                            marginBottom: '2px',
                                        }}>
                                            {edu.degree}
                                        </h4>
                                        <p style={{
                                            color: theme.secondary,
                                            fontSize: fs.body,
                                            marginBottom: '2px',
                                        }}>
                                            {edu.school}
                                        </p>
                                        <p style={{
                                            color: theme.text,
                                            opacity: 0.6,
                                            fontSize: fs.small,
                                        }}>
                                            {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills Section */}
                    {skills.length > 0 && (
                        <section className="mb-5 resume-section" data-paginate>
                            <SidebarSectionHeader fs={fs} headingFont={headingFont}>
                                SKILLS
                            </SidebarSectionHeader>
                            <ul style={{
                                listStyle: 'disc',
                                paddingLeft: scale < 1 ? '12px' : '16px',
                                margin: 0,
                            }}>
                                {skills.map((skill) => (
                                    <li
                                        key={skill.id}
                                        style={{
                                            color: theme.text,
                                            fontSize: fs.body,
                                            marginBottom: scale < 1 ? '2px' : '4px',
                                        }}
                                    >
                                        {skill.name}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Languages Section */}
                    {languages && languages.length > 0 && (
                        <section className="resume-section" data-paginate>
                            <SidebarSectionHeader fs={fs} headingFont={headingFont}>
                                LANGUAGE
                            </SidebarSectionHeader>
                            <div className="space-y-1">
                                {languages.map((lang) => (
                                    <p
                                        key={lang.id}
                                        style={{
                                            color: theme.text,
                                            fontSize: fs.body,
                                        }}
                                    >
                                        {lang.name}
                                    </p>
                                ))}
                            </div>
                        </section>
                    )}
                </aside>

                {/* RIGHT COLUMN - White Background */}
                <main
                    style={{
                        flex: 1,
                        backgroundColor: '#ffffff',
                        padding: scale < 1 ? '12px' : '24px',
                    }}
                >
                    {/* About Me / Summary */}
                    {personalInfo.summary && (
                        <section className="mb-5 resume-section" data-paginate>
                            <MainSectionHeader fs={fs} headingFont={headingFont} accentColor={accentBarColor}>
                                About Me
                            </MainSectionHeader>
                            <p style={{
                                color: theme.text,
                                lineHeight: 1.6,
                                fontSize: fs.body,
                            }}>
                                {personalInfo.summary}
                            </p>
                        </section>
                    )}

                    {/* Work Experience */}
                    {experience.length > 0 && (
                        <section className="mb-5 resume-section" data-paginate>
                            <MainSectionHeader fs={fs} headingFont={headingFont} accentColor={accentBarColor}>
                                WORK EXPERIENCE
                            </MainSectionHeader>
                            <div className="space-y-4">
                                {experience.map((exp) => (
                                    <div key={exp.id} className="resume-entry" data-paginate>
                                        {/* Date Range */}
                                        <p style={{
                                            color: headerBgColor,
                                            fontWeight: 600,
                                            fontSize: fs.body,
                                            marginBottom: '2px',
                                        }}>
                                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                        </p>
                                        {/* Company & Location */}
                                        <p style={{
                                            color: theme.text,
                                            fontSize: fs.small,
                                            opacity: 0.7,
                                            marginBottom: '2px',
                                        }}>
                                            {exp.company}
                                            {(exp.city || exp.country) && ` | ${[exp.city, exp.country].filter(Boolean).join(', ')}`}
                                        </p>
                                        {/* Job Title */}
                                        <h4 style={{
                                            color: theme.text,
                                            fontWeight: 600,
                                            fontSize: fs.entryTitle,
                                            marginBottom: '4px',
                                        }}>
                                            {exp.title}
                                        </h4>
                                        {/* Description as bullet points */}
                                        {exp.description && (
                                            <ul style={{
                                                listStyle: 'disc',
                                                paddingLeft: scale < 1 ? '12px' : '16px',
                                                margin: 0,
                                            }}>
                                                {exp.description.split('\n').filter(Boolean).map((line, idx) => (
                                                    <li
                                                        key={idx}
                                                        style={{
                                                            color: theme.text,
                                                            opacity: 0.8,
                                                            fontSize: fs.small,
                                                            lineHeight: 1.5,
                                                            marginBottom: '2px',
                                                        }}
                                                    >
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

                    {/* References */}
                    {references && references.length > 0 && (
                        <section className="resume-section" data-paginate>
                            <MainSectionHeader fs={fs} headingFont={headingFont} accentColor={accentBarColor}>
                                REFERENCES
                            </MainSectionHeader>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: scale < 1 ? '8px' : '16px',
                            }}>
                                {references.map((ref) => (
                                    <div key={ref.id} className="resume-entry" data-paginate>
                                        <h4 style={{
                                            color: theme.text,
                                            fontWeight: 600,
                                            fontSize: fs.body,
                                            marginBottom: '2px',
                                        }}>
                                            {ref.name}
                                        </h4>
                                        <p style={{
                                            color: theme.secondary,
                                            fontSize: fs.tiny,
                                            marginBottom: '2px',
                                        }}>
                                            {ref.company} / {ref.title}
                                        </p>
                                        {ref.phone && (
                                            <p style={{
                                                color: theme.text,
                                                opacity: 0.7,
                                                fontSize: fs.tiny,
                                            }}>
                                                <span style={{ color: accentBarColor, fontWeight: 500 }}>Phone:</span> {ref.phone}
                                            </p>
                                        )}
                                        {ref.email && (
                                            <p style={{
                                                color: theme.text,
                                                opacity: 0.7,
                                                fontSize: fs.tiny,
                                            }}>
                                                <span style={{ color: accentBarColor, fontWeight: 500 }}>Email:</span> {ref.email}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
}

// ============================================
// Helper Components
// ============================================

interface ContactItemProps {
    fs: ScaledFontSizes;
    icon: 'email' | 'phone' | 'location' | 'website';
    theme: { primary: string; text: string };
    badgeColor: string; // Primary color for badge background
    children: React.ReactNode;
}

function ContactItem({ fs, icon, theme, badgeColor, children }: ContactItemProps) {
    // Parse font size to determine scale
    const basePx = parseInt(fs.body);
    const isSmall = basePx < 10;
    const badgeSize = isSmall ? '16px' : '24px';
    const iconSize = isSmall ? '10px' : '14px';

    // Circular filled badge icons - uses badgeColor for inner details
    const icons: Record<string, React.ReactElement> = {
        email: (
            <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="#ffffff">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <path d="M22 6l-10 7L2 6" fill="none" stroke={badgeColor} strokeWidth="2"/>
            </svg>
        ),
        phone: (
            <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="#ffffff">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
        ),
        location: (
            <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="#ffffff">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3" fill={badgeColor}/>
            </svg>
        ),
        website: (
            <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="#ffffff">
                <rect x="2" y="2" width="20" height="20" rx="2"/>
                <line x1="2" y1="12" x2="22" y2="12" stroke={badgeColor} strokeWidth="2"/>
                <path d="M12 2a10 10 0 0 1 3 10 10 10 0 0 1-3 10 10 10 0 0 1-3-10 10 10 0 0 1 3-10z" fill="none" stroke={badgeColor} strokeWidth="2"/>
            </svg>
        ),
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: isSmall ? '6px' : '10px' }}>
            {/* Circular dark badge with white icon */}
            <div
                style={{
                    flexShrink: 0,
                    width: badgeSize,
                    height: badgeSize,
                    backgroundColor: badgeColor,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {icons[icon]}
            </div>
            <span style={{ color: theme.text, fontSize: fs.small }}>{children}</span>
        </div>
    );
}

interface SidebarSectionHeaderProps {
    fs: ScaledFontSizes;
    headingFont: string;
    children: React.ReactNode;
}

function SidebarSectionHeader({ fs, headingFont, children }: SidebarSectionHeaderProps) {
    const basePx = parseInt(fs.body);
    const isSmall = basePx < 10;

    return (
        <h3
            style={{
                fontFamily: headingFont,
                fontSize: fs.sidebarHeading,
                fontWeight: 700,
                color: '#333333',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: isSmall ? '6px' : '12px',
            }}
        >
            {children}
        </h3>
    );
}

interface MainSectionHeaderProps {
    fs: ScaledFontSizes;
    headingFont: string;
    accentColor: string; // Color for the underline border
    children: React.ReactNode;
}

function MainSectionHeader({ fs, headingFont, accentColor, children }: MainSectionHeaderProps) {
    const basePx = parseInt(fs.body);
    const isSmall = basePx < 10;

    return (
        <h3
            style={{
                fontFamily: headingFont,
                fontSize: fs.sectionHeading,
                fontWeight: 700,
                color: '#333333',
                marginBottom: isSmall ? '6px' : '12px',
                paddingBottom: isSmall ? '4px' : '6px',
                borderBottom: `2px solid ${accentColor}`,
            }}
        >
            {children}
        </h3>
    );
}

// Template metadata for registry
export const headerDarkMeta: TemplateMeta = {
    id: 'header-dark',
    name: 'Dark Header',
    category: 'header',
    thumbnail: '/templates/header-dark.png',
    description: 'Two-column layout with dark header and photo on left',
};

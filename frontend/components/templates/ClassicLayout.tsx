import { ResumeData, Experience, Education, Skill, ImageShape, FontSettings, BackgroundSettings } from '../../store/useResumeStore';
import { ThemeColor, getBackgroundStyle, getFontFamily, fontSizes } from '../../lib/themes';
import { MapPin, Phone, Mail, Globe, Linkedin } from 'lucide-react';

interface TemplateProps {
    data: ResumeData;
    theme: ThemeColor;
}

const getShapeClass = (shape?: ImageShape) => {
    switch (shape) {
        case 'circle': return 'rounded-full';
        case 'rounded': return 'rounded-xl';
        case 'square': return 'rounded-none';
        default: return 'rounded-full';
    }
};

export default function ClassicLayout({ data, theme }: TemplateProps) {
    const { personalInfo, experience, education, skills, background, fonts, layoutConfig } = data;
    const bgStyle = getBackgroundStyle(background as BackgroundSettings);
    const headingFont = getFontFamily(fonts?.heading || 'Inter');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Layout Parameters
    const spacingMap = {
        compact: 'mb-4',
        normal: 'mb-6',
        spacious: 'mb-8'
    };
    const marginMap = {
        compact: 'p-6',
        normal: 'p-8',
        wide: 'p-10'
    };

    // Default to 'normal' if undefined
    const sectionMB = spacingMap[layoutConfig?.sectionSpacing || 'normal'];
    const containerPadding = marginMap[layoutConfig?.margins || 'normal'];
    const headerAlign = layoutConfig?.headerAlignment || 'left';

    // Content Sections Map - with resume-section class for page break control
    const sections = {
        summary: personalInfo.summary && (
            <div className={`resume-section ${sectionMB}`}>
                <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b pb-1" style={{ color: theme.heading, borderColor: theme.accent, fontFamily: headingFont }}>
                    Professional Summary
                </h2>
                <p>{personalInfo.summary}</p>
            </div>
        ),
        experience: experience.length > 0 && (
            <div className={`resume-section ${sectionMB}`}>
                <h2 className="text-sm font-bold uppercase tracking-wider mb-3 border-b pb-1" style={{ color: theme.heading, borderColor: theme.accent, fontFamily: headingFont }}>
                    Experience
                </h2>
                <div className={`${layoutConfig?.sectionSpacing === 'compact' ? 'space-y-3' : 'space-y-4'}`}>
                    {experience.map((exp) => (
                        <div key={exp.id} className="resume-entry">
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="font-bold">{exp.title}</h3>
                                <span className="text-xs opacity-75 whitespace-nowrap">
                                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                                </span>
                            </div>
                            <div className="flex justify-between items-center mb-1 text-xs font-semibold" style={{ color: theme.secondary }}>
                                <span>{exp.company}</span>
                                <span>{exp.location}</span>
                            </div>
                            <p className="text-xs whitespace-pre-wrap">{exp.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        ),
        education: education.length > 0 && (
            <div className={`resume-section ${sectionMB}`}>
                <h2 className="text-sm font-bold uppercase tracking-wider mb-3 border-b pb-1" style={{ color: theme.heading, borderColor: theme.accent, fontFamily: headingFont }}>
                    Education
                </h2>
                <div className="space-y-3">
                    {education.map((edu) => (
                        <div key={edu.id} className="resume-entry">
                            <div className="flex justify-between items-baseline">
                                <h3 className="font-bold">{edu.school}</h3>
                                <span className="text-xs opacity-75">{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</span>
                            </div>
                            <div style={{ color: theme.secondary }}>{edu.degree}</div>
                            {edu.description && <p className="text-xs mt-1 opacity-80">{edu.description}</p>}
                        </div>
                    ))}
                </div>
            </div>
        ),
        skills: skills.length > 0 && (
            <div className="resume-section">
                <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b pb-1" style={{ color: theme.heading, borderColor: theme.accent, fontFamily: headingFont }}>
                    Skills
                </h2>
                <p className="text-xs leading-relaxed">
                    {skills.map(s => s.name).join(' • ')}
                </p>
            </div>
        )
    };

    // Determine order
    const defaultOrder = ['summary', 'experience', 'education', 'skills'];
    const order = layoutConfig?.contentOrder || defaultOrder;

    return (
        <div
            className={`w-full h-full ${containerPadding} leading-relaxed`}
            style={{ color: theme.text, fontFamily: bodyFont, fontSize: sizeConfig.base, ...bgStyle }}
        >
            {/* Header */}
            <div className={`border-b-2 pb-6 ${sectionMB}`} style={{ borderColor: theme.primary }}>
                <div className={`flex items-start gap-6 ${headerAlign === 'center' ? 'flex-col items-center text-center' : headerAlign === 'right' ? 'flex-row-reverse text-right' : ''}`}>
                    {personalInfo.profileImage && (
                        <img
                            src={personalInfo.profileImage}
                            alt={personalInfo.fullName}
                            className={`w-24 h-24 object-cover flex-shrink-0 ${getShapeClass(personalInfo.imageShape)}`}
                        />
                    )}
                    <div className="flex-1">
                        <h1 className="font-bold uppercase tracking-wide mb-2" style={{ color: theme.primary, fontFamily: headingFont, fontSize: sizeConfig.heading }}>
                            {personalInfo.fullName || 'Your Name'}
                        </h1>
                        <p className="font-medium mb-4" style={{ color: theme.secondary, fontSize: sizeConfig.subheading }}>
                            {personalInfo.jobTitle || 'Job Title'}
                        </p>

                        <div className={`flex flex-wrap gap-4 text-xs opacity-80 ${headerAlign === 'center' ? 'justify-center' : headerAlign === 'right' ? 'justify-end' : ''}`}>
                            {personalInfo.email && (
                                <div className="flex items-center gap-1">
                                    <Mail size={12} /> {personalInfo.email}
                                </div>
                            )}
                            {personalInfo.phone && (
                                <div className="flex items-center gap-1">
                                    <Phone size={12} /> {personalInfo.phone}
                                </div>
                            )}
                            {personalInfo.location && (
                                <div className="flex items-center gap-1">
                                    <MapPin size={12} /> {personalInfo.location}
                                </div>
                            )}
                            {personalInfo.linkedin && (
                                <div className="flex items-center gap-1">
                                    <Linkedin size={12} /> {personalInfo.linkedin}
                                </div>
                            )}
                            {personalInfo.website && (
                                <div className="flex items-center gap-1">
                                    <Globe size={12} /> {personalInfo.website}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Dynamic Content Sections */}
            {order.map(section => sections[section as keyof typeof sections])}

        </div>
    );
}

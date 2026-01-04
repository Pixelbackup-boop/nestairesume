import { ResumeData, ImageShape, BackgroundSettings } from '../../store/useResumeStore';
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

export default function SidebarLayout({ data, theme }: TemplateProps) {
    const { personalInfo, experience, education, skills, background, fonts, layoutConfig } = data;
    const bgStyle = getBackgroundStyle(background as BackgroundSettings);
    const headingFont = getFontFamily(fonts?.heading || 'Inter');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Layout Params
    const sidebarPos = layoutConfig?.sidebarPos || 'left';
    const sectionSpacing = layoutConfig?.sectionSpacing === 'compact' ? 'space-y-4' : layoutConfig?.sectionSpacing === 'spacious' ? 'space-y-8' : 'space-y-6';
    const sidebarSpacing = layoutConfig?.sectionSpacing === 'compact' ? 'space-y-6' : 'space-y-8';

    // Determine Content Order
    // We split content into Sidebar (Info, Edu, Skills by default) and Main (Summary, Exp).
    // But for full flexibility, we might want to move sections.
    // For now, let's keep the split but allow reordering WITHIN the main area.
    const defaultOrder = ['summary', 'experience'];
    const order = layoutConfig?.contentOrder ? layoutConfig.contentOrder.filter(k => ['summary', 'experience'].includes(k)) : defaultOrder;
    // Add missing if any
    if (!order.includes('summary')) order.unshift('summary');
    if (!order.includes('experience')) order.push('experience');

    // Sidebar Content usually fixed? Or let's just make sidebar flexible too?
    // Doing complex drag-drop across sidebar/main is hard with current config structure.
    // Let's stick to Main Content reordering and Sidebar Position.

    const Sections = {
        summary: personalInfo.summary && (
            <div key="summary" className="resume-section">
                <h2 className="text-lg font-bold uppercase tracking-wider mb-4 border-b-2 pb-2" style={{ color: theme.primary, borderColor: theme.accent, fontFamily: headingFont }}>Profile</h2>
                <p className="leading-relaxed opacity-90">{personalInfo.summary}</p>
            </div>
        ),
        experience: experience.length > 0 && (
            <div key="experience" className="resume-section">
                <h2 className="text-lg font-bold uppercase tracking-wider mb-4 border-b-2 pb-2" style={{ color: theme.primary, borderColor: theme.accent, fontFamily: headingFont }}>Experience</h2>
                <div className={sectionSpacing}>
                    {experience.map(exp => (
                        <div key={exp.id} className="resume-entry">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-bold text-base" style={{ color: theme.heading }}>{exp.title}</h3>
                                <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded">
                                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                </span>
                            </div>
                            <div className="font-medium mb-2" style={{ color: theme.secondary }}>{exp.company}, {exp.location}</div>
                            <p className="text-sm opacity-80 whitespace-pre-wrap">{exp.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        )
    };

    return (
        <div className={`w-full h-full flex ${sidebarPos === 'right' ? 'flex-row-reverse' : 'flex-row'}`} style={{ fontFamily: bodyFont, fontSize: sizeConfig.base, ...bgStyle }}>
            {/* Sidebar - min-h-full ensures it fills entire page height */}
            <div
                className={`w-1/3 min-h-full p-6 text-white ${sidebarSpacing} flex-shrink-0`}
                style={{ backgroundColor: theme.primary }}
            >
                <div className="space-y-4">
                    {personalInfo.profileImage ? (
                        <img
                            src={personalInfo.profileImage}
                            alt={personalInfo.fullName}
                            className={`w-24 h-24 mx-auto object-cover border-4 border-white/20 ${getShapeClass(personalInfo.imageShape)}`}
                        />
                    ) : (
                        <div className={`w-24 h-24 bg-white/20 mx-auto flex items-center justify-center text-3xl font-bold ${getShapeClass(personalInfo.imageShape)}`}>
                            {personalInfo.fullName.charAt(0)}
                        </div>
                    )}
                    <h1 className="font-bold text-center leading-tight" style={{ fontFamily: headingFont, fontSize: sizeConfig.heading }}>
                        {personalInfo.fullName || 'Your Name'}
                    </h1>
                    <p className="text-center opacity-90 font-medium">
                        {personalInfo.jobTitle || 'Job Title'}
                    </p>
                </div>

                <div className="space-y-3 text-xs opacity-90">
                    {personalInfo.email && (
                        <div className="flex items-center gap-2">
                            <Mail size={14} /> <span className="break-all">{personalInfo.email}</span>
                        </div>
                    )}
                    {personalInfo.phone && (
                        <div className="flex items-center gap-2">
                            <Phone size={14} /> <span>{personalInfo.phone}</span>
                        </div>
                    )}
                    {personalInfo.location && (
                        <div className="flex items-center gap-2">
                            <MapPin size={14} /> <span>{personalInfo.location}</span>
                        </div>
                    )}
                    {personalInfo.linkedin && (
                        <div className="flex items-center gap-2">
                            <Linkedin size={14} /> <span className="break-all">{personalInfo.linkedin}</span>
                        </div>
                    )}
                    {personalInfo.website && (
                        <div className="flex items-center gap-2">
                            <Globe size={14} /> <span className="break-all">{personalInfo.website}</span>
                        </div>
                    )}
                </div>

                {/* Education Sidebar */}
                {education.length > 0 && (
                    <div className="resume-section">
                        <h3 className="uppercase tracking-widest font-bold border-b border-white/30 pb-2 mb-4 text-xs">Education</h3>
                        <div className="space-y-4">
                            {education.map(edu => (
                                <div key={edu.id} className="resume-entry">
                                    <div className="font-bold">{edu.school}</div>
                                    <div className="text-xs opacity-80">{edu.degree}</div>
                                    <div className="text-xs opacity-60">{edu.startDate} - {edu.endDate}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Skills Sidebar */}
                {skills.length > 0 && (
                    <div className="resume-section">
                        <h3 className="uppercase tracking-widest font-bold border-b border-white/30 pb-2 mb-4 text-xs">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.map(skill => (
                                <span key={skill.id} className="bg-white/10 px-2 py-1 rounded text-xs">
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className={`flex-1 p-8 ${sectionSpacing}`} style={{ color: theme.text }}>
                {order.map(key => Sections[key as keyof typeof Sections])}
            </div>
        </div>
    );
}

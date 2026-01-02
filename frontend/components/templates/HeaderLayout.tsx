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

export default function HeaderLayout({ data, theme }: TemplateProps) {
    const { personalInfo, experience, education, skills, background, fonts, layoutConfig } = data;
    const bgStyle = getBackgroundStyle(background as BackgroundSettings);
    const headingFont = getFontFamily(fonts?.heading || 'Inter');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Layout Params
    const align = layoutConfig?.headerAlignment || 'center'; // Header layout defaults to center usually
    const spacing = layoutConfig?.sectionSpacing === 'compact' ? 'space-y-6' : 'space-y-10';
    const margin = layoutConfig?.margins === 'compact' ? 'p-6' : layoutConfig?.margins === 'wide' ? 'p-16' : 'p-10';

    // Content Order
    const defaultOrder = ['summary', 'experience', 'education', 'skills'];
    const order = layoutConfig?.contentOrder ? layoutConfig.contentOrder : defaultOrder;

    // Section Renderer
    const renderSection = (key: string) => {
        switch (key) {
            case 'summary': return personalInfo.summary && (
                <div key="summary" className="text-center max-w-2xl mx-auto mb-8">
                    <p className="italic leading-relaxed text-base">{personalInfo.summary}</p>
                </div>
            );
            case 'experience': return experience.length > 0 && (
                <div key="experience">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex-1 h-px" style={{ backgroundColor: theme.accent }}></div>
                        <h2 className="font-bold text-lg uppercase tracking-widest" style={{ color: theme.primary, fontFamily: headingFont }}>Experience</h2>
                        <div className="flex-1 h-px" style={{ backgroundColor: theme.accent }}></div>
                    </div>
                    <div className="space-y-6">
                        {experience.map(exp => (
                            <div key={exp.id} className="relative pl-6 border-l-2" style={{ borderColor: theme.accent }}>
                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-4 border-white" style={{ backgroundColor: theme.secondary }}></div>
                                <h3 className="font-bold text-lg leading-none mb-1">{exp.title}</h3>
                                <div className="flex items-center gap-2 text-xs font-semibold uppercase mb-2" style={{ color: theme.secondary }}>
                                    <span>{exp.company}</span>
                                    <span>•</span>
                                    <span>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                                </div>
                                <p className="opacity-80 leading-relaxed">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            );
            case 'education': return education.length > 0 && (
                <div key="education" className="bg-gray-50 p-6 rounded-xl">
                    <h2 className="font-bold uppercase tracking-widest mb-4 border-b pb-2" style={{ borderColor: theme.accent }}>Education</h2>
                    <div className="space-y-4">
                        {education.map(edu => (
                            <div key={edu.id}>
                                <div className="font-bold">{edu.school}</div>
                                <div className="text-sm">{edu.degree}</div>
                                <div className="text-xs opacity-60">{edu.startDate} - {edu.endDate}</div>
                            </div>
                        ))}
                    </div>
                </div>
            );
            case 'skills': return skills.length > 0 && (
                <div key="skills" className="bg-gray-50 p-6 rounded-xl">
                    <h2 className="font-bold uppercase tracking-widest mb-4 border-b pb-2" style={{ borderColor: theme.accent }}>Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {skills.map(skill => (
                            <span
                                key={skill.id}
                                className="px-3 py-1 rounded-full text-xs font-medium border"
                                style={{ borderColor: theme.secondary, color: theme.primary, backgroundColor: 'white' }}
                            >
                                {skill.name}
                            </span>
                        ))}
                    </div>
                </div>
            );
            default: return null;
        }
    };

    return (
        <div className="w-full h-full" style={{ fontFamily: bodyFont, fontSize: sizeConfig.base, ...bgStyle }}>
            {/* Bold Header */}
            <div className={`${margin} text-${align} space-y-4`} style={{ backgroundColor: theme.primary, color: 'white' }}>
                {personalInfo.profileImage ? (
                    <img
                        src={personalInfo.profileImage}
                        alt={personalInfo.fullName}
                        className={`w-28 h-28 ${align === 'center' ? 'mx-auto' : ''} object-cover border-4 border-white/30 shadow-lg ${getShapeClass(personalInfo.imageShape)}`}
                    />
                ) : (
                    <div className={`w-28 h-28 bg-white/20 ${align === 'center' ? 'mx-auto' : ''} flex items-center justify-center text-4xl font-bold ${getShapeClass(personalInfo.imageShape)}`}>
                        {personalInfo.fullName.charAt(0)}
                    </div>
                )}
                <h1 className="font-extrabold tracking-tight uppercase" style={{ fontFamily: headingFont, fontSize: sizeConfig.heading }}>
                    {personalInfo.fullName || 'Your Name'}
                </h1>
                <p className="text-xl font-medium opacity-90 tracking-wide">
                    {personalInfo.jobTitle || 'Job Title'}
                </p>

                <div className={`flex flex-wrap ${align === 'center' ? 'justify-center' : 'justify-start'} gap-4 text-xs opacity-80 pt-2`}>
                    {personalInfo.email && <div className="flex items-center gap-1"><Mail size={12} /> {personalInfo.email}</div>}
                    {personalInfo.phone && <div className="flex items-center gap-1"><Phone size={12} /> {personalInfo.phone}</div>}
                    {personalInfo.location && <div className="flex items-center gap-1"><MapPin size={12} /> {personalInfo.location}</div>}
                </div>
            </div>

            <div className={`${margin} ${spacing}`} style={{ color: theme.text }}>
                {order.map(key => {
                    // Group Edu and Skills if adjacent? 
                    // To reproduce original grid, we might need special handling.
                    // But simpler to just stack them for now or verify if they were grid.
                    // Original code had Edu and Skills in a grid-cols-2 at the bottom.
                    // Let's preserve that structure using a specialized renderer if they are consecutive?
                    // Or simpler: Just render them.
                    return renderSection(key);
                })}
            </div>
        </div>
    );
}

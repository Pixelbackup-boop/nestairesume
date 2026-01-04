import { ResumeData, ImageShape, BackgroundSettings } from '../../store/useResumeStore';
import { ThemeColor, getBackgroundStyle, getFontFamily, fontSizes } from '../../lib/themes';

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

export default function MinimalLayout({ data, theme }: TemplateProps) {
    const { personalInfo, experience, education, skills, background, fonts, layoutConfig } = data;
    const bgStyle = getBackgroundStyle(background as BackgroundSettings);
    const headingFont = getFontFamily(fonts?.heading || 'Inter');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Layout Params
    const spacing = layoutConfig?.sectionSpacing === 'compact' ? 'space-y-8' : layoutConfig?.sectionSpacing === 'spacious' ? 'space-y-16' : 'space-y-12';
    const margin = layoutConfig?.margins === 'compact' ? 'p-8' : layoutConfig?.margins === 'wide' ? 'p-16' : 'p-12';

    // Default Order
    const defaultOrder = ['summary', 'experience', 'education', 'skills'];
    const order = layoutConfig?.contentOrder ? layoutConfig.contentOrder : defaultOrder;

    const renderSection = (key: string) => {
        switch (key) {
            case 'summary': return personalInfo.summary && (
                <div key="summary">
                    <div className="font-bold text-xs uppercase tracking-widest mb-2" style={{ color: theme.secondary }}>About</div>
                    <p className="leading-relaxed opacity-80 max-w-lg">{personalInfo.summary}</p>
                </div>
            );
            case 'experience': return experience.length > 0 && (
                <div key="experience">
                    <div className="font-bold text-xs uppercase tracking-widest mb-4" style={{ color: theme.secondary }}>Experience</div>
                    <div className="space-y-6">
                        {experience.map(exp => (
                            <div key={exp.id}>
                                <div className="flex items-baseline justify-between mb-1">
                                    <h3 className="font-semibold text-base">{exp.title}</h3>
                                    <span className="text-xs opacity-50">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                                </div>
                                <div className="text-xs mb-2 opacity-70 font-medium">{exp.company}, {exp.location}</div>
                                <p className="opacity-80 leading-relaxed text-sm">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            );
            case 'education': return education.length > 0 && (
                <div key="education">
                    <div className="font-bold text-xs uppercase tracking-widest mb-4" style={{ color: theme.secondary }}>Education</div>
                    <div className="space-y-4">
                        {education.map(edu => (
                            <div key={edu.id}>
                                <h3 className="font-semibold">{edu.school}</h3>
                                <div className="text-sm opacity-80">{edu.degree}</div>
                                <div className="text-xs opacity-50">{edu.startDate} - {edu.endDate}</div>
                            </div>
                        ))}
                    </div>
                </div>
            );
            case 'skills': return skills.length > 0 && (
                <div key="skills">
                    <div className="font-bold text-xs uppercase tracking-widest mb-4" style={{ color: theme.secondary }}>Skills</div>
                    <div className="flex flex-wrap gap-x-2 gap-y-1 opacity-80">
                        {skills.map((s, i) => (
                            <span key={s.id}>
                                {s.name}{i < skills.length - 1 && <span className="text-gray-300 ml-2">/</span>}
                            </span>
                        ))}
                    </div>
                </div>
            );
            default: return null;
        }
    };

    return (
        <div className={`w-full h-full ${margin}`} style={{ color: theme.heading, fontFamily: bodyFont, fontSize: sizeConfig.base, ...bgStyle }}>
            <header className="mb-10 flex items-start gap-6">
                {personalInfo.profileImage && (
                    <img
                        src={personalInfo.profileImage}
                        alt={personalInfo.fullName}
                        className={`w-20 h-20 object-cover flex-shrink-0 ${getShapeClass(personalInfo.imageShape)}`}
                    />
                )}
                <div>
                    <h1 className="font-light mb-2" style={{ fontFamily: headingFont, fontSize: sizeConfig.heading }}>{personalInfo.fullName}</h1>
                    <p className="text-lg opacity-60 mb-4">{personalInfo.jobTitle}</p>

                    <div className="flex gap-4 text-xs opacity-50">
                        {personalInfo.email && <span>{personalInfo.email}</span>}
                        {personalInfo.phone && <span>{personalInfo.phone}</span>}
                        {personalInfo.location && <span>{personalInfo.location}</span>}
                        {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-[150px_1fr] gap-8">
                {/* Labels Column (Hidden in this dynamic approach? No, Minimal layout had labels column. 
                   Recreating labels column dynamically is tricky if order changes. 
                   Wait, MinimalLayout uses a specific grid structure: Left col = labels, Right col = content.
                   If we reorder content, we must reorder labels too. 
                   OR we abandon the grid for a simpler list? 
                   The user asked for "structural configurations". 
                   Let's TRY to keep the grid if order allows it. 
                   Actually, let's just make the RIGHT column ordered. The left column can be just labels? NO, they must align.
                   
                   Better approach: Render ROW by ROW.
                   Each section is a ROW with [Label] [Content].
                */}
                <div className="col-span-2 space-y-12">
                    {order.map(key => {
                        const content = renderSection(key);
                        if (!content) return null;
                        // We need to extract the label and content.
                        // Actually, let's redefine renderSection to return the ROW.

                        // Hacky re-implementation inline:
                        switch (key) {
                            case 'summary': return personalInfo.summary && (
                                <div key="summary" className="resume-section grid grid-cols-[150px_1fr] gap-8">
                                    <div className="text-right font-bold text-xs uppercase tracking-widest pt-1" style={{ color: theme.secondary }}>About</div>
                                    <div><p className="leading-relaxed opacity-80 max-w-lg">{personalInfo.summary}</p></div>
                                </div>
                            );
                            case 'experience': return experience.length > 0 && (
                                <div key="experience" className="resume-section grid grid-cols-[150px_1fr] gap-8">
                                    <div className="text-right font-bold text-xs uppercase tracking-widest pt-1" style={{ color: theme.secondary }}>Experience</div>
                                    <div className="space-y-6">
                                        {experience.map(exp => (
                                            <div key={exp.id} className="resume-entry">
                                                <div className="flex items-baseline justify-between mb-1">
                                                    <h3 className="font-semibold text-base">{exp.title}</h3>
                                                    <span className="text-xs opacity-50">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                                                </div>
                                                <div className="text-xs mb-2 opacity-70 font-medium">{exp.company}, {exp.location}</div>
                                                <p className="opacity-80 leading-relaxed text-sm">{exp.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                            case 'education': return education.length > 0 && (
                                <div key="education" className="resume-section grid grid-cols-[150px_1fr] gap-8">
                                    <div className="text-right font-bold text-xs uppercase tracking-widest pt-1" style={{ color: theme.secondary }}>Education</div>
                                    <div className="space-y-4">
                                        {education.map(edu => (
                                            <div key={edu.id} className="resume-entry">
                                                <h3 className="font-semibold">{edu.school}</h3>
                                                <div className="text-sm opacity-80">{edu.degree}</div>
                                                <div className="text-xs opacity-50">{edu.startDate} - {edu.endDate}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                            case 'skills': return skills.length > 0 && (
                                <div key="skills" className="resume-section grid grid-cols-[150px_1fr] gap-8">
                                    <div className="text-right font-bold text-xs uppercase tracking-widest pt-1" style={{ color: theme.secondary }}>Skills</div>
                                    <div className="flex flex-wrap gap-x-2 gap-y-1 opacity-80">
                                        {skills.map((s, i) => (
                                            <span key={s.id}>
                                                {s.name}{i < skills.length - 1 && <span className="text-gray-300 ml-2">/</span>}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
        </div>
    );
}

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

export default function CreativeLayout({ data, theme }: TemplateProps) {
    const { personalInfo, experience, education, skills, background, fonts, layoutConfig } = data;
    const bgStyle = getBackgroundStyle(background as BackgroundSettings);
    const headingFont = getFontFamily(fonts?.heading || 'Inter');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');
    const sizeConfig = fontSizes[fonts?.size || 'medium'];

    // Layout Params
    const sidebarPos = layoutConfig?.sidebarPos || 'left';
    const align = layoutConfig?.headerAlignment || 'left';
    const spacing = layoutConfig?.sectionSpacing === 'compact' ? 'space-y-4' : layoutConfig?.sectionSpacing === 'spacious' ? 'space-y-10' : 'space-y-8';
    const margin = layoutConfig?.margins === 'compact' ? 'p-6' : layoutConfig?.margins === 'wide' ? 'p-12' : 'p-8';

    // Helper for alignment classes
    const alignClass = align === 'center' ? 'text-center items-center' : align === 'right' ? 'text-right items-end' : 'text-left items-start';
    const textBaseClass = align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left';

    const defaultMainOrder = ['summary', 'experience', 'education'];
    const mainOrder = layoutConfig?.contentOrder ? layoutConfig.contentOrder.filter(k => defaultMainOrder.includes(k)) : defaultMainOrder;
    if (!mainOrder.includes('summary')) mainOrder.unshift('summary');
    if (!mainOrder.includes('experience')) mainOrder.push('experience');
    if (!mainOrder.includes('education')) mainOrder.push('education');

    const renderMainSection = (key: string) => {
        switch (key) {
            case 'summary': return personalInfo.summary && (
                <div key="summary" className={`bg-white p-6 rounded-2xl shadow-sm border border-gray-100 ${textBaseClass}`}>
                    <h3 className="font-bold text-sm uppercase tracking-wider mb-3" style={{ color: theme.primary, fontFamily: headingFont }}>About Me</h3>
                    <p className="text-sm opacity-80 leading-relaxed">{personalInfo.summary}</p>
                </div>
            );
            case 'experience': return experience.length > 0 && (
                <div key="experience" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className={`font-bold text-sm uppercase tracking-wider mb-6 ${textBaseClass}`} style={{ color: theme.primary, fontFamily: headingFont }}>Work Experience</h3>
                    <div className="space-y-8">
                        {experience.map((exp, i) => (
                            <div key={exp.id} className={`relative ${align === 'right' ? 'pr-6 text-right' : 'pl-6 text-left'}`}>
                                {/* Timeline Dot */}
                                <div
                                    className={`absolute top-1.5 w-2 h-2 rounded-full ${align === 'right' ? 'right-0' : 'left-0'}`}
                                    style={{ backgroundColor: theme.secondary }}
                                />
                                <div className={`flex flex-col mb-1 ${align === 'right' ? 'items-end' : 'items-start'}`}>
                                    <h4 className="font-bold text-base">{exp.title}</h4>
                                    <span className="text-xs font-bold py-1 px-2 rounded bg-gray-100 opacity-70">
                                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                    </span>
                                </div>
                                <div className="text-sm font-medium mb-2 opacity-60">{exp.company}, {exp.location}</div>
                                <p className="text-sm opacity-80">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            );
            case 'education': return education.length > 0 && (
                <div key="education" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className={`font-bold text-sm uppercase tracking-wider mb-4 ${textBaseClass}`} style={{ color: theme.primary, fontFamily: headingFont }}>Education</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {education.map(edu => (
                            <div key={edu.id} className={`p-4 rounded-xl bg-gray-50 border border-gray-100 ${textBaseClass}`}>
                                <div className="font-bold text-sm">{edu.school}</div>
                                <div className="text-xs opacity-70 mb-2">{edu.degree}</div>
                                <div className="text-xs font-medium" style={{ color: theme.secondary }}>{edu.startDate} - {edu.endDate}</div>
                            </div>
                        ))}
                    </div>
                </div>
            );
            default: return null;
        }
    };

    return (
        <div className={`w-full h-full ${margin}`} style={{ color: theme.text, fontFamily: bodyFont, fontSize: sizeConfig.base, ...bgStyle }}>
            <div className={`grid grid-cols-12 gap-8 h-full ${sidebarPos === 'right' ? 'flex-row-reverse' : ''}`}>
                {/* 
                   When reversing flex direction on a grid container, it DOES NOT implicitly reorder grid columns unless they are auto-placed.
                   However, if we conditionally render the DOM blocks (Sidebar vs Main), we don't need flex-row-reverse or grid tricks.
                   We just render Sidebar first or second.
                   I'll remove flex-row-reverse and just rely on the conditional rendering below which is already correct.
                */}

                {sidebarPos === 'left' ? (
                    <>
                        {/* Sidebar Left */}
                        <div className="col-span-4 flex flex-col gap-4">
                            {/* Profile/Skills */}
                            <div className={`bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col ${alignClass}`}>
                                {personalInfo.profileImage ? (
                                    <img
                                        src={personalInfo.profileImage}
                                        alt={personalInfo.fullName}
                                        className={`w-20 h-20 mb-4 object-cover shadow-lg ${getShapeClass(personalInfo.imageShape)}`}
                                    />
                                ) : (
                                    <div className={`w-20 h-20 mb-4 flex items-center justify-center text-2xl font-bold text-white shadow-lg ${getShapeClass(personalInfo.imageShape)}`} style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}>
                                        {personalInfo.fullName.charAt(0)}
                                    </div>
                                )}
                                <h1 className="text-xl font-bold mb-1" style={{ fontFamily: headingFont }}>{personalInfo.fullName}</h1>
                                <p className="text-sm font-medium opacity-60 mb-4">{personalInfo.jobTitle}</p>

                                <div className={`w-full space-y-2 text-xs mt-4 pt-4 border-t ${textBaseClass}`}>
                                    {personalInfo.email && <div className="font-medium opacity-80">{personalInfo.email}</div>}
                                    {personalInfo.phone && <div className="font-medium opacity-80">{personalInfo.phone}</div>}
                                    {personalInfo.location && <div className="font-medium opacity-80">{personalInfo.location}</div>}
                                    {personalInfo.linkedin && <div className="font-medium opacity-80 break-all">{personalInfo.linkedin}</div>}
                                </div>
                            </div>

                            {skills.length > 0 && (
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex-1">
                                    <h3 className={`font-bold text-sm uppercase tracking-wider mb-4 ${textBaseClass}`} style={{ color: theme.primary, fontFamily: headingFont }}>Skills</h3>
                                    <div className="space-y-3">
                                        {skills.map(skill => (
                                            <div key={skill.id}>
                                                <div className="flex justify-between text-xs mb-1 font-medium">
                                                    <span>{skill.name}</span>
                                                    <span style={{ color: theme.secondary }}>{skill.level}/5</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                                    <div className="h-full rounded-full" style={{ width: `${(skill.level / 5) * 100}%`, backgroundColor: theme.secondary }}></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Main Content Right */}
                        <div className="col-span-8 flex flex-col gap-6">
                            {mainOrder.map(key => renderMainSection(key))}
                        </div>
                    </>
                ) : (
                    <>
                        {/* Main Content Left (swapped) */}
                        <div className="col-span-8 flex flex-col gap-6 order-last lg:order-first">
                            {mainOrder.map(key => renderMainSection(key))}
                        </div>

                        {/* Sidebar Right */}
                        <div className="col-span-4 flex flex-col gap-4">
                            {/* Profile/Skills */}
                            <div className={`bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col ${alignClass}`}>
                                {personalInfo.profileImage ? (
                                    <img
                                        src={personalInfo.profileImage}
                                        alt={personalInfo.fullName}
                                        className={`w-20 h-20 mb-4 object-cover shadow-lg ${getShapeClass(personalInfo.imageShape)}`}
                                    />
                                ) : (
                                    <div className={`w-20 h-20 mb-4 flex items-center justify-center text-2xl font-bold text-white shadow-lg ${getShapeClass(personalInfo.imageShape)}`} style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}>
                                        {personalInfo.fullName.charAt(0)}
                                    </div>
                                )}
                                <h1 className="text-xl font-bold mb-1" style={{ fontFamily: headingFont }}>{personalInfo.fullName}</h1>
                                <p className="text-sm font-medium opacity-60 mb-4">{personalInfo.jobTitle}</p>

                                <div className={`w-full space-y-2 text-xs mt-4 pt-4 border-t ${textBaseClass}`}>
                                    {personalInfo.email && <div className="font-medium opacity-80">{personalInfo.email}</div>}
                                    {personalInfo.phone && <div className="font-medium opacity-80">{personalInfo.phone}</div>}
                                    {personalInfo.location && <div className="font-medium opacity-80">{personalInfo.location}</div>}
                                    {personalInfo.linkedin && <div className="font-medium opacity-80 break-all">{personalInfo.linkedin}</div>}
                                </div>
                            </div>

                            {skills.length > 0 && (
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex-1">
                                    <h3 className={`font-bold text-sm uppercase tracking-wider mb-4 ${textBaseClass}`} style={{ color: theme.primary, fontFamily: headingFont }}>Skills</h3>
                                    <div className="space-y-3">
                                        {skills.map(skill => (
                                            <div key={skill.id}>
                                                <div className="flex justify-between text-xs mb-1 font-medium">
                                                    <span>{skill.name}</span>
                                                    <span style={{ color: theme.secondary }}>{skill.level}/5</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                                    <div className="h-full rounded-full" style={{ width: `${(skill.level / 5) * 100}%`, backgroundColor: theme.secondary }}></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}

            </div>
        </div>
    );
}

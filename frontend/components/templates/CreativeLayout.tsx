import { ResumeData } from '../../store/useResumeStore';
import { ThemeColor } from '../../lib/themes';

interface TemplateProps {
    data: ResumeData;
    theme: ThemeColor;
}

export default function CreativeLayout({ data, theme }: TemplateProps) {
    const { personalInfo, experience, education, skills } = data;

    return (
        <div className="w-full h-full p-8 font-sans" style={{ backgroundColor: '#fafafa', color: theme.text }}>
            <div className="grid grid-cols-12 gap-8 h-full">

                {/* Sidebar Left */}
                <div className="col-span-4 flex flex-col gap-4">
                    {/* Profile Card */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                        <div className="w-20 h-20 rounded-full mb-4 flex items-center justify-center text-2xl font-bold text-white shadow-lg" style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}>
                            {personalInfo.fullName.charAt(0)}
                        </div>
                        <h1 className="text-xl font-bold mb-1">{personalInfo.fullName}</h1>
                        <p className="text-sm font-medium opacity-60 mb-4">{personalInfo.jobTitle}</p>

                        <div className="w-full space-y-2 text-xs text-left mt-4 pt-4 border-t">
                            {personalInfo.email && <div className="font-medium opacity-80">{personalInfo.email}</div>}
                            {personalInfo.phone && <div className="font-medium opacity-80">{personalInfo.phone}</div>}
                            {personalInfo.location && <div className="font-medium opacity-80">{personalInfo.location}</div>}
                            {personalInfo.linkedin && <div className="font-medium opacity-80 break-all">{personalInfo.linkedin}</div>}
                        </div>
                    </div>

                    {/* Skills Card */}
                    {skills.length > 0 && (
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex-1">
                            <h3 className="font-bold text-sm uppercase tracking-wider mb-4" style={{ color: theme.primary }}>Skills</h3>
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
                    {personalInfo.summary && (
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-sm uppercase tracking-wider mb-3" style={{ color: theme.primary }}>About Me</h3>
                            <p className="text-sm opacity-80 leading-relaxed">{personalInfo.summary}</p>
                        </div>
                    )}

                    {experience.length > 0 && (
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-sm uppercase tracking-wider mb-6" style={{ color: theme.primary }}>Work Experience</h3>
                            <div className="space-y-8">
                                {experience.map((exp, i) => (
                                    <div key={exp.id} className="relative pl-6 before:absolute before:left-0 before:top-1.5 before:w-2 before:h-2 before:rounded-full" style={{ '--before-bg': theme.secondary } as any}>
                                        <style jsx>{`div::before { background-color: var(--before-bg); }`}</style>
                                        <div className="flex justify-between items-start mb-1">
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
                    )}

                    {education.length > 0 && (
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-sm uppercase tracking-wider mb-4" style={{ color: theme.primary }}>Education</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {education.map(edu => (
                                    <div key={edu.id} className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                                        <div className="font-bold text-sm">{edu.school}</div>
                                        <div className="text-xs opacity-70 mb-2">{edu.degree}</div>
                                        <div className="text-xs font-medium" style={{ color: theme.secondary }}>{edu.startDate} - {edu.endDate}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

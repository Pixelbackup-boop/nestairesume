import { ResumeData } from '../../store/useResumeStore';
import { ThemeColor } from '../../lib/themes';
import { MapPin, Phone, Mail, Globe, Linkedin } from 'lucide-react';

interface TemplateProps {
    data: ResumeData;
    theme: ThemeColor;
}

export default function HeaderLayout({ data, theme }: TemplateProps) {
    const { personalInfo, experience, education, skills } = data;

    return (
        <div className="w-full h-full bg-white font-sans text-sm">
            {/* Bold Header */}
            <div className="p-10 text-center space-y-4" style={{ backgroundColor: theme.primary, color: 'white' }}>
                <h1 className="text-4xl font-extrabold tracking-tight uppercase">
                    {personalInfo.fullName || 'Your Name'}
                </h1>
                <p className="text-xl font-medium opacity-90 tracking-wide">
                    {personalInfo.jobTitle || 'Job Title'}
                </p>

                <div className="flex flex-wrap justify-center gap-4 text-xs opacity-80 pt-2">
                    {personalInfo.email && <div className="flex items-center gap-1"><Mail size={12} /> {personalInfo.email}</div>}
                    {personalInfo.phone && <div className="flex items-center gap-1"><Phone size={12} /> {personalInfo.phone}</div>}
                    {personalInfo.location && <div className="flex items-center gap-1"><MapPin size={12} /> {personalInfo.location}</div>}
                </div>
            </div>

            <div className="p-10 space-y-8" style={{ color: theme.text }}>
                {/* Summary */}
                {personalInfo.summary && (
                    <div className="text-center max-w-2xl mx-auto mb-8">
                        <p className="italic leading-relaxed text-base">{personalInfo.summary}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 gap-8">
                    {/* Experience */}
                    {experience.length > 0 && (
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex-1 h-px" style={{ backgroundColor: theme.accent }}></div>
                                <h2 className="font-bold text-lg uppercase tracking-widest" style={{ color: theme.primary }}>Experience</h2>
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
                    )}

                    <div className="grid grid-cols-2 gap-8">
                        {/* Education */}
                        <div className="bg-gray-50 p-6 rounded-xl">
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

                        {/* Skills */}
                        <div className="bg-gray-50 p-6 rounded-xl">
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
                    </div>
                </div>
            </div>
        </div>
    );
}

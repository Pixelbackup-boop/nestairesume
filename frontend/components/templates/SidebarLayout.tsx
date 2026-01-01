import { ResumeData } from '../../store/useResumeStore';
import { ThemeColor } from '../../lib/themes';
import { MapPin, Phone, Mail, Globe, Linkedin } from 'lucide-react';

interface TemplateProps {
    data: ResumeData;
    theme: ThemeColor;
}

export default function SidebarLayout({ data, theme }: TemplateProps) {
    const { personalInfo, experience, education, skills } = data;

    return (
        <div className="w-full h-full flex bg-white font-sans text-sm">
            {/* Left Sidebar */}
            <div
                className="w-1/3 p-6 text-white space-y-8"
                style={{ backgroundColor: theme.primary }}
            >
                <div className="space-y-4">
                    <div className="w-24 h-24 rounded-full bg-white/20 mx-auto flex items-center justify-center text-3xl font-bold">
                        {personalInfo.fullName.charAt(0)}
                    </div>
                    <h1 className="text-2xl font-bold text-center leading-tight">
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
                    <div>
                        <h3 className="uppercase tracking-widest font-bold border-b border-white/30 pb-2 mb-4 text-xs">Education</h3>
                        <div className="space-y-4">
                            {education.map(edu => (
                                <div key={edu.id}>
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
                    <div>
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

            {/* Right Content */}
            <div className="flex-1 p-8 space-y-8" style={{ color: theme.text }}>
                {personalInfo.summary && (
                    <div>
                        <h2 className="text-lg font-bold uppercase tracking-wider mb-4 border-b-2 pb-2" style={{ color: theme.primary, borderColor: theme.accent }}>Profile</h2>
                        <p className="leading-relaxed opacity-90">{personalInfo.summary}</p>
                    </div>
                )}

                {experience.length > 0 && (
                    <div>
                        <h2 className="text-lg font-bold uppercase tracking-wider mb-4 border-b-2 pb-2" style={{ color: theme.primary, borderColor: theme.accent }}>Experience</h2>
                        <div className="space-y-6">
                            {experience.map(exp => (
                                <div key={exp.id}>
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
                )}
            </div>
        </div>
    );
}

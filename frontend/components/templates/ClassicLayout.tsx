import { ResumeData, Experience, Education, Skill } from '../../store/useResumeStore';
import { ThemeColor } from '../../lib/themes';
import { MapPin, Phone, Mail, Globe, Linkedin } from 'lucide-react';

interface TemplateProps {
    data: ResumeData;
    theme: ThemeColor;
}

export default function ClassicLayout({ data, theme }: TemplateProps) {
    const { personalInfo, experience, education, skills } = data;

    return (
        <div
            className="w-full h-full p-8 font-serif text-sm leading-relaxed"
            style={{ color: theme.text, backgroundColor: theme.background }}
        >
            {/* Header */}
            <div className="border-b-2 pb-6 mb-6" style={{ borderColor: theme.primary }}>
                <h1 className="text-3xl font-bold uppercase tracking-wide mb-2" style={{ color: theme.primary }}>
                    {personalInfo.fullName || 'Your Name'}
                </h1>
                <p className="text-lg font-medium mb-4" style={{ color: theme.secondary }}>
                    {personalInfo.jobTitle || 'Job Title'}
                </p>

                <div className="flex flex-wrap gap-4 text-xs opacity-80">
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

            {/* Summary */}
            {personalInfo.summary && (
                <div className="mb-6">
                    <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b pb-1" style={{ color: theme.heading, borderColor: theme.accent }}>
                        Professional Summary
                    </h2>
                    <p>{personalInfo.summary}</p>
                </div>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-sm font-bold uppercase tracking-wider mb-3 border-b pb-1" style={{ color: theme.heading, borderColor: theme.accent }}>
                        Experience
                    </h2>
                    <div className="space-y-4">
                        {experience.map((exp) => (
                            <div key={exp.id}>
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
            )}

            {/* Education */}
            {education.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-sm font-bold uppercase tracking-wider mb-3 border-b pb-1" style={{ color: theme.heading, borderColor: theme.accent }}>
                        Education
                    </h2>
                    <div className="space-y-3">
                        {education.map((edu) => (
                            <div key={edu.id}>
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
            )}

            {/* Skills */}
            {skills.length > 0 && (
                <div>
                    <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b pb-1" style={{ color: theme.heading, borderColor: theme.accent }}>
                        Skills
                    </h2>
                    <p className="text-xs leading-relaxed">
                        {skills.map(s => s.name).join(' • ')}
                    </p>
                </div>
            )}
        </div>
    );
}

import { ResumeData } from '../../store/useResumeStore';
import { ThemeColor } from '../../lib/themes';

interface TemplateProps {
    data: ResumeData;
    theme: ThemeColor;
}

export default function MinimalLayout({ data, theme }: TemplateProps) {
    const { personalInfo, experience, education, skills } = data;

    return (
        <div className="w-full h-full p-12 bg-white font-sans text-sm" style={{ color: theme.heading }}>
            <header className="mb-10">
                <h1 className="text-4xl font-light mb-2">{personalInfo.fullName}</h1>
                <p className="text-lg opacity-60 mb-4">{personalInfo.jobTitle}</p>

                <div className="flex gap-4 text-xs opacity-50">
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                    {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
                </div>
            </header>

            <div className="grid grid-cols-[150px_1fr] gap-8">

                {/* Left Column (Labels) */}
                <div className="text-right space-y-12">
                    {personalInfo.summary && <div className="font-bold text-xs uppercase tracking-widest" style={{ color: theme.secondary }}>About</div>}
                    {experience.length > 0 && <div className="font-bold text-xs uppercase tracking-widest" style={{ color: theme.secondary }}>Experience</div>}
                    {education.length > 0 && <div className="font-bold text-xs uppercase tracking-widest" style={{ color: theme.secondary }}>Education</div>}
                    {skills.length > 0 && <div className="font-bold text-xs uppercase tracking-widest" style={{ color: theme.secondary }}>Skills</div>}
                </div>

                {/* Right Column (Content) */}
                <div className="space-y-12">
                    {personalInfo.summary && (
                        <p className="leading-relaxed opacity-80 max-w-lg">{personalInfo.summary}</p>
                    )}

                    {experience.length > 0 && (
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
                    )}

                    {education.length > 0 && (
                        <div className="space-y-4">
                            {education.map(edu => (
                                <div key={edu.id}>
                                    <h3 className="font-semibold">{edu.school}</h3>
                                    <div className="text-sm opacity-80">{edu.degree}</div>
                                    <div className="text-xs opacity-50">{edu.startDate} - {edu.endDate}</div>
                                </div>
                            ))}
                        </div>
                    )}

                    {skills.length > 0 && (
                        <div className="flex flex-wrap gap-x-2 gap-y-1 opacity-80">
                            {skills.map((s, i) => (
                                <span key={s.id}>
                                    {s.name}{i < skills.length - 1 && <span className="text-gray-300 ml-2">/</span>}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

'use client';

import { useResumeStore, Education } from '../../store/useResumeStore';
import { Plus, Trash2, ArrowUp, ArrowDown, ChevronDown, ChevronUp, Award, BadgeCheck } from 'lucide-react';
import { useState } from 'react';
// Using native crypto.randomUUID() instead of uuid package
import CollapsibleSection from './CollapsibleSection';
import CertificationsSection from './CertificationsSection';
import AwardsSection from './AwardsSection';
import { useTranslations } from 'next-intl';

export default function EducationForm() {
    const t = useTranslations('Builder');
    const { resumeData, addEducation, updateEducation, removeEducation, moveEducation } = useResumeStore();
    const { education, certifications, awards } = resumeData;
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const handleAdd = () => {
        const newEdu: Education = {
            id: crypto.randomUUID(),
            school: '',
            degree: '',
            city: '',
            country: '',
            startDate: '',
            endDate: '',
            current: false,
            description: '',
            gpa: '',
            honors: '',
            clubs: '',
        };
        addEducation(newEdu);
        setExpandedId(newEdu.id);
    };

    const handleToggle = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const handleChange = (id: string, field: keyof Education, value: any) => {
        updateEducation(id, { [field]: value });
    };

    return (
        <div className="space-y-6 animate-in slide-in-from-left-4 fade-in duration-300">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('education.title')}</h2>
                    <p className="text-gray-400 text-sm">{t('education.subtitle')}</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 bg-accent-green/10 text-accent-green px-4 py-2 rounded-lg hover:bg-accent-green/20 transition text-sm font-medium"
                >
                    <Plus size={16} /> {t('education.add')}
                </button>
            </div>

            <div className="space-y-4">
                {education.map((edu, index) => (
                    <div key={edu.id} className="bg-bg-card-light border border-border-subtle rounded-xl overflow-hidden transition-all duration-200">
                        {/* Header */}
                        <div
                            className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5"
                            onClick={() => handleToggle(edu.id)}
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex flex-col gap-0.5">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); moveEducation(edu.id, 'up'); }}
                                        disabled={index === 0}
                                        className="text-gray-500 hover:text-accent-green disabled:opacity-30 disabled:cursor-not-allowed transition p-1"
                                        title="Move up"
                                    >
                                        <ArrowUp size={14} />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); moveEducation(edu.id, 'down'); }}
                                        disabled={index === education.length - 1}
                                        className="text-gray-500 hover:text-accent-green disabled:opacity-30 disabled:cursor-not-allowed transition p-1"
                                        title="Move down"
                                    >
                                        <ArrowDown size={14} />
                                    </button>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">{edu.school || t('education.notSpecified')}</h3>
                                    <p className="text-sm text-gray-400">{edu.degree || t('education.degree')}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={(e) => { e.stopPropagation(); removeEducation(edu.id); }}
                                    className="text-gray-500 hover:text-red-400 transition p-2"
                                >
                                    <Trash2 size={16} />
                                </button>
                                {expandedId === edu.id ? <ChevronUp className="text-gray-500" /> : <ChevronDown className="text-gray-500" />}
                            </div>
                        </div>

                        {/* Expanded Form */}
                        {expandedId === edu.id && (
                            <div className="p-4 pt-0 border-t border-border-subtle grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">{t('education.school')}</label>
                                    <input
                                        type="text"
                                        value={edu.school}
                                        onChange={(e) => handleChange(edu.id, 'school', e.target.value)}
                                        placeholder="Stanford University"
                                        className="w-full bg-bg-card border border-border-subtle rounded-lg px-4 py-2 text-gray-900 focus:ring-1 focus:ring-accent-green focus:border-accent-green outline-none"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">{t('education.degree')}</label>
                                    <input
                                        type="text"
                                        value={edu.degree}
                                        onChange={(e) => handleChange(edu.id, 'degree', e.target.value)}
                                        placeholder="B.S. Computer Science"
                                        className="w-full bg-bg-card border border-border-subtle rounded-lg px-4 py-2 text-gray-900 focus:ring-1 focus:ring-accent-green focus:border-accent-green outline-none"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">{t('education.cityOptional')}</label>
                                    <input
                                        type="text"
                                        value={edu.city}
                                        onChange={(e) => handleChange(edu.id, 'city', e.target.value)}
                                        placeholder="Stanford"
                                        className="w-full bg-bg-card border border-border-subtle rounded-lg px-4 py-2 text-gray-900 focus:ring-1 focus:ring-accent-green focus:border-accent-green outline-none"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">{t('education.countryOptional')}</label>
                                    <input
                                        type="text"
                                        value={edu.country}
                                        onChange={(e) => handleChange(edu.id, 'country', e.target.value)}
                                        placeholder="United States"
                                        className="w-full bg-bg-card border border-border-subtle rounded-lg px-4 py-2 text-gray-900 focus:ring-1 focus:ring-accent-green focus:border-accent-green outline-none"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">{t('education.startDate')}</label>
                                    <input
                                        type="text"
                                        value={edu.startDate}
                                        onChange={(e) => handleChange(edu.id, 'startDate', e.target.value)}
                                        placeholder="2016"
                                        className="w-full bg-bg-card border border-border-subtle rounded-lg px-4 py-2 text-gray-900 focus:ring-1 focus:ring-accent-green focus:border-accent-green outline-none"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">{t('education.endDate')}</label>
                                    <input
                                        type="text"
                                        value={edu.endDate}
                                        onChange={(e) => handleChange(edu.id, 'endDate', e.target.value)}
                                        placeholder="2020"
                                        className="w-full bg-bg-card border border-border-subtle rounded-lg px-4 py-2 text-gray-900 focus:ring-1 focus:ring-accent-green focus:border-accent-green outline-none"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">{t('education.gpaOptional')}</label>
                                    <input
                                        type="text"
                                        value={edu.gpa || ''}
                                        onChange={(e) => handleChange(edu.id, 'gpa', e.target.value)}
                                        placeholder="3.8 / 4.0"
                                        className="w-full bg-bg-card border border-border-subtle rounded-lg px-4 py-2 text-gray-900 focus:ring-1 focus:ring-accent-green focus:border-accent-green outline-none"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">{t('education.honorsOptional')}</label>
                                    <input
                                        type="text"
                                        value={edu.honors || ''}
                                        onChange={(e) => handleChange(edu.id, 'honors', e.target.value)}
                                        placeholder="Magna Cum Laude, Dean's List"
                                        className="w-full bg-bg-card border border-border-subtle rounded-lg px-4 py-2 text-gray-900 focus:ring-1 focus:ring-accent-green focus:border-accent-green outline-none"
                                    />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-medium text-gray-700">{t('education.clubsOptional')}</label>
                                    <input
                                        type="text"
                                        value={edu.clubs || ''}
                                        onChange={(e) => handleChange(edu.id, 'clubs', e.target.value)}
                                        placeholder="Computer Science Club, Debate Team"
                                        className="w-full bg-bg-card border border-border-subtle rounded-lg px-4 py-2 text-gray-900 focus:ring-1 focus:ring-accent-green focus:border-accent-green outline-none"
                                    />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-medium text-gray-700">{t('education.descriptionOptional')}</label>
                                    <textarea
                                        value={edu.description}
                                        onChange={(e) => handleChange(edu.id, 'description', e.target.value)}
                                        rows={2}
                                        placeholder="Relevant coursework, thesis, etc."
                                        className="w-full bg-bg-card border border-border-subtle rounded-lg px-4 py-2 text-gray-900 focus:ring-1 focus:ring-accent-green focus:border-accent-green outline-none resize-none"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {education.length === 0 && (
                    <div className="text-center py-10 border-2 border-dashed border-border-subtle rounded-xl bg-white/2">
                        <p className="text-gray-500">{t('education.noEducation')}</p>
                        <button onClick={handleAdd} className="text-accent-green hover:underline mt-2 text-sm">{t('education.addEducation')}</button>
                    </div>
                )}
            </div>

            {/* Additional Sections */}
            <div className="mt-8 pt-6 border-t border-border-subtle space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('education.credentials')}</h3>

                <CollapsibleSection
                    title={t('education.certifications')}
                    icon={BadgeCheck}
                    badge={certifications.length}
                    defaultOpen={false}
                >
                    <CertificationsSection />
                </CollapsibleSection>

                <CollapsibleSection
                    title={t('education.awards')}
                    icon={Award}
                    badge={awards.length}
                    defaultOpen={false}
                >
                    <AwardsSection />
                </CollapsibleSection>
            </div>
        </div>
    );
}

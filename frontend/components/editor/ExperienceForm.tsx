'use client';

import { useState } from 'react';
import { useResumeStore, Experience } from '../../store/useResumeStore';
import { Plus, Trash2, ArrowUp, ArrowDown, ChevronDown, ChevronUp, Wand2, Loader2 } from 'lucide-react';
import api from '../../lib/api';
// Using native crypto.randomUUID() instead of uuid package
import { useTranslations } from 'next-intl';

export default function ExperienceForm() {
    const t = useTranslations('Builder');
    const { resumeData, addExperience, updateExperience, removeExperience, moveExperience } = useResumeStore();
    const { experience } = resumeData;
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [improvingId, setImprovingId] = useState<string | null>(null);

    const handleAdd = () => {
        const newExp: Experience = {
            id: crypto.randomUUID(), // Changed from uuidv4()
            title: '',
            company: '',
            city: '',
            country: '',
            startDate: '',
            endDate: '',
            current: false,
            description: '',
        };
        addExperience(newExp);
        setExpandedId(newExp.id);
    };

    const handleToggle = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const handleChange = (id: string, field: keyof Experience, value: any) => {
        updateExperience(id, { [field]: value });
    };

    const handleImprove = async (id: string, currentDescription: string) => {
        if (!currentDescription) return;
        setImprovingId(id);
        try {
            const response = await api.post('/ai/improve-content', {
                content: currentDescription
            });
            updateExperience(id, { description: (response.data as { improved_content: string }).improved_content });
        } catch (error) {
            console.error("Improvement failed", error);
        } finally {
            setImprovingId(null);
        }
    };

    return (
        <div className="space-y-6 animate-in slide-in-from-left-4 fade-in duration-300">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('experience.title')}</h2>
                    <p className="text-gray-400 text-sm">{t('experience.subtitle')}</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 bg-accent-green/10 text-accent-green px-4 py-2 rounded-lg hover:bg-accent-green/20 transition text-sm font-medium"
                >
                    <Plus size={16} /> {t('experience.add')}
                </button>
            </div>

            <div className="space-y-4">
                {experience.map((exp, index) => (
                    <div key={exp.id} className="bg-bg-card-light border border-border-subtle rounded-xl overflow-hidden transition-all duration-200"> {/* Original styling */}
                        {/* Header */}
                        <div
                            className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5"
                            onClick={() => handleToggle(exp.id)}
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex flex-col gap-0.5">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); moveExperience(exp.id, 'up'); }}
                                        disabled={index === 0}
                                        className="text-gray-500 hover:text-accent-green disabled:opacity-30 disabled:cursor-not-allowed transition p-1"
                                        title="Move up"
                                    >
                                        <ArrowUp size={14} />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); moveExperience(exp.id, 'down'); }}
                                        disabled={index === experience.length - 1}
                                        className="text-gray-500 hover:text-accent-green disabled:opacity-30 disabled:cursor-not-allowed transition p-1"
                                        title="Move down"
                                    >
                                        <ArrowDown size={14} />
                                    </button>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">{exp.title || t('experience.notSpecified')}</h3>
                                    <p className="text-sm text-gray-400">{exp.company || t('experience.companyName')}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3"> {/* Original gap */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); removeExperience(exp.id); }}
                                    className="text-gray-500 hover:text-red-400 transition p-2"
                                >
                                    <Trash2 size={16} />
                                </button>
                                {expandedId === exp.id ? <ChevronUp className="text-gray-500" /> : <ChevronDown className="text-gray-500" />} {/* Original size */}
                            </div>
                        </div>

                        {/* Expanded Form */}
                        {expandedId === exp.id && (
                            <div className="p-4 pt-0 border-t border-border-subtle grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">{t('experience.jobTitle')}</label>
                                    <input
                                        type="text"
                                        value={exp.title}
                                        onChange={(e) => handleChange(exp.id, 'title', e.target.value)}
                                        placeholder="Senior Product Designer"
                                        className="w-full bg-bg-card border border-border-subtle rounded-lg px-4 py-2 text-gray-900 focus:ring-1 focus:ring-accent-green focus:border-accent-green outline-none"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">{t('experience.company')}</label>
                                    <input
                                        type="text"
                                        value={exp.company}
                                        onChange={(e) => handleChange(exp.id, 'company', e.target.value)}
                                        placeholder="Acme Corp"
                                        className="w-full bg-bg-card border border-border-subtle rounded-lg px-4 py-2 text-gray-900 focus:ring-1 focus:ring-accent-green focus:border-accent-green outline-none"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">{t('experience.city')}</label>
                                    <input
                                        type="text"
                                        value={exp.city}
                                        onChange={(e) => handleChange(exp.id, 'city', e.target.value)}
                                        placeholder="San Francisco"
                                        className="w-full bg-bg-card border border-border-subtle rounded-lg px-4 py-2 text-gray-900 focus:ring-1 focus:ring-accent-green focus:border-accent-green outline-none"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">{t('experience.country')}</label>
                                    <input
                                        type="text"
                                        value={exp.country}
                                        onChange={(e) => handleChange(exp.id, 'country', e.target.value)}
                                        placeholder="United States"
                                        className="w-full bg-bg-card border border-border-subtle rounded-lg px-4 py-2 text-gray-900 focus:ring-1 focus:ring-accent-green focus:border-accent-green outline-none"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">{t('experience.startDate')}</label>
                                    <input
                                        type="text"
                                        value={exp.startDate}
                                        onChange={(e) => handleChange(exp.id, 'startDate', e.target.value)}
                                        placeholder="Jan 2020"
                                        className="w-full bg-bg-card border border-border-subtle rounded-lg px-4 py-2 text-gray-900 focus:ring-1 focus:ring-accent-green focus:border-accent-green outline-none"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">{t('experience.endDate')}</label>
                                    <input
                                        type="text"
                                        value={exp.endDate}
                                        onChange={(e) => handleChange(exp.id, 'endDate', e.target.value)}
                                        disabled={exp.current}
                                        placeholder="Present"
                                        className="w-full bg-bg-card border border-border-subtle rounded-lg px-4 py-2 text-gray-900 focus:ring-1 focus:ring-accent-green focus:border-accent-green outline-none disabled:opacity-50"
                                    />
                                </div>

                                <div className="flex items-center gap-2 md:col-span-2">
                                    <input
                                        type="checkbox"
                                        id={`current-${exp.id}`}
                                        checked={exp.current}
                                        onChange={(e) => handleChange(exp.id, 'current', e.target.checked)}
                                        className="rounded border-gray-600 bg-bg-card text-accent-green focus:ring-accent-green"
                                    />
                                    <label htmlFor={`current-${exp.id}`} className="text-sm text-gray-700">{t('experience.currentlyWork')}</label>
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm font-medium text-gray-700">{t('experience.description')}</label>
                                        <button
                                            onClick={() => handleImprove(exp.id, exp.description)}
                                            disabled={improvingId === exp.id || !exp.description}
                                            className="text-xs flex items-center gap-1.5 text-accent-green hover:text-accent-teal transition disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {improvingId === exp.id ? <Loader2 size={12} className="animate-spin" /> : <Wand2 size={12} />}
                                            {t('experience.improveAI')}
                                        </button>
                                    </div>
                                    <textarea
                                        value={exp.description}
                                        onChange={(e) => handleChange(exp.id, 'description', e.target.value)}
                                        rows={4}
                                        placeholder="• Led a team of 5 designers..."
                                        className="w-full bg-bg-card border border-border-subtle rounded-lg px-4 py-2 text-gray-900 focus:ring-1 focus:ring-accent-green focus:border-accent-green outline-none resize-none"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {experience.length === 0 && (
                    <div className="text-center py-10 border-2 border-dashed border-border-subtle rounded-xl bg-white/2">
                        <p className="text-gray-500">{t('experience.noExperience')}</p>
                        <button onClick={handleAdd} className="text-accent-green hover:underline mt-2 text-sm">{t('experience.addFirst')}</button>
                    </div>
                )}
            </div>
        </div>
    );
}

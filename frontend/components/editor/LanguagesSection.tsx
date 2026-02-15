'use client';

import { useResumeStore, Language } from '../../store/useResumeStore';
import { Plus, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
// Using native crypto.randomUUID() instead of uuid package

const proficiencyOptions: { value: Language['proficiency']; label: string; level: number }[] = [
    { value: 'native', label: 'Native', level: 100 },
    { value: 'fluent', label: 'Fluent', level: 90 },
    { value: 'advanced', label: 'Advanced', level: 75 },
    { value: 'intermediate', label: 'Intermediate', level: 50 },
    { value: 'basic', label: 'Basic', level: 25 },
];

export default function LanguagesSection() {
    const { resumeData, addLanguage, updateLanguage, removeLanguage } = useResumeStore();
    const { languages } = resumeData;
    const [newLanguage, setNewLanguage] = useState('');

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newLanguage.trim()) return;

        const lang: Language = {
            id: crypto.randomUUID(),
            name: newLanguage.trim(),
            proficiency: 'intermediate',
            level: 50,
        };
        addLanguage(lang);
        setNewLanguage('');
    };

    const handleProficiencyChange = (id: string, proficiency: Language['proficiency']) => {
        const option = proficiencyOptions.find(p => p.value === proficiency);
        updateLanguage(id, { proficiency, level: option?.level || 50 });
    };

    const renderLevelBar = (level: number) => {
        return (
            <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                    className="h-full bg-accent-green rounded-full transition-all"
                    style={{ width: `${level}%` }}
                />
            </div>
        );
    };

    return (
        <div className="space-y-4">
            <form onSubmit={handleAdd} className="flex gap-2">
                <input
                    type="text"
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                    placeholder="e.g. Spanish, French, Mandarin"
                    className="flex-1 bg-bg-card border border-border-subtle rounded-lg px-3 py-2 text-gray-900 text-sm focus:ring-2 focus:ring-accent-green/20 focus:border-accent-green outline-none transition"
                />
                <button
                    type="submit"
                    disabled={!newLanguage.trim()}
                    aria-label="Add language"
                    className="bg-accent-green text-bg-primary px-3 py-2 rounded-lg font-medium hover:bg-accent-teal transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Plus size={18} />
                </button>
            </form>

            {/* Languages List */}
            <div className="space-y-2">
                {languages.map((lang) => (
                    <div
                        key={lang.id}
                        className="flex items-center justify-between bg-bg-card border border-border-subtle rounded-lg px-3 py-2"
                    >
                        <span className="text-gray-900 font-medium text-sm">{lang.name}</span>
                        <div className="flex items-center gap-3">
                            {renderLevelBar(lang.level)}
                            <div className="relative">
                                <select
                                    value={lang.proficiency}
                                    onChange={(e) => handleProficiencyChange(lang.id, e.target.value as Language['proficiency'])}
                                    aria-label={`${lang.name} proficiency level`}
                                    className="appearance-none bg-bg-card-light border border-border-subtle rounded-md px-2 py-1 pr-7 text-xs text-gray-700 focus:outline-none focus:border-accent-green cursor-pointer"
                                >
                                    {proficiencyOptions.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                            </div>
                            <button
                                onClick={() => removeLanguage(lang.id)}
                                aria-label={`Remove ${lang.name}`}
                                className="text-gray-500 hover:text-red-400 transition p-1"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    </div>
                ))}

                {languages.length === 0 && (
                    <p className="text-gray-500 text-sm italic text-center py-2">No languages added yet.</p>
                )}
            </div>

            {/* Quick Add */}
            <div className="flex flex-wrap gap-2">
                {['English', 'Spanish', 'French', 'German', 'Mandarin', 'Japanese'].map(l => (
                    <button
                        key={l}
                        onClick={() => {
                            if (!languages.find(lang => lang.name === l)) {
                                addLanguage({ id: crypto.randomUUID(), name: l, proficiency: 'intermediate', level: 50 });
                            }
                        }}
                        disabled={languages.some(lang => lang.name === l)}
                        className="px-2 py-1 bg-bg-card border border-border-subtle rounded-md text-xs text-gray-400 hover:text-gray-900 hover:border-gray-500 transition disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        + {l}
                    </button>
                ))}
            </div>
        </div>
    );
}

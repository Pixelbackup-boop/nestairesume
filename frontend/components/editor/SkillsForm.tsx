'use client';

import { useResumeStore, Skill } from '../../store/useResumeStore';
import { Plus, X, ChevronDown, ChevronUp, Globe, Zap, Heart } from 'lucide-react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CollapsibleSection from './CollapsibleSection';
import LanguagesSection from './LanguagesSection';
import StrengthsSection from './StrengthsSection';
import InterestsSection from './InterestsSection';

export default function SkillsForm() {
    const { resumeData, addSkill, updateSkill, removeSkill } = useResumeStore();
    const { skills, languages, strengths, interests } = resumeData;
    const [newSkill, setNewSkill] = useState('');
    const [expandedSkillId, setExpandedSkillId] = useState<string | null>(null);

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newSkill.trim()) return;

        const skill: Skill = {
            id: uuidv4(),
            name: newSkill.trim(),
            level: 3, // Default level
        };
        addSkill(skill);
        setNewSkill('');
        setExpandedSkillId(skill.id); // Auto-expand to set level
    };

    const getLevelLabel = (level: number) => {
        const labels = ['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'];
        return labels[level - 1] || 'Intermediate';
    };

    const renderLevelDots = (level: number) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((dot) => (
                    <div
                        key={dot}
                        className={`w-2 h-2 rounded-full transition-colors ${
                            dot <= level ? 'bg-accent-green' : 'bg-gray-600'
                        }`}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="space-y-6 animate-in slide-in-from-left-4 fade-in duration-300">
            <div>
                <h2 className="text-2xl font-bold text-white mb-2">Skills</h2>
                <p className="text-gray-400 text-sm">Add your technical and soft skills with proficiency levels.</p>
            </div>

            <form onSubmit={handleAdd} className="flex gap-2">
                <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="e.g. React, Python, Leadership"
                    className="flex-1 bg-bg-card-light border border-border-subtle rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-accent-green/20 focus:border-accent-green outline-none transition"
                />
                <button
                    type="submit"
                    disabled={!newSkill.trim()}
                    className="bg-accent-green text-bg-primary px-4 py-2 rounded-lg font-semibold hover:bg-accent-teal transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Plus size={20} />
                </button>
            </form>

            {/* Skills List with Level Control */}
            <div className="space-y-2">
                {skills.map((skill) => (
                    <div
                        key={skill.id}
                        className="bg-bg-card-light border border-border-subtle rounded-lg overflow-hidden"
                    >
                        {/* Skill Header */}
                        <div
                            className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-white/5 transition"
                            onClick={() => setExpandedSkillId(expandedSkillId === skill.id ? null : skill.id)}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-white font-medium">{skill.name}</span>
                                {renderLevelDots(skill.level)}
                                <span className="text-xs text-gray-500">{getLevelLabel(skill.level)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeSkill(skill.id);
                                    }}
                                    className="text-gray-500 hover:text-red-400 transition p-1"
                                >
                                    <X size={16} />
                                </button>
                                {expandedSkillId === skill.id ? (
                                    <ChevronUp size={16} className="text-gray-500" />
                                ) : (
                                    <ChevronDown size={16} className="text-gray-500" />
                                )}
                            </div>
                        </div>

                        {/* Expanded Level Slider */}
                        {expandedSkillId === skill.id && (
                            <div className="px-4 pb-4 pt-2 border-t border-border-subtle">
                                <label className="text-xs text-gray-400 mb-2 block">Proficiency Level</label>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="range"
                                        min={1}
                                        max={5}
                                        value={skill.level}
                                        onChange={(e) => updateSkill(skill.id, { level: Number(e.target.value) })}
                                        className="flex-1 accent-accent-green h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                                    />
                                    <div className="flex items-center gap-2 min-w-[120px]">
                                        {renderLevelDots(skill.level)}
                                        <span className="text-sm text-accent-green font-medium">
                                            {skill.level}/5
                                        </span>
                                    </div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>Beginner</span>
                                    <span>Expert</span>
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {skills.length === 0 && (
                    <p className="text-gray-500 text-sm italic w-full text-center py-4">No skills added yet.</p>
                )}
            </div>

            <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-400 mb-3">Suggested Skills</h3>
                <div className="flex flex-wrap gap-2">
                    {['JavaScript', 'TypeScript', 'Node.js', 'React', 'Project Management', 'Communication', 'Python', 'SQL'].map(s => (
                        <button
                            key={s}
                            onClick={() => {
                                if (!skills.find(sk => sk.name === s)) {
                                    const newId = uuidv4();
                                    addSkill({ id: newId, name: s, level: 3 });
                                    setExpandedSkillId(newId);
                                }
                            }}
                            disabled={skills.some(sk => sk.name === s)}
                            className="px-3 py-1 bg-bg-card-light border border-border-subtle rounded-md text-xs text-gray-400 hover:text-white hover:border-gray-500 transition disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            + {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Additional Sections */}
            <div className="mt-8 pt-6 border-t border-border-subtle space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">Additional Information</h3>

                <CollapsibleSection
                    title="Languages"
                    icon={Globe}
                    badge={languages.length}
                    defaultOpen={false}
                >
                    <LanguagesSection />
                </CollapsibleSection>

                <CollapsibleSection
                    title="Strengths"
                    icon={Zap}
                    badge={strengths.length}
                    defaultOpen={false}
                >
                    <StrengthsSection />
                </CollapsibleSection>

                <CollapsibleSection
                    title="Interests & Hobbies"
                    icon={Heart}
                    badge={interests.length}
                    defaultOpen={false}
                >
                    <InterestsSection />
                </CollapsibleSection>
            </div>
        </div>
    );
}

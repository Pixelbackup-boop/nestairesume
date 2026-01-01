'use client';

import { useResumeStore, Skill } from '../../store/useResumeStore';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function SkillsForm() {
    const { resumeData, addSkill, removeSkill } = useResumeStore();
    const { skills } = resumeData;
    const [newSkill, setNewSkill] = useState('');

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
    };

    return (
        <div className="space-y-6 animate-in slide-in-from-left-4 fade-in duration-300">
            <div>
                <h2 className="text-2xl font-bold text-white mb-2">Skills</h2>
                <p className="text-gray-400 text-sm">Add your technical and soft skills.</p>
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

            <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                    <div
                        key={skill.id}
                        className="group flex items-center gap-2 bg-bg-card border border-border-subtle px-3 py-1.5 rounded-full text-sm text-gray-200"
                    >
                        <span>{skill.name}</span>
                        <button
                            onClick={() => removeSkill(skill.id)}
                            className="text-gray-500 hover:text-red-400 transition"
                        >
                            <X size={14} />
                        </button>
                    </div>
                ))}

                {skills.length === 0 && (
                    <p className="text-gray-500 text-sm italic w-full text-center py-4">No skills added yet.</p>
                )}
            </div>

            <div className="mt-8">
                <h3 className="text-sm font-medium text-gray-400 mb-3">Suggested Skills</h3>
                <div className="flex flex-wrap gap-2">
                    {['JavaScript', 'TypeScript', 'Node.js', 'React', 'Project Management', 'Communication', 'Python', 'SQL'].map(s => (
                        <button
                            key={s}
                            onClick={() => {
                                if (!skills.find(sk => sk.name === s)) {
                                    addSkill({ id: uuidv4(), name: s, level: 3 });
                                }
                            }}
                            className="px-3 py-1 bg-bg-card-light border border-border-subtle rounded-md text-xs text-gray-400 hover:text-white hover:border-gray-500 transition"
                        >
                            + {s}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

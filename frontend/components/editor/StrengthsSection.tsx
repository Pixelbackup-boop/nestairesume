'use client';

import { useResumeStore, Strength } from '../../store/useResumeStore';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function StrengthsSection() {
    const { resumeData, addStrength, updateStrength, removeStrength } = useResumeStore();
    const { strengths } = resumeData;
    const [newStrength, setNewStrength] = useState('');
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newStrength.trim()) return;

        const strength: Strength = {
            id: uuidv4(),
            name: newStrength.trim(),
            level: 80, // Default level
        };
        addStrength(strength);
        setNewStrength('');
        setExpandedId(strength.id);
    };

    const renderCircularProgress = (level: number, size: number = 40) => {
        const radius = (size - 4) / 2;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (level / 100) * circumference;

        return (
            <div className="relative" style={{ width: size, height: size }}>
                <svg width={size} height={size} className="transform -rotate-90">
                    {/* Background circle */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke="currentColor"
                        strokeWidth={3}
                        fill="none"
                        className="text-gray-700"
                    />
                    {/* Progress circle */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke="currentColor"
                        strokeWidth={3}
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        className="text-accent-green transition-all duration-300"
                    />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                    {level}%
                </span>
            </div>
        );
    };

    return (
        <div className="space-y-4">
            <p className="text-xs text-gray-500">Add soft skills and personal strengths with proficiency percentages.</p>

            <form onSubmit={handleAdd} className="flex gap-2">
                <input
                    type="text"
                    value={newStrength}
                    onChange={(e) => setNewStrength(e.target.value)}
                    placeholder="e.g. Leadership, Communication, Problem Solving"
                    className="flex-1 bg-bg-card border border-border-subtle rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-accent-green/20 focus:border-accent-green outline-none transition"
                />
                <button
                    type="submit"
                    disabled={!newStrength.trim()}
                    className="bg-accent-green text-bg-primary px-3 py-2 rounded-lg font-medium hover:bg-accent-teal transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Plus size={18} />
                </button>
            </form>

            {/* Strengths List */}
            <div className="space-y-2">
                {strengths.map((strength) => (
                    <div
                        key={strength.id}
                        className="bg-bg-card border border-border-subtle rounded-lg overflow-hidden"
                    >
                        <div
                            className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-white/5 transition"
                            onClick={() => setExpandedId(expandedId === strength.id ? null : strength.id)}
                        >
                            <div className="flex items-center gap-3">
                                {renderCircularProgress(strength.level)}
                                <span className="text-white font-medium text-sm">{strength.name}</span>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeStrength(strength.id);
                                }}
                                className="text-gray-500 hover:text-red-400 transition p-1"
                            >
                                <X size={14} />
                            </button>
                        </div>

                        {expandedId === strength.id && (
                            <div className="px-3 pb-3 pt-1 border-t border-border-subtle">
                                <label className="text-xs text-gray-400 mb-2 block">Proficiency Level</label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="range"
                                        min={0}
                                        max={100}
                                        step={5}
                                        value={strength.level}
                                        onChange={(e) => updateStrength(strength.id, { level: Number(e.target.value) })}
                                        className="flex-1 accent-accent-green h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                                    />
                                    <span className="text-sm text-accent-green font-medium w-12 text-right">
                                        {strength.level}%
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {strengths.length === 0 && (
                    <p className="text-gray-500 text-sm italic text-center py-2">No strengths added yet.</p>
                )}
            </div>

            {/* Quick Add */}
            <div className="flex flex-wrap gap-2">
                {['Leadership', 'Communication', 'Problem Solving', 'Teamwork', 'Creativity', 'Time Management'].map(s => (
                    <button
                        key={s}
                        onClick={() => {
                            if (!strengths.find(str => str.name === s)) {
                                const newId = uuidv4();
                                addStrength({ id: newId, name: s, level: 80 });
                                setExpandedId(newId);
                            }
                        }}
                        disabled={strengths.some(str => str.name === s)}
                        className="px-2 py-1 bg-bg-card border border-border-subtle rounded-md text-xs text-gray-400 hover:text-white hover:border-gray-500 transition disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        + {s}
                    </button>
                ))}
            </div>
        </div>
    );
}
